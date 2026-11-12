// Builds the redesigned /exosomes-hair-treatments/ page.
// Usage (from facelit-site/): node scripts/exosomes-hair/build.mjs content/pages/exosomes-hair-treatments.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const benefits = [
  ["shield", "Less Hair Fall", "Strengthens weak roots so fewer hairs come out in the shower and on your pillow."],
  ["lift", "New Hair Growth", "Wakes up sleeping follicles and pushes them back into the growth phase."],
  ["layers", "Thicker, Denser Hair", "Thin strands grow back stronger, so hair looks fuller and covers the scalp better."],
  ["cell", "Healthier Follicles", "Growth signals help follicles repair and stay in the growing phase for longer."],
  ["drop", "Healthier Scalp", "Calms inflammation and improves blood flow, giving roots a better place to grow."],
  ["heal", "Little Downtime", "Mild redness for a day at most. You can go back to work the same day."],
  ["leaf", "No Blood Draw", "Unlike PRP, the exosomes are ready-made, so there's no blood sample needed."],
  ["clock", "Results That Build", "Improvements keep building for months as more follicles return to growth."],
];

const finderResults = [
  { v: "fall", label: "Too much hair fall", img: [A + "hair-before-scaled-1.webp", "Thinning parting on an Indian man's scalp from heavy hair fall", 1920, 2560], title: "Stop the Fall Plan",
    text: "Exosomes calm the scalp and strengthen roots, so daily hair fall slows down, usually within the first 1 to 2 months.",
    early: "4 exosome sessions a month apart, plus blood tests to rule out iron, thyroid or vitamin D problems.", long: "A 6-session course, combined with doctor-prescribed home treatment for lasting control.",
    sessions: "4–6, every 3–4 weeks", combine: "Blood tests, nutrition, PRP" },
  { v: "male", label: "Receding hairline (men)", img: [B + "196-5-1.webp", "Receding hairline and thinning temples on dark hair", 1080, 1080], title: "Hairline Support Plan",
    text: "Male pattern hair loss is driven by hormones. Exosomes help keep thinning follicles alive and growing, best alongside prescribed medication.",
    early: "Exosome sessions with prescribed medication to hold and regrow the hairline.", long: "A longer course with PRP or GFC. For bald areas, we'll talk honestly about hair transplant options.",
    sessions: "4–6, then maintenance", combine: "Minoxidil, finasteride (if prescribed), PRP, GFC" },
  { v: "female", label: "Widening part (women)", img: [B + "298-Hair-Loss-women.webp", "Widening hair part on a woman with dark hair", 1080, 1080], title: "Fuller Part Plan",
    text: "Female pattern thinning shows as a widening part and less volume on top. Exosomes help thicken existing hair and support new growth.",
    early: "Exosome sessions plus checks for iron, thyroid and hormones.", long: "A 6-session course with home treatment, alternating with PRP if needed.",
    sessions: "4–6, every 3–4 weeks", combine: "Blood tests, PRP, prescribed topicals" },
  { v: "crown", label: "Thin crown", img: [B + "424-Best-Hair-Clinic-in-Guruvayur.webp", "Thinning hair at the crown", 720, 810], title: "Crown Density Plan",
    text: "Thinning at the crown is common in both men and women. Exosomes focus on the thin area to improve density over a few months.",
    early: "Exosome sessions focused on the crown.", long: "Exosomes alternated with GFC or PRP, plus home treatment.",
    sessions: "4–6, every 3–4 weeks", combine: "GFC, PRP, prescribed topicals" },
  { v: "postpartum", label: "After pregnancy or illness", img: [A + "hair-treatments-hero.webp", "Indian woman with long, healthy hair", 2159, 1440], title: "Recovery Regrowth Plan",
    text: "Sudden shedding after childbirth, fever, COVID, crash diets or stress (telogen effluvium) often recovers well, and exosomes can speed it up.",
    early: "2 to 4 sessions to speed up recovery, plus nutrition support.", long: "A full course, plus tests to find any ongoing cause.",
    sessions: "2–4, every 3–4 weeks", combine: "Nutrition, blood tests" },
  { v: "scalp", label: "Itchy, flaky scalp", img: [B + "768-scalp-hair.webp", "Flaky scalp with dandruff on dark hair", 1080, 1080], title: "Scalp Reset Plan",
    text: "An inflamed, flaky scalp makes hair fall worse. We calm the scalp first, then use exosomes to support healthier growth.",
    early: "Scalp treatment to clear dandruff, then exosome sessions.", long: "Scalp peel and medicated care, followed by an exosome course.",
    sessions: "Scalp care first, then 4 sessions", combine: "Scalp peel, medicated shampoo" },
];

const concerns = [
  { tab: "Excessive hair fall", img: [A + "hair-before-scaled-1.webp", "Thinning parting from excessive hair fall on an Indian man", 1920, 2560], title: "Excessive hair fall",
    text: "Losing 50 to 100 hairs a day is normal. If you're seeing clumps in the shower, on your pillow or in your comb, something has pushed your follicles into resting too early. Exosomes help calm the scalp and push follicles back into the growing phase.",
    more: ["Slows daily hair fall", "Stronger roots", "Often noticeable within 1 to 2 months"], rec: ["Blood tests", "Nutrition"], sessions: "4–6, every 3–4 weeks",
    link: ["/hair-loss-symptoms-causes-treatments/", "Hair loss causes and treatments"] },
  { tab: "Male pattern hair loss", img: [B + "196-5-1.webp", "Receding hairline on dark hair", 1080, 1080], title: "Male pattern hair loss",
    text: "A receding hairline or thinning crown in men is usually genetic and hormone-driven. Exosomes help keep follicles alive and growing. For the best results we combine them with medication your doctor prescribes.",
    more: ["Holds and thickens the hairline", "Revives thinning follicles", "Works best when started early"], rec: ["Prescribed medication", "PRP", "GFC"], sessions: "4–6, then maintenance",
    link: ["/mens-hair-loss-treatments-and-solutions/", "Men's hair loss solutions"] },
  { tab: "Female pattern thinning", img: [B + "298-Hair-Loss-women.webp", "Widening part on a woman with dark hair", 1080, 1080], title: "Female pattern hair thinning",
    text: "In women, thinning usually shows as a wider part and less volume on top rather than bald patches. It's often linked to hormones, PCOS, thyroid or low iron, so we check those too.",
    more: ["Fuller-looking part", "More volume on top", "Root-cause checks included"], rec: ["Blood tests", "PRP"], sessions: "4–6, every 3–4 weeks",
    link: ["/hair-treatment-in-trivandrum/", "Hair treatment in Trivandrum"] },
  { tab: "Thinning crown", img: [B + "424-Best-Hair-Clinic-in-Guruvayur.webp", "Thinning crown on dark hair", 720, 810], title: "Thinning crown",
    text: "The crown is one of the first places to thin and one of the hardest to see yourself. Exosome sessions focused here help improve density and coverage.",
    more: ["Better scalp coverage", "Thicker strands", "Targeted treatment"], rec: ["GFC", "PRP"], sessions: "4–6, every 3–4 weeks" },
  { tab: "Weak, early thinning", img: [B + "566-4.-Man-Examining-Hair.webp", "Indian man checking his hairline in the mirror", 1080, 1080], title: "Early thinning &amp; weak hair",
    text: "Noticed your hair isn't as thick as it used to be? The earlier you start, the more follicles we can save. Exosomes strengthen thin, weak strands before they stop growing.",
    more: ["Saves follicles before they're lost", "Thicker, stronger strands", "Easier than treating late"], rec: ["Nutrition", "Scalp care"], sessions: "3–4, every 4 weeks" },
  { tab: "Alopecia areata", img: [B + "202-GFC-Hair-treatment-0.webp", "Close-up of a woman's scalp and hair part", 1080, 1080], title: "Alopecia areata (patchy hair loss)",
    text: "Alopecia areata causes round, smooth bald patches and is an immune condition. It needs a doctor's diagnosis and usually medical treatment first. Exosomes may be added to support regrowth in suitable cases.",
    more: ["Doctor diagnosis first", "Medical treatment as the base", "Exosomes as support"], rec: ["Doctor-led treatment"], recLabel: "Important", sessions: "Planned by your doctor" },
  { tab: "Scalp health", img: [B + "768-scalp-hair.webp", "Flaky, irritated scalp", 1080, 1080], title: "Dandruff &amp; unhealthy scalp",
    text: "Hair grows best from a healthy scalp. Dandruff, itching and oiliness add to hair fall, so we treat the scalp first and then use exosomes to support growth.",
    more: ["Calmer, cleaner scalp", "Less itch and flaking", "Better base for regrowth"], rec: ["Scalp peel", "Medicated shampoo"], sessions: "Scalp care, then 4",
    link: ["/how-to-get-rid-of-dandruff-permanently/", "Getting rid of dandruff"] },
];

const stages = [
  ["Early thinning", 1, "More hair fall, a slightly wider part or a softer hairline. The best time to start.", "hair fall, early thinning", "none to 1 day", "4, every 3–4 weeks"],
  ["Moderate thinning", 2, "Visible scalp through the hair, thinning crown or temples. Still very treatable.", "pattern thinning, crown", "none to 1 day", "6, plus maintenance"],
  ["Advanced / bald areas", 3, "Smooth, shiny areas where follicles have stopped. Exosomes can't regrow these.", "support around bald areas", "none to 1 day", "we'll discuss transplant options honestly"],
];

const menuRows = [
  ["Single Session", "Starter", "fall", "Experience hair revival with one exosome session. A good start for recent hair fall.", ["Hair fall", "Starter"], "Scalp microneedling with Dermapen, followed by an exosome solution.", "Mild redness for a day", "1"],
  ["4-Session Package", "Popular", "fall thin", "Maximise your results with four sessions about a month apart.", ["Package", "Popular"], "Four sessions spaced 3 to 4 weeks apart, with progress photos.", "Mild redness for a day", "4"],
  ["6-Session Course", "Best value", "thin pattern", "Our full course for pattern thinning and low density.", ["Best results"], "Six sessions with a maintenance plan afterwards.", "Mild redness for a day", "6"],
  ["Exosomes + PRP Plan", "Combo", "pattern thin", "Alternate exosomes with PRP from your own blood for a stronger boost.", ["PRP", "Combo"], "Exosome and PRP sessions alternated across the course.", "1 day", "4–6"],
  ["Exosomes + GFC Plan", "Combo", "pattern thin", "Combine exosomes with GFC (growth factor concentrate) for thinning crowns and hairlines.", ["GFC", "Combo"], "Exosome and GFC sessions alternated across the course.", "1 day", "4–6"],
  ["Women's Hair Thinning Programme", "Programme", "thin", "Exosomes plus root-cause checks (iron, thyroid, hormones) and a home routine for women.", ["Women", "Root cause"], "Doctor-led plan combining tests, exosomes and topicals.", "1 day", "6"],
  ["Postpartum Hair Fall Plan", "Programme", "fall", "Gentle sessions to speed up recovery after pregnancy shedding.", ["Postpartum"], "Started once you're ready, with nutrition advice.", "1 day", "2–4"],
];

const faqs = [
  ["What are exosomes for hair?", "Exosomes are tiny messengers that cells use to talk to each other. They carry growth factors and proteins. On the scalp, they signal hair follicles to repair, stay in the growing phase and produce thicker hair."],
  ["How is exosome hair treatment done?", "At Facelit, we use Dermapen microneedling to make tiny channels in the scalp, then apply the exosome solution so it reaches the follicles. A session takes 45 to 60 minutes."],
  ["Is exosome hair treatment painful?", "Most people feel only mild prickling. We apply a numbing cream first if needed, and there's no blood draw like PRP."],
  ["How many sessions will I need?", "Most people do 4 to 6 sessions, 3 to 4 weeks apart, then a maintenance session every 3 to 6 months."],
  ["When will I see results?", "Hair fall often slows within 4 to 8 weeks. New baby hairs usually appear around 2 to 3 months, and better thickness and density show by 4 to 6 months."],
  ["Exosomes vs PRP for hair: which is better?", "Both use growth signals. PRP comes from your own blood, so its strength varies from person to person. Exosomes are a ready-made, more concentrated product with no blood draw. Many people get great results combining them."],
  ["Can exosomes regrow hair on a bald patch?", "Exosomes work on follicles that are still alive, even if weak. Smooth, shiny bald areas where follicles have gone usually can't regrow with any injectable. We'll tell you honestly and discuss options like hair transplant."],
  ["Is it suitable for women?", "Yes. Exosomes work well for female pattern thinning, postpartum shedding and stress-related hair fall. We also check iron, thyroid and hormones to treat the root cause."],
  ["Are the results permanent?", "They last as long as the cause of hair loss is managed. Pattern hair loss is ongoing, so most people need maintenance sessions and home care to keep their results."],
  ["Can I wash my hair after treatment?", "Wait at least 24 hours before washing so the exosomes can absorb fully. Then use a mild shampoo."],
  ["Are there any side effects?", "Mild redness, tenderness or tiny pinpoint marks on the scalp for a day or two. Serious side effects are rare when done by doctors with quality products."],
  ["Where can I get exosome hair treatment in Kerala?", "Facelit offers exosome hair treatment in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does exosome hair treatment cost?", "It depends on the area and the number of sessions. The 4-session package offers better value. Book a consultation for a personalised quote."],
];

const sections = [
  k.hero({
    tags: ["Hair", "Regenerative", "Doctor-led"], h1: "Exosome Hair Treatment",
    img: [A + "hair-treatments-hero.webp", "Indian woman with thick, healthy hair after exosome hair treatment at Facelit"], pos: "62% center",
    intro: "Worried about hair fall, a widening part or a thinning hairline? Exosome hair treatment delivers powerful growth signals straight to your follicles, helping slow hair fall, wake up weak roots and grow thicker hair. No blood draw, little downtime, and a plan built around the cause of your hair loss.",
    facts: [["45–60 min", "Per session"], ["0–1 day", "Downtime"], ["4–6", "Sessions typical"], ["2–3 months", "Visible regrowth"]],
    cta2: ["#finder", "Find your hair plan"],
  }),
  k.jump([["overview", "Overview"], ["finder", "Find your plan"], ["concerns", "Concerns"], ["plan", "Your plan"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is Exosome Hair Treatment?</h2>
 <div class="cp-prose">
 <p>Exosomes are tiny bubbles that cells release to send messages. They're packed with growth factors, proteins and other signals. When they reach your hair follicles, they tell them to repair, calm down inflammation and get back into the growing phase.</p>
 <p>Hair loss often happens when follicles get stuck in the resting phase or slowly shrink. Exosome treatment tops up the signals they need to grow, so weak, thin hairs can grow back stronger and fuller over a few months.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: the hair growth cycle ${k.plus}</summary>
 <div class="cp-prose">
 <p>Every hair goes through three phases:</p>
 ${list(["<b>Growing (anagen):</b> lasts 2 to 7 years. The longer it lasts, the longer and thicker your hair.", "<b>Transition (catagen):</b> a short 2 to 3 week phase when growth stops.", "<b>Resting and shedding (telogen):</b> about 3 months, after which the hair falls out and a new one starts."])}
 <p>Stress, hormones, illness, poor nutrition and genetics can push more hairs into the resting phase, or make each new hair thinner. Exosomes help move follicles back into growth. Read more about <a href="/hair-loss-symptoms-causes-treatments/">the causes of hair loss</a>.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How exosomes work on hair">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Deliver</b><span>Dermapen makes tiny channels so exosomes reach the follicles.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Signal</b><span>Growth signals wake up weak, resting follicles.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Regrow</b><span>Follicles grow thicker hair over the next few months.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(B + "566-4.-Man-Examining-Hair.webp", "Indian man checking his thinning hairline in the mirror", 1080, 1080)}
 ${img(B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man with thick hair after treatment", 1080, 1080)}
 </div>
 </div>`),

  shell("finder", `${head("Find your plan", "Which Hair Plan Is Right for You?", "Answer two quick questions and see the plan our doctors most often recommend. We confirm your final plan after examining your scalp.")}
 ${k.finder({ q1: "What's worrying you most?", q2: { label: "How long has it been happening?", dt: "Our suggestion", options: [["early", "Recently, within the last year"], ["long", "For a few years"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of Exosome Hair Treatment", "Exosomes tackle hair loss at the root, literally.")}${k.benefitsGrid(benefits)}`),

  shell("concerns", `${head("Is it right for you?", "Hair Problems Exosomes Can Help With", "Tap a concern to see how exosomes help, what we pair them with and how many sessions you may need.")}
 ${k.concernTabs("concerns", concerns)}`),

  shell("", `${head("Be honest with yourself", "What Stage Is Your Hair Loss?", "Exosomes work best on follicles that are still alive. The earlier you start, the better your results.")}${k.depthCards(stages)}`),

  shell("plan", `${head("Your complete hair plan", "Exosomes Work Best as Part of a Plan", "Hair loss usually has more than one cause. That's why our doctors look at the full picture, not just the scalp.")}
 ${tabs("hairplan", [
   { tab: "1 · Find the cause", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Before we treat, we find out why your hair is falling. Our doctors examine your scalp and may suggest simple blood tests.</p>${list(["Iron and ferritin, vitamin D and B12", "Thyroid function", "Hormones and PCOS checks for women", "Scalp conditions like dandruff or infection"])}</div><div class="cp-meta"><div><b>Why it matters:</b> fixing the cause makes every treatment work better</div></div></div>` },
   { tab: "2 · Exosome sessions", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Your exosome course delivers growth signals right to the follicles using Dermapen scalp microneedling.</p>${list(["4 to 6 sessions, 3 to 4 weeks apart", "Progress photos at every visit", "Maintenance every 3 to 6 months"])}</div><div class="cp-meta"><div><b>Time:</b> 45–60 min per session</div><div><b>Downtime:</b> none to 1 day</div></div></div>` },
   { tab: "3 · Home care", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">What you do between sessions matters. Your doctor may prescribe treatments to use at home.</p>${list(["Topical or oral medication if suitable", "A gentle, scalp-friendly shampoo", "Supplements only where tests show a need"])}</div><div class="cp-meta"><div><b>Tip:</b> never start or stop hair medicines without your doctor</div></div></div>` },
   { tab: "4 · Boost with PRP / GFC", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">For pattern hair loss, alternating exosomes with PRP or GFC can give an extra boost.</p>${list(["PRP uses growth factors from your own blood", "GFC is a more concentrated growth factor treatment", "QR678 is another growth-factor option"])}</div><div class="cp-meta"><div><a href="/hair-prp/" style="text-decoration:underline">PRP for hair</a></div><div><a href="/gfc-hair-treatment/" style="text-decoration:underline">GFC hair treatment</a></div><div><a href="/qr678-hair-growth/" style="text-decoration:underline">QR678</a></div></div></div>` },
 ])}`),

  shell("plans", `${head("Packages", "Exosome Hair Treatment Packages at Facelit", "Start with one session, save with a package, or combine exosomes with PRP or GFC.")}
 ${k.menu([["all", "All"], ["fall", "Hair fall"], ["thin", "Thinning"], ["pattern", "Pattern hair loss"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Exosome Hair Treatment Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [B + "566-4.-Man-Examining-Hair.webp", "Indian man checking his hairline before treatment", 1080, 1080], lead: "A proper diagnosis comes first.",
     items: ["Your doctor examines your scalp and hair pattern and takes progress photos.", "Blood tests may be suggested to check iron, vitamins, thyroid or hormones.", "Avoid blood thinners and anti-inflammatory painkillers for a few days, if your doctor agrees.", "Eat a light meal and drink plenty of water.", "Come with a clean, dry scalp, with no oils, gels or sprays."] },
   { tab: "02 · During", img: [B + "251-7193.webp", "Scalp microneedling with a Dermapen during exosome hair treatment", 1080, 1080], lead: "A session takes 45 to 60 minutes.",
     items: ["Your scalp is cleaned and disinfected.", "Numbing cream may be applied for comfort.", "The Dermapen makes tiny channels across the thinning areas.", "The exosome solution is applied and massaged in.", "You may feel mild prickling, but most people find it easy."] },
   { tab: "03 · After", img: [B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man after hair treatment", 1080, 1080], lead: "You can go straight back to your day. The full aftercare plan is below.",
     items: ["Mild redness or tenderness for a day or two.", "Don't wash your hair for 24 hours.", "Avoid gym, swimming and direct sun on the scalp for 48 hours.", "Skip hair colour, straightening and harsh styling for a week.", "Book your next session in 3 to 4 weeks."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "Exosome Hair Treatment Results Timeline", "Hair grows slowly, so results build over months. Here's what most people notice.")}
 ${k.timeline([["Weeks 2–8", "Less hair fall", "Fewer hairs in the shower, on your pillow and in your comb."], ["Months 2–3", "Baby hairs", "Short new hairs appear along the hairline and parting."], ["Months 4–6", "Thicker hair", "Strands are stronger and hair looks fuller, with less scalp showing."], ["After the course", "Maintain", "A session every 3 to 6 months and home care keep results going."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(A + "hair-before-scaled-1.webp", "Thinning parting on an Indian man before exosome hair treatment", 1920, 2560)}<figcaption>Before</figcaption></figure>
 <figure>${img(A + "hair-after-scaled-1.webp", "Fuller parting on an Indian man after a course of hair treatment", 1920, 2560)}<figcaption>After a course</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary with the cause and stage of hair loss.</p>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have more hair fall than usual", "Notice early thinning or a wider part", "Have a receding hairline that's still covered", "Want a treatment with no blood draw"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Have fully bald, shiny areas", "Have an active scalp infection", "Are pregnant or breastfeeding", "Expect results in a few weeks"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "Hair Treatment Aftercare", "A few simple steps help the exosomes work and protect your scalp.")}${tabs("aftercare", [
   { tab: "First 24 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Leave your scalp alone so exosomes absorb", "Sleep on a clean pillowcase", "Drink plenty of water", "Wear a loose cap if you go out in the sun"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Washing your hair", "Oils, gels, sprays or serums", "Touching or scratching the scalp", "Helmets and tight caps if you can"], warn)}</div></div>` },
   { tab: "Days 2–7", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Wash with a mild shampoo and lukewarm water", "Pat hair dry gently", "Restart prescribed home treatment when advised", "Eat protein-rich meals"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Gym, swimming and saunas for 48 hours", "Hair colour, bleach or straightening for a week", "Very hot hair dryers and tight hairstyles", "Hair oil massages for 3 days"], warn)}</div></div>` },
   { tab: "Everyday hair care", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Healthy habits</h3>${list(["Protein, iron and vitamin-rich food", "7 to 8 hours of sleep", "Manage stress", "Gentle, wide-tooth combing"])}</div><div class="cp-card"><h3 class="font-serif">Keep up</h3>${list(["Prescribed home treatment", "Scalp-friendly shampoo", "Progress check every few months", "Maintenance sessions"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "Hair Loss Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"Oiling every day stops hair fall.\"", "Oiling can soften hair and scalp, but it doesn't fix the hormonal, nutritional or genetic causes of hair loss. Too much oil can even worsen dandruff."],
   ["\"Hair loss only happens to older men.\"", "Many people start thinning in their 20s, and women experience hair loss too, often linked to hormones, iron or thyroid."],
   ["\"Cutting hair makes it grow thicker.\"", "Trimming removes split ends but doesn't change how many hairs grow from your scalp or how thick they are."],
   ["\"Once it's gone, nothing can help.\"", "Weak, thinning hair can often be revived. Only fully bald areas, where follicles are gone, usually need a hair transplant."],
   ["\"Treatments work in a few weeks.\"", "Hair grows about 1 cm a month. Real changes take 3 to 6 months, so consistency matters."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "Exosomes vs PRP, GFC and QR678 for Hair", "Four popular non-surgical hair treatments, side by side.")}
 ${k.compareTable(["Exosomes", '<a href="/hair-prp/">PRP</a>', '<a href="/gfc-hair-treatment/">GFC</a>', '<a href="/qr678-hair-growth/">QR678</a>'], [
   ["What it is", "Lab-made cell messengers with growth signals", "Growth factors from your own blood", "Concentrated growth factors from your own blood", "Ready-made growth factor formula"],
   ["Blood draw", "No", "Yes", "Yes", "No"],
   ["Best for", "Hair fall, thinning, weak follicles", "Hair fall, early thinning", "Pattern thinning, crown", "Hair fall, thinning"],
   ["Downtime", "0–1 day", "0–1 day", "0–1 day", "0–1 day"],
   ["Typical sessions", "4–6", "4–6", "3–6", "6–8"],
   ["Can be combined", "Yes", "Yes", "Yes", "Yes"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Exosome Hair Treatment?</h2>
 ${img(B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man with thick hair", 1080, 1080, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Doctor-led diagnosis", "We find the cause of your hair loss first, with a scalp exam and the right blood tests, instead of selling the same package to everyone."],
   ["Honest advice", "If exosomes won't help, for example on fully bald areas, we'll tell you and explain your real options."],
   ["Quality products, precise delivery", "Professional exosome products delivered with Dermapen microneedling for even, controlled treatment."],
   ["All hair treatments under one roof", "Exosomes, PRP, GFC, QR678 and scalp treatments, so your plan can change as your hair improves."],
   ["Progress you can see", "Photos at every visit, so you can track your results month by month."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Side Effects and Who Should Wait", "Exosome hair treatment is well tolerated. Here's what's normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Mild redness or tenderness for a day or two", "Tiny pinpoint marks on the scalp", "Slight itching as the scalp heals", "A brief increase in shedding as new hairs push out old ones (uncommon)"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant or breastfeeding", "Have a scalp infection, open wound or active psoriasis", "Have a history of cancer", "Have an autoimmune condition or take immune-suppressing medicines", "Have a bleeding disorder or take blood thinners"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "Exosome Hair Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "Exosome Hair Treatment at Facelit", "")}
 ${k.links([["/exosomes-hair-treatment-in-trivandrum/", "Location", "Exosome hair treatment in Trivandrum"], ["/exosome-hair-treatment-in-karunagappally/", "Location", "Exosome hair treatment in Karunagappally"], ["/hair-prp/", "Treatment", "PRP for hair"], ["/gfc-hair-treatment/", "Treatment", "GFC hair treatment"], ["/gfc-vs-prp-hair-treatment-which-one-should-you-choose/", "Guide", "GFC vs PRP"], ["/exosomes-skin-treatment/", "Treatment", "Exosome skin treatment"]])}`),

  k.cta("Not sure what's causing your hair loss?", "Book a consultation. Our doctors will examine your scalp, find the cause and build a hair plan that fits you."),
];

k.writePage(process.argv[2], sections, {
  title: "Exosome Hair Treatment in Kerala for Hair Fall & Thinning | Facelit",
  desc: "Doctor-led exosome hair treatment in Trivandrum, Kollam & Thrissur. Slows hair fall, revives weak follicles and thickens thinning hair. No blood draw, little downtime.",
  image: "https://facelit.in/wp-content/uploads/2026/08/hair-treatments-hero.webp",
  faqs,
  procedure: { name: "Exosome Hair Treatment", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Scalp",
    howPerformed: "After cleansing and optional numbing, Dermapen microneedling creates micro-channels in the scalp and an exosome solution is applied to reach the hair follicles.",
    preparation: "Doctor consultation and scalp exam, blood tests if needed, a clean scalp, and avoiding blood thinners if advised.",
    followup: "No hair wash for 24 hours, avoid exercise, swimming and sun for 48 hours, and no colouring or chemical styling for a week. Repeat every 3 to 4 weeks." },
  crumbs: [["Home", "https://facelit.in/"], ["Hair Treatments", "https://facelit.in/best-hair-treatments/"], ["Exosome Hair Treatment", "https://facelit.in/exosomes-hair-treatments/"]],
});
