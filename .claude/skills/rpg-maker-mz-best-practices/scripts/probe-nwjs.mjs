#!/usr/bin/env node
// Ask a running NW.js game what runtime it is on and whether it booted. Read-only.
// Launch the editor's NW.js yourself with remote debugging, then run this:
//   <path to nwjs> <project-root> --remote-debugging-port=<port>
// Usage: node probe-nwjs.mjs --port <port> [--out <file.json>]
// Exit: 0 booted past the title boot with no error printed, 1 reachable but not clean, 2 not reachable.
import { writeFileSync } from "node:fs";
import { parseArgs } from "./lib.mjs";

const { flags } = parseArgs(process.argv.slice(2));
const port = Number(flags.port);
if (!port) {
  console.error("usage: node probe-nwjs.mjs --port <port> [--out <file.json>]");
  process.exit(2);
}

const expression = `(() => ({
  versions: typeof process !== "undefined" ? { nw: process.versions.nw, chromium: process.versions.chromium, v8: process.versions.v8, node: process.versions.node } : null,
  userAgent: navigator.userAgent,
  hasOwn: typeof Object.hasOwn,
  arrayAt: typeof Array.prototype.at,
  scene: typeof SceneManager !== "undefined" && SceneManager._scene ? SceneManager._scene.constructor.name : null,
  mapId: typeof $gameMap !== "undefined" && $gameMap ? $gameMap.mapId() : null,
  errorPrinter: typeof Graphics !== "undefined" && Graphics._errorPrinter ? Graphics._errorPrinter.innerText : null
}))()`;

async function evaluate() {
  const targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
  const page = targets.find((t) => t.type === "page" && t.webSocketDebuggerUrl);
  if (!page) throw new Error("no debuggable page found");
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = () => reject(new Error("cannot open the debugging socket"));
  });
  const reply = new Promise((resolve) => {
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id === 1) resolve(message);
    };
  });
  socket.send(JSON.stringify({ id: 1, method: "Runtime.evaluate", params: { expression, returnByValue: true } }));
  const message = await reply;
  socket.close();
  if (message.result?.exceptionDetails) throw new Error(message.result.exceptionDetails.text);
  return message.result.result.value;
}

let result;
try {
  result = await evaluate();
} catch (err) {
  console.error(`not reachable on port ${port}: ${err.message}`);
  process.exit(2);
}
const text = JSON.stringify(result, null, 2);
console.log(text);
if (flags.out) writeFileSync(flags.out, `${text}\n`);
process.exit(result.errorPrinter ? 1 : 0);
