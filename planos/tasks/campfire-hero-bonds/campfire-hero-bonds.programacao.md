---
status: draft
owner: Programação
---

# Programming contract

Owns RQ-001–008/011 in [spec.md](spec.md), with presentation boundaries from the UI and art contracts. This is a design, not implemented code.

## Baseline and placement

The current native game uses Dryland_CampaignRules for pure validated transitions, Dryland_EventBridge for action/query/checkpoint integration, and Dryland_Presentation for native reading and input. Campaign state is serialized under `$gameSystem._dryland.campaign`; observational reads currently use `$gameSystem._drylandReadUnits`. Respect those owners. Maps 037–044 own hero menus; Map045 exists and has no events. CE003/038/045/348–351 own tavern entry/absence and CE067 owns context audio.

No new dependency or state library. Modify game-owned plugins only. The new `Dryland_2_ConversationIndicators.js` extends the active `Coreto_1_MessageCore` choice-window presentation, preserves previous methods and loads after Coreto plus Dryland_Presentation. Do not edit/regenerate Coreto, activate ItemsEquipsCore or copy its obfuscated implementation. Before authoring, reserve free event/variable/picture IDs against the actual native database; put allocated names in native data, not a second maintained registry.

## State inventory

| Fact | Owner/lifetime | Rule |
| --- | --- | --- |
| Dead IDs, party, route, position, assignments | Existing campaign state | Single authority; camp does not copy the roster |
| Witnesses of a death | `deathLocations[heroId].witnessHeroIds`, campaign | Snapshot living expedition peers immediately before sacrifice, excluding the victim; no inference from the current party |
| Completed social units | `completedSocialUnitIds`, campaign | Stable IDs for base conversations, interjections, grief, tavern openings/bridges/bodies; no translated text |
| Active social topic | `activeSocialTopicId`, campaign, nullable | Guards start/completion; rendered unit IDs derive from this topic and immutable context during dialogue |
| Recent-loss reference | `campDeathBaseline`, campaign integer | Dead-count at departure or most recently completed camp arrival; deaths are monotonic |
| Camp lifecycle | Existing `phase`, extended with `camp_arrival` and `camp` | Keep resolved position 2/4 until Continue; no independent pause index |
| Existing Talk read state | Existing `_drylandReadUnits` | Reuse actual ObservationBegin/Complete unit IDs; do not duplicate in the new social list |
| Tavern acknowledged absence | Existing native switches/effect ownership | Independent of camps; retain current lifecycle |
| Choice index → topic and label context | Current interpreter/message/choice window | Transient configuration; native interpreter owns in-flight execution, not a separate dialogue cursor |
| Name lists, tone, eligible topics, unread marker | Derived queries | Never independent saved truth |

Initialize new fields in new-game state and extend validation, snapshots and candidate round trips consistently. Use the next campaign state version for the changed schema; no old-state converter or content revision gating. The existing native load route remains; old files are unsupported and untouched, rather than claimed compatible. Document a new campaign in delivery notes.

## Domain interfaces

Extend the existing action/query command metadata so the editor can author the feature without arbitrary state mutation.

| Action | Guard and result |
| --- | --- |
| Existing post-consequence transition | After successful result or completed death at position 2/4, living party required; enter `camp_arrival` with the selected narrator reading. Total-loss/automatic-retreat handling takes precedence. Do not reveal the next trap. |
| Existing COMPLETE_PASSAGE | Completes camp narrator reading and leaves `camp_arrival` with no active reading; native fade and grief can follow. Do not advance trap position. |
| START_SOCIAL_TOPIC `{topicId}` | Only an eligible topic at formation/camp, or an automatic grief topic during `camp_arrival`; no active reading/topic. Set active topic. Reject unknown, absent/dead or context-ineligible subjects. |
| COMPLETE_SOCIAL_TOPIC `{topicId}` | Must match active topic. Mark exactly the units in its current authored plan; clear active topic. Repeated/stale completion is rejected without a second effect. |
| FINISH_CAMP_ARRIVAL | `camp_arrival`, narrator complete, no active topic and no eligible uncompleted grief scenes. Set baseline to current death count; enter `camp`. |
| CONTINUE_FROM_CAMP | `camp`, no active topic. Advance from 2 to 3 or 4 to 5 once; resume the existing dungeon intro/reveal path. |
| Existing retreat actions | Eligible only at `camp`, no active topic; remove total-living-count minimum. Keep native immediate confirm chain and existing formation transition. |

While a social topic is active, reject departure, hero-selection mutations, retreat and progression actions until completion. Native window controls remain responsible for consuming the actual player inputs. No API is exposed as a player console.

Add queries for camp tone, eligible topic IDs, composed topic unit IDs, topic unread state, pending directional grief IDs, death witnesses and current camp participants. Use separate `ObservationRead`/existing-read adapter for the old Talk topic; Bridge aggregates it with new eligible units for the external marker. `completedSocialUnitIds` contains only completed applicable units; opening a menu is not completion.

Read-unit identities are the base `camp.*`, suffix `interject.*` and reaction `grief.*` scene IDs, plus `tavern.<survivor>.<dead>.witness`, `.away`, `.after`, `.first` and `.body`. The three numbered body rows share the `.body` read unit; localization keys retain individual row suffixes. Validate IDs and pair/route membership against the supported metadata, not translated strings.

For new social units, query `socialUnitRead` into a native output switch before each segment, call existing Dryland_Presentation `ReadingPermission`, and call `ReadingEnd` at its end. This resets FAST at boundaries and prevents skipping an unread suffix or bridge. Commit the applicable units together only at COMPLETE_SOCIAL_TOPIC after the complete conversation. Do not call ObservationComplete or add a second read flag for these units. The old tavern Talk keeps its existing ObservationBegin/Complete lifecycle.

Route/topic mapping: internal `physical` → narrative `church`, `supernatural` → `park`, `final` → `village`. These identifiers never become player labels. Narrative section IDs plus numbered lines provide the localization-key prefix; fixed pair metadata contains identities and topic references only, never prose.

## Selection and replay

Tone: if dead count is zero use `arrival.none`; otherwise if greater than `campDeathBaseline` use `arrival.recent`; otherwise `arrival.prior`. Set the reference at every DEPART, including changed routes/parties. Narrator read completion uses the existing passage-read mechanism so its repeated text can use existing FAST.

A base camp topic is tied to hero, destination and pause. Append only the one interjection explicitly mapped to that topic, when its companion is living and present. Completing the topic marks its base plus the actually displayed interjection. If the companion was absent, the interjection stays unread and can later make the available topic new. Do not generate variants for arbitrary trios.

Tavern grief composition is: exactly one witnessed/away opening; exactly one already-reacted/not-yet-reacted bridge; fixed body. Witness status is a death fact, not current presence. The prior-reaction bridge is selected from completed `grief.<survivor>.<dead>`; changing that fact can reveal one new bridge. Completing the subject marks only its selected opening, selected bridge and body. On repeated reading, replay the whole currently valid subject. Keep the topic visible after reading.

Automatic camp grief enumerates all canonical directional pairs with living present survivor, dead companion and incomplete reaction. Sort by survivor H1–H8 then companion H1–H8. Complete and checkpoint each scene before starting the next. A tavern subject never consumes the separate camp reaction.

## Native event ownership

Map045 owns actual arrival/menu events, existing camp image and explicit cleanup. Arrivals use the current colored older-Rheed presentation, then a native transfer/composition to camp. Use scene context, not map arrival alone, to distinguish a true campaign arrival from return from a hero map. Native `camp_arrival` dispatch runs narrator/fades/grief once per actual arrival; `camp` returns directly to the menu.

Extend Map037–044 with an explicit return-context variable set before transfer: tavern or camp. Keep dialogue and menu authoring there; choose background/available actions from the context. In camp, living active-party heroes only, one current base topic, no Select/Remove. In tavern, existing Talk/formation plus up to two About subjects. Back returns to the correct menu and restores focus. The native context variable is presentation routing, not an alternate campaign phase.

Use named Common Events for the three shared arrivals and reusable grief units. Keep base dialogues in their owning hero map events. Preserve native child-interpreter waits. Player text is exclusively `$[key]` with speaker metadata and approved wrappers; maintain one Show Text unit per authored utterance unless native wrapping requires boxes. Do not bake prose into JS.

Keep tavern CE348's acknowledgment separate from camp: camp fades use `deadHeroIds` on every genuine arrival and never touch tavern acknowledgment switches. All eligible dead images fade together, never serially. No timers or Pixi objects enter domain save state.

## Checkpoints and restoration

Extend Bridge checkpoint reasons with `camp_entry`, `camp_arrival_complete`, `social_complete` and `camp_exit`, validating allowed phases and native message-idle boundaries. Retain the current-file SaveCore mechanism, promise guard, error handling and successful-sequence reporting.

1. Resolve the trap once, enter `camp_arrival`, checkpoint before its narration; this preserves committed death and position.
2. Finish narrator reading, native fade and each automatic reaction. For each reaction, record completion, then checkpoint at an interpreter continuation which proceeds to the next eligible reaction rather than repeating completion.
3. FINISH_CAMP_ARRIVAL then checkpoint before free interaction.
4. For new optional social topics, complete after the final utterance and ReadingEnd, then save before returning to the menu. Existing tavern Talk keeps its ObservationBegin/Complete lifecycle and is persisted with the next normal successful save; do not add a Talk-only checkpoint, observation revision, dirty flag or change sequence-based deduplication for it. The user accepted that reloading before that save can restore its previous NEW/FAST state; see [F-001 disposition](review-01.md#user-disposition--2026-10-16).
5. Continue/retreat commits the destination transition and uses a matching exit/consequence checkpoint. Never save the old phase with the new transfer intent or increment twice on load.

Load restores the saved native interpreter/pictures and domain state. Do not restart autoruns, recalculate a different dialogue branch, replay command prefixes or create custom asset polling. An unfinished topic at a prior checkpoint may replay; completed units saved successfully do not become new. Failure to save uses existing native feedback; do not mark persistence successful or silently reset the campaign. Prototype verification must actually exercise boundary resume, not only serialize the state object.

## Verification ownership

Extend existing formation/retreat/encounters/persistence/native-checkpoint suites where they own the invariant. Test phase guards, exact position progression, eligible speakers, consumed units and load round trips. Keep full text and visual coordinates out of assertions. The [verification matrix](verification.md) owns directed walks and artifact freshness.

## Presentation refinement — 2026-10-16

ReadingPermission/ReadingEnd remain per unit, but bust entry/exit belongs to the conversation lifecycle. Main participants remain through tavern opening/bridge/body and camp base/interjection. Use authored Talk transforms, stable slots, native focus commands and explicit scene cleanup; no new campaign state or dialogue renderer. Portrait indicator bindings now target native Dryland_Tag pictures (30–37) in both scenes.
