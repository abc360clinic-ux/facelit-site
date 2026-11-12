// Builds the redesigned /cm-slim/ page.
// Usage (from facelit-site/): node scripts/cm-slim/build.mjs content/pages/cm-slim.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";

// Claims kept in one place so they're easy to change once confirmed with the supplier.
const FDA = "US FDA-cleared";
const CE = "CE-certified";

const HERO = [A + "obesity-weight-management-hero.webp", "Fit, smiling Indian woman after CM Slim body sculpting at Facelit"];
const MACHINE = "/wp-content/uploads/2026/11/cm-slim-machine.webp";
const BEFORE = [A + "obesity-before-scaled-1.webp", "Indian woman with stubborn tummy fat before body sculpting", 1920, 2560];
const AFTER = [A + "obesity-after-scaled-1.webp", "Indian woman with a firmer, more toned midsection after body sculpting", 1920, 2560];

// Body map: [tab, x%, y%, title, text, bullets, sessions]
const areas = [
  ["Arms", 21, 37, "Arms (biceps and triceps)", "Firms and defines the upper arms. Helpful for loose, soft-looking triceps (\"bingo wings\") and for adding shape to the biceps.", ["Firmer, more defined arms", "Less soft, loose look", "Stronger muscles"], "4, over 2 weeks"],
  ["Abdomen", 50, 41, "Abdomen and core", "The most popular area. Strengthens and tightens the abdominal muscles while reducing the fat layer on top, for a flatter, firmer tummy. Also helps rebuild core strength after pregnancy.", ["Flatter, firmer tummy", "Stronger core", "Helps after pregnancy"], "4, over 2 weeks"],
  ["Buttocks", 63, 55, "Buttocks (non-surgical lift)", "Works the gluteal muscles to lift, round and firm the buttocks. A popular non-surgical alternative to a \"butt lift\".", ["Lifted, rounder shape", "Firmer muscles", "No surgery or fillers"], "4, over 2 weeks"],
  ["Thighs", 40, 68, "Thighs", "Tones the front and back of the thighs, improving firmness and shape and reducing the fat layer.", ["Firmer, toned thighs", "Better shape", "Stronger legs"], "4, over 2 weeks"],
  ["Calves", 60, 87, "Calves", "Adds definition and shape to the calves for more toned-looking lower legs.", ["Shapelier calves", "Better muscle tone"], "4, over 2 weeks"],
];

const benefits = [
  ["lift", "Builds Muscle", "Thousands of powerful contractions in one session strengthen and thicken the muscle."],
  ["layers", "Reduces Stubborn Fat", "The intense muscle work triggers nearby fat cells to break down."],
  ["spark", "Two Results in One", "Tones muscle and reduces fat at the same time, for a more sculpted shape."],
  ["clock", "30-Minute Sessions", "Lie down, relax and let the machine do the workout."],
  ["heal", "No Downtime", "No needles, no surgery, no recovery. Go straight back to your day."],
  ["shield", "Non-Invasive", "Works through clothing-free skin with flat applicators. Nothing breaks the skin."],
  ["drop", "Core Strength", "Helps rebuild the core after pregnancy and supports better posture."],
  ["clock", "Quick Course", "Just 4 sessions over about 2 weeks, with results building over the next 2 to 3 months."],
];

const finderResults = [
  { v: "tummy", label: "A flatter, firmer tummy", img: BEFORE, title: "Flat Tummy Plan",
    text: "CM Slim tightens the abdominal muscles and reduces the fat layer on top, for a flatter, firmer midsection.",
    no: "4 abdomen sessions over 2 weeks. A balanced diet and daily walking help the fat reduction last.", yes: "4 abdomen sessions to break through a plateau and add definition your workouts haven't reached.",
    sessions: "4, over 2 weeks", combine: "Diet advice, maintenance session" },
  { v: "glutes", label: "Lift my buttocks", img: AFTER, title: "Butt Lift Plan",
    text: "CM Slim works the gluteal muscles far harder than squats, lifting and rounding the buttocks without surgery.",
    no: "4 buttock sessions over 2 weeks, plus simple home exercises.", yes: "4 buttock sessions to build shape faster alongside your training.",
    sessions: "4, over 2 weeks", combine: "Thighs in the same course" },
  { v: "arms", label: "Tone my arms", img: HERO.concat([1769, 1180]), title: "Toned Arms Plan",
    text: "CM Slim firms the biceps and triceps, improving soft, loose-looking upper arms.",
    no: "4 arm sessions over 2 weeks.", yes: "4 arm sessions for extra definition alongside your training.",
    sessions: "4, over 2 weeks", combine: "Abdomen in the same course" },
  { v: "thighs", label: "Firm my thighs", img: AFTER, title: "Firm Thighs Plan",
    text: "CM Slim tones the thigh muscles and reduces the fat layer, for firmer, better-shaped legs.",
    no: "4 thigh sessions over 2 weeks.", yes: "4 thigh sessions to add shape your training hasn't reached.",
    sessions: "4, over 2 weeks", combine: "Buttocks in the same course" },
  { v: "postpartum", label: "Core after pregnancy", img: HERO.concat([1769, 1180]), title: "Post-Pregnancy Core Plan",
    text: "Pregnancy stretches and weakens the core. CM Slim helps rebuild abdominal strength and tone, once your doctor confirms you've healed.",
    no: "4 abdomen sessions, started after your doctor's go-ahead (usually from 6 months after delivery, or later after a C-section).", yes: "4 abdomen sessions to boost your return to exercise.",
    sessions: "4, over 2 weeks", combine: "Doctor clearance first" },
  { v: "plateau", label: "Stuck despite gym and diet", img: BEFORE, title: "Break the Plateau Plan",
    text: "Some fat and softness won't shift however hard you train. CM Slim adds the extra muscle work and fat reduction to get you past it.",
    no: "4 sessions on your most stubborn area, plus simple diet changes.", yes: "4 sessions on your most stubborn area for faster definition.",
    sessions: "4, over 2 weeks", combine: "Maintenance every 3 months" },
];

const fitCards = [
  ["Toning", 1, "You're close to your ideal weight but want firmer, more defined muscles.", "soft tummy, arms, glutes", "none", "4 sessions"],
  ["Sculpting", 2, "You have a small layer of stubborn fat over the muscle that won't shift with diet and exercise.", "stubborn belly, thighs", "none", "4 sessions + maintenance"],
  ["Not a weight-loss treatment", 3, "CM Slim shapes the body but doesn't replace weight loss. If you have a lot of weight to lose, we'll start with a medical weight plan.", "best with BMI under about 30", "none", "your doctor will advise"],
];

const menuRows = [
  ["CM Slim · Single Session", "Starter", "tone", "Try CM Slim on one area and feel the difference.", ["One area", "Starter"], "A 30-minute session with the applicators on your chosen area.", "None", "1"],
  ["CM Slim · 4 Sessions", "Recommended", "tone sculpt", "The full course for visible muscle tone and fat reduction.", ["Full course", "Best results"], "Four 30-minute sessions, 2 to 3 days apart, over about 2 weeks.", "None", "4"],
];

const faqs = [
  ["What is CM Slim?", "CM Slim is a non-invasive body sculpting treatment that uses High-Intensity Electromagnetic Technology (HI-EMT). It makes your muscles contract far more strongly than exercise can, which builds muscle and helps reduce the fat on top, all in a 30-minute session with no downtime."],
  ["How does CM Slim work?", "Flat applicators send focused electromagnetic energy through the skin and fat into the muscle. This causes thousands of very strong contractions in one session. The muscle adapts by growing stronger and thicker, and the intense effort triggers nearby fat cells to break down."],
  ["Does CM Slim hurt?", "No. It feels like an intense workout. You'll feel strong muscle contractions, tapping and tightening, but it isn't painful. We start at a low intensity and increase it as you get used to it."],
  ["How many CM Slim sessions do I need?", "The standard course is 4 sessions of 30 minutes, 2 to 3 days apart, over about 2 weeks. Maintenance sessions every few months help keep results."],
  ["When will I see results?", "Many people feel firmer muscles soon after the course. Visible changes build over 2 to 3 months as muscle grows and fat is cleared, with the best results around 3 months after the final session."],
  ["Is CM Slim a weight-loss treatment?", "No. CM Slim shapes and tones areas like the tummy, buttocks, arms and thighs. It works best for people at or near a healthy weight. If you have a lot of weight to lose, our doctors can start you on a medical weight management plan first."],
  ["Can CM Slim replace the gym?", "No, but it can do what the gym struggles to. One session gives more muscle contractions than you could do by choice, and it helps get past stubborn plateaus. Staying active keeps your results."],
  ["Is CM Slim the same as EMS belts?", "No. Home EMS belts use weak electrical pulses on the skin surface. CM Slim uses focused electromagnetic energy that reaches deep muscle, causing far stronger contractions."],
  ["Which areas can CM Slim treat?", "The abdomen, buttocks, thighs, arms (biceps and triceps) and calves."],
  ["Is CM Slim safe?", "Yes, for suitable people. It's non-invasive, doesn't heat or break the skin, and needs no anaesthesia. Mild muscle soreness like after a workout is the most common effect."],
  ["Who should not have CM Slim?", "It isn't suitable for people with a pacemaker or electronic implants, metal implants in or near the area, a copper IUD (for the abdomen), during pregnancy, or soon after surgery. Tell your doctor about any health conditions."],
  ["Can I have CM Slim after a C-section?", "Yes, once your doctor confirms you've fully healed, which is usually several months after delivery. CM Slim can help rebuild core strength."],
  ["How long do CM Slim results last?", "Muscle gains last with regular activity and a maintenance session every few months. Fat reduction lasts if you keep a stable weight."],
  ["Where can I get CM Slim in Kerala?", "Facelit offers CM Slim at our clinic in Trivandrum. Contact us to check availability at our other branches."],
  ["How much does CM Slim cost?", "It depends on the area and number of sessions. The 4-session course gives the best results and value. Book a consultation for a personalised quote."],
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
 ${areas.map(([t, x, y], i) => `<button type="button" class="bx-dot" style="left:${x}%;top:${y}%" data-go="t-areas-${i}" aria-label="${t}">${i + 1}</button>`).join("")}
 </div>
 <p class="cp-note" style="text-align:center">Tap a number to see what CM Slim does there.</p>
</div>`;

const areaTabs = tabs("areas", areas.map(([t, , , title, text, more, sessions], i) => ({ tab: `${i + 1} · ${t}`, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${title}</h3>
 <p class="cp-p">${text}</p>
 ${list(more)}
 <div class="cp-rec"><div><small>Session time</small><b>30 minutes</b></div><div><small>Typical course</small><b>${sessions}</b></div></div>` })));

const pageCss = `<style>
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start}}
.bx-body{position:relative;max-width:230px;margin:0 auto}
.bx-body svg{width:100%;height:auto;display:block}
.bx-dot{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;background:#986a3e;color:#fff;font:600 13px/26px Onest,sans-serif;text-align:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.18);cursor:pointer;transition:transform .15s,background .15s}
.bx-dot:hover,.bx-dot[aria-current=true]{background:#3a4d39;transform:translate(-50%,-50%) scale(1.15)}
.bx-dot:focus-visible{outline:2px solid #3a4d39;outline-offset:2px}
</style>`;

const pageJs = `<script>(function(){
var m=document.querySelector('.bx-map');if(!m)return;var dots=[].slice.call(m.querySelectorAll('.bx-dot'));
function mark(id){dots.forEach(function(d){d.setAttribute('aria-current',d.dataset.go===id)})}
dots.forEach(function(d){d.addEventListener('click',function(){var t=document.getElementById(d.dataset.go);if(t){t.click();mark(d.dataset.go);if(window.innerWidth<900)t.closest('[data-tabs]').scrollIntoView({behavior:'smooth',block:'start'})}})});
document.querySelectorAll('[id^=t-areas-]').forEach(function(t){t.addEventListener('click',function(){mark(t.id)})});mark('t-areas-0');
})();</script>`;

const sections = [
  k.hero({
    tags: ["Body", "HI-EMT", "No downtime"], h1: "CM Slim Body Sculpting",
    img: HERO, pos: "62% 30%",
    intro: "Stubborn belly fat or soft, untoned muscles that won't change despite diet and exercise? CM Slim uses High-Intensity Electromagnetic Technology to give your muscles thousands of powerful contractions in just 30 minutes. That builds muscle and reduces fat at the same time, with no needles, no surgery and no downtime.",
    facts: [["30 min", "Per session"], ["None", "Downtime"], ["4", "Sessions"], ["2–3 months", "Full results"]],
    cta2: ["#body-map", "Explore treatment areas"],
  }),
  k.jump([["overview", "Overview"], ["machine", "The machine"], ["body-map", "Body map"], ["finder", "Find your plan"], ["right-for-you", "Is it for you?"], ["course", "Your course"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is CM Slim?</h2>
 <div class="cp-prose">
 <p>CM Slim is a non-invasive body sculpting treatment that builds muscle and reduces fat at the same time. You lie down while flat applicators are strapped over the area, such as the tummy, buttocks, arms or thighs. The machine then sends focused electromagnetic energy through the skin and fat straight into the muscle.</p>
 <p>This makes the muscle contract far harder and more often than you could ever manage at the gym. These are called <b>supramaximal contractions</b>. The muscle adapts by becoming stronger and thicker, and the intense effort tells nearby fat cells to break down. The result is a firmer, more toned, more sculpted shape.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why it beats crunches and squats ${k.plus}</summary>
 <div class="cp-prose">
 <p>When you exercise, your brain controls how hard your muscles work, and they tire quickly. CM Slim bypasses that, triggering thousands of near-maximum contractions in 30 minutes, with rest pauses built in.</p>
 <p>Studies on this type of technology report around 15 to 16% more muscle thickness within 1 to 2 months, along with a noticeable reduction in the fat layer over the treated area. It's especially useful for areas that hardly change with exercise, like the lower tummy and the buttocks.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How CM Slim works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Contract</b><span>Electromagnetic pulses trigger thousands of powerful muscle contractions.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Build</b><span>Muscle fibres grow thicker and stronger as they recover.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Burn</b><span>The energy demand makes nearby fat cells break down over the following weeks.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...BEFORE)}
 ${img(...AFTER)}
 </div>
 </div>`),

  shell("machine", `
 ${k.machine({ imgSrc: MACHINE, imgAlt: "CM Slim HI-EMT body sculpting machine at Facelit, Trivandrum", w: 310, h: 588, badge: FDA,
   name: "CM Slim HI-EMT Body Sculpting Machine", text: "CM Slim is a globally recognised body sculpting system using High-Intensity Electromagnetic Technology. Its focused field passes through skin and fat to reach the muscle directly, delivering the most intensive continuous contractions for muscle growth and fat reduction.",
   tags: [FDA, CE, "HI-EMT technology", "Non-invasive"],
   specs: [["HI-EMT", "High-intensity electromagnetic energy"], ["Thousands", "Of contractions per session"], ["Twin applicators", "Treat both sides at once"], ["30 min", "Per area, no downtime"]],
   link: ["/cm-slim-hipex-chair/", "See the CM Slim &amp; Hipex Chair equipment"] })}
 <h3 class="cp-h3 font-serif" style="margin-top:2.5rem">What happens in your body</h3>
 ${tabs("inside", [
   { tab: "Muscle", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">The intense contractions push the muscle beyond its normal limits. It responds by building new fibres and growing thicker and stronger, just like after very hard training.</p>${list(["Firmer, more defined muscle", "Stronger core and glutes", "Better posture and support"])}</div><div class="cp-meta"><div><b>Shows:</b> from 2–4 weeks</div></div></div>` },
   { tab: "Fat", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">The working muscle needs a lot of energy. This triggers fat cells in the area to release and break down their stored fat, which the body clears naturally.</p>${list(["A thinner fat layer over the muscle", "Helps with stubborn pockets", "Cleared gradually over weeks"])}</div><div class="cp-meta"><div><b>Shows:</b> over 1–3 months</div></div></div>` },
   { tab: "Shape", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">More muscle and less fat on top together give a tighter, more sculpted contour. It's a flatter tummy, lifted buttocks or firmer arms, not just a smaller size.</p>${list(["More sculpted contour", "Tighter-looking skin over toned muscle", "Clothes fit better"])}</div><div class="cp-meta"><div><b>Best at:</b> about 3 months after the course</div></div></div>` },
 ])}`),

  shell("body-map", `${head("Treatment areas", "Where Can CM Slim Help? Tap the Body Map", "Tap a number, or pick an area from the list, to see what CM Slim does there.")}
 <div class="bx-wrap">${body}<div>${areaTabs}</div></div>`),

  shell("finder", `${head("Find your plan", "Which CM Slim Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan at your consultation.")}
 ${k.finder({ q1: "What's your main goal?", q2: { label: "Do you exercise regularly?", dt: "Our suggestion", options: [["no", "Not really"], ["yes", "Yes, 3 or more times a week"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of CM Slim", "Muscle building and fat reduction in one quick, comfortable treatment.")}${k.benefitsGrid(benefits)}`),

  shell("right-for-you", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Is it right for you?", "Who Gets the Best Results?", "CM Slim is a body sculpting treatment, not a weight-loss treatment. Here's where it works best.")}
 ${k.depthCards(fitCards)}
 </div>
 <div class="cp-split-sep">${head("Common questions", "Before You Book", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["I go to the gym. Will it still help?", "Yes. Many regular gym-goers use CM Slim to break through plateaus and add definition to stubborn areas like the lower tummy and glutes."],
   ["I don't exercise. Will it work?", "Yes. You'll still build muscle and reduce fat, and simple daily activity helps your results last longer."],
   ["I've had a baby. Can it help my tummy?", "Yes. CM Slim helps rebuild weak core muscles after pregnancy. Start once your doctor confirms you've healed, especially after a C-section."],
   ["Can men have CM Slim?", "Yes. Men often use it for abs, arms and a firmer chest-to-waist shape."],
   ["Does it tighten loose skin?", "It firms the muscle under the skin, which helps the area look tighter. Very loose skin may need extra skin-tightening treatment."],
 ])}</div></div>
 </div>`),

  shell("course", `${head("Your course", "How a CM Slim Course Works", "A short course of sessions, with results that keep building after you finish.")}
 ${k.timeline([["Sessions 1–4", "Over 2 weeks", "Four 30-minute sessions, 2 to 3 days apart. You may feel mild muscle soreness, like after a workout."], ["Weeks 2–4", "Feel the change", "Muscles feel firmer and stronger, and your core feels more supported."], ["Months 1–3", "See the change", "Muscle keeps building and the fat layer reduces. Best results show around 3 months."], ["Every 3–6 months", "Maintain", "A single maintenance session, plus staying active, keeps your results."]])}`),

  shell("plans", `${head("Packages", "CM Slim Packages at Facelit", "Try a single session or choose the recommended 4-session course.")}
 ${k.menu([["all", "All"], ["tone", "Toning"], ["sculpt", "Sculpting"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">CM Slim Treatment Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor discussing body goals with a patient", 1151, 768], lead: "A consultation and body assessment come first.",
     items: ["Your doctor discusses your goals, health and any implants or medical devices.", "We check which areas will benefit and take progress photos and measurements.", "Remove metal jewellery and any electronics like phones and watches.", "Wear comfortable clothes. Drink water and eat a light meal before.", "No numbing cream or special preparation is needed."] },
   { tab: "02 · During", img: [MACHINE, "CM Slim machine with its twin applicators", 310, 588], lead: "Each session lasts about 30 minutes per area.",
     items: ["You lie down comfortably, and the applicators are strapped over the area.", "The intensity starts low and is turned up as you get used to it.", "You'll feel strong contractions, tapping and tightening, like an intense workout.", "There are short rest phases built in.", "You can read, chat or relax during the session."] },
   { tab: "03 · After", img: AFTER, lead: "Get up and go straight back to your day.",
     items: ["No downtime and no marks on the skin.", "Mild muscle soreness for a day or two is normal.", "Drink plenty of water and eat enough protein to help muscle build.", "Stay active with walking or your normal workouts.", "Book your next session 2 to 3 days later."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "What Results Can You Expect?", "CM Slim shapes your body gradually as muscle builds and fat is cleared.")}
 <div class="cp-two cp-two--tight">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Are at or near a healthy weight", "Have stubborn fat that diet and exercise don't shift", "Want a firmer tummy, buttocks, arms or thighs", "Want to rebuild core strength after pregnancy"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not suitable if you</h3>${list(["Have a pacemaker or electronic implant", "Have metal implants in or near the area", "Are pregnant", "Have a lot of weight to lose (start with a weight plan)"], warn)}</div>
 </div>
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary with the area, your body and your lifestyle.</p>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "Get the Most from CM Slim", "Simple habits that help muscle build and fat stay off.")}${tabs("aftercare", [
   { tab: "After each session", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Drink plenty of water", "Eat a protein-rich meal", "Gentle stretching or a walk", "Get a good night's sleep"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Heavy, salty or sugary meals", "Alcohol on the day", "Worrying about mild soreness. It's normal"], warn)}</div></div>` },
   { tab: "During the course", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Keep sessions 2 to 3 days apart", "Stay active every day", "Eat balanced meals with enough protein", "Track progress with photos"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Crash dieting (muscle needs fuel)", "Skipping sessions", "Big weight swings"], warn)}</div></div>` },
   { tab: "Long term", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Keep up</h3>${list(["Regular exercise", "Stable, healthy weight", "A maintenance session every 3 to 6 months"])}</div><div class="cp-card"><h3 class="font-serif">Remember</h3>${list(["Results build for up to 3 months", "Muscle stays strong with use", "Fat reduction lasts with a stable weight"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "CM Slim Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"It's just an expensive EMS belt.\"", "EMS belts use weak surface pulses. CM Slim's electromagnetic field reaches deep muscle for far stronger contractions."],
   ["\"It's a weight-loss machine.\"", "CM Slim sculpts and tones specific areas. It isn't designed for overall weight loss."],
   ["\"It's painful.\"", "It feels intense, like a hard workout, but not painful. The intensity is adjusted to your comfort."],
   ["\"You don't need to do anything else.\"", "Results last best with regular activity and balanced eating."],
   ["\"Results show after one session.\"", "Muscle and fat change gradually. The best results show around 3 months after the course."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare", "CM Slim vs Gym Workouts vs EMS Belts", "Why CM Slim gets results where other methods stall.")}
 ${k.compareTable(["CM Slim", "Gym workouts", "Home EMS belts"], [
   ["How it works", "Focused electromagnetic energy into deep muscle", "Muscles you contract yourself", "Weak electrical pulses on the skin"],
   ["Contraction strength", "Near-maximum, thousands per session", "Limited by tiredness", "Weak"],
   ["Builds muscle", "Yes", "Yes, with time", "Very little"],
   ["Reduces fat in the area", "Yes", "Not in one specific area", "No"],
   ["Time", "30 min per area", "Hours per week", "Varies"],
   ["Supervised by doctors", "Yes", "No", "No"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for CM Slim?</h2>
 ${img(A + "eco-doctor-devi.webp", "Facelit doctor", 672, 891, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Advanced HI-EMT technology", "We use the CM Slim system, one of the most intensive electromagnetic body sculpting devices available."],
   ["Doctor-led assessment", "We check that CM Slim suits your body and health, and tell you honestly if another approach would work better."],
   ["Visible results", "Studies on this technology report around 15 to 16% more muscle thickness within 1 to 2 months."],
   ["Progress tracking", "Photos and measurements before and after your course, so you can see the change."],
   ["Safe and comfortable", "Sessions are supervised and the intensity is set to your comfort."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Side Effects and Who Should Avoid CM Slim", "CM Slim is non-invasive and very well tolerated. Here's what's normal and who shouldn't have it.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Mild muscle soreness for 1 to 2 days, like after a workout", "Slight warmth or redness on the skin for a short while", "Tired-feeling muscles after the session"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not suitable if you have</h3>${list(["A pacemaker, defibrillator or other electronic implant", "Metal implants, plates or screws in or near the area", "A copper IUD (for abdomen treatment)", "Pregnancy, or recent surgery or delivery in the area", "A hernia, or certain heart or nerve conditions"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "CM Slim FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "CM Slim at Facelit", "")}
 ${k.links([["/best-cm-slim-body-sculpting-treatment-in-trivandrum/", "Location", "CM Slim body sculpting in Trivandrum"], ["/cm-slim-hipex-chair/", "Equipment", "CM Slim &amp; Hipex Chair"], ["/body-contouring/", "Treatment", "Body contouring"]])}`),

  k.cta("Ready to sculpt the areas the gym can't reach?", "Book a consultation. Our doctors will assess your goals and tell you honestly whether CM Slim is right for you."),
];

sections[4] = sections[4].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "CM Slim in Trivandrum | Burn Fat & Build Muscle, No Downtime | Facelit",
  desc: "CM Slim HI-EMT body sculpting at Facelit, Trivandrum. Builds muscle and reduces stubborn fat on the tummy, buttocks, arms and thighs in 30-minute sessions with no downtime.",
  image: "https://facelit.in/wp-content/uploads/2026/08/obesity-weight-management-hero.webp",
  faqs,
  procedure: { name: "CM Slim HI-EMT Body Sculpting", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Abdomen, buttocks, thighs, arms and calves",
    howPerformed: "Flat applicators deliver high-intensity electromagnetic energy through the skin and fat into the muscle, causing thousands of supramaximal contractions in a 30-minute session.",
    preparation: "Doctor consultation and screening for implants and medical devices, removal of metal and electronics, comfortable clothing and a light meal.",
    followup: "No downtime. Hydration, protein-rich meals and regular activity. Four sessions 2 to 3 days apart, then maintenance every 3 to 6 months." },
  crumbs: [["Home", "https://facelit.in/"], ["Body", "https://facelit.in/body-contouring/"], ["CM Slim", "https://facelit.in/cm-slim/"]],
});
