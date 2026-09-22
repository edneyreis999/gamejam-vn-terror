---
id: "02"
status: completed
depends_on: ["01"]
verification_ids: []
supporting_verification_ids: ["V-003", "V-004", "V-005", "V-008"]
---

# Task 02 — Hero visits, thresholds and farewells

## Outcome

All eight hero visits and existing threshold/farewell conversations use the approved entrance, speaker emphasis, listener dimming and exit while keeping legal formation and each hero's menu continuity.

## Authority

- [spec.md](spec.md): RQ-008/010/011.
- [verification.md](verification.md): scoped sensor contributions below; aggregate verdict owners are [tasks 08 and 10](tasks.md#coverage).
- [narrativa](approved-narrative-dialogue-staging.narrativa.md), [uiux](approved-narrative-dialogue-staging.uiux.md), [technical-art](approved-narrative-dialogue-staging.technical-art.md), [programacao](approved-narrative-dialogue-staging.programacao.md) contracts.
- Canonical GDD §§19/26, [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md), PR #17 Gorvak main-conversation reference and the 2026-09-15 shared portrait correction cited in tasks.md.
- [Shared execution contract](tasks.md#shared-execution-contract), including source freshness, native ownership, canonical commands, evidence and teardown.

## Scope

- Implementation: `rpg-maker/The Dryland Drowned/data/Map037.json` through `Map044.json`, event001; `data/CommonEvents.json` CE263–265 and CE282–289 plus only their actually used presentation helpers. Inspect Map003 handoff and CE351 consumers; no tavern-orchestration migration.
- Data/assets: existing H1–H8/Ivaí portraits and inherited defaults from 01; native per-art positions/scales/tones only. Preserve prose and art.
- Tests: `rpg-maker/tests/suites/formation.mjs` and `sacrifice.mjs`, with `shared-ui.mjs`/`native-controls.mjs` only for affected shared invariants. Read existing farewell cases, including IT-012, before extending them.
- Fixture/readiness owner: this task owns eight-hero main/select/full-party/cancel recipes, legal living-unselected/dead states, all eight farewell renders and three threshold consumers; reuse existing native-bust/formation helpers.
- QA/docs: branch/consumer and per-art target ledger in task evidence, with scoped summary here; 09 reuses it in S-02/S-04.
- Delete targets: only superseded staging commands in owned event bodies. Preserve observation identities 82–113, functional helpers and all content; no file deletion.

## Checklist

- [x] Capture the current working menu, formation and all portrait targets before replacing staging. Compare the source Gorvak main path; do not copy its removed MotionPreference queries or reduced-motion branches.
- [x] Adapt all eight main conversations, selection responses and full-party responses, including profile-to-conversation continuity. Keep the visited hero on the menu; add Ivaí only when his dialogue starts and remove him before returning to that menu. Selection/full-party single-speaker responses do not invent listeners.
- [x] Preserve living unselected heroes' visits, conversation and selection; visits alone do not alter the expedition. Dead heroes stay unavailable. Keep selection/removal actions, auto-formation rules, return/cancel and observation IDs unchanged.
- [x] Apply the same style to CE263–265 and all eight CE282–289 farewells using each actual portrait's dimensions and transparent margins. Preserve the already fixed shared framing, original text, deaths and checkpoint ownership.
- [x] Verify normal and reduced branches reach matching final compositions, with no clipped faces or lingering busts after exit/transfer. Test HIDE/Settings and a held confirmation through representative dialogue/menu boundaries.
- [x] Run owned focused tests and export the complete consumer/branch ledger, geometry and actual inspected sample/transition evidence for 10. Record uncovered visual variants as pending, not as implied PASS.

## Validation

Execution mode/reference: S-02 and the threshold/farewell part of S-04 remain directed-browser in 10; this task prepares canonical native fixtures and local render/control evidence. Cover all eight heroes, main/selection/full-party/cancel, every farewell, normal/reduced motion and both desktop references.

Invalidates/reuses: Reuse 01's plugin/source baseline and compatible formation fixtures. New default/portrait/target changes invalidate all affected consumer captures; formation, controls or observation changes invalidate branch/read tests. Historical portrait-bug captures do not validate these new targets.

Use the focused canonical command from [tasks.md](tasks.md#shared-execution-contract) with actual registered IDs, and record the exact command/result. Evidence names below are planned subdirectories beneath `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/task-02/`; record actual canonical output paths when different.

| Verification ID | Command or sensor | Expected observable | Evidence path suffix |
| --- | --- | --- | --- |
| V-003/008 contribution | Canonical formation/sacrifice cases and live consumer audit | All owned branches run in their real maps/CEs; menus, formation and completion stay correct | dialogue-branches |
| V-004/005 contribution | Eight-hero/farewell geometry, renders, transitions and control probes | Faces visible, intended participants only, native exit/HIDE/Settings and reduced motion preserved | dialogue-presentation |

## Execution Notes

Implementation started after task01. Per-art positions compensate the approved anchor change; focus/dim and motion branches remain native. Main hero menu jumps explicitly retire Ivaí, and return retires both portraits. Speaking thresholds now stage only their actual Ivaí speaker; anonymous text remains unmodified. Focused native evidence is pending. Record decisions, actual changed paths/IDs, fixtures, commands, evidence, limitations and remaining QA here; synchronize task/graph status and the existing verification owner. No automatic commit or remote action.



### Scoped closure — 2026-09-18

`node --test --test-name-pattern='IT-081|IT-012|IT-082|IT-083|IT-084' rpg-maker/tests/campaign.test.mjs`: 5/5 PASS, exit 0, 656.7 s. Log: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-02/hero-and-results.log`; individual native receipts/captures remain in the canonical `init-rpg-maker-mz` evidence tree. This is native integration with isolated domain fixtures, not directed gameplay.

All eight hero maps/visit branches and eight farewell owners executed. `task-02-stage.py` preserves the previous per-art visible rectangles under AnchorY .6 and gives speaking thresholds the existing Ivaí art. Vaelith’s normal farewell capture was inspected: face, silhouette, name and text remain visible. Under ADR-G004/G006, exhaustive final composition/transition inspection and mouse/keyboard HIDE/Settings/held-input judgments remain assigned to task 10 S-02/S-04/S-11; canonical cross-scene control verification remains in task 08. These are explicit pending contributions, not a visual PASS.

No vendor/engine edits, dependency, commit or remote publication. Test-owned browser/server/profile teardown completed. Aggregate delivery flags remain false until their owners finish.


### Reabertura de QA — F-05, 2026-09-18

A campanha de perda reduzida `cb15050f-ef51-464c-bd6d-8bee3ff62cbd` mostra Ivaí63 herdado do threshold durante todos os encontros/despedidas. Compare `staged-17.png`/`staged-59.png` e o vídeo com a campanha normal `64e9e072-a353-4e78-bdce-8f7d358fee9c`, onde ele sai. Os CEs263–265 e a nova função de saída dos mapas037–044 chamam Basic_ExitBusts com duração0 e não fazem Erase Picture depois. Os donos históricos CE076/077 já usam limpeza explícita no ramo reduzido. Correção de autoria e sensor de ausência ao chegar ao encontro, em ambos perfis, ficam pendentes do agregado congelado. Não modificar provider nem remover o requisito de composição. A implementação local desta tarefa tem essa correção aberta; a marca de conclusão anterior fica histórica.


Rastreamento refinado: mapas037–044 já apagam63 ao retornar ao label `hero` e60/63 ao transferir à taverna; não requerem cleanup duplicado. O reparo F-05 limita-se à saída dos três thresholds263–265. A função de autoria recebe opção de erase somente nesse consumidor.


### F-03/F-05 — reparos aplicados

Quebra nativa da descrição de Draska e liberação do picture63 pelos três thresholds aplicadas após encerrar o agregado. Sem texto novo, caixa adicional, cleanup global ou edição de vendor. Inversão byte a byte confirma o delta exato. IT-005/081 e novas campanhas normal/reduzida estão em execução; status permanece in_progress até os resultados.


### Encerramento dos reparos — 2026-09-18

PASS: IT-005 normal/reduzido e IT-081 com112 caixas medidas (8heróis ×7caixas ×2perfis), mais ramos de formação. A revisão independente abriu Draska e seleção/recusa dos oito heróis nos dois perfis. Campanha normal final `e18dc7a4-08dd-46a8-8ef2-8e5ba34854df` e reduzida `b4ad6187-11b6-4351-a514-86cf61472a71` concluíram; reduzida preservou arquivo1.

F-05 resolvido: os três limiares exibem Ivaí e o encontro seguinte fica sem retratos; assertions em todos os resultados/introduções. A perda reduzida `6202e7c0-ec52-4fa8-996f-01beda746e11` tem as oito despedidas com somente o falante. O executor abriu os8PNG, os6quadros antes/depois dos limiares e amostras10fps dos vídeos reais: saída instantânea no modo reduzido, sem Ivaí residual, antes do contexto da morte. Proveniência em `task-10/visual/final-threshold-reduced/` e `final-farewells-reduced/`. As variantes normais de despedida já inspecionadas permanecem equivalentes; seus comandos/assets não mudaram. Todos os recursos dirigidos constam fechados. Nenhum gate externo das amantes/áudio/editor é reivindicado por este fechamento.
