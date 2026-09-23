# Source and native baseline analysis

Read-only inspection on 2026-09-22. Runtime base: `04d5253e81fcd22ec0c120b9e82bd17d2bf541c1` on local `main`; the working tree was clean at intake. Source: PR #25 revision `280b92a489959728cb63cd57625d8621cb495cca`, available in local Git objects and frozen in [source-catalogue.md](source-catalogue.md). No network fetch, merge or runtime write was required for this authoring pass.

**Historical inspection:** test-expansion recommendations below describe the initial plan. D-005/D-006 and [ADR-003](adrs/adr-003-proportionate-prose-verification.md) supersede them; current requirements are static correspondence/structure and 1280×720 visual inspection. Native ownership and frozen source facts remain applicable.

## Facts versus requested outcome

**Observed:** PR #20 integrated thirty successes from PR #18, for A1–A8/B1–B2. The current game still contains those thirty paragraphs, with presentation-only line breaks. B3–B8 have existing shorter success prose. PR #25 supplies sixteen descriptions, forty-eight approach sentences, forty-eight successes and sixteen general fatal consequences; the original files' hashes appear below.

**Requested at intake:** create a spec to add the revised texts to the game. Full-catalogue replacement was proposed pending confirmation; it did not imply new mechanics or final prose.

**Open at intake:** B1's voice contradiction was present in both GDD and source. The general fatal consequence is not a replacement for three distinct failure causes. Longer paragraphs/labels need runtime readability evidence; static correspondence cannot prove pacing or rendering.

**Subsequent product decision — 2026-09-22:** D-001 accepts progressive voice loss and the corrected B1 paragraph as prototype prose; [ADR-001](adrs/adr-001-matinta-voice-sequence.md) and the canonical GDD record that decision. The source hashes, native observations and counts below still describe the unchanged intake source/runtime. B1's approved exception must be applied separately during integration. Subsequently, D-002 accepted the full integration boundary with the reviewed source as prototype wording (D-003); see [ADR-002](adrs/adr-002-full-catalogue-boundary.md).

## Provenance

- PR #18 `2f91f94610ea27671d2bfeb9b5e4bf16abe718de`: 30 success paragraphs and six empty files.
- PR #20 merge `76b44e200c16a992926df57eceb48ed41e4e2edc`: integrated those 30 results. [Historical source mapping](../approved-narrative-dialogue-staging/source-analysis-pr18.md), [integration limit](../approved-narrative-dialogue-staging/adrs/adr-002-trap-prose-integration-boundary.md), [completed verification](../approved-narrative-dialogue-staging/verification.md).
- PR #21 `9e86e8320eb7eed2dc37b87ccc819603028baf57`: retains those 30 and adds 18 B3–B8 results; closed as superseded by #25 during the previous workflow.
- PR #25 source: 44 results remain literal to #21; the four revised results are A1-1/A1-2/B3-3/B7-2. The previous workflow's publication/closure is provenance, not an action performed by this spec-authoring flow.

## Native ownership and actual differences

All encounter maps below own event 001, page 1. Descriptions, three player labels and death prose differ in every row after removing presentation line breaks. The number of changed success paragraphs is shown separately; a source refresh must recalculate the comparison instead of relying on this dated count.

| Encounter | Map | Existing death Common Event | Success paragraphs differing from catalogue |
| --- | --- | --- | --- |
| A1 | Map007 | CE266 | 1, 2 |
| A2 | Map008 | CE267 | None |
| A3 | Map009 | CE268 | None |
| A4 | Map010 | CE269 | None |
| A5 | Map011 | CE270 | None |
| A6 | Map012 | CE271 | None |
| A7 | Map013 | CE272 | None |
| A8 | Map014 | CE273 | None |
| B1 | Map015 | CE274 | None |
| B2 | Map016 | CE275 | None |
| B3 | Map017 | CE276 | 1, 2, 3 |
| B4 | Map018 | CE277 | 1, 2, 3 |
| B5 | Map019 | CE278 | 1, 2, 3 |
| B6 | Map020 | CE279 | 1, 2, 3 |
| B7 | Map021 | CE280 | 1, 2, 3 |
| B8 | Map022 | CE281 | 1, 2, 3 |

Totals: 16 descriptions, 48 choice labels, 20 changed success paragraphs, 28 matching successes, 16 general death paragraphs. Forty-eight distinct pre-selection failures already exist and have no replacement counterparts in the source.

Observed passage identities are `encounter.<id>.01`, `result.<id>-<1..3>.success.01`, `result.<id>-<1..3>.failure.01` and `death.<id>.context`. Each native choice carries existing PictureChoices bindings in addition to its prose; auxiliary reread/retreat choices are separate. Labels, indices and branches cannot be compared by rendered prose alone.

CE042 owns the irreversible victim selection. CE291 dispatches the farewell/death readings to their existing helpers, including CE266–281. Those death helpers do not own their caller's `ReadingComplete`. `Dryland_CampaignRules.js` distinguishes `approach_result`, `sacrifice_choice` and `death_result`; victim commitment selects the reading plan `farewell.<hero>` then `death.<encounter>.context`. These are current implementation facts, not newly approved architecture.

## Preservation and lifecycle impact

| Surface | Expected impact / risk to resolve in Stage 2 |
| --- | --- |
| Narrative/events | Native text replacement, additional message boxes and choice-label fit; retain branch grammar and completion boundaries. |
| Domain/plugin metadata/order | No requested rules, API, parameters or load-order change. IDs, competencies, outcome and campaign eligibility remain authoritative. |
| Interpreter/save/load | Serialized event lists may contain older wording; stable semantic reading and already-seen status require explicit preservation. Do not assume a text edit makes old conversations migrate. |
| UI/input/rendering | Longer descriptions/results and different labels need real readability evidence, observational reread, HIDE/Options/FAST and protection against input carry-over. |
| Death/memorial/reduced party | Preserve farewell → contextual death ordering, one committed death and its stored place. Any B1 correction cannot narrow victim eligibility. |
| Audio/assets/camera | No new cues, artwork, framing or movement requested; retain existing native commands and accepted presentation. |
| Authoring/packaging | Content stays editable in MZ events. The source snapshot is evidence, not a second runtime loader. No build/dependency/service added. |
| QA/teardown | Directed campaigns mutate through player actions only; isolated native fixtures remain clearly labeled. Apply ADR-G004–G006, exclude gamepad/native zoom, close only resources opened for testing. |

## Stage 2 native surface inspection — 2026-09-22

All sixteen encounter owners have one autorun page (trigger 3). Each stores labels in three locations: native Show Choices (102), branch headings (402), and MessageCore PictureTextChange on pictures 50–52. The visible picture text is independent of the hidden choice label. The existing approach asset measures 1100×96 pixels; Map007 uses font 22, padding 8 and centers (640,375), (640,490), (640,605). B5-1 is the longest proposed label at 110 characters, followed by B5-2 and A2-3. These are inspected data values, not rendered fit evidence.

CE266–281 contain ReadingPermission and ReadingEnd around their text. CE291 captures context and calls ReadingComplete after each selected native helper returns. No child-helper completion is needed. The existing matrix's initial description and A1 reread consume a single acknowledgement; its results already iterate native boxes. These observations support the scoped Stage 2 contracts without changing runtime data.

## Existing tests and evidence limits

The canonical runner is `node --test rpg-maker/tests/campaign.test.mjs`, with registrations in `rpg-maker/tests/test-manifest.json` and suites in `rpg-maker/tests/suites/`. `package.json` declares `npm start` for the local server; no Jest install or new test entry is needed.

- `encounters.mjs`, IT-051 and IT-082/083/084, covers success presentation and all encounter/approach outcomes. Its current independent fixture `fixtures/approved-trap-successes.json` pins the old thirty PR #18 paragraphs. A new accepted source requires revising that owned correspondence coverage; reading expected text from edited candidate maps alone would be circular proof.
- The same matrix currently assumes a single acknowledgement for the initial/reread description, while looping all result boxes. Longer source descriptions expose a real fixture limitation to address after product approval.
- `content.mjs`, IT-035/067/071, covers native text, changed message lists and reading completion. Reuse only where inputs/claims remain applicable.
- `sacrifice.mjs`, IT-012, and `native-death-context.mjs`, IT-057, cover irreversible selection and recorded death context. They do not by themselves prove every revised death paragraph is readable or correctly sequenced.
- `native-controls.mjs`, IT-038/050/065/078, and `native-checkpoints.mjs`, IT-014/079, own related controls/checkpoints. Stage 2 selects focused risks; these references do not mandate rerunning unrelated scenes.
- [Encounter QA scenario](../../../docs/qa/scenarios/ENC-mz-encounter-sacrifice-retreat.md) and [previous narrative QA report](../../../docs/qa/reports/2026-09-18-approved-narrative-dialogue-staging.md) provide journey context and historical evidence. They are not proof of the revised candidate.

Observed during authoring: local Git/source reads, structured JSON inspection and normalized source/native comparison. No game, editor, browser, server, test suite, save mutation or gameplay was executed. No application resource was opened.

## Frozen source hashes

SHA-256 values refer to the original individual catalogue files, whose full bodies are embedded in `source-catalogue.md`. The snapshot's introductory provenance is not part of those hashes.

| Encounter | SHA-256 |
| --- | --- |
| A1 | `fb7957ac350aeb9c959199549debec43674b29d691e84f169efef2e40075a6be` |
| A2 | `956485fb84c349c0a1304d44318e9e224b8b3c7347684d30653a85973a107df4` |
| A3 | `fbf3d849c0198003c563473275a567fedf3d1358d45b3c57a59dde8343db08da` |
| A4 | `d7a100e7b15f325b3516702795d60fbbd079c540208c8b0d14afd8201085ef3e` |
| A5 | `ca0b4920631ed4aa5480de304cf211a5dd6b508ddf480b6dec93835116c6263d` |
| A6 | `de3e58e410f0c8c0bc3fb6869430f8ea3c4d7c37425a9a4233f9566361a9013f` |
| A7 | `cdaa6e093e40dfbb21c0f9d657d63003c6f6772fb4726d54fe2fe84e60fa5d7d` |
| A8 | `b752673622d4c4704a85e58dad49af77ace061d25795a483e5692fc746888875` |
| B1 | `7c506f0954948a4cc46fbf2070cbe3bfa6acf896f68465730d820a0563d64c78` |
| B2 | `eb38e25e32008eb78e236e165942fbecf2075c8ac3191275f55d79580b6c0cdb` |
| B3 | `87ea38010e008955468ca5c726cd94018a9ba223b2c657e2d7124d276fe3f4bf` |
| B4 | `edc9d9eb2d9fc9b4edb922a1611e02f6e01294993a26a26a81578b7c2644514b` |
| B5 | `53ecc988d77ba0e379f6b56c05eafbcff0d9bbc50cc6d2f10b109b930cf67406` |
| B6 | `a5e6805f44e6b3750150c0d057bd9dfc2f9e112da6463a45c9541cba852da442` |
| B7 | `92071c27827772b2fb00292a52520d4306d04d4f970b29ecf868a9fa222185c6` |
| B8 | `fd6513f9fbe3a382bdd61ce4116b3f54df3b832ea2dd8ad52870b49b9253d0c0` |
