function Sprite_AttachPicture(pictureId, parentId) {
    this._parentID = parentId;
    Sprite_Picture.prototype.initialize.call(this, pictureId);
}
Sprite_AttachPicture.prototype = Object.create(Sprite_Picture.prototype);
Sprite_AttachPicture.prototype.constructor = Sprite_AttachPicture;
Sprite_AttachPicture.prototype.isUsingAttachedPicture = function() {
    return $gameSystem.isAttachedBasePicture(this._pictureId) && $gameSystem.getAttachedBasePictureTarget(this._pictureId) === this._parentID;
};
Sprite_AttachPicture.prototype.isClickEnabled = function() { return false; };
function Sprite_MessagePicture(pictureId) { Sprite_Picture.prototype.initialize.call(this, pictureId); }
Sprite_MessagePicture.prototype = Object.create(Sprite_Picture.prototype);
Sprite_MessagePicture.prototype.constructor = Sprite_MessagePicture;
Sprite_MessagePicture.prototype.isUsingAttachedPicture = function() { return $gameSystem.isAttachedMessagePicture(this._pictureId); };
Sprite_MessagePicture.prototype.isClickEnabled = function() { return false; };
globalThis.Sprite_AttachPicture = Sprite_AttachPicture;
globalThis.Sprite_MessagePicture = Sprite_MessagePicture;

const updateAttachedPictureBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function(...args) {
    const result = updateAttachedPictureBitmap.apply(this, args);
    this.hideAttachedPicture();
    return result;
};
Sprite_Picture.prototype.hideAttachedPicture = function() {
    const derived = this instanceof Sprite_AttachPicture || this instanceof Sprite_MessagePicture;
    if (derived ? !this.isUsingAttachedPicture() : $gameSystem.isPictureAttached(this._pictureId)) this.visible = false;
};
const attachedPictureClickEnabled = Sprite_Picture.prototype.isClickEnabled;
Sprite_Picture.prototype.isClickEnabled = function(...args) {
    return !$gameSystem.isPictureAttached(this._pictureId) && attachedPictureClickEnabled.apply(this, args);
};
Sprite_Picture.prototype.hasAttachedPicture = function() {
    return !(this instanceof Sprite_AttachPicture || this instanceof Sprite_MessagePicture) && $gameSystem.hasAttachedPicture(this._pictureId);
};
Sprite_Picture.prototype.createAttachedPictures = function() {
    if (this._pictureContainer) return;
    this._pictureContainer = new Sprite();
    this.addChild(this._pictureContainer);
};
Sprite_Picture.prototype.removeAttachedPictures = function() {
    if (!this._pictureContainer) return;
    this.removeChild(this._pictureContainer);
    this._pictureContainer.destroy();
    this._pictureContainer = null;
};
function syncAttachedSprites(container, ids, create) {
    const wanted = [...new Set(ids)].filter(id => id >= 1 && id <= $gameScreen.maxPictures()).sort((a,b) => a-b);
    for (const sprite of container.children.slice()) if (!wanted.includes(sprite._pictureId)) {
        container.removeChild(sprite);
        sprite.destroy();
    }
    for (const id of wanted) if (!container.children.some(sprite => sprite._pictureId === id)) container.addChild(create(id));
    container.children.sort((a,b) => a._pictureId-b._pictureId);
}
const updateAttachedPicture = Sprite_Picture.prototype.update;
Sprite_Picture.prototype.update = function(...args) {
    const result = updateAttachedPicture.apply(this, args);
    if (this.hasAttachedPicture()) {
        this.createAttachedPictures();
        syncAttachedSprites(this._pictureContainer, $gameSystem.getAttachedBasePictures().filter(id => $gameSystem.getAttachedBasePictureTarget(id) === this._pictureId), id => new Sprite_AttachPicture(id, this._pictureId));
    } else this.removeAttachedPictures();
    return result;
};
Window_Message.prototype.createMessagePictureContainer = function() {
    this._pictureContainer = new Sprite();
    const position = attachedPicturesApi.settings.ContainerPosition;
    if (position === 0 || position === 1) this.addChildAt(this._pictureContainer, position);
    else this.addChild(this._pictureContainer);
    syncAttachedSprites(this._pictureContainer, $gameSystem.getAttachedMessagePictures(), id => new Sprite_MessagePicture(id));
};
Window_Message.prototype.updateMessagePictureContainerVisibility = function() {
    this._pictureContainer.visible = this.isOpen();
};
const initializeAttachedMessage = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function(...args) {
    const result = initializeAttachedMessage.apply(this, args);
    this.createMessagePictureContainer();
    return result;
};
const updateAttachedMessage = Window_Message.prototype.update;
Window_Message.prototype.update = function(...args) {
    const result = updateAttachedMessage.apply(this, args);
    syncAttachedSprites(this._pictureContainer, $gameSystem.getAttachedMessagePictures(), id => new Sprite_MessagePicture(id));
    this.updateMessagePictureContainerVisibility();
    return result;
};
globalThis.Imported ??= {};
Imported.Coreto_4_AttachedPictures = true;
Imported.VisuMZ_4_AttachedPictures = true;
globalThis.VisuMZ ??= {};
VisuMZ.AttachedPictures = {version:Number(catalog.reference.version),Settings:attachedPicturesApi.settings};
