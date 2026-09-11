---
status: approved
slug: pr3-taverna
---

# Integrate PR #3 — Lucas's tavern composition

## Objective

Resolve feat/herois-na-taverna against main while preserving Lucas's authored art and positions, the current conversation system and truthful narrative status.

## Scope and authority

The user approved the product dispositions in [ADR-001](adrs/adr-001.md). This incremental record supersedes no historical implementation evidence. PR input: b50e27593777d6310959b1a4d6375d48ba324ff0; main input: ee70f87a6c8bd3b054cd10ed6a878d3e9c514668. The canonical GDD owns product status; [verification](verification.md) owns current checks and limitations.

- RQ-001: preserve all 16 image payloads, all CE38 positions/scales and the authored Gorvak entrance, with separate filenames for tavern-stage art and dialogue portraits.
- RQ-002: retain main's focus, continuous hero/Ivaí conversation, native reconstruction and helper ownership. Repair CE38 conditional indentation. Preserve all other main events, plugins, assets, scene transitions and campaign rules.
- RQ-003: label all 32 initial hero sections provisional without changing any spoken text. Editorial review remains pending.
- RQ-004: record a new native revision and updated asset inventory through the existing tool; do not bypass old-save rejection or alter save schema.

## Exclusions

Narrative rewriting, new focus behavior, new dependencies, changes to vendor plugins, final-art approval, commit and remote publication are outside this local resolution.

## Technical design and lifecycle

CommonEvents.json is resolved structurally from main, importing CE38 and Gorvak's authored entrance settings from the PR. Slot 60 replaces the PR experiment's Picture 1; the installed position function gives the explicit x=200/y=725 base at the project's 1280×720 internal resolution. Main's helpers 68–79 stay unchanged; empty/parallel experimental events 80–100 are not introduced. The eight seated art payloads get Dryland_Tavern_Hn names; original Dryland_Hn and hN-Name copies retain their bytes. No new state or interpreter owner is added. The existing native-revision policy may refuse older saves without deleting them.

The [one-off resolution script](resolve-merge.py) requires the frozen PR HEAD and MERGE_HEAD. It is a record of the merge, not a recurring authoring tool. Later edits belong in native events. [Programação](pr3-taverna.programacao.md), [Technical Art](pr3-taverna.technical-art.md) and [Narrativa](pr3-taverna.narrativa.md) own the affected surfaces; interaction/UI behavior is preserved by reference to main except for Lucas's authored positions.

## Acceptance

RQ-001 → V-001/V-003; RQ-002 → V-001/V-002/V-003; RQ-003 → V-001; RQ-004 → V-002. Product choices are resolved. Runtime and visual acceptance require their own evidence and are not implied by the interview.
