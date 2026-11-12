// Builds the redesigned /body-composition-analysis/ page.
// Usage (from facelit-site/): node scripts/body-composition/build.mjs content/pages/body-composition-analysis.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";

const HERO = [A + "about-hero.webp", "Facelit doctor reviewing an InBody body composition report with a patient"];
const BEFORE = [A + "obesity-before-scaled-1.webp", "Indian woman at the start of her weight management programme", 1920, 2560];
const AFTER = [A + "obesity-after-scaled-1.webp", "The same Indian woman after losing fat and gaining muscle", 1920, 2560];
const FIT = [A + "obesity-weight-management-hero.webp", "Fit, smiling Indian woman tracking her health", 1769, 1180];

// Report explorer rows: [label, sample value, bar % (0-100), healthy guide, what it means, why it matters]
const metrics = [
  ["Body fat percentage", "34%", 78, "Men: about 10–20% · Women: about 18–28%", "The share of your weight that's fat. It tells you far more than weight or BMI alone.", "High body fat raises the risk of diabetes, heart disease, PCOS and joint pain, even at a \"normal\" weight."],
  ["Skeletal muscle mass", "21.4 kg", 42, "Compared with the healthy range for your height and sex", "The muscle you use to move. It burns calories even at rest and protects your joints and blood sugar.", "Low muscle slows your metabolism and makes weight harder to lose and keep off. Crash diets often lose muscle, not fat."],
  ["Visceral fat level", "12", 70, "Below 10 is healthy · 10 or above needs action", "The hidden fat wrapped around your organs inside the tummy, not the fat you can pinch.", "Visceral fat is strongly linked to diabetes, fatty liver, high blood pressure and heart disease. Many slim-looking people still have high levels."],
  ["Body water balance", "0.395", 60, "ECW/TBW ratio about 0.360–0.390", "How much water is in your body, and the balance between water inside and outside your cells.", "A high ratio can point to swelling, inflammation or water retention, and helps your doctor spot hidden problems."],
  ["Basal metabolic rate", "1,320 kcal", 50, "Depends on your muscle mass", "The calories your body burns at rest, just to keep you alive.", "Knowing your BMR helps us set a realistic calorie target, so you lose fat without starving."],
  ["Segmental analysis", "Arms · trunk · legs", 55, "Left and right should be balanced", "Muscle and fat measured separately in each arm, each leg and the trunk.", "Shows imbalances, weak areas and where fat is stored, so your exercise plan targets the right places."],
];

const benefits = [
  ["layers", "Beyond the Scale", "Separates fat, muscle and water instead of giving one number."],
  ["shield", "Finds Hidden Fat", "Measures visceral fat around your organs, the most harmful kind."],
  ["lift", "Protects Your Muscle", "Shows if you're losing fat or muscle, so your plan can be adjusted."],
  ["clock", "Takes About a Minute", "Stand on the machine, hold the handles, done. No needles."],
  ["spark", "A Plan Built on Data", "Your calorie target, diet and exercise plan are set from your own numbers."],
  ["drop", "Water Balance", "Checks for water retention and swelling that the scale can't explain."],
  ["heal", "Safe and Painless", "Uses a tiny, harmless electrical signal you can't feel."],
  ["wave", "Tracks Real Progress", "Repeat tests every 4 to 8 weeks show exactly what's changing."],
];

const finderResults = [
  { v: "fat", label: "Lose fat, not muscle", img: BEFORE, title: "Fat Loss Plan",
    text: "Your report shows how much fat you really need to lose and sets a calorie target that protects your muscle.",
    first: "A baseline test, then a doctor-led plan with diet and exercise built on your numbers.", repeat: "Compare with your last report to check you're losing fat, not muscle, and adjust your plan.",
    sessions: "Retest every 4–8 weeks", combine: "Nutrition counselling, medical weight management" },
  { v: "muscle", label: "Build muscle and tone up", img: FIT, title: "Muscle &amp; Tone Plan",
    text: "Track skeletal muscle mass and segmental balance to see if your training and protein intake are working.",
    first: "A baseline test showing your muscle in each arm, leg and the trunk.", repeat: "Retest to see muscle gain and fix imbalances between sides.",
    sessions: "Retest every 6–8 weeks", combine: "Lifestyle coaching" },
  { v: "pcos", label: "PCOS or thyroid weight gain", img: [A + "anti-aging-hero.webp", "Indian woman", 1716, 1144], title: "Hormone-Aware Plan",
    text: "PCOS and thyroid problems change how your body stores fat and holds water. Your report helps our doctors plan around them.",
    first: "A baseline test alongside your hormone and thyroid results.", repeat: "Track fat, muscle and water changes as your treatment progresses.",
    sessions: "Retest every 4–8 weeks", combine: "Medical weight management" },
  { v: "metabolic", label: "Diabetes or heart risk", img: [A + "about-hero.webp", "Facelit doctor consulting a patient", 1151, 768], title: "Metabolic Health Plan",
    text: "Visceral fat is closely linked to diabetes, fatty liver and heart disease. Measuring it gives you a clear target to bring down.",
    first: "A baseline test focused on visceral fat and muscle, reviewed with your blood tests.", repeat: "Watch your visceral fat level come down as your health improves.",
    sessions: "Retest every 6–8 weeks", combine: "Medical weight management, nutrition" },
  { v: "track", label: "Track my weight-loss treatment", img: AFTER, title: "Progress Tracking Plan",
    text: "If you're on a weight-loss programme or injections, regular tests make sure the weight you lose is fat, not muscle.",
    first: "A baseline test before you start treatment.", repeat: "Regular retests to fine-tune protein, exercise and doses.",
    sessions: "Retest every 4 weeks", combine: "Weight-loss injections, coaching" },
  { v: "stuck", label: "Weight won't move", img: FIT, title: "Break the Plateau Plan",
    text: "The scale can stall while your body is changing. Your report shows what's really happening, so you don't give up too soon.",
    first: "A test to see your real fat, muscle and water picture.", repeat: "Compare reports to see hidden progress and adjust your plan.",
    sessions: "Retest every 4–6 weeks", combine: "Nutrition counselling" },
];

const shapes = [
  ["C-shape", 3, "Body fat is higher than muscle. Common in people who have dieted without exercise, even if their weight looks normal.", "fat loss and muscle building", "—", "focus: protein and strength work"],
  ["I-shape", 2, "Weight, muscle and fat are roughly balanced. A good base to improve from.", "steady fat loss or toning", "—", "focus: consistency"],
  ["D-shape", 1, "Muscle is higher than average compared with fat. Typical of active, athletic people.", "maintaining and fine-tuning", "—", "focus: performance"],
];

const faqs = [
  ["What is a body composition analysis?", "It's a quick, painless test that measures what your body is made of: fat, muscle, water and bone minerals. Unlike a normal scale, it shows how much of your weight is fat and how much is muscle, plus your hidden visceral fat."],
  ["What is an InBody test?", "InBody is a widely used body composition analyser. You stand barefoot on the machine and hold the handles while a tiny, harmless electrical signal measures your body. It takes about a minute and prints a detailed report."],
  ["How does it work?", "Fat, muscle and water conduct electricity differently. The machine sends a very small current through your body at several frequencies and measures the resistance to work out your fat, muscle and water, including separately for each arm, leg and the trunk."],
  ["Does the test hurt?", "No. You can't feel the signal at all. It's as simple as standing on a scale."],
  ["How long does it take?", "The measurement takes about a minute. With the doctor's explanation of your report, plan around 15 to 20 minutes."],
  ["How should I prepare?", "Don't eat for 2 to 3 hours before, skip exercise and caffeine beforehand, empty your bladder, and remove socks, jewellery and metal. Wear light clothing."],
  ["Is it better than BMI?", "Yes. BMI only uses height and weight, so it can call a muscular person overweight or miss a slim person with high body fat. Body composition analysis measures fat and muscle directly."],
  ["What is visceral fat and why does it matter?", "Visceral fat is stored deep inside the tummy around your organs. It's linked to diabetes, fatty liver, high blood pressure and heart disease. A level below 10 is generally considered healthy."],
  ["What is a healthy body fat percentage?", "As a general guide, about 10 to 20% for men and 18 to 28% for women. Your doctor will explain what's right for your age and goals."],
  ["How often should I get tested?", "Every 4 to 8 weeks is ideal while you're working on your weight or fitness. Testing more often won't show meaningful changes."],
  ["Who should not take the test?", "People with a pacemaker or other implanted electronic device shouldn't take it. It's also usually avoided during pregnancy."],
  ["Can it help with PCOS or thyroid problems?", "Yes. It shows how your fat, muscle and water are changing, which helps doctors plan and track treatment for hormone-related weight gain."],
  ["Will I get a copy of my report?", "Yes. You'll get your printed report, and our doctor will explain every number and what to do next."],
  ["Where can I get a body composition test in Kerala?", "Facelit offers InBody body composition analysis as part of our weight management services. Contact us to book at your nearest clinic."],
];

const reportExplorer = `
<div class="bc-report" aria-label="Sample body composition report">
 <div class="bc-head"><b>Sample report</b><span>For illustration only</span></div>
 ${metrics.map(([label, val, pct], i) => `<button type="button" class="bc-row" data-go="t-metrics-${i}"><span class="bc-l">${label}</span><span class="bc-bar"><i style="width:${pct}%"></i></span><b>${val}</b></button>`).join("")}
 <p class="cp-note" style="text-align:center;margin:.75rem 0 0">Tap a row to see what it means.</p>
</div>`;
const metricTabs = tabs("metrics", metrics.map(([label, , , guide, what, why]) => ({ tab: label, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${label}</h3>
 <p class="cp-p"><b>What it is:</b> ${what}</p>
 <p class="cp-p"><b>Why it matters:</b> ${why}</p>
 <div class="cp-rec"><div><small>Healthy guide</small><b>${guide}</b></div></div>` })));

const checker = `
<div class="bc-check" data-bccheck>
 <div class="bc-inputs">
 <fieldset><legend>I am</legend><label><input type="radio" name="bcsex" value="m" checked> Male</label><label><input type="radio" name="bcsex" value="f"> Female</label></fieldset>
 <label class="bc-num">Body fat %<input type="number" inputmode="decimal" min="3" max="70" step="0.1" placeholder="e.g. 28" data-bf></label>
 <label class="bc-num">Visceral fat level<input type="number" inputmode="numeric" min="1" max="30" step="1" placeholder="e.g. 9" data-vf></label>
 </div>
 <div class="bc-out" aria-live="polite">
 <small>What your numbers suggest</small>
 <b data-bfout>Enter your body fat %</b>
 <p data-vfout>Add your visceral fat level too, if your report shows it.</p>
 <p class="bc-fine">A general guide only, not a diagnosis. Our doctors look at your full report, age and health.</p>
 <a href="/appointment/" class="btn-3d-forest btn-press inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium">Get my report explained</a>
 </div>
</div>`;

const pageCss = `<style>
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.bc-report{background:#fff;border:1px solid rgba(58,77,57,.14);border-radius:1.25rem;padding:1rem;box-shadow:0 10px 30px -18px rgba(45,60,45,.35)}
.bc-head{display:flex;justify-content:space-between;align-items:baseline;padding:.25rem .4rem .75rem;border-bottom:1px solid rgba(58,77,57,.12);margin-bottom:.4rem}
.bc-head b{font:600 .8rem Onest,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#3a4d39}.bc-head span{font-size:.75rem;color:#5c574f}
.bc-row{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"l v" "b b";gap:.35rem .75rem;width:100%;padding:.75rem .5rem;border:0;border-radius:.75rem;background:transparent;text-align:left;cursor:pointer;color:#2d3c2d;font:500 .92rem Onest,sans-serif}
.bc-row+.bc-row{border-top:1px dashed rgba(58,77,57,.12)}
.bc-l{grid-area:l}.bc-row b{grid-area:v;font-weight:600}
.bc-bar{grid-area:b;height:8px;border-radius:99px;background:#efe7da;overflow:hidden}.bc-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#c4945f,#986a3e)}
.bc-row:hover,.bc-row[aria-current=true]{background:#f3efe4}.bc-row[aria-current=true] .bc-bar i{background:linear-gradient(90deg,#3a4d39,#2d3c2d)}
.bc-row:focus-visible{outline:2px solid #3a4d39;outline-offset:2px}
.bc-check{display:grid;gap:1.25rem}.bc-check>*{min-width:0}@media(min-width:900px){.bc-check{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.bc-inputs{display:grid;gap:.9rem}
.bc-inputs fieldset{display:flex;gap:.6rem;flex-wrap:wrap;border:0;padding:0;margin:0}
.bc-inputs legend{font:500 .9rem Onest,sans-serif;color:#2d3c2d;margin-bottom:.5rem;width:100%}
.bc-inputs fieldset label{display:flex;align-items:center;gap:.45rem;padding:.6rem 1rem;border:1px solid rgba(58,77,57,.18);border-radius:999px;background:#fff;cursor:pointer;font-size:.92rem}
.bc-inputs fieldset label:has(input:checked){border-color:#3a4d39;background:#f3efe4}
.bc-inputs input[type=radio]{accent-color:#3a4d39}
.bc-num{display:grid;gap:.4rem;font:500 .9rem Onest,sans-serif;color:#2d3c2d}
.bc-num input{width:100%;padding:.8rem 1rem;border:1px solid rgba(58,77,57,.2);border-radius:.9rem;background:#fff;font-size:1rem;color:#2d3c2d}
.bc-num input:focus{outline:2px solid #3a4d39;outline-offset:1px}
.bc-out{background:linear-gradient(160deg,#3a4d39,#2d3c2d);color:#fdf7ef;border-radius:1.25rem;padding:1.4rem}
.bc-out small{display:block;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.bc-out b{display:block;font-size:1.5rem;margin:.4rem 0 .5rem;font-weight:500;line-height:1.25}
.bc-out p{font-size:.9rem;opacity:.9;margin:0 0 .75rem;line-height:1.5}.bc-out .bc-fine{font-size:.78rem;opacity:.7}
.bc-out .btn-3d-forest{background:#fdf7ef;color:#2d3c2d}
</style>`;

const pageJs = `<script>(function(){
var rows=[].slice.call(document.querySelectorAll('.bc-row'));
function mark(id){rows.forEach(function(r){r.setAttribute('aria-current',r.dataset.go===id)})}
rows.forEach(function(r){r.addEventListener('click',function(){var t=document.getElementById(r.dataset.go);if(t){t.click();mark(r.dataset.go);if(window.innerWidth<900)t.closest('[data-tabs]').scrollIntoView({behavior:'smooth',block:'start'})}})});
document.querySelectorAll('[id^=t-metrics-]').forEach(function(t){t.addEventListener('click',function(){mark(t.id)})});mark('t-metrics-0');
var c=document.querySelector('[data-bccheck]');if(!c)return;var bo=c.querySelector('[data-bfout]'),vo=c.querySelector('[data-vfout]');
function upd(){var sex=(c.querySelector('input[name=bcsex]:checked')||{}).value,bf=parseFloat(c.querySelector('[data-bf]').value),vf=parseFloat(c.querySelector('[data-vf]').value);
if(isNaN(bf)){bo.textContent='Enter your body fat %'}else{var r=sex==='f'?[18,28,33]:[10,20,25];
bo.textContent=bf<r[0]?'Body fat is on the low side':bf<=r[1]?'Body fat is in a healthy range':bf<=r[2]?'Body fat is a little high':'Body fat is high, worth acting on';}
if(isNaN(vf)){vo.textContent='Add your visceral fat level too, if your report shows it.'}else{vo.textContent=vf<10?'Visceral fat level is in the healthy range (below 10).':'Visceral fat level is 10 or above. This hidden fat is linked to diabetes and heart risk, so it\\'s worth bringing down.'}}
c.addEventListener('input',upd);c.addEventListener('change',upd);
})();</script>`;

const sections = [
  k.hero({
    tags: ["Weight management", "InBody test", "Doctor-reviewed"], h1: "Body Composition Analysis",
    img: HERO, pos: "60% center",
    intro: "Dieting hard but the scale won't move? Or a \"normal\" weight but still unhappy with your shape? A body composition analysis goes beyond the scale. In about a minute, the InBody test measures your body fat, muscle, hidden visceral fat and water balance. Our doctors then turn those numbers into a plan that targets fat, protects muscle and shows real progress.",
    facts: [["~1 min", "Test time"], ["No needles", "Painless"], ["15+", "Measurements"], ["4–8 weeks", "Retest"]],
    cta2: ["#report", "See what it measures"],
  }),
  k.jump([["overview", "Overview"], ["report", "Your report"], ["check", "Check your numbers"], ["finder", "Find your plan"], ["shapes", "Body types"], ["prepare", "How to prepare"], ["process", "Process"], ["compare", "Scale vs BMI"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Overview</p>
 <h2 class="cp-h2 font-serif">What is Body Composition Analysis?</h2>
 <div class="cp-prose">
 <p>Your weight is made up of fat, muscle, water and bone. A normal scale lumps them all into one number, so it can't tell you whether you've lost fat or muscle, or whether that extra kilo is water.</p>
 <p>A body composition analysis, often called an <b>InBody test</b>, measures each part separately. You stand barefoot on the machine and hold its handles for about a minute while a tiny, painless signal passes through your body. You get a detailed report showing your body fat percentage, skeletal muscle, visceral fat, body water, metabolic rate and a breakdown for each arm, leg and the trunk.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: how the test works ${k.plus}</summary>
 <div class="cp-prose">
 <p>Muscle holds a lot of water, so electricity flows through it easily. Fat holds very little water, so it resists the signal. By sending a very small current at several frequencies and measuring the resistance, the analyser works out how much fat, muscle and water you have, and where it is.</p>
 <p>Because the test is quick, painless and repeatable, it's ideal for tracking your progress every few weeks.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How body composition analysis works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Measure</b><span>Stand on the analyser for about a minute.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Understand</b><span>Our doctor explains your fat, muscle and visceral fat.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Act</b><span>Get a plan built on your numbers, and retest to track progress.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...BEFORE)}
 ${img(...AFTER)}
 </div>
 </div>`),

  shell("report", `${head("Your report", "What Your Body Composition Report Shows", "Tap each row of this sample report to see what it means, the healthy range and why it matters.")}
 <div class="bx-wrap">${reportExplorer}<div>${metricTabs}</div></div>`),

  shell("check", `${head("Already have a report?", "Check Your Numbers", "Enter your body fat percentage and visceral fat level from any body composition report to see a quick guide.")}${checker}`),

  shell("finder", `${head("Find your plan", "What Do You Want Your Report to Help With?", "Answer two quick questions to see how we'd use your body composition analysis.")}
 ${k.finder({ q1: "What's your main goal?", q2: { label: "Have you had a body composition test before?", dt: "How we'd use it", options: [["first", "No, this is my first"], ["repeat", "Yes, I want to track progress"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of Body Composition Analysis", "Clear numbers that turn guesswork into a plan.")}${k.benefitsGrid(benefits)}`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Problems it solves", "Why the Scale Doesn't Tell the Whole Story", "Tap a situation that sounds like you.")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["\"I'm dieting but the scale won't move.\"", "You may be losing fat and gaining muscle or water at the same time. Your report shows the real change, so you don't give up on a plan that's working."],
   ["\"My weight is normal but I still have a tummy.\"", "This is often called \"skinny fat\": normal weight with high body fat and low muscle. Only body composition analysis can spot it."],
   ["\"I lost weight fast, then put it all back on.\"", "Crash diets often burn muscle, which slows your metabolism. Tracking muscle helps you lose fat while keeping your metabolism strong."],
   ["\"I have PCOS or thyroid problems.\"", "Hormones change where you store fat and how much water you hold. Your report helps your doctor plan treatment around them."],
   ["\"My blood sugar or cholesterol is high.\"", "High visceral fat is a key driver. Measuring it gives you and your doctor a clear target to bring down."],
   ["\"I train hard but don't see results.\"", "Segmental analysis shows muscle in each limb, so you can fix weak spots and imbalances."],
 ])}</div>
 </div>
 <div class="cp-split-sep">
 ${head("Who it's for", "Who Should Get Tested?", "")}
 ${list(["Anyone starting a weight-loss or fitness plan", "People with PCOS, thyroid problems or diabetes", "Anyone on weight-loss injections or a medical weight plan", "People with a normal weight but a big tummy", "Athletes and gym-goers tracking muscle", "Anyone who wants a health check beyond the scale"])}
 <div class="cp-card" style="margin-top:1.25rem"><h3 class="font-serif">Not suitable if you</h3>${list(["Have a pacemaker or implanted electronic device", "Are pregnant"], warn)}</div>
 </div>
 </div>`),

  shell("shapes", `${head("Body types", "C-, I- or D-Shape: What's Your Body Type?", "Your report compares your weight, muscle and fat. The pattern they make shows your body type and what to focus on.")}${k.depthCards(shapes)}`),

  shell("prepare", `${head("How to prepare", "Get the Most Accurate Results", "Small things like food, water and exercise can change your numbers, so follow these simple steps.")}
 ${tabs("prep", [
   { tab: "Before the test", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Come 2 to 3 hours after your last meal", "Use the toilet just before", "Wear light clothes", "Test at the same time of day each time"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Exercise or a sauna before the test", "Coffee, tea and alcohol", "A shower just before", "Testing during your period, if you can"], warn)}</div></div>` },
   { tab: "On the day", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Bring</h3>${list(["Your previous reports, if any", "Recent blood test results", "A list of your medicines"])}</div><div class="cp-card"><h3 class="font-serif">Remove</h3>${list(["Socks and shoes", "Watches, rings and jewellery", "Phones and metal items from pockets"])}</div></div>` },
   { tab: "Retesting", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">How often</h3>${list(["Every 4 to 8 weeks while working on your goals", "Same time of day and same preparation", "Compare trends, not single numbers"])}</div><div class="cp-card"><h3 class="font-serif">What to look for</h3>${list(["Body fat going down", "Muscle staying the same or going up", "Visceral fat dropping below 10"])}</div></div>` },
 ])}`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">How the Body Composition Test Works</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor discussing health goals with a patient", 1151, 768], lead: "A short chat about your goals and health.",
     items: ["We note your age, height, health conditions and medicines.", "We check that you don't have a pacemaker or implanted device.", "You remove socks, shoes and metal items."] },
   { tab: "02 · During", img: FIT, lead: "The test itself takes about a minute.",
     items: ["Stand barefoot on the analyser's footplates.", "Hold the hand electrodes with your arms slightly away from your body.", "Stay still while the machine measures.", "You won't feel anything."] },
   { tab: "03 · After", img: AFTER, lead: "Your doctor explains your report.",
     items: ["We go through your fat, muscle, visceral fat and water balance.", "You get your printed report to keep.", "We set clear targets and next steps.", "We plan your next test in 4 to 8 weeks."] },
 ])}
 </div>`, "p-0"),

  shell("compare", `${head("Compare", "Weighing Scale vs BMI vs Body Composition Analysis", "Why a body composition test gives you the full picture.")}
 ${k.compareTable(["Body composition analysis", "BMI", "Weighing scale"], [
   ["Measures", "Fat, muscle, water, visceral fat", "Height and weight only", "Total weight only"],
   ["Shows fat vs muscle", "Yes", "No", "No"],
   ["Finds hidden visceral fat", "Yes", "No", "No"],
   ["Spots \"skinny fat\"", "Yes", "No", "No"],
   ["Body part breakdown", "Arms, legs and trunk", "No", "No"],
   ["Useful for tracking progress", "Very", "Limited", "Limited"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Body Composition Analysis?</h2>
 ${img(A + "eco-doctor-devi.webp", "Facelit doctor", 672, 891, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["InBody analysis", "Detailed, repeatable measurements of fat, muscle, visceral fat and water."],
   ["Doctor-reviewed reports", "A doctor explains every number in plain language, not just a printout."],
   ["A plan, not just a number", "Your results feed into nutrition, exercise and medical weight management."],
   ["Progress you can see", "Regular retests show exactly what's changing, so you stay motivated."],
   ["All under one roof", "Nutrition counselling, lifestyle coaching and medical weight management, if you need them."],
 ])}
 </div>`),

  shell("faq", `${head("Questions", "Body Composition Analysis FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Next steps", "Use Your Results with Our Weight Management Services", "")}
 ${k.links([["/medical-weight-management/", "Programme", "Medical weight management"], ["/nutrition-counselling/", "Programme", "Nutrition counselling"], ["/lifestyle-coaching/", "Programme", "Lifestyle coaching"], ["/obesity-and-weight-management/", "Overview", "Obesity and weight management"]])}`),

  k.cta("Ready to see what your body is really made of?", "Book a body composition analysis. It takes a minute, and our doctor will turn your numbers into a clear plan."),
];

sections[3] = sections[3].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Body Composition Analysis in Kerala | InBody Test for Fat & Muscle | Facelit",
  desc: "InBody body composition analysis at Facelit, Kerala. Measure body fat %, muscle, visceral fat and water in about a minute, with a doctor-reviewed plan for weight loss and health.",
  image: "https://facelit.in/wp-content/uploads/2026/08/about-hero.webp",
  faqs,
  procedure: { name: "Body Composition Analysis (InBody)", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Whole body",
    howPerformed: "Multi-frequency bioelectrical impedance analysis: the person stands barefoot on the analyser and holds hand electrodes while a very small current measures fat, muscle and water, including segmental analysis of arms, legs and trunk.",
    preparation: "No food for 2 to 3 hours, no exercise, caffeine or alcohol beforehand, empty bladder, and removal of socks, jewellery and metal items.",
    followup: "Doctor review of the report and a personalised plan, with retesting every 4 to 8 weeks under the same conditions." },
  crumbs: [["Home", "https://facelit.in/"], ["Weight management", "https://facelit.in/obesity-and-weight-management/"], ["Body Composition Analysis", "https://facelit.in/body-composition-analysis/"]],
});
