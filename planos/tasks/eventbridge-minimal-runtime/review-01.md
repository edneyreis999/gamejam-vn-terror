---
round: 01
date: 2026-09-12
reviewed_fingerprint: 011587e02a52376936e0622ace3bc03e3440e97b757dbce2dda93cc67cfc1554
base_revision: 5d0d9ab0296e7150cfbdd7ab263d304eeab06fdb
verdict: FIX_BEFORE_SHIP
---

# Spec Peer Review — Round 01

Post-review disposition, 2026-09-12: both findings were resolved by the user's narrower direction in [ADR-002](adrs/adr-002.md), now incorporated in the active spec and verification. Native calls themselves own content associations; default MZ/provider loading replaces the extra readiness/Retry requirement. The user did not select a Bridge content dispatcher or a project image-wait command. The original findings, verdict and fingerprint below describe the reviewed input before those amendments; they are not a fresh verdict on the amended documents.

Two technical contract gaps need correction before implementation task decomposition: configurable content references have no defined execution binding, and scene-local image readiness/Retry has no permitted integration surface. The accepted product direction does not need to be reopened wholesale.

This is a review of the approved specification, not a runtime defect reproduction or game-delivery verdict. The parent reviewed authority, editor authorship, presentation, assets and verification. An independent native subagent reviewed saves, checkpoints, interpreter lifecycle and reading controls, then challenged both findings. No additional finding survived that review. No game execution, test run, save mutation or implementation edit was performed. The approved inputs remain unchanged; this report is the only repository addition made by the review.

## Coverage

“Clear” below means no additional contract defect was identified; implementation and human acceptance remain pending under [verification.md](verification.md).

| Lens | Sources reviewed | Verdict |
| --- | --- | --- |
| Player behavior and scope | GDD §§1, 3.7, 19, 25–26; spec RQ-001–RQ-018; interview conclusions; ADR-001 | Clear: the latest GDD amendment explicitly supersedes file policy, reading controls and visual restoration. Preload and unresolved creative approval remain excluded. |
| Authority and disciplines | All five discipline contracts, ADR-001, GDD, project directives, native bust baseline | F-001/F-002: the technical mechanisms are not fully assigned within the approved boundaries. No additional authority conflict found. |
| Native authoring and data | Programming command table; native command117; current Common Events; active plugin metadata | F-001: configured references and literal native calls need one execution binding. |
| MZ runtime and lifecycle | Programming lifecycle; native managers/interpreter; current Bridge and CampaignRules; provider metadata/source | F-002 for late image loading. Initialization, explicit reading completion and stale-action protection have defined owners. Native actor party, HP and battles remain outside campaign truth. |
| Saves and compatibility | RQ-012/013; programming §§State, saves and native lifecycle; SaveCore/EventTitleScene; native save contents; V-011/S09/S09E | Clear: locked/current file routing, one asynchronous write, checkpoint resumption, failure preservation and the limited legacy compatibility promise are explicit. |
| Reading, input and scenes | RQ-005/010/011/016/017; narrative and UI/UX contracts; ExtMessageFunc; V-009/010/014 | Clear: observational history is separate from domain progression; AUTO support is explicitly an adapter integration obligation, not an invented vendor command. HIDE, confirmation, movement/menu policy and credit cleanup have owners and sensors. |
| Presentation, audio and assets | Technical Art/audio contracts; current Bridge crop and ME hooks; MessageCore/PictureChoices/VNPictureBusts; V-005–V-008/V-012 | F-002. Otherwise clear: all active crop consumers, prepared portraits, death captions, one-time fades, reduced motion and live ME volume are included. Layout values remain authored in events. |
| Verification and QA | Verification matrix/scenarios; canonical suite layout; current recovery/accessibility QA scenarios | Clear plan, with F-001/F-002 requiring sharper variants in S03/S06. Fixtures, directed gameplay, visual/audio observation and human approval remain distinct; old PASS results do not certify this migration. Export includes dynamic assets without a replacement mandatory manifest. |

## Findings

### F-001 — Define how a configured Common Event reference controls native execution

- Severity: high (P1).
- Source: [programming contract](eventbridge-minimal-runtime.programacao.md), lines 28–41; [spec](spec.md), RQ-002/RQ-003, lines 34–40.
- Evidence: ConfigureHero/Encounter/Scene select Common Events as the single source of content associations. The execution contract then requires ordinary native Call Common Event branches, and both the map entry and interactive dispatcher must reach the same content. In the installed engine, `Game_Interpreter.command117` reads `$dataCommonEvents[params[0]]` directly and starts that list (`rmmz_objects.js:10124–10129`). It does not resolve a configured role or a variable containing an event ID. Query returns data; the proposed command table does not define the operation that connects that data to execution. F12's choice-to-branch adaptation does not specify this Common Event binding either.
- Consequence: changing Gorvak's configured conversation from one Common Event to a newly authored one can leave the map entry or interactive dispatcher calling the old literal ID. Adding a second manually maintained mapping would violate RQ-003. A generic dispatcher could solve the problem, but its contract cannot be inferred from “ordinary native Call Common Event branches.”
- Contract correction: specify the authoritative association and the supported editor operation that resolves it into a native interpreter call, including how the named map entry and runtime dispatcher share it. Preserve whole native event execution, without restoring command slicing, mandatory comments or generated revision files. Do not require the author to synchronize a second ID or edit JavaScript when changing the selector.
- Verification correction: refine V-003/S03 to create a new standalone conversation Common Event, change only the supported association, and verify that the map authoring path and in-game conversation resolve the new unit. Check that the old unit is not executed and that reading identity/completion follows the documented binding.
- User decision: incorporated through ADR-002. Keep direct native Call Common Event routing and remove the duplicate Configure* content references; do not add Bridge content dispatch.

### F-002 — Assign scene-local image readiness and native Retry to an allowed surface

- Severity: high (P1).
- Source: [spec](spec.md), RQ-009, line 64; [programming contract](eventbridge-minimal-runtime.programacao.md), lines 18 and 45–57; [technical-art contract](eventbridge-minimal-runtime.technical-art.md), line 20.
- Evidence: RQ-009 removes both the global Bridge readiness pause and its bust-command interception, while retaining explicit, editor-accessible readiness waits and missing-file/Retry behavior. The adapter's enumerated scope has no loader-readiness operation. The native engine checks `ImageManager.isReady()` in `Scene_Base.isReady` (`rmmz_scenes.js:36–41`), while `SceneManager.updateScene` uses that readiness gate before scene start, not during ordinary updates (`rmmz_managers.js:2143–2154`). `Sprite_Picture.loadBitmap` only requests the bitmap (`rmmz_sprites.js:2972–2974`); the native error-to-Retry path is `ImageManager.isReady` → `throwLoadError` (`rmmz_managers.js:988–1006`). The installed VNPictureBusts graphic-change path uses a load listener (`VisuMZ_2_VNPictureBusts.js:3554–3564`), and its documented wait is for animation, not bitmap readiness. The existing Bridge explicitly supplies the active-scene error/readiness check being deleted (`Dryland_EventBridge.js:1473–1477`). No replacement event command is identified by the spec.
- Consequence: a picture first requested by a later conversation or graphic change can lack an immediate native Retry path after those hooks are deleted. An author also has no specified non-JavaScript operation for waiting on that particular image. An implementer must either expand the currently delimited adapter, retain the rejected global hook, or weaken RQ-009. Merely waiting until `bitmap.isReady()` is true would not handle a failed load.
- Contract correction: name the installed operation that satisfies both readiness and error propagation, or explicitly include a narrow event-invoked operation in the presentation adapter. Define its selected image/picture, owning interpreter, completion on actual readiness, native LoadError/Retry delegation and cleanup. Preserve the removal of global scene pauses, command interception, asset registries and preload. This finding concerns the approved RQ-009 behavior, not the excluded preload issue.
- Verification correction: refine V-008/S06 to request an uncached picture after the map scene has already started, delay or fail that exact request, exercise native Retry, and verify correct event continuation. Include graphic replacement and a case where unrelated image loading does not impose a global wait. Startup-only missing-file checks cannot prove this contract.
- User decision: incorporated through ADR-002. Investigate MZ/CoreEngine support and use the RPG Maker default if unavailable. Inspection found preload without a per-image readiness wait, so the default applies; no project wait command is added.

## Clear lifecycle findings and residual risks

SaveCore's installed metadata supports the selected `locked`/`current` settings, and EventTitleScene contains its corresponding New Game integration. The specification correctly requires preserving the actual file ID and arguments around any promise observer. Native save contents include Game_Map, Game_Screen and Game_System but exclude Game_Message; the specified checkpoints precede the next reading/choice, so that native omission is not itself a spec defect. Programming also explicitly prohibits the resumed checkpoint from repeating the decision or immediately writing again.

Existing post-reading checkpoints remain covered by RQ-013 and the preservation of semantic passage identities, including `council.01`. Observational conversation history may be stored per campaign without invoking COMPLETE_PASSAGE; campaign reading facts remain owned by the domain. The lack of a public AUTO permission command is already acknowledged and assigned to the presentation adapter, so it is an implementation risk rather than an additional missing-owner finding.

Fresh native evidence is still required for provider AUTO/FAST reset, Options/Continue composition, save promise handling, rolling-credit cancellation, HIDE/input interaction, audio and prepared memorial framing. This review does not infer their success from source inspection. Final creative approval of existing provisional content remains separate. The Gorvak editor-to-runtime devlog demonstration remains appropriate after implementation.

## Frozen inputs

The aggregate fingerprint in frontmatter is SHA-256 of the following ordered entries, serialized as `<sha256><two spaces><repository-relative path><LF>`. The first eight paths are relative to `planos/tasks/eventbridge-minimal-runtime/`; the final two are repository-relative. Supporting tracked runtime sources and the historical native bust baseline were read at `base_revision`; the initial tracked diff contained only the GDD amendment. The unrelated speaker-scale interview and all pre-existing working-tree edits were preserved.

| Input | SHA-256 |
| --- | --- |
| adrs/adr-001.md | 41f9901043e003198a0edf71db556bc16bb7b4be9a395d04cda3a3375934813a |
| eventbridge-minimal-runtime.audio.md | 17162e5e21e6d0aac12f058ba002eb45463657f9f1f28fdc33c38c326740ce03 |
| eventbridge-minimal-runtime.narrativa.md | c66c4d71c08bc4f038dc646e6ea0e7252cd616d995c92ee537d692bad2e3f64a |
| eventbridge-minimal-runtime.programacao.md | 676651cb091e017dcbe4ca7895b696aff5947743927a6fbec47ad38d950be75d |
| eventbridge-minimal-runtime.technical-art.md | 3c56f252927d3f1caaf43b8551611610e9d85f99eb9680964c4303c934f2085e |
| eventbridge-minimal-runtime.uiux.md | d1f833455a23c20140850ab8fe8b04787159a5aca2f30bd18614e4683bb4b487 |
| spec.md | 56ce3b64c528dde9eaca82743e008ffddfb1eebaf867747913beaa8d5d57e434 |
| verification.md | 37fcff6ad10c1c6cbf94eed16ff82d591f9602374472f60a98deab9d67aec90e |
| docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md | 5da25060500e8fb282eef0556ee1a46f1e672fdc098e662d7798ec0c81eafdd5 |
| docs/design/2026-09-12-eventbridge-runtime-e-entrevista.md | 0ee05612a21505ab54c6be393665322182eb4a18bbd37a2185c54052c26f80fb |

## Incorporation

F-001/F-002 were initially proposals. The later user direction selected direct native calls and the native/default loading policy, now incorporated through ADR-002. The proposed extra dispatch/wait commands were not accepted. Preserve this round's original fingerprint as history; any subsequent independent review must freeze the amended inputs anew. The amendments changed documentation only and did not advance runtime readiness flags.
