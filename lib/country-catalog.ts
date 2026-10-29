import { getCountryDataList, languages } from "countries-list";
import type { Locale } from "@/lib/i18n";

export type CountryCatalogEntry = {
  code: string;
  iso2: string;
  iso3: string;
  name: string;
  nativeName: string;
  flag: string;
  languageCodes: string[];
  languageNames: string[];
  defaultLocale: string;
  supportedSiteLocales: Locale[];
  primary: boolean;
};

const SITE_LOCALES = new Set<Locale>(["en", "ta", "hi", "fr"]);
const NON_ISO_USER_ASSIGNED_CODES = new Set(["AC", "TA", "XK"]);

function emojiFlag(code: string) {
  return code.replace(/./g, (character) => String.fromCodePoint(127397 + character.charCodeAt(0)));
}

/** Complete ISO 3166-1 catalog. AC, TA and XK are useful regional/user-assigned codes,
 * but are intentionally excluded because they are not officially assigned ISO 3166-1 entries. */
export const allCountries: CountryCatalogEntry[] = getCountryDataList()
  .filter((country) => !NON_ISO_USER_ASSIGNED_CODES.has(country.iso2))
  .map((country) => {
    const code = country.iso2.toLowerCase();
    const languageCodes = country.languages.map(String);
    const supportedSiteLocales = languageCodes.filter((language): language is Locale => SITE_LOCALES.has(language as Locale));
    const preferredLanguage = languageCodes[0] || "en";
    return {
      code,
      iso2: country.iso2,
      iso3: country.iso3,
      name: country.name,
      nativeName: country.native,
      flag: emojiFlag(country.iso2),
      languageCodes,
      languageNames: languageCodes.map((language) => languages[language as keyof typeof languages]?.name || language),
      defaultLocale: `${preferredLanguage}-${country.iso2}`,
      supportedSiteLocales,
      primary: code === "us"
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const countryByCode = new Map(allCountries.map((country) => [country.code, country]));

export function normalizeCountryCode(value: string) {
  const normalized = value.trim().toLowerCase();
  if (countryByCode.has(normalized)) return normalized;
  return allCountries.find((country) =>
    country.name.toLowerCase() === normalized ||
    country.nativeName.toLowerCase() === normalized ||
    country.iso3.toLowerCase() === normalized
  )?.code || "";
}
