---
round: 2
review_type: draft-consistency-review
reviewed_on: 2026-09-24
reviewed_stage: product-review
verdict: NO_NEW_FINDINGS
prior_findings: resolved-in-contracts
product_approval_granted: false
implementation_reviewed: false
---

# Draft review — Round 2

No new actionable defect was found in the current product draft. D-014 and D-015 resolve both findings from [round 1](review-01.md), and their requirements, authority records and provisional verification expectations agree. This conclusion concerns specification consistency; it does not approve the complete product set, proposed prose, technical design or game implementation.

The review was performed inline because the spec remains `draft/product-review`, with `product_approved: false` and `technical_approved: false`. The approved-spec peer-review workflow is not applicable yet.

## Rechecked findings

### F-001 — Resolved by D-014

The [preparation requirement](spec.md#rq-002--sequential-preparation), [incremental ADR](adrs/adr-001-prototype-feedback-product.md#decisions), [GDD §28](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#28-refinamento-do-feedback-do-protótipo--2026-09-24) and [V-002/S-003](verification.md#sensor-matrix) now distinguish the following cases:

| Situation | Required result |
| --- | --- |
| Introduction completed; player returns to formation and reopens the map without ending the session | Do not repeat it during the same preparation. |
| Continue restores a save recording introduction completion for that preparation | Do not repeat it on map reopening. |
| Continue restores an earlier save; the introduction was read only after that save | Show it on the first destination-map opening after restoration. |
| Continue restores an earlier save; the introduction had never been read | Show it on the first destination-map opening; Continue does not suppress unseen content. |
| A later expedition is prepared | Show the introduction again for the new preparation. |

No new automatic save or separate persistent acknowledgement is authorized. This preserves the last-successful-save rule, including existing save-failure behavior. D-013's statement that loading is not a new expedition is consistent with D-014: replaying unsaved reading does not create another expedition. V-002 and S-003 now name the before/after-save distinction that was missing in round 1.

Exact representation of preparation identity and reading completion remains Stage 2 work. Its absence in a product draft does not reopen this resolved product decision.

### F-002 — Resolved by D-015

The [epilogue requirement](spec.md#rq-010--narrated-epilogues), US-010, incremental ADR, GDD §§19.4/28 and [V-010/S-004](verification.md#sensor-matrix) now include the existing present-day music and discreet audience ambience. The [prior audio contract](../approved-narrative-dialogue-staging/approved-narrative-dialogue-staging.audio.md#later-scoped-supersession--2026-09-24) links back to the narrow epilogue supersession, preserving its historical acceptance.

The revised contract covers narrator entry, continuity between eligible hero epilogues, exit to credits, volume/mute and available Continue boundaries. Opening applause remains excluded; no new music production or voice recording is implied. The ending, memorial and credits retain their separate treatment, and the epilogue eligibility rules still exclude dead heroes and reserves.

Audio is now explicitly an affected discipline in the Stage 2 handoff. V-010 and S-004 include audio-state evidence and the relevant transition paths. Historical audio acceptance is not presented as proof that those new paths work, and the devlog suggestion includes an audible epilogue clip.

## Remaining draft coverage

| Area | Assessment |
| --- | --- |
| Opening and preparation, RQ-001–002 | Fresh title-entry acknowledgement, separate departure confirmation, back navigation and reduced-party progression remain consistent. D-014 does not weaken the age gate or add save slots. |
| Prologue and hero dialogue, RQ-003/007 | Canonical Irati/Rheed/Ivaí facts, final prologue exchange, spoiler boundaries and selected speech categories remain explicit. New words and proposed full-party wording retain their pending editorial status. |
| Sacrifice and named consequences, RQ-008/012 | Danger, selected victim, farewell and consequence remain ordered; permanent death/save occurs at selection. Identity must survive removal from the living party. No automatic victim selection, extra confirmation or repeated death is introduced. |
| Targets, framing, choices and memorial, RQ-004–006/009/014–015 | Player outcomes and preserved input/eligibility rules are specified. Precise geometry, focus behavior and readable final composition remain in the planned surface stage. The tavern board remains separate from final memorial progression. |
| Route return and absences, RQ-011/013 | Route closure precedes transition and the separate absence effect. Expedition-only replay, simultaneous three-second disappearance, no-death behavior and reduced motion remain consistent. D-014 does not silently redefine absence restoration. |
| Settings and saving, RQ-016 | Saving stays within the associated campaign file. Native error behavior, semantic checkpoints and no arbitrary rollback slots remain preserved. Safe save/return details are explicitly assigned to Stage 2. |
| Authority and scope | D-001–D-015 are individual accepted decisions, not full-spec approval. Engine/Coreto restrictions, native event ownership, local assets and historical baselines remain intact. |
| Verification policy | Every requirement has a story and sensor row. Own test saves, representative real journeys, risk-based grouping, teardown and the gamepad/native-zoom exclusions remain consistent with project guidance. No prior prose-only waiver is imported. |

The original larger feedback document remains supplementary. This round preserves the spec's stated 16-item scope; it does not independently reconstruct the original intake message from that larger document.

## Pending work, not new findings

The complete proposed prologue, named-consequence prose and proposed full-party wording still require the recorded product/editorial decision. Stage 1 confirmation and the later surface/technical contracts, exact scenario design, full-spec approval and implementation are also pending. Resolving these two review findings does not close those separate obligations.

No extra product question was found necessary to settle F-001 or F-002. Stage 2 must translate their accepted behavior into native authoring and observable checks without changing it implicitly.

## Checks performed and limits

- Reread the five product/verification artifacts and the prior review; cross-checked the changed GDD clauses and prior audio contract.
- Validated 43 local links across the five artifacts, `review-01.md` and the prior audio contract: all referenced files exist. Checked all 11 Markdown heading fragments in those links against target headings: none missing.
- Verified 16 unique requirement headings, 16 matching sensor rows and a player-story reference for every requirement. Decision IDs D-001 through D-015 are present without a gap.
- Recomputed SHA-256 provenance: the speech source, proposed consequences, CommonEvents, plugin registry, CampaignRules and EventBridge still match the inputs inspected in round 1. Their prior static baseline observations can therefore be reused within that limited scope.
- No game tests, browser/editor session, runtime reproduction, listening session or visual QA was performed. No test process was opened. This review created only `review-02.md`; the source contracts and user edits were left intact.

## Reviewed fingerprints

SHA-256 of the current working-copy bytes before this report was added. These anchors identify this round's inputs, independently of the historical hashes in round 1.

| Input | SHA-256 |
| --- | --- |
| `spec.md` | `17cb02aced728b7130f18975ee3081425a8620e53c4cc6b96e0cdf9c24f98055` |
| `verification.md` | `65e03397375869890dea4e633e292bf7abb0af9cfd57ee220ec569ffa2598cad` |
| `_user_stories.md` | `7e4ba31f66d8c152e844cac739f5ad2fd34f5d2fdcc6652cdfc7d523559d2b51` |
| `proposed-consequences.md` | `227848bee144b35e16949d7b148b7b782912a580235a4faf5e1233d183d66d88` |
| `adrs/adr-001-prototype-feedback-product.md` | `dd2761d71aecec5729618c36836ba742f148a27fbfd78fc24bacd4d7dc267ee1` |
| `review-01.md` | `5a64092891ec6eabe3c9e1e5f0de3329bf9f3948ac32787535897313854d7ff3` |
| Canonical GDD | `e69bf4ea558e1ee330d857120a75631b4026366d5490808f59d3545073bf0fd8` |
| Prior narrative audio contract | `743077af2f3347e0926ae92427033c810718892368b76e557e1edb434b1ca1d5` |
| Hero-speech source | `81e5c8296fd2b96dd450561019108228c849e4c5f414a2e42ace71bc9c3fa28d` |
| Native CommonEvents | `fc4ad8e1fdc4ec8c8e44f650fab9e76bf86e408e623bea2eb2b5bb577002d297` |
| Native plugin registry | `99c2afe123ac9f597d956fa20660632f2d35f55cb3e85a2ec9f9ff8eb27c4e6a` |
| Dryland_EventBridge | `f79e39da80310e5ade31c9150d1701a5435e12d20e1730ccc16790509641277d` |
| Dryland_CampaignRules | `be5e42bd85de87e8c0b9324b084840f48fd1b4e5fc588f53764c25648184d790` |
