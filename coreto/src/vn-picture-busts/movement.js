function vnExpressionError(error) {
    // The original reports per-axis expression errors in playtest and continues the command.
    if ($gameTemp.isPlaytest()) console.log(error);
}
function finishVnMove(picture, args) {
    picture.vnSetDuration(args.Duration);
    setVnEasing(picture, args.EasingType);
    if (args.FlipDirection.toUpperCase().trim() === 'FLIP') {
        picture._scaleX *= -1;
        picture._targetScaleX *= -1;
    }
}
function moveVnCoordinates(args, relative) {
    eachVnPicture(args.PictureID, picture => {
        for (const axis of ['X', 'Y']) {
            const expression = args[(relative ? 'Move' : 'Target') + axis];
            if (expression.toUpperCase().trim() === 'UNCHANGED') continue;
            try {
                const value = eval(expression);
                const target = '_target' + axis;
                picture[target] = relative ? (picture._duration > 0 ? picture[target] : picture['_' + axis.toLowerCase()]) + value : value;
            } catch (error) { vnExpressionError(error); }
        }
        finishVnMove(picture, args);
    });
}
function setVnPositionTarget(picture, position) {
    const coordinates = ImageManager.vnPictureBustPosition(position);
    picture._targetX = coordinates.x;
    picture._targetY = coordinates.y;
    picture.setVnBustPosition(position);
}
function moveVnPosition(args, relative) {
    eachVnPicture(args.PictureID, picture => {
        try {
            const position = relative ? picture.getVnBustPosition() + eval(args.MovePosition) : Number(eval(args.TargetPosition)) || 0;
            setVnPositionTarget(picture, position.clamp(0, 10));
        } catch (error) { vnExpressionError(error); }
        finishVnMove(picture, args);
    });
}
function resetVnPosition(args) {
    eachVnPicture(args.PictureID, picture => {
        setVnPositionTarget(picture, picture.getVnBustPosition().clamp(0, 10));
        finishVnMove(picture, args);
    });
}
