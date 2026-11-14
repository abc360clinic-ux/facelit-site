// Builds the redesigned /weight-loss-injections/ page.
// Usage (from facelit-site/): node scripts/weight-injections/build.mjs content/pages/weight-loss-injections.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";

const HERO = [A + "obesity-after-scaled-1.webp", "Confident Indian woman after doctor-supervised weight loss injections at Facelit"];
const CONSULT = [A + "about-hero.webp", "Facelit doctor explaining weight loss injection options to a patient", 1151, 768];
const DESK = [A + "contact-hero.webp", "Patient at the Facelit clinic", 1746, 1164];
const FIT = [A + "obesity-weight-management-hero.webp", "Healthy, active Indian woman", 1769, 1180];
const BEFORE = [A + "obesity-before-scaled-1.webp", "Indian woman before starting weight loss injections", 1920, 2560];
const AFTER = [A + "obesity-after-scaled-1.webp", "The same Indian woman after a doctor-led injection programme", 1920, 2560];

// Medicines: [name, brands, type, how often, avg loss %, trial note, details]
const meds = [
  ["Tirzepatide", "Mounjaro", "GLP-1 + GIP (dual action)", "Once a week", 21, "about 21% on the highest dose over 72 weeks (SURMOUNT-1 trial)",
    "Tirzepatide works on two gut hormones, GLP-1 and GIP, so it has a strong effect on appetite and blood sugar. It has given the largest average weight loss of the three in trials. The dose is built up slowly every 4 weeks."],
  ["Semaglutide", "Wegovy, Ozempic*", "GLP-1", "Once a week", 15, "about 15% over 68 weeks (STEP-1 trial)",
    "Semaglutide copies the GLP-1 hormone that tells your brain you're full. Wegovy is the higher-dose version made for weight loss. Ozempic is the same medicine at diabetes doses. Several brands and generic versions are now available in India."],
  ["Liraglutide", "Saxenda and others", "GLP-1", "Once a day", 8, "about 8% over 56 weeks (SCALE trial)",
    "The older daily GLP-1 medicine. It's useful when weekly options aren't suitable, but needs a daily injection and gives less weight loss on average."],
];

const finderResults = [
  { v: "obese", label: "Obesity, struggling to lose weight", img: BEFORE, title: "Medically Supported Plan",
    text: "If diet and activity haven't been enough, a weekly injection alongside a structured plan can make a big difference.",
    yes: "Full assessment and tests, then a weekly injection started at a low dose, with nutrition and coaching support.", no: "Full assessment and tests first. Injections may be an option once other causes are ruled out.",
    sessions: "Reviews every 4 weeks", combine: "Nutrition counselling, body composition tracking" },
  { v: "diabetes", label: "Type 2 diabetes or prediabetes", img: CONSULT, title: "Sugar &amp; Weight Plan",
    text: "These medicines lower blood sugar as well as weight, so they can be especially useful with diabetes.",
    yes: "Your doctor plans the right medicine with your current diabetes treatment and checks your sugar closely.", no: "We review your HbA1c and current treatment before deciding on injections.",
    sessions: "Reviews every 2–4 weeks", combine: "Medical weight management" },
  { v: "pcos", label: "PCOS and weight gain", img: [A + "anti-aging-hero.webp", "Indian woman", 1716, 1144], title: "PCOS Plan",
    text: "Insulin resistance in PCOS makes weight hard to shift. Injections can help where lifestyle alone hasn't, but they're not for pregnancy.",
    yes: "Hormone and insulin tests, reliable contraception, then a weekly injection with diet support.", no: "PCOS-focused tests and plan first, with injections considered later if needed.",
    sessions: "Reviews every 4 weeks", combine: "Nutrition, lifestyle coaching" },
  { v: "liver", label: "Fatty liver, BP or cholesterol", img: DESK, title: "Metabolic Health Plan",
    text: "Losing weight improves fatty liver, blood pressure and cholesterol. Injections can help you get there.",
    yes: "Baseline liver and lipid tests, a weekly injection and repeat tests at 3 to 6 months.", no: "Baseline tests and a lifestyle plan, with injections considered if progress stalls.",
    sessions: "Reviews every 4 weeks", combine: "Medical weight management" },
  { v: "few", label: "Only a few kilos to lose", img: FIT, title: "Lifestyle First Plan",
    text: "For a few kilos, injections usually aren't needed. Nutrition, activity and body contouring work well.",
    yes: "We'll check if you meet the medical criteria. Most people with a few kilos to lose do better without injections.", no: "Nutrition counselling and lifestyle coaching, with body contouring for stubborn areas.",
    sessions: "Regular follow-ups", combine: "Body contouring" },
  { v: "regain", label: "Lost weight before, then regained it", img: AFTER, title: "Lasting Results Plan",
    text: "Injections can help, but lasting results depend on habits and a careful plan for coming off them.",
    yes: "Injection plus strong habit support, with a planned, gradual taper.", no: "Lifestyle coaching and nutrition to fix the habits behind the regain.",
    sessions: "Reviews every 4 weeks", combine: "Lifestyle coaching" },
];

const faqs = [
  ["What are weight loss injections?", "Weight loss injections are prescription medicines, such as tirzepatide (Mounjaro) and semaglutide (Wegovy), that copy natural gut hormones. They reduce appetite, help you feel full sooner and improve blood sugar, so you eat less without constant hunger. They're used alongside a healthy diet and activity."],
  ["How do they work?", "They act on the brain's appetite centre to reduce hunger and cravings, slow down how quickly your stomach empties so you stay full longer, and help your body release insulin when blood sugar rises."],
  ["How much weight can I lose?", "In large trials, people lost on average about 15% of their body weight with semaglutide and about 21% with the highest dose of tirzepatide over roughly 16 to 18 months, alongside diet and activity. Results vary from person to person."],
  ["Mounjaro vs Wegovy: which is better?", "Tirzepatide (Mounjaro) acts on two hormones and gave more weight loss on average in trials. Semaglutide (Wegovy) is very effective too and has a longer track record. Your doctor will recommend one based on your health, goals, side effects and cost."],
  ["Is Ozempic the same as Wegovy?", "Both contain semaglutide. Ozempic is approved for type 2 diabetes at lower doses, and Wegovy is the higher-dose version approved for weight management."],
  ["Who can take weight loss injections?", "They're generally for adults with obesity, or adults who are overweight with weight-related health problems like diabetes, high blood pressure or fatty liver. Because Indians develop these problems at lower weights, your doctor may consider them at a lower BMI than Western guidelines. A full medical assessment is essential."],
  ["Who should not take them?", "They're not suitable during pregnancy or breastfeeding, or for people with a personal or family history of medullary thyroid cancer or MEN2, or a history of pancreatitis. People with certain gut, kidney or eye problems need careful assessment."],
  ["What are the side effects?", "Nausea is the most common, especially when the dose goes up. Others include vomiting, diarrhoea, constipation, reflux and tiredness. Most ease within a few weeks. Rare but serious effects include pancreatitis and gallbladder problems, which is why medical supervision matters."],
  ["Is the injection painful?", "No. It's a tiny needle in a pre-filled pen, injected under the skin of the tummy, thigh or upper arm. Most people barely feel it. We'll teach you how to do it."],
  ["How long do I need to take them?", "Usually at least several months, and often a year or more, depending on your progress and health. Your doctor will plan how long and how to come off them safely."],
  ["Will I regain weight when I stop?", "Many people regain some weight if they stop suddenly without changing their habits. That's why we combine injections with nutrition and lifestyle coaching, and plan a gradual, supported taper."],
  ["Will I lose muscle?", "Fast weight loss can include muscle. Eating enough protein, doing strength exercise and tracking body composition helps protect it, and all of these are part of our programme."],
  ["Can I buy weight loss injections online?", "Please don't. These are prescription medicines that need medical checks and monitoring. Fake and unregulated products are sold online and can be dangerous."],
  ["What if I'm planning a pregnancy?", "Tell your doctor. These medicines should be stopped well before trying to conceive (for semaglutide, at least 2 months). Tirzepatide can also make oral contraceptive pills less effective, so extra contraception may be needed."],
  ["Where can I get weight loss injections in Kerala?", "Facelit offers doctor-supervised weight loss injections as part of our medical weight management programme at our clinics in Trivandrum, Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much do weight loss injections cost?", "It depends on the medicine, the dose and how long you need it. Book a consultation and your doctor will explain the options and costs clearly."],
];

const compareChart = `
<div class="wi-chart" aria-label="Average weight loss in major trials">
 <div class="wi-head"><b>Average weight loss in major trials</b><span>Tap a medicine</span></div>
 ${meds.map(([n, b, , , pct], i) => `<button type="button" class="wi-row" data-go="t-meds-${i}"><span class="wi-n"><b>${n}</b><small>${b}</small></span><span class="wi-bar"><i style="width:${(pct / 22) * 100}%"></i></span><strong>~${pct}%</strong></button>`).join("")}
 <p class="cp-note">Averages from large clinical trials over 56 to 72 weeks, alongside diet and activity. Your results may differ.</p>
</div>`;
const medTabs = tabs("meds", meds.map(([n, b, type, freq, , trial, details]) => ({ tab: n, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${n} <span style="font-size:.6em;color:#986a3e">(${b})</span></h3>
 <p class="cp-p">${details}</p>
 <div class="cp-rec"><div><small>Type</small><b>${type}</b></div><div><small>Injection</small><b>${freq}</b></div></div>
 <p class="cp-note" style="margin-top:.75rem">Average weight loss: ${trial}.</p>` })));

const elig = `
<div class="wi-el" data-wiel>
 <div class="wi-in">
 <div class="wi-row2">
 <label>Height (cm)<input type="number" inputmode="numeric" min="120" max="220" placeholder="e.g. 160" data-h></label>
 <label>Weight (kg)<input type="number" inputmode="decimal" min="30" max="250" placeholder="e.g. 82" data-w></label>
 </div>
 <fieldset><legend>Do you have any of these?</legend>
 ${["Type 2 diabetes or prediabetes", "High blood pressure", "Fatty liver", "High cholesterol", "PCOS", "Sleep apnoea or joint pain"].map((c) => `<label><input type="checkbox" data-cond><span>${c}</span></label>`).join("")}
 </fieldset>
 <fieldset><legend>Do any of these apply?</legend>
 ${["Pregnant, breastfeeding or planning pregnancy", "Personal or family history of thyroid cancer (MTC/MEN2)", "Past pancreatitis"].map((c) => `<label><input type="checkbox" data-stop><span>${c}</span></label>`).join("")}
 </fieldset>
 </div>
 <div class="wi-out" aria-live="polite">
 <small>Could injections be an option?</small>
 <b data-res>Enter your details</b>
 <div class="wi-bmi"><span>BMI</span><strong data-bmi>—</strong></div>
 <p data-msg>Fill in your height and weight, and tick anything that applies.</p>
 <p class="wi-fine">This is a general guide, not a prescription. Only a doctor can decide if these medicines are right and safe for you.</p>
 <a href="/appointment/" class="btn-3d-forest btn-press inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium">Book a doctor consultation</a>
 </div>
</div>`;

const pageCss = `<style>
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.wi-chart{background:#fff;border:1px solid rgba(58,77,57,.14);border-radius:1.25rem;padding:1rem;box-shadow:0 10px 30px -18px rgba(45,60,45,.35)}
.wi-head{display:flex;justify-content:space-between;gap:.5rem;align-items:baseline;padding:.25rem .4rem .75rem;border-bottom:1px solid rgba(58,77,57,.12);margin-bottom:.4rem}
.wi-head b{font:600 .78rem Onest,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#3a4d39}.wi-head span{font-size:.75rem;color:#5c574f;white-space:nowrap}
.wi-row{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"n v" "b b";gap:.4rem .75rem;width:100%;padding:.85rem .5rem;border:0;border-radius:.8rem;background:transparent;text-align:left;cursor:pointer;color:#2d3c2d}
.wi-row+.wi-row{border-top:1px dashed rgba(58,77,57,.12)}
.wi-n{grid-area:n}.wi-n b{display:block;font:600 1rem Onest,sans-serif}.wi-n small{font-size:.78rem;color:#5c574f}
.wi-row strong{grid-area:v;font:600 1.2rem Onest,sans-serif;color:#3a4d39;align-self:center}
.wi-bar{grid-area:b;height:12px;border-radius:99px;background:#efe7da;overflow:hidden}.wi-bar i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,#c4945f,#986a3e)}
.wi-row:hover,.wi-row[aria-current=true]{background:#f3efe4}.wi-row[aria-current=true] .wi-bar i{background:linear-gradient(90deg,#3a4d39,#2d3c2d)}
.wi-row:focus-visible{outline:2px solid #3a4d39;outline-offset:2px}
.wi-how{display:grid;gap:.75rem;margin-top:1.25rem}@media(min-width:760px){.wi-how{grid-template-columns:repeat(3,minmax(0,1fr))}}
.wi-how div{background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.1rem;padding:1.1rem}
.wi-how b{display:inline-grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#3a4d39;color:#fdf7ef;font:600 .95rem Onest,sans-serif;margin-bottom:.6rem}
.wi-how h3{margin:0 0 .3rem;font-size:1.2rem;color:#2d3c2d}.wi-how p{margin:0;font-size:.92rem;line-height:1.5;color:#5c574f}
.wi-el{display:grid;gap:1.25rem;margin-top:1.25rem}.wi-el>*{min-width:0}@media(min-width:900px){.wi-el{grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);align-items:start}}
.wi-in{display:grid;gap:1rem}
.wi-row2{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
.wi-row2 label{display:grid;gap:.4rem;font:500 .9rem Onest,sans-serif;color:#2d3c2d}
.wi-row2 input{width:100%;padding:.8rem 1rem;border:1px solid rgba(58,77,57,.2);border-radius:.9rem;background:#fff;font-size:1rem;color:#2d3c2d}
.wi-in fieldset{border:0;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:.45rem}
.wi-in legend{font:500 .9rem Onest,sans-serif;color:#2d3c2d;margin-bottom:.5rem;width:100%}
.wi-in fieldset label{cursor:pointer}.wi-in fieldset input{position:absolute;opacity:0;pointer-events:none}
.wi-in fieldset span{display:inline-block;padding:.5rem .9rem;border-radius:999px;border:1px solid rgba(58,77,57,.18);font-size:.86rem;background:#fff;color:#2d3c2d}
.wi-in fieldset input:checked+span{background:#3a4d39;color:#fdf7ef;border-color:#3a4d39}
.wi-in fieldset input[data-stop]:checked+span{background:#986a3e;border-color:#986a3e}
.wi-in fieldset input:focus-visible+span{outline:2px solid #3a4d39;outline-offset:2px}
.wi-out{background:linear-gradient(160deg,#3a4d39,#2d3c2d);color:#fdf7ef;border-radius:1.25rem;padding:1.4rem}
@media(min-width:900px){.wi-out{position:sticky;top:7rem}}
.wi-out small{display:block;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.wi-out b{display:block;font-size:1.5rem;margin:.35rem 0 .75rem;font-weight:500;line-height:1.25}
.wi-bmi{background:rgba(253,247,239,.1);border-radius:.8rem;padding:.6rem .8rem;margin-bottom:.9rem;display:flex;justify-content:space-between;align-items:center}
.wi-bmi span{font-size:.72rem;opacity:.7;letter-spacing:.08em;text-transform:uppercase}.wi-bmi strong{font-size:1.3rem;font-weight:500}
.wi-out p{font-size:.92rem;opacity:.92;margin:0 0 .75rem;line-height:1.5}.wi-out .wi-fine{font-size:.78rem;opacity:.7}
.wi-out .btn-3d-forest{background:#fdf7ef;color:#2d3c2d}
</style>`;

const pageJs = `<script>(function(){
var rows=[].slice.call(document.querySelectorAll('.wi-row'));
function mark(id){rows.forEach(function(r){r.setAttribute('aria-current',r.dataset.go===id)})}
rows.forEach(function(r){r.addEventListener('click',function(){var t=document.getElementById(r.dataset.go);if(t){t.click();mark(r.dataset.go);if(window.innerWidth<900)t.closest('[data-tabs]').scrollIntoView({behavior:'smooth',block:'start'})}})});
document.querySelectorAll('[id^=t-meds-]').forEach(function(t){t.addEventListener('click',function(){mark(t.id)})});mark('t-meds-0');
var e=document.querySelector('[data-wiel]');if(!e)return;var R=e.querySelector('[data-res]'),B=e.querySelector('[data-bmi]'),M=e.querySelector('[data-msg]');
function upd(){var h=parseFloat(e.querySelector('[data-h]').value)/100,w=parseFloat(e.querySelector('[data-w]').value),c=e.querySelectorAll('[data-cond]:checked').length,s=e.querySelectorAll('[data-stop]:checked').length;
var bmi=(h>1&&w>20)?w/(h*h):NaN;B.textContent=isNaN(bmi)?'\\u2014':bmi.toFixed(1);
if(s){R.textContent='Not suitable right now';M.textContent='Something you ticked means these medicines are usually not safe for you. Our doctors can suggest other ways to manage your weight.';return}
if(isNaN(bmi)){R.textContent='Enter your details';M.textContent='Fill in your height and weight, and tick anything that applies.';return}
if(bmi>=27.5||(bmi>=25&&c)){R.textContent='Possibly suitable';M.textContent='Your numbers suggest injections could be worth discussing as part of a medical weight plan. A doctor will check your health and tests first.'}
else if(bmi>=23&&c){R.textContent='Worth a doctor\\'s opinion';M.textContent='You\\'re in the overweight range with a weight-related condition. A doctor can tell you if medicine is right, or if lifestyle changes are the better first step.'}
else if(bmi>=23){R.textContent='Lifestyle first';M.textContent='Injections usually aren\\'t the first step at your weight. Nutrition, activity and coaching often work well, and our doctors can guide you.'}
else{R.textContent='Not usually needed';M.textContent='Your BMI is in the healthy range for Indian adults, so weight loss injections usually aren\\'t recommended. Body contouring may help with stubborn areas.'}}
e.addEventListener('input',upd);e.addEventListener('change',upd);
})();</script>`;

const sections = [
  k.hero({
    tags: ["Weight management", "Doctor-prescribed", "GLP-1 medicines"], h1: "Weight Loss Injections",
    img: HERO, pos: "50% 25%",
    intro: "Mounjaro, Wegovy, Ozempic, semaglutide, tirzepatide: there's a lot of buzz, and a lot of confusion. At Facelit, our doctors explain your options in plain language, check whether they're safe for you, and prescribe and monitor the right weekly injection as part of a full weight plan. Less hunger, steady weight loss and real medical care, with no shortcuts.",
    facts: [["Weekly", "Injection"], ["15–21%", "Average loss in trials"], ["Doctor", "Prescribed &amp; monitored"], ["Full plan", "Diet + coaching"]],
    cta2: ["#eligible", "Am I eligible?"],
  }),
  k.jump([["overview", "Overview"], ["how", "How they work"], ["medicines", "Compare medicines"], ["eligible", "Eligibility"], ["finder", "Find your plan"], ["journey", "Your journey"], ["side-effects", "Side effects"], ["safety", "Safety"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Overview</p>
 <h2 class="cp-h2 font-serif">What Are Weight Loss Injections?</h2>
 <div class="cp-prose">
 <p>Weight loss injections are prescription medicines that copy hormones your gut naturally releases after eating, mainly <b>GLP-1</b> and, with tirzepatide, <b>GIP</b>. These hormones tell your brain you're full, slow down digestion and help control blood sugar. The result: smaller portions feel satisfying, cravings quieten and weight comes off steadily.</p>
 <p>The best-known medicines are <b>tirzepatide</b> (Mounjaro) and <b>semaglutide</b> (Wegovy, and Ozempic for diabetes), both injected once a week with a small pen. They're not a magic shot. They work best, and most safely, as part of a doctor-led plan with the right food, activity and support, which is exactly how we use them at Facelit.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why everyone's talking about them ${k.plus}</summary>
 <div class="cp-prose">
 <p>Before these medicines, prescription weight loss drugs usually gave modest results. In large trials, semaglutide and tirzepatide helped people lose around 15 to 21% of their body weight on average, close to what was once only possible with surgery. They also improve blood sugar, blood pressure and other health markers.</p>
 <p>That success has also brought fake pens, online sellers and unsupervised use. Getting them from a doctor who checks your health and monitors you is essential.</p>
 </div>
 </details>
 </div>
 <div class="cp-stack">
 ${img(...BEFORE)}
 ${img(...AFTER)}
 </div>
 </div>`),

  shell("how", `${head("How they work", "What Happens in Your Body", "Three effects working together, so you naturally eat less without fighting hunger all day.")}
 <div class="wi-how">
 <div><b>1</b><h3 class="font-serif">Brain: less hunger</h3><p>Acts on the appetite centre, so you feel satisfied sooner and food \"noise\" and cravings get quieter.</p></div>
 <div><b>2</b><h3 class="font-serif">Stomach: fuller for longer</h3><p>Slows how quickly your stomach empties, so a normal meal keeps you full for hours.</p></div>
 <div><b>3</b><h3 class="font-serif">Blood sugar: steadier</h3><p>Helps your body release insulin when sugar rises, reducing spikes, crashes and fat storage.</p></div>
 </div>`),

  shell("medicines", `${head("Compare medicines", "Tirzepatide vs Semaglutide vs Liraglutide", "The three main weight loss injections, side by side. Tap a medicine to learn more.")}
 <div class="bx-wrap">${compareChart}<div>${medTabs}</div></div>
 <p class="cp-note" style="margin-top:1rem">*Ozempic is approved for type 2 diabetes. Brand availability in India changes, so your doctor will advise on the right, genuine product for you.</p>`),

  shell("eligible", `${head("Eligibility check", "Could Weight Loss Injections Be Right for You?", "Enter your details and tick anything that applies for a quick guide. Your doctor makes the final decision after a full assessment.")}${elig}`),

  shell("finder", `${head("Find your plan", "What's Your Situation?", "Answer two quick questions to see how our doctors would usually approach it.")}
 ${k.finder({ q1: "What best describes you?", q2: { label: "Are you open to weekly injections if your doctor recommends them?", dt: "Our approach", options: [["yes", "Yes"], ["no", "I'm not sure yet"]] }, results: finderResults })}`),

  shell("journey", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Your journey", "Starting Low, Going Slow", "Doses are increased step by step to keep side effects mild. Tap each stage.")}
 ${tabs("steps", [
   { tab: "Before you start", body: `<p class="cp-p" style="margin-top:0">A full medical assessment: history, medicines, blood tests (sugar, thyroid, liver, kidney, lipids) and a body composition analysis.</p>${list(["Check you're a safe candidate", "Set realistic targets", "Plan your food and activity"])}` },
   { tab: "Month 1", body: `<p class="cp-p" style="margin-top:0">You start on the lowest dose. This dose is mainly for your body to get used to the medicine, not for big weight loss.</p>${list(["We teach you how to inject", "Mild nausea is common and usually settles", "Focus on protein and smaller meals"])}` },
   { tab: "Months 2–5", body: `<p class="cp-p" style="margin-top:0">The dose is raised every 4 weeks, if you're coping well, until you reach the dose that works for you.</p>${list(["Appetite drops and weight loss picks up", "Reviews to check side effects and progress", "Body composition tracking to protect muscle"])}` },
   { tab: "Ongoing", body: `<p class="cp-p" style="margin-top:0">You stay on your best dose while weight comes down, with regular reviews and repeat blood tests.</p>${list(["Steady loss over months", "Health markers improve", "Habits built for life after the injections"])}` },
   { tab: "Coming off", body: `<p class="cp-p" style="margin-top:0">When you reach your goal, we plan carefully. Many people need to continue at some dose. Others taper slowly with strong lifestyle support.</p>${list(["No sudden stopping", "Nutrition and coaching to hold your results", "Regular check-ins after stopping"])}` },
 ])}
 </div>
 <div class="cp-split-sep">${head("What's included", "Our Injection Programme Covers", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Doctor assessment and prescription", "A full check of your health and medicines, and an honest talk about which option suits you, if any."],
   ["Blood tests and body composition", "Baseline and follow-up tests so we can track your health and protect your muscle."],
   ["Injection training", "We show you how to use the pen, where to inject and how to store it."],
   ["Regular reviews", "Dose changes, side effect support and progress checks at every step."],
   ["Nutrition and lifestyle support", "Protein-focused eating, activity and coaching, so results last after the injections."],
 ], false)}</div>
 </div>
 </div>`),

  shell("side-effects", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Side effects", "Common Side Effects, and How to Manage Them", "Most are mild and ease within a few weeks, especially with a slow dose increase. Tap for tips.")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Nausea", "Eat smaller meals, stop when you're just full, avoid greasy and spicy food, and sip water through the day. It usually improves after each dose increase settles."],
   ["Vomiting or diarrhoea", "Keep hydrated with water and ORS. Tell us if it lasts more than a day or two. We may slow your dose increase."],
   ["Constipation", "Drink more water, add fibre gradually, like vegetables, fruit and oats, and keep active."],
   ["Acidity and reflux", "Avoid large late meals, lying down after eating, and spicy or fried food."],
   ["Tiredness or dizziness", "Often from eating too little. Make sure you still eat enough protein and drink enough water."],
   ["Hair shedding", "Can happen with fast weight loss. Enough protein, iron and vitamins helps, and our hair team can support you."],
 ])}</div>
 </div>
 <div class="cp-split-sep">${head("Call us straight away if you have", "Warning Signs", "")}
 <div class="cp-card">${list(["Severe tummy pain that spreads to your back (possible pancreatitis)", "Pain in the upper right tummy, fever or yellow eyes (possible gallbladder problem)", "Vomiting that won't stop, or signs of dehydration", "A lump or swelling in the neck, or trouble swallowing", "Signs of an allergic reaction, like a rash, swelling or difficulty breathing"], warn)}</div>
 <p class="cp-note">These are rare, but they're why weight loss injections should always be medically supervised.</p>
 </div>
 </div>`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>${head("Myths vs facts", "Weight Loss Injection Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"It's a magic shot. I don't need to change anything.\"", "The medicine makes eating less easier, but food choices, protein and activity decide how much fat you lose and how much muscle you keep."],
   ["\"Once I stop, I'll stay at my new weight.\"", "Many people regain weight after stopping suddenly. A planned taper and lasting habits are key."],
   ["\"They're only for diabetics.\"", "Some versions are approved specifically for weight management in people without diabetes."],
   ["\"Buying online is the same.\"", "Fake and unregulated pens are common and can be dangerous. Always get them through a doctor."],
   ["\"More dose means faster results.\"", "Increasing too fast causes bad side effects. Slow and steady works best."],
 ], false)}</div></div>
 <div class="cp-split-sep">${head("Who it's for", "Who May Benefit", "")}
 ${list(["Adults with obesity who haven't succeeded with lifestyle changes alone", "Overweight adults with diabetes, high BP, fatty liver, PCOS or sleep apnoea", "People with high visceral (belly) fat", "Anyone ready to combine medicine with better eating and activity"])}
 <div class="cp-card" style="margin-top:1.25rem"><h3 class="font-serif">Not for</h3>${list(["Pregnancy, breastfeeding or planned pregnancy", "History of medullary thyroid cancer or MEN2", "Past pancreatitis", "People who only want to lose a few kilos for an event", "Under 18 (except under specialist care)"], warn)}</div>
 </div>
 </div>`),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "What Results Look Like Over Time", "Every body responds differently, but this is a typical pattern.")}
 ${k.timeline([["Weeks 1–4", "Less hunger", "Appetite and cravings drop. Weight loss is gentle while your body adjusts."], ["Months 2–3", "Steady loss", "Weight comes off more noticeably as the dose increases."], ["Months 4–6", "Health gains", "Blood sugar, BP and liver numbers often improve on repeat tests."], ["Months 6–18", "Biggest change", "Most of the weight loss in trials happened over this period."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 </div>
 </div>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your first visit</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Getting Started with Weight Loss Injections</h2>
 ${k.processTabs([
   { tab: "01 · Assess", img: CONSULT, lead: "A thorough, honest consultation.",
     items: ["Your weight history, health conditions and medicines.", "Blood pressure, weight, waist and body composition.", "Blood tests ordered as needed.", "An honest talk about whether injections are right for you."] },
   { tab: "02 · Start", img: DESK, lead: "If suitable, you start safely.",
     items: ["A prescription for the right medicine and starting dose.", "Training on how to inject and store the pen.", "Your eating and activity plan.", "Your first review booked."] },
   { tab: "03 · Follow up", img: FIT, lead: "Close support all the way.",
     items: ["Regular reviews and dose adjustments.", "Help with side effects.", "Repeat tests and body composition tracking.", "A plan for maintenance and coming off."] },
 ])}
 </div>`, "p-0"),

  shell("compare", `${head("Compare", "Injections vs Diet Alone vs Bariatric Surgery", "Where weight loss injections fit.")}
 ${k.compareTable(["Injections + plan", "Diet and exercise alone", "Bariatric surgery"], [
   ["Average weight loss", "About 15–21% in trials", "Often 3–7%", "Often 25–30%+"],
   ["Hunger control", "Strong", "Hard", "Strong"],
   ["Surgery or hospital stay", "No", "No", "Yes"],
   ["Ongoing commitment", "Weekly injection and reviews", "Daily effort", "Lifelong diet changes"],
   ["Reversible", "Yes", "Yes", "No"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Weight Loss Injections?</h2>
 ${img("/wp-content/uploads/2026/07/devi.webp", "Dr. Devi KR, Facelit", 1143, 1376, "cp-img cp-img--wide cp-img--doc")}
 </div>
 ${k.whyList([
   ["Doctor-prescribed and monitored", "Every prescription follows a full medical assessment, and you're reviewed at every dose step."],
   ["Genuine medicines only", "We only use approved medicines from authorised sources, never grey-market pens."],
   ["Honest advice", "If injections aren't right or safe for you, we'll tell you and offer better options."],
   ["Muscle protected", "Body composition tracking and protein-focused nutrition, so you lose fat, not strength."],
   ["A plan for life after", "Nutrition and lifestyle coaching so your results last after the injections."],
 ])}
 </div>`),

  shell("safety", `${head("Safety first", "Who Should Not Take Weight Loss Injections", "These medicines are safe for most suitable adults under medical care, but not for everyone.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Not suitable if you</h3>${list(["Are pregnant, breastfeeding or trying to conceive", "Have a personal or family history of medullary thyroid cancer or MEN2", "Have had pancreatitis", "Are allergic to the medicine"], warn)}</div>
 <div class="cp-card"><h3 class="font-serif">Needs careful assessment if you</h3>${list(["Have gallbladder disease or severe stomach problems", "Have kidney disease or diabetic eye disease", "Take insulin or sulfonylureas (risk of low sugar)", "Have a history of eating disorders", "Take oral contraceptive pills (with tirzepatide)"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "Weight Loss Injection FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Next steps", "Part of Your Weight Management Plan", "")}
 ${k.links([["/medical-weight-management/", "Programme", "Medical weight management"], ["/nutrition-counselling/", "Programme", "Nutrition counselling"], ["/lifestyle-coaching/", "Programme", "Lifestyle coaching"], ["/body-composition-analysis/", "Test", "Body composition analysis"], ["/body-contouring/", "Treatment", "Body contouring"]])}`),

  k.cta("Curious whether weight loss injections are right for you?", "Book a doctor consultation. We'll check your health, explain Mounjaro, Wegovy and other options in plain language, and help you decide safely."),
];

sections[4] = sections[4].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Weight Loss Injections in Kerala | Mounjaro, Wegovy & Semaglutide | Facelit",
  desc: "Doctor-prescribed weight loss injections at Facelit, Trivandrum, Kollam & Thrissur. Tirzepatide (Mounjaro) and semaglutide (Wegovy) explained, with full assessment, monitoring and diet support.",
  image: "https://facelit.in/wp-content/uploads/2026/08/obesity-after-scaled-1.webp",
  faqs,
  procedure: { name: "Weight Loss Injections (GLP-1 Medicines)", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Subcutaneous injection in the abdomen, thigh or upper arm",
    howPerformed: "After medical assessment, a GLP-1 or dual GLP-1/GIP receptor agonist such as semaglutide or tirzepatide is prescribed as a once-weekly (or for liraglutide, daily) subcutaneous injection, starting at a low dose and increased gradually.",
    preparation: "Doctor consultation, medical history and medicine review, blood tests and body composition analysis; screening for pregnancy, pancreatitis and thyroid cancer history.",
    followup: "Regular reviews for dose adjustment and side effects, repeat blood tests and body composition analysis, nutrition and lifestyle support, and a planned maintenance or taper strategy." },
  crumbs: [["Home", "https://facelit.in/"], ["Weight management", "https://facelit.in/obesity-and-weight-management/"], ["Weight Loss Injections", "https://facelit.in/weight-loss-injections/"]],
});
