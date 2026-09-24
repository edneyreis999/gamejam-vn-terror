function vnEffectDefaults() {
    return {
        _vnBreathing: {enabled: false, speed: {x: 30, y: 30}, rate: {x: 0.1, y: 0.5}},
        _vnFidgeting: {enabled: false, speed: {x: 30, y: 30}, rate: {x: 5, y: 0}},
        _vnSwaying: {enabled: false, speed: {angle: 30}, rate: {angle: 5}}
    };
}
Game_Picture.prototype.initVnPictureSlightMovements = function() {
    for (const [field, defaults] of Object.entries(vnEffectDefaults())) {
        if (this[field] === undefined) this[field] = defaults;
    }
};
for (const effect of ['Breathing', 'Fidgeting', 'Swaying']) {
    const field = `_vn${effect}`;
    Game_Picture.prototype[`getVnPicture${effect}Settings`] = function() {
        if (this[field] === undefined) this.initVnPictureSlightMovements();
        return this[field];
    };
    Game_Picture.prototype[`setVnPicture${effect}Settings`] = function(settings) {
        if (this[field] === undefined) this.initVnPictureSlightMovements();
        this[field] = JSON.parse(JSON.stringify(settings));
    };
}
Game_Picture.prototype.isVnPictureFidgeting = function() {
    return this.getVnPictureFidgetingSettings().enabled;
};
for (const [property, method, effect, axis, oscillate] of [
    ['scaleX', 'applyVnBreathingScaleX', 'Breathing', 'x', vnOscillation],
    ['scaleY', 'applyVnBreathingScaleY', 'Breathing', 'y', vnOscillation],
    ['x', 'applyVnFidgetingScaleX', 'Fidgeting', 'x', vnOscillation],
    ['y', 'applyVnFidgetingScaleY', 'Fidgeting', 'y', vnFidgetY],
    ['angle', 'applyVnSwaying', 'Swaying', 'angle', vnOscillation]
]) {
    const alias = `Game_Picture_${property}`;
    api[alias] = Game_Picture.prototype[property];
    Game_Picture.prototype[property] = function(...args) {
        return api[alias].apply(this, args) + this[method]();
    };
    Game_Picture.prototype[method] = function() {
        const settings = this[`getVnPicture${effect}Settings`]();
        return settings.enabled ? oscillate(Graphics.frameCount, settings.speed[axis], settings.rate[axis]) : 0;
    };
}
api.Sprite_Picture_updatePosition = Sprite_Picture.prototype.updatePosition;
Sprite_Picture.prototype.updatePosition = function(...args) {
    if (this.picture().isVnPictureFidgeting()) return this.updatePositionVnFidgeting();
    return api.Sprite_Picture_updatePosition.apply(this, args);
};
Sprite_Picture.prototype.updatePositionVnFidgeting = function() {
    const picture = this.picture();
    this.x = picture.x();
    this.y = picture.y();
};
function changeVnEffect(args, effect, enabled) {
    eachVnPicture(args.PictureID, picture => {
        const settings = picture[`getVnPicture${effect}Settings`]();
        settings.enabled = enabled;
        if (enabled) {
            const axes = effect === 'Swaying' ? ['angle'] : ['x', 'y'];
            for (const axis of axes) {
                const suffix = axis[0].toUpperCase() + axis.slice(1);
                settings.speed[axis] = args[`Speed${suffix}`] || 0;
                settings.rate[axis] = args[`Rate${suffix}`] || 0;
            }
        }
        picture[`setVnPicture${effect}Settings`](settings);
    });
}
