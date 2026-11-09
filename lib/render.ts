import { CLINICS, clinicSchema } from "./clinics";
import type { Page } from "./pages";

const GTM = "GTM-M8L82NNR", GA4 = "G-B8EYSGPS41", PIXEL = "1931994780803861";
const THEME = "/wp-content/themes/facelit/assets";
const mailer = { bookingUrl: "/api/booking/", whatsappGoUrl: "/api/whatsapp-go/", callGoUrl: "/api/call-go/", thankYouUrl: "/thank-you/" };
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const meta = (attr: string, k: string, v?: string | null) => (v ? `<meta ${attr}="${k}" content="${esc(v)}">` : "");

// Honeypot: hidden field bots fill and humans never see; /api/* drops the lead silently if it is set.
const honeypot = '<input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;height:0;width:0">';

/** Full HTML document: no React runtime, so zero hydration cost (this is what keeps Lighthouse mobile >= 90). */
export function renderPage(p: Page): string {
  const { head: h } = p;
  const clinic = CLINICS.find((c) => p.path === `/locations/${c.slug}/`);
  const ld = [...h.jsonld.map((s) => JSON.parse(s)), ...(clinic ? [clinicSchema(clinic)] : p.path === "/" ? CLINICS.map(clinicSchema) : [])];
  // LCP: preload the first eager hero image / video poster inside <main>
  const main = p.bodyHtml.slice(Math.max(0, p.bodyHtml.indexOf("<main")));
  const lcp = main.match(/<video[^>]*\sposter="([^"]+)"/)?.[1] ?? main.match(/<img(?![^>]*loading="lazy")[^>]*\ssrc="([^"]+\.webp)"/)?.[1];
  return `<!DOCTYPE html>
<html lang="en-US" class="h-full antialiased">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(h.title)}</title>
${meta("name", "description", h.description)}
${meta("name", "robots", h.robots)}
${h.canonical ? `<link rel="canonical" href="${esc(h.canonical)}">` : ""}
${Object.entries(h.og).map(([k, v]) => meta("property", `og:${k}`, v)).join("\n")}
${Object.entries(h.tw).map(([k, v]) => meta("name", `twitter:${k}`, v)).join("\n")}
${ld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`).join("\n")}
<link rel="stylesheet" href="${THEME}/css/main.css">
${lcp ? `<link rel="preload" as="image" href="${esc(lcp)}" fetchpriority="high">` : ""}
<link rel="icon" href="/wp-content/uploads/2026/07/cropped-facelit-icon-32x32.webp" sizes="32x32">
<link rel="icon" href="/wp-content/uploads/2026/07/cropped-facelit-icon-192x192.webp" sizes="192x192">
<link rel="apple-touch-icon" href="/wp-content/uploads/2026/07/cropped-facelit-icon-180x180.webp">
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');</script>
<!-- GA4 + Meta Pixel carried over from the live WP site (not in the brief); drop if GTM already fires them -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4}');</script>
<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');</script>
</head>
<body class="relative min-h-full bg-cream-deep text-ink antialiased">
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${PIXEL}&ev=PageView&noscript=1" alt=""></noscript>
${p.bodyHtml.replace(/(<form[^>]*data-booking-form[^>]*>)/g, `$1${honeypot}`)}
<script>var facelitMailer=${JSON.stringify(mailer)};</script>
<script src="${THEME}/js/site.js"></script>
</body>
</html>`;
}
