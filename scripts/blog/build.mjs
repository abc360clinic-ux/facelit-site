// Rebuilds every blog post (single-post) and article page (single-marketing_page) with one shared,
// mobile-first article template, plus the /blog/ index pages. Article text is carried over in full:
// the script only restructures and restyles it (contents menu, FAQ dropdowns, Instagram embeds, tables).
// Always reads from the untouched originals in ../backup/blog/, so it is safe to re-run.
// Usage (from facelit-site/): node scripts/blog/build.mjs
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const PAGES = "content/pages";
const BK = "../backup/blog";
const SITE = "https://facelit.in";
fs.mkdirSync(BK, { recursive: true });

const css = fs.readFileSync(new URL("./blog.css", import.meta.url), "utf8");
const js = fs.readFileSync(new URL("./blog.js", import.meta.url), "utf8");
const arrow = `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"/></svg>`;
const plus = `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M10 4v12M4 10h12"/></svg>`;
const MARK = 'data-ba="1"';

// ---------- originals ----------
function original(file) {
  const bk = path.join(BK, file);
  if (!fs.existsSync(bk)) {
    const cur = fs.readFileSync(path.join(PAGES, file), "utf8");
    if (cur.includes(MARK)) throw new Error(`${file} is already built but has no backup`);
    fs.writeFileSync(bk, cur);
  }
  return JSON.parse(fs.readFileSync(bk, "utf8"));
}
const files = fs.readdirSync(PAGES).filter((f) => f.endsWith(".json"));
const articles = [];
const indexes = [];
for (const f of files) {
  const raw = fs.readFileSync(path.join(PAGES, f), "utf8");
  const p = JSON.parse(raw);
  if (/(^|\s)blog(\s|$)/.test(p.bodyClass) && /^blog(__page__\d+)?\.json$/.test(f)) { indexes.push(f); continue; }
  if (!/single-post|single-marketing_page/.test(p.bodyClass)) continue;
  // Skip pages already redesigned with the treatment kit (hub pages).
  // cp-anchor marks sections built with scripts/treatment-kit.
  if (raw.includes("cp-anchor") && !raw.includes(MARK)) continue;
  if (fs.existsSync(path.join(BK, f)) && fs.readFileSync(path.join(BK, f), "utf8").includes("cp-anchor")) continue;
  articles.push(f);
}

// ---------- helpers ----------
const slug = (s) => s.toLowerCase().replace(/&[a-z]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "section";
const text = ($, el) => $(el).text().replace(/\s+/g, " ").trim();
const escAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const TOPICS = [
  ["Hair", /\bhair|scalp|alopecia|gfc|qr ?678|bald|dandruff/i],
  ["Anti-aging", /aging|ageing|botox|filler|wrinkle|profhilo|hifu|jawline|lift|collagen|skin booster|restylane|sagging/i],
  ["Body &amp; wellness", /\biv\b|nad|glutathione|weight|body|slim|fat|obesity|wellness|drip|detox|vitamin/i],
  ["Skin", /./],
];
const topicOf = (t) => TOPICS.find(([, re]) => re.test(t))[0];
const readMins = (html) => Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));

function igEmbed(url, caption) {
  const m = url.match(/instagram\.com\/(reel|p|tv)\/([\w-]+)/);
  if (!m) return null;
  const clean = `https://www.instagram.com/${m[1]}/${m[2]}/`;
  return `<figure class="ba-ig"><div class="ba-ig-frame"><iframe src="${clean}embed/" title="Facelit on Instagram" loading="lazy" allowtransparency="true" scrolling="no"></iframe></div><figcaption><a href="${clean}" target="_blank" rel="noopener">View this post on Instagram</a>${caption ? ` · ${escHtml(caption)}` : ""}</figcaption></figure>`;
}

// Turns the flat article body into the new structure. Returns { html, toc, faqs }.
function transformBody(bodyHtml) {
  const $ = cheerio.load(`<div id="ba-root">${bodyHtml}</div>`, null, false);
  const root = $("#ba-root");

  const igCap = (el) => { const m = el.text().match(/A post shared by[^)]*\)?/i); return m ? m[0].trim() : ""; };
  // Instagram: blockquote embeds and the leftover "> View this post on Instagram > > >" paragraphs.
  const seen = new Set();
  root.find(".facelit-ig-embed").each((_, el) => { if ($(el).parents(".facelit-ig-embed").length === 0) $(el).replaceWith($(el).find("a").first().length ? `<p data-ig="${$(el).find("a").first().attr("href")}" data-cap="${escAttr(igCap($(el)))}"></p>` : ""); });
  root.find("blockquote.instagram-media").each((_, el) => $(el).replaceWith(`<p data-ig="${$(el).find("a").attr("href") || $(el).attr("data-instgrm-permalink")}" data-cap="${escAttr(igCap($(el)))}"></p>`));
  root.find("p").each((_, el) => {
    const a = $(el).find('a[href*="instagram.com"]');
    if (a.length && /View this post on Instagram/i.test($(el).text()) && $(el).text().replace(/View this post on Instagram|A post shared by[^)]*\)|[>\s]/gi, "") === "") $(el).replaceWith(`<p data-ig="${a.first().attr("href")}" data-cap="${escAttr(igCap($(el)))}"></p>`);
  });
  root.find("p[data-ig]").each((_, el) => {
    const e = igEmbed($(el).attr("data-ig") || "", $(el).attr("data-cap") || "");
    const key = e && e.match(/src="([^"]+)"/)[1];
    if (!e || seen.has(key)) return $(el).remove();
    seen.add(key);
    $(el).replaceWith(e);
  });

  // Empty paragraphs left by the scrape.
  root.find("p").each((_, el) => { if (!$(el).text().trim() && !$(el).find("img,iframe,video").length) $(el).remove(); });

  // Tables scroll sideways on phones.
  root.find("table").each((_, el) => { if (!$(el).parent().hasClass("ba-table")) $(el).wrap('<div class="ba-table" tabindex="0"></div>'); });
  root.find("img").each((_, el) => { if (!$(el).attr("loading")) $(el).attr("loading", "lazy"); $(el).attr("decoding", "async"); });

  // FAQ blocks -> dropdowns.
  const faqs = [];
  const isFaqHead = (el) => /\bfaqs?\b|frequently asked|common questions|questions? (&|and) answers/i.test($(el).text());
  root.find("h2").filter((_, el) => isFaqHead(el)).each((_, h) => {
    const group = [];
    let n = $(h).next();
    while (n.length && !n.is("h2")) { group.push(n); n = n.next(); }
    const items = [];
    const qText = (el) => text($, el).replace(/\s+/g, " ").trim();
    const liIsQ = (g, li) => { const f = $(li).children().first(); return f.is("strong,b,h3,h4") && (g.is("[data-faqlist]") || /\?\s*$/.test(qText(f))); };
    const listIsQ = (g) => g.is("ol,ul") && g.children("li").length > 0 && g.children("li").toArray().every((li) => liIsQ(g, li));
    const headIsQ = (g) => g.is("h3,h4,h5,h6") || (g.is("p") && g.children().length === 1 && g.children().first().is("strong,b") && qText(g) === qText(g.children().first()) && /\?\s*$/.test(qText(g)));
    let last = null;
    for (const g of group) {
      if (listIsQ(g)) {
        g.children("li").each((_, li) => { const q = $(li).children().first(); const qh = q.html(); q.remove(); last = [qh, $(li).html().trim()]; items.push(last); });
        g.attr("data-drop", "1");
      } else if (headIsQ(g)) {
        last = [g.is("p") ? g.children().first().html() : g.html(), ""]; items.push(last); g.attr("data-drop", "1");
      } else if (last) { last[1] += $.html(g); g.attr("data-drop", "1"); }
    }
    if (items.length < 2) { group.forEach((g) => g.removeAttr("data-drop")); return; }
    const first = group.find((g) => g.attr("data-drop"));
    const html = `<div class="ba-faq">${items.map(([q, a]) => `<details><summary><span>${q.replace(/^\s*(Q\s*)?\d+\s*[.:)]\s*/i, "")}</span>${plus}</summary><div class="ba-a">${a}</div></details>`).join("")}</div>`;
    first.before(html);
    group.forEach((g) => { if (g.attr("data-drop")) g.remove(); });
    items.forEach(([q, a]) => faqs.push([cheerio.load(q).text().replace(/^\s*(Q\s*)?\d+\s*[.:)]\s*/i, "").trim(), cheerio.load(a).text().replace(/\s+/g, " ").trim()]));
  });

  // Section ids + contents menu.
  const toc = [];
  const used = new Set();
  root.find("h2").each((_, el) => {
    let id = slug(text($, el));
    while (used.has(id)) id += "-2";
    used.add(id);
    $(el).attr("id", id).removeAttr("class");
    toc.push([id, text($, el).replace(/:$/, "")]);
  });
  root.find("h3,h4,h5,h6").removeAttr("class");
  return { html: root.html(), toc, faqs };
}

// ---------- shared pieces ----------
const crumbsHtml = (topic) => `<nav class="ba-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/blog/">Blog</a><span>/</span><b>${topic}</b></nav>`;
let stdCta = null; // the post CTA section, reused for every article so they all end the same way

function articleMain({ topic, metaBits, h1, excerpt, img, bodyHtml, toc, cta }) {
  const figure = img ? `<figure class="ba-fig"><img src="${img.src}" alt="${escAttr(img.alt || h1.replace(/<[^>]+>/g, ""))}" fetchpriority="high" decoding="async"></figure>` : "";
  const tocHtml = toc.length >= 3 ? `<aside class="ba-toc"><details class="ba-tocbox" data-toc><summary><span>In this article</span><small>${toc.length} sections</small>${plus}</summary><ol>${toc.map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join("")}</ol></details></aside>` : "";
  return `<main class="relative overflow-x-clip text-ink" ${MARK}>
<div class="ba-progress" aria-hidden="true"><span data-progress></span></div>
<style>${css}</style>
<section class="mx-auto max-w-7xl px-5 pt-32 pb-4 sm:px-8 sm:pt-36 sm:pb-5">
 <div class="liquid-glass--section overflow-hidden rounded-[1.75rem] border border-ink/8 lg:rounded-[2.35rem] ba-hero${img ? "" : " ba-hero--noimg"}">
 <div class="ba-top">${crumbsHtml(topic)}<div class="ba-meta">${metaBits.map((m) => `<span>${m}</span>`).join("")}</div><h1 class="font-serif">${h1}</h1></div>
 ${figure}
 ${excerpt ? `<div class="ba-ex">${excerpt}</div>` : ""}
 </div>
</section>
<section class="mx-auto max-w-7xl px-5 py-4 sm:px-8 sm:py-5">
 <div class="liquid-glass--section rounded-[1.75rem] border border-ink/8 lg:rounded-[2.35rem] ba-shell">
 <div class="ba-layout${tocHtml ? "" : " ba-layout--solo"}">
 ${tocHtml}
 <article class="blog-prose ba-prose">${bodyHtml}</article>
 </div>
 <div class="ba-end"><a href="/blog/" class="ba-back"><span aria-hidden="true">←</span> All posts</a><a href="#top" class="ba-top-link" data-totop>Back to top ↑</a></div>
 </div>
</section>
${cta}
<script>${js}</script>
</main>`;
}

function setHead(page, { title, desc, img, date, faqs, crumbTopic }) {
  const h = page.head;
  const url = h.canonical || SITE + page.path;
  const ld = [{
    "@context": "https://schema.org", "@type": "BlogPosting", headline: title, description: desc || undefined, mainEntityOfPage: url,
    image: img ? SITE + img.src : undefined, datePublished: date || undefined,
    author: { "@type": "Organization", name: "Facelit" }, publisher: { "@type": "Organization", name: "Facelit", logo: { "@type": "ImageObject", url: SITE + "/wp-content/themes/facelit/assets/facelit-logo.svg" } },
  }, {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" }, { "@type": "ListItem", position: 2, name: "Blog", item: SITE + "/blog/" }, { "@type": "ListItem", position: 3, name: title, item: url }],
  }];
  if (faqs.length >= 2) ld.push({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  h.jsonld = (h.jsonld || []).filter((j) => !/"(BlogPosting|BreadcrumbList|FAQPage)"/.test(j)).concat(ld.map((x) => JSON.stringify(x)));
}
const isoDate = (d) => { const t = Date.parse(d); return isNaN(t) ? null : new Date(t + 12 * 3600e3).toISOString().slice(0, 10); };

function replaceMain(page, main) {
  const b = page.bodyHtml, s = b.indexOf("<main"), e = b.indexOf("</main>") + 7;
  page.bodyHtml = b.slice(0, s) + main + b.slice(e);
}

// ---------- posts ----------
const report = [];
const postFiles = articles.filter((f) => /single-post/.test(original(f).bodyClass));
const mktFiles = articles.filter((f) => !postFiles.includes(f));
const listing = {}; // href -> {topic, mins}

for (const f of postFiles) {
  const page = original(f);
  const $ = cheerio.load(page.bodyHtml);
  const art = $("main article").first();
  const head = art.children("div").first();
  const ps = head.children("p");
  const date = text($, ps.eq(1));
  const h1 = head.children("h1").html().trim();
  const excerpt = head.children("p").last().is(ps.eq(1)) ? "" : `<p>${head.children("p").last().html().trim()}</p>`;
  const im = art.find("> div img").first();
  const img = im.length ? { src: im.attr("src"), alt: im.attr("alt") } : null;
  const prose = art.find(".blog-prose").first().html();
  const ctaSec = $("main > section").eq(1);
  const cta = ctaSec.length ? $.html(ctaSec) : "";
  if (!stdCta && cta) stdCta = cta;
  const { html, toc, faqs } = transformBody(prose);
  const titleText = cheerio.load(h1).text().trim();
  const topic = topicOf(titleText);
  const mins = readMins(html);
  replaceMain(page, articleMain({ topic, metaBits: [date, `${mins} min read`].filter(Boolean), h1, excerpt, img, bodyHtml: html, toc, cta }));
  setHead(page, { title: titleText, desc: page.head.description, img, date: isoDate(date), faqs });
  fs.writeFileSync(path.join(PAGES, f), JSON.stringify(page));
  listing[page.path] = { topic, mins };
  report.push([f, "post", toc.length, faqs.length]);
}

// ---------- article (marketing) pages ----------
for (const f of mktFiles) {
  const page = original(f);
  const $ = cheerio.load(page.bodyHtml);
  const main = $("main");
  const heroImg = main.children("div").first().find("img").first();
  const h1el = main.find("h1").first();
  const card = h1el.parent();
  const eyebrow = text($, h1el.prev("p"));
  const proses = main.find(".prose");
  const intro = card.children(".prose").first();
  let body = intro.length ? intro.html() : "";
  let ctaTitle = "";
  proses.each((_, el) => {
    if (intro.length && el === intro[0]) return;
    $(el).children().each((_, blk) => {
      const B = $(blk);
      if (B.hasClass("card-3d-forest")) { ctaTitle = text($, B.find("h2")); return; }
      const faqUl = B.children("ul").filter((_, u) => $(u).children("li.bg-mist, li[class*='bg-mist']").length > 0);
      if (B.is("div") && B.children("h2").length && faqUl.length) {
        // Original FAQ card list -> flat question list the FAQ converter understands.
        const items = faqUl.children("li").toArray().map((li) => { const q = $(li).children("strong").first(); const a = $(li).children("div").first(); return `<li><strong>${q.html()}</strong>${a.length ? a.html() : ""}</li>`; }).join("");
        body += `<h2>${B.children("h2").html()}</h2><ol data-faqlist>${items}</ol>`;
      } else if (B.is("div") && B.children("h2").length) {
        body += `<h2>${B.children("h2").html()}</h2>` + B.children().not("h2").toArray().map((c) => ($(c).is("div.mt-4") ? $(c).html() : $.html(c))).join("");
      } else body += $.html(B);
    });
  });
  const { html, toc, faqs } = transformBody(body);
  const titleText = text($, h1el);
  const topic = topicOf(titleText + " " + eyebrow);
  const tags = eyebrow.split("·").map((s) => s.trim()).slice(1).filter(Boolean);
  const mins = readMins(html);
  const img = heroImg.length ? { src: heroImg.attr("src"), alt: heroImg.attr("alt") || titleText } : null;
  replaceMain(page, articleMain({ topic, metaBits: [...tags, `${mins} min read`], h1: h1el.html().trim(), excerpt: "", img, bodyHtml: html, toc, cta: stdCta }));
  setHead(page, { title: titleText, desc: page.head.description, img, date: null, faqs });
  fs.writeFileSync(path.join(PAGES, f), JSON.stringify(page));
  report.push([f, "article", toc.length, faqs.length, ctaTitle ? "" : "no-cta"]);
}

// ---------- blog index pages ----------
const allPosts = [];
const pageCount = indexes.length;
const perIndex = {};
for (const f of indexes.sort()) {
  const page = original(f);
  const $ = cheerio.load(page.bodyHtml);
  const list = [];
  $("main li.group > a").each((_, a) => {
    const A = $(a);
    const href = A.attr("href");
    list.push({ href, img: A.find("img").attr("src"), alt: A.find("img").attr("alt") || "", date: text($, A.find("p").first()), title: A.find("h2").html().trim(), excerpt: A.find("p").last().html().trim(), ...(listing[href] || { topic: topicOf(text($, A.find("h2"))), mins: null }) });
  });
  perIndex[f] = list;
  allPosts.push(...list);
}
const topics = ["Skin", "Hair", "Anti-aging", "Body &amp; wellness"].filter((t) => allPosts.some((p) => p.topic === t));
const card = (p, i, feat = false) => `<li class="bi-item${feat ? " bi-item--feat" : ""}" data-topic="${p.topic}" data-q="${escAttr(cheerio.load(p.title + " " + p.excerpt).text().toLowerCase())}">
 <a href="${p.href}" class="bi-card">
 <div class="bi-img"><img src="${p.img}" alt="${escAttr(p.alt)}" loading="${i < 4 ? "eager" : "lazy"}" decoding="async"><span>${p.topic}</span></div>
 <div class="bi-body"><p class="bi-meta">${p.date}${p.mins ? ` · ${p.mins} min read` : ""}</p><h2 class="font-serif">${p.title}</h2><p class="bi-ex">${p.excerpt}</p><span class="bi-more">Read article ${arrow}</span></div>
 </a>
</li>`;
for (const f of indexes) {
  const page = original(f);
  const n = f === "blog.json" ? 1 : Number(f.match(/__(\d+)\.json$/)[1]);
  const posts = n === 1 ? allPosts : perIndex[f];
  const pager = `<nav class="bi-pager" aria-label="Blog pages">${Array.from({ length: pageCount }, (_, i) => i + 1).map((k) => k === n ? `<span aria-current="page">${k}</span>` : `<a href="${k === 1 ? "/blog/" : `/blog/page/${k}/`}">${k}</a>`).join("")}</nav>`;
  const main = `<main class="relative overflow-x-clip text-ink" ${MARK}>
<style>${css}</style>
<section class="mx-auto max-w-7xl px-5 pt-32 pb-4 sm:px-8 sm:pt-36 sm:pb-5">
 <div class="liquid-glass--section rounded-[1.75rem] border border-ink/8 lg:rounded-[2.35rem] bi-hero">
 <nav class="ba-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><b>Blog${n > 1 ? ` · Page ${n}` : ""}</b></nav>
 <h1 class="font-serif">Latest from the Blog</h1>
 <p class="bi-sub">Insights on skin health, treatments, and feeling like yourself again.</p>
 <div class="bi-tools" data-bi>
 <label class="bi-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg><span class="sr-only">Search articles</span><input type="search" placeholder="Search: acne, PRP, HIFU…" data-bisearch autocomplete="off"></label>
 <div class="bi-chips" role="group" aria-label="Filter by topic"><button type="button" data-bitopic="all" aria-pressed="true">All <small>${posts.length}</small></button>${topics.map((t) => `<button type="button" data-bitopic="${t}" aria-pressed="false">${t} <small>${posts.filter((p) => p.topic === t).length}</small></button>`).join("")}</div>
 </div>
 </div>
</section>
<section class="mx-auto max-w-7xl px-5 py-4 pb-10 sm:px-8 sm:py-5 sm:pb-14">
 <ul class="bi-grid" data-bigrid${n === 1 ? ' data-bipage="12"' : ""}>
 ${posts.map((p, i) => card(p, i, i === 0)).join("\n ")}
 </ul>
 <p class="bi-empty" data-biempty hidden>No articles match your search. Try another word, or <button type="button" data-bireset>show all articles</button>.</p>
 ${n === 1 ? `<div class="bi-moreWrap"><button type="button" class="bi-moreBtn" data-bimore>Show more articles</button></div>` : pager}
</section>
<script>${js}</script>
</main>`;
  replaceMain(page, main);
  const h = page.head;
  h.jsonld = (h.jsonld || []).filter((j) => !/"(Blog|ItemList)"/.test(j));
  h.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "Blog", name: "Facelit Blog", url: SITE + "/blog/", blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: cheerio.load(p.title).text(), url: SITE + p.href, image: SITE + p.img })) }));
  fs.writeFileSync(path.join(PAGES, f), JSON.stringify(page));
}

console.log(`posts ${postFiles.length}, articles ${mktFiles.length}, index pages ${indexes.length}`);
const noFaq = report.filter((r) => r[3] === 0).length;
console.log(`FAQ dropdowns on ${report.length - noFaq} pages; ${noFaq} pages without a detectable FAQ`);
fs.writeFileSync("/tmp/claude-501/blog-report.json", JSON.stringify(report));
