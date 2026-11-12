// Builds the <main> of /chemical-peel-treatment/ and writes it into the page JSON.
// Usage: node build.mjs <page.json>
import fs from "fs";
const jsonPath = process.argv[2];
const U = "/wp-content/uploads/2026/07/";
const e = (s) => s.replace(/&(?![a-z#0-9]+;)/g, "&amp;");

const arrow = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"/></svg>`;
const plus = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M10 4v12M4 10h12"/></svg>`;
const tick = (c = "currentColor") => `<svg viewBox="0 0 20 20" fill="none" stroke="${c}" stroke-width="1.8" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M6.5 10.5l2.3 2.3 4.7-5"/></svg>`;
const warn = `<svg viewBox="0 0 20 20" fill="none" stroke="#986a3e" stroke-width="1.8" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M10 6v5M10 14h.01"/></svg>`;
const img = (src, alt, w, h, cls = "cp-img", extra = "") => `<img src="${src.startsWith("/") ? src : U + src}" alt="${e(alt)}" width="${w}" height="${h}" class="${cls}" loading="lazy" decoding="async"${extra}>`;
const shell = (id, inner, extraCls = "") => `
 <section${id ? ` id="${id}"` : ""} class="cp-anchor mx-auto max-w-7xl px-5 py-4 sm:px-8 sm:py-5">
 <div class="liquid-glass--section overflow-hidden rounded-[1.75rem] border border-ink/8 lg:rounded-[2.35rem] ${extraCls || "cp-shell"}">${inner}
 </div>
 </section>`;
const head = (eyebrow, title, lead) => `
 <div class="max-w-3xl"><p class="cp-eyebrow">${eyebrow}</p><h2 class="cp-h2 font-serif">${title}</h2>${lead ? `<p class="cp-lead">${lead}</p>` : ""}</div>`;
const swipeHint = `<p class="cp-hint" aria-hidden="true">Swipe to see more ${arrow}</p>`;
const tabs = (key, items, dark = false) => `
 <div class="cp-tabs${dark ? " cp-tabs--dark" : ""}" data-tabs>
 <div class="cp-tabnav" role="tablist" aria-label="${key}">${items.map((t, i) => `<button type="button" role="tab" id="t-${key}-${i}" aria-controls="p-${key}-${i}" aria-selected="${i === 0}">${t.tab}</button>`).join("")}</div>
 ${items.map((t, i) => `<div class="cp-panel" role="tabpanel" id="p-${key}-${i}" aria-labelledby="t-${key}-${i}" data-panel>${t.body}</div>`).join("\n ")}
 </div>`;
const list = (items, icon = tick("#3a4d39")) => `<ul class="cp-list">${items.map((x) => `<li>${icon}<span>${x}</span></li>`).join("")}</ul>`;

/* ---------- content ---------- */
const icons = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  spark: '<path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6z"/><path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z"/>',
  tone: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" fill-opacity=".35"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  wave: '<path d="M3 8c3-2 6 2 9 0s6-2 9 0"/><path d="M3 13c3-1.2 6 1.2 9 0s6-1.2 9 0"/><path d="M3 18h18"/>',
  pores: '<circle cx="7" cy="8" r="1.5"/><circle cx="12" cy="8" r="1.5"/><circle cx="17" cy="8" r="1.5"/><circle cx="9.5" cy="13" r="1.2"/><circle cx="14.5" cy="13" r="1.2"/><circle cx="12" cy="17.5" r="1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};
const benefits = [
  ["sun", "Brighter Skin", "Takes away that tired, flat look and brings back clarity and colour."],
  ["spark", "Radiant Complexion", "Encourages new cells and collagen, so skin looks healthy rather than shiny."],
  ["tone", "Even Skin Tone", "Fades tan, dark spots and patchy pigmentation."],
  ["drop", "Beats Dry Skin", "Clears flaky build-up, so your moisturiser actually sinks in."],
  ["shield", "Pimples, Goodbye!", "Unclogs pores, calms active acne and cuts down new breakouts."],
  ["wave", "Smoother Scars", "Softens acne scars and rough texture session by session."],
  ["pores", "Refined Pores", "Clears oil from pores so they look smaller and tighter."],
  ["clock", "Younger-looking Skin", "Softens fine lines and age spots for fresher-looking skin."],
];

const concerns = [
  { tab: "Acne & breakouts", img: ["/wp-content/uploads/2026/08/skin-before-1-scaled.webp", "Indian woman with acne and post-acne marks on her cheeks", 1920, 2560],
    title: "Active acne & breakouts",
    text: "Acne starts when oil, dead skin and bacteria get trapped in a pore. A chemical peel for acne, usually salicylic or mandelic acid, breaks up that blockage from inside, settles the redness and means fewer new pimples. Your regular acne creams also tend to work better once the skin is clear of build-up.",
    peels: ["Salicylic Acid Peel", "Mandelic Acid Peel", "360 Combination Peel"], sessions: "4–6, every 2 weeks", more: ["Clears blackheads and whiteheads", "Controls excess oil", "Reduces red, inflamed spots"],
    link: ["/understanding-the-7-types-of-acne-causes-symptoms-solutions/", "Types of acne explained"] },
  { tab: "Acne scars & marks", img: ["/wp-content/uploads/2026/07/188-4-6.webp", "Acne marks and uneven texture on brown Indian skin", 1080, 1080],
    title: "Acne scars & post-acne marks",
    text: "The brown or red marks pimples leave behind respond quickly to light peels. Pitted scars, like ice-pick or boxcar scars, are tougher. For those we use targeted TCA, often alongside microneedling or laser, and results build over several months.",
    peels: ["Ferulac Peel", "TCA Peel", "Mandelic Acid Peel"], sessions: "4–6, every 3–4 weeks", more: ["Fades brown and red post-acne marks", "Softens shallow scars", "Smooths uneven texture"],
    link: ["/acne-scar-treatment-in-trivandrum/", "Acne scar treatment"] },
  { tab: "Pigmentation & melasma", img: ["/wp-content/uploads/2026/08/Pigmentation-on-the-Face.webp", "Melasma and pigmentation on the cheek of Indian skin", 1080, 1080],
    title: "Pigmentation & melasma",
    text: "Melasma and long-standing dark patches need more than exfoliation. Depigmenting peels such as Cosmelan and Dermamelan slow down the skin's extra melanin while lifting the pigment that's already there. Daily sunscreen is what keeps it from coming back.",
    peels: ["Cosmelan Peel", "Dermamelan Peel", "Yellow Peel"], sessions: "1–4, with home maintenance", more: ["Lightens melasma and hormonal patches", "Evens out blotchy skin tone", "Paired with a home skincare plan"],
    link: ["/chemical-peel-for-pigmentation-removal/", "Peels for pigmentation"] },
  { tab: "Sun tan", img: ["/wp-content/uploads/2026/08/Tan-and-Dark-Patches-on-Face2.webp", "Sun tan and dark patches on Indian skin", 1080, 1080],
    title: "Sun tan & uneven tone",
    text: "The Kerala sun is tough on skin, and tan builds up fast. Brightening peels lift the tanned outer layer and bring back your natural tone. Many people see a difference after the very first session.",
    peels: ["Glycolic Acid Peel", "Pumpkin Peel", "Vitamin C Peel"], sessions: "2–4, every 2 weeks", more: ["Removes tan from face, neck and arms", "Brightens dull, sun-exposed skin", "Little to no downtime"],
    link: ["/how-to-get-rid-of-tan-on-face-and-body/", "How to remove tan"] },
  { tab: "Dull, tired skin", img: ["/wp-content/uploads/2026/07/654-Dark-Circles1.webp", "Indian woman with dull, tired-looking skin and dark circles", 1080, 1080],
    title: "Dull, dehydrated skin",
    text: "Stress, pollution and late nights leave a layer of dead cells that makes skin look flat. A gentle glow peel clears it away, so your skin catches the light again and feels softer. It's a favourite before weddings and big events.",
    peels: ["Party Peel", "Vitamin C Peel", "Pumpkin Peel"], sessions: "1–3, as needed", more: ["Instant glow with no downtime", "Smoother makeup application", "Great pre-event treatment"],
    link: ["/skin-glow-facial-center/", "Skin glow treatments"] },
  { tab: "Open pores & oily skin", img: ["/wp-content/uploads/2026/08/lage-pores.webp", "Close-up of open pores on brown Indian skin", 1080, 1080],
    title: "Open pores & oily skin",
    text: "Pores look bigger when oil and debris stretch them out. Oil-dissolving peels clean them from the inside and tighten the surface, so pores look smaller and your skin stays less shiny through the day.",
    peels: ["Salicylic Acid Peel", "Glycolic Acid Peel", "360 Combination Peel"], sessions: "4–6, every 2–3 weeks", more: ["Visibly smaller-looking pores", "Less oil and shine", "Fewer blackheads"],
    link: ["/appointment/", "Book a pore consultation"] },
  { tab: "Fine lines & sun damage", img: ["/wp-content/uploads/2026/08/8193-e1740745969395.webp", "Fine lines and sun damage around the eye on Indian skin", 1080, 1009],
    title: "Fine lines & sun damage",
    text: "Years of sun leave behind age spots, rough patches and early wrinkles. Peels speed up cell renewal and boost collagen, which softens fine lines and fades sun spots over a few sessions.",
    peels: ["Glycolic Acid Peel", "Vitamin C Peel", "TCA Peel"], sessions: "4–6, every 3–4 weeks", more: ["Fades age and sun spots", "Softens fine lines", "Improves firmness and texture"],
    link: ["/anti-aging-treatments-in-trivandrum/", "Anti-ageing treatments"] },
];

const peels = [
  ["360 Combination Peel", "Medium", "glow acne pigment", "A layered blend of acids that works on texture, tone and clarity together. Visible improvement in as few as two sessions.", ["Texture", "Tone"], "Multiple acids applied in layers so each targets a different concern.", "2–4 days light flaking", "2–4"],
  ["Party Peel", "Superficial", "glow", "A quick glow peel with no downtime. It clears dead skin and gives you an instant lift, ideal a few days before an event.", ["Instant glow", "No downtime"], "A gentle exfoliating blend that lifts dead cells without visible peeling.", "None", "1, or monthly"],
  ["Ferulac Peel", "Superficial", "acne age", "Powered by antioxidant ferulic acid. Helps fade acne scars, hydrates and protects skin from environmental damage.", ["Acne scars", "Hydration"], "Ferulic acid neutralises free radicals while exfoliating and brightening.", "1–3 days mild flaking", "4–6"],
  ["Vitamin C Peel", "Superficial", "glow age", "Brightens skin and supports collagen. Helps with early ageing and the odd breakout.", ["Brightening", "Collagen"], "Vitamin C brightens and supports collagen as the peel renews the surface.", "0–2 days", "4–6"],
  ["Cosmelan Peel", "Medium", "pigment", "A professional depigmentation programme for melasma and stubborn dark patches, with an at-home maintenance cream.", ["Melasma", "Dark patches"], "In-clinic mask followed by a home cream that controls melanin production.", "5–7 days redness and peeling", "1, plus home care"],
  ["Dermamelan Peel", "Medium", "pigment age", "A stronger depigmenting treatment for deep, long-standing dark spots and patches.", ["Deep pigmentation"], "A stronger depigmenting system for long-standing, resistant pigmentation.", "5–7 days", "1, plus home care"],
  ["Pumpkin Peel", "Superficial", "pigment glow", "Natural fruit enzymes and vitamins gently dissolve dead skin to fade dark patches and reveal brighter, softer skin.", ["Sensitive skin", "Dark patches"], "Pumpkin enzymes digest dead cells; rich in antioxidants and vitamin A.", "None to 1 day", "4–6"],
  ["Glycolic Acid Peel", "Superficial", "glow age", "The classic AHA peel. Smooths rough texture, softens fine lines and evens tone. A great first peel.", ["Texture", "Fine lines"], "Small glycolic molecules penetrate evenly to loosen dead skin.", "1–3 days", "4–6"],
  ["Salicylic Acid Peel", "Superficial", "acne", "An oil-soluble BHA that goes deep into pores to clear blackheads, whiteheads and active acne in oily skin.", ["Oily skin", "Active acne"], "Dissolves oil inside pores and calms inflammation.", "1–3 days", "4–6"],
  ["Mandelic Acid Peel", "Superficial", "acne pigment", "A large-molecule AHA that works slowly, so it is gentle enough for sensitive and darker skin with acne and marks.", ["Sensitive skin", "Acne marks"], "Slow, even penetration means less irritation and lower pigmentation risk.", "0–2 days", "4–6"],
  ["Yellow Peel", "Medium", "pigment glow", `A retinol-based peel that boosts cell renewal to fade pigmentation and refresh tired, uneven skin.`, ["Pigmentation", "Renewal"], `Retinol stimulates rapid renewal. <a href="/yellow-peel-treatment-benefits-procedure-side-effects/">Read the full guide</a>.`, "3–5 days peeling", "2–4"],
  ["TCA Peel", "Medium–Targeted", "acne age", "Trichloroacetic acid used at controlled strengths for deeper acne scars, fine wrinkles and sun damage.", ["Acne scars", "Wrinkles"], "Strength is set by your doctor; used as spot treatment for pitted scars.", "5–7 days", "3–5"],
];

const faqs = [
  ["Does a chemical peel hurt?", "Not really. Most people feel a mild tingle or warmth for a few minutes while the peel is on. We use cool compresses and a soothing cream straight after, so you leave comfortable."],
  ["How many chemical peel sessions will I need?", "Most concerns need 4–6 sessions spaced 2–4 weeks apart. A glow peel before an event may need just one, while melasma or acne scars usually need a full course. Your doctor will recommend a plan after your consultation."],
  ["Is there any downtime after a chemical peel?", "Light peels have little or no downtime, and most people go back to work the same day. Medium peels can cause visible peeling for 3 to 7 days. We'll tell you exactly what to expect beforehand so you can plan around it."],
  ["Are chemical peels safe for Indian and darker skin tones?", "Yes, when the right peel is chosen. We use formulas such as mandelic, lactic and depigmenting peels that are suited to darker skin, and adjust strength and timing to reduce the risk of irritation or post-peel darkening."],
  ["When will I see results?", "Many people notice brighter, smoother skin within 1–2 weeks of the first session. Improvements in pigmentation, acne marks and texture build up with each session and are most visible after a full course."],
  ["How long do chemical peel results last?", "Results can last for months when you protect your skin with daily sunscreen and a good skincare routine. Maintenance peels every 1–3 months help keep the results going."],
  ["Can I wear makeup after a chemical peel?", "It is best to avoid makeup for at least 24 hours after a superficial peel, and until peeling stops after a medium peel, to let the skin heal and avoid irritation."],
  ["Can I go out in the sun after a peel?", "Avoid direct sun for at least a week. If you must go out, wear SPF 30+ sunscreen, reapply every 2–3 hours, and use a hat or umbrella. Sun exposure on freshly peeled skin can cause dark patches."],
  ["Can I get a chemical peel before my wedding?", "Yes. A series of glow peels is a popular part of bridal skin prep. Start 2–3 months before the wedding and schedule your last peel 7–10 days before the big day so there is no visible flaking."],
  ["Where can I get a chemical peel in Kerala?", "Facelit offers chemical peel treatment at our clinics in Kowdiar (Trivandrum), Karunagappally (Kollam) and Guruvayur (Thrissur). You can book online or call your nearest clinic."],
  ["Can chemical peels be combined with other treatments?", "Yes. Peels are often paired with microneedling, MNRF, laser or HydraFacial for better results on acne scars and pigmentation. Your doctor will space the treatments safely."],
  ["Can men get chemical peels?", "Absolutely. Peels work just as well for men, especially for acne, oily skin, open pores, razor bumps and tan."],
  ["What is the difference between a chemical peel and a facial?", "A facial cleanses and hydrates the surface of the skin. A chemical peel is a medical treatment that exfoliates deeper and stimulates skin renewal, so it treats concerns like acne, scars and pigmentation more effectively."],
  ["How much does a chemical peel cost?", "Chemical peel cost depends on the type of peel, the area treated and how many sessions you need. Book a consultation for a personalised quote, or read our guide to the cost of peels in Trivandrum."],
];

/* ---------- sections ---------- */
const hero = `
 <section class="mx-auto max-w-7xl px-5 pb-4 pt-32 sm:px-8 sm:pb-5 sm:pt-36">
 <div class="liquid-glass--section overflow-hidden rounded-[1.75rem] border border-ink/8 lg:rounded-[2.35rem] grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
 <div class="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-20">
 <div class="mb-5 flex flex-wrap gap-2">
 <span class="rounded-full border border-forest/15 bg-white/35 px-3 py-1.5 text-[10px] font-medium tracking-[0.13em] text-forest uppercase">Skin</span>
 <span class="rounded-full border border-forest/15 bg-white/35 px-3 py-1.5 text-[10px] font-medium tracking-[0.13em] text-forest uppercase">Doctor-led</span>
 </div>
 <h1 class="max-w-3xl font-serif-medium text-[2.15rem] leading-[1.12] tracking-tight text-forest sm:text-5xl md:text-[3.15rem]">Chemical Peel Treatment</h1>
 <img src="/wp-content/uploads/2026/08/skin-hero-1.webp" alt="Indian woman with clear, glowing skin after chemical peel treatment at Facelit, Kerala" width="1726" height="1152" class="cp-hero-m" style="object-position:70% center" fetchpriority="high">
 <div class="prose mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
 <p>A chemical peel is one of the quickest ways to get clearer, brighter skin. At Facelit, our doctors pick the acid and strength that suit your skin, whether you are dealing with acne, pigmentation, tan, open pores or the first fine lines. Most sessions take under an hour, and many peels need no downtime at all.</p>
 </div>
 <div class="cp-facts" role="list">
 <div class="cp-fact" role="listitem"><b>30–45 min</b><span>Per session</span></div>
 <div class="cp-fact" role="listitem"><b>0–7 days</b><span>Downtime</span></div>
 <div class="cp-fact" role="listitem"><b>4–6</b><span>Sessions typical</span></div>
 <div class="cp-fact" role="listitem"><b>2–4 weeks</b><span>Between sessions</span></div>
 </div>
 <div class="mt-8 flex flex-wrap items-center gap-3">
 <a href="/appointment/" class="btn-3d-forest btn-press inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap">Book Now</a>
 <a href="#peels" class="btn-press liquid-glass--chip inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap text-ink">Explore our peels</a>
 </div>
 </div>
 <div class="cp-hero-d overflow-hidden">
 <img src="/wp-content/uploads/2026/08/skin-hero-1.webp" alt="Indian woman with clear, glowing skin after chemical peel treatment at Facelit, Kerala" class="h-full w-full object-cover" style="object-position:70% center" fetchpriority="high">
 </div>
 </div>
 </section>`;

const jump = `
 <nav class="mx-auto max-w-7xl px-5 py-2 sm:px-8" aria-label="On this page">
 <div class="cp-jump">
 <span>On this page</span>
 ${[["overview", "Overview"], ["concerns", "Concerns"], ["peels", "Our peels"], ["process", "Process"], ["results", "Results"], ["aftercare", "Aftercare"], ["compare", "Compare"], ["faq", "FAQs"]].map(([h, t]) => `<a href="#${h}">${t}</a>`).join("")}
 </div>
 </nav>`;

const overview = shell("overview", `
 <div class="cp-split">
 <div>
 <p class="cp-eyebrow">Treatment overview</p>
 <h2 class="cp-h2 font-serif">What is a Chemical Peel?</h2>
 <div class="cp-prose">
 <p>A chemical peel treatment uses a mild, carefully chosen acid to remove the top layer of dull, damaged skin. Your doctor brushes it on, leaves it for a few minutes, then neutralises it. Over the next few days the old cells shed, and the fresher skin underneath comes through. The peel also nudges your skin to make new collagen, which is why texture keeps improving after each session.</p>
 <p>Scrubs and home exfoliants only polish the surface. A professional peel works evenly and goes a little deeper, so it can fade acne marks, soften scars and even out pigmentation in a way your daily routine usually can't.</p>
 </div>
 <details class="cp-more">
 <summary>Read more: the acids we use ${plus}</summary>
 <div class="cp-prose">
 <p>We tailor every peel to your skin type, your main concern and your skin tone, which matters a lot for Indian skin. Depending on what you want to fix, your doctor may use:</p>
 ${list(["<b>AHAs</b> (glycolic, lactic, mandelic): smooth and brighten the surface.", "<b>BHA</b> (salicylic acid): dissolves oil inside the pores, so it suits acne-prone skin.", "<b>TCA</b> (trichloroacetic acid): a stronger acid for scars, wrinkles and sun damage.", "<b>Retinoid peels</b> (yellow peel): speeds up cell turnover to fade pigmentation.", "<b>Depigmenting systems</b> (Cosmelan, Dermamelan): calm down the excess melanin behind melasma."])}
 <p>Peels work well on their own, and they also pair nicely with microneedling, laser or HydraFacial when you want faster results. Want to learn more? Read <a href="/what-are-medi-peels/">what medi-peels are</a>.</p>
 </div>
 </details>
 <div class="cp-layers" aria-label="Peel depths">
 <div class="cp-layer"><i style="background:#e9d3b8"></i><div><b>Superficial</b><span>Works on the outer layer. Good for glow, mild acne and tan.</span></div></div>
 <div class="cp-layer"><i style="background:#c4945f"></i><div><b>Medium</b><span>Reaches a little deeper for pigmentation, melasma and fine lines.</span></div></div>
 <div class="cp-layer"><i style="background:#7d5530"></i><div><b>Targeted</b><span>Applied only on stubborn scars and deep texture.</span></div></div>
 </div>
 </div>
 <div class="cp-stack">
 ${img("/wp-content/uploads/2026/07/707-skin-care.webp", "Smiling Indian woman applying skincare after a chemical peel", 1080, 1080, "cp-img")}
 ${img("/wp-content/uploads/2026/08/Tan-and-Dark-Patches-on-Face2.webp", "Tan and uneven pigmentation on Indian skin, a common reason for chemical peels", 1080, 1080, "cp-img")}
 </div>
 </div>`);

const benefitsSec = shell("", `${head("What to expect", "Benefits of Chemical Peel Treatment", "A good course of peels does more than one job. Here is what most of our clients notice.")}
 <div class="cp-grid cp-grid--4 cp-swipe">
 ${benefits.map(([i, t, d]) => `<article class="cp-card"><span class="cp-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[i]}</svg></span><h3 class="font-serif">${t}</h3><p>${d}</p></article>`).join("\n ")}
 </div>${swipeHint}`);

const concernsSec = shell("concerns", `${head("Is it right for you?", "Skin Problems a Chemical Peel Can Treat", "Tap a concern to see how a peel helps, which peels we usually recommend and roughly how many sessions it takes.")}
 ${tabs("concerns", concerns.map((c) => ({ tab: c.tab, body: `
 <div class="cp-pgrid">
 ${img(c.img[0], c.img[1], c.img[2], c.img[3], "cp-img cp-img--43")}
 <div>
 <h3 class="cp-h3 font-serif">${c.title}</h3>
 <p class="cp-p">${c.text}</p>
 ${list(c.more)}
 <div class="cp-rec"><div><small>Recommended peels</small>${c.peels.map((p) => `<span class="cp-tag">${p}</span>`).join("")}</div><div><small>Typical sessions</small><b>${c.sessions}</b></div></div>
 <a class="cp-textlink" href="${c.link[0]}">${c.link[1]} ${arrow}</a>
 </div>
 </div>` })))}
 <div class="cp-chips" aria-label="We also treat">
 <span class="cp-chips-label">Also treats:</span>
 ${["Dark underarms & neck", "Back & body acne", "Dark knees & elbows", "Rough, bumpy skin", "Pre-bridal glow", "Razor bumps"].map((x) => `<span class="cp-chip">${x}</span>`).join("")}
 </div>`);

const depthSec = shell("", `${head("Types of chemical peels", "Superficial, Medium and Targeted Peels", "Peels are grouped by how deep they work. Your doctor decides the strength after looking at your skin, and stronger is not always better.")}
 <div class="cp-grid cp-grid--3 cp-swipe">
 ${[["Superficial Peel", 1, "Gentle acids like glycolic, lactic, mandelic and salicylic. A good starting point for glow and mild concerns.", "dullness, tan, mild acne, oily skin", "none to 2 days of mild flaking", "4–6, every 2–3 weeks"],
    ["Medium Peel", 2, "Blends such as TCA, Cosmelan and Dermamelan for concerns that sit a little deeper.", "pigmentation, melasma, acne marks, fine lines", "3–7 days of peeling", "1–4, spaced 3–4 weeks"],
    ["Targeted Peel", 3, "A stronger acid dabbed only onto specific scars (for example TCA CROSS), never across the whole face.", "ice-pick and boxcar acne scars", "5–7 days on treated spots", "3–5, every 4–6 weeks"]]
    .map(([t, n, d, b, dt, s]) => `<article class="cp-card cp-depth"><h3 class="font-serif">${t}</h3><div class="cp-bar" aria-hidden="true">${[1, 2, 3].map((k) => `<i${k <= n ? ' class="on"' : ""}></i>`).join("")}</div><p>${d}</p><div class="cp-meta"><div><b>Best for:</b> ${b}</div><div><b>Downtime:</b> ${dt}</div><div><b>Sessions:</b> ${s}</div></div></article>`).join("\n ")}
 </div>${swipeHint}`);

const peelsSec = shell("peels", `${head("Choose your peel", "Chemical Peel Treatments at Facelit", "From a quick glow before a function to a full programme for melasma, we have a peel for most concerns. Filter by what you want to treat.")}
 <div class="cp-filter" role="group" aria-label="Filter peels by concern">
 ${[["all", "All peels"], ["glow", "Glow &amp; dullness"], ["acne", "Acne &amp; scars"], ["pigment", "Pigmentation"], ["age", "Anti-ageing"]].map(([f, t], i) => `<button type="button" data-f="${f}" aria-pressed="${i === 0}">${t}</button>`).join("")}
 </div>
 <div class="cp-grid cp-grid--3 cp-swipe" data-peels>
 ${peels.map(([n, lvl, c, d, tags, how, down, sess]) => `<article class="cp-card cp-peel" data-c="${c}"><div class="cp-peel-top"><h3 class="font-serif">${n}</h3><span class="cp-lvl">${lvl}</span></div><p>${d}</p><div>${tags.map((t) => `<span class="cp-tag">${t}</span>`).join("")}</div><details class="cp-pd"><summary>Details ${plus}</summary><dl><dt>How it works</dt><dd>${how}</dd><dt>Downtime</dt><dd>${down}</dd><dt>Sessions</dt><dd>${sess}</dd></dl></details><div class="cp-book"><a href="/appointment/">Book now</a></div></article>`).join("\n ")}
 </div>${swipeHint}
 <div class="cp-center"><button type="button" class="cp-showmore" data-showmore aria-expanded="false">Show all 12 peels</button></div>`);

const processSec = shell("process", `
 <div class="bg-forest text-cream cp-shell">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Your appointment</p>
 <h2 class="mt-4 max-w-3xl font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Chemical Peel Procedure: Step by Step</h2>
 <figure class="cp-diagram">${img("141-chemical-peel-process-1.webp", "Chemical peel procedure steps: cleansing, applying the peel with a brush, neutralising and removing with a cool compress", 1600, 463, "")}</figure>
 ${tabs("process", [
   { tab: "01 · Before", img: ["/wp-content/uploads/2026/08/about-hero.webp", "Facelit doctor consulting an Indian patient before a chemical peel", 1151, 768], items: ["Your doctor assesses your skin type, tone and texture to recommend the right peel.", "Tell your doctor about any allergies (including glycolic acid), medicines or recent treatments.", "A patch test checks how your skin reacts to the chosen solution.", "Avoid waxing, bleaching and threading on the area for a week before.", "Stop scrubs, retinoids and benzoyl peroxide products 48–72 hours before.", "Some peels need 2–4 weeks of priming creams to prepare the skin."], lead: "A little preparation goes a long way. It makes your peel safer and the results better." },
   { tab: "02 · During", img: ["/wp-content/uploads/2026/07/141-chemical-peel-process-1.webp", "Chemical peel steps: cleansing, applying the peel, neutralising and removal", 1600, 463], items: ["The skin is cleansed and degreased; sensitive areas like eyes and lips are protected.", "The peel solution is applied evenly with a brush.", "It stays on for about 3–5 minutes depending on the formula. You may feel a mild tingle, which is normal.", "A neutralising solution is used to stop the peel at the right time.", "Cool compresses soothe the skin, followed by a hydrating cream and sunscreen."], lead: "The whole session takes 30 to 45 minutes, and you can go straight back to your day." },
   { tab: "03 · After", img: ["/wp-content/uploads/2026/08/skin-after-1-scaled.webp", "Indian woman with clearer, even-toned skin after a course of peels", 1920, 2560], items: ["Avoid direct sun and heat (saunas, steam, hot yoga) while the skin heals.", "Apply broad-spectrum SPF 30+ sunscreen and reapply through the day.", "Don't pick or scratch flaking skin. Let it shed naturally.", "Skip waxing, threading or bleaching on the area for one week.", "Avoid Retin-A and other strong actives for at least 72 hours.", "Keep skin well moisturised with a gentle, fragrance-free cream."], lead: "How you look after your skin now decides how good the results are. The full aftercare plan is below." },
 ].map((s) => ({ tab: s.tab, body: `<div class="cp-pgrid">${img(s.img[0], s.img[1], s.img[2], s.img[3], (s.img[0].includes("process") ? "cp-img cp-img--43 cp-img--diagram" : "cp-img cp-img--43"))}<div><p class="cp-p cp-p--light">${s.lead}</p><ul class="cp-steplist">${s.items.map((x) => `<li>${x}</li>`).join("")}</ul></div></div>` })), true)}
 </div>`, "p-0");

const resultsSec = shell("results", `
 <div class="cp-split cp-split--top">
 <div>
 ${head("Recovery &amp; results", "Chemical Peel Results and Recovery", "Every peel is a little different, but this is what most people go through after a light to medium peel.")}
 <ol class="cp-timeline">
 <li class="cp-tl"><b>Day 0–2</b><h3 class="font-serif">Tight &amp; pink</h3><p>Skin may feel tight, warm or a little red, a bit like mild sunburn.</p></li>
 <li class="cp-tl"><b>Day 3–7</b><h3 class="font-serif">Gentle peeling</h3><p>Light flaking as old cells shed. Moisturise and let it come off naturally.</p></li>
 <li class="cp-tl"><b>Week 2</b><h3 class="font-serif">Fresh glow</h3><p>New skin looks brighter, smoother and more even.</p></li>
 <li class="cp-tl"><b>After 4–6 sessions</b><h3 class="font-serif">Lasting change</h3><p>Visible fading of marks, pigmentation and texture, maintained with good skincare.</p></li>
 </ol>
 </div>
 <div>
 <div class="cp-gallery">
 <figure>${img("/wp-content/uploads/2026/08/skin-before-1-scaled.webp", "Indian skin with acne marks before a course of chemical peels", 1920, 2560)}<figcaption>Before</figcaption></figure>
 <figure>${img("/wp-content/uploads/2026/08/skin-after-1-scaled.webp", "Indian skin looking clearer and more even after chemical peels", 1920, 2560)}<figcaption>After a course of peels</figcaption></figure>
 </div>
 <p class="cp-note">Illustrative model images. Outcomes vary by skin type and concern. <a href="/chemical-peel-before-and-after/">See more before &amp; after ${arrow}</a></p>
 </div>
 </div>`);

const areasSec = shell("", `${head("Treatment areas", "Chemical Peels for Face and Body", "Peels are not just for the face. We adapt them for most areas where tan, pigmentation, acne or rough skin bothers you.")}
 <div class="cp-areas">
 ${[["Face", "Acne, pigmentation, glow, fine lines"], ["Neck", "Dark neck, tan, crepey skin"], ["Underarms", "Darkening and uneven tone"], ["Back & chest", "Body acne and marks"], ["Hands & feet", "Tan, sun spots, ageing signs"], ["Knees & elbows", "Dark, rough patches"]].map(([a, b]) => `<div class="cp-area"><b class="font-serif">${a}</b><span>${b}</span></div>`).join("")}
 </div>`);

const skinTypes = [
  ["Oily & acne-prone skin", "Salicylic and mandelic peels clean out pores and keep oil in check. Most people see fewer breakouts and smaller-looking pores within a few sessions."],
  ["Dry skin", "Lactic acid and Vitamin C peels exfoliate gently and help skin hold on to moisture. We pair them with a rich barrier-repair cream."],
  ["Sensitive skin", "We start with low-strength mandelic or pumpkin enzyme peels and a patch test, then increase gradually only if your skin is comfortable."],
  ["Combination skin", "Your doctor may use a slightly stronger peel on an oily T-zone and a gentler one on drier cheeks."],
  ["Darker / Indian skin tones", "We use slow-acting acids, careful timing and a few weeks of skin priming beforehand. That keeps the risk of post-peel darkening low without holding back on results."],
];
const aftercare = [
  { tab: "First 72 hours", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Wash with a mild, soap-free cleanser and lukewarm water", "Apply the moisturiser your doctor recommends 2–3 times a day", "Use SPF 30+ sunscreen, even indoors", "Sleep on a clean pillowcase"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Makeup for the first 24 hours", "Hot showers, steam, saunas and heavy workouts", "Scrubs, retinol, AHAs or vitamin C serums", "Touching, picking or rubbing your skin"], warn)}</div></div>` },
  { tab: "Days 4–7", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Do</h3>${list(["Keep moisturising generously. Flaking is normal", "Gently pat skin dry after washing", "Reapply sunscreen every 2–3 hours outdoors", "Drink plenty of water"])}</div><div class="cp-card"><h3 class="font-serif">Avoid</h3>${list(["Pulling off flakes. Let them shed on their own", "Swimming in chlorinated pools", "Waxing, threading or bleaching", "Direct midday sun"], warn)}</div></div>` },
  { tab: "Long-term", body: `<div class="cp-two cp-two--tight"><div class="cp-card"><h3 class="font-serif">Morning routine</h3>${list(["Gentle cleanser", "Brightening serum, once your doctor says it's fine", "Light moisturiser", "Broad-spectrum SPF 30–50"])}</div><div class="cp-card"><h3 class="font-serif">Night routine</h3>${list(["Gentle cleanser", "Treatment cream prescribed for your concern", "Barrier-repair moisturiser", "Maintenance peel every 1–3 months"])}</div></div>` },
];
const aftercareSec = shell("aftercare", `
 <div class="cp-split cp-split--top">
 <div>${head("Aftercare", "Chemical Peel Aftercare", "Follow this simple plan to heal faster and keep your results for longer.")}${tabs("aftercare", aftercare)}</div>
 <div class="cp-split-sep">${head("Your skin type", "Which Peel Suits Your Skin Type?", "")}<div class="cp-faq cp-faq--compact">${skinTypes.map(([q, a], i) => `<details${i === 0 ? " open" : ""}><summary>${q}${plus}</summary><div class="a">${a}</div></details>`).join("")}</div></div>
 </div>`);

const compareSec = shell("compare", `${head("Compare treatments", "Chemical Peel vs Facial, HydraFacial and Laser", "Not sure whether you need a peel, a facial or laser? Here is how they compare.")}
 <div class="cp-table-wrap" tabindex="0" role="region" aria-label="Treatment comparison table">
 <table class="cp-table">
 <thead><tr><th scope="col"></th><th scope="col" class="hl">Chemical Peel</th><th scope="col">Facial</th><th scope="col"><a href="/hydrafacial-treatments/">HydraFacial</a></th><th scope="col"><a href="/best-laser-treatment-for-deep-acne-scars/">Laser</a></th></tr></thead>
 <tbody>
 <tr><th scope="row">Best for</th><td class="hl">Acne, pigmentation, tan, texture</td><td>Relaxation, basic cleansing</td><td>Hydration, instant glow, congestion</td><td>Deep scars, stubborn pigment</td></tr>
 <tr><th scope="row">How deep it works</th><td class="hl">Surface to upper dermis</td><td>Surface only</td><td>Surface</td><td>Deeper layers</td></tr>
 <tr><th scope="row">Downtime</th><td class="hl">0–7 days</td><td>None</td><td>None</td><td>2–7 days</td></tr>
 <tr><th scope="row">Sessions</th><td class="hl">4–6</td><td>Ongoing</td><td>Monthly</td><td>3–6</td></tr>
 <tr><th scope="row">Treats pigmentation</th><td class="hl">Yes</td><td>Mild</td><td>Mild</td><td>Yes</td></tr>
 <tr><th scope="row">Medical supervision</th><td class="hl">Yes</td><td>No</td><td>Yes</td><td>Yes</td></tr>
 </tbody>
 </table>
 </div>
 <p class="cp-hint cp-hint--table" aria-hidden="true">Scroll the table sideways ${arrow}</p>`);

const whySec = shell("", `
 <div class="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
 <div class="lg:sticky lg:top-28 lg:self-start">
 <p class="cp-eyebrow">Why Facelit</p>
 <h2 class="cp-h2 font-serif">Why Choose Facelit for Chemical Peels in Kerala?</h2>
 ${img("825-Trivandrum-clinic.webp", "Facelit skin clinic treatment room in Trivandrum", 1024, 585, "cp-img cp-img--wide")}
 </div>
 <ol class="cp-why">
 ${[["Doctor-led consultation", "Every treatment starts with a proper skin check. Our doctors then build a plan around what bothers you most, whether that's acne, pigmentation, fine lines or dullness."],
    ["Peels customised for Indian skin", "Indian skin can darken if a peel is too strong. We pick the acid, strength and timing for your skin tone to keep that risk low."],
    ["Medical-grade formulations", "We only use professional, clinically tested peels, from gentle glow peels to depigmentation systems like Cosmelan and Dermamelan."],
    ["Safe, hygienic and comfortable", "You are treated in a clean, calm clinic with strict hygiene standards, and we soothe your skin properly before you leave."],
    ["Aftercare and follow-up", "You leave with a clear aftercare routine, and we check your progress at every visit so the plan keeps up with your skin."]]
    .map(([t, d], i) => `<li><span class="n">0${i + 1}</span><div><h3 class="font-serif">${t}</h3><p>${d}</p></div></li>`).join("\n ")}
 </ol>
 </div>`);

const safetySec = shell("", `${head("Safety first", "Chemical Peel Side Effects and Who Should Wait", "In trained hands, chemical peels are very safe. Here is what is normal afterwards, and when it is better to wait.")}
 <div class="cp-two">
 <div class="cp-card"><h3 class="font-serif">Common and temporary</h3>${list(["Mild redness or warmth for a few hours to 2 days", "Light flaking or peeling for 3–7 days", "Tightness or dryness, which moisturiser eases", "Temporary sensitivity to sun and strong products"])}</div>
 <div class="cp-card"><h3 class="font-serif">Talk to your doctor first if you</h3>${list(["Are pregnant or breastfeeding", "Have taken oral isotretinoin in the last 6 months", "Have active cold sores, infections, cuts or eczema on the area", "Have a fresh sunburn or recent tan", "Tend to form keloids or raised scars"], warn)}</div>
 </div>`);

const faqSec = shell("faq", `${head("Questions", "Chemical Peel FAQs", "")}
 <div class="cp-faq" data-faq>
 ${faqs.map(([q, a], i) => `<details${i >= 6 ? ' class="cp-extra"' : ""}><summary>${q}${plus}</summary><div class="a">${a}</div></details>`).join("\n ")}
 </div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">Show ${faqs.length - 6} more questions</button></div>`);

const relatedSec = shell("", `${head("Near you &amp; further reading", "Chemical Peels Near You", "")}
 <div class="cp-links">
 ${[["/best-chemical-peel-in-trivandrum/", "Location", "Chemical peel in Trivandrum"], ["/best-chemical-peel-in-karunagappally/", "Location", "Chemical peel in Karunagappally"], ["/best-chemical-peel-in-guruvayur/", "Location", "Chemical peel in Guruvayur"], ["/chemical-peel-for-pigmentation-removal/", "Guide", "Chemical peel for pigmentation"], ["/chemical-peel-before-and-after/", "Results", "Chemical peel before &amp; after"], ["/cost-of-peels-in-trivandrum/", "Pricing", "Cost of peels in Trivandrum"]]
    .map(([h, s, t]) => `<a href="${h}"><span><small>${s}</small>${t}</span>${arrow}</a>`).join("\n ")}
 </div>`);

const cta = `
 <section class="mx-auto max-w-7xl px-5 py-4 pb-10 sm:px-8 sm:py-5 sm:pb-14">
 <div class="liquid-glass--section overflow-hidden rounded-[1.75rem] border border-ink/8 lg:rounded-[2.35rem] p-0">
 <div class="flex flex-col items-start justify-between gap-8 bg-forest px-6 py-10 text-cream sm:px-10 sm:py-14 lg:flex-row lg:items-end lg:px-14">
 <div class="max-w-3xl">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Personalised care</p>
 <h2 class="mt-4 font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">Not sure which peel is right for you?</h2>
 <p class="mt-5 max-w-2xl text-sm leading-7 text-cream/75 sm:text-base">Book a consultation and our doctors will suggest the right peel for your skin, your goals and your timeline.</p>
 </div>
 <a href="/appointment/" class="btn-press inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-forest transition-transform duration-150">Book a consultation <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
 </div>
 </div>
 </section>`;

const css = fs.readFileSync(new URL("../treatment-kit/cp.css", import.meta.url), "utf8");
const js = fs.readFileSync(new URL("../treatment-kit/cp.js", import.meta.url), "utf8");
const main = `<main class="cp relative overflow-x-clip text-ink">
<style>${css}</style>${hero}${jump}${overview}${benefitsSec}${concernsSec}${depthSec}${peelsSec}${processSec}${resultsSec}${areasSec}${aftercareSec}${compareSec}${whySec}${safetySec}${faqSec}${relatedSec}${cta}
<script>${js}</script>
 </main>`;

const page = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const b = page.bodyHtml, s = b.indexOf("<main"), en = b.indexOf("</main>") + 7;
if (s < 0 || en < 7) throw new Error("main not found");
page.bodyHtml = b.slice(0, s) + main + b.slice(en);
const title = "Chemical Peel Treatment in Kerala for Acne & Pigmentation | Facelit";
const desc = "Doctor-led chemical peel treatment in Trivandrum, Karunagappally and Guruvayur. 12 peels for acne, scars, pigmentation, melasma, tan and dull skin. Book a consultation.";
page.head.title = title; page.head.og.title = title; page.head.tw.title = title;
page.head.description = desc; page.head.og.description = desc; page.head.tw.description = desc;
page.head.og.image = "https://facelit.in/wp-content/uploads/2026/07/648-chemical-peel-in-trivandrum.webp";
page.head.tw.image = page.head.og.image;
page.head.jsonld = page.head.jsonld.filter((j) => !j.includes('"MedicalProcedure"') && !j.includes('"BreadcrumbList"'));
page.head.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "MedicalProcedure", name: "Chemical Peel Treatment", url: "https://facelit.in/chemical-peel-treatment/", procedureType: "https://schema.org/NoninvasiveProcedure", bodyLocation: "Face, neck, underarms, back, hands", description: desc, howPerformed: "A doctor cleanses the skin, applies a chosen acid solution with a brush for 3 to 5 minutes, neutralises it, then applies a cool compress, moisturiser and sunscreen.", preparation: "Skin assessment and patch test. Avoid waxing, scrubs, retinoids and benzoyl peroxide for 2 to 7 days before.", followup: "Avoid sun and heat, use SPF 30+ daily, moisturise and do not pick peeling skin.", image: page.head.og.image }));
page.head.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://facelit.in/" }, { "@type": "ListItem", position: 2, name: "Skin Treatments", item: "https://facelit.in/skin-treatments/" }, { "@type": "ListItem", position: 3, name: "Chemical Peel Treatment", item: "https://facelit.in/chemical-peel-treatment/" }] }));
page.head.jsonld = page.head.jsonld.filter((j) => !j.includes('"FAQPage"'));
const strip = (s) => s.replace(/<[^>]+>/g, "");
page.head.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: strip(a) } })) }));
fs.writeFileSync(jsonPath, JSON.stringify(page));
console.log("ok", main.length);
