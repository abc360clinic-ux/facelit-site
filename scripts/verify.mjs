// Compare every URL on a local build with the live site: status + SEO head tags. Usage: node scripts/verify.mjs http://localhost:3100
import * as cheerio from "cheerio";
import index from "../content/index.json" with { type: "json" };
const base = process.argv[2], bad = [];
const sig = (h) => { const $ = cheerio.load(h); const m = (s) => $(s).attr("content") ?? null;
  return { title: $("title").text(), desc: m('meta[name="description"]'), canon: $('link[rel="canonical"]').attr("href") ?? null,
    robots: m('meta[name="robots"]'), ogt: m('meta[property="og:title"]'), ogd: m('meta[property="og:description"]'),
    ogu: m('meta[property="og:url"]'), ogi: m('meta[property="og:image"]'), ogty: m('meta[property="og:type"]'), twc: m('meta[name="twitter:card"]') }; };
const q = [...index];
await Promise.all(Array.from({ length: 8 }, async () => { while (q.length) {
  const p = q.shift(), u = encodeURI(p);
  const [l, o] = await Promise.all([fetch(base + u), fetch("https://facelit.in" + u)]);
  if (l.status !== 200) { bad.push([p, "status", l.status]); continue; }
  const a = sig(await l.text()), b = sig(await o.text());
  for (const k in b) if (a[k] !== b[k]) bad.push([p, k, a[k], b[k]]);
}}));
console.log(index.length, "pages;", bad.length, "diffs"); console.log(JSON.stringify(bad.slice(0, 15), null, 1));
const tally = {}; bad.forEach((d) => (tally[d[1]] = (tally[d[1]] || 0) + 1)); console.log(tally);
