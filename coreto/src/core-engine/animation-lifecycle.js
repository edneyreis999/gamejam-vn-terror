function installAnimationLifecycle() {
    const initializeTemp = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function(...args) {
        const result = initializeTemp.apply(this, args);
        this._fauxAnimationQueue = [];
        this._pointAnimationQueue = [];
        return result;
    };
    Game_Temp.prototype.requestFauxAnimation = function(targets, animationId, mirror = false, mute = false) {
        if (!$dataAnimations[animationId]) return;
        this._fauxAnimationQueue.push({ targets, animationId, mirror, mute });
        for (const target of targets) if (target.startAnimation) target.startAnimation();
    };
    Game_Temp.prototype.retrieveFauxAnimation = function() { return this._fauxAnimationQueue.shift(); };
    Game_Temp.prototype.requestPointAnimation = function(x, y, animationId, mirror = false, mute = false) {
        if ($dataAnimations[animationId]) this._pointAnimationQueue.push({ x, y, animationId, mirror, mute });
    };
    Game_Temp.prototype.retrievePointAnimation = function() { return this._pointAnimationQueue.shift(); };
    Game_Temp.prototype.sceneTerminationClearEffects = function() {
        for (const request of [...this._animationQueue, ...this._fauxAnimationQueue]) {
            for (const target of request.targets) if (target.endAnimation) target.endAnimation();
        }
        for (const request of this._balloonQueue) if (request.target.endBalloon) request.target.endBalloon();
        this._animationQueue = [];
        this._fauxAnimationQueue = [];
        this._pointAnimationQueue = [];
        this._balloonQueue = [];
    };
    const terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function(...args) {
        if ($gameTemp) $gameTemp.sceneTerminationClearEffects();
        return terminate.apply(this, args);
    };

    const initializeSpriteset = Spriteset_Base.prototype.initialize;
    Spriteset_Base.prototype.initialize = function(...args) {
        this._fauxAnimationSprites = [];
        this._pointAnimationSprites = [];
        return initializeSpriteset.apply(this, args);
    };
    function animationSprite(owner, targets, targetSprites, animation, mirror, delay, mute) {
        const sprite = new (owner.isMVAnimation(animation) ? Sprite_AnimationMV : Sprite_Animation)();
        sprite.targetObjects = targets;
        sprite.setup(targetSprites, animation, mirror, delay);
        sprite.setMute(mute);
        owner._effectsContainer.addChild(sprite);
        return sprite;
    }
    Spriteset_Base.prototype.createFauxAnimation = function(request) {
        const animation = $dataAnimations[request.animationId];
        const groups = this.isAnimationForEach(animation) ? request.targets.map(target => [target]) : [request.targets];
        let delay = this.animationBaseDelay();
        for (const targets of groups) {
            const mirror = this.animationShouldMirror(targets[0]) ? !request.mirror : request.mirror;
            this._fauxAnimationSprites.push(animationSprite(this, targets, this.makeTargetSprites(targets), animation, mirror, delay, request.mute));
            delay += this.animationNextDelay();
        }
    };
    Spriteset_Base.prototype.getPointAnimationLayer = function() { return this._tilemap || this._battleField || this; };
    Spriteset_Base.prototype.createPointAnimation = function(request) {
        const layer = this.getPointAnimationLayer();
        const target = new Sprite_Clickable();
        target.z = 100;
        target.position.set(request.x - layer.x, request.y - layer.y);
        layer.addChild(target);
        const animation = $dataAnimations[request.animationId];
        this._pointAnimationSprites.push(animationSprite(this, [target], [target], animation,
            request.mirror, this.animationBaseDelay(), request.mute));
    };
    for (const kind of ["Faux", "Point"]) {
        const collection = `_${kind.toLowerCase()}AnimationSprites`;
        Spriteset_Base.prototype[`remove${kind}Animation`] = function(sprite) {
            this[collection].remove(sprite);
            this._effectsContainer.removeChild(sprite);
            for (const target of sprite.targetObjects) {
                if (kind === "Point") {
                    target.parent?.removeChild(target);
                    target.destroy();
                } else if (target.endAnimation) target.endAnimation();
            }
            sprite.destroy();
        };
        Spriteset_Base.prototype[`removeAll${kind}Animations`] = function() {
            for (const sprite of [...this[collection]]) this[`remove${kind}Animation`](sprite);
        };
        Spriteset_Base.prototype[`update${kind}Animations`] = function() {
            for (const sprite of [...this[collection]]) {
                if (!sprite.isPlaying()) this[`remove${kind}Animation`](sprite);
            }
            let request;
            while ((request = $gameTemp[`retrieve${kind}Animation`]())) this[`create${kind}Animation`](request);
        };
    }
    const update = Spriteset_Base.prototype.update;
    Spriteset_Base.prototype.update = function(...args) {
        const result = update.apply(this, args);
        this.updateFauxAnimations();
        this.updatePointAnimations();
        return result;
    };
    const destroy = Spriteset_Base.prototype.destroy;
    Spriteset_Base.prototype.destroy = function(...args) {
        this.removeAllFauxAnimations();
        this.removeAllPointAnimations();
        return destroy.apply(this, args);
    };
    Spriteset_Base.prototype.isFauxAnimationPlaying = function() { return this._fauxAnimationSprites.length > 0; };
    Spriteset_Base.prototype.isPointAnimationPlaying = function() { return this._pointAnimationSprites.length > 0; };
    const isPlaying = Spriteset_Base.prototype.isAnimationPlaying;
    Spriteset_Base.prototype.isAnimationPlaying = function(...args) {
        return isPlaying.apply(this, args) || this.isPointAnimationPlaying();
    };
    for (const type of [Sprite_Animation, Sprite_AnimationMV]) {
        type.prototype.setMute = function(mute) { this._muteSound = mute; };
    }
    const sounds = Sprite_Animation.prototype.processSoundTimings;
    Sprite_Animation.prototype.processSoundTimings = function(...args) {
        if (!this._muteSound) return sounds.apply(this, args);
    };
    const timing = Sprite_AnimationMV.prototype.processTimingData;
    Sprite_AnimationMV.prototype.processTimingData = function(data) {
        if (this._muteSound && data.se) data = { ...data, se: { ...data.se, volume: 0 } };
        return timing.call(this, data);
    };
    const position = Sprite_AnimationMV.prototype.updatePosition;
    Sprite_AnimationMV.prototype.updatePosition = function(...args) {
        const result = position.apply(this, args);
        if (this._animation.position === 3) {
            if (this.x === 0) this.x = Math.round(Graphics.width / 2);
            if (this.y === 0) this.y = Math.round(Graphics.height / 2);
        }
        return result;
    };
    const command = catalog.commands.find(command => command.key === "AnimationPoint");
    PluginManager.registerCommand(catalog.pluginId, command.key, function(raw) {
        if (!SceneManager._scene?._spriteset) return;
        const args = convertEventArguments(command, raw);
        $gameTemp.requestPointAnimation(Math.round(args.pointX), Math.round(args.pointY), args.AnimationID, args.Mirror, args.Mute);
    });
}
