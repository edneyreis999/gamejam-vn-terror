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
import { appendEnsemble, ensembleFixture, prepareBustFixture } from '../helpers/native-bust-fixture.mjs';
import { parsePluginList, readPluginParameters } from '../../tools/plugin-settings.mjs';
import { click } from '../helpers/native-shared.mjs';
import { activate, choices, pause } from '../helpers/formation.mjs';

const require = createRequire(import.meta.url);
const { parseEventCatalog, restorationCommands } = require('../../The Dryland Drowned/js/plugins/Dryland_EventBridge.js');
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

canonicalCase('UT-067', 'native visual payloads belong to VNPictureBusts while campaign commands stay outside presentation', () => {
  const accepted = nativeBustRecipe();
  const variations = [
    ['Basic_EnterBust', 'Origin:str', 'Center'],
    ['Basic_EnterBust', 'HorzMirror:str', 'Auto'],
    ['Basic_EnterBust', 'PictureName:str', 'Dryland_Tavern_H1'],
    ['Basic_EnterBust', 'PictureID:eval', '60 + 6'],
    ['Basic_EnterBust', 'EasingType:str', 'OutBounce'],
    ['Scale_ScaleTo', 'TargetScaleX:str', '250'],
    ['Scale_ScaleTo', 'Duration:eval', '120'],
    ['Move_MoveToCoordinates', 'TargetX:str', 'Graphics.width / 2'],
    ['Tone_CustomToneBust', 'customTone:eval', '[10,20,30,40]'],
    ['Basic_ExitBusts', 'AutoErase:eval', 'false']
  ];
  for (const [name,key,value] of variations) {
    const list=clone(accepted);list.find(c=>c.parameters[1]===name).parameters[3][key]=value;
    errors(fixture(...section('profile.H1','Perfil.',list)),[]);
  }
  const extra=command(357,['VisuMZ_2_VNPictureBusts','Swaying_Enable','Swaying',{'PictureID:arrayeval':'["66"]','SpeedAngle:eval':'20','RateAngle:eval':'2'}]);
  errors(fixture(...section('profile.H1','Perfil.',[extra])),[]);
  const expression=clone(accepted);
  expression[0].parameters[3]['Duration:eval']='(globalThis.drylandUnsafeExecuted = true, 20)';
  delete globalThis.drylandUnsafeExecuted;
  errors(fixture(...section('profile.H1','Perfil.',expression)),[]);
  assert.equal(globalThis.drylandUnsafeExecuted,undefined,'Static inspection never evaluates vendor expressions');
  for (const p of [['Dryland_EventBridge','Action','Action',{action:'BEGIN'}],['OtherPlugin','Run','Run',{}],['VisuMZ_2_VNPictureBusts','Run','Run',null]]) {
    assert.ok(parse(fixture(...section('profile.H1','Perfil.',[command(357,p)]))).violations.some(v=>v.code==='unsupported_content_command'));
  }
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
    ['orphan annotation', e => { e[4].list.splice(1, 0, command(657, ['Duration = 20'])); }],
    ['misindented annotation', e => { e[4].list.splice(2, 0, command(657, ['Duration = 20'], 1)); }],
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
  move['TargetX:str']='342';scale['TargetScaleX:str']='44';scale['TargetScaleY:str']='44';
  const profileList=events[location.commonEventId].list;
  const enter=profileList.findIndex((c,i)=>i>=location.start&&c.code===357&&c.parameters[1]==='Basic_EnterBust');
  profileList.splice(enter,0,command(117,[80]));
  const profileEnd=parse(events).locations['profile.H1'].end;
  profileList.splice(profileEnd,0,command(357,['VisuMZ_2_VNPictureBusts','Basic_GraphicChange','Change',{'PictureID:eval':'60','PictureName:str':'Dryland_H2'}]));
  for(const [id,x,scaleValue] of [[81,'326','39.6'],[80,'342','44']]){
   for(const c of events[id].list.filter(c=>c.code===357&&c.parameters[3]['PictureID:arrayeval']==='["60"]')){
    if(c.parameters[1]==='Move_MoveToCoordinates')c.parameters[3]['TargetX:str']=x;
    if(c.parameters[1]==='Scale_ScaleTo'){c.parameters[3]['TargetScaleX:str']=scaleValue;c.parameters[3]['TargetScaleY:str']=scaleValue;}
   }
  }
  const speech=parse(events).locations['speech.H1'];
  const list=events[speech.commonEventId].list;
  const text=list.findIndex((c,i)=>i>=speech.start&&c.code===101);
  list.splice(text,0,clone(list[text]),command(401,['Caixa técnica inserida — mesma autoria.']));
  const focus=list.findIndex((c,i)=>i>speech.start&&c.code===117&&c.parameters[0]===80);
  list.splice(focus+1,0,command(357,['VisuMZ_2_VNPictureBusts','Scale_ScaleTo','Scale_ScaleTo',{'PictureID:arrayeval':'["60"]','TargetScaleX:str':'80','TargetScaleY:str':'80','Duration:eval':'0'}]));
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
 assert.equal(await browser.evaluate('$gameScreen.picture(60).name()'),'Dryland_H2','Completed source includes visuals after its final text');
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

canonicalCase('UT-071','restoration extracts the current native visual prefix without evaluating or copying narrative effects',()=>{
 const events=clone(original),registry=parse(events),location=registry.locations['profile.H1'];
 const list=events[location.commonEventId].list;
 list.slice(location.start,location.end).find(c=>c.code===357&&c.parameters[1]==='Move_MoveToCoordinates').parameters[3]['TargetX:str']='342';
 const speech=registry.locations['speech.H1'];
 const box=list.findIndex((c,i)=>i>=speech.start&&c.code===101);
 list.splice(box,0,clone(list[box]),command(401,['Inserted technical box']));
 const edited=parse(events),before=JSON.stringify(events);
 const restored=restorationCommands(events,edited,'speech.H1',0);
 assert.ok(restored.some(c=>c.code===357&&c.parameters[3]['TargetX:str']==='342'),'Inherited entry comes from the edited event');
 assert.deepEqual(restorationCommands(events,edited,'speech.H1',1),restored,'An inserted box requires no restoration recipe');
 assert.ok(restored.every(c=>[0,111,411,412,357].includes(c.code)));
 assert.ok(restored.filter(c=>c.code===357).every(c=>c.parameters[0]==='VisuMZ_2_VNPictureBusts'));
 const council=restorationCommands(events,edited,'council.confession',0);
 assert.ok(council.some(c=>c.code===111&&c.parameters[1]===144),'The native interpreter owns roster branches');
 assert.ok(!council.some(c=>[101,401,117,122,230].includes(c.code)));
 restored.find(c=>c.code===357).parameters[3]['PictureName:str']='changed copy';
 assert.equal(JSON.stringify(events),before,'Extracting and executing a restoration cannot mutate native lists');
 const trailing=clone(original),profile=parse(trailing).locations['profile.H1'];
 const change=command(357,['VisuMZ_2_VNPictureBusts','Basic_GraphicChange','Change',{'PictureID:eval':'60','PictureName:str':'Dryland_H2'}]);
 trailing[profile.commonEventId].list.splice(profile.end,0,change);
 const trailingRegistry=parse(trailing);
 assert.ok(restorationCommands(trailing,trailingRegistry,'speech.H1',0).some(c=>c.parameters[1]==='Basic_GraphicChange'),'Completed inherited sources include trailing visuals');
 assert.ok(!restorationCommands(trailing,trailingRegistry,'profile.H1',1).some(c=>c.parameters[1]==='Basic_GraphicChange'),'Current text box does not execute future visuals');
 assert.throws(()=>restorationCommands(events,edited,'speech.H1',999),/Invalid visual text box/);
 assert.throws(()=>restorationCommands(events,edited,'missing.section',0),/Invalid visual restoration input/);
});

canonicalCase('UT-072','restoration sources reject cycles and foreign conversations without constraining visual composition',()=>{
 for(const [id,value]of [['profile.H1','speech.H1'],['speech.H1','profile.H2'],['speech.H1','missing.section']]){
  const events=clone(original),l=parse(original).locations[id],list=events[l.commonEventId].list;
  const source=list.slice(l.start,l.end).find(c=>[108,408].includes(c.code)&&c.parameters[0].includes('@visualFrom '));
  if(source)source.parameters[0]=source.parameters[0].replace(/@visualFrom [^\n]+/,`@visualFrom ${value}`);
  else list.splice(l.start+1,0,comment(`@visualFrom ${value}`));
  assert.ok(parse(events).violations.some(v=>v.code==='invalid_visual_source'),value);
 }
 for(const name of ['Scale_ScaleTo','Move_MoveToCoordinates']){
  const events=clone(original),l=parse(original).locations['profile.H1'],list=events[l.commonEventId].list;
  list.splice(list.findIndex((c,i)=>i>=l.start&&i<l.end&&c.code===357&&c.parameters[1]===name),1);
  assert.deepEqual(parse(events).violations,[],'Native vendor defaults do not require an EventBridge base recipe');
 }
});

canonicalCase('UT-073','native focus replaces the obsolete plugin settings and remains editable in common events',async t=>{
 assert.deepEqual(await readPluginParameters(project,'Dryland_EventBridge'),{});
 const header=(await readFile(path.join(project,'js/plugins/Dryland_EventBridge.js'),'utf8')).split('*/')[0];
 assert.ok(!header.includes('@command Focus'));
 assert.ok(!header.includes('@param SpeakerScale'));
 assert.ok(!original.some(e=>e?.list.some(c=>c.code===357&&c.parameters[0]==='Dryland_EventBridge'&&c.parameters[1]==='Focus')));
 const prepared=await prepareBustFixture(t,'fixture-native-focus-cli',events=>{
  const scale=events[80].list.find(c=>c.code===357&&c.parameters[1]==='Scale_ScaleTo');
  scale.parameters[3]['TargetScaleX:str']='250';scale.parameters[3]['Duration:eval']='120';
 });
 assert.equal(cli(['--project',prepared.directory,'--json']).code,0);
 assert.throws(()=>parsePluginList('var $plugins = []; globalThis.executed = true;'));
});

canonicalCase('UT-074','restoration preserves relative commands, vendor options and custom tones in authored order',()=>{
 const events=clone(original),l=parse(events).locations['profile.H1'],list=events[l.commonEventId].list;
 const first=list.findIndex((c,i)=>i>=l.start&&c.code===101);
 const extra=[
  command(357,['VisuMZ_2_VNPictureBusts','Basic_GraphicChange','Change',{'PictureID:eval':'60','PictureName:str':'Dryland_H2'}]),
  command(357,['VisuMZ_2_VNPictureBusts','Scale_ScaleBy','Scale',{'PictureID:arrayeval':'["60"]','ScaleX:eval':'20','ScaleY:eval':'10','Duration:eval':'80'}]),
  command(357,['VisuMZ_2_VNPictureBusts','Tone_PresetBust','Tone',{'PictureID:arrayeval':'["60"]','Preset:str':'Sunset','Duration:eval':'90'}])
 ];
 list.splice(first,0,...extra);
 const restored=restorationCommands(events,parse(events),'profile.H1',0);
 assert.deepEqual(restored.slice(-4,-1),extra);
});

canonicalCase('IT-069','artist parameters and additional native effects survive Options and compatible Continue',{timeout:120000},async t=>{
 const prepared=await prepareBustFixture(t,'fixture-native-freedom-20260911',events=>{
  const l=parse(events).locations['profile.H1'],list=events[l.commonEventId].list;
  for(const c of list.slice(l.start,l.end).filter(c=>c.code===357)){
   const args=c.parameters[3];
   if('PictureID:eval' in args)args['PictureID:eval']='60 + 6';
   if('PictureID:arrayeval' in args)args['PictureID:arrayeval']='["60 + 6"]';
   if(c.parameters[1]==='Basic_EnterBust')Object.assign(args,{'Origin:str':'Center','HorzMirror:str':'Mirror','EasingType:str':'OutBounce','Duration:eval':'75'});
   if(c.parameters[1]==='Scale_ScaleTo')Object.assign(args,{'TargetScaleX:str':'73','TargetScaleY:str':'73','Duration:eval':'80'});
   if(c.parameters[1]==='Move_MoveToCoordinates')Object.assign(args,{'TargetX:str':'Graphics.width / 2','TargetY:str':'420','Duration:eval':'85','EasingType:str':'OutQuad'});
  }
  const first=list.findIndex((c,i)=>i>=l.start&&c.code===101);
  list.splice(first,0,
   command(230,[90]),
   command(357,['VisuMZ_2_VNPictureBusts','Basic_GraphicChange','Change',{'PictureID:eval':'66','PictureName:str':'Dryland_H2'}]),
   command(357,['VisuMZ_2_VNPictureBusts','Scale_ScaleBy','Scale',{'PictureID:arrayeval':'["66"]','ScaleX:eval':'7','ScaleY:eval':'7','Duration:eval':'10'}]),
   command(357,['VisuMZ_2_VNPictureBusts','Tone_PresetBust','Tone',{'PictureID:arrayeval':'["66"]','Preset:str':'Sunset','Duration:eval':'20'}]),
   command(230,[20]));
 });
 await startServer(t,prepared.directory);const browser=await openChrome(t);await firstPrologue(browser);
 for(let box=0;box<3;box++){await pause(browser);await browser.press('Enter',13);}
 await choices(browser,'formation');await activate(browser,'formation',0);await activate(browser,'hero',0);await pause(browser);
 const settled='$gameScreen.picture(66)&&$gameScreen.picture(66)._duration===0&&$gameScreen.picture(66)._toneDuration===0';
 await browser.waitFor(settled);
 const snapshot=()=>browser.evaluate('(()=>{const p=$gameScreen.picture(66);return {name:p.name(),x:p.x(),y:p.y(),scaleX:p.scaleX(),scaleY:p.scaleY(),tone:p.tone(),origin:p.origin()}})()');
 const before=await snapshot();
 assert.equal(before.name,'Dryland_H2');assert.equal(before.x,640);assert.equal(before.y,420);assert.equal(before.scaleX,-80,'Native mirroring is retained');assert.equal(before.scaleY,80);
 assert.ok(before.tone.some(v=>v!==0));
 const campaignBefore=await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)');
 const folder='docs/qa/evidence/init-rpg-maker-mz/task-vn-focus-parameters/IT-069';
 await browser.screenshot(`${folder}/native-authored.png`);
 await click(browser,560,693);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Options'&&!SceneManager._scene.isBusy()");
 await browser.press('Escape',27);await browser.waitFor("SceneManager._scene.constructor.name==='Scene_Map'&&!SceneManager._scene.isBusy()");await pause(browser);await browser.waitFor(settled);
 assert.deepEqual(await snapshot(),before,'Options restores all authored vendor effects');
 await browser.evaluate('DataManager.saveGame(0)');await browser.reopen();
 await browser.waitFor("window.$gameMessage&&$gameMessage.choices().includes('Continuar')&&SceneManager._scene._choiceListWindow?.isOpenAndActive()&&!SceneManager._scene.isBusy()");
 await browser.press('Enter',13);await pause(browser);await browser.waitFor(settled);
 assert.deepEqual(await snapshot(),before,'Native Continue restores the same final composition');
 assert.equal(await browser.evaluate('JSON.stringify($gameSystem._dryland.campaign)'),campaignBefore);
 await browser.screenshot(`${folder}/native-restored.png`);
 for(let box=0;box<6;box++){await browser.press('Enter',13);await pause(browser);}
 await browser.press('Enter',13);await choices(browser,'formation');
 assert.equal(await browser.evaluate('$gameScreen.picture(66)||null'),null,'Actual authored picture IDs are cleaned up');
 assert.deepEqual(browser.exceptions,[]);
});
