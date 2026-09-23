# Verification

## Expected reading

Each A1–A8 description displays exactly two complete pages in the current four-row window: first source paragraph; second source paragraph followed by the source question on a new line. All words are readable without clipping or overlap. The final acknowledgement reveals choices without selecting one. Reread returns identical pages and leaves the encounter unchanged. A fresh own checkpoint resumed through Continue reaches the candidate description. No progress is assigned by inspection.

## Result — 2026-09-22

**Technical delivery: PASS.** Implementation, static verification, directed runtime and agent visual inspection completed. **Human pacing acceptance: accepted** by the user after browser testing: “Nossa, bem melhor, pode aplicar essa mesma tecnica em todas as falas dentro das 3 dungeons.” This accepts the A description layout and authorizes a separate broader increment; it does not retroactively verify other scenes.

- A1/A2: six pages → two. A3–A8: five pages → two. Across eight descriptions: 42 → 16 acknowledgements, with exact source wording preserved.
- Opened all sixteen description screenshots and eight choice screens. No clipped prose, missing questions, overlap with controls, extra overflow pages or accidental approach selection observed. A1/A4/A6 final pages use four lines; the others use two or three.
- Existing MessageCore wrap/font/window retained (font 26, line height 36, window 1280×204); no six-line enlargement needed. Native choices, reread and checkpoint boundaries remain intact.
- Fresh isolated campaign with Gorvak/Elowen/Griznik, public keyboard actions, supported approaches through the physical and supernatural routes to the final route. First A4 was reread and resumed through Continue from this run's own native file 1. No prior campaign/save or injected state.

## Executed checks

```sh
python3 planos/tasks/trap-a-description-reading/reflow.py
python3 planos/tasks/revised-trap-prose-integration/integrate-prose.py --scope deaths
node --check planos/tasks/trap-a-description-reading/visual.mjs
git diff --check
DRYLAND_QA_PORT=18733 node .agents/skills/rpg-maker-mz-qa-execution/scripts/request-evidence.mjs --project . --request planos/tasks/trap-a-description-reading/request.json
```

All passed (browser collection exit 0, zero errors). The adapter lacks an evidence-reuse recipe, so the request followed its documented ordinary collection fallback; this is not a product defect. No receipt was published; the actual visual inspection is recorded in `agent-inspection.json` beside the report. Report status remains truthfully `executed-awaiting-review` as collected, with this later inspection recorded separately.

Local evidence: `docs/qa/evidence/trap-a-description-reading/runs/05746b97-c774-4978-9c4e-0202ec41c391/report.json`, `agent-inspection.json`, `A1-page-1.png` through `A8-page-2.png`, and `A1-choices.png` through `A8-choices.png`. These are ignored local artifacts, not dependencies for rerunning the case or available from a fresh clone. Chrome 153.0.8010.53, Node v22.23.2, macOS arm64; 1280×720, DPR 1; 85.5 seconds collection. All fixture runtime hashes matched the final live source after collection.

The `_textState` metric is null after native completion; it does not supply a geometry verdict. The actual screenshots and recorded page/choice traversal own fit and completeness. Human comfort is not established by those checks.

## Scope and candidate audit

Keep eight map edits: native runtime consumers; only description 101/401 bodies differ from the preceding integration. Keep the GDD addition and six files in this incremental spec: approved boundary, task/evidence ownership, reproducible transformation and directed scenario/request. Reflow validates all sixteen map objects, including unchanged choices/results and Pool B, against the previous integration plus the explicitly scoped transformation. Common Events verification passes unchanged. The historical integration's full-map verifier is a baseline-specific tool; use this increment's `reflow.py` for the current maps.

All other preexisting modified/untracked files belong to the preceding delivery or user work and are excluded from this increment's readiness claim. No engine, plugin, parameter, save schema, asset or dependency changes. Self-review/deslop found no incidental runtime changes or unnecessary abstractions. Existing reading IDs/query/ReadingEnd and reread control flow are preserved exactly; no index constants or state migration introduced. Broader outcome/death matrices and extra viewports are omitted by the concrete G006 rationale in [spec.md](spec.md), not reported as newly executed.

No staging, commits, remote publication or deletion. Devlog candidate: A1 page 2, showing threat and question together; raw captures retained locally. After the user accepted this layout, A1 pages 1/2 were copied and hash-verified to `docs/qa/deliveries/trap-a-description-reading/`, with a provenance manifest. Raw evidence remains local; no files were removed or published.

## Candidate runtime hashes

| File | SHA-256 |
| --- | --- |
| Map007.json | `7a51293e8f819c7cbbc33f02b00e33c11d908af28077ffa622f8a9873a942ce2` |
| Map008.json | `dad1608992ff64df3d5ae7e492a34adba6fa0ef85941692bf5c59b036829adcc` |
| Map009.json | `6cbaff6eaa35865c08503496da1e59d8f96073d0cf59bb8305a16ff2d9b2ce70` |
| Map010.json | `01a60f93dd81877b43e77c18dfd1ad37c41c443f19ccfc0e2ec441ad4766f6d0` |
| Map011.json | `03cfdcd6c502d329155c8ddb659956310d0499d1e130f883e6577652bfb7427a` |
| Map012.json | `ed8d9824010f1ce42c1c64adc3bf13e3159f72c5bb7a3a36c1a8adf92fd806f1` |
| Map013.json | `cb24f68c08051d9b2753503c7643c9d6def227c3f781df9f277ad6d8e931b88e` |
| Map014.json | `121f3838a945bf8f9d5f4aee6d1230b1260112ffa1cde74cdf131e74d798e45e` |

## Cleanup

Runner reports closed input, audio-capture, capture session, browser context, Chrome and fixture service. Port 18733 has no listener. The preexisting user-requested manual server on 18726 (Node PID 68911) and user browser were preserved; they are not QA resources for this run.
