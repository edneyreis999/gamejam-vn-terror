---
id: "02"
status: completed
depends_on: []
verification_ids: ["V-003/TECH"]
---

# Task 02 — Integrate the welcoming prologue and proportional narrator framing

## Outcome

Deliver RQ-003, RQ-004 within the approved design. All approved words and established facts are retained; no Ivaí/curse/medallion/plan spoiler or extra reaction is introduced. Reading completion occurs once at the intended boundary.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [narrativa contract](prototype-feedback-refinement.narrativa.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [uiux contract](prototype-feedback-refinement.uiux.md).
- [programacao contract](prototype-feedback-refinement.programacao.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): Map002.json/event001; affected Rheed/Ivaí commands in Map023.json and Maps037–044.json; CE263–265, CE302, CE352/353 in CommonEvents.json. Keep hero bust settings outside the scoped Rheed/Ivaí correction intact. Reuse Reed final.png, Reed-novo.png and Dryland_ivai.png.
- Canonical tests: `rpg-maker/tests/suites/content.mjs`, `rpg-maker/tests/suites/native-inventory.mjs`, `rpg-maker/tests/suites/native-controls.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own source reconstruction and existing message/event fixture updates. Record how each distinct portrait family is naturally reached; do not fabricate a directed screenshot by event jump.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No asset or file deletion. Replace only approved old prologue prose and affected framing commands.

## Checklist

- [x] Inventory actual present/past/visit/threshold/discovery/Council frames and preserve the historical accepted hero-specific coordinates as reference.
- [x] Transcribe the nine approved prologue blocks exactly. Keep six semantic passage IDs: first six narrated blocks grouped in order across the first three; retain the last three direct-dialogue passages and their exact final exchange.
- [x] Complete each passage only after its last box, preserve FAST/HIDE and player advancement, then enter preparation with no added coda.
- [x] Calibrate affected Rheed/Ivaí portraits proportionally above the measured message box, preserving side assignments, temporal treatment and reduced-motion entry. Record literal per-family framing for task 11 to reuse.
- [x] Compare reconstructed prose and inspect opening captions/staging for spoilers. Prepare representative scene entries and the frame inventory for V-004 in task 13.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-001; S-001/S-003/S-004 frame handoff; V-004 is owned by task 13. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-003/TECH | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | All approved words and established facts are retained; no Ivaí/curse/medallion/plan spoiler or extra reaction is introduced. Reading completion occurs once at the intended boundary. | `docs/qa/evidence/prototype-feedback-refinement/task-02/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Prologue text, native lists, semantic IDs, message dimensions or portrait geometry invalidate affected evidence. A shared asset does not prove all scene families. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

Technical scope completed 2026-09-25 via [apply-task-02.mjs](apply-task-02.mjs). Map002 contains the exact nine approved blocks, grouped 2/2/2/1/1/1 under the six original reading completions. The final exchange and no-coda transfer are unchanged. UT-076 reconstructs all words from the native messages against the approved spec and checks the semantic boundaries; **1 selected, 1 PASS**. Native IT-004 traversed the complete prologue, HIDE, temporal audio and single completion/return behavior: **1 selected, 1 PASS**, exit 0. IT-047 also passed the native inventory. [Technical evidence](../../../docs/qa/evidence/prototype-feedback-refinement/task-02/technical/) retains hash-bound receipts and current captures. The first IT-004 attempt exposed a missing boot guard in the updated test helper; checking window.$gameMessage before choice readiness corrected the fixture, without a gameplay change.

Older Rheed: uniform 82.142857% (460px high), upper-left origin at (472.428571,40), in Map002/023 and CE352/353. Direct-past young Rheed/Ivaí retained their proportional upper-left frames; current IT-004 captures show both faces above the message box. Hero-visit Ivaí retains the accepted X960/Y725 and 50/45 speaker/listener scales. Threshold/discovery CE263–265/302 and Council Map023 previously used Bust origin at Y454.664 with scale44%. The active plugin anchor is X0.5/Y0.6, so the earlier bottom-center/raw-top clipping interpretation was incorrect. These families now use the accepted proportional X960/Y725 scale50% reference; the reported clipping still requires final visual reproduction/verification. No other hero frame changed. Final representative rendered face measurements remain V-004/LIVE/T-007 under task 13, not an inferred acceptance from these coordinates.

The later threshold/Council changes do not affect the executed prologue/native reading path; retain IT-004 for that scope and rerun affected final framing sensors in task 13. Public frame entries: new campaign/prologue; each hero visit; departure threshold; earned second-map revelation; initial-route closure; naturally reached Council. Task 11 reuses the older-Rheed constants. Keep native source, scoped script and canonical tests; preserve user edits and all original artwork. No commit/remote action or owned process remains. V-003/LIVE and V-004 remain pending.
