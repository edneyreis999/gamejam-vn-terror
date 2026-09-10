---
name: rpg-maker-mz-qa-execution
description: Executes directed RPG Maker MZ QA. Use when planned scenarios must be walked or defects reproduced through the real game. Don't use for QA planning, replacing unit tests, or approving human judgments.
---

# RPG Maker MZ QA Execution

## 1. Resolve the execution contract

Read project instructions, the current scenario and its verification row. Resolve
IDs, expected effects, variants, assigned sensors, evidence dependencies and
later authorized scope changes. Use `directed-browser` for browser gameplay.
An external independence requirement is not satisfied by directed execution;
record the incompatibility instead of claiming an independent replay.

Done when: the current scope and each required sensor have an owner.

## 2. Prepare and execute

When execution_mode is directed-browser, read
[references/directed-browser-regression.md](references/directed-browser-regression.md)
in full before browser input. When project integration is absent or incomplete,
read [references/project-integration.md](references/project-integration.md) in full
before preparation. Resolve this skill's scripts by its installed location.
Helper roles: dependency installation is bootstrap; directed-browser.mjs mutates
only the isolated QA runtime/output; capture and inspection are reads. On script
failure preserve the run and follow the recovery branch in the directed reference.
For non-browser sensors, use the project's declared interface and assigned proof.
Honor a user's pause before browser launch, including smoke tests.

Done when: every selected criterion has evidence or a concrete pending/failure state.

## 3. Record the outcome

Update the existing QA run, scenario and verification owners with the collected
proof, retained dependencies, failures and next action. Separate collection from
visual inspection and human acceptance. Stop owned resources on every exit.

Done when: claims link to evidence and resource cleanup is recorded.
