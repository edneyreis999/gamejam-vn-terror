import {execFileSync} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
export function processRows(){return execFileSync('ps',['-axo','pid=,ppid=,pgid=,uid='],{encoding:'utf8'}).trim().split('\n').map(line=>line.trim().split(/\s+/).map(Number)).map(([pid,parent,group,uid])=>({pid,parent,group,uid}));}
export function signalOwnedGroup(group,signal='SIGTERM'){
 const errors=[];
 for(const row of processRows().filter(row=>row.group===group)){
  if(row.uid!==process.getuid()){errors.push({pid:row.pid,error:'Group contains a different owner; no signal sent'});continue;}
  try{process.kill(row.pid,signal);}catch(error){if(error.code!=='ESRCH')errors.push({pid:row.pid,error:error.message});}
 }
 return errors;
}
export async function terminateOwnedGroup(group){
 const errors=signalOwnedGroup(group);let remaining=[];
 for(let n=0;n<40;n++){remaining=processRows().filter(row=>row.group===group);if(!remaining.length)return {closed:true,errors};await delay(25);}
 // Escalation is restricted to the same newly-created owned process group.
 errors.push(...signalOwnedGroup(group,'SIGKILL'));
 for(let n=0;n<40;n++){remaining=processRows().filter(row=>row.group===group);if(!remaining.length)return {closed:true,errors,escalated:true};await delay(25);}
 return {closed:false,errors,remaining,escalated:true};
}
