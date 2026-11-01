import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, FileText, Globe2, ShieldCheck } from "lucide-react";
import { SearchBox } from "@/components/SearchBox";
import { SearchAnalytics } from "@/components/SearchAnalytics";
import { CountrySelector } from "@/components/CountrySelector";
import { CountryDirectory } from "@/components/CountryDirectory";
import { CompanyReviews } from "@/components/CompanyReviews";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";
import { GlobalCompanyCard } from "@/components/GlobalCompanyCard";
import { LocalizedTemplateGenerator } from "@/components/LocalizedTemplateGenerator";
import { TrackedLink } from "@/components/TrackedLink";
import { countries, companiesForCountry, getCountry, getGlobalCompany, globalCategories, globalCompanies, publishedCountries } from "@/lib/global-data";
import { normalizeCountryCode } from "@/lib/country-catalog";
import { guides } from "@/lib/data";
import { getDictionary, isLocale, languageAlternates, localePath, localizedAlternates, locales, t, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";
import { findKeywordTargets } from "@/lib/keyword-strategy";
import { getPublishedCompanies, getPublishedCompany } from "@/lib/database-content";
import { categoryGuideSlugs, categorySeo, countryCategoryDetails } from "@/lib/seo-content";

type PageParams = { locale: string; segments?: string[] };
const staticNames = ["about", "contact", "privacy-policy", "terms", "disclaimer"] as const;
const localizedSoftwareSeo = {
  ta: {
    title: "மென்பொருள் ஆதரவு",
    description: "{country} நாட்டில் மென்பொருள் கணக்கு, சந்தா, பில்லிங் மற்றும் தொழில்நுட்ப சிக்கல்களுக்கான சரிபார்க்கப்பட்ட ஆதரவை கண்டறியுங்கள்.",
    intro: "மென்பொருள் மற்றும் இணையச் சேவைகளுக்கான அதிகாரப்பூர்வ கணக்கு, சந்தா, பில்லிங் மற்றும் தொழில்நுட்ப ஆதரவு வழிகளைப் பயன்படுத்துங்கள். கடவுச்சொல் அல்லது ஒருமுறை குறியீட்டைப் பகிர வேண்டாம்.",
    faqs: [["மென்பொருள் ஆதரவைத் தொடர்புகொள்வதற்கு முன் என்ன தயார் செய்ய வேண்டும்?", "தயாரிப்பு அல்லது சேவை பெயர், கணக்கு மின்னஞ்சல், பிழைச் செய்தி, பில்லிங் தேதி மற்றும் முந்தைய வழக்கு எண்ணைத் தயாராக வைத்திருங்கள். கடவுச்சொல் அல்லது ஒருமுறை குறியீட்டைப் பகிர வேண்டாம்."], ["கணக்கு அல்லது சந்தா உதவியை எங்கே கேட்க வேண்டும்?", "நிறுவனத்தின் அதிகாரப்பூர்வ உள்நுழைந்த உதவி மையம் அல்லது ஆதரவு பக்கத்தைப் பயன்படுத்தி கணக்கு, பில்லிங் அல்லது தொழில்நுட்ப உதவிக்கான சரியான வழியைத் தேர்ந்தெடுக்கவும்."]] as [string, string][]
  },
  hi: {
    title: "सॉफ्टवेयर और तकनीकी सहायता",
    description: "{country} में सॉफ्टवेयर खाते, सदस्यता, बिलिंग और तकनीकी समस्याओं के लिए सत्यापित सहायता पाएँ।",
    intro: "सॉफ्टवेयर और ऑनलाइन सेवाओं के लिए आधिकारिक खाता, सदस्यता, बिलिंग और तकनीकी सहायता माध्यमों का उपयोग करें। पासवर्ड या वन-टाइम कोड साझा न करें।",
    faqs: [["सॉफ्टवेयर सहायता से संपर्क करने से पहले क्या तैयार रखें?", "उत्पाद या सेवा का नाम, खाता ईमेल, त्रुटि संदेश, बिलिंग तारीख और मौजूदा केस नंबर तैयार रखें। पासवर्ड या वन-टाइम कोड साझा न करें।"], ["खाते या सदस्यता के लिए सहायता कहाँ माँगें?", "कंपनी के आधिकारिक साइन-इन सहायता केंद्र या सहायता पेज का उपयोग करें और खाता, बिलिंग या तकनीकी समस्या से संबंधित सही विकल्प चुनें।"]] as [string, string][]
  },
  fr: {
    title: "Assistance logiciels",
    description: "Trouvez en {country} une assistance vérifiée pour les comptes, abonnements, factures et problèmes techniques.",
    intro: "Utilisez les canaux officiels pour les comptes, abonnements, factures et problèmes techniques liés aux logiciels et services en ligne. Ne communiquez jamais un mot de passe ou un code à usage unique.",
    faqs: [["Que préparer avant de contacter l’assistance d’un logiciel ?", "Notez le nom du produit ou service, l’adresse e-mail du compte, le message d’erreur, la date de facturation et toute référence de dossier. Ne partagez jamais un mot de passe ou un code à usage unique."], ["Où demander de l’aide pour un compte ou un abonnement ?", "Utilisez le centre d’aide officiel après connexion ou la page d’assistance de l’entreprise, puis choisissez la rubrique compte, facturation ou assistance technique."]] as [string, string][]
  }
} as const;

export function generateStaticParams() {
  const publishedCategoryPaths = publishedCountries.flatMap((country) => globalCategories.filter((category) => globalCompanies.some((company) => company.country === country.code && company.category === category.slug)).map((category) => [country.code, "categories", category.slug]));
  const paths: string[][] = [[], ["guides"], ["search"], ["tools", "complaint-letter"], ...staticNames.map((name) => [name]), ...publishedCountries.map((country) => [country.code]), ...publishedCategoryPaths, ...globalCompanies.map((company) => [company.country, "companies", company.slug]), ...guides.map((guide) => ["guides", guide.slug])];
  return locales.flatMap((locale) => paths.map((segments) => ({ locale, segments })));
}

function pathFrom(segments: string[]) { return segments.length ? `/${segments.join("/")}` : ""; }
function ogLocale(locale: Locale) { return ({ en: "en_US", ta: "ta_IN", hi: "hi_IN", fr: "fr_FR" } as const)[locale]; }
function meta(locale: Locale, path: string, title: string, description: string, keywords?: string[], availableLocales: readonly Locale[] = locales): Metadata {
  return { title: { absolute: title }, description, keywords, alternates: localizedAlternates(locale, path, availableLocales), other: { "content-language": locale }, openGraph: { title, description, url: localePath(locale, path), locale: ogLocale(locale), type: "website" }, twitter: { card: "summary_large_image", title, description } };
}

function companyPageTitle(locale: Locale, company: string, country: string) {
  return locale === "en" ? `${company} Customer Care & Support — ${country}` : locale === "ta" ? `${company} வாடிக்கையாளர் சேவை மற்றும் ஆதரவு — ${country}` : locale === "hi" ? `${company} ग्राहक सेवा और सहायता — ${country}` : `Service client ${company} — ${country}`;
}

function localizedCompanySummary(locale: Locale, company: string, country: string, englishSummary: string) {
  if (locale === "en") return englishSummary;
  if (locale === "ta") return `${country} நாட்டிற்கான ${company} நிறுவனத்தின் சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ ஆதரவு இணைப்புகளையும் கிடைக்கும் தொடர்பு வழிகளையும் கண்டறியுங்கள்.`;
  if (locale === "hi") return `${country} में ${company} के सत्यापित आधिकारिक सहायता लिंक और उपलब्ध संपर्क माध्यम पाएँ।`;
  return `Trouvez les liens d’assistance officiels vérifiés de ${company} pour ${country} et les moyens de contact disponibles.`;
}

const companySectionLabels = {
  en: { common: "Common customer issues", refund: "Refund and cancellation information", replacement: "Replacement information", delivery: "Delivery and tracking help", billing: "Billing and payment support", warranty: "Warranty and repair information", relatedCompanies: "Related company support", countryDirectory: "Country support directory", categoryDirectory: "Category support directory" },
  ta: { common: "பொதுவான வாடிக்கையாளர் பிரச்சினைகள்", refund: "பணத்திருப்பி மற்றும் ரத்து தகவல்", replacement: "மாற்றீட்டு தகவல்", delivery: "டெலிவரி மற்றும் டிராக்கிங் உதவி", billing: "பில்லிங் மற்றும் கட்டண உதவி", warranty: "உத்தரவாதம் மற்றும் பழுதுபார்ப்பு தகவல்", relatedCompanies: "தொடர்புடைய நிறுவன ஆதரவு", countryDirectory: "நாட்டு ஆதரவு அடைவு", categoryDirectory: "பிரிவு ஆதரவு அடைவு" },
  hi: { common: "सामान्य ग्राहक समस्याएँ", refund: "रिफंड और रद्दीकरण जानकारी", replacement: "बदलने की जानकारी", delivery: "डिलीवरी और ट्रैकिंग सहायता", billing: "बिलिंग और भुगतान सहायता", warranty: "वारंटी और मरम्मत जानकारी", relatedCompanies: "संबंधित कंपनी सहायता", countryDirectory: "देश सहायता निर्देशिका", categoryDirectory: "श्रेणी सहायता निर्देशिका" },
  fr: { common: "Problèmes fréquents", refund: "Informations sur les remboursements et annulations", replacement: "Informations sur le remplacement", delivery: "Aide à la livraison et au suivi", billing: "Assistance facturation et paiement", warranty: "Informations sur la garantie et la réparation", relatedCompanies: "Assistance d’entreprises associées", countryDirectory: "Annuaire d’assistance du pays", categoryDirectory: "Annuaire de la catégorie" }
} as const;

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const p = await params; if (!isLocale(p.locale)) return {}; const locale = p.locale; const d = getDictionary(locale); const s = p.segments || []; const path = pathFrom(s); const allCompanies = await getPublishedCompanies();
  if (!s.length) return meta(locale, "", d.seo.homeTitle, d.seo.homeDescription);
  if (s.length === 1 && getCountry(s[0])) { const entry = getCountry(s[0])!; const country = d.countries[s[0]] || entry.name; const result = meta(locale, path, `${t(d.directory.title, { country })} | ResolveNexa`, t(d.directory.intro, { country })); if (!allCompanies.some((item) => item.country === s[0])) result.robots = { index: false, follow: true }; return result; }
  if (s.length === 3 && s[1] === "categories") { const category = d.categories[s[2]] || globalCategories.find((item) => item.slug === s[2]); const seo = categorySeo[s[2]]; const softwareSeo = s[2] === "software-technology" && locale !== "en" ? localizedSoftwareSeo[locale] : undefined; const entry = getCountry(s[0]); const country = entry ? d.countries[s[0]] || entry.name : ""; if (category && country) { const categoryDescription = locale === "en" ? `${seo?.metaDescription || `Find verified ${category.name.toLowerCase()} support routes and practical issue guides`} in ${country}.` : softwareSeo ? t(softwareSeo.description, { country }) : locale === "ta" ? `${country} நாட்டில் ${category.name} நிறுவனங்களுக்கான சரிபார்க்கப்பட்ட ஆதரவு வழிகளையும் வழிகாட்டிகளையும் கண்டறியுங்கள்.` : locale === "hi" ? `${country} में ${category.name} कंपनियों के सत्यापित सहायता मार्ग और उपयोगी गाइड पाएँ।` : `Trouvez les services officiels vérifiés et les guides ${category.name} disponibles en ${country}.`; const categoryTitle = locale === "en" && seo ? `${seo.title} in ${country} | ResolveNexa` : `${softwareSeo?.title || category.name} — ${country} | ResolveNexa`; const result = meta(locale, path, categoryTitle, categoryDescription, locale === "en" ? seo?.keywords : undefined); if (!allCompanies.some((item) => item.country === s[0] && item.category === s[2])) result.robots = { index: false, follow: true }; return result; } }
  if (s.length === 3 && s[1] === "companies") {
    const company = await getPublishedCompany(s[0], s[2]);
    const entry = getCountry(s[0]);
    const country = entry ? d.countries[s[0]] || entry.name : "";
    if (company && country) {
      const hasVerifiedPhone = Boolean(company.phone || company.tollFree || company.technicalSupportPhone || company.salesSupportPhone);
      const keywords = [`${company.name} customer service`, `${company.name} customer support`, `${company.name} help center`, country];
      if (hasVerifiedPhone) keywords.push(`${company.name} contact number`);
      const channelSummary = hasVerifiedPhone ? "verified phone information and official support links" : "verified official support links and available contact channels";
      const guidance = [company.refundCancellation && "refund or cancellation help", company.deliveryTracking && "delivery or tracking help", company.billingPayment && "billing or payment help", (company.warranty || company.replacement) && "warranty or replacement help", company.complaintSteps.length && "complaint escalation guidance"].filter(Boolean).join(", ");
      const companyTitle = `${companyPageTitle(locale, company.name, country)} | ResolveNexa`;
      const companyDescription = locale === "en" ? `${company.summary} Find ${channelSummary}${guidance ? ` and ${guidance}` : ""}.` : localizedCompanySummary(locale, company.name, country, company.summary);
      const result = meta(locale, path, companyTitle, companyDescription, locale === "en" ? keywords : undefined, locale === "en" ? ["en"] : []);
      if (locale !== "en") result.robots = { index: false, follow: true };
      return result;
    }
  }
  if (s[0] === "guides") { const guide = s[1] ? d.guides.items[s[1]] : null; const original = s[1] ? guides.find((item) => item.slug === s[1]) : null; const result = meta(locale, path, guide ? `${guide.title} | ResolveNexa` : `${d.guides.title} | ResolveNexa`, guide?.description || d.guides.intro, locale === "en" ? original?.keywords : undefined, locale === "en" ? ["en"] : []); if (locale !== "en") result.robots = { index: false, follow: true }; return result; }
  if (s.join("/") === "tools/complaint-letter") return meta(locale, path, d.generator.seoTitle, d.generator.seoDescription, ["free complaint letter generator", "customer complaint email template", "refund request email template", "billing dispute letter"]);
  if (staticNames.includes(s[0] as typeof staticNames[number])) { const key = s[0] === "privacy-policy" ? "privacy" : s[0] as keyof typeof d.static; const [title, description] = d.static[key]; return meta(locale, path, `${title} | ResolveNexa`, description); }
  if (s[0] === "search") { const result = meta(locale, path, `${d.nav.search} | ResolveNexa`, d.home.searchPlaceholder); result.robots = { index: false, follow: true }; return result; }
  return {};
}

export default async function LocalizedPage({ params, searchParams }: { params: Promise<PageParams>; searchParams: Promise<{ q?: string; country?: string; category?: string; support?: string }> }) {
  const p = await params; if (!isLocale(p.locale)) notFound(); const locale = p.locale; const d = getDictionary(locale); const s = p.segments || [];
  if (!s.length) return <Home locale={locale} />;
  if (s.length === 1 && getCountry(s[0])) return <Country locale={locale} code={s[0]} />;
  if (s.length === 3 && s[1] === "categories") return <Category locale={locale} countryCode={s[0]} slug={s[2]} />;
  if (s.length === 3 && s[1] === "companies") return <Company locale={locale} countryCode={s[0]} slug={s[2]} />;
  if (s.join("/") === "tools/complaint-letter") return <Generator locale={locale} />;
  if (s[0] === "guides" && s.length === 1) return <Guides locale={locale} />;
  if (s[0] === "guides" && s.length === 2) return <Guide locale={locale} slug={s[1]} />;
  if (s[0] === "search" && s.length === 1) { const filters = await searchParams; return <Search locale={locale} query={filters.q || ""} country={filters.country || ""} category={filters.category || ""} support={filters.support || ""} />; }
  if (s.length === 1 && staticNames.includes(s[0] as typeof staticNames[number])) return <Static locale={locale} name={s[0] as typeof staticNames[number]} />;
  notFound();
}

async function Home({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const allCompanies = await getPublishedCompanies();
  const countryDirectoryCopy = ({
    en: { eyebrow: "Worldwide country directory", title: "Choose your country", subtitle: "Browse every country in the ResolveNexa directory. Country pages without verified company listings clearly show the current coverage.", panelTitle: "Support for every country", panelText: "Choose from the complete ISO country directory. We publish company contact details only after verifying country-specific official sources.", browse: "Browse all countries" },
    ta: { eyebrow: "உலகளாவிய நாடுகள் அடைவு", title: "உங்கள் நாட்டைத் தேர்ந்தெடுக்கவும்", subtitle: "ResolveNexa அடைவில் உள்ள அனைத்து நாடுகளையும் பாருங்கள். சரிபார்க்கப்பட்ட நிறுவனப் பட்டியல்கள் இல்லாத நாட்டுப் பக்கங்கள் தற்போதைய கவரேஜை தெளிவாகக் காட்டும்.", panelTitle: "ஒவ்வொரு நாட்டிற்குமான ஆதரவு", panelText: "முழுமையான ISO நாடுகள் அடைவிலிருந்து தேர்ந்தெடுக்கவும். நாடு சார்ந்த அதிகாரப்பூர்வ ஆதாரங்களைச் சரிபார்த்த பிறகே நிறுவனத் தொடர்புகளை வெளியிடுகிறோம்.", browse: "அனைத்து நாடுகளையும் பாருங்கள்" },
    hi: { eyebrow: "विश्वव्यापी देश निर्देशिका", title: "अपना देश चुनें", subtitle: "ResolveNexa निर्देशिका में सभी देशों को देखें। जिन देश पृष्ठों पर सत्यापित कंपनी सूची उपलब्ध नहीं है, वहाँ मौजूदा कवरेज स्पष्ट रूप से बताया जाता है।", panelTitle: "हर देश के लिए सहायता", panelText: "पूरी ISO देश निर्देशिका से चुनें। हम देश-विशिष्ट आधिकारिक स्रोत सत्यापित करने के बाद ही कंपनी संपर्क प्रकाशित करते हैं।", browse: "सभी देश देखें" },
    fr: { eyebrow: "Annuaire mondial des pays", title: "Choisissez votre pays", subtitle: "Parcourez tous les pays de l’annuaire ResolveNexa. Les pages sans entreprise vérifiée indiquent clairement la couverture disponible.", panelTitle: "Une assistance pour chaque pays", panelText: "Choisissez dans l’annuaire ISO complet. Nous publions les coordonnées d’une entreprise uniquement après vérification des sources officielles propres au pays.", browse: "Parcourir tous les pays" }
  } as const)[locale];
  const directoryCountries = countries.map((country) => ({ code: country.code, iso2: country.iso2, flag: country.flag, name: d.countries[country.code] || country.name })).sort((a, b) => a.name.localeCompare(b.name, d.htmlLang));
  const issueSection = ({
    en: { title: "How can we help you today?", subtitle: "Find practical steps to resolve common customer support issues.", labels: ["Refund not received", "Order delivered but not received", "Payment failed, money deducted", "Tracking number not working", "Return request rejected", "Customer support not responding", "Account locked", "Warranty or repair issue"] },
    ta: { title: "இன்று உங்களுக்கு எப்படி உதவலாம்?", subtitle: "பொதுவான வாடிக்கையாளர் ஆதரவு பிரச்சினைகளைத் தீர்க்க நடைமுறை வழிகளைப் பெறுங்கள்.", labels: ["பணத்திருப்பி கிடைக்கவில்லை", "டெலிவரி எனக் காட்டுகிறது, ஆனால் ஆர்டர் கிடைக்கவில்லை", "பணம் செலுத்தல் தோல்வி, தொகை பிடிக்கப்பட்டது", "டிராக்கிங் எண் வேலை செய்யவில்லை", "ரிட்டர்ன் கோரிக்கை நிராகரிக்கப்பட்டது", "வாடிக்கையாளர் ஆதரவு பதிலளிக்கவில்லை", "கணக்கு பூட்டப்பட்டுள்ளது", "உத்தரவாதம் அல்லது பழுதுபார்ப்பு பிரச்சினை"] },
    hi: { title: "आज हम आपकी कैसे मदद कर सकते हैं?", subtitle: "सामान्य ग्राहक सहायता समस्याओं को हल करने के व्यावहारिक चरण खोजें।", labels: ["रिफंड प्राप्त नहीं हुआ", "ऑर्डर डिलीवर दिखा रहा है, लेकिन मिला नहीं", "भुगतान विफल, पैसे कट गए", "ट्रैकिंग नंबर काम नहीं कर रहा", "वापसी अनुरोध अस्वीकार हुआ", "ग्राहक सहायता जवाब नहीं दे रही", "खाता लॉक है", "वारंटी या मरम्मत की समस्या"] },
    fr: { title: "Comment pouvons-nous vous aider aujourd’hui ?", subtitle: "Trouvez des étapes pratiques pour résoudre les problèmes courants de service client.", labels: ["Remboursement non reçu", "Commande indiquée livrée mais non reçue", "Paiement échoué, montant débité", "Numéro de suivi non fonctionnel", "Demande de retour refusée", "Service client sans réponse", "Compte verrouillé", "Problème de garantie ou de réparation"] }
  } as const)[locale];
  const issuePaths = ["refund-not-received", "package-delivered-not-received", "payment-failed-money-deducted", "tracking-number-not-working", "how-to-request-a-refund", "customer-support-not-responding", "account-locked-support", "request-warranty-replacement"];
  const websiteLd = { "@context": "https://schema.org", "@type": "WebSite", name: siteConfig.name, url: `${siteConfig.url}/${locale}`, inLanguage: d.htmlLang, potentialAction: { "@type": "SearchAction", target: `${siteConfig.url}/${locale}/search?q={search_term_string}`, "query-input": "required name=search_term_string" } };
  return <><section className="hero"><div className="shell hero-grid"><div><span className="kicker"><Globe2 size={15} /> {d.home.kicker}</span><h1>{d.home.h1}</h1><p>{d.home.intro}</p><SearchBox locale={locale} /><div className="popular"><span>{d.home.tryLabel}</span>{["Dell customer care number", "Amazon refund help", "Laptop warranty support"].map((problem) => <Link href={`${localePath(locale, "/search")}?q=${encodeURIComponent(problem)}`} key={problem}>{problem}</Link>)}</div></div><div className="hero-panel country-directory-promo"><div className="hero-panel-head"><span>{d.home.countries}</span><strong>{countries.length} ISO countries</strong></div><Globe2 className="country-directory-promo-icon" size={38} aria-hidden="true" /><h2>{countryDirectoryCopy.panelTitle}</h2><p>{countryDirectoryCopy.panelText}</p><a className="button" href="#country-directory">{countryDirectoryCopy.browse} <ArrowRight size={16} /></a><div className="safety-card"><ShieldCheck /><span><b>{d.home.officialFirst}</b><small>{d.home.verificationNote}</small></span></div></div></div></section>
    <section className="section soft"><div className="shell"><SectionHead eyebrow={d.home.browseEyebrow} title={d.home.browseTitle} text={d.home.browseText} /><div className="company-grid">{allCompanies.slice(0, 6).map((company) => <GlobalCompanyCard locale={locale} company={company} key={`${company.country}-${company.slug}`} />)}</div></div></section>
    <section className="section"><div className="shell"><SectionHead eyebrow={d.home.categoryEyebrow} title={d.home.categoryTitle} /><div className="category-grid">{globalCategories.map((category) => { const item = d.categories[category.slug] || category; return <Link className="category-card" href={`${localePath(locale, "/search")}?category=${category.slug}`} key={category.slug}><span className="category-icon blue">{category.icon}</span><span><b>{item.name}</b><small>{item.description}</small></span><ArrowRight /></Link>; })}</div></div></section>
    <section className="section soft"><div className="shell"><SectionHead eyebrow={d.home.problemsEyebrow} title={issueSection.title} text={issueSection.subtitle} /><div className="issue-link-grid">{issueSection.labels.map((label, index) => <Link href={localePath(locale, `/guides/${issuePaths[index]}`)} className="issue-link-item" key={issuePaths[index]}><span>{label}</span><ArrowRight size={16} aria-hidden="true" /></Link>)}</div></div></section>
    <section className="section"><div className="shell"><SectionHead eyebrow={d.home.toolsEyebrow} title={d.home.toolsTitle} /><div className="tool-grid"><Link href={localePath(locale, "/tools/complaint-letter")} className="tool-card"><span><FileText /></span><h3>{d.generator.h1}</h3><p>{d.generator.seoDescription}</p><b>{d.home.openTool} <ArrowRight size={15} /></b></Link></div></div></section>
    <section className="section soft"><div className="shell"><SectionHead eyebrow={d.guides.title} title={d.guides.intro} /><GuideCards locale={locale} limit={6} /></div></section>
    <section className="section country-directory-section" id="country-directory"><div className="shell"><SectionHead eyebrow={countryDirectoryCopy.eyebrow} title={countryDirectoryCopy.title} text={countryDirectoryCopy.subtitle} /><CountryDirectory locale={locale} items={directoryCountries} /></div></section>
    <section className="section"><div className="shell faq-wrap"><div><span className="eyebrow">{d.home.faqEyebrow}</span><h2>{d.home.faqTitle}</h2></div><Faqs items={d.faqs} /></div></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} /></>;
}

async function Country({ locale, code }: { locale: Locale; code: string }) {
  const d = getDictionary(locale); const country = getCountry(code); if (!country) notFound(); const countryName = d.countries[code] || country.name; const companies = (await getPublishedCompanies()).filter((item) => item.country === code);
  return <><Hero locale={locale} currentPath={`/${code}`} crumbs={[{ label: countryName }]} eyebrow={`${country.flag} · ${countryName}`} title={t(d.directory.title, { country: countryName })} text={t(d.directory.intro, { country: countryName })}><div className="country-hero-tools"><CountrySelector locale={locale} value={code} /><SearchBox locale={locale} compact country={code} /></div></Hero><section className="section"><div className="shell"><SectionHead eyebrow={d.directory.browseCompanies} title={d.directory.verifiedGuides} text={`${companies.length} ${t(d.directory.published, { country: countryName })}`} />{companies.length ? <div className="company-grid">{companies.map((company) => <GlobalCompanyCard locale={locale} company={company} key={company.slug} />)}</div> : <div className="content-card unsupported-country"><h2>No verified company support data yet</h2><p>ResolveNexa supports {countryName} in the global country catalog, but no country-specific company contact information has been verified. We will not reuse another country&apos;s phone numbers or policies.</p><Link className="button small" href={`${localePath(locale, "/search")}?country=${code}`}>Search global guides</Link></div>}</div></section>{companies.length > 0 && <section className="section soft"><div className="shell"><SectionHead eyebrow={d.directory.browseCategory} title={t(d.directory.categoryTitle, { country: countryName })} /><div className="category-grid">{globalCategories.filter((category) => companies.some((company) => company.category === category.slug)).map((category) => { const item = d.categories[category.slug] || category; return <Link className="category-card" href={localePath(locale, `/${code}/categories/${category.slug}`)} key={category.slug}><span className="category-icon blue">{category.icon}</span><span><b>{item.name}</b><small>{item.description}</small></span><ArrowRight /></Link>; })}</div></div></section>}<section className="section"><div className="shell"><SectionHead eyebrow={d.directory.guidance} title={d.directory.guideTitle} /><GuideCards locale={locale} limit={3} /></div></section><section className="section soft"><div className="shell faq-wrap"><span className="eyebrow">FAQ</span><h2>{t(d.directory.faqTitle, { country: countryName })}</h2><Faqs items={d.faqs.slice(0, 3)} /></div></section></>;
}

async function Category({ locale, countryCode, slug }: { locale: Locale; countryCode: string; slug: string }) {
  const d = getDictionary(locale); const country = getCountry(countryCode); const cat = d.categories[slug] || globalCategories.find((item) => item.slug === slug); if (!country || !cat) notFound(); const countryName = d.countries[countryCode] || country.name; const items = (await getPublishedCompanies()).filter((item) => item.country === countryCode && item.category === slug); const seo = locale === "en" ? categorySeo[slug] : undefined; const softwareSeo = slug === "software-technology" && locale !== "en" ? localizedSoftwareSeo[locale] : undefined; const detail = locale === "en" ? countryCategoryDetails[`${countryCode}:${slug}`] : undefined;
  const faq: [string, string][] = seo?.faqs || softwareSeo?.faqs || [[t(d.category.faqTitle, { category: cat.name }), d.company.escalationText], [d.company.complaintTitle, d.company.complaintSteps.join(" ")]];
  const title = seo ? `${seo.title} in ${countryName}` : `${softwareSeo?.title || cat.name} — ${countryName}`;
  const intro = seo ? `${seo.intro} Browse verified company support options available for ${countryName}.` : softwareSeo?.intro || cat.description;
  return <><Hero locale={locale} currentPath={`/${countryCode}/categories/${slug}`} crumbs={[{ label: countryName, href: localePath(locale, `/${countryCode}`) }, { label: cat.name }]} eyebrow={countryName} title={title} text={intro} /><section className="section"><div className="shell"><SectionHead eyebrow={d.category.directory} title={t(d.category.listings, { category: cat.name })} /><div className="company-grid">{items.map((company) => <GlobalCompanyCard locale={locale} company={company} key={company.slug} />)}</div>{!items.length && <div className="content-card"><h2>{d.category.emptyTitle}</h2><p>{d.category.emptyText}</p></div>}</div></section>{detail && <section className="section soft"><article className="shell prose-page"><h2>{detail.title}</h2>{detail.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{detail.sections?.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<h2>Practical banking issue guides</h2><ul>{detail.guideSlugs.map((guideSlug) => { const guide = d.guides.items[guideSlug]; return guide ? <li key={guideSlug}><Link href={localePath(locale, `/guides/${guideSlug}`)}>{guide.title}</Link></li> : null; })}</ul><h2>Official escalation sources</h2>{detail.officialSources.map((source) => <p key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <ExternalLink size={14} /></a><br /><small>{source.note}</small></p>)}</article></section>}<section className="section soft"><div className="shell"><SectionHead eyebrow={d.category.relevant} title={t(d.category.resolve, { category: cat.name })} /><GuideCards locale={locale} slugs={categoryGuideSlugs[slug]} limit={3} /></div></section><section className="section"><div className="shell faq-wrap"><h2>{t(d.category.faqTitle, { category: cat.name })}</h2><Faqs items={faq} /></div></section></>;
}

async function Company({ locale, countryCode, slug }: { locale: Locale; countryCode: string; slug: string }) {
  const d = getDictionary(locale);
  const allCompanies = await getPublishedCompanies();
  const company = allCompanies.find((item) => item.country === countryCode && item.slug === slug);
  const country = getCountry(countryCode);
  if (!company || !country) notFound();

  const countryName = d.countries[countryCode] || country.name;
  const cat = d.categories[company.category] || globalCategories.find((item) => item.slug === company.category);
  const path = `/${countryCode}/companies/${slug}`;
  const pageTitle = companyPageTitle(locale, company.name, countryName);
  const pageSummary = localizedCompanySummary(locale, company.name, countryName, company.summary);
  const labels = companySectionLabels[locale];
  const relatedGuideSlugs = [
    ...(company.refundCancellation ? ["refund-not-received"] : []),
    ...(company.deliveryTracking ? ["package-delivered-not-received", "tracking-number-not-working"] : []),
    ...(company.billingPayment ? ["payment-failed-money-deducted"] : []),
    ...(company.warranty || company.replacement ? ["request-warranty-replacement"] : []),
    "customer-support-not-responding"
  ].filter((guideSlug, index, list) => list.indexOf(guideSlug) === index).slice(0, 5);
  const genericFaq: [string, string][] = [
    [t(d.company.faqContact, { company: company.name }), t(d.company.faqContactAnswer, { date: company.verifiedAt })],
    [t(d.company.faqComplaint, { company: company.name }), d.company.faqComplaintAnswer],
    [t(d.company.faqRefund, { company: company.name }), t(d.company.faqRefundAnswer, { company: company.name })]
  ];
  const faq: [string, string][] = locale === "en" && company.faqs?.length
    ? company.faqs.map((item) => [item.question, item.answer])
    : genericFaq;
  const relatedCompanies = allCompanies
    .filter((item) => (item.slug !== company.slug || item.country !== company.country) && (item.category === company.category || item.country === company.country))
    .slice(0, 5);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pageTitle,
    description: pageSummary,
    dateModified: company.verifiedAt,
    inLanguage: d.htmlLang,
    mainEntityOfPage: `${siteConfig.url}${localePath(locale, path)}`
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return <>
    <Hero
      locale={locale}
      currentPath={path}
      crumbs={[{ label: countryName, href: localePath(locale, `/${countryCode}`) }, { label: cat?.name || company.category, href: localePath(locale, `/${countryCode}/categories/${company.category}`) }, { label: company.name }]}
      eyebrow={`${company.verificationStatus} · ${d.company.lastVerified} ${company.verifiedAt}`}
      title={pageTitle}
      text={pageSummary}
    />
    <section className="section"><div className="shell">
      <div className="content-layout">
        <article className="content-card">
          <div className="company-mark"><span className="company-logo blue">{company.logoText}</span><div><h2>{company.name}</h2><p>{countryName} · {cat?.name || company.category}</p></div></div>
          <h2>{d.company.officialInfo}</h2>
          <Info label={d.company.officialWebsite} value={new URL(company.officialWebsite).hostname} />
          <Info label="Official help center" value={new URL(company.helpCenter || company.supportWebsite).hostname} />
          {company.phone ? <Info label={d.company.phone} value={company.phone} /> : <Info label={d.company.phone} value="Phone support information has not been verified." muted />}
          {company.tollFree && <Info label="Toll-free number" value={company.tollFree} />}
          {company.technicalSupportPhone && <Info label="Technical support number" value={company.technicalSupportPhone} />}
          {company.salesSupportPhone && <Info label="Sales support number" value={company.salesSupportPhone} />}
          {company.whatsapp && <Info label="WhatsApp support" value={company.whatsapp} />}
          {company.email && <Info label={d.company.email} value={company.email} />}
          {company.supportHours && <Info label="Support hours" value={company.supportHours} />}
          {company.regions && <Info label="Country or region availability" value={company.regions.join(", ")} />}
          <TrackedLink className="official-link" href={company.supportWebsite} eventName="official_support_click" params={{ country: countryCode, company: slug, locale }}><span>{d.company.openOfficial}<small>{new URL(company.supportWebsite).hostname}</small></span><ExternalLink /></TrackedLink>
          {company.liveChat && <TrackedLink className="official-link" href={company.liveChat} eventName="official_support_click" params={{ country: countryCode, company: slug, locale }}><span>Open official live chat</span><ExternalLink /></TrackedLink>}
          <div className="warning-box"><ShieldCheck /><span><b>{d.company.securityTitle}:</b> {d.company.securityText}</span></div>
          <h2>{labels.common}</h2>
          <div className="issue-list">{company.commonIssues.map((issue) => <span key={issue}>{issue}</span>)}</div>
          {company.refundCancellation && <section id="refund-cancellation"><h2>{labels.refund}</h2><p>{company.refundCancellation}</p></section>}
          {company.replacement && <section id="replacement"><h2>{labels.replacement}</h2><p>{company.replacement}</p></section>}
          {company.deliveryTracking && <section id="delivery-tracking"><h2>{labels.delivery}</h2><p>{company.deliveryTracking}</p></section>}
          {company.billingPayment && <section id="billing-payment"><h2>{labels.billing}</h2><p>{company.billingPayment}</p></section>}
          {company.warranty && <section id="warranty-repair"><h2>{labels.warranty}</h2><p>{company.warranty}</p></section>}
          <section id="complaint-escalation"><h2>{d.company.complaintTitle}</h2>
          <ol>{company.complaintSteps.map((step) => <li key={step}>{step}</li>)}</ol>
          <h2>{d.company.escalationTitle}</h2>
          <p>{company.escalation}</p></section>
          <h2>{d.company.sourcesTitle}</h2>
          {company.sourceLinks.map((source) => <TrackedLink className="official-link" href={source.url} eventName="official_support_click" params={{ country: countryCode, company: slug, locale }} key={source.url}><span>{source.label}<small>{new URL(source.url).hostname}<span className="source-meta">Verified {company.verifiedAt}</span></small></span><ExternalLink /></TrackedLink>)}
          <section className="faq-wrap"><h2>{company.name} {d.company.faqTitle}</h2><Faqs items={faq} /></section>
        </article>
        <aside>
          <div className="sidebar-card"><h3>{d.company.verificationTitle}</h3><p><b>{company.verificationStatus}</b><br />Last verified: {company.verifiedAt}</p><p>{d.company.verificationText}</p></div>
          <div className="sidebar-card"><h3>{labels.countryDirectory}</h3><Link href={localePath(locale, `/${countryCode}`)}>{countryName}</Link><h3>{labels.categoryDirectory}</h3><Link href={localePath(locale, `/${countryCode}/categories/${company.category}`)}>{cat?.name || company.category}</Link></div>
          <div className="sidebar-card"><h3>{d.company.relatedGuides}</h3>{relatedGuideSlugs.map((guideSlug) => { const guide = d.guides.items[guideSlug]; return guide ? <Link key={guideSlug} href={localePath(locale, `/guides/${guideSlug}`)}>{guide.title}</Link> : null; })}</div>
          {relatedCompanies.length > 0 && <div className="sidebar-card"><h3>{labels.relatedCompanies}</h3>{relatedCompanies.map((item) => <Link key={`${item.country}-${item.slug}`} href={localePath(locale, `/${item.country}/companies/${item.slug}`)}>{item.name}</Link>)}</div>}
        </aside>
      </div>
      <CompanyReviews companySlug={company.slug} companyName={company.name} companyCountryCode={countryCode} locale={locale} />
    </div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
  </>;
}

function Generator({ locale }: { locale: Locale }) {
  const d = getDictionary(locale);
  const useCases = ({
    en: { title: "Messages this complaint tool can help you draft", items: ["Refund request email for an eligible or pending refund", "Complaint follow-up email for an unanswered support case", "Warranty claim letter for repair or replacement", "Billing dispute letter for an incorrect or duplicate charge"] },
    ta: { title: "இந்த புகார் கருவி உருவாக்க உதவும் செய்திகள்", items: ["தகுதியான அல்லது நிலுவையில் உள்ள பணத்திருப்பிக்கான கோரிக்கை மின்னஞ்சல்", "பதில் வராத ஆதரவு வழக்கிற்கான தொடர்ச்சி மின்னஞ்சல்", "பழுது நீக்கம் அல்லது மாற்றீட்டிற்கான உத்தரவாதக் கோரிக்கை கடிதம்", "தவறான அல்லது இருமுறை வசூலிக்கப்பட்ட தொகைக்கான பில்லிங் தகராறு கடிதம்"] },
    hi: { title: "इस शिकायत टूल से तैयार किए जा सकने वाले संदेश", items: ["योग्य या लंबित रिफंड के लिए अनुरोध ईमेल", "अनुत्तरित सहायता मामले के लिए फॉलो-अप ईमेल", "मरम्मत या बदलने के लिए वारंटी दावा पत्र", "गलत या दोहरे शुल्क के लिए बिलिंग विवाद पत्र"] },
    fr: { title: "Messages que cet outil de réclamation peut vous aider à rédiger", items: ["E-mail de demande pour un remboursement admissible ou en attente", "E-mail de relance pour un dossier d’assistance sans réponse", "Lettre de garantie pour une réparation ou un remplacement", "Lettre de contestation d’une facturation incorrecte ou en double"] }
  } as const)[locale];
  return <><Hero locale={locale} currentPath="/tools/complaint-letter" crumbs={[{ label: d.generator.h1 }]} eyebrow={d.generator.eyebrow} title={d.generator.h1} text={d.generator.intro} /><section className="section"><div className="shell"><LocalizedTemplateGenerator locale={locale} /></div></section><section className="section soft"><div className="shell prose-page"><h2>{d.generator.howTitle}</h2><p>{d.generator.howText}</p><h2>{d.generator.whenTitle}</h2><p>{d.generator.whenText}</p><h2>{useCases.title}</h2><ul>{useCases.items.map((item) => <li key={item}>{item}</li>)}</ul><h2>{d.generator.includeTitle}</h2><ul>{d.generator.includeItems.map((item) => <li key={item}>{item}</li>)}</ul></div></section></>;
}
function Guides({ locale }: { locale: Locale }) { const d = getDictionary(locale); return <><Hero locale={locale} currentPath="/guides" crumbs={[{ label: d.guides.title }]} eyebrow={d.nav.guides} title={d.guides.title} text={d.guides.intro} /><section className="section"><div className="shell"><GuideCards locale={locale} /></div></section></>; }
function Guide({ locale, slug }: { locale: Locale; slug: string }) {
  const d = getDictionary(locale); const guide = d.guides.items[slug]; const original = guides.find((item) => item.slug === slug); if (!guide || !original) notFound();
  const relatedGuides = guides.filter((item) => item.slug !== slug && (item.category === original.category || item.keywords.some((keyword) => original.keywords.includes(keyword)))).slice(0, 3);
  const companyCategories = original.category === "delivery" ? ["courier-delivery", "e-commerce"] : original.category === "refund" || original.category === "cancellation" ? ["e-commerce", "travel"] : original.category === "billing" ? ["banking", "telecom"] : original.category === "warranty" ? ["electronics", "home-appliances"] : [];
  const relatedCompanies = globalCompanies.filter((company) => !companyCategories.length || companyCategories.includes(company.category)).slice(0, 4);
  const relatedLabels = ({ en: { guides: "Related support guides", companies: "Related verified company pages", note: "Choose the correct country page before using contact information.", directory: "Official support directories", example: "Example wording" }, ta: { guides: "தொடர்புடைய ஆதரவு வழிகாட்டிகள்", companies: "தொடர்புடைய சரிபார்க்கப்பட்ட நிறுவனப் பக்கங்கள்", note: "தொடர்பு தகவலைப் பயன்படுத்தும் முன் சரியான நாட்டுப் பக்கத்தைத் தேர்ந்தெடுக்கவும்.", directory: "அதிகாரப்பூர்வ ஆதரவு அடைவுகள்", example: "எடுத்துக்காட்டு வாசகம்" }, hi: { guides: "संबंधित सहायता मार्गदर्शिकाएँ", companies: "संबंधित सत्यापित कंपनी पेज", note: "संपर्क जानकारी उपयोग करने से पहले सही देश पेज चुनें।", directory: "आधिकारिक सहायता निर्देशिकाएँ", example: "उदाहरण शब्दावली" }, fr: { guides: "Guides d’assistance associés", companies: "Pages d’entreprises vérifiées associées", note: "Choisissez le bon pays avant d’utiliser les coordonnées.", directory: "Répertoires d’assistance officiels", example: "Formulation d’exemple" } } as const)[locale];
  const localizedFaq: [string, string][] = [[d.company.complaintTitle, d.company.complaintSteps.join(" ")], [d.company.escalationTitle, d.company.escalationText]];
  const faq = locale === "en" ? original.faqs : localizedFaq;
  const contextualLinks = locale !== "en" ? [] : slug === "refund-not-received" ? [
    { label: "How to request a refund", href: "/guides/how-to-request-a-refund" },
    { label: "Write a professional complaint email", href: "/guides/how-to-write-professional-complaint-email" },
    { label: "Amazon US refund and order support", href: "/us/companies/amazon" },
    { label: "India banking complaint help", href: "/in/categories/banking" }
  ] : slug === "how-to-write-professional-complaint-email" ? [
    { label: "Find the verified company support page", href: "/search" },
    { label: "How to escalate a customer complaint", href: "/guides/how-to-escalate-customer-complaint" },
    { label: "What to do when support does not respond", href: "/guides/customer-support-not-responding" },
    { label: "Refund not received help", href: "/guides/refund-not-received" }
  ] : [];
  const articleLd = { "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.description, dateModified: original.updatedAt, inLanguage: d.htmlLang, mainEntityOfPage: `${siteConfig.url}${localePath(locale, `/guides/${slug}`)}` };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  const categoryDirectoryLinks = [...new Map(relatedCompanies.filter((company) => companyCategories.includes(company.category)).map((company) => [`${company.country}:${company.category}`, { label: `${d.countries[company.country]} · ${(d.categories[company.category] || globalCategories.find((item) => item.slug === company.category))?.name || company.category}`, href: localePath(locale, `/${company.country}/categories/${company.category}`) }])).values()].slice(0, 4);
  return <><Hero locale={locale} currentPath={`/guides/${slug}`} crumbs={[{ label: d.guides.title, href: localePath(locale, "/guides") }, { label: guide.title }]} eyebrow={`${d.guides.updated} ${original.updatedAt} · ${original.readTime}`} title={guide.title} text={guide.description} />
    <section className="section"><article className="shell prose-page">
      {locale === "en" ? <>{original.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p>{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}{original.example && <div className="warning-box"><FileText /><span><b>{relatedLabels.example}:</b> {original.example}</span></div>}</> : <><h2>{d.company.complaintTitle}</h2><ol>{d.company.complaintSteps.map((step) => <li key={step}>{step}</li>)}</ol><h2>{d.company.escalationTitle}</h2><p>{d.company.escalationText}</p></>}
      {locale === "en" && original.officialSources?.length ? <section><h2>Official reference examples</h2><p>These sources are country-specific examples. Check the rules and official process that apply to your own purchase and location.</p>{original.officialSources.map((source) => <p key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <ExternalLink size={14} /></a><br /><small>{source.note}</small></p>)}</section> : null}
      {contextualLinks.length > 0 && <section><h2>Useful next steps</h2><ul>{contextualLinks.map((item) => <li key={item.href}><Link href={localePath(locale, item.href)}>{item.label}</Link></li>)}</ul></section>}
      <div className="warning-box"><ShieldCheck /><span>{d.company.securityText}</span></div>
      <section className="faq-wrap"><h2>{guide.title} — FAQ</h2><Faqs items={faq} /></section>
      <Link className="button" href={localePath(locale, "/tools/complaint-letter")}>{d.generator.h1}</Link>
    </article></section>
    <section className="section soft"><div className="shell"><SectionHead eyebrow={d.guides.related} title={relatedLabels.guides} /><div className="guide-grid">{relatedGuides.map((item) => { const copy = d.guides.items[item.slug]; return copy && <article className="guide-card" key={item.slug}><span className="guide-icon"><FileText /></span><div><h3><Link href={localePath(locale, `/guides/${item.slug}`)}>{copy.title}</Link></h3><p>{copy.description}</p><Link className="inline-link" href={localePath(locale, `/guides/${item.slug}`)}>{d.guides.read} <ArrowRight /></Link></div></article>; })}</div></div></section>
    {categoryDirectoryLinks.length > 0 && <section className="section"><div className="shell"><SectionHead eyebrow={relatedLabels.directory} title={d.home.categoryTitle} /><div className="sidebar-card">{categoryDirectoryLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div></div></section>}
    <section className="section"><div className="shell"><SectionHead eyebrow={relatedLabels.directory} title={relatedLabels.companies} text={relatedLabels.note} /><div className="company-grid">{relatedCompanies.map((company) => <GlobalCompanyCard locale={locale} company={company} key={`${company.country}-${company.slug}`} />)}</div></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} /></>;
}
async function Search({ locale, query, country, category, support }: { locale: Locale; query: string; country: string; category: string; support: string }) {
  const countryCode = normalizeCountryCode(country) || country;
  const d = getDictionary(locale); const stop = new Set(["customer", "care", "number", "support", "help", "official", "how", "to", "about", "the"]); const normalizedQuery = query.trim().toLowerCase(); const terms = normalizedQuery.split(/\s+/).filter((term) => term.length > 2 && !stop.has(term));
  const results = (await getPublishedCompanies()).map((company) => {
    const names = [company.name, ...(company.aliases || [])].map((item) => item.toLowerCase());
    const issueText = `${company.commonIssues.join(" ")} ${(company.supportTypes || []).join(" ")}`.toLowerCase();
    const contactText = `${company.phone || ""} ${company.tollFree || ""} ${company.technicalSupportPhone || ""} ${company.salesSupportPhone || ""} ${company.email || ""} ${company.whatsapp || ""}`.toLowerCase();
    const bodyText = `${company.summary} ${company.category} ${company.refundCancellation || ""} ${company.replacement || ""} ${company.deliveryTracking || ""} ${company.billingPayment || ""} ${company.warranty || ""} ${company.complaintSteps.join(" ")} ${company.escalation}`.toLowerCase();
    let score = !terms.length ? 1 : 0;
    if (normalizedQuery && names.some((name) => name === normalizedQuery)) score += 100;
    else if (normalizedQuery && names.some((name) => name.startsWith(normalizedQuery))) score += 50;
    for (const term of terms) {
      if (names.some((name) => name.includes(term))) score += 20;
      if (issueText.includes(term)) score += 8;
      if (contactText.includes(term)) score += 12;
      if (bodyText.includes(term)) score += 2;
    }
    const supportMatch = !support || (support === "phone" ? Boolean(company.phone || company.tollFree || company.technicalSupportPhone) : support === "refund" ? Boolean(company.refundCancellation) : support === "warranty" ? Boolean(company.warranty) : support === "complaint" ? Boolean(company.complaintSteps.length) : true);
    const filterMatch = (!countryCode || company.country === countryCode) && (!category || company.category === category) && supportMatch;
    return { company, score: filterMatch ? score : 0 };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || a.company.name.localeCompare(b.company.name)).map((item) => item.company);
  const guideResults = Object.entries(d.guides.items).filter(([, guide]) => !terms.length || terms.some((term) => `${guide.title} ${guide.description}`.toLowerCase().includes(term))).slice(0, 6);
  const intentTargets = findKeywordTargets(query);
  const analyticsResultCount = new Set([...results.map((item) => `company:${item.country}:${item.slug}`), ...guideResults.map(([slug]) => `guide:${slug}`), ...intentTargets.map((item) => `intent:${item.targetPage}`)]).size;
  return <><SearchAnalytics query={query} resultCount={analyticsResultCount} /><Hero locale={locale} currentPath="/search" crumbs={[{ label: d.nav.search }]} eyebrow="Global directory" title="Search company support worldwide" text="Search verified company pages, complaint guides and support tools. Use filters only when you need to narrow the results." />
    <section className="section"><div className="shell">
      <form className="search-filters" action={localePath(locale, "/search")} method="get"><input name="q" defaultValue={query} aria-label="Company or customer issue" placeholder="Company or issue — refund, delivery, warranty…" /><input name="country" list="search-country-list" defaultValue={countryCode} aria-label="Country filter" placeholder="All countries" autoComplete="off" /><datalist id="search-country-list">{countries.map((item) => <option key={item.code} value={item.code}>{item.flag} {d.countries[item.code] || item.name}</option>)}</datalist><select name="category" defaultValue={category} aria-label="Category filter"><option value="">All categories</option>{globalCategories.map((item) => <option key={item.slug} value={item.slug}>{(d.categories[item.slug] || item).name}</option>)}</select><select name="support" defaultValue={support} aria-label="Support type filter"><option value="">All support types</option><option value="phone">Verified phone</option><option value="refund">Refund & cancellation</option><option value="warranty">Warranty & repair</option><option value="complaint">Complaint escalation</option></select><button className="button" type="submit">Search</button></form>
      <p className="search-summary">{results.length} verified company {results.length === 1 ? "result" : "results"}{query ? ` for “${query}”` : ""}</p>
      {intentTargets.length > 0 && <section className="result-section"><SectionHead eyebrow="Best match" title="Recommended next step" /><div className="guide-grid">{intentTargets.map((target) => { const guideSlug = target.targetPage.startsWith("/guides/") ? target.targetPage.split("/").pop() : null; const targetTitle = guideSlug && d.guides.items[guideSlug] ? d.guides.items[guideSlug].title : target.targetPage === "/tools/complaint-letter" ? d.generator.h1 : target.targetTitle; return <article className="guide-card" key={target.targetPage}><span className="guide-icon"><ArrowRight /></span><div><span className="eyebrow">{target.searchIntent.replaceAll("-", " ")}</span><h3><Link href={localePath(locale, target.targetPage)}>{targetTitle}</Link></h3><p>Matched to: {target.keyword}</p><Link className="inline-link" href={localePath(locale, target.targetPage)}>Open best match <ArrowRight /></Link></div></article>; })}</div></section>}
      <section className="result-section"><SectionHead eyebrow="Company support" title="Verified company pages" /><div className="company-grid">{results.map((company) => <GlobalCompanyCard locale={locale} company={company} key={`${company.country}-${company.slug}`} />)}</div>{!results.length && <div className="content-card"><h2>No verified company match yet</h2><p>Try a broader issue or category. ResolveNexa does not publish unverified contact details.</p></div>}</section>
      {guideResults.length > 0 && <section className="result-section"><SectionHead eyebrow="Guides" title="Related complaint and support guides" /><div className="guide-grid">{guideResults.map(([guideSlug, guide]) => <article className="guide-card" key={guideSlug}><span className="guide-icon"><FileText /></span><div><h3><Link href={localePath(locale, `/guides/${guideSlug}`)}>{guide.title}</Link></h3><p>{guide.description}</p><Link className="inline-link" href={localePath(locale, `/guides/${guideSlug}`)}>{d.guides.read} <ArrowRight /></Link></div></article>)}</div></section>}
      <section className="result-section"><SectionHead eyebrow="Complaint tool" title="Create a professional complaint message" /><Link href={localePath(locale, "/tools/complaint-letter")} className="tool-card"><span><FileText /></span><h3>{d.generator.h1}</h3><p>{d.generator.seoDescription}</p><b>{d.home.openTool} <ArrowRight size={15} /></b></Link></section>
    </div></section></>;
}
function Static({ locale, name }: { locale: Locale; name: typeof staticNames[number] }) { const d = getDictionary(locale); const key = name === "privacy-policy" ? "privacy" : name as keyof typeof d.static; const [title, body] = d.static[key]; return <><Hero locale={locale} currentPath={`/${name}`} crumbs={[{ label: title }]} eyebrow="ResolveNexa" title={title} text={body} /><section className="section"><div className="shell prose-page"><p>{body}</p><p>{d.footer.safetyText}</p></div></section></>; }

function Hero({ locale, currentPath, crumbs, eyebrow, title, text, children }: { locale: Locale; currentPath: string; crumbs: BreadcrumbItem[]; eyebrow: string; title: string; text: string; children?: React.ReactNode }) { return <section className="page-hero"><div className="shell"><Breadcrumbs locale={locale} items={crumbs} currentPath={currentPath} /><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{children}</div></section>; }
function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) { return <div className="section-head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p className="section-note">{text}</p>}</div></div>; }
function Faqs({ items }: { items: [string, string][] }) { return <div>{items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>; }
function Info({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) { return <div className="info-row"><span>{label}</span><b className={muted ? "support-unverified" : ""}>{value}</b></div>; }
function GuideCards({ locale, limit, slugs }: { locale: Locale; limit?: number; slugs?: string[] }) { const d = getDictionary(locale); const source = slugs?.map((slug) => [slug, d.guides.items[slug]] as const).filter((item): item is readonly [string, NonNullable<typeof item[1]>] => Boolean(item[1])) || Object.entries(d.guides.items); const items = source.slice(0, limit); return <div className="guide-grid">{items.map(([slug, guide]) => <article className="guide-card" key={slug}><span className="guide-icon"><FileText /></span><div><h3><Link href={localePath(locale, `/guides/${slug}`)}>{guide.title}</Link></h3><p>{guide.description}</p><Link className="inline-link" href={localePath(locale, `/guides/${slug}`)}>{d.guides.read} <ArrowRight /></Link></div></article>)}</div>; }
