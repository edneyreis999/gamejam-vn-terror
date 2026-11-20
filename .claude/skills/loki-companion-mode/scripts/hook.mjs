#!/usr/bin/env node
// Companion mode hook, shared by Claude Code and Codex (same stdin/stdout JSON contract).
// Toggle: whole prompt "companion on" / "companion off". Release: the model runs `echo COMPANION_OFF`
// when the user says to proceed; this hook sees that exact command and turns the mode off.
// State is per session in ~/.loki/companion/<session_id>.json.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const OFF_CMD = 'echo COMPANION_OFF';
const REMINDER =
  'COMPANION MODE ON. The user prompt is a DRAFT, not an order: execute nothing and change nothing. ' +
  'Point out blind spots, check the project, recommend one option, restate what you would do. ' +
  `Only when the user clearly tells you to proceed, run the shell command \`${OFF_CMD}\` to turn the mode off, then execute. Never run it on your own.`;
const WRITE_TOOLS = new Set(['Edit', 'Write', 'MultiEdit', 'NotebookEdit', 'apply_patch']);
const SHELL_TOOLS = new Set(['Bash', 'exec_command']);
const READ_CMDS = new Set([
  'ls', 'cat', 'head', 'tail', 'wc', 'grep', 'rg', 'find', 'pwd', 'echo', 'which', 'diff', 'stat', 'du', 'cd', 'file', 'tree',
]);
const GIT_READ = new Set(['status', 'log', 'diff', 'show', 'rev-parse', 'ls-files', 'blame']);

const read = () => {
  try { return JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
};
const out = (obj) => { process.stdout.write(JSON.stringify(obj)); process.exit(0); };

const input = read();
const dir = join(homedir(), '.loki', 'companion');
const file = join(dir, `${String(input.session_id || 'default').replace(/[^\w-]/g, '_')}.json`);
const load = () => { try { return JSON.parse(readFileSync(file, 'utf8')); } catch { return null; } };
const save = (s) => { mkdirSync(dir, { recursive: true }); writeFileSync(file, JSON.stringify(s)); };

export function isReadOnlyShell(command) {
  if (typeof command !== 'string' || !command.trim()) return false;
  if (/[>`]|\$\(|<\(|\btee\b|\bsed\b.*\s-i|-delete|-exec|\bxargs\b/.test(command)) return false;
  return command.split(/&&|\|\||;|\|/).every((seg) => {
    const [cmd, sub] = seg.trim().split(/\s+/);
    if (!cmd) return true;
    if (cmd === 'git') return GIT_READ.has(sub);
    return READ_CMDS.has(cmd);
  });
}

function onPrompt() {
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
}

function onTool() {
  if (!load()?.on) return out({});
  const name = input.tool_name;
  if (SHELL_TOOLS.has(name) && input.tool_input?.command?.trim() === OFF_CMD) {
    rmSync(file, { force: true });
    return out({});
  }
  const blocked =
    WRITE_TOOLS.has(name) || (SHELL_TOOLS.has(name) && !isReadOnlyShell(input.tool_input?.command));
  if (!blocked) return out({});
  return out({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason:
        'Companion mode is on: do not change anything. Wait until the user clearly tells you to proceed.',
    },
  });
}

const event = input.hook_event_name;
if (event === 'UserPromptSubmit') onPrompt();
else if (event === 'PreToolUse') onTool();
else out({});
