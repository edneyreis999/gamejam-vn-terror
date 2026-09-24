const attachedPicturesApi = installComplement(catalog, 'AttachedPictures', 'AP');
Window_Message.DEFAULT_MESSAGE_PICTURE_IDS = attachedPicturesApi.settings.PictureIDs.slice();
Game_System.prototype.initAttachedPictures = function() {
    this._attachedBasePictures = [];
    this._attachedBasePictureTargets = {};
    this._attachedMessagePictures = Window_Message.DEFAULT_MESSAGE_PICTURE_IDS.slice();
};
const initializeAttachedPictures = Game_System.prototype.initialize;
Game_System.prototype.initialize = function(...args) {
    const result = initializeAttachedPictures.apply(this, args);
    this.initAttachedPictures();
    return result;
};
Game_System.prototype.getAttachedBasePictures = function() {
    if (this._attachedBasePictures === undefined) this._attachedBasePictures = [];
    return this._attachedBasePictures;
};
Game_System.prototype.getAttachedBasePictureTarget = function(id) {
    if (this._attachedBasePictureTargets === undefined) this._attachedBasePictureTargets = {};
    return this._attachedBasePictureTargets[id];
};
Game_System.prototype.getAttachedMessagePictures = function() {
    if (this._attachedMessagePictures === undefined) this._attachedMessagePictures = Window_Message.DEFAULT_MESSAGE_PICTURE_IDS.slice();
    return this._attachedMessagePictures;
};
Game_System.prototype.isAttachedBasePicture = function(id) { return this.getAttachedBasePictures().includes(id); };
Game_System.prototype.isAttachedMessagePicture = function(id) { return this.getAttachedMessagePictures().includes(id); };
Game_System.prototype.isPictureAttached = function(id) { return this.isAttachedBasePicture(id) || this.isAttachedMessagePicture(id); };
Game_System.prototype.hasAttachedPicture = function(id) {
    return this.getAttachedBasePictures().some(child => this.getAttachedBasePictureTarget(child) === id);
};
Game_System.prototype.removeAttachedBasePictureID = function(id) {
    const ids = this.getAttachedBasePictures(), index = ids.indexOf(id);
    if (index >= 0) ids.splice(index, 1);
    this.getAttachedBasePictureTarget(id);
    delete this._attachedBasePictureTargets[id];
};
Game_System.prototype.removeAttachedMessagePictureID = function(id) {
    const ids = this.getAttachedMessagePictures(), index = ids.indexOf(id);
    if (index >= 0) ids.splice(index, 1);
};
Game_System.prototype.addAttachedBasePictureID = function(id, target) {
    if (id === target || this.isPictureAttached(target) || this.hasAttachedPicture(id)) return;
    this.removeAttachedMessagePictureID(id);
    const ids = this.getAttachedBasePictures();
    if (!ids.includes(id)) ids.push(id);
    this.getAttachedBasePictureTarget(id);
    this._attachedBasePictureTargets[id] = target;
};
Game_System.prototype.addAttachedMessagePictureID = function(id) {
    if (this.hasAttachedPicture(id)) return;
    this.removeAttachedBasePictureID(id);
    const ids = this.getAttachedMessagePictures();
    if (!ids.includes(id)) ids.push(id);
};
for (const namespace of [catalog.pluginId,catalog.reference.pluginId]) {
    for (const command of catalog.commands) PluginManager.registerCommand(namespace, command.key, function(args) {
        const defaults = Object.fromEntries(command.args.map(field => [field.storageKey,field.nativeDefault]));
        const raw = {...defaults,...args};
        const ids = JSON.parse(raw['PictureID:arraynum']).map(Number);
        const method = {MessageAddPicture:'addAttachedMessagePictureID',MessageRemovePicture:'removeAttachedMessagePictureID',PictureAddPicture:'addAttachedBasePictureID',PictureRemovePicture:'removeAttachedBasePictureID'}[command.key];
        for (const id of ids) $gameSystem[method](id, Number(raw['TargetID:num']));
    });
}
