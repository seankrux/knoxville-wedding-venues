import { mkdir, readdir, copyFile, rm } from "node:fs/promises";
import { extname } from "node:path";
const root = new URL("../", import.meta.url);
const output = new URL("../.cloudflare/assets/", import.meta.url);
const extensions = new Set([".html", ".txt", ".xml", ".json", ".js", ".css", ".svg", ".png", ".jpg", ".jpeg", ".webp", ".ico", ".woff", ".woff2"]);
await rm(output, { recursive: true, force: true });
async function copy(from, to, depth = 0) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || (depth === 0 && ["scripts", "cloudflare-worker.mjs"].includes(entry.name))) continue;
    const source = new URL(entry.name + (entry.isDirectory() ? "/" : ""), from);
    const target = new URL(entry.name + (entry.isDirectory() ? "/" : ""), to);
    if (entry.isDirectory()) await copy(source, target, depth + 1);
    else if (extensions.has(extname(entry.name))) await copyFile(source, target);
  }
}
await copy(root, output);
console.log("Knoxville static export staged for Cloudflare");
