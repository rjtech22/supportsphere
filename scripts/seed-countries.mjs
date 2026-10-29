import { createClient } from "@supabase/supabase-js";
import { getCountryDataList } from "countries-list";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceRoleKey) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding countries.");
}

const excludedCodes = new Set(["AC", "TA", "XK"]);
const emojiFlag = (code) => code.replace(/./g, (character) => String.fromCodePoint(127397 + character.charCodeAt(0)));
const rows = getCountryDataList().filter((country) => !excludedCodes.has(country.iso2)).map((country) => ({
  code: country.iso2.toLowerCase(),
  iso3: country.iso3,
  name: country.name,
  native_name: country.native,
  flag: emojiFlag(country.iso2),
  language_codes: country.languages,
  default_locale: `${country.languages[0] || "en"}-${country.iso2}`,
  is_active: true,
  is_primary: country.iso2 === "US"
}));

if (rows.length !== 249) throw new Error(`Expected 249 ISO entries, received ${rows.length}.`);
const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });
const { error } = await supabase.from("countries").upsert(rows, { onConflict: "code" });
if (error) throw error;
console.log(`Seeded ${rows.length} ISO 3166-1 countries and territories.`);
