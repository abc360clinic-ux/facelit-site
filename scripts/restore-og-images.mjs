// Restore og:image / twitter:image to the exact live URLs (webp.mjs had rewritten them to .webp).
// The old .jpg/.png URLs still resolve via the rewrite in next.config.ts. Usage: node scripts/restore-og-images.mjs
import fs from "node:fs";
import * as cheerio from "cheerio";
const dir = "content/pages", files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
let changed = 0;
const q = [...files];
await Promise.all(Array.from({ length: 8 }, async () => { while (q.length) {
  const f = q.shift(), j = JSON.parse(fs.readFileSync(`${dir}/${f}`, "utf8"));
  const cur = [j.head?.og?.image, j.head?.tw?.image];
  if (!cur.some((u) => u?.endsWith(".webp"))) continue;
  const res = await fetch("https://facelit.in" + encodeURI(j.path));
  if (res.status !== 200) { console.log("skip", j.path, res.status); continue; }
  const $ = cheerio.load(await res.text());
  const og = $('meta[property="og:image"]').attr("content"), tw = $('meta[name="twitter:image"]').attr("content");
  let dirty = false;
  if (og && j.head.og?.image && j.head.og.image !== og) { j.head.og.image = og; dirty = true; }
  if (tw && j.head.tw?.image && j.head.tw.image !== tw) { j.head.tw.image = tw; dirty = true; }
  if (dirty) { fs.writeFileSync(`${dir}/${f}`, JSON.stringify(j)); changed++; }
}}));
console.log(changed, "pages updated");
