import type { MetadataRoute } from "next";
import { guides } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { globalCategories } from "@/lib/global-data";
import { languageAlternates, locales } from "@/lib/i18n";
import { getPublishedCompanies } from "@/lib/database-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const companies = await getPublishedCompanies();
  const activeCountries = [...new Set(companies.map((company) => company.country))];
  const usefulCategoryPaths = activeCountries.flatMap((country) => globalCategories.filter((category) => companies.some((company) => company.country === country && company.category === category.slug)).map((category) => `/${country}/categories/${category.slug}`));
  const paths = ["", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer", "/guides", "/search", "/tools/complaint-letter", ...activeCountries.map((code) => `/${code}`), ...companies.filter((item) => item.verificationStatus === "Verified" && item.sourceLinks.length > 0).map((item) => `/${item.country}/companies/${item.slug}`), ...usefulCategoryPaths, ...guides.map((item) => `/guides/${item.slug}`)];
  return locales.flatMap((locale) => paths.map((path) => ({
    url: `${siteConfig.url}/${locale}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" as const : path.includes("/companies/") ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path.includes("/companies/") ? .9 : path === "/guides" ? .8 : .65,
    alternates: { languages: languageAlternates(path) }
  })));
}
