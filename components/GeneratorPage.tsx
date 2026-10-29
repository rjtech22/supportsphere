import type { GeneratorMode } from "@/components/TemplateGenerator";
import { TemplateGenerator } from "@/components/TemplateGenerator";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const content: Record<GeneratorMode, { title: string; description: string }> = {
  complaint: { title: "Complaint letter generator", description: "Create a professional customer complaint letter from your own facts." },
  refund: { title: "Refund request email generator", description: "Create a clear request for an eligible or pending refund." },
  warranty: { title: "Warranty complaint generator", description: "Organise a product warranty or service complaint without exposing sensitive data." },
  delivery: { title: "Delivery delay complaint generator", description: "Create a structured message for a delayed or missing delivery." },
  bank: { title: "Bank transaction complaint generator", description: "Create a transaction complaint without entering credentials or full account details." },
  followup: { title: "Customer support follow-up generator", description: "Follow up on an unresolved support ticket with a clear timeline and request." }
};
export function GeneratorPage({ mode }: { mode: GeneratorMode }) { const item = content[mode]; return <><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Complaint tools", href: "/tools/complaint-letter" }, { label: item.title }]} /><span className="eyebrow">Free local template tool</span><h1>{item.title}</h1><p>{item.description} Generation runs in your browser and does not require a paid API.</p></div></section><section className="section"><div className="shell"><TemplateGenerator mode={mode} /></div></section></>; }
export function generatorMetadata(mode: GeneratorMode) { return { title: content[mode].title, description: content[mode].description }; }
