---
type: improvement
created: 2026-10-29
source: gamejam-vn-terror — solicitação do dono do jogo nesta conversa
status: textos e traduções aprovados; integração implementada em 2026-10-29
---
# Rework da escolha de sacrifício: medo e bravura

Integração implementada na branch `feat/002-juicy-morte-heroi`. [Escopo incremental e verificação](../tasks/juicy-hero-death/verification.md). As seções de preparação abaixo preservam o estado histórico da entrega de conteúdo; não substituem esse registro de integração.

## Problema e resultado esperado

Afogados em Terra Seca / The Dryland Drowned é uma visual novel em RPG Maker MZ. Após uma abordagem fatal, o jogador escolhe um herói vivo da formação para morrer e salvar os demais. O usuário quer aumentar a tensão dessa decisão com expressões de terror nos candidatos, bravura no personagem em foco, uma frase individual, moldura de sangue e o áudio fornecido. Esta pasta contém conteúdo e conceitos; nada foi integrado ao jogo. A LLM receptora precisa do repositório completo e deve seguir seu AGENTS.md.

O usuário aprovou os elementos conceituais dos três primeiros heróis, mas corrigiu o layout: **usar a caixa de texto que já existe no jogo e não acrescentar nomes/placas em telas de bustos**. As imagens de conceito não são uma especificação literal da interface. Não copiar sua faixa inferior de texto, tipografia ou placas de nomes. A apresentação real existente prevalece nesses pontos.

## Estado atual e evidências

A implementação única está em `rpg-maker/The Dryland Drowned/`, sem build para autoria. Na inspeção da conversa, a resolução era 1280×720. `data/CommonEvents.json`, registro 42, é “Sacrifício — Escolha irreversível”; o registro 43 é “Sacrifício — Palco de candidatos”. Localize pelo ID do registro, não pela linha do JSON. Releia antes de editar porque índices internos podem mudar.

Trechos reais observados:

- CE42 começa com Mostrar Texto contendo `$[sacrifice.warning]`, chama CE43 e usa `Dryland_EventBridge → CaptureContext`.
- Uma opção nativa é `$[choice.sacrifice] \\V[189]<Bind Picture: 50><Show Switch: 35><Hide Choice Window>`; as outras usam variáveis 190/191, imagens 51/52 e switches 36/37.
- CE43 apresenta a imagem 40 `Dryland_EncounterTitle`; seu texto inclui `$[ui.sacrifice.title]`. O título é “Escolha um herói para salvar o grupo”.
- CE43 usa fundos `Dryland_Encounter_A1_blur` e equivalentes por encontro, `Dryland_SacrificeCard` e retratos `Dryland_Memorial_H1`–H8. São evidências do fluxo atual, não arquivos a substituir indiscriminadamente.
- `Languages.tsv` contém `sacrifice.warning`, `ui.sacrifice.title` e `choice.sacrifice`.

Coreto_2_PictureChoices, Coreto_2_VNPictureBusts e Coreto_3_ChoiceCmnEvts estavam ativos em `js/plugins.js`, com os providers VisuMZ equivalentes desativados. A presença de comandos antigos nos eventos é suportada por aliases; não significa que o provider original esteja ativo.

A análise anterior encontrou: VN cria pictures comuns por ID; Picture Choices vincula IDs às opções; Choice Common Events dispara no foco, inclusive inicial, antes da confirmação. Intérpretes de foco podem se sobrepor. VN e Picture Choices compartilham posição, escala, opacidade e duração; AutoClear limpa vínculos, não restaura aparência. Essas capacidades não comprovam a integração funcionando.

## Requisitos confirmados

1. Exibir somente candidatos vivos da formação, entre um e três; Ivaí nunca é candidato. Cobrir todos os oito heróis, sem restringir a formação ao trio dos conceitos.
2. O herói em foco por mouse ou teclado mostra bravura e sua frase. Os demais mostram medo. Perder foco restaura medo. A frase precisa acompanhar o foco atual, sem fila de frases antigas ao navegar rapidamente.
3. Foco é apresentação, nunca morte, progresso, consumo de leitura ou gravação de campanha. Clique/confirmar continua irreversível e imediato, sem etapa extra, cancelamento ou desfazer, mesmo com um candidato. Preservar proteção contra confirmação dupla.
4. As novas frases são prévias de foco. Preservar as despedidas canônicas, a ordem dos eventos e os checkpoints existentes. A narração pós-armadilha será substituída pelos roteiros desta pasta após revisão editorial, conforme o novo escopo abaixo. Não acrescentar dublagem.
5. Remover o título solicitado, mas preservar o aviso de irreversibilidade antes da decisão. Usar a caixa de texto existente e o padrão atual de bustos sem placas de nomes.
6. Aplicar `03-respingos-moderados.png`, preservando transparência central, leitura e interação. 55% de opacidade é o ponto inicial proposto, não um parâmetro já implementado ou medido nos conceitos.
7. A cena deve ficar sem música, com `05-opressivo` como ambiente. O pós-armadilha agora admite os efeitos pontuais especificados em `direcao-sonora-pos-armadilha.md`, por solicitação posterior do usuário. Não acrescentar dublagem nem efeitos fora desse catálogo. Não deixar esse áudio vazar para cenas posteriores. Preservar configurações de volume e mudo do jogador.
8. Preservar HIDE, teclado, movimento reduzido, contexto do encontro e continuidade da campanha. O destaque não pode esconder o medo dos outros candidatos nem encobrir a caixa existente.

## Conteúdo entregue

Todos os caminhos abaixo são relativos a esta pasta. Cada nome minúsculo possui `<nome>-medo.png` e `<nome>-bravura.png`, totalizando 16 PNGs RGBA:

| ID | Nome/base do arquivo | Voz e referência narrativa |
|---|---|---|
| H1 | gorvak | Ferreiro anão, protetor relutante; firmeza apesar do medo. |
| H2 | elowen | Caçadora elfa, rápida e provocadora; age para abrir distância. |
| H3 | griznik | Carpinteiro goblin, improvisador; procura uma saída prática. |
| H4 | seraphina | Curandeira troll; orienta e cuida mesmo sob ameaça. |
| H5 | bimbren | Mensageiro gnomo; promessa e dever. |
| H6 | liora | Navegadora gnoma; medo de conduzir outros sem retorno. |
| H7 | vaelith | Escriba elfo; preserva conhecimento para evitar mortes. |
| H8 | draska | Mineradora goblin; pragmatismo, retirada e controle do pânico. |

`falas-bravura.tsv` reúne oito falas PT/EN. É um catálogo de conteúdo com colunas HeroID, Name, Portuguese, English, **não uma substituição direta de Languages.tsv**. A integração precisa respeitar o formato e as chaves de localização do jogo. As três primeiras falas foram apresentadas nos conceitos; todas as oito falas e suas traduções foram aprovadas pelo dono do jogo em 2026-10-29.

`mockup-01-gorvak.png`, `mockup-02-elowen.png` e `mockup-03-griznik.png` são conceitos 1280×720, não capturas do jogo. Mostram apenas um trio de exemplo sobre A1. Os nomes e a faixa de texto desses mockups foram explicitamente descartados para implementação.

`05-opressivo.ogg` e `.wav` são os arquivos fornecidos. Não presumir equivalência sonora só pelo nome; a inspeção encontrou OGG estéreo e WAV mono. O áudio não foi integrado nem avaliado em contexto.

`dryrun-prompts.json` registra prompts, proveniência e alvos visuais da geração via imagegen. A correção de interface deste documento prevalece sobre os prompts históricos que pediam nomes ou uma faixa própria.

## Restrições e não objetivos

Preservar engine, terceiros e todos os fontes/bundles Coreto. Consultar `coreto/README.md`, catálogos da CLI e `coreto/docs/extensoes.md` antes de concluir que falta capacidade. Configurações e eventos são editáveis; eventual extensão deve respeitar os tiers e a ordem de dependências. A escolha de implementação cabe à LLM receptora, sem novos serviços remotos ou dependências implicitamente autorizados.

Manter estrutura narrativa em eventos nativos, regras em plugins de domínio e textos PT/EN em Languages.tsv, com chaves nos eventos. Preservar saves, regras de morte, progresso, elegibilidade e consequências. Specs concluídas são históricas; mudanças posteriores de comportamento devem ser descritas incrementalmente conforme as políticas locais.

Esta entrega não autoriza regenerar outros assets, modificar o GDD silenciosamente, publicar, fazer commit ou declarar aceite artístico final. Os novos bustos são propostas geradas para inspeção; antes de entrega final do jogo, aplicar a política de assets finais do projeto.

## Pendências e verificação

A inspeção visual confirmou identidades reconhecíveis e contraste entre medo e bravura. Os PNGs têm alpha. Há pequenos resíduos de borda em algumas gerações que merecem revisão sobre o fundo real antes de tratá-las como arte final. Liora tem uma diferença de um pixel na altura entre estados (1378/1377); não assumir alinhamento pixel-perfect apenas por serem um par. A integração precisa evitar saltos de enquadramento.

Volume, repetição contínua do áudio e transições de entrada/saída ainda precisam de avaliação audível; não há decisão validada sobre esses valores. Intensidade de glow/escurecimento, escala e duração também são alvos de ajuste, não aceite visual final. Não inventar cronômetro ou vítima automática para criar tensão.

Verificar funcionalmente um, dois e três candidatos, todos os oito heróis, troca rápida de foco por mouse/teclado, confirmação única, ausência de consequências ao focar, retorno de HIDE/Options e Continue após morte. Conferir PT/EN, textos na caixa atual, ausência das placas de nomes/título, transparência da moldura e encerramento do áudio. Preservar ordem morte salva → despedida → narração conforme o contrato canônico.

Usar testes existentes para regras e persistência, ampliando somente riscos sem cobertura. Aparência exige inspeção, não teste novo de layout. Seguir ADR-G004–G006; a inspeção de QA é somente leitura e mutações de campanha passam por ações validadas do jogador. Nenhum teste de integração, áudio ou playtest foi executado nesta entrega de conteúdo.

A análise anterior executou `vn validate` e recebeu INVALID_EVENT_LIST em common-event:2/list/37 (“Branch marker does not match its owner.”) e common-event:38/list/78 (“Command indentation does not match its branch.”). São diagnósticos anteriores, não prova de incompatibilidade dos recursos nem autorização para correção fora do escopo. Revalidar o estado atual antes de atribuir falhas ao rework.

Momento demonstrável futuro: abrir a escolha real e alternar foco entre três candidatos, mostrando medo → bravura e a frase na caixa existente, sem nomes adicionais. Capturar o estado de cada foco e um vídeo curto para transições/áudio; separar evidência técnica de aceite humano.

## Referências para abrir no repositório

- `AGENTS.md`: contratos locais e autoridade; `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md`, §§13.2 e 19.2: sacrifício e arte.
- `docs/narrativa/herois/Ficha_H1_Gorvak.md` até `Ficha_H8_Draska.md`: aparência, voz e despedidas; Liora é gnoma.
- `rpg-maker/The Dryland Drowned/data/CommonEvents.json`: CE42 e CE43; `Languages.tsv`: chaves citadas.
- `rpg-maker/The Dryland Drowned/js/plugins.js`: configuração efetiva; plugins locais Dryland_Presentation, Dryland_EventBridge, Dryland_CampaignRules e Dryland_6_IllustratedChoices: apresentação e contratos existentes.
- `coreto/src/vn-picture-busts/commands.js:1`, `coreto/src/picture-choices/choices.js:7`, `coreto/src/picture-choices/settings.js:62`, `coreto/src/choice-common-events/choices.js:15`: evidência somente leitura das capacidades e limites.
- `docs/_memory/local-game-run.md`: ler antes de iniciar o jogo; `coreto/docs/qa.md` e `docs/adrs/README.md`: verificação.

Os caminhos desta seção são relativos à raiz do repositório. Este documento acompanha o conteúdo; não substitui a leitura das instruções locais nem estabelece que a implementação já ocorreu.


## Incremento: roteiros pós-armadilha e direção sonora

A solicitação posterior amplia a entrega para as 16 narrações de morte. Este incremento substitui apenas as restrições antigas contra reescrita dessas narrações e efeitos pontuais no pós-armadilha; não muda despedidas, regras ou persistência. As decisões históricas permanecem documentadas em suas fontes. A3 teve direção e roteiro aprovados na conversa; todos os textos das cenas e traduções foram posteriormente aprovados pelo dono do jogo em 2026-10-29; a avaliação audível da mixagem permanece pendente. Os arquivos abaixo são documentação preparada, não conteúdo integrado.

- [Roteiros completos](roteiros-pos-armadilha.md): A1–A8 e B1–B8, caixas PT/EN, continuidade, comandos e restrições. Usar show, don’t tell, causalidade clara, detalhes sensoriais seletivos e ritmo de suspense. Não inventar capacidades pessoais para tornar um sacrifício possível.
- [Catálogo de sons](direcao-sonora-pos-armadilha.md): nomes exatos, geração, duração, disparo e política de avanço rápido. O usuário produzirá os arquivos; não existem automaticamente por estarem listados. Apenas início de caixa ou transição admite disparo.
- [Template reutilizável em branco](template-cena-vn.md): estrutura comum de autoria com campos para novas cenas, localização, escolhas opcionais, bustos, áudio e verificação.

Após a despedida, manter o busto brave já escolhido, posição e enquadramento. Não retornar ao medo. Retirar outros bustos presentes antes da caixa 3 com Fade_OpacityTo de 48 frames e Wait 48. Retirar a vítima antes da última caixa com fade 60 e Wait 60; em A3, antes da caixa 9. Não animar literalmente tudo o que a prosa descreve. Ao final, retirar apenas pictures pertencentes à cena.

O nome usa consulta `heroName` do EventBridge e expansão `\V[ID]` do Message Core; reservar ID livre ao integrar. Não usar a variável de ID da vítima como nome. A vítima pode ser obtida pelo contexto persistido `pendingOutcome.victimId`; preservar sua identidade depois da morte registrada. O marcador editorial {NOME}/{NAME} precisa ser convertido, não exibido.

Cada conjunto de caixas mantém a passagem de domínio `death.<id>.context`. O fluxo espera `farewell.<vítima>` seguido desse contexto. Não chamar ReadingEnd por caixa, repetir SELECT_VICTIM, criar checkpoints de morte adicionais nem avançar campanha por foco. CE268 corresponde ao contexto A3 na inspeção; localizar os demais eventos pela chave. Não presumir que cada bloco localizado equivale a nova passagem lógica.

Fontes técnicas verificadas: `coreto/src/message-core/text-pipeline.js` (expansão de variável); `coreto/src/vn-picture-busts/opacity.js`, `graphics.js` e `commands.js` (fades/troca); `js/rmmz_objects.js` da implementação única (Reproduzir SE 250, Stop SE 251, BGS 245). Reconsultar catálogos CLI e plugins ativos antes de editar. Fade não espera automaticamente; troca de bitmap não é crossfade. Stop SE é global, portanto conferir sons concorrentes antes de adotá-lo.

Verificação documental: conferir todas as chaves, IDs de cena e correspondência cue/arquivo. Verificação futura no jogo: leitura lenta/rápida, um a três candidatos, oito vítimas possíveis, nomes PT/EN, reduced motion, HIDE/retomada, mudo e ausência de vazamento. B1 não ganha cronômetro; B3 não inventa uma lembrança específica; B6 mantém canto e resposta apenas na narração nesta versão. Nenhum novo som, integração ou playtest foi executado para esta entrega.

Momento demonstrável adicional: vídeo de A3 desde confirmação até a caixa final, mostrando continuidade da bravura, fades e golpe sincronizado à entrada da caixa 9. Registrar também avanço rápido para avaliar cortes de cauda; screenshot isolado não prova áudio.
