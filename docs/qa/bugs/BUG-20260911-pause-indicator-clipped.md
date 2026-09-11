# BUG-20260911-pause-indicator-clipped: Indicador de avanço cortado na borda

- **Status:** open
- **Severity:** Low · **Priority:** P3
- **Disciplina:** UI/UX · **Responsável:** Pati, com apoio de Edney
- **Found:** 2026-09-11
- **Scenarios:** ART-mz-visual-audio-runtime; CAM-mz-discovery-closing
- **Report:** [QA dos bustos nativos](../reports/2026-09-11-vn-picture-busts-dialogues.md)

No epílogo de Draska, a segunda linha termina perto da borda direita da janela. O texto inteiro permanece legível, mas parte do losango verde de avanço sai da área visível. O problema aparece tanto em 1280×720 quanto em 1920×1080; o avanço por teclado continua funcional.

Reprodução: concluir uma campanha com Draska entre os sobreviventes do Conselho, escolher um final e avançar até seu epílogo. Esperado: indicador inteiro dentro da janela. Observado: indicador parcialmente cortado após “equipe.”.

Evidência local inspecionada: `task-09/directed-council-triple-H6-H7-H8-seed0-2026-09-11T10-08-59-171Z/bust-63-epilogue-H8.png` e `task-09/directed-bust-council-continue-2026-09-11T10-10-38-646Z/bust-14-epilogue-H8.png`, sob `docs/qa/evidence/vn-picture-busts-dialogues/`.

A captura anterior à migração dos epílogos, `task-03/2026-09-11T07-38-29-469Z/captured/qa/evidence/init-rpg-maker-mz/task-10/IT-058/epilogue-H8.png`, mostra o mesmo corte com o retrato automático central. Portanto, é um refinamento existente da janela de texto, não uma regressão dos bustos nativos. Texto, configuração global de MessageCore e vendor foram preservados. Correção não executada neste incremento; os critérios de identidade, nome e texto legível permanecem satisfeitos nessas capturas.
