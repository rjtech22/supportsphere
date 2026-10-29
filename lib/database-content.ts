import "server-only";
import type { GlobalCompany } from "@/lib/global-data";
import { globalCompanies } from "@/lib/global-data";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

type Row = Record<string, unknown>;

function publicClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, { auth: { persistSession: false } });
}

export async function getDatabaseCompanies(): Promise<GlobalCompany[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const db = publicClient();
    const [{ data: supports, error }, { data: contacts }, { data: sources }] = await Promise.all([
      db.from("company_country_support").select("*, companies(*), countries(*)").eq("published", true).eq("verification_status", "verified"),
      db.from("support_contacts").select("*").eq("is_official", true),
      db.from("official_sources").select("*")
    ]);
    if (error || !supports) return [];
    return (supports as Row[]).flatMap((support) => {
      const company = support.companies as Row | null;
      const country = support.countries as Row | null;
      const verifiedAt = String(support.verified_at || "");
      if (!company || !country || !verifiedAt) return [];
      const supportContacts = (contacts || []).filter((item) => item.support_id === support.id);
      const officialSources = (sources || []).filter((item) => item.support_id === support.id);
      if (!officialSources.length) return [];
      const value = (type: string) => supportContacts.find((item) => item.contact_type === type)?.value as string | undefined;
      const supportUrl = value("support_url") || value("help_center") || String(company.official_url || "");
      if (!supportUrl) return [];
      return [{
        slug: String(company.slug), name: String(company.name), country: String(country.code),
        category: String(company.base_category_slug || "other-services"), summary: String(support.summary),
        logoText: String(company.name).slice(0, 3).toUpperCase(), aliases: (company.aliases as string[]) || [],
        regions: (company.regions as string[]) || [], supportTypes: (support.support_types as string[]) || [],
        officialWebsite: String(company.official_url), supportWebsite: supportUrl,
        phone: value("phone"), tollFree: value("toll_free"), technicalSupportPhone: value("technical_phone"),
        salesSupportPhone: value("sales_phone"), whatsapp: value("whatsapp"), email: value("email"),
        liveChat: value("chat"), helpCenter: value("help_center"), supportHours: String(support.support_hours || "") || undefined,
        warranty: String(support.warranty_information || "") || undefined,
        refundCancellation: String(support.refund_cancellation_information || "") || undefined,
        replacement: String(support.replacement_information || "") || undefined,
        deliveryTracking: String(support.delivery_tracking_information || "") || undefined,
        billingPayment: String(support.billing_payment_information || "") || undefined,
        complaintSteps: (support.complaint_procedure as string[]) || [], escalation: String(support.escalation_procedure || "Use the official support route and retain the case reference."),
        verifiedAt, verificationStatus: "Verified" as const,
        sourceLinks: officialSources.map((item) => ({ label: item.label, url: item.url })),
        commonIssues: (support.common_issues as string[]) || [], faqs: (support.faq_items as { question: string; answer: string }[]) || []
      }];
    });
  } catch { return []; }
}

export async function getPublishedCompanies() {
  const database = await getDatabaseCompanies();
  const merged = new Map(globalCompanies.map((item) => [`${item.country}:${item.slug}`, item]));
  database.forEach((item) => merged.set(`${item.country}:${item.slug}`, item));
  return [...merged.values()];
}

export async function getPublishedCompany(country: string, slug: string) {
  return (await getPublishedCompanies()).find((item) => item.country === country && item.slug === slug);
}
