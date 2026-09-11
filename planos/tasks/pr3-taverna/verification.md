---
status: approved
implemented: true
static_verified: true
runtime_verified: false
human_accepted: true
release_ready: false
---

# Verification — PR #3 integration

## Final verify — 2026-09-11

**FAIL para a apresentação visual completa de V-003; PASS para preservação do merge e comportamento das interações.** Os retratos das conversas ficam ampliados/cortados; Elowen e Vaelith não aparecem nos quadros iniciais. O problema foi reproduzido também na main e está registrado em [BUG-20260911-tavern-portraits-offscreen](../../../docs/qa/bugs/BUG-20260911-tavern-portraits-offscreen.md). Não se trata de perda das imagens do Lucas. Nenhum asset, posição, escala ou plugin foi alterado durante este final verify.

O aceite humano anterior continua registrado. `runtime_verified` e `release_ready` permanecem false porque a inspeção visual agora encontrou um defeito, substituindo a pendência anterior de execução. Não há aprovação implícita de novo enquadramento ou de uma versão completa do jogo.

| ID | Requirement | Sensor | Expected result | Status |
| --- | --- | --- | --- | --- |
| V-001 | RQ-001/002/003 | Structured comparison and SHA-256 | Sixteen PR images preserved; CE38 coordinates/scales identical; main helpers/unaffected events and every spoken line preserved; 32 provisional sections | PASS — [preservation.json](preservation.json), comparison repeated on revision 02 |
| V-002 | RQ-002/004 | Content CLI and canonical focused tests | Valid native revision/content; focus and reconstruction invariants | PASS — fresh CLI; retained 73 pure cases and IT-067/069 |
| V-003 | RQ-001/002 | Directed browser and visual inspection | Authored layout visible; selection/cancel/conversation/re-entry preserve pictures and focus | Interactions and stage preservation PASS; conversation framing FAIL, inherited from main |

Current native revision: **mz-20260911-pr3-taverna-02**. Frozen PR HEAD: `b50e27593777d6310959b1a4d6375d48ba324ff0`; merge input/main: `ee70f87a6c8bd3b054cd10ed6a878d3e9c514668`. This assessment applies to those inputs; it does not claim that GitHub main was refreshed during final verification.

## Fresh evidence

- `node rpg-maker/tools/validate-content.mjs --json`: exit 0, `ok: true`, no errors on revision 02, Node v22.23.2. Local log: `.artifacts/pr3-conflict/final-verify/content.json`.
- Structured comparison reproduced exactly the approved changes: CE38 differs from Lucas only in filenames and corrected conditional indentation; CE5 keeps the agreed entry and coordinates; CE5–12 keep exact text/choices with 32 provisional sections. The remaining events, including helpers 68–79, match main. All sixteen PR image payloads and main's eight dialogue portraits are byte-identical to their sources. System.json differs from main only in the editor-generated versionId. No engine/vendor/plugin bytes differ from main.
- Directed production-copy run: `docs/qa/evidence/pr3-taverna/final-verify-2026-09-11T19-31-24-998Z/`. Chrome 153.0.8010.36, macOS, 1280×720, DPR 1, pt-BR, normal motion, fresh isolated browser storage, port 18729. Only public player input changed the campaign; observation APIs were read-only.
- Reused the canonical `bust-tavern` scenario: seven profile/conversation boxes for each of eight heroes, speaker/focus and unchanged campaign assertions, selection/removal and group-full feedback for all eight, plus HIDE on Gorvak/Ivaí. A local wrapper added explicit stage-coordinate assertions, Escape cancellation, mouse re-entry and return. The eight stage pictures remained at Lucas's coordinates and 35% scale. Slots 60–65 cleared after exit. Post-cancel and post-re-entry captures are pixel-identical.
- Collection exited 0 with no errors; all browser/context/service/input/audio resources closed. The runner correctly returned `executed-awaiting-review`. Agent inspection of the stage/return, all eight initial portraits, Gorvak/Ivaí and Elowen/Vaelith's next boxes produced the visual failure above; collection success was not promoted to visual approval.
- Main control: `docs/qa/evidence/pr3-taverna/baseline-2026-09-11T19-35-33-246Z/`. The isolated copy restored main's CommonEvents, System and native manifest; all other relevant runtime files and portraits were already byte-identical to main. Unused extra PR pictures remained present. Public-input replay of Gorvak, Elowen and Vaelith reproduced the framing defect with loaded, opaque, stationary sprites. Exit 0, no errors, all resources closed. The initial control run at `19-34-41-929Z` collected the same symptom but exited 1 because its verification result omitted required metadata; that failed run was preserved, the local sensor metadata corrected, and the control rerun.

The [selected captures and provenance](../../../docs/qa/deliveries/pr3-taverna/README.md) are available without the local archive. Raw reports bind complete fixture/source hashes, inputs, observations, browser environment and command. Entry environment sampling can precede canvas initialization; reviewed PNGs are 1280×720. This was directed automation, not a claim that a human persona executed the charter.

## Retained tests and source equivalence

Earlier execution in `.artifacts/pr3-conflict/test-project/`, on native revision 01:

- `node --test --test-name-pattern='^UT-(?!059)' rpg-maker/tests/campaign.test.mjs`: **73/73 passed**, no skips. UT-059 requires Chrome and was deliberately excluded from the pure run.
- `DRYLAND_QA_PORT=18729 node --test --test-name-pattern='^IT-0(67|69)' rpg-maker/tests/campaign.test.mjs`: **2/2 passed**, checking edited author position/scale, inserted text boxes, focus settings, Options and Continue. These cases use explicit fixtures; they do not prove production framing.

Final verification compared the isolated tested inputs to the current candidate: CommonEvents are semantically identical; System differs only in editor versionId; the canonical content suite and all 38 JavaScript files under the game js directory are byte-identical (41 compared files total). These results retain their original revision and scope; they were not rerun or represented as new executions. The manifest revision change was independently covered by the fresh content CLI and directed revision-02 run.

The initial pure run was 71/73: UT-071/074 still assumed main's Gorvak base x=320. Updating seven scalar expectations in the existing suite preserved the invariant that focus/recovery uses the authored base and configured listener offset: x=200, x=176 for offset 24, x=192 for offset 8. The accepted Position 0 maps to x=200 under the installed plugin settings. Scale/tone, edited-position fixtures, negative checks and save reconstruction assertions were retained. No behavior was weakened to satisfy a test.

Local historical logs remain `unit-tests.log`, `unit-tests-final.log` and `integration-tests.log` under `.artifacts/pr3-conflict/`; the isolated test captures remain in that archive. The original PR failed content validation with `unsupported_content_command/profile.H1`. An initial preservation-check allowlist omitted the expected hN-Name assets; fixing that local allowlist did not change the assets.

## Human acceptance and editor save — 2026-09-11

The user said: “aprovado. tentei agora no editor”. This is acceptance of the local conflict resolution after trying it in the editor. Exact manual steps, all-eight coverage, platform and save/reopen were not specified and are not inferred. Narrative remains provisional; final editorial/art acceptance is separate.

The editor changed CommonEvents serialization only and System.versionId from 45165923 to 66332832. Both user writes were preserved. The native revision advanced from `mz-20260911-pr3-taverna-01` to `mz-20260911-pr3-taverna-02`, and the content CLI passed. This acceptance is not reinterpreted as a waiver for the subsequently documented offscreen portraits.

## Candidate audit and organization

**Audit/organization: PASS. Candidate readiness for the full visual delivery: FAIL.** The integration delta against main originally comprised 24 additions, six modifications and no deletions. Another 275 indexed paths carry incoming main changes; those unrelated implementations/deletions are preserved and excluded from this delivery's readiness claim. The expanded final inventory includes the verification record, selected evidence, bug and affected QA scenario, with per-path hashes and dispositions in `.artifacts/pr3-conflict/final-verify/candidate-audit.json`.

Kept native event data and revision manifest for engine/validator consumers; original and renamed images for their preserved authoring uses; the existing canonical test expectations for focus/recovery; GDD/README for current guidance; spec, ADR, discipline contracts and preservation record for approved decisions/provenance. The hN-Name aliases deliberately retain Lucas's original delivered filenames despite equivalent portrait bytes. `resolve-merge.py` is a frozen one-off historical transformation, not a recurring authoring command; it predates the editor save.

Selected six unmodified real PNGs plus their provenance for maintained review/devlog material. Full logs, snapshots, temporary wrappers, isolated test inputs and surplus captures remain in ignored local archives; nothing was deleted. The archive manifest beside the final-verify evidence records hashes and relative paths. It is local evidence on this machine, not a backup or dependency required by a fresh clone. Maintained links and selected-image hashes were checked. The `deslop` review found no production-code cleanup needed in the integration diff.

The merge remains in progress with no unresolved index entries. Existing staged content was preserved; final-verify documentation and selected evidence are pending working-tree changes. No commit, push, PR update or merge into main was performed.

## Limits and next work

The confirmed framing defect requires a separate authoring decision compatible with preserving Lucas's images/positions; this verification did not silently reframe or rescale them. Windows, a second viewport/reduced-motion replay, full campaign/audio, and agent-driven editor save/reopen were not executed. Their absence is not represented as a pass. Final narrative rewriting and final-art acceptance remain pending.

Devlog moment: tavern overview → consultation → return with Lucas's composition preserved. The selected material includes the known portrait limitation; no devlog was composed or published. This file remains the sole owner of final acceptance and readiness for pr3-taverna.
