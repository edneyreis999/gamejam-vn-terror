// Shared helpers for the read-only MZ checks. Node >= 22, no dependencies.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

export class Report {
  constructor() {
    this.errors = 0;
    this.warnings = 0;
  }
  error(where, message) {
    this.errors += 1;
    console.log(`ERROR ${where}: ${message}`);
  }
  warn(where, message) {
    this.warnings += 1;
    console.log(`WARN  ${where}: ${message}`);
  }
  finish(name) {
    console.log(`${name}: ${this.errors} error(s), ${this.warnings} warning(s)`);
    return this.errors > 0 ? 1 : 0;
  }
}

export function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) flags[arg.slice(2)] = true;
      else {
        flags[arg.slice(2)] = next;
        i += 1;
      }
    } else positional.push(arg);
  }
  return { positional, flags };
}

export function requireProject(root) {
  if (!root || !existsSync(join(root, "game.rmmzproject"))) {
    console.error(`usage: <script> <project-root>   (a directory containing game.rmmzproject)`);
    process.exit(2);
  }
  return root;
}

export function readJson(path, report) {
  try {
    const text = readFileSync(path, "utf8");
    if (text.charCodeAt(0) === 0xfeff) report.warn(path, "starts with a byte-order mark (the engine tolerates it; the editor does not write it)");
    return JSON.parse(text.replace(/^\uFEFF/, ""));
  } catch (err) {
    report.error(path, `cannot read or parse JSON: ${err.message}`);
    return undefined;
  }
}

// plugins.js is data, never executed: take the JSON array between `var $plugins =` and the final `;`.
export function readPlugins(root, report) {
  const path = join(root, "js", "plugins.js");
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch (err) {
    report.error(path, `cannot read: ${err.message}`);
    return undefined;
  }
  const start = text.indexOf("[", text.indexOf("var $plugins"));
  const end = text.lastIndexOf("]");
  if (start < 0 || end < start) {
    report.error(path, "no plugin array found");
    return undefined;
  }
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch (err) {
    report.error(path, `plugin array is not valid JSON: ${err.message}`);
    return undefined;
  }
}
