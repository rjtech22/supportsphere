"use client";

import { useState } from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { trackEvent } from "@/lib/analytics";

export function ReportForm({ pageUrl }: { pageUrl: string }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(formData: FormData) {
    if (!isSupabaseConfigured()) { setMessage("Reporting will activate after Supabase is connected."); return; }
    const details = String(formData.get("details") || "").trim();
    const issueType = String(formData.get("issue_type") || "other");
    const email = String(formData.get("email") || "").trim() || null;
    if (details.length < 10) { setMessage("Please add at least 10 characters."); return; }
    const { error } = await createClient().from("information_reports").insert({ page_url: pageUrl, issue_type: issueType, details, reporter_email: email });
    setMessage(error ? "Could not submit. Please try again." : "Thank you. Your report was submitted for review.");
    if (!error) trackEvent("report_incorrect_info", { page_url: pageUrl, issue_type: issueType });
  }
  return <div className="report-box"><button className="text-button" onClick={() => setOpen(!open)}>Report incorrect information</button>{open && <form action={submit} className="report-form"><select name="issue_type" aria-label="Issue type"><option value="outdated">Outdated information</option><option value="wrong-link">Wrong link</option><option value="unsafe">Unsafe or suspicious</option><option value="other">Other</option></select><textarea name="details" placeholder="Tell us what needs correction" required minLength={10} /><input name="email" type="email" placeholder="Email (optional)" /><button className="button small" type="submit">Submit report</button>{message && <p role="status">{message}</p>}</form>}</div>;
}
