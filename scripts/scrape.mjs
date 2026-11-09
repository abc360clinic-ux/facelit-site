// One-off: snapshot facelit.in into content/ + mirror /wp-content assets into public/.
// Run: node scripts/scrape.mjs   (re-runnable; skips assets already on disk)
import * as cheerio from "cheerio";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const ORIGIN = "https://facelit.in";
const EXTRA = ["/treatments/", "/thank-you/", "/appointment/", "/consultation/"]; // not all in sitemap
const key = (p) => (p === "/" ? "home" : p.replace(/^\/|\/$/g, "").replaceAll("/", "__"));
const get = (u) => fetch(u, { redirect: "manual" });
const pool = async (items, n, fn) => {
  const q = [...items];
  await Promise.all(Array.from({ length: n }, async () => { while (q.length) await fn(q.shift()); }));
};

// 1. URL list from the WP sitemap
const idx = await (await get(`${ORIGIN}/wp-sitemap.xml`)).text();
const urls = new Set(EXTRA.map((p) => ORIGIN + p));
for (const m of idx.match(/https:[^<]+\.xml/g)) {
  for (const u of (await (await get(m)).text()).matchAll(/<loc>([^<]+)/g)) urls.add(u[1]);
}
const assets = new Set(["/wp-content/themes/facelit/assets/js/site.js", "/wp-content/themes/facelit/assets/css/main.css"]);
const index = [], skipped = [];

const rewrite = (s) => s.replaceAll(`${ORIGIN}/`, "/").replaceAll(`${ORIGIN.replace("//", "\\/\\/")}\\/`, "\\/");
const grabAssets = (s) => { for (const m of s.matchAll(/\/wp-content\/[^"'\s)>,\\]+/g)) assets.add(m[0].replace(/[?#].*$/, "")); };

await pool([...urls], 6, async (u) => {
  const p = decodeURI(new URL(u).pathname);
  const res = await get(u);
  if (res.status !== 200) return skipped.push([p, res.status, res.headers.get("location")]);
  const $ = cheerio.load(await res.text());
  const meta = (sel) => $(sel).attr("content") ?? null;
  const og = {}, tw = {};
  $('meta[property^="og:"]').each((_, e) => (og[$(e).attr("property").slice(3)] = $(e).attr("content")));
  $('meta[name^="twitter:"]').each((_, e) => (tw[$(e).attr("name").slice(8)] = $(e).attr("content")));
  const head = {
    title: $("head title").text(),
    description: meta('meta[name="description"]'),
    robots: meta('meta[name="robots"]'),
    canonical: $('link[rel="canonical"]').attr("href") ?? null,
    og, tw,
    jsonld: $('script[type="application/ld+json"]').map((_, e) => $(e).html()).get(),
  };
  $("body script, body noscript").remove();
  const bodyHtml = rewrite($("body").html().trim());
  grabAssets(bodyHtml);
  index.push(p);
  await writeFile(`content/pages/${key(p)}.json`, JSON.stringify({ path: p, bodyClass: $("body").attr("class") ?? "", head, bodyHtml }));
});

// 2. Mirror assets (same paths under public/); follow url() refs inside CSS
const done = new Set();
const fetchAsset = async (a) => {
  if (done.has(a)) return; done.add(a);
  const dest = path.join("public", decodeURI(a));
  try { await access(dest); if (!a.endsWith(".css")) return; } catch {}
  const r = await fetch(ORIGIN + a);
  if (!r.ok) return skipped.push([a, r.status, "asset"]);
  const buf = Buffer.from(await r.arrayBuffer());
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  if (a.endsWith(".css") || a.endsWith(".js")) {
    const txt = buf.toString();
    const base = new URL(ORIGIN + a);
    for (const m of txt.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
      if (m[1].startsWith("data:")) continue;
      const rel = new URL(m[1], base);
      if (rel.origin === ORIGIN) assets.add(decodeURI(rel.pathname));
    }
  }
};
for (let prev = -1; prev !== done.size; ) { prev = done.size; await pool([...assets], 8, fetchAsset); }

index.sort();
await writeFile("content/index.json", JSON.stringify(index, null, 1));
await writeFile("content/skipped.json", JSON.stringify(skipped, null, 1));
console.log({ pages: index.length, assets: done.size, skipped: skipped.length });
