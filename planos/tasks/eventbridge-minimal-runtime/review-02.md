---
round: 02
date: 2026-09-12
reviewed_fingerprint: 5b47e8af9f9b604f1846b709b3077443fe614d812f1407459286312acead1797
base_revision: 5d0d9ab0296e7150cfbdd7ab263d304eeab06fdb
verdict: SHIP
---

# Spec Peer Review — Round 02

No new supported contract defect was found in the approved specification after ADR-002 and ADR-003. The two findings from [round 01](review-01.md) are resolved by the incorporated user decisions.

SHIP is the verdict for this specification review and its handoff to task decomposition. It is not a game-delivery verdict. Implementation, native runtime evidence and applicable human acceptance remain pending in [verification.md](verification.md); its readiness flags remain false.

The parent reviewed authority, native authorship, events, presentation, assets, audio and verification. An independent native subagent reviewed save/checkpoint and reading lifecycles against the installed sources. Neither review executed the game, ran its test suite, changed saves or edited implementation. This report is the only repository file added by this round; approved inputs and pre-existing edits were preserved.

## Coverage

“Clear” means no supported contract finding, not demonstrated implementation success. Paths in this table are relative to this spec directory unless stated otherwise.

| Lens | Sources reviewed | Verdict |
| --- | --- | --- |
| Player behavior and scope | Canonical GDD §§1, 3.7, 19, 25–26; spec RQ-001–RQ-018; interview decision ledger; ADR-001–ADR-003 | Clear. Current decisions supersede the named historical baselines. Mechanics, desktop scope and provisional creative statuses remain distinct. |
| Authority and disciplines | All five discipline contracts; project directives/playbook/glossary; historical native bust spec; ADRs | Clear. CampaignRules retains domain truth; Bridge exposes facts/actions/completion; native events own content and composition. Presentation has a bounded integration role. |
| Native authorship and data | Programming command surface; narrative contract; spec RQ-002–RQ-005; native command117; current Common Events and map entries | Clear. The native call selector is now the sole content association. Multiplexed role content must be split before Present is removed. Public configuration is separate from content routing. |
| MZ runtime and lifecycle | Programming §§Layer ownership and State, saves and native lifecycle; current Bridge/CampaignRules; installed plugin order; native interpreter | Clear. Initialization precedes queries, explicit completion binds the expected passage, and stale actions remain subject to domain legality. No arbitrary helper termination completes campaign reading. Native actors/battles do not become campaign truth. |
| Saves and compatibility | Spec RQ-012/RQ-013; programming lines 79–93; SaveCore/EventTitleScene; native save contents; V-011/S09/S09E | Clear. Dedicated current-file routing, asynchronous write observation, exact-once decision recovery, ordinary failure handling and limited legacy compatibility are explicit. |
| Reading, input and scenes | Programming lines 46–54 and 83–85; narrative/UI contracts; ExtMessageFunc and MessageVisibility metadata/source; V-009/V-010/V-014 | Clear. Observational history is separate from campaign completion. Provider AUTO/FAST permission/reset has an owner. HIDE, focus, gesture consumption, VN map policy and scrolling-credit cancellation have planned sensors. |
| Presentation, assets and loading | Technical Art contract; programming lines 58–75; ADR-002/ADR-003; current CEs 5–12, 38–39 and 48; Bridge formation/panel/crop consumers; V-005–V-008 | Clear. Default loading replaces the former extra readiness guarantee. Tavern-only preload has one editor-authored list, native call paths and Continue coverage. Prepared assets include all active crop consumers. Death fades and memorial layouts retain their required behavior. |
| Audio | Audio contract; Bridge live-ME support; CE67; V-012/S11 | Clear. Direct campaign reads must become initialized queries. Live volume integration moves to Presentation; cue selection and timing remain authored in events. Audible acceptance remains pending. |
| Verification and QA | Full verification contract; canonical suite layout; current native project guide and QA tree | Clear plan. All 18 requirements have verification references; gameplay, isolated fixtures, source inspection, visual/audio observation and human judgment stay distinct. No replacement shipped QA console is authorized. |

## Findings

None accepted in this round.

The review does not repeat intentional, approved changes as defects. In particular, it does not require a Bridge content dispatcher, a project image-readiness command, a revision gate or a second save-file policy.

## Resolution of the previous findings

- **Round-01 F-001:** ADR-002 removes duplicate Configure* content references. Direct native Call Common Event selectors own execution, and S03 verifies replacing that actual target with a new standalone unit.
- **Round-01 F-002:** ADR-002 accepts default MZ/provider loading without a custom wait or immediate Retry guarantee. ADR-003 subsequently includes tavern preload while retaining that asynchronous lifecycle. S06/S06T distinguish request coverage from readiness and exercise entry, return and Continue.

## Evidence and residual implementation risks

Static inspection reconfirmed **29 distinct existing tavern picture files**: 28 referenced by CEs 5–12, 38–39 and 48, plus Dryland_Tag from Bridge's formation renderer. This matches programming's current baseline. Final migrated references still require reconciliation; existence is not evidence of preload execution or timely rendering.

The installed SaveCore supports locked/current. Its forceAutosave callback does not return the save Promise; programming line 89 already permits observing the actual write while preserving original file IDs, arguments and results. Native save contents include map, screen and system, but not Game_Message. The specified checkpoint boundary precedes the next reading/choice and explicitly prohibits duplicate decision execution or an immediate resave on load.

SaveCore's occupied-file selection does not add a separate pre-overwrite confirmation in its installed locked-save path. Its SaveConfirm window reports operation outcomes. Programming's reference to provider confirmation is read together with the UI contract's “any provider confirmation”: this review does not infer or require an additional dialogue. S09 must observe the actual provider selection/cancellation behavior.

Provider AUTO/FAST state and reset, native Options/Continue composition, HIDE and held-input interactions, scrolling-credit cancellation, one-time death presentation and live audio still require the planned implementation evidence. Their technical owners and sensors are defined; source inspection does not prove them.

The prepared memorial assets require their own framing approval. Existing provisional art/text remains provisional. The Gorvak map-to-editor-to-game devlog demonstration remains applicable after implementation.

## Document checks performed

- Recomputed the frozen input hashes: no drift during this round.
- Checked local Markdown links in the spec set: no missing targets.
- Counted 18 unique requirement headings, each referenced in verification.
- Counted all 43 responsibility rows exactly once.
- Inspected native tavern image references and local file existence.
- Checked report whitespace after writing.

No runtime PASS, browser walk, asset render or human acceptance is claimed by these checks.

## Frozen inputs

The fingerprint above is SHA-256 of the following ordered entries serialized as `<sha256><two spaces><repository-relative path><LF>`. The report itself is excluded. Supporting tracked runtime sources and the historical native bust baseline were inspected at base_revision; the tracked working-tree diff contained only the existing GDD amendment.

| Repository-relative input | SHA-256 |
| --- | --- |
| docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md | 96c7826a47cb5a14f9669f1c43c0019e54a6a90ac7d38e0d4786eb08748cae35 |
| docs/design/2026-09-12-eventbridge-runtime-e-entrevista.md | aaccbf9ece06ab2bf107760d23034866bb30c87b74d38a47821cfa68989b8c26 |
| docs/known-issues/KI-20260912-precarregamento-de-imagens.md | 2dda3cd12316a83e57722c3e30821c082e16996ea626b0c3d7618860364100e8 |
| planos/tasks/eventbridge-minimal-runtime/adrs/adr-001.md | 2e309d06e5a838bfb4d95ee669f003c278ae44f6bc4cade65b9eb305d12b1beb |
| planos/tasks/eventbridge-minimal-runtime/adrs/adr-002.md | 2ae0517b8777705a334885ffe9e7c5e0a9b64f0d98cb75834b4d0b233b63f46d |
| planos/tasks/eventbridge-minimal-runtime/adrs/adr-003.md | 2559b21225fe5cc7ef78233a6a90994af830eb7e8b204d12d34f5275df0a8c87 |
| planos/tasks/eventbridge-minimal-runtime/eventbridge-minimal-runtime.audio.md | 17162e5e21e6d0aac12f058ba002eb45463657f9f1f28fdc33c38c326740ce03 |
| planos/tasks/eventbridge-minimal-runtime/eventbridge-minimal-runtime.narrativa.md | e7dcfd17e0fc10918f8c9515d2a67c2d19726b4c8b6627571621e4e4ed0f719e |
| planos/tasks/eventbridge-minimal-runtime/eventbridge-minimal-runtime.programacao.md | 54ff16dbd6c1528a8920a160a085d7727eef2408d62171ef17304c9a4a434df0 |
| planos/tasks/eventbridge-minimal-runtime/eventbridge-minimal-runtime.technical-art.md | 1a1b9ae2571446a3b2f1eabc8e47caa281bc21d3ab772b1c712c241d3d75c0fd |
| planos/tasks/eventbridge-minimal-runtime/eventbridge-minimal-runtime.uiux.md | 57052e8fcd22dab06eef50ede3641737e66a1d9a30fe9f5151218b6e682eda18 |
| planos/tasks/eventbridge-minimal-runtime/review-01.md | 3084b5c97cfc1e35ef64ea50064b5116c2aaf66a4789ba1296deb566023875de |
| planos/tasks/eventbridge-minimal-runtime/spec.md | 4d49ac795275932824d0300395ebdc2d0e56fef198ab07656d773e6ffec85552 |
| planos/tasks/eventbridge-minimal-runtime/verification.md | e11f38c882c5bb215379bbd35f9d14afbd0bc4fca9b0dff76d37a3fa90fc4a48 |

## Incorporation

No contract correction is proposed, so there is no finding-selection decision pending. The approved specification, ADRs and verification plan were not rewritten by this review.
