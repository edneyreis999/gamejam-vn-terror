# BUG-20260911-reduced-exit-leaves-andira: Andirá e heróis continuam visíveis após saída em movimento reduzido

- **Status:** verified
- **Impact (user-side):** Trust-Damage
- **Severity:** High · **Priority:** P1
- **Persona Affected:** Joana, jogadora ampliada
- **Journey Step:** J-mz-complete-campaign, leitura/Conselho
- **Scenarios:** CAM-mz-discovery-closing; ART-mz-visual-audio-runtime
- **Found:** 2026-09-11 · **Report:** ../reports/2026-09-11-vn-picture-busts-dialogues.md
- **Disciplina:** Programação · **Responsável:** Edney

## Summary

Andirá e heróis continuam visíveis após saída em movimento reduzido. Não há mudança de fatos da campanha na correção.

## Reproduction

- **Charter:** CH-vn-picture-busts-dialogues · **Tour:** Feature Tour
- **Environment:** Chrome local,1280×720 normal/1920×1080 reduzido,pt-BR,perfil isolado.

Concluir rota final com três testemunhas e movimento reduzido; ler intervenção e opinião seguinte.

**Expected:** término da conversa libera seus bustos e o próximo texto/decisão recebe apenas nova entrada explícita.
**Actual:** o sintoma acima foi observado antes da correção.

## Evidence

Evidência bruta local, preservada em `docs/qa/evidence/vn-picture-busts-dialogues/`:

- Falha: `task-06/directed-bust-controls-council-2026-09-11T08-57-32-900Z; task-06/2026-09-11T09-00-28-369Z`.
- Reteste: `task-06/2026-09-11T09-01-35-054Z; task-06/directed-bust-controls-council-2026-09-11T09-06-42-698Z`.

## Fix

- **Root cause:** Basic_ExitBusts duration0 deixa targetOpacity0 com opacity255 e duration0 no fornecedor: o relógio que efetua autoerase nunca avança.
- **Fix:** O adaptador invoca o comando nativo preservado e conclui a saída instantânea por Game_Screen.erasePicture nos slots de sua propriedade. Saídas com duração mantêm o caminho original.
- **Fix commit:** não criado; diff local da spec.
- **Regression test:** IT-054 reduzido, nas suítes canônicas existentes.

## Verification

- **Retested:** 2026-09-11, tarefa06; relatório incremental ligado acima.
- **Result:** sensores atribuídos passaram após falhar na baseline; cópias e capturas permanecem íntegras. A suíte final09 renova a verificação no candidato corrente.
