function enterBust(args) {
    const id = (args.PictureID || 1).clamp(1, 100);
    if (args.PictureName.trim().length === 0) return;
    const origin = args.Origin.toUpperCase().trim();
    const position = args.Position.clamp(0, 10);
    const coordinates = ImageManager.vnPictureBustPosition(position);
    const mirrored = api.HorzMirrorCheck(args.HorzMirror, position);
    const scaleX = api.Settings.ScaleX * (mirrored ? -1 : 1);
    const scaleY = api.Settings.ScaleY;
    const nativeOrigin = origin === 'UPPER LEFT' ? 0 : 1;
    const offsetX = args.StartOffsetX * (mirrored ? 1 : -1);
    $gameScreen.showPicture(id, args.PictureName, nativeOrigin, coordinates.x + offsetX, coordinates.y + args.StartOffsetY, scaleX, scaleY, 0, 0);
    $gameScreen.movePicture(id, nativeOrigin, coordinates.x, coordinates.y, scaleX, scaleY, 255, 0, args.Duration, 0);
    const picture = $gameScreen.picture(id);
    setVnEasing(picture, args.EasingType);
    picture.setVnBustPosition(position);
    if (origin === 'BUST') picture.setVnBustAnchor(true, true);
}
const handlers = {
    Basic_PlayAniBust: playVnAnimation,
    Breathing_Enable: args => changeVnEffect(args, 'Breathing', true),
    Breathing_Disable: args => changeVnEffect(args, 'Breathing', false),
    Fidgeting_Enable: args => changeVnEffect(args, 'Fidgeting', true),
    Fidgeting_Disable: args => changeVnEffect(args, 'Fidgeting', false),
    Swaying_Enable: args => changeVnEffect(args, 'Swaying', true),
    Swaying_Disable: args => changeVnEffect(args, 'Swaying', false),

    Basic_EnterBust: enterBust,
    Basic_ExitBusts: exitBusts,
    Tone_BrightBust: args => tintVnBusts(args, api.Settings.brightTone),
    Tone_DimBust: args => tintVnBusts(args, api.Settings.dimTone),
    Tone_NormalBust: args => tintVnBusts(args, [0, 0, 0, 0]),
    Tone_PresetBust: args => tintVnBusts(args, vnPresetTone(args.Preset)),
    Tone_CustomToneBust: args => tintVnBusts(args, args.customTone),
    Scale_ScaleBy: args => scaleVnBusts(args, 'by'),
    Scale_ScaleTo: args => scaleVnBusts(args, 'to'),
    Scale_ScaleReset: args => scaleVnBusts(args, 'reset'),
    Move_MoveByCoordinates: args => moveVnCoordinates(args, true),
    Move_MoveToCoordinates: args => moveVnCoordinates(args, false),
    Move_MoveByPosition: args => moveVnPosition(args, true),
    Move_MoveToPosition: args => moveVnPosition(args, false),
    Move_ResetToPosition: resetVnPosition,
    Basic_GraphicChange: changeVnGraphic,
    Basic_MirrorBust: mirrorVnBusts,
    Basic_OriginChange: changeVnOrigin,
    Fade_FadeIn: args => changeVnOpacity(args, 'in'),
    Fade_FadeOut: args => changeVnOpacity(args, 'out'),
    Fade_OpacityBy: args => changeVnOpacity(args, 'by'),
    Fade_OpacityTo: args => changeVnOpacity(args, 'to')
};
for (const command of catalog.commands) {
    const handler = handlers[command.key];
    if (!handler) continue;
    for (const pluginId of [catalog.pluginId, legacyId]) {
        PluginManager.registerCommand(pluginId, command.key, function(raw) {
            if (command.key === 'Basic_PlayAniBust' && !vnAnimationVersionAllowed()) return;
            const values = Object.fromEntries(command.args.map(field => [field.storageKey, raw[field.storageKey] ?? field.nativeDefault]));
            return handler.call(this, convertVnFields(values));
        });
    }
}
