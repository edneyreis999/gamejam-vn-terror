---
id: 03
status: completed
depends_on: [02]
verification_ids: [V-002, V-003, V-004, V-005, V-006]
---

# Task 03 — Execute QA and final verification

## Outcome and authority

Activate `rpg-maker-mz-qa-execution`, then `rpg-maker-mz-final-verify`. Execute the task-02 plan against [verification](verification.md), [script](prologo-rheed.narrativa.md) and the approved presentation/asset/integration contracts. Own V-002–006 exactly once; consume V-001 from task 01 without claiming fresh coverage if its dependencies changed.

## Scope and execution lots

| Lot | Entry and method | Criteria | Completion checkpoint |
| --- | --- | --- | --- |
| A — Opening | Clean New Game, directed-browser, S01 | V-002 and runtime composition inputs to V-004 | N01–N06 captured; Map003 reached once; eight heroes, no selectable Rheed |
| B — Controls and recovery | Task-01 baseline/new fixtures and naturally available checkpoints; directed-browser + canonical harness, S02–S04 | V-003 | HIDE/Settings/FAST and Continue checked; return to preparation without replay or attachment leak |
| C — Sound and human review | Title with nonzero sound settings, New Game and applicable Continue; listening/read-only observations, S05; human full-opening review | V-005, final V-004, V-006 | Silence/preparation sound verified; explicit human framing/editorial decisions recorded |

Retain mouse and keyboard, current supported native viewport variants, normal/reduced motion, all speaker states, baseline formation save versus increment saves. Do not add native zoom testing. Save fixtures must come from public player actions; observation is read-only. If no natural checkpoint captures a given box, record the limitation and exercise applicable controls there instead of fabricating a save.

## Checklist

- [x] Verify current content/asset hashes and local served build before each lot; use `npm start` per local-game-run guidance. Record URL/port, Chrome version, viewport, save provenance and input history.
- [x] Prove exact script and closing transition visually, including paired busts and speaker emphasis at N04–N06 and no reactions/coda after N06. Inspect existing tavern dialogue for effects of AttachedPictures activation.
- [x] Consolidate harness and live persistence evidence for V-003; report actual old-save compatibility without migrations, deletion or revision gates.
- [x] Listen/record audio; audio state or screenshots alone do not prove silence. Confirm preferences and subsequent tavern sound remain intact.
- [x] Request human narrative/framing acceptance on the delivered version; prior script approval is not runtime approval. Preserve explicit pending decisions if a reviewer is unavailable.
- [x] Register in-scope defects in existing discipline QA records, repair within approved scope, run the responsible checks and affected lots again. Supersede stale evidence; never relabel a failure as a pass.
- [x] Update verification flags only from evidence. Final verification checks every selected sensor and open dependency before any readiness claim.
- [x] Preserve the devlog moment: narrator → paired dialogue with young question → Ivaí answer → preparation. Audio-capable recording is required to demonstrate silence.
- [x] Stop only session-owned server/browser resources; preserve required evidence and saves. No automatic commit, publication or remote messages.

## Evidence and invalidation

Store lot results under `docs/qa/evidence/prologo-rheed/task-03/` and append the cycle report in `docs/qa/reports/`. Retain completed lots and resume from recorded entry checkpoints. Native events, reading plan, plugins, art, audio settings or fixture changes invalidate the affected lot. Pure documentation fixes do not justify rerunning unrelated gameplay.

Delete targets: none. Allowed game changes are only in-scope repairs, with their tests and fresh evidence. If required art or human acceptance is missing, report the exact remaining gap rather than shipping a substitute or declaring readiness.

## Historical execution notes

Started 2026-09-17. A1–A4 and B current-save/return runs collected; logical checks pass after correcting the case’s save comparison boundary. Visual inspection failed on intermittent bust/name disappearance; bug and failed attempts preserved in the cycle report. WAV audio collected, no human listening/editorial/framing acceptance. Old formation save unavailable. All owned runner resources closed. Status remains in_progress for visual diagnosis/repair and remaining sensors. No production changes, commit or publication.


Diagnostic update, 2026-09-17: the visual report was refuted by direct PNG comparisons and closed as a preview-inspection false positive; production rendering is unchanged. Fixed the QA Options-return input handshake and retained original failed evidence. The cycle report and verification.md own retest results. Task remains in_progress for genuine old-save coverage and human listening/framing/editorial sensors, not for the withdrawn visual defect.


User refinement after Chrome/MZ review: existing tavern backdrop for Ivaí and young Rheed, black for older Rheed. Implemented as one native Show Picture command in Map002; the one-time `tavern-background.mjs` verifies the exact structural change and nine-box background sequence. The maintained directed case observes picture 1 alongside portraits. Updated canonical GDD and active presentation contracts; v5.0 remains unchanged. Fresh presentation runs are recorded in verification.md and the cycle report.


Paired bust update: user supplied Reed-novo.png, retiring the text-only fallback. Implemented two portraits with active-speaker emphasis and cleanup; IT-004 and directed A1/A4 passed. New composition human review and remaining task-wide sensors are separate; see verification.md for current evidence and retained gaps.


Follow-ups explicitly deferred by the user: refine bust fitting against the dialogue box and the background of older Rheed’s narration. Do not implement either while closing this update. Keep current visuals and consult GDD section 27.4 for the scope boundary; unrelated outstanding verification retains its existing status.


## Final status

Completed within the user-approved scope: A1–A4 and current-save recovery passed; human audio confirmed; current presentation accepted with two deferred refinements. Old-save compatibility explicitly excluded by user. See verification.md for the final verdict, evidence, retained limits and selected delivery material. No commit or publication.
