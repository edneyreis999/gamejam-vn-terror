function installBattleSequenceAnimation(commands, settings) {
    const {register,targets,wait,context} = commands;
    const activeBalloons = new Map();
    Game_Actor.prototype.getBattlePortraitFilename = function() {
        return this.getBattlePortrait() || (typeof this.getMenuImage === 'function' ? this.getMenuImage() : '');
    };
    Game_Actor.prototype.getBattlePortrait = function() {
        if (this._battlePortrait === undefined) this._battlePortrait = this.actor().note.match(/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)?.[1] || '';
        return this._battlePortrait;
    };
    Game_Actor.prototype.setBattlePortrait = function(filename) { this._battlePortrait=filename; };
    register('Animation_ChangeBattlePortrait',args=>{for(const target of targets(args))if(target.isActor())target.setBattlePortrait(args.Filename);});
    register('Animation_ChangeBattlePortrait_JS',args=>{const actor=$gameActors.actor(args.ActorJS());if(actor)actor.setBattlePortrait(args.FilenameJS());});
    function waitAnimation(interpreter) {
        wait(interpreter,()=>!!$gameTemp._animationQueue.length || BattleManager._spriteset.isAnimationPlaying());
    }
    function animate(args,ids) {
        const chosen=targets(args);
        for(const id of ids)if(id>0&&$dataAnimations[id])$gameTemp.requestAnimation(chosen,id,args.Mirror);
    }
    register('Animation_WaitForAnimation',function(){waitAnimation(this);});
    for(const name of ['Action','Attack','Attack2','Guard','Item','Skill','Show','ShowJS','Cast']) {
        const command=name==='Attack2'?'AttackAnimation2':name==='ShowJS'?'ShowAnimationJS':name+'Animation';
        register('Animation_'+command,function(args){
            const {subject,action}=context();
            let id;
            if(name==='Action')id=action.item().animationId;
            else if(name==='Attack')id=-1;
            else if(name==='Attack2')id=subject.isActor()?($dataWeapons[subject.weapons()[args.Slot-1]?.id]?.animationId??0):subject.attackAnimationId();
            else if(name==='Guard')id=$dataSkills[subject.guardSkillId()]?.animationId;
            else if(name==='Item')id=$dataItems[args.ItemID]?.animationId;
            else if(name==='Skill')id=$dataSkills[args.SkillID]?.animationId;
            else if(name==='Cast'){for(const battler of targets(args))battler.performCastAnimation(action,args.Mirror);if(args.WaitForAnimation)waitAnimation(this);return;}
            else id=args.AnimationID;
            if(id===-1)animate(args,subject.isActor()?[subject.attackAnimationId1(),subject.attackAnimationId2()]:[subject.attackAnimationId()]);
            else animate(args,[id]);
            if(args.WaitForAnimation)waitAnimation(this);
        });
    }
    register('Animation_BalloonAnimation',function(args){
        const names=['Exclamation','Question','Music Note','Heart','Anger','Sweat','Frustration','Silence','Light Bulb','Zzz','User-defined 1','User-defined 2','User-defined 3','User-defined 4','User-defined 5'];
        const chosen=targets(args);
        for(const battler of chosen){
            const target=battler.sprite();if(!target)continue;
            const balloon=new Sprite_Balloon();balloon.setup(target,names.indexOf(args.Balloon)+1);target.parent.addChild(balloon);activeBalloons.set(balloon,battler);
        }
        if(args.WaitComplete)wait(this,()=>[...activeBalloons.values()].some(battler=>chosen.includes(battler)));
    });
    const update=Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update=function(){
        update.call(this);
        for(const [balloon]of activeBalloons)if(!balloon.isPlaying()){balloon.parent?.removeChild(balloon);balloon.destroy();activeBalloons.delete(balloon);}
    };
    const destroy=Spriteset_Battle.prototype.destroy;
    Spriteset_Battle.prototype.destroy=function(...args){for(const balloon of activeBalloons.keys()){balloon.parent?.removeChild(balloon);balloon.destroy();}activeBalloons.clear();return destroy.apply(this,args);};
    register('Animation_PlayAtCoordinate',function(args){
        const source=$dataAnimations[args.AnimationID];if(!source)return;
        const spriteset=BattleManager._spriteset,anchor=new Sprite();anchor.x=args.pointX;anchor.y=args.pointY;spriteset._effectsContainer.addChild(anchor);
        const animation=args.Mute?{...source,soundTimings:[],timings:(source.timings??[]).map(timing=>({...timing,se:null}))}:source;
        const sprite=new (spriteset.isMVAnimation(animation)?Sprite_AnimationMV:Sprite_Animation)();
        sprite.targetObjects=[];sprite.setup([anchor],animation,args.Mirror,0,null);
        const destroy=sprite.destroy;sprite.destroy=function(...values){anchor.parent?.removeChild(anchor);anchor.destroy();return destroy.apply(this,values);};
        spriteset._effectsContainer.addChild(sprite);spriteset._animationSprites.push(sprite);
        if(args.WaitComplete)waitAnimation(this);
    });
}
