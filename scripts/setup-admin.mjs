import { createClient } from "@supabase/supabase-js";

const required = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "ADMIN_EMAIL", "ADMIN_PASSWORD"];
for (const name of required) if (!process.env[name]) throw new Error(`Missing ${name}`);
if (process.env.ADMIN_PASSWORD.length < 12) throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");

const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const { data, error } = await db.auth.admin.createUser({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, email_confirm: true });
if (error && !error.message.toLowerCase().includes("already")) throw error;
let user = data?.user;
if (!user) {
  const { data: listed, error: listError } = await db.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (listError) throw listError;
  user = listed.users.find((item) => item.email?.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase());
}
if (!user) throw new Error("Unable to resolve the admin Auth user.");
const [{ error: profileError }, { error: adminError }] = await Promise.all([
  db.from("profiles").upsert({ id: user.id, role: "admin" }),
  db.from("admin_users").upsert({ user_id: user.id, active: true })
]);
if (profileError || adminError) throw profileError || adminError;
console.log(`Admin access configured for ${user.email}. Remove ADMIN_PASSWORD from the shell history and environment now.`);
