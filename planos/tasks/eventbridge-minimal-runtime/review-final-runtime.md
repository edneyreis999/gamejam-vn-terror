---
review: independent-rpg-maker-mz-deep-review
base: 5d0d9ab0296e7150cfbdd7ab263d304eeab06fdb
head: working-tree
scope: rpg-maker/The Dryland Drowned
verdict: SHIP
reviewed: 2026-09-13
---

# Revisão independente do runtime candidato

Esta revisão cobre todo o conjunto alterado, adicionado ou removido em
`rpg-maker/The Dryland Drowned/` contra a spec, a verificação, o contrato de
programação, as decisões ADR-001/002/003, o GDD canônico e os registros da
task14. O resultado é `SHIP` para o pacote de runtime: não encontrei defeito
material confirmado depois de seguir os caminhos de boot, campanha, leitura,
apresentação, salvamento, carregamento e encerramento.

O review foi estático e local. Não abriu navegador, não iniciou servidor e não
executou QA gráfico, áudio ou suítes nativas; esses sinais pertencem aos
executores de QA. Não houve alteração de implementação, dados, assets, saves
ou evidências. A única escrita desta rodada é este arquivo, no caminho
autorizado. O `SHIP` abaixo é o veredito do pacote runtime e não altera os
estados mistos de aceitação em `verification.md`.

## Fingerprint e escopo congelado

O fingerprint usa um manifesto determinístico ordenado por caminho relativo.
Cada linha tem `status<TAB>path<TAB>sha256`, em que `=` é arquivo inalterado,
`M` é modificado, `A` é adicionado e `D` é removido. O hash é SHA-256 do
manifesto sem quebra de linha final. Para arquivos presentes, o hash é dos
bytes atuais; para o arquivo removido, o valor é `DELETED`. A base é a árvore
`9c27770fb9bf8285546c0ec5e6c6adae990a6b97` de
`5d0d9ab0296e7150cfbdd7ab263d304eeab06fdb`.

| Medida | Início e fim desta revisão |
| --- | --- |
| Arquivos rastreados na base | 1.435 |
| Arquivos atuais não ignorados | 1.443 |
| União base/atual no manifesto | 1.444 |
| Alterados | 46 (36 M, 9 A, 1 D) |
| SHA-256 da união completa | `0e0bd22f3c4238b4fcac36aa584b0b9c116504fb47234a92f077e3f6799a890b` |
| SHA-256 somente das linhas alteradas | `abc9449f43e8e8e67b478999511a28943f47208bdc88013bee3d3901f298205f` |

Os saves gerados em `save/*.rmmzsave` são ignorados por
`rpg-maker/The Dryland Drowned/.gitignore` e não entram no conjunto candidato.
Eles também não foram lidos nem modificados neste review. A ausência de
engine/vendor é confirmada pelo diff vazio para `js/rmmz_*`, `js/libs/**` e
`js/plugins/VisuMZ*`, conforme `audit-task14-package.md:141-146`.

Hashes dos arquivos próprios e dos assets novos, conferidos nos dois extremos
do review:

| Arquivo | SHA-256 |
| --- | --- |
| `js/plugins.js` | `ac44106db075ccfdf2ff9734fb296a175fb693686cc0b371c95130b42fe5d810` |
| `js/plugins/Dryland_CampaignRules.js` | `56c248325ba60f768517391044aa9ff501f8a84791a39426c9a498df87c3b955` |
| `js/plugins/Dryland_EventBridge.js` | `3b3bc794ddfa176088d2bcf2a868ab374d3878c701a3bb98602abf309c808261` |
| `js/plugins/Dryland_Presentation.js` | `44d1dc49c6925ce33d4b0fcf94eab6fc30573bebe0c868d63d092b82a040209e` |
| `data/CommonEvents.json` | `21b139a6a43e634dae528c9f081c250001c09b12e19e349ca7d1e5d57f6ee590` |
| `data/System.json` | `36f146ce56a768bafeb231ebffe937e85b096f6fdc426f71a9b281deea926a33` |
| `native-layout-manifest.json` | `DELETED` |

Os oito PNG novos são `img/pictures/Dryland_Memorial_H1.png` até
`Dryland_Memorial_H8.png`; os bytes de todos estão incluídos no manifesto
completo. Nenhum caminho do runtime mudou entre o fingerprint inicial e o
final.

## Autoridade e lentes aplicadas

As regras esperadas vêm de `spec.md:35-107` (RQ-001–RQ-018), o ciclo de
eventos e saves de `eventbridge-minimal-runtime.programacao.md:77-94`, a
separação das camadas de `eventbridge-minimal-runtime.programacao.md:10-20`,
as fronteiras do adaptador em `:44-75`, e as decisões de conteúdo/loading em
`adrs/adr-002.md` e `adrs/adr-003.md`. A auditoria independente do pacote
confirma a topologia de dados, comandos, assets e engine em
`audit-task14-package.md:42-146`.

Para cada caminho apliquei as lentes que realmente lhe pertencem:

1. **PluginManager e provider:** cabeçalhos `@command`, parâmetros,
   `plugins.js`, ordem e integração com APIs instaladas.
2. **Ciclo MZ:** `Game_Interpreter`, Common Events, mensagens/escolhas,
   transferências, cenas, boot, modos de espera e reentrada.
3. **Domínio e dados:** configuração pública, projeções `Query`, contexto de
   ação, transições, IDs, switches/variáveis, serialização e referências.
4. **Save/Continue:** SaveCore no arquivo corrente, checkpoint, in-flight,
   falha, retomada do intérprete e ausência de gate de revisão.
5. **Pixi, input, resolução, motion e áudio:** pictures nativas, bindings,
   visibilidade, foco, gesto único, AUTO/FAST, movimento, ME e assets.
6. **Paridade e empacotamento:** chamadas CE/mapa, transferências, comandos,
   imagens/áudio, imports residuais e diff contra engine/vendor.

## Cobertura de execução e contratos

### Boot, configuração e Bridge

`DataManager.isDatabaseLoaded` lê somente os comandos de configuração de CE4 e
cria o catálogo com `Dryland_CampaignRules.createCatalog` e `createRules`
(`Dryland_EventBridge.js:386-395`). O parser de dados confirma oito heróis,
três rotas e dezesseis encontros configurados sem alvo ausente. O wrapper de
`setupNewGame` instala um estado `ready` antes do uso dos eventos
(`Dryland_EventBridge.js:397-404`); a inicialização all-session do CoreEngine
permanece no CE nativo selecionado por `System.json`. Não há leitura de cenas
para reconstruir conteúdo nem execução arbitrária ao montar o catálogo.

O Bridge conserva somente a fronteira funcional aprovada: `Query` calcula
valores escalares, `CaptureContext` registra sequência e passagem, `Action`
chama o domínio, `ReadingComplete` conclui a passagem e `Checkpoint` solicita
o SaveCore (`Dryland_EventBridge.js:312-360`, `:443-519`). Não há aliases de
apresentação, API de QA, seed externo, manifest de layout, bloqueio global ou
dispatch de conteúdo. `ConfigureHero`, `ConfigureRoute` e
`ConfigureEncounter` são apenas a superfície de declaração lida em CE4.

### Domínio, consultas e ações

O catálogo público e os planos semânticos são construídos em
`Dryland_CampaignRules.js:44-76`; o estado mínimo e a ausência de
`presentedDeathIds` estão em `:81-91`. A validação estrita de estado,
histórico, mortes, formação, assignments, progresso, leitura, desfechos e
clímax ocupa `:251-460`. `formationTransition` em `:474-484` deixa o
bookkeeping visual para os eventos nativos. `finishReading` e
`completeCurrentPassage` preservam as fronteiras entre intro, rotas, recompensa,
Conselho, memorial, epílogos e conclusão (`:518-571`).

As ações aceitas e seus campos estão fechadas pelo mapa de ações e pela
validação de `expectedSequence` (`Dryland_CampaignRules.js:133-144` e
`Dryland_CampaignRules.js:578-601`). Ações obsoletas são rejeitadas pelo
contexto capturado; `Query` não altera o estado. As 372 chamadas `Query`, 24
`Action`, 193 `ReadingComplete` e 224 `CaptureContext` foram incluídas na
auditoria de 2.468 comandos de plugin, com 33 pares reconhecidos e zero
comando desconhecido ou inativo (`audit-task14-package.md:51-70`).

### Narrativa nativa e leitura

As chamadas `code:117` ligam todas as unidades nativas sem alvo nulo ou fora de
`CommonEvents.json`: são 746 chamadas, 337 IDs distintos
(`audit-task14-package.md:42-47`). O caminho de leitura de campanha faz
`Query(passageRead)` e `Dryland_Presentation.ReadingPermission` no CE da
passagem; a conclusão chama o contexto correto do Bridge. Unidades
observacionais usam `ObservationBegin`/`ObservationComplete` no próprio CE.

O ID observacional é capturado pelo vínculo da lista nativa em
`Dryland_Presentation.js:113-127` e fica serializado no intérprete; a
conclusão só adiciona a unidade em `_drylandReadUnits` em `:128-152`. `clear`
remove o ID e a permissão quando um intérprete é cancelado. Essa separação
permite trocar o Common Event selecionado sem um registry paralelo e não
transforma conversa observacional em progresso de campanha.

### Rotas, encontros, mortes e finais

O dispatch percorre formação, entrada, encontro, abordagem, resultado,
sacrifício, recuo, recompensa, Conselho e escolha de final em
`Dryland_CampaignRules.js:603-682`. As transferências nativas são 34 e todos
os mapas alvo existem em `MapInfos.json` (`audit-task14-package.md:48-50`).
As páginas/CEs mantêm os comandos de apresentação e as consultas; o Bridge
não resolve nem executa o conteúdo narrativo. A ausência de heróis e os fades
consumidos são marcados pelos CEs nativos 348–350/45; o domínio mantém somente
fatos de morte e local (`Dryland_EventBridge.js:312-360` e
`Dryland_CampaignRules.js:261-265`).

O memorial usa oito PNGs preparados, IDs nativos e eventos de leitura por
herói. A varredura encontrou 255 chamadas `code:231`, 62 nomes únicos, e os 66
stems literais/provider/preload correspondentes têm arquivo `.png`
(`audit-task14-package.md:74-82`). A lista de CE351 é uma chamada nativa
`SystemLoadImages` com 29 pictures, sem hook de espera ou polling no Bridge ou
no Presentation. Os CEs 335–350 preservam a passagem para Conselho,
desfechos, memorial e epílogos; CE336/CE350 conduzem o encerramento nativo.

### SaveCore, checkpoint e Continue

O Bridge envolve `DataManager.saveGame` com uma única promessa in-flight e
registra sucesso/falha sem trocar o arquivo selecionado
(`Dryland_EventBridge.js:405-423`). `Checkpoint` valida cena, intérprete,
mensagem, fase e cursor, usa o modo de espera `dryland-save` e chama
`VisuMZ_1_SaveCore.AutosaveForce` no arquivo corrente (`:255-268`, `:480-503`).
O atalho por sequência em `:489-491` evita uma segunda escrita quando o
intérprete retomado está exatamente no boundary já salvo. Falha libera o wait e
preserva o último save bem-sucedido.

`DataManager.loadGame` congela a campanha carregada e restaura o estado de
persistência (`Dryland_EventBridge.js:424-430`). O intérprete nativo continua
serializado; `Game_Interpreter.clear` remove somente o contexto transitório
quando a unidade realmente termina (`Dryland_EventBridge.js:520-525`). Não há
revisão de conteúdo, envelope duplicado, slot forçado, restauração de prefixo
visual ou conversão silenciosa. A auditoria task14 também confirma que o
manifesto e as CLIs removidas não têm consumidores runtime
(`audit-task14-package.md:96-106`).

### HIDE, foco, input e modos do provider

`Dryland_Presentation.js` mantém a integração estreita prevista no contrato:

- `Game_System.initialize` começa com unidades observacionais vazias e FAST
  desabilitado (`:99-112`);
- a chamada real do provider usa `ExtFastFwdDisallow` e o parâmetro declarado
  `Allow:eval` (`:105-111`), preservando AUTO/FAST do provider e desligando
  modos anteriores em cada unidade, escolha, transferência, Options ou load
  (`:169-187`);
- `Window_ButtonConsole` recebe apenas cor/toque para AUTO/FAST indisponível e
  `Window_Message.isTriggered` bloqueia o clique no botão desabilitado para que
  ele não avance a mensagem (`:153-168`);
- ChoiceFocus, restauração de foco, HIDE e bindings ficam nos windows/pictures
  nativos (`:188-229`, `:284-321`), sem ranges fixos de IDs;
- o gesto físico é consumido após confirmação e exige release antes da próxima
  janela (`:241-283`); movimento livre e aceleração comum de eventos obedecem
  aos parâmetros do adapter (`:342-350`), deixando a aceleração autorizada de
  leitura e créditos no provider/MZ;
- `playMe`/`stopMe` preservam o descritor `_currentMe` para que o setter nativo
  de volume reaja ao ME corrente sem reiniciar a faixa (`:351-364`).

O provider instalado declara `@arg Allow:eval`; portanto o payload
`{'Allow:eval':'false'}` usado pelo adapter é convertido corretamente em
`args.Allow=false`. Não encontrei workaround para um nome de parâmetro
inexistente. `Window_ButtonConsole` é uma função global fornecida pelo
ExtMessageFunc, e `_buttonConsoleButtons`/`getBounds()` são usados apenas para
identificar o alvo nativo do botão desabilitado.

### Conteúdo, assets e empacotamento

O pacote contém 36 mapas e 351 CEs não nulos. Não há `code:356`, `code:355`
com script, nomes de imagem com caminho/extensão/escape, nem
`image.characterName` não vazio. Os dez nomes de áudio autorados (4 BGS, 2 ME,
4 SE) têm `.ogg` correspondente (`audit-task14-package.md:86-90`). Os 33
pares de comandos ativos são válidos, inclusive provider, CoreEngine,
MessageCore, PictureChoices, VNPictureBusts e EventTitleScene
(`audit-task14-package.md:51-70`). O manifesto global de layout foi removido e
nenhum código próprio tenta carregá-lo.

## Resultado por lente

| Lente | Evidência principal | Veredito |
| --- | --- | --- |
| PluginManager, metadata e ordem | Cabeçalhos dos três plugins próprios, `plugins.js`, 33/33 pares ativos e ordem relativa preservada | SHIP |
| Boot e ciclo MZ | CE4 all-session, `setupNewGame`, `isDatabaseLoaded`, intérprete, mensagens, choices, transfers e cenas | SHIP |
| Domínio e pureza | Catálogo/configuração, `Query` escalar, `Action` contextual, validação e transições sem estado visual | SHIP |
| Dados e serialização | 746 CEs, 34 transfers, IDs válidos, estados nativos e propriedades de picture/intérprete serializáveis | SHIP |
| SaveCore e Continue | arquivo corrente, in-flight, wait de sucesso/falha, carga e retomada sem gate de revisão | SHIP |
| Pixi, UI, input e zoom | HIDE, bindings em `Game_Picture`, foco, gesto único, motion e políticas nativas; captura dirigida pertence à QA | SHIP condicionado à evidência externa |
| Loading e assets | CE351 `SystemLoadImages`, 66 PNGs e 10 OGGs presentes, nenhum hook de espera/polling | SHIP condicionado à evidência externa |
| Áudio | adapter ME mínimo e chamadas/arquivos BGS/ME/SE íntegros; audição perceptível pertence à QA/humano | SHIP condicionado à evidência externa |
| Paridade, imports e engine/vendor | auditoria task14, `git diff --check`, nenhum engine/vendor alterado | SHIP |

## Achados

Não há achado runtime aceito nesta rodada; portanto não há F-XXX com
severity/confidence para encaminhar à implementação.

O único sinal adverso observado durante o ciclo foi a falha de mouse em uma
superfície de QA. A reprodução inicial clicava a opção Gorvak e consultava o
submenu antes de a janela nativa de choice ou `$gameMessage.choices()` mudar.
Depois que o driver passou a aguardar essa mudança observável, o mesmo ponto e
fluxo passaram nas superfícies reduzida/grande/final, incluindo HIDE, Options,
retorno e formação. O runtime permaneceu byte a byte igual. Isso é uma
correção de navegação do sensor e não um defeito de `Dryland_Presentation`.

Não promovi como defeitos do runtime os achados atuais da camada QA sobre
proveniência de archive, cobertura BGM/SE, sensor temporal de bust, oráculo de
créditos ou variantes de branch/zoom. Eles pertencem a `rpg-maker/qa/` e aos
reports de task16, fora do conjunto deste review; permanecem válidos como
pendências dessa camada até seus próprios retestes.

## Ledger de caminhos revisados

Cada grupo abaixo enumera todos os caminhos do diff dentro do escopo. O
veredito é o mesmo para cada caminho listado.

| Caminhos | Lentes aplicadas | Veredito |
| --- | --- | --- |
| `js/plugins.js` | PluginManager, ordem, parâmetros e ativação | SHIP |
| `js/plugins/Dryland_CampaignRules.js` | domínio puro, estado, RNG, validação, transições | SHIP |
| `js/plugins/Dryland_EventBridge.js` | Bridge, contexto, Query/Action, boot, save/load, checkpoint | SHIP |
| `js/plugins/Dryland_Presentation.js` | provider, input, HIDE, focus, motion, pictures e ME | SHIP |
| `data/CommonEvents.json` | CEs, comandos nativos, chamadas, branches, assets e checkpoints | SHIP |
| `data/System.json` | variáveis/switches, menu, CoreEngine, recursos nativos | SHIP |
| `data/Map002.json`, `data/Map003.json`, `data/Map007.json`–`data/Map023.json`, `data/Map025.json`–`data/Map036.json` | páginas, transfers, chamadas CE, comandos provider, assets e controles | SHIP |
| `img/pictures/Dryland_Memorial_H1.png`, `H2.png`, `H3.png`, `H4.png`, `H5.png`, `H6.png`, `H7.png`, `H8.png` | presença, nomes literais, memorial nativo e empacotamento | SHIP condicionado à inspeção visual externa |
| `native-layout-manifest.json` (removido) | consumidores runtime, package audit e ausência de gate | SHIP |

Não há alteração em `js/rmmz_*`, `js/libs/**` ou fontes VisuStella. Os mapas
não listados (`Map001`, `Map004`–`Map006`, `Map024`) não fazem parte do diff
atual e não foram tratados como alterados.

## Verificações locais e limites

As verificações estáticas concluídas para este review foram:

- `node --check` nos três plugins próprios: passou;
- parsing JSON de `CommonEvents.json`, `System.json`, `MapInfos.json` e os 37
  `Map*.json` presentes: passou (`json-ok 40` arquivos);
- `git diff --check -- 'rpg-maker/The Dryland Drowned'`: passou;
- harness puro de regras para configuração, `BEGIN`, formação e sequência
  final: passou (`pure-rules-ok 1 formation 4`);
- auditoria task14 de comandos, transfers, imagens, preload, áudio, imports e
  diff engine/vendor: sem alvo/asset/comando inválido
  (`audit-task14-package.md:42-146`).

Esta revisão não certifica carregamento assíncrono real, geometria/pixel,
legibilidade, conforto, audição, autoria no editor, Continue dirigido ou
aceite humano. `verification.md:4-7` ainda registra
`runtime_verified: false`, `human_accepted: false` e `release_ready: false`, e
`verification.md:154-160` mantém os sensores mistos e julgamentos humanos sob
as responsabilidades de QA. Esses estados são limites de evidência, não
defeitos runtime descobertos aqui.

## Parecer final

**SHIP para o candidato de runtime.** O pacote preserva as fronteiras aprovadas:
regras no domínio, configuração e projeções escalares no Bridge, conteúdo e
apresentação em Common Events nativos, provider instalado para leitura/UI,
SaveCore para arquivos, CoreEngine para preload e nenhuma alteração em
engine/vendor. A entrega só deve usar este parecer junto da evidência de QA e
aceitação humana que ainda pertence aos seus owners; este arquivo não fecha
`verification.md` nem promove sensores pendentes.
