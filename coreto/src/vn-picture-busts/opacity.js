function eachVnPicture(ids, operation) {
    for (const rawId of ids) {
        const id = (rawId || 1).clamp(1, 100);
        const picture = $gameScreen.picture(id);
        if (picture) operation(picture, id);
    }
}
function exitBusts(args) {
    eachVnPicture(args.PictureID, (picture, id) => {
        const anchor = picture._anchor;
        const targetAnchor = picture._targetAnchor;
        const offsetX = args.EndOffsetX * (picture._scaleX < 0 ? 1 : -1);
        $gameScreen.movePicture(id, picture._origin, picture._x + offsetX, picture._y + args.EndOffsetY,
            picture._scaleX, picture._scaleY, 0, 0, args.Duration, 0);
        picture.setAnchor(anchor);
        picture.setTargetAnchor(targetAnchor);
        setVnEasing(picture, args.EasingType);
        picture.setVnBustPosition(-1);
        if (args.FlipDirection.toUpperCase().trim() === 'FLIP') {
            picture._scaleX *= -1;
            picture._targetScaleX *= -1;
        }
        if (args.AutoErase) $gameScreen.vnAutoErasePicture(id, 50);
    });
}
function changeVnOpacity(args, operation) {
    eachVnPicture(args.PictureID, (picture, id) => {
        picture.vnSetDuration(args.Duration);
        if (operation === 'in') picture._targetOpacity = 255;
        else if (operation === 'out') picture._targetOpacity = 0;
        else if (operation === 'by') picture._targetOpacity = Math.round(picture._targetOpacity + (Number(args.AdjustOpacity) || 0)).clamp(0, 255);
        else picture._targetOpacity = args.TargetOpacity.clamp(0, 255);
        setVnEasing(picture, 'Linear');
        if (operation === 'out' && args.AutoErase) $gameScreen.vnAutoErasePicture(id, 50);
    });
}
