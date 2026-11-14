// Builds the redesigned /hydrating-fillers-treatment/ page.
// Usage (from facelit-site/): node scripts/fillers/build.mjs content/pages/hydrating-fillers-treatment.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";

const HERO = [A + "anti-aging-hero.webp", "Indian woman with plump, hydrated, glowing skin after hydrating fillers"];
const INJECT = [A + "NCTF-Treatment.webp", "Doctor giving a fine hyaluronic acid injection to a woman's face at Facelit", 1080, 1080];
const BEFORE = [A + "anti-aging-before-scaled-1.webp", "Indian woman with tired, dehydrated skin and fine lines before hydrating fillers", 1920, 2560];
const AFTER = [A + "anti-aging-after-scaled-1.webp", "Indian woman with smoother, plumper skin after hydrating fillers", 1920, 2560];

// Face map: [tab label, dot x%, dot y%, title, text, bullets, typical ml, lasts]
const areas = [
  ["Skin hydration", 72, 20, "Whole-face skin hydration", "Tiny droplets of soft hyaluronic acid placed just under the skin across the face. It draws in water from within, so dull, dry or crepey skin looks plumper, smoother and glowing. Ideal if your skin looks tired even with a good skincare routine.", ["Deep, lasting hydration", "Fine lines soften", "Better glow and texture"], "1–2 ml", "6–9 months"],
  ["Temples", 23, 27, "Hollow temples", "Temples lose volume with age or weight loss, making the face look narrow and tired. A small amount of filler restores a smooth, youthful curve.", ["Softer, fuller upper face", "Frames the eyes"], "1–2 ml", "12–18 months"],
  ["Under-eyes", 37, 44, "Under-eye hollows (tear troughs)", "Hollows under the eyes cast shadows that look like dark circles and make you look tired. A soft filler placed carefully fills the hollow so the area looks brighter and rested.", ["Less shadowing", "More rested look", "Very soft, precise product"], "0.5–1 ml (both)", "9–12 months"],
  ["Cheeks", 26, 52, "Cheek volume", "Cheeks flatten with age, which pulls the lower face down. Restoring cheek volume lifts the mid-face and softens the folds below.", ["Lifted mid-face", "Softer smile lines", "Natural contour"], "1–2 ml", "12–18 months"],
  ["Nose", 50, 46, "Non-surgical nose shaping", "Filler can smooth a bump, lift the tip slightly or straighten the bridge, all without surgery. Results show straight away.", ["Smoother profile", "No surgery or downtime"], "0.5–1 ml", "9–12 months"],
  ["Smile lines", 36, 63, "Smile lines (nasolabial folds)", "The folds that run from the nose to the corners of the mouth. Filler softens them, often best combined with cheek filler for a natural lift.", ["Softer folds", "Fresher lower face"], "1–2 ml", "9–12 months"],
  ["Lips", 50, 65, "Lip hydration and shape", "From a subtle hydrating lip treatment to more definition and volume. We aim for soft, natural lips that suit your face, never overdone.", ["Hydrated, smoother lips", "Better shape and balance", "Softens lip lines"], "0.5–1 ml", "6–12 months"],
  ["Marionette lines", 62, 72, "Marionette lines", "Lines from the corners of the mouth down to the chin can make you look sad or tired. Filler supports the area and lifts the mouth corners.", ["Lifted mouth corners", "Less tired look"], "1 ml", "9–12 months"],
  ["Chin &amp; jawline", 60, 82, "Chin and jawline contouring", "Filler can project a small chin, balance the profile and sharpen the jawline for a more defined look from every angle.", ["Sharper jawline", "Balanced profile", "Works well for men too"], "1–4 ml", "12–18 months"],
];
const extra = [
  ["Neck", "Fine lines and crepey skin on the neck", "1–2 ml"],
  ["Hands", "Thin, veiny backs of the hands", "1–2 ml"],
];

const benefits = [
  ["drop", "Deep Hydration", "Hyaluronic acid holds up to 1,000 times its weight in water, hydrating skin from within."],
  ["wave", "Softer Fine Lines", "Plumps the skin so fine lines and crepey texture smooth out."],
  ["lift", "Restores Lost Volume", "Fills hollows in the cheeks, under-eyes and temples for a fresher, lifted look."],
  ["spark", "Instant Results", "You'll see a difference right away, with the final result settling in 2 to 4 weeks."],
  ["shield", "Reversible &amp; Safe", "HA fillers can be dissolved with an enzyme if ever needed, which makes them one of the safest injectables."],
  ["heal", "Little Downtime", "Mild swelling or a small bruise for a few days. Most people go back to work the same day."],
  ["clock", "Long-Lasting", "Results last from 6 to 18 months, depending on the area and product."],
  ["leaf", "Face, Neck &amp; Hands", "Improves skin on the neck, chest and hands too, not just the face."],
];

const finderResults = [
  { v: "dull", label: "Dull, dry, tired skin", img: [A + "skin-hero-1.webp", "Indian woman with healthy, glowing skin", 1726, 1152], title: "Glow Hydration Plan",
    text: "Skin-hydrating HA is placed in tiny droplets across the face to boost moisture from within, for a smoother, glowing look.",
    subtle: "A 1 ml hydration treatment, repeated once after 4 weeks for the best glow.", visible: "Hydration plus a small amount of cheek support for a fresher, lifted look.",
    sessions: "1–2, then every 6–9 months", combine: "Profhilo, HydraFacial" },
  { v: "eyes", label: "Hollow, dark under-eyes", img: AFTER, title: "Rested Eyes Plan",
    text: "A soft, low-volume filler fills under-eye hollows so shadows fade and you look less tired.",
    subtle: "A light under-eye treatment with a 2-week review.", visible: "Under-eyes plus cheek support, as the two areas work together.",
    sessions: "1 session, top-up at 9–12 months", combine: "Under-eye skin boosters, PRP" },
  { v: "lips", label: "Thin or dry lips", img: BEFORE, title: "Soft Lips Plan",
    text: "Lip filler can simply hydrate and smooth the lips, or add shape and volume. We always keep it in balance with your face.",
    subtle: "A lip hydration treatment for smoother, softer lips with very little change in size.", visible: "Lip volume and definition, built up gently over one or two visits.",
    sessions: "1 session, top-up at 6–12 months", combine: "Lip flip (Botox)" },
  { v: "volume", label: "Flat cheeks or deep folds", img: [A + "anti-aging-hero.webp", "Indian woman with full, lifted cheeks", 1716, 1144], title: "Lift &amp; Restore Plan",
    text: "Restoring cheek volume lifts the mid-face and softens smile lines and marionette lines below.",
    subtle: "Cheeks first, then a review to see if the folds still need help.", visible: "Cheeks, smile lines and marionette lines in a full-face plan.",
    sessions: "1–2 sessions", combine: "Botox, HIFU" },
  { v: "jaw", label: "Weak chin or jawline", img: INJECT, title: "Contour Plan",
    text: "Chin and jawline filler sharpens the lower face and balances the profile, without surgery.",
    subtle: "Chin projection only, for better balance with the nose and lips.", visible: "Chin and jawline together for a more defined look.",
    sessions: "1 session, top-up at 12–18 months", combine: "Jaw slimming (Botox)" },
  { v: "lines", label: "Fine lines and crepey skin", img: [A + "anti-aging-before-scaled-1.webp", "Fine lines on an Indian woman's skin", 1920, 2560], title: "Smooth Skin Plan",
    text: "Very fine lines respond best to skin-hydrating HA, which smooths the skin from within rather than filling single lines.",
    subtle: "Hydrating HA for the face, neck or hands.", visible: "Hydrating HA plus Botox for lines caused by movement.",
    sessions: "1–2, then every 6–9 months", combine: "Botox, Profhilo" },
];

const kinds = [
  ["Skin-hydrating HA", 1, "Very soft hyaluronic acid placed in tiny droplets just under the skin. It hydrates rather than adds shape.", "dull, dry skin, fine lines, neck, hands", "1–2 days of small bumps", "1–2, then every 6–9 months"],
  ["Soft volume fillers", 2, "Medium-strength HA for gentle volume where skin is thin and delicate.", "lips, under-eyes, smile lines", "2–5 days of swelling", "top-up every 6–12 months"],
  ["Structural fillers", 3, "Firmer HA that holds shape for lifting and contouring.", "cheeks, chin, jawline, temples, nose", "2–5 days of swelling", "top-up every 12–18 months"],
];

const menuRows = [
  ["Hydrating Fillers (1 ml)", "Flexible", "glow volume contour", "Healthy, hydrated, baby-soft skin. One syringe, used where your doctor recommends.", ["Per ml", "Any area"], "Fine injections of hyaluronic acid after numbing.", "1–3 days", "1"],
  ["Skin Glow Hydration", "Popular", "glow", "Skin-hydrating HA across the face for a plumper, glowing look.", ["Glow", "Fine lines"], "Tiny droplets placed across the face, repeated after 4 weeks.", "1–2 days", "2"],
  ["Lip Hydration &amp; Shape", "Lips", "volume", "Softer, smoother lips with natural shape.", ["Lips"], "Hydrating or volumising lip filler, built up gently.", "2–5 days", "1"],
  ["Under-Eye Rejuvenation", "Eyes", "volume", "Fills under-eye hollows for a brighter, rested look.", ["Tear trough"], "A soft filler placed with a fine cannula or needle.", "2–5 days", "1"],
  ["Cheek &amp; Mid-Face Lift", "Lift", "volume contour", "Restores cheek volume and softens folds below.", ["Cheeks", "Smile lines"], "Structural filler placed deep for a natural lift.", "2–5 days", "1"],
  ["Chin &amp; Jawline Contour", "Contour", "contour", "A sharper jawline and balanced profile.", ["Chin", "Jawline"], "Firm filler along the chin and jaw.", "2–5 days", "1"],
  ["Neck &amp; Hand Hydration", "Body", "glow", "Smoother, plumper skin on the neck or the backs of the hands.", ["Neck", "Hands"], "Skin-hydrating HA in fine droplets.", "1–3 days", "1–2"],
];

const faqs = [
  ["What are hydrating fillers?", "Hydrating fillers are injectable gels made of hyaluronic acid (HA), a sugar your skin already makes to hold water. Soft HA hydrates the skin from within, while firmer HA adds volume and shape to areas like the lips, cheeks and under-eyes."],
  ["How are hydrating fillers different from regular fillers?", "Skin-hydrating HA is very soft and spread in tiny droplets to improve skin quality, glow and fine lines. Regular (volumising) fillers are firmer and placed in specific spots to add shape. Many people benefit from a mix of both."],
  ["Are fillers safe?", "Yes, when given by trained doctors with genuine, approved products. HA is naturally found in the body, and HA fillers can be dissolved with an enzyme called hyaluronidase if ever needed."],
  ["Does it hurt?", "Most fillers contain a local anaesthetic, and we apply numbing cream first. Most people feel only mild pressure or pinches."],
  ["When will I see results?", "Right away. There may be some swelling for a few days, and the final result settles in 2 to 4 weeks as the HA draws in water."],
  ["How long do fillers last?", "Skin-hydrating HA lasts about 6 to 9 months. Lip filler lasts 6 to 12 months, and cheek, chin and jawline fillers can last 12 to 18 months."],
  ["Will I look fake or overdone?", "No. Our doctors plan each treatment around your face and use only what you need. You can always start small and add more later, but it's harder to take away."],
  ["How many ml of filler will I need?", "It depends on the area. Lips usually need 0.5 to 1 ml, under-eyes 0.5 to 1 ml for both sides, and cheeks 1 to 2 ml. Try our syringe estimator above, and your doctor will confirm."],
  ["Can fillers be reversed?", "Yes. HA fillers can be dissolved with hyaluronidase, usually within a day or two. This is one of the main reasons we use HA fillers."],
  ["What's the difference between fillers and Botox?", "Fillers add hydration and volume to fill hollows, lips and folds. Botox relaxes muscles to smooth lines caused by movement. They're often used together."],
  ["What are the side effects?", "Mild swelling, redness, tenderness or a small bruise for a few days is common. Rare risks include lumps or, very rarely, a blocked blood vessel. That's why fillers should only be done by doctors who know facial anatomy and have hyaluronidase on hand."],
  ["Who should avoid fillers?", "Fillers aren't advised during pregnancy or breastfeeding, with an active skin infection, cold sore or acne in the area, or with certain autoimmune conditions. Tell your doctor about any medicines you take."],
  ["Can I have fillers on my neck and hands?", "Yes. Skin-hydrating HA works well on crepey neck skin and thin, veiny hands."],
  ["Where can I get hydrating fillers in Kerala?", "Facelit offers hydrating fillers in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much do fillers cost?", "Fillers at Facelit are priced per 1 ml syringe, so the cost depends on how many syringes you need. Your doctor will tell you the exact amount and cost before starting."],
];

const face = `
<div class="bx-map">
 <div class="bx-face">
 <svg viewBox="0 0 300 380" aria-hidden="true" fill="none" stroke="#3a4d39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 <path d="M150 18c-62 0-98 46-98 112 0 40 8 78 24 112 18 38 44 66 74 66s56-28 74-66c16-34 24-72 24-112 0-66-36-112-98-112Z" fill="#fdf7ef"/>
 <path d="M118 308c0 18-4 34-10 50M182 308c0 18 4 34 10 50" opacity=".6"/>
 <path d="M88 122c14-10 34-12 50-6M162 116c16-6 36-4 50 6"/>
 <path d="M96 148c10-8 28-8 38 0-10 8-28 8-38 0ZM166 148c10-8 28-8 38 0-10 8-28 8-38 0Z"/>
 <circle cx="115" cy="148" r="5" fill="#3a4d39" stroke="none"/><circle cx="185" cy="148" r="5" fill="#3a4d39" stroke="none"/>
 <path d="M150 156v46c-6 6-14 10-18 8M150 202c6 6 14 10 18 8" opacity=".75"/>
 <path d="M122 244c10-6 20-8 28-4 8-4 18-2 28 4-6 12-50 12-56 0Z" fill="#e9d3b8"/>
 <path d="M124 214c-8 14-10 26-6 36M176 214c8 14 10 26 6 36" opacity=".35"/>
 </svg>
 ${areas.map(([t, x, y], i) => `<button type="button" class="bx-dot" style="left:${x}%;top:${y}%" data-go="t-areas-${i}" aria-label="${t.replace(/&amp;/g, "and")}">${i + 1}</button>`).join("")}
 </div>
 <p class="cp-note" style="text-align:center">Tap a number to see what fillers do there.</p>
</div>`;

const areaTabs = tabs("areas", areas.map(([t, , , title, text, more, ml, lasts], i) => ({ tab: `${i + 1} · ${t}`, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${title}</h3>
 <p class="cp-p">${text}</p>
 ${list(more)}
 <div class="cp-rec"><div><small>Typical amount</small><b>${ml}</b></div><div><small>Lasts about</small><b>${lasts}</b></div></div>` })));

const range = (s) => { const m = s.match(/([\d.]+)(?:–([\d.]+))?/); return [m[1], m[2] || m[1]]; };
const estimator = `
<div class="bx-est" data-est>
 <div class="bx-opts">
 ${areas.map(([t, , , , , , ml]) => { const [a, b] = range(ml); return `<label><input type="checkbox" data-min="${a}" data-max="${b}"><span>${t}<small>${ml}</small></span></label>`; }).join("")}
 ${extra.map(([t, d, ml]) => { const [a, b] = range(ml); return `<label><input type="checkbox" data-min="${a}" data-max="${b}"><span>${t}<small>${ml} · ${d.toLowerCase()}</small></span></label>`; }).join("")}
 </div>
 <div class="bx-total" aria-live="polite">
 <small>Estimated total</small>
 <b data-out>Pick an area</b>
 <p>A rough guide only. The exact amount depends on your face, your skin and the look you want. Your doctor will confirm before treatment.</p>
 <a href="/appointment/" class="btn-3d-forest btn-press inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium">Book a consultation</a>
 </div>
</div>`;

const pageCss = `<style>
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start}}
.bx-face{position:relative;max-width:320px;margin:0 auto}
.bx-face svg{width:100%;height:auto;display:block}
.bx-dot{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;background:#986a3e;color:#fff;font:600 13px/26px Onest,sans-serif;text-align:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.18);cursor:pointer;transition:transform .15s,background .15s}
.bx-dot:hover,.bx-dot[aria-current=true]{background:#3a4d39;transform:translate(-50%,-50%) scale(1.15)}
.bx-dot:focus-visible{outline:2px solid #3a4d39;outline-offset:2px}
.bx-est{display:grid;gap:1.25rem}.bx-est>*{min-width:0}@media(min-width:900px){.bx-est{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);align-items:start}}
.bx-opts{display:grid;grid-template-columns:1fr;gap:.6rem}@media(min-width:560px){.bx-opts{grid-template-columns:1fr 1fr}}
.bx-opts label{display:flex;gap:.7rem;align-items:flex-start;padding:.8rem .95rem;border:1px solid rgba(58,77,57,.15);border-radius:1rem;background:#fff;cursor:pointer;font-size:.95rem;color:#2d3c2d}
.bx-opts label:has(input:checked){border-color:#3a4d39;background:#f3efe4}
.bx-opts input{margin-top:.2rem;accent-color:#3a4d39;width:18px;height:18px;flex:none}
.bx-opts small{display:block;color:#5c574f;font-size:.8rem;margin-top:.15rem}
.bx-total{background:linear-gradient(160deg,#3a4d39,#2d3c2d);color:#fdf7ef;border-radius:1.25rem;padding:1.4rem}
.bx-total small{display:block;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.bx-total b{display:block;font-size:1.9rem;margin:.35rem 0 .6rem;font-weight:500}
.bx-total p{font-size:.85rem;opacity:.8;margin:0 0 1rem;line-height:1.5}
.bx-total .btn-3d-forest{background:#fdf7ef;color:#2d3c2d}
@media(min-width:900px){.bx-total{position:sticky;top:7rem}}
</style>`;

const pageJs = `<script>(function(){
var m=document.querySelector('.bx-map');if(m){var dots=[].slice.call(m.querySelectorAll('.bx-dot'));
function mark(id){dots.forEach(function(d){d.setAttribute('aria-current',d.dataset.go===id)})}
dots.forEach(function(d){d.addEventListener('click',function(){var t=document.getElementById(d.dataset.go);if(t){t.click();mark(d.dataset.go);if(window.innerWidth<900)t.closest('[data-tabs]').scrollIntoView({behavior:'smooth',block:'start'})}})});
document.querySelectorAll('[id^=t-areas-]').forEach(function(t){t.addEventListener('click',function(){mark(t.id)})});mark('t-areas-0');}
var e=document.querySelector('[data-est]');if(e){var out=e.querySelector('[data-out]');var f=function(n){return Math.round(n*10)/10};e.addEventListener('change',function(){var lo=0,hi=0,n=0;e.querySelectorAll('input:checked').forEach(function(i){lo+=+i.dataset.min;hi+=+i.dataset.max;n++});lo=f(lo);hi=f(hi);var s=function(v){return Math.ceil(v)};out.textContent=n?(lo===hi?lo:lo+'–'+hi)+' ml · about '+(s(lo)===s(hi)?s(hi):s(lo)+'–'+s(hi))+(s(hi)>1?' syringes':' syringe'):'Pick an area'})}
})();</script>`;

const sections = [
  k.hero({
    tags: ["Anti-ageing", "Hyaluronic acid", "Doctor-led"], h1: "Hydrating Fillers",
    img: HERO, pos: "65% 40%",
    intro: "Skin looking dull, dry or tired even with a good routine? Under-eyes hollow, lips thin, or cheeks flatter than they used to be? Hydrating fillers use hyaluronic acid, a moisture magnet your skin already makes, to hydrate from within, soften fine lines and restore lost volume. You'll see results right away, with natural results planned by our doctors.",
    facts: [["30–45 min", "Treatment time"], ["1–3 days", "Downtime"], ["Instant", "Results"], ["6–18 months", "Results last"]],
    cta2: ["#face-map", "Explore treatment areas"],
  }),
  k.jump([["overview", "Overview"], ["face-map", "Face map"], ["types", "Types"], ["ml", "Syringe estimator"], ["finder", "Find your plan"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What Are Hydrating Fillers?</h2>
 <div class="cp-prose">
 <p>Your skin is full of hyaluronic acid (HA), a natural sugar that holds onto water and keeps skin plump, bouncy and smooth. From our mid-20s, the body makes less of it every year. Add sun, pollution and air-conditioning, and skin starts to look dull and dry, with fine lines and hollows appearing.</p>
 <p>Hydrating fillers put that HA back. Very soft HA, placed in tiny droplets under the skin, hydrates from within for a smoother, glowing look. Firmer HA, placed in specific spots, restores volume to lips, cheeks, under-eyes, chin and jawline. Most treatments take 30 to 45 minutes, and you see the difference straight away.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why HA fillers are so safe ${k.plus}</summary>
 <div class="cp-prose">
 <p>HA is already found in your skin, joints and eyes, so the body accepts it well and breaks it down naturally over time. Even better, HA fillers can be dissolved with an enzyme called hyaluronidase if you ever want to change the result or if there's a problem. That's why our doctors use only HA fillers for the face.</p>
 <p>Safety still depends on who injects. Our doctors know facial anatomy in detail, use cannulas where they're safer, and always keep hyaluronidase on hand.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How hydrating fillers work">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Place</b><span>HA is placed precisely where your skin needs hydration or support.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Attract water</b><span>Each molecule draws in water from the surrounding skin.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Plump &amp; glow</b><span>Skin looks smoother, fuller and more radiant within days.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...BEFORE)}
 ${img(...AFTER)}
 </div>
 </div>`),

  shell("face-map", `${head("Treatment areas", "Where Can Fillers Help? Tap the Face Map", "Tap a number on the face, or pick an area from the list, to see what fillers do there, the typical amount and how long it lasts.")}
 <div class="bx-wrap">${face}<div>${areaTabs}</div></div>`),

  shell("types", `${head("Not all fillers are the same", "Hydrating, Soft or Structural?", "Fillers come in different strengths. Your doctor picks the right one for each area, and often uses more than one.")}${k.depthCards(kinds)}`),

  shell("ml", `${head("Syringe estimator", "How Much Filler Might You Need?", "Fillers at Facelit are priced per 1 ml syringe. Tick the areas you're thinking about for a rough idea.")}${estimator}`),

  shell("finder", `${head("Find your plan", "Which Filler Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan at your consultation.")}
 ${k.finder({ q1: "What bothers you most?", q2: { label: "What kind of change do you want?", dt: "Our suggestion", options: [["subtle", "Subtle, no one should notice"], ["visible", "A visible refresh"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of Hydrating Fillers", "Hydration, smoothness and volume, with results you can see the same day.")}${k.benefitsGrid(benefits)}`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Is it right for you?", "Signs Your Skin Needs Hydration", "Fillers aren't only about volume. Many people come to us for these everyday skin problems.")}
 ${tabs("signs", [
   { tab: "Dull &amp; tired", body: `<p class="cp-p" style="margin-top:0">Your skin looks flat and lacks glow, even after a good night's sleep and a full skincare routine. Skin-hydrating HA restores moisture deep down, where creams can't reach.</p>${list(["Brighter, glowing skin", "Makeup sits better", "Results build over 2 to 4 weeks"])}` },
   { tab: "Dry &amp; crepey", body: `<p class="cp-p" style="margin-top:0">Skin feels tight and looks crinkly, especially around the eyes, cheeks, neck and hands. HA plumps it from within so it looks smoother and firmer.</p>${list(["Smoother texture", "Bouncier skin", "Works on neck and hands too"])}` },
   { tab: "Fine lines", body: `<p class="cp-p" style="margin-top:0">Fine lines that show even when your face is relaxed are often a sign of dehydration. Hydrating HA softens them, and Botox helps with lines caused by movement.</p>${list(["Softer fine lines", "Pairs well with Botox"])}` },
   { tab: "Hollows &amp; volume loss", body: `<p class="cp-p" style="margin-top:0">Hollow under-eyes, flatter cheeks, thinner lips or deeper folds come from losing volume under the skin. Soft and structural fillers restore it naturally.</p>${list(["Fresher, rested look", "Natural lift", "Instant results"])}` },
 ])}
 </div>
 <div class="cp-split-sep">${head("Good to know", "Fillers for Indian Skin", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Safe for all skin tones", "Because HA fillers are injected under the skin, there's no risk of the pigmentation that some lasers and peels can cause on brown skin."],
   ["Great for under-eye hollows", "Many people with Indian skin have under-eye hollows that look like dark circles. Filler can soften the shadow, while pigment-type dark circles need peels, lasers or creams."],
   ["Humidity and sun", "Kerala's sun and humidity can leave skin dehydrated under the surface. Daily SPF and hydrating HA keep it plump and protected."],
   ["Natural features", "We enhance your own features, keeping lips, cheeks and nose in proportion with your face, never copying a trend."],
 ])}</div></div>
 </div>`),

  shell("plans", `${head("Packages", "Hydrating Filler Packages at Facelit", "Pay per syringe for any area, or choose a popular treatment.")}
 ${k.menu([["all", "All"], ["glow", "Glow &amp; hydration"], ["volume", "Volume"], ["contour", "Contour"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Hydrating Fillers Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor planning a filler treatment with a patient", 1151, 768], lead: "A proper consultation and plan come first.",
     items: ["Your doctor studies your face, skin and goals, and explains which filler suits each area.", "Avoid aspirin, ibuprofen, fish oil and vitamin E for a week if your doctor agrees, to reduce bruising.", "Skip alcohol and smoking for 24 to 48 hours before.", "Drink plenty of water and avoid very salty food the day before.", "Plan around big events, as swelling can last a few days."] },
   { tab: "02 · During", img: INJECT, lead: "Treatment takes 30 to 45 minutes, including numbing.",
     items: ["Your skin is cleansed and numbing cream is applied.", "The doctor marks the areas and checks the plan with you.", "HA is placed with a very fine needle or a blunt cannula.", "Most fillers contain anaesthetic, so it feels more comfortable as you go.", "The area is gently shaped, and you see the result in the mirror."] },
   { tab: "03 · After", img: AFTER, lead: "Most people go back to work the same day. The full aftercare plan is below.",
     items: ["Mild swelling, redness or a small bruise for a few days.", "Use a cold pack for 10 minutes at a time.", "Avoid alcohol, the gym, saunas and strong sun for 24 to 48 hours.", "Don't press or massage the area unless your doctor tells you to.", "Come back at 2 weeks for a review."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "Hydrating Fillers Results Timeline", "You'll see a change straight away, and it gets better as the filler settles.")}
 ${k.timeline([["Same day", "Instant change", "Volume and smoothness show immediately, with some swelling."], ["Days 3–7", "Swelling settles", "Any swelling or bruising fades and the shape softens."], ["Weeks 2–4", "Final result", "HA draws in water, skin looks plumper and glowing. We review you at 2 weeks."], ["6–18 months", "Top up", "The body slowly breaks down HA. A small top-up keeps results going."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have dull, dry or dehydrated skin", "Have hollow under-eyes, thin lips or flat cheeks", "Want results you can see the same day", "Want a natural look you can adjust"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Are pregnant or breastfeeding", "Have an infection, cold sore or active acne in the area", "Have a big event within a week", "Mainly have lines from movement (Botox suits these better)"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "Filler Aftercare", "Simple steps that reduce swelling and help your filler settle beautifully.")}${tabs("aftercare", [
   { tab: "First 24 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Use a cold pack, 10 minutes at a time", "Sleep with your head slightly raised", "Drink plenty of water", "Keep the area clean"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Touching, pressing or massaging the area", "Makeup for 12 hours", "Alcohol, gym, saunas and steam", "Sleeping face-down"], warn)}</div></div>` },
   { tab: "Days 2–14", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Use gentle, hydrating skincare", "Wear SPF 30 or higher every day", "Keep drinking plenty of water", "Come for your 2-week review"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Facials, massages and face rollers", "Retinoids and strong exfoliants for a few days", "Smoking and alcohol for a week", "Dental work for 2 weeks if you can"], warn)}</div></div>` },
   { tab: "Call us if", body: `<div class="cp-card"><h3 class="font-serif">Contact us straight away if you notice</h3>${list(["Severe or increasing pain", "Skin turning white, grey, blue or blotchy near the treated area", "Changes in your vision", "Swelling, warmth or redness that gets worse after 2 days"], warn)}<p class="cp-p">These are rare, but our doctors can treat them quickly, so always call.</p></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "Filler Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"Fillers always look fake.\"", "Overfilled faces come from too much product in the wrong places. Well-planned filler just looks like a fresher, rested you."],
   ["\"Fillers are permanent.\"", "HA fillers break down naturally over 6 to 18 months, and can be dissolved sooner if needed."],
   ["\"Fillers and Botox are the same.\"", "Fillers add hydration and volume. Botox relaxes muscles. They do different jobs and often work together."],
   ["\"Once you stop, your face sags.\"", "When filler wears off, you simply return to how you would have looked without it. It doesn't stretch or damage your skin."],
   ["\"Fillers are only for older people.\"", "Many people in their 20s and 30s use hydrating HA for glow, lip hydration and under-eye hollows."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "Hydrating Fillers vs Botox vs Profhilo", "Three popular injectables that do very different jobs.")}
 ${k.compareTable(["Hydrating fillers", '<a href="/botox-treatments/">Botox</a>', '<a href="/profhilo-treatment/">Profhilo</a>'], [
   ["What it does", "Hydrates skin and restores volume", "Relaxes muscles that cause lines", "Deeply hydrates and firms skin"],
   ["Best for", "Dull skin, lips, under-eyes, cheeks, jaw", "Forehead lines, 11s, crow's feet", "Crepey or loose skin"],
   ["Results show", "Immediately", "2–3 days", "2–4 weeks"],
   ["Lasts", "6–18 months", "3–4 months", "About 6 months"],
   ["Downtime", "1–3 days", "None", "Small bumps for a day"],
   ["Reversible", "Yes, with hyaluronidase", "Wears off in months", "Wears off in months"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Hydrating Fillers?</h2>
 ${img("/wp-content/uploads/2026/07/devi.webp", "Dr. Devi KR, Facelit", 1143, 1376, "cp-img cp-img--wide cp-img--doc")}
 </div>
 ${k.whyList([
   ["Doctor-only injections", "Every filler treatment is planned and given by our trained dermatologists and aesthetic doctors who know facial anatomy in detail."],
   ["Genuine, approved HA fillers", "We use only genuine hyaluronic acid fillers from authorised suppliers, and you can see the product before we start."],
   ["Safety first", "We use cannulas where they're safer and always keep hyaluronidase on hand."],
   ["Natural, balanced results", "We plan around your whole face and your features, and never overfill."],
   ["Clear per-syringe pricing", "You'll know how many syringes you need and the cost before treatment, with a 2-week review included."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Side Effects and Who Should Wait", "HA fillers are among the safest injectables. Here's what's normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Mild swelling for 2 to 5 days, more on the lips", "Redness or tenderness", "A small bruise", "Small bumps that settle as the filler softens"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant or breastfeeding", "Get cold sores (we may give medicine before lip filler)", "Have an autoimmune condition", "Take blood thinners", "Have had a reaction to fillers or lidocaine before"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "Hydrating Fillers FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "Fillers at Facelit", "")}
 ${k.links([["/best-lip-fillers-in-trivandrum/", "Location", "Lip fillers in Trivandrum"], ["/dermal-fillers-types-benefits-cost-in-trivandrum/", "Guide", "Dermal fillers: types, benefits and cost"], ["/botox-vs-fillers-for-anti-aging-in-trivandrum/", "Guide", "Botox vs fillers"], ["/skin-boosters-help-reduce-fine-lines-and-wrinkles/", "Guide", "How skin boosters reduce fine lines"], ["/botox-treatments/", "Treatment", "Botox"], ["/profhilo-treatment/", "Treatment", "Profhilo"]])}`),

  k.cta("Want fresher, hydrated skin that still looks like you?", "Book a consultation. Our doctors will look at your skin and face, explain exactly how much filler you need and plan a natural result."),
];

sections[3] = sections[3].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Hydrating Fillers in Kerala | Lip, Under-Eye & Skin Fillers | Facelit",
  desc: "Doctor-led hyaluronic acid fillers in Trivandrum, Kollam & Thrissur. Hydrate dull skin, soften fine lines, and restore lips, under-eyes and cheeks. Natural, reversible results.",
  image: "https://facelit.in/wp-content/uploads/2026/08/anti-aging-hero.webp",
  faqs,
  procedure: { name: "Hydrating (Hyaluronic Acid) Fillers", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face, neck and hands",
    howPerformed: "After cleansing and numbing, hyaluronic acid gel is placed with a fine needle or cannula, either in tiny droplets for skin hydration or in specific areas to restore volume and contour.",
    preparation: "Doctor consultation and facial assessment, avoiding blood-thinning medicines and supplements if advised, and no alcohol or smoking for 24 to 48 hours before.",
    followup: "Cold packs, no pressing or massage, and no alcohol, exercise or heat for 24 to 48 hours. Review at 2 weeks, with top-ups every 6 to 18 months." },
  crumbs: [["Home", "https://facelit.in/"], ["Anti-aging", "https://facelit.in/anti-aging-treatments/"], ["Hydrating Fillers", "https://facelit.in/hydrating-fillers-treatment/"]],
});
