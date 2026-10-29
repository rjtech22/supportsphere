import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "SupportSphere", short_name: "SupportSphere", description: "Find support. Resolve issues. Get answers.", start_url: "/en", display: "standalone", background_color: "#0B0F17", theme_color: "#0B0F17", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] }; }
