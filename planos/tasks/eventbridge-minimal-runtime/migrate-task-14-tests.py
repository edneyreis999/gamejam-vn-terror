from pathlib import Path
import re,json
root=Path('rpg-maker/tests')
retired=[]
def remove_case(s,id):
 global retired
 start=s.index("canonicalCase('"+id+"'");end=s.index('\n});',start)+4
 retired.append(id)
 return s[:start]+s[end:]
p=root/'suites/content.mjs';s=p.read_text()
for id in ['UT-047','UT-048','UT-049','UT-050','UT-051','UT-052','UT-053','UT-054','UT-060','IT-032','IT-033','IT-034','UT-067','UT-068','UT-071','UT-072','UT-074']:
 s=remove_case(s,id)
# Replace the retired parser setup with native data and fixture utilities only.
start=s.index('const system =');end=s.index("canonicalCase('UT-057'")
s=s[:start]+"const command = (code, parameters, indent = 0) => ({ code, indent, parameters });\n\n"+s[end:]
start=s.index("canonicalCase('UT-057'");end=s.index('\n});',start)+4
s=s[:start]+'''canonicalCase('UT-057', 'shared lover warnings retain mechanical reading identity independently of authored wording', () => {
  const id='lover.physical.warning';
  for(const scene of ['lover.physical.first','lover.physical.second'])assert.ok(catalog.scenes[scene].passageIds.includes(id));
  const state=formation();const read={...state,seenPassageIds:[...state.seenPassageIds,id]};
  assert.equal(rules.validateState(read).ok,true);assert.equal(read.seenPassageIds.filter(value=>value===id).length,1);
});'''+s[end:]
s=s.replace("import { activate, choices, pause }", "import { activate, choices, pause, catalog, rules, formation }")
s=s.replace("import { openChrome, project, startServer }", "import { openChrome, project, startServer, selectFile }")
s=s.replace("import { hash, layoutErrors, localAssets, nativeFiles } from '../../tools/native-layout.mjs';", "import { hash, localAssets } from '../../tools/native-files.mjs';")
for line in ["import { nativeBustRecipe } from '../helpers/native-content.mjs';\n","import { spawnSync } from 'node:child_process';\n","import { createRequire } from 'node:module';\n","import vm from 'node:vm';\n","import { assertNativeContent } from '../helpers/native-content.mjs';\n"]:s=s.replace(line,'')
s=re.sub(r"const require = createRequire[\s\S]*?(?=const clone)",'',s)
s=s.replace("  await browser.press('Enter', 13);\n  await browser.waitFor(\"$gameMap.mapId() === 2", "  await browser.press('Enter', 13);\n  await selectFile(browser,1);\n  await browser.waitFor(\"$gameMap.mapId() === 2")
s=s.replace("'Present runs the real indexed passage", "'The native prologue runs its authored passage")
s=s.replace("  const location = parse(edited).locations['prologue.01'];\n  edited[1].list.slice(location.start, location.end).find", "  edited[114].list.find")
s=re.sub(r"  const layout = JSON.parse\(await readFile\(path.join\(directory, 'native-layout-manifest.json'\)[\s\S]*?  await writeFile\(path.join\(directory, 'native-layout-manifest.json'\), JSON.stringify\(layout\)\);\n",'',s)
s=s.replace("  assert.equal(await browser.evaluate('$gameSystem._dryland.nativeLayoutVersion'), 'test-authoring-revision');\n",'')
s=s.replace(" const events=clone(original),id=appendEnsemble(events),parsed=parse(events);\n assert.deepEqual(parsed.violations,[]);\n assert.deepEqual(parsed.catalog,parse(original).catalog,'No added campaign prose or scene');", " const events=clone(original),id=appendEnsemble(events);")
s=s.replace(" assert.equal(Object.values(parsed.helpers).filter(h=>h.name.startsWith('fixture.2x2.')).length,6);", " assert.equal(ensembleFixture.helpers.length,6);")
s=s.replace(" assert.deepEqual(await readPluginParameters(project,'Dryland_EventBridge'),{});", " assert.deepEqual(await readPluginParameters(project,'Dryland_EventBridge'),{ConfigurationCommonEvent:'4'});")
s=s.replace(" assert.equal(cli(['--project',prepared.directory,'--json']).code,0);", " assert.equal(prepared.events[80].list.find(c=>c.code===357&&c.parameters[1]==='Scale_ScaleTo').parameters[3]['TargetScaleX:str'],'250');")
s=s.replace('registered pure native helpers','native helpers')
p.write_text(s)
p=root/'suites/diagnostics.mjs';s=p.read_text();s=remove_case(s,'UT-064');start=s.index("canonicalCase('UT-046'");end=s.index('\n});',start)+4
s=s[:start]+'''canonicalCase('UT-046','public rule projections stay detached and never mutate campaign facts',()=>{
 const state=states.encounter_choice,before=structuredClone(state),view=rules.playerView(state);
 view.heroes[0].name='changed';view.formation.selectedHeroIds.push('H8');
 assert.deepEqual(state,before);assert.notEqual(rules.playerView(state).heroes[0].name,'changed');
});'''+s[end:]
s=s.replace('createQa,','').replace('validateObserve,','')
s=s.replace(",\n  [validateObserve({target:'missing'}),'invalid_target','O alvo de apresentação é inválido.']",'')
s=s.replace(' and invalid presentation targets','')
s=s.replace("value:'\\\\V[22]'", "valueVariable:'22'")
s=re.sub(r" for\(const target of \['missing','memorial_missing'[\s\S]*?;\n",'',s)
p.write_text(s)
p=root/'suites/native-diagnostics.mjs';s=p.read_text()
for id in ['IT-042','IT-043','IT-046']:s=remove_case(s,id)
start=s.index("canonicalCase('IT-031'");end=s.index('\n});',start)+4
s=s[:start]+'''canonicalCase('IT-031','the loaded native game exposes no QA console, seed setter or editorial enforcement API',{timeout:60000},async t=>{
 const browser=await tavern(t);
 assert.equal(await browser.evaluate("typeof expeditionQA"),'undefined');
 assert.deepEqual(await browser.evaluate('Object.keys(DrylandEventBridge).sort()'),['query','readConfiguration','validateBridgeAction','validateCapturedContext','validateCheckpoint']);
 assert.equal(await browser.evaluate("'snapshot' in DrylandCampaignRules.createRules(DrylandCampaignRules.createCatalog(DrylandEventBridge.readConfiguration($dataCommonEvents[4])))"),false);
});'''+s[end:]
start=s.index(' // Corrupt the actual authored marker');s=s[:start]+" assert.equal(await saveBytes(browser),bytes);\n});\n"
s=s.replace(",['Observe',{target:'memorial_unknown'},'invalid_target']",'')
s=s.replace('(await qa(browser)).lastRejectedAction',"(await browser.evaluate('$gameTemp._drylandLastRejection || null'))")
s=s.replace("import { setTimeout as delay } from 'node:timers/promises';\n",'').replace('entry, hidden, qa, saveBytes','saveBytes')
s=re.sub(r"const error = [\s\S]*?(?=export async function toTitle)",'',s)
s=s.replace('authored invalid commands and missing native sections fail','invalid functional actions fail')
p.write_text(s)
p=root/'suites/persistence.mjs';s=p.read_text();s=remove_case(s,'IT-063')
s=s.replace('validateEnvelope, ','')
s=re.sub(r"const layout = JSON.parse[^\n]*\n",'',s)
s=re.sub(r"const envelope = campaign => [^\n]*",'const envelope = campaign => ({ campaign });',s)
s=s.replace('validateEnvelope(restored, layout.nativeLayoutVersion, rules.validateState)','rules.validateState(restored.campaign)').replace('validateEnvelope(valid, layout.nativeLayoutVersion, rules.validateState)','rules.validateState(valid.campaign)').replace('validateEnvelope(copy, layout.nativeLayoutVersion, rules.validateState)','rules.validateState(copy.campaign)').replace('validateEnvelope(value, layout.nativeLayoutVersion, rules.validateState)','rules.validateState(value?.campaign)')
s=s.replace("{ ...valid, schemaVersion: 2 }, { ...valid, catalogVersion: 2 }, { ...valid, nativeLayoutVersion: 'old' }, ",'')
s=s.replace("['sacrifice', { ...safe, presentationActive: true }], ",'').replace(', presentationActive: false','')
s=s.replace('unknown reasons and active presentation','unknown reasons and busy native messages').replace('save envelope round-trip','campaign serialization round-trip').replace('missing, incompatible and corrupt envelopes','missing and mechanically corrupt campaign facts')
p.write_text(s)
for p in root.rglob('*.mjs'):
 s=p.read_text().replace("StorageManager.loadZip('file0')","StorageManager.loadZip('file'+$gameSystem.savefileId())").replace("StorageManager.loadObject('file0')","StorageManager.loadObject('file'+$gameSystem.savefileId())").replace("name==='file0'","name==='file'+$gameSystem.savefileId()")
 s=s.replace('rules.snapshot(state);','').replace("($gameMessage._drylandChoices?.kind || $gameMessage._drylandChoiceFocus?.key)","$gameMessage._drylandChoiceFocus?.key").replace("$gameMessage._drylandChoices?.kind", "$gameMessage._drylandChoiceFocus?.key")
 p.write_text(s)
p=root/'test-manifest.json';m=json.loads(p.read_text());m['scope']='Canonical native integration and pure mechanical tests; eventbridge-minimal-runtime. Directed/editor/visual/audio/human evidence is recorded separately.'
for task,ids in m['tasks'].items():m['tasks'][task]=[id for id in ids if id not in retired]
p.write_text(json.dumps(m,indent=2,ensure_ascii=False)+'\n')
Path('planos/tasks/eventbridge-minimal-runtime/retired-tests.json').write_text(json.dumps({'reason':'Oracles exclusively enforced removed editorial/QA/restoration/revision contracts; retained behavior has native owners. See task14 notes.', 'ids':retired},indent=2)+'\n')
