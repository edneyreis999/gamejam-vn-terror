#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";

import { summarizeRouteTime } from "./playtest_controller_core.mjs";

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || !process.argv[index + 1]) throw new Error(`missing ${flag}`);
  return process.argv[index + 1];
}

async function main() {
  const cardPath = resolve(valueAfter("--card"));
  const receiptsPath = resolve(valueAfter("--receipts"));
  const card = JSON.parse(await readFile(cardPath, "utf8"));
  const lines = (await readFile(receiptsPath, "utf8")).split(/\r?\n/);
  const records = lines.filter((line) => line.trim() !== "").map((line) => JSON.parse(line));
  console.log(JSON.stringify(summarizeRouteTime(records, card), null, 2));
}

main().catch((error) => {
  console.error(`summarize-route-time: ${error.message}`);
  process.exitCode = 2;
});
