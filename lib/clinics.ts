// Source: address/phone on the live /locations/* pages. No geo/hours: not published on the live site.
const site = "https://facelit.in";
export const CLINICS = [
  { slug: "trivandrum", name: "Facelit Skin, Hair & Wellness Clinic – Kowdiar, Thiruvananthapuram", phone: "+917356657222",
    street: "C 10, Jawahar Nagar, Kowdiar", city: "Thiruvananthapuram", zip: "695003" },
  { slug: "karunagappalli", name: "Facelit Skin, Hair & Wellness Clinic – Karunagappally, Kollam", phone: "+917736699391",
    street: "Building No: 1205 I, First Floor, Pada South, GG Plaza, Lalaji Junction", city: "Karunagappalli", zip: "690518" },
  { slug: "guruvayur", name: "Facelit Skin, Hair & Wellness Clinic – Guruvayur, Thrissur", phone: "+919895111059",
    street: "1st Floor, MVK Jahas Arcade, Near Pancharamukku", city: "Guruvayur", zip: "680101" },
] as const;

export const clinicSchema = (c: (typeof CLINICS)[number]) => ({
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "LocalBusiness"],
  "@id": `${site}/locations/${c.slug}/#clinic`,
  name: c.name,
  url: `${site}/locations/${c.slug}/`,
  telephone: c.phone,
  image: `${site}/wp-content/uploads/2026/09/hero_vid_facelit-poster-1.webp`,
  address: { "@type": "PostalAddress", streetAddress: c.street, addressLocality: c.city, addressRegion: "Kerala", postalCode: c.zip, addressCountry: "IN" },
});
