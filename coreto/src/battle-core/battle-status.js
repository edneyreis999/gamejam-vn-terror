function installInBattleStatus(settings) {
    const config = settings.InBattleStatus;
    class Sprite_GaugeRate extends Sprite_Gauge {
        currentDisplayedValue() {
            const maximum = this.currentMaxValue();
            return Math.floor((maximum > 0 ? this.currentValue() / maximum : 1) * 100) + '%';
        }
    }
    globalThis.Sprite_GaugeRate = Sprite_GaugeRate;
    class Window_InBattleStatusStates extends Window_Command {
        setBattler(battler) { this._battler = battler; this.refresh(); this.select(0); }
        makeCommandList() {
            if (!this._battler) return;
            this.addBattlerAspect();
            this.addBattlerStates();
            this.addBattlerBuffsDebuffs();
            if (!this._list.length) this.addNormalStatus();
        }
        addBattlerAspect() {
            if(this._battler.isEnemy()&&this._battler.hasAspectData()){
                const aspect=this._battler.getAspectData();
                const color=aspect.nameColor.startsWith('#')?'\\HEXCOLOR<'+aspect.nameColor+'>':'\\C['+aspect.nameColor+']';
                this.addCommand('\\I['+aspect.iconIndex+']'+color+aspect.name,'aspect');
            }
        }
        includeState(state) { return !/<Exclude From Status List(?:ing)?>/i.test(state.note); }
        makeStateName(state) { return '\\I[' + state.iconIndex + ']\\C[0]' + state.name; }
        addBattlerStates() {
            if (config.drawStates) for (const state of this._battler.states()) if (this.includeState(state)) this.addCommand(this.makeStateName(state), 'state', true, state.id);
        }
        makeBuffName(id) {
            const level = this._battler.buff(id);
            return '\\I[' + this._battler.buffIconIndex(level,id) + ']\\C[0]' + (level > 0 ? config.buffNameFmt : config.debuffNameFmt).format(TextManager.param(id));
        }
        addBattlerBuffsDebuffs() {
            for (let id=0;id<8;id++) {
                const level = this._battler.buff(id);
                if ((level > 0 && config.drawBuffs) || (level < 0 && config.drawDebuffs)) this.addCommand(this.makeBuffName(id),'buff',true,id);
            }
        }
        addNormalStatus() { this.addCommand('\\I['+config.normalIcon+']'+config.normalText,'normal'); }
        drawItem(index) {
            const rect = this.itemLineRect(index);
            this.drawTextEx(this.commandName(index),rect.x,rect.y,rect.width);
        }
        makeTurnsText(stateId) {
            const state = $dataStates[stateId];
            if (state.autoRemovalTiming === 0) return this._battler.isPassiveState?.(stateId) ? config.passiveText : '';
            const turns = this._battler._stateTurns[stateId] ?? 0;
            return (state.autoRemovalTiming === 1 ? config.actionsFmt : config.TurnsFmt).format(turns,'\\C[0]');
        }
        makeStateHelpText(stateId) {
            const state = $dataStates[stateId];
            const description = battleNoteBlock(state,'In-Battle Status Description') ?? battleNoteBlock(state,'Help Description') ?? '';
            return config.stateHelpFmt.format(description,this.makeTurnsText(stateId));
        }
        makeBuffHelpText(id) {
            const level = this._battler.buff(id);
            const turns = this._battler._buffTurns[id] ?? 0;
            return (level > 0 ? config.buffHelpFmt : config.debuffHelpFmt).format(TextManager.param(id),Math.round(this._battler.paramBuffRate(id)*100)+'%','\\C[0]',config.TurnsFmt.format(turns,'\\C[0]'));
        }
        updateHelp() {
            const symbol = this.currentSymbol();
            const text = symbol === 'aspect' ? this._battler.getAspectData().description : symbol === 'state' ? this.makeStateHelpText(this.currentExt()) : symbol === 'buff' ? this.makeBuffHelpText(this.currentExt()) : config.normalHelp;
            this.setHelpWindowItem({description:text});
        }
    }
    class Window_InBattleStatus extends Window_StatusBase {
        initialize(rect) {
            super.initialize(rect);
            this.setBackgroundType(config.StatusWindow_BgType);
            const width = Math.min(config.statesMaxWidth,Math.floor(this.width/2));
            this._statesWindow = new Window_InBattleStatusStates(new Rectangle(this.width-width,Graphics.boxWidth>1100?0:1,width,this.innerHeight));
            this.addChild(this._statesWindow);
            this._statesWindow.opacity=0;
            this._statesWindow.deactivate();
            if (config.pageButtons && ConfigManager.touchUI) {
                this._previousButton=new Sprite_Button('pageup');
                this._nextButton=new Sprite_Button('pagedown');
                this._previousButton.setClickHandler(this.previousActor.bind(this));
                this._nextButton.setClickHandler(this.nextActor.bind(this));
                this._previousButton.x=this.pageButtonX();
                this._nextButton.x=this._previousButton.x+this._previousButton.width+4;
                this._previousButton.y=this._nextButton.y=this.pageButtonY();
                this.addChild(this._previousButton);this.addChild(this._nextButton);
            }
            this.openness = 0;
        }
        pageButtonX() {
            const x=Graphics.boxWidth>1100 ? (config.pageButtonPosition==='left' ? -110 : this.width+10) : this.width-106;
            return x+config.pageOffsetX;
        }
        pageButtonY() { return (Graphics.boxWidth>1100 ? this.height-60 : 60)+config.pageOffsetY; }
        setBattler(battler) { this._battler = battler; this._statesWindow.setBattler(battler); this.refresh(); }
        update() {
            super.update();
            if (this.isOpen() && SceneManager._scene?._inBattleStatusMode) {
                if (Input.isRepeated('right')) this.nextActor();
                else if (Input.isRepeated('left')) this.previousActor();
            }
        }
        nextActor() { SceneManager._scene.changeInBattleStatus(1); }
        previousActor() { SceneManager._scene.changeInBattleStatus(-1); }
        setReturnWindow(window) { this._returnWindow = window; }
        getReturnWindow() { return this._returnWindow; }
        getBattleMembers() { return this._battler?.isEnemy() ? $gameTroop.members() : $gameParty.battleMembers(); }
        graphicType() { return config.StatusGraphic; }
        drawingAreaWidth() { return Math.max(0,this.width-this._statesWindow.width); }
        displayedParams() { return ['MAXHP','MAXMP','ATK','DEF','MAT','MDF','AGI','LUK']; }
        drawDarkRect(x,y,width,height) { this.contents.fillRect(x+1,y+1,width-2,height-2,ColorManager.dimColor1()); }
        drawParamData(param,x,y,width) {
            const id = this.displayedParams().indexOf(param);
            const battler = this._battler;
            const visible = battler.isActor() || config.enemyShowParametersAlways || (config.enemyShowParametersIfBattleTest && DataManager.isBattleTest()) || (config.enemyShowParametersIfDefeated && $gameSystem.getDefeatedEnemies().includes(battler.enemyId()));
            this.changeTextColor(ColorManager.systemColor());
            const padding = this.itemPadding();
            this.drawText(TextManager.param(id),x+padding,y,width-padding*2);
            this.resetTextColor();
            let value=visible ? battler.param(id) : config.enemyHiddenParameter;
            if (visible && battler.buff(id)!==0) value=(battler.buff(id)>0 ? config.buffValueFmt : config.debuffValueFmt).format(value);
            this.drawText(value,x+padding,y,width-padding*2,'right');
        }
        drawActorGraphic(battler,x,y,width,height) {
            if (battler.isActor()) {
                if (this.graphicType() === 'none') return;
                if (this.graphicType() === 'sprite') {
                    const bitmap=ImageManager.loadCharacter(battler.characterName());
                    bitmap.addLoadListener(() => {
                        const frameHeight=bitmap.height/(ImageManager.isBigCharacter(battler.characterName())?4:8);
                        if (this._battler === battler && !this._destroyed) this.drawActorCharacter(battler,x+width/2,y+(height+frameHeight)/2);
                    });
                } else if (this.graphicType() === 'svbattler') this.drawItemActorSvBattler(battler,x,y,width,height);
                else this.drawActorFace(battler,x,y,width,height);
            } else {
                if (battler.hasSvBattler()) return this.drawItemActorSvBattler(battler,x,y,width,height);
                const bitmap = $gameSystem.isSideView() ? ImageManager.loadSvEnemy(battler.battlerName()) : ImageManager.loadEnemy(battler.battlerName());
                const draw = () => {
                    if (this._battler !== battler || this._destroyed) return;
                    const scale = Math.min(width/bitmap.width,height/bitmap.height,1);
                    this.contents.blt(bitmap,0,0,bitmap.width,bitmap.height,x+(width-bitmap.width*scale)/2,y+(height-bitmap.height*scale)/2,bitmap.width*scale,bitmap.height*scale);
                };
                bitmap.addLoadListener(draw);
            }
        }
        drawItemActorSvBattler(battler,x,y,width,height) {
            const bitmap=ImageManager.loadSvActor(battler.isActor()?battler.battlerName():battler.svBattlerName());
            bitmap.addLoadListener(() => {
                if (this._battler !== battler || this._destroyed) return;
                const w=bitmap.width/9,h=bitmap.height/6;
                this.contents.blt(bitmap,0,0,w,h,x+(width-w)/2,y+(height-h)/2,w,h);
            });
        }
        placeGauge(battler,type,x,y) {
            const key=(battler.isActor() ? 'actor'+battler.actorId() : 'enemy'+battler.index())+'-gauge-'+type;
            const sprite=this.createInnerSprite(key,battler.isEnemy() ? Sprite_GaugeRate : Sprite_Gauge);
            sprite.setup(battler,type);sprite.move(x,y);sprite.show();
        }
        drawActorSimpleStatus(battler,x,y) {
            this.drawActorName(battler,x,y);
            if (battler.isActor() || config.enemyShowLevel) this.drawActorLevel(battler,x,y+this.lineHeight());
            if (battler.isActor()) this.drawActorClass(battler,x+180,y);
            this.placeBasicGauges(battler,x+180,y+this.lineHeight());
        }
        refresh() {
            this.hideAdditionalSprites();
            this.contents.clear();
            if (this._battler) {
                config.StatusWindow_DrawJS.call(this);
                this._statesWindow.height = this.height-this._statesWindow.y-4;
                this._statesWindow.createContents();
                this._statesWindow.refresh();
            }
        }
    }
    globalThis.Window_InBattleStatus = Window_InBattleStatus;
    globalThis.Window_InBattleStatusStates = Window_InBattleStatusStates;
    const scene = Scene_Battle.prototype;
    scene.inBattleStatusWindowRect = function() { return config.StatusWindow_RectJS.call(this); };
    scene.createInBattleStatusWindow = function() {
        const window = new Window_InBattleStatus(this.inBattleStatusWindowRect());
        this._inBattleStatusWindow = window;
        const states = window._statesWindow;
        states.setHelpWindow(this._helpWindow);
        states.setHandler('cancel',this.endInBattleStatus.bind(this));
        states.setHandler('ok',() => states.activate());
        this.addWindow(window);
    };
    const createAllWindows = scene.createAllWindows;
    scene.createAllWindows = function() { createAllWindows.call(this); this.createInBattleStatusWindow(); };
    scene.startInBattleStatus = function(returnWindow) {
        this._inBattleStatusMode = true;
        returnWindow.deactivate();
        if (['xp','portrait','border'].includes(this.battleLayoutStyle())) returnWindow.close();
        const window = this._inBattleStatusWindow;
        window.setReturnWindow(returnWindow);
        window.setBattler(returnWindow._actor ?? $gameParty.leader());
        window.show();
        window.open();
        window._statesWindow.activate();
        this._helpWindow.show();
        window._statesWindow.updateHelp();
    };
    scene.changeInBattleStatus = function(direction) {
        const window = this._inBattleStatusWindow;
        const members = $gameParty.battleMembers().concat(config.enemyStatus ? $gameTroop.members() : []);
        const index = (members.indexOf(window._battler)+direction+members.length)%members.length;
        window.setBattler(members[index]);
        window._statesWindow.activate();
    };
    scene.endInBattleStatus = function() {
        const window = this._inBattleStatusWindow;
        this._inBattleStatusMode = false;
        window._statesWindow.deactivate();
        window.close();
        this._helpWindow.hide();
        const returnWindow=window.getReturnWindow();
        returnWindow.show();
        returnWindow.open();
        returnWindow.activate();
    };
    const inputActive = scene.isAnyInputWindowActive;
    scene.isAnyInputWindowActive = function() { return this._inBattleStatusMode || inputActive.call(this); };
    const timeActive = scene.isTimeActive;
    scene.isTimeActive = function() { return !this._inBattleStatusMode && timeActive.call(this); };
    const needsChange = scene.needsInputWindowChange;
    scene.needsInputWindowChange = function() { return !this._inBattleStatusMode && needsChange.call(this); };
}
