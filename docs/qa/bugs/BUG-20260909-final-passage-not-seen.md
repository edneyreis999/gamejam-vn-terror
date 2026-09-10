# BUG-20260909-final-passage-not-seen: Retorno à formação perde o último trecho visto

- **Status:** verified
- **Impact (user-side):** Friction
- **Severity:** Medium · **Priority:** P2
- **Persona Affected:** Caio, estrategista recorrente
- **Journey Step:** J-mz-complete-campaign, concluir montagem do mapa e retornar à formação
- **Scenarios:** CAM-mz-discovery-closing, ACC-mz-hide-keyboard-qa
- **Found:** 2026-09-09 · **Report:** ../evidence/init-rpg-maker-mz/task-13/directed-reunite-20260909-02/report.json

## Reproduction

1. Jogar e concluir as duas rotas iniciais por ações legais.
2. Ler as duas falas da montagem do mapa até voltar à formação.
3. Consultar somente `expeditionQA.snapshot()`.

**Expected:** os dois trechos concluídos ficam em `seenPassages`.
**Actual:** `actionHistory` registra COMPLETE_PASSAGE de `map.reveal.02`, mas `seenPassages` contém somente `.01`. O mesmo defeito atinge a última fala do prólogo e outros retornos à formação; o skip de texto visto não pode reconhecer corretamente esses trechos.

## Root cause and fix

`completeCurrentPassage` adiciona o trecho visto a uma cópia, mas `formationTransition` devolve mudanças parciais. `accepted` mesclava essas mudanças sobre o estado anterior à leitura e descartava o novo registro. A composição agora preserva a cópia já atualizada antes de aplicar a transição. Nenhum fato de campanha é reconstruído do histórico; não há migração nem preenchimento retroativo de saves antigos.

Correção local em `Dryland_CampaignRules.js`, materializada em `.compozy/tasks/init-rpg-maker-mz/analysis/fix-reading-transition.mjs`. Sem commit; autoria de Task04, com regressão de descoberta em Task08.

## Verification

UT-055 e UT-032 falharam antes; os 66 UT passaram após a correção. IT-050/053 passaram com exit0. Evidências preservadas em `task-04/reading-regression-before` e `task-04/reading-regression-after`. O replay `task-13/directed-reading-fix-20260909-02` concluiu a campanha, preservou os quatro trechos de prólogo/descoberta/mapa e retomou o final salvo sem erros. Revisão independente confirmou a composição e ausência de alteração nos caminhos não terminais. Saves anteriores não recebem preenchimento retroativo.
