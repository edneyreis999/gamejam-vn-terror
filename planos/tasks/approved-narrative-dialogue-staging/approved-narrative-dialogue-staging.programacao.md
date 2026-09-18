---
status: approved
approved_on: 2026-09-18
owner: Programação
---

# Native integration and lifecycle design

Owns the implementation of the confirmed requirements in [spec.md](spec.md). The user approved this technical design as part of the complete spec set; implementation remains pending. Reuse the [current native architecture](../eventbridge-minimal-runtime/eventbridge-minimal-runtime.programacao.md), with no engine/vendor source edits, new package, service, build, runtime catalogue of prose or mandatory editorial validator.

## Affected ownership

| Owner | Required delta |
| --- | --- |
| `Dryland_CampaignRules.js` | Import PR #19's six prologue identities; add the two route-closing reading scenes and their finite transitions; reorder Council's existing semantic plan; keep validation and plan construction aligned. Preserve party, approaches, competencies, RNG, deaths, ending rules and eligibility. |
| `Dryland_EventBridge.js` | Preserve Query, CaptureContext, ReadingComplete, Action and checkpoint coordination contracts. Existing scalar queries can express this design; no new content dispatcher, automatic renderer or temporal campaign flag is required. |
| `Dryland_Presentation.js` | Preserve reading permission, HIDE, input, reduced motion and volume integration. No change is planned beyond any directly demonstrated source-PR integration need; do not move event presentation into this adapter. |
| `js/plugins.js` | Compose PR #17's VNPictureBusts anchor/scale defaults with PR #19's enabled AttachedPictures and empty automatic picture list. Preserve plugin order and unrelated parameters. |
| Map002/event001 | PR #19 script/reading/transfer; PR #17-style adapted staging and native temporal audio. |
| Maps037–044/event001 | Calibrate each hero's menu, main conversation, selected response and full-party response; preserve observation IDs 82–113 and all formation actions. |
| Map004 → CE040/046/303 | Route and discovery orchestration; dispatch the new closure reading scenes through direct native calls. Keep CE049/050/051/052 and their real consumers. |
| CE263–265, CE282–289, CE292–299, CE302 | Existing speaking thresholds, sacrifice farewells, lover scenes and final map-revelation line; adapt applicable bust entrance/focus/exit without rewriting prose. |
| Map023 and CE068–079 | Council source replacement, temporal cuts and per-portrait ensemble/reflection focus; retain actual occupied slots and native exit helpers. |
| Maps025–027 | Approved ending text, current full-screen ending art, existing native outcome flow. |
| Maps029–036 | Approved epilogue text and whole-image artwork, removing only the superseded epilogue bust commands/attachments. |
| Maps007–016 | Replace 30 success paragraph bodies; preserve branch grammar, choices, same-art presentation and untouched prose. Maps017–022 keep their content. |
| CE067 and native scene commands | Explicit current-time music/ambience and retained ending/effect ownership; see audio contract. |
| CE351 | Keep native tavern preload consistent with imported tavern/portrait references where they belong to its existing scope; no global preload expansion. |
| Assets / source docs | Import approved art, convert Liora losslessly to PNG, retain original provenance; synchronize the epilogue sections of the eight hero sheets. |
| Tests and QA | Extend canonical owners and update related source-PR consumers; do not add a separate test suite for this spec. |

The dialogue inventory is broader than the eight hero maps: thresholds, farewells, lovers, map revelation and Council are included above. Anonymous encounter/death/memorial text does not gain a bust. Retain all helper consumers before deleting anything. Common Event vacancies use native empty records; do not compact arrays, reuse saved observation identities or restore the old nonzero-null-slot editor defect.

## State inventory

| Fact | Authority and lifetime | Use in this increment |
| --- | --- | --- |
| Phase, route progress/completion, map pieces, medallion, party/deaths/climax witnesses | Existing serializable CampaignRules state in Game_System | Sole source for progression, reward timing and participants. |
| `reading.sceneId/passageIds/index`, `seenPassageIds`, sequence/history | Existing campaign state; persisted by native saves | Own semantic passage completion and FAST eligibility. Keep prose in native events. |
| Observation-unit reading history | Existing Presentation state in Game_System, per campaign file | Retain hero IDs 82–113, distinct from campaign reading. |
| First/second initial closure | Derived from the committed initial-route/map-piece count at lover completion | Choose `closure.first` or `closure.second`; no second stored route counter. |
| Present/past, speaker, scene composition | Native event position and current passage; images in Game_Screen | Derive presentation at its authored boundary. No persistent `isPresent`/`isPast` booleans or duplicate campaign mode. |
| Audio descriptors and volume preferences | Native AudioManager, game audio save descriptors and Options | Native scene cues and existing save/restore; no project audio scheduler. |
| Current interpreter, pictures and attachment commands | MZ/installed providers; saved/restored natively where applicable | Explicit scene ownership and cleanup. Do not serialize a second interpreter/sprite snapshot into campaign state. |
| In-flight save/input/focus animation | Existing engine/provider/coordinator ownership | Await the actual operation and dispose or settle at the proper boundary. No fixed-delay workaround or extra campaign flag. |

## Reading transitions

1. **Prologue:** retain `prologue.rheed.01`–`.06` from PR #19. Each passage may own multiple native boxes; only the last acknowledgement calls ReadingComplete. The final passage enters formation once. Tavern returns never execute Map002 again.
2. **Initial completion:** preserve the existing `lover.<route>.first/second` plans and piece grant at their completed boundary. Instead of immediately selecting `irati.02`/`map.reveal`, select `closure.first`/`closure.second`, each containing one new passage `<scene>.01`. After its completed narration, continue to `irati.02` when one piece exists or `map.reveal` when two exist; their current completion still returns to formation. Both closures stay in `dungeon_complete`. Extend that phase's expected-reading validation explicitly.
3. **Council:** build one plan from `council.01/.02/.03`, exactly one existing challenge/solo identity, confession, Andirá, eligible opinion IDs and finally `irati.03`. Share this plan construction between entry and validation so the two cannot drift. Keep `council.01`'s existing medallion grant/checkpoint meaning. Source wording and scene ownership follow the narrative contract.
4. **Endings, epilogues, successes:** preserve existing semantic identities and mechanics. Native box counts may change; passage completion stays at the end of its actual body. Two ending passages cover all source paragraphs; a hero epilogue remains one passage across all its source pages; a trap success remains one passage across its longer paragraph.

Stable reading identity is the existing semantic contract, not a content fingerprint. Do not introduce text hashes, revision gates, new read-history stores or wholesale ID renaming merely because prose changes. New Game starts with no seen passages. The source prologue deliberately has new identities; this increment adds only the two genuinely new closure identities. Old-save compatibility is limited below.

## Interpreter, presentation and audio boundaries

Capture the current passage/sequence on the same interpreter that owns its eventual ReadingComplete. Directly called native presentation helpers may compose images/audio; they must not complete their parent's passage or run domain actions. After completion, refresh projected queries before selecting the next passage. Preserve the existing rejection of stale or repeated actions.

Keep one active native execution path per scene. A map transfer must finish the source route before the destination autorun takes ownership. A temporal cut inside a scene needs no extra map, phase or domain action: explicitly retire outgoing pictures/attachments, compose black plus older Rheed or the past scene, and select its audio context. Preserve stable participant positions when returning to Council. Do not reconstruct by replaying past narrative/actions, and do not reintroduce the retired Bridge prefix renderer.

Use native helpers only where they have real callers. Allocate any new Common Event IDs from the final integration checkout, checking PR deltas first; keep unrelated IDs/formatting and native command grammar intact. No Common Event number is a portable constant in this design. Native entry/focus/exit timings must consult reduced motion; normal PR #17 transitions use the source's 20-frame style and reduced motion settles immediately.

Consecutive boxes with unchanged composition retain it. Options/HIDE preserve the actual native interpreter, pictures and player audio settings; neither entry nor restoration repeats applause, a reward, an opinion or a committed result. Current-checkpoint Continue relies on native serialized state and explicit next-boundary composition, not an automatic replay of scene prefixes.

## Saves and checkpoints

Preserve SaveCore's current-file ownership and semantic checkpoint reasons. The initial-route piece grant still requests `reward` before its new closure; medallion discovery still requests `reward`; encounter/action/consequence, Council and ending checkpoints retain their established meanings. No narrator appearance, extra text box, hero visit, Settings return or temporal cut adds an autosave. Await the existing coordinator before relinquishing execution ownership.

Delivery coverage is New Game plus saves earned by the integrated version, consistent with the included PR #19's accepted save scope. Earlier saves stay untouched and native loading remains available without a revision block, conversion, reset or automatic new campaign. Changed serialized event lists and prologue plans mean compatibility with earlier versions is not guaranteed; do not claim that loading them will show the replacement text. No legacy-save migration is proposed.

Continue resumes the last successful checkpoint, not necessarily the current visible line. The existing `new_campaign` checkpoint can precede completion of the prologue until another semantic checkpoint is earned. Replaying unsaved reading from that earlier boundary is not the prohibited replay on a normal tavern return. Applause must not be triggered merely by a restoration helper; the saved native interpreter determines whether its original welcome command had been consumed.

Test current-version checkpoints before/after route reward, Council discovery, approach result and ending, plus two campaign files. A replay may repeat unsaved text but must never grant the same committed reward or repeat a committed approach, death or final choice. Save failure preserves the last successful file through native handling; no new repair layer or deletion policy is introduced.

## Failure, cleanup and integration procedure

Use structured data edits with preconditions and focused diffs, recorded in task-local transformation scripts after approval. Compose sources against their pinned revisions; never replay an old migration script blindly over a newer combined event list. Source histories and their reported QA remain history, not proof of this integration.

Keep native missing-asset/Retry behavior. Do not fabricate a text-only fallback, silently skip an absent paragraph or claim a missing portrait is an empty participant slot. Wrong passage association or absent required source content is an integration defect. Preserve rejected-action behavior and check that no partial reading marks content seen or advances campaign state.

Delete only superseded executable prose/staging and now-unreferenced helpers proved to belong to this change. Preserve old source assets and historical specs unless a separately scoped, consumer-checked cleanup is approved. No engine/vendor deletion, broad refactor, map-tree reorganization or optional tooling project belongs to this increment.
