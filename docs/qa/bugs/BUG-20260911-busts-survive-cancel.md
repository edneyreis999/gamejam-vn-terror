# BUG-20260911-busts-survive-cancel: Bustos persistem após cancelar uma conversa

- **Status:** verified
- **Impact (user-side):** Friction
- **Severity:** Medium · **Priority:** P1
- **Persona Affected:** Joana, jogadora ampliada
- **Journey Step:** J-mz-complete-campaign, leitura/Conselho
- **Scenarios:** ACC-mz-hide-keyboard-qa; LOC-mz-session-recovery-export
- **Found:** 2026-09-11 · **Report:** ../reports/2026-09-11-vn-picture-busts-dialogues.md
- **Disciplina:** Programação · **Responsável:** Edney

## Summary

Bustos persistem após cancelar uma conversa. Não há mudança de fatos da campanha na correção.

## Reproduction

- **Charter:** CH-vn-picture-busts-dialogues · **Tour:** Feature Tour
- **Environment:** Chrome local,1280×720 normal/1920×1080 reduzido,pt-BR,perfil isolado.

Na integração, interromper o interpretador raiz durante preparação/foco/saída e liberar o trabalho pendente.

**Expected:** término da conversa libera seus bustos e o próximo texto/decisão recebe apenas nova entrada explícita.
**Actual:** o sintoma acima foi observado antes da correção.

## Evidence

Evidência bruta local, preservada em `docs/qa/evidence/vn-picture-busts-dialogues/`:

- Falha: `task-06/2026-09-11T08-38-30-431Z`.
- Reteste: `task-06/2026-09-11T08-45-14-816Z; task-06/2026-09-11T09-05-58-229Z`.

## Fix

- **Root cause:** A limpeza do root não percorria filhos que possuíam a conversa; a reconstrução privada também precisava perder autoridade antes da limpeza.
- **Fix:** clear cancela filhos recursivamente; close invalida owner/recovery/alvos antes de apagar somente seus slots.
- **Fix commit:** não criado; diff local da spec.
- **Regression test:** IT-060/064/066, nas suítes canônicas existentes.

## Verification

- **Retested:** 2026-09-11, tarefa06; relatório incremental ligado acima.
- **Result:** sensores atribuídos passaram após falhar na baseline; cópias e capturas permanecem íntegras. A suíte final09 renova a verificação no candidato corrente.
