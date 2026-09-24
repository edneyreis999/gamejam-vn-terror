function installBattlePositions(settings) {
    const resolution = settings.ScreenResolution;
    const setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        if (!resolution.RepositionActors) return setActorHome.call(this, index);
        const x = Math.round(Graphics.width / 2 + 192) - Math.floor((Graphics.width - Graphics.boxWidth) / 2) + index * 32;
        const y = Graphics.height - 200 - $gameParty.maxBattleMembers() * 48 - Math.floor((Graphics.height - Graphics.boxHeight) / 2) + index * 48;
        this.setHome(x, y);
    };
    const screenX = Game_Enemy.prototype.screenX;
    const screenY = Game_Enemy.prototype.screenY;
    const enabled = resolution.RepositionEnemies && resolution.RepositionEnemies130;
    Spriteset_Battle.prototype.coreEngineRepositionEnemies = function() { return Boolean(enabled); };
    // BattleCore requests a preparatory coordinate mutation. The getters below already
    // apply that projection, including after resize; base troop coordinates stay intact.
    Spriteset_Battle.prototype.repositionEnemiesByResolution = function() {};
    Game_Enemy.prototype.screenX = function() {
        const x = screenX.call(this);
        if (!enabled) return x;
        return x + ($gameSystem.isSideView() ? -Math.floor((Graphics.width - Graphics.boxWidth) / 2) : Math.round((Graphics.boxWidth - 816) / 2));
    };
    Game_Enemy.prototype.screenY = function() {
        const y = screenY.call(this);
        return enabled ? y + Math.round((Graphics.height - 624) / 2) - Math.floor((Graphics.height - Graphics.boxHeight) / 2) : y;
    };
}
