import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true },
      { source: "/company/:slug", destination: "/en/in/companies/:slug", permanent: true },
      { source: "/category/courier", destination: "/en/in/categories/courier-delivery", permanent: true },
      { source: "/category/e-commerce", destination: "/en/in/categories/e-commerce", permanent: true },
      { source: "/category/telecom", destination: "/en/in/categories/telecom", permanent: true },
      { source: "/category/banks", destination: "/en/in/categories/banking", permanent: true },
      { source: "/category/appliances", destination: "/en/in/categories/home-appliances", permanent: true },
      { source: "/category/travel", destination: "/en/in/categories/travel", permanent: true },
      { source: "/:country(us|in|uk|ca|au)", destination: "/en/:country", permanent: true },
      { source: "/:country(us|in|uk|ca|au)/:rest*", destination: "/en/:country/:rest*", permanent: true },
      { source: "/guides", destination: "/en/guides", permanent: true },
      { source: "/guides/:slug", destination: "/en/guides/:slug", permanent: true },
      { source: "/tools/complaint-letter", destination: "/en/tools/complaint-letter", permanent: true },
      { source: "/search", destination: "/en/search", permanent: true },
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/contact", destination: "/en/contact", permanent: true },
      { source: "/privacy-policy", destination: "/en/privacy-policy", permanent: true },
      { source: "/terms", destination: "/en/terms", permanent: true },
      { source: "/disclaimer", destination: "/en/disclaimer", permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  }
};

export default nextConfig;
