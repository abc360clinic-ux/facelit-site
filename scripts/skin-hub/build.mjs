// Builds the redesigned /skin-treatments/ category hub page.
// Usage (from facelit-site/): node scripts/skin-hub/build.mjs content/pages/skin-treatments.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";
const M = "/wp-content/uploads/2026/11/";

const HERO = [A + "skin-hero-1.webp", "Smiling Indian woman with clear, glowing skin after skin treatment at Facelit"];
const BEFORE = [A + "skin-before-1-scaled.webp", "Indian woman with acne marks and uneven skin before treatment", 1920, 2560];
const AFTER = [A + "skin-after-1-scaled.webp", "The same Indian woman with clearer, brighter skin after treatment", 1920, 2560];

// Treatments: key -> [url, name, image, alt, w, h, line, bestFor, downtime, sessions]
const T = {
  peel: ["/chemical-peel-treatment/", "Chemical Peel", A + "blog-glow.webp", "Chemical peel being applied to an Indian woman's face", 1400, 933, "Doctor-grade peels that clear acne, fade marks and brighten dull skin.", "Acne, marks, tan, dullness", "0–7 days", "3–6"],
  co2: ["/co2-fractional-laser/", "CO2 Fractional Laser", A + "eco-hero.webp", "Facelit doctor with the CO2 fractional laser", 1726, 972, "Our CO2 + Erbium Glass 1550nm laser resurfaces scars, pores and texture.", "Acne scars, pores, texture", "3–7 days", "2–4"],
  exo: ["/exosomes-skin-treatment/", "Exosomes Skin Treatment", A + "anti-aging-hero.webp", "Indian woman with glowing, healthy skin", 1716, 1144, "Advanced cell signals that speed repair, boost glow and support anti-ageing.", "Glow, fine lines, healing", "0–1 day", "3–5"],
  hydra: ["/hydrafacial-treatments/", "HydraFacial", B + "707-skin-care.webp", "Smiling Indian woman with fresh, hydrated skin", 1080, 1080, "The original HydraFacial: deep cleanse, extract and hydrate in one session.", "Clogged pores, dullness, dehydration", "None", "Monthly"],
  mn: ["/microneedling/", "Microneedling", A + "anti-aging-after-scaled-1.webp", "Indian woman with smooth, even skin", 1920, 2560, "Dermapen microneedling to rebuild collagen for scars, pores and fine lines.", "Acne scars, pores, fine lines", "1–3 days", "3–6"],
  pico: ["/pico-450-laser/", "PICO 450 Laser", A + "Pigmentation-on-the-Face.webp", "Pigmentation patches on Indian skin", 1080, 1080, "Picosecond laser for melasma, pigmentation, tan and tattoo removal.", "Pigmentation, melasma, tattoos", "0–2 days", "4–8"],
};

// Concern matcher: [tab, intro, treatment keys, extra related links]
const concerns = [
  ["Acne &amp; breakouts", "Active pimples, blackheads and oily skin need calming and clearing first, before we treat marks or scars.", ["peel", "hydra"], [["/acne-scar-treatment-in-trivandrum/", "Acne treatment in Trivandrum"]]],
  ["Acne scars", "Pitted, uneven scars need collagen to be rebuilt from below. We often combine treatments for the best result.", ["co2", "mn", "exo"], [["/best-acne-scar-treatment-for-sensitive-skin/", "Acne scars on sensitive skin"]]],
  ["Pigmentation &amp; melasma", "Dark patches, sun spots and melasma need careful, gentle treatment on Indian skin to avoid making them darker.", ["pico", "peel"], [["/best-skin-lightening-laser-treatment-in-trivandrum/", "Skin brightening laser"]]],
  ["Tan &amp; uneven tone", "Sun tan and patchy tone respond well to brightening treatments plus strict daily sunscreen.", ["pico", "peel", "hydra"], [["/skin-tag-and-tan-removal-in-trivandrum/", "Tan removal in Trivandrum"]]],
  ["Dull &amp; dehydrated", "Tired, flat skin needs deep cleansing, hydration and repair to bring back its glow.", ["hydra", "exo"], [["/profhilo-treatment/", "Profhilo skin booster"], ["/glutathione-iv-drip/", "Glutathione IV drip"]]],
  ["Open pores", "Large pores and rough texture improve when the skin around them is tightened and renewed.", ["co2", "mn", "hydra"], [["/open-pores-treatment-in-trivandrum/", "Open pores treatment"]]],
  ["Fine lines", "Early lines respond to collagen-boosting treatments. Movement lines may also need Botox.", ["exo", "mn", "co2"], [["/botox-treatments/", "Botox"], ["/hydrating-fillers-treatment/", "Hydrating fillers"]]],
  ["Loose skin", "Early loss of firmness needs collagen stimulation and, for deeper sagging, lifting treatments.", ["co2", "mn"], [["/hifu/", "HIFU with Ultraformer III"], ["/profhilo-treatment/", "Profhilo"]]],
  ["Tattoos", "Unwanted tattoos fade over a course of picosecond laser sessions, with less risk of scarring.", ["pico"], []],
];

const finderResults = [
  { v: "acne", label: "Acne and oily skin", img: [A + "pimples-on-face-e1750661217281.webp", "Acne on the cheek", 1080, 1017], title: "Clear Skin Plan",
    text: "We calm active acne and unclog pores first, then treat marks once breakouts are under control.",
    none: "HydraFacial and gentle peels, with a doctor-prescribed home routine.", some: "A course of medical-grade chemical peels, plus prescribed skincare.",
    sessions: "3–6, every 2–4 weeks", combine: "Prescribed skincare" },
  { v: "scars", label: "Acne scars", img: [A + "black-marks.webp", "Acne marks and scars on Indian skin", 1080, 1080], title: "Scar Repair Plan",
    text: "Scars need collagen rebuilt from beneath. The right method depends on scar type and how much downtime you can take.",
    none: "Microneedling with exosomes, which has very little downtime.", some: "CO2 fractional laser for the strongest change, combined with microneedling.",
    sessions: "3–6 sessions", combine: "Exosomes, PRP" },
  { v: "pigment", label: "Pigmentation or melasma", img: [A + "Pigmentation-on-the-Face.webp", "Pigmentation on Indian skin", 1080, 1080], title: "Even Tone Plan",
    text: "Pigment on Indian skin needs gentle, controlled treatment to avoid rebound darkening.",
    none: "Pico toning with no downtime, plus strict sunscreen.", some: "Pico laser with brightening peels for faster results.",
    sessions: "4–8 sessions", combine: "Daily SPF, prescribed creams" },
  { v: "dull", label: "Dull, tired skin", img: [B + "707-skin-care.webp", "Indian woman with glowing skin", 1080, 1080], title: "Glow Plan",
    text: "Deep cleansing and hydration bring back radiance fast, and regular sessions keep it.",
    none: "HydraFacial, with exosomes for an extra boost.", some: "A light peel plus HydraFacial for a deeper refresh.",
    sessions: "Monthly", combine: "Glutathione IV, Profhilo" },
  { v: "pores", label: "Open pores and texture", img: [A + "lage-pores.webp", "Enlarged pores on the cheek", 1080, 1080], title: "Smooth Skin Plan",
    text: "Pores and rough texture improve as the skin is tightened and renewed.",
    none: "HydraFacial for clean pores, with microneedling every few weeks.", some: "CO2 fractional laser for the strongest change in texture.",
    sessions: "3–6 sessions", combine: "Exosomes" },
  { v: "ageing", label: "Fine lines and early ageing", img: [A + "anti-aging-before-scaled-1.webp", "Fine lines on Indian skin", 1920, 2560], title: "Youthful Skin Plan",
    text: "Collagen-boosting treatments soften lines and firm the skin. Botox and fillers can add to the result.",
    none: "Exosomes and microneedling, with very little downtime.", some: "CO2 fractional laser for deeper renewal.",
    sessions: "3–5 sessions", combine: "Botox, Profhilo, HIFU" },
];

const faqs = [
  ["Which skin treatment is best for me?", "It depends on your skin concern, skin type and how much downtime you can take. Our dermatologists examine your skin first and recommend the right treatment, or combination, for you. Use the concern matcher above for a quick guide."],
  ["What skin treatments does Facelit offer?", "We offer chemical peels, CO2 fractional laser, PICO 450 laser, HydraFacial, microneedling and exosome skin treatment, plus anti-ageing treatments like Botox, fillers, Profhilo and HIFU."],
  ["Are laser treatments safe for Indian skin?", "Yes, when the right laser and settings are used by experienced doctors. Indian skin is more prone to pigmentation, so we use technologies like picosecond and fractional lasers with careful settings and strict aftercare."],
  ["What is the best treatment for acne scars?", "Most acne scars respond best to a combination, often CO2 fractional laser or microneedling, sometimes with exosomes or PRP. The best plan depends on your scar type."],
  ["What is the best treatment for pigmentation and melasma?", "PICO laser toning and medical-grade chemical peels work well for many types of pigmentation, alongside prescribed creams and daily sunscreen. Melasma needs a gentle, long-term plan."],
  ["Which treatment has no downtime?", "HydraFacial has no downtime. Pico toning and exosome treatment usually have little or none. Peels, microneedling and CO2 laser can involve a few days of redness or peeling."],
  ["How many sessions will I need?", "It varies by treatment and concern. HydraFacial is often monthly, peels and microneedling usually 3 to 6 sessions, and laser treatments 2 to 8 sessions. Your doctor will give you a clear plan."],
  ["Can I combine skin treatments?", "Yes. Combining treatments, like microneedling with exosomes, or Pico laser with peels, often gives better results. Your doctor will plan the order and timing."],
  ["Do I need a consultation first?", "Yes. Every treatment starts with a skin assessment so we can choose the right option and settings for your skin type and concern."],
  ["What should I do after a skin treatment?", "Follow your aftercare plan: gentle skincare, no harsh actives for a few days, and daily sunscreen. Sun protection is the most important step for Indian skin."],
  ["Where can I get skin treatments in Kerala?", "Facelit has skin clinics in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur). Some technologies are available at selected branches, so contact us to check."],
  ["How much do skin treatments cost?", "Costs depend on the treatment, area and number of sessions. Book a consultation for a clear, personalised quote."],
];

const catNav = `
<nav class="sk-cats" aria-label="Treatment categories">
 <a href="/treatments/">All treatments</a><a href="/skin-treatments/" aria-current="page">Skin</a><a href="/best-hair-treatments/">Hair</a><a href="/anti-aging-treatments/">Anti-aging</a><a href="/body-treatments/">Body</a><a href="/obesity-and-weight-management/">Weight management</a>
</nav>`;

const cards = `
<div class="sk-cards cp-swipe">
 ${Object.values(T).map(([u, n, s, alt, w, h, line, best, down, sess]) => `<a class="sk-card" href="${u}">${img(s, alt, w, h, "cp-img cp-img--43")}<div class="sk-cb"><h3 class="font-serif">${n}</h3><p>${line}</p><dl><div><dt>Best for</dt><dd>${best}</dd></div><div><dt>Downtime</dt><dd>${down}</dd></div><div><dt>Sessions</dt><dd>${sess}</dd></div></dl><span class="cp-textlink">Explore ${n} ${k.arrow}</span></div></a>`).join("\n ")}
</div>${k.swipeHint}`;

const matcher = tabs("concerns", concerns.map(([t, intro, keys, extra]) => ({ tab: t, body: `
 <p class="cp-p" style="margin-top:0">${intro}</p>
 <p class="cp-eyebrow" style="margin:1rem 0 .6rem">Recommended treatments</p>
 <div class="sk-rec">${keys.map((x) => `<a href="${T[x][0]}"><b>${T[x][1]}</b><span>${T[x][6]}</span>${k.arrow}</a>`).join("")}</div>
 ${extra.length ? `<p class="cp-eyebrow" style="margin:1.1rem 0 .5rem">Also helpful</p><div class="sk-more">${extra.map(([u, l]) => `<a href="${u}">${l} ${k.arrow}</a>`).join("")}</div>` : ""}` })));

const tech = `
<div class="sk-tech">
 <a class="sk-t" href="/co2-fractional-laser/"><div><img src="${A}WhatsApp-Image-2025-01-24-at-15.28.39_e9c9182a.webp" alt="CO2 + Erbium Glass 1550nm laser at Facelit" width="331" height="343" loading="lazy" decoding="async"></div><small>Resurfacing</small><h3 class="font-serif">CO2 + Erbium Glass 1550nm</h3><p>Dual laser for scars, pores and texture.</p></a>
 <a class="sk-t" href="/pico-450-laser/"><div><img src="${M}picocare-450-machine.webp" alt="PicoCare 450 picosecond laser at Facelit" width="470" height="790" loading="lazy" decoding="async"></div><small>Pigmentation</small><h3 class="font-serif">PicoCare 450</h3><p>Picosecond laser for melasma, tan and tattoos.</p></a>
 <a class="sk-t" href="/hydrafacial-treatments/"><div><img src="${M}hydrafacial-elite-machine.webp" alt="Original HydraFacial machine at Facelit" width="420" height="750" loading="lazy" decoding="async"></div><small>Deep cleanse</small><h3 class="font-serif">Original HydraFacial</h3><p>Cleanse, extract and hydrate in one session.</p></a>
</div>`;

const pageCss = `<style>
.sk-cats{display:flex;gap:.5rem;overflow-x:auto;padding:.25rem 0 .5rem;scrollbar-width:none;margin-bottom:.5rem}.sk-cats::-webkit-scrollbar{display:none}
.sk-cats a{flex:none;padding:.55rem 1rem;border-radius:999px;border:1px solid rgba(58,77,57,.15);background:#fff;color:#2d3c2d;font:500 .88rem Onest,sans-serif;text-decoration:none;white-space:nowrap}
.sk-cats a[aria-current=page]{background:#3a4d39;color:#fdf7ef;border-color:#3a4d39}
.sk-cards{gap:1rem}@media(min-width:760px){.sk-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}}@media(min-width:1100px){.sk-cards{grid-template-columns:repeat(3,minmax(0,1fr))}}
.sk-card{display:flex;flex-direction:column;background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.25rem;overflow:hidden;text-decoration:none;color:#2d3c2d;transition:border-color .15s,transform .15s}
.sk-card:hover{border-color:#3a4d39;transform:translateY(-2px)}.sk-card .cp-img{border-radius:0;margin:0}
.sk-cb{padding:1rem 1.1rem 1.2rem;display:flex;flex-direction:column;gap:.5rem;flex:1}
.sk-cb h3{margin:0;font-size:1.35rem;color:#2d3c2d}.sk-cb p{margin:0;font-size:.92rem;line-height:1.5;color:#5c574f}
.sk-cb dl{margin:.25rem 0 .4rem;display:grid;gap:.3rem}.sk-cb dl div{display:flex;gap:.5rem;font-size:.85rem}.sk-cb dt{color:#986a3e;font-weight:600;min-width:74px}.sk-cb dd{margin:0;color:#2d3c2d}
.sk-cb .cp-textlink{margin-top:auto}
.sk-rec{display:grid;gap:.6rem}
.sk-rec a{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"b i" "s i";column-gap:.75rem;align-items:center;padding:.85rem 1rem;border:1px solid rgba(58,77,57,.14);border-radius:1rem;background:#fff;text-decoration:none;color:#2d3c2d}
.sk-rec a:hover{border-color:#3a4d39;background:#f3efe4}.sk-rec b{grid-area:b;font:600 1rem Onest,sans-serif}.sk-rec span{grid-area:s;font-size:.85rem;color:#5c574f;line-height:1.4}.sk-rec svg{grid-area:i;width:1rem;height:1rem;color:#986a3e}
.sk-more{display:flex;flex-wrap:wrap;gap:.5rem}.sk-more a{display:inline-flex;align-items:center;gap:.35rem;padding:.45rem .85rem;border-radius:999px;background:#f3efe4;color:#2d3c2d;font:500 .84rem Onest,sans-serif;text-decoration:none}.sk-more svg{width:.8rem;height:.8rem}
.sk-tech{display:grid;gap:.75rem;grid-template-columns:repeat(3,minmax(0,1fr))}
.sk-t{display:flex;flex-direction:column;gap:.3rem;background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.1rem;padding:.8rem;text-decoration:none;color:#2d3c2d}
.sk-t:hover{border-color:#3a4d39}.sk-t>div{display:flex;justify-content:center;height:150px;margin-bottom:.4rem}.sk-t img{height:100%;width:auto;object-fit:contain}
.sk-t small{font:600 .64rem Onest,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#986a3e}.sk-t h3{margin:0;font-size:1.05rem;line-height:1.25;color:#2d3c2d}.sk-t p{margin:0;font-size:.82rem;line-height:1.45;color:#5c574f}
@media(max-width:600px){.sk-tech{grid-template-columns:1fr}.sk-t{display:grid;grid-template-columns:90px minmax(0,1fr);grid-template-rows:auto auto 1fr;column-gap:.9rem}.sk-t>div{grid-row:1/4;height:120px;margin:0}}
@media(max-width:759px){.sk-cards.cp-swipe>.sk-card{flex:0 0 82%}}
</style>`;

const sections = [
  k.hero({
    tags: ["Skin", "Dermatologist-led", "Made for Indian skin"], h1: "Skin Treatments in Kerala",
    img: HERO, pos: "60% 35%",
    intro: "Acne that keeps coming back, scars that won't fade, pigmentation, tan, dull skin or open pores? At Facelit, our dermatologists match your concern to the right treatment, from medical-grade peels and the original HydraFacial to advanced lasers like PicoCare 450 and CO2 + Erbium Glass. Every plan is built for Indian skin, with clear results and honest advice.",
    facts: [["6+", "Skin treatments"], ["3", "Clinics in Kerala"], ["Doctor-led", "Every plan"], ["Indian skin", "Safe settings"]],
    cta2: ["#match", "Match your concern"],
  }),
  shell("", `${catNav}${k.jump([["match", "Match your concern"], ["treatments", "Treatments"], ["finder", "Find your plan"], ["compare", "Compare"], ["technology", "Technology"], ["journey", "Your journey"], ["results", "Results"], ["faq", "FAQs"]])}`, "p-0 bg-transparent border-0"),

  shell("match", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Start with your concern", "What's Bothering Your Skin?", "Tap your main concern to see the treatments our dermatologists most often recommend.")}
 ${matcher}
 </div>
 <div class="cp-split-sep">
 ${head("Good to know", "Skin Care for Indian Skin", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Why Indian skin needs special care", "Brown skin has more active pigment cells, so it can darken after irritation, heat or the wrong laser. That's why we choose technologies and settings carefully, and prepare your skin before stronger treatments."],
   ["Sunscreen is non-negotiable", "Kerala's strong sun can undo results and trigger new pigmentation. Daily SPF 30 or higher, reapplied outdoors, protects your investment."],
   ["Humidity, sweat and breakouts", "Heat and humidity increase oil and clogged pores. Lightweight skincare and regular deep cleansing help keep breakouts down."],
   ["Patience pays off", "Most skin concerns improve over a course of sessions. Results build gradually and last longer with good aftercare."],
 ], false)}</div>
 </div>
 </div>`),

  shell("treatments", `${head("Our skin treatments", "Skin Treatments at Facelit", "Tap a treatment to explore how it works, what it treats, aftercare and packages.")}${cards}`),

  shell("finder", `${head("Find your plan", "Which Skin Treatment Is Right for You?", "Answer two quick questions to see the plan our dermatologists most often recommend. We confirm your final plan after examining your skin.")}
 ${k.finder({ q1: "What's your main skin concern?", q2: { label: "Can you take a few days of redness or peeling?", dt: "Our suggestion", options: [["none", "No, I need zero downtime"], ["some", "Yes, a few days is fine"]] }, results: finderResults })}`),

  shell("compare", `${head("Compare treatments", "Skin Treatments at a Glance", "A quick side-by-side guide. Scroll sideways on mobile to see every column.")}
 ${k.compareTable(Object.values(T).map(([u, n]) => `<a href="${u}">${n}</a>`), [
   ["Best for", ...Object.values(T).map((t) => t[7])],
   ["Downtime", ...Object.values(T).map((t) => t[8])],
   ["Typical sessions", ...Object.values(T).map((t) => t[9])],
   ["Suits Indian skin", "Yes, chosen carefully", "Yes, with careful settings", "Yes", "Yes", "Yes", "Yes, low heat"],
 ])}`),

  shell("technology", `${head("Our technology", "Advanced Machines Behind Your Results", "Proven, medical-grade technology, used by doctors who know Indian skin.")}${tech}`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Common problems", "Problems We Solve Every Day", "Tap a problem that sounds like yours.")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["\"I've tried every face wash and cream.\"", "Over-the-counter products work on the surface. Medical treatments reach deeper and target the cause, whether that's oil, pigment or collagen loss."],
   ["\"My acne has gone but the marks haven't.\"", "Dark marks and pitted scars need different treatments. Peels and Pico help marks, while CO2 laser and microneedling rebuild scars."],
   ["\"My pigmentation got worse after a facial.\"", "Harsh treatments can trigger pigment on Indian skin. We use gentle, controlled methods and always prepare the skin first."],
   ["\"I want glowing skin for a wedding.\"", "Start 6 to 8 weeks before. A plan of HydraFacial, peels or exosomes timed right gives your best skin on the day."],
   ["\"I'm scared of lasers.\"", "Modern lasers are precise and comfortable, with numbing and careful settings. We'll explain everything and start gently."],
 ])}</div>
 </div>
 <div class="cp-split-sep">
 ${head("Near you", "Skin Clinics in Trivandrum, Kollam &amp; Thrissur", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Trivandrum (Kowdiar)", "Our flagship skin clinic with the full range of skin treatments and lasers. <a href=\"/best-skin-care-clinic-in-trivandrum/\">Skin clinic in Trivandrum</a>"],
   ["Karunagappally, Kollam", "Skin treatments for Kollam and nearby areas. Contact us to check which technologies are available."],
   ["Guruvayur, Thrissur", "Doctor-led skin care in Thrissur's temple town. Contact us to check which technologies are available."],
 ], false)}</div>
 <p class="cp-note">Not sure which clinic or treatment suits you? Call us and we'll guide you.</p>
 </div>
 </div>`),

  shell("journey", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your skin journey</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Every Treatment Is Personalised to You</h2>
 ${k.processTabs([
   { tab: "01 · Consult", img: [A + "about-hero.webp", "Facelit dermatologist consulting a patient", 1151, 768], lead: "We start by understanding you.",
     items: ["Your skin concerns, goals and expectations.", "Your skincare routine, lifestyle and medical history.", "Past treatments and how your skin reacted."] },
   { tab: "02 · Assess &amp; plan", img: [A + "Tan-and-Dark-Patches-on-Face2.webp", "Close look at tan and dark patches on Indian skin", 1080, 1080], lead: "A detailed skin assessment.",
     items: ["Skin type, sensitivity and pigmentation risk.", "The right treatment, or combination, for your concern.", "A clear plan with sessions, downtime and costs."] },
   { tab: "03 · Treat &amp; follow up", img: AFTER, lead: "Safe treatment and ongoing support.",
     items: ["Evidence-based treatment by experienced professionals.", "Aftercare guidance and home routine.", "Follow-ups to track results and adjust your plan."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "Confidence You Can See", "Every plan starts with a detailed assessment of your skin type, concerns and goals, so every recommendation is precise and suited to you. From consultation to aftercare, our specialists guide you with safe, evidence-based treatments for visible results that still look natural.")}
 <div class="cp-two cp-two--tight">
 <div class="cp-card"><h3 class="font-serif">What makes results last</h3>${list(["The right treatment for your concern", "Completing your full course", "Daily sunscreen", "A good home skincare routine"])}</div>
 <div class="cp-card"><h3 class="font-serif">What slows results down</h3>${list(["Skipping sunscreen", "Picking at skin or scrubbing hard", "Trying many products at once", "Stopping halfway through a course"], warn)}</div>
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
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Skin Treatments?</h2>
 ${img(A + "eco-doctor-devi.webp", "Facelit dermatologist", 672, 891, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Dermatologist-led care", "Every plan is made by doctors who understand Indian skin and its risks."],
   ["Advanced, proven technology", "CO2 + Erbium Glass, PicoCare 450, the original HydraFacial and Dermapen microneedling."],
   ["The right treatment, not the most expensive", "We recommend what your skin needs, and tell you honestly what it doesn't."],
   ["Safe for brown skin", "Careful settings, skin preparation and aftercare to avoid pigmentation."],
   ["Three clinics in Kerala", "Trivandrum, Karunagappally and Guruvayur, with consistent expert care."],
 ])}
 </div>`),

  shell("faq", `${head("Questions", "Skin Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Further reading", "Skin Care Guides &amp; Local Clinics", "")}
 ${k.links([["/best-skin-care-clinic-in-trivandrum/", "Location", "Skin care clinic in Trivandrum"], ["/best-dermatologist-in-trivandrum/", "Location", "Dermatologist in Trivandrum"], ["/acne-scar-treatment-in-trivandrum/", "Guide", "Acne scar treatment"], ["/open-pores-treatment-in-trivandrum/", "Guide", "Open pores treatment"], ["/skin-brightening-treatments/", "Guide", "Skin brightening treatments"], ["/anti-aging-treatments/", "Category", "Anti-aging treatments"]])}`),

  k.cta("Not sure which treatment your skin needs?", "Book a consultation. Our dermatologists will examine your skin and build a plan that's right for you, and only what's right for you."),
];

sections[2] = sections[2].replace("</section>", `${pageCss}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Skin Treatments in Kerala | Acne, Scars, Pigmentation & Glow | Facelit",
  desc: "Dermatologist-led skin treatments at Facelit, Trivandrum, Kollam & Thrissur: chemical peels, HydraFacial, PicoCare 450, CO2 laser, microneedling and exosomes for acne, scars, pigmentation and dull skin.",
  image: "https://facelit.in/wp-content/uploads/2026/08/skin-hero-1.webp",
  faqs,
  procedure: { name: "Dermatological Skin Treatments", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face and body skin",
    howPerformed: "Dermatologist-led treatments matched to the skin concern, including chemical peels, HydraFacial, picosecond and fractional CO2 lasers, microneedling and exosome therapy.",
    preparation: "Consultation and skin assessment, with skin preparation where needed for pigmentation-prone skin.",
    followup: "Personalised aftercare, daily sunscreen and follow-up reviews to track results." },
  crumbs: [["Home", "https://facelit.in/"], ["Treatments", "https://facelit.in/treatments/"], ["Skin Treatments", "https://facelit.in/skin-treatments/"]],
});
