// Builds the redesigned /hydrafacial-treatments/ page.
// Usage (from facelit-site/): node scripts/hydrafacial/build.mjs content/pages/hydrafacial-treatments.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn, arrow } = k;

// Regulatory wording for the machine. Confirm against HydraFacial's documentation before going live.
const FDA = "US FDA-cleared";
const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const benefits = [
  ["drop", "Deep Hydration", "Floods skin with hyaluronic acid so it looks plump, dewy and comfortable."],
  ["pores", "Clean, Clear Pores", "Painless vortex suction lifts out blackheads, oil and dirt from deep inside pores."],
  ["spark", "Instant Glow", "You walk out with brighter, smoother skin the same day. Perfect before events."],
  ["tone", "More Even Tone", "Gentle exfoliation and brightening serums help fade dullness and uneven patches."],
  ["shield", "Fewer Breakouts", "Clearer pores and less oil mean fewer blackheads, whiteheads and pimples over time."],
  ["clock", "Softer Fine Lines", "Antioxidants and peptides help smooth early lines and keep skin supple."],
  ["leaf", "Gentle for All Skin Types", "No needles, no harsh scrubbing. Suits sensitive, oily, dry and Indian skin."],
  ["heal", "Zero Downtime", "No redness or peeling to hide. Go straight back to work or out for dinner."],
];

const finderResults = [
  { v: "dull", label: "Dull, tired skin", img: [B + "654-Dark-Circles1.webp", "Indian woman with dull, tired-looking skin", 1080, 1080], title: "Glow Revival Plan",
    text: "Clears away the dull layer and drenches skin in hydration, so it looks rested and radiant again.",
    once: "One HydraFacial Elite session with a brightening booster.", monthly: "HydraFacial Elite every 4 weeks to keep the glow going.",
    sessions: "1, then monthly", combine: "Exosomes, skin boosters" },
  { v: "pores", label: "Blackheads &amp; open pores", img: [A + "lage-pores.webp", "Open pores and blackheads on brown Indian skin", 1080, 1080], title: "Deep Pore Clean Plan",
    text: "The vortex tip pulls out blackheads and gunk without squeezing, so pores look cleaner and smaller.",
    once: "HydraFacial Elite with extra time on the extraction step.", monthly: "Monthly HydraFacial, alternated with a salicylic peel if needed.",
    sessions: "3, then monthly", combine: "Salicylic peel, MNRF for very large pores" },
  { v: "acne", label: "Oily, acne-prone skin", img: [A + "skin-before-1-scaled.webp", "Indian woman with oily, acne-prone skin and marks", 1920, 2560], title: "Clear Skin Plan",
    text: "Clears oil and congestion and calms the skin, helping reduce new breakouts alongside your doctor's acne treatment.",
    once: "HydraFacial with a clarifying serum to calm and clear.", monthly: "HydraFacial every 3 to 4 weeks plus a doctor-led acne routine.",
    sessions: "3–6, every 3–4 weeks", combine: "Chemical peels, acne medication" },
  { v: "pigment", label: "Pigmentation &amp; uneven tone", img: [A + "Pigmentation-on-the-Face.webp", "Pigmentation and uneven skin tone on Indian skin", 1080, 1080], title: "Even Tone Plan",
    text: "Gentle exfoliation and brightening boosters help lift dullness and soften patchy tone, especially when paired with peels.",
    once: "HydraFacial Elite with a brightening booster.", monthly: "Monthly HydraFacial alternated with depigmenting peels.",
    sessions: "4–6, every 2–4 weeks", combine: "Chemical peels, Pico laser" },
  { v: "ageing", label: "Fine lines &amp; dryness", img: [A + "8193-e1740745969395.webp", "Fine lines around the eye on Indian skin", 1080, 1009], title: "Plump &amp; Smooth Plan",
    text: "Hydration, antioxidants and peptides plump up the skin and soften early fine lines.",
    once: "Hydra Platinum with an anti-ageing booster.", monthly: "Monthly Hydra Platinum, with skin boosters every few months.",
    sessions: "3, then monthly", combine: "Skin boosters, exosomes, HIFU" },
  { v: "event", label: "Big day coming up", img: [A + "skin-hero-1.webp", "Indian woman with fresh, glowing skin", 1726, 1152], title: "Event-Ready Glow Plan",
    text: "The go-to treatment before weddings, parties and photoshoots. Your skin glows on the day with no risk of peeling.",
    once: "HydraFacial Elite 2 to 3 days before your event.", monthly: "A bridal series: monthly sessions for 3 months, with the last one 2 to 3 days before.",
    sessions: "1–3", combine: "Chemical peels (weeks before), exosomes" },
];

const concerns = [
  { tab: "Dull, dehydrated skin", img: [B + "654-Dark-Circles1.webp", "Indian woman with dull, tired skin", 1080, 1080], title: "Dull, dehydrated skin",
    text: "Air-conditioning, pollution, stress and not enough water leave skin flat and tired. HydraFacial clears the dead layer on top and pushes hydration deep into the skin, so it looks plump and healthy again straight away.",
    more: ["Visible glow the same day", "Plumper, softer skin", "Makeup sits better"], rec: ["Brightening booster", "Exosomes"], sessions: "1, then monthly",
    link: ["/how-to-get-glowing-skin/", "How to get glowing skin"] },
  { tab: "Blackheads &amp; congested pores", img: [A + "lage-pores.webp", "Congested, open pores on Indian skin", 1080, 1080], title: "Blackheads &amp; congested pores",
    text: "Instead of squeezing, the patented vortex tip loosens and suctions out blackheads, oil and debris. It's painless, and you can actually see what came out in the collection jar.",
    more: ["No painful extractions", "Cleaner, smaller-looking pores", "Less shine through the day"], rec: ["Salicylic peel"], sessions: "3, every 3–4 weeks",
    link: ["/how-to-get-rid-of-clogged-pores/", "How to clear clogged pores"] },
  { tab: "Oily &amp; acne-prone skin", img: [A + "skin-before-1-scaled.webp", "Indian woman with acne-prone skin", 1920, 2560], title: "Oily &amp; acne-prone skin",
    text: "Regular HydraFacials keep pores clear and oil under control, which helps prevent new breakouts. For active, inflamed acne, we treat that first and use HydraFacial as part of the plan.",
    more: ["Controls excess oil", "Fewer blackheads and whiteheads", "Calms congested skin"], rec: ["Chemical peels", "Doctor-led acne care"], sessions: "3–6, every 3–4 weeks",
    link: ["/understanding-the-7-types-of-acne-causes-symptoms-solutions/", "Types of acne explained"] },
  { tab: "Pigmentation &amp; uneven tone", img: [A + "Pigmentation-on-the-Face.webp", "Pigmentation on Indian skin", 1080, 1080], title: "Pigmentation &amp; uneven tone",
    text: "HydraFacial's gentle peel and brightening boosters help even out dull, patchy skin. For deeper pigmentation or melasma, we combine it with peels or laser for stronger results.",
    more: ["Brighter, more even skin", "Safe for Indian skin tones", "Pairs well with peels"], rec: ["Chemical peels", "Pico laser"], sessions: "4–6, every 2–4 weeks",
    link: ["/how-to-reduce-pigmentation-on-the-face/", "Reducing pigmentation"] },
  { tab: "Sun tan", img: [A + "Tan-and-Dark-Patches-on-Face2.webp", "Sun tan and dark patches on Indian skin", 1080, 1080], title: "Sun tan &amp; dull patches",
    text: "Kerala sun builds up tan fast. HydraFacial lifts the tanned, dead surface layer and brightens the skin underneath, without the sensitivity of a strong scrub.",
    more: ["Lifts surface tan", "Brightens sun-dulled skin", "No downtime"], rec: ["Chemical peels", "Sunscreen routine"], sessions: "2–4, every 2–3 weeks",
    link: ["/how-to-get-rid-of-tan-on-face-and-body/", "How to remove tan"] },
  { tab: "Fine lines", img: [A + "8193-e1740745969395.webp", "Fine lines around the eye", 1080, 1009], title: "Fine lines &amp; early ageing",
    text: "Dehydrated skin makes lines look deeper. HydraFacial plumps the skin with hyaluronic acid, antioxidants and peptides, so fine lines soften and skin feels firmer.",
    more: ["Plumper, smoother skin", "Softer fine lines", "Antioxidant protection"], rec: ["Skin boosters", "Exosomes"], sessions: "3, then monthly",
    link: ["/exosomes-skin-treatment/", "Exosome skin treatment"] },
  { tab: "Dry, flaky skin", img: [A + "How-to-Treat-Dry-and-Flaky-Skin-in-Winter1.webp", "Dry, flaky skin around the nose and mouth on Indian skin", 1080, 1080], title: "Dry, flaky skin",
    text: "Flaky patches stop moisturisers from working. HydraFacial gently lifts the flakes and pushes in hydration, so your skin feels soft and comfortable again.",
    more: ["Removes flakes gently", "Deep, lasting hydration", "Comfortable, soft skin"], rec: ["Barrier-repair skincare"], sessions: "1–3, every 3–4 weeks" },
];

const levels = [
  ["Hydra-Medi Facial", 1, "Our essential hydra facial: cleanse, exfoliate, extract and hydrate.", "a quick refresh, first-timers", "none", "monthly"],
  ["HydraFacial Elite (Original)", 2, "The Original HydraFacial with patented Vortex-Fusion tips and branded serums. Our most popular choice.", "glow, pores, oily or dull skin", "none", "monthly, or 3-session course"],
  ["Hydra Platinum", 3, "Our most complete facial, adding detox and circulation-boosting steps to the HydraFacial for a deeper refresh.", "tired, dull or ageing skin, special events", "none", "monthly"],
];

const menuRows = [
  ["HydraFacial Elite", "Original", "glow pores", "The Original HydraFacial with patented Vortex technology. Cleanse, extract and hydrate in one session.", ["Original", "Most popular"], "Three steps (cleanse and peel, extract and hydrate, fuse and protect) using HydraFacial tips and serums.", "None", "1"],
  ["HydraFacial Elite x3", "Package", "glow pores", "A 3-session course for clearer pores and a glow that lasts. Best value.", ["Package", "Best value"], "Three Elite sessions about 3 to 4 weeks apart.", "None", "3"],
  ["Hydra Platinum", "Premium", "glow age", "Our deepest refresh. Detoxifies, boosts circulation, exfoliates and deeply cleans the skin.", ["Detox", "Circulation"], "The full hydra facial plus extra detox and circulation-boosting steps.", "None", "1"],
  ["Hydra-Medi Facial", "Essential", "glow", "Cleanse, exfoliate and hydrate your skin. A great everyday refresh.", ["Hydration", "Refresh"], "Hydradermabrasion cleanse, gentle exfoliation and hydrating serums.", "None", "1"],
  ["Hydra-Medi Facial x3", "Package", "glow", "Get glowing, radiant skin with a 3-session course.", ["Package"], "Three Hydra-Medi sessions spaced 3 to 4 weeks apart.", "None", "3"],
  ["Booster Add-on", "Add-on", "glow age", "Add a targeted booster to your HydraFacial for brightening or anti-ageing.", ["Brightening", "Anti-ageing"], "A concentrated serum infused during the final step of your HydraFacial.", "None", "With any session"],
  ["Bridal HydraFacial Series", "Package", "glow event", "Three monthly sessions timed so your skin peaks on your wedding day.", ["Bridal", "Event"], "Planned with your doctor, with the last session 2 to 3 days before the event.", "None", "3"],
  ["Back HydraFacial", "Body", "pores", "Deep-cleans and hydrates the back. Great for back acne and before backless outfits.", ["Back acne", "Body"], "The same cleanse, extract and hydrate steps, adapted for the back.", "None", "1–3"],
];

const faqs = [
  ["What is the difference between the Original HydraFacial and other hydra facials?", "Many salons offer \"hydra\" style facials using generic machines. The Original HydraFacial uses a patented Vortex-Fusion delivery system, single-use tips and HydraFacial's own serums. At Facelit we use the genuine HydraFacial Elite."],
  ["Is HydraFacial painful?", "No. Most people find it relaxing. The extraction feels like a gentle suction or a light tingle, and there is no squeezing."],
  ["How long does a HydraFacial take?", "About 30 to 45 minutes for the HydraFacial Elite. Hydra Platinum takes up to an hour."],
  ["Is there any downtime?", "None. Your skin may look slightly pink for an hour or so, but most people go straight back to work or out for the evening."],
  ["How often should I get a HydraFacial?", "Once a month is ideal, as it matches your skin's natural renewal cycle. For specific concerns like congested pores or pigmentation, we may suggest 3 to 6 sessions 2 to 4 weeks apart."],
  ["When will I see results?", "Straight away. Skin looks brighter and feels smoother as soon as the session ends, and the glow usually lasts 5 to 7 days. Regular sessions build longer-lasting improvements."],
  ["Is HydraFacial safe for Indian skin?", "Yes. It is gentle, uses no harsh scrubbing and has a very low risk of pigmentation, so it suits all Indian skin tones."],
  ["Can I get a HydraFacial if I have acne?", "Yes for mild acne, blackheads and congestion. If you have very inflamed or cystic acne, our doctor will treat that first and plan HydraFacials once the skin is calmer."],
  ["Can I get a HydraFacial during pregnancy?", "Usually yes, with some changes. We avoid certain ingredients like salicylic acid. Always tell us if you are pregnant or breastfeeding."],
  ["Should I get a HydraFacial before my wedding?", "Yes, it is one of the most popular pre-bridal treatments. Book your last session 2 to 3 days before the wedding for the best glow, and start a series 2 to 3 months ahead for best results."],
  ["Can HydraFacial be combined with other treatments?", "Yes. It pairs well with chemical peels, exosomes, skin boosters and laser treatments. Your doctor will plan the timing so they work together."],
  ["Is the HydraFacial machine FDA-cleared?", `Yes. The HydraFacial technology we use is ${FDA}, and every session follows strict hygiene with single-use tips.`],
  ["Where can I get the Original HydraFacial in Kerala?", "Facelit offers HydraFacial at our clinics in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does a HydraFacial cost?", "It depends on the level you choose (Hydra-Medi, Elite or Platinum) and whether you add boosters or book a package. See our HydraFacial cost guide or book a consultation for a quote."],
];

const sections = [
  k.hero({
    tags: ["Skin", "Original HydraFacial", FDA + " technology"], h1: "HydraFacial Treatment",
    img: [A + "FACIAL12-scaled-1.webp", "Indian woman relaxing during a HydraFacial treatment at Facelit, Kerala"], pos: "center 30%",
    intro: "The Original HydraFacial cleans, exfoliates, extracts and hydrates your skin in one relaxing session, with zero downtime. At Facelit we use the genuine HydraFacial Elite with patented Vortex technology, so you walk out with clearer pores and a real glow, the very same day.",
    facts: [["30–45 min", "Per session"], ["Zero", "Downtime"], ["Instant", "Visible glow"], ["Monthly", "For lasting results"]],
    cta2: ["#finder", "Find your HydraFacial"],
  }),
  k.jump([["overview", "Overview"], ["machine", "Our machine"], ["finder", "Find your plan"], ["concerns", "Concerns"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is a HydraFacial?</h2>
 <div class="cp-prose">
 <p>A HydraFacial is a medical-grade facial that deep-cleans, exfoliates, extracts and hydrates your skin in one go. Instead of scrubbing and squeezing, it uses a special spiral tip that works like a tiny vortex: it loosens dirt and dead skin, gently suctions it out of your pores and, at the same time, feeds the skin with serums.</p>
 <p>The result is skin that is cleaner, smoother and more hydrated than any regular facial can manage, without redness or peeling. That's why it's loved by people who want a glow before an event, and by anyone who wants healthier skin month after month.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: Original HydraFacial vs "hydra" facials ${k.plus}</summary>
 <div class="cp-prose">
 <p>Many clinics and salons now offer "hydra" style facials on generic machines. The Original HydraFacial is different in a few important ways:</p>
 ${list(["<b>Patented Vortex-Fusion technology</b> that cleans and delivers serums at the same time.", "<b>Single-use, branded tips</b> for each client, for better hygiene.", "<b>HydraFacial's own serums and boosters</b>, made for the system.", "<b>Consistent, proven results</b> from a device used in clinics around the world."])}
 <p>At Facelit we use the genuine <a href="/original-hydrafacial/">HydraFacial Elite</a>.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="HydraFacial steps">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Cleanse &amp; peel</b><span>Lifts away dead skin and opens up pores.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Extract &amp; hydrate</b><span>Painless vortex suction clears pores while hydrating.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Fuse &amp; protect</b><span>Antioxidants and peptides soak in for lasting glow.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(A + "blog-glow.webp", "Indian woman with a facial mask during a skin treatment", 1400, 933)}
 ${img(B + "707-skin-care.webp", "Smiling Indian woman with healthy, hydrated skin", 1080, 1080)}
 </div>
 </div>`),

  shell("machine", `${head("Our technology", "Meet the Original HydraFacial Elite", "Not every \"hydra facial\" is a HydraFacial. We use the genuine machine, the same technology trusted by skin clinics worldwide.")}
 ${k.machine({ imgSrc: "/wp-content/uploads/2026/11/hydrafacial-elite-machine.webp", imgAlt: "Original HydraFacial Elite machine used at Facelit", w: 420, h: 750, badge: FDA,
   name: "HydraFacial Elite", text: "The HydraFacial Elite uses patented Vortex-Fusion technology to cleanse, exfoliate, extract and hydrate at the same time. Spiral tips create a vortex that loosens impurities and suctions them away while infusing the skin with HydraFacial serums and boosters chosen for your skin.",
   tags: [FDA, "Patented Vortex-Fusion", "Single-use tips", "Booster-ready", "All skin types"],
   specs: [["3 steps", "Cleanse, extract and hydrate, then protect"], ["30 min", "A full treatment in about half an hour"], ["Vortex tips", "Spiral design for painless extraction"], ["Boosters", "Add brightening or anti-ageing serums"]],
   link: ["/original-hydrafacial/", "See the full machine details"] })}
 <h3 class="cp-h3 font-serif" style="margin-top:2.5rem">The three HydraFacial steps</h3>
 ${tabs("steps", [
   { tab: "1 · Cleanse &amp; Peel", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">A gentle cleansing serum and resurfacing tip lift away dead skin cells and surface oil. A mild acid peel then loosens what's inside your pores, without stinging or peeling afterwards.</p>${list(["Removes the dull top layer", "Softens blackheads and debris", "Gentle enough for sensitive skin"])}</div><div class="cp-meta"><div><b>What you feel:</b> a cool, gentle glide</div><div><b>Time:</b> about 10 minutes</div></div></div>` },
   { tab: "2 · Extract &amp; Hydrate", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">The vortex tip suctions out blackheads, oil and impurities, painlessly. While it works, it also bathes the skin in hydrating serums, so skin never feels stripped.</p>${list(["No squeezing or pressing", "Visibly cleaner pores", "Hydrates while it cleans"])}</div><div class="cp-meta"><div><b>What you feel:</b> light suction, like a tiny vacuum</div><div><b>Time:</b> about 10 minutes</div></div></div>` },
   { tab: "3 · Fuse &amp; Protect", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Antioxidants, peptides and hyaluronic acid are infused deep into the freshly cleaned skin to plump, protect and give that signature glow.</p>${list(["Plumper, dewy skin", "Antioxidant protection", "Glow that lasts days"])}</div><div class="cp-meta"><div><b>What you feel:</b> cool and soothing</div><div><b>Time:</b> about 10 minutes</div></div></div>` },
   { tab: "+ Add-ons", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Your HydraFacial can be tailored with extras chosen by your doctor.</p>${list(["<b>Boosters</b> for brightening, fine lines or extra hydration", "<b>Detox and circulation steps</b> in our Hydra Platinum", "<b>Combination plans</b> with peels, exosomes or skin boosters"])}</div><div class="cp-meta"><div><b>Adds:</b> 10 to 20 minutes</div><div><b>Downtime:</b> none</div></div></div>` },
 ])}`),

  shell("finder", `${head("Find your plan", "Which HydraFacial Is Right for You?", "Answer two quick questions and see the HydraFacial plan our team most often recommends. We confirm your final plan at your visit.")}
 ${k.finder({ q1: "What would you most like to improve?", q2: { label: "What are you looking for?", dt: "Our suggestion", options: [["once", "A one-off glow"], ["monthly", "Lasting results over time"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of HydraFacial Treatment", "A HydraFacial does more in 30 minutes than most facials do in an hour.")}${k.benefitsGrid(benefits)}`),

  shell("concerns", `${head("Is it right for you?", "Skin Concerns HydraFacial Can Treat", "Tap a concern to see how HydraFacial helps, what we pair it with and how many sessions you may need.")}
 ${k.concernTabs("concerns", concerns)}`),

  shell("", `${head("Choose your level", "Hydra-Medi, HydraFacial Elite or Hydra Platinum?", "Three levels of hydra facial, all with zero downtime. Here's how they differ.")}${k.depthCards(levels)}`),

  shell("plans", `${head("Packages", "HydraFacial Packages at Facelit", "Book a single session, save with a 3-session course, or add a booster for extra results.")}
 ${k.menu([["all", "All"], ["glow", "Glow &amp; hydration"], ["pores", "Pores &amp; acne"], ["age", "Anti-ageing"], ["event", "Events &amp; bridal"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">HydraFacial Procedure: Step by Step</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor discussing a HydraFacial with an Indian patient", 1151, 768], lead: "A short skin check helps us choose the right serums and boosters for you.",
     items: ["Our team looks at your skin and asks about your concerns, allergies and medicines.", "Make sure there's no infection, cut, bruise or active cold sore on the area.", "Avoid waxing, bleaching and threading on the face for 3 to 5 days before.", "Pause retinoids and strong acids 2 to 3 days before.", "Come with clean skin if you can. We'll remove any makeup anyway."] },
   { tab: "02 · During", img: [A + "FACIAL12-scaled-1.webp", "Indian woman relaxing during her facial", 1600, 1600], lead: "Lie back and relax. Most people find it soothing.",
     items: ["Your face is cleansed and gently exfoliated with the resurfacing tip.", "A mild peel loosens oil and debris in your pores.", "The vortex tip painlessly suctions out blackheads and impurities.", "Hydrating serums are infused at the same time.", "Antioxidants, peptides and any booster are fused into the skin.", "Sunscreen is applied before you leave."] },
   { tab: "03 · After", img: [A + "skin-hero-1.webp", "Indian woman with fresh, glowing skin after a HydraFacial", 1726, 1152], lead: "You can go straight back to your day. The full aftercare plan is below.",
     items: ["Skin may look a little pink for up to an hour.", "Avoid makeup for 6 to 12 hours so the serums keep working.", "Skip saunas, steam rooms and heavy workouts for 24 hours.", "Use a broad-spectrum sunscreen every day.", "Follow the home routine your doctor suggests for longer-lasting results."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "HydraFacial Results Timeline", "HydraFacial works instantly, and regular sessions make the results last longer.")}
 ${k.timeline([["Right after", "Instant glow", "Skin looks brighter, cleaner and more hydrated as soon as you sit up."], ["Day 1–3", "Peak glow", "Makeup goes on smoothly and skin feels soft and bouncy."], ["Week 1", "Clearer pores", "Pores look cleaner and skin stays less oily."], ["Monthly sessions", "Lasting change", "Tone, texture and hydration keep improving with regular treatments."]])}
 </div>
 <div>
 <figure style="margin:0">${img(A + "hair-treatments-hero.webp", "Smiling Indian woman with healthy, glowing skin", 2159, 1440, "cp-img cp-img--43")}<figcaption class="cp-note">Model image. Results vary depending on your skin and how often you have treatment.</figcaption></figure>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Want an instant glow with no downtime", "Have blackheads, oily or congested skin", "Have dull, dry or dehydrated skin", "Want regular, gentle skin maintenance"])}</div>
 <div class="cp-card"><h3 class="font-serif">Wait if you have</h3>${list(["Active rash, sunburn or open wounds", "Very inflamed or cystic acne", "Active cold sores", "Recent strong peel or laser (check with us)"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("", `${head("Treatment areas", "HydraFacial for Face and Body", "HydraFacial isn't just for the face. It can clean and hydrate other areas too.")}
 ${k.areas([["Face", "Glow, pores, hydration"], ["Under the eyes", "Puffiness and dryness"], ["Neck", "Dull, dry skin"], ["Chest", "Dull, uneven skin"], ["Back", "Back acne and congestion"], ["Hands", "Dry, dull skin"]])}`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "HydraFacial Aftercare", "Easy aftercare helps your glow last longer.")}${tabs("aftercare", [
   { tab: "Same day", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Leave the serums on your skin", "Drink plenty of water", "Use sunscreen if you go out", "Sleep on a clean pillowcase"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Makeup for 6 to 12 hours", "Sauna, steam and hot yoga", "Heavy workouts", "Touching your face"], warn)}</div></div>` },
   { tab: "Next 3 days", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Use a gentle cleanser", "Moisturise morning and night", "Wear SPF 30 to 50 daily", "Keep up your water intake"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Retinoids and acids for 48 hours", "Scrubs and face brushes", "Waxing or threading the face", "Chlorinated pools for 24 hours"], warn)}</div></div>` },
   { tab: "Between sessions", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Morning</h3>${list(["Gentle cleanser", "Hydrating or vitamin C serum", "Light moisturiser", "Sunscreen, reapplied outdoors"])}</div><div class="cp-card"><h3 class="font-serif">Night</h3>${list(["Double cleanse if you wear makeup", "Treatment serum your doctor suggests", "Moisturiser", "Book your next HydraFacial in about 4 weeks"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Your skin type", "HydraFacial for Every Skin Type", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Oily &amp; acne-prone skin", "Great for oily skin. Extraction clears out congestion and a clarifying serum helps control oil. We avoid working over very inflamed acne."],
   ["Dry &amp; dehydrated skin", "One of the best treatments for dry skin. Hyaluronic acid serums leave skin plump and comfortable."],
   ["Sensitive skin", "Gentle enough for most sensitive skin. We adjust the peel strength and choose calming serums."],
   ["Combination skin", "We can spend more time extracting the oily T-zone and focus on hydration on the drier cheeks."],
   ["Indian and darker skin tones", "Very safe for darker skin. There's no harsh scrubbing or heat, so the risk of pigmentation is very low."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "HydraFacial vs Regular Facial, Chemical Peel and Medi-Facial", "How the Original HydraFacial stacks up against other popular facial treatments.")}
 ${k.compareTable(["Original HydraFacial", "Regular facial", '<a href="/chemical-peel-treatment/">Chemical peel</a>', '<a href="/best-medifacial-in-coimbatore/">Medi-facial</a>'], [
   ["Best for", "Glow, pores, hydration", "Relaxation, basic cleansing", "Acne, pigmentation, texture", "Targeted skin concerns"],
   ["Extraction", "Painless vortex suction", "Manual squeezing", "None", "Varies"],
   ["Downtime", "None", "None", "0–7 days", "0–2 days"],
   ["Results", "Instant and builds monthly", "Short-lived", "Builds over sessions", "Builds over sessions"],
   ["Hygiene", "Single-use tips", "Varies", "Clinical", "Clinical"],
   ["Suits sensitive skin", "Yes", "Depends on products", "With the right peel", "Usually"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for HydraFacial in Kerala?</h2>
 ${img(B + "825-Trivandrum-clinic.webp", "Facelit skin clinic treatment room in Trivandrum", 1024, 585, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Genuine HydraFacial Elite", `We use the Original, ${FDA} HydraFacial with patented Vortex technology and branded serums, not a look-alike machine.`],
   ["Doctor-led skin plans", "Our doctors check your skin and choose the right level, serums and boosters, and tell you when another treatment would suit you better."],
   ["Single-use tips, strict hygiene", "Fresh tips for every client and a spotless, sterile treatment room."],
   ["Combined with medical treatments", "Peels, exosomes, skin boosters and lasers are all under one roof, so your HydraFacial can be part of a bigger plan."],
   ["Comfort and care", "A calm, relaxing experience from start to finish, with clear aftercare advice."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "HydraFacial Side Effects and Precautions", "HydraFacial is one of the gentlest skin treatments available. Here's what to know.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Slight pinkness for up to an hour", "Mild tingling during the peel step", "Skin feeling a little tight for a few hours", "Rarely, a small breakout as pores clear out"])}</div>
 <div class="cp-card"><h3 class="font-serif">Tell us first if you</h3>${list(["Are pregnant or breastfeeding", "Are allergic to aspirin or salicylates", "Use isotretinoin, retinoids or strong acids", "Have rosacea, active rash or cold sores", "Had a laser, peel or injectables in the last 2 weeks"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "HydraFacial FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "HydraFacial at Facelit", "")}
 ${k.links([["/best-hydrafacial-treatment-in-trivandrum/", "Location", "HydraFacial in Trivandrum"], ["/hydrafacial-for-glowing-skin-in-karunagappally/", "Location", "HydraFacial in Karunagappally"], ["/original-hydrafacial/", "Machine", "Original HydraFacial Elite"], ["/cost-of-hydrafacial-in-trivandrum/", "Pricing", "HydraFacial cost in Trivandrum"], ["/how-to-choose-the-right-facial-for-your-skin-type/", "Guide", "Choosing the right facial"], ["/chemical-peel-treatment/", "Treatment", "Chemical peel treatment"]])}`),

  k.cta("Not sure which HydraFacial is right for you?", "Book a consultation and our team will check your skin and suggest the right level, boosters and schedule for your goals."),
];

k.writePage(process.argv[2], sections, {
  title: "Original HydraFacial in Kerala | Deep Cleanse & Instant Glow | Facelit",
  desc: `Original HydraFacial Elite in Trivandrum, Kollam & Thrissur with ${FDA.replace("US ", "")} Vortex technology. Deep-cleans pores, hydrates and gives an instant glow with zero downtime.`,
  image: "https://facelit.in/wp-content/uploads/2026/08/FACIAL12-scaled-1.webp",
  faqs,
  procedure: { name: "HydraFacial", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face, neck, chest, back",
    howPerformed: "A HydraFacial Elite device cleanses and exfoliates the skin, uses vortex suction to extract impurities while hydrating, then infuses antioxidants, peptides and hyaluronic acid.",
    preparation: "Skin check; avoid waxing for 3 to 5 days and retinoids or strong acids for 2 to 3 days before.",
    followup: "Avoid makeup for 6 to 12 hours, heat and heavy exercise for 24 hours, and use sunscreen daily. Repeat about every 4 weeks." },
  crumbs: [["Home", "https://facelit.in/"], ["Skin Treatments", "https://facelit.in/skin-treatments/"], ["HydraFacial Treatment", "https://facelit.in/hydrafacial-treatments/"]],
});
