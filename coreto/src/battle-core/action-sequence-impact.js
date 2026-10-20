function installBattleSequenceImpact(api) {
    const endBattle=BattleManager.endBattle;
    BattleManager.endBattle=function(...args){
        const result=endBattle.apply(this,args);
        if(Imported.VisuMZ_3_ActSeqImpact){
            $gameTemp.setBattleImpactTimeScale(1);
            for(const battler of this.allBattleMembers())battler.clearBattlerMotionTrailData();
        }
        return result;
    };
    const create=Scene_Battle.prototype.create;
    Scene_Battle.prototype.create=function(){
        if(Imported.VisuMZ_3_ActSeqImpact&&['RGBSplitFilter','MotionBlurFilter','ShockwaveFilter','ZoomBlurFilter'].some(name=>typeof PIXI.filters[name]!=='function')){
            throw new CoreError('BATTLE_IMPACT_FILTERS','ActSeqImpact requires the real pixi-filters bundle before the consumer.');
        }
        return create.call(this);
    };
    const sprites=()=>BattleManager._spriteset;
    function register(name,handler){
        api.register(name,function(args){
            if(!Imported.VisuMZ_3_ActSeqImpact||!SceneManager.isSceneBattle())return;
            return handler.call(this,args);
        });
    }
    const updateWaitMode=Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode=function(){
        if(this._waitMode==='battleInjectPrep'||this._waitMode==='battleInjectAni'){
            if(SceneManager.isSceneBattle()&&Imported.VisuMZ_3_ActSeqImpact){
                if(sprites().isAnyoneInjectAniPrepping()||(this._waitMode==='battleInjectAni'&&sprites().isAnyoneInjectAnimating()))return true;
            }
            this._waitMode='';
        }
        return updateWaitMode.call(this);
    };
    for(const name of ['BlueRedInvert','Desaturate','Negative','Oversaturate'])register('Impact_'+name,args=>sprites()['setup'+name+'ImpactFilter'](args.Enable));
    register('Impact_ColorBreak',args=>sprites().setupRgbSplitImpactFilter(args.Intensity,args.Duration,args.EasingType));
    register('Impact_MotionBlurScreen',args=>sprites().setupMotionBlurImpactFilter(args.Angle,args.Rate,args.Duration,args.EasingType));
    register('Impact_MotionBlurTarget',args=>{for(const target of api.targets(args))target.battler().setupMotionBlurImpactFilter(args.Angle,args.Rate,args.Duration,args.EasingType);});
    register('Impact_MotionTrailCreate',args=>{
        const {delay,duration,hue,opacityStart,tone}=args;
        for(const target of api.targets(args))target.setBattlerMotionTrailData({delay,duration,hue,opacityStart,tone,visible:true});
    });
    register('Impact_MotionTrailRemove',args=>{for(const target of api.targets(args))target.clearBattlerMotionTrailData();});
    register('Impact_TimeScale',function(args){$gameTemp.setBattleImpactTimeScale(args.Scale,this);});
    register('Impact_TimeStop',function(args){VisuMZ.ActSeqImpact.freezeTime(args.ms,this);});
    register('Impact_ShockwavePoint',args=>sprites().setupShockwaveImpactFilter(args.X,args.Y,args.Amp,args.Wave,args.Duration));
    register('Impact_ZoomBlurPoint',args=>sprites().setupZoomBlurImpactFilter(args.Strength,args.X,args.Y,args.Radius,args.Duration,args.EasingType));
    function targetPoint(targets,args){
        const bounds=targets.map(target=>{
            const sprite=target.battler(),width=sprite.mainSpriteWidth(),height=sprite.mainSpriteHeight();
            return {left:sprite._baseX-width/2,right:sprite._baseX+width/2,head:sprite._baseY-height,base:sprite._baseY};
        });
        const left=Math.min(...bounds.map(b=>b.left)),right=Math.max(...bounds.map(b=>b.right));
        const head=Math.min(...bounds.map(b=>b.head)),base=Math.max(...bounds.map(b=>b.base));
        const [horizontal,vertical]=args.TargetLocation.toLowerCase().split(' '),enemy=targets.every(target=>target.isEnemy());
        const x=horizontal==='middle'?(left+right)/2:(horizontal==='front')!==enemy?left:right;
        const y=vertical==='head'?head:vertical==='base'?base:(head+base)/2;
        return [x+args.OffsetX+(Graphics.width-Graphics.boxWidth)/2,y+args.OffsetY+(Graphics.height-Graphics.boxHeight)/2];
    }
    register('Impact_ShockwaveEachTargets',args=>{
        for(const target of api.targets(args))sprites().setupShockwaveImpactFilter(...targetPoint([target],args),args.Amp,args.Wave,args.Duration);
    });
    for(const kind of ['ShockwaveCenterTargets','ZoomBlurTargetCenter'])register('Impact_'+kind,args=>{
        const targets=api.targets(args);
        if(!targets.length)return;
        const [x,y]=targetPoint(targets,args);
        if(kind==='ShockwaveCenterTargets')sprites().setupShockwaveImpactFilter(x,y,args.Amp,args.Wave,args.Duration);
        else sprites().setupZoomBlurImpactFilter(args.Strength,x,y,args.Radius,args.Duration,args.EasingType);
    });
    register('Inject_AnimationStart',function(args){
        const settings={filename:args.Filename,horzCells:args.horzCells,vertCells:args.vertCells,frameDelay:args.frameDelay,smooth:args.smooth,anchorX:0,anchorY:0,offsetX:args.offsetX,offsetY:args.offsetY};
        for(const target of api.targets(args))target.battler().startInjectAnimation(settings);
        this.setWaitMode('battleInjectPrep');
    });
    register('Inject_AnimationEnd',args=>{for(const target of api.targets(args))target.battler().stopInjectAnimation();});
    register('Inject_AnimationPauseResume',args=>{for(const target of api.targets(args))target.battler().pauseInjectAnimation(args.pause);});
    register('Inject_WaitForInjectAni',function(){this.setWaitMode('battleInjectAni');});
}
