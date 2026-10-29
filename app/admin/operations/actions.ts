"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/server";

export async function saveAdPlacement(form: FormData) {
  const auth = await requireAdmin(); if (!auth.user || !auth.isAdmin) throw new Error("Unauthorized");
  const payload = { placement_key: z.string().regex(/^[a-z0-9_-]+$/).parse(form.get("placement_key")), label: z.string().min(2).parse(form.get("label")), adsense_slot_id: String(form.get("adsense_slot_id") || "") || null, page_pattern: z.string().min(1).parse(form.get("page_pattern") || "*"), enabled: form.get("enabled") === "on" };
  const { error } = await auth.supabase.from("ad_placements").upsert(payload, { onConflict: "placement_key" }); if (error) throw new Error(error.message); revalidatePath("/admin/operations");
}
