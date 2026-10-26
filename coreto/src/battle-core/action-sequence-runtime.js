function installBattleSequenceRuntime(settings) {
    const parents = [], parallel = new Map(), immortals = new Set();
    let current = null, menuApplication = false, startedPages = false;
    BattleManager._forcedBattlers=[];
    BattleManager.forceAction=function(battler) {
        if(battler===this._subject||!battler.currentAction())return;
        const action=JsonEx.makeDeepCopy(battler.currentAction());
        this._forcedBattlers.push([battler,action]);
        this._actionBattlers.remove(battler);
    };
    function commonEvents(item, named=true) {
        const ids = item.effects.filter(effect => effect.code === Game_Action.EFFECT_COMMON_EVENT).map(effect => effect.dataId);
        const clean = text => text.replace(/\\I\[\d+\]/gi, '').trim().toUpperCase();
        const keys = [...item.note.matchAll(/<COMMON EVENT KEYS?: ([^>]+)>/gi)].flatMap(match => match[1].split(','));
        for (const match of item.note.matchAll(/<COMMON EVENT KEYS>([\s\S]*?)<\/COMMON EVENT KEYS>/gi)) keys.push(...match[1].split(/\r?\n/));
        for (const key of keys.map(clean).filter(Boolean)) {
            for (const event of $dataCommonEvents.filter(Boolean)) {
                if ([...event.name.matchAll(/\[([^\]]+)\]/g)].some(match => clean(match[1].replaceAll(',', '')) === key)) ids.push(event.id);
            }
        }
        for (const match of named ? item.note.matchAll(/<COMMON EVENT: (.*?)>/gi) : []) {
            const event = $dataCommonEvents.find(event => event && clean(event.name) === clean(match[1]));
            if (event) ids.push(event.id);
        }
        return ids;
    }
    function custom(item) {
        return /<CUSTOM ACTION SEQUENCE>/i.test(item.note) || (settings.ActionSequence.AutoNotetag && !/<AUTO ACTION SEQUENCE>/i.test(item.note) && commonEvents(item).length > 0);
    }
    function releaseImmortals() {
        for (const battler of immortals) { immortals.delete(battler); battler.refresh(); }
    }
    Game_BattlerBase.prototype.isImmortal = function() { return immortals.has(this); };
    const resist = Game_BattlerBase.prototype.isStateResist;
    Game_BattlerBase.prototype.isStateResist = function(id) { return id === this.deathStateId() && this.isImmortal() || resist.call(this, id); };
    const applyGlobal = Game_Action.prototype.applyGlobal;
    Game_Action.prototype.applyGlobal = function() {
        if (custom(this.item())) {
            if ($gameParty.inBattle()) { this.updateLastUsed(); return; }
            if (menuApplication && !/<BYPASS AUTO ACTION SEQUENCE>/i.test(this.item().note)) return;
        }
        applyGlobal.call(this);
        const nativeCount=this.item().effects.filter(effect=>effect.code===Game_Action.EFFECT_COMMON_EVENT).length;
        for (const id of commonEvents(this.item(),$gameParty.inBattle()).slice(nativeCount)) $gameTemp.reserveCommonEvent(id);
    };
    const applyItem=Scene_ItemBase.prototype.applyItem;
    Scene_ItemBase.prototype.applyItem=function() {
        const parent=menuApplication;menuApplication=true;
        try { return applyItem.call(this); } finally { menuApplication=parent; }
    };
    const logStart = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        if (!custom(action.item())) return logStart.call(this, subject, action, targets);
    };
    const startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        startAction.call(this);
        const action = this._action;
        if (!custom(action.item())) { current = null; return; }
        const interpreter = new Game_Interpreter();
        interpreter.setup([...commonEvents(action.item()).map(id => ({code:117,indent:0,parameters:[id]})),{code:0,indent:0,parameters:[]}]);
        current = {action,subject:this._subject,targets:this._targets.slice(),index:0,interpreter};
    };
    const updateAction = BattleManager.updateAction;
    BattleManager.updateAction = function() {
        if (!current) return updateAction.call(this);
        const context = current;
        context.interpreter.update();
        if (context === current && this._phase === 'action' && !context.interpreter.isRunning() && !this.isActionForced()) this.endAction();
    };
    const updateEvent = BattleManager.updateEvent;
    BattleManager.updateEvent = function() {
        const starting=this._phase==='start';
        if(starting&&updateEvent.call(this))return true;
        if (!current && ['start','turn','turnEnd'].includes(this._phase) && this._forcedBattlers.length && !this.isAborting()) {
            const [battler,action]=this._forcedBattlers.shift();
            const interrupted=this._subject;
            if(interrupted?.numActions()>0&&!this._actionBattlers.includes(interrupted))this._actionBattlers.unshift(interrupted);
            battler._actions=[action];
            this._subject=battler;this.processTurn();return true;
        }
        return starting?false:updateEvent.call(this);
    };
    const forced = BattleManager.processForcedAction;
    BattleManager.processForcedAction = function() {
        if (!current) return forced.call(this);
        const battler = this._actionForcedBattler;
        if (!battler) return;
        parents.push({context:current,subject:this._subject,action:this._action,targets:this._targets,turnForced:this._turnForced});
        this._subject = battler;
        this._actionForcedBattler = null;
        this.startAction();
        battler.removeCurrentAction();
    };
    const endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        current = null;
        const parent = parents.pop();
        if (parent) {
            this._logWindow.endAction(this._subject);
            this._subject = parent.subject; this._action = parent.action; this._targets = parent.targets;
            this._turnForced = parent.turnForced; this._phase = 'action'; current = parent.context;
            return;
        }
        releaseImmortals();
        return endAction.call(this);
    };
    function clear() {
        current?.interpreter.clear();
        for (const parent of parents) parent.context.interpreter.clear();
        parents.length = 0; current = null; BattleManager._forcedBattlers=[];
        for (const interpreters of parallel.values()) for (const interpreter of interpreters) interpreter.clear();
        parallel.clear(); releaseImmortals();
    }
    for (const name of ['setup','endBattle']) {
        const previous = BattleManager[name];
        BattleManager[name] = function(...args) { clear(); startedPages=false; return previous.apply(this,args); };
    }
    for (const name of ['createGameObjects','extractSaveContents']) {
        const previous=DataManager[name];
        DataManager[name]=function(...args) { clear(); startedPages=false; return previous.apply(this,args); };
    }
    const terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() { clear(); return terminate.call(this); };
    const update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        update.call(this);
        const interpreters = parallel.get(this);
        if (interpreters) {
            for (const interpreter of interpreters) interpreter.update();
            parallel.set(this,interpreters.filter(interpreter=>interpreter.isRunning()));
        }
    };
    function enqueueParallel(scene,list) {
        const interpreter = new Game_Interpreter(); interpreter.setup(list);
        if (!parallel.has(scene)) parallel.set(scene,[]);
        parallel.get(scene).push(interpreter);
    }
    const start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        start.call(this);
        if(startedPages)return;
        startedPages=true;
        for(const page of $gameTroop.troop().pages) {
            const comments=page.list.filter(command=>command.code===108||command.code===408).map(command=>command.parameters[0]).join('\n');
            if(/<Once Parallel When Start Battle>/i.test(comments))enqueueParallel(this,page.list);
        }
    };
    Scene_Battle.prototype.playOnceParallelInterpreter = function(id) {
        const event = $dataCommonEvents[id];
        if (event) enqueueParallel(this,event.list);
    };
    const api = {
        custom,
        context:()=>current ?? {action:BattleManager._action,subject:BattleManager._subject,targets:BattleManager._targets ?? [],index:0},
        immortal(battler,value) { if (value) immortals.add(battler); else { immortals.delete(battler); battler.refresh(); } },
        clear
    };
    return api;
}

function installBattleAutomaticSequences(settings,sequences,commands) {
    const log=Window_BattleLog.prototype;
    const automatic=new WeakSet();
    const start=log.startAction;
    log.startAction=function(subject,action,targets){
        if(sequences.custom(action.item()))return start.call(this,subject,action,targets);
        automatic.add(action);
        const melee=$gameSystem.isSideView()&&action.isPhysical()&&(action.isForAll()?settings.ActionSequence.AutoMeleeAoE:settings.ActionSequence.AutoMeleeSolo);
        const unique=[...new Set(targets)];
        this.displayAction(subject,action.item());
        this.push('coretoAutoImmortal',subject,unique,true);
        this.push('performActionStart',subject,action);
        this.push('waitForMovement');
        this.push('coretoAutoCast',subject,action);
        this.push('coretoAutoWaitAnimation');
        if(melee){this.push('coretoAutoMove',subject,unique,false);this.push('waitForMovement');}
        const hits=subject.isActor()&&subject.isDualWield()&&action.isAttack()?Math.max(1,subject.weapons().length):1;
        for(let hit=0;hit<hits;hit++){
            const group=targets.slice(hit*targets.length/hits,(hit+1)*targets.length/hits);
            this.push('performAction',subject,action);
            this.push('waitForTime',12);
            this.push('showAnimation',subject,group,action.item().animationId);
            this.push('coretoAutoWaitAnimation');
            this.push('coretoAutoEffects',subject,group);
        }
        this.push('coretoAutoImmortal',subject,unique,false);
        if(melee){this.push('coretoAutoMove',subject,unique,true);this.push('waitForMovement');this.push('coretoAutoWalk',subject);}
        this.push('waitForNewLine');
        this.push('waitForEffect');
        this.push('clear');
        this.push('performActionEnd',subject);
        this.push('coretoAutoReturn');
        this.push('waitForMovement');
    };
    const end=log.endAction;
    log.endAction=function(subject){
        if(automatic.has(BattleManager._action)){automatic.delete(BattleManager._action);return;}
        return end.call(this,subject);
    };
    log.coretoAutoReturn=function(){for(const sprite of this._spriteset.battlerSprites())if(sprite._battler)sprite.startMove(0,0,12);};
    log.coretoAutoImmortal=function(subject,targets,value){for(const battler of [subject,...targets])sequences.immortal(battler,value);};
    log.coretoAutoCast=function(subject,action){subject.performCastAnimation(action,false);};
    log.coretoAutoMove=function(subject,targets,home){commands.autoMove(subject,targets,home);};
    log.coretoAutoWalk=function(subject){subject.requestMotion('walk');};
    log.coretoAutoWaitAnimation=function(){if(this._spriteset.isAnimationPlaying()||$gameTemp._animationQueue.length)this.setWaitMode('coretoAutoAnimation');};
    const wait=log.updateWaitMode;
    log.updateWaitMode=function(){
        if(this._waitMode!=='coretoAutoAnimation')return wait.call(this);
        if(this._spriteset.isAnimationPlaying()||$gameTemp._animationQueue.length)return true;
        this._waitMode='';return false;
    };
    log.coretoAutoEffects=function(subject,targets){
        const remainder=this._methods;this._methods=[];
        try{
            for(const target of targets){BattleManager._targets.shift();BattleManager.invokeAction(subject,target);}
        }finally{this._methods.push(...remainder);}
    };
    const next=log.callNextMethod;
    log.callNextMethod=function(){
        do{next.call(this);}while(this._methods.length&&this._waitCount===0&&!this._waitMode);
    };
}
