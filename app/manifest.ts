import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "ResolveNexa", short_name: "ResolveNexa", description: "Find support. Resolve issues. Get answers.", start_url: "/en", display: "standalone", background_color: "#FFFFFF", theme_color: "#2563EB", icons: [{ src: "/resolvenexa-logo.png", sizes: "1536x1536", type: "image/png" }] }; }
