function installBattleSequenceSets(commands) {
    const {register,context} = commands;
    function child(interpreter,steps) {
        const list=steps.map(([name,args={}])=>{
            const descriptor=catalog.commands.find(command=>command.key==='ActSeq_'+name);
            const raw=Object.fromEntries(descriptor.args.map(field=>[field.storageKey,field.nativeDefault]));
            for(const [key,value]of Object.entries(args)){
                const field=descriptor.args.find(field=>field.key===key);
                raw[field.storageKey]=field.type==='array'?JSON.stringify(value):String(value);
            }
            return {code:357,indent:0,parameters:[catalog.pluginId,descriptor.key,descriptor.label,raw]};
        });
        list.push({code:0,indent:0,parameters:[]});interpreter.setupChild(list,interpreter.eventId());
    }
    register('Set_SetupAction',function(args){
        const steps=[];
        if(args.DisplayAction)steps.push(['BattleLog_DisplayAction']);
        if(args.ApplyImmortal)steps.push(['Mechanics_Immortal',{Targets:['user','all targets'],Immortal:true}]);
        if(args.ActionStart)steps.push(['Movement_BattleStep',{Targets:['user'],WaitForMovement:args.WaitForMovement}]);
        if(args.CastAnimation)steps.push(['Animation_CastAnimation',{Targets:['user'],WaitForAnimation:args.WaitForAnimation}]);
        child(this,steps);
    });
    for(const kind of ['Whole','Target'])register('Set_'+kind+'ActionSet',function(args){
        const steps=[],chosen=kind==='Whole'?['all targets']:['current target'];
        if(args.PerformAction)steps.push(['Motion_PerformAction',{Targets:['user']}]);
        steps.push(['Motion_WaitMotionFrame',{MotionFrameWait:0}]);
        if(args.ActionAnimation)steps.push(['Animation_ActionAnimation',{Targets:chosen,WaitForAnimation:kind==='Whole'?args.WaitForAnimation:false}]);
        if(args.ActionEffect)steps.push(['Mechanics_ActionEffect',{Targets:chosen}]);
        if(args.ApplyImmortal)steps.push(['Mechanics_Immortal',{Targets:chosen,Immortal:false}]);
        child(this,steps);
        const before=kind==='Whole'?args.WaitCount:args.WaitCount1;
        const after=kind==='Target'?args.WaitCount2:0;
        const list=this._childInterpreter._list;
        const motionIndex=args.PerformAction?1:0;
        list[motionIndex]={code:230,indent:0,parameters:[before]};
        if(after)list.splice(motionIndex+2,0,{code:230,indent:0,parameters:[after]});
        if(args.DualWield&&context().subject.isActor()){
            const body=list.slice(0,-1),expanded=[];
            const slots=context().subject.equips().flatMap((item,index)=>DataManager.isWeapon(item)?[index+1]:[]);
            for(const slot of slots){
                expanded.push({code:357,indent:0,parameters:[catalog.pluginId,'ActSeq_Weapon_SetActiveWeapon','',{'Targets:arraystr':'["user"]','SlotID:eval':String(slot)}]},...body);
            }
            expanded.push({code:357,indent:0,parameters:[catalog.pluginId,'ActSeq_Weapon_ClearActiveWeapon','',{'Targets:arraystr':'["user"]'}]},{code:0,indent:0,parameters:[]});
            if(slots.length)this._childInterpreter.setup(expanded,this.eventId());
        }
    });
    register('Set_FinishAction',function(args){
        const steps=[];
        if(args.ApplyImmortal)steps.push(['Mechanics_Immortal',{Targets:['user','all targets'],Immortal:false}]);
        if(args.WaitForNewLine)steps.push(['BattleLog_WaitForNewLine']);
        if(args.WaitForEffect)steps.push(['Mechanics_WaitForEffect']);
        if(args.ClearBattleLog)steps.push(['BattleLog_Clear']);
        if(args.ActionEnd)steps.push(['Movement_HomeReset',{Targets:['user'],WaitForMovement:args.WaitForMovement}]);
        child(this,steps);
    });
}
