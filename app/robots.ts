import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: ["/wp-admin/", "/api/"] }, sitemap: "https://facelit.in/sitemap.xml" };
}
