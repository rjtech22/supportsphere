import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComplaintLetterTool } from "./tool";

export const metadata: Metadata = { title: "Free customer complaint letter template", description: "Create a clear complaint letter for a company using your own facts. Nothing is uploaded.", alternates: { canonical: "/tools/complaint-letter" } };
export default function ComplaintLetterPage() { return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Complaint letter tool" }]} /><span className="eyebrow">Free digital template</span><h1>Customer complaint letter generator</h1><p>Create a structured complaint from your facts. The tool runs in your browser and does not upload what you type.</p></div></section><section className="section"><div className="shell"><ComplaintLetterTool /></div></section></>; }
