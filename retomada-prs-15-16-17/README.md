# Retomada — integração dos PRs 15, 16 e 17

Atualizado em 17/09/2026. Entrevista pausada a pedido do usuário.

**Branch:** `spec/approved-narrative-dialogue-staging`

**Spec canônica em elaboração:** [spec.md](../planos/tasks/approved-narrative-dialogue-staging/spec.md)

**Etapa:** entrevista de produto; a spec completa ainda não foi escrita nem aprovada. Nenhuma implementação foi iniciada.

Esta pasta guarda o ponto de retomada solicitado pelo usuário. A spec vinculada continua sendo o artefato canônico do trabalho; não criar outra spec para os mesmos PRs.

## Objetivo do usuário

Usar `rpg-maker-mz-issue-to-spec` e uma entrevista `grill-me` para elaborar uma spec completa que integre os PRs abaixo ao jogo nativo em `rpg-maker/The Dryland Drowned/`.

- [PR #15](https://github.com/edneyreis999/gamejam-vn-terror/pull/15), João: oito epílogos, oito ilustrações e uma prévia HTML. Integrar o conteúdo ao MZ; a prévia não é o runtime.
- [PR #16](https://github.com/edneyreis999/gamejam-vn-terror/pull/16), João: textos dos três finais e encerramentos das três trilhas. O PR contém `feedbacks/fim-do-jogo` e `feedbacks/fim-das-trilhas`, embora sua descrição ainda mencione apenas o primeiro.
- [PR #17](https://github.com/edneyreis999/gamejam-vn-terror/pull/17), Lucas: nova arte da taverna e apresentação da conversa de Gorvak. A conversa principal é a referência visual para **todas as conversas do jogo**, incluindo os casos de borda. Lucas informou que não testou essas variações, como a resposta de grupo cheio.

## Decisões já aprovadas — não perguntar novamente

1. **Textos dos PRs #15 e #16 aprovados.** Integrá-los; não reabrir a revisão editorial como requisito de aprovação.
2. **Ilustrações do PR #15 aprovadas.** Integrar as oito artes aos epílogos.
3. **As artes descritas no PR #16 não foram produzidas.** O usuário determinou reutilizar as imagens existentes no jogo, sem produzir novas artes para os finais. Os fundos identificados são `Dryland_EndingReunite.png`, `Dryland_EndingDestroy.png` e `Dryland_EndingTotalLoss.png`.
4. **Epílogos:** ilustração de cada herói em tela inteira, narração na caixa nativa inferior, controles de leitura do jogo e nenhum busto sobreposto. Substitui a apresentação atual dos epílogos com bustos.
5. **Padrão de diálogos:** preservar entrada, destaque do falante, escurecimento do ouvinte e saída da referência de Gorvak. Ajustar tamanho e posição por retrato e quantidade de participantes, inclusive no Conselho; não repetir cegamente os mesmos valores nem cortar personagens ou sobrepor rostos.

Os aceites estão registrados como D-001 a D-005 na spec. A aprovação desses pontos não equivale à aprovação da spec inteira nem autoriza iniciar sua implementação antes de concluir o fluxo solicitado.

## Pergunta exata em que paramos — ainda sem resposta

> Os novos textos de encerramento da primeira e da segunda trilha devem entrar depois das conversas com Pérola ou Floraí, antes do retorno à taverna?
>
> Recomendo essa sequência, preservando a entrega das peças e as falas específicas de cada personagem. “Primeira” e “segunda” acompanharão a ordem em que o jogador concluir as rotas, seja Igreja ou Parque primeiro.

**Não tratar essa recomendação como aprovada.** O usuário pediu a pausa em vez de responder. Retomar a entrevista por essa pergunta, uma pergunta por vez, sempre com recomendação e pesquisando no repositório o que puder ser descoberto sem perguntar.

## Evidência e contexto já levantados

- Os três PRs estavam abertos, sem comentários, reviews ou checks registrados na consulta desta sessão. Reconsultar ao retomar; isso não é uma promessa sobre o estado futuro.
- A spec guarda os hashes dos heads inspecionados. Baseline local no início: `3b5730495302e8676785e994421b3adfb4b82078`.
- PR #17: a comparação estruturada de Map037 confirmou que as falas não mudaram; mudam composição, transições e saída dos bustos. O JSON foi compactado, por isso o diff textual bruto exagera a quantidade de linhas removidas.
- PR #17 também muda parâmetros globais do VNPictureBusts: âncora Y de `1.0` para `.6` e escalas X/Y de `100` para `50`. Avaliar os consumidores de outras cenas durante o projeto técnico.
- No Map037, foram removidas cinco consultas `MotionPreference` e oito condicionais de movimento reduzido, com animações passando a usar 20 frames. A aprovação do padrão visual não aprovou retirar acessibilidade. Não copiar essa regressão automaticamente.
- O GDD ainda determina exibir literalmente os epílogos das fichas e usar bustos. A decisão atual do usuário aprova os textos novos e a apresentação ilustrada: registrar a substituição nos documentos de autoridade e ADRs, sem reabrir o aceite nem reescrever specs históricas.
- Preservar as regras de elegibilidade: epílogos somente para sobreviventes presentes após o sexto encontro do clímax; reservas não participam. Mortos aparecem no memorial. O Conselho pode ocorrer com Ivaí sozinho.
- GDD: Ivaí é o narrador comprometido da história. O texto do PR #16 usa o rótulo “Narrador”; a apresentação precisa ser encaixada nas cenas existentes sem inventar outro personagem.

### Superfícies nativas identificadas

- Map003: taverna; Maps037–044: interações dos oito heróis.
- Map023: Conselho, com ramificação solo e opiniões dos sobreviventes.
- Maps025–027: Reunir, Destruir e Perda total.
- Maps029–036: epílogos.
- CE049 chama CE292–295: apresentação de Pérola, aviso, peça anã e fala condicional quando sua rota vem por último.
- CE050 chama CE296–299: apresentação de Floraí, aviso, peça élfica e fala condicional quando sua rota vem por último.
- CE300: excerto de Irati na primeira peça; CE052 chama CE301–302 para a revelação do mapa completo.
- Map004 chama CE040 para a apresentação da campanha. O inventário completo de consumidores ainda precisa ser concluído.

## Como continuar

1. Ler este registro e a spec vinculada, conferir a branch e preservar alterações locais.
2. Recarregar as skills `rpg-maker-mz-issue-to-spec`, `grill-me`, `rpg-maker-mz-spec-preflight` e `rpg-maker-mz-create-spec`, se estiver em outra sessão.
3. Consultar `AGENTS.md`, GDD canônico e as memórias `spec-authoring-playbook.md`, `standing_directives.md`, `glossary.md` e `trello-workflow.md`. Já foram lidos nesta sessão; conferir mudanças posteriores.
4. Retomar pela pergunta pendente acima. Não refazer as perguntas já aprovadas.
5. Concluir decisões de produto, registrar os aceites e pedir confirmação da etapa de produto antes de finalizar o projeto técnico.
6. Completar `spec.md`, `verification.md` e somente os contratos de disciplinas afetadas, usando os templates atuais da skill MZ. Artefatos da spec em inglês; texto do jogador em PT-BR.
7. Atualizar GDD/fichas/ADRs conforme as substituições explícitas aprovadas e conferir rastreabilidade, ciclo de eventos, saves, controles, acessibilidade, QA e momento demonstrável para devlog.
8. Apresentar o conjunto completo para aprovação. Criar tarefas e implementar apenas na etapa posterior apropriada.

## Estado do trabalho salvo

- Rascunho da spec e este registro compõem o commit de progresso solicitado pelo usuário na branch indicada; sem push nesta pausa.
- Nenhum merge, comentário remoto, alteração no Trello ou mudança no jogo foi feito.
- Nenhum teste de runtime, playtest ou validação visual desses PRs foi executado nesta investigação.
- GDD, fichas e ADRs ainda não foram alterados; `verification.md`, contratos de disciplinas e tarefas ainda não foram criados.

Sugestão de mensagem para a próxima sessão:

> Retome a spec de integração dos PRs 15, 16 e 17. Leia `retomada-prs-15-16-17/README.md` e continue o grill-me a partir da pergunta pendente, preservando as decisões já aprovadas.
