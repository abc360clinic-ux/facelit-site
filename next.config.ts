import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/feed", destination: "/blog/", permanent: true },
      { source: "/feed/:path*", destination: "/blog/", permanent: true },
      { source: "/tag/:path*", destination: "/blog/", permanent: true },
      { source: "/blog/feed/:path*", destination: "/blog/", permanent: true },
      // old WP sitemaps (live 301s /sitemap.xml and /sitemap_index.xml to /wp-sitemap.xml; GSC may still have them)
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap-:rest.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
  async rewrites() {
    // old jpg/png upload URLs (Google Images, hotlinks) -> converted webp
    return [
      // static hrefs baked into the old markup (e.g. /appointment/) point at WP REST; serve them from the new routes
      { source: "/wp-json/facelit/v1/call-go", destination: "/api/call-go/" },
      { source: "/wp-json/facelit/v1/whatsapp-go", destination: "/api/whatsapp-go/" },
      { source: "/wp-content/uploads/:path*.:ext(jpg|jpeg|png)", destination: "/wp-content/uploads/:path*.webp" },
    ];
  },
};

export default nextConfig;
