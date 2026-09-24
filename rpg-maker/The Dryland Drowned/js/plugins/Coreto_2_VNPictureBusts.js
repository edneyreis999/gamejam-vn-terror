/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 2] [Version 0.1.0] VN Picture Busts
 * @author Coreto
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter VisuMZ_1_BattleCore
 * @help
 * Desative VisuMZ_2_VNPictureBusts antes de ativar este plugin.
 * Requer Core Engine original ou Coreto antes de VN. Message/Battle opcionais.
 * inherit reads the original parameters, including disabled entries.
 * own usa este registro; defaults preenchem somente chaves ausentes.
 * 29 comandos: entrada/saida, grafico, espelho, origem, opacidade, movimento,
 * escala, tom, efeitos continuos e animacoes MV/MZ com espera opcional.
 * Enter usa ScaleY independente de ScaleX.
 * Saves proprios preservam fatos VN e intencao AutoErase versionada.
 * Saves legados conservam os dados existentes; animacoes temporarias nao
 * sao recriadas. Mantenha saves de origem para rollback do plugin.
 * Runtime usa somente este bundle e recursos relativos do projeto MZ.
 * Listas em geral usam IDs1-100; GraphicChange e PlayAni usam IDs exatos.
 * IDs antigo e proprio sao aceitos; nao ative ambos os provedores.
 * Guia de uso: coreto/README.md.
 * CLI opcional: node coreto/tools/coreto/cli.mjs --project <raiz> vn --help.
 * Reabra o editor depois de alterar arquivos pela CLI.
 *
 * @param CoretoConfigSource
 * @type select
 * @option inherit
 * @option own
 * @value inherit
 * @value own
 * @text Configuration source
 * @desc inherit reads the original entry when present; own reads this entry. Switching does not copy values.
 * @default inherit
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param VNPictureBusts
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Anchor
 * @text Anchor Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Anchor
 * @desc Determines the anchor/origin X setting for Picture Busts.
 * 0.0 is left, 0.5 is center, 1.0 is right.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Anchor
 * @desc Determines the anchor/origin Y setting for Picture Busts.
 * 0.0 is top, 0.5 is middle, 1.0 is bottom.
 * @default 1.0
 *
 * @param Scale
 * @text Scale Settings
 *
 * @param ScaleX:num
 * @text Scale X
 * @parent Scale
 * @desc Scale X adjustment settings for Picture Busts.
 * Value scale: 100 = 100% = 1.0
 * @default 100
 *
 * @param ScaleY:num
 * @text Scale Y
 * @parent Scale
 * @desc Scale Y adjustment settings for Picture Busts.
 * Value scale: 100 = 100% = 1.0
 * @default 100
 *
 * @param InvertedScale:arraynum
 * @text Mirror Horizontally
 * @parent Scale
 * @type number[]
 * @max 10
 * @desc Which positions will be mirrored horizontally?
 * You want your Busts facing the center of the screen.
 * @default ["0","1","2","3","4"]
 *
 * @param Screen
 * @text Screen Positioning
 *
 * @param ScreenX:func
 * @text JS: Position X
 * @parent Screen
 * @type note
 * @desc Code to determine used to calculate the X coordinate
 * for each screen position.
 * @default "// Declare Arguments\nconst position = arguments[0].clamp(0, 10);\n\n// Declare Variables\nconst bufferX = 200;\nconst width = Graphics.width - (bufferX * 2);\n\n// Calculate X Position\nx = Math.round(position * width / 10) + bufferX;\nx = x.clamp(bufferX, Graphics.width - bufferX);\n\n// Return X Value\nreturn x;"
 *
 * @param ScreenY:func
 * @text JS: Position Y
 * @parent Screen
 * @type note
 * @desc Code to determine used to calculate the Y coordinate
 * for each screen position.
 * @default "// Declare Arguments\nconst position = arguments[0].clamp(0, 10);\n\n// Declare Variables\nconst stagger = 0;\nconst difference = 5 - Math.abs(5 - position);\nlet y = Graphics.height;\n\n// Calculate Y Position\ny = Graphics.height + Math.round(difference * stagger) + 5;\n\n// Return Y Value\nreturn y;"
 *
 * @param Tone
 * @text Tone Presets
 *
 * @param brightTone:eval
 * @text Bright Tone
 * @parent Tone
 * @desc What tone do you want for brightness?
 * Format: [Red, Green, Blue, Gray]
 * @default [34, 34, 34, 0]
 *
 * @param dimTone:eval
 * @text Dim Tone
 * @parent Tone
 * @desc What tone do you want for dimming?
 * Format: [Red, Green, Blue, Gray]
 * @default [-34, -34, 0, 34]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @command Separator_Basic
 * @text -
 * @desc -
 *
 * @command Category_Basic
 * @text Category - Basic
 * @desc These are basic Picture Bust Plugin Commands.
 *
 * @command Basic_EnterBust
 * @text BASIC: Enter Bust
 * @desc Generic entrance for ONE picture bust.
 * Walks in from a little behind and fades in.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @desc What is the Picture ID to associate with this bust?
 * You may use JavaScript code.
 * @default 1
 *
 * @arg PictureName:str
 * @text Picture File
 * @parent PictureID:eval
 * @type file
 * @dir img/pictures/
 * @desc Picture image name relative to img/pictures, without .png; for example Bust loads img/pictures/Bust.png. Supply an existing image. >>>ATTENTION<<< is a native placeholder, not a supplied asset.
 * @default >>>ATTENTION<<<
 *
 * @arg Origin:str
 * @text Origin
 * @parent PictureID:eval
 * @type select
 * @option Upper Left
 * @option Center
 * @option Bust
 * @desc Upper Left anchors at(0,0); Center at(0.5,0.5). Bust uses Settings.AnchorX and Settings.AnchorY, default(0.5,1), the bottom-center of the graphic. Anchor fractions refer to the image dimensions.
 * @default Bust
 *
 * @arg Position:num
 * @text Screen Position
 * @type number
 * @max 10
 * @desc Insert a screen position value from 0 to 10.
 * Coordinates are determined by Plugin Parameters.
 * @default 0
 *
 * @arg StartOffsetX:eval
 * @text Start Offset X
 * @parent Position:num
 * @desc Finite numeric JavaScript offset in pixels from the cached ScreenX/ScreenY coordinates of Position. Horizontal displacement is value * (mirrored ? 1 : -1), where mirrored means the mirror result chosen by HorzMirror for this entry. Thus +100 starts/ends 100 pixels right when mirrored and 100 pixels left otherwise; -100 reverses those directions. Zero adds no displacement. This does not use image width, percentages or logical position slots.
 * @default -200
 *
 * @arg StartOffsetY:eval
 * @text Start Offset Y
 * @parent Position:num
 * @desc Finite numeric JavaScript offset in pixels from the cached ScreenX/ScreenY coordinates of Position. Positive moves down and negative moves up regardless of horizontal mirroring; +100 means 100 pixels down, -100 means 100 pixels up, and zero adds no displacement.
 * @default +0
 *
 * @arg EasingType:str
 * @text Entrance Easing
 * @parent Position:num
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.
 * @default OutSine
 *
 * @arg HorzMirror:str
 * @text Horizontal Mirror
 * @type select
 * @option None
 * @option Mirror
 * @option Auto
 * @option Auto-Reverse
 * @desc Mirror always mirrors; None does not. Auto mirrors when the bust logical position is included in Settings.InvertedScale; Auto-Reverse mirrors when it is absent. Toggle, where offered, reverses the current horizontal scale. These choices do not change image files.
 * @default Auto
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust entrance.
 * @default 20
 *
 * @command Basic_ExitBusts
 * @text BASIC: Exit Bust(s)
 * @desc Generic exit for picture bust(s).
 * Walks back and fades out.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg EndOffsetX:eval
 * @text End Offset X
 * @parent PictureID:arrayeval
 * @desc Finite numeric JavaScript offset in pixels from the current displayed picture X/Y when this command runs, even during an unfinished movement. Horizontal displacement is value * (mirrored ? 1 : -1), where mirrored means whether the current horizontal picture scale is negative, before this command applies FlipDirection. Thus +100 starts/ends 100 pixels right when mirrored and 100 pixels left otherwise; -100 reverses those directions. Zero adds no displacement. This does not use image width, percentages or logical position slots.
 * @default -200
 *
 * @arg EndOffsetY:eval
 * @text End Offset Y
 * @parent PictureID:arrayeval
 * @desc Finite numeric JavaScript offset in pixels from the current displayed picture X/Y when this command runs, even during an unfinished movement. Positive moves down and negative moves up regardless of horizontal mirroring; +100 means 100 pixels down, -100 means 100 pixels up, and zero adds no displacement.
 * @default +0
 *
 * @arg EasingType:str
 * @text Exit Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.
 * @default InSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero. Exit offsets are computed from the scale sign before Flip; with AutoErase enabled the picture may then be erased.
 * @default None
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust exit.
 * @default 20
 *
 * @arg AutoErase:eval
 * @text Auto-Erase?
 * @parent Duration:eval
 * @type boolean
 * @desc When true, polls the selected picture base opacity immediately and up to 50 further times at 100 ms intervals, erasing once opacity is <=0. This is a finite retry window, nominally about 5 seconds; timer delays may be longer and a long/paused fade can outlast the retries, leaving a transparent picture slot unerased. False leaves the slot present. Replacing/erasing the picture or changing the game screen cancels stale work.
 * @default true
 * @on Auto-Erase
 * @off Don't Erase
 *
 * @command Basic_GraphicChange
 * @text BASIC: Graphic Change
 * @desc Changes ONE bust's graphic without changing any of its other
 * properties. Useful for quickly changing facial expressions.
 *
 * @arg PictureID:eval
 * @text Picture ID
 * @desc What is the Picture ID to associate with this bust?
 * You may use JavaScript code.
 * @default 1
 *
 * @arg PictureName:str
 * @text Picture File
 * @type file
 * @dir img/pictures/
 * @desc Picture image name relative to img/pictures, without .png; for example Bust loads img/pictures/Bust.png. Supply an existing image. >>>ATTENTION<<< is a native placeholder, not a supplied asset.
 * @default >>>ATTENTION<<<
 *
 * @command Basic_MirrorBust
 * @text BASIC: Mirror Bust(s)
 * @desc Change the facing direction the bust(s).
 * This alters the horizontal scaling of the bust(s).
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg HorzMirror:str
 * @text Horizontal Mirror
 * @type select
 * @option None
 * @option Mirror
 * @option Auto
 * @option Auto-Reverse
 * @option Toggle
 * @desc Mirror always mirrors; None does not. Auto mirrors when the bust logical position is included in Settings.InvertedScale; Auto-Reverse mirrors when it is absent. Toggle, where offered, reverses the current horizontal scale. These choices do not change image files.
 * @default Toggle
 *
 * @command Basic_OriginChange
 * @text BASIC: Origin Change Bust(s)
 * @desc Change the origin/anchor for bust(s).
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Origin:str
 * @text Origin
 * @parent PictureID:eval
 * @type select
 * @option Upper Left
 * @option Center
 * @option Bust
 * @desc Pick what kind of origin setting to use for this bust?
 * "Bust" value is based on Plugin Parameters.
 * @default Bust
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the origin change.
 * @default 20
 *
 * @command Basic_PlayAniBust
 * @text BASIC: Play Animation on Bust(s)
 * @desc Plays a specific battle animation on bust(s).
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg AnimationID:num
 * @text Battle Animation ID
 * @parent PictureID:arrayeval
 * @type animation
 * @desc Select which battle animation to play on bust.
 * @default 1
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent AnimationID:num
 * @type boolean
 * @desc Mirror the animation effect?
 * @default false
 * @on Mirror
 * @off Normal
 *
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @desc Wait until the animation is finished before continuing?
 * @default false
 * @on Wait
 * @off Don't Wait
 *
 * @command Separator_Breathing
 * @text -
 * @desc -
 *
 * @command Category_Breathing
 * @text Category - Breathing
 * @desc These are breathing related Picture Plugin Commands.
 *
 * @command Breathing_Enable
 * @text BREATHING: Start
 * @desc Start breathing aspect for selected bust(s).
 * Makes it look like the bust graphic is more alive.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Speed
 *
 * @arg SpeedX:eval
 * @text Speed X
 * @parent Speed
 * @desc Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis.
 * @default 20
 *
 * @arg SpeedY:eval
 * @text Speed Y
 * @parent Speed
 * @desc Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis.
 * @default 30
 *
 * @arg Rate
 *
 * @arg RateX:eval
 * @text Rate X
 * @parent Rate
 * @desc Additive amplitude in picture-scale percentage points. For a base scale 100 and rate 0.8, the displayed scale varies from 99.2 to 100.8; this is not a factor of 0.8 or an 80% amplitude. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied.
 * @default 0.10
 *
 * @arg RateY:eval
 * @text Rate Y
 * @parent Rate
 * @desc Additive amplitude in picture-scale percentage points. For a base scale 100 and rate 0.8, the displayed scale varies from 99.2 to 100.8; this is not a factor of 0.8 or an 80% amplitude. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied.
 * @default 0.80
 *
 * @command Breathing_Disable
 * @text BREATHING: Stop
 * @desc Stops breathing aspect for selected bust(s).
 * The bust graphic becomes static.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @command Separator_Fade
 * @text -
 * @desc -
 *
 * @command Category_Fade
 * @text Category - Fade
 * @desc These are fading related Picture Plugin Commands.
 *
 * @command Fade_FadeIn
 * @text FADE: Fade In Bust(s)
 * @desc Brings selected picture bust(s) opacity levels to 255.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fade in.
 * @default 20
 *
 * @command Fade_FadeOut
 * @text FADE: Fade Out Bust(s)
 * @desc Brings selected picture bust(s) opacity levels to 0.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fade out.
 * @default 20
 *
 * @arg AutoErase:eval
 * @text Auto-Erase?
 * @parent Duration:eval
 * @type boolean
 * @desc When true, polls the selected picture base opacity immediately and up to 50 further times at 100 ms intervals, erasing once opacity is <=0. This is a finite retry window, nominally about 5 seconds; timer delays may be longer and a long/paused fade can outlast the retries, leaving a transparent picture slot unerased. False leaves the slot present. Replacing/erasing the picture or changing the game screen cancels stale work.
 * @default false
 * @on Auto-Erase
 * @off Don't Erase
 *
 * @command Fade_OpacityBy
 * @text FADE: Opacity By X, Bust(s)
 * @desc Adjusts selected picture bust(s) opacity levels relatively.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg AdjustOpacity:eval
 * @text Adjust Opacity
 * @desc Adds the supplied amount to the existing target opacity, not the currently displayed opacity during an unfinished fade. The new target is rounded and clamped to 0..255 (0 transparent, 255 opaque). Negative lowers and positive raises the target. For example a pending target of 0 plus 40 becomes 40 even if the picture is still visibly at 200. Duration sets the new transition from the current displayed value.
 * @default +50
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fading.
 * @default 20
 *
 * @command Fade_OpacityTo
 * @text FADE: Opacity To X, Bust(s)
 * @desc Brings selected picture bust(s) opacity levels to a custom value.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg TargetOpacity:num
 * @text Target Opacity
 * @desc What opacity value do you wish to adjust the bust to?
 * Use a value between 0 and 255.
 * @type number
 * @min 0
 * @max 255
 * @default 128
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust fading.
 * @default 20
 *
 * @command Separator_Fidgeting
 * @text -
 * @desc -
 *
 * @command Category_Fidgeting
 * @text Category - Fidgeting
 * @desc These are fidgeting related Picture Plugin Commands.
 *
 * @command Fidgeting_Enable
 * @text FIDGETING: Start
 * @desc Starts fidgeting aspect for selected bust(s).
 * Bust graphic moves back and forth.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Speed
 *
 * @arg SpeedX:eval
 * @text Speed X
 * @parent Speed
 * @desc Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis.
 * @default 30
 *
 * @arg SpeedY:eval
 * @text Speed Y
 * @parent Speed
 * @desc Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis.
 * @default 30
 *
 * @arg Rate
 * @text Distance
 *
 * @arg RateX:eval
 * @text Distance X
 * @parent Rate
 * @desc Horizontal displacement amplitude in pixels added to picture X. Rate 5 oscillates from -5 to +5 pixels; negative rates invert the phase. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied.
 * @default 5.00
 *
 * @arg RateY:eval
 * @text Distance Y
 * @parent Rate
 * @desc Vertical displacement range in pixels, computed as cos(phase)*rate/2+rate/2 and added to picture Y. Rate 5 ranges from 0 to 5 pixels, not-5 to +5; negative rates move upward. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied.
 * @default 0.00
 *
 * @command Fidgeting_Disable
 * @text FIDGETING: Stop
 * @desc Stops fidgeting aspect for selected bust(s).
 * The bust graphic becomes stationary.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @command Separator_Move
 * @text -
 * @desc -
 *
 * @command Category_Move
 * @text Category - Movement
 * @desc These are movement-related Picture Bust Plugin Commands.
 *
 * @command Move_MoveByCoordinates
 * @text MOVE: Move Bust(s) By Coordinates
 * @desc Move busts by pixel offsets from their pending target while moving, or from current coordinates while stationary.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg MoveX:str
 * @text Move By X
 * @parent PictureID:arrayeval
 * @desc Pixel offset: while picture._duration>0 it adds to the pending target for that axis; otherwise it adds to the current coordinate. Thus consecutive commands can accumulate on an unfinished target. The string Unchanged skips that axis (case-insensitive after trimming). JavaScript source is evaluated per axis; use a finite numeric completion value. Duration starts a new transition and FlipDirection affects horizontal scale, not the offset sign. Negative moves left; positive right.
 * @default +100
 *
 * @arg MoveY:str
 * @text Move By Y
 * @parent PictureID:arrayeval
 * @desc Pixel offset: while picture._duration>0 it adds to the pending target for that axis; otherwise it adds to the current coordinate. Thus consecutive commands can accumulate on an unfinished target. The string Unchanged skips that axis (case-insensitive after trimming). JavaScript source is evaluated per axis; use a finite numeric completion value. Duration starts a new transition and FlipDirection affects horizontal scale, not the offset sign. Negative moves up; positive down.
 * @default Unchanged
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero.
 * @default None
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @command Move_MoveByPosition
 * @text MOVE: Move Bust(s) By Position
 * @desc Move bust(s) relative to current position(s).
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg MovePosition:eval
 * @text Move By Position
 * @parent PictureID:arrayeval
 * @desc Numeric JavaScript displacement in logical position slots, added to getVnBustPosition(); the final sum is clamped to 0..10, not the displacement itself. Use whole-number changes such as -1, 0 or +1 so the target has cached coordinates. There is no Unchanged sentinel for this eval field: use 0 to retain the logical position. A raw Unchanged identifier can fail during argument evaluation.
 * @default +1
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero.
 * @default None
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @command Move_MoveToCoordinates
 * @text MOVE: Move Bust(s) to Coordinates
 * @desc Move bust(s) to exact coordinates(s).
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg TargetX:str
 * @text Target X
 * @parent PictureID:arrayeval
 * @desc Absolute target position of the picture anchor in pixels, not a percentage or a logical bust slot. Normal screen coordinates start at the upper-left corner; Positive coordinates increase to the right. Provide finite numeric JavaScript such as 300. The string Unchanged skips this axis and preserves its existing target (case-insensitive after trimming). The other axis is evaluated separately. The coordinate move does not change the stored logical bust position; Duration controls the new transition.
 * @default Graphics.width / 2
 *
 * @arg TargetY:str
 * @text Target Y
 * @parent PictureID:arrayeval
 * @desc Absolute target position of the picture anchor in pixels, not a percentage or a logical bust slot. Normal screen coordinates start at the upper-left corner; Positive coordinates increase downward. Provide finite numeric JavaScript such as 300. The string Unchanged skips this axis and preserves its existing target (case-insensitive after trimming). The other axis is evaluated separately. The coordinate move does not change the stored logical bust position; Duration controls the new transition.
 * @default Unchanged
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero.
 * @default None
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @command Move_MoveToPosition
 * @text MOVE: Move Bust(s) to Position
 * @desc Move bust(s) to the predetermined position.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg TargetPosition:eval
 * @text Target Position
 * @parent PictureID:arrayeval
 * @desc Logical bust slot, not pixels: supply JavaScript that evaluates to an integer 0..10, such as 5. The result is clamped to 0..10 and maps to the cached ScreenX/ScreenY plugin-parameter coordinates; use whole numbers because fractional slots have no cached coordinates. This command updates the stored logical position and moves to its coordinates over Duration. There is no Unchanged sentinel for this field.
 * @default 5
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero.
 * @default None
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @command Move_ResetToPosition
 * @text MOVE: Reset Bust(s) to Position
 * @desc Reset bust(s) to the current position(s).
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg EasingType:str
 * @text Move Easing
 * @parent PictureID:arrayeval
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.
 * @default InOutSine
 *
 * @arg FlipDirection:str
 * @text Flip Direction
 * @parent PictureID:arrayeval
 * @type select
 * @option None
 * @option Flip
 * @desc None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero.
 * @default None
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust movement.
 * @default 20
 *
 * @command Separator_Scale
 * @text -
 * @desc -
 *
 * @command Category_Scale
 * @text Category - Scaling
 * @desc These are scaling-related Picture Bust Plugin Commands.
 *
 * @command Scale_ScaleBy
 * @text SCALE: Scale Bust(s) By
 * @desc Scale bust(s) by specific amounts.
 * Value scale: 100 = 100% = 1.0
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg ScaleX:eval
 * @text Scale X By
 * @parent PictureID:arrayeval
 * @desc Alter (additively) the X scaling value by this.
 * You may use JavaScript.
 * @default +20
 *
 * @arg ScaleY:eval
 * @text Scale Y By
 * @parent PictureID:arrayeval
 * @desc Alter (additively) the Y scaling value by this.
 * You may use JavaScript.
 * @default +20
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust scaling.
 * @default 20
 *
 * @command Scale_ScaleTo
 * @text SCALE: Scale Bust(s) To
 * @desc Scale bust(s) to specific values.
 * Value scale: 100 = 100% = 1.0
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg TargetScaleX:str
 * @text Target Scale X
 * @parent PictureID:arrayeval
 * @desc Set X scaling value to this.
 * You may use JavaScript. "Unchanged" for no changes.
 * @default 100
 *
 * @arg TargetScaleY:str
 * @text Target Scale Y
 * @parent PictureID:arrayeval
 * @desc Set Y scaling value to this.
 * You may use JavaScript. "Unchanged" for no changes.
 * @default 100
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust scaling.
 * @default 20
 *
 * @command Scale_ScaleReset
 * @text SCALE: Scale Reset Bust(s)
 * @desc Resets the scale for bust(s) to the default
 * settings in the Plugin Parameters.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the bust scaling.
 * @default 20
 *
 * @command Separator_Swaying
 * @text -
 * @desc -
 *
 * @command Category_Swaying
 * @text Category - Swaying
 * @desc These are swaying related Picture Plugin Commands.
 *
 * @command Swaying_Enable
 * @text SWAYING: Start
 * @desc Starts swaying aspect for selected bust(s).
 * The bust sways its angle back and forth.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Speed
 *
 * @arg SpeedAngle:eval
 * @text Angle Speed
 * @parent Speed
 * @desc Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis.
 * @default 30
 *
 * @arg Rate
 * @text Angle
 *
 * @arg RateAngle:eval
 * @text Angle Sway
 * @parent Rate
 * @desc Angular amplitude in degrees, added to the base picture angle; rate 2 oscillates from -2 to +2 degrees around it. Negative rates invert the phase. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied.
 * @default 2
 *
 * @command Swaying_Disable
 * @text SWAYING: Stop
 * @desc Stops swaying aspect for selected bust(s).
 * The no longer sways back and forth.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @command Separator_Tone
 * @text -
 * @desc -
 *
 * @command Category_Tone
 * @text Category - Tone
 * @desc These are tone-related Picture Bust Plugin Commands.
 *
 * @command Tone_BrightBust
 * @text TONE: Bright Bust(s)
 * @desc Brighten bust(s) to use the Tone settings
 * found in the Plugin Parameters.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @command Tone_DimBust
 * @text TONE: Dim Bust(s)
 * @desc Dims bust(s) to use the Tone settings
 * found in the Plugin Parameters.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @command Tone_NormalBust
 * @text TONE: Normal Bust(s)
 * @desc Normalize bust(s) to no tone at all.
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @command Tone_PresetBust
 * @text TONE: Preset Tone for Bust(s)
 * @desc Use RPG Maker MZ's present tones/tints for bust(s).
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Preset:str
 * @text Preset Name
 * @parent PictureID:arrayeval
 * @type select
 * @option Normal
 * @option Dark
 * @option Sepia
 * @option Sunset
 * @option Night
 * @desc What tone preset do you wish to apply?
 * @default Sepia
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @command Tone_CustomToneBust
 * @text TONE: Target Tone for Bust(s)
 * @desc Use a custom target tone for the bust(s).
 *
 * @arg PictureID:arrayeval
 * @text Picture ID(s)
 * @type string[]
 * @desc What Picture ID(s) to associate with this command?
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg customTone:eval
 * @text Custom Tone
 * @parent PictureID:arrayeval
 * @desc Four finite numeric components [red, green, blue, gray]. Use RGB offsets -255..255: negative subtracts color, positive adds color, zero is neutral. Use gray 0..255: zero preserves saturation and 255 is grayscale. Example [34,34,34,0]. Supply a JavaScript source string to eval-encoded fields; this is not a hex color or RGBA alpha.
 * @default [0, 0, 0, 0]
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for the tone change.
 * @default 20
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 */

(() => {
"use strict";
const catalog = {
  "schemaVersion": 1,
  "pluginId": "Coreto_2_VNPictureBusts",
  "version": "0.1.0",
  "reference": {
    "pluginId": "VisuMZ_2_VNPictureBusts",
    "version": "1.03"
  },
  "dependencies": {
    "required": [
      "Core Engine original or Coreto"
    ],
    "optional": [
      "Message Core",
      "Battle Core"
    ]
  },
  "configuration": {
    "key": "CoretoConfigSource",
    "default": "inherit",
    "modes": [
      "inherit",
      "own"
    ]
  },
  "parameters": [
    {
      "id": "CORETO-CONFIG-SOURCE",
      "key": "CoretoConfigSource",
      "storageKey": "CoretoConfigSource",
      "label": "Configuration source",
      "description": "inherit reads the original entry when present; own reads this entry. Switching does not copy values.",
      "type": "string",
      "editorType": "select",
      "options": [
        "inherit",
        "own"
      ],
      "default": "inherit",
      "nativeDefault": "inherit",
      "availability": "supported"
    },
    {
      "id": "VN-P01",
      "key": "AnchorX",
      "storageKey": "AnchorX:num",
      "surface": "parameter",
      "label": "Anchor X",
      "description": "Determines the anchor/origin X setting for Picture Busts.\n0.0 is left, 0.5 is center, 1.0 is right.",
      "encoding": "num",
      "nativeDefault": "0.5",
      "metadata": {
        "text": [
          "Anchor X"
        ],
        "parent": [
          "Anchor"
        ],
        "desc": [
          "Determines the anchor/origin X setting for Picture Busts.\n0.0 is left, 0.5 is center, 1.0 is right."
        ],
        "default": [
          "0.5"
        ]
      },
      "context": "plugin configuration",
      "availability": "implemented",
      "examples": [
        "0.5"
      ]
    },
    {
      "id": "VN-P02",
      "key": "AnchorY",
      "storageKey": "AnchorY:num",
      "surface": "parameter",
      "label": "Anchor Y",
      "description": "Determines the anchor/origin Y setting for Picture Busts.\n0.0 is top, 0.5 is middle, 1.0 is bottom.",
      "encoding": "num",
      "nativeDefault": "1.0",
      "metadata": {
        "text": [
          "Anchor Y"
        ],
        "parent": [
          "Anchor"
        ],
        "desc": [
          "Determines the anchor/origin Y setting for Picture Busts.\n0.0 is top, 0.5 is middle, 1.0 is bottom."
        ],
        "default": [
          "1.0"
        ]
      },
      "context": "plugin configuration",
      "availability": "implemented",
      "examples": [
        "1.0"
      ]
    },
    {
      "id": "VN-P03",
      "key": "ScaleX",
      "storageKey": "ScaleX:num",
      "surface": "parameter",
      "label": "Scale X",
      "description": "Scale X adjustment settings for Picture Busts.\nValue scale: 100 = 100% = 1.0",
      "encoding": "num",
      "nativeDefault": "100",
      "metadata": {
        "text": [
          "Scale X"
        ],
        "parent": [
          "Scale"
        ],
        "desc": [
          "Scale X adjustment settings for Picture Busts.\nValue scale: 100 = 100% = 1.0"
        ],
        "default": [
          "100"
        ]
      },
      "context": "plugin configuration",
      "availability": "implemented",
      "examples": [
        "100"
      ]
    },
    {
      "id": "VN-P04",
      "key": "ScaleY",
      "storageKey": "ScaleY:num",
      "surface": "parameter",
      "label": "Scale Y",
      "description": "Scale Y adjustment settings for Picture Busts.\nValue scale: 100 = 100% = 1.0",
      "encoding": "num",
      "nativeDefault": "100",
      "metadata": {
        "text": [
          "Scale Y"
        ],
        "parent": [
          "Scale"
        ],
        "desc": [
          "Scale Y adjustment settings for Picture Busts.\nValue scale: 100 = 100% = 1.0"
        ],
        "default": [
          "100"
        ]
      },
      "context": "plugin configuration",
      "availability": "implemented",
      "examples": [
        "100"
      ]
    },
    {
      "id": "VN-P05",
      "key": "InvertedScale",
      "storageKey": "InvertedScale:arraynum",
      "surface": "parameter",
      "label": "Mirror Horizontally",
      "description": "Which positions will be mirrored horizontally?\nYou want your Busts facing the center of the screen.",
      "encoding": "arraynum",
      "nativeDefault": "[\"0\",\"1\",\"2\",\"3\",\"4\"]",
      "metadata": {
        "text": [
          "Mirror Horizontally"
        ],
        "parent": [
          "Scale"
        ],
        "type": [
          "number[]"
        ],
        "max": [
          "10"
        ],
        "desc": [
          "Which positions will be mirrored horizontally?\nYou want your Busts facing the center of the screen."
        ],
        "default": [
          "[\"0\",\"1\",\"2\",\"3\",\"4\"]"
        ]
      },
      "context": "JSON array of integer logical positions 0..10 used by Auto mirroring. With the default ScreenX function and a viewport wider than 400 pixels, position 0 is X=200, position 5 is screen center, position 10 is X=Graphics.width-200. ScreenY defaults to Graphics.height+5. Custom ScreenX/ScreenY functions can redefine those coordinates. Auto mirrors positions included in this array; Auto-Reverse mirrors positions not included. Example [0,1,2,3,4] mirrors the default left-side slots.",
      "availability": "implemented",
      "examples": [
        "vn parameters set --path /InvertedScale --value '[0,1,2,3,4]' --json"
      ]
    },
    {
      "id": "VN-P06",
      "key": "ScreenX",
      "storageKey": "ScreenX:func",
      "surface": "parameter",
      "label": "JS: Position X",
      "description": "Code to determine used to calculate the X coordinate\nfor each screen position.",
      "encoding": "func",
      "nativeDefault": "\"// Declare Arguments\\nconst position = arguments[0].clamp(0, 10);\\n\\n// Declare Variables\\nconst bufferX = 200;\\nconst width = Graphics.width - (bufferX * 2);\\n\\n// Calculate X Position\\nx = Math.round(position * width / 10) + bufferX;\\nx = x.clamp(bufferX, Graphics.width - bufferX);\\n\\n// Return X Value\\nreturn x;\"",
      "metadata": {
        "text": [
          "JS: Position X"
        ],
        "parent": [
          "Screen"
        ],
        "type": [
          "note"
        ],
        "desc": [
          "Code to determine used to calculate the X coordinate\nfor each screen position."
        ],
        "default": [
          "\"// Declare Arguments\\nconst position = arguments[0].clamp(0, 10);\\n\\n// Declare Variables\\nconst bufferX = 200;\\nconst width = Graphics.width - (bufferX * 2);\\n\\n// Calculate X Position\\nx = Math.round(position * width / 10) + bufferX;\\nx = x.clamp(bufferX, Graphics.width - bufferX);\\n\\n// Return X Value\\nreturn x;\""
        ]
      },
      "context": "JavaScript function body called as Coreto.VNPictureBusts.Settings.ScreenX(position), with this=Settings and arguments[0]=an integer 0..10. Return a finite pixel coordinate; browser/MZ globals such as Graphics are available, but no local x/y variable is supplied. Declare your own local variables. Enter the raw function body in the MZ note editor; for the CLI, provide one JSON string containing that body, without manually double-encoding the native note. All11 coordinates are evaluated, rounded and cached together on first lookup. Changing Settings later does not invalidate that cache; restart the game after parameter edits.",
      "availability": "implemented",
      "examples": [
        "vn parameters set --path /ScreenX --value '\"const position = arguments[0]; return 200 + position * (Graphics.width - 400) / 10;\"' --json"
      ]
    },
    {
      "id": "VN-P07",
      "key": "ScreenY",
      "storageKey": "ScreenY:func",
      "surface": "parameter",
      "label": "JS: Position Y",
      "description": "Code to determine used to calculate the Y coordinate\nfor each screen position.",
      "encoding": "func",
      "nativeDefault": "\"// Declare Arguments\\nconst position = arguments[0].clamp(0, 10);\\n\\n// Declare Variables\\nconst stagger = 0;\\nconst difference = 5 - Math.abs(5 - position);\\nlet y = Graphics.height;\\n\\n// Calculate Y Position\\ny = Graphics.height + Math.round(difference * stagger) + 5;\\n\\n// Return Y Value\\nreturn y;\"",
      "metadata": {
        "text": [
          "JS: Position Y"
        ],
        "parent": [
          "Screen"
        ],
        "type": [
          "note"
        ],
        "desc": [
          "Code to determine used to calculate the Y coordinate\nfor each screen position."
        ],
        "default": [
          "\"// Declare Arguments\\nconst position = arguments[0].clamp(0, 10);\\n\\n// Declare Variables\\nconst stagger = 0;\\nconst difference = 5 - Math.abs(5 - position);\\nlet y = Graphics.height;\\n\\n// Calculate Y Position\\ny = Graphics.height + Math.round(difference * stagger) + 5;\\n\\n// Return Y Value\\nreturn y;\""
        ]
      },
      "context": "JavaScript function body called as Coreto.VNPictureBusts.Settings.ScreenY(position), with this=Settings and arguments[0]=an integer 0..10. Return a finite pixel coordinate; browser/MZ globals such as Graphics are available, but no local x/y variable is supplied. Declare your own local variables. Enter the raw function body in the MZ note editor; for the CLI, provide one JSON string containing that body, without manually double-encoding the native note. All11 coordinates are evaluated, rounded and cached together on first lookup. Changing Settings later does not invalidate that cache; restart the game after parameter edits.",
      "availability": "implemented",
      "examples": [
        "vn parameters set --path /ScreenY --value '\"return Graphics.height + 5;\"' --json"
      ]
    },
    {
      "id": "VN-P08",
      "key": "brightTone",
      "storageKey": "brightTone:eval",
      "surface": "parameter",
      "label": "Bright Tone",
      "description": "What tone do you want for brightness?\nFormat: [Red, Green, Blue, Gray]",
      "encoding": "eval",
      "nativeDefault": "[34, 34, 34, 0]",
      "metadata": {
        "text": [
          "Bright Tone"
        ],
        "parent": [
          "Tone"
        ],
        "desc": [
          "What tone do you want for brightness?\nFormat: [Red, Green, Blue, Gray]"
        ],
        "default": [
          "[34, 34, 34, 0]"
        ]
      },
      "context": "Four finite numeric components [red, green, blue, gray]. Use RGB offsets -255..255: negative subtracts color, positive adds color, zero is neutral. Use gray 0..255: zero preserves saturation and 255 is grayscale. Example [34,34,34,0]. Supply a JavaScript source string to eval-encoded fields; this is not a hex color or RGBA alpha. This configured array is used by Tone_BrightBust or Tone_DimBust respectively; changing it does not automatically tint existing pictures.",
      "availability": "implemented",
      "examples": [
        "vn parameters set --path /brightTone --value '\"[34, 34, 34, 0]\"' --json"
      ]
    },
    {
      "id": "VN-P09",
      "key": "dimTone",
      "storageKey": "dimTone:eval",
      "surface": "parameter",
      "label": "Dim Tone",
      "description": "What tone do you want for dimming?\nFormat: [Red, Green, Blue, Gray]",
      "encoding": "eval",
      "nativeDefault": "[-34, -34, 0, 34]",
      "metadata": {
        "text": [
          "Dim Tone"
        ],
        "parent": [
          "Tone"
        ],
        "desc": [
          "What tone do you want for dimming?\nFormat: [Red, Green, Blue, Gray]"
        ],
        "default": [
          "[-34, -34, 0, 34]"
        ]
      },
      "context": "Four finite numeric components [red, green, blue, gray]. Use RGB offsets -255..255: negative subtracts color, positive adds color, zero is neutral. Use gray 0..255: zero preserves saturation and 255 is grayscale. Example [34,34,34,0]. Supply a JavaScript source string to eval-encoded fields; this is not a hex color or RGBA alpha. This configured array is used by Tone_BrightBust or Tone_DimBust respectively; changing it does not automatically tint existing pictures.",
      "availability": "implemented",
      "examples": [
        "vn parameters set --path /dimTone --value '\"[-34, -34, 0, 34]\"' --json"
      ]
    }
  ],
  "commands": [
    {
      "id": "VN-C01",
      "key": "Basic_EnterBust",
      "storageKey": "Basic_EnterBust",
      "surface": "command",
      "label": "BASIC: Enter Bust",
      "description": "Generic entrance for ONE picture bust.\nWalks in from a little behind and fades in.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "BASIC: Enter Bust"
        ],
        "desc": [
          "Generic entrance for ONE picture bust.\nWalks in from a little behind and fades in."
        ]
      },
      "context": "map/common-event/troop interpreter Picture image name relative to img/pictures, without .png; for example Bust loads img/pictures/Bust.png. Supply an existing image. >>>ATTENTION<<< is a native placeholder, not a supplied asset. The example assumes img/pictures/Bust.png exists; replace Bust with your own image name. Mirror always mirrors; None does not. Auto mirrors when the bust logical position is included in Settings.InvertedScale; Auto-Reverse mirrors when it is absent. Toggle, where offered, reverses the current horizontal scale. These choices do not change image files. Bust origin uses the configured AnchorX/AnchorY. Position must be an integer 0..10 selecting the cached ScreenX/ScreenY coordinates.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Basic_EnterBust",
            "BASIC: Enter Bust",
            {
              "PictureID:eval": "1",
              "PictureName:str": "Bust",
              "Origin:str": "Bust",
              "Position:num": "0",
              "StartOffsetX:eval": "-200",
              "StartOffsetY:eval": "+0",
              "EasingType:str": "OutSine",
              "HorzMirror:str": "Auto",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C01/PictureID:eval",
          "key": "PictureID",
          "storageKey": "PictureID:eval",
          "surface": "argument",
          "label": "Picture ID",
          "description": "What is the Picture ID to associate with this bust?\nYou may use JavaScript code.",
          "encoding": "eval",
          "nativeDefault": "1",
          "metadata": {
            "text": [
              "Picture ID"
            ],
            "desc": [
              "What is the Picture ID to associate with this bust?\nYou may use JavaScript code."
            ],
            "default": [
              "1"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "1"
          ]
        },
        {
          "id": "VN-C01/PictureName:str",
          "key": "PictureName",
          "storageKey": "PictureName:str",
          "surface": "argument",
          "label": "Picture File",
          "description": "Picture image name relative to img/pictures, without .png; for example Bust loads img/pictures/Bust.png. Supply an existing image. >>>ATTENTION<<< is a native placeholder, not a supplied asset.",
          "encoding": "str",
          "nativeDefault": ">>>ATTENTION<<<",
          "metadata": {
            "text": [
              "Picture File"
            ],
            "parent": [
              "PictureID:eval"
            ],
            "type": [
              "file"
            ],
            "dir": [
              "img/pictures/"
            ],
            "desc": [
              "Picture image name relative to img/pictures, without .png; for example Bust loads img/pictures/Bust.png. Supply an existing image. >>>ATTENTION<<< is a native placeholder, not a supplied asset."
            ],
            "default": [
              ">>>ATTENTION<<<"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            ">>>ATTENTION<<<"
          ]
        },
        {
          "id": "VN-C01/Origin:str",
          "key": "Origin",
          "storageKey": "Origin:str",
          "surface": "argument",
          "label": "Origin",
          "description": "Upper Left anchors at(0,0); Center at(0.5,0.5). Bust uses Settings.AnchorX and Settings.AnchorY, default(0.5,1), the bottom-center of the graphic. Anchor fractions refer to the image dimensions.",
          "encoding": "str",
          "nativeDefault": "Bust",
          "metadata": {
            "text": [
              "Origin"
            ],
            "parent": [
              "PictureID:eval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "Upper Left",
              "Center",
              "Bust"
            ],
            "desc": [
              "Upper Left anchors at(0,0); Center at(0.5,0.5). Bust uses Settings.AnchorX and Settings.AnchorY, default(0.5,1), the bottom-center of the graphic. Anchor fractions refer to the image dimensions."
            ],
            "default": [
              "Bust"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "Bust"
          ]
        },
        {
          "id": "VN-C01/Position:num",
          "key": "Position",
          "storageKey": "Position:num",
          "surface": "argument",
          "label": "Screen Position",
          "description": "Insert a screen position value from 0 to 10.\nCoordinates are determined by Plugin Parameters.",
          "encoding": "num",
          "nativeDefault": "0",
          "metadata": {
            "text": [
              "Screen Position"
            ],
            "type": [
              "number"
            ],
            "max": [
              "10"
            ],
            "desc": [
              "Insert a screen position value from 0 to 10.\nCoordinates are determined by Plugin Parameters."
            ],
            "default": [
              "0"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "0"
          ]
        },
        {
          "id": "VN-C01/StartOffsetX:eval",
          "key": "StartOffsetX",
          "storageKey": "StartOffsetX:eval",
          "surface": "argument",
          "label": "Start Offset X",
          "description": "Finite numeric JavaScript offset in pixels from the cached ScreenX/ScreenY coordinates of Position. Horizontal displacement is value * (mirrored ? 1 : -1), where mirrored means the mirror result chosen by HorzMirror for this entry. Thus +100 starts/ends 100 pixels right when mirrored and 100 pixels left otherwise; -100 reverses those directions. Zero adds no displacement. This does not use image width, percentages or logical position slots.",
          "encoding": "eval",
          "nativeDefault": "-200",
          "metadata": {
            "text": [
              "Start Offset X"
            ],
            "parent": [
              "Position:num"
            ],
            "desc": [
              "Finite numeric JavaScript offset in pixels from the cached ScreenX/ScreenY coordinates of Position. Horizontal displacement is value * (mirrored ? 1 : -1), where mirrored means the mirror result chosen by HorzMirror for this entry. Thus +100 starts/ends 100 pixels right when mirrored and 100 pixels left otherwise; -100 reverses those directions. Zero adds no displacement. This does not use image width, percentages or logical position slots."
            ],
            "default": [
              "-200"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "-200"
          ]
        },
        {
          "id": "VN-C01/StartOffsetY:eval",
          "key": "StartOffsetY",
          "storageKey": "StartOffsetY:eval",
          "surface": "argument",
          "label": "Start Offset Y",
          "description": "Finite numeric JavaScript offset in pixels from the cached ScreenX/ScreenY coordinates of Position. Positive moves down and negative moves up regardless of horizontal mirroring; +100 means 100 pixels down, -100 means 100 pixels up, and zero adds no displacement.",
          "encoding": "eval",
          "nativeDefault": "+0",
          "metadata": {
            "text": [
              "Start Offset Y"
            ],
            "parent": [
              "Position:num"
            ],
            "desc": [
              "Finite numeric JavaScript offset in pixels from the cached ScreenX/ScreenY coordinates of Position. Positive moves down and negative moves up regardless of horizontal mirroring; +100 means 100 pixels down, -100 means 100 pixels up, and zero adds no displacement."
            ],
            "default": [
              "+0"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "+0"
          ]
        },
        {
          "id": "VN-C01/EasingType:str",
          "key": "EasingType",
          "storageKey": "EasingType:str",
          "surface": "argument",
          "label": "Entrance Easing",
          "description": "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.",
          "encoding": "str",
          "nativeDefault": "OutSine",
          "metadata": {
            "text": [
              "Entrance Easing"
            ],
            "parent": [
              "Position:num"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "OutSine"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "OutSine"
          ]
        },
        {
          "id": "VN-C01/HorzMirror:str",
          "key": "HorzMirror",
          "storageKey": "HorzMirror:str",
          "surface": "argument",
          "label": "Horizontal Mirror",
          "description": "Mirror always mirrors; None does not. Auto mirrors when the bust logical position is included in Settings.InvertedScale; Auto-Reverse mirrors when it is absent. Toggle, where offered, reverses the current horizontal scale. These choices do not change image files.",
          "encoding": "str",
          "nativeDefault": "Auto",
          "metadata": {
            "text": [
              "Horizontal Mirror"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Mirror",
              "Auto",
              "Auto-Reverse"
            ],
            "desc": [
              "Mirror always mirrors; None does not. Auto mirrors when the bust logical position is included in Settings.InvertedScale; Auto-Reverse mirrors when it is absent. Toggle, where offered, reverses the current horizontal scale. These choices do not change image files."
            ],
            "default": [
              "Auto"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "Auto"
          ]
        },
        {
          "id": "VN-C01/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust entrance.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust entrance."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:eval",
          "metadata": {
            "text": [
              "Picture ID"
            ],
            "desc": [
              "What is the Picture ID to associate with this bust?\nYou may use JavaScript code."
            ],
            "default": [
              "1"
            ]
          }
        },
        {
          "key": "PictureName:str",
          "metadata": {
            "text": [
              "Picture File"
            ],
            "parent": [
              "PictureID:eval"
            ],
            "type": [
              "file"
            ],
            "dir": [
              "img/pictures/"
            ],
            "desc": [
              "Picture image name relative to img/pictures, without .png; for example Bust loads img/pictures/Bust.png. Supply an existing image. >>>ATTENTION<<< is a native placeholder, not a supplied asset."
            ],
            "default": [
              ">>>ATTENTION<<<"
            ]
          }
        },
        {
          "key": "Origin:str",
          "metadata": {
            "text": [
              "Origin"
            ],
            "parent": [
              "PictureID:eval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "Upper Left",
              "Center",
              "Bust"
            ],
            "desc": [
              "Upper Left anchors at(0,0); Center at(0.5,0.5). Bust uses Settings.AnchorX and Settings.AnchorY, default(0.5,1), the bottom-center of the graphic. Anchor fractions refer to the image dimensions."
            ],
            "default": [
              "Bust"
            ]
          }
        },
        {
          "key": "Position:num",
          "metadata": {
            "text": [
              "Screen Position"
            ],
            "type": [
              "number"
            ],
            "max": [
              "10"
            ],
            "desc": [
              "Insert a screen position value from 0 to 10.\nCoordinates are determined by Plugin Parameters."
            ],
            "default": [
              "0"
            ]
          }
        },
        {
          "key": "StartOffsetX:eval",
          "metadata": {
            "text": [
              "Start Offset X"
            ],
            "parent": [
              "Position:num"
            ],
            "desc": [
              "Finite numeric JavaScript offset in pixels from the cached ScreenX/ScreenY coordinates of Position. Horizontal displacement is value * (mirrored ? 1 : -1), where mirrored means the mirror result chosen by HorzMirror for this entry. Thus +100 starts/ends 100 pixels right when mirrored and 100 pixels left otherwise; -100 reverses those directions. Zero adds no displacement. This does not use image width, percentages or logical position slots."
            ],
            "default": [
              "-200"
            ]
          }
        },
        {
          "key": "StartOffsetY:eval",
          "metadata": {
            "text": [
              "Start Offset Y"
            ],
            "parent": [
              "Position:num"
            ],
            "desc": [
              "Finite numeric JavaScript offset in pixels from the cached ScreenX/ScreenY coordinates of Position. Positive moves down and negative moves up regardless of horizontal mirroring; +100 means 100 pixels down, -100 means 100 pixels up, and zero adds no displacement."
            ],
            "default": [
              "+0"
            ]
          }
        },
        {
          "key": "EasingType:str",
          "metadata": {
            "text": [
              "Entrance Easing"
            ],
            "parent": [
              "Position:num"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "OutSine"
            ]
          }
        },
        {
          "key": "HorzMirror:str",
          "metadata": {
            "text": [
              "Horizontal Mirror"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Mirror",
              "Auto",
              "Auto-Reverse"
            ],
            "desc": [
              "Mirror always mirrors; None does not. Auto mirrors when the bust logical position is included in Settings.InvertedScale; Auto-Reverse mirrors when it is absent. Toggle, where offered, reverses the current horizontal scale. These choices do not change image files."
            ],
            "default": [
              "Auto"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust entrance."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C02",
      "key": "Basic_ExitBusts",
      "storageKey": "Basic_ExitBusts",
      "surface": "command",
      "label": "BASIC: Exit Bust(s)",
      "description": "Generic exit for picture bust(s).\nWalks back and fades out.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "BASIC: Exit Bust(s)"
        ],
        "desc": [
          "Generic exit for picture bust(s).\nWalks back and fades out."
        ]
      },
      "context": "map/common-event/troop interpreter AutoErase: When true, polls the selected picture base opacity immediately and up to 50 further times at 100 ms intervals, erasing once opacity is <=0. This is a finite retry window, nominally about 5 seconds; timer delays may be longer and a long/paused fade can outlast the retries, leaving a transparent picture slot unerased. False leaves the slot present. Replacing/erasing the picture or changing the game screen cancels stale work.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Basic_ExitBusts",
            "BASIC: Exit Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "EndOffsetX:eval": "-200",
              "EndOffsetY:eval": "+0",
              "EasingType:str": "InSine",
              "FlipDirection:str": "None",
              "Duration:eval": "20",
              "AutoErase:eval": "true"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C02/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C02/EndOffsetX:eval",
          "key": "EndOffsetX",
          "storageKey": "EndOffsetX:eval",
          "surface": "argument",
          "label": "End Offset X",
          "description": "Finite numeric JavaScript offset in pixels from the current displayed picture X/Y when this command runs, even during an unfinished movement. Horizontal displacement is value * (mirrored ? 1 : -1), where mirrored means whether the current horizontal picture scale is negative, before this command applies FlipDirection. Thus +100 starts/ends 100 pixels right when mirrored and 100 pixels left otherwise; -100 reverses those directions. Zero adds no displacement. This does not use image width, percentages or logical position slots.",
          "encoding": "eval",
          "nativeDefault": "-200",
          "metadata": {
            "text": [
              "End Offset X"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Finite numeric JavaScript offset in pixels from the current displayed picture X/Y when this command runs, even during an unfinished movement. Horizontal displacement is value * (mirrored ? 1 : -1), where mirrored means whether the current horizontal picture scale is negative, before this command applies FlipDirection. Thus +100 starts/ends 100 pixels right when mirrored and 100 pixels left otherwise; -100 reverses those directions. Zero adds no displacement. This does not use image width, percentages or logical position slots."
            ],
            "default": [
              "-200"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "-200"
          ]
        },
        {
          "id": "VN-C02/EndOffsetY:eval",
          "key": "EndOffsetY",
          "storageKey": "EndOffsetY:eval",
          "surface": "argument",
          "label": "End Offset Y",
          "description": "Finite numeric JavaScript offset in pixels from the current displayed picture X/Y when this command runs, even during an unfinished movement. Positive moves down and negative moves up regardless of horizontal mirroring; +100 means 100 pixels down, -100 means 100 pixels up, and zero adds no displacement.",
          "encoding": "eval",
          "nativeDefault": "+0",
          "metadata": {
            "text": [
              "End Offset Y"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Finite numeric JavaScript offset in pixels from the current displayed picture X/Y when this command runs, even during an unfinished movement. Positive moves down and negative moves up regardless of horizontal mirroring; +100 means 100 pixels down, -100 means 100 pixels up, and zero adds no displacement."
            ],
            "default": [
              "+0"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "+0"
          ]
        },
        {
          "id": "VN-C02/EasingType:str",
          "key": "EasingType",
          "storageKey": "EasingType:str",
          "surface": "argument",
          "label": "Exit Easing",
          "description": "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.",
          "encoding": "str",
          "nativeDefault": "InSine",
          "metadata": {
            "text": [
              "Exit Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InSine"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "InSine"
          ]
        },
        {
          "id": "VN-C02/FlipDirection:str",
          "key": "FlipDirection",
          "storageKey": "FlipDirection:str",
          "surface": "argument",
          "label": "Flip Direction",
          "description": "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero. Exit offsets are computed from the scale sign before Flip; with AutoErase enabled the picture may then be erased.",
          "encoding": "str",
          "nativeDefault": "None",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero. Exit offsets are computed from the scale sign before Flip; with AutoErase enabled the picture may then be erased."
            ],
            "default": [
              "None"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "None"
          ]
        },
        {
          "id": "VN-C02/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust exit.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust exit."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        },
        {
          "id": "VN-C02/AutoErase:eval",
          "key": "AutoErase",
          "storageKey": "AutoErase:eval",
          "surface": "argument",
          "label": "Auto-Erase?",
          "description": "When true, polls the selected picture base opacity immediately and up to 50 further times at 100 ms intervals, erasing once opacity is <=0. This is a finite retry window, nominally about 5 seconds; timer delays may be longer and a long/paused fade can outlast the retries, leaving a transparent picture slot unerased. False leaves the slot present. Replacing/erasing the picture or changing the game screen cancels stale work.",
          "encoding": "eval",
          "nativeDefault": "true",
          "metadata": {
            "text": [
              "Auto-Erase?"
            ],
            "parent": [
              "Duration:eval"
            ],
            "type": [
              "boolean"
            ],
            "desc": [
              "When true, polls the selected picture base opacity immediately and up to 50 further times at 100 ms intervals, erasing once opacity is <=0. This is a finite retry window, nominally about 5 seconds; timer delays may be longer and a long/paused fade can outlast the retries, leaving a transparent picture slot unerased. False leaves the slot present. Replacing/erasing the picture or changing the game screen cancels stale work."
            ],
            "default": [
              "true"
            ],
            "on": [
              "Auto-Erase"
            ],
            "off": [
              "Don't Erase"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "true"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "EndOffsetX:eval",
          "metadata": {
            "text": [
              "End Offset X"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Finite numeric JavaScript offset in pixels from the current displayed picture X/Y when this command runs, even during an unfinished movement. Horizontal displacement is value * (mirrored ? 1 : -1), where mirrored means whether the current horizontal picture scale is negative, before this command applies FlipDirection. Thus +100 starts/ends 100 pixels right when mirrored and 100 pixels left otherwise; -100 reverses those directions. Zero adds no displacement. This does not use image width, percentages or logical position slots."
            ],
            "default": [
              "-200"
            ]
          }
        },
        {
          "key": "EndOffsetY:eval",
          "metadata": {
            "text": [
              "End Offset Y"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Finite numeric JavaScript offset in pixels from the current displayed picture X/Y when this command runs, even during an unfinished movement. Positive moves down and negative moves up regardless of horizontal mirroring; +100 means 100 pixels down, -100 means 100 pixels up, and zero adds no displacement."
            ],
            "default": [
              "+0"
            ]
          }
        },
        {
          "key": "EasingType:str",
          "metadata": {
            "text": [
              "Exit Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InSine"
            ]
          }
        },
        {
          "key": "FlipDirection:str",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero. Exit offsets are computed from the scale sign before Flip; with AutoErase enabled the picture may then be erased."
            ],
            "default": [
              "None"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust exit."
            ],
            "default": [
              "20"
            ]
          }
        },
        {
          "key": "AutoErase:eval",
          "metadata": {
            "text": [
              "Auto-Erase?"
            ],
            "parent": [
              "Duration:eval"
            ],
            "type": [
              "boolean"
            ],
            "desc": [
              "When true, polls the selected picture base opacity immediately and up to 50 further times at 100 ms intervals, erasing once opacity is <=0. This is a finite retry window, nominally about 5 seconds; timer delays may be longer and a long/paused fade can outlast the retries, leaving a transparent picture slot unerased. False leaves the slot present. Replacing/erasing the picture or changing the game screen cancels stale work."
            ],
            "default": [
              "true"
            ],
            "on": [
              "Auto-Erase"
            ],
            "off": [
              "Don't Erase"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C03",
      "key": "Basic_GraphicChange",
      "storageKey": "Basic_GraphicChange",
      "surface": "command",
      "label": "BASIC: Graphic Change",
      "description": "Changes ONE bust's graphic without changing any of its other\nproperties. Useful for quickly changing facial expressions.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "BASIC: Graphic Change"
        ],
        "desc": [
          "Changes ONE bust's graphic without changing any of its other\nproperties. Useful for quickly changing facial expressions."
        ]
      },
      "context": "map/common-event/troop interpreter Picture image name relative to img/pictures, without .png; for example Bust loads img/pictures/Bust.png. Supply an existing image. >>>ATTENTION<<< is a native placeholder, not a supplied asset. The example assumes img/pictures/Bust.png exists; replace Bust with your own image name.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Basic_GraphicChange",
            "BASIC: Graphic Change",
            {
              "PictureID:eval": "1",
              "PictureName:str": "Bust"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C03/PictureID:eval",
          "key": "PictureID",
          "storageKey": "PictureID:eval",
          "surface": "argument",
          "label": "Picture ID",
          "description": "What is the Picture ID to associate with this bust?\nYou may use JavaScript code.",
          "encoding": "eval",
          "nativeDefault": "1",
          "metadata": {
            "text": [
              "Picture ID"
            ],
            "desc": [
              "What is the Picture ID to associate with this bust?\nYou may use JavaScript code."
            ],
            "default": [
              "1"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "1"
          ]
        },
        {
          "id": "VN-C03/PictureName:str",
          "key": "PictureName",
          "storageKey": "PictureName:str",
          "surface": "argument",
          "label": "Picture File",
          "description": "Picture image name relative to img/pictures, without .png; for example Bust loads img/pictures/Bust.png. Supply an existing image. >>>ATTENTION<<< is a native placeholder, not a supplied asset.",
          "encoding": "str",
          "nativeDefault": ">>>ATTENTION<<<",
          "metadata": {
            "text": [
              "Picture File"
            ],
            "type": [
              "file"
            ],
            "dir": [
              "img/pictures/"
            ],
            "desc": [
              "Picture image name relative to img/pictures, without .png; for example Bust loads img/pictures/Bust.png. Supply an existing image. >>>ATTENTION<<< is a native placeholder, not a supplied asset."
            ],
            "default": [
              ">>>ATTENTION<<<"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            ">>>ATTENTION<<<"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:eval",
          "metadata": {
            "text": [
              "Picture ID"
            ],
            "desc": [
              "What is the Picture ID to associate with this bust?\nYou may use JavaScript code."
            ],
            "default": [
              "1"
            ]
          }
        },
        {
          "key": "PictureName:str",
          "metadata": {
            "text": [
              "Picture File"
            ],
            "type": [
              "file"
            ],
            "dir": [
              "img/pictures/"
            ],
            "desc": [
              "Picture image name relative to img/pictures, without .png; for example Bust loads img/pictures/Bust.png. Supply an existing image. >>>ATTENTION<<< is a native placeholder, not a supplied asset."
            ],
            "default": [
              ">>>ATTENTION<<<"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C04",
      "key": "Basic_MirrorBust",
      "storageKey": "Basic_MirrorBust",
      "surface": "command",
      "label": "BASIC: Mirror Bust(s)",
      "description": "Change the facing direction the bust(s).\nThis alters the horizontal scaling of the bust(s).",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "BASIC: Mirror Bust(s)"
        ],
        "desc": [
          "Change the facing direction the bust(s).\nThis alters the horizontal scaling of the bust(s)."
        ]
      },
      "context": "map/common-event/troop interpreter Mirror always mirrors; None does not. Auto mirrors when the bust logical position is included in Settings.InvertedScale; Auto-Reverse mirrors when it is absent. Toggle, where offered, reverses the current horizontal scale. These choices do not change image files.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Basic_MirrorBust",
            "BASIC: Mirror Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "HorzMirror:str": "Toggle"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C04/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C04/HorzMirror:str",
          "key": "HorzMirror",
          "storageKey": "HorzMirror:str",
          "surface": "argument",
          "label": "Horizontal Mirror",
          "description": "Mirror always mirrors; None does not. Auto mirrors when the bust logical position is included in Settings.InvertedScale; Auto-Reverse mirrors when it is absent. Toggle, where offered, reverses the current horizontal scale. These choices do not change image files.",
          "encoding": "str",
          "nativeDefault": "Toggle",
          "metadata": {
            "text": [
              "Horizontal Mirror"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Mirror",
              "Auto",
              "Auto-Reverse",
              "Toggle"
            ],
            "desc": [
              "Mirror always mirrors; None does not. Auto mirrors when the bust logical position is included in Settings.InvertedScale; Auto-Reverse mirrors when it is absent. Toggle, where offered, reverses the current horizontal scale. These choices do not change image files."
            ],
            "default": [
              "Toggle"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "Toggle"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "HorzMirror:str",
          "metadata": {
            "text": [
              "Horizontal Mirror"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Mirror",
              "Auto",
              "Auto-Reverse",
              "Toggle"
            ],
            "desc": [
              "Mirror always mirrors; None does not. Auto mirrors when the bust logical position is included in Settings.InvertedScale; Auto-Reverse mirrors when it is absent. Toggle, where offered, reverses the current horizontal scale. These choices do not change image files."
            ],
            "default": [
              "Toggle"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C05",
      "key": "Basic_OriginChange",
      "storageKey": "Basic_OriginChange",
      "surface": "command",
      "label": "BASIC: Origin Change Bust(s)",
      "description": "Change the origin/anchor for bust(s).",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "BASIC: Origin Change Bust(s)"
        ],
        "desc": [
          "Change the origin/anchor for bust(s)."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Basic_OriginChange",
            "BASIC: Origin Change Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "Origin:str": "Bust",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C05/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C05/Origin:str",
          "key": "Origin",
          "storageKey": "Origin:str",
          "surface": "argument",
          "label": "Origin",
          "description": "Pick what kind of origin setting to use for this bust?\n\"Bust\" value is based on Plugin Parameters.",
          "encoding": "str",
          "nativeDefault": "Bust",
          "metadata": {
            "text": [
              "Origin"
            ],
            "parent": [
              "PictureID:eval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "Upper Left",
              "Center",
              "Bust"
            ],
            "desc": [
              "Pick what kind of origin setting to use for this bust?\n\"Bust\" value is based on Plugin Parameters."
            ],
            "default": [
              "Bust"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "Bust"
          ]
        },
        {
          "id": "VN-C05/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the origin change.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the origin change."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Origin:str",
          "metadata": {
            "text": [
              "Origin"
            ],
            "parent": [
              "PictureID:eval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "Upper Left",
              "Center",
              "Bust"
            ],
            "desc": [
              "Pick what kind of origin setting to use for this bust?\n\"Bust\" value is based on Plugin Parameters."
            ],
            "default": [
              "Bust"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the origin change."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C06",
      "key": "Basic_PlayAniBust",
      "storageKey": "Basic_PlayAniBust",
      "surface": "command",
      "label": "BASIC: Play Animation on Bust(s)",
      "description": "Plays a specific battle animation on bust(s).",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "BASIC: Play Animation on Bust(s)"
        ],
        "desc": [
          "Plays a specific battle animation on bust(s)."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Basic_PlayAniBust",
            "BASIC: Play Animation on Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "AnimationID:num": "1",
              "Mirror:eval": "false",
              "WaitForAnimation:eval": "false"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C06/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C06/AnimationID:num",
          "key": "AnimationID",
          "storageKey": "AnimationID:num",
          "surface": "argument",
          "label": "Battle Animation ID",
          "description": "Select which battle animation to play on bust.",
          "encoding": "num",
          "nativeDefault": "1",
          "metadata": {
            "text": [
              "Battle Animation ID"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "animation"
            ],
            "desc": [
              "Select which battle animation to play on bust."
            ],
            "default": [
              "1"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "1"
          ]
        },
        {
          "id": "VN-C06/Mirror:eval",
          "key": "Mirror",
          "storageKey": "Mirror:eval",
          "surface": "argument",
          "label": "Mirror Animation?",
          "description": "Mirror the animation effect?",
          "encoding": "eval",
          "nativeDefault": "false",
          "metadata": {
            "text": [
              "Mirror Animation?"
            ],
            "parent": [
              "AnimationID:num"
            ],
            "type": [
              "boolean"
            ],
            "desc": [
              "Mirror the animation effect?"
            ],
            "default": [
              "false"
            ],
            "on": [
              "Mirror"
            ],
            "off": [
              "Normal"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "false"
          ]
        },
        {
          "id": "VN-C06/WaitForAnimation:eval",
          "key": "WaitForAnimation",
          "storageKey": "WaitForAnimation:eval",
          "surface": "argument",
          "label": "Wait For Animation?",
          "description": "Wait until the animation is finished before continuing?",
          "encoding": "eval",
          "nativeDefault": "false",
          "metadata": {
            "text": [
              "Wait For Animation?"
            ],
            "type": [
              "boolean"
            ],
            "desc": [
              "Wait until the animation is finished before continuing?"
            ],
            "default": [
              "false"
            ],
            "on": [
              "Wait"
            ],
            "off": [
              "Don't Wait"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "false"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "AnimationID:num",
          "metadata": {
            "text": [
              "Battle Animation ID"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "animation"
            ],
            "desc": [
              "Select which battle animation to play on bust."
            ],
            "default": [
              "1"
            ]
          }
        },
        {
          "key": "Mirror:eval",
          "metadata": {
            "text": [
              "Mirror Animation?"
            ],
            "parent": [
              "AnimationID:num"
            ],
            "type": [
              "boolean"
            ],
            "desc": [
              "Mirror the animation effect?"
            ],
            "default": [
              "false"
            ],
            "on": [
              "Mirror"
            ],
            "off": [
              "Normal"
            ]
          }
        },
        {
          "key": "WaitForAnimation:eval",
          "metadata": {
            "text": [
              "Wait For Animation?"
            ],
            "type": [
              "boolean"
            ],
            "desc": [
              "Wait until the animation is finished before continuing?"
            ],
            "default": [
              "false"
            ],
            "on": [
              "Wait"
            ],
            "off": [
              "Don't Wait"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine",
        "Battle Core >=1.47 when installed"
      ]
    },
    {
      "id": "VN-C07",
      "key": "Breathing_Enable",
      "storageKey": "Breathing_Enable",
      "surface": "command",
      "label": "BREATHING: Start",
      "description": "Start breathing aspect for selected bust(s).\nMakes it look like the bust graphic is more alive.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "BREATHING: Start"
        ],
        "desc": [
          "Start breathing aspect for selected bust(s).\nMakes it look like the bust graphic is more alive."
        ]
      },
      "context": "map/common-event/troop interpreter Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis. Effects add to the base transform and use the shared Graphics.frameCount, not elapsed time since enabling. Breathing uses scale percentage points, fidgeting uses pixels and swaying uses degrees; each argument describes its formula.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Breathing_Enable",
            "BREATHING: Start",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "SpeedX:eval": "20",
              "SpeedY:eval": "30",
              "RateX:eval": "0.10",
              "RateY:eval": "0.80"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C07/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C07/SpeedX:eval",
          "key": "SpeedX",
          "storageKey": "SpeedX:eval",
          "surface": "argument",
          "label": "Speed X",
          "description": "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Speed X"
            ],
            "parent": [
              "Speed"
            ],
            "desc": [
              "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        },
        {
          "id": "VN-C07/SpeedY:eval",
          "key": "SpeedY",
          "storageKey": "SpeedY:eval",
          "surface": "argument",
          "label": "Speed Y",
          "description": "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis.",
          "encoding": "eval",
          "nativeDefault": "30",
          "metadata": {
            "text": [
              "Speed Y"
            ],
            "parent": [
              "Speed"
            ],
            "desc": [
              "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis."
            ],
            "default": [
              "30"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "30"
          ]
        },
        {
          "id": "VN-C07/RateX:eval",
          "key": "RateX",
          "storageKey": "RateX:eval",
          "surface": "argument",
          "label": "Rate X",
          "description": "Additive amplitude in picture-scale percentage points. For a base scale 100 and rate 0.8, the displayed scale varies from 99.2 to 100.8; this is not a factor of 0.8 or an 80% amplitude. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied.",
          "encoding": "eval",
          "nativeDefault": "0.10",
          "metadata": {
            "text": [
              "Rate X"
            ],
            "parent": [
              "Rate"
            ],
            "desc": [
              "Additive amplitude in picture-scale percentage points. For a base scale 100 and rate 0.8, the displayed scale varies from 99.2 to 100.8; this is not a factor of 0.8 or an 80% amplitude. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied."
            ],
            "default": [
              "0.10"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "0.10"
          ]
        },
        {
          "id": "VN-C07/RateY:eval",
          "key": "RateY",
          "storageKey": "RateY:eval",
          "surface": "argument",
          "label": "Rate Y",
          "description": "Additive amplitude in picture-scale percentage points. For a base scale 100 and rate 0.8, the displayed scale varies from 99.2 to 100.8; this is not a factor of 0.8 or an 80% amplitude. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied.",
          "encoding": "eval",
          "nativeDefault": "0.80",
          "metadata": {
            "text": [
              "Rate Y"
            ],
            "parent": [
              "Rate"
            ],
            "desc": [
              "Additive amplitude in picture-scale percentage points. For a base scale 100 and rate 0.8, the displayed scale varies from 99.2 to 100.8; this is not a factor of 0.8 or an 80% amplitude. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied."
            ],
            "default": [
              "0.80"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "0.80"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Speed",
          "metadata": {}
        },
        {
          "key": "SpeedX:eval",
          "metadata": {
            "text": [
              "Speed X"
            ],
            "parent": [
              "Speed"
            ],
            "desc": [
              "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis."
            ],
            "default": [
              "20"
            ]
          }
        },
        {
          "key": "SpeedY:eval",
          "metadata": {
            "text": [
              "Speed Y"
            ],
            "parent": [
              "Speed"
            ],
            "desc": [
              "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis."
            ],
            "default": [
              "30"
            ]
          }
        },
        {
          "key": "Rate",
          "metadata": {}
        },
        {
          "key": "RateX:eval",
          "metadata": {
            "text": [
              "Rate X"
            ],
            "parent": [
              "Rate"
            ],
            "desc": [
              "Additive amplitude in picture-scale percentage points. For a base scale 100 and rate 0.8, the displayed scale varies from 99.2 to 100.8; this is not a factor of 0.8 or an 80% amplitude. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied."
            ],
            "default": [
              "0.10"
            ]
          }
        },
        {
          "key": "RateY:eval",
          "metadata": {
            "text": [
              "Rate Y"
            ],
            "parent": [
              "Rate"
            ],
            "desc": [
              "Additive amplitude in picture-scale percentage points. For a base scale 100 and rate 0.8, the displayed scale varies from 99.2 to 100.8; this is not a factor of 0.8 or an 80% amplitude. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied."
            ],
            "default": [
              "0.80"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C08",
      "key": "Breathing_Disable",
      "storageKey": "Breathing_Disable",
      "surface": "command",
      "label": "BREATHING: Stop",
      "description": "Stops breathing aspect for selected bust(s).\nThe bust graphic becomes static.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "BREATHING: Stop"
        ],
        "desc": [
          "Stops breathing aspect for selected bust(s).\nThe bust graphic becomes static."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Breathing_Disable",
            "BREATHING: Stop",
            {
              "PictureID:arrayeval": "[\"1\"]"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C08/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C09",
      "key": "Fade_FadeIn",
      "storageKey": "Fade_FadeIn",
      "surface": "command",
      "label": "FADE: Fade In Bust(s)",
      "description": "Brings selected picture bust(s) opacity levels to 255.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "FADE: Fade In Bust(s)"
        ],
        "desc": [
          "Brings selected picture bust(s) opacity levels to 255."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Fade_FadeIn",
            "FADE: Fade In Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C09/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C09/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust fade in.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust fade in."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust fade in."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C10",
      "key": "Fade_FadeOut",
      "storageKey": "Fade_FadeOut",
      "surface": "command",
      "label": "FADE: Fade Out Bust(s)",
      "description": "Brings selected picture bust(s) opacity levels to 0.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "FADE: Fade Out Bust(s)"
        ],
        "desc": [
          "Brings selected picture bust(s) opacity levels to 0."
        ]
      },
      "context": "map/common-event/troop interpreter AutoErase: When true, polls the selected picture base opacity immediately and up to 50 further times at 100 ms intervals, erasing once opacity is <=0. This is a finite retry window, nominally about 5 seconds; timer delays may be longer and a long/paused fade can outlast the retries, leaving a transparent picture slot unerased. False leaves the slot present. Replacing/erasing the picture or changing the game screen cancels stale work.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Fade_FadeOut",
            "FADE: Fade Out Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "Duration:eval": "20",
              "AutoErase:eval": "false"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C10/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C10/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust fade out.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust fade out."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        },
        {
          "id": "VN-C10/AutoErase:eval",
          "key": "AutoErase",
          "storageKey": "AutoErase:eval",
          "surface": "argument",
          "label": "Auto-Erase?",
          "description": "When true, polls the selected picture base opacity immediately and up to 50 further times at 100 ms intervals, erasing once opacity is <=0. This is a finite retry window, nominally about 5 seconds; timer delays may be longer and a long/paused fade can outlast the retries, leaving a transparent picture slot unerased. False leaves the slot present. Replacing/erasing the picture or changing the game screen cancels stale work.",
          "encoding": "eval",
          "nativeDefault": "false",
          "metadata": {
            "text": [
              "Auto-Erase?"
            ],
            "parent": [
              "Duration:eval"
            ],
            "type": [
              "boolean"
            ],
            "desc": [
              "When true, polls the selected picture base opacity immediately and up to 50 further times at 100 ms intervals, erasing once opacity is <=0. This is a finite retry window, nominally about 5 seconds; timer delays may be longer and a long/paused fade can outlast the retries, leaving a transparent picture slot unerased. False leaves the slot present. Replacing/erasing the picture or changing the game screen cancels stale work."
            ],
            "default": [
              "false"
            ],
            "on": [
              "Auto-Erase"
            ],
            "off": [
              "Don't Erase"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "false"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust fade out."
            ],
            "default": [
              "20"
            ]
          }
        },
        {
          "key": "AutoErase:eval",
          "metadata": {
            "text": [
              "Auto-Erase?"
            ],
            "parent": [
              "Duration:eval"
            ],
            "type": [
              "boolean"
            ],
            "desc": [
              "When true, polls the selected picture base opacity immediately and up to 50 further times at 100 ms intervals, erasing once opacity is <=0. This is a finite retry window, nominally about 5 seconds; timer delays may be longer and a long/paused fade can outlast the retries, leaving a transparent picture slot unerased. False leaves the slot present. Replacing/erasing the picture or changing the game screen cancels stale work."
            ],
            "default": [
              "false"
            ],
            "on": [
              "Auto-Erase"
            ],
            "off": [
              "Don't Erase"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C11",
      "key": "Fade_OpacityBy",
      "storageKey": "Fade_OpacityBy",
      "surface": "command",
      "label": "FADE: Opacity By X, Bust(s)",
      "description": "Adjusts selected picture bust(s) opacity levels relatively.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "FADE: Opacity By X, Bust(s)"
        ],
        "desc": [
          "Adjusts selected picture bust(s) opacity levels relatively."
        ]
      },
      "context": "map/common-event/troop interpreter Adds the supplied amount to the existing target opacity, not the currently displayed opacity during an unfinished fade. The new target is rounded and clamped to 0..255 (0 transparent, 255 opaque). Negative lowers and positive raises the target. For example a pending target of 0 plus 40 becomes 40 even if the picture is still visibly at 200. Duration sets the new transition from the current displayed value.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Fade_OpacityBy",
            "FADE: Opacity By X, Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "AdjustOpacity:eval": "+50",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C11/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C11/AdjustOpacity:eval",
          "key": "AdjustOpacity",
          "storageKey": "AdjustOpacity:eval",
          "surface": "argument",
          "label": "Adjust Opacity",
          "description": "Adds the supplied amount to the existing target opacity, not the currently displayed opacity during an unfinished fade. The new target is rounded and clamped to 0..255 (0 transparent, 255 opaque). Negative lowers and positive raises the target. For example a pending target of 0 plus 40 becomes 40 even if the picture is still visibly at 200. Duration sets the new transition from the current displayed value.",
          "encoding": "eval",
          "nativeDefault": "+50",
          "metadata": {
            "text": [
              "Adjust Opacity"
            ],
            "desc": [
              "Adds the supplied amount to the existing target opacity, not the currently displayed opacity during an unfinished fade. The new target is rounded and clamped to 0..255 (0 transparent, 255 opaque). Negative lowers and positive raises the target. For example a pending target of 0 plus 40 becomes 40 even if the picture is still visibly at 200. Duration sets the new transition from the current displayed value."
            ],
            "default": [
              "+50"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "+50"
          ]
        },
        {
          "id": "VN-C11/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust fading.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust fading."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "AdjustOpacity:eval",
          "metadata": {
            "text": [
              "Adjust Opacity"
            ],
            "desc": [
              "Adds the supplied amount to the existing target opacity, not the currently displayed opacity during an unfinished fade. The new target is rounded and clamped to 0..255 (0 transparent, 255 opaque). Negative lowers and positive raises the target. For example a pending target of 0 plus 40 becomes 40 even if the picture is still visibly at 200. Duration sets the new transition from the current displayed value."
            ],
            "default": [
              "+50"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust fading."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C12",
      "key": "Fade_OpacityTo",
      "storageKey": "Fade_OpacityTo",
      "surface": "command",
      "label": "FADE: Opacity To X, Bust(s)",
      "description": "Brings selected picture bust(s) opacity levels to a custom value.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "FADE: Opacity To X, Bust(s)"
        ],
        "desc": [
          "Brings selected picture bust(s) opacity levels to a custom value."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Fade_OpacityTo",
            "FADE: Opacity To X, Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "TargetOpacity:num": "128",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C12/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C12/TargetOpacity:num",
          "key": "TargetOpacity",
          "storageKey": "TargetOpacity:num",
          "surface": "argument",
          "label": "Target Opacity",
          "description": "What opacity value do you wish to adjust the bust to?\nUse a value between 0 and 255.",
          "encoding": "num",
          "nativeDefault": "128",
          "metadata": {
            "text": [
              "Target Opacity"
            ],
            "desc": [
              "What opacity value do you wish to adjust the bust to?\nUse a value between 0 and 255."
            ],
            "type": [
              "number"
            ],
            "min": [
              "0"
            ],
            "max": [
              "255"
            ],
            "default": [
              "128"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "128"
          ]
        },
        {
          "id": "VN-C12/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust fading.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust fading."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "TargetOpacity:num",
          "metadata": {
            "text": [
              "Target Opacity"
            ],
            "desc": [
              "What opacity value do you wish to adjust the bust to?\nUse a value between 0 and 255."
            ],
            "type": [
              "number"
            ],
            "min": [
              "0"
            ],
            "max": [
              "255"
            ],
            "default": [
              "128"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust fading."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C13",
      "key": "Fidgeting_Enable",
      "storageKey": "Fidgeting_Enable",
      "surface": "command",
      "label": "FIDGETING: Start",
      "description": "Starts fidgeting aspect for selected bust(s).\nBust graphic moves back and forth.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "FIDGETING: Start"
        ],
        "desc": [
          "Starts fidgeting aspect for selected bust(s).\nBust graphic moves back and forth."
        ]
      },
      "context": "map/common-event/troop interpreter Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis. Effects add to the base transform and use the shared Graphics.frameCount, not elapsed time since enabling. Breathing uses scale percentage points, fidgeting uses pixels and swaying uses degrees; each argument describes its formula.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Fidgeting_Enable",
            "FIDGETING: Start",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "SpeedX:eval": "30",
              "SpeedY:eval": "30",
              "RateX:eval": "5.00",
              "RateY:eval": "0.00"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C13/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C13/SpeedX:eval",
          "key": "SpeedX",
          "storageKey": "SpeedX:eval",
          "surface": "argument",
          "label": "Speed X",
          "description": "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis.",
          "encoding": "eval",
          "nativeDefault": "30",
          "metadata": {
            "text": [
              "Speed X"
            ],
            "parent": [
              "Speed"
            ],
            "desc": [
              "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis."
            ],
            "default": [
              "30"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "30"
          ]
        },
        {
          "id": "VN-C13/SpeedY:eval",
          "key": "SpeedY",
          "storageKey": "SpeedY:eval",
          "surface": "argument",
          "label": "Speed Y",
          "description": "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis.",
          "encoding": "eval",
          "nativeDefault": "30",
          "metadata": {
            "text": [
              "Speed Y"
            ],
            "parent": [
              "Speed"
            ],
            "desc": [
              "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis."
            ],
            "default": [
              "30"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "30"
          ]
        },
        {
          "id": "VN-C13/RateX:eval",
          "key": "RateX",
          "storageKey": "RateX:eval",
          "surface": "argument",
          "label": "Distance X",
          "description": "Horizontal displacement amplitude in pixels added to picture X. Rate 5 oscillates from -5 to +5 pixels; negative rates invert the phase. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied.",
          "encoding": "eval",
          "nativeDefault": "5.00",
          "metadata": {
            "text": [
              "Distance X"
            ],
            "parent": [
              "Rate"
            ],
            "desc": [
              "Horizontal displacement amplitude in pixels added to picture X. Rate 5 oscillates from -5 to +5 pixels; negative rates invert the phase. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied."
            ],
            "default": [
              "5.00"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "5.00"
          ]
        },
        {
          "id": "VN-C13/RateY:eval",
          "key": "RateY",
          "storageKey": "RateY:eval",
          "surface": "argument",
          "label": "Distance Y",
          "description": "Vertical displacement range in pixels, computed as cos(phase)*rate/2+rate/2 and added to picture Y. Rate 5 ranges from 0 to 5 pixels, not-5 to +5; negative rates move upward. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied.",
          "encoding": "eval",
          "nativeDefault": "0.00",
          "metadata": {
            "text": [
              "Distance Y"
            ],
            "parent": [
              "Rate"
            ],
            "desc": [
              "Vertical displacement range in pixels, computed as cos(phase)*rate/2+rate/2 and added to picture Y. Rate 5 ranges from 0 to 5 pixels, not-5 to +5; negative rates move upward. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied."
            ],
            "default": [
              "0.00"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "0.00"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Speed",
          "metadata": {}
        },
        {
          "key": "SpeedX:eval",
          "metadata": {
            "text": [
              "Speed X"
            ],
            "parent": [
              "Speed"
            ],
            "desc": [
              "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis."
            ],
            "default": [
              "30"
            ]
          }
        },
        {
          "key": "SpeedY:eval",
          "metadata": {
            "text": [
              "Speed Y"
            ],
            "parent": [
              "Speed"
            ],
            "desc": [
              "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis."
            ],
            "default": [
              "30"
            ]
          }
        },
        {
          "key": "Rate",
          "metadata": {
            "text": [
              "Distance"
            ]
          }
        },
        {
          "key": "RateX:eval",
          "metadata": {
            "text": [
              "Distance X"
            ],
            "parent": [
              "Rate"
            ],
            "desc": [
              "Horizontal displacement amplitude in pixels added to picture X. Rate 5 oscillates from -5 to +5 pixels; negative rates invert the phase. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied."
            ],
            "default": [
              "5.00"
            ]
          }
        },
        {
          "key": "RateY:eval",
          "metadata": {
            "text": [
              "Distance Y"
            ],
            "parent": [
              "Rate"
            ],
            "desc": [
              "Vertical displacement range in pixels, computed as cos(phase)*rate/2+rate/2 and added to picture Y. Rate 5 ranges from 0 to 5 pixels, not-5 to +5; negative rates move upward. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied."
            ],
            "default": [
              "0.00"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C14",
      "key": "Fidgeting_Disable",
      "storageKey": "Fidgeting_Disable",
      "surface": "command",
      "label": "FIDGETING: Stop",
      "description": "Stops fidgeting aspect for selected bust(s).\nThe bust graphic becomes stationary.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "FIDGETING: Stop"
        ],
        "desc": [
          "Stops fidgeting aspect for selected bust(s).\nThe bust graphic becomes stationary."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Fidgeting_Disable",
            "FIDGETING: Stop",
            {
              "PictureID:arrayeval": "[\"1\"]"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C14/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C15",
      "key": "Move_MoveByCoordinates",
      "storageKey": "Move_MoveByCoordinates",
      "surface": "command",
      "label": "MOVE: Move Bust(s) By Coordinates",
      "description": "Move busts by pixel offsets from their pending target while moving, or from current coordinates while stationary.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "MOVE: Move Bust(s) By Coordinates"
        ],
        "desc": [
          "Move bust(s) relative to current coordinates(s)."
        ]
      },
      "context": "map/common-event/troop interpreter Pixel offset: while picture._duration>0 it adds to the pending target for that axis; otherwise it adds to the current coordinate. Thus consecutive commands can accumulate on an unfinished target. The string Unchanged skips that axis (case-insensitive after trimming). JavaScript source is evaluated per axis; use a finite numeric completion value. Duration starts a new transition and FlipDirection affects horizontal scale, not the offset sign.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Move_MoveByCoordinates",
            "MOVE: Move Bust(s) By Coordinates",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "MoveX:str": "+100",
              "MoveY:str": "Unchanged",
              "EasingType:str": "InOutSine",
              "FlipDirection:str": "None",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C15/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C15/MoveX:str",
          "key": "MoveX",
          "storageKey": "MoveX:str",
          "surface": "argument",
          "label": "Move By X",
          "description": "Pixel offset: while picture._duration>0 it adds to the pending target for that axis; otherwise it adds to the current coordinate. Thus consecutive commands can accumulate on an unfinished target. The string Unchanged skips that axis (case-insensitive after trimming). JavaScript source is evaluated per axis; use a finite numeric completion value. Duration starts a new transition and FlipDirection affects horizontal scale, not the offset sign. Negative moves left; positive right.",
          "encoding": "str",
          "nativeDefault": "+100",
          "metadata": {
            "text": [
              "Move By X"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Pixel offset: while picture._duration>0 it adds to the pending target for that axis; otherwise it adds to the current coordinate. Thus consecutive commands can accumulate on an unfinished target. The string Unchanged skips that axis (case-insensitive after trimming). JavaScript source is evaluated per axis; use a finite numeric completion value. Duration starts a new transition and FlipDirection affects horizontal scale, not the offset sign. Negative moves left; positive right."
            ],
            "default": [
              "+100"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "+100"
          ]
        },
        {
          "id": "VN-C15/MoveY:str",
          "key": "MoveY",
          "storageKey": "MoveY:str",
          "surface": "argument",
          "label": "Move By Y",
          "description": "Pixel offset: while picture._duration>0 it adds to the pending target for that axis; otherwise it adds to the current coordinate. Thus consecutive commands can accumulate on an unfinished target. The string Unchanged skips that axis (case-insensitive after trimming). JavaScript source is evaluated per axis; use a finite numeric completion value. Duration starts a new transition and FlipDirection affects horizontal scale, not the offset sign. Negative moves up; positive down.",
          "encoding": "str",
          "nativeDefault": "Unchanged",
          "metadata": {
            "text": [
              "Move By Y"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Pixel offset: while picture._duration>0 it adds to the pending target for that axis; otherwise it adds to the current coordinate. Thus consecutive commands can accumulate on an unfinished target. The string Unchanged skips that axis (case-insensitive after trimming). JavaScript source is evaluated per axis; use a finite numeric completion value. Duration starts a new transition and FlipDirection affects horizontal scale, not the offset sign. Negative moves up; positive down."
            ],
            "default": [
              "Unchanged"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "Unchanged"
          ]
        },
        {
          "id": "VN-C15/EasingType:str",
          "key": "EasingType",
          "storageKey": "EasingType:str",
          "surface": "argument",
          "label": "Move Easing",
          "description": "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.",
          "encoding": "str",
          "nativeDefault": "InOutSine",
          "metadata": {
            "text": [
              "Move Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InOutSine"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "InOutSine"
          ]
        },
        {
          "id": "VN-C15/FlipDirection:str",
          "key": "FlipDirection",
          "storageKey": "FlipDirection:str",
          "surface": "argument",
          "label": "Flip Direction",
          "description": "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero.",
          "encoding": "str",
          "nativeDefault": "None",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero."
            ],
            "default": [
              "None"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "None"
          ]
        },
        {
          "id": "VN-C15/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust movement.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust movement."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "MoveX:str",
          "metadata": {
            "text": [
              "Move By X"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Pixel offset: while picture._duration>0 it adds to the pending target for that axis; otherwise it adds to the current coordinate. Thus consecutive commands can accumulate on an unfinished target. The string Unchanged skips that axis (case-insensitive after trimming). JavaScript source is evaluated per axis; use a finite numeric completion value. Duration starts a new transition and FlipDirection affects horizontal scale, not the offset sign. Negative moves left; positive right."
            ],
            "default": [
              "+100"
            ]
          }
        },
        {
          "key": "MoveY:str",
          "metadata": {
            "text": [
              "Move By Y"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Pixel offset: while picture._duration>0 it adds to the pending target for that axis; otherwise it adds to the current coordinate. Thus consecutive commands can accumulate on an unfinished target. The string Unchanged skips that axis (case-insensitive after trimming). JavaScript source is evaluated per axis; use a finite numeric completion value. Duration starts a new transition and FlipDirection affects horizontal scale, not the offset sign. Negative moves up; positive down."
            ],
            "default": [
              "Unchanged"
            ]
          }
        },
        {
          "key": "EasingType:str",
          "metadata": {
            "text": [
              "Move Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InOutSine"
            ]
          }
        },
        {
          "key": "FlipDirection:str",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero."
            ],
            "default": [
              "None"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust movement."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C16",
      "key": "Move_MoveByPosition",
      "storageKey": "Move_MoveByPosition",
      "surface": "command",
      "label": "MOVE: Move Bust(s) By Position",
      "description": "Move bust(s) relative to current position(s).",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "MOVE: Move Bust(s) By Position"
        ],
        "desc": [
          "Move bust(s) relative to current position(s)."
        ]
      },
      "context": "map/common-event/troop interpreter Numeric JavaScript displacement in logical position slots, added to getVnBustPosition(); the final sum is clamped to 0..10, not the displacement itself. Use whole-number changes such as -1, 0 or +1 so the target has cached coordinates. There is no Unchanged sentinel for this eval field: use 0 to retain the logical position. A raw Unchanged identifier can fail during argument evaluation.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Move_MoveByPosition",
            "MOVE: Move Bust(s) By Position",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "MovePosition:eval": "+1",
              "EasingType:str": "InOutSine",
              "FlipDirection:str": "None",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C16/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C16/MovePosition:eval",
          "key": "MovePosition",
          "storageKey": "MovePosition:eval",
          "surface": "argument",
          "label": "Move By Position",
          "description": "Numeric JavaScript displacement in logical position slots, added to getVnBustPosition(); the final sum is clamped to 0..10, not the displacement itself. Use whole-number changes such as -1, 0 or +1 so the target has cached coordinates. There is no Unchanged sentinel for this eval field: use 0 to retain the logical position. A raw Unchanged identifier can fail during argument evaluation.",
          "encoding": "eval",
          "nativeDefault": "+1",
          "metadata": {
            "text": [
              "Move By Position"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Numeric JavaScript displacement in logical position slots, added to getVnBustPosition(); the final sum is clamped to 0..10, not the displacement itself. Use whole-number changes such as -1, 0 or +1 so the target has cached coordinates. There is no Unchanged sentinel for this eval field: use 0 to retain the logical position. A raw Unchanged identifier can fail during argument evaluation."
            ],
            "default": [
              "+1"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "+1"
          ]
        },
        {
          "id": "VN-C16/EasingType:str",
          "key": "EasingType",
          "storageKey": "EasingType:str",
          "surface": "argument",
          "label": "Move Easing",
          "description": "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.",
          "encoding": "str",
          "nativeDefault": "InOutSine",
          "metadata": {
            "text": [
              "Move Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InOutSine"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "InOutSine"
          ]
        },
        {
          "id": "VN-C16/FlipDirection:str",
          "key": "FlipDirection",
          "storageKey": "FlipDirection:str",
          "surface": "argument",
          "label": "Flip Direction",
          "description": "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero.",
          "encoding": "str",
          "nativeDefault": "None",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero."
            ],
            "default": [
              "None"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "None"
          ]
        },
        {
          "id": "VN-C16/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust movement.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust movement."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "MovePosition:eval",
          "metadata": {
            "text": [
              "Move By Position"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Numeric JavaScript displacement in logical position slots, added to getVnBustPosition(); the final sum is clamped to 0..10, not the displacement itself. Use whole-number changes such as -1, 0 or +1 so the target has cached coordinates. There is no Unchanged sentinel for this eval field: use 0 to retain the logical position. A raw Unchanged identifier can fail during argument evaluation."
            ],
            "default": [
              "+1"
            ]
          }
        },
        {
          "key": "EasingType:str",
          "metadata": {
            "text": [
              "Move Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InOutSine"
            ]
          }
        },
        {
          "key": "FlipDirection:str",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero."
            ],
            "default": [
              "None"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust movement."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C17",
      "key": "Move_MoveToCoordinates",
      "storageKey": "Move_MoveToCoordinates",
      "surface": "command",
      "label": "MOVE: Move Bust(s) to Coordinates",
      "description": "Move bust(s) to exact coordinates(s).",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "MOVE: Move Bust(s) to Coordinates"
        ],
        "desc": [
          "Move bust(s) to exact coordinates(s)."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Move_MoveToCoordinates",
            "MOVE: Move Bust(s) to Coordinates",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "TargetX:str": "Graphics.width / 2",
              "TargetY:str": "Unchanged",
              "EasingType:str": "InOutSine",
              "FlipDirection:str": "None",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C17/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C17/TargetX:str",
          "key": "TargetX",
          "storageKey": "TargetX:str",
          "surface": "argument",
          "label": "Target X",
          "description": "Absolute target position of the picture anchor in pixels, not a percentage or a logical bust slot. Normal screen coordinates start at the upper-left corner; Positive coordinates increase to the right. Provide finite numeric JavaScript such as 300. The string Unchanged skips this axis and preserves its existing target (case-insensitive after trimming). The other axis is evaluated separately. The coordinate move does not change the stored logical bust position; Duration controls the new transition.",
          "encoding": "str",
          "nativeDefault": "Graphics.width / 2",
          "metadata": {
            "text": [
              "Target X"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Absolute target position of the picture anchor in pixels, not a percentage or a logical bust slot. Normal screen coordinates start at the upper-left corner; Positive coordinates increase to the right. Provide finite numeric JavaScript such as 300. The string Unchanged skips this axis and preserves its existing target (case-insensitive after trimming). The other axis is evaluated separately. The coordinate move does not change the stored logical bust position; Duration controls the new transition."
            ],
            "default": [
              "Graphics.width / 2"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "Graphics.width / 2"
          ]
        },
        {
          "id": "VN-C17/TargetY:str",
          "key": "TargetY",
          "storageKey": "TargetY:str",
          "surface": "argument",
          "label": "Target Y",
          "description": "Absolute target position of the picture anchor in pixels, not a percentage or a logical bust slot. Normal screen coordinates start at the upper-left corner; Positive coordinates increase downward. Provide finite numeric JavaScript such as 300. The string Unchanged skips this axis and preserves its existing target (case-insensitive after trimming). The other axis is evaluated separately. The coordinate move does not change the stored logical bust position; Duration controls the new transition.",
          "encoding": "str",
          "nativeDefault": "Unchanged",
          "metadata": {
            "text": [
              "Target Y"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Absolute target position of the picture anchor in pixels, not a percentage or a logical bust slot. Normal screen coordinates start at the upper-left corner; Positive coordinates increase downward. Provide finite numeric JavaScript such as 300. The string Unchanged skips this axis and preserves its existing target (case-insensitive after trimming). The other axis is evaluated separately. The coordinate move does not change the stored logical bust position; Duration controls the new transition."
            ],
            "default": [
              "Unchanged"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "Unchanged"
          ]
        },
        {
          "id": "VN-C17/EasingType:str",
          "key": "EasingType",
          "storageKey": "EasingType:str",
          "surface": "argument",
          "label": "Move Easing",
          "description": "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.",
          "encoding": "str",
          "nativeDefault": "InOutSine",
          "metadata": {
            "text": [
              "Move Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InOutSine"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "InOutSine"
          ]
        },
        {
          "id": "VN-C17/FlipDirection:str",
          "key": "FlipDirection",
          "storageKey": "FlipDirection:str",
          "surface": "argument",
          "label": "Flip Direction",
          "description": "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero.",
          "encoding": "str",
          "nativeDefault": "None",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero."
            ],
            "default": [
              "None"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "None"
          ]
        },
        {
          "id": "VN-C17/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust movement.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust movement."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "TargetX:str",
          "metadata": {
            "text": [
              "Target X"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Absolute target position of the picture anchor in pixels, not a percentage or a logical bust slot. Normal screen coordinates start at the upper-left corner; Positive coordinates increase to the right. Provide finite numeric JavaScript such as 300. The string Unchanged skips this axis and preserves its existing target (case-insensitive after trimming). The other axis is evaluated separately. The coordinate move does not change the stored logical bust position; Duration controls the new transition."
            ],
            "default": [
              "Graphics.width / 2"
            ]
          }
        },
        {
          "key": "TargetY:str",
          "metadata": {
            "text": [
              "Target Y"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Absolute target position of the picture anchor in pixels, not a percentage or a logical bust slot. Normal screen coordinates start at the upper-left corner; Positive coordinates increase downward. Provide finite numeric JavaScript such as 300. The string Unchanged skips this axis and preserves its existing target (case-insensitive after trimming). The other axis is evaluated separately. The coordinate move does not change the stored logical bust position; Duration controls the new transition."
            ],
            "default": [
              "Unchanged"
            ]
          }
        },
        {
          "key": "EasingType:str",
          "metadata": {
            "text": [
              "Move Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InOutSine"
            ]
          }
        },
        {
          "key": "FlipDirection:str",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero."
            ],
            "default": [
              "None"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust movement."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C18",
      "key": "Move_MoveToPosition",
      "storageKey": "Move_MoveToPosition",
      "surface": "command",
      "label": "MOVE: Move Bust(s) to Position",
      "description": "Move bust(s) to the predetermined position.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "MOVE: Move Bust(s) to Position"
        ],
        "desc": [
          "Move bust(s) to the predetermined position."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Move_MoveToPosition",
            "MOVE: Move Bust(s) to Position",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "TargetPosition:eval": "5",
              "EasingType:str": "InOutSine",
              "FlipDirection:str": "None",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C18/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C18/TargetPosition:eval",
          "key": "TargetPosition",
          "storageKey": "TargetPosition:eval",
          "surface": "argument",
          "label": "Target Position",
          "description": "Logical bust slot, not pixels: supply JavaScript that evaluates to an integer 0..10, such as 5. The result is clamped to 0..10 and maps to the cached ScreenX/ScreenY plugin-parameter coordinates; use whole numbers because fractional slots have no cached coordinates. This command updates the stored logical position and moves to its coordinates over Duration. There is no Unchanged sentinel for this field.",
          "encoding": "eval",
          "nativeDefault": "5",
          "metadata": {
            "text": [
              "Target Position"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Logical bust slot, not pixels: supply JavaScript that evaluates to an integer 0..10, such as 5. The result is clamped to 0..10 and maps to the cached ScreenX/ScreenY plugin-parameter coordinates; use whole numbers because fractional slots have no cached coordinates. This command updates the stored logical position and moves to its coordinates over Duration. There is no Unchanged sentinel for this field."
            ],
            "default": [
              "5"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "5"
          ]
        },
        {
          "id": "VN-C18/EasingType:str",
          "key": "EasingType",
          "storageKey": "EasingType:str",
          "surface": "argument",
          "label": "Move Easing",
          "description": "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.",
          "encoding": "str",
          "nativeDefault": "InOutSine",
          "metadata": {
            "text": [
              "Move Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InOutSine"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "InOutSine"
          ]
        },
        {
          "id": "VN-C18/FlipDirection:str",
          "key": "FlipDirection",
          "storageKey": "FlipDirection:str",
          "surface": "argument",
          "label": "Flip Direction",
          "description": "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero.",
          "encoding": "str",
          "nativeDefault": "None",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero."
            ],
            "default": [
              "None"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "None"
          ]
        },
        {
          "id": "VN-C18/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust movement.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust movement."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "TargetPosition:eval",
          "metadata": {
            "text": [
              "Target Position"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Logical bust slot, not pixels: supply JavaScript that evaluates to an integer 0..10, such as 5. The result is clamped to 0..10 and maps to the cached ScreenX/ScreenY plugin-parameter coordinates; use whole numbers because fractional slots have no cached coordinates. This command updates the stored logical position and moves to its coordinates over Duration. There is no Unchanged sentinel for this field."
            ],
            "default": [
              "5"
            ]
          }
        },
        {
          "key": "EasingType:str",
          "metadata": {
            "text": [
              "Move Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InOutSine"
            ]
          }
        },
        {
          "key": "FlipDirection:str",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero."
            ],
            "default": [
              "None"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust movement."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C19",
      "key": "Move_ResetToPosition",
      "storageKey": "Move_ResetToPosition",
      "surface": "command",
      "label": "MOVE: Reset Bust(s) to Position",
      "description": "Reset bust(s) to the current position(s).",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "MOVE: Reset Bust(s) to Position"
        ],
        "desc": [
          "Reset bust(s) to the current position(s)."
        ]
      },
      "context": "map/common-event/troop interpreter Restores the pixel coordinates for the stored logical bust position from getVnBustPosition(), clamped to 0..10. It does not undo the last movement or restore a previous pixel snapshot. Coordinate moves leave that logical position unchanged; MoveTo/ByPosition changes it. An uninitialized logical position -1 resolves to slot 0. Duration and easing move toward those cached coordinates.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Move_ResetToPosition",
            "MOVE: Reset Bust(s) to Position",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "EasingType:str": "InOutSine",
              "FlipDirection:str": "None",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C19/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C19/EasingType:str",
          "key": "EasingType",
          "storageKey": "EasingType:str",
          "surface": "argument",
          "label": "Move Easing",
          "description": "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted.",
          "encoding": "str",
          "nativeDefault": "InOutSine",
          "metadata": {
            "text": [
              "Move Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InOutSine"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "InOutSine"
          ]
        },
        {
          "id": "VN-C19/FlipDirection:str",
          "key": "FlipDirection",
          "storageKey": "FlipDirection:str",
          "surface": "argument",
          "label": "Flip Direction",
          "description": "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero.",
          "encoding": "str",
          "nativeDefault": "None",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero."
            ],
            "default": [
              "None"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "None"
          ]
        },
        {
          "id": "VN-C19/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust movement.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust movement."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "EasingType:str",
          "metadata": {
            "text": [
              "Move Easing"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "combo"
            ],
            "option": [
              "Linear",
              "InSine",
              "OutSine",
              "InOutSine",
              "InQuad",
              "OutQuad",
              "InOutQuad",
              "InCubic",
              "OutCubic",
              "InOutCubic",
              "InQuart",
              "OutQuart",
              "InOutQuart",
              "InQuint",
              "OutQuint",
              "InOutQuint",
              "InExpo",
              "OutExpo",
              "InOutExpo",
              "InCirc",
              "OutCirc",
              "InOutCirc",
              "InBack",
              "OutBack",
              "InOutBack",
              "InElastic",
              "OutElastic",
              "InOutElastic",
              "InBounce",
              "OutBounce",
              "InOutBounce"
            ],
            "desc": [
              "Controls how picture transition progress changes over Duration, without changing its destination or duration. Linear advances uniformly. In starts slowly and speeds up; Out starts quickly and slows near the end; InOut combines a slow start and end. Sine uses a smooth sinusoidal curve; Quad, Cubic, Quart and Quint use successively higher powers (2 through 5), giving stronger acceleration/deceleration; Expo concentrates change near an end; Circ follows a circular arc. Back briefly goes beyond the starting or target value before settling; Elastic oscillates with overshoot; Bounce produces rebounds. Choose the exact combined name listed in the options, such as InSine, OutSine or InOutQuad. OutSine is a gently decelerating entrance; InSine is an accelerating exit. Overshooting families can temporarily move beyond the endpoint, so use Linear or a Sine/power curve when that is unwanted."
            ],
            "default": [
              "InOutSine"
            ]
          }
        },
        {
          "key": "FlipDirection:str",
          "metadata": {
            "text": [
              "Flip Direction"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "None",
              "Flip"
            ],
            "desc": [
              "None does not apply an additional sign flip. Flip immediately multiplies both the current and target horizontal scale by -1, horizontally mirroring the image around its anchor; it is not a gradual turn and does not reverse the coordinate displacement. Flip itself does not change the logical bust position; the enclosing command can (Exit sets it to -1, and MovePosition changes it). Any ongoing scale transition continues toward the negated target scale; the resulting target orientation persists until another command changes it or the picture is erased. A second Flip reverses them again; zero scale remains zero."
            ],
            "default": [
              "None"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust movement."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C20",
      "key": "Scale_ScaleBy",
      "storageKey": "Scale_ScaleBy",
      "surface": "command",
      "label": "SCALE: Scale Bust(s) By",
      "description": "Scale bust(s) by specific amounts.\nValue scale: 100 = 100% = 1.0",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "SCALE: Scale Bust(s) By"
        ],
        "desc": [
          "Scale bust(s) by specific amounts.\nValue scale: 100 = 100% = 1.0"
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Scale_ScaleBy",
            "SCALE: Scale Bust(s) By",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "ScaleX:eval": "+20",
              "ScaleY:eval": "+20",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C20/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C20/ScaleX:eval",
          "key": "ScaleX",
          "storageKey": "ScaleX:eval",
          "surface": "argument",
          "label": "Scale X By",
          "description": "Alter (additively) the X scaling value by this.\nYou may use JavaScript.",
          "encoding": "eval",
          "nativeDefault": "+20",
          "metadata": {
            "text": [
              "Scale X By"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Alter (additively) the X scaling value by this.\nYou may use JavaScript."
            ],
            "default": [
              "+20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "+20"
          ]
        },
        {
          "id": "VN-C20/ScaleY:eval",
          "key": "ScaleY",
          "storageKey": "ScaleY:eval",
          "surface": "argument",
          "label": "Scale Y By",
          "description": "Alter (additively) the Y scaling value by this.\nYou may use JavaScript.",
          "encoding": "eval",
          "nativeDefault": "+20",
          "metadata": {
            "text": [
              "Scale Y By"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Alter (additively) the Y scaling value by this.\nYou may use JavaScript."
            ],
            "default": [
              "+20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "+20"
          ]
        },
        {
          "id": "VN-C20/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust scaling.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust scaling."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "ScaleX:eval",
          "metadata": {
            "text": [
              "Scale X By"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Alter (additively) the X scaling value by this.\nYou may use JavaScript."
            ],
            "default": [
              "+20"
            ]
          }
        },
        {
          "key": "ScaleY:eval",
          "metadata": {
            "text": [
              "Scale Y By"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Alter (additively) the Y scaling value by this.\nYou may use JavaScript."
            ],
            "default": [
              "+20"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust scaling."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C21",
      "key": "Scale_ScaleTo",
      "storageKey": "Scale_ScaleTo",
      "surface": "command",
      "label": "SCALE: Scale Bust(s) To",
      "description": "Scale bust(s) to specific values.\nValue scale: 100 = 100% = 1.0",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "SCALE: Scale Bust(s) To"
        ],
        "desc": [
          "Scale bust(s) to specific values.\nValue scale: 100 = 100% = 1.0"
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Scale_ScaleTo",
            "SCALE: Scale Bust(s) To",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "TargetScaleX:str": "100",
              "TargetScaleY:str": "100",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C21/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C21/TargetScaleX:str",
          "key": "TargetScaleX",
          "storageKey": "TargetScaleX:str",
          "surface": "argument",
          "label": "Target Scale X",
          "description": "Set X scaling value to this.\nYou may use JavaScript. \"Unchanged\" for no changes.",
          "encoding": "str",
          "nativeDefault": "100",
          "metadata": {
            "text": [
              "Target Scale X"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Set X scaling value to this.\nYou may use JavaScript. \"Unchanged\" for no changes."
            ],
            "default": [
              "100"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "100"
          ]
        },
        {
          "id": "VN-C21/TargetScaleY:str",
          "key": "TargetScaleY",
          "storageKey": "TargetScaleY:str",
          "surface": "argument",
          "label": "Target Scale Y",
          "description": "Set Y scaling value to this.\nYou may use JavaScript. \"Unchanged\" for no changes.",
          "encoding": "str",
          "nativeDefault": "100",
          "metadata": {
            "text": [
              "Target Scale Y"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Set Y scaling value to this.\nYou may use JavaScript. \"Unchanged\" for no changes."
            ],
            "default": [
              "100"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "100"
          ]
        },
        {
          "id": "VN-C21/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust scaling.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust scaling."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "TargetScaleX:str",
          "metadata": {
            "text": [
              "Target Scale X"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Set X scaling value to this.\nYou may use JavaScript. \"Unchanged\" for no changes."
            ],
            "default": [
              "100"
            ]
          }
        },
        {
          "key": "TargetScaleY:str",
          "metadata": {
            "text": [
              "Target Scale Y"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Set Y scaling value to this.\nYou may use JavaScript. \"Unchanged\" for no changes."
            ],
            "default": [
              "100"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust scaling."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C22",
      "key": "Scale_ScaleReset",
      "storageKey": "Scale_ScaleReset",
      "surface": "command",
      "label": "SCALE: Scale Reset Bust(s)",
      "description": "Resets the scale for bust(s) to the default\nsettings in the Plugin Parameters.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "SCALE: Scale Reset Bust(s)"
        ],
        "desc": [
          "Resets the scale for bust(s) to the default\nsettings in the Plugin Parameters."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Scale_ScaleReset",
            "SCALE: Scale Reset Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C22/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C22/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the bust scaling.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust scaling."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the bust scaling."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C23",
      "key": "Swaying_Enable",
      "storageKey": "Swaying_Enable",
      "surface": "command",
      "label": "SWAYING: Start",
      "description": "Starts swaying aspect for selected bust(s).\nThe bust sways its angle back and forth.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "SWAYING: Start"
        ],
        "desc": [
          "Starts swaying aspect for selected bust(s).\nThe bust sways its angle back and forth."
        ]
      },
      "context": "map/common-event/troop interpreter Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis. Effects add to the base transform and use the shared Graphics.frameCount, not elapsed time since enabling. Breathing uses scale percentage points, fidgeting uses pixels and swaying uses degrees; each argument describes its formula.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Swaying_Enable",
            "SWAYING: Start",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "SpeedAngle:eval": "30",
              "RateAngle:eval": "2"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C23/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C23/SpeedAngle:eval",
          "key": "SpeedAngle",
          "storageKey": "SpeedAngle:eval",
          "surface": "argument",
          "label": "Angle Speed",
          "description": "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis.",
          "encoding": "eval",
          "nativeDefault": "30",
          "metadata": {
            "text": [
              "Angle Speed"
            ],
            "parent": [
              "Speed"
            ],
            "desc": [
              "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis."
            ],
            "default": [
              "30"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "30"
          ]
        },
        {
          "id": "VN-C23/RateAngle:eval",
          "key": "RateAngle",
          "storageKey": "RateAngle:eval",
          "surface": "argument",
          "label": "Angle Sway",
          "description": "Angular amplitude in degrees, added to the base picture angle; rate 2 oscillates from -2 to +2 degrees around it. Negative rates invert the phase. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied.",
          "encoding": "eval",
          "nativeDefault": "2",
          "metadata": {
            "text": [
              "Angle Sway"
            ],
            "parent": [
              "Rate"
            ],
            "desc": [
              "Angular amplitude in degrees, added to the base picture angle; rate 2 oscillates from -2 to +2 degrees around it. Negative rates invert the phase. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied."
            ],
            "default": [
              "2"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "2"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Speed",
          "metadata": {}
        },
        {
          "key": "SpeedAngle:eval",
          "metadata": {
            "text": [
              "Angle Speed"
            ],
            "parent": [
              "Speed"
            ],
            "desc": [
              "Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis."
            ],
            "default": [
              "30"
            ]
          }
        },
        {
          "key": "Rate",
          "metadata": {
            "text": [
              "Angle"
            ]
          }
        },
        {
          "key": "RateAngle:eval",
          "metadata": {
            "text": [
              "Angle Sway"
            ],
            "parent": [
              "Rate"
            ],
            "desc": [
              "Angular amplitude in degrees, added to the base picture angle; rate 2 oscillates from -2 to +2 degrees around it. Negative rates invert the phase. Use finite numeric JavaScript. Zero disables the component; no extra amplitude clamp is applied."
            ],
            "default": [
              "2"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C24",
      "key": "Swaying_Disable",
      "storageKey": "Swaying_Disable",
      "surface": "command",
      "label": "SWAYING: Stop",
      "description": "Stops swaying aspect for selected bust(s).\nThe no longer sways back and forth.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "SWAYING: Stop"
        ],
        "desc": [
          "Stops swaying aspect for selected bust(s).\nThe no longer sways back and forth."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Swaying_Disable",
            "SWAYING: Stop",
            {
              "PictureID:arrayeval": "[\"1\"]"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C24/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C25",
      "key": "Tone_BrightBust",
      "storageKey": "Tone_BrightBust",
      "surface": "command",
      "label": "TONE: Bright Bust(s)",
      "description": "Brighten bust(s) to use the Tone settings\nfound in the Plugin Parameters.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "TONE: Bright Bust(s)"
        ],
        "desc": [
          "Brighten bust(s) to use the Tone settings\nfound in the Plugin Parameters."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Tone_BrightBust",
            "TONE: Bright Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C25/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C25/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the tone change.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the tone change."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the tone change."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C26",
      "key": "Tone_DimBust",
      "storageKey": "Tone_DimBust",
      "surface": "command",
      "label": "TONE: Dim Bust(s)",
      "description": "Dims bust(s) to use the Tone settings\nfound in the Plugin Parameters.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "TONE: Dim Bust(s)"
        ],
        "desc": [
          "Dims bust(s) to use the Tone settings\nfound in the Plugin Parameters."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Tone_DimBust",
            "TONE: Dim Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C26/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C26/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the tone change.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the tone change."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the tone change."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C27",
      "key": "Tone_NormalBust",
      "storageKey": "Tone_NormalBust",
      "surface": "command",
      "label": "TONE: Normal Bust(s)",
      "description": "Normalize bust(s) to no tone at all.",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "TONE: Normal Bust(s)"
        ],
        "desc": [
          "Normalize bust(s) to no tone at all."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Tone_NormalBust",
            "TONE: Normal Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C27/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C27/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the tone change.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the tone change."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the tone change."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C28",
      "key": "Tone_PresetBust",
      "storageKey": "Tone_PresetBust",
      "surface": "command",
      "label": "TONE: Preset Tone for Bust(s)",
      "description": "Use RPG Maker MZ's present tones/tints for bust(s).",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "TONE: Preset Tone for Bust(s)"
        ],
        "desc": [
          "Use RPG Maker MZ's present tones/tints for bust(s)."
        ]
      },
      "context": "map/common-event/troop interpreter",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Tone_PresetBust",
            "TONE: Preset Tone for Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "Preset:str": "Sepia",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C28/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C28/Preset:str",
          "key": "Preset",
          "storageKey": "Preset:str",
          "surface": "argument",
          "label": "Preset Name",
          "description": "What tone preset do you wish to apply?",
          "encoding": "str",
          "nativeDefault": "Sepia",
          "metadata": {
            "text": [
              "Preset Name"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "Normal",
              "Dark",
              "Sepia",
              "Sunset",
              "Night"
            ],
            "desc": [
              "What tone preset do you wish to apply?"
            ],
            "default": [
              "Sepia"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "Sepia"
          ]
        },
        {
          "id": "VN-C28/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the tone change.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the tone change."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "Preset:str",
          "metadata": {
            "text": [
              "Preset Name"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "type": [
              "select"
            ],
            "option": [
              "Normal",
              "Dark",
              "Sepia",
              "Sunset",
              "Night"
            ],
            "desc": [
              "What tone preset do you wish to apply?"
            ],
            "default": [
              "Sepia"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the tone change."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    },
    {
      "id": "VN-C29",
      "key": "Tone_CustomToneBust",
      "storageKey": "Tone_CustomToneBust",
      "surface": "command",
      "label": "TONE: Target Tone for Bust(s)",
      "description": "Use a custom target tone for the bust(s).",
      "nativeDefault": "",
      "metadata": {
        "text": [
          "TONE: Target Tone for Bust(s)"
        ],
        "desc": [
          "Use a custom target tone for the bust(s)."
        ]
      },
      "context": "map/common-event/troop interpreter Four finite numeric components [red, green, blue, gray]. Use RGB offsets -255..255: negative subtracts color, positive adds color, zero is neutral. Use gray 0..255: zero preserves saturation and 255 is grayscale. Example [34,34,34,0]. Supply a JavaScript source string to eval-encoded fields; this is not a hex color or RGBA alpha.",
      "availability": "implemented",
      "examples": [
        {
          "code": 357,
          "indent": 0,
          "parameters": [
            "Coreto_2_VNPictureBusts",
            "Tone_CustomToneBust",
            "TONE: Target Tone for Bust(s)",
            {
              "PictureID:arrayeval": "[\"1\"]",
              "customTone:eval": "[0, 0, 0, 0]",
              "Duration:eval": "20"
            }
          ]
        }
      ],
      "args": [
        {
          "id": "VN-C29/PictureID:arrayeval",
          "key": "PictureID",
          "storageKey": "PictureID:arrayeval",
          "surface": "argument",
          "label": "Picture ID(s)",
          "description": "What Picture ID(s) to associate with this command?\nYou may use JavaScript code.",
          "encoding": "arrayeval",
          "nativeDefault": "[\"1\"]",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[\"1\"]"
          ]
        },
        {
          "id": "VN-C29/customTone:eval",
          "key": "customTone",
          "storageKey": "customTone:eval",
          "surface": "argument",
          "label": "Custom Tone",
          "description": "Four finite numeric components [red, green, blue, gray]. Use RGB offsets -255..255: negative subtracts color, positive adds color, zero is neutral. Use gray 0..255: zero preserves saturation and 255 is grayscale. Example [34,34,34,0]. Supply a JavaScript source string to eval-encoded fields; this is not a hex color or RGBA alpha.",
          "encoding": "eval",
          "nativeDefault": "[0, 0, 0, 0]",
          "metadata": {
            "text": [
              "Custom Tone"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Four finite numeric components [red, green, blue, gray]. Use RGB offsets -255..255: negative subtracts color, positive adds color, zero is neutral. Use gray 0..255: zero preserves saturation and 255 is grayscale. Example [34,34,34,0]. Supply a JavaScript source string to eval-encoded fields; this is not a hex color or RGBA alpha."
            ],
            "default": [
              "[0, 0, 0, 0]"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "[0, 0, 0, 0]"
          ]
        },
        {
          "id": "VN-C29/Duration:eval",
          "key": "Duration",
          "storageKey": "Duration:eval",
          "surface": "argument",
          "label": "Duration",
          "description": "Duration in frames for the tone change.",
          "encoding": "eval",
          "nativeDefault": "20",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the tone change."
            ],
            "default": [
              "20"
            ]
          },
          "context": "map/common-event/troop interpreter",
          "availability": "implemented",
          "examples": [
            "20"
          ]
        }
      ],
      "editorArgs": [
        {
          "key": "PictureID:arrayeval",
          "metadata": {
            "text": [
              "Picture ID(s)"
            ],
            "type": [
              "string[]"
            ],
            "desc": [
              "What Picture ID(s) to associate with this command?\nYou may use JavaScript code."
            ],
            "default": [
              "[\"1\"]"
            ]
          }
        },
        {
          "key": "customTone:eval",
          "metadata": {
            "text": [
              "Custom Tone"
            ],
            "parent": [
              "PictureID:arrayeval"
            ],
            "desc": [
              "Four finite numeric components [red, green, blue, gray]. Use RGB offsets -255..255: negative subtracts color, positive adds color, zero is neutral. Use gray 0..255: zero preserves saturation and 255 is grayscale. Example [34,34,34,0]. Supply a JavaScript source string to eval-encoded fields; this is not a hex color or RGBA alpha."
            ],
            "default": [
              "[0, 0, 0, 0]"
            ]
          }
        },
        {
          "key": "Duration:eval",
          "metadata": {
            "text": [
              "Duration"
            ],
            "desc": [
              "Duration in frames for the tone change."
            ],
            "default": [
              "20"
            ]
          }
        }
      ],
      "dependencies": [
        "Core Engine"
      ]
    }
  ],
  "apis": [
    {
      "id": "VN-A01",
      "key": "Settings, HorzMirrorCheck",
      "surface": "runtime-api",
      "description": "Coreto.VNPictureBusts and VisuMZ.VNPictureBusts reference the same API object. Settings contains numeric AnchorX, AnchorY, ScaleX, ScaleY; numeric-array InvertedScale; functions ScreenX(position), ScreenY(position); and numeric-array brightTone/dimTone. Settings values are effective decoded configuration and can be changed in memory. HorzMirrorCheck(mode, position) uses this.Settings.InvertedScale: Mirror=true, Auto=includes(position), Auto-Reverse=!includes(position), other modes=false (case-insensitive after trimming). Use an integer position 0..10; keep the API receiver when calling. version identifies the compatibility API 1.03; provider identifies Coreto_2_VNPictureBusts and providerVersion its own 0.1.0. Mutating Settings does not rewrite plugin parameters or invalidate coordinate cache.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "const vn = Coreto.VNPictureBusts; const mirrored = vn.HorzMirrorCheck(\"Auto\", 3);"
      ],
      "members": [
        "Settings",
        "HorzMirrorCheck(mode, position)",
        "version",
        "provider",
        "providerVersion"
      ],
      "receiver": "Coreto.VNPictureBusts",
      "returns": "HorzMirrorCheck returns boolean; Settings is a mutable object."
    },
    {
      "id": "VN-A02",
      "key": "ImageManager.vnPictureBustPosition, _vnPictureBustCoordinates",
      "surface": "runtime-api",
      "description": "ImageManager.vnPictureBustPosition(position) accepts an integer 0..10 and returns the cached {x,y} pixel coordinates. On first call it computes all 11 entries using Settings.ScreenX/ScreenY and rounds them. Other positions, including fractions, throw if absent. The returned object is shared cache data; copy it before modifying. Settings changes or resize do not invalidate the cache automatically. After changing coordinate functions, set ImageManager._vnPictureBustCoordinates=null to rebuild on the next lookup; existing pictures do not move automatically.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "const xy = {...ImageManager.vnPictureBustPosition(3)};",
        "Coreto.VNPictureBusts.Settings.ScreenX = position => 100 + position * 50; ImageManager._vnPictureBustCoordinates = null; const updated = ImageManager.vnPictureBustPosition(3);"
      ],
      "receiver": "ImageManager",
      "returns": "{x:number,y:number} shared cached object."
    },
    {
      "id": "VN-A03",
      "key": "Game_Picture.initVnPictureBusts, setVnBustPosition, getVnBustPosition",
      "surface": "runtime-api",
      "description": "On a Game_Picture instance, initVnPictureBusts() resets its logical slot to -1. Initialization runs automatically for new pictures; getVnBustPosition() lazily initializes missing state and returns the stored slot. setVnBustPosition(position) stores Number(position)||0 without clamping or moving the picture. For ordinary slots supply an integer 0..10. Setting a slot does not apply ScreenX/ScreenY; movement commands do that separately. Do not call init merely to query a picture because it discards its stored slot.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "const picture = $gameScreen.picture(1); const previousSlot = picture.getVnBustPosition(); picture.setVnBustPosition(3);"
      ],
      "receiver": "Game_Picture instance obtained from $gameScreen.picture(id).",
      "returns": "getVnBustPosition returns a number; setters/init return undefined."
    },
    {
      "id": "VN-A04",
      "key": "Game_Picture.setVnBustAnchor, vnSetDuration",
      "surface": "runtime-api",
      "description": "picture.setVnBustAnchor(start, target) uses current Settings.AnchorX/AnchorY. Truthy start applies the current anchor; truthy target applies the target anchor. The target also updates whenever picture._duration<=0. picture.vnSetDuration(duration) sets both remaining and whole movement duration to Math.max(duration,1) frames; use a finite nonnegative integer. It does not set target coordinates/scales/opacity or choose easing. For an anchor transition, establish duration first, then set the target anchor while retaining valid picture movement targets.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "const picture = $gameScreen.picture(1); picture.vnSetDuration(20); picture.setVnBustAnchor(false, true);"
      ],
      "receiver": "Game_Picture instance.",
      "returns": "Both methods return undefined."
    },
    {
      "id": "VN-A05",
      "key": "vnChangeGraphic, vnPostChangeGraphic",
      "surface": "runtime-api",
      "description": "picture.vnChangeGraphic(name) asynchronously loads a picture name from img/pictures without .png, then calls vnPostChangeGraphic(name) to set the name. It returns immediately, with no promise or completion callback. Only the latest request for that picture may finish; replacement/erase or switching $gameScreen prevents a stale request from changing a different picture. A detached picture is not protected by a screen slot. vnPostChangeGraphic(name) is the lower-level synchronous assignment and bypasses loading/identity guards; normally call vnChangeGraphic instead. Other picture properties remain unchanged.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "// Assumes img/pictures/BustHappy.png exists.\n$gameScreen.picture(1).vnChangeGraphic(\"BustHappy\");"
      ],
      "receiver": "Game_Picture instance.",
      "returns": "Both methods return undefined."
    },
    {
      "id": "VN-A06",
      "key": "initVnPictureSlightMovements, get/setVnPictureBreathingSettings, applyVnBreathingScaleX/Y",
      "surface": "runtime-api",
      "description": "picture.getVnPictureBreathingSettings() returns the live settings object; setVnPictureBreathingSettings(settings) replaces it with a JSON deep copy. Supply the complete shape {\"enabled\": true, \"speed\": {\"x\": 30, \"y\": 30}, \"rate\": {\"x\": 0.5, \"y\": 0.5}}. Missing fields are not filled by the setter. applyVnBreathingScaleX() / applyVnBreathingScaleY() return the current additive offset in scale percentage points, or 0 when disabled; the picture transform getters apply it automatically, so do not add it again. Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis. Effects have separate settings but share the global frame clock; they do not reset phase when enabled. initVnPictureSlightMovements() creates only missing effect settings; it does not reset existing settings.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "$gameScreen.picture(1).setVnPictureBreathingSettings({\"enabled\": true, \"speed\": {\"x\": 30, \"y\": 30}, \"rate\": {\"x\": 0.5, \"y\": 0.5}});"
      ],
      "receiver": "Game_Picture instance, except updatePositionVnFidgeting on Sprite_Picture.",
      "returns": "Getters return settings; apply methods return number; setters/init return undefined."
    },
    {
      "id": "VN-A07",
      "key": "get/setVnPictureFidgetingSettings, isVnPictureFidgeting, applyVnFidgetingScaleX/Y, updatePositionVnFidgeting",
      "surface": "runtime-api",
      "description": "picture.getVnPictureFidgetingSettings() returns the live settings object; setVnPictureFidgetingSettings(settings) replaces it with a JSON deep copy. Supply the complete shape {\"enabled\": true, \"speed\": {\"x\": 30, \"y\": 30}, \"rate\": {\"x\": 5, \"y\": 5}}. Missing fields are not filled by the setter. applyVnFidgetingScaleX() / applyVnFidgetingScaleY() return the current additive offset in pixels, or 0 when disabled; the picture transform getters apply it automatically, so do not add it again. Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis. Y fidgeting uses cos(phase)*rate/2+rate/2, ranging 0..rate; other components use cos(phase)*rate. Effects have separate settings but share the global frame clock; they do not reset phase when enabled. isVnPictureFidgeting() returns the enabled flag. Sprite_Picture.updatePositionVnFidgeting() (a different receiver) assigns its sprite coordinates from the picture x()/y() getters, retaining fractional motion. The update hook invokes it automatically. Despite the Scale suffix, these two apply methods return position offsets.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "$gameScreen.picture(1).setVnPictureFidgetingSettings({\"enabled\": true, \"speed\": {\"x\": 30, \"y\": 30}, \"rate\": {\"x\": 5, \"y\": 5}});"
      ],
      "receiver": "Game_Picture instance, except updatePositionVnFidgeting on Sprite_Picture.",
      "returns": "Getters return settings; apply methods return number; setters/init return undefined."
    },
    {
      "id": "VN-A08",
      "key": "get/setVnPictureSwayingSettings, applyVnSwaying",
      "surface": "runtime-api",
      "description": "picture.getVnPictureSwayingSettings() returns the live settings object; setVnPictureSwayingSettings(settings) replaces it with a JSON deep copy. Supply the complete shape {\"enabled\": true, \"speed\": {\"angle\": 30}, \"rate\": {\"angle\": 2}}. Missing fields are not filled by the setter. applyVnSwaying() return the current additive offset in degrees, or 0 when disabled; the picture transform getters apply it automatically, so do not add it again. Speed is the divisor in cos(Graphics.frameCount / (speed || 0.01)); one cycle is approximately 2*pi*abs(speed) game frames. Use a finite positive number such as 30 (about 188.5 frames per cycle); zero uses 0.01 rather than disabling the effect. A negative speed produces the same cosine. Rate 0 disables motion on that axis. Effects have separate settings but share the global frame clock; they do not reset phase when enabled.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "$gameScreen.picture(1).setVnPictureSwayingSettings({\"enabled\": true, \"speed\": {\"angle\": 30}, \"rate\": {\"angle\": 2}});"
      ],
      "receiver": "Game_Picture instance, except updatePositionVnFidgeting on Sprite_Picture.",
      "returns": "Getters return settings; apply methods return number; setters/init return undefined."
    },
    {
      "id": "VN-A09",
      "key": "requestPictureAnimation, retrievePictureAnimation, _pictureAnimationQueue",
      "surface": "runtime-api",
      "description": "$gameTemp.requestPictureAnimation(targets, animationId, mirror) enqueues {targets,animationId,mirror} if $dataAnimations[animationId] exists; otherwise it does nothing. Supply an array of exact logical picture IDs in the active bank, an existing animation database ID, and a boolean mirror. The array is retained by reference; do not mutate it after requesting. retrievePictureAnimation() removes and returns the oldest request (undefined when empty), so it is not a peek. The spriteset consumes requests during updatePictureAnimations; scene termination clears the transient queue and it is not restored as an active animation from save. Requests do not themselves wait for completion.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "// Assumes picture 1 and database animation 1 exist.\n$gameTemp.requestPictureAnimation([1], 1, false);"
      ],
      "receiver": "$gameTemp (Game_Temp instance).",
      "returns": "request returns undefined; retrieve returns the request object or undefined."
    },
    {
      "id": "VN-A10",
      "key": "vnAutoErasePicture",
      "surface": "runtime-api",
      "description": "$gameScreen.vnAutoErasePicture(id, retries) targets the current real picture-bank slot and polls base opacity _opacity. If it is already<=0, erasure is immediate. Otherwise it checks up to retries further times at 100ms intervals, then abandons the request if still visible. Use a finite nonnegative integer; 0 performs only the initial check, negative values schedule nothing. A new request replaces the old timer for that slot. Picture replacement/erase, changing game-screen identity or clearing pictures cancels stale work. This does not fade the picture: start a fade separately. Timer scheduling uses wall-clock milliseconds, not game frames.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "$gameScreen.vnAutoErasePicture(1, 20); // 20 retries spaced by 100 ms, nominally about 2 seconds; schedule a fade separately"
      ],
      "receiver": "$gameScreen (Game_Screen instance).",
      "returns": "undefined; erasure is asynchronous unless already transparent."
    },
    {
      "id": "VN-A11",
      "key": "createPictureEffectsContainer, updatePictureAnimations, processPictureAnimationRequests, createPictureAnimation, createPictureAnimationSprite, makePictureTargetSprites, findPictureTargetSprite",
      "surface": "runtime-api",
      "description": "Methods on the active Spriteset_Base instance: createPictureEffectsContainer() creates the VN animation container/list once, normally called by createPictures; do not call it again on an initialized spriteset. updatePictureAnimations() removes finished sprites then drains requests via processPictureAnimationRequests(). createPictureAnimation(request) accepts {targets:[pictureIds],animationId,mirror} and selects per-target grouping/delays. createPictureAnimationSprite(targets, animation, mirror, delay) takes picture IDs, a $dataAnimations record, boolean mirror and frame delay; it chooses MZ/MV animation type, requires existing drawable picture sprites and appends the created sprite to _vnPictureAnimationSprites. makePictureTargetSprites(ids) returns found Sprite_Picture instances; findPictureTargetSprite(id) returns the matching sprite or undefined. Hooks call the normal lifecycle automatically. For authored effects prefer $gameTemp.requestPictureAnimation; manual creation is for extension code after the container exists.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "const spriteset = SceneManager._scene._spriteset; const target = spriteset.findPictureTargetSprite(1);",
        "$gameTemp.requestPictureAnimation([1], 1, false); // normal queued path with existing picture/animation 1"
      ],
      "receiver": "SceneManager._scene._spriteset after createPictures().",
      "returns": "find returns Sprite_Picture or undefined; make returns an array; lifecycle/create methods return undefined."
    },
    {
      "id": "VN-A12",
      "key": "removePictureAnimation, removeAllPictureAnimations, isPictureAnimationPlaying",
      "surface": "runtime-api",
      "description": "spriteset.isPictureAnimationPlaying() is true while _vnPictureAnimationSprites is nonempty; it does not inspect queued requests or unrelated engine animations. updatePictureAnimations removes finished sprites on its next update. removePictureAnimation(sprite) accepts a sprite in this owned list, removes/destroys it and ignores a foreign sprite. removeAllPictureAnimations() removes all owned active sprites but does not drain the request queue. Normal scene termination also clears queued requests. The interpreter pictureAnimation wait mode checks the active-list query each update.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "const spriteset = SceneManager._scene._spriteset; const playing = spriteset.isPictureAnimationPlaying();",
        "SceneManager._scene._spriteset.removeAllPictureAnimations(); // cancels active VN picture animations"
      ],
      "receiver": "SceneManager._scene._spriteset after createPictures().",
      "returns": "isPictureAnimationPlaying returns boolean; removal methods return undefined."
    },
    {
      "id": "VN-A13",
      "key": "Hooks de picture, interpreter e spriteset",
      "surface": "runtime-api",
      "description": "Automatic hooks extend the listed native prototype methods. Game_Temp.initialize prepares the queue; Game_Picture.initialize prepares logical position/effect settings; updateMove finalizes targets; scaleX/scaleY/x/y/angle add effects; Sprite_Picture.updatePosition applies fidgeting; interpreter updateWaitMode handles pictureAnimation; spriteset createPictures/updateAnimations/removeAllAnimations own the animation lifecycle; Sprite_Animation.targetSpritePosition handles picture targets. Authors normally use VN plugin commands; they do not invoke these hooks as a setup sequence. Extension plugins loaded after VN may wrap a native method, preserving this, all arguments and its return, and calling the previous method exactly once. Alternatively use the public alias slots described by VN-A14. Never replace a hook without chaining or manually reinitialize a live object.",
      "availability": "implemented",
      "context": "Use from an MZ event Script or an extension plugin loaded after Coreto_2_VNPictureBusts, with Core Engine already active. These methods run in the game; the CLI only describes them. Examples use an existing picture in the current map/battle picture bank unless stated otherwise.",
      "examples": [
        "const previous = Game_Picture.prototype.updateMove; Game_Picture.prototype.updateMove = function(...args) { const result = previous.apply(this, args); /* extension work here */ return result; };"
      ],
      "members": [
        "Game_Temp.prototype.initialize",
        "Game_Picture.prototype.initialize",
        "Game_Picture.prototype.updateMove",
        "Game_Picture.prototype.scaleX",
        "Game_Picture.prototype.scaleY",
        "Game_Picture.prototype.x",
        "Game_Picture.prototype.y",
        "Game_Picture.prototype.angle",
        "Sprite_Picture.prototype.updatePosition",
        "Game_Interpreter.prototype.updateWaitMode",
        "Spriteset_Base.prototype.createPictures",
        "Spriteset_Base.prototype.updateAnimations",
        "Spriteset_Base.prototype.removeAllAnimations",
        "Sprite_Animation.prototype.targetSpritePosition"
      ],
      "receiver": "The instance owning each listed prototype method; installed automatically at plugin load.",
      "returns": "Each wrapper preserves the native method return contract."
    },
    {
      "id": "VN-A14",
      "key": "Slots de aliases Coreto.VNPictureBusts",
      "surface": "runtime-api",
      "description": "Slots públicos encadeáveis ao método anterior; conservar receptor, argumentos e retorno e chamar uma vez. Use os membros listados após carregar o plugin.",
      "availability": "implemented",
      "context": "runtime MZ",
      "examples": [
        "const previous = Coreto.VNPictureBusts.Game_Picture_updateMove; Coreto.VNPictureBusts.Game_Picture_updateMove = function(...args) { return previous.apply(this, args); };"
      ],
      "members": [
        "Coreto.VNPictureBusts.Game_Temp_initialize",
        "Coreto.VNPictureBusts.Game_Picture_initialize",
        "Coreto.VNPictureBusts.Game_Picture_updateMove",
        "Coreto.VNPictureBusts.Game_Picture_scaleX",
        "Coreto.VNPictureBusts.Game_Picture_scaleY",
        "Coreto.VNPictureBusts.Game_Picture_x",
        "Coreto.VNPictureBusts.Game_Picture_y",
        "Coreto.VNPictureBusts.Game_Picture_angle",
        "Coreto.VNPictureBusts.Sprite_Picture_updatePosition",
        "Coreto.VNPictureBusts.Game_Interpreter_updateWaitMode",
        "Coreto.VNPictureBusts.Spriteset_Base_createPictures",
        "Coreto.VNPictureBusts.Spriteset_Base_updateAnimations",
        "Coreto.VNPictureBusts.Spriteset_Base_removeAllAnimations",
        "Coreto.VNPictureBusts.Sprite_Animation_targetSpritePosition"
      ]
    }
  ],
  "editorParameters": [
    {
      "key": "BreakHead",
      "metadata": {
        "text": [
          "--------------------------"
        ],
        "default": [
          "----------------------------------"
        ]
      }
    },
    {
      "key": "VNPictureBusts",
      "metadata": {
        "default": [
          "Plugin Parameters"
        ]
      }
    },
    {
      "key": "ATTENTION",
      "metadata": {
        "default": [
          "READ THE HELP FILE"
        ]
      }
    },
    {
      "key": "BreakSettings",
      "metadata": {
        "text": [
          "--------------------------"
        ],
        "default": [
          "----------------------------------"
        ]
      }
    },
    {
      "key": "Anchor",
      "metadata": {
        "text": [
          "Anchor Settings"
        ]
      }
    },
    {
      "key": "AnchorX:num",
      "metadata": {
        "text": [
          "Anchor X"
        ],
        "parent": [
          "Anchor"
        ],
        "desc": [
          "Determines the anchor/origin X setting for Picture Busts.\n0.0 is left, 0.5 is center, 1.0 is right."
        ],
        "default": [
          "0.5"
        ]
      },
      "id": "VN-P01"
    },
    {
      "key": "AnchorY:num",
      "metadata": {
        "text": [
          "Anchor Y"
        ],
        "parent": [
          "Anchor"
        ],
        "desc": [
          "Determines the anchor/origin Y setting for Picture Busts.\n0.0 is top, 0.5 is middle, 1.0 is bottom."
        ],
        "default": [
          "1.0"
        ]
      },
      "id": "VN-P02"
    },
    {
      "key": "Scale",
      "metadata": {
        "text": [
          "Scale Settings"
        ]
      }
    },
    {
      "key": "ScaleX:num",
      "metadata": {
        "text": [
          "Scale X"
        ],
        "parent": [
          "Scale"
        ],
        "desc": [
          "Scale X adjustment settings for Picture Busts.\nValue scale: 100 = 100% = 1.0"
        ],
        "default": [
          "100"
        ]
      },
      "id": "VN-P03"
    },
    {
      "key": "ScaleY:num",
      "metadata": {
        "text": [
          "Scale Y"
        ],
        "parent": [
          "Scale"
        ],
        "desc": [
          "Scale Y adjustment settings for Picture Busts.\nValue scale: 100 = 100% = 1.0"
        ],
        "default": [
          "100"
        ]
      },
      "id": "VN-P04"
    },
    {
      "key": "InvertedScale:arraynum",
      "metadata": {
        "text": [
          "Mirror Horizontally"
        ],
        "parent": [
          "Scale"
        ],
        "type": [
          "number[]"
        ],
        "max": [
          "10"
        ],
        "desc": [
          "Which positions will be mirrored horizontally?\nYou want your Busts facing the center of the screen."
        ],
        "default": [
          "[\"0\",\"1\",\"2\",\"3\",\"4\"]"
        ]
      },
      "id": "VN-P05"
    },
    {
      "key": "Screen",
      "metadata": {
        "text": [
          "Screen Positioning"
        ]
      }
    },
    {
      "key": "ScreenX:func",
      "metadata": {
        "text": [
          "JS: Position X"
        ],
        "parent": [
          "Screen"
        ],
        "type": [
          "note"
        ],
        "desc": [
          "Code to determine used to calculate the X coordinate\nfor each screen position."
        ],
        "default": [
          "\"// Declare Arguments\\nconst position = arguments[0].clamp(0, 10);\\n\\n// Declare Variables\\nconst bufferX = 200;\\nconst width = Graphics.width - (bufferX * 2);\\n\\n// Calculate X Position\\nx = Math.round(position * width / 10) + bufferX;\\nx = x.clamp(bufferX, Graphics.width - bufferX);\\n\\n// Return X Value\\nreturn x;\""
        ]
      },
      "id": "VN-P06"
    },
    {
      "key": "ScreenY:func",
      "metadata": {
        "text": [
          "JS: Position Y"
        ],
        "parent": [
          "Screen"
        ],
        "type": [
          "note"
        ],
        "desc": [
          "Code to determine used to calculate the Y coordinate\nfor each screen position."
        ],
        "default": [
          "\"// Declare Arguments\\nconst position = arguments[0].clamp(0, 10);\\n\\n// Declare Variables\\nconst stagger = 0;\\nconst difference = 5 - Math.abs(5 - position);\\nlet y = Graphics.height;\\n\\n// Calculate Y Position\\ny = Graphics.height + Math.round(difference * stagger) + 5;\\n\\n// Return Y Value\\nreturn y;\""
        ]
      },
      "id": "VN-P07"
    },
    {
      "key": "Tone",
      "metadata": {
        "text": [
          "Tone Presets"
        ]
      }
    },
    {
      "key": "brightTone:eval",
      "metadata": {
        "text": [
          "Bright Tone"
        ],
        "parent": [
          "Tone"
        ],
        "desc": [
          "What tone do you want for brightness?\nFormat: [Red, Green, Blue, Gray]"
        ],
        "default": [
          "[34, 34, 34, 0]"
        ]
      },
      "id": "VN-P08"
    },
    {
      "key": "dimTone:eval",
      "metadata": {
        "text": [
          "Dim Tone"
        ],
        "parent": [
          "Tone"
        ],
        "desc": [
          "What tone do you want for dimming?\nFormat: [Red, Green, Blue, Gray]"
        ],
        "default": [
          "[-34, -34, 0, 34]"
        ]
      },
      "id": "VN-P09"
    },
    {
      "key": "BreakEnd1",
      "metadata": {
        "text": [
          "--------------------------"
        ],
        "default": [
          "----------------------------------"
        ]
      }
    },
    {
      "key": "End Of",
      "metadata": {
        "default": [
          "Plugin Parameters"
        ]
      }
    },
    {
      "key": "BreakEnd2",
      "metadata": {
        "text": [
          "--------------------------"
        ],
        "default": [
          "----------------------------------"
        ]
      }
    }
  ],
  "editorCommands": [
    {
      "key": "Separator_Basic",
      "metadata": {
        "text": [
          "-"
        ],
        "desc": [
          "-"
        ]
      }
    },
    {
      "key": "Category_Basic",
      "metadata": {
        "text": [
          "Category - Basic"
        ],
        "desc": [
          "These are basic Picture Bust Plugin Commands."
        ]
      }
    },
    {
      "key": "Basic_EnterBust",
      "metadata": {
        "text": [
          "BASIC: Enter Bust"
        ],
        "desc": [
          "Generic entrance for ONE picture bust.\nWalks in from a little behind and fades in."
        ]
      }
    },
    {
      "key": "Basic_ExitBusts",
      "metadata": {
        "text": [
          "BASIC: Exit Bust(s)"
        ],
        "desc": [
          "Generic exit for picture bust(s).\nWalks back and fades out."
        ]
      }
    },
    {
      "key": "Basic_GraphicChange",
      "metadata": {
        "text": [
          "BASIC: Graphic Change"
        ],
        "desc": [
          "Changes ONE bust's graphic without changing any of its other\nproperties. Useful for quickly changing facial expressions."
        ]
      }
    },
    {
      "key": "Basic_MirrorBust",
      "metadata": {
        "text": [
          "BASIC: Mirror Bust(s)"
        ],
        "desc": [
          "Change the facing direction the bust(s).\nThis alters the horizontal scaling of the bust(s)."
        ]
      }
    },
    {
      "key": "Basic_OriginChange",
      "metadata": {
        "text": [
          "BASIC: Origin Change Bust(s)"
        ],
        "desc": [
          "Change the origin/anchor for bust(s)."
        ]
      }
    },
    {
      "key": "Basic_PlayAniBust",
      "metadata": {
        "text": [
          "BASIC: Play Animation on Bust(s)"
        ],
        "desc": [
          "Plays a specific battle animation on bust(s)."
        ]
      }
    },
    {
      "key": "Separator_Breathing",
      "metadata": {
        "text": [
          "-"
        ],
        "desc": [
          "-"
        ]
      }
    },
    {
      "key": "Category_Breathing",
      "metadata": {
        "text": [
          "Category - Breathing"
        ],
        "desc": [
          "These are breathing related Picture Plugin Commands."
        ]
      }
    },
    {
      "key": "Breathing_Enable",
      "metadata": {
        "text": [
          "BREATHING: Start"
        ],
        "desc": [
          "Start breathing aspect for selected bust(s).\nMakes it look like the bust graphic is more alive."
        ]
      }
    },
    {
      "key": "Breathing_Disable",
      "metadata": {
        "text": [
          "BREATHING: Stop"
        ],
        "desc": [
          "Stops breathing aspect for selected bust(s).\nThe bust graphic becomes static."
        ]
      }
    },
    {
      "key": "Separator_Fade",
      "metadata": {
        "text": [
          "-"
        ],
        "desc": [
          "-"
        ]
      }
    },
    {
      "key": "Category_Fade",
      "metadata": {
        "text": [
          "Category - Fade"
        ],
        "desc": [
          "These are fading related Picture Plugin Commands."
        ]
      }
    },
    {
      "key": "Fade_FadeIn",
      "metadata": {
        "text": [
          "FADE: Fade In Bust(s)"
        ],
        "desc": [
          "Brings selected picture bust(s) opacity levels to 255."
        ]
      }
    },
    {
      "key": "Fade_FadeOut",
      "metadata": {
        "text": [
          "FADE: Fade Out Bust(s)"
        ],
        "desc": [
          "Brings selected picture bust(s) opacity levels to 0."
        ]
      }
    },
    {
      "key": "Fade_OpacityBy",
      "metadata": {
        "text": [
          "FADE: Opacity By X, Bust(s)"
        ],
        "desc": [
          "Adjusts selected picture bust(s) opacity levels relatively."
        ]
      }
    },
    {
      "key": "Fade_OpacityTo",
      "metadata": {
        "text": [
          "FADE: Opacity To X, Bust(s)"
        ],
        "desc": [
          "Brings selected picture bust(s) opacity levels to a custom value."
        ]
      }
    },
    {
      "key": "Separator_Fidgeting",
      "metadata": {
        "text": [
          "-"
        ],
        "desc": [
          "-"
        ]
      }
    },
    {
      "key": "Category_Fidgeting",
      "metadata": {
        "text": [
          "Category - Fidgeting"
        ],
        "desc": [
          "These are fidgeting related Picture Plugin Commands."
        ]
      }
    },
    {
      "key": "Fidgeting_Enable",
      "metadata": {
        "text": [
          "FIDGETING: Start"
        ],
        "desc": [
          "Starts fidgeting aspect for selected bust(s).\nBust graphic moves back and forth."
        ]
      }
    },
    {
      "key": "Fidgeting_Disable",
      "metadata": {
        "text": [
          "FIDGETING: Stop"
        ],
        "desc": [
          "Stops fidgeting aspect for selected bust(s).\nThe bust graphic becomes stationary."
        ]
      }
    },
    {
      "key": "Separator_Move",
      "metadata": {
        "text": [
          "-"
        ],
        "desc": [
          "-"
        ]
      }
    },
    {
      "key": "Category_Move",
      "metadata": {
        "text": [
          "Category - Movement"
        ],
        "desc": [
          "These are movement-related Picture Bust Plugin Commands."
        ]
      }
    },
    {
      "key": "Move_MoveByCoordinates",
      "metadata": {
        "text": [
          "MOVE: Move Bust(s) By Coordinates"
        ],
        "desc": [
          "Move bust(s) relative to current coordinates(s)."
        ]
      }
    },
    {
      "key": "Move_MoveByPosition",
      "metadata": {
        "text": [
          "MOVE: Move Bust(s) By Position"
        ],
        "desc": [
          "Move bust(s) relative to current position(s)."
        ]
      }
    },
    {
      "key": "Move_MoveToCoordinates",
      "metadata": {
        "text": [
          "MOVE: Move Bust(s) to Coordinates"
        ],
        "desc": [
          "Move bust(s) to exact coordinates(s)."
        ]
      }
    },
    {
      "key": "Move_MoveToPosition",
      "metadata": {
        "text": [
          "MOVE: Move Bust(s) to Position"
        ],
        "desc": [
          "Move bust(s) to the predetermined position."
        ]
      }
    },
    {
      "key": "Move_ResetToPosition",
      "metadata": {
        "text": [
          "MOVE: Reset Bust(s) to Position"
        ],
        "desc": [
          "Reset bust(s) to the current position(s)."
        ]
      }
    },
    {
      "key": "Separator_Scale",
      "metadata": {
        "text": [
          "-"
        ],
        "desc": [
          "-"
        ]
      }
    },
    {
      "key": "Category_Scale",
      "metadata": {
        "text": [
          "Category - Scaling"
        ],
        "desc": [
          "These are scaling-related Picture Bust Plugin Commands."
        ]
      }
    },
    {
      "key": "Scale_ScaleBy",
      "metadata": {
        "text": [
          "SCALE: Scale Bust(s) By"
        ],
        "desc": [
          "Scale bust(s) by specific amounts.\nValue scale: 100 = 100% = 1.0"
        ]
      }
    },
    {
      "key": "Scale_ScaleTo",
      "metadata": {
        "text": [
          "SCALE: Scale Bust(s) To"
        ],
        "desc": [
          "Scale bust(s) to specific values.\nValue scale: 100 = 100% = 1.0"
        ]
      }
    },
    {
      "key": "Scale_ScaleReset",
      "metadata": {
        "text": [
          "SCALE: Scale Reset Bust(s)"
        ],
        "desc": [
          "Resets the scale for bust(s) to the default\nsettings in the Plugin Parameters."
        ]
      }
    },
    {
      "key": "Separator_Swaying",
      "metadata": {
        "text": [
          "-"
        ],
        "desc": [
          "-"
        ]
      }
    },
    {
      "key": "Category_Swaying",
      "metadata": {
        "text": [
          "Category - Swaying"
        ],
        "desc": [
          "These are swaying related Picture Plugin Commands."
        ]
      }
    },
    {
      "key": "Swaying_Enable",
      "metadata": {
        "text": [
          "SWAYING: Start"
        ],
        "desc": [
          "Starts swaying aspect for selected bust(s).\nThe bust sways its angle back and forth."
        ]
      }
    },
    {
      "key": "Swaying_Disable",
      "metadata": {
        "text": [
          "SWAYING: Stop"
        ],
        "desc": [
          "Stops swaying aspect for selected bust(s).\nThe no longer sways back and forth."
        ]
      }
    },
    {
      "key": "Separator_Tone",
      "metadata": {
        "text": [
          "-"
        ],
        "desc": [
          "-"
        ]
      }
    },
    {
      "key": "Category_Tone",
      "metadata": {
        "text": [
          "Category - Tone"
        ],
        "desc": [
          "These are tone-related Picture Bust Plugin Commands."
        ]
      }
    },
    {
      "key": "Tone_BrightBust",
      "metadata": {
        "text": [
          "TONE: Bright Bust(s)"
        ],
        "desc": [
          "Brighten bust(s) to use the Tone settings\nfound in the Plugin Parameters."
        ]
      }
    },
    {
      "key": "Tone_DimBust",
      "metadata": {
        "text": [
          "TONE: Dim Bust(s)"
        ],
        "desc": [
          "Dims bust(s) to use the Tone settings\nfound in the Plugin Parameters."
        ]
      }
    },
    {
      "key": "Tone_NormalBust",
      "metadata": {
        "text": [
          "TONE: Normal Bust(s)"
        ],
        "desc": [
          "Normalize bust(s) to no tone at all."
        ]
      }
    },
    {
      "key": "Tone_PresetBust",
      "metadata": {
        "text": [
          "TONE: Preset Tone for Bust(s)"
        ],
        "desc": [
          "Use RPG Maker MZ's present tones/tints for bust(s)."
        ]
      }
    },
    {
      "key": "Tone_CustomToneBust",
      "metadata": {
        "text": [
          "TONE: Target Tone for Bust(s)"
        ],
        "desc": [
          "Use a custom target tone for the bust(s)."
        ]
      }
    },
    {
      "key": "Separator_End",
      "metadata": {
        "text": [
          "-"
        ],
        "desc": [
          "-"
        ]
      }
    }
  ],
  "limits": "A maioria dos comandos VN limita IDs a 1–100; GraphicChange e PlayAni usam IDs exatos; isto não altera maxPictures do projeto. Expressões são resolvidas somente no jogo.",
  "namespace": "vn"
};
const configurationSourceField = {
    id: 'CORETO-CONFIG-SOURCE',
    key: 'CoretoConfigSource',
    storageKey: 'CoretoConfigSource',
    label: 'Configuration source',
    description: 'inherit reads the original entry when present; own reads this entry. Switching does not copy values.',
    type: 'string',
    editorType: 'select',
    options: ['inherit', 'own'],
    default: 'inherit',
    nativeDefault: 'inherit',
    availability: 'supported'
};

function configurationSelection(catalog, parameters) {
    if (Object.hasOwn(parameters, 'CoretoConfigSource')) {
        return {configuredSource: parameters.CoretoConfigSource, format: 'canonical', migrationRequired: false};
    }
    const oldVn = catalog.pluginId === 'Coreto_2_VNPictureBusts';
    if (oldVn && Object.hasOwn(parameters, 'ConfigurationSource') && !['own', 'legacy-if-present'].includes(parameters.ConfigurationSource)) {
        const error = new Error('Use own or legacy-if-present for the historical VN selector.');
        error.code = 'INVALID_CONFIGURATION_SOURCE';
        error.exitCode = 2;
        throw error;
    }
    const configuredSource = oldVn && parameters.ConfigurationSource === 'own' ? 'own'
        : ['Coreto_0_CoreEngine', 'Coreto_1_MessageCore'].includes(catalog.pluginId) ? 'own' : 'inherit';
    return {configuredSource, format: oldVn && Object.hasOwn(parameters, 'ConfigurationSource') ? 'vn-legacy' : 'implicit', migrationRequired: true};
}

function resolvePluginConfiguration(catalog, plugins, {errorPrefix = 'CORETO', allowMissingOwn = false} = {}) {
    const ownEntries = plugins.filter(plugin => plugin.name === catalog.pluginId);
    const originalId = catalog.reference?.pluginId ?? 'VisuMZ_0_CoreEngine';
    const originals = plugins.filter(plugin => plugin.name === originalId);
    function fail(suffix, message) {
        const error = new Error(message);
        error.code = `${errorPrefix}_CONFIG_${suffix}`;
        error.exitCode = 2;
        throw error;
    }
    if (ownEntries.length > 1 || originals.length > 1 || (!allowMissingOwn && ownEntries.length !== 1)) {
        fail('DUPLICATE', 'Use one own entry and at most one original entry.');
    }
    const own = ownEntries[0];
    if (own && (!own.parameters || typeof own.parameters !== 'object' || Array.isArray(own.parameters))) {
        fail('ENCODING', 'Expected own parameter object.');
    }
    const selection = own ? configurationSelection(catalog, own.parameters)
        : {configuredSource: 'inherit', format: 'absent', migrationRequired: false};
    if (!configurationSourceField.options.includes(selection.configuredSource)) {
        fail('SOURCE', 'CoretoConfigSource must be inherit or own.');
    }
    const source = selection.configuredSource === 'inherit' && originals.length ? originals[0] : own;
    return {...selection, own, source, effectiveSource: source?.name ?? catalog.pluginId,
        materialized: selection.configuredSource === 'own', rawParameters: source?.parameters ?? {}};
}

const legacyId = catalog.reference.pluginId;
const ownEntry = $plugins.find(plugin => plugin.name === catalog.pluginId && plugin.status);
const legacyEntry = $plugins.find(plugin => plugin.name === legacyId);
if (!ownEntry) throw new Error(`${catalog.pluginId}: active plugin entry missing.`);
if ($plugins.some(plugin => plugin.name === legacyId && plugin.status) || globalThis.Imported?.[legacyId]) {
    throw new Error(`${catalog.pluginId}: disable ${legacyId} before enabling the replacement.`);
}
const coreEntry = $plugins.find(plugin => plugin.status && ['VisuMZ_0_CoreEngine', 'Coreto_0_CoreEngine'].includes(plugin.name));
if (!coreEntry || $plugins.indexOf(coreEntry) >= $plugins.indexOf(ownEntry) ||
    typeof Game_Picture.prototype.setAnchor !== 'function' || typeof Game_Picture.prototype.setTargetAnchor !== 'function') {
    throw new Error(`${catalog.pluginId}: load Core Engine (original or Coreto) before VN.`);
}
const configuration = resolvePluginConfiguration(catalog, $plugins);
const mode = configuration.configuredSource === 'inherit' ? 'legacy-if-present' : 'own';
const rawSettings = Object.fromEntries(catalog.parameters.filter(field => field.key !== 'CoretoConfigSource').map(field => [field.storageKey, configuration.rawParameters[field.storageKey] ?? field.nativeDefault]));

function convertVnFields(raw) {
    const output = {};
    if (typeof globalThis.VisuMZ?.ConvertParams === 'function') return VisuMZ.ConvertParams(output, raw);
    for (const [storageKey, value] of Object.entries(raw)) {
        const [key, encoding] = storageKey.split(':');
        if (encoding === 'num') output[key] = Number(value);
        else if (encoding === 'str') output[key] = String(value);
        else if (encoding === 'eval') output[key] = value === '' ? null : eval(value);
        else if (encoding === 'arraynum') output[key] = (value === '' ? [] : JSON.parse(value)).map(Number);
        else if (encoding === 'arrayeval') output[key] = (value === '' ? [] : JSON.parse(value)).map(item => eval(item));
        else if (encoding === 'func') output[key] = new Function(value === '' ? 'return 0;' : JSON.parse(value));
        else throw new Error(`${catalog.pluginId}: unsupported encoding ${storageKey}.`);
    }
    return output;
}
const api = {
    version: Number(catalog.reference.version),
    provider: catalog.pluginId,
    providerVersion: catalog.version,
    Settings: convertVnFields(rawSettings),
    configuration: {mode, source: configuration.effectiveSource, configuredSource: configuration.configuredSource, effectiveSource: configuration.effectiveSource, materialized: configuration.materialized},
    catalog
};
globalThis.Imported ??= {};
globalThis.VisuMZ ??= {};
globalThis.Coreto ??= {};
Imported[catalog.pluginId] = true;
Imported[legacyId] = true;
VisuMZ.VNPictureBusts = api;
Coreto.VNPictureBusts = api;
api.HorzMirrorCheck = function(mode, position) {
    switch (mode.toUpperCase().trim()) {
        case 'MIRROR': return true;
        case 'AUTO': return this.Settings.InvertedScale.includes(position);
        case 'AUTO-REVERSE': return !this.Settings.InvertedScale.includes(position);
        default: return false;
    }
};

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

const autoEraseTimers = new WeakMap();
function cancelAutoErase(screen, realId) {
    const timers = autoEraseTimers.get(screen);
    const pending = timers?.get(realId);
    if (!pending) return;
    clearTimeout(pending.timer);
    delete pending.picture._coretoVn.autoErase;
    timers.delete(realId);
}
function cancelScreenAutoErase(screen) {
    const timers = autoEraseTimers.get(screen);
    if (!timers) return;
    for (const realId of timers.keys()) cancelAutoErase(screen, realId);
}
function scheduleVnAutoErase(screen, realId, retries) {
    if (retries < 0) return;
    const picture = screen._pictures[realId];
    if (!picture) return;
    cancelAutoErase(screen, realId);
    picture._coretoVn ??= {schemaVersion: 1};
    const intent = {remainingRetries: retries};
    picture._coretoVn.autoErase = intent;
    let timers = autoEraseTimers.get(screen);
    if (!timers) { timers = new Map(); autoEraseTimers.set(screen, timers); }
    const pending = {picture, timer: null};
    timers.set(realId, pending);
    const poll = () => {
        if (globalThis.$gameScreen !== screen || screen._pictures[realId] !== picture || picture._coretoVn.autoErase !== intent) {
            cancelAutoErase(screen, realId);
            return;
        }
        if (picture._opacity <= 0) {
            cancelAutoErase(screen, realId);
            // Use the captured bank slot; the active logical bank may have changed.
            screen._pictures[realId] = null;
            return;
        }
        if (intent.remainingRetries <= 0) { cancelAutoErase(screen, realId); return; }
        pending.timer = setTimeout(() => { intent.remainingRetries--; poll(); }, 100);
    };
    poll();
}
Game_Screen.prototype.vnAutoErasePicture = function(id, retries) {
    scheduleVnAutoErase(this, this.realPictureId(id), retries);
};
for (const method of ['showPicture', 'erasePicture']) {
    const previous = Game_Screen.prototype[method];
    Game_Screen.prototype[method] = function(id, ...args) {
        cancelAutoErase(this, this.realPictureId(id));
        return previous.call(this, id, ...args);
    };
}
const clearPicturesBeforeVn = Game_Screen.prototype.clearPictures;
Game_Screen.prototype.clearPictures = function(...args) {
    cancelScreenAutoErase(this);
    return clearPicturesBeforeVn.apply(this, args);
};
const eraseBattlePicturesBeforeVn = Game_Screen.prototype.eraseBattlePictures;
Game_Screen.prototype.eraseBattlePictures = function(...args) {
    const timers = autoEraseTimers.get(this);
    if (timers) {
        for (const realId of timers.keys()) {
            if (realId > this.maxPictures()) cancelAutoErase(this, realId);
        }
    }
    return eraseBattlePicturesBeforeVn.apply(this, args);
};
for (const method of ['createGameObjects', 'extractSaveContents']) {
    const previous = DataManager[method];
    DataManager[method] = function(...args) {
        if (globalThis.$gameScreen) cancelScreenAutoErase($gameScreen);
        return previous.apply(this, args);
    };
}

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

function vnPresetTone(name) {
    switch (name.toUpperCase().trim()) {
        case 'DARK': return [-68, -68, -68, 0];
        case 'SEPIA': return [34, -34, -68, 170];
        case 'SUNSET': return [68, -34, -34, 0];
        case 'NIGHT': return [-68, -68, 0, 68];
        default: return [0, 0, 0, 0];
    }
}

function tintVnBusts(args, tone) {
    eachVnPicture(args.PictureID, picture => picture.tint(tone, args.Duration));
}

function vnOscillation(frame, speed, rate) {
    return Math.cos(frame / (speed || 0.01)) * rate;
}
function vnFidgetY(frame, speed, rate) {
    return vnOscillation(frame, speed, rate / 2) + rate / 2;
}

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

api.Sprite_Animation_targetSpritePosition = Sprite_Animation.prototype.targetSpritePosition;
Sprite_Animation.prototype.targetSpritePosition = function(sprite) {
    if (sprite.constructor !== Sprite_Picture) return api.Sprite_Animation_targetSpritePosition.call(this, sprite);
    const name = this._animation.name;
    let x = 0.5, y = 0.5, offsetX = 0, offsetY = 0;
    if (/<(?:HEAD|HEADER|TOP)>/i.test(name)) y = 0;
    if (/<(?:FOOT|FOOTER|BOTTOM)>/i.test(name) || this._animation.alignBottom) y = 1;
    if (/<LEFT>/i.test(name)) x = 0;
    if (/<RIGHT>/i.test(name)) x = 1;
    const anchorX = name.match(/<ANCHOR X: (\d+\.?\d*)>/i);
    const anchorY = name.match(/<ANCHOR Y: (\d+\.?\d*)>/i);
    const anchor = name.match(/<ANCHOR: (\d+\.?\d*), (\d+\.?\d*)>/i);
    if (anchorX) x = Number(anchorX[1]);
    if (anchorY) y = Number(anchorY[1]);
    if (anchor) { x = Number(anchor[1]); y = Number(anchor[2]); }
    const deltaX = name.match(/<OFFSET X: ([+-]\d+)>/i);
    const deltaY = name.match(/<OFFSET Y: ([+-]\d+)>/i);
    const delta = name.match(/<OFFSET: ([+-]\d+), ([+-]\d+)>/i);
    if (deltaX) offsetX = Number(deltaX[1]);
    if (deltaY) offsetY = Number(deltaY[1]);
    if (delta) { offsetX = Number(delta[1]); offsetY = Number(delta[2]); }
    const point = new Point((x - sprite.anchor.x) * sprite.width + offsetX, (y - sprite.anchor.y) * sprite.height + offsetY);
    sprite.updateTransform();
    return sprite.worldTransform.apply(point);
};

function fillMissingVnFields(target, defaults) {
    for (const [key, value] of Object.entries(defaults)) {
        if (target[key] === undefined) target[key] = value;
        else if (value && typeof value === 'object' && target[key] && typeof target[key] === 'object') {
            fillMissingVnFields(target[key], value);
        }
    }
}
function validateVnSaveState(contents) {
    for (const picture of contents.screen._pictures) {
        if (!picture || picture._coretoVn === undefined) continue;
        const state = picture._coretoVn;
        if (!state || typeof state !== 'object' || Array.isArray(state) || (state.schemaVersion !== undefined && state.schemaVersion !== 1)) {
            throw new Error('Unsupported VN picture save schema.');
        }
        if (state.autoErase !== undefined && (!state.autoErase || !Number.isFinite(state.autoErase.remainingRetries) || state.autoErase.remainingRetries < 0)) {
            throw new Error('Invalid VN picture save AutoErase budget.');
        }
    }
}
function clearVnSessionAnimations() {
    if (globalThis.$gameTemp) $gameTemp._pictureAnimationQueue = [];
    SceneManager._scene?._spriteset?.removeAllPictureAnimations();
}
const createGameObjectsBeforeVnSave = DataManager.createGameObjects;
DataManager.createGameObjects = function(...args) {
    clearVnSessionAnimations();
    return createGameObjectsBeforeVnSave.apply(this, args);
};
const extractSaveContentsBeforeVnSave = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(...args) {
    validateVnSaveState(args[0]);
    clearVnSessionAnimations();
    const result = extractSaveContentsBeforeVnSave.apply(this, args);
    for (const [realId, picture] of $gameScreen._pictures.entries()) {
        if (!picture) continue;
        picture.getVnBustPosition();
        fillMissingVnFields(picture, vnEffectDefaults());
        if (picture._coretoVn === undefined) picture._coretoVn = {};
        if (picture._coretoVn.schemaVersion === undefined) picture._coretoVn.schemaVersion = 1;
        const state = picture._coretoVn;
        if (state?.schemaVersion === 1 && state.autoErase) {
            scheduleVnAutoErase($gameScreen, realId, state.autoErase.remainingRetries);
        }
    }
    return result;
};

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

})();
