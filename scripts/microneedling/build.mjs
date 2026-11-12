// Builds the redesigned /microneedling/ page.
// Usage (from facelit-site/): node scripts/microneedling/build.mjs content/pages/microneedling.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const benefits = [
  ["wave", "Smoother Acne Scars", "Breaks up old scar tissue and builds fresh collagen to lift rolling and boxcar scars."],
  ["pores", "Tighter-looking Pores", "New collagen around each pore makes open pores look smaller."],
  ["clock", "Softer Fine Lines", "Thickens and firms the skin so lines around the eyes and mouth soften."],
  ["tone", "More Even Tone", "Helps fade pigmentation and post-acne marks, with no heat involved."],
  ["stretch", "Faded Stretch Marks", "Improves the texture and colour of stretch marks on the body."],
  ["drop", "Better Skincare Absorption", "Tiny channels let serums reach deeper, so they work harder."],
  ["leaf", "Safe for Indian Skin", "No heat or laser energy, so a very low risk of pigmentation on darker skin."],
  ["heal", "Quick Recovery", "Most people are back to normal in 1 to 3 days."],
];

const finderResults = [
  { v: "scars", label: "Acne scars", img: [A + "skin-before-1-scaled.webp", "Indian woman with acne scars and marks", 1920, 2560], title: "Scar Remodelling Plan",
    text: "Microneedling breaks down stiff scar tissue and triggers new collagen to fill in rolling and boxcar scars over a course of sessions.",
    light: "Medium-depth microneedling with PRP or exosomes, 1 to 2 days of pinkness.", deep: "Deeper scar-mode microneedling (often with subcision) for 2 to 3 days of redness and stronger results.",
    sessions: "4–6, every 4–6 weeks", combine: "PRP, subcision, TCA CROSS, MNRF" },
  { v: "pores", label: "Open pores", img: [A + "lage-pores.webp", "Open pores on brown Indian skin", 1080, 1080], title: "Pore Refining Plan",
    text: "Collagen built around each pore tightens and supports it, so pores look smaller and skin looks smoother.",
    light: "Light to medium microneedling with a hydrating serum.", deep: "Medium-depth sessions, or an upgrade to MNRF for very large pores.",
    sessions: "3–6, every 4 weeks", combine: "Salicylic peel, HydraFacial, MNRF" },
  { v: "lines", label: "Fine lines &amp; dull skin", img: [A + "8193-e1740745969395.webp", "Fine lines around the eye on Indian skin", 1080, 1009], title: "Collagen Boost Plan",
    text: "Gentle, regular microneedling thickens the skin and softens early lines, with a fresh glow after every session.",
    light: "Shallow \"glow\" microneedling with exosomes or a hydrating serum.", deep: "Medium-depth sessions with PRP for firmer, longer-lasting results.",
    sessions: "3–4, every 4 weeks", combine: "Exosomes, skin boosters, PDRN" },
  { v: "pigment", label: "Pigmentation &amp; marks", img: [A + "Pigmentation-on-the-Face.webp", "Pigmentation on Indian skin", 1080, 1080], title: "Even Tone Plan",
    text: "Microneedling renews the skin and lets brightening serums reach deeper, helping fade marks and patchy tone without heat.",
    light: "Shallow microneedling with a brightening serum, alternated with peels.", deep: "Medium-depth sessions with brightening serums, plus a home routine.",
    sessions: "4–6, every 3–4 weeks", combine: "Chemical peels, exosomes" },
  { v: "stretch", label: "Stretch marks", img: [B + "147-9.webp", "Stretch marks on the abdomen", 1080, 1080], title: "Stretch Mark Plan",
    text: "Deeper body microneedling rebuilds collagen inside the stretch marks so they become flatter, narrower and closer to your skin colour.",
    light: "Medium-depth sessions on newer, pinkish marks.", deep: "Deeper body microneedling with PRP for older, white marks.",
    sessions: "4–6, every 4–6 weeks", combine: "PRP, CO2 laser" },
  { v: "undereye", label: "Crepey under-eyes", img: [B + "654-Dark-Circles1.webp", "Indian woman with tired under-eyes and dark circles", 1080, 1080], title: "Under-eye Renewal Plan",
    text: "Very gentle, shallow microneedling thickens thin under-eye skin, softening fine lines and crepiness.",
    light: "Shallow under-eye microneedling with PRP or PDRN.", deep: "We keep under-eye work gentle. For deeper concerns we may suggest fillers or skin boosters.",
    sessions: "3–4, every 4 weeks", combine: "PRP, PDRN, skin boosters" },
];

const concerns = [
  { tab: "Acne scars", img: [A + "skin-before-1-scaled.webp", "Indian woman with acne scars and post-acne marks", 1920, 2560], title: "Acne scars",
    text: "Acne can leave behind rolling, boxcar or ice-pick scars. Microneedling makes thousands of tiny, controlled punctures that break up stiff scar tissue and wake up your skin's healing response. Over a few months, new collagen fills in and lifts the scars.",
    more: ["Lifts rolling and boxcar scars", "Fades post-acne marks", "Safe on darker skin"], rec: ["PRP", "Subcision", "TCA CROSS"], sessions: "4–6, every 4–6 weeks",
    link: ["/acne-scar-treatment-in-trivandrum/", "Acne scar treatment"] },
  { tab: "Open pores", img: [A + "lage-pores.webp", "Open pores on brown Indian skin", 1080, 1080], title: "Open, enlarged pores",
    text: "Pores look bigger when the skin around them loses firmness. Microneedling builds fresh collagen around each pore so it looks tighter and the skin surface looks smoother.",
    more: ["Smaller-looking pores", "Smoother texture", "Less oiliness over time"], rec: ["Chemical peel", "HydraFacial"], sessions: "3–6, every 4 weeks",
    link: ["/open-pores-treatment-in-trivandrum/", "Open pores treatment"] },
  { tab: "Fine lines &amp; wrinkles", img: [A + "anti-aging-before-scaled-1.webp", "Indian woman with fine lines and early signs of ageing", 1920, 2560], title: "Fine lines &amp; wrinkles",
    text: "From our late 20s, collagen slowly drops and lines start to appear. Microneedling stimulates collagen and elastin, thickening the skin so fine lines soften and skin feels firmer.",
    more: ["Softer forehead and smile lines", "Firmer, thicker skin", "Natural-looking results"], rec: ["Exosomes", "Skin boosters"], sessions: "3–4, every 4 weeks",
    link: ["/advanced-anti-aging-treatment-for-wrinkles/", "Anti-ageing treatments"] },
  { tab: "Pigmentation &amp; marks", img: [A + "Pigmentation-on-the-Face.webp", "Pigmentation and melasma on Indian skin", 1080, 1080], title: "Pigmentation &amp; dark marks",
    text: "Because microneedling uses no heat, it's a safer way to treat pigmentation on Indian skin than many lasers. It renews the skin and helps brightening serums work deeper.",
    more: ["Fades dark marks", "More even tone", "No heat, low pigmentation risk"], rec: ["Chemical peels", "Brightening serums"], sessions: "4–6, every 3–4 weeks",
    link: ["/how-to-reduce-pigmentation-on-the-face/", "Reducing pigmentation"] },
  { tab: "Uneven texture", img: [B + "233-5.webp", "Rough, uneven skin texture on an Indian cheek", 1080, 1080], title: "Rough, uneven texture",
    text: "Old breakouts, sun and age leave skin bumpy and uneven. Regular microneedling smooths the surface and gives skin a soft, polished look.",
    more: ["Smoother skin surface", "Healthy glow", "Makeup sits better"], rec: ["HydraFacial", "Exosomes"], sessions: "3–4, every 4 weeks" },
  { tab: "Stretch marks", img: [B + "147-9.webp", "Stretch marks on the abdomen", 1080, 1080], title: "Stretch marks",
    text: "Stretch marks form when the skin's support fibres tear during pregnancy, growth spurts or weight changes. Body microneedling rebuilds collagen inside the marks, so they become flatter and less noticeable.",
    more: ["Flatter, narrower marks", "Colour closer to your skin", "Works on tummy, thighs, hips and arms"], rec: ["PRP", "CO2 laser"], sessions: "4–6, every 4–6 weeks",
    link: ["/how-can-you-reduce-stretch-marks-with-advanced-treatments/", "Stretch mark treatments"] },
  { tab: "Under-eye skin", img: [B + "654-Dark-Circles1.webp", "Indian woman with dark circles and tired under-eyes", 1080, 1080], title: "Thin, crepey under-eye skin",
    text: "The skin under the eyes is very thin, so lines and shadows show easily. Gentle, shallow microneedling thickens this skin over a few sessions, softening crepiness and fine lines.",
    more: ["Thicker, smoother under-eye skin", "Softer fine lines", "Very gentle settings"], rec: ["PRP", "PDRN"], sessions: "3–4, every 4 weeks",
    link: ["/5-best-ways-to-treat-your-under-eye-aging/", "Under-eye ageing treatments"] },
];

const depths = [
  ["Shallow (0.25–0.5 mm)", 1, "Works on the top layer to refresh skin and help serums absorb better.", "glow, dullness, under-eyes", "a few hours of pinkness", "monthly"],
  ["Medium (0.5–1.5 mm)", 2, "Reaches the upper dermis to build collagen. The most common setting.", "fine lines, open pores, pigmentation", "1–2 days of redness", "3–6, every 4 weeks"],
  ["Deep (1.5–2.5 mm)", 3, "Targets thick scar tissue and body skin for maximum remodelling.", "acne scars, stretch marks", "2–3 days of redness", "4–6, every 4–6 weeks"],
];

const menuRows = [
  ["Single Session", "Starter", "glow", "Get your glow on in just one session. A great way to try microneedling.", ["Glow", "Starter"], "Dermapen microneedling with a serum chosen for your skin.", "1–2 days", "1"],
  ["3-Session Course", "Popular", "glow age pores", "A radiant, youthful look with three sessions spaced about a month apart.", ["Package", "Popular"], "Three sessions, with depth adjusted as your skin improves.", "1–2 days each", "3"],
  ["6-Session Course", "Best value", "scars pores age", "Our full course to rejuvenate your skin and work on scars or deeper concerns.", ["Best value", "Scars"], "Six sessions, ideal for acne scars, pores and stretch marks.", "1–3 days each", "6"],
  ["Microneedling + PRP", "Combo", "scars age", "Your own platelet-rich plasma is applied during microneedling for faster healing and better collagen.", ["PRP", "Scars"], "A small blood sample is spun to make PRP, which is applied as the skin is treated.", "1–3 days", "3–6"],
  ["Microneedling + Exosomes", "Combo", "glow age", "Adds lab-made exosomes to calm the skin, speed up healing and boost glow.", ["Exosomes", "Glow"], "Exosomes are applied right after microneedling so they reach deeper.", "1–2 days", "3–6"],
  ["Microneedling + PDRN", "Combo", "age", "Adds PDRN (salmon DNA) to support repair, elasticity and skin quality.", ["PDRN", "Repair"], "PDRN is applied during or after microneedling.", "1–2 days", "3–4"],
  ["Under-eye Microneedling", "Targeted", "age", "Gentle, shallow sessions for thin, crepey under-eye skin.", ["Under-eyes"], "Very shallow depth with PRP or PDRN.", "1 day", "3–4"],
  ["Stretch Mark Microneedling", "Body", "scars", "Deeper body sessions to flatten and fade stretch marks.", ["Body", "Stretch marks"], "Deeper needle depth on the tummy, thighs, hips or arms.", "2–3 days", "4–6"],
];

const faqs = [
  ["Does microneedling hurt?", "We apply a numbing cream for 30 to 45 minutes first, so most people feel only light pressure, vibration or a mild scratching sensation. Bony areas like the forehead can feel a little more."],
  ["How many sessions will I need?", "For glow and fine lines, 3 sessions usually make a clear difference. Acne scars and stretch marks often need 4 to 6. Sessions are spaced 4 to 6 weeks apart so collagen has time to build."],
  ["What is the downtime?", "Expect redness like a mild sunburn for 1 to 2 days after a medium session, and 2 to 3 days after deeper scar work. Light flaking may follow. Most people return to work the next day."],
  ["When will I see results?", "Skin looks fresher and glowier within a week. Collagen keeps building for 3 to 6 months, so scars, pores and lines keep improving long after each session."],
  ["Is microneedling safe for Indian skin?", "Yes. Microneedling uses no heat or light, so the risk of pigmentation is much lower than with many lasers. We still adjust the depth carefully and ask you to protect your skin from the sun."],
  ["What is Dermapen 4?", "Dermapen 4 is a professional, motorised microneedling device. It uses a sterile, single-use needle cartridge and lets the doctor set the exact needle depth for each area, from very shallow under the eyes to deeper on scars."],
  ["Is clinic microneedling better than a derma roller at home?", "Yes. A clinic device like Dermapen goes in straight and at a precise depth, with sterile single-use needles. Home rollers drag across the skin, can tear it, are hard to keep sterile and can't reach the depth needed for scars."],
  ["Microneedling or MNRF: which should I choose?", "Microneedling is gentler, more affordable and great for glow, pores, fine lines and mild to moderate scars. MNRF adds radiofrequency heat for stronger tightening and deeper scars. Your doctor will suggest the right one for you."],
  ["Can I combine microneedling with PRP or exosomes?", "Yes, and it often gives better results. PRP and exosomes help the skin heal faster and build more collagen. Ask about our combination packages."],
  ["Can I do microneedling if I have active acne?", "Not over active, inflamed pimples, as needling can spread bacteria. We first calm active acne with peels or medication, then treat the scars."],
  ["Can I wear makeup after microneedling?", "Wait at least 24 hours, and ideally until redness settles. Makeup on freshly treated skin can clog the tiny channels and cause irritation."],
  ["Where can I get microneedling in Kerala?", "Facelit offers Dermapen microneedling at our clinics in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does microneedling cost?", "It depends on the area, the number of sessions and whether you add PRP, exosomes or PDRN. Our 3 and 6-session courses offer the best value. Book a consultation for a personalised quote."],
];

const sections = [
  k.hero({
    tags: ["Skin", "Dermapen 4", "Doctor-led"], h1: "Microneedling with Dermapen",
    img: [A + "anti-aging-after-scaled-1.webp", "Indian woman with smooth, firm skin after microneedling at Facelit, Kerala"], pos: "center 30%",
    intro: "Microneedling uses ultra-fine needles to make tiny, controlled channels in your skin. Your skin heals them by making fresh collagen, which smooths acne scars, tightens open pores, softens fine lines and evens out tone. With no heat involved, it's one of the safest skin treatments for Indian skin.",
    facts: [["45–60 min", "Per session"], ["1–3 days", "Downtime"], ["3–6", "Sessions typical"], ["4–6 weeks", "Between sessions"]],
    cta2: ["#finder", "Find your plan"],
  }),
  k.jump([["overview", "Overview"], ["device", "Dermapen 4"], ["finder", "Find your plan"], ["concerns", "Concerns"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is Microneedling?</h2>
 <div class="cp-prose">
 <p>Microneedling, also called collagen induction therapy, is a simple idea that works. A pen-like device with very fine needles moves over your skin and creates thousands of tiny, controlled punctures. They are too small to scar, but big enough to tell your skin to repair itself.</p>
 <p>As the skin heals, it builds new collagen and elastin. Over the following weeks, that fresh collagen fills in scars, firms the skin around pores and softens lines. Because there is no heat, it suits Indian and darker skin tones especially well.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why the device matters ${k.plus}</summary>
 <div class="cp-prose">
 <p>Not all microneedling is the same. A professional device makes a big difference to safety and results:</p>
 ${list(["<b>Straight, precise needles</b> go in and out vertically instead of dragging like a roller.", "<b>Adjustable depth</b> lets the doctor treat thin under-eye skin and thick scars differently.", "<b>Sterile, single-use cartridges</b> for every client.", "<b>Serums go deeper</b> through the fresh channels, so PRP, exosomes or brightening serums work harder."])}
 <p>Read more about <a href="/how-does-microneedling-help-rejuvenate-and-brighten-the-skin/">how microneedling rejuvenates and brightens skin</a>.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How microneedling works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Micro-channels</b><span>Fine needles create thousands of tiny, controlled punctures.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Healing response</b><span>Your skin rushes to repair them within hours.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. New collagen</b><span>Fresh collagen builds for months, smoothing and firming.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(A + "NCTF-Treatment.webp", "Doctor treating the cheek of an Indian patient at Facelit", 1080, 1080)}
 ${img(B + "188-4-6.webp", "Acne marks and uneven texture on brown Indian skin", 1080, 1080)}
 </div>
 </div>`),

  shell("device", `${head("Our technology", "Why We Use Dermapen 4", "The device decides how precise, comfortable and effective your microneedling is. Here's what Dermapen 4 brings.")}
 ${k.machine({ card: { eyebrow: "Professional microneedling", title: "Dermapen 4", lines: [["16", "fine needles per sterile cartridge"], ["0.2–3 mm", "adjustable needle depth"], ["Scar", "dedicated setting for scar revision"], ["1x", "single-use cartridge for every client"]] },
   name: "Dermapen 4 Microneedling", text: "Dermapen 4 is an advanced, motorised microneedling pen. Its needles move straight in and out at high speed, so channels are clean and even, with less trauma to the skin than a roller. Your doctor sets the exact depth for every area, from the delicate under-eyes to deep acne scars, and it includes a dedicated setting for scar revision.",
   tags: ["Precise depth control", "Dedicated scar setting", "Single-use cartridges", "No heat", "All skin types"],
   specs: [["Faster healing", "Clean vertical channels heal quickly"], ["Even results", "Consistent depth across the face"], ["Comfortable", "Smooth, vibration-free gliding"], ["Versatile", "Face, neck, under-eyes and body"]] })}
 <h3 class="cp-h3 font-serif" style="margin-top:2.5rem">Boost your results</h3>
 ${tabs("boost", [
   { tab: "+ PRP", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Platelet-rich plasma from your own blood is full of growth factors. Applied during microneedling, it speeds up healing and boosts collagen, especially for acne scars and under-eyes.</p>${list(["Faster healing", "Stronger collagen boost", "Great for scars and under-eyes"])}</div><div class="cp-meta"><div><b>Best for:</b> acne scars, under-eyes, stretch marks</div><div><b>Extra time:</b> about 20 minutes</div><div><a href="/prp-face-treatment/" style="text-decoration:underline">About PRP face treatment</a></div></div></div>` },
   { tab: "+ Exosomes", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Lab-made exosomes carry repair signals to your skin cells. Added after microneedling, they calm redness and help skin heal and glow faster, with no blood draw.</p>${list(["Less redness afterwards", "Faster recovery", "Extra glow and hydration"])}</div><div class="cp-meta"><div><b>Best for:</b> glow, fine lines, sensitive skin</div><div><b>Blood draw:</b> not needed</div><div><a href="/exosomes-skin-treatment/" style="text-decoration:underline">About exosome treatment</a></div></div></div>` },
   { tab: "+ PDRN", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">PDRN (salmon DNA) supports skin repair and elasticity. With microneedling it helps improve skin quality, firmness and fine lines.</p>${list(["Supports repair", "Improves elasticity", "Smoother, healthier skin"])}</div><div class="cp-meta"><div><b>Best for:</b> skin quality, fine lines, under-eyes</div><div><a href="/pdrn-skin-treatment-in-kerala/" style="text-decoration:underline">About PDRN</a></div></div></div>` },
   { tab: "Upgrade: MNRF", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">If you need stronger tightening or have deep scars or very large pores, MNRF adds radiofrequency heat through the needles for a more powerful collagen boost.</p>${list(["Stronger skin tightening", "Better for deep scars", "Slightly more downtime"])}</div><div class="cp-meta"><div><b>Best for:</b> deep scars, loose skin, large pores</div><div><a href="/mnrf-treatment/" style="text-decoration:underline">About MNRF</a></div></div></div>` },
 ])}`),

  shell("finder", `${head("Find your plan", "Which Microneedling Plan Is Right for You?", "Answer two quick questions and see the plan our doctors most often recommend. We confirm your final plan at your consultation.")}
 ${k.finder({ q1: "What would you most like to fix?", q2: { label: "How much redness can you handle afterwards?", options: [["light", "A day of mild pinkness"], ["deep", "2 to 3 days of redness is fine"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of Microneedling", "One treatment that helps scars, pores, lines and tone, using your skin's own healing power.")}${k.benefitsGrid(benefits)}`),

  shell("concerns", `${head("Is it right for you?", "Skin Problems Microneedling Can Treat", "Tap a concern to see how microneedling helps, what we pair it with and how many sessions you may need.")}
 ${k.concernTabs("concerns", concerns)}`),

  shell("", `${head("Needle depth", "Shallow, Medium and Deep Microneedling", "Your doctor adjusts the needle depth for each concern and each area of your face.")}${k.depthCards(depths)}`),

  shell("plans", `${head("Packages", "Microneedling Packages at Facelit", "Start with one session, save with a course, or boost your results with PRP, exosomes or PDRN.")}
 ${k.menu([["all", "All"], ["glow", "Glow"], ["scars", "Scars &amp; stretch marks"], ["pores", "Pores"], ["age", "Anti-ageing"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Microneedling Procedure: Step by Step</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor consulting an Indian patient before microneedling", 1151, 768], lead: "A little preparation helps you heal faster and get better results.",
     items: ["Your doctor examines your skin and agrees a plan with you.", "Stop retinoids, glycolic or salicylic acid and scrubs 5 to 7 days before.", "Avoid sun and tanning for 2 weeks before.", "Tell us if you get cold sores, as you may need antiviral tablets.", "Drink plenty of water and keep your skin moisturised.", "Come with clean skin, without makeup."] },
   { tab: "02 · During", img: [A + "NCTF-Treatment.webp", "Doctor treating an Indian patient's skin at Facelit", 1080, 1080], lead: "A session takes 45 to 60 minutes, including numbing.",
     items: ["Your skin is cleansed and disinfected.", "Numbing cream is applied for 30 to 45 minutes.", "A serum, PRP or exosomes is spread over the skin.", "The doctor glides the Dermapen over each area at the right depth.", "A soothing serum or mask calms the skin.", "Sunscreen is applied before you leave."] },
   { tab: "03 · After", img: [A + "skin-after-1-scaled.webp", "Indian woman with calm, healed skin a week after microneedling", 1920, 2560], lead: "Your skin will look like it has a mild sunburn for a day or two. The full aftercare plan is below.",
     items: ["Redness and warmth for 1 to 3 days.", "Skin may feel tight, dry or slightly rough.", "Light flaking around days 3 to 5.", "Don't wash your face for 6 to 8 hours.", "No makeup for 24 hours.", "No gym, sauna or swimming for 48 hours."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Recovery &amp; results", "Microneedling Results Timeline", "Microneedling works with your skin's natural healing, so results keep building for months.")}
 ${k.timeline([["Day 1–2", "Pink &amp; warm", "Skin looks and feels like a mild sunburn."], ["Day 3–7", "Fresh &amp; smooth", "Any flaking settles and skin looks brighter."], ["Weeks 4–6", "Collagen builds", "Pores, lines and texture start to visibly improve."], ["After 3–6 sessions", "Lasting change", "Scars are shallower and skin is firmer. Results keep improving for 3 to 6 months."]])}
 </div>
 <div>
 <figure style="margin:0">${img(A + "anti-aging-after-scaled-1.webp", "Indian woman with firm, smooth skin", 1920, 2560, "cp-img cp-img--43")}<figcaption class="cp-note">Model image. Results vary with your skin and the number of sessions. <a href="/microneedling-before-and-after/">See before &amp; after</a></figcaption></figure>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have acne scars or post-acne marks", "Have open pores or uneven texture", "Want to soften early lines", "Want a treatment that's safe for Indian skin"])}</div>
 <div class="cp-card"><h3 class="font-serif">Wait if you have</h3>${list(["Active acne or skin infection", "Active cold sores or eczema on the area", "Taken isotretinoin in the last 6 months", "A tendency to form keloids"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("", `${head("Treatment areas", "Microneedling for Face and Body", "Dermapen's adjustable depth means we can treat delicate and tough skin safely.")}
 ${k.areas([["Face", "Scars, pores, lines, tone"], ["Under the eyes", "Crepey skin and fine lines"], ["Neck", "Lines and loose skin"], ["Chest", "Sun damage and crepiness"], ["Tummy &amp; thighs", "Stretch marks"], ["Arms &amp; back", "Scars and stretch marks"]])}`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "Microneedling Aftercare", "Gentle aftercare helps your skin heal quickly and protects your results.")}${tabs("aftercare", [
   { tab: "First 48 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Leave the serum on for 6 to 8 hours", "Wash gently with cool water and a mild cleanser", "Use only the moisturiser you're given", "Sleep on a clean pillowcase"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Makeup for 24 hours", "Gym, sauna, steam and swimming", "Direct sun", "Touching or scratching your face"], warn)}</div></div>` },
   { tab: "Days 3–7", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Use SPF 30 to 50 every day", "Keep skin well moisturised", "Let any flakes fall off on their own", "Drink plenty of water"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Retinoids and acids for 5 to 7 days", "Scrubs and face brushes", "Waxing or threading the area", "Picking at dry skin"], warn)}</div></div>` },
   { tab: "Between sessions", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Morning</h3>${list(["Gentle cleanser", "Vitamin C or hydrating serum", "Moisturiser", "Sunscreen, reapplied outdoors"])}</div><div class="cp-card"><h3 class="font-serif">Night</h3>${list(["Gentle cleanser", "Treatment cream your doctor suggests", "Barrier-repair moisturiser", "Next session in 4 to 6 weeks"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Your skin type", "Microneedling for Every Skin Type", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Indian and darker skin tones", "One of the safest collagen treatments for darker skin, because there's no heat. We still choose the depth carefully and insist on sunscreen to keep pigmentation risk low."],
   ["Oily, acne-prone skin", "Great for scars and pores once breakouts are under control. We don't needle over active, inflamed pimples."],
   ["Sensitive skin", "We use shallower depths and calming serums or exosomes, and build up slowly."],
   ["Dry skin", "Microneedling with hydrating serums or PRP can leave dry skin plumper and more comfortable."],
   ["Mature skin", "Excellent for fine lines and firmness. For deeper wrinkles or sagging, we may suggest MNRF, skin boosters or HIFU."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "Microneedling vs MNRF, CO2 Laser and Chemical Peels", "How Dermapen microneedling compares with other treatments for scars, pores and texture.")}
 ${k.compareTable(["Microneedling (Dermapen 4)", '<a href="/mnrf-treatment/">MNRF</a>', '<a href="/co2-fractional-laser/">CO2 laser</a>', '<a href="/chemical-peel-treatment/">Chemical peel</a>'], [
   ["Best for", "Scars, pores, fine lines, tone", "Deep scars, tightening, pores", "Deep scars, wrinkles, stretch marks", "Pigmentation, acne, dullness"],
   ["Uses heat", "No", "Yes (radiofrequency)", "Yes (laser)", "No"],
   ["Downtime", "1–3 days", "2–3 days", "3–7 days", "0–7 days"],
   ["Sessions", "3–6", "3–5", "3–5", "4–6"],
   ["Pigmentation risk on Indian skin", "Very low", "Low", "Moderate (managed with care)", "Low with the right peel"],
   ["Cost", "Lower", "Higher", "Higher", "Lower"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Microneedling in Kerala?</h2>
 ${img(B + "825-Trivandrum-clinic.webp", "Facelit skin clinic treatment room in Trivandrum", 1024, 585, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Personal doctor consultation", "Our doctors examine your skin, review your medical history and plan the depth, serums and number of sessions around your goals."],
   ["Professional Dermapen 4", "A precise, medical-grade microneedling device, not a home roller, with sterile single-use cartridges for every client."],
   ["Safety first", "Certified, medical-grade products and a fully sterile treatment room, following strict hygiene protocols."],
   ["Powerful combinations", "PRP, exosomes, PDRN, MNRF, peels and lasers under one roof, so your plan can grow with your skin."],
   ["Guidance before and after", "Clear pre-care and aftercare instructions, and progress checks at every session."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Microneedling Side Effects and Who Should Wait", "Done properly, microneedling is very safe. Here's what's normal and when it's better to wait.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Redness and warmth for 1 to 3 days", "Mild swelling, especially under the eyes", "Tightness, dryness or light flaking", "Tiny pinpoint marks that fade in a day or two", "Small breakouts as skin settles (uncommon)"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant or breastfeeding", "Have active acne, infection, cold sores or eczema", "Have taken isotretinoin in the last 6 months", "Have a bleeding disorder or take blood thinners", "Tend to form keloids or raised scars"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "Microneedling FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Related treatments &amp; reading", "Explore More Skin Treatments", "")}
 ${k.links([["/microneedling-before-and-after/", "Results", "Microneedling before &amp; after"], ["/how-does-microneedling-help-rejuvenate-and-brighten-the-skin/", "Guide", "How microneedling brightens skin"], ["/mnrf-treatment/", "Treatment", "MNRF treatment"], ["/prp-face-treatment/", "Treatment", "PRP face treatment"], ["/exosomes-skin-treatment/", "Treatment", "Exosome skin treatment"], ["/acne-scar-treatment-in-trivandrum/", "Treatment", "Acne scar treatment in Trivandrum"]])}`),

  k.cta("Not sure if microneedling is right for you?", "Book a consultation and our doctors will check your skin and suggest the right depth, add-ons and number of sessions for you."),
];

k.writePage(process.argv[2], sections, {
  title: "Microneedling in Kerala with Dermapen 4 | Acne Scars & Pores | Facelit",
  desc: "Dermapen 4 microneedling in Trivandrum, Kollam & Thrissur for acne scars, open pores, fine lines, pigmentation and stretch marks. Safe for Indian skin, 1–3 days downtime.",
  image: "https://facelit.in/wp-content/uploads/2026/08/anti-aging-after-scaled-1.webp",
  faqs,
  procedure: { name: "Microneedling (Collagen Induction Therapy)", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face, under-eyes, neck, chest, abdomen, thighs",
    howPerformed: "After numbing cream, a doctor glides a Dermapen 4 microneedling device over the skin at a set depth, creating micro-channels that trigger collagen production. Serums, PRP or exosomes may be applied.",
    preparation: "Doctor consultation; stop retinoids and acids 5 to 7 days before; avoid sun and tanning for 2 weeks.",
    followup: "Leave serum on 6 to 8 hours, no makeup for 24 hours, avoid heat and exercise for 48 hours, use sunscreen daily. Repeat every 4 to 6 weeks." },
  crumbs: [["Home", "https://facelit.in/"], ["Skin Treatments", "https://facelit.in/skin-treatments/"], ["Microneedling", "https://facelit.in/microneedling/"]],
});
