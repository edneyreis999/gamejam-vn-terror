ImageManager.vnPictureBustPosition = function(position) {
    if (!this._vnPictureBustCoordinates) {
        const coordinates = {};
        for (let index = 0; index <= 10; index++) {
            coordinates[index] = {x: Math.round(api.Settings.ScreenX(index)), y: Math.round(api.Settings.ScreenY(index))};
        }
        this._vnPictureBustCoordinates = coordinates;
    }
    const coordinates = this._vnPictureBustCoordinates[position];
    if (!coordinates) throw new TypeError(`VN picture position has no cached coordinates: ${position}.`);
    return coordinates;
};
api.Game_Picture_initialize = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function(...args) {
    const result = api.Game_Picture_initialize.apply(this, args);
    this.initVnPictureBusts();
    this.initVnPictureSlightMovements();
    this._coretoVn = {schemaVersion: 1};
    return result;
};
Game_Picture.prototype.initVnPictureBusts = function() { this._vnPictureBustPosition = -1; };
Game_Picture.prototype.setVnBustPosition = function(position) { this._vnPictureBustPosition = Number(position) || 0; };
Game_Picture.prototype.getVnBustPosition = function() {
    if (this._vnPictureBustPosition === undefined) this.initVnPictureBusts();
    return this._vnPictureBustPosition;
};
Game_Picture.prototype.setVnBustAnchor = function(start, target) {
    const anchor = {x: api.Settings.AnchorX, y: api.Settings.AnchorY};
    if (start) this.setAnchor(anchor);
    if (target || this._duration <= 0) this.setTargetAnchor(anchor);
};
Game_Picture.prototype.vnSetDuration = function(duration) {
    this._duration = Math.max(duration, 1);
    this._wholeDuration = this._duration;
};
api.Game_Picture_updateMove = Game_Picture.prototype.updateMove;
Game_Picture.prototype.updateMove = function(...args) {
    const duration = this._duration;
    const result = api.Game_Picture_updateMove.apply(this, args);
    if (duration > 0 && this._duration <= 0) {
        this._x = this._targetX;
        this._y = this._targetY;
        this._scaleX = this._targetScaleX;
        this._scaleY = this._targetScaleY;
        this._opacity = this._targetOpacity;
        if (this._anchor) {
            this._anchor.x = this._targetAnchor.x;
            this._anchor.y = this._targetAnchor.y;
        }
    }
    return result;
};

function setVnEasing(picture, type) {
    if (typeof picture.setEasingType === 'function') picture.setEasingType(type);
    else picture._easingType = type;
}
