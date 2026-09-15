# QA do EventBridge mínimo

**Plano atual:** [expansão de autoria por mapa](#expansão-de-autoria-por-mapa--plano-de-execução-2026-09-14). Os lotes anteriores abaixo preservam seu escopo histórico; a nova seção prevalece para entradas, mapas, recursos e autoria da expansão.

**Expansão em execução — 2026-09-14:** a [verificação da autoria por mapas](../../../planos/tasks/eventbridge-minimal-runtime/verification.md#map-authorship-expansion--2026-09-14) contém MAV-001–014 e MAS-01–07. Oito interações, prólogo, encontros, Conselho, finais e epílogos já usam seus mapas; o [grafo](../../../planos/tasks/eventbridge-minimal-runtime/tasks.md) registra as fatias concluídas e a cena em validação. Resultados históricos abaixo não certificam automaticamente a expansão. A task16 reúne as novas observações dirigidas e os julgamentos humanos.

## Incremento adotado — ADR-G001 / ADR-G002, 2026-09-14

A organização foi aprovada pelo usuário e promovida às [ADR-G001](../../adrs/adr-g001-mapas-de-interacao-dos-herois.md) e [ADR-G002](../../adrs/adr-g002-remocao-de-atalhos-editoriais.md). O registro experimental ADR-005 é histórico; a expansão foi planejada pela ADR-006.

Tasks17/18 acrescentaram Map037 e removeram os42 atalhos. Tasks19/20 estenderam a autoria aos oito heróis: árvore Taverna → Conversa — nome do herói → evento001. Maps037–044 correspondem, em ordem, a Gorvak, Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith e Draska. Editar ali menu, textos, bustos e retorno. CE005–012/082–113 estão aposentados; as identidades de leitura82–113 permanecem reservadas. O driver reconhece os oito mapas. Configuração permanece em CE004, preload em CE351. Integração canônica, observação dirigida e aceite humano são sensores distintos.

Lote experimental, EXV-003: perfil limpo, `native-surfaces.test.mjs` com `DRYLAND_QA_FILES=1`, 1280×720/movimento normal; repetir a superfície em 1920×1080/movimento reduzido. Mouse e teclado devem entrar no Map037/event001, sem CE3/5 na cadeia ativa; somente pictures 1/60 no menu. Escape retorna sem alterar campanha. Conversar preserva campanha e volta ao menu de Map037; FAST permanece proibido na primeira leitura e permitido após conclusão de 82/83; Options e HIDE preservam texto. Selecionar/retirar alteram apenas o resultado permitido pelo domínio; grupo cheio rejeita sem alterar fatos. Voltar recria a taverna sem bustos e preserva People1, grupo e destino. Partida e Continue usam checkpoints nativos realmente obtidos; arquivo novo não herda leituras. Integração canônica cobre automático/morto e famílias de encontros/fechamento, sem alegar jornada dirigida dessas variantes.

EXV-004: em cópia descartável no MZ, abrir o novo mapa, alterar a primeira fala do perfil para “Gorvak — fala editada no mapa.” e salvar; executar `rpg-maker/qa/gorvak-editor.test.mjs` usando essa cópia como fixture para confirmar a fala jogada pela entrada real. Capturar árvore, comando e reprodução para revisão/devlog. Isso comprova editabilidade técnica. O usuário aprovou a organização; os julgamentos restantes de autoria, enquadramento e navegação estão delimitados na [verificação](../../../planos/tasks/eventbridge-minimal-runtime/verification.md#architectural-adoption--2026-09-14). Não executar o antigo caso CE5→352 contra esta arquitetura.

Evidência nova em `docs/qa/evidence/eventbridge-minimal-runtime/experiments-20260914/`; cada execução conserva descriptor/hashes, resultado esperado nesta seção, inputs, capturas e teardown. Chrome/Node e saídas disponíveis são os descritos abaixo. A coleta de áudio observa a trilha renderizada, sem substituir audição humana. Alterações em dados/plugin/caso reabrem apenas a evidência afetada; preservar falhas e rodadas anteriores.

Plano corrente da [spec aprovada](../../../planos/tasks/eventbridge-minimal-runtime/spec.md). O [relatório deste ciclo](../reports/2026-09-12-eventbridge-minimal-runtime.md) registra execução, banco de checkpoints e decisões humanas. Guias/relatórios anteriores são históricos; seus PASS não aprovam esta migração.

## Entrada, recursos e sensores

Tasks01–14 concluídas; os quatro ramos08/11/12/13 foram integrados pela14. As fontes completas, versões e129 resultados canônicos aplicáveis estão em `docs/qa/evidence/eventbridge-minimal-runtime/task-14/20260912/candidate.json`. A execução ampla teve falhas preservadas, corrigidas/consolidadas no reteste congelado9/9. V004/V013 continuam sob responsabilidade primária da14; os demais V-IDs pertencem à16.

Leia [execução local](../../_memory/local-game-run.md) antes de iniciar/reutilizar o servidor. Na raiz: `npm start`; origem `http://127.0.0.1:18726/`. Uma sessão/perfil isolado e um servidor por vez. O executor da skill inicia o mesmo servidor local para a cópia completa e o encerra. Porta ocupada exige identificar processo/conteúdo; nunca encerrar servidor desconhecido.

Chrome153.0.8010.36/Node22.23.2 disponíveis. `system_profiler SPAudioDataType` confirmou alto-falantes do MacBook Pro como saída padrão; isso não comprova audição ou aprovação. O MZ está acessível por CUA (`jp.co.kadokawa.rpgmz`); a primeira abertura expirou, a segunda mostrou a janela. Abrir uma cópia descartável, preservando o projeto pessoal que estava aberto. Interação real com o editor ainda será executada. O navegador dirigido declara1280×720 ou1920×1080 CSS, DPR1 e escala nativa inicial1; As dimensões configuram a janela; o executor comum não impõe igualdade de geometria/raster na captura. Zoom nativo excluído pela ADR-G003; usar escala padrão. Movimento normal/reduzido é registrado por sessão.

A inspeção usa objetos MZ, rede e storage somente leitura. Toda decisão passa por controles públicos. Não usar seed injetada, dispatch direto, switches/variáveis de campanha editados, console QA, reconstrução visual ou importação de save sintético em jornada dirigida. Os casos canônicos de falhas I/O, estados exaustivos e texto longo são integração isolada, identificados como tal. A skill mantém identidade da página, foco, inputs, gravações e teardown; a configuração da janela não é uma guarda de geometria.

## Caminhos nativos atuais

| Superfície | Autoria e observação |
| --- | --- |
| Inicialização/arquivos | CE4 por CoreEngine NewGameCommonEventAll; CE2 título; SaveCore locked/current,20 arquivos iniciais; escolher o ID real no seletor |
| Prólogo/taverna | Prólogo em Map002/event001; Map003; CE3/38/39/117; H1–H8 em Maps037–044/event001; identidades de leitura82–113 preservadas; nomes em ConfigureHero/Route/Encounter do CE4 |
| Consultas/UI | Query escalar; V22 herói, V23 abordagem; V150–185 seleção/destinos/elenco; ChoiceFocus formation/hero/destinations/roster/approaches/sacrifice/ending |
| Encontros/mortes | Maps007–022/event001 contêm descrição/abordagens/resultados; CE040 encaminha cenas; CE42 candidatos, CE291 consequências, CE263–290/292–304 mantidos conforme consumidores; CE348 prepara ausências, switches38–45 consumidos, CE45/349/350 animação/limpeza |
| Conselho/finais | Map023/event001 e Maps025–027/event001 contêm os textos/choices reais; CE337 preparação compartilhada; V144–146 testemunhas; escolha Reunir/Destruir em Map023 |
| Memorial/epílogos | Map028 conserva CE58–60/338–347; Maps029–036/event001 contêm os epílogos; V186 encontro,192–215 legendas; portraits10–17,graves22–29,cards30–37; derivados Memorial_H1–H8 |
| Leitura/HIDE | Presentation ObservationBegin/Complete por CE ou unidades explícitas82–113 nos Maps037–044; ReadingPermission/End por passagem; provider FAST, sem botão AUTO; CE64/65; nenhuma tecla S de pulo instantâneo |
| Loading/áudio/créditos | CE351 lista nativa29 imagens; CE67 consultas de contexto; quatro categorias em Options; CE61→CE63 (comando105, velocidade2), retorno por comando354, botão41/Esc |

## Sessões e lotes executáveis

Os [cenários S01–S12, incluindo S06T/S09E](../../../planos/tasks/eventbridge-minimal-runtime/verification.md#runtime-scenarios) são o contrato completo de variantes/resultados. Esta tabela materializa entradas e donos; nenhum item abaixo transfere aceite de um ciclo anterior.

| Lote / sessão | Entrada e ações desta sessão | Resultado independente, variantes e término |
| --- | --- | --- |
| A, Lia: CH-eventbridge-first-campaign | Perfil limpo, Jogar, cancelar/selecionar arquivo, prólogo e taverna; oito entradas, consulta, seleção/retirada, grupo cheio, automático quando vivos≤3, Destinos/Elenco | S01/S02,V001/002/005. Consultar não altera campanha; disponibilidade corresponde a vivos/grupo3/peças/progresso do GDD. Disponível/bloqueado/concluído e teclado/mouse. Término: checkpoint genuíno de preparação obtido por recuo; manter também uma campanha integral desde New Game |
| A/E, Rui: CH-mz-recovery-export (baseline histórica; substituída para H1 pelo incremento ADR-005 acima) | Cópia completa no MZ: Map3→Gorvak→Conversar; copiar uma unidade de conversa para um novo CE e selecionar esse CE no call117; editar texto, nome público no CE4 e valor visual nativo; salvar. Abrir CE351 pelo mapa e sua lista de seletores | S03/S06T,V003/005/008. Jogo executa unidade nova inicialmente não lida, sem unidade antiga/papéis extras; mudança visível sem JS/manifesto. Inspecionar oito entradas e exemplo de prólogo/taverna/encontro/Conselho/final/memorial/epílogo. Guardar trilha GUI, diff da cópia e captura Gorvak para devlog |
| B, Joana: CH-mz-keyboard-qa | Conversa jogada; arquivos de revelação, vítima comprometida e Conselho/terminal. Options/volta, interrupção/Continue nativo, conclusão e releitura; imagem arbitrária no exemplo autorado | S04/S07,V002/006/009. Ausência de AUTO e FAST selecionado pelo jogador, visto→inédito/escolha, parcial/cancelado, arquivo distinto, tecla mantida; normal/reduzido. Mesmos fatos comprometidos, pictures salvas e ausência de replay. Retomar só o checkpoint realmente salvo, sem prometer save de uma fala observacional não gravada |
| C, Joana: CH-mz-keyboard-qa | Taverna, conversa e escolhas por Continue do pai compatível; Tab/HIDE, Tab/clique para restaurar, confirmar/cancelar/manter/soltar | S08,V005/010.1280×720/100% e1920×1080/100%, ambos movimentos; foco visível, nenhuma escolha invisível/dupla, caminhada/menu RPG/aceleração indevida. Término: capturas comparáveis e campanha preservada; conforto depende de pessoa |
| D, Caio: CH-mz-campaign-terminal-matrix | Campanha fresca Igreja→Parque e pai correspondente para a ordem inversa; revelações/vítimas reais; pai Conselho comum para Reunir/Destruir; trajetória de perdas própria para ruim | S05/S10,V001/007. Uma/várias mortes, primeiro/segundo retorno, saída durante fade simultâneo1s, normal/reduzido; elegibilidade de Conselho/epílogos e causas corretas. Memorial0/1/3/8 usa integração visual rotulada quando não jogado. Término: três desfechos persistidos e pais preservados |
| E, Rui: CH-mz-recovery-export | GUI CE351 e integração IT074/075/076 retida; cenas jogadas de entrada/retorno/Continue/conversa/destinos/elenco/mapa | S06/S06T,V008. Lista29 inclui todos heróis/destinos independentemente de elegibilidade; cache frio/delayed, mudança de gráfico e memorial; ausência em startup versus cena ativa segue erro/Retry nativos. Não acrescentar barreira de readiness. Término: lista GUI, pedidos reais e apresentação |
| F, Rui: CH-mz-recovery-export | Arquivos A/B produzidos no mesmo perfil; abandonar fechando/reabrindo, Novo jogo em outro arquivo, cancelar seleção ocupada, Continue alternado; cópias distintas de um pai para duas abordagens/vítimas | S09/S09E,V011. Índice/ID/payload e último sucesso preservados; decisões/recompensa/final não repetidos; manter filho anterior e mestre. Falha de escrita, save ilegível, revisão ignorada, payload estrutural antigo e campanha ausente ficam na integração IT015–024/039/044/045/059/066/079/014 conforme resultados atuais |
| G, Rui: CH-mz-audio-review | Cue nativo em execução, Options/quatro volumes/mudo/retorno, HIDE, Continue e transições/FAST; gravação do grafo de áudio do contexto | S11,V012. Retenção de volume e buffer/ME ativo/parado/substituído sem reinício/duplicação; IT028/029 retêm integração. BGM/BGS/ME/SE e resposta perceptível exigem audição real, com ouvinte/data. Sem ouvinte, registrar gap e disponibilizar evidência concreta |
| H, Caio: CH-mz-campaign-terminal-matrix | Terminal jogado e cópias imutáveis por Continue; observar créditos e sair por velocidade natural, aceleração, pulo cedo/tarde teclado/mouse | S12,V014. Última linha sai, botão funciona, título retorna uma vez e ending salvo não muda. Longo80 linhas/segundo bloco e final sem memorial têm integração IT058/022 separada. Término: capturas/registro nativo e arquivo terminal inalterado |

Cada execução respeita o time-box de seu charter (60/90min), deixa um checkpoint/relato ao encerrar e retoma em outra sessão quando necessário. Os charters antigos preservam suas missões; receitas antigas de seed/três APIs QA, revisão obrigatória, pulo S ou condições adicionais de finais não selecionadas pela spec são supersedidas por este guia. Não há novo gate de mobile, VoiceOver, texto/arte provisórios gerais, preload global ou publicação.

## Banco de checkpoints e ramificações

Mestres ficam em `docs/qa/evidence/eventbridge-minimal-runtime/checkpoints/<id>/`; o relatório mantém o único índice. Capturar somente após autosave e índice persistidos, por `captureNativeSave`. O arquivo contém origem/gameId/fileId, payload/índice/storage completo, hashes, campanha, mapa/pilha salvos, leituras UI, ausências consumidas e produtor/transcrição/fontes. Nomear pelo limite **salvo**, não pela cena viva se ela já avançou. Na primeira taverna, o save pode continuar sendo o prólogo: registrar isso; uma preparação persistida pode ser produzida por recuo legal.

| Pai planejado | Produtor mínimo e prefixo reutilizado | Alternativas novas depois de Continue |
| --- | --- | --- |
| start | Jogar→arquivo→checkpoint new_campaign | Primeira formação, conversas/leituras, destinos e segundo arquivo; ler o prólogo ainda não salvo como concluído |
| formation-return | start→grupo3→partir→revelação→Recuar confirmado→consequence | Seleção/retirada/rota e observação de Elenco; nenhuma seleção editada em storage |
| reveal-route-position | Partir e ler até cada revelação; captura antes de abordagem | Duas abordagens distintas; reler/recuar; conservar atribuição/RNG do pai |
| victim-route-position | Revelação→abordagem inviável→sacrifice_choice | Cada vítima elegível em cópia independente; morte correspondente e demais vivos preservados |
| committed-death | Seleção real da vítima→checkpoint sacrifice, antes de terminar despedida | Concluir despedida/consequência e observar primeiro retorno/fade; Continue não pode rearmar efeito já consumido |
| first-return | Consequência da morte/grupo perdido→taverna | Elenco, saída durante fade quando a preparação nativa permitir, retorno posterior e movimento reduzido |
| council | Duas peças→Vilarejo→Conselho→checkpoint council | Reunir e Destruir compartilham exatamente este pai; ler apenas a continuação nativa necessária antes de escolher |
| loss-path | Grupos reais com competências limitadas e abordagens inviáveis; pais de vítima/morte desse caminho | Perda total real; nunca editar um save de escolha final para obter ruim |
| terminal-reunite/destroy/bad | Respectiva escolha/perda total→checkpoint ending | Memorial/epílogos/créditos natural/acelerado/pulos e repetição de Continue; não certificar outro final com esse pai |

Cada filho recebe **uma cópia inalterada antes da primeira página**, mesma origem, novo contexto, autosave ativo e seleção do arquivo real por Continue. `directed-adapter.prepare({project,archivePath})` valida fonte/origem/identidade, decodifica payload/índice nativos e compara campanha/arquivo/estado descritos antes de entregar storage à skill antes do boot. Nunca restaurar storage durante jogo. Guardar SHA do mestre antes/depois, omitido, ações novas, resultado e SHA do filho. Fontes do jogo/eventos/configuração/asset/provider alteradas invalidam pais dependentes; documentação isolada não. Se incompatível, produzir o menor prefixo legal a partir de outro pai válido ou New Game.

## Cobertura retida, defeitos e encerramento

Tasks01–14: inicialização/consultas;32 unidades observacionais e193 passagens; taverna; encontros/Conselho/epílogos; memorial e ausência; loading; provider/input; arquivos/checkpoints; áudio e créditos. Reusar apenas testes/capturas cujas dependências continuam iguais, indicando integração ou inspeção visual. Bundles atuais inspecionados de memorial/créditos estão em task14/20260912; não substituem campanhas nem gosto humano.

Deduplicação: `BUG-20260911-tavern-portraits-offscreen` e `BUG-20260911-lovers-prison-not-visible` permanecem baselines criativas fora deste redesenho; cancelamento de bustos, HIDE, histórico de saves e escolha final usam seus registros existentes se reaparecerem. `BUG-20260909-memorial-survivors-total-loss` é refinamento narrativo conhecido já aceito, sem correção implícita. Não abrir cards/remeter mensagens de QA; equipe/autenticação seguem o workflow local.

As cinco dimensões são cobertas: jornada completa(A/D/F/H), função(A/B/D/F), experiência(B/C/D/G/H), erros/vazios(A/E/F), continuidade/desktop(B/C/F). Mobile/VoiceOver e nova aprovação editorial geral estão fora do incremento. O usuário aprovou a organização do mapa de Gorvak e a remoção dos atalhos. Os demais critérios de autoria sem JS, UI/leitura/controles, novo memorial e áudio perceptível permanecem separados na verificação; não inferir aprovação desses critérios.

Ao terminar cada sessão, fechar somente recursos próprios, preservar masters/transcrições/capturas e restaurar a cópia de falha I/O. A cópia de editor tem diff/proveniência próprios e não substitui o jogo principal. Capturas Gorvak→jogo, memorial e créditos são candidatas de devlog; cópia para deliveries ocorre após aceite compatível. Relatar recurso inacessível como gap de sensor; JSON editado por script nunca é prova de interação MZ.

## Executores mantidos deste ciclo

Os módulos abaixo são cenários do runner dirigido instalado na skill, não inscrições adicionais na suíte canônica. Para campanhas/checkpoints, preparar a cópia com `directed-adapter.prepare({project,archivePath})`, informar seu `fixture` ao CLI `directed-browser.mjs` e usar um diretório novo de saída em cada execução. O descriptor fornece o `fileId` real do archive; o caso seleciona Continue e confirma o arquivo por UI. Não restaurar storage depois do boot.

| Módulo em `rpg-maker/qa/` | Uso e configuração |
| --- | --- |
| `native-journeys.test.mjs` | Campanha nova ou prefixo nativo: `DRYLAND_QA_JOURNEY=physical-first-reunite`, `supernatural-first-destroy` ou `bad`. `DRYLAND_QA_CREDITS=natural`, `accelerated`, `keyboard`, `mouse`, `late-keyboard` ou `late-mouse`. |
| `native-journeys.test.mjs` | Alternativa curta: `DRYLAND_QA_BRANCH_ONLY=1` com `DRYLAND_QA_APPROACH` ou `DRYLAND_QA_VICTIM` (posição humana1–3). Para ausência: `DRYLAND_QA_RETURN_ONLY=1`, opcional `DRYLAND_QA_LEAVE_FADE=1`; usa recuo legal quando necessário. |
| `native-surfaces.test.mjs` | Taverna, oito heróis, leitura, HIDE/Options/roster/destinos. `DRYLAND_QA_FILES=1` acrescenta grupo cheio, remoção/reseleção e arquivos A/B. `DRYLAND_QA_VIEWPORT=large` usa1920×1080; padrão1280×720. Zoom nativo fora da matriz; não configurar DRYLAND_QA_ZOOM. |
| `native-continuity.test.mjs` | `DRYLAND_QA_CONTEXT=farewell`, `council` ou `epilogue`; exige master anterior ao contexto. Testa composição, HIDE, Options e Continue real com releitura do prefixo não salvo; ao final observa um Enter público em três frames distintos. |
| `native-audio.test.mjs` | `DRYLAND_QA_AUDIO=me` ou `se` com terminal Destruir; `bgs` com retorno à taverna. BGS inclui releitura Gorvak com FAST e reset na escolha; SE observa novo som de cursor em40/0/30. `bgm` registra a ausência de faixa BGM autorada; IT029 usa o BGM de referência do System apenas em integração isolada. Captura do grafo WebAudio não substitui audição humana. |
| `native-editor.test.mjs` (baseline histórica, cópia anterior à ADR-005) | Usar diretamente como `--fixture` a cópia previamente editada na UI nativa do MZ, sem `prepare` que substituiria seus dados. O caso exige CE352, chamada CE5→352, rótulo “Gorvak vigia”, escala80 após CE81 e picture92; verifica New Game, leitura, Options e partida/Continue real. A preparação autoral e o manifesto têm proveniência própria, separada do banco principal. |

`DRYLAND_QA_MOTION=reduce` aplica a preferência real do contexto nos casos de campanha, superfícies e continuidade. Os cenários afirmam apenas suas variantes executadas. Controles bloqueados, texto ainda não lido, falhas de armazenamento e dados de campanha são observados; nenhuma chamada direta às ações de domínio é autorizada nesses módulos. Casos curtos de branch não passam a campanha completa. Os arquivos auxiliares `.archive.json` têm proveniência no relatório e apontam para os checkpoints de storage registrados pelo runner.


O oráculo de créditos registra velocidade configurada2 (um pixel/frame normal, três com Shift), avanço efetivo, última linha antes da terminação natural e estabilidade do Title em três frames. O número global de chamadas de retorno ao título é a responsabilidade do IT058 isolado; estabilidade da interface não é apresentada como contador de chamadas. Os pulos cedo/tarde mantêm modalidades separadas de teclado/mouse.


A receita antiga CE83→352/CE81 pertence exclusivamente à demonstração histórica. Na arquitetura atual, editar diretamente o evento001 do mapa; MAS-07 cobre Map002 e Conversa — Elowen em uma cópia descartável. A alteração deve ser feita pela UI do MZ, seguida de execução por entradas reais. Preservar a cópia e seus hashes como proveniência local; uma transformação JSON não comprova autoria no editor.

## Expansão de autoria por mapa — plano de execução 2026-09-14

Esta seção substitui as receitas de autoria/rotas anteriores para MAS-01–07. A execução começa somente após o join técnico da task29. Os resultados ficam no relatório existente, em seção própria, sem transferir PASS histórico. Task15 planeja; task16 executa MAV-013/014. Os32 IDs da verificação conservam seus donos.

Fontes: Map002/event001 (prólogo), Maps037–044/event001 (oito heróis), Maps007–022/event001 (encontros), Map023/event001 (Conselho), Maps025–027/event001 (finais), Maps029–036/event001 (epílogos). Os232 slots aposentados e os helpers retidos estão no inventário da task29. CE004/030–037/064/065/067/350/351, sacrifício e inscrições do memorial conservam seus consumidores funcionais. Observações82–113 são identidades de leitura, não chamadas CE.

| Lote / sensor | Preparação e variante | Ações, resultado e conclusão |
| --- | --- | --- |
| MA-A / dirigido + visual | `native-surfaces.test.mjs`, perfil limpo,1280×720 normal, `DRYLAND_QA_FILES=1` | MAS-01/02/05: visitar8 heróis, capturar menu/perfil/conversa por arte, FAST inédito/releitura, HIDE/Options, selecionar/retirar/grupo cheio, voltar; produzir e alternar arquivos A/B. Cada entrada tem root do mapa esperado/event001 e texto local; conversar preserva fatos. |
| MA-B / dirigido + visual | Mesmo caso, novo perfil, `DRYLAND_QA_VIEWPORT=large DRYLAND_QA_MOTION=reduce` | MAS-01/05: repetir superfícies em1920×1080/reduzido; verificar enquadramento de cada arte e limpeza na transferência. Usar escala padrão; não executar variante adicional de zoom. |
| MA-C / campanha fresca | `native-journeys.test.mjs`, `DRYLAND_QA_JOURNEY=physical-first-reunite DRYLAND_QA_BANK_RETREAT=1` | MAS-02/03/04/06: campanha desde Jogar/arquivo, prólogo, formação, recuo, duas rotas, sucesso/falha/sacrifício, Conselho/Reunir, memorial, epílogos/créditos. Conservar pais de preparação/revelação/vítima/Conselho/terminal com origem, bytes e verdade do limite salvo. |
| MA-D / ordem inversa | Mesmo caso, perfil limpo, `DRYLAND_QA_JOURNEY=supernatural-first-destroy DRYLAND_QA_MOTION=reduce` | MAS-03/04/05/06: começar sobrenatural, alcançar Destruir; resultados pertencem aos encontros atuais, consequência ocorre uma vez, eligibility/epílogos seguem o GDD. |
| MA-E / perdas reais | Mesmo caso, perfil limpo, `DRYLAND_QA_JOURNEY=bad` | MAS-03/04/06: mortes por decisões realmente jogadas até perda total, sem construir estado ou editar um pai de Conselho; guardar terminal próprio. |
| MA-F / continuidade | `native-continuity.test.mjs`, `DRYLAND_QA_CONTEXT=council`, `farewell`, `epilogue`; pais jogados mais próximos, cópias independentes | MAS-03/05: observar HIDE/Options e Continue genuíno, composição, root23 ou epílogo28+H, leitura/consequência única. Comparar limite salvo ao que foi observado, sem exigir retomada de fala não salva. |
| MA-G / áudio renderizado | `native-audio.test.mjs`: `bgs` com pai de preparação, `me`/`se` com terminal Destruir; `bgm` como observação de ausência autorada | MAS-06: volume/mudo/retorno, cue nativo sem reinício indevido, HIDE/FAST e Continue. Guardar WebM/RMS e observações; áudio físico e gosto dependem de ouvinte. IT029 retém somente integração da referência BGM. |
| MA-H / controles de encerramento | Cópias dos terminais genuínos, `native-journeys.test.mjs`, `DRYLAND_QA_CREDITS=natural`, `accelerated`, `keyboard`, `mouse`, `late-keyboard`, `late-mouse` | S12: avanço por frame, última linha e saída ao título estável; bytes/outcome preservados. Distribuir variantes entre campanhas e filhos curtos, sem repetir o prefixo inteiro. |
| MA-I / editor nativo e reprodução | Uma cópia integral descartável aberta no MZ; `map-editor.test.mjs` com essa mesma fixture | MAS-07: editar pela UI o primeiro Show Text de Map002 para “Prólogo — fala editada no mapa.” e o primeiro Show Text do perfil (ramo Conversar) de Map038 para “Elowen — fala editada no mapa.”; salvar. Novo jogo e entrada por Elowen devem mostrar exatamente as duas falas, sem JS/registro/CE substituto. Capturar árvore/comando/resultado e diff/hashes antes/depois. Reabrir projeto principal sem transportar a demonstração. |

Integração canônica, separada da campanha dirigida: todos16 encontros×3 abordagens×sucesso/falha (IT082–084), oito epílogos/participantes e retomada (IT062/073), mortos/automático/guardas/grupo cheio (IT081), memorial0/1/3/8, falhas de gravação/loading e entrada fora de contexto. A task29 junta resultados e equivalência por dependência; tais fixtures não geram masters dirigidos.

Arquivos de candidato e casos ficam congelados durante cada execução. Todos os masters antigos com listas CE/mapa anteriores são incompatíveis com esta expansão; gerar pais novos. O adapter confere todos os hashes de runtime e a origem antes do boot. Um filho usa o mesmo porto/origem do produtor, storage importado antes da primeira página e novo contexto; autosaves não alteram o mestre. O relatório registra o prefixo omitido e compara SHA do mestre antes/depois.

Recursos: Node22.23.2, Chrome153.0.8010.36, MZ por CUA e saída padrão Powerbeats Pro disponíveis (alto-falantes MacBook Pro também enumerados); disponibilidade não é audição humana. Cada servidor tem uma cópia/contexto isolados. A suíte canônica usa18730; os lotes dirigidos usam18731 e só começam após seu término. Sessões independentes podem usar portas próprias se identificadas no relatório; nunca compartilhar arquivos, perfis ou encerrar um processo desconhecido. Não aplicar zoom em janela pessoal.

Preparação e invocação, a partir da raiz, com `DRYLAND_QA_PORT=18731` no ambiente de ambos os processos:

```sh
node --input-type=module -e 'import {prepare} from "./rpg-maker/qa/directed-adapter.mjs"; console.log(JSON.stringify(await prepare({project:process.cwd()})));'
node .agents/skills/rpg-maker-mz-qa-execution/scripts/directed-browser.mjs --project "$PWD" --fixture /caminho/retornado/game --case "$PWD/rpg-maker/qa/native-surfaces.test.mjs" --adapter "$PWD/rpg-maker/qa/directed-adapter.mjs" --output "$PWD/docs/qa/evidence/eventbridge-minimal-runtime/map-authorship-expansion/nome-novo"
```

Para um filho, passar `archivePath` absoluto ao `prepare`; para MA-I, usar diretamente a cópia editada e seu descriptor. Os caminhos do exemplo são argumentos a preencher com a saída real, sem gerador de conteúdo. `npm start` e porta18726 permanecem a entrada manual conforme local-game-run.md; o adapter inicia/encerra o servidor da cópia. Reusar dependências já instaladas; instalar pelo lockfile da skill somente se ausentes.

Cada lote guarda descriptor/fingerprint, fontes, variante, inputs públicos, PNG e observações; áudio acrescenta WebM. Exit0 é coleta, não aprovação visual: inspecionar report/status/pendingReviews e as imagens antes de registrar o resultado técnico. Falhas conservam primeiro relatório; diagnosticar produto/fixture/infra e retomar somente com hipótese verificável. Encerrar browsers/perfis/servidores próprios em todos os caminhos; manter evidência e masters imutáveis. A demonstração editada tem identidade própria.

Julgamentos finais continuam separados: autor sem JavaScript avalia a localização/edição; UI avalia leitura/navegação/controles; Technical Art avalia enquadramentos/memorial; pessoa ouvinte avalia resposta audível. A aprovação anterior da organização de Gorvak é parcial do tópico1. Registrar pessoa/data/decisão para o material ampliado; não impor nova aprovação narrativa ou artística fora do recorte. Selecionar árvore/comandos/linhas jogadas e memorial/créditos como candidatos de devlog, sem publicar ou organizar entrega aceita antes do aceite compatível.


## Exclusão de zoom nativo — ADR-G003

A [ADR-G003](../../adrs/adr-g003-excluir-testes-de-zoom-nativo.md) substitui parcialmente as variantes de zoom antes previstas neste guia. Não programar nem retomar testes de zoom nativo. As tentativas anteriores permanecem históricas. A matriz desktop e os demais sensores continuam vigentes.

## Integração comum das skills

A [nota local](../../../rpg-maker/qa/skill-integration.md) registra preparo com output
explícito, captura de storage, WebM declarado e reabertura de página no mesmo
contexto. O executor comum também oferece recriação explícita de contexto, WAV,
vídeo e recibos com fallback ordinário quando faltam metadados de equivalência.
