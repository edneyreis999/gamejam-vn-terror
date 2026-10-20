function installBattleAnimations(settings) {
    const counter=BattleManager.invokeCounterAttack;
    BattleManager.invokeCounterAttack=function(subject,target){
        const result=counter.call(this,subject,target);
        if(settings.ActionSequence.CounterPlayback)this._logWindow.showAttackAnimation(target,[subject]);
        return result;
    };
    const reflect=BattleManager.invokeMagicReflection;
    BattleManager.invokeMagicReflection=function(subject,target){
        const result=reflect.call(this,subject,target);
        if(settings.ActionSequence.ReflectAnimation>0)$gameTemp.requestFauxAnimation([target],settings.ActionSequence.ReflectAnimation);
        if(settings.ActionSequence.ReflectPlayback)this._logWindow.showAnimation(target,[subject],this._action.item().animationId);
        return result;
    };
    Spriteset_Battle.prototype.animationBaseDelay=function(){return 0;};
    Spriteset_Battle.prototype.animationNextDelay=function(){return 0;};
    const regenerate=Game_Battler.prototype.regenerateAll;
    Game_Battler.prototype.regenerateAll=function(){
        const result=regenerate.call(this);
        if($gameParty.inBattle()&&$gameTroop.turnCount()>0&&this.isAlive()&&this.isAppeared()){
            for(const object of battleNotes(this)){
                const id=Number(object.note.match(/<SLIP ANIMATION: (\d+)>/i)?.[1]??0);
                if(id)$gameTemp.requestFauxAnimation([this],id);
            }
        }
        return result;
    };
    Game_Battler.prototype.performCastAnimation=function(action,mirror){
        if(!action?.item()||action.isAttack()||action.isGuard()||action.isItem()||$gameTemp._playTestFastMode)return;
        const note=action.item().note,tag=note.match(/<CAST ANIMATION: (\d+)>/i);
        if(!tag&&/<NO CAST ANIMATION>/i.test(note))return;
        const id=tag?Number(tag[1]):settings.ActionSequence[['CastCertain','CastPhysical','CastMagical'][action.item().hitType]];
        if(id>0)$gameTemp.requestAnimation([this],id,!!mirror);
    };
    Game_Enemy.prototype.attackAnimationId=function(){return Number(this.enemy().note.match(/<ATTACK ANIMATION: (\d+)>/i)?.[1]??settings.Enemy.AttackAnimation);};
    Window_BattleLog.prototype.showEnemyAttackAnimation=function(subject,targets){this.showNormalAnimation(targets,subject.attackAnimationId(),false);};
    for(const method of ['requestAnimation','requestFauxAnimation']){
        const previous=Game_Temp.prototype[method];
        Game_Temp.prototype[method]=function(targets,...args){return previous.call(this,targets.filter(Boolean),...args);};
    }
    const createAnimation=Spriteset_Base.prototype.createAnimation;
    Spriteset_Base.prototype.createAnimation=function(request){return createAnimation.call(this,{...request,targets:request.targets.filter(Boolean)});};
    const faux=Spriteset_Base.prototype.createFauxAnimation;
    Spriteset_Base.prototype.createFauxAnimation=function(request){return faux.call(this,{...request,targets:request.targets.filter(Boolean)});};
    for(const Type of [Sprite_Animation,Sprite_AnimationMV]){
        Type.prototype.isUnderAnimation=function(){return !this._isProjectile&&/<UNDER>/i.test(this._animation?.name??'');};
    }
    const lower=Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer=function(){
        lower.call(this);
        this._animationContainer=new Sprite();
        (Spriteset_Battle.ANTI_TINT_UI?this:this._battleField).addChild(this._animationContainer);
    };
    const create=Spriteset_Battle.prototype.createAnimationSprite;
    Spriteset_Battle.prototype.createAnimationSprite=function(...args){
        create.apply(this,args);
        const sprite=this._animationSprites[this._animationSprites.length-1];
        this.addAnimationSpriteToContainer(sprite);
    };
    Spriteset_Battle.prototype.addAnimationSpriteToContainer=function(sprite){
        const container=sprite.isUnderAnimation()?this._underAnimationContainer:this._animationContainer;
        if(Spriteset_Battle.ANTI_TINT_UI)container.position.copyFrom(this._effectsContainer.position);
        else if(sprite.isUnderAnimation())container.position.copyFrom(this._animationContainer.position);
        container.addChild(sprite);
    };
    const remove=Spriteset_Base.prototype.removeAnimation;
    Spriteset_Base.prototype.removeAnimation=function(sprite){
        sprite.parent?.removeChild(sprite);
        return remove.call(this,sprite);
    };
}
