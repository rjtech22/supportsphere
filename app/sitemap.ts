import type { MetadataRoute } from "next";
import { guides } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { countries, globalCategories, globalCompanies } from "@/lib/global-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer", "/guides", "/search", "/tools/complaint-letter", "/tools/refund-email", "/tools/warranty-complaint", "/tools/delivery-delay", "/tools/bank-transaction", "/tools/follow-up-email"].map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: now, changeFrequency: path === "" ? "daily" as const : "monthly" as const, priority: path === "" ? 1 : path === "/guides" ? .8 : .6 }));
  return [...staticPages, ...countries.map((item) => ({ url: `${siteConfig.url}/${item.code}/`, lastModified: now, changeFrequency: "weekly" as const, priority: .9 })), ...globalCompanies.map((item) => ({ url: `${siteConfig.url}/${item.country}/companies/${item.slug}/`, lastModified: new Date(item.verifiedAt), changeFrequency: "weekly" as const, priority: .9 })), ...countries.flatMap((country) => globalCategories.map((category) => ({ url: `${siteConfig.url}/${country.code}/categories/${category.slug}/`, lastModified: now, changeFrequency: "weekly" as const, priority: .65 }))), ...guides.map((item) => ({ url: `${siteConfig.url}/guides/${item.slug}`, lastModified: new Date(item.updatedAt), changeFrequency: "monthly" as const, priority: .75 }))];
}
