function installItemsEquipStatus(api) {
    const settings = api.settings.EquipScene, proto = Window_EquipStatus.prototype;
    for (const key of ['DrawPortraitJS', 'DrawFaceJS', 'DrawParamJS']) settings[key] = new Function(settings[key]);
    ColorManager.getItemsEquipsCoreBackColor2 = function() { return this.getColor(settings.BackRectColor); };
    proto.isUseItemsEquipsCoreUpdatedLayout = function() { return settings.EnableLayout; };
    const refresh = proto.refresh;
    proto.refresh = function() {
        this.hideAdditionalSprites(); this.resetFontSettings();
        if (this._actor) this._actor.refresh();
        if (this.isUseItemsEquipsCoreUpdatedLayout()) this.prepareRefreshItemsEquipsCoreLayout();
        else refresh.call(this);
    };
    proto.prepareRefreshItemsEquipsCoreLayout = function() {
        this.contents.clear();
        if (!this._actor) return;
        if (this.isMainMenuCoreMenuImageOptionAvailable()) ImageManager.loadPicture(this._actor.getMenuImage()).addLoadListener(this.onMenuImageLoad.bind(this));
        else this.refreshItemsEquipsCoreNoMenuImage();
    };
    proto.isMainMenuCoreMenuImageOptionAvailable = function() { return Imported.VisuMZ_1_MainMenuCore && this._actor.getMenuImage() !== '' && settings.MenuPortraits; };
    proto.onMenuImageLoad = function() {
        if (!this._actor) return;
        settings.DrawPortraitJS.call(this); this.drawParamsItemsEquipsCore();
    };
    proto.refreshItemsEquipsCoreNoMenuImage = function() { settings.DrawFaceJS.call(this); this.drawParamsItemsEquipsCore(); };
    proto.drawParamsItemsEquipsCore = function() { this.resetFontSettings(); settings.DrawParamJS.call(this); };
    proto.drawItemActorMenuImage = function(actor, x, y, width, height) {
        const bitmap = ImageManager.loadPicture(actor.getMenuImage()), difference = this.innerWidth - bitmap.width;
        x += difference / 2;
        if (difference < 0) width -= difference;
        Window_StatusBase.prototype.drawItemActorMenuImage.call(this, actor, x, y, width, height);
    };
    proto.actorParams = function() { return Imported.VisuMZ_0_CoreEngine ? VisuMZ.CoreEngine.Settings.Param.ExtDisplayedParams : [0,1,2,3,4,5,6,7]; };
    proto.paramValueFontSize = function() { return settings.ParamValueFontSize; };
    proto.isUseParamNamesWithIcons = function() { return Imported.VisuMZ_0_CoreEngine && VisuMZ.CoreEngine.Settings.Param.DrawIcons; };
    proto.drawUpdatedParamName = function(param, x, y, width) {
        x += this.itemPadding();
        if (Imported.VisuMZ_0_CoreEngine) this.drawParamText(x, y, width, param, false);
        else { this.changeTextColor(ColorManager.systemColor()); this.drawText(TextManager.param(param), x, y, width); }
    };
    function value(actor, param, formatted) { return Imported.VisuMZ_0_CoreEngine ? actor.paramValueByName(param, formatted) : actor.param(param); }
    proto.drawUpdatedBeforeParamValue = function(param, x, y, width) { this.drawText(value(this._actor, param, true), x, y, width - this.itemPadding(), 'right'); };
    proto.drawUpdatedAfterParamValue = function(param, x, y, width) {
        if (!this._tempActor) return;
        const change = value(this._tempActor, param, false) - value(this._actor, param, false);
        this.changeTextColor(ColorManager.paramchangeTextColor(change));
        this.drawText(value(this._tempActor, param, true), x, y, width - this.itemPadding(), 'right');
    };
    proto.drawUpdatedParamValueDiff = function(param, x, y, width) {
        if (!this._tempActor) return;
        const before = value(this._actor, param, false), after = value(this._tempActor, param, false), change = after - before;
        const percent = Imported.VisuMZ_0_CoreEngine ? /[%％]/.test(String(value(this._actor, param, true))) : before % 1 !== 0 || after % 1 !== 0;
        if (change === 0) return;
        this.changeTextColor(ColorManager.paramchangeTextColor(change));
        this.drawText((change > 0 ? '(+%1)' : '(%1)').format(percent ? Math.round(change * 100) + '%' : change), x + this.itemPadding(), y, width, 'left');
    };
    proto.drawItemDarkRect = function(x, y, width, height, repeats) {
        if (settings.DrawBackRect === false) return;
        for (let count = Math.max(repeats || 1, 1); count > 0; count--) {
            this.contents.paintOpacity = 160;
            this.contents.fillRect(x + 1, y + 1, width - 2, (height || this.lineHeight()) - 2, ColorManager.getItemsEquipsCoreBackColor2());
            this.contents.paintOpacity = 255;
        }
    };
}
