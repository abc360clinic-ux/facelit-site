// Builds the redesigned /co2-fractional-laser/ page.
// Usage (from facelit-site/): node scripts/co2-laser/build.mjs content/pages/co2-fractional-laser.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn, arrow } = k;

// Regulatory wording for the machine. Confirm against the device's FDA 510(k) clearance before going live.
const FDA = "US FDA-cleared";
const MACHINE = "CO2 + Erbium Glass 1550nm Dual Laser";
const shieldIco = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M10 2.5l6 2.5v4.5c0 3.8-2.6 6.9-6 8-3.4-1.1-6-4.2-6-8V5z"/><path d="M7.3 10l1.9 1.9 3.6-3.8"/></svg>`;

const benefits = [
  ["wave", "Smoother Acne Scars", "Breaks up old scar tissue and fills in rolling and boxcar scars with fresh collagen."],
  ["clock", "Softer Wrinkles", "Smooths fine lines around the eyes, mouth and forehead."],
  ["lift", "Firmer, Tighter Skin", "Heat from the laser tightens collagen, giving skin a gentle lift."],
  ["pores", "Smaller-looking Pores", "Tightens stretched pores on the nose and cheeks."],
  ["stretch", "Faded Stretch Marks", "Improves the colour and texture of stretch marks on the tummy, thighs and arms."],
  ["bandage", "Flatter, Lighter Scars", "Softens accident, surgical, burn and chickenpox scars."],
  ["layers", "Smooth, Even Texture", "Resurfaces rough, bumpy or sun-damaged skin so it looks polished."],
  ["spark", "Results That Keep Improving", "Collagen keeps building for 3 to 6 months after each session."],
];

const concerns = [
  { tab: "Acne scars", img: ["/wp-content/uploads/2026/08/skin-before-1-scaled.webp", "Indian woman with acne scars and marks on her cheeks", 1920, 2560],
    title: "Acne scars", text: "Acne scars are where CO2 fractional laser really shines. The laser makes thousands of tiny columns in the scarred skin. As each one heals, your skin lays down new collagen that lifts and smooths rolling and boxcar scars. Deep ice-pick scars often need a little help from TCA CROSS or subcision first.",
    more: ["Lifts rolling and boxcar scars", "Evens out bumpy texture", "Fades leftover acne marks"], rec: ["Subcision", "TCA CROSS", "PRP"], sessions: "3–5, every 4–6 weeks",
    link: ["/best-laser-treatment-for-deep-acne-scars/", "Laser treatment for deep acne scars"] },
  { tab: "Enlarged pores", img: ["/wp-content/uploads/2026/08/lage-pores.webp", "Enlarged open pores on brown Indian skin", 1080, 1080],
    title: "Enlarged, open pores", text: "Pores look bigger as skin loses firmness and oil stretches them out. CO2 resurfacing tightens the skin around each pore and smooths the surface, so pores look visibly smaller, especially on the nose and cheeks.",
    more: ["Tighter, smaller-looking pores", "Smoother skin surface", "Makeup sits better"], rec: ["Chemical peel", "MNRF"], sessions: "2–4, every 4–6 weeks",
    link: ["/open-pores-treatment-in-trivandrum/", "Open pores treatment"] },
  { tab: "Wrinkles & fine lines", img: ["/wp-content/uploads/2026/08/8193-e1740745969395.webp", "Fine lines and wrinkles around the eye on Indian skin", 1080, 1009],
    title: "Wrinkles & fine lines", text: "As we age, collagen slows down and lines start to settle in. CO2 laser removes a thin layer of damaged skin and kick-starts collagen production, softening crow's feet, smile lines and lines on the forehead and around the lips.",
    more: ["Softens crow's feet and smile lines", "Improves crepey under-eye skin", "Brighter, fresher-looking skin"], rec: ["Botox", "Skin boosters"], sessions: "2–4, every 4–6 weeks",
    link: ["/anti-aging-treatments/", "Anti-ageing treatments"] },
  { tab: "Stretch marks", img: ["147-9.webp", "Stretch marks on the abdomen", 1080, 1080],
    title: "Stretch marks", text: "Stretch marks form when skin stretches faster than it can keep up, during pregnancy, growth spurts or weight changes. The laser remodels the damaged skin so marks become flatter, narrower and closer to your normal skin colour. Newer, pinkish marks respond fastest.",
    more: ["Narrower, flatter marks", "Colour closer to your skin tone", "Works on tummy, thighs, hips and arms"], rec: ["PRP", "MNRF"], sessions: "3–6, every 4–6 weeks",
    link: ["/how-can-you-reduce-stretch-marks-with-advanced-treatments/", "Stretch mark treatments"] },
  { tab: "Accident & surgical scars", img: ["148-5-6.webp", "Old scar on the forearm", 1080, 1080],
    title: "Accident, surgical & burn scars", text: "Raised, uneven or discoloured scars from injuries, surgery or burns can be made flatter and softer. The laser breaks down thick scar tissue and helps your skin rebuild it in a more organised way, so the scar blends better with the skin around it.",
    more: ["Flattens raised and thick scars", "Softens stiff scar tissue", "Blends scar colour and texture"], rec: ["Steroid injection", "Silicone gel"], sessions: "3–6, every 4–8 weeks",
    link: ["/how-to-remove-accident-scars-on-face/", "Removing accident scars"] },
  { tab: "Uneven texture", img: ["/wp-content/uploads/2026/07/233-5.webp", "Uneven, rough skin texture on an Indian cheek", 1080, 1080],
    title: "Rough, uneven or sun-damaged skin", text: "Sun damage, old breakouts and age can leave skin rough and dull. Fractional CO2 resurfacing replaces that worn-out surface with smoother, healthier skin, improving texture, tone and glow in one go.",
    more: ["Smoother, softer surface", "Fades sun spots", "Healthier glow"], rec: ["Chemical peel", "HydraFacial"], sessions: "1–3, every 4–6 weeks",
    link: ["/co2-laser-how-does-it-improve-your-skin/", "How CO2 laser improves skin"] },
  { tab: "Pigmentation &amp; melasma", img: ["/wp-content/uploads/2026/08/Pigmentation-on-the-Face.webp", "Melasma and pigmentation on Indian skin", 1080, 1080],
    title: "Pigmentation &amp; melasma", text: "Pigmentation needs a gentle hand, because too much heat can make it worse. Here we use the Erbium Glass 1550nm mode at careful settings to break up pigment and renew the skin, usually alongside peels and a prescribed home routine.",
    more: ["Gentle, non-ablative approach", "Fades sun spots and patchy tone", "Lower risk for Indian skin"], rec: ["Chemical peels", "Pico laser"], sessions: "4–6, every 3–4 weeks",
    link: ["/chemical-peel-for-pigmentation-removal/", "Peels for pigmentation"] },
  { tab: "Moles, skin tags &amp; xanthelasma", img: ["188-4-6.webp", "Small mole and marks on brown Indian skin", 1080, 1080],
    title: "Moles, skin tags &amp; xanthelasma", text: "The CO2 laser can precisely remove small benign growths like skin tags, flat moles, warts and xanthelasma (yellowish patches near the eyelids). It seals as it works, so there is very little bleeding and healing is neat. Every mole is checked by a doctor before removal.",
    more: ["Quick, precise removal", "Minimal bleeding", "Small spot heals in 7 to 10 days"], rec: ["Doctor check before removal"], recLabel: "Important", sessions: "Usually 1",
    link: ["/skin-tag-and-tan-removal-in-trivandrum/", "Skin tag removal"] },
  { tab: "Skin tightening", img: ["/wp-content/uploads/2026/08/anti-aging-before-scaled-1.webp", "Indian woman in her forties with early skin laxity and fine lines", 1920, 2560],
    title: "Loose or sagging skin", text: "The heat from a CO2 laser makes existing collagen contract and tells your skin to build more. The result is a subtle, natural tightening that improves firmness on the face, neck and under the eyes, without surgery.",
    more: ["Firmer cheeks and jawline", "Tighter skin under the eyes", "Natural-looking results"], rec: ["HIFU", "MNRF"], sessions: "2–3, every 6 weeks",
    link: ["/anti-aging-treatments-in-trivandrum/", "Skin tightening options"] },
];


const menuRows = [
  ["Acne Scar Treatment", "Face", "scars", "Our most popular CO2 treatment. Smooths rolling and boxcar acne scars by rebuilding collagen beneath them.", ["Acne scars", "Texture"], "Fractional CO2 passes over scarred areas, sometimes combined with subcision or PRP.", "5–7 days", "3–5"],
  ["Burn Scar Treatment", "Face & body", "scars body", "Softens and flattens burn scars, and helps tight, shiny skin feel more flexible.", ["Burn scars"], "Deep, targeted passes break down thick scar tissue so new skin can form.", "7–10 days", "3–6"],
  ["Surgical Scar Treatment", "Face & body", "scars body", "Makes surgical scars flatter, smoother and less noticeable. Can start a few weeks after stitches are out.", ["Surgical scars"], "Fractional laser remodels the scar so it blends with nearby skin.", "5–7 days", "3–5"],
  ["Hypertrophic Scar Treatment", "Face & body", "scars body", "Reduces thick, raised scars by breaking down excess scar tissue.", ["Raised scars"], "Often paired with steroid injections for faster flattening.", "5–7 days", "3–6"],
  ["Stretch Mark Treatment", "Body", "body", "Fades stretch marks on the tummy, thighs, hips and arms by boosting collagen and elastin.", ["Stretch marks"], "Fractional passes remodel the thinned skin inside each mark.", "5–7 days", "3–6"],
  ["Skin Rejuvenation", "Face", "texture age", "A full-face refresh for fine lines, dullness and uneven texture.", ["Fine lines", "Glow"], "Light to moderate resurfacing across the whole face.", "3–5 days", "2–3"],
  ["Open Pores Treatment", "Face", "texture", "Tightens enlarged pores on the nose and cheeks for a smoother, more refined finish.", ["Open pores"], "Focused passes over pore-prone areas tighten the surrounding skin.", "3–5 days", "2–4"],
  ["Chickenpox Scar Treatment", "Face & body", "scars", "Lifts the small, round, pitted scars chickenpox often leaves behind.", ["Pitted scars"], "Targeted CO2 on each scar, sometimes with TCA CROSS.", "5–7 days", "3–5"],
  ["Mole, Skin Tag & Xanthelasma Removal", "Face & body", "texture", "Quick, precise CO2 removal of small benign growths with very little bleeding.", ["Moles", "Skin tags"], "The CO2 beam vaporises the growth layer by layer and seals as it goes. Every mole is checked by a doctor first.", "7–10 days for the spot to heal", "Usually 1"],
  ["Erbium Glass 1550 Rejuvenation", "Face", "texture age", "A gentle, low-downtime session for pores, fine lines and dull or uneven skin.", ["Low downtime", "Pores"], "Non-ablative 1550nm laser heats deeper layers to build collagen while the surface stays intact.", "1–2 days", "4–6"],
  ["Wrinkle & Skin Tightening", "Face & neck", "age", "Softens wrinkles and gently tightens loose skin on the face, neck and around the eyes.", ["Wrinkles", "Firmness"], "Heat from the laser tightens collagen and kick-starts new collagen.", "5–7 days", "2–4"],
];

const faqs = [
  ["Does CO2 fractional laser hurt?", "We apply a numbing cream for 45 to 60 minutes before the treatment, so most people feel only warmth and a prickly, pins-and-needles sensation. Afterwards your skin feels like it has a mild sunburn for a day or two."],
  ["How many CO2 laser sessions will I need?", "Most people need 3 to 5 sessions spaced 4 to 6 weeks apart. Light texture concerns may need just 1 or 2, while deep acne scars or stretch marks usually need more. Your doctor will give you a plan after examining your skin."],
  ["What is the downtime after CO2 fractional laser?", "With our combined CO2 and Erbium Glass mode, most people have 3 to 5 days of redness and flaking. A strong CO2-only session can take 5 to 7 days, and Erbium Glass alone just 1 to 2. Most people plan their session before a weekend or a few days off."],
  ["Which laser machine does Facelit use?", `We use a ${MACHINE}. It combines a fractional CO2 laser (10,600nm) with a non-ablative Erbium Glass laser (1550nm) in one device, so treatment can be tailored to your skin and how much downtime you can take.`],
  ["Is your laser FDA-cleared?", `Yes. The technology we use is ${FDA}, and every treatment is carried out by our doctors following strict safety protocols.`],
  ["What does the Erbium Glass 1550nm laser add?", "It builds collagen deep in the skin without damaging the surface. On its own it gives gentle, low-downtime rejuvenation. Combined with CO2, it lets us get strong results with a lighter CO2 setting, which means quicker healing."],
  ["When will I see results?", "Your skin looks smoother and brighter once it has healed, usually in 1 to 2 weeks. The bigger change comes over the next 3 to 6 months as new collagen builds, so results keep improving long after each session."],
  ["Is CO2 laser safe for Indian or darker skin?", "Yes, with the right approach. Darker skin has a higher risk of temporary darkening after laser, so we use carefully chosen settings, prime your skin with creams for 2 to 4 weeks beforehand and insist on strict sun protection afterwards."],
  ["Are the results permanent?", "Scars that have been improved stay improved. Your skin will keep ageing naturally, so for wrinkles and texture many people choose a maintenance session every year or so, along with good sunscreen and skincare."],
  ["What is the difference between CO2 laser and MNRF?", "CO2 laser removes tiny columns of the skin's surface and heats deeper layers, so it is excellent for scars and texture but has more downtime. MNRF uses fine needles with radiofrequency energy under the skin, so it has less downtime and suits darker skin well. We often combine the two."],
  ["Can CO2 laser remove acne scars completely?", "It can improve acne scars a lot, often by 50 to 80 percent over a full course, but it rarely erases them completely. Combining it with subcision, TCA CROSS or PRP usually gives the best result."],
  ["Can I wear makeup after the treatment?", "Wait until your skin has fully stopped flaking, usually 5 to 7 days. Makeup on freshly treated skin can irritate it and slow down healing."],
  ["Can CO2 laser be done on the body?", "Yes. We treat stretch marks on the tummy, thighs and arms, and scars on any part of the body. Body skin heals a little slower than the face, so downtime is often a few days longer."],
  ["When is the best time of year for CO2 laser?", "Any time, as long as you can avoid direct sun while you heal. Many people prefer the monsoon or cooler months in Kerala, when it is easier to stay out of strong sunlight."],
  ["Where can I get CO2 fractional laser in Kerala?", "Facelit offers CO2 fractional laser at our clinic in Kowdiar, Trivandrum, with clinics also in Karunagappally and Guruvayur. Book online or call your nearest clinic to check availability."],
  ["How much does CO2 fractional laser cost?", "The cost depends on the area being treated, the concern and how many sessions you need. Book a consultation and we will give you a clear, personalised quote."],
];

const sections = [
  k.hero({
    tags: ["Skin", "Laser", FDA + " technology"], h1: "CO2 Fractional Laser",
    img: ["/wp-content/uploads/2026/08/eco-hero.webp", "Facelit doctor with the CO2 + Erbium Glass 1550nm laser in the treatment room, Trivandrum"], pos: "82% center",
    intro: `CO2 fractional laser is one of the most effective treatments for acne scars, deep wrinkles, stretch marks and rough skin. At Facelit we use an advanced ${FDA} dual laser that pairs fractional CO2 with Erbium Glass 1550nm, so you get strong resurfacing with less downtime and faster healing. Every session is planned and done by our doctors.`,
    facts: [["2-in-1", "CO2 + 1550nm laser"], ["3–5 days", "Typical downtime"], ["3–5", "Sessions typical"], ["4–6 weeks", "Between sessions"]],
    cta2: ["#treatments", "Explore treatments"],
  }),
  k.jump([["overview", "Overview"], ["machine", "Our laser"], ["concerns", "Concerns"], ["treatments", "Treatments"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is CO2 Fractional Laser?</h2>
 <div class="cp-prose">
 <p>A CO2 laser uses a beam of light that water in your skin absorbs strongly, so it can gently vaporise a very thin layer of damaged skin. "Fractional" means the beam is split into thousands of microscopic dots. Only those dots are treated, while the healthy skin around them stays untouched and speeds up healing.</p>
 <p>Each tiny treated spot triggers your skin's repair process. Over the following weeks and months, it replaces scarred and damaged tissue with new collagen and fresh skin. That is why CO2 fractional laser is often called the gold standard for acne scars and skin resurfacing.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: how our CO2 laser works ${k.plus}</summary>
 <div class="cp-prose">
 <p>At Facelit we use the ${MACHINE}, a single machine with two laser sources. Your doctor can adjust:</p>
 ${list(["<b>Depth</b>, to reach shallow texture or deeper scar tissue.", "<b>Density</b>, meaning how many dots are placed per square centimetre.", "<b>Energy</b>, set differently for the face, neck and body.", "<b>Pattern and size</b>, so small areas like individual scars can be targeted.", "<b>Wavelength</b>, switching between CO2, Erbium Glass or both in one session."])}
 <p>Built-in cooling and safety features keep you comfortable and lower the risk of side effects. Want to know more? Read <a href="/co2-laser-how-does-it-improve-your-skin/">how CO2 laser improves your skin</a>.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How fractional laser works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Micro-columns</b><span>The laser treats thousands of tiny dots, leaving healthy skin in between.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Healing</b><span>Healthy skin around each dot repairs it within days.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Collagen remodelling</b><span>New collagen builds for 3 to 6 months, smoothing scars and lines.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img("/wp-content/uploads/2026/08/about-hero.webp", "Facelit doctor discussing CO2 laser treatment with an Indian patient", 1151, 768)}
 ${img("/wp-content/uploads/2026/07/189-6-1.webp", "Close-up of skin texture and pores on brown Indian skin", 1080, 1080)}
 </div>
 </div>`),

  shell("machine", `${head("Our technology", "Meet Our CO2 + Erbium Glass 1550nm Laser", "Not all CO2 lasers are the same. Ours combines two lasers in one machine, so your doctor can choose exactly how deep and how strong each treatment should be.")}
 <div class="cp-machine">
 <div class="cp-mimg"><span class="cp-mbadge">${shieldIco} ${FDA}</span><img src="/wp-content/uploads/2026/08/WhatsApp-Image-2025-01-24-at-15.28.39_e9c9182a.webp" alt="${MACHINE} machine used at Facelit" width="331" height="343" loading="lazy" decoding="async"></div>
 <div>
 <h3 class="cp-mname font-serif">${MACHINE}</h3>
 <p class="cp-p">This dual-wavelength system brings together a fractional CO2 laser, the gold standard for resurfacing, and a 1550nm Erbium Glass laser that stimulates collagen deep in the skin without breaking the surface. Using both in one session means strong results for scars and wrinkles, with less downtime and faster healing than CO2 alone.</p>
 <div class="cp-badges">${[FDA, "Dual wavelength", "Less downtime", "Faster healing", "Face &amp; body"].map((b) => `<span>${k.tick("currentColor")}${b}</span>`).join("")}</div>
 <div class="cp-specs">
 <div class="cp-spec"><b>10,600 nm</b><span>Fractional CO2 for resurfacing scars, wrinkles and texture</span></div>
 <div class="cp-spec"><b>1,550 nm</b><span>Erbium Glass for deep, gentle collagen building</span></div>
 <div class="cp-spec"><b>Adjustable</b><span>Depth, density and spot size set for every area</span></div>
 <div class="cp-spec"><b>Precise</b><span>Scanner treats tiny dots and leaves healthy skin in between</span></div>
 </div>
 <a class="cp-textlink" href="/co2-erbium-glass-1550nm/">See the full machine details ${arrow}</a>
 </div>
 </div>
 <h3 class="cp-h3 font-serif" style="margin-top:2.5rem">Three modes, one machine</h3>
 ${tabs("modes", [
   { tab: "Fractional CO2", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">The CO2 beam removes thousands of microscopic columns of damaged skin and heats the layers below. As each column heals, scarred and wrinkled skin is replaced with fresh tissue and new collagen. This is the most powerful mode for deep acne scars, surgical scars and stretch marks.</p>${list(["Strongest results for deep scars", "Resurfaces rough, uneven skin", "Also removes moles, skin tags and xanthelasma precisely"])}</div><div class="cp-meta"><div><b>Best for:</b> deep acne scars, surgical and burn scars, stretch marks</div><div><b>Downtime:</b> 5–7 days</div><div><b>Sessions:</b> 3–5, every 4–6 weeks</div></div></div>` },
   { tab: "Erbium Glass 1550nm", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">The 1550nm Erbium Glass laser is non-ablative. It passes through the surface without removing it and gently heats deeper layers to trigger collagen. The skin surface stays intact, so recovery is quick and the risk of pigmentation is lower.</p>${list(["Very little downtime", "Gentler on Indian and darker skin", "Good for pores, fine lines, melasma and mild scars"])}</div><div class="cp-meta"><div><b>Best for:</b> pores, fine lines, mild scars, pigmentation</div><div><b>Downtime:</b> 1–2 days of redness</div><div><b>Sessions:</b> 4–6, every 3–4 weeks</div></div></div>` },
   { tab: "Combined mode", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Our doctors can use both wavelengths in the same session: Erbium Glass to build collagen deep down and CO2 to resurface the top layers. You get much of the power of CO2 with a shorter, easier recovery, which is why this is our most recommended option for acne scars.</p>${list(["Deep collagen plus surface renewal", "Less downtime than CO2 alone", "Our go-to option for acne scars and texture"])}</div><div class="cp-meta"><div><b>Best for:</b> acne scars, wrinkles, overall resurfacing</div><div><b>Downtime:</b> 3–5 days</div><div><b>Sessions:</b> 3–5, every 4–6 weeks</div></div></div>` },
 ])}`),

  shell("", `${head("What to expect", "Benefits of CO2 Fractional Laser", "One technology, many results. Here is what a course of CO2 laser can do for your skin.")}${k.benefitsGrid(benefits)}`),

  shell("concerns", `${head("Is it right for you?", "What Can CO2 Fractional Laser Treat?", "Tap a concern to see how the laser helps, what we might combine it with and roughly how many sessions it takes.")}
 ${k.concernTabs("concerns", concerns)}`),

  shell("treatments", `${head("Choose your treatment", "CO2 Laser Treatments at Facelit", "Pick what you want to treat. Every treatment below is priced per session, and your doctor will suggest how many you need.")}
 ${k.menu([["all", "All treatments"], ["scars", "Scars"], ["texture", "Texture &amp; pores"], ["age", "Anti-ageing"], ["body", "Body"]], menuRows)}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">CO2 Laser Procedure: Step by Step</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: ["/wp-content/uploads/2026/08/about-hero.webp", "Doctor consultation before CO2 laser at Facelit", 1151, 768], lead: "Good preparation makes the treatment safer and the results better.",
     items: ["Your doctor examines your skin, asks about your medical history and agrees a plan with you.", "Stop retinoids, scrubs and exfoliating acids 5 to 7 days before.", "Avoid sun exposure and tanning for at least 2 weeks before.", "Darker skin may need 2 to 4 weeks of priming creams to lower the risk of pigmentation.", "If you get cold sores, you may be given antiviral tablets to start beforehand.", "Come with clean skin, no makeup or lotions."] },
   { tab: "02 · During", img: ["/wp-content/uploads/2026/08/eco-hero.webp", "Facelit doctor preparing the CO2 fractional laser for treatment", 1726, 972], lead: "The treatment itself takes 15 to 30 minutes, plus time for numbing.",
     items: ["A numbing cream is applied for 45 to 60 minutes, then removed.", "You wear protective eye shields throughout.", "The doctor moves the laser handpiece over the area in planned passes.", "You will feel warmth and a prickly, pins-and-needles sensation.", "A cooling device or cold compress keeps you comfortable.", "A soothing ointment and sunscreen are applied before you leave."] },
   { tab: "03 · After", img: ["/wp-content/uploads/2026/08/skin-after-1-scaled.webp", "Indian woman with smoother skin after healing from laser treatment", 1920, 2560], lead: "Your skin will feel like it has a sunburn for a day or two. The full aftercare plan is below.",
     items: ["Expect redness, warmth and mild swelling for 1 to 3 days.", "Skin may look slightly bronzed and feel rough, like sandpaper, as tiny dots form.", "Gentle flaking follows around day 3 to 7. Don't pick it.", "Keep the area clean and moisturised with the ointment you are given.", "Stay out of the sun and use SPF 50 once your doctor says it's fine.", "Avoid makeup, workouts, swimming and saunas until your skin has healed."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Recovery &amp; results", "CO2 Laser Recovery and Results", "Everyone heals a little differently, but this is what most people go through after a moderate session on the face.")}
 ${k.timeline([["Day 1–2", "Red &amp; warm", "Skin feels like a sunburn, with some swelling, especially around the eyes."], ["Day 3–7", "Bronzing &amp; flaking", "Skin darkens slightly and flakes off in fine, tiny pieces as it renews."], ["Week 2", "Fresh, pink skin", "New skin looks smoother and slightly pink, which fades over a few weeks."], ["Months 1–6", "Collagen builds", "Scars, lines and texture keep improving as new collagen forms."]])}
 </div>
 <div>
 <figure class="cp-ba" style="margin:0">${img("829-CO2-Fractional-Laser2.webp", "CO2 fractional laser before and after: acne scars on the cheek visibly smoother", 1080, 1080)}<figcaption class="cp-note">Before (top) and after (bottom) CO2 fractional laser for acne scars. Individual results vary.</figcaption></figure>
 </div>
 </div>`),

  shell("", `${head("Treatment areas", "CO2 Laser for Face and Body", "CO2 fractional laser works on most areas of the body. Settings are adjusted because skin thickness varies from place to place.")}
 ${k.areas([["Face", "Acne scars, wrinkles, pores, texture"], ["Under the eyes", "Crepey skin and fine lines"], ["Neck", "Lines, loose and sun-damaged skin"], ["Tummy &amp; thighs", "Stretch marks"], ["Arms &amp; legs", "Accident, burn and surgical scars"], ["Hands &amp; chest", "Sun spots and ageing skin"]])}`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "CO2 Laser Aftercare", "Careful aftercare speeds up healing and protects your results.")}${tabs("aftercare", [
   { tab: "Days 1–3", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Cleanse gently with cool water and a mild cleanser", "Apply the healing ointment several times a day", "Use cold packs wrapped in cloth for swelling", "Sleep with your head slightly raised"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Makeup and any active skincare", "Hot showers, steam, saunas and workouts", "Direct sun, even for short trips", "Touching or scratching your skin"], warn)}</div></div>` },
   { tab: "Days 4–10", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Keep moisturising. Flaking is normal", "Switch to a gentle moisturiser once flaking stops", "Start mineral sunscreen when your doctor says so", "Drink plenty of water"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Pulling off flakes or crusts", "Swimming pools and the beach", "Waxing, threading or facials", "Retinoids and acids for 2 weeks"], warn)}</div></div>` },
   { tab: "Long-term", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Morning</h3>${list(["Gentle cleanser", "Brightening or antioxidant serum, when allowed", "Moisturiser", "SPF 50, reapplied outdoors"])}</div><div class="cp-card"><h3 class="font-serif">Night</h3>${list(["Gentle cleanser", "Prescribed cream if you are prone to pigmentation", "Barrier-repair moisturiser", "Follow-up visit before your next session"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Your skin type", "Is CO2 Laser Right for Your Skin?", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Indian and darker skin tones", "CO2 laser is safe for darker skin, but there is a higher chance of temporary darkening (post-inflammatory hyperpigmentation). We lower that risk with skin priming, gentler settings, wider gaps between sessions and strict sun protection. For some people we may suggest MNRF instead."],
   ["Oily, acne-prone skin", "Wait until active acne is under control before starting, as the laser works best on scars rather than active pimples. We can treat breakouts first with peels or medication."],
   ["Sensitive skin", "We start with lighter settings and check how your skin reacts before moving to stronger passes."],
   ["Mature skin", "CO2 is excellent for lines, loose skin and sun damage. Results often look best when combined with skin boosters or HIFU."],
   ["Recently tanned skin", "Let your tan settle for at least 2 to 4 weeks before treatment. Laser on tanned skin raises the risk of pigmentation."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "Our Dual Laser vs CO2 Alone, MNRF and Chemical Peels", "Here is how our CO2 + Erbium Glass 1550nm laser compares with other popular treatments for scars and texture.")}
 ${k.compareTable(["CO2 + Erbium Glass 1550 (Facelit)", "CO2 laser alone", '<a href="/mnrf-treatment/">MNRF</a>', '<a href="/chemical-peel-treatment/">Chemical Peel</a>'], [
   ["Best for", "Acne scars, wrinkles, pores, stretch marks, texture", "Deep scars and wrinkles", "Acne scars, pores, tightening", "Pigmentation, acne, dullness"],
   ["How it works", "Surface resurfacing + deep non-ablative collagen", "Surface resurfacing + heat", "Needles with radiofrequency", "Acid removes the top layer"],
   ["Downtime", "3–5 days (combined mode)", "5–7 days", "1–3 days", "0–7 days"],
   ["Sessions", "3–5", "3–5", "3–6", "4–6"],
   ["Suits darker skin", "Yes, Erbium mode is gentler", "Yes, with care", "Very well", "Yes, right peel"],
   ["Results for deep scars", "Excellent", "Excellent", "Very good", "Mild"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for CO2 Laser in Trivandrum?</h2>
 ${img("825-Trivandrum-clinic.webp", "Facelit skin clinic treatment room in Trivandrum", 1024, 585, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["One-to-one doctor consultation", "Our doctors examine your skin, go through your medical history and talk through what you want to change before planning anything."],
   ["Settings tailored to Indian skin", "We adjust depth, density and energy for your skin tone and concern, and prime your skin when needed, to keep the risk of pigmentation low."],
   [`${FDA} dual laser`, "Our CO2 + Erbium Glass 1550nm machine lets us combine powerful resurfacing with gentle collagen building, for strong results and quicker recovery."],
   ["Safe and sterile", "Every treatment happens in a clean, sterile room following strict hygiene standards."],
   ["Guidance before and after", "You get clear pre-care and aftercare instructions, and we review your healing and progress before every session."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "CO2 Laser Side Effects and Who Should Wait", "In experienced hands, CO2 fractional laser is safe. Here is what is normal and when it is better to wait.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Redness and warmth for 2 to 5 days, with pinkness that fades over a few weeks", "Mild swelling, especially around the eyes", "Flaking and a sandpaper feel for 3 to 7 days", "Temporary darkening in some darker skin types, which we treat with creams", "Itching as the skin heals"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant or breastfeeding", "Have taken oral isotretinoin in the last 6 months", "Have active acne, infection, cold sores or eczema on the area", "Tend to form keloids", "Have a fresh tan or sunburn", "Have diabetes, a bleeding disorder or take blood thinners"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "CO2 Fractional Laser FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Related treatments &amp; reading", "Explore More Scar and Skin Treatments", "")}
 ${k.links([["/best-laser-treatment-for-deep-acne-scars/", "Guide", "Best laser for deep acne scars"], ["/acne-scar-treatment-in-trivandrum/", "Treatment", "Acne scar treatment in Trivandrum"], ["/mnrf-treatment/", "Treatment", "MNRF treatment"], ["/co2-erbium-glass-1550nm/", "Treatment", "CO2 &amp; Erbium Glass 1550nm"], ["/how-to-get-rid-of-chickenpox-scars-on-face/", "Guide", "Chickenpox scars on the face"], ["/how-to-remove-scars-from-face-permanently/", "Guide", "Removing scars from the face"]])}`),

  k.cta("Not sure if CO2 laser is right for you?", "Book a consultation and our doctors will check your skin, explain your options and plan the right number of sessions for you."),
];

k.writePage(process.argv[2], sections, {
  title: "CO2 Fractional Laser in Trivandrum | CO2 + Erbium Glass 1550nm | Facelit",
  desc: `CO2 fractional laser in Trivandrum with an ${FDA.replace("US ", "")} CO2 + Erbium Glass 1550nm dual laser. Treats acne scars, wrinkles, stretch marks and pores with less downtime.`,
  image: "https://facelit.in/wp-content/uploads/2026/07/586-co2-fraction-laser.webp",
  faqs,
  procedure: { name: "CO2 Fractional Laser Resurfacing", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face, neck, abdomen, thighs, arms",
    howPerformed: "After numbing cream, a doctor treats the skin with a dual CO2 (10,600nm) and Erbium Glass (1550nm) fractional laser, treating thousands of microscopic dots while leaving healthy skin in between.",
    preparation: "Doctor consultation, stopping retinoids and acids 5 to 7 days before, avoiding sun and tanning, and skin priming for darker skin.",
    followup: "Healing ointment, gentle cleansing, strict sun protection and avoiding makeup and heat until the skin has healed, usually 5 to 7 days." },
  crumbs: [["Home", "https://facelit.in/"], ["Skin Treatments", "https://facelit.in/skin-treatments/"], ["CO2 Fractional Laser", "https://facelit.in/co2-fractional-laser/"]],
});
