// Builds the redesigned /medical-weight-management/ page.
// Usage (from facelit-site/): node scripts/medical-weight/build.mjs content/pages/medical-weight-management.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";

const HERO = [A + "about-hero.webp", "Facelit doctor planning a medical weight loss programme with a patient"];
const CONSULT = [A + "about-hero.webp", "Facelit doctor discussing test results with a patient", 1151, 768];
const DESK = [A + "contact-hero.webp", "Patient arriving at the Facelit clinic", 1746, 1164];
const FIT = [A + "obesity-weight-management-hero.webp", "Healthy, smiling Indian woman after medical weight loss", 1769, 1180];
const BEFORE = [A + "obesity-before-scaled-1.webp", "Indian woman at the start of a medical weight management programme", 1920, 2560];
const AFTER = [A + "obesity-after-scaled-1.webp", "The same Indian woman after a doctor-led weight loss programme", 1920, 2560];

const causes = [
  ["Insulin resistance", "Your body needs more and more insulin to control blood sugar, and high insulin makes it store fat, especially around the tummy.", "Belly fat, sugar cravings, tiredness after meals, dark patches on the neck", "Fasting sugar, HbA1c, fasting insulin"],
  ["PCOS", "A hormone condition that makes weight gain easier and weight loss harder, often linked with insulin resistance.", "Irregular periods, acne, facial hair, hair thinning", "Hormone tests and an ultrasound if needed"],
  ["Underactive thyroid", "A slow thyroid slows your metabolism, so you gain weight even without eating more.", "Tiredness, feeling cold, dry skin, constipation, hair fall", "TSH, T3 and T4"],
  ["Poor sleep or sleep apnoea", "Short or broken sleep raises hunger hormones. Snoring and gasping at night can be sleep apnoea, which also drives weight gain.", "Loud snoring, waking tired, daytime sleepiness", "Sleep history, and referral if needed"],
  ["Stress and cortisol", "Long-term stress raises cortisol, which drives cravings and belly fat.", "Emotional eating, poor sleep, feeling wired and tired", "History and lifestyle review"],
  ["Medicines", "Some medicines for mood, diabetes, blood pressure, allergies and steroids can cause weight gain.", "Weight gain after starting a new medicine", "A full medicine review"],
  ["Low muscle and slow metabolism", "Years of dieting and sitting can lower your muscle, which slows the number of calories you burn.", "Losing and regaining weight, a \"skinny fat\" look", "Body composition analysis"],
];

const testsAcc = [
  ["Blood sugar: fasting glucose and HbA1c", "Checks for prediabetes and diabetes, and shows your average sugar over 3 months."],
  ["Fasting insulin", "Helps detect insulin resistance early, often years before diabetes shows up."],
  ["Thyroid profile", "TSH, T3 and T4 to rule out a slow thyroid."],
  ["Lipid profile", "Cholesterol and triglycerides, which often improve quickly with weight loss."],
  ["Liver function", "Checks for fatty liver, which is very common with belly fat."],
  ["Vitamin D and B12", "Low levels are common in Kerala and can affect energy, mood and muscle."],
  ["Hormone tests for women", "For PCOS and other hormone problems, when your symptoms suggest it."],
  ["Body composition analysis", "Measures fat, muscle and visceral fat, so we track the right kind of weight loss."],
];

const gains = [
  ["drop", "Blood sugar", "Can bring prediabetes back to normal and improve diabetes control."],
  ["shield", "Blood pressure", "Often drops noticeably, sometimes reducing the need for medicines."],
  ["layers", "Cholesterol &amp; liver", "Lower triglycerides and less fat in the liver."],
  ["heal", "Joint pain", "Less load on knees and back, so moving feels easier."],
  ["spark", "PCOS &amp; fertility", "More regular periods and better hormone balance."],
  ["clock", "Sleep &amp; energy", "Better sleep, less snoring and more energy through the day."],
];

const finderResults = [
  { v: "pcos", label: "PCOS", img: [A + "anti-aging-hero.webp", "Indian woman", 1716, 1144], title: "PCOS Weight Plan",
    text: "PCOS makes weight harder to lose because of hormones and insulin resistance. A medical plan targets both.",
    yes: "Hormone and insulin tests, a PCOS-friendly diet, activity plan and medicines where suitable, including weight-loss medicines if appropriate.", no: "Hormone and insulin tests, a PCOS-friendly diet, activity plan and close monitoring, without weight-loss medicines.",
    sessions: "Reviews every 2–4 weeks", combine: "Lifestyle coaching, nutrition" },
  { v: "sugar", label: "Prediabetes or diabetes", img: CONSULT, title: "Blood Sugar Plan",
    text: "Losing even 5 to 10% of your weight can bring prediabetes back to normal and make diabetes easier to control.",
    yes: "A sugar-friendly diet, activity and medicines that support both sugar and weight, with regular HbA1c checks.", no: "Diet, activity and close sugar monitoring, working with your existing diabetes treatment.",
    sessions: "Reviews every 2–4 weeks", combine: "Nutrition counselling" },
  { v: "thyroid", label: "Thyroid problems", img: DESK, title: "Thyroid-Aware Plan",
    text: "We check your thyroid is well controlled first, then build a plan that works with your metabolism.",
    yes: "Thyroid check and adjustment, then a full plan with medicines only if needed.", no: "Thyroid check and adjustment, then diet, activity and lifestyle support.",
    sessions: "Reviews every 4 weeks", combine: "Lifestyle coaching" },
  { v: "post", label: "Weight after pregnancy", img: FIT, title: "Postpartum Plan",
    text: "Gentle, safe weight loss after childbirth that respects breastfeeding, sleep and recovery.",
    yes: "Medicines are usually avoided while breastfeeding. Once you've finished, we can discuss them if needed.", no: "A breastfeeding-safe diet, gentle activity and a realistic pace.",
    sessions: "Reviews every 4 weeks", combine: "Body contouring later" },
  { v: "plateau", label: "Stuck despite trying", img: BEFORE, title: "Break the Plateau Plan",
    text: "If you've tried hard without results, there's often a hidden cause. We test for it and adjust your plan.",
    yes: "Tests for hidden causes, a fresh plan and medicines if suitable to help get past the plateau.", no: "Tests for hidden causes and a fresh diet and activity plan, tracked with body composition tests.",
    sessions: "Reviews every 2–4 weeks", combine: "Body composition analysis" },
  { v: "lots", label: "A lot of weight to lose", img: AFTER, title: "Long-Term Programme",
    text: "With more to lose, a steady, supervised plan over several months is safest and most successful.",
    yes: "A full medical programme that may include weight-loss injections, with regular checks.", no: "A full medical programme of diet, activity and behaviour change, with regular checks.",
    sessions: "A 6–12 month programme", combine: "Lifestyle coaching, nutrition" },
];

const faqs = [
  ["What is medical weight management?", "Medical weight management is weight loss planned and supervised by doctors. It starts with tests to find what's driving your weight, then combines diet, activity, behaviour change and, where suitable, medicines, with regular checks on your health and progress."],
  ["How is it different from a normal diet plan?", "A normal diet plan only changes what you eat. Medical weight management looks for causes like insulin resistance, PCOS, thyroid problems or medicines, treats them, and monitors your health as you lose weight."],
  ["Who is medical weight management for?", "It's for anyone who has struggled to lose weight on their own, especially with a BMI of 25 or more (the Asian cut-off), a large waist, or health problems like PCOS, prediabetes, diabetes, high blood pressure, fatty liver or joint pain."],
  ["What tests will I need?", "Usually blood sugar and HbA1c, fasting insulin, a thyroid profile, cholesterol, liver function, vitamin D and B12, and hormone tests for women if needed, plus a body composition analysis. Your doctor will choose what's relevant for you."],
  ["How much weight can I lose?", "A safe, steady rate is about 0.5 to 1 kg a week. Most people aim to lose 5 to 10% of their weight in the first 3 to 6 months, which brings big health benefits."],
  ["Will I be given medicines or injections?", "Only if they're suitable and safe for you. Many people do well with diet, activity and lifestyle changes alone. For others, medicines or weight-loss injections can help, always prescribed and monitored by our doctors."],
  ["Do I have to follow a strict diet?", "No. We build a plan around foods you already eat, including Kerala meals, with sensible portions and better balance. No starving and no crash diets."],
  ["Why can't I lose weight even though I eat less?", "Hidden causes like insulin resistance, a slow thyroid, PCOS, poor sleep, stress, some medicines or low muscle can make weight loss very hard. That's exactly what medical weight management looks for."],
  ["Is BMI different for Indians?", "Yes. Indians tend to carry more body fat and develop diabetes at lower weights, so the Asian cut-offs are lower: overweight from a BMI of 23 and obese from 25."],
  ["What waist size is healthy?", "For Indian adults, a waist below 90 cm for men and 80 cm for women is a good target. A larger waist means more risky belly fat."],
  ["How often will I see the doctor?", "Usually every 2 to 4 weeks at first, then less often as you progress. You'll also have body composition retests to track fat and muscle."],
  ["Will the weight come back after I stop?", "Weight is easier to keep off when habits have changed. Our programme includes a maintenance phase and lifestyle coaching to help you keep your results."],
  ["Can I combine it with body contouring?", "Yes. Once you're close to your goal weight, treatments like CM Slim and HIFU can shape stubborn areas and tighten loose skin."],
  ["Where can I get medical weight management in Kerala?", "Facelit offers doctor-led medical weight management at our clinics in Trivandrum, Karunagappally (Kollam) and Guruvayur (Thrissur)."],
];

const risk = `
<div class="mw-risk" data-mwrisk>
 <div class="mw-in">
 <fieldset><legend>I am</legend><label><input type="radio" name="mwsex" value="m" checked> Male</label><label><input type="radio" name="mwsex" value="f"> Female</label></fieldset>
 <div class="mw-row">
 <label>Height (cm)<input type="number" inputmode="numeric" min="120" max="220" placeholder="e.g. 162" data-h></label>
 <label>Weight (kg)<input type="number" inputmode="decimal" min="30" max="250" placeholder="e.g. 74" data-w></label>
 </div>
 <label>Waist (cm), measured at your belly button<input type="number" inputmode="numeric" min="50" max="200" placeholder="e.g. 88" data-wa></label>
 <p class="cp-note">Uses Asian BMI and waist cut-offs, which suit Indian adults.</p>
 </div>
 <div class="mw-out" aria-live="polite">
 <small>Your weight-related health risk</small>
 <b data-lvl>Enter your details</b>
 <div class="mw-stats"><div><span>BMI</span><strong data-bmi>—</strong></div><div><span>Waist</span><strong data-wst>—</strong></div></div>
 <p data-adv>Fill in your height, weight and waist to see your risk level and the best next step.</p>
 <p class="mw-fine">A general guide only, not a diagnosis. Our doctors look at your tests, history and body composition.</p>
 <a href="/appointment/" class="btn-3d-forest btn-press inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium">Book a doctor consultation</a>
 </div>
</div>`;

const pageCss = `<style>
.mw-risk{display:grid;gap:1.25rem}.mw-risk>*{min-width:0}@media(min-width:900px){.mw-risk{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.mw-in{display:grid;gap:.9rem}
.mw-in fieldset{display:flex;gap:.6rem;flex-wrap:wrap;border:0;padding:0;margin:0}
.mw-in legend{font:500 .9rem Onest,sans-serif;color:#2d3c2d;margin-bottom:.5rem;width:100%}
.mw-in fieldset label{display:flex;align-items:center;gap:.45rem;padding:.6rem 1rem;border:1px solid rgba(58,77,57,.18);border-radius:999px;background:#fff;cursor:pointer;font-size:.92rem}
.mw-in fieldset label:has(input:checked){border-color:#3a4d39;background:#f3efe4}
.mw-in input[type=radio]{accent-color:#3a4d39}
.mw-row{display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
.mw-in>label,.mw-row label{display:grid;gap:.4rem;font:500 .9rem Onest,sans-serif;color:#2d3c2d}
.mw-in input[type=number]{width:100%;padding:.8rem 1rem;border:1px solid rgba(58,77,57,.2);border-radius:.9rem;background:#fff;font-size:1rem;color:#2d3c2d}
.mw-in input[type=number]:focus{outline:2px solid #3a4d39;outline-offset:1px}
.mw-out{background:linear-gradient(160deg,#3a4d39,#2d3c2d);color:#fdf7ef;border-radius:1.25rem;padding:1.4rem}
.mw-out small{display:block;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.mw-out b{display:block;font-size:1.6rem;margin:.35rem 0 .75rem;font-weight:500;line-height:1.2}
.mw-stats{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-bottom:.9rem}
.mw-stats div{background:rgba(253,247,239,.1);border-radius:.8rem;padding:.6rem .8rem}
.mw-stats span{display:block;font-size:.72rem;opacity:.7;letter-spacing:.08em;text-transform:uppercase}.mw-stats strong{font-size:1.3rem;font-weight:500}
.mw-out p{font-size:.92rem;opacity:.92;margin:0 0 .75rem;line-height:1.5}.mw-out .mw-fine{font-size:.78rem;opacity:.7}
.mw-out .btn-3d-forest{background:#fdf7ef;color:#2d3c2d}
.mw-cause{display:grid;gap:.35rem}.mw-cause p{margin:0}.mw-cause small{display:block;font-size:.75rem;letter-spacing:.1em;text-transform:uppercase;color:#986a3e;margin-top:.5rem}
</style>`;

const pageJs = `<script>(function(){
var r=document.querySelector('[data-mwrisk]');if(!r)return;var L=r.querySelector('[data-lvl]'),B=r.querySelector('[data-bmi]'),W=r.querySelector('[data-wst]'),D=r.querySelector('[data-adv]');
function upd(){var f=(r.querySelector('input[name=mwsex]:checked')||{}).value==='f',h=parseFloat(r.querySelector('[data-h]').value)/100,w=parseFloat(r.querySelector('[data-w]').value),wa=parseFloat(r.querySelector('[data-wa]').value);
var bmi=(h>1&&w>20)?w/(h*h):NaN;B.textContent=isNaN(bmi)?'\\u2014':bmi.toFixed(1);var cut=f?80:90;W.textContent=isNaN(wa)?'\\u2014':(wa>=cut?'High':'Healthy');
if(isNaN(bmi)){L.textContent='Enter your details';D.textContent='Fill in your height, weight and waist to see your risk level and the best next step.';return}
var s=bmi<18.5?-1:bmi<23?0:bmi<25?1:bmi<30?2:3;if(!isNaN(wa)&&wa>=cut&&s>=0)s=Math.min(3,s+1);
var t=[['Healthy range','Your numbers look healthy. Keep it up with good habits, and get a body composition check if you want the full picture.'],['Mildly raised risk','You\\'re in the overweight range for Indian adults. Small, steady changes now can prevent problems later. Lifestyle coaching is a great start.'],['Raised risk','Your weight or waist suggests a higher risk of diabetes, blood pressure and fatty liver. A doctor-led plan with a few simple tests is a good next step.'],['High risk','Your numbers suggest a high risk of weight-related health problems. Medical weight management, with tests and close support, is strongly recommended.']];
if(s<0){L.textContent='Underweight';D.textContent='Your BMI is below the healthy range. Please talk to our doctor about healthy weight gain.';return}
L.textContent=t[s][0];D.textContent=t[s][1];}
r.addEventListener('input',upd);r.addEventListener('change',upd);
})();</script>`;

const sections = [
  k.hero({
    tags: ["Weight management", "Doctor-led", "Evidence-based"], h1: "Medical Weight Management",
    img: HERO, pos: "60% center",
    intro: "Tried diets, gym memberships and apps, but the weight keeps coming back? Sometimes the problem isn't willpower. It's insulin resistance, PCOS, thyroid, sleep, stress or medicines working against you. Medical weight management at Facelit starts by finding the cause, then gives you a doctor-led plan with the right food, activity, support and, where suitable, medicines, so you lose weight safely and keep it off.",
    facts: [["Doctor-led", "Every step"], ["0.5–1 kg", "Safe weekly loss"], ["5–10%", "First goal"], ["2–4 weeks", "Reviews"]],
    cta2: ["#risk", "Check your health risk"],
  }),
  k.jump([["overview", "Overview"], ["risk", "Risk checker"], ["causes", "Hidden causes"], ["tests", "Tests"], ["finder", "Find your plan"], ["programme", "Programme"], ["benefits", "Health gains"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Overview</p>
 <h2 class="cp-h2 font-serif">What is Medical Weight Management?</h2>
 <div class="cp-prose">
 <p>Medical weight management is weight loss planned and supervised by doctors. Instead of handing you a diet chart, we look at your whole health: your history, hormones, blood sugar, thyroid, sleep, medicines and body composition. That shows us why the weight is there and why it's been hard to shift.</p>
 <p>Your plan then combines four things: realistic eating built around food you already enjoy, activity that fits your day, support to change habits, and, only where it's safe and suitable, medicines that make weight loss easier. Regular reviews let us track your progress and adjust as you go.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why weight is a medical issue ${k.plus}</summary>
 <div class="cp-prose">
 <p>Excess weight, especially around the tummy, is closely linked to diabetes, high blood pressure, fatty liver, PCOS, joint pain and sleep apnoea. Indians tend to develop these problems at a lower weight than people from many other countries, which is why Asian BMI cut-offs are lower.</p>
 <p>Treating weight medically means looking after these risks as you lose weight, not just watching the scale.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How medical weight management works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Find the cause</b><span>History, blood tests and body composition analysis.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Treat and plan</b><span>Food, activity, habits and medicines if suitable.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Review and keep</b><span>Regular checks, then a plan to maintain your results.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...BEFORE)}
 ${img(...AFTER)}
 </div>
 </div>`),

  shell("risk", `${head("Quick check", "What's Your Weight-Related Health Risk?", "Your waist matters as much as your weight. Enter both to see your risk level using Indian cut-offs.")}${risk}`),

  shell("causes", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Hidden causes", "Why Can't I Lose Weight?", "If you've tried hard without results, one of these may be holding you back. Tap each to see the signs and how we check.")}
 <div class="cp-faq cp-faq--compact">${accordion(causes.map(([t, d, signs, test]) => [t, `<div class="mw-cause"><p>${d}</p><small>Common signs</small><p>${signs}</p><small>How we check</small><p>${test}</p></div>`]))}</div>
 </div>
 <div class="cp-split-sep" id="tests">
 ${head("Tests", "Tests Your Doctor May Suggest", "Only the tests that are relevant to you. Tap to see why each one matters.")}
 <div class="cp-faq cp-faq--compact">${accordion(testsAcc, false)}</div>
 </div>
 </div>`),

  shell("finder", `${head("Find your plan", "Which Medical Weight Plan Suits You?", "Answer two quick questions to see how our doctors would usually approach your situation.")}
 ${k.finder({ q1: "What best describes you?", q2: { label: "Would you consider medicines if your doctor feels they'd help?", dt: "Our approach", options: [["yes", "Yes, if it's safe"], ["no", "I'd rather avoid them"]] }, results: finderResults })}`),

  shell("programme", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Your programme", "How the Programme Works, Month by Month", "Tap each stage. Your doctor adjusts the pace to your health and goals.")}
 ${tabs("phases", [
   { tab: "Month 1", body: `<p class="cp-p" style="margin-top:0"><b>Assess and start.</b> Detailed consultation, blood tests and a body composition analysis. You leave with a clear plan and your first two or three changes.</p>${list(["Find the causes behind your weight", "Set a realistic first target", "Start eating and activity changes"])}` },
   { tab: "Months 2–3", body: `<p class="cp-p" style="margin-top:0"><b>Build momentum.</b> Reviews every 2 to 4 weeks to track weight, waist and body composition, solve problems and fine-tune the plan.</p>${list(["Steady loss of about 0.5 to 1 kg a week", "Medicines started or adjusted if suitable", "New habits added as earlier ones stick"])}` },
   { tab: "Months 4–6", body: `<p class="cp-p" style="margin-top:0"><b>See the health gains.</b> Repeat blood tests often show better sugar, cholesterol and liver numbers.</p>${list(["Reach your first 5 to 10% goal", "Repeat tests to measure health changes", "Plan the next target or move to maintenance"])}` },
   { tab: "Maintenance", body: `<p class="cp-p" style="margin-top:0"><b>Keep it off.</b> The most important phase. We help you hold your new weight with less frequent reviews.</p>${list(["Gradual changes to food and medicines", "Lifestyle coaching for lasting habits", "Body contouring for stubborn areas, if you'd like"])}` },
 ])}
 </div>
 <div class="cp-split-sep">
 ${head("What's included", "Your Plan Covers", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Doctor consultations", "A full assessment and regular reviews with our doctors, who look after your health as you lose weight."],
   ["Personal eating plan", "Built around Kerala food and your routine, with sensible portions, more protein and fewer empty calories. No crash diets."],
   ["Activity plan", "Movement that fits your day and protects your muscle, from walking to simple strength work."],
   ["Habit and behaviour support", "Help with emotional eating, cravings, sleep and stress, linked with our lifestyle coaching."],
   ["Medicines, if suitable", "Prescribed only when safe and helpful, including weight-loss injections for some people, and closely monitored."],
   ["Progress tracking", "Weight, waist, body composition and blood tests, so you can see real change."],
 ], false)}</div>
 </div>
 </div>`),

  shell("benefits", `${head("Health gains", "What Losing Just 5–10% Can Do", "You don't need to reach a \"perfect\" weight to feel the benefits. Losing 5 to 10% of your weight can make a real difference to your health.")}${k.benefitsGrid(gains)}`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>${head("Who it's for", "Is Medical Weight Management Right for You?", "")}
 ${list(["BMI of 25 or more (the Asian cut-off), or 23 or more with health problems", "Waist above 90 cm for men or 80 cm for women", "PCOS, thyroid problems, prediabetes or diabetes", "High blood pressure, cholesterol or fatty liver", "Knee or back pain made worse by weight", "Many failed diets, or weight regained after losing it"])}
 <div class="cp-card" style="margin-top:1.25rem"><h3 class="font-serif">Needs extra care</h3>${list(["Pregnancy and breastfeeding (medicines are usually avoided)", "Eating disorders, past or present", "Serious heart, kidney or liver disease", "Under 18 years old"], warn)}</div>
 </div>
 <div class="cp-split-sep">${head("Myths vs facts", "Weight Loss Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"It's just about eating less and moving more.\"", "That's part of it, but hormones, sleep, stress and medicines matter too. Ignore them and weight loss stalls."],
   ["\"Faster weight loss is better.\"", "Losing too fast often means losing muscle and regaining the weight. 0.5 to 1 kg a week lasts longer."],
   ["\"Weight-loss medicines are a shortcut.\"", "They're a medical tool for the right people, used with diet and lifestyle changes and monitored by a doctor."],
   ["\"Thyroid is always the cause.\"", "It's one possible cause. Insulin resistance, PCOS and sleep are often bigger factors, which is why we test."],
   ["\"Once you lose it, you're done.\"", "Maintenance is the most important phase. Without it, most weight comes back."],
 ], false)}</div></div>
 </div>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your first visit</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">What Happens at Your First Appointment</h2>
 ${k.processTabs([
   { tab: "01 · Talk", img: CONSULT, lead: "We listen first.",
     items: ["Your weight history, past diets and what's worked or not.", "Your health conditions, medicines and family history.", "Your routine: work, sleep, food, stress and activity.", "What you want to achieve, and why."] },
   { tab: "02 · Measure", img: DESK, lead: "We get the full picture.",
     items: ["Weight, height, waist and blood pressure.", "A body composition analysis for fat, muscle and visceral fat.", "Blood tests ordered if needed."] },
   { tab: "03 · Plan", img: FIT, lead: "You leave with a clear plan.",
     items: ["A realistic first target and timeline.", "Your first eating, activity and habit changes.", "Medicines discussed, if they're suitable.", "Your next review booked."] },
 ])}
 </div>`, "p-0"),

  shell("compare", `${head("Compare", "Medical Weight Management vs Crash Diets vs Going It Alone", "Why a doctor-led plan gets results that last.")}
 ${k.compareTable(["Medical weight management", "Crash diets", "Gym or diet alone"], [
   ["Finds the cause", "Yes, with tests", "No", "No"],
   ["Protects muscle", "Yes, tracked with body composition", "Often loses muscle", "Sometimes"],
   ["Treats PCOS, sugar and thyroid", "Yes", "No", "No"],
   ["Medicines if needed", "Yes, doctor-prescribed", "No", "No"],
   ["Regular support", "Yes", "No", "Varies"],
   ["Results last", "Built for the long term", "Weight often returns", "Varies"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Medical Weight Management?</h2>
 ${img(A + "eco-doctor-devi.webp", "Facelit doctor", 672, 891, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Doctor-led, start to finish", "Your plan is built and supervised by our doctors, not a sales team."],
   ["We find the cause", "Tests for insulin resistance, PCOS, thyroid and more, so we treat what's really going on."],
   ["Measured progress", "Body composition analysis tracks fat, muscle and visceral fat, not just weight."],
   ["Everything in one place", "Nutrition counselling, lifestyle coaching, weight-loss injections and body contouring."],
   ["Made for Kerala life", "Plans that work with Kerala food, family, festivals and climate."],
 ])}
 </div>`),

  shell("faq", `${head("Questions", "Medical Weight Management FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Next steps", "Part of Your Weight Management Plan", "")}
 ${k.links([["/body-composition-analysis/", "Test", "Body composition analysis"], ["/weight-loss-injections/", "Treatment", "Weight-loss injections"], ["/nutrition-counselling/", "Programme", "Nutrition counselling"], ["/lifestyle-coaching/", "Programme", "Lifestyle coaching"], ["/body-contouring/", "Treatment", "Body contouring"], ["/obesity-and-weight-management/", "Overview", "Obesity and weight management"]])}`),

  k.cta("Ready to find out what's really holding your weight back?", "Book a doctor consultation. We'll find the cause, explain your options honestly and build a plan that's safe for you."),
];

sections[3] = sections[3].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Medical Weight Management in Kerala | Doctor-Led Weight Loss | Facelit",
  desc: "Doctor-led medical weight loss at Facelit, Trivandrum, Kollam & Thrissur. We test for insulin resistance, PCOS and thyroid, then build a safe plan with diet, activity and medicines if suitable.",
  image: "https://facelit.in/wp-content/uploads/2026/08/about-hero.webp",
  faqs,
  procedure: { name: "Medical Weight Management", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Whole body",
    howPerformed: "Doctor-supervised weight loss combining clinical assessment, blood tests and body composition analysis with personalised nutrition, physical activity, behaviour support and, where appropriate, prescribed medicines.",
    preparation: "A doctor consultation covering weight history, health conditions, medicines and lifestyle, with blood tests and body composition analysis as needed.",
    followup: "Reviews every 2 to 4 weeks with weight, waist and body composition tracking, repeat blood tests at 3 to 6 months, then a maintenance plan." },
  crumbs: [["Home", "https://facelit.in/"], ["Weight management", "https://facelit.in/obesity-and-weight-management/"], ["Medical Weight Management", "https://facelit.in/medical-weight-management/"]],
});
