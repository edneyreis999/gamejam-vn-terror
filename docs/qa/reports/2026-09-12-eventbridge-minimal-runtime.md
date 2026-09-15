# QA Run Report — 2026-09-12 — eventbridge-minimal-runtime

- **Scope:** autoria nativa, Bridge mínimo, apresentação/controles, arquivos atuais, loading, memorial e créditos.
- **Cadence tier:** full no escopo aprovado da migração.
- **Build:** 5d0d9ab0296e7150cfbdd7ab263d304eeab06fdb + diff da spec; inventário task14/20260912/candidate.json.
- **Environment:** macOS/Chrome153.0.8010.36/Node22.23.2; http://127.0.0.1:18726/; perfis/cópias isolados.
- **Started:** planejamento2026-09-12; execução inicial2026-09-12/13 e expansão2026-09-14. **Status atual:** blocked-verify na expansão: defeitos visuais preexistentes e quatro pareceres humanos; zoom excluído pela ADR-G003. O fechamento técnico anterior abaixo conserva seu escopo. Operador: Codex, com personas usadas como perspectivas de teste; nenhum parecer foi atribuído a pessoas fictícias.

## Personas

| Persona | Base | Device / Network / Locale | Sessions |
| --- | --- | --- | --- |
| Lia, primeira expedicionária | New User | desktop/local/pt-BR | A |
| Caio, estrategista recorrente | Power User | desktop/local/pt-BR | D/H |
| Joana, jogadora ampliada | Accessibility-Reliant User | desktop/teclado/pt-BR | B/C |
| Rui, revisor de conteúdo | Recovering User | desktop/local/pt-BR | A-editor/E/F/G |

## Flows in Scope

- [J-mz-complete-campaign](../journeys/J-mz-complete-campaign.md): preparação, escolhas, desfecho e Continue.
- [J-mz-recovery-export](../journeys/J-mz-recovery-export.md): autoria em cópia e recuperação do arquivo correto.
- [J-mz-qa-accessibility](../journeys/J-mz-qa-accessibility.md): leitura e controle sem mutação pela inspeção.
- [J-mz-creative-review](../journeys/J-mz-creative-review.md): apresentação/áudio e quatro pareceres delimitados.

## Session Matrix & Results

Todas as linhas foram registradas Pending antes da primeira sessão dirigida. O [guia](../guides/eventbridge-minimal-runtime.md) contém entradas nativas, variantes, produtores, sensores e encerramento.

| # | Charter | Journey / Scenario | Persona | Tour | Status | Issue | Fix commit |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | CH-eventbridge-first-campaign | complete / FOR,ENC,LOC | Lia | Feature Tour | Pass funcional | Editor separado em A-editor | |
| A-editor | CH-mz-recovery-export | recovery / LOC,FOR | Rui | Network Tour | Pass técnico | CE4/5/352 e mapa→evento comprovados; editor-runtime-04 passou; usabilidade humana pendente | |
| B | CH-mz-keyboard-qa | accessibility / ACC,LOC | Joana | Feature Tour | Pass técnico | Continuidade temporal e picture92 autorada visível após Options/Continue | |
| C | CH-mz-keyboard-qa | accessibility / ACC,ART | Joana | Feature Tour | Pass técnico | 100% em duas áreas e110% nativo passaram; julgamento humano separado | |
| D | CH-mz-campaign-terminal-matrix | complete / ENC,CAM,ART | Caio | Feature Tour | Pass técnico | Três finais/mortes/memorial; julgamento humano do memorial separado | |
| E | CH-mz-recovery-export | recovery / LOC,ART | Rui | Network Tour | Pass técnico | Loading/preload técnico retido; seletor29 e acesso mapa→CE351 inspecionados | |
| F | CH-mz-recovery-export | recovery / LOC,CAM | Rui | Network Tour | Pass técnico | A/B, vítimas/finais e Continue; integração de falhas retida | |
| G | CH-mz-audio-review | creative / ART | Rui | Feature Tour | Blocked | Volumes e grafo gravados; audição/parecer humano pendentes | |
| H | CH-mz-campaign-terminal-matrix | complete / CAM,ART | Caio | Feature Tour | Pass técnico | Natural/acelerado e early/late keyboard/mouse; integração longa retida | |

## Checkpoint Bank and Branches

Mestres reais e filhos estão registrados nas tabelas de execução abaixo e nos índices locais de banco. O guia cobre start, formation-return, revelações, vítimas, mortes comprometidas, retornos, Conselho, loss-path e terminais. Cada entrada registra caminho/SHA/origem/gameId/fileId/índice/payload/fontes, produtor/transcrição, limite salvo/mapa/pilha, grupo/mortos/rotas/leituras/fades, escolhas alcançáveis e filhos. Arquivos técnicos IT079 demonstram transporte, sem substituir a campanha completa requerida.

| ID | Producer / archive / hashes | Saved boundary and reachable choices | Children / omitted prefix / outcome | Status |
| --- | --- | --- | --- | --- |
| banco corrente | Tabelas e índices locais abaixo | Limites realmente persistidos, incluindo prólogo, revelações, vítimas, retornos, Conselho e terminais | Cópias independentes com Continue nativo | Produzido; masters preservados |

## Session Debriefs

Os debriefs datados abaixo registram campanhas, variantes, correções do executor, inspeções e limites. A indisponibilidade inicial do editor foi resolvida; autoria e navegação nativas foram executadas em cópia descartável, com runtime final confirmado. A saída padrão foi identificada como alto-falantes do MacBook Pro. Há gravações do grafo WebAudio, sem audição ou parecer humano atribuídos.

## What Was Fixed

Correções de implementação e oráculos anteriores ao ciclo estão nos tasks01–14. Task14:129IDs atuais têm resultados aplicáveis; execução ampla exit1 preservada, seguida de reteste congelado9/9pass. IT030 aposentado em favor de IT075 conforme loading nativo aprovado; não houve restauração de polling. A escala inicial do Chrome é declarada para manter PNG e DPR coerentes, sem redimensionar evidência.

## Paper Cuts

Pendentes de observação das sessões; não inferir conforto pelos testes.

## Runtime Errors Observed

Nenhum erro espontâneo do jogo foi registrado nas sessões dirigidas concluídas. Falhas do executor/oráculos foram preservadas e corrigidas nos registros abaixo; falhas controladas de integração permanecem rotuladas nos logs da14.

## Human Verifications Needed

- [ ] Autoria: uma pessoa sem JavaScript localiza Conversar, troca o CE e edita os campos demonstrados no MZ.
- [ ] UI/UX: clareza, foco, AUTO/FAST, HIDE e sensação de confirmar/manter/soltar nas áreas previstas.
- [ ] Technical Art: enquadramento novo do memorial e composição preservada; usar capturas0/1/3/8 pertinentes.
- [ ] Áudio: ouvir resposta perceptível aos volumes/mudo e ausência de reinício/duplicação nas transições demonstradas.

## Decisions for a Human

Somente os quatro julgamentos de implementação acima, após seus materiais concretos. Não há nova decisão de design proposta. Os aceites de2026-09-10 permanecem restritos à baseline.

## Learnings

O primeiro save é do prólogo; uma captura na taverna deve registrar o estado realmente persistido. O banco de preparação usa recuo legal quando precisa de uma formação salva. O pai de perda total precisa vir de decisões de perda, e os dois finais escolhidos compartilham o mesmo Conselho salvo.

## Final Status

- **Exit gate:** implementação, integração, campanhas, variantes dirigidas, editor, zoom e inspeção visual encerrados; quatro decisões humanas discriminadas na verification.md.
- **Issues:** nenhum bug novo de jornada registrado; defeitos/refinamentos históricos deduplicados no guia.
- **Coverage:** campanha completa e alternativas, controles/arquivos, continuidade, áudio renderizado, ausência e créditos exercitados; autoria nativa e zoom110% dirigidos passaram; os quatro pareceres humanos permanecem pendentes.
- **Verdict:** technically verified; blocked-verify para autoria humana, conforto da UI, composição do memorial e audição. Task16/release permanecem incompletos exclusivamente por esses critérios e pela organização de mídia posterior ao aceite. Nenhum aceite é inferido.

### Banco produzido pela campanha fresca — D/H, Caio

Produtor: `task-16/fresh-physical-01`,2026-09-13T02:40:14Z→02:42:18Z (23:40–23:42 locais). Arquivo1, Igreja→Parque→Vilarejo, H1/H2/H3, sem mortes, Reunirseq108.322 inputs públicos,120 capturas PNG, um fechamento/reabertura real; nenhum erro de runtime, todos recursos da skill encerrados. Coleta executed-awaiting-review; observação visual e fechamento das demais variantes seguem separados. Os mestres abaixo são cópias byte-idênticas somente leitura; `bank-index.json` no produtor contém os SHA completos de arquivo/payload/índice e identidade/origem. Cada arquivo inclui fontes e trilha do produtor.

| ID do mestre | Arquivo/fase/seq/mapa salvos | SHA256 do arquivo (prefixo) |
| --- | --- | --- |
| council-shared | 1 / council / 98 / 23 | 4f6a8da95d100efa |
| formation-return | 1 / formation / 14 / 9 | 5f0379e2dcc20b11 |
| start | 1 / intro / 1 / 2 | eee1ece87141bafd |
| physical-first-reveal-final-1-75 | 1 / encounter_intro / 74 / 4 | c664cbb6697ac68c |
| physical-first-reveal-final-2-79 | 1 / encounter_intro / 78 / 18 | b355128e10ae525e |
| physical-first-reveal-final-3-83 | 1 / encounter_intro / 82 / 14 | f9dddbd079e91733 |
| physical-first-reveal-final-4-87 | 1 / encounter_intro / 86 / 17 | a44eaa30cdd786e7 |
| physical-first-reveal-final-5-91 | 1 / encounter_intro / 90 / 21 | 4b547d2a73c4122c |
| physical-first-reveal-final-6-95 | 1 / encounter_intro / 94 / 7 | 651f7d8367693413 |
| physical-first-reveal-physical-1-12 | 1 / encounter_intro / 11 / 4 | 84a4177e62651884 |
| physical-first-reveal-physical-1-19 | 1 / encounter_intro / 18 / 4 | 71d447fedcfe483c |
| physical-first-reveal-physical-2-23 | 1 / encounter_intro / 22 / 9 | 239faf941afcb420 |
| physical-first-reveal-physical-3-27 | 1 / encounter_intro / 26 / 12 | 2a0c1eb2b8ff3f8c |
| physical-first-reveal-physical-4-31 | 1 / encounter_intro / 30 / 10 | 640bc2a8e1c93427 |
| physical-first-reveal-physical-5-35 | 1 / encounter_intro / 34 / 8 | 18576406c32ed222 |
| physical-first-reveal-supernatural-1-46 | 1 / encounter_intro / 45 / 4 | f303018e24ceff44 |
| physical-first-reveal-supernatural-2-50 | 1 / encounter_intro / 49 / 20 | e372beaee1e9d80d |
| physical-first-reveal-supernatural-3-54 | 1 / encounter_intro / 53 / 16 | 23cf4e2309800c29 |
| physical-first-reveal-supernatural-4-58 | 1 / encounter_intro / 57 / 15 | 27b9c4638fb562e4 |
| physical-first-reveal-supernatural-5-62 | 1 / encounter_intro / 61 / 19 | c7a34ecdd80ce2df |
| terminal-reunite | 1 / ending / 108 / 23 | 701529e6dc7b269b |

O pai formation-return tem faseformation mas mapa9: foi salvo antes da transferência nativa de recuo para a taverna. council-shared tem fasecouncil/map23/seq98, antes das falas restantes e da decisão; ambos os finais devem retomar essa continuação. terminal-reunite tem ending/map23/seq108, antes da transferência de apresentação. Não confundir esses limites persistidos com o mapa vivo na hora da captura.

### Directed continuation — shared Council branches

`fresh-physical-01`, `council-destroy-01` and `council-reunite-01` completed without runner errors. The latter two began before the first page from independent byte-preserved copies of `checkpoints/council-shared/native.archive.json`, then selected file1 through Continue. Each reached its chosen ending, completed credits, closed/reopened the actual page and continued the same terminal file without changing its saved bytes. Modes: fresh natural roll; shared Destroy accelerated Shift; shared Reunite late mouse skip. Raw provenance/results: `task-16/completed-branches.json`; input/storage/geometry trails remain in each immutable report. These runs predate the helper's additional explicit post-load file-ID assertion; all selected/source file IDs were1, and actual saved contents/index/terminal bytes are recorded. No game source changed.

Visual inspection by Codex on 2026-09-12: fresh `story-53.png` has legible forest narration; `story-77.png` has legible Council text and expected existing large bust framing; `first-credits-middle.png` has centered, unclipped visible attribution and a readable skip control. This is scoped image evidence, not human composition/comfort acceptance or inspection of every capture. Bust scale remains the separate proposed reduction scope.

Editor sensor resume: disposable copy `/var/folders/8h/tbsxqpcx57q288z_4pnryqdm0000gn/T/dryland-directed-m5tz9n/game` remains unchanged. MZ was observed on the unrelated prior project; no edits were made there. Subsequent native UI access returned `cgWindowNotFound` for both bundle and full app path, despite inventory reporting the app running. Native author-edit criterion remains unverified; JSON script edits are not substituted for editor interaction.

### Resumable execution corrections and visual return

`supernatural-first-01` played supernatural→physical→final, chose Destroy, skipped early by mouse, returned to Title and completed actual close/reopen Continue with unchanged terminal bytes. Its runner verdict is FAIL solely because the new verify output referenced auxiliary archive files not registered as runner checkpoints. Correction: criteria cite registered storage/capture artifacts; archive paths/hashes remain explicit observed provenance. No raw report was rewritten and no gameplay result is promoted merely from exit status.

`bad-01` legally killed H4/H7/H5 and returned with five survivors. It stopped on an evidence-name collision when physical position1 was visited again; archive names now include campaign sequence. `bad-resume-02` resumes its exact saved reveal at seq39 through native Continue, omitting only that recorded prefix. Master copies and full-file hashes for33 additional entries are in `task-16/bank-additions-01.json`.

Codex inspected `bad-01/return-3.png`: three simultaneous translucent absence portraits are visible at the first return; living labels and destination/roster controls remain readable; Partir is disabled while group/destination are unset. This image supports composition at one point of the transition; exact duration/cleanup retain the separately labeled native integration evidence.

### Controls, campaign files and alternative victims — 2026-09-13

`surfaces-large-reduced-06` completed with zero runner errors at1920×1080, DPR1, reduced motion: all8 profiles/conversations, completed observational CE identities, unread AUTO/FAST rejection, separate reread-mode activation/reset, keyboard/mouse HIDE, Options continuity, roster/routes and distinct native files A/B. A carried the completed hero readings into a player-earned departure/reveal checkpoint; B was newly created by public input in file2 with a distinct seed and no inherited Gorvak reading; cancelled file selection preserved A; real close/reopen Continue restored A's exact saved campaign before rereading. `surfaces-05` exercised1280×720 normal motion and the same flow but its final oracle incorrectly compared the saved intro with the subsequently read choice. The assertion was moved before reading; no runtime change.

Mouse debugging was confined to the driver. Bound-picture tags exist in `$gameMessage.choices()[item.ext]`, not the provider's stripped display name. Following dispatch, `choose` now waits for native choice deactivation or changed choices before the next action. The failing02–04/probe/isolation records remain; no delay, repeated click or game mutation was added.

`victim-a-01` and `victim-b-01` loaded independent copies of `bad-01-victim-physical-1` through Continue/file1. The first chose candidate1 and lost H4; the second chose candidate2 and lost H7. Both ended at the next revealed encounter, seq18, with their distinct death committed. Input eligibility was asserted before confirmation. Master bytes remain immutable; branch-result archives retain complete native storage/index.

`continuity-farewell-01` passed read-only composition/fact checks for H4's farewell, keyboard/mouse HIDE, Options and actual close/reopen Continue with unchanged save. Images remain separately inspectable; no human judgment is inferred. Raw progress index: `task-16/reviewed-progress.json`.

Codex inspected `bad-resume-02/passage-18.png`: all8 memorial portraits, names, causes and route/encounter captions fit on one screen above the dialogue. The pre-existing total-loss “sobreviventes” wording and uneven source-text line breaks remain distinctly reported; no new editorial acceptance is claimed.


### Integridade e sensores após a revisão independente — 2026-09-13

O validador de archives passou a decodificar os registros zlib nativos e comparar o arquivo selecionado, campanha, índice e estado de mapa/leitura/ausências/interpreters com os metadados. A identidade recalculada a partir de metadados, isoladamente, não basta. Os71 mestres existentes passaram nessa comparação, sem alteração de bytes. A regressão de adulteração coordenada pertence ao UT069 já existente; IT079 mantém a restauração real de arquivo7 em dois filhos independentes. O fechamento do banco registra também os hashes integrais dos archives auxiliares.

A variante `DRYLAND_QA_ZOOM=110` está preparada no executor de superfícies. A primeira configuração exigia1920×1080 CSS; isso foi corrigido para o mínimo aprovado de1280×720 CSS. Ela requer `report.nativeZoom` e zoom pela UI real; as capturas numeradas `focus-110` nunca significaram zoom. Após reset da sessão CUA e novo inventário com MZ em execução, `getApp(jp.co.kadokawa.rpgmz)` voltou a retornar `-10005: cgWindowNotFound`, sem navegador de QA aberto. Não houve edição do projeto pessoal nem da cópia descartável. A trilha está em `task-16/editor/sensor-gap.json`.


### Retestes de integridade, ramificação e créditos — 2026-09-13

UT069/IT029/IT079 passaram3/3 no comando focado final, com `changedInputs: []` em cada execução. O novo sensor BGM é integração isolada do comando241 com o asset já configurado no System; confirmou mesmo buffer/início, volume zero e restauração. SE é avaliado no próximo cue, conforme o comportamento nativo. Isso não introduz BGM na campanha nem representa audição humana.

`approach-failure-final-01` e `approach-success-final-01` retomaram o mesmo mestre A3 com H1/H2/H3. A3-3 falhou e A3-1 teve sucesso; ambos encerraram em `approach_result`, sem mortos e com `victimId:null`. `victim-final-01` retomou o mestre próprio anterior ao sacrifício, escolheu H7 e parou em `death_result` com exatamente uma morte. A fronteira do ramo não escolhe mais uma vítima implicitamente.

`credits-natural-final-01` e `credits-accelerated-final-01` concluíram duas vezes cada, incluindo fechamento/reabertura real e Continue com bytes terminais preservados. O sensor mediu1px/frame normal e3px/frame com Shift; a última linha foi “Plugins: VisuStella”, antes da terminação em220px ou221px para altura220px. A referência local à janela permite observar a conclusão mesmo quando a cena de título reinicia `Graphics.frameCount`; o horário monotônico também é registrado. O Title permaneceu estável em três frames e tinha uma opção Continuar. A contagem global de retornos pertence ao IT058, já retido.

Codex inspecionou `credits-natural-final-01/first-credits-middle.png`: todas as linhas de atribuição estão centralizadas, legíveis e dentro da área, com Pular créditos visível no canto inferior direito. É inspeção visual do agente, sem substituir os pareceres humanos delimitados.


Correção do sensor SE: `audio-se-final-01` preserva uma falha de oráculo. O `key()` completo do runner contém70ms pressionado+35ms após soltar; Cursor3 já havia terminado na leitura feita112ms depois, embora seu início tivesse mudado de4.208 para4.325s e o volume fosse0.27. O sensor passou a usar `keyDown`, observar atomicamente por frames o novo início/reprodução e liberar em `finally`. Não houve mudança de áudio/engine nem afrouxamento da expectativa. O novo registro usa outro diretório; o primeiro permanece intacto.


### Autoria nativa retomada e medição do zoom — 2026-09-13

O editor MZ tornou-se acessível novamente. Na cópia descartável registrada em `task-16/editor/before.json`, Codex usou o Banco de Dados nativo para duplicar CE83 como CE352, alterar sua fala e escala horizontal de Ivaí para80, inserir Exibir Imagem92 (`Dryland_Button`,31/37,30%/40%,opacidade181), trocar a chamada direta em CE5 para352 e editar ConfigureHero H1 para “Gorvak vigia”. `editor/after.json` registra os bytes antes/depois e comandos efetivos. Nenhum JSON foi escrito por script nessa cópia. O salvamento do MZ apenas reformatou os demais bancos/plugins e incrementou System.versionId; as alterações de conteúdo limitam-se a CE4/5/352. O projeto principal não recebeu essas alterações de demonstração.

CE351 foi aberto como `VisuMZ_0_CoreEngine > System: Load Images > img/pictures > Arquivo Lista`. A UI mostrou29 entradas, de Dryland_Taverna a Dryland_MapComplete, e a linha30 vazia. O comando permaneceu inalterado. A busca nativa “Nome Evento: Gorvak” encontrou `003:Taverna / 003:Gorvak / (2,1)`. A navegação do resultado para o editor de mapa continua sem prova: a área principal exibe um índice do diretório e duplo clique/Return/Space não abriram o evento. Isso é um limite distinto da edição de Common Events já executada.

`surfaces-native-zoom-02` comprovou110% reais, mas a captura parou por um falso negativo: innerHeight inteiro835 multiplicado pelo DPR fracionário arredondava para919, enquanto a área física tinha918 pixels. A correção isolada no runner usa `Page.getLayoutMetrics` em pixels físicos, compara exatamente antes/depois e rejeita pinch/scrollbars. Em `surfaces-native-zoom-03`, o sensor confirmou1571×835 CSS, DPR1.100000023841858 e raster1728×918, sem emulação.28 capturas foram produzidas; a execução parou posteriormente numa corrida do driver de leitura sob FAST, preservada no relatório. Nenhuma mudança de engine ou runtime do jogo foi necessária.

Os17 retestes finais de ramificação/créditos/áudio/continuidade estão indexados com SHA de relatório em `task-16/final-retest-results.json`: todos executaram sem erros, com os limites humanos explicitamente mantidos. SE final02 confirmou três novos cues ativos com volumes0.36/0/0.27. BGS final confirmou mesmo buffer durante FAST ligado/desligado e reset na próxima escolha. As sequências temporais de despedida e Conselho registram frames distintos, movimento/escala/tom/opacidade e erasure; as capturas efetivamente inspecionadas constam de `visual-review.json`.


### Navegação do mapa comprovada — 2026-09-13

A inspeção visual da janela principal mostrou o mapa Taverna e sua lista de eventos, apesar de a árvore AX continuar contendo um antigo “Index of”. Selecionar Gorvak pela lista e pressionar Return abriu `ID:003 — Editor do Evento`: variável22=H1, CaptureContext e chamada nativa CE5. O mesmo procedimento em `ID:014` abriu a chamada `0351 Taverna — Carregar imagens`. Esse registro resolve o limite de navegação relatado anteriormente; não havia falha comprovada do editor de mapas.

Na unidade352, o comando de escala80 foi movido pelo recortar/colar do MZ para depois do foco CE81, que antes o sobrescrevia. `editor/after-v2.json` registra a ordem e o SHA final da cópia. `editor-runtime-01` chegou à fala nova com352 inédita,83 ausente e escala80; parou no oráculo do teste que supunha origem0 para o busto. Basic_EnterBust usa origem1 para Bust; o caso foi corrigido conforme a implementação do provider, sem alteração do jogo. Picture92 continua com a origem0 autorada pelo comando Exibir Imagem.

### Diagnóstico de duração natural de AUTO — 2026-09-13

`auto-timing-probe-01` observou a releitura real de CE82 sem entradas durante AUTO. O contador nativo da primeira fala caiu297→−1; a descrição seguinte começou em1560 e caiu60 a cada60 frames. AUTO desligou ao entrar na fala de CE83, após33997ms e1870 frames. O loop e o contador progrediram normalmente. O limite global de30s de `ready()` era menor que o tempo legítimo do provider; o novo watchdog deve detectar ausência de progresso, sem acelerar o jogo ou pressionar Enter durante AUTO. Essa execução é um diagnóstico dirigido com o `?test` padrão da ferramenta; o reteste final de controles permanece sem esse parâmetro. Sua fonte temporária e leituras completas estão na árvore de evidência.


### Fechamento dos controles em zoom nativo — 2026-09-13

`surfaces-native-zoom-05` passou sem erros em96034ms:302 entradas públicas e125 capturas PNG. Geometria medida após110% pela UI do Chrome:1745×875 CSS, DPR1.100000023841858, raster1920×963, sem emulação, pinch ou scrollbars. A execução cobriu os oito perfis/conversas, controles inéditos bloqueados, FAST e AUTO separados, HIDE/restauração/held input, Options, elenco e destinos. AUTO seguiu o contador do provider até o reset; o driver deixou de injetar confirmações durante progressão automática. O watchdog mantém30s para ausência de progresso; mudanças de texto e quedas estritas do contador são observadas sem alterar o jogo.

Codex inspecionou a taverna, HIDE e destinos desse run: rótulos/estado de partida, cartas/descrições/disponibilidade e Fechar ficam dentro da área; HIDE retém arte e remove os controles. Os hashes estão em `visual-review.json`. A análise confirma essas imagens e seus observáveis, sem inferir o parecer humano de conforto.

`editor-runtime-02` passou109 entradas/43 capturas PNG, sem `?test`: rótulo “Gorvak vigia”, conversa352 inédita→lida,83 não executada, escala80, FAST rejeitado/permitido e Options preservados. O save de partida real restaurou leituras e picture92 com posição31/37, escala30/40 e opacidade181 após fechar/reabrir/Continue. A revisão visual adicional verifica o sprite carregado no frame capturado após Continue; presença no modelo serializado é mantida como observável separado.


### Fechamento técnico e continuidade autoral — 2026-09-13

`editor-runtime-04` passou sem erros, com109 entradas públicas e43 capturas PNG. O projeto editado pelo MZ executou a conversa352 inicialmente inédita, sem executar83; após conclusão, a unidade352 pôde usar FAST. Rótulo “Gorvak vigia” e escala80 foram observados. A imagem92 permaneceu em Options, save e reabertura real pelo arquivo1, com fatos comprometidos e leituras preservados.

Codex reinspecionou `editor-departure.png` e `editor-reopened-picture92.png`: a pequena barra translúcida está visível em31/37 sobre a igreja nas duas imagens. O sprite possui bitmap208×54, limites62.4×21.6 e alpha/worldAlpha181/255, desenhado depois do fundo1. A reinspeção do run03 também encontrou a barra. A dúvida anterior foi um erro de inspeção visual, sem defeito ou alteração do jogo. As capturas e hashes foram acrescentados a `visual-review.json`.

A implementação principal permanece igual ao candidato da task14; alterações autorais CE4/5/352 pertencem somente à cópia descartável. Archives dessa cópia usam seu próprio manifesto/produtor e não são mestres compatíveis do banco principal. O inventário final, auditoria de archives, verificações estáticas e limpeza estão em `task-16/final-candidate-inventory.json`, `final-archive-audit.json`, `final-static.json` e `closed-fixture-cleanup-04.json`.

Os cinco estados finais são: implemented=true, static_verified=true, runtime_verified=true, human_accepted=false, release_ready=false. A [verification.md](../../../planos/tasks/eventbridge-minimal-runtime/verification.md#concrete-human-review-packet) fornece os materiais concretos para os quatro pareceres e é a autoridade de prontidão. Nenhuma avaliação foi atribuída a um revisor humano; não houve commit, staging, publicação ou alteração de saves pessoais. A seleção de mídia para entrega/devlog será realizada após aceite compatível.


Correção da limpeza: a comparação textual de `/var` com `/private/var` não reconheceu a cópia do editor excluída da remoção. Somente essa cópia descartável foi removida indevidamente; jogo principal, saves pessoais e evidências brutas permaneceram intactos. Ela foi recuperada dos arquivos principais inalterados e registros completos da edição nativa. Os1445 hashes coincidem exatamente com `editor-runtime-04/report.json`, sem divergências, conforme `editor/restoration.json`. A restauração não é uma nova autoria/playtest; preserva os bytes já exercitados. System também guarda `editMapId:3` após a navegação nativa de Map003, além de versionId16066541; ambos são metadados do editor, sem nova regra de campanha.


Contagem final de evidências: `checkpoints` inclui PNG e snapshots de storage. As contagens de imagens acima foram corrigidas pelo sufixo `.png`: editor04 tem43 PNG+1 storage (44 registros), zoom05 tem125 PNG+2 storage (127 registros), e campanha fresca tem120 PNG+21 storage (141 registros). Os reports brutos não foram alterados.


### Experimentos de mapa de Gorvak e remoção dos atalhos — 2026-09-14

Na branch `experiment/gorvak-interaction-map`, filha de `refactor/native-bust-restoration` em `de4f9768c8fda6cdd075e662fc66e02244ec3d06`, Map037 contém a interação real de Gorvak. A escolha na taverna transfere para esse mapa; conversar e selecionar retornam ao menu do herói, e Voltar/Escape retorna à taverna. Os nove blocos de diálogo foram preservados. A remoção separada colocou exatamente 42 atalhos em slots nulos de 29 mapas, preservou os 33 eventos antigos restantes e manteve válidas as 685 chamadas nativas a Common Events. CE004/configuração e CE351/preload continuam necessários. CE005/082–085 foram aposentados pela migração de H1, não pela remoção dos atalhos.

A evidência local ignorada está em `docs/qa/evidence/eventbridge-minimal-runtime/experiments-20260914/`. `surfaces-normal-04` executou 532 entradas públicas e produziu 182 PNG; `surfaces-reduced-01`, em 1920×1080 com movimento reduzido, executou 320 entradas e produziu 129 PNG. Ambos terminaram sem erros. O fluxo normal cobre entrada por mouse/teclado, cancelamento, conversa dos oito heróis, HIDE/Options, FAST inédito/releitura, seleção, remoção, grupo cheio e arquivos A/B com partida e Continue reais. A variante reduzida cobre navegação, leitura e apresentação; não herda a cobertura A/B da variante normal. Codex inspecionou as capturas de menu, conversa H1/Ivaí, rejeição de grupo cheio e composição reduzida; `visual-review.json` delimita imagens e hashes. Os reports brutos conservam `executed-awaiting-review`; esta revisão técnica não constitui parecer humano.

No editor MZ, Codex abriu uma cópia descartável, navegou por Taverna → Conversa — Gorvak → evento001, editou a primeira fala para “Gorvak — fala editada no mapa.” e salvou pela UI. `editor-runtime-01` executou 35 entradas públicas, gerou 17 PNG e mostrou a fala editada sob o interpretador nativo de Map037, com unidade82 inicialmente inédita e campanha preservada. O salvamento do MZ alterou semanticamente só essa fala e metadados do editor (MapInfos.expanded, System.versionId/editMapId); a cópia não foi aplicada ao jogo principal. O projeto principal foi reaberto no editor com Map037 selecionado. Isso prova editabilidade técnica; a facilidade de autoria continua a depender do tópico humano1.

Falhas e correções preservadas: a primeira captura revelou que um comando de foco de 20 frames sobrescrevia a duração inicial antes do primeiro tick da imagem. O evento agora estabelece o foco inicial imediatamente e mantém a animação nas mudanças posteriores de falante. Não houve alteração de engine/provider. `surfaces-normal-01` também expôs um sensor que esperava observar FAST depois de a unidade curta já ter terminado; a observação passou a registrar a progressão por frames. `surfaces-normal-02` expôs a espera do driver por rótulos brutos: selecionar/remover usa a mesma variável nativa, mas muda o texto renderizado. O driver agora compara os rótulos convertidos. As execuções finais usam diretórios novos e mantêm as falhas anteriores.

A evidência reduzida e a edição no MZ precedem a remoção de dois condicionais cujos dois ramos já executavam os mesmos comandos de duração zero; a equivalência foi conferida e seu escopo retido está em `static-audit.json`. O fluxo normal04 foi executado novamente após essa simplificação. Restaurar a indentação original de 28 mapas mudou apenas bytes de formatação: os objetos JSON da cópia jogada e do candidato final são iguais. `directed-results.json` indexa os reports e a limpeza dos navegadores/servidores próprios. Nenhuma captura ou integração aceita automaticamente a ADR, os outros sete heróis ou os quatro pareceres humanos pendentes.

Fechamento canônico do experimento: 22 IDs afetados passaram por execução final ou evidência retida com a mesma implementação. Run02 passou13/16; run03 passou5/7; run04 passou5/5. A primeira tentativa não iniciou o jogo por porta ocupada por um servidor próprio órfão. Os reports/falhas não foram sobrescritos. IT080 corrigiu o preparo da transferência com mensagem anterior aberta e confirmou que People1 preserva o instante de início nas duas transferências; IT074 passou a esperar fala pausada ou menu nativo aberto; IT076 busca o comando real de entrada H1 em Map037; o helper de encontros agora executa o retorno explícito de Gorvak. IT005/049/051 passaram com esse helper. IT048 cobriu os três desfechos e Continue, IT073 os oito epílogos e IT079 os arquivos/ramificações independentes. `canonical-results.json` registra hashes e aplicabilidade; nenhum teste de jogo foi substituído por uma espera arbitrária.

Tasks17/18 concluídas tecnicamente, EXV-001–003 PASS, EXV-004 pendente. A ADR005 continua experimental. A auditoria mantém código/dados/testes e documentação com seus consumidores; logs, capturas e saves de QA são locais e ignorados. Não houve alteração de engine/provider/assets, novas dependências, commit, staging ou publicação. Os pareceres humanos e a seleção posterior de mídia continuam sob verification.md/task16.


## Expansão de autoria por mapa — 2026-09-14

Plano: [guia atual](../guides/eventbridge-minimal-runtime.md#expansão-de-autoria-por-mapa--plano-de-execução-2026-09-14), tasks15/16 e MAS-01–07. Task29 encerrou o join técnico; o registro detalhado de falhas/retestes/equivalência pertence à verificação. Nenhum resultado abaixo é herdado da experiência anterior de Gorvak.

| Lote | Resultado atual | Sensores |
| --- | --- | --- |
| MA-A/B | Parcial: oito heróis/arquivos/imagens PASS; zoom excluído pela ADR-G003 | Oito heróis, normal/reduzido, zoom110%, arquivos A/B e imagens |
| MA-C/D/E | Fluxo PASS; Conselho com defeito visual | Campanhas genuínas, duas ordens e três desfechos |
| MA-F | Continuidade PASS; apresentação tem ressalvas | HIDE/Options/Continue nas fronteiras, com pais jogados |
| MA-G | Sensores nativos PASS; audição humana pendente | Observação/gravação de áudio renderizado; audição humana separada |
| MA-H | Técnico PASS | Créditos naturais/acelerados e teclado/mouse cedo/tarde |
| MA-I | Edição e reprodução PASS; usabilidade humana pendente | Editor MZ Map002/Map038 e reprodução das falas |

Recursos conferidos: Node22.23.2, Chrome153.0.8010.36, dependência Playwright instalada, MZ acessível. A saída padrão enumerada na preparação atual é Powerbeats Pro; MacBook Pro também está disponível. Isso não declara audição humana nem autorização para capturar microfone. Evidência bruta local ignorada: `docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/`; masters anteriores às listas migradas não serão importados.


### Fechamento da execução da expansão — 2026-09-14

As tasks01–15 e17–29 estão concluídas. A task16 fica **blocked-verify**, com execução registrada e pendências delimitadas; o plano não está integralmente aprovado. `implemented=true`, `static_verified=true`, `runtime_verified=false`, `human_accepted=false`, `release_ready=false`. Os resultados funcionais não anulam as falhas/ausências de sensor abaixo.

O join canônico contém **134 PASS por composição**: execução completa inicial129PASS/5FAIL, correções dos cinco consumidores desatualizados, retestes focados e evidência equivalente dos casos não afetados. O comando completo original continua exit1. Após calibrar os epílogos, IT047/062/073 passaram novamente, com captura dos oito heróis nos dois modos. `task-29/composite-after-framing.json` identifica a origem de cada caso. Não houve um novo comando completo134/134.

MA-A/B: `surfaces-normal-01` e `surfaces-reduced-01` exercitaram os oito menus/perfis/conversas em1280×720 normal e1920×1080 reduzido. A revisão independente inspecionou48PNG de rostos/texto/painéis; arquivosA/B foram exercitados no lote normal. O H1 da seleção de48 mostra o perfil, não o corpo da conversa; o fluxo nativo e os demais registros mantêm seus próprios escopos. A captura `conversation-options.png` também foi inspecionada, sem recorte do painel.

MA-C/D/E: `campaign-physical-01`, `campaign-supernatural-01` e `campaign-losses-01` partem de jogos novos e alcançam Reunir, Destruir e perda total, respectivamente. Cobrem duas ordens de rota, recuo genuíno, oito mortes e Continue do arquivo terminal sem reescrita indevida. `approach-1/2/3-01`, `victim-1/2/3-01` e quatro `return-<normal|reduce>-<wait|leave>-01` usam arquivos ganhos nessas campanhas. Cada origem e sequência está no archive e em `task16-tail-plan.json` local; nenhum pai anterior à correção dos epílogos foi importado. A ausência de Vaelith após o fade de retorno foi observada nos PNG antes/depois.

MA-F: `continuity-council-01`, `continuity-farewell-01` e `continuity-epilogue-01` cobrem HIDE por teclado/mouse, Options e Continue nas fronteiras. O pai `council-parent-01/council-entry` foi produzido por inputs reais a partir do encontro final; a pequena extensão de `native-journeys.test.mjs` apenas arquiva o checkpoint existente ao observar a fase council. Não altera a campanha. Nos PNG de Gorvak no epílogo, HIDE remove os controles e a restauração recupera a fala mantendo personagem/fundo.

MA-G: `audio-bgs-03`, `audio-me-01`, `audio-se-01` e `audio-bgm-01` verificaram a resposta nativa. People1 mantém o mesmo início nas transferências e no FAST; volume0 silencia o buffer e a restauração recupera0,24 sem reinício. Organ responde0,26→0→0,26. Cursor3 toca um novo buffer com ganho0,36/0/0,27 conforme40/0/30%. A campanha não possui BGM ativo; IT029 conserva a equivalência isolada, sem inventar música. WebM registra o grafo WebAudio renderizado, sem microfone. Isso não é audição humana. BGS01 falhou ao amostrar FAST depois da leitura curta; BGS02 comprovou ativação, mas o segundo clique rápido não serviu como sensor de cancelamento. BGS03 observa ativação por frame e reset no menu por inputs públicos; não enfraquece a assertiva de áudio contínuo. Falhas anteriores foram preservadas.

MA-H: créditos naturais, acelerados, teclado/mouse e acionamento tardio passaram nas campanhas e em `credits-late-keyboard-01`/`credits-late-mouse-01`; a imagem intermediária mostra o texto e o botão dentro da tela. MA-I: a edição de duas falas code401 em Map002/Map038 pela UI do MZ foi salva e reproduzida na mesma cópia descartável. `editor-ui/edit-diff.json` separa textos e metadados nativos. O projeto principal foi reaberto sem os textos de demonstração.

### Pendências atuais e retomada

1. **Zoom nativo110%:** `surfaces-zoom-01` falhou no preflight. CUA selecionou o Chrome do perfil pessoal, não a instância própria do runner; nenhum zoom foi alterado no perfil pessoal. O timeout e a limpeza estão preservados. Exigência posteriormente retirada pela ADR-G003; não retomar esse lote. O registro da falha permanece histórico.
2. **Enquadramento do Conselho:** `campaign-physical-01/story-76.png` confirma rostos cortados por escalas/posições genéricas anteriores à migração. O contrato de arte preserva Conselho/Andirá e estilos compartilhados; a correção requer ampliação explícita desse escopo ou follow-up próprio. O defeito permanece no registro de retratos, sem aprovação visual. A pergunta de escopo foi apresentada ao usuário; ausência de resposta não aprova a ampliação.
3. **Pareceres humanos:** autoria sem JavaScript; legibilidade/navegação/controle; composição do memorial; resposta audível/conforto. A organização de Gorvak já aceita mantém seu escopo. A edição técnica e as capturas da expansão não fornecem esses pareceres.

Os reports brutos têm status `executed-awaiting-review`; o presente fechamento distingue seus sensores e limites. `directed-results.json` agrega30 tentativas, incluindo as falhas preservadas e a campanha anterior à calibração. Os29 reports que chegaram à execução registram encerramento dos seis recursos próprios; o preflight de zoom encerrou os cinco recursos que chegou a abrir, sem iniciar áudio. Não houve staging, commit, publicação ou alteração de arquivos de campanha do usuário. As11 bases JSON com mudanças apenas de formatação continuam preservadas e excluídas da proposta de entrega.


Revisão independente final dos epílogos:16/16PNG inspecionados, todos com rosto e torso visíveis. H2 também foi confirmado nas duas campanhas. A alteração se limita a Scale/Move nas posições18/19 de cada mapa; conteúdo, índices e assets preservados. O parecer técnico está em `.artifacts/task16-epilogue-visual-review.json`; não substitui a aprovação humana de composição.

A inspeção final confirmou também o problema nos helpers compartilhados de despedida: `continuity-farewell-01/bust-1-farewell-H4.png` mostra apenas os pés ampliados de Seraphina. A continuidade funcional passa, mas esse enquadramento está reprovado. A correção das despedidas integra o follow-up de apresentação compartilhada, registrado no mesmo bug dos retratos; os corpos de despedida não foram migrados neste incremento.


### Decisão posterior — excluir zoom nativo

A [ADR-G003](../../adrs/adr-g003-excluir-testes-de-zoom-nativo.md), aceita pelo usuário, retira o sensor de zoom do contrato e dos bloqueadores. Sua falha de preflight não foi convertida em PASS. A task16 permanece blocked-verify por enquadramento e julgamentos humanos. Nenhum jogo ou teste foi executado nesta alteração documental.


### Correção de enquadramento — 2026-09-15

O usuário autorizou e foi concluída a calibração dos sete helpers do Conselho, quatro comandos de Ivaí em Map023 e oito despedidas. Cinco IDs canônicos distintos (IT012/047/054/061/062) passaram, com falhas anteriores preservadas de IT012/061. A revisão visual inspecionou18 imagens do Conselho e16 despedidas em1280×720/normal e1920×1080/reduzido. O [bug de retratos](../bugs/BUG-20260911-tavern-portraits-offscreen.md#correção-compartilhada--2026-09-15) está resolvido tecnicamente no checkout.

São retestes de integração e inspeção visual, sem nova campanha dirigida ou audição humana. Os percursos/áudio anteriores conservam seu alcance por equivalência, documentada no [fechamento atual](../../../planos/tasks/eventbridge-minimal-runtime/verification.md#correção-dos-bustos-compartilhados--2026-09-15). MAV-013 passa tecnicamente; MAV-014 e task16 continuam bloqueados pelos quatro pareceres humanos. `runtime_verified=true`, `human_accepted=false`, `release_ready=false`. A falha de zoom continua excluída, sem reteste. Nenhum commit ou publicação foi realizado nesta correção.
