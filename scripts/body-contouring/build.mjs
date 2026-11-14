// Builds the redesigned /body-contouring/ hub page.
// Usage (from facelit-site/): node scripts/body-contouring/build.mjs content/pages/body-contouring.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const M = "/wp-content/uploads/2026/11/";

const HERO = [A + "obesity-weight-management-hero.webp", "Fit, smiling Indian woman after non-surgical body contouring at Facelit"];
const BEFORE = [A + "obesity-before-scaled-1.webp", "Indian woman with stubborn tummy fat before body contouring", 1920, 2560];
const AFTER = [A + "obesity-after-scaled-1.webp", "The same Indian woman with a slimmer, more toned shape after body contouring", 1920, 2560];
const CONSULT = [A + "about-hero.webp", "Facelit doctor planning a body contouring programme with a patient", 1151, 768];

const T = {
  cm: ["/cm-slim/", "CM Slim"],
  hifu: ["/hifu/", "HIFU body tightening"],
  prof: ["/profhilo-body-treatments/", "Profhilo Body"],
  hipex: ["/cm-slim-hipex-chair/", "Hipex Chair"],
  mwm: ["/medical-weight-management/", "Medical weight management"],
  inj: ["/weight-loss-injections/", "Weight-loss injections"],
  nut: ["/nutrition-counselling/", "Nutrition counselling"],
  coach: ["/lifestyle-coaching/", "Lifestyle coaching"],
  bca: ["/body-composition-analysis/", "Body composition analysis"],
};
const chips = (keys) => `<div class="bd-chips">${keys.map((x) => `<a href="${T[x][0]}">${T[x][1]} ${k.arrow}</a>`).join("")}</div>`;

// Body map: [tab, x%, y%, title, text, treatments]
const areas = [
  ["Chin &amp; neck", 50, 15, "Double chin and loose neck", "A double chin and soft jawline can make you look heavier than you are. Deep focused ultrasound tightens the skin and firms the area under the chin.", ["hifu"]],
  ["Arms", 21, 37, "Soft, loose upper arms", "Upper arms often stay soft even after weight loss. We combine muscle toning with skin tightening for firmer, more defined arms.", ["cm", "hifu", "prof"]],
  ["Tummy", 50, 41, "Stubborn belly fat and a soft tummy", "The most common concern. Muscle toning reduces fat and firms the core, skin treatments tighten loose skin after weight loss or pregnancy, and a weight plan tackles deeper belly fat.", ["cm", "hifu", "prof", "mwm"]],
  ["Waist &amp; love handles", 33, 49, "Love handles and waist", "Fat on the sides of the waist is stubborn and hormone-driven. A mix of toning and a doctor-led weight plan works best.", ["cm", "mwm", "nut"]],
  ["Buttocks", 64, 55, "Flat or sagging buttocks", "Electromagnetic muscle stimulation lifts, rounds and firms the buttocks without surgery or fillers.", ["cm"]],
  ["Thighs", 40, 68, "Thighs and inner thighs", "Tone the muscle and tighten loose, crepey skin on the inner and outer thighs.", ["cm", "hifu", "prof"]],
];

const journey = [
  { tab: "1 · Lose weight", body: `<p class="cp-p" style="margin-top:0">If you have more than a few kilos to lose, we start here. Contouring works best on a body that's close to its healthy weight.</p>${list(["Doctor-led medical weight management", "Weight-loss injections where medically suitable", "Practical Kerala-friendly meal plans"])}${chips(["mwm", "inj", "nut"])}` },
  { tab: "2 · Shape &amp; tone", body: `<p class="cp-p" style="margin-top:0">Target the stubborn areas that diet and exercise can't shift. Build muscle and reduce local fat for a more sculpted shape.</p>${list(["CM Slim electromagnetic muscle toning", "Tummy, buttocks, arms, thighs and calves", "No needles, no downtime"])}${chips(["cm"])}` },
  { tab: "3 · Tighten skin", body: `<p class="cp-p" style="margin-top:0">Weight loss, pregnancy and age can leave skin loose. Tightening treatments firm it up so your new shape shows.</p>${list(["HIFU body tightening with Ultraformer III", "Profhilo Body for crepey skin", "Arms, tummy, thighs and knees"])}${chips(["hifu", "prof"])}` },
  { tab: "4 · Maintain", body: `<p class="cp-p" style="margin-top:0">Keep your results with simple habits and regular check-ins.</p>${list(["Lifestyle coaching for sleep, stress and activity", "Body composition retests every 4 to 8 weeks", "Maintenance sessions when needed"])}${chips(["coach", "bca"])}` },
];

const benefits = [
  ["layers", "Targets Stubborn Fat", "Works on the pockets that won't shift with diet and exercise."],
  ["lift", "Builds &amp; Tones Muscle", "Firmer tummy, lifted buttocks and toned arms and thighs."],
  ["wave", "Tightens Loose Skin", "Firms skin after weight loss, pregnancy or with age."],
  ["heal", "No Surgery", "No cuts, no anaesthesia and no hospital stay."],
  ["clock", "No Downtime", "Most sessions take 30 to 60 minutes. Go straight back to your day."],
  ["shield", "Doctor-Led", "Every plan is built and supervised by our doctors."],
  ["spark", "Measured Results", "Body composition tests track fat and muscle, not just weight."],
  ["drop", "One Complete Plan", "Weight loss, toning, skin tightening and maintenance under one roof."],
];

const finderResults = [
  { v: "tummy", label: "Belly fat and soft tummy", img: BEFORE, title: "Flat Tummy Plan",
    text: "A firmer, flatter tummy usually needs toning plus some fat loss, and skin tightening if the skin is loose.",
    near: "CM Slim for the tummy, with HIFU if skin is loose.", above: "A medical weight plan first, then CM Slim to shape the tummy.",
    sessions: "4 CM Slim sessions over 2 weeks", combine: "Body composition tracking" },
  { v: "postpartum", label: "After pregnancy", img: AFTER, title: "Post-Pregnancy Body Plan",
    text: "Pregnancy stretches the tummy muscles and skin. We rebuild the core, tighten skin and support healthy weight loss, once your doctor confirms you've healed.",
    near: "CM Slim for the core, plus Profhilo Body or HIFU for loose skin.", above: "A gentle weight plan first, then core toning and skin tightening.",
    sessions: "Planned in stages", combine: "Hipex Chair for pelvic floor" },
  { v: "skin", label: "Loose skin after weight loss", img: HERO.concat([1769, 1180]), title: "Skin Tightening Plan",
    text: "After big weight loss, skin often needs help to catch up. Ultrasound and hyaluronic acid treatments firm and hydrate it.",
    near: "HIFU body tightening and Profhilo Body on the arms, tummy or thighs.", above: "Finish your weight loss first, then tighten the skin.",
    sessions: "1–3 sessions per area", combine: "CM Slim to tone the muscle underneath" },
  { v: "tone", label: "Tone and define", img: [A + "obesity-weight-management-hero-1.webp", "Active Indian woman", 1769, 1180], title: "Sculpt &amp; Define Plan",
    text: "If you're close to your goal weight, muscle toning gives definition to the tummy, buttocks, arms and thighs.",
    near: "A CM Slim course on 1 or 2 areas.", above: "A short weight plan alongside CM Slim, tracked with body composition tests.",
    sessions: "4 sessions per area", combine: "Lifestyle coaching" },
  { v: "weight", label: "Lose overall weight", img: CONSULT, title: "Weight Loss First Plan",
    text: "For overall weight loss, a doctor-led plan comes before contouring. Contouring then shapes the result.",
    near: "Nutrition counselling and coaching, with contouring for stubborn areas.", above: "Medical weight management, with weight-loss injections if suitable.",
    sessions: "A 3–6 month programme", combine: "Body composition analysis" },
  { v: "chin", label: "Double chin", img: [A + "anti-aging-after-scaled-1.webp", "Indian woman with a defined jawline", 1920, 2560], title: "Chin &amp; Jawline Plan",
    text: "Focused ultrasound tightens the skin under the chin and along the jaw for a cleaner profile.",
    near: "HIFU for the chin and jawline.", above: "Weight loss first, since a double chin often improves with it, then HIFU.",
    sessions: "1–2 HIFU sessions", combine: "Weight plan if needed" },
];

const menuRows = [
  ["CM Slim", "Tone &amp; fat", "fat tone", `HI-EMT muscle toning that builds muscle and reduces stubborn fat. <a href="/cm-slim/">Learn more</a>`, ["Tummy", "Buttocks", "Arms", "Thighs"], "Thousands of powerful muscle contractions in a 30-minute session.", "None", "4, over 2 weeks"],
  ["HIFU Body Tightening", "Skin", "skin", `Ultraformer III focused ultrasound tightens loose skin and helps reduce a double chin. <a href="/hifu/">Learn more</a>`, ["Tummy", "Arms", "Thighs", "Chin"], "Body cartridges reach deep layers to tighten and contour.", "None", "1–3"],
  ["Profhilo Body", "Skin", "skin", `Hyaluronic acid injections that hydrate and firm crepey, loose body skin. <a href="/profhilo-body-treatments/">Learn more</a>`, ["Arms", "Tummy", "Knees", "Thighs"], "Fine injections spread under the skin to boost collagen.", "Small bumps for a day", "2, a month apart"],
  ["Medical Weight Management", "Weight", "weight", `Doctor-supervised weight loss with tests, a personalised plan and regular reviews. <a href="/medical-weight-management/">Learn more</a>`, ["Weight loss", "Doctor-led"], "Clinical assessment, diet, activity and medical support where needed.", "None", "A 3–6 month programme"],
  ["Weight-Loss Injections", "Weight", "weight", `Medical support for weight loss, prescribed when suitable as part of a full plan. <a href="/weight-loss-injections/">Learn more</a>`, ["Prescription", "Doctor-led"], "Prescribed and monitored by our doctors alongside lifestyle changes.", "None", "As prescribed"],
  ["Nutrition Counselling", "Weight", "weight", `Practical eating plans built around Kerala food and your routine. <a href="/nutrition-counselling/">Learn more</a>`, ["Diet", "Habits"], "One-to-one sessions with regular follow-ups.", "None", "Ongoing"],
  ["Body Composition Analysis", "Measure", "weight fat", `An InBody test that measures fat, muscle and visceral fat to guide your plan. <a href="/body-composition-analysis/">Learn more</a>`, ["InBody", "Tracking"], "Stand on the analyser for about a minute.", "None", "Every 4–8 weeks"],
  ["Hipex Chair", "Core", "tone", `Pelvic floor strengthening, often used after pregnancy. <a href="/cm-slim-hipex-chair/">Learn more</a>`, ["Pelvic floor", "Postpartum"], "Sit fully clothed while electromagnetic energy works the pelvic floor.", "None", "As planned"],
];

const faqs = [
  ["What is body contouring?", "Body contouring means reshaping specific areas of the body by reducing stubborn fat, toning muscle and tightening loose skin. At Facelit we use non-surgical treatments, so there are no cuts and no downtime."],
  ["Is body contouring the same as weight loss?", "No. Weight loss reduces your overall body weight. Body contouring shapes specific areas like the tummy, arms or thighs. Many people do both: lose weight first, then contour the areas that are left."],
  ["What treatments are used for non-surgical body contouring?", "At Facelit we use CM Slim (electromagnetic muscle toning), HIFU body tightening with Ultraformer III and Profhilo Body, alongside medical weight management, weight-loss injections, nutrition counselling and body composition analysis."],
  ["Which areas can be treated?", "The tummy, love handles, buttocks, arms, thighs, calves, double chin and neck."],
  ["Am I a good candidate?", "Body contouring works best if you're at or close to a healthy weight and have stubborn areas or loose skin. If you have more weight to lose, we'll start with a medical weight plan."],
  ["What BMI is best for body contouring?", "For Indian adults, a BMI below about 25 is ideal for contouring alone. Above that, a weight-loss plan usually comes first. Use our BMI checker above as a guide."],
  ["How many sessions will I need?", "It depends on the treatment and area. CM Slim is usually 4 sessions over 2 weeks per area. HIFU is often 1 to 3 sessions, and Profhilo Body is 2 sessions a month apart."],
  ["When will I see results?", "Muscle toning and skin tightening build over 2 to 3 months. Weight-loss programmes show steady changes over 3 to 6 months."],
  ["Is non-surgical body contouring safe?", "Yes, for suitable people when planned by doctors. The treatments are non-invasive, need no anaesthesia and have little or no downtime. We screen everyone for things like implants, pregnancy and medical conditions first."],
  ["Is it painful?", "Most treatments are comfortable. CM Slim feels like an intense workout, and HIFU causes warm, tingling sensations. Settings are adjusted to your comfort."],
  ["How long do results last?", "Results last well if you keep a stable weight and stay active. Some treatments benefit from maintenance sessions every few months."],
  ["Can I do body contouring after pregnancy?", "Yes, once your doctor confirms you've healed, usually several months after delivery, and later after a C-section. We often combine core toning, skin tightening and pelvic floor strengthening."],
  ["Non-surgical contouring vs liposuction: which is better?", "Liposuction removes more fat in one go but needs surgery and recovery time. Non-surgical contouring is gentler, with no downtime, and suits people with smaller stubborn areas and loose skin."],
  ["Where can I get body contouring in Kerala?", "Facelit offers body contouring and weight management at our clinics in Trivandrum, Karunagappally (Kollam) and Guruvayur (Thrissur). Some technologies, like CM Slim and Ultraformer III, are at our Trivandrum clinic."],
  ["How much does body contouring cost?", "It depends on the treatments, areas and number of sessions in your plan. Book a consultation and we'll give you a clear, personalised quote."],
];

const body = `
<div class="bx-map">
 <div class="bx-body">
 <svg viewBox="0 0 200 400" aria-hidden="true" fill="#fdf7ef" stroke="#3a4d39" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
 <circle cx="100" cy="38" r="22"/>
 <path d="M90 58v10M110 58v10" fill="none"/>
 <path d="M66 74c10-6 58-6 68 0 10 4 12 12 12 24l-4 52c-2 18-8 32-10 46 0 14 2 24 0 34H68c-2-10 0-20 0-34-2-14-8-28-10-46l-4-52c0-12 2-20 12-24Z"/>
 <path d="M58 80c-12 4-16 14-17 30l-6 46c-2 18-2 30 0 44 2 4 8 4 10 0l4-42 10-52M142 80c12 4 16 14 17 30l6 46c2 18 2 30 0 44-2 4-8 4-10 0l-4-42-10-52"/>
 <path d="M68 230c-4 30-4 52-2 76l2 60c0 8 4 14 12 14 6 0 8-4 8-10l4-70 6-42c2-6 2-6 4 0l6 42 4 70c0 6 2 10 8 10 8 0 12-6 12-14l2-60c2-24 2-46-2-76"/>
 <path d="M86 110c4 4 24 4 28 0M84 140h32M86 166h28M100 100v90" fill="none" opacity=".25"/>
 <path d="M80 204c6 6 34 6 40 0" fill="none" opacity=".35"/>
 </svg>
 ${areas.map(([t, x, y], i) => `<button type="button" class="bx-dot" style="left:${x}%;top:${y}%" data-go="t-areas-${i}" aria-label="${t.replace(/&amp;/g, "and")}">${i + 1}</button>`).join("")}
 </div>
 <p class="cp-note" style="text-align:center">Tap a number to see the right treatments.</p>
</div>`;

const areaTabs = tabs("areas", areas.map(([t, , , title, text, keys], i) => ({ tab: `${i + 1} · ${t}`, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${title}</h3>
 <p class="cp-p">${text}</p>
 <p class="cp-eyebrow" style="margin:1rem 0 .5rem">Recommended at Facelit</p>
 ${chips(keys)}` })));

const bmi = `
<div class="bd-bmi" data-bmi>
 <div class="bd-in">
 <label>Height (cm)<input type="number" inputmode="numeric" min="120" max="220" placeholder="e.g. 160" data-h></label>
 <label>Weight (kg)<input type="number" inputmode="decimal" min="30" max="250" placeholder="e.g. 68" data-w></label>
 <div class="bd-scale" aria-hidden="true"><span style="background:#cfe0c9">Under 18.5</span><span style="background:#a9c79e">18.5–22.9</span><span style="background:#e9cf9c">23–24.9</span><span style="background:#d9a77a">25–29.9</span><span style="background:#b97a5b;color:#fff">30+</span></div>
 <p class="cp-note">Uses Asian BMI ranges, which suit Indian adults better than the international ones.</p>
 </div>
 <div class="bd-out" aria-live="polite">
 <small>Your BMI</small>
 <b data-bmiv>—</b>
 <p data-bmic>Enter your height and weight.</p>
 <p class="bd-fine">BMI is only a starting point. It can't tell fat from muscle, which is why we recommend a body composition analysis.</p>
 <a href="/appointment/" class="btn-3d-forest btn-press inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium">Book a consultation</a>
 </div>
</div>`;

const machines = `
<div class="bd-tech">
 <a class="bd-tcard" href="/cm-slim/"><div class="bd-timg"><img src="${M}cm-slim-machine.webp" alt="CM Slim body sculpting machine at Facelit" width="310" height="588" loading="lazy" decoding="async"></div><div><small>Muscle &amp; fat</small><h3 class="font-serif">CM Slim</h3><p>High-intensity electromagnetic technology for toning muscle and reducing stubborn fat.</p><span class="cp-textlink">About CM Slim ${k.arrow}</span></div></a>
 <a class="bd-tcard" href="/hifu/"><div class="bd-timg"><img src="${M}ultraformer-iii-machine.webp" alt="Ultraformer III HIFU machine at Facelit" width="294" height="730" loading="lazy" decoding="async"></div><div><small>Skin tightening</small><h3 class="font-serif">Ultraformer III</h3><p>Multi-depth focused ultrasound for tightening loose skin on the face and body.</p><span class="cp-textlink">About HIFU ${k.arrow}</span></div></a>
</div>`;

const pageCss = `<style>
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start}}
.bx-body{position:relative;max-width:230px;margin:0 auto}
.bx-body svg{width:100%;height:auto;display:block}
.bx-dot{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;background:#986a3e;color:#fff;font:600 13px/26px Onest,sans-serif;text-align:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.18);cursor:pointer;transition:transform .15s,background .15s}
.bx-dot:hover,.bx-dot[aria-current=true]{background:#3a4d39;transform:translate(-50%,-50%) scale(1.15)}
.bx-dot:focus-visible{outline:2px solid #3a4d39;outline-offset:2px}
.bd-chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.9rem}
.bd-chips a{display:inline-flex;align-items:center;gap:.35rem;padding:.5rem .85rem;border-radius:999px;background:#f3efe4;border:1px solid rgba(58,77,57,.15);color:#2d3c2d;font:500 .85rem Onest,sans-serif;text-decoration:none}
.bd-chips a:hover{background:#3a4d39;color:#fdf7ef}.bd-chips svg{width:.85rem;height:.85rem}
.bd-bmi{display:grid;gap:1.25rem}.bd-bmi>*{min-width:0}@media(min-width:900px){.bd-bmi{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.bd-in{display:grid;gap:.9rem}
.bd-in label{display:grid;gap:.4rem;font:500 .9rem Onest,sans-serif;color:#2d3c2d}
.bd-in input{width:100%;padding:.8rem 1rem;border:1px solid rgba(58,77,57,.2);border-radius:.9rem;background:#fff;font-size:1rem;color:#2d3c2d}
.bd-in input:focus{outline:2px solid #3a4d39;outline-offset:1px}
.bd-scale{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;border-radius:.75rem;overflow:hidden}
.bd-scale span{padding:.5rem .2rem;font:600 .68rem/1.2 Onest,sans-serif;text-align:center;color:#2d3c2d}
.bd-out{background:linear-gradient(160deg,#3a4d39,#2d3c2d);color:#fdf7ef;border-radius:1.25rem;padding:1.4rem}
.bd-out small{display:block;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.bd-out b{display:block;font-size:2.2rem;margin:.3rem 0 .4rem;font-weight:500}
.bd-out p{font-size:.92rem;opacity:.92;margin:0 0 .75rem;line-height:1.5}.bd-out .bd-fine{font-size:.78rem;opacity:.7}
.bd-out .btn-3d-forest{background:#fdf7ef;color:#2d3c2d}
.bd-tech{display:grid;gap:1rem}@media(min-width:760px){.bd-tech{grid-template-columns:1fr 1fr}}
.bd-tcard{display:grid;grid-template-columns:110px minmax(0,1fr);gap:1.1rem;align-items:center;padding:1rem;border:1px solid rgba(58,77,57,.12);border-radius:1.25rem;background:#fff;text-decoration:none;color:#2d3c2d}
.bd-tcard:hover{border-color:#3a4d39}
.bd-timg{background:#fff;border-radius:.9rem;display:flex;justify-content:center}.bd-timg img{height:170px;width:auto;object-fit:contain}
.bd-tcard small{font:600 .68rem Onest,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#986a3e}
.bd-tcard h3{font-size:1.4rem;margin:.2rem 0 .35rem;color:#2d3c2d}.cp-peel p a{color:#986a3e;text-decoration:underline;text-underline-offset:2px}.bd-tcard p{font-size:.9rem;line-height:1.5;color:#5c574f;margin:0 0 .5rem}
</style>`;

const pageJs = `<script>(function(){
var dots=[].slice.call(document.querySelectorAll('.bx-dot'));
function mark(id){dots.forEach(function(d){d.setAttribute('aria-current',d.dataset.go===id)})}
dots.forEach(function(d){d.addEventListener('click',function(){var t=document.getElementById(d.dataset.go);if(t){t.click();mark(d.dataset.go);if(window.innerWidth<900)t.closest('[data-tabs]').scrollIntoView({behavior:'smooth',block:'start'})}})});
document.querySelectorAll('[id^=t-areas-]').forEach(function(t){t.addEventListener('click',function(){mark(t.id)})});mark('t-areas-0');
var b=document.querySelector('[data-bmi]');if(!b)return;var v=b.querySelector('[data-bmiv]'),c=b.querySelector('[data-bmic]');
b.addEventListener('input',function(){var h=parseFloat(b.querySelector('[data-h]').value)/100,w=parseFloat(b.querySelector('[data-w]').value);
if(!(h>1&&w>20)){v.textContent='\\u2014';c.textContent='Enter your height and weight.';return}
var x=w/(h*h);v.textContent=x.toFixed(1);
c.textContent=x<18.5?'Underweight. Body contouring isn\\'t the right step. Talk to our doctor about healthy weight gain.':x<23?'Healthy range. You\\'re a great candidate for body contouring on any stubborn areas.':x<25?'Slightly overweight for Indian adults. Contouring works well, ideally with a little fat loss too.':x<30?'Overweight. We\\'d usually start with a weight plan, then contour the stubborn areas.':'In the obese range. A doctor-led medical weight plan comes first, and contouring shapes the result later.'});
})();</script>`;

const sections = [
  k.hero({
    tags: ["Weight management", "Non-surgical", "Doctor-led"], h1: "Non-Surgical Body Contouring",
    img: HERO, pos: "62% 30%",
    intro: "Stubborn belly fat, soft arms, loose skin after weight loss or a tummy that changed after pregnancy? Body contouring at Facelit shapes the areas diet and exercise can't reach. We combine muscle toning, skin tightening and doctor-led weight management into one plan, with no surgery and no downtime.",
    facts: [["0", "Downtime"], ["30–60 min", "Per session"], ["6+", "Body areas"], ["2–3 months", "Visible results"]],
    cta2: ["#bmi", "Check if you're ready"],
  }),
  k.jump([["overview", "Overview"], ["body-map", "Body map"], ["bmi", "BMI checker"], ["journey", "Your journey"], ["finder", "Find your plan"], ["treatments", "Treatments"], ["technology", "Technology"], ["process", "Process"], ["compare", "vs liposuction"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Overview</p>
 <h2 class="cp-h2 font-serif">What is Body Contouring?</h2>
 <div class="cp-prose">
 <p>Body contouring reshapes specific parts of your body by reducing stubborn fat, building muscle tone and tightening loose skin. It's different from weight loss: weight loss makes you smaller overall, while contouring shapes where it matters, like the tummy, waist, arms and thighs.</p>
 <p>At Facelit, every plan is doctor-led and non-surgical. We start by measuring your body with a body composition analysis, then match you with the right mix of treatments: CM Slim for muscle and fat, Ultraformer III HIFU and Profhilo Body for loose skin, and medical weight management when you need to lose weight first.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why stubborn fat won't shift ${k.plus}</summary>
 <div class="cp-prose">
 <p>Some areas, like the lower tummy, love handles and inner thighs, have fat cells that are slow to release their stored fat. Hormones, genetics, pregnancy and age all play a part. That's why many people lose weight everywhere except these areas.</p>
 <p>Targeted treatments work directly on these areas, and building the muscle underneath gives a firmer, more defined shape.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How body contouring works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Measure</b><span>Body composition analysis shows your fat, muscle and visceral fat.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Shape</b><span>Treatments tone muscle, reduce fat and tighten skin where you need it.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Maintain</b><span>Coaching and retests help you keep your new shape.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...BEFORE)}
 ${img(...AFTER)}
 </div>
 </div>`),

  shell("body-map", `${head("Treatment areas", "Which Area Bothers You? Tap the Body Map", "Tap a number to see what's causing the problem and which Facelit treatments can help.")}
 <div class="bx-wrap">${body}<div>${areaTabs}</div></div>`),

  shell("bmi", `${head("Are you ready for contouring?", "Check Your BMI", "Body contouring works best close to a healthy weight. Enter your height and weight to see where you stand and the right first step.")}${bmi}`),

  shell("journey", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Your journey", "From Weight Loss to Your Best Shape", "Most people follow these four steps. Tap each one. You may start at any step, depending on your body.")}
 ${tabs("journey", journey)}
 </div>
 <div class="cp-split-sep">${head("Weight loss vs contouring", "What's the Difference?", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Weight loss", "Reduces your overall body weight and fat, including visceral fat around your organs. It improves health markers like blood sugar and blood pressure."],
   ["Body contouring", "Shapes specific areas by toning muscle, reducing local fat and tightening skin. It doesn't replace weight loss, but it finishes the job."],
   ["Why you often need both", "Weight loss brings you to a healthy size. Contouring deals with the stubborn spots and loose skin that weight loss leaves behind."],
   ["Where to start", "If your BMI is 25 or above, we usually start with weight loss. If you're close to your goal, you can go straight to contouring."],
 ], false)}</div></div>
 </div>`),

  shell("finder", `${head("Find your plan", "Which Body Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan after a body composition analysis.")}
 ${k.finder({ q1: "What's your main concern?", q2: { label: "How close are you to your goal weight?", dt: "Our suggestion", options: [["near", "Within about 5 kg"], ["above", "More than 5 kg to lose"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of Non-Surgical Body Contouring", "Shape, tone and tighten without surgery or recovery time.")}${k.benefitsGrid(benefits)}`),

  shell("treatments", `${head("Our treatments", "Body Contouring &amp; Weight Loss Treatments at Facelit", "Everything you need for your body goals, under one roof. Filter by what you want to work on.")}
 ${k.menu([["all", "All"], ["fat", "Stubborn fat"], ["tone", "Tone"], ["skin", "Loose skin"], ["weight", "Weight loss"]], menuRows, "treatments")}`),

  shell("technology", `${head("Our technology", "The Machines Behind Your Results", "Two advanced, non-invasive technologies used in our body plans.")}${machines}`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Common problems", "Problems We Solve Every Day", "Tap a problem that sounds like yours.")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["\"My tummy won't go, even at the gym.\"", "Lower-tummy fat is one of the most stubborn areas. CM Slim tones the core and reduces fat right where you need it."],
   ["\"I lost weight but my skin is loose.\"", "Skin needs help to tighten after big weight loss. HIFU and Profhilo Body firm it up without surgery."],
   ["\"My body changed after pregnancy.\"", "Core muscles separate and weaken, and skin stretches. We rebuild the core, tighten skin and strengthen the pelvic floor."],
   ["\"I have PCOS and gain weight easily.\"", "Hormones make weight harder to manage. A doctor-led plan with the right diet and medical support makes a real difference."],
   ["\"I keep losing and regaining weight.\"", "Crash diets burn muscle and slow metabolism. We track fat and muscle with body composition tests so you lose the right kind of weight."],
   ["\"I don't have time for long treatments.\"", "Most sessions take 30 to 60 minutes with no downtime. Many people fit them into a lunch break."],
 ])}</div>
 </div>
 <div class="cp-split-sep">
 ${head("Near you", "Body Contouring in Trivandrum, Kollam &amp; Thrissur", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Trivandrum", "Our Trivandrum clinic has our full body range, including CM Slim and Ultraformer III HIFU, plus body composition analysis and medical weight management."],
   ["Karunagappally, Kollam", "Weight management, nutrition counselling and body plans for Kollam. Ask us about the technologies available at this branch."],
   ["Guruvayur, Thrissur", "Doctor-led consultations and weight management for Thrissur. Ask us about the technologies available at this branch."],
 ], false)}</div>
 <p class="cp-note">Not sure which clinic suits you? Call us and we'll guide you.</p>
 </div>
 </div>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your plan</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">How Your Body Contouring Plan Works</h2>
 ${k.processTabs([
   { tab: "01 · Assess", img: CONSULT, lead: "We start with the full picture.",
     items: ["A doctor consultation about your goals, health and history.", "A body composition analysis to measure fat, muscle and visceral fat.", "Blood tests if needed, for thyroid, PCOS or blood sugar.", "Photos and measurements to track progress."] },
   { tab: "02 · Treat", img: [M + "cm-slim-machine.webp", "CM Slim body contouring machine", 310, 588], lead: "Your treatments, in the right order.",
     items: ["Weight loss first, if needed.", "CM Slim to tone muscle and reduce stubborn fat.", "HIFU or Profhilo Body to tighten loose skin.", "Nutrition and coaching support throughout."] },
   { tab: "03 · Track &amp; maintain", img: AFTER, lead: "Results you can measure.",
     items: ["Body composition retests every 4 to 8 weeks.", "Before-and-after photos and measurements.", "Plan adjustments based on your numbers.", "Maintenance sessions and coaching to keep results."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "What Results Can You Expect?", "Non-surgical results build gradually and look natural.")}
 ${k.timeline([["Weeks 1–4", "Feel the change", "Firmer muscles, better energy and early changes on the tape measure."], ["Months 1–3", "See the change", "Toned muscle, less stubborn fat and tighter skin."], ["Months 3–6", "Your new shape", "Weight-loss and contouring results come together."], ["Ongoing", "Keep it", "A stable weight, activity and occasional maintenance keep your results."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary with your body, plan and lifestyle.</p>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Make it last", "Habits That Protect Your Results", "Simple everyday habits that keep your new shape.")}${tabs("habits", [
   { tab: "Eat", body: `${list(["Protein at every meal to protect muscle", "Fewer fried snacks and sugary drinks", "Smaller portions of rice and refined carbs", "Plenty of vegetables, dal and fruit"])}` },
   { tab: "Move", body: `${list(["A 30-minute walk most days", "Strength work 2 to 3 times a week", "Take the stairs and move every hour"])}` },
   { tab: "Recover", body: `${list(["7 to 8 hours of sleep", "Manage stress, which drives belly fat", "Drink 2 to 3 litres of water a day"])}` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "Body Contouring Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"Contouring is a quick way to lose weight.\"", "Contouring shapes areas. Overall weight loss needs a weight management plan."],
   ["\"You can spot-reduce fat with crunches.\"", "Exercise alone rarely shifts fat from one spot. Targeted treatments can."],
   ["\"Non-surgical means no results.\"", "Results are gradual and natural, and they're real, especially with a good plan."],
   ["\"Once done, you never need to do anything again.\"", "A stable weight and active lifestyle keep your results."],
   ["\"It's only for women.\"", "Many men use contouring for the tummy, love handles, chest-to-waist shape and double chin."],
 ], false)}</div></div>
 </div>`),

  shell("compare", `${head("Compare", "Non-Surgical Body Contouring vs Liposuction", "Which approach suits you?")}
 ${k.compareTable(["Non-surgical contouring", "Liposuction"], [
   ["How it works", "Tones muscle, reduces fat and tightens skin from outside", "Fat is suctioned out through small cuts"],
   ["Anaesthesia", "None", "Local or general"],
   ["Downtime", "None", "1 to 4 weeks"],
   ["Builds muscle", "Yes (CM Slim)", "No"],
   ["Tightens skin", "Yes (HIFU, Profhilo Body)", "Not usually"],
   ["Best for", "Stubborn areas, loose skin, people near goal weight", "Larger fat deposits"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Body Contouring?</h2>
 ${img("/wp-content/uploads/2026/07/devi.webp", "Dr. Devi KR, Facelit", 1143, 1376, "cp-img cp-img--wide cp-img--doc")}
 </div>
 ${k.whyList([
   ["Doctor-led from start to finish", "Our doctors assess your health, plan your treatments and track your progress."],
   ["Measured, not guessed", "Body composition analysis shows exactly what's changing: fat, muscle and visceral fat."],
   ["Advanced technology", "CM Slim and Ultraformer III for toning, fat reduction and skin tightening."],
   ["Weight loss and contouring together", "Medical weight management, injections, nutrition and coaching, all in one place."],
   ["Honest advice", "If contouring isn't the right first step, we'll tell you and plan what is."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Who Body Contouring Suits, and Who Should Wait", "Our treatments are non-invasive, but some health conditions mean certain treatments aren't suitable.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Muscle soreness after CM Slim, like after a workout", "Mild redness or tenderness after HIFU", "Small bumps for a day after Profhilo Body"])}</div>
 <div class="cp-card"><h3 class="font-serif">Tell your doctor if you</h3>${list(["Are pregnant or recently gave birth", "Have a pacemaker, metal implants or a copper IUD", "Have had recent surgery in the area", "Have a hernia, heart condition or other medical condition", "Take regular medicines"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "Body Contouring FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  k.cta("Ready to shape the body you've been working for?", "Book a consultation. Our doctors will measure your body, explain your options honestly and build a plan that fits your goals."),
];

sections[3] = sections[3].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Non-Surgical Body Contouring in Kerala | Trivandrum & Kollam | Facelit",
  desc: "Doctor-led non-surgical body contouring at Facelit, Trivandrum, Kollam & Thrissur. CM Slim, HIFU and Profhilo Body with weight management to reduce stubborn fat, tone and tighten skin.",
  image: "https://facelit.in/wp-content/uploads/2026/08/obesity-weight-management-hero.webp",
  faqs,
  procedure: { name: "Non-Surgical Body Contouring", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Abdomen, waist, buttocks, arms, thighs, chin and neck",
    howPerformed: "A doctor-led combination of electromagnetic muscle stimulation (CM Slim), focused ultrasound skin tightening (Ultraformer III HIFU) and hyaluronic acid skin remodelling (Profhilo Body), alongside medical weight management where needed.",
    preparation: "Doctor consultation, body composition analysis and screening for pregnancy, implants and medical conditions.",
    followup: "No downtime. Body composition retests every 4 to 8 weeks, healthy eating and activity, and maintenance sessions as advised." },
  crumbs: [["Home", "https://facelit.in/"], ["Weight management", "https://facelit.in/obesity-and-weight-management/"], ["Body Contouring", "https://facelit.in/body-contouring/"]],
});
