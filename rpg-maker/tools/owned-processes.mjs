import {execFileSync} from 'node:child_process';
import {setTimeout as delay} from 'node:timers/promises';
export function processRows(){
 if(process.platform==='win32'){
  const output=execFileSync('powershell.exe',['-NoProfile','-Command',"Get-CimInstance Win32_Process | Select-Object ProcessId,ParentProcessId,@{Name='Browser';Expression={$_.Name -eq 'chrome.exe' -and $_.CommandLine -and $_.CommandLine -notmatch '--type=' -and $_.CommandLine -match '--remote-debugging'}} | ConvertTo-Json -Compress"],{encoding:'utf8',windowsHide:true,maxBuffer:8*1024*1024});
  return JSON.parse(output).map(row=>({pid:row.ProcessId,parent:row.ParentProcessId,group:row.ParentProcessId,command:row.Browser?'chrome.exe':''}));
 }
 return execFileSync('ps',['-axo','pid=,ppid=,pgid=,uid=,command='],{encoding:'utf8'}).trim().split('\n').map(line=>/^\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(.*)$/.exec(line)).filter(Boolean).map(m=>({pid:+m[1],parent:+m[2],group:+m[3],uid:+m[4],command:m[5]}));
}
function ownedRows(group){
 const rows=processRows();
 if(process.platform!=='win32')return rows.filter(row=>row.group===group);
 const owned=new Set([group]);let previous=-1;
 while(previous!==owned.size){previous=owned.size;for(const row of rows)if(owned.has(row.parent))owned.add(row.pid);}
 return rows.filter(row=>owned.has(row.pid));
}
export function signalOwnedGroup(group,signal='SIGTERM'){
 const errors=[];
 for(const row of ownedRows(group).reverse()){
  if(process.platform!=='win32'&&row.uid!==process.getuid()){errors.push({pid:row.pid,error:'Group contains a different owner; no signal sent'});continue;}
  try{process.kill(row.pid,signal);}catch(error){if(error.code!=='ESRCH')errors.push({pid:row.pid,error:error.message});}
 }
 return errors;
}
export async function terminateOwnedGroup(group){
 const errors=signalOwnedGroup(group);let remaining=[];
 for(let n=0;n<40;n++){remaining=ownedRows(group);if(!remaining.length)return {closed:true,errors};await delay(25);}
 // Escalation is restricted to the same newly-created owned process group.
 errors.push(...signalOwnedGroup(group,'SIGKILL'));
 for(let n=0;n<40;n++){remaining=ownedRows(group);if(!remaining.length)return {closed:true,errors,escalated:true};await delay(25);}
 return {closed:false,errors,remaining,escalated:true};
}
