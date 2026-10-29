"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const configured = isSupabaseConfigured(); const [message, setMessage] = useState(""); const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); if (!configured) return; const data = new FormData(event.currentTarget); const { error } = await createClient().auth.signInWithPassword({ email: String(data.get("email")), password: String(data.get("password")) }); if (error) setMessage(error.message); else { router.push("/admin"); router.refresh(); } }
  if (!configured) return <div className="config-box"><b>Supabase is not configured.</b><p>Add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, run <code>supabase/schema.sql</code>, then create and promote an Auth user.</p></div>;
  return <form onSubmit={submit}><input name="email" type="email" placeholder="Admin email" autoComplete="email" required /><input name="password" type="password" placeholder="Password" autoComplete="current-password" required /><button className="button" type="submit">Sign in securely</button>{message && <p role="alert">{message}</p>}</form>;
}
