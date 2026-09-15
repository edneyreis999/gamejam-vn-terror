import { cp, mkdtemp, readFile, readdir, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { project } from './native-chrome.mjs';

export const ensembleFixture = JSON.parse(await readFile(new URL('../fixtures/vn-picture-busts-2x2/recipe.json', import.meta.url), 'utf8'));
export function appendEnsemble(events) {
  const offset = events.length - 1;
  const relocate = list => structuredClone(list).map(command => {
    if (command.code === 117) command.parameters[0] += offset;
    return command;
  });
  for (const helper of ensembleFixture.helpers) events.push({ id: offset + helper.id, name: helper.name, trigger: 0, switchId: 1, list: relocate(helper.list) });
  const root = events.length;
  events.push({ id: root, name: 'Fixture técnica — 2x2', trigger: 0, switchId: 1, list: relocate(ensembleFixture.root) });
  return root;
}
export async function prepareBustFixture(t, label, edit) {
  const directory = await mkdtemp(path.join(tmpdir(), label+'-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (const entry of await readdir(project, { withFileTypes: true })) {
    const source = path.join(project, entry.name), target = path.join(directory, entry.name);
    if (entry.isDirectory() && entry.name !== 'data') await symlink(source, target);
    else await cp(source, target, { recursive: true });
  }
  const file = path.join(directory, 'data/CommonEvents.json');
  const events = JSON.parse(await readFile(file, 'utf8'));
  const result = await edit(events, directory);
  await writeFile(file, JSON.stringify(events));
  return { directory, events, result };
}

// Read the rendered asset's opaque extent: transparent PNG margins must not
// make an offscreen character pass a full-bitmap intersection check.
export async function assertPortraitFraming(browser, ids, context) {
  await browser.waitFor(`(${JSON.stringify(ids)}).every(id=>{const p=$gameScreen.picture(id),s=SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===id);return p&&s?.bitmap?.isReady()&&s.worldVisible&&s.worldAlpha>0&&p.opacity()===255&&p._duration===0&&p._toneDuration===0;})`);
  const rows = await browser.evaluate(`(${JSON.stringify(ids)}).map(id=>{
    const s=SceneManager._scene._spriteset._pictureContainer.children.find(s=>s._pictureId===id),b=s.bitmap;
    const rgba=b.context.getImageData(0,0,b.width,b.height).data;
    let left=b.width,top=b.height,right=0,bottom=0;
    for(let y=0;y<b.height;y++)for(let x=0;x<b.width;x++)if(rgba[(y*b.width+x)*4+3]>16){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x+1);bottom=Math.max(bottom,y+1);}
    const corners=[[left,top],[right,top],[left,bottom],[right,bottom]].map(([x,y])=>s.worldTransform.apply({x:x-s.anchor.x*b.width,y:y-s.anchor.y*b.height}));
    return {id,name:$gameScreen.picture(id).name(),left:Math.min(...corners.map(p=>p.x)),right:Math.max(...corners.map(p=>p.x)),top:Math.min(...corners.map(p=>p.y)),bottom:Math.max(...corners.map(p=>p.y)),width:Graphics.width,messageTop:SceneManager._scene._messageWindow.y};
  })`);
  for (const row of rows) {
    assert.ok(row.left >= 0 && row.right <= row.width && row.right > row.left,
      `${context}: opaque portrait must fit horizontally: ${JSON.stringify(row)}`);
    assert.ok(row.top >= 0 && row.top <= row.messageTop - 120 && row.bottom > row.top + 120,
      `${context}: upper portrait must remain visible above the message: ${JSON.stringify(row)}`);
  }
  return rows;
}
