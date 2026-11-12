// Builds the redesigned /best-hair-treatments/ category hub page.
// Usage (from facelit-site/): node scripts/hair-hub/build.mjs content/pages/best-hair-treatments.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const HERO = [A + "hair-treatments-hero.webp", "Indian woman with thick, healthy hair after hair treatment at Facelit"];
const BEFORE = [A + "hair-before-scaled-1.webp", "Thinning parting on an Indian man before hair treatment", 1920, 2560];
const AFTER = [A + "hair-after-scaled-1.webp", "Fuller parting on the same Indian man after a course of hair treatment", 1920, 2560];

// Treatments: key -> [url, name, image, alt, w, h, line, bestFor, blood, sessions]
const T = {
  exo: ["/exosomes-hair-treatments/", "Exosome Hair Treatment", A + "hair-treatments-hero.webp", "Indian woman with healthy hair", 2159, 1440, "Concentrated growth signals delivered with scalp microneedling. No blood draw needed.", "Hair fall, thinning, weak roots", "No", "4–6"],
  gfc: ["/gfc-hair-treatment/", "GFC Hair Treatment", B + "248-Untitled-design-18.webp", "GFC injections into a thinning parting", 1080, 1080, "Concentrated growth factors from your own blood, stronger than PRP.", "Pattern thinning, crown, after PRP", "Yes", "4–6"],
  prp: ["/hair-prp/", "PRP Hair Treatment", B + "250-Untitled-design-15.webp", "PRP injections into dark, thinning hair", 1080, 1080, "Your own platelets injected into the scalp to strengthen roots. A proven, good-value first step.", "Early hair fall, first treatment", "Yes", "4–6"],
  qr: ["/qr678-hair-growth/", "QR678 Hair Growth", B + "249-Untitled-design.webp", "QR678 microinjections into dark hair", 1080, 1080, "A patented growth-peptide formula with quick microinjections and no blood draw.", "Hair fall, thinning, needle-shy", "No", "6–8"],
};

// Concern matcher: [tab, intro, treatment keys, extra links]
const concerns = [
  ["Hair fall", "Losing more than 100 hairs a day, or clumps in the shower? We find the cause first, then strengthen the roots.", ["exo", "prp", "qr"], [["/hair-loss-symptoms-causes-treatments/", "Hair loss causes guide"]]],
  ["Thinning hair", "Hair that's lost its volume needs follicles strengthened and pushed back into growth.", ["gfc", "exo", "prp"], []],
  ["Male pattern baldness", "A receding hairline or thin crown is hormone-driven. Treatments work best alongside prescribed medication.", ["gfc", "prp", "exo"], [["/mens-hair-loss-treatments-and-solutions/", "Men's hair loss solutions"], ["/hair-loss-treatments-for-men/", "Hair loss treatments for men"]]],
  ["Widening part (women)", "Female pattern thinning shows as a wider part and flat top, often linked to hormones, PCOS, thyroid or iron.", ["exo", "gfc", "qr"], []],
  ["Dandruff &amp; scalp", "An itchy, flaky or oily scalp makes hair fall worse. We treat the scalp first.", [], [["/scalp-treatment-in-trivandrum/", "Scalp treatment"], ["/best-scalp-peel-treatment-in-trivandrum/", "Scalp peel"], ["/how-to-get-rid-of-dandruff-permanently/", "Dandruff guide"]]],
  ["Postpartum hair loss", "Heavy shedding 2 to 4 months after delivery is common and usually recovers. Treatment can speed it up once you're ready.", ["exo", "prp"], []],
  ["Weak roots &amp; low density", "Fine, weak hair that breaks easily needs stronger follicles and good nutrition.", ["qr", "exo", "prp"], [["/nutrition-counselling/", "Nutrition for hair"]]],
  ["Alopecia areata", "Round, smooth bald patches are an immune condition that needs a doctor's diagnosis and medical treatment first.", ["prp"], []],
  ["Premature greying", "Early greying is mostly genetic. We check for B12, thyroid and other deficiencies that can speed it up. No treatment reliably reverses grey hair, and we'll tell you that honestly.", [], [["/nutrition-counselling/", "Nutrition counselling"]]],
];

const stages = [
  { tab: "Men · early", body: `<p class="cp-p" style="margin-top:0"><b>Stages 1–2:</b> slight recession at the temples or a softer hairline. Most follicles are still active.</p>${list(["The best time to start treatment", "PRP, exosomes or QR678 plus prescribed medication", "Usually 4 to 6 sessions"])}` },
  { tab: "Men · moderate", body: `<p class="cp-p" style="margin-top:0"><b>Stages 3–4:</b> a deeper M-shaped hairline and/or a thinning crown, with scalp showing through.</p>${list(["Still very treatable", "GFC or exosomes with prescribed medication", "A longer course, then maintenance"])}` },
  { tab: "Men · advanced", body: `<p class="cp-p" style="margin-top:0"><b>Stages 5–7:</b> large bald areas on top. Follicles in shiny, bald areas have usually stopped.</p>${list(["Injections can protect the hair that's left", "Bald areas usually need a hair transplant", "We'll explain your options honestly"])}` },
  { tab: "Women · mild", body: `<p class="cp-p" style="margin-top:0"><b>Early thinning:</b> a slightly wider part and less volume on top.</p>${list(["Check iron, thyroid, vitamin D and hormones", "Exosomes, PRP or QR678", "Usually 4 to 6 sessions"])}` },
  { tab: "Women · moderate", body: `<p class="cp-p" style="margin-top:0"><b>Visible thinning:</b> the part is clearly wider and the scalp shows on top.</p>${list(["Treat the root cause first", "GFC or exosomes, sometimes combined", "Home treatment if prescribed"])}` },
  { tab: "Women · advanced", body: `<p class="cp-p" style="margin-top:0"><b>Marked thinning:</b> widespread thinning across the top of the head.</p>${list(["A combined medical and regenerative plan", "Realistic goals: thicker coverage and less fall", "Regular progress photos"])}` },
];

const finderResults = [
  { v: "fall", label: "Too much hair fall", img: BEFORE, title: "Stop the Fall Plan",
    text: "We check for common causes like low iron, thyroid problems, vitamin D and stress, then strengthen the roots.",
    recent: "Blood tests and 3 to 4 sessions of exosomes, PRP or QR678.", long: "Blood tests, a 6-session course and home treatment if prescribed.",
    sessions: "4–6, every 3–4 weeks", combine: "Nutrition, prescribed treatment" },
  { v: "male", label: "Receding hairline or thin crown", img: [B + "196-5-1.webp", "Receding hairline on dark hair", 1080, 1080], title: "Hairline Support Plan",
    text: "Male pattern hair loss responds best to regenerative treatments alongside prescribed medication.",
    recent: "PRP or exosomes with prescribed medication, started early.", long: "GFC or exosomes, and an honest talk about transplants for bald areas.",
    sessions: "4–6, then maintenance", combine: "Prescribed medication" },
  { v: "female", label: "Widening part", img: [B + "298-Hair-Loss-women.webp", "Widening part on a woman with dark hair", 1080, 1080], title: "Fuller Part Plan",
    text: "We check hormones, PCOS, thyroid and iron, then thicken the hair you have.",
    recent: "Tests plus exosomes or QR678.", long: "Tests, GFC or exosomes and a home routine.",
    sessions: "4–6, every 3–4 weeks", combine: "Blood tests" },
  { v: "post", label: "After pregnancy or illness", img: HERO.concat([2159, 1440]), title: "Recovery Plan",
    text: "Sudden shedding after childbirth, fever, COVID or crash dieting usually recovers, and treatment speeds it up.",
    recent: "2 to 4 sessions, plus nutrition support.", long: "Tests to find any ongoing cause, then a full course.",
    sessions: "2–4, every 3–4 weeks", combine: "Nutrition" },
  { v: "scalp", label: "Dandruff and itchy scalp", img: [B + "768-scalp-hair.webp", "Flaky scalp on dark hair", 1080, 1080], title: "Scalp Reset Plan",
    text: "A healthy scalp comes first. We clear dandruff and calm the scalp, then support regrowth.",
    recent: "Medicated scalp care and a scalp treatment.", long: "Scalp peel and medicated care, then a regenerative course.",
    sessions: "Scalp care, then 4", combine: "Scalp peel" },
  { v: "needle", label: "Want to avoid blood draws", img: [B + "249-Untitled-design.webp", "Microinjections into dark hair", 1080, 1080], title: "No Blood Draw Plan",
    text: "Exosomes and QR678 are ready-made, so there's no blood sample needed.",
    recent: "QR678 or exosomes, 4 to 6 sessions.", long: "A longer exosome or QR678 course with maintenance.",
    sessions: "4–8 sessions", combine: "Home care" },
];

const faqs = [
  ["Which hair treatment is best for hair fall?", "It depends on the cause. For many people, PRP, exosomes or QR678 work well, but finding the cause first, like low iron, thyroid problems or stress, is just as important. Our doctors examine your scalp and suggest blood tests before recommending a treatment."],
  ["What hair treatments does Facelit offer?", "We offer exosome hair treatment, GFC (growth factor concentrate), PRP for hair and QR678, along with scalp treatments and nutrition support."],
  ["GFC vs PRP: which is better?", "Both use your own blood. GFC is more concentrated and cell-free, so it often gives stronger, more consistent results with less swelling. PRP is a proven, good-value first step for early hair fall."],
  ["Exosomes vs PRP: what's the difference?", "PRP comes from your own blood. Exosomes are a ready-made, concentrated product, so no blood draw is needed. Many people do well combining them."],
  ["Can hair grow back on a bald patch?", "Regenerative treatments work on follicles that are still alive, even if weak. Smooth, shiny bald areas usually can't regrow with injections. A hair transplant may be the better option there."],
  ["How many sessions will I need?", "Most hair treatments need 4 to 6 sessions, 3 to 4 weeks apart, then maintenance every 3 to 6 months. QR678 is often 6 to 8 sessions."],
  ["When will I see results?", "Hair fall usually slows within 1 to 2 months. New baby hairs often appear by 3 months, and thicker hair shows around 4 to 6 months."],
  ["Is hair loss treatment painful?", "Most people feel only mild pricks. We can use numbing cream, and options like QR678 use very fine, shallow injections."],
  ["Do hair treatments work for women?", "Yes. Female pattern thinning, postpartum shedding and stress-related hair fall all respond well, especially when we treat causes like low iron, thyroid problems and PCOS."],
  ["Does dandruff cause hair loss?", "Severe dandruff and scalp inflammation can make hair fall worse. Treating the scalp is often the first step."],
  ["Can premature greying be reversed?", "Usually not. Early greying is mostly genetic. Correcting deficiencies like B12 or thyroid problems may slow it, but no treatment reliably turns grey hair dark again."],
  ["Where can I get hair treatment in Kerala?", "Facelit offers hair treatments at our clinics in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does hair treatment cost?", "It depends on the treatment and number of sessions. Packages offer better value. Book a consultation for a clear, personalised quote."],
];

const catNav = `
<nav class="sk-cats" aria-label="Treatment categories">
 <a href="/treatments/">All treatments</a><a href="/skin-treatments/">Skin</a><a href="/best-hair-treatments/" aria-current="page">Hair</a><a href="/anti-aging-treatments/">Anti-aging</a><a href="/body-treatments/">Body</a><a href="/obesity-and-weight-management/">Weight management</a>
</nav>`;

const cards = `
<div class="sk-cards cp-swipe">
 ${Object.values(T).map(([u, n, s, alt, w, h, line, best, blood, sess]) => `<a class="sk-card" href="${u}">${img(s, alt, w, h, "cp-img cp-img--43")}<div class="sk-cb"><h3 class="font-serif">${n}</h3><p>${line}</p><dl><div><dt>Best for</dt><dd>${best}</dd></div><div><dt>Blood draw</dt><dd>${blood}</dd></div><div><dt>Sessions</dt><dd>${sess}</dd></div></dl><span class="cp-textlink">Explore ${n} ${k.arrow}</span></div></a>`).join("\n ")}
</div>${k.swipeHint}`;

const matcher = tabs("concerns", concerns.map(([t, intro, keys, extra]) => ({ tab: t, body: `
 <p class="cp-p" style="margin-top:0">${intro}</p>
 ${keys.length ? `<p class="cp-eyebrow" style="margin:1rem 0 .6rem">Recommended treatments</p><div class="sk-rec">${keys.map((x) => `<a href="${T[x][0]}"><b>${T[x][1]}</b><span>${T[x][6]}</span>${k.arrow}</a>`).join("")}</div>` : ""}
 ${extra.length ? `<p class="cp-eyebrow" style="margin:1.1rem 0 .5rem">${keys.length ? "Also helpful" : "Where to start"}</p><div class="sk-more">${extra.map(([u, l]) => `<a href="${u}">${l} ${k.arrow}</a>`).join("")}</div>` : ""}` })));

const pageCss = `<style>
.sk-cats{display:flex;gap:.5rem;overflow-x:auto;padding:.25rem 0 .5rem;scrollbar-width:none;margin-bottom:.5rem}.sk-cats::-webkit-scrollbar{display:none}
.sk-cats a{flex:none;padding:.55rem 1rem;border-radius:999px;border:1px solid rgba(58,77,57,.15);background:#fff;color:#2d3c2d;font:500 .88rem Onest,sans-serif;text-decoration:none;white-space:nowrap}
.sk-cats a[aria-current=page]{background:#3a4d39;color:#fdf7ef;border-color:#3a4d39}
.sk-cards{gap:1rem}@media(min-width:760px){.sk-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}}@media(min-width:1100px){.sk-cards{grid-template-columns:repeat(4,minmax(0,1fr))}}
.sk-card{display:flex;flex-direction:column;background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.25rem;overflow:hidden;text-decoration:none;color:#2d3c2d;transition:border-color .15s,transform .15s}
.sk-card:hover{border-color:#3a4d39;transform:translateY(-2px)}.sk-card .cp-img{border-radius:0;margin:0}
.sk-cb{padding:1rem 1.1rem 1.2rem;display:flex;flex-direction:column;gap:.5rem;flex:1}
.sk-cb h3{margin:0;font-size:1.3rem;color:#2d3c2d}.sk-cb p{margin:0;font-size:.92rem;line-height:1.5;color:#5c574f}
.sk-cb dl{margin:.25rem 0 .4rem;display:grid;gap:.3rem}.sk-cb dl div{display:flex;gap:.5rem;font-size:.85rem}.sk-cb dt{color:#986a3e;font-weight:600;min-width:82px}.sk-cb dd{margin:0;color:#2d3c2d}
.sk-cb .cp-textlink{margin-top:auto}
.sk-rec{display:grid;gap:.6rem}
.sk-rec a{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"b i" "s i";column-gap:.75rem;align-items:center;padding:.85rem 1rem;border:1px solid rgba(58,77,57,.14);border-radius:1rem;background:#fff;text-decoration:none;color:#2d3c2d}
.sk-rec a:hover{border-color:#3a4d39;background:#f3efe4}.sk-rec b{grid-area:b;font:600 1rem Onest,sans-serif}.sk-rec span{grid-area:s;font-size:.85rem;color:#5c574f;line-height:1.4}.sk-rec svg{grid-area:i;width:1rem;height:1rem;color:#986a3e}
.sk-more{display:flex;flex-wrap:wrap;gap:.5rem}.sk-more a{display:inline-flex;align-items:center;gap:.35rem;padding:.45rem .85rem;border-radius:999px;background:#f3efe4;color:#2d3c2d;font:500 .84rem Onest,sans-serif;text-decoration:none}.sk-more svg{width:.8rem;height:.8rem}
@media(max-width:759px){.sk-cards.cp-swipe>.sk-card{flex:0 0 82%}}
</style>`;

const sections = [
  k.hero({
    tags: ["Hair", "Doctor-led", "Regenerative treatments"], h1: "Hair Treatments in Kerala",
    img: HERO, pos: "62% center",
    intro: "Hair fall, a widening part, a receding hairline or a thinning crown? Healthy hair starts with a healthy scalp and the right diagnosis. Our doctors find what's really causing your hair loss, then match you with the right regenerative treatment, from PRP and GFC to exosomes and QR678, for stronger, fuller hair that looks natural.",
    facts: [["4", "Regenerative treatments"], ["3", "Clinics in Kerala"], ["Doctor-led", "Diagnosis first"], ["2–3 months", "Visible regrowth"]],
    cta2: ["#match", "Match your concern"],
  }),
  shell("", `${catNav}${k.jump([["match", "Match your concern"], ["stages", "Hair loss stage"], ["treatments", "Treatments"], ["finder", "Find your plan"], ["compare", "Compare"], ["causes", "Causes"], ["journey", "Your journey"], ["faq", "FAQs"]])}`, "p-0 bg-transparent border-0"),

  shell("match", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Start with your concern", "What's Happening with Your Hair?", "Tap your main concern to see the treatments our doctors most often recommend.")}
 ${matcher}
 </div>
 <div class="cp-split-sep">
 ${head("Quick self-check", "Is Your Hair Fall Normal?", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["How much hair fall is normal?", "Losing 50 to 100 hairs a day is normal. If you're seeing clumps in the shower, a thinner ponytail or hair all over your pillow, it's worth getting checked."],
   ["The gentle pull test", "Gently pull a small bunch of about 50 to 60 hairs from root to tip. If more than 5 or 6 come out easily, you may be shedding more than normal."],
   ["Signs it's pattern hair loss", "A receding hairline, a thinning crown or a widening part that slowly gets worse over months or years usually points to pattern hair loss rather than temporary shedding."],
   ["When to see a doctor soon", "Sudden patches of hair loss, a painful or very itchy scalp, or hair loss with tiredness, weight changes or irregular periods all need a doctor's check."],
 ], false)}</div>
 </div>
 </div>`),

  shell("stages", `${head("Be honest with yourself", "What Stage Is Your Hair Loss?", "Hair loss follows typical patterns in men and women. Tap the stage closest to yours to see what treatment can realistically do.")}${tabs("stages", stages)}`),

  shell("treatments", `${head("Our hair treatments", "Hair Treatments at Facelit", "Tap a treatment to explore how it works, results, aftercare and packages.")}${cards}`),

  shell("finder", `${head("Find your plan", "Which Hair Treatment Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan after examining your scalp.")}
 ${k.finder({ q1: "What's worrying you most?", q2: { label: "How long has it been happening?", dt: "Our suggestion", options: [["recent", "Recently, within the last year"], ["long", "For a few years"]] }, results: finderResults })}`),

  shell("compare", `${head("Compare treatments", "Exosomes vs GFC vs PRP vs QR678", "Four regenerative hair treatments, side by side. Scroll sideways on mobile to see every column.")}
 ${k.compareTable(Object.values(T).map(([u, n]) => `<a href="${u}">${n.replace(" Hair Treatment", "").replace(" Hair Growth", "")}</a>`), [
   ["What it is", "Ready-made cell messengers", "Concentrated growth factors from your blood", "Platelets from your blood", "Patented growth-peptide formula"],
   ["Blood draw", "No", "Yes", "Yes", "No"],
   ["Best for", "Hair fall, thinning, weak roots", "Pattern thinning, crown", "Early hair fall, first treatment", "Hair fall, needle-shy"],
   ["Typical sessions", "4–6", "4–6", "4–6", "6–8"],
   ["Downtime", "0–1 day", "None", "None to 1 day", "None"],
 ])}`),

  shell("causes", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Why hair falls", "Common Causes of Hair Loss", "Treating the cause is just as important as treating the hair. Tap each to learn more.")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Genetics and hormones", "Pattern hair loss in men and women is driven by genes and the hormone DHT, which slowly shrinks follicles."],
   ["Low iron, vitamin D or B12", "Very common in Kerala, especially in women. Low levels weaken hair and increase shedding."],
   ["Thyroid problems", "Both underactive and overactive thyroid can cause diffuse hair fall."],
   ["PCOS and hormone changes", "PCOS, pregnancy, childbirth and menopause can all trigger thinning or shedding."],
   ["Stress, illness and crash diets", "Fever, COVID, surgery, severe stress or rapid weight loss can push many hairs into shedding 2 to 3 months later."],
   ["Scalp problems", "Dandruff, infections and inflammation weaken the scalp environment and worsen hair fall."],
   ["Hair styling and chemicals", "Tight hairstyles, frequent straightening, colouring and bleaching damage hair and roots."],
 ])}</div>
 </div>
 <div class="cp-split-sep">
 ${head("Myths vs facts", "Hair Loss Myths, Busted", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["\"Oiling every day stops hair fall.\"", "Oiling softens hair but doesn't fix hormones, deficiencies or genetics. Too much oil can worsen dandruff."],
   ["\"Hair loss only affects older men.\"", "Many people start thinning in their 20s, and women get hair loss too."],
   ["\"Cutting hair makes it grow thicker.\"", "Trimming removes split ends but doesn't change the number or thickness of hairs."],
   ["\"Once it's gone, nothing helps.\"", "Weak, thinning hair can often be revived. Only fully bald areas usually need a transplant."],
   ["\"Results show in a few weeks.\"", "Hair grows about 1 cm a month. Real changes take 3 to 6 months."],
 ], false)}</div>
 </div>
 </div>`),

  shell("journey", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your hair journey</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Every Scalp Tells a Different Story</h2>
 ${k.processTabs([
   { tab: "01 · Consult", img: [B + "566-4.-Man-Examining-Hair.webp", "Indian man checking his hairline", 1080, 1080], lead: "We start by listening.",
     items: ["Your hair history, family history and lifestyle.", "Diet, stress, medicines and recent illness.", "What you want to achieve."] },
   { tab: "02 · Analyse", img: [B + "768-scalp-hair.webp", "Close look at the scalp", 1080, 1080], lead: "A detailed scalp and hair analysis.",
     items: ["Scalp health, hair density and follicle condition.", "Blood tests if needed: iron, thyroid, vitamin D, hormones.", "Progress photos to track change."] },
   { tab: "03 · Treat &amp; follow up", img: [B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man with thick hair", 1080, 1080], lead: "A plan made for you.",
     items: ["The right regenerative treatment for your hair.", "Home care and nutrition support.", "Regular reviews to adjust and maintain results."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "Restore More Than Your Hair", "Every hair journey is unique. Our treatments deliver gradual, natural-looking improvements you can feel confident about.")}
 ${k.timeline([["Weeks 4–8", "Less hair fall", "Fewer hairs in the shower, on your pillow and in your comb."], ["Month 3", "Baby hairs", "Short new hairs along the hairline, parting and crown."], ["Months 4–6", "Thicker hair", "Stronger strands and fuller-looking hair."], ["Ongoing", "Maintain", "A session every 3 to 6 months keeps results going."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After a course</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary with the cause and stage of hair loss.</p>
 </div>
 </div>`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Near you", "Hair Clinics in Trivandrum, Kollam &amp; Thrissur", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Trivandrum (Kowdiar)", "Our flagship clinic with the full range of hair treatments. <a href=\"/hair-treatment-in-trivandrum/\">Hair treatment in Trivandrum</a>"],
   ["Karunagappally, Kollam", "Hair treatments for Kollam and nearby areas. <a href=\"/best-hair-clinic-in-karunagappally/\">Hair clinic in Karunagappally</a>"],
   ["Guruvayur, Thrissur", "Doctor-led hair care in Thrissur. <a href=\"/best-hair-clinic-in-guruvayur/\">Hair clinic in Guruvayur</a>"],
 ], false)}</div>
 </div>
 <div class="cp-split-sep">
 ${head("Why Facelit", "Why Choose Facelit for Hair Treatment?", "")}
 ${k.whyList([
   ["Diagnosis first", "We find the cause with a scalp exam and the right tests before treating."],
   ["Every regenerative option", "Exosomes, GFC, PRP and QR678 under one roof."],
   ["Honest advice", "If treatment won't help, like on fully bald areas, we'll tell you."],
   ["Progress you can see", "Photos at every visit to track your results."],
 ])}
 </div>
 </div>`),

  shell("faq", `${head("Questions", "Hair Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Further reading", "Hair Care Guides", "")}
 ${k.links([["/hair-loss-symptoms-causes-treatments/", "Guide", "Hair loss symptoms, causes and treatments"], ["/gfc-vs-prp-hair-treatment-which-one-should-you-choose/", "Guide", "GFC vs PRP"], ["/can-prp-reverse-hair-thinning-in-men/", "Guide", "Can PRP reverse thinning in men?"], ["/how-to-get-rid-of-dandruff-permanently/", "Guide", "Getting rid of dandruff"], ["/scalp-treatment-in-trivandrum/", "Treatment", "Scalp treatment"], ["/skin-treatments/", "Category", "Skin treatments"]])}`),

  k.cta("Not sure what's causing your hair loss?", "Book a consultation. Our doctors will examine your scalp, find the cause and build a hair plan that fits you."),
];

sections[2] = sections[2].replace("</section>", `${pageCss}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Hair Treatment in Kerala | Hair Fall, Thinning & Regrowth | Facelit",
  desc: "Doctor-led hair treatments at Facelit, Trivandrum, Kollam & Thrissur. Exosomes, GFC, PRP and QR678 for hair fall, thinning, pattern baldness and postpartum hair loss. Diagnosis first.",
  image: "https://facelit.in/wp-content/uploads/2026/08/hair-treatments-hero.webp",
  faqs,
  procedure: { name: "Regenerative Hair Loss Treatments", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Scalp",
    howPerformed: "Doctor-led diagnosis followed by regenerative scalp treatments such as exosomes, growth factor concentrate (GFC), platelet-rich plasma (PRP) or QR678 peptide microinjections.",
    preparation: "Consultation, scalp and hair analysis and blood tests where needed.",
    followup: "Courses of 4 to 8 sessions, 3 to 4 weeks apart, with progress photos and maintenance every 3 to 6 months." },
  crumbs: [["Home", "https://facelit.in/"], ["Treatments", "https://facelit.in/treatments/"], ["Hair Treatments", "https://facelit.in/best-hair-treatments/"]],
});
