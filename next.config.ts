import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/feed", destination: "/blog/", permanent: true },
      { source: "/feed/:path*", destination: "/blog/", permanent: true },
      { source: "/tag/:path*", destination: "/blog/", permanent: true },
    ];
  },
  async rewrites() {
    // old jpg/png upload URLs (Google Images, hotlinks) -> converted webp
    return [{ source: "/wp-content/uploads/:path*.:ext(jpg|jpeg|png)", destination: "/wp-content/uploads/:path*.webp" }];
  },
};

export default nextConfig;
