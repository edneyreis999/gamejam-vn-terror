import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const files={};
for(const dir of ['src','tools','tests','fonts','assets','design','docs','examples','profiles']) {
  if(!fs.existsSync(path.join(root,dir)))continue;
  for(const relative of fs.readdirSync(path.join(root,dir),{recursive:true})) {
    if(relative.split(/[\\/]/).some(part=>['backups','staging','captures','__pycache__'].includes(part))||/\.(log|pyc)$/.test(relative))continue;
    const file=path.join(dir,relative),full=path.join(root,file);
    if(fs.statSync(full).isFile()) files[file.replaceAll('\\','/')]=crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex');
  }
}
for(const file of ['.gitattributes','.gitignore','Coreto_5_DesignSystem.js','cli.mjs','Apply-CoretoDesignSystem.mjs','Install-CoretoTheme.ps1','Configure-CoretoLayout.cjs','Configure-CoretoMenus.cjs','Configure-CoretoPolish.cjs','package.json','README.md'])files[file]=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex');
const sorted=Object.fromEntries(Object.entries(files).sort(([a],[b])=>a.localeCompare(b,'en')));
fs.writeFileSync(path.join(root,'manifest.json'),JSON.stringify({version:JSON.parse(fs.readFileSync(path.join(root,'package.json'))).version,files:sorted},null,2)+'\n');
