// Builds the redesigned /hair-prp/ page.
// Usage (from facelit-site/): node scripts/hair-prp/build.mjs content/pages/hair-prp.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const HERO = [B + "250-Untitled-design-15.webp", "Doctor giving PRP injections into a man's thinning dark hair at Facelit"];
const SPIN = [B + "567-PRP-Blood-Centrifuge-Process.webp", "Blood sample in a centrifuge being spun to separate platelet-rich plasma", 1080, 1080];
const INJECT = [B + "416-Best-GFC-Hair-Treatment-in-Karunagappally.webp", "PRP being injected into a thinning hairline", 1080, 1080];
const NEEDLE = [B + "251-7193.webp", "Scalp microneedling with a Dermapen to boost PRP", 1080, 1080];
const CROWN = [B + "563-hair-thinning-e1757654914322.webp", "Thinning crown on dark hair", 1080, 1012];

const benefits = [
  ["shield", "Less Hair Fall", "Strengthens weak roots so you see fewer hairs on your pillow, comb and bathroom floor."],
  ["lift", "Natural Regrowth", "Platelet growth factors wake up resting follicles and push them back into the growing phase."],
  ["layers", "Thicker, Fuller Hair", "Thin strands grow back stronger, so hair looks denser and covers the scalp better."],
  ["drop", "From Your Own Blood", "Made from a small sample of your blood, so there's no risk of allergy or rejection."],
  ["leaf", "Healthier Scalp", "Better blood flow and nutrient supply give your roots a stronger base to grow from."],
  ["heal", "No Surgery", "Just a blood draw and fine scalp injections. No cuts, stitches or scars."],
  ["clock", "Back to Work Same Day", "A session takes about an hour, and most people go straight back to their day."],
  ["spark", "A Proven First Step", "One of the most studied non-surgical hair treatments and a good-value place to start."],
];

const finderResults = [
  { v: "fall", label: "Too much hair fall", img: [A + "hair-before-scaled-1.webp", "Thinning parting on an Indian man from heavy hair fall", 1920, 2560], title: "Hair Fall Control Plan",
    text: "PRP calms the scalp and strengthens roots, so heavy shedding usually slows within the first 2 to 3 sessions.",
    early: "Blood tests for iron, thyroid and vitamin D, then 3 to 4 PRP sessions a month apart.", long: "A full 6-session course, with doctor-prescribed home treatment to keep shedding under control.",
    sessions: "3–6, every 4 weeks", combine: "Blood tests, nutrition" },
  { v: "male", label: "Receding hairline (men)", img: [B + "196-5-1.webp", "Receding hairline and thinning temples on dark hair", 1080, 1080], title: "Hairline Support Plan",
    text: "Male pattern hair loss is genetic and hormone-driven. PRP strengthens thinning follicles and thickens the hair you still have, especially alongside prescribed medication.",
    early: "6 PRP sessions with doctor-prescribed home treatment, started before the hairline goes further.", long: "PRP with microneedling, or a switch to GFC for a stronger dose. For bald areas we'll talk honestly about transplant options.",
    sessions: "6, then maintenance", combine: "Minoxidil, finasteride (if prescribed), microneedling" },
  { v: "female", label: "Widening part (women)", img: [B + "298-Hair-Loss-women.webp", "Widening hair part on a woman with dark hair", 1080, 1080], title: "Fuller Part Plan",
    text: "In women, thinning shows as a wider part and a flatter top. PRP thickens existing strands and helps new growth along the part.",
    early: "PRP sessions plus checks for iron, thyroid, PCOS and hormones.", long: "A 6-session course with a home routine, and GFC or exosomes if more help is needed.",
    sessions: "4–6, every 4 weeks", combine: "Blood tests, prescribed topicals" },
  { v: "crown", label: "Thin crown", img: CROWN, title: "Crown Density Plan",
    text: "The crown thins quietly and most people only notice it in photos. PRP injections across the thin patch improve density and coverage.",
    early: "4 to 6 PRP sessions focused on the crown.", long: "PRP with microneedling, or alternated with GFC for a stubborn crown.",
    sessions: "4–6, every 4 weeks", combine: "Microneedling, GFC" },
  { v: "postpartum", label: "After pregnancy or illness", img: [A + "hair-treatments-hero.webp", "Indian woman with long, healthy hair", 2159, 1440], title: "Recovery Regrowth Plan",
    text: "Heavy shedding after childbirth, fever, COVID, surgery or crash dieting usually recovers, and PRP can help it recover faster and fuller.",
    early: "2 to 3 PRP sessions, plus nutrition support.", long: "A full course, plus tests to find any ongoing cause.",
    sessions: "2–4, every 4 weeks", combine: "Nutrition, blood tests" },
  { v: "transplant", label: "Planning or had a transplant", img: INJECT, title: "Transplant Support Plan",
    text: "PRP is often used around a hair transplant to help grafts settle and to protect the native hair around them.",
    early: "PRP sessions before surgery to strengthen surrounding hair.", long: "PRP sessions after surgery, once your surgeon agrees, to support graft growth.",
    sessions: "2–4, as advised", combine: "Your transplant surgeon's plan" },
];

const concerns = [
  { tab: "Excessive hair fall", img: [A + "hair-before-scaled-1.webp", "Thinning parting from excessive hair fall on an Indian man", 1920, 2560], title: "Excessive hair fall",
    text: "Losing up to 100 hairs a day is normal. Clumps in the shower, a thinner ponytail or hair all over your pillow means too many follicles have slipped into the resting phase. PRP's growth factors help push them back into growing.",
    more: ["Shedding slows, often by the 2nd or 3rd session", "Stronger, better-anchored roots", "Works best once the cause is found"], rec: ["Blood tests", "Nutrition"], sessions: "3–6, every 4 weeks",
    link: ["/hair-loss-symptoms-causes-treatments/", "Hair loss causes and treatments"] },
  { tab: "Male pattern baldness", img: [B + "196-5-1.webp", "Receding hairline on dark hair", 1080, 1080], title: "Male pattern baldness (androgenetic alopecia)",
    text: "A receding hairline, thinning temples or a thin crown in men is caused by DHT, a hormone that slowly shrinks follicles. PRP strengthens shrinking follicles and thickens the remaining hair, while prescribed medication protects them from DHT.",
    more: ["Holds and thickens the hairline", "Fuller temples and crown", "Best results when started early"], rec: ["Prescribed medication", "Microneedling"], sessions: "6, then maintenance",
    link: ["/can-prp-reverse-hair-thinning-in-men/", "Can PRP reverse thinning in men?"] },
  { tab: "Female pattern hair loss", img: [B + "298-Hair-Loss-women.webp", "Widening part on a woman with dark hair", 1080, 1080], title: "Female pattern hair loss",
    text: "Women rarely go bald. Instead the part widens and the top looks flat. It's often linked to hormones, PCOS, thyroid or low iron, so we test for these and use PRP to rebuild density.",
    more: ["Narrower-looking part", "More volume on top", "Root causes checked and treated"], rec: ["Blood tests", "Prescribed topicals"], sessions: "4–6, every 4 weeks",
    link: ["/hair-treatment-in-trivandrum/", "Hair treatment in Trivandrum"] },
  { tab: "Thinning crown", img: CROWN, title: "Thinning crown",
    text: "The crown is one of the first places to thin and the hardest to see yourself. PRP spread across the thin patch improves coverage, so less scalp shows under light.",
    more: ["Better crown coverage", "Thicker strands", "Easy to track with photos"], rec: ["Microneedling", "GFC"], sessions: "4–6, every 4 weeks" },
  { tab: "Weak, thin hair", img: [B + "566-4.-Man-Examining-Hair.webp", "Indian man checking his hairline in the mirror", 1080, 1080], title: "Weak, thin hair",
    text: "Your hair isn't falling in clumps, but your ponytail is thinner or styling doesn't hold like before. This is the best time for PRP, because follicles that are still alive respond best.",
    more: ["Stronger, thicker strands", "Saves follicles early", "Fewer sessions needed"], rec: ["Nutrition", "Scalp care"], sessions: "3–4, every 4 weeks" },
  { tab: "Alopecia areata", img: [B + "202-GFC-Hair-treatment-0.webp", "Close-up of a woman's scalp and hair part", 1080, 1080], title: "Alopecia areata (patchy hair loss)",
    text: "Round, smooth bald patches are usually alopecia areata, an immune condition. It needs a doctor's diagnosis and medical treatment first. PRP can be added to support regrowth in suitable cases.",
    more: ["Doctor diagnosis first", "Medical treatment as the base", "PRP as support"], rec: ["Doctor-led treatment"], recLabel: "Important", sessions: "Planned by your doctor" },
];

const stages = [
  ["Early thinning", 1, "More hair fall, a slightly wider part or a softer hairline. PRP works best here.", "hair fall, early thinning", "none", "3–4, every 4 weeks"],
  ["Moderate thinning", 2, "Scalp visible through the hair, thin crown or temples. PRP still helps, often boosted with microneedling or GFC.", "pattern thinning, crown", "none", "6, plus maintenance"],
  ["Advanced / bald areas", 3, "Smooth, shiny areas where follicles have stopped. PRP can't regrow these, but it can protect the hair around them.", "support, before or after transplant", "none", "we'll discuss transplant options honestly"],
];

const menuRows = [
  ["Single PRP Session", "Starter", "fall", "Experience hair revival with one PRP session. A good start for recent hair fall.", ["Hair fall", "Starter"], "Blood draw, PRP preparation and scalp injections in one visit.", "None", "1"],
  ["6-Session PRP Package", "Popular", "fall thin pattern", "Maximise your results with a full course of six sessions.", ["Best value", "Popular"], "Six sessions about a month apart, with progress photos at each visit.", "None", "6"],
  ["PRP + Microneedling", "Boost", "thin pattern", "Dermapen scalp microneedling with PRP for better spread across thinning areas.", ["Microneedling", "Boost"], "Microneedling first, then PRP applied and injected in the same session.", "0–1 day", "4–6"],
  ["Women's Hair Thinning Programme", "Programme", "thin", "PRP plus root-cause checks (iron, thyroid, hormones) and a home routine for women.", ["Women", "Root cause"], "Doctor-led plan combining tests, PRP and topicals.", "None", "6"],
  ["Hair Transplant Support", "Support", "pattern", "PRP sessions before or after a hair transplant to support grafts and native hair.", ["Transplant"], "Timed around your surgery with your surgeon's agreement.", "None", "2–4"],
  ["Maintenance Session", "Maintain", "fall thin pattern", "Keep your results going after your course is complete.", ["Maintenance"], "One PRP session every 3 to 6 months.", "None", "1"],
];

const faqs = [
  ["What is PRP hair treatment?", "PRP stands for platelet-rich plasma. A small amount of your blood is spun in a centrifuge to concentrate the platelets. This platelet-rich plasma is injected into thinning areas of your scalp, where it releases growth factors that strengthen follicles and boost hair growth."],
  ["Does PRP really work for hair loss?", "Yes, for the right person. PRP works best for hair fall and early to moderate thinning, where follicles are still alive. Results are best when the cause of hair loss is also treated."],
  ["Is PRP hair treatment painful?", "You'll feel small pricks from a very fine needle. We can apply numbing cream first, and most people find it very manageable. The scalp may feel tender for a day."],
  ["How many PRP sessions will I need?", "Most people need 4 to 6 sessions about 4 weeks apart, then a maintenance session every 3 to 6 months. Early hair fall may settle with 3 to 4 sessions."],
  ["When will I see results from PRP?", "Hair fall usually slows within 6 to 8 weeks. Baby hairs often appear by 3 months, and thicker, fuller hair shows around 4 to 6 months."],
  ["Is PRP safe?", "Yes. It's made from your own blood, so there's no risk of allergy or rejection. The blood is processed in sterile, single-use kits. Mild tenderness or redness for a day is the most common side effect."],
  ["PRP vs GFC: which is better?", "Both come from your blood. PRP injects the platelets themselves, while GFC releases and concentrates the growth factors first. GFC is stronger and more consistent. PRP is a good-value first step, especially for early hair fall."],
  ["Can PRP regrow hair on a bald patch?", "PRP works on follicles that are still alive, even if weak. Smooth, shiny bald areas where follicles have gone usually can't regrow with any injection. We'll tell you honestly and discuss options like hair transplant."],
  ["Does PRP work for women?", "Yes. PRP works well for female pattern thinning, postpartum shedding and stress-related hair fall. We also check iron, thyroid and hormones to treat the root cause."],
  ["Are PRP results permanent?", "Results last as long as the cause is managed. Pattern hair loss continues over time, so most people keep their results with maintenance sessions and home care."],
  ["Can I combine PRP with minoxidil?", "Yes, and they work well together. Only start or change hair medicines with your doctor's advice."],
  ["When can I wash my hair after PRP?", "Wait at least 24 hours, then use a mild shampoo and lukewarm water."],
  ["Where can I get PRP hair treatment in Kerala?", "Facelit offers PRP hair treatment in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does PRP hair treatment cost?", "It depends on the area being treated and the number of sessions. The 6-session package works out to better value per session. Book a consultation for a personalised quote, or see our PRP cost guide."],
];

const sections = [
  k.hero({
    tags: ["Hair", "Your own platelets", "Doctor-led"], h1: "PRP Hair Treatment",
    img: HERO, pos: "50% 40%",
    intro: "Noticing more hair in your comb, a thinner ponytail or a receding hairline? PRP (platelet-rich plasma) uses the healing platelets in your own blood to strengthen weak roots, slow hair fall and grow thicker hair. No surgery, no foreign products, and you can go back to work the same day.",
    facts: [["45–60 min", "Per session"], ["None", "Downtime"], ["4–6", "Sessions typical"], ["3 months", "Visible regrowth"]],
    cta2: ["#finder", "Find your hair plan"],
  }),
  k.jump([["overview", "Overview"], ["how", "How it's made"], ["finder", "Find your plan"], ["concerns", "Concerns"], ["boost", "Boost PRP"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is PRP for Hair?</h2>
 <div class="cp-prose">
 <p>Platelets are the cells in your blood that start healing whenever you get a cut. They carry growth factors: natural proteins that tell tissue to repair and grow. Hair follicles respond to these same signals.</p>
 <p>In PRP hair treatment, we take a small amount of your blood and spin it in a centrifuge to concentrate the platelets into a few millilitres of plasma. This platelet-rich plasma is injected into thinning areas of your scalp, where it releases growth factors that wake up weak follicles, slow hair fall and help thicker hair grow.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why hair thins in the first place ${k.plus}</summary>
 <div class="cp-prose">
 <p>Every hair grows, rests and sheds in a cycle. Healthy hair spends years growing. When hormones, stress, illness, low iron, thyroid problems or genetics get in the way, follicles shrink, their growing phase gets shorter and each new hair comes in thinner.</p>
 <p>PRP helps by improving blood supply to the root, helping follicle cells multiply and keeping hair in the growing phase for longer. Read more about <a href="/hair-loss-symptoms-causes-treatments/">the causes of hair loss</a>.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How PRP works on hair">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Concentrate</b><span>Your platelets are separated and concentrated from a small blood sample.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Inject</b><span>Fine injections place them at the roots of thinning hair.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Regrow</b><span>Growth factors strengthen follicles, and thicker hair grows over the next few months.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...SPIN)}
 ${img(...INJECT)}
 </div>
 </div>`),

  shell("how", `${head("From your blood to your scalp", "How PRP Is Prepared, Step by Step", "Everything happens in the clinic, in one visit, in about an hour.")}
 ${k.benefitsGrid([
   ["drop", "1. A small blood draw", "A small amount of blood is taken from your arm, just like a routine blood test."],
   ["wave", "2. Spin in a centrifuge", "The blood is spun so the heavy red cells settle and the platelets collect in the plasma."],
   ["layers", "3. Collect the PRP", "The golden, platelet-rich layer is drawn off into a sterile syringe."],
   ["spark", "4. Inject where it's thin", "PRP is injected with a very fine needle across the thinning areas of your scalp."],
 ])}`),

  shell("finder", `${head("Find your plan", "Which PRP Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan after examining your scalp.")}
 ${k.finder({ q1: "What's worrying you most?", q2: { label: "How long has it been happening?", dt: "Our suggestion", options: [["early", "Recently, within the last year"], ["long", "For a few years"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of PRP Hair Treatment", "Your body's own healing power, focused on your hair.")}${k.benefitsGrid(benefits)}`),

  shell("concerns", `${head("Is it right for you?", "Hair Problems PRP Can Help With", "Tap a concern to see how PRP helps, what we pair it with and how many sessions you may need.")}
 ${k.concernTabs("concerns", concerns)}`),

  shell("", `${head("Be honest with yourself", "What Stage Is Your Hair Loss?", "PRP works on follicles that are still alive. The earlier you start, the more hair you keep.")}${k.depthCards(stages)}`),

  shell("boost", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Get more from PRP", "Ways to Boost Your PRP Results", "PRP works well on its own, but these combinations can make a real difference for stubborn thinning.")}
 ${tabs("boost", [
   { tab: "+ Microneedling", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Dermapen scalp microneedling makes tiny channels and triggers the scalp's own repair, so PRP spreads evenly across the thinning area.</p>${list(["Better coverage of large thin areas", "Extra growth boost from the microneedling itself", "Mild redness for a day"])}</div><div class="cp-meta"><div><a href="/microneedling/" style="text-decoration:underline">About microneedling</a></div></div></div>` },
   { tab: "+ Home treatment", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">PRP strengthens follicles. Doctor-prescribed home treatment protects them between sessions.</p>${list(["Topical or oral medication if suitable", "Supplements only where tests show a need", "A gentle, scalp-friendly shampoo"])}</div><div class="cp-meta"><div><b>Tip:</b> never start or stop hair medicines without your doctor</div></div></div>` },
   { tab: "Step up to GFC", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">If PRP isn't doing enough, GFC is the next step. It releases and concentrates the growth factors before injection for a stronger, more consistent dose.</p>${list(["More concentrated than PRP", "Less swelling afterwards", "Often fewer sessions"])}</div><div class="cp-meta"><div><a href="/gfc-hair-treatment/" style="text-decoration:underline">GFC hair treatment</a></div></div></div>` },
   { tab: "Add exosomes", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Exosomes are ready-made growth signals with no blood draw. Alternating them with PRP gives follicles a different kind of boost.</p>${list(["No blood draw needed", "Good for weak follicles and scalp inflammation", "Alternated with PRP across the course"])}</div><div class="cp-meta"><div><a href="/exosomes-hair-treatments/" style="text-decoration:underline">Exosome hair treatment</a></div></div></div>` },
 ])}
 </div>
 <div class="cp-split-sep">${head("Comfort", "Worried It Will Hurt?", "Most people are surprised how easy it is. Here's how we keep you comfortable.")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Numbing cream", "We can apply numbing cream to your scalp 20 to 30 minutes before the injections."],
   ["Very fine needles", "We use very fine needles and shallow injections, so most people feel only small pricks."],
   ["Quick injections", "The injections themselves take only 10 to 15 minutes."],
   ["Take breaks", "You can ask for a pause at any time. There's no rush."],
   ["After the session", "The scalp may feel tender or tight for a day. Avoid ibuprofen or aspirin, and ask your doctor about paracetamol if needed."],
 ])}</div></div>
 </div>`),

  shell("plans", `${head("Packages", "PRP Hair Treatment Packages at Facelit", "Start with one session, save with a full course, or boost PRP with microneedling.")}
 ${k.menu([["all", "All"], ["fall", "Hair fall"], ["thin", "Thinning"], ["pattern", "Pattern hair loss"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">PRP Hair Treatment Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [B + "566-4.-Man-Examining-Hair.webp", "Indian man checking his hairline before PRP treatment", 1080, 1080], lead: "A proper diagnosis comes first.",
     items: ["Your doctor examines your scalp and hair pattern and takes progress photos.", "Blood tests may be suggested to check iron, vitamins, thyroid or hormones.", "Avoid blood thinners, aspirin and ibuprofen for a few days, if your doctor agrees.", "Drink plenty of water and eat a light meal before you come.", "Come with a clean scalp, free of oils, gels and sprays."] },
   { tab: "02 · During", img: HERO.concat([1080, 1080]), lead: "A session takes 45 to 60 minutes, including preparation.",
     items: ["A small amount of blood is drawn from your arm.", "It's spun in a centrifuge to separate the platelet-rich plasma.", "Your scalp is cleaned, and numbing cream applied if you'd like.", "PRP is injected across the thinning areas with a very fine needle.", "You'll feel small pricks, but most people find it easy."] },
   { tab: "03 · After", img: [B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man after PRP hair treatment", 1080, 1080], lead: "You can go straight back to your day. The full aftercare plan is below.",
     items: ["Mild tenderness or redness for a day or two.", "Don't wash your hair for 24 hours.", "Avoid gym, swimming and strong sun on the scalp for 48 hours.", "Skip hair colour and chemical treatments for a week.", "Book your next session in 4 to 6 weeks."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "PRP Hair Treatment Results Timeline", "Hair grows about 1 cm a month, so results build over months. Here's what most people notice.")}
 ${k.timeline([["Weeks 6–8", "Less hair fall", "Fewer hairs in the shower, on your pillow and in your comb."], ["Month 3", "Baby hairs", "Short new hairs appear along the hairline, parting and crown."], ["Months 4–6", "Thicker hair", "Stronger strands and fuller-looking hair, with less scalp showing."], ["After the course", "Maintain", "A session every 3 to 6 months keeps results going."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(A + "hair-before-scaled-1.webp", "Thinning parting on an Indian man before PRP hair treatment", 1920, 2560)}<figcaption>Before</figcaption></figure>
 <figure>${img(A + "hair-after-scaled-1.webp", "Fuller parting on an Indian man after a course of hair treatment", 1920, 2560)}<figcaption>After a course</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary with the cause and stage of hair loss.</p>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have more hair fall than usual", "Notice early thinning or a wider part", "Want a natural, good-value first treatment", "Are planning or have had a hair transplant"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Have fully bald, shiny areas", "Have a blood or platelet disorder", "Have an active scalp infection", "Expect results in a few weeks"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "PRP Aftercare", "A few simple steps help the platelets work and protect your scalp.")}${tabs("aftercare", [
   { tab: "First 24 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Leave your scalp alone", "Sleep on a clean pillowcase", "Drink plenty of water", "Wear a loose cap in strong sun"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Washing your hair", "Oils, gels, sprays or serums", "Touching or scratching the scalp", "Ibuprofen or aspirin, unless your doctor says so"], warn)}</div></div>` },
   { tab: "Days 2–7", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Wash with a mild shampoo and lukewarm water", "Pat hair dry gently", "Restart prescribed home treatment when advised", "Eat protein-rich meals"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Gym, swimming and saunas for 48 hours", "Hair colour, bleach or straightening for a week", "Smoking and alcohol for a few days", "Hair oil massages for 3 days"], warn)}</div></div>` },
   { tab: "Everyday hair care", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Healthy habits</h3>${list(["Protein, iron and vitamin-rich food", "7 to 8 hours of sleep", "Manage stress", "Gentle, wide-tooth combing"])}</div><div class="cp-card"><h3 class="font-serif">Keep up</h3>${list(["Prescribed home treatment", "Scalp-friendly shampoo", "Progress check every few months", "Maintenance sessions"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "PRP Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"PRP is a one-time fix.\"", "Hair grows in cycles, so follicles need repeated signals. Most people need 4 to 6 sessions, then occasional maintenance."],
   ["\"PRP can regrow a completely bald head.\"", "PRP revives weak follicles that are still alive. Fully bald, shiny areas usually need a hair transplant."],
   ["\"Using your own blood is risky.\"", "It's your own blood, processed in sterile, single-use kits, so there's no risk of allergy or rejection."],
   ["\"PRP is very painful.\"", "With numbing cream and fine needles, most people feel only small pricks and find it very manageable."],
   ["\"If PRP didn't work, nothing will.\"", "PRP strength varies from person to person. GFC, exosomes or a combined plan often help when PRP alone wasn't enough."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "PRP vs GFC, Exosomes and QR678", "Four popular non-surgical hair treatments, side by side.")}
 ${k.compareTable(["PRP", '<a href="/gfc-hair-treatment/">GFC</a>', '<a href="/exosomes-hair-treatments/">Exosomes</a>', '<a href="/qr678-hair-growth/">QR678</a>'], [
   ["What it is", "Concentrated platelets from your own blood", "Concentrated growth factors from your own blood", "Lab-made cell messengers with growth signals", "Ready-made growth factor formula"],
   ["Blood draw", "Yes", "Yes", "No", "No"],
   ["Best for", "Early hair fall, first treatment", "Pattern thinning, crown, after PRP", "Hair fall, weak follicles", "Hair fall, thinning"],
   ["Strength", "Varies with your platelet count", "Stronger, more consistent", "Consistent", "Consistent"],
   ["Soreness after", "Mild to moderate", "Mild", "Mild", "Mild"],
   ["Typical sessions", "4–6", "4–6", "4–6", "6–8"],
   ["Cost", "Most affordable", "Higher", "Higher", "Higher"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for PRP Hair Treatment?</h2>
 ${img(B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man with thick hair", 1080, 1080, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["One-on-one doctor consultation", "A specialist doctor examines your scalp, reviews your medical history and finds the cause of your hair loss before planning treatment."],
   ["Safe, sterile procedures", "Your blood is processed in the clinic in sterile, single-use kits and injected in the same visit."],
   ["Support from start to finish", "Clear pre-care and aftercare guidance, and a team you can call with questions between sessions."],
   ["Every hair treatment under one roof", "PRP, GFC, exosomes, QR678 and microneedling, so your plan can step up if you need more."],
   ["Comfort and care", "Numbing cream, fine needles and a calm, relaxed setting, so the treatment feels easy."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Side Effects and Who Should Wait", "PRP is made from your own blood and is very well tolerated. Here's what's normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Mild tenderness or redness for a day or two", "Slight swelling at injection points", "A small bruise where blood was drawn", "Mild headache or tight feeling on the scalp"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Have a blood, platelet or clotting disorder", "Take blood thinners", "Are pregnant or breastfeeding", "Have a scalp infection or open wound", "Have cancer, or are on chemotherapy"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "PRP Hair Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "PRP Hair Treatment at Facelit", "")}
 ${k.links([["/best-prp-clinic-in-trivandrum/", "Location", "PRP clinic in Trivandrum"], ["/cost-of-prp-in-trivandrum/", "Cost", "PRP cost in Trivandrum"], ["/can-prp-reverse-hair-thinning-in-men/", "Guide", "Can PRP reverse thinning in men?"], ["/gfc-vs-prp-hair-treatment-which-one-should-you-choose/", "Guide", "GFC vs PRP: which to choose"], ["/gfc-hair-treatment/", "Treatment", "GFC hair treatment"], ["/prp-face-treatment/", "Treatment", "PRP for the face"]])}`),

  k.cta("Not sure if PRP is right for you?", "Book a consultation. Our doctors will examine your scalp, find the cause of your hair loss and tell you honestly which treatment will work best."),
];

k.writePage(process.argv[2], sections, {
  title: "PRP Hair Treatment in Kerala for Hair Fall & Thinning | Facelit",
  desc: "Doctor-led PRP hair treatment in Trivandrum, Kollam & Thrissur. Uses your own platelets to slow hair fall and regrow thinning hair. No surgery, no downtime.",
  image: "https://facelit.in/wp-content/uploads/2026/07/250-Untitled-design-15.webp",
  faqs,
  procedure: { name: "PRP (Platelet-Rich Plasma) Hair Treatment", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Scalp",
    howPerformed: "A small blood sample is spun in a centrifuge to concentrate platelets into plasma, which is then injected into thinning areas of the scalp with a fine needle.",
    preparation: "Doctor consultation and scalp exam, blood tests if needed, avoiding blood thinners and anti-inflammatory painkillers if advised, and coming with a clean scalp.",
    followup: "No hair wash for 24 hours, avoid exercise, swimming and sun for 48 hours, and no colouring or chemical treatments for a week. Repeat every 4 to 6 weeks." },
  crumbs: [["Home", "https://facelit.in/"], ["Hair Treatments", "https://facelit.in/best-hair-treatments/"], ["PRP Hair Treatment", "https://facelit.in/hair-prp/"]],
});
