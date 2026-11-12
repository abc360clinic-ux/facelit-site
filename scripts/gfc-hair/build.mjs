// Builds the redesigned /gfc-hair-treatment/ page.
// Usage (from facelit-site/): node scripts/gfc-hair/build.mjs content/pages/gfc-hair-treatment.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const HERO = [B + "248-Untitled-design-18.webp", "Doctor giving GFC injections into a dark-haired woman's thinning parting at Facelit"];
const INJECT = [B + "416-Best-GFC-Hair-Treatment-in-Karunagappally.webp", "GFC being injected into a thinning hairline", 1080, 1080];
const SPIN = [B + "567-PRP-Blood-Centrifuge-Process.webp", "Blood sample in a centrifuge being processed into growth factor concentrate", 1080, 1080];
const CROWN = [B + "563-hair-thinning-e1757654914322.webp", "Thinning crown on dark hair", 1080, 1012];

const benefits = [
  ["shield", "Less Hair Fall", "Strengthens weak roots so you see fewer hairs on your pillow, comb and bathroom floor."],
  ["lift", "Regrowth in Thin Areas", "Wakes up resting follicles along the hairline, parting and crown."],
  ["layers", "Thicker Strands", "Thin, wispy hairs grow back with more body, so hair looks fuller."],
  ["drop", "From Your Own Blood", "Made from a small sample of your blood, so there's no risk of allergy to a foreign product."],
  ["cell", "Concentrated &amp; Cell-Free", "Growth factors are released and collected before injection, without the platelets and cells that PRP carries."],
  ["heal", "Less Soreness Than PRP", "With no cells to trigger swelling, most people find GFC more comfortable afterwards."],
  ["clock", "Fewer Sessions", "Because it's more concentrated, many people need fewer sessions than with PRP."],
  ["leaf", "No Surgery, No Downtime", "Walk out and get back to work the same day."],
];

const finderResults = [
  { v: "fall", label: "Too much hair fall", img: [A + "hair-before-scaled-1.webp", "Thinning parting on an Indian man from heavy hair fall", 1920, 2560], title: "Hair Fall Control Plan",
    text: "GFC strengthens roots and calms the scalp, so heavy daily shedding usually slows within the first 1 to 2 sessions.",
    no: "Start with blood tests for iron, thyroid and vitamin D, then 3 to 4 GFC sessions a month apart.", yes: "If PRP didn't do enough, GFC is the natural next step. Its growth factors are more concentrated, so we often see a better response.",
    sessions: "3–4, every 4 weeks", combine: "Blood tests, nutrition" },
  { v: "male", label: "Receding hairline (men)", img: [B + "196-5-1.webp", "Receding hairline and thinning temples on dark hair", 1080, 1080], title: "Hairline Rebuild Plan",
    text: "Male pattern hair loss is genetic and hormone-driven. GFC keeps thinning follicles alive and thickens the hair you still have, especially alongside prescribed medication.",
    no: "4 to 6 GFC sessions with doctor-prescribed home treatment.", yes: "Switch to GFC, or alternate GFC with exosomes for a stronger boost.",
    sessions: "4–6, then maintenance", combine: "Minoxidil, finasteride (if prescribed), exosomes" },
  { v: "female", label: "Widening part (women)", img: [B + "298-Hair-Loss-women.webp", "Widening hair part on a woman with dark hair", 1080, 1080], title: "Fuller Part Plan",
    text: "In women, thinning usually shows as a wider part and flatter crown. GFC thickens existing strands and helps new growth along the part.",
    no: "GFC sessions plus checks for iron, thyroid, PCOS and hormones.", yes: "GFC with a doctor-led home routine, and exosomes added if needed.",
    sessions: "4–6, every 4 weeks", combine: "Blood tests, prescribed topicals" },
  { v: "crown", label: "Thin crown", img: CROWN, title: "Crown Density Plan",
    text: "The crown thins quietly, and most people only notice it in photos. GFC targets the thin patch to improve density and coverage.",
    no: "4 GFC sessions focused on the crown.", yes: "A GFC course alternated with exosomes or QR678 for stubborn crowns.",
    sessions: "4–6, every 4 weeks", combine: "Exosomes, QR678" },
  { v: "postpartum", label: "After pregnancy or illness", img: [A + "hair-treatments-hero.webp", "Indian woman with long, healthy hair", 2159, 1440], title: "Recovery Regrowth Plan",
    text: "Sudden shedding after childbirth, fever, COVID, surgery or crash diets usually recovers, and GFC can help it recover faster and fuller.",
    no: "2 to 3 GFC sessions, plus nutrition support.", yes: "2 to 3 GFC sessions, plus tests to find any ongoing cause.",
    sessions: "2–3, every 4 weeks", combine: "Nutrition, blood tests" },
  { v: "transplant", label: "Planning or had a transplant", img: INJECT, title: "Transplant Support Plan",
    text: "GFC is often used before and after a hair transplant to help grafts settle and to protect the native hair around them.",
    no: "GFC sessions before surgery to strengthen surrounding hair.", yes: "GFC sessions after surgery, once your surgeon agrees, to support graft growth.",
    sessions: "2–4, as advised", combine: "Your transplant surgeon's plan" },
];

const concerns = [
  { tab: "Excessive hair fall", img: [A + "hair-before-scaled-1.webp", "Thinning parting from excessive hair fall on an Indian man", 1920, 2560], title: "Excessive hair fall",
    text: "Losing up to 100 hairs a day is normal. Clumps in the shower, a thinner ponytail or hair all over your pillow means too many follicles have slipped into the resting phase. GFC sends strong growth signals that push them back into growing.",
    more: ["Shedding slows, often after 1 to 2 sessions", "Stronger, better-anchored roots", "Works best once the cause is found"], rec: ["Blood tests", "Nutrition"], sessions: "3–4, every 4 weeks",
    link: ["/hair-loss-symptoms-causes-treatments/", "Hair loss causes and treatments"] },
  { tab: "Male pattern baldness", img: [B + "196-5-1.webp", "Receding hairline on dark hair", 1080, 1080], title: "Male pattern baldness (androgenetic alopecia)",
    text: "A receding hairline, thinning temples or a thin crown in men is caused by DHT, a hormone that slowly shrinks follicles. GFC strengthens shrinking follicles and thickens the hair that's left. Prescribed medication protects them from DHT.",
    more: ["Holds and thickens the hairline", "Thicker hair at the temples and crown", "Best results when started early"], rec: ["Prescribed medication", "Exosomes"], sessions: "4–6, then maintenance",
    link: ["/mens-hair-loss-treatments-and-solutions/", "Men's hair loss solutions"] },
  { tab: "Female pattern hair loss", img: [B + "298-Hair-Loss-women.webp", "Widening part on a woman with dark hair", 1080, 1080], title: "Female pattern hair loss",
    text: "Women rarely go bald. Instead, the part widens and the top looks flat. It's often linked to hormones, PCOS, thyroid problems or low iron. We test for these and use GFC to rebuild density.",
    more: ["Narrower-looking part", "More volume on top", "Root causes checked and treated"], rec: ["Blood tests", "Prescribed topicals"], sessions: "4–6, every 4 weeks",
    link: ["/hair-treatment-in-trivandrum/", "Hair treatment in Trivandrum"] },
  { tab: "Thinning crown", img: CROWN, title: "Thinning crown",
    text: "The crown is one of the first places to thin and the hardest to see yourself. GFC injections spread across the thin patch improve coverage, so less scalp shows under light.",
    more: ["Better crown coverage", "Thicker strands", "Easy to track with photos"], rec: ["Exosomes", "QR678"], sessions: "4–6, every 4 weeks" },
  { tab: "Weak, thin hair", img: [B + "566-4.-Man-Examining-Hair.webp", "Indian man checking his hairline in the mirror", 1080, 1080], title: "Weak, thin hair",
    text: "Your hair isn't falling in clumps, but your ponytail is thinner or styling doesn't hold like before. This is the best time to act, because every follicle you save now is one you won't need to regrow later.",
    more: ["Stronger, thicker strands", "Saves follicles early", "Fewer sessions needed"], rec: ["Nutrition", "Scalp care"], sessions: "3–4, every 4 weeks" },
  { tab: "Alopecia areata", img: [B + "202-GFC-Hair-treatment-0.webp", "Close-up of a woman's scalp and hair part", 1080, 1080], title: "Alopecia areata (patchy hair loss)",
    text: "Round, smooth bald patches are usually alopecia areata, an immune condition. It needs a doctor's diagnosis and medical treatment first. GFC can be added to support regrowth in suitable cases.",
    more: ["Doctor diagnosis first", "Medical treatment as the base", "GFC as support"], rec: ["Doctor-led treatment"], recLabel: "Important", sessions: "Planned by your doctor" },
  { tab: "PRP didn't work", img: SPIN, title: "Tried PRP and didn't see enough?",
    text: "PRP results vary because the number of platelets in your blood varies. GFC uses special tubes to release and concentrate the growth factors before injection, so each session delivers a stronger, more consistent dose.",
    more: ["More concentrated than PRP", "Less swelling and soreness", "Often fewer sessions"], rec: ["GFC course", "Exosomes"], sessions: "3–6, every 4 weeks",
    link: ["/gfc-vs-prp-hair-treatment-which-one-should-you-choose/", "GFC vs PRP: which to choose"] },
];

const stages = [
  ["Early thinning", 1, "More hair fall, a slightly wider part or a softer hairline. The best time to start GFC.", "hair fall, early thinning", "none", "3–4, every 4 weeks"],
  ["Moderate thinning", 2, "Scalp visible through the hair, thin crown or temples. Still very treatable with GFC.", "pattern thinning, crown", "none", "4–6, plus maintenance"],
  ["Advanced / bald areas", 3, "Smooth, shiny areas where follicles have stopped. GFC can't regrow these, but it can protect the hair around them.", "support, before or after transplant", "none", "we'll discuss transplant options honestly"],
];

const growthFactors = [
  ["PDGF (platelet-derived growth factor)", "Helps follicle cells multiply and keeps hair in the growing phase for longer."],
  ["VEGF (vascular endothelial growth factor)", "Builds tiny new blood vessels around follicles, so roots get more oxygen and nutrients."],
  ["EGF (epidermal growth factor)", "Supports the skin cells around the follicle and helps the scalp repair."],
  ["IGF-1 (insulin-like growth factor)", "Encourages hair to grow longer and thicker and delays the shedding phase."],
  ["FGF (fibroblast growth factor)", "Helps wake up resting follicles and start new growth."],
  ["TGF-β (transforming growth factor beta)", "Supports tissue repair and helps balance the hair growth cycle."],
];

const menuRows = [
  ["Single GFC Session", "Starter", "fall", "Reduce hair fall and boost natural hair growth with one GFC session.", ["Hair fall", "Starter"], "Blood draw, GFC preparation and scalp injections in one visit.", "None", "1"],
  ["5-Session GFC Package", "Popular", "fall thin pattern", "Get thick, strong, voluminous hair with a full course of five sessions.", ["Best value", "Popular"], "Five sessions about a month apart, with progress photos at each visit.", "None", "5"],
  ["GFC + Exosomes Plan", "Combo", "pattern thin", "Alternate GFC with exosomes for pattern hair loss and stubborn crowns.", ["Exosomes", "Combo"], "GFC and exosome sessions alternated across the course.", "0–1 day", "4–6"],
  ["Women's Hair Thinning Programme", "Programme", "thin", "GFC plus root-cause checks (iron, thyroid, hormones) and a home routine for women.", ["Women", "Root cause"], "Doctor-led plan combining tests, GFC and topicals.", "None", "5"],
  ["Hair Transplant Support", "Support", "pattern", "GFC sessions before or after a hair transplant to support grafts and native hair.", ["Transplant"], "Timed around your surgery with your surgeon's agreement.", "None", "2–4"],
  ["Maintenance Session", "Maintain", "fall thin pattern", "Keep your results going after your course is complete.", ["Maintenance"], "One GFC session every 3 to 6 months.", "None", "1"],
];

const faqs = [
  ["What is GFC hair treatment?", "GFC stands for Growth Factor Concentrate. A small amount of your blood is processed in special tubes that make platelets release their growth factors. These growth factors are collected and injected into the thinning areas of your scalp to strengthen follicles and boost hair growth."],
  ["How is GFC different from PRP?", "PRP injects platelets, which release growth factors slowly inside the scalp. GFC releases the growth factors first and injects only the concentrated, cell-free liquid. That means a stronger, more consistent dose and usually less swelling and soreness."],
  ["Is GFC better than PRP?", "For many people, yes. GFC is more concentrated and often needs fewer sessions. PRP is still a good option for early hair fall and costs less. Your doctor will suggest the best one after examining your scalp."],
  ["Is GFC hair treatment painful?", "You'll feel small pricks from the fine needle. We can apply numbing cream first. Most people find it easier than PRP because there's less swelling afterwards."],
  ["How many GFC sessions will I need?", "Most people need 4 to 6 sessions about 4 weeks apart, then a maintenance session every 3 to 6 months. Early hair fall may settle with 3 to 4 sessions."],
  ["When will I see results from GFC?", "Hair fall usually slows within 4 to 8 weeks. Baby hairs often appear by 3 months, and thicker, fuller hair shows around 4 to 6 months."],
  ["Is GFC safe?", "Yes. It's made from your own blood, so there's no risk of allergy or rejection. The blood is processed in sterile, single-use tubes. Mild redness or tenderness for a few hours is the most common side effect."],
  ["Can GFC regrow hair on a bald patch?", "GFC works on follicles that are still alive, even if they're weak. Smooth, shiny bald areas where follicles have gone usually can't regrow with any injection. We'll tell you honestly and discuss options like hair transplant."],
  ["Does GFC work for women?", "Yes. GFC works well for female pattern thinning, postpartum shedding and stress-related hair fall. We also check iron, thyroid and hormones so the root cause is treated."],
  ["Are GFC results permanent?", "Results last as long as the cause is managed. Pattern hair loss continues over time, so most people keep their results with maintenance sessions and home care."],
  ["Can I take GFC after a hair transplant?", "Yes. GFC is often used before and after a transplant to support grafts and protect surrounding hair. Your doctor will time it with your surgeon."],
  ["When can I wash my hair after GFC?", "Wait at least 24 hours, then use a mild shampoo and lukewarm water."],
  ["Where can I get GFC hair treatment in Kerala?", "Facelit offers GFC hair treatment in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does GFC hair treatment cost?", "It depends on the area being treated and the number of sessions. The 5-session package works out to better value per session. Book a consultation for a personalised quote."],
];

const sections = [
  k.hero({
    tags: ["Hair", "Your own growth factors", "Doctor-led"], h1: "GFC Hair Treatment",
    img: HERO, pos: "50% 30%",
    intro: "Hair fall that won't stop, a widening part or a thinning crown? GFC (Growth Factor Concentrate) takes the growth factors from a small sample of your own blood and puts them right where your hair is thinning. It's more concentrated than PRP, needs no surgery, and you can go back to work the same day.",
    facts: [["45–60 min", "Per session"], ["None", "Downtime"], ["4–6", "Sessions typical"], ["3 months", "Visible regrowth"]],
    cta2: ["#finder", "Find your hair plan"],
  }),
  k.jump([["overview", "Overview"], ["how", "How it's made"], ["finder", "Find your plan"], ["concerns", "Concerns"], ["vs-prp", "GFC vs PRP"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is GFC (Growth Factor Concentrate)?</h2>
 <div class="cp-prose">
 <p>Your blood carries platelets, and platelets are full of growth factors: natural proteins your body uses to repair and build tissue. Hair follicles respond to these same signals.</p>
 <p>In GFC treatment, we draw a small amount of your blood and process it in special GFC tubes. The tubes make the platelets release their growth factors, which are then separated into a clear, concentrated liquid. This is injected into the thinning areas of your scalp to wake up weak follicles, slow hair fall and grow thicker hair.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why thin hair needs growth factors ${k.plus}</summary>
 <div class="cp-prose">
 <p>Every hair grows, rests and sheds in a cycle. Healthy hair spends years in the growing phase. When hormones, stress, illness, poor nutrition or genetics get in the way, follicles shrink, their growing phase gets shorter and each new hair comes in thinner.</p>
 <p>Growth factors help reverse that. They improve blood supply to the root, help follicle cells multiply and keep hair in the growing phase for longer. Read more about <a href="/hair-loss-symptoms-causes-treatments/">the causes of hair loss</a>.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How GFC works on hair">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Concentrate</b><span>Growth factors are released from your platelets and collected.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Inject</b><span>Fine injections place them at the roots of thinning hair.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Regrow</b><span>Follicles strengthen and grow thicker hair over the next few months.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...SPIN)}
 ${img(...INJECT)}
 </div>
 </div>`),

  shell("how", `${head("From your blood to your scalp", "How GFC Is Made, Step by Step", "The whole process happens in the clinic, in one visit, in about an hour.")}
 ${k.benefitsGrid([
   ["drop", "1. A small blood draw", "About 20 to 30 ml of blood is taken from your arm, just like a routine blood test."],
   ["layers", "2. Special GFC tubes", "The blood goes into sterile GFC tubes that make your platelets release their growth factors."],
   ["wave", "3. Spin and separate", "A centrifuge separates the growth-factor-rich liquid from the red cells and platelets."],
   ["spark", "4. Inject where it's thin", "The concentrate is injected with a very fine needle across the thinning areas of your scalp."],
 ])}`),

  shell("finder", `${head("Find your plan", "Which GFC Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan after examining your scalp.")}
 ${k.finder({ q1: "What's worrying you most?", q2: { label: "Have you tried PRP before?", dt: "Our suggestion", options: [["no", "No, this is my first treatment"], ["yes", "Yes, but I wanted better results"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of GFC Hair Treatment", "Your own growth factors, in a stronger and cleaner form.")}${k.benefitsGrid(benefits)}`),

  shell("concerns", `${head("Is it right for you?", "Hair Problems GFC Can Help With", "Tap a concern to see how GFC helps, what we pair it with and how many sessions you may need.")}
 ${k.concernTabs("concerns", concerns)}`),

  shell("", `${head("Be honest with yourself", "What Stage Is Your Hair Loss?", "GFC works on follicles that are still alive. The earlier you start, the more hair you keep.")}${k.depthCards(stages)}`),

  shell("vs-prp", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("GFC vs PRP", "How Is GFC Different from PRP?", "Both use your own blood. The difference is what goes into your scalp.")}
 ${tabs("vsprp", [
   { tab: "PRP", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">PRP (platelet-rich plasma) injects concentrated platelets into the scalp, where they slowly release growth factors.</p>${list(["Contains platelets and some white and red cells", "Growth factor dose depends on your platelet count", "Can cause more swelling and soreness", "Usually 4 to 6 sessions, sometimes more"])}</div><div class="cp-meta"><div><b>Good for:</b> early hair fall, budget-friendly start</div><div><a href="/hair-prp/" style="text-decoration:underline">About PRP for hair</a></div></div></div>` },
   { tab: "GFC", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">GFC releases the growth factors first, then injects only the concentrated, cell-free liquid.</p>${list(["Pure growth factors, without platelets or cells", "More consistent strength from session to session", "Less swelling, more comfortable recovery", "Often fewer sessions for similar results"])}</div><div class="cp-meta"><div><b>Good for:</b> pattern thinning, crowns, when PRP wasn't enough</div></div></div>` },
 ])}
 </div>
 <div class="cp-split-sep">${head("What's inside", "The Growth Factors in GFC", "Tap each one to see what it does for your hair.")}<div class="cp-faq cp-faq--compact">${accordion(growthFactors)}</div></div>
 </div>`),

  shell("plan", `${head("Your complete hair plan", "GFC Works Best as Part of a Plan", "Hair loss rarely has a single cause, so our doctors look at the full picture, not just the scalp.")}
 ${tabs("hairplan", [
   { tab: "1 · Find the cause", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Before treating, we find out why your hair is falling. Your doctor examines your scalp and may suggest simple blood tests.</p>${list(["Haemoglobin, iron and ferritin", "Vitamin D and B12", "Thyroid function", "Hormones and PCOS checks for women"])}</div><div class="cp-meta"><div><b>Why it matters:</b> fixing the cause makes GFC work better</div></div></div>` },
   { tab: "2 · GFC sessions", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Your GFC course delivers concentrated growth factors straight to the roots.</p>${list(["4 to 6 sessions, about 4 weeks apart", "Progress photos at every visit", "Maintenance every 3 to 6 months"])}</div><div class="cp-meta"><div><b>Time:</b> 45–60 min per session</div><div><b>Downtime:</b> none</div></div></div>` },
   { tab: "3 · Home care", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">What you do between sessions matters. Your doctor may prescribe treatment to use at home.</p>${list(["Topical or oral medication if suitable", "A gentle, scalp-friendly shampoo", "Supplements only where tests show a need"])}</div><div class="cp-meta"><div><b>Tip:</b> never start or stop hair medicines without your doctor</div></div></div>` },
   { tab: "4 · Boost if needed", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">For stubborn pattern hair loss, GFC can be alternated with other regenerative treatments.</p>${list(["Exosomes: ready-made growth signals, no blood draw", "QR678: a growth-factor formula for hair", "Hair transplant for areas that are fully bald"])}</div><div class="cp-meta"><div><a href="/exosomes-hair-treatments/" style="text-decoration:underline">Exosome hair treatment</a></div><div><a href="/qr678-hair-growth/" style="text-decoration:underline">QR678</a></div></div></div>` },
 ])}`),

  shell("plans", `${head("Packages", "GFC Hair Treatment Packages at Facelit", "Start with one session, save with a full course, or combine GFC with exosomes.")}
 ${k.menu([["all", "All"], ["fall", "Hair fall"], ["thin", "Thinning"], ["pattern", "Pattern hair loss"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">GFC Hair Treatment Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [B + "566-4.-Man-Examining-Hair.webp", "Indian man checking his hairline before GFC treatment", 1080, 1080], lead: "A proper diagnosis comes first.",
     items: ["Your doctor examines your scalp and hair pattern and takes progress photos.", "Blood tests may be suggested to check iron, vitamins, thyroid or hormones.", "Avoid aspirin, ibuprofen and other anti-inflammatory painkillers for a week, if your doctor agrees.", "Skip smoking and alcohol for a few days before.", "Eat a proper meal, drink plenty of water and come with a clean, dry scalp."] },
   { tab: "02 · During", img: INJECT, lead: "A session takes 45 to 60 minutes, including preparation.",
     items: ["About 20 to 30 ml of blood is drawn from your arm.", "It's processed in GFC tubes and a centrifuge to release and collect the growth factors.", "Your scalp is cleaned, and numbing cream applied if you'd like.", "The concentrate is injected across the thinning areas with a very fine needle.", "You'll feel small pricks, but most people find it easy."] },
   { tab: "03 · After", img: [B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man after GFC hair treatment", 1080, 1080], lead: "You can go straight back to your day. The full aftercare plan is below.",
     items: ["Mild redness or tenderness for a few hours.", "Don't wash your hair for 24 hours.", "Avoid gym, swimming and strong sun on the scalp for 48 hours.", "Skip hair colour and chemical treatments for a week.", "Book your next session in about 4 weeks."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "GFC Hair Treatment Results Timeline", "Hair grows about 1 cm a month, so results build over months. Here's what most people notice.")}
 ${k.timeline([["Weeks 4–8", "Less hair fall", "Fewer hairs in the shower, on your pillow and in your comb."], ["Month 3", "Baby hairs", "Short new hairs appear along the hairline, parting and crown."], ["Months 4–6", "Thicker hair", "Stronger strands and fuller-looking hair, with less scalp showing."], ["After the course", "Maintain", "A session every 3 to 6 months keeps results going."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(A + "hair-before-scaled-1.webp", "Thinning parting on an Indian man before GFC hair treatment", 1920, 2560)}<figcaption>Before</figcaption></figure>
 <figure>${img(A + "hair-after-scaled-1.webp", "Fuller parting on an Indian man after a course of hair treatment", 1920, 2560)}<figcaption>After a course</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary with the cause and stage of hair loss.</p>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have more hair fall than usual", "Notice thinning, a wider part or a thin crown", "Tried PRP and want stronger results", "Want a natural treatment with no downtime"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Have fully bald, shiny areas", "Have a blood or platelet disorder", "Have an active scalp infection", "Expect results in a few weeks"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "GFC Aftercare", "A few simple steps help the growth factors work and protect your scalp.")}${tabs("aftercare", [
   { tab: "First 24 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Leave your scalp alone", "Sleep on a clean pillowcase", "Drink plenty of water", "Wear a loose cap in strong sun"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Washing your hair", "Oils, gels, sprays or serums", "Touching or scratching the scalp", "Painkillers like ibuprofen, unless your doctor says so"], warn)}</div></div>` },
   { tab: "Days 2–7", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Wash with a mild shampoo and lukewarm water", "Pat hair dry gently", "Restart prescribed home treatment when advised", "Eat protein-rich meals"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Gym, swimming and saunas for 48 hours", "Hair colour, bleach or straightening for a week", "Smoking and alcohol for a few days", "Hair oil massages for 3 days"], warn)}</div></div>` },
   { tab: "Everyday hair care", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Healthy habits</h3>${list(["Protein, iron and vitamin-rich food", "7 to 8 hours of sleep", "Manage stress", "Gentle, wide-tooth combing"])}</div><div class="cp-card"><h3 class="font-serif">Keep up</h3>${list(["Prescribed home treatment", "Scalp-friendly shampoo", "Progress check every few months", "Maintenance sessions"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "GFC Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"GFC is just another name for PRP.\"", "Both start with your blood, but PRP injects platelets while GFC injects the growth factors already released from them. GFC is more concentrated and cell-free."],
   ["\"One session is enough.\"", "Hair grows in cycles, so follicles need repeated signals. Most people need 4 to 6 sessions for lasting change."],
   ["\"GFC can regrow a completely bald head.\"", "GFC revives weak follicles that are still alive. Fully bald, shiny areas usually need a hair transplant."],
   ["\"Using your own blood is risky.\"", "It's your own blood, processed in sterile, single-use tubes, so there's no risk of allergy or rejection."],
   ["\"Once treated, hair loss never comes back.\"", "Pattern hair loss is ongoing. Maintenance sessions and home care keep your results going."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "GFC vs PRP, Exosomes and QR678", "Four popular non-surgical hair treatments, side by side.")}
 ${k.compareTable(["GFC", '<a href="/hair-prp/">PRP</a>', '<a href="/exosomes-hair-treatments/">Exosomes</a>', '<a href="/qr678-hair-growth/">QR678</a>'], [
   ["What it is", "Concentrated growth factors from your own blood", "Platelets from your own blood", "Lab-made cell messengers with growth signals", "Ready-made growth factor formula"],
   ["Blood draw", "Yes", "Yes", "No", "No"],
   ["Contains cells", "No, cell-free", "Yes, platelets", "No", "No"],
   ["Best for", "Pattern thinning, crown, after PRP", "Early hair fall", "Hair fall, weak follicles", "Hair fall, thinning"],
   ["Soreness after", "Mild", "Mild to moderate", "Mild", "Mild"],
   ["Typical sessions", "4–6", "4–6+", "4–6", "6–8"],
   ["Downtime", "None", "None to 1 day", "0–1 day", "None"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for GFC Hair Treatment?</h2>
 ${img(B + "568-Smiling-Man-with-Thick-Hair-Post-Treatment.webp", "Smiling Indian man with thick hair", 1080, 1080, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Doctor-led diagnosis", "Our dermatologists find the cause of your hair loss first, with a scalp exam and the right blood tests, instead of selling the same package to everyone."],
   ["Sterile, single-use GFC kits", "Your blood is processed in the clinic in sealed, single-use tubes, and injected the same visit."],
   ["Honest advice", "If GFC won't help, for example on fully bald areas, we'll tell you and explain your real options."],
   ["Every hair treatment under one roof", "GFC, PRP, exosomes, QR678 and scalp treatments, so your plan can change as your hair improves."],
   ["Progress you can see", "Photos at every visit, so you can track your results month by month."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Side Effects and Who Should Wait", "GFC is made from your own blood and is very well tolerated. Here's what's normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Mild redness or tenderness for a few hours", "Slight swelling at injection points", "A small bruise where blood was drawn", "Mild itching as the scalp settles"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Have a blood, platelet or clotting disorder", "Take blood thinners", "Are pregnant or breastfeeding", "Have a scalp infection or open wound", "Have cancer, or are on chemotherapy"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "GFC Hair Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "GFC Hair Treatment at Facelit", "")}
 ${k.links([["/best-clinic-for-gfc-in-trivandrum/", "Location", "GFC hair treatment in Trivandrum"], ["/best-gfc-hair-treatment-in-karunagappally/", "Location", "GFC hair treatment in Karunagappally"], ["/cost-of-gfc-hair-treatment-in-trivandrum/", "Cost", "GFC cost in Trivandrum"], ["/gfc-vs-prp-hair-treatment-which-one-should-you-choose/", "Guide", "GFC vs PRP: which to choose"], ["/hair-prp/", "Treatment", "PRP for hair"], ["/exosomes-hair-treatments/", "Treatment", "Exosome hair treatment"]])}`),

  k.cta("Not sure if GFC is right for you?", "Book a consultation. Our doctors will examine your scalp, find the cause of your hair loss and tell you honestly which treatment will work best."),
];

k.writePage(process.argv[2], sections, {
  title: "GFC Hair Treatment in Kerala for Hair Loss & Regrowth | Facelit",
  desc: "Doctor-led GFC hair treatment in Trivandrum, Kollam & Thrissur. Concentrated growth factors from your own blood to slow hair fall and regrow thinning hair. More concentrated than PRP, no downtime.",
  image: "https://facelit.in/wp-content/uploads/2026/07/248-Untitled-design-18.webp",
  faqs,
  procedure: { name: "GFC (Growth Factor Concentrate) Hair Treatment", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Scalp",
    howPerformed: "A small blood sample is processed in GFC tubes and a centrifuge to release and concentrate platelet growth factors, which are then injected into thinning areas of the scalp with a fine needle.",
    preparation: "Doctor consultation and scalp exam, blood tests if needed, avoiding anti-inflammatory painkillers, smoking and alcohol beforehand, and coming with a clean scalp.",
    followup: "No hair wash for 24 hours, avoid exercise, swimming and sun for 48 hours, and no colouring or chemical treatments for a week. Repeat about every 4 weeks." },
  crumbs: [["Home", "https://facelit.in/"], ["Hair Treatments", "https://facelit.in/best-hair-treatments/"], ["GFC Hair Treatment", "https://facelit.in/gfc-hair-treatment/"]],
});
