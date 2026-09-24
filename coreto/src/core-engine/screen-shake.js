function installScreenShake(settings) {
    const options = settings.ScreenShake;
    const callbacks = {};
    for (const field of ["originalJS", "randomJS", "horzJS", "vertJS"]) {
        callbacks[field] = compileAuthoredBody(options[field], `/ScreenShake/${field}`);
    }
    const initialize = Game_Screen.prototype.initialize;
    Game_Screen.prototype.initialize = function(...args) {
        const result = initialize.apply(this, args);
        this._coretoShakeStyle = options.DefaultStyle;
        return result;
    };
    Game_Screen.prototype.getCoreEngineScreenShakeStyle = function() {
        this._coretoShakeStyle ??= options.DefaultStyle;
        return this._coretoShakeStyle;
    };
    Game_Screen.prototype.setCoreEngineScreenShakeStyle = function(style) {
        this._coretoShakeStyle = style.toLowerCase().trim();
    };
    const update = Spriteset_Base.prototype.updatePosition;
    Spriteset_Base.prototype.updatePosition = function(...args) {
        const result = update.apply(this, args);
        if ($gameScreen._shakeDuration <= 0) return result;
        this.x -= Math.round($gameScreen.shake());
        const style = $gameScreen.getCoreEngineScreenShakeStyle();
        const field = ({ original: "originalJS", horizontal: "horzJS", vertical: "vertJS" })[style] || "randomJS";
        try {
            callbacks[field].call(this);
        } catch (error) {
            throw new CoreError("AUTHORED_CODE_FAILED", `/ScreenShake/${field}: ${error.message}`, { field: `/ScreenShake/${field}` });
        }
        return result;
    };
    const command = catalog.commands.find(command => command.key === "ScreenShake");
    PluginManager.registerCommand(catalog.pluginId, command.key, function(raw) {
        const args = convertEventArguments(command, raw);
        const duration = args.Duration || 1;
        $gameScreen.setCoreEngineScreenShakeStyle(args.Type || "random");
        $gameScreen.startShake(Math.min(Math.max(args.Power, 1), 9), Math.min(Math.max(args.Speed, 1), 9), duration);
        if (args.Wait) this.wait(duration);
    });
}
