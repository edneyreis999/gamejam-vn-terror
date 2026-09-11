// Suite: authored content boundaries and native passage presentation.
// IN: native JSON, real parser/CLI/rules; actual Chrome, MZ and vendors for IT-004/035.
// OUT: later feature transcription, native saves, complete campaign and human acceptance.
import assert from 'node:assert/strict';
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

const require = createRequire(import.meta.url);
const { parseEventCatalog } = require('../../The Dryland Drowned/js/plugins/Dryland_EventBridge.js');
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
  for (const unavailable of [['Object.hasOwn'], ['Array.prototype.at'], ['Object.hasOwn', 'Array.prototype.at']]) {
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
