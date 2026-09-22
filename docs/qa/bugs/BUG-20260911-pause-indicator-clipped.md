# BUG-20260911-pause-indicator-clipped: Indicador de avanço cortado na borda

- **Status:** resolved
- **Severity:** Low · **Priority:** P3
- **Disciplina:** UI/UX · **Responsável:** Pati, com apoio de Edney
- **Found:** 2026-09-11
- **Scenarios:** ART-mz-visual-audio-runtime; CAM-mz-discovery-closing
- **Report:** [QA dos bustos nativos](../reports/2026-09-11-vn-picture-busts-dialogues.md)

No epílogo de Draska, a segunda linha termina perto da borda direita da janela. O texto inteiro permanece legível, mas parte do losango verde de avanço sai da área visível. O problema aparece tanto em 1280×720 quanto em 1920×1080; o avanço por teclado continua funcional.

Reprodução: concluir uma campanha com Draska entre os sobreviventes do Conselho, escolher um final e avançar até seu epílogo. Esperado: indicador inteiro dentro da janela. Observado: indicador parcialmente cortado após “equipe.”.

Evidência local inspecionada: `task-09/directed-council-triple-H6-H7-H8-seed0-2026-09-11T10-08-59-171Z/bust-63-epilogue-H8.png` e `task-09/directed-bust-council-continue-2026-09-11T10-10-38-646Z/bust-14-epilogue-H8.png`, sob `docs/qa/evidence/vn-picture-busts-dialogues/`.

A captura anterior à migração dos epílogos, `task-03/2026-09-11T07-38-29-469Z/captured/qa/evidence/init-rpg-maker-mz/task-10/IT-058/epilogue-H8.png`, mostra o mesmo corte com o retrato automático central. Portanto, é um refinamento existente da janela de texto, não uma regressão dos bustos nativos. Texto, configuração global de MessageCore e vendor foram preservados. Correção não executada neste incremento; os critérios de identidade, nome e texto legível permanecem satisfeitos nessas capturas.

## Reobservação — 2026-09-18

O novo epílogo de Elowen reproduz o mesmo sintoma: `docs/qa/evidence/init-rpg-maker-mz/task-09/IT-073/epilogue-H2-normal-29-1.png`, após “dela.”, também no perfil reduzido. Causa localizada: MessageCore converte quebras401 em espaços, portanto o wrap autoral de78 caracteres não era aplicado na tela. Correção em preparação: `<br>` nativo entre as linhas já escritas, preservando prosa, número de caixas e provider global. O sensor de bounds do indicador entra no caso canônico IT-073. Nenhum PASS de correção antes do reteste/inspeção.


## Correção e reteste — 2026-09-18

Quebras nativas `<br>` mantêm as palavras/caixas dos novos epílogos. IT-073 PASS no agregado, todas as17páginas dos8heróis nos dois perfis, com bounds contra janela/viewport; imagens inspecionadas. O texto antigo do epílogo de Draska foi substituído pela fonte aprovada do PR15. A descrição da visita de Draska também reproduziu clipping (F-03) e recebeu quebras no próprio401, sem nova caixa. IT-081 PASS mede112caixas das visitas nos dois perfis; PNGs `staged-72.png` dos runs finais `e18dc7a4-08dd-46a8-8ef2-8e5ba34854df` e `b4ad6187-11b6-4351-a514-86cf61472a71` mostram o indicador inteiro. Correção verificada nesses conteúdos; não é promessa de wrap universal de qualquer prosa futura nem mudança global de MessageCore.
