function installBattleGauges(settings) {
    const config=settings.HpGauge;
    const createContainers=Spriteset_Battle.prototype.createBattleFieldContainer;
    Spriteset_Battle.prototype.createBattleFieldContainer=function(){
        createContainers.call(this);this.createUIContainer();
    };
    Spriteset_Battle.prototype.createUIContainer=function(){
        this._uiContainer=new Sprite();
        (Spriteset_Battle.ANTI_TINT_UI?this:this._battleField).addChild(this._uiContainer);
        SceneManager._scene._uiContainer=this._uiContainer;
    };
    Spriteset_Battle.prototype.updateUiContainerPosition=function(){
        if(Spriteset_Battle.ANTI_TINT_UI){
            const origin=this._battleField.toGlobal(new Point());
            this._uiContainer.position.copyFrom(this.toLocal(origin));
        }else if(Imported.VisuMZ_3_ActSeqCamera)this._uiContainer.position.copyFrom(this._battleField.position);
    };
    const updateLayers=Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update=function(){updateLayers.call(this);this.updateUiContainerPosition();};
    BattleManager.addChildToUiContainer=function(sprite){SceneManager._scene._uiContainer?.addChild(sprite);};
    BattleManager.removeChildFromUiContainer=function(sprite){SceneManager._scene._uiContainer?.removeChild(sprite);};
    ConfigManager.visualHpGauge=true;
    const makeData=ConfigManager.makeData,applyData=ConfigManager.applyData;
    ConfigManager.makeData=function(){return {...makeData.call(this),visualHpGauge:this.visualHpGauge};};
    ConfigManager.applyData=function(data){applyData.call(this,data);this.visualHpGauge=data.visualHpGauge===undefined?true:!!data.visualHpGauge;};
    Game_System.prototype.getDefeatedEnemies=function(){return this._defeatedEnemies??=[];};
    Game_System.prototype.registerDefeatedEnemy=function(id){const enemies=this.getDefeatedEnemies();if(!enemies.includes(id))enemies.push(id);};
    const firstDefeat=new WeakSet();
    const collapse=Game_Enemy.prototype.performCollapse;
    Game_Enemy.prototype.performCollapse=function(){
        if(!$gameSystem.getDefeatedEnemies().includes(this.enemyId()))firstDefeat.add(this);
        $gameSystem.registerDefeatedEnemy(this.enemyId());
        return collapse.call(this);
    };
    class Sprite_HpGauge extends Sprite_Gauge {
        gaugeX(){return 0;}
        smoothness(){return config.AniDuration;}
        redraw(){this.bitmap.clear();if(!isNaN(this._value))this.drawGauge();}
    }
    globalThis.Sprite_HpGauge=Sprite_HpGauge;
    Sprite_Battler.prototype.isVisualHpGaugeDisplayed=function(){
        const battler=this._battler;
        if(!battler||!ConfigManager.visualHpGauge||!battler.isAppeared()||this.opacity===0)return false;
        if(battler.isActor())return config.ShowActorGauge&&$gameSystem.isSideView();
        const note=battler.enemy().note;
        if(!config.ShowEnemyGauge)return false;
        if(/<SHOW HP GAUGE>/i.test(note))return true;
        if(/<HIDE HP GAUGE>/i.test(note))return false;
        if(battler.isAlive())firstDefeat.delete(battler);
        return !config.RequiresDefeat||config.BTestBypass&&BattleManager.isBattleTest()||!firstDefeat.has(battler)&&$gameSystem.getDefeatedEnemies().includes(battler.enemyId());
    };
    const update=Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update=function(){
        update.call(this);
        if(this instanceof Sprite_SvEnemy||!this.parent||!this._battler)return;
        if(!this._hpGaugeSprite){
            if(!ConfigManager.visualHpGauge)return;
            this._hpGaugeSprite=new Sprite_HpGauge();
            this._hpGaugeSprite.anchor.set(config.AnchorX,config.AnchorY);this._hpGaugeSprite.scale.set(config.Scale);
            let owner=this.parent;
            while(owner&&!(owner instanceof Spriteset_Battle))owner=owner.parent;
            (Spriteset_Battle.ANTI_TINT_UI&&owner?owner._uiContainer:this).addChild(this._hpGaugeSprite);
        }
        const gauge=this._hpGaugeSprite;
        if(gauge._battler!==this._battler)gauge.setup(this._battler,'hp');
        const detached=gauge.parent!==this;
        gauge.position.set((detached?this.x:0)+config.OffsetX+this._battler.battleUIOffsetX(),(detached?this.y:0)-this.height+config.OffsetY+this._battler.battleUIOffsetY());
        gauge.visible=this.isVisualHpGaugeDisplayed();
    };
    const destroy=Sprite_Battler.prototype.destroy;
    Sprite_Battler.prototype.destroy=function(...args){
        if(this._hpGaugeSprite){this._hpGaugeSprite.parent?.removeChild(this._hpGaugeSprite);this._hpGaugeSprite.destroy();this._hpGaugeSprite=null;}
        return destroy.apply(this,args);
    };
    const options=Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions=function(){options.call(this);if(config.AddHpGaugeOption)this.addCommand(config.Name,'visualHpGauge');};
    const maxCommands=Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands=function(){return maxCommands.call(this)+(config.AddHpGaugeOption&&config.AdjustRect?1:0);};
}
