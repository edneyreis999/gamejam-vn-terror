---
id: "08"
status: completed
depends_on: ["02", "03", "07"]
verification_ids: ["V-001", "V-002", "V-003", "V-008"]
supporting_verification_ids: ["V-005", "V-006", "V-007"]
---

# Task 08 — Integrated reading and checkpoint continuity

## Outcome

The combined game preserves reading, input, temporal audio and current-file Continue across every changed scene boundary. All source, domain, native integration and scope evidence is consolidated for the candidate, with actual experiential gaps handed to QA.

## Authority

- [spec.md](spec.md): RQ-001–012, especially RQ-010/011.
- [verification.md](verification.md): primary V-001/002/003/008; technical contributions to V-005/006/007, whose final verdict belongs to 10.
- [Programming](approved-narrative-dialogue-staging.programacao.md), [UI/UX](approved-narrative-dialogue-staging.uiux.md), [audio](approved-narrative-dialogue-staging.audio.md), [narrative](approved-narrative-dialogue-staging.narrativa.md) and [Technical Art](approved-narrative-dialogue-staging.technical-art.md).
- Canonical GDD §§19/26/27; [native runtime baseline](../eventbridge-minimal-runtime/eventbridge-minimal-runtime.programacao.md); [shared execution contract](tasks.md#shared-execution-contract).

## Scope

- Implementation: the actual boundary owners in `rpg-maker/The Dryland Drowned/data/Map002.json`, Maps007–016/023/025–036 and `data/CommonEvents.json`, especially query/reading/checkpoint/audio coordination. Include Map003/Map004 and Maps037–044 at their tavern/discovery/hero control and transfer boundaries, using 01/02/04's owned scene implementation. Inspect `js/plugins/Dryland_EventBridge.js`, `Dryland_Presentation.js` and `Dryland_CampaignRules.js`; change adapters only for a demonstrated in-scope defect, never as a new renderer, replay engine or state envelope.
- Tests: `rpg-maker/tests/suites/persistence.mjs`, `native-checkpoints.mjs`, `shared-ui.mjs`, `native-controls.mjs`, `native-audio.mjs` and the canonical content/native-inventory owners. Consume 01–07's domain/native/source evidence; repair stale shared helpers/fixtures at their existing owner, without a parallel test runner.
- Fixture/readiness owner: this task owns integrated two-file checkpoint fixtures, save/index completion observability, before/after Continue state and whole-candidate evidence freshness. Scene-specific fixtures remain the producers' responsibility.
- Data/assets: no new content or assets. Audit required imports, references, source statuses and final lossless provenance.
- QA/docs: scoped readiness/results and remaining gaps in this task and verification.md; update existing native authoring/audio/provenance documentation only where actual implementation changes it. Supply 09's fixture/evidence index.
- Delete targets: none preapproved. Retire a replaced helper only after proving zero functional callers, preserving its native empty CE record and stable ID. No source, vendor, historical spec or personal-save deletion.

## Checklist

- [x] Read 01–07's changed-path/fixture/evidence summaries. Freeze the combined candidate and source hashes; identify stale tests caused by any later change. Reuse equivalent results and rerun only affected gaps before the aggregate.
- [x] Exercise multi-box prologue, successes, closures, Council, endings and epilogues: local CaptureContext/ReadingComplete after the final box, no partial seen marks, stale/repeated actions rejected, one native transfer owner, explicit picture/attachment cleanup and query refresh.
- [x] Verify HIDE/Tab restore without advancing, Settings retains reader/composition/volumes, one physical confirmation cannot cross into a newly shown choice, and FAST is seen-unit-only and stops at unread content/choices. Preserve hero observation IDs and campaign-file separation.
- [x] Extend canonical save integration for two files at new_campaign/prologue, approach result, reward before closure, Council medallion reward and ending. Await real save payload and index writes; reload via native SaveCore, apply the next legitimate input and compare committed progress, death/reward/ending, seen state and file identity.
- [x] Check that no text box, narrator cut, hero visit or restore introduces a checkpoint; Continue may replay unsaved text from the actual earlier saved boundary. Do not migrate, reset, rewrite or revision-block old saves. Preserve native save-failure handling and last successful file.
- [x] Verify native audio descriptors/buffers across both temporal contexts, Settings/HIDE and Continue. Consumed welcome commands do not replay through helpers; an earlier unsaved opening follows its actual interpreter. Cover all four volume categories, zero/nonzero and ending ME precedence. Buffer tests do not constitute listening.
- [x] Consolidate independent source correspondence: six prologue units, two order-dependent closures, five Council speaking blocks in the approved sequence, three complete endings, eight epilogues/17 source pages/eight artworks, 30 trap successes and unchanged excluded trap fields. Never derive the entire expected result from candidate content.
- [x] Consolidate S-06 technical evidence: both solo initial routes, 0/1/2/3 Council witnesses with all legal hero-slot recipes, no reserve/dead opinions or epilogues, and total loss at the terminal boundary. Fixtures must demonstrate observable native execution, not setup alone.
- [x] Audit the entire integration diff and consumer inventory: engine/vendor bytes and plugin order retained, both plugin deltas composed, no HTML runtime, new dependency, hidden QA mutation, duplicate prose loader, missing source asset or accidental global cleanup. Confirm all thresholds/farewells/lovers/map-line/Council/hero branches are accounted for.
- [x] Run focused changed cases, then `node --test rpg-maker/tests/*.test.mjs` once against the combined candidate. Apply `deslop` before claiming code complete and follow `rpg-maker-mz-final-verify` for this technical handoff. Any necessary native editor metadata observation must be actually performed; inspect representative real events when metadata changed.
- [x] Record final V-001/002/003/008 verdicts and explicit remaining V-004/005/006/007 directed/visual/listening gaps. Set only delivery flags supported by their contract; keep runtime_verified/human_accepted/release_ready false until required QA is satisfied. Hand off a complete readiness package to 09.

## Validation

Execution mode/reference: source/static, pure-domain and real native-engine integration. Own S-06's aggregate technical result using 04/05/06/07 producers; prepare S-10 native save integration and S-11 buffer/control observations. S-01/02/04/05/07/08/10/11 directed runs remain assigned to 10. Do not attempt to satisfy them with mutated game/storage fixtures.

Required variants: two campaign files; opening, reward-before-closure, result, Council-reward and ending checkpoints; partial/seen/unread text, keyboard/mouse, normal/reduced, HIDE/Settings/FAST; both temporal contexts, four volume categories and all outcomes.

Invalidates/reuses: reuse 01–07 evidence only when source, event, Rules, provider, fixture and expected-result hashes match. Changed serialized lists or reading plans invalidate earned checkpoint reuse; changed audio invalidates recordings even if pictures match. Preserve user saves; own and tear down only isolated profiles/servers. QA earns directed saves through player inputs, independently of synthetic test fixtures.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| V-001, primary | Source/native/art/hero-sheet correspondence assembled from 01/03–07 | All approved content faithfully associated and only scoped replacements | `<run-id>/task-08/source-consolidation/` |
| V-002, primary | Canonical domain cases from content/encounters/discovery/sacrifice/endings | Correct plans/rewards/eligibility, independent expected sequence, duplicate rejection | `<run-id>/task-08/domain-summary/` |
| V-003, primary | Owned native cases plus canonical aggregate command above | Real native bodies complete once at true end, transfers/attachments clean | `<run-id>/task-08/native-summary/` |
| V-008, primary | Combined diff, plugin/consumer/asset audit and conditional editor observation | Approved architecture and whole dialogue scope; native editability retained | `<run-id>/task-08/integration-audit/` |
| V-005/006/007 contribution | Focused control/audio/persistence/checkpoint suites | No cross-gesture action, correct buffers/volumes and last successful file boundary | `<run-id>/task-08/continuity/` |

Paths are under `docs/qa/evidence/approved-narrative-dialogue-staging/`; retain actual canonical runner output references when they differ. Record exact commands, exit status, tools and hashes, not only planned directories.

## Execution Notes

**Fechamento atual: completed.** 134/134 casos canônicos com resultado válido pela composição de 121 PASS preservados do agregado e 13 donos revalidados (12 no lote afetado e IT-058 isolado). O agregado original continua FAIL; não foi renomeado como PASS. V-001/002/003/008 PASS; lacunas experienciais permanecem com a task10.

### Histórico de execução (estados superados pelo fechamento abaixo)

Em execução: IT-014 passou com20 limites em dois arquivos; IT-062/067 passaram para intérprete salvo/pictures e autoria nativa. IT-029 cobre buffers; casos de controles existentes entram no agregado. A suíte `node --test rpg-maker/tests/*.test.mjs` está em execução, log task04/canonical-aggregate.log. Não há veredito agregado antes do término. Nenhum commit ou publicação.


### Correções identificadas durante o agregado congelado

A execução `task-04/canonical-aggregate-corrected.log` ainda está ativa. IT-001 revelou a lista esperada de plugins sem a ativação aprovada de AttachedPictures; IT-058 ainda exige busto60 e uma única caixa nos epílogos. São contratos antigos dos sensores, incompatíveis com a mudança aprovada, não motivo para restaurar apresentação antiga. Após término, atualizar os sensores para a pilha aprovada e a sequência de caixas/ilustração, mantendo os testes de créditos. Também corrigir F-02 (guard IT-054), fortalecer a descrição de Draska em IT-081 e usar uma passagem futura válida em UT-055. Reexecutar somente os donos afetados; preservar este log como resultado real, sem chamar o agregado de PASS.

F-03 visual: descrição nativa de Draska (Map044,event001,page0,list92) corta o indicador em `task-10/runs/df0e5eb0-40ca-4e21-be4f-82b713285308/staged-72.png`. Ajuste de quebra, sem reescrita, será aplicado após o agregado e a coleta dos saves atuais. Equivalência dos demais fluxos será delimitada; captura estável de formação terá campanha fresca nos dois perfis.


Outras falhas do mesmo agregado: IT-025/078 ainda associam a primeira caixa do prólogo a uma conclusão inteira. A expectativa correta é próximo texto com estado da unidade preservado. IT-007 expôs corrida no helper `returnToTavern`: ele inspeciona a lista de escolhas antes dos20frames da saída e passa a esperar a taverna sem ativar o menu que chega depois. Ajustar o helper para esperar menu ativo `hero` ou `formation` e só então escolher o caminho; sem sleeps ou avanço especulativo de texto. Reexecutar seus consumidores afetados. UT-041 também contém literal antigo de prólogo, sem falha material na rejeição por fase.


### Reparos finais aplicados — 2026-09-18

O agregado terminou em3388.591s, exit1:134 casos canônicos,125 PASS e9 FAIL; o TAP conta136 testes e11 falhas ao incluir os dois filhos de IT-078. Seu `execution.json` parental registra PASS apesar desses filhos; esse artefato não é aceito como prova, e o TAP prevalece. Snapshot dos134 registros em `task-08/aggregate-before-final-fixes/`; log original preservado.

F-03 foi corrigido somente com `<br>` na descrição de Draska. F-05 adiciona Erase Picture63 depois da saída/espera opcional dos CEs263–265. A inversão de ambos os reparos reproduz byte a byte os hashes anteriores: não há outro delta de runtime após o agregado, nem mudança em Rules/providers/assets. Manifesto em `task-08/final-repair-delta.json`.

Sensores atualizados: IT-001 pilha aprovada, IT-025/078 avanço de uma caixa sem completar a primeira unidade, IT-058 ilustração e todas as caixas antes dos créditos, IT-054 guard por perfil. O helper de retorno espera o menu ativo antes de agir. IT-005 cobre saída normal/reduzida; IT-081 mede o indicador nas sete caixas de cada herói, ambos perfis. UT-041/055 usam IDs válidos atuais.

Em execução: `node --test --test-name-pattern='^(IT-(001|005|007|025|049|051|054|058|069|078|081)|UT-(041|055)) —' rpg-maker/tests/campaign.test.mjs`, log `task-04/final-affected-canonical.log`. Os nove casos que falharam e os quatro sensores alterados têm reteste explícito; não se renomeia o agregado anterior para PASS.


IT-058 atualizado percorreu oito epílogos e os modos mouse, keyboard, automatic, accelerated, late-mouse e late-keyboard; chegou ao modo final long (`credits-long.png`,03:51:07), mas o orçamento total240s terminou às03:51:19 antes do segundo bloco. O cenário ampliado progride; não foi observada espera de estado sem progresso. Após encerrar o lote congelado, seu orçamento total será300s, mantendo cada condição/timeout local, velocidade de rolagem,80linhas e todos os asserts. O log deste timeout permanece FAIL. IT-025 e os dois perfis de IT-078 já passaram no reteste.


### Fechamento técnico — 2026-09-18

134/134 casos canônicos com resultado válido pela composição de 121 PASS preservados do agregado e 13 donos revalidados (12 no lote afetado e IT-058 isolado). O agregado original continua FAIL; não foi renomeado como PASS. IT-058 final: `node --test --test-name-pattern='^IT-058 —' rpg-maker/tests/campaign.test.mjs`, exit0, corpo216.002s, total216.408s; sem falha/cancelamento. Orçamento300s aplicado somente ao caso ampliado, sem afrouxar asserts. Logs e hashes por caso: `task-08/final-composite.json`. O ledger conserva os três TAPs e a justificativa de equivalência.

Revisão independente encerrou F-01–F-05; fingerprint de76 caminhos de runtime/testes/fichas `c947986e39abdc80e24a80ec1d8961d283065848768ad9c2f1266f059bd9772a`. Deslop e auditoria de consumidores/diff concluídos; engine/vendor preservados. IT-067 e inspeção estrutural passam; os metadados de comandos não mudaram, logo a observação condicional do editor em V-008 não é aplicável. A captura real para devlog continua uma obrigação distinta da task10. V-001/002/003/008 PASS; controles e Continue dirigidos também fecharam em10, áudio técnico não equivale a escuta.

Auditoria de seleção/links em `task-08/candidate-audit-final.json`; nenhuma organização destrutiva, stage ou commit. Todos os testes encerrados e portas18726/18727 sem listeners. [relatório de QA](../../../docs/qa/reports/2026-09-18-approved-narrative-dialogue-staging.md) registra os onze lotes finais e os três bloqueios externos.
