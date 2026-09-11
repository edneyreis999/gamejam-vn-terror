---
id: "07"
status: blocked
depends_on: ["06"]
verification_ids: [V-008, V-009]
---

# Task 07 — Deliver editable recipes, calibrated layouts and a reusable 2x2 example

## Outcome

Confirm briefly that VNPictureBusts commands and a representative position/scale parameter are editable in MZ. Verify all-eight recipe coverage, an authored change's effect and the reusable 2x2 conversation separately in native data and Chrome. The complete twelve-asset framing and authoring documentation are ready for QA inspection.

## Authority

- [Spec](spec.md): RQ-001, RQ-002, RQ-007; [verification](verification.md): V-008/V-009, D-09 and V-007 inputs.
- [Programação](vn-picture-busts-dialogues.programacao.md), [UI/UX](vn-picture-busts-dialogues.uiux.md), [Technical Art](vn-picture-busts-dialogues.technical-art.md), [ADR-003](adrs/adr-003.md).
- [ADR-004](adrs/adr-004.md): the editor session is limited to checking editability.
- `rpg-maker/README.md`, current installed VNPictureBusts header and [shared execution contract](tasks.md).

## Scope

- Native authoring: finalized CommonEvents helpers/recipe names, all twelve existing portrait layouts, disposable `game.rmmzproject` copy for editor proof and the same production plugin path. No production 2x2 story or imported ProjectX assets.
- Tests/fixtures: `rpg-maker/tests/suites/content.mjs` owns native-edit/parser observables; `formation.mjs`/`endings.mjs` keep their existing composition invariants. A proposed `rpg-maker/tests/fixtures/vn-picture-busts-2x2/` fixture may contain only the minimal authored recipe/transcript, not a copied vendor/game tree. Choose its canonical registration with the current manifest.
- Fixture/readiness owner: four participants occupying two slots per side, all four focus targets, repeated same speaker, HIDE, normal/reduced motion, cold/warm images and exit/repeat. An isolated prepared game uses the actual production commands and owner.
- Documentation: `rpg-maker/README.md`; actual authored-value table in the Technical Art contract; navigation to all eight tavern hero recipes and each helper family; revision/Retry/ownership instructions and manual-edit preservation.
- Delete targets: stale documentation assigning dialogue layout to automatic JavaScript; no assets, runtime vendors or historical research removed.

## Checklist

- [x] Verify all eight heroes' profile/speech/selection/full-party recipes by static inspection of native data and documentation, using stable section/helper names; do not repeat this inventory inside the editor.
- [ ] In one short session with a disposable MZ project, open one representative VNPictureBusts command, change a position or scale field and confirm that the command dialog accepts it. Record the command/field evidence. Do not require project save/reopen/export, an editor-launched playtest, one check per hero/scene or a 2x2 editor demonstration. Unavailable editor capability is a technical evidence gap, not a reason to ask for approval or claim PASS.
- [x] Separately, use a disposable native-data fixture to change one authored position/scale, assign a fresh revision and verify the effect in Chrome. Preserve before/after values and source; this runtime proof does not expand the editor session.
- [x] Create the isolated 2x2 fixture with an explicitly preserved test transcript and existing assets. Exercise the exact production command grammar/helper/owner path; never bypass it with direct renderer calls or add a campaign scene.
- [x] Verify all four focus targets, single active focus, fixed layers, listeners' per-art scale/tone, repeated same-speaker stability, HIDE, exit/repeat and no residual ownership.
- [x] Record all twelve assets' actual authored base/listening scales and positions, supported occupied-slot layouts and constrained-motion exceptions. Calibrate within approved sides/reflection/prisons; no new art or destructive PNG edits.
- [ ] Retain the brief editor check and separate Chrome authored-change/2x2 normal/reduced-motion evidence. Supply final tavern/Council/one-person framing evidence for V-007 without claiming optional human acceptance.
- [x] Update the README so a fresh clone explains editable source, helpers, supported command boundaries, reconstruction, picture allocation, revision and safe manual edits. Migration tooling must not silently overwrite those edits.
- [ ] Run focused canonical fixture/content checks and assigned demonstration, complete V-008/V-009 when evidence supports them, and continue directly to QA planning.

## Validation

Execution modes: one brief native-editor editability check, static/documentation review and separate Chrome native integration-fixture visual inspection. D-09 covers all four focus targets, HIDE, normal/reduced motion and cold/warm loads in Chrome. Run the content CLI and the justified registered fixture/edit cases through `rpg-maker/tests/campaign.test.mjs`; record their allocated IDs before invoking the filter.

| Verification ID | Sensor | Expected observable | Proposed evidence |
| --- | --- | --- | --- |
| V-008 | Brief command-dialog check; separate static/Chrome fixture and documentation review | Representative plugin parameter is editable; all-eight native recipes remain discoverable; authored change affects Chrome; README is sufficient | task-07/<run-id>/editor-editability/ and native-edit-runtime/ |
| V-009 | Production-path 2x2 fixture and visual inspection | Four stable slots, correct individual focus, group exit and repeat without residue | task-07/<run-id>/2x2/ |
| V-007 input | Authored-value table and actual inspected captures | All twelve portraits/occupied slots have reviewable framing evidence | task-07/<run-id>/framing/ |

Invalidate each evidence item only for its relevant inputs. Repeat the editor check only for an observed editability defect or changed command metadata; routine asset/layout tuning and runtime fixes do not require another editor session. Chrome/fixture evidence depends on grammar, authored data, README/revision procedures, owner/input and fixture setup. The screenshot collection is not V-007 acceptance until 09 inspects the complete required matrix. Preserve the short editor excerpt and separate game captures for the later devlog.

## Execution Notes

In progress2026-09-11. One disposable editor copy was prepared. CUA observes RPG Maker MZ running but cannot obtain a window (timeoutReached/cgWindowNotFound); exact attempts are in task-07/editor-editability-20260911/capability.json. No command field was edited: this is an explicit editor evidence gap. Independent native-data, Chrome and documentation work continues under ADR004.

Implementation delivered; evidence blocker is the brief editor command dialog only. Static inventory native-inventory-20260911.json confirms32sections/72boxes and stable helper navigation. IT06709-12-45 passed native X326→342/scale46→44 with unchanged text/plugin and fresh fixture revision; screenshot inspected. UT067/068/070 passed. Initial IT068 launched title input while busy; readiness was corrected.09-14-44 passed states, but visual inspection found stale pre-fixture message and the intentionally injected rejection banner. Fixture now closes the previous native window and clears only its injected diagnostic before captures.09-17-04 passed all20boxes (four focuses plus repeat × cold/warm × normal/reduced), group exit/repeat, HIDE and finite owner allocation rejection. Temporal entry/focus/exit frames and inspected stills are in visual-review.json. No renderer bypass or production story added.

README and Technical Art table document actual twelve assets, Council slot offsets, helpers112–215 recovery maintenance and guarded migration. Explicit Conversation allocation extends only the closed supported slot sets; existing empty/omitted argument preserves current native authorship. Revision is mz-20260911-busts-native-01; content CLI passed. Full source freshness remains task09. V009 passes; V008 remains BLOCKED_TECHNICAL for CUA cgWindowNotFound. Task08 can consume the completed implementation and plan independent QA; blocked editor evidence is not silently passed or an approval request. Lovers' visible prison claim is separately under inspection and is not inferred from zero displacement.
