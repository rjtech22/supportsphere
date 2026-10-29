import { spawn } from "node:child_process";

const command = process.platform === "win32" ? "npm.cmd" : "npm";
const server = spawn(command, ["start"], { shell: process.platform === "win32", stdio: ["ignore", "pipe", "pipe"] });
let output = "";
server.stdout.on("data", (chunk) => { output += chunk.toString(); });
server.stderr.on("data", (chunk) => { output += chunk.toString(); });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const paths = ["/", "/us", "/us/companies/usps", "/tools/complaint-letter", "/sitemap.xml", "/robots.txt"];

try {
  for (let attempt = 0; attempt < 40 && !output.includes("Ready"); attempt += 1) await delay(250);
  if (!output.includes("Ready")) throw new Error(`Server did not become ready.\n${output}`);
  for (const path of paths) {
    const response = await fetch(`http://127.0.0.1:3000${path}`);
    const body = await response.text();
    if (!response.ok || body.length < 20) throw new Error(`${path} failed: ${response.status}`);
    console.log(`${response.status} ${path} ${body.length} bytes`);
  }
} finally {
  server.kill();
}
