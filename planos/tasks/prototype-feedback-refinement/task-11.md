---
id: "11"
status: completed
depends_on: ["07", "09", "10"]
verification_ids: ["V-010/TECH", "T-006/AUDIO"]
---

# Task 11 — Narrate eligible epilogues with continuous present-day audio

## Outcome

Deliver RQ-010 within the approved design. Only eligible heroes' unchanged prose is narrated by older Rheed, present music/ambience continues without applause and ends before credits, honoring preferences.

## Authority

Read [the shared execution contract](tasks.md#shared-execution-contract), [spec.md](spec.md) and [verification.md](verification.md) before editing. D-025 approves the design; this task does not replace its expected outcomes.

- [audio contract](prototype-feedback-refinement.audio.md).
- [narrativa contract](prototype-feedback-refinement.narrativa.md).
- [technical-art contract](prototype-feedback-refinement.technical-art.md).
- [programacao contract](prototype-feedback-refinement.programacao.md).
- [uiux contract](prototype-feedback-refinement.uiux.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), including §28.
- [ADR-001 / D-025](adrs/adr-001-prototype-feedback-product.md) and [general ADRs G004–G006](../../../docs/adrs/README.md).

## Scope

- Implementation and data/assets (game-relative paths): Maps029–036.json; CommonEvents.json CE067/337 and CE040 to CE061/063 outgoing path; existing ending/epilogue eligibility queries. Reuse Reed final.png, audio/bgm/Town1.ogg and audio/bgs/People2.ogg; preserve Applause1 opening-only ownership.
- Canonical tests: `rpg-maker/tests/suites/endings.mjs`, `rpg-maker/tests/suites/content.mjs`, `rpg-maker/tests/suites/native-audio.mjs`, `rpg-maker/tests/suites/native-controls.mjs`, `rpg-maker/tests/suites/native-inventory.mjs`; existing `rpg-maker/tests/campaign.test.mjs` entry and manifest.
- Fixture and readiness owner: this task. Own eligibility/source/audio fixtures covering first/consecutive/last epilogue, absence of eligible heroes and actual saved boundaries. Directed endings use task-09/10 own campaign provenance, with no borrowed saves.
- QA/docs: maintain this task's evidence and implementation notes; hand off public entry steps, expected observations and candidate/save freshness to task 12. Task 13 owns final directed/visual/human closure.
- Delete targets: No image/audio file deletion. Retire active Dryland_EpilogueH* display commands only after reference inspection; preserve unrelated ending images.

## Checklist

- [x] Compare all eight existing PR #15 epilogue texts with the approved sources; preserve punctuation, order and living-climax eligibility, excluding reserves.
- [x] Replace active hero epilogue illustrations with the task-02 older-Rheed framing on black and standard lower native dialogue, identifying Rheed as narrator.
- [x] Extend CE067 to the actual epilogue phase/readings using Town1 45/100/0 and People2 25/100/0 before player volume settings; no applause, new track or voice work.
- [x] Preserve same-context continuity across eligible heroes, HIDE/Options/FAST and muted settings; distinguish normal buffer recreation on Continue from an unwanted uninterrupted restart.
- [x] At CE061 entry after the last eligible epilogue, stop outgoing BGM/BGS before credits; do not stop between hero maps or alter the existing ending ME treatment.
- [x] Prove source/eligibility and audio-state transitions including no-epilogue paths; prepare S-004 entry, consecutive-hero and final-exit recordings for separate visual/listening acceptance.
- [x] Run only the assigned canonical checks and inspect the meaningful pre-change signal; record actual selected case IDs and outcomes.
- [x] Record changed files/event IDs, evidence, remaining live checks and affected devlog capture in this file; reconcile the graph and verification ownership without claiming another task's evidence.

## Validation

Execution mode/reference: T-001 source; T-006/AUDIO; S-004. Technical fixtures run through the local Node/native harness. Any directed preparation uses only validated player input and read-only observations; its final acceptance belongs to task 13.

| Primary verification IDs | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-010/TECH, T-006/AUDIO | Source comparison and the assigned canonical Node/native cases selected from T-001–007; use the shared command contract and record exact IDs | Only eligible heroes' unchanged prose is narrated by older Rheed, present music/ambience continues without applause and ends before credits, honoring preferences. | `docs/qa/evidence/prototype-feedback-refinement/task-11/<run>/`; durable receipt here, with hashes and actual results |

Invalidates/reuses: Epilogue prose, eligibility, staging, CE067/061, cues, volume handling, saved continuation or outgoing path changes invalidate affected proof. Reuse only compatible, hash-recorded evidence. Fixture success does not satisfy any `V-xxx/LIVE` criterion. The corresponding LIVE requirements remain pending under task 13.

## Completion boundary

This task completes its implementation and assigned technical criteria, including a concrete recipe that makes the public effect observable. It does not wait for task 13's separate live/human criteria, and it must not mark the aggregate V requirement passed early. A real missing implementation or failed technical criterion stays open; transferring an obligation is not completion.

## Execution notes

Active 2026-09-25. [apply-task-11.mjs](apply-task-11.mjs) replaces the active epilogue illustrations in Maps029–036 with Dryland_Black plus the task-02 Reed final bust (upper-left, 82.142857%, x472.428571/y40); every Show Text speaker is Rheed and all original prose commands remain unchanged. CE67 includes the actual epilogue phase in Town1 45/100/0 + People2 25/100/0. CE61 stops BGM/BGS before credits. CE337 clears 60–70 so the narrator cannot remain on the outgoing stage. Ending ME ownership and eligibility are untouched; no image/audio file was removed.

IT-073 baseline `2026-09-25T17-42-32-732Z` failed with Gorvak rather than Rheed as speaker. In the integrated lot `2026-09-25T17-43-30-091Z`, IT-090 and UT-035 passed: same native buffers/start times through three heroes, HIDE/Options/blocked unseen FAST/mute, actual Continue recreation, no applause and BGM/BGS cleanup for eligible/no-epilogue/total-loss paths. The unchanged four-outcome replay IT-048 hit its historical 300-second deadline while still progressing through the newly expanded memorial boxes; preserve that timed-out run, increase only this case's bounded deadline and repeat. IT-073's complete eight-hero/normal/reduced matrix is still running. No final technical completion yet.

Viewed the first native epilogue frame: older Rheed is centered on black with full head/upper body, the lower box and advance indicator fit, and the unchanged Gorvak prose is narrated under Rheed's name. This is technical fixture inspection; public end-to-end, audio listening and human acceptance remain task 13.

Technical scope completed 2026-09-25. IT-073 passed all eight heroes in normal/reduced modes (231 seconds); IT-090 passed native audio continuity/restoration/cleanup and UT-035 passed source eligibility. IT-048 passed its four saved-outcome replay (1/1, exit 0, 279.9 seconds) with the bounded 420-second deadline. The intervening change affected only that test deadline; the other three receipts retain identical runtime. [Consolidated receipts](../../../docs/qa/evidence/prototype-feedback-refinement/task-11/final/) preserve the timed-out run separately. Source comparison, scoped review and deslop found no additional runtime change necessary. Owned test processes closed. V-010/LIVE, listening and human acceptance remain task 13.
