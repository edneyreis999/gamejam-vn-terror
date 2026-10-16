---
round: 01
reviewed_fingerprint: sha256:dd111a3d3bfae85df8f4bf132a5743f4bee4ecbbd160ee1c562ae12143d7d69a
reviewed_head: e920095fb68337c27190002797354076cdce1c67
reviewed_on: 2026-10-16
verdict: FIX_BEFORE_SHIP
disposition: accepted-risk
disposition_on: 2026-10-16
open_findings: 0
---

# Spec Peer Review — Round 01

The frozen-input review originally found one medium issue requiring a contract correction before implementation handoff. The user subsequently accepted its risk; [the disposition below](#user-disposition--2026-10-16) closes F-001 without a code fix. The original verdict and evidence remain historical. This is a review of the specification against repository evidence, not a claim that the unimplemented feature failed a playtest.

The round includes an independent native subagent review and parent validation of its finding. The original review wrote only this report. The later user disposition updates the specification, programming contract, verification and GDD; runtime and saves remain unchanged.

## Coverage

| Lens | Sources reviewed | Verdict |
| --- | --- | --- |
| Player behavior and scope | [Spec](spec.md), [stories](_user_stories.md), [GDD §28](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#fogueiras-vinculos), GDDR-001–006 | Clear. The 2/2/1 and 2/2/2 cadence, camp-only retreat, loss precedence, optional conversations and directional grief match the recorded decisions. |
| Authority and disciplines | Spec authority map; all five discipline contracts; GDD §§3.7, 5, 18, 26–28; ADR-G004–006; standing directives; EventBridge baseline; narrative postmortem | Clear on product and responsibility boundaries. Coreto remains frozen; native events and Languages.tsv retain authorship. Editorial and implemented-game acceptance remain separate. See the nonblocking status note below. |
| MZ runtime and lifecycle | [Programming](campfire-hero-bonds.programacao.md), current CampaignRules/EventBridge/Presentation, CommonEvents.json and hero/camp maps | F-001 affects checkpoint coordination. Otherwise, the contract distinguishes genuine arrival, hero-map return and saved interpreter continuation, and prohibits replaying prior commands. |
| Saves and compatibility | Programming state/actions/checkpoints; spec RQ-008/011; current save hooks and observation completion | F-001. The new-campaign boundary is explicit; social-unit ownership, witness facts and completed-grief persistence are otherwise coherent at specification level. |
| Narrative, presentation, input and assets | [Narrative](campfire-hero-bonds.narrativa.md), [UI/UX](campfire-hero-bonds.uiux.md), [art](campfire-hero-bonds.technical-art.md), [audio](campfire-hero-bonds.audio.md), hero sheets, Languages.tsv and active plugin registry | Clear at specification level. Inventory is 48 bases, 8 interjections, 3 arrivals, 16 grief reactions and 16 tavern subjects, with all canonical directions present and no duplicate scene IDs. No concrete reveal-order or absent-speaker defect was found. Camp art and Fire1 exist. Input consumption, segmented FAST, HIDE, reduced motion and audio restoration have explicit contracts; visual, editorial and listening acceptance are still pending. |
| Verification and QA | [Verification](verification.md), existing persistence/native-checkpoint coverage, ADR-G003–006 and Coreto QA guide | F-001 needs an explicit observation-only save case. The rest of the matrix retains representative progression, death, input, save and audio risks, player-earned saves, exclusions and human judgments. No additional heavy-test grid is warranted by this review. |

## Findings

### F-001 — Reconcile Talk completion with checkpoint deduplication

- Severity: **medium (P2)**.
- Source: [programming contract, Checkpoints and restoration](campfire-hero-bonds.programacao.md#checkpoints-and-restoration), lines 79–84; observational ownership at lines 26 and 53. Related requirements: RQ-008 and RQ-011.
- Evidence: line 84 requires a save after the existing tavern Talk's `ObservationComplete`, while keeping `_drylandReadUnits` as its sole read-history owner. In the current runtime, [Dryland_Presentation.js](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_Presentation.js), lines 146–152, updates that array without advancing `campaign.sequence`. [Dryland_EventBridge.js](../../../rpg-maker/The%20Dryland%20Drowned/js/plugins/Dryland_EventBridge.js), lines 489–493, skips a checkpoint when the last successful saved sequence equals the current campaign sequence. The spec names new checkpoint reasons and preservation of the current mechanism, but does not reconcile this deduplication with observational completion.
- Failure scenario: start in formation with campaign sequence N already saved; complete an unread Talk; do not select a hero, change destination or take another campaign action. Reusing the current checkpoint logic omits the requested save because the sequence is still N. On reload, the saved read history predates the conversation. Two different Talk conversations in succession without a campaign action expose the same gap.
- Consequence: a completed conversation can regain its NEW indicator and lose previously earned FAST permission after Continue, violating the promised durability of read history. This does not imply lost deaths or route progress.
- Contract correction: make the checkpoint contract explicitly recognize completed observational reading that has not yet been persisted. Equality of campaign sequence alone must not suppress that write. Preserve `_drylandReadUnits` as the single authority and define how successful saving acknowledges the change, while loading the checkpoint itself remains idempotent and save failures retain the previous successful checkpoint. Do not duplicate Talk facts in `completedSocialUnitIds` or introduce unconditional repeated writes.
- Verification correction: add the explicit case to V-004/S-05: complete Talk at an already-saved campaign sequence, then reload before any other campaign action; also cover two distinct Talk completions without an intervening campaign action. Observe persisted read history and its restoration, not only the in-memory label. Extend the existing persistence owner. Current IT-024 reads a conversation and then earns departure before saving, so that path can mask this failure.
- Evidence type: source-level integration analysis, independently reviewed and validated; no runtime reproduction claimed.
- User decision: **accepted risk; closed without implementation**, 2026-10-16. The proposed code correction and dedicated test were declined; see the disposition below.

## User disposition — 2026-10-16

Edney stated: “não precisamos adicionar complexidade no código por causa disso. esse cenario é muito dificil de acontecer e mesmo que aconteça o impacto é pequeno na experiencia do jogador.”

Accept the existing tavern Talk persistence limitation. Keep its current read-state owner and checkpoint deduplication; do not introduce a Talk-only checkpoint, observation revision, dirty flag or dedicated test to prevent this NEW/FAST reset. Read history is persisted with the next normal successful save. The assessment of likelihood and acceptable impact is the user's product judgment, not a measured runtime result.

F-001 is closed as **accepted risk**, and no review finding remains blocking. The original correction and verification proposals above are historical recommendations, not implementation obligations. RQ-011, the programming contract, V-004/S-05 scope and GDD §28.4 now record this exception. New social-topic/grief checkpoints, death and progression guarantees remain required. This disposition is not a new independent review or a game-readiness verdict; implementation, verification and human acceptance remain pending.

The frozen hashes below intentionally identify the pre-disposition inputs and must not be replaced with hashes of the amended documents.

## Residual risks and nonblocking notes

- Editorial quality, emotional effect, repetition, composition and the fire mix remain explicit human acceptance items. This review neither accepts nor rejects those judgments.
- Approval metadata is stale in some companions: the specification records technical approval, while the programming frontmatter remains `draft` and the GDD introduction/§28 still describe technical acceptance as pending. Reconcile these labels when incorporating the review, preserving the genuinely pending editorial and game acceptance states. This is not a second material defect.
- Native checkpoint tests and directed gameplay evidence have different preparation boundaries. Existing harness fixtures or interpreter instrumentation must not be reported as player-earned directed evidence; the spec already requires public inputs for the latter.
- This round did not open the game, run game tests, listen to assets or perform visual QA. No browser, server or auxiliary test process was started.

## Frozen input and checks

Base HEAD: `e920095fb68337c27190002797354076cdce1c67`. At review start, the GDD was modified and the spec/GDDR directories were untracked; the unrelated ItemsEquipsCore file was also untracked. Their presence is not attributed to this review.

The fingerprint above covers the eight spec files, canonical GDD and six GDDRs listed below. It is SHA-256 over sorted UTF-8 lines of `<file hash>  <repository-relative path>\n`. A separate in-session snapshot of 153 spec/context/runtime files was checked again before writing this report: no input drift. Current runtime evidence cited above was unchanged from the base checkout.

Checks actually performed: specification/source inspection, local link resolution (no missing file targets in the eight-file spec set), narrative scene/pair enumeration, asset existence and active plugin order inspection, and read-only Coreto CLI help/catalog discovery. These are review checks, not candidate-game verification.

| Input | SHA-256 |
| --- | --- |
| `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` | `149d5b0c44be1f6af907229379171cc042eb0b42ed5709ab064daabc9b057043` |
| `docs/gddrs/gddr-001-fogueiras-e-ritmo-da-expedicao.md` | `9e1ee8eb5e659e6b3c71c39575bfed90ddd283309eda16eefdfdd6ea1ac959f5` |
| `docs/gddrs/gddr-002-conversas-e-vinculos-dos-herois.md` | `c6d14ae041ffe488dd9dba41b30c6c56619c5d59a847278f3d7c52130b771994` |
| `docs/gddrs/gddr-003-reconhecimento-das-perdas.md` | `ec2a796ededfac5d75f4879a246c2c0a5b21582f31e16170022d1fd941735324` |
| `docs/gddrs/gddr-004-descoberta-de-conversas-ineditas.md` | `e34d1fb3e1e1dae38bd78eef71c265b9509ee18851f139e56856049d013cfead` |
| `docs/gddrs/gddr-005-recuo-na-fogueira-com-qualquer-grupo.md` | `278b6e45ccb73e1352b96fbef36f7c2cc0af2fce84f6830da0f3bbf45c2521bd` |
| `docs/gddrs/gddr-006-memoria-das-perdas-entre-expedicoes.md` | `094466353190436d8f092b6219dab5237eeda6e6b1627d8b1a292cb85cf63e8d` |
| `planos/tasks/campfire-hero-bonds/_user_stories.md` | `5278c247e3bf04be57c1d343b113d166a882b14ac4c6486ab1dd25fb40e2eed0` |
| `planos/tasks/campfire-hero-bonds/campfire-hero-bonds.audio.md` | `590d9d3a7c600485462ba3a32121734d88752af6e1a0c1a6845a09882047752d` |
| `planos/tasks/campfire-hero-bonds/campfire-hero-bonds.narrativa.md` | `b76442c9e863822206cfd32dfdac8c7f3b6e4c0886ec0e0886770fd51ccc6ffa` |
| `planos/tasks/campfire-hero-bonds/campfire-hero-bonds.programacao.md` | `141ad0add29a3ffe00b042827dd6df1a1fecdd53db5a8f604131ba229d0fbb5c` |
| `planos/tasks/campfire-hero-bonds/campfire-hero-bonds.technical-art.md` | `fb9970873626635577558a671ab613a547e85fac6c433269200adc5ba77cf28d` |
| `planos/tasks/campfire-hero-bonds/campfire-hero-bonds.uiux.md` | `a90a59408a5fb8f085d5462da4d8b64b0259c1cf7a43421d5526ac6d9e8d5b79` |
| `planos/tasks/campfire-hero-bonds/spec.md` | `0c0468dbf850b1ba3a95999d395b2dc7c4aa43646af22eb261fe1839dc858504` |
| `planos/tasks/campfire-hero-bonds/verification.md` | `d329ebbe6156e2d428296fd1dca06a30890980280653f3ecf17cf8c0c37c6ac3` |

The user disposition above resolves the selection required by the [spec peer-review workflow](../../../.agents/skills/rpg-maker-mz-spec-peer-review/SKILL.md). Only the accepted-risk documentation was incorporated; no runtime correction was authorized or implemented.
