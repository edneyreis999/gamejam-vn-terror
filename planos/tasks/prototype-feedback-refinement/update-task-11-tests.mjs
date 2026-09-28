import assert from 'node:assert/strict';
import {readFileSync,writeFileSync} from 'node:fs';
const file='rpg-maker/tests/suites/endings.mjs';
let source=readFileSync(file,'utf8');
const start=source.indexOf("canonicalCase('IT-073'");assert.ok(start>=0);
let tail=source.slice(start);
tail=tail.replace("assert.equal(await browser.evaluate('Array.from({length:11},(_,i)=>$gameScreen.picture(60+i)).some(Boolean)'),false);","assert.equal(await browser.evaluate('Array.from({length:10},(_,i)=>$gameScreen.picture(61+i)).some(Boolean)'),false);\n   assert.equal(await browser.evaluate('$gameMessage.speakerName()'),'Rheed');");
tail=tail.replace("assert.equal(await browser.evaluate('$gameScreen.picture(1)?.name()'),`Dryland_EpilogueH${hero}`);","assert.equal(await browser.evaluate('$gameScreen.picture(1)?.name()'),'Dryland_Black');\n   assert.equal(await browser.evaluate('$gameScreen.picture(60)?.name()'),'Reed final');");
tail=tail.replaceAll('ImageManager.loadPicture($gameScreen.picture(1).name())','ImageManager.loadPicture($gameScreen.picture(60).name())');
tail=tail.replace('const p=$gameScreen.picture(1),b=','const p=$gameScreen.picture(60),b=');
tail=tail.replace('width:source.width,height:source.height,x:640,y:360,sx:source.scalePercent,sy:source.scalePercent,origin:1','width:408,height:560,x:472.42857142857144,y:40,sx:82.14285714285714,sy:82.14285714285714,origin:0');
writeFileSync(file,source.slice(0,start)+tail);
// Credits integration also follows the new narrator rather than retired hero illustrations.
const memorial='rpg-maker/tests/suites/memorial.mjs';source=readFileSync(memorial,'utf8');
source=source.replace("name=`Dryland_Epilogue${hero}`","name='Reed final'").replace('`$gameScreen.picture(1)?.name()===${JSON.stringify(name)}`','`$gameScreen.picture(60)?.name()===${JSON.stringify(name)}`').replace("Array.from({length:11},(_,i)=>$gameScreen.picture(60+i)?.name()).filter(Boolean)","Array.from({length:10},(_,i)=>$gameScreen.picture(61+i)?.name()).filter(Boolean)");
writeFileSync(memorial,source);
