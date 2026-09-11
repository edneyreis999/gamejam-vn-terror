// Suite: authored content boundaries and native passage presentation.
// IN: native JSON, real parser/CLI/rules; actual Chrome, MZ and vendors for IT-004/035.
// OUT: later feature transcription, native saves, complete campaign and human acceptance.
import assert from 'node:assert/strict';
import { nativeBustRecipe } from '../helpers/native-content.mjs';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { cp, mkdtemp, readFile, readdir, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { canonicalCase, assertRegistrations, manifest } from '../helpers/canonical-cases.mjs';
import { openChrome, project, startServer } from '../helpers/native-chrome.mjs';
import { hash, layoutErrors, localAssets, nativeFiles } from '../../tools/native-layout.mjs';
import { assertNativeContent } from '../helpers/native-content.mjs';
import { appendEnsemble, ensembleFixture, prepareBustFixture, setFixtureFocus } from '../helpers/native-bust-fixture.mjs';
import { parsePluginList, readPluginParameters } from '../../tools/plugin-settings.mjs';
import { click } from '../helpers/native-shared.mjs';
import { activate, choices, pause } from '../helpers/formation.mjs';

const require = createRequire(import.meta.url);
const { parseEventCatalog, deriveVisualComposition, parseFocusParameters } = require('../../The Dryland Drowned/js/plugins/Dryland_EventBridge.js');
const { createRules } = require('../../The Dryland Drowned/js/plugins/Dryland_CampaignRules.js');
const clone = value => structuredClone(value);
const original = JSON.parse(await readFile(path.join(project, 'data/CommonEvents.json'), 'utf8'));
const system = { ...JSON.parse(await readFile(path.join(project, 'data/System.json'), 'utf8')), drylandAssets: await localAssets(project) };
const command = (code, parameters, indent = 0) => ({ code, indent, parameters });
const comment = line => command(108, [line]);
const end = () => command(0, []);
function section(id, text = 'Texto de teste.', extra = []) {
  return [comment(`@dryland-section ${id}`), comment(`@passage ${id}`), comment('@speaker narrator'),
    comment('@status confirmed'), comment('@source fixture'), ...extra,
    command(101, ['', 0, 0, 2, '']), command(401, [text]), comment('@dryland-end')];
}
function fixture(...commands) {
  const events = [null, clone(original[1])];
  events.push({ id: events.length, name: 'Fixture', trigger: 0, switchId: 1, list: [...commands, end()] });
  return events;
}
function removeSection(events, id) {
  for (const event of events.filter(Boolean)) {
    const start = event.list.findIndex(c => c.code === 108 && c.parameters[0] === `@dryland-section ${id}`);
    if (start < 0) continue;
    const end = event.list.findIndex((c, index) => index > start && c.code === 108 && c.parameters[0] === '@dryland-end');
    event.list.splice(start, end - start + 1);
  }
  return events;
}
const parse = events => parseEventCatalog(events, system);
const errors = (events, expected) => assert.deepEqual(parse(events).violations, expected);
function cli(args) {
  const result = spawnSync(process.execPath, ['rpg-maker/tools/validate-content.mjs', ...args], { encoding: 'utf8' });
  assert.ifError(result.error);
  assert.equal(result.stderr, '');
  return { code: result.status, output: JSON.parse(result.stdout), stdout: result.stdout };
}

canonicalCase('UT-047', 'native sections resolve stable identities without copying prose into the rule catalog', async () => {
  const result = parse(original);
  assert.deepEqual(result.violations, []);
  assertNativeContent(original, result);
  assert.deepEqual(result.catalog.scenes.prologue.passageIds, ['prologue.01', 'prologue.02', 'irati.01']);
  for (const id of result.catalog.scenes.prologue.passageIds) {
    const location = result.locations[id];
    assert.equal(location.commonEventId, 1);
    assert.ok(original[1].list.slice(location.start, location.end).some(c => c.code === 401));
    assert.deepEqual(Object.keys(result.catalog.passages[id]).sort(), ['id', 'source', 'speakerId', 'status']);
  }
  assert.ok(!JSON.stringify(result.catalog).includes('A chuva acompanha'));
  assert.ok(Object.isFrozen(result.catalog.scenes.prologue.passageIds));
  const multiline = clone(original);
  const location = result.locations['prologue.01'];
  for (const c of multiline[1].list.slice(location.start + 1, location.end)) {
    if (c.code === 108) c.code = 408;
    else break;
  }
  assert.deepEqual(parse(multiline).violations, []);
  assert.deepEqual(parse(multiline).catalog, result.catalog);

  // Separate realms expose missing runtime APIs without changing Node's globals.
  for (const unavailable of [['Object.hasOwn'], ['Array.prototype.at'], ['Object.hasOwn', 'Array.prototype.at', 'Array.prototype.findLastIndex']]) {
    const context = vm.createContext({ eventsJson: JSON.stringify(original), systemJson: JSON.stringify(system) });
    vm.runInContext(unavailable.map(api => `delete ${api};`).join('\n'), context);
    for (const name of ['Dryland_CampaignRules', 'Dryland_EventBridge']) {
      const filename = path.join(project, 'js/plugins', `${name}.js`);
      vm.runInContext(await readFile(filename, 'utf8'), context, { filename });
    }
    const observed = JSON.parse(vm.runInContext(`JSON.stringify((() => {
      const parsed = DrylandEventBridge.parseEventCatalog(JSON.parse(eventsJson), JSON.parse(systemJson));
      const rules = DrylandCampaignRules.createRules(parsed.catalog);
      const started = rules.dispatch(rules.createReadyState(), { type: 'BEGIN', seed: 0, expectedSequence: 0 });
      return {
        violations: parsed.violations,
        passages: parsed.catalog.scenes.prologue.passageIds,
        started: started.ok,
        phase: started.state.phase,
        valid: rules.validateState(started.state).ok,
        inheritedAction: DrylandEventBridge.validateBridgeAction({ action: 'toString', value: '' }).ok
      };
    })())`, context));
    assert.deepEqual(observed, {
      violations: [], passages: ['prologue.01', 'prologue.02', 'irati.01'],
      started: true, phase: 'intro', valid: true, inheritedAction: false
    }, unavailable.join(', '));
  }
});

canonicalCase('UT-048', 'duplicates and missing required sections report one primary defect', () => {
  errors(fixture(...section('farewell.H1'), ...section('farewell.H1')), [{ code: 'duplicate_section', id: 'farewell.H1' }]);
  errors(removeSection(clone(original), 'prologue.01'), [{ code: 'missing_section', id: 'prologue.01' }]);
  const missing = removeSection(clone(original), 'prologue.01');
  assert.throws(() => assertNativeContent(missing, parse(missing)), assert.AssertionError);
  const reordered = clone(original);
  const declaration = reordered[1].list.find(c => c.code === 108 && c.parameters[0].startsWith('@scene '));
  const scene = JSON.parse(declaration.parameters[0].slice(7));
  scene.passageIds.reverse();
  declaration.parameters[0] = `@scene ${JSON.stringify(scene)}`;
  assert.deepEqual(parse(reordered).violations, []);
  assert.throws(() => assertNativeContent(reordered, parse(reordered)), /scene order: prologue/);
});

canonicalCase('UT-049', 'empty and unclosed ranges fail without escaping their native section', () => {
  const empty = clone(original);
  const position = parse(empty).locations['prologue.01'];
  for (const c of empty[1].list.slice(position.start, position.end)) if (c.code === 401) c.parameters[0] = '';
  errors(empty, [{ code: 'missing_text', id: 'prologue.01' }]);
  const unclosed = clone(original);
  unclosed[1].list.splice(position.end, 1);
  errors(unclosed, [{ code: 'unclosed_section', id: 'prologue.01' }]);
});

canonicalCase('UT-050', 'executable text escapes in public profiles are rejected without evaluation', () => {
  delete globalThis.drylandUnsafeExecuted;
  errors(fixture(...section('profile.H1', '\\JS[globalThis.drylandUnsafeExecuted = true]')), [{ code: 'unsafe_text', id: 'profile.H1' }]);
  assert.equal(globalThis.drylandUnsafeExecuted, undefined);
});

canonicalCase('UT-051', 'scripts and mutation commands cannot run inside content ranges', () => {
  for (const c of [command(355, ['globalThis.drylandUnsafeExecuted = true']), command(201, [0, 3, 10, 7, 2, 0]),
    command(357, ['Dryland_EventBridge', 'Action', '', { action: 'BEGIN' }])]) {
    errors(fixture(...section('profile.H1', 'Perfil público.', [c])), [{ code: 'unsupported_content_command', id: 'profile.H1' }]);
  }
  assert.equal(globalThis.drylandUnsafeExecuted, undefined);
  for (const code of [231, 232, 234, 235]) {
    errors(fixture(...section('profile.H1', 'Perfil.', [command(code, [])])), [{ code: 'unsupported_content_command', id: 'profile.H1' }]);
  }
});

canonicalCase('UT-052', 'metadata, scene references and choice counts have distinct diagnostics', () => {
  for (const [key, value, code] of [['speaker', 'H9', 'invalid_speaker'], ['status', 'approved_by_bot', 'invalid_status'],
    ['source', null, 'missing_source'], ['scene', 'unknown.scene', 'invalid_scene_reference']]) {
    const commands = section('profile.H1');
    const index = commands.findIndex(c => String(c.parameters[0]).startsWith(`@${key} `));
    if (index >= 0) commands.splice(index, 1, ...(value === null ? [] : [comment(`@${key} ${value}`)]));
    else commands.splice(5, 0, comment(`@${key} ${value}`));
    errors(fixture(...commands), [{ code, id: 'profile.H1' }]);
  }
  const choices = section('choices.A1');
  choices.splice(5, 2, command(102, [['Um', 'Dois'], -1, 0, 2, 0]), command(402, [0, 'Um']),
    command(0, [], 1), command(402, [1, 'Dois']), command(0, [], 1), command(404, []));
  errors(fixture(...choices), [{ code: 'invalid_choice_count', id: 'choices.A1' }]);
  const missingBranch = clone(original);
  const location = parse(missingBranch).locations['choices.A1'];
  const choice = missingBranch[location.commonEventId].list.slice(location.start, location.end).find(c => c.code === 102);
  choice.parameters[0].pop();
  const list = missingBranch[location.commonEventId].list;
  const lastBranch = list.findIndex((c, index) => index > location.start && index < location.end && c.code === 402 && c.parameters[0] === 2);
  const close = list.findIndex((c, index) => index > lastBranch && index < location.end && c.code === 404);
  list.splice(lastBranch, close - lastBranch);
  assert.ok(parse(missingBranch).violations.some(v => v.code === 'invalid_choice_count' && v.id === 'choices.A1'));
  assert.throws(() => assertNativeContent(missingBranch, parse(missingBranch)), assert.AssertionError);
});

canonicalCase('UT-053', 'required assets must exist inside the local project', () => {
  for (const asset of ['https://example.invalid/image.png', 'img/pictures/../../outside.png', 'img/pictures/missing-required.png']) {
    errors(fixture(...section('profile.H1', 'Perfil.', [comment(`@asset ${asset}`)])), [{ code: 'invalid_asset_reference', id: 'profile.H1' }]);
  }
  errors(fixture(...section('profile.H1', 'Perfil.', [comment('@asset img/pictures/Dryland_Taverna.png')])), []);
});

canonicalCase('UT-054', 'eight public profiles and speeches are indexed independently of private competencies', () => {
  const commands = [];
  for (let number = 1; number <= 8; number++) {
    const id = `H${number}`;
    commands.push(comment(`@hero {"id":"${id}","competencyIds":["strength","will"]}`), ...section(`profile.${id}`), ...section(`speech.${id}`));
  }
  const events = fixture(...commands);
  const result = parse(events);
  assert.deepEqual(result.violations, []);
  for (let number = 1; number <= 8; number++) {
    for (const prefix of ['profile', 'speech']) {
      const id = `${prefix}.H${number}`;
      assert.ok(result.locations[id]);
      assert.ok(!('competencyIds' in result.catalog.passages[id]));
    }
  }
  errors(removeSection(events, 'profile.H1'), [{ code: 'missing_section', id: 'profile.H1' }]);
});

canonicalCase('UT-057', 'shared lover warnings retain one identity across order variants and wording edits', () => {
  const id = 'lover.physical.warning';
  const events = clone(original);
  const before = parse(events);
  const location = before.locations[id];
  events[location.commonEventId].list.slice(location.start, location.end).find(c => c.code === 401).parameters[0] = 'Aviso revisado.';
  const after = parse(events);
  assert.deepEqual(after.violations, []);
  assert.deepEqual(after.catalog, before.catalog);
  assert.deepEqual(after.locations, before.locations);
  assert.equal(Object.keys(after.catalog.passages).filter(key => key === id).length, 1);
  for (const scene of ['lover.physical.first', 'lover.physical.second']) assert.ok(after.catalog.scenes[scene].passageIds.includes(id));
  // Already-read identity is domain data, independent of wording and scene order.
  const rules = createRules(before.catalog);
  let state = rules.dispatch(rules.createReadyState(), { type: 'BEGIN', seed: 1, expectedSequence: 0 }).state;
  while (state.reading) state = rules.dispatch(state, { type: 'COMPLETE_PASSAGE', passageId: state.reading.passageIds[state.reading.index], expectedSequence: state.sequence }).state;
  const readState = { ...clone(state), seenPassageIds: [...state.seenPassageIds, id] };
  assert.equal(createRules(after.catalog).validateState(readState).ok, true);
  assert.equal(createRules(after.catalog).snapshot(readState).seenPassages.filter(value => value === id).length, 1);
});

canonicalCase('UT-060', 'event renumbering rebuilds locations while preserving passage identity', () => {
  const moved = clone(original);
  const before = parse(moved);
  const newId = moved.length;
  moved.push({ ...moved[1], id: newId });
  moved[1] = null;
  const after = parse(moved);
  assert.deepEqual(after.violations, []);
  assert.deepEqual(after.catalog, before.catalog);
  assert.equal(after.locations['prologue.01'].commonEventId, newId);
  assert.equal(after.locations['prologue.01'].start, before.locations['prologue.01'].start);
  const mismatched = fixture(...section('farewell.H1'));
  mismatched.at(-1).id = 1;
  errors(mismatched, [{ code: 'invalid_scene_reference', id: 'farewell.H1' }]);
});

canonicalCase('IT-032', 'default content CLI succeeds and rejects unversioned native data drift', async () => {
  assert.deepEqual(cli(['--json']), { code: 0, output: { ok: true, errors: [] }, stdout: '{"ok":true,"errors":[]}\n' });
  const layout = JSON.parse(await readFile(path.join(project, 'native-layout-manifest.json'), 'utf8'));
  const files = await nativeFiles(project);
  const assets = await localAssets(project);
  assert.deepEqual(layoutErrors(layout, files, assets), []);
  for (const file of ['data/System.json', 'data/MapInfos.json', 'data/Map002.json', 'data/CommonEvents.json']) {
    assert.deepEqual(layoutErrors(layout, { ...files, [file]: hash('changed native command or wording') }, assets), [{ code: 'native_layout_mismatch' }]);
  }
  assert.deepEqual(layoutErrors(layout, files, [...assets, 'img/pictures/new-local-art.png'].sort()), [{ code: 'native_layout_mismatch' }]);
  assert.deepEqual(layoutErrors({ ...layout, assets: [] }, files, assets), [{ code: 'native_layout_mismatch' }]);
  assert.ok(!Object.keys(files).some(file => /config|save|volume/i.test(file)));
});

canonicalCase('IT-033', 'documented missing-prologue fixture reports exactly one section error', () => {
  const result = cli(['--json', '--project', 'rpg-maker/tests/fixtures/missing-prologue']);
  assert.equal(result.code, 1);
  assert.equal(result.stdout, '{"ok":false,"errors":[{"code":"missing_section","id":"prologue.01"}]}\n');
});

canonicalCase('IT-034', 'invocation errors use exact exit codes and never modify the project', async () => {
  async function inventory(directory) {
    const entries = [];
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) entries.push(...await inventory(file));
      else { const data = await stat(file); entries.push([file, data.size, data.mtimeMs]); }
    }
    return entries;
  }
  const before = await inventory(project);
  const invalid = cli(['--json', '--unknown']);
  assert.equal(invalid.code, 2);
  assert.deepEqual(invalid.output, { ok: false, errors: [{ code: 'invalid_arguments' }] });
  const missing = cli(['--json', '--project', 'rpg-maker/tests/fixtures/nonexistent-project']);
  assert.equal(missing.code, 1);
  assert.deepEqual(missing.output, { ok: false, errors: [{ code: 'project_unreadable' }] });
  assert.deepEqual(await inventory(project), before);
});

canonicalCase('IT-036', 'manifest rejects empty, missing, duplicate or mismatched registrations', () => {
  const ids = Object.values(manifest.tasks).flat();
  assert.doesNotThrow(() => assertRegistrations(manifest, ids));
  for (const [contract, registrations] of [[null, []], [{ tasks: {} }, []], [manifest, ids.slice(1)],
    [manifest, [...ids, ids[0]]], [{ tasks: { fixture: ['UT-047', 'UT-047'] } }, ['UT-047']],
    [manifest, [...ids.slice(1), 'UT-999']]]) assert.throws(() => assertRegistrations(contract, registrations));
});

async function firstPrologue(browser, label = 'Jogar') {
  await browser.waitFor(`window.$gameMessage && $gameMessage.choices().includes(${JSON.stringify(label)}) && SceneManager._scene._choiceListWindow?.isOpenAndActive() && !SceneManager._scene.isBusy()`);
  const index = await browser.evaluate(`$gameMessage.choices().indexOf(${JSON.stringify(label)})`);
  for (let step = 0; step < index; step++) await browser.press('ArrowDown', 40);
  await browser.press('Enter', 13);
  await browser.waitFor("$gameMap.mapId() === 2 && SceneManager._scene._messageWindow?.pause && SceneManager._scene._messageWindow._waitCount === 0");
}
canonicalCase('IT-004', 'Present runs the real indexed passage and commits its completion exactly once', { timeout: 60000 }, async t => {
  await startServer(t);
  const browser = await openChrome(t);
  await firstPrologue(browser);
  const before = await browser.evaluate('({text:$gameMessage.allText(),state:$gameSystem._dryland.campaign})');
  assert.match(before.text, /A chuva acompanha Ivaí/);
  assert.equal(before.state.sequence, 1);
  assert.deepEqual(before.state.seenPassageIds, []);
  const completedInterpreter = await browser.call('Runtime.evaluate', { expression: '$gameMap._interpreter._childInterpreter', returnByValue: false });
  await browser.press('Enter', 13);
  await browser.waitFor("$gameMessage.allText().includes('Minha mãe deixou registros') && SceneManager._scene._messageWindow.pause");
  await browser.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  const after = await browser.evaluate('$gameSystem._dryland.campaign');
  assert.equal(after.sequence, 2);
  assert.deepEqual(after.seenPassageIds, ['prologue.01']);
  assert.equal(after.reading.index, 1);
  assert.equal(after.history.filter(action => action.passageId === 'prologue.01').length, 1);
  const replay = await browser.call('Runtime.callFunctionOn', {
    objectId: completedInterpreter.result.objectId, functionDeclaration: 'function() { this.terminate(); }', returnByValue: true
  });
  assert.equal(replay.exceptionDetails, undefined);
  assert.deepEqual(await browser.evaluate('$gameSystem._dryland.campaign'), after);
  await browser.call('Runtime.releaseObject', { objectId: completedInterpreter.result.objectId });
  await browser.screenshot('docs/qa/evidence/init-rpg-maker-mz/task-02/IT-004/confirmed-first-passage.png');
  assert.deepEqual(browser.exceptions, []);
});

canonicalCase('IT-035', 'saved native wording appears after reload without regenerating JavaScript prose', { timeout: 90000 }, async t => {
  const directory = await mkdtemp(path.join(tmpdir(), 'dryland-authoring-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  // Clone writable native data; other runtime directories are read-only symlinks to the real installed stack.
  for (const entry of await readdir(project, { withFileTypes: true })) {
    const source = path.join(project, entry.name), target = path.join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== 'data') await symlink(source, target);
    else await cp(source, target, { recursive: true });
  }
  await startServer(t, directory);
  const browser = await openChrome(t);
  await firstPrologue(browser);
  assert.match(await browser.evaluate('$gameMessage.allText()'), /A chuva acompanha Ivaí/);
  const pluginFile = path.join(project, 'js/plugins/Dryland_EventBridge.js');
  const pluginHash = hash(await readFile(pluginFile));
  const edited = clone(original);
  const location = parse(edited).locations['prologue.01'];
  edited[1].list.slice(location.start, location.end).find(c => c.code === 401).parameters[0] = 'Texto salvo no evento nativo para verificar a releitura.';
  await writeFile(path.join(directory, 'data/CommonEvents.json'), JSON.stringify(edited));
  const layout = JSON.parse(await readFile(path.join(directory, 'native-layout-manifest.json'), 'utf8'));
  layout.nativeLayoutVersion = 'test-authoring-revision';
  layout.files = await nativeFiles(directory);
  layout.revisions[layout.nativeLayoutVersion] = hash(JSON.stringify(layout.files));
  await writeFile(path.join(directory, 'native-layout-manifest.json'), JSON.stringify(layout));
  await browser.call('Page.reload', { ignoreCache: true });
  await firstPrologue(browser, 'Novo jogo');
  assert.equal(await browser.evaluate('$gameMessage.allText()'), 'Texto salvo no evento nativo para verificar a releitura.');
  assert.equal(hash(await readFile(pluginFile)), pluginHash);
  assert.equal(await browser.evaluate('$gameSystem._dryland.nativeLayoutVersion'), 'test-authoring-revision');
  await browser.screenshot('docs/qa/evidence/init-rpg-maker-mz/task-02/IT-035/edited-native-text.png');
  assert.deepEqual(browser.exceptions, []);
});

canonicalCase('UT-067', 'native bust recipes accept literal editor commands and reject executable or malformed arguments', () => {
  const accepted = nativeBustRecipe();
  errors(fixture(...section('profile.H1', 'Perfil.', accepted)), []);
  const mutations = [
    ['namespace', list => { list[0].parameters[0] = 'Dryland_EventBridge'; }],
    ['command', list => { list[0].parameters[1] = 'Scale_ScaleReset'; }],
    ['missing key', list => { delete list[0].parameters[3]['Origin:str']; }],
    ['extra key', list => { list[0].parameters[3].extra = '0'; }],
    ...['PictureID:eval', 'StartOffsetX:eval', 'StartOffsetY:eval', 'Duration:eval'].map(key =>
      [key, list => { list[0].parameters[3][key] = '(globalThis.drylandUnsafeExecuted = true, 60)'; }]),
    ['foreign picture', list => { list[0].parameters[3]['PictureID:eval'] = '18'; }],
    ['wrong scene slot', list => { list[0].parameters[3]['PictureID:eval'] = '63'; }],
    ['missing asset', list => { list[0].parameters[3]['PictureName:str'] = 'Dryland_missing'; }],
    ['path', list => { list[0].parameters[3]['PictureName:str'] = '../Dryland_H1'; }],
    ['mirror', list => { list[0].parameters[3]['HorzMirror:str'] = 'Auto'; }],
    ['scale zero', list => { list[1].parameters[3]['TargetScaleX:str'] = '0'; }],
    ['scale huge', list => { list[1].parameters[3]['TargetScaleX:str'] = '201'; }],
    ['coordinate expression', list => { list[2].parameters[3]['TargetX:str'] = 'Graphics.width / 2'; }],
    ['coordinate bounds', list => { list[2].parameters[3]['TargetY:str'] = '1441'; }],
    ['easing', list => { list[2].parameters[3]['EasingType:str'] = 'InBounce'; }],
    ['tone expression', list => { list[4].parameters[3]['customTone:eval'] = '[globalThis.drylandUnsafeExecuted = true,0,0,0]'; }],
    ['gray bounds', list => { list[4].parameters[3]['customTone:eval'] = '[0,0,0,-1]'; }],
    ['no autoerase', list => { list[5].parameters[3]['AutoErase:eval'] = 'false'; }],
    ...['[]', '["60","60"]', '["60","61"]', '[60]', '["60+0"]', '{}'].map(value =>
      [value, list => { list[1].parameters[3]['PictureID:arrayeval'] = value; }])
  ];
  delete globalThis.drylandUnsafeExecuted;
  for (const [label, mutate] of mutations) {
    const list = clone(accepted); mutate(list);
    assert.deepEqual(parse(fixture(...section('profile.H1', 'Perfil.', list))).violations,
      [{ code: 'unsupported_content_command', id: 'profile.H1' }], label);
  }
  assert.equal(globalThis.drylandUnsafeExecuted, undefined);
  const unavailable = { ...system, drylandAssets: system.drylandAssets.filter(file => file !== 'img/pictures/Dryland_H1.png') };
  assert.deepEqual(parseEventCatalog(fixture(...section('profile.H1', 'Perfil.', accepted)), unavailable).violations,
    [{ code: 'invalid_asset_reference', id: 'profile.H1' }]);
});

canonicalCase('UT-068', 'pure native helper graphs validate untaken branches and never acquire passage completion', () => {
  const events = fixture(...section('profile.H1', 'Perfil.', [command(117, [3])]));
  const recipe = nativeBustRecipe();
  events.push({ id: 3, name: 'Presentation fixture', trigger: 0, switchId: 1, list: [comment('@dryland-presentation-helper fixture'),
    command(111, [1, 144, 0, 1, 0]), ...recipe.map(c => ({ ...c, indent: 1 })),
    command(657, ['Auto-Erase = true'], 1), command(230, [20], 1), command(0, [], 1), command(411, []),
    command(117, [4], 1), command(0, [], 1), command(412, []), end()] });
  events.push({ id: 4, name: 'Nested fixture', trigger: 0, switchId: 1, list: [comment('@dryland-presentation-helper nested'), ...recipe, end()] });
  const result = parse(events);
  assert.deepEqual(result.violations, []);
  assert.equal(result.helpers[3].name, 'fixture');
  assert.equal(result.locations['helper.3'], undefined);
  assert.equal(result.catalog.passages['helper.3'], undefined);
  const inline = clone(events);
  const root = inline[2].list, callIndex = root.findIndex(c => c.code === 117);
  root.splice(callIndex, 1, command(111, [1,144,0,0,0]), command(117,[3],1), command(0,[],1),
    command(411,[]), command(117,[4],1), command(0,[],1), command(412,[]));
  assert.deepEqual(parse(inline).violations, [], 'native inline branch with empty terminators');
  for (const orphan of [command(0,[],1), command(0,['wrong'],1)]) {
    assert.ok(parse(fixture(...section('profile.H1','Perfil.',[orphan]))).violations.length);
  }
  for (const list of ['not a list', [null], [{code:108,indent:0,parameters:null}],
    [{code:108,indent:0,parameters:'@dryland-presentation-helper malformed'}]]) {
    const malformed = clone(events); malformed[4].list = list;
    assert.ok(parse(malformed).violations.length, 'malformed helper produces a diagnostic, not an exception');
  }
  const annotations = clone(events);
  annotations[3].list.splice(annotations[3].list.findIndex(c=>c.code===230),0,command(657,['Duration = 20'],1));
  assert.deepEqual(parse(annotations).violations, []);
  const bad = [
    ['unregistered', e => { e[2].list.find(c => c.code === 117).parameters = [99]; }],
    ['recursive', e => { e[4].list.splice(1, 0, command(117, [3])); }],
    ['unknown variable', e => { e[3].list[1].parameters[1] = 22; }],
    ['script branch', e => { e[3].list[1].parameters = [12, 'true']; }],
    ['inequality', e => { e[3].list[1].parameters[4] = 1; }],
    ['projection write', e => { e[4].list.splice(1, 0, command(122, [144,144,0,0,1])); }],
    ['untaken unsafe branch', e => { e[4].list[1].parameters[3]['Duration:eval'] = 'globalThis.drylandUnsafeExecuted = true'; }],
    ['orphan annotation', e => { e[4].list.splice(1, 0, command(657, ['Duration = 20'])); }],
    ['misindented annotation', e => { e[4].list.splice(2, 0, command(657, ['Duration = 20'], 1)); }],
    ['orphan wait', e => { e[4].list.splice(1, 0, command(230, [20])); }],
    ['long wait', e => { e[3].list.find(c => c.code === 230).parameters = [61]; }],
    ['missing branch end', e => { e[3].list = e[3].list.filter(c => c.code !== 412); }],
    ['duplicate else', e => { e[3].list.splice(e[3].list.findIndex(c => c.code === 411),0,command(411, [])); }],
    ['trigger', e => { e[4].trigger = 2; }],
    ['duplicate marker', e => { e[4].list[0] = comment('@dryland-presentation-helper fixture'); }],
    ['text in helper', e => { e[4].list.splice(1, 0, command(101, ['',0,0,2,'Gorvak']), command(401,['Extra story'])); }]
  ];
  for (const [label, mutate] of bad) {
    const invalid = clone(events); mutate(invalid);
    assert.ok(parse(invalid).violations.length > 0, label);
  }
  assert.equal(globalThis.drylandUnsafeExecuted, undefined);
});

canonicalCase('UT-070','the isolated 2x2 recipe preserves its technical transcript and uses registered pure native helpers',()=>{
 const events=clone(original),id=appendEnsemble(events),parsed=parse(events);
 assert.deepEqual(parsed.violations,[]);
 assert.deepEqual(parsed.catalog,parse(original).catalog,'No added campaign prose or scene');
 assert.deepEqual(events[id].list.filter(c=>c.code===401).map(c=>c.parameters[0]),[
  'Fixture técnica 2x2 — fala 1. Sem conteúdo de campanha.',
  'Fixture técnica 2x2 — fala 2. Sem conteúdo de campanha.',
  'Fixture técnica 2x2 — fala 3. Sem conteúdo de campanha.',
  'Fixture técnica 2x2 — fala 4. Sem conteúdo de campanha.',
  'Fixture técnica 2x2 — fala 5. Sem conteúdo de campanha.'
 ]);
 assert.deepEqual(ensembleFixture.transcript.map(row=>row.slot),[60,61,63,64,64]);
 assert.equal(Object.values(parsed.helpers).filter(h=>h.name.startsWith('fixture.2x2.')).length,6);
});

canonicalCase('IT-067','editing native layout and inserting text boxes updates playback and Continue from one authored source',{timeout:90000},async t=>{
 const pluginHash=hash(await readFile(path.join(project,'js/plugins/Dryland_EventBridge.js')));
 const prepared=await prepareBustFixture(t,'fixture-native-bust-edit-20260911',events=>{
  const location=parse(events).locations['profile.H1'];
  const helper={list:events[location.commonEventId].list.slice(location.start,location.end)};
  const move=helper.list.find(c=>c.code===357&&c.parameters[1]==='Move_MoveToCoordinates').parameters[3];
  const scale=helper.list.find(c=>c.code===357&&c.parameters[1]==='Scale_ScaleTo').parameters[3];
  assert.equal(move['TargetX:str'],'200');assert.equal(scale['TargetScaleX:str'],'100');
  move['TargetX:str']='342';scale['TargetScaleX:str']='44';scale['TargetScaleY:str']='44';
  const profileList=events[location.commonEventId].list;
  const enter=profileList.findIndex((c,i)=>i>=location.start&&c.code===357&&c.parameters[1]==='Basic_EnterBust');
  profileList.splice(enter,0,command(117,[68]));
  const speech=parse(events).locations['speech.H1'];
  const list=events[speech.commonEventId].list;
  const text=list.findIndex((c,i)=>i>=speech.start&&c.code===101);
  list.splice(text,0,clone(list[text]),command(401,['Caixa técnica inserida — mesma autoria.']));
  const focus=list.findIndex((c,i)=>i>speech.start&&c.code===117&&c.parameters[0]===68);
  list.splice(focus,0,command(357,['VisuMZ_2_VNPictureBusts','Scale_ScaleTo','Scale_ScaleTo',{'PictureID:arrayeval':'["60"]','TargetScaleX:str':'80','TargetScaleY:str':'80','Duration:eval':'0'}]));
 });
 assert.deepEqual(parse(prepared.events).catalog,parse(original).catalog);
 await startServer(t,prepared.directory);const browser=await openChrome(t);await firstPrologue(browser);
 for(let box=0;box<3;box++){await pause(browser);await browser.press('Enter',13);}
 await choices(browser,'formation');await activate(browser,'formation',0);await activate(browser,'hero',0);await pause(browser);
 await browser.waitFor('$gameScreen.picture(60)?.x()===342&&$gameScreen.picture(60)?.scaleX()===44');
 assert.equal(await browser.evaluate('$gameTemp._drylandLastRejection?.code||null'),null,'Focus before entry leaves an empty owned slot untouched');
 const before=await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)');
 await click(browser,560,693);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
 await browser.press('Escape',27);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Map'&&!SceneManager._scene.isBusy()");await pause(browser);
 assert.equal(await browser.evaluate('$gameScreen.picture(60).x()'),342);
 assert.equal(await browser.evaluate('$gameScreen.picture(60).scaleX()'),44);
 // Integration save fixture only: native serialization and title Continue,
 // without introducing a player save command.
 await browser.press('Enter',13);await pause(browser);
 await browser.evaluate('DataManager.saveGame(0)');
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title)');
 await browser.waitFor("$gameMap.mapId()===1&&$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await pause(browser);
 assert.equal(await browser.evaluate('$gameMessage.allText()'),'Caixa técnica inserida — mesma autoria.');
 await browser.waitFor('$gameScreen.picture(60)?.x()===326&&$gameScreen.picture(60)?.scaleX()===39.6');
 assert.equal(await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)'),before);
 await browser.press('Enter',13);await pause(browser);
 await browser.evaluate('DataManager.saveGame(0)');
 await browser.evaluate('$gameMap._interpreter.clear();$gameMessage.clear();SceneManager.goto(Scene_Title)');
 await browser.waitFor("$gameMap.mapId()===1&&$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await pause(browser);
 await browser.waitFor('$gameScreen.picture(60)?.x()===342&&$gameScreen.picture(60)?.scaleX()===80');
 assert.equal(await browser.evaluate('$gameMessage.speakerName()'),'Gorvak');
 assert.equal(await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)'),before);
 assert.equal(await browser.evaluate('$gameSystem._dryland.nativeLayoutVersion'),'fixture-native-bust-edit-20260911');
 assert.equal(hash(await readFile(path.join(project,'js/plugins/Dryland_EventBridge.js'))),pluginHash);
 await browser.screenshot('docs/qa/evidence/init-rpg-maker-mz/task-vn-picture-busts-dialogues/IT-067/authored-342-44.png');
});

canonicalCase('UT-071','native recovery follows edited entry, conditional roster and inserted boxes without effects or extra helpers',()=>{
 const events=clone(original),registry=parse(events),location=registry.locations['profile.H1'];
 const list=events[location.commonEventId].list;
 const move=list.slice(location.start,location.end).find(c=>c.code===357&&c.parameters[1]==='Move_MoveToCoordinates');
 move.parameters[3]['TargetX:str']='342';
 const speech=registry.locations['speech.H1'];
 const box=list.findIndex((c,i)=>i>=speech.start&&c.code===101);
 list.splice(box,0,clone(list[box]),command(401,['Inserted technical box']));
 const edited=parse(events),before=JSON.stringify(events);
 assert.deepEqual(edited.violations,[]);
 const restored=deriveVisualComposition(events,edited,'speech.H1',0,{});
 assert.equal(restored.targets.get(60).x,326);
 assert.equal(restored.targets.get(60).scaleX,90);
 assert.equal(restored.targets.get(63).scaleX,100);
 assert.deepEqual(deriveVisualComposition(events,edited,'speech.H1',1,{}),restored,'Inserted same-focus box needs no new restore helper');
 assert.equal(JSON.stringify(events),before,'Reduction cannot mutate source commands');
 for(const roster of [[1,2,3],[8,0,0],[0,0,0]]){
  const variables={144:roster[0],145:roster[1],146:roster[2]};
  const composition=deriveVisualComposition(original,registry,'council.confession',0,variables);
  assert.deepEqual([...composition.targets.keys()].sort(),roster.map((hero,i)=>hero?60+i:null).filter(Boolean).concat(63));
  for(const [i,hero]of roster.entries())if(hero){
   const target=composition.targets.get(60+i);
   assert.equal(target.enter['PictureName:str'],`Dryland_H${hero}`);
   assert.equal(target.scaleX,54);
  }
 }
 const optional=clone(original),council=registry.locations['council.challenge'];
 const councilList=optional[council.commonEventId].list;
 const firstText=councilList.findIndex((c,i)=>i>=council.start&&c.code===101);
 councilList.splice(firstText,0,command(117,[68]));
 const optionalRegistry=parse(optional);
 assert.deepEqual(optionalRegistry.violations,[]);
 for(const roster of [[0,0,0],[0,2,3]]){
  const variables={144:roster[0],145:roster[1],146:roster[2]};
  assert.deepEqual(deriveVisualComposition(optional,optionalRegistry,'council.challenge',0,variables),
   deriveVisualComposition(original,registry,'council.challenge',0,variables),'Focusing an absent position preserves the entire current composition');
 }
 const occupied=deriveVisualComposition(optional,optionalRegistry,'council.challenge',0,{144:1,145:2,146:3});
 assert.equal(occupied.targets.get(60).scaleX,60);
 assert.equal(occupied.targets.get(61).scaleX,54);
 // A new scale authored while the hero listens must not turn the listener's
 // temporary X into its entry base during recovery.
 const resized=clone(original),resizedList=resized[registry.locations['speech.H1'].commonEventId].list;
 const focus=resizedList.findIndex((c,i)=>i>registry.locations['speech.H1'].start&&c.code===117&&c.parameters[0]===68);
 resizedList.splice(focus,0,command(357,['VisuMZ_2_VNPictureBusts','Scale_ScaleTo','Scale_ScaleTo',{'PictureID:arrayeval':'["60"]','TargetScaleX:str':'80','TargetScaleY:str':'80','Duration:eval':'0'}]));
 const resizedComposition=deriveVisualComposition(resized,parse(resized),'speech.H1',1,{});
 assert.equal(resizedComposition.targets.get(60).x,200,'Changing scale alone preserves authored position');
 assert.equal(resizedComposition.targets.get(60).scaleX,80);
 assert.throws(()=>deriveVisualComposition(events,edited,'speech.H1',999,{}),/Invalid visual text box/);
 assert.throws(()=>deriveVisualComposition(original,registry,'missing.section',0,{}),/Invalid visual composition input/);
});

canonicalCase('UT-072','native visual sources and slot focus reject cycles, cross-conversation references and executable arguments',()=>{
 const locate=(events,id)=>{const l=parse(original).locations[id];return events[l.commonEventId].list.slice(l.start,l.end);};
 for(const [id,value]of [['profile.H1','speech.H1'],['speech.H1','profile.H2'],['speech.H1','missing.section']]){
  const events=clone(original),l=parse(original).locations[id];
  const list=events[l.commonEventId].list;
  const source=locate(events,id).find(c=>[108,408].includes(c.code)&&c.parameters[0].includes('@visualFrom '));
  if(source)source.parameters[0]=source.parameters[0].replace(/@visualFrom [^\n]+/,`@visualFrom ${value}`);
  else list.splice(l.start+1,0,comment(`@visualFrom ${value}`));
  assert.ok(parse(events).violations.some(v=>v.code==='invalid_visual_source'),value);
 }
 for(const name of ['Scale_ScaleTo','Move_MoveToCoordinates']){
  const events=clone(original),l=parse(original).locations['profile.H1'];
  const list=events[l.commonEventId].list;
  const index=list.findIndex((c,i)=>i>=l.start&&i<l.end&&c.code===357&&c.parameters[1]===name);
  list.splice(index,1);
  assert.ok(parse(events).violations.some(v=>v.code==='invalid_visual_entry'),`Missing ${name} must reject before play`);
 }
 const incompleteBranch=clone(original);
 const entry=incompleteBranch[73].list.findIndex(c=>c.code===357&&c.parameters[1]==='Basic_EnterBust');
 // Re-entering after the base was established leaves only this authored branch incomplete.
 const sectionLocation=parse(original).locations['council.challenge'];
 const sectionList=incompleteBranch[sectionLocation.commonEventId].list;
 const firstText=sectionList.findIndex((c,i)=>i>=sectionLocation.start&&c.code===101);
 sectionList.splice(firstText,0,command(111,[1,144,0,8,0]),{...clone(incompleteBranch[73].list[entry]),indent:1},command(412,[]));
 assert.ok(parse(incompleteBranch).violations.some(v=>v.code==='invalid_visual_entry'),'Untaken hero branch is validated');
 for(const [key,value]of [['slot','18'],['slot','60+0'],['listenerScale','0'],['listenerTone','process.exit()'],['duration','61']]){
  const events=clone(original),focus=events[68].list.find(c=>c.code===357);
  focus.parameters[3][key]=value;
  assert.ok(parse(events).violations.length>0,`${key}=${value}`);
 }
});

canonicalCase('UT-073','focus settings expose bounded editor fields and the CLI rejects invalid project configuration',async t=>{
 const expected={ListenerDarkness:24,ListenerScale:90,SpeakerScale:100,ListenerOffset:16,FocusDuration:20};
 assert.deepEqual(parseFocusParameters({}).style,expected);
 assert.deepEqual(parseFocusParameters(await readPluginParameters(project,'Dryland_EventBridge')).style,expected);
 const header=(await readFile(path.join(project,'js/plugins/Dryland_EventBridge.js'),'utf8')).split('*/')[0];
 for(const [key,min,max]of [['ListenerDarkness',0,255],['ListenerScale',1,100],['SpeakerScale',100,150],['ListenerOffset',0,100],['FocusDuration',0,60]]){
  const block=header.split(`@param ${key}\n`)[1].split('@param ')[0];
  assert.ok(block.includes('@type number'),key);
  assert.ok(block.includes(`@default ${expected[key]}\n`),key);
  assert.ok(block.includes(`@min ${min}\n`)&&block.includes(`@max ${max}\n`),key);
  for(const value of [min,max])assert.equal(parseFocusParameters({[key]:String(value)}).style[key],value);
  for(const raw of ['', ' ', 'NaN', '1+1', '1.5', String(min-1), String(max+1), 24, null]){
   const result=parseFocusParameters({[key]:raw});
   assert.equal(result.ok,false,`${key}=${JSON.stringify(raw)}`);
   assert.equal(result.errors[0].parameter,key);
   assert.match(result.errors[0].message,/Dryland_EventBridge/);
  }
 }
 for(const malformed of [null,[],false])assert.equal(parseFocusParameters(malformed).ok,false);
 assert.throws(()=>parsePluginList('var $plugins = []; globalThis.executed = true;'));
 assert.throws(()=>parsePluginList('var $plugins = [(()=>42)()];'));
 const prepared=await prepareBustFixture(t,'fixture-focus-parameters-cli',()=>{}, {ListenerDarkness:'256'});
 const result=cli(['--project',prepared.directory,'--json']);
 assert.equal(result.code,1);
 assert.equal(result.output.errors[0].code,'invalid_plugin_parameter');
 assert.equal(result.output.errors[0].parameter,'ListenerDarkness');
 assert.match(result.output.errors[0].message,/0 e 255/);
 await setFixtureFocus(prepared.directory,{ListenerDarkness:'60'});
 assert.equal(cli(['--project',prepared.directory,'--json']).code,0,'Missing remaining fields use their documented defaults');
 for(const [duration,wait,valid]of [[undefined,20,true],[undefined,21,false],['30',30,true],['8',9,false],['0',0,true],['0',1,false]]){
  const parameters=duration===undefined?{}:{FocusDuration:duration};
  const waited=await prepareBustFixture(t,'fixture-focus-wait',events=>{
   const list=events[68].list,focus=list.findIndex(c=>c.code===357&&c.parameters[1]==='Focus');
   list.splice(focus+1,0,command(230,[wait]));
  },parameters);
  const violations=parseEventCatalog(waited.events,system,parseFocusParameters(parameters).style).violations;
  assert.equal(violations.length===0,valid,`Parser: duration=${duration}, wait=${wait}`);
  const checked=cli(['--project',waited.directory,'--json']);
  assert.equal(checked.code,valid?0:1,`CLI: duration=${duration}, wait=${wait}`);
  if(!valid)assert.ok(checked.output.errors.some(error=>error.code==='unsupported_content_command'&&error.id==='helper.68'));
 }
});

canonicalCase('UT-074','global focus style independently scales speaker and listener and preserves neutral, empty and reflected positions',()=>{
 const parsed=parse(original);
 const style=parseFocusParameters({ListenerDarkness:'60',ListenerScale:'80',SpeakerScale:'110',ListenerOffset:'24',FocusDuration:'8'}).style;
 for(const id of ['profile.H1','selection.H1','party_full.H1','farewell.H1','epilogue.H1','lover.physical.warning','lover.supernatural.second','council.solo']){
  const first=deriveVisualComposition(original,parsed,id,0,{},style);
  const slot=id.startsWith('lover.')||id==='council.solo'?63:60;
  assert.ok(Math.abs(first.targets.get(slot).scaleX-110)<1e-9,`First speaker is focused: ${id}`);
 }
 const composition=deriveVisualComposition(original,parsed,'speech.H1',0,{},style);
 assert.deepEqual([composition.targets.get(60).x,composition.targets.get(60).scaleX,composition.targets.get(60).tone],[176,80,[-60,-60,-60,0]]);
 assert.ok(Math.abs(composition.targets.get(63).scaleX-110)<1e-9);
 assert.equal(composition.targets.get(63).x,960);
 assert.equal(composition.bases.get(60).scaleX,100);
 const neutral=deriveVisualComposition(original,parsed,'council.challenge',0,{144:1,145:2,146:3},style);
 assert.deepEqual([neutral.targets.get(60).scaleX,neutral.targets.get(61).tone],[60,[0,0,0,0]]);
 const reflected=deriveVisualComposition(original,parsed,'council.andira',0,{144:1,145:2,146:3},style);
 assert.equal(reflected.targets.get(65).x,330);
 assert.ok(Math.abs(reflected.targets.get(65).scaleX-110)<1e-9);
 const large=clone(original),entryLocation=parsed.locations['profile.H1'];
 const entryCommands=large[entryLocation.commonEventId].list.slice(entryLocation.start,entryLocation.end);
 const scale=entryCommands.find(c=>c.code===357&&c.parameters[1]==='Scale_ScaleTo').parameters[3];
 scale['TargetScaleX:str']='200';scale['TargetScaleY:str']='200';
 entryCommands.find(c=>c.code===357&&c.parameters[1]==='Move_MoveToCoordinates').parameters[3]['TargetX:str']='-2560';
 const largeRegistry=parse(large);assert.deepEqual(largeRegistry.violations,[]);
 const largeResult=deriveVisualComposition(large,largeRegistry,'speech.H1',1,{},style);
 assert.ok(Math.abs(largeResult.targets.get(60).scaleX-220)<1e-9,'Derived focus may exceed the authored scale limit');
 assert.equal(deriveVisualComposition(large,largeRegistry,'speech.H1',0,{},style).targets.get(60).x,-2584);
 const none=parseFocusParameters({ListenerDarkness:'0',ListenerOffset:'0',ListenerScale:'100',SpeakerScale:'100',FocusDuration:'0'}).style;
 const unchanged=deriveVisualComposition(original,parsed,'speech.H1',0,{},none);
 assert.deepEqual([unchanged.targets.get(60).x,unchanged.targets.get(60).scaleX,unchanged.targets.get(60).tone],[200,100,[0,0,0,0]]);
 const empty=clone(original),location=parsed.locations['council.challenge'],list=empty[location.commonEventId].list;
 list.splice(list.findIndex((c,i)=>i>=location.start&&c.code===101),0,command(117,[68]));
 const variables={144:0,145:2,146:3};
 assert.deepEqual(deriveVisualComposition(empty,parse(empty),'council.challenge',0,variables,style),deriveVisualComposition(original,parsed,'council.challenge',0,variables,style));
});

canonicalCase('IT-069','Plugin Manager focus settings survive Options and a style-only reload uses the compatible native save',{timeout:120000},async t=>{
 const initial={ListenerDarkness:'60',ListenerScale:'80',SpeakerScale:'110',ListenerOffset:'24',FocusDuration:'8'};
 const updated={ListenerDarkness:'80',ListenerScale:'75',SpeakerScale:'120',ListenerOffset:'8',FocusDuration:'12'};
 const prepared=await prepareBustFixture(t,'fixture-global-focus-20260911',events=>{
  const location=parse(events).locations['profile.H1'];
  const scale=events[location.commonEventId].list.slice(location.start,location.end).find(c=>c.code===357&&c.parameters[1]==='Scale_ScaleTo');
  scale.parameters[3]['TargetScaleX:str']='200';scale.parameters[3]['TargetScaleY:str']='200';
 },initial);
 const layoutBefore=await readFile(path.join(prepared.directory,'native-layout-manifest.json'),'utf8');
 const pluginHash=hash(await readFile(path.join(prepared.directory,'js/plugins/Dryland_EventBridge.js')));
 const sourceHash=hash(await readFile(path.join(prepared.directory,'data/CommonEvents.json')));
 await startServer(t,prepared.directory);const browser=await openChrome(t);await firstPrologue(browser);
 for(let box=0;box<3;box++){await pause(browser);await browser.press('Enter',13);}
 await choices(browser,'formation');await activate(browser,'formation',0);await activate(browser,'hero',0);await pause(browser);
 await browser.waitFor('Math.abs($gameScreen.picture(60)?.scaleX()-220)<.001');
 // The profile has two authored boxes before Ivai enters the conversation.
 for(let box=0;box<2;box++){await browser.press('Enter',13);await pause(browser);}
 const settled='[60,63].every(id=>{const p=$gameScreen.picture(id),sprite=SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===id);return p&&p._duration===0&&p._toneDuration===0&&sprite?.worldVisible})';
 await browser.waitFor(settled);
 const snapshot=()=>browser.evaluate('[60,63].map(id=>{const p=$gameScreen.picture(id);return {id,x:p.x(),scale:p.scaleX(),tone:p.tone()}})');
 const first=await snapshot();
 assert.deepEqual(first[0],{id:60,x:176,scale:160,tone:[-60,-60,-60,0]});
 assert.ok(Math.abs(first[1].scale-110)<.001);
 const campaignBefore=await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)');
 const textBefore=await browser.evaluate('$gameMessage.allText()');
 const refocus=(slot='63')=>browser.evaluate(`(()=>{
  let i=$gameMap._interpreter;while(i._childInterpreter)i=i._childInterpreter;
  const original=PluginManager.callCommand,requested=[];
  PluginManager.callCommand=function(interpreter,name,command,args){
   if(name==='VisuMZ_2_VNPictureBusts')requested.push(args['Duration:eval']);
   return original.apply(this,arguments);
  };
  try{
   PluginManager.callCommand(i,'Dryland_EventBridge','Focus',{slot:'0'});
   PluginManager.callCommand(i,'Dryland_EventBridge','Focus',{slot:${JSON.stringify(slot)}});
   return {durations:[60,63].map(id=>$gameScreen.picture(id)._duration),requested};
  }finally{PluginManager.callCommand=original;}
 })()`);
 const normalFocus=await refocus();
 assert.deepEqual(normalFocus.durations,[8,8],'The configured duration reaches actual native picture interpolation');
 assert.equal(normalFocus.requested.length,12);
 assert.deepEqual([...new Set(normalFocus.requested)],['8']);
 await browser.waitFor(settled);
 await click(browser,560,693);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
 await browser.press('Escape',27);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Map'&&!SceneManager._scene.isBusy()");await pause(browser);await browser.waitFor(settled);
 assert.deepEqual(await snapshot(),first,'Options reconstruction uses the same configured style');
 const folder='docs/qa/evidence/init-rpg-maker-mz/task-vn-focus-parameters/IT-069';
 await browser.screenshot(`${folder}/custom-style.png`);
 await browser.evaluate('DataManager.saveGame(0)');
 await setFixtureFocus(prepared.directory,updated);
 assert.equal(await readFile(path.join(prepared.directory,'native-layout-manifest.json'),'utf8'),layoutBefore,'Style-only edit retains the native revision');
 await browser.reopen();
 await browser.waitFor("window.$gameMessage&&$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await pause(browser);await browser.waitFor(settled);
 const resumed=await snapshot();
 // Native MZ does not serialize Game_Message. The saved interpreter resumes
 // at the next authored box, which belongs to Gorvak; it must not replay Ivai's line.
 assert.deepEqual(resumed[0],{id:60,x:200,scale:240,tone:[0,0,0,0]});
 assert.deepEqual(resumed[1],{id:63,x:968,scale:75,tone:[-80,-80,-80,0]});
 assert.equal(await browser.evaluate('$gameMessage.speakerName()'),'Gorvak');
 const speechLocation=parse(prepared.events).locations['speech.H1'];
 const speechCommands=prepared.events[speechLocation.commonEventId].list.slice(speechLocation.start,speechLocation.end);
 const nextBox=speechCommands.findIndex(c=>c.code===101&&c.parameters[4]==='Gorvak');
 const reply=[];for(let i=nextBox+1;speechCommands[i]?.code===401;i++)reply.push(speechCommands[i].parameters[0]);
 assert.equal(await browser.evaluate('$gameMessage.allText()'),reply.join('\n'),'Continue reaches the next authored reply');
 assert.notEqual(reply.join('\n'),textBefore,'The completed line is not replayed');
 assert.equal(await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)'),campaignBefore);
 assert.equal(await browser.evaluate('$gameTemp._drylandLastRejection?.code||null'),null);
 await browser.screenshot(`${folder}/updated-style-continue.png`);
 await browser.call('Emulation.setDeviceMetricsOverride',{width:1920,height:1080,deviceScaleFactor:1,mobile:false});
 await browser.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 // Observe the next authored Focus through real input. Injecting Focus into
 // a paused message would bypass the interpreter boundary that reveals busts.
 await browser.evaluate(`window._focusTestOriginal=PluginManager.callCommand;window._focusTestDurations=[];
  PluginManager.callCommand=function(i,name,command,args){if(name==='VisuMZ_2_VNPictureBusts')window._focusTestDurations.push(args['Duration:eval']);return window._focusTestOriginal.apply(this,arguments);};`);
 await browser.press('Enter',13);await pause(browser);await browser.waitFor(settled);
 const reducedDurations=await browser.evaluate(`(()=>{PluginManager.callCommand=window._focusTestOriginal;delete window._focusTestOriginal;const values=window._focusTestDurations;delete window._focusTestDurations;return values;})()`);
 assert.equal(reducedDurations.length,6);
 assert.deepEqual([...new Set(reducedDurations)],['0'],'Reduced motion requests instantaneous transforms; the vendor applies them on its next picture update');
 const reduced=await snapshot();
 assert.deepEqual(reduced[0],{id:60,x:192,scale:150,tone:[-80,-80,-80,0]});
 assert.deepEqual(reduced[1],{id:63,x:960,scale:120,tone:[0,0,0,0]});
 await browser.screenshot(`${folder}/updated-style-reduced.png`);
 assert.equal(hash(await readFile(path.join(prepared.directory,'js/plugins/Dryland_EventBridge.js'))),pluginHash);
 assert.equal(hash(await readFile(path.join(prepared.directory,'data/CommonEvents.json'))),sourceHash);
 assert.deepEqual(browser.exceptions,[]);
 await writeFile(`${folder}/configuration.json`,JSON.stringify({initial,updated,first,resumed,reduced,pluginHash,sourceHash,layout:JSON.parse(layoutBefore).nativeLayoutVersion,browser:browser.version},null,2)+'\n');
});
