// Rebuilds the machines part of /ecosystem/, keeping the original hero, doctor, products and CTA sections untouched.
// Usage (from facelit-site/): node scripts/ecosystem/build.mjs content/pages/ecosystem.json
import fs from "node:fs";
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, list, tabs, accordion, warn } = k;

// Claim kept in one place, matching the badge used on the individual machine pages.
const FDA = "US FDA-cleared";
const A = "/wp-content/uploads/2026/08/";
const M = "/wp-content/uploads/2026/11/";

// Machines: [key, cats, name, kind, image, w, h, desc, treats[], downtime, equipmentUrl, treatmentUrl, treatmentName]
const machines = [
  ["co2", "skin", "CO2 + Erbium Glass 1550nm", "Dual fractional laser", A + "WhatsApp-Image-2025-01-24-at-15.28.39_e9c9182a.webp", 331, 343,
    "Our go-to for resurfacing. The CO2 laser renews the skin surface while the 1550nm Erbium Glass works deeper, together treating acne and accident scars, pores, texture and fine lines with less downtime than older fractional lasers.",
    ["Acne scars", "Open pores", "Texture", "Fine lines"], "3–7 days", "/co2-erbium-glass-1550nm/", "/co2-fractional-laser/", "CO2 fractional laser"],
  ["pico", "skin", "PicoCare 450", "Picosecond Nd:YAG laser", M + "picocare-450-machine.webp", 470, 790,
    "A true picosecond laser firing ultra-short 450 ps pulses at 1064 and 532 nm. It shatters pigment and tattoo ink with very little heat, which makes it a safer choice for Indian skin.",
    ["Pigmentation", "Melasma", "Tan", "Tattoos"], "0–2 days", "/picocare450-nd-yag/", "/pico-450-laser/", "PICO 450 laser"],
  ["hydra", "skin", "Original HydraFacial", "Vortex hydradermabrasion", M + "hydrafacial-elite-machine.webp", 420, 750,
    "The original HydraFacial system, with patented vortex technology that cleanses, extracts and hydrates in one session, using genuine HydraFacial serums.",
    ["Clogged pores", "Dullness", "Dehydration", "Glow"], "None", "/original-hydrafacial/", "/hydrafacial-treatments/", "HydraFacial"],
  ["uf", "lift", "Ultraformer III", "Micro &amp; macro focused ultrasound (HIFU)", M + "ultraformer-iii-machine.webp", 294, 730,
    "Multi-depth focused ultrasound that lifts and tightens from the skin down to the SMAS, the layer a surgeon lifts in a facelift, plus body cartridges for contouring.",
    ["Sagging", "Jawline", "Double chin", "Body tightening"], "None", "/ultraformer-iii/", "/hifu/", "HIFU"],
  ["vivace", "lift skin", "Vivace MNRF", "Microneedle radiofrequency", M + "vivace-mnrf-machine.webp", 320, 740,
    "Fine microneedles deliver radiofrequency energy into the skin to rebuild collagen, softening scars, pores, fine lines and stretch marks while tightening loose skin.",
    ["Acne scars", "Large pores", "Fine lines", "Stretch marks"], "1–3 days", "/vivace-mnrf/", "/mnrf-treatment/", "MNRF treatment"],
  ["cm", "body", "CM Slim &amp; Hipex Chair", "HI-EMT electromagnetic technology", M + "cm-slim-machine.webp", 310, 588,
    "High-intensity electromagnetic energy causes thousands of powerful muscle contractions to build muscle and reduce fat. The Hipex Chair uses the same technology to strengthen the pelvic floor.",
    ["Belly fat", "Muscle tone", "Buttock lift", "Pelvic floor"], "None", "/cm-slim-hipex-chair/", "/cm-slim/", "CM Slim"],
  ["gm", "hair body", "Candela GentleMax Pro", "Alexandrite 755 nm + Nd:YAG 1064 nm laser", M + "gentlemax-pro-machine.webp", 355, 830,
    "A dual-wavelength laser platform. The Nd:YAG wavelength is well suited to darker skin, making it a strong choice for laser hair reduction on Indian skin, as well as vascular and pigment concerns.",
    ["Laser hair reduction", "Skin rejuvenation", "Vascular lesions"], "None", "/candela-nd-yag-gentlemax-pro/", "/laser-hair-reduction/", "Laser hair reduction"],
  ["optimas", "hair skin", "InMode Optimas", "IPL, laser &amp; radiofrequency platform", M + "inmode-optimas-machine.webp", 350, 744,
    "A multi-technology platform combining intense pulsed light, laser and fractional radiofrequency for hair removal, pigmentation, redness and skin resurfacing.",
    ["Hair removal", "Pigmentation", "Redness", "Skin resurfacing"], "None to 2 days", "/inmode-optimas/", "/laser-hair-reduction/", "Laser hair reduction"],
];

const filters = [["all", "All machines"], ["skin", "Skin &amp; lasers"], ["lift", "Lifting &amp; tightening"], ["body", "Body"], ["hair", "Hair removal"]];

const carousel = `
<div class="ec" data-ec>
 <div class="ec-filter" role="group" aria-label="Filter machines">${filters.map(([f, t], i) => `<button type="button" data-ef="${f}" aria-pressed="${i === 0}">${t}</button>`).join("")}</div>
 <div class="ec-wrap">
 <button type="button" class="ec-nav ec-prev" aria-label="Previous machine" data-eprev>${k.arrow}</button>
 <div class="ec-track" data-etrack tabindex="0" aria-label="Facelit machines">
 ${machines.map(([key, cats, name, kind, src, w, h, desc, treats, down, eq, tu, tn], i) => `<article class="ec-slide" data-ec-cat="${cats}" aria-label="${i + 1} of ${machines.length}: ${name.replace(/&amp;/g, "and")}">
 <div class="ec-img"><span class="ec-badge">${FDA}</span><img src="${src}" alt="${name.replace(/&amp;/g, "and")} at Facelit" width="${w}" height="${h}" loading="${i < 3 ? "eager" : "lazy"}" decoding="async"></div>
 <div class="ec-body">
 <small>${kind}</small>
 <h3 class="font-serif">${name}</h3>
 <p>${desc}</p>
 <div class="ec-tags">${treats.map((t) => `<span>${t}</span>`).join("")}</div>
 <div class="ec-meta"><span>Downtime</span><b>${down}</b></div>
 <div class="ec-links"><a href="${eq}" class="ec-btn">Machine details ${k.arrow}</a><a href="${tu}" class="ec-tl">${tn} ${k.arrow}</a></div>
 </div>
 </article>`).join("\n ")}
 </div>
 <button type="button" class="ec-nav ec-next" aria-label="Next machine" data-enext>${k.arrow}</button>
 </div>
 <div class="ec-dots" data-edots aria-hidden="true"></div>
</div>`;

const matcher = tabs("ematch", [
  ["Acne scars &amp; pores", ["co2", "vivace"], "Collagen-rebuilding lasers and radiofrequency smooth scars and tighten pores."],
  ["Pigmentation &amp; tan", ["pico", "optimas"], "Picosecond and light-based technology break up pigment with low heat, safer for Indian skin."],
  ["Dull, congested skin", ["hydra"], "Deep cleansing, extraction and hydration in one comfortable session."],
  ["Sagging &amp; jawline", ["uf", "vivace"], "Focused ultrasound and RF microneedling lift and tighten without surgery."],
  ["Belly fat &amp; muscle tone", ["cm"], "Electromagnetic muscle stimulation builds muscle and reduces fat."],
  ["Unwanted hair", ["gm", "optimas"], "Laser and light platforms for long-term hair reduction, chosen for your skin type."],
  ["Tattoos", ["pico"], "Picosecond pulses shatter ink into tiny particles for faster fading."],
].map(([t, keys, intro]) => ({ tab: t, body: `<p class="cp-p" style="margin-top:0">${intro}</p><div class="sk-rec">${keys.map((x) => { const m = machines.find((y) => y[0] === x); return `<a href="${m[10]}"><b>${m[2]}</b><span>${m[3]}</span>${k.arrow}</a>`; }).join("")}</div>` })));

const faqs = [
  ["What machines does Facelit use?", "Facelit uses the CO2 + Erbium Glass 1550nm laser, PicoCare 450, the original HydraFacial, Ultraformer III HIFU, Vivace MNRF, CM Slim with the Hipex Chair, Candela GentleMax Pro and InMode Optimas."],
  ["Are Facelit's machines FDA-approved?", "Our machines are US FDA-cleared medical devices from established manufacturers. FDA clearance means a device has been reviewed for safety and effectiveness for specific uses."],
  ["Which laser is safe for Indian skin?", "Indian skin needs lasers and settings that keep heat and pigmentation risk low. Picosecond lasers like PicoCare 450, and the Nd:YAG wavelength used for hair reduction, are well suited to darker skin, and our doctors adjust every setting to your skin type."],
  ["What is the best machine for acne scars?", "For acne scars, we most often use the CO2 + Erbium Glass 1550nm laser or Vivace MNRF, sometimes combined with exosomes or PRP. The right choice depends on your scar type and downtime."],
  ["What is the best machine for pigmentation and melasma?", "PicoCare 450 is our main laser for pigmentation, melasma, tan and tattoos, because its ultra-short pulses break up pigment with very little heat."],
  ["Is HIFU the same as Ultraformer III?", "HIFU is the technology, and Ultraformer III is the machine we use. It's an advanced HIFU platform with multiple cartridges for different skin depths, from the surface to the SMAS lifting layer."],
  ["Which machine is used for laser hair reduction?", "We use laser platforms such as the Candela GentleMax Pro and InMode Optimas, choosing the wavelength and settings that suit your skin and hair type."],
  ["Does a better machine mean better results?", "Good technology matters, but so does who uses it. Our doctors choose the right machine, settings and number of sessions for your skin, which is what gives safe, consistent results."],
  ["Where are these machines available?", "Our full range of technology is at our flagship Trivandrum clinic, with selected machines at Karunagappally and Guruvayur. Contact us to check availability at your nearest branch."],
];

const pageCss = `<style>
.ec-filter{display:flex;gap:.5rem;overflow-x:auto;scrollbar-width:none;padding-bottom:.25rem;margin:1.25rem 0 1rem}.ec-filter::-webkit-scrollbar{display:none}
.ec-filter button{flex:none;padding:.55rem 1rem;border-radius:999px;border:1px solid rgba(58,77,57,.18);background:#fff;color:#2d3c2d;font:500 .88rem Onest,sans-serif;cursor:pointer;white-space:nowrap}
.ec-filter button[aria-pressed=true]{background:#3a4d39;color:#fdf7ef;border-color:#3a4d39}
.ec-wrap{position:relative}
.ec-track{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;padding:.25rem .1rem 1rem;-webkit-overflow-scrolling:touch}.ec-track::-webkit-scrollbar{display:none}
.ec-track:focus-visible{outline:2px solid #3a4d39;outline-offset:4px;border-radius:1rem}
.ec-slide{flex:0 0 86%;scroll-snap-align:start;display:flex;flex-direction:column;background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.4rem;overflow:hidden;box-shadow:0 14px 34px -24px rgba(45,60,45,.45)}
@media(min-width:640px){.ec-slide{flex-basis:calc(50% - .5rem)}}@media(min-width:1024px){.ec-slide{flex-basis:calc(33.333% - .67rem)}}
.ec-slide[hidden]{display:none}
.ec-img{position:relative;height:270px;display:flex;align-items:center;justify-content:center;padding:1.25rem;background:radial-gradient(circle at 50% 60%,#f6efe3 0,#fff 70%)}
.ec-img img{height:100%;width:auto;max-width:100%;object-fit:contain;mix-blend-mode:multiply}
.ec-badge{position:absolute;top:.85rem;left:.85rem;background:#3a4d39;color:#fdf7ef;border-radius:999px;padding:.3rem .7rem;font:600 .68rem Onest,sans-serif;letter-spacing:.04em}
.ec-body{padding:1.1rem 1.2rem 1.3rem;display:flex;flex-direction:column;gap:.55rem;flex:1}
.ec-body small{font:600 .68rem Onest,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#986a3e}
.ec-body h3{margin:0;font-size:1.45rem;line-height:1.15;color:#2d3c2d}
.ec-body p{margin:0;font-size:.92rem;line-height:1.55;color:#5c574f}
.ec-tags{display:flex;flex-wrap:wrap;gap:.35rem}.ec-tags span{padding:.3rem .65rem;border-radius:999px;background:#f3efe4;font-size:.78rem;color:#2d3c2d}
.ec-meta{display:flex;justify-content:space-between;align-items:center;padding:.55rem .75rem;border-radius:.75rem;background:#faf6ef;font-size:.85rem}.ec-meta span{color:#986a3e;font-weight:600}.ec-meta b{font-weight:600;color:#2d3c2d}
.ec-links{margin-top:auto;display:flex;flex-wrap:wrap;gap:.6rem;align-items:center;padding-top:.3rem}
.ec-btn{display:inline-flex;align-items:center;gap:.4rem;padding:.6rem 1rem;border-radius:999px;background:#3a4d39;color:#fdf7ef;font:500 .85rem Onest,sans-serif;text-decoration:none}
.ec-tl{display:inline-flex;align-items:center;gap:.35rem;color:#2d3c2d;font:500 .85rem Onest,sans-serif;text-decoration:underline;text-underline-offset:3px}
.ec-btn svg,.ec-tl svg{width:.85rem;height:.85rem}
.ec-nav{display:none}
@media(min-width:900px){.ec-nav{display:grid;place-items:center;position:absolute;top:118px;z-index:2;width:46px;height:46px;border-radius:50%;border:1px solid rgba(58,77,57,.18);background:#fff;color:#2d3c2d;cursor:pointer;box-shadow:0 8px 20px -10px rgba(0,0,0,.3)}.ec-nav svg{width:1.1rem;height:1.1rem}.ec-prev{left:-22px}.ec-prev svg{transform:rotate(180deg)}.ec-next{right:-22px}.ec-nav:disabled{opacity:.35;cursor:default}}
.ec-dots{display:flex;justify-content:center;gap:.4rem;margin-top:.25rem}.ec-dots i{width:8px;height:8px;border-radius:99px;background:rgba(58,77,57,.2);transition:width .2s,background .2s}.ec-dots i.on{width:22px;background:#3a4d39}
.ec-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem;margin-top:1.25rem}@media(min-width:900px){.ec-stats{grid-template-columns:repeat(4,minmax(0,1fr))}}
.ec-stats div{background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.1rem;padding:1rem}.ec-stats b{display:block;font:500 1.7rem/1.1 Onest,sans-serif;color:#3a4d39;margin-bottom:.3rem}.ec-stats span{font-size:.85rem;line-height:1.45;color:#5c574f}
.sk-rec{display:grid;gap:.6rem}
.sk-rec a{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"b i" "s i";column-gap:.75rem;align-items:center;padding:.85rem 1rem;border:1px solid rgba(58,77,57,.14);border-radius:1rem;background:#fff;text-decoration:none;color:#2d3c2d}
.sk-rec a:hover{border-color:#3a4d39;background:#f3efe4}.sk-rec b{grid-area:b;font:600 1rem Onest,sans-serif}.sk-rec span{grid-area:s;font-size:.85rem;color:#5c574f;line-height:1.4}.sk-rec svg{grid-area:i;width:1rem;height:1rem;color:#986a3e}
</style>`;

const pageJs = `<script>(function(){
var r=document.querySelector('[data-ec]');if(!r)return;var tr=r.querySelector('[data-etrack]'),dots=r.querySelector('[data-edots]'),pv=r.querySelector('[data-eprev]'),nx=r.querySelector('[data-enext]');
function vis(){return [].slice.call(tr.querySelectorAll('.ec-slide')).filter(function(s){return !s.hidden})}
function step(){var s=vis()[0];return s?s.getBoundingClientRect().width+16:300}
function draw(){var v=vis();dots.innerHTML=v.map(function(){return '<i></i>'}).join('');upd()}
function upd(){var v=vis(),x=tr.scrollLeft,i=Math.round(x/step()),d=dots.children;for(var j=0;j<d.length;j++)d[j].className=j===Math.min(i,v.length-1)?'on':'';
if(pv)pv.disabled=x<8;if(nx)nx.disabled=x+tr.clientWidth>=tr.scrollWidth-8}
pv&&pv.addEventListener('click',function(){tr.scrollBy({left:-step()})});nx&&nx.addEventListener('click',function(){tr.scrollBy({left:step()})});
tr.addEventListener('scroll',function(){window.requestAnimationFrame(upd)},{passive:true});
tr.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();tr.scrollBy({left:step()})}if(e.key==='ArrowLeft'){e.preventDefault();tr.scrollBy({left:-step()})}});
r.querySelectorAll('[data-ef]').forEach(function(b){b.addEventListener('click',function(){var f=b.dataset.ef;r.querySelectorAll('[data-ef]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
tr.querySelectorAll('.ec-slide').forEach(function(s){s.hidden=!(f==='all'||s.dataset.ecCat.split(' ').indexOf(f)>-1)});tr.scrollLeft=0;draw()})});
window.addEventListener('resize',upd);draw();
})();</script>`;

// New sections, built with the treatment kit but scoped inside a .cp wrapper so the original sections keep their own styling.
const machinesSection = shell("machines", `${head("Machines available", "Our Technology, Machine by Machine", "Eight advanced, US FDA-cleared machines, each chosen for a job it does best. Swipe through, or filter by what you want to treat.")}${carousel}
 <div class="ec-stats">
 <div><b>8</b><span>advanced machines across skin, lifting, body and hair</span></div>
 <div><b>FDA</b><span>cleared medical devices from established brands</span></div>
 <div><b>Doctor</b><span>chooses the machine and settings for your skin</span></div>
 <div><b>Indian skin</b><span>technology and settings chosen for brown skin</span></div>
 </div>`);

const matchSection = shell("match", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Find the right technology", "Which Machine Treats Your Concern?", "Tap a concern to see the machines our doctors use for it.")}
 ${matcher}
 </div>
 <div class="cp-split-sep">
 ${head("Why it matters", "Why the Right Machine Makes a Difference", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Safety for Indian skin", "Brown skin reacts more easily to heat. Modern technologies like picosecond lasers, focused ultrasound and RF microneedling give results with less risk of pigmentation."],
   ["Precision", "Advanced machines target exact depths and wavelengths, so energy goes where it's needed and nowhere else."],
   ["Comfort and less downtime", "Newer devices deliver energy faster and more evenly, which means shorter sessions and quicker recovery."],
   ["Consistent, measurable results", "Medical-grade devices give predictable results that we can repeat and track over time."],
   ["Genuine consumables", "We use the manufacturer's genuine tips, cartridges and serums, which matters for both safety and results."],
 ], false)}</div>
 </div>
 </div>`);

const compareSection = shell("compare", `${head("Compare", "Our Machines at a Glance", "Scroll sideways on mobile to see every column.")}
 ${k.compareTable(["Technology", "Best for", "Downtime"], machines.map((m) => [`<a href="${m[10]}">${m[2]}</a>`, m[3], m[8].join(", "), m[9]]))}`);

const faqSection = shell("faq", `${head("Questions", "Machines &amp; Technology FAQs", "")}
 <div class="cp-faq" data-faq>${accordion(faqs, false, 6)}</div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>
 <div class="cp-center" style="margin-top:1rem"><a class="cp-textlink" href="/equipment/">View all equipment ${k.arrow}</a></div>`);

// Assemble: original hero (sections 0-1), new machine sections, original doctor + products, new FAQs, original CTA.
const jsonPath = process.argv[2];
const page = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const bak = JSON.parse(fs.readFileSync(new URL("../../../backup/ecosystem.json.bak", import.meta.url), "utf8"));
const orig = bak.bodyHtml.match(/<main[\s\S]*<\/main>/)[0];
const secs = orig.replace(/^<main[^>]*>/, "").replace(/<\/main>$/, "").split(/(?=<section)/);
const [pre, hero, , doctor, products, ctaSec] = secs;
const css = fs.readFileSync(new URL("../treatment-kit/cp.css", import.meta.url), "utf8");
const js = fs.readFileSync(new URL("../treatment-kit/cp.js", import.meta.url), "utf8");
const cpWrap = (html) => `<div class="cp">${html}</div>`;
const main = `<main class="relative overflow-x-clip text-ink">${pre}${hero}<style>${css}</style>${pageCss}${cpWrap(machinesSection + matchSection + compareSection)}${doctor}${products}${cpWrap(faqSection)}${ctaSec}<script>${js}</script>${pageJs}</main>`;
const b = page.bodyHtml, s = b.indexOf("<main"), e = b.indexOf("</main>") + 7;
page.bodyHtml = b.slice(0, s) + main + b.slice(e);
page.bodyHtml = page.bodyHtml.replace(/\/wp-content\/uploads\/2026\/08\/eco-doctor-devi\.webp/g, "/wp-content/uploads/2026/07/devi.webp"); // same doctor photo as the home page
const h = page.head;
h.title = h.og.title = h.tw.title = "Facelit Ecosystem | FDA-Cleared Machines, Doctors & Products in Kerala";
h.description = h.og.description = h.tw.description = "Meet the technology behind Facelit: CO2 + Erbium Glass, PicoCare 450, Ultraformer III HIFU, Vivace MNRF, HydraFacial, CM Slim, GentleMax Pro and InMode Optimas, used by doctors in Kerala.";
const strip = (x) => x.replace(/<[^>]+>/g, "");
h.jsonld = h.jsonld.filter((j) => !/"(FAQPage|ItemList)"/.test(j));
h.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: strip(q), acceptedAnswer: { "@type": "Answer", text: strip(a) } })) }));
h.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: "Facelit medical equipment", itemListElement: machines.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: strip(m[2]).replace(/&amp;/g, "&"), url: "https://facelit.in" + m[10] })) }));
fs.writeFileSync(jsonPath, JSON.stringify(page));
console.log("ok", main.length);
