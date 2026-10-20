function installBattleSequenceMotion(commands, settings) {
    const {register,targets,wait,context} = commands;
    Sprite_Battler._motionSpeed=settings.Actor.MotionSpeed;
    Sprite_Actor.prototype.stepForward=function(){this.startMove(-settings.ActionSequence.StepDistanceX,-settings.ActionSequence.StepDistanceY,settings.ActionSequence.StepDuration);};
    Sprite_Enemy.prototype.stepForward=function(){this.startMove(settings.ActionSequence.StepDistanceX,settings.ActionSequence.StepDistanceY,settings.ActionSequence.StepDuration);};
    const motions = new WeakMap(), homes = new WeakMap(), frozen = new WeakMap(), moving = new Map();
    const updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
    Sprite_Actor.prototype.updateTargetPosition = function() {
        if (![...moving.values()].some(sprites=>sprites.has(this))) return updateTargetPosition.call(this);
    };
    const endAction = BattleManager.endAction;
    BattleManager.endAction = function() { moving.delete(this._action); return endAction.call(this); };
    const endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(...args) { moving.clear(); return endBattle.apply(this,args); };
    Game_Battler.prototype.sprite = function() { return BattleManager._spriteset?.findTargetSprite(this); };
    function tracks(sprite) { if (!motions.has(sprite)) motions.set(sprite,new Map()); return motions.get(sprite); }
    function tween(sprite,kind,from,to,duration,easing,apply,finish) {
        if (duration <= 0) { tracks(sprite).delete(kind); apply(to); finish?.(); return; }
        tracks(sprite).set(kind,{from,to,duration,elapsed:0,easing,apply,finish});
    }
    const update = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function() {
        for (const [kind,track] of motions.get(this) ?? []) if(kind!=='Opacity') advance(this,kind,track);
        update.call(this);
    };
    function advance(sprite,kind,track) {
        track.elapsed++;
        const ratio=Coreto.CoreEngine.applyEasing(track.elapsed/track.duration,track.easing);
        track.apply(track.from.map((value,i)=>value+(track.to[i]-value)*ratio));
        if(track.elapsed>=track.duration){tracks(sprite).delete(kind);track.finish?.();}
    }
    Sprite_Battler.prototype.updateOpacity=function() {
        const track=motions.get(this)?.get('Opacity');
        if(track)advance(this,'Opacity',track);
    };
    Sprite_Battler.prototype.updateScale=function(){this._distortionSprite.scale.set(this.mainSpriteScaleX(),this.mainSpriteScaleY());};
    const updateMain=Sprite_Battler.prototype.updateMain;
    Sprite_Battler.prototype.updateMain=function(){updateMain.call(this);this.updateOpacity();this.updateScale();};
    const updatePosition = Sprite_Battler.prototype.updatePosition;
    Sprite_Battler.prototype.updatePosition = function() {
        updatePosition.call(this);
        updateBattleSpritePosition(this,this.x,this.y);
    };
    const updatePattern = Sprite_Actor.prototype.updateMotionCount;
    Sprite_Actor.prototype.updateMotionCount = function() {
        const frame = frozen.get(this);
        if (frame === undefined) return updatePattern.call(this);
        this._pattern = frame;
    };
    function waitKind(interpreter,kind) {
        wait(interpreter,()=>BattleManager._spriteset.battlerSprites().some(sprite=>kind==='Movement'?sprite.isMoving():tracks(sprite).has(kind)));
    }
    for(const kind of ['Movement','Float','Jump','Opacity','Scale','Skew','Spin'])register('Movement_WaitFor'+kind,function(){waitKind(this,kind);});
    function facing(battler,x,away=false) {
        const sprite=battler.sprite();
        if(!sprite)return;
        const left=x<sprite.x;
        sprite.scale.x=Math.abs(sprite.scale.x)*(left!==away?1:-1)*(battler.isActor()?1:-1);
    }
    function point(name,sprite) {
        if(name.toLowerCase()==='home')return new Point(sprite._homeX,sprite._homeY);
        if(name.toLowerCase()==='center')return new Point(Graphics.boxWidth/2,Graphics.boxHeight/2);
        const match=/point\s+(-?[\d.]+)\s*,\s*(-?[\d.]+)/i.exec(name);
        return match?new Point(Number(match[1]),Number(match[2])):new Point(sprite.x,sprite.y);
    }
    function offset(battler,amount,adjust,axis) { return battler.isActor()&&adjust.includes(axis)?-amount:amount; }
    function move(battler,destination,args,home=false) {
        const sprite=battler.sprite();
        if(!sprite||!$gameSystem.isSideView())return;
        if(!homes.has(sprite))homes.set(sprite,[sprite._homeX,sprite._homeY]);
        if(!moving.has(context().action))moving.set(context().action,new Set());
        moving.get(context().action).add(sprite);
        if(home){sprite._offsetX=sprite.x-destination.x;sprite._offsetY=sprite.y-destination.y;sprite.setHome(destination.x,destination.y);}
        if(args.FaceDirection)facing(battler,destination.x);
        battler.requestMotion(args.MotionType);
        sprite.startMove(home?0:destination.x-sprite._homeX,home?0:destination.y-sprite._homeY,args.Duration);
        sprite.setMoveEasingType(args.EasingType);
    }
    commands.autoMove=function(battler,targets,home){
        const sprite=battler.sprite();
        if(!sprite||!$gameSystem.isSideView()||battler.isEnemy()&&!battler.canBattlerMove())return;
        let destination=new Point(sprite._homeX,sprite._homeY);
        if(!home){
            const sprites=targets.map(target=>target.sprite()).filter(Boolean);
            if(!sprites.length)return;
            const actor=battler.isActor();
            const edges=sprites.map(target=>target.x+(actor?1:-1)*target.mainSpriteWidth()/2);
            destination=new Point((actor?Math.max(...edges):Math.min(...edges))+(actor?1:-1)*(sprite.mainSpriteWidth()/2+1),sprites.reduce((sum,target)=>sum+target._baseY,0)/sprites.length);
        }
        if(!battler.isEnemy()||!battler.isBattlerGrounded())tween(sprite,'Jump',[0],[1],20,'Linear',value=>{sprite._coretoJumpHeight=192*value[0]*(1-value[0]);});
        move(battler,destination,{FaceDirection:!home,MotionType:home?'evade':'walk',Duration:20,EasingType:'Linear'});
    };
    for(const home of [false,true])for(const kind of ['By','ToPoint','ToJsPoint','ToTarget'])register('Movement_'+(home?'HomeMove':'Move')+kind,function(args){
        const chosen=battleSequenceTargets(args.Targets??args.Targets1,context());
        for(const battler of chosen){
            const sprite=battler.sprite();if(!sprite)continue;
            let goal;
            if(kind==='By')goal=new Point((home?sprite._homeX:sprite.x)+offset(battler,args.DistanceX,args.DistanceAdjust,'horz'),(home?sprite._homeY:sprite.y)+offset(battler,args.DistanceY,args.DistanceAdjust,'vert'));
            else if(kind==='ToJsPoint')goal=args.DestinationJS(battler);
            else if(kind==='ToPoint')goal=point(args.Destination,sprite);
            else {
                const destination=battleSequenceTargets(args.Targets2,context()).map(target=>target.sprite()).filter(Boolean);
                if(!destination.length)continue;
                const x=destination.reduce((sum,target)=>sum+target.x,0)/destination.length;
                const y=destination.reduce((sum,target)=>sum+target.y,0)/destination.length;
                const height=destination.reduce((sum,target)=>sum+(target._mainSprite??target).height,0)/destination.length;
                const width=destination.reduce((sum,target)=>sum+(target._mainSprite??target).width,0)/destination.length;
                const direction=battler.isActor()?1:-1;
                goal=new Point(x+(args.TargetLocation.startsWith('front')?direction:args.TargetLocation.startsWith('back')?-direction:0)*(width/2+args.MeleeDistance),y-(args.TargetLocation.endsWith('head')?height:args.TargetLocation.endsWith('center')?height/2:0));
            }
            if(kind!=='By'){goal.x+=offset(battler,args.OffsetX,args.OffsetAdjust,'horz');goal.y+=offset(battler,args.OffsetY,args.OffsetAdjust,'vert');}
            move(battler,goal,args,home);
        }
        if(args.WaitForMovement)waitKind(this,'Movement');
    });
    register('Movement_BattleStep',function(args){for(const battler of targets(args))battler.sprite()?.stepForward();if(args.WaitForMovement)waitKind(this,'Movement');});
    register('Movement_HomeReset',function(args){for(const battler of targets(args)){const sprite=battler.sprite();if(!sprite)continue;const home=homes.get(sprite);if(home)sprite.setHome(...home);sprite.startMove(0,0,settings.ActionSequence.StepDuration);}if(args.WaitForMovement)waitKind(this,'Movement');});
    register('Movement_FaceDirection',args=>{for(const battler of targets(args)){const sprite=battler.sprite();if(sprite)sprite.scale.x=Math.abs(sprite.scale.x)*(args.Direction==='backward'?-1:args.Direction==='random'&&Math.random()<0.5?-1:1);}});
    for(const kind of ['Point','JsPoint','Target'])register('Movement_Face'+kind,args=>{
        for(const battler of battleSequenceTargets(args.Targets??args.Targets1,context())){
            const sprite=battler.sprite();if(!sprite)continue;
            let x;
            if(kind==='Point')x=point(args.Point,sprite).x;
            else if(kind==='JsPoint')x=args.PointJS(battler).x;
            else {const chosen=battleSequenceTargets(args.Targets2,context()).map(target=>target.sprite()).filter(Boolean);if(!chosen.length)continue;x=chosen.reduce((sum,target)=>sum+target.x,0)/chosen.length;}
            facing(battler,x,args.FaceAway);
        }
    });
    for(const kind of ['Float','Jump','Opacity','Scale','Skew','Spin'])register('Movement_'+kind,function(args){
        for(const battler of targets(args)){
            const sprite=battler.sprite();if(!sprite||!$gameSystem.isSideView())continue;
            let from,to,apply,finish;
            if(['Float','Jump'].includes(kind)&&battler.isEnemy()&&battler.isBattlerGrounded())continue;
            if(kind==='Float'){from=[sprite._coretoFloatHeight??0];to=[args.Height];apply=value=>{sprite._coretoFloatHeight=value[0];};}
            if(kind==='Jump'){from=[0];to=[1];apply=value=>{sprite._coretoJumpHeight=4*args.Height*value[0]*(1-value[0]);};}
            if(kind==='Opacity'){from=[sprite.opacity];to=[args.Opacity];apply=value=>{sprite.opacity=value[0];};}
            if(kind==='Scale'){from=[sprite._coretoScaleX??1,sprite._coretoScaleY??1];to=[args.ScaleX,args.ScaleY];apply=value=>{[sprite._coretoScaleX,sprite._coretoScaleY]=value;};}
            if(kind==='Skew'){from=[sprite._distortionSprite.skew.x,sprite._distortionSprite.skew.y];to=[args.SkewX,args.SkewY].map(value=>value*(battler.isActor()?-1:1));apply=value=>sprite._distortionSprite.skew.set(...value);}
            if(kind==='Spin'){const layer=sprite._distortionSprite;from=[layer.rotation];to=[layer.rotation+args.Angle*Math.PI/180*(battler.isActor()?-1:1)];apply=value=>{layer.rotation=value[0];};if(args.RevertAngle)finish=()=>{layer.rotation=from[0];};}
            tween(sprite,kind,from,to,args.Duration,args.EasingType??'Linear',apply,finish);
        }
        if(args['WaitFor'+kind])waitKind(this,kind);
    });
    register('Motion_ClearFreezeFrame',args=>{for(const battler of targets(args))frozen.delete(battler.sprite());});
    for(const kind of ['MotionType','FreezeMotionFrame'])register('Motion_'+kind,args=>{
        for(const battler of targets(args)){
            if(args.MotionType==='attack'){if(args.ShowWeapon)battler.performAttack();else battler.requestMotion('thrust');}
            else battler.requestMotion(args.MotionType);
            if(kind==='FreezeMotionFrame'&&battler.sprite())frozen.set(battler.sprite(),args.Frame);
        }
    });
    register('Motion_PerformAction',args=>{for(const battler of targets(args))battler.performAction(context().action);});
    register('Motion_RefreshMotion',args=>{for(const battler of targets(args))battler.requestMotionRefresh();});
    register('Motion_WaitMotionFrame',function(args){this.wait(args.MotionFrameWait*(Sprite_Battler._motionSpeed??12));});
}
