#!/usr/bin/env node
// Companion mode hook, shared by Claude Code and Codex (same stdin/stdout JSON contract).
// Toggle: the model runs `echo COMPANION_ON` / `echo COMPANION_OFF` when it infers the user's intent
// (see SKILL.md); the exact prompts "companion on" / "companion off" remain as a deterministic shortcut.
// State is per session in ~/.loki/companion/<session_id>.json.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ON_CMD = 'echo COMPANION_ON';
const OFF_CMD = 'echo COMPANION_OFF';
const REMINDER =
  'COMPANION MODE ON. The user prompt is a DRAFT, not an order: execute nothing and change nothing. ' +
  'Point out blind spots, check the project, recommend one option, restate what you would do. ' +
  `Only when the user clearly tells you to proceed, run the shell command \`${OFF_CMD}\` to turn the mode off, then execute. Never run it on your own.`;
const WRITE_TOOLS = new Set(['Edit', 'Write', 'MultiEdit', 'NotebookEdit', 'apply_patch']);
const SHELL_TOOLS = new Set(['Bash', 'exec_command']);
const PLANS_DIR = join(homedir(), '.claude', 'plans');
const READ_CMDS = new Set([
  'ls', 'cat', 'head', 'tail', 'wc', 'grep', 'rg', 'find', 'pwd', 'echo', 'which', 'diff', 'stat', 'du', 'cd', 'file', 'tree',
  'cut', 'sort', 'uniq', 'tr', 'nl', 'jq', 'sed', 'awk', 'basename', 'dirname', 'realpath', 'readlink', 'printf', 'true',
]);
const GIT_READ = new Set(['status', 'log', 'diff', 'show', 'rev-parse', 'ls-files', 'blame']);
// Redirects that cannot write a real file: to /dev/null or fd duplication.
const SAFE_REDIRECT = /^(>>?\s*\/dev\/null|>&\d)/;

// Splits a shell command into segments (&&, ||, ;, |, newline) honouring quotes.
// Returns null when it finds anything that could write or run hidden code:
// a non-safe redirect, command substitution, process substitution or backticks.
function splitShell(command) {
  const segments = [];
  let current = '';
  let quote = null;
  for (let i = 0; i < command.length; i++) {
    const c = command[i];
    const rest = command.slice(i);
    if (quote === "'") {
      current += c;
      if (c === "'") quote = null;
      continue;
    }
    if (c === '\\') {
      current += c + (command[i + 1] ?? '');
      i++;
      continue;
    }
    if (c === '`' || rest.startsWith('$(')) return null;
    if (quote === '"') {
      current += c;
      if (c === '"') quote = null;
      continue;
    }
    if (c === "'" || c === '"') {
      quote = c;
      current += c;
      continue;
    }
    if (rest.startsWith('<(')) return null;
    if (c === '>') {
      const m = SAFE_REDIRECT.exec(rest);
      if (!m) return null;
      i += m[0].length - 1;
      continue;
    }
    if (rest.startsWith('&&') || rest.startsWith('||')) {
      segments.push(current);
      current = '';
      i++;
      continue;
    }
    if (c === ';' || c === '|' || c === '\n') {
      segments.push(current);
      current = '';
      continue;
    }
    current += c;
  }
  if (quote) return null;
  segments.push(current);
  return segments;
}

const unquote = (s) => s.replace(/^["']|["']$/g, '');

function isReadOnlySegment(segment) {
  const tokens = segment.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return true;
  const cmd = unquote(tokens[0]);
  if (cmd === 'git') return GIT_READ.has(tokens[1]);
  if (!READ_CMDS.has(cmd)) return false;
  const args = tokens.slice(1);
  if (cmd === 'find') return !args.some((a) => /^-(delete|exec|execdir|ok|okdir|fprint0?|fprintf|fls)$/.test(a));
  if (cmd === 'sed') return !args.some((a) => /^-[a-zA-Z]*i/.test(a) || a.startsWith('--in-place'));
  if (cmd === 'sort') return !args.some((a) => a === '-o' || a.startsWith('--output'));
  if (cmd === 'awk') return !/system\s*\(|getline|print[^;}]*[>|]/.test(segment);
  return true;
}

export function isReadOnlyShell(command) {
  if (typeof command !== 'string' || !command.trim()) return false;
  const segments = splitShell(command);
  if (!segments) return false;
  return segments.every(isReadOnlySegment);
}

export function isPlanFile(filePath) {
  if (typeof filePath !== 'string' || !filePath) return false;
  return resolve(filePath).startsWith(PLANS_DIR + sep);
}

function main() {
  const read = () => {
    try { return JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
  };
  const out = (obj) => { process.stdout.write(JSON.stringify(obj)); process.exit(0); };

  const input = read();
  const dir = join(homedir(), '.loki', 'companion');
  const file = join(dir, `${String(input.session_id || 'default').replace(/[^\w-]/g, '_')}.json`);
  const load = () => { try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return null; } };
  const save = (s) => { mkdirSync(dir, { recursive: true }); writeFileSync(file, JSON.stringify(s)); };

  const onPrompt = () => {
    const text = String(input.prompt ?? '').trim().toLowerCase();
    if (text === 'companion on') {
      save({ on: true });
      return out({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: REMINDER } });
    }
    if (text === 'companion off') {
      rmSync(file, { force: true });
      return out({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: 'Companion mode is OFF. Resume normal behavior.' } });
    }
    if (!load()?.on) return out({});
    return out({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: REMINDER } });
  };

  const onTool = () => {
    const name = input.tool_name;
    const command = input.tool_input?.command?.trim();
    if (SHELL_TOOLS.has(name) && command === ON_CMD) {
      save({ on: true });
      return out({});
    }
    if (!load()?.on) return out({});
    if (SHELL_TOOLS.has(name) && command === OFF_CMD) {
      rmSync(file, { force: true });
      return out({});
    }
    const isPlanWrite = WRITE_TOOLS.has(name) && isPlanFile(input.tool_input?.file_path);
    const blocked =
      (WRITE_TOOLS.has(name) && !isPlanWrite) || (SHELL_TOOLS.has(name) && !isReadOnlyShell(input.tool_input?.command));
    if (!blocked) return out({});
    return out({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason:
          'Companion mode is on: do not change anything. Wait until the user clearly tells you to proceed.',
      },
    });
  };

  const event = input.hook_event_name;
  if (event === 'UserPromptSubmit') onPrompt();
  else if (event === 'PreToolUse') onTool();
  else out({});
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
