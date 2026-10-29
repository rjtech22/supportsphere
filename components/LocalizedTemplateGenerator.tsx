"use client";

import { FormEvent, useState } from "react";
import { Copy, Download, RotateCcw } from "lucide-react";
import { countries } from "@/lib/global-data";
import { trackEvent } from "@/lib/analytics";
import { getDictionary, t, type Locale } from "@/lib/i18n";

export function LocalizedTemplateGenerator({ locale }: { locale: Locale }) {
  const d = getDictionary(locale); const c = d.generator;
  const [output, setOutput] = useState(""); const [copied, setCopied] = useState(false);
  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const data = new FormData(event.currentTarget); const get = (key: string) => String(data.get(key) || "").trim();
    const company = get("company"); const tone = get("tone"); const countryCode = get("country"); const country = d.countries[countryCode] || countries.find((item) => item.code === countryCode)?.name || countryCode;
    const opener = tone === "firm" ? c.openerFirm : tone === "polite" ? c.openerPolite : c.openerProfessional;
    const body = `${c.subject} — ${get("issue")}\n\n${t(c.greeting, { company })}\n\n${opener} ${get("issue")}\n${t(c.referenceLine, { country, reference: get("reference") || "—" })}\n\n${c.detailsLine}: ${get("details")}\n\n${c.resolutionLine}: ${get("resolution")}\n\n${c.closing}\n\n${c.sincerely},\n${get("name")}`;
    setOutput(body); setCopied(false); trackEvent("generator_use", { generator_type: "complaint", country: countryCode, tone, locale });
  }
  async function copy() { await navigator.clipboard.writeText(output); setCopied(true); trackEvent("generator_copy", { generator_type: "complaint", locale }); }
  function download() { const blob = new Blob([output], { type: "text/plain;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `complaint-${locale}-template.txt`; link.click(); URL.revokeObjectURL(url); }
  return <div className="letter-layout"><form className="letter-form content-card" onSubmit={generate} onReset={() => { setOutput(""); setCopied(false); }}><h2>{c.detailsTitle}</h2><div className="form-two"><select aria-label={c.country} name="country" required defaultValue="us">{countries.map((country) => <option value={country.code} key={country.code}>{d.countries[country.code]}</option>)}</select><select aria-label={c.tone} name="tone" defaultValue="professional"><option value="professional">{c.professional}</option><option value="polite">{c.polite}</option><option value="firm">{c.firm}</option></select></div><input name="name" aria-label={c.yourName} placeholder={c.yourName} required /><input name="company" aria-label={c.companyName} placeholder={c.companyName} required /><input name="issue" aria-label={c.issue} placeholder={c.issue} required /><input name="reference" aria-label={c.reference} placeholder={c.reference} /><textarea name="details" aria-label={c.details} placeholder={c.details} required minLength={20} /><textarea name="resolution" aria-label={c.resolution} placeholder={c.resolution} required minLength={5} /><div className="form-actions"><button className="button" type="submit">{c.generate}</button><button className="secondary-button" type="reset"><RotateCcw size={15} /> {c.reset}</button></div><p className="section-note">{c.safety}</p></form><section><div className="letter-output" aria-live="polite">{output || c.empty}</div><div className="meta-row"><button className="button small" type="button" onClick={copy} disabled={!output}><Copy size={15} /> {copied ? c.copied : c.copy}</button><button className="button small" type="button" onClick={download} disabled={!output}><Download size={15} /> {c.download}</button></div></section></div>;
}
