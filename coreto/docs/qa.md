# Testar o jogo real

Escreva cenários e casos do jogo fora de `coreto/`, por exemplo em `docs/qa/`. Registre a jornada, o estado inicial, os inputs e o resultado esperado antes de coletar evidências.

## Preparar uma cópia e o runner

Na raiz deste projeto, com Node 22.23.2+, use `<jogo>` informado no [índice](../README.md). Instale as dependências do runner somente quando precisar de QA no navegador:

```sh
npm ci --prefix coreto/tools/qa/runner
node coreto/tools/qa/runner/node_modules/playwright/cli.js install chromium ffmpeg
node coreto/tools/qa/game-adapter.mjs --project "<jogo>" --output .artifacts/game-qa/ensaio-01
```

O padrão é o Chromium completo do Playwright em headless, preparado pelo comando acima. Não altere os manifests entregues para configurar o seu jogo.

O preparador copia o runtime, dados, registry, assets usuais e tabelas CSV/TSV da raiz, preservando eventos e posição inicial. Exclui saves e metadados de sessão. Use um destino novo, fora do jogo. Se o jogo usa assets fora das árvores usuais, crie um adapter próprio fora de `coreto/`; o código entregue continua congelado.

## Criar um caso

O caso é um módulo `.mjs` com `scenario`, `execute(context)` e `verify(context)`. Este exemplo verifica o mapa inicial depois de Novo Jogo. A composição visual tem roteiro e resultado de playtest próprios. Adapte a jornada se seu jogo usa outra tela inicial. Salve como `docs/qa/cases/novo-jogo.mjs` e descreva o esperado em `docs/qa/scenarios/novo-jogo.md`, na seção `Resultado esperado`.

```js
import assert from 'node:assert/strict';

export const scenario = {
  id: 'novo-jogo',
  browser: {width: 1280, height: 900, dpr: 1, locale: 'pt-BR', channel: 'chromium', headless: true},
  requires: ['browser', 'visual', 'public-input'],
  criteria: [{id: 'entrada', variant: 'principal',
    expectedRef: 'docs/qa/scenarios/novo-jogo.md#resultado-esperado'}]
};

export async function execute({wait, read, input, captureState, descriptor}) {
  await wait(() => SceneManager._scene?.constructor.name === 'Scene_Title' &&
    SceneManager._scene._commandWindow?.isOpenAndActive());
  await input.key('Enter');
  await wait(() => SceneManager._scene?.constructor.name === 'Scene_Map' &&
    SceneManager._scene.isStarted() && !SceneManager.isSceneChanging() &&
    SceneManager._scene._fadeDuration === 0 && ImageManager.isReady());
  const mapId = await read('mapa-inicial', () => $gameMap.mapId());
  assert.equal(mapId, descriptor.startState.mapId);
  await captureState('entrada');
}

export async function verify({artifacts}) {
  return {
    criteria: [{...scenario.criteria[0], status: 'pass',
      evidence: artifacts.filter(item => item.id === 'entrada').map(item => item.path),
      limits: ['Comprova o mapa inicial após Novo Jogo; composição e áudio têm playtest separado.']}],
    pendingReviews: []
  };
}
```

`read` observa estado auxiliar; não use essa função nem `wait` para escrever switches, teleportar, iniciar cenas ou avançar o interpreter. Faça a jornada por input público. A captura não substitui a assertiva de estado, e a assertiva não aprova os pixels.

## Executar e interpretar

```sh
mkdir -p docs/qa/runs/ensaio
node coreto/tools/qa/runner/directed-browser.mjs --project . --fixture .artifacts/game-qa/ensaio-01 --case docs/qa/cases/novo-jogo.mjs --adapter coreto/tools/qa/game-adapter.mjs --output docs/qa/runs/ensaio/run-01
```

No runner, `--project .` indica a raiz externa deste projeto (a pasta que contém `coreto/`), `--fixture` o jogo copiado e `--output` um diretório novo fora da fixture; seu pai deve existir. Caminhos de caso e adapter partem do diretório de trabalho. Na CLI e no servidor, `--project` aponta para o jogo, não para essa raiz externa. Cada execução abre navegador/contexto próprios e encerra os recursos que iniciou.

Leia `report.json`, inclusive `status`, `criteria`, `pendingReviews`, `errors`, `network` e `cleanup`. Código de saída 0 pode significar coleta concluída com inspeção pendente. Erros inesperados e falhas de limpeza precisam ser diagnosticados. Preserve a primeira execução falha e produza uma nova coleta somente depois de mudar uma hipótese, correção ou input relevante.

Avalie composição, ritmo, conforto e intenção artística em playtest separado. Asserções automáticas aprovadas não atribuem aceite humano. Para uma investigação visual explícita, passe `--diagnostic "motivo"` e use `shot(id)`; remova as imagens quando resolver o problema. A rotina não persiste screenshots.

## Recursos do contexto

| Recurso | Uso |
| --- | --- |
| `input.key(key)`, `keyDown`, `keyUp` | Teclado público; solte teclas mantidas antes de reiniciar |
| `input.pointer.move/down/up/wheel` | Mouse e rolagem; `wheel(deltaX, deltaY)` |
| `input.touch.start/move/end` | Toque; exige `browser.hasTouch: true` |
| `wait(fn, arg)` | Aguarda condição de leitura a cada frame, com timeout |
| `read(label, fn, arg)` | Registra observação auxiliar; funções são executadas no browser sem closure Node |
| `captureState(id)` | Registra observações e inputs em JSON; IDs únicos por run |
| `shot(id)` | PNG temporário; exige motivo explícito em `--diagnostic` |
| `reopenPage()` | Nova página no mesmo contexto |
| `reopenContext()` | Novo contexto preservando o storage capturado; depois faça Load pela UI |
| `storage.capture(id)` | Captura storage real; exige `scenario.storage.expectedRef` |
| `audio.start(id, sourceId)`, `audio.stop()` | Grava fonte declarada; ver preparação abaixo |
| `report`, `descriptor` | Resultados e inventário do jogo, incluindo posição inicial |

`browser.recordVideo: true` registra vídeo sem áudio quando o diagnóstico ou playtest o exige. O headless usa saída virtual de áudio do Chromium, preservando WebAudio e captura de amostras; o relatório identifica `audioOutput: virtual`. Declare `browser.audioOutput: 'system'` quando o sensor exigir o dispositivo físico; esse é o padrão em headed. `browser.timeoutMs`, `executionTimeoutMs` e `cleanupTimeoutMs` controlam limites de observação, jornada e limpeza; escolha valores pelo comportamento esperado, não para esconder travamentos.

Para áudio, declare `scenario.audioSources` como um objeto por ID, por exemplo `{master: {path: "WebAudio._masterGainNode", expectedRef: "docs/qa/scenarios/audio.md#esperado"}}`, apontando para um AudioNode existente. Use `audio.start("trecho-01", "master")`. Declare `requires: ['audio-capture', ...]` e use um adapter do jogo que confirme essa capacidade em `describe`; o adapter básico declara somente browser, visual e input público. `audioFormat: 'webm'` usa MediaRecorder; o padrão é WAV. A fonte deve existir depois de uma ação pública que desbloqueie o áudio. Grave, encerre, ouça e registre a avaliação.

`verify` retorna `criteria` e `pendingReviews`. Cada critério usa `id`, `variant`, `expectedRef`, `status`, `evidence` e `limits`. Estados: `pass`, `fail`, `pending`, `blocked`, `not-executed`, `executed-awaiting-review`. `pass` exige evidência registrada pelo runner; IDs e variantes devem corresponder a `scenario.criteria`.

## Adaptar sem alterar a Coreto

Adapters locais podem reutilizar `prepare`, `describe` e `start` de `coreto/tools/qa/game-adapter.mjs`. `prepare` cria a cópia; `describe({fixture})` retorna arquivos com hashes, destinos mutáveis, capacidades e estado inicial; `start({fixture})` retorna `{url, close}` do servidor local. Declare `sourceFiles` nos adapters e casos quando houver helpers adicionais, para incluí-los na proveniência do run.

Importar checkpoints anteriores exige verificar sua origem e identidade antes do boot; o adapter básico não faz essa importação. Salve pela UI, capture storage, reinicie e carregue pela UI para testar persistência. Não fabrique um save equivalente ao estado que pretende comprovar.

Casos avançados podem declarar `scenario.publicCommands` e usar `input.publicCommand(path, args)` para APIs públicas; isso não comprova que a mesma operação é alcançável pela interface. Falhas de I/O controladas usam `scenario.faultIds`, `faults[id]` com `expectedRef` e `fault(id, enabled)`, somente na cópia isolada e com restauração. Consulte os fontes do runner apenas para a interface avançada necessária, sem editá-los.

Para a cobertura do jogo, priorize entrada e continuidade de eventos, escolhas, transferências, extensões locais, save/load e a apresentação atingida pela mudança. Registre cenários, bugs e testes do jogo em sua estrutura própria. Browser não substitui editor, NW.js ou dispositivos físicos quando esses forem o alvo da entrega.

## Eventos, movimento e saves

Ao usar Events & Movement, teste dois eventos que compartilham um nome Self, uma rota com espera, transferência e retorno ao mapa. Confira condições de escolhas, anexos e consumidores ativados durante a mesma jornada. Salve pelo menu, feche o jogo e use Continue antes de repetir a interação; Novo Jogo deve começar com dados próprios novos.

Execute rotas personalizadas no Playtest: a prévia de rotas do editor não interpreta essa gramática. Para doodads, use o Playtest iniciado pelo MZ, F10 e Save and Close; depois reabra o editor e confirme o layout persistido. Colisão por região e decoração são verificações separadas. Faça essas edições em uma cópia descartável e feche o editor antes de alterar seus dados por CLI.
