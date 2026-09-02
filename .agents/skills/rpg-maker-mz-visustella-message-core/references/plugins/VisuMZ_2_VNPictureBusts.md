# VisuMZ_2_VNPictureBusts

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_2_VNPictureBusts`
- Contract: [RPG Maker MZ] [Tier 2] [VNPictureBusts]
- Required plugins: VisuMZ_0_CoreEngine
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| VNPictureBusts | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| Anchor | Anchor Settings | — | — | — | — | — |
| AnchorX:num | Anchor X | Anchor | — | 0.5 | — | Determines the anchor/origin X setting for Picture Busts. 0.0 is left, 0.5 is center, 1.0 is right. |
| AnchorY:num | Anchor Y | Anchor | — | 1.0 | — | Determines the anchor/origin Y setting for Picture Busts. 0.0 is top, 0.5 is middle, 1.0 is bottom. |
| Scale | Scale Settings | — | — | — | — | — |
| ScaleX:num | Scale X | Scale | — | 100 | — | Scale X adjustment settings for Picture Busts. Value scale: 100 = 100% = 1.0 |
| ScaleY:num | Scale Y | Scale | — | 100 | — | Scale Y adjustment settings for Picture Busts. Value scale: 100 = 100% = 1.0 |
| InvertedScale:arraynum | Mirror Horizontally | Scale | number\[\] | \["0","1","2","3","4"\] | — | Which positions will be mirrored horizontally? You want your Busts facing the center of the screen. |
| Screen | Screen Positioning | — | — | — | — | — |
| ScreenX:func | JS: Position X | Screen | note | "// Declare Arguments\nconst position = arguments\[0\].clamp(0, 10);\n\n// Declare Variables\nconst bufferX = 200;\nconst width = Graphics.width - (bufferX * 2);\n\n// Calculate X Position\nx = Math.round(position * width / 10) + bufferX;\nx = x.clamp(bufferX, Graphics.width - bufferX);\n\n// Return X Value\nreturn x;" | — | Code to determine used to calculate the X coordinate for each screen position. |
| ScreenY:func | JS: Position Y | Screen | note | "// Declare Arguments\nconst position = arguments\[0\].clamp(0, 10);\n\n// Declare Variables\nconst stagger = 0;\nconst difference = 5 - Math.abs(5 - position);\nlet y = Graphics.height;\n\n// Calculate Y Position\ny = Graphics.height + Math.round(difference * stagger) + 5;\n\n// Return Y Value\nreturn y;" | — | Code to determine used to calculate the Y coordinate for each screen position. |
| Tone | Tone Presets | — | — | — | — | — |
| brightTone:eval | Bright Tone | Tone | — | \[34, 34, 34, 0\] | — | What tone do you want for brightness? Format: \[Red, Green, Blue, Gray\] |
| dimTone:eval | Dim Tone | Tone | — | \[-34, -34, 0, 34\] | — | What tone do you want for dimming? Format: \[Red, Green, Blue, Gray\] |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

## Plugin commands

### -

- Command ID: `Separator_Basic`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Category - Basic

- Command ID: `Category_Basic`
- Description: These are basic Picture Bust Plugin Commands. @ --------------------------------------------------------------------------

No arguments are declared.

### BASIC: Enter Bust

- Command ID: `Basic_EnterBust`
- Description: Generic entrance for ONE picture bust. Walks in from a little behind and fades in.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:eval | Picture ID | — | 1 | — | What is the Picture ID to associate with this bust? You may use JavaScript code. |
| PictureName:str | Picture File | file | &gt;&gt;&gt;ATTENTION&lt;&lt;&lt; | — | What picture file do you wish to use? |
| Origin:str | Origin | select | Bust | Upper Left; Center; Bust | What kind of origin setting do you wish to use for this bust? |
| Position:num | Screen Position | number | 0 | — | Insert a screen position value from 0 to 10. Coordinates are determined by Plugin Parameters. |
| StartOffsetX:eval | Start Offset X | — | -200 | — | What starting position to enter the bust from? Negative: behind; Positive: front. You may use JavaScript. |
| StartOffsetY:eval | Start Offset Y | — | +0 | — | What starting position to enter the bust from? Negative: up; Positive: down. You may use JavaScript. |
| EasingType:str | Entrance Easing | combo | OutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| HorzMirror:str | Horizontal Mirror | select | Auto | None; Mirror; Auto; Auto-Reverse | Apply horizontal mirroring for this bust? |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust entrance. @ -------------------------------------------------------------------------- |

### BASIC: Exit Bust(s)

- Command ID: `Basic_ExitBusts`
- Description: Generic exit for picture bust(s). Walks back and fades out.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| EndOffsetX:eval | End Offset X | — | -200 | — | What end position to exit the bust to? Negative: behind; Positive: front. You may use JavaScript. |
| EndOffsetY:eval | End Offset Y | — | +0 | — | What end position to exit the bust to? Negative: up; Positive: down. You may use JavaScript. |
| EasingType:str | Exit Easing | combo | InSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| FlipDirection:str | Flip Direction | select | None | None; Flip | Flip direction when exiting? |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust exit. |
| AutoErase:eval | Auto-Erase? | boolean | true | — | Automatically erase the bust(s) after fading out completely? @ -------------------------------------------------------------------------- |

### BASIC: Graphic Change

- Command ID: `Basic_GraphicChange`
- Description: Changes ONE bust's graphic without changing any of its other properties. Useful for quickly changing facial expressions.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:eval | Picture ID | — | 1 | — | What is the Picture ID to associate with this bust? You may use JavaScript code. |
| PictureName:str | Picture File | file | &gt;&gt;&gt;ATTENTION&lt;&lt;&lt; | — | What picture file do you wish to use? @ -------------------------------------------------------------------------- |

### BASIC: Mirror Bust(s)

- Command ID: `Basic_MirrorBust`
- Description: Change the facing direction the bust(s). This alters the horizontal scaling of the bust(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| HorzMirror:str | Horizontal Mirror | select | Toggle | None; Mirror; Auto; Auto-Reverse; Toggle | How do you wish to affect the mirroring for the bust(s)? @ -------------------------------------------------------------------------- |

### BASIC: Origin Change Bust(s)

- Command ID: `Basic_OriginChange`
- Description: Change the origin/anchor for bust(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Origin:str | Origin | select | Bust | Upper Left; Center; Bust | Pick what kind of origin setting to use for this bust? "Bust" value is based on Plugin Parameters. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the origin change. @ -------------------------------------------------------------------------- |

### BASIC: Play Animation on Bust(s)

- Command ID: `Basic_PlayAniBust`
- Description: Plays a specific battle animation on bust(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| AnimationID:num | Battle Animation ID | animation | 1 | — | Select which battle animation to play on bust. |
| Mirror:eval | Mirror Animation? | boolean | false | — | Mirror the animation effect? |
| WaitForAnimation:eval | Wait For Animation? | boolean | false | — | Wait until the animation is finished before continuing? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Breathing`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Category - Breathing

- Command ID: `Category_Breathing`
- Description: These are breathing related Picture Plugin Commands. @ --------------------------------------------------------------------------

No arguments are declared.

### BREATHING: Start

- Command ID: `Breathing_Enable`
- Description: Start breathing aspect for selected bust(s). Makes it look like the bust graphic is more alive.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Speed | — | — | — | — | — |
| SpeedX:eval | Speed X | — | 20 | — | Speed used for the horizontal breathing cycle. Higher is slower. You may use JavaScript. |
| SpeedY:eval | Speed Y | — | 30 | — | Speed used for the vertical breathing cycle. Higher is slower. You may use JavaScript. |
| Rate | — | — | — | — | — |
| RateX:eval | Rate X | — | 0.10 | — | Rate used for the horizontal breathing cycle. Determines change amount. You may use JavaScript. |
| RateY:eval | Rate Y | — | 0.80 | — | Rate used for the vertical breathing cycle. Determines change amount. You may use JavaScript. @ -------------------------------------------------------------------------- |

### BREATHING: Stop

- Command ID: `Breathing_Disable`
- Description: Stops breathing aspect for selected bust(s). The bust graphic becomes static.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Fade`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Category - Fade

- Command ID: `Category_Fade`
- Description: These are fading related Picture Plugin Commands. @ --------------------------------------------------------------------------

No arguments are declared.

### FADE: Fade In Bust(s)

- Command ID: `Fade_FadeIn`
- Description: Brings selected picture bust(s) opacity levels to 255.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust fade in. @ -------------------------------------------------------------------------- |

### FADE: Fade Out Bust(s)

- Command ID: `Fade_FadeOut`
- Description: Brings selected picture bust(s) opacity levels to 0.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust fade out. |
| AutoErase:eval | Auto-Erase? | boolean | false | — | Automatically erase the bust(s) after fading out completely? @ -------------------------------------------------------------------------- |

### FADE: Opacity By X, Bust(s)

- Command ID: `Fade_OpacityBy`
- Description: Adjusts selected picture bust(s) opacity levels relatively.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| AdjustOpacity:eval | Adjust Opacity | — | +50 | — | Adjust opacity value of pictures by this amount. Negative: Lower, Positive: Higher. You may use JavaScript. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust fading. @ -------------------------------------------------------------------------- |

### FADE: Opacity To X, Bust(s)

- Command ID: `Fade_OpacityTo`
- Description: Brings selected picture bust(s) opacity levels to a custom value.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| TargetOpacity:num | Target Opacity | number | 128 | — | What opacity value do you wish to adjust the bust to? Use a value between 0 and 255. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust fading. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Fidgeting`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Category - Fidgeting

- Command ID: `Category_Fidgeting`
- Description: These are fidgeting related Picture Plugin Commands. @ --------------------------------------------------------------------------

No arguments are declared.

### FIDGETING: Start

- Command ID: `Fidgeting_Enable`
- Description: Starts fidgeting aspect for selected bust(s). Bust graphic moves back and forth.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Speed | — | — | — | — | — |
| SpeedX:eval | Speed X | — | 30 | — | Speed used for the horizontal fidgeting cycle. Higher is slower. You may use JavaScript. |
| SpeedY:eval | Speed Y | — | 30 | — | Speed used for the vertical fidgeting cycle. Higher is slower. You may use JavaScript. |
| Rate | Distance | — | — | — | — |
| RateX:eval | Distance X | — | 5.00 | — | Max distance used for the horizontal fidgeting cycle. Determines change amount. You may use JavaScript. |
| RateY:eval | Distance Y | — | 0.00 | — | Max distance used for the vertical fidgeting cycle. Determines change amount. You may use JavaScript. @ -------------------------------------------------------------------------- |

### FIDGETING: Stop

- Command ID: `Fidgeting_Disable`
- Description: Stops fidgeting aspect for selected bust(s). The bust graphic becomes stationary.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Move`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Category - Movement

- Command ID: `Category_Move`
- Description: These are movement-related Picture Bust Plugin Commands. @ --------------------------------------------------------------------------

No arguments are declared.

### MOVE: Move Bust(s) By Coordinates

- Command ID: `Move_MoveByCoordinates`
- Description: Move bust(s) relative to current coordinates(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| MoveX:str | Move By X | — | +100 | — | Negative: left; Positive: right; "Unchanged" for none. You may use JavaScript. |
| MoveY:str | Move By Y | — | Unchanged | — | Negative: up; Positive: down; "Unchanged" for none. You may use JavaScript. |
| EasingType:str | Move Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| FlipDirection:str | Flip Direction | select | None | None; Flip | Flip direction when moving? |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust movement. @ -------------------------------------------------------------------------- |

### MOVE: Move Bust(s) By Position

- Command ID: `Move_MoveByPosition`
- Description: Move bust(s) relative to current position(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| MovePosition:eval | Move By Position | — | +1 | — | Negative: left; Positive: right; "Unchanged" for none. You may use JavaScript. Results between 0 and 10. |
| EasingType:str | Move Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| FlipDirection:str | Flip Direction | select | None | None; Flip | Flip direction when moving? |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust movement. @ -------------------------------------------------------------------------- |

### MOVE: Move Bust(s) to Coordinates

- Command ID: `Move_MoveToCoordinates`
- Description: Move bust(s) to exact coordinates(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| TargetX:str | Target X | — | Graphics.width / 2 | — | Target X coordinate. "Unchanged" for no changes. You may use JavaScript. |
| TargetY:str | Target Y | — | Unchanged | — | Target Y coordinate. "Unchanged" for no changes. You may use JavaScript. |
| EasingType:str | Move Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| FlipDirection:str | Flip Direction | select | None | None; Flip | Flip direction when moving? |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust movement. @ -------------------------------------------------------------------------- |

### MOVE: Move Bust(s) to Position

- Command ID: `Move_MoveToPosition`
- Description: Move bust(s) to the predetermined position.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| TargetPosition:eval | Target Position | — | 5 | — | Target predetermined position from 0 to 10. You may use JavaScript. |
| EasingType:str | Move Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| FlipDirection:str | Flip Direction | select | None | None; Flip | Flip direction when moving? |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust movement. @ -------------------------------------------------------------------------- |

### MOVE: Reset Bust(s) to Position

- Command ID: `Move_ResetToPosition`
- Description: Reset bust(s) to the current position(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| EasingType:str | Move Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| FlipDirection:str | Flip Direction | select | None | None; Flip | Flip direction when moving? |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust movement. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Scale`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Category - Scaling

- Command ID: `Category_Scale`
- Description: These are scaling-related Picture Bust Plugin Commands. @ --------------------------------------------------------------------------

No arguments are declared.

### SCALE: Scale Bust(s) By

- Command ID: `Scale_ScaleBy`
- Description: Scale bust(s) by specific amounts. Value scale: 100 = 100% = 1.0

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| ScaleX:eval | Scale X By | — | +20 | — | Alter (additively) the X scaling value by this. You may use JavaScript. |
| ScaleY:eval | Scale Y By | — | +20 | — | Alter (additively) the Y scaling value by this. You may use JavaScript. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust scaling. @ -------------------------------------------------------------------------- |

### SCALE: Scale Bust(s) To

- Command ID: `Scale_ScaleTo`
- Description: Scale bust(s) to specific values. Value scale: 100 = 100% = 1.0

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| TargetScaleX:str | Target Scale X | — | 100 | — | Set X scaling value to this. You may use JavaScript. "Unchanged" for no changes. |
| TargetScaleY:str | Target Scale Y | — | 100 | — | Set Y scaling value to this. You may use JavaScript. "Unchanged" for no changes. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust scaling. @ -------------------------------------------------------------------------- |

### SCALE: Scale Reset Bust(s)

- Command ID: `Scale_ScaleReset`
- Description: Resets the scale for bust(s) to the default settings in the Plugin Parameters.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the bust scaling. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Swaying`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Category - Swaying

- Command ID: `Category_Swaying`
- Description: These are swaying related Picture Plugin Commands. @ --------------------------------------------------------------------------

No arguments are declared.

### SWAYING: Start

- Command ID: `Swaying_Enable`
- Description: Starts swaying aspect for selected bust(s). The bust sways its angle back and forth.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Speed | — | — | — | — | — |
| SpeedAngle:eval | Angle Speed | — | 30 | — | Speed used for the swaying cycle. Higher is slower. You may use JavaScript. |
| Rate | Angle | — | — | — | — |
| RateAngle:eval | Angle Sway | — | 2 | — | Max angle used for the swaying cycle. Determines change amount. You may use JavaScript. @ -------------------------------------------------------------------------- |

### SWAYING: Stop

- Command ID: `Swaying_Disable`
- Description: Stops swaying aspect for selected bust(s). The no longer sways back and forth.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_Tone`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Category - Tone

- Command ID: `Category_Tone`
- Description: These are tone-related Picture Bust Plugin Commands. @ --------------------------------------------------------------------------

No arguments are declared.

### TONE: Bright Bust(s)

- Command ID: `Tone_BrightBust`
- Description: Brighten bust(s) to use the Tone settings found in the Plugin Parameters.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the tone change. @ -------------------------------------------------------------------------- |

### TONE: Dim Bust(s)

- Command ID: `Tone_DimBust`
- Description: Dims bust(s) to use the Tone settings found in the Plugin Parameters.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the tone change. @ -------------------------------------------------------------------------- |

### TONE: Normal Bust(s)

- Command ID: `Tone_NormalBust`
- Description: Normalize bust(s) to no tone at all.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the tone change. @ -------------------------------------------------------------------------- |

### TONE: Preset Tone for Bust(s)

- Command ID: `Tone_PresetBust`
- Description: Use RPG Maker MZ's present tones/tints for bust(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| Preset:str | Preset Name | select | Sepia | Normal; Dark; Sepia; Sunset; Night | What tone preset do you wish to apply? |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the tone change. @ -------------------------------------------------------------------------- |

### TONE: Target Tone for Bust(s)

- Command ID: `Tone_CustomToneBust`
- Description: Use a custom target tone for the bust(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| PictureID:arrayeval | Picture ID(s) | string\[\] | \["1"\] | — | What Picture ID(s) to associate with this command? You may use JavaScript code. |
| customTone:eval | Custom Tone | — | \[0, 0, 0, 0\] | — | What tone do you want for the bust(s)? Format: \[Red, Green, Blue, Gray\] |
| Duration:eval | Duration | — | 20 | — | Duration in frames for the tone change. @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

This plugin enables the game engine to use Pictures (normally available
event commands like "Show Picture" and "Move Picture") as Picture Busts,
similar to those seen in Visual Novels. These Picture Busts are given a
plethora of Plugin Commands to utilize and control them in ways to help
create narratives amongst characters akin to Visual Novels. The Plugin
Commands will also help streamline and remove the more tedious aspects of
trying to recreate a similar bust system with vanilla RPG Maker MZ.

Features include all (but not limited to) the following:

* Streamlined Plugin Commands to allow for commonly seen Picture Bust usage
commonly found in Visual Novel genre-type games.
* Quickly Enter/Exit busts with Plugin Commands with a structure based
around simplified screen positioning rather than exact coordinates.
* Change Picture Bust graphics without needing to fiddle with any other
property for quicker switching between expressions or poses.
* Mirror, unmirror, or simply flip one direction to another for Picture
Busts with ease without altering any other property.
* Fade in, fade out, or fade to exact opacity amounts without needing to
alter any other property.
* Play Battle Animations on Picture Busts. Normally, Battle Animations would
appear behind pictures, but this plugin creates specially effects to allow
for them to play on top of the Picture Busts themselves.
* Move Picture Busts around relatively or to exact coordinates or using the
plugin's predetermined positions in a streamlined fashion.
* Scale Picture Busts to enlarge them or shrink them while keeping other
properties intact and untouched.
* Alter tones/tints for the Picture Busts in order to portray an active,
passive, or normal effect.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

* VisuMZ_0_CoreEngine

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 2 ------

This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Quick Understanding on How Busts Work

These are some tidbits on how Picture Busts work.

---

Busts Face Left

This plugin is made under the assumption that the Picture Busts are normally
facing left in their raw form. This is to match RPG Maker MZ's "Pictures" of
actors and to allow for more user familiarity with how Busts work.

Naturally, you can reverse everything as long as you adjust the settings
properly in this plugin's Plugin Parameters.

---

Busts are Pictures

"Busts" in this plugin are mechanically Pictures in RPG Maker MZ. The
properties that Pictures and Busts share are one and the same. This means
that you can control Pictures with this plugin's Bust-centric commands and
you can control Busts with "Move Picture", "Rotate Picture", "Tint Picture",
and "Erase Picture" event commands.

Naturally, this also means that any Picture of Bust that hasn't been made
available through the "Show Picture" event command or "BASIC: Enter Bust(s)"
Plugin Command won't be able to use either event commands or Plugin Commands
related to the Picture/Bust manipulation.

---

Picture ID's Matter for Busts

Picture ID's matter when selecting them for Busts. Picture ID's with a lower
number will appear further in the "back" behind other Pictures/Busts while
Picture ID's with a higher number will appear more on "top".

It makes no difference if the object was formed as a Picture or as a Bust
first. The layer system is still intact.

---

Specialized Bust Origin/Anchor

Pictures have two Origin/Anchor modes: "Upper Left" or "Center". The Origin
refers to the point in which the picture marks and aligns itself with based
on the coordinates it's given.

If you are using "Upper Left", then the Picture's X and Y will indicate that
the Picture's Upper Left corner of the image will be at X and Y. If you are
using "Center", then that means the Picture's X and Y will indicate that
the Picture's Center point of the image will be at X and Y.

Busts have a unique Origin/Anchor that can be setup in the Plugin Parameters
and it normally defaults to "Center Bottom", aka Anchor X value of 0.5 and
Anchor Y value of 1.0. The "Bust" Anchor works best with Busts because it
allows for the natural manipulation of busts relative to the bottom of the
screen position.

As mentioned before, this can be modified in the Plugin Parameters. We don't
recommend changing it unless you know what you're doing.

---

Predetermined Positioning

Messing with exact coordinates is messy and extremely inefficient when
working with them for a long enough time. This plugin offers a Predetermined
Position coordinate system, to which, the rest of the plugin will refer to
as "Positions" for short.

There are 11 Positions available through this plugin, one for each number
between 0 and 10. These Positions start on the left side of the screen and
go towards the right, with a 200 pixel buffer from the edges. They are also
aligned at the bottom of the screen.

In other words, something like this:

+--------+--------------------------------------------------------+--------+
|        |                                                        |        |
|        |                        Screen                          |        |
|<------>|                                                        |<------>|
|        |                                                        |        |
|  200   |                                                        |  200   |
| Pixel  |                                                        | Pixel  |
| Buffer |                                                        | Buffer |
|        |                                                        |        |
|<------>|                                                        |<------>|
|        |                                                        |        |
|  200   |                                                        |  200   |
| Pixel  |                                                        | Pixel  |
| Buffer |                                                        | Buffer |
|        |                      Positions                         |        |
|<------>|                                                        |<------>|
|        0    1    2    3     4     5     6     7     8     9    10        |
|        |                                                        |        |
+--------+--------------------------------------------------------+--------+

These Positions can be changed in the Plugin Parameters if you understand
JavaScript code. If you do not, we do NOT recommend tinkering with it.

This means if the Position 0 is used, the Picture Bust will appear centered
at the bottom of the far left side of the screen with a 200 distance buffer.
If the Position 5 is used, the Picture Bust will appear at the center bottom
of the screen. If the Position 8 is used, the Picture Bust will appear about
3/4ths the way across the screen from the left.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Basic-Bust Plugin Commands ===

---

BASIC: Enter Bust
- Generic entrance for ONE picture bust.
- Walks in from a little behind and fades in.

Picture ID:
- What is the Picture ID to associate with this bust?
- You may use JavaScript code.

Picture File:
- What picture file do you wish to use?

Origin:
- What kind of origin setting do you wish to use for this bust?
- Upper Left
- Center
- Bust

Screen Position:
- Insert a screen position value from 0 to 10.
- Coordinates are determined by Plugin Parameters.
- Refer to "Quick Understanding on How Busts Work" to understand how
"Predetermined Positioning" positioning works by default.

Start Offset X:
- What starting position to enter the bust from?
- Negative: behind; Positive: front.
- You may use JavaScript.

Start Offset Y:
- What starting position to enter the bust from?
- Negative: up; Positive: down.
- You may use JavaScript.

Entrance Easing:
- Select which easing type you wish to apply.

Horizontal Mirror:
- Apply horizontal mirroring for this bust?
- None
- Mirror
- Auto
- Auto-Reverse

Duration:
- Duration in frames for the bust entrance.

---

BASIC: Exit Bust(s)
- Generic exit for picture bust(s).
- Walks back and fades out.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

End Offset X:
- What end position to exit the bust to?
- Negative: behind; Positive: front.
- You may use JavaScript.

End Offset Y:
- What end position to exit the bust to?
- Negative: up; Positive: down.
- You may use JavaScript.

Exit Easing:
- Select which easing type you wish to apply.

Flip Direction:
- Flip direction when exiting?

Duration:
- Duration in frames for the bust exit.

Auto-Erase?:
- Automatically erase the bust(s) after fading out completely?

---

BASIC: Graphic Change
- Changes ONE bust's graphic without changing any of its other properties.
- Useful for quickly changing facial expressions or poses.

Picture ID:
- What is the Picture ID to associate with this bust?
- You may use JavaScript code.

Picture File:
- What picture file do you wish to use?

---

BASIC: Mirror Bust(s)
- Change the facing direction the bust(s).
- This alters the horizontal scaling of the bust(s).

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Horizontal Mirror:
- How do you wish to affect the mirroring for the bust(s)?
- None
- Mirror
- Auto
- Auto-Reverse
- Toggle

---

BASIC: Origin Change Bust(s)
- Change the origin/anchor for bust(s).

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Origin:
- Pick what kind of origin setting to use for this bust?
- "Bust" value is based on Plugin Parameters.
- Upper Left
- Center
- Bust

Duration:
- Duration in frames for the origin change.

---

BASIC: Play Animation on Bust(s)
- Plays a specific battle animation on bust(s).

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Battle Animation ID:
- Select which battle animation to play on bust.

Mirror Animation?:
- Mirror the animation effect?

Wait For Animation?:
- Wait until the animation is finished before continuing?

---

=== Breathing Plugin Commands ===

---

BREATHING: Start
- Starts breathing aspect for selected bust(s).
- Makes it look like the bust graphic is more alive.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Speed:

Speed X:
Speed Y:
- Speed used for the horizontal/vertical breathing cycle.
- Higher is slower.
- You may use JavaScript.

Rate:

Rate X:
Rate Y:
- Rate used for the horizontal/vertical breathing cycle.
- Determines change amount.
- You may use JavaScript.

---

BREATHING: Stop
- Stops breathing aspect for selected bust(s).
- The bust graphic becomes static.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

---

=== Fade-Bust Plugin Commands ===

---

FADE: Fade In Bust(s)
- Brings selected picture bust(s) opacity levels to 255.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Duration:
- Duration in frames for the bust fade in.

---

FADE: Fade Out Bust(s)
- Brings selected picture bust(s) opacity levels to 0.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Duration:
- Duration in frames for the bust fade out.

Auto-Erase?:
- Automatically erase the bust(s) after fading out completely?

---

FADE: Opacity By X, Bust(s)
- Adjusts selected picture bust(s) opacity levels relatively.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Adjust Opacity:
- Adjust opacity value of pictures by this amount.
- Negative: Lower, Positive: Higher.
- You may use JavaScript.

Duration:
- Duration in frames for the bust fading.

---

FADE: Opacity To X, Bust(s)
- Brings selected picture bust(s) opacity levels to a custom value.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Target Opacity:
- What opacity value do you wish to adjust the bust to?
- Use a value between 0 and 255.

Duration:
- Duration in frames for the bust fading.

---

=== Fidgeting Plugin Commands ===

---

FIDGETING: Start
- Starts fidgeting aspect for selected bust(s).
- Bust graphic moves back and forth.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Speed:

Speed X:
Speed Y:
- Speed used for the horizontal/vertical fidgeting cycle.
- Higher is slower.
- You may use JavaScript.

Distance:

Distance X:
Distance Y:
- Max distance used for the horizontal/vertical fidgeting cycle.
- Determines change amount.
- You may use JavaScript.

---

FIDGETING: Stop
- Stops fidgeting aspect for selected bust(s).
- The bust graphic becomes stationary.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

---

=== Movement-Bust Plugin Commands ===

---

MOVE: Move Bust(s) By Coordinates
- Move bust(s) relative to current coordinates(s).

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Move By X:
- Negative: left; Positive: right; "Unchanged" for none.
- You may use JavaScript.

Move By Y:
- Negative: up; Positive: down; "Unchanged" for none.
- You may use JavaScript.

Move Easing:
- Select which easing type you wish to apply.

Flip Direction:
- Flip direction when moving?

Duration:
- Duration in frames for the bust movement.

---

MOVE: Move Bust(s) By Position
- Move bust(s) relative to current position(s).

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Move By Position:
- Negative: left; Positive: right; "Unchanged" for none.
- You may use JavaScript.
- Results between 0 and 10.

Move Easing:
- Select which easing type you wish to apply.

Flip Direction:
- Flip direction when moving?

Duration:
- Duration in frames for the bust movement.

---

MOVE: Move Bust(s) to Coordinates
- Move bust(s) to exact coordinates(s).

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Target X:
- Target X coordinate.
- "Unchanged" for no changes.
- You may use JavaScript.

Target Y:
- Target Y coordinate.
- "Unchanged" for no changes.
- You may use JavaScript.

Move Easing:
- Select which easing type you wish to apply.

Flip Direction:
- Flip direction when moving?

Duration:
- Duration in frames for the bust movement.

---

MOVE: Move Bust(s) to Position
- Move bust(s) to the predetermined position.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Target Position:
- Target predetermined position from 0 to 10.
- You may use JavaScript.

Move Easing:
- Select which easing type you wish to apply.

Flip Direction:
- Flip direction when moving?

Duration:
- Duration in frames for the bust movement.

---

MOVE: Reset Bust(s) to Position
- Reset bust(s) to the current position(s).

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Move Easing:
- Select which easing type you wish to apply.

Flip Direction:
- Flip direction when moving?

Duration:
- Duration in frames for the bust movement.

---

=== Scaling-Bust Plugin Commands ===

---

SCALE: Scale Bust(s) By
- Scale bust(s) by specific amounts.
- Value scale: 100 = 100% = 1.0

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Scale X By:
- Alter (additively) the X scaling value by this.
- You may use JavaScript.

Scale Y By:
- Alter (additively) the Y scaling value by this.
- You may use JavaScript.

Duration:
- Duration in frames for the bust scaling.

---

SCALE: Scale Bust(s) To
- Scale bust(s) to specific values.
- Value scale: 100 = 100% = 1.0

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Scale X By:
- Set X scaling value to this.
- You may use JavaScript.
- "Unchanged" for no changes.

Scale Y By:
- Set Y scaling value to this.
- You may use JavaScript.
- "Unchanged" for no changes.

Duration:
- Duration in frames for the bust scaling.

---

SCALE: Scale Reset Bust(s)
- Resets the scale for bust(s) to the default settings in the
Plugin Parameters.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Duration:
- Duration in frames for the bust scaling.

---

=== Swaying Plugin Commands ===

---

SWAYING: Start
- Starts swaying aspect for selected bust(s).
- Bust graphic moves back and forth.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Speed:

Angle Speed:
- Speed used for the swaying cycle.
- Higher is slower.
- You may use JavaScript.

Angle:

Angle Sway:
- Max angle used for the swaying cycle.
- Determines change amount.
- You may use JavaScript.

---

SWAYING: Stop
- Stops swaying aspect for selected bust(s).
- The bust graphic becomes stationary.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

---

=== Tone/Tint-Bust Plugin Commands ===

---

TONE: Bright Bust(s)
- Brighten bust(s) to use the Tone settings found in the Plugin Parameters.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Duration:
- Duration in frames for the tone change.

---

TONE: Dim Bust(s)
- Dims bust(s) to use the Tone settings found in the Plugin Parameters.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Duration:
- Duration in frames for the tone change.

---

TONE: Normal Bust(s)
- Normalize bust(s) to no tone at all.

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Duration:
- Duration in frames for the tone change.

---

TONE: Preset Tone for Bust(s)
- Use RPG Maker MZ's present tones/tints for bust(s).

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Preset Name:
- What tone preset do you wish to apply?
- Normal
- Dark
- Sepia
- Sunset
- Night

Duration:
- Duration in frames for the tone change.

---

TONE: Target Tone for Bust(s)
- Use a custom target tone for the bust(s).

Picture ID(s):
- What Picture ID(s) to associate with this command?
- You may use JavaScript code.

Custom Tone:
- What tone do you want for the bust(s)?
- Format: [Red, Green, Blue, Gray]

Duration:
- Duration in frames for the tone change.

---

Plugin Parameters: General Settings

These are the general settings that govern the default values pertaining to
the Picture Busts used by this Plugin.

---

Anchor Settings

Anchor X:
- Determines the anchor/origin X setting for Picture Busts.
- 0.0 is left, 0.5 is center, 1.0 is right.

Anchor Y:
- Determines the anchor/origin Y setting for Picture Busts.
- 0.0 is left, 0.5 is center, 1.0 is right.

---

Scale Settings

Scale X:
- Scale X adjustment settings for Picture Busts.
- Value scale: 100 = 100% = 1.0

Scale Y:
- Scale Y adjustment settings for Picture Busts.
- Value scale: 100 = 100% = 1.0

Mirror Horizontally:
- Which positions will be mirrored horizontally?
- You want your Busts facing the center of the screen.
- This treats Busts as if they

---

Screen Positioning

JS: Position X:
- Code to determine used to calculate the X coordinate for each
screen position.
- Refer to "Quick Understanding on How Busts Work" to understand how
"Predetermined Positioning" positioning works by default.

JS: Position Y:
- Code to determine used to calculate the Y coordinate for each
screen position.
- Refer to "Quick Understanding on How Busts Work" to understand how
"Predetermined Positioning" positioning works by default.

---

Tone

Bright Tone:
- What tone do you want for brightness?
- Format: [Red, Green, Blue, Gray]

Dim Tone:
- What tone do you want for dimming?
- Format: [Red, Green, Blue, Gray]

---
```
