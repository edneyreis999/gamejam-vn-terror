function installBattleSequenceCamera(api) {
    const terminate=Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate=function(){
        terminate.call(this);
        if(Imported.VisuMZ_3_ActSeqCamera&&!SceneManager.isNextSceneBattleTransitionable()){
            $gameScreen.clearBattleCamera();
            BattleManager.clearCameraFocusTargets();
        }
    };
    const durations={battleAngle:['angleDuration'],battleCamera:['cameraDuration','cameraOffsetDuration'],battleSkew:['skewDuration'],battleZoom:['zoomDuration']};
    const updateWaitMode=Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode=function(){
        const fields=durations[this._waitMode];
        if(fields&&SceneManager.isSceneBattle()&&Imported.VisuMZ_3_ActSeqCamera){
            const data=$gameScreen.battleCameraData();
            if(fields.some(field=>data[field]>0))return true;
            this._waitMode='';
        }
        return updateWaitMode.call(this);
    };
    function register(name,channel,apply){
        api.register(name,function(args){
            if(!Imported.VisuMZ_3_ActSeqCamera||!SceneManager.isSceneBattle())return;
            if(apply)apply(args);
            if(channel&&(!apply||args['WaitFor'+channel]))this.setWaitMode('battle'+channel);
        });
    }
    for(const [channel,method,change,values,reset]of [
        ['Angle','setBattleAngle','ChangeAngle',args=>[args.Angle],[0]],
        ['Skew','setBattleSkew','ChangeSkew',args=>[args.SkewX,args.SkewY],[0,0]],
        ['Zoom','setBattleZoom','Zoom_Scale',args=>[args.Scale],[1]]
    ]){
        register(change,channel,args=>$gameScreen[method](...values(args),args.Duration,args.EasingType));
        register(channel+'_Reset',channel,args=>$gameScreen[method](...reset,args.Duration,args.EasingType));
        register(channel+'_WaitFor'+channel,channel);
    }
    register('Camera_Clamp',null,args=>{$gameScreen.battleCameraData().cameraClamp=args.Setting;});
    register('Camera_FocusPoint','Camera',args=>$gameScreen.setBattleCameraPoint(args.FocusX,args.FocusY,args.Duration,args.EasingType));
    register('Camera_FocusTarget','Camera',args=>$gameScreen.setBattleCameraTargets(api.targets(args),args.Duration,args.EasingType));
    register('Camera_Offset','Camera',args=>$gameScreen.setBattleCameraOffset(args.OffsetX,args.OffsetY,args.Duration,args.EasingType));
    register('Camera_Reset','Camera',args=>{
        if(args.ResetFocus)$gameScreen.setBattleCameraPoint(Math.round(Graphics.width/2),Math.round(Graphics.height/2),args.Duration,args.EasingType);
        if(args.ResetOffset)$gameScreen.setBattleCameraOffset(0,0,args.Duration,args.EasingType);
    });
    register('Camera_WaitForCamera','Camera');
}
