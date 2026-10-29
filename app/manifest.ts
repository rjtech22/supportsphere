import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "SupportSphere", short_name: "SupportSphere", description: "Find support. Resolve issues. Get answers.", start_url: "/", display: "standalone", background_color: "#fffdf8", theme_color: "#087f73", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] }; }
