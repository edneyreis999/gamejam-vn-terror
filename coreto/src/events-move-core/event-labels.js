function installEventsMoveLabels(settings) {
    const isInsideLabelRange = event => $gameMap.checkEventProximity($gamePlayer.x, $gamePlayer.y, event, event.labelWindowRangeType(), event.labelWindowRange());
    function visible(label) { return $gameSystem.eventLabelsVisible() && !label._event._erased && label._event._pageIndex >= 0 && !SceneManager._scene?._encounterEffectDuration && isInsideLabelRange(label._event); }
    function characterSprite(event) { return SceneManager._scene?._spriteset?.findTargetSprite(event); }
    class EventLabelSprite extends Sprite {
        constructor(event) {
            super(); this._event = event; this.anchor.set(0.5, 1);
            this._proxyWindow = new Window_Base(new Rectangle(0, 0, 1, 1)); this._proxyWindow.padding = 0;
            this.opacity = this.isLabelVisible() ? 255 : 0;
        }
        isLabelVisible() { return visible(this); }
        opacitySpeed() { return settings.Label.OpacitySpeed; }
        update() { super.update(); this.updateText(); this.updateScale(); this.updatePosition(); this.updateOpacity(); this.updateHueShift(); }
        updateText() { const text = this._event.labelWindowText(); if (this._text !== text) { this._text = text; this.refresh(); } }
        refresh() {
            const window = this._proxyWindow, size = window.textSizeEx(this._text), padding = window.itemPadding();
            window.move(0, 0, size.width + padding * 2, size.height); window.createContents();
            this.bitmap = window.contents; window.drawTextEx(this._text, padding, 0);
        }
        updateScale() { const scale = settings.Label.FontSize / ($gameSystem.mainFontSize() || 1); this.scale.set(scale, scale); }
        updatePosition() {
            const target = characterSprite(this._event); if (!target) return;
            const visual = target._lastAttachPictureFilename ? target._attachPictureSprite : target;
            this.x = this._event.screenX() + this._event._labelWindow.offsetX;
            this.y = this._event.screenY() - visual.height * visual.scale.y - $gameSystem.windowPadding() * 0.5 + this._event._labelWindow.offsetY;
        }
        updateOpacity() { if (SceneManager._scene?._encounterEffectDuration > 0) this.opacity = 0; else this.opacity += (this.isLabelVisible() ? 1 : -1) * this.opacitySpeed(); }
        updateHueShift() { if (this.isLabelVisible() && this._event._labelWindow.hueShift) this.setHue(this._hue + this._event._labelWindow.hueShift); }
        destroy() { this.bitmap = null; this._proxyWindow.destroy(); super.destroy(); }
    }
    class EventLabelWindow extends Window_Base {
        constructor(event) {
            super(new Rectangle(0, 0, Graphics.boxWidth / 4, settings.Label.LineHeight + $gameSystem.windowPadding() * 2));
            this._event = event; this._text = ''; this.contentsOpacity = 0; this.setBackgroundType(2);
        }
        isLabelVisible() { return visible(this); }
        opacitySpeed() { return settings.Label.OpacitySpeed; }
        lineHeight() { return settings.Label.LineHeight; }
        defaultFontSize() { return settings.Label.FontSize; }
        resetFontSettings() { super.resetFontSettings(); this.contents.fontSize = this.defaultFontSize(); }
        iconSize() { return settings.Label.IconSize; }
        processDrawIcon(index, textState) { if (textState.drawing) this.drawIcon(index, textState.x + 2, textState.y); textState.x += Math.min(this.iconSize(), ImageManager.iconWidth) + 4; }
        drawIcon(index, x, y) { const width = ImageManager.iconWidth, height = ImageManager.iconHeight; this.contents.blt(ImageManager.loadSystem('IconSet'), index % 16 * width, Math.floor(index / 16) * height, width, height, x, y, this.iconSize(), this.iconSize()); }
        update() { super.update(); if (this._event) { this.updateText(); this.updateScale(); this.updatePosition(); this.updateOpacity(); } }
        updateText() { const text = this._event.labelWindowText(); if (text !== this._text) { this._text = text; this.refresh(); } }
        refresh() {
            const size = this.textSizeEx(this._text);
            this.width = size.width + ($gameSystem.windowPadding() + this.itemPadding()) * 2; this.height = Math.max(this.lineHeight(), size.height) + $gameSystem.windowPadding() * 2;
            this.createContents(); let y = 0;
            for (const line of this._text.split(/[\r\n]+/)) { const extent = this.textSizeEx(line); this.drawTextEx(line, Math.floor((this.innerWidth - extent.width) / 2), y); y += extent.height; }
        }
        updateScale() { this.scale.set(1 / $gameScreen.zoomScale(), 1 / $gameScreen.zoomScale()); }
        updatePosition() {
            const target = characterSprite(this._event); if (!target) return;
            this.x = Math.round(this._event.screenX() - Math.floor(this.width * this.scale.x / 2)) + this._event._labelWindow.offsetX;
            this.y = this._event.screenY() - target.height + Math.round($gameSystem.windowPadding() * 0.5) - Math.round(this.height * this.scale.y) + this._event._labelWindow.offsetY;
        }
        updateOpacity() { if (this._event._erased || SceneManager._scene?._encounterEffectDuration > 0) this.contentsOpacity = 0; else this.contentsOpacity += (this.isLabelVisible() ? 1 : -1) * this.opacitySpeed(); }
    }
    globalThis.Sprite_EventLabel = EventLabelSprite; globalThis.Window_EventLabel = EventLabelWindow;
    Spriteset_Map.MOBILE_EVENT_LABELS = settings.Label.MobileEnabled;
    Spriteset_Map.prototype.isTargetEventValidForLabelWindow = function(event) {
        const data = event.event();
        return [data.note, ...data.pages.map(page => page.list.filter(command => [108, 408].includes(command.code)).map(command => command.parameters[0]).join('\n'))].some(text => /<LABEL: .*?>|<LABEL>[\s\S]*<\/LABEL>/i.test(text));
    };
    Spriteset_Map.prototype.createLabelWindowForTarget = function(event) {
        if (Utils.isMobileDevice() && !Spriteset_Map.MOBILE_EVENT_LABELS || !this.isTargetEventValidForLabelWindow(event)) return;
        if (this._labelWindows.some(label => label._event === event)) return;
        const label = settings.Label.SpriteBased ? new EventLabelSprite(event) : new EventLabelWindow(event);
        label.z = 8; label.spriteId = Sprite._counter++; this._labelWindows.push(label); this._tilemap.addChild(label);
    };
    Spriteset_Map.prototype.createLabelWindows = function() { this._labelWindows = []; for (const event of $gameMap.events()) this.createLabelWindowForTarget(event); };
    Spriteset_Map.prototype.refreshEventLabels = function() {
        for (const label of this._labelWindows) { label.parent.removeChild(label); label.destroy(); }
        this.createLabelWindows();
    };
    const lower = Spriteset_Map.prototype.createLowerLayer, spawn = Spriteset_Map.prototype.createSpawnedEvent, update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.createLowerLayer = function() { lower.call(this); this.createLabelWindows(); };
    Spriteset_Map.prototype.createSpawnedEvent = function(event) { spawn.call(this, event); this.createLabelWindowForTarget(event); };
    Spriteset_Map.prototype.update = function() {
        update.call(this);
        for (const event of $gameMap.events()) if (event._labelWindow.text && !this._labelWindows.some(label => label._event === event)) this.createLabelWindowForTarget(event);
    };
    const despawn = Game_Map.prototype.despawnEventId;
    Game_Map.prototype.despawnEventId = function(id) {
        const event = id >= 1000 ? this.event(id) : null; despawn.call(this, id);
        const set = SceneManager._scene?._spriteset; if (!event || !set) return;
        const target = set.findTargetSprite(event);
        $gameTemp._balloonQueue = $gameTemp._balloonQueue.filter(request => request.target !== event);
        $gameTemp._animationQueue = $gameTemp._animationQueue.map(request => ({...request, targets: request.targets.filter(owner => owner !== event)})).filter(request => request.targets.length);
        for (const balloon of set._balloonSprites.filter(balloon => balloon.targetObject === event)) set.removeBalloon(balloon);
        for (const animation of set._animationSprites.filter(animation => animation.targetObjects.includes(event))) {
            if (animation.targetObjects.length === 1) set.removeAnimation(animation);
            else {
                animation.targetObjects = animation.targetObjects.filter(owner => owner !== event);
                animation._targets = animation._targets.filter(sprite => sprite !== target);
            }
        }
        event.endAnimation(); event.endBalloon();
        for (const label of set._labelWindows.filter(label => label._event === event)) { set._labelWindows.splice(set._labelWindows.indexOf(label), 1); label.parent.removeChild(label); label.destroy(); }
        const sprites = [];
        function collect(container) {
            for (const child of container.children) {
                if (child instanceof Sprite_Character && child._character === event) sprites.push(child);
                else if (child.children) collect(child);
            }
        }
        collect(set);
        for (const sprite of sprites) {
            if (sprite._shadowSprite) { sprite._shadowSprite.parent.removeChild(sprite._shadowSprite); sprite._shadowSprite.destroy(); }
            const index = set._characterSprites.indexOf(sprite);
            if (index >= 0) set._characterSprites.splice(index, 1);
            sprite.parent.removeChild(sprite); sprite.destroy();
        }
    };
    return {isInsideLabelRange};
}
