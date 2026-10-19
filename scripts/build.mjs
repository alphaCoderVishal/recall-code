import { mkdir, copyFile, readFile, writeFile, rm } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { build } from "esbuild";
import { buildCatalog } from "./catalog.mjs";
// Local .env is ignored by git; deployment reads Cloudflare environment variables.
try {
  for (const line of (await readFile(".env", "utf8")).split(/\r?\n/)) {
    const match = line.match(/^([A-Z_]+)=(.*)$/);
    if (match && !process.env[match[1]])
      process.env[match[1]] = match[2].trim();
  }
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const url = process.env.SUPABASE_URL || "",
  key = process.env.SUPABASE_PUBLISHABLE_KEY || "";
if (Boolean(url) !== Boolean(key))
  throw new Error("Set both Supabase public URL and publishable key.");
if (key.startsWith("sb_secret_"))
  throw new Error("Secret Supabase keys must never enter a frontend build.");
if (key.startsWith("eyJ")) {
  const payload = JSON.parse(
    Buffer.from(key.split(".")[1], "base64url").toString(),
  );
  if (payload.role !== "anon")
    throw new Error("Only the Supabase anon or publishable key is allowed.");
}
if (url && !/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url))
  throw new Error("Use the HTTPS Supabase project URL.");
if (process.env.REQUIRE_CLOUD === "1" && (!url || !key))
  throw new Error("Production deploy requires Supabase configuration.");
if (
  process.env.REMINDERS_URL &&
  !/^https:\/\/[a-z0-9.-]+\.workers\.dev$/.test(process.env.REMINDERS_URL)
)
  throw new Error("Use the HTTPS reminders Worker origin.");
const questions = await buildCatalog({
  allowPartial: process.env.ALLOW_PARTIAL_CATALOG === "1",
});
const output = resolve("dist");
if (dirname(output) !== process.cwd())
  throw new Error("Unsafe build output directory");
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ["index.html", "favicon.svg", "sw.js", "manifest.webmanifest", "icon-192.png", "icon-512.png"])
  await copyFile(file, `dist/${file}`);
await mkdir("dist/src", { recursive: true });
await copyFile("src/styles.css", "dist/src/styles.css");
await build({
  entryPoints: ["src/app.js"],
  outfile: "dist/src/app.js",
  bundle: true,
  format: "esm",
  platform: "browser",
  target: "es2022",
  minify: true,
  define: {
    __SUPABASE_URL__: JSON.stringify(url),
    __SUPABASE_KEY__: JSON.stringify(key),
    __AUTH_MODE__: JSON.stringify(process.env.AUTH_MODE || "github"),
    __REMINDERS_URL__: JSON.stringify(process.env.REMINDERS_URL || ""),
  },
});
await writeFile(
  "dist/_headers",
  `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.supabase.co wss://*.supabase.co ${process.env.REMINDERS_URL || ""}; worker-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'\n`,
);
console.log(
  `Built ${questions.length} catalog questions. Cloud login: ${url ? "configured" : "not configured (local mode)"}.`,
);
