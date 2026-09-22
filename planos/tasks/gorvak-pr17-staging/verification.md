# Verification

## Contract

| ID | Expected effect | Sensor and execution | Scope |
| --- | --- | --- | --- |
| V-001 | RQ-001: match reference geometry and half-body crop | Structured source comparison; real Chrome screenshots | Gorvak menu, Ivaí question, Gorvak reply |
| V-002 | RQ-002: entrance moves right to left with intermediate opacity/position over 20 native frames; reduced motion settles immediately | Actual installed engine/plugin command semantics; directed-browser visual inspection where available | Entry and first focus exchange |
| V-003 | RQ-003: preserve nonvisual commands and other runtime files; conversation returns to Gorvak menu without Ivaí | Structural comparison; public keyboard/pointer journey | Conversation, HIDE and return |

Reference: PR #17 `85fc7b03f932337d2daaa100dc830c9b6e0c307d`. Implementation base: main `0bbba30`. Expected composition is specified in [the technical-art contract](gorvak-pr17-staging.technical-art.md). Inputs include Map037, CommonEvents CE351/44, plugin configuration, installed VNPictureBusts/engine and Dryland_H1/ivai images. Changes to those inputs require freshness review.

Both game tabs and servers were already open for the user's comparison and are preserved. Any new QA-only resources must be closed. No campaign mutation through inspection. Heavy whole-campaign runs are omitted under ADR-G006: this changes only local native visual commands and keeps the campaign/control skeleton unchanged; focused Gorvak traversal covers the affected integration. Other heroes are explicitly out of scope, not verified by this run. Gamepad/native zoom are waived by ADR-G005/G003.

## Results

2026-09-22, branch `fix/gorvak-pr17-staging`, worktree based on `0bbba30`:

- Implemented: Map037 only at runtime. The incremental GDD/spec records the user's exact direction; completed PR #20 artifacts remain unchanged.
- Static PASS: `python3 planos/tasks/gorvak-pr17-staging/restore-gorvak.py`, exit 0, including idempotence and comparison of all 34 normal-motion visual commands through the main conversation with PR #17. All nonvisual commands and map properties remain identical to main. Native conditional/choice nesting and label targets were checked successfully. `git diff --check` passes.
- Browser observation: reused the user's Chrome tab at port 18727; entered Gorvak from the tavern and selected Conversar through pointer input. Menu and first profile text show the restored large portrait with the lower body cropped and no feet. These screenshots were inspected in the tool session; no durable PNG bundle was exported.
- Browser limitation: subsequent keyboard/pointer attempts did not advance the profile text. Selecting/raising the correct Chrome window did not resolve it; native coordinate input additionally returned `windowNotFoundAtPosition`. No state injection or unrelated input fix was attempted. Ivaí's temporal entrance, focus exchange, HIDE, return cleanup and reduced-motion traversal remain unobserved in this run. Source equivalence is not reported as fresh visual timing evidence.
- Resource handling: no new browser/server was launched for QA. The two preexisting comparison tabs and servers remain available to the user.

## Candidate audit and verdict

Keep Map037 as the runtime change; keep the GDD delta and incremental contracts as the authority for the narrowed exception; keep the replayable mutation script for data provenance and reference validation. No assets, global plugin configuration, vendor files, other maps or completed specs changed. Deslop review found no runtime abstraction, patch, workaround or unrelated edit. No files staged, committed or published.

Initial verification before user feedback: static PASS; full runtime/visual verification BLOCKED by the browser-input limitation above. The subsequent user acceptance and direction correction are recorded below; the limited automated browser observations remain historical and are not promoted to a completed QA traversal.

Relevant SHA-256 at the initial inspection, before the entrance-direction follow-up:

| Input | SHA-256 |
| --- | --- |
| Map037.json | `ca106d3f4770ebf5252d6c3c08e5bb14ced119a3f7bc0057589c548bc5314aaf` |
| js/plugins.js | `67794d5c5dc8754632e5c8a84a4f47ded485edc2ff3e7309ed376867f259d862` |
| VisuMZ_2_VNPictureBusts.js | `a4013494d5bd7d996cc39ce00e4817c93d96c54a7c32782ae666ef55a42d203c` |
| Dryland_H1.png | `4d9e351c77b0cf7f89f4e734e228c987aa4941f8baf6c12178e32a6a1c03a494` |
| Dryland_ivai.png | `74a24ac459be761944b6444368f71714d5cd5aa445c0af49cd3ae4d845e2cc11` |

## Accepted framing and right-side entrance — 2026-09-22

The user explicitly accepted the restored result ("Adorei o resultado") and requested one change: the bard must enter from right to left. Framing and the rest of the accepted scene remain unchanged. Only picture63's Basic_EnterBust Position and StartOffsetX change, from 2/0 to 8/-640.

Static PASS: replay/idempotence, exact two-field comparison against the accepted correction, unchanged command order and all other map data, and `git diff --check`. The installed plugin negates StartOffsetX for HorzMirror=None. With the current native 1280-wide ScreenX formula, the new initial X is 1544 and the destination remains 960: the same 584-pixel travel in the opposite direction, with duration20 and the final crop unchanged. Reduced motion still uses duration0. No new browser execution or perceptual claim is made for this follow-up; direction is validated from the actual native command semantics and geometry. No new resources opened; existing user comparison sessions remain available.

Current Map037 SHA-256: `765dc8dbcf136a0dc5cfd09dd7fd33a364912594b9118ee4d363f7ad1b34da7b`. The other listed inputs are unchanged. Candidate/deslop review: keep the same bounded file set; no runtime extension or scope expansion. Implementation/static verification PASS; the new direction remains available for visual inspection in a fresh Gorvak visit. No commit or publication.

## Subsequent human acceptance — 2026-09-22

The user explicitly accepted the right-to-left result: “o Gorvak ficou perfeito”, authorizing generalization in [hero-bust-staging](../hero-bust-staging/spec.md). Map037 remains at the hash above. This acceptance does not turn the earlier incomplete automated traversal into a completed run or accept the seven new compositions.

## Final verification — 2026-09-22

PASS for this increment. The user’s prior explicit Gorvak acceptance remains valid: Map037 and its recorded shared inputs are unchanged. The subsequent message “Fiz os testes manuais e estão todos corretos. faça o final verify” accepts the completed hero presentation delivery. The combined candidate audit, final checks, organization and scoped readiness verdict are recorded in [hero-bust-staging verification](../hero-bust-staging/verification.md#final-verification--2026-09-22). Historical automation limitations above remain historical; no new Gorvak browser replay is claimed. No commit or publication.
