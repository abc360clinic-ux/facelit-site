// Builds the redesigned /glutathione-iv-drip/ page.
// Usage (from facelit-site/): node scripts/glutathione/build.mjs content/pages/glutathione-iv-drip.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const HERO = [A + "anti-aging-hero.webp", "Indian woman with bright, glowing skin after a glutathione IV drip at Facelit"];
const DRIP = [B + "466-iv-drip-tvm-1.webp", "Glutathione IV drip bag on a drip stand", 515, 515];
const BEFORE = [A + "skin-before-1-scaled.webp", "Indian woman with dull, uneven skin and marks before glutathione IV therapy", 1920, 2560];
const AFTER = [A + "skin-after-1-scaled.webp", "The same Indian woman with brighter, clearer, more even skin after glutathione IV therapy", 1920, 2560];
const TAN = [A + "Tan-and-Dark-Patches-on-Face2.webp", "Tan and dark patches on Indian skin", 1080, 1080];
const PIGMENT = [A + "Pigmentation-on-the-Face.webp", "Uneven pigmentation on the cheek", 1080, 1080];

const benefits = [
  ["spark", "Brighter, Glowing Skin", "Helps skin look clearer, fresher and more radiant."],
  ["tone", "More Even Tone", "Helps fade tan and dullness for a more even-looking complexion."],
  ["shield", "Powerful Antioxidant", "Glutathione is your body's main antioxidant, protecting cells from daily damage."],
  ["leaf", "Supports Natural Detox", "Helps the liver neutralise and clear harmful substances."],
  ["heal", "Immune Support", "Supports the immune cells that keep you well."],
  ["clock", "30–45 Minute Sessions", "Relax in a comfortable chair while the drip runs."],
  ["drop", "Full Absorption", "Delivered straight into the bloodstream, skipping the gut where tablets get broken down."],
  ["lift", "Feel Refreshed", "Many people feel more energised and refreshed after their drip."],
];

const finderResults = [
  { v: "tan", label: "Tan and dull skin", img: TAN, title: "Tan &amp; Glow Plan",
    text: "Sun, pollution and humidity leave skin tanned and tired. Glutathione helps skin look brighter and more even, especially alongside daily sunscreen.",
    soon: "Weekly Beauty Elixir drips for 4 weeks before your event, plus strict SPF.", steady: "A course of 6 to 8 weekly Beauty Elixir drips, then monthly maintenance.",
    sessions: "4–8, once a week", combine: "Daily SPF, gentle skincare" },
  { v: "pigment", label: "Uneven tone and pigmentation", img: PIGMENT, title: "Even Tone Plan",
    text: "Glutathione can help overall tone look more even. Stubborn patches like melasma need targeted skin treatment as well, so your doctor will plan both.",
    soon: "Weekly Beauty Elixir drips alongside your prescribed skin care.", steady: "A full course of weekly drips with a doctor-led pigmentation plan.",
    sessions: "6–8, once a week", combine: "Doctor-led pigmentation care" },
  { v: "bridal", label: "Wedding or event glow", img: AFTER, title: "Event Glow Plan",
    text: "Planning ahead makes a big difference. Starting 6 to 8 weeks before the day gives your skin time to look its brightest.",
    soon: "If your event is within 4 weeks, weekly Beauty Elixir drips starting now.", steady: "6 to 8 weekly Beauty Elixir drips, timed to finish a week before the day.",
    sessions: "4–8, once a week", combine: "Bridal skincare plan" },
  { v: "energy", label: "Tired and low energy", img: HERO.concat([1716, 1144]), title: "Wellness Plan",
    text: "A busy life, poor sleep and stress drain your body's antioxidant levels. Wellness Drips help you feel refreshed and support your immune system.",
    soon: "A Wellness Drip once a week for 3 to 4 weeks.", steady: "A Wellness Drip every 2 to 4 weeks as part of your routine.",
    sessions: "3–4, then as needed", combine: "Sleep, hydration, nutrition" },
  { v: "recovery", label: "Recovering after illness or travel", img: [A + "about-hero.webp", "Facelit doctor consulting a patient", 1151, 768], title: "Recovery Plan",
    text: "After a fever, travel, intense training or a hectic period, Recovery Drips help rehydrate you and top up antioxidants and vitamins.",
    soon: "One Recovery Drip, repeated after a week if needed.", steady: "Recovery Drips as needed after heavy training or travel.",
    sessions: "1–3, as needed", combine: "Rest and hydration" },
  { v: "ageing", label: "Early signs of ageing", img: BEFORE, title: "Antioxidant Glow Plan",
    text: "Oxidative stress from sun and pollution speeds up skin ageing. Glutathione is a strong antioxidant that helps skin look fresher and healthier.",
    soon: "Weekly Beauty Elixir drips for a quick refresh.", steady: "Monthly Beauty Elixir drips with daily SPF and a good skincare routine.",
    sessions: "4, then monthly", combine: "SPF, antioxidant skincare" },
];

const explained = [
  ["What is glutathione?", "Glutathione is a small molecule made naturally in every cell of your body from three amino acids: glutamine, cysteine and glycine. It's often called the \"master antioxidant\" because it protects cells from damage, helps the liver process toxins and keeps the immune system working well."],
  ["Why do glutathione levels drop?", "Your body makes less glutathione with age. Levels also fall with stress, poor sleep, pollution, sun exposure, smoking, alcohol, illness and intense exercise. Low levels can show up as tired, dull skin and low energy."],
  ["How does glutathione brighten skin?", "Melanin is the pigment that gives skin its colour. Glutathione slows down tyrosinase, the enzyme that makes melanin, and shifts production towards a lighter form of pigment. It also fights the oxidative stress that makes skin look dull. Together, this helps skin look brighter and more even over a course of sessions."],
  ["Why an IV drip instead of tablets?", "Glutathione taken by mouth is largely broken down in the stomach and gut before it reaches the blood. An IV drip delivers it straight into the bloodstream, so much more of it is available to your cells."],
  ["Why is vitamin C often added?", "Vitamin C is an antioxidant too, and it helps keep glutathione in its active form. It also supports collagen for healthier-looking skin. Your doctor will tell you exactly what's in your drip."],
  ["Brightening vs whitening: what to expect", "A glutathione drip won't change your natural skin colour. What it can do is help reduce tan and dullness so your own skin tone looks brighter, clearer and more even. Results vary from person to person and are best with daily sunscreen."],
  ["How long do the results last?", "The glow builds gradually over a course and usually lasts a few months. Sun exposure, stress and lifestyle affect how long. Monthly maintenance drips and daily SPF help keep results."],
  ["Is it only for women?", "No. Men use glutathione drips for tan, dull skin, energy and recovery after training."],
];

const menuRows = [
  ["Beauty Elixir", "Glow", "glow", "Our skin-focused drip for a brighter, more even, glowing complexion. Buy 3 get 1 free, buy 5 get 2 free.", ["Glow", "Tan", "Even tone"], "Glutathione-based drip, usually paired with vitamin C, given over 30 to 45 minutes.", "None", "4–8, weekly"],
  ["Wellness Drips", "Energy", "wellness", "Supports energy, immunity and overall wellbeing for busy, stressful lives. Buy 3 get 1 free, buy 5 get 2 free.", ["Energy", "Immunity"], "An antioxidant and vitamin drip planned by your doctor.", "None", "3–4, then as needed"],
  ["Recovery Drips", "Recovery", "recovery", "Rehydrate and recharge after illness, travel or intense training. Buy 3 get 1 free, buy 5 get 2 free.", ["Recovery", "Hydration"], "Fluids, antioxidants and vitamins to help your body bounce back.", "None", "1–3, as needed"],
];

const faqs = [
  ["What is a glutathione IV drip?", "A glutathione IV drip delivers glutathione, your body's main antioxidant, straight into a vein through a thin cannula. It's used to help skin look brighter and more even, and to support antioxidant protection, immunity and energy."],
  ["Does glutathione IV make skin fairer?", "It won't change your natural skin colour. It can help reduce tan and dullness so your own skin tone looks brighter and more even. Results vary from person to person."],
  ["How many glutathione drips will I need?", "Most people have 4 to 8 sessions, once a week, followed by a monthly maintenance drip. Your doctor will plan the number based on your goals."],
  ["When will I see results?", "Some people notice fresher skin after 2 to 3 sessions. Brighter, more even skin usually shows after 4 to 6 weekly drips."],
  ["How long does a session take?", "About 30 to 45 minutes. You sit back in a comfortable chair while the drip runs."],
  ["Does it hurt?", "You'll feel a small pinch when the cannula goes in, like a blood test. After that, most people feel nothing and simply relax."],
  ["Is glutathione IV safe?", "When given by trained medical staff after a proper health check, it's generally well tolerated. We screen every patient first, use quality, sterile products and monitor you during the drip."],
  ["What are the side effects?", "Mild bruising or soreness at the drip site is the most common. Some people feel a cool sensation in the arm, a mild headache or light-headedness. Allergic reactions are rare, which is why we monitor you."],
  ["Who should not have a glutathione drip?", "It isn't advised during pregnancy or breastfeeding, or for people with known allergies to the ingredients. People with kidney or liver disease, asthma, or G6PD deficiency (if vitamin C is included) need a doctor's assessment first."],
  ["Is IV better than glutathione tablets?", "IV delivery puts glutathione straight into the bloodstream. Tablets are largely broken down in the gut, so less reaches your cells. Some people use both, with their doctor's advice."],
  ["Do I need to avoid the sun?", "Yes, as much as you can. Sun exposure triggers new tan and pigment, so daily SPF 30 or higher is essential to see and keep results."],
  ["Can men take glutathione drips?", "Yes. Men use them for tan, dull skin, energy and recovery."],
  ["What's the difference between Beauty Elixir, Wellness and Recovery drips?", "Beauty Elixir focuses on skin glow and even tone. Wellness Drips support energy and immunity. Recovery Drips help you bounce back after illness, travel or training."],
  ["Can I go back to work after the drip?", "Yes. There's no downtime, so you can go straight back to your day."],
  ["Where can I get a glutathione IV drip in Kerala?", "Facelit offers glutathione IV drips in Trivandrum and Karunagappally (Kollam)."],
  ["How much does a glutathione IV drip cost?", "It depends on the drip and the number of sessions. Our packages include buy 3 get 1 free and buy 5 get 2 free offers. Book a consultation for a personalised quote."],
];

const sections = [
  k.hero({
    tags: ["Skin glow", "IV therapy", "Doctor-supervised"], h1: "Glutathione IV Drip",
    img: HERO, pos: "65% 40%",
    intro: "Skin looking dull, tanned or uneven no matter what you put on it? A glutathione IV drip delivers your body's master antioxidant straight into your bloodstream, helping your skin look brighter, clearer and more even from within. It also supports immunity and energy, in a relaxing 30 to 45 minute session with no downtime.",
    facts: [["30–45 min", "Per drip"], ["None", "Downtime"], ["4–8", "Weekly sessions"], ["Monthly", "Maintenance"]],
    cta2: ["#finder", "Find your drip plan"],
  }),
  k.jump([["overview", "Overview"], ["explained", "Glutathione explained"], ["finder", "Find your plan"], ["drips", "Our drips"], ["course", "Your course"], ["process", "Process"], ["results", "Results"], ["safety", "Safety"], ["compare", "IV vs tablets"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is a Glutathione IV Drip?</h2>
 <div class="cp-prose">
 <p>Glutathione is a powerful antioxidant your body makes naturally. It protects your cells, helps the liver clear toxins and supports your immune system. It also plays a part in how much pigment your skin produces.</p>
 <p>Sun, pollution, stress, poor sleep and age all drain your glutathione levels, and it often shows on your skin as tan, dullness and an uneven tone. A glutathione IV drip tops your levels back up by delivering glutathione straight into a vein, where your body can use it fully. Over a course of weekly sessions, skin looks brighter, clearer and more radiant, and many people feel more energised too.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: how glutathione works in the skin ${k.plus}</summary>
 <div class="cp-prose">
 <p>Skin makes two kinds of melanin: darker eumelanin and lighter pheomelanin. Glutathione slows tyrosinase, the enzyme that starts melanin production, and nudges it towards the lighter type. It also mops up free radicals from sun and pollution that make skin look tired and uneven.</p>
 <p>The effect is gradual and works with your natural skin tone. It doesn't bleach the skin. It helps it look its healthiest and most even.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How a glutathione drip works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Deliver</b><span>Glutathione goes straight into the bloodstream for full absorption.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Protect</b><span>It neutralises free radicals and supports your body's natural detox.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Brighten</b><span>Over weekly sessions, tan and dullness fade for a more even glow.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...DRIP)}
 ${img(...AFTER)}
 </div>
 </div>`),

  shell("explained", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Glutathione explained", "Everything You Need to Know", "Tap a question to read the answer. Short, clear and honest.")}
 <div class="cp-faq cp-faq--compact">${accordion(explained)}</div>
 </div>
 <div class="cp-split-sep">
 ${head("Inside the drip", "What Your Drip Can Contain", "Every drip is planned by our doctors. These are the most common ingredients.")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Glutathione", "The master antioxidant. It's the main ingredient for skin glow and even tone, and it supports detox and immunity."],
   ["Vitamin C", "An antioxidant that helps keep glutathione active and supports collagen for healthier-looking skin."],
   ["B vitamins", "Help your body turn food into energy. Often included in wellness and recovery drips."],
   ["Hydrating fluids", "A saline base that rehydrates you and carries the ingredients into your bloodstream."],
 ], false)}</div>
 <p class="cp-note">The exact contents depend on the drip you choose and your health check.</p>
 </div>
 </div>`),

  shell("finder", `${head("Find your plan", "Which Drip Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan after a health check.")}
 ${k.finder({ q1: "What's your main goal?", q2: { label: "When do you want to see results?", dt: "Our suggestion", options: [["soon", "Soon, within 4 weeks"], ["steady", "No rush, I want lasting results"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of a Glutathione IV Drip", "Glow on the outside, antioxidant support on the inside.")}${k.benefitsGrid(benefits)}`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Is it right for you?", "Skin Concerns Glutathione Can Help", "Tap a concern to see how glutathione helps and what to expect.")}
 ${tabs("concerns", [
   { tab: "Sun tan", body: `<p class="cp-p" style="margin-top:0">Kerala's strong sun leaves many people with a stubborn tan on the face, neck and arms. Glutathione helps slow new pigment and supports the skin as the tan fades, for a more even look.</p>${list(["Helps tan fade faster", "More even face and body", "Best with daily SPF"])}` },
   { tab: "Dull, tired skin", body: `<p class="cp-p" style="margin-top:0">Stress, late nights and pollution drain the skin's antioxidants, leaving it flat and grey-looking. Topping up glutathione helps bring back a healthy glow.</p>${list(["Fresher, brighter skin", "Healthy radiance", "Often noticed after 2 to 3 drips"])}` },
   { tab: "Uneven tone", body: `<p class="cp-p" style="margin-top:0">Patchy, uneven skin tone often comes from sun damage and old marks. Glutathione helps the overall tone look more even.</p>${list(["More even complexion", "Softer-looking dark patches", "Works with your skincare"])}` },
   { tab: "Marks &amp; pigmentation", body: `<p class="cp-p" style="margin-top:0">Glutathione supports brighter, clearer skin and can help marks look softer. Deeper pigmentation like melasma needs targeted treatment too, so we plan both together.</p>${list(["Supports pigmentation care", "Clearer-looking skin", "Doctor-led plan for melasma"])}` },
 ])}
 </div>
 <div class="cp-split-sep">${head("Good to know", "Glutathione for Indian Skin", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Realistic results", "Glutathione helps your own skin tone look its brightest and most even. It doesn't change the colour you were born with, and anyone who promises that isn't being honest."],
   ["Sunscreen is non-negotiable", "Indian skin tans easily. Without daily SPF 30 or higher, new tan can quickly cancel out your results."],
   ["Kerala's climate", "Heat, humidity and strong UV all increase oxidative stress. That's why many people here notice a clear difference with antioxidant support."],
   ["Best with good skincare", "A gentle cleanser, moisturiser, sunscreen and a doctor-recommended brightening serum help the results show and last."],
 ], false)}</div></div>
 </div>`),

  shell("drips", `${head("Our drips", "Glutathione &amp; IV Drip Packages at Facelit", "Choose the drip that matches your goal. Every package comes with our buy 3 get 1 free and buy 5 get 2 free offers.")}
 ${k.menu([["all", "All"], ["glow", "Skin glow"], ["wellness", "Wellness"], ["recovery", "Recovery"]], menuRows, "drips")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("course", `${head("Your course", "How a Glutathione Course Works", "Glutathione works best as a short course of weekly drips, followed by maintenance.")}
 ${k.timeline([["Week 1", "Health check and first drip", "A quick consultation and health screening, then your first 30 to 45 minute drip."], ["Weeks 2–3", "Feel the difference", "Many people feel refreshed and notice fresher-looking skin after 2 to 3 drips."], ["Weeks 4–8", "See the glow", "Skin looks brighter, clearer and more even as the course builds."], ["Monthly", "Maintain", "One drip a month, plus daily sunscreen, helps keep your glow."]])}`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Glutathione IV Drip Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor doing a health check before an IV drip", 1151, 768], lead: "A health check comes first.",
     items: ["Your doctor talks through your goals, medical history, allergies and medicines.", "We check your blood pressure and make sure the drip is safe for you.", "Drink plenty of water the day before and on the day, so veins are easier to find.", "Eat a light meal before you come. Don't come on an empty stomach.", "Avoid alcohol for 24 hours before."] },
   { tab: "02 · During", img: DRIP, lead: "The drip runs for 30 to 45 minutes.",
     items: ["You relax in a comfortable chair.", "A thin cannula is placed in a vein in your arm, with a small pinch.", "The drip runs slowly, and our team checks on you throughout.", "You can read, use your phone or simply rest.", "Tell us straight away if you feel unwell or uncomfortable."] },
   { tab: "03 · After", img: AFTER, lead: "Go straight back to your day.",
     items: ["The cannula is removed and a small plaster applied.", "Press on the spot for a minute to prevent bruising.", "Keep drinking water through the day.", "Apply sunscreen every day to protect your results.", "Book your next drip in about a week."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "What Results Can You Expect?", "Glutathione works gradually, so your skin looks naturally brighter, not suddenly different.")}
 <div class="cp-two cp-two--tight">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have tan, dullness or uneven tone", "Want a brighter glow before a wedding or event", "Feel tired and run down", "Want antioxidant support for your skin and body"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Are pregnant or breastfeeding", "Want to change your natural skin colour", "Have deep melasma and want a single fix", "Skip sunscreen"], warn)}</div>
 </div>
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After a course</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "Make Your Glow Last", "Simple habits that help glutathione work and keep your results going.")}${tabs("aftercare", [
   { tab: "Same day", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Keep the plaster on for an hour", "Drink plenty of water", "Eat a balanced meal"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Heavy lifting with the drip arm", "Alcohol", "Rubbing the drip site"], warn)}</div></div>` },
   { tab: "Every day", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["SPF 30 or higher, reapplied outdoors", "Fruits and vegetables rich in vitamin C", "7 to 8 hours of sleep", "Gentle, hydrating skincare"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Midday sun without protection", "Smoking", "Too much alcohol and junk food"], warn)}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "Glutathione Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"Glutathione will make me several shades fairer.\"", "It helps your natural tone look brighter and more even. It doesn't change the skin colour you were born with."],
   ["\"One drip is enough.\"", "Results build over a course of weekly drips, usually 4 to 8."],
   ["\"Tablets work just as well.\"", "Much of the glutathione in tablets is broken down in the gut. An IV drip delivers it straight into the blood."],
   ["\"Results last forever.\"", "Sun, stress and lifestyle wear them down. Monthly maintenance and daily SPF help."],
   ["\"It's just a beauty fad.\"", "Glutathione is a real antioxidant your body depends on. Its effects on skin are gradual and work best alongside good skincare."],
 ], false)}</div></div>
 </div>`),

  shell("compare", `${head("Compare", "IV Drip vs Tablets vs Creams", "Three ways to use glutathione, and how they differ.")}
 ${k.compareTable(["IV drip", "Tablets", "Creams and serums"], [
   ["How it's taken", "Straight into a vein", "By mouth", "On the skin"],
   ["Absorption", "Full, straight into the blood", "Much is broken down in the gut", "Works on the surface"],
   ["Works on", "The whole body and skin", "The whole body, more slowly", "The area you apply it to"],
   ["Speed of results", "Weeks", "Months", "Months"],
   ["Supervised by doctors", "Yes", "Not usually", "Not usually"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Glutathione IV Drips?</h2>
 ${img(A + "eco-doctor-devi.webp", "Facelit doctor", 672, 891, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Doctor-led health check", "Every patient is screened by a doctor before their first drip, so we know it's safe for you."],
   ["Medical-grade products", "We use high-quality, medical-grade glutathione and sterile, single-use equipment."],
   ["Monitored throughout", "Trained staff place your drip and check on you during the whole session."],
   ["Honest results", "We'll tell you what glutathione can and can't do, and plan skin treatments alongside it if needed."],
   ["Relaxing setting", "Comfortable chairs and a calm space, so your drip feels like a break in your day."],
 ])}
 </div>`),

  shell("safety", `${head("Safety first", "Side Effects and Who Should Wait", "Glutathione drips are generally well tolerated when given under medical supervision. Here's what to know.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["A small bruise or soreness at the drip site", "A cool feeling in the arm during the drip", "A mild headache or light-headedness", "Rarely, an allergic reaction, which is why we monitor you"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant or breastfeeding", "Have kidney or liver disease", "Have asthma", "Have G6PD deficiency (important if vitamin C is included)", "Have any known allergies or take regular medicines"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "Glutathione IV Drip FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "Glutathione IV Drips at Facelit", "")}
 ${k.links([["/glutathione-iv-drip-in-trivandrum-kerala/", "Location", "Glutathione IV drip in Trivandrum"], ["/glutathione-iv-drip-in-karunagappally/", "Location", "Glutathione IV drip in Karunagappally"], ["/best-iv-therapy-clinic-in-trivandrum/", "Location", "IV therapy clinic in Trivandrum"], ["/beauty-iv-therapy-for-glowing-skin-in-trivandrum/", "Guide", "Beauty IV therapy for glowing skin"], ["/cost-of-iv-therapy-in-trivandrum/", "Cost", "IV therapy cost in Trivandrum"]])}`),

  k.cta("Ready for your brightest, healthiest-looking skin?", "Book a consultation. Our doctors will check your health, explain realistic results and plan the right drip for you."),
];

k.writePage(process.argv[2], sections, {
  title: "Glutathione IV Drip in Trivandrum & Kollam for Glowing Skin | Facelit",
  desc: "Doctor-supervised glutathione IV drips at Facelit, Trivandrum & Karunagappally. Helps fade tan and dullness for brighter, more even skin, with antioxidant and immune support.",
  image: "https://facelit.in/wp-content/uploads/2026/08/anti-aging-hero.webp",
  faqs,
  procedure: { name: "Glutathione IV Drip", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Administered intravenously in the arm",
    howPerformed: "After a doctor's health check, glutathione (often with vitamin C) is given through a thin cannula in an arm vein as a slow intravenous drip over 30 to 45 minutes while the patient is monitored.",
    preparation: "Health screening, good hydration, a light meal beforehand and no alcohol for 24 hours.",
    followup: "No downtime. Keep hydrated, use daily sunscreen and repeat weekly for 4 to 8 sessions, then monthly maintenance." },
  crumbs: [["Home", "https://facelit.in/"], ["Body", "https://facelit.in/body-contouring/"], ["Glutathione IV Drip", "https://facelit.in/glutathione-iv-drip/"]],
});
