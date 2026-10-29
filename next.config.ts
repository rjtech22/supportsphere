import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/company/:slug", destination: "/in/companies/:slug", permanent: true },
      { source: "/category/courier", destination: "/in/categories/courier-delivery", permanent: true },
      { source: "/category/e-commerce", destination: "/in/categories/e-commerce", permanent: true },
      { source: "/category/telecom", destination: "/in/categories/telecom", permanent: true },
      { source: "/category/banks", destination: "/in/categories/banking", permanent: true },
      { source: "/category/appliances", destination: "/in/categories/home-appliances", permanent: true },
      { source: "/category/travel", destination: "/in/categories/travel", permanent: true }
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
