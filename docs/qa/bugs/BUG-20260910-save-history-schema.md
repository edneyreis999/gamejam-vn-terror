# BUG-20260910-save-history-schema: Continue aceita histórico malformado

- **Status:** verified
- **Impact (user-side):** Degraded
- **Severity:** Medium · **Priority:** P1
- **Persona Affected:** jogador que retoma campanha salva
- **Journey Step:** J-mz-session-recovery, Continue
- **Scenarios:** LOC-mz-session-recovery-export
- **Found:** 2026-09-10 · **Report:** revisão independente delimitada dos plugins próprios

## Reproduction

Em um save nativo válido, remover seed de history[0] ou acrescentar uma chave extra a esse evento; usar Continue.

**Expected:** recusar o payload pela falha nativa de carregamento antes de instalar objetos, preservando bytes e disponibilidade de Novo jogo.
**Actual:** validateState validava apenas tipo, sequência e tamanho do histórico. Payload malformado era aceito. Não foi observada corrupção espontânea em campanha legal.

## Evidence

UT-045 canônico ampliado falhou antes da correção: ../evidence/init-rpg-maker-mz/task-06/history-schema-before/regression.log. Fonte e evidência anteriores preservadas no mesmo diretório.66 UT passaram após a correção em history-schema-unit-after.log.

## Fix

Validar chaves exatas e domínios de cada evento persistido, que tem schema distinto da ação de entrada. Rejeitar NEW_CAMPAIGN no histórico, pois essa ação retorna estado vazio. Sem projeção, reparo silencioso, migração ou alteração de fornecedor. Tests na suite canônica persistence.mjs: UT-045 e IT-021; IT-023 preserva round-trip válido.

- **Fix commit:** nenhum; local.
- **Retest:**66 UT passaram; IT-021/023 passaram (2/2,47941.969292ms), incluindo recusa antes de instalação e preservação dos bytes. Pacote dirigido current-package-20260910-01 passou, sem erros de browser. Revisão independente delimitada confirmou cobertura de todos os eventos accepted(...), sem defeito adicional no incremento.
