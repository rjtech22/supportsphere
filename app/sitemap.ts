import type { MetadataRoute } from "next";
import { guides } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { publishedCountries, globalCategories, globalCompanies } from "@/lib/global-data";
import { languageAlternates, locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const usefulCategoryPaths = publishedCountries.flatMap((country) => globalCategories.filter((category) => globalCompanies.some((company) => company.country === country.code && company.category === category.slug)).map((category) => `/${country.code}/categories/${category.slug}`));
  const paths = ["", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer", "/guides", "/search", "/tools/complaint-letter", ...publishedCountries.map((item) => `/${item.code}`), ...globalCompanies.filter((item) => item.verificationStatus === "Verified" && item.sourceLinks.length > 0).map((item) => `/${item.country}/companies/${item.slug}`), ...usefulCategoryPaths, ...guides.map((item) => `/guides/${item.slug}`)];
  return locales.flatMap((locale) => paths.map((path) => ({
    url: `${siteConfig.url}/${locale}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" as const : path.includes("/companies/") ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path.includes("/companies/") ? .9 : path === "/guides" ? .8 : .65,
    alternates: { languages: languageAlternates(path) }
  })));
}
