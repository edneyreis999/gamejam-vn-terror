---
status: draft
slug: approved-narrative-dialogue-staging
stage: product-interview
---

# Approved narrative integration and dialogue staging

## Objective

Integrate the approved narrative from PRs #15 and #16 into the native RPG Maker MZ campaign and extend the main Gorvak conversation's visual standard from PR #17 to conversations throughout the game, including alternate interaction paths.

This incremental spec is being authored through `rpg-maker-mz-issue-to-spec`, `rpg-maker-mz-spec-preflight`, `rpg-maker-mz-create-spec`, and a one-question-at-a-time `grill-me` interview. It is not approved for implementation yet.

## Confirmed user decisions

| ID | Decision | Authority |
| --- | --- | --- |
| D-001 | Texts in PRs #15 and #16 and the illustrations supplied in PR #15 are approved content to integrate. Do not reopen editorial or artistic approval of those contributions. | User directive, 2026-09-17 |
| D-002 | PR #16's described illustrations have not been produced. Reuse the existing in-game ending images; producing new ending artwork is outside this increment. | User clarification, 2026-09-17 |
| D-003 | Each eligible epilogue uses its approved illustration as the full-screen scene, native narration at the bottom, and the game's reading controls, without a separate bust overlay. This replaces the current epilogue bust presentation. | Explicit user approval of recommendation, 2026-09-17 |
| D-004 | The main Gorvak conversation in PR #17 is the staging reference for conversations throughout the game. Include edge cases such as the full-party response; Lucas reported that those paths were not tested. | User directive, 2026-09-17 |
| D-005 | Preserve the reference's entrance, speaker emphasis, listener dimming, and exit style, while adjusting portrait size and position per character and participant count. Do not copy identical framing values to every scene; avoid cropped characters and overlapping faces, including in the Council. | Explicit user approval of recommendation, 2026-09-17 |

## Source evidence

The following heads were inspected in this session; recheck freshness before implementation.

| Source | Inspected revision | Observed contribution |
| --- | --- | --- |
| [PR #15](https://github.com/edneyreis999/gamejam-vn-terror/pull/15) | `537b7e825d695799033223810c7429d190f30172` | Eight epilogue illustrations, source prose, and a standalone HTML reading preview with 17 passages. No MZ runtime changes. |
| [PR #16](https://github.com/edneyreis999/gamejam-vn-terror/pull/16) | `ba53ad9d1d3848a2aef80d34abf1f5d391489b6c` | `feedbacks/fim-do-jogo` and `feedbacks/fim-das-trilhas`; no illustration files. |
| [PR #17](https://github.com/edneyreis999/gamejam-vn-terror/pull/17) | `85fc7b03f932337d2daaa100dc830c9b6e0c307d` | Gorvak event staging in Map037, tavern background replacement, and global VNPictureBusts anchor/scale parameters. Dialogue prose is unchanged. |
| Current local baseline | `3b5730495302e8676785e994421b3adfb4b82078` | Existing native game implementation and canonical GDD inspected during intake. |

Static comparison of PR #17 found removal of five `MotionPreference` queries and eight reduced-motion branches in Map037, with animated commands using 20 frames. These removals are an integration concern, not an accessibility design approval. No runtime or visual validation of the PR has been performed in this intake.

## Scope established so far

- Integrate all eight approved epilogue texts and illustrations into native epilogue maps.
- Integrate approved ending and route-completion prose from both files in PR #16.
- Reuse `Dryland_EndingReunite.png`, `Dryland_EndingDestroy.png`, and `Dryland_EndingTotalLoss.png` for the corresponding endings.
- Integrate the tavern artwork and apply the reference conversation staging across the game's dialogue scenes, with explicit coverage of alternate interaction paths.
- Preserve native authoring and approved campaign rules, eligibility, and reading controls unless the interview explicitly replaces a particular contract.

## Authority map

| Source | Governs | Planned treatment |
| --- | --- | --- |
| User decisions above | Approved content and this increment's presentation changes | Carry into requirements and applicable ADRs. |
| [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) | Campaign, eligibility, presentation, and native authoring | Update the explicitly replaced epilogue and content authority rules after recording the product decisions. Preserve unrelated rules. |
| [Hero sheets](../../../docs/narrativa/herois/) | Existing predefined epilogues | Reconcile approved replacement prose with the literal-display authority of the sheets. |
| [Current authoring baseline](../eventbridge-minimal-runtime/spec.md) | Native map/event ownership and campaign integration | Preserve historical decisions and implementation status; describe later changes here. |
| [Native bust authorship baseline](../vn-native-bust-authorship/spec.md) | Native visual authoring | Consult alongside the superseding GDD section 26. |

## Relevant native surfaces

- Epilogues: Maps029–036; retain H1–H8 eligibility and sequence.
- Ending scenes: Maps025–027.
- Council: Map023, including the solo case and surviving participants.
- Tavern: Map003 and interaction Maps037–044.
- Other dialogue consumers and route-completion events: inventory remains in progress.
- Runtime: `rpg-maker/The Dryland Drowned/`; tests: `rpg-maker/tests/`.

## Open decisions and remaining authoring work

- Detail the approved adaptive framing contract and its application to multiple participants and alternate responses.
- Resolve placement and presentation of the approved route-completion prose within existing narrative sequences.
- Close image framing and reading segmentation details without rewriting approved content.
- Complete the affected-scene inventory, discipline contracts, lifecycle analysis, and verification matrix.
- Obtain product-stage confirmation, then complete surface/technical design and request approval of the full spec set.

## Verification status

Intake includes remote PR metadata/diffs, structured comparison of Map037, and local documentation/data inspection only. Implementation, automated checks, directed gameplay, visual evidence, and delivery acceptance remain unperformed for this increment.
