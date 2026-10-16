import assert from 'node:assert/strict';

// Directed QA only: public inputs are forwarded unchanged; observations never
// assign campaign, pictures, interpreter state or read history.
export async function observePresentation(context, execute, { portuguese = false } = {}) {
  const captured = new Set();
  const stages = new Set();
  let serial = 0;
  let localeSelected = false;
  const input = { ...context.input, key: async (...args) => {
    const before = await context.read('presentation-before-input', () => ({
      paused: Boolean(SceneManager._scene?._messageWindow?.pause),
      active: Boolean(SceneManager._scene?._choiceListWindow?.isOpenAndActive()),
      group: $gameMessage?._drylandChoiceFocus?.key,
      text: $gameMessage?.allText(), topic: $gameSystem?._dryland?.campaign?.activeSocialTopicId,
      busts: [60, 61, 62, 63].map(id => { const p = $gameScreen?.picture(id); return p ? { id, name: p.name(), opacity: p.opacity(), scale: p.scaleX() } : null; }).filter(Boolean)
    }));
    if (before.active && ['formation', 'camp'].includes(before.group) && !stages.has(before.group)) {
      if (portuguese && !localeSelected) {
        const original = await context.read('stage-focus-before-options', () => SceneManager._scene._choiceListWindow.index());
        const target = await context.read('options-choice', () => SceneManager._scene._choiceListWindow._list.findIndex(item => $gameMessage.choices()[item.ext].includes('☰')));
        assert.ok(target >= 0);
        for (let n = 0; n < 20; n++) {
          const current = await context.read('stage-focus', () => SceneManager._scene._choiceListWindow.index());
          if (current === target) break;
          await context.input.key(current < target ? 'ArrowDown' : 'ArrowUp');
        }
        await context.input.key('Enter');
        await context.wait(() => SceneManager._scene instanceof Scene_Menu && SceneManager._scene._commandWindow?.active && !SceneManager._scene.isBusy());
        const menuOption = await context.read('native-options-command', () => SceneManager._scene._commandWindow._list.findIndex(item => item.symbol === 'options'));
        assert.ok(menuOption >= 0);
        for (let n = 0; n < 10; n++) {
          const current = await context.read('native-menu-focus', () => SceneManager._scene._commandWindow.index());
          if (current === menuOption) break;
          await context.input.key(current < menuOption ? 'ArrowDown' : 'ArrowUp');
        }
        await context.input.key('Enter');
        await context.wait(() => SceneManager._scene instanceof Scene_Options && !SceneManager._scene.isBusy());
        for (let n = 0; n < 80; n++) {
          const option = await context.read('locale-option-focus', () => {
            const w = SceneManager._scene._optionsWindow;
            return { current: w.index(), target: w._list.findIndex(item => item.symbol === 'textLocale') };
          });
          if (option.target < 0) { await context.input.key('PageDown'); continue; }
          if (option.current === option.target) break;
          await context.input.key(option.current < option.target ? 'ArrowDown' : 'ArrowUp');
        }
        await context.input.key('ArrowRight');
        assert.equal(await context.read('selected-language', () => ConfigManager.textLocale), 'Portuguese');
        await context.input.key('Escape');
        await context.wait(() => SceneManager._scene instanceof Scene_Menu && SceneManager._scene._commandWindow?.active && !SceneManager._scene.isBusy());
        await context.input.key('Escape');
        await context.wait(() => SceneManager._scene._choiceListWindow?.isOpenAndActive());
        for (let n = 0; n < 20; n++) {
          const current = await context.read('restored-stage-focus', () => SceneManager._scene._choiceListWindow.index());
          if (current === original) break;
          await context.input.key(current < original ? 'ArrowDown' : 'ArrowUp');
        }
        localeSelected = true;
      }
      stages.add(before.group);
      await context.shot(before.group + '-nameplates');
      await context.input.key('Tab');
      await context.wait(() => SceneManager._scene._messageWindow.scale.x === 0);
      await context.shot(before.group + '-nameplates-hidden');
      await context.input.key('Tab');
      await context.wait(() => SceneManager._scene._messageWindow.scale.x === 1);
    }
    if (args[0] !== 'Enter' || !before.paused || !before.topic) return context.input.key(...args);
    if (!captured.has(before.text)) {
      captured.add(before.text);
      await context.shot('social-composition-' + (++serial));
    }
    const [frames] = await Promise.all([
      context.read('social-bust-continuity', async () => {
        const result = [];
        for (let n = 0; n < 35; n++) {
          await new Promise(resolve => requestAnimationFrame(resolve));
          result.push({ frame: Graphics.frameCount, topic: $gameSystem._dryland.campaign.activeSocialTopicId,
            busts: [60, 61, 62, 63].map(id => { const p = $gameScreen.picture(id); return p ? { id, name: p.name(), opacity: p.opacity() } : null; }).filter(Boolean) });
        }
        return result;
      }),
      context.input.key(...args)
    ]);
    for (const frame of frames.filter(f => f.topic === before.topic)) {
      for (const bust of before.busts) {
        const current = frame.busts.find(p => p.id === bust.id);
        assert.equal(current?.name, bust.name, 'A continuing participant must remain in its slot.');
        assert.ok(current.opacity >= bust.opacity, 'Changing reading segments must not fade out a continuing participant.');
      }
    }
  }};
  await execute({ ...context, input });
}
