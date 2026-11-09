// One-off: jpg/png -> webp under public/, then rewrite references in content + theme css/js.
import sharp from "sharp";
import { readdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const walk = async (d) => (await Promise.all((await readdir(d, { withFileTypes: true }))
  .map((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])))).flat();
const re = /\.(jpe?g|png)$/i;
const imgs = (await walk("public/wp-content")).filter((f) => re.test(f));
for (const f of imgs) {
  await sharp(f).webp({ quality: 82 }).toFile(f.replace(re, ".webp"));
  await rm(f);
}
const targets = [
  ...(await walk("content/pages")),
  "public/wp-content/themes/facelit/assets/css/main.css",
  "public/wp-content/themes/facelit/assets/js/site.js",
];
for (const t of targets) {
  const s = await readFile(t, "utf8");
  const out = s.replace(/(\/wp-content\/[^"'\s)>,\\]+?)\.(jpe?g|png)\b/gi, "$1.webp");
  if (out !== s) await writeFile(t, out);
}
console.log("converted", imgs.length);
