#!/usr/bin/env node
// Lint every enabled plugin of an MZ project against the Chromium 88 floor. Read-only.
// Usage: node run.mjs <project-root>     (run `npm install` in this directory once)
// Exit: 0 clean, 1 findings, 2 usage or missing dependencies.
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = process.argv[2];
if (!root || !existsSync(join(root, "game.rmmzproject"))) {
  console.error("usage: node run.mjs <project-root>   (a directory containing game.rmmzproject)");
  process.exit(2);
}
let ESLint;
try {
  ({ ESLint } = await import("eslint"));
} catch {
  console.error(`eslint is not installed; run \`npm install\` in ${here}`);
  process.exit(2);
}

// plugins.js is data: read the JSON array, never execute it. Every enabled entry is scanned, not a name prefix.
const text = readFileSync(join(root, "js", "plugins.js"), "utf8");
const plugins = JSON.parse(text.slice(text.indexOf("[", text.indexOf("var $plugins")), text.lastIndexOf("]") + 1));
const files = [];
for (const plugin of plugins.filter((p) => p.status)) {
  const file = resolve(root, "js", "plugins", `${plugin.name}.js`);
  if (existsSync(file)) files.push(file);
  else console.log(`ERROR plugins.js ${plugin.name}: js/plugins/${plugin.name}.js is missing`);
}

const eslint = new ESLint({ cwd: resolve(root), overrideConfigFile: join(here, "eslint.config.mjs"), ignore: false });
const results = await eslint.lintFiles(files);
let errors = 0;
for (const result of results) {
  for (const message of result.messages) {
    errors += 1;
    const rule = message.ruleId ? ` [${message.ruleId}]` : "";
    console.log(`ERROR ${result.filePath}:${message.line}:${message.column}: ${message.message}${rule}`);
  }
}
console.log(`check-runtime-compat: ${files.length} enabled plugin(s) scanned, ${errors} error(s)`);
process.exit(errors > 0 ? 1 : 0);
