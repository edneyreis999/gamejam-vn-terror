function installBattleEnvironment(settings) {
    for (const layer of [1,2]) {
        const method='battleback'+layer+'Name',previous=Game_Map.prototype[method];
        Game_Map.prototype[method]=function() {
            if (!BattleManager.isBattleTest()) {
                const region=$gamePlayer.regionId();
                const match=$dataMap.note.match(new RegExp('<REGION '+region+' BATTLEBACK'+layer+': ([^>]+)>','i'));
                if (match) return match[1];
            }
            return previous.call(this);
        };
    }
    const adjust = Sprite_Battleback.prototype.adjustPosition;
    Sprite_Battleback.prototype.adjustPosition = function() {
        const callbacks={'1:1':'jsOneForOne',ScaleToFit:'jsScaleToFit',ScaleDown:'jsScaleDown',ScaleUp:'jsScaleUp'};
        const callback=callbacks[settings.BattlebackScale.DefaultStyle];
        if (callback) settings.BattlebackScale[callback].call(this);
        else adjust.call(this);
    };
    const lower = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function() {
        lower.call(this);
        this._weather=new Weather();this._baseSprite.addChild(this._weather);
    };
    const update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        update.call(this);
        this._weather.type=$gameScreen.weatherType();this._weather.power=$gameScreen.weatherPower();
    };
}
