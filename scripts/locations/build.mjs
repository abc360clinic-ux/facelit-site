// Rebuilds /locations/ below the hero: keeps the original hero, branch checker and CTA, and adds a clinic carousel,
// a nearest-clinic finder, a "same care" strip, visit tabs and short FAQs.
// Usage (from facelit-site/): node scripts/locations/build.mjs content/pages/locations.json
import fs from "node:fs";
import * as k from "../treatment-kit/kit.mjs";
const { shell, head, list, tabs, accordion } = k;

const U = "/wp-content/uploads/2026/07/";
// [key, area, district, image, w, h, blurb, address, phoneHref, phoneText, mapsUrl, pageUrl, serves[]]
const clinics = [
  ["tvm", "Kowdiar", "Thiruvananthapuram", U + "Asset-2-2.webp", 924, 521,
    "Our flagship clinic and Kerala headquarters, with the full range of Facelit treatments and technology under one roof.",
    "C 10, Jawahar Nagar, Kowdiar, Thiruvananthapuram, Kerala 695003",
    "tel:+917356657222", "73566 57222",
    "https://www.google.com/maps/place/Facelit+Skin+Hair+Wellness/@8.5151281,76.9629697,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05bb1e6ffd4c5b:0x3368023bc3828dd0!8m2!3d8.5151281!4d76.9655446",
    "/locations/trivandrum/", ["Trivandrum city", "Kazhakkoottam", "Neyyattinkara", "Attingal", "Kanyakumari"]],
  ["kgp", "Karunagappally", "Kollam", U + "Asset-5-2.webp", 603, 402,
    "Facelit skin, hair and wellness care for Kollam's coastal belt, so you get a doctor-led consultation close to home.",
    "Building No. 1205, First Floor, GG Plaza, Lalaji Junction, Karunagappally, Kerala 690518",
    "tel:+917736699391", "77366 99391",
    "https://www.google.com/maps/place/Facelit+Skin+Hair+%26+Wellness+Karunagappally/@9.0498558,76.5337749,17z/data=!3m1!4b1!4m6!3m5!1s0x3b06031c803b58ed:0x97588ea84d87fe57!8m2!3d9.0498558!4d76.5363498",
    "/locations/karunagappalli/", ["Kollam", "Kayamkulam", "Oachira", "Alappuzha", "Pathanamthitta"]],
  ["gvr", "Guruvayur", "Thrissur", U + "Asset-6-2.webp", 604, 403,
    "Our Thrissur clinic in Kerala's temple town, for residents and visitors who want the same expert care as Trivandrum.",
    "1st Floor, MVK Jahas Arcade, near Pancharamukku, Guruvayur, Kerala 680101",
    "tel:+919895111059", "98951 11059",
    "https://www.google.com/maps/place/Facelit+Skin+Hair+%26+Wellness+Clinic+Guruvayur/data=!4m2!3m1!1s0x0:0xc4555ef53eb8077c",
    "/locations/guruvayur/", ["Thrissur", "Kunnamkulam", "Chavakkad", "Ponnani", "Palakkad"]],
];
const C = Object.fromEntries(clinics.map((c) => [c[0], c]));
const esc = (u) => u.replace(/&/g, "&amp;");
const pin = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>`;
const phone = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>`;
const nav = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 11l18-8-8 18-2-8-8-2z"/></svg>`;

const carousel = `
<div class="lc" data-lc>
 <div class="lc-track" data-lctrack tabindex="0" aria-label="Facelit clinics">
 ${clinics.map(([key, area, dist, src, w, h, blurb, addr, tel, telT, maps, url, serves], i) => `<article class="lc-slide" id="clinic-${key}" aria-label="${area}, ${dist}">
 <a href="${url}" class="lc-img"><img src="${src}" alt="Facelit skin and hair clinic in ${area}, ${dist}" width="${w}" height="${h}" loading="${i ? "lazy" : "eager"}" decoding="async"><span>${dist}</span></a>
 <div class="lc-body">
 <h3 class="font-serif"><a href="${url}">${area}</a></h3>
 <p>${blurb}</p>
 <p class="lc-addr">${pin}<span>${addr}</span></p>
 <div class="lc-serves"><small>Convenient for</small>${serves.map((s) => `<span>${s}</span>`).join("")}</div>
 <div class="lc-acts">
 <a href="${tel}" class="lc-btn">${phone}${telT}</a>
 <a href="${esc(maps)}" class="lc-btn lc-btn--o" target="_blank" rel="noopener">${nav}Directions</a>
 </div>
 <a href="${url}" class="lc-more">View ${area} clinic ${k.arrow}</a>
 </div>
 </article>`).join("\n ")}
 </div>
 <div class="lc-dots" data-lcdots aria-hidden="true"></div>
</div>`;

// District finder: [district, primary, alternative, note]
const districts = [
  ["Thiruvananthapuram", "tvm", "kgp", "Our flagship clinic in Kowdiar is in the heart of the city."],
  ["Kanyakumari / Nagercoil", "tvm", null, "Kowdiar is the closest Facelit for patients coming from across the Tamil Nadu border."],
  ["Kollam", "kgp", "tvm", "Karunagappally sits on the NH 66 at Lalaji Junction, an easy trip from anywhere in Kollam district."],
  ["Alappuzha", "kgp", "gvr", "Karunagappally is the nearest clinic for most of Alappuzha, especially Kayamkulam, Haripad and Cherthala."],
  ["Pathanamthitta", "kgp", "tvm", "Karunagappally is usually the shortest drive from Adoor, Pandalam and Thiruvalla."],
  ["Kottayam", "kgp", "gvr", "Karunagappally is the closer option for most of Kottayam; Guruvayur suits the northern side."],
  ["Idukki", "kgp", "gvr", "Choose Karunagappally from the southern ranges or Guruvayur from Thodupuzha and the north."],
  ["Ernakulam", "gvr", "kgp", "Guruvayur is the closest Facelit for Kochi, Aluva, Angamaly and North Paravur."],
  ["Thrissur", "gvr", null, "Our Guruvayur clinic is near Pancharamukku, a short drive from Thrissur town."],
  ["Palakkad", "gvr", null, "Guruvayur is the nearest Facelit for Palakkad, Ottapalam and Shoranur."],
  ["Malappuram", "gvr", null, "Guruvayur is close to Ponnani, Tirur, Kuttippuram and Edappal."],
  ["Kozhikode &amp; north", "gvr", null, "Guruvayur is our northernmost clinic and the closest one for Malabar."],
];

const finder = `
<div class="lf" data-lf>
 <div class="lf-chips" role="group" aria-label="Choose your district">${districts.map(([d], i) => `<button type="button" data-lfd="${i}" aria-pressed="${i === 0}">${d}</button>`).join("")}</div>
 <div class="lf-out" aria-live="polite">
 ${districts.map(([d, p, a, note], i) => { const c = C[p]; const alt = a && C[a]; return `<div class="lf-res" data-lfr="${i}"${i ? " hidden" : ""}>
 <img src="${c[3]}" alt="" width="${c[4]}" height="${c[5]}" loading="lazy" decoding="async">
 <div class="lf-txt">
 <small>Nearest clinic for ${d}</small>
 <h3 class="font-serif">Facelit ${c[1]}, ${c[2]}</h3>
 <p>${note}</p>
 <div class="lc-acts"><a href="${c[8]}" class="lc-btn">${phone}Call now</a><a href="${esc(c[10])}" class="lc-btn lc-btn--o" target="_blank" rel="noopener">${nav}Directions</a></div>
 ${alt ? `<p class="lf-alt">Also convenient: <a href="${alt[11]}">${alt[1]}, ${alt[2]}</a></p>` : ""}
 </div>
 </div>`; }).join("\n ")}
 </div>
</div>`;

const promises = [
  ["Doctor-led consultations", "Every plan starts with a doctor who examines your skin, scalp or body before anything is booked."],
  ["Same treatment protocols", "Our clinics follow the same clinical protocols, so a treatment means the same thing in every branch."],
  ["Medical-grade products", "Genuine, medical-grade products and consumables, never diluted or substituted."],
  ["Plans made for Indian skin", "Settings, peels and products are chosen with brown skin and Kerala's heat and humidity in mind."],
  ["Follow-up that continues", "Reviews, progress photos and plan changes are part of the course, not an extra."],
];
const strip = `<div class="ls cp-swipe" tabindex="0" aria-label="What every Facelit clinic offers">${promises.map(([t, d], i) => `<div class="ls-card"><span>0${i + 1}</span><h3 class="font-serif">${t}</h3><p>${d}</p></div>`).join("")}</div>`;

const visit = tabs("visit", [
  { tab: "Before you come", body: list(["Call or book online to pick a time that suits you", "Note your concerns, how long you've had them and what you've tried", "Bring current medicines, prescriptions and any recent test reports", "Come with clean skin, without heavy makeup, for skin consultations", "Avoid oiling or styling your hair before a scalp or hair check"]) },
  { tab: "At the clinic", body: list(["A short registration and history with our team", "A doctor-led examination of your skin, hair or body", "Analysis or measurements where your concern needs it", "A clear plan with sessions, costs and expected results", "Your first session the same day, if it's suitable and you're ready"]) },
  { tab: "After your visit", body: list(["Written aftercare and home-care advice", "Your next appointment booked at the branch that suits you", "Progress reviews to compare results over time", "A direct line to the clinic if you have any questions"]) },
]);

const faqs = [
  ["Where are Facelit clinics in Kerala?", "Facelit has three clinics: Kowdiar in Thiruvananthapuram (our flagship), Karunagappally in Kollam district, and Guruvayur in Thrissur district."],
  ["How do I find a dermatologist near me?", "Choose your district in the finder above to see your closest Facelit clinic, then call the branch or tap Directions to open it in Google Maps."],
  ["Is the care the same at every Facelit clinic?", "Yes. Every clinic follows the same doctor-led consultation, clinical protocols and medical-grade products. Some advanced machines are only at our Trivandrum flagship, so call your branch before booking a machine-based treatment."],
  ["Do I need an appointment?", "We recommend booking ahead so a doctor is free when you arrive. Walk-ins are welcome, depending on availability that day."],
  ["Which clinic should I visit for laser, HIFU or body treatments?", "Our Kowdiar clinic in Trivandrum has the full range of machines. Karunagappally and Guruvayur offer selected technologies, and the team will tell you what's available when you call."],
  ["What should I bring to my first consultation?", "Bring a list of your current medicines, past prescriptions and any recent blood test reports. Photos of how your concern has changed over time can also help the doctor."],
];

const pageCss = `<style>
.lc-track{display:flex;gap:1rem;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;scrollbar-width:none;padding:.25rem .1rem 1rem;margin-top:1.25rem;-webkit-overflow-scrolling:touch}.lc-track::-webkit-scrollbar{display:none}
.lc-track:focus-visible,.ls:focus-visible{outline:2px solid #3a4d39;outline-offset:4px;border-radius:1rem}
.lc-slide{flex:0 0 86%;scroll-snap-align:start;display:flex;flex-direction:column;background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.4rem;overflow:hidden;box-shadow:0 14px 34px -24px rgba(45,60,45,.45)}
@media(min-width:640px){.lc-slide{flex-basis:calc(50% - .5rem)}}
@media(min-width:1024px){.lc-track{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));overflow:visible}.lc-dots{display:none!important}}
.lc-img{position:relative;display:block;aspect-ratio:16/10;overflow:hidden;background:#f3efe4}
.lc-img img{width:100%;height:100%;object-fit:cover;transition:transform .5s}.lc-slide:hover .lc-img img{transform:scale(1.04)}
.lc-img span{position:absolute;left:.8rem;bottom:.8rem;background:rgba(253,247,239,.94);color:#2d3c2d;border-radius:999px;padding:.3rem .75rem;font:600 .7rem Onest,sans-serif;letter-spacing:.08em;text-transform:uppercase}
.lc-body{padding:1.1rem 1.2rem 1.3rem;display:flex;flex-direction:column;gap:.7rem;flex:1}
.lc-body h3{margin:0;font-size:1.6rem;line-height:1.1}.lc-body h3 a{color:#2d3c2d;text-decoration:none}
.lc-body>p{margin:0;font-size:.92rem;line-height:1.55;color:#5c574f}
.lc-addr{display:flex;gap:.5rem;align-items:flex-start;padding:.65rem .75rem;border-radius:.8rem;background:#faf6ef;font-size:.85rem!important;color:#2d3c2d!important}.lc-addr svg{flex:none;width:1.05rem;height:1.05rem;color:#986a3e;margin-top:.1rem}
.lc-serves{display:flex;flex-wrap:wrap;gap:.35rem;align-items:center}.lc-serves small{width:100%;font:600 .66rem Onest,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#986a3e}
.lc-serves span{padding:.28rem .6rem;border-radius:999px;background:#f3efe4;font-size:.76rem;color:#2d3c2d}
.lc-acts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.5rem;margin-top:auto}
.lc-btn{display:inline-flex;align-items:center;justify-content:center;gap:.35rem;padding:.65rem .45rem;border-radius:999px;background:#3a4d39;color:#fdf7ef;font:500 .82rem Onest,sans-serif;text-decoration:none;white-space:nowrap;border:1px solid #3a4d39}
.lc-btn svg{width:1rem;height:1rem;flex:none}.lc-btn--o{background:#fff;color:#2d3c2d;border-color:rgba(58,77,57,.25)}.lc-btn:hover{opacity:.88}
.lc-more{display:inline-flex;align-items:center;gap:.35rem;color:#2d3c2d;font:500 .86rem Onest,sans-serif;text-decoration:underline;text-underline-offset:3px}.lc-more svg{width:.85rem;height:.85rem}
.lc-dots{display:flex;justify-content:center;gap:.4rem}.lc-dots i{width:8px;height:8px;border-radius:99px;background:rgba(58,77,57,.2);transition:width .2s,background .2s}.lc-dots i.on{width:22px;background:#3a4d39}
.lf{display:grid;gap:1rem;margin-top:1.25rem}@media(min-width:900px){.lf{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);align-items:start}}
.lf>*{min-width:0}
.lf-chips{display:flex;gap:.5rem;overflow-x:auto;scrollbar-width:none;padding-bottom:.25rem}.lf-chips::-webkit-scrollbar{display:none}
@media(min-width:900px){.lf-chips{flex-wrap:wrap;overflow:visible}}
.lf-chips button{flex:none;padding:.55rem 1rem;border-radius:999px;border:1px solid rgba(58,77,57,.18);background:#fff;color:#2d3c2d;font:500 .88rem Onest,sans-serif;cursor:pointer;white-space:nowrap}
.lf-chips button[aria-pressed=true]{background:#3a4d39;color:#fdf7ef;border-color:#3a4d39}
.lf-res{display:grid;background:#fff;border:1px solid rgba(58,77,57,.12);border-radius:1.4rem;overflow:hidden;animation:lfIn .3s ease}
.lf-res[hidden]{display:none}
@media(min-width:640px){.lf-res{grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)}}
.lf-res img{width:100%;height:100%;min-height:170px;max-height:240px;object-fit:cover}
@media(min-width:640px){.lf-res img{max-height:none}}
.lf-txt{padding:1.1rem 1.2rem 1.25rem;display:flex;flex-direction:column;gap:.6rem}
.lf-txt small{font:600 .68rem Onest,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#986a3e}
.lf-txt h3{margin:0;font-size:1.45rem;line-height:1.15;color:#2d3c2d}.lf-txt p{margin:0;font-size:.92rem;line-height:1.55;color:#5c574f}
.lf-txt .lc-acts{margin-top:.2rem}.lf-alt{font-size:.85rem!important}.lf-alt a{color:#2d3c2d;font-weight:600}
@keyframes lfIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.ls{display:flex;gap:.85rem;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:.25rem .1rem .75rem;margin-top:1.25rem}.ls::-webkit-scrollbar{display:none}
.ls-card{flex:0 0 74%;scroll-snap-align:start;background:#3a4d39;color:#fdf7ef;border-radius:1.3rem;padding:1.2rem 1.2rem 1.35rem}
@media(min-width:640px){.ls-card{flex-basis:calc(46% - .5rem)}}
.ls-card span{font:500 .8rem Onest,sans-serif;color:#d9c3a0;letter-spacing:.08em}.ls-card h3{margin:.55rem 0 .4rem;font-size:1.2rem;line-height:1.2;color:#fdf7ef}.ls-card p{margin:0;font-size:.88rem;line-height:1.5;color:rgba(253,247,239,.82)}
</style>`;

const pageJs = `<script>(function(){
var r=document.querySelector('[data-lc]');if(r){var tr=r.querySelector('[data-lctrack]'),dots=r.querySelector('[data-lcdots]'),n=tr.children.length;
dots.innerHTML=new Array(n+1).join('<i></i>');
function upd(){var s=tr.children[0].getBoundingClientRect().width+16,i=Math.min(n-1,Math.round(tr.scrollLeft/s));for(var j=0;j<n;j++)dots.children[j].className=j===i?'on':''}
tr.addEventListener('scroll',function(){requestAnimationFrame(upd)},{passive:true});upd();}
var f=document.querySelector('[data-lf]');if(f){f.querySelectorAll('[data-lfd]').forEach(function(b){b.addEventListener('click',function(){
f.querySelectorAll('[data-lfd]').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
f.querySelectorAll('[data-lfr]').forEach(function(x){x.hidden=x.dataset.lfr!==b.dataset.lfd})})})}
})();</script>`;

const clinicsSection = shell("clinics", `${head("Our clinics", "Three Facelit Clinics Across Kerala", "Swipe through our clinics in Trivandrum, Kollam and Thrissur. Call the branch, get directions, or open the clinic page.")}${carousel}`);
const finderSection = shell("nearest", `${head("Nearest clinic", "Which Facelit Is Closest to You?", "Tap your district to see the most convenient clinic.")}${finder}`);
const careSection = shell("same-care", `
 <div class="cp-split cp-split--top">
 <div>${head("Same care everywhere", "What You Get at Every Facelit", "")}${strip}${k.swipeHint}</div>
 <div class="cp-split-sep">${head("Plan your visit", "Your First Visit, Step by Step", "")}${visit}</div>
 </div>`);
const faqSection = shell("faq", `${head("Questions", "Clinic Location FAQs", "")}
 <div class="cp-faq" data-faq>${accordion(faqs, false, 4)}</div>
 <div class="cp-center"><button type="button" class="cp-showmore" data-faqmore aria-expanded="false">More questions</button></div>`);

// Assemble: original hero + branch checker, new sections, original CTA.
const jsonPath = process.argv[2];
const page = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
const bak = JSON.parse(fs.readFileSync(new URL("../../../backup/locations.json.bak", import.meta.url), "utf8"));
const orig = bak.bodyHtml.match(/<main[\s\S]*<\/main>/)[0];
const secs = orig.replace(/^<main[^>]*>/, "").replace(/<\/main>$/, "").split(/(?=<section)/);
const [pre, hero, checkerOrig, ctaSec] = secs;
// The original branch photo cards repeat the new clinic carousel, so drop them and keep only the availability checker.
const checker = checkerOrig.replace(/<ul class="loc-cards">[\s\S]*?<\/ul>/, "");
if (!ctaSec || !/about-cta/.test(ctaSec)) throw new Error("unexpected section layout");
const css = fs.readFileSync(new URL("../treatment-kit/cp.css", import.meta.url), "utf8");
const js = fs.readFileSync(new URL("../treatment-kit/cp.js", import.meta.url), "utf8");
const cpWrap = (html) => `<div class="cp">${html}</div>`;
const main = `<main class="relative overflow-x-clip text-ink">${pre}${hero}${checker}<style>${css}</style>${pageCss}${cpWrap(clinicsSection + finderSection + careSection + faqSection)}${ctaSec}<script>${js}</script>${pageJs}</main>`;
const b = page.bodyHtml, s = b.indexOf("<main"), e = b.indexOf("</main>") + 7;
page.bodyHtml = b.slice(0, s) + main + b.slice(e);

const h = page.head;
const stripTags = (x) => x.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&");
h.jsonld = (h.jsonld || []).filter((j) => !/"(FAQPage|ItemList)"/.test(j));
h.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: stripTags(q), acceptedAnswer: { "@type": "Answer", text: stripTags(a) } })) }));
h.jsonld.push(JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: "Facelit clinic locations", itemListElement: clinics.map((c, i) => ({ "@type": "ListItem", position: i + 1, item: {
  "@type": "MedicalClinic", name: `Facelit Skin, Hair & Wellness – ${c[1]}`, url: "https://facelit.in" + c[11], telephone: c[8].replace("tel:", ""), image: "https://facelit.in" + c[3], hasMap: c[10],
  address: { "@type": "PostalAddress", streetAddress: c[7].split(", ").slice(0, -2).join(", "), addressLocality: c[1], addressRegion: "Kerala", postalCode: c[7].match(/\d{6}/)[0], addressCountry: "IN" } } })) }));
fs.writeFileSync(jsonPath, JSON.stringify(page));
console.log("ok", main.length);
