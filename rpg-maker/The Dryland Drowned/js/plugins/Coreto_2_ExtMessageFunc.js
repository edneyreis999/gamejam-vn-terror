/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 2] [Version 0.1.0] [ExtMessageFunc]
 * @author Coreto
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderBefore VisuMZ_3_MessageLog
 * @help
 * Requires one Message provider: Coreto_1_MessageCore 0.1.0 or VisuMZ_1_MessageCore 1.54.
 * Disable VisuMZ_2_ExtMessageFunc. Legacy event commands retain their ID.
 * inherit reads the disabled legacy entry when present; own uses this entry.
 * Changing CoretoConfigSource does not copy parameters.
 * See coreto/README.md and the ext-message CLI namespace.
 *
 * @param CoretoConfigSource
 * @text Configuration source
 * @type select
 * @desc inherit reads the original entry when present; own reads this entry. Switching does not copy values.
 * @default inherit
 * @option inherit
 * @value inherit
 * @option own
 * @value own
 *
 * @param Auto:struct
 * @text Auto-Forward Settings
 * @type struct<Auto>
 * @desc Auto-Forward settings used for this game.
 * @default {"WaitPerChar:num":"6","MinimumWait:num":"300"}
 *
 * @param FastFwd:struct
 * @text Fast Forward (Extended)
 * @type struct<FastFwd>
 * @desc Extended Fast Forward settings used for this game.
 * @default {"Enable:eval":"true","Speed:num":"8","SceneChangeReset:eval":"true"}
 *
 * @param MsgButtonConsole:struct
 * @text Message Button Console
 * @type struct<MsgButtonConsole>
 * @desc Layout and backgrounds of the message button console. Positions and sizes are pixels relative to the message window; background images are loaded from img/system at their original size. See the individual fields for placement and empty-image behavior.
 * @default {"General":"","ShowDefault:eval":"true","Position:str":"bottom","Appearance":"","WindowSkin:str":"Window","FontFace:str":"Arial","FontSize:num":"18","TextColors":"","NormalColor:str":"0","ToggledColor:str":"24","DisabledColor:str":"7","Visuals":"","ButtonWidth:num":"86","ButtonHeight:num":"36","ButtonBuffer:num":"6"}
 *
 * @param Buttons:struct
 * @text Button Settings
 * @type struct<Buttons>
 * @desc Settings for which buttons appear and how they appear.
 * @default {"General":"","List:arraystr":"[\"auto\",\"fastFwd\",\"log\",\"hide\",\"save\",\"load\",\"options\",\"gameEnd\"]","AutoKey:str":"none","Shortcuts":"","SaveKey:str":"none","LoadKey:str":"none","OptionsKey:str":"none","GameEndKey:str":"none","Vocab":"","Auto:str":"AUTO","FastFwd:str":"FAST","Save:str":"SAVE","Load:str":"LOAD","Options:str":"CONFIG","GameEnd:str":"TITLE"}
 *
 * @param MsgCursor:struct
 * @text Message Cursor Settings
 * @type struct<MsgCursor>
 * @desc Message Cursor settings used for this game.
 * @default {"General":"","Enable:eval":"true","GraphicType:str":"icon","Icon":"","IconIndex:str":"188","FlipMultiplier:str":"0.125","Image":"","Filename:str":"","Rows:num":"1","Cols:num":"1","FrameDelay:num":"4","Appearance":"","AnchorX:num":"0.5","AnchorY:num":"1","OffsetX:num":"+0","OffsetY:num":"-4"}
 *
 * @param MsgTail:struct
 * @text Message Tail Settings
 * @type struct<MsgTail>
 * @desc Message Tail settings used for Message Windows.
 * @default {"AutoPosition":"","autoPositionTail:eval":"true","autoPositionLeft:eval":"true","autoPositionOffsetX:num":"+0","autoPositionOffsetY:num":"+0","TailDir":"","BottomLeft":"","bottomLeftFilename:str":"","bottomLeftAnchorX:num":"0.5","bottomLeftAnchorY:num":"0.0","bottomLeftOffsetX:num":"+0","bottomLeftOffsetY:num":"+0","BottomRight":"","bottomRightFilename:str":"","bottomRightAnchorX:num":"0.5","bottomRightAnchorY:num":"0.0","bottomRightOffsetX:num":"+0","bottomRightOffsetY:num":"+0","UpperLeft":"","upperLeftFilename:str":"","upperLeftAnchorX:num":"0.5","upperLeftAnchorY:num":"1.0","upperLeftOffsetX:num":"+0","upperLeftOffsetY:num":"+0","UpperRight":"","upperRightFilename:str":"","upperRightAnchorX:num":"0.5","upperRightAnchorY:num":"1.0","upperRightOffsetX:num":"+0","upperRightOffsetY:num":"+0"}
 *
 * @param ScrollWheel:struct
 * @text Scroll Wheel Settings
 * @type struct<ScrollWheel>
 * @desc Mouse wheel controls during message input. Enable installs the wheel controls at game startup; ScrollDownNext advances at wheelY >= 20, and ScrollUpMsgLog attempts to open Message Log at wheelY <= -20. Other message trigger handling runs first. The log integration is optional; without its provider, scrolling upward does not open a scene.
 * @default {"Enable:eval":"true","ScrollDownNext:eval":"true","ScrollUpMsgLog:eval":"true"}
 *
 * @command ExtFastFwdDisallow
 * @text Fast Forward: Allow/Disallow
 * @desc Change whether or not Fast Forward is allowed/disallowed.
 * @arg Allow:eval
 * @text Allow?
 * @type boolean
 * @desc Allow or disallow the Extended Fast Forward feature?
 * @default true
 *
 * @command MsgButtonConsole
 * @text Message Button Console: Show/Hide
 * @desc Determine if the Message Button Console is visible or hidden.
 * @arg Visible:eval
 * @text Visible?
 * @type boolean
 * @desc Show or hide the Message Button Console feature?
 * @default true
 *
 * @command MessageCursorSettings
 * @text Message Cursor: Change Settings
 * @desc Change the Message Cursor settings used.
 * @arg MsgCursor:struct
 * @text Change Settings
 * @type struct<MsgCursor>
 * @desc Change the Message Cursor settings.
 * @default {"General":"","Enable:eval":"true","GraphicType:str":"icon","Icon":"","IconIndex:str":"188","FlipMultiplier:str":"0.125","Image":"","Filename:str":"","Rows:num":"1","Cols:num":"1","FrameDelay:num":"4","Appearance":"","AnchorX:num":"0.5","AnchorY:num":"1","OffsetX:num":"+0","OffsetY:num":"-4"}
 *
 * @command MessageTailSettings
 * @text Message Tail: Change Settings
 * @desc Change the Message Tail settings.
 * @arg Settings:struct
 * @text Message Tail Settings
 * @type struct<MsgTail>
 * @desc Message Tail settings used for Message Windows.
 * @default {"AutoPosition":"","autoPositionTail:eval":"true","autoPositionLeft:eval":"true","autoPositionOffsetX:num":"+0","autoPositionOffsetY:num":"+0","TailDir":"","BottomLeft":"","bottomLeftFilename:str":"","bottomLeftAnchorX:num":"0.5","bottomLeftAnchorY:num":"0.0","bottomLeftOffsetX:num":"+0","bottomLeftOffsetY:num":"+0","BottomRight":"","bottomRightFilename:str":"","bottomRightAnchorX:num":"0.5","bottomRightAnchorY:num":"0.0","bottomRightOffsetX:num":"+0","bottomRightOffsetY:num":"+0","UpperLeft":"","upperLeftFilename:str":"","upperLeftAnchorX:num":"0.5","upperLeftAnchorY:num":"1.0","upperLeftOffsetX:num":"+0","upperLeftOffsetY:num":"+0","UpperRight":"","upperRightFilename:str":"","upperRightAnchorX:num":"0.5","upperRightAnchorY:num":"1.0","upperRightOffsetX:num":"+0","upperRightOffsetY:num":"+0"}
 *
 */

/*~struct~Auto:
 * @param WaitPerChar:num
 * @text Wait per Character
 * @type number
 * @desc How many frames should the game wait per character?
 * @default 6
 * @min 1
 *
 * @param MinimumWait:num
 * @text Minimum Wait
 * @type number
 * @desc What is the minimum amount of frames to wait?
 * @default 300
 * @min 1
 *
 * @param VoiceActAutoPadding:num
 * @text Voice Act Padding
 * @type number
 * @desc Game-frame count retained for an external VoiceActControl integration, normally intended as padding after a voice line. The CLI accepts a number >=1; the default is 60. Coreto exposes this setting but does not consume it in its local auto-forward timer or supply voice playback/wait hooks. Changing this value alone does not make messages wait for voice; an external implementation and its own compatibility contract are required.
 * @default 60
 * @min 1
 *
 */

/*~struct~FastFwd:
 * @param Enable:eval
 * @text Enable?
 * @type boolean
 * @desc Enable or disable the Extended Fast Forward feature?
 * @default true
 *
 * @param Speed:num
 * @text Speed
 * @type number
 * @desc What is the speed at which Extended Fast Forward works at?
 * @default 8
 * @min 2
 *
 * @param SceneChangeReset:eval
 * @text Reset on Scene Change?
 * @type boolean
 * @desc Reset Fast Forward setting on scene changes (ie battle, menu, or map transfers)?
 * @default true
 *
 */

/*~struct~MsgButtonConsole:
 * @param ShowDefault:eval
 * @text Show by Default?
 * @type boolean
 * @desc Show or hide the Message Button Console by default?
 * @default true
 *
 * @param Position:str
 * @text Position
 * @type select
 * @desc Where do you wish to display the Message Button Console?
 * @default bottom
 * @option top
 * @value top
 * @option bottom
 * @value bottom
 *
 * @param AutoSizeHide:eval
 * @text Auto-Size Hide?
 * @type boolean
 * @desc When true, hide the button console for messages using auto-size or auto-position text codes. For example, <Auto> sizes the message and <Auto Event: 1> anchors it to illustrative event ID 1. When false, those codes do not automatically hide the console; its other visibility settings still apply.
 * @default false
 *
 * @param WindowSkin:str
 * @text Window Skin
 * @type file
 * @desc Console window-skin PNG basename in img/system, without .png; Window loads img/system/Window.png. Supply an existing MZ-compatible windowskin atlas (normally 192 by 192 pixels), not an arbitrary button icon.
 * @default Window
 * @dir img/system/
 *
 * @param FontFace:str
 * @text Font Name
 * @type text
 * @desc CSS font-family string assigned to message-console button text. Arial is the default and depends on availability on the platform. This field selects a family but does not load a font file. For a bundled custom font, configure the Message provider /CustomFonts with FontFamily and Filename (for example MyFont and MyFont.ttf for fonts/MyFont.ttf), then use that same FontFamily here. The family must already be available when drawing. If unavailable, the browser resolves its fallback; this assignment does not append rmmz-mainfont or the database fallback fonts. An authored CSS family list can specify fallbacks, for example MyFont, Arial, sans-serif.
 * @default Arial
 *
 * @param FontSize:num
 * @text Font Size
 * @type number
 * @desc Font size in pixels for the message button console text. Text is drawn within each fixed button window; choose a size that fits ButtonWidth and ButtonHeight. Large sizes can be clipped or compressed to the available width; no automatic layout enlargement is guaranteed.
 * @default 18
 * @min 1
 *
 * @param NormalColor:str
 * @text Normal Color
 * @type text
 * @desc Text color for the normal console-button state. Supply a JSON string containing #rrggbb, for example "#ff8800", or an integer palette index written as a string, for example "0". Standard MZ palette indices are 0..31: eight columns by four rows, read left to right then top to bottom; 0 is the first swatch and 24 is the first swatch of the fourth row. The actual colors come from the engine ColorManager windowskin, normally img/system/Window.png, independently of the console WindowSkin setting.
 * @default 0
 *
 * @param ToggledColor:str
 * @text Toggled Color
 * @type text
 * @desc Text color for the toggled console-button state. Supply a JSON string containing #rrggbb, for example "#ff8800", or an integer palette index written as a string, for example "0". Standard MZ palette indices are 0..31: eight columns by four rows, read left to right then top to bottom; 0 is the first swatch and 24 is the first swatch of the fourth row. The actual colors come from the engine ColorManager windowskin, normally img/system/Window.png, independently of the console WindowSkin setting.
 * @default 24
 *
 * @param DisabledColor:str
 * @text Disabled Color
 * @type text
 * @desc Text color for the disabled console-button state. Supply a JSON string containing #rrggbb, for example "#ff8800", or an integer palette index written as a string, for example "0". Standard MZ palette indices are 0..31: eight columns by four rows, read left to right then top to bottom; 0 is the first swatch and 24 is the first swatch of the fourth row. The actual colors come from the engine ColorManager windowskin, normally img/system/Window.png, independently of the console WindowSkin setting.
 * @default 7
 *
 * @param ButtonOffsetX:num
 * @text Offset X
 * @type number
 * @desc Horizontal offset in pixels from the centered button row inside the message window; positive moves right, negative left. Applied for console positions top and bottom. The row is centered before this offset, without automatic resizing or horizontal clamping.
 * @default +0
 *
 * @param ButtonOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Vertical offset in pixels; positive moves down, negative up. For a bottom console it offsets the button row from window height minus button height and buffer. For a top console it shifts the text contents after the reserved button height; top buttons themselves stay at ButtonBuffer.
 * @default +0
 *
 * @param ButtonWidth:num
 * @text Width
 * @type number
 * @desc Width of each button window and its input area in pixels. The complete row uses count * width + (count - 1) * buffer and is centered in the message window. Buttons are not resized or wrapped to fit; choose dimensions that fit the available window.
 * @default 86
 * @min 1
 *
 * @param ButtonHeight:num
 * @text Height
 * @type number
 * @desc Height of each button window and its input area in pixels. A visible top/bottom console reserves this height in the message layout. Buttons are not scaled down when too large; choose a height that leaves enough room for message text.
 * @default 36
 * @min 1
 *
 * @param ButtonBuffer:num
 * @text Buffer
 * @type number
 * @desc Horizontal gap between buttons in pixels; also used as the top/bottom row margin. The row width includes (button count - 1) gaps. Author values >=1, as required by this field schema. Raw registry values are not normalized by runtime, and negative values there can overlap windows. There is no automatic fit or wrapping.
 * @default 6
 * @min 1
 *
 * @param ImgDisabled:str
 * @text Disabled Image
 * @type file
 * @desc Background image for a disabled console button. Enter a PNG filename from img/system without .png. It is displayed at its original pixel size, without scaling; prepare dimensions to match the button width/height. Empty means no image for this state. If all three state filenames are empty, buttons use their windowskin. If any image is configured, the windowskin is hidden and a state with an empty filename has no image background.
 * @default 
 * @dir img/system/
 *
 * @param ImgDisabledOffsetX:num
 * @text Offset X
 * @type number
 * @desc Disabled background image X offset in pixels from the top-left of its button window. Positive moves right, negative moves left. No automatic centering or scaling is applied; the image is displayed at original size.
 * @default +0
 *
 * @param ImgDisabledOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Disabled background image Y offset in pixels from the top-left of its button window. Positive moves down, negative moves up. No automatic centering or scaling is applied; the image is displayed at original size.
 * @default +0
 *
 * @param ImgEnabled:str
 * @text Enabled Image
 * @type file
 * @desc Background image for a enabled console button. Enter a PNG filename from img/system without .png. It is displayed at its original pixel size, without scaling; prepare dimensions to match the button width/height. Empty means no image for this state. If all three state filenames are empty, buttons use their windowskin. If any image is configured, the windowskin is hidden and a state with an empty filename has no image background.
 * @default 
 * @dir img/system/
 *
 * @param ImgEnabledOffsetX:num
 * @text Offset X
 * @type number
 * @desc Enabled background image X offset in pixels from the top-left of its button window. Positive moves right, negative moves left. No automatic centering or scaling is applied; the image is displayed at original size.
 * @default +0
 *
 * @param ImgEnabledOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Enabled background image Y offset in pixels from the top-left of its button window. Positive moves down, negative moves up. No automatic centering or scaling is applied; the image is displayed at original size.
 * @default +0
 *
 * @param ImgToggled:str
 * @text Toggled Image
 * @type file
 * @desc Background image for a toggled console button. Enter a PNG filename from img/system without .png. It is displayed at its original pixel size, without scaling; prepare dimensions to match the button width/height. Empty means no image for this state. If all three state filenames are empty, buttons use their windowskin. If any image is configured, the windowskin is hidden and a state with an empty filename has no image background.
 * @default 
 * @dir img/system/
 *
 * @param ImgToggledOffsetX:num
 * @text Offset X
 * @type number
 * @desc Toggled background image X offset in pixels from the top-left of its button window. Positive moves right, negative moves left. No automatic centering or scaling is applied; the image is displayed at original size.
 * @default +0
 *
 * @param ImgToggledOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Toggled background image Y offset in pixels from the top-left of its button window. Positive moves down, negative moves up. No automatic centering or scaling is applied; the image is displayed at original size.
 * @default +0
 *
 */

/*~struct~Buttons:
 * @param List:arraystr
 * @text List
 * @type combo[]
 * @desc Which buttons appear and in what order?
 * @default ["auto","fastFwd","log","hide","save","load","options","gameEnd"]
 * @option auto
 * @value auto
 * @option log
 * @value log
 * @option fastFwd
 * @value fastFwd
 * @option gameEnd
 * @value gameEnd
 * @option hide
 * @value hide
 * @option load
 * @value load
 * @option options
 * @value options
 * @option save
 * @value save
 *
 * @param AutoKey:str
 * @text Auto-Forward Key
 * @type combo
 * @desc This is the key used for auto-forwarding messages.
 * @default none
 * @option none
 * @value none
 * @option tab
 * @value tab
 * @option shift
 * @value shift
 * @option control
 * @value control
 * @option pageup
 * @value pageup
 * @option pagedown
 * @value pagedown
 *
 * @param SaveKey:str
 * @text Save Key
 * @type combo
 * @desc This is the key used for quick saving.
 * @default none
 * @option none
 * @value none
 * @option tab
 * @value tab
 * @option shift
 * @value shift
 * @option control
 * @value control
 * @option pageup
 * @value pageup
 * @option pagedown
 * @value pagedown
 *
 * @param LoadKey:str
 * @text Load Key
 * @type combo
 * @desc This is the key used for quick load.
 * @default none
 * @option none
 * @value none
 * @option tab
 * @value tab
 * @option shift
 * @value shift
 * @option control
 * @value control
 * @option pageup
 * @value pageup
 * @option pagedown
 * @value pagedown
 *
 * @param OptionsKey:str
 * @text Options Key
 * @type combo
 * @desc This is the key used for opening options.
 * @default none
 * @option none
 * @value none
 * @option tab
 * @value tab
 * @option shift
 * @value shift
 * @option control
 * @value control
 * @option pageup
 * @value pageup
 * @option pagedown
 * @value pagedown
 *
 * @param GameEndKey:str
 * @text Game End Key
 * @type combo
 * @desc This is the key used for ending the game.
 * @default none
 * @option none
 * @value none
 * @option tab
 * @value tab
 * @option shift
 * @value shift
 * @option control
 * @value control
 * @option pageup
 * @value pageup
 * @option pagedown
 * @value pagedown
 *
 * @param Auto:str
 * @text Auto-Forward
 * @type text
 * @desc How is this option's text displayed in-game?
 * @default AUTO
 *
 * @param FastFwd:str
 * @text Fast Forward
 * @type text
 * @desc How is this option's text displayed in-game?
 * @default FAST
 *
 * @param Save:str
 * @text Save Game
 * @type text
 * @desc How is this option's text displayed in-game?
 * @default SAVE
 *
 * @param Load:str
 * @text Load Game
 * @type text
 * @desc How is this option's text displayed in-game?
 * @default LOAD
 *
 * @param Options:str
 * @text Options
 * @type text
 * @desc How is this option's text displayed in-game?
 * @default CONFIG
 *
 * @param GameEnd:str
 * @text Game End
 * @type text
 * @desc How is this option's text displayed in-game?
 * @default TITLE
 *
 */

/*~struct~MsgCursor:
 * @param Enable:eval
 * @text Enable?
 * @type boolean
 * @desc Enable or disable the message cursor?
 * @default true
 *
 * @param GraphicType:str
 * @text Graphic Type
 * @type select
 * @desc What is the cursor's graphic type?
 * @default icon
 * @option icon
 * @value icon
 * @option image
 * @value image
 * @option windowskin
 * @value windowskin
 *
 * @param IconIndex:str
 * @text Icon Index
 * @type text
 * @desc This is icon used for the Message Cursor.
 * @default 188
 *
 * @param FlipMultiplier:str
 * @text Flip Speed Multiplier
 * @type text
 * @desc Icon cursor flip speed as a numeric string in radians per game frame, for example "0.125". scale.x = cos(Graphics.frameCount * value), with period 2*pi/abs(value). The normal string "0" yields scale.x=1; negative values give the same cosine as their positive counterparts. This field is not evaluated as JavaScript: "1/8" is not a valid numeric string. The complete MsgCursor preset supplies "0.125"; the individual field default "1" does not replace an explicit preset value.
 * @default 1
 *
 * @param Filename:str
 * @text Filename
 * @type file
 * @desc Cursor image basename in img/system, without .png; for example Cursor loads img/system/Cursor.png. Used only when MsgCursor.Enable evaluates true and GraphicType is image. Supply an existing image; an empty filename supplies no drawable image. Rows and Cols divide it into equal cells, animated with FrameDelay game frames per cell.
 * @default 
 * @dir img/system/
 *
 * @param Rows:num
 * @text Image Rows
 * @type number
 * @desc How many rows are there for the image?
 * @default 1
 * @min 1
 *
 * @param Cols:num
 * @text Image Columns
 * @type number
 * @desc How many columns are there for the image?
 * @default 1
 * @min 1
 *
 * @param FrameDelay:num
 * @text Frame Delay
 * @type number
 * @desc How many frames delayed are there per animated cell?
 * @default 4
 * @min 1
 *
 * @param AnchorX:num
 * @text Anchor X
 * @type number
 * @desc Horizontal sprite anchor as a fraction of cursor image or icon width: 0=left edge, 0.5=center, 1=right edge. The anchor point is placed at the cursor position after OffsetX. Finite values outside 0..1 are accepted and move the anchor outside the graphic; there is no anchor clamp.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @type number
 * @desc Vertical sprite anchor as a fraction of cursor image or icon height: 0=top edge, 0.5=center, 1=bottom edge. The anchor point is placed at the cursor position after OffsetY. Finite values outside 0..1 are accepted and move the anchor outside the graphic; there is no anchor clamp.
 * @default 1
 *
 * @param OffsetX:num
 * @text Offset X
 * @type number
 * @desc Offset the Message Cursor's X position by how many pixels?
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @type number
 * @desc Offset the Message Cursor's Y position by how many pixels?
 * @default -8
 *
 */

/*~struct~MsgTail:
 * @param autoPositionTail:eval
 * @text Enable?
 * @type boolean
 * @desc Show the lower message tail during automatic event-relative message positioning when true.
 * @default true
 *
 * @param autoPositionLeft:eval
 * @text Face Left?
 * @type boolean
 * @desc Which direction does the Message Tail point to?
 * @default true
 *
 * @param autoCorrectX:eval
 * @text Auto-Correct X
 * @type boolean
 * @desc When true, shift an automatic message tail horizontally to compensate when the auto-positioned message window is clamped at the screen edge. Applies when the tail uses its automatic X position; explicit <Tail BL: 100> coordinates are not corrected. False leaves the tail at the window center plus its configured offset.
 * @default true
 *
 * @param autoPositionOffsetX:num
 * @text Offset X
 * @type number
 * @desc Horizontal message-window offset in pixels, added to the Message auto-position offset when MsgTail.autoPositionTail is true. Positive moves right and negative moves left before the window placement clamp. It moves the window, not just the tail sprite; use an auto-position text code such as <AUTO EVENT: 1> with an existing event in the current map.
 * @default +0
 *
 * @param autoPositionOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Vertical message-window offset in pixels, added to the Message auto-position offset when MsgTail.autoPositionTail is true. Positive moves down and negative moves up before the window placement clamp. It moves the window, not just the tail sprite; use an auto-position text code such as <AUTO EVENT: 1> with an existing event in the current map.
 * @default +0
 *
 * @param bottomLeftFilename:str
 * @text Filename
 * @type file
 * @desc Image basename for the bottomLeft tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.
 * @default 
 * @dir img/system/
 *
 * @param bottomLeftAnchorX:num
 * @text Anchor X
 * @type number
 * @desc Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.
 * @default 0.5
 *
 * @param bottomLeftAnchorY:num
 * @text Anchor Y
 * @type number
 * @desc Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.
 * @default 0.0
 *
 * @param bottomLeftOffsetX:num
 * @text Offset X
 * @type number
 * @desc Horizontal bottomLeft tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.
 * @default +0
 *
 * @param bottomLeftOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Vertical bottomLeft tail offset in pixels: positive moves down, negative up. Added to the message window bottom edge (window height). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.
 * @default +0
 *
 * @param bottomRightFilename:str
 * @text Filename
 * @type file
 * @desc Image basename for the bottomRight tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.
 * @default 
 * @dir img/system/
 *
 * @param bottomRightAnchorX:num
 * @text Anchor X
 * @type number
 * @desc Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.
 * @default 0.5
 *
 * @param bottomRightAnchorY:num
 * @text Anchor Y
 * @type number
 * @desc Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.
 * @default 0.0
 *
 * @param bottomRightOffsetX:num
 * @text Offset X
 * @type number
 * @desc Horizontal bottomRight tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.
 * @default +0
 *
 * @param bottomRightOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Vertical bottomRight tail offset in pixels: positive moves down, negative up. Added to the message window bottom edge (window height). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.
 * @default +0
 *
 * @param upperLeftFilename:str
 * @text Filename
 * @type file
 * @desc Image basename for the upperLeft tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.
 * @default 
 * @dir img/system/
 *
 * @param upperLeftAnchorX:num
 * @text Anchor X
 * @type number
 * @desc Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.
 * @default 0.5
 *
 * @param upperLeftAnchorY:num
 * @text Anchor Y
 * @type number
 * @desc Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.
 * @default 1.0
 *
 * @param upperLeftOffsetX:num
 * @text Offset X
 * @type number
 * @desc Horizontal upperLeft tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.
 * @default +0
 *
 * @param upperLeftOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Vertical upperLeft tail offset in pixels: positive moves down, negative up. Added to the message window top edge (Y=0). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.
 * @default +0
 *
 * @param upperRightFilename:str
 * @text Filename
 * @type file
 * @desc Image basename for the upperRight tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.
 * @default 
 * @dir img/system/
 *
 * @param upperRightAnchorX:num
 * @text Anchor X
 * @type number
 * @desc Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.
 * @default 0.5
 *
 * @param upperRightAnchorY:num
 * @text Anchor Y
 * @type number
 * @desc Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.
 * @default 1.0
 *
 * @param upperRightOffsetX:num
 * @text Offset X
 * @type number
 * @desc Horizontal upperRight tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.
 * @default +0
 *
 * @param upperRightOffsetY:num
 * @text Offset Y
 * @type number
 * @desc Vertical upperRight tail offset in pixels: positive moves down, negative up. Added to the message window top edge (Y=0). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.
 * @default +0
 *
 */

/*~struct~ScrollWheel:
 * @param Enable:eval
 * @text Enable?
 * @type boolean
 * @desc Enable message mouse-wheel controls at game startup. When false, this plugin installs no wheel-to-advance or wheel-to-log handling. When true, the individual ScrollDownNext and ScrollUpMsgLog switches control those actions.
 * @default true
 *
 * @param ScrollDownNext:eval
 * @text Scroll Down: Next?
 * @type boolean
 * @desc Set "Scroll Down" to "Next"?
 * @default true
 *
 * @param ScrollUpMsgLog:eval
 * @text Scroll Up: Log?
 * @type boolean
 * @desc Allow the upward mouse-wheel shortcut to open the optional MessageLog during a map message.
 * @default true
 *
 */

(() => {
"use strict";
const catalog = {
  "schemaVersion": 1,
  "pluginId": "Coreto_2_ExtMessageFunc",
  "version": "0.1.0",
  "reference": {
    "pluginId": "VisuMZ_2_ExtMessageFunc",
    "version": "1.22"
  },
  "parameters": [
    {
      "id": "EXT-CONFIG-SOURCE",
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
      "id": "EXT-M-013",
      "key": "Auto",
      "storageKey": "Auto:struct",
      "label": "Auto-Forward Settings",
      "description": "Auto-Forward settings used for this game.",
      "editorType": "struct<Auto>",
      "nativeDefault": "{\"WaitPerChar:num\":\"6\",\"MinimumWait:num\":\"300\"}",
      "type": "struct",
      "structName": "Auto",
      "fields": [
        {
          "id": "EXT-M-023",
          "key": "WaitPerChar",
          "storageKey": "WaitPerChar:num",
          "label": "Wait per Character",
          "description": "How many frames should the game wait per character?",
          "editorType": "number",
          "nativeDefault": "6",
          "type": "number",
          "min": 1,
          "default": 6
        },
        {
          "id": "EXT-M-024",
          "key": "MinimumWait",
          "storageKey": "MinimumWait:num",
          "label": "Minimum Wait",
          "description": "What is the minimum amount of frames to wait?",
          "editorType": "number",
          "nativeDefault": "300",
          "type": "number",
          "min": 1,
          "default": 300
        },
        {
          "id": "EXT-M-026",
          "key": "VoiceActAutoPadding",
          "storageKey": "VoiceActAutoPadding:num",
          "label": "Voice Act Padding",
          "description": "Game-frame count retained for an external VoiceActControl integration, normally intended as padding after a voice line. The CLI accepts a number >=1; the default is 60. Coreto exposes this setting but does not consume it in its local auto-forward timer or supply voice playback/wait hooks. Changing this value alone does not make messages wait for voice; an external implementation and its own compatibility contract are required.",
          "editorType": "number",
          "nativeDefault": "60",
          "type": "number",
          "min": 1,
          "default": 60
        }
      ],
      "default": {
        "WaitPerChar": 6,
        "MinimumWait": 300,
        "VoiceActAutoPadding": 60
      },
      "context": "WaitPerChar and MinimumWait govern the local auto-forward timer. VoiceActAutoPadding is an external voice integration field: without that provider it does not alter the local text timer. Consult ext-message api describe EXT-M-026 --json for its availability and prerequisites."
    },
    {
      "id": "EXT-M-014",
      "key": "FastFwd",
      "storageKey": "FastFwd:struct",
      "label": "Fast Forward (Extended)",
      "description": "Extended Fast Forward settings used for this game.",
      "editorType": "struct<FastFwd>",
      "nativeDefault": "{\"Enable:eval\":\"true\",\"Speed:num\":\"8\",\"SceneChangeReset:eval\":\"true\"}",
      "type": "struct",
      "structName": "FastFwd",
      "fields": [
        {
          "id": "EXT-M-027",
          "key": "Enable",
          "storageKey": "Enable:eval",
          "label": "Enable?",
          "description": "Enable or disable the Extended Fast Forward feature?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true"
        },
        {
          "id": "EXT-M-028",
          "key": "Speed",
          "storageKey": "Speed:num",
          "label": "Speed",
          "description": "What is the speed at which Extended Fast Forward works at?",
          "editorType": "number",
          "nativeDefault": "8",
          "type": "number",
          "min": 2,
          "default": 8
        },
        {
          "id": "EXT-M-029",
          "key": "SceneChangeReset",
          "storageKey": "SceneChangeReset:eval",
          "label": "Reset on Scene Change?",
          "description": "Reset Fast Forward setting on scene changes (ie battle, menu, or map transfers)?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true"
        }
      ],
      "default": {
        "Enable": "true",
        "Speed": 8,
        "SceneChangeReset": "true"
      }
    },
    {
      "id": "EXT-M-015",
      "key": "MsgButtonConsole",
      "storageKey": "MsgButtonConsole:struct",
      "label": "Message Button Console",
      "description": "Layout and backgrounds of the message button console. Positions and sizes are pixels relative to the message window; background images are loaded from img/system at their original size. See the individual fields for placement and empty-image behavior.",
      "editorType": "struct<MsgButtonConsole>",
      "nativeDefault": "{\"General\":\"\",\"ShowDefault:eval\":\"true\",\"Position:str\":\"bottom\",\"Appearance\":\"\",\"WindowSkin:str\":\"Window\",\"FontFace:str\":\"Arial\",\"FontSize:num\":\"18\",\"TextColors\":\"\",\"NormalColor:str\":\"0\",\"ToggledColor:str\":\"24\",\"DisabledColor:str\":\"7\",\"Visuals\":\"\",\"ButtonWidth:num\":\"86\",\"ButtonHeight:num\":\"36\",\"ButtonBuffer:num\":\"6\"}",
      "type": "struct",
      "structName": "MsgButtonConsole",
      "fields": [
        {
          "id": "EXT-M-031",
          "key": "ShowDefault",
          "storageKey": "ShowDefault:eval",
          "label": "Show by Default?",
          "description": "Show or hide the Message Button Console by default?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true"
        },
        {
          "id": "EXT-M-032",
          "key": "Position",
          "storageKey": "Position:str",
          "label": "Position",
          "description": "Where do you wish to display the Message Button Console?",
          "editorType": "select",
          "nativeDefault": "bottom",
          "type": "string",
          "options": [
            "top",
            "bottom"
          ],
          "default": "bottom"
        },
        {
          "id": "EXT-M-033",
          "key": "AutoSizeHide",
          "storageKey": "AutoSizeHide:eval",
          "label": "Auto-Size Hide?",
          "description": "When true, hide the button console for messages using auto-size or auto-position text codes. For example, <Auto> sizes the message and <Auto Event: 1> anchors it to illustrative event ID 1. When false, those codes do not automatically hide the console; its other visibility settings still apply.",
          "editorType": "boolean",
          "nativeDefault": "false",
          "type": "string",
          "javascript": "expression",
          "default": "false"
        },
        {
          "id": "EXT-M-035",
          "key": "WindowSkin",
          "storageKey": "WindowSkin:str",
          "label": "Window Skin",
          "description": "Console window-skin PNG basename in img/system, without .png; Window loads img/system/Window.png. Supply an existing MZ-compatible windowskin atlas (normally 192 by 192 pixels), not an arbitrary button icon.",
          "editorType": "file",
          "nativeDefault": "Window",
          "type": "string",
          "directory": "img/system/",
          "default": "Window",
          "context": "Configure /MsgButtonConsole/WindowSkin as a JSON string and restart the game. This selects the console background/frame skin; it does not replace a shared asset or define the ColorManager text-color palette.",
          "examples": [
            {
              "input": "ext-message parameters set --path /MsgButtonConsole/WindowSkin --value '\"Window\"' --json; run with --project pointing to the MZ game containing img/system/Window.png.",
              "expected": "The console uses the existing Window windowskin after restarting the game."
            }
          ]
        },
        {
          "id": "EXT-M-036",
          "key": "FontFace",
          "storageKey": "FontFace:str",
          "label": "Font Name",
          "description": "CSS font-family string assigned to message-console button text. Arial is the default and depends on availability on the platform. This field selects a family but does not load a font file. For a bundled custom font, configure the Message provider /CustomFonts with FontFamily and Filename (for example MyFont and MyFont.ttf for fonts/MyFont.ttf), then use that same FontFamily here. The family must already be available when drawing. If unavailable, the browser resolves its fallback; this assignment does not append rmmz-mainfont or the database fallback fonts. An authored CSS family list can specify fallbacks, for example MyFont, Arial, sans-serif.",
          "editorType": "text",
          "nativeDefault": "Arial",
          "type": "string",
          "default": "Arial",
          "context": "Font family used by Window_ButtonConsole for message-console button text. Configure /MsgButtonConsole/FontFace, load custom fonts through Message /CustomFonts when needed, and restart the game. The field selects a family without loading it.",
          "examples": [
            {
              "input": "Arial",
              "expected": "Texto usa a família de fonte configurada, mantendo métricas coerentes com desenho."
            }
          ]
        },
        {
          "id": "EXT-M-037",
          "key": "FontSize",
          "storageKey": "FontSize:num",
          "label": "Font Size",
          "description": "Font size in pixels for the message button console text. Text is drawn within each fixed button window; choose a size that fits ButtonWidth and ButtonHeight. Large sizes can be clipped or compressed to the available width; no automatic layout enlargement is guaranteed.",
          "editorType": "number",
          "nativeDefault": "18",
          "type": "number",
          "min": 1,
          "default": 18
        },
        {
          "id": "EXT-M-039",
          "key": "NormalColor",
          "storageKey": "NormalColor:str",
          "label": "Normal Color",
          "description": "Text color for the normal console-button state. Supply a JSON string containing #rrggbb, for example \"#ff8800\", or an integer palette index written as a string, for example \"0\". Standard MZ palette indices are 0..31: eight columns by four rows, read left to right then top to bottom; 0 is the first swatch and 24 is the first swatch of the fourth row. The actual colors come from the engine ColorManager windowskin, normally img/system/Window.png, independently of the console WindowSkin setting.",
          "editorType": "text",
          "nativeDefault": "0",
          "type": "string",
          "default": "0",
          "context": "Configure /MsgButtonConsole/NormalColor and restart the game. Use #rrggbb for an explicit color independent of the palette. Numeric text selects ColorManager.textColor(index); do not use a database ID or assume a fixed named color for a custom windowskin.",
          "examples": [
            {
              "input": "ext-message parameters set --path /MsgButtonConsole/NormalColor --value '\"#ff8800\"' --json; run with --project pointing to the MZ game. The orange value is illustrative.",
              "expected": "The normal button text uses the selected RGB color when that state is drawn."
            }
          ]
        },
        {
          "id": "EXT-M-040",
          "key": "ToggledColor",
          "storageKey": "ToggledColor:str",
          "label": "Toggled Color",
          "description": "Text color for the toggled console-button state. Supply a JSON string containing #rrggbb, for example \"#ff8800\", or an integer palette index written as a string, for example \"0\". Standard MZ palette indices are 0..31: eight columns by four rows, read left to right then top to bottom; 0 is the first swatch and 24 is the first swatch of the fourth row. The actual colors come from the engine ColorManager windowskin, normally img/system/Window.png, independently of the console WindowSkin setting.",
          "editorType": "text",
          "nativeDefault": "24",
          "type": "string",
          "default": "24",
          "context": "Configure /MsgButtonConsole/ToggledColor and restart the game. Use #rrggbb for an explicit color independent of the palette. Numeric text selects ColorManager.textColor(index); do not use a database ID or assume a fixed named color for a custom windowskin.",
          "examples": [
            {
              "input": "ext-message parameters set --path /MsgButtonConsole/ToggledColor --value '\"#ff8800\"' --json; run with --project pointing to the MZ game. The orange value is illustrative.",
              "expected": "The toggled button text uses the selected RGB color when that state is drawn."
            }
          ]
        },
        {
          "id": "EXT-M-041",
          "key": "DisabledColor",
          "storageKey": "DisabledColor:str",
          "label": "Disabled Color",
          "description": "Text color for the disabled console-button state. Supply a JSON string containing #rrggbb, for example \"#ff8800\", or an integer palette index written as a string, for example \"0\". Standard MZ palette indices are 0..31: eight columns by four rows, read left to right then top to bottom; 0 is the first swatch and 24 is the first swatch of the fourth row. The actual colors come from the engine ColorManager windowskin, normally img/system/Window.png, independently of the console WindowSkin setting.",
          "editorType": "text",
          "nativeDefault": "7",
          "type": "string",
          "default": "7",
          "context": "Configure /MsgButtonConsole/DisabledColor and restart the game. Use #rrggbb for an explicit color independent of the palette. Numeric text selects ColorManager.textColor(index); do not use a database ID or assume a fixed named color for a custom windowskin.",
          "examples": [
            {
              "input": "ext-message parameters set --path /MsgButtonConsole/DisabledColor --value '\"#ff8800\"' --json; run with --project pointing to the MZ game. The orange value is illustrative.",
              "expected": "The disabled button text uses the selected RGB color when that state is drawn."
            }
          ]
        },
        {
          "id": "EXT-M-043",
          "key": "ButtonOffsetX",
          "storageKey": "ButtonOffsetX:num",
          "label": "Offset X",
          "description": "Horizontal offset in pixels from the centered button row inside the message window; positive moves right, negative left. Applied for console positions top and bottom. The row is centered before this offset, without automatic resizing or horizontal clamping.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-044",
          "key": "ButtonOffsetY",
          "storageKey": "ButtonOffsetY:num",
          "label": "Offset Y",
          "description": "Vertical offset in pixels; positive moves down, negative up. For a bottom console it offsets the button row from window height minus button height and buffer. For a top console it shifts the text contents after the reserved button height; top buttons themselves stay at ButtonBuffer.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-045",
          "key": "ButtonWidth",
          "storageKey": "ButtonWidth:num",
          "label": "Width",
          "description": "Width of each button window and its input area in pixels. The complete row uses count * width + (count - 1) * buffer and is centered in the message window. Buttons are not resized or wrapped to fit; choose dimensions that fit the available window.",
          "editorType": "number",
          "nativeDefault": "86",
          "type": "number",
          "min": 1,
          "default": 86
        },
        {
          "id": "EXT-M-046",
          "key": "ButtonHeight",
          "storageKey": "ButtonHeight:num",
          "label": "Height",
          "description": "Height of each button window and its input area in pixels. A visible top/bottom console reserves this height in the message layout. Buttons are not scaled down when too large; choose a height that leaves enough room for message text.",
          "editorType": "number",
          "nativeDefault": "36",
          "type": "number",
          "min": 1,
          "default": 36
        },
        {
          "id": "EXT-M-047",
          "key": "ButtonBuffer",
          "storageKey": "ButtonBuffer:num",
          "label": "Buffer",
          "description": "Horizontal gap between buttons in pixels; also used as the top/bottom row margin. The row width includes (button count - 1) gaps. Author values >=1, as required by this field schema. Raw registry values are not normalized by runtime, and negative values there can overlap windows. There is no automatic fit or wrapping.",
          "editorType": "number",
          "nativeDefault": "6",
          "type": "number",
          "min": 1,
          "default": 6
        },
        {
          "id": "EXT-M-049",
          "key": "ImgDisabled",
          "storageKey": "ImgDisabled:str",
          "label": "Disabled Image",
          "description": "Background image for a disabled console button. Enter a PNG filename from img/system without .png. It is displayed at its original pixel size, without scaling; prepare dimensions to match the button width/height. Empty means no image for this state. If all three state filenames are empty, buttons use their windowskin. If any image is configured, the windowskin is hidden and a state with an empty filename has no image background.",
          "editorType": "file",
          "nativeDefault": "",
          "type": "string",
          "directory": "img/system/",
          "default": ""
        },
        {
          "id": "EXT-M-050",
          "key": "ImgDisabledOffsetX",
          "storageKey": "ImgDisabledOffsetX:num",
          "label": "Offset X",
          "description": "Disabled background image X offset in pixels from the top-left of its button window. Positive moves right, negative moves left. No automatic centering or scaling is applied; the image is displayed at original size.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-051",
          "key": "ImgDisabledOffsetY",
          "storageKey": "ImgDisabledOffsetY:num",
          "label": "Offset Y",
          "description": "Disabled background image Y offset in pixels from the top-left of its button window. Positive moves down, negative moves up. No automatic centering or scaling is applied; the image is displayed at original size.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-052",
          "key": "ImgEnabled",
          "storageKey": "ImgEnabled:str",
          "label": "Enabled Image",
          "description": "Background image for a enabled console button. Enter a PNG filename from img/system without .png. It is displayed at its original pixel size, without scaling; prepare dimensions to match the button width/height. Empty means no image for this state. If all three state filenames are empty, buttons use their windowskin. If any image is configured, the windowskin is hidden and a state with an empty filename has no image background.",
          "editorType": "file",
          "nativeDefault": "",
          "type": "string",
          "directory": "img/system/",
          "default": ""
        },
        {
          "id": "EXT-M-053",
          "key": "ImgEnabledOffsetX",
          "storageKey": "ImgEnabledOffsetX:num",
          "label": "Offset X",
          "description": "Enabled background image X offset in pixels from the top-left of its button window. Positive moves right, negative moves left. No automatic centering or scaling is applied; the image is displayed at original size.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-054",
          "key": "ImgEnabledOffsetY",
          "storageKey": "ImgEnabledOffsetY:num",
          "label": "Offset Y",
          "description": "Enabled background image Y offset in pixels from the top-left of its button window. Positive moves down, negative moves up. No automatic centering or scaling is applied; the image is displayed at original size.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-055",
          "key": "ImgToggled",
          "storageKey": "ImgToggled:str",
          "label": "Toggled Image",
          "description": "Background image for a toggled console button. Enter a PNG filename from img/system without .png. It is displayed at its original pixel size, without scaling; prepare dimensions to match the button width/height. Empty means no image for this state. If all three state filenames are empty, buttons use their windowskin. If any image is configured, the windowskin is hidden and a state with an empty filename has no image background.",
          "editorType": "file",
          "nativeDefault": "",
          "type": "string",
          "directory": "img/system/",
          "default": ""
        },
        {
          "id": "EXT-M-056",
          "key": "ImgToggledOffsetX",
          "storageKey": "ImgToggledOffsetX:num",
          "label": "Offset X",
          "description": "Toggled background image X offset in pixels from the top-left of its button window. Positive moves right, negative moves left. No automatic centering or scaling is applied; the image is displayed at original size.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-057",
          "key": "ImgToggledOffsetY",
          "storageKey": "ImgToggledOffsetY:num",
          "label": "Offset Y",
          "description": "Toggled background image Y offset in pixels from the top-left of its button window. Positive moves down, negative moves up. No automatic centering or scaling is applied; the image is displayed at original size.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        }
      ],
      "default": {
        "ShowDefault": "true",
        "Position": "bottom",
        "AutoSizeHide": "false",
        "WindowSkin": "Window",
        "FontFace": "Arial",
        "FontSize": 18,
        "NormalColor": "0",
        "ToggledColor": "24",
        "DisabledColor": "7",
        "ButtonOffsetX": 0,
        "ButtonOffsetY": 0,
        "ButtonWidth": 86,
        "ButtonHeight": 36,
        "ButtonBuffer": 6,
        "ImgDisabled": "",
        "ImgDisabledOffsetX": 0,
        "ImgDisabledOffsetY": 0,
        "ImgEnabled": "",
        "ImgEnabledOffsetX": 0,
        "ImgEnabledOffsetY": 0,
        "ImgToggled": "",
        "ImgToggledOffsetX": 0,
        "ImgToggledOffsetY": 0
      },
      "context": "mensagem no mapa; fast-forward estendido só no mapa; battle retorna false; console no mapa One supported setup is RPG Maker MZ 1.10.0 with Coreto_0_CoreEngine 0.1.0, then Coreto_1_MessageCore 0.1.0, then Coreto_2_ExtMessageFunc 0.1.0 active in js/plugins.js. Enable exactly one Core provider and one Message provider before Extended, and only one Extended provider; do not activate their original counterparts concurrently. With --project pointing to the game, core install, message install and ext-message install configure/activate those delivered Coreto plugins individually; installing Extended alone does not activate its dependencies. Reload the editor and restart the game after configuration. CLI whole-group replacement uses the logical object in default/fields, not nativeDefault or native keys with :str/:eval/:num suffixes. Supply all logical fields; native, unknown or missing keys are rejected. Numbers stay JSON numbers; JavaScript-expression fields such as ShowDefault and AutoSizeHide stay source-code strings (for example \"true\" and \"false\"), not JSON booleans. For a partial edit, use the individual /MsgButtonConsole/Field path. To preserve existing settings when replacing the group, first run ext-message parameters get --path /MsgButtonConsole --json, take result.value, edit it and supply that complete object to set.",
      "examples": [
        {
          "input": "Whole-group CLI example using the documented defaults (illustrative): ext-message parameters set --path /MsgButtonConsole --value '{\"ShowDefault\":\"true\",\"Position\":\"bottom\",\"AutoSizeHide\":\"false\",\"WindowSkin\":\"Window\",\"FontFace\":\"Arial\",\"FontSize\":18,\"NormalColor\":\"0\",\"ToggledColor\":\"24\",\"DisabledColor\":\"7\",\"ButtonOffsetX\":0,\"ButtonOffsetY\":0,\"ButtonWidth\":86,\"ButtonHeight\":36,\"ButtonBuffer\":6,\"ImgDisabled\":\"\",\"ImgDisabledOffsetX\":0,\"ImgDisabledOffsetY\":0,\"ImgEnabled\":\"\",\"ImgEnabledOffsetX\":0,\"ImgEnabledOffsetY\":0,\"ImgToggled\":\"\",\"ImgToggledOffsetX\":0,\"ImgToggledOffsetY\":0}' --json. Run with --project pointing to the configured MZ game. This replaces the complete group; use a field subpath to change only one setting.",
          "expected": "Estrutura MsgButtonConsole aplica os campos filhos mapeados individualmente; array conserva ordem, nomes e defaults de cada entrada."
        }
      ]
    },
    {
      "id": "EXT-M-016",
      "key": "Buttons",
      "storageKey": "Buttons:struct",
      "label": "Button Settings",
      "description": "Settings for which buttons appear and how they appear.",
      "editorType": "struct<Buttons>",
      "nativeDefault": "{\"General\":\"\",\"List:arraystr\":\"[\\\"auto\\\",\\\"fastFwd\\\",\\\"log\\\",\\\"hide\\\",\\\"save\\\",\\\"load\\\",\\\"options\\\",\\\"gameEnd\\\"]\",\"AutoKey:str\":\"none\",\"Shortcuts\":\"\",\"SaveKey:str\":\"none\",\"LoadKey:str\":\"none\",\"OptionsKey:str\":\"none\",\"GameEndKey:str\":\"none\",\"Vocab\":\"\",\"Auto:str\":\"AUTO\",\"FastFwd:str\":\"FAST\",\"Save:str\":\"SAVE\",\"Load:str\":\"LOAD\",\"Options:str\":\"CONFIG\",\"GameEnd:str\":\"TITLE\"}",
      "type": "struct",
      "structName": "Buttons",
      "fields": [
        {
          "id": "EXT-M-059",
          "key": "List",
          "storageKey": "List:arraystr",
          "label": "List",
          "description": "Which buttons appear and in what order?",
          "editorType": "combo[]",
          "nativeDefault": "[\"auto\",\"fastFwd\",\"log\",\"hide\",\"save\",\"load\",\"options\",\"gameEnd\"]",
          "type": "array",
          "items": {
            "type": "string",
            "default": "",
            "editorType": "combo"
          },
          "suggestions": [
            "auto",
            "log",
            "fastFwd",
            "gameEnd",
            "hide",
            "load",
            "options",
            "save"
          ],
          "default": [
            "auto",
            "fastFwd",
            "log",
            "hide",
            "save",
            "load",
            "options",
            "gameEnd"
          ],
          "context": "Buttons.List selects the console buttons. save/load require an active Save Core provider and options requires Options Core; hide requires Message Visibility; log/backlog require Message Log. Save also needs saving enabled, Load an existing save, and menu actions run on Scene_Map. Hidden or message-suppressed consoles ignore menu/auto shortcuts. If shortcuts collide, the first matching action wins in this order: auto, save, load, options, gameend. Extended fast-forward takes priority over this shortcut loop. Buttons without their required optional provider are omitted from the visible row; the remaining buttons preserve list order. Consult ext-message api describe EXT-M-016 --json for the complete group."
        },
        {
          "id": "EXT-M-061",
          "key": "AutoKey",
          "storageKey": "AutoKey:str",
          "label": "Auto-Forward Key",
          "description": "This is the key used for auto-forwarding messages.",
          "editorType": "combo",
          "nativeDefault": "none",
          "type": "string",
          "options": [
            "none",
            "tab",
            "shift",
            "control",
            "pageup",
            "pagedown"
          ],
          "default": "none",
          "context": "The console must be visible and not suppressed for this message; otherwise auto/menu shortcuts do nothing. When keys collide, the first matching action wins in order auto, save, load, options, gameend. Extended fast-forward takes precedence over this loop. Menu actions require Scene_Map; Save also needs saving enabled and Load an existing save."
        },
        {
          "id": "EXT-M-062",
          "key": "SaveKey",
          "storageKey": "SaveKey:str",
          "label": "Save Key",
          "description": "This is the key used for quick saving.",
          "editorType": "combo",
          "nativeDefault": "none",
          "type": "string",
          "options": [
            "none",
            "tab",
            "shift",
            "control",
            "pageup",
            "pagedown"
          ],
          "default": "none",
          "context": "The console must be visible and not suppressed for this message; otherwise auto/menu shortcuts do nothing. When keys collide, the first matching action wins in order auto, save, load, options, gameend. Extended fast-forward takes precedence over this loop. Menu actions require Scene_Map; Save also needs saving enabled and Load an existing save."
        },
        {
          "id": "EXT-M-063",
          "key": "LoadKey",
          "storageKey": "LoadKey:str",
          "label": "Load Key",
          "description": "This is the key used for quick load.",
          "editorType": "combo",
          "nativeDefault": "none",
          "type": "string",
          "options": [
            "none",
            "tab",
            "shift",
            "control",
            "pageup",
            "pagedown"
          ],
          "default": "none",
          "context": "The console must be visible and not suppressed for this message; otherwise auto/menu shortcuts do nothing. When keys collide, the first matching action wins in order auto, save, load, options, gameend. Extended fast-forward takes precedence over this loop. Menu actions require Scene_Map; Save also needs saving enabled and Load an existing save."
        },
        {
          "id": "EXT-M-064",
          "key": "OptionsKey",
          "storageKey": "OptionsKey:str",
          "label": "Options Key",
          "description": "This is the key used for opening options.",
          "editorType": "combo",
          "nativeDefault": "none",
          "type": "string",
          "options": [
            "none",
            "tab",
            "shift",
            "control",
            "pageup",
            "pagedown"
          ],
          "default": "none",
          "context": "The console must be visible and not suppressed for this message; otherwise auto/menu shortcuts do nothing. When keys collide, the first matching action wins in order auto, save, load, options, gameend. Extended fast-forward takes precedence over this loop. Menu actions require Scene_Map; Save also needs saving enabled and Load an existing save."
        },
        {
          "id": "EXT-M-065",
          "key": "GameEndKey",
          "storageKey": "GameEndKey:str",
          "label": "Game End Key",
          "description": "This is the key used for ending the game.",
          "editorType": "combo",
          "nativeDefault": "none",
          "type": "string",
          "options": [
            "none",
            "tab",
            "shift",
            "control",
            "pageup",
            "pagedown"
          ],
          "default": "none",
          "context": "The console must be visible and not suppressed for this message; otherwise auto/menu shortcuts do nothing. When keys collide, the first matching action wins in order auto, save, load, options, gameend. Extended fast-forward takes precedence over this loop. Menu actions require Scene_Map; Save also needs saving enabled and Load an existing save."
        },
        {
          "id": "EXT-M-067",
          "key": "Auto",
          "storageKey": "Auto:str",
          "label": "Auto-Forward",
          "description": "How is this option's text displayed in-game?",
          "editorType": "text",
          "nativeDefault": "AUTO",
          "type": "string",
          "default": "AUTO"
        },
        {
          "id": "EXT-M-068",
          "key": "FastFwd",
          "storageKey": "FastFwd:str",
          "label": "Fast Forward",
          "description": "How is this option's text displayed in-game?",
          "editorType": "text",
          "nativeDefault": "FAST",
          "type": "string",
          "default": "FAST"
        },
        {
          "id": "EXT-M-069",
          "key": "Save",
          "storageKey": "Save:str",
          "label": "Save Game",
          "description": "How is this option's text displayed in-game?",
          "editorType": "text",
          "nativeDefault": "SAVE",
          "type": "string",
          "default": "SAVE"
        },
        {
          "id": "EXT-M-070",
          "key": "Load",
          "storageKey": "Load:str",
          "label": "Load Game",
          "description": "How is this option's text displayed in-game?",
          "editorType": "text",
          "nativeDefault": "LOAD",
          "type": "string",
          "default": "LOAD"
        },
        {
          "id": "EXT-M-071",
          "key": "Options",
          "storageKey": "Options:str",
          "label": "Options",
          "description": "How is this option's text displayed in-game?",
          "editorType": "text",
          "nativeDefault": "CONFIG",
          "type": "string",
          "default": "CONFIG"
        },
        {
          "id": "EXT-M-072",
          "key": "GameEnd",
          "storageKey": "GameEnd:str",
          "label": "Game End",
          "description": "How is this option's text displayed in-game?",
          "editorType": "text",
          "nativeDefault": "TITLE",
          "type": "string",
          "default": "TITLE"
        }
      ],
      "default": {
        "List": [
          "auto",
          "fastFwd",
          "log",
          "hide",
          "save",
          "load",
          "options",
          "gameEnd"
        ],
        "AutoKey": "none",
        "SaveKey": "none",
        "LoadKey": "none",
        "OptionsKey": "none",
        "GameEndKey": "none",
        "Auto": "AUTO",
        "FastFwd": "FAST",
        "Save": "SAVE",
        "Load": "LOAD",
        "Options": "CONFIG",
        "GameEnd": "TITLE"
      },
      "context": "Buttons.List selects the console buttons. save/load require an active Save Core provider and options requires Options Core; hide requires Message Visibility; log/backlog require Message Log. Save also needs saving enabled, Load an existing save, and menu actions run on Scene_Map. Hidden or message-suppressed consoles ignore menu/auto shortcuts. If shortcuts collide, the first matching action wins in this order: auto, save, load, options, gameend. Extended fast-forward takes priority over this shortcut loop."
    },
    {
      "id": "EXT-M-017",
      "key": "MsgCursor",
      "storageKey": "MsgCursor:struct",
      "label": "Message Cursor Settings",
      "description": "Message Cursor settings used for this game.",
      "editorType": "struct<MsgCursor>",
      "nativeDefault": "{\"General\":\"\",\"Enable:eval\":\"true\",\"GraphicType:str\":\"icon\",\"Icon\":\"\",\"IconIndex:str\":\"188\",\"FlipMultiplier:str\":\"0.125\",\"Image\":\"\",\"Filename:str\":\"\",\"Rows:num\":\"1\",\"Cols:num\":\"1\",\"FrameDelay:num\":\"4\",\"Appearance\":\"\",\"AnchorX:num\":\"0.5\",\"AnchorY:num\":\"1\",\"OffsetX:num\":\"+0\",\"OffsetY:num\":\"-4\"}",
      "type": "struct",
      "structName": "MsgCursor",
      "fields": [
        {
          "id": "EXT-M-074",
          "key": "Enable",
          "storageKey": "Enable:eval",
          "label": "Enable?",
          "description": "Enable or disable the message cursor?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true"
        },
        {
          "id": "EXT-M-075",
          "key": "GraphicType",
          "storageKey": "GraphicType:str",
          "label": "Graphic Type",
          "description": "What is the cursor's graphic type?",
          "editorType": "select",
          "nativeDefault": "icon",
          "type": "string",
          "options": [
            "icon",
            "image",
            "windowskin"
          ],
          "default": "icon"
        },
        {
          "id": "EXT-M-077",
          "key": "IconIndex",
          "storageKey": "IconIndex:str",
          "label": "Icon Index",
          "description": "This is icon used for the Message Cursor.",
          "editorType": "text",
          "nativeDefault": "188",
          "type": "string",
          "default": "188"
        },
        {
          "id": "EXT-M-078",
          "key": "FlipMultiplier",
          "storageKey": "FlipMultiplier:str",
          "label": "Flip Speed Multiplier",
          "description": "Icon cursor flip speed as a numeric string in radians per game frame, for example \"0.125\". scale.x = cos(Graphics.frameCount * value), with period 2*pi/abs(value). The normal string \"0\" yields scale.x=1; negative values give the same cosine as their positive counterparts. This field is not evaluated as JavaScript: \"1/8\" is not a valid numeric string. The complete MsgCursor preset supplies \"0.125\"; the individual field default \"1\" does not replace an explicit preset value.",
          "editorType": "text",
          "nativeDefault": "1",
          "type": "string",
          "default": "1"
        },
        {
          "id": "EXT-M-080",
          "key": "Filename",
          "storageKey": "Filename:str",
          "label": "Filename",
          "description": "Cursor image basename in img/system, without .png; for example Cursor loads img/system/Cursor.png. Used only when MsgCursor.Enable evaluates true and GraphicType is image. Supply an existing image; an empty filename supplies no drawable image. Rows and Cols divide it into equal cells, animated with FrameDelay game frames per cell.",
          "editorType": "file",
          "nativeDefault": "",
          "type": "string",
          "directory": "img/system/",
          "default": ""
        },
        {
          "id": "EXT-M-081",
          "key": "Rows",
          "storageKey": "Rows:num",
          "label": "Image Rows",
          "description": "How many rows are there for the image?",
          "editorType": "number",
          "nativeDefault": "1",
          "type": "number",
          "min": 1,
          "default": 1
        },
        {
          "id": "EXT-M-082",
          "key": "Cols",
          "storageKey": "Cols:num",
          "label": "Image Columns",
          "description": "How many columns are there for the image?",
          "editorType": "number",
          "nativeDefault": "1",
          "type": "number",
          "min": 1,
          "default": 1
        },
        {
          "id": "EXT-M-083",
          "key": "FrameDelay",
          "storageKey": "FrameDelay:num",
          "label": "Frame Delay",
          "description": "How many frames delayed are there per animated cell?",
          "editorType": "number",
          "nativeDefault": "4",
          "type": "number",
          "min": 1,
          "default": 4
        },
        {
          "id": "EXT-M-085",
          "key": "AnchorX",
          "storageKey": "AnchorX:num",
          "label": "Anchor X",
          "description": "Horizontal sprite anchor as a fraction of cursor image or icon width: 0=left edge, 0.5=center, 1=right edge. The anchor point is placed at the cursor position after OffsetX. Finite values outside 0..1 are accepted and move the anchor outside the graphic; there is no anchor clamp.",
          "editorType": "text",
          "nativeDefault": "0.5",
          "type": "number",
          "default": 0.5
        },
        {
          "id": "EXT-M-086",
          "key": "AnchorY",
          "storageKey": "AnchorY:num",
          "label": "Anchor Y",
          "description": "Vertical sprite anchor as a fraction of cursor image or icon height: 0=top edge, 0.5=center, 1=bottom edge. The anchor point is placed at the cursor position after OffsetY. Finite values outside 0..1 are accepted and move the anchor outside the graphic; there is no anchor clamp.",
          "editorType": "text",
          "nativeDefault": "1",
          "type": "number",
          "default": 1
        },
        {
          "id": "EXT-M-087",
          "key": "OffsetX",
          "storageKey": "OffsetX:num",
          "label": "Offset X",
          "description": "Offset the Message Cursor's X position by how many pixels?",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-088",
          "key": "OffsetY",
          "storageKey": "OffsetY:num",
          "label": "Offset Y",
          "description": "Offset the Message Cursor's Y position by how many pixels?",
          "editorType": "text",
          "nativeDefault": "-8",
          "type": "number",
          "default": -8
        }
      ],
      "default": {
        "Enable": "true",
        "GraphicType": "icon",
        "IconIndex": "188",
        "FlipMultiplier": "0.125",
        "Filename": "",
        "Rows": 1,
        "Cols": 1,
        "FrameDelay": 4,
        "AnchorX": 0.5,
        "AnchorY": 1,
        "OffsetX": 0,
        "OffsetY": -4
      },
      "context": "Cursor settings are initialized from the complete MsgCursor preset; explicit object values win over child field defaults. The preset uses FlipMultiplier 0.125 and OffsetY -4, while the individual field defaults are 1 and -8. AnchorX/AnchorY are image fractions: 0 left/top, 0.5 center, 1 right/bottom. Offsets are pixels. When inserting a cursor command, provide the complete argument object shown in its example; a newly inserted partial struct does not automatically acquire missing fields. Existing command updates retain encoded fields not supplied."
    },
    {
      "id": "EXT-M-018",
      "key": "MsgTail",
      "storageKey": "MsgTail:struct",
      "label": "Message Tail Settings",
      "description": "Message Tail settings used for Message Windows.",
      "editorType": "struct<MsgTail>",
      "nativeDefault": "{\"AutoPosition\":\"\",\"autoPositionTail:eval\":\"true\",\"autoPositionLeft:eval\":\"true\",\"autoPositionOffsetX:num\":\"+0\",\"autoPositionOffsetY:num\":\"+0\",\"TailDir\":\"\",\"BottomLeft\":\"\",\"bottomLeftFilename:str\":\"\",\"bottomLeftAnchorX:num\":\"0.5\",\"bottomLeftAnchorY:num\":\"0.0\",\"bottomLeftOffsetX:num\":\"+0\",\"bottomLeftOffsetY:num\":\"+0\",\"BottomRight\":\"\",\"bottomRightFilename:str\":\"\",\"bottomRightAnchorX:num\":\"0.5\",\"bottomRightAnchorY:num\":\"0.0\",\"bottomRightOffsetX:num\":\"+0\",\"bottomRightOffsetY:num\":\"+0\",\"UpperLeft\":\"\",\"upperLeftFilename:str\":\"\",\"upperLeftAnchorX:num\":\"0.5\",\"upperLeftAnchorY:num\":\"1.0\",\"upperLeftOffsetX:num\":\"+0\",\"upperLeftOffsetY:num\":\"+0\",\"UpperRight\":\"\",\"upperRightFilename:str\":\"\",\"upperRightAnchorX:num\":\"0.5\",\"upperRightAnchorY:num\":\"1.0\",\"upperRightOffsetX:num\":\"+0\",\"upperRightOffsetY:num\":\"+0\"}",
      "type": "struct",
      "structName": "MsgTail",
      "fields": [
        {
          "id": "EXT-M-090",
          "key": "autoPositionTail",
          "storageKey": "autoPositionTail:eval",
          "label": "Enable?",
          "description": "Show the lower message tail during automatic event-relative message positioning when true.",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true",
          "context": "Requires a nonempty lower-tail basename in /MsgTail settings and an existing event selected by an auto-position tag such as <AUTO EVENT: 1> in Show Text on the map. See EXT-M-018 for the event-relative tag. The corresponding image must exist in img/system; no image is synthesized by this flag. False leaves automatic positioning active but omits its tail. The tail becomes visible only when the message window is fully open.",
          "examples": [
            {
              "input": "Configure a lower-tail image basename, set /MsgTail/autoPositionTail to true, then use <AUTO EVENT: 1>Hello in Show Text on a map with event 1.",
              "expected": "Automatic positioning can show the configured lower tail once the message window is fully open."
            }
          ]
        },
        {
          "id": "EXT-M-091",
          "key": "autoPositionLeft",
          "storageKey": "autoPositionLeft:eval",
          "label": "Face Left?",
          "description": "Which direction does the Message Tail point to?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true"
        },
        {
          "id": "EXT-M-092",
          "key": "autoCorrectX",
          "storageKey": "autoCorrectX:eval",
          "label": "Auto-Correct X",
          "description": "When true, shift an automatic message tail horizontally to compensate when the auto-positioned message window is clamped at the screen edge. Applies when the tail uses its automatic X position; explicit <Tail BL: 100> coordinates are not corrected. False leaves the tail at the window center plus its configured offset.",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true"
        },
        {
          "id": "EXT-M-093",
          "key": "autoPositionOffsetX",
          "storageKey": "autoPositionOffsetX:num",
          "label": "Offset X",
          "description": "Horizontal message-window offset in pixels, added to the Message auto-position offset when MsgTail.autoPositionTail is true. Positive moves right and negative moves left before the window placement clamp. It moves the window, not just the tail sprite; use an auto-position text code such as <AUTO EVENT: 1> with an existing event in the current map.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-094",
          "key": "autoPositionOffsetY",
          "storageKey": "autoPositionOffsetY:num",
          "label": "Offset Y",
          "description": "Vertical message-window offset in pixels, added to the Message auto-position offset when MsgTail.autoPositionTail is true. Positive moves down and negative moves up before the window placement clamp. It moves the window, not just the tail sprite; use an auto-position text code such as <AUTO EVENT: 1> with an existing event in the current map.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-097",
          "key": "bottomLeftFilename",
          "storageKey": "bottomLeftFilename:str",
          "label": "Filename",
          "description": "Image basename for the bottomLeft tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.",
          "editorType": "file",
          "nativeDefault": "",
          "type": "string",
          "directory": "img/system/",
          "default": ""
        },
        {
          "id": "EXT-M-098",
          "key": "bottomLeftAnchorX",
          "storageKey": "bottomLeftAnchorX:num",
          "label": "Anchor X",
          "description": "Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
          "editorType": "text",
          "nativeDefault": "0.5",
          "type": "number",
          "default": 0.5
        },
        {
          "id": "EXT-M-099",
          "key": "bottomLeftAnchorY",
          "storageKey": "bottomLeftAnchorY:num",
          "label": "Anchor Y",
          "description": "Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
          "editorType": "text",
          "nativeDefault": "0.0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-100",
          "key": "bottomLeftOffsetX",
          "storageKey": "bottomLeftOffsetX:num",
          "label": "Offset X",
          "description": "Horizontal bottomLeft tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-101",
          "key": "bottomLeftOffsetY",
          "storageKey": "bottomLeftOffsetY:num",
          "label": "Offset Y",
          "description": "Vertical bottomLeft tail offset in pixels: positive moves down, negative up. Added to the message window bottom edge (window height). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-103",
          "key": "bottomRightFilename",
          "storageKey": "bottomRightFilename:str",
          "label": "Filename",
          "description": "Image basename for the bottomRight tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.",
          "editorType": "file",
          "nativeDefault": "",
          "type": "string",
          "directory": "img/system/",
          "default": ""
        },
        {
          "id": "EXT-M-104",
          "key": "bottomRightAnchorX",
          "storageKey": "bottomRightAnchorX:num",
          "label": "Anchor X",
          "description": "Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
          "editorType": "text",
          "nativeDefault": "0.5",
          "type": "number",
          "default": 0.5
        },
        {
          "id": "EXT-M-105",
          "key": "bottomRightAnchorY",
          "storageKey": "bottomRightAnchorY:num",
          "label": "Anchor Y",
          "description": "Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
          "editorType": "text",
          "nativeDefault": "0.0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-106",
          "key": "bottomRightOffsetX",
          "storageKey": "bottomRightOffsetX:num",
          "label": "Offset X",
          "description": "Horizontal bottomRight tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-107",
          "key": "bottomRightOffsetY",
          "storageKey": "bottomRightOffsetY:num",
          "label": "Offset Y",
          "description": "Vertical bottomRight tail offset in pixels: positive moves down, negative up. Added to the message window bottom edge (window height). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-109",
          "key": "upperLeftFilename",
          "storageKey": "upperLeftFilename:str",
          "label": "Filename",
          "description": "Image basename for the upperLeft tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.",
          "editorType": "file",
          "nativeDefault": "",
          "type": "string",
          "directory": "img/system/",
          "default": ""
        },
        {
          "id": "EXT-M-110",
          "key": "upperLeftAnchorX",
          "storageKey": "upperLeftAnchorX:num",
          "label": "Anchor X",
          "description": "Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
          "editorType": "text",
          "nativeDefault": "0.5",
          "type": "number",
          "default": 0.5
        },
        {
          "id": "EXT-M-111",
          "key": "upperLeftAnchorY",
          "storageKey": "upperLeftAnchorY:num",
          "label": "Anchor Y",
          "description": "Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
          "editorType": "text",
          "nativeDefault": "1.0",
          "type": "number",
          "default": 1
        },
        {
          "id": "EXT-M-112",
          "key": "upperLeftOffsetX",
          "storageKey": "upperLeftOffsetX:num",
          "label": "Offset X",
          "description": "Horizontal upperLeft tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-113",
          "key": "upperLeftOffsetY",
          "storageKey": "upperLeftOffsetY:num",
          "label": "Offset Y",
          "description": "Vertical upperLeft tail offset in pixels: positive moves down, negative up. Added to the message window top edge (Y=0). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-115",
          "key": "upperRightFilename",
          "storageKey": "upperRightFilename:str",
          "label": "Filename",
          "description": "Image basename for the upperRight tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.",
          "editorType": "file",
          "nativeDefault": "",
          "type": "string",
          "directory": "img/system/",
          "default": ""
        },
        {
          "id": "EXT-M-116",
          "key": "upperRightAnchorX",
          "storageKey": "upperRightAnchorX:num",
          "label": "Anchor X",
          "description": "Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
          "editorType": "text",
          "nativeDefault": "0.5",
          "type": "number",
          "default": 0.5
        },
        {
          "id": "EXT-M-117",
          "key": "upperRightAnchorY",
          "storageKey": "upperRightAnchorY:num",
          "label": "Anchor Y",
          "description": "Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
          "editorType": "text",
          "nativeDefault": "1.0",
          "type": "number",
          "default": 1
        },
        {
          "id": "EXT-M-118",
          "key": "upperRightOffsetX",
          "storageKey": "upperRightOffsetX:num",
          "label": "Offset X",
          "description": "Horizontal upperRight tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        },
        {
          "id": "EXT-M-119",
          "key": "upperRightOffsetY",
          "storageKey": "upperRightOffsetY:num",
          "label": "Offset Y",
          "description": "Vertical upperRight tail offset in pixels: positive moves down, negative up. Added to the message window top edge (Y=0). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.",
          "editorType": "text",
          "nativeDefault": "+0",
          "type": "number",
          "default": 0
        }
      ],
      "default": {
        "autoPositionTail": "true",
        "autoPositionLeft": "true",
        "autoCorrectX": "true",
        "autoPositionOffsetX": 0,
        "autoPositionOffsetY": 0,
        "bottomLeftFilename": "",
        "bottomLeftAnchorX": 0.5,
        "bottomLeftAnchorY": 0,
        "bottomLeftOffsetX": 0,
        "bottomLeftOffsetY": 0,
        "bottomRightFilename": "",
        "bottomRightAnchorX": 0.5,
        "bottomRightAnchorY": 0,
        "bottomRightOffsetX": 0,
        "bottomRightOffsetY": 0,
        "upperLeftFilename": "",
        "upperLeftAnchorX": 0.5,
        "upperLeftAnchorY": 1,
        "upperLeftOffsetX": 0,
        "upperLeftOffsetY": 0,
        "upperRightFilename": "",
        "upperRightAnchorX": 0.5,
        "upperRightAnchorY": 1,
        "upperRightOffsetX": 0,
        "upperRightOffsetY": 0
      },
      "context": "To show a tail, place <Tail BL: 100> in Show Text for an illustrative X of 100 pixels inside the message window, or enable autoPositionTail and use <Auto Event: 1> with an existing event ID 1. Configure a nonempty matching tail image from img/system without .png. Auto-position chooses the configured bottom-left/right image; manual tags choose their named edge. Anchor values are image fractions (0 left/top, 0.5 center, 1 right/bottom); offsets are pixels. autoCorrectX compensates horizontal window clamping only for automatic X placement."
    },
    {
      "id": "EXT-M-019",
      "key": "ScrollWheel",
      "storageKey": "ScrollWheel:struct",
      "label": "Scroll Wheel Settings",
      "description": "Mouse wheel controls during message input. Enable installs the wheel controls at game startup; ScrollDownNext advances at wheelY >= 20, and ScrollUpMsgLog attempts to open Message Log at wheelY <= -20. Other message trigger handling runs first. The log integration is optional; without its provider, scrolling upward does not open a scene.",
      "editorType": "struct<ScrollWheel>",
      "nativeDefault": "{\"Enable:eval\":\"true\",\"ScrollDownNext:eval\":\"true\",\"ScrollUpMsgLog:eval\":\"true\"}",
      "type": "struct",
      "structName": "ScrollWheel",
      "fields": [
        {
          "id": "EXT-M-120",
          "key": "Enable",
          "storageKey": "Enable:eval",
          "label": "Enable?",
          "description": "Enable message mouse-wheel controls at game startup. When false, this plugin installs no wheel-to-advance or wheel-to-log handling. When true, the individual ScrollDownNext and ScrollUpMsgLog switches control those actions.",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true"
        },
        {
          "id": "EXT-M-121",
          "key": "ScrollDownNext",
          "storageKey": "ScrollDownNext:eval",
          "label": "Scroll Down: Next?",
          "description": "Set \"Scroll Down\" to \"Next\"?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true"
        },
        {
          "id": "EXT-M-122",
          "key": "ScrollUpMsgLog",
          "storageKey": "ScrollUpMsgLog:eval",
          "label": "Scroll Up: Log?",
          "description": "Allow the upward mouse-wheel shortcut to open the optional MessageLog during a map message.",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true",
          "context": "Requires the optional MessageLog provider and its Scene_MessageLog class, /ScrollWheel/Enable=true (EXT-M-120), the message isTriggered update path. This wheel handler does not test the menu-enabled flag or use the console-button visibility gate. This module does not supply that provider. Without it, scrolling cannot open a history scene. Configure the provider before enabling this shortcut; the normal message remains usable when the provider is absent.",
          "examples": [
            {
              "input": "With MessageLog and Scene_MessageLog installed, enable /ScrollWheel/Enable and /ScrollWheel/ScrollUpMsgLog, then scroll upward during a map message while its trigger handling is active.",
              "expected": "The shortcut may open the provider history when its runtime gates pass; without the provider no history scene is opened."
            }
          ]
        }
      ],
      "default": {
        "Enable": "true",
        "ScrollDownNext": "true",
        "ScrollUpMsgLog": "true"
      },
      "context": "ScrollUpMsgLog requires the optional Message Log integration and its Scene_MessageLog class. Consult ext-message api describe EXT-M-122 --json. These settings are read at boot; changing the registry requires restarting the game."
    }
  ],
  "commands": [
    {
      "id": "EXT-M-001",
      "key": "ExtFastFwdDisallow",
      "label": "Fast Forward: Allow/Disallow",
      "description": "Change whether or not Fast Forward is allowed/disallowed.",
      "args": [
        {
          "id": "EXT-M-002",
          "key": "Allow",
          "storageKey": "Allow:eval",
          "label": "Allow?",
          "description": "Allow or disallow the Extended Fast Forward feature?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true"
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ]
    },
    {
      "id": "EXT-M-003",
      "key": "MsgButtonConsole",
      "label": "Message Button Console: Show/Hide",
      "description": "Determine if the Message Button Console is visible or hidden.",
      "args": [
        {
          "id": "EXT-M-004",
          "key": "Visible",
          "storageKey": "Visible:eval",
          "label": "Visible?",
          "description": "Show or hide the Message Button Console feature?",
          "editorType": "boolean",
          "nativeDefault": "true",
          "type": "string",
          "javascript": "expression",
          "default": "true"
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ]
    },
    {
      "id": "EXT-M-005",
      "key": "MessageCursorSettings",
      "label": "Message Cursor: Change Settings",
      "description": "Change the Message Cursor settings used.",
      "args": [
        {
          "id": "EXT-M-006",
          "key": "MsgCursor",
          "storageKey": "MsgCursor:struct",
          "label": "Change Settings",
          "description": "Change the Message Cursor settings.",
          "editorType": "struct<MsgCursor>",
          "nativeDefault": "{\"General\":\"\",\"Enable:eval\":\"true\",\"GraphicType:str\":\"icon\",\"Icon\":\"\",\"IconIndex:str\":\"188\",\"FlipMultiplier:str\":\"0.125\",\"Image\":\"\",\"Filename:str\":\"\",\"Rows:num\":\"1\",\"Cols:num\":\"1\",\"FrameDelay:num\":\"4\",\"Appearance\":\"\",\"AnchorX:num\":\"0.5\",\"AnchorY:num\":\"1\",\"OffsetX:num\":\"+0\",\"OffsetY:num\":\"-4\"}",
          "type": "struct",
          "structName": "MsgCursor",
          "fields": [
            {
              "id": "EXT-M-074",
              "key": "Enable",
              "storageKey": "Enable:eval",
              "label": "Enable?",
              "description": "Enable or disable the message cursor?",
              "editorType": "boolean",
              "nativeDefault": "true",
              "type": "string",
              "javascript": "expression",
              "default": "true"
            },
            {
              "id": "EXT-M-075",
              "key": "GraphicType",
              "storageKey": "GraphicType:str",
              "label": "Graphic Type",
              "description": "What is the cursor's graphic type?",
              "editorType": "select",
              "nativeDefault": "icon",
              "type": "string",
              "options": [
                "icon",
                "image",
                "windowskin"
              ],
              "default": "icon"
            },
            {
              "id": "EXT-M-077",
              "key": "IconIndex",
              "storageKey": "IconIndex:str",
              "label": "Icon Index",
              "description": "This is icon used for the Message Cursor.",
              "editorType": "text",
              "nativeDefault": "188",
              "type": "string",
              "default": "188"
            },
            {
              "id": "EXT-M-078",
              "key": "FlipMultiplier",
              "storageKey": "FlipMultiplier:str",
              "label": "Flip Speed Multiplier",
              "description": "Icon cursor flip speed as a numeric string in radians per game frame, for example \"0.125\". scale.x = cos(Graphics.frameCount * value), with period 2*pi/abs(value). The normal string \"0\" yields scale.x=1; negative values give the same cosine as their positive counterparts. This field is not evaluated as JavaScript: \"1/8\" is not a valid numeric string. The complete MsgCursor preset supplies \"0.125\"; the individual field default \"1\" does not replace an explicit preset value.",
              "editorType": "text",
              "nativeDefault": "1",
              "type": "string",
              "default": "1"
            },
            {
              "id": "EXT-M-080",
              "key": "Filename",
              "storageKey": "Filename:str",
              "label": "Filename",
              "description": "Cursor image basename in img/system, without .png; for example Cursor loads img/system/Cursor.png. Used only when MsgCursor.Enable evaluates true and GraphicType is image. Supply an existing image; an empty filename supplies no drawable image. Rows and Cols divide it into equal cells, animated with FrameDelay game frames per cell.",
              "editorType": "file",
              "nativeDefault": "",
              "type": "string",
              "directory": "img/system/",
              "default": ""
            },
            {
              "id": "EXT-M-081",
              "key": "Rows",
              "storageKey": "Rows:num",
              "label": "Image Rows",
              "description": "How many rows are there for the image?",
              "editorType": "number",
              "nativeDefault": "1",
              "type": "number",
              "min": 1,
              "default": 1
            },
            {
              "id": "EXT-M-082",
              "key": "Cols",
              "storageKey": "Cols:num",
              "label": "Image Columns",
              "description": "How many columns are there for the image?",
              "editorType": "number",
              "nativeDefault": "1",
              "type": "number",
              "min": 1,
              "default": 1
            },
            {
              "id": "EXT-M-083",
              "key": "FrameDelay",
              "storageKey": "FrameDelay:num",
              "label": "Frame Delay",
              "description": "How many frames delayed are there per animated cell?",
              "editorType": "number",
              "nativeDefault": "4",
              "type": "number",
              "min": 1,
              "default": 4
            },
            {
              "id": "EXT-M-085",
              "key": "AnchorX",
              "storageKey": "AnchorX:num",
              "label": "Anchor X",
              "description": "Horizontal sprite anchor as a fraction of cursor image or icon width: 0=left edge, 0.5=center, 1=right edge. The anchor point is placed at the cursor position after OffsetX. Finite values outside 0..1 are accepted and move the anchor outside the graphic; there is no anchor clamp.",
              "editorType": "text",
              "nativeDefault": "0.5",
              "type": "number",
              "default": 0.5
            },
            {
              "id": "EXT-M-086",
              "key": "AnchorY",
              "storageKey": "AnchorY:num",
              "label": "Anchor Y",
              "description": "Vertical sprite anchor as a fraction of cursor image or icon height: 0=top edge, 0.5=center, 1=bottom edge. The anchor point is placed at the cursor position after OffsetY. Finite values outside 0..1 are accepted and move the anchor outside the graphic; there is no anchor clamp.",
              "editorType": "text",
              "nativeDefault": "1",
              "type": "number",
              "default": 1
            },
            {
              "id": "EXT-M-087",
              "key": "OffsetX",
              "storageKey": "OffsetX:num",
              "label": "Offset X",
              "description": "Offset the Message Cursor's X position by how many pixels?",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-088",
              "key": "OffsetY",
              "storageKey": "OffsetY:num",
              "label": "Offset Y",
              "description": "Offset the Message Cursor's Y position by how many pixels?",
              "editorType": "text",
              "nativeDefault": "-8",
              "type": "number",
              "default": -8
            }
          ],
          "default": {
            "Enable": "true",
            "GraphicType": "icon",
            "IconIndex": "188",
            "FlipMultiplier": "0.125",
            "Filename": "",
            "Rows": 1,
            "Cols": 1,
            "FrameDelay": 4,
            "AnchorX": 0.5,
            "AnchorY": 1,
            "OffsetX": 0,
            "OffsetY": -4
          },
          "context": "Cursor settings are initialized from the complete MsgCursor preset; explicit object values win over child field defaults. The preset uses FlipMultiplier 0.125 and OffsetY -4, while the individual field defaults are 1 and -8. AnchorX/AnchorY are image fractions: 0 left/top, 0.5 center, 1 right/bottom. Offsets are pixels. When inserting a cursor command, provide the complete argument object shown in its example; a newly inserted partial struct does not automatically acquire missing fields. Existing command updates retain encoded fields not supplied."
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ],
      "context": "Cursor settings are initialized from the complete MsgCursor preset; explicit object values win over child field defaults. The preset uses FlipMultiplier 0.125 and OffsetY -4, while the individual field defaults are 1 and -8. AnchorX/AnchorY are image fractions: 0 left/top, 0.5 center, 1 right/bottom. Offsets are pixels. When inserting a cursor command, provide the complete argument object shown in its example; a newly inserted partial struct does not automatically acquire missing fields. Existing command updates retain encoded fields not supplied."
    },
    {
      "id": "EXT-M-007",
      "key": "MessageTailSettings",
      "label": "Message Tail: Change Settings",
      "description": "Change the Message Tail settings.",
      "args": [
        {
          "id": "EXT-M-008",
          "key": "Settings",
          "storageKey": "Settings:struct",
          "label": "Message Tail Settings",
          "description": "Message Tail settings used for Message Windows.",
          "editorType": "struct<MsgTail>",
          "nativeDefault": "{\"AutoPosition\":\"\",\"autoPositionTail:eval\":\"true\",\"autoPositionLeft:eval\":\"true\",\"autoPositionOffsetX:num\":\"+0\",\"autoPositionOffsetY:num\":\"+0\",\"TailDir\":\"\",\"BottomLeft\":\"\",\"bottomLeftFilename:str\":\"\",\"bottomLeftAnchorX:num\":\"0.5\",\"bottomLeftAnchorY:num\":\"0.0\",\"bottomLeftOffsetX:num\":\"+0\",\"bottomLeftOffsetY:num\":\"+0\",\"BottomRight\":\"\",\"bottomRightFilename:str\":\"\",\"bottomRightAnchorX:num\":\"0.5\",\"bottomRightAnchorY:num\":\"0.0\",\"bottomRightOffsetX:num\":\"+0\",\"bottomRightOffsetY:num\":\"+0\",\"UpperLeft\":\"\",\"upperLeftFilename:str\":\"\",\"upperLeftAnchorX:num\":\"0.5\",\"upperLeftAnchorY:num\":\"1.0\",\"upperLeftOffsetX:num\":\"+0\",\"upperLeftOffsetY:num\":\"+0\",\"UpperRight\":\"\",\"upperRightFilename:str\":\"\",\"upperRightAnchorX:num\":\"0.5\",\"upperRightAnchorY:num\":\"1.0\",\"upperRightOffsetX:num\":\"+0\",\"upperRightOffsetY:num\":\"+0\"}",
          "type": "struct",
          "structName": "MsgTail",
          "fields": [
            {
              "id": "EXT-M-090",
              "key": "autoPositionTail",
              "storageKey": "autoPositionTail:eval",
              "label": "Enable?",
              "description": "Show the lower message tail during automatic event-relative message positioning when true.",
              "editorType": "boolean",
              "nativeDefault": "true",
              "type": "string",
              "javascript": "expression",
              "default": "true",
              "context": "Requires a nonempty lower-tail basename in /MsgTail settings and an existing event selected by an auto-position tag such as <AUTO EVENT: 1> in Show Text on the map. See EXT-M-018 for the event-relative tag. The corresponding image must exist in img/system; no image is synthesized by this flag. False leaves automatic positioning active but omits its tail. The tail becomes visible only when the message window is fully open.",
              "examples": [
                {
                  "input": "Configure a lower-tail image basename, set /MsgTail/autoPositionTail to true, then use <AUTO EVENT: 1>Hello in Show Text on a map with event 1.",
                  "expected": "Automatic positioning can show the configured lower tail once the message window is fully open."
                }
              ]
            },
            {
              "id": "EXT-M-091",
              "key": "autoPositionLeft",
              "storageKey": "autoPositionLeft:eval",
              "label": "Face Left?",
              "description": "Which direction does the Message Tail point to?",
              "editorType": "boolean",
              "nativeDefault": "true",
              "type": "string",
              "javascript": "expression",
              "default": "true"
            },
            {
              "id": "EXT-M-092",
              "key": "autoCorrectX",
              "storageKey": "autoCorrectX:eval",
              "label": "Auto-Correct X",
              "description": "When true, shift an automatic message tail horizontally to compensate when the auto-positioned message window is clamped at the screen edge. Applies when the tail uses its automatic X position; explicit <Tail BL: 100> coordinates are not corrected. False leaves the tail at the window center plus its configured offset.",
              "editorType": "boolean",
              "nativeDefault": "true",
              "type": "string",
              "javascript": "expression",
              "default": "true"
            },
            {
              "id": "EXT-M-093",
              "key": "autoPositionOffsetX",
              "storageKey": "autoPositionOffsetX:num",
              "label": "Offset X",
              "description": "Horizontal message-window offset in pixels, added to the Message auto-position offset when MsgTail.autoPositionTail is true. Positive moves right and negative moves left before the window placement clamp. It moves the window, not just the tail sprite; use an auto-position text code such as <AUTO EVENT: 1> with an existing event in the current map.",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-094",
              "key": "autoPositionOffsetY",
              "storageKey": "autoPositionOffsetY:num",
              "label": "Offset Y",
              "description": "Vertical message-window offset in pixels, added to the Message auto-position offset when MsgTail.autoPositionTail is true. Positive moves down and negative moves up before the window placement clamp. It moves the window, not just the tail sprite; use an auto-position text code such as <AUTO EVENT: 1> with an existing event in the current map.",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-097",
              "key": "bottomLeftFilename",
              "storageKey": "bottomLeftFilename:str",
              "label": "Filename",
              "description": "Image basename for the bottomLeft tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.",
              "editorType": "file",
              "nativeDefault": "",
              "type": "string",
              "directory": "img/system/",
              "default": ""
            },
            {
              "id": "EXT-M-098",
              "key": "bottomLeftAnchorX",
              "storageKey": "bottomLeftAnchorX:num",
              "label": "Anchor X",
              "description": "Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
              "editorType": "text",
              "nativeDefault": "0.5",
              "type": "number",
              "default": 0.5
            },
            {
              "id": "EXT-M-099",
              "key": "bottomLeftAnchorY",
              "storageKey": "bottomLeftAnchorY:num",
              "label": "Anchor Y",
              "description": "Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
              "editorType": "text",
              "nativeDefault": "0.0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-100",
              "key": "bottomLeftOffsetX",
              "storageKey": "bottomLeftOffsetX:num",
              "label": "Offset X",
              "description": "Horizontal bottomLeft tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-101",
              "key": "bottomLeftOffsetY",
              "storageKey": "bottomLeftOffsetY:num",
              "label": "Offset Y",
              "description": "Vertical bottomLeft tail offset in pixels: positive moves down, negative up. Added to the message window bottom edge (window height). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-103",
              "key": "bottomRightFilename",
              "storageKey": "bottomRightFilename:str",
              "label": "Filename",
              "description": "Image basename for the bottomRight tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.",
              "editorType": "file",
              "nativeDefault": "",
              "type": "string",
              "directory": "img/system/",
              "default": ""
            },
            {
              "id": "EXT-M-104",
              "key": "bottomRightAnchorX",
              "storageKey": "bottomRightAnchorX:num",
              "label": "Anchor X",
              "description": "Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
              "editorType": "text",
              "nativeDefault": "0.5",
              "type": "number",
              "default": 0.5
            },
            {
              "id": "EXT-M-105",
              "key": "bottomRightAnchorY",
              "storageKey": "bottomRightAnchorY:num",
              "label": "Anchor Y",
              "description": "Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
              "editorType": "text",
              "nativeDefault": "0.0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-106",
              "key": "bottomRightOffsetX",
              "storageKey": "bottomRightOffsetX:num",
              "label": "Offset X",
              "description": "Horizontal bottomRight tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-107",
              "key": "bottomRightOffsetY",
              "storageKey": "bottomRightOffsetY:num",
              "label": "Offset Y",
              "description": "Vertical bottomRight tail offset in pixels: positive moves down, negative up. Added to the message window bottom edge (window height). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-109",
              "key": "upperLeftFilename",
              "storageKey": "upperLeftFilename:str",
              "label": "Filename",
              "description": "Image basename for the upperLeft tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.",
              "editorType": "file",
              "nativeDefault": "",
              "type": "string",
              "directory": "img/system/",
              "default": ""
            },
            {
              "id": "EXT-M-110",
              "key": "upperLeftAnchorX",
              "storageKey": "upperLeftAnchorX:num",
              "label": "Anchor X",
              "description": "Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
              "editorType": "text",
              "nativeDefault": "0.5",
              "type": "number",
              "default": 0.5
            },
            {
              "id": "EXT-M-111",
              "key": "upperLeftAnchorY",
              "storageKey": "upperLeftAnchorY:num",
              "label": "Anchor Y",
              "description": "Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
              "editorType": "text",
              "nativeDefault": "1.0",
              "type": "number",
              "default": 1
            },
            {
              "id": "EXT-M-112",
              "key": "upperLeftOffsetX",
              "storageKey": "upperLeftOffsetX:num",
              "label": "Offset X",
              "description": "Horizontal upperLeft tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-113",
              "key": "upperLeftOffsetY",
              "storageKey": "upperLeftOffsetY:num",
              "label": "Offset Y",
              "description": "Vertical upperLeft tail offset in pixels: positive moves down, negative up. Added to the message window top edge (Y=0). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-115",
              "key": "upperRightFilename",
              "storageKey": "upperRightFilename:str",
              "label": "Filename",
              "description": "Image basename for the upperRight tail in img/system, without .png; for example Tail loads img/system/Tail.png. An empty filename gives a blank tail. Supply artwork for this direction; the runtime does not mirror another direction automatically. Select this direction with its Show Text tail tag; automatic tails use only the configured bottom-left or bottom-right image.",
              "editorType": "file",
              "nativeDefault": "",
              "type": "string",
              "directory": "img/system/",
              "default": ""
            },
            {
              "id": "EXT-M-116",
              "key": "upperRightAnchorX",
              "storageKey": "upperRightAnchorX:num",
              "label": "Anchor X",
              "description": "Horizontal tail-image anchor fraction: 0=left edge, 0.5=center, 1=right edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
              "editorType": "text",
              "nativeDefault": "0.5",
              "type": "number",
              "default": 0.5
            },
            {
              "id": "EXT-M-117",
              "key": "upperRightAnchorY",
              "storageKey": "upperRightAnchorY:num",
              "label": "Anchor Y",
              "description": "Vertical tail-image anchor fraction: 0=top edge, 0.5=center, 1=bottom edge. Use 0..1 for a point inside the image; finite values outside that interval are not clamped and place the anchor outside it.",
              "editorType": "text",
              "nativeDefault": "1.0",
              "type": "number",
              "default": 1
            },
            {
              "id": "EXT-M-118",
              "key": "upperRightOffsetX",
              "storageKey": "upperRightOffsetX:num",
              "label": "Offset X",
              "description": "Horizontal upperRight tail offset in pixels: positive moves right, negative left. Added to the X coordinate from the tail tag, measured from the message window left edge; for an automatic tail, added to the window center plus any autoCorrectX adjustment. The explicit tail coordinate is not clamped.",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            },
            {
              "id": "EXT-M-119",
              "key": "upperRightOffsetY",
              "storageKey": "upperRightOffsetY:num",
              "label": "Offset Y",
              "description": "Vertical upperRight tail offset in pixels: positive moves down, negative up. Added to the message window top edge (Y=0). The sprite anchor determines which point of the image occupies that position; no tail-position clamp is applied.",
              "editorType": "text",
              "nativeDefault": "+0",
              "type": "number",
              "default": 0
            }
          ],
          "default": {
            "autoPositionTail": "true",
            "autoPositionLeft": "true",
            "autoCorrectX": "true",
            "autoPositionOffsetX": 0,
            "autoPositionOffsetY": 0,
            "bottomLeftFilename": "",
            "bottomLeftAnchorX": 0.5,
            "bottomLeftAnchorY": 0,
            "bottomLeftOffsetX": 0,
            "bottomLeftOffsetY": 0,
            "bottomRightFilename": "",
            "bottomRightAnchorX": 0.5,
            "bottomRightAnchorY": 0,
            "bottomRightOffsetX": 0,
            "bottomRightOffsetY": 0,
            "upperLeftFilename": "",
            "upperLeftAnchorX": 0.5,
            "upperLeftAnchorY": 1,
            "upperLeftOffsetX": 0,
            "upperLeftOffsetY": 0,
            "upperRightFilename": "",
            "upperRightAnchorX": 0.5,
            "upperRightAnchorY": 1,
            "upperRightOffsetX": 0,
            "upperRightOffsetY": 0
          },
          "context": "To show a tail, place <Tail BL: 100> in Show Text for an illustrative X of 100 pixels inside the message window, or enable autoPositionTail and use <Auto Event: 1> with an existing event ID 1. Configure a nonempty matching tail image from img/system without .png. Auto-position chooses the configured bottom-left/right image; manual tags choose their named edge. Anchor values are image fractions (0 left/top, 0.5 center, 1 right/bottom); offsets are pixels. autoCorrectX compensates horizontal window clamping only for automatic X placement."
        }
      ],
      "targets": [
        "map",
        "common-event",
        "troop"
      ],
      "context": "To show a tail, place <Tail BL: 100> in Show Text for an illustrative X of 100 pixels inside the message window, or enable autoPositionTail and use <Auto Event: 1> with an existing event ID 1. Configure a nonempty matching tail image from img/system without .png. Auto-position chooses the configured bottom-left/right image; manual tags choose their named edge. Anchor values are image fractions (0 left/top, 0.5 center, 1 right/bottom); offsets are pixels. autoCorrectX compensates horizontal window clamping only for automatic X placement."
    }
  ],
  "dependencies": {
    "cores": {
      "Coreto_0_CoreEngine": "0.1.0",
      "VisuMZ_0_CoreEngine": "1.90"
    },
    "messages": {
      "Coreto_1_MessageCore": "0.1.0",
      "VisuMZ_1_MessageCore": "1.54"
    },
    "integrations": {
      "VisuMZ_1_SaveCore": "1.13",
      "VisuMZ_1_OptionsCore": "1.27",
      "VisuMZ_3_MessageLog": "1.08"
    }
  }
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

class CoreError extends Error {
    constructor(code, message, details = {}, exitCode = 2) {
        super(message);
        this.code = code;
        this.details = details;
        this.exitCode = exitCode;
    }
}

function valueError(schema, value, path, expected = schema.type) {
    throw new CoreError("INVALID_VALUE", `Invalid value at ${path}; expected ${expected}.`, {
        field: path, received: value, expected,
        hint: schema.id ? `Use core api describe ${schema.id} to inspect accepted values and defaults.` : "Use core api list to inspect accepted parameter values."
    });
}

function validateValue(schema, value, path) {
    if (schema.type === "struct") {
        if (!value || typeof value !== "object" || Array.isArray(value)) valueError(schema, value, path);
        for (const key of Object.keys(value)) {
            const field = schema.fields.find(field => field.key === key);
            if (!field) throw new CoreError("UNKNOWN_FIELD", `Unknown field ${path}/${key}.`, { field: `${path}/${key}` });
            validateValue(field, value[key], `${path}/${key}`);
        }
        for (const field of schema.fields) {
            if (!Object.hasOwn(value, field.key)) valueError(field, undefined, `${path}/${field.key}`, "a value for this field");
        }
    } else if (schema.type === "array") {
        if (!Array.isArray(value)) valueError(schema, value, path);
        value.forEach((item, index) => validateValue(schema.items, item, `${path}/${index}`));
    } else if (schema.type === "number") {
        if (typeof value !== "number" || !Number.isFinite(value)) valueError(schema, value, path, "a finite number");
        if (schema.integer && !Number.isInteger(value)) valueError(schema, value, path, "an integer");
        if (schema.min !== undefined && value < schema.min) valueError(schema, value, path, `a number >= ${schema.min}`);
        if (schema.max !== undefined && value > schema.max) valueError(schema, value, path, `a number <= ${schema.max}`);
    } else if (schema.type === "boolean" || schema.type === "string") {
        if (typeof value !== schema.type) valueError(schema, value, path);
    } else {
        throw new CoreError("UNSUPPORTED_TYPE", `Unsupported parameter type: ${schema.type}.`, { field: path }, 6);
    }
    const unavailable = schema.unavailableOptions?.find(option => option.value === String(value).trim().toLowerCase());
    if (unavailable) {
        throw new CoreError("CAPABILITY_UNAVAILABLE", `Value is unavailable at ${path}: ${value}.`, {
            field: path, received: value, availability: unavailable.availability,
            hint: unavailable.reason
        }, 6);
    }
    if (schema.options && !schema.options.includes(value)) valueError(schema, value, path, JSON.stringify(schema.options));
    return value;
}

function parseLayer(raw, path) {
    if (typeof raw !== "string") throw new CoreError("INVALID_ENCODING", `Expected a native string at ${path}.`, { field: path, received: raw });
    try {
        return JSON.parse(raw);
    } catch {
        throw new CoreError("INVALID_ENCODING", `Invalid JSON encoding at ${path}.`, { field: path, received: raw });
    }
}

function decodeValue(schema, raw, path) {
    if (raw === undefined) return validateValue(schema, JSON.parse(JSON.stringify(schema.default)), path);
    let value;
    if (schema.type === "struct") {
        const encoded = parseLayer(raw, path);
        if (!encoded || typeof encoded !== "object" || Array.isArray(encoded)) valueError(schema, encoded, path);
        value = Object.fromEntries(schema.fields.map(field => [field.key,
            decodeValue(field, encoded[field.storageKey], `${path}/${field.key}`)]));
    } else if (schema.type === "array") {
        const encoded = parseLayer(raw, path);
        if (!Array.isArray(encoded)) valueError(schema, encoded, path);
        value = encoded.map((item, index) => decodeValue(schema.items, item, `${path}/${index}`));
    } else if (schema.type === "number") {
        if (typeof raw !== "string" || raw.trim() === "") valueError(schema, raw, path);
        value = Number(raw);
    } else if (schema.type === "boolean") {
        if (raw !== "true" && raw !== "false") valueError(schema, raw, path);
        value = raw === "true";
    } else {
        value = schema.encoding === "json" ? parseLayer(raw, path) : raw;
    }
    return validateValue(schema, value, path);
}

function encodeValue(schema, value, path, previous) {
    validateValue(schema, value, path);
    if (schema.type === "struct") {
        const encoded = previous === undefined ? {} : parseLayer(previous, path);
        for (const field of schema.fields) {
            encoded[field.storageKey] = encodeValue(field, value[field.key], `${path}/${field.key}`, encoded[field.storageKey]);
        }
        return JSON.stringify(encoded);
    }
    if (schema.type === "array") {
        const encoded = previous === undefined ? [] : parseLayer(previous, path);
        return JSON.stringify(value.map((item, index) => encodeValue(schema.items, item, `${path}/${index}`, encoded[index])));
    }
    return schema.encoding === "json" ? JSON.stringify(value) : String(value);
}

function parameterAt(parameters, path) {
    if (!path?.startsWith("/") || path === "/") throw new CoreError("INVALID_PATH", "Use a parameter path such as /Gold/GoldMax.", { field: path });
    const segments = path.slice(1).split("/");
    let schema = parameters.find(field => field.key === segments[0]);
    if (!schema) throw new CoreError("UNKNOWN_FIELD", `Unknown parameter ${path}.`, { field: path });
    const chain = [schema];
    for (const segment of segments.slice(1)) {
        schema = schema.type === "struct" ? schema.fields.find(field => field.key === segment) :
            schema.type === "array" && /^(0|[1-9]\d*)$/.test(segment) ? schema.items : undefined;
        if (!schema) throw new CoreError("UNKNOWN_FIELD", `Unknown parameter ${path}.`, { field: path });
        chain.push(schema);
    }
    return { chain, segments };
}

function decodeParameters(parameters, raw) {
    return Object.fromEntries(parameters.map(field => [field.key, decodeValue(field, raw[field.storageKey], `/${field.key}`)]));
}


function resolveExtendedSource(catalog, plugins) {
    const configuration = resolvePluginConfiguration(catalog, plugins, {errorPrefix: 'EXT'});
    const {configuredSource, source} = configuration;
    function complete(fields, raw) {
        const result = {...raw};
        for (const field of fields) {
            if (field.key === 'CoretoConfigSource') continue;
            const value = Object.hasOwn(result, field.storageKey) ? result[field.storageKey] : field.nativeDefault;
            if (field.type === 'array' && value !== '') {
                let array;
                try { array = JSON.parse(value); } catch { throw new CoreError('EXT_CONFIG_ENCODING', `Invalid array ${field.storageKey} in ${source.name}.`); }
                if (!Array.isArray(array)) throw new CoreError('EXT_CONFIG_ENCODING', `Invalid array ${field.storageKey} in ${source.name}.`);
            }
            if (field.javascript && value !== '') {
                try { new Function(value); }
                catch (cause) { throw new CoreError('EXT_AUTHORED_CODE', `Invalid expression at ${field.storageKey}.`, {field:field.storageKey, cause:cause.message}); }
            }
            if (field.type !== 'struct' || value === '') { result[field.storageKey] = value; continue; }
            let nested;
            try { nested = JSON.parse(value); } catch { throw new CoreError('EXT_CONFIG_ENCODING', `Invalid struct ${field.storageKey} in ${source.name}.`); }
            if (!nested || typeof nested !== 'object' || Array.isArray(nested)) throw new CoreError('EXT_CONFIG_ENCODING', `Invalid struct ${field.storageKey} in ${source.name}.`);
            result[field.storageKey] = JSON.stringify(complete(field.fields, nested));
        }
        return result;
    }
    return {configuredSource, effectiveSource: source.name, materialized: configuredSource === 'own', rawParameters: complete(catalog.parameters, source.parameters)};
}

function resolveExtendedSettings(raw, receiver) {
    return convertExtendedParameters.call(receiver, {}, raw);
}

// The public converter uses sloppy eval with its two original arguments.
const convertExtendedParameters = new Function('target', 'raw', `
    for (const key in raw) {
        const match = key.match(/(.*):(.*)/i);
        if (!match) continue;
        const name = match[1], type = match[2].toUpperCase().trim(), value = raw[key];
        let decoded;
        switch (type) {
            case 'NUM': decoded = value === '' ? 0 : Number(value); break;
            case 'STR': decoded = value === '' ? '' : String(value); break;
            case 'EVAL': decoded = value === '' ? null : eval(value); break;
            case 'STRUCT': decoded = VisuMZ.ConvertParams({}, value === '' ? {} : JSON.parse(value)); break;
            case 'ARRAYSTR': decoded = (value === '' ? [] : JSON.parse(value)).map(String); break;
            case 'ARRAYNUM': decoded = (value === '' ? [] : JSON.parse(value)).map(Number); break;
            case 'ARRAYEVAL': decoded = (value === '' ? [] : JSON.parse(value)).map(code => eval(code)); break;
            case 'ARRAYSTRUCT': decoded = (value === '' ? [] : JSON.parse(value)).map(item => VisuMZ.ConvertParams({}, JSON.parse(item))); break;
            case 'JSON': decoded = value === '' ? '' : JSON.parse(value); break;
            case 'ARRAYJSON': decoded = (value === '' ? [] : JSON.parse(value)).map(item => JSON.parse(item)); break;
            case 'FUNC': decoded = new Function(value === '' ? 'return 0' : JSON.parse(value)); break;
            case 'ARRAYFUNC': decoded = (value === '' ? [] : JSON.parse(value)).map(item => new Function(JSON.parse(item))); break;
            default: continue;
        }
        target[name] = decoded;
    }
    return target;
`);

function installExtendedMessage() {
    const fail = (code, message) => { throw new CoreError(code, message); };
    if (Utils.RPGMAKER_NAME !== 'MZ' || Utils.RPGMAKER_VERSION !== '1.10.0') fail('EXT_ENGINE_VERSION', 'Use RPG Maker MZ 1.10.0.');
    const active = $plugins.filter(p => p.status);
    const extended = active.filter(p => [catalog.pluginId, catalog.reference.pluginId].includes(p.name));
    if (extended.length !== 1 || extended[0].name !== catalog.pluginId || globalThis.Coreto?.ExtMessageFunc) fail('EXT_DUPLICATE_PROVIDER', 'Enable exactly one Extended provider.');
    const own = extended[0];
    for (const [service, providers] of Object.entries({core:catalog.dependencies.cores, message:catalog.dependencies.messages})) {
        const entries = active.filter(p => p.name in providers);
        if (entries.length !== 1) fail('EXT_DEPENDENCY', `Enable exactly one ${service} provider.`);
        const entry = entries[0];
        if (active.indexOf(entry) >= active.indexOf(own)) fail('EXT_PLUGIN_ORDER', `Place ${entry.name} before Extended.`);
        const versionMatches = entry.name === 'Coreto_0_CoreEngine' ? globalThis.Coreto?.CoreEngine?.version === providers[entry.name] : entry.description.includes(`[Version ${providers[entry.name]}]`);
        if (!versionMatches) fail('EXT_DEPENDENCY_VERSION', `Use ${entry.name} ${providers[entry.name]}.`);
    }
    if (!globalThis.VisuMZ?.MessageCore?.Settings || typeof Window_Message.prototype.addedHeight !== 'function') fail('EXT_MESSAGE_API', 'The Message provider must be loaded before Extended.');
    for (const [name, version] of Object.entries(catalog.dependencies.integrations)) {
        const entries = active.filter(p => p.name === name);
        if (entries.length > 1) fail('EXT_DEPENDENCY_DUPLICATE', `Duplicate ${name}.`);
        if (entries.length && !entries[0].description.includes(`[Version ${version}]`)) fail('EXT_DEPENDENCY_VERSION', `Use ${name} ${version}.`);
    }
    if (active.some(p => /^VisuMZ_3_/.test(p.name) && active.indexOf(p) < active.indexOf(own))) fail('EXT_PLUGIN_ORDER', 'Place Extended before tier 3 consumers.');
    const filename = decodeURIComponent(document.currentScript.src.split('?')[0].split('/').pop());
    if (filename !== `${catalog.pluginId}.js`) fail('EXT_FILENAME', `Keep the filename ${catalog.pluginId}.js.`);
    const source = resolveExtendedSource(catalog, $plugins);
    VisuMZ.ConvertParams = convertExtendedParameters;
    const settings = resolveExtendedSettings(source.rawParameters, VisuMZ);
    const registered = new Set();
    const api = {pluginId:catalog.pluginId, version:catalog.version, ...source, settings,
        registerCommand(name, handler) {
            const schema = catalog.commands.find(c => c.key === name);
            if (!schema || registered.has(name)) fail('EXT_COMMAND_REGISTRATION', `Unknown or duplicate Extended command ${name}.`);
            registered.add(name);
            for (const id of [catalog.pluginId, catalog.reference.pluginId]) PluginManager.registerCommand(id, name, function(raw) {
                return handler.call(this, convertExtendedParameters.call(VisuMZ,raw,raw));
            });
        }
    };
    globalThis.Coreto ??= {};
    Coreto.ExtMessageFunc = api;
    globalThis.Imported ??= {};
    Imported.Coreto_2_ExtMessageFunc = true;
    Imported.VisuMZ_2_ExtMessageFunc = true;
    VisuMZ.ExtMessageFunc = {version:1.22, Settings:settings};
    return api;
}
const extendedApi = installExtendedMessage();

const messageTriggerBeforeExtended = Window_Message.prototype.isTriggered;
function installExtendedModes() {
    const settings = extendedApi.settings;
    Window_Message.AUTO_FORWARD_DELAY_PER_CHAR = settings.Auto.WaitPerChar;
    Window_Message.AUTO_FORWARD_MIN_DELAY = settings.Auto.MinimumWait;
    Scene_Message.EXT_FAST_FORWARD_ENABLED = settings.FastFwd.Enable;
    Scene_Message.EXT_FAST_FORWARD_LOOPS = settings.FastFwd.Speed;
    Scene_Message.EXT_FAST_FORWARD_STOP_ON_SCENE_CHANGE = settings.FastFwd.SceneChangeReset;

    Game_Temp.prototype.isMessageAutoForwardMode = function() { return this._messageAutoForwardMode; };
    Game_Temp.prototype.setMessageAutoForwardMode = function(enabled) { this._messageAutoForwardMode = enabled; };
    Game_Temp.prototype.isExtendedFastForwardMode = function() { return this._extendedFastForwardMode; };
    Game_Temp.prototype.setExtendedFastForwardMode = function(enabled) { this._extendedFastForwardMode = enabled; };
    Game_System.prototype.initExtendedFastForward = function() { this._disallowFastForward = false; };
    Game_System.prototype.isExtendedFastForwardDisallowed = function() {
        if (this._disallowFastForward === undefined) this.initExtendedFastForward();
        return this._disallowFastForward;
    };
    Game_System.prototype.setExtendedFastForwardDisallowed = function(disallowed) {
        if (this._disallowFastForward === undefined) this.initExtendedFastForward();
        this._disallowFastForward = disallowed;
    };
    extendedApi.registerCommand('ExtFastFwdDisallow', function(args) { $gameSystem.setExtendedFastForwardDisallowed(!args.Allow); });

    SceneManager.isSceneMap = function() { return this._scene && this._scene.constructor === Scene_Map; };
    SceneManager.isSceneBattle = function() { return this._scene && this._scene.constructor === Scene_Battle; };
    Scene_Message.prototype.anyActiveMessageInputWindows = function() {
        return [this._choiceListWindow,this._numberInputWindow,this._eventItemWindow].some(window => window && window.active);
    };
    Scene_Message.prototype.isActivatedExtendedFastForwardMode = function() {
        if (!this.anyActiveMessageInputWindows() && Input.isPressed(VisuMZ.MessageCore.Settings.General.FastForwardKey)) return true;
        return $gameTemp.isExtendedFastForwardMode();
    };
    Scene_Message.prototype.isExtendedFastForwardMode = function() {
        if (!Scene_Message.EXT_FAST_FORWARD_ENABLED || $gameSystem.isExtendedFastForwardDisallowed() || this.anyActiveMessageInputWindows()) return false;
        return this.isActivatedExtendedFastForwardMode();
    };
    Scene_Map.prototype.isExtendedFastForwardMode = function() {
        return Scene_Message.prototype.isExtendedFastForwardMode.call(this) && $gameMap.isEventRunning();
    };
    Scene_Battle.prototype.isExtendedFastForwardMode = function() { return false; };
    Game_Temp.prototype.isSceneUsingExFastForward = function() {
        const scene = SceneManager._scene;
        return scene && scene.isExtendedFastForwardMode && scene.isExtendedFastForwardMode();
    };
    const requestAnimation = Game_Temp.prototype.requestAnimation;
    Game_Temp.prototype.requestAnimation = function(...args) {
        if (!this.isSceneUsingExFastForward()) return requestAnimation.apply(this,args);
    };
    const startWait = Window_Message.prototype.startWait;
    Window_Message.prototype.startWait = function(count) {
        if (!SceneManager._scene.isExtendedFastForwardMode()) startWait.call(this,count);
    };
    Scene_Message.prototype.updateExtendedFastForwardCancel = function() {
        if (Input.isTriggered('escape') || TouchInput.isCancelled()) {
            $gameTemp.setExtendedFastForwardMode(false);
            return true;
        }
        return false;
    };
    Scene_Map.prototype.updateExtendedFastForwardMode = function() {
        for (let count = 0; count < Scene_Message.EXT_FAST_FORWARD_LOOPS && $gameMap.isEventRunning() && !this.anyActiveMessageInputWindows(); count++) {
            this.updateFade();
            this.updateColorFilter();
            this.updateMain();
            SceneManager.updateEffekseer();
            if (this.updateExtendedFastForwardCancel()) break;
        }
    };
    const updateMainMultiply = Scene_Map.prototype.updateMainMultiply;
    Scene_Map.prototype.updateMainMultiply = function() {
        if (this.isExtendedFastForwardMode()) return this.updateExtendedFastForwardMode();
        return updateMainMultiply.apply(this,arguments);
    };
    const updateBattle = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        updateBattle.apply(this,arguments);
        if (this.isExtendedFastForwardMode()) this.updateExtendedFastForwardMode();
    };
    Scene_Battle.prototype.updateExtendedFastForwardMode = function() {
        this._extFastForwardLooping = true;
        for (let count = 0; count < Scene_Message.EXT_FAST_FORWARD_LOOPS && $gameTroop.isEventRunning() && !this.anyActiveMessageInputWindows(); count++) {
            this.update();
            SceneManager.updateEffekseer();
            if (this.updateExtendedFastForwardCancel()) break;
        }
        this._extFastForwardLooping = false;
    };
    const updateWindowLayer = WindowLayer.prototype.update;
    WindowLayer.prototype.update = function() {
        if (SceneManager._scene._extFastForwardLooping) return;
        return updateWindowLayer.apply(this,arguments);
    };
    const createAllWindows = Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows = function() {
        const result = createAllWindows.apply(this,arguments);
        if (Scene_Message.EXT_FAST_FORWARD_STOP_ON_SCENE_CHANGE) $gameTemp.setExtendedFastForwardMode(false);
        return result;
    };

    Window_Message.prototype.meetExtMsgFuncResetRequirements = function() {
        if (SceneManager.isSceneMap() && $gameMap && !$gameMap.isEventRunning()) return true;
        // Extended 1.22 consults the map even in battle; D-03 preserves that defect.
        return SceneManager.isSceneBattle() && !$gameMap.isEventRunning();
    };
    Window_Message.prototype.updateExtMsgFuncResetTimers = function() {
        if (!this.meetExtMsgFuncResetRequirements()) return;
        if ($gameTemp.isMessageAutoForwardMode()) $gameTemp.setMessageAutoForwardMode(false);
        if ($gameTemp.isExtendedFastForwardMode()) $gameTemp.setExtendedFastForwardMode(false);
    };
    const updateMessage = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        updateMessage.apply(this,arguments);
        this.updateExtMsgFuncResetTimers();
    };
    const initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function(...args) {
        initialize.apply(this,args);
        this._autoForwardCount = 0;
    };
    const newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(state) {
        const result = newPage.call(this,state);
        this._autoForwardCount = 0;
        return result;
    };
    Window_Message.prototype.addAutoForwardDelay = function(state) {
        this._autoForwardCount = Math.max(0,this._autoForwardCount) + (state.buffer || '').length * Window_Message.AUTO_FORWARD_DELAY_PER_CHAR;
    };
    const flushTextState = Window_Base.prototype.flushTextState;
    Window_Base.prototype.flushTextState = function(state) {
        if (this.constructor.name === "Window_Message") this.addAutoForwardDelay(state);
        return flushTextState.call(this,state);
    };
    const startPause = Window_Message.prototype.startPause;
    Window_Message.prototype.startPause = function() {
        const result = startPause.apply(this,arguments);
        this._autoForwardCount = Math.max(this._autoForwardCount,Window_Message.AUTO_FORWARD_MIN_DELAY);
        return result;
    };
    const isTriggered = messageTriggerBeforeExtended;
    Window_Message.prototype.autoForwardTriggered = function() {
        this._autoForwardCount = this._autoForwardCount || 0;
        if (isTriggered.call(this)) {
            SoundManager.playCancel();
            $gameTemp.setMessageAutoForwardMode(false);
            return true;
        }
        return this._autoForwardCount-- <= 0;
    };
    Window_Message.prototype.isTriggered = function() {
        if (SceneManager._scene.isExtendedFastForwardMode()) return true;
        return this.pause && $gameTemp.isMessageAutoForwardMode() ? this.autoForwardTriggered() : isTriggered.call(this);
    };
}
installExtendedModes();

function Window_ButtonConsole() { this.initialize(...arguments); }
Window_ButtonConsole.prototype = Object.create(Window_Scrollable.prototype);
Window_ButtonConsole.prototype.constructor = Window_ButtonConsole;

function Scene_SaveButtonConsole() { this.initialize(...arguments); }
Scene_SaveButtonConsole.prototype = Object.create(Scene_Save.prototype);
Scene_SaveButtonConsole.prototype.constructor = Scene_SaveButtonConsole;
globalThis.Window_ButtonConsole = Window_ButtonConsole;
globalThis.Scene_SaveButtonConsole = Scene_SaveButtonConsole;

function installExtendedConsole() {
    const settings = extendedApi.settings.MsgButtonConsole;
    const buttons = extendedApi.settings.Buttons;
    ColorManager.getColor = function(value) {
        value = String(value);
        return value.match(/#(.*)/i) ? '#'+String(RegExp.$1) : this.textColor(Number(value));
    };
    const constants = {
        DEFAULT_SHOW:'ShowDefault', POSITION:'Position', SKIN:'WindowSkin', FONT_FACE:'FontFace', FONT_SIZE:'FontSize',
        TEXT_COLOR_NORMAL:'NormalColor', TEXT_COLOR_TOGGLED:'ToggledColor', TEXT_COLOR_DISABLED:'DisabledColor',
        BUTTON_OFFSET_X:'ButtonOffsetX', BUTTON_OFFSET_Y:'ButtonOffsetY', BUTTON_WIDTH:'ButtonWidth', BUTTON_HEIGHT:'ButtonHeight', BUTTON_BUFFER:'ButtonBuffer'
    };
    for (const [name, field] of Object.entries(constants)) Window_ButtonConsole[name] = settings[field];
    Window_ButtonConsole.BUTTON_ORDER = buttons.List;
    Window_ButtonConsole.VOCAB = {};
    Window_ButtonConsole.SHORTCUT_KEY = {};
    for (const name of ['Auto','FastFwd','Save','Load','Options','GameEnd']) {
        Window_ButtonConsole.VOCAB[name.toLowerCase()] = buttons[name];
        if (name !== 'FastFwd') Window_ButtonConsole.SHORTCUT_KEY[name.toLowerCase()] = buttons[name+'Key'];
    }
    TextManager.msgButtonConsole = function(type) {
        return Window_ButtonConsole.VOCAB[type] || type.toUpperCase().trim();
    };
    const loadSystemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function() {
        loadSystemImages.call(this);
        this.loadSystemImagesForExtMessageFunc();
    };
    Scene_Boot.prototype.loadSystemImagesForExtMessageFunc = function() {
        const settings = extendedApi.settings.MsgButtonConsole;
        for (const key of ['ImgDisabled','ImgEnabled','ImgToggled']) {
            settings[key] = settings[key] ?? '';
            if (settings[key] !== '') ImageManager.loadSystem(settings[key]);
        }
    };
    Game_System.prototype.initMessageButtonConsole = function() { this._messageButtonConsoleVisible = Window_ButtonConsole.DEFAULT_SHOW; };
    Game_System.prototype.isMessageButtonConsoleVisible = function() {
        if (this._messageButtonConsoleVisible === undefined) this.initMessageButtonConsole();
        return this._messageButtonConsoleVisible;
    };
    Game_System.prototype.setMessageButtonConsoleVisible = function(visible) {
        if (this._messageButtonConsoleVisible === undefined) this.initMessageButtonConsole();
        this._messageButtonConsoleVisible = visible;
    };
    extendedApi.registerCommand('MsgButtonConsole', function(args) { $gameSystem.setMessageButtonConsoleVisible(args.Visible); });
    Game_Message.prototype.refreshButtonConsole = function() {
        const scene = SceneManager._scene;
        if (!scene || !scene._messageWindow) return;
        scene._messageWindow.refreshButtonConsole();
    };
    for (const method of ['setMessageAutoForwardMode','setExtendedFastForwardMode']) {
        const previous = Game_Temp.prototype[method];
        Game_Temp.prototype[method] = function(value) { previous.call(this,value); $gameMessage.refreshButtonConsole(); };
    }
    const preConvert = Window_Base.prototype.preConvertEscapeCharacters;
    Window_Base.prototype.preConvertEscapeCharacters = function(text) {
        return preConvert.call(this,text.replace(/<HIDE (?:BUTTON CONSOLE|CONSOLE|BUTTONS)>/gi,'<HIDEBUTTONCONSOLE>'));
    };
    Window_Message.prototype.prepareHideButtonConsoleTextCode = function(state) {
        this._hideButtonConsole = false;
        state.text = state.text.replace('<HIDEBUTTONCONSOLE>',()=>{ this._hideButtonConsole = true; return ''; });
        if (this.hideButtonConsoleAutoSize(state.text)) this._hideButtonConsole = true;
    };
    Window_Message.prototype.hideButtonConsoleAutoSize = function(text) {
        if (!settings.AutoSizeHide) return false;
        return !!(text.match(Window_Message._autoSizeRegexp) || text.match(Window_Message._autoPosRegExp));
    };
    const newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(state) {
        this.prepareHideButtonConsoleTextCode(state);
        this.resetMessageTailSettings();
        this.parseMessageTailTextCodes(state);
        return newPage.call(this,state);
    };
    const initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() { initMembers.apply(this,arguments); this.createButtonConsole(); };
    const addedHeight = Window_Message.prototype.addedHeight;
    Window_Message.prototype.addedHeight = function() {
        let height = addedHeight.call(this);
        if (this._hideButtonConsole) return height;
        if (SceneManager.isSceneMap() && $gameSystem.isMessageButtonConsoleVisible() && ['top','bottom'].includes(Window_ButtonConsole.POSITION.toLowerCase().trim())) height += Window_ButtonConsole.BUTTON_HEIGHT;
        return height;
    };
    const updateDimensions = Window_Message.prototype.updateDimensions;
    Window_Message.prototype.updateDimensions = function() { updateDimensions.apply(this,arguments); this.showButtonConsole(); this.refreshButtonConsole(); };
    Window_Message.prototype.showButtonConsole = function() {
        if (!SceneManager.isSceneMap()) return;
        for (const button of this._buttonConsoleButtons) {
            if (!this._hideButtonConsole && $gameSystem.isMessageButtonConsoleVisible()) button.show(); else button.hide();
        }
        this.alignButtonConsoleButtons();
    };
    Window_Message.prototype.refreshButtonConsole = function() { for (const button of this._buttonConsoleButtons) button.refresh(); };
    Window_Message.prototype.createButtonConsole = function() {
        this._buttonConsoleButtons = [];
        for (const type of Window_ButtonConsole.BUTTON_ORDER) this.addButtonConsoleObject(type);
        this.alignButtonConsoleButtons();
    };
    Window_Message.prototype.addButtonConsoleObject = function(type) {
        type = type.toLowerCase().trim();
        if (type === 'skip' && !Scene_Message.EXT_FAST_FORWARD_ENABLED) return;
        if (type === 'options' && !Imported.VisuMZ_1_OptionsCore) return;
        if (['save','load'].includes(type) && !Imported.VisuMZ_1_SaveCore) return;
        if (type === 'hide' && !Imported.VisuMZ_4_MessageVisibility) return;
        if (['log','backlog'].includes(type) && !Imported.VisuMZ_3_MessageLog) return;
        const button = new Window_ButtonConsole(type,this);
        this._buttonConsoleButtons.push(button);
        this.addChild(button);
    };
    Window_Message.prototype.alignButtonConsoleButtons = function() {
        if (!SceneManager.isSceneMap()) return;
        const position = Window_ButtonConsole.POSITION.toLowerCase().trim();
        const list = this._buttonConsoleButtons;
        this._contentsSprite.x = this._contentsSprite.y = 0;
        if (!$gameSystem.isMessageButtonConsoleVisible()) return;
        if (['top','bottom'].includes(position)) {
            const width = list.length * Window_ButtonConsole.BUTTON_WIDTH + (list.length-1) * Window_ButtonConsole.BUTTON_BUFFER;
            let x = Math.floor((this.width-width)/2) + Window_ButtonConsole.BUTTON_OFFSET_X;
            for (const button of list) { button.x = x; x += Window_ButtonConsole.BUTTON_WIDTH + Window_ButtonConsole.BUTTON_BUFFER; }
        }
        if (position === 'top') {
            for (const button of list) button.y = Window_ButtonConsole.BUTTON_BUFFER;
            if (this._hideButtonConsole) return;
            this._contentsSprite.y = Window_ButtonConsole.BUTTON_HEIGHT + Window_ButtonConsole.BUTTON_OFFSET_Y;
        }
        if (position === 'bottom') for (const button of list) button.y = this.height - Window_ButtonConsole.BUTTON_HEIGHT - Window_ButtonConsole.BUTTON_BUFFER + Window_ButtonConsole.BUTTON_OFFSET_Y;
    };
    Window_Message.prototype.drawMessageFace = function() {
        const width = ImageManager.standardFaceWidth || 144;
        const face = $gameMessage.faceName(), index = $gameMessage.faceIndex(), rtl = $gameMessage.isRTL();
        this.drawFace(face,index,rtl ? this.innerWidth-width-4 : 4,0,width,this.innerHeight-this.addedHeight());
    };
    Window_Message.prototype.toggleAutoForward = function() {
        if (this._hideButtonConsole || !$gameSystem.isMessageButtonConsoleVisible()) return;
        const enabled = !$gameTemp.isMessageAutoForwardMode();
        $gameTemp.setMessageAutoForwardMode(enabled);
        if (enabled) this.playOkSound(); else SoundManager.playCancel();
    };
    function dispatchMenu(window,type) {
        let target;
        let allowed;
        switch (type) {
            case 'save': target = Scene_SaveButtonConsole; allowed = $gameSystem.isSaveEnabled() && SceneManager.isSceneMap(); break;
            case 'load': target = Scene_Load; allowed = DataManager.isAnySavefileExists() && SceneManager.isSceneMap(); break;
            case 'options': target = Scene_Options; allowed = SceneManager.isSceneMap(); break;
            case 'gameend': target = Scene_GameEnd; allowed = SceneManager.isSceneMap(); break;
            default: return;
        }
        if (allowed) { window.playOkSound(); SceneManager.push(target); } else window.playBuzzerSound();
    }
    Window_Message.prototype.processButtonShortcut = function(type) {
        if (this._hideButtonConsole || !$gameSystem.isMessageButtonConsoleVisible()) return;
        dispatchMenu(this,type.toLowerCase().trim());
    };
    Window_Message.prototype.isTriggered = function() {
        if (SceneManager._scene.isExtendedFastForwardMode()) return true;
        for (const type of ['auto','save','load','options','gameend']) if (Input.isTriggered(Window_ButtonConsole.SHORTCUT_KEY[type])) {
            if (type === 'auto') this.toggleAutoForward(); else this.processButtonShortcut(type);
            return false;
        }
        return this.pause && $gameTemp.isMessageAutoForwardMode() ? this.autoForwardTriggered() : messageTriggerBeforeExtended.call(this);
    };
    Window_Message.EXT_SCROLL_WHEEL = {enable:extendedApi.settings.ScrollWheel.Enable,scrollDownNext:extendedApi.settings.ScrollWheel.ScrollDownNext,scrollUpMsgLog:extendedApi.settings.ScrollWheel.ScrollUpMsgLog};
    if (Window_Message.EXT_SCROLL_WHEEL.enable) {
        const triggered = Window_Message.prototype.isTriggered;
        Window_Message.prototype.isTriggered = function() {
            if (triggered.call(this)) return true;
            if (Window_Message.EXT_SCROLL_WHEEL.scrollDownNext && TouchInput.wheelY >= 20) return true;
            if (Window_Message.EXT_SCROLL_WHEEL.scrollUpMsgLog && TouchInput.wheelY <= -20) {
                if (Imported.VisuMZ_3_MessageLog) { this.playOkSound(); SceneManager.push(Scene_MessageLog); }
                return false;
            }
            return false;
        };
    }
    Window_ButtonConsole.prototype.initialize = function(type,parent) {
        this._parentWindow = parent;
        Window_Scrollable.prototype.initialize.call(this,new Rectangle(0,0,Window_ButtonConsole.BUTTON_WIDTH,Window_ButtonConsole.BUTTON_HEIGHT));
        this.createBackImageSprites();
        this._type = type.toLowerCase().trim();
        this.refresh();
        this.hide();
    };
    Window_ButtonConsole.prototype.itemPadding = function() { return 0; };
    Window_ButtonConsole.prototype.loadWindowskin = function() { this.windowskin = ImageManager.loadSystem(Window_ButtonConsole.SKIN); };
    Window_ButtonConsole.prototype.updatePadding = function() { this.padding = 0; };
    Window_ButtonConsole.prototype.updateBackOpacity = function() { this.backOpacity = 255; };
    Window_ButtonConsole.prototype.checkBackImageSprites = function() { Window_ButtonConsole.USE_BACK_IMAGE_SPRITES = ['ImgDisabled','ImgEnabled','ImgToggled'].some(key=>settings[key] !== ''); };
    Window_ButtonConsole.prototype.createBackImageSprites = function() {
        if (Window_ButtonConsole.USE_BACK_IMAGE_SPRITES === undefined) this.checkBackImageSprites();
        if (!Window_ButtonConsole.USE_BACK_IMAGE_SPRITES) return;
        this.opacity = 0;
        this._buttonConsoleSprites = {};
        for (const key of ['ImgDisabled','ImgEnabled','ImgToggled']) if (settings[key] !== '') {
            const sprite = new Sprite(ImageManager.loadSystem(settings[key]));
            this._buttonConsoleSprites[key] = sprite;
            this.addChildToBack(sprite);
            sprite.x = settings[key+'OffsetX'] || 0;
            sprite.y = settings[key+'OffsetY'] || 0;
        }
        this.updateBackImageSpriteVisibility();
    };
    Window_ButtonConsole.prototype.resetFontSettings = function() {
        Window_Scrollable.prototype.resetFontSettings.call(this);
        this.contents.fontFace = Window_ButtonConsole.FONT_FACE;
        this.contents.fontSize = Window_ButtonConsole.FONT_SIZE;
    };
    Window_ButtonConsole.prototype.refresh = function() {
        this.createContents(); this.resetFontSettings();
        const text = TextManager.msgButtonConsole(this._type);
        this.changeTextColor(ColorManager.getColor(this.textColorID()));
        this.drawText(text,0,0,this.innerWidth,'center');
    };
    Window_ButtonConsole.prototype.textColorID = function() {
        switch (this._type) {
            case 'auto': if ($gameTemp.isMessageAutoForwardMode()) return Window_ButtonConsole.TEXT_COLOR_TOGGLED; break;
            case 'fastfwd': {
                if ($gameSystem.isExtendedFastForwardDisallowed()) return Window_ButtonConsole.TEXT_COLOR_DISABLED;
                const scene = SceneManager._scene;
                if (scene && scene.isActivatedExtendedFastForwardMode && scene.isActivatedExtendedFastForwardMode()) return Window_ButtonConsole.TEXT_COLOR_TOGGLED;
                break;
            }
            case 'save': if (!$gameSystem.isSaveEnabled() || !SceneManager.isSceneMap()) return Window_ButtonConsole.TEXT_COLOR_DISABLED; break;
            case 'load': if (!DataManager.isAnySavefileExists() || !SceneManager.isSceneMap()) return Window_ButtonConsole.TEXT_COLOR_DISABLED; break;
            case 'options': case 'gameend': if (!SceneManager.isSceneMap()) return Window_ButtonConsole.TEXT_COLOR_DISABLED; break;
            case 'log': case 'backlog': if (!$gameSystem.isMainMenuMessageLogEnabled() || !SceneManager.isSceneMap()) return Window_ButtonConsole.TEXT_COLOR_DISABLED; break;
        }
        return Window_ButtonConsole.TEXT_COLOR_NORMAL;
    };
    Window_ButtonConsole.prototype.isTouchScrollEnabled = function() { return true; };
    Window_ButtonConsole.prototype.onTouchScrollStart = function() {
        if (this.openness < 255 || !this.visible) return;
        switch (this._type) {
            case 'auto': {
                const enabled = !$gameTemp.isMessageAutoForwardMode(); $gameTemp.setMessageAutoForwardMode(enabled);
                if (enabled) this.playOkSound(); else SoundManager.playCancel();
                break;
            }
            case 'fastfwd': {
                if ($gameSystem.isExtendedFastForwardDisallowed()) { this.playBuzzerSound(); break; }
                const enabled = !$gameTemp.isExtendedFastForwardMode(); $gameTemp.setExtendedFastForwardMode(enabled);
                if (enabled) this.playOkSound(); else SoundManager.playCancel();
                this.refresh(); break;
            }
            case 'save': case 'load': case 'options': case 'gameend': dispatchMenu(this,this._type); break;
            case 'hide': if (Imported.VisuMZ_4_MessageVisibility) $gameTemp.toggleMessageWindowVisibility(); break;
            case 'log': case 'backlog':
                if (Imported.VisuMZ_3_MessageLog) {
                    if ($gameSystem.isMainMenuMessageLogEnabled() && SceneManager.isSceneMap()) { this.playOkSound(); SceneManager.push(Scene_MessageLog); } else this.playBuzzerSound();
                }
                break;
        }
        TouchInput.clear();
    };
    Window_ButtonConsole.prototype.update = function() {
        Window_Scrollable.prototype.update.call(this);
        this.updateConsoleVisibility(); this.updateColor(); this.updateBackImageSpriteVisibility();
    };
    Window_ButtonConsole.prototype.updateConsoleVisibility = function() { if (this._parentWindow) this.openness = this._parentWindow.openness; };
    Window_ButtonConsole.prototype.updateColor = function() {
        if (this._type === 'fastfwd' && this._heldDownFastFwd !== Input.isPressed(VisuMZ.MessageCore.Settings.General.FastForwardKey)) {
            this._heldDownFastFwd = Input.isPressed(VisuMZ.MessageCore.Settings.General.FastForwardKey);
            this.refresh();
        }
    };
    Window_ButtonConsole.prototype.updateBackImageSpriteVisibility = function() {
        if (!Window_ButtonConsole.USE_BACK_IMAGE_SPRITES) return;
        for (const [key,color] of [['ImgDisabled','TEXT_COLOR_DISABLED'],['ImgEnabled','TEXT_COLOR_NORMAL'],['ImgToggled','TEXT_COLOR_TOGGLED']]) {
            if (this._buttonConsoleSprites[key]) this._buttonConsoleSprites[key].visible = this.textColorID() === Window_ButtonConsole[color];
        }
    };
}
installExtendedConsole();

function installExtendedMenus() {
    const push = SceneManager.push;
    SceneManager.push = function(sceneClass) {
        push.call(this,sceneClass);
        if ([Scene_SaveButtonConsole,Scene_Save,Scene_Load].includes(sceneClass)) this.loadPartyGraphics();
    };
    SceneManager.loadPartyGraphics = function() {
        for (const actor of $gameParty.members()) {
            if (actor.faceName()) ImageManager.loadFace(actor.faceName());
            if (actor.characterName()) ImageManager.loadCharacter(actor.characterName());
            if (actor.battlerName()) ImageManager.loadSvActor(actor.battlerName());
        }
    };
    const command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(params) {
        this._lastExtMsgFuncIndex = this._index;
        return command101.call(this,params);
    };
    Scene_SaveButtonConsole.prototype.onSavefileOk = function() {
        this._cachedIndex = 0;
        let interpreter = $gameMap._interpreter;
        while (interpreter._childInterpreter) interpreter = interpreter._childInterpreter;
        this._cachedIndex = interpreter._index;
        interpreter._index = interpreter._lastExtMsgFuncIndex;
        Scene_Save.prototype.onSavefileOk.call(this);
        interpreter._index = this._cachedIndex;
    };
    Scene_SaveButtonConsole.prototype.getCustomBackgroundSettings = function() {
        return Scene_Save.prototype.getCustomBackgroundSettings.call(this,'Scene_Save');
    };
}
installExtendedMenus();

function installExtendedCursor() {
    Game_System.prototype.initMessageCursorSettings = function() {
        this._msgCursorSettings = JsonEx.makeDeepCopy(extendedApi.settings.MsgCursor);
    };
    Game_System.prototype.getMessageCursorSettings = function() {
        if (this._msgCursorSettings === undefined) this.initMessageCursorSettings();
        return this._msgCursorSettings;
    };
    Game_System.prototype.setMessageCursorSettings = function(settings) {
        if (this._msgCursorSettings === undefined) this.initMessageCursorSettings();
        this._msgCursorSettings = JsonEx.makeDeepCopy(settings);
    };
    const initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        initialize.call(this);
        this.initMessageButtonConsole();
        this.initExtendedFastForward();
        this.initMessageCursorSettings();
    };
    extendedApi.registerCommand('MessageCursorSettings', function(args) {
        $gameSystem.setMessageCursorSettings(args.MsgCursor);
        const window = SceneManager._scene._messageWindow;
        if (window) {
            window._createPauseSignSprites();
            window._refreshPauseSign();
        }
    });
    Window_Message.prototype.isCustomMessageCursorEnabled = function() {
        return $gameSystem.getMessageCursorSettings().Enable;
    };
    Window_Message.prototype._createPauseSignSprites = function() {
        if (this.isCustomMessageCursorEnabled()) {
            this.removeExistingPauseSignSprites();
            this.createCustomMessageCursorPauseSignSprites();
        } else Window_Base.prototype._createPauseSignSprites.call(this);
    };
    Window_Message.prototype.removeExistingPauseSignSprites = function() {
        if (this._pauseSignSprite) this.removeChild(this._pauseSignSprite);
    };
    Window_Message.prototype.createCustomMessageCursorPauseSignSprites = function() {
        const settings = $gameSystem.getMessageCursorSettings();
        this._pauseSignSprite = new Sprite();
        this.addChild(this._pauseSignSprite);
        this._pauseSignSprite.anchor.x = settings.AnchorX;
        this._pauseSignSprite.anchor.y = settings.AnchorY;
        this._pauseSignAnimationCount = 0;
    };
    Window_Message.prototype._refreshPauseSign = function() {
        if (this.isCustomMessageCursorEnabled()) this.refreshCustomMessageCursorPauseSign();
        else {
            Window_Base.prototype._refreshPauseSign.call(this);
            this.updatePauseSignHeightextMsgFunction();
        }
    };
    Window_Message.prototype.refreshCustomMessageCursorPauseSign = function() {
        const sprite = this._pauseSignSprite;
        if (!sprite) return;
        const settings = $gameSystem.getMessageCursorSettings();
        const type = settings.GraphicType.toLowerCase().trim();
        if (type === 'image') sprite.bitmap = ImageManager.loadSystem(settings.Filename);
        else if (type === 'windowskin') {
            sprite.bitmap = this._windowskin;
            sprite.setFrame(144,96,24,24);
        } else sprite.bitmap = ImageManager.loadSystem('IconSet');
    };
    Window_Message.prototype.updatePauseSignHeightextMsgFunction = function() {
        if (!this._pauseSignSprite || !$gameSystem.isMessageButtonConsoleVisible() || this._currentAutoSize) return;
        this._pauseSignSprite.y -= Window_ButtonConsole.BUTTON_HEIGHT;
    };
    Window_Message.prototype._updatePauseSign = function() {
        if (this.isCustomMessageCursorEnabled()) this.updateCustomMessageCursorPauseSignSprites();
        else Window_Base.prototype._updatePauseSign.call(this);
    };
    Window_Message.prototype.updateCustomMessageCursorPauseSignSprites = function() {
        if (this._cache_customMessageCursorFrameCount === Graphics.frameCount) return;
        this._cache_customMessageCursorFrameCount = Graphics.frameCount;
        const sprite = this._pauseSignSprite;
        if (!sprite || sprite.bitmap.width <= 0) return;
        const settings = $gameSystem.getMessageCursorSettings();
        const type = settings.GraphicType.toLowerCase().trim();
        sprite.alpha = this.isAnySubWindowActive() || this.isClosing() ? 0 : 1;
        if (sprite.alpha <= 0) return;
        const duration = settings.Rows * settings.Cols * settings.FrameDelay;
        this._pauseSignAnimationCount++;
        while (this._pauseSignAnimationCount >= duration) this._pauseSignAnimationCount -= duration;
        if (type === 'image') this.updateImageMessageCursorPauseSignSprites();
        else if (type === 'windowskin') Window_Base.prototype._updatePauseSign.call(this);
        else this.updateIconMessageCursorPauseSignSprites();
    };
    Window_Message.prototype.updateImageMessageCursorPauseSignSprites = function() {
        const sprite = this._pauseSignSprite, settings = $gameSystem.getMessageCursorSettings();
        const index = Math.floor(this._pauseSignAnimationCount / settings.FrameDelay);
        const width = Math.floor(sprite.bitmap.width / settings.Cols), height = Math.floor(sprite.bitmap.height / settings.Rows);
        sprite.setFrame(index % settings.Cols * width, Math.floor(index / settings.Cols) * height, width, height);
        sprite.visible = this.isOpen();
    };
    Window_Message.prototype.updateIconMessageCursorPauseSignSprites = function() {
        const sprite = this._pauseSignSprite, settings = $gameSystem.getMessageCursorSettings();
        const width = ImageManager.iconWidth, height = ImageManager.iconHeight;
        sprite.setFrame(settings.IconIndex % 16 * width, Math.floor(settings.IconIndex / 16) * height, width, height);
        sprite.visible = this.isOpen();
        if (settings.FlipMultiplier === 0) return;
        sprite.scale.x = Math.cos(Graphics.frameCount * settings.FlipMultiplier);
    };
    Window_Message.prototype.moveCustomMessageCursorPauseSign = function(state) {
        if (!state || !state.drawing || !this.isCustomMessageCursorEnabled() || !this._pauseSignSprite) return;
        const sprite = this._pauseSignSprite, settings = $gameSystem.getMessageCursorSettings();
        sprite.x = state.x + this.padding + settings.OffsetX + sprite.width / 2;
        sprite.x += this._contentsSprite.x;
        sprite.y = state.y + this.padding + state.height + settings.OffsetY;
        sprite.y += this._contentsSprite.y;
        sprite.x = Math.round(sprite.x.clamp(this.padding,this.width));
        sprite.y = Math.round(sprite.y.clamp(this.padding,this.height-this.padding));
    };
    const flush = Window_Base.prototype.flushTextState;
    Window_Base.prototype.flushTextState = function(state) {
        flush.call(this,state);
        if (this.constructor.name === 'Window_Message') this.moveCustomMessageCursorPauseSign(state);
    };
}
installExtendedCursor();

function installExtendedTail() {
    Game_System.prototype.getMessageTailSettings = function() {
        if (this._messageTailSettings === undefined) this._messageTailSettings = JsonEx.makeDeepCopy(extendedApi.settings.MsgTail);
        return this._messageTailSettings;
    };
    Game_System.prototype.setMessageTailSettings = function(settings) {
        this._messageTailSettings = JsonEx.makeDeepCopy(settings);
    };
    extendedApi.registerCommand('MessageTailSettings', function(args) {
        $gameSystem.setMessageTailSettings(args.Settings);
    });
    const initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function(rect) {
        initialize.call(this,rect);
        this.createMessageTailSprite();
    };
    Window_Message.prototype.createMessageTailSprite = function() {
        this._messageTailSprite = new Sprite();
        this._messageTailSprite.visible = false;
        this.addChild(this._messageTailSprite);
    };
    Window_Message.prototype.resetMessageTailSettings = function() {
        this._messageTail = {visible:false,lastFile:'',location:'bottom',direction:'left',positionX:'auto'};
    };
    Window_Message.prototype.parseMessageTailTextCodes = function(state) {
        state.text = this.convertVariableEscapeCharacters(state.text);
        state.text = this.convertMessageTailEscapeCodes(state.text);
    };
    Window_Message.prototype.convertMessageTailEscapeCodes = function(text) {
        text = text.replace(/<TAIL (?:BL|BOTTOM LEFT|DL|DOWN LEFT):[ ](\d+)>/gi, (_, x) => { this.setupMessageTailSettings(true,true,x); return ''; });
        text = text.replace(/<TAIL (?:BR|BOTTOM RIGHT|DL|DOWN RIGHT):[ ](\d+)>/gi, (_, x) => { this.setupMessageTailSettings(true,false,x); return ''; });
        text = text.replace(/<TAIL (?:UL|UPPER LEFT|UP LEFT):[ ](\d+)>/gi, (_, x) => { this.setupMessageTailSettings(false,true,x); return ''; });
        return text.replace(/<TAIL (?:UR|UPPER RIGHT|UP RIGHT):[ ](\d+)>/gi, (_, x) => { this.setupMessageTailSettings(false,false,x); return ''; });
    };
    Window_Message.prototype.setupMessageTailSettings = function(bottom,left,x) {
        if (!this._messageTail) this.resetMessageTailSettings();
        this._messageTail.visible = true;
        this._messageTail.location = bottom ? 'bottom' : 'upper';
        this._messageTail.direction = left ? 'left' : 'right';
        this._messageTail.positionX = Number(x);
    };
    Window_Message.prototype.usesAutoPositionMessageTail = function() {
        const settings = $gameSystem.getMessageTailSettings();
        if (!settings || !settings.autoPositionTail) return false;
        return (settings['bottom'+(settings.autoPositionLeft?'Left':'Right')+'Filename'] || '').trim() !== '';
    };
    const updateAutoPosition = Window_Message.prototype.updateAutoPosition;
    Window_Message.prototype.updateAutoPosition = function() {
        updateAutoPosition.call(this);
        if (!this._autoPositionTarget || !this._messageTailSprite || !this._messageTail) return;
        if (this.usesAutoPositionMessageTail()) {
            const settings = $gameSystem.getMessageTailSettings();
            Object.assign(this._messageTail,{visible:true,lastFile:'',location:'bottom',direction:settings.autoPositionLeft?'left':'right',positionX:'auto'});
        }
    };
    for (const axis of ['X','Y']) {
        const method = 'autoPositionOffset'+axis, previous = Window_Message.prototype[method];
        Window_Message.prototype[method] = function() {
            let offset = previous.call(this);
            const settings = $gameSystem.getMessageTailSettings();
            if (settings && settings.autoPositionTail) offset += settings[method];
            return offset;
        };
    }
    const clamp = Window_Message.prototype.clampPlacementPosition;
    Window_Message.prototype.clampPlacementPosition = function(x,y) {
        this._correctAutoMessageTailOffsetX = 0;
        const before = this.x;
        clamp.call(this,x,y);
        this._correctAutoMessageTailOffsetX = before - this.x;
    };
    Window_Message.prototype.updateMessageTailSprite = function() {
        if (!this._messageTailSprite || !this._messageTail) return;
        this.updateMessageTailBitmap();
        this.updateMessageTailVisibility();
        this.updateMessageTailPosition();
    };
    Window_Message.prototype.getMessageTailMainKey = function() {
        return (this._messageTail.location === 'upper' ? 'upper' : 'bottom') + (this._messageTail.direction === 'left' ? 'Left' : 'Right');
    };
    Window_Message.prototype.updateMessageTailBitmap = function() {
        const sprite = this._messageTailSprite, tail = this._messageTail;
        const filename = $gameSystem.getMessageTailSettings()[this.getMessageTailMainKey()+'Filename'];
        if (tail.lastFile === filename) return;
        tail.lastFile = filename;
        sprite.bitmap = filename ? ImageManager.loadSystem(filename) : new Bitmap(1,1);
    };
    Window_Message.prototype.updateMessageTailVisibility = function() {
        this._messageTailSprite.visible = this._messageTail.visible && this.openness === 255;
    };
    Window_Message.prototype.updateMessageTailPosition = function() {
        const sprite = this._messageTailSprite, tail = this._messageTail;
        const settings = $gameSystem.getMessageTailSettings(), key = this.getMessageTailMainKey();
        sprite.anchor.x = settings[key+'AnchorX'];
        sprite.anchor.y = settings[key+'AnchorY'];
        if (tail.positionX === 'auto') {
            sprite.x = Math.round(this.width / 2);
            sprite.x += this.correctAutoMessageTailOffsetX();
        } else {
            tail.positionX = Number(tail.positionX);
            sprite.x = Math.round(tail.positionX);
        }
        sprite.y = tail.location === 'upper' ? 0 : this.height;
        sprite.x += settings[key+'OffsetX'];
        sprite.y += settings[key+'OffsetY'];
    };
    Window_Message.prototype.correctAutoMessageTailOffsetX = function() {
        return ($gameSystem.getMessageTailSettings().autoCorrectX ?? true) ? this._correctAutoMessageTailOffsetX || 0 : 0;
    };
    const update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        update.call(this);
        this.updateMessageTailSprite();
    };
}
installExtendedTail();

function installExtendedSaveLifecycle() {
    const extract = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        const result = extract.call(this,contents);
        $gameSystem.isMessageButtonConsoleVisible();
        $gameSystem.isExtendedFastForwardDisallowed();
        $gameSystem.getMessageCursorSettings();
        $gameSystem.getMessageTailSettings();
        return result;
    };
}
installExtendedSaveLifecycle();

})();
