---
id: "12"
status: completed
depends_on: ["10"]
verification_ids: []
supporting_verification_ids: [V-012]
---

# Task 12 — Apply live ME volume through the presentation layer

## Outcome

Changing Temas affects the currently playing ME, including mute, through a narrow presentation adapter while native events retain all cue selection and timing.

## Authority

- [Spec](spec.md): RQ-015.
- [Verification](verification.md): V-012.
- [audio contract](eventbridge-minimal-runtime.audio.md).
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F40.

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `Dryland_Presentation.js` (extend the already registered adapter from the reading/UI chain), `Dryland_EventBridge.js`; `data/CommonEvents.json` CE67 and native audio event consumers only where query/lifecycle migration needs correction; `js/plugins.js` Options settings if affected.
- Tests: `native-audio.mjs`; actual native AudioManager/buffer integration with existing audio helpers.
- Fixture and readiness owner: task 12. Own playing/stopped/replaced ME buffer and volume-setter fixtures, with native delegation/descriptor cleanup observations and no cue restart. Supply the audible context checklist for task 16.
- Data/assets: Preserve `audio/` files, cue identities, native volumes/fades and BGM/BGS/ME/SE routing from `rpg-maker/asset-provenance/audio.md`.
- QA/docs: Update current technical audio integration notes while preserving prior creative acceptance provenance.
- Delete targets: Remove Bridge's live-ME descriptor/playMe/stopMe/meVolume integration only as the bounded Presentation integration takes ownership.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Retain only the current native ME descriptor needed for live volume; preserve native playMe/stopMe delegation, clear on release/stop/replacement and never restart a cue when volume changes.
- [x] Keep CE67 driven by initialized scalar phase queries from task 01, without direct _dryland.campaign access or a second audio state machine.
- [x] Check BGM, BGS, ME and SE remain independent, preferences survive New Game/Options, and HIDE/FAST/Continue do not duplicate one-shot cues.
- [x] Capture technical buffer observations as integration evidence. Audible playback and human audio judgment remain explicitly pending for task 16; filenames or decoded buffers cannot pass them.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S11 directed-browser + audio observation (task 16); technical native integration produced here.

Required variants: ME active/stopped/replaced; nonzero→zero→nonzero volume; all four categories; Options return; HIDE; AUTO/FAST; Continue and context transitions.

Invalidates/reuses: AudioManager adapter hooks, provider/Options configuration and cue commands invalidate the relevant integration/audible evidence. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-012 | Owning canonical suites (command below); native/static/asset inspection as assigned above | The active ME buffer reacts to volume including zero; no restart, overlap, changed track or campaign mutation occurs. | `docs/qa/evidence/eventbridge-minimal-runtime/task-12/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Technical contribution completed on 2026-09-12. Moved the narrow current-ME descriptor lifecycle from Bridge to the existing Presentation adapter. Native AudioManager playMe/stopMe delegation and native meVolume setter remain unchanged; events still select cues/volumes/timing. CE67 continues to use initialized scalar phase queries. No audio file, provider or engine byte was modified.

PASS IT028/029: all four native categories begin at40%, clamp through real keyboard Options input and survive file selection/New Game; ambience context replacement has one playing BGS; native ending ME buffers decode and play separately. Changing ME volume nonzero→zero→nonzero preserves the same buffer, start time and creation count. HIDE also preserves that buffer. Explicit native ME replacement stops the old buffer; native empty-ME stop and natural completion both clear the descriptor; changing volume after stop creates/restarts no cue. Campaign facts remain unchanged by those isolated audio commands. The existing actual-provider reading and native Continue cue evidence from tasks09/11 remains technical context; task16 owns its audible checks against the integrated candidate.

Evidence: docs/qa/evidence/eventbridge-minimal-runtime/task-12/20260912/, including buffer observations, provider versions, captures, source/audio hashes and exact test logs. Updated asset-provenance/audio.md with the current ownership and audible context checklist while preserving historical acceptance provenance. Decoding, gain and playing-state observations do not prove audibility, perceived mix or artistic suitability. Those task16 sensors and V012 remain pending. No new cue, audio state machine, mixed-sensor approval or commit was introduced.
