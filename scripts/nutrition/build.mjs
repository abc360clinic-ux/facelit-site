// Builds the redesigned /nutrition-counselling/ page.
// Usage (from facelit-site/): node scripts/nutrition/build.mjs content/pages/nutrition-counselling.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";

const HERO = [A + "obesity-weight-management-hero.webp", "Smiling Indian woman with fruit and water after nutrition counselling at Facelit"];
const FIT = [A + "obesity-weight-management-hero.webp", "Healthy Indian woman", 1769, 1180];
const CONSULT = [A + "about-hero.webp", "Facelit nutrition specialist planning meals with a client", 1151, 768];
const DESK = [A + "contact-hero.webp", "Client checking in at the Facelit clinic", 1746, 1164];
const BEFORE = [A + "obesity-before-scaled-1.webp", "Indian woman at the start of her nutrition plan", 1920, 2560];
const AFTER = [A + "obesity-after-scaled-1.webp", "The same Indian woman after months of better eating", 1920, 2560];
const GLOW = [A + "skin-after-1-scaled.webp", "Indian woman with clear, healthy skin", 1920, 2560];

// Plate sections: [name, share, colour, text, kerala examples]
const plate = [
  ["Vegetables", "Half the plate", "#8aa57d", "Fill half your plate with vegetables. They add fibre, vitamins and volume, so you feel full on fewer calories.", "Thoran, avial, cabbage, beans, cheera, salad"],
  ["Protein", "A quarter", "#c4945f", "Protein keeps you full, protects your muscle and steadies blood sugar. Most Kerala meals are low in it, so this is often the first fix.", "Fish curry, egg, chicken, kadala, cherupayar, dal, curd, paneer"],
  ["Carbs", "A quarter", "#e6cfa2", "Rice, chapati and tapioca give energy. You don't need to cut them out. Just keep the portion to about a quarter of the plate.", "Matta rice, chapati, puttu, appam, a small serving of kappa"],
  ["Healthy fats", "A little", "#7d5530", "A small amount of fat helps your body absorb vitamins. Coconut is fine in moderation. Watch the frying.", "Grated coconut, a spoon of coconut oil, nuts, seeds"],
];

const swaps = [
  ["Porotta", "Wheat chapati or dosa", "Porotta is made with refined flour and oil. Chapati gives you fibre and keeps you full longer."],
  ["Beef or chicken fry", "Fish curry or chicken curry", "Curries use far less oil than fries, and fish adds heart-healthy fats."],
  ["Banana chips", "Roasted chana or peanuts", "Same crunch, much less oil, plus protein."],
  ["Sweet tea, 3 times a day", "Tea with half the sugar, twice a day", "That small change can cut a lot of sugar from your week."],
  ["A big plate of rice", "Half rice, half vegetables", "Same plate size and same satisfaction, with far fewer calories."],
  ["Fruit juice", "Whole fruit", "Whole fruit keeps its fibre, so it fills you up and doesn't spike your sugar."],
  ["Evening pazham pori", "Steamed banana or sprouts chaat", "Steamed or fresh snacks satisfy evening hunger without deep-fried oil."],
  ["Payasam after every meal", "Payasam on special days only", "Keep festival sweets for festivals and enjoy them without guilt."],
];

const conditions = [
  { tab: "PCOS", body: `<p class="cp-p" style="margin-top:0">PCOS is closely linked to insulin resistance. The right eating pattern can improve periods, skin, energy and weight.</p>${list(["Protein and fibre at every meal to steady blood sugar", "Fewer refined carbs, sweets and sugary drinks", "Regular meal times, with no long gaps"])}` },
  { tab: "Diabetes", body: `<p class="cp-p" style="margin-top:0">Food choices make a big difference to blood sugar. We help you eat the foods you love in a way your sugar can handle.</p>${list(["Portion control for rice and other carbs", "Pairing carbs with protein and vegetables", "Smart choices at festivals and functions"])}` },
  { tab: "Thyroid", body: `<p class="cp-p" style="margin-top:0">An underactive thyroid can slow your metabolism. Good nutrition supports your treatment and energy.</p>${list(["Enough protein to protect muscle", "Iodine, selenium and iron from a balanced diet", "Timing meals around your thyroid medicine"])}` },
  { tab: "Fatty liver", body: `<p class="cp-p" style="margin-top:0">Fatty liver often improves with weight loss and better eating, especially less sugar and fried food.</p>${list(["Cut down sugary drinks and sweets", "Less fried and processed food", "More vegetables, fish and whole grains"])}` },
  { tab: "BP &amp; cholesterol", body: `<p class="cp-p" style="margin-top:0">Small changes to salt, oil and fibre can improve blood pressure and cholesterol.</p>${list(["Less pickle, papad and salty snacks", "Less frying and reused oil", "More fish, oats, vegetables and fruit"])}` },
  { tab: "Pregnancy &amp; postpartum", body: `<p class="cp-p" style="margin-top:0">Eating well for you and your baby, and recovering your health and energy safely after delivery.</p>${list(["Enough protein, iron, calcium and folate", "Breastfeeding-friendly weight loss", "Simple meals for busy, tired days"])}` },
  { tab: "Skin &amp; hair", body: `<p class="cp-p" style="margin-top:0">What you eat shows on your skin and hair. As a skin and hair clinic, we often pair treatments with nutrition.</p>${list(["Protein, iron, zinc and vitamin D for hair fall", "Less sugar and dairy if they trigger your acne", "Antioxidant-rich fruit and vegetables for glow"])}` },
];

const benefits = [
  ["leaf", "Real Food, No Fads", "Plans built around everyday Kerala food. No shakes, no starving."],
  ["lift", "Steady Weight Loss", "Lose weight at a safe pace and keep it off."],
  ["drop", "Better Blood Sugar", "Fewer sugar spikes, cravings and energy crashes."],
  ["spark", "More Energy", "Feel lighter and more energetic through the day."],
  ["shield", "Healthier Numbers", "Helps cholesterol, blood pressure and fatty liver."],
  ["heal", "Better Digestion", "Less bloating, acidity and constipation."],
  ["layers", "Skin &amp; Hair Health", "Nutrients that support clearer skin and stronger hair."],
  ["clock", "Fits Your Routine", "Practical plans for work, travel, festivals and family meals."],
];

const finderResults = [
  { v: "lose", label: "Lose weight", img: BEFORE, title: "Weight Loss Nutrition Plan",
    text: "A plan that cuts calories without cutting satisfaction, with more protein and vegetables and sensible carbs.",
    veg: "Protein from dal, kadala, cherupayar, paneer, curd and soya, with portion-controlled rice and chapati.", nonveg: "Protein from fish, eggs and chicken, with fried meats swapped for curries and portion-controlled rice.",
    sessions: "Regular follow-ups", combine: "Lifestyle coaching" },
  { v: "pcos", label: "PCOS or hormones", img: [A + "anti-aging-hero.webp", "Indian woman", 1716, 1144], title: "PCOS Nutrition Plan",
    text: "Eating to lower insulin resistance helps periods, skin, energy and weight.",
    veg: "Protein-rich vegetarian meals, high fibre and fewer refined carbs.", nonveg: "Fish, eggs and lean meat with lots of vegetables and fewer refined carbs.",
    sessions: "Regular follow-ups", combine: "Medical weight management" },
  { v: "sugar", label: "Diabetes or prediabetes", img: CONSULT, title: "Blood Sugar Nutrition Plan",
    text: "Steady blood sugar through smart portions, food pairing and meal timing.",
    veg: "Millets, dal and vegetables, with rice portions kept small and paired with protein.", nonveg: "Fish and egg-based meals, with rice portions kept small and plenty of vegetables.",
    sessions: "Regular follow-ups", combine: "Medical weight management" },
  { v: "skin", label: "Skin, acne or hair fall", img: GLOW, title: "Skin &amp; Hair Nutrition Plan",
    text: "The right nutrients support your skin and hair treatments from the inside.",
    veg: "Iron, zinc and protein from dal, seeds, greens and dairy, plus vitamin D checks.", nonveg: "Iron and protein from fish, eggs and meat, plus omega-3s from fish for skin.",
    sessions: "Regular follow-ups", combine: "Skin and hair treatments" },
  { v: "energy", label: "More energy, less bloating", img: FIT, title: "Gut &amp; Energy Plan",
    text: "Regular meals, more fibre and fewer trigger foods help digestion and energy.",
    veg: "Fibre-rich vegetarian meals, curd and enough water.", nonveg: "Balanced meals with fish or egg, plenty of fibre and enough water.",
    sessions: "Regular follow-ups", combine: "Lifestyle coaching" },
  { v: "muscle", label: "Build muscle or fitness", img: FIT, title: "Muscle &amp; Fitness Plan",
    text: "Enough protein and the right meal timing to build muscle and recover well.",
    veg: "Protein from paneer, soya, dal, curd and nuts, spread across the day.", nonveg: "Protein from eggs, chicken and fish, spread across the day.",
    sessions: "Regular follow-ups", combine: "Body composition analysis" },
];

const faqs = [
  ["What is nutrition counselling?", "Nutrition counselling is one-to-one guidance on what, when and how much to eat for your health and goals. Your nutrition specialist builds a plan around your food, routine and health conditions, and helps you stick to it with regular follow-ups."],
  ["Do I have to stop eating rice?", "No. We adjust the portion and pair rice with more vegetables and protein. Most people lose weight while still eating rice every day."],
  ["Is this just a diet chart?", "No. A diet chart is a starting point. Counselling helps you understand your food, solve problems like cravings or eating out, and adjust the plan as you go."],
  ["Can you make a vegetarian plan?", "Yes. We plan for vegetarian, non-vegetarian, eggetarian and vegan diets, and make sure you get enough protein either way."],
  ["Can nutrition help with PCOS?", "Yes. Eating to reduce insulin resistance can improve periods, skin, energy and weight in PCOS, alongside any medical treatment."],
  ["Can nutrition help diabetes?", "Yes. Smart portions, food pairing and meal timing can make a big difference to blood sugar. We work with your doctor's treatment plan."],
  ["Does diet affect skin and hair?", "Yes. Low protein, iron, zinc or vitamin D can cause hair fall, and some people find sugar and dairy trigger acne. We often pair nutrition with skin and hair treatments."],
  ["How much protein do I need?", "Most adults need about 0.8 to 1.2 g of protein per kg of body weight a day, and more if you're very active or trying to protect muscle while losing weight. Try our calculator above."],
  ["Will I feel hungry?", "No. Plans built on protein, fibre and vegetables keep you full. If you're always hungry, the plan needs adjusting, and that's what follow-ups are for."],
  ["Do I need supplements?", "Only if tests or your diet show a need, such as vitamin D, B12 or iron. Food comes first."],
  ["How soon will I see results?", "Many people feel more energetic and less bloated within 2 weeks. Steady weight loss of 0.5 to 1 kg a week is common once the plan settles."],
  ["What about festivals and functions?", "We plan for them. You'll learn how to enjoy Onam sadya, weddings and celebrations without undoing your progress."],
  ["Where can I get nutrition counselling in Kerala?", "Facelit offers nutrition counselling at our clinics in Trivandrum, Karunagappally (Kollam) and Guruvayur (Thrissur)."],
];

const plateHtml = `
<div class="nu-plate-wrap">
 <div class="nu-plate" role="img" aria-label="A balanced plate: half vegetables, a quarter protein, a quarter carbs and a little healthy fat"><div class="nu-inner"><b>Your plate</b><span>Tap a part</span></div></div>
 <div class="nu-legend">${plate.map(([n, s, c], i) => `<button type="button" data-go="t-plate-${i}"><i style="background:${c}"></i><span>${n}</span><small>${s}</small></button>`).join("")}</div>
</div>`;
const plateTabs = tabs("plate", plate.map(([n, s, , text, ex]) => ({ tab: n, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${n} · ${s}</h3>
 <p class="cp-p">${text}</p>
 <div class="cp-rec"><div><small>Kerala examples</small><b>${ex}</b></div></div>` })));

const swapHtml = `
<div class="nu-swaps">
 ${swaps.map(([from, to, why]) => `<div class="nu-swap"><small>Instead of</small><b>${from}</b><button type="button" aria-expanded="false" data-swap>See swap ${k.arrow}</button><div class="nu-to" hidden><small>Try</small><b>${to}</b><p>${why}</p></div></div>`).join("")}
</div>`;

const calc = `
<div class="nu-calc" data-nucalc>
 <div class="nu-in">
 <label>Your weight (kg)<input type="number" inputmode="decimal" min="30" max="250" placeholder="e.g. 65" data-w></label>
 <fieldset><legend>How active are you?</legend>
 <label><input type="radio" name="nuact" value="0.8" checked><span>Mostly sitting</span></label>
 <label><input type="radio" name="nuact" value="1.0"><span>Lightly active</span></label>
 <label><input type="radio" name="nuact" value="1.2"><span>Very active or losing weight</span></label>
 </fieldset>
 </div>
 <div class="nu-out" aria-live="polite">
 <div><small>Protein a day</small><b data-p>—</b></div>
 <div><small>Water a day</small><b data-wt>—</b></div>
 <p data-tip>Enter your weight to see your daily targets.</p>
 <p class="nu-fine">A general guide. Needs differ with kidney disease, pregnancy and other conditions, so check with us first.</p>
 </div>
</div>`;

const pageCss = `<style>
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:center}}
.nu-plate-wrap{display:grid;gap:1.6rem;justify-items:center;padding-top:1.5rem}
.nu-plate{width:min(260px,72vw);aspect-ratio:1;border-radius:50%;background:conic-gradient(#8aa57d 0 50%,#c4945f 50% 75%,#e6cfa2 75% 95%,#7d5530 95% 100%);display:grid;place-items:center;box-shadow:0 0 0 12px #fff,0 0 0 13px rgba(58,77,57,.15),0 20px 40px -20px rgba(45,60,45,.4)}
.nu-inner{width:46%;aspect-ratio:1;border-radius:50%;background:#fdf7ef;display:grid;place-content:center;text-align:center}
.nu-inner b{font:500 1rem Onest,sans-serif;color:#2d3c2d}.nu-inner span{font-size:.72rem;color:#5c574f}
.nu-legend{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;width:100%;max-width:380px}
.nu-legend button{display:grid;grid-template-columns:auto 1fr;grid-template-areas:"i n" "i s";column-gap:.6rem;align-items:center;text-align:left;padding:.6rem .75rem;border:1px solid rgba(58,77,57,.15);border-radius:.9rem;background:#fff;cursor:pointer;color:#2d3c2d}
.nu-legend i{grid-area:i;width:14px;height:14px;border-radius:50%}.nu-legend span{grid-area:n;font:500 .9rem Onest,sans-serif}.nu-legend small{grid-area:s;font-size:.75rem;color:#5c574f}
.nu-legend button[aria-current=true]{border-color:#3a4d39;background:#f3efe4}
.nu-swaps{margin-top:1rem;display:grid;gap:.6rem;grid-template-columns:1fr 1fr}.nu-swaps>*{min-width:0}@media(max-width:599px){.nu-swap{padding:.85rem}.nu-swap>b{font-size:.95rem}.nu-swap button{padding:.4rem .7rem;font-size:.78rem}}@media(min-width:1000px){.nu-swaps{grid-template-columns:repeat(4,1fr)}}
.nu-swap{background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.1rem;padding:1rem 1.1rem}
.nu-swap small{display:block;font:600 .68rem Onest,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#986a3e}
.nu-swap>b{display:block;font:500 1.05rem Onest,sans-serif;color:#2d3c2d;margin:.25rem 0 .7rem}
.nu-swap button{white-space:nowrap;display:inline-flex;align-items:center;gap:.35rem;border:0;background:#f3efe4;color:#2d3c2d;border-radius:999px;padding:.45rem .85rem;font:500 .82rem Onest,sans-serif;cursor:pointer}.nu-swap button svg{width:.85rem;height:.85rem}
.nu-to{margin-top:.8rem;padding-top:.8rem;border-top:1px dashed rgba(58,77,57,.2)}.nu-to small{color:#3a4d39}.nu-to b{display:block;font:500 1.05rem Onest,sans-serif;color:#3a4d39;margin:.2rem 0 .35rem}.nu-to p{margin:0;font-size:.88rem;line-height:1.5;color:#5c574f}
.nu-calc{display:grid;gap:1.25rem}.nu-calc>*{min-width:0}@media(min-width:900px){.nu-calc{grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start}}
.nu-in{display:grid;gap:.9rem}
.nu-in>label{display:grid;gap:.4rem;font:500 .9rem Onest,sans-serif;color:#2d3c2d}
.nu-in input[type=number]{width:100%;padding:.8rem 1rem;border:1px solid rgba(58,77,57,.2);border-radius:.9rem;background:#fff;font-size:1rem;color:#2d3c2d}
.nu-in fieldset{border:0;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:.45rem}
.nu-in legend{font:500 .9rem Onest,sans-serif;color:#2d3c2d;margin-bottom:.5rem;width:100%}
.nu-in fieldset label{cursor:pointer}.nu-in fieldset input{position:absolute;opacity:0;pointer-events:none}
.nu-in fieldset span{display:inline-block;padding:.55rem .95rem;border-radius:999px;border:1px solid rgba(58,77,57,.18);font-size:.88rem;background:#fff;color:#2d3c2d}
.nu-in fieldset input:checked+span{background:#3a4d39;color:#fdf7ef;border-color:#3a4d39}
.nu-in fieldset input:focus-visible+span{outline:2px solid #3a4d39;outline-offset:2px}
.nu-out{background:linear-gradient(160deg,#3a4d39,#2d3c2d);color:#fdf7ef;border-radius:1.25rem;padding:1.4rem;display:grid;grid-template-columns:1fr 1fr;gap:.75rem}
.nu-out>div{background:rgba(253,247,239,.1);border-radius:.9rem;padding:.8rem}
.nu-out small{display:block;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;opacity:.7}.nu-out b{display:block;font-size:1.5rem;font-weight:500;margin-top:.2rem}
.nu-out p{grid-column:1/-1;margin:0;font-size:.92rem;line-height:1.5;opacity:.92}.nu-out .nu-fine{font-size:.78rem;opacity:.7}
</style>`;

const pageJs = `<script>(function(){
var lg=[].slice.call(document.querySelectorAll('.nu-legend button'));
function mark(id){lg.forEach(function(b){b.setAttribute('aria-current',b.dataset.go===id)})}
lg.forEach(function(b){b.addEventListener('click',function(){var t=document.getElementById(b.dataset.go);if(t){t.click();mark(b.dataset.go)}})});
document.querySelectorAll('[id^=t-plate-]').forEach(function(t){t.addEventListener('click',function(){mark(t.id)})});mark('t-plate-0');
document.querySelectorAll('[data-swap]').forEach(function(b){b.addEventListener('click',function(){var to=b.nextElementSibling,open=to.hidden;to.hidden=!open;b.setAttribute('aria-expanded',open);b.firstChild.textContent=open?'Hide swap ':'See swap '})});
var c=document.querySelector('[data-nucalc]');if(!c)return;var P=c.querySelector('[data-p]'),W=c.querySelector('[data-wt]'),T=c.querySelector('[data-tip]');
function upd(){var w=parseFloat(c.querySelector('[data-w]').value),f=parseFloat((c.querySelector('input[name=nuact]:checked')||{}).value||0.8);
if(!(w>=30)){P.textContent='\\u2014';W.textContent='\\u2014';T.textContent='Enter your weight to see your daily targets.';return}
var p=Math.round(w*f),l=(w*0.035).toFixed(1);P.textContent=p+' g';W.textContent=l+' L';
T.textContent='Spread about '+Math.round(p/3)+' g of protein across each main meal. One egg has about 6 g, a palm-sized piece of fish or chicken about 20 g, and a cup of cooked dal about 9 g.'}
c.addEventListener('input',upd);c.addEventListener('change',upd);
})();</script>`;

const sections = [
  k.hero({
    tags: ["Weight management", "Real Kerala food", "Expert-led"], h1: "Nutrition Counselling",
    img: HERO, pos: "62% 30%",
    intro: "Confused by diet advice online, tired of plans that ban rice, or eating \"healthy\" but still not seeing results? Nutrition counselling at Facelit gives you a personal plan built around the food you already eat, your routine and your health. It's practical, satisfying and made for real Kerala life, with expert support to help it last.",
    facts: [["No", "Crash diets"], ["100%", "Personalised"], ["Veg &amp; non-veg", "Plans"], ["0.5–1 kg", "Safe weekly loss"]],
    cta2: ["#plate", "Build a balanced plate"],
  }),
  k.jump([["overview", "Overview"], ["plate", "Balanced plate"], ["swaps", "Smart swaps"], ["calculator", "Protein &amp; water"], ["conditions", "Health conditions"], ["finder", "Find your plan"], ["how", "How it works"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Overview</p>
 <h2 class="cp-h2 font-serif">What is Nutrition Counselling?</h2>
 <div class="cp-prose">
 <p>Nutrition counselling is one-to-one guidance from a specialist on what, how much and when to eat for your body and your goals. It isn't a generic diet chart. It's a plan built around you: your favourite foods, your work hours, your family meals, your health conditions and what you're trying to achieve.</p>
 <p>We start by understanding how you eat now, then make small, realistic changes, like a better breakfast, more protein, a smaller rice portion or smarter evening snacks. Regular follow-ups help you solve problems as they come up, so the changes become habits rather than rules you'll break in a month.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why crash diets fail ${k.plus}</summary>
 <div class="cp-prose">
 <p>Very low-calorie diets make you lose water and muscle as well as fat. Your metabolism slows, hunger rises and, sooner or later, the weight comes back, often with extra.</p>
 <p>A balanced plan with enough protein and fibre lets you lose fat steadily while protecting muscle and keeping your energy up. It's slower at first, but it lasts.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How nutrition counselling works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Understand</b><span>Your food, routine, health and goals.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Plan</b><span>A realistic meal plan using foods you enjoy.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Adjust</b><span>Follow-ups to solve problems and fine-tune.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...CONSULT)}
 ${img(...FIT)}
 </div>
 </div>`),

  shell("plate", `${head("The balanced plate", "Build a Balanced Kerala Plate", "No weighing or counting needed. Just picture your plate in four parts. Tap each one to see what goes there.")}
 <div class="bx-wrap">${plateHtml}<div>${plateTabs}</div></div>`),

  shell("swaps", `${head("Smart swaps", "Small Swaps, Big Difference", "You don't need to give up the foods you love. Tap a card to see an easy swap that makes a real difference over a week.")}${swapHtml}`),

  shell("calculator", `${head("Daily targets", "How Much Protein and Water Do You Need?", "Most people in Kerala don't get enough protein. Enter your weight to see a simple daily target.")}${calc}`),

  shell("conditions", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Health conditions", "Nutrition for Your Health Condition", "Food is a powerful part of treatment. Tap a condition to see how we help.")}
 ${tabs("conditions", conditions)}
 </div>
 <div class="cp-split-sep">
 ${head("Common problems", "Does This Sound Like You?", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["\"I eat healthy but don't lose weight.\"", "Healthy foods can still add up, like coconut, oil, rice and fruit juice. We look at portions and balance, not just food choices."],
   ["\"I'm always hungry on a diet.\"", "Too little protein and fibre usually causes this. Getting the balance right makes hunger far easier to handle."],
   ["\"I crave sweets in the evening.\"", "Long gaps between meals and a low-protein lunch often lead to evening cravings. Fix the day and the cravings ease."],
   ["\"I eat out a lot for work.\"", "We teach you what to order at hotels, canteens and functions so you can stay on track anywhere."],
   ["\"My family eats differently.\"", "Plans are built around family meals, with small changes to your plate, not separate cooking."],
 ], false)}</div>
 </div>
 </div>`),

  shell("finder", `${head("Find your plan", "What Do You Want Your Food to Do for You?", "Answer two quick questions to see how your nutrition plan would start.")}
 ${k.finder({ q1: "What's your main goal?", q2: { label: "How do you eat?", dt: "Your plan", options: [["veg", "Vegetarian"], ["nonveg", "Non-vegetarian"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of Nutrition Counselling", "Better eating that you can enjoy and keep up.")}${k.benefitsGrid(benefits)}`),

  shell("how", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">How it works</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Your Nutrition Counselling Journey</h2>
 ${k.processTabs([
   { tab: "01 · Assess", img: CONSULT, lead: "We start by understanding how you eat.",
     items: ["A chat about your usual meals, snacks, drinks and timings.", "Your health conditions, medicines and recent blood tests.", "Your likes, dislikes, budget and cooking setup.", "A body composition analysis to see fat and muscle."] },
   { tab: "02 · Plan", img: DESK, lead: "A plan that fits your life.",
     items: ["A simple meal plan with Kerala foods you enjoy.", "Portion guides using your own plate, not a scale.", "Healthy snack ideas and smart swaps.", "Tips for eating out, travel and festivals."] },
   { tab: "03 · Follow up", img: AFTER, lead: "Support that keeps you going.",
     items: ["Regular follow-ups to check progress.", "Problems solved as they come up.", "Plan adjusted as your body and routine change.", "Body composition retests to track real change."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "What Changes, and When", "Good nutrition works quietly, but you'll notice it.")}
 ${k.timeline([["Week 1–2", "Feel lighter", "Less bloating, steadier energy and fewer cravings."], ["Weeks 3–6", "New normal", "Meals feel easy and portions feel right."], ["Weeks 6–12", "See results", "Steady weight loss and better body composition."], ["3 months +", "Health gains", "Better blood sugar, cholesterol and energy in your follow-up tests."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After a few months</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 </div>
 </div>`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>${head("Myths vs facts", "Nutrition Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"Rice makes you fat.\"", "Too much rice, with too little protein and vegetables, is the problem. The right portion is fine."],
   ["\"Coconut oil is unhealthy.\"", "It's fine in small amounts. The issue is how much and how often food is fried."],
   ["\"Fruit juice is as good as fruit.\"", "Juice loses the fibre and raises blood sugar faster. Whole fruit is better."],
   ["\"Skipping dinner helps you lose weight.\"", "It often leads to late-night snacking. A light, early dinner works better."],
   ["\"Brown sugar and jaggery are healthy.\"", "They're still sugar. Use them in small amounts, just like white sugar."],
 ], false)}</div></div>
 <div class="cp-split-sep">${head("Who it's for", "Who Nutrition Counselling Helps", "")}
 ${list(["Anyone wanting to lose weight without crash diets", "People with PCOS, thyroid problems or diabetes", "People with fatty liver, high cholesterol or blood pressure", "Pregnant and new mothers", "People with acne, dull skin or hair fall", "Gym-goers and athletes building muscle"])}
 <div class="cp-card" style="margin-top:1.25rem"><h3 class="font-serif">Works well with</h3>${list(["Lifestyle coaching", "Medical weight management", "Skin and hair treatments"])}</div>
 </div>
 </div>`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Nutrition Counselling?</h2>
 ${img(A + "eco-doctor-devi.webp", "Facelit doctor", 672, 891, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Part of a medical team", "Your plan takes your health conditions, medicines and blood tests into account, with our doctors involved where needed."],
   ["Real Kerala food", "We work with puttu, appam, fish curry, rice and sadya, not imported diet fads."],
   ["Measured progress", "Body composition analysis shows fat and muscle changes, not just weight."],
   ["Skin, hair and weight together", "Nutrition that supports your skin and hair treatments as well as your weight."],
   ["Friendly, no-judgement support", "Honest guidance, whatever your starting point."],
 ])}
 </div>`),

  shell("faq", `${head("Questions", "Nutrition Counselling FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Next steps", "Nutrition Works Best With", "")}
 ${k.links([["/lifestyle-coaching/", "Programme", "Lifestyle coaching"], ["/medical-weight-management/", "Programme", "Medical weight management"], ["/body-composition-analysis/", "Test", "Body composition analysis"], ["/obesity-and-weight-management/", "Overview", "Obesity and weight management"]])}`),

  k.cta("Ready to eat well without giving up the food you love?", "Book a nutrition consultation. We'll look at how you eat now and build a plan that fits your life."),
];

sections[3] = sections[3].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Nutrition Counselling in Kerala | Diet Plans for Weight Loss & PCOS | Facelit",
  desc: "Personal nutrition counselling at Facelit, Trivandrum, Kollam & Thrissur. Practical Kerala meal plans for weight loss, PCOS, diabetes, thyroid and healthy skin and hair. No crash diets.",
  image: "https://facelit.in/wp-content/uploads/2026/08/obesity-weight-management-hero.webp",
  faqs,
  procedure: { name: "Nutrition Counselling", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Whole body",
    howPerformed: "One-to-one dietary assessment and counselling, with a personalised meal plan based on usual foods, routine, health conditions and goals.",
    preparation: "A record of usual meals and snacks, recent blood test results and a list of medicines.",
    followup: "Regular follow-ups to review progress, solve problems and adjust the plan, with periodic body composition analysis." },
  crumbs: [["Home", "https://facelit.in/"], ["Weight management", "https://facelit.in/obesity-and-weight-management/"], ["Nutrition Counselling", "https://facelit.in/nutrition-counselling/"]],
});
