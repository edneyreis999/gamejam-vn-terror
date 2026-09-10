# QA nativa MZ — execução retomada em 2026-09-09

## Aceite final — 2026-09-10

O usuário declarou “está aprovado pelos testes humanos”. Tasks11/13 concluídas;23 últimos vereditos E2E pass e V-VISUAL/V-AUDIO/V-HUMAN/V-EXPORT pass no escopo aceito. A aprovação supera os bloqueios históricos abaixo. O bug narrativo permanece refinamento conhecido, sem correção. [Entrega consolidada e material visual](../deliveries/init-rpg-maker-mz/README.md), com aceite e hashes do runtime. Nenhum teste ou audição adicional pelo agente é alegado.

O histórico da retomada inclui dois defeitos de comportamento: sobreposição ao restaurar HIDE e perda do último trecho visto ao retornar à formação. Ampliou também os testes dirigidos em Chrome. Task11 continua bloqueada por audição; Task13 está bloqueada nos sensores humanos restantes. A entrega não está aprovada para release.

## Fechamento após revisão de saves — 2026-09-10

[BUG-20260910-save-history-schema](../bugs/BUG-20260910-save-history-schema.md) corrigido e verificado: Continue agora recusa eventos persistidos com campos ausentes/extras/inválidos antes de instalar objetos do save. UT-045 falhou antes;66 UT e IT-021/023 passaram depois. Revisão independente delimitada sem defeito adicional no incremento.

O [manifesto vigente](../evidence/init-rpg-maker-mz/task-13/V-EXPORT/current-package-20260910-manifest.json) contém1419 arquivos. O [pacote mais recente](../evidence/init-rpg-maker-mz/task-13/directed-current-package-20260910-01/visual-review.json) passou entrada/escolha/Continue com comparação integral. A [análise de impacto](../evidence/init-rpg-maker-mz/task-13/V-VISUAL/history-schema-impact.json) preserva a cobertura visual anterior, pois a mudança exclusiva foi no validador. Task06 concluída novamente; Task13 segue bloqueada somente nos pareceres humanos descritos abaixo. Não houve execução nova da suíte integral.

## Atualização mais recente — 2026-09-10

Zoom real110% passou; canvas1555×874 CSS. A [matriz S01–S11](../evidence/init-rpg-maker-mz/task-13/V-VISUAL/surface-matrix.md) reúne as duas áreas. A revisão de save mantém V-VISUAL parcial por contraste/duração durante o fade; recuperação funcional e Novo jogo passaram, inclusive nas novas capturas com opacidade plena. Retry foi verificado na área maior.

O [pacote completo atual](../evidence/init-rpg-maker-mz/task-13/V-EXPORT/current-package-manifest.json) substitui a cópia histórica como prova do runtime atual. [Continue](../evidence/init-rpg-maker-mz/task-13/directed-current-package-20260909-04/visual-review.json) passou com igualdade integral do snapshot/validação no mesmo estágio de escolha. E2E-018/V-EXPORT passaram no escopo autorizado de Chrome.

A [ajuda em inglês das opções](../bugs/BUG-20260909-options-help-english.md) foi corrigida por configuração e inspecionada nas duas áreas; IT-028 passou (1/1). Acessibilidade/QA (ACC-mz-hide-keyboard-qa) passou. Sem audição ou aceite criativo; a contradição narrativa do memorial ainda está aberta. As pendências de zoom/editor mencionadas no histórico abaixo foram superadas/excluídas, respectivamente.

## Escopo atual após orientação do usuário

Testes diretamente no editor do RPG Maker, incluindo a reexportação pela interface como validação, estão fora de escopo e deixaram de bloquear a execução. O usuário escreverá uma ADR futuramente. Referências anteriores a esse bloqueio são históricas. A matriz visual/acessibilidade foi consolidada na atualização acima; parecer de UI, audição e revisão editorial/artística continuam pendentes.

## Resultado técnico

| Lote | Evidência em `../evidence/init-rpg-maker-mz/task-13/` | Resultado observado |
|---|---|---|
| Preparação, escolhas longas, avanço segurado e volumes zero | `directed-input-20260909-01` | Executado; E2E-003 revisado |
| Reunir, trio vivo, Igreja primeiro | `directed-reunite-20260909-02` | Final, três epílogos e Continue revisados |
| Destruir, trio vivo, Parque primeiro | `directed-destroy-20260909-01` | Ordem inversa, final e Continue revisados |
| Conselho solo, reservas vivas | `directed-solo-20260909-01` | Grupo do clímax vazio, sem epílogos individuais |
| Perda total e interrupção da despedida | `directed-loss-20260909-01` | Oito mortes em Vilarejo/6; seq15 salva/restaurada na despedida; final ruim e oito sepulturas |
| Memorial com sobreviventes | `directed-mixed-20260909-01` | Uma morte, três epílogos, créditos automáticos e skip por mouse |
| Recuo, revisita, desaparecimento e HIDE | `directed-absence-20260909-03` | Fade com imagem intermediária, ausência persistente, A2 mantido e progresso máximo1/5 |
| Área maior e movimento reduzido | `directed-large-20260909-01` | 1920×1080, foco/teclado e ausência imediata |
| Falha de save e Novo jogo | `directed-storage-20260909-02` | Último checkpoint recuperado; campanha nova passa a ser Continue |
| Imagem indisponível e Retry | `directed-image-20260909-01` | Erro nativo e recuperação do retrato |
| Editor e exportação Web | `directed-export-20260909-01`, `editor-review/` | Edição exata salva/reaberta; export real com1418 arquivos e passeio até Continue |

Cada pasta conserva `report.json`, fontes, hashes e capturas. `visual-review.json` registra o escopo efetivamente inspecionado. Exit0 e `executed-awaiting-review` não equivalem a aprovação automática. A equivalência com as 1419 entradas do projeto anterior à correção de leitura está em [resumption-equivalence.json](../evidence/init-rpg-maker-mz/task-13/resumption-equivalence.json). O pacote exportado inclui a frase de teste e revisão próprias e ainda contém a regra de leitura anterior à segunda correção. A diferença atual está em [reading-fix-impact.json](../evidence/init-rpg-maker-mz/task-13/reading-fix-impact.json); a exportação atualizada está bloqueada pela falha de conexão com o controle nativo do editor, reproduzida em duas tentativas.

## Defeitos corrigidos

[BUG-20260909-hide-overlapping-choices](../bugs/BUG-20260909-hide-overlapping-choices.md): restaurar HIDE mostrava a janela nativa sobre as escolhas por imagens. O bridge reaplica a regra existente de PictureChoices. IT-026 falhou antes da correção; IT-025/026/027/046/050 passaram depois. As telas de escolhas foram reinspecionadas em Chrome. Nenhum plugin de fornecedor foi alterado.

[BUG-20260909-final-passage-not-seen](../bugs/BUG-20260909-final-passage-not-seen.md): a transição parcial para formação descartava o último trecho concluído. UT-055 e UT-032 reproduziram a falha; após a correção, os 66 testes unitários e IT-050/053 passaram. O [replay dirigido atualizado](../evidence/init-rpg-maker-mz/task-13/directed-reading-fix-20260909-02/visual-review.json) confirmou os trechos preservados, a campanha completa e Continue do final. Tasks04/08 voltaram a concluídas. Não há migração retroativa de saves.

## Limites e próxima execução

- Zoom real está bloqueado pela conexão indisponível com a interface nativa. Os três finais, oito sepulturas/legendas, formação, sacrifício, montagem do mapa, escolhas longas e créditos foram inspecionados em1920×1080. A matriz visual completa ainda não recebeu fechamento; movimento reduzido e resolução maior não representam zoom.
- A variante mista passou com créditos automáticos, mouse e teclado em 1920×1080 (`directed-mixed-large-20260909-01`). Conselho, elegibilidade, entrada/receita DX e descoberta têm evidências revisadas.
- Audição efetiva de quatro ambientes, dois temas e dez efeitos continua pendente, conforme [inventário de áudio](../../../rpg-maker/asset-provenance/audio.md). Volumes zero, arquivos e playback não provam adequação sonora.
- Arte final, revisão editorial/cultural e atribuições exigem parecer da equipe. Os epílogos de Gorvak/Griznik mencionam companheiros mortos mesmo nas duas campanhas sem perdas; isso ficou destacado para revisão narrativa. O memorial de perda total também menciona “sobreviventes” após as oito mortes e a morte de Ivaí. Esses pontos exigem revisão narrativa; o texto não foi alterado. Os assets continuam provisórios.
- A mensagem nativa de save foi observada junto à borda inferior; sua apresentação deve entrar na revisão visual de UI. A recuperação funcional passou.

Conteúdo e grafo das13 tasks passaram nos validadores. O auditor histórico de spec falhou ao carregar a skill removida `cy-spec-preflight`; não foi tratado como aprovado. Não houve nova execução integral dos125 testes: mantêm-se o histórico124/125, a correção focada UT-057 e os cinco checks novos do HIDE, com suas evidências separadas. Após a segunda correção, passaram66 UT, IT-050/053 e quatro campanhas dirigidas atuais: Reunir, mista, ordem inversa/Destruir e perda total.

As jornadas adotam as personas planejadas: Caio nas campanhas, Joana em acessibilidade, Rui em editor/recuperação. São sessões dirigidas pelo agente, não pareceres humanos dessas pessoas. A evidência preserva decisões por rótulo visível, referências independentes ao GDD, fechamento real da aba, rede e limpeza. Não houve commit, publicação ou alteração no Trello.

Momento demonstrável para devlog: [desaparecimento de Gorvak](../deliveries/init-rpg-maker-mz/images/gorvak-disappearing-middle.png), seguido da [visita com lugar vazio](../deliveries/init-rpg-maker-mz/images/gorvak-absent-later-visit.png).

---

# Histórico — pausa anterior em 2026-09-09

Execution was paused at the user's request after the already running batch completed. No full release acceptance is claimed.

## Session debrief — CH-mz-campaign-terminal-matrix

Persona: Caio, estrategista recorrente. Sensor: native Chrome152 driven by real keyboard/mouse inputs with read-only QA observations. The four executed campaign runs total approximately11minutes of test runtime, inside the90-minute charter. Each began in an isolated profile; Continue closed the real game target and reopened it in the same profile/origin.

- Physical-first/Reunir: completed campaign, three eligible epilogues, credits and saved terminal Continue; observed run passed145855.505417ms.
- Supernatural-first/Destruir: completed inverse order and terminal Continue; observed run passed145401.520708ms.
- Solo Council: legal seed1 recipe reached final-position last-party death with living reserves, solo confession and no individual epilogues; observed run passed164683.339667ms at1920×1080 with reduced motion.
- Total loss: legal seed9 recipe sacrificed Gorvak first, closed/reopened during his farewell without another death, reached eighth loss at Vilarejo/6, then replayed saved bad ending/memorial; observed run passed206516.863375ms.

Evidence: ../evidence/init-rpg-maker-mz/task-13/journeys/ and ../evidence/init-rpg-maker-mz/task-13/paused-batch-results.json. Screenshots and transcripts are retained. This agent visually inspected the1280×720 tavern, Council and Reunir ending; no final creative approval was given.

## Review limitations and next session

The driver currently selects internal choice IDs and diagnostic viability; change it to visible-label targeting and the independent GDD strategy. Evidence must persist the exact command/tools/full input and vendor/asset hashes plus observed network requests. Therefore E2E-008/009/010/011/012 retain observed passes but their acceptance status is partial pending revalidation; scenario verdicts have not been promoted to pass.

The next session should first resolve those evidence/fidelity issues, inspect the unexecuted native-surfaces.test.mjs, and then cover deliberate retreat/revisit, disappearance timing, mixed memorial with living witnesses, keyboard/zoom/options/error recovery and complete package playtests. Other charters have not run. No runtime bug was confirmed by these four runs.

A full local Web-package copy of1419files was prepared with matching SHA-256 bytes, but it was not played and is not an editor export. Computer Use could not obtain editor UI access because Accessibility/Screen Recording permissions were pending. Audio audition and final art/editorial/cultural/attribution approval remain human verification.

The test runner's Chrome and server were torn down and checked absent. The visible RPGMZ process had unknown ownership/unsaved state and was left untouched. The execution checkpoint and detailed next steps are in .compozy/tasks/init-rpg-maker-mz/verification.md. No commit or remote action occurred.

Atualização final do lote: `directed-mixed-20260909-03` inclui sequência temporal do memorial inspecionada. E2E-023 permanece parcial somente para a repetição de skip por teclado após memorial misto; automático e mouse já passaram nessa receita.

Limpeza confirmada: cópias temporárias próprias removidas; porta18726 fechada; editor devolvido ao projeto original. Exportação e evidências preservadas. Ver `resumption-cleanup.json`.
