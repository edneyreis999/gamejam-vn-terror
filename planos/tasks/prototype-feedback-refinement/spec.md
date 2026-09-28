---
status: approved
slug: prototype-feedback-refinement
stage: approved
technical_approved_under: D-025
technical_approved_on: 2026-09-24
product_approved: true
product_approved_on: 2026-09-24
technical_approved: true
---

# Prototype feedback refinement

## Objective

Make the opening, expedition preparation, character interactions, sacrifice and closing scenes understandable, readable and consistent with the game's presentation. This incremental spec owns the 16 feedback items supplied by the user on 2026-09-24. D-016 approves the product and presented prose; D-025 approves the complete surface/technical set and verification design. The user authorized proceeding to task decomposition. Implementation and delivery acceptance remain pending.

## Source and scope

The user's message is the scope authority. The local [feedback document](../../../docs/known-issues/Feedback%20sobre%20o%20protótipo.md) is supplementary: it also contains items absent from that message. Its items 7–9, replacement trap illustrations, general trap prose rewriting, replacement of `Window.png`, and production of young Rheed's artwork are not automatically included. Choice styling requested in item 11 remains included without prescribing a global windowskin replacement.

Stable source IDs distinguish `OPEN-01` from the separately numbered `MENU-01`. Gaps in the original numbering are intentional.

| Requirement | Source issue | Player outcome |
| --- | --- | --- |
| RQ-001 | OPEN-01 | A proper title screen precedes a separate, legible age/content notice. |
| RQ-002 | MENU-01 | Choose the party, then the destination, with clear progression and full destination targets. |
| RQ-003 | MENU-02 | Rheed welcomes the listener and clearly introduces his connection to Ivaí and Irati. |
| RQ-004 | MENU-03 | Rheed and Ivaí fit the dialogue composition. |
| RQ-005 | MENU-04 | The tavern roster/memorial access belongs visibly to the setting. |
| RQ-006 | MENU-05 | A hero's picture and name form one coherent, clickable target. |
| RQ-007 | MENU-06 | Revised hero dialogue is used and successful selection returns to the tavern. |
| RQ-008 | MENU-10 | Sacrifice-related prose identifies the hero actually chosen. |
| RQ-009 | MENU-11 | Dialogue choices share the visual language of existing trap choices. |
| RQ-010 | MENU-12 | Rheed narrates epilogues over black with the standard dialogue box. |
| RQ-011 | MENU-13 | Route completion has a deliberate transition back to the tavern. |
| RQ-012 | MENU-14 | Each sacrifice candidate's picture and name are one coherent target. |
| RQ-013 | MENU-15 | Loss is perceptible on returning to the tavern, including previously dead heroes as decided in the interview. |
| RQ-014 | MENU-16 | The final medallion decision is visually prominent. |
| RQ-015 | MENU-17 | All cemetery text can be read without clipping. |
| RQ-016 | MENU-18 | Settings and saving are accessible from the tavern. |

## Status discipline and preserved boundaries

`Confirmado`, `Baseline de protótipo`, `Pendente` and `Fora do escopo` retain their project meanings. D-016 approves the reviewed product behavior and presented copy. Unresolved surface details, timings and assets retain their stated pending status; product approval does not invent their design or certify implementation.

Preserve permanent deaths, hidden competencies, encounter assignments, route unlock/completion rules, living-climax-participant epilogue eligibility, exclusion of reserves, ending consequences and player-controlled reading unless the user explicitly replaces a rule. Preserve automatic formation with one to three living heroes; zero living heroes means campaign defeat. A literal requirement for three selected heroes must not strand a campaign with fewer survivors.

This authoring request now includes the local task graph under D-025. Runtime implementation, commit, push, PR, Trello operations, new dependencies, remote services, engine/vendor changes and Coreto migration remain outside the current task-authoring action. `coreto/` and `Coreto_*.js` remain read-only. Existing local edits belong to the user and are preserved. Final delivery may not use placeholder art.

## Product behavior

### RQ-001 — Title and age notice

**Confirmado — D-017/024:** reuse the existing empty-tavern illustration `img/pictures/Dryland_Taverna.png`, darkened behind “Afogados em Terra Seca” and the entry menu, with a discreet, legible 16+ mark. The title mark is informational and does not replace the separate notice or its acknowledgement. No new exclusive title illustration is required; exact placement and rendered contrast remain surface work.

Show the game title and entry commands before the exclusive notice screen. The requested notice uses a plain black background and centered white text: “Este jogo não é recomendado para menores de 16 anos. Contém conteúdos relacionados a horror psicológico, morte e coerção”. Below it, show “Tenho 16 anos de idade ou mais” and a `Jogar` button that is disabled until checked. **Confirmado — D-002:** the notice and acknowledgement apply to both `Novo jogo` and `Continuar`; loading a campaign does not bypass the gate. **Confirmado — D-003:** every entry from the title requires a fresh acknowledgement, with the checkbox initially unchecked; do not remember acceptance between entries, sessions or browser visits. **Confirmado — D-022:** provide a visible `Voltar ao título` button and Escape; both cancel the notice without starting or loading a campaign, whether the checkbox is checked or unchecked. A later entry starts unchecked again. D-024 adds the title's discreet 16+ mark without changing this notice. This is the supplied game copy, not a claim of official classification certification.

### RQ-002 — Sequential preparation

**Confirmado — D-018:** present destinations on a single illustrated map with clickable locations and a side panel showing the selected destination's information. Preserve full location/name targets, destination names, rumors, progress/status and keyboard access. GDD §5.2 still keeps the Vilarejo Partido visible but locked until both map pieces are obtained and overlaid; this composition changes neither visibility/unlock rules nor the separate Partir commitment.

The tavern prepares the party. `Seguir` opens a separate destination presentation with a map aesthetic when formation is valid. Destinations have a visible container encompassing their selectable content; remove the unhelpful `Destino não escolhido` label. Preserve route names, rumors, availability and exploration information. **Confirmado — D-004:** selecting a destination only selects it; `Partir` deliberately starts the expedition after a valid destination and formation are present. Preserve the existing opportunity to return to formation before departure and retain still-valid selections. **Confirmado — D-013:** on the first map opening during preparation for each new expedition, Ivaí says “Bem, agora que nossa equipe está completa, vamos traçar nossa rota!”. The player advances the line before choosing a destination. Going back to edit formation and reopening the map within the same preparation does not repeat it. A later expedition gets the line again, including after retreat or initial-route completion; loading the same preparation does not create a new expedition.

**Confirmado — D-014:** Continue follows the last successful save. If that save records the introduction as completed for the current preparation, reopening the destination map does not repeat it. If it predates completion, the introduction is shown on the first map opening after restoration, even if the player read it before closing without saving again. Do not add an automatic save solely for this line or remember its completion outside the campaign save. Ordinary back/reopen during uninterrupted preparation still does not repeat it.

### RQ-003 — Welcoming prologue

**Confirmado — D-011:** revise the complete prologue, preserving its established facts and exact final young-Rheed/Ivaí exchange. Address the player as a listener to older Rheed's story and make the introduction welcoming through invitations, transitions and explanations rather than an abrupt declaration. Explain that Irati is Ivaí's mother and Rheed was Ivaí's helper. Keep Irati's death two years before the expedition explicit; do not confuse it with Ivaí's undisclosed possible fate.

**Spoiler boundary:** neither dialogue nor new opening captions, staging or imagery may reveal or imply Ivaí's possible death or the ending consequences. Preserve the existing concealment of the curse, medallion and Ivaí's plan. Do not describe him as dead, doomed or making a final journey. Older Rheed's retrospective framing and the established final exchange remain; do not append an ominous explanation or reaction. Do not invent additional lore.

**Complete copy — editorially approved under D-016, 2026-09-24.** Speaker labels below are authoring guidance; the player's text is the quoted passage. This replaces the earlier two-block-only proposal and the ambiguous “a contragosto de Irati” phrasing.

1. **Older Rheed:**

   > Boa noite. Pode se acomodar. Eu sou Rheed. Fico contente que tenha vindo me ouvir nesta Noite da História. Antes de começar, se me permite, vou lhe contar como entrei nessa história.

2. **Older Rheed:**

   > Naquele tempo, eu era bem mais jovem e acompanhava Ivaí, um bardo viajante. Era seu ajudante: cuidava dos pequenos afazeres e seguia suas orientações. Eu o chamava de mestre.

3. **Older Rheed:**

   > Irati era a mãe dele. Guardava os registros da família e havia morrido dois anos antes. Entre os papéis que deixou, havia um aviso: Ivaí não deveria envolver outras pessoas naquela busca.

4. **Older Rheed:**

   > Mesmo assim, Ivaí me pediu que espalhasse os anúncios da expedição. Fui eu quem chamou os oito que você vai conhecer. Talvez seja melhor começarmos pelo dia em que todos chegaram à taverna. Ivaí os recebeu com satisfação e abriu os papéis da mãe para explicar a viagem.

5. **Older Rheed:**

   > Havia lembranças da família, a descrição de uma tradição passada por gerações e referências ao lugar que procurávamos. Os mapas estavam incompletos; Ivaí admitiu isso assim que os abriu. Ainda havia caminho por descobrir.

6. **Older Rheed:**

   > Sobre o tesouro, falou pouco. Disse que pertencia à família, mostrou as anotações de Irati e explicou a ligação delas com aquele lugar. Então olhou para os oito e fez sua promessa.

7. **Ivaí, direct past scene — preserved wording:**

   > Minha família deixou as pistas. Vocês trazem a experiência para seguirmos por elas. O que encontrarmos, repartiremos entre nós.

8. **Young Rheed — preserved final question:**

   > Você não está esquecendo de nenhuma informação, mestre?

9. **Ivaí — preserved final reply:**

   > Os detalhes serão adicionados ao longo do caminho.

After player advancement, end the prologue and enter preparation without a coda. D-011 established the rewrite scope and spoiler boundary; D-016 approves the complete wording above.

### RQ-004 — Rheed and Ivaí framing

Fit the relevant busts proportionally above the standard dialogue box, keeping faces visible and preserving artwork proportions. The accepted hero-visit staging is a reference, not proof that the reported scenes pass. Identify all affected Rheed/Ivaí scenes and approve representative framing during surface design. The supplied request does not commission new young Rheed art.

### RQ-005 — Tavern memorial access

**Confirmado — D-020, refining D-019:** the opened noticeboard lists only the names of dead heroes, with no additional descriptive text or images. Show complete public names in a readable composition; no portraits, obituary prose, inscriptions or death-detail fields belong to the populated list. Show names together when they fit; retain pagination only if needed for legibility. Preserve keyboard/mouse access and return navigation.

Replace the decontextualized `Elenco` entry with an in-world wall noticeboard opening that name list. **Confirmado — D-005:** list only deceased heroes; when none have died, show “Ninguém ficou pelo caminho”. Living heroes remain accessible through their tavern interactions and formation presentation. Reading the board must not change campaign facts or trigger the final memorial progression. D-020 changes the tavern list, not the final cemetery's complete-text requirement under RQ-015. The established empty message remains unless explicitly replaced; the new restriction concerns the populated entries.

### RQ-006 — Tavern hero targets

Align each name with its hero and make the picture, name and defined container activate the same hero interaction. Preserve visible focus, selected-state distinction and keyboard access. Hover/focus alone does not add a hero. Dead heroes are never selectable, including while their images disappear. Container overlap and visual integration require surface acceptance.

### RQ-007 — Hero dialogue and successful-selection return

Use the approved working copy of [Falas de cada herói](../../../docs/narrativa/herois/Falas-de-cada-herói.md) for H1–H8 introductions, opinions and farewells. **Confirmado — D-006:** also use its “Ao ser selecionado(a)” line after a successful addition; when the player advances its final box, return automatically to the tavern. Do not leave the player in the hero menu or advance the line on a timer. Preserve the existing removal and full-party rejection behavior, including rejection without party mutation. **Confirmado — D-016:** include the same source's revised full-party wording; its rejection flow remains unchanged. The approved source hash is recorded in the baseline inventory and review-02.md.

### RQ-008 — Chosen victim in trap prose

When a consequence names a sacrificed hero, use the identity selected for that sacrifice, including after that hero has left the living party. Never infer it from the first remaining party member. **Confirmado — D-008:** show the danger without naming a victim, let the player select the sacrifice, show the selected hero's farewell, then narrate the consequence with the chosen name. The selection still commits and saves the death immediately; the later narration does not postpone the consequence or repeat it. Rework only affected failure/death passages to separate the causal danger from harm already attributed to the victim. Preserve source causality and avoid duplicate consequence paragraphs. Do not insert an unset name, predetermine a victim or apply a blind replacement to atmospheric descriptions that merely mention a hero. The [approved consequence copy](proposed-consequences.md) contains the two split failure passages and sixteen named death passages accepted under D-016; the filename is retained for stable references.

### RQ-009 — Consistent choice styling

Use the current trap-choice presentation as the visual reference for dialogue options: typography, borders, fill, spacing and focus/disabled states. Keep each choice's meaning, availability, reading order and interaction distinct. Surface design must inventory eligible narrative choices and explicitly delimit title, settings/save screens and the specially emphasized final decision.

### RQ-010 — Narrated epilogues

Replace epilogue illustrations with older Rheed using `img/pictures/Reed final.png`, black background and the standard lower dialogue box. “Narração” means the established textual narrative presentation; voice recording is not requested. **Confirmado — D-007:** keep the current epilogue prose, sourced from PR #15 and synchronized into the hero sheets; change presentation only, including identifying Rheed as narrator instead of attributing third-person narration to the depicted hero. Preserve source words, punctuation, order, survivor eligibility and sequence; reflow into readable native boxes is allowed. No new epilogue prose is commissioned by this increment.

**Confirmado — D-015:** use the existing present-day narration music and discreet audience ambience for these epilogues, preserving the Noite da História sound context and player volume/mute settings. Do not replay the opening applause. Consecutive hero epilogues share the same context without restarting it for each hero; enter it with the narrator and leave it when the epilogues end, preserving the separate ending, memorial and credits treatment. This includes no new music production or voice recording. Stage 2 must include the affected audio transitions and their verification.

### RQ-011 — Route-to-tavern transition

After the map-piece and complete route-closing sequence, provide a perceptible transition before tavern preparation resumes. **Confirmado — D-012:** use a visual transition only, with a brief pause over black followed by the tavern's gradual entrance; add no return-travel dialogue. Preserve piece delivery, first/second completion order, Irati/map-revelation passages and once-only consequences. Complete the route transition before the separate tavern absence effect of RQ-013. Surface design will establish timing and reduced-motion treatment.

### RQ-012 — Sacrifice targets

Make each eligible hero's picture, name and container activate the same sacrifice action, with visible keyboard focus. Preserve the existing warning that a single activation is immediate and irreversible, unless explicitly replaced. Opening the choice or advancing the preceding message must not accidentally sacrifice someone. Enlarging a target does not authorize selection of dead heroes or reserves.

### RQ-013 — Perceptible absences

Slow the disappearance enough for the player to perceive the loss. **Confirmado — D-009:** replay the disappearance of all deceased heroes only when returning from an expedition, including earlier deaths even if that expedition added none. Expedition returns include completed initial routes, voluntary retreat and automatic retreat when survivors remain. Do not replay when returning from a hero visit, the noticeboard, destination navigation or settings, or merely restoring an already reached tavern through Continue. No tavern return is added after the Council or total loss. **Confirmado — D-010:** all deceased heroes disappear simultaneously over 3 seconds; preparation interaction becomes available only after that interval. Do not impose that pause when nobody has died. Under reduced motion, show empty places immediately and enable preparation without the animation delay. This presentation must never repeat the death consequence or restore a dead hero's eligibility.

### RQ-014 — Final decision emphasis

**Confirmado — D-021:** place `Reunir` and `Destruir` in two centered, ornamented panels side by side, at a larger scale and with equal prominence. Preserve the existing consequence information below each action, their outcomes and keyboard/mouse access. Prevent the advance that closes the previous speech from activating a newly appearing choice. Selection remains direct, without an additional confirmation. Final dimensions and rendered legibility remain surface calibration.

### RQ-015 — Readable cemetery

Show the complete intended text for every deceased hero without clipping or overlap. Reflow, spacing and typography are candidate remedies; shortening authored inscriptions requires an explicit editorial decision. Validate the longest names, route/encounter labels and the maximum deceased roster. See the [reported clipping bug](../../../docs/qa/bugs/BUG-20260924-memorial-text-clipping.md).

### RQ-016 — Settings and save access

Provide visible tavern access to settings and `Salvar campanha atual`. Returning from settings preserves the current preparation and focus; opening it changes no campaign decision. **Confirmado — D-001:** the save action writes current state into the campaign's existing file, retaining autosave and creating no alternate rollback points or unrestricted slot selection. **Confirmado — D-023:** after successful completion, show a discreet `Campanha salva` notice in the tavern without requiring another click or interrupting preparation. Never report pending or failed storage as success. Preserve the existing native failure policy: Continue uses the last successful save. Define progress/failure presentation, precise notice calibration and a safe resumable tavern boundary in Stage 2.

## Authority map and contradictions

| Source | Owner / status | Governs | Required treatment |
| --- | --- | --- | --- |
| User brief, 2026-09-24 | Current requested direction | These 16 issues | Highest scope authority; record interview decisions here. |
| [Canonical GDD](../../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md), §§3.7, 5.1, 7, 15, 18, 19, 26–27 | Game design; mixed explicit states | Saves, roster, endings and presentation | Record explicit replacements in incremental ADRs and update affected clauses after product decisions. |
| [Incremental ADR-001](adrs/adr-001-prototype-feedback-product.md) and GDD §28 | Product/prose approved under D-016; surface decisions D-017–024; complete technical set D-025 | Scoped replacement of prior rules, surface and technical design | Reconciled through D-025; D-020 refines D-019 to names only. Implementation and delivery evidence remain pending. |
| [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) | Accepted architecture | Hero maps and return to hero menu | Partially supersede only the accepted selection-return behavior; preserve map ownership. |
| [Narrative integration ADR-003](../approved-narrative-dialogue-staging/adrs/adr-003-approved-prose-and-illustrated-epilogues.md) | Accepted source/presentation decision | Illustrated epilogues and approved prose | New narrator presentation replaces the illustration rule; D-007 explicitly preserves the existing prose authority. |
| [Narrative audio contract](../approved-narrative-dialogue-staging/approved-narrative-dialogue-staging.audio.md) | Accepted temporal sound direction | Present-day music, audience ambience and opening-only applause | D-015 extends the present context to narrated epilogues, superseding only preservation of their former audio; retain separate ending, memorial and credits treatment. |
| [Narrative integration spec](../approved-narrative-dialogue-staging/spec.md) | Baseline, evidence has separate states | Prologue, route closings, final scenes | Preserve historical delivery; name changed prose and staging explicitly. |
| [Hero bust staging](../hero-bust-staging/spec.md) | Completed scoped increment | Hero visits, not all Rheed scenes | Reuse appropriate reference without inheriting visual approval. |
| [Revised trap prose](../revised-trap-prose-integration/spec.md) | Prior scoped increment | Failure prose and death context | Identify changed sentences and lifecycle; its E2E waiver does not transfer here. |
| [Hero speech source](../../../docs/narrativa/herois/Falas-de-cada-herói.md) | Working copy accepted under D-016, hash recorded below | Introductions, opinions, farewells, selection and full-party lines | Preserve the approved revision and unrelated local edits; review any source drift before implementation. |
| [ADRs G004–G006](../../../docs/adrs/README.md) and [standing directives](../../../docs/_memory/standing_directives.md) | Accepted project policy | Execution and evidence | Risk-based verification, no gamepad tests, self-produced saves, teardown. |

Confirmed baseline rules affected by the request: title and notice are combined; formation and destination can be chosen in either order; selection stays in the hero menu; epilogues use illustrations without Rheed's bust; disappearances last one second and do not replay; unrestricted manual saves are prohibited. Explicitly requested replacements do not need the user to repeat the same request, but their unresolved consequences below do.

## Read-only baseline findings

Inspected on 2026-09-24 at HEAD `c47c6fcbc847158d0f96c9ec3eab912f6de127e2` on `main`, including preexisting uncommitted edits. No runtime reproduction, visual acceptance or audio test was performed.

- Map001 calls CE002, which combines title/content notices and entry choices. A title exists; the issue is its presentation and sequence, not the total absence of entry commands.
- CE003 owns preparation; CE038 draws the tavern; CE039 presents destinations; CE117 currently lists all eight heroes with status. Hero visits are Maps037–044. Selection in Map037 currently presents a line and returns to that map's loop.
- Hero pictures and labels are separate authored pictures. Static binding inspection alone does not prove the user's exact hit-area symptom. Track it as [reported, not reproduced](../../../docs/qa/bugs/BUG-20260924-choice-hit-areas.md).
- CE045 authors 60-frame disappearance moves; CE350 waits 60 frames. CE348/349 and presentation effect consumption participate in absence handling. The reported perceptual failure does not establish its root cause.
- Map002 contains the existing Rheed/Ivaí prologue. The [framing report](../../../docs/qa/bugs/BUG-20260924-rheed-ivai-framing.md) is separate from previously resolved hero/Council framing work.
- Map015 contains `A promessa apontada como falsa pertence a um dos heróis...` in passage `result.B1-2.failure.01`; generic hero references also occur in scene descriptions. D-008 resolves the sequence; substitution must respect that boundary.
- Follow-up inspection distinguishes two pre-selection result passages, `result.B1-2.failure.01` in Map015 and `result.B7-2.failure.01` in Map021, from the sixteen shared post-selection death passages, CE266–281 (`death.A1.context` through `death.B8.context`). All sixteen death passages currently say “um dos heróis”; they must identify the chosen victim under D-008. Descriptions that establish a threat without identifying the eventual victim are outside the substitution. This inventory is static evidence, not runtime verification.
- Map023 owns the Council; Map028 and CE058–060 own memorial presentation; CE338–345 own hero memorial readings. Maps029–036 own epilogues. `Reed final.png` and all eight `Dryland_EpilogueH*.png` files exist.
- The active registry contains VisuMZ providers plus `Dryland_CampaignRules`, `Dryland_EventBridge` and `Dryland_Presentation`. Installed Coreto tools are not evidence that Coreto bundles are active. No provider migration is included.

Working-copy SHA-256 anchors: hero speech source `81e5c8296fd2b96dd450561019108228c849e4c5f414a2e42ace71bc9c3fa28d`; CommonEvents `fc4ad8e1fdc4ec8c8e44f650fab9e76bf86e408e623bea2eb2b5bb577002d297`; plugin registry `99c2afe123ac9f597d956fa20660632f2d35f55cb3e85a2ec9f9ff8eb27c4e6a`. These are provenance, not acceptance results.

## Interview decisions

- **D-001 — Confirmado, 2026-09-24:** the user chose “Salvar campanha atual no mesmo arquivo”. RQ-016 now includes a deliberate write to the current campaign file, preserving autosave and irreversible outcomes. This is a narrow replacement of the prior prohibition on manual saving, not permission for free slots. Reconciled in GDD §§3.7/26/28 and incremental ADR-001; the complete spec remains a draft.
- **D-002 — Confirmado, 2026-09-24:** the user specified “O aviso de idade deve aparecer tanto a Novo jogo quanto a Continuar.” RQ-001 gates both entry paths. This decision does not establish how long acknowledgement is remembered; resolve that separately in OD-002.
- **D-003 — Confirmado, 2026-09-24:** the user chose “Pedir confirmação a cada entrada pelo título”. Each new-game or Continue entry starts with the checkbox unchecked and requires a new acknowledgement; no session or persistent acknowledgement is retained.
- **D-004 — Confirmado, 2026-09-24:** the user chose “Selecionar o destino e confirmar em ‘Partir’”. The new map surface preserves deliberate departure: selecting a destination never starts an expedition by itself. The party-first order changes; the separate departure commitment remains the GDD §7 baseline.
- **D-005 — Confirmado, 2026-09-24:** the user chose a deceased-only noticeboard with an empty-state message, accepting “Ninguém ficou pelo caminho”. This replaces the current all-roster Elenco overlay; living heroes remain available in the tavern. It does not replace or automatically enter the campaign's final memorial.
- **D-006 — Confirmado, 2026-09-24:** the user chose “Mostrar a fala curta e voltar à taverna”. A successful selection uses the source's selection acknowledgement, preserves player-controlled reading, then returns automatically to the tavern. Conversation, removal and full-party rejection retain their existing return behavior; this answer does not remove the rejection line or authorize automatic advancement.
- **D-007 — Confirmado, 2026-09-24:** the user chose “Manter os textos atuais e mudar apenas a apresentação” for epilogues. This narrows the original feedback's text-update request: preserve the existing PR #15 prose and change to older Rheed narrating over black. No editorial rewrite or alternate epilogue source remains pending.
- **D-008 — Confirmado, 2026-09-24:** the user chose “Perigo sem nome → escolha → despedida → consequência com nome”. Failure setup precedes victim selection without naming or killing a predetermined hero. Named harm follows the selected hero's farewell. Immediate permanent death/save at selection, outcome identity and continuation rules remain unchanged; presentation must not apply death twice.
- **D-009 — Confirmado, 2026-09-24:** the user chose “Repetir somente no retorno de expedição”. All deceased heroes participate in that return's absence presentation; ordinary tavern consultation round-trips do not replay it. Preserve actual route/retreat boundaries and never add a return after the Council or total loss.
- **D-010 — Confirmado, 2026-09-24:** the user chose “3 segundos com breve pausa da preparação”, accepting simultaneous disappearance before preparation is enabled. Reduced motion keeps places empty immediately. This replaces the one-second, interactive, once-only absence presentation only within the expedition-return scope of D-009.
- **D-011 — Confirmado, 2026-09-24:** the user requested “revisar todo o prólogo, preservando os fatos e o diálogo final. Mas sem dar spoiler ao jogador sobre a morte do ivaí.” Revise the complete prologue rather than only its first two narrated blocks. Do not reveal or imply Ivaí's possible death; keep ending outcomes and the previously hidden curse, medallion and plan undisclosed. Irati's established death remains a separate historical fact. D-016 subsequently approved the complete copy under RQ-003.
- **D-012 — Confirmado, 2026-09-24:** the user chose “Transição visual, sem nova fala” after map-piece/route closing. Keep the current narrative sequence and add only a short black pause and gradual return to the tavern. No travel scene or new return line is commissioned.
- **D-013 — Confirmado, 2026-09-24:** the user specified that “Bem, agora que nossa equipe está completa, vamos traçar nossa rota!” must appear in each new expedition. Present it once when first opening the destination map for that expedition's preparation; ordinary back/reopen or Continue of that same preparation is not a new expedition. This is not a once-per-campaign tutorial line.

- **D-014 — Confirmado, 2026-09-24:** during review follow-up, the user accepted “Sim, se a leitura não foi salva” for Ivaí's introduction on Continue. D-013's once-per-preparation rule applies to the restored save: completed reading in that save suppresses repetition; an earlier save can replay unsaved reading. Add no automatic save for the line and no separate persistent acknowledgement. This resolves review F-001 without changing the existing save-failure policy or later-expedition repetition.

- **D-015 — Confirmado, 2026-09-24:** during review follow-up, the user accepted “Música e plateia discreta já usadas nas narrações do presente” for Rheed's epilogues, without repeating the opening applause. Carry the existing present-day sound context into RQ-010 and include audio in the discipline handoff and verification. Existing same-context continuity, volume/mute and scene-exit rules apply; no new tracks or voice recording are commissioned. This resolves review F-002 at the product-contract level, without claiming audio implementation or listening acceptance.

- **D-016 — Confirmado, 2026-09-24:** after review-02 reported no new findings and identified the remaining editorial/full approval, the user stated “então está aprovado”. This approves the existing reviewed Stage 1 set: all 16 player requirements, D-001–D-015, player stories, the complete prologue, the named-consequence wording, the selected hero-speech categories including full-party lines, and the provisional verification scope. [Review-02](review-02.md#reviewed-fingerprints) identifies the exact reviewed inputs. This is not approval of surface/technical contracts that have not yet been authored, nor a claim of implementation or runtime acceptance. Do not request Stage 1 or the same editorial approval again.

- **D-017 — Confirmado, 2026-09-24:** the user answered “1” to the title-background question, selecting the existing empty tavern, darkened, behind the title and menu. RQ-001 and the UI/UX contract use `Dryland_Taverna.png`. The black notice remains unchanged. This approves the background direction only; it does not settle the notice's cancellation, optional badge, remaining surface details or technical implementation.

- **D-018 — Confirmado, 2026-09-24:** the user answered “2” to the destination-composition question, selecting a single illustrated map with clickable locations and a side information panel. RQ-002 and the UI/UX contract adopt that composition instead of destination cards. Preserve destination information, complete targets, keyboard navigation, valid back navigation and selection followed by Partir. Existing discovery and unlock rules remain: the final destination is visible but locked until both pieces are obtained and overlaid. Art, layout and native implementation are specified separately in the Stage 2 drafts, not approved by this answer alone.

- **D-019 — Confirmado, 2026-09-24; composition subsequently refined by D-020:** the user answered “1” to the tavern noticeboard layout question, selecting a newspaper with several deceased heroes per page and pagination when needed for comfortable reading. Preserve deceased-only content, the approved empty message and observational return to preparation. D-020 below is the current content/composition authority.

- **D-020 — Confirmado, 2026-09-24:** the user specified “prefiro uma composição apenas com os nomes dos herois mortos listados, sem textos adicionais ou imagens”. This refines the tavern noticeboard discussed immediately before the final-choice question: show a plain dead-hero name list without descriptive text or images. It supersedes the newspaper-entry composition of D-019 while preserving deceased-only content, the already approved empty state, read-only return and pagination only if legibility requires it. It does not answer the Reunir/Destruir composition question or change RQ-015's final cemetery.

- **D-021 — Confirmado, 2026-09-24:** the user answered “1” to the resumed Reunir/Destruir composition question, choosing side-by-side panels. RQ-014 and the UI/UX contract adopt two centered ornamented panels with equal prominence and existing consequence information below each action. Preserve outcomes, deliberate single activation and no additional confirmation. This approves composition, not the complete technical design or rendered appearance.

- **D-022 — Confirmado, 2026-09-24:** the user answered “1” to the age-notice return question, choosing the visible “Voltar ao título” button plus Escape. Both return without starting or loading a campaign, from either entry path and with either checkbox state. Preserve the fresh unchecked acknowledgement on every later entry. This closes cancellation access; the optional title badge and remaining surface details are separate.

- **D-023 — Confirmado, 2026-09-24:** the user answered “1” to the manual-save success question, selecting a discreet “Campanha salva” notice in the tavern, without another acknowledgement click. Display it only after actual successful completion; pending or failed storage is not success. This specifies manual-save feedback without changing autosave or the established native failure/Continue policy. Notice placement/duration and the safe persistence boundary remain technical design.

- **D-024 — Confirmado, 2026-09-24:** the user answered “2”, selecting a discreet 16+ mark on the title in addition to the separate age notice. It is informational, legible and subordinate to the title/menu. Preserve the full next-screen warning, checkbox, fresh acknowledgement and return controls. This closes the optional-mark decision without claiming official classification certification or rendered acceptance.

- **D-025 — Confirmado, 2026-09-24:** the user answered “sim” to “Você aprova esse conjunto técnico para seguirmos às tarefas?”. This explicitly approves the complete spec, verification design and five discipline contracts presented after D-024, including layout/timing calibration, native integration, per-preparation reading and current-file persistence lifecycle. Proceed to local task decomposition. This approval does not claim implementation, executed tests or rendered/human delivery acceptance. The ADR records the pre-approval file fingerprints; do not request this same technical approval again.

## Open decisions — ask one at a time

| ID | Decision | Recommendation / dependency | State |
| --- | --- | --- | --- |
| OD-001 | Meaning and successful feedback of the tavern save button | D-001/023: save into the current campaign file; discreet Campanha salva notice only after success, without acknowledgement; preserve autosave and no alternate rollback points. | Resolved. |
| OD-002 | Age-gate scope, acknowledgement lifetime and return | D-002/003/022/024: both entry paths, fresh unchecked checkbox every time; visible Voltar ao título button and Escape cancel without starting/loading a campaign; discreet 16+ title mark supplements the separate notice. | Resolved. |
| OD-003 | Destination confirmation and return | Resolved by D-004/013/014: select, then Partir; Ivaí's introduction on each new expedition preparation. Continue uses saved reading completion and may replay unsaved reading without a new automatic save. Preserve back navigation, valid selections and automatic formation below four survivors. | Resolved, including review F-001. |
| OD-004 | Noticeboard content and empty state | D-005/020: deceased names only, no additional descriptive text or images; empty copy “Ninguém ficou pelo caminho”. Spacing/readability remains surface calibration. | Resolved; D-020 refines the earlier newspaper composition. |
| OD-005 | Selection line, removal and source categories | D-006/016: source acknowledgement, then tavern; include the revised full-party wording while preserving removal/rejection flow. | Resolved; source scope approved. |
| OD-006 | Prologue rewrite boundary and exact copy | D-011/016: complete prologue approved under RQ-003, preserving facts, final dialogue and spoiler boundary. D-013/014 govern the route introduction. | Resolved; wording approved. |
| OD-007 | Named failure sequence | D-008/016: neutral danger → selection → farewell → named consequence, with approved copy in proposed-consequences.md; preserve immediate death/save at selection. | Resolved; wording approved. |
| OD-008 | Epilogue prose and narrated presentation | Resolved by D-007/015: preserve current PR #15 prose; use older Rheed over black with the existing present-day music and discreet audience, without opening applause. | Resolved, including review F-002. |
| OD-009 | Route-return transition content | Resolved by D-012: short pause over black and tavern fade-in; no new dialogue. Timing/reduced motion belongs to Stage 2. | Resolved. |
| OD-010 | Death-effect replay and timing | Resolved by D-009/010: expedition returns only, all deceased heroes simultaneously over 3 seconds before enabling preparation; reduced motion shows empty places immediately. | Resolved. |
| OD-011 | Detailed choice/framing/memorial surface | D-017/018/020–024 resolve the interviewed compositions; D-025 approves the [surface contract](prototype-feedback-refinement.uiux.md) and all affected discipline contracts. | Resolved and approved under D-025. Rendered delivery acceptance remains separate. |

## Technical design and discipline contracts

Stage 1 is approved under D-016 and Stage 2 under D-025, satisfying the [authoring playbook](../../../docs/_memory/spec-authoring-playbook.md) prerequisites for task creation. The current `<slug>.<discipline>.md` schema replaces duplicate legacy `_dx`/`_uiux` authorities. The approvals concern design; evidence of the implemented result remains separate.

| Contract | Owned change | Current state |
| --- | --- | --- |
| [UI/UX](prototype-feedback-refinement.uiux.md) | Changed-surface inventory, choice families, interaction boundaries and visible composition | Approved under D-025; rendered acceptance pending. |
| [Audio](prototype-feedback-refinement.audio.md) | RQ-010/D-015 epilogue context, entry, continuity, restoration, exit and verification | Approved under D-025; playback/listening evidence pending. |
| [Narrative flow/dialogue](prototype-feedback-refinement.narrativa.md) | Approved source transcription, reading identities and source-to-event ownership | Approved under D-025; D-016 prose approval preserved. |
| [Technical art and cutscene staging](prototype-feedback-refinement.technical-art.md) | Scene/asset inventory, proportional framing, final noticeboard/choice treatment and transitions | Approved under D-025; final assets and rendered evidence pending. |
| [Programming](prototype-feedback-refinement.programacao.md) | Native integration, state/save/input lifecycle and affected downstream consumers | Approved under D-025; implementation and technical tests pending. |

Keep each discipline contract independently approvable and assign each changed behavior one authority owner. Audio is affected by RQ-010/D-015: carry the existing present-day music/ambience into epilogues, with explicit entry, continuity, restoration and exit boundaries. Narration remains textual and does not imply voice work.

The proposed design keeps the existing VisuMZ provider order and the three Dryland plugin owners. Native events own content, pictures, reading and transitions; CampaignRules adds only the per-preparation introduction-completion fact/action; EventBridge owns its query and a deliberate current-file save command; Presentation retains input-release, observation and transient-effect ownership. No new plugin, dependency, Coreto extension, engine change or build is proposed.

The technical surface spans Map001/002/003, hero Maps037–044, affected encounter/Council/memorial/epilogue maps and their shared Common Events. The programming inventory assigns each native owner, including CE067 epilogue entry/continuity and CE061 audio exit. Picture containers become the selectable base target; decorative attachments do not receive separate clicks. The narrative and art inventories preserve source IDs, approved words, earned discovery and scene-specific bust proportions.

The save design preserves automatic checkpoints and current-file association. Deliberate saving writes after the requesting interpreter naturally advances to a resumable preparation boundary, then reports only that request's actual result. The introduction-completion field defaults to false only when absent from an older schema, persists with ordinary campaign saves, and resets only for a new preparation; no save is added just for reading the line. Existing saved event-list migration is not promised. Transient title acknowledgement, pending save feedback and absence effects are not restored as new actions.

Failure and cleanup are explicit: save failure follows GDD §3.7; stale campaign actions remain rejected; leaving a surface erases/unbinds owned controls; load cannot repeat a manual write/toast or an already reached tavern absence. Superseded active roster, epilogue-image, direct-departure and one-second parallel-release consumers are removed from the new flow after reference inspection. Existing asset files are not deleted without a separate consumer audit. Tooling, battles and deployment have no new behavior.

## Acceptance and next gate

[Verification](verification.md) assigns sensors, canonical suite owners and representative journeys to every approved RQ. The complete spec set is approved under D-025. The user approved the local graph of eleven implementation tasks and the ordered QA planning/execution pair for execution on 2026-09-24; [tasks.md](tasks.md#execution-approval) owns that authorization and current progress. All thirteen tasks remain pending, with execution not started. Implementation, runtime evidence and delivery acceptance remain pending. Do not reopen the approved product, editorial or technical scope.

Stage 1 approval includes the [player stories](_user_stories.md), the complete prologue under RQ-003, the [named-consequence copy](proposed-consequences.md), and the source document's full-party lines without changing rejection behavior. Source names, eligibility, permanent consequences and reading controls remain as specified above. The canonical GDD and incremental ADR record D-016; the two review reports preserve the reviewed snapshots and their historical verdicts.

Devlog moment: title → notice → party selection → destination map; later, a named sacrifice and the perceptible tavern absence; closing with the prominent medallion choice and Rheed epilogue. Suggested captures: one readable frame for each changed surface and short clips for transitions/death timing, including an epilogue clip with the present-day music and discreet audience audible without opening applause, using final assets and no QA overlays.
