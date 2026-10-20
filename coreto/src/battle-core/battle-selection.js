function installBattleSelection(settings) {
    const config = settings.MultiTarget;
    const selectedTargets = new WeakMap();
    const clear = Game_Action.prototype.clear;
    Game_Action.prototype.clear = function() { selectedTargets.delete(this); return clear.call(this); };
    Game_Action.prototype.canSingleOrMultipleSelect = function() {
        return !!this.item() && this.needsSelection() && !this.isForDeadFriend() && /<Single or Multiple Select>/i.test(this.item()?.note ?? '');
    };
    const makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function() {
        const selection = selectedTargets.get(this);
        if (!selection) return makeTargets.call(this);
        const members = selection === 'actors' ? $gameParty.aliveMembers() : selection === 'enemies' ? $gameTroop.aliveMembers() : [selection];
        const targets = this.applyTargetFilters(this.makeTargetsBattleCoreJS(this.repeatTargets(members)));
        this._coretoTargetCount = targets.length;
        return targets;
    };
    for (const prototype of [Window_BattleActor.prototype,Window_BattleEnemy.prototype]) {
        prototype.isActionSelectionValid = function(battler) {
            const action = BattleManager.inputtingAction();
            if (!action?.item() || !battler) return false;
            if (battler === action.subject() && /<Cannot Target User>/i.test(action.item().note)) return false;
            return action.isForDeadFriend() ? battler.isDead() : battler.isAlive();
        };
        prototype.isCurrentItemEnabled = function() {
            return this.isActionSelectionValid(this instanceof Window_BattleActor ? this.actor(this.index()) : this.enemy());
        };
    }
    class Window_BattleMultiTarget extends Window_Command {
        initialize(rect,forActor) {
            this._forActor = forActor;
            super.initialize(rect);
            this.setBackgroundType(config.BgType);
            this.deactivate();
            this.deselect();
            this.hide();
        }
        forActor() { return this._forActor; }
        makeCommandList() { this.addCommand((this.forActor() ? 'W:' : 'Q:') + (this.forActor() ? config.AllActorsText : config.AllEnemiesText),'selectAll'); }
        drawItem(index) {
            const rect = this.itemLineRect(index);
            this.drawText(this.commandName(index),rect.x,rect.y,rect.width,'center');
        }
        visibilityState() {
            const scene = SceneManager._scene;
            const action = BattleManager.inputtingAction();
            if (!action?.canSingleOrMultipleSelect() || (!scene._actorWindow.active && !scene._enemyWindow.active)) return false;
            return this.forActor() ? action.isForFriend() : action.isForOpponent();
        }
        update() {
            super.update();
            const available = this.visibilityState();
            this.visible = config.ShowButton && available;
            if (available && Input.isTriggered(this.forActor() ? 'pagedown' : 'pageup')) this.callHandler('selectAll');
        }
        processTouch() {
            if (!this.visible || !this.isOpen()) return;
            if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) this.callHandler('selectAll');
        }
    }
    globalThis.Window_BattleMultiTarget = Window_BattleMultiTarget;
    const scene = Scene_Battle.prototype;
    scene.multiTargetWindowRect = function(forActor) {
        const height = this.calcWindowHeight(1,true);
        return new Rectangle((forActor ? Graphics.boxWidth-config.WindowWidth+config.ActorOffsetX : config.EnemyOffsetX),Graphics.boxHeight-this.windowAreaHeight()-height-10+(forActor ? config.ActorOffsetY : config.EnemyOffsetY),config.WindowWidth,height);
    };
    scene.createMultiTargetWindow = function(forActor) {
        const window = new Window_BattleMultiTarget(this.multiTargetWindowRect(forActor),forActor);
        window.setHandler('selectAll',() => this.selectAllBattleTargets(forActor));
        this.addWindow(window);
        return window;
    };
    scene.createMultiTargetWindows = function() {
        this._actorMultiTargetWindow = this.createMultiTargetWindow(true);
        this._enemyMultiTargetWindow = this.createMultiTargetWindow(false);
    };
    const createWindows = scene.createAllWindows;
    scene.createAllWindows = function() { createWindows.call(this); this.createMultiTargetWindows(); };
    scene.selectAllBattleTargets = function(forActor) {
        const action = BattleManager.inputtingAction();
        selectedTargets.set(action,forActor ? 'actors' : 'enemies');
        this._actorWindow.hide();
        this._actorWindow.deactivate();
        this._enemyWindow.hide();
        this._enemyWindow.deactivate();
        this._actorMultiTargetWindow.hide();
        this._enemyMultiTargetWindow.hide();
        SoundManager.playOk();
        this.selectNextCommand();
    };
    for (const [method,windowName] of [['onActorOk','_actorWindow'],['onEnemyOk','_enemyWindow']]) {
        const original = scene[method];
        scene[method] = function() {
            const action = BattleManager.inputtingAction();
            if (action.isBattleCoreTargetScope() && /^(ALLY OR ENEMY|ENEMY OR ALLY)$/.test(action.item().scope)) {
                const window = this[windowName];
                selectedTargets.set(action,windowName === '_actorWindow' ? window.actor(window.index()) : window.enemy());
            }
            return original.call(this);
        };
    }
    const selectAction = scene.onSelectAction;
    scene.onSelectAction = function() {
        const action = BattleManager.inputtingAction();
        selectedTargets.delete(action);
        if (action.item()?.scope === 'ALLY OR ENEMY') {
            this._skillWindow.hide();
            this._itemWindow.hide();
            this.startActorSelection();
        } else selectAction.call(this);
    };
    const updateSelection = scene.update;
    scene.update = function() {
        const action = BattleManager.inputtingAction();
        if (action?.isBattleCoreTargetScope() && /^(ALLY OR ENEMY|ENEMY OR ALLY)$/.test(action.item().scope)) {
            if (this._enemyWindow.active && Input.isTriggered('right')) {
                this._enemyWindow.hide();this._enemyWindow.deactivate();this.startActorSelection();
            } else if (this._actorWindow.active && Input.isTriggered('left')) {
                this._actorWindow.hide();this._actorWindow.deactivate();this.startEnemySelection();
            }
        }
        return updateSelection.call(this);
    };
}
