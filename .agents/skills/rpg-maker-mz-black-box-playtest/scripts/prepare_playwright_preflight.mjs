#!/usr/bin/env node

import { lstat, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import process from "node:process";

import { makePreflightRunnerSource } from "./playtest_controller_core.mjs";

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || !process.argv[index + 1]) throw new Error(`missing ${flag}`);
  return process.argv[index + 1];
}

async function refuseSymlink(path) {
  try {
    if ((await lstat(path)).isSymbolicLink()) throw new Error(`output cannot be a symlink: ${path}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

async function main() {
  const output = resolve(valueAfter("--output"));
  await mkdir(dirname(output), { recursive: true });
  await refuseSymlink(output);
  await writeFile(output, `${makePreflightRunnerSource()}\n`, { encoding: "utf8", mode: 0o600 });
  console.log(JSON.stringify({ result: "prepared", kind: "preflight", output }, null, 2));
}

main().catch((error) => {
  console.error(`prepare-playwright-preflight: ${error.message}`);
  process.exitCode = 2;
});
