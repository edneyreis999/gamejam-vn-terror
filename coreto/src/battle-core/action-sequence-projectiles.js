function installBattleSequenceProjectiles(api) {
    for(const type of ['Animation','Icon','Picture'])api.register('Projectile_'+type,function(args){
        if(!Imported.VisuMZ_3_ActSeqProjectiles||!SceneManager.isSceneBattle())return;
        BattleManager._spriteset.createActionSequenceProjectile(args);
        if(args.WaitForProjectile)this.setWaitMode('battleProjectiles');
    });
    const updateWaitMode=Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode=function(){
        if(this._waitMode==='battleProjectiles'){
            if(SceneManager.isSceneBattle()&&Imported.VisuMZ_3_ActSeqProjectiles&&BattleManager._spriteset.isAnyProjectilePresent())return true;
            this._waitMode='';
        }
        return updateWaitMode.call(this);
    };
}
