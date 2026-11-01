const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://resolvenexa.vercel.app").replace(/\/+$/, "");

export const siteConfig = {
  name: "ResolveNexa",
  legalName: "ResolveNexa",
  description: "Find verified official customer support channels, customer care numbers, refund and warranty help, and complaint resolution guides for companies worldwide.",
  url: siteUrl
};
