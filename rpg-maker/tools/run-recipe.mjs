import {readFile,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const [root,itemPath,resultPath]=process.argv.slice(2);
const item=JSON.parse(await readFile(itemPath,'utf8'));
const runtime=resolve(root,process.env.DRYLAND_DIRECTED_RUNTIME||'.artifacts/qa-runtime');
const {runRequest}=await import(pathToFileURL(resolve(runtime,'request-evidence.mjs')));
try {
 const module=await import(pathToFileURL(resolve(root,item.case)));
 const request=item.request?JSON.parse(await readFile(resolve(root,item.request),'utf8')):{schemaVersion:1,spec:item.spec,requestId:item.id,consumer:'game-final-verify',case:item.case,adapter:'rpg-maker/qa/directed-adapter.mjs',scenario:{id:module.scenario.id,profile:'declared-case',variant:item.id,configuration:'loki-config-isolated-metal'},claims:module.scenario.criteria.map(c=>({id:c.id,variant:c.variant,sensor:'directed-browser',group:'recipe',source:{id:c.id,variant:c.variant},expected:{path:item.spec}}))};
 request.scenario={id:module.scenario.id,profile:`${module.scenario.browser.width}x${module.scenario.browser.height}-${module.scenario.browser.reducedMotion||'normal'}`,variant:item.id,configuration:JSON.stringify({env:item.env,headless:true,renderer:'metal'})};for(const claim of request.claims){const actual=module.scenario.criteria.find(c=>c.id===claim.source.id);if(actual){claim.variant=actual.variant;claim.source.variant=actual.variant;}}
 request.case=item.case;request.adapter='rpg-maker/qa/directed-adapter.mjs';request.requestId=item.id;request.consumer='game-final-verify';request.evidenceRoot=item.evidenceRoot;request.freshness={mode:'fresh',reason:'Fresh complete retained Final Verify selection.'};
 await writeFile(resultPath+'.request.json',JSON.stringify(request,null,2));
 const result=await runRequest({project:root,request,runnerFile:resolve(root,'rpg-maker/tools/directed-runner.mjs')});
 await writeFile(resultPath,JSON.stringify(result,null,2));if(result.status==='fail')process.exitCode=1;
} catch(error){await writeFile(resultPath,JSON.stringify({status:'fail',error:error.stack},null,2));console.error(error);process.exitCode=1;}
