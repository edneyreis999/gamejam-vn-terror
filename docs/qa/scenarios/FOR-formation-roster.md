---
id: FOR-formation-roster
area: FOR
title: Preparar a equipe e reconhecer ausências permanentes
persona: Lia, primeira expedicionária
journey: J-complete-campaign
expected: Heróis e destino podem ser escolhidos em qualquer ordem e os estados disponível, selecionado, automático, morto, concluído, bloqueado e vazio permanecem públicos e distintos
entry_points: file:///…/prototype/index.html
qa_status: pass
bug_ids:
fix_status:
retest_status:
fix_commits:
evidence: docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/native-automatic-reserve-one.json; docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/native-automatic-reserve-two.json; docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/pointer-overlap-probe.json; docs/qa/evidence/2026-09-05-prototype-v2-gdd-layouts/reduced-motion-slot-probe.json
last_report: docs/qa/reports/2026-09-05-prototype-v2-gdd-layouts.md
overlaps: ACC-accessibility-diagnostics; ENC-encounter-consequences
---

Planejar formação manual de zero a três, tentativa de quarto, formação automática com um a três vivos, inspeção separada da seleção, consulta do elenco e preservação da equipe ao trocar o destino. Nomes, resumos, fala, morte e progresso conhecido são públicos; competências, cobertura, viabilidade, seed, IDs internos e atribuições futuras não podem aparecer no conteúdo do jogador.

No primeiro retorno após uma ou várias mortes, todas as imagens correspondentes desaparecem juntas uma vez; com movimento reduzido, os lugares vazios aparecem imediatamente. Abrir painéis, focar, inspecionar ou rerenderizar não consome nem repete esse estado. Retornos posteriores mostram a ausência sem novo fade.
