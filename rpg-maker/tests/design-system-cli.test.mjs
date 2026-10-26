// Tooling boundary: actual installed CLIs and a disposable project registry/assets.
// Protects authored configuration and reapplication; gameplay/appearance use the directed journey.
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, readFile, writeFile, copyFile, rm, readdir} from 'node:fs/promises';
import {join, resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {parsePluginsFile} from '../../coreto/tools/coreto/plugins-file.mjs';
import {hash, loadPreset, pluginId} from '../../.agents/skills/game-coreto-eng-design-system/scripts/shared.mjs';

const game=resolve(process.env.DRYLAND_GAME_ROOT || 'rpg-maker/The Dryland Drowned');
const coreto=resolve('coreto');
const preset=await loadPreset(coreto);
const scripts=resolve('.agents/skills/game-coreto-eng-design-system/scripts');
function run(project,script,args=[],success=true){
  const result=spawnSync(process.execPath,[join(scripts,script),'--coreto',coreto,'--project',project,...args,'--json'],{encoding:'utf8',maxBuffer:8*1024*1024});
  assert.equal(result.status===0,success,result.stdout+'\n'+result.stderr);
  return JSON.parse(success?result.stdout:result.stderr.trim().split('\n').at(-1));
}

async function fixture(t){
  const project=await mkdtemp(join(tmpdir(),'coreto-design-system-'));
  t.after(()=>rm(project,{recursive:true,force:true}));
  await mkdir(join(project,'js/plugins'),{recursive:true});await mkdir(join(project,'data'));
  await copyFile(join(game,'game.rmmzproject'),join(project,'game.rmmzproject'));
  await copyFile(join(game,'js/plugins.js'),join(project,'js/plugins.js'));
  for(const id of ['Coreto_0_CoreEngine','Coreto_1_MessageCore','Coreto_1_OptionsCore','Coreto_1_SaveCore','Coreto_2_ExtMessageFunc',pluginId])await copyFile(join(game,'js/plugins',id+'.js'),join(project,'js/plugins',id+'.js'));
  return project;
}

test('DesignSystem CLI preserves other entries, validates input and rejects stale writes',async t=>{
  const project=await fixture(t),file=join(project,'js/plugins.js');
  const before=await readFile(file),entries=parsePluginsFile(before.toString()).plugins;
  const cli=(...args)=>run(project,'design-system-cli.mjs',args).result;
  const initial=cli('parameters','get','--path','/Shapes');
  const preview=cli('parameters','set','--path','/Shapes/PanelRadius','--value','13','--dry-run');
  assert.equal(preview.written,false);assert.deepEqual(await readFile(file),before);
  cli('parameters','set','--path','/Shapes/PanelRadius','--value','13','--expected-hash',initial.fileHash);
  assert.equal(cli('parameters','get','--path','/Shapes/PanelRadius').value,13);
  const changed=await readFile(file);
  for(const args of [
    ['parameters','set','--path','/Shapes/PanelRadius','--value','-1'],
    ['parameters','set','--path','/Choice/MaxWidth','--value','10'],
    ['parameters','set','--path','/Surfaces/primary','--value','"bad"'],
    ['parameters','set','--path','/PictureRoles','--value','[{"Image":"../escape","Role":"card"}]'],
    ['parameters','set','--path','/Shapes/PanelRadius','--value','8','--expected-hash',initial.fileHash]
  ]){run(project,'design-system-cli.mjs',args,false);assert.deepEqual(await readFile(file),changed);}
  const actual=parsePluginsFile(changed.toString()).plugins;
  assert.deepEqual(actual.filter(p=>p.name!==pluginId),entries.filter(p=>p.name!==pluginId));
  cli('parameters','reset','--path','/Shapes/PanelRadius');
  assert.equal(cli('parameters','get','--path','/Shapes/PanelRadius').value,preset.defaults.Shapes.PanelRadius);
  const roles=[{Image:'Other_Game_Button',Role:'primary'}];
  cli('parameters','set','--path','/PictureRoles','--value',JSON.stringify(roles));
  assert.deepEqual(cli('parameters','get','--path','/PictureRoles').value,roles);
  const serialized=parsePluginsFile((await readFile(file)).toString()).plugins.find(p=>p.name===pluginId).parameters.PictureRoles;
  assert.equal(typeof JSON.parse(serialized)[0],'string','MZ struct-array encoding');
});

test('preset fails before writes when a provider is missing',async t=>{
  const project=await fixture(t),file=join(project,'js/plugins.js');
  const entries=parsePluginsFile(await readFile(file,'utf8')).plugins.filter(p=>p.name!=='Coreto_1_SaveCore');
  await writeFile(file,'var $plugins = '+JSON.stringify(entries)+';\n');
  const before=await readFile(file),listing=await readdir(project);
  const error=run(project,'apply-design-system.mjs',[],false);
  assert.match(error.error.message,/Coreto_1_SaveCore/);
  assert.deepEqual(await readFile(file),before);assert.deepEqual(await readdir(project),listing);
});

test('portable preset restores only managed settings, installs assets, reapplies unchanged and recovers',async t=>{
  const project=await fixture(t),file=join(project,'js/plugins.js');
  const cli=(...args)=>run(project,'design-system-cli.mjs',args).result;
  cli('parameters','set','--path','/Shapes/PanelRadius','--value','15');
  cli('parameters','set','--path','/PictureRoles','--value','[{"Image":"Other_Game_Button","Role":"primary"}]');
  const before=await readFile(file),entries=parsePluginsFile(before.toString()).plugins;
  const preview=run(project,'apply-design-system.mjs',['--dry-run']);
  assert.ok(preview.assets.length);assert.deepEqual(await readFile(file),before);
  await assert.rejects(readFile(join(project,'fonts/Outfit.ttf')),/ENOENT/);
  const result=run(project,'apply-design-system.mjs');
  assert.equal(result.written,true);
  assert.equal(cli('parameters','get','--path','/Shapes/PanelRadius').value,10);
  assert.deepEqual(cli('parameters','get','--path','/PictureRoles').value,[{Image:'Other_Game_Button',Role:'primary'}]);
  for(const asset of preset.assets)assert.equal(hash(await readFile(join(project,asset.destination))),asset.sha256);
  const actual=parsePluginsFile(await readFile(file,'utf8')).plugins;
  assert.deepEqual(actual.map(p=>[p.name,p.status,p.description]),entries.map(p=>[p.name,p.status,p.description]));
  const managed=new Set(['Coreto_0_CoreEngine','Coreto_1_MessageCore','Coreto_1_OptionsCore','Coreto_1_SaveCore','Coreto_2_ExtMessageFunc',pluginId]);
  assert.deepEqual(actual.filter(p=>!managed.has(p.name)),entries.filter(p=>!managed.has(p.name)));
  const applied=await readFile(file);
  const repeated=run(project,'apply-design-system.mjs');
  assert.equal(repeated.changed,false);assert.equal(repeated.written,false);assert.deepEqual(await readFile(file),applied);
  cli('parameters','set','--path','/Shapes/PanelRadius','--value','17');
  const laterEdit=await readFile(file);
  const conflict=run(project,'apply-design-system.mjs',['--restore',result.backup],false);
  assert.match(conflict.error.message,/Restore conflict/);
  assert.deepEqual(await readFile(file),laterEdit);
  cli('parameters','set','--path','/Shapes/PanelRadius','--value','10');
  run(project,'apply-design-system.mjs',['--restore',result.backup]);
  assert.equal(cli('parameters','get','--path','/Shapes/PanelRadius').value,15);
  await assert.rejects(readFile(join(project,'fonts/Outfit.ttf')),/ENOENT/);
});
