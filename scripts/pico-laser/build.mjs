// Builds the redesigned /pico-450-laser/ page.
// Usage (from facelit-site/): node scripts/pico-laser/build.mjs content/pages/pico-450-laser.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

// Marketing claims to confirm before going live (kept in one place so they're easy to change).
const FDA = "US FDA-cleared";
const USP = "Only in Trivandrum at Facelit";
const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const benefits = [
  ["tone", "Fades Stubborn Pigmentation", "Breaks up melasma, dark patches and post-acne marks that creams can't shift."],
  ["sun", "Clears Freckles &amp; Sun Spots", "Targets freckles, age spots and sun spots with pinpoint precision."],
  ["spark", "Brighter, Even Skin Tone", "Pico toning lifts dullness and tan for a clear, even glow."],
  ["layers", "Removes Tattoos Faster", "Shatters ink into tiny particles, so tattoos fade in fewer sessions than older lasers."],
  ["pores", "Refines Pores &amp; Texture", "Stimulates collagen for smoother skin and tighter-looking pores."],
  ["wave", "Softens Acne Marks", "Fades dark acne marks and helps improve shallow scars."],
  ["leaf", "Safer for Indian Skin", "Less heat than older lasers means a lower risk of post-laser darkening."],
  ["heal", "Little to No Downtime", "Pico toning needs no downtime at all. Most people go straight back to work."],
];

const finderResults = [
  { v: "melasma", label: "Melasma", img: [A + "Pigmentation-on-the-Face.webp", "Melasma on the cheek of Indian skin", 1080, 1080], title: "Melasma Control Plan",
    text: "Melasma needs gentle, regular treatment. Low-energy pico toning breaks up pigment without overheating the skin, which is what keeps melasma calm.",
    none: "Weekly or fortnightly pico toning with a prescribed home cream.", some: "Pico toning, plus spot treatment on any stubborn patches.",
    sessions: "6–10, every 1–2 weeks", combine: "Depigmenting peels, home creams, sunscreen" },
  { v: "marks", label: "Acne marks &amp; dark spots", img: [A + "black-marks.webp", "Dark acne marks and pigmentation along the jaw on Indian skin", 1080, 1080], title: "Clear Marks Plan",
    text: "Post-acne dark marks (PIH) respond really well to pico laser, often fading noticeably after a few sessions.",
    none: "Pico toning sessions to fade marks gradually.", some: "Pico toning plus targeted spot shots on darker marks.",
    sessions: "4–6, every 2–4 weeks", combine: "Chemical peels, acne control" },
  { v: "freckles", label: "Freckles &amp; sun spots", img: [B + "187-3-6.webp", "Freckles and sun spots around the eye on brown skin", 1080, 1080], title: "Spot Clearing Plan",
    text: "Pico spot treatment shatters each freckle or sun spot. They darken, flake off in a week and leave clearer skin behind.",
    none: "Gentle toning to lighten spots slowly with no crusting.", some: "Targeted spot treatment for faster, clearer results (small crusts for 5 to 7 days).",
    sessions: "1–3, every 4 weeks", combine: "Sunscreen, brightening serum" },
  { v: "tan", label: "Tan &amp; dull, uneven tone", img: [A + "Tan-and-Dark-Patches-on-Face2.webp", "Tan and uneven tone on Indian skin", 1080, 1080], title: "Pico Glow Plan",
    text: "Pico toning, sometimes called the \"laser facial\", brightens dull, tanned skin and evens out tone with zero downtime.",
    none: "Pico toning every 2 weeks. Skin looks brighter after each session.", some: "Pico toning plus a light peel between sessions for faster results.",
    sessions: "4–6, every 2 weeks", combine: "HydraFacial, chemical peels" },
  { v: "lip", label: "Dark lips &amp; mouth area", img: [B + "132-Untitled-design-10.webp", "Pigmentation above the upper lip on brown Indian skin", 1080, 1080], title: "Lip &amp; Mouth Area Plan",
    text: "Dark patches around the mouth and on the lips are common in Indian skin. Gentle pico sessions lighten them safely.",
    none: "Low-energy toning around the mouth and lips.", some: "Toning plus focused passes on darker areas.",
    sessions: "4–6, every 2–4 weeks", combine: "Brightening creams, lip care" },
  { v: "tattoo", label: "Tattoo removal", img: [B + "157-tattoo-removal.webp", "Pico laser tattoo removal on the neck", 1080, 1080], title: "Tattoo Removal Plan",
    text: "Picosecond pulses shatter ink into tiny particles your body clears away, so tattoos fade in fewer sessions than with older lasers.",
    none: "Tattoo removal always involves a few days of healing. We space sessions to fit your schedule.", some: "Full-strength sessions every 6 to 8 weeks for the fastest fading.",
    sessions: "4–10, depending on ink and size", combine: "Patience and sunscreen" },
];

const concerns = [
  { tab: "Melasma", img: [A + "Pigmentation-on-the-Face.webp", "Melasma on the cheek of Indian skin", 1080, 1080], title: "Melasma",
    text: "Melasma shows up as brown patches on the cheeks, forehead or upper lip, often triggered by hormones and sun. Strong heat can make it worse, which is why pico toning works so well: it breaks pigment with very short pulses and very little heat.",
    more: ["Gentle, low-heat toning", "Gradual, steady lightening", "Works alongside home creams"], rec: ["Depigmenting peels", "Prescription creams"], sessions: "6–10, every 1–2 weeks",
    link: ["/best-treatment-for-melasma-on-face/", "Best treatment for melasma"] },
  { tab: "Acne marks (PIH)", img: [A + "black-marks.webp", "Dark acne marks on Indian skin", 1080, 1080], title: "Acne marks &amp; post-inflammatory pigmentation",
    text: "After a pimple heals, Indian skin often leaves a dark mark behind. Pico laser breaks up this extra pigment, helping marks fade much faster than they would on their own.",
    more: ["Fades dark post-acne marks", "Evens out patchy skin", "Low risk of new darkening"], rec: ["Chemical peels", "Acne control"], sessions: "4–6, every 2–4 weeks",
    link: ["/how-to-fade-acne-scars-on-dark-skin/", "Fading acne marks on dark skin"] },
  { tab: "Freckles &amp; sun spots", img: [B + "187-3-6.webp", "Freckles and sun spots on brown skin", 1080, 1080], title: "Freckles, sun spots &amp; age spots",
    text: "Spots from years of sun respond very quickly. A targeted pico shot breaks each spot, which turns slightly darker, flakes off within a week and leaves clearer skin.",
    more: ["Often clear in 1 to 3 sessions", "Precise, spot-by-spot treatment", "Small crusts that heal in a week"], rec: ["Daily sunscreen"], sessions: "1–3, every 4 weeks" },
  { tab: "Tan &amp; uneven tone", img: [A + "Tan-and-Dark-Patches-on-Face2.webp", "Tan and dark patches on Indian skin", 1080, 1080], title: "Tan, dullness &amp; uneven tone",
    text: "Pico toning sweeps low-energy pulses over the whole face to break up surface pigment and boost collagen. Skin looks brighter and more even, with no downtime.",
    more: ["Brighter, glowing skin", "Lifts stubborn tan", "Zero downtime"], rec: ["HydraFacial", "Chemical peels"], sessions: "4–6, every 2 weeks",
    link: ["/best-laser-treatments-to-remove-sun-tan-effectively/", "Laser treatments for tan"] },
  { tab: "Dark lips &amp; mouth area", img: [B + "132-Untitled-design-10.webp", "Pigmentation around the mouth on brown skin", 1080, 1080], title: "Dark lips &amp; pigmentation around the mouth",
    text: "Darkness on the lips and around the mouth is common and hard to treat with creams. Gentle pico sessions can lighten these areas safely.",
    more: ["Lighter, more even lips", "Clears darkness above the lip", "Gentle settings"], rec: ["Lip care", "Brightening creams"], sessions: "4–6, every 2–4 weeks" },
  { tab: "Nevus of Ota &amp; ABNOM", img: [B + "654-Dark-Circles1.webp", "Indian woman with dark pigmentation around the eyes", 1080, 1080], title: "Nevus of Ota, ABNOM &amp; deep pigment",
    text: "Some pigment sits deep in the skin, like nevus of Ota or ABNOM (bluish-grey patches on the cheeks and around the eyes). Pico laser reaches this deeper pigment and is one of the most effective treatments for it.",
    more: ["Reaches deep dermal pigment", "Gradual, lasting lightening", "Planned by our doctors"], rec: ["Doctor diagnosis first"], recLabel: "Important", sessions: "5–10, every 6–8 weeks" },
  { tab: "Tattoo removal", img: [B + "157-tattoo-removal.webp", "Tattoo removal with pico laser", 1080, 1080], title: "Tattoo removal",
    text: "Older lasers heat ink slowly. Picosecond pulses are so fast they shatter ink into dust-like particles that your body clears more easily. Black and dark blue fade fastest.",
    more: ["Fewer sessions than older lasers", "Works on black, blue and many colours", "Less heat on the skin"], rec: ["Numbing cream", "Sun protection"], sessions: "4–10, every 6–8 weeks",
    link: ["/everything-you-need-to-know-about-permanent-tattoo-removal/", "Tattoo removal guide"] },
  { tab: "Open pores &amp; texture", img: [A + "lage-pores.webp", "Open pores on Indian skin", 1080, 1080], title: "Open pores, fine lines &amp; texture",
    text: "Pico energy also triggers collagen deep in the skin. With a course of sessions, pores look tighter, texture smoother and fine lines softer.",
    more: ["Tighter-looking pores", "Smoother texture", "Healthy glow"], rec: ["Microneedling", "HydraFacial"], sessions: "4–6, every 3–4 weeks",
    link: ["/open-pores-treatment-in-trivandrum/", "Open pores treatment"] },
];

const modes = [
  ["Pico Toning", 1, "Low-energy pulses over the whole face to break up pigment and brighten skin.", "melasma, tan, dull and uneven tone", "none", "6–10, every 1–2 weeks"],
  ["Pico Spot", 2, "Focused shots on individual spots to shatter concentrated pigment.", "freckles, sun spots, age spots", "small crusts for 5–7 days", "1–3, every 4 weeks"],
  ["Tattoo Mode", 3, "High-power picosecond pulses that shatter ink particles.", "black, blue and coloured tattoos", "5–10 days of healing", "4–10, every 6–8 weeks"],
];

const menuRows = [
  ["Pico 450 Laser: Face", "Face", "pigment glow", "Say goodbye to uneven skin tone. Treats pigmentation, marks and dullness on the face.", ["Pigmentation", "Glow"], "Pico toning and spot treatment as needed for your face.", "None to a few days", "1"],
  ["Pico 450 Laser: Body", "Body", "pigment", "Even out tone on the neck, underarms, back, hands or legs.", ["Body", "Uneven tone"], "Pico toning adapted for body skin.", "None to a few days", "1"],
  ["Pico Toning Course", "Package", "pigment glow", "A course of pico toning for melasma, tan and lasting brightness.", ["Melasma", "Package"], "Regular low-energy sessions every 1 to 2 weeks.", "None", "6"],
  ["Melasma Programme", "Programme", "pigment", "Pico toning combined with peels and a prescribed home routine for stubborn melasma.", ["Melasma"], "Doctor-planned mix of toning, peels and creams.", "None", "8–10"],
  ["Tattoo Removal", "Per session", "tattoo", "Fade unwanted tattoos faster with picosecond technology. Priced by tattoo size.", ["Tattoos"], "High-power pico pulses shatter the ink, which your body clears over weeks.", "5–10 days", "4–10"],
  ["Lip &amp; Under-eye Pigmentation", "Targeted", "pigment", "Gentle sessions for dark lips, the area above the lip and dark under-eyes.", ["Lips", "Under-eyes"], "Low-energy pico toning on delicate areas.", "None", "4–6"],
  ["Laser Hair Toning", "Face", "glow", "Lightens fine facial hair so it blends with your skin, while brightening tone.", ["Facial hair", "Glow"], "Pico toning gives fine facial hair a softer, bleached look.", "None", "4–6"],
  ["Nail Fungus Laser", "Nails", "other", "Laser treatment to help clear fungal infections of the nails.", ["Nails"], "Laser energy targets the fungus under the nail.", "None", "4–6"],
];

const faqs = [
  ["What makes a pico laser different from a regular laser?", "Older (Q-switched) lasers fire in nanoseconds and mostly heat pigment. A pico laser fires in picoseconds, a thousand times faster, so it shatters pigment with a pressure wave and much less heat. That means better results, fewer sessions and less risk of darkening, which matters a lot for Indian skin."],
  ["What is PicoCare 450?", "PicoCare 450 is an advanced picosecond Nd:YAG laser with an ultra-short 450-picosecond pulse and very high peak power. It treats pigmentation, melasma, freckles, tattoos and skin rejuvenation with precision and minimal downtime."],
  ["Is PicoCare 450 available elsewhere in Trivandrum?", "Facelit is the only clinic in Trivandrum offering PicoCare 450, so you can get true picosecond treatment without travelling to another city."],
  ["Does pico laser hurt?", "Pico toning feels like light, warm snaps on the skin and most people don't need numbing. Spot and tattoo treatments are stronger, so we apply numbing cream first."],
  ["How many sessions will I need?", "It depends on the concern. Freckles may clear in 1 to 3 sessions, acne marks in 4 to 6, and melasma usually needs 6 to 10 toning sessions. Tattoos take 4 to 10 depending on the ink."],
  ["Is there any downtime?", "Pico toning has no downtime. Spot treatment leaves small dark crusts that flake off in 5 to 7 days. Tattoo removal needs about a week of healing."],
  ["Is pico laser safe for Indian skin?", "Yes. Because it uses far less heat than older lasers, the risk of post-laser darkening is lower. We still adjust settings carefully and ask you to use sunscreen every day."],
  ["Can pico laser cure melasma permanently?", "Melasma can't be cured permanently, as hormones and sun can trigger it again. Pico toning can lighten it a lot, and a good home routine and sunscreen keep it under control."],
  ["When will I see results?", "Skin often looks brighter after the first toning session. Spots fade within 1 to 2 weeks of a spot treatment, while melasma and tattoos improve gradually over a course."],
  ["Can pico laser remove all tattoo colours?", "It works best on black and dark blue. Red and some other colours also respond well. Green and light blue can be more stubborn. We'll assess your tattoo at the consultation."],
  ["Can I combine pico laser with other treatments?", "Yes. It pairs well with chemical peels, HydraFacial and microneedling. Your doctor will space them safely."],
  ["Where can I get pico laser treatment in Kerala?", "PicoCare 450 is available at Facelit in Trivandrum (Kowdiar). Our team can also guide patients from Karunagappally and Guruvayur."],
  ["How much does pico laser treatment cost?", "Cost depends on the area, the concern and the number of sessions. Tattoo removal is priced by size. Book a consultation for a personalised quote."],
];

const sections = [
  k.hero({
    tags: ["Skin", "PicoCare 450", USP], h1: "PICO 450 Laser Treatment",
    img: [B + "707-skin-care.webp", "Smiling Indian woman with clear, even-toned skin after pico laser treatment at Facelit"], pos: "center 35%",
    intro: `Pigmentation, melasma, acne marks, freckles and tattoos that won't budge? The PicoCare 450 picosecond laser breaks them up with ultra-fast pulses and very little heat, so it's safer for Indian skin and needs little to no downtime. And in Trivandrum, you'll only find it at Facelit.`,
    facts: [["450 ps", "Ultra-short pulse"], ["0–7 days", "Downtime"], ["4–10", "Sessions typical"], ["Only here", "In Trivandrum"]],
    cta2: ["#finder", "Find your plan"],
  }),
  k.jump([["overview", "Overview"], ["machine", "PicoCare 450"], ["finder", "Find your plan"], ["concerns", "Concerns"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is a Pico Laser?</h2>
 <div class="cp-prose">
 <p>A pico laser fires pulses of light that last only a few hundred picoseconds, trillionths of a second. At that speed, the energy hits pigment or tattoo ink like a tiny shockwave and shatters it into dust-fine particles, instead of slowly heating it. Your body's natural clean-up system then clears those particles away over the following weeks.</p>
 <p>Less heat means less irritation, fewer sessions and a lower chance of the skin darkening afterwards. That's why pico lasers have become the go-to choice for pigmentation and tattoo removal, especially on Indian skin.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: picosecond vs nanosecond lasers ${k.plus}</summary>
 <div class="cp-prose">
 <p>Older Q-switched lasers work in nanoseconds. Pico lasers are about a thousand times faster. In practice, that means:</p>
 ${list(["<b>Shatter, don't burn.</b> Pigment breaks into much smaller particles that clear faster.", "<b>Less heat in the skin</b>, so less redness and lower risk of post-laser darkening.", "<b>Fewer sessions</b> for tattoos and stubborn pigment.", "<b>Collagen boost</b>, which also improves pores and texture."])}
 <p>Read our guide to <a href="/pigmentation-removal-treatments-which-one-works-best/">which pigmentation treatment works best</a>.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How pico laser works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Ultra-fast pulse</b><span>450-picosecond light pulses reach the pigment or ink.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Shatter</b><span>Pigment breaks into dust-fine particles with little heat.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Clear</b><span>Your body flushes the particles away over a few weeks.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(A + "Pigmentation-on-the-Face.webp", "Melasma and pigmentation on Indian skin", 1080, 1080)}
 ${img(A + "skin-after-1-scaled.webp", "Indian woman with clear, even-toned skin", 1920, 2560)}
 </div>
 </div>`),

  shell("machine", `${head("Our technology", "PicoCare 450: Only in Trivandrum at Facelit", "This laser is our USP. No other clinic in Trivandrum has it, so you get true picosecond technology without travelling to another city.")}
 ${k.machine({ imgSrc: "/wp-content/uploads/2026/11/picocare-450-machine.webp", imgAlt: "PicoCare 450 picosecond Nd:YAG laser machine at Facelit, Trivandrum", w: 470, h: 790, badge: FDA,
   name: "PicoCare 450 Nd:YAG Picosecond Laser", text: "PicoCare 450 is a true picosecond laser, firing an ultra-short 450-picosecond pulse at up to 1,300 megawatts of peak power. It aims precisely at pigment and ink while leaving the surrounding skin largely untouched, so treatments are faster, more comfortable and need less recovery than with older lasers.",
   tags: [USP, FDA, "True picosecond", "Nd:YAG 1064 &amp; 532 nm", "All skin types"],
   specs: [["450 ps", "One of the shortest pulses available"], ["1,300 MW", "Very high peak power to shatter pigment"], ["2 wavelengths", "Deep and surface pigment, many ink colours"], ["Low heat", "Lower risk of darkening on Indian skin"]],
   link: ["/picocare450-nd-yag/", "See the full machine details"] })}
 <h3 class="cp-h3 font-serif" style="margin-top:2.5rem">What PicoCare 450 can do</h3>
 ${tabs("modes", [
   { tab: "Pico Toning", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Gentle, low-energy pulses swept across the face break up pigment and stimulate collagen. It's the go-to for melasma, tan and dull, uneven tone, with no downtime at all.</p>${list(["Brighter, more even skin", "Gentle enough for melasma", "No downtime"])}</div><div class="cp-meta"><div><b>Best for:</b> melasma, tan, dullness, PIH</div><div><b>Downtime:</b> none</div><div><b>Sessions:</b> 6–10, every 1–2 weeks</div></div></div>` },
   { tab: "Pigment Spots", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Focused shots on individual freckles, sun spots and age spots. Each spot darkens, forms a tiny crust and flakes off within a week, leaving clearer skin.</p>${list(["Fast, visible results", "Precise spot-by-spot treatment", "Often clear in 1 to 3 sessions"])}</div><div class="cp-meta"><div><b>Best for:</b> freckles, sun spots, lentigines</div><div><b>Downtime:</b> small crusts for 5–7 days</div><div><b>Sessions:</b> 1–3</div></div></div>` },
   { tab: "Deep Pigment", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">The 1064 nm wavelength reaches pigment deep in the skin, such as nevus of Ota and ABNOM, which most treatments can't touch.</p>${list(["Reaches deep dermal pigment", "Gradual, lasting lightening", "Doctor diagnosis first"])}</div><div class="cp-meta"><div><b>Best for:</b> nevus of Ota, ABNOM, deep PIH</div><div><b>Downtime:</b> 1–3 days</div><div><b>Sessions:</b> 5–10, every 6–8 weeks</div></div></div>` },
   { tab: "Tattoo Removal", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">High-power picosecond pulses shatter tattoo ink into tiny particles. Black and dark blue fade fastest, and two wavelengths help with several colours.</p>${list(["Fewer sessions than older lasers", "Less heat and scarring risk", "Works on many ink colours"])}</div><div class="cp-meta"><div><b>Best for:</b> professional and amateur tattoos</div><div><b>Downtime:</b> 5–10 days</div><div><b>Sessions:</b> 4–10, every 6–8 weeks</div></div></div>` },
   { tab: "Skin Rejuvenation", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Pico energy also kick-starts collagen, improving pores, fine lines and overall texture, and gives fine facial hair a softer, lighter look.</p>${list(["Tighter-looking pores", "Smoother texture", "Laser hair toning effect"])}</div><div class="cp-meta"><div><b>Best for:</b> pores, texture, fine lines</div><div><b>Downtime:</b> none to 1 day</div><div><b>Sessions:</b> 4–6, every 3–4 weeks</div></div></div>` },
 ])}`),

  shell("finder", `${head("Find your plan", "Which Pico Treatment Is Right for You?", "Answer two quick questions and see the plan our doctors most often recommend. We confirm your final plan at your consultation.")}
 ${k.finder({ q1: "What would you most like to clear?", q2: { label: "Can you have a few days of small crusts or healing?", options: [["none", "No, I need zero downtime"], ["some", "Yes, a few days is fine"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of PICO 450 Laser", "One laser for pigmentation, tattoos and skin rejuvenation, with less heat and less downtime.")}${k.benefitsGrid(benefits)}`),

  shell("concerns", `${head("Is it right for you?", "Skin Problems Pico Laser Can Treat", "Tap a concern to see how pico laser helps, what we pair it with and how many sessions you may need.")}
 ${k.concernTabs("concerns", concerns)}`),

  shell("", `${head("Treatment modes", "Pico Toning, Spot Treatment or Tattoo Mode?", "The same laser, set very differently depending on what we're treating.")}${k.depthCards(modes)}`),

  shell("plans", `${head("Packages", "Pico 450 Laser Packages at Facelit", "Single sessions for face or body, courses for melasma and tone, and tattoo removal priced by size.")}
 ${k.menu([["all", "All"], ["pigment", "Pigmentation"], ["glow", "Glow &amp; tone"], ["tattoo", "Tattoos"], ["other", "Other"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Pico Laser Procedure: Step by Step</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor consulting an Indian patient before pico laser", 1151, 768], lead: "Your consultation decides the right mode and settings for your skin.",
     items: ["Your doctor examines your skin and pigment, and reviews your medical history.", "Stay out of strong sun for 2 weeks before. Tanned skin raises the risk of complications.", "Stop scrubs, retinoids and bleaching creams 3 days before.", "Tell us about any new medicines, as some make skin light-sensitive.", "Come with clean skin, without makeup."] },
   { tab: "02 · During", img: [A + "eco-hero.webp", "Facelit doctor in the laser treatment room", 1726, 972], lead: "Most sessions take 20 to 30 minutes.",
     items: ["Your skin is cleansed. Numbing cream is applied for spot or tattoo work.", "You wear protective eye shields throughout.", "The doctor passes the PicoCare handpiece over the area.", "Toning feels like light, warm snaps. Spot and tattoo work is a little stronger.", "A cooling gel, moisturiser and SPF 50 are applied at the end."] },
   { tab: "03 · After", img: [A + "skin-hero-1.webp", "Indian woman with clear, glowing skin", 1726, 1152], lead: "Most people go straight back to their day. The full aftercare plan is below.",
     items: ["Mild redness for a few hours after toning.", "Treated spots darken and form tiny crusts that flake off in 5 to 7 days.", "Tattoos may look white or swollen for a short time, then heal over a week.", "Apply moisturiser and SPF 50+ every day.", "Avoid retinol, exfoliants and other skin treatments for 5 days."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Recovery &amp; results", "Pico Laser Results Timeline", "Pico laser clears pigment in stages as your body flushes the shattered particles away.")}
 ${k.timeline([["Right after", "Fresh &amp; bright", "Skin looks brighter after toning. Spots may look a little darker."], ["Day 3–7", "Spots flake off", "Treated spots crust and flake, revealing clearer skin."], ["Weeks 2–4", "Pigment fades", "Marks and patches keep lightening as your body clears the particles."], ["After a course", "Even, clear skin", "Pigmentation is much lighter and tone more even. Sunscreen keeps it that way."]])}
 </div>
 <div>
 <figure style="margin:0">${img(A + "skin-after-1-scaled.webp", "Indian woman with clear, even-toned skin", 1920, 2560, "cp-img cp-img--43")}<figcaption class="cp-note">Model image. Results vary with your skin, the concern and the number of sessions.</figcaption></figure>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have melasma, acne marks or dark patches", "Have freckles or sun spots", "Want a tattoo removed or faded", "Want brighter skin with no downtime"])}</div>
 <div class="cp-card"><h3 class="font-serif">Wait if you have</h3>${list(["A fresh tan or sunburn", "Active infection or cold sores on the area", "Been on isotretinoin recently", "Pregnancy (we usually postpone)"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("", `${head("Treatment areas", "Pico Laser for Face and Body", "PicoCare 450 can treat pigmentation and tattoos almost anywhere on the body.")}
 ${k.areas([["Face", "Melasma, marks, spots, tone"], ["Lips &amp; mouth", "Dark lips and upper lip"], ["Under the eyes", "Dark circles from pigment"], ["Neck &amp; underarms", "Darkening and uneven tone"], ["Hands &amp; arms", "Sun spots and tattoos"], ["Back &amp; legs", "Marks, tan and tattoos"]])}`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "Pico Laser Aftercare", "Sun protection is the most important part of protecting your results.")}${tabs("aftercare", [
   { tab: "First 48 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Use a gentle cleanser and cool water", "Moisturise 2 to 3 times a day", "Apply SPF 50+ and reapply outdoors", "Use a cool compress if skin feels warm"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Hot baths, saunas and steam", "Intense workouts", "Makeup on crusted spots", "Scratching or picking"], warn)}</div></div>` },
   { tab: "Days 3–7", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Let crusts fall off on their own", "Keep moisturising", "Wear a hat or carry an umbrella outdoors", "Use SPF every single day"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Retinol and exfoliants for 5 days", "Other skin treatments for a week", "Direct midday sun", "Swimming until crusts heal"], warn)}</div></div>` },
   { tab: "Long-term", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Morning</h3>${list(["Gentle cleanser", "Brightening serum if your doctor approves", "Moisturiser", "SPF 50, reapplied every 2 to 3 hours outdoors"])}</div><div class="cp-card"><h3 class="font-serif">Night</h3>${list(["Gentle cleanser", "Prescribed depigmenting cream (for melasma)", "Moisturiser", "Keep up your session schedule"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Your skin type", "Pico Laser for Every Skin Type", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Indian and darker skin tones", "Pico laser is one of the safest laser options for darker skin because it uses so little heat. We start with conservative settings and build up, and ask for strict sun protection."],
   ["Melasma-prone skin", "Pico toning is gentle enough for melasma when done at the right settings and spacing. Combining it with home creams and sunscreen gives the best control."],
   ["Sensitive skin", "Toning is usually well tolerated. We avoid treating over irritated skin and may calm it first."],
   ["Oily, acne-prone skin", "Great for acne marks once breakouts are under control. Pico toning can also help with oiliness and pores."],
   ["Recently tanned skin", "We wait for a fresh tan to settle (2 to 4 weeks) before laser, to reduce the risk of pigmentation."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "Pico Laser vs Q-Switched Laser, Chemical Peels and CO2 Laser", "How PicoCare 450 compares with other treatments for pigmentation and tattoos.")}
 ${k.compareTable(["PicoCare 450 (Pico)", "Q-switched (nano) laser", '<a href="/chemical-peel-treatment/">Chemical peel</a>', '<a href="/co2-fractional-laser/">CO2 laser</a>'], [
   ["Best for", "Pigmentation, melasma, tattoos", "Pigmentation, tattoos", "Pigmentation, acne, dullness", "Scars, wrinkles, texture"],
   ["How it works", "Shatters pigment with ultra-fast pulses", "Heats pigment with slower pulses", "Acid removes the top layer", "Resurfaces skin with heat"],
   ["Heat in the skin", "Very low", "Moderate", "None", "High"],
   ["Downtime", "0–7 days", "0–7 days", "0–7 days", "3–7 days"],
   ["Sessions for tattoos", "Fewer", "More", "Not suitable", "Not suitable"],
   ["Pigmentation risk on Indian skin", "Low", "Moderate", "Low with the right peel", "Moderate (managed with care)"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Pico Laser in Trivandrum?</h2>
 ${img(B + "825-Trivandrum-clinic.webp", "Facelit skin clinic treatment room in Trivandrum", 1024, 585, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["The only PicoCare 450 in Trivandrum", "This laser is our USP. You get true picosecond technology locally, without travelling to another city."],
   ["Doctor-led diagnosis", "Pigment comes in many types. Our doctors identify yours first (melasma, PIH, freckles or deeper pigment) and plan the right mode."],
   ["Settings for Indian skin", "We start conservatively and adjust every session to keep the risk of darkening low."],
   ["Complete pigmentation care", "Peels, HydraFacial, microneedling and home creams are all under one roof, so your plan covers everything."],
   ["Safe and sterile", "Treatments follow strict hygiene and laser-safety protocols, with eye protection every time."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Pico Laser Side Effects and Who Should Wait", "Pico laser is well tolerated. Here's what's normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Mild redness and warmth for a few hours", "Treated spots darkening before they flake off", "Small crusts for 5 to 7 days after spot work", "Swelling or pinpoint bleeding after tattoo removal", "Temporary lightening or darkening of skin (uncommon)"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant or breastfeeding", "Have a fresh tan or sunburn", "Have taken isotretinoin in the last 6 months", "Use light-sensitive medicines", "Have active infection, cold sores or a history of keloids"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "Pico Laser FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Related treatments &amp; reading", "Explore More Pigmentation Treatments", "")}
 ${k.links([["/picocare450-nd-yag/", "Machine", "PicoCare 450 Nd:YAG"], ["/best-treatment-for-melasma-on-face/", "Guide", "Best treatment for melasma"], ["/pigmentation-removal-treatments-which-one-works-best/", "Guide", "Which pigmentation treatment works best"], ["/everything-you-need-to-know-about-permanent-tattoo-removal/", "Guide", "Permanent tattoo removal"], ["/chemical-peel-for-pigmentation-removal/", "Treatment", "Chemical peel for pigmentation"], ["/hydrafacial-treatments/", "Treatment", "HydraFacial"]])}`),

  k.cta("Not sure if pico laser is right for you?", "Book a consultation and our doctors will identify your type of pigmentation and plan the right PicoCare 450 treatment for you."),
];

k.writePage(process.argv[2], sections, {
  title: "PICO 450 Laser in Trivandrum | Melasma, Pigmentation & Tattoo | Facelit",
  desc: "Trivandrum's only PicoCare 450 picosecond laser, at Facelit. Clears melasma, acne marks, freckles, tan and tattoos with less heat and little downtime. Safe for Indian skin.",
  image: "https://facelit.in/wp-content/uploads/2026/11/picocare-450-machine.webp",
  faqs,
  procedure: { name: "Picosecond Laser Treatment (PicoCare 450)", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face, lips, neck, underarms, hands, arms, back, legs",
    howPerformed: "A doctor treats the skin with a PicoCare 450 Nd:YAG picosecond laser (450 ps pulse), using low-energy toning, targeted spot shots or tattoo settings to shatter pigment or ink.",
    preparation: "Doctor consultation; avoid sun and tanning for 2 weeks; stop scrubs, retinoids and bleaching creams 3 days before.",
    followup: "Moisturise, use SPF 50+ daily, let crusts fall off naturally, and avoid retinol, exfoliants and other treatments for 5 days." },
  crumbs: [["Home", "https://facelit.in/"], ["Skin Treatments", "https://facelit.in/skin-treatments/"], ["PICO 450 Laser", "https://facelit.in/pico-450-laser/"]],
});
