import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = [];
function walk(dir) { for (const item of fs.readdirSync(dir, { withFileTypes: true })) { const full = path.join(dir, item.name); if (item.isDirectory() && !["node_modules", ".next"].includes(item.name)) walk(full); else if (item.isFile() && /\.(tsx|ts)$/.test(item.name)) files.push(full); } }
walk(path.join(root, "app")); walk(path.join(root, "components"));
const text = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const requiredRoutes = ["/about", "/contact", "/privacy-policy", "/terms", "/disclaimer", "/search", "/tools/complaint-letter"];
const missing = requiredRoutes.filter((route) => !text.includes(route));
if (missing.length) { console.error("Missing internal route references:", missing.join(", ")); process.exit(1); }
console.log(`Link structure check passed (${files.length} source files scanned).`);
