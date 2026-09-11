# BUG-20260911-lovers-prison-not-visible: Retratos das amantes não mostram seu confinamento

- **Status:** open
- **Impact (user-side):** Trust-Damage
- **Severity:** Medium · **Priority:** P1
- **Persona Affected:** Rui, revisor de conteúdo
- **Journey Step:** J-mz-complete-campaign, descoberta após cada rota
- **Scenarios:** ART-mz-visual-audio-runtime; CAM-mz-discovery-closing
- **Found:** 2026-09-11 · **Report:** ../reports/2026-09-11-vn-picture-busts-dialogues.md
- **Disciplina:** Technical Art · **Responsável:** Lucas

## Summary

Na composição atual, Pérola e Floraí aparecem como bustos livres em primeiro plano. A igreja e a figueira aparecem ao fundo, mas nenhuma pedra, raiz ou outra oclusão vincula visualmente os retratos às prisões previstas no contrato.

## Reproduction

- **Charter:** CH-vn-picture-busts-dialogues · **Tour:** Feature Tour
- **Environment:** Chrome local18727,1920×1080/reduced,pt-BR,seed0.

1. Jogar, selecionar Gorvak/Elowen/Griznik e concluir Caminho da Igreja com abordagens viáveis.
2. Ler `lover.physical.warning`: Pérola está visível sobre Church.
3. Concluir Parque das Águas Assombradas e ler `lover.supernatural.second`: Floraí está visível sobre Figtree.

**Expected:** a composição preserva uma prisão perceptível; o contrato não autoriza figura solta/desvinculada.
**Actual:** retratos comuns sobrepostos aos fundos, sem confinamento visível. Os offsets zero evitam translação, mas não resolvem esse requisito visual.

## Evidence

Capturas reais inspecionadas pelo agente, no arquivo local de QA:

- `docs/qa/evidence/vn-picture-busts-dialogues/task-06/directed-bust-controls-council-2026-09-11T09-06-42-698Z/passage-34.png` — Pérola.
- Mesmo diretório, `passage-58.png` — Floraí.
- `report.json`: leituras `controls-stage` identificam os trechos imediatamente antes dos checkpoints acima.
- `task-07/layout-inventory-20260911-v2.json`: PNGs existentes não contêm pedra/raízes de prisão; CE109/110/111 têm deslocamento zero.

Os dados de enquadramento e PNGs não mudaram desde essas capturas. A revisão posterior do manifesto/alocação opcional de Conversation não acrescenta oclusão. Os lotes finais09 confirmam a mesma composição na fonte final.

## Fix

Não implementado. O contrato de Technical Art exige simultaneamente os12PNG inalterados e confinamento visível. A gramática aprovada deste incremento não inclui máscara/oclusão nem nova arte. Alterar ou criar PNGs violaria a restrição de preservação; nenhuma mudança de design foi inferida.

Próxima ação técnica: preparar composição/arte de confinamento com Lucas em escopo que autorize essa alteração, ou reconciliar explicitamente o critério com o baseline visual pretendido. V007 permanece sem PASS integral até existir solução e captura verificável. Isso não depende de aprovação opcional de gosto artístico e não interrompe os lotes independentes do loop atual.
