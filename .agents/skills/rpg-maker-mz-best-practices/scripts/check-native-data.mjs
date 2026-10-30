#!/usr/bin/env node
// Read-only check that an MZ project's data keeps the shapes the editor writes and the engine reads.
// Usage: node check-native-data.mjs <project-root> [--title-map <mapId>]
// Exit: 0 clean, 1 findings, 2 usage or unreadable project.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { Report, parseArgs, readJson, readPlugins, requireProject } from "./lib.mjs";

const { positional, flags } = parseArgs(process.argv.slice(2));
const root = requireProject(positional[0]);
const report = new Report();
const data = (name) => join(root, "data", name);

// Databases addressed by position: index 0 is null, every other slot is an object whose id equals its index.
const DATABASES = ["Actors", "Animations", "Armors", "Classes", "CommonEvents", "Enemies", "Items", "Skills", "States", "Tilesets", "Troops", "Weapons"];
for (const name of DATABASES) {
  const file = data(`${name}.json`);
  if (!existsSync(file)) continue;
  const rows = readJson(file, report);
  if (!Array.isArray(rows)) continue;
  if (rows[0] !== null) {
    const log = name === "CommonEvents" ? report.error : report.warn;
    log.call(report, `${name}.json[0]`, "index 0 should be null, as the editor writes it");
  }
  rows.forEach((row, i) => {
    if (i === 0) return;
    if (row === null) {
      // A null at index > 0 makes the editor list for this file appear empty (observed for Common Events).
      if (name === "CommonEvents") report.error(`${name}.json[${i}]`, "null slot; a retired Common Event is a native empty record");
      else report.warn(`${name}.json[${i}]`, "null slot at index > 0 (only Common Events are known to break the editor)");
    } else if (typeof row !== "object" || row.id !== i) {
      report.error(`${name}.json[${i}]`, `id must equal the array index (found ${row && row.id})`);
    }
  });
  if (name === "CommonEvents") {
    rows.forEach((row, i) => {
      if (!row) return;
      const list = row.list;
      if (!Array.isArray(list) || list.length === 0 || list[list.length - 1].code !== 0) {
        report.error(`CommonEvents.json[${i}]`, "list must end with a code 0 command");
      }
      for (const key of ["name", "trigger", "switchId"]) {
        if (!(key in row)) report.error(`CommonEvents.json[${i}]`, `missing field ${key}`);
      }
    });
  }
}

// MapInfos: null or {id === index}; every listed map has its file.
const mapInfos = readJson(data("MapInfos.json"), report) ?? [];
const mapIds = new Set();
mapInfos.forEach((info, i) => {
  if (info === null) return;
  if (info.id !== i) report.error(`MapInfos.json[${i}]`, `id must equal the array index (found ${info.id})`);
  mapIds.add(info.id);
  if (!existsSync(data(`Map${String(info.id).padStart(3, "0")}.json`))) {
    report.error(`MapInfos.json[${i}]`, `map file Map${String(info.id).padStart(3, "0")}.json is missing`);
  }
});

// System: start position and name tables.
const system = readJson(data("System.json"), report);
if (system) {
  const { startMapId, startX, startY } = system;
  if (!mapIds.has(startMapId)) report.error("System.json", `startMapId ${startMapId} is not a map in MapInfos.json`);
  else {
    const map = readJson(data(`Map${String(startMapId).padStart(3, "0")}.json`), report);
    if (map && (!Number.isInteger(startX) || !Number.isInteger(startY) || startX < 0 || startY < 0 || startX >= map.width || startY >= map.height)) {
      report.error("System.json", `start position (${startX}, ${startY}) is outside map ${startMapId} (${map.width}x${map.height})`);
    }
  }
  if (flags["title-map"] !== undefined && String(startMapId) === String(flags["title-map"])) {
    report.error("System.json", `startMapId ${startMapId} is the title map; New Game would re-enter the title`);
  }
  if (flags["title-map"] === undefined) {
    report.warn("System.json", "start map not compared with a title map; pass --title-map <id> when a title-map plugin is installed");
  }
  for (const table of ["switches", "variables"]) {
    (system[table] ?? []).forEach((value, i) => {
      if (typeof value !== "string") report.error(`System.json ${table}[${i}]`, `entries must be strings (found ${value === null ? "null" : typeof value})`);
    });
  }
}

// Plugins: files exist, nested JSON layers parse, number-list parameters use the editor's string items.
const plugins = readPlugins(root, report) ?? [];
const numberListNames = new Map(); // plugin name -> names declared `@type number[]` or `:arraynum`
for (const plugin of plugins) {
  const file = join(root, "js", "plugins", `${plugin.name}.js`);
  const names = new Set();
  numberListNames.set(plugin.name, names);
  if (!existsSync(file)) {
    report.error(`plugins.js ${plugin.name}`, `js/plugins/${plugin.name}.js is missing`);
    continue;
  }
  let lastName = "";
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const named = line.match(/^\s*\*\s*@(?:param|arg)\s+(\S.*?)\s*$/);
    if (named) lastName = named[1];
    if (/^\s*\*\s*@type\s+number\[\]\s*$/.test(line) && lastName) names.add(lastName);
  }
}

const isNumberList = (plugin, key) => key.endsWith(":arraynum") || numberListNames.get(plugin)?.has(key.replace(/:.*$/, ""));
function checkNumberList(where, value) {
  let items;
  try {
    items = JSON.parse(value);
  } catch {
    report.error(where, `number-list value is not JSON: ${value}`);
    return;
  }
  if (!Array.isArray(items)) report.error(where, `number-list value must be a JSON array: ${value}`);
  else if (items.some((item) => typeof item !== "string")) {
    report.error(where, `number-list items must be strings like ["5"], as the editor writes them (found ${value})`);
  }
}
function checkNested(where, key, value, plugin) {
  if (typeof value !== "string" || value === "") return;
  if (isNumberList(plugin, key)) return checkNumberList(where, value);
  if (/:struct|:arraystruct$/.test(key) || /:arraystr(uct)?$/.test(key)) {
    try {
      JSON.parse(value);
    } catch {
      report.error(where, `nested JSON value does not parse (${key})`);
    }
  }
}
for (const plugin of plugins) {
  for (const [key, value] of Object.entries(plugin.parameters ?? {})) {
    checkNested(`plugins.js ${plugin.name}.${key}`, key, value, plugin.name);
  }
}

// Plugin commands (357) in Common Events and maps: the same rule on their arguments.
function checkCommandList(where, list) {
  (list ?? []).forEach((cmd, i) => {
    if (cmd.code !== 357) return;
    const [plugin, , , args] = cmd.parameters;
    for (const [key, value] of Object.entries(args ?? {})) checkNested(`${where}[${i}] ${plugin}.${key}`, key, value, plugin);
  });
}
const commonEvents = existsSync(data("CommonEvents.json")) ? readJson(data("CommonEvents.json"), report) : [];
(commonEvents ?? []).forEach((ce, i) => ce && checkCommandList(`CommonEvents.json[${i}].list`, ce.list));
for (const id of mapIds) {
  const file = `Map${String(id).padStart(3, "0")}.json`;
  if (!existsSync(data(file))) continue;
  const map = readJson(data(file), report);
  for (const event of map?.events ?? []) {
    if (!event) continue;
    event.pages.forEach((page, p) => checkCommandList(`${file} event ${event.id} page ${p + 1}`, page.list));
  }
}

process.exit(report.finish("check-native-data"));
