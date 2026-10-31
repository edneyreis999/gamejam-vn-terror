// Legacy entry point. Approved revision only; never replay historical refinements.
const {spawnSync}=require('node:child_process');const path=require('node:path');
const args=process.argv.slice(2);if(args[0]&&!args[0].startsWith('--'))args.unshift('--project');
const result=spawnSync(process.execPath,[path.join(__dirname,'Apply-CoretoDesignSystem.mjs'),'--preset','coreto-default',...args],{stdio:'inherit',windowsHide:true});process.exitCode=result.status??1;
