import fs from 'node:fs';
const file='rpg-maker/The Dryland Drowned/js/plugins/Dryland_EventBridge.js';
let source=fs.readFileSync(file,'utf8');
const remove=(start,end)=>{const a=source.indexOf(start),b=source.indexOf(end,a);if(a<0||b<0)throw new Error(`Missing removal boundary ${start}`);source=source.slice(0,a)+source.slice(b);};
remove('  function isNativeBustCommand(', '  // Transitional index');
remove('  function restorationCommands(', '  function validateEnvelope(');
source=source.replace('parseEventCatalog, restorationCommands,','parseEventCatalog,');
source=source.replaceAll('    closeConversation();\n','').replaceAll('    skippedPresentation = null;\n','').replace('      conversation = null;\n','');
remove('  let conversation = null;', '  function nextCheckpoint(');
remove('  const terminateMap = Scene_Map.prototype.terminate;', '  function sectionText(');
source=source.replace('    refreshCouncilProjection();\n','').replace("      if (campaign().phase !== 'council') closeConversation();\n",'');
remove("  PluginManager.registerCommand('Dryland_EventBridge', 'Present'", '  // The editor owns the branches;');
// Captured semantic identity belongs only to this interpreter's native lifetime.
const point=source.indexOf('  // The editor owns the branches;');
source=source.slice(0,point)+`  const clearInterpreter = Game_Interpreter.prototype.clear;
  Game_Interpreter.prototype.clear = function() {
    clearInterpreter.call(this);
    delete this._drylandContext;
    delete this._drylandReadingPassage;
    delete this._drylandChoiceKind;
  };

`+source.slice(point);
// The legacy skip control is removed by task09. No native unit uses this old
// presentation field, and the control has no active path after task02–06.
source=source.replace("    skippedPresentation = isBustDialogue(passageId) ? { passageId, expectedSequence: state.sequence } : null;\n",'');
fs.writeFileSync(file,source);
