const graphicRequests = new WeakMap();
Game_Picture.prototype.vnChangeGraphic = function(name) {
    const screen = globalThis.$gameScreen;
    const realId = screen?._pictures.indexOf(this) ?? -1;
    const request = {};
    graphicRequests.set(this, request);
    ImageManager.loadPicture(name).addLoadListener(() => {
        if (graphicRequests.get(this) !== request) return;
        if (realId >= 0 && (globalThis.$gameScreen !== screen || screen._pictures[realId] !== this)) return;
        graphicRequests.delete(this);
        this.vnPostChangeGraphic(name);
    });
};
Game_Picture.prototype.vnPostChangeGraphic = function(name) { this._name = name; };
function changeVnGraphic(args) {
    const picture = $gameScreen.picture(args.PictureID);
    if (picture && args.PictureName.trim().length > 0) picture.vnChangeGraphic(args.PictureName);
}
function mirrorVnBusts(args) {
    eachVnPicture(args.PictureID, picture => {
        const mode = args.HorzMirror.toUpperCase().trim();
        if (mode === 'TOGGLE') picture._scaleX *= -1;
        else picture._scaleX = Math.abs(picture._scaleX) * (api.HorzMirrorCheck(mode, picture.getVnBustPosition()) ? -1 : 1);
        picture._targetScaleX = picture._scaleX;
    });
}
function changeVnOrigin(args) {
    eachVnPicture(args.PictureID, picture => {
        const origin = args.Origin.toUpperCase().trim();
        if (!['UPPER LEFT', 'CENTER', 'BUST'].includes(origin)) return;
        picture.vnSetDuration(args.Duration);
        setVnEasing(picture, 'Linear');
        if (origin === 'BUST') picture.setVnBustAnchor(false, true);
        else if (origin === 'UPPER LEFT') picture.setTargetAnchor({x: 0, y: 0});
        else if (origin === 'CENTER') picture.setTargetAnchor({x: .5, y: .5});
    });
}
