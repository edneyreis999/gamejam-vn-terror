# BUG-20260924-memorial-text-clipping: textos cortados na cena dos túmulos

- **Status:** reported — aguardando reprodução dirigida.
- **Fonte:** feedback do usuário em 2026-09-24, item Menu 17.
- **Impacto:** informações do memorial ilegíveis ou incompletas.
- **Disciplina:** UI/UX com apoio de Programação; Narrativa caso seja proposta alteração dos textos.
- **Dono do trabalho:** [prototype-feedback-refinement](../../../planos/tasks/prototype-feedback-refinement/spec.md), RQ-015; [verificação](../../../planos/tasks/prototype-feedback-refinement/verification.md), V-015.

## Relato e esperado

O usuário relata cortes nos textos da cena dos túmulos e sugere ajustar fonte, espaçamento ou extensão. O texto pretendido deve ser integralmente legível sem corte ou sobreposição. Encurtar conteúdo autoral não é consequência automática de corrigir layout.

## Reprodução pendente

Produzir campanha e mortes por ações normais, chegar ao memorial e verificar nomes, rotas, encontros e inscrições, incluindo os textos mais longos e a maior ocupação. Registrar viewport, fonte, heroes presentes, captura e hash do candidato. Não depender de save externo nem criar mortos por injeção de estado.

## Evidência

A inspeção localiza Map028, CE058–060 e leituras de memorial CE338–345. Em 2026-09-25, a fixture técnica IT-055 reproduziu texto cortado: o último campo foi desenhado em y=198 com altura de linha 28 numa bitmap de 212 px. A escala da placa reduzia fontes 24/20/18 para aproximadamente 19,9/16,6/14,9 px. A captura de oito mortos e as medidas estão no lote local `docs/qa/evidence/native-tests/2026-09-25T17-26-02-608Z/`.

A tarefa 10 aplica placas sem escala com fonte 24 px, nomes/rotas/encontros completos e inscrições integrais em caixas nativas subsequentes. IT-055/056 passaram no lote `2026-09-25T17-28-30-532Z`, incluindo uma, três e oito mortes, leitura completa e movimento reduzido. A inspeção também encontrou vínculos de imagens anteriores que ocultavam túmulos; a saída da preparação e o preparo do palco agora os removem. Medição do catálogo completo e integração seguem na tarefa 10. Esses dados são evidência técnica isolada; reprodução/reteste dirigido por campanha própria e aceite visual permanecem pendentes na tarefa 13.
