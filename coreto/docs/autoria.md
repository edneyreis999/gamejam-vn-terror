# Operar a CLI

Execute na raiz deste projeto com Node 22.23.2+. `<jogo>` é o caminho informado no [índice](../README.md). Informe esse caminho nas operações sobre o jogo. A CLI não exige npm nem o editor aberto. Nos exemplos de shell, substitua `"<jogo>"` pelo caminho entre aspas simples; dentro dele, represente uma aspa simples por `'\''`.

## Descobrir antes de escrever

```sh
node coreto/tools/coreto/cli.mjs --help --json
node coreto/tools/coreto/cli.mjs message --help --json
node coreto/tools/coreto/cli.mjs message api list --json
node coreto/tools/coreto/cli.mjs message api describe /General/MessageRows --json
```

Os catálogos funcionam sem um jogo selecionado. `api describe` aceita ID, nome ou caminho publicado; consulte contexto, dependências, disponibilidade e formato dos valores. Uma API de runtime descrita não implica uma operação executável pela CLI. Não invente comandos a partir de nomes de métodos.

| Namespace | Recursos |
| --- | --- |
| `core` | Configuração central, comandos, tags e validação estática do jogo |
| `message` | Mensagens, escolhas, comandos, tags, textos e tabelas de idiomas |
| `vn` | Bustos, movimento, efeitos, comandos e validação VN |
| `ext-message` | Auto/avanço rápido, console, menus e escapes estendidos |
| `ani-message` | Efeitos animados de texto e presets |
| `options` | Categorias, controles, opções e textos de ajuda |
| `save` | Saves, autosave, comandos e globais |
| `picture-choices` | Escolhas gráficas |
| `choice-common-events` | Common Events associados a escolhas |
| `attached-pictures` | Pictures anexadas |
| `event-title-scene` | Título dirigido por evento |
| `message-visibility` | Visibilidade das janelas de mensagem |
| `config` | Migração da configuração existente, sem ativar plugins |

Cada namespace de plugin publica `api list`, `api describe`, `install` e operações de parâmetros. Grupos adicionais variam: consulte `<namespace> --help --json` para a superfície exata. Prefira descritores específicos a carregar os JSON completos de `coreto/src/`.

## Preparar configuração e ativação

Inspecione `<jogo>/js/plugins.js` e ative os plugins necessários:

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" core install --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core install --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" message install --json
```

Execute somente as escritas necessárias à tarefa. `inherit` lê os parâmetros da entrada original, mesmo desativada; `own` usa a entrada Coreto. `install` materializa a configuração e ativa somente o plugin solicitado; não instala dependências nem recompila bundles. Não troque manualmente o seletor para copiar parâmetros.

Na composição completa, a ordem é Core → Message → Options → Save → Extended → PictureChoices → VN → Ani → Choice → Attached → EventTitle → Visibility. Ative apenas o necessário e confira as dependências do catálogo. Plugins originais não acompanham o pacote; não ative providers concorrentes. SkillsStatesCore é uma dependência externa de recursos específicos, não uma parte da Coreto entregue.

## Ler, simular, escrever e conferir

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters get --path /Gold/GoldMax --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters set --path /Gold/GoldMax --value 500000 --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters set --path /Gold/GoldMax --value 500000 --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" core parameters get --path /Gold/GoldMax --json
```

`--value` recebe JSON, inclusive aspas de strings. Nas operações que aceitam `--input`, um arquivo JSON evita erros de escape do shell. Use `--dry-run` quando disponível, leia o diff e consulte o alvo depois da escrita. Reabra o editor e reinicie o playtest para observar a configuração efetiva.

Mapas, eventos e páginas precisam existir. A CLI não cria genericamente a estrutura do jogo. Exemplos de seletores: `map:1/event:1/page:1`, `common-event:1`, `troop:1/page:1`; IDs são os reais do jogo. Índices de comandos são base zero; páginas usam o seletor documentado. Use `commands list` para obter posição, indentação e hash antes de inserir ou atualizar. Operações com `--expected-hash` rejeitam um alvo modificado desde a consulta. Releia o alvo após conflito ou interrupção; não repita uma escrita às cegas.

Tags são editadas pelos grupos `tags`; Mostrar Texto usa `text`; idiomas usam `message language`. Consulte a ajuda de cada grupo para valores, limites e alvos. Funções JavaScript autoradas são analisadas sem execução pela CLI; seu efeito exige playtest.

## Validar e executar

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" core validate --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" vn validate --json
node coreto/tools/dev/server.mjs --project "<jogo>"
```

Use `vn validate` somente quando VN fizer parte da configuração. Leia `result.valid` e os diagnósticos; uma resposta JSON válida não comprova configuração válida. A validação inspeciona presença dos arquivos necessários, referências e configuração sem executar o jogo. Não recompila nem compara bundles Coreto com fontes; sucesso não certifica integridade ou comportamento da engine. Personalizações seguem [extensões](extensoes.md).

O servidor oferece os serviços locais de metadados usados pela exportação de textos e pelo editor de coordenadas de pictures. Os arquivos resultantes ficam em `<jogo>/.RPGMakerMZ-metadata/`. Use a URL impressa pelo servidor; outro servidor estático pode não oferecer esses serviços.

Com `--json`, leia `ok`, `operation`, `target`, `result` ou `error`. Códigos usuais: 0 sucesso, 2 entrada inválida, 3 alvo ausente, 4 conflito, 5 falha de I/O, 6 capacidade indisponível. A ajuda do namespace especifica os casos aplicáveis. Validação estática não comprova aparência, áudio ou jornadas: use [QA](qa.md).

## Atualizar uma configuração antiga

Se o registry veio de uma versão anterior sem seletores explícitos, consulte `config migrate --help --json` e simule a normalização antes de salvar no editor:

```sh
node coreto/tools/coreto/cli.mjs --project "<jogo>" config migrate --dry-run --json
node coreto/tools/coreto/cli.mjs --project "<jogo>" config migrate --json
```

A migração preserva valores, ordem e ativação; um registry já normalizado não é reescrito.
