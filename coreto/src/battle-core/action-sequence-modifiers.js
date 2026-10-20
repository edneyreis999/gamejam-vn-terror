function installBattleSequenceModifiers(commands) {
    const {register,context,targets} = commands;
    const modifiers = new WeakMap();
    const clear = Game_Action.prototype.clear;
    Game_Action.prototype.clear = function() {
        modifiers.delete(this);
        return clear.call(this);
    };
    function state(action) { if(!modifiers.has(action))modifiers.set(action,{});return modifiers.get(action); }
    register('Mechanics_Multipliers',args=>{state(context().action).multipliers=args;});
    register('Mechanics_ArmorPenetration',args=>{state(context().action).armor=args;});
    register('Mechanics_CustomDmgFormula',args=>{state(context().action).formula=args.Formula.toLowerCase()==='default'?null:new Function('a','b','v','return ('+args.Formula+');');});
    for(const [method,prefix]of [['itemHit','Hit'],['itemCri','CriticalHit'],['applyCritical','CriticalDmg'],['makeDamageValue','Damage']]){
        const previous=Game_Action.prototype[method];
        Game_Action.prototype[method]=function(...args){const value=previous.apply(this,args),m=modifiers.get(this)?.multipliers;return m?value*m[prefix+'Rate']+m[prefix+'Flat']:value;};
    }
    const armor=Game_Action.prototype.applyArmorModifiers;
    Game_Action.prototype.applyArmorModifiers=function(target,value){value=armor.call(this,target,value);const m=modifiers.get(this)?.armor;return m?(value-m.ArPenFlat-m.ArRedFlat)*(1-m.ArPenRate)*(1-m.ArRedRate):value;};
    const formula=Game_Action.prototype.evalDamageFormula;
    Game_Action.prototype.evalDamageFormula=function(target){const fn=modifiers.get(this)?.formula;return fn?fn.call(this,this.subject(),target,$gameVariables._data):formula.call(this,target);};
    function popup(battler,text,args){
        const target=battler.sprite();if(!target?.parent)return;
        const sprite=new Sprite_Damage();sprite.x=target.x+target.damageOffsetX();sprite.y=target.y+target.damageOffsetY();
        const height=sprite.fontSize(),width=Math.max(height,Math.ceil(text.length*height));
        const child=sprite.createChildSprite(width,height);child.bitmap.textColor=args.TextColor;child.bitmap.drawText(text,0,0,width,height,'center');child.dy=0;
        sprite._flashColor=args.FlashColor.slice();sprite._flashDuration=args.FlashDuration;target._damages.push(sprite);target.damagePopupContainer().addChild(sprite);
    }
    register('Mechanics_TextPopup',args=>{for(const battler of targets(args))popup(battler,args.Text,args);});
    register('Mechanics_VariablePopup',args=>{
        const value=$gameVariables.value(args.Variable),text=args.DigitGrouping?String(value).replace(/\B(?=(\d{3})+(?!\d))/g,','):String(value);
        for(const battler of targets(args))popup(battler,text,args);
    });
}
