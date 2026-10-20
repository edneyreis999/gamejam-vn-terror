function installEventsMoveMessagePopups() {
    const add = Game_Message.prototype.add;
    Game_Message.prototype.add = function(text) {
        add.call(this, text);
        this._selfEvent = $gameTemp.getSelfTarget();
    };
    Game_Message.prototype.registerSelfEvent = function() { $gameTemp.registerSelfTarget(this._selfEvent); };

    class EventsMessagePopup extends Sprite {
        constructor(settings) {
            super();
            this._settings = settings;
            this._duration = settings.duration;
            this._wholeDuration = settings.duration;
            this.z = 6;
            this._fadeInDuration = Math.min(settings.fadeDuration.fadeIn, Math.floor(settings.duration * 0.48));
            this._fadeOutDuration = Math.min(settings.fadeDuration.fadeOut, Math.floor(settings.duration * 0.48));
            this._fadeOutStart = this._fadeOutDuration;
            this.opacity = this._fadeInDuration > 0 ? 0 : 255;
            this._offsetX = settings.startOffset.x;
            this._offsetY = settings.startOffset.y;
            this._dummyWindow = new Window_Base(new Rectangle(0, 0, Graphics.width, Graphics.height));
            const size = this._dummyWindow.textSizeEx(settings.text), padding = $gameSystem.windowPadding() * 2;
            this._dummyWindow.move(0, 0, size.width + padding, size.height + padding);
            this._dummyWindow.createContents();
            this._dummyWindow.drawTextEx(settings.text, 0, 0);
            this._textSprite = new Sprite(this._dummyWindow.contents);
            this._textSprite.anchor.set(0.5);
            this._textSprite.scale.set(settings.startScale.x, settings.startScale.y);
            this._textSprite.angle = -settings.angle.start;
            this.addChild(this._textSprite);
            this.update();
        }
        update() {
            super.update();
            if (this._duration <= 0) return;
            const settings = this._settings, remaining = this._duration;
            this.x = Math.floor($gameMap.adjustX(settings.tileCoordinates.x) * $gameMap.tileWidth() + $gameMap.tileWidth() / 2);
            this.y = Math.floor($gameMap.adjustY(settings.tileCoordinates.y) * $gameMap.tileHeight() + $gameMap.tileHeight());
            const approach = (current, target) => (current * (remaining - 1) + target) / remaining;
            this._offsetX = approach(this._offsetX, settings.endOffset.x);
            this._offsetY = approach(this._offsetY, settings.endOffset.y);
            const half = this._wholeDuration / 2, elapsed = this._wholeDuration - remaining;
            this._textSprite.x = this._offsetX;
            this._textSprite.y = this._offsetY + settings.misc.arc * Math.pow((elapsed - half) / half, 2) - settings.misc.arc;
            this._textSprite.scale.x = approach(this._textSprite.scale.x, settings.endScale.x);
            this._textSprite.scale.y = approach(this._textSprite.scale.y, settings.endScale.y);
            this._textSprite.angle = approach(this._textSprite.angle, -settings.angle.end);
            if (this._fadeInDuration > 0) {
                this.opacity = (this.opacity * (this._fadeInDuration - 1) + 255) / this._fadeInDuration;
                this._fadeInDuration--;
            }
            if (this._fadeOutDuration > 0 && remaining <= this._fadeOutStart) {
                this.opacity *= (this._fadeOutDuration - 1) / this._fadeOutDuration;
                this._fadeOutDuration--;
            }
            if (--this._duration <= 0) {
                if (this.parent) this.parent.removeChild(this);
                this.destroy();
            }
        }
        destroy() {
            this._textSprite.bitmap = null;
            this._dummyWindow.destroy();
            super.destroy();
        }
    }
    Spriteset_Map.prototype.createEventsMoveCoreTileMessagePopup = function(settings) {
        if (this._tilemap) this._tilemap.addChild(new EventsMessagePopup(settings));
    };
    Spriteset_Map.prototype.createEventsMoveCoreMessagePopup = function(character, settings) {
        if (!character) return;
        settings.tileCoordinates = {x: character.x, y: character.y};
        this.createEventsMoveCoreTileMessagePopup(settings);
    };
    function popup(args, target) {
        if (!(SceneManager._scene instanceof Scene_Map)) return;
        if (!Imported.VisuMZ_1_MessageCore) throw new CoreError('EV_CAPABILITY_UNAVAILABLE', 'Event popups require an active MessageCore provider. Enable Coreto_1_MessageCore or VisuMZ_1_MessageCore after Events & Movement.');
        const value = expression => new Function('return ' + expression).call(this);
        const extra = args.PopupExtra, number = key => value(extra[key]) || 0;
        const settings = {
            text: args.MessageText, duration: Math.max(value(args.MsgDuration) || 60, 12),
            fadeDuration: {fadeIn: number('fadeInDuration'), fadeOut: number('fadeOutDuration')},
            startOffset: {x: number('startOffsetX'), y: number('startOffsetY')},
            endOffset: {x: number('endOffsetX'), y: number('endOffsetY')},
            startScale: {x: number('startScaleX'), y: number('startScaleY')},
            endScale: {x: number('endScaleX'), y: number('endScaleY')},
            angle: {start: number('startAngle'), end: number('endAngle')}, misc: {arc: number('Arc')}
        };
        const spriteset = SceneManager._scene._spriteset;
        if (!spriteset) return;
        if (target === 'tile') {
            settings.tileCoordinates = {x: Math.round(value(args.TileX) || 0), y: Math.round(value(args.TileY) || 0)};
            spriteset.createEventsMoveCoreTileMessagePopup(settings);
        } else {
            const character = target === 'player' ? $gamePlayer : target === 'follower' ? $gamePlayer.followers().follower(value(args.FollowerIndex) || 0) : $gameMap.event(value(args.EventId) || this.eventId());
            spriteset.createEventsMoveCoreMessagePopup(character, settings);
        }
    }
    return {
        MsgPopupPlayer(args) { popup.call(this, args, 'player'); },
        MsgPopupFollower(args) { popup.call(this, args, 'follower'); },
        MsgPopupEvent(args) { popup.call(this, args, 'event'); },
        MsgPopupTargetTile(args) { popup.call(this, args, 'tile'); }
    };
}
