# QA Run Report — 2026-09-12 — eventbridge-minimal-runtime

- **Scope:** autoria nativa, Bridge mínimo, apresentação/controles, arquivos atuais, loading, memorial e créditos.
- **Cadence tier:** full no escopo aprovado da migração.
- **Build:** 5d0d9ab0296e7150cfbdd7ab263d304eeab06fdb + diff da spec; inventário task14/20260912/candidate.json.
- **Environment:** macOS/Chrome153.0.8010.36/Node22.23.2; http://127.0.0.1:18726/; perfis/cópias isolados.
- **Started:** planejamento2026-09-12; execução2026-09-12/13. **Status:** blocked-verify somente para quatro pareceres humanos; execução técnica encerrada. Operador: Codex, com personas usadas como perspectivas de teste; nenhum parecer foi atribuído a pessoas fictícias.

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
