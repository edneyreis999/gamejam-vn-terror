function battleSpriteDimension(sprite,axis) {
    if(sprite._svBattlerSprite)return sprite._enemy.svBattlerData()[axis];
    return sprite._mainSprite?.[axis]??sprite[axis];
}
function updateBattleSpritePosition(sprite,x,y) {
    sprite._baseX=x;sprite._baseY=y;sprite.x=x;
    sprite.y=y+battleSpriteDimension(sprite,"height")-sprite.mainSpriteHeight()+sprite.extraPositionY();
}
function installBattlePublicInterfaces() {
    Scene_Battle.prototype.setVisibleUI = function(visible) {
        this._windowLayer.x = visible ? (Graphics.width - Graphics.boxWidth) / 2 : Graphics.width * 10;
        this._windowLayer.y = visible ? (Graphics.height - Graphics.boxHeight) / 2 : Graphics.height * 10;
    };
    BattleManager.isBattleSys=function(name){return String(name).toLowerCase()===(this.isTpb()?'tpb':'dtb');};
    ImageManager.svActorHorzCells=9;
    ImageManager.svActorVertCells=6;
    Game_Enemy.prototype.skills=function(){return [...new Set(this.enemy().actions.map(action=>action.skillId))].map(id=>$dataSkills[id]);};
    Game_Battler.prototype.battler=function(){return this.sprite();};
    Sprite_Battler.prototype.mainSpriteWidth=function(){return battleSpriteDimension(this,"width")*this.mainSpriteScaleX();};
    Sprite_Battler.prototype.mainSpriteHeight=function(){return battleSpriteDimension(this,"height")*this.mainSpriteScaleY();};
    Sprite_Battler.prototype.mainSpriteScaleX=function(){return this._coretoScaleX??1;};
    Sprite_Battler.prototype.mainSpriteScaleY=function(){return this._coretoScaleY??1;};
    Sprite_Battler.prototype.extraPositionY=function(){return -(this._coretoFloatHeight??0)-(this._coretoJumpHeight??0);};
    const compatibility=globalThis.VisuMZ??={};
    compatibility.ParseActorNotetags??=function() {};
    const parseState=compatibility.ParseStateNotetags;
    compatibility.ParseStateNotetags=function(state){
        parseState?.call(this,state);
        state.description=battleNoteBlock(state,'Help Description')??'-';
        const description=battleNoteBlock(state,'In-Battle Status Description');
        if(description!==undefined)state.statusDescription=description;
        if(/<Exclude From Status List(?:ing)?>/i.test(state.note))state.excludeListing=true;
    };
    Window_BattleLog.prototype.emulateActionEffect=function(subject,target,item){
        const action=new Game_Action(subject),previous=BattleManager._action;
        const methods=this._methods,waitCount=this._waitCount,waitMode=this._waitMode;
        action.setItemObject(item);
        BattleManager._action=action;
        this._methods=[];
        try {
            action.apply(target);
            this.displayActionResults(subject,target);
            while(this._methods.length)this.callNextMethod();
        } finally {
            BattleManager._action=previous;
            this._methods=methods;
            this._waitCount=waitCount;
            this._waitMode=waitMode;
        }
    };
    DataManager.processRandomizedData=function(list){
        const values=list.map(value=>{
            const match=value.match(/^(.*?):\s*(\d+)$/);
            return {value:match?match[1].trim():value,weight:match?Number(match[2]):1};
        });
        let roll=Math.random()*values.reduce((sum,row)=>sum+row.weight,0);
        for(const row of values){roll-=row.weight;if(roll<=0)return row.value;}
        return '';
    };
}
