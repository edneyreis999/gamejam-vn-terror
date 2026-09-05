#!/usr/bin/env node

import { lstat, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";

import { parseControllerReceipts } from "./playtest_controller_core.mjs";

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || !process.argv[index + 1]) throw new Error(`missing ${flag}`);
  return process.argv[index + 1];
}

async function main() {
  const consoleLog = resolve(valueAfter("--console-log"));
  const output = resolve(valueAfter("--output"));
  try {
    if ((await lstat(output)).isSymbolicLink()) throw new Error(`output cannot be a symlink: ${output}`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const records = parseControllerReceipts(await readFile(consoleLog, "utf8"));
  if (records.length === 0) throw new Error("console log contains no controller receipts");
  await writeFile(output, `${records.map((record) => JSON.stringify(record)).join("\n")}\n`, { encoding: "utf8", mode: 0o600 });
  console.log(JSON.stringify({ result: "extracted", count: records.length, output }, null, 2));
}

main().catch((error) => {
  console.error(`extract-controller-receipts: ${error.message}`);
  process.exitCode = 2;
});
