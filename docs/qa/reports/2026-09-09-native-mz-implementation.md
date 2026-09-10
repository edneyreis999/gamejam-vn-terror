# Implementação nativa MZ — evidência incremental

Estado de pausa e QA parcial: [playtest nativo](2026-09-09-native-mz-playtest.md). Os registros abaixo preservam as verificações incrementais; a retomada deve começar no checkpoint final de `.compozy/tasks/init-rpg-maker-mz/verification.md`.

Spec: `init-rpg-maker-mz`. Execução autorizada pelo usuário; o grafo serial continua em andamento. Esta evidência não encerra o plano completo, aprovação humana nem release.

## Entrada e prólogo

`node --test rpg-maker/tests/*.test.mjs` passou os casos IT-001 e IT-037 no Chrome 152.0.7977.83, Node 22.23.2, com servidor em `127.0.0.1:18726` e perfil temporário. Os dois casos foram repetidos com sucesso na rodada de 18 testes da task 02.

Foi observada a entrada com avisos e Jogar, o carregamento real dos dez plugins selecionados e dois plugins do projeto, o prólogo de três trechos, a composição 1280×720 e a chegada ao palco da taverna sem walking. A árvore tem 36 mapas com identidades e parentes verificados; os mapas das features posteriores ainda dependem das tarefas correspondentes. O servidor encerrou com SIGINT e deixou de aceitar conexão.

Evidência: [IT-001](../evidence/init-rpg-maker-mz/task-01/IT-001/result.json), [IT-037](../evidence/init-rpg-maker-mz/task-01/IT-037/result.json). Capturas de entrada, prólogo e palco da taverna foram inspecionadas visualmente. A arte existente permanece provisória.

## Conteúdo escrito no editor

A rodada de 2026-09-09 passou 18/18 casos registrados no manifesto incremental: os dois anteriores e 16 da task 02. O parser detectou seções ausentes/duplicadas/vazias/não encerradas, metadados e escolhas inválidos, comandos/escapes executáveis e referências de assets inválidas nos respectivos fixtures. A CLI retornou os JSON/códigos de saída documentados e preservou os arquivos do projeto. Reindexação preservou as identidades de trechos; o manifesto rejeitou hashes nativos alterados sem revisão.

No Chrome real, Present exibiu o primeiro trecho do prólogo, e a confirmação registrou somente essa leitura. Uma cópia isolada do projeto exibiu texto modificado no evento após reload, sem regenerar JavaScript. Capturas: [confirmação](../evidence/init-rpg-maker-mz/task-02/IT-004/confirmed-first-passage.png) e [edição nativa](../evidence/init-rpg-maker-mz/task-02/IT-035/edited-native-text.png). Cada ID possui `execution.json` com resultado, horário e hashes em `evidence/init-rpg-maker-mz/task-02/`.

## Formação e destinos

A rodada atual passou 35/35 casos em 133,28 s, incluindo os 17 da task 03, com Node 26.7.0 e Chrome 152.0.7977.83. A CLI de conteúdo e `git diff --check` também passaram. Os registros individuais ficam em `evidence/init-rpg-maker-mz/task-03/`.

Foram exercitados foco, conversa nativa, seleção/retirada, aviso de grupo cheio e formação automática. Os limites de sobreviventes e de progresso usam estados de domínio preparados; as jornadas completas de morte/recuo serão verificadas nas tarefas responsáveis. Capturas inspecionadas: [perfil](../evidence/init-rpg-maker-mz/task-03/IT-006/profile.png), [grupo cheio](../evidence/init-rpg-maker-mz/task-03/IT-007/full-party.png) e [destinos](../evidence/init-rpg-maker-mz/task-03/IT-008/destinations.png). Rumores e ilustrações permanecem em eventos nativos editáveis. A revisão independente confirmou a correção de três achados sobre catálogo, entradas de rota e conteúdo do painel.

## Encontros

Há 50 registros PASS compatíveis com os hashes atuais. A regressão passou 48 casos e cancelou dois por tempo limite; IT-005 e IT-049 passaram na repetição focada em 59,61 s. Não houve uma única rodada ininterrupta de 50 aprovações. A CLI de conteúdo e o diff check passaram.

Os 15 casos da task 04 verificam sorteio, reuso das atribuições, sobras da rota final, 48 abordagens em 56 formações e leitura. No Chrome, a transferência chega ao mapa atribuído; tecla mantida/clique duplo não selecionam uma abordagem nova; a releitura preserva integralmente a campanha. Capturas inspecionadas: [abordagens](../evidence/init-rpg-maker-mz/task-04/IT-005/approaches.png), [releitura](../evidence/init-rpg-maker-mz/task-04/IT-049/restored-choices.png) e [sucesso](../evidence/init-rpg-maker-mz/task-04/IT-051/native-success.png). O defeito de continuidade do evento antigo após Transfer foi corrigido e revisado.

## Ainda não verificado

Memorial, créditos, áudio, HIDE composto, campanha integral e pacote exportado continuam no grafo. Revisão cultural/editorial, arte e áudio finais e VoiceOver com operador humano permanecem separados. As tasks 12–13 planejarão e executarão a QA completa.

## Sacrifício e contexto de morte

A regressão passou 61/61 em 228,77 s. Após declarar as duas variáveis do enquadramento final, os dez UTs de sacrifício passaram novamente, assim como IT-012 (25,87 s, ou 46,29 s com limpeza dos processos). CLI e diff check passaram; a rodada completa não foi repetida após essas duas declarações. Os registros atuais usam Node 22.23.2 e Chrome 152.0.7977.83.

Foram inspecionados [aviso](../evidence/init-rpg-maker-mz/task-05/IT-012/warning-3.png), [candidatos](../evidence/init-rpg-maker-mz/task-05/IT-012/candidates-3.png), [despedida](../evidence/init-rpg-maker-mz/task-05/IT-012/farewell-3.png) e [contexto](../evidence/init-rpg-maker-mz/task-05/IT-012/context-3.png). As fronteiras raras usam receitas históricas de ações legais no domínio novo; a integração instala esses estados válidos antes de operar janelas nativas. Isso não substitui as jornadas E2E. As dezesseis legendas de causa continuam provisórias.

## Save e Continue nativos — Task 06

Implemented the five native bridge commands with explicit file0 checkpoint waits, envelope validation before game-object installation and same-boundary replay deduplication. The native title handles missing index metadata with its authored failure message; New Game remains direct. SaveCore and StorageManager retain their own backend and notifications.

Validation: final `node --test rpg-maker/tests/*.test.mjs` passed 79/79 in 457.24 s, including all 18 owned cases. Node v22.23.2, Chrome 152.0.7977.83. Every PASS record's source hashes were checked against the final tree. The content CLI returned `{"ok":true,"errors":[]}`; `git diff --check` passed. Earlier test-readiness/fixture failures were repaired and the full run supersedes them. Native revision: mz-20260909-10.

Inspected native captures: continued farewell, visible failed-save notification and usable title after incompatible load. Tests cover actual nested native event stacks, delayed/failed file0 I/O, unchanged save bytes on Continue/rejection, direct replacement of existing/terminal/invalid saves, missing metadata and six separate native-layout edits. Terminal domain plans are verified here; their complete native staging remains Tasks 09–10.

Bounded independent review confirmed pre-extraction validation, replay and missing-metadata handling. Its autosave-option concern was retracted after checking Stage 3 Force. The engine writes its auxiliary global index outside the campaign Promise; this increment preserves that native behavior. An interrupted first save can leave metadata absent, covered by the non-overwriting title handling rather than a second storage transaction or index reconstruction. No vendor edits, commits or remote actions.

## Recuo e ausências — Task07

The native controller now presents automatic return and saves confirmed voluntary retreat before transfer. CE45 owns simultaneous 60-frame opacity moves for new deaths, with immediate erasure under reduced motion. Temporary animation state never changes the durable consumed-death roster. Reentry and Continue show consumed absences as empty places. Native formation choices exclude dead heroes throughout the fade.

The final `node --test rpg-maker/tests/*.test.mjs` passed 86/86 in 537.38 s (Node22.23.2 / Chrome152.0.7977.83), including all seven owned Task07 cases. All PASS-record hashes were checked against the current tree. The content CLI and `git diff --check` passed; native revision mz-20260909-13. Inspected screenshots show fixed empty positions and the textual deceased roster.

The native tests observe actual picture updates, check simultaneous 60-frame completion with only 1e-9 numerical tolerance for unchanged coordinates, click a dead portrait during its fade, interrupt a transfer and use native Continue without replaying the effect. They verify reduced motion, cancellation, confirmed return/checkpoint and rejection after approach commitment. Boundary fixtures come from legal historical action recipes; complete player journeys remain in the QA tail.

Review corrected the native confirmation prompt ordering and restored missing tavern pictures after conversation without recreating pictures whose fades are active. The bounded independent review found no confirmed defect on the final revision. No hero image pixels, vendor source, historical prototype, commits or remote resources were changed. Creative acceptance remains pending.

## Descobertas e mapa — Task08

A regressão completa passou 89/89 em 648,406 s na revisão mz-20260909-15. Após corrigir o enquadramento da taverna na CE46, a revisão mz-20260909-16 passou os três casos próprios (UT-032, IT-052, IT-053) em 117,050 s. Os hashes desses três registros correspondem à árvore final desta etapa; os outros 86 registros pertencem à regressão anterior. Node22.23.2 / Chrome152.0.7977.83. CLI de conteúdo e git diff --check passaram.

As capturas nativas do recebimento e da montagem foram inspecionadas, incluindo o enquadramento corrigido. As duas ordens, movimento reduzido, confirmação explícita, som único, desbloqueio independente da animação e Continue sem duplicação foram exercitados. A primeira regressão revelou o Move Picture com duração zero sem efeito; o caminho de movimento reduzido agora usa Show Picture diretamente. A revisão independente retirou seu único achado após conferir a continuação nativa CE44→CE46.

Os três PNGs do mapa possuem transparência real e proveniência/prompts em rpg-maker/asset-provenance/. Foram gerados pela ferramenta de imagens e importados sem edição de pixels por script. Os retratos de Pérola e Floraí foram copiados das fontes existentes. Arte e revisão editorial finais continuam pendentes; nenhuma aprovação criativa, commit ou publicação foi realizada.

## Conselho e finais — Task09

A regressão completa passou 95/95 em 773,088 s na revisão mz-20260909-17, Node22.23.2 / Chrome152.0.7977.83. Os 95 registros PASS tiveram seus hashes conferidos. Depois de reforçar somente as asserções de IT048, os quatro UTs passaram novamente e IT048/IT054 passaram em 111,760 s. Os seis casos próprios têm hashes compatíveis com a árvore final da etapa; a regressão completa não foi repetida após esse reforço de testes. CLI de conteúdo e git diff --check passaram.

Foram inspecionadas as capturas de Andirá, Conselho coletivo/solo e dos três finais. As integrações verificam um busto por vez, duas opções finais, as três artes em tela inteira, checkpoints sem duplicação, sequência e cardinalidade exatas das transferências, memorial condicional e somente epílogos elegíveis. Continue usa a pilha nativa salva e preserva os bytes do autosave, sem abrir outro final ou reabrir a escolha.

A revisão independente não encontrou defeito confirmado de runtime; suas duas lacunas de evidência (ordem exata das entradas e arte de perda total) foram cobertas na repetição final. O memorial coletivo animado, os créditos e o fluxo completo de encerramento ainda pertencem à Task10. Arte e revisão editorial permanecem provisórias, sem commit ou publicação.


## Memorial, epílogos e créditos — Task10

A regressão completa passou99/99 em1100,184s na revisão mz-20260909-19, Node22.23.2 / Chrome152.0.7977.83. Início2026-09-09T16:23:36.421Z. Os99 registros PASS tiveram os hashes dos80 arquivos de entrada conferidos contra a árvore final. CLI de conteúdo e git diff --check passaram.

CE59–63 apresentam os mortos juntos, animam bustos e retratos com90/45 quadros, usam composição direta no movimento reduzido e encerram com créditos e botão Pular créditos. Os quatro casos próprios cobrem um/oito mortos, ausência de memorial sem mortes, todos os oito epílogos, texto exato, limpeza, isolamento de input e dois ciclos completos de Continue para cada final sem regravar file0. Foram inspecionadas capturas do memorial, epílogos e créditos; a lápide tem abertura alpha real e os retratos usam recortes nativos dos pixels existentes.

A primeira execução revelou nomes nulos em variáveis nativas recém-alocadas; foram corrigidos para strings vazias. As falhas restantes eram pressupostos de prontidão/destino/retorno ao título nos helpers e foram corrigidas. A revisão independente retirou um falso positivo sobre o ramo de movimento reduzido; a lacuna de clique foi fechada com press/release real e prazo anterior ao término automático. Não há achado de runtime aberto dessa revisão. Arte/editorial/áudio finais continuam sujeitos às verificações humanas. Nenhum commit ou publicação foi realizado.
