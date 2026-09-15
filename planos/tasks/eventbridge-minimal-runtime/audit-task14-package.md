# Auditoria estática do pacote — task 14

**Data:** 2026-09-12  
**Escopo:** `data/Map*.json`, `data/CommonEvents.json`, comandos de plugin e
assets que esses dados referenciam; imports dos utilitários/QA/testes canônicos;
diff contra engine/vendor. Esta é uma inspeção do candidato compartilhado, não
uma declaração de execução nativa.

## Método e limites

O parser percorreu as 36 `Map001.json`–`Map036.json`, `CommonEvents.json` e cada
lista de evento/página. O JSON tem formatação mista: `CommonEvents.json` tem 354
linhas e alguns mapas são uma única linha; por isso os achados de dados citam
arquivo, CE, evento/página e índice de comando quando necessário. Não abri
navegador, não iniciei servidor e não rodei suítes nativas nesta auditoria.

Comandos usados:

```sh
rg --files 'rpg-maker/The Dryland Drowned/data' | sort
python3 <parser JSON somente leitura: code 117/201/231/357, áudio,
  PictureName:str, SystemLoadImages e image.characterName>
node <parser de plugins.js e @command somente leitura>
rg -n 'native-layout|expeditionQA|validate-content|revise-layout|file0' \
  rpg-maker/tools rpg-maker/qa rpg-maker/tests
rg -n '^import |require\(' rpg-maker/tools rpg-maker/qa \
  rpg-maker/tests/helpers rpg-maker/tests/suites
git diff --name-only -- 'rpg-maker/The Dryland Drowned/js/rmmz_*' \
  'rpg-maker/The Dryland Drowned/js/libs/**' \
  'rpg-maker/The Dryland Drowned/js/plugins/VisuMZ*'
```

O parser não infere nomes construídos por JavaScript fora dos parâmetros
serializados. Os drivers QA têm construções como ``Dryland_${hero}``, mas elas
não são chamadas de asset nos mapas/CEs e precisam de validação nativa própria.

## Dados nativos

- `rpg-maker/The Dryland Drowned/data/` contém 36 mapas e `MapInfos.json` lista
  os IDs 1–36. `CommonEvents.json` tem 352 posições, 351 entradas não nulas.
  A varredura formou 426 fontes de evento (351 CEs e 75 páginas de mapa).
- Há 746 chamadas `code:117` para Common Events, 337 IDs distintos e zero
  alvo nulo, não inteiro ou fora de `CommonEvents.json`. Exemplos de raízes
  são CE1 → CE114–116, CE3 → CE351/67/38/39/117, CE40 → fluxo de encontros e
  CE58–61 → encerramento; os registros estão em
  `rpg-maker/The Dryland Drowned/data/CommonEvents.json:1-354` e nas páginas
  de `Map*.json`.
- Há 34 transferências `code:201`. Os alvos usados são
  `3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,25,26,27,28,29,30,31,32,33,34,35,36`;
  todos existem em `MapInfos.json`. Não há transferência inválida.
- Há 2.468 `code:357`, em 33 pares únicos. O resultado de comparação com os
  plugins ativos de `js/plugins.js:1` e seus cabeçalhos `@command` foi **33/33
  reconhecidos, 0 desconhecidos e 0 de plugin inativo**. Os contadores por
  plugin/comando são:

  | Plugin | Comandos usados (contagem) |
  | --- | --- |
  | `Dryland_EventBridge` | `Action` 24; `CaptureContext` 224; `Checkpoint` 19; `ConfigureEncounter` 16; `ConfigureHero` 8; `ConfigureRoute` 3; `Query` 372; `ReadingComplete` 193 |
  | `Dryland_Presentation` | `ArmEffect` 8; `BindInterfacePicture` 109; `BindScrollSkip` 1; `ChoiceFocus` 30; `ConsumeInput` 1; `InterfaceVisibility` 2; `MotionPreference` 216; `ObservationBegin` 32; `ObservationComplete` 32; `ReadingEnd` 193; `ReadingPermission` 193; `TakeEffect` 8 |
  | `VisuMZ_0_CoreEngine` | `SystemLoadImages` 1 |
  | `VisuMZ_1_MessageCore` | `MessageWindowProperties` 2; `PictureTextChange` 98 |
  | `VisuMZ_2_PictureChoices` | `ChangePictureChoiceSettingsOne` 68 |
  | `VisuMZ_2_VNPictureBusts` | `Basic_EnterBust` 158; `Basic_ExitBusts` 26; `Move_MoveToCoordinates` 142; `Scale_ScaleTo` 142; `Tone_CustomToneBust` 84; `Tone_NormalBust` 58 |
  | `VisuMZ_4_EventTitleScene` | `LoadScreen` 1; `NewGame` 2; `Options` 2 |

  As referências de origem representativas estão em CE3, CE4, CE5, CE13,
  CE38, CE45, CE59, CE61, CE64, CE68, CE73, CE82, CE114, CE348 e CE351 de
  `CommonEvents.json`; o arquivo é a fonte serializada dos IDs e listas.
  Não há chamadas legadas `code:356`. As 24 ações usam valor direto ou o
  campo nativo `valueVariable`; nenhuma contém string `\V[...]` executável.

## Assets literais e dinâmicos reconhecíveis

- As 255 chamadas `code:231` usam 62 nomes de imagem únicos. Os 158
  `Basic_EnterBust` fornecem 12 valores únicos `PictureName:str`; oito já
  aparecem no conjunto de `code:231`. CE351, **Taverna — Carregar imagens**,
  usa `SystemLoadImages` com uma lista serializada de 29 nomes em
  `CommonEvents.json` (CE351, comando 0). A união literal/provider/preload é
  de **66 stems** em `img/pictures/`; os 66 arquivos `.png` existem.
- Os nomes adicionais de busto reconhecíveis pelo provider são
  `Dryland_andira`, `Dryland_florai`, `Dryland_ivai` e `Dryland_perola`, além
  de `Dryland_H1`–`Dryland_H8`. A lista de 29 de CE351 cobre cenário, retratos
  de palco, bustos, Ivaí, controles, destinos e mapa; cada item tem arquivo
  presente. Não há `image.characterName` não vazio nas páginas dos mapas e não
  há `code:355` com script de carregamento para ocultar outro asset.
- Os comandos de áudio têm 4 BGS (`People1`, `Drips`, `Wind1`, `Darkness`), 2
  ME (`Musical1`, `Organ`) e 4 SE (`Item3`, `Door1`, `Collapse1`, `Water1`),
  totalizando 10 nomes únicos. Todos os `.ogg` correspondentes existem em
  `audio/bgs`, `audio/me` ou `audio/se`; os comandos vazios de parada foram
  excluídos da contagem de assets.
- Nomes de imagem serializados não contêm caminho, extensão, escape ou
  expressão. Nomes compostos no QA e escolhas feitas em runtime não podem ser
  certificados por esta leitura; a ausência dessa inferência não é um erro de
  pacote.

## Imports e resíduos

O pacote atual não importa `native-layout.mjs`, `revise-layout.mjs` ou
`validate-content.mjs` em `rpg-maker/tools`, `rpg-maker/qa`, helpers ou suites.
`native-inventory.mjs:19-20` verifica intencionalmente a ausência do manifesto e
`native-diagnostics.mjs:33` verifica intencionalmente a ausência de
`expeditionQA`; esses usos negativos devem permanecer. `native-files.mjs` só
exporta `hash` e `localAssets` (`rpg-maker/tools/native-files.mjs:5-17`), usados
por `content.mjs:10` e `native-inventory.mjs:5`, respectivamente.

Uma passagem lexical dos imports encontrou estes nomes presentes somente no
próprio import; são resíduos candidatos, para confirmar antes de remover:

| Arquivo:linha | Import não usado detectado |
| --- | --- |
| `rpg-maker/tools/native-files.mjs:2` | `readFile` de `node:fs/promises` |
| `rpg-maker/tests/suites/diagnostics.mjs:5` | `complete` |
| `rpg-maker/tests/suites/encounters.mjs:6` | `catalog` |
| `rpg-maker/tests/suites/memorial.mjs:3` | `activate` |
| `rpg-maker/tests/suites/native-audio.mjs:7-8` | `frames`, `titleReady`, `click` |
| `rpg-maker/tests/suites/native-controls.mjs:7` | `titleReady` |
| `rpg-maker/tests/suites/native-diagnostics.mjs:3` | `pause` |
| `rpg-maker/tests/suites/native-inventory.mjs:3` | `readFile` |
| `rpg-maker/tests/suites/persistence.mjs:8,10-11` | `events`, `closingReady`, `installClosing`, `click` |
| `rpg-maker/tests/suites/sacrifice.mjs:6` | `events` |

Não foram detectados imports sem uso nos helpers. As injeções de
`nativeLayoutVersion` em `formation.mjs:383` e `persistence.mjs:343` são
fixtures de compatibilidade que verificam que campos desconhecidos não bloqueiam
o save; não são consumidores de runtime e estão descritas em
`audit-task14-responsibilities.md:51`.

Fora do pacote executável, documentos e scripts históricos ainda citam os CLIs
antigos (por exemplo `docs/qa/guides/native-mz-cycle.md:3,12` e arquivos
arquivados em `planos/tasks/vn-slot-authorship/`). Esses textos têm marcação de
histórico/supersessão e não aparecem como imports do runtime atual. O resíduo
que afeta uma instrução viva é `docs/_memory/spec-authoring-playbook.md:48`,
que ainda diz “Continue requires a compatible native revision”; isso contradiz
o contrato atual sem gate de revisão em
`planos/tasks/eventbridge-minimal-runtime/eventbridge-minimal-runtime.programacao.md:147`
e `rpg-maker/README.md:83-85`. Atualizar essa linha é pendência documental
antes de afirmar V-013 completo.

## Engine e vendor

O comando de diff acima retornou vazio para `js/rmmz_*`, `js/libs/**` e fontes
`js/plugins/VisuMZ*`. O estado modificado contém dados nativos, configuração
gerada `js/plugins.js`, plugins `Dryland_*`, Presentation, ferramentas/QA,
documentação e novos assets do memorial; não há alteração detectada em engine,
vendor ou fonte VisuStella. Esta conclusão é somente sobre os caminhos
inspecionados pelo comando e não substitui a revisão de conteúdo/arte.

## Resultado para task 14

Os grafos de chamadas CE, transferências de mapa, pares de comandos e assets
literais/preload estão fechados estaticamente: nenhum alvo ou arquivo ausente
foi encontrado. Antes do fechamento, remover ou justificar os imports da tabela
e corrigir a frase de revisão no playbook vivo. A auditoria não certifica
execução de cenas, carregamento assíncrono, input, áudio audível, layout visual,
Continue real ou aceites humanos; esses sinais continuam pertencendo às
suítes/QA e às responsabilidades indicadas na task.

## Disposição após a auditoria

O executor confirmou lexicalmente cada import listado (uma única ocorrência, na declaração) e removeu os nomes sem uso. A orientação viva de persistência no playbook agora descreve seleção nativa/current-file e compatibilidade estrutural sem gate de revisão. Nenhum comportamento de jogo mudou nessa limpeza. Sintaxe e regressão corrigida serão registradas na task14; o escopo somente leitura e os limites da auditoria original permanecem.
