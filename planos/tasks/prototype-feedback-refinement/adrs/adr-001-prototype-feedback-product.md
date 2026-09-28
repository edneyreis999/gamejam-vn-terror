---
status: approved
date: 2026-09-24
product_approved: true
editorial_approved: true
technical_approved: true
full_spec_approved: true
technical_approved_under: D-025
technical_approved_on: 2026-09-24
---

# ADR-001 — Opening, preparation and narrative presentation refinement

## Authority and status

This record captures the explicit user decisions D-001–D-025 in [spec.md](../spec.md). D-016 approves the complete reviewed product set and presented prose. D-017–024 settle the interviewed surface choices. D-025 explicitly approves the complete technical set and verification design and authorizes task decomposition. Implementation, executed evidence and human delivery acceptance remain pending.

The [canonical GDD](../../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md#28-refinamento-do-feedback-do-protótipo--2026-09-24) records the replacement scope. Completed specs, prior implementation results and historical editorial approvals remain historical.

## Decisions

1. **D-001:** the tavern save command saves the current campaign into its already associated file. Preserve autosave and its semantic boundaries. No unrestricted slot selection or deliberate rollback points are added.
2. **D-002/003:** a distinct title menu precedes the age notice. Both Novo jogo and Continuar require a fresh unchecked acknowledgement on every title entry; acceptance is not remembered.
3. **D-004:** preparation is party first, destination map second. Selecting a destination does not depart; Partir is the deliberate commitment. Preserve valid back navigation and the automatic party when one to three heroes remain.
4. **D-005:** a tavern noticeboard replaces the all-roster Elenco overlay and shows only deceased heroes. Its empty message is “Ninguém ficou pelo caminho”. It does not enter the end-of-campaign memorial or mutate progression.
5. **D-006:** a successful hero addition shows that hero's short source acknowledgement and returns automatically to the tavern after player advancement. Preserve the existing conversation, removal and rejection flow.
6. **D-007:** epilogues retain the existing PR #15 prose, ordering and eligibility. Replace illustrations with older Rheed, `Reed final.png`, black background and the standard lower dialogue box. No voice recording or newly written epilogues is included.
7. **D-008:** danger without a named victim precedes selection; the chosen hero's farewell precedes the named consequence. Death and saving remain immediate at selection. Do not repeat a committed death or invent a predetermined victim. D-016 subsequently approves the revised words in proposed-consequences.md.
8. **D-009/010:** all deceased heroes disappear simultaneously for three seconds on expedition returns, including earlier losses. Preparation waits for the effect. Do not replay on ordinary consultation round-trips or simply loading an already reached tavern. With reduced motion, show empty places immediately; no deceased heroes means no added pause.
9. **D-011:** revise the complete prologue, preserving facts and the exact final dialogue. Do not reveal or imply Ivaí's possible death, ending consequences, curse, medallion or hidden plan. Clarify the separate historical fact that Irati died two years before the expedition. D-016 subsequently approves the complete new wording under RQ-003.
10. **D-012:** after the existing complete route-closing text, return through a short visual transition without new dialogue. This precedes the separate tavern absence effect.
11. **D-013, clarified by D-014:** Ivaí says “Bem, agora que nossa equipe está completa, vamos traçar nossa rota!” at the first destination-map opening for each new expedition preparation. It repeats for later expeditions, not on ordinary map reopening or Continue when the restored save already records that preparation's introduction as completed. The player controls advancement.
12. **D-014:** Continue uses the last successful save. A save predating introduction completion can replay that unsaved reading on the first destination-map opening after restoration; a save containing completion suppresses it for the same preparation. Do not add an automatic save for this line or separate persistent acknowledgement. This resolves review F-001 and preserves existing semantic checkpoints and save-failure behavior.
13. **D-015:** narrated epilogues use the existing present-day music and discreet audience ambience from Rheed's Noite da História scenes, without opening applause. Preserve volume/mute settings, continuity between consecutive epilogues, and the separate ending/memorial/credits treatment on entry and exit. No new music or voice recording is included. Audio is an affected discipline with explicit verification; this resolves review F-002 at the contract level.
14. **D-016:** after the second review, the user stated “então está aprovado”, accepting the reviewed Stage 1 product set, D-001–D-015, player stories, complete prologue, named consequences, hero-speech source categories including full-party lines, and provisional verification scope. [Review-02](../review-02.md#reviewed-fingerprints) pins the accepted inputs. This closes product/editorial approval and opens Stage 2; it does not approve unwritten technical contracts or certify implementation. Do not request the same product/editorial approval again.

15. **D-017:** the user selected option “1”: reuse the existing empty-tavern illustration, darkened behind the title and menu. The asset is `img/pictures/Dryland_Taverna.png`. The subsequent notice keeps its approved black background. This settles the title-background direction, without requiring a new exclusive title illustration or approving the entire surface/technical contract. Placement, contrast, notice cancellation and optional badge remain separate details.
16. **D-018:** the user selected option “2”: a single illustrated map with clickable destination locations and a side panel for the selected destination's information. Preserve names, rumors, exploration/status, coherent location/name targets and keyboard access. Selecting a location does not depart; Partir remains the commitment. GDD §5.2's visible-but-locked final destination, map-piece unlock, completed-route exclusion and narrative discovery sequence remain unchanged. This approves composition, not the final artwork or technical implementation.

17. **D-019, subsequently refined by D-020:** the user selected option “1”: the tavern noticeboard opens a newspaper with several deceased heroes per page and pagination when needed for comfortable reading. Preserve dead-only content, complete readable entries, keyboard/mouse navigation, “Ninguém ficou pelo caminho” when empty, and return to preparation without campaign mutation or final-memorial progression. D-020 supersedes the newspaper-entry composition.
18. **D-020:** the user requested only the names of dead heroes, without additional text or images. The opened tavern noticeboard therefore contains a plain name list, with no portraits, obituary copy, inscriptions or death-detail fields. Preserve complete names, deceased-only membership, the already approved empty message, return navigation and pagination only if legibility requires it. No new list illustration or narrative content is commissioned. The correction does not settle the final Reunir/Destruir layout or change the final cemetery under RQ-015.

19. **D-021:** the user selected option “1” in the resumed final-choice question: centered, ornamented Reunir/Destruir panels side by side, with equal prominence and existing consequence information below each action. Preserve larger scale, keyboard/mouse access, the committed outcomes and input isolation from the preceding speech. No additional confirmation is added. Final geometry, artwork and rendered acceptance remain separate.

20. **D-022:** the user selected option “1”: a visible “Voltar ao título” button and Escape on the age notice. Both cancel without starting or loading a campaign, for Novo jogo and Continuar, with the checkbox checked or unchecked. Cancellation does not persist acceptance or write a campaign; every later entry starts unchecked under D-003. Preserve keyboard/mouse access and isolation from the restored title controls.

21. **D-023:** the user selected option “1”: a discreet “Campanha salva” notice in the tavern after successful manual saving, without another acknowledgement click. It must follow actual successful storage completion and must not interrupt preparation or announce pending/failed storage as success. Preserve current-file saving, autosave and the native failure policy: Continue uses the last successful save. This does not introduce a success dialogue, a new autosave-notification rule or a custom blocking/retry flow.

22. **D-024:** the user selected option “2”: show a discreet, legible 16+ mark on the title as well as the separate complete age notice. Keep it subordinate to the title/menu and informational, without replacing the next-screen warning, checkbox, fresh acknowledgement or return controls. This is not an official-certification claim; placement and contrast remain calibration.

23. **D-025:** the user answered “sim” to “Você aprova esse conjunto técnico para seguirmos às tarefas?”. Approve the complete technical spec, verification design and UI/UX, audio, narrative, technical-art/staging and programming contracts. This includes the presented calibration and native lifecycle design; proceed to local task authoring without repeating that approval. No implemented appearance, runtime test or human delivery judgment is inferred.

## D-025 approved-input fingerprints

SHA-256 values captured immediately before recording the approval. Subsequent status and task-ownership bookkeeping may change the file hash without changing the approved design. Historical review-01/review-02 remain intact.

| File | Approved input SHA-256 |
| --- | --- |
| spec.md | `513eb2d7dbb1ca8a3f1cdcf8ca6575e7961436fbf1243d6e0753dc813c23f45e` |
| verification.md | `4066b64099a08f53acff35c3c64bbfd7ad2ce0e07013dcf47e433824e93e0292` |
| prototype-feedback-refinement.audio.md | `6e65d32e926e7a6f59ed57637b99bc4c77037751522ecbe5b4adfc2a10f0b908` |
| prototype-feedback-refinement.narrativa.md | `1ad84409b5bb4904f27fa802d690996bf6c91bf0cafc7ed3f5c1b60063b395b6` |
| prototype-feedback-refinement.programacao.md | `1ca40e6f2fdfdfb40d221b19e5137d91fddebc4e4c99e05ae2288b9e5dd8f1d7` |
| prototype-feedback-refinement.technical-art.md | `a3ccfde963b9cd288473feb1d969dfa80f72e3e1aa68b1e5a3df62ad0442e6fe` |
| prototype-feedback-refinement.uiux.md | `dc55bbd87c64da9aaa0b7ed9d8cbff6c1476fd490c19bf6d829f95b0b7288053` |

The original requested target containers, choice styling, framing, final-choice prominence and cemetery legibility are approved product outcomes. D-021–024 settle the remaining interviewed directions; D-025 separately approves all five technical discipline contracts. The approved hero-speech working copy governs introductions, opinions, farewells, selection acknowledgements and full-party lines. Rejection behavior remains unchanged.

## Scoped supersession

| Prior authority | Replaced scope | Preserved |
| --- | --- | --- |
| GDD §§3.7/26 | Absolute exclusion of a deliberate save action | Native campaign-file association, autosave, no free rollback slots, native error handling |
| GDD §§7/19.1 | Combined title/notice and preparation in either order | No gameplay before acknowledgement; eligible destinations; separate Partir commitment; reduced parties |
| GDD §19.1.1 | All-roster overlay; one-second, once-only, interactive disappearance | Fixed hero places, permanent death, unavailable deceased targets, reduced motion |
| [ADR-G001](../../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md), decision 3 | Return to hero menu after successful addition | Native hero maps, other visit outcomes, explicit transfers and cleanup |
| [Narrative ADR-003](../../approved-narrative-dialogue-staging/adrs/adr-003-approved-prose-and-illustrated-epilogues.md) | Illustrated epilogues without narrator bust | Existing prose, ending images, survivor eligibility and H1–H8 order |
| [Narrative audio contract](../../approved-narrative-dialogue-staging/approved-narrative-dialogue-staging.audio.md) | Preservation of the former epilogue audio: D-015 applies the present-day narrator context instead | Existing local present music/ambience, opening-only applause, volume/mute, same-context continuity and separate ending/memorial/credits audio |
| GDD §27 and prior prologue integration | Literal preservation of all old prologue prose, including the ambiguous Irati phrasing | Canonical facts, temporal framing, final question/reply, withheld plot and player-paced reading |
| [Revised trap prose](../../revised-trap-prose-integration/spec.md) | Literal generic victim references in the two identified failure passages and sixteen death passages | Other failure explanations, descriptions, successes, fatal actions, B1 voice timing and sacrifice rules |

## Consequences and excluded expansion

Native event lists and scene presentation will change; Stage 2's programming draft defines resumption boundaries and input isolation without promising migration of old serialized interpreters. Save compatibility is not an excuse to overwrite user files or add a revision gate.

Local task decomposition is authorized under D-025. No engine/Coreto/vendor source change, provider migration, new dependency, remote service, deployment, commit or PR is authorized by this record. New art must be final before delivery; design approval is not proof of a usable asset. Existing unrelated creative uncertainties retain their state.

Stage 1 product/editorial approval is complete under D-016; full Stage 2 technical approval is complete under D-025. The task graph, implementation evidence and delivery acceptance retain their own states.
