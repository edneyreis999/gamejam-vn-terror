> Historical record: the HTML implementation has been retired. Procedures and source references below describe that past delivery only; do not execute them, recover its source, or treat its results as evidence of the current game. Current implementation: `rpg-maker/The Dryland Drowned/`; current tests: `rpg-maker/tests/`.

# Pré-análise do eject para RPG Maker MZ

**Data:** 6 de setembro de 2026. **Estado:** investigação concluída para iniciar a entrevista; arquitetura e recorte de migração ainda não aprovados. **Fonte de design:** GDD canônico, incluindo as alterações posteriores ao snapshot v4.0.

Este documento compara a experiência atual com soluções possíveis usando o MZ e os plugins que estão no projeto. Os fluxos, percentuais e complementos descritos são candidatos para discussão, não um plano final de implementação. Não altera o GDD, specs concluídas, configuração dos plugins ou código do jogo. A migração continua dependendo de spec incremental e comprovação de paridade, conforme o GDD §22.

## 1. Resumo do jogo entendido

### 1.1 Loop e estrutura narrativa

Afogados em Terra Seca é uma VN de horror em PT-BR, sem combate. Ivaí conduz oito heróis por duas rotas iniciais em qualquer ordem e uma rota final. Sua promessa de tesouro oculta uma maldição familiar e seu interesse em destruir o Medalhão das Duas Margens.

O ciclo é: avisos e Jogar → prólogo → taverna com consulta e formação → escolha de destino → Partir → apresentação do caminho → encontro → três abordagens → sucesso ou sacrifício → próximo encontro, recuo ou conclusão da rota. Após as duas peças do mapa, abre-se o Vilarejo; depois de seis encontros vêm Conselho, opiniões dos presentes, escolha do medalhão, desfecho, memorial e epílogos elegíveis.

Com quatro ou mais vivos, partem exatamente três escolhidos. Com até três, todos entram automaticamente. Ivaí acompanha sem ocupar vaga e sem competências. Cada herói tem duas competências binárias internas; a abordagem funciona se qualquer presente possui a competência exigida. Não há escolha de executor no sucesso, teste aleatório, HP, ferimentos, níveis, afinidade ou recurso consumível.

Cada falha exige escolher, com uma ativação, um herói vivo presente para morrer. A morte ocorre antes da despedida. A expedição pode continuar com um sobrevivente. Se o último presente morrer, normalmente há retorno automático à cidade; porém, **no sexto encontro final, com reservas vivas na cidade, Ivaí entra sozinho no Conselho**. Se a morte eliminar o oitavo herói, prevalece o bad ending, sem escolha final.

As rotas iniciais revelam cinco encontros de pools distintos de oito. As posições são preenchidas apenas quando reveladas, preservadas em recuos e nunca repetidas. O Vilarejo usa os seis restantes. Recuar reinicia a tentativa na posição um, mas mantém mortes, atribuições e maior progresso conhecido. Esse progresso informa conhecimento, não um checkpoint de retorno.

### 1.2 O que o protótipo realmente implementa

O runtime atual se identifica como V3 no README e no contrato de estado, embora a spec histórica e o GDD chamem o incremento de `prototype-v2-gdd-layouts`. Não são dois jogos distintos a migrar. O entrypoint carrega scripts clássicos nesta ordem: `data.js`, `narrative.js`, `game.js`, `app.js`.

| Camada atual | Responsabilidade observada | Aproveitamento possível |
|---|---|---|
| `data.js` | Oito heróis, competências privadas, bios, falas fixas, 16 encontros, 48 abordagens e seus resultados, três destinos e caminhos de assets | Conteúdo e IDs estáveis são fonte para transcrição ou adaptação; não transportar campos privados para mensagens públicas |
| `narrative.js` | Passagens com IDs e origem editorial, cenas, speakers, cenários, referências a despedidas/opiniões/epílogos | Preservar identidade das passagens e reutilização de textos; escolher na entrevista se a autoria final será no editor ou em catálogo externo |
| `game.js` | Transições validadas, RNG Mulberry32, atribuições, formação, mortes, consequências, leitura, finais e projeção pública | Regras e invariantes reaproveitáveis; não é necessário transportar o dispatcher inteiro para reproduzir todos os fluxos |
| `app.js` | DOM, taverna espacial, hover/foco, modais, cards, controle de ativação, falhas de imagens e QA somente leitura | Serve de contrato de UX; listeners e nós DOM não são a arquitetura natural de uma implementação em eventos MZ |
| `styles.css` | Layout, pergaminho, recortes, sombras, reflexão, escala de seleção e desaparecimento | Referência de composição; contém estilos históricos que não provam features atuais por si sós |
| `tests/` e `tests.html` | Testes de dados, regras, fronteiras públicas, interação e jornadas | Oráculo de comportamento; testes do DOM não passam a testar MZ automaticamente |

A campanha funcional já contém as três rotas, clímax, dois finais escolhidos, bad ending, memorial, epílogos e reinício explícito. Os diálogos aparecem completos, sem máquina de escrever. Não existem menu de configurações, message log público, botão HIDE, AUTO, save/load ou áudio. `seenPassageIds` é memória de leitura, não um log consultável.

A investigação é leitura da ilustração, descrição e três alternativas; não existe busca por hotspots, coleta livre de pistas, combinação de itens ou puzzle de inventário. Os exemplos da demanda não devem criar esses sistemas por inferência.

### 1.3 Estados, inventário e apresentação

O estado atual reúne: fase, semente e estado do RNG, destino selecionado, rota/posição atual, formação em edição e em expedição, mortos, mortes já apresentadas na taverna, atribuições por rota, progresso máximo, rotas concluídas, consequência pendente, cursor de leitura, passagens vistas, peças do mapa, medalhão completo, escolha final, formação do clímax, retorno de confirmação de recuo, sequência e histórico de ações.

Há 19 fases reconhecidas pelo validador, incluindo `ready`, `formation`, `encounter_choice`, `sacrifice_choice`, `death_result`, `council`, `final_choice`, `campaign_complete` e `invalid`. Painéis abertos, herói inspecionado e temporizador da ausência pertencem à apresentação; não são decisões da campanha.

O inventário é narrativo: peça anã, peça élfica e disponibilidade das metades do medalhão. Não há ouro funcional, consumíveis, equipamento utilizável nem telas para manipular esses objetos. A primeira metade do medalhão é um fato inicial oculto; a segunda é adquirida no Conselho. As peças do mapa abrem a rota e não representam as alternativas do final.

A direção aprovada prevê 35 imagens principais: 16 encontros, três destinos, quatro cenários e 12 retratos estáticos, com uma pose/expressão por personagem. O protótipo usa arte provisória, com apresentação visual já observável. Pedra/raízes, mapa sobreposto e reflexo usam também CSS; essas composições podem virar pictures transparentes e arte preparada, sem reproduzir os mesmos efeitos por shader.

### 1.4 Autoridade e divergências que importam

| Assunto | Situação correta para esta análise |
|---|---|
| Mecânicas centrais | Confirmadas no GDD e majoritariamente implementadas no protótipo |
| Save, áudio e reflow estreito | Confirmados para o jogo completo; fora do incremento HTML atual. Sua inclusão no primeiro incremento MZ permanece por decidir |
| Arte e trechos narrativos provisórios | Baseline de protótipo; migrar não equivale a aprovar editorialmente ou entregar assets finais |
| PT/EN da lista inicial | Diverge do GDD: somente PT-BR jogável. TSV/localização não é requisito atual |
| Expressões, breathing, cut-ins e som por letra | Capacidades instaladas, não necessidades aprovadas; expressões múltiplas e animação adicional estão fora do escopo vigente |
| Log, HIDE e AUTO | Constam como oportunidades na lista de plugins, não como features confirmadas no GDD ou no protótipo |
| Múltiplos slots, reload para desfazer decisões | Contrários ao contrato de campanha; presença de SaveCore não autoriza esse comportamento |
| Partir inválido | O protótipo mostra o botão ativável e rejeita a ação com feedback; o GDD §19.1 pede habilitação só após uma preparação válida. A implementação MZ deve seguir o GDD |
| Plataforma MZ | O pedido autoriza esta investigação. Exceções a runtime de terceiros, `file://`, reflow e armazenamento devem ficar explícitas na futura decisão/spec |

## 2. Inventário de plugins e condições reais do projeto MZ

### 2.1 Situação instalada e ativa

Foram encontrados **23 arquivos `.js`**: **17 plugins VisuStella ativos**, quatro plugins oficiais presentes mas fora de `plugins.js`, uma cópia de Debugger e um separador. Não há entrada configurada com `status: false`: os quatro oficiais simplesmente não estão registrados. O [inventário verificável](inventario-plugins.md) inclui versões, dependências, ordem, comandos e parâmetros de primeiro nível de todos os arquivos.

| Grupo | Plugins e recursos confirmados nos arquivos | Aplicação e limite |
|---|---|---|
| Infraestrutura | **CoreEngine 1.90**: ajustes de entrada/janelas, easing de pictures, `PictureEraseRange`, `SystemLoadImages`, comandos JS/variáveis, customização do título | Base exigida explicitamente por VNPictureBusts e VisualCutinEffect; não significa que cada plugin da biblioteca isoladamente exija CoreEngine |
| Diálogo e texto | **MessageCore 1.57**: `MessageWindowProperties`, `MessageWindowXyOffsets`, `ChoiceWindowProperties`, listas de escolhas encadeadas, macros `[Nome]`, `PictureTextChange/Erase/Refresh`, `<Help>`, `<BgImg: ...>` | Principal recurso de autoria e apresentação; word wrap das mensagens não equivale a reflow da tela nem a wrap automático de escolhas |
| Leitura auxiliar | **ExtMessageFunc 1.22**: console de botões, `MsgButtonConsole`, `ExtFastFwdDisallow`, cursor, tails, roda do mouse | FAST acelera eventos, não consulta IDs de passagens vistas. Console não documenta inserção arbitrária de novos comandos na lista |
| Bustos e portraits | **VNPictureBusts 1.03**: `Basic_EnterBust`, `Basic_GraphicChange`, `Move_MoveToCoordinates`, `Scale_ScaleTo`, `Fade_FadeOut`, `Tone_*` | Bustos são pictures MZ; interoperam conceitualmente com os outros sistemas de pictures. Posições 0–10 padrão ficam na base, com margem de 200 px; não reproduzem automaticamente a taverna espacial |
| Escolhas visuais | **PictureChoices 1.02**: `<Bind Picture: id>`, `<Hide Choice Window>`, `ChangePictureChoiceSettingsOne/Range`, `ClearAll` | Hover muda foco; clique confirma com uma ativação; teclado segue a ordem das choices. Não implementa seleção múltipla persistente |
| Eventos de prévia | **ChoiceCmnEvts 1.02**: `<Choice Common Event: id>` no texto da escolha | Executa ao selecionar/focar, antes de confirmar, em paralelo à lista no mapa; não existe Plugin Command próprio |
| Histórico | **MessageLog 1.08**: mensagens, speaker, face e escolhas; `BypassMessageLogging`, controles de menu e atalho | Registra `Show Text` no mapa. Texto desenhado em picture ou janela própria não se torna log automaticamente. Limite atual: 50 entradas |
| Ocultar UI | **MessageVisibility 1.03**: tecla configurável, HIDE no console, Common Events on Show/Hide | Opera sobre janela de mensagem e subcontroles no mapa; pictures/HUD externos exigem integração. Não é um sistema de investigação |
| Dicas textuais | **MessageKeywords 1.05**: `((Keyword))`, substituição e tooltip, suporte adicional de teclado nas janelas documentadas | Não é sistema de hover de retratos. Tooltip não suporta word wrap. Não usar para expor competências ou criar códice fora de escopo |
| Pictures compostas | **AttachedPictures 1.05**: `MessageAddPicture`, `PictureAddPicture`, remoções correspondentes | Filho herda transformação, opacidade e tom do pai. Não admite árvore arbitrária de attachments; não anexar ficha legível a um retrato que encolhe sem compensação |
| Feedback | **GabWindow 1.05**: `GabTextOnly`, `GabTextPicture`, `ClearGab`, `WaitForGab`, callbacks e switches ao concluir | Bom candidato a aviso secundário. Fila temporizada não substitui texto indispensável nem balão persistente de inspeção |
| Animação | **VisualCutinEffect 1.02**: `CutinStart_VisualCutinEffect`, swaps, encerramento e espera de entrada/saída | Há uso em mapa; BattleCore é integração de batalha, não exigência para a VN. Cut-ins ficam acima do spriteset e abaixo da maioria das janelas |
| Áudio de letras | **MsgLetterSounds 1.03**: `MsgSoundChangeMessageSound`, reset e `SystemEnableMessageSounds` | Não necessário para texto instantâneo; áudio da campanha é melhor atendido por BGM/BGS/SE nativos |
| Save | **SaveCore 1.14**: estilos Standard/Slot-Locked/Single, autosave no arquivo próprio/atual/ambos, três estágios de autosave, callbacks de sucesso/falha e `<Global>` | Boa base para um slot, mas não implementa a semântica de morte permanente, retomada de cena ou versionamento do domínio |
| Configurações e input | **OptionsCore 1.28**: categorias, volume master, opções integradas, remapeamento de teclado/gamepad, callbacks de valores e persistência | Pode receber poucas opções adequadas à VN. O menu atual inclui itens de exploração/batalha e textos em inglês que precisam configuração |
| Título por eventos | **EventTitleScene 1.06**: mapa dedicado, `NewGame`, `LoadScreen`, `Options`, `<Continue>` | Integração com Single Save consta no changelog local. O mapa de título não salva automaticamente; falta criar seu evento de entrada |
| QA de desenvolvimento | **Debugger 1.02** e cópia idêntica | Modifica switches, variáveis, inventário, estados e teleporta. Não substitui a API de QA somente leitura do protótipo |
| Oficiais não carregados | **ButtonPicture** (`set` → picture chama Common Event); **TextPicture** (`set` → texto na próxima picture sem arquivo) | Alternativas reais. ButtonPicture bloqueia clique quando `$gameMessage.isBusy()` e não fornece navegação por teclado |
| Menus alternativos não carregados | **AltMenuScreen**, **AltSaveScreen** | Alteram classes de menus/save, mostram dados típicos de RPG; baixo valor para esta VN e sobreposição com os cores |
| Outros | `--------------------------.js` | Separador sem mecânica |

**Ausentes:** `Jhonny_CreditsSkip` e `VisuMZ_4_PictureCmnEvts`. Este último aparece na documentação de AttachedPictures, mas não deve ser confundido com ChoiceCmnEvts. Não foi identificado plugin instalado de quests, party management dedicado, hotspots, RNG persistente de campanha ou seleção múltipla de elenco.

### 2.2 Parâmetros atuais que precisam entrar no planejamento

| Configuração observada | Consequência |
|---|---|
| Runtime MZ **1.10.0**; System e janela NW.js **816 × 624** | Não está configurado para a composição desktop do protótipo. Headers atualizados para 1.9.0 não comprovam por si sós todos os fluxos em 1.10.0 |
| MessageCore: quatro linhas, largura 816, velocidade 10; 11 é instantâneo | Configuração não reproduz trechos instantâneos do protótipo. Word wrap está desligado |
| FastForwardKey `pagedown`; Ext FAST ligado, velocidade 8 | O atalho também deve ser tratado; remover apenas o botão FAST não resolve leitura indevida |
| Console `auto, fastFwd, log, hide, save, load, options, gameEnd` | Expõe ações além do escopo e possíveis saídas do fluxo irreversível |
| SaveCore `standard`, máximo 20, autosave `file0` | Está preparado para slots manuais mais autosave, não uma campanha única |
| Autosave após batalha, transferência, abertura/fechamento de menu; opção desativável pelo jogador | Pontos técnicos não equivalem aos checkpoints narrativos; menu de autosave opcional é inadequado à regra de morte permanente |
| Save/Load/Autosave failure JS sem ação de produto | Popup genérico não decide o que fazer quando uma morte não pôde ser persistida |
| MessageLog: 50 entradas, `pageup`, menu habilitado | Uma campanha pode ultrapassar esse limite; não usar esse buffer para determinar o que já foi lido |
| MessageVisibility: `tab`; Common Events show/hide = 0 | Tab conflita com o hábito de navegação de foco do protótipo; HUD externo não tem ciclo de ocultação configurado |
| AttachedPictures: IDs **61–70** ligados à mensagem por padrão | Esses IDs podem desaparecer quando a mensagem fecha; precisam ser reservados ou reconfigurados |
| MsgLetterSounds ativo e sons habilitados | Diverge do protótipo sem áudio e da leitura sem revelação por letra |
| EventTitleScene ativo, MapID 1; Map001 sem eventos; quatro Common Events vazios | Instalar os plugins ainda não implementou título, fluxo ou cenas. O boot para no mapa de título sem interação |
| Actors/party ainda são os dados de projeto inicial; party inicial `[1,4,6,7]` | Não interpretar esses actors como o elenco H1–H8 já configurado |
| Localization Enable = false | Coerente com PT-BR somente; a lista de idiomas padrão não indica traduções prontas |

### 2.3 O que o exame de código e boot permitem afirmar

Boa parte do corpo dos plugins VisuStella está ofuscada, inclusive arquivos formatados em múltiplas linhas. Os comandos e parâmetros do header são contratos identificáveis; nomes internos encontrados no runtime não são automaticamente APIs públicas estáveis. Não foi necessário desofuscar nem editar plugins para a análise.

No boot HTTP, foram observadas cadeias de aliases concorrentes em `Window_Message.isTriggered` (MessageCore, ExtMessageFunc, MessageLog e MessageVisibility), `Window_Selectable.select` (PictureChoices e ChoiceCmnEvts), `Sprite_Picture`/`Game_Picture` (Core, Busts, Attached e MessageCore) e fluxo de saves (SaveCore). A ordem atual respeita os tiers e as dependências explícitas encontradas. Isso é evidência de carregamento e superfície compartilhada, **não prova de compatibilidade de todas as composições propostas**.

O MZ nativo salva system, screen, switches, variables, actors, party, map e player. Exclui `$gameMessage` e `$gameTemp`; o mapa inclui seu interpreter. Logo, serializar o MZ não garante reiniciar corretamente uma passagem, nem impede repetir uma consequência ao reconstruir eventos. Esse ponto precisa de uma política explícita de retomada.

## 3. Inventário de features e primeiros matches

### 3.1 Como ler a cobertura

**P:** existe no protótipo; **G:** descrito no GDD; **I:** suporte implícito necessário; **L:** oportunidade originada apenas na lista inicial de plugins. **G-completo** distingue o requisito de produção que o incremento HTML exclui. **Baseline** identifica conteúdo provisório, não mecânica indefinida.

Percentuais são estimativas do comportamento coberto pela **base nativa + plugins já instalados**, antes de preencher o gap: 100% direto; 80–99% configuração/eventos; 50–79% base útil com integração/extensão; menos de 50% pouca cobertura específica; 0% nenhuma cobertura relevante. Não medem progresso, precisão estatística nem percentual de código que será portado. Um mesmo recurso técnico pode sustentar várias features; não somar as linhas.

### 3.2 Entrada, leitura e cenas

| ID — Feature e origem | Candidato, recurso e fluxo possível | Cobertura | Gap e melhor preenchimento | Complexidade e risco |
|---|---|---:|---|---|
| F01 — Avisos, classificação pretendida e Jogar explícito; P+G | Eventos nativos `Show Text/Show Choices`, ou EventTitleScene `NewGame`: avisos → ativação de Jogar → prólogo | 95% | Configuração + evento de título | Baixa; impedir início automático da campanha ao carregar |
| F02 — Continuar e confirmação de Novo jogo; G-completo | EventTitleScene `<Continue>`/`LoadScreen` + SaveCore Single: detectar campanha → continuar ou confirmar substituição | 85% | Common event de confirmação; plugin complementar de save para validade/terminal | Média; existência de arquivo não prova integridade; título atual está vazio |
| F03 — Texto completo por trecho, sem typewriter; P+G | MessageCore `TextSpeed:struct/Default:num = 11`, opção de velocidade removida ou limitada; Show Text separado por passagem | 95% | Configuração + eventos; delimitar páginas (`<Next Page>` quando aplicável) | Baixa/média; extensão automática de mensagens pode fundir trechos; texto longo precisa paginação editorial |
| F04 — Avançar por clique na caixa, botão e Enter, sem ativar a escolha recém-aberta; P+G | `Window_Message` e `Show Text`, depois `Show Choices`; Input/TouchInput nativos para um botão explícito | 65% | Extensão pequena de leitura/input se mantida a área exata do clique e trava de repetição | Média; MZ aceita também cancel e toque repetido; texto instantâneo seguido de choice pode abrir escolha imediatamente |
| F05 — Pular apenas trechos consecutivos já lidos nesta campanha; P+G | Eventos consultam IDs de leitura + Show Text; MessageCore apresenta; ExtMessageFunc tem apenas controle de permitir FAST | 50% | Common events com switches por passagem, ou plugin complementar de leitura com conjunto de IDs | Média; FAST não é skip-seen, acelera eventos e animações; não usar log limitado ou `<Global>` como memória |
| F06 — Speaker, nome e retrato estático; P+G | Show Text com speaker nativo + VNPictureBusts `Basic_EnterBust` ou Show Picture → fala → Erase Picture | 95% | Configuração + common event de apresentação | Baixa; face de 144 px e busto são recursos diferentes; manter arte estática |
| F07 — 16 artes de encontro, três destinos, quatro cenários; P+G, arte Baseline | Show Picture/Erase Picture, Core `SystemLoadImages`; evento seleciona arquivo do catálogo e apresenta cena | 95% | Configuração, assets finais e eventos | Média pelo volume de arte; não confundir preload com manifesto de exportação |
| F08 — Pérola na pedra, Floraí nas raízes, Andirá apenas no reflexo; P+G | Camadas de pictures: cenário → retrato → máscara/overlay local; VNPictureBusts para escala/posição; AttachedPictures se útil | 85% | Configuração + Technical Art; recorte preparado substitui CSS 3D | Média; não mostrar amantes falando no Conselho; overlay de prisão é apresentação, não hotspot |
| F09 — Composição especial de prólogo, encontro, consequência, amantes e Conselho; P+G | Mapas como palcos, Show Picture + MessageCore `MessageWindowProperties` e offsets por tipo de cena | 80% | Common events de layout; extensão pequena somente para áreas que exigirem geometria dinâmica | Média; offsets e word wrap precisam ensaio; layout em Canvas não herda CSS |

### 3.3 Preparação, consultas e seleção

| ID — Feature e origem | Candidato, recurso e fluxo possível | Cobertura | Gap e melhor preenchimento | Complexidade e risco |
|---|---|---:|---|---|
| F10 — Oito heróis em posições fixas da taverna; P+G | Show Picture ou Busts `Move_MoveToCoordinates`; IDs estáveis por herói; morto deixa posição vazia | 95% | Configuração + common event de montagem | Baixa/média; slots 0–10 dos bustos não representam a profundidade atual |
| F11 — Hover ou foco inspeciona sem selecionar formação; P+G | PictureChoices `<Bind Picture: id>` + ChoiceCmnEvts `<Choice Common Event: id>` → atualizar prévia | 90% | Common event somente de apresentação; encadear escolhas para oito heróis e controles | Média; o CE de foco não pode consumir RNG, mudar party, marcar morte ou salvar decisões |
| F12 — Ficha acima da cabeça e fala lateral simultâneas; P+G | MessageCore `PictureTextChange` em duas pictures de fundo; ChoiceCmnEvts troca texto; `<Help>` como alternativa simplificada | 80% | Common event de posicionamento e limpeza; extensão pequena para fitting se necessário | Média; `<Auto Actor>` segue sprite de actor, não qualquer busto; texto de picture escala junto com a imagem |
| F13 — Setas escolhem o herói espacialmente mais próximo; P+G | PictureChoices oferece teclado; Core/OptionsCore oferecem input/remapeamento | 55% | Extensão pequena da navegação da escolha ativa, se preservada a geometria atual | Média; ordem da choice e navegação em grade não equivalem à proximidade espacial |
| F14 — Alternar integrantes com clique/Enter/Espaço; exatamente três com 4+ vivos; P+G | Loop de Show Choices com PictureChoices: confirmar herói → CE alterna switch/ID → redesenha → reabre lista | 85% | Common event com contagem e validação; persistir índice de foco na reabertura | Média; Show Choices é seleção única, a composição a transforma em editor de formação |
| F15 — Todos entram automaticamente quando restam 1–3; P+G | Conditional Branch sobre vivos → preenche formação → consulta continua → destino → Partir | 95% | Common event | Baixa; não bloquear hover/consulta só porque a formação deixou de ser editável |
| F16 — Destaque persistente dos escolhidos, separado do foco; P+G | Escala nativa/Busts `Scale_ScaleTo` + marcador/contorno local; PictureChoices controla apenas foco | 80% | Configuração + CE que deriva visual do estado de participação | Média; On Deselect não pode apagar destaque de integrante; efeitos de escala concorrentes podem se sobrepor |
| F17 — Primeiro retorno mostra desaparecimento simultâneo de mortos em 1 s; P+G | Flag de apresentação por morto → Move Picture opacity 0, sem Wait, ou `Fade_FadeOut` para vários IDs → limpeza | 90% | Common event + script call de `matchMedia`; extensão pequena se exigido um segundo por relógio em qualquer taxa de quadros | Média; 60 frames é aproximação temporal; registrar efeito consumido ao entrar/sair, sem reviver nem permitir clique |
| F18 — Painel de destinos preserva formação; rotas bloqueadas/concluídas continuam visíveis; P+G | Show Choices + MessageCore `<Disable Switch: x>`/`<Enable Switch: x>` + PictureChoices; voltar ao loop da taverna | 90% | Configuração + eventos de painel, cancelamento e restauração do foco | Média; não usar Hide para esconder o Vilarejo bloqueado; estado do painel é transitório |
| F19 — Consulta ao elenco vivo/morto sem mutação; P+G | Pictures + `PictureTextChange` ou janela nativa dedicada; entrada por choice de menu/contexto | 80% | Common event; plugin complementar de UI somente se consulta durante toda leitura exigir botão próprio | Média; menu de status padrão expõe HP/nível/equipamento e não reproduz a consulta |
| F20 — Destino e formação em qualquer ordem; Partir condicionado; P+G | Loop de preparação mantém seleções independentes; MessageCore `<Enable Switch: x>` para Partir | 95% | Common event de validade da preparação | Baixa; nenhum caminho inicial pré-selecionado se dois disponíveis; validação deve permanecer na ação |
| F21 — HUD diegético: rota, posição, progresso conhecido, peças e integrantes; P+G | Show Picture + MessageCore `PictureTextChange/Refresh`, códigos `\V[n]` e retratos estáticos | 90% | Common event de atualização após transições | Média; não usar HP/MP como representação de recursos inexistentes, não divulgar pool/competências/futuro |

### 3.4 Encontros e consequências

| ID — Feature e origem | Candidato, recurso e fluxo possível | Cobertura | Gap e melhor preenchimento | Complexidade e risco |
|---|---|---:|---|---|
| F22 — Três abordagens visíveis e sempre selecionáveis após apresentação; P+G | Show Text → separação explícita → Show Choices; MessageCore `ChoiceWindowProperties` e `<BgImg: ...>` ou PictureChoices | 95% | Configuração + evento; quebras editoriais de texto longo | Média; não condicionar Enable à viabilidade; wrap automático de Choice Window não é suportado |
| F23 — Competências privadas e resolução coletiva determinística; P+G | Conditional Branch/CE consulta competências dos IDs presentes; saída success/failure → texto causal único | 90% | Common event com matriz, ou script call curto sobre catálogo | Média; conferir party da expedição, não todos os actors ou reservas; não usar HP, skill aprendida ou testes de batalha |
| F24 — Sorteio incremental uniforme sem repetição; P+G | Variáveis/arrays nativos + CE de revelar posição; plugins cuidam somente da apresentação | 35% | Script call central de sorteio; plugin novo pequeno se mantidos seed, invariantes e catálogo externo | Média; `Control Variables: Random`, `<Shuffle>` e `MessageRandomize` não cobrem RNG persistente por posição |
| F25 — Final composto pelos três restantes de cada pool; P+G | CE calcula diferença dos pools após rotas concluídas e revela uma posição por vez | 40% | Script call compartilhado com F24 | Média; não embaralhar um sétimo encontro nem consultar formação; persistir lista já atribuída |
| F26 — Semente, estado do RNG e reprodução por ações; P+G/QA | MZ pode armazenar números/arrays; conservar Mulberry32 isolado da aleatoriedade visual | 25% | Plugin novo pequeno de campanha ou script call centralizado | Média; chamadas visuais a Math.random não podem mudar a sequência de encontros; seed só antes de iniciar |
| F27 — Recuo permitido por total de vivos e fase; P+G | Conditional Branch + choice contextual Recuar; variável de fase/pendingOutcome bloqueia a ação após abordagem | 90% | Common event; botão durante Show Text pode exigir complemento de leitura | Média; total de vivos ≥3 não significa party atual ≥3; bloqueio vale do compromisso ao fim da consequência |
| F28 — Confirmar/cancelar recuo, reiniciar posição e preservar conhecimento; P+G | Show Choices de confirmação → CE limpa tentativa/party → taverna; cancel retorna ao ponto de leitura | 90% | Common event e cursor de retorno | Média; manter atribuições de cada rota separadamente ao trocar de destino |
| F29 — Sacrifício de presente vivo, um clique mesmo com um candidato; P+G | Aviso legível → Show Choices sem cancel/default seguro → PictureChoices `<Bind Picture: id>` → ramo da vítima | 90% | Evento/CE de validação e trava de ação; integração com F42 antes da despedida | Alta no fluxo completo; ButtonPicture não funciona sobre choices ocupando `$gameMessage`; impedir clique propagado |
| F30 — Despedida fixa e morte coerente com a armadilha; P+G | CE usa heroId + encounterId → Show Text da ficha → Show Text de deathText; pictures locais existentes | 95% | Common event | Baixa; não produzir 8 × 16 variantes nem fazer efeito visual decidir a morte |
| F31 — Grupo reduzido, reservas e retorno automático; P+G | CE após consequência: zero vivos total → bad; rota concluída → conclusão; zero presentes → retorno; senão avança | 95% | Common event com precedência explícita | Média; usar Scene_Gameover por party vazia destruiria o fluxo próprio da VN |
| F32 — Última morte no encontro 6 final com reservas → Conselho solo; P+G | O mesmo CE testa conclusão da rota antes de retorno por party vazia, depois do teste de total morto | 95% | Common event | Média; preservar a ordem de precedência do protótipo; não convocar reservas ao Conselho |
| F33 — Morte elimina pessoa e suas duas capacidades permanentemente; P+G | Switch/registro `dead` é fonte; remover ID de formação; qualquer projeção recalcula competência | 90% | Common event + persistência | Média; estado nativo Death pode ser curado; não equivale à morte permanente da campanha |

### 3.5 Revelações, inventário narrativo e finais

| ID — Feature e origem | Candidato, recurso e fluxo possível | Cobertura | Gap e melhor preenchimento | Complexidade e risco |
|---|---|---:|---|---|
| F34 — Peças anã/élfica, sobreposição e desbloqueio; P+G | Switches ou Key Items não utilizáveis + CE: recompensa → marca peça → ambas? → Show Pictures sobrepostas → libera rota | 95% | Configuração + common event | Baixa; escolher uma única fonte do inventário, sem duplicação em switch+item independente |
| F35 — Amante primeiro/segundo e única linha condicional adicional; P+G | Conditional Branch por ordem concluída → textos compartilhados + linha adicional do segundo | 95% | Eventos | Baixa; não escrever campanhas inteiras para cada ordem |
| F36 — Três excertos de Irati e registro final de Palotina, sem códice; P+G, redação parcialmente Baseline | Show Text e macros de conteúdo; eventos nas três posições narrativas | 100% | Evento e revisão editorial | Baixa; MessageKeywords não autoriza investigação documental adicional |
| F37 — Formação do clímax, opiniões estáveis H1–H8 e confissão solo/coletiva; P+G | Congelar IDs presentes vivos ao concluir rota → branches/CE de fala em ordem canônica | 95% | Common event | Média; opinião não vira voto, afinidade ou condição das duas escolhas |
| F38 — Reunir/destruir com consequências conhecidas e escolha persistida; P+G | Show Choices de duas entradas → CE registra ending → F42 → Show Text/pictures do desfecho | 90% | Eventos + complemento de save | Média/alta; carregar não pode retornar à seleção para experimentar o outro final |
| F39 — Oitavo herói morto produz bad ending; P+G | CE de consequência → registro terminal `bad` → apresentação → memorial | 95% | Common event + save | Média; não usar Game Over padrão com retorno implícito a save anterior |
| F40 — Memorial omitido sem mortos; epílogos literais só de vivos presentes no clímax; P+G | CE percorre mortos, depois elegíveis H1–H8; Show Text da ficha, retratos existentes | 95% | Eventos | Baixa; epílogos não variam por final; mortos aparecem no memorial e reservas vivas não recebem epílogo |
| F41 — Campanha concluída, Jogar novamente volta aos avisos; P+G | Show Choices/Title por evento → reset explícito depois da política de substituição → avisos aguardando Jogar | 90% | Common event e SaveCore/SavePolicy | Média; Novo jogo zera vistos/atribuições/mortos; manter preferências é diferente de manter progresso |

### 3.6 Persistência, acessibilidade e recursos auxiliares

| ID — Feature e origem | Candidato, recurso e fluxo possível | Cobertura | Gap e melhor preenchimento | Complexidade e risco |
|---|---|---:|---|---|
| F42 — Campanha única, checkpoints, morte/final imediatamente duráveis; G-completo + I | SaveCore `SaveStyle:str=single`, um destino canônico de save, `AutosaveForce`/`SaveCurrentSlot`, callbacks + estado MZ | 65% | Plugin complementar de política de save sobre SaveCore/DataManager | Alta; um slot não garante commit atômico, fila de escrita, falha visível ou irreversibilidade; desligar SAVE/LOAD e bypasses fora do título |
| F43 — Continuar reinicia cena textual sem reverter decisão; G-completo | SaveCore + estado narrativo com sceneId/checkpoint; dispatcher de Common Events reconstrói apresentação | 55% | Common event + plugin complementar de retomada | Alta; `$gameMessage` não é salvo, interpreter/mapa são; evitar replay de morte, recompensa ou sorteio |
| F44 — Save corrompido/incompatível informado antes de substituição; G-completo | Callbacks de falha do SaveCore + validação do estado/versionamento próprio antes de aceitar campanha | 60% | Plugin complementar + evento de erro/novo jogo | Alta; JSON parse bem-sucedido não valida os invariantes; ausência de metadados não prova inexistência de arquivo |
| F45 — Armazenamento local por navegador; G-completo exige localStorage | SaveCore usa StorageManager e localForage; no boot observado driver `asyncStorage`/IndexedDB | 90% para persistência local; <50% para contrato literal localStorage | Configuração da infraestrutura se troca de backend aprovada; complemento só se localStorage literal permanecer obrigatório | Alta se forçada fidelidade literal; teste no iframe itch.io e falhas de quota continuam necessários |
| F46 — Message log público; L, não implementado nem confirmado | MessageLog: registrar Show Text/escolhas → atalho/menu/LOG; `BypassMessageLogging` exclui escolhas utilitárias | 95% para log textual padrão | Configuração; decisão de produto sobre incluir e limite | Baixa/média; não é galeria de bustos nem rollback; 50 entradas não cobrem necessariamente toda a história |
| F47 — Ocultar UI para contemplar arte; L | MessageVisibility + Ext HIDE + CommonEventHide/Show para HUD externo | 85% | Common events de apresentação; extensão pequena para bloquear hotspots que continuem ativos | Média; ocultar picture não prova desativação de hit test; jamais sacrificar por clique invisível |
| F48 — Menu de configurações e remapeamento; I/L; áudio G-completo | OptionsCore categorias e callbacks `ShowJS`, `EnableJS`, `DefaultJS`, `SaveJS`, `LoadJS`; volumes nativos | 90% | Configuração; opção própria somente se houver requisito | Média; menu padrão tem itens de RPG sem função; não permitir desligar save obrigatório ou habilitar skip inédito |
| F49 — Quatro ambientes, dois temas finais, até dez SFX, sem voz; G-completo | Play BGM/BGS/SE e fades nativos; OptionsCore master/volumes; Core `AudioChangeBgmVolume`/BgsVolume se necessário | 95% | Configuração, eventos e produção de áudio final | Média de conteúdo; assets RTP presentes não são seleção aprovada; iniciar áudio após gesto Jogar |
| F50 — Transições e efeitos sem ampliar escopo artístico; P+G limitado | Fadeout/Fadein/Move Picture/Tint nativos; Busts fade/scale; overlays locais | 90% | Eventos e assets; VisualCutinEffect apenas como candidato condicionado a mudança de escopo | Média; FAST altera duração; sombras/reflexo podem ser arte preparada; múltiplas expressões e animações não estão aprovadas |
| F51 — Movimento reduzido respeita preferência do sistema; P+G | Script call `window.matchMedia('(prefers-reduced-motion: reduce)')` → ramo sem fade; OptionsCore só se opção adicional aprovada | 80% | Script call + CE; extensão pequena para mudanças da preferência durante a cena | Média; não substituir automaticamente por uma opção manual que ignore a preferência do sistema |
| F52 — Teclado, foco visível, modais e restauração de foco; P+G | Window_Selectable/ChoiceList + PictureChoices, Input/OptionsCore; escopo ativo por painel | 75% | Eventos + pequena integração de foco/input | Média/alta; Canvas não oferece os elementos semânticos do DOM; Escape/Tab e clique fora precisam contrato próprio |
| F53 — Reflow fluido até 320 px e zoom 200%; G-completo | Graphics/Window rectangles fornecem tamanho; Core ajusta partes da UI; pictures podem reposicionar | 25% | Plugin novo de layout/adaptação ou camada acessível complementar, se requisito integral for mantido | Alta; escalar Canvas 816×624 ou 1280×720 não é reflow. Não chamar isso de configuração simples |
| F54 — Texto literal, informação sem depender só de imagem/cor/som; P+G | Show Text/choices com labels públicos; conteúdo e comandos de apresentação separados | 80% | Configuração + regras de autoria; extensão pequena se necessário escapar texto importado | Média; macros/escape codes MZ executam ações de autoria. Não interpolar prosa arbitrária como Script/JS |
| F55 — Falha de imagem opcional preserva jogabilidade textual; P + I | Protótipo usa `onerror` com fallback; MZ ImageManager lança LoadError | 30% | Plugin complementar pequeno de assets opcionais se paridade mantida | Média; manifesto de assets é necessário mas não substitui fallback em runtime; não engolir erros de database/código |
| F56 — QA somente leitura, invariantes e semente antes de iniciar; P+G/QA | Leitura de estado MZ + validador; Debugger serve só ao desenvolvimento separado | 35% | API pequena de inspeção e testes de domínio | Média; snapshots destacados/congelados; Debugger mutante não é uma implementação equivalente |
| F57 — HTML5 no itch.io e execução offline local; P+G | Deployment web MZ + assets locais; HTTP estático local ou playtest NW.js para equipe | 85% hospedado; 0% para file:// direto do contrato atual | Configuração após decisão/spec sobre execução local; evitar customizar loader só para manter file:// | Alta como decisão de plataforma; MZ inclui Pixi/pako/localForage/Effekseer e leitura de arquivos por XHR |
| F58 — Créditos e atribuições de assets/plugins; I e G para conteúdo não original | Show Scrolling Text ou Show Text/evento de créditos; botão de saída nativo se aprovado | 95% | Evento e conteúdo de créditos | Baixa; plugin Jhonny ausente não é bloqueio; não requer compra de plugin |
| F59 — Macros de autoria reutilizáveis; I | MessageCore `[MacroName]`, Text Code Replacements e Common Events; IDs estáveis mapeiam conteúdo | 90% | Configuração + CEs; complemento só para parâmetros tipados/validação recorrente | Média; não transformar prosa, log e prévia em caminhos de mutação de campanha |
| F60 — Sem battle, HP, XP, consumíveis, quests ou investigação por hotspots; P+G, exclusões | Configuração nativa remove encontros aleatórios, menus e controles sem função; eventos dirigem narrativa | 100% da ausência pretendida | Configuração | Baixa; não adotar battle/skill systems para resolver um predicado booleano |

Os matches mais fortes são mensagens e texto em pictures; escolhas visuais com prévia; bustos controlados como pictures; narrativa e consequências por Common Events; áudio nativo; e SaveCore como infraestrutura de slot/feedback. Os menores matches são sorteio com identidade persistente, política de leitura vista, recuperação transacional e reflow integral.

## 4. Composições promissoras e oportunidades de simplificação

### 4.1 Taverna como menu de escolhas sobre pictures

**Candidatos:** PictureChoices + ChoiceCmnEvts + MessageCore + eventos; VNPictureBusts apenas para simplificar transformações.

Fluxo exploratório:

1. Evento monta cenário e pictures dos vivos nas posições fixas; atribui IDs estáveis por herói.
2. Show Choices estendido pelo MessageCore contém as entradas dos heróis e os controles da preparação. As listas podem ser encadeadas no mesmo nível de indentação para ultrapassar as seis opções do editor nativo.
3. Cada entrada do herói usa `<Bind Picture: id>` e `<Choice Common Event: id>`. A lista pode ficar invisível com `<Hide Choice Window>`.
4. Foco/hover executa um CE que limpa a prévia anterior e escreve a ficha e a fala em pictures próprias. **Não usar Show Text nesse CE:** a lista já mantém `$gameMessage` ocupado; a prévia deve usar pictures ou janela auxiliar sem disputar a mensagem.
5. Confirmar a entrada chama o CE de alternar participação. O CE valida vivo/fase/limite, atualiza estado e destaca integrantes. Depois o loop reabre a lista com foco preservado.
6. Escolher destino ou consultar elenco entra num subpainel, desativa os alvos da taverna e retorna ao contexto anterior. Partir só encerra o loop com formação e rota válidas.

O On Select do PictureChoices representa **foco**, não pertencimento à expedição. A escala ou marca dourada dos integrantes deve vir de estado separado. `AutoClear:eval=true` limpa as configurações de seleção quando OK/Cancel é processado; portanto, a reabertura precisa configurar novamente os vínculos e estados visuais. Desabilitar AutoClear exigiria limpeza explícita ao sair e não elimina esse dever de atualização.

Limites para um ensaio posterior: continuidade do foco ao alternar seleção, diferenças entre mouse e setas, várias prévias rápidas concorrentes, limite/recorte das fichas, alvos cobertos pelo painel e distinção de destaque persistente. Se a navegação espacial exata permanecer obrigatória, um complemento pequeno pode modificar apenas o movimento do cursor na lista da taverna, preservando o binding e a confirmação do PictureChoices.

Não há motivo inicial para substituir esse conjunto por uma Scene inteiramente customizada. Também não seria razoável prometer paridade integral da taverna apenas configurando PictureChoices.

### 4.2 Abordagens sem um sistema próprio de cards

**Primeira alternativa:** MessageCore sozinho com Show Choices, `ChoiceWindowProperties`, `<BgImg: filename>` e texto sobre o fundo; pode atender três opções com identidade visual e foco nativo.

**Segunda alternativa:** pictures independentes + PictureChoices quando for preciso posicionar os cards fora de uma lista regular.

As opções longas em PT-BR exigem cuidado: o help local exclui word wrap da Choice Window. Quebras `<br>` e altura de linha/itens são alternativas documentadas; a versão local menciona suporte a `<br>` em escolhas no changelog. Isso requer validar as 48 abordagens, não somente uma frase curta. Configurar word wrap de Show Text não resolve este problema.

Não aplicar `<Enable Switch>` por competência, nem usar ChoiceCmnEvts para heróis reagirem com medo/confiança conforme viabilidade. Essas reações dariam uma pista mecânica adicional, e não existe conteúdo aprovado para variantes por herói/abordagem. O evento de foco pode destacar visualmente a escolha, sem classificar a resposta.

### 4.3 Fichas, balões e HUD sem disparar diálogos

MessageCore `PictureTextChange` permite texto em nove âncoras de uma picture. Uma base de pergaminho e outra de balão podem receber bio e apresentação, respectivamente. A atualização ocorre ao trocar herói ou estado, usando `PictureTextRefresh` quando uma variável interpolada mudar. Isso evita rasterizar manualmente cada versão textual como asset e evita uma fila de Show Text para hover.

TextPicture é uma alternativa local para texto independente: `set` seguido de Show Picture sem filename. Sua utilidade é menor quando MessageCore já cobre texto sobre fundo; ligar os dois sem necessidade amplia os hooks em `Sprite_Picture.updateBitmap`.

AttachedPictures é útil para marcadores, labels e overlays que devam acompanhar um pai. Entretanto, filhos herdam escala, opacidade e tom. A ficha e a fala que precisam permanecer legíveis não devem encolher junto do retrato para caber na taverna. Pode ser mais simples calcular suas posições no CE do que criar uma cadeia de attachments — que o próprio plugin não suporta arbitrariamente.

GabWindow cabe para confirmação secundária, por exemplo informar um destino escolhido. É fila temporizada separada do interpreter, com `ClearGab` e `WaitForGab`; não satisfaz sozinho a fala que fica ao lado do herói enquanto ele está em foco, nem deve conter o único aviso de irreversibilidade.

### 4.4 Diálogo e arte com pictures comuns

Show Picture → posicionamento → Show Text → troca de speaker/arte → próxima passagem é suficiente para a maior parte da VN. VNPictureBusts reduz a repetição de parâmetros de escala, origem, fade e tom, mantendo as pictures no sistema nativo.

Os IDs das pictures formam uma ordem de camadas; precisam de faixas por responsabilidade na futura spec, não de um gerenciador gráfico novo desde o início. Reservar cenário, retratos, composição de prisão/reflexo, HUD, fichas e modal evita colisões. **61–70 já têm significado na configuração atual de AttachedPictures.** Ao encerrar uma tela, preferir limpar a faixa pertencente a ela a executar `PictureEraseAll` indiscriminadamente.

Finais podem recombinar Conselho, retratos e overlays existentes. Recortar a representação de Andirá em uma imagem pronta do reflexo pode preservar a experiência sem reproduzir `perspective()/rotateX()` do CSS. A aparência precisa de validação de Technical Art, mas não implica plugin de água/reflexos ou física.

### 4.5 Inspeção visual com HIDE, se aprovada

MessageVisibility já integra HIDE ao ExtMessageFunc e pode chamar Common Events ao ocultar/restaurar a mensagem. Esses eventos podem ocultar/restaurar HUD e quadros auxiliares. Pictures anexadas à mensagem acompanham seu fechamento/visibilidade; retratos que precisem permanecer para contemplação devem ficar no palco.

O teste decisivo seria: ocultar quando as abordagens estão abertas → mover mouse/teclado → restaurar → verificar que nenhuma decisão mudou. O código de MessageVisibility intervém em processamento de cursor/toque de janelas, mas isso **não comprova que todo binding de picture, botão externo ou complemento também está bloqueado**. Esse é o gap de integração, não motivo para afirmar que o plugin não tem utilidade.

HIDE não deve ser adotado como mecanismo para revelar uma pista obrigatória escondida atrás da interface. Isso mudaria o contrato editorial de que texto comunica toda informação necessária.

### 4.6 SaveCore + título + eventos narrativos

SaveCore suporta Single Save, e o changelog de EventTitleScene registra integração com esse estilo. Essa composição é mais próxima do produto que a configuração atual de 20 slots.

Ainda assim, estes problemas são distintos:

| Problema | Base disponível | Responsabilidade que permanece |
|---|---|---|
| Quantos slots aparecem | SaveCore Single | Determinar um único destino físico de campanha e eliminar caminhos paralelos de save/autosave |
| Quando salvar | Comandos Request/Execute/Force e SaveCurrentSlot | Checkpoints semânticos, ordem e consistência das escritas |
| Como continuar | EventTitleScene LoadScreen + SaveCore | Validar campanha, reconhecer terminal, reconstruir cena sem repetir mutações |
| Erro de gravação/leitura | Callbacks e popups | UX de erro, impedir mensagem enganosa de sucesso e impedir perda silenciosa de permanência |
| Dados que entram no arquivo | DataManager + objetos nativos | Versão do domínio, RNG, vistos, consequência e identidade da campanha |

Os três estágios de autosave não são sinônimos: Request respeita as habilitações; Execute ignora a habilitação local do comando, mas respeita a opção do jogador; Force ignora essas restrições locais/opção, ainda exigindo autosave habilitado no database. Configurar isso corretamente reduz código, mas não acrescenta espera transacional nem recuperação de cena por si só.

O checkpoint de morte deve conter a vítima já removida, a consequência identificada e uma posição segura de retomada antes de permitir progressão. O checkpoint final deve registrar o desfecho escolhido como terminal antes de apresentá-lo. A próxima cena só pode considerar o estado durável após confirmação da escrita. Se falhar, informar e oferecer repetir a gravação; não restaurar sorrateiramente o herói nem afirmar que a morte foi salva.

Há um ponto implícito não enumerado na lista de checkpoints do GDD: **primeira revelação de posição**. Se fechar/recarregar antes de resolver a abordagem voltar a uma campanha anterior à revelação, o jogo pode perder conhecimento e a ordem de RNG. O planejamento deve explicitar a persistência dessa revelação e do compromisso da abordagem, coerente com a proibição de rerrolar/reverter decisões. Não é uma pergunta sobre permitir save scumming; o GDD já exclui reversão. A entrevista precisa resolver a UX de falha de gravação e o significado exato de reiniciar a cena.

Não usar `<Global>` em morte, RNG, vistos ou finais: os globais do SaveCore atravessam saves **e novos jogos**. Isso transformaria a permanência de uma campanha em metaprogressão não aprovada.

### 4.7 Simplificações idiomáticas para MZ

| Implementação/necessidade atual | Forma natural candidata no MZ |
|---|---|
| Listeners para navegar entre cenas | Um evento controlador com loops/branches e Common Events por cena/tipo |
| Campos públicos de cada herói | Actor profile/metadados ou catálogo central, projetados em fichas; não copiar ficha privada inteira |
| Mais de seis escolhas de taverna | Listas adjacentes encadeadas pelo MessageCore; não instalar outro plugin só por esse limite do editor |
| Inventário narrativo | Flags ou Key Items sem uso; um CE de recompensa idempotente, sem menu de inventário |
| Resultado por competência | Predicado sobre presentes e branch success/failure; nenhum sistema de battle/skills necessário |
| 16 encontros e 48 resultados | Template de encontro que recebe identidade e textos; cenas finais fixas compostas por CEs |
| Memorial e epílogos | Percurso de lista de mortos/elegíveis com conteúdo fixo, sem gerador de finais |
| Decorações de CSS | Windowskin/pictures locais; priorizar arte preparada a uma engine de efeitos |
| Mensagens de erro de ação | Texto de feedback/CE; Gab apenas se a informação obrigatória também ficar visível |
| Longo JavaScript repetido em eventos | Comando de complemento pequeno com responsabilidade validada, não biblioteca genérica de comandos arbitrários |

### 4.8 Abstrações reutilizáveis a considerar

Estes nomes descrevem responsabilidades, não IDs já reservados no banco:

| Abstração | Entrada conceitual | Resultado e limite |
|---|---|---|
| Apresentar cena | sceneId, speakerId, passageId | Cenário/retrato/mensagem; não decide consequência |
| Consultar herói | heroId e contexto da tela | Ficha e fala públicas; não altera formação |
| Alternar integrante | heroId | Valida fase/vivo/capacidade antes de mudar rascunho |
| Atualizar preparação | Estado atual | Deriva destaque, contagem e Partir habilitado |
| Revelar posição | routeId, position | Recupera atribuição existente ou sorteia uma vez; preserva RNG |
| Resolver abordagem | encounterId, approachId | Registra resultado usando somente vivos presentes |
| Aplicar sacrifício | victimId e consequência pendente | Registra morte uma vez e fornece cena de despedida |
| Concluir consequência | Rota/posição e formação | Bad ending, conclusão, retorno obrigatório ou próximo encontro, nessa precedência |
| Retornar à taverna | Motivo do retorno | Limpa tentativa, preserva conhecimento e consome apresentação de ausências |
| Entregar descoberta | routeId | Marca uma peça e encadeia aviso de Irati ou mapa sobreposto |
| Preparar Conselho | Presentes após encontro 6 | Fixa elegibilidade, confissão e opiniões em ordem |
| Encerrar campanha | endingId | Memorial/epílogos fixos e tela concluída |
| Gravar checkpoint | Fase semântica e revisão | Solicita persistência, aguarda êxito e trata falha |

Common Events não têm parâmetros formais como funções JS. Com poucas chamadas, variáveis nomeadas de entrada/resultado são suficientes. Quando prévias concorrentes, arrays e validação repetida tornarem essas convenções frágeis, um complemento com Plugin Commands declarados passa a ser mais simples de manter. O CE de hover não deve compartilhar variáveis temporárias de uma transação de morte/save.

## 5. Gaps e fronteiras possíveis para código novo

### 5.1 Modelo de estado: duas alternativas ainda abertas

**Alternativa orientada a eventos:** actors para identidade, switches para mortos/selecionados/concluídos, variáveis para rota/posição/RNG, arrays em variáveis para atribuições/vistos e CEs como único caminho de mutação. É viável para o catálogo fixo e mantém a equipe no editor. O risco cresce com invariantes espalhados por branches e dados duplicados.

**Alternativa híbrida:** os eventos continuam dirigindo apresentação e cenas; um pequeno domínio de campanha guarda estado serializável em `$gameSystem` e fornece comandos validados. Os plugins VisuStella continuam renderizando texto, pictures, menus e escolhas. O código puro do protótipo pode fornecer algoritmo/validações, sem manter o DOM e sem exigir que o MZ replique cada objeto do dispatcher.

Não escolher ambas como fontes independentes. A party nativa pode ser uma projeção da expedição, mas não deve se tornar um segundo catálogo de sobreviventes. Reservas, presença e morte precisam ser distinguíveis. Ivaí pode ser entidade narrativa sem entrar na party; se virar actor por conveniência visual, isso não o torna competência, vaga ou vítima.

Se forem usados notetags de domínio, serão convenções novas do projeto, lidas por código próprio com o parser de metadados nativo. Nenhum plugin instalado documenta uma tag pronta de competências ocultas desta campanha. O mapeamento H1–H8 ↔ actorId deve ser explícito e estável, sem depender da posição atual na party.

### 5.2 Complementos candidatos, não módulos aprovados

**Todos os nomes de plugins, APIs e comandos desta subseção são sugestões inéditas. Não existem no projeto nem foram implementados.** A lista é um mapa de fronteiras, não a recomendação de criar todos os arquivos. Primeiro testar a composição por configuração/eventos; criar somente a fronteira que continuar necessária.

#### C1 — `Dryland_CampaignRules`

- **Responsabilidade:** RNG local de campanha, atribuições, matriz de competências, elegibilidade e transições que dependem de invariantes. Não desenha UI nem controla o texto letra a letra.
- **Por que pode ser necessário:** não há cobertura específica nos plugins; eventos puros resolvem branches, mas seed/arrays/validações compartilhadas podem justificar centralização. Avaliar primeiro CE + script call único.
- **Integração:** comandos chamados por eventos nativos; resultado entregue a MessageCore/PictureChoices; estado serializável capturado por DataManager/SaveCore.
- **API mínima sugerida:** `revealPosition(routeId, position)`, `resolveApproach(approachId)`, `sacrifice(heroId)`, `completeEncounter()`, `snapshot()` e `validate()` somente leitura.
- **Plugin Commands possíveis:** `RevealPosition`, `ResolveApproach`, `SacrificeHero`, `CompleteEncounter`; parâmetros são IDs conhecidos, não JS livre.
- **Estado:** schemaVersion, campaignId, seed/rngState, atribuições, mortos, party/draft, progresso, flags/recompensas, pendingOutcome, clímax e ending. Vistos podem ficar com C3, mas apenas um dono por campo.
- **Acoplamento:** baixo a VisuStella; médio ao catálogo e IDs MZ. Não migrar todo `app.js`; reaproveitar testes matemáticos/determinísticos como contrato.

#### C2 — `Dryland_SavePolicy`

- **Responsabilidade:** gravação seriada da campanha única, checkpoints semânticos, retomada, validade/versão e campanha terminal.
- **Por que os existentes não bastam:** SaveCore entrega slots, chamadas e feedback; não conhece morte, passagem, RNG ou o que significa uma campanha concluída. Eventos com switches de espera e callbacks são primeira alternativa, mas tendem a repetir política crítica.
- **Integração:** SaveCore via comandos documentados/callbacks; `DataManager.saveGame/loadGame/makeSaveContents/extractSaveContents` e fluxo de `Scene_Load` nativos como pontos de adaptação cuidadosamente delimitados; EventTitleScene para entrada.
- **API mínima sugerida:** `commitCheckpoint(reason)` assíncrona, `inspectCampaign()`, `continueCampaign()`, `confirmReplaceCampaign()`.
- **Plugin Commands possíveis:** `CommitCheckpoint`, `ContinueCampaign`, `ReplaceCampaign`; comando de commit precisa integrar uma espera do interpreter, não apenas disparar Promise e seguir.
- **Estado:** checkpointId, domainVersion, revision, cena reiniciável, pendingOutcome, ending e status terminal. Estado de escrita em andamento é transitório; não deve virar prova de gravação no próprio save.
- **Acoplamento:** médio/alto ao ciclo de SaveCore e MZ. Preferir callbacks oficiais; não editar código ofuscado. Um contador de revisão ajuda consistência, mas não elimina sozinho disputa entre duas abas; decidir tratamento antes da versão pública.

#### C3 — `Dryland_ReadingPolicy`

- **Responsabilidade:** identidade e conclusão de passagens, skip apenas de vistas, parada em escolha/inédito e proteção contra entrada repetida/propagada.
- **Por que os existentes não bastam:** MessageCore desenha, Ext acelera, MessageLog registra buffer; nenhum contrato examinado implementa `seenPassageIds` por campanha e skip de sequência com fronteira semântica. Alternativa inicial: CE com switches/IDs e Show Text condicional.
- **Integração:** MessageCore para apresentação, Window_Message/Input/TouchInput nativos para confirmação; SavePolicy para capturar conjunto visto. Ext é opcional, não pré-requisito.
- **API mínima sugerida:** `beginPassage(id)`, `completePassage(id)`, `canSkip(id)`, `skipSeenSequence()`.
- **Plugin Commands possíveis:** `BeginPassage`, `FinishPassage`, `SkipSeen`; pode-se reduzir a um comando de apresentação identificado se o modelo de autoria permitir.
- **Estado:** conjunto de IDs vistos da campanha, passagem/cena atual; trava de input transitória. Nunca extrair vistos do conteúdo textual, posição numérica de evento, limite do log ou variáveis `<Global>`.
- **Acoplamento:** médio a MessageCore e alto se vários plugins alterarem `isTriggered`. Ensaio com LOG/HIDE/configurações será necessário se esses recursos forem aprovados. Não marcar visto ao medir texto ou converter uma macro para desenhar o log.

#### C4 — `Dryland_TavernInput` — condicional à fidelidade espacial

- **Responsabilidade:** política do foco espacial, restauração entre painéis e seleção persistente na taverna.
- **Alternativa anterior:** PictureChoices + ChoiceCmnEvts + CEs sem extensão, aceitando navegação pela ordem da lista. A entrevista define se essa adaptação é aceitável.
- **Integração:** a lista ativa de choices continua dona de hover/binding/OK; extensão limitada a navegação/restauração, sem substituir seleção de vítimas ou lógica de campanha.
- **API/comandos sugeridos:** `OpenTavernContext`, `SuspendTavernContext`, `RestoreTavernFocus`; tabela heroId/pictureId/posição e índice de choice.
- **Estado:** foco e painel transitórios; participação consultada do domínio, não armazenada pela UI como segunda verdade.
- **Acoplamento:** médio/alto a Window_ChoiceList/PictureChoices. Não chamar aliases internos ofuscados como se fossem API pública.

#### C5 — `Dryland_PresentationAccess` — somente se mantidas as paridades correspondentes

- **Responsabilidade possível:** adaptação de layout/semântica de apresentação e leitura de preferência de movimento. Se reflow integral e acessibilidade equivalente ao DOM forem exigidos, esta fronteira é trabalho relevante, não um pequeno ajuste presumido.
- **Alternativa anterior:** tamanho desktop aprovado, janelas/pictures nativas, foco do MZ e script calls de movimento reduzido. Isso cobre um recorte menor, que precisa aprovação explícita.
- **Integração:** Graphics, Window_Base/Selectable e pictures; OptionsCore se houver opções; entrada passa sempre pelos comandos validados da campanha.
- **API/comandos sugeridos:** `ApplyLayoutContext`, `SetPresentationContext`; política de largura, tamanho de texto, foco e preferência de movimento.
- **Estado:** transitório de viewport/foco; preferências no ConfigManager quando aplicável; nenhum estado de morte/recompensa próprio.
- **Acoplamento:** alto se uma ponte DOM coexistir com Canvas. Não recomendar essa ponte antes de resolver o requisito de reflow; não prometer que anotar `aria-label` no Canvas expõe seus controles internos.

#### C6 — Fallback de ilustração opcional — extensão pequena condicional

- **Responsabilidade:** permitir que uma picture opcional ausente falhe para apresentação textual legível, como ocorre hoje no HTML.
- **Alternativa anterior:** manifesto e validação de exportação reduzem a ocorrência, mas não reproduzem a tolerância em runtime. Se a política do produto aceitar tela de Retry do MZ, não há razão para implementar o fallback.
- **Integração:** camada de carregamento de pictures do projeto sobre ImageManager; não alterar tratamento de database, fonte essencial ou scripts.
- **API/comando sugerido:** `ShowOptionalIllustration(assetId, fallbackLabel)`.
- **Estado:** falha de apresentação transitória e diagnóstico; sem mutação da campanha.
- **Acoplamento:** médio com cache/loader; demanda preservar caminho de Retry e liberar bitmaps substituídos. Evitar monkey patch global que transforme todo LoadError em sucesso.

### 5.3 Problemas que não justificam plugin novo neste momento

- Áudio ambiental e volume: engine nativa, complementada pelo OptionsCore.
- Fade simples, sobreposição de mapa, composição de finais e bustos estáticos: pictures/eventos/plugins existentes.
- Seleção de três abordagens e uma vítima: escolhas nativas e PictureChoices.
- Inventário narrativo de poucos objetos: flags/Key Items, sem inventário customizado.
- Créditos: eventos; ausência de Jhonny_CreditsSkip não cria necessidade técnica.
- Novas expressões, animation systems, voz e localização: fora do escopo vigente, não gaps da migração.

## 6. Riscos, limites e evidência necessária antes da arquitetura final

### 6.1 Contratos de plataforma em conflito

O boot MZ observado foi **1.10.0**, `Scene_EventedTitleMap`, mapa 1 sem eventos e resolução 816×624. Por HTTP, a biblioteca de armazenamento reportou `asyncStorage`, correspondente ao driver IndexedDB do localForage. Por `file://`, o runtime exibiu: **“Your browser does not allow to read local files.”** O erro deriva do fluxo de teste/leitura XHR em `main.js`, não da ausência de uma feature narrativa.

O [manual oficial de exportação MZ](https://rpgmakerofficial.com/product/MZ_help-en/01_11_03.html) descreve a publicação web em servidor e alerta que assets referenciados por plugins podem ser excluídos pelo empacotamento. Assim, usar HTTP local para QA e web deployment para itch.io é um caminho natural, mas substitui o contrato atual de abertura direta. O pacote MZ também usa bibliotecas locais de terceiros que o GDD atual exclui do protótipo; a mudança precisa ser registrada, sem inserir essas dependências no HTML existente durante a análise.

Reflow até 320 px não equivale a suporte a celular: o GDD já esclarece isso. A decisão relevante é manter essa acessibilidade no MZ ou aprovar um recorte desktop. Trocar resolução lógica ou usar Stretch não reordena cards e texto nem preserva automaticamente legibilidade ao dar zoom.

### 6.2 Ordem, hooks e manutenção

| Superfície compartilhada | Risco concreto | Como investigar depois da entrevista |
|---|---|---|
| `Window_Message.isTriggered` | FAST, AUTO, LOG, HIDE, roda e input disputam confirmação/abertura de menu | Cena curta com texto inédito/visto, Enter pressionado e alternância de painéis |
| `Window_Selectable.select` e `Window_ChoiceList` | Prévia e efeitos de pictures podem executar a cada mudança/reabertura | Inspecionar rapidamente e selecionar/desselecionar três pessoas; nenhum efeito de domínio em hover |
| `Sprite_Clickable.onClick`, `Sprite_Picture` | ButtonPicture e PictureChoices usam caminhos diferentes; camadas anexadas mudam coordenadas e hit targets | Testar o conjunto escolhido em mouse e teclado sem ligar plugins redundantes |
| `Game_Picture` escala/movimento + AttachedPictures | Foco, participação e desaparecimento podem escrever sobre a mesma transformação | Ensaiar selecionado+focado, sair com fade ativo e painel por cima |
| SaveCore + Scene_Load + interpreter | Mensagem não serializada, branches já executados e callbacks assíncronos | Fechar/reabrir em revelação, abordagem, despedida, recompensa e escolha final |
| Core/OptionsCore/AltMenu/AltSave | Overrides diretos de layout e callbacks | Manter Alt* fora da composição inicial; só incluí-los se houver necessidade que os cores não atendam |
| MZ 1.10 + versões locais VisuStella | Boot satisfatório não comprova APIs de todas as cenas e mudanças de input | Validar composição mínima no runtime efetivo; atualizar plugins não faz parte desta análise |

A função de conveniência de MZ 1.10 `isMessageSkipEnabled()` consulta `optMessageSkip`, e `cancelWait()` reduz espera. Não é rastreamento de texto visto e não resolve F05. A escolha de modo de leitura precisa considerar também essas opções nativas.

A maior exposição de manutenção viria de editar plugins ofuscados, depender de suas propriedades privadas ou fazer uma Scene própria que deixe de passar por Show Text/ChoiceList. Os recursos de LOG, HIDE e prévia por Common Event foram documentados para o mapa; uma Scene nova não herda todas essas integrações só por conter janelas visualmente semelhantes.

### 6.3 Autoria, conteúdo e desempenho

- Oito fichas, 16 encontros e 48 abordagens são um catálogo finito. Manter texto fixo compartilhado evita multiplicação combinatória. A ausência de conteúdo final revisado é um gap editorial, não justificativa para gerar variantes na engine.
- A ficha de autoria contém competências privadas. Separar texto público da matriz; macros de actor/skill/help podem vazar campos internos se usados sem curadoria.
- `PictureTextChange` acompanha escala da picture. Reduzir retratos para acomodar a fala deve preservar tamanho do texto em outra superfície.
- Pré-carregar o cenário atual e próximo recurso necessário evita pausas; carregar todas as imagens grandes de uma vez pode desperdiçar memória de textura. Os 35 assets narrativos não devem ser confundidos com os 120 arquivos já presentes em `img/pictures` no projeto MZ.
- Usar atualização por mudança de estado, não CE paralelo por herói reescrevendo texto a cada frame. Erase/clear ao trocar de contexto evita pictures, Gabs e hit targets residuais.
- O deploy precisa incluir assets de IDs calculados/strings, inclusive imagens em plugins, fontes e áudio selecionado. “Exclude Unused Files” não prova que uma imagem acessada por script está no pacote.
- A investigação preservou plugins e assets instalados. O relatório não republica seus corpos de implementação; créditos e condições de uso acompanham os arquivos/fontes dos fornecedores. Não foi realizada auditoria de licenças ou de titularidade dos assets.
- Edney é o principal autor de programação/eventos; Pati responde pela adaptação de UI; Lucas pela arte final; João e Maria por narrativa/testes manuais. A estrutura de autoria precisa reduzir dependência de scripts para escrever uma cena comum, sem transferir disciplinas ou definir cards/prazos neste documento.

### 6.4 Ensaios que podem decidir entre composição e complemento

Esta lista é evidência futura necessária, não task graph nem cronograma de implementação:

1. Taverna com oito pictures, formação múltipla, foco/hover separados, ficha e balão simultâneos, modal e retorno com foco.
2. Encontro com as três maiores abordagens do catálogo, texto instantâneo e uma ativação de avanço que nunca confirma uma escolha nova.
3. Sacrifício com três, dois e um candidato; repetição de clique/Enter; presença do aviso e ausência de cancelamento/desfazer.
4. Save único em cada fase crítica, incluindo falha de escrita; repetir load sem duplicar morte, sorteio, recompensa ou opinião.
5. Recuo, troca de rota e revisita à mesma posição com a mesma atribuição; RNG visual não muda a sequência da campanha.
6. Última morte no sexto encontro: com reservas, Conselho solo; com oito mortos, bad ending. Continuar em ambos não retorna ao encontro.
7. HIDE/LOG/configurações se aprovados: pausar entrada de fundo, restaurar foco e não adicionar escolha utilitária ao log narrativo.
8. Viewport e zoom aprovados para MZ; movimento reduzido; imagens ausentes; exportação no iframe itch.io com paths, áudio e persistência locais.

## 7. Dúvidas de produto que realmente afetam a arquitetura

As perguntas abaixo estão preparadas para a entrevista. Não constituem decisões aceitas nem precisam ser respondidas todas de uma vez. O GDD já decide elenco, três abordagens, letalidade, finais, idioma e ausência de combate; esses pontos não precisam ser reabertos para escolher plugins.

| Prioridade | Decisão a resolver | Por que não pode ser inferida | Recomendação preliminar para a entrevista |
|---|---|---|---|
| Q1 | Qual recorte de experiência torna a primeira versão MZ aceitável: adaptação desktop com regras preservadas, ou paridade integral de apresentação/reflow? | O GDD completo e a baseline desktop têm fronteiras diferentes; a migração está fora do escopo do GDD vigente | Preservar regras, conteúdo público e a experiência da taverna; aceitar linguagem visual nativa adaptada e negociar explicitamente um recorte desktop para o primeiro incremento |
| Q2 | Aprovar HTTP local/playtest MZ para a equipe e bibliotecas locais do runtime no lugar do contrato `file://` sem terceiros? | O pedido é de pré-análise, não aprova automaticamente todas as exceções de plataforma | Aceitar o modo idiomático MZ, manter HTML atual como referência offline; continuar sem serviços remotos durante a partida |
| Q3 | O storage precisa ser literalmente localStorage ou o requisito é uma campanha local por navegador? | GDD nomeia uma tecnologia; o MZ observado usa IndexedDB/localForage | Aceitar o backend nativo local do MZ e preservar o comportamento de campanha única |
| Q4 | Save e áudio entram no primeiro incremento MZ ou em incrementos posteriores? | São requisitos completos, mas foram excluídos da baseline HTML atual | Fechar a política de save antes de congelar modelo de dados; incluir a persistência na primeira fatia que validar consequências, com áudio conforme recorte de entrega |
| Q5 | Que adaptações da taverna são aceitáveis: ordem de setas versus proximidade, fitting da ficha, UI em windows/pictures? | GDD descreve a UX atual, mas não concede flexibilidade de paridade à migração | Manter hover/foco sem seleção, participação distinta, posições/mortes e modal; aceitar navegação por lista somente se o usuário aprovar a perda espacial |
| Q6 | Adotar log e HIDE? AUTO faz parte do produto pretendido? | A lista inicial chama-os essenciais, mas os arquivos de design e runtime não confirmam | LOG textual e HIDE são candidatos úteis; manter AUTO/FAST genérico fora até definir comportamento e ensaiar fronteiras |
| Q7 | Qual unidade de cena reinicia no Continue e qual experiência ocorre se gravar falhar? | “Cena” pode ser um diálogo, encontro, bloco de recompensa ou todo Conselho; GDD não define a UX da falha de escrita | Reiniciar um bloco textual identificado, preservando a decisão já concluída; falha mantém estado pendente e oferece repetir save antes de prosseguir |
| Q8 | Onde a equipe deve escrever e revisar novas cenas: eventos MZ ou catálogo textual versionado? | O conteúdo atual é JS; a equipe final usará editor e narrativa colaborativa | Eventos para encenação e conteúdo central com IDs estáveis; escolher um dono de texto para evitar edição duplicada |
| Q9 | Manter fallback textual quando uma ilustração falha, ou aceitar a tela nativa de Retry? | É comportamento observável do protótipo que os plugins não reproduzem diretamente | Preservar fallback de arte opcional se tolerância offline faz parte da paridade; nunca mascarar falha de dados/código |
| Q10 | O histórico guarda toda a campanha ou apenas as últimas entradas, se LOG for incluído? | O atual plugin corta em 50; pistas antigas podem deixar de estar acessíveis | Não usar buffer curto por acidente; definir histórico de campanha conforme função desejada, separado dos IDs vistos |
| Q11 | Como lidar com duas abas da mesma campanha? | Não está especificado; duas instâncias podem sobrescrever estados locais mesmo com um slot | Uma instância escritora por campanha; outra aba informa conflito em vez de sobrescrever silenciosamente |

Q1–Q3 podem mudar drasticamente a necessidade de código de apresentação/infraestrutura; devem preceder o refinamento de APIs. Q7 e Q8 determinam a identidade dos checkpoints e a fronteira entre eventos e domínio. Se uma resposta como “igual ao protótipo” aparecer, a entrevista deverá decompor o que é obrigatório e o que pode ser adaptado.

## 8. Evidências, referências e limites da validação

### 8.1 Fontes locais primárias

Os nomes em `evidencias/` abaixo identificam os registros da análise original. Esses arquivos não estão nesta árvore versionada; são referências históricas, não pré-requisitos para executar ou manter o jogo atual.

Os links de plugins completos estão no [inventário](inventario-plugins.md). As linhas abaixo se referem à versão auditada; os hashes SHA-256 (`evidencias/fontes-sha256.json`) permitem detectar mudança posterior.

| Fonte | Evidência principal e linhas de referência | Features relacionadas |
|---|---|---|
| [GDD canônico](../../docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md) | §§1.1, 3.5–3.7, 5–16, 19 e 22: autoridade, plataforma, save, regras, apresentação e exclusões | Todas; define o alvo, não o grau de implementação |
| Entry (historical HTML reference), README (historical HTML reference) | Ordem dos quatro scripts e contrato de execução/QA | F01, F56–57 |
| Dados (historical HTML reference), narrativa (historical HTML reference) | Catálogo de heróis/encontros/destinos e passagens com identidade/status | F06–09, F22–26, F30, F34–41, F59 |
| Engine (historical HTML reference) | L20 estado; L46 Mulberry; L489 preparação/ausência; L505 conclusão; L523 precedência; L597 dispatch; L700+ projeção/snapshot | F14–17, F20, F23–45, F56 |
| Renderer (historical HTML reference) | L51+ controlador; L99+ ausência; L167+ leitura; L311+ taverna; L377+ painéis; L416+ sacrifício; L521+ input | F01–22, F27–30, F46–57 |
| CSS (historical HTML reference) | L61–204 superfícies atuais; L1448+ overrides; L1553+ taverna fixa e efeitos | F08–17, F50–55 |
| [Plugins configurados](../../rpg-maker/The%20Dryland%20Drowned/js/plugins.js) | 17 entradas ativas; parâmetros examinados em §2.2 | Configuração de todos os candidatos |
| [System](../../rpg-maker/The%20Dryland%20Drowned/data/System.json), [Map001](../../rpg-maker/The%20Dryland%20Drowned/data/Map001.json), [CommonEvents](../../rpg-maker/The%20Dryland%20Drowned/data/CommonEvents.json) | Resolução, party inicial, mapa sem eventos e quatro CEs vazios | F01–02, F57; estado embrionário do MZ |
| [main.js MZ](../../rpg-maker/The%20Dryland%20Drowned/js/main.js) | Lista de libs locais, teste XHR e boot | F57 |
| [rmmz_managers](../../rpg-maker/The%20Dryland%20Drowned/js/rmmz_managers.js) | L105 loadDataFile; L186 metadata; L345 saveGame; L389 makeSaveContents; L550+ StorageManager; L988 imagem com erro | F42–45, F54–57 |
| [rmmz_objects](../../rpg-maker/The%20Dryland%20Drowned/js/rmmz_objects.js) | L227 optMessageSkip; L9800+ Show Text/Choices; L10124 Common Event/child interpreter | F03–05, F59 |
| [rmmz_windows](../../rpg-maker/The%20Dryland%20Drowned/js/rmmz_windows.js), [rmmz_scenes](../../rpg-maker/The%20Dryland%20Drowned/js/rmmz_scenes.js) | Window_Message input/startInput; Scene_Load onLoadSuccess/reloadMapIfUpdated | F04–05, F43, F52 |

Referências específicas nos headers dos plugins:

- MessageCore: L81 listas/mensagens estendidas; L465 CommonEvent; L518 condicionais de choices; L560 Help; L576+ backgrounds; L671 posição/word wrap; L832 propriedades; L979 texto em picture; L1200 fontes; L1230+ ações/macros; L1601 velocidade 11; L1613 word wrap; L2622 comandos de texto em pictures.
- PictureChoices: L70–87 mouse/OK de um clique; L102–152 fluxo e AutoClear; L170 binding; L261 ajustes de seleção.
- ChoiceCmnEvts: L76–80 `<Choice Common Event: id>`, execução no mapa ao foco.
- VNPictureBusts: L95 busts como pictures; L127 âncora; L149 posições; L975 entrada; L1170 gráfico; L1383 fade; L1697 coordenadas; L1958 escala. Aliases de Game_Picture/Sprite_Picture/Interpreter também observáveis no runtime.
- AttachedPictures: L93–219 coordenadas, camadas, herança e limitações; L419/451 attach; defaults 61–70. Sua compatibilidade documentada com PictureCmnEvts não prova compatibilidade idêntica com todo outro plugin de clique.
- ExtMessageFunc: L26–44 mapa/console/FAST; L167 allow/disallow; L254 FAST estendido; L388 lista/atalhos; L866/883 comandos.
- SaveCore: L26–46 escopo; L66–85 `<Global>`; L105–151 estágios e save de slot; L193 estilos; L242 callbacks; L297 autosave; L688–737 comandos.
- MessageLog: L26–44 captura; L92+ remoção de códigos de efeitos; L244 bypass; L284 limite; L586/600/614 comandos.
- EventTitleScene: L26–43 fluxo por mapa; L68–85 autosave/menu desabilitados no título; L124 Continue; L296–328 integração Single; L350–378 comandos.
- MessageVisibility: L28–45 escopo e integração; L114–127 CE show/hide. GabWindow: L27–41 fila/feedback; L63–70 execução separada do evento.
- OptionsCore: L26–41 recursos; L854–946 categorias, valor, render e persistência; L950+ remapeamento. MessageKeywords: L84–105 marker/tooltip sem wrap; integrações de janelas em L115+.
- VisualCutinEffect: L26–45 recursos; L77+ camada; L930 start; L1367 end. MsgLetterSounds: L26–37 áudio por letra; L323/392 comandos.
- ButtonPicture: L77 registro; L86 `isClickEnabled` exige mensagem livre; L91 reserva CE. TextPicture: L60+ comando, integração da próxima picture, bitmap e limpeza. AltMenuScreen/AltSaveScreen: overrides diretos de menus e save.

### 8.2 Consulta externa de confirmação

A consulta externa complementou os arquivos instalados; não foi usada para presumir recurso ausente na versão local:

- [Manual oficial: exportação MZ](https://rpgmakerofficial.com/product/MZ_help-en/01_11_03.html): web via servidor e risco de exclusão de assets utilizados por plugins.
- [API oficial MZ](https://developer.rpgmakerweb.com/rpg-maker-mz/): Input, TouchInput, Graphics e Bitmap; consultada também por Context7, biblioteca `/websites/developer_rpgmakerweb_rpg-maker-mz`.
- [Extended Message Functionality](https://www.yanfly.moe/wiki/Extended_Message_Functionality_VisuStella_MZ): console e FAST de eventos, coerentes com header local.
- [Save Core](https://www.yanfly.moe/wiki/Save_Core_VisuStella_MZ): estilos e comandos de autosave, conferidos no arquivo instalado.
- [Picture Choices](https://www.yanfly.moe/wiki/Picture_Choices_VisuStella_MZ): binding entre pictures e Show Choices, conferido no header instalado.

### 8.3 Validações realmente executadas

1. Leitura do GDD canônico, catálogo, narrativa, engine, renderer, CSS e contratos de QA do protótipo; inventário dos 23 arquivos, parâmetros ativos e dependências.
2. Navegação do protótipo por `file://`, viewport 1280×720, seed **20260831**: avisos → prólogo → taverna → hover/ficha/fala → selecionar H1/H2/H3 → painel de destinos → Parque → primeiro encontro **B7** → abordagem B7-2 → falha → tela de sacrifício → uma ativação sacrifica H1 → despedida/contexto da morte. Snapshot confirmou `death_result`, mortos `[H1]`, presentes `[H2,H3]` e validador `ok: true`.
3. Execução de `retired HTML artifact (tests.html)` por navegador: **168 aprovados, 0 falharam, 168 no total**. Saída preservada em testes-prototipo.txt (`evidencias/testes-prototipo.txt`). São testes do HTML, não de uma migração MZ.
4. Boot do MZ por `file://`: erro explícito de leitura local. Boot HTTP temporário em `127.0.0.1:18726`: runtime 1.10.0, `Scene_EventedTitleMap`, mapa 1 com zero eventos, 816×624, localForage `asyncStorage`, 126 comandos registrados; sem page errors reportados pela ferramenta nessa observação. Valores preservados em boot-mz-http.json (`evidencias/boot-mz-http.json`).
5. Inspeção somente leitura dos aliases carregados para localizar superfícies concorrentes. Nenhuma configuração ou comando de gameplay MZ foi alterado para produzir uma demonstração artificial de feature.

Capturas: taverna (`evidencias/prototipo-taverna.png`), encontro (`evidencias/prototipo-encontro.png`), sacrifício (`evidencias/prototipo-sacrificio.png`), erro MZ file (`evidencias/mz-file-erro.png`) e título MZ atual (`evidencias/mz-titulo-atual.png`).

Conferência documental: relatório de verificação (`evidencias/verificacao.md`). Os 40 arquivos de referência mantiveram os hashes registrados; as alterações pré-existentes de configuração MZ foram preservadas.

**Não verificado nesta pré-análise:** integração jogável das composições propostas no MZ; save/load real de campanha migrada; recuperação de gravação interrompida; hospedagem itch.io; reflow/zoom no MZ; política de duas abas; leitor de tela; performance da campanha MZ completa; áudio final; revisão editorial ou aprovação da arte. As coberturas estimadas não substituem esses ensaios.

### 8.4 Momento demonstrável para o devlog

Preservar o momento “a taverna lembra quem morreu”: mesma posição dos sobreviventes, lugar de H1 desaparecendo no primeiro retorno e vazio nas visitas seguintes, com formação ainda utilizável. Captura sugerida após migração: comparação HTML/MZ na preparação e dois quadros do retorno, durante e depois do segundo de desaparecimento; registrar seed, ações, viewport e preferência de movimento. As capturas desta pré-análise documentam apenas o HTML atual e o boot MZ, não esse futuro ensaio de paridade.

## 9. Passagem para a entrevista

Pré-análise e inventário devem estar salvos antes da primeira pergunta. A skill **grill-me** será usada com uma pergunta por vez e recomendação explícita, aprofundando consequências de respostas vagas. Não será criado plano final, spec de implementação ou arquitetura fechada antes de resolver as decisões materiais.

O ponto de partida é **Q1, o contrato de paridade da primeira versão MZ**. Ele define se a composição de plugins pode permanecer simples ou se reflow, foco espacial e comportamento de leitura exigirão complementos. Os trade-offs de plataforma/armazenamento vêm em seguida; mecânicas já confirmadas não devem ser reabertas sem solicitação de mudança.
