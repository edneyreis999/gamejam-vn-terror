import assert from 'node:assert/strict';
import {editCommonEvents,command,branch,nested} from './native-authoring.mjs';

editCommonEvents(events=>{
 const list=events[3].list;
 const index=list.findIndex(c=>c.code===117&&c.parameters[0]===39);
 assert.ok(index>0);assert.equal(list[index+1].code,0);
 // CE39 can either return locally or transfer. Exit this caller after transfer;
 // Exit Event Processing inside the child only terminates that child.
 list.splice(index+1,0,...nested(branch('$gameMap.mapId() !== 3',[command(115)])));
});
