---
status: approved
slug: campfire-hero-bonds
stage: surface-and-technical-design
product_decisions: confirmed-in-session
technical_approval: approved
approved_by: Edney
approved_on: 2026-10-16
editorial_approval: pending
implemented: false
---

# Campfire conversations, party bonds and remembered losses

## Objective

Give the player time to care about individual heroes and notice their absence, using the existing camp illustration, optional conversations and short grief scenes. Emotional effectiveness is a human judgment, not an automated-test result.

This increment specifies the complete feature and its complete bilingual writing proposal. The user approved this specification on 2026-10-16 ("a spec campfire-hero-bonds esta aprovada"). Product decisions and the detailed technical design are approved. Editorial acceptance of the bilingual dialogue and acceptance of the implemented presentation remain separate. This approval records the specification baseline; no implementation, task graph, commit, publication or tracker change has been performed.

## Scope

Six camp visits in a completed route sequence; camp-only voluntary retreat without a living-roster minimum; all 48 base conversations; eight authored pair interjections; three shared older-Rheed arrivals; 16 directional camp grief reactions and 16 tavern grief subjects with contextual openings; unread indicators and independent NEW labels; native staging, local fire ambience and candidate-save persistence. See [player stories](_user_stories.md).

## Exclusions

New illustrations, new music, relationship scores, combat, competencies, randomization changes, formation changes inside a route, new bilateral arcs, altered endings, old-save migration, runtime dependencies or remote services. Coreto and supplier/engine code stay frozen. Items and Equips Core is a visual reference, not a dependency. No task decomposition or game writes belong to this specification delivery. Gamepad, native zoom and mobile testing remain excluded under existing policy.

## Part I — Player behavior

### RQ-001 — Pauses at known milestones

Church and Park use 2 traps → camp → 2 traps → camp → 1 trap → destination. Village uses 2 → camp → 2 → camp → 2 → Council. Resolve the preceding consequence completely before entering camp. Losing the last expedition hero routes to the existing automatic retreat or total-loss ending instead. A camp never reveals, assigns or resolves the next trap. Returning from a hero interaction or Options does not create another arrival.

### RQ-002 — Voluntary retreat at camp

Offer Continue and Return to tavern at camp with one, two or three living expedition heroes, regardless of reserves. Remove voluntary retreat from route introductions and trap choices. Keep native immediate retreat, without adding a confirmation dialog. Retreat resets the attempt to the first trap, preserves assignments/deaths/greatest progress and permits normal formation in town. Completed routes remain unavailable. Automatic retreat and terminal completion remain unchanged.

### RQ-003 — Optional, repeatable conversations

Each living present hero offers A at the first camp of that destination and B at the second. The player can hear all, some or none. B stands alone without A; do not queue missed A at B or invent additional text. Repeated attempts offer the same authored topics with their retained read state. Each conversation works without another recruit; an eligible pair interjection is an optional authored suffix, not an interchangeable-speaker template. No absent or dead hero speaks.

### RQ-004 — Three older-Rheed arrivals

Use exactly three shared narratives, in older Rheed's existing colored presentation before the camp: no deaths anywhere in the campaign; new death since departure/the previous camp in this attempt; older losses without a new death. At departure reset the reference for recent deaths, not campaign grief. Thus a replacement expedition with no new deaths uses the third opening. Openings have no route, named-victim or party-combination variants. Replay the matching short opening at each genuine arrival; existing FAST permission applies only to previously completed content.

### RQ-005 — Remember all dead heroes

Every genuine camp arrival briefly displays every dead recruit in the campaign and fades them simultaneously for three seconds (180 native frames), including losses from previous attempts. Show only the active party's living heroes. Never offer dead pictures as choices. Reduced motion shows empty positions immediately. At the tavern, use the same three-second duration and retain each death's independent first-return fade, regardless of which expedition caused it or how many camp fades have played. Subsequent tavern visits do not repeat already acknowledged losses.

### RQ-006 — One camp grief scene per directional bond

After the arrival and fades, each living present hero with a dead canonical companion gives the corresponding short special scene once per campaign. Death need not be recent or witnessed. Present all pending reactions in stable H1–H8 survivor order, then H1–H8 dead-companion order. Consume a reaction only after completion; returning later with a different survivor can unlock that survivor's reaction. This is automatic; ordinary camp conversations remain optional. These scenes describe absence without claiming to have witnessed the death.

### RQ-007 — Tavern subjects about companions

Add a separate About <hero> / Sobre <herói> subject for each dead canonical companion of a living tavern hero, independent of recruitment. Use the authored witnessed/away opening and prior-camp-reaction bridge, then the fixed subject body. Do not present the subject before the death. Preserve Talk, party selection/removal and return controls. The subject stays available after reading. A later eligible contextual bridge is new content even if the body was read previously.

### RQ-008 — Honest unread signals

A static external conversation indicator appears while the hero has any currently available unread content. Inside menus, use a separate localized NEW! / NOVO! label, not text appended to the option. Focus/opening a menu does not consume content; completion does. Unavailable future topics do not produce markers. Read state is campaign-local and language-independent. If a previously absent companion now contributes an unread interjection, the topic is new again for that actual segment; repeating the old body does not erase or hide the new segment. Keep unread feedback distinct from selected-party and input focus feedback.

### RQ-009 — Reading and presentation

Use the existing camp image and portraits/busts; living heroes remain clickable with keyboard and mouse. Ivaí and young Rheed enter dialogue using the existing bust conventions; older Rheed does not remain in the past scene. Preserve message pacing, speaker names, HIDE, Options and FAST restrictions. End-input cannot also select the next topic or departure. Clear only scene-owned visuals on transfers; do not reconstruct an interpreter by replaying earlier commands.

### RQ-010 — Camp audio

Older-Rheed arrival uses the current narrator context. At the camp transition, fade out route/narrator music and ambience; use only existing Fire1 BGS as the initial authored candidate, without new audio assets. Restore the relevant route or tavern context on exit. Honor native volume controls, mute, Options and save/load. Listening approval is separate from the selected-file baseline.

### RQ-011 — Candidate saves

This version requires a new campaign; preserve older files without conversion or compatibility claims. Candidate saves retain deaths, witnesses, camp position, completed content and grief reactions. Save at semantic arrival, arrival-completion, completed conversation/reaction and exit boundaries. A reload must not reapply a sacrifice, increment two trap positions or repeat a completed reaction. Incomplete conversations remain unread; at a previous successful checkpoint they may restart. Do not add saves after every text box or a content-revision gate.

**Accepted exception — 2026-10-16:** existing tavern Talk retains its current persistence behavior. Its read history is included in the next normal successful save; reloading before then may show NEW again and remove FAST permission for that conversation. The user considers this scenario unlikely and its impact small, and explicitly chose no additional persistence mechanism or dedicated regression case for it. This exception does not change the checkpoints for new social topics, grief, deaths or progression. See [F-001 disposition](review-01.md#user-disposition--2026-10-16).

### RQ-012 — Complete authored copy and truthful delivery

The [narrative proposal](campfire-hero-bonds.narrativa.md) supplies all text and branches in PT-BR/EN-US. Preserve reveal order, character voices and thematic expectations of reaching the destination; do not describe unseen destination architecture as a present observation. New small biographical details remain proposals until editorial acceptance. Data loaded by the game becomes the sole live text source after integration; the draft is historical approval material, not a continuously synchronized oracle.

## Authority map

| Source | Owner/status | Governs | Change |
| --- | --- | --- | --- |
| [Canonical GDD §28](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#fogueiras-vinculos) and [GDDR index](../../../docs/gddrs/AGENTS.md) | Product; accepted decisions | Scope, grief, retreat, novelty | Incorporate GDDR-005/006 follow-ups |
| Session of 2026-10-16 | User; explicit answers and approved writing plan | Unrestricted camp retreat; repeated camp fades; once-per-bond reactions; new campaign; fire-only audio | Captured here and in GDDRs |
| Hero sheets plus current Languages.tsv | Narrative; existing characterization/runtime copy | Voices, motivations, eight pairs, current introductions | Existing copy preserved; new proposals in narrative contract |
| [EventBridge baseline](../eventbridge-minimal-runtime/spec.md), [G001–G006](../../../docs/adrs/README.md) | Historical/accepted | Native scene ownership, QA boundaries | Scoped extensions, no historical rewrite |
| [Narrative postmortem](../../../docs/postmortems/2026-09-29-over-engenharia-pipeline-narrativa/2026-09-29-over-engenharia-pipeline-narrativa.md) | Accepted lesson | Runtime text authority; no mirror/oracle pipeline | Observe after integration |
| [Narrativa](campfire-hero-bonds.narrativa.md) | Edney; draft | Complete bilingual copy and branch placements | New |
| [Programação](campfire-hero-bonds.programacao.md) | Edney; design approved 2026-10-16 | State, event/save boundaries and interfaces | New |
| [UI/UX](campfire-hero-bonds.uiux.md) | Pati / user; draft | Topics, input and novelty | New |
| [Technical Art](campfire-hero-bonds.technical-art.md) | Lucas / user; draft | Existing-art composition and absence | New |
| [Áudio](campfire-hero-bonds.audio.md) | User; draft | Native fire-only pause and restoration | New |
| [Verification](verification.md) | Technical evidence + human owners; pending | Requirements, sensors and lifecycle | New |

## Part II — Technical design

### Game surfaces

Use Map045 as the camp scene. Preserve hero-map ownership (Map037–044), adding an explicit camp/tavern return context to their native events. Camp interactions retain the camp background and omit selection controls; returning routes to the existing camp menu without a second arrival. Common Events own reusable narration, audio and grief units, not a new JavaScript dialogue engine.

Extend Dryland_CampaignRules and Dryland_EventBridge as specified in the programming contract. New badge presentation belongs to Dryland_2_ConversationIndicators, loaded after Coreto_1_MessageCore and the existing Dryland presentation dependencies. Keep all Coreto/supplier sources unchanged. Append dialogue localization keys to Languages.tsv only during implementation. Preserve unrelated plugin settings.

### Packaging and unaffected surfaces

The native game remains the sole implementation, with no build step or new service. Register the game-owned indicator extension in `js/plugins.js`; native event references own the camp picture, portraits, fire file and localized keys so the existing `prune-build`/`verify-build` workflow retains what is loaded. Keep the inactive ItemsEquipsCore reference outside runtime dependencies. Existing test tooling is reused. Battles, actor statistics, equipment, final choices and destination rewards do not change.

### Event and save lifecycle

The campaign pauses after resolved position 2 or 4 with a distinct camp-entry state; Continue alone advances to the following trap. Native interpreters own in-progress speech and images. Store source facts once; derive visible heroes, topics, arrival tone and unread flags. Candidate checkpoints must retain the actual interpreter continuation and avoid saving before/after mismatched commands. See the programming contract for exact action/query boundaries and completion ordering.

### Failure and cleanup

Use native asset errors and save failure handling. A failed save does not undo an in-memory completed conversation, but cannot be reported durable; reload resumes the last successful checkpoint. Reject invalid camp transitions without mutating progress. Dispose transient labels with their windows, clear map-owned overlays on exit, and restore normal controls/audio. Keep the existing guarantees for irreversible death and ending saves.

## Acceptance summary

| Requirement | Expected observable | Verification |
| --- | --- | --- |
| RQ-001/002 | Correct milestones, camp-only unrestricted retreat, preserved randomization | V-001, V-002, V-006 |
| RQ-003/007/008 | Correct participants/topics, conditional novelty, replay without false NEW | V-003, V-004, V-007 |
| RQ-004/005/006 | Correct collective tone, repeated camp absence, independent tavern absence, one reaction per bond | V-003, V-005, V-006, V-007 |
| RQ-009/010 | Legible native interaction and correct fire-only/restored audio | V-007, V-008, V-009 |
| RQ-011 | Candidate checkpoint continuity and durable read state | V-004, V-006, V-007 |
| RQ-012 | Complete coherent bilingual proposal and integrated keyed copy | V-005, V-009 |

## Open decisions and acceptance

No unresolved product choice from this interview remains. The user approved the specification and detailed technical contract on 2026-10-16. Editorial acceptance of the authored prose, composition calibration and fire mix remain pending; specification approval does not establish acceptance of the implemented game. The spec creates no implementation or test evidence.

Devlog: camp arrival with absent companions and a survivor reaction, followed by a tavern About subject with its independent NEW label. Capture actual gameplay only after implementation.

### Approved presentation refinement — 2026-10-16

The user approved native nameplates above camp heroes, matching the tavern, with a conversation icon inside both scenes’ nameplates instead of the lower help. The clarified fade duration is three seconds total. New social conversations follow each hero’s authored Talk framing and maintain their interlocutor from the first line across reading segments. Guest interventions preserve continuing participants. See [UI/UX](campfire-hero-bonds.uiux.md), [technical art](campfire-hero-bonds.technical-art.md), and [fresh verification](verification.md#presentation-refinement). This does not approve final editorial/art/audio quality.

### Approved native icon follow-up — 2026-10-16

The subsequent user plan supersedes the inside-plate conversation drawing: use installed IconSet index 04 at native 32×32, centered 4 px above the nameplate in tavern and camp. Names return to centered 18 px text. Preserve static availability feedback, HIDE and presence, and release sprites without destroying the shared IconSet bitmap. See [verification and captures](verification.md#native-icon-above-nameplates). All other presentation and campaign contracts remain as above.
