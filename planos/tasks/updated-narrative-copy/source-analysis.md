# Source analysis and native ownership

Read-only intake on 2026-09-25, Git baseline `114d7aa6e7401c8b1f19d6bf5cfd7870ca805590`. Working tree was clean before spec authoring. The sources are committed at this revision; hashes below pin the exact accepted input. This is an authoring record, not a runtime catalogue or execution result.

## Source authority and fingerprints

Use only these seventeen documents plus the exact exceptions in [Narrativa](updated-narrative-copy.narrativa.md). If any hash changes before implementation, compare the change and resolve its impact instead of silently importing a different revision. The committed intake revision remains available for baseline comparison.

| Source | SHA-256 |
| --- | --- |
| [## A1.md](../../../docs/narrativa/armadilhas/%23%23%20A1.md) | `afe451f2e06b439b5a69bd753adfa4baf61612ffda5a8c1a36ab0433ccb824a9` |
| [## A2.md](../../../docs/narrativa/armadilhas/%23%23%20A2.md) | `e70f17f0ac99c42ab1b92fcd4cb4b01151cd0823b02e9a3b5d1f016d6b394942` |
| [## A3.md](../../../docs/narrativa/armadilhas/%23%23%20A3.md) | `058260d3b9b8987f77a03988814b7996e12b61f9df53d38688419d87a0265308` |
| [## A4.md](../../../docs/narrativa/armadilhas/%23%23%20A4.md) | `fa8beb69ec0269f458394b18ac1bdd9c147d107084e4d492f350a2b5db63b32c` |
| [## A5.md](../../../docs/narrativa/armadilhas/%23%23%20A5.md) | `793792195c44683176d9beb4d4d87b01d2b587621c384695f3278f69c1c8a5b3` |
| [## A6.md](../../../docs/narrativa/armadilhas/%23%23%20A6.md) | `2ab5cb0202578c6118af425ed5c0c76729353f1350f3445c354394766f6212bb` |
| [## A7.md](../../../docs/narrativa/armadilhas/%23%23%20A7.md) | `d579c6cee91615e3d38538ddc9a66e4b5d1411c05593657840169b7745bad4b7` |
| [## A8.md](../../../docs/narrativa/armadilhas/%23%23%20A8.md) | `4c9a4820570cbae70f891dd6a18ed9edad4988d58ece1da1f85862db9f3ef522` |
| [## B1.md](../../../docs/narrativa/armadilhas/%23%23%20B1.md) | `209a09762c552f4c477b067c482a051bb099e6acc35643b1ba79f539ada5654f` |
| [## B2.md](../../../docs/narrativa/armadilhas/%23%23%20B2.md) | `b1dd90e4ace335d0dabe752336a3d2cf14325a5cd00f6cd866682ce77e746c56` |
| [## B3.md](../../../docs/narrativa/armadilhas/%23%23%20B3.md) | `d263055947a165378a1d899867a6bf1158006e218b320fd34caee8d47a901634` |
| [## B4.md](../../../docs/narrativa/armadilhas/%23%23%20B4.md) | `5fab1171ecbcf207992c5b35a07abdceffb5f035433eb9ec10b79d617452a1fe` |
| [## B5.md](../../../docs/narrativa/armadilhas/%23%23%20B5.md) | `2f58ecdf63f981dc30d4f98d9da19c67ac4035cc8fe73a2357e143a4b5680b12` |
| [## B6.md](../../../docs/narrativa/armadilhas/%23%23%20B6.md) | `7a272340b705fea7a36aef0d0d14e9c5ca956c389fd6bfa5b99f2e562ac6134f` |
| [## B7.md](../../../docs/narrativa/armadilhas/%23%23%20B7.md) | `92fe6b91d93af3904d68d70635703930bbb483af6ef0165b232491d6d7298da2` |
| [## B8.md](../../../docs/narrativa/armadilhas/%23%23%20B8.md) | `58178c259823c21b26e6a2c6a467223c7bac456006a4dc4f6e13c2bf2efac715` |
| [# Falas de cada herói.md](../../../docs/narrativa/herois/%23%20Falas%20de%20cada%20her%C3%B3i.md) | `130a8df1ea48eab46e54e59858761b2bfd17b40a8ee374dbd92e9fd79553dc57` |

The separate `docs/narrativa/herois/Falas-de-cada-herói.md` and the eight hero sheets are not interchangeable input files. This increment supersedes their speech wording only where the supplied anthology owns that moment. Epilogues and character-mechanical facts remain outside the change.

## Trap ownership

Every listed map has event 001/page 1, named `Fluxo — <ID>`. The description query is `encounter.<ID>.01`; outcomes are `result.<ID>-<1..3>.success.01` / `.failure.01`; deaths are `death.<ID>.context`. Titles in CE004 already agree with source titles. Native prose lives in 101/401 commands.

| Trap | Map file | Death Common Event | Memorial cause Common Event |
| --- | --- | --- | --- |
| A1 | `Map007.json` | CE266 | CE125 |
| A2 | `Map008.json` | CE267 | CE134 |
| A3 | `Map009.json` | CE268 | CE143 |
| A4 | `Map010.json` | CE269 | CE152 |
| A5 | `Map011.json` | CE270 | CE161 |
| A6 | `Map012.json` | CE271 | CE170 |
| A7 | `Map013.json` | CE272 | CE179 |
| A8 | `Map014.json` | CE273 | CE188 |
| B1 | `Map015.json` | CE274 | CE197 |
| B2 | `Map016.json` | CE275 | CE206 |
| B3 | `Map017.json` | CE276 | CE215 |
| B4 | `Map018.json` | CE277 | CE224 |
| B5 | `Map019.json` | CE278 | CE233 |
| B6 | `Map020.json` | CE279 | CE242 |
| B7 | `Map021.json` | CE280 | CE251 |
| B8 | `Map022.json` | CE281 | CE260 |

All 48 choice labels have three representations: Show Choices 102, branch caption 402, and MessageCore PictureTextChange `center:json` for pictures 50–52. Updating only the choice string leaves the rendered panel stale. Utility choices are not catalogue approaches. The same description label serves first reading and reread. CE291 dispatches and completes farewell/context reading; CE042 owns the sacrifice choice, CE347 the memorial cause dispatch.

## Hero ownership

Every conversation map has event 001/page 1. The profile observation currently contains one identification line and one third-person summary; the next observation contains the old five-utterance presentation. The source has six presentation utterances for every hero. Selected/full replies are distinct observations and result branches.

| Hero | Map | Retire profile unit | Retain presentation / selected / full units | Farewell CE | Council passage (Map023/event001/page1) |
| --- | --- | --- | --- | --- | --- |
| H1 — Gorvak | `Map037.json` | 82 | 83 / 84 / 85 | CE282 | `opinion.H1` |
| H2 — Elowen | `Map038.json` | 86 | 87 / 88 / 89 | CE283 | `opinion.H2` |
| H3 — Griznik | `Map039.json` | 90 | 91 / 92 / 93 | CE284 | `opinion.H3` |
| H4 — Seraphina | `Map040.json` | 94 | 95 / 96 / 97 | CE285 | `opinion.H4` |
| H5 — Bimbren | `Map041.json` | 98 | 99 / 100 / 101 | CE286 | `opinion.H5` |
| H6 — Liora | `Map042.json` | 102 | 103 / 104 / 105 | CE287 | `opinion.H6` |
| H7 — Vaelith | `Map043.json` | 106 | 107 / 108 / 109 | CE288 | `opinion.H7` |
| H8 — Draska | `Map044.json` | 110 | 111 / 112 / 113 | CE289 | `opinion.H8` |

Council opinions are gated by the existing campaign reading plan: living climax participants, stable H1–H8 order, followed by Irati and the final choice. The new text has two paragraphs per hero; it does not add another opinion identity. Normal speaker labels and the `Grupo: \V[150]/\V[151]` menu are separate from the removed identification.

## Observed differences

| Surface | Intake difference | Integration obligation |
| --- | --- | --- |
| Trap introductions/questions | 15 of 16 differ; B2 matches after presentation normalization | Cover all 16; preserve matching words |
| Approach sentences | 11 of 48 differ | Cover all 48 associations and all three text representations |
| Success paragraphs | 35 of 48 differ | Cover all 48, including the 13 matching bodies |
| General fatal paragraphs | 10 of 16 differ | Cover all 16 post-farewell bodies |
| Hero presentation | 8 changed; 5 old utterances become 6 per hero | 48 source utterances, direct Ivaí opening |
| Selection / full party | All 8 + 8 differ | Correct validated result branch |
| Farewells | Gorvak differs; other 7 match apart from outer quotes | 8 source farewells; no gratuitous rewriting |
| Opinions | 8 old single-paragraph bodies become 16 source paragraphs | Preserve speaker eligibility and stable order |
| Profile preambles | 8 identification + 8 summary messages absent from new source, explicitly removed by user | Remove preamble and its obsolete observation envelopes |
| Pre-choice failures | 48 exist in game; none are supplied as per-approach copy in the source | 6 exact approved replacements, preserve 42 |
| Memorial | Separate native strings; A1/A5 revised by user approval | 2 replacements, preserve 14 causes |

Normalization for the intake comparison removes layout whitespace/`<br>` and outer decorative quotes, not words or punctuation. Difference counts are inspection facts, not tests passed. B5 uses repeated success heading number 1; B5–B8 have looser Markdown formatting. Interpret source order and meaning instead of assuming one uniform heading parser.

## Why the six exceptions are needed

| Passage | Current pre-choice text | Approved change owner |
| --- | --- | --- |
| `A1-1` | A comporta permanece travada; o redemoinho ricocheteia nas paredes e fecha a saída com cacos. | [Exact accepted replacement](updated-narrative-copy.narrativa.md#approved-pre-choice-failure-replacements--d-004) |
| `A5-1` | A grade emperra acima da baia, e a carcaça retorna arrastando correntes pela saída. | [Exact accepted replacement](updated-narrative-copy.narrativa.md#approved-pre-choice-failure-replacements--d-004) |
| `A5-3` | A leitura do ciclo atrasa uma descarga; a caldeira entra em sobrepressão e incendeia a passagem. | [Exact accepted replacement](updated-narrative-copy.narrativa.md#approved-pre-choice-failure-replacements--d-004) |
| `A7-2` | Uma corrente cede durante o balanço, lançando o grupo de volta à esteira da prensa. | [Exact accepted replacement](updated-narrative-copy.narrativa.md#approved-pre-choice-failure-replacements--d-004) |
| `B3-3` | O barro seca antes da travessia terminar, e as luzes passam a arder sob a pele. | [Exact accepted replacement](updated-narrative-copy.narrativa.md#approved-pre-choice-failure-replacements--d-004) |
| `B6-3` | Um fio de cabelo se rompe no nó errado, soltando a trança que sustentava a passagem. | [Exact accepted replacement](updated-narrative-copy.narrativa.md#approved-pre-choice-failure-replacements--d-004) |

The source general fatal paragraphs already have mapped post-farewell destinations and remain separate. A5 has one general fatal paragraph despite two changed pre-choice messages. A1/CE125 currently says “Desapareceu no vento ao manter a comporta aberta.”; A5/CE161 says “Permaneceu na válvula enquanto a saída ardia.”. Their two accepted replacements are in the narrative contract.

## Dependency and lifecycle evidence

- The project file reports RPG Maker MZ 1.10.0. `js/plugins.js` activates VisuMZ providers and Dryland_CampaignRules/EventBridge/Presentation; no plugin installation/change is needed. Existing Coreto sources/bundles remain read-only.
- Dryland_Presentation stores explicit positive observation IDs in `_drylandReadUnits` and does not require a contiguous four-unit range; profile IDs can be retired without code/schema changes.
- Native-inventory IT-047 currently asserts four units; content IT-067/069/071 and shared formation helpers address/read the old profile. These are active test assumptions to migrate, not grounds to retain a hidden empty profile.
- Runtime authorship guide describes profile + conversation and the 82–113 reservation. Update its current description at implementation while preserving retained IDs and marking retired IDs.
- Current dungeon word wrap/32 px advance padding and authored bust staging are already approved baselines. Added text and moved first-speaker preparation need new fit/lifecycle evidence.

## Intake game fingerprints

These fingerprint the inspected native owners and relevant unchanged providers/configuration. Re-resolve anchors and review drift before implementation. They are not a runtime content-version gate.

| File relative to game root | SHA-256 |
| --- | --- |
| `game.rmmzproject` | `d999ef7df90cc897cccd4bfa8f86811224e61a8c61b6fe7e13f8321c7932e97d` |
| `data/CommonEvents.json` | `c74901d4acb41d7e7aa513a84a8d315b50888e364f020a2bd4286ed81cf1a061` |
| `data/Map007.json` | `6516303b681786625b545f25fe6743f240019dbf3f95798c8ade675e14d80cbf` |
| `data/Map008.json` | `30ea0e4785ab0d939da1a2f29e6d5f0fa309149d274d29feab7b21174763e2ff` |
| `data/Map009.json` | `346b468d664daa3d205aabd5edcbadee1b23e577c18baa7bd7cff784e10aec24` |
| `data/Map010.json` | `a847289a1dffa692e8c2eb6413e14fba2ed6a1808cb625d7d64f4a45dc85c190` |
| `data/Map011.json` | `c3aa7f2a09d228ff9a971b7e3821bace99cb64a48d0e1599f8f573d745a3681f` |
| `data/Map012.json` | `3853198c971a923b7a11d5a4a6ee6c938aac6ee53db7d5eaeed93f6bf61fc8a9` |
| `data/Map013.json` | `c8927dff1de7e9eeb6cdc9afdbc98285333536c31ad6dc897bba00f91100f460` |
| `data/Map014.json` | `a27709c206d1f3773044f744a04b0bf5f942419ceb4f5028dd353563dd591220` |
| `data/Map015.json` | `02f0ba389cf1e1a9a5c5880c51b776b57a3f01a896c3249c7b33a90a4e0ad1f8` |
| `data/Map016.json` | `c16d18b3ee4d2e588cf9b4488f291b30c3f6a18707ef8e2c565f5b4d2872acb4` |
| `data/Map017.json` | `c6840dca7155197d3a053ec048db5aaf9cc43485552915689c680e41f8ebed93` |
| `data/Map018.json` | `4fc7693f795bfe4627e4de68facaa12088c98cd7627fb53e4d7ab551a70e4b22` |
| `data/Map019.json` | `187362984148c5ea81881458939de1fd5f3cc1d28be35802cb14446b4c332fc7` |
| `data/Map020.json` | `d920ea650f71d893c0b7c749c4649047ab10420fd9d47463c05954e994d83bbe` |
| `data/Map021.json` | `8f6c13664925c16501051acaaa6642ea12c0390a816bb2da3db40f9394e38a78` |
| `data/Map022.json` | `e97d427f72c2de145add562f481a287169f29a30cb9ad6a5cd92c9a2f74d9add` |
| `data/Map023.json` | `0ee65f9cab8cac3075139632de508754dbc3bfea99c3a4147092bca8a4c3b6e0` |
| `data/Map037.json` | `765dc8dbcf136a0dc5cfd09dd7fd33a364912594b9118ee4d363f7ad1b34da7b` |
| `data/Map038.json` | `62c3bc9dcc1ff4d2600d44bce439607816977ea6dea6a318512d03fdb373d1f2` |
| `data/Map039.json` | `fea6d0b29286abbb343a459bc9d763d2b43c3643bf4c5c778f6899e90909a1a8` |
| `data/Map040.json` | `88045d28545d42fa926e9627ab3e62d8628b1025a27e7d232ac5efd119288977` |
| `data/Map041.json` | `7978d1c03917543ff9e001ded7c52adbb9bfbc0dbb35bb0d530a17ea0523d1fc` |
| `data/Map042.json` | `efee10178b31f9c57ae1fa5662a1afccad3149b18d1d52be30be7b2d983d7928` |
| `data/Map043.json` | `8582e4bccfb032ba590baa4e8c4951a2cf72201d70bfe1547d4d0c98392b6a8c` |
| `data/Map044.json` | `0ee5598aa9643cbeefac37856f92680b9ce8971715d208adadbc9676f64f5f88` |
| `js/plugins.js` | `99c2afe123ac9f597d956fa20660632f2d35f55cb3e85a2ec9f9ff8eb27c4e6a` |
| `js/plugins/Dryland_CampaignRules.js` | `914aab4c8b3315d990a4d44769fbaec1a54d75db7c0e02e9852427330d3d1ab5` |
| `js/plugins/Dryland_EventBridge.js` | `3b3bc794ddfa176088d2bcf2a868ab374d3878c701a3bb98602abf309c808261` |
| `js/plugins/Dryland_Presentation.js` | `88465722c6673c63e3b2f9f229778c701a58e1e6e7a02e1321c0a786c99da0af` |

## Preflight conclusion

Objective, source authority, affected disciplines, native owners, current lifecycle and approved editorial exceptions are resolved. No duplicate incremental spec was found in `planos/tasks/`. This is a user-requested editorial feature/update, not a new defect report; no bug or Trello item is created. At intake, complete-set approval was the remaining authoring checkpoint. It was subsequently given on 2026-09-25 under D-006 (“aprovo”). Implementation and all game verification remain pending.

## Authoring validation — 2026-09-25

Checked 139 local links across the new set and touched authority records: no missing file/directory targets. All 17 source hashes and 31 intake game fingerprints still match. Every RQ-001–009 has assigned V coverage; all nine sensors remain pending for the candidate. The eight-file Markdown set has no task graph or implementation files. Whitespace checks passed, and no game, Coreto or original narrative source was edited.

Part I was reviewed for observable product behavior, with an additional token screen for native filenames, commands and test mechanics; none of the screened implementation tokens occurs there. Manual six-marker review found interfaces/data models/transitions in Part II's explicit tables, integration points in the native-owner and programming tables, testing strategy in verification.md, and concrete file references in this inventory/contracts. The two historical checker scripts were absent from the repository and searched local skill roots; neither was reported as executed. These are document checks only, not runtime/static implementation verification or human acceptance.
