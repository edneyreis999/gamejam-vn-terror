function installBattleSequenceCommands(runtime, settings) {
    const handlers = new Map(), waits = new WeakMap();
    const context = () => runtime.context();
    const targets = args => battleSequenceTargets(args.Targets ?? ['all targets'], context());
    const log = () => BattleManager._logWindow;
    const sprites = () => BattleManager._spriteset;
    const register = (name,handler) => handlers.set('ActSeq_'+name,handler);
    const wait = (interpreter,predicate) => { waits.set(interpreter,predicate); interpreter.setWaitMode('coretoBattleSequence'); };
    const updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode !== 'coretoBattleSequence') return updateWaitMode.call(this);
        if (waits.get(this)?.()) return true;
        waits.delete(this); this._waitMode = ''; return false;
    };
    register('Mechanics_ActionEffect',args=>{
        const {subject,action} = context();
        if (!subject || !action) return;
        for (const target of targets(args)) if (target.isBattleMember() && !target.isHidden()) BattleManager.invokeAction(subject,target);
    });
    register('Mechanics_Immortal',args=>{for(const target of targets(args))runtime.immortal(target,args.Immortal);});
    register('Mechanics_AtbGauge',args=>{
        if(!Imported.VisuMZ_2_BattleSystemATB)return;
        for(const target of targets(args)){
            target.changeAtbChargeTime(args.ChargeRate);
            target.changeAtbCastTime(args.CastRate);
            if(args.Interrupt)target.atbInterrupt();
        }
    });
    register('Mechanics_OnceParallel',args=>SceneManager._scene.playOnceParallelInterpreter(args.CommonEventID));
    for (const [suffix,method] of [['AddState','addState'],['RemoveState','removeState']])register('Mechanics_'+suffix,args=>{
        for(const target of targets(args))for(const id of args.States)target[method](id);
    });
    const paramNames=['MAXHP','MAXMP','ATK','DEF','MAT','MDF','AGI','LUK'];
    for(const adding of [true,false])register('Mechanics_'+(adding?'Add':'Remove')+'BuffDebuff',args=>{
        for(const target of targets(args))for(const [key,method]of [['Buffs','addBuff'],['Debuffs','addDebuff']])for(const name of args[key]){
            const id=paramNames.indexOf(name.toUpperCase());
            if(id>=0 && (adding || (key==='Buffs'?target.isBuffAffected(id):target.isDebuffAffected(id))))target[adding?method:'removeBuff'](id,args.Turns);
        }
    });
    register('Mechanics_HpMpTp',args=>{
        for(const target of targets(args)){
            for(const [key,maximum,method]of [['HP',target.mhp,'gainHp'],['MP',target.mmp,'gainMp'],['TP',target.maxTp(),'gainTp']])target[method](Math.floor(maximum*args[key+'_Rate']+args[key+'_Flat']));
            if(args.ShowPopup)target.startDamagePopup();
        }
    });
    register('Mechanics_DamagePopup',args=>{for(const target of targets(args))target.startDamagePopup();});
    register('Mechanics_EnemyEscape',args=>{for(const target of targets(args))if(target.isEnemy())target.escape();});
    register('Mechanics_Collapse',function(args){
        for(const target of targets(args)){if(args.ForceDeath){runtime.immortal(target,false);target.addState(target.deathStateId());}if(target.isDead())target.performCollapse();}
        if(args.WaitForEffect)wait(this,()=>sprites().isEffecting());
    });
    for(const operation of ['By','To'])register('Mechanics_StateTurnsChange'+operation,args=>{
        for(const target of targets(args)){
            if(args.AutoAddState&&!target.isStateAffected(args.StateID))target.addState(args.StateID);
            if(target.isStateAffected(args.StateID))target._stateTurns[args.StateID]=Math.max(0,operation==='By'?target._stateTurns[args.StateID]+args.Turns:args.Turns);
        }
    });
    register('Mechanics_DeathBreak',function(args){if(context().targets.every(target=>target.isDead()||!target.isBattleMember()))this.command119([args.JumpToLabel]);});
    for(const kind of ['Attack','Guard','Item','Skill'])register('Mechanics_Emulate'+kind+'Effect',args=>{
        for(const user of battleSequenceTargets(args.Users,context())){
            const action = new Game_Action(user);
            if(kind==='Item')action.setItem(args.ItemID);else if(kind==='Skill')action.setSkill(args.SkillID);else action['set'+kind]();
            for(const target of targets(args))log().emulateActionEffect(user,target,action.item());
        }
    });
    register('Mechanics_EmulateSkillCost',args=>{for(const user of battleSequenceTargets(args.Users,context()))if($dataSkills[args.SkillID])user.paySkillCost($dataSkills[args.SkillID]);});
    for(const [name,method]of [['Clear','clear'],['DisplayAction','displayAction'],['PopBaseLine','popBaseLine'],['PushBaseLine','pushBaseLine'],['Refresh','refresh']])register('BattleLog_'+name,()=>{
        if(name==='DisplayAction')log()[method](context().subject,context().action.item());else log()[method]();
    });
    register('BattleLog_AddText',args=>log().addText(args.Text));
    register('BattleLog_UI',args=>{const scene=SceneManager._scene;for(const window of [scene._statusWindow,scene._partyCommandWindow,scene._actorCommandWindow])if(window)window.visible=args.ShowHide;});
    register('BattleLog_WaitForBattleLog',function(){wait(this,()=>log().isBusy());});
    register('BattleLog_WaitForNewLine',function(){log().waitForNewLine();wait(this,()=>log().isBusy());});
    register('Mechanics_WaitForEffect',function(){wait(this,()=>sprites().isEffecting());});
    for(const name of ['CurrentIndex','NextTarget','PrevTarget','RandTarget'])register('Target_'+name,function(args){
        const c=context();
        let index=name==='CurrentIndex'?args.Index:name==='NextTarget'?c.index+1:name==='PrevTarget'?c.index-1:Math.randomInt(c.targets.length);
        if(name==='RandTarget'&&args.ForceRandom&&c.targets.length>1&&index===c.index)index=(index+1)%c.targets.length;
        c.index=index;
        if(c.targets[index])this.command119([args.JumpToLabel]);
    });
    register('Weapon_SetActiveWeapon',args=>{for(const target of targets(args))if(target.isActor())target.setActiveWeapon(args.SlotID);});
    register('Weapon_ClearActiveWeapon',args=>{for(const target of targets(args))if(target.isActor())target.clearActiveWeapon();});
    register('Weapon_NextActiveWeapon',function(args){let found=false;for(const target of targets(args))if(target.isActor())found=target.nextActiveWeapon()||found;if(found)this.command119([args.JumpToLabel]);});
    function convert(command,raw){
        function evaluate(field,value,converted){
            if(field.type==='struct'){
                const result={};
                for(const child of field.fields)if(child.availability!=='editorial')result[child.key]=evaluate(child,value[child.key],result);
                return result;
            }
            if(field.type==='array')return value.map(item=>evaluate(field.items,item,converted));
            if(field.javascript==='script')return value===''?null:new Function('args','converted','return eval('+JSON.stringify(value)+');').call(VisuMZ,converted,converted);
            if(field.javascript==='body')return new Function(value);
            return value;
        }
        const result={...raw};
        for(const field of command.args){
            if(field.availability==='editorial')continue;
            result[field.key]=evaluate(field,decodeValue(field,raw[field.storageKey],command.key+'/'+field.key),result);
        }
        return result;
    }
    const api={handlers,wait,context,targets,register,convert};
    installBattleSequenceMotion(api,settings);
    installBattleSequenceAnimation(api,settings);
    installBattleSequenceSets(api);
    installBattleSequenceModifiers(api);
    installBattleSequenceCamera(api);
    installBattleSequenceProjectiles(api);
    installBattleSequenceImpact(api);
    for(const [key,handler] of handlers){
        const descriptor=catalog.commands.find(command=>command.key===key);
        for(const id of [catalog.pluginId,catalog.reference.pluginId])PluginManager.registerCommand(id,key,function(raw){
            if(!$gameParty.inBattle()&&!key.startsWith('ActSeq_Animation_ChangeBattlePortrait'))return;
            handler.call(this,convert(descriptor,raw));
        });
    }
    VisuMZ.CreateActionSequenceTargets = specifiers=>battleSequenceTargets(specifiers,context());
    return api;
}
