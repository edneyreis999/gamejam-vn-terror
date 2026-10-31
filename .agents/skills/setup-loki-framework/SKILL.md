---
name: setup-loki-framework
description: Set up Loki for this game or update its working policies. Maintains AGENTS.md, CLAUDE.md, and loki.config.json.
disable-model-invocation: true
---

# Setup Loki Framework

Configure Loki for this game and record how agents should work on the project.

## 1. Understand the project

Read the existing project instructions, `AGENTS.md`, `CLAUDE.md`, and `loki.config.json`, when present. Inspect enough of the game to understand its current state and conventions. A new, empty project is a valid starting point. Identify documented public interfaces and existing documentation-check commands. Discover applicable technology guidance from the project; an empty project need not have a CLI.

Read the [Loki instructions](assets/loki-instructions.md) to identify any conflicts with the project's existing rules.

## 2. Agree on working policies

Use [grilling](../grilling/SKILL.md) to resolve what is still unknown about:

- The game's stage, audience, next objective, and priorities.
- Information security, verification, and documentation needs.
- Content, saves, and integrations to preserve; what may be replaced.
- What agents may do within a task and which decisions belong to the user.

Reuse what the project and conversation already establish. Give concrete answer examples with each question, and follow up only where the answer affects how agents should work. On later runs, focus on requested changes and unresolved decisions.

Summarize the agreed policies in concise English. Resolve conflicts with existing instructions before recording changes; do not invent policies for unanswered questions. Clear answers need no additional approval to be recorded.

## 3. Save the configuration

Create or update these blocks in both root `AGENTS.md` and `CLAUDE.md`:

```markdown
<!-- loki:instructions:start -->
[Loki instructions, reconciled with agreed project decisions.]
<!-- loki:instructions:end -->

<!-- loki:project-profile:start -->
[The project's agreed context and working policies.]
<!-- loki:project-profile:end -->
```

In the project profile, record the applicable documentation-review policy, interface and maintained check command. If integration is missing, record that the first future task changing those descriptions owns it; setup only records this responsibility.

Keep corresponding blocks identical and update them in place. Preserve manual edits and surrounding instructions; resolve conflicting edits with the user. Create missing files as ordinary files. Preserve existing links and edit a shared target only once.

Create `loki.config.json` from the [default configuration](assets/loki.config.json) if absent. Preserve existing settings and unrelated fields; change persistent limits only when the user chooses them. Check validity using the bundled Loki instructions' slow-test configuration rules, resolving invalid configuration before changing it.

Read back the files to check that the blocks match, occur once, contain no placeholders, and reflect the agreed policies. Confirm that existing project instructions remain intact and the JSON is valid. Report the files changed and any unresolved issue.

Setup configures agent instructions and settings; it does not reorganize or modify the game.
