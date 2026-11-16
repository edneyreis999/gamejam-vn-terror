---
name: game-create-known-issues
description: Create and maintain known-issue records of game work the user deferred, under docs/known-issues, with status kept in step with the specs that address them. Covers writing and status maintenance, not deciding to defer, recording defects, or specifying or implementing the work.
---

# Game Create Known Issues

A known issue records future work the user decided to defer: uniformity left after a shared-pattern change, a postponed part of a feature, a limitation, an idea, or an investigation. It preserves why the work was deferred and what a later spec must know, so the work can be resumed without rediscovering it. It is not a spec, a defect report, or a task tracker, and it authorizes no implementation.

Create a record only from a user decision: an entry of a spec's Known Issues to Record (reached through its delivery task), or a user's request in any conversation. When a deferral surfaces without a request, suggest recording it and let the user decide. A reproduced defect is not a known issue.

## Locate the records and inputs

Read applicable project instructions, the source of the deferral (the spec entry and its spec, or the conversation decision), and the files that show the current state. Use `docs/known-issues/` at the project root.

Read the collection index before writing. When an existing record already covers the same gap, update it instead of creating a duplicate.

Use the decision already supplied. Ask only about a missing or conflicting fact that prevents an accurate record; never invent the reason, the trigger, or the desired outcome.

## Create a record

Read [the known-issue template](references/known-issue-template.md) in full and use it. Name the file `KI-NNN-<descriptive-slug>.md`, starting at `KI-001` and incrementing the highest existing number. Recheck the directory before assigning a number; never reuse one or overwrite another record.

Write one coherent gap per record. Write in English, keeping player-facing text in the game's language.

- Record the user's deferral decision with its date and source, and state what the record does not authorize.
- Describe the current state as a dated snapshot with evidence paths. Name components, functions, or settings, not line numbers; the resuming spec rechecks them.
- State the desired outcome as behavior or uniformity, without implementation design, alternatives analysis, test plans, or schedules. Those belong to the spec that resumes the work.
- When the record comes from a spec, link the spec in `origin`. The spec already names the record in Known Issues to Record.

## Maintain status

The body always states the current situation. Edit it in place and add one dated line to History for each substantive change. Never stack update notices at the top of the document.

| Status | When | Also record |
| --- | --- | --- |
| `open` | Created; no approved spec addresses it | — |
| `planned` | An approved spec addresses all or part of it | Link the spec in `addressed_by` |
| `resolved` | The addressing spec's delivery landed and nothing remains | Keep the link; History names the delivery |
| `dropped` | The user decided the work will not be done | The user's reason and decision source |

When a spec addresses only part of the gap, its delivery narrows the body to what remains and returns the record to `open`, keeping the spec in `addressed_by`; History records which part went to which spec. A resolved or dropped record stays in the collection as history.

Status changes follow the addressing spec's own lifecycle: set `planned` from the spec's approval and `resolved` from its delivery, normally as the task item that lands it. Do not assign owners, deadlines, or tracker items.

## Keep the collection discoverable

Maintain the collection index as `docs/known-issues/AGENTS.md`, with a synchronized `CLAUDE.md` of identical content, so agents auto-load it. Keep it thin: one line per record with its ID and title link, status, created date, and addressing spec. The record owns the full account.

## Check the collection

Verify unique IDs, working local links, that the index matches each record's frontmatter, and that every `planned` or `resolved` status agrees with the linked spec. Report the created or updated paths and any unresolved fact or mismatch.
