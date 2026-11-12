// Builds the redesigned /botox-treatments/ page.
// Usage (from facelit-site/): node scripts/botox/build.mjs content/pages/botox-treatments.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const HERO = [A + "NCTF-Treatment.webp", "Doctor giving a precise anti-wrinkle injection to a woman at Facelit"];
const BEFORE = [A + "anti-aging-before-scaled-1.webp", "Indian woman with fine lines and wrinkles before anti-wrinkle treatment", 1920, 2560];
const AFTER = [A + "anti-aging-after-scaled-1.webp", "Indian woman with smoother, refreshed skin after anti-wrinkle treatment", 1920, 2560];

// Face map areas: [tab label, dot x%, dot y%, title, text, bullets, units, lasts]
const areas = [
  ["Forehead lines", 50, 17, "Horizontal forehead lines", "The lines that appear when you raise your eyebrows. Botox softens the forehead muscle so lines fade, while keeping natural movement so you don't look surprised or frozen.", ["Smoother forehead", "Natural eyebrow movement kept", "Makeup sits better"], "10–20 units", "3–4 months"],
  ["Frown lines (11s)", 50, 30, "Frown lines between the brows", "The \"11\" lines that make you look angry, worried or tired even when you're not. This is one of the most popular and effective areas for Botox.", ["Softer, more relaxed look", "Stops deep 11s forming", "Often the first area people treat"], "15–25 units", "3–4 months"],
  ["Crow's feet", 27, 40, "Crow's feet around the eyes", "Fan-shaped lines at the outer corners of the eyes that show when you smile. Small doses soften them while keeping your smile warm and natural.", ["Brighter, fresher eyes", "Natural smile kept", "Pairs well with forehead and frown lines"], "12–24 units (both sides)", "3–4 months"],
  ["Brow lift", 73, 29, "Non-surgical brow lift", "A few carefully placed units lift the tail of the eyebrows, opening up the eyes and making heavy or drooping brows look lighter.", ["More open, awake eyes", "Subtle arch to the brows", "No surgery"], "4–10 units", "3–4 months"],
  ["Bunny lines", 58, 47, "Bunny lines on the nose", "Little lines on the sides of the nose that appear when you scrunch up your face or laugh. Often treated together with frown lines.", ["Smoother nose bridge", "Quick add-on area"], "4–10 units", "3–4 months"],
  ["Gummy smile &amp; lip flip", 50, 63, "Gummy smile and lip flip", "A tiny dose relaxes the upper lip muscle so less gum shows when you smile, or so the upper lip rolls out slightly to look a little fuller.", ["Less gum on show", "Slightly fuller-looking upper lip", "Very small, precise doses"], "2–6 units", "2–3 months"],
  ["Chin dimpling", 50, 81, "Dimpled or \"orange peel\" chin", "An overactive chin muscle can make the chin look bumpy or dimpled. Botox relaxes it for a smoother chin.", ["Smoother chin", "Softer lower face"], "4–10 units", "3–4 months"],
  ["Jaw slimming", 32, 68, "Jaw slimming and teeth grinding", "Strong masseter (chewing) muscles make the face look square and wide. Botox slims them over a few weeks for a softer, more V-shaped face, and often helps with teeth grinding and jaw tension too.", ["Slimmer, softer jawline", "Less clenching and grinding", "Results build over 4 to 8 weeks"], "40–60 units (both sides)", "4–6 months"],
  ["Neck bands", 50, 96, "Neck bands", "Vertical bands on the neck from the platysma muscle can make the neck look older. Botox relaxes them and can give a subtle lift along the jawline.", ["Smoother neck", "Sharper jawline", "Pairs well with jaw slimming"], "20–40 units", "3–4 months"],
];

const medical = [
  ["Excessive sweating", "Sweating through shirts even in an air-conditioned room is a medical condition called hyperhidrosis. Botox in the underarms switches off overactive sweat glands for months.", ["Dry underarms for 4 to 6 months, often longer", "No more sweat patches", "Can also treat palms and feet"], "50 units per underarm", "4–6+ months"],
  ["Migraine &amp; tension headaches", "For chronic migraine, Botox can reduce how often headaches happen. This is a medical treatment planned by your doctor after a full assessment.", ["Fewer headache days for many people", "Doctor-led medical plan"], "Planned by your doctor", "about 3 months"],
];

const benefits = [
  ["wave", "Smooths Lines", "Softens forehead lines, frown lines and crow's feet caused by repeated expressions."],
  ["shield", "Prevents Deep Wrinkles", "Relaxing the muscles early stops fine lines from deepening into permanent creases."],
  ["clock", "15-Minute Treatment", "Quick enough for a lunch break. No anaesthesia needed for most areas."],
  ["heal", "No Downtime", "Tiny marks fade within an hour. Go straight back to work."],
  ["spark", "Natural Results", "Our doctors use precise doses so you look fresher, not frozen."],
  ["lift", "Lifts and Reshapes", "Can lift the brows, slim the jaw and soften neck bands without surgery."],
  ["drop", "Medical Benefits Too", "Treats excessive sweating, teeth grinding and some types of migraine."],
  ["layers", "Results in Days", "Starts working in 2 to 3 days, with full results at 2 weeks."],
];

const finderResults = [
  { v: "forehead", label: "Forehead lines", img: BEFORE, title: "Smooth Forehead Plan",
    text: "Forehead lines are usually treated together with frown lines, because the muscles work as a team. Treating both gives a smoother, more balanced result.",
    first: "A light, natural dose first, then a 2-week review to fine-tune.", repeat: "Your usual dose, adjusted to how long your last treatment lasted.",
    sessions: "Every 3–4 months", combine: "Frown lines, skin boosters" },
  { v: "frown", label: "Look tired or angry", img: [A + "anti-aging-hero.webp", "Indian woman with relaxed, refreshed skin", 1716, 1144], title: "Relaxed Expression Plan",
    text: "Frown lines between the brows make you look cross or tired even when you're happy. Softening them is one of the quickest ways to look more rested.",
    first: "Frown lines first, with crow's feet added if you'd like.", repeat: "Frown lines plus a small brow lift for a more open look.",
    sessions: "Every 3–4 months", combine: "Brow lift, crow's feet" },
  { v: "eyes", label: "Lines around the eyes", img: [A + "skin-hero-1.webp", "Smiling Indian woman with healthy skin", 1726, 1152], title: "Bright Eyes Plan",
    text: "Crow's feet show most when you smile. Small doses soften them while keeping your smile natural.",
    first: "Crow's feet with a light dose to keep your smile natural.", repeat: "Crow's feet plus under-eye skin boosters for crepey skin.",
    sessions: "Every 3–4 months", combine: "Skin boosters, under-eye care" },
  { v: "jaw", label: "Square jaw or teeth grinding", img: HERO.concat([1080, 1080]), title: "Jaw Slimming Plan",
    text: "Strong chewing muscles widen the lower face and cause clenching. Botox slims them gradually for a softer, V-shaped look.",
    first: "Masseter Botox with a review at 4 weeks, as slimming builds slowly.", repeat: "Top-ups every 4 to 6 months. Many people need fewer units over time.",
    sessions: "Every 4–6 months", combine: "Jawline fillers, HIFU" },
  { v: "sweat", label: "Excessive sweating", img: [A + "about-hero.webp", "Facelit doctor consulting a patient", 1151, 768], title: "Stay Dry Plan",
    text: "Botox blocks the signal to overactive sweat glands, keeping underarms dry for months.",
    first: "Underarm treatment after a quick check to map the sweaty area.", repeat: "Repeat when sweating returns, usually after 4 to 6 months or longer.",
    sessions: "Every 4–6+ months", combine: "Palms and feet if needed" },
  { v: "prevent", label: "Prevent lines (20s–30s)", img: [A + "blog-glow.webp", "Young Indian woman with glowing skin", 1400, 933], title: "Baby Botox Plan",
    text: "Baby Botox uses smaller doses spread more widely to soften movement just enough to stop fine lines from setting in, with a very natural look.",
    first: "A light dose on the areas where you move most.", repeat: "Light top-ups 2 to 3 times a year.",
    sessions: "2–3 times a year", combine: "Skin boosters, good skincare" },
];

const doseCards = [
  ["Baby Botox (preventive)", 1, "Smaller doses for people in their 20s and 30s who see lines only when they move. Keeps lots of natural movement.", "early fine lines, first-timers", "none", "2–3 times a year"],
  ["Standard anti-wrinkle", 2, "The classic treatment for lines on the forehead, between the brows and around the eyes.", "visible expression lines", "none", "every 3–4 months"],
  ["Shaping &amp; medical", 3, "Larger muscles and medical uses such as jaw slimming, neck bands, teeth grinding and excessive sweating.", "square jaw, neck, sweating", "none", "every 4–6 months"],
];

const menuRows = [
  ["Botox (Per Unit)", "Flexible", "lines shape medical", "Pay only for the units you need. Your doctor maps your face and tells you the exact units before treatment.", ["Any area", "Per unit"], "Precise injections into the muscles behind your lines.", "None", "Every 3–4 months"],
  ["Baby Botox", "Preventive", "lines", "Light doses for early fine lines and a very natural look.", ["20s–30s", "Natural"], "Smaller doses spread across forehead, frown lines and eyes.", "None", "2–3 times a year"],
  ["Upper Face (3 Areas)", "Popular", "lines", "Forehead lines, frown lines and crow's feet together for a balanced, refreshed look.", ["Forehead", "11s", "Crow's feet"], "All three areas treated in one 15 to 20 minute visit.", "None", "Every 3–4 months"],
  ["Jaw Slimming", "Shaping", "shape", "Slims the masseter muscles for a softer, V-shaped face and less teeth grinding.", ["Jawline", "Grinding"], "Injections into both chewing muscles, with a 4-week review.", "None", "Every 4–6 months"],
  ["Underarm Sweating", "Medical", "medical", "Keeps underarms dry for months by calming overactive sweat glands.", ["Hyperhidrosis"], "Fine injections across the sweaty area after a quick map.", "None", "Every 4–6+ months"],
  ["Botox + Fillers", "Combo", "lines shape", "Botox for movement lines plus hydrating fillers for lost volume, for full-face rejuvenation.", ["Fillers", "Combo"], "Planned together at one consultation.", "0–2 days", "As planned"],
];

const faqs = [
  ["What is Botox?", "Botox is a purified protein (botulinum toxin type A) that temporarily relaxes the muscles that cause expression lines. In tiny, precise doses, it smooths wrinkles on the forehead, between the brows and around the eyes."],
  ["Is Botox safe?", "Yes, when it's given by trained doctors using genuine, approved products. It has been used in medicine for over 30 years. The doses used for wrinkles are very small and stay in the treated muscle."],
  ["Does Botox hurt?", "Most people say it feels like a quick pinch. The needles are very fine and the injections take only a few minutes. Numbing cream or ice can be used if you're nervous."],
  ["When will I see results?", "Botox starts working in 2 to 3 days, and full results show at about 2 weeks. Jaw slimming takes longer, about 4 to 8 weeks."],
  ["How long does Botox last?", "Usually 3 to 4 months for lines on the face, and 4 to 6 months or longer for the jaw and underarm sweating. Results often last longer with regular treatments."],
  ["Will I look frozen?", "No. Our doctors use precise doses to soften lines while keeping your natural expressions. You'll still be able to smile, frown and raise your brows, just with fewer lines."],
  ["How many units of Botox will I need?", "It depends on the area and how strong your muscles are. As a guide, frown lines need about 15 to 25 units and the forehead 10 to 20. Use our unit estimator above, and your doctor will confirm the exact amount."],
  ["At what age should I start Botox?", "There's no fixed age. Many people start in their late 20s or 30s with Baby Botox to prevent lines setting in. Others start later to soften lines they already have."],
  ["What happens when Botox wears off?", "Your muscles slowly return to normal and lines come back gradually. They don't get worse than before. Many people find their lines are softer over time with regular treatment."],
  ["What's the difference between Botox and fillers?", "Botox relaxes muscles to smooth lines caused by movement. Fillers add volume to fill hollows, lips and deep folds. They're often used together for a fuller refresh."],
  ["Are there any side effects?", "Small red marks, mild swelling or a small bruise for a day or two are common. A mild headache can happen. A droopy eyelid or brow is rare and wears off within a few weeks."],
  ["Who should not get Botox?", "Botox isn't suitable during pregnancy or breastfeeding, for people with certain nerve or muscle conditions such as myasthenia gravis, or where there's an infection in the area. Tell your doctor about all your medicines."],
  ["Can men get Botox?", "Yes. Men usually have stronger muscles and may need a few more units. Forehead lines, frown lines, crow's feet and jaw slimming are popular with men."],
  ["Where can I get Botox in Kerala?", "Facelit offers Botox treatments in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does Botox cost?", "Botox at Facelit is priced per unit, so you pay only for what you need. Your doctor will tell you the exact units and cost before starting."],
];

// Interactive face map: SVG line drawing + numbered hotspots wired to the area tabs.
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
 <path d="M122 242c10-6 20-8 28-4 8-4 18-2 28 4-10 12-46 12-56 0Z" fill="#e9d3b8"/>
 <path d="M122 242c18 4 38 4 56 0" opacity=".6"/>
 <path d="M112 70c24-4 52-4 76 0M108 86c28-4 56-4 84 0" opacity=".25"/>
 </svg>
 ${areas.map(([t, x, y], i) => `<button type="button" class="bx-dot" style="left:${x}%;top:${y}%" data-go="t-areas-${i}" aria-label="${t.replace(/&amp;/g, "and")}">${i + 1}</button>`).join("")}
 </div>
 <p class="cp-note" style="text-align:center">Tap a number to see what Botox does there.</p>
</div>`;

const areaTabs = tabs("areas", areas.map(([t, , , title, text, more, units, lasts], i) => ({ tab: `${i + 1} · ${t}`, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${title}</h3>
 <p class="cp-p">${text}</p>
 ${list(more)}
 <div class="cp-rec"><div><small>Typical units</small><b>${units}</b></div><div><small>Lasts about</small><b>${lasts}</b></div></div>` })));

const estimator = `
<div class="bx-est" data-est>
 <div class="bx-opts">
 ${areas.concat(medical).map(([t, a, b, c, d, e, units]) => {
   const lbl = typeof a === "number" ? t : t; const u = typeof a === "number" ? units : c;
   const m = (u.match(/(\d+)–(\d+)/) || []);
   if (!m[1]) { const s = u.match(/(\d+) units per underarm/); if (!s) return ""; return `<label><input type="checkbox" data-min="${s[1] * 2}" data-max="${s[1] * 2}"><span>${lbl}<small>${s[1] * 2} units (both)</small></span></label>`; }
   return `<label><input type="checkbox" data-min="${m[1]}" data-max="${m[2]}"><span>${lbl}<small>${u}</small></span></label>`;
 }).join("")}
 </div>
 <div class="bx-total" aria-live="polite">
 <small>Estimated total</small>
 <b data-out>Pick an area</b>
 <p>A rough guide only. The exact units depend on the product, your muscle strength and the look you want. Your doctor will confirm before treatment.</p>
 <a href="/appointment/" class="btn-3d-forest btn-press inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium">Book a consultation</a>
 </div>
</div>`;

const pageCss = `<style>
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start}}
.bx-face{position:relative;max-width:320px;margin:0 auto}
.bx-face svg{width:100%;height:auto;display:block}
.bx-dot{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;background:#986a3e;color:#fff;font:600 13px/30px Onest,sans-serif;text-align:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.18);cursor:pointer;transition:transform .15s,background .15s}
.bx-dot:hover,.bx-dot[aria-current=true]{background:#3a4d39;transform:translate(-50%,-50%) scale(1.15)}
.bx-dot:focus-visible{outline:2px solid #3a4d39;outline-offset:2px}
.bx-est{display:grid;gap:1.25rem}@media(min-width:900px){.bx-est{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);align-items:start}}
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
var e=document.querySelector('[data-est]');if(e){var out=e.querySelector('[data-out]');e.addEventListener('change',function(){var lo=0,hi=0,n=0;e.querySelectorAll('input:checked').forEach(function(i){lo+=+i.dataset.min;hi+=+i.dataset.max;n++});out.textContent=n?(lo===hi?lo:lo+'–'+hi)+' units':'Pick an area'})}
})();</script>`;

const sections = [
  k.hero({
    tags: ["Anti-ageing", "Doctor-led", "15-minute treatment"], h1: "Botox Treatments",
    img: HERO, pos: "50% 45%",
    intro: "Forehead lines, frown lines or crow's feet making you look tired or older than you feel? Botox relaxes the tiny muscles behind expression lines so your skin smooths out, in a quick 15-minute visit with no downtime. Our doctors use precise doses for a fresher, natural look, never a frozen one.",
    facts: [["10–20 min", "Treatment time"], ["None", "Downtime"], ["2–3 days", "Starts working"], ["3–4 months", "Results last"]],
    cta2: ["#face-map", "Explore treatment areas"],
  }),
  k.jump([["overview", "Overview"], ["face-map", "Face map"], ["units", "Unit estimator"], ["finder", "Find your plan"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is Botox?</h2>
 <div class="cp-prose">
 <p>Botox is a purified protein (botulinum toxin type A) that has been used safely in medicine for over 30 years. Every time you frown, squint or raise your eyebrows, small facial muscles tighten and fold the skin above them. Over the years, those folds turn into lines.</p>
 <p>A few tiny, precise injections tell those muscles to relax. The skin on top smooths out, and new lines stop forming. Treatment takes about 15 minutes, starts working in 2 to 3 days and lasts around 3 to 4 months.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: dynamic vs static wrinkles ${k.plus}</summary>
 <div class="cp-prose">
 <p><b>Dynamic wrinkles</b> show only when you move, like forehead lines when you raise your brows. Botox works brilliantly on these.</p>
 <p><b>Static wrinkles</b> are still there when your face is relaxed, because the skin has creased over time. Botox softens them, and pairing it with <a href="/hydrating-fillers-treatment/">hydrating fillers</a>, <a href="/profhilo-treatment/">Profhilo</a> or <a href="/microneedling/">microneedling</a> helps fill and repair the crease. That's also why starting earlier, before lines set in, gives the smoothest result.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How Botox works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Block</b><span>Botox quietens the nerve signal that tells the muscle to tighten.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Relax</b><span>The muscle softens, so it stops folding the skin.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Smooth</b><span>Lines fade over 2 weeks and new ones stop forming.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...BEFORE)}
 ${img(...AFTER)}
 </div>
 </div>`),

  shell("face-map", `${head("Treatment areas", "Where Can Botox Help? Tap the Face Map", "Tap a number on the face, or pick an area from the list, to see what Botox does there, the typical units and how long it lasts.")}
 <div class="bx-wrap">${face}<div>${areaTabs}</div></div>`),

  shell("", `${head("Beyond wrinkles", "Medical Uses of Botox", "Botox isn't only cosmetic. These treatments are planned by our doctors after a full assessment.")}
 <div class="cp-two">${medical.map(([t, text, more, units, lasts]) => `<div class="cp-card"><h3 class="font-serif">${t}</h3><p class="cp-p">${text}</p>${list(more)}<div class="cp-rec"><div><small>Typical units</small><b>${units}</b></div><div><small>Lasts about</small><b>${lasts}</b></div></div></div>`).join("")}</div>`),

  shell("units", `${head("Unit estimator", "How Many Units Might You Need?", "Botox at Facelit is priced per unit, so you only pay for what you need. Tick the areas you're thinking about for a rough idea.")}${estimator}`),

  shell("finder", `${head("Find your plan", "Which Botox Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan at your consultation.")}
 ${k.finder({ q1: "What bothers you most?", q2: { label: "Have you had Botox before?", dt: "Our suggestion", options: [["first", "No, this is my first time"], ["repeat", "Yes, I've had it before"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of Botox Treatment", "Quick, precise and proven, with results you can see in days.")}${k.benefitsGrid(benefits)}`),

  shell("", `${head("Choose your approach", "Baby Botox, Standard or Shaping?", "The same product, used very differently depending on your age, your lines and your goals.")}${k.depthCards(doseCards)}`),

  shell("plans", `${head("Packages", "Botox Packages at Facelit", "Pay per unit for any area, or choose a popular combination.")}
 ${k.menu([["all", "All"], ["lines", "Lines &amp; wrinkles"], ["shape", "Face shaping"], ["medical", "Medical"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Botox Treatment Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor discussing Botox with a patient", 1151, 768], lead: "A proper consultation comes first.",
     items: ["Your doctor talks through your concerns, goals and medical history.", "They watch how your face moves to plan the right points and doses.", "Avoid aspirin, ibuprofen, fish oil and vitamin E for about a week if your doctor agrees, to reduce bruising.", "Skip alcohol for 24 hours before.", "Come with clean skin if you can."] },
   { tab: "02 · During", img: HERO.concat([1080, 1080]), lead: "The injections take 10 to 20 minutes, depending on the areas.",
     items: ["Your skin is cleaned and the injection points may be marked.", "Ice or numbing cream can be used if you're nervous.", "Tiny amounts are injected with a very fine needle.", "Most people feel only quick pinches.", "Small bumps settle within 15 to 30 minutes."] },
   { tab: "03 · After", img: AFTER, lead: "You can go straight back to your day. The full aftercare plan is below.",
     items: ["Stay upright for 4 hours.", "Don't rub, massage or press the treated areas for 24 hours.", "Skip the gym, saunas and alcohol for 24 hours.", "Results start in 2 to 3 days and are complete at 2 weeks.", "Come back at 2 weeks for a review and any touch-ups."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "Botox Results Timeline", "Botox works gradually, so you'll look refreshed rather than suddenly different.")}
 ${k.timeline([["Day 2–3", "It starts working", "Muscles begin to relax and lines start to soften."], ["Day 7–14", "Full results", "Lines look their smoothest. We review you at 2 weeks."], ["Months 3–4", "Wears off slowly", "Movement returns gradually, with no sudden change."], ["Repeat", "Keep it going", "Regular treatment keeps lines soft, and results often last longer over time."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have lines that show when you move your face", "Look tired, worried or cross when you're not", "Want to prevent lines from setting in", "Have a square jaw, grind your teeth or sweat a lot"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Are pregnant or breastfeeding", "Have a nerve or muscle condition such as myasthenia gravis", "Have an infection where you'd be treated", "Want to fill hollows or lost volume (fillers suit that better)"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "Botox Aftercare", "A few simple rules help the Botox stay exactly where it was placed.")}${tabs("aftercare", [
   { tab: "First 4 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Stay upright", "Gently use your treated muscles, like frowning and raising brows", "Carry on with work or normal activities"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Lying down or bending over for long", "Touching or rubbing the area", "Wearing tight caps or headbands"], warn)}</div></div>` },
   { tab: "First 24 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Wash your face gently", "Use a cold pack if you have a small bruise", "Sleep on your back if you can"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Facials, massages and face rollers", "Gym, saunas and steam", "Alcohol", "Makeup for a few hours"], warn)}</div></div>` },
   { tab: "First 2 weeks", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Wear sunscreen every day", "Keep up your skincare routine", "Come for your 2-week review"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Facials and laser treatments on the area", "Firm pressure or face massage", "Judging the result before 2 weeks"], warn)}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "Botox Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"Botox will make me look frozen.\"", "A frozen look comes from too much product in the wrong places. Our doctors use precise doses that keep your natural expressions."],
   ["\"Botox is poison.\"", "It's a highly purified medicine used in tiny, measured doses. It has been used safely in medicine for over 30 years."],
   ["\"If I stop, my wrinkles will get worse.\"", "When Botox wears off, your face returns to how it was. Lines don't get worse, and regular users often have softer lines over time."],
   ["\"Botox fills wrinkles.\"", "Botox relaxes the muscles that cause lines. Fillers are what add volume. They do different jobs and often work well together."],
   ["\"Botox is only for women.\"", "Many men have Botox for forehead lines, frown lines, jaw slimming and sweating."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "Botox vs Fillers vs Profhilo", "Three popular injectable treatments that do very different jobs.")}
 ${k.compareTable(["Botox", '<a href="/hydrating-fillers-treatment/">Fillers</a>', '<a href="/profhilo-treatment/">Profhilo</a>'], [
   ["What it does", "Relaxes muscles that cause lines", "Adds volume and shape", "Deeply hydrates and firms skin"],
   ["Best for", "Forehead lines, 11s, crow's feet, jaw", "Lips, cheeks, under-eyes, deep folds", "Dull, crepey or loose skin"],
   ["Starts working", "2–3 days", "Immediately", "2–4 weeks"],
   ["Lasts", "3–4 months", "6–18 months", "About 6 months"],
   ["Downtime", "None", "0–2 days of swelling", "Small bumps for a day"],
   ["Can be combined", "Yes", "Yes", "Yes"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Botox?</h2>
 ${img(A + "eco-doctor-devi.webp", "Facelit dermatologist", 672, 891, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Doctor-only injections", "Every Botox treatment is planned and given by our trained dermatologists and aesthetic doctors."],
   ["Genuine, approved products", "We use only genuine botulinum toxin from authorised suppliers, so you know exactly what's going into your skin."],
   ["Natural, never frozen", "We study how your face moves and use precise doses to soften lines while keeping your expressions."],
   ["Transparent per-unit pricing", "You'll know the exact units and cost before we start, with no surprises."],
   ["Free 2-week review", "We check your result at 2 weeks and fine-tune if needed."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Side Effects and Who Should Wait", "Botox is one of the most studied cosmetic treatments in the world. Here's what's normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Small red marks or bumps for 15 to 30 minutes", "Mild swelling or a small bruise", "A mild headache on the first day", "Rarely, a heavy brow or droopy eyelid that wears off within a few weeks"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant, trying to conceive or breastfeeding", "Have myasthenia gravis or another nerve or muscle condition", "Have an infection or active acne where you'd be treated", "Take blood thinners or certain antibiotics", "Had a reaction to Botox before"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "Botox Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "Botox at Facelit", "")}
 ${k.links([["/best-botox-treatment-for-wrinkles-in-trivandrum/", "Location", "Botox for wrinkles in Trivandrum"], ["/botox-skin-treatment-in-kerala/", "Location", "Botox treatment in Kerala"], ["/botox-vs-fillers-for-anti-aging-in-trivandrum/", "Guide", "Botox vs fillers"], ["/how-to-reduce-forehead-wrinkles/", "Guide", "How to reduce forehead wrinkles"], ["/hydrating-fillers-treatment/", "Treatment", "Hydrating fillers"], ["/profhilo-treatment/", "Treatment", "Profhilo"]])}`),

  k.cta("Ready to look as fresh as you feel?", "Book a consultation. Our doctors will study how your face moves, explain exactly how many units you need and plan a natural-looking result."),
];

// Page-specific styles and script go with the face map section.
sections[3] = sections[3].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Botox Treatment in Kerala for Wrinkles & Fine Lines | Facelit",
  desc: "Doctor-led Botox in Trivandrum, Kollam & Thrissur for forehead lines, frown lines, crow's feet, jaw slimming and sweating. Natural results, no downtime, priced per unit.",
  image: "https://facelit.in/wp-content/uploads/2026/08/NCTF-Treatment.webp",
  faqs,
  procedure: { name: "Botox (Botulinum Toxin) Treatment", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face",
    howPerformed: "After cleansing and marking, small doses of botulinum toxin type A are injected with a fine needle into the muscles that cause expression lines.",
    preparation: "Doctor consultation and facial assessment, avoiding blood-thinning medicines and supplements if advised, and no alcohol for 24 hours before.",
    followup: "Stay upright for 4 hours, no rubbing or massage for 24 hours, avoid exercise, heat and alcohol for 24 hours, and attend a review at 2 weeks. Repeat every 3 to 4 months." },
  crumbs: [["Home", "https://facelit.in/"], ["Anti-aging", "https://facelit.in/anti-aging-treatments/"], ["Botox Treatments", "https://facelit.in/botox-treatments/"]],
});
