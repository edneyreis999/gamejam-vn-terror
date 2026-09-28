---
round: 1
review_type: draft-consistency-review
reviewed_on: 2026-09-24
reviewed_stage: product-review
verdict: FINDINGS_RESOLVED_IN_DRAFT
original_verdict: CLARIFY_BEFORE_FULL_SPEC_APPROVAL
product_approval_granted: false
implementation_reviewed: false
---

# Draft review — Prototype feedback refinement

The original review identified two medium-severity contract gaps: introduction replay across a save boundary and the temporal audio impact of narrated epilogues. Follow-up D-014 resolves F-001 and D-015 resolves F-002 at the contract level. No review finding remains open. No critical or high-severity defect was established in the reviewed draft. The original evidence and fingerprints below remain historical; resolving these findings does not grant full spec approval or declare implementation or runtime verification.

This is an inline review of an unapproved product draft, not the approved-spec peer-review workflow. Missing Stage 2 contracts and implementation tasks are expected at this stage and are not findings. Existing D-001–D-013 approvals remain intact; they do not approve the complete spec or its proposed prose.

## Findings

### F-001 — Distinguish saved introduction completion from unsaved reading

- Severity: medium.
- Sources: [spec.md, RQ-002/D-013](spec.md#rq-002--sequential-preparation), [verification.md, V-002 and S-003](verification.md#sensor-matrix), [incremental ADR, D-013](adrs/adr-001-prototype-feedback-product.md#decisions).
- Preserved authority: [GDD §§3.7, 26 and 27.3](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#273-leitura-entrega-e-limites) keeps semantic save boundaries and permits unsaved reading to repeat from the last successful checkpoint. RQ-016 adds a deliberate save of the current preparation; it does not specify an automatic save after this new line.
- Evidence: V-002 requires the introduction once per preparation and no repetition on ordinary Continue, without distinguishing whether its completion was saved. Consider saving in the tavern before the first destination-map opening, reading the introduction, returning to formation, then closing without saving again or departing. Continue restores the same preparation from before the line. A player who closed before reading it has the same saved state but still needs the introduction. The baseline Bridge's `nextCheckpoint` does not save ordinary preparation reading; its current checkpoint table is static evidence of the baseline, not a restriction on the future technical design.
- Consequence: an implementation or QA author must choose whether to replay unsaved reading, persist an additional presentation fact, or add a save boundary. The draft does not give an unambiguous expected result for this visible case. Blanket suppression on Continue could also omit an introduction that was never read.
- Suggested contract correction: state how D-013 applies relative to the last successful save, preserving one introduction during uninterrupted preparation. The baseline-compatible recommendation is that a save containing completed introduction reading suppresses it, while an earlier save can replay it. If the intended guarantee covers unsaved reading too, record that persistence exception explicitly before choosing its implementation. This recommendation does not replace D-013 without a decision.
- Verification correction: distinguish saves before the first map opening, after acknowledged introduction, and an exit after reading without a later successful save. Keep the already required next-expedition and ordinary back/reopen cases.
- Incorporation status: resolved at the contract level by D-014 on 2026-09-24. The user accepted repetition when reading was not saved. RQ-002, the incremental ADR, GDD §28, V-002 and S-003 now use the last successful save's reading completion without adding an automatic save for the line. Runtime verification remains pending.

### F-002 — Include the temporal audio impact of narrated epilogues

- Severity: medium.
- Sources: [spec.md, RQ-010](spec.md#rq-010--narrated-epilogues) and [discipline-contract handoff](spec.md#technical-design-and-discipline-contracts); [verification.md, V-010](verification.md#sensor-matrix).
- Preserved authority: [GDD §19.4](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#194-áudio) assigns distinct sound contexts to older Rheed's present and the expedition's past. The [approved audio contract](../approved-narrative-dialogue-staging/approved-narrative-dialogue-staging.audio.md#player-facing-transition-contract) changes music/ambience with temporal scenes and limits applause to the opening. That baseline separately preserves the former memorial/epilogue audio.
- Evidence: RQ-010 now puts older Rheed in every eligible epilogue, but the handoff leaves audio impact conditional and V-010 lists only prose, eligibility and visual expectations. In the inspected baseline, Map029 calls CE067 before its epilogue; CE067's present-context condition enumerates prologue, route-closure and Council passages, excluding `epilogue.*`. Its ending branch stops BGM/BGS. Adding the new bust and black background alone therefore does not establish the narrator's approved sound context. This is a static dependency finding, not a reported runtime failure of an implementation that does not yet exist.
- Consequence: a visually correct epilogue can pass V-010 while omitting the established present-day audio treatment. The current handoff also leaves unclear whether the old epilogue-specific audio preservation or the newly applicable narrator rule governs this surface.
- Suggested contract correction: identify audio as affected by RQ-010 and carry the existing present-day direction into the Stage 2 handoff, or explicitly record a proposed epilogue exception if that is intended. Define entry from ending/memorial, consecutive epilogues and exit to credits without restarting opening applause or leaking scene ambience. This needs no voice recording, new track, dependency or provider migration.
- Verification correction: attach the relevant audio-state and transition evidence to V-010, including mute/volume preservation. Keep technical observations and any human listening judgment distinct; historical acceptance does not itself verify the changed event path.
- Incorporation status: resolved at the contract level by D-015 on 2026-09-24. The user accepted the existing present-day music and discreet audience without opening applause. RQ-010, the incremental ADR, GDD §§19.4/28, the discipline handoff, V-010 and S-004 now include this audio treatment and the applicable continuity, preference and entry/exit rules. The prior audio contract links to the scoped supersession. Implementation, runtime evidence and listening acceptance are not claimed.

## Coverage and non-findings

| Lens | Evidence reviewed | Assessment |
| --- | --- | --- |
| Scope and status | All five draft artifacts; supplementary feedback; GDD §28 | Sixteen requirements are traced. Exclusions and pending prose are explicit. The original intake message is not part of this review session; its reported 16-item boundary was not independently reconstructed from the larger feedback document. |
| Narrative | Proposed prologue and consequences; current hero-speech source; native prologue, failure/death and hero events; GDD §§4, 13, 15, 18, 27 | No additional factual contradiction established. The Irati warning and two-year chronology have canonical support; final prologue dialogue is preserved. Editorial acceptance remains pending. |
| Authority | GDD, incremental ADR, G001 and narrative-presentation supersession, authoring playbook | Individual decisions are recorded separately from full approval. No need to request those same decisions again. |
| Native ownership and lifecycle | Native map/Common Event consumers, CampaignRules and Bridge | Event ownership, permanent death, actual victim identity, input isolation and cleanup are recognized. Exact APIs, reading identities and interpreter resumption belong to Stage 2. |
| Persistence | RQ-002/008/013/016, Bridge checkpoints, GDD save policy | F-001. Current-file manual save and irreversible sacrifice are explicit. Old serialized-interpreter migration is not promised. |
| Presentation and assets | RQ-004–006/009–015, prior narrator/audio contracts, CE067 and Map029 | F-002. Final art, framing, target geometry and transition timings still require the planned surface work; no visual acceptance inferred from file presence. |
| Verification | All 16 sensor rows, four provisional journey groups, G003–G006 and SD-015 | Local links and requirement references pass document checks. Representative runtime journeys, own test saves and honest evidence states are planned. No gamepad or native-zoom test obligation added. |

Keep the following planned work open without treating it as a defect in this Stage 1 draft: exact choice-family inventory and hit geometry; title cancellation and focus behavior; manual-save success/failure and safe return; interrupted transition/absence handling; final-asset ownership; editorial and visual acceptance. These must be concrete before full technical/spec approval, not retroactively marked complete by this review.

## Original review validation and limits

- Read the working tree, including the user's existing uncommitted changes. No implementation, GDD, ADR or original spec artifact was edited.
- Checked all 29 local file links in the five draft artifacts: no missing target. This check covers file resolution, not every Markdown anchor.
- Found 16 unique requirement headings and a provisional verification reference for each.
- Recomputed the three SHA-256 provenance anchors already in `spec.md`: hero speeches, CommonEvents and plugin registry all match.
- Inspected native JSON and plugin source only. No automated game tests, runtime reproduction, browser, editor, audio audition or visual QA was performed. No test process or application was opened.
- Existing reported bugs remain unverified; this report does not convert them into reproduced defects.

## Reviewed fingerprints

SHA-256 of the working-copy bytes, captured before this report was added. Later changes to these inputs require checking the affected findings again.

| Input | SHA-256 |
| --- | --- |
| `spec.md` | `397543cf5b519492bb348098d9050878935e412d220e97d3234c07e8e4524315` |
| `verification.md` | `5e4a8363af74702ebfa0a6f0bf959cf37eddb7953c5eddbee95c6d841f7e8425` |
| `_user_stories.md` | `8de7babfbbe10306cb6840e485679ccf1a6a4d07422395c43ee6d28664d83d6e` |
| `proposed-consequences.md` | `227848bee144b35e16949d7b148b7b782912a580235a4faf5e1233d183d66d88` |
| `adrs/adr-001-prototype-feedback-product.md` | `5a855c88fad159348edd029ddf529270dc991c1b8fee29f4fd6b5800b33fe62f` |
| Canonical GDD | `05ee41c93dcccce22ab28a0ce96e6dbbe4da8300ab2450c78de8fdbf985bbcf3` |
| Hero-speech source | `81e5c8296fd2b96dd450561019108228c849e4c5f414a2e42ace71bc9c3fa28d` |
| Native CommonEvents | `fc4ad8e1fdc4ec8c8e44f650fab9e76bf86e408e623bea2eb2b5bb577002d297` |
| Native plugin registry | `99c2afe123ac9f597d956fa20660632f2d35f55cb3e85a2ec9f9ff8eb27c4e6a` |
| Dryland_EventBridge | `f79e39da80310e5ade31c9150d1701a5435e12d20e1730ccc16790509641277d` |
| Dryland_CampaignRules | `be5e42bd85de87e8c0b9324b084840f48fd1b4e5fc588f53764c25648184d790` |
| Prior narrative audio contract | `34a48e23cf806e5dedd2f7bbc2bc18c957aed360ea72a02fd55a3444f37d012d` |
