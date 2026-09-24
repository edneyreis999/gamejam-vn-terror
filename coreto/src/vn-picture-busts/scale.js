function scaleVnBusts(args, operation) {
    eachVnPicture(args.PictureID, picture => {
        for (const axis of ['X', 'Y']) {
            const current = picture['_scale' + axis];
            const target = '_targetScale' + axis;
            if (operation === 'reset') picture[target] = api.Settings['Scale' + axis] * (current > 0 ? 1 : -1);
            else if (operation === 'by') {
                const change = (args['Scale' + axis] || 0) * (current < 0 ? -1 : 1);
                picture[target] = (picture._duration > 0 ? picture[target] : current) + change;
            } else {
                const expression = args['TargetScale' + axis];
                if (expression.toUpperCase().trim() === 'UNCHANGED') continue;
                try { picture[target] = eval(expression) * (current < 0 ? -1 : 1); }
                catch (error) { vnExpressionError(error); }
            }
        }
        picture.vnSetDuration(args.Duration);
        setVnEasing(picture, 'Linear');
    });
}
