"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Flag, ShieldAlert, Star } from "lucide-react";
import { allCountries } from "@/lib/country-catalog";
import type { Locale } from "@/lib/i18n";

type PublicReview = {
  id: string;
  display_name: string | null;
  rating: number | null;
  review_body: string;
  reviewer_country_code: string;
  experience_date: string | null;
  created_at: string;
};

const copy = {
  en: { eyebrow: "Customer experiences", title: "Share your support experience", intro: "Reviews are checked before publication. SupportSphere never creates reviews or ratings.", name: "Display name (optional)", rating: "Star rating (optional)", noRating: "No rating", country: "Country of your experience", date: "Experience date (optional)", body: "What happened, which official support channel did you use, and was the issue resolved?", warning: "Do not include phone numbers, email addresses, order numbers, account details, passwords or other personal information.", submit: "Submit for moderation", pending: "Your review will not appear until an administrator approves it.", empty: "No approved customer reviews yet. Be the first to submit an experience for moderation.", anonymous: "Anonymous customer", reviewed: "Reviewed", report: "Report review", reason: "Why are you reporting this review?", details: "Extra details (optional)", sendReport: "Submit report", cancel: "Cancel", loading: "Loading approved reviews…" },
  ta: { eyebrow: "வாடிக்கையாளர் அனுபவங்கள்", title: "உங்கள் ஆதரவு அனுபவத்தைப் பகிருங்கள்", intro: "வெளியிடுவதற்கு முன் விமர்சனங்கள் சரிபார்க்கப்படும். SupportSphere விமர்சனங்களையோ மதிப்பீடுகளையோ உருவாக்காது.", name: "காட்சி பெயர் (விருப்பம்)", rating: "நட்சத்திர மதிப்பீடு (விருப்பம்)", noRating: "மதிப்பீடு இல்லை", country: "உங்கள் அனுபவம் நடந்த நாடு", date: "அனுபவ தேதி (விருப்பம்)", body: "என்ன நடந்தது, எந்த அதிகாரப்பூர்வ ஆதரவு வழியைப் பயன்படுத்தினீர்கள், பிரச்சினை தீர்ந்ததா?", warning: "தொலைபேசி எண், மின்னஞ்சல், ஆர்டர் எண், கணக்கு விவரம், கடவுச்சொல் அல்லது தனிப்பட்ட தகவலை சேர்க்க வேண்டாம்.", submit: "மிதமான ஆய்வுக்கு சமர்ப்பிக்கவும்", pending: "நிர்வாகி ஒப்புதல் அளிக்கும் வரை உங்கள் விமர்சனம் காட்டப்படாது.", empty: "அங்கீகரிக்கப்பட்ட வாடிக்கையாளர் விமர்சனங்கள் இன்னும் இல்லை.", anonymous: "பெயரில்லா வாடிக்கையாளர்", reviewed: "விமர்சன தேதி", report: "விமர்சனத்தைப் புகாரளிக்கவும்", reason: "இந்த விமர்சனத்தை ஏன் புகாரளிக்கிறீர்கள்?", details: "கூடுதல் விவரங்கள் (விருப்பம்)", sendReport: "புகார் அனுப்பவும்", cancel: "ரத்து", loading: "அங்கீகரிக்கப்பட்ட விமர்சனங்கள் ஏற்றப்படுகின்றன…" },
  hi: { eyebrow: "ग्राहक अनुभव", title: "अपना सहायता अनुभव साझा करें", intro: "प्रकाशन से पहले समीक्षाओं की जाँच की जाती है। SupportSphere समीक्षाएँ या रेटिंग नहीं बनाता।", name: "दिखने वाला नाम (वैकल्पिक)", rating: "स्टार रेटिंग (वैकल्पिक)", noRating: "कोई रेटिंग नहीं", country: "आपके अनुभव का देश", date: "अनुभव की तारीख (वैकल्पिक)", body: "क्या हुआ, आपने कौन-सा आधिकारिक सहायता माध्यम इस्तेमाल किया और क्या समस्या हल हुई?", warning: "फोन नंबर, ईमेल, ऑर्डर नंबर, खाता विवरण, पासवर्ड या अन्य निजी जानकारी शामिल न करें।", submit: "मॉडरेशन के लिए भेजें", pending: "व्यवस्थापक की मंजूरी तक आपकी समीक्षा दिखाई नहीं जाएगी।", empty: "अभी कोई स्वीकृत ग्राहक समीक्षा नहीं है।", anonymous: "अनाम ग्राहक", reviewed: "समीक्षा की तारीख", report: "समीक्षा की रिपोर्ट करें", reason: "आप इस समीक्षा की रिपोर्ट क्यों कर रहे हैं?", details: "अतिरिक्त विवरण (वैकल्पिक)", sendReport: "रिपोर्ट भेजें", cancel: "रद्द करें", loading: "स्वीकृत समीक्षाएँ लोड हो रही हैं…" },
  fr: { eyebrow: "Expériences clients", title: "Partagez votre expérience d’assistance", intro: "Les avis sont vérifiés avant publication. SupportSphere ne crée jamais d’avis ni de notes.", name: "Nom affiché (facultatif)", rating: "Note en étoiles (facultative)", noRating: "Sans note", country: "Pays de votre expérience", date: "Date de l’expérience (facultative)", body: "Que s’est-il passé, quel canal officiel avez-vous utilisé et le problème a-t-il été résolu ?", warning: "N’incluez aucun numéro de téléphone, e-mail, numéro de commande, identifiant de compte, mot de passe ou autre donnée personnelle.", submit: "Envoyer pour modération", pending: "Votre avis ne sera visible qu’après approbation par un administrateur.", empty: "Aucun avis client approuvé pour le moment.", anonymous: "Client anonyme", reviewed: "Date de l’avis", report: "Signaler l’avis", reason: "Pourquoi signalez-vous cet avis ?", details: "Informations supplémentaires (facultatif)", sendReport: "Envoyer le signalement", cancel: "Annuler", loading: "Chargement des avis approuvés…" }
} as const;

const reportReasons = [
  ["personal_information", "Contains personal information"],
  ["spam", "Spam or promotion"],
  ["abuse", "Abusive content"],
  ["fake_or_misleading", "Possibly fake or misleading"],
  ["other", "Other"]
] as const;

export function CompanyReviews({ companySlug, companyName, companyCountryCode, locale }: { companySlug: string; companyName: string; companyCountryCode: string; locale: Locale }) {
  const text = copy[locale];
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [reportStartedAt, setReportStartedAt] = useState(() => Date.now());
  const regionNames = useMemo(() => {
    try { return new Intl.DisplayNames([locale], { type: "region" }); } catch { return null; }
  }, [locale]);
  const countryName = (code: string) => regionNames?.of(code.toUpperCase()) || allCountries.find((item) => item.code === code)?.name || code.toUpperCase();
  const query = `/api/reviews?company=${encodeURIComponent(companySlug)}&country=${encodeURIComponent(companyCountryCode)}`;

  useEffect(() => {
    let active = true;
    fetch(query, { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => { if (active) setReviews(Array.isArray(data.reviews) ? data.reviews : []); })
      .catch(() => { if (active) setReviews([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query]);

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    const ratingValue = String(form.get("rating") || "");
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companySlug,
        companyCountryCode,
        reviewerCountryCode: form.get("country"),
        displayName: form.get("displayName"),
        rating: ratingValue ? Number(ratingValue) : null,
        reviewBody: form.get("reviewBody"),
        experienceDate: form.get("experienceDate"),
        website: form.get("website"),
        startedAt
      })
    });
    const result = await response.json().catch(() => ({ error: "Could not submit the review." }));
    setMessage(result.message || result.error);
    if (response.ok) { event.currentTarget.reset(); setStartedAt(Date.now()); }
  }

  async function submitReport(event: FormEvent<HTMLFormElement>, reviewId: string) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch(`/api/reviews/${reviewId}/report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason: form.get("reason"), details: form.get("details"), website: form.get("website"), startedAt: reportStartedAt })
    });
    const result = await response.json().catch(() => ({ error: "Could not submit the report." }));
    setMessage(result.message || result.error);
    if (response.ok) setReportingId(null);
  }

  return <section className="company-reviews" aria-labelledby="company-reviews-title">
    <div className="review-heading"><div><span className="eyebrow">{text.eyebrow}</span><h2 id="company-reviews-title">{text.title}</h2><p>{text.intro}</p></div><span className="review-company">{companyName} · {countryName(companyCountryCode)}</span></div>
    <div className="review-layout">
      <form className="review-form" onSubmit={submitReview}>
        <div className="review-two"><label>{text.name}<input name="displayName" maxLength={60} autoComplete="nickname" /></label><label>{text.rating}<select name="rating" defaultValue=""><option value="">{text.noRating}</option>{[5,4,3,2,1].map((rating) => <option value={rating} key={rating}>{rating} / 5</option>)}</select></label></div>
        <div className="review-two"><label>{text.country}<select name="country" defaultValue={companyCountryCode} required>{allCountries.map((country) => <option value={country.code} key={country.code}>{country.flag} {countryName(country.code)}</option>)}</select></label><label>{text.date}<input type="date" name="experienceDate" max={new Date().toISOString().slice(0, 10)} /></label></div>
        <label>{text.body}<textarea name="reviewBody" required minLength={40} maxLength={1500} rows={6} /></label>
        <input className="review-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <div className="review-warning"><ShieldAlert size={18} aria-hidden="true" /><span>{text.warning}</span></div>
        <p className="review-pending">{text.pending}</p>
        <button className="button" type="submit">{text.submit}</button>
        {message && <p className="review-status" role="status">{message}</p>}
      </form>
      <div className="review-list" aria-live="polite">
        {loading ? <p>{text.loading}</p> : reviews.length ? reviews.map((review) => <article className="review-item" key={review.id}>
          <div className="review-meta"><strong>{review.display_name || text.anonymous}</strong>{review.rating ? <span className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill={index < review.rating! ? "currentColor" : "none"} />)}</span> : null}</div>
          <p>{review.review_body}</p>
          <small><Flag size={12} aria-hidden="true" /> {countryName(review.reviewer_country_code)} · {text.reviewed} {new Date(review.created_at).toLocaleDateString(locale)}</small>
          <button className="text-button" type="button" onClick={() => { setReportingId(review.id); setReportStartedAt(Date.now()); }}>{text.report}</button>
          {reportingId === review.id && <form className="review-report-form" onSubmit={(event) => submitReport(event, review.id)}><label>{text.reason}<select name="reason" required>{reportReasons.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label>{text.details}<textarea name="details" maxLength={500} rows={3} /></label><input className="review-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" /><div><button className="button small" type="submit">{text.sendReport}</button><button className="secondary-button" type="button" onClick={() => setReportingId(null)}>{text.cancel}</button></div></form>}
        </article>) : <p className="review-empty">{text.empty}</p>}
      </div>
    </div>
  </section>;
}

