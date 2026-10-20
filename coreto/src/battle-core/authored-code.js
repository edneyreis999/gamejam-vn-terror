const battleNoteFunctions = new Map();
function battleNoteBlock(object, name) {
    return (object?.note ?? '').match(new RegExp('<' + name + '>\\s*([\\s\\S]*?)\\s*</' + name + '>', 'i'))?.[1];
}
function runBattleNote(action, object, name, target, value, binding) {
    const source = battleNoteBlock(object, name);
    if (source === undefined) return value;
    const body = name === 'JS Targets';
    const key = binding + '\n' + (body ? source : 'script');
    let callback = battleNoteFunctions.get(key);
    const context = `${name} on ${object.name} (${object.id})`;
    try {
        if (!callback) {
            callback = new Function('target', binding, 'source', 'context', 'user', 'item', 'action',
                'const a=user,b=target,origin=user,skill=item,v=$gameVariables._data,s=$gameSwitches._data;\n' +
                'try {\n' + (body ? source : 'eval(source);') + '\n} catch (error) { console.error("[BATTLE_AUTHORED_CODE] " + context, error); }\nreturn ' + binding + ';');
            battleNoteFunctions.set(key, callback);
        }
        const isAction=action instanceof Game_Action;
        return callback.call(action,target,value,source,context,isAction?action.subject():action,isAction?action.item():object,isAction?action:action.currentAction());
    } catch (error) {
        console.error('[BATTLE_AUTHORED_CODE] ' + context, error);
        return value;
    }
}

function battleNotes(battler) {
    return battler.traitObjects().filter(Boolean);
}
function battleHasTag(objects, tag) {
    const expression = new RegExp('<' + tag + '>', 'i');
    return objects.some(object => expression.test(object.note));
}
function battleTagSum(objects, tag, percent = false, {signed = false, stack = false, decimal = true} = {}) {
    const number = (signed ? '[+\\-]' : '') + '\\d+' + (decimal ? '(?:\\.\\d+)?' : '');
    const expression = new RegExp('<' + tag + ': (' + number + ')' + (percent ? '[%％]' : '') + '>', stack ? 'gi' : 'i');
    return objects.reduce((sum, object) => {
        const matches = stack ? [...object.note.matchAll(expression)] : [object.note.match(expression)].filter(Boolean);
        return sum + matches.reduce((value, match) => value + Number(match[1]), 0);
    }, 0) / (percent ? 100 : 1);
}

const battleActionHookNames={PreStartActionJS:'Pre-Start Action',PostStartActionJS:'Post-Start Action',PreEndActionJS:'Pre-End Action',PostEndActionJS:'Post-End Action',PreApplyJS:'Pre-Apply',PostApplyJS:'Post-Apply',PreDamageJS:'Pre-Damage',PostDamageJS:'Post-Damage'};
function runBattleActionNotes(action,key,target,value,readOnly=true){
    const name='JS '+battleActionHookNames[key],hit=key.includes('Apply')||key.includes('Damage');
    const run=(object,tag)=>{
        const result=runBattleNote(action,object,tag,target,value,'value');
        if(!readOnly)value=result;
    };
    run(action.item(),name);
    for(const object of battleNotes(action.subject()))run(object,name+(hit?' as User':''));
    if(hit)for(const object of battleNotes(target))run(object,name+' as Target');
    return value;
}
