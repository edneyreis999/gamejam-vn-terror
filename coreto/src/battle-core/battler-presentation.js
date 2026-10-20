function installBattlerPresentation(settings) {
    Spriteset_Battle.ANTI_TINT_UI=settings.BattleLayout.AntiTintUiElements;
    const damagePresentation=new WeakMap();
    const pushLog=Window_BattleLog.prototype.push;
    Window_BattleLog.prototype.push=function(method,...params){
        if(method==='performDamage'){
            const result=params[0].result();
            params.push({hpAffected:result.hpAffected,hpDamage:result.hpDamage});
        }
        return pushLog.call(this,method,...params);
    };
    const logDamage=Window_BattleLog.prototype.performDamage;
    Window_BattleLog.prototype.performDamage=function(target,result){
        if(result)damagePresentation.set(target,result);
        try{return logDamage.call(this,target);}
        finally{damagePresentation.delete(target);}
    };
    const members=Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers=function(){
        members.call(this);this._shakeFlinchDuration=0;this._shakeFlinchPower=0;
    };
    Game_Battler.prototype.performShakeFlinch=function(){
        const result=damagePresentation.get(this)??this.result(),sprite=this.sprite();
        if(!settings.Actor.ShakeFlinch||!sprite||!result.hpAffected||result.hpDamage<=0)return;
        const ratio=Math.min(1,Math.max(0.8,result.hpDamage/this.mhp));
        sprite._shakeFlinchDuration=Math.ceil(settings.Actor.ShakeFlinchDuration*ratio);
        sprite._shakeFlinchPower=settings.Actor.ShakeFlinchPower*ratio;
    };
    Sprite_Battler.prototype.updateShakeFlinch=function(){
        let offset=0;
        if(this._shakeFlinchDuration>0){
            this._shakeFlinchPower*=--this._shakeFlinchDuration/(this._shakeFlinchDuration+1);
            offset=Math.floor(Math.random()*this._shakeFlinchPower)*(Math.random()<0.5?-1:1);
        }
        if(this._mainSprite)this._mainSprite.x=offset;
        if(this._svBattlerSprite)this._svBattlerSprite.x=offset;
    };
    const updateMain=Sprite_Battler.prototype.updateMain;
    Sprite_Battler.prototype.updateMain=function(){updateMain.call(this);this.updateShakeFlinch();};
    Spriteset_Battle.prototype.createBattleFieldContainer=function(){
        this._underAnimationContainer=new Sprite();this._battleField.addChild(this._underAnimationContainer);
        this._battlerContainer=new Sprite();this._battleField.addChild(this._battlerContainer);
    };
    Spriteset_Battle.prototype.adjustFlippedBattlefield=function() {
        // The default field is unflipped; consumer aliases synchronize their layers here.
    };
    const field=Spriteset_Battle.prototype.createBattleField;
    Spriteset_Battle.prototype.createBattleField=function(){field.call(this);this.createBattleFieldContainer();};
    const lower=Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer=function(){
        lower.call(this);
        for(const sprite of this.battlerSprites())this._battlerContainer.addChild(sprite);
        this.adjustFlippedBattlefield();
    };
    Spriteset_Battle.prototype.compareBattlerSprites=function(a,b){
        if(!a._battler||!b._battler)return Number(!!b._battler)-Number(!!a._battler);
        if(settings.Actor.PrioritySortActors&&a._battler.isActor()!==b._battler.isActor())return a._battler.isActor()?1:-1;
        return a.y-b.y||b.spriteId-a.spriteId;
    };
    const updateSpriteset=Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update=function(){
        updateSpriteset.call(this);
        this.updateBattlerContainer();
    };
    Spriteset_Battle.prototype.updateBattlerContainer=function(){
        this._battlerContainer.children.sort(this.compareBattlerSprites.bind(this));
        const subject=BattleManager._subject;
        if(settings.Actor.PrioritySortActive&&BattleManager._phase==='action'&&BattleManager._action&&subject?.isActor()){
            const sprite=this.findTargetSprite(subject);
            if(sprite?.parent===this._battlerContainer)this._battlerContainer.setChildIndex(sprite,this._battlerContainer.children.length-1);
        }
    };
    const chanting=Game_Battler.prototype.isChanting;
    Game_Battler.prototype.isChanting=function(){
        return settings.Actor.ChantStyle?this.isWaiting()&&this._actions.some(action=>action.isMagical()):chanting.call(this);
    };
    const source = battler => battler.isActor() ? battler.actor() : battler.enemy();
    function pair(battler, tag) {
        return source(battler).note.match(new RegExp('<'+tag+': ([+-]?[\\d.]+), ([+-]?[\\d.]+)>','i'))?.slice(1).map(Number);
    }
    for (const Type of [Game_Actor, Game_Enemy]) {
        const defaults = Type === Game_Actor ? settings.Actor : settings.Enemy;
        for (const [axis,index] of [['X',0],['Y',1]]) {
            Type.prototype['svBattlerAnchor'+axis] = function() { return pair(this,'SIDEVIEW ANCHOR')?.[index] ?? defaults['Anchor'+axis]; };
            Type.prototype['battleUIOffset'+axis] = function() {
                const separate = source(this).note.match(new RegExp('<BATTLE UI OFFSET '+axis+': ([+-]\\d+)>','i'));
                return separate ? Number(separate[1]) : pair(this,'BATTLE UI OFFSET')?.[index] ?? 0;
            };
        }
        Type.prototype.svBattlerShadowVisible = function() {
            const note=source(this).note;
            if (/<SIDEVIEW HIDE SHADOW>/i.test(note)) return false;
            return /<SIDEVIEW SHOW SHADOW>/i.test(note) || defaults.Shadow;
        };
    }
    Sprite_Actor.prototype.setActorHome = function(index) {
        settings.Actor.HomePosJS.call(this,index);
        this.setHome(this._homeX+settings.Actor.OffsetX,this._homeY+settings.Actor.OffsetY);
    };
    const updateBitmap = Sprite_Actor.prototype.updateBitmap;
    Sprite_Actor.prototype.updateBitmap = function() {
        updateBitmap.call(this);
        this._mainSprite.anchor.set(this._actor.svBattlerAnchorX(),this._actor.svBattlerAnchorY());
        this._mainSprite.bitmap.smooth=settings.Actor.SmoothImage;
        this._stateSprite.position.set(settings.Actor.StateOverlayOffsetX,settings.Actor.StateOverlayOffsetY);
    };
    Sprite_Actor.prototype.motionSpeed = function() { return settings.Actor.MotionSpeed; };
    const updateShadow = Sprite_Actor.prototype.updateShadow;
    Sprite_Actor.prototype.updateShadow = function() {
        updateShadow.call(this);
        if (!this._actor) return;
        this._shadowSprite.visible=this._actor.svBattlerShadowVisible();
        const note=source(this._actor).note;
        for (const axis of ['x','y']) {
            const match=note.match(new RegExp('<SIDEVIEW SHADOW SCALE '+axis+': ([\\d.]+)(%?)>','i')) ?? note.match(/<SIDEVIEW SHADOW SCALE: ([\d.]+)(%?)>/i);
            this._shadowSprite.scale[axis]=match ? Number(match[1])/(match[2]?100:1) : 1;
        }
    };
    const weapon = Sprite_Actor.prototype.setupWeaponAnimation;
    Sprite_Actor.prototype.setupWeaponAnimation = function() {
        weapon.call(this);
        const offsets=battleNotes(this._actor).map(object=>object.note.match(/<SIDEVIEW WEAPON OFFSET: ([+-]\d+), ([+-]\d+)>/i)).filter(Boolean);
        this._weaponSprite.x=-16+offsets.reduce((sum,match)=>sum+Number(match[1]),0);
        this._weaponSprite.y=offsets.reduce((sum,match)=>sum+Number(match[2]),0);
    };
    const enemySetBattler = Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler = function(battler) {
        enemySetBattler.call(this,battler);
        this.setHome(this._homeX+settings.Enemy.OffsetX,this._homeY+settings.Enemy.OffsetY);
    };
    Sprite_Enemy.prototype.updateStateSprite = function() {
        this._stateIconSprite.x=this._enemy.battleUIOffsetX();
        this._stateIconSprite.y=Math.max(-this.height-36+this._enemy.battleUIOffsetY(),20-this.y);
    };
    const enemyBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() { enemyBitmap.call(this);this._mainSprite.bitmap.smooth=settings.Enemy.SmoothImage; };
    const performDamage = Game_Battler.prototype.performDamage;
    Game_Battler.prototype.performDamage = function() {
        performDamage.call(this);
        this.performShakeFlinch();
        const sprite=this.sprite();
        if(sprite&&$gameSystem.isSideView())sprite.startMove(sprite._offsetX+(this.isActor()?1:-1)*settings.Actor.FlinchDistanceX,sprite._offsetY+settings.Actor.FlinchDistanceY,settings.Actor.FlinchDuration);
    };
    const startMove = Sprite_Battler.prototype.startMove;
    Sprite_Battler.prototype.startMove = function(...args) {
        if (this._battler?.isEnemy() && /<BATTLER SPRITE CANNOT MOVE>/i.test(this._battler.enemy().note)) return;
        return startMove.apply(this,args);
    };
}
