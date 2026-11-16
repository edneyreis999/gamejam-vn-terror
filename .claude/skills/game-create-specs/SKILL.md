---
name: game-create-specs
description: Write or update a requested game spec for one deliverable increment (feature, content, or playable slice) through a two-stage interview and applicable companion files. Not a prerequisite for ordinary fixes; does not plan tasks or implement.
---

# Game Specs

Use for a requested specification, not as a prerequisite to an ordinary fix. A spec covers one deliverable increment with an observable outcome; the whole-game vision belongs to a GDD, which this skill does not create. Author `_spec.md` and its applicable companions under `planos/tasks/<slug>/`, in English; player-facing text keeps the game's language.

A spec states intent, scope, behavior, necessary content, decided constraints, and acceptance. It may name a responsibility that programming must fulfill, but never contains code, function or class signatures, algorithms, complete data layouts, file-by-file plans, or code-level test design.

1. Reuse the user's decisions, prior specs, and current research. Read project instructions, the GDD, decision records, postmortems, the known issues the request touches (`docs/known-issues/`), and the game files relevant to the request. Load the best-practices skill for each technology the project uses when one is available; it supplies the capability facts, conventions, and hazards the interview and Part II depend on. Research references outside the project only for a design uncertainty or an explicit request.
2. **Stage 1 — Product.** Interview with [the interview protocol](references/interview-protocol.md). Write Part I of `_spec.md` from [the spec template](references/spec-template.md) and `_user_stories.md` from [the user stories template](references/user-stories-template.md). Ask the user to confirm Stage 1 before Stage 2; an already-approved direction satisfies this checkpoint.
3. **Stage 2 — Surface and Technical.** Continue the interview for surface and technical choices. Write each applicable companion, then Part II. Record capability evidence, every shared-pattern change, authoring locations, and the user's choice on each of them.
4. Write verification proportional to the changed behavior: `_tests.md` for checks that need no human judgment, `_playtest.md` for what a person executes. Before approval, present the plan's proportionality choice as the interview protocol's Verification proportionality section describes.
5. Self-check the package once before presenting it:
   - Part I, Part II, and companions agree; IDs referenced across files exist.
   - Every `US-NNN`, `AC-N`, and `EC-N` is owned by a `V-NNN`, `PT-NNN`, or `PH-NNN`, or carries a one-line reason none is needed.
   - Every capability claim cites its evidence or is marked unknown.
   - Every capability gap, custom-code choice, shared-pattern change, and authoring authority has the user's recorded decision.
   - Scope matches the user's decisions: nothing wanted was silently dropped, nothing unrequested was added.
   - Unresolved decisions are listed in Open Questions.
6. Save the files, present them, and summarize unresolved decisions. Offer the optional `game-spec-review`, for the draft or the approved spec; run it only if the user asks. Set `status: approved` only on the user's explicit approval, recording its date and words, and mark each Known Issues Addressed record `planned` with `game-create-known-issues`. After approval, offer the optional `game-create-game-tasks` to plan the delivery as a task graph; run it only if the user asks, since a small increment can be implemented directly. Do not start implementation because spec writing is complete.

| Companion | Write it when | Template |
| --- | --- | --- |
| `_execution-metrics.md` | The user requests execution instrumentation; reference [spec-execution-metrics](../spec-execution-metrics/SKILL.md), without starting collection during authorship | [activation companion](references/execution-metrics-template.md) |
| `_user_stories.md` | Always; it is the canonical behavior catalog | [user-stories-template](references/user-stories-template.md) |
| `_uiux.md` | Screens, menus, HUD, controls, or player feedback change | [uiux-template](references/uiux-template.md) |
| `_dx.md` | An author- or developer-facing surface changes: editor commands and parameters, tools, delivered instructions | [dx-template](references/dx-template.md) |
| `_content.md` | The increment needs text, images, audio, maps, or other content to be authored or replaced | [content-template](references/content-template.md) |
| `_tests.md` | Any behavior can be checked without human judgment | [tests-template](references/tests-template.md) |
| `_playtest.md` | A person must execute a check or judge the experience | [playtest-template](references/playtest-template.md) |

Templates are section guides: omit sections that do not apply instead of filling them. Read each template when its companion is written, not the whole package up front.

## Updating a spec

Before the increment is delivered, edit only the affected sections and companions and add a dated entry under `Amendments` stating what changed and why; a bounded experiment the user authorizes is recorded the same way. Behavior requested after delivery is a new spec with its own slug that cites the delivered spec as its baseline; never rewrite a delivered spec's history.

Resolve missing or contradictory inputs from the user's decisions and project instructions. Report a genuinely blocking missing decision instead of inventing it; narrowing an accepted Motivating Problem requires the user's recorded decision.
