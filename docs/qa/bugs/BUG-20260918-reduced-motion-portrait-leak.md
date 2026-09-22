# BUG-20260918-reduced-motion-portrait-leak: Ivaí permanece nos encontros com movimento reduzido

- **Status:** resolved
- **Severity:** Medium · **Priority:** P2
- **Disciplina:** Programação / UI
- **Found:** 2026-09-18
- **Scenarios:** CAM-mz-expedition-reading; SAC-mz-selection-death; S-04 da spec
- **Report:** [QA do incremento](../reports/2026-09-18-approved-narrative-dialogue-staging.md)

Reprodução dirigida: campanha nova, perfil1920×1080 com prefers-reduced-motion, selecionar um grupo, partir pela igreja e ler o threshold. A partir do primeiro encontro, o retrato de Ivaí continua à direita, inclusive durante resultados, despedidas e contexto da morte. No perfil normal, o mesmo dono de saída remove o retrato.

Esperado: a fala de entrada tem Ivaí; encontros/resultados usam somente a arte da armadilha, e despedidas mostram o herói que fala. Observado: slot63 herdado da fala anterior. Evidência local: `docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-10/runs/cb15050f-ef51-464c-bd6d-8bee3ff62cbd/staged-22.png` e vídeo com hash/report no mesmo run. O report contém campanha e inputs, não fixture fabricada. Quadros derivados em `task-10/visual/farewell-motion-reduced/` preservam sua proveniência.

Causa localizada: CEs263–265 chamam Basic_ExitBusts com duração0 e AutoErase; sua autoria não inclui Erase Picture63 após a espera opcional normal. A nova função de saída dos mapas037–044 tem a mesma omissão. Os donos históricos CE076/077 já liberam explicitamente imagens no ramo reduzido. Engine/vendor ficam preservados. Não se deve esconder o vazamento apagando o retrato apenas no encontro ou na despedida.

Reparo planejado na tarefa02: liberar os slots pertencentes à saída depois da animação opcional; estender o sensor nativo de transferência aos dois perfis e observar os percursos reduzidos corrigidos. Nenhum PASS de correção antes da execução.


Rastreamento refinado: mapas037–044 já apagam63 ao retornar ao label `hero` e60/63 ao transferir à taverna; não requerem cleanup duplicado. O reparo F-05 limita-se à saída dos três thresholds263–265. A função de autoria recebe opção de erase somente nesse consumidor.


## Correção e reteste — 2026-09-18

CE263–265 agora liberam63 explicitamente após a saída opcional. Inversão do delta reproduziu os bytes anteriores, isolando os três comandos. IT-005 PASS nos dois perfis; campanha reduzida final `b4ad6187-11b6-4351-a514-86cf61472a71` cobre todos os limiares/resultados. Perda reduzida `6202e7c0-ec52-4fa8-996f-01beda746e11` cobre as oito despedidas sem Ivaí residual. Quadros e transições reais foram abertos pelo executor, com hashes/proveniência no relatório do ciclo. Nenhum vendor ou cleanup tardio no encontro foi alterado.
