#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";

import { controllerIdentity, validateRouteCard } from "./playtest_controller_core.mjs";

function valueAfter(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || !process.argv[index + 1]) throw new Error(`missing ${flag}`);
  return process.argv[index + 1];
}

async function main() {
  if (process.argv.includes("--identity")) {
    console.log(JSON.stringify(controllerIdentity(), null, 2));
    return;
  }
  const cardPath = resolve(valueAfter("--card"));
  const raw = JSON.parse(await readFile(cardPath, "utf8"));
  const result = validateRouteCard(raw);
  console.log(JSON.stringify({ result: "valid", card: cardPath, cardSha256: result.cardSha256, controller: result.card.controller }, null, 2));
}

main().catch((error) => {
  console.error(`validate-route-card: ${error.message}`);
  process.exitCode = 2;
});

