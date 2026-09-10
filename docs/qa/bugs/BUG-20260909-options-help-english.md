# BUG-20260909-options-help-english: Ajuda das opções aparece em inglês

- **Status:** verified
- **Impact (user-side):** Friction
- **Severity:** Medium · **Priority:** P2
- **Persona Affected:** Joana, jogadora ampliada
- **Journey Step:** J-mz-qa-accessibility, abrir Configurações
- **Scenarios:** ACC-mz-hide-keyboard-qa
- **Found:** 2026-09-09 · **Report:** ../evidence/init-rpg-maker-mz/task-13/directed-zoom-20260909-01/report.json

## Summary

A jogadora encontra as instruções Switch Category, Select e Back acima dos volumes, apesar de o jogo ser em PT-BR.

## Reproduction

- **Charter:** CH-mz-keyboard-qa · **Tour:** controles por teclado
- **Environment:** Chrome152, 1280×720 e1920×1080, pt-BR, cópia isolada

1. Abrir o jogo, ativar Jogar e abrir Configurações.
2. Ler a ajuda superior das opções.

**Expected:** instruções em PT-BR.
**Actual:** Q/W:Switch Category, Z:Select e X:Back.

## Evidence

- ../evidence/init-rpg-maker-mz/task-13/directed-large-20260909-01/all-volumes-muted.png
- ../evidence/init-rpg-maker-mz/task-13/directed-current-package-20260909-03/all-volumes-muted.png

## Fix

- **Root cause:** defaults em inglês preservados em ButtonAssist do CoreEngine e OptionsSettings do OptionsCore.
- **Fix commit:** nenhum; alteração local, commits manuais.
- **Regression test:** replay dirigido do pacote atual em native-surfaces.test.mjs; os quatro volumes continuam testados. Não foi criado teste unitário que apenas repita três literais de configuração.
- Transformação com precondições: .compozy/tasks/init-rpg-maker-mz/analysis/localize-options-help.mjs. Só três textos foram alterados; código de fornecedores, ordem e demais parâmetros preservados.

## Verification

1280×720 inspecionado: Trocar categoria, Selecionar e Voltar legíveis, quatro volumes em0%. 1920×1080 também inspecionado em directed-current-package-large-20260909-01/all-volumes-muted.png, com os mesmos três textos traduzidos e legíveis.
