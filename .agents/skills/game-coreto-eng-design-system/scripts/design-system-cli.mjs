import {parseArgs} from 'node:util';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {coretoRoot,skillRoot,errorResult} from './shared.mjs';

async function main(){
  const args=process.argv.slice(2);
  const {values,tokens}=parseArgs({args,strict:false,allowPositionals:true,tokens:true,options:{coreto:{type:'string'},project:{type:'string'}}});
  const root=await coretoRoot(values.project||skillRoot,values.coreto);
  const removed=new Set();
  for(const token of tokens)if(token.kind==='option'&&token.name==='coreto'){
    removed.add(token.index);if(!token.inlineValue)removed.add(token.index+1);
  }
  const {runCli,formatText}=await import(pathToFileURL(join(root,'tools/coreto/cli.mjs')));
  const output={schemaVersion:1,ok:true,...await runCli(['design-system',...args.filter((_,i)=>!removed.has(i))])};
  console.log(args.includes('--json')?JSON.stringify(output):formatText(output));
}
main().catch(errorResult);
