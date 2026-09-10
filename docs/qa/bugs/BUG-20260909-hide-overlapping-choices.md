# BUG-20260909-hide-overlapping-choices: Restaurar HIDE sobrepõe duas listas de escolhas

- **Status:** verified
- **Impact (user-side):** Friction
- **Severity:** High · **Priority:** P2
- **Persona Affected:** Joana, jogadora ampliada
- **Journey Step:** J-mz-qa-accessibility, restaurar escolhas após HIDE
- **Scenarios:** ACC-mz-hide-keyboard-qa
- **Found:** 2026-09-09 · **Report:** ../evidence/init-rpg-maker-mz/task-13/directed-entry-20260909-03/report.json

## Summary

Ao restaurar a interface, a jogadora vê a lista nativa sobre os botões ilustrados. Os textos longos se sobrepõem e dificultam a leitura, embora a campanha permaneça intacta.

## Reproduction

- **Charter:** CH-mz-keyboard-qa · **Tour:** controles por teclado e restauração
- **Environment:** Chrome 152, 1280×720, DPR 1, pt-BR, cópia local isolada

1. Jogar, ler o prólogo, selecionar Gorvak/Elowen/Griznik e partir para Caminho da Igreja.
2. Ler até as três abordagens.
3. Pressionar Tab e restaurar com Tab ou clique.

**Expected:** voltar somente aos botões ilustrados, com foco e campanha preservados.
**Actual:** a janela nativa adicional reaparece sobre os botões e sobrepõe linhas de texto.

## Evidence

- ../evidence/init-rpg-maker-mz/task-13/directed-entry-20260909-03/choice-mouse-restored.png
- ../evidence/init-rpg-maker-mz/task-13/directed-entry-20260909-04/report.json: escala da lista passa de 0 para 1 após restauração por teclado; o segundo ciclo preserva incorretamente a lista visível.

## Fix

- **Root cause:** MessageVisibility restaura a escala sem reaplicar a apresentação `<Hide Choice Window>` de PictureChoices.
- **Fix commit:** nenhum; commits manuais. Correção local em Dryland_EventBridge.setInterfaceHidden.
- **Regression test:** rpg-maker/tests/suites/shared-ui.mjs, IT-026; roteiro dirigido em native-surfaces.test.mjs.

## Verification

Retestado em 2026-09-09 na mesma jornada e em A2/1280×720. IT-026 falhou antes (escala 1 em vez de 0); depois IT-025/026/027/046/050 passaram 5/5. A captura directed-export-20260909-01/choice-mouse-restored.png confirma três botões legíveis, sem a lista sobreposta. Estado e foco permanecem preservados. O restante do cenário de acessibilidade continua parcial.
