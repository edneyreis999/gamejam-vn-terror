#!/usr/bin/env node
// Read-only grammar check of every event command list: Common Events, map events, troop pages.
// Usage: node check-event-lists.mjs <project-root>
// Exit: 0 clean, 1 findings, 2 usage or unreadable project.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Report, readJson, requireProject } from "./lib.mjs";

const root = requireProject(process.argv[2]);
const report = new Report();
const data = (name) => join(root, "data", name);
const readIf = (name) => (existsSync(data(name)) ? readJson(data(name), report) : undefined);

const OPENERS = { 111: [411, 412], 112: [413], 102: [402, 403, 404], 301: [601, 602, 603, 604] };
const MIDDLES = { 411: 111, 402: 102, 403: 102, 601: 301, 602: 301, 603: 301 };
const CLOSERS = { 412: 111, 413: 112, 404: 102, 604: 301 };
const CONTINUES = { 401: [101, 401], 405: [105, 405], 408: [108, 408], 655: [355, 655], 657: [357, 657] };
const AUDIO = { 241: "bgm", 245: "bgs", 249: "me", 250: "se" };

const commonEvents = readIf("CommonEvents.json") ?? [];
const retired = new Set();
commonEvents.forEach((ce, i) => {
  if (ce && ce.name === "" && Array.isArray(ce.list) && ce.list.length === 1 && ce.list[0].code === 0) retired.add(i);
});
const audioExists = (channel, name) =>
  ["ogg", "m4a"].some((ext) => existsSync(join(root, "audio", channel, `${name}.${ext}`)));

function checkList(where, list) {
  if (!Array.isArray(list) || list.length === 0) return report.error(where, "command list is missing or empty");
  const last = list[list.length - 1];
  if (last.code !== 0 || last.indent !== 0) report.error(where, "list must end with {code: 0, indent: 0}");
  const labels = new Set(list.filter((c) => c.code === 118).map((c) => c.parameters[0]));
  const stack = [];
  list.forEach((cmd, i) => {
    const at = `${where}[${i}]`;
    const prev = list[i - 1];
    if (!Number.isInteger(cmd.indent) || cmd.indent < 0) report.error(at, `invalid indent ${cmd.indent}`);
    if (prev && cmd.indent > prev.indent + 1) report.error(at, `indent jumps from ${prev.indent} to ${cmd.indent}`);
    if (!Array.isArray(cmd.parameters)) report.error(at, "parameters must be an array");

    // Battle Processing only opens a block when a result branch (601-603) follows it.
    const next = list[i + 1];
    const opens = cmd.code === 301 ? next && [601, 602, 603].includes(next.code) && next.indent === cmd.indent : OPENERS[cmd.code];
    if (opens) stack.push({ code: cmd.code, indent: cmd.indent, at });
    else if (MIDDLES[cmd.code]) {
      const top = stack[stack.length - 1];
      if (!top || top.code !== MIDDLES[cmd.code] || top.indent !== cmd.indent) report.error(at, `code ${cmd.code} has no matching ${MIDDLES[cmd.code]} at indent ${cmd.indent}`);
    } else if (CLOSERS[cmd.code]) {
      const top = stack.pop();
      if (!top || top.code !== CLOSERS[cmd.code] || top.indent !== cmd.indent) report.error(at, `code ${cmd.code} has no matching ${CLOSERS[cmd.code]} at indent ${cmd.indent}`);
    }
    if (CONTINUES[cmd.code] && !(prev && CONTINUES[cmd.code].includes(prev.code))) {
      report.error(at, `code ${cmd.code} must follow ${CONTINUES[cmd.code].join(" or ")}`);
    }
    if (cmd.code === 119 && !labels.has(cmd.parameters[0])) report.error(at, `jump to missing label "${cmd.parameters[0]}"`);
    if (cmd.code === 121) {
      const [start, end] = cmd.parameters;
      if (start > end) report.error(at, `switch range ${start}..${end} is inverted`);
      else if (start !== end) report.warn(at, `Control Switches sets a range ${start}..${end}; a single switch is [id, id, op]`);
    }
    if (cmd.code === 117 && retired.has(cmd.parameters[0])) report.error(at, `calls retired (empty) Common Event ${cmd.parameters[0]}`);
    if (cmd.code === 117 && !commonEvents[cmd.parameters[0]] && cmd.parameters[0] !== 0) report.error(at, `calls missing Common Event ${cmd.parameters[0]}`);
    if (AUDIO[cmd.code]) {
      const name = cmd.parameters[0]?.name;
      if (name && !audioExists(AUDIO[cmd.code], name)) report.error(at, `audio/${AUDIO[cmd.code]}/${name} (.ogg or .m4a) is missing`);
    }
  });
  for (const open of stack) report.error(open.at, `code ${open.code} is never closed`);
}

commonEvents.forEach((ce, i) => ce && checkList(`CommonEvents.json[${i}].list`, ce.list));
for (const info of readIf("MapInfos.json") ?? []) {
  if (!info) continue;
  const file = `Map${String(info.id).padStart(3, "0")}.json`;
  const map = readIf(file);
  for (const event of map?.events ?? []) {
    if (!event) continue;
    event.pages.forEach((page, p) => checkList(`${file} event ${event.id} page ${p + 1}`, page.list));
  }
}
for (const [i, troop] of (readIf("Troops.json") ?? []).entries()) {
  if (!troop) continue;
  troop.pages.forEach((page, p) => checkList(`Troops.json[${i}] page ${p + 1}`, page.list));
}

process.exit(report.finish("check-event-lists"));
