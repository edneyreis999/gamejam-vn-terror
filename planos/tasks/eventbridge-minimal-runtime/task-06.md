---
id: "06"
status: completed
depends_on: ["05"]
verification_ids: []
supporting_verification_ids: [V-001, V-003, V-005, V-007, V-010]
---

# Task 06 — Show one-time tavern absences and a prepared-asset memorial

## Outcome

Dead heroes disappear once on return, and the one-screen memorial uses final framed derivatives and event-authored animation/captions instead of runtime cropping.

## Authority

- [Spec](spec.md): RQ-006, RQ-008, RQ-011.
- [Verification](verification.md): V-001, V-003, V-005, V-007, V-010.
- [technical-art contract](eventbridge-minimal-runtime.technical-art.md).
- [programacao contract](eventbridge-minimal-runtime.programacao.md).
- [uiux contract](eventbridge-minimal-runtime.uiux.md).
- [narrativa contract](eventbridge-minimal-runtime.narrativa.md).
- [Accepted decisions](adrs/adr-001.md), [direct native calls/default loading](adrs/adr-002.md) and [tavern preload](adrs/adr-003.md).
- [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), especially §26 over conflicting historical baselines.
- [Graph and shared execution rules](tasks.md) and [native project guide](../../../rpg-maker/README.md), whose superseded procedures must not override this increment.

Responsibility inventory: F20–F22.

## Scope

Bare project plugin filenames resolve under `rpg-maker/The Dryland Drowned/js/plugins/`; game-relative data/js/img paths resolve under `rpg-maker/The Dryland Drowned/`. Suite names resolve under `rpg-maker/tests/suites/` and paths beginning `helpers/` resolve under `rpg-maker/tests/`.

- Implementation: `data/CommonEvents.json` CE38, CE40 memorial routing, CE45 and CE58–60 (including splitting their memorial text into native callable units); `data/Map003.json`, `data/Map028.json`; death projection/bookkeeping consumers in Bridge/Rules and narrow preference access in `Dryland_Presentation.js` if needed.
- Tests: `memorial.mjs`, `native-death-context.mjs`, `formation.mjs`, `native-controls.mjs`; `helpers/closing-presentation.mjs` and labeled death fixtures.
- Fixture and readiness owner: task 06. Own 0/1/3/8 death native fixtures, first/later visits and interruption during fade. Record the source-to-derivative mapping, dimensions/hashes and visual 0/1/3/8 compositions; fixtures are not play-earned journeys.
- Data/assets: Create eight production-usable framed portraits in `img/pictures/` from current hero art, preserving source files. Inspect every `_drylandCrop` consumer, including panels/auxiliary images, and supply prepared assets/native composition for all of them.
- QA/docs: Update `rpg-maker/asset-provenance/README.md` and appropriate memorial provenance records with source/derivative identities; retain historical crop records as history. Lucas owns framing judgment; task 16 records acceptance.
- Delete targets: Remove crop rectangles, expanded-crop, ghost and custom crossfade renderer and every active dependent panel/portrait consumer in the same task. Remove only visual fade-consumption bookkeeping from domain state, preserving death facts and RNG.

## Checklist

- [x] Capture the relevant pre-change source/test/runtime signal and candidate inputs, keeping existing creative statuses and user edits.
- [x] Trace all active crop consumers before producing assets. Use the applicable image skill when generating/editing the derivatives; inspect source and output images and never deliver placeholder crops.
- [x] Author the memorial's prepared image choices, native positions/scale/opacity, graves, labels and accurate death/location captions from queries. Split CE58 content and replace CE40's memorial Present/Observe path and direct `$gameTemp._drylandMemorial?.ready` condition with the authored event/UI readiness path. Omit memorial at zero deaths.
- [x] Move presented-fade bookkeeping to native event/UI save state. Mark all applicable deaths presented before an interruptible fade begins, reset on New Game and never alter death eligibility.
- [x] Animate several absences simultaneously for one second with preparation still usable; leaving early cannot replay the effect, and reduced motion starts with empty positions.
- [x] Give memorial and absence effects explicit cleanup/lifetimes. Validate actual framing and one-screen composition separately from numeric/state assertions; do not promote unrelated provisional source artwork to final.
- [x] Produce the assigned technical evidence, update canonical case registration if changed, and record unexecuted sensors as pending.
- [x] Update this task's Execution Notes and status in `tasks.md`; update `verification.md` only for evidence actually produced. Do not close a mixed-sensor V-ID from a test result alone.

## Validation

Execution mode/reference: S05 and S10 visual death variants; S03 memorial authoring; S08 reduced motion.

Required variants: 0/1/3/8 memorial deaths; one/several simultaneous tavern deaths; first/later visit; leave mid-fade; immediate reduced-motion absence; surviving positions unchanged; Continue bookkeeping.

Invalidates/reuses: Death queries, event/UI fade state, art bytes, panel composition, captions and timings invalidate the corresponding observations and preload inputs. Historical PASS results are context only; a changed dependency requires fresh evidence.

This task is a technical evidence producer. Its supporting V-IDs are closed only by their primary owners in [Coverage](tasks.md#coverage), including task 16's remaining runtime/editor/visual/audio/human checks.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001, V-003, V-005, V-007, V-010 | Owning canonical suites (command below); native/static/asset inspection as assigned above | Dead heroes cannot be selected during a fade; absences happen once; all eligible graves/portraits/captions fit one screen; no runtime crop/ghost machinery remains. | `docs/qa/evidence/eventbridge-minimal-runtime/task-06/<run>/` |

Planned Node command; narrow the case pattern to this task's registered suite IDs during implementation:

```sh
node --test --test-name-pattern='UT-|IT-' rpg-maker/tests/*.test.mjs
```

Use the registered IDs from the named suites to narrow the planned command during development; do not invent IDs or add a parallel test entry. Task 14 owns the full canonical regression. Run `node --check` on changed project plugins and `git diff --check` as applicable.

Record command, exit status, current revision/dirty files, changed source/configuration/asset hashes and applicable Node/Chrome/engine/provider versions. Browser evidence also records effective viewport, zoom, motion preference, origin/profile and save provenance. Follow [local server guidance](../../../docs/_memory/local-game-run.md); native integration fixtures never count as directed player journeys.

## Execution Notes

Technical contribution completed on 2026-09-12. Native CEs 338–346 hold the nine memorial reading units; CE347 selects the authored cause. CE59 queries death facts and composes all portraits, frames and captions with native pictures, movements and waits. CE60 selects the prepared portraits. CE40 uses native switch 46 for readiness; no crop, ghost, custom crossfade renderer or private memorial-ready object remains. The eight source images were preserved; final derivatives, prompts, dimensions and hashes are recorded in rpg-maker/asset-provenance/eventbridge-memorial.json. Lucas’s framing judgment remains assigned to task 16.

CE348 records native absence switches 38–45 before applicable existing consequence/reward checkpoints, using fresh phase/reading queries. Presentation ArmEffect/TakeEffect only carries generic unsaved session tokens. CE38 calls CE349 cleanup and CE45 consumption; CE350 is the native 60-frame parallel cleanup, controlled by switch 47. All formation choice branches explicitly finish pending absence effects before another interaction. Dead heroes remain ineligible from the same stage, reduced motion leaves empty positions, Continue restores saved consumption without replay, and New Game resets native objects. Rules no longer contains presentedDeathIds or tavern_absence effects; death facts and RNG are unchanged. Variables 192–215 hold projected captions and switches 38–47 have contiguous named entries.

PASS: UT-030 and IT-009/010/011/013/055/056/057. Fixtures cover simultaneous deaths, fixed surviving positions, repeated return, interrupted fade, reduced motion, Continue, and 0/1/3/8 memorial deaths; the three-loss fixture uses legal pure-domain actions but is not directed player QA. Actual 1/3/8 screenshots were inspected. Visual inspection caught caption clipping despite passing numeric picture bounds; authored <br> breaks and font sizes fixed it. A final text-size sensor accounts for the native panel scale and padding. Other first failures retained in evidence were an unnamed switch-table gap and obsolete test oracles for metadata, revision rejection and provider WrapBreak codes. No historical save rejection gate was restored.

Evidence, commands, logs, per-case fingerprints, screenshots and current source/asset hashes: docs/qa/evidence/eventbridge-minimal-runtime/task-06/20260912/. All native fixtures use the isolated Chrome harness at 127.0.0.1:18726; no fixture is claimed as a play-earned journey. Syntax/diff checks passed. Remaining editor, player, viewport and human judgments belong to task 16; no mixed-sensor V-ID is closed and no commit was made.

