import {readFileSync,writeFileSync} from 'node:fs';
const root='planos/tasks/prototype-feedback-refinement/';
for(const name of ['task-04.md','task-13.md']){
 const path=root+name;let text=readFileSync(path,'utf8');
 if(name==='task-04.md')text=text.replace('status: in_progress','status: completed');
 text+='\nDeparture repair technical closure: `2026-09-25T19-16-26-435Z`, IT-008/041/087 selected 3, PASS 3, exit 0, 158.5s. The next native surface is the expedition introduction, while local cancellation and route progress remain correct. Only CE3 changed; CE39 already ended its child. CommonEvents SHA256 `408979e6d1c444ff8334bdcacab9fa97e567e5ec3e5ae0e5705b9f6e90ca6541`. Task 04 technical scope is complete again; no LIVE inheritance. Fresh request physical-first-03 is collecting in run `a1afddb0-7ca9-410a-b6c5-98052ddb9825`.\n';
 writeFileSync(path,text);
}
let path=root+'tasks.md',text=readFileSync(path,'utf8').replace(/(\| 04 \|[^\n]+)in_progress \|/,'$1completed |');writeFileSync(path,text);
path=root+'verification.md';text=readFileSync(path,'utf8').replace('implemented: false','implemented: true').replace('Task 11 is active; tasks 12–13 remain pending.','Task 11 and the task 12 QA plan are complete; task 13 remains active.');
text+='\nCurrent technical status after departure repair: task 04 closed with IT-008/041/087 3/3 PASS at 2026-09-25T19-16-26-435Z; implemented restored. Tasks 01–12 complete, task 13 active. New directed run a1afddb0 is still collecting; aggregate runtime_verified/human_accepted/release_ready remain false.\n';writeFileSync(path,text);
