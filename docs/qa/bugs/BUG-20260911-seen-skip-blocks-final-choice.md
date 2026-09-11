# BUG-20260911-seen-skip-blocks-final-choice: Pular falas já vistas deixa a escolha final inativa

- **Status:** verified
- **Impact (user-side):** Blocks-Completion
- **Severity:** High · **Priority:** P1
- **Persona Affected:** Joana, jogadora ampliada
- **Journey Step:** J-mz-complete-campaign, leitura/Conselho
- **Scenarios:** ACC-mz-hide-keyboard-qa; CAM-mz-discovery-closing
- **Found:** 2026-09-11 · **Report:** ../reports/2026-09-11-vn-picture-busts-dialogues.md
- **Disciplina:** Programação · **Responsável:** Edney

## Summary

Pular falas já vistas deixa a escolha final inativa. Não há mudança de fatos da campanha na correção.

## Reproduction

- **Charter:** CH-vn-picture-busts-dialogues · **Tour:** Feature Tour
- **Environment:** Chrome local,1280×720 normal/1920×1080 reduzido,pt-BR,perfil isolado.

Revisitar o Conselho com falas já vistas e usar S até a escolha final. O estado visto do caso automatizado é uma fixture rotulada.

**Expected:** término da conversa libera seus bustos e o próximo texto/decisão recebe apenas nova entrada explícita.
**Actual:** o sintoma acima foi observado antes da correção.

## Evidence

Evidência bruta local, preservada em `docs/qa/evidence/vn-picture-busts-dialogues/`:

- Falha: `task-06/2026-09-11T08-42-44-650Z`.
- Reteste: `task-06/2026-09-11T08-45-14-816Z`.

## Fix

- **Root cause:** O caminho S chamava terminateMessage sem limpar Window_Message.pause, que no avanço nativo é limpo por updateInput.
- **Fix:** O caminho de skip consome entrada, cancela a árvore e limpa pause antes de terminar a janela. O próximo trecho recompõe apenas seus efeitos nativos.
- **Fix commit:** não criado; diff local da spec.
- **Regression test:** IT-065, nas suítes canônicas existentes.

## Verification

- **Retested:** 2026-09-11, tarefa06; relatório incremental ligado acima.
- **Result:** sensores atribuídos passaram após falhar na baseline; cópias e capturas permanecem íntegras. A suíte final09 renova a verificação no candidato corrente.
