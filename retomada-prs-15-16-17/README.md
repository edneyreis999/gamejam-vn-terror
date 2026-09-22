# Retomada — integração dos PRs 15, 16, 17, 18 e 19

Atualizado em18/09/2026. As dez tarefas concluíram a execução técnica. Prisão rústica integrada e verificada; audição/editor dispensados pelo usuário. Aceite visual registrado após o “Perfeito” do usuário; spec concluída, sem bloqueios. Commit e publicação ainda não realizados.

**Branch:** `spec/approved-narrative-dialogue-staging`

**Spec:** [spec.md](../planos/tasks/approved-narrative-dialogue-staging/spec.md) · **Estado da entrega:** [verification.md](../planos/tasks/approved-narrative-dialogue-staging/verification.md) · **Evidências:** [QA](../docs/qa/reports/2026-09-18-approved-narrative-dialogue-staging.md).

Esta pasta guarda o ponto de retomada solicitado pelo usuário. A spec vinculada continua sendo o artefato canônico do trabalho; não criar outra spec para os mesmos PRs.

## Objetivo do usuário

Usar `rpg-maker-mz-issue-to-spec` e uma entrevista `grill-me` para elaborar uma spec completa que integre os PRs abaixo ao jogo nativo em `rpg-maker/The Dryland Drowned/`.

- [PR #15](https://github.com/edneyreis999/gamejam-vn-terror/pull/15), João: oito epílogos, oito ilustrações e uma prévia HTML. Integrar o conteúdo ao MZ; a prévia não é o runtime.
- [PR #16](https://github.com/edneyreis999/gamejam-vn-terror/pull/16), João: textos dos três finais e encerramentos das três trilhas. O PR contém `feedbacks/fim-do-jogo` e `feedbacks/fim-das-trilhas`, embora sua descrição ainda mencione apenas o primeiro.
- [PR #17](https://github.com/edneyreis999/gamejam-vn-terror/pull/17), Lucas: nova arte da taverna e apresentação da conversa de Gorvak. A conversa principal é a referência visual para **todas as conversas do jogo**, incluindo os casos de borda. Lucas informou que não testou essas variações, como a resposta de grupo cheio.
- [PR #18](https://github.com/edneyreis999/gamejam-vn-terror/pull/18), João: 30 sucessos para A1–A8/B1–B2, sob títulos de abordagem simplificados. B3–B8 são arquivos vazios; não há novos textos de descrição/falha nem integração nativa na origem. A [análise local](../planos/tasks/approved-narrative-dialogue-staging/source-analysis-pr18.md) registra o mapeamento e a decisão confirmada de preservar os rótulos atuais.
- [PR #19](https://github.com/edneyreis999/gamejam-vn-terror/pull/19), Pati: prólogo nativo de Rheed, bustos jovem/mais velho, configuração de AttachedPictures, GDD §27 e evidências da entrega. Acrescentado pelo usuário à mesma spec durante a retomada; preservar o slug e esta pasta. A [análise local](../planos/tasks/approved-narrative-dialogue-staging/source-analysis-pr19.md) registra os cruzamentos.

## Decisões já aprovadas — não perguntar novamente

1. **Textos dos PRs #15 e #16 aprovados.** Integrá-los; não reabrir a revisão editorial como requisito de aprovação.
2. **Ilustrações do PR #15 aprovadas.** Integrar as oito artes aos epílogos.
3. **As artes descritas no PR #16 não foram produzidas.** O usuário determinou reutilizar as imagens existentes no jogo, sem produzir novas artes para os finais. Os fundos identificados são `Dryland_EndingReunite.png`, `Dryland_EndingDestroy.png` e `Dryland_EndingTotalLoss.png`.
4. **Epílogos:** ilustração de cada herói em tela inteira, narração na caixa nativa inferior, controles de leitura do jogo e nenhum busto sobreposto. Substitui a apresentação atual dos epílogos com bustos.
5. **Padrão de diálogos:** preservar entrada, destaque do falante, escurecimento do ouvinte e saída da referência de Gorvak. Ajustar tamanho e posição por retrato e quantidade de participantes, inclusive no Conselho; não repetir cegamente os mesmos valores nem cortar personagens ou sobrepor rostos.
6. **Encerramento da primeira e da segunda trilha:** inserir os novos textos depois das conversas com Pérola ou Floraí e antes do retorno à taverna, preservando a entrega das peças e as falas específicas. “Primeira” e “segunda” seguem a ordem de conclusão, seja Igreja ou Parque primeiro. O usuário aprovou a recomendação ao retomar a entrevista.
7. **Abertura do Conselho:** o texto da terceira trilha substitui a descoberta no cofre até a confissão de Ivaí, evitando repetir a revelação. Em seguida vêm Andirá, opiniões dos heróis elegíveis, último excerto de Irati e escolha final. A inspeção posterior da ordem em CampaignRules mostrou que o excerto hoje vem antes da confissão; a sequência aprovada muda essa posição.
8. **Simplicidade e variantes solo:** o usuário recusou adaptar agora os textos para Ivaí sozinho: “não precisa. vamos manter as coisas simples. esse tipo de refinamente eu trabalho depois.” Manter os textos aprovados; variantes solo ficam **Fora do escopo deste incremento**, como refinamento posterior do usuário. Referências textuais a companheiros ausentes são uma limitação aceita neste recorte, sem bloquear a entrega. Preservar as regras solo, os participantes reais e a elegibilidade; não inventar heróis presentes nem criar tarefas para a redação adiada.

9. **PR #19 no mesmo escopo:** incorporar seu prólogo e bustos à spec em elaboração. A spec concluída `prologo-rheed` continua como histórico da entrega de origem.
10. **Narrador é Rheed:** o usuário resolveu a identidade explicitamente. O PR distingue Rheed mais velho narrando suas lembranças e Rheed jovem como ajudante na cena. A sugestão anterior de narração anônima sem busto não foi aprovada e foi superada por essa informação. Não reabrir a identidade como pergunta.
11. **Decisão anterior parcialmente substituída:** D-011 havia aprovado Rheed velho sobre o cenário escurecido. A correção explícita em D-013 substitui esse fundo por preto em todas as aparições. Permanecem Rheed sozinho em primeiro plano, retorno aos personagens nas falas diretas e epílogos ilustrados sem bustos.
12. **Conversa do prólogo no padrão de Gorvak:** aplicar entrada, destaque, escurecimento do ouvinte e saída do PR #17 a Rheed jovem e Ivaí, preservando falas, lados e fundo da taverna. Substitui o destaque instantâneo de 10% da entrega original. O silêncio inicialmente preservado foi substituído depois por D-014.
13. **Presente e passado:** Rheed velho conta a história no presente, em cores, sempre sobre fundo preto. Rheed jovem e todo o restante dos acontecimentos narrados estão no passado, em tons pastel. O cenário ainda não foi desenhado; contexto posterior em D-015, com desenho/produção fora deste incremento. Não implementar a proposta anterior de cenário escurecido. Decisão incorporada ao GDD e à [ADR-001](../planos/tasks/approved-narrative-dialogue-staging/adrs/adr-001-rheed-temporal-presentation.md).
14. **Áudio distinto por época:** o usuário delegou ao agente a escolha de música e efeitos diferentes para passado/presente. Isso substitui a sugestão de silêncio e o silêncio original do prólogo, inclusive nas duas épocas da abertura. Seleção inicial no contrato de áudio: Town1 + People2 e aplauso inicial no presente; Town3 + People1 na taverna passada; Dungeon2 e ambientes já existentes na expedição. Arquivos locais conferidos, sem audição ou validação de mix nesta etapa.
15. **Noite da História:** no presente, Rheed é o melhor contador de histórias de Daratrine e conta esta história para centenas de criaturas, incluindo o jogador, numa cidade durante a Noite da História. Não inferir que Daratrine seja o nome dessa cidade. Não criar arte da plateia, avatar, fala extra ou mecânica de interação a partir desse contexto.
16. **PR #18 no mesmo escopo:** incluir o rework de armadilhas antes de encerrar produto. São 30 parágrafos de sucesso para dez encontros. Preservar o conteúdo jogável existente onde a fonte não fornece substituição; a inclusão não autoriza preencher automaticamente B3–B8. D-017 resolve a redação das escolhas.
17. **Somente os sucessos fornecidos:** o usuário aceitou manter as opções atuais e substituir apenas os 30 textos de sucesso do PR #18. Todo o restante dos textos de armadilhas permanece como está. Ele fará refinamentos futuros e aceita incoerências narrativas neste incremento; não inventar ajustes, exigir revisão editorial ou criar tarefas para corrigir o que foi adiado. GDD e ADR-002 registram a decisão.
18. **Epílogos sem recorte:** o usuário seguiu a recomendação de mostrar cada imagem inteira, centralizada e proporcional, com faixas pretas laterais quando necessário. Preservar texto inferior, HIDE e ausência de bustos. Sete fontes são 1536×1024 e Elowen é 1672×941. Decisão D-018 e ADR-003; não reabrir o enquadramento.

Os aceites estão registrados como D-001 a D-018 na spec, respeitando as substituições de fundo e áudio. O usuário respondeu **“sim, confirmo”** à pergunta de escopo consolidado dos PRs #15–19. Após solicitar a validação, o usuário respondeu **“aprovado”** em 18/09/2026. O conjunto completo está aprovado, incluindo a correção F-01: reservas vivas continuam disponíveis para conversar e selecionar na taverna, conforme as regras existentes. Não pedir novamente aprovação do mesmo escopo. O pedido posterior de executar com `loop tasks` autorizou a implementação do grafo.

## Aprovação recebida e próximo passo

O usuário aprovou o conjunto após receber a [validação](../planos/tasks/approved-narrative-dialogue-staging/validation-01.md). O único achado, F-01, foi corrigido no contrato de UI/UX. A [spec](../planos/tasks/approved-narrative-dialogue-staging/spec.md), o [plano de verificação](../planos/tasks/approved-narrative-dialogue-staging/verification.md) e os cinco contratos de disciplina estão aprovados.

As tarefas foram criadas com `rpg-maker-mz-create-tasks` e seu preflight. O [grafo](../planos/tasks/approved-narrative-dialogue-staging/tasks.md) reúne sete fatias de conteúdo/apresentação, uma de continuidade e integração, e o par final de planejamento/execução de QA. O pedido posterior de execução via `loop tasks` autoriza esse grafo. Essa autorização não significa execução ou QA concluídos. Não reabrir conteúdo aprovado nem escolhas de áudio delegadas.

## Evidência e contexto já levantados

- Os três PRs foram reconsultados na retomada: continuam abertos nos mesmos hashes, sem comentários, reviews ou checks registrados. Isso não é uma promessa sobre o estado futuro.
- A spec guarda os hashes dos heads inspecionados. Baseline local no início: `3b5730495302e8676785e994421b3adfb4b82078`.
- PR #18 foi inspecionado no head `2f91f94610ea27671d2bfeb9b5e4bf16abe718de`, aberto, mesma base, sem comentários/reviews/checks. Dez arquivos lidos e seis vazios conferidos; 30 sucessos correspondentes já existem em Maps007–016. Nenhum caminho alterado se cruza com os outros quatro PRs. Rótulos simplificados diferem das 30 opções atuais; detalhes na análise local.
- PR #17: a comparação estruturada de Map037 confirmou que as falas não mudaram; mudam composição, transições e saída dos bustos. O JSON foi compactado, por isso o diff textual bruto exagera a quantidade de linhas removidas.
- PR #17 também muda parâmetros globais do VNPictureBusts: âncora Y de `1.0` para `.6` e escalas X/Y de `100` para `50`. Avaliar os consumidores de outras cenas durante o projeto técnico.
- No Map037, foram removidas cinco consultas `MotionPreference` e oito condicionais de movimento reduzido, com animações passando a usar 20 frames. A aprovação do padrão visual não aprovou retirar acessibilidade. Não copiar essa regressão automaticamente.
- A contradição anterior do GDD sobre texto literal das fichas e bustos de epílogo foi reconciliada nas seções 15.1/18.2/encerramento e na ADR-003. A fonte aprovada do PR #15 prevalece; a sincronização somente dos trechos de epílogo nas oito fichas pertence à implementação, sem revisão editorial adicional.
- Preservar as regras de elegibilidade: epílogos somente para sobreviventes presentes após o sexto encontro do clímax; reservas não participam. Mortos aparecem no memorial. O Conselho pode ocorrer com Ivaí sozinho.
- CampaignRules e os casos existentes UT-026/027 confirmam que concluir uma trilha sozinho também é possível nas rotas iniciais quando restam reservas vivas; os textos novos pressupõem companhia. UT-028 cobre a prioridade da perda total. Os testes foram lidos, sem execução nesta investigação.
- A informação anterior de Ivaí como narrador veio do GDD local anterior ao PR #19. O usuário esclareceu que o “Narrador” é Rheed; o PR #19 acrescenta esse enquadramento no GDD §27. Reconciliar as afirmações antigas na consolidação, mantendo Ivaí como protagonista e sem converter automaticamente todo o texto existente.
- PR #19 está aberto no head `daa4f7cf0d0d074135d12dc96bbe3f77dd749ea8`, baseado em `3b5730495302e8676785e994421b3adfb4b82078`, sem comentários/reviews/checks na consulta. Inspeção estruturada e duas capturas de origem com hashes conferidos; nenhum playtest novo.
- Cruzamento com PR #17: ambos editam `js/plugins.js`, em entradas diferentes. PR #19 ativa AttachedPictures e esvazia sua lista automática; PR #17 muda padrões do VNPictureBusts. O novo fundo da taverna também aparecerá no prólogo, pois o nome do asset é reutilizado. Conferir a integração visual, sem substituir cegamente um arquivo pelo outro.
- Na origem, PR #19 entrega prólogo silencioso, retorno da ambiência, controles nativos e Rheed fora do elenco selecionável. Nesta integração, D-012 altera a apresentação da conversa direta e D-014 substitui o silêncio por áudio temporal. Refinamentos artísticos adiados permanecem separados.

### Superfícies nativas identificadas

- Map003: taverna; Maps037–044: interações dos oito heróis.
- Map002 no PR #19: nove caixas em seis passagens `prologue.rheed.*`; bustos `Reed final` e `Reed-novo`, pictures 60/61 e anexação explícita à janela.
- Map023: Conselho, com ramificação solo e opiniões dos sobreviventes.
- Maps007–014: A1–A8; Maps015–016: B1–B2, donos dos 30 sucessos do PR #18. Maps017–022: B3–B8, preservados. Maps005/006 são os organizadores das famílias, não A1/A2.
- Maps025–027: Reunir, Destruir e Perda total.
- Maps029–036: epílogos.
- CE049 chama CE292–295: apresentação de Pérola, aviso, peça anã e fala condicional quando sua rota vem por último.
- CE050 chama CE296–299: apresentação de Floraí, aviso, peça élfica e fala condicional quando sua rota vem por último.
- CE300: excerto de Irati na primeira peça; CE052 chama CE301–302 para a revelação do mapa completo.
- Map004 chama CE040 para a apresentação da campanha, com CE046/303 no fluxo de descobertas. Inventário adicional consolidado: CE263–265 limiares, CE282–289 despedidas, CE292–299 amantes/peças, CE302 fala de Ivaí e CE068–079 Conselho. As falas anônimas existentes não ganham Rheed automaticamente.

## Como continuar

1. Ler este registro e a spec vinculada, conferir a branch e preservar alterações locais.
2. Retomar somente os critérios bloqueados da [task-10](../planos/tasks/approved-narrative-dialogue-staging/task-10.md). Tasks01–09 e os reparos estão concluídos. Preservar a evidência válida e repetir apenas sensores invalidados pela resolução da prisão/escuta/editor.
3. Consultar `AGENTS.md`, GDD canônico e as memórias `spec-authoring-playbook.md`, `standing_directives.md`, `glossary.md` e `trello-workflow.md`. Já foram lidos nesta sessão; conferir mudanças posteriores.
4. Preservar a aprovação completa registrada acima e a resolução de F-01. Não refazer as perguntas já aprovadas.
5. Se surgir mudança de escopo, registrá-la no conjunto existente e distinguir seu aceite da aprovação já recebida.
6. O conjunto atual contém `spec.md`, `verification.md`, user stories e contratos de Narrativa, UI/UX, Technical Art, Áudio e Programação; artefatos em inglês, conteúdo do jogador em PT-BR.
7. Os cinco heads foram reconferidos na execução. Preservar saves pessoais, primeiras falhas e evidência histórica; repetir somente sensores afetados por mudanças, conforme ADR-G006.
8. A execução já está autorizada. Os lotes independentes terminaram; resolver os critérios que dependem de design/evidência externa; não reabrir decisões aprovadas.

## Estado histórico antes da execução

O registro abaixo descreve a investigação e o planejamento anteriores ao pedido de `loop tasks`. O estado atual está no grafo e no relatório de QA vinculados acima.

- O commit `82aad84` guarda a pausa anterior. A retomada acrescenta D-006 a D-018, RQ-001–012, user stories aprovadas, cinco contratos de disciplina, verificação, análises dos PRs #18/#19 e três ADRs; nenhum novo commit ou push foi solicitado.
- Nenhum merge, comentário remoto, alteração no Trello ou mudança no jogo foi feito.
- Nenhum teste de runtime, playtest ou validação visual da integração foi executado nesta investigação. Duas capturas de origem do PR #19 foram inspecionadas e tiveram seus hashes conferidos.
- GDD atualizado com narrador, temporalidade, Noite da História, direção sonora, limite das armadilhas, substituição dos epílogos, sequência do Conselho e §27 do prólogo integrado. Fichas serão sincronizadas na implementação; contratos e verificação estão aprovados. Foram criados `tasks.md` e `task-01.md` a `task-10.md`, todos pendentes.
- Abertura técnica: conferidos tamanhos das oito artes de epílogo; inspecionados visualmente Rheed velho/jovem, epílogo de Gorvak e amostras locais de busto/final/taverna. As artes inspecionadas já trazem a distinção cromática; recomendação é preservar as cores fornecidas, sem inventar filtro global. Isso não é QA do jogo integrado nem conferência visual de todos os assets.
- Projeto técnico: novas cenas `closure.first/second` entram após o grant da peça e antes de Irati/mapa; Conselho mantém IDs mecânicos e desloca `irati.03` para o fim. Textos longos podem usar várias caixas com uma única conclusão. Identidades de leitura são semânticas, sem hash de texto ou gate de revisão. Escopo de saves segue jogos novos/checkpoints da versão integrada; Continue retoma o último checkpoint real, não toda fala visível.

Sugestão de mensagem para a próxima sessão:

> Leia `retomada-prs-15-16-17/README.md` e o grafo de `approved-narrative-dialogue-staging`. Retome a execução já autorizada pelas tasks e pela verificação; preserve as decisões aprovadas e diferencie a F-01 da validação da spec dos achados posteriores de QA.
