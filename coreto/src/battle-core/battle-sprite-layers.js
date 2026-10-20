function installBattleSpriteLayers() {
    Sprite_Battler.prototype.createDistortionSprite = function() {
        const sprite=new Sprite();sprite.anchor.set(0.5,0.5);
        this.addChildAt(sprite,0);this._distortionSprite=sprite;
    };
    const battlerMembers=Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers=function(){battlerMembers.call(this);this.createDistortionSprite();};
    Sprite_Battler.prototype.attachSpritesToDistortionSprite=function(){
        if(this._shadowSprite)this.addChildAt(this._shadowSprite,0);
        for(const child of [this._weaponSprite,this._svBattlerSprite,this._mainSprite,this._injectAnimationSprite]){
            if(child)this._distortionSprite.addChild(child);
        }
    };
    const actorMembers=Sprite_Actor.prototype.initMembers;
    Sprite_Actor.prototype.initMembers=function(){
        actorMembers.call(this);this.attachSpritesToDistortionSprite();
    };
    Sprite_Actor.prototype.mainSprite=function(){return this._distortionSprite;};
    const actorFrame=Sprite_Actor.prototype.updateFrame;
    Sprite_Actor.prototype.updateFrame=function(){
        actorFrame.call(this);
        const half=this._mainSprite.height/2;
        this._distortionSprite.y=-Math.floor(half*2-this.mainSpriteHeight()/2);this._mainSprite.y=half;
    };
    const enemyMembers=Sprite_Enemy.prototype.initMembers;
    Sprite_Enemy.prototype.initMembers=function(){
        enemyMembers.call(this);this.createMainSprite();
    };
    Sprite_Enemy.prototype.createMainSprite=function(){
        this._mainSprite=new Sprite();this._mainSprite.anchor.set(0.5,1);
        this.attachSpritesToDistortionSprite();
    };
    Sprite_Enemy.prototype.mainSprite=function(){return this._distortionSprite;};
    Sprite_Enemy.prototype.loadBitmap=function(name){
        this._mainSprite.bitmap=$gameSystem.isSideView()?ImageManager.loadSvEnemy(name):ImageManager.loadEnemy(name);
    };
    Sprite_Enemy.prototype.setHue=function(hue){this._mainSprite.setHue(hue);};
    Sprite_Enemy.prototype.updateFrame=function(){
        const source=this._svBattlerSprite?this._enemy.svBattlerData():this._mainSprite.bitmap;
        const width=source.width,height=source.height;
        if(!this.bitmap||this.bitmap.width!==width||this.bitmap.height!==height){
            if(this.bitmap)this.bitmap.destroy();
            this.bitmap=new Bitmap(width,height);this.bitmap.markCoreEngineModified();
        }
        this.setFrame(0,0,width,height);
        this._distortionSprite.y=-Math.floor(height-this.mainSpriteHeight()/2);this._mainSprite.y=height/2;
        if(this._svBattlerSprite)this._svBattlerSprite.position.set(0,height/2);
        if(!this._svBattlerSprite)this._mainSprite.setFrame(0,0,width,this._effectType==='bossCollapse'?this._effectDuration:height);
    };
}
