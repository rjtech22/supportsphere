import type { MetadataRoute } from "next";
import { guides } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { globalCategories } from "@/lib/global-data";
import { languageAlternates, locales, type Locale } from "@/lib/i18n";
import { getPublishedCompanies } from "@/lib/database-content";

type SitemapPath = { path: string; updatedAt?: string; englishOnly?: boolean };

function latestDate(values: Array<string | undefined>) {
  return values.filter((value): value is string => Boolean(value)).sort().at(-1);
}

function sitemapDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const companies = await getPublishedCompanies();
  const activeCountries = [...new Set(companies.map((company) => company.country))];
  const verifiedCompanies = companies.filter((item) => item.verificationStatus === "Verified" && item.sourceLinks.length > 0);
  const latestContentDate = latestDate([...verifiedCompanies.map((item) => item.verifiedAt), ...guides.map((item) => item.updatedAt)]);
  const sharedPaths: SitemapPath[] = [
    { path: "", updatedAt: latestContentDate }, { path: "/about" }, { path: "/contact" },
    { path: "/privacy-policy" }, { path: "/terms" }, { path: "/disclaimer" }, { path: "/tools/complaint-letter" },
    ...activeCountries.map((country) => ({ path: `/${country}`, updatedAt: latestDate(verifiedCompanies.filter((company) => company.country === country).map((company) => company.verifiedAt)) })),
    ...activeCountries.flatMap((country) => globalCategories
      .filter((category) => verifiedCompanies.some((company) => company.country === country && company.category === category.slug))
      .map((category) => ({ path: `/${country}/categories/${category.slug}`, updatedAt: latestDate(verifiedCompanies.filter((company) => company.country === country && company.category === category.slug).map((company) => company.verifiedAt)) })))
  ];
  const englishOnlyPaths: SitemapPath[] = [
    { path: "/guides", updatedAt: latestDate(guides.map((item) => item.updatedAt)), englishOnly: true },
    ...verifiedCompanies.map((item) => ({ path: `/${item.country}/companies/${item.slug}`, updatedAt: item.verifiedAt, englishOnly: true })),
    ...guides.map((item) => ({ path: `/guides/${item.slug}`, updatedAt: item.updatedAt, englishOnly: true }))
  ];
  const paths = [...sharedPaths, ...englishOnlyPaths];
  return locales.flatMap((locale) => paths.filter((item) => !item.englishOnly || locale === "en").map((item) => {
    const availableLocales: readonly Locale[] = item.englishOnly ? ["en"] : locales;
    const lastModified = sitemapDate(item.updatedAt);
    return {
      url: `${siteConfig.url}/${locale}${item.path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: item.path === "" ? "daily" as const : item.path.includes("/companies/") ? "weekly" as const : "monthly" as const,
      priority: item.path === "" ? 1 : item.path.includes("/companies/") ? .9 : item.path === "/guides" ? .8 : .65,
      alternates: { languages: languageAlternates(item.path, availableLocales) }
    };
  }));
}
