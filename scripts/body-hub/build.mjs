// Builds the redesigned /body-treatments/ category hub page.
// Usage (from facelit-site/): node scripts/body-hub/build.mjs content/pages/body-treatments.json
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, img, list, tabs, accordion, warn } = k;

const A = "/wp-content/uploads/2026/08/";
const B = "/wp-content/uploads/2026/07/";
const M = "/wp-content/uploads/2026/11/";

const HERO = [A + "obesity-weight-management-hero.webp", "Confident, fit Indian woman after body treatments at Facelit"];
const BEFORE = [A + "obesity-before-scaled-1.webp", "Indian woman before body contouring", 1920, 2560];
const AFTER = [A + "obesity-after-scaled-1.webp", "The same Indian woman with a firmer, more toned shape", 1920, 2560];

// Treatments: key -> [url, name, image, alt, w, h, isMachine, line, bestFor, downtime, sessions]
const T = {
  cm: ["/cm-slim/", "CM Slim", A + "obesity-weight-management-hero.webp", "Fit, smiling Indian woman", 1769, 1180, false, "HI-EMT muscle toning that builds muscle and reduces stubborn fat.", "Tummy, buttocks, arms, thighs", "None", "4, over 2 weeks"],
  hifu: ["/hifu/", "HIFU Body Tightening", A + "anti-aging-after-scaled-1.webp", "Indian woman with a firm, defined jawline", 1920, 2560, false, "Ultraformer III focused ultrasound to tighten loose skin and a double chin.", "Loose skin, double chin", "None", "1–3"],
  lhr: ["/laser-hair-reduction/", "Laser Hair Reduction", M + "gentlemax-pro-machine.webp", "Candela GentleMax Pro laser hair reduction machine", 355, 830, true, "Long-term reduction of unwanted hair on the face and body.", "Underarms, legs, arms, face, bikini", "None", "6–8"],
  mnrf: ["/mnrf-treatment/", "MNRF Treatment", M + "vivace-mnrf-machine.webp", "Vivace microneedle RF machine", 320, 740, true, "Microneedling with radiofrequency for stretch marks, scars and loose skin.", "Stretch marks, scars, crepey skin", "1–3 days", "3–4"],
  glu: ["/glutathione-iv-drip/", "Glutathione IV Drip", B + "466-iv-drip-tvm-1.webp", "Glutathione IV drip bag", 515, 515, false, "An antioxidant drip for brighter, more even skin and wellness.", "Tan, dull or uneven skin tone", "None", "4–8, weekly"],
};
const chip = (x) => `<a href="${T[x][0]}">${T[x][1]} ${k.arrow}</a>`;
const extra = { peel: ["/chemical-peel-treatment/", "Chemical peels"], prof: ["/profhilo-body-treatments/", "Profhilo Body"], contour: ["/body-contouring/", "Body contouring guide"], weight: ["/medical-weight-management/", "Medical weight management"], pico: ["/pico-450-laser/", "PICO 450 laser"] };
const echip = (x) => `<a href="${extra[x][0]}">${extra[x][1]} ${k.arrow}</a>`;

// Body map: [tab, x%, y%, problem, treatment keys, extra keys]
const areas = [
  ["Face &amp; chin", 50, 9, "Unwanted facial hair on the upper lip, chin or sides of the face, and a double chin.", ["lhr", "hifu"], []],
  ["Underarms", 30, 25, "Unwanted hair and dark underarms from shaving, friction or deodorants.", ["lhr"], ["peel"]],
  ["Arms", 19, 40, "Soft, loose upper arms and unwanted arm hair.", ["cm", "hifu", "lhr"], ["prof"]],
  ["Tummy", 50, 42, "Stubborn belly fat, a soft core, loose skin and stretch marks after pregnancy or weight loss.", ["cm", "hifu", "mnrf"], ["contour"]],
  ["Buttocks", 64, 55, "Flat or sagging buttocks and stretch marks on the hips.", ["cm", "mnrf"], []],
  ["Thighs", 40, 66, "Loose or soft thighs, stretch marks and unwanted hair.", ["cm", "hifu", "lhr", "mnrf"], []],
  ["Knees &amp; elbows", 39, 79, "Dark, rough skin on knees and elbows.", ["glu"], ["peel"]],
  ["Legs", 60, 90, "Unwanted leg hair and ingrown hairs from shaving or waxing.", ["lhr"], []],
];

const concerns = [
  ["Unwanted hair", "Shaving, waxing and threading are endless and can cause ingrown hairs and dark skin. Laser hair reduction gives long-term smoothness.", ["lhr"], []],
  ["Stubborn fat", "Fat that won't move with diet and exercise needs targeted treatment that also tones the muscle underneath.", ["cm"], ["contour", "weight"]],
  ["Loose skin", "Weight loss, pregnancy and age can leave skin loose on the tummy, arms and thighs.", ["hifu", "mnrf"], ["prof"]],
  ["Stretch marks", "Stretch marks fade and smooth best with collagen-building treatments.", ["mnrf"], []],
  ["Dark knees, elbows &amp; underarms", "Friction, shaving and sun darken these areas. Brightening treatments help them even out.", ["glu"], ["peel"]],
  ["Body tan &amp; dull skin", "Kerala's sun leaves a stubborn tan on the arms, neck and back.", ["glu"], ["peel", "pico"]],
];

const finderResults = [
  { v: "hair", label: "Unwanted body hair", img: [A + "about-hero.webp", "Facelit doctor consulting a patient about laser hair reduction", 1151, 768], title: "Smooth Skin Plan",
    text: "Laser hair reduction targets the root, so hair grows back finer and sparser over a course of sessions.",
    none: "Laser hair reduction, with no downtime.", some: "Laser hair reduction, plus a peel later for any dark patches left by shaving.",
    sessions: "6–8, every 4–6 weeks", combine: "Brightening peels" },
  { v: "fat", label: "Stubborn belly fat", img: BEFORE, title: "Sculpt &amp; Tone Plan",
    text: "CM Slim builds muscle and reduces the fat on top for a firmer, flatter tummy.",
    none: "A CM Slim course on the tummy.", some: "CM Slim, plus HIFU or MNRF if the skin is loose.",
    sessions: "4 sessions over 2 weeks", combine: "Body composition analysis" },
  { v: "loose", label: "Loose skin", img: AFTER, title: "Firm &amp; Tighten Plan",
    text: "Ultrasound and radiofrequency rebuild collagen to tighten loose skin on the tummy, arms and thighs.",
    none: "HIFU body tightening, with no downtime.", some: "MNRF for deeper tightening and texture.",
    sessions: "1–4 sessions", combine: "CM Slim" },
  { v: "stretch", label: "Stretch marks", img: [A + "anti-aging-hero.webp", "Indian woman", 1716, 1144], title: "Stretch Mark Plan",
    text: "Stretch marks fade and smooth with collagen-building treatments over a few sessions.",
    none: "Gentle collagen-boosting care to start.", some: "MNRF for the strongest improvement in texture and colour.",
    sessions: "3–4 sessions", combine: "Daily moisturising" },
  { v: "dark", label: "Dark knees, elbows or underarms", img: [A + "skin-after-1-scaled.webp", "Indian woman with even skin", 1920, 2560], title: "Even Tone Plan",
    text: "Brightening treatments, gentle exfoliation and less friction help dark areas even out.",
    none: "Glutathione drips and gentle home care.", some: "Medical-grade brightening peels for faster results.",
    sessions: "4–6 sessions", combine: "Laser hair reduction for underarms" },
  { v: "glow", label: "Tan and dull body skin", img: [B + "466-iv-drip-tvm-1.webp", "IV drip", 515, 515], title: "Body Glow Plan",
    text: "Fade tan and boost glow from within and on the surface.",
    none: "Weekly glutathione IV drips with daily SPF.", some: "Glutathione drips plus body peels.",
    sessions: "4–8 sessions", combine: "Daily SPF" },
];

const faqs = [
  ["What body treatments does Facelit offer?", "We offer CM Slim body sculpting, HIFU body tightening, laser hair reduction, MNRF for stretch marks and loose skin, and glutathione IV drips, along with body contouring and weight management programmes."],
  ["Are body treatments safe?", "Yes, when planned and done by trained professionals. Our body treatments are non-surgical, and we screen everyone for things like pregnancy, implants and medical conditions before starting."],
  ["Is laser hair reduction permanent?", "Laser gives long-term hair reduction. Most people see 70 to 90% less hair after a full course, and the hair that remains is finer and lighter. A top-up session now and then keeps results."],
  ["Is laser hair reduction safe for Indian skin?", "Yes, with the right laser and settings. Lasers like the Nd:YAG wavelength are well suited to darker skin, and settings are tailored to your skin and hair type."],
  ["Can stretch marks be removed?", "Stretch marks can't be fully erased, but treatments like MNRF can make them much smoother, flatter and less noticeable, especially newer marks."],
  ["How can I get rid of dark knees, elbows and underarms?", "A mix of brightening treatments, gentle exfoliation, less friction and the right skincare helps. For underarms, laser hair reduction also helps by stopping shaving-related darkening."],
  ["What's the difference between CM Slim and HIFU?", "CM Slim works on muscle and fat to tone and sculpt. HIFU works on the skin's deep layers to tighten loose skin. They're often combined."],
  ["Do body treatments have downtime?", "Most have none. CM Slim, HIFU, laser hair reduction and glutathione drips let you go straight back to your day. MNRF can cause 1 to 3 days of redness."],
  ["How many sessions will I need?", "It depends on the treatment: CM Slim usually 4 sessions, laser hair reduction 6 to 8, MNRF 3 to 4 and HIFU 1 to 3. Your doctor will give you a clear plan."],
  ["Are body treatments suitable for men?", "Yes. Men often choose CM Slim for abs and arms, laser hair reduction for the back and chest, and HIFU for a double chin."],
  ["Where can I get body treatments in Kerala?", "Facelit offers body treatments at our clinics in Trivandrum (Kowdiar), Karunagappally (Kollam) and Guruvayur (Thrissur). Some technologies are available at selected branches, so contact us to check."],
  ["How much do body treatments cost?", "It depends on the treatment, the area and number of sessions. Book a consultation for a clear, personalised quote."],
];

const catNav = `
<nav class="sk-cats" aria-label="Treatment categories">
 <a href="/treatments/">All treatments</a><a href="/skin-treatments/">Skin</a><a href="/best-hair-treatments/">Hair</a><a href="/anti-aging-treatments/">Anti-aging</a><a href="/body-treatments/" aria-current="page">Body</a><a href="/obesity-and-weight-management/">Weight management</a>
</nav>`;

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
 <p class="cp-note" style="text-align:center">Tap a number to see what helps.</p>
</div>`;
const recList = (keys) => `<div class="sk-rec">${keys.map((x) => `<a href="${T[x][0]}"><b>${T[x][1]}</b><span>${T[x][7]}</span>${k.arrow}</a>`).join("")}</div>`;
const areaTabs = tabs("areas", areas.map(([t, , , problem, keys, ex], i) => ({ tab: `${i + 1} · ${t}`, body: `
 <h3 class="cp-h3 font-serif" style="margin-top:0">${t}</h3>
 <p class="cp-p">${problem}</p>
 <p class="cp-eyebrow" style="margin:1rem 0 .6rem">Recommended treatments</p>
 ${recList(keys)}
 ${ex.length ? `<div class="bd-chips">${ex.map(echip).join("")}</div>` : ""}` })));

const concernTabs = tabs("concerns", concerns.map(([t, intro, keys, ex]) => ({ tab: t, body: `
 <p class="cp-p" style="margin-top:0">${intro}</p>
 <p class="cp-eyebrow" style="margin:1rem 0 .6rem">Recommended</p>
 ${recList(keys)}
 ${ex.length ? `<div class="bd-chips">${ex.map(echip).join("")}</div>` : ""}` })));

const cards = `
<div class="sk-cards cp-swipe">
 ${Object.values(T).map(([u, n, s, alt, w, h, mach, line, best, down, sess]) => `<a class="sk-card" href="${u}">${mach ? `<div class="sk-mimg"><img src="${s}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async"></div>` : img(s, alt, w, h, "cp-img cp-img--43")}<div class="sk-cb"><h3 class="font-serif">${n}</h3><p>${line}</p><dl><div><dt>Best for</dt><dd>${best}</dd></div><div><dt>Downtime</dt><dd>${down}</dd></div><div><dt>Sessions</dt><dd>${sess}</dd></div></dl><span class="cp-textlink">Explore ${n} ${k.arrow}</span></div></a>`).join("\n ")}
</div>${k.swipeHint}`;

const tech = `
<div class="sk-tech">
 <a class="sk-t" href="/cm-slim/"><div><img src="${M}cm-slim-machine.webp" alt="CM Slim body sculpting machine" width="310" height="588" loading="lazy" decoding="async"></div><small>Muscle &amp; fat</small><h3 class="font-serif">CM Slim</h3><p>HI-EMT body sculpting.</p></a>
 <a class="sk-t" href="/hifu/"><div><img src="${M}ultraformer-iii-machine.webp" alt="Ultraformer III HIFU machine" width="294" height="730" loading="lazy" decoding="async"></div><small>Skin tightening</small><h3 class="font-serif">Ultraformer III</h3><p>Multi-depth focused ultrasound.</p></a>
 <a class="sk-t" href="/laser-hair-reduction/"><div><img src="${M}gentlemax-pro-machine.webp" alt="Candela GentleMax Pro laser" width="355" height="830" loading="lazy" decoding="async"></div><small>Hair reduction</small><h3 class="font-serif">Candela GentleMax Pro</h3><p>Laser hair reduction for all skin types.</p></a>
 <a class="sk-t" href="/mnrf-treatment/"><div><img src="${M}vivace-mnrf-machine.webp" alt="Vivace microneedle RF machine" width="320" height="740" loading="lazy" decoding="async"></div><small>Collagen &amp; texture</small><h3 class="font-serif">Vivace MNRF</h3><p>Microneedle radiofrequency.</p></a>
</div>`;

const pageCss = `<style>
.sk-cats{display:flex;gap:.5rem;overflow-x:auto;padding:.25rem 0 .5rem;scrollbar-width:none;margin-bottom:.5rem}.sk-cats::-webkit-scrollbar{display:none}
.sk-cats a{flex:none;padding:.55rem 1rem;border-radius:999px;border:1px solid rgba(58,77,57,.15);background:#fff;color:#2d3c2d;font:500 .88rem Onest,sans-serif;text-decoration:none;white-space:nowrap}
.sk-cats a[aria-current=page]{background:#3a4d39;color:#fdf7ef;border-color:#3a4d39}
.bx-wrap{display:grid;gap:2rem}.bx-wrap>*{min-width:0}@media(min-width:900px){.bx-wrap{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);align-items:start}}
.bx-body{position:relative;max-width:230px;margin:0 auto}.bx-body svg{width:100%;height:auto;display:block}
.bx-dot{position:absolute;transform:translate(-50%,-50%);width:30px;height:30px;border-radius:50%;background:#986a3e;color:#fff;font:600 13px/26px Onest,sans-serif;text-align:center;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.18);cursor:pointer;transition:transform .15s,background .15s}
.bx-dot:hover,.bx-dot[aria-current=true]{background:#3a4d39;transform:translate(-50%,-50%) scale(1.15)}.bx-dot:focus-visible{outline:2px solid #3a4d39;outline-offset:2px}
.sk-cards{gap:1rem}@media(min-width:760px){.sk-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr))}}@media(min-width:1100px){.sk-cards{grid-template-columns:repeat(3,minmax(0,1fr))}}
.sk-card{display:flex;flex-direction:column;background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.25rem;overflow:hidden;text-decoration:none;color:#2d3c2d;transition:border-color .15s,transform .15s}
.sk-card:hover{border-color:#3a4d39;transform:translateY(-2px)}.sk-card .cp-img{border-radius:0;margin:0}
.sk-mimg{height:200px;background:#fff;display:flex;justify-content:center;align-items:center;padding:.75rem;border-bottom:1px solid rgba(58,77,57,.08);overflow:hidden}.sk-mimg img{height:176px;width:auto;max-width:100%;object-fit:contain}.sk-card .cp-img--43{height:200px;width:100%;object-fit:cover;aspect-ratio:auto}
.sk-cb{padding:1rem 1.1rem 1.2rem;display:flex;flex-direction:column;gap:.5rem;flex:1}
.sk-cb h3{margin:0;font-size:1.3rem;color:#2d3c2d}.sk-cb p{margin:0;font-size:.92rem;line-height:1.5;color:#5c574f}
.sk-cb dl{margin:.25rem 0 .4rem;display:grid;gap:.3rem}.sk-cb dl div{display:flex;gap:.5rem;font-size:.85rem}.sk-cb dt{color:#986a3e;font-weight:600;min-width:74px}.sk-cb dd{margin:0;color:#2d3c2d}
.sk-cb .cp-textlink{margin-top:auto}
.sk-rec{display:grid;gap:.6rem}
.sk-rec a{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-areas:"b i" "s i";column-gap:.75rem;align-items:center;padding:.85rem 1rem;border:1px solid rgba(58,77,57,.14);border-radius:1rem;background:#fff;text-decoration:none;color:#2d3c2d}
.sk-rec a:hover{border-color:#3a4d39;background:#f3efe4}.sk-rec b{grid-area:b;font:600 1rem Onest,sans-serif}.sk-rec span{grid-area:s;font-size:.85rem;color:#5c574f;line-height:1.4}.sk-rec svg{grid-area:i;width:1rem;height:1rem;color:#986a3e}
.bd-chips{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.9rem}
.bd-chips a{display:inline-flex;align-items:center;gap:.35rem;padding:.5rem .85rem;border-radius:999px;background:#f3efe4;border:1px solid rgba(58,77,57,.15);color:#2d3c2d;font:500 .85rem Onest,sans-serif;text-decoration:none}
.bd-chips a:hover{background:#3a4d39;color:#fdf7ef}.bd-chips svg{width:.85rem;height:.85rem}
.sk-tech{display:grid;gap:.75rem;grid-template-columns:repeat(2,minmax(0,1fr))}@media(min-width:900px){.sk-tech{grid-template-columns:repeat(4,minmax(0,1fr))}}
.sk-t{display:flex;flex-direction:column;gap:.3rem;background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.1rem;padding:.8rem;text-decoration:none;color:#2d3c2d}
.sk-t:hover{border-color:#3a4d39}.sk-t>div{display:flex;justify-content:center;height:150px;margin-bottom:.4rem}.sk-t img{height:100%;width:auto;object-fit:contain}
.sk-t small{font:600 .64rem Onest,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#986a3e}.sk-t h3{margin:0;font-size:1.02rem;line-height:1.25;color:#2d3c2d}.sk-t p{margin:0;font-size:.82rem;line-height:1.45;color:#5c574f}
@media(max-width:759px){.sk-cards.cp-swipe>.sk-card{flex:0 0 82%}}
</style>`;

const pageJs = `<script>(function(){
var dots=[].slice.call(document.querySelectorAll('.bx-dot'));
function mark(id){dots.forEach(function(d){d.setAttribute('aria-current',d.dataset.go===id)})}
dots.forEach(function(d){d.addEventListener('click',function(){var t=document.getElementById(d.dataset.go);if(t){t.click();mark(d.dataset.go);if(window.innerWidth<900)t.closest('[data-tabs]').scrollIntoView({behavior:'smooth',block:'start'})}})});
document.querySelectorAll('[id^=t-areas-]').forEach(function(t){t.addEventListener('click',function(){mark(t.id)})});mark('t-areas-0');
})();</script>`;

const sections = [
  k.hero({
    tags: ["Body", "Non-surgical", "Doctor-led"], h1: "Body Treatments in Kerala",
    img: HERO, pos: "62% 30%",
    intro: "Stubborn belly fat, loose skin, stretch marks, unwanted hair or dark underarms and knees? Our body treatments tackle the things that knock your confidence, without surgery. From CM Slim body sculpting and HIFU skin tightening to laser hair reduction, MNRF and glutathione drips, our doctors match each concern to the right technology for results you can see and feel.",
    facts: [["5", "Body treatments"], ["0", "Surgery"], ["Most", "No downtime"], ["3", "Clinics in Kerala"]],
    cta2: ["#body-map", "Find your treatment"],
  }),
  shell("", `${catNav}${k.jump([["body-map", "Body map"], ["concerns", "Concerns"], ["treatments", "Treatments"], ["finder", "Find your plan"], ["compare", "Compare"], ["technology", "Technology"], ["journey", "Your journey"], ["faq", "FAQs"]])}`, "p-0 bg-transparent border-0"),

  shell("body-map", `${head("Start with the area", "Which Area Bothers You? Tap the Body Map", "Tap a number to see what's going on and the treatments that help most.")}
 <div class="bx-wrap">${body}<div>${areaTabs}</div></div>`),

  shell("concerns", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("By concern", "What Would You Like to Fix?", "Tap a concern to see the treatments our doctors recommend.")}
 ${concernTabs}
 </div>
 <div class="cp-split-sep">
 ${head("Good to know", "Body Care for Indian Skin", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Why dark patches are so common", "Friction, shaving, waxing, tight clothes and sun all trigger extra pigment in brown skin, especially on underarms, knees, elbows and the neck."],
   ["Laser on darker skin", "Darker skin needs the right laser wavelength and careful settings. We tailor every session to your skin and hair type."],
   ["Stretch marks after pregnancy", "Newer, pink or purple marks respond best. Starting treatment earlier gives better results."],
   ["Sun protection for the body", "Sunscreen isn't just for the face. Arms, neck and back tan quickly in Kerala's sun."],
 ], false)}</div>
 </div>
 </div>`),

  shell("treatments", `${head("Our body treatments", "Body Treatments at Facelit", "Tap a treatment to explore how it works, results, aftercare and packages.")}${cards}`),

  shell("finder", `${head("Find your plan", "Which Body Treatment Is Right for You?", "Answer two quick questions to see the plan our doctors most often recommend. We confirm your final plan at your consultation.")}
 ${k.finder({ q1: "What's your main concern?", q2: { label: "Can you take a day or two of redness?", dt: "Our suggestion", options: [["none", "No, I need zero downtime"], ["some", "Yes, that's fine"]] }, results: finderResults })}`),

  shell("compare", `${head("Compare treatments", "Body Treatments at a Glance", "Scroll sideways on mobile to see every column.")}
 ${k.compareTable(Object.values(T).map(([u, n]) => `<a href="${u}">${n}</a>`), [
   ["What it does", "Builds muscle, reduces fat", "Tightens loose skin", "Long-term hair reduction", "Smooths stretch marks and tightens", "Brightens from within"],
   ["Best for", ...Object.values(T).map((t) => t[8])],
   ["Downtime", ...Object.values(T).map((t) => t[9])],
   ["Typical sessions", ...Object.values(T).map((t) => t[10])],
 ])}`),

  shell("technology", `${head("Our technology", "The Machines Behind Your Results", "Advanced, non-invasive technology used by trained professionals.")}${tech}`),

  shell("", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Common problems", "Problems We Solve Every Day", "Tap a problem that sounds like yours.")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["\"I'm tired of shaving and waxing.\"", "Laser hair reduction gives long-term smoothness, with fewer ingrown hairs and less dark skin from shaving."],
   ["\"My tummy changed after pregnancy.\"", "CM Slim rebuilds the core, HIFU or MNRF tighten skin, and MNRF helps stretch marks, once your doctor says you've healed."],
   ["\"My underarms are dark.\"", "Shaving and friction are common causes. Laser hair reduction plus brightening treatments often makes a big difference."],
   ["\"My arms are soft and loose.\"", "CM Slim tones the muscle, and HIFU or Profhilo Body tighten the skin over it."],
   ["\"I've lost weight but the skin is loose.\"", "Skin tightening with HIFU and MNRF helps your skin catch up with your new shape."],
 ])}</div>
 </div>
 <div class="cp-split-sep">
 ${head("Near you", "Body Treatments in Trivandrum, Kollam &amp; Thrissur", "")}
 <div class="cp-faq cp-faq--compact">${accordion([
   ["Trivandrum (Kowdiar)", "Our flagship clinic with CM Slim, Ultraformer III HIFU and Vivace MNRF. <a href=\"/best-laser-hair-reduction-in-trivandrum/\">Laser hair reduction in Trivandrum</a>"],
   ["Karunagappally, Kollam", "Body treatments for Kollam. <a href=\"/best-laser-hair-reduction-in-karunagappally/\">Laser hair reduction in Karunagappally</a>"],
   ["Guruvayur, Thrissur", "Doctor-led body care in Thrissur. Contact us to check which technologies are available."],
 ], false)}</div>
 <p class="cp-note">Not every technology is at every branch. Call us and we'll guide you to the right clinic.</p>
 </div>
 </div>`),

  shell("journey", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your body journey</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">A Plan Built Around Your Body</h2>
 ${k.processTabs([
   { tab: "01 · Consult", img: [A + "about-hero.webp", "Facelit doctor consulting a patient", 1151, 768], lead: "We start by understanding your goals.",
     items: ["What bothers you and what you'd like to change.", "Your health, medicines and any implants or devices.", "Realistic expectations for each treatment."] },
   { tab: "02 · Plan", img: [M + "cm-slim-machine.webp", "CM Slim machine", 310, 588], lead: "The right technology for each concern.",
     items: ["Treatments chosen for each area and concern.", "The right order and timing if you're combining treatments.", "A clear plan with sessions and costs."] },
   { tab: "03 · Treat &amp; review", img: AFTER, lead: "Results you can track.",
     items: ["Comfortable, non-surgical sessions.", "Aftercare guidance for each treatment.", "Progress photos and reviews."] },
 ])}
 </div>`, "p-0"),

  shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Results", "Feel Confident in Your Skin", "Non-surgical body treatments give gradual, natural results that build over weeks.")}
 <div class="cp-two cp-two--tight">
 <div class="cp-card"><h3 class="font-serif">Good to know</h3>${list(["Most treatments need a short course", "Results build over 1 to 3 months", "A stable weight helps results last", "Daily SPF protects body skin too"])}</div>
 <div class="cp-card"><h3 class="font-serif">Tell us if you</h3>${list(["Are pregnant or recently gave birth", "Have a pacemaker or metal implants", "Have a skin infection in the area", "Take regular medicines"], warn)}</div>
 </div>
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img(...BEFORE)}<figcaption>Before</figcaption></figure>
 <figure>${img(...AFTER)}<figcaption>After</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Results vary from person to person.</p>
 </div>
 </div>`),

  shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Body Treatments?</h2>
 ${img("/wp-content/uploads/2026/07/devi.webp", "Dr. Devi KR, Facelit", 1143, 1376, "cp-img cp-img--wide cp-img--doc")}
 </div>
 ${k.whyList([
   ["Doctor-led plans", "Every plan is built around your body, health and goals."],
   ["Advanced technology", "CM Slim, Ultraformer III, Candela GentleMax Pro and Vivace MNRF."],
   ["Safe for Indian skin", "Settings and aftercare tailored to brown skin."],
   ["Everything in one place", "Body sculpting, tightening, hair reduction, brightening and weight management."],
   ["Honest advice", "We recommend what you need, and tell you when something won't help."],
 ])}
 </div>`),

  shell("faq", `${head("Questions", "Body Treatment FAQs", "")}
 <div class="cp-faq" data-faq>
 ${accordion(faqs, false, 6)}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`),

  shell("", `${head("Further reading", "Body Care Guides", "")}
 ${k.links([["/body-contouring/", "Guide", "Non-surgical body contouring"], ["/how-can-you-reduce-stretch-marks-with-advanced-treatments/", "Guide", "Reducing stretch marks"], ["/the-truth-about-laser-hair-removal-is-it-permanent/", "Guide", "Is laser hair removal permanent?"], ["/laser-hair-removal-lhr-cost-in-trivandrum/", "Cost", "Laser hair removal cost"], ["/cm-slim-hipex-chair/", "Equipment", "CM Slim &amp; Hipex Chair"], ["/obesity-and-weight-management/", "Category", "Weight management"]])}`),

  k.cta("Ready to feel more confident in your body?", "Book a consultation. We'll look at what's bothering you and recommend the right treatment, and only what you need."),
];

sections[2] = sections[2].replace("</section>", `${pageCss}${pageJs}</section>`);

k.writePage(process.argv[2], sections, {
  title: "Body Treatments in Kerala | CM Slim, Laser Hair Reduction & MNRF | Facelit",
  desc: "Non-surgical body treatments at Facelit, Trivandrum, Kollam & Thrissur: CM Slim sculpting, HIFU tightening, laser hair reduction, MNRF for stretch marks and glutathione IV for glowing skin.",
  image: "https://facelit.in/wp-content/uploads/2026/08/obesity-weight-management-hero.webp",
  faqs,
  procedure: { name: "Non-Surgical Body Treatments", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Body",
    howPerformed: "Doctor-planned non-invasive body treatments including electromagnetic muscle stimulation (CM Slim), focused ultrasound (HIFU), laser hair reduction, microneedle radiofrequency (MNRF) and glutathione IV therapy.",
    preparation: "Consultation and screening for pregnancy, implants and medical conditions.",
    followup: "Treatment-specific aftercare, progress photos and review appointments." },
  crumbs: [["Home", "https://facelit.in/"], ["Treatments", "https://facelit.in/treatments/"], ["Body Treatments", "https://facelit.in/body-treatments/"]],
});
