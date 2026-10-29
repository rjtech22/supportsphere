import type { MetadataRoute } from "next";
import { guides } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { countries, globalCategories, globalCompanies } from "@/lib/global-data";
import { languageAlternates, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer", "/guides", "/search", "/tools/complaint-letter", ...countries.map((item) => `/${item.code}`), ...globalCompanies.map((item) => `/${item.country}/companies/${item.slug}`), ...countries.flatMap((country) => globalCategories.map((category) => `/${country.code}/categories/${category.slug}`)), ...guides.map((item) => `/guides/${item.slug}`)];
  return locales.flatMap((locale) => paths.map((path) => ({
    url: `${siteConfig.url}/${locale}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" as const : path.includes("/companies/") ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path.includes("/companies/") ? .9 : path === "/guides" ? .8 : .65,
    alternates: { languages: languageAlternates(path) }
  })));
}
