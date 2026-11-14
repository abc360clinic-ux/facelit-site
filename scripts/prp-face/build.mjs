// Builds the redesigned /prp-face-treatment/ page.
// Usage (from facelit-site/): node scripts/prp-face/build.mjs content/pages/prp-face-treatment.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";

const HERO = [A + "NCTF-Treatment.webp", "Doctor giving PRP microinjections to a woman's face at Facelit"];
const INJECT = [A + "NCTF-Treatment.webp", "PRP being injected into the skin of the face", 1080, 1080];
const SPIN = [B + "567-PRP-Blood-Centrifuge-Process.webp", "Blood sample in a centrifuge being spun to separate platelet-rich plasma", 1080, 1080];
const BEFORE = [A + "anti-aging-before-scaled-1.webp", "Indian woman with dull skin and fine lines before PRP face treatment", 1920, 2560];
const AFTER = [A + "anti-aging-after-scaled-1.webp", "Indian woman with smoother, brighter skin after PRP face treatment", 1920, 2560];
const SCARS = [A + "black-marks.webp", "Acne marks and scars on Indian skin", 1080, 1080];
const PORES = [A + "lage-pores.webp", "Enlarged pores on the cheek", 1080, 1080];
const EYES = [B + "654-Dark-Circles1.webp", "Indian woman with dark circles and tired under-eyes", 1080, 1080];
const PIGMENT = [A + "Pigmentation-on-the-Face.webp", "Pigmentation patches on the cheek", 1080, 1080];
const MELASMA = [B + "188-4-6.webp", "Melasma patches on Indian skin", 1080, 1080];

// Face map: [tab, dot x%, dot y%, title, text, bullets, best method, sessions]
const areas = [
  ["Forehead", 50, 18, "Forehead fine lines and texture", "PRP thickens thin skin and boosts collagen, so fine lines on the forehead soften and texture looks smoother.", ["Softer fine lines", "Smoother, firmer skin"], "PRP + microneedling", "3–5"],
  ["Under-eyes", 37, 43, "Dark circles and crepey under-eyes", "The skin under the eyes is very thin. Fine PRP injections thicken it, so shadows, crepey lines and the tired look improve.", ["Thicker, firmer under-eye skin", "Less shadowing", "Softer fine lines"], "PRP injections", "3, a month apart"],
  ["Cheeks", 30, 56, "Acne scars and open pores", "Cheeks are where acne scars and large pores show most. PRP with microneedling repairs the skin from within, filling shallow scars and tightening pores over a course.", ["Shallower scars", "Smaller-looking pores", "Smoother texture"], "PRP + microneedling", "5–6"],
  ["Around the mouth", 64, 66, "Smile lines and lines around the mouth", "PRP improves skin quality around the mouth, softening fine lines and giving the area a fresher look.", ["Softer fine lines", "Firmer skin"], "PRP injections", "3–5"],
  ["Jaw &amp; neck", 50, 90, "Jawline and neck skin", "PRP improves crepey skin on the lower face and neck, helping it look firmer and smoother.", ["Firmer-looking skin", "Smoother neck lines"], "PRP injections or microneedling", "3–5"],
];

const benefits = [
  ["drop", "From Your Own Blood", "Made from a small sample of your blood, so there's no risk of allergy or rejection."],
  ["lift", "Boosts Collagen", "Growth factors in your platelets tell skin cells to make fresh collagen and elastin."],
  ["wave", "Softens Fine Lines", "Thicker, healthier skin means fine lines and crepey texture smooth out."],
  ["layers", "Repairs Acne Scars", "Combined with microneedling, PRP helps fill shallow scars and smooth uneven skin."],
  ["spark", "Natural Glow", "Brighter, healthier-looking skin, without changing your features."],
  ["shield", "Tighter Pores", "Firmer skin around the pores makes them look smaller."],
  ["heal", "Little Downtime", "Redness settles within 1 to 2 days, and most people return to work the next day."],
  ["clock", "Lasting Results", "Results build over weeks and last for months after a full course."],
];

const finderResults = [
  { v: "dull", label: "Dull, tired skin", img: [B + "233-5.webp", "Close-up of tired, uneven skin texture", 1080, 1080], title: "PRP Glow Plan",
    text: "PRP delivers a concentrated dose of growth factors that refresh tired skin, improving glow, hydration and texture.",
    none: "PRP injections across the face, with little visible downtime.", some: "PRP with microneedling for a deeper refresh and better glow.",
    sessions: "1–3, a month apart", note: "Results build over 3 to 4 weeks" },
  { v: "lines", label: "Fine lines and early ageing", img: BEFORE, title: "PRP Anti-Ageing Plan",
    text: "PRP boosts collagen and elastin, so skin looks firmer and fine lines soften over a course of sessions.",
    none: "PRP injections on the areas with lines, such as the under-eyes and forehead.", some: "PRP with microneedling across the whole face for stronger collagen building.",
    sessions: "3–5, a month apart", note: "A maintenance session every 6 to 12 months" },
  { v: "scars", label: "Acne scars", img: SCARS, title: "PRP Scar Repair Plan",
    text: "Acne scars need the skin to rebuild from below. PRP with microneedling is one of the most effective natural ways to do that.",
    none: "PRP injections into the scarred areas, with gentle microneedling later when you can take a day or two of redness.", some: "PRP with microneedling, the best method for acne scars.",
    sessions: "5–6, a month apart", note: "Scars improve gradually over the course" },
  { v: "pores", label: "Large pores and rough texture", img: PORES, title: "PRP Smooth Skin Plan",
    text: "PRP strengthens the skin around the pores so they look smaller and texture becomes smoother.",
    none: "PRP injections on the cheeks and nose area.", some: "PRP with microneedling for the best change in pores and texture.",
    sessions: "3–5, a month apart", note: "Daily sunscreen helps keep results" },
  { v: "eyes", label: "Dark circles and tired eyes", img: EYES, title: "PRP Under-Eye Plan",
    text: "Fine PRP injections thicken the thin under-eye skin, so shadows and crepey lines look less obvious.",
    none: "Fine PRP injections under the eyes. Small bruises can happen.", some: "PRP under the eyes, with microneedling on the rest of the face if you'd like.",
    sessions: "3, a month apart", note: "Best for thin, crepey under-eye skin" },
  { v: "tone", label: "Uneven tone and pigmentation", img: PIGMENT, title: "PRP Even Tone Plan",
    text: "PRP improves skin health and repair, which can help uneven tone and support pigmentation treatment. Melasma needs a careful, doctor-led plan.",
    none: "PRP injections to improve skin health, alongside your prescribed pigmentation care.", some: "PRP with gentle microneedling, planned carefully to avoid irritating pigment.",
    sessions: "3–5, a month apart", note: "Strict sunscreen is essential" },
];

const concerns = [
  { tab: "Fine lines &amp; ageing", img: BEFORE, title: "Fine lines, wrinkles and early ageing",
    text: "From our late 20s, collagen production slows down. Skin becomes thinner and fine lines appear, especially around the eyes and forehead. PRP's growth factors tell your skin to make fresh collagen and elastin, so it looks firmer and smoother.",
    more: ["Firmer, thicker skin", "Softer fine lines", "Results that look natural"], rec: ["PRP + microneedling", "PRP injections"], recLabel: "Best methods", sessions: "3–5, a month apart",
    link: ["/how-does-prp-treatment-rejuvenate-your-face/", "How PRP rejuvenates your face"] },
  { tab: "Acne scars", img: SCARS, title: "Acne scars and marks",
    text: "Acne can leave dips and uneven texture on the cheeks and temples. Microneedling opens tiny channels that trigger repair, and PRP floods them with growth factors, so scars fill and smooth out gradually.",
    more: ["Shallower scars", "Smoother texture", "More even skin"], rec: ["PRP + microneedling"], recLabel: "Best method", sessions: "5–6, a month apart" },
  { tab: "Enlarged pores", img: PORES, title: "Enlarged pores",
    text: "Pores look bigger when the skin around them loses firmness. PRP rebuilds collagen around the pores, so they look smaller and the skin looks smoother.",
    more: ["Smaller-looking pores", "Smoother skin surface", "Less oily-looking texture"], rec: ["PRP + microneedling"], recLabel: "Best method", sessions: "3–5, a month apart" },
  { tab: "Dark circles", img: EYES, title: "Dark circles and tired under-eyes",
    text: "Very thin under-eye skin lets the darker tissue beneath show through. Fine PRP injections thicken the skin, so shadows look softer and crepey lines improve.",
    more: ["Brighter, less tired eyes", "Thicker under-eye skin", "Softer fine lines"], rec: ["PRP injections"], recLabel: "Best method", sessions: "3, a month apart" },
  { tab: "Pigmentation", img: PIGMENT, title: "Uneven tone and pigmentation",
    text: "PRP improves overall skin health and repair, which helps skin look more even and supports your pigmentation treatment. It works best as part of a doctor-led plan with daily sunscreen.",
    more: ["More even-looking skin", "Healthier, brighter skin", "Supports pigmentation care"], rec: ["Doctor-led plan", "Daily SPF"], recLabel: "Works best with", sessions: "3–5, a month apart" },
  { tab: "Melasma", img: MELASMA, title: "Melasma",
    text: "Melasma is stubborn and easily triggered by heat, sun and irritation. Some studies show PRP can help melasma when used carefully. Our doctors decide if it suits your skin and plan it gently.",
    more: ["Gentle, careful approach", "Supports melasma care", "Doctor assessment first"], rec: ["Doctor-led plan"], recLabel: "Important", sessions: "Planned by your doctor" },
];

const methods = [
  { tab: "PRP injections", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Tiny amounts of PRP are placed just under the skin with a very fine needle across the treatment area. This is also called PRP mesotherapy.</p>${list(["Precise treatment of specific areas", "Very little redness", "Ideal for under-eyes and fine lines"])}</div><div class="cp-meta"><div><b>Best for:</b> under-eyes, fine lines, glow</div><div><b>Downtime:</b> a few hours of small bumps</div><div><b>Sessions:</b> 3–5, a month apart</div></div></div>` },
  { tab: "PRP + microneedling", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">Also known as the \"vampire facial\". A microneedling pen makes tiny channels across the face, and PRP is applied so it soaks deep into the skin.</p>${list(["Treats the whole face evenly", "Best for acne scars, pores and texture", "Stronger collagen boost"])}</div><div class="cp-meta"><div><b>Best for:</b> acne scars, pores, texture</div><div><b>Downtime:</b> 1–2 days of redness</div><div><b>Sessions:</b> 3–6, a month apart</div></div></div>` },
  { tab: "Under-eye PRP", body: `<div class="cp-mode"><div><p class="cp-p" style="margin-top:0">A focused treatment with very fine injections under the eyes, where the skin is thinnest.</p>${list(["Thickens thin under-eye skin", "Softens dark shadows and crepey lines", "Natural, no added volume"])}</div><div class="cp-meta"><div><b>Best for:</b> dark circles, crepey under-eyes</div><div><b>Downtime:</b> small bruises possible for a few days</div><div><b>Sessions:</b> 3, a month apart</div></div></div>` },
];

const courseCards = [
  ["Glow refresh", 1, "For tired, dull skin or a boost before a big event. Plan it 3 to 4 weeks ahead.", "dull skin, glow", "0–2 days", "1–3 sessions"],
  ["Anti-ageing course", 2, "For fine lines, early ageing and loss of firmness. Collagen builds with every session.", "fine lines, firmness, pores", "0–2 days", "3–5 sessions"],
  ["Scar repair course", 3, "For acne scars and uneven texture. PRP with microneedling, repeated monthly.", "acne scars, texture", "1–2 days", "5–6 sessions"],
];

const menuRows = [
  ["PRP Face · 1 Session", "Starter", "glow", "Get fresh, smooth, younger-looking skin in 1 session.", ["Glow", "Starter"], "Blood draw, PRP preparation and treatment in one visit.", "0–2 days", "1"],
  ["PRP Face · 3 Sessions", "Popular", "glow ageing", "Get fresh, smooth, younger-looking skin in 3 sessions.", ["Fine lines", "Glow"], "Three sessions about a month apart.", "0–2 days", "3"],
  ["PRP Face · 5 Sessions", "Course", "ageing scars", "Get fresh, smooth, younger-looking skin in 5 sessions.", ["Anti-ageing", "Pores"], "Five sessions about a month apart, with progress photos.", "0–2 days", "5"],
  ["PRP Face · 6 Sessions", "Best for scars", "scars", "Get fresh, smooth, younger-looking skin in 6 sessions.", ["Acne scars", "Best value"], "Six sessions about a month apart, ideal for acne scars.", "1–2 days", "6"],
];

const faqs = [
  ["What is PRP face treatment?", "PRP (platelet-rich plasma) face treatment uses the growth factors in your own blood to rejuvenate your skin. A small blood sample is spun to concentrate the platelets, and this plasma is injected into the skin or applied during microneedling to boost collagen, smooth texture and restore glow."],
  ["Is PRP the same as a vampire facial?", "The vampire facial is a popular name for PRP with microneedling. PRP can also be given as fine injections, which is often better for the under-eyes."],
  ["Is PRP face treatment painful?", "We apply numbing cream for about 30 to 45 minutes first, so most people feel only mild prickling or small pricks. The blood draw feels like a routine blood test."],
  ["How many PRP sessions do I need for my face?", "It depends on your goal. For glow, 1 to 3 sessions. For fine lines and pores, 3 to 5. For acne scars, 5 to 6. Sessions are spaced about a month apart."],
  ["When will I see results?", "Many people notice a fresher glow within 1 to 2 weeks. Collagen builds slowly, so firmer skin, softer lines and smoother scars show over 2 to 3 months."],
  ["How long do PRP face results last?", "After a full course, results usually last 12 to 18 months. A maintenance session every 6 to 12 months keeps your skin looking its best."],
  ["What is the downtime after PRP face?", "After injections, small bumps settle within a few hours. After PRP with microneedling, expect redness like mild sunburn for 1 to 2 days."],
  ["Does PRP work for acne scars?", "Yes. PRP with microneedling is one of the most effective natural treatments for shallow acne scars. Deep scars improve too, but usually need more sessions."],
  ["Can PRP help dark circles?", "PRP can help dark circles caused by thin, crepey under-eye skin, by making the skin thicker. Dark circles from pigmentation or hollows may need a different approach, which your doctor will explain."],
  ["Is PRP safe for Indian skin?", "Yes. PRP comes from your own blood and doesn't use heat or light, so the risk of pigmentation is low. We use gentle settings with microneedling and stress daily sunscreen."],
  ["Is PRP safe?", "Yes. Because it's your own blood, there's no risk of allergy or rejection. We use sterile, single-use kits. Mild redness, swelling or a small bruise are the most common side effects."],
  ["Who should not have PRP?", "PRP isn't suitable for people with blood or platelet disorders, active skin infections or cold sores, cancer under treatment, or during pregnancy. Tell your doctor about any medicines, especially blood thinners."],
  ["Can I wear makeup after PRP face?", "Wait at least 24 hours after PRP injections, and 48 hours after PRP with microneedling."],
  ["Where can I get PRP face treatment in Kerala?", "Facelit offers PRP face treatment in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur)."],
  ["How much does PRP face treatment cost?", "It depends on the method and number of sessions. Packages of 3, 5 and 6 sessions offer better value. Book a consultation for a personalised quote."],
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
 <g fill="#986a3e" stroke="none" opacity=".25"><circle cx="86" cy="206" r="2"/><circle cx="96" cy="216" r="2"/><circle cx="80" cy="222" r="2"/><circle cx="214" cy="206" r="2"/><circle cx="204" cy="216" r="2"/><circle cx="220" cy="222" r="2"/></g>
 </svg>
 ${areas.map(([t, x, y], i) => `<button type="button" class="bx-dot" style="left:${x}%;top:${y}%" data-go="t-areas-${i}" aria-label="${t.replace(/&amp;/g, "and")}">${i + 1}</button>`).join("")}
 </div>
 <p class="cp-note" style="text-align:center">Tap a number to see what PRP does there.</p>
</div>`;

const areaTabs = tabs("areas", areas.map(([t, , , title, text, more, method, sessions], i) => ({ tab: `${i + 1} · ${t}`, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${title}</h3>
 <p class="cp-p">${text}</p>
 ${list(more)}
 <div class="cp-rec"><div><small>Best method</small><b>${method}</b></div><div><small>Typical sessions</small><b>${sessions}</b></div></div>` })));

const pageCss = `<style>
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start}}
.bx-face{position:relative;max-width:320px;margin:0 auto}
.bx-face svg{width:100%;height:auto;display:block}
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
    tags: ["Anti-ageing", "Your own platelets", "Doctor-led"], h1: "PRP Face Treatment",
    img: HERO, pos: "50% 45%",
    intro: "Fine lines, acne scars, large pores or skin that just looks tired? PRP face treatment uses the growth factors in your own blood to repair and rejuvenate your skin from within. It boosts collagen, smooths texture and brings back a natural glow, with no fillers, no chemicals and very little downtime.",
    facts: [["45–60 min", "Per session"], ["0–2 days", "Downtime"], ["1–6", "Sessions"], ["12–18 months", "Results last"]],
    cta2: ["#finder", "Find your PRP plan"],
  }),
  k.jump([["overview", "Overview"], ["how", "How it's made"], ["methods", "Methods"], ["face-map", "Face map"], ["finder", "Find your plan"], ["concerns", "Concerns"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is PRP Face Treatment?</h2>
 <div class="cp-prose">
 <p>Platelets are the cells in your blood that rush in to heal a cut or scrape. They carry growth factors: natural proteins that tell your skin to repair, renew and make fresh collagen.</p>
 <p>In PRP face treatment, we take a small amount of your blood, spin it to concentrate the platelets, and put that platelet-rich plasma back into your skin, either with fine injections or during microneedling. Your skin responds as if it's healing, building new collagen and elastin. Over the following weeks it becomes firmer, smoother and brighter, with softer lines and scars.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: the growth factors in your platelets ${k.plus}</summary>
 <div class="cp-prose">
 ${list(["<b>PDGF:</b> helps skin cells multiply and repair damaged areas.", "<b>TGF-β:</b> drives new collagen, which makes skin firmer.", "<b>VEGF:</b> builds tiny blood vessels, improving glow and nutrient supply.", "<b>EGF:</b> speeds up skin renewal for smoother, fresher skin."])}
 <p>Because it all comes from your own blood, the result looks natural. It's your own skin, just healthier.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How PRP works on the face">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Concentrate</b><span>Platelets are concentrated from a small sample of your blood.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Deliver</b><span>PRP goes into the skin with fine injections or microneedling.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Renew</b><span>Growth factors trigger fresh collagen over the next few weeks.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...SPIN)}
 ${img(...INJECT)}
 </div>
 </div>`),

  shell("how", `${head("From your blood to your skin", "How PRP Is Prepared, Step by Step", "Everything happens in the clinic, in one visit.")}
 ${k.benefitsGrid([
   ["drop", "1. A small blood draw", "A small amount of blood is taken from your arm, just like a routine blood test."],
   ["wave", "2. Spin in a centrifuge", "The blood is spun so the red cells settle and the platelets collect in the plasma."],
   ["layers", "3. Collect the PRP", "The golden, platelet-rich layer is drawn into a sterile syringe."],
   ["spark", "4. Treat your skin", "PRP is injected or applied during microneedling while it's fresh."],
 ])}`),

  shell("methods", `${head("How we use PRP", "Three Ways to Use PRP on the Face", "Your doctor picks the method that suits your skin concern and how much downtime you can take.")}${tabs("methods", methods)}`),

  shell("face-map", `${head("Treatment areas", "Where Does PRP Help? Tap the Face Map", "Tap a number on the face, or pick an area from the list, to see what PRP does there, the best method and how many sessions you may need.")}
 <div class="bx-wrap">${face}<div>${areaTabs}</div></div>`),

  shell("finder", `${head("Find your plan", "Which PRP Face Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan at your consultation.")}
 ${k.finder({ q1: "What would you most like to improve?", q2: { label: "Can you take 1 to 2 days of redness?", dt: "Our suggestion", options: [["none", "No, I need to look normal the next day"], ["some", "Yes, that's fine"]] }, results: finderResults.map((r) => ({ ...r, combine: r.note })) })}`),

  shell("", `${head("What to expect", "Benefits of PRP Face Treatment", "Your body's own healing power, focused on your skin.")}${k.benefitsGrid(benefits)}`),

  shell("concerns", `${head("Is it right for you?", "Skin Concerns PRP Face Treatment Helps", "Tap a concern to see how PRP helps, the best method and how many sessions you may need.")}
 ${k.concernTabs("concerns", concerns)}`),

  shell("", `${head("Your course", "How Many PRP Sessions Do You Need?", "PRP builds collagen gradually, so the number of sessions depends on your goal.")}${k.depthCards(courseCards)}`),

  shell("plans", `${head("Packages", "PRP Face Treatment Packages at Facelit", "Choose the number of sessions that matches your goal. More sessions give stronger, longer-lasting results.")}
 ${k.menu([["all", "All"], ["glow", "Glow"], ["ageing", "Anti-ageing"], ["scars", "Acne scars"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">PRP Face Treatment Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor assessing a patient's skin before PRP", 1151, 768], lead: "A proper skin assessment comes first.",
     items: ["Your doctor examines your skin and chooses the right PRP method.", "Stop retinoids, exfoliating acids and scrubs for about a week before.", "Avoid alcohol and blood-thinning medicines for 24 hours, if your doctor agrees.", "Drink plenty of water and eat a light meal before you come.", "Come with clean skin and no makeup."] },
   { tab: "02 · During", img: INJECT, lead: "A session takes 45 to 60 minutes, including numbing.",
     items: ["Numbing cream is applied for 30 to 45 minutes.", "A small amount of blood is drawn and spun in a centrifuge.", "PRP is injected with a very fine needle, or applied during microneedling.", "Any remaining PRP is massaged into the skin as a mask.", "Most people feel only mild prickling."] },
   { tab: "03 · After", img: AFTER, lead: "Most people go back to work the next day. The full aftercare plan is below.",
     items: ["Redness or small bumps for a few hours to 2 days.", "Leave the PRP on your skin for at least 4 to 6 hours.", "No makeup for 24 hours (48 after microneedling).", "Use gentle skincare and sunscreen.", "Book your next session in about 4 weeks."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "PRP Face Results Timeline", "PRP works with your skin's natural healing, so results build gradually and look natural.")}
 ${k.timeline([["Days 1–2", "Healing", "Redness or small bumps settle. Skin may feel slightly tight."], ["Weeks 1–3", "Fresh glow", "Skin looks brighter, fresher and more hydrated."], ["Months 2–3", "Collagen builds", "Firmer skin, softer lines, smaller-looking pores and smoother scars."], ["After the course", "Maintain", "Results last 12 to 18 months. A top-up every 6 to 12 months keeps them going."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After a course</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have dull skin, fine lines or early ageing", "Have acne scars or large pores", "Have thin, crepey under-eyes", "Want a natural treatment using your own blood"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Have a blood or platelet disorder", "Have active acne, an infection or cold sore on the face", "Are pregnant", "Expect overnight results"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "PRP Face Aftercare", "Simple steps that help your skin heal and get the most out of every session.")}${tabs("aftercare", [
   { tab: "First 24 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Leave PRP on your skin for 4 to 6 hours", "Wash with lukewarm water and a gentle cleanser", "Drink plenty of water", "Sleep on a clean pillowcase"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Makeup (48 hours after microneedling)", "Touching or scratching your face", "Gym, saunas and steam", "Alcohol and smoking"], warn)}</div></div>` },
   { tab: "Days 2–7", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Use a gentle moisturiser", "Wear SPF 30 or higher every day", "Let any dry flaking come off on its own"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Retinoids, acids and scrubs for 5 to 7 days", "Direct sun and heat", "Swimming pools for 3 days", "Facials and other skin treatments"], warn)}</div></div>` },
   { tab: "Between sessions", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Keep up</h3>${list(["Daily sunscreen, even indoors", "Your doctor's recommended skincare", "Good sleep and hydration", "Your next session in about 4 weeks"])}</div><div class="cp-card"><h3 class="font-serif">Remember</h3>${list(["Collagen builds slowly", "Each session builds on the last", "Take photos to track progress"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "PRP Face Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"A vampire facial is something different.\"", "The vampire facial is just a popular name for PRP with microneedling, one of the ways we use PRP."],
   ["\"One session is enough for scars.\"", "Collagen builds slowly. Acne scars usually need 5 to 6 sessions for a clear change."],
   ["\"PRP adds volume like a filler.\"", "PRP doesn't fill. It improves your skin's quality, so results look natural."],
   ["\"Using your own blood is risky.\"", "Your blood is drawn and processed with sterile, single-use kits and used the same visit, so there's no risk of allergy or rejection."],
   ["\"Results show the next day.\"", "You may glow within a week or two, but firmness and scar changes take 2 to 3 months."],
 ])}</div></div>
 </div>`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>${head("Good to know", "PRP for Indian Skin", "Brown skin needs extra care with some treatments. Here's why PRP is a good fit.")}<div class="cp-faq cp-faq--compact">${accordion([
   ["Low risk of pigmentation", "PRP doesn't use heat or light, so the risk of dark patches is low compared with some lasers and strong peels."],
   ["Gentle microneedling settings", "We adjust needle depth to your skin, so it heals well without irritation."],
   ["Sun protection matters", "Kerala's strong sun can undo your results. Daily SPF is the most important part of aftercare."],
   ["Careful with melasma", "Melasma flares easily. Our doctors decide if PRP suits you and plan a gentle approach."],
 ])}</div></div>
 <div class="cp-split-sep">${head("Compare methods", "PRP Injections vs PRP + Microneedling", "")}
 ${k.compareTable(["PRP injections", "PRP + microneedling"], [
   ["Best for", "Under-eyes, fine lines, glow", "Acne scars, pores, texture"],
   ["Coverage", "Targeted areas", "Whole face evenly"],
   ["Downtime", "A few hours of bumps", "1–2 days of redness"],
   ["Sessions", "3–5", "3–6"],
 ])}</div>
 </div>`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for PRP Face Treatment?</h2>
 ${img("/wp-content/uploads/2026/07/devi.webp", "Dr. Devi KR, Facelit", 1143, 1376, "cp-img cp-img--wide cp-img--doc")}
 </div>
 ${k.whyList([
   ["Doctor-led treatment", "Our dermatologists assess your skin and choose the right PRP method for your concern."],
   ["Sterile, single-use kits", "Your blood is drawn, processed and used in the same visit with sealed, single-use kits."],
   ["The right method for you", "Injections, microneedling or under-eye PRP, chosen for your skin and your downtime."],
   ["Gentle on Indian skin", "Settings and aftercare planned to protect brown skin from irritation and pigmentation."],
   ["Progress you can see", "Photos at every visit, so you can track your results session by session."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Side Effects and Who Should Wait", "PRP uses your own blood and is very well tolerated. Here's what's normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Redness, like mild sunburn, for 1 to 2 days", "Small bumps that settle within hours", "Mild swelling or a small bruise", "Slight dryness or flaking for a few days"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Have a blood, platelet or clotting disorder", "Take blood thinners", "Are pregnant", "Have active acne, an infection or cold sores on the face", "Have cancer or are on chemotherapy"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "PRP Face Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "PRP Face Treatment at Facelit", "")}
 ${k.links([["/prp-face-treatment-trivandrum/", "Location", "PRP face treatment in Trivandrum"], ["/best-prp-clinic-in-trivandrum-for-hair-and-skin/", "Location", "PRP clinic for skin in Trivandrum"], ["/how-does-prp-treatment-rejuvenate-your-face/", "Guide", "How PRP rejuvenates your face"], ["/cost-of-prp-in-trivandrum/", "Cost", "PRP cost in Trivandrum"]])}`),

  k.cta("Ready to let your own skin do the healing?", "Book a consultation. Our doctors will assess your skin, choose the right PRP method and plan the number of sessions you need."),
];

sections[5] = sections[5].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "PRP Face Treatment in Kerala for Glow, Acne Scars & Fine Lines | Facelit",
  desc: "Doctor-led PRP face treatment (vampire facial) in Trivandrum, Kollam & Thrissur. Your own platelets boost collagen to smooth fine lines, acne scars and pores and restore glow.",
  image: "https://facelit.in/wp-content/uploads/2026/08/NCTF-Treatment.webp",
  faqs,
  procedure: { name: "PRP (Platelet-Rich Plasma) Face Treatment", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face",
    howPerformed: "A small blood sample is spun in a centrifuge to concentrate platelets. The platelet-rich plasma is then injected into the skin with a fine needle or applied during microneedling.",
    preparation: "Doctor consultation and skin assessment, stopping retinoids and exfoliants for a week, avoiding alcohol and blood thinners for 24 hours if advised, and arriving with clean skin.",
    followup: "Leave PRP on the skin for 4 to 6 hours, no makeup for 24 to 48 hours, avoid heat, exercise and actives for several days, and use daily sunscreen. Repeat about every 4 weeks." },
  crumbs: [["Home", "https://facelit.in/"], ["Anti-aging", "https://facelit.in/anti-aging-treatments/"], ["PRP Face Treatment", "https://facelit.in/prp-face-treatment/"]],
});
