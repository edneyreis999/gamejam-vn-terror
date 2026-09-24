function installPictureState() {
    const originAnchor = origin => ({ x: origin === 1 ? 0.5 : 0, y: origin === 1 ? 0.5 : 0 });
    function normalize(picture) {
        const anchor = originAnchor(picture._origin);
        for (const key of ['_anchor', '_targetAnchor']) {
            picture[key] ??= {};
            picture[key].x ??= anchor.x;
            picture[key].y ??= anchor.y;
        }
        picture._anglePlus ??= {};
        const angle = picture._anglePlus;
        angle.current ??= 0;
        angle.target ??= angle.current;
        angle.duration ??= 0;
        angle.wholeDuration ??= angle.duration;
        angle.easingType ??= 'Linear';
    }
    const basic = Game_Picture.prototype.initBasic;
    Game_Picture.prototype.initBasic = function(...args) {
        const result = basic.apply(this, args);
        this.setAnchor(originAnchor(0));
        return result;
    };
    Game_Picture.prototype.anchor = function() { normalize(this); return this._anchor; };
    Game_Picture.prototype.setAnchor = function(anchor) {
        this._anchor = anchor;
        this._targetAnchor = { ...anchor };
    };
    Game_Picture.prototype.setTargetAnchor = function(anchor) { this._targetAnchor = anchor; };
    const show = Game_Picture.prototype.show;
    Game_Picture.prototype.show = function(...args) {
        const result = show.apply(this, args);
        this.setAnchor(originAnchor(args[1]));
        return result;
    };
    const move = Game_Picture.prototype.move;
    Game_Picture.prototype.move = function(...args) {
        const result = move.apply(this, args);
        this.setTargetAnchor(originAnchor(args[0]));
        return result;
    };
    Game_Picture.prototype.updateAnchor = function() {
        normalize(this);
        if (this._duration > 0) {
            this._anchor.x = this.applyEasing(this._anchor.x, this._targetAnchor.x);
            this._anchor.y = this.applyEasing(this._anchor.y, this._targetAnchor.y);
        }
    };
    const updateMove = Game_Picture.prototype.updateMove;
    Game_Picture.prototype.updateMove = function(...args) {
        this.updateAnchor();
        const wasMoving = this._duration > 0;
        const result = updateMove.apply(this, args);
        if (wasMoving && this._duration <= 0) {
            this._x = this._targetX;
            this._y = this._targetY;
            this._scaleX = this._targetScaleX;
            this._scaleY = this._targetScaleY;
            this._opacity = this._targetOpacity;
            this._anchor.x = this._targetAnchor.x;
            this._anchor.y = this._targetAnchor.y;
        }
        return result;
    };
    Game_Picture.prototype.setEasingType = function(type) {
        this._easingType = type;
    };
    const calculate = Game_Picture.prototype.calcEasing;
    Game_Picture.prototype.calcEasing = function(t) {
        return typeof this._easingType === "string" ? applyEasing(t, this._easingType) : calculate.call(this, t);
    };
    const updateOrigin = Sprite_Picture.prototype.updateOrigin;
    Sprite_Picture.prototype.updateOrigin = function(...args) {
        const anchor = this.picture().anchor();
        if (!anchor) return updateOrigin.apply(this, args);
        this.anchor.set(anchor.x, anchor.y);
    };

    Game_Picture.prototype.initRotationCoreEngine = function() {
        this._anglePlus = { current: 0, target: 0, duration: 0, wholeDuration: 0, easingType: "Linear" };
    };
    const rotation = Game_Picture.prototype.initRotation;
    Game_Picture.prototype.initRotation = function(...args) {
        const result = rotation.apply(this, args);
        this.initRotationCoreEngine();
        return result;
    };
    Game_Picture.prototype.anglePlus = function() {
        normalize(this);
        return this._anglePlus.current;
    };
    const angle = Game_Picture.prototype.angle;
    Game_Picture.prototype.angle = function(...args) { return angle.apply(this, args) + this.anglePlus(); };
    Game_Picture.prototype.setAnglePlusData = function(target, duration, easing) {
        if (this._anglePlus === undefined) this.initRotationCoreEngine();
        Object.assign(this._anglePlus, { target: target || 0, duration: duration || 0, wholeDuration: duration || 0, easingType: easing || "Linear" });
        if (duration <= 0) this._anglePlus.current = this._anglePlus.target;
    };
    Game_Picture.prototype.changeAnglePlusData = function(delta, duration, easing) {
        if (this._anglePlus === undefined) this.initRotationCoreEngine();
        this.setAnglePlusData(this._anglePlus.target + (delta || 0), duration, easing);
    };
    Game_Picture.prototype.applyEasingAnglePlus = function(current, target) {
        const { duration, wholeDuration, easingType } = this._anglePlus;
        const before = applyEasing((wholeDuration - duration) / wholeDuration, easingType);
        const after = applyEasing((wholeDuration - duration + 1) / wholeDuration, easingType);
        const start = (current - target * before) / (1 - before);
        return start + (target - start) * after;
    };
    Game_Picture.prototype.updateAnglePlus = function() {
        normalize(this);
        const data = this._anglePlus;
        if (data.duration <= 0) return;
        data.current = this.applyEasingAnglePlus(data.current, data.target);
        data.duration--;
        if (data.duration <= 0) data.current = data.target;
    };
    const updateRotation = Game_Picture.prototype.updateRotation;
    Game_Picture.prototype.updateRotation = function(...args) {
        const result = updateRotation.apply(this, args);
        this.updateAnglePlus();
        return result;
    };

    Game_Picture.prototype.onlyfilename = function() { return this._name.split("/").pop(); };
    Game_Picture.prototype.isMapScrollLinked = function() { return !$gameParty.inBattle() && this.onlyfilename().startsWith("!"); };
    for (const [method, axis, tileSize] of [["x", "X", "tileWidth"], ["y", "Y", "tileHeight"]]) {
        const position = Game_Picture.prototype[method];
        Game_Picture.prototype[method] = function(...args) {
            if (!this.isMapScrollLinked()) return position.apply(this, args);
            return (this[`_${method}`] - $gameMap[`display${axis}`]() * $gameMap[tileSize]()) * $gameScreen.zoomScale();
        };
    }
    for (const method of ["scaleX", "scaleY"]) {
        const scale = Game_Picture.prototype[method];
        Game_Picture.prototype[method] = function(...args) {
            const value = scale.apply(this, args);
            return this.isMapScrollLinked() ? value * $gameScreen.zoomScale() : value;
        };
    }
    return normalize;
}

function installPictureCommands() {
    const owned = ["PictureEasingType", "PictureEraseAll", "PictureEraseRange", "PictureRotateBy", "PictureRotate"];
    for (const command of catalog.commands.filter(command => owned.includes(command.key))) {
        PluginManager.registerCommand(catalog.pluginId, command.key, function(raw) {
            const args = convertEventArguments(command, raw);
            if (command.key === "PictureEraseAll") {
                for (let id = 1; id <= $gameScreen.maxPictures(); id++) $gameScreen.erasePicture(id);
                return;
            }
            if (command.key === "PictureEraseRange") {
                const low = Math.min(args.StartID, args.EndingID);
                const high = Math.max(args.StartID, args.EndingID);
                for (let id = low; id <= high; id++) $gameScreen.erasePicture(id);
                return;
            }
            if (command.key === "PictureEasingType") {
                const picture = $gameScreen.picture(args.pictureId || 1);
                if (picture) picture._easingType = args.easingType || "Linear";
                return;
            }
            const id = Math.min(Math.max(Math.round(args.PictureID), 1), 100);
            const picture = $gameScreen.picture(id);
            if (!picture) return;
            const duration = Math.max(args.Duration || 0, 0);
            const easing = args.easingType || "Linear";
            if (command.key === "PictureRotateBy") picture.changeAnglePlusData(-Number(args.AdjustAngle || 0), duration, easing);
            else picture.setAnglePlusData(-Number(args.TargetAngle || 0), duration, easing);
            if (args.Wait) this.wait(duration);
        });
    }
}
