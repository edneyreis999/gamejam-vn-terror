// Tool-side Playwright helper used for this supplementary session. No product runtime imports.
async function createDriver(page) {

const b=await page.context().browser().browserType().connectOverCDP('http://127.0.0.1:50303');
const q=b.contexts()[0].pages().find(p=>p.url().endsWith('/prototype/index.html'));
const journal={observed_at:new Date().toISOString(),actions:[],navigation:[],errors:[],remote_requests:[]};
q.on('pageerror',e=>journal.errors.push(String(e)));
q.on('request',r=>{if(/^https?:/.test(r.url()))journal.remote_requests.push(r.url());});
const state=async()=>await q.evaluate(()=>({snapshot:expeditionQA.snapshot(),validation:expeditionQA.validate(),text:document.body.innerText,focus:{action:document.activeElement?.dataset?.action,value:document.activeElement?.dataset?.value,text:document.activeElement?.textContent?.slice(0,150)},viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},overflow:document.documentElement.scrollWidth>innerWidth,modal:!!document.querySelector('dialog:modal')}));
const press=async key=>{await q.keyboard.press(key);journal.navigation.push({key,focus:(await state()).focus});};
const focus=async(type,value=null)=>{
 const matches=s=>s.focus.action===type&&(value===null||s.focus.value===value);
 for(let i=0;i<45;i++){let s=await state();if(matches(s))return s;
  if(type==='TOGGLE_HERO'&&s.focus.action==='TOGGLE_HERO'){
   const cards=await q.locator('button[data-action="TOGGLE_HERO"]').evaluateAll(ns=>ns.map(n=>{const r=n.getBoundingClientRect();return{id:n.dataset.value,x:r.x+r.width/2,y:r.y+r.height/2};}));
   const queue=[{id:s.focus.value,keys:[]}],seen=new Set();let path;
   while(queue.length){const n=queue.shift();if(seen.has(n.id))continue;seen.add(n.id);if(n.id===value){path=n.keys;break;}const from=cards.find(c=>c.id===n.id);
    for(const key of ['ArrowRight','ArrowLeft','ArrowDown','ArrowUp']){const possible=cards.filter(c=>key==='ArrowRight'?c.x>from.x:key==='ArrowLeft'?c.x<from.x:key==='ArrowDown'?c.y>from.y:c.y<from.y).sort((a,b)=>Math.hypot(a.x-from.x,a.y-from.y)-Math.hypot(b.x-from.x,b.y-from.y));if(possible[0])queue.push({id:possible[0].id,keys:[...n.keys,key]});}
   }
   if(path){for(const key of path)await press(key);if(matches(await state()))return await state();}
  }
  await press('Tab');
 }throw Error('Keyboard reachability failed '+type+'/'+value);
};
const activate=async(type,value=null,key='Enter')=>{
 const before=await focus(type,value);await q.keyboard.press(key);await q.waitForTimeout(110);const after=await state();
 journal.actions.push({action:{type,value},key,beforeSequence:before.snapshot.sequence,afterSequence:after.snapshot.sequence,phase:after.snapshot.phase,text:after.text,focus:after.focus,validation:after.validation,overflow:after.overflow});
 if(!after.validation.ok||after.overflow)throw Error('Invalid state or horizontal overflow');return after;
};

return { q, journal, state, press, focus, activate };
}
