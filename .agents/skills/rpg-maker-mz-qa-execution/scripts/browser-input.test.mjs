// Boundary: installed executor, trusted Chrome events and native scrolling.
// Physical devices and game semantics belong to their assigned QA scenarios.
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {mkdir,mkdtemp,rm,writeFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {run} from './browser-runtime.mjs';

async function inputFixture(t,execute,hasTouch=false){
    const root=await mkdtemp(join(tmpdir(),'qa-input-'));
    t.after(()=>rm(root,{recursive:true,force:true}));
    const project=join(root,'project'),fixture=join(root,'fixture');
    await mkdir(project);await mkdir(fixture);
    const html='<style>body{margin:0}#target{width:240px;height:240px;overflow:scroll}#target div{width:1000px;height:1000px}</style><div id="target"><div>Native scrolling target</div></div>';
    await writeFile(join(fixture,'index.html'),html);
    const adapter={
        describe:async()=>({files:[{path:'index.html'}],mutablePaths:[]}),
        start:async()=>{
            const server=createServer((request,response)=>{response.setHeader('Content-Type','text/html');response.end(html);});
            await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
            return{url:`http://127.0.0.1:${server.address().port}/`,close:()=>new Promise((resolve,reject)=>server.close(error=>error?reject(error):resolve()))};
        }
    };
    const expectedRef='browser-input.test.mjs';
    const caseModule={
        scenario:{id:'input',criteria:[{id:'input',variant:'native'}],browser:{width:800,height:600,dpr:1,locale:'en-US',hasTouch,launchArgs:['--force-device-scale-factor=1']}},
        sourceFiles:[new URL('./browser-input.test.mjs',import.meta.url)],execute,
        verify:({artifacts})=>({criteria:[{id:'input',variant:'native',status:'pass',expectedRef,evidence:artifacts.map(a=>a.path),limits:['Native DOM input; no game or physical device claim.']}],pendingReviews:[]})
    };
    const report=await run({project,fixture,output:join(root,'output'),adapter,caseModule});
    assert.ok(report.cleanup.every(resource=>resource.status==='closed'),JSON.stringify(report.cleanup));
    return report;
}

test('wheel reaches the current pointer target with trusted deltas and native scrolling',async t=>{
    const report=await inputFixture(t,async({input,wait,shot})=>{
        await input.pointer.move(100,100);await input.pointer.wheel(150,200);
        await wait(()=>{const e=document.getElementById('target');return e.scrollLeft===150&&e.scrollTop===200;});await shot('scrolled');
        await input.pointer.wheel(-50,-100);
        await wait(()=>{const e=document.getElementById('target');return e.scrollLeft===100&&e.scrollTop===100;});await shot('reversed');
    });
    assert.equal(report.status,'pass',JSON.stringify(report.errors));
    assert.deepEqual(report.inputs.filter(e=>e.type==='pointer-wheel').map(({deltaX,deltaY})=>[deltaX,deltaY]),[[150,200],[-50,-100]]);
    assert.deepEqual(report.publicInputLog.inputs.filter(e=>e.type==='wheel').map(({deltaX,deltaY,deltaMode,trusted,x,y})=>({deltaX,deltaY,deltaMode,trusted,x,y})),[
        {deltaX:150,deltaY:200,deltaMode:0,trusted:true,x:100,y:100},
        {deltaX:-50,deltaY:-100,deltaMode:0,trusted:true,x:100,y:100}
    ]);
});

test('touch gesture scrolls the native target and reaches Chrome as trusted touch events',async t=>{
    const report=await inputFixture(t,async({input,wait,shot})=>{
        await input.touch.start(100,200);await input.touch.move(100,120);await input.touch.move(100,40);
        await wait(()=>document.getElementById('target').scrollTop>20);await input.touch.end();await shot('touch-scrolled');
    },true);
    assert.equal(report.status,'pass',JSON.stringify(report.errors));
    const events=report.publicInputLog.inputs.filter(e=>e.type.startsWith('touch'));
    assert.ok(events.some(e=>e.type==='touchstart'));assert.ok(events.some(e=>e.type==='touchmove'));assert.ok(events.every(e=>e.trusted));
    assert.deepEqual(report.inputs.map(e=>e.type),['touch-start','touch-move','touch-move','touch-end']);
});

test('execution failure cancels the held touch and preserves the first error',async t=>{
    const report=await inputFixture(t,async({input})=>{
        await input.touch.start(100,200);throw new Error('fixture failure with touch held');
    },true);
    assert.equal(report.status,'fail');assert.equal(report.errors[0].message,'fixture failure with touch held');
    assert.deepEqual(report.cleanup.find(e=>e.resource==='touch'),{resource:'touch',status:'closed'});
    assert.equal(report.inputs.at(-1).type,'touch-cancel');assert.ok(report.publicInputLog.inputs.some(e=>e.type==='touchcancel'&&e.trusted));
});

for(const navigation of ['reload','reopen'])test(`${navigation} cancels the old touch before a new gesture`,async t=>{
    const report=await inputFixture(t,async context=>{
        await context.input.touch.start(100,200);await context[navigation]();
        await context.input.touch.start(100,180);await context.input.touch.end();await context.shot('new-gesture');
    },true);
    assert.equal(report.status,'pass',JSON.stringify(report.errors));
    assert.deepEqual(report.inputs.map(e=>e.type),['touch-start','touch-cancel','touch-start','touch-end']);
});
