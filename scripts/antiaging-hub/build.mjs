// Builds the redesigned /anti-aging-treatments/ category hub page.
// Usage (from facelit-site/): node scripts/antiaging-hub/build.mjs content/pages/anti-aging-treatments.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";

const HERO = [A + "anti-aging-hero.webp", "Indian woman with smooth, youthful, glowing skin after anti-ageing treatment at Facelit"];
const BEFORE = [A + "anti-aging-before-scaled-1.webp", "Indian woman with fine lines and tired skin before anti-ageing treatment", 1920, 2560];
const AFTER = [A + "anti-aging-after-scaled-1.webp", "The same Indian woman with smoother, firmer, refreshed skin", 1920, 2560];

// Treatments: key -> [url, name, image, alt, w, h, line, bestFor, results, lasts]
const T = {
  botox: ["/botox-treatments/", "Botox", A + "NCTF-Treatment.webp", "Doctor giving a precise anti-wrinkle injection", 1080, 1080, "Relaxes the muscles behind expression lines for a smoother, fresher look.", "Forehead lines, frown lines, crow's feet", "2–3 days", "3–4 months"],
  fillers: ["/hydrating-fillers-treatment/", "Hydrating Fillers", A + "anti-aging-hero.webp", "Indian woman with plump, hydrated skin", 1716, 1144, "Hyaluronic acid to hydrate skin and restore lips, cheeks and under-eyes.", "Volume loss, hollows, lips", "Instant", "6–18 months"],
  prof: ["/profhilo-treatment/", "Profhilo", A + "skin-hero-1.webp", "Smiling Indian woman with firm, glowing skin", 1726, 1152, "Ultra-pure HA skin booster that hydrates and firms crepey, tired skin.", "Crepey skin, dullness, early laxity", "1–8 weeks", "About 6 months"],
  hifu: ["/hifu/", "HIFU (Ultraformer III)", A + "anti-aging-after-scaled-1.webp", "Indian woman with a lifted jawline", 1920, 2560, "Focused ultrasound that lifts jowls, jawline and brows without surgery.", "Sagging, jowls, double chin", "1–3 months", "12–18 months"],
  prp: ["/prp-face-treatment/", "PRP Face", A + "skin-after-1-scaled.webp", "Indian woman with clear, refreshed skin", 1920, 2560, "Your own platelets to boost collagen, glow and under-eye skin.", "Fine lines, dark circles, texture", "2–3 months", "12–18 months"],
};
const chip = (x) => `<a href="${T[x][0]}">${T[x][1]} ${k.arrow}</a>`;

// Face map: [tab, x%, y%, problem, treatments]
const areas = [
  ["Forehead", 50, 17, "Horizontal lines when you raise your brows, and lines that stay when your face is relaxed.", ["botox", "prof"]],
  ["Frown lines", 50, 30, "The \"11\" lines between the brows that make you look tired or cross.", ["botox"]],
  ["Crow's feet", 27, 40, "Fan-shaped lines at the corners of the eyes when you smile.", ["botox", "prp"]],
  ["Under-eyes", 37, 45, "Hollows, dark shadows and crepey skin under the eyes.", ["fillers", "prp"]],
  ["Cheeks", 28, 56, "Flatter cheeks and lost volume that pull the lower face down.", ["fillers", "prof", "hifu"]],
  ["Lips &amp; mouth", 50, 66, "Thinner lips, lip lines and smile lines around the mouth.", ["fillers", "botox"]],
  ["Jowls &amp; jawline", 70, 74, "A blurred jawline, jowls and early sagging along the lower face.", ["hifu", "fillers"]],
  ["Neck", 50, 96, "Crepey skin, neck lines and loose skin.", ["hifu", "prof", "botox"]],
];

const decades = [
  { tab: "20s", body: `<p class="cp-p" style="margin-top:0"><b>What's happening:</b> collagen production starts to slow from the mid-20s. Sun damage begins to build quietly.</p>${list(["Daily sunscreen and a good skincare routine", "Baby Botox if you move your forehead a lot", "HydraFacial or light peels for glow"])}<div class="bd-chips">${chip("botox")}<a href="/hydrafacial-treatments/">HydraFacial ${k.arrow}</a></div>` },
  { tab: "30s", body: `<p class="cp-p" style="margin-top:0"><b>What's happening:</b> fine lines appear around the eyes and forehead, and skin starts to lose its bounce and glow.</p>${list(["Botox for expression lines", "Profhilo or PRP to boost skin quality", "Under-eye care for dark circles and hollows"])}<div class="bd-chips">${chip("botox")}${chip("prof")}${chip("prp")}</div>` },
  { tab: "40s", body: `<p class="cp-p" style="margin-top:0"><b>What's happening:</b> volume loss in the cheeks and temples, deeper lines and early sagging along the jaw.</p>${list(["Fillers to restore lost volume", "HIFU to lift and tighten", "Botox and skin boosters for lines and quality"])}<div class="bd-chips">${chip("fillers")}${chip("hifu")}${chip("botox")}</div>` },
  { tab: "50s+", body: `<p class="cp-p" style="margin-top:0"><b>What's happening:</b> thinner skin, jowls, neck laxity and more visible pigmentation.</p>${list(["A combined plan: lifting, volume and skin quality", "HIFU and Profhilo for firmness", "Pigment treatments for age spots"])}<div class="bd-chips">${chip("hifu")}${chip("prof")}<a href="/pico-450-laser/">Pico for age spots ${k.arrow}</a></div>` },
];

const finderResults = [
  { v: "lines", label: "Lines and wrinkles", img: BEFORE, title: "Smooth Lines Plan",
    text: "Lines from movement respond best to Botox. Lines that stay at rest also need skin-quality treatments.",
    none: "Botox for expression lines, with Profhilo for skin quality.", some: "Botox plus PRP with microneedling for deeper renewal.",
    sessions: "Botox every 3–4 months", combine: "Profhilo, PRP" },
  { v: "volume", label: "Hollow or tired face", img: [A + "anti-aging-hero.webp", "Indian woman", 1716, 1144], title: "Restore Volume Plan",
    text: "Lost volume in the cheeks, temples and under-eyes makes the face look tired. Hyaluronic acid fillers restore it naturally.",
    none: "Soft fillers placed carefully, with very little downtime.", some: "Fillers plus Profhilo for a full refresh.",
    sessions: "1 session, top-up at 6–18 months", combine: "Profhilo" },
  { v: "sag", label: "Sagging and jowls", img: AFTER, title: "Lift &amp; Tighten Plan",
    text: "HIFU reaches the deep lifting layer to firm the jawline, cheeks and brows without surgery.",
    none: "HIFU with Ultraformer III, which has no downtime.", some: "HIFU plus fillers for lift and volume together.",
    sessions: "1 session, yearly top-up", combine: "Fillers, Profhilo" },
  { v: "crepey", label: "Dull, crepey skin", img: [A + "skin-hero-1.webp", "Indian woman with glowing skin", 1726, 1152], title: "Skin Quality Plan",
    text: "Crepey, dull skin needs deep hydration and fresh collagen.",
    none: "Profhilo, 2 sessions a month apart.", some: "PRP with microneedling for deeper collagen renewal.",
    sessions: "2–5 sessions", combine: "HydraFacial" },
  { v: "eyes", label: "Tired under-eyes", img: [A + "../07/654-Dark-Circles1.webp", "Indian woman with dark circles", 1080, 1080], title: "Bright Eyes Plan",
    text: "Under-eye ageing can be hollows, thin skin or pigment. We treat the right cause.",
    none: "Under-eye PRP for thin, crepey skin.", some: "Soft under-eye filler for hollows, with PRP for skin quality.",
    sessions: "1–3 sessions", combine: "Botox for crow's feet" },
  { v: "prevent", label: "Prevent ageing", img: [A + "blog-glow.webp", "Young Indian woman", 1400, 933], title: "Prevention Plan",
    text: "Starting early keeps collagen strong and slows lines and sagging.",
    none: "Baby Botox and Profhilo with good skincare.", some: "PRP with microneedling once or twice a year.",
    sessions: "2–3 times a year", combine: "Daily SPF, retinoid" },
];

const faqs = [
  ["What are the best anti-ageing treatments?", "It depends on what's bothering you. Botox is best for lines from movement, fillers for lost volume, Profhilo and PRP for skin quality, and HIFU for lifting sagging skin. Most people get the best result from a combination planned by a doctor."],
  ["At what age should I start anti-ageing treatments?", "There's no fixed age. Many people start gentle, preventive treatments like baby Botox or skin boosters in their late 20s or 30s. Others start later to correct lines and sagging."],
  ["Will I look fake or frozen?", "No. Our doctors aim for a fresher, rested look that's still you, with precise doses and subtle volume. You can always start small and build up."],
  ["Botox or fillers: which do I need?", "Botox relaxes the muscles that cause expression lines. Fillers restore lost volume and hydration. They do different jobs, and many people benefit from both."],
  ["Which treatments have no downtime?", "Botox, Profhilo and HIFU usually have little or no downtime. Fillers can cause a few days of mild swelling, and PRP with microneedling a day or two of redness."],
  ["How long do anti-ageing results last?", "Botox lasts about 3 to 4 months, fillers 6 to 18 months, Profhilo about 6 months, and HIFU and PRP courses 12 to 18 months."],
  ["Are anti-ageing treatments safe for Indian skin?", "Yes, when done by experienced doctors. Injectables and HIFU work under the skin, so the risk of pigmentation is low. We plan settings and aftercare carefully for brown skin."],
  ["Can I combine treatments?", "Yes. Combining treatments, like Botox for lines, fillers for volume and HIFU for lift, often gives the most natural, complete result. Your doctor will plan the order and timing."],
  ["Do men get anti-ageing treatments?", "Yes. Botox, HIFU for the jawline and skin boosters are popular with men."],
  ["How can I slow down ageing at home?", "Daily sunscreen is the single most important step. Add a retinoid at night, a good moisturiser, enough sleep, no smoking and a protein-rich diet."],
  ["Where can I get anti-ageing treatments in Kerala?", "Facelit offers anti-ageing treatments at our clinics in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur). Some technologies, like HIFU, are at selected branches."],
  ["How much do anti-ageing treatments cost?", "It depends on the treatment, the area and how much product or how many sessions you need. Book a consultation for a clear quote."],
];

const catNav = `
<nav class="sk-cats" aria-label="Treatment categories">
 <a href="/treatments/">All treatments</a><a href="/skin-treatments/">Skin</a><a href="/best-hair-treatments/">Hair</a><a href="/anti-aging-treatments/" aria-current="page">Anti-aging</a><a href="/body-treatments/">Body</a><a href="/obesity-and-weight-management/">Weight management</a>
</nav>`;

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
 <path d="M112 70c24-4 52-4 76 0M108 86c28-4 56-4 84 0" opacity=".25"/>
 </svg>
 ${areas.map(([t, x, y], i) => `<button type="button" class="bx-dot" style="left:${x}%;top:${y}%" data-go="t-areas-${i}" aria-label="${t.replace(/&amp;/g, "and")}">${i + 1}</button>`).join("")}
 </div>
 <p class="cp-note" style="text-align:center">Tap a number to see what helps.</p>
</div>`;
const areaTabs = tabs("areas", areas.map(([t, , , problem, keys], i) => ({ tab: `${i + 1} · ${t}`, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${t}</h3>
 <p class="cp-p">${problem}</p>
 <p class="cp-eyebrow" style="margin:1rem 0 .6rem">Recommended treatments</p>
 <div class="sk-rec">${keys.map((x) => `<a href="${T[x][0]}"><b>${T[x][1]}</b><span>${T[x][6]}</span>${k.arrow}</a>`).join("")}</div>` })));

const cards = `
<div class="sk-cards cp-swipe">
 ${Object.values(T).map(([u, n, s, alt, w, h, line, best, res, lasts]) => `<a class="sk-card" href="${u}">${img(s, alt, w, h, "cp-img cp-img--43")}<div class="sk-cb"><h3 class="font-serif">${n}</h3><p>${line}</p><dl><div><dt>Best for</dt><dd>${best}</dd></div><div><dt>Results</dt><dd>${res}</dd></div><div><dt>Lasts</dt><dd>${lasts}</dd></div></dl><span class="cp-textlink">Explore ${n} ${k.arrow}</span></div></a>`).join("\n ")}
</div>${k.swipeHint}`;

const pageCss = `<style>
.sk-cats{display:flex;gap:.5rem;overflow-x:auto;padding:.25rem 0 .5rem;scrollbar-width:none;margin-bottom:.5rem}.sk-cats::-webkit-scrollbar{display:none}
.sk-cats a{flex:none;padding:.55rem 1rem;border-radius:999px;border:1px solid rgba(58,77,57,.15);background:#fff;color:#2d3c2d;font:500 .88rem Onest,sans-serif;text-decoration:none;white-space:nowrap}
.sk-cats a[aria-current=page]{background:#3a4d39;color:#fdf7ef;border-color:#3a4d39}
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start}}
.bx-face{position:relative;max-width:320px;margin:0 auto}.bx-face svg{width:100%;height:auto;display:block}
.bx-dot{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;background:#986a3e;color:#fff;font:600 13px/26px Onest,sans-serif;text-align:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.18);cursor:pointer;transition:transform .15s,background .15s}
.bx-dot:hover,.bx-dot[aria-current=true]{background:#3a4d39;transform:translate(-50%,-50%) scale(1.15)}.bx-dot:focus-visible{outline:2px solid #3a4d39;outline-offset:2px}
.sk-cards{gap:1rem}@media(min-width:760px){.sk-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}}@media(min-width:1100px){.sk-cards{grid-template-columns:repeat(3,minmax(0,1fr))}}
.sk-card{display:flex;flex-direction:column;background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.25rem;overflow:hidden;text-decoration:none;color:#2d3c2d;transition:border-color .15s,transform .15s}
.sk-card:hover{border-color:#3a4d39;transform:translateY(-2px)}.sk-card .cp-img{border-radius:0;margin:0}
.sk-cb{padding:1rem 1.1rem 1.2rem;display:flex;flex-direction:column;gap:.5rem;flex:1}
.sk-cb h3{margin:0;font-size:1.3rem;color:#2d3c2d}.sk-cb p{margin:0;font-size:.92rem;line-height:1.5;color:#5c574f}
.sk-cb dl{margin:.25rem 0 .4rem;display:grid;gap:.3rem}.sk-cb dl div{display:flex;gap:.5rem;font-size:.85rem}.sk-cb dt{color:#986a3e;font-weight:600;min-width:64px}.sk-cb dd{margin:0;color:#2d3c2d}
.sk-cb .cp-textlink{margin-top:auto}
.sk-rec{display:grid;gap:.6rem}
.sk-rec a{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"b i" "s i";column-gap:.75rem;align-items:center;padding:.85rem 1rem;border:1px solid rgba(58,77,57,.14);border-radius:1rem;background:#fff;text-decoration:none;color:#2d3c2d}
.sk-rec a:hover{border-color:#3a4d39;background:#f3efe4}.sk-rec b{grid-area:b;font:600 1rem Onest,sans-serif}.sk-rec span{grid-area:s;font-size:.85rem;color:#5c574f;line-height:1.4}.sk-rec svg{grid-area:i;width:1rem;height:1rem;color:#986a3e}
.bd-chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.9rem}
.bd-chips a{display:inline-flex;align-items:center;gap:.35rem;padding:.5rem .85rem;border-radius:999px;background:#f3efe4;border:1px solid rgba(58,77,57,.15);color:#2d3c2d;font:500 .85rem Onest,sans-serif;text-decoration:none}
.bd-chips a:hover{background:#3a4d39;color:#fdf7ef}.bd-chips svg{width:.85rem;height:.85rem}
@media(max-width:759px){.sk-cards.cp-swipe>.sk-card{flex:0 0 82%}}
</style>`;

const pageJs = `<script>(function(){
var dots=[].slice.call(document.querySelectorAll('.bx-dot'));
function mark(id){dots.forEach(function(d){d.setAttribute('aria-current',d.dataset.go===id)})}
dots.forEach(function(d){d.addEventListener('click',function(){var t=document.getElementById(d.dataset.go);if(t){t.click();mark(d.dataset.go);if(window.innerWidth<900)t.closest('[data-tabs]').scrollIntoView({behavior:'smooth',block:'start'})}})});
document.querySelectorAll('[id^=t-areas-]').forEach(function(t){t.addEventListener('click',function(){mark(t.id)})});mark('t-areas-0');
})();</script>`;

const sections = [
  k.hero({
    tags: ["Anti-ageing", "Doctor-led", "Natural results"], h1: "Anti-Aging Treatments in Kerala",
    img: HERO, pos: "65% 40%",
    intro: "Fine lines, a tired look, hollow under-eyes or a softer jawline? Ageing shows up differently on every face, so your treatment should too. Our doctors pinpoint what's actually changing, whether that's lines, volume, skin quality or sagging, and match it with the right non-surgical treatment: Botox, fillers, Profhilo, HIFU or PRP. The result is a fresher, rested look that's still completely you.",
    facts: [["5", "Non-surgical options"], ["0–3 days", "Typical downtime"], ["Doctor-led", "Natural results"], ["3", "Clinics in Kerala"]],
    cta2: ["#face-map", "Find your treatment"],
  }),
  shell("", `${catNav}${k.jump([["face-map", "Face map"], ["decades", "By age"], ["treatments", "Treatments"], ["finder", "Find your plan"], ["compare", "Compare"], ["more", "Other concerns"], ["journey", "Your journey"], ["faq", "FAQs"]])}`, "p-0 bg-transparent border-0"),

  shell("face-map", `${head("Start with your face", "Where Are You Seeing Changes? Tap the Face Map", "Tap a number to see what's causing it and the treatments our doctors most often recommend.")}
 <div class="bx-wrap">${face}<div>${areaTabs}</div></div>`),

  shell("decades", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("By age", "How Your Skin Ages, Decade by Decade", "Tap your age group to see what's changing and what helps most right now.")}
 ${tabs("decades", decades)}
 </div>
 <div class="cp-split-sep">
 ${head("Why we age", "What Actually Causes Ageing?", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Collagen and elastin loss", "From the mid-20s, your skin makes about 1% less collagen each year. Skin gets thinner, less firm and more prone to lines."],
   ["Volume loss", "Fat pads in the cheeks and temples shrink and slip, and bone slowly changes. This causes hollows, folds and a tired look."],
   ["Repeated expressions", "Every frown, squint and raised brow folds the skin. Over the years, those folds become permanent lines."],
   ["Sun damage", "UV is the biggest outside cause of ageing. It breaks down collagen and causes pigmentation, especially in Kerala's strong sun."],
   ["Lifestyle", "Smoking, poor sleep, stress, sugar and rapid weight changes all speed up skin ageing."],
 ], false)}</div>
 </div>
 </div>`),

  shell("treatments", `${head("Our anti-ageing treatments", "Anti-Aging Treatments at Facelit", "Tap a treatment to explore how it works, results, aftercare and packages.")}${cards}`),

  shell("finder", `${head("Find your plan", "Which Anti-Ageing Treatment Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan at your consultation.")}
 ${k.finder({ q1: "What bothers you most?", q2: { label: "Can you take a few days of swelling or redness?", dt: "Our suggestion", options: [["none", "No, I need zero downtime"], ["some", "Yes, a few days is fine"]] }, results: finderResults })}`),

  shell("compare", `${head("Compare treatments", "Anti-Ageing Treatments at a Glance", "Different treatments do different jobs. Scroll sideways on mobile to see every column.")}
 ${k.compareTable(Object.values(T).map(([u, n]) => `<a href="${u}">${n.replace(" (Ultraformer III)", "")}</a>`), [
   ["What it does", "Relaxes lines", "Restores volume and hydration", "Hydrates and firms skin", "Lifts and tightens", "Boosts collagen and glow"],
   ["Best for", ...Object.values(T).map((t) => t[7])],
   ["Results show", ...Object.values(T).map((t) => t[8])],
   ["Lasts", ...Object.values(T).map((t) => t[9])],
   ["Downtime", "None", "1–3 days", "Bumps for a day", "None", "0–2 days"],
 ])}`),

  shell("more", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Other signs of ageing", "Pigmentation, Dullness &amp; Texture", "Some signs of ageing are best treated with our skin treatments. Tap to see what helps.")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Age spots and pigmentation", "Sun spots and uneven tone respond well to picosecond laser and medical-grade peels. <a href=\"/pico-450-laser/\">PICO 450 laser</a> · <a href=\"/chemical-peel-treatment/\">Chemical peels</a>"],
   ["Dull, tired skin", "Deep cleansing and hydration bring back glow fast. <a href=\"/hydrafacial-treatments/\">HydraFacial</a> · <a href=\"/glutathione-iv-drip/\">Glutathione IV drip</a>"],
   ["Rough texture and pores", "Collagen-boosting resurfacing smooths texture and tightens pores. <a href=\"/co2-fractional-laser/\">CO2 laser</a> · <a href=\"/microneedling/\">Microneedling</a>"],
   ["Slow healing and loss of glow", "Exosomes help skin repair and renew. <a href=\"/exosomes-skin-treatment/\">Exosome skin treatment</a>"],
 ])}</div>
 </div>
 <div class="cp-split-sep">
 ${head("At home", "Slow Down Ageing Every Day", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Sunscreen, every single day", "SPF 30 or higher, rain or shine, reapplied outdoors. It's the most proven anti-ageing step there is."],
   ["A retinoid at night", "Retinoids boost collagen and smooth texture. Start slowly, and ask us which strength suits your skin."],
   ["Moisturise and protect", "A good moisturiser and an antioxidant serum like vitamin C support your skin barrier."],
   ["Sleep, food and no smoking", "7 to 8 hours of sleep, enough protein, less sugar and no smoking all slow ageing."],
 ], false)}</div>
 </div>
 </div>`),

  shell("journey", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your anti-ageing journey</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Every Face Ages Differently. Every Treatment Should Too.</h2>
 ${k.processTabs([
   { tab: "01 · Consult", img: [A + "about-hero.webp", "Facelit doctor consulting a patient", 1151, 768], lead: "We start by understanding you.",
     items: ["Your concerns, lifestyle and the look you want.", "Your medical history and past treatments.", "Honest, realistic expectations."] },
   { tab: "02 · Assess &amp; plan", img: BEFORE, lead: "A detailed facial assessment.",
     items: ["Skin quality, elasticity, volume and how your face moves.", "Which changes matter most to you.", "A tailored plan, often combining treatments in the right order."] },
   { tab: "03 · Treat &amp; review", img: AFTER, lead: "Natural results, carefully reviewed.",
     items: ["Precise treatment by experienced doctors.", "Clear aftercare guidance.", "Reviews to fine-tune and plan maintenance."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "Look Rested, Not Done", "Our goal is simple: people should notice you look well, not that you've had something done.")}
 <div class="cp-two cp-two--tight">
 <div class="cp-card"><h3 class="font-serif">Our approach</h3>${list(["Treat what's really changing", "Start small, build gradually", "Keep your natural expressions", "Combine treatments for balance"])}</div>
 <div class="cp-card"><h3 class="font-serif">What we avoid</h3>${list(["Frozen foreheads", "Overfilled lips and cheeks", "Treating trends instead of faces", "Pressure to do more than you need"], warn)}</div>
 </div>
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 </div>
 </div>`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Near you", "Anti-Ageing Clinics in Trivandrum, Kollam &amp; Thrissur", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Trivandrum (Kowdiar)", "Our flagship clinic with the full anti-ageing range, including HIFU with Ultraformer III. <a href=\"/anti-aging-treatments-in-trivandrum/\">Anti-ageing in Trivandrum</a>"],
   ["Karunagappally, Kollam", "Injectables and skin boosters for Kollam. Contact us to check available technologies."],
   ["Guruvayur, Thrissur", "Doctor-led anti-ageing care in Thrissur. <a href=\"/anti-aging-skin-treatment-guruvayur-kerala/\">Anti-ageing in Guruvayur</a>"],
 ], false)}</div>
 </div>
 <div class="cp-split-sep">
 ${head("Why Facelit", "Why Choose Facelit for Anti-Ageing?", "")}
 ${k.whyList([
   ["Doctor-only injectables", "Every Botox, filler and booster treatment is given by trained doctors."],
   ["Genuine products", "Approved products from authorised suppliers, shown to you before treatment."],
   ["Natural, balanced results", "We plan around your whole face and keep you looking like you."],
   ["Advanced lifting technology", "HIFU with Ultraformer III for non-surgical lifting."],
 ])}
 </div>
 </div>`),

  shell("faq", `${head("Questions", "Anti-Ageing Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Further reading", "Anti-Ageing Guides", "")}
 ${k.links([["/botox-vs-fillers-for-anti-aging-in-trivandrum/", "Guide", "Botox vs fillers"], ["/advanced-anti-aging-treatment-for-wrinkles/", "Guide", "Treatments for wrinkles"], ["/how-to-reduce-forehead-wrinkles/", "Guide", "Reducing forehead wrinkles"], ["/6-best-anti-aging-secrets-that-actually-work/", "Guide", "Anti-ageing secrets that work"], ["/anti-aging-solutions-for-men-skincare/", "Guide", "Anti-ageing for men"], ["/skin-treatments/", "Category", "Skin treatments"]])}`),

  k.cta("Ready to look as fresh as you feel?", "Book a consultation. Our doctors will look at how your face is changing and plan natural-looking treatment that's right for you."),
];

sections[2] = sections[2].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Anti-Aging Treatments in Kerala | Botox, Fillers, HIFU & Profhilo | Facelit",
  desc: "Doctor-led anti-ageing treatments at Facelit, Trivandrum, Kollam & Thrissur. Botox, hydrating fillers, Profhilo, HIFU and PRP for wrinkles, volume loss, sagging and dull skin. Natural results.",
  image: "https://facelit.in/wp-content/uploads/2026/08/anti-aging-hero.webp",
  faqs,
  procedure: { name: "Non-Surgical Anti-Ageing Treatments", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face and neck",
    howPerformed: "Doctor-led facial assessment followed by botulinum toxin, hyaluronic acid fillers and skin boosters, HIFU skin lifting or PRP, alone or combined.",
    preparation: "Consultation and facial assessment, avoiding blood thinners before injectables if advised.",
    followup: "Review after treatment, aftercare guidance and planned maintenance depending on the treatment." },
  crumbs: [["Home", "https://facelit.in/"], ["Treatments", "https://facelit.in/treatments/"], ["Anti-Aging Treatments", "https://facelit.in/anti-aging-treatments/"]],
});
