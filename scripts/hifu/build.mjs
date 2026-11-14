// Builds the redesigned /hifu/ page around the Ultraformer III machine.
// Usage (from facelit-site/): node scripts/hifu/build.mjs content/pages/hifu.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";

// Claims kept in one place so they're easy to change once confirmed.
const FDA = "US FDA-cleared";
const USP = "Kerala's most advanced HIFU";
const MACHINE = "/wp-content/uploads/2026/11/ultraformer-iii-machine.webp";

const HERO = [A + "anti-aging-after-scaled-1.webp", "Indian woman with a lifted, firm jawline and smooth skin after HIFU at Facelit"];
const BEFORE = [A + "anti-aging-before-scaled-1.webp", "Indian woman with early sagging and fine lines before HIFU", 1920, 2560];
const AFTER = [A + "anti-aging-after-scaled-1.webp", "Indian woman with firmer, lifted skin after HIFU", 1920, 2560];

// Face map: [tab, x%, y%, title, text, bullets, depths, sessions]
const areas = [
  ["Brow lift", 72, 29, "Brow lift", "Lifts heavy, drooping brows and opens up the eyes, without surgery or Botox.", ["More open, awake eyes", "Subtle brow lift"], "3.0 and 4.5 mm", "1, top-up at 12 months"],
  ["Forehead", 50, 17, "Forehead lines and laxity", "Tightens the skin of the forehead so fine lines soften and the skin looks smoother.", ["Smoother forehead", "Firmer skin"], "1.5 and 3.0 mm", "1–2"],
  ["Around the eyes", 26, 40, "Crepey skin around the eyes", "Fine, shallow energy firms thin, crepey skin and softens crow's feet.", ["Firmer eye area", "Softer fine lines"], "1.5 and 2.0 mm", "1–2"],
  ["Cheeks", 30, 54, "Cheeks and mid-face", "Lifts the cheeks and firms the mid-face, softening the folds that form below.", ["Lifted cheeks", "Softer smile lines"], "3.0 and 4.5 mm", "1, top-up at 12 months"],
  ["Jowls &amp; jawline", 70, 74, "Jowls and blurred jawline", "One of HIFU's best areas. Deep energy lifts the jowls and redefines the jawline from the same layer surgeons lift in a facelift.", ["Sharper jawline", "Less jowling", "Natural lift"], "4.5 mm (+3.0 mm)", "1, top-up at 12 months"],
  ["Double chin", 50, 86, "Double chin", "Firms loose skin and reduces small fat under the chin for a cleaner profile.", ["Slimmer under-chin", "Defined profile"], "4.5 and 6.0 mm", "1–2"],
  ["Neck", 50, 97, "Neck lines and loose skin", "Tightens crepey neck skin and softens horizontal neck lines.", ["Smoother, firmer neck", "Softer neck lines"], "1.5 and 3.0 mm", "1–2"],
];

// Depth explorer: [depth, layer, what it does]
const depths = [
  ["1.5 mm", "Upper dermis", "Very shallow energy that refreshes the skin surface, firming fine lines, crepey skin and texture. Ideal around the eyes and on the neck."],
  ["2.0 mm", "Mid dermis", "Targets the collagen-rich middle of the skin for firmness and smoother fine lines."],
  ["3.0 mm", "Deep dermis", "Rebuilds collagen deep in the skin for tightening and better skin quality across the face."],
  ["4.5 mm", "SMAS (muscle layer)", "Reaches the SMAS, the same supportive layer a surgeon lifts in a facelift. This is what gives the lifting effect on the jowls, jawline, cheeks and brows."],
  ["6–13 mm", "Fat layer (body)", "Longer body cartridges reach the fat layer to tighten and contour the tummy, arms and thighs, and help reduce a double chin."],
];

const benefits = [
  ["lift", "Non-Surgical Lift", "Lifts the brows, cheeks, jowls and jawline without cuts, stitches or anaesthesia."],
  ["layers", "Builds New Collagen", "Ultrasound heat triggers fresh collagen and elastin that keep building for months."],
  ["wave", "Smooths Fine Lines", "Firms the skin so fine lines and crepey texture soften."],
  ["shield", "Safe for Indian Skin", "Energy passes under the skin surface, so the risk of pigmentation is low."],
  ["clock", "One Session", "Most people need just one session, with results lasting up to a year or more."],
  ["heal", "No Downtime", "Mild redness at most. Go straight back to work."],
  ["spark", "Natural Results", "A gradual, natural lift, so you look refreshed, not \"done\"."],
  ["drop", "Face &amp; Body", "Also tightens the neck, double chin, tummy, arms and thighs."],
];

const finderResults = [
  { v: "sag", label: "Sagging cheeks or jowls", img: BEFORE, title: "Lift &amp; Contour Plan",
    text: "Ultraformer III reaches the SMAS layer to lift sagging cheeks and jowls from deep within, for a natural, non-surgical lift.",
    young: "One full-face HIFU session, with a review at 3 months.", mature: "One full-face and neck session, with a second session after 3 months if needed.",
    sessions: "1–2", combine: "Yearly top-up" },
  { v: "jaw", label: "Blurred jawline or double chin", img: AFTER, title: "Jawline Definition Plan",
    text: "Deep and body-depth cartridges lift the jawline and firm the area under the chin for a cleaner profile.",
    young: "One face and neck session focused on the jawline and chin.", mature: "Face and neck session, with a second session after 3 months for best definition.",
    sessions: "1–2", combine: "Yearly top-up" },
  { v: "lines", label: "Fine lines and loose skin", img: [A + "anti-aging-hero.webp", "Indian woman with smooth, firm skin", 1716, 1144], title: "Firm &amp; Smooth Plan",
    text: "Shallow and mid-depth cartridges firm the skin and soften fine lines and crepey texture.",
    young: "One full-face session, focusing on the eyes and forehead.", mature: "Full face plus neck, with a top-up at 6 to 12 months.",
    sessions: "1–2", combine: "Yearly top-up" },
  { v: "brows", label: "Heavy brows and tired eyes", img: [A + "skin-hero-1.webp", "Smiling Indian woman with open, bright eyes", 1726, 1152], title: "Bright Eyes Plan",
    text: "HIFU lifts the brow tail and firms crepey skin around the eyes, so you look more awake.",
    young: "One session focused on the brows, forehead and eye area.", mature: "Brows and eye area as part of a full-face session.",
    sessions: "1", combine: "Yearly top-up" },
  { v: "neck", label: "Crepey neck", img: [A + "about-hero.webp", "Facelit doctor consulting a patient", 1151, 768], title: "Neck Tightening Plan",
    text: "Shallow cartridges firm crepey neck skin and soften neck lines.",
    young: "One neck session.", mature: "Face and neck together for an even result.",
    sessions: "1–2", combine: "Yearly top-up" },
  { v: "prevent", label: "Prevent ageing", img: [A + "blog-glow.webp", "Young Indian woman with healthy skin", 1400, 933], title: "Collagen Boost Plan",
    text: "Starting in your 30s helps keep collagen strong, so sagging starts later and stays softer.",
    young: "One full-face session a year.", mature: "One face and neck session a year.",
    sessions: "1 a year", combine: "Good skincare, SPF" },
];

const menuRows = [
  ["HIFU Face · 1 Session", "Popular", "face", "Get flawless-looking skin with a full-face Ultraformer III session.", ["Face", "Lift"], "Full face with multi-depth cartridges.", "None", "1"],
  ["HIFU Face · 2 Sessions", "Firmer", "face", "Get your skin rejuvenated for a fresh look.", ["Face", "Two sessions"], "Two full-face sessions, about 3 months apart.", "None", "2"],
  ["HIFU Face · 3 Sessions", "Complete", "face", "Experience complete skin rejuvenation.", ["Face", "Course"], "Three full-face sessions for mature or very loose skin.", "None", "3"],
  ["HIFU Face &amp; Neck · 1 Session", "Best value", "face neck", "Achieve a tighter, firmer look for the face and neck together.", ["Face", "Neck", "Jawline"], "Face and neck in one visit for an even result.", "None", "1"],
  ["HIFU Neck · 1 Session", "Neck", "neck", "Get rid of loose, sagging skin on the neck.", ["Neck"], "Neck lines and crepey skin with shallow and mid-depth cartridges.", "None", "1"],
];

const faqs = [
  ["What is HIFU?", "HIFU (High-Intensity Focused Ultrasound) is a non-surgical skin lifting and tightening treatment. It focuses ultrasound energy at precise depths under the skin, creating tiny heat points that trigger new collagen and tighten the deep supporting layer, without harming the skin surface."],
  ["What is Ultraformer III?", "Ultraformer III is an advanced HIFU machine that uses Micro and Macro Focused Ultrasound (MMFU). It has multiple cartridges that treat the skin at different depths, from 1.5 mm up to the SMAS layer at 4.5 mm and deeper body layers, so treatment can be precisely tailored to each area."],
  ["Why is Ultraformer III better than regular HIFU?", "It treats more depths with dedicated cartridges, delivers energy quickly and precisely, and is designed for a more comfortable session than older HIFU devices. That means a more tailored lift with less discomfort."],
  ["Is HIFU painful?", "You'll feel warm, prickling or deep tapping sensations, especially over bony areas like the jawline. Most people find Ultraformer III very manageable. We can apply numbing cream and adjust the settings for comfort."],
  ["How many HIFU sessions do I need?", "Most people need just one session. Mature or very loose skin may benefit from a second session after about 3 months. A yearly top-up keeps results going."],
  ["When will I see HIFU results?", "Some people notice a slight lift straight away. The main results build over 2 to 3 months as new collagen forms, and keep improving for up to 6 months."],
  ["How long do HIFU results last?", "Usually 12 to 18 months, depending on your age, skin and lifestyle. A yearly session helps maintain them."],
  ["Is HIFU safe for Indian skin?", "Yes. HIFU energy passes under the skin surface without heating the top layer, so the risk of pigmentation is low, which suits brown skin well."],
  ["What is the downtime?", "There's no real downtime. Mild redness or swelling can last a few hours, and some people feel tender along the jaw for a few days."],
  ["Can HIFU replace a facelift?", "HIFU gives a natural, moderate lift for mild to moderate sagging. It isn't a replacement for surgery when skin is very loose, but it's a great option for people who want to avoid surgery or delay it."],
  ["What age is best for HIFU?", "HIFU works best from the 30s to early 60s, when skin has started to loosen but still has good quality. Starting earlier helps prevent sagging."],
  ["Can HIFU reduce a double chin?", "Yes. Deeper cartridges firm the skin and help reduce small fat under the chin for a cleaner profile."],
  ["Can HIFU be used on the body?", "Yes. Body cartridges tighten loose skin on the tummy, arms and thighs."],
  ["Who should not have HIFU?", "HIFU isn't suitable during pregnancy, with open wounds, active acne or infection in the area, or with metal implants or fillers in the treatment area that your doctor advises against. Tell your doctor about any health conditions."],
  ["Where can I get HIFU in Kerala?", "Facelit offers HIFU with Ultraformer III at our clinic in Trivandrum. Contact us to check availability at our other branches."],
  ["How much does HIFU cost?", "It depends on the area and number of sessions. Face & Neck together offers better value. Book a consultation for a personalised quote."],
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
 <path d="M70 200l-14-10M230 200l14-10M84 262l-10 8M216 262l10 8" stroke="#986a3e" opacity=".45"/>
 </svg>
 ${areas.map(([t, x, y], i) => `<button type="button" class="bx-dot" style="left:${x}%;top:${y}%" data-go="t-areas-${i}" aria-label="${t.replace(/&amp;/g, "and")}">${i + 1}</button>`).join("")}
 </div>
 <p class="cp-note" style="text-align:center">Tap a number to see what HIFU does there.</p>
</div>`;

const areaTabs = tabs("areas", areas.map(([t, , , title, text, more, d, sessions], i) => ({ tab: `${i + 1} · ${t}`, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${title}</h3>
 <p class="cp-p">${text}</p>
 ${list(more)}
 <div class="cp-rec"><div><small>Cartridge depths</small><b>${d}</b></div><div><small>Typical sessions</small><b>${sessions}</b></div></div>` })));

const layerColours = ["#f3dcc4", "#e6c3a0", "#d6a67a", "#b07d55", "#f0e2b8"];
const depthStack = `
<div class="uf-stack" aria-label="Skin layers reached by Ultraformer III cartridges">
 ${depths.map(([d, layer], i) => `<button type="button" class="uf-layer" style="background:${layerColours[i]}" data-go="t-depths-${i}"><span>${layer}</span><b>${d}</b></button>`).join("")}
 <p class="cp-note" style="text-align:center">Tap a layer to see what each cartridge does.</p>
</div>`;
const depthTabs = tabs("depths", depths.map(([d, layer, text]) => ({ tab: d, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${d} · ${layer}</h3>
 <p class="cp-p">${text}</p>` })));

const pageCss = `<style>
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start}}
.bx-face{position:relative;max-width:320px;margin:0 auto}
.bx-face svg{width:100%;height:auto;display:block}
.bx-dot{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;background:#986a3e;color:#fff;font:600 13px/26px Onest,sans-serif;text-align:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.18);cursor:pointer;transition:transform .15s,background .15s}
.bx-dot:hover,.bx-dot[aria-current=true]{background:#3a4d39;transform:translate(-50%,-50%) scale(1.15)}
.bx-dot:focus-visible,.uf-layer:focus-visible{outline:2px solid #3a4d39;outline-offset:2px}
.uf-stack{display:flex;flex-direction:column;gap:4px;max-width:420px;margin:0 auto;width:100%}
.uf-layer{display:flex;justify-content:space-between;align-items:center;gap:1rem;padding:.95rem 1.1rem;border:2px solid transparent;border-radius:.75rem;color:#2d3c2d;font:500 .95rem Onest,sans-serif;cursor:pointer;text-align:left;transition:transform .15s,border-color .15s}
.uf-layer b{font-weight:600;white-space:nowrap;background:rgba(255,255,255,.7);border-radius:999px;padding:.2rem .6rem;font-size:.8rem}
.uf-layer:first-child{border-radius:1.1rem 1.1rem .75rem .75rem}
.uf-layer:hover,.uf-layer[aria-current=true]{border-color:#3a4d39}
.uf-layer[aria-current=true] b{background:#3a4d39;color:#fdf7ef}
</style>`;

const pageJs = `<script>(function(){
function wire(sel,prefix){var items=[].slice.call(document.querySelectorAll(sel));if(!items.length)return;
function mark(id){items.forEach(function(d){d.setAttribute('aria-current',d.dataset.go===id)})}
items.forEach(function(d){d.addEventListener('click',function(){var t=document.getElementById(d.dataset.go);if(t){t.click();mark(d.dataset.go);if(window.innerWidth<900)t.closest('[data-tabs]').scrollIntoView({behavior:'smooth',block:'start'})}})});
document.querySelectorAll('[id^='+prefix+']').forEach(function(t){t.addEventListener('click',function(){mark(t.id)})});mark(prefix+'0');}
wire('.bx-dot','t-areas-');wire('.uf-layer','t-depths-');
})();</script>`;

const sections = [
  k.hero({
    tags: ["Anti-ageing", "Ultraformer III", "No downtime"], h1: "HIFU Skin Tightening with Ultraformer III",
    img: HERO, pos: "50% 30%",
    intro: "Sagging cheeks, a blurred jawline or skin that's lost its firmness? HIFU uses focused ultrasound to lift and tighten from deep within, reaching the same layer surgeons lift in a facelift, with no cuts and no downtime. At Facelit we use the Ultraformer III, one of the most advanced HIFU machines available, for a precise, comfortable, natural-looking lift.",
    facts: [["30–90 min", "Per session"], ["None", "Downtime"], ["1", "Session for most"], ["12–18 months", "Results last"]],
    cta2: ["#machine", "Meet the machine"],
  }),
  k.jump([["overview", "Overview"], ["machine", "Ultraformer III"], ["depths", "4 depths"], ["face-map", "Face map"], ["finder", "Find your plan"], ["plans", "Packages"], ["process", "Process"], ["results", "Results"], ["compare", "Compare"], ["faq", "FAQs"]]),

  shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is HIFU?</h2>
 <div class="cp-prose">
 <p>As we age, the skin loses collagen and the deep supporting layer under it, called the SMAS, starts to loosen. Cheeks drop, jowls form, the jawline blurs and the brows feel heavy.</p>
 <p>HIFU (High-Intensity Focused Ultrasound) focuses ultrasound energy at precise depths under the skin. Each pulse creates tiny points of heat that contract and tighten the tissue straight away and then trigger fresh collagen and elastin for months afterwards. The skin surface is left untouched, so there's no wound and no downtime, just a gradual, natural-looking lift.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: what is the SMAS, and why does it matter? ${k.plus}</summary>
 <div class="cp-prose">
 <p>The SMAS (superficial muscular aponeurotic system) is the layer of tissue that holds up your face. It's the layer a surgeon tightens during a facelift. Creams, peels and most lasers can't reach it.</p>
 <p>HIFU is one of the only non-surgical treatments that can reach it. Ultraformer III's 4.5 mm cartridge targets it directly, which is why HIFU can truly lift the jowls, jawline, cheeks and brows, not just tighten the surface.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="How HIFU works">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>1. Focus</b><span>Ultrasound is focused at exact depths under the skin.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>2. Contract</b><span>Tiny heat points tighten the tissue straight away.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>3. Rebuild</b><span>New collagen keeps lifting and firming for up to 6 months.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img(...BEFORE)}
 ${img(...AFTER)}
 </div>
 </div>`),

  shell("machine", `
 ${k.machine({ imgSrc: MACHINE, imgAlt: "Ultraformer III HIFU machine at Facelit, Trivandrum", w: 294, h: 730, badge: FDA,
   name: "Ultraformer III: Our HIFU Machine", text: "Ultraformer III is a world-leading HIFU platform for multi-depth lifting and contouring of the face and body. It uses Micro and Macro Focused Ultrasound (MMFU), with dedicated cartridges that each reach a precise depth, from the upper skin to the SMAS lifting layer and deeper into the body. That precision means a lift tailored to every area of your face, in a faster and more comfortable session than older HIFU devices.",
   tags: [USP, FDA, "Micro &amp; Macro Focused Ultrasound", "Face, neck &amp; body"],
   specs: [["MMFU", "Micro and macro focused ultrasound"], ["1.5–4.5 mm", "Face cartridges, skin to SMAS"], ["6–13 mm", "Body cartridges for contouring"], ["Fast &amp; precise", "Quicker, more comfortable sessions"]],
   link: ["/ultraformer-iii/", "See the full machine details"] })}
 <h3 class="cp-h3 font-serif" style="margin-top:2.5rem">Why Ultraformer III stands out</h3>
 <div class="cp-faq cp-faq--compact">${accordion([
   ["More depths, more precision", "Most basic HIFU devices offer one or two depths. Ultraformer III has dedicated cartridges for several depths, so every layer of your face can be treated exactly where it needs it."],
   ["Lifts, not just tightens", "Its 4.5 mm cartridge reaches the SMAS, the facelift layer, for a real lifting effect on jowls, jawline, cheeks and brows."],
   ["Faster, more comfortable sessions", "Energy is delivered quickly and precisely, so sessions are shorter and many people find them more comfortable than older HIFU."],
   ["Face and body in one machine", "Body cartridges tighten the tummy, arms and thighs, and help with a double chin."],
   ["Safe for brown skin", "The energy bypasses the skin surface, keeping the risk of pigmentation low for Indian skin."],
 ])}</div>`),

  shell("depths", `${head("The technology", "One Machine, Every Layer of Your Skin", "Ultraformer III treats your skin at different depths, like rebuilding a house from the foundations up. Tap a layer to see what each cartridge does.")}
 <div class="bx-wrap">${depthStack}<div>${depthTabs}</div></div>`),

  shell("face-map", `${head("Treatment areas", "Where Does HIFU Lift? Tap the Face Map", "Tap a number, or pick an area from the list, to see what HIFU does there and the cartridge depths we use.")}
 <div class="bx-wrap">${face}<div>${areaTabs}</div></div>
 <div class="cp-two cp-two--tight" style="margin-top:2rem">
 <div class="cp-card"><h3 class="font-serif">Body tightening too</h3>${list(["Tummy: firms loose skin after weight loss or pregnancy", "Arms: tightens soft, loose upper arms", "Thighs: firms inner and outer thighs"])}</div>
 <div class="cp-card"><h3 class="font-serif">Best results for</h3>${list(["Mild to moderate sagging", "People in their 30s to early 60s", "Anyone wanting to avoid or delay surgery"])}</div>
 </div>`),

  shell("finder", `${head("Find your plan", "Which HIFU Plan Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan at your consultation.")}
 ${k.finder({ q1: "What bothers you most?", q2: { label: "How old are you?", dt: "Our suggestion", options: [["young", "Under 40"], ["mature", "40 or older"]] }, results: finderResults })}`),

  shell("", `${head("What to expect", "Benefits of HIFU with Ultraformer III", "A real, natural lift from deep within, with no surgery and no downtime.")}${k.benefitsGrid(benefits)}`),

  shell("plans", `${head("Packages", "HIFU Packages at Facelit", "Single sessions for the face or neck, face and neck together, or a course for mature skin.")}
 ${k.menu([["all", "All"], ["face", "Face"], ["neck", "Neck"]], menuRows, "packages")}
 <p class="cp-note">*T&amp;C apply. Get in touch with our team to learn more.</p>`),

  shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">HIFU Treatment Procedure</h2>
 ${k.processTabs([
   { tab: "01 · Before", img: [A + "about-hero.webp", "Facelit doctor assessing skin laxity before HIFU", 1151, 768], lead: "A proper assessment comes first.",
     items: ["Your doctor checks your skin laxity and plans the areas and depths.", "Avoid sunburn and strong actives like retinoids for a few days before.", "Tell us about any fillers, threads or implants in the area.", "Come with clean skin and no makeup.", "Take photos so you can compare at 3 months."] },
   { tab: "02 · During", img: [MACHINE, "Ultraformer III HIFU machine", 294, 730], lead: "A session takes 30 to 90 minutes, depending on the areas.",
     items: ["Numbing cream can be applied for comfort.", "A cool ultrasound gel is spread over the area.", "The doctor maps the face and moves the handpiece line by line.", "Each cartridge treats a different depth, from the surface to the SMAS.", "You'll feel warm, prickling or tapping sensations, mostly over bone."] },
   { tab: "03 · After", img: AFTER, lead: "Go straight back to your day.",
     items: ["Mild redness or swelling for a few hours.", "The jawline may feel tender for a few days.", "Use gentle skincare and sunscreen.", "Results build over 2 to 3 months as collagen forms.", "We review your results at 3 months."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "HIFU Results Timeline", "HIFU works with your body's own collagen, so results build naturally over months.")}
 ${k.timeline([["Day 1", "Instant firmness", "A slight lift and tighter feel from the immediate tissue contraction."], ["Weeks 4–8", "Collagen kicks in", "Skin starts to look firmer and smoother."], ["Months 2–3", "Visible lift", "Jawline, cheeks and brows look lifted. We review you at 3 months."], ["Up to 6 months", "Keeps improving", "Collagen keeps building. Results usually last 12 to 18 months."]])}
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After 3 months</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 <div class="cp-two cp-two--tight" style="margin-top:1rem">
 <div class="cp-card"><h3 class="font-serif">A good fit if you</h3>${list(["Have mild to moderate sagging", "Have a blurred jawline, jowls or heavy brows", "Want a lift without surgery or downtime", "Want to prevent sagging in your 30s"])}</div>
 <div class="cp-card"><h3 class="font-serif">Not ideal if you</h3>${list(["Have very loose, heavy skin (surgery may help more)", "Are pregnant", "Have open wounds, active acne or infection in the area", "Have metal implants in the treatment area"], warn)}</div>
 </div>
 </div>
 </div>`),

  shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "HIFU Aftercare", "There's no real downtime, but a few simple steps help your results.")}${tabs("aftercare", [
   { tab: "First 48 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Use a gentle cleanser and moisturiser", "Apply sunscreen", "Drink plenty of water", "Use a cold pack if you feel tender"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Very hot showers, saunas and steam", "Heavy exercise on the day", "Retinoids and acids for 3 days", "Pressing hard on tender spots"], warn)}</div></div>` },
   { tab: "Next 3 months", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Wear SPF 30 or higher every day", "Keep up good skincare", "Eat protein and stay hydrated to support collagen", "Come for your 3-month review"])}</div><div class="cp-card"><h3 class="font-serif">Remember</h3>${list(["Results build gradually", "Compare photos at 3 months", "A yearly top-up keeps results"])}</div></div>` },
 ])}</div>
 <div class="cp-split-sep">${head("Myths vs facts", "HIFU Myths, Busted", "")}<div class="cp-faq cp-faq--compact">${accordion([
   ["\"All HIFU machines are the same.\"", "Machines differ in depths, precision and comfort. Ultraformer III's multi-depth cartridges allow a far more tailored lift."],
   ["\"HIFU results show immediately.\"", "There's a slight instant lift, but the real results come from new collagen over 2 to 3 months."],
   ["\"HIFU melts your face fat.\"", "On the face, HIFU targets the skin and SMAS to lift and tighten. Body cartridges are used where fat reduction is wanted."],
   ["\"It's only for older people.\"", "Many people start in their 30s to keep collagen strong and delay sagging."],
   ["\"HIFU is the same as a facelift.\"", "HIFU gives a natural, moderate lift without surgery. Very loose skin may still need a surgical facelift."],
 ])}</div></div>
 </div>`),

  shell("compare", `${head("Compare", "Ultraformer III vs Basic HIFU vs Facelift", "How Facelit's HIFU compares with older devices and surgery.")}
 ${k.compareTable(["Ultraformer III HIFU", "Basic HIFU devices", "Surgical facelift"], [
   ["Depths treated", "Multiple, 1.5 mm to SMAS, plus body", "Usually 1 to 2", "Surgeon lifts the SMAS directly"],
   ["Lift", "Natural, moderate lift", "Mild tightening", "Strong, dramatic lift"],
   ["Comfort", "Fast, precise, more comfortable", "Often more uncomfortable", "General anaesthesia"],
   ["Downtime", "None", "None", "2 to 4 weeks"],
   ["Sessions", "Usually 1", "Often several", "1 operation"],
   ["Results last", "12–18 months", "Varies", "Years"],
 ])}`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for HIFU?</h2>
 ${img("/wp-content/uploads/2026/07/devi.webp", "Dr. Devi KR, Facelit", 1143, 1376, "cp-img cp-img--wide cp-img--doc")}
 </div>
 ${k.whyList([
   ["Ultraformer III technology", `${USP}, with multi-depth cartridges for a precise, tailored lift.`],
   ["Doctor-planned treatment", "Our dermatologists map your face and choose the right depth for every area."],
   ["Comfort first", "Numbing cream and adjustable settings, so your session feels manageable."],
   ["Honest advice", "If your skin needs more than HIFU can give, we'll tell you and explain your options."],
   ["3-month review", "We check your results when collagen has had time to build."],
 ])}
 </div>`),

  shell("", `${head("Safety first", "Side Effects and Who Should Wait", "HIFU is non-invasive and very well tolerated. Here's what's normal and when to check with your doctor first.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Mild redness or swelling for a few hours", "Tenderness along the jawline for a few days", "Tingling or slight numbness that settles", "Rarely, small bruises or welts that fade"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant", "Have open wounds, active acne or infection in the area", "Have metal implants, a pacemaker or recent fillers or threads in the area", "Have a bleeding disorder or take blood thinners", "Have had recent facial surgery"], warn)}</div>
 </div>`),

  shell("faq", `${head("Questions", "HIFU &amp; Ultraformer III FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Near you &amp; further reading", "HIFU at Facelit", "")}
 ${k.links([["/hifu-skin-tightening-in-trivandrum/", "Location", "HIFU skin tightening in Trivandrum"], ["/ultraformer-iii/", "Equipment", "Ultraformer III machine"], ["/jawline-lift-treatment-in-trivandrum/", "Guide", "Jawline lift treatment"]])}`),

  k.cta("Ready for a natural lift without surgery?", "Book a consultation. Our doctors will assess your skin and plan an Ultraformer III treatment for the areas that matter most to you."),
];

sections[4] = sections[4].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "HIFU Skin Tightening in Trivandrum | Ultraformer III | Facelit",
  desc: "Non-surgical HIFU face lift with Ultraformer III at Facelit, Trivandrum. Multi-depth focused ultrasound lifts jowls, jawline, cheeks and brows and tightens skin. One session, no downtime.",
  image: "https://facelit.in/wp-content/uploads/2026/08/anti-aging-after-scaled-1.webp",
  faqs,
  procedure: { name: "HIFU (High-Intensity Focused Ultrasound) Skin Tightening with Ultraformer III", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face, neck and body",
    howPerformed: "Ultraformer III cartridges deliver micro- and macro-focused ultrasound at set depths (1.5 to 4.5 mm on the face, deeper on the body), creating thermal coagulation points that tighten tissue and stimulate new collagen.",
    preparation: "Doctor assessment of skin laxity, avoiding sunburn and strong actives beforehand, and clean skin without makeup.",
    followup: "No downtime. Gentle skincare and daily sunscreen; results build over 2 to 3 months, with review at 3 months and yearly maintenance." },
  crumbs: [["Home", "https://facelit.in/"], ["Anti-aging", "https://facelit.in/anti-aging-treatments/"], ["HIFU", "https://facelit.in/hifu/"]],
});
