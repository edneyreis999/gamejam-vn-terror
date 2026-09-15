import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createContext,runInContext} from 'node:vm';
import {readObservation,withDeadline} from '../observation-deadline.mjs';

function browserPage() {
  const context = createContext({__qaTelemetry: {}});
  return {context, evaluate(fn,arg) {
    context.argument = arg;
    return Promise.resolve(runInContext(`(${fn.toString()})(argument)`,context));
  }};
}

test('successful observations return the browser value and clear their temporary trace',async()=>{
  const page=browserPage();
  assert.equal(await readObservation(page,'value',value=>value+1,41,1000),42);
  assert.equal(page.context.__qaTelemetry.pendingObservation,undefined);
});

test('a stalled browser observation reaches its wall-clock deadline and retains partial samples',async()=>{
  const page=browserPage();
  await assert.rejects(readObservation(page,'stalled',()=>{
    __qaTelemetry.pendingObservation.rows.push({frame:8,count:300});
    return new Promise(()=>{});
  },undefined,20),error=>{
    assert.equal(error.name,'ObservationTimeoutError');
    assert.match(error.message,/stalled exceeded 20ms/);
    assert.deepEqual(JSON.parse(JSON.stringify(error.partialObservation)),{
      label:'stalled',rows:[{frame:8,count:300}],cancelled:true
    });
    return true;
  });
});

test('an observation rejection retains its cause and collected samples',async()=>{
  const page=browserPage();
  await assert.rejects(readObservation(page,'broken',()=>{
    __qaTelemetry.pendingObservation.rows.push(1);
    throw new Error('native observation failed');
  },undefined,1000),error=>{
    assert.equal(error.message,'native observation failed');
    assert.equal(error.partialObservation.rows.length,1);
    assert.equal(error.partialObservation.cancelled,true);
    return true;
  });
});

test('an unresponsive renderer cannot block the error path when its partial trace is unavailable',async()=>{
  const page=browserPage();
  const evaluate=page.evaluate.bind(page);
  let calls=0;
  page.evaluate=(...args)=>++calls===1?evaluate(...args):new Promise(()=>{});
  await assert.rejects(readObservation(page,'renderer',()=>{},undefined,20),error=>{
    assert.equal(error.name,'ObservationTimeoutError');
    assert.match(error.partialObservationUnavailable,/renderer partial trace exceeded/);
    return true;
  });
});

test('a hung teardown operation is bounded independently of the browser',async()=>{
  await assert.rejects(withDeadline(()=>new Promise(()=>{}),20,'cleanup:context'),/cleanup:context exceeded/);
  assert.equal(await withDeadline(()=>17,1000,'next cleanup'),17);
});
