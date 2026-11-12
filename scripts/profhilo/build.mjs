// Builds the redesigned /profhilo-treatment/ page.
// Usage (from facelit-site/): node scripts/profhilo/build.mjs content/pages/profhilo-treatment.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const HERO = [A + "skin-hero-1.webp", "Smiling Indian woman with firm, hydrated, glowing skin after Profhilo"];
const INJECT = [A + "NCTF-Treatment.webp", "Doctor giving a Profhilo injection to a woman at Facelit", 1080, 1080];
const BEFORE = [A + "anti-aging-before-scaled-1.webp", "Indian woman with dull skin and fine lines before Profhilo", 1920, 2560];
const AFTER = [A + "anti-aging-after-scaled-1.webp", "Indian woman with smoother, firmer, glowing skin after Profhilo", 1920, 2560];

// The 5 injection points used on each side of the face: [name, left dot x%, y%, what it does]
const points = [
  ["Cheekbone", 30, 47, "Placed just below the outer corner of the eye, on the cheekbone. Hydrates and firms the upper cheek and the skin under the eyes."],
  ["Beside the nose", 41, 58, "Placed near the base of the nose. Supports the mid-face and softens the start of the smile lines."],
  ["In front of the ear", 17, 47, "Placed just in front of the ear. Improves crepey skin on the side of the face and supports the cheek."],
  ["Chin", 41, 79, "Placed on either side of the chin. Hydrates the lower face and smooths lines around the mouth."],
  ["Jaw angle", 23, 69, "Placed at the angle of the jaw. Firms the lower face and helps the jawline look smoother."],
];

const benefits = [
  ["drop", "Deep Hydration", "One of the most concentrated HA treatments available, hydrating skin from within."],
  ["lift", "Firmer, Tighter Skin", "Stimulates collagen and elastin, so loose or crepey skin looks firmer."],
  ["wave", "Smoother Fine Lines", "Softens fine lines and crepey texture across the face and neck."],
  ["spark", "Natural Glow", "Brighter, bouncier, more radiant skin, without changing your features."],
  ["layers", "Not a Filler", "Spreads under the skin instead of adding shape, so you look fresher, not different."],
  ["clock", "Only 10 Injections", "A quick 15 to 30 minute treatment with just 5 points on each side."],
  ["heal", "Little Downtime", "Small bumps settle within a day. Most people go back to work straight away."],
  ["leaf", "Face, Neck &amp; Hands", "Works on the neck, chest, hands and body as well as the face."],
];

const finderResults = [
  { v: "dull", label: "Dull, tired skin", img: [A + "anti-aging-hero.webp", "Indian woman with glowing, hydrated skin", 1716, 1144], title: "Glow Restore Plan",
    text: "Profhilo floods the skin with hydration and kick-starts collagen, so dull, tired skin looks brighter and bouncier within weeks.",
    young: "The standard 2-session course, 4 weeks apart, then once or twice a year.", mature: "The 2-session course, with a third session if your skin needs extra support.",
    sessions: "2, 4 weeks apart", combine: "HydraFacial, chemical peels" },
  { v: "laxity", label: "Loose or sagging skin", img: AFTER, title: "Firm &amp; Lift Plan",
    text: "Profhilo improves skin laxity by boosting collagen and elastin. It firms the skin itself rather than adding volume.",
    young: "2 Profhilo sessions to strengthen the skin before laxity sets in.", mature: "2 to 3 Profhilo sessions, often combined with HIFU or MNRF for deeper tightening.",
    sessions: "2–3, 4 weeks apart", combine: "HIFU, MNRF, fillers" },
  { v: "lines", label: "Fine lines and crepey skin", img: BEFORE, title: "Smooth Skin Plan",
    text: "Crepey skin and fine lines come from dehydration and collagen loss. Profhilo tackles both.",
    young: "2 Profhilo sessions to smooth early fine lines.", mature: "Profhilo plus Botox for lines caused by movement.",
    sessions: "2, 4 weeks apart", combine: "Botox, microneedling" },
  { v: "neck", label: "Crepey neck", img: INJECT, title: "Neck Renewal Plan",
    text: "The neck ages fast and is often forgotten. Profhilo hydrates and firms crepey neck skin and softens neck lines.",
    young: "2 neck sessions, 4 weeks apart.", mature: "2 to 3 neck sessions, often with Botox for neck bands.",
    sessions: "2–3, 4 weeks apart", combine: "Botox for neck bands, HIFU" },
  { v: "hands", label: "Thin, ageing hands", img: [A + "about-hero.webp", "Facelit doctor consulting a patient", 1151, 768], title: "Hand Rejuvenation Plan",
    text: "Hands lose fat and collagen, so veins and tendons show more. Profhilo hydrates and thickens the skin for younger-looking hands.",
    young: "2 hand sessions, 4 weeks apart.", mature: "2 hand sessions, plus pigment treatment for age spots if needed.",
    sessions: "2, 4 weeks apart", combine: "Pico laser for age spots" },
  { v: "acne", label: "Acne scars and rough texture", img: [B + "707-skin-care.webp", "Close-up of Indian skin texture", 1080, 1080], title: "Texture Repair Plan",
    text: "Profhilo improves skin quality and hydration, helping rough texture and shallow scars look smoother. Deeper scars need resurfacing too.",
    young: "Microneedling or laser for scars, with Profhilo to improve skin quality.", mature: "Profhilo plus CO2 or MNRF for scars and texture.",
    sessions: "2 Profhilo + scar treatment", combine: "CO2 laser, microneedling, MNRF" },
];

const areaTabs = [
  { tab: "Face", body: `<p class="cp-p" style="margin-top:0">The classic Profhilo treatment. 5 points on each side of the face hydrate and firm the cheeks, under-eyes, jaw and lower face in one go.</p>${list(["Brighter, firmer, bouncier skin", "Smoother fine lines", "Better skin under the eyes"])}<div class="cp-rec"><div><small>Product</small><b>1 syringe (2 ml)</b></div><div><small>Course</small><b>2 sessions, 4 weeks apart</b></div></div>` },
  { tab: "Neck", body: `<p class="cp-p" style="margin-top:0">Crepey neck skin and horizontal neck lines respond well to Profhilo. It's one of the most popular areas after the face.</p>${list(["Smoother, firmer neck skin", "Softer neck lines", "Pairs well with the face"])}<div class="cp-rec"><div><small>Product</small><b>1 syringe (2 ml)</b></div><div><small>Course</small><b>2 sessions, 4 weeks apart</b></div></div>` },
  { tab: "Chest", body: `<p class="cp-p" style="margin-top:0">Sun damage and age can leave the chest (décolletage) crepey and lined. Profhilo hydrates and smooths the skin.</p>${list(["Smoother chest skin", "Fewer crepey lines", "Healthier glow"])}<div class="cp-rec"><div><small>Product</small><b>1 syringe (2 ml)</b></div><div><small>Course</small><b>2 sessions, 4 weeks apart</b></div></div>` },
  { tab: "Hands", body: `<p class="cp-p" style="margin-top:0">Thin, dry skin on the backs of the hands makes veins and tendons stand out. Profhilo thickens and hydrates the skin for younger-looking hands.</p>${list(["Plumper, softer skin", "Veins less visible", "Quick treatment"])}<div class="cp-rec"><div><small>Product</small><b>1 syringe (2 ml) for both</b></div><div><small>Course</small><b>2 sessions, 4 weeks apart</b></div></div>` },
  { tab: "Body", body: `<p class="cp-p" style="margin-top:0">Profhilo Body treats loose, crepey skin on the arms, knees, inner thighs and tummy, including after weight loss or pregnancy.</p>${list(["Firmer, smoother body skin", "Helps after weight loss", "Larger, body-specific dose"])}<a class="cp-textlink" href="/profhilo-body-treatments/">About Profhilo Body ${k.arrow}</a>` },
];

const menuRows = [
  ["Profhilo Single Session", "Starter", "face", "Get radiant, younger-looking skin with one Profhilo session.", ["Face", "Glow"], "10 injections (5 each side) with one 2 ml syringe.", "Small bumps for a day", "1"],
  ["Profhilo 2-Session Course", "Recommended", "face", "Say goodbye to fine lines and wrinkles with the full 2-session course.", ["Best results", "Popular"], "Two sessions 4 weeks apart, as the treatment was designed.", "Small bumps for a day", "2"],
  ["Face + Neck", "Combo", "face neck", "Treat the face and neck together for an even, refreshed look.", ["Face", "Neck"], "One syringe for the face and one for the neck, per session.", "Small bumps for a day", "2"],
  ["Neck &amp; Chest", "Neck", "neck", "Hydrates and firms crepey skin on the neck and chest.", ["Neck", "Chest"], "Injections spread across the neck and décolletage.", "Small bumps for a day", "2"],
  ["Hand Rejuvenation", "Hands", "body", "Plumper, softer, younger-looking hands.", ["Hands"], "A few injections on the back of each hand.", "Small bumps for a day", "2"],
  ["Profhilo + Botox", "Combo", "face", "Profhilo for skin quality plus Botox for movement lines.", ["Botox", "Combo"], "Planned together, often on the same day.", "Minimal", "As planned"],
  ["Maintenance Session", "Maintain", "face neck body", "Keep your results going after your course.", ["Maintenance"], "One session every 6 months.", "Small bumps for a day", "1"],
];

const faqs = [
  ["What is Profhilo?", "Profhilo is an injectable skin treatment made of one of the highest concentrations of pure hyaluronic acid available. Instead of adding volume like a filler, it spreads under the skin to hydrate it deeply and stimulate collagen and elastin, so skin looks firmer, smoother and more radiant."],
  ["Is Profhilo a filler?", "No. Fillers are placed to add shape or volume. Profhilo spreads evenly under the skin to improve skin quality. It won't change your features, so you look fresher rather than different."],
  ["How many Profhilo sessions do I need?", "The standard course is 2 sessions, 4 weeks apart. Mature or very loose skin may benefit from a third. After that, one session every 6 months keeps results going."],
  ["When will I see results?", "Many people notice more hydrated skin within the first week. Firmer skin and better texture build after the second session, with the best results around 8 weeks after starting."],
  ["How long does Profhilo last?", "About 6 months after the full course. Regular maintenance sessions help keep skin hydrated and firm."],
  ["Does Profhilo hurt?", "There are only 10 small injections on the face. Most people feel quick pinches and a mild sting as the product goes in. Numbing cream can be used if you'd like."],
  ["What are the bumps after Profhilo?", "Small, raised bumps at each injection point are normal. They're the product sitting under the skin before it spreads, and they usually settle within 6 to 24 hours."],
  ["Who is Profhilo suitable for?", "Anyone from their late 20s onwards with dull, dry, crepey or slightly loose skin. It's suitable for all skin types and tones, including Indian skin."],
  ["Can Profhilo be combined with other treatments?", "Yes. Profhilo works well with Botox, fillers, HIFU, MNRF and chemical peels. Your doctor will plan the timing between treatments."],
  ["What's the difference between Profhilo and skin boosters?", "Profhilo is a type of skin booster with a very high concentration of hyaluronic acid and a special hybrid formula that spreads under the skin. It needs only 10 injection points, compared with many tiny injections for most other skin boosters."],
  ["Are there side effects?", "Small bumps, mild redness, tenderness or a small bruise at the injection points are common and short-lived. Serious side effects are rare."],
  ["Who should not have Profhilo?", "Profhilo isn't advised during pregnancy or breastfeeding, with an active skin infection or cold sore, or for people with a known allergy to hyaluronic acid."],
  ["Can Profhilo be used on the neck and hands?", "Yes. The neck, chest and hands are popular areas. Profhilo Body treats larger areas like the arms, knees and tummy."],
  ["Where can I get Profhilo in Kerala?", "Facelit offers Profhilo in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does Profhilo cost?", "It depends on the area and number of sessions. The 2-session course gives the best results and value. Book a consultation for a personalised quote."],
];

const face = `
<div class="bx-map">
 <div class="bx-face">
 <svg viewBox="0 0 300 380" aria-hidden="true" fill="none" stroke="#3a4d39" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
 <path d="M150 18c-62 0-98 46-98 112 0 40 8 78 24 112 18 38 44 66 74 66s56-28 74-66c16-34 24-72 24-112 0-66-36-112-98-112Z" fill="#fdf7ef"/>
 <path d="M118 308c0 18-4 34-10 50M182 308c0 18 4 34 10 50" opacity=".6"/>
 <path d="M88 122c14-10 34-12 50-6M162 116c16-6 36-4 50 6"/>
 <path d="M96 148c10-8 28-8 38 0-10 8-28 8-38 0ZM166 148c10-8 28-8 38 0-10 8-28 8-38 0Z"/>
 <circle cx="115" cy="148" r="5" fill="#3a4d39" stroke="none"/><circle cx="185" cy="148" r="5" fill="#3a4d39" stroke="none"/>
 <path d="M150 156v46c-6 6-14 10-18 8M150 202c6 6 14 10 18 8" opacity=".75"/>
 <path d="M122 244c10-6 20-8 28-4 8-4 18-2 28 4-6 12-50 12-56 0Z" fill="#e9d3b8"/>
 <path d="M150 30v300" stroke-dasharray="3 6" opacity=".25"/>
 </svg>
 ${points.map(([t, x, y], i) => [x, 100 - x].map((px) => `<button type="button" class="bx-dot" style="left:${px}%;top:${y}%" data-go="t-points-${i}" aria-label="${t}">${i + 1}</button>`).join("")).join("")}
 </div>
 <p class="cp-note" style="text-align:center">The same 5 points are used on both sides. Tap a number.</p>
</div>`;

const pointTabs = tabs("points", points.map(([t, , , d], i) => ({ tab: `${i + 1} · ${t}`, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">Point ${i + 1}: ${t}</h3>
 <p class="cp-p">${d}</p>
 <div class="cp-rec"><div><small>Injections</small><b>1 on each side</b></div><div><small>Total per session</small><b>10 points, 1 syringe</b></div></div>` })));

const pageCss = `<style>
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start}}
.bx-face{position:relative;max-width:320px;margin:0 auto}
.bx-face svg{width:100%;height:auto;display:block}
.bx-dot{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;background:#986a3e;color:#fff;font:600 13px/26px Onest,sans-serif;text-align:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.18);cursor:pointer;transition:transform .15s,background .15s}
.bx-dot:hover,.bx-dot[aria-current=true]{background:#3a4d39;transform:translate(-50%,-50%) scale(1.15)}
.bx-dot:focus-visible{outline:2px solid #3a4d39;outline-offset:2px}
.bx-intro{margin-top:1.25rem}
</style>`;

const pageJs = `<script>(function(){
var m=document.querySelector('.bx-map');if(!m)return;var dots=[].slice.call(m.querySelectorAll('.bx-dot'));
function mark(id){dots.forEach(function(d){d.setAttribute('aria-current',d.dataset.go===id)})}
dots.forEach(function(d){d.addEventListener('click',function(){var t=document.getElementById(d.dataset.go);if(t){t.click();mark(d.dataset.go);if(window.innerWidth<900)t.closest('[data-tabs]').scrollIntoView({behavior:'smooth',block:'start'})}})});
document.querySelectorAll('[id^=t-points-]').forEach(function(t){t.addEventListener('click',function(){mark(t.id)})});mark('t-points-0');
})();</script>`;

const sections = [
  k.hero({
    tags: ["Anti-ageing", "Skin booster", "Doctor-led"], h1: "Profhilo Treatment",
    img: HERO, pos: "55% 35%",
    intro: "Skin looking dull, crepey or a little loose, even though you take care of it? Profhilo is an ultra-pure hyaluronic acid treatment that melts under the skin to hydrate it deeply and boost collagen. Just 10 tiny injections, two sessions a month apart, and your skin looks firmer, smoother and glowing, still completely you.",
    facts: [["15–30 min", "Treatment time"], ["1 day", "Small bumps"], ["2 sessions", "Course"], ["~6 months", "Results last"]],
    cta2: ["#points", "See how it works"],
  }),
  k.jump([["overview", "Overview"], ["product", "The product"], ["points", "5-point technique"], ["finder", "Find your plan"], ["areas", "Areas"], ["course", "Your course"], ["plans", "Packages"], ["process", "Process"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is Profhilo?</h2>
 <div class="cp-prose">
 <p>As we age, skin loses hyaluronic acid, collagen and elastin, the three things that keep it plump, firm and bouncy. The result is skin that looks dull, feels dry and starts to look crepey or slightly loose, especially on the cheeks, under the eyes and on the neck.</p>
 <p>Profhilo puts back what's missing. It's one of the most concentrated hyaluronic acid treatments available, made with a special hybrid formula that lets it spread evenly under the skin from just 10 injection points. There it hydrates deeply and stimulates your own collagen and elastin. This is called <b>bio-remodelling</b>: improving the quality of the skin itself rather than adding volume.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: why Profhilo isn't a filler ${k.plus}</summary>
 <div class="cp-prose">
 <p>Fillers are thick gels placed in specific spots to add shape, for example to lips or cheeks. Profhilo is very fluid. It \"melts\" and spreads like a sheet under the skin, so it doesn't change your features or make you look puffy.</p>
 <p>That's why Profhilo is often used alongside fillers and Botox. Profhilo improves the skin, <a href="/hydrating-fillers-treatment/">fillers</a> restore lost volume and <a href="/botox-treatments/">Botox</a> softens lines from movement.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How Profhilo works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Spread</b><span>Profhilo melts and spreads evenly under the skin from 10 points.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Hydrate</b><span>Pure HA draws in water for deep, lasting hydration.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Remodel</b><span>Collagen and elastin increase, so skin becomes firmer over weeks.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...BEFORE)}
 ${img(...AFTER)}
 </div>
 </div>`),

  shell("product", `
 ${k.machine({ name: "What's Inside a Profhilo Syringe",
   card: { eyebrow: "One syringe", title: "Profhilo<sup>®</sup> (2 ml)", lines: [["64 mg", "pure hyaluronic acid"], ["32 + 32", "mg of high and low weight HA"], ["0", "chemical cross-linkers (BDDE-free)"], ["10", "injection points for the face"]] },
   text: "Profhilo combines two kinds of hyaluronic acid. Low-weight HA works fast to hydrate, while high-weight HA lasts longer and supports the skin. They're joined using heat instead of chemicals, which is why Profhilo spreads so evenly and lasts for months without making you look filled.",
   tags: ["Ultra-pure HA", "Heat-stabilised, no chemical cross-linkers", "All skin types", "Made in Italy by IBSA"],
   specs: [["Hydrates", "Draws in water deep in the skin"], ["Remodels", "Boosts collagen and elastin"], ["Spreads", "Even, natural result"], ["Lasts", "About 6 months per course"]] })}`),

  shell("points", `${head("The technique", "The 5-Point Technique, Explained", "Profhilo for the face uses just 5 injection points on each side, chosen to avoid major blood vessels and nerves. Tap a number to see what each point does.")}
 <div class="bx-wrap">${face}<div>${pointTabs}</div></div>`),

  shell("finder", `${head("Find your plan", "Which Profhilo Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan at your consultation.")}
 ${k.finder({ q1: "What bothers you most?", q2: { label: "How old are you?", dt: "Our suggestion", options: [["young", "Under 35"], ["mature", "35 or older"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of Profhilo", "Better skin quality from within, with a natural, fresh-faced result.")}${k.benefitsGrid(benefits)}`),

  shell("areas", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Treatment areas", "Where Can Profhilo Be Used?", "The face is the most popular area, but Profhilo works anywhere skin is dry, thin or crepey.")}
 ${tabs("areas", areaTabs)}
 </div>
 <div class="cp-split-sep">${head("Is it right for you?", "Signs You'd Benefit from Profhilo", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Your skin looks dull even after sleep and skincare", "Creams work on the surface. Profhilo hydrates deep in the skin, where they can't reach."],
   ["Makeup sits in fine lines or looks cakey", "A sign of dehydration. Better-hydrated skin gives makeup a smoother base."],
   ["Your skin feels thinner or looks crepey", "Collagen loss makes skin look crinkly, especially under the eyes and on the neck. Profhilo helps rebuild it."],
   ["Your face looks slightly loose but you don't want fillers", "Profhilo firms the skin without adding volume or changing your features."],
   ["You've lost weight or been unwell", "Weight loss and illness can leave skin looking tired and lax. Profhilo helps it bounce back."],
 ])}</div></div>
 </div>`),

  shell("course", `${head("Your course", "How a Profhilo Course Works", "Profhilo is designed as a short course, because each session builds on the last.")}
 ${k.timeline([["Session 1", "Hydration starts", "10 injections, about 15 to 30 minutes. Skin often looks more hydrated within a week."], ["Session 2 · week 4", "Collagen boost", "The second session builds on the first and drives collagen and elastin production."], ["Week 8", "Best results", "Skin looks firmer, smoother and glowing, with better texture."], ["Every 6 months", "Maintain", "One session keeps your skin hydrated and firm. Mature skin may benefit from a third course session."]])}`),

  shell("plans", `${head("Packages", "Profhilo Packages at Facelit", "Start with one session, choose the recommended 2-session course, or add the neck, chest or hands.")}
 ${k.menu([["all", "All"], ["face", "Face"], ["neck", "Neck &amp; chest"], ["body", "Hands &amp; body"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Profhilo Treatment Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor discussing Profhilo with a patient", 1151, 768], lead: "A proper consultation comes first.",
     items: ["Your doctor checks your skin, talks through your goals and reviews your medical history.", "Avoid aspirin, ibuprofen, fish oil and vitamin E for a few days if your doctor agrees, to reduce bruising.", "Skip alcohol for 24 hours before.", "Come with clean skin and no makeup.", "Plan around events, as small bumps can show for a day."] },
   { tab: "02 · During", img: INJECT, lead: "Treatment takes 15 to 30 minutes.",
     items: ["Your skin is cleansed and disinfected.", "The 5 points on each side are marked.", "A small amount of Profhilo is placed at each point with a fine needle.", "You'll feel quick pinches and a mild sting as it goes in.", "Small bumps form at each point. This is normal."] },
   { tab: "03 · After", img: AFTER, lead: "Most people go straight back to work. The full aftercare plan is below.",
     items: ["Bumps settle within 6 to 24 hours as the product spreads.", "Don't massage or press the points.", "Avoid makeup for 12 hours.", "Skip the gym, saunas, alcohol and strong sun for 24 to 48 hours.", "Book your second session in 4 weeks."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "What Results Can You Expect?", "Profhilo improves skin quality gradually, so people notice you look well, not that you've had something done.")}
 <div class="cp-two cp-two--tight">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have dull, dry or dehydrated skin", "See crepey skin under the eyes or on the neck", "Have early skin laxity", "Want natural results without fillers"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Are pregnant or breastfeeding", "Have an infection or cold sore in the area", "Want to add volume to lips or cheeks (fillers suit that)", "Have very loose skin (HIFU or surgery may help more)"], warn)}</div>
 </div>
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After the course</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "Profhilo Aftercare", "Simple steps that help Profhilo spread evenly and settle well.")}${tabs("aftercare", [
   { tab: "First 24 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Leave the bumps alone. They'll settle", "Use a cold pack if you're swollen", "Drink plenty of water", "Sleep on your back if you can"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Massaging or pressing the points", "Makeup for 12 hours", "Alcohol, gym, saunas and steam", "Strong sun and heat"], warn)}</div></div>` },
   { tab: "Days 2–14", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Use gentle, hydrating skincare", "Wear SPF 30 or higher every day", "Keep drinking water", "Book your second session"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Facials, peels and lasers for 2 weeks", "Retinoids and strong acids for a few days", "Face rollers and massage"], warn)}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "Profhilo Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"Profhilo is just another filler.\"", "Fillers add shape. Profhilo spreads under the skin to improve its quality, so it won't change your features."],
   ["\"One session is enough.\"", "Profhilo is designed as a 2-session course. The second session is what really boosts collagen."],
   ["\"The bumps mean something went wrong.\"", "Bumps are expected. They're the product before it spreads, and they settle within a day."],
   ["\"It's only for older skin.\"", "Many people start in their late 20s or 30s to keep skin hydrated and prevent early ageing."],
   ["\"Results show instantly.\"", "Hydration shows within a week, but firmness builds over about 8 weeks as collagen grows."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare treatments", "Profhilo vs Fillers vs Botox vs HIFU", "Four treatments that work in very different ways, and often work best together.")}
 ${k.compareTable(["Profhilo", '<a href="/hydrating-fillers-treatment/">Fillers</a>', '<a href="/botox-treatments/">Botox</a>', '<a href="/hifu/">HIFU</a>'], [
   ["What it does", "Hydrates and firms skin from within", "Adds volume and shape", "Relaxes muscles that cause lines", "Tightens deeper layers with ultrasound"],
   ["Best for", "Dull, crepey or slightly loose skin", "Lips, cheeks, under-eyes, jaw", "Forehead lines, 11s, crow's feet", "Sagging jowls and jawline"],
   ["Changes your features?", "No", "Yes, by design", "No", "No"],
   ["Results show", "1–8 weeks", "Immediately", "2–3 days", "1–3 months"],
   ["Lasts", "About 6 months", "6–18 months", "3–4 months", "About 12 months"],
   ["Downtime", "Bumps for a day", "1–3 days", "None", "None to mild redness"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Profhilo?</h2>
 ${img(A + "eco-doctor-devi.webp", "Facelit dermatologist", 672, 891, "cp-img cp-img--wide")}
 </div>
 ${k.whyList([
   ["Doctor-only injections", "Every Profhilo treatment is given by our trained dermatologists and aesthetic doctors."],
   ["Genuine Profhilo", "We use genuine Profhilo from authorised suppliers, and you can see the sealed syringe before we start."],
   ["Precise 5-point technique", "We follow the proven injection points, placed to avoid major vessels and nerves."],
   ["A full skin plan", "We combine Profhilo with Botox, fillers, HIFU or peels only when your skin needs it."],
   ["Follow-up included", "We check your skin between sessions and plan your maintenance."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Side Effects and Who Should Wait", "Profhilo is made of pure hyaluronic acid and is very well tolerated. Here's what's normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Small bumps at each injection point for 6 to 24 hours", "Mild redness or tenderness", "A small bruise", "Slight swelling"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant or breastfeeding", "Have an active infection, cold sore or acne flare in the area", "Have a known allergy to hyaluronic acid", "Take blood thinners", "Have an autoimmune condition"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "Profhilo Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "Profhilo at Facelit", "")}
 ${k.links([["/best-profhilo-treatment-in-trivandrum/", "Location", "Profhilo in Trivandrum"], ["/best-profhilo-treatment-in-karunagappally/", "Location", "Profhilo in Karunagappally"], ["/profhilo-body-treatments/", "Treatment", "Profhilo Body"], ["/skin-boosters-help-reduce-fine-lines-and-wrinkles/", "Guide", "How skin boosters reduce fine lines"], ["/hydrating-fillers-treatment/", "Treatment", "Hydrating fillers"], ["/botox-treatments/", "Treatment", "Botox"]])}`),

  k.cta("Ready for firmer, glowing skin that still looks like you?", "Book a consultation. Our doctors will assess your skin and plan a Profhilo course, on its own or with the treatments that suit you."),
];

sections[4] = sections[4].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Profhilo Treatment in Kerala | Skin Booster for Glow & Firmness | Facelit",
  desc: "Doctor-led Profhilo in Trivandrum, Kollam & Thrissur. Ultra-pure hyaluronic acid that hydrates, firms and smooths crepey, dull skin on the face, neck and hands. 2-session course.",
  image: "https://facelit.in/wp-content/uploads/2026/08/skin-hero-1.webp",
  faqs,
  procedure: { name: "Profhilo Skin Bio-remodelling", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face, neck, chest and hands",
    howPerformed: "Ultra-pure hyaluronic acid is injected at 5 standard points on each side of the face (10 in total), where it spreads evenly under the skin to hydrate and stimulate collagen and elastin.",
    preparation: "Doctor consultation and skin assessment, avoiding blood-thinning medicines and supplements if advised, no alcohol for 24 hours and clean skin without makeup.",
    followup: "Do not massage the injection points, no makeup for 12 hours, avoid exercise, heat and alcohol for 24 to 48 hours. Second session after 4 weeks, then maintenance every 6 months." },
  crumbs: [["Home", "https://facelit.in/"], ["Anti-aging", "https://facelit.in/anti-aging-treatments/"], ["Profhilo Treatment", "https://facelit.in/profhilo-treatment/"]],
});
