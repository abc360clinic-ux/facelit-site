// Home page #reviews: design-only rebuild of the reviews strip. Same reviews, same text.
// Run from facelit-site: node scripts/home-reviews/build.mjs
import fs from "node:fs";
import * as cheerio from "cheerio";

const JSON_PATH = "content/pages/home.json";
const BK = "../backup/home-reviews.json.bak";
if (!fs.existsSync(BK)) fs.copyFileSync(JSON_PATH, BK);
const page = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
const orig = JSON.parse(fs.readFileSync(BK, "utf8"));

const $ = cheerio.load(orig.bodyHtml, null, false);
const R = $("#reviews");
const h2 = R.find("h2").first().text().replace(/\s+/g, " ").trim();
const intro = R.find("h2").first().nextAll("p").first().html().trim();
const all = R.find("[data-reviews-track] > li").map((_, li) => {
  const L = $(li);
  return {
    name: L.find("p.uppercase").first().text().trim(),
    avatar: L.find("img").attr("src") || "",
    stars: Number((L.find("[aria-label$=stars]").attr("aria-label") || "5").match(/\d/)[0]),
    text: L.find("p").last().html().trim(),
  };
}).get();
// The original track repeats the list once for its endless loop; keep each review once.
const half = all.length / 2;
const same = Number.isInteger(half) && all.slice(0, half).every((r, i) => r.name === all[i + half].name && r.text === all[i + half].text);
const reviews = same ? all.slice(0, half) : all;

const star = `<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.4 9.8 5.7l4.7.4-3.6 3.1 1.1 4.5L8 11.4l-3.9 2.3 1.1-4.5L1.5 6.1l4.7-.4z"/></svg>`;
const stars = (n) => `<span class="rv-stars" role="img" aria-label="${n} out of 5 stars">${Array.from({ length: 5 }, (_, i) => `<i class="${i < n ? "on" : ""}">${star}</i>`).join("")}</span>`;
const plain = (h) => cheerio.load(h).text();
const LONG = 230;
const card = (r, i, dup) => `<li class="rv-card${i % 3 === 1 ? " rv-card--forest" : ""}"${dup ? ' aria-hidden="true"' : ""} data-rv="${i}">
 <div class="rv-top"><span class="rv-av">${r.avatar ? `<img src="${r.avatar}" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer">` : `<b>${r.name.charAt(0)}</b>`}</span><div><p class="rv-name">${r.name}</p>${stars(r.stars)}</div><span class="rv-q" aria-hidden="true">“</span></div>
 <p class="rv-text">${r.text}</p>
 ${plain(r.text).length > LONG ? `<button type="button" class="rv-more" data-rv-open="${i}"${dup ? ' tabindex="-1"' : ""}>Read full review</button>` : ""}
</li>`;
const mid = Math.ceil(reviews.length / 2);
const rows = [reviews.slice(0, mid).map((r, k) => [r, k]), reviews.slice(mid).map((r, k) => [r, k + mid])];
const row = (items, dir) => `<div class="rv-row" data-dir="${dir}"><ul class="rv-track" aria-label="Customer reviews${dir === "rev" ? ", continued" : ""}">
 ${items.map(([r, i]) => card(r, i, false)).join("\n ")}
 ${items.map(([r, i]) => card(r, i, true)).join("\n ")}
</ul></div>`;

const css = `
#reviews .rv-shell{padding:2.25rem 0 2rem;overflow:hidden}
@media(min-width:640px){#reviews .rv-shell{padding:3rem 0 2.75rem}}
.rv-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:1.25rem;padding:0 1.25rem;margin-bottom:1.75rem}
@media(min-width:640px){.rv-head{padding:0 2.5rem;margin-bottom:2.25rem}}
.rv-head h2{margin:0;color:var(--forest,#3a4d39);font-size:clamp(1.85rem,5vw,2.6rem);line-height:1.1;letter-spacing:-.02em}
.rv-head p{margin:.85rem 0 0;max-width:36rem;color:var(--ink-soft,#5d625b);font-size:.95rem;line-height:1.65}
@media(min-width:640px){.rv-head p{font-size:1rem}}
.rv-ctl{display:none;gap:.5rem}
@media(min-width:768px){.rv-ctl{display:flex}}
.rv-ctl button{display:inline-flex;align-items:center;gap:.45rem;height:2.6rem;padding:0 1rem;border-radius:999px;border:1px solid rgba(58,77,57,.2);background:#fff;color:#2d3c2d;font:500 .85rem Onest,sans-serif;cursor:pointer}
.rv-ctl button:hover{border-color:#3a4d39}
.rv-ctl svg{width:.9rem;height:.9rem}
.rv-rows{display:grid;gap:1rem}
@media(min-width:768px){.rv-rows{gap:1.25rem}}
.rv-row{overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scrollbar-width:none;padding:.25rem 1.25rem .5rem;scroll-padding:0 1.25rem}
.rv-row::-webkit-scrollbar{display:none}
.rv-track{list-style:none;margin:0;padding:0;display:flex;gap:.85rem;width:max-content}
.rv-card[aria-hidden]{display:none}
.rv-card{scroll-snap-align:start;flex:none;width:min(80vw,19.5rem);display:flex;flex-direction:column;background:#fffdf9;border:1px solid rgba(58,77,57,.12);border-radius:1.4rem;padding:1.25rem 1.25rem 1.1rem;box-shadow:0 1px 2px rgba(45,60,45,.04),0 10px 24px -18px rgba(45,60,45,.35);transition:transform .25s ease,box-shadow .25s ease}
.rv-card--forest{background:#3a4d39;border-color:#3a4d39;color:#fdf7ef}
.rv-top{display:flex;align-items:center;gap:.75rem}
.rv-av{flex:none;width:2.6rem;height:2.6rem;border-radius:50%;overflow:hidden;background:#e9e2d3;display:grid;place-items:center;box-shadow:0 0 0 2px #fff}
.rv-card--forest .rv-av{box-shadow:0 0 0 2px rgba(253,247,239,.85)}
.rv-av img{width:100%;height:100%;object-fit:cover}
.rv-av b{font:600 1rem Onest,sans-serif;color:#3a4d39}
.rv-top>div{min-width:0;flex:1}
.rv-name{margin:0;font:600 .74rem/1.3 Onest,sans-serif;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rv-stars{display:flex;gap:2px;margin-top:.35rem}
.rv-stars i{width:.85rem;height:.85rem;color:rgba(58,77,57,.2)}
.rv-card--forest .rv-stars i{color:rgba(253,247,239,.25)}
.rv-stars i.on{color:#c5a14a}
.rv-stars svg{width:100%;height:100%;fill:currentColor}
.rv-q{font-family:var(--font-serif,Georgia),serif;font-size:2.6rem;line-height:.6;color:#c5a14a;opacity:.7;align-self:flex-start;margin-top:.35rem}
.rv-text{margin:.95rem 0 0;font-size:.9rem;line-height:1.62;color:#4a5048;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden;flex:1}
.rv-card--forest .rv-text{color:rgba(253,247,239,.82)}
.rv-more{align-self:flex-start;margin-top:.8rem;padding:0;border:0;background:none;color:#3a4d39;font:600 .82rem Onest,sans-serif;text-decoration:underline;text-underline-offset:3px;cursor:pointer}
.rv-card--forest .rv-more{color:#f1dfae}
.rv-hint{display:flex;align-items:center;justify-content:center;gap:.4rem;margin:.5rem 0 0;font-size:.78rem;color:var(--ink-soft,#5d625b)}
.rv-hint svg{width:1rem;height:1rem}
@media(min-width:768px){
 .rv-hint{display:none}
 .rv-row{overflow:hidden;scroll-snap-type:none;padding:.35rem 0 .6rem;-webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
 .rv-card[aria-hidden]{display:flex}
 .rv-track{gap:1.15rem;animation:rv-move var(--rv-dur,160s) linear infinite}
 .rv-row[data-dir=rev] .rv-track{animation-direction:reverse}
 .rv-rows:hover .rv-track,.rv-rows:focus-within .rv-track,.rv-rows.is-paused .rv-track{animation-play-state:paused}
 .rv-card{width:21rem}
 .rv-card:hover{transform:translateY(-3px);box-shadow:0 2px 4px rgba(45,60,45,.05),0 18px 32px -18px rgba(45,60,45,.45)}
}
@keyframes rv-move{to{transform:translateX(calc(-50% - .575rem))}}
@media(prefers-reduced-motion:reduce){.rv-track{animation:none!important}.rv-row{overflow-x:auto!important}.rv-card[aria-hidden]{display:none!important}}
.rv-dlg{border:0;padding:0;border-radius:1.5rem;width:min(92vw,34rem);max-height:85vh;background:#fffdf9;color:#2d3c2d;box-shadow:0 30px 80px -20px rgba(0,0,0,.45)}
.rv-dlg::backdrop{background:rgba(30,38,30,.5);backdrop-filter:blur(3px)}
.rv-dlg .rv-dbody{padding:1.5rem 1.4rem 1.6rem;overflow:auto;max-height:85vh}
@media(min-width:640px){.rv-dlg .rv-dbody{padding:2rem 2rem 2.1rem}}
.rv-dlg .rv-text{display:block;-webkit-line-clamp:unset;overflow:visible;font-size:.98rem;line-height:1.72;color:#3d433b}
.rv-close{position:absolute;top:.85rem;right:.85rem;width:2.4rem;height:2.4rem;border-radius:50%;border:1px solid rgba(58,77,57,.18);background:#fff;display:grid;place-items:center;cursor:pointer;color:#2d3c2d}
.rv-close svg{width:1rem;height:1rem}
.rv-dlg .rv-top{padding-right:2.6rem}
`;

const js = `(function(){
var root=document.querySelector('[data-rv]');if(!root)return;
var rows=root.querySelector('.rv-rows'),data=JSON.parse(root.querySelector('[data-rv-data]').textContent),dlg=root.querySelector('.rv-dlg'),body=dlg.querySelector('[data-rv-body]');
root.querySelectorAll('.rv-track').forEach(function(t){t.style.setProperty('--rv-dur',Math.round(t.children.length/2*6.5)+'s')});
var btn=root.querySelector('[data-rv-toggle]');
if(btn)btn.addEventListener('click',function(){var p=rows.classList.toggle('is-paused');btn.setAttribute('aria-pressed',p);btn.querySelector('span').textContent=p?'Play':'Pause';btn.querySelector('.i-pause').style.display=p?'none':'';btn.querySelector('.i-play').style.display=p?'':'none'});
var last=null;
root.addEventListener('click',function(e){var b=e.target.closest('[data-rv-open]');if(!b)return;var i=+b.getAttribute('data-rv-open'),src=root.querySelector('.rv-card[data-rv="'+i+'"]');
 body.innerHTML=src.querySelector('.rv-top').outerHTML+'<p class="rv-text">'+data[i]+'</p>';last=b;
 if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','')});
dlg.querySelector('.rv-close').addEventListener('click',function(){dlg.close()});
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
dlg.addEventListener('close',function(){if(last)last.focus()});
})();`;

const section = `<section id="reviews" class="mx-auto max-w-7xl px-5 py-4 sm:px-8 sm:py-5" data-rv>
<style>${css}</style>
 <div class="liquid-glass--section rounded-[1.65rem] border border-ink/8 sm:rounded-[2.1rem] rv-shell">
 <div class="rv-head">
 <div><h2 class="font-serif">${h2}</h2><p>${intro}</p></div>
 <div class="rv-ctl"><button type="button" data-rv-toggle aria-pressed="false"><svg class="i-pause" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="3.5" y="2.5" width="3" height="11" rx="1"/><rect x="9.5" y="2.5" width="3" height="11" rx="1"/></svg><svg class="i-play" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style="display:none"><path d="M4 2.5v11l9-5.5z"/></svg><span>Pause</span></button></div>
 </div>
 <div class="rv-rows">
 ${row(rows[0], "fwd")}
 ${row(rows[1], "rev")}
 </div>
 <p class="rv-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M15 8l4 4-4 4"/></svg>Swipe to read more reviews</p>
 </div>
 <dialog class="rv-dlg" aria-label="Full review"><button type="button" class="rv-close" aria-label="Close"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg></button><div class="rv-dbody" data-rv-body></div></dialog>
 <script type="application/json" data-rv-data>${JSON.stringify(reviews.map((r) => r.text)).replace(/</g, "\\u003c")}</script>
 <script>${js}</script>
</section>`;

// Swap only the #reviews section in the current page (other sections untouched).
const cur = page.bodyHtml;
const s = cur.indexOf('<section id="reviews"');
const e = cur.indexOf("</section>", s) + 10; // the reviews section has no nested <section>
if (s < 0) throw new Error("reviews section not found");
page.bodyHtml = cur.slice(0, s) + section + cur.slice(e);
fs.writeFileSync(JSON_PATH, JSON.stringify(page));
console.log(`reviews: ${reviews.length} unique (rows ${rows[0].length}/${rows[1].length}), long ${reviews.filter((r) => plain(r.text).length > LONG).length}`);
