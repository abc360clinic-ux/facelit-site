// Shared building blocks for redesigned treatment pages (same look as /chemical-peel-treatment/).
// A page script builds its <main> with these helpers, then calls writePage().
import fs from "fs";

export const U = "/wp-content/uploads/2026/07/";
export const arrow = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"/></svg>`;
export const plus = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M10 4v12M4 10h12"/></svg>`;
export const tick = (c = "#3a4d39") => `<svg viewBox="0 0 20 20" fill="none" stroke="${c}" stroke-width="1.8" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M6.5 10.5l2.3 2.3 4.7-5"/></svg>`;
export const warn = `<svg viewBox="0 0 20 20" fill="none" stroke="#986a3e" stroke-width="1.8" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M10 6v5M10 14h.01"/></svg>`;

/** Line icons (24x24, stroke) for benefit cards. */
export const icons = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  spark: '<path d="M10 3l1.6 4.4L16 9l-4.4 1.6L10 15l-1.6-4.4L4 9l4.4-1.6z"/><path d="M18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8z"/>',
  tone: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" fill-opacity=".35"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/><path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5"/>',
  shield: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
  wave: '<path d="M3 8c3-2 6 2 9 0s6-2 9 0"/><path d="M3 13c3-1.2 6 1.2 9 0s6-1.2 9 0"/><path d="M3 18h18"/>',
  pores: '<circle cx="7" cy="8" r="1.5"/><circle cx="12" cy="8" r="1.5"/><circle cx="17" cy="8" r="1.5"/><circle cx="9.5" cy="13" r="1.2"/><circle cx="14.5" cy="13" r="1.2"/><circle cx="12" cy="17.5" r="1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  lift: '<path d="M12 20V5"/><path d="M6 11l6-6 6 6"/><path d="M5 20h14"/>',
  stretch: '<path d="M4 6c4 1 4 3 8 3s4-2 8-3"/><path d="M4 12c4 1 4 3 8 3s4-2 8-3"/><path d="M4 18c4 1 4 3 8 3s4-2 8-3"/>',
  bandage: '<rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-35 12 12)"/><circle cx="11" cy="11" r=".6" fill="currentColor"/><circle cx="13" cy="13" r=".6" fill="currentColor"/>',
  layers: '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  cell: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><circle cx="7.5" cy="8" r=".9" fill="currentColor"/><circle cx="16.5" cy="15.5" r=".9" fill="currentColor"/><circle cx="16" cy="7.5" r=".6" fill="currentColor"/>',
  leaf: '<path d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14z"/><path d="M5 19l8-8"/>',
  heal: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M12 10v4M10 12h4"/>',
};

/** src is a file in 2026/07 uploads, or a full path starting with "/". */
export const src = (f) => (f.startsWith("/") ? f : U + f);
export const img = (f, alt, w, h, cls = "cp-img") =>
  `<img src="${src(f)}" alt="${alt}" width="${w}" height="${h}" class="${cls}" loading="lazy" decoding="async">`;
export const shell = (id, inner, extraCls = "") => `
 <section${id ? ` id="${id}"` : ""} class="cp-anchor mx-auto max-w-7xl px-5 py-4 sm:px-8 sm:py-5">
 <div class="liquid-glass--section overflow-hidden rounded-[1.75rem] border border-ink/8 lg:rounded-[2.35rem] ${extraCls || "cp-shell"}">${inner}
 </div>
 </section>`;
export const head = (eyebrow, title, lead) => `
 <div class="max-w-3xl"><p class="cp-eyebrow">${eyebrow}</p><h2 class="cp-h2 font-serif">${title}</h2>${lead ? `<p class="cp-lead">${lead}</p>` : ""}</div>`;
export const swipeHint = `<p class="cp-hint" aria-hidden="true">Swipe to see more ${arrow}</p>`;
export const list = (items, icon = tick()) => `<ul class="cp-list">${items.map((x) => `<li>${icon}<span>${x}</span></li>`).join("")}</ul>`;
export const tabs = (key, items, dark = false) => `
 <div class="cp-tabs${dark ? " cp-tabs--dark" : ""}" data-tabs>
 <div class="cp-tabnav" role="tablist" aria-label="${key}">${items.map((t, i) => `<button type="button" role="tab" id="t-${key}-${i}" aria-controls="p-${key}-${i}" aria-selected="${i === 0}">${t.tab}</button>`).join("")}</div>
 ${items.map((t, i) => `<div class="cp-panel" role="tabpanel" id="p-${key}-${i}" aria-labelledby="t-${key}-${i}" data-panel>${t.body}</div>`).join("\n ")}
 </div>`;
export const accordion = (rows, firstOpen = true, extraAfter = Infinity) =>
  rows.map(([q, a], i) => `<details${i === 0 && firstOpen ? " open" : ""}${i >= extraAfter ? ' class="cp-extra"' : ""}><summary>${q}${plus}</summary><div class="a">${a}</div></details>`).join("\n ");

/** Hero: image sits under the H1 on mobile, on the right on desktop. */
export const hero = ({ tags, h1, img: [hsrc, alt], intro, facts, cta2, pos = "center" }) => `
 <section class="mx-auto max-w-7xl px-5 pb-4 pt-32 sm:px-8 sm:pb-5 sm:pt-36">
 <div class="liquid-glass--section overflow-hidden rounded-[1.75rem] border border-ink/8 lg:rounded-[2.35rem] grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
 <div class="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-20">
 <div class="mb-5 flex flex-wrap gap-2">${tags.map((t) => `<span class="rounded-full border border-forest/15 bg-white/35 px-3 py-1.5 text-[10px] font-medium tracking-[0.13em] text-forest uppercase">${t}</span>`).join("")}</div>
 <h1 class="max-w-3xl font-serif-medium text-[2.15rem] leading-[1.12] tracking-tight text-forest sm:text-5xl md:text-[3.15rem]">${h1}</h1>
 <img src="${src(hsrc)}" alt="${alt}" width="1080" height="1080" class="cp-hero-m" style="object-position:${pos}" fetchpriority="high">
 <div class="prose mt-6 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg"><p>${intro}</p></div>
 <div class="cp-facts" role="list">${facts.map(([b, s]) => `<div class="cp-fact" role="listitem"><b>${b}</b><span>${s}</span></div>`).join("")}</div>
 <div class="mt-8 flex flex-wrap items-center gap-3">
 <a href="/appointment/" class="btn-3d-forest btn-press inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap">Book Now</a>
 <a href="${cta2[0]}" class="btn-press liquid-glass--chip inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap text-ink">${cta2[1]}</a>
 </div>
 </div>
 <div class="cp-hero-d overflow-hidden"><img src="${src(hsrc)}" alt="${alt}" class="h-full w-full object-cover" style="object-position:${pos}" fetchpriority="high"></div>
 </div>
 </section>`;

export const jump = (items) => `
 <nav class="mx-auto max-w-7xl px-5 py-2 sm:px-8" aria-label="On this page">
 <div class="cp-jump"><span>On this page</span>${items.map(([h, t]) => `<a href="#${h}">${t}</a>`).join("")}</div>
 </nav>`;

export const benefitsGrid = (rows) => `
 <div class="cp-grid cp-grid--4 cp-swipe">
 ${rows.map(([i, t, d]) => `<article class="cp-card"><span class="cp-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[i]}</svg></span><h3 class="font-serif">${t}</h3><p>${d}</p></article>`).join("\n ")}
 </div>${swipeHint}`;

export const concernTabs = (key, rows) => tabs(key, rows.map((c) => ({ tab: c.tab, body: `
 <div class="cp-pgrid">
 ${img(c.img[0], c.img[1], c.img[2], c.img[3], "cp-img cp-img--43")}
 <div>
 <h3 class="cp-h3 font-serif">${c.title}</h3>
 <p class="cp-p">${c.text}</p>
 ${list(c.more)}
 <div class="cp-rec"><div><small>${c.recLabel || "Often combined with"}</small>${c.rec.map((p) => `<span class="cp-tag">${p}</span>`).join("")}</div><div><small>Typical sessions</small><b>${c.sessions}</b></div></div>
 ${c.link ? `<a class="cp-textlink" href="${c.link[0]}">${c.link[1]} ${arrow}</a>` : ""}
 </div>
 </div>` })));

export const depthCards = (rows) => `
 <div class="cp-grid cp-grid--3 cp-swipe">
 ${rows.map(([t, n, d, b, dt, s]) => `<article class="cp-card cp-depth"><h3 class="font-serif">${t}</h3><div class="cp-bar" aria-hidden="true">${[1, 2, 3].map((k) => `<i${k <= n ? ' class="on"' : ""}></i>`).join("")}</div><p>${d}</p><div class="cp-meta"><div><b>Best for:</b> ${b}</div><div><b>Downtime:</b> ${dt}</div><div><b>Sessions:</b> ${s}</div></div></article>`).join("\n ")}
 </div>${swipeHint}`;

/** Treatment menu with filter chips, "show all" and per-card details. rows: [name, level, cats, desc, tags[], how, downtime, sessions] */
export const menu = (filters, rows, noun = "treatments") => `
 <div class="cp-filter" role="group" aria-label="Filter treatments">
 ${filters.map(([f, t], i) => `<button type="button" data-f="${f}" aria-pressed="${i === 0}">${t}</button>`).join("")}
 </div>
 <div class="cp-grid cp-grid--3 cp-swipe" data-peels>
 ${rows.map(([n, lvl, c, d, tags, how, down, sess]) => `<article class="cp-card cp-peel" data-c="${c}"><div class="cp-peel-top"><h3 class="font-serif">${n}</h3><span class="cp-lvl">${lvl}</span></div><p>${d}</p><div>${tags.map((t) => `<span class="cp-tag">${t}</span>`).join("")}</div><details class="cp-pd"><summary>Details ${plus}</summary><dl><dt>How it works</dt><dd>${how}</dd><dt>Downtime</dt><dd>${down}</dd><dt>Sessions</dt><dd>${sess}</dd></dl></details><div class="cp-book"><a href="/appointment/">Book now</a></div></article>`).join("\n ")}
 </div>${swipeHint}
 <div class="cp-center"><button type="button" class="cp-showmore" data-showmore data-noun="${noun}" aria-expanded="false">Show all</button></div>`;

export const processTabs = (steps) => tabs("process", steps.map((s) => ({ tab: s.tab, body: `<div class="cp-pgrid">${img(s.img[0], s.img[1], s.img[2], s.img[3], "cp-img cp-img--43")}<div><p class="cp-p cp-p--light">${s.lead}</p><ul class="cp-steplist">${s.items.map((x) => `<li>${x}</li>`).join("")}</ul></div></div>` })), true);

export const timeline = (rows) => `<ol class="cp-timeline">${rows.map(([b, h, p]) => `<li class="cp-tl"><b>${b}</b><h3 class="font-serif">${h}</h3><p>${p}</p></li>`).join("")}</ol>`;

export const areas = (rows) => `<div class="cp-areas">${rows.map(([a, b]) => `<div class="cp-area"><b class="font-serif">${a}</b><span>${b}</span></div>`).join("")}</div>`;

export const compareTable = (cols, rows) => `
 <div class="cp-table-wrap" tabindex="0" role="region" aria-label="Treatment comparison table">
 <table class="cp-table">
 <thead><tr><th scope="col"></th>${cols.map((c, i) => `<th scope="col"${i === 0 ? ' class="hl"' : ""}>${c}</th>`).join("")}</tr></thead>
 <tbody>${rows.map(([h, ...v]) => `<tr><th scope="row">${h}</th>${v.map((x, i) => `<td${i === 0 ? ' class="hl"' : ""}>${x}</td>`).join("")}</tr>`).join("")}</tbody>
 </table>
 </div>
 <p class="cp-hint cp-hint--table" aria-hidden="true">Scroll the table sideways ${arrow}</p>`;

export const whyList = (rows) => `<ol class="cp-why">${rows.map(([t, d], i) => `<li><span class="n">0${i + 1}</span><div><h3 class="font-serif">${t}</h3><p>${d}</p></div></li>`).join("\n ")}</ol>`;

export const links = (rows) => `<div class="cp-links">${rows.map(([h, s, t]) => `<a href="${h}"><span><small>${s}</small>${t}</span>${arrow}</a>`).join("\n ")}</div>`;

export const cta = (title, text) => `
 <section class="mx-auto max-w-7xl px-5 py-4 pb-10 sm:px-8 sm:py-5 sm:pb-14">
 <div class="liquid-glass--section overflow-hidden rounded-[1.75rem] border border-ink/8 lg:rounded-[2.35rem] p-0">
 <div class="flex flex-col items-start justify-between gap-8 bg-forest px-6 py-10 text-cream sm:px-10 sm:py-14 lg:flex-row lg:items-end lg:px-14">
 <div class="max-w-3xl">
 <p class="text-[11px] font-medium tracking-[0.15em] text-cream/60 uppercase">Personalised care</p>
 <h2 class="mt-4 font-serif text-3xl leading-tight tracking-tight text-cream sm:text-4xl lg:text-5xl">${title}</h2>
 <p class="mt-5 max-w-2xl text-sm leading-7 text-cream/75 sm:text-base">${text}</p>
 </div>
 <a href="/appointment/" class="btn-press inline-flex shrink-0 items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm font-medium text-forest transition-transform duration-150">Book a consultation <svg class="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
 </div>
 </div>
 </section>`;

/** Replace the page's <main>, update SEO head and JSON-LD (FAQ, MedicalProcedure, breadcrumbs). */
export function writePage(jsonPath, sections, { title, desc, image, faqs, procedure, crumbs }) {
  const css = fs.readFileSync(new URL("./cp.css", import.meta.url), "utf8");
  const js = fs.readFileSync(new URL("./cp.js", import.meta.url), "utf8");
  const main = `<main class="cp relative overflow-x-clip text-ink">\n<style>${css}</style>${sections.join("")}\n<script>${js}</script>\n </main>`;
  const page = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const b = page.bodyHtml, s = b.indexOf("<main"), e = b.indexOf("</main>") + 7;
  if (s < 0 || e < 7) throw new Error("main not found");
  page.bodyHtml = b.slice(0, s) + main + b.slice(e);
  const h = page.head;
  h.title = h.og.title = h.tw.title = title;
  h.description = h.og.description = h.tw.description = desc;
  if (image) h.og.image = h.tw.image = image;
  const strip = (x) => x.replace(/<[^>]+>/g, "");
  h.jsonld = h.jsonld.filter((j) => !/"(FAQPage|MedicalProcedure|BreadcrumbList)"/.test(j));
  h.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: strip(q), acceptedAnswer: { "@type": "Answer", text: strip(a) } })) }));
  if (procedure) h.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "MedicalProcedure", url: h.canonical, description: desc, image, ...procedure }));
  if (crumbs) h.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })) }));
  fs.writeFileSync(jsonPath, JSON.stringify(page));
  console.log("ok", main.length);
}

/** Interactive "find your plan" widget: pick a concern + downtime, see a tailored plan.
 * results: [{ v, label, img:[src,alt,w,h], title, text, sessions, combine, none, some }] */
export const finder = ({ q1, q2, results }) => `
 <div class="cp-finder" data-finder data-dt="${q2.options[0][0]}">
 <div class="cp-fq"><p class="cp-fq-l"><span>1</span>${q1}</p>
 <div class="cp-fchips">${results.map((r, i) => `<button type="button" data-c="${r.v}" aria-pressed="${i === 0}">${r.label}</button>`).join("")}</div></div>
 <div class="cp-fq"><p class="cp-fq-l"><span>2</span>${q2.label}</p>
 <div class="cp-fchips">${q2.options.map(([v, t], i) => `<button type="button" data-d="${v}" aria-pressed="${i === 0}">${t}</button>`).join("")}</div></div>
 <div class="cp-fres" aria-live="polite">
 ${results.map((r, i) => `<article class="cp-fcard" data-r="${r.v}"${i ? " hidden" : ""}>
 ${img(r.img[0], r.img[1], r.img[2], r.img[3], "cp-img cp-img--43")}
 <div>
 <p class="cp-fcard-eb">Your suggested plan</p>
 <h3 class="font-serif">${r.title}</h3>
 <p>${r.text}</p>
 <dl>
 <div><dt>${q2.dt || "Best approach"}</dt><dd>${q2.options.map(([v], i) => `<span data-m="${v}"${i ? " hidden" : ""}>${r[v]}</span>`).join("")}</dd></div>
 <div><dt>Sessions</dt><dd>${r.sessions}</dd></div>
 <div><dt>Works well with</dt><dd>${r.combine}</dd></div>
 </dl>
 <a href="/appointment/" class="cp-fbtn">Book this plan ${arrow}</a>
 </div>
 </article>`).join("\n ")}
 </div>
 </div>`;

/** Machine spotlight: photo with badge, name, intro, feature tags, spec tiles, link. */
export const machine = ({ imgSrc, imgAlt, w, h, badge, name, text, tags, specs, link, card }) => `
 <div class="cp-machine">
 ${card ? `<div class="cp-mcard"><small>${card.eyebrow}</small><b class="font-serif">${card.title}</b>${card.lines.map(([n, t]) => `<div><span>${n}</span>${t}</div>`).join("")}</div>` : `<div class="cp-mimg">${badge ? `<span class="cp-mbadge"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M10 2.5l6 2.5v4.5c0 3.8-2.6 6.9-6 8-3.4-1.1-6-4.2-6-8V5z"/><path d="M7.3 10l1.9 1.9 3.6-3.8"/></svg> ${badge}</span>` : ""}<img src="${src(imgSrc)}" alt="${imgAlt}" width="${w}" height="${h}" loading="lazy" decoding="async"></div>`}
 <div>
 <h3 class="cp-mname font-serif">${name}</h3>
 <p class="cp-p">${text}</p>
 <div class="cp-badges">${tags.map((b) => `<span>${tick("currentColor")}${b}</span>`).join("")}</div>
 <div class="cp-specs">${specs.map(([b, t]) => `<div class="cp-spec"><b>${b}</b><span>${t}</span></div>`).join("")}</div>
 ${link ? `<a class="cp-textlink" href="${link[0]}">${link[1]} ${arrow}</a>` : ""}
 </div>
 </div>`;
