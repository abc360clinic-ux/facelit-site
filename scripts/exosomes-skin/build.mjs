// Builds the redesigned /exosomes-skin-treatment/ page.
// Usage (from facelit-site/): node scripts/exosomes-skin/build.mjs content/pages/exosomes-skin-treatment.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn, tick } = k;

const benefits = [
  ["cell", "Faster Skin Renewal", "Tells tired skin cells to repair and renew themselves more quickly."],
  ["lift", "More Collagen, Firmer Skin", "Boosts collagen and elastin, so skin feels bouncier and firmer."],
  ["drop", "Deep Hydration", "Helps skin hold on to moisture for a plump, dewy look."],
  ["wave", "Softer Acne Scars", "Supports scar remodelling, especially when paired with microneedling."],
  ["sun", "Even Skin Tone", "Helps fade dullness, sun damage and patchy pigmentation."],
  ["clock", "Fewer Fine Lines", "Smooths early lines around the eyes, mouth and forehead."],
  ["heal", "Quicker Recovery", "Calms redness and speeds up healing after microneedling, laser or peels."],
  ["leaf", "Gentle on Sensitive Skin", "Soothing and anti-inflammatory, so it suits sensitive and redness-prone skin."],
];

const finderResults = [
  { v: "lines", label: "Fine lines &amp; ageing", img: ["/wp-content/uploads/2026/08/8193-e1740745969395.webp", "Fine lines around the eye on Indian skin", 1080, 1009], title: "Collagen Renewal Plan",
    text: "Exosomes boost the collagen your skin makes on its own, so fine lines soften and skin feels firmer over a few months.",
    none: "Exosome glow facial with gentle infusion. No needles, no downtime.", some: "Microneedling with exosomes for deeper collagen stimulation, with 1 to 2 days of mild redness.",
    sessions: "4–6 sessions, 3–4 weeks apart", combine: "Skin boosters, PDRN, HIFU" },
  { v: "scars", label: "Acne scars", img: ["/wp-content/uploads/2026/08/skin-before-1-scaled.webp", "Indian woman with acne scars and marks", 1920, 2560], title: "Scar Repair Plan",
    text: "Exosomes help the skin heal and rebuild after scar treatments, so you get better results with less redness.",
    none: "Exosome infusion to fade marks and improve texture. Best for light scarring.", some: "Microneedling or MNRF followed by exosomes, the most effective route for deeper scars.",
    sessions: "4–6 sessions, 4 weeks apart", combine: "MNRF, CO2 laser, subcision" },
  { v: "dull", label: "Dull, dehydrated skin", img: ["/wp-content/uploads/2026/07/654-Dark-Circles1.webp", "Indian woman with dull, tired skin and dark circles", 1080, 1080], title: "Glow &amp; Hydration Plan",
    text: "A quick way to bring back bounce and glow. Great before a wedding or big event.",
    none: "Exosome glow facial. You can go straight back to your day.", some: "Light microneedling with exosomes for a deeper, longer-lasting glow.",
    sessions: "1–3 sessions, 3–4 weeks apart", combine: "HydraFacial, skin boosters" },
  { v: "pigment", label: "Pigmentation &amp; sun damage", img: ["/wp-content/uploads/2026/08/Pigmentation-on-the-Face.webp", "Pigmentation and sun damage on Indian skin", 1080, 1080], title: "Even Tone Plan",
    text: "Exosomes calm the inflammation behind a lot of pigmentation and help skin repair sun damage, for a brighter, more even tone.",
    none: "Exosome infusion alongside a brightening home routine.", some: "Microneedling with exosomes, often alternated with chemical peels.",
    sessions: "4–6 sessions, 3–4 weeks apart", combine: "Chemical peels, Pico laser" },
  { v: "sensitive", label: "Sensitive or red skin", img: ["/wp-content/uploads/2026/07/233-5.webp", "Sensitive skin with redness and uneven texture on an Indian cheek", 1080, 1080], title: "Calm &amp; Strengthen Plan",
    text: "Exosomes soothe irritated skin and help repair a weak skin barrier, so your skin reacts less over time.",
    none: "Gentle exosome infusion with barrier-repair care. No needles.", some: "Very light microneedling only if your doctor feels your skin is ready.",
    sessions: "3–4 sessions, 3–4 weeks apart", combine: "Barrier-repair skincare, LED" },
  { v: "recovery", label: "Healing after laser", img: ["/wp-content/uploads/2026/08/eco-hero.webp", "Facelit doctor with the laser used before exosome recovery treatment", 1726, 972], title: "Faster Recovery Plan",
    text: "Applied straight after laser, MNRF or microneedling, exosomes help your skin calm down and heal faster, with less redness.",
    none: "Added on to your laser or peel session at no extra downtime.", some: "Added on to your laser or MNRF session to shorten recovery.",
    sessions: "With each laser or MNRF session", combine: "CO2 laser, MNRF, chemical peels" },
];

const concerns = [
  { tab: "Fine lines &amp; wrinkles", img: ["/wp-content/uploads/2026/08/anti-aging-before-scaled-1.webp", "Indian woman with fine lines and early signs of ageing", 1920, 2560], title: "Fine lines &amp; early wrinkles",
    text: "From our late 20s, collagen slowly drops and lines start to show. Exosomes carry growth signals that remind your skin cells to make collagen and elastin again. The change is gradual and natural. Skin looks smoother and feels firmer, not frozen.",
    more: ["Softens forehead lines and crow's feet", "Improves crepey under-eye skin", "Natural, not overdone"], rec: ["Skin boosters", "PDRN", "Botox"], sessions: "4–6, every 3–4 weeks",
    link: ["/skin-boosters-help-reduce-fine-lines-and-wrinkles/", "Skin boosters for fine lines"] },
  { tab: "Acne scars &amp; marks", img: ["/wp-content/uploads/2026/07/188-4-6.webp", "Acne marks and scars on brown Indian skin", 1080, 1080], title: "Acne scars &amp; blemishes",
    text: "Exosomes work best for scars as a partner to microneedling, MNRF or laser. The needles or laser start the repair, and the exosomes speed up healing and help build better-quality collagen in the scar.",
    more: ["Smoother scar texture", "Faster healing between sessions", "Fades post-acne marks"], rec: ["MNRF", "CO2 laser", "Microneedling"], sessions: "4–6, every 4 weeks",
    link: ["/acne-scar-treatment-in-trivandrum/", "Acne scar treatment"] },
  { tab: "Dull, dehydrated skin", img: ["/wp-content/uploads/2026/07/654-Dark-Circles1.webp", "Indian woman with dull, dehydrated skin", 1080, 1080], title: "Dull, dehydrated skin",
    text: "Late nights, AC rooms, pollution and stress drain your skin of moisture and glow. Exosomes help skin hold water and repair itself, so it looks rested, plump and healthy again.",
    more: ["Visible glow within days", "Plumper, bouncier skin", "Smoother makeup finish"], rec: ["HydraFacial", "Skin boosters"], sessions: "1–3, every 3–4 weeks",
    link: ["/how-to-get-glowing-skin/", "How to get glowing skin"] },
  { tab: "Pigmentation &amp; sun damage", img: ["/wp-content/uploads/2026/08/black-marks.webp", "Dark marks and pigmentation along the jaw on Indian skin", 1080, 1080], title: "Pigmentation &amp; sun damage",
    text: "Exosomes help calm the inflammation that triggers extra pigment and support repair of sun-damaged skin. For stubborn pigmentation, we pair them with peels or laser for the best results.",
    more: ["Brighter, more even tone", "Repairs sun-damaged skin", "Gentle option for Indian skin"], rec: ["Chemical peels", "Pico laser"], sessions: "4–6, every 3–4 weeks",
    link: ["/how-to-reduce-pigmentation-on-the-face/", "Reducing pigmentation"] },
  { tab: "Sensitive &amp; red skin", img: ["/wp-content/uploads/2026/07/233-5.webp", "Redness-prone, sensitive Indian skin", 1080, 1080], title: "Sensitive &amp; redness-prone skin",
    text: "If your skin stings, flushes or reacts to most products, its barrier is probably weak. Exosomes have a calming, anti-inflammatory effect and help rebuild that barrier, making them one of the few rejuvenation treatments that suit sensitive skin.",
    more: ["Less redness and stinging", "Stronger skin barrier", "Suits skin that can't take strong actives"], rec: ["Barrier-repair skincare", "LED therapy"], sessions: "3–4, every 3–4 weeks" },
  { tab: "Open pores", img: ["/wp-content/uploads/2026/08/lage-pores.webp", "Open pores on brown Indian skin", 1080, 1080], title: "Open pores &amp; rough texture",
    text: "As skin loses firmness, pores look bigger. Microneedling with exosomes tightens the skin around each pore and refines texture, so the surface looks smoother and more even.",
    more: ["Tighter-looking pores", "Smoother texture", "Less oiliness over time"], rec: ["MNRF", "Chemical peels"], sessions: "4–6, every 4 weeks",
    link: ["/open-pores-treatment-in-trivandrum/", "Open pores treatment"] },
];

const methods = [
  ["Exosome Glow Facial", 1, "Exosomes are pushed into freshly prepared skin using a gentle, needle-free infusion.", "glow, hydration, sensitive skin", "none", "1–3, every 3–4 weeks"],
  ["Microneedling + Exosomes", 2, "Fine needles create tiny channels so exosomes reach deeper. Our most popular option.", "fine lines, scars, pores, pigmentation", "1–2 days of mild redness", "4–6, every 3–4 weeks"],
  ["Laser / MNRF + Exosomes", 3, "Applied straight after laser or MNRF to calm the skin and speed up healing.", "deep scars, skin tightening, recovery", "as per laser, often shorter", "with each laser session"],
];

const menuRows = [
  ["Single Session", "Starter", "glow", "Try exosomes for yourself, or get a quick glow before an event.", ["Glow", "Hydration"], "Exosome infusion or microneedling, depending on your skin.", "0–2 days", "1"],
  ["6-Session Package", "Best value", "glow age scars", "The full course for lasting change in texture, firmness, tone and fine lines.", ["Best results", "Package"], "Six sessions spaced 3 to 4 weeks apart, adjusted as your skin improves.", "0–2 days per session", "6"],
  ["Exosome Glow Facial", "No downtime", "glow", "A needle-free facial with exosome infusion for instant bounce and radiance.", ["Instant glow", "No needles"], "Cleanse, gentle exfoliation, then exosome infusion and a calming mask.", "None", "1–3"],
  ["Microneedling with Exosomes", "Popular", "age scars", "Our most popular pairing for fine lines, scars, pores and dull skin.", ["Collagen", "Texture"], "Microneedling opens micro-channels, then exosomes are applied over the area.", "1–2 days", "4–6"],
  ["MNRF with Exosomes", "Advanced", "scars age", "Radiofrequency microneedling plus exosomes for deeper scars and skin tightening.", ["Acne scars", "Tightening"], "MNRF heats deeper layers, exosomes help the skin recover faster.", "2–3 days", "3–5"],
  ["CO2 Laser with Exosome Recovery", "Advanced", "scars recovery", "Add exosomes to your CO2 laser session for calmer skin and quicker healing.", ["Recovery", "Scars"], "Exosomes are applied straight after the laser pass.", "Often shorter than laser alone", "With each session"],
];

const faqs = [
  ["What are exosomes in skincare?", "Exosomes are tiny particles that cells release to send messages to each other. They carry growth factors, proteins and other signals. In skincare, purified exosomes are used to tell your skin cells to repair, renew and make more collagen."],
  ["Where do the exosomes come from?", "The exosomes used in skin treatments are produced in a lab from stem cell or plant cultures and then purified. They are not taken from your own body, so there is no blood draw like PRP."],
  ["Is exosome treatment painful?", "An exosome facial is completely comfortable. If it is combined with microneedling, we apply a numbing cream first, so most people only feel light pressure or a slight scratching sensation."],
  ["How many sessions will I need?", "Most people see the best results after 4 to 6 sessions spaced 3 to 4 weeks apart. A single session gives a nice glow, but collagen needs a few sessions to build up."],
  ["When will I see results?", "Many people notice brighter, more hydrated skin within a week. Firmness, fine lines and scars improve gradually over 2 to 3 months as collagen builds."],
  ["Is there any downtime?", "An exosome facial has no downtime. With microneedling you may have mild redness for 1 to 2 days, which is usually less than microneedling without exosomes."],
  ["Is exosome treatment safe?", "When done by doctors using quality, purified products, exosome skin treatments are well tolerated and side effects are usually limited to short-lived redness. We assess your skin and medical history first to make sure it is right for you."],
  ["Exosomes vs PRP: which is better?", "Both help skin repair itself. PRP uses growth factors from your own blood, while exosomes are ready-made, more concentrated signals that need no blood draw. Exosomes often mean less redness and quicker recovery. Your doctor can advise which suits you best."],
  ["Can exosomes be combined with other treatments?", "Yes, and that is often where they work best. We pair them with microneedling, MNRF, CO2 laser, chemical peels and skin boosters to boost results and speed up healing."],
  ["Is it suitable for Indian skin?", "Yes. Exosomes are gentle and calming, with a low risk of pigmentation, which makes them a good option for Indian and darker skin tones."],
  ["How long do the results last?", "With a full course and good skincare, results can last 6 to 12 months. Many people come back for a top-up session every few months."],
  ["Can exosomes help with hair loss too?", "Yes, exosomes are also used on the scalp to support hair growth. See our exosome hair treatment page for details."],
  ["Where can I get exosome skin treatment in Kerala?", "Facelit offers exosome skin treatment at our clinics in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does exosome skin treatment cost?", "The cost depends on the method (facial, microneedling or laser add-on) and the number of sessions. Our 6-session package offers the best value. Book a consultation for a personalised quote."],
];

const sections = [
  k.hero({
    tags: ["Skin", "Regenerative", "Doctor-led"], h1: "Exosomes Skin Treatment",
    img: ["/wp-content/uploads/2026/08/anti-aging-hero.webp", "Indian woman with healthy, radiant skin after exosome skin treatment at Facelit"], pos: "68% center",
    intro: "Exosomes are tiny messengers that tell your skin cells to repair, renew and make fresh collagen. At Facelit, we use them to treat fine lines, acne scars, dullness, pigmentation and sensitive skin, and to help you heal faster after laser. It's gentle, suits Indian skin well and needs little or no downtime.",
    facts: [["45–60 min", "Per session"], ["0–2 days", "Downtime"], ["4–6", "Sessions for best results"], ["3–4 weeks", "Between sessions"]],
    cta2: ["#finder", "Find your plan"],
  }),
  k.jump([["overview", "Overview"], ["finder", "Find your plan"], ["concerns", "Concerns"], ["plans", "Treatments"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is Exosome Skin Treatment?</h2>
 <div class="cp-prose">
 <p>Think of exosomes as text messages between cells. They are tiny bubbles, far smaller than a cell, packed with growth factors, proteins and other signals. When they reach your skin cells, they deliver instructions like "repair this", "calm down" and "make more collagen".</p>
 <p>As we age, or after acne, sun damage and stress, those signals get weaker. An exosome skin treatment tops them up. The result is skin that heals better, holds more moisture and slowly rebuilds its own collagen, so the improvement looks natural, not done.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: what is inside an exosome ${k.plus}</summary>
 <div class="cp-prose">
 <p>Each exosome carries a mix of signalling molecules, including:</p>
 ${list(["<b>Growth factors</b> that encourage new collagen and elastin.", "<b>Proteins and peptides</b> that support repair and calm inflammation.", "<b>Lipids</b> that help strengthen the skin barrier.", "<b>Genetic messengers (RNA)</b> that guide how skin cells behave."])}
 <p>The exosomes we use are lab-made and purified, not taken from your body. They are applied to the skin, often straight after microneedling or laser so they can reach deeper. Read our guide to <a href="/best-exosome-skin-treatment/">the best exosome skin treatment</a> to learn more.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How exosomes work">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Deliver</b><span>Exosomes are applied to freshly prepared skin.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Signal</b><span>They pass repair and renewal messages to your skin cells.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Rebuild</b><span>Your skin makes new collagen and repairs itself over weeks.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img("/wp-content/uploads/2026/07/707-skin-care.webp", "Smiling Indian woman caring for her skin", 1080, 1080)}
 ${img("/wp-content/uploads/2026/08/anti-aging-after-scaled-1.webp", "Indian woman with firm, even-toned skin", 1920, 2560)}
 </div>
 </div>`),

  shell("finder", `${head("Find your plan", "Which Exosome Treatment Is Right for You?", "Answer two quick questions and we'll show you the plan our doctors most often recommend. Your final plan is always confirmed at your consultation.")}
 ${k.finder({ q1: "What bothers you most about your skin?", q2: { label: "How much downtime can you take?", options: [["none", "None, I need to look normal tomorrow"], ["some", "A day or two of redness is fine"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of Exosome Skin Treatment", "Exosomes don't just treat one problem. They help your skin work better as a whole.")}${k.benefitsGrid(benefits)}`),

  shell("concerns", `${head("Is it right for you?", "Skin Concerns Exosomes Can Help With", "Tap a concern to see how exosomes help, what we pair them with and roughly how many sessions it takes.")}
 ${k.concernTabs("concerns", concerns)}`),

  shell("", `${head("How it's delivered", "Three Ways We Use Exosomes", "The method decides how deep the exosomes reach and how much downtime you have. Your doctor picks the one that suits your skin and schedule.")}${k.depthCards(methods)}`),

  shell("plans", `${head("Choose your treatment", "Exosome Treatments and Packages at Facelit", "Start with a single session, commit to a full course, or add exosomes to another treatment for better results.")}
 ${k.menu([["all", "All"], ["glow", "Glow &amp; hydration"], ["age", "Anti-ageing"], ["scars", "Scars"], ["recovery", "Recovery"]], menuRows, "treatments")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Exosome Treatment Procedure: Step by Step</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: ["/wp-content/uploads/2026/08/about-hero.webp", "Facelit doctor consulting an Indian patient before exosome treatment", 1151, 768], lead: "A short consultation makes sure exosomes are the right choice for you.",
     items: ["Your doctor examines your skin and asks about your medical history and goals.", "Stop retinoids and exfoliating acids 3 to 5 days before if you are having microneedling.", "Avoid blood thinners like aspirin and alcohol for a couple of days, if your doctor agrees.", "Drink plenty of water and have a light meal before you come.", "Arrive with clean skin, without makeup."] },
   { tab: "02 · During", img: ["/wp-content/uploads/2026/07/devi.webp", "Facelit doctor who performs exosome skin treatments", 1143, 1376], lead: "A session takes 45 to 60 minutes, including numbing if needed.",
     items: ["Your skin is cleansed and prepared.", "Numbing cream is applied if microneedling is part of your plan.", "Microneedling, MNRF or a gentle infusion opens a path into the skin.", "Exosomes are applied and gently worked into the skin.", "A calming mask and sunscreen finish the session."] },
   { tab: "03 · After", img: ["/wp-content/uploads/2026/08/skin-after-1-scaled.webp", "Indian woman with clearer skin after treatment", 1920, 2560], lead: "Most people go straight back to their day. The full aftercare plan is below.",
     items: ["Mild redness, like a light sunburn, may last a few hours to 2 days.", "Don't wash your face for 6 to 8 hours so the exosomes can keep working.", "Skip makeup for 24 hours after microneedling.", "Avoid sun, heat, saunas and heavy workouts for 48 hours.", "Use the gentle moisturiser and sunscreen your doctor recommends."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Recovery &amp; results", "Exosome Treatment Results Timeline", "Exosomes work with your skin's own repair process, so results build gradually and keep improving.")}
 ${k.timeline([["Day 1–2", "Calm &amp; settle", "Any redness fades quickly, often faster than after microneedling alone."], ["Week 1", "Fresh glow", "Skin looks more hydrated, brighter and rested."], ["Weeks 4–8", "Firmer, smoother", "Texture, pores and fine lines start to improve as collagen builds."], ["After 4–6 sessions", "Lasting change", "Skin is visibly firmer, more even and healthier. Results last 6 to 12 months."]])}
 </div>
 <div>
 <figure style="margin:0">${img("/wp-content/uploads/2026/08/skin-hero-1.webp", "Indian woman with healthy, glowing skin", 1726, 1152, "cp-img cp-img--43")}<figcaption class="cp-note">Model image. Individual results vary depending on your skin and the treatment plan.</figcaption></figure>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Want natural-looking results", "Have early lines, dullness or mild scarring", "Have sensitive or Indian skin", "Want faster healing after laser"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Are pregnant or breastfeeding", "Have active infection or cold sores", "Have active skin cancer", "Expect instant results from one session"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("", `${head("Treatment areas", "Exosomes for Face, Neck and More", "Exosomes can be used wherever skin needs repair, hydration or a collagen boost.")}
 ${k.areas([["Face", "Lines, scars, pores, glow"], ["Under the eyes", "Crepey skin and dark circles"], ["Neck", "Lines and loose skin"], ["Chest", "Sun damage and crepiness"], ["Hands", "Thin, ageing skin"], ['<a href="/exosomes-hair-treatments/">Scalp</a>', "Hair thinning (see hair treatment)"]])}`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "Exosome Treatment Aftercare", "Simple aftercare helps the exosomes do their job and keeps your skin calm.")}${tabs("aftercare", [
   { tab: "First 24 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Leave the treatment on for 6 to 8 hours", "Wash later with cool water and a gentle cleanser", "Apply only the moisturiser you were given", "Sleep on a clean pillowcase"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Makeup", "Touching your face", "Gym, sauna and steam", "Direct sun"], warn)}</div></div>` },
   { tab: "Days 2–7", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Use SPF 30 to 50 every morning", "Keep skin well moisturised", "Drink plenty of water", "Return to makeup once redness has gone"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Retinoids and acids for 3 to 5 days", "Scrubs and facial devices", "Swimming pools for 48 hours", "Waxing or threading the area"], warn)}</div></div>` },
   { tab: "Between sessions", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Morning</h3>${list(["Gentle cleanser", "Hydrating or vitamin C serum", "Moisturiser", "Sunscreen, reapplied outdoors"])}</div><div class="cp-card"><h3 class="font-serif">Night</h3>${list(["Gentle cleanser", "Treatment cream your doctor suggests", "Barrier-repair moisturiser", "Good sleep. Your skin repairs at night"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Your skin type", "Exosomes for Every Skin Type", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Indian and darker skin tones", "Exosomes are gentle and calming, with a low risk of pigmentation, so they are a safe choice for darker skin. When combined with microneedling or laser, they can even reduce the chance of post-treatment darkening."],
   ["Sensitive or rosacea-prone skin", "One of the best options for sensitive skin. We usually start with a needle-free exosome infusion and add microneedling only once your skin is calmer."],
   ["Oily, acne-prone skin", "Exosomes are light and non-greasy. They help calm inflammation and heal acne marks. Active breakouts are treated first so we work on clear skin."],
   ["Dry or dehydrated skin", "Exosomes help skin hold moisture and repair its barrier, so dry skin feels more comfortable and looks plumper."],
   ["Mature skin", "Great for gradual firming and fine lines. For deeper wrinkles or sagging, we often combine exosomes with skin boosters, HIFU or laser."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "Exosomes vs PRP, PDRN and Skin Boosters", "All four help skin repair and glow, but they work in different ways. Here's a quick comparison.")}
 ${k.compareTable(["Exosomes", '<a href="/prp-face-treatment/">PRP</a>', '<a href="/pdrn-skin-treatment-in-kerala/">PDRN</a>', '<a href="/skin-booster-restylane-treatment-trivandrum/">Skin Boosters</a>'], [
   ["What it is", "Lab-made cell messengers with growth signals", "Growth factors from your own blood", "DNA fragments (salmon DNA) that support repair", "Injectable hyaluronic acid"],
   ["Best for", "Repair, glow, scars, sensitive skin", "Glow, texture, under-eyes", "Repair, elasticity, scars", "Deep hydration, fine lines"],
   ["Blood draw needed", "No", "Yes", "No", "No"],
   ["Downtime", "0–2 days", "1–2 days", "1–2 days", "1–3 days (small bumps)"],
   ["Sessions", "4–6", "3–4", "3–4", "2–3"],
   ["Pairs with microneedling", "Excellent", "Yes", "Yes", "Not usually"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Exosome Treatment in Kerala?</h2>
 ${img("825-Trivandrum-clinic.webp", "Facelit skin clinic treatment room in Trivandrum", 1024, 585, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Personal doctor consultation", "Every plan starts with a one-to-one skin assessment, a look at your medical history and an honest talk about what exosomes can and can't do for you."],
   ["Quality, purified products", "We use professional exosome products from trusted sources, stored and handled the right way."],
   ["Combined with the right tools", "Microneedling, MNRF, CO2 laser and peels are all under one roof, so your exosomes can be paired with what your skin really needs."],
   ["Safe and sterile", "Treatments are done in a fully sterile setting following strict medical hygiene standards."],
   ["Support from start to finish", "Clear pre-care and aftercare instructions, and progress checks at every session."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Exosome Treatment Side Effects", "Exosome treatments are well tolerated. Here's what is normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Mild redness for a few hours to 2 days", "Slight tightness or dryness", "Tiny pinpoint marks after microneedling, gone in a day or two", "Mild swelling in delicate areas like under the eyes"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant or breastfeeding", "Have active acne, infection, cold sores or eczema on the area", "Have a history of skin cancer", "Have an autoimmune condition or take immune-suppressing medicines", "Tend to form keloids (if microneedling is planned)"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "Exosome Skin Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Related treatments &amp; reading", "Explore More Skin Rejuvenation Treatments", "")}
 ${k.links([["/best-exosome-skin-treatment/", "Guide", "Best exosome skin treatment"], ["/exosomes-hair-treatments/", "Treatment", "Exosome hair treatment"], ["/pdrn-skin-treatment-in-kerala/", "Treatment", "PDRN skin treatment"], ["/prp-face-treatment/", "Treatment", "PRP face treatment"], ["/mnrf-treatment/", "Treatment", "MNRF treatment"], ["/co2-fractional-laser/", "Treatment", "CO2 fractional laser"]])}`),

  k.cta("Not sure if exosomes are right for you?", "Book a consultation and our doctors will look at your skin, answer your questions and suggest the plan that fits your goals and schedule."),
];

k.writePage(process.argv[2], sections, {
  title: "Exosome Skin Treatment in Kerala for Glow, Scars & Ageing | Facelit",
  desc: "Doctor-led exosome skin treatment in Trivandrum, Kollam and Thrissur for fine lines, acne scars, dull skin and pigmentation. Little downtime, suits Indian skin. Book now.",
  image: "https://facelit.in/wp-content/uploads/2026/07/244-skin-pen-with-exosomes-jpg.webp",
  faqs,
  procedure: { name: "Exosome Skin Treatment", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face, under-eyes, neck, chest, hands",
    howPerformed: "Purified exosomes are applied to prepared skin, either with a needle-free infusion or straight after microneedling, MNRF or laser so they reach deeper layers.",
    preparation: "Doctor consultation; stop retinoids and exfoliating acids 3 to 5 days before microneedling; arrive with clean skin.",
    followup: "Leave product on for 6 to 8 hours, avoid makeup for 24 hours, avoid sun and heat for 48 hours, use sunscreen daily." },
  crumbs: [["Home", "https://facelit.in/"], ["Skin Treatments", "https://facelit.in/skin-treatments/"], ["Exosomes Skin Treatment", "https://facelit.in/exosomes-skin-treatment/"]],
});
