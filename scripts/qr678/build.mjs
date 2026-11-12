// Builds the redesigned /qr678-hair-growth/ page.
// Usage (from facelit-site/): node scripts/qr678/build.mjs content/pages/qr678-hair-growth.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

// Product claim kept in one place so it's easy to change once confirmed with the supplier.
const PATENT = "Patented formula";

const HERO = [B + "249-Untitled-design.webp", "Doctor giving QR678 microinjections into a man's dark hair at Facelit"];
const INJECT = [B + "416-Best-GFC-Hair-Treatment-in-Karunagappally.webp", "Hair growth factor being injected into a thinning hairline", 1080, 1080];
const CROWN = [B + "563-hair-thinning-e1757654914322.webp", "Thinning crown on dark hair", 1080, 1012];

const benefits = [
  ["shield", "Stops Excess Hair Fall", "Strengthens the roots so fewer hairs fall out while washing, combing and sleeping."],
  ["lift", "Regrowth in Thin Areas", "Wakes up resting follicles along the hairline, parting and crown."],
  ["layers", "Thicker, Denser Hair", "Increases the thickness of each strand and the number of growing hairs."],
  ["leaf", "No Blood Draw", "QR678 is a ready-made formula, so there's no blood test, no centrifuge and no waiting."],
  ["clock", "Quick Sessions", "The injections take only a few minutes. Most visits are done in about 30 minutes."],
  ["heal", "No Downtime", "No cuts or stitches. Go straight back to work or college."],
  ["cell", "Replaces What's Missing", "Tops up the growth peptides that are naturally present in a healthy scalp but drop in thinning areas."],
  ["drop", "Works Locally", "Delivered into the scalp only, so it isn't absorbed into the rest of the body like oral tablets."],
];

const finderResults = [
  { v: "fall", label: "Too much hair fall", img: [A + "hair-before-scaled-1.webp", "Thinning parting on an Indian man from heavy hair fall", 1920, 2560], title: "Hair Fall Control Plan",
    text: "QR678 tops up the growth peptides your scalp is missing, so heavy shedding usually slows within the first few sessions.",
    no: "QR678 is a great fit, because there's no blood draw. Start with blood tests for iron, thyroid and vitamin D, then a QR678 course.", yes: "QR678 or PRP both work well here. QR678 is quicker and needs no blood draw. Your doctor will help you choose.",
    sessions: "4–6, every 3–4 weeks", combine: "Blood tests, nutrition" },
  { v: "male", label: "Receding hairline (men)", img: [B + "196-5-1.webp", "Receding hairline and thinning temples on dark hair", 1080, 1080], title: "Hairline Support Plan",
    text: "Male pattern hair loss is genetic and hormone-driven. QR678 thickens thinning hair and supports regrowth, and works best with prescribed medication.",
    no: "A QR678 course with doctor-prescribed home treatment.", yes: "QR678 alternated with GFC for a stronger push on stubborn areas.",
    sessions: "6–8, then maintenance", combine: "Minoxidil, finasteride (if prescribed), GFC" },
  { v: "female", label: "Widening part (women)", img: [B + "298-Hair-Loss-women.webp", "Widening hair part on a woman with dark hair", 1080, 1080], title: "Fuller Part Plan",
    text: "In women, thinning shows as a wider part and a flatter top. QR678 thickens existing strands and helps new growth along the part.",
    no: "QR678 sessions plus checks for iron, thyroid, PCOS and hormones.", yes: "QR678 or GFC, with a doctor-led home routine.",
    sessions: "6–8, every 3–4 weeks", combine: "Blood tests, prescribed topicals" },
  { v: "crown", label: "Thin crown", img: CROWN, title: "Crown Density Plan",
    text: "The crown thins quietly and most people only notice it in photos. QR678 microinjections across the thin patch improve coverage.",
    no: "A QR678 course focused on the crown.", yes: "QR678 alternated with GFC or exosomes for a stubborn crown.",
    sessions: "6–8, every 3–4 weeks", combine: "GFC, exosomes" },
  { v: "postpartum", label: "After pregnancy or illness", img: [A + "hair-treatments-hero.webp", "Indian woman with long, healthy hair", 2159, 1440], title: "Recovery Regrowth Plan",
    text: "Heavy shedding after childbirth (once you've finished breastfeeding), fever, COVID, surgery or crash dieting usually recovers, and QR678 can help it recover faster.",
    no: "3 to 4 QR678 sessions, plus nutrition support.", yes: "3 to 4 sessions of QR678 or PRP, plus tests to find any ongoing cause.",
    sessions: "3–4, every 3–4 weeks", combine: "Nutrition, blood tests" },
  { v: "dandruff", label: "Dandruff with hair fall", img: [B + "768-scalp-hair.webp", "Flaky scalp with dandruff on dark hair", 1080, 1080], title: "Scalp Reset Plan",
    text: "An itchy, flaky or oily scalp (seborrheic dermatitis) makes hair fall worse. We calm the scalp first, then use QR678 to rebuild density.",
    no: "Medicated scalp care first, then a QR678 course.", yes: "Scalp care first, then QR678 or PRP.",
    sessions: "Scalp care, then 4–6", combine: "Medicated shampoo, scalp peel" },
];

const concerns = [
  { tab: "Excessive hair fall", img: [A + "hair-before-scaled-1.webp", "Thinning parting from excessive hair fall on an Indian man", 1920, 2560], title: "Excessive hair fall",
    text: "Losing up to 100 hairs a day is normal. Clumps in the shower, a thinner ponytail or hair all over your pillow means the growth signals in your scalp have dropped. QR678 replaces those signals so follicles stay in the growing phase.",
    more: ["Shedding slows within the first few sessions", "Stronger, better-anchored roots", "Works best once the cause is found"], rec: ["Blood tests", "Nutrition"], sessions: "4–6, every 3–4 weeks",
    link: ["/hair-loss-symptoms-causes-treatments/", "Hair loss causes and treatments"] },
  { tab: "Male pattern baldness", img: [B + "196-5-1.webp", "Receding hairline on dark hair", 1080, 1080], title: "Male pattern baldness (androgenetic alopecia)",
    text: "A receding hairline, thinning temples or a thin crown in men is caused by DHT, a hormone that slowly shrinks follicles. QR678 thickens shrinking hair and supports regrowth. Prescribed medication protects follicles from DHT.",
    more: ["Thicker hair at the hairline and temples", "Better crown coverage", "Best results when started early"], rec: ["Prescribed medication", "GFC"], sessions: "6–8, then maintenance",
    link: ["/mens-hair-loss-treatments-and-solutions/", "Men's hair loss solutions"] },
  { tab: "Female pattern hair loss", img: [B + "298-Hair-Loss-women.webp", "Widening part on a woman with dark hair", 1080, 1080], title: "Female pattern hair loss",
    text: "Women rarely go bald. Instead, the part widens and the top looks flat. It's often linked to hormones, PCOS, thyroid problems or low iron. We test for these and use QR678 to rebuild density.",
    more: ["Narrower-looking part", "More volume on top", "Root causes checked and treated"], rec: ["Blood tests", "Prescribed topicals"], sessions: "6–8, every 3–4 weeks",
    link: ["/hair-treatment-in-trivandrum/", "Hair treatment in Trivandrum"] },
  { tab: "Thinning crown", img: CROWN, title: "Thinning crown",
    text: "The crown is one of the first places to thin and the hardest to see yourself. QR678 microinjections spread across the thin patch improve coverage, so less scalp shows under light.",
    more: ["Better crown coverage", "Thicker strands", "Easy to track with photos"], rec: ["GFC", "Exosomes"], sessions: "6–8, every 3–4 weeks" },
  { tab: "Scared of needles or blood tests", img: INJECT, title: "Don't like blood draws?",
    text: "PRP and GFC both need a blood sample. QR678 doesn't. It's a ready-made formula delivered with very fine, shallow microinjections, so the whole visit is quick and simple.",
    more: ["No blood draw or centrifuge", "Very fine, shallow injections", "Numbing cream available"], rec: ["QR678 course"], sessions: "4–8, every 3–4 weeks" },
  { tab: "Alopecia areata", img: [B + "202-GFC-Hair-treatment-0.webp", "Close-up of a woman's scalp and hair part", 1080, 1080], title: "Alopecia areata (patchy hair loss)",
    text: "Round, smooth bald patches are usually alopecia areata, an immune condition. It needs a doctor's diagnosis and medical treatment first. QR678 has shown encouraging results as support in suitable cases.",
    more: ["Doctor diagnosis first", "Medical treatment as the base", "QR678 as support"], rec: ["Doctor-led treatment"], recLabel: "Important", sessions: "Planned by your doctor" },
  { tab: "After chemotherapy", img: [A + "hair-treatments-hero.webp", "Indian woman with long, healthy hair", 2159, 1440], title: "Hair regrowth after chemotherapy",
    text: "Hair usually starts coming back a few months after chemotherapy ends, but it can be slow and thin. QR678 has shown encouraging results in helping hair recover. We only start once your oncologist agrees.",
    more: ["Oncologist approval first", "Gentle, local treatment", "Supports thicker regrowth"], rec: ["Oncologist approval"], recLabel: "Important", sessions: "Planned by your doctor" },
];

const stages = [
  ["Early thinning", 1, "More hair fall, a slightly wider part or a softer hairline. QR678 works best here.", "hair fall, early thinning", "none", "4–6, every 3–4 weeks"],
  ["Moderate thinning", 2, "Scalp visible through the hair, thin crown or temples. Still very treatable with a full QR678 course.", "pattern thinning, crown", "none", "6–8, plus maintenance"],
  ["Advanced / bald areas", 3, "Smooth, shiny areas where follicles have stopped. QR678 can't regrow these, but it can protect the hair around them.", "support, before or after transplant", "none", "we'll discuss transplant options honestly"],
];

const ingredients = [
  ["Growth factor peptides", "Lab-made copies of natural growth signals, such as IGF-1, bFGF, VEGF and KGF, that help follicles grow and keep hair in the growing phase."],
  ["Thymosin β4", "A peptide that supports follicle stem cells and helps new hair start growing."],
  ["Copper peptide", "Helps strengthen hair, supports the scalp and improves blood supply around the roots."],
  ["Vitamins and amino acids", "Building blocks your follicles need to make strong, thick hair."],
];

const menuRows = [
  ["Single QR678 Session", "Starter", "fall", "Get thick, strong, voluminous hair. One session to start your hair journey.", ["Hair fall", "Starter"], "Scalp cleansing and QR678 microinjections across the thinning areas.", "None", "1"],
  ["5-Session QR678 Package", "Popular", "fall thin pattern", "Maximise your results with a course of five sessions.", ["Best value", "Popular"], "Five sessions 3 to 4 weeks apart, with progress photos at each visit.", "None", "5"],
  ["8-Session Full Course", "Complete", "thin pattern", "A complete course for pattern hair loss and moderate thinning.", ["Pattern loss"], "Eight sessions 3 to 4 weeks apart, then a maintenance plan.", "None", "8"],
  ["QR678 + GFC Plan", "Combo", "pattern thin", "Alternate QR678 with GFC from your own blood for stubborn thinning.", ["GFC", "Combo"], "QR678 and GFC sessions alternated across the course.", "None", "6–8"],
  ["Women's Hair Thinning Programme", "Programme", "thin", "QR678 plus root-cause checks (iron, thyroid, hormones) and a home routine for women.", ["Women", "Root cause"], "Doctor-led plan combining tests, QR678 and topicals.", "None", "6–8"],
  ["Maintenance Session", "Maintain", "fall thin pattern", "Keep your results going after your course is complete.", ["Maintenance"], "One QR678 session every 3 to 6 months.", "None", "1"],
];

const faqs = [
  ["What is QR678 hair treatment?", "QR678 is a patented hair growth formula made of growth factor peptides, vitamins and amino acids. These are naturally present in a healthy scalp but drop in areas with hair loss. QR678 is injected into the scalp to replace them, slowing hair fall and helping thicker hair grow."],
  ["What does QR678 stand for?", "It's named after the research behind it: QR stands for \"Quick Response\", and 678 refers to the date the patent application was filed."],
  ["How is QR678 different from PRP and GFC?", "PRP and GFC are made from your own blood, so you need a blood draw and their strength varies from person to person. QR678 is a ready-made formula with the same strength every time, and there's no blood draw."],
  ["Is QR678 painful?", "QR678 is given with very fine, shallow microinjections. Most people feel only small pricks, and numbing cream can be applied if you'd like."],
  ["How many QR678 sessions will I need?", "Most people need 6 to 8 sessions, 3 to 4 weeks apart. Early hair fall may settle with 4 to 5. After the course, a maintenance session every 3 to 6 months keeps results going."],
  ["When will I see results from QR678?", "Hair fall usually slows within the first 2 to 3 sessions. New baby hairs often appear by 3 months, and thicker, fuller hair shows around 4 to 6 months."],
  ["Is QR678 safe?", "Yes. QR678 is delivered into the scalp only, so it isn't absorbed into the rest of the body. Mild redness or tenderness for a few hours is the most common side effect."],
  ["Does QR678 work for women?", "Yes. QR678 works well for female pattern thinning, postpartum shedding (after breastfeeding ends) and stress-related hair fall. We also check iron, thyroid and hormones to treat the root cause."],
  ["Can QR678 regrow hair on a bald patch?", "QR678 works on follicles that are still alive, even if they're weak. Smooth, shiny bald areas where follicles have gone usually can't regrow with any injection. We'll tell you honestly and discuss options like hair transplant."],
  ["Are QR678 results permanent?", "Results last as long as the cause of hair loss is managed. Pattern hair loss continues over time, so most people keep their results with maintenance sessions and home care."],
  ["Can I use minoxidil with QR678?", "Yes, they work well together. Only start or change hair medicines with your doctor's advice."],
  ["When can I wash my hair after QR678?", "Avoid hair products for at least 6 hours. You can wash with a mild shampoo the next day."],
  ["Where can I get QR678 hair treatment in Kerala?", "Facelit offers QR678 hair treatment in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does QR678 treatment cost?", "It depends on the area being treated and the number of sessions. The 5-session package works out to better value per session. Book a consultation for a personalised quote."],
];

const sections = [
  k.hero({
    tags: ["Hair", "No blood draw", "Doctor-led"], h1: "QR678<sup>®</sup> Hair Growth Treatment",
    img: HERO, pos: "50% 40%",
    intro: "Hair fall that won't stop, a widening part or a thinning crown? QR678 is a patented hair growth formula that puts back the growth peptides your scalp is missing. Quick microinjections slow hair fall and help thicker hair grow, with no blood draw, no surgery and no downtime.",
    facts: [["~30 min", "Per visit"], ["None", "Downtime"], ["6–8", "Sessions typical"], ["No", "Blood draw"]],
    cta2: ["#finder", "Find your hair plan"],
  }),
  k.jump([["overview", "Overview"], ["formula", "The formula"], ["finder", "Find your plan"], ["concerns", "Concerns"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is QR678 Hair Growth Treatment?</h2>
 <div class="cp-prose">
 <p>A scalp full of healthy hair is rich in growth peptides: natural signals that keep follicles growing. In people with hair loss, these signals drop, so follicles shrink and spend less time growing.</p>
 <p>QR678 is a patented formula of lab-made growth peptides, vitamins and amino acids that match what a healthy scalp already has. Injected into thinning areas through mesotherapy (very fine, shallow microinjections), it tops those signals back up. The result is less hair fall and more, thicker hair over the following months.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: how QR678 compares with tablets and transplants ${k.plus}</summary>
 <div class="cp-prose">
 <p><b>Compared with tablets:</b> oral hair medicines travel through your whole body. QR678 is placed in the scalp only and isn't absorbed into the rest of the body, so it's a good option for people who'd rather avoid or reduce tablets. Many people still use both, with their doctor's advice.</p>
 <p><b>Compared with a transplant:</b> FUE and FUT move hair from one place to another with surgery. QR678 is non-surgical and helps the hair you still have grow thicker. It can also be used before or after a transplant to support the hair around the grafts.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How QR678 works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Replace</b><span>Puts back the growth peptides missing from thinning areas.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Reactivate</b><span>Weak, resting follicles move back into the growing phase.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Regrow</b><span>More hairs grow, and each one grows thicker.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(B + "566-4.-Man-Examining-Hair.webp", "Indian man checking his thinning hairline in the mirror", 1080, 1080)}
 ${img(B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man with thick hair after treatment", 1080, 1080)}
 </div>
 </div>`),

  shell("formula", `
 ${k.machine({ imgSrc: "/wp-content/uploads/2026/11/qr678-neo-vial.webp", imgAlt: "QR678 Neo hair growth formula vial used at Facelit", w: 330, h: 492, badge: PATENT,
   name: "QR678<sup>®</sup> Neo Hair Growth Formula", text: "QR678 was developed in India by dermatologists and cosmetic surgeons after years of research into why hair thins. The Neo formula combines growth factor peptides, vitamins and amino acids in one ready-to-use vial, so every session delivers the same strength.",
   tags: [PATENT, "Made in India", "No blood draw", "Men &amp; women"],
   specs: [["Ready-made", "Same strength every session"], ["Mesotherapy", "Very fine, shallow microinjections"], ["Local action", "Stays in the scalp"], ["Minutes", "Quick injections, ~30 min visit"]] })}
 <h3 class="cp-h3 font-serif" style="margin-top:2.5rem">What's inside QR678</h3>
 <div class="cp-faq cp-faq--compact">${accordion(ingredients)}</div>`),

  shell("finder", `${head("Find your plan", "Which Hair Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan after examining your scalp.")}
 ${k.finder({ q1: "What's worrying you most?", q2: { label: "Are you okay with a blood draw?", dt: "Our suggestion", options: [["no", "I'd rather avoid it"], ["yes", "Yes, that's fine"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of QR678 Hair Treatment", "A ready-made growth formula that's quick, simple and needs no blood.")}${k.benefitsGrid(benefits)}`),

  shell("concerns", `${head("Is it right for you?", "Hair Problems QR678 Can Help With", "Tap a concern to see how QR678 helps, what we pair it with and how many sessions you may need.")}
 ${k.concernTabs("concerns", concerns)}`),

  shell("", `${head("Be honest with yourself", "What Stage Is Your Hair Loss?", "QR678 works on follicles that are still alive. The earlier you start, the more hair you keep.")}${k.depthCards(stages)}`),

  shell("plan", `${head("Your complete hair plan", "QR678 Works Best as Part of a Plan", "Hair loss rarely has a single cause, so our doctors look at the full picture, not just the scalp.")}
 ${tabs("hairplan", [
   { tab: "1 · Find the cause", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Before treating, we find out why your hair is falling. Your doctor examines your scalp and may suggest simple blood tests.</p>${list(["Haemoglobin, iron and ferritin", "Vitamin D and B12", "Thyroid function", "Hormones and PCOS checks for women"])}</div><div class="cp-meta"><div><b>Why it matters:</b> fixing the cause makes QR678 work better</div></div></div>` },
   { tab: "2 · QR678 sessions", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Your QR678 course delivers growth peptides straight to the roots.</p>${list(["6 to 8 sessions, 3 to 4 weeks apart", "Progress photos at every visit", "Maintenance every 3 to 6 months"])}</div><div class="cp-meta"><div><b>Time:</b> about 30 min per visit</div><div><b>Downtime:</b> none</div></div></div>` },
   { tab: "3 · Home care", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">What you do between sessions matters. Your doctor may prescribe treatment to use at home.</p>${list(["Topical or oral medication if suitable", "A gentle, scalp-friendly shampoo", "Supplements only where tests show a need"])}</div><div class="cp-meta"><div><b>Tip:</b> never start or stop hair medicines without your doctor</div></div></div>` },
   { tab: "4 · Boost if needed", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">For stubborn pattern hair loss, QR678 can be alternated with other regenerative treatments.</p>${list(["GFC: concentrated growth factors from your own blood", "Exosomes: ready-made cell messengers", "Hair transplant for areas that are fully bald"])}</div><div class="cp-meta"><div><a href="/gfc-hair-treatment/" style="text-decoration:underline">GFC hair treatment</a></div><div><a href="/exosomes-hair-treatments/" style="text-decoration:underline">Exosome hair treatment</a></div></div></div>` },
 ])}`),

  shell("plans", `${head("Packages", "QR678 Hair Treatment Packages at Facelit", "Start with one session, save with a package, or combine QR678 with GFC.")}
 ${k.menu([["all", "All"], ["fall", "Hair fall"], ["thin", "Thinning"], ["pattern", "Pattern hair loss"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">QR678 Hair Treatment Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [B + "566-4.-Man-Examining-Hair.webp", "Indian man checking his hairline before QR678 treatment", 1080, 1080], lead: "A proper diagnosis comes first.",
     items: ["Your doctor examines your scalp and hair pattern and takes progress photos.", "Blood tests may be suggested to check iron, vitamins, thyroid or hormones.", "Shampoo your hair on the day so your scalp is clean and free of oil.", "Have a good breakfast and drink plenty of water, so you don't feel dizzy.", "Tell your doctor about any medicines you take."] },
   { tab: "02 · During", img: HERO.concat([1080, 1080]), lead: "The injections take only a few minutes. Most visits are done in about 30 minutes.",
     items: ["Your scalp is cleaned with an antiseptic swab.", "Numbing cream can be applied if you'd like.", "QR678 is placed just under the skin with very fine, shallow microinjections.", "Your doctor covers all the thinning areas, from hairline to crown.", "Most people feel only small pricks."] },
   { tab: "03 · After", img: [B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man after QR678 hair treatment", 1080, 1080], lead: "You can go straight back to your day. The full aftercare plan is below.",
     items: ["Mild redness or tiny bumps for a few hours.", "No hair products for at least 6 hours.", "Avoid saunas, steam, swimming, heavy exercise and strong sun for 2 days.", "Avoid alcohol, smoking and anti-inflammatory painkillers for 3 days.", "Book your next session in 3 to 4 weeks."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "QR678 Results Timeline", "Hair grows about 1 cm a month, so results build over months. Here's what most people notice.")}
 ${k.timeline([["Sessions 2–3", "Less hair fall", "Fewer hairs in the shower, on your pillow and in your comb."], ["Month 3", "Baby hairs", "Short new hairs appear along the hairline, parting and crown."], ["Months 4–6", "Thicker hair", "Stronger strands and fuller-looking hair, with less scalp showing."], ["After the course", "Maintain", "A session every 3 to 6 months keeps results going."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(A + "hair-before-scaled-1.webp", "Thinning parting on an Indian man before QR678 hair treatment", 1920, 2560)}<figcaption>Before</figcaption></figure>
 <figure>${img(A + "hair-after-scaled-1.webp", "Fuller parting on an Indian man after a course of hair treatment", 1920, 2560)}<figcaption>After a course</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary with the cause and stage of hair loss.</p>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have more hair fall than usual", "Notice thinning, a wider part or a thin crown", "Would rather avoid a blood draw", "Want quick sessions with no downtime"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Have fully bald, shiny areas", "Are pregnant or breastfeeding", "Have an active scalp infection", "Expect results in a few weeks"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "QR678 Aftercare", "A few simple steps help the formula work and protect your scalp.")}${tabs("aftercare", [
   { tab: "First 6 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Leave your scalp alone", "Drink plenty of water", "Wear a loose cap in strong sun", "Go back to work or college as normal"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Oils, gels, sprays or serums", "Washing your hair", "Touching or scratching the scalp", "Tight helmets or caps if you can"], warn)}</div></div>` },
   { tab: "Days 1–3", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Wash with a mild shampoo and lukewarm water", "Pat hair dry gently", "Restart prescribed home treatment when advised", "Eat protein-rich meals"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Saunas, steam rooms and swimming for 2 days", "Heavy exercise, sun and heat for 2 days", "Alcohol, caffeine and smoking for 3 days", "Aspirin, ibuprofen and similar painkillers for 3 days"], warn)}</div></div>` },
   { tab: "Everyday hair care", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Healthy habits</h3>${list(["Protein, iron and vitamin-rich food", "7 to 8 hours of sleep", "Manage stress", "Gentle, wide-tooth combing"])}</div><div class="cp-card"><h3 class="font-serif">Keep up</h3>${list(["Prescribed home treatment", "Mild, scalp-friendly shampoo", "No harsh chemical treatments", "Maintenance sessions"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "QR678 Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"QR678 is only for severe hair loss.\"", "It works best on early to moderate thinning, while follicles are still alive. Starting early gives the best results."],
   ["\"It's the same as PRP.\"", "PRP comes from your own blood. QR678 is a ready-made formula with the same strength every time, and no blood draw."],
   ["\"One session is enough.\"", "Hair grows in cycles, so follicles need repeated signals. Most people need 6 to 8 sessions for lasting change."],
   ["\"QR678 can regrow a completely bald head.\"", "QR678 revives weak follicles that are still alive. Fully bald, shiny areas usually need a hair transplant."],
   ["\"Results disappear as soon as you stop.\"", "Results last well when the cause is managed. Pattern hair loss is ongoing, so occasional maintenance sessions help keep them."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "QR678 vs PRP, GFC and Exosomes", "Four popular non-surgical hair treatments, side by side.")}
 ${k.compareTable(["QR678", '<a href="/hair-prp/">PRP</a>', '<a href="/gfc-hair-treatment/">GFC</a>', '<a href="/exosomes-hair-treatments/">Exosomes</a>'], [
   ["What it is", "Patented growth peptide formula", "Platelets from your own blood", "Concentrated growth factors from your own blood", "Lab-made cell messengers with growth signals"],
   ["Blood draw", "No", "Yes", "Yes", "No"],
   ["Strength", "Same every session", "Varies with your platelet count", "Stronger, more consistent", "Consistent"],
   ["Best for", "Hair fall, thinning, no blood draw", "Early hair fall", "Pattern thinning, crown", "Hair fall, weak follicles"],
   ["Visit time", "~30 min", "45–60 min", "45–60 min", "45–60 min"],
   ["Typical sessions", "6–8", "4–6", "4–6", "4–6"],
   ["Downtime", "None", "None to 1 day", "None", "0–1 day"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for QR678 Treatment?</h2>
 ${img(B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man with thick hair", 1080, 1080, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["One-on-one doctor consultation", "A specialist doctor examines your scalp, reviews your medical history and finds the cause of your hair loss before planning treatment."],
   ["Genuine QR678 Neo", "We use the original QR678 Neo formula, so you get the treatment the research is based on."],
   ["Honest advice", "If QR678 won't help, for example on fully bald areas, we'll tell you and explain your real options."],
   ["Every hair treatment under one roof", "QR678, PRP, GFC, exosomes and scalp treatments, so your plan can change as your hair improves."],
   ["Progress you can see", "Photos at every visit, so you can track your results month by month."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Side Effects and Who Should Wait", "QR678 works locally in the scalp and is very well tolerated. Here's what's normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Mild redness for a few hours", "Tiny bumps where the injections went in", "Slight tenderness or itching", "A small bruise, now and then"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant or breastfeeding", "Have a scalp infection or open wound", "Have a bleeding disorder or take blood thinners", "Are having, or recently had, cancer treatment", "Have an autoimmune condition"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "QR678 Hair Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "QR678 Hair Treatment at Facelit", "")}
 ${k.links([["/best-hair-growth-treatment-in-trivandrum-qr-678/", "Location", "QR678 in Trivandrum"], ["/best-hair-clinic-in-karunagappally/", "Location", "Hair clinic in Karunagappally"], ["/best-hair-clinic-in-guruvayur/", "Location", "Hair clinic in Guruvayur"], ["/hair-prp/", "Treatment", "PRP for hair"], ["/gfc-hair-treatment/", "Treatment", "GFC hair treatment"], ["/exosomes-hair-treatments/", "Treatment", "Exosome hair treatment"]])}`),

  k.cta("Not sure if QR678 is right for you?", "Book a consultation. Our doctors will examine your scalp, find the cause of your hair loss and tell you honestly which treatment will work best."),
];

k.writePage(process.argv[2], sections, {
  title: "QR678 Hair Treatment in Kerala | Stop Hair Fall & Regrow Hair | Facelit",
  desc: "Doctor-led QR678 Neo hair growth treatment in Trivandrum, Kollam & Thrissur. A patented growth peptide formula that slows hair fall and thickens thinning hair. No blood draw, no downtime.",
  image: "https://facelit.in/wp-content/uploads/2026/07/249-Untitled-design.webp",
  faqs,
  procedure: { name: "QR678 Hair Growth Treatment", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Scalp",
    howPerformed: "After cleansing the scalp, the QR678 Neo growth peptide formula is delivered into thinning areas with very fine, shallow mesotherapy microinjections.",
    preparation: "Doctor consultation and scalp exam, blood tests if needed, a freshly washed scalp, and a good meal and plenty of water beforehand.",
    followup: "No hair products for 6 hours; avoid saunas, swimming, heavy exercise and sun for 2 days; avoid alcohol, smoking and anti-inflammatory painkillers for 3 days. Repeat every 3 to 4 weeks." },
  crumbs: [["Home", "https://facelit.in/"], ["Hair Treatments", "https://facelit.in/best-hair-treatments/"], ["QR678 Hair Growth Treatment", "https://facelit.in/qr678-hair-growth/"]],
});
