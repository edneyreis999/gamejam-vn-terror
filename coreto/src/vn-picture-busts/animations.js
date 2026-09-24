api.Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function(...args) {
    const result = api.Game_Temp_initialize.apply(this, args);
    this._pictureAnimationQueue = [];
    return result;
};
Game_Temp.prototype.requestPictureAnimation = function(targets, animationId, mirror) {
    if (!$dataAnimations[animationId]) return;
    this._pictureAnimationQueue.push({targets, animationId, mirror: mirror || false});
    for (const target of targets) if (target.startAnimation) target.startAnimation();
};
Game_Temp.prototype.retrievePictureAnimation = function() {
    return this._pictureAnimationQueue.shift();
};
function vnAnimationVersionAllowed() {
    if (!Imported.VisuMZ_1_BattleCore || VisuMZ.BattleCore.version >= 1.47) return true;
    if (!api.BattleCoreVersionCheck) {
        api.BattleCoreVersionCheck = true;
        alert('VisuMZ_1_BattleCore needs to be updated to use\nBASIC: Play Animation on Bust(s) plugin command.');
    }
    return false;
}
function playVnAnimation(args) {
    if (!$dataAnimations[args.AnimationID]) return;
    $gameTemp.requestPictureAnimation(args.PictureID.slice(), args.AnimationID, args.Mirror);
    const interpreter = $gameTemp.getLastPluginCommandInterpreter() || this;
    const spriteset = SceneManager._scene?._spriteset;
    if (interpreter && args.WaitForAnimation && spriteset) {
        spriteset.updatePictureAnimations();
        interpreter.setWaitMode('pictureAnimation');
    }
}
api.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function(...args) {
    if (this._waitMode === 'pictureAnimation') {
        if (SceneManager._scene?._spriteset?.isPictureAnimationPlaying()) return true;
        this._waitMode = '';
    }
    return api.Game_Interpreter_updateWaitMode.apply(this, args);
};
api.Spriteset_Base_createPictures = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function(...args) {
    const result = api.Spriteset_Base_createPictures.apply(this, args);
    this.createPictureEffectsContainer();
    return result;
};
Spriteset_Base.prototype.createPictureEffectsContainer = function() {
    const container = new Sprite();
    const rect = this.pictureContainerRect();
    container.setFrame(rect.x, rect.y, rect.width, rect.height);
    this.addChild(container);
    this._pictureEffectsContainer = container;
    this._vnPictureAnimationSprites = [];
};
api.Spriteset_Base_updateAnimations = Spriteset_Base.prototype.updateAnimations;
Spriteset_Base.prototype.updateAnimations = function(...args) {
    const result = api.Spriteset_Base_updateAnimations.apply(this, args);
    this.updatePictureAnimations();
    return result;
};
Spriteset_Base.prototype.updatePictureAnimations = function() {
    for (const sprite of [...this._vnPictureAnimationSprites]) {
        if (!sprite.isPlaying()) this.removePictureAnimation(sprite);
    }
    this.processPictureAnimationRequests();
};
Spriteset_Base.prototype.processPictureAnimationRequests = function() {
    let request;
    while ((request = $gameTemp.retrievePictureAnimation())) this.createPictureAnimation(request);
};
Spriteset_Base.prototype.createPictureAnimation = function(request) {
    const animation = $dataAnimations[request.animationId];
    if (!animation) return;
    const groups = this.isAnimationForEach(animation) ? request.targets.map(target => [target]) : [request.targets];
    let delay = this.animationBaseDelay();
    for (const targets of groups) {
        this.createPictureAnimationSprite(targets, animation, request.mirror, delay);
        delay += this.animationNextDelay();
    }
};
Spriteset_Base.prototype.createPictureAnimationSprite = function(targets, animation, mirror, delay) {
    const targetSprites = this.makePictureTargetSprites(targets).filter(sprite => sprite.picture());
    if (targetSprites.length === 0) return;
    const sprite = new (this.isMVAnimation(animation) ? Sprite_AnimationMV : Sprite_Animation)();
    const previous = delay > this.animationBaseDelay() ? this._vnPictureAnimationSprites[this._vnPictureAnimationSprites.length - 1] || this.lastAnimationSprite() : null;
    if (this.animationShouldMirror(targets[0])) mirror = !mirror;
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    this._pictureEffectsContainer.addChild(sprite);
    this._vnPictureAnimationSprites.push(sprite);
};
Spriteset_Base.prototype.makePictureTargetSprites = function(targets) {
    return targets.map(target => this.findPictureTargetSprite(target)).filter(Boolean);
};
Spriteset_Base.prototype.findPictureTargetSprite = function(target) {
    return this._pictureContainer.children.find(sprite => sprite._pictureId === target);
};
Spriteset_Base.prototype.removePictureAnimation = function(sprite) {
    const index = this._vnPictureAnimationSprites.indexOf(sprite);
    if (index < 0) return;
    this._vnPictureAnimationSprites.splice(index, 1);
    this._pictureEffectsContainer.removeChild(sprite);
    for (const target of sprite.targetObjects) if (target.endAnimation) target.endAnimation();
    sprite.destroy();
};
Spriteset_Base.prototype.removeAllPictureAnimations = function() {
    for (const sprite of [...this._vnPictureAnimationSprites]) this.removePictureAnimation(sprite);
};
api.Spriteset_Base_removeAllAnimations = Spriteset_Base.prototype.removeAllAnimations;
Spriteset_Base.prototype.removeAllAnimations = function(...args) {
    const result = api.Spriteset_Base_removeAllAnimations.apply(this, args);
    this.removeAllPictureAnimations();
    return result;
};
Spriteset_Base.prototype.isPictureAnimationPlaying = function() {
    return this._vnPictureAnimationSprites.length > 0;
};
const terminateVnScene = Scene_Base.prototype.terminate;
Scene_Base.prototype.terminate = function(...args) {
    if ($gameTemp) $gameTemp._pictureAnimationQueue = [];
    this._spriteset?.removeAllPictureAnimations();
    return terminateVnScene.apply(this, args);
};
