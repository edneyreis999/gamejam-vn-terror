import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

// O jogo guarda a chave (`$[chave]`) em $gameMessage e só traduz ao exibir, no idioma escolhido
// pelo jogador (inglês por padrão). Os testes de conteúdo comparam a prosa em português, então o
// navegador de teste fixa o idioma em Portuguese e devolve o texto já resolvido por allText(),
// com a mesma função de tradução do jogo.
export const portugueseMessageText = `(() => {
  const timer = setInterval(() => {
    if (!window.Game_Message || !window.TextManager || !TextManager.parseLocalizedText || !window.ConfigManager) return;
    clearInterval(timer);
    Object.defineProperty(ConfigManager, 'textLocale', { get: () => 'Portuguese', set: () => {}, configurable: true });
    const raw = Game_Message.prototype.allText;
    Game_Message.prototype.allText = function () { return TextManager.parseLocalizedText(raw.call(this)); };
  }, 5);
})();`;

const waitMs = Number(process.env.DRYLAND_QA_WAIT_MS) || 20000;

// Interface comum aos runtimes: recebe só o envio de comandos CDP e a lista de exceções da página.
export function browserControls(call, exceptions) {
  async function evaluate(expression) {
    const response = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (response.exceptionDetails) throw new Error(response.exceptionDetails.exception?.description || response.exceptionDetails.text);
    return response.result.value;
  }
  async function waitFor(expression, timeoutMs = waitMs) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (exceptions.length) throw new Error(JSON.stringify(exceptions));
      const nativeError = await evaluate('window.Graphics?._errorPrinter?.textContent || ""');
      if (nativeError) throw new Error(`Native engine error: ${nativeError}`);
      if (await evaluate(expression)) return;
      await delay(50);
    }
    const state = await evaluate(`({scene:SceneManager._scene?.constructor.name,map:window.$gameMap?.mapId(),phase:window.$gameSystem?._dryland?.campaign.phase,text:window.$gameMessage?.allText(),speaker:window.$gameMessage?.speakerName(),persistence:window.$gameTemp?._drylandPersistence,choices:window.$gameMessage?.choices(),pause:SceneManager._scene?._messageWindow?.pause,wait:SceneManager._scene?._messageWindow?._waitCount})`);
    throw new Error(`Native state not reached: ${expression}; observed ${JSON.stringify(state)}`);
  }
  async function press(key, keyCode) {
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key, code: key, windowsVirtualKeyCode: keyCode });
    await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key, code: key, windowsVirtualKeyCode: keyCode });
    await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  }
  async function screenshot(file) {
    const result = await call('Page.captureScreenshot', { format: 'png' });
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, Buffer.from(result.data, 'base64'));
  }
  return { evaluate, waitFor, press, screenshot };
}
