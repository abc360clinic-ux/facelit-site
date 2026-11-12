// Builds the redesigned /obesity-and-weight-management/ category hub page.
// Usage (from facelit-site/): node scripts/weight-hub/build.mjs content/pages/obesity-and-weight-management.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";
const M = "/wp-content/uploads/2026/11/";

const HERO = [A + "obesity-weight-management-hero.webp", "Healthy, smiling Indian woman after a weight management programme at Facelit"];
const BEFORE = [A + "obesity-before-scaled-1.webp", "Indian woman at the start of her weight management journey", 1920, 2560];
const AFTER = [A + "obesity-after-scaled-1.webp", "The same Indian woman after a doctor-led weight management programme", 1920, 2560];

// Services: key -> [url, name, image, alt, w, h, isMachine, line, bestFor, who, how]
const S = {
  mwm: ["/medical-weight-management/", "Medical Weight Management", A + "about-hero.webp", "Facelit doctor planning a weight loss programme", 1151, 768, false, "Doctor-led weight loss that finds and treats the cause, from PCOS to insulin resistance.", "Obesity, PCOS, diabetes, plateaus", "Doctor", "Reviews every 2–4 weeks"],
  inj: ["/weight-loss-injections/", "Weight Loss Injections", A + "obesity-after-scaled-1.webp", "Confident Indian woman after weight loss", 1920, 2560, false, "Doctor-prescribed weekly medicines like tirzepatide and semaglutide, monitored closely.", "Obesity with health risks", "Doctor", "Weekly injection"],
  nut: ["/nutrition-counselling/", "Nutrition Counselling", A + "obesity-weight-management-hero-1.webp", "Indian woman with fruit and water", 1769, 1180, false, "Practical Kerala meal plans, with no crash diets and no giving up rice.", "Weight loss, PCOS, diabetes, skin and hair", "Nutrition specialist", "Regular follow-ups"],
  coach: ["/lifestyle-coaching/", "Lifestyle Coaching", A + "contact-hero.webp", "Friendly welcome at the Facelit clinic", 1746, 1164, false, "Sleep, movement, stress and routine: the habits that make weight loss last.", "Yo-yo dieting, low energy, busy lives", "Coach", "Regular check-ins"],
  bca: ["/body-composition-analysis/", "Body Composition Analysis", A + "about-hero.webp", "Doctor explaining a body composition report", 1151, 768, false, "An InBody test that measures fat, muscle and visceral fat in about a minute.", "Everyone starting a plan", "Doctor review", "Every 4–8 weeks"],
  contour: ["/body-contouring/", "Body Contouring", M + "cm-slim-machine.webp", "CM Slim body contouring machine", 310, 588, true, "CM Slim, HIFU and more to shape stubborn areas and tighten loose skin.", "Stubborn areas near goal weight", "Doctor-planned", "Short courses"],
};
const rec = (keys) => `<div class="sk-rec">${keys.map((x) => `<a href="${S[x][0]}"><b>${S[x][1]}</b><span>${S[x][7]}</span>${k.arrow}</a>`).join("")}</div>`;

const concerns = [
  ["Weight gain", "Steady weight gain over months or years usually comes from a mix of habits, hormones, stress and sleep. We find your mix.", ["bca", "mwm", "nut"]],
  ["Belly fat", "Fat around the tummy is the most harmful kind, linked to diabetes, fatty liver and heart disease. Measuring it is the first step.", ["bca", "mwm", "contour"]],
  ["PCOS weight gain", "Insulin resistance in PCOS makes weight easy to gain and hard to lose. A medical plan targets the cause.", ["mwm", "nut", "inj"]],
  ["Slow metabolism", "Thyroid problems, low muscle and years of crash dieting can slow your metabolism. We test and rebuild.", ["bca", "mwm", "coach"]],
  ["Emotional eating", "Eating to cope with stress, boredom or tiredness is common. Coaching helps you spot triggers and find other ways to cope.", ["coach", "nut"]],
  ["Diabetes &amp; metabolic risk", "Losing even 5 to 10% of your weight can improve blood sugar, blood pressure and fatty liver.", ["mwm", "inj", "nut"]],
  ["Obesity", "Obesity is a medical condition, not a lack of willpower. A doctor-led programme gives you the best chance of lasting results.", ["mwm", "inj", "coach"]],
  ["Stubborn areas &amp; loose skin", "Close to your goal but left with stubborn fat or loose skin? Contouring finishes the job.", ["contour"]],
];

const journey = [
  { tab: "1 · Measure", body: `<p class="cp-p" style="margin-top:0">Start with the facts. A body composition analysis and doctor consultation show your fat, muscle, visceral fat and health risks.</p>${rec(["bca"])}` },
  { tab: "2 · Treat the cause", body: `<p class="cp-p" style="margin-top:0">Our doctors check for insulin resistance, PCOS, thyroid problems and more, and treat what's really driving your weight.</p>${rec(["mwm", "inj"])}` },
  { tab: "3 · Change habits", body: `<p class="cp-p" style="margin-top:0">Food, sleep, movement and stress, built around Kerala life, so the changes stick.</p>${rec(["nut", "coach"])}` },
  { tab: "4 · Shape &amp; maintain", body: `<p class="cp-p" style="margin-top:0">Contour stubborn areas, tighten loose skin and keep your results with regular check-ins.</p>${rec(["contour", "bca"])}` },
];

const finderResults = [
  { v: "lot", label: "A lot of weight to lose", img: BEFORE, title: "Full Medical Programme",
    text: "With more to lose, a doctor-led programme with regular reviews is the safest and most effective route.",
    first: "Body composition test, blood tests and a medical plan, with injections considered if suitable.", tried: "We look for the hidden causes behind past failures, then build a fresh plan with closer support.",
    sessions: "A 6–12 month programme", combine: "Nutrition, coaching" },
  { v: "some", label: "5 to 10 kg to lose", img: [A + "obesity-weight-management-hero-1.webp", "Indian woman", 1769, 1180], title: "Steady Loss Plan",
    text: "A structured food and habit plan usually works well, with medical support if progress stalls.",
    first: "Nutrition counselling and lifestyle coaching, tracked with body composition tests.", tried: "A medical review for hidden causes, plus a new nutrition and coaching plan.",
    sessions: "A 3–6 month programme", combine: "Body composition analysis" },
  { v: "pcos", label: "PCOS or hormones", img: [A + "anti-aging-hero.webp", "Indian woman", 1716, 1144], title: "Hormone-Aware Plan",
    text: "PCOS and thyroid problems need a plan that treats hormones and insulin resistance, not just calories.",
    first: "Hormone and insulin tests, a PCOS-friendly diet and medical care.", tried: "A deeper medical review, and weight-loss medicines if suitable.",
    sessions: "Reviews every 4 weeks", combine: "Nutrition counselling" },
  { v: "sugar", label: "Diabetes or prediabetes", img: [A + "about-hero.webp", "Doctor consultation", 1151, 768], title: "Metabolic Health Plan",
    text: "Weight loss is one of the most powerful treatments for blood sugar, and we monitor your health throughout.",
    first: "A medical plan with sugar-friendly eating and regular HbA1c checks.", tried: "Medicines that help both sugar and weight, if suitable, with closer monitoring.",
    sessions: "Reviews every 2–4 weeks", combine: "Weight-loss injections" },
  { v: "habits", label: "I know what to do, I just don't do it", img: [A + "contact-hero.webp", "Clinic welcome", 1746, 1164], title: "Habit Change Plan",
    text: "The problem usually isn't knowledge, it's habits and routine. Coaching makes change feel doable.",
    first: "Lifestyle coaching with one or two small changes at a time.", tried: "Coaching with closer check-ins, plus nutrition support.",
    sessions: "Regular check-ins", combine: "Nutrition counselling" },
  { v: "shape", label: "Close to goal, want to shape up", img: AFTER, title: "Shape &amp; Tone Plan",
    text: "If you're near your goal weight, body contouring targets the stubborn areas that remain.",
    first: "A body composition test, then CM Slim or HIFU on your stubborn areas.", tried: "Contouring plus nutrition to break through the last few kilos.",
    sessions: "Short courses", combine: "Body composition tracking" },
];

const faqs = [
  ["What is obesity and weight management?", "It's a medical approach to losing weight and keeping it off. At Facelit, it combines body composition analysis, doctor assessment, nutrition counselling, lifestyle coaching, weight-loss medicines where suitable, and body contouring."],
  ["Is obesity really a medical condition?", "Yes. Obesity is a chronic condition influenced by genes, hormones, sleep, stress, medicines and environment, not just willpower. That's why medical support makes such a difference."],
  ["Which weight management service is right for me?", "It depends on how much weight you want to lose, your health and what's held you back before. Most people start with a body composition analysis and doctor consultation, and we build the right mix from there."],
  ["What BMI counts as overweight for Indians?", "For Indian adults, a BMI of 23 or more is considered overweight and 25 or more obese, lower than international cut-offs, because health risks start at lower weights."],
  ["How much weight can I safely lose?", "About 0.5 to 1 kg a week is a safe, sustainable pace. Most people aim to lose 5 to 10% of their weight in the first 3 to 6 months."],
  ["Do you offer weight loss injections?", "Yes. Our doctors prescribe and monitor weekly medicines like tirzepatide and semaglutide for suitable people, always as part of a full plan."],
  ["Will I have to follow a strict diet?", "No. Our nutrition plans use foods you already eat, including rice and Kerala meals, with better portions and balance."],
  ["Can you help with PCOS or thyroid-related weight gain?", "Yes. We test for and treat hormone-related causes, and plan nutrition and medicines around them."],
  ["How do you track progress?", "With body composition analysis every 4 to 8 weeks, plus weight, waist and blood tests, so you can see fat loss, muscle and health changes, not just the scale."],
  ["What happens after I reach my goal?", "We move you to a maintenance plan with lifestyle support and less frequent check-ins, and body contouring for stubborn areas if you'd like."],
  ["Where can I get weight management in Kerala?", "Facelit offers obesity and weight management at our clinics in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does a weight management programme cost?", "It depends on the services and length of your programme. Book a consultation for a clear, personalised quote."],
];

const catNav = `
<nav class="sk-cats" aria-label="Treatment categories">
 <a href="/treatments/">All treatments</a><a href="/skin-treatments/">Skin</a><a href="/best-hair-treatments/">Hair</a><a href="/anti-aging-treatments/">Anti-aging</a><a href="/body-treatments/">Body</a><a href="/obesity-and-weight-management/" aria-current="page">Weight management</a>
</nav>`;

const cards = `
<div class="sk-cards cp-swipe">
 ${Object.values(S).map(([u, n, s, alt, w, h, mach, line, best, who, how]) => `<a class="sk-card" href="${u}">${mach ? `<div class="sk-mimg"><img src="${s}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async"></div>` : img(s, alt, w, h, "cp-img cp-img--43")}<div class="sk-cb"><h3 class="font-serif">${n}</h3><p>${line}</p><dl><div><dt>Best for</dt><dd>${best}</dd></div><div><dt>With</dt><dd>${who}</dd></div><div><dt>How often</dt><dd>${how}</dd></div></dl><span class="cp-textlink">Explore ${n} ${k.arrow}</span></div></a>`).join("\n ")}
</div>${k.swipeHint}`;

const stats = `
<div class="wh-stats">
 <div><b>5–10%</b><span>weight loss can improve blood sugar, BP and fatty liver</span></div>
 <div><b>23</b><span>BMI where \"overweight\" starts for Indian adults</span></div>
 <div><b>90 / 80 cm</b><span>healthy waist limit for men / women</span></div>
 <div><b>0.5–1 kg</b><span>a safe, sustainable weekly loss</span></div>
</div>`;

const pageCss = `<style>
.sk-cats{display:flex;gap:.5rem;overflow-x:auto;padding:.25rem 0 .5rem;scrollbar-width:none;margin-bottom:.5rem}.sk-cats::-webkit-scrollbar{display:none}
.sk-cats a{flex:none;padding:.55rem 1rem;border-radius:999px;border:1px solid rgba(58,77,57,.15);background:#fff;color:#2d3c2d;font:500 .88rem Onest,sans-serif;text-decoration:none;white-space:nowrap}
.sk-cats a[aria-current=page]{background:#3a4d39;color:#fdf7ef;border-color:#3a4d39}
.sk-cards{gap:1rem}@media(min-width:760px){.sk-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}}@media(min-width:1100px){.sk-cards{grid-template-columns:repeat(3,minmax(0,1fr))}}
.sk-card{display:flex;flex-direction:column;background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.25rem;overflow:hidden;text-decoration:none;color:#2d3c2d;transition:border-color .15s,transform .15s}
.sk-card:hover{border-color:#3a4d39;transform:translateY(-2px)}.sk-card .cp-img{border-radius:0;margin:0}.sk-card .cp-img--43{height:200px;width:100%;object-fit:cover;aspect-ratio:auto}
.sk-mimg{height:200px;background:#fff;display:flex;justify-content:center;align-items:center;padding:.75rem;border-bottom:1px solid rgba(58,77,57,.08);overflow:hidden}.sk-mimg img{height:176px;width:auto;max-width:100%;object-fit:contain}
.sk-cb{padding:1rem 1.1rem 1.2rem;display:flex;flex-direction:column;gap:.5rem;flex:1}
.sk-cb h3{margin:0;font-size:1.3rem;color:#2d3c2d}.sk-cb p{margin:0;font-size:.92rem;line-height:1.5;color:#5c574f}
.sk-cb dl{margin:.25rem 0 .4rem;display:grid;gap:.3rem}.sk-cb dl div{display:flex;gap:.5rem;font-size:.85rem}.sk-cb dt{color:#986a3e;font-weight:600;min-width:78px}.sk-cb dd{margin:0;color:#2d3c2d}
.sk-cb .cp-textlink{margin-top:auto}
.sk-rec{display:grid;gap:.6rem;margin-top:.9rem}
.sk-rec a{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"b i" "s i";column-gap:.75rem;align-items:center;padding:.85rem 1rem;border:1px solid rgba(58,77,57,.14);border-radius:1rem;background:#fff;text-decoration:none;color:#2d3c2d}
.sk-rec a:hover{border-color:#3a4d39;background:#f3efe4}.sk-rec b{grid-area:b;font:600 1rem Onest,sans-serif}.sk-rec span{grid-area:s;font-size:.85rem;color:#5c574f;line-height:1.4}.sk-rec svg{grid-area:i;width:1rem;height:1rem;color:#986a3e}
.wh-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem;margin-top:1.25rem}@media(min-width:900px){.wh-stats{grid-template-columns:repeat(4,minmax(0,1fr))}}
.wh-stats div{background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.1rem;padding:1rem}
.wh-stats b{display:block;font:500 1.6rem/1.1 Onest,sans-serif;color:#3a4d39;margin-bottom:.35rem}.wh-stats span{font-size:.85rem;line-height:1.45;color:#5c574f}
@media(max-width:759px){.sk-cards.cp-swipe>.sk-card{flex:0 0 82%}}
</style>`;

const sections = [
  k.hero({
    tags: ["Weight management", "Doctor-led", "Real Kerala food"], h1: "Obesity &amp; Weight Management in Kerala",
    img: HERO, pos: "62% 30%",
    intro: "Tried diets that didn't last, or losing weight only to gain it back? Lasting weight loss needs more than willpower. At Facelit, we measure what's really going on, treat causes like PCOS, insulin resistance and thyroid problems, and give you a plan built around Kerala food and real life. It's all under one roof, with doctors, nutrition specialists and coaches who stay with you.",
    facts: [["6", "Services, one plan"], ["Doctor-led", "Every step"], ["0.5–1 kg", "Safe weekly loss"], ["3", "Clinics in Kerala"]],
    cta2: ["#start", "Where should I start?"],
  }),
  shell("", `${catNav}${k.jump([["start", "Your concern"], ["journey", "Your journey"], ["services", "Services"], ["finder", "Find your plan"], ["compare", "Compare"], ["facts", "Know the facts"], ["faq", "FAQs"]])}`, "p-0 bg-transparent border-0"),

  shell("start", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Start with your concern", "What Would You Like to Improve?", "Tap your main concern to see the services that help most.")}
 ${tabs("concerns", concerns.map(([t, intro, keys]) => ({ tab: t, body: `<p class="cp-p" style="margin-top:0">${intro}</p>${rec(keys)}` })))}
 </div>
 <div class="cp-split-sep">
 ${head("Why diets fail", "Why Losing Weight Feels So Hard", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Your body fights back", "When you cut calories hard, hunger hormones rise and your metabolism slows. That's why crash diets almost always end in regain."],
   ["Hidden medical causes", "Insulin resistance, PCOS, thyroid problems, poor sleep and some medicines can make weight loss much harder."],
   ["Losing muscle, not fat", "Fast dieting burns muscle, which slows your metabolism. Measuring body composition keeps you on the right track."],
   ["Plans that don't fit your life", "Strict plans that ban rice or ignore family meals rarely last. Real change has to fit real life."],
 ], false)}</div>
 </div>
 </div>`),

  shell("journey", `${head("Your journey", "Four Steps to a Healthier Weight", "Most people follow these steps. Tap each one to see which services help. You might start at any step.")}${tabs("journey", journey)}`),

  shell("services", `${head("Our services", "Weight Management Services at Facelit", "Everything you need under one roof. Tap a service to explore it.")}${cards}`),

  shell("finder", `${head("Find your plan", "Where Should You Start?", "Answer two quick questions to see the programme our team most often recommends.")}
 ${k.finder({ q1: "What best describes you?", q2: { label: "Have you tried to lose weight before?", dt: "Our approach", options: [["first", "Not seriously yet"], ["tried", "Yes, many times"]] }, results: finderResults })}`),

  shell("compare", `${head("Compare services", "Weight Management Services at a Glance", "Scroll sideways on mobile to see every column.")}
 ${k.compareTable(Object.values(S).map(([u, n]) => `<a href="${u}">${n}</a>`), [
   ["What it does", "Finds and treats causes", "Reduces hunger and cravings", "Personal meal plans", "Builds lasting habits", "Measures fat and muscle", "Shapes stubborn areas"],
   ["Best for", ...Object.values(S).map((s) => s[8])],
   ["With", ...Object.values(S).map((s) => s[9])],
   ["How often", ...Object.values(S).map((s) => s[10])],
 ])}`),

  shell("facts", `
 ${head("Know the facts", "Weight and Your Health: The Numbers That Matter", "Small changes make a big difference, and Indian bodies have their own health targets.")}
 ${stats}
 <div class="cp-split cp-split--top" style="margin-top:2rem">
 <div>
 ${head("", "Health Risks Linked to Excess Weight", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Type 2 diabetes", "Belly fat drives insulin resistance, which leads to prediabetes and diabetes, often at lower weights in Indians."],
   ["Heart disease and high BP", "Extra weight strains the heart and raises blood pressure and cholesterol."],
   ["Fatty liver", "Very common with belly fat, and it often improves quickly with weight loss."],
   ["PCOS and fertility", "Weight and insulin resistance worsen PCOS, irregular periods and fertility problems."],
   ["Joint pain and sleep apnoea", "Extra weight loads the knees and back and can cause snoring and broken sleep."],
 ], false)}</div>
 </div>
 <div class="cp-split-sep">
 ${head("", "Weight Loss Myths, Busted", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["\"Just eat less and move more.\"", "That's part of it, but hormones, sleep, stress and medicines matter too."],
   ["\"Rice makes you fat.\"", "Portion size and balance matter more than cutting rice out."],
   ["\"Faster is better.\"", "Fast loss often means lost muscle and regained weight. Slow and steady lasts."],
   ["\"Weight-loss injections are a shortcut.\"", "They're a medical tool for the right people, used with diet and habits."],
   ["\"The scale tells the full story.\"", "Body composition shows whether you're losing fat or muscle."],
 ], false)}</div>
 </div>
 </div>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your first visit</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">What Happens When You Start</h2>
 ${k.processTabs([
   { tab: "01 · Consult", img: [A + "about-hero.webp", "Facelit doctor consultation", 1151, 768], lead: "We listen and understand.",
     items: ["Your weight history, health and medicines.", "Your routine, food, sleep and stress.", "What you want to achieve, and why."] },
   { tab: "02 · Measure", img: [A + "contact-hero.webp", "Clinic visit", 1746, 1164], lead: "We get the full picture.",
     items: ["Body composition analysis.", "Weight, waist and blood pressure.", "Blood tests if needed."] },
   { tab: "03 · Plan &amp; support", img: AFTER, lead: "A plan built around you.",
     items: ["The right mix of medical care, nutrition and coaching.", "Clear, realistic targets.", "Regular reviews and progress tracking."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "Build a Healthier Body. Sustain a Healthier Life.", "Lasting weight management goes beyond losing kilos. It's about better health, more energy and habits you can keep.")}
 ${k.timeline([["Weeks 1–4", "Feel the change", "More energy, better sleep and fewer cravings."], ["Months 2–3", "See the change", "Steady fat loss and a smaller waist."], ["Months 4–6", "Health gains", "Better blood sugar, BP and liver results."], ["Ongoing", "Keep it off", "Maintenance support so results last."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 </div>
 </div>`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Near you", "Weight Management in Trivandrum, Kollam &amp; Thrissur", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Trivandrum (Kowdiar)", "Our flagship clinic with the full weight management range, including body composition analysis and CM Slim. <a href=\"/weight-loss-treatment-in-trivandrum/\">Weight loss treatment in Trivandrum</a>"],
   ["Karunagappally, Kollam", "Doctor-led weight management, nutrition and coaching for Kollam."],
   ["Guruvayur, Thrissur", "Weight management and nutrition support for Thrissur."],
 ], false)}</div>
 </div>
 <div class="cp-split-sep">
 ${head("Why Facelit", "Why Choose Facelit for Weight Management?", "")}
 ${k.whyList([
   ["One team, one plan", "Doctors, nutrition specialists and coaches working together."],
   ["Causes, not just calories", "We test for and treat what's really driving your weight."],
   ["Measured progress", "Body composition tracking shows fat loss, not just weight."],
   ["Made for Kerala life", "Real food, real routines and no crash diets."],
 ])}
 </div>
 </div>`),

  shell("faq", `${head("Questions", "Weight Management FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Further reading", "Weight Loss Guides", "")}
 ${k.links([["/weight-loss-treatment-in-trivandrum/", "Location", "Weight loss treatment in Trivandrum"], ["/how-to-lose-weight-quickly-in-2-weeks/", "Guide", "Losing weight in 2 weeks: what's realistic"], ["/body-treatments/", "Category", "Body treatments"], ["/cm-slim/", "Treatment", "CM Slim"]])}`),

  k.cta("Ready to finally reach a healthy weight, and keep it?", "Book a consultation. We'll measure, find the cause and build a plan that fits your life."),
];

sections[2] = sections[2].replace("</section>", `${pageCss}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Obesity & Weight Management in Kerala | Doctor-Led Weight Loss | Facelit",
  desc: "Doctor-led obesity and weight management at Facelit, Trivandrum, Kollam & Thrissur: medical weight loss, weight-loss injections, nutrition, lifestyle coaching, body composition and contouring.",
  image: "https://facelit.in/wp-content/uploads/2026/08/obesity-weight-management-hero.webp",
  faqs,
  procedure: { name: "Obesity and Weight Management Programme", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Whole body",
    howPerformed: "A doctor-led programme combining body composition analysis, clinical assessment, nutrition counselling, lifestyle coaching, weight-loss medicines where appropriate and non-surgical body contouring.",
    preparation: "Consultation covering weight history, health and medicines, with body composition analysis and blood tests as needed.",
    followup: "Regular reviews, body composition retests every 4 to 8 weeks and a maintenance plan." },
  crumbs: [["Home", "https://facelit.in/"], ["Treatments", "https://facelit.in/treatments/"], ["Obesity and Weight Management", "https://facelit.in/obesity-and-weight-management/"]],
});
