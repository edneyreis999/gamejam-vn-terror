function installBattleSideviewEnemies(settings) {
    function choice(note,singular,plural,fallback) {
        const single=note.match(new RegExp('<'+singular+': ([^>]+)>','i'));
        if(single)return single[1];
        const block=battleNoteBlock({note},plural);
        if(!block)return fallback;
        const values=block.split(/\r?\n/).map(line=>line.trim()).filter(Boolean).map(line=>{
            const match=/^(.*?):\s*(\d+)$/.exec(line);return {value:match?match[1].trim():line,weight:match?Number(match[2]):1};
        });
        let roll=Math.random()*values.reduce((sum,item)=>sum+item.weight,0);
        for(const item of values){roll-=item.weight;if(roll<0)return item.value;}
        return fallback;
    }
    Game_Enemy.prototype.clearBattleCoreData=function(){this._svBattlerData={};};
    Game_Enemy.prototype.setupBattleCoreData=function(){
        const note=this.enemy().note,config=settings.Enemy;
        const weapon=choice(note,'SIDEVIEW WEAPON','SIDEVIEW WEAPONS',null);
        const size=note.match(/<SIDEVIEW SIZE: (\d+), (\d+)>/i);
        this._svBattlerData={
            name:choice(note,'SIDEVIEW BATTLER','SIDEVIEW BATTLERS',''),
            motionIdle:choice(note,'SIDEVIEW IDLE MOTION','SIDEVIEW IDLE MOTIONS',config.MotionIdle),
            wtypeId:weapon===null?config.WtypeId:Math.max(0,$dataSystem.weaponTypes.findIndex(name=>name.replace(/\\I\[\d+\]/gi,'').trim().toUpperCase()===weapon.toUpperCase())),
            collapse:/<SIDEVIEW NO COLLAPSE>/i.test(note)?false:/<SIDEVIEW COLLAPSE>/i.test(note)||config.AllowCollapse,
            width:size?Number(size[1]):config.Width,height:size?Number(size[2]):config.Height,
            anchorX:this.svBattlerAnchorX(),anchorY:this.svBattlerAnchorY(),shadow:this.svBattlerShadowVisible()
        };
    };
    Game_Enemy.prototype.svBattlerData=function(){if(this._svBattlerData===undefined)this.setupBattleCoreData();return this._svBattlerData;};
    Game_Enemy.prototype.hasSvBattler=function(){return !!this.svBattlerData().name;};
    Game_Enemy.prototype.svBattlerName=function(){return this.svBattlerData().name;};
    Game_Enemy.prototype.allowCollapse=function(){return !this.hasSvBattler()||this.svBattlerData().collapse;};
    Game_Enemy.prototype.canBattlerMove=function(){return !/<BATTLER SPRITE CANNOT MOVE>/i.test(this.enemy().note);};
    Game_Enemy.prototype.isBattlerGrounded=function(){return !this.canBattlerMove()||/<BATTLER SPRITE GROUNDED>/i.test(this.enemy().note);};
    Game_Enemy.prototype.getAttackMotion=function(){return $dataSystem.attackMotions[this.svBattlerData().wtypeId];};
    Game_Enemy.prototype.getAttackMotionSlot=function(){return this.getAttackMotion();};
    Game_Enemy.prototype.performWeaponAnimation=function(){const motion=this.getAttackMotion();if(motion)this.startWeaponAnimation(motion.weaponImageId);};
    const attack=Game_Enemy.prototype.performAttack;
    Game_Enemy.prototype.performAttack=function(){
        attack.call(this);
        if(this.hasSvBattler()){
            const motion=this.getAttackMotion();
            this.requestMotion(['thrust','swing','missile'][motion?.type??0]);this.performWeaponAnimation();
        }
    };
    const transform=Game_Enemy.prototype.transform;
    Game_Enemy.prototype.transform=function(...args){const result=transform.apply(this,args);this.setupBattleCoreData();return result;};
    const setup=Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup=function(id,x,y){
        const source=$dataEnemies[id],name=choice(source.note,'SWAP ENEMY','SWAP ENEMIES',null);
        const replacement=name&&$dataEnemies.find(enemy=>enemy&&enemy.name.toUpperCase()===name.toUpperCase());
        setup.call(this,replacement?replacement.id:id,x,y);this.setupBattleCoreData();
    };
    class Sprite_SvEnemy extends Sprite_Actor {
        setBattler(enemy){
            Sprite_Battler.prototype.setBattler.call(this,enemy);this._actor=enemy;
            if(enemy){this.setHome(0,0);this._stateSprite.setup(enemy);this.refreshMotion();}
        }
        updateScale() {} // The outer enemy owns the composed geometry.
        moveToStartPosition(){this.startMove(0,0,0);}
        updateTargetPosition(){if(!this.inHomePosition())this.startMove(0,0,0);}
        updateBitmap(){
            Sprite_Battler.prototype.updateBitmap.call(this);
            const name=this._actor.svBattlerName();
            if(this._battlerName!==name){this._battlerName=name;this._mainSprite.bitmap=ImageManager.loadSvActor(name);}
            this._mainSprite.bitmap.smooth=settings.Enemy.SmoothImage;
            this._mainSprite.anchor.set(this._actor.svBattlerAnchorX(),this._actor.svBattlerAnchorY());
        }
        refreshMotion(){
            if(!this._actor)return;
            const state=this._actor.stateMotionIndex();
            const motion=state===3?'dead':state===2?'sleep':state===1?'abnormal':this._actor.isDying()?'dying':this._actor.isGuard()?'guard':this._actor.svBattlerData().motionIdle;
            this.startMotion(motion);
        }
        updateDamagePopup(){
            // The outer Sprite_Enemy owns action results and popup resources.
            for(const sprite of this._damages)sprite.update();
        }
    }
    globalThis.Sprite_SvEnemy=Sprite_SvEnemy;
    const setBattler=Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler=function(enemy){
        setBattler.call(this,enemy);this.setSvBattlerSprite(enemy);
    };
    Sprite_Enemy.prototype.setSvBattlerSprite=function(enemy){
        if(this._svBattlerSprite){this._svBattlerSprite.destroy();this._svBattlerSprite=null;this._shadowSprite.destroy();this._shadowSprite=null;}
        if(enemy.hasSvBattler()){
            this._svBattlerSprite=new Sprite_SvEnemy(enemy);this._svBattlerSprite.scale.x=-1;this._shadowSprite=this._svBattlerSprite._shadowSprite;this.addChild(this._shadowSprite);
        }
        this.attachSpritesToDistortionSprite();
    };
    const bitmap=Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap=function(){
        if(this._enemy.hasSvBattler()!==!!this._svBattlerSprite){
            this.setBattler(this._enemy);this._battlerName=null;
        }
        if(!this._svBattlerSprite)return bitmap.call(this);
        Sprite_Battler.prototype.updateBitmap.call(this);
        const info=this._enemy.svBattlerData();
        this._mainSprite.bitmap=null;
        if(!this.bitmap||this.bitmap.width!==info.width||this.bitmap.height!==info.height){
            if(this.bitmap)this.bitmap.destroy();
            this.bitmap=new Bitmap(info.width,info.height);this.bitmap.markCoreEngineModified();this.initVisibility();
        }
    };
    const effect=Sprite_Enemy.prototype.startEffect;
    Sprite_Enemy.prototype.startEffect=function(type){
        if(this._svBattlerSprite&&!this._enemy.allowCollapse()&&['collapse','bossCollapse','instantCollapse'].includes(type)){
            this._svBattlerSprite.refreshMotion();return;
        }
        return effect.call(this,type);
    };
}
