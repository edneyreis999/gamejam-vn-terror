import assert from 'node:assert/strict';
import { DirectedNativePlayer } from './native-player.mjs';

export const sourceFiles=[new URL('./native-player.mjs',import.meta.url)];
export const scenario={id:'map-expansion-native-editor',criteria:[{id:'map-authoring',variant:'prologue-and-elowen',expectedRef:'planos/tasks/eventbridge-minimal-runtime/verification.md#expansion-runtime-scenarios'}],requires:['native-mz','public-input'],browser:{width:1280,height:720,dpr:1,locale:'pt-BR',query:'',timeoutMs:30000}};

// The fixture must first be edited and saved through the native MZ editor.
export async function execute(context){
 const player=new DirectedNativePlayer(context);
 await player.choose('Jogar');await player.file(1);
 assert.equal((await player.ready()).text,'Prólogo — fala editada no mapa.');
 await player.assertMapOwner(2);await context.shot('prologue-edited-native-line');
 await player.until('formation');const before=await player.snapshot('before-elowen');
 await player.choose('Elowen',{mouse:true});await player.until('hero');await player.assertMapOwner(38);
 await player.choose('Conversar');
 assert.equal((await player.ready()).text,'Elowen — fala editada no mapa.');
 await player.assertMapOwner(38);await context.shot('elowen-edited-native-line');
 await player.until('hero');const after=await player.snapshot('elowen-completed');
 assert.deepEqual(after.campaign,before.campaign);
 assert.ok(after.readUnits.includes(86)&&after.readUnits.includes(87));
 await player.returnToTavern();await context.shot('edited-conversation-return');
 context.report.observations.push({label:'editor-expansion-completed',kind:'editor-result',value:{maps:[2,38],units:[86,87]}});
}
export async function verify({expected,report,artifacts}){
 const result=report.observations.find(row=>row.kind==='editor-result');
 return{criteria:expected.map(row=>({...row,status:result?'executed-awaiting-review':'fail',observed:result?.value,evidence:artifacts.map(row=>row.path),limits:['Native MZ edit provenance and image review are separate from human author usability.']})),pendingReviews:['Inspect native edited-line captures and the recorded MZ editing session.']};
}
