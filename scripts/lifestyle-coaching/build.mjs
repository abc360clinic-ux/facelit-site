// Builds the redesigned /lifestyle-coaching/ page.
// Usage (from facelit-site/): node scripts/lifestyle-coaching/build.mjs content/pages/lifestyle-coaching.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";

const HERO = [A + "obesity-weight-management-hero.webp", "Smiling Indian woman with a water bottle and fruit, living a healthier lifestyle"];
const FIT = [A + "obesity-weight-management-hero.webp", "Indian woman with healthy habits", 1769, 1180];
const CONSULT = [A + "about-hero.webp", "Facelit lifestyle coach talking with a client", 1151, 768];
const DESK = [A + "contact-hero.webp", "Friendly welcome at the Facelit clinic reception", 1746, 1164];
const BEFORE = [A + "obesity-before-scaled-1.webp", "Indian woman at the start of her lifestyle change", 1920, 2560];
const AFTER = [A + "obesity-after-scaled-1.webp", "The same Indian woman after months of healthier habits", 1920, 2560];

// Quiz: [pillar key, question, [option text x3, scored 0/1/2]]
const quiz = [
  ["sleep", "How many hours do you usually sleep?", ["Less than 6", "6 to 7", "7 to 8 or more"]],
  ["move", "How active are you on most days?", ["Mostly sitting", "Some walking", "30+ minutes of activity"]],
  ["food", "How often do you snack or eat late at night?", ["Most days", "A few times a week", "Rarely"]],
  ["water", "How much water do you drink a day?", ["Under 1 litre", "1 to 2 litres", "2+ litres"]],
  ["stress", "How often do you feel stressed or overwhelmed?", ["Most days", "Sometimes", "Rarely"]],
  ["screen", "How much screen time do you have before bed?", ["Over an hour", "Around 30 minutes", "Little or none"]],
];
const pillarName = { sleep: "Sleep", move: "Movement", food: "Eating habits", water: "Hydration", stress: "Stress", screen: "Screen time and wind-down" };

const pillars = [
  { tab: "Sleep", body: `<p class="cp-p" style="margin-top:0">Poor sleep raises the hormones that make you hungry and crave sweets, and lowers the one that tells you you're full. Two short nights can undo a week of careful eating.</p><div class="cp-faq cp-faq--compact">${accordion([
    ["How much sleep do I need?", "Most adults need 7 to 8 hours. The time you go to bed matters as much as the hours: going to sleep before 11 pm helps your body clock."],
    ["Simple ways to sleep better", "Keep the same bedtime, even on weekends. Dim the lights an hour before bed, keep the room cool and dark, and leave your phone outside the bedroom if you can."],
    ["Shift work or a newborn?", "We plan around real life. If your sleep is broken, we focus on protecting your longest block of sleep and adding short naps."],
  ], false)}</div>` },
  { tab: "Movement", body: `<p class="cp-p" style="margin-top:0">You don't need a gym membership to start. Daily movement matters more than occasional hard workouts.</p><div class="cp-faq cp-faq--compact">${accordion([
    ["Where do I start?", "Start with a 10-minute walk after meals. It helps blood sugar and digestion, and it's easy to keep up."],
    ["How much is enough?", "Aim for about 7,000 to 10,000 steps a day, plus 2 or 3 short strength sessions a week to protect your muscle."],
    ["I have a desk job", "Stand or walk for 2 to 3 minutes every hour, take calls on your feet and use the stairs. Small moves add up."],
  ], false)}</div>` },
  { tab: "Eating habits", body: `<p class="cp-p" style="margin-top:0">It's not just what you eat, but when, how fast and why. We work on habits, not strict diets you'll quit in a month.</p><div class="cp-faq cp-faq--compact">${accordion([
    ["Do I have to give up rice?", "No. We adjust portions and pair rice with more vegetables, dal, fish, egg or chicken, so the meal keeps you full for longer."],
    ["Snacking and late-night eating", "Late-night snacking is often down to tiredness, boredom or skipped meals. Regular meals and a planned evening snack usually fix it."],
    ["Eating out and family functions", "We plan for weddings, festivals and office lunches, so you can enjoy them without losing your progress."],
  ], false)}</div>` },
  { tab: "Stress", body: `<p class="cp-p" style="margin-top:0">Long-term stress raises cortisol, which drives belly fat, cravings and poor sleep. Managing stress is part of managing weight.</p><div class="cp-faq cp-faq--compact">${accordion([
    ["Quick ways to calm down", "Slow breathing for 2 minutes, a short walk outdoors or a few stretches between tasks can lower stress quickly."],
    ["Emotional eating", "We help you notice the triggers, like stress, boredom or loneliness, and build other ways to cope."],
    ["Making time for yourself", "Even 15 minutes a day for something you enjoy makes a difference. We help you find it in a busy week."],
  ], false)}</div>` },
  { tab: "Daily routine", body: `<p class="cp-p" style="margin-top:0">Good habits stick when they're built into your day. We design a routine that fits your work, family and commute.</p><div class="cp-faq cp-faq--compact">${accordion([
    ["Start small", "Change one or two things at a time. Once they feel automatic, we add the next."],
    ["Plan ahead", "Plan meals for the week, keep healthy snacks ready and lay out walking shoes the night before."],
    ["Track the right things", "Track habits like sleep, steps and water, not just weight. Habits drive results."],
  ], false)}</div>` },
];

const dayPlan = [
  ["6:30 am", "Wake up and hydrate", "A glass of water and 5 minutes of sunlight or stretching to wake your body up."],
  ["8:00 am", "Protein breakfast", "Puttu with kadala, egg with dosa or oats with nuts, so you stay full until lunch."],
  ["1:00 pm", "Balanced lunch", "Half the plate vegetables, a fist of rice, plus fish, chicken, egg or dal. Then a 10-minute walk."],
  ["5:00 pm", "Smart snack", "Fruit, sprouts or roasted chana instead of fried snacks and sweet tea."],
  ["8:00 pm", "Light, early dinner", "Eat 2 to 3 hours before bed, with more vegetables and protein, and less rice."],
  ["10:30 pm", "Wind down", "Screens off, lights low, and in bed for 7 to 8 hours of sleep."],
];

const benefits = [
  ["lift", "Lasting Weight Loss", "Habits you can keep, so the weight stays off."],
  ["clock", "Better Sleep", "Fall asleep easier and wake up feeling rested."],
  ["spark", "More Energy", "Steady energy through the day without the afternoon slump."],
  ["shield", "Healthier Numbers", "Helps blood sugar, blood pressure and cholesterol."],
  ["heal", "Less Stress", "Practical tools to handle stress and emotional eating."],
  ["leaf", "No Crash Diets", "Real food, Kerala-friendly meals and no starving."],
  ["layers", "Plan That Fits You", "Built around your job, family and schedule."],
  ["wave", "Someone in Your Corner", "Regular check-ins keep you motivated and on track."],
];

const finderResults = [
  { v: "time", label: "No time to look after myself", img: DESK, title: "Busy Life Plan",
    text: "When life is packed, big changes fail. We fit small, powerful habits into the time you already have.",
    regular: "10-minute walks after meals, a planned weekly menu and a fixed bedtime.", shift: "Quick meals you can prep in advance, movement in short bursts and a sleep plan around your shifts.",
    sessions: "Regular check-ins", combine: "Nutrition counselling" },
  { v: "emotional", label: "Stress or emotional eating", img: CONSULT, title: "Mind &amp; Food Plan",
    text: "Eating to cope with stress, boredom or sadness is common. We help you spot triggers and find other ways to cope.",
    regular: "Spot your triggers, plan regular meals and build a daily wind-down habit.", shift: "Plan meals around your shifts to avoid long gaps, which often lead to bingeing.",
    sessions: "Regular check-ins", combine: "Medical weight management" },
  { v: "night", label: "Late-night snacking", img: FIT, title: "Evening Reset Plan",
    text: "Night snacking usually comes from skipped meals, tiredness or habit. Fixing the day fixes the night.",
    regular: "A proper breakfast and lunch, a planned evening snack, and a kitchen-closed time.", shift: "A planned meal at the start of your shift and a light snack for the break.",
    sessions: "Regular check-ins", combine: "Nutrition counselling" },
  { v: "stick", label: "I start but never stick with it", img: BEFORE, title: "Consistency Plan",
    text: "Most plans fail because they're too strict. We build small habits first and add more as they become automatic.",
    regular: "One or two changes at a time, with regular check-ins to keep you accountable.", shift: "Simple habits that work on any shift, tracked week by week.",
    sessions: "Regular check-ins", combine: "Body composition tracking" },
  { v: "sleep", label: "Poor sleep and low energy", img: [A + "anti-aging-hero.webp", "Rested Indian woman", 1716, 1144], title: "Sleep &amp; Energy Plan",
    text: "Better sleep improves hunger, cravings, mood and energy. It's often the first habit we fix.",
    regular: "A fixed bedtime, a screen-free wind-down and less caffeine after 2 pm.", shift: "Protect your main sleep block with a dark, quiet room, and plan short naps.",
    sessions: "Regular check-ins", combine: "Medical review if needed" },
  { v: "desk", label: "Desk job, sitting all day", img: DESK, title: "Active Workday Plan",
    text: "Sitting for long hours slows your metabolism. Small movement breaks make a real difference.",
    regular: "Hourly movement breaks, walking calls, stairs and a short evening walk.", shift: "Stretch breaks during your shift and short walks before or after work.",
    sessions: "Regular check-ins", combine: "Body composition tracking" },
];

const faqs = [
  ["What is lifestyle coaching?", "Lifestyle coaching helps you change the daily habits behind your weight and health: sleep, movement, eating patterns, stress and routine. Your coach works with you over time to build small, realistic changes that last."],
  ["How is lifestyle coaching different from a diet plan?", "A diet plan tells you what to eat. Lifestyle coaching looks at why, when and how you eat, plus sleep, stress and activity. It focuses on habits you can keep, not short-term rules."],
  ["Who is lifestyle coaching for?", "Anyone who wants to lose weight, manage PCOS, thyroid or diabetes, sleep better, have more energy or simply build healthier habits, especially if past diets haven't lasted."],
  ["Do I need to join a gym?", "No. We start with movement that fits your day, like walking, stairs and simple home exercises. If you enjoy the gym, we'll include it."],
  ["Will I have to give up rice and Kerala food?", "No. We work with the food you love, adjusting portions and balance so you can enjoy your meals and still reach your goals."],
  ["How long does lifestyle coaching take?", "Most people see real habit changes within 8 to 12 weeks. Lasting change takes a few months, and we're with you throughout."],
  ["How often will I meet my coach?", "After your first assessment, you'll have regular follow-ups. How often depends on your plan and needs. Your coach will agree a schedule with you."],
  ["Can lifestyle coaching help with PCOS or diabetes?", "Yes. Sleep, activity, stress and eating habits strongly affect PCOS, blood sugar and insulin resistance. Coaching works alongside your medical treatment."],
  ["Does it help with stress and emotional eating?", "Yes. We help you notice your triggers and find other ways to cope, so food isn't your only comfort."],
  ["Will I lose weight with lifestyle coaching alone?", "Many people do, especially when the main problems are habits. If you need more support, we combine coaching with nutrition counselling or medical weight management."],
  ["Can I do it if I work shifts?", "Yes. We build your plan around your shifts, with meal timing, sleep and movement that fit your schedule."],
  ["Where can I get lifestyle coaching in Kerala?", "Facelit offers lifestyle coaching as part of our weight management services at our clinics in Trivandrum, Karunagappally (Kollam) and Guruvayur (Thrissur)."],
];

const qid = (i) => `lq${i}`;
const quizHtml = `
<div class="lc-quiz" data-lcquiz>
 <ol class="lc-qs">
 ${quiz.map(([key, q, opts], i) => `<li><fieldset data-pillar="${key}"><legend><span>${i + 1}</span>${q}</legend><div class="lc-opts">${opts.map((o, s) => `<label><input type="radio" name="${qid(i)}" value="${s}"><span>${o}</span></label>`).join("")}</div></fieldset></li>`).join("")}
 </ol>
 <div class="lc-out" aria-live="polite">
 <small>Your lifestyle score</small>
 <b data-score>Answer the questions</b>
 <div class="lc-meter" aria-hidden="true"><i data-meter></i></div>
 <p data-msg>Tap one answer for each question to see your score and what to work on first.</p>
 <div data-focus class="lc-focus"></div>
 <a href="/appointment/" class="btn-3d-forest btn-press inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium">Talk to a coach</a>
 </div>
</div>`;

const pageCss = `<style>
.lc-quiz{display:grid;gap:1.25rem}.lc-quiz>*{min-width:0}@media(min-width:900px){.lc-quiz{grid-template-columns:minmax(0,1.3fr) minmax(0,.7fr);align-items:start}}
.lc-qs{list-style:none;margin:0;padding:0;display:grid;gap:.75rem}
.lc-qs fieldset{border:1px solid rgba(58,77,57,.12);border-radius:1.1rem;background:#fff;padding:1rem;margin:0}
.lc-qs legend{display:flex;gap:.6rem;align-items:flex-start;font:500 .97rem/1.4 Onest,sans-serif;color:#2d3c2d;padding:0;float:left;width:100%;margin-bottom:.75rem}
.lc-qs legend span{flex:none;width:24px;height:24px;border-radius:50%;background:#e9d3b8;color:#2d3c2d;font-size:.75rem;display:grid;place-items:center}
.lc-opts{clear:both;display:flex;flex-wrap:wrap;gap:.45rem}
.lc-opts label{cursor:pointer}
.lc-opts input{position:absolute;opacity:0;pointer-events:none}
.lc-opts span{display:inline-block;padding:.5rem .9rem;border-radius:999px;border:1px solid rgba(58,77,57,.18);font-size:.88rem;color:#2d3c2d;background:#fdf7ef}
.lc-opts input:checked+span{background:#3a4d39;color:#fdf7ef;border-color:#3a4d39}
.lc-opts input:focus-visible+span{outline:2px solid #3a4d39;outline-offset:2px}
.lc-out{background:linear-gradient(160deg,#3a4d39,#2d3c2d);color:#fdf7ef;border-radius:1.25rem;padding:1.4rem}
@media(min-width:900px){.lc-out{position:sticky;top:7rem}}
.lc-out small{display:block;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;opacity:.7}
.lc-out b{display:block;font-size:1.7rem;margin:.35rem 0 .6rem;font-weight:500;line-height:1.2}
.lc-meter{height:10px;border-radius:99px;background:rgba(253,247,239,.18);overflow:hidden;margin-bottom:.9rem}.lc-meter i{display:block;height:100%;width:0;background:linear-gradient(90deg,#e9d3b8,#c4945f);border-radius:99px;transition:width .3s}
.lc-out p{font-size:.92rem;opacity:.92;margin:0 0 .75rem;line-height:1.5}
.lc-focus{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1rem}.lc-focus span{padding:.35rem .75rem;border-radius:999px;background:rgba(253,247,239,.14);font-size:.82rem}
.lc-out .btn-3d-forest{background:#fdf7ef;color:#2d3c2d}
.lc-day{list-style:none;margin:0;padding:0;display:grid;gap:.75rem}@media(min-width:760px){.lc-day{grid-template-columns:repeat(3,minmax(0,1fr))}}
.lc-day li{background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.1rem;padding:1rem 1.1rem}
.lc-day b{display:inline-block;font:600 .75rem Onest,sans-serif;letter-spacing:.08em;color:#986a3e;background:#f3efe4;border-radius:999px;padding:.2rem .6rem}
.lc-day h3{margin:.5rem 0 .3rem;font-size:1.15rem;color:#2d3c2d}.lc-day p{margin:0;font-size:.9rem;line-height:1.5;color:#5c574f}
</style>`;

const pageJs = `<script>(function(){
var q=document.querySelector('[data-lcquiz]');if(!q)return;var names=${JSON.stringify(pillarName)};
var sc=q.querySelector('[data-score]'),me=q.querySelector('[data-meter]'),ms=q.querySelector('[data-msg]'),fo=q.querySelector('[data-focus]'),sets=[].slice.call(q.querySelectorAll('fieldset'));
q.addEventListener('change',function(){var tot=0,n=0,low=[];sets.forEach(function(f){var c=f.querySelector('input:checked');if(c){n++;var v=+c.value;tot+=v;if(v<2)low.push([v,f.dataset.pillar])}});
me.style.width=(tot/12*100)+'%';
if(n<sets.length){sc.textContent=tot+' / 12 so far';ms.textContent=(sets.length-n)+' more to go.';}
else{sc.textContent=tot+' / 12';ms.textContent=tot>=10?'Great habits! Coaching can help you fine-tune and reach specific goals.':tot>=6?'A good base, with a few habits holding you back. Small changes here will make a big difference.':'Your daily habits are making things harder for your body. The good news: this is exactly what coaching fixes.';}
low.sort(function(a,b){return a[0]-b[0]});fo.innerHTML=low.slice(0,2).map(function(l){return '<span>Focus: '+names[l[1]]+'</span>'}).join('');
});
})();</script>`;

const sections = [
  k.hero({
    tags: ["Weight management", "Habits that last", "Coach-led"], h1: "Lifestyle Coaching",
    img: HERO, pos: "62% 30%",
    intro: "Tried every diet, only to slip back into old habits? Lifestyle coaching works on the everyday things that really drive your weight and health: sleep, movement, eating patterns, stress and routine. Your coach helps you make small, realistic changes that fit your life in Kerala, and stays with you until they become second nature.",
    facts: [["5", "Pillars of health"], ["8–12 weeks", "To build habits"], ["No", "Crash diets"], ["1-to-1", "Support"]],
    cta2: ["#score", "Check your lifestyle score"],
  }),
  k.jump([["overview", "Overview"], ["score", "Lifestyle score"], ["pillars", "5 pillars"], ["day", "A healthy day"], ["finder", "Find your plan"], ["how", "How it works"], ["results", "Results"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Overview</p>
 <h2 class="cp-h2 font-serif">What is Lifestyle Coaching?</h2>
 <div class="cp-prose">
 <p>Most weight and health problems aren't caused by one big mistake. They're the result of small daily habits: late nights, skipped breakfasts, long hours at a desk, evening snacks, stress that never switches off. Diets try to fix the food and ignore the rest, which is why the weight so often comes back.</p>
 <p>Lifestyle coaching looks at the whole picture. Your coach gets to know your routine, work, family and food, finds the habits that are holding you back, and helps you change them one step at a time. There are no strict rules and no guilt, just practical changes that feel normal within a few weeks.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why habits beat willpower ${k.plus}</summary>
 <div class="cp-prose">
 <p>Willpower runs out, especially after a long day. Habits don't need it. Once something becomes automatic, like a walk after dinner or a set bedtime, you do it without thinking.</p>
 <p>That's why coaching focuses on a few small changes at a time, with regular check-ins to keep you on track. Small wins build confidence, and confidence builds the next habit.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How lifestyle coaching works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Understand</b><span>Your coach learns your routine, challenges and goals.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Change</b><span>One or two small, realistic habits at a time.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Keep</b><span>Regular check-ins until the new habits feel natural.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...CONSULT)}
 ${img(...FIT)}
 </div>
 </div>`),

  shell("score", `${head("Quick self-check", "What's Your Lifestyle Score?", "Six quick questions. Tap one answer each to see your score and the two habits to work on first.")}${quizHtml}`),

  shell("pillars", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("The 5 pillars", "What Your Coach Works On", "Tap a pillar, then open the questions for practical tips you can start today.")}
 ${tabs("pillars", pillars)}
 </div>
 <div class="cp-split-sep">
 ${head("Signs you need it", "Does This Sound Like You?", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["\"I lose weight, then put it back on.\"", "Yo-yo dieting is a sign the habits underneath haven't changed. Coaching fixes the habits, so the results last."],
   ["\"I'm tired all the time.\"", "Poor sleep, long gaps between meals and too little movement are common causes. Small changes can lift your energy within weeks."],
   ["\"I eat well, but snack at night.\"", "Usually a sign of skipped meals, tiredness or stress. We fix the day so the evenings get easier."],
   ["\"I know what to do, I just don't do it.\"", "You're not lazy. You need a plan that fits real life and someone to keep you accountable."],
   ["\"My doctor said I need to change my lifestyle.\"", "For PCOS, prediabetes, high blood pressure or fatty liver, coaching turns that advice into a clear, doable plan."],
 ], false)}</div>
 </div>
 </div>`),

  shell("day", `${head("A healthy day", "What a Healthy Day Can Look Like", "A simple, Kerala-friendly example. Your coach adjusts it to your work, family and food.")}
 <ol class="lc-day">${dayPlan.map(([t, h, p]) => `<li><b>${t}</b><h3 class="font-serif">${h}</h3><p>${p}</p></li>`).join("")}</ol>`),

  shell("finder", `${head("Find your plan", "What's Your Biggest Challenge?", "Answer two quick questions to see how your coach would start.")}
 ${k.finder({ q1: "What gets in your way most?", q2: { label: "What's your work schedule like?", dt: "Where we'd start", options: [["regular", "Regular day hours"], ["shift", "Shifts or irregular hours"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of Lifestyle Coaching", "Changes you feel in your energy, sleep and body, that last long after the programme.")}${k.benefitsGrid(benefits)}`),

  shell("how", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">How it works</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Your Lifestyle Coaching Journey</h2>
 ${k.processTabs([
   { tab: "01 · Assess", img: CONSULT, lead: "We start by understanding your life.",
     items: ["A detailed chat about your routine, work, sleep, food and stress.", "A body composition analysis to see your fat, muscle and visceral fat.", "A look at any health conditions or blood test results.", "Clear, realistic goals that matter to you."] },
   { tab: "02 · Plan", img: DESK, lead: "A plan built around your real day.",
     items: ["One or two habits to start with, not a long list of rules.", "Meal timing, portions and swaps using foods you already eat.", "Movement that fits your schedule.", "A sleep and stress routine you can actually follow."] },
   { tab: "03 · Support", img: AFTER, lead: "We stay with you until it sticks.",
     items: ["Regular check-ins to review progress and solve problems.", "New habits added as the first ones become automatic.", "Plans adjusted for festivals, travel and busy weeks.", "Body composition retests to track real change."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "What Changes, and When", "Lifestyle change is gradual, but you'll feel it before you see it.")}
 ${k.timeline([["Weeks 1–2", "Feel better", "Better sleep, steadier energy and fewer cravings."], ["Weeks 3–6", "Habits settle", "New routines feel easier, and clothes start to fit differently."], ["Weeks 8–12", "See the change", "Steady fat loss, better body composition and improving health numbers."], ["3 months +", "A new normal", "Habits feel automatic, so results are easier to keep."]])}
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
 <div>${head("Myths vs facts", "Lifestyle Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"You have to give up rice to lose weight.\"", "Portion size and what you eat with your rice matter more than cutting it out completely."],
   ["\"Skipping meals helps you lose weight.\"", "Skipping meals usually leads to overeating later. Regular meals keep hunger and cravings steady."],
   ["\"You need an hour at the gym every day.\"", "Daily walking and a few short strength sessions a week are enough to make a real difference."],
   ["\"Sleep has nothing to do with weight.\"", "Poor sleep raises hunger hormones and cravings. It's one of the biggest hidden causes of weight gain."],
   ["\"It's all about willpower.\"", "Habits and environment matter far more. Make the healthy choice the easy choice."],
 ], false)}</div></div>
 <div class="cp-split-sep">${head("Is it right for you?", "Who Lifestyle Coaching Helps", "")}
 ${list(["People who've tried many diets without lasting results", "Anyone with PCOS, thyroid problems, prediabetes or diabetes", "People with high blood pressure, cholesterol or fatty liver", "Busy professionals, students and parents", "Shift workers and people with irregular routines", "Anyone wanting more energy, better sleep and less stress"])}
 <div class="cp-card" style="margin-top:1.25rem"><h3 class="font-serif">Works well with</h3>${list(["Nutrition counselling", "Medical weight management", "Body composition analysis"])}</div>
 </div>
 </div>`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Lifestyle Coaching?</h2>
 ${img("/wp-content/uploads/2026/07/devi.webp", "Dr. Devi KR, Facelit", 1143, 1376, "cp-img cp-img--wide cp-img--doc")}
 </div>
 ${k.whyList([
   ["Part of a medical team", "Your coach works alongside our doctors and nutrition specialists, so health conditions are taken into account."],
   ["Made for Kerala life", "Plans built around Kerala food, family life, festivals, heat and monsoon."],
   ["Progress you can measure", "Body composition tests show real changes in fat and muscle, not just weight."],
   ["No judgement", "Honest, friendly support, whatever your starting point."],
   ["Small steps, real results", "We focus on a few habits at a time, so change feels doable."],
 ])}
 </div>`),

  shell("faq", `${head("Questions", "Lifestyle Coaching FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Next steps", "Lifestyle Coaching Works Best With", "")}
 ${k.links([["/nutrition-counselling/", "Programme", "Nutrition counselling"], ["/medical-weight-management/", "Programme", "Medical weight management"], ["/body-composition-analysis/", "Test", "Body composition analysis"], ["/obesity-and-weight-management/", "Overview", "Obesity and weight management"]])}`),

  k.cta("Ready to build habits that finally stick?", "Book a consultation. We'll understand your routine and help you take the first small step this week."),
];

sections[3] = sections[3].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Lifestyle Coaching in Kerala for Weight Loss & Healthy Habits | Facelit",
  desc: "Lifestyle coaching at Facelit, Trivandrum, Kollam & Thrissur. Build lasting habits around sleep, movement, eating, stress and routine for weight loss, PCOS, diabetes and energy.",
  image: "https://facelit.in/wp-content/uploads/2026/08/obesity-weight-management-hero.webp",
  faqs,
  procedure: { name: "Lifestyle Coaching", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Whole body",
    howPerformed: "One-to-one coaching focused on sleep, physical activity, eating habits, stress management and daily routine, with goal setting and regular follow-ups.",
    preparation: "An initial assessment of routine, health history and goals, often with a body composition analysis.",
    followup: "Regular check-ins to review progress, adjust the plan and add new habits, with periodic body composition retests." },
  crumbs: [["Home", "https://facelit.in/"], ["Weight management", "https://facelit.in/obesity-and-weight-management/"], ["Lifestyle Coaching", "https://facelit.in/lifestyle-coaching/"]],
});
