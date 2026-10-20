function installBattleEnemyNames(settings) {
    const config=settings.Enemy;
    class Sprite_EnemyName extends Sprite_Name {
        initialize() { super.initialize(); this.anchor.set(0.5,0); this.opacity=0; this._temporaryDuration=0; }
        bitmapWidth() { return Graphics.boxWidth; }
        bitmapHeight() { return 144; }
        fontSize() { return config.NameFontSize; }
        linkSprite(sprite) { this._linkedSprite=sprite;this.setup(sprite._battler); }
        redraw() {
            this.setupFont();this.bitmap.clear();
            this.bitmap.drawText(this.name(),0,0,this.bitmapWidth(),36,'center');
        }
        temporaryVisibile() { this._temporaryDuration=config.NameDamageVisibility; }
        isAlwaysHidden() { return config.NameAlwaysHidden; }
        isAlwaysVisible() { return config.NameAlwaysVisible; }
        isBattlerTargeted() {
            if(!config.NameAsTarget||BattleManager.isInputting()&&!BattleManager.isActiveTpb())return false;
            return this._battler&&BattleManager._subject&&BattleManager._targets.includes(this._battler);
        }
        isIncludedInEnemyWindow() { const window=SceneManager._scene?._enemyWindow;return !!window?.active && window._enemies.includes(this._battler); }
        visibilityState() {
            if (!this._battler?.isAppeared() || this.isAlwaysHidden()) return false;
            if (this.isAlwaysVisible() || this._temporaryDuration>0 || (config.NameAsTarget&&this.isBattlerTargeted())) return true;
            return config.NameAlwaysSelectOnly ? this._battler.isSelected() : this.isIncludedInEnemyWindow();
        }
        update() {
            super.update();
            const sprite=this._linkedSprite;
            if (!sprite) return;
            this.x=sprite.x+this._battler.battleUIOffsetX()+config.NameOffsetX;
            this.y=sprite.y+this._battler.battleUIOffsetY()-18+config.NameOffsetY;
            this.opacity+=this.visibilityState()?16:-16;
            if(this._temporaryDuration>0)this._temporaryDuration--;
            if(config.NameAttachStateIcon){
                const icon=sprite._stateIconSprite;
                icon.x=this._battler.battleUIOffsetX()+config.NameOffsetX-this.bitmap.measureTextWidth(this.name())/2-20+config.AttachStateOffsetX;
                icon.y=this._battler.battleUIOffsetY()+config.NameOffsetY+config.AttachStateOffsetY;
                icon.opacity=this.opacity;
            }
        }
    }
    globalThis.Sprite_EnemyName=Sprite_EnemyName;
    const createLower=Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer=function(){
        createLower.call(this);
        this._enemyNameSprites=this._enemySprites.map(sprite=>{
            const name=new Sprite_EnemyName();name.linkSprite(sprite);this._uiContainer.addChild(name);return name;
        });
    };
    const apply=Game_Action.prototype.apply;
    Game_Action.prototype.apply=function(target){
        apply.call(this,target);
        if(target.isEnemy())SceneManager._scene?._spriteset?._enemyNameSprites?.find(sprite=>sprite._battler===target)?.temporaryVisibile();
    };
    const select=Window_BattleEnemy.prototype.select;
    const lastSelected=new WeakMap();
    Window_BattleEnemy.prototype.select=function(index){select.call(this,index);if(this.enemy())lastSelected.set($gameTroop,this.enemy());};
    const drawBackground=Window_BattleEnemy.prototype.drawItemBackground;
    Window_BattleEnemy.prototype.drawItemBackground=function(index){if(config.NameLegacy)drawBackground.call(this,index);};
    const startSelection=Scene_Battle.prototype.startEnemySelection;
    Scene_Battle.prototype.startEnemySelection=function(){
        const previous=lastSelected.get($gameTroop);
        startSelection.call(this);
        const window=this._enemyWindow;
        if(!config.NameLegacy){window.opacity=0;window.contentsOpacity=0;window.cursorVisible=false;this._statusWindow.show();}
        if(config.LastSelected&&window._enemies.includes(previous))window.select(window._enemies.indexOf(previous));
        else if(($gameSystem.isSideView()&&config.SideviewSelect)||(!$gameSystem.isSideView()&&config.FrontViewSelect)){
            const preferred=window._enemies.reduce((best,enemy)=>!best||enemy.screenX()>best.screenX()?enemy:best,null);
            window.select(window._enemies.indexOf(preferred));
        }
    };
}
