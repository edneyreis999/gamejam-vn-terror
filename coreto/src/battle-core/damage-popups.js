function installBattleDamagePopups(settings) {
    const config=settings.Damage,queues=new WeakMap();
    const lower=Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer=function(){
        lower.call(this);this._damageContainer=new Sprite();
        this._damageContainer.position.copyFrom(this._battleField.position);this.addChild(this._damageContainer);
    };
    Sprite_Battler.prototype.damagePopupContainer=function(){
        let owner=this.parent;
        while(owner&&!(owner instanceof Spriteset_Battle)&&!(owner instanceof Window_BattleStatus))owner=owner.parent;
        return owner?owner._damageContainer:this.parent;
    };
    Sprite_Battler.prototype.destroyDamageSprite=function(sprite){
        sprite.parent?.removeChild(sprite);this._damages.remove(sprite);sprite.destroy();
    };
    let ended=false;
    const setupBattle=BattleManager.setup;
    BattleManager.setup=function(...args){ended=false;return setupBattle.apply(this,args);};
    for(const method of ['processVictory','onEscapeSuccess']){
        const previous=BattleManager[method];
        BattleManager[method]=function(...args){ended=true;return previous.apply(this,args);};
    }
    const start=Game_Battler.prototype.startDamagePopup;
    Game_Battler.prototype.startDamagePopup=function(){
        if(ended&&!config.EndBattlePopups)return;
        if(!queues.has(this))queues.set(this,[]);
        const result=this.result();
        if(result.missed||result.evaded)queues.get(this).push({miss:true});
        else {
            if(result.hpAffected)queues.get(this).push({type:result.hpDamage>=0?0:1,value:result.hpDamage,critical:result.critical});
            if(this.isAlive()&&result.mpDamage)queues.get(this).push({type:result.mpDamage>=0?2:3,value:result.mpDamage,critical:result.critical});
        }
        const value=start.call(this),sprite=this.sprite();
        if(sprite?.parent)sprite.setupDamagePopup();
        return value;
    };
    const initialize=Sprite_Damage.prototype.initialize;
    Sprite_Damage.prototype.initialize=function(){initialize.call(this);this._duration=config.PopupDuration;};
    Sprite_Damage.prototype.setupCriticalEffect=function(){this._flashColor=config.CriticalColor.slice();this._flashDuration=config.CriticalDuration;};
    Sprite_Damage.prototype.setupTextPopup=function(text){
        const height=this.fontSize(),width=Math.floor(height*0.75);
        for(let i=0;i<text.length;i++){
            const child=this.createChildSprite(width,height);
            child.bitmap.drawText(text[i],0,0,width,height,'center');child.x=(i-(text.length-1)/2)*width;child.dy=-i;
        }
    };
    Game_BattlerBase.prototype.damagePopupPosition=function(){return config.PopupPosition;};
    for(const axis of ['X','Y']){
        Game_BattlerBase.prototype['damagePopupOffset'+axis]=function(){return 0;};
        Game_Enemy.prototype['damagePopupOffset'+axis]=function(){return Number(this.enemy().note.match(new RegExp('<POPUP OFFSET '+axis+': ([+-]\\d+)>','i'))?.[1]??0);};
        const method='damageOffset'+axis,native=Sprite_Battler.prototype[method];
        Sprite_Battler.prototype[method]=function(){
            const position=this._battler.damagePopupPosition();
            const height=axis==='Y'?this.height*this.scale.y:0;
            const origin=position==='head'?height:position==='center'?height/2:0;
            return Math.round(native.call(this)+config['PopupOffset'+axis]+this._battler['damagePopupOffset'+axis]()-origin);
        };
        Sprite_Actor.prototype[method]=function(){return Sprite_Battler.prototype[method].call(this);};
    }
    Game_Enemy.prototype.damagePopupPosition=function(){return this.enemy().note.match(/<POPUP POSITION: (HEAD|CENTER|BASE)>/i)?.[1].toLowerCase()??config.PopupPosition;};
    function attachPopup(owner,sprite) {
        sprite.x=(owner._baseX??owner.x)+owner.damageOffsetX();
        sprite.y=(owner._baseY??owner.y)+owner.damageOffsetY()+owner.extraPositionY();
        if(config.NewPopupBottom)for(const previous of owner._damages){previous.x+=config.PopupShiftX;previous.y+=config.PopupShiftY;}
        else if(owner._damages.length){const last=owner._damages[owner._damages.length-1];sprite.x=last.x+config.PopupShiftX;sprite.y=last.y+config.PopupShiftY;}
        owner._damages.push(sprite);owner.damagePopupContainer().addChild(sprite);
    }
    function textPopup(owner,text,popupSettings,icon) {
        if(!text)return;
        const sprite=new Sprite_Damage();
        sprite._flashColor=popupSettings.flashColor.slice();sprite._flashDuration=popupSettings.flashDuration;
        const height=Math.max(sprite.fontSize(),icon===undefined?0:ImageManager.iconHeight),width=height*30;
        const child=sprite.createChildSprite(width,height+6);
        child.dy=0;child.bitmap.textColor=ColorManager.getColor(popupSettings.textColor);
        const inset=icon===undefined?0:ImageManager.iconWidth/2;
        child.bitmap.drawText(text,inset,0,width-inset,height,'center');
        if(icon!==undefined){
            const bitmap=ImageManager.loadSystem('IconSet'),iw=ImageManager.iconWidth,ih=ImageManager.iconHeight;
            const x=(width-child.bitmap.measureTextWidth(text)-iw)/2;
            bitmap.addLoadListener(()=>{if(!child._destroyed)child.bitmap.blt(bitmap,icon%16*iw,Math.floor(icon/16)*ih,iw,ih,x,0);});
        }
        attachPopup(owner,sprite);
    }
    Sprite_Battler.prototype.setupTextPopup=function(text,popupSettings){textPopup(this,text,popupSettings);};
    Sprite_Battler.prototype.setupIconTextPopup=function(icon,text,popupSettings){textPopup(this,text,popupSettings,icon);};
    Game_Battler.prototype.setupTextPopup=function(text,popupSettings={}){
        if(!text)return;
        const normalized={...popupSettings,textColor:popupSettings.textColor??'#ffffff',flashColor:popupSettings.flashColor??[0,0,0,0],flashDuration:popupSettings.flashDuration??0};
        this.battler()?.setupTextPopup(text,normalized);
    };
    const setup=Sprite_Battler.prototype.setupDamagePopup;
    Sprite_Battler.prototype.setupDamagePopup=function(){
        const queue=queues.get(this._battler);
        if(!queue)return setup.call(this);
        for(const popup of queue.splice(0)){
            if(!this._battler.isSpriteVisible())continue;
            const sprite=new Sprite_Damage();sprite._colorType=popup.type??0;
            if(popup.miss)sprite.createMiss();
            else {
                const format=popup.type===0?config.hpDamageFmt:popup.type===1?config.hpHealingFmt:popup.type===2?config.mpDamageFmt:config.mpHealingFmt;
                sprite.setupTextPopup(format.format(Math.abs(popup.value),TextManager.mpA));
                if(popup.critical)sprite.setupCriticalEffect();
            }
            attachPopup(this,sprite);
        }
        if(this._battler.isDamagePopupRequested()){this._battler.clearDamagePopup();this._battler.clearResult();}
    };
}
