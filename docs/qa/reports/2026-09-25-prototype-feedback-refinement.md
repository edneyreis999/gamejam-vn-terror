# Prototype feedback refinement — execução de QA

Estado: em execução, tarefa 13. A tarefa 04 foi reaberta após uma falha de partida na campanha dirigida; os demais escopos técnicos e o plano da tarefa 12 estão concluídos. Este relatório não concede aceite humano nem prontidão de entrega. O estado canônico está em [verification.md](../../../planos/tasks/prototype-feedback-refinement/verification.md).

O candidato usa o jogo nativo sem build, os três plugins Dryland de domínio/integração/apresentação, eventos nativos e PNGs finais autorais. Engine, VisuMZ e Coreto não foram alterados. Alterações anteriores do usuário permanecem no diretório; o [audit do candidato](../../../planos/tasks/prototype-feedback-refinement/candidate-audit.md) propõe inclusão por responsabilidade sem staging, commit ou remoção.

## Evidência técnica

Os recibos das [tarefas 01–11](../../../planos/tasks/prototype-feedback-refinement/tasks.md) registram os testes efetivamente selecionados, as falhas iniciais e os limites de reuso. Incluem título/aviso, nove blocos do prólogo, oito heróis, preparação/mapa, Quadro, dezesseis consequências, retorno/ausência, gravação real, dois painéis finais, inscrições integrais e oito epílogos/áudio. Não representam campanhas dirigidas novas.

Integração em 25/09:

| Execução | Resultado e interpretação |
| --- | --- |
| `2026-09-25T18-02-49-084Z` — IT-045/059/022/079 | Falhas preservadas: global antes do boot, symlink Windows, prazo do replay e separador Windows no executor. |
| `2026-09-25T18-11-20-482Z` — mesmos quatro | IT-045 PASS; IT-059 revelou outro acesso antes do boot; IT-022 excedeu 420s; IT-079 revelou espera incorreta pela mudança textual do checkbox. Não há PASS agregado. |
| `2026-09-25T18-15-06-511Z` — `UT-` | 62 selecionados, 61 PASS, 1 falha de preparação: UT-073/symlink Windows. Reteste focado pendente. |
| `2026-09-25T18-21-16-183Z` — IT-059/079/UT-073 | 3/3 PASS, saída 0, 145,4s. O reteste fecha a falha de preparação de UT-073 e verifica restauração de arquivos próprios em duas ramificações independentes. Os 61 resultados anteriores permanecem válidos para suas regras, sem mudança no runtime. |
| Executor instalado — `scripts/tests/browser-runtime.test.mjs` | 2/2 PASS, saída 0: armazenamento, reabertura, áudio WAV/WebM e vídeo. Validação do executor, não do jogo. |
| `2026-09-25T18-56-40-949Z` — IT-022/085/074 | 3/3 PASS, saída 0, 377,5s. Replay repetido dos finais, aviso/gestos e preload corrigido; diagnóstico por caixa dentro do evidenceRoot corrente. |

As correções do suporte usam prontidão de boot, junction para diretórios isolados no Windows e o estado real de habilitação do aviso. O executor instalado teve sua contenção de diretórios corrigida para o separador da plataforma; a edição protegida foi autorizada. FFmpeg/Winldd foram instalados no cache do Playwright conforme dependências existentes. Nenhuma nova dependência do jogo foi adicionada.

## Campanhas e sensores

Os lotes A–E seguem o [guia](../guides/prototype-feedback-refinement.md). O [caso dirigido](../../../planos/tasks/prototype-feedback-refinement/task-13-directed.mjs) usa somente teclado/ponteiro e observações auxiliares somente leitura. Archives devem conter saves obtidos nessa execução, com hashes do jogo, payload/índice, arquivo, origem e produtor. Não há campanha completa nova concluída neste relatório ainda.

T-001/editor está bloqueado no sensor: o RPG Maker MZ instalado abriu, mas duas capturas da janela, incluindo recuperação da seleção, falharam com `window crop is outside captured monitor`. A alternativa de leitura textual retornou `null`. Não houve edição, save ou round-trip no editor. O processo próprio, iniciado às 15:07:47, foi encerrado após falha do fechamento normal; sessões anteriores foram preservadas. Metadados estáticos não substituem esse critério.

A primeira coleta dirigida (`e55d4926-4c51-41d7-95bc-7539a019cec7`) foi interrompida pelo gravador WAV ao enviar amostras demais em uma única mensagem; não existe report.json final. Capturas, archive inicial, browser.log e vídeo parcial foram preservados sem PASS. A segunda coleta (`7261ce4b-ac35-434f-9d52-d2f1a005f111`) preservou o relatório: após Partir, CE39 transferiu para Map004 e encerrou apenas seu próprio interpretador; CE3 continuou e reabriu formação. O teste IT-087 foi fortalecido e reproduziu o defeito em `2026-09-25T19-14-46-826Z`. A correção encerra também o pai quando CE39 retorna em outro mapa, mantendo Voltar local. O reteste está em execução.

A segunda coleta também registrou um timeout secundário de 15s ao encerrar o áudio. A transferência agora usa PCM binário em blocos de 262.144 frames; 600.001 amostras variadas passaram pela comparação integral do WAV, RMS e limpeza. Oito testes de suporte passaram; falta confirmar a gravação longa real. Os demais recursos do run 7261 foram encerrados, sem listener na porta 18726. Nenhuma coleta completa foi promovida a PASS.

A [revisão independente do runtime](../../../planos/tasks/prototype-feedback-refinement/review-runtime-final.md) encontrou e confirmou a correção da omissão de seis placas em CE351; rodada 2: SHIP estático, demais 39 hashes runtime preservados. A revisão do suporte de verificação também apontou melhorias no inventário, prontidão da rota e proveniência do diagnóstico; suas correções e o suplemento de 677 hashes de imagens/áudio/fontes estão em reconciliação final. Esses pareceres não encerram os sensores vivos.

Inspeção técnica preliminar das imagens: o título mantém três comandos legíveis e marca 16+; a captura de oito túmulos mostra nomes, rotas e encontros em painéis separados, com todas as linhas dentro dos painéis. Trata-se de material de fixture identificado, não de demonstração jogada nem parecer humano.

## Pendências e encerramento

Permanecem os retestes focados, campanhas A–D, inspeção de vídeo/áudio, reconciliação dos bugs, revisão independente e atualização final do inventário. UI/arte/narrativa/ritmo/escuta requerem os pareceres selecionados pelo contrato contra material concreto. D-025 aprovou o design e a execução, não esses julgamentos.

O executor registra fechamento de seus contextos, navegador e servidor em cada relatório. A verificação final confirmará a porta e recursos próprios. O processo próprio do Editor MZ 41968 foi encerrado e a consulta posterior não encontrou RPGMZ ativo. Nenhum commit, PR, Trello, mensagem remota ou publicação foi executado.
