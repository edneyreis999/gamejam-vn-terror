/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 5] [Version 1.5.0] [DesignSystem]
 * @author Coreto
 * @base Coreto_0_CoreEngine
 * @base Coreto_1_MessageCore
 * @base Coreto_2_ExtMessageFunc
 * @orderAfter Coreto_0_CoreEngine
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter Coreto_1_OptionsCore
 * @orderAfter Coreto_1_SaveCore
 * @orderAfter Coreto_2_ExtMessageFunc
 * @orderAfter Coreto_2_PictureChoices
 * @orderAfter Coreto_2_VNPictureBusts
 * @orderAfter Coreto_2_AniMsgTextEffects
 * @orderAfter Coreto_3_ChoiceCmnEvts
 * @orderAfter Coreto_4_AttachedPictures
 * @orderAfter Coreto_4_EventTitleScene
 * @orderAfter Coreto_4_MessageVisibility
 * @param PaperImage
 * @type file
 * @dir img/system/
 * @default CoretoWindow
 * @help
 * Design System 1.5.0. Requires CoreEngine, MessageCore and ExtMessageFunc; load after providers.
 * Use design-system install and parameters through the Coreto CLI. Restart after parameter changes.
 * Use skills describe game-coreto-eng-design-system for the complete theme, images and fonts.
 * Options and Save are additionally required by the complete preset.
 * CoretoDesignSystem exposes drawing, typography and presentation adapters; gameplay stays with consumers.
 *
 * @param Enabled
 * @text Enabled
 * @type boolean
 * @desc When true, install the DesignSystem presentation hooks and expose CoretoDesignSystem at boot. False returns before either is created; provider-owned preset callbacks already written to Options/Save are independent and remain configured.
 * @default true
 *
 * @param Windows
 * @text Windows
 * @type boolean
 * @desc When true, theme eligible MZ windows, choice rows, dialogue spacing and option rectangles. False skips these window hooks and corner-cursor placement; exported drawing helpers and configured picture-role decoration remain available. ScrollText, MapName, picture-text windows and non-menu ButtonAssist are excluded from the ordinary window-surface replacement.
 * @default true
 *
 * @param Surfaces
 * @text Surfaces
 * @type struct<Surfaces>
 * @desc Palette used by drawing helpers and window/picture feedback. Every value is a #RRGGBB string. The panel color is overridden at runtime by active Core Engine itemBackColor1; text, heading and muted colors come from Core Engine rather than this object.
 * @default {"canvas":"#f8e9cc","panel":"#f9eacf","disabled":"#d3c7b4","onAccent":"#fff8eb","border":"#704737","subtle":"#be9a6b","primary":"#552070","pressed":"#4d1d6b","purple":"#6d1b8b","menuSelectedHoverBorder":"#000000","focus":"#8224ad","gold":"#edaa2f","error":"#af2933","hover":"#eedff2","accentHover":"#6d3185","card":"#f0dfc0","cardScene":"#f0dfc0","cardMemorial":"#f0dfc0"}
 *
 * @param Shapes
 * @text Shapes
 * @type struct<Shapes>
 * @desc Pixel dimensions for rounded surfaces, borders and focus rings. Used by window/picture rendering and the public drawing helpers; a corner radius is capped at half the drawn width/height.
 * @default {"ControlRadius":6,"PanelRadius":10,"MenuSelectedWidth":1,"BorderWidth":1,"FocusWidth":2,"FocusGap":3,"Inset":3}
 *
 * @param Card
 * @text Card
 * @type struct<Card>
 * @desc Pixel spacing for static card surfaces and drawCard text. Window_Help uses the surface stripe, while its native text inset is separately fixed at 16 pixels.
 * @default {"StripeX":12,"StripeWidth":4,"PaddingY":12,"TextInset":12,"PaddingRight":12}
 *
 * @param Button
 * @text Button
 * @type struct<Button>
 * @desc Pixel spacing for menu-button markers and drawButton text. MinHeight also sets a floor for choice rows; it does not resize every native button.
 * @default {"PaddingX":16,"MinHeight":44,"MarkerSize":24,"MarkerGap":12}
 *
 * @param Choice
 * @text Choice
 * @type struct<Choice>
 * @desc Pixel spacing and maximum width of choice entries when Windows is true; drawButton with kind choice also uses its marker settings.
 * @default {"MarkerSize":16,"MarkerGap":8,"PaddingY":8,"MaxWidth":620}
 *
 * @param Dialogue
 * @text Dialogue
 * @type struct<Dialogue>
 * @desc Dialogue composition when Windows is true. MessageCore retains text parsing and ExtMessageFunc retains cursor artwork, animation and offsets.
 * @default {"ContinuePlacement":"corner","SpeakerInside":true,"SpeakerGap":4,"TextInset":16,"ContrastOutline":2}
 *
 * @param Field
 * @text Field
 * @type struct<Field>
 * @desc Pixel dimensions for drawField; Height also controls the background drawn behind native actor-name input when Windows is true.
 * @default {"Height":40,"PaddingX":18,"Gap":4}
 *
 * @param Controls
 * @text Controls
 * @type struct<Controls>
 * @desc Visual dimensions captured into the delivered Options/Save drawing recipes. Editing these DesignSystem parameters alone does not rewrite provider callbacks. See skills describe game-coreto-eng-design-system and its references/operations.md for preset ownership and reapplication.
 * @default {"OptionHeight":76,"ValueRatio":52,"TrackHeight":8,"ThumbWidth":10,"ThumbHeight":18,"SaveHeader":60,"SaveFooter":98}
 *
 * @param Title
 * @text Title
 * @type struct<Title>
 * @desc Typography exposed by style("Title") and fonts.title; it does not automatically replace native title text.
 * @default {"Face":"CoretoAveria","Size":52,"Line":56}
 *
 * @param Section
 * @text Section
 * @type struct<Section>
 * @desc Typography exposed by style("Section") for explicit drawing/measurement; no built-in section renderer consumes it.
 * @default {"Face":"CoretoAveria","Size":32,"Line":40}
 *
 * @param Speaker
 * @text Speaker
 * @type struct<Speaker>
 * @desc Speaker typography exposed by style("Speaker") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.
 * @default {"Face":"CoretoAveria","Size":24,"Line":28}
 *
 * @param Menu
 * @text Menu
 * @type struct<Menu>
 * @desc Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.
 * @default {"Face":"CoretoAveria","Size":22,"Line":28}
 *
 * @param Action
 * @text Action
 * @type struct<Action>
 * @desc Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.
 * @default {"Face":"CoretoAveria","Size":20,"Line":24}
 *
 * @param ChoiceText
 * @text ChoiceText
 * @type struct<ChoiceText>
 * @desc Typography for drawButton kind choice. Its Line comes from active MessageCore ChoiceWindowLineHeight (fallback 24), not this object; native choice drawing retains provider font settings.
 * @default {"Face":"CoretoAveria","Size":18}
 *
 * @param Input
 * @text Input
 * @type struct<Input>
 * @desc Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.
 * @default {"Face":"CoretoOutfit","Size":18,"Line":24}
 *
 * @param Label
 * @text Label
 * @type struct<Label>
 * @desc Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.
 * @default {"Face":"CoretoAveria","Size":16,"Line":20}
 *
 * @param Helper
 * @text Helper
 * @type struct<Helper>
 * @desc Typography for drawField helper/error text, drawCard text and the default measure role.
 * @default {"Face":"CoretoOutfit","Size":14,"Line":20}
 *
 * @param Icons
 * @text Icons
 * @type struct<Icons>
 * @desc System-image basenames loaded at boot for named theme icons. Use existing img/system/<name>.png files without extension. CLI accepts ASCII letters, digits, underscores, spaces and hyphens; it does not copy assets. The complete preset supplies its assets through skills describe game-coreto-eng-design-system.
 * @default {"diamond":"CoretoTheme_diamond","error":"CoretoTheme_error","Settings":"CoretoTheme_Settings","Audio":"CoretoTheme_Audio","Language":"CoretoTheme_Language","TextEffects":"CoretoTheme_TextEffects","Music":"CoretoTheme_Music","Ambience":"CoretoTheme_Ambience","Jingle":"CoretoTheme_Jingle","SoundEffects":"CoretoTheme_SoundEffects","Back":"CoretoTheme_Back","Save":"CoretoTheme_Save","Clock":"CoretoTheme_Clock","Conversation":"CoretoTheme_Conversation","Menu":"CoretoTheme_Menu"}
 *
 * @param OptionsLayout
 * @text OptionsLayout
 * @type struct<OptionsLayout>
 * @desc Pixel geometry for OptionsCore category/list rectangles when Windows is true and those provider methods exist. Offsets add to the provider rectangle; margins replace its horizontal bounds.
 * @default {"Margin":28,"CategoryHeight":76,"CategoryOffsetY":16,"ListOffsetY":12,"RowGap":12,"Bottom":20}
 *
 * @param PictureRoles
 * @text PictureRoles
 * @type struct<PictureRole>[]
 * @desc Complete JSON array of {Image,Role} mappings for existing img/pictures/<Image>.png assets, without extension. Images must be unique nonempty ASCII letter/digit/underscore/space/hyphen basenames. [] removes all configured mappings on restart. secondary draws a light button, primary a filled action button, card a static striped surface, panel a rounded panel. The surface replaces the displayed bitmap at the original image dimensions; it does not create pictures, clicks or choices. PictureChoices or an adapter owns interaction. A registered pictures adapter can replace this lookup.
 * @default []
 *
 * @param Body
 * @text Body
 * @type struct<Body>
 * @desc Base font for message and scrolling-text windows when Windows is true. Native fallbackFonts are appended to Face; authored text escape codes can override the base.
 * @default {"Face":"CoretoOutfit","Size":20}
 *
 */

/*~struct~Surfaces:
 * @param canvas
 * @text canvas
 * @type string
 * @desc Exported canvas palette color for game-owned drawing. Current built-in window and picture renderers do not paint a canvas from this value. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #f8e9cc
 *
 * @param panel
 * @text panel
 * @type string
 * @desc Fallback light panel fill. With the required active Coreto Core Engine, CoretoDesignSystem.colors.panel instead reads ColorManager.itemBackColor1(); change that provider setting to change live panel fill. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #f9eacf
 *
 * @param disabled
 * @text disabled
 * @type string
 * @desc Fill for disabled buttons/fields and the unfilled volume-track recipe. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #d3c7b4
 *
 * @param onAccent
 * @text onAccent
 * @type string
 * @desc Text/icon ink on selected, pressed or primary surfaces; also dialogue ink on dark message backgrounds. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #fff8eb
 *
 * @param border
 * @text border
 * @type string
 * @desc Ordinary control and window border color. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #704737
 *
 * @param subtle
 * @text subtle
 * @type string
 * @desc Card stripe, inner message border and picture-panel outline color. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #be9a6b
 *
 * @param primary
 * @text primary
 * @type string
 * @desc Fill for selected or primary controls and the captured volume-control recipe. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #552070
 *
 * @param pressed
 * @text pressed
 * @type string
 * @desc Fill while a control is pressed; also used by the captured selected volume track. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #4d1d6b
 *
 * @param purple
 * @text purple
 * @type string
 * @desc Exported palette color for game-owned drawing. Current built-in renderers use primary/focus/accentHover instead. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #6d1b8b
 *
 * @param menuSelectedHoverBorder
 * @text menuSelectedHoverBorder
 * @type string
 * @desc Border color when a selected menu-kind button is hovered. Other selected controls keep the gold border. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #000000
 *
 * @param focus
 * @text focus
 * @type string
 * @desc Hovered-control border and focused-field border color. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #8224ad
 *
 * @param gold
 * @text gold
 * @type string
 * @desc Selected-control border and explicit focused-button outer ring; also captured volume feedback. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #edaa2f
 *
 * @param error
 * @text error
 * @type string
 * @desc Error-state border in drawField. The error icon retains its source artwork colors. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #af2933
 *
 * @param hover
 * @text hover
 * @type string
 * @desc Fill for an unselected light control under the pointer. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #eedff2
 *
 * @param accentHover
 * @text accentHover
 * @type string
 * @desc Hover fill for selected or primary controls. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #6d3185
 *
 * @param card
 * @text card
 * @type string
 * @desc Static card fill for paper/default contexts, including Window_Help and configured card pictures. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #f0dfc0
 *
 * @param cardScene
 * @text cardScene
 * @type string
 * @desc Static card fill when drawCard receives context scene. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #f0dfc0
 *
 * @param cardMemorial
 * @text cardMemorial
 * @type string
 * @desc Static card fill when drawCard receives context memorial. Supply a JSON string in #RRGGBB format, for example "#704737".
 * @default #f0dfc0
 *
 */

/*~struct~Shapes:
 * @param ControlRadius
 * @text ControlRadius
 * @type number
 * @desc Rounded-control corner radius in pixels, capped by half the rendered dimensions.
 * @default 6
 * @min 0
 * @max 4096
 *
 * @param PanelRadius
 * @text PanelRadius
 * @type number
 * @desc Window and picture-panel corner radius in pixels, capped by half the rendered dimensions.
 * @default 10
 * @min 0
 * @max 4096
 *
 * @param MenuSelectedWidth
 * @text MenuSelectedWidth
 * @type number
 * @desc Border width in pixels for a resting selected menu-kind button. Hover uses FocusWidth; pressed/disabled uses BorderWidth.
 * @default 1
 * @min 0
 * @max 4096
 *
 * @param BorderWidth
 * @text BorderWidth
 * @type number
 * @desc Ordinary control/field border width in pixels. Zero is accepted as a drawing value, not an off switch for the surface or its border.
 * @default 1
 * @min 0
 * @max 4096
 *
 * @param FocusWidth
 * @text FocusWidth
 * @type number
 * @desc Hovered/selected control and focused-field border width in pixels; also width of the explicit outer focus ring.
 * @default 2
 * @min 0
 * @max 4096
 *
 * @param FocusGap
 * @text FocusGap
 * @type number
 * @desc Gap in pixels outside a drawButton rectangle before its explicit focused ring; the ring bounds expand by FocusGap + FocusWidth on every side.
 * @default 3
 * @min 0
 * @max 4096
 *
 * @param Inset
 * @text Inset
 * @type number
 * @desc Inset in pixels from each edge of the message window for its inner decorative outline.
 * @default 3
 * @min 0
 * @max 4096
 *
 */

/*~struct~Card:
 * @param StripeX
 * @text StripeX
 * @type number
 * @desc Horizontal stripe offset in pixels from the card rectangle left edge; positive moves right.
 * @default 12
 * @min 0
 * @max 4096
 *
 * @param StripeWidth
 * @text StripeWidth
 * @type number
 * @desc Width in pixels of the vertical card stripe.
 * @default 4
 * @min 0
 * @max 4096
 *
 * @param PaddingY
 * @text PaddingY
 * @type number
 * @desc Top/bottom stripe inset and drawCard text top/bottom padding in pixels.
 * @default 12
 * @min 0
 * @max 4096
 *
 * @param TextInset
 * @text TextInset
 * @type number
 * @desc drawCard text offset in pixels from the rectangle left edge; reduces available wrapping width.
 * @default 12
 * @min 0
 * @max 4096
 *
 * @param PaddingRight
 * @text PaddingRight
 * @type number
 * @desc Right-side space in pixels excluded from drawCard wrapping width.
 * @default 12
 * @min 0
 * @max 4096
 *
 */

/*~struct~Button:
 * @param PaddingX
 * @text PaddingX
 * @type number
 * @desc Horizontal padding in pixels inside drawButton. Menu/choice text additionally reserves marker size and gap.
 * @default 16
 * @min 0
 * @max 4096
 *
 * @param MinHeight
 * @text MinHeight
 * @type number
 * @desc Minimum choice-row height in pixels. The native row height and tallest wrapped label can raise the final height.
 * @default 44
 * @min 0
 * @max 4096
 *
 * @param MarkerSize
 * @text MarkerSize
 * @type number
 * @desc Diamond marker side length in pixels for menu-kind buttons and title choices.
 * @default 24
 * @min 0
 * @max 4096
 *
 * @param MarkerGap
 * @text MarkerGap
 * @type number
 * @desc Horizontal gap in pixels reserved after the menu/title-choice diamond.
 * @default 12
 * @min 0
 * @max 4096
 *
 */

/*~struct~Choice:
 * @param MarkerSize
 * @text MarkerSize
 * @type number
 * @desc Diamond marker side length in pixels for ordinary choices.
 * @default 16
 * @min 0
 * @max 4096
 *
 * @param MarkerGap
 * @text MarkerGap
 * @type number
 * @desc Horizontal gap in pixels reserved after an ordinary choice diamond.
 * @default 8
 * @min 0
 * @max 4096
 *
 * @param PaddingY
 * @text PaddingY
 * @type number
 * @desc Space in pixels added above and below the tallest measured choice label when computing row height.
 * @default 8
 * @min 0
 * @max 4096
 *
 * @param MaxWidth
 * @text MaxWidth
 * @type number
 * @desc Maximum choice-content width in pixels, further limited by screen width, columns and spacing. CLI minimum is 80. Wrapping preserves whole words, so a single oversized word is not split.
 * @default 620
 * @min 0
 * @max 4096
 *
 */

/*~struct~Dialogue:
 * @param ContinuePlacement
 * @text ContinuePlacement
 * @type select
 * @desc corner places an enabled ExtMessageFunc custom continue cursor near the message bottom-right, retaining provider offsets. provider leaves its placement to ExtMessageFunc. Requires Windows=true and an active custom cursor; it does not enable the cursor.
 * @default corner
 * @option corner
 * @value corner
 * @option provider
 * @value provider
 *
 * @param SpeakerInside
 * @text SpeakerInside
 * @type boolean
 * @desc True reserves speaker space at the start of message text and places the NameBox inside the message panel; false retains provider placement. Only messages with a speaker name reserve space. Forced-position/auto-sized messages skip the added window-height calculation.
 * @default true
 *
 * @param SpeakerGap
 * @text SpeakerGap
 * @type number
 * @desc Extra vertical pixels between an embedded speaker line and message text; added to Speaker.Line.
 * @default 4
 * @min 0
 * @max 4096
 *
 * @param TextInset
 * @text TextInset
 * @type number
 * @desc Horizontal pixels added to the provider message line start. Also offsets embedded NameBox placement from the left and the corner cursor from the right, with provider offsets added.
 * @default 16
 * @min 0
 * @max 4096
 *
 * @param ContrastOutline
 * @text ContrastOutline
 * @type number
 * @desc Text-outline width in pixels on dim/transparent message backgrounds and unadapted scrolling text. Paper backgrounds use MessageCore DefaultOutlineWidth instead; outline color remains Core Engine/native.
 * @default 2
 * @min 0
 * @max 4096
 *
 */

/*~struct~Field:
 * @param Height
 * @text Height
 * @type number
 * @desc Field background height in pixels; drawField uses it for value text and native actor-name input uses it for its backdrop.
 * @default 40
 * @min 0
 * @max 4096
 *
 * @param PaddingX
 * @text PaddingX
 * @type number
 * @desc Horizontal pixels inset on both sides of drawField value text.
 * @default 18
 * @min 0
 * @max 4096
 *
 * @param Gap
 * @text Gap
 * @type number
 * @desc Vertical pixel gap between drawField label and value surface, and between that surface and helper text.
 * @default 4
 * @min 0
 * @max 4096
 *
 */

/*~struct~Controls:
 * @param OptionHeight
 * @text OptionHeight
 * @type number
 * @desc Exposed configuration value for custom recipes. The current runtime and shipped drawing recipes do not read OptionHeight; changing it alone does not resize Options rows.
 * @default 76
 * @min 0
 * @max 4096
 *
 * @param ValueRatio
 * @text ValueRatio
 * @type number
 * @desc Captured option-recipe value-column start as a percentage of row width: x = row.x + row.width * ValueRatio / 100. CLI accepts values strictly between 0 and 100. Current provider callbacks retain the values captured when their recipe was authored.
 * @default 52
 * @min 0
 * @max 4096
 *
 * @param TrackHeight
 * @text TrackHeight
 * @type number
 * @desc Volume-track height in pixels captured into the Options drawing recipe; no direct live runtime consumer.
 * @default 8
 * @min 0
 * @max 4096
 *
 * @param ThumbWidth
 * @text ThumbWidth
 * @type number
 * @desc Volume-thumb width in pixels captured into the Options drawing recipe; no direct live runtime consumer.
 * @default 10
 * @min 0
 * @max 4096
 *
 * @param ThumbHeight
 * @text ThumbHeight
 * @type number
 * @desc Volume-thumb height in pixels captured into the Options drawing recipe; no direct live runtime consumer.
 * @default 18
 * @min 0
 * @max 4096
 *
 * @param SaveHeader
 * @text SaveHeader
 * @type number
 * @desc Top space in pixels reserved above save preview art/description by the captured Save contents recipe.
 * @default 60
 * @min 0
 * @max 4096
 *
 * @param SaveFooter
 * @text SaveFooter
 * @type number
 * @desc Bottom space in pixels reserved below save preview art/description by the captured Save contents recipe. Preview height is max(0, row.height - SaveHeader - SaveFooter).
 * @default 98
 * @min 0
 * @max 4096
 *
 */

/*~struct~Title:
 * @param Face
 * @text Face
 * @type string
 * @desc Title font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography exposed by style("Title") and fonts.title; it does not automatically replace native title text.
 * @default CoretoAveria
 *
 * @param Size
 * @text Size
 * @type number
 * @desc Title font size in pixels. Typography exposed by style("Title") and fonts.title; it does not automatically replace native title text.
 * @default 52
 * @min 0
 * @max 4096
 *
 * @param Line
 * @text Line
 * @type number
 * @desc Title line height in pixels. Typography exposed by style("Title") and fonts.title; it does not automatically replace native title text.
 * @default 56
 * @min 0
 * @max 4096
 *
 */

/*~struct~Section:
 * @param Face
 * @text Face
 * @type string
 * @desc Section font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography exposed by style("Section") for explicit drawing/measurement; no built-in section renderer consumes it.
 * @default CoretoAveria
 *
 * @param Size
 * @text Size
 * @type number
 * @desc Section font size in pixels. Typography exposed by style("Section") for explicit drawing/measurement; no built-in section renderer consumes it.
 * @default 32
 * @min 0
 * @max 4096
 *
 * @param Line
 * @text Line
 * @type number
 * @desc Section line height in pixels. Typography exposed by style("Section") for explicit drawing/measurement; no built-in section renderer consumes it.
 * @default 40
 * @min 0
 * @max 4096
 *
 */

/*~struct~Speaker:
 * @param Face
 * @text Face
 * @type string
 * @desc Speaker font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Speaker typography exposed by style("Speaker") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.
 * @default CoretoAveria
 *
 * @param Size
 * @text Size
 * @type number
 * @desc Speaker font size in pixels. Speaker typography exposed by style("Speaker") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.
 * @default 24
 * @min 0
 * @max 4096
 *
 * @param Line
 * @text Line
 * @type number
 * @desc Speaker line height in pixels. Speaker typography exposed by style("Speaker") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.
 * @default 28
 * @min 0
 * @max 4096
 *
 */

/*~struct~Menu:
 * @param Face
 * @text Face
 * @type string
 * @desc Menu font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.
 * @default CoretoAveria
 *
 * @param Size
 * @text Size
 * @type number
 * @desc Menu font size in pixels. Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.
 * @default 22
 * @min 0
 * @max 4096
 *
 * @param Line
 * @text Line
 * @type number
 * @desc Menu line height in pixels. Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.
 * @default 28
 * @min 0
 * @max 4096
 *
 */

/*~struct~Action:
 * @param Face
 * @text Face
 * @type string
 * @desc Action font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.
 * @default CoretoAveria
 *
 * @param Size
 * @text Size
 * @type number
 * @desc Action font size in pixels. Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.
 * @default 20
 * @min 0
 * @max 4096
 *
 * @param Line
 * @text Line
 * @type number
 * @desc Action line height in pixels. Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.
 * @default 24
 * @min 0
 * @max 4096
 *
 */

/*~struct~ChoiceText:
 * @param Face
 * @text Face
 * @type string
 * @desc ChoiceText font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawButton kind choice. Its Line comes from active MessageCore ChoiceWindowLineHeight (fallback 24), not this object; native choice drawing retains provider font settings.
 * @default CoretoAveria
 *
 * @param Size
 * @text Size
 * @type number
 * @desc ChoiceText font size in pixels. Typography for drawButton kind choice. Its Line comes from active MessageCore ChoiceWindowLineHeight (fallback 24), not this object; native choice drawing retains provider font settings.
 * @default 18
 * @min 0
 * @max 4096
 *
 */

/*~struct~Input:
 * @param Face
 * @text Face
 * @type string
 * @desc Input font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.
 * @default CoretoOutfit
 *
 * @param Size
 * @text Size
 * @type number
 * @desc Input font size in pixels. Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.
 * @default 18
 * @min 0
 * @max 4096
 *
 * @param Line
 * @text Line
 * @type number
 * @desc Input line height in pixels. Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.
 * @default 24
 * @min 0
 * @max 4096
 *
 */

/*~struct~Label:
 * @param Face
 * @text Face
 * @type string
 * @desc Label font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.
 * @default CoretoAveria
 *
 * @param Size
 * @text Size
 * @type number
 * @desc Label font size in pixels. Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.
 * @default 16
 * @min 0
 * @max 4096
 *
 * @param Line
 * @text Line
 * @type number
 * @desc Label line height in pixels. Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.
 * @default 20
 * @min 0
 * @max 4096
 *
 */

/*~struct~Helper:
 * @param Face
 * @text Face
 * @type string
 * @desc Helper font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawField helper/error text, drawCard text and the default measure role.
 * @default CoretoOutfit
 *
 * @param Size
 * @text Size
 * @type number
 * @desc Helper font size in pixels. Typography for drawField helper/error text, drawCard text and the default measure role.
 * @default 14
 * @min 0
 * @max 4096
 *
 * @param Line
 * @text Line
 * @type number
 * @desc Helper line height in pixels. Typography for drawField helper/error text, drawCard text and the default measure role.
 * @default 20
 * @min 0
 * @max 4096
 *
 */

/*~struct~Icons:
 * @param diamond
 * @text diamond
 * @type string
 * @desc System-image basename for the diamond icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_diamond
 *
 * @param error
 * @text error
 * @type string
 * @desc System-image basename for the error icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_error
 *
 * @param Settings
 * @text Settings
 * @type string
 * @desc System-image basename for the Settings icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Settings
 *
 * @param Audio
 * @text Audio
 * @type string
 * @desc System-image basename for the Audio icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Audio
 *
 * @param Language
 * @text Language
 * @type string
 * @desc System-image basename for the Language icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Language
 *
 * @param TextEffects
 * @text TextEffects
 * @type string
 * @desc System-image basename for the TextEffects icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_TextEffects
 *
 * @param Music
 * @text Music
 * @type string
 * @desc System-image basename for the Music icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Music
 *
 * @param Ambience
 * @text Ambience
 * @type string
 * @desc System-image basename for the Ambience icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Ambience
 *
 * @param Jingle
 * @text Jingle
 * @type string
 * @desc System-image basename for the Jingle icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Jingle
 *
 * @param SoundEffects
 * @text SoundEffects
 * @type string
 * @desc System-image basename for the SoundEffects icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_SoundEffects
 *
 * @param Back
 * @text Back
 * @type string
 * @desc System-image basename for the Back icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Back
 *
 * @param Save
 * @text Save
 * @type string
 * @desc System-image basename for the Save icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Save
 *
 * @param Clock
 * @text Clock
 * @type string
 * @desc System-image basename for the Clock icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Clock
 *
 * @param Conversation
 * @text Conversation
 * @type string
 * @desc System-image basename for the Conversation icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Conversation
 *
 * @param Menu
 * @text Menu
 * @type string
 * @desc System-image basename for the Menu icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.
 * @default CoretoTheme_Menu
 *
 */

/*~struct~OptionsLayout:
 * @param Margin
 * @text Margin
 * @type number
 * @desc Left/right margin in pixels for both Options rectangles: x = Margin; width = Graphics.boxWidth - 2 * Margin.
 * @default 28
 * @min 0
 * @max 4096
 *
 * @param CategoryHeight
 * @text CategoryHeight
 * @type number
 * @desc Replacement category-window height in pixels.
 * @default 76
 * @min 0
 * @max 4096
 *
 * @param CategoryOffsetY
 * @text CategoryOffsetY
 * @type number
 * @desc Nonnegative vertical pixels added to the provider category-window y position; positive moves down.
 * @default 16
 * @min 0
 * @max 4096
 *
 * @param ListOffsetY
 * @text ListOffsetY
 * @type number
 * @desc Nonnegative vertical pixels added to the provider options-list y position; positive moves down.
 * @default 12
 * @min 0
 * @max 4096
 *
 * @param RowGap
 * @text RowGap
 * @type number
 * @desc Minimum options-row spacing in pixels: max(RowGap, provider rowSpacing).
 * @default 12
 * @min 0
 * @max 4096
 *
 * @param Bottom
 * @text Bottom
 * @type number
 * @desc Bottom space in pixels removed from the available options-list height after its y offset; final height has a 160-pixel minimum.
 * @default 20
 * @min 0
 * @max 4096
 *
 */

/*~struct~PictureRole:
 * @param Image
 * @text Image
 * @type file
 * @desc Existing img/pictures image basename without extension; ASCII letters, digits, underscores, spaces and hyphens only. Must be nonempty and unique in /PictureRoles.
 * @default 
 * @dir img/pictures/
 *
 * @param Role
 * @text Role
 * @type select
 * @desc secondary = light button; primary = filled action button; card = static striped surface; panel = rounded panel. These replace visual surfaces only; interaction is owned by PictureChoices or a registered adapter.
 * @default secondary
 * @option secondary
 * @value secondary
 * @option primary
 * @value primary
 * @option card
 * @value card
 * @option panel
 * @value panel
 *
 */

/*~struct~Body:
 * @param Face
 * @text Face
 * @type string
 * @desc Body font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Base font for message and scrolling-text windows when Windows is true. Native fallbackFonts are appended to Face; authored text escape codes can override the base.
 * @default CoretoOutfit
 *
 * @param Size
 * @text Size
 * @type number
 * @desc Body font size in pixels. Base font for message and scrolling-text windows when Windows is true. Native fallbackFonts are appended to Face; authored text escape codes can override the base.
 * @default 20
 * @min 1
 * @max 4096
 *
 */



(() => {
const catalog={"schemaVersion":1,"pluginId":"Coreto_5_DesignSystem","namespace":"design-system","version":"1.5.0","description":"Reusable parchment, semantic ink controls and native provider adapters.","dependencies":{"required":["Coreto_0_CoreEngine","Coreto_1_MessageCore","Coreto_2_ExtMessageFunc"],"optional":["Coreto_1_OptionsCore","Coreto_1_SaveCore"]},"orderAfter":["Coreto_0_CoreEngine","Coreto_1_MessageCore","Coreto_1_OptionsCore","Coreto_1_SaveCore","Coreto_2_ExtMessageFunc","Coreto_2_PictureChoices","Coreto_2_VNPictureBusts","Coreto_2_AniMsgTextEffects","Coreto_3_ChoiceCmnEvts","Coreto_4_AttachedPictures","Coreto_4_EventTitleScene","Coreto_4_MessageVisibility"],"orderBefore":[],"parameters":[{"id":"DS-P-Enabled","key":"Enabled","storageKey":"Enabled","label":"Enabled","description":"When true, install the DesignSystem presentation hooks and expose CoretoDesignSystem at boot. False returns before either is created; provider-owned preset callbacks already written to Options/Save are independent and remain configured.","type":"boolean","editorType":"boolean","default":true,"nativeDefault":"true","availability":"supported"},{"id":"DS-P-Windows","key":"Windows","storageKey":"Windows","label":"Windows","description":"When true, theme eligible MZ windows, choice rows, dialogue spacing and option rectangles. False skips these window hooks and corner-cursor placement; exported drawing helpers and configured picture-role decoration remain available. ScrollText, MapName, picture-text windows and non-menu ButtonAssist are excluded from the ordinary window-surface replacement.","type":"boolean","editorType":"boolean","default":true,"nativeDefault":"true","availability":"supported"},{"id":"DS-P-Surfaces","key":"Surfaces","storageKey":"Surfaces","label":"Surfaces","description":"Palette used by drawing helpers and window/picture feedback. Every value is a #RRGGBB string. The panel color is overridden at runtime by active Core Engine itemBackColor1; text, heading and muted colors come from Core Engine rather than this object.","type":"struct","editorType":"struct<Surfaces>","default":{"canvas":"#f8e9cc","panel":"#f9eacf","disabled":"#d3c7b4","onAccent":"#fff8eb","border":"#704737","subtle":"#be9a6b","primary":"#552070","pressed":"#4d1d6b","purple":"#6d1b8b","menuSelectedHoverBorder":"#000000","focus":"#8224ad","gold":"#edaa2f","error":"#af2933","hover":"#eedff2","accentHover":"#6d3185","card":"#f0dfc0","cardScene":"#f0dfc0","cardMemorial":"#f0dfc0"},"nativeDefault":"{\"canvas\":\"#f8e9cc\",\"panel\":\"#f9eacf\",\"disabled\":\"#d3c7b4\",\"onAccent\":\"#fff8eb\",\"border\":\"#704737\",\"subtle\":\"#be9a6b\",\"primary\":\"#552070\",\"pressed\":\"#4d1d6b\",\"purple\":\"#6d1b8b\",\"menuSelectedHoverBorder\":\"#000000\",\"focus\":\"#8224ad\",\"gold\":\"#edaa2f\",\"error\":\"#af2933\",\"hover\":\"#eedff2\",\"accentHover\":\"#6d3185\",\"card\":\"#f0dfc0\",\"cardScene\":\"#f0dfc0\",\"cardMemorial\":\"#f0dfc0\"}","availability":"supported","structName":"Surfaces","fields":[{"id":"DS-P-Surfaces.canvas","key":"canvas","storageKey":"canvas","label":"canvas","description":"Exported canvas palette color for game-owned drawing. Current built-in window and picture renderers do not paint a canvas from this value. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#f8e9cc","nativeDefault":"#f8e9cc","availability":"supported"},{"id":"DS-P-Surfaces.panel","key":"panel","storageKey":"panel","label":"panel","description":"Fallback light panel fill. With the required active Coreto Core Engine, CoretoDesignSystem.colors.panel instead reads ColorManager.itemBackColor1(); change that provider setting to change live panel fill. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#f9eacf","nativeDefault":"#f9eacf","availability":"supported"},{"id":"DS-P-Surfaces.disabled","key":"disabled","storageKey":"disabled","label":"disabled","description":"Fill for disabled buttons/fields and the unfilled volume-track recipe. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#d3c7b4","nativeDefault":"#d3c7b4","availability":"supported"},{"id":"DS-P-Surfaces.onAccent","key":"onAccent","storageKey":"onAccent","label":"onAccent","description":"Text/icon ink on selected, pressed or primary surfaces; also dialogue ink on dark message backgrounds. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#fff8eb","nativeDefault":"#fff8eb","availability":"supported"},{"id":"DS-P-Surfaces.border","key":"border","storageKey":"border","label":"border","description":"Ordinary control and window border color. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#704737","nativeDefault":"#704737","availability":"supported"},{"id":"DS-P-Surfaces.subtle","key":"subtle","storageKey":"subtle","label":"subtle","description":"Card stripe, inner message border and picture-panel outline color. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#be9a6b","nativeDefault":"#be9a6b","availability":"supported"},{"id":"DS-P-Surfaces.primary","key":"primary","storageKey":"primary","label":"primary","description":"Fill for selected or primary controls and the captured volume-control recipe. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#552070","nativeDefault":"#552070","availability":"supported"},{"id":"DS-P-Surfaces.pressed","key":"pressed","storageKey":"pressed","label":"pressed","description":"Fill while a control is pressed; also used by the captured selected volume track. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#4d1d6b","nativeDefault":"#4d1d6b","availability":"supported"},{"id":"DS-P-Surfaces.purple","key":"purple","storageKey":"purple","label":"purple","description":"Exported palette color for game-owned drawing. Current built-in renderers use primary/focus/accentHover instead. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#6d1b8b","nativeDefault":"#6d1b8b","availability":"supported"},{"id":"DS-P-Surfaces.menuSelectedHoverBorder","key":"menuSelectedHoverBorder","storageKey":"menuSelectedHoverBorder","label":"menuSelectedHoverBorder","description":"Border color when a selected menu-kind button is hovered. Other selected controls keep the gold border. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#000000","nativeDefault":"#000000","availability":"supported"},{"id":"DS-P-Surfaces.focus","key":"focus","storageKey":"focus","label":"focus","description":"Hovered-control border and focused-field border color. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#8224ad","nativeDefault":"#8224ad","availability":"supported"},{"id":"DS-P-Surfaces.gold","key":"gold","storageKey":"gold","label":"gold","description":"Selected-control border and explicit focused-button outer ring; also captured volume feedback. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#edaa2f","nativeDefault":"#edaa2f","availability":"supported"},{"id":"DS-P-Surfaces.error","key":"error","storageKey":"error","label":"error","description":"Error-state border in drawField. The error icon retains its source artwork colors. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#af2933","nativeDefault":"#af2933","availability":"supported"},{"id":"DS-P-Surfaces.hover","key":"hover","storageKey":"hover","label":"hover","description":"Fill for an unselected light control under the pointer. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#eedff2","nativeDefault":"#eedff2","availability":"supported"},{"id":"DS-P-Surfaces.accentHover","key":"accentHover","storageKey":"accentHover","label":"accentHover","description":"Hover fill for selected or primary controls. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#6d3185","nativeDefault":"#6d3185","availability":"supported"},{"id":"DS-P-Surfaces.card","key":"card","storageKey":"card","label":"card","description":"Static card fill for paper/default contexts, including Window_Help and configured card pictures. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#f0dfc0","nativeDefault":"#f0dfc0","availability":"supported"},{"id":"DS-P-Surfaces.cardScene","key":"cardScene","storageKey":"cardScene","label":"cardScene","description":"Static card fill when drawCard receives context scene. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#f0dfc0","nativeDefault":"#f0dfc0","availability":"supported"},{"id":"DS-P-Surfaces.cardMemorial","key":"cardMemorial","storageKey":"cardMemorial","label":"cardMemorial","description":"Static card fill when drawCard receives context memorial. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#f0dfc0","nativeDefault":"#f0dfc0","availability":"supported"}]},{"id":"DS-P-Shapes","key":"Shapes","storageKey":"Shapes","label":"Shapes","description":"Pixel dimensions for rounded surfaces, borders and focus rings. Used by window/picture rendering and the public drawing helpers; a corner radius is capped at half the drawn width/height.","type":"struct","editorType":"struct<Shapes>","default":{"ControlRadius":6,"PanelRadius":10,"MenuSelectedWidth":1,"BorderWidth":1,"FocusWidth":2,"FocusGap":3,"Inset":3},"nativeDefault":"{\"ControlRadius\":6,\"PanelRadius\":10,\"MenuSelectedWidth\":1,\"BorderWidth\":1,\"FocusWidth\":2,\"FocusGap\":3,\"Inset\":3}","availability":"supported","structName":"Shapes","fields":[{"id":"DS-P-Shapes.ControlRadius","key":"ControlRadius","storageKey":"ControlRadius","label":"ControlRadius","description":"Rounded-control corner radius in pixels, capped by half the rendered dimensions.","type":"number","editorType":"number","default":6,"nativeDefault":"6","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.PanelRadius","key":"PanelRadius","storageKey":"PanelRadius","label":"PanelRadius","description":"Window and picture-panel corner radius in pixels, capped by half the rendered dimensions.","type":"number","editorType":"number","default":10,"nativeDefault":"10","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.MenuSelectedWidth","key":"MenuSelectedWidth","storageKey":"MenuSelectedWidth","label":"MenuSelectedWidth","description":"Border width in pixels for a resting selected menu-kind button. Hover uses FocusWidth; pressed/disabled uses BorderWidth.","type":"number","editorType":"number","default":1,"nativeDefault":"1","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.BorderWidth","key":"BorderWidth","storageKey":"BorderWidth","label":"BorderWidth","description":"Ordinary control/field border width in pixels. Zero is accepted as a drawing value, not an off switch for the surface or its border.","type":"number","editorType":"number","default":1,"nativeDefault":"1","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.FocusWidth","key":"FocusWidth","storageKey":"FocusWidth","label":"FocusWidth","description":"Hovered/selected control and focused-field border width in pixels; also width of the explicit outer focus ring.","type":"number","editorType":"number","default":2,"nativeDefault":"2","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.FocusGap","key":"FocusGap","storageKey":"FocusGap","label":"FocusGap","description":"Gap in pixels outside a drawButton rectangle before its explicit focused ring; the ring bounds expand by FocusGap + FocusWidth on every side.","type":"number","editorType":"number","default":3,"nativeDefault":"3","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.Inset","key":"Inset","storageKey":"Inset","label":"Inset","description":"Inset in pixels from each edge of the message window for its inner decorative outline.","type":"number","editorType":"number","default":3,"nativeDefault":"3","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Card","key":"Card","storageKey":"Card","label":"Card","description":"Pixel spacing for static card surfaces and drawCard text. Window_Help uses the surface stripe, while its native text inset is separately fixed at 16 pixels.","type":"struct","editorType":"struct<Card>","default":{"StripeX":12,"StripeWidth":4,"PaddingY":12,"TextInset":12,"PaddingRight":12},"nativeDefault":"{\"StripeX\":12,\"StripeWidth\":4,\"PaddingY\":12,\"TextInset\":12,\"PaddingRight\":12}","availability":"supported","structName":"Card","fields":[{"id":"DS-P-Card.StripeX","key":"StripeX","storageKey":"StripeX","label":"StripeX","description":"Horizontal stripe offset in pixels from the card rectangle left edge; positive moves right.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096},{"id":"DS-P-Card.StripeWidth","key":"StripeWidth","storageKey":"StripeWidth","label":"StripeWidth","description":"Width in pixels of the vertical card stripe.","type":"number","editorType":"number","default":4,"nativeDefault":"4","availability":"supported","min":0,"max":4096},{"id":"DS-P-Card.PaddingY","key":"PaddingY","storageKey":"PaddingY","label":"PaddingY","description":"Top/bottom stripe inset and drawCard text top/bottom padding in pixels.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096},{"id":"DS-P-Card.TextInset","key":"TextInset","storageKey":"TextInset","label":"TextInset","description":"drawCard text offset in pixels from the rectangle left edge; reduces available wrapping width.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096},{"id":"DS-P-Card.PaddingRight","key":"PaddingRight","storageKey":"PaddingRight","label":"PaddingRight","description":"Right-side space in pixels excluded from drawCard wrapping width.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Button","key":"Button","storageKey":"Button","label":"Button","description":"Pixel spacing for menu-button markers and drawButton text. MinHeight also sets a floor for choice rows; it does not resize every native button.","type":"struct","editorType":"struct<Button>","default":{"PaddingX":16,"MinHeight":44,"MarkerSize":24,"MarkerGap":12},"nativeDefault":"{\"PaddingX\":16,\"MinHeight\":44,\"MarkerSize\":24,\"MarkerGap\":12}","availability":"supported","structName":"Button","fields":[{"id":"DS-P-Button.PaddingX","key":"PaddingX","storageKey":"PaddingX","label":"PaddingX","description":"Horizontal padding in pixels inside drawButton. Menu/choice text additionally reserves marker size and gap.","type":"number","editorType":"number","default":16,"nativeDefault":"16","availability":"supported","min":0,"max":4096},{"id":"DS-P-Button.MinHeight","key":"MinHeight","storageKey":"MinHeight","label":"MinHeight","description":"Minimum choice-row height in pixels. The native row height and tallest wrapped label can raise the final height.","type":"number","editorType":"number","default":44,"nativeDefault":"44","availability":"supported","min":0,"max":4096},{"id":"DS-P-Button.MarkerSize","key":"MarkerSize","storageKey":"MarkerSize","label":"MarkerSize","description":"Diamond marker side length in pixels for menu-kind buttons and title choices.","type":"number","editorType":"number","default":24,"nativeDefault":"24","availability":"supported","min":0,"max":4096},{"id":"DS-P-Button.MarkerGap","key":"MarkerGap","storageKey":"MarkerGap","label":"MarkerGap","description":"Horizontal gap in pixels reserved after the menu/title-choice diamond.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Choice","key":"Choice","storageKey":"Choice","label":"Choice","description":"Pixel spacing and maximum width of choice entries when Windows is true; drawButton with kind choice also uses its marker settings.","type":"struct","editorType":"struct<Choice>","default":{"MarkerSize":16,"MarkerGap":8,"PaddingY":8,"MaxWidth":620},"nativeDefault":"{\"MarkerSize\":16,\"MarkerGap\":8,\"PaddingY\":8,\"MaxWidth\":620}","availability":"supported","structName":"Choice","fields":[{"id":"DS-P-Choice.MarkerSize","key":"MarkerSize","storageKey":"MarkerSize","label":"MarkerSize","description":"Diamond marker side length in pixels for ordinary choices.","type":"number","editorType":"number","default":16,"nativeDefault":"16","availability":"supported","min":0,"max":4096},{"id":"DS-P-Choice.MarkerGap","key":"MarkerGap","storageKey":"MarkerGap","label":"MarkerGap","description":"Horizontal gap in pixels reserved after an ordinary choice diamond.","type":"number","editorType":"number","default":8,"nativeDefault":"8","availability":"supported","min":0,"max":4096},{"id":"DS-P-Choice.PaddingY","key":"PaddingY","storageKey":"PaddingY","label":"PaddingY","description":"Space in pixels added above and below the tallest measured choice label when computing row height.","type":"number","editorType":"number","default":8,"nativeDefault":"8","availability":"supported","min":0,"max":4096},{"id":"DS-P-Choice.MaxWidth","key":"MaxWidth","storageKey":"MaxWidth","label":"MaxWidth","description":"Maximum choice-content width in pixels, further limited by screen width, columns and spacing. CLI minimum is 80. Wrapping preserves whole words, so a single oversized word is not split.","type":"number","editorType":"number","default":620,"nativeDefault":"620","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Dialogue","key":"Dialogue","storageKey":"Dialogue","label":"Dialogue","description":"Dialogue composition when Windows is true. MessageCore retains text parsing and ExtMessageFunc retains cursor artwork, animation and offsets.","type":"struct","editorType":"struct<Dialogue>","default":{"ContinuePlacement":"corner","SpeakerInside":true,"SpeakerGap":4,"TextInset":16,"ContrastOutline":2},"nativeDefault":"{\"ContinuePlacement\":\"corner\",\"SpeakerInside\":true,\"SpeakerGap\":4,\"TextInset\":16,\"ContrastOutline\":2}","availability":"supported","structName":"Dialogue","fields":[{"id":"DS-P-Dialogue.ContinuePlacement","key":"ContinuePlacement","storageKey":"ContinuePlacement","label":"ContinuePlacement","description":"corner places an enabled ExtMessageFunc custom continue cursor near the message bottom-right, retaining provider offsets. provider leaves its placement to ExtMessageFunc. Requires Windows=true and an active custom cursor; it does not enable the cursor.","type":"string","editorType":"select","default":"corner","nativeDefault":"corner","availability":"supported","options":["corner","provider"]},{"id":"DS-P-Dialogue.SpeakerInside","key":"SpeakerInside","storageKey":"SpeakerInside","label":"SpeakerInside","description":"True reserves speaker space at the start of message text and places the NameBox inside the message panel; false retains provider placement. Only messages with a speaker name reserve space. Forced-position/auto-sized messages skip the added window-height calculation.","type":"boolean","editorType":"boolean","default":true,"nativeDefault":"true","availability":"supported"},{"id":"DS-P-Dialogue.SpeakerGap","key":"SpeakerGap","storageKey":"SpeakerGap","label":"SpeakerGap","description":"Extra vertical pixels between an embedded speaker line and message text; added to Speaker.Line.","type":"number","editorType":"number","default":4,"nativeDefault":"4","availability":"supported","min":0,"max":4096},{"id":"DS-P-Dialogue.TextInset","key":"TextInset","storageKey":"TextInset","label":"TextInset","description":"Horizontal pixels added to the provider message line start. Also offsets embedded NameBox placement from the left and the corner cursor from the right, with provider offsets added.","type":"number","editorType":"number","default":16,"nativeDefault":"16","availability":"supported","min":0,"max":4096},{"id":"DS-P-Dialogue.ContrastOutline","key":"ContrastOutline","storageKey":"ContrastOutline","label":"ContrastOutline","description":"Text-outline width in pixels on dim/transparent message backgrounds and unadapted scrolling text. Paper backgrounds use MessageCore DefaultOutlineWidth instead; outline color remains Core Engine/native.","type":"number","editorType":"number","default":2,"nativeDefault":"2","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Field","key":"Field","storageKey":"Field","label":"Field","description":"Pixel dimensions for drawField; Height also controls the background drawn behind native actor-name input when Windows is true.","type":"struct","editorType":"struct<Field>","default":{"Height":40,"PaddingX":18,"Gap":4},"nativeDefault":"{\"Height\":40,\"PaddingX\":18,\"Gap\":4}","availability":"supported","structName":"Field","fields":[{"id":"DS-P-Field.Height","key":"Height","storageKey":"Height","label":"Height","description":"Field background height in pixels; drawField uses it for value text and native actor-name input uses it for its backdrop.","type":"number","editorType":"number","default":40,"nativeDefault":"40","availability":"supported","min":0,"max":4096},{"id":"DS-P-Field.PaddingX","key":"PaddingX","storageKey":"PaddingX","label":"PaddingX","description":"Horizontal pixels inset on both sides of drawField value text.","type":"number","editorType":"number","default":18,"nativeDefault":"18","availability":"supported","min":0,"max":4096},{"id":"DS-P-Field.Gap","key":"Gap","storageKey":"Gap","label":"Gap","description":"Vertical pixel gap between drawField label and value surface, and between that surface and helper text.","type":"number","editorType":"number","default":4,"nativeDefault":"4","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Controls","key":"Controls","storageKey":"Controls","label":"Controls","description":"Visual dimensions captured into the delivered Options/Save drawing recipes. Editing these DesignSystem parameters alone does not rewrite provider callbacks. See skills describe game-coreto-eng-design-system and its references/operations.md for preset ownership and reapplication.","type":"struct","editorType":"struct<Controls>","default":{"OptionHeight":76,"ValueRatio":52,"TrackHeight":8,"ThumbWidth":10,"ThumbHeight":18,"SaveHeader":60,"SaveFooter":98},"nativeDefault":"{\"OptionHeight\":76,\"ValueRatio\":52,\"TrackHeight\":8,\"ThumbWidth\":10,\"ThumbHeight\":18,\"SaveHeader\":60,\"SaveFooter\":98}","availability":"supported","structName":"Controls","fields":[{"id":"DS-P-Controls.OptionHeight","key":"OptionHeight","storageKey":"OptionHeight","label":"OptionHeight","description":"Exposed configuration value for custom recipes. The current runtime and shipped drawing recipes do not read OptionHeight; changing it alone does not resize Options rows.","type":"number","editorType":"number","default":76,"nativeDefault":"76","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.ValueRatio","key":"ValueRatio","storageKey":"ValueRatio","label":"ValueRatio","description":"Captured option-recipe value-column start as a percentage of row width: x = row.x + row.width * ValueRatio / 100. CLI accepts values strictly between 0 and 100. Current provider callbacks retain the values captured when their recipe was authored.","type":"number","editorType":"number","default":52,"nativeDefault":"52","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.TrackHeight","key":"TrackHeight","storageKey":"TrackHeight","label":"TrackHeight","description":"Volume-track height in pixels captured into the Options drawing recipe; no direct live runtime consumer.","type":"number","editorType":"number","default":8,"nativeDefault":"8","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.ThumbWidth","key":"ThumbWidth","storageKey":"ThumbWidth","label":"ThumbWidth","description":"Volume-thumb width in pixels captured into the Options drawing recipe; no direct live runtime consumer.","type":"number","editorType":"number","default":10,"nativeDefault":"10","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.ThumbHeight","key":"ThumbHeight","storageKey":"ThumbHeight","label":"ThumbHeight","description":"Volume-thumb height in pixels captured into the Options drawing recipe; no direct live runtime consumer.","type":"number","editorType":"number","default":18,"nativeDefault":"18","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.SaveHeader","key":"SaveHeader","storageKey":"SaveHeader","label":"SaveHeader","description":"Top space in pixels reserved above save preview art/description by the captured Save contents recipe.","type":"number","editorType":"number","default":60,"nativeDefault":"60","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.SaveFooter","key":"SaveFooter","storageKey":"SaveFooter","label":"SaveFooter","description":"Bottom space in pixels reserved below save preview art/description by the captured Save contents recipe. Preview height is max(0, row.height - SaveHeader - SaveFooter).","type":"number","editorType":"number","default":98,"nativeDefault":"98","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Title","key":"Title","storageKey":"Title","label":"Title","description":"Typography exposed by style(\"Title\") and fonts.title; it does not automatically replace native title text.","type":"struct","editorType":"struct<Title>","default":{"Face":"CoretoAveria","Size":52,"Line":56},"nativeDefault":"{\"Face\":\"CoretoAveria\",\"Size\":52,\"Line\":56}","availability":"supported","structName":"Title","fields":[{"id":"DS-P-Title.Face","key":"Face","storageKey":"Face","label":"Face","description":"Title font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography exposed by style(\"Title\") and fonts.title; it does not automatically replace native title text.","type":"string","editorType":"string","default":"CoretoAveria","nativeDefault":"CoretoAveria","availability":"supported"},{"id":"DS-P-Title.Size","key":"Size","storageKey":"Size","label":"Size","description":"Title font size in pixels. Typography exposed by style(\"Title\") and fonts.title; it does not automatically replace native title text.","type":"number","editorType":"number","default":52,"nativeDefault":"52","availability":"supported","min":0,"max":4096},{"id":"DS-P-Title.Line","key":"Line","storageKey":"Line","label":"Line","description":"Title line height in pixels. Typography exposed by style(\"Title\") and fonts.title; it does not automatically replace native title text.","type":"number","editorType":"number","default":56,"nativeDefault":"56","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Section","key":"Section","storageKey":"Section","label":"Section","description":"Typography exposed by style(\"Section\") for explicit drawing/measurement; no built-in section renderer consumes it.","type":"struct","editorType":"struct<Section>","default":{"Face":"CoretoAveria","Size":32,"Line":40},"nativeDefault":"{\"Face\":\"CoretoAveria\",\"Size\":32,\"Line\":40}","availability":"supported","structName":"Section","fields":[{"id":"DS-P-Section.Face","key":"Face","storageKey":"Face","label":"Face","description":"Section font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography exposed by style(\"Section\") for explicit drawing/measurement; no built-in section renderer consumes it.","type":"string","editorType":"string","default":"CoretoAveria","nativeDefault":"CoretoAveria","availability":"supported"},{"id":"DS-P-Section.Size","key":"Size","storageKey":"Size","label":"Size","description":"Section font size in pixels. Typography exposed by style(\"Section\") for explicit drawing/measurement; no built-in section renderer consumes it.","type":"number","editorType":"number","default":32,"nativeDefault":"32","availability":"supported","min":0,"max":4096},{"id":"DS-P-Section.Line","key":"Line","storageKey":"Line","label":"Line","description":"Section line height in pixels. Typography exposed by style(\"Section\") for explicit drawing/measurement; no built-in section renderer consumes it.","type":"number","editorType":"number","default":40,"nativeDefault":"40","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Speaker","key":"Speaker","storageKey":"Speaker","label":"Speaker","description":"Speaker typography exposed by style(\"Speaker\") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.","type":"struct","editorType":"struct<Speaker>","default":{"Face":"CoretoAveria","Size":24,"Line":28},"nativeDefault":"{\"Face\":\"CoretoAveria\",\"Size\":24,\"Line\":28}","availability":"supported","structName":"Speaker","fields":[{"id":"DS-P-Speaker.Face","key":"Face","storageKey":"Face","label":"Face","description":"Speaker font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Speaker typography exposed by style(\"Speaker\") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.","type":"string","editorType":"string","default":"CoretoAveria","nativeDefault":"CoretoAveria","availability":"supported"},{"id":"DS-P-Speaker.Size","key":"Size","storageKey":"Size","label":"Size","description":"Speaker font size in pixels. Speaker typography exposed by style(\"Speaker\") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.","type":"number","editorType":"number","default":24,"nativeDefault":"24","availability":"supported","min":0,"max":4096},{"id":"DS-P-Speaker.Line","key":"Line","storageKey":"Line","label":"Line","description":"Speaker line height in pixels. Speaker typography exposed by style(\"Speaker\") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.","type":"number","editorType":"number","default":28,"nativeDefault":"28","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Menu","key":"Menu","storageKey":"Menu","label":"Menu","description":"Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.","type":"struct","editorType":"struct<Menu>","default":{"Face":"CoretoAveria","Size":22,"Line":28},"nativeDefault":"{\"Face\":\"CoretoAveria\",\"Size\":22,\"Line\":28}","availability":"supported","structName":"Menu","fields":[{"id":"DS-P-Menu.Face","key":"Face","storageKey":"Face","label":"Face","description":"Menu font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.","type":"string","editorType":"string","default":"CoretoAveria","nativeDefault":"CoretoAveria","availability":"supported"},{"id":"DS-P-Menu.Size","key":"Size","storageKey":"Size","label":"Size","description":"Menu font size in pixels. Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.","type":"number","editorType":"number","default":22,"nativeDefault":"22","availability":"supported","min":0,"max":4096},{"id":"DS-P-Menu.Line","key":"Line","storageKey":"Line","label":"Line","description":"Menu line height in pixels. Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.","type":"number","editorType":"number","default":28,"nativeDefault":"28","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Action","key":"Action","storageKey":"Action","label":"Action","description":"Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.","type":"struct","editorType":"struct<Action>","default":{"Face":"CoretoAveria","Size":20,"Line":24},"nativeDefault":"{\"Face\":\"CoretoAveria\",\"Size\":20,\"Line\":24}","availability":"supported","structName":"Action","fields":[{"id":"DS-P-Action.Face","key":"Face","storageKey":"Face","label":"Face","description":"Action font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.","type":"string","editorType":"string","default":"CoretoAveria","nativeDefault":"CoretoAveria","availability":"supported"},{"id":"DS-P-Action.Size","key":"Size","storageKey":"Size","label":"Size","description":"Action font size in pixels. Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.","type":"number","editorType":"number","default":20,"nativeDefault":"20","availability":"supported","min":0,"max":4096},{"id":"DS-P-Action.Line","key":"Line","storageKey":"Line","label":"Line","description":"Action line height in pixels. Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.","type":"number","editorType":"number","default":24,"nativeDefault":"24","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-ChoiceText","key":"ChoiceText","storageKey":"ChoiceText","label":"ChoiceText","description":"Typography for drawButton kind choice. Its Line comes from active MessageCore ChoiceWindowLineHeight (fallback 24), not this object; native choice drawing retains provider font settings.","type":"struct","editorType":"struct<ChoiceText>","default":{"Face":"CoretoAveria","Size":18},"nativeDefault":"{\"Face\":\"CoretoAveria\",\"Size\":18}","availability":"supported","structName":"ChoiceText","fields":[{"id":"DS-P-ChoiceText.Face","key":"Face","storageKey":"Face","label":"Face","description":"ChoiceText font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawButton kind choice. Its Line comes from active MessageCore ChoiceWindowLineHeight (fallback 24), not this object; native choice drawing retains provider font settings.","type":"string","editorType":"string","default":"CoretoAveria","nativeDefault":"CoretoAveria","availability":"supported"},{"id":"DS-P-ChoiceText.Size","key":"Size","storageKey":"Size","label":"Size","description":"ChoiceText font size in pixels. Typography for drawButton kind choice. Its Line comes from active MessageCore ChoiceWindowLineHeight (fallback 24), not this object; native choice drawing retains provider font settings.","type":"number","editorType":"number","default":18,"nativeDefault":"18","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Input","key":"Input","storageKey":"Input","label":"Input","description":"Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.","type":"struct","editorType":"struct<Input>","default":{"Face":"CoretoOutfit","Size":18,"Line":24},"nativeDefault":"{\"Face\":\"CoretoOutfit\",\"Size\":18,\"Line\":24}","availability":"supported","structName":"Input","fields":[{"id":"DS-P-Input.Face","key":"Face","storageKey":"Face","label":"Face","description":"Input font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.","type":"string","editorType":"string","default":"CoretoOutfit","nativeDefault":"CoretoOutfit","availability":"supported"},{"id":"DS-P-Input.Size","key":"Size","storageKey":"Size","label":"Size","description":"Input font size in pixels. Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.","type":"number","editorType":"number","default":18,"nativeDefault":"18","availability":"supported","min":0,"max":4096},{"id":"DS-P-Input.Line","key":"Line","storageKey":"Line","label":"Line","description":"Input line height in pixels. Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.","type":"number","editorType":"number","default":24,"nativeDefault":"24","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Label","key":"Label","storageKey":"Label","label":"Label","description":"Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.","type":"struct","editorType":"struct<Label>","default":{"Face":"CoretoAveria","Size":16,"Line":20},"nativeDefault":"{\"Face\":\"CoretoAveria\",\"Size\":16,\"Line\":20}","availability":"supported","structName":"Label","fields":[{"id":"DS-P-Label.Face","key":"Face","storageKey":"Face","label":"Face","description":"Label font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.","type":"string","editorType":"string","default":"CoretoAveria","nativeDefault":"CoretoAveria","availability":"supported"},{"id":"DS-P-Label.Size","key":"Size","storageKey":"Size","label":"Size","description":"Label font size in pixels. Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.","type":"number","editorType":"number","default":16,"nativeDefault":"16","availability":"supported","min":0,"max":4096},{"id":"DS-P-Label.Line","key":"Line","storageKey":"Line","label":"Line","description":"Label line height in pixels. Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.","type":"number","editorType":"number","default":20,"nativeDefault":"20","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Helper","key":"Helper","storageKey":"Helper","label":"Helper","description":"Typography for drawField helper/error text, drawCard text and the default measure role.","type":"struct","editorType":"struct<Helper>","default":{"Face":"CoretoOutfit","Size":14,"Line":20},"nativeDefault":"{\"Face\":\"CoretoOutfit\",\"Size\":14,\"Line\":20}","availability":"supported","structName":"Helper","fields":[{"id":"DS-P-Helper.Face","key":"Face","storageKey":"Face","label":"Face","description":"Helper font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawField helper/error text, drawCard text and the default measure role.","type":"string","editorType":"string","default":"CoretoOutfit","nativeDefault":"CoretoOutfit","availability":"supported"},{"id":"DS-P-Helper.Size","key":"Size","storageKey":"Size","label":"Size","description":"Helper font size in pixels. Typography for drawField helper/error text, drawCard text and the default measure role.","type":"number","editorType":"number","default":14,"nativeDefault":"14","availability":"supported","min":0,"max":4096},{"id":"DS-P-Helper.Line","key":"Line","storageKey":"Line","label":"Line","description":"Helper line height in pixels. Typography for drawField helper/error text, drawCard text and the default measure role.","type":"number","editorType":"number","default":20,"nativeDefault":"20","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Icons","key":"Icons","storageKey":"Icons","label":"Icons","description":"System-image basenames loaded at boot for named theme icons. Use existing img/system/<name>.png files without extension. CLI accepts ASCII letters, digits, underscores, spaces and hyphens; it does not copy assets. The complete preset supplies its assets through skills describe game-coreto-eng-design-system.","type":"struct","editorType":"struct<Icons>","default":{"diamond":"CoretoTheme_diamond","error":"CoretoTheme_error","Settings":"CoretoTheme_Settings","Audio":"CoretoTheme_Audio","Language":"CoretoTheme_Language","TextEffects":"CoretoTheme_TextEffects","Music":"CoretoTheme_Music","Ambience":"CoretoTheme_Ambience","Jingle":"CoretoTheme_Jingle","SoundEffects":"CoretoTheme_SoundEffects","Back":"CoretoTheme_Back","Save":"CoretoTheme_Save","Clock":"CoretoTheme_Clock","Conversation":"CoretoTheme_Conversation","Menu":"CoretoTheme_Menu"},"nativeDefault":"{\"diamond\":\"CoretoTheme_diamond\",\"error\":\"CoretoTheme_error\",\"Settings\":\"CoretoTheme_Settings\",\"Audio\":\"CoretoTheme_Audio\",\"Language\":\"CoretoTheme_Language\",\"TextEffects\":\"CoretoTheme_TextEffects\",\"Music\":\"CoretoTheme_Music\",\"Ambience\":\"CoretoTheme_Ambience\",\"Jingle\":\"CoretoTheme_Jingle\",\"SoundEffects\":\"CoretoTheme_SoundEffects\",\"Back\":\"CoretoTheme_Back\",\"Save\":\"CoretoTheme_Save\",\"Clock\":\"CoretoTheme_Clock\",\"Conversation\":\"CoretoTheme_Conversation\",\"Menu\":\"CoretoTheme_Menu\"}","availability":"supported","structName":"Icons","fields":[{"id":"DS-P-Icons.diamond","key":"diamond","storageKey":"diamond","label":"diamond","description":"System-image basename for the diamond icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_diamond","nativeDefault":"CoretoTheme_diamond","availability":"supported"},{"id":"DS-P-Icons.error","key":"error","storageKey":"error","label":"error","description":"System-image basename for the error icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_error","nativeDefault":"CoretoTheme_error","availability":"supported"},{"id":"DS-P-Icons.Settings","key":"Settings","storageKey":"Settings","label":"Settings","description":"System-image basename for the Settings icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Settings","nativeDefault":"CoretoTheme_Settings","availability":"supported"},{"id":"DS-P-Icons.Audio","key":"Audio","storageKey":"Audio","label":"Audio","description":"System-image basename for the Audio icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Audio","nativeDefault":"CoretoTheme_Audio","availability":"supported"},{"id":"DS-P-Icons.Language","key":"Language","storageKey":"Language","label":"Language","description":"System-image basename for the Language icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Language","nativeDefault":"CoretoTheme_Language","availability":"supported"},{"id":"DS-P-Icons.TextEffects","key":"TextEffects","storageKey":"TextEffects","label":"TextEffects","description":"System-image basename for the TextEffects icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_TextEffects","nativeDefault":"CoretoTheme_TextEffects","availability":"supported"},{"id":"DS-P-Icons.Music","key":"Music","storageKey":"Music","label":"Music","description":"System-image basename for the Music icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Music","nativeDefault":"CoretoTheme_Music","availability":"supported"},{"id":"DS-P-Icons.Ambience","key":"Ambience","storageKey":"Ambience","label":"Ambience","description":"System-image basename for the Ambience icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Ambience","nativeDefault":"CoretoTheme_Ambience","availability":"supported"},{"id":"DS-P-Icons.Jingle","key":"Jingle","storageKey":"Jingle","label":"Jingle","description":"System-image basename for the Jingle icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Jingle","nativeDefault":"CoretoTheme_Jingle","availability":"supported"},{"id":"DS-P-Icons.SoundEffects","key":"SoundEffects","storageKey":"SoundEffects","label":"SoundEffects","description":"System-image basename for the SoundEffects icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_SoundEffects","nativeDefault":"CoretoTheme_SoundEffects","availability":"supported"},{"id":"DS-P-Icons.Back","key":"Back","storageKey":"Back","label":"Back","description":"System-image basename for the Back icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Back","nativeDefault":"CoretoTheme_Back","availability":"supported"},{"id":"DS-P-Icons.Save","key":"Save","storageKey":"Save","label":"Save","description":"System-image basename for the Save icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Save","nativeDefault":"CoretoTheme_Save","availability":"supported"},{"id":"DS-P-Icons.Clock","key":"Clock","storageKey":"Clock","label":"Clock","description":"System-image basename for the Clock icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Clock","nativeDefault":"CoretoTheme_Clock","availability":"supported"},{"id":"DS-P-Icons.Conversation","key":"Conversation","storageKey":"Conversation","label":"Conversation","description":"System-image basename for the Conversation icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Conversation","nativeDefault":"CoretoTheme_Conversation","availability":"supported"},{"id":"DS-P-Icons.Menu","key":"Menu","storageKey":"Menu","label":"Menu","description":"System-image basename for the Menu icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Menu","nativeDefault":"CoretoTheme_Menu","availability":"supported"}]},{"id":"DS-P-OptionsLayout","key":"OptionsLayout","storageKey":"OptionsLayout","label":"OptionsLayout","description":"Pixel geometry for OptionsCore category/list rectangles when Windows is true and those provider methods exist. Offsets add to the provider rectangle; margins replace its horizontal bounds.","type":"struct","editorType":"struct<OptionsLayout>","default":{"Margin":28,"CategoryHeight":76,"CategoryOffsetY":16,"ListOffsetY":12,"RowGap":12,"Bottom":20},"nativeDefault":"{\"Margin\":28,\"CategoryHeight\":76,\"CategoryOffsetY\":16,\"ListOffsetY\":12,\"RowGap\":12,\"Bottom\":20}","availability":"supported","structName":"OptionsLayout","fields":[{"id":"DS-P-OptionsLayout.Margin","key":"Margin","storageKey":"Margin","label":"Margin","description":"Left/right margin in pixels for both Options rectangles: x = Margin; width = Graphics.boxWidth - 2 * Margin.","type":"number","editorType":"number","default":28,"nativeDefault":"28","availability":"supported","min":0,"max":4096},{"id":"DS-P-OptionsLayout.CategoryHeight","key":"CategoryHeight","storageKey":"CategoryHeight","label":"CategoryHeight","description":"Replacement category-window height in pixels.","type":"number","editorType":"number","default":76,"nativeDefault":"76","availability":"supported","min":0,"max":4096},{"id":"DS-P-OptionsLayout.CategoryOffsetY","key":"CategoryOffsetY","storageKey":"CategoryOffsetY","label":"CategoryOffsetY","description":"Nonnegative vertical pixels added to the provider category-window y position; positive moves down.","type":"number","editorType":"number","default":16,"nativeDefault":"16","availability":"supported","min":0,"max":4096},{"id":"DS-P-OptionsLayout.ListOffsetY","key":"ListOffsetY","storageKey":"ListOffsetY","label":"ListOffsetY","description":"Nonnegative vertical pixels added to the provider options-list y position; positive moves down.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096},{"id":"DS-P-OptionsLayout.RowGap","key":"RowGap","storageKey":"RowGap","label":"RowGap","description":"Minimum options-row spacing in pixels: max(RowGap, provider rowSpacing).","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096},{"id":"DS-P-OptionsLayout.Bottom","key":"Bottom","storageKey":"Bottom","label":"Bottom","description":"Bottom space in pixels removed from the available options-list height after its y offset; final height has a 160-pixel minimum.","type":"number","editorType":"number","default":20,"nativeDefault":"20","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-PictureRoles","key":"PictureRoles","storageKey":"PictureRoles","label":"PictureRoles","description":"Complete JSON array of {Image,Role} mappings for existing img/pictures/<Image>.png assets, without extension. Images must be unique nonempty ASCII letter/digit/underscore/space/hyphen basenames. [] removes all configured mappings on restart. secondary draws a light button, primary a filled action button, card a static striped surface, panel a rounded panel. The surface replaces the displayed bitmap at the original image dimensions; it does not create pictures, clicks or choices. PictureChoices or an adapter owns interaction. A registered pictures adapter can replace this lookup.","type":"array","editorType":"struct<PictureRole>[]","default":[],"nativeDefault":"[]","availability":"supported","items":{"id":"DS-P-PictureRoles.*","key":"PictureRole","storageKey":"PictureRole","label":"PictureRole","description":"One complete picture-role object. Author the entire array through /PictureRoles; item paths are not separate CLI selectors. The editor item default has an empty Image, which must be replaced by an existing valid basename before CLI insertion.","type":"struct","editorType":"struct","default":{"Image":"","Role":"secondary"},"nativeDefault":"{\"Image\":\"\",\"Role\":\"secondary\"}","availability":"supported","structName":"PictureRole","fields":[{"id":"DS-P-PictureRoles.*.Image","key":"Image","storageKey":"Image","label":"Image","description":"Existing img/pictures image basename without extension; ASCII letters, digits, underscores, spaces and hyphens only. Must be nonempty and unique in /PictureRoles.","type":"string","editorType":"file","default":"","nativeDefault":"","availability":"supported","directory":"img/pictures/"},{"id":"DS-P-PictureRoles.*.Role","key":"Role","storageKey":"Role","label":"Role","description":"secondary = light button; primary = filled action button; card = static striped surface; panel = rounded panel. These replace visual surfaces only; interaction is owned by PictureChoices or a registered adapter.","type":"string","editorType":"select","default":"secondary","nativeDefault":"secondary","availability":"supported","options":["secondary","primary","card","panel"]}]}},{"id":"DS-P-Body","key":"Body","storageKey":"Body","label":"Body","description":"Base font for message and scrolling-text windows when Windows is true. Native fallbackFonts are appended to Face; authored text escape codes can override the base.","type":"struct","editorType":"struct<Body>","default":{"Face":"CoretoOutfit","Size":20},"nativeDefault":"{\"Face\":\"CoretoOutfit\",\"Size\":20}","availability":"supported","structName":"Body","fields":[{"id":"DS-P-Body.Face","key":"Face","storageKey":"Face","label":"Face","description":"Body font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Base font for message and scrolling-text windows when Windows is true. Native fallbackFonts are appended to Face; authored text escape codes can override the base.","type":"string","editorType":"string","default":"CoretoOutfit","nativeDefault":"CoretoOutfit","availability":"supported"},{"id":"DS-P-Body.Size","key":"Size","storageKey":"Size","label":"Size","description":"Body font size in pixels. Base font for message and scrolling-text windows when Windows is true. Native fallbackFonts are appended to Face; authored text escape codes can override the base.","type":"number","editorType":"number","default":20,"nativeDefault":"20","availability":"supported","min":1,"max":4096}]},{"id":"DS-P-PaperImage","key":"PaperImage","storageKey":"PaperImage","label":"Parchment atlas","description":"192px MZ atlas with transparent irregular edges in img/system.","type":"file","editorType":"file","default":"CoretoWindow","nativeDefault":"CoretoWindow","availability":"supported","dir":"img/system/"}],"commands":[],"tags":[],"methods":[{"id":"DS-M-style","key":"style","label":"style","surface":"method","description":"Return typography for a named role. Dialogue uses the current game font; unknown roles throw.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call style(role) with Dialogue, ChoiceText, Title, Section, Speaker, Menu, Action, Input, Label, Helper or Body. It returns a new object with the configured Face/Size and, where defined, Line. Dialogue requires initialized $gameSystem and derives Line = mainFontSize() + 6. ChoiceText derives Line from active MessageCore (fallback 24). Body has no Line; use a role with Line for measure. No special this binding or mutation is required.","returns":"Typography object; unknown configuration names throw.","example":"const heading = CoretoDesignSystem.style(\"Section\");"},{"id":"DS-M-measure","key":"measure","label":"measure","surface":"method","description":"Measure wrapped text on an MZ Bitmap; restores its prior font and text properties.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call measure(bitmap, text, width, role = \"Helper\") with an MZ Bitmap, string-convertible text and available pixel width. Use a role with Face/Size/Line. It wraps at whitespace and explicit newlines, preserves empty lines, and does not split oversized words or interpret escape codes. It measures only: no pixels are drawn. Font/outline/text-color properties are restored after measurement. No special this binding.","returns":"{lines: string[], width: max(0, supplied width), height: lines.length * Line, lineHeight: Line}. Width is the supplied layout width, not the widest glyph extent.","example":"const bitmap = new Bitmap(320, 120);\nconst layout = CoretoDesignSystem.measure(bitmap, \"A short description\", 280, \"Helper\");\nbitmap.destroy();"},{"id":"DS-M-drawButton","key":"drawButton","label":"drawButton","surface":"method","description":"Draw a themed button from its rectangle, label and interaction state.","receiver":"CoretoDesignSystem","availability":"supported","context":"Existing (bitmap,rect,label,state,kind,focused) signature. Semantic text feedback: menu/choice/primary receive feather, other actions underline only. No background or glow.","returns":"undefined; bitmap pixels and text properties are modified.","example":"const bitmap = new Bitmap(320, 80);\nCoretoDesignSystem.drawButton(bitmap, {x:8,y:8,width:280,height:56}, \"Continue\", \"selected\", \"menu\", true);"},{"id":"DS-M-drawField","key":"drawField","label":"drawField","surface":"method","description":"Draw a labeled field with helper or error feedback.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call drawField(bitmap, options) with an MZ Bitmap and object {x,y,width,label,value,helper,state}. Defaults are x=0, y=0, width=480, empty strings and state=\"default\". Coordinates and width are pixels. default draws ordinary border, focused draws focus border, error adds error border/icon when helper is nonempty, disabled changes the fill. Labels/value are plain text; helper wraps on whitespace. It draws a representation, not an editable input, and leaves bitmap font/color properties modified. No special this binding. The caller owns the destination bitmap and must destroy it when no longer needed.","returns":"Number: total drawn field/helper height in pixels; helper text can exceed one line.","example":"const bitmap = new Bitmap(480, 200);\nconst height = CoretoDesignSystem.drawField(bitmap, {x:8,y:8,width:440,label:\"Name\",value:\"Reid\",helper:\"Shown in dialogue\",state:\"focused\"});"},{"id":"DS-M-drawCard","key":"drawCard","label":"drawCard","surface":"method","description":"Draw a card and wrapped text; return the content height.","receiver":"CoretoDesignSystem","availability":"supported","context":"Existing signature retained. Draws shared parchment and informative text; no dark alternate surface.","returns":"Number: wrapped text height + 2 * Card.PaddingY in pixels; this does not resize the rectangle or bitmap.","example":"const bitmap = new Bitmap(400, 180);\nconst height = CoretoDesignSystem.drawCard(bitmap, {x:0,y:0,width:400,height:180}, \"A memory of the journey\", \"memorial\");"},{"id":"DS-M-drawIcon","key":"drawIcon","label":"drawIcon","surface":"method","description":"Draw a loaded themed icon; pending images are not drawn.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call drawIcon(bitmap, name, x, y, size = 32, color = CoretoDesignSystem.colors.text). name is a key from /Icons, not a filename or IconSet index. x/y are top-left destination pixels; size is height and width preserves source aspect ratio. Unknown or not-yet-ready images draw nothing; call again after loading, no redraw is queued. error, Conversation and diamond retain source colors; others are tinted with the CSS color. Tinted bitmaps are cached (up to 64) until eviction or dispose. No special this binding. The caller owns the destination bitmap and must destroy it when no longer needed.","returns":"undefined; draws into the destination bitmap when the named image is ready.","example":"const bitmap = new Bitmap(80, 80);\nImageManager.loadSystem(CoretoDesignSystem.config.Icons.Save).addLoadListener(() => CoretoDesignSystem.drawIcon(bitmap, \"Save\", 8, 8, 32));"},{"id":"DS-M-drawItemBackground","key":"drawItemBackground","label":"drawItemBackground","surface":"method","description":"Draw the native selectable row background; call with the window as receiver.","receiver":"CoretoDesignSystem","availability":"supported","context":"Call with a selectable window and index. Clears the item background for ink controls; returns false when Windows=false. No colored rectangle or selection diamond.","returns":"Boolean: true when this window was themed, false when excluded.","example":"const window = SceneManager._scene._commandWindow;\nif (window && window.index() >= 0) CoretoDesignSystem.drawItemBackground.call(window, window.index());"},{"id":"DS-M-registerAdapter","key":"registerAdapter","label":"registerAdapter","surface":"method","description":"Replace named presentation callbacks: scrollOnPaper, choiceBadgeWidth, pictures, pictureState. Gameplay and persistence remain owned by the caller.","receiver":"CoretoDesignSystem","availability":"supported","context":"Register observational callbacks. Existing hooks remain accepted. New: choiceFeedback, choiceBadge, interfaceHidden, consumeInput, picturePresentation, pictureContext, pictureIndicator, pictureAction and pictureState. See docs/integration.md for contracts. No serialization.","returns":"undefined; replaces only the recognized callbacks supplied as functions.","example":"CoretoDesignSystem.registerAdapter({choiceBadgeWidth(window) { return Number(window.choiceAdornmentWidth?.()) || 0; }});"},{"id":"DS-M-dispose","key":"dispose","label":"dispose","surface":"method","description":"Destroy cached tinted icon bitmaps and clear the cache.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call dispose() to destroy and clear cached tinted icon bitmaps. Original loaded images, picture-owned surfaces, window hooks, configuration and registered adapters remain. Later drawIcon calls can recreate tint entries. Repeated calls on an empty cache do nothing. No arguments or special this binding.","returns":"undefined; clears only the tint cache, not the entire theme.","example":"CoretoDesignSystem.dispose();"},{"id":"DS-M-drawParchment","key":"drawParchment","label":"drawParchment","description":"(bitmap,x,y,width,height,frame=true): tiled transparent-edge parchment atlas.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawBrush","key":"drawBrush","label":"drawBrush","description":"(bitmap,left,top,right,bottom): opaque ivory support behind text and selection seal.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawQuill","key":"drawQuill","label":"drawQuill","description":"(bitmap,x,y,color?,size?): code-native feather, default 24px.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawSeal","key":"drawSeal","label":"drawSeal","description":"(bitmap,x,y,color?): broken purple wax disk with asymmetric drips in a 24px reservation.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawControl","key":"drawControl","label":"drawControl","description":"(window,rect,state,draw): semantic feedback choice/secondary/icon/none, enabled/focused/checked/support.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawLabel","key":"drawLabel","label":"drawLabel","description":"(window,text,rect,state,role,align): localized wrapped label with reserved indicator space.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawIconControl","key":"drawIconControl","label":"drawIconControl","description":"(bitmap,name,rect,state): color and 5% drawing scale; reduced motion suppresses scale.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawOption","key":"drawOption","label":"drawOption","description":"Call with the Options provider window and its original callback arguments. Preserves handlers and values.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawSaveFile","key":"drawSaveFile","label":"drawSaveFile","description":"Call with the Save provider window and its original file callback arguments.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawSaveContents","key":"drawSaveContents","label":"drawSaveContents","description":"Call with the Save provider window and its original contents callback arguments.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-layoutPanel","key":"layoutPanel","label":"layoutPanel","description":"(rects,padding=12): bounding panel rectangle or null for empty input.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-layoutTitleOptions","key":"layoutTitleOptions","label":"layoutTitleOptions","description":"(rect,titleHeight,gap=24,padding=12): title/options rectangles supplied to native composition.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-layoutFooter","key":"layoutFooter","label":"layoutFooter","description":"(rect): three equal slots with left/center/right alignment. Supplies no text or actions.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-measureSharedDescription","key":"measureSharedDescription","label":"measureSharedDescription","description":"(bitmap,texts,width,role): maximum localized description height and per-text layouts.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawChoiceCard","key":"drawChoiceCard","label":"drawChoiceCard","description":"(bitmap,rect,{title,description,cta,image?,state?}): informative title/description and semantic CTA.","context":"MZ runtime after enabled DesignSystem loads. Presentation only; no game or save mutation.","availability":"supported"},{"id":"DS-M-drawDivider","key":"drawDivider","label":"drawDivider","description":"(bitmap,x1,y1,x2,y2): one-pixel separator in #360A0B at 30% opacity. Does not change input targets.","context":"MZ runtime after enabled DesignSystem loads. Presentation only.","availability":"supported"}],"limits":"Fonts and theme images are installed by game-coreto-eng-design-system. The complete preset also requires OptionsCore and SaveCore. Parameters are read at boot; restart after authoring. No gameplay or persistence ownership.","apis":[{"id":"DS-A-version","key":"version","label":"version","surface":"property","type":"string","availability":"supported","description":"Installed runtime version.","receiver":"CoretoDesignSystem","context":"Read CoretoDesignSystem.version in the game after Enabled=true initializes the plugin; see design-system api describe /Enabled. CLI discovery does not read a running game. Persisted changes use parameters and restart. Scene changes/save loading do not reload this boot configuration.","example":"const value = CoretoDesignSystem.version;"},{"id":"DS-A-config","key":"config","label":"config","surface":"property","type":"object","availability":"supported","description":"Boot-time configuration merged from catalog defaults and the plugin registry. Missing fields use defaults; arrays replace their defaults. The exported outer API is frozen, but this object is not a persistence or live-update API: use CLI parameter authoring and restart.","receiver":"CoretoDesignSystem","context":"Read CoretoDesignSystem.config in the game after Enabled=true initializes the plugin; see design-system api describe /Enabled. CLI discovery does not read a running game. Persisted changes use parameters and restart. Scene changes/save loading do not reload this boot configuration.","example":"const value = CoretoDesignSystem.config;"},{"id":"DS-A-colors","key":"colors","label":"colors","surface":"property","type":"object","availability":"supported","description":"Surface palette with live getters: panel reads active CoreEngine itemBackColor1, text reads normalColor, heading reads systemColor, and muted follows text. Other surface values come from boot configuration; reading the object does not draw or persist anything.","receiver":"CoretoDesignSystem","context":"Read CoretoDesignSystem.colors in the game after Enabled=true initializes the plugin; see design-system api describe /Enabled. CLI discovery does not read a running game. Persisted changes use parameters and restart. Scene changes/save loading do not reload this boot configuration.","example":"const value = CoretoDesignSystem.colors;"},{"id":"DS-A-fonts","key":"fonts","label":"fonts","surface":"property","type":"object","availability":"supported","description":"Exposed family names: body=CoretoOutfit and medium=CoretoOutfitMedium are fixed, speaker reads Speaker.Face and title reads Title.Face at boot. This does not register/load fonts or mirror a later Body.Face edit.","receiver":"CoretoDesignSystem","context":"Read CoretoDesignSystem.fonts in the game after Enabled=true initializes the plugin; see design-system api describe /Enabled. CLI discovery does not read a running game. Persisted changes use parameters and restart. Scene changes/save loading do not reload this boot configuration.","example":"const value = CoretoDesignSystem.fonts;"}]};
const DEFAULTS=Object.fromEntries(catalog.parameters.map(field=>[field.key,field.default]));
// ---- configuration ----
const plugin='Coreto_5_DesignSystem';
const params=PluginManager.parameters(plugin);
function decode(value){
  if(typeof value==='string'){try{return decode(JSON.parse(value));}catch{return value;}}
  if(Array.isArray(value))return value.map(decode);
  if(value&&typeof value==='object'&&!Array.isArray(value))return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,decode(v)]));
  return value;
}
function merge(base,provided){
  const result={...base};
  for(const k of Object.keys(base)){
    const v=provided?.[k];if(v===undefined)continue;
    if(Array.isArray(base[k]))result[k]=Array.isArray(v)?v:base[k];
    else if(base[k]&&typeof base[k]==='object')result[k]=merge(base[k],v);
    else if(typeof v===typeof base[k]&&(typeof v!=='number'||Number.isFinite(v)))result[k]=v;
    else console.warn('[CoretoDesignSystem] Invalid parameter '+k+'; using default.');
  }
  return result;
}
const config=merge(DEFAULTS,decode(params));
if(!config.Enabled)return;
// Upgrade the bundled typography; consumer font families remain authoritative.
for(const role of ['Title','Section','Speaker','Menu','Action','Label','ChoiceText']) {
  if(['CoretoCinzel','CoretoOutfitMedium','CoretoOutfit','CoretoAveria'].includes(config[role]?.Face)) config[role].Face='CoretoAveria';
}
const active=id=>($plugins||[]).some(p=>p.name===id&&p.status);
const providers={core:active('Coreto_0_CoreEngine'),message:active('Coreto_1_MessageCore'),ext:active('Coreto_2_ExtMessageFunc')};
const colors={...config.Surfaces};
Object.defineProperties(colors,{
  panel:{enumerable:true,get:()=>providers.core?ColorManager.itemBackColor1():config.Surfaces.panel},
  text:{enumerable:true,get:()=>providers.core?ColorManager.normalColor():'#360a0b'},
  heading:{enumerable:true,get:()=>providers.core?ColorManager.systemColor():'#360a0b'},
  muted:{enumerable:true,get:()=>colors.text}
});
const fonts={body:'CoretoOutfit',medium:'CoretoOutfitMedium',speaker:config.Speaker.Face,title:config.Title.Face};
const choiceSize=config.ChoiceText.Size;
const icons={};
const pictureRoles=new Map(config.PictureRoles.filter(r=>r&&typeof r.Image==='string'&&['secondary','primary','card','panel'].includes(r.Role)).map(r=>[r.Image,r.Role]));
const integrations={
  scrollOnPaper:w=>w.textSurface?.()==='paper',
  choiceBadgeWidth:w=>Number(w.choiceAdornmentWidth?.())||0,
  pictures:p=>{
    const kind=pictureRoles.get(p?.name());if(!kind)return null;
    const bitmap=ImageManager.loadPicture(p.name());if(!bitmap.isReady())return null;
    return {surface:true,kind,width:bitmap.width,height:bitmap.height,context:'paper'};
  },
  pictureState:s=>({active:!!s.uiActionActive?.()})
};
const wrap=(prototype,method,decorate)=>{
  const previous=prototype?.[method];if(typeof previous!=='function')return;
  prototype[method]=function(...args){return decorate.call(this,previous,args);};
};
const isTitle=w=>w instanceof Window_TitleCommand||(w instanceof Window_ChoiceList&&SceneManager.isSceneTitleMap?.());
const isConsole=w=>typeof Window_ButtonConsole!=='undefined'&&w instanceof Window_ButtonConsole;
const menuScene=()=>SceneManager._scene instanceof Scene_MenuBase;
function themed(w){return config.Windows&&w instanceof Window_Base&&!(w instanceof Window_ScrollText)&&!(w instanceof Window_MapName)&&(w.constructor.name!=='Window_ButtonAssist'||menuScene())&&!w._coretoPictureText;}
const list=w=>themed(w)&&w instanceof Window_Selectable&&!(w instanceof Window_NameEdit)&&!(w instanceof Window_NumberInput)&&!isConsole(w);
wrap(Scene_Boot.prototype,'loadGameFonts',function(previous,args){
  const result=previous.apply(this,args);
  // MessageCore registers fonts; the theme owns only its images.
  for(const [name,filename]of Object.entries(config.Icons)){
    const bitmap=ImageManager.loadSystem(filename);menuIcons[name]=bitmap;icons[name]=bitmap;
  }
  icons.continue=ImageManager.loadSystem('CoretoTheme_continue');
  return result;
});
// ---- drawing ----
  function path(ctx,x,y,width,height,radius) {
    const r = Math.min(radius,width/2,height/2);
    ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+width-r,y);
    ctx.quadraticCurveTo(x+width,y,x+width,y+r); ctx.lineTo(x+width,y+height-r);
    ctx.quadraticCurveTo(x+width,y+height,x+width-r,y+height); ctx.lineTo(x+r,y+height);
    ctx.quadraticCurveTo(x,y+height,x,y+height-r); ctx.lineTo(x,y+r);
    ctx.quadraticCurveTo(x,y,x+r,y); ctx.closePath();
  }
  function box(bitmap,x,y,width,height,fill,stroke,radius=6,line=1) {
    if (width<=line || height<=line) return;
    const ctx=bitmap.context;
    ctx.save(); path(ctx,x+line/2,y+line/2,width-line,height-line,radius);
    if(fill){ctx.fillStyle=fill;ctx.fill();}
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=line;ctx.stroke();}
    ctx.restore(); bitmap.baseTexture.update();
  }
  function blit(bitmap,name,x,y,width,height) {
    const source=icons[name];
    if(source && source.isReady()) bitmap.blt(source,0,0,source.width,source.height,x,y,width,height);
  }
  function textStyle(bitmap,face,size,color) {
    bitmap.fontFace=face;bitmap.fontSize=size;bitmap.fontBold=false;
    bitmap.fontItalic=false;bitmap.outlineWidth=0;bitmap.outlineColor='rgba(0,0,0,0)';bitmap.textColor=color;
  }
  // Pointer feedback is presentation only. Native plugins own selection/clicks.
  let pointerUsed=false;
  wrap(TouchInput,'_onMouseMove',function(previous,args){pointerUsed=true;return previous.apply(this,args);});
  function pointerOver(sprite){
    if(!pointerUsed||!sprite.worldVisible||!sprite.worldAlpha)return false;
    const point=sprite.worldTransform.applyInverse(new Point(TouchInput.x,TouchInput.y));
    return point.x>=-sprite.anchor.x*sprite.width&&point.x<(1-sprite.anchor.x)*sprite.width&&
      point.y>=-sprite.anchor.y*sprite.height&&point.y<(1-sprite.anchor.y)*sprite.height;
  }
// ---- components ----
function buttonSurface(bitmap,rect,state,selected=false,primary=false,kind='secondary'){
  const dark=state==='pressed'||selected||primary;
  const fill=state==='disabled'?colors.disabled:state==='pressed'?colors.pressed:state==='hover'||state==='selectedHover'?(dark?colors.accentHover:colors.hover):dark?colors.primary:colors.panel;
  const hover=state==='hover'||state==='selectedHover',resting=state!=='pressed'&&state!=='disabled';
  const border=resting&&selected?(kind==='menu'&&hover?colors.menuSelectedHoverBorder:colors.gold):hover?colors.focus:colors.border;
  const width=hover?config.Shapes.FocusWidth:resting&&selected?(kind==='menu'?config.Shapes.MenuSelectedWidth:config.Shapes.FocusWidth):config.Shapes.BorderWidth;
  box(bitmap,rect.x,rect.y,rect.width,rect.height,fill,border,config.Shapes.ControlRadius,width);
}
function staticSurface(bitmap,rect,context='paper'){
  box(bitmap,rect.x,rect.y,rect.width,rect.height,context==='scene'?colors.cardScene:context==='memorial'?colors.cardMemorial:colors.card,null,0,0);
  bitmap.fillRect(rect.x+config.Card.StripeX,rect.y+config.Card.PaddingY,config.Card.StripeWidth,Math.max(0,rect.height-config.Card.PaddingY*2),colors.subtle);
}
function drawButton(bitmap,rect,label,state='default',kind='menu',focused=false){
  if(kind==='text'||kind==='primary'){if(state==='selected')state='default';if(state==='selectedHover')state='hover';}
  if(kind==='choice'&&state==='pressed')state='selected';
  const selected=['selected','selectedHover'].includes(state),disabled=state==='disabled';
  if(kind!=='text')buttonSurface(bitmap,rect,state,selected,kind==='primary',kind);
  else if(state!=='default')box(bitmap,rect.x,rect.y,rect.width,rect.height,state==='disabled'?colors.disabled:state==='pressed'?colors.pressed:colors.hover,null,config.Shapes.ControlRadius,0);
  const s=config[kind==='menu'?'Menu':kind==='choice'?'ChoiceText':'Action'];
  const marker=kind==='menu'||kind==='choice',m=kind==='menu'?config.Button.MarkerSize:config.Choice.MarkerSize;
  const pad=config.Button.PaddingX,gap=kind==='menu'?config.Button.MarkerGap:config.Choice.MarkerGap;
  if(marker&&(selected||state==='pressed'))blit(bitmap,'diamond',rect.x+pad,rect.y+(rect.height-m)/2,m,m);
  const dark=selected||state==='pressed'||kind==='primary';
  textStyle(bitmap,s.Face,s.Size,disabled?colors.muted:dark?colors.onAccent:colors.text);
  const inset=pad+(marker?m+gap:0);
  bitmap.drawText(label,rect.x+inset,rect.y,Math.max(1,rect.width-inset-pad),rect.height,marker?'left':'center');
  if(focused&&!disabled){const gap=config.Shapes.FocusGap+config.Shapes.FocusWidth;box(bitmap,rect.x-gap,rect.y-gap,rect.width+2*gap,rect.height+2*gap,null,colors.gold,config.Shapes.ControlRadius,config.Shapes.FocusWidth);}
}
function drawField(bitmap,options){
  const {x=0,y=0,width=480,label='',value='',helper='',state='default'}=options;
  const l=config.Label,i=config.Input,h=config.Helper,f=config.Field;
  textStyle(bitmap,l.Face,l.Size,colors.text);bitmap.drawText(label,x,y,width,l.Line);
  const fy=y+l.Line+f.Gap;
  box(bitmap,x,fy,width,f.Height,state==='disabled'?colors.disabled:colors.panel,state==='focused'?colors.focus:state==='error'?colors.error:colors.border,config.Shapes.ControlRadius,state==='focused'?config.Shapes.FocusWidth:config.Shapes.BorderWidth);
  textStyle(bitmap,i.Face,i.Size,colors.text);bitmap.drawText(value,x+f.PaddingX,fy,width-f.PaddingX*2,f.Height);
  if(!helper)return l.Line+f.Gap+f.Height;
  const hy=fy+f.Height+f.Gap,err=state==='error',inset=err?32:0;
  if(err)blit(bitmap,'error',x,hy,24,24);
  const layout=measure(bitmap,helper,width-inset,'Helper');textStyle(bitmap,h.Face,h.Size,colors.text);
  layout.lines.forEach((line,index)=>bitmap.drawText(line,x+inset,hy+index*h.Line,width-inset,h.Line));
  return hy-y+Math.max(err?24:0,layout.height);
}
const menuIcons={},tintedIcons=new Map();
function menuIcon(bitmap,name,x,y,size=32,color=colors.text){
  const source=menuIcons[name];if(!source?.isReady())return;
  if(['error','Conversation','diamond'].includes(name)){bitmap.blt(source,0,0,source.width,source.height,x,y,size*source.width/source.height,size);return;}
  const key=name+color;let tinted=tintedIcons.get(key);
  if(!tinted){
    if(tintedIcons.size>=64){const first=tintedIcons.keys().next().value;tintedIcons.get(first).destroy();tintedIcons.delete(first);}
    tinted=new Bitmap(source.width,source.height);tinted.blt(source,0,0,source.width,source.height,0,0);
    const ctx=tinted.context;ctx.save();ctx.globalCompositeOperation='source-in';ctx.fillStyle=color;ctx.fillRect(0,0,tinted.width,tinted.height);ctx.restore();tinted.baseTexture.update();tintedIcons.set(key,tinted);
  }
  bitmap.blt(tinted,0,0,tinted.width,tinted.height,x,y,size*tinted.width/tinted.height,size);
}
function drawItemBackground(index){
  if(!list(this))return false;
  const rect=this.itemRect(index),enabled=this instanceof Window_SavefileList?this.isEnabled(this.indexToSavefileId(index)):!this.isCommandEnabled||this.isCommandEnabled(index);
  const selected=index===this.index(),hover=enabled&&index===this._coretoHoverIndex;
  const pressed=enabled&&this.active&&((selected&&Input.isPressed('ok'))||(hover&&this._coretoPointerPressed));
  const state=!enabled?'disabled':pressed?'pressed':hover?'hover':selected?'selected':'default';
  buttonSurface(this.contentsBack,rect,state,selected,false,isTitle(this)?'menu':'secondary');
  if(selected&&enabled&&(this instanceof Window_ChoiceList||this instanceof Window_TitleCommand)){
    const size=isTitle(this)?config.Button.MarkerSize:config.Choice.MarkerSize;
    blit(this.contentsBack,'diamond',rect.x+8,rect.y+(rect.height-size)/2,size,size);
  }
  return true;
}
// ---- mz ----
  if(config.Windows){
  // Keep native window lifecycle, clipping, openness and visibility ownership.
  // Only replace the generated frame/back textures, never the Window subsystem.
  function surface(w,kind) {
    const key='_coreto'+kind;
    const width=Math.max(1,Math.ceil(w.width)),height=Math.max(1,Math.ceil(w.height));
    let bitmap=w[key];
    if(!bitmap||bitmap.width!==width||bitmap.height!==height){
      if(bitmap)bitmap.destroy();
      bitmap=w[key]=new Bitmap(width,height);
    }else bitmap.clear();
    return bitmap;
  }
  for(const [method,kind] of [['_refreshBack','Back'],['_refreshFrame','Frame']]){
    wrap(Window.prototype,method,function(previous,args){
      if(!themed(this)||isConsole(this))return previous.apply(this,args);
      const sprite=kind==='Back'?this._backSprite:this._frameSprite;
      const bitmap=surface(this,kind);
      const invisible=this instanceof Window_NameBox||isTitle(this);
      const staticCard=this instanceof Window_Help;
      if(!invisible&&staticCard){if(kind==='Back')staticSurface(bitmap,{x:0,y:0,width:this.width,height:this.height});}
      else if(!invisible)box(bitmap,0,0,this.width,this.height,kind==='Back'?colors.panel:null,
        kind==='Frame'?colors.border:null,config.Shapes.PanelRadius);
      if(!invisible&&kind==='Frame'&&this instanceof Window_Message)
        box(bitmap,config.Shapes.Inset,config.Shapes.Inset,this.width-config.Shapes.Inset*2,this.height-config.Shapes.Inset*2,null,colors.subtle,config.Shapes.ControlRadius);
      sprite.bitmap=bitmap;sprite.setFrame(0,0,this.width,this.height);
      sprite.move(0,0);sprite.scale.set(1,1);sprite.setColorTone([0,0,0,0]);
      // Replace the native skin at the source, including its nine-slice parts.
      for(const child of sprite.children){child.bitmap=null;child.visible=false;}
    });
  }
  wrap(Window_Base.prototype,'destroy',function(previous,args){
    const own=[this._coretoBack,this._coretoFrame];
    const result=previous.apply(this,args);
    for(const bitmap of own)if(bitmap)bitmap.destroy();
    return result;
  });
  function darkTextSurface(w){
    if(w instanceof Window_Message)return $gameMessage.background()!==0;
    if(w instanceof Window_NameBox)return !!w._messageWindow&&darkTextSurface(w._messageWindow);
    if(w instanceof Window_ScrollText)return !integrations.scrollOnPaper(w);
    return false;
  }
  function textContrast(w){
    if(!w.contents)return;
    const general=globalThis.VisuMZ?.MessageCore?.Settings?.General;
    w.contents.outlineWidth=darkTextSurface(w)?config.Dialogue.ContrastOutline:Number(general?.DefaultOutlineWidth||0);
    w.contents.outlineColor=ColorManager.outlineColor();
  }
  function ink(w) {
    if(darkTextSurface(w))return colors.onAccent;
    if(providers.message&&w instanceof Window_NameBox)return ColorManager.textColor(globalThis.VisuMZ.MessageCore.Settings.General.NameBoxWindowDefaultColor);
    if(w._coretoConsoleState==='pressed'||w._coretoConsoleToggled)return colors.onAccent;
    const index=w._coretoDrawingIndex;
    if(index!==undefined){
      if(w.isCommandEnabled&&!w.isCommandEnabled(index))return colors.muted;
      if(index===w.index())return colors.onAccent;
    }
    return colors.text;
  }
  wrap(Window_Base.prototype,'resetTextColor',function(previous,args){
    const result=previous.apply(this,args);
    if(!isConsole(this)&&(themed(this)||this instanceof Window_ScrollText)&&this.contents){this.contents.textColor=ink(this);textContrast(this);}
    return result;
  });
  wrap(Window_Base.prototype,'changeTextColor',function(previous,args){
    if(themed(this)&&this._coretoDrawingIndex!==undefined)args[0]=ink(this);
    if(this instanceof Window_ScrollText)args[0]=ink(this);
    return previous.apply(this,args);
  });
  wrap(Window_Base.prototype,'changePaintOpacity',function(previous,args){
    if(themed(this)&&this._coretoDrawingIndex!==undefined)args[0]=true;
    return previous.apply(this,args);
  });
  wrap(Window_Help.prototype,'drawTextEx',function(previous,args){
    args[1]=(args[1]||0)+16;if(args[3])args[3]-=16;
    return previous.apply(this,args);
  });
  wrap(Window_Base.prototype,'resetFontSettings',function(previous,args){
    const result=previous.apply(this,args);
    // MessageCore registers the family; message escapes still override this base.
    if(this instanceof Window_Message||this instanceof Window_ScrollText){
      this.contents.fontFace=config.Body.Face+", "+$dataSystem.advanced.fallbackFonts;
      this.contents.fontSize=config.Body.Size;
    }
    else if(this instanceof Window_NameBox || this instanceof Window_Command || this._coretoPictureText || this.constructor.name==='Window_ButtonAssist') {
      const role=this instanceof Window_NameBox?'Speaker':this instanceof Window_ChoiceList?'ChoiceText':'Menu';
      this.contents.fontFace=config[role].Face;
      this.contents.fontBold=false;
      this.contents.outlineWidth=0;
    }
    if(!isConsole(this)&&!this._coretoPictureText)textContrast(this);
    return result;
  });
  wrap(Window_Base.prototype,'calcTextHeight',function(previous,args){
    const height=previous.apply(this,args);
    if(this instanceof Window_Message)return Math.max(height,this.contents.fontSize+6);
    return height;
  });
  // Draw native item states while leaving command lists and handlers intact.
  if(!providers.core)wrap(Window_Selectable.prototype,'drawItemBackground',function(previous,args){if(!drawItemBackground.call(this,args[0]))return previous.apply(this,args);});
  const prototypes=[Window_Command.prototype,Window_ChoiceList.prototype,Window_Options.prototype,Window_SavefileList.prototype];
  // Specialised options classes can override drawItem; bind the theme after boot
  // without replacing their native status/control rendering.
  function decorateItem(prototype){
    wrap(prototype,'drawItem',function(previous,args){
      if(!list(this))return previous.apply(this,args);
      const before=this._coretoDrawingIndex;this._coretoDrawingIndex=args[0];
      try{return previous.apply(this,args);}finally{this._coretoDrawingIndex=before;}
    });
  }
  prototypes.forEach(decorateItem);
  if(typeof Window_OptionsCategory!=='undefined')decorateItem(Window_OptionsCategory.prototype);
  // Options categories keep Coreto's labels, layout logic and input handlers.
  // OptionsCore has hard-coded scene rectangles and no per-scene row metrics.
  if(typeof Window_OptionsCategory!=='undefined')wrap(Window_OptionsCategory.prototype,'itemHeight',function(){return this.innerHeight;});
  wrap(Window_Options.prototype,'rowSpacing',function(previous,args){return Math.max(config.OptionsLayout.RowGap,previous.apply(this,args));});
  wrap(Scene_Options.prototype,'categoryWindowRect',function(previous,args){const r=previous.apply(this,args),c=config.OptionsLayout;r.x=c.Margin;r.y+=c.CategoryOffsetY;r.width=Graphics.boxWidth-c.Margin*2;r.height=c.CategoryHeight;return r;});
  wrap(Scene_Options.prototype,'optionsWindowRect',function(previous,args){const r=previous.apply(this,args),c=config.OptionsLayout;r.x=c.Margin;r.y+=c.ListOffsetY;r.width=Graphics.boxWidth-c.Margin*2;r.height=Math.max(160,this.mainAreaTop()+this.mainAreaHeight()-r.y-c.Bottom);return r;});
  // SaveCore draws loaded data asynchronously; derive the drawing index again
  // so a bitmap load never inherits a different row's selected text color.
  wrap(Window_SavefileList.prototype,'drawContentsLoaded',function(previous,args){
    const before=this._coretoDrawingIndex;this._coretoDrawingIndex=this.savefileIdToIndex(args[0].savefileId);
    try{return previous.apply(this,args);}finally{this._coretoDrawingIndex=before;}
  });
  wrap(Sprite_Button.prototype,'loadButtonImage',function(previous,args){
    if(this._buttonType!=='cancel')return previous.apply(this,args);
    if(this._buttonType==='cancel'){
      {
        // Keep the native 11-cell ButtonSet contract and its 96x48 hit area.
        // Each sprite owns its texture: scene teardown destroys its bitmap.
        const menuButtonSet=new Bitmap(528,144);
        this._coretoOwnedButtonBitmap=menuButtonSet;
        const draw=()=>{if(this._destroyed)return;for(const [i,state] of ['default','pressed','hover'].entries()){
          const y=i*48;buttonSurface(menuButtonSet,{x:1,y:y+1,width:94,height:46},state);
          menuIcon(menuButtonSet,'Back',32,y+8,32,state==='pressed'?colors.onAccent:colors.text);
        }};
        menuIcons.Back.addLoadListener(draw);
        this.bitmap=menuButtonSet;
      }
      this._coretoMenuButton=true;
    }
  });
  wrap(Sprite_Button.prototype,'destroy',function(previous,args){const b=this._coretoOwnedButtonBitmap;this._coretoOwnedButtonBitmap=null;if(b)this.bitmap=null;const result=previous.apply(this,args);if(b)b.destroy();return result;});
  wrap(Sprite_Button.prototype,'updateOpacity',function(previous,args){
    const result=previous.apply(this,args);if(this._coretoMenuButton)this.opacity=255;return result;
  });
  wrap(Sprite_Button.prototype,'updateFrame',function(previous,args){
    const result=previous.apply(this,args);
    if(this._coretoMenuButton&&!this.isPressed()&&pointerOver(this))this.setFrame(0,96,96,48);
    return result;
  });
  wrap(Window.prototype,'_refreshArrows',function(previous,args){
    const result=previous.apply(this,args);
    if(menuScene()&&icons.continue)for(const [sprite,rotation] of [[this._downArrowSprite,0],[this._upArrowSprite,Math.PI]]){
      sprite.bitmap=icons.continue;sprite.setFrame(0,0,16,10);sprite.rotation=rotation;
    }return result;
  });
  wrap(Window_Selectable.prototype,'select',function(previous,args){
    const old=this.index();const result=previous.apply(this,args);
    if(list(this)&&this.contents&&this.contentsBack&&old!==this.index()){
      for(const index of [old,this.index()])if(index>=0&&index<this.maxItems())this.redrawItem(index);
    }
    return result;
  });
  wrap(Window_Selectable.prototype,'update',function(previous,args){
    const result=previous.apply(this,args);
    if(list(this)&&this.contents){
      const oldHover=this._coretoHoverIndex;
      this._coretoHoverIndex=pointerUsed&&this.active&&this.visible&&this.isOpen()&&this.isTouchedInsideFrame()?this.hitIndex():-1;
      this._coretoPointerPressed=this.active&&TouchInput.isPressed()&&this._coretoHoverIndex>=0;
      const signature=[this.active,Input.isPressed('ok'),this._coretoPointerPressed,this._coretoHoverIndex].join('|');
      if(this._coretoState!==signature){
        this._coretoState=signature;
        for(const i of new Set([oldHover,this._coretoHoverIndex,this.index()]))if(i>=0&&i<this.maxItems())this.redrawItem(i);
      }
    }
    return result;
  });
  wrap(Window.prototype,'_updateCursor',function(previous,args){
    const result=previous.apply(this,args);if(list(this))this._cursorSprite.visible=false;return result;
  });
  wrap(Window_ChoiceList.prototype,'itemRectWithPadding',function(previous,args){
    const rect=previous.apply(this,args);const gap=isTitle(this)?config.Button.MarkerSize+config.Button.MarkerGap:config.Choice.MarkerSize+config.Choice.MarkerGap;
    rect.x+=gap;rect.width=Math.max(1,rect.width-gap);return rect;
  });
  wrap(Window_ChoiceList.prototype,'maxChoiceWidth',function(previous,args){
    const available=(Graphics.boxWidth-this.padding*2)/Math.max(1,this.maxCols())-this.colSpacing();
    return Math.min(previous.apply(this,args)+(isTitle(this)?config.Button.MarkerSize+config.Button.MarkerGap:config.Choice.MarkerSize+config.Choice.MarkerGap),Math.min(config.Choice.MaxWidth,available));
  });
  wrap(Window_ChoiceList.prototype,'commandName',function(previous,args){
    const source=previous.apply(this,args);
    if(isTitle(this)||this._pictureChoicesHidden||!source||!this.contents)return source;
    const badge=integrations.choiceBadgeWidth(this);
    const width=Math.max(80,this.maxChoiceWidth()-this.itemPadding()*2-24-badge);
    const key=[source,width,ConfigManager.textLocale,choiceSize].join('|');
    this._coretoWrappedLabels=this._coretoWrappedLabels||new Map();
    if(this._coretoWrappedLabels.has(key))return this._coretoWrappedLabels.get(key);
    const lines=[];
    for(const paragraph of source.split(/\n|<BR>|<LINEBREAK>/i)){
      // Keep escape strings and tags intact, including tags containing spaces.
      const words=paragraph.match(/(?:\\\w+(?:<[^>]*>|\[[^\]]*\])?|<[^>]*>|[^\s<])+/g)||[];
      let line='';
      for(const word of words){
        const candidate=line?line+' '+word:word;
        if(line&&this.textSizeEx(candidate).width>width){lines.push(line);line=word;}
        else line=candidate;
      }
      lines.push(line);
    }
    const text=lines.join('\n');
    if(this._coretoWrappedLabels.size>100)this._coretoWrappedLabels.clear();
    this._coretoWrappedLabels.set(key,text);return text;
  });
  wrap(Window_ChoiceList.prototype,'itemHeight',function(previous,args){
    const native=previous.apply(this,args);
    // Explicit line breaks remain authored by Coreto; all rows use the tallest
    // measured label so native scrolling and pointer hit-testing stay aligned.
    let height=config.Button.MinHeight+(isTitle(this)?this.rowSpacing():0);
    if(this.contents&&this._list)for(let i=0;i<this._list.length;i++)height=Math.max(height,this.textSizeEx(this.commandName(i)).height+config.Choice.PaddingY*2);
    return Math.max(native,height);
  });
  // Speaker uses the existing NameBox inside the paper panel. Coreto still
  // controls parsing, HIDE, page breaks, faces and reading completion.
  wrap(Window_Message.prototype,'lineHeight',function(previous,args){return $gameSystem.mainFontSize()+6;});
  wrap(Window_Message.prototype,'updateDimensions',function(previous,args){
    const result=previous.apply(this,args);
    if(this._forcedPosition||this._messageAutoSize)return result;
    const width=this.width;
    const height=Math.min(Graphics.boxHeight,this.height+(config.Dialogue.SpeakerInside&&$gameMessage.speakerName()?config.Speaker.Line+config.Dialogue.SpeakerGap:0));
    if(width!==this.width||height!==this.height){this.width=width;this.height=height;if(this.contents)this.createContents();}
    if(this.alignButtonConsoleButtons)this.alignButtonConsoleButtons();
    return result;
  });
  wrap(Window_Message.prototype,'newLineX',function(previous,args){return previous.apply(this,args)+config.Dialogue.TextInset;});
  wrap(Window_Message.prototype,'newPage',function(previous,args){
    const result=previous.apply(this,args);
    if(config.Dialogue.SpeakerInside&&$gameMessage.speakerName()&&args[0]){args[0].y+=config.Speaker.Line+config.Dialogue.SpeakerGap;args[0].startY=args[0].y;}
    return result;
  });
  wrap(Window_NameBox.prototype,'resetFontSettings',function(previous,args){
    const result=previous.apply(this,args);textContrast(this);return result;
  });
  wrap(Window_NameBox.prototype,'resetTextColor',function(previous,args){
    const result=previous.apply(this,args);this.contents.textColor=ink(this);textContrast(this);return result;
  });
  wrap(Window_NameBox.prototype,'updatePlacement',function(previous,args){
    const result=previous.apply(this,args),message=this._messageWindow;
    if(message&&config.Dialogue.SpeakerInside){this.x=message.x+config.Dialogue.TextInset;this.y=message.y;this.opacity=0;
      if(providers.message){const p=decode(PluginManager.parameters('Coreto_1_MessageCore')),g=p['General:struct']||{};this.x+=Number(g['NameBoxWindowOffsetX:num']||0);this.y+=Number(g['NameBoxWindowOffsetY:num']||0);}}
    return result;
  });
  // Native character-name input: visual field treatment, original keyboard,
  // validation and actor-name commit remain owned by MZ/Coreto.
  wrap(Window_NameEdit.prototype,'refresh',function(previous,args){
    const result=previous.apply(this,args);
    if(!this._actor)return result;
    const first=this.itemRect(0),last=this.itemRect(Math.max(0,this._maxLength-1));
    const x=first.x-12,y=first.y-2,width=Math.min(this.innerWidth-x,last.x+last.width-x+12);
    this.contentsBack.clear();box(this.contentsBack,x,y,width,config.Field.Height,colors.panel,colors.focus,config.Shapes.ControlRadius,config.Shapes.FocusWidth);
    return result;
  });
  }
// ExtMessageFunc still owns the graphic, frames, anchor and offsets. This only
// provides the missing composition mode: a stable corner instead of text-end.
if(providers.ext)wrap(Window_Message.prototype,'_updatePauseSign',function(previous,args){
  const result=previous.apply(this,args),sprite=this._pauseSignSprite;
  if(config.Windows&&config.Dialogue.ContinuePlacement==='corner'&&sprite&&this.isCustomMessageCursorEnabled?.()){
    const settings=$gameSystem.getMessageCursorSettings();
    sprite.x=this.width-this.padding-config.Dialogue.TextInset+Number(settings.OffsetX||0);
    sprite.y=this.height-this.padding-(this.addedHeight?.()||0)-10+Number(settings.OffsetY||0);
    sprite.visible=this.isOpen()&&this.pause&&!this.isClosing()&&!this.isAnySubWindowActive();
  }
  return result;
});
// ---- pictures ----
// Opt-in picture decoration. The consuming game supplies roles; this module never decides gameplay.
wrap(Sprite_Picture.prototype,'createPictureText',function(previous,args){
  const result=previous.apply(this,args);
  if(this._pictureTextWindow)this._pictureTextWindow._coretoPictureText=true;
  return result;
});
function pictureRole(sprite){return integrations.pictures(sprite.picture(),sprite)||null;}
wrap(Sprite_Picture.prototype,'loadBitmap',function(previous,args){
  const role=pictureRole(this);
  if(!role?.surface){if(this._coretoButtonBitmap){this.bitmap=null;this._coretoButtonBitmap.destroy();this._coretoButtonBitmap=null;}return previous.apply(this,args);}
  const old=this._coretoButtonBitmap;
  this._coretoButtonBitmap=new Bitmap(role.width,role.height);this.bitmap=this._coretoButtonBitmap;
  drawPictureSurface(this,role,{});this._coretoPictureSignature=null;
  if(old)old.destroy();
});
function drawPictureSurface(sprite,role,state){
  const bitmap=sprite._coretoButtonBitmap;bitmap.clear();
  const rect={x:0,y:0,width:bitmap.width,height:bitmap.height};
  if(role.kind==='card')staticSurface(bitmap,rect,'paper');
  else if(role.kind==='panel')box(bitmap,0,0,rect.width,rect.height,colors.panel,colors.subtle,config.Shapes.PanelRadius);
  else buttonSurface(bitmap,rect,state.state||'default',state.selected,role.kind==='primary');
  if(role.icon)menuIcon(bitmap,role.icon,(rect.width-40)/2,(rect.height-32)/2,32,state.selected?colors.onAccent:colors.text);
}
function pictureAction(sprite,role){
  if(role.interactionPictureId){
    const id=role.interactionPictureId,index=$gameScreen.getPictureChoiceBinding?.(id)??-1;
    const find=n=>{if(n instanceof Sprite_Picture&&n._pictureId===id)return n;for(const c of n.children||[]){const found=find(c);if(found)return found;}};
    return {index,owner:find(SceneManager._scene?._spriteset?._pictureContainer||{})||sprite};
  }
  for(let n=sprite;n;n=n.parent)if(n instanceof Sprite_Picture){
    const index=$gameScreen.getPictureChoiceBinding?.(n._pictureId)??-1;if(index>=0)return {index,owner:n};
  }
  return {index:-1,owner:sprite};
}
wrap(Sprite_Picture.prototype,'update',function(previous,args){
  const result=previous.apply(this,args),role=pictureRole(this);
  if(!role){if(this._pictureTextWindow)delete this._pictureTextWindow._coretoPictureInk;return result;}
  const supplied=integrations.pictureState(this,role)||{};
  const choice=SceneManager._scene?._choiceListWindow,{index,owner}=pictureAction(this,role);
  const bound=index>=0&&!!choice?._list?.[index];
  const active=bound&&choice.active;
  const disabled=supplied.disabled??(bound&&!choice.isCommandEnabled(index));
  const selected=supplied.selected??(active&&choice.index()===index);
  const over=(active||supplied.active)&&pointerOver(owner);
  const pressed=(active||supplied.active)&&((over&&TouchInput.isPressed())||(selected&&Input.isPressed('ok')));
  const state=disabled?'disabled':pressed?'pressed':over?'hover':selected?'selected':'default';
  if(role.surface){
    // Correct only the UI surfaces opted into the adapter; authored artwork is untouched.
    // PictureChoices retains ownership of authored tones.
    if(!this._coretoButtonBitmap){this._coretoButtonBitmap=new Bitmap(role.width,role.height);this._coretoPictureSignature=null;}
    const signature=JSON.stringify([role,state,selected]);
    if(signature!==this._coretoPictureSignature){
      this._coretoPictureSignature=signature;drawPictureSurface(this,role,{state,selected});
      if(this._pictureTextWindow){
        this._pictureTextWindow._coretoPictureInk=!disabled&&(selected||pressed||role.kind==='primary')?colors.onAccent:null;
        $gameScreen.requestPictureTextRefresh?.(this._pictureId);this.drawPictureText?.();this.attachPictureText?.();
      }
    }
    this.bitmap=this._coretoButtonBitmap;
  }
  return result;
});
wrap(Window_Base.prototype,'changeTextColor',function(previous,args){
  if(this._coretoPictureInk)args[0]=this._coretoPictureInk;return previous.apply(this,args);
});
wrap(Sprite_Picture.prototype,'destroy',function(previous,args){
  const bitmap=this._coretoButtonBitmap;this._coretoButtonBitmap=null;if(bitmap)this.bitmap=null;const result=previous.apply(this,args);if(bitmap)bitmap.destroy();return result;
});
// ---- api ----
function registerAdapter(adapter){
  for(const key of Object.keys(integrations))if(typeof adapter[key]==='function')integrations[key]=adapter[key];
}
function style(role){
  if(role==='Dialogue')return {Face:$gameSystem.mainFontFace(),Size:$gameSystem.mainFontSize(),Line:$gameSystem.mainFontSize()+6};
  if(role==='ChoiceText')return {...config.ChoiceText,Line:providers.message?Number(globalThis.VisuMZ?.MessageCore?.Settings?.General?.ChoiceWindowLineHeight||24):24};
  const value=config[role];if(!value)throw Error('Unknown Coreto style: '+role);return {...value};
}
function measure(bitmap,text,width,role='Helper'){
  const s=style(role),saved=Object.fromEntries(['fontFace','fontSize','fontBold','fontItalic','outlineWidth','outlineColor','textColor'].map(k=>[k,bitmap[k]]));
  textStyle(bitmap,s.Face,s.Size,colors.text);
  const lines=[];for(const p of String(text).split('\n')){
    let line='';for(const word of p.split(/\s+/)){const next=line?line+' '+word:word;if(line&&bitmap.measureTextWidth(next)>width){lines.push(line);line=word;}else line=next;}lines.push(line);
  }
  Object.assign(bitmap,saved);
  const lineHeight=s.Line||s.Size+10;
  return {lines,width:Math.max(0,width),height:lines.length*lineHeight,lineHeight};
}
function drawCard(bitmap,rect,text='',context='paper'){
  staticSurface(bitmap,rect,context);
  const s=style('Helper'),layout=measure(bitmap,text,rect.width-config.Card.TextInset-config.Card.PaddingRight,'Helper');
  textStyle(bitmap,s.Face,s.Size,colors.text);
  layout.lines.forEach((line,i)=>bitmap.drawText(line,rect.x+config.Card.TextInset,rect.y+config.Card.PaddingY+i*s.Line,layout.width,s.Line));
  return layout.height+config.Card.PaddingY*2;
}
globalThis.CoretoDesignSystem=Object.freeze({version:'1.5.0',colors,fonts,config,style,measure,registerAdapter,
  drawButton,drawField,drawCard,drawIcon:menuIcon,
  drawItemBackground:typeof drawItemBackground==='function'?drawItemBackground:null,
  dispose(){for(const bitmap of tintedIcons.values())bitmap.destroy();tintedIcons.clear();}
});

})();
(() => {
  'use strict';
  const theme = CoretoDesignSystem;
  if (!theme) return;
  const adapters = {
    choiceFeedback: () => 'choice', choiceBadge: () => undefined,
    interfaceHidden: () => false, consumeInput: () => {},
    picturePresentation: () => null, pictureContext: () => null,
    pictureIndicator: () => null, pictureAction: () => null, pictureState: () => null
  };
  let legacyPictures = null;
  adapters.picturePresentation = (picture, sprite) => {
    const supplied = legacyPictures?.(picture, sprite);
    const role = supplied || theme.config.PictureRoles.find(item => item.Image === picture?.name());
    if (!role) return null;
    const kind = role.kind || role.Role;
    return { ...role, surface: role.surface !== false, kind,
      feedback: kind === 'primary' ? 'choice' : kind === 'secondary' ? 'secondary' : 'none',
      neutral: true };
  };
  theme.registerAdapter({pictures: () => null});
  function registerAdapter(adapter) {
    const {pictures, ...rest} = adapter;
    if (typeof pictures === 'function') legacyPictures = pictures;
    theme.registerAdapter(rest);
    for (const key of Object.keys(adapters)) if (typeof adapter[key] === 'function') adapters[key] = adapter[key];
  }
  // Consume the same press in the reading layer, even without a game adapter.
  let confirmationConsumed = false;
  const heldKeys = new Set();
  let primaryHeld = false;
  if (theme.config.Windows) {
    for (const [method, down] of [['_onKeyDown', true], ['_onKeyUp', false]]) {
      const previous = Input[method];
      Input[method] = function(event) {
        if (down) heldKeys.add(event.keyCode); else heldKeys.delete(event.keyCode);
        previous.call(this, event);
      };
    }
    for (const [method, down] of [['_onMouseDown', true], ['_onMouseUp', false]]) {
      const previous = TouchInput[method];
      TouchInput[method] = function(event) { if (event.button === 0) primaryHeld = down; previous.call(this, event); };
    }
    const lostFocus = Input._onLostFocus;
    Input._onLostFocus = function() { heldKeys.clear(); primaryHeld = false; lostFocus.call(this); };
    const updateInput = Input.update;
    Input.update = function() {
      if (confirmationConsumed && heldKeys.size === 0 && !primaryHeld) {
        confirmationConsumed = false; Input.clear(); TouchInput.clear();
      }
      updateInput.call(this);
    };
  }
  function consumeInput() { confirmationConsumed = true; Input.clear(); TouchInput.clear(); adapters.consumeInput(); }

  const tokens = Object.freeze({
    ink: theme.colors.text, focus: theme.colors.primary, muted: '#69543f',
    indicator: 24, gap: 6, line: 30, minimumTarget: 44,
    divider: '#360A0B', dividerOpacity: 0.3, novelty: '#F1B725',
    imageFocusScale: 1.1, bubbleDuration: 150
  });
  const skin = () => ImageManager.loadSystem(theme.config.PaperImage);
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hidden = () => !!(adapters.interfaceHidden() || SceneManager._scene?._messageWindow?.scale.x === 0);

  function divider(bitmap, x1, y1, x2, y2) {
    const ctx = bitmap.context; ctx.save();
    ctx.strokeStyle = tokens.divider; ctx.globalAlpha = tokens.dividerOpacity; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
    bitmap.baseTexture.update();
  }

  function tile(bitmap, source, sx, sy, sw, sh, x, y, width, height, tileWidth = sw, tileHeight = sh) {
    for (let dy = 0; dy < height; dy += tileHeight) for (let dx = 0; dx < width; dx += tileWidth) {
      const w = Math.min(tileWidth, width - dx), h = Math.min(tileHeight, height - dy);
      bitmap.blt(source, sx, sy, sw * w / tileWidth, sh * h / tileHeight, x + dx, y + dy, w, h);
    }
  }

  function paper(bitmap, x = 0, y = 0, width = bitmap.width, height = bitmap.height, frame = true) {
    const source = skin();
    if (!source.isReady()) return;
    if (!frame) { tile(bitmap, source, 24, 24, 48, 48, x, y, width, height); return; }
    const edge = Math.min(12, Math.floor(width / 2), Math.floor(height / 2));
    tile(bitmap, source, 24, 24, 48, 48, x + edge, y + edge, width - edge * 2, height - edge * 2);
    for (const [sx, sy, dx, dy] of [[96, 0, 0, 0], [192 - edge, 0, width - edge, 0],
      [96, 96 - edge, 0, height - edge], [192 - edge, 96 - edge, width - edge, height - edge]]) {
      bitmap.blt(source, sx, sy, edge, edge, x + dx, y + dy);
    }
    const strip = 96 - edge * 2, repeat = strip * 3;
    tile(bitmap, source, 96 + edge, 0, strip, edge, x + edge, y, width - edge * 2, edge, repeat, edge);
    tile(bitmap, source, 96 + edge, 96 - edge, strip, edge, x + edge, y + height - edge, width - edge * 2, edge, repeat, edge);
    tile(bitmap, source, 96, edge, edge, strip, x, y + edge, edge, height - edge * 2, edge, repeat);
    tile(bitmap, source, 192 - edge, edge, edge, strip, x + width - edge, y + edge, edge, height - edge * 2, edge, repeat);
  }

  function quill(bitmap, x, y, color = tokens.focus, size = tokens.indicator) {
    const ctx = bitmap.context;
    ctx.save(); ctx.translate(x, y); ctx.scale(size / 24, size / 24);
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(3, 22); ctx.quadraticCurveTo(9, 10, 21, 2);
    ctx.quadraticCurveTo(21, 13, 10, 17); ctx.lineTo(6, 18); ctx.fill();
    ctx.beginPath(); ctx.moveTo(2, 23); ctx.lineTo(19, 5); ctx.stroke();
    ctx.globalCompositeOperation = 'destination-out'; ctx.lineWidth = 1;
    for (const [a, b, c, d] of [[10, 11, 16, 9], [8, 14, 14, 13], [13, 8, 13, 5]]) {
      ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke();
    }
    ctx.restore(); bitmap.baseTexture.update();
  }

  function check(bitmap, x, y, color = tokens.focus) {
    const ctx = bitmap.context; ctx.save(); ctx.translate(x, y); ctx.fillStyle = color;
    // Broken wax disk with two unequal drips; the negative ring survives at 24px.
    ctx.beginPath(); ctx.moveTo(11, 1);
    ctx.bezierCurveTo(14, 0, 15, 2, 18, 2); ctx.lineTo(18, 4);
    ctx.bezierCurveTo(22, 4, 21, 7, 22, 9); ctx.lineTo(20, 11);
    ctx.lineTo(23, 13); ctx.lineTo(20, 14);
    ctx.bezierCurveTo(19, 16, 19, 17, 18, 18);
    ctx.lineTo(18, 21); ctx.quadraticCurveTo(17, 24, 16, 21); ctx.lineTo(15, 18);
    ctx.quadraticCurveTo(12, 20, 10, 18);
    ctx.lineTo(9, 22); ctx.bezierCurveTo(9, 25, 5, 24, 6, 21); ctx.lineTo(6, 17);
    ctx.lineTo(3, 16); ctx.lineTo(4, 14); ctx.lineTo(2, 12);
    ctx.bezierCurveTo(3, 9, 1, 7, 4, 5); ctx.lineTo(5, 3); ctx.lineTo(8, 3); ctx.closePath();
    ctx.moveTo(6, 12); ctx.bezierCurveTo(4, 6, 10, 3, 15, 6);
    ctx.bezierCurveTo(10, 5, 7, 8, 6, 12); ctx.closePath();
    ctx.moveTo(17, 8); ctx.bezierCurveTo(21, 14, 14, 19, 9, 15);
    ctx.bezierCurveTo(14, 17, 18, 13, 17, 8); ctx.closePath();
    ctx.fill('evenodd'); ctx.restore(); bitmap.baseTexture.update();
  }

  function brush(bitmap, left, top, right, bottom) {
    const ctx = bitmap.context, height = bottom - top, width = right - left;
    ctx.save(); ctx.globalCompositeOperation = 'destination-over'; ctx.fillStyle = theme.colors.canvas;
    ctx.translate(left, top); ctx.beginPath();
    ctx.moveTo(0, height * 0.64);
    ctx.quadraticCurveTo(6, height * 0.46, 12, 3);
    ctx.bezierCurveTo(width * 0.25, -1, width * 0.35, 3, width * 0.5, 2);
    ctx.quadraticCurveTo(width * 0.8, 0, width - 12, 2);
    ctx.quadraticCurveTo(width - 5, 4, width - 2, height * 0.33);
    ctx.lineTo(width - 8, height * 0.38); ctx.lineTo(width, height * 0.4);
    ctx.quadraticCurveTo(width - 6, height * 0.56, width - 10, height - 4);
    ctx.lineTo(width - 4, height * 0.76);
    ctx.quadraticCurveTo(width - 9, height, width - 18, height - 1);
    ctx.bezierCurveTo(width * 0.65, height + 1, width * 0.4, height - 3, 12, height - 1);
    ctx.quadraticCurveTo(5, height - 1, 2, height * 0.82);
    ctx.lineTo(8, height * 0.68); ctx.lineTo(1, height * 0.73);
    ctx.closePath(); ctx.fill(); ctx.restore(); bitmap.baseTexture.update();
  }

  function style(bitmap, role = 'Action', color = tokens.ink) {
    const font = theme.style(role);
    bitmap.fontFace = font.Face; bitmap.fontSize = font.Size;
    bitmap.fontBold = false; bitmap.fontItalic = false; bitmap.outlineWidth = 0;
    bitmap.textColor = color; bitmap.paintOpacity = 255;
  }

  function wrapText(bitmap, text, width) {
    const lines = [];
    for (const paragraph of text.split(/\n|<BR>|<LINEBREAK>/i)) {
      let line = '';
      for (const word of paragraph.split(/\s+/)) {
        const next = line ? line + ' ' + word : word;
        if (line && bitmap.measureTextWidth(next) > width) { lines.push(line); line = word; }
        else line = next;
      }
      lines.push(line);
    }
    return lines;
  }

  function underline(bitmap, run, color) {
    const ctx = bitmap.context;
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2;
    const baseline = run.y + run.height / 2 + run.size * 0.35;
    const y = Math.ceil(baseline + Math.max(3, run.descent + 2));
    ctx.beginPath(); ctx.moveTo(run.x, y); ctx.lineTo(run.x + run.width, y); ctx.stroke();
    ctx.restore(); bitmap.baseTexture.update();
  }

  function control(window, rect, state, draw) {
    const bitmap = window.contents, previous = bitmap._coretoInkControl;
    const current = { runs: [], seals: [], feedback: 'none', ...state };
    bitmap._coretoInkControl = current;
    try { draw(); } finally { bitmap._coretoInkControl = previous; }
    if (!current.runs.length) return;
    const color = state.enabled === false ? tokens.muted : state.focused ? tokens.focus : tokens.ink;
    const first = current.runs[0];
    if (state.checked) {
      const x = Math.max(rect.x, first.x - tokens.indicator - tokens.gap);
      check(bitmap, x, first.y + (first.height - 24) / 2);
      current.seals.push({x, width:tokens.indicator});
    }
    if (state.focused && state.enabled !== false && ['choice', 'secondary'].includes(current.feedback)) {
      current.runs.forEach(run => underline(bitmap, run, color));
      const last = current.runs[current.runs.length - 1];
      if (current.feedback === 'choice') quill(bitmap, last.x + last.width + tokens.gap, last.y + (last.height - tokens.indicator) / 2, color);
    }
    if (state.support) {
      const marks = [...current.runs, ...current.seals];
      const left = Math.min(...marks.map(run => run.x)) - 12;
      const right = Math.max(...marks.map(run => run.x + run.width)) + 12;
      const top = Math.min(...current.runs.map(run => run.y + run.height / 2 - run.size * 0.65)) - 6;
      const bottom = Math.max(...current.runs.map(run => run.y + run.height / 2 + run.size * 0.5)) + 6;
      brush(bitmap, left, top, right, bottom);
    }
  }

  const measureTextWidth = Bitmap.prototype.measureTextWidth;
  const drawOutline = Bitmap.prototype._drawTextOutline;
  Bitmap.prototype._drawTextOutline = function() {
    // Canvas ignores lineWidth=0; skipping the stroke is what removes the outline.
    if (this.outlineWidth <= 0) return;
    return drawOutline.apply(this, arguments);
  };
  Bitmap.prototype.measureTextWidth = function(text) {
    const parts = String(text).split('✓');
    return parts.length === 1 ? measureTextWidth.apply(this, arguments) :
      parts.reduce((width, part) => width + measureTextWidth.call(this, part), (parts.length - 1) * tokens.indicator);
  };
  const drawText = Bitmap.prototype.drawText;
  Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    const state = this._coretoInkControl;
    if (!state || !String(text).trim()) return drawText.apply(this, arguments);
    if (String(text).includes('✓')) {
      const parts = String(text).split('✓'), width = this.measureTextWidth(text);
      let left = align === 'center' ? x + (maxWidth - width) / 2 : align === 'right' ? x + maxWidth - width : x;
      parts.forEach((part, index) => {
        const span = this.measureTextWidth(part);
        if (part) this.drawText(part, left, y, span, lineHeight, 'left');
        left += span;
        if (index === parts.length - 1) return;
        check(this, left, y + (lineHeight - tokens.indicator) / 2);
        state.seals.push({ x: left, width: tokens.indicator }); left += tokens.indicator;
      });
      return;
    }
    if (state.badge === String(text)) {
      const saved = { fontFace: this.fontFace, fontBold: this.fontBold, outlineWidth: this.outlineWidth, textColor: this.textColor };
      this.fontFace = theme.style('Label').Face; this.fontBold = false; this.outlineWidth = 0;
      this.textColor = tokens.ink;
      const badge = String(text).toLocaleUpperCase(), dotSpace = 14;
      const width = this.measureTextWidth(badge);
      const left = align === 'right' ? x + maxWidth - width - dotSpace : align === 'center' ? x + (maxWidth - width - dotSpace) / 2 : x;
      drawText.call(this, badge, left, y, width, lineHeight, 'left');
      this.drawCircle(left + width + 8, y + lineHeight / 2 - this.fontSize * 0.35, 3, tokens.novelty);
      Object.assign(this, saved); return;
    }
    this.textColor = state.enabled === false ? tokens.muted : state.focused && state.feedback !== 'none' ? tokens.focus : tokens.ink;
    this.outlineWidth = 0;
    const ctx = this.context; ctx.save(); ctx.font = this._makeFontNameText();
    const metrics = ctx.measureText(TextManager.parseLocalizedText(String(text))); ctx.restore();
    const width = Math.min(metrics.width, maxWidth || metrics.width);
    const left = align === 'center' ? x + (maxWidth - width) / 2 : align === 'right' ? x + maxWidth - width : x;
    const result = drawText.apply(this, arguments);
    state.runs.push({ x: left, y, width, height: lineHeight, size: this.fontSize,
      descent: metrics.actualBoundingBoxDescent || this.fontSize * 0.2 });
    return result;
  };

  function label(window, text, rect, state = {}, role = 'Action', align = 'left') {
    text = TextManager.parseLocalizedText(text);
    const b = window.contents; style(b, role);
    const inset = tokens.indicator + tokens.gap;
    const width = Math.max(1, rect.width - inset * 2);
    const lines = wrapText(b, text, width), line = Math.max(tokens.line, b.fontSize + 10);
    control(window, rect, state, () => lines.forEach((value, i) =>
      b.drawText(value, rect.x + inset, rect.y + (rect.height - lines.length * line) / 2 + i * line, width, line, align)));
  }

  if (theme.config.Windows) {
  const createOptions = Scene_Options.prototype.create;
  Scene_Options.prototype.create = function() {
    createOptions.apply(this, arguments);
    this._coretoOptionsPaper = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this.addChildAt(this._coretoOptionsPaper, this.getChildIndex(this._windowLayer));
    for (const control of this._windowLayer.children) if (control.y < 16) control.y = 18;
  };
  const updateOptions = Scene_Options.prototype.update;
  Scene_Options.prototype.update = function() {
    updateOptions.apply(this, arguments);
    const panel = this._coretoOptionsPaper;
    if (!panel) return;
    const windows = this._windowLayer.children.filter(w => w instanceof Window_Base && w.visible);
    const signature = JSON.stringify([skin().isReady(), windows.map(w => [w.x,w.y,w.width,w.height])]);
    if (signature === this._coretoOptionsPaperSignature) return;
    this._coretoOptionsPaperSignature = signature; panel.bitmap.clear();
    paper(panel.bitmap, 12, 6, Graphics.boxWidth - 24, Graphics.boxHeight - 18);
    const category = windows.find(w => globalThis.Window_OptionsCategory && w instanceof Window_OptionsCategory);
    if (category) {
      divider(panel.bitmap, 40, category.y, Graphics.boxWidth - 40, category.y);
      divider(panel.bitmap, 40, category.y + category.height + 6, Graphics.boxWidth - 40, category.y + category.height + 6);
    }
  };
  const terminateOptions = Scene_Options.prototype.terminate;
  Scene_Options.prototype.terminate = function() {
    this._coretoOptionsPaper?.bitmap.destroy();
    return terminateOptions.apply(this, arguments);
  };
  const windowSurface = w => w instanceof Window_Base && !(w instanceof Window_ScrollText) &&
    !(w instanceof Window_MapName) && !(w instanceof Window_NameBox) &&
    !(globalThis.Window_ButtonConsole && w instanceof Window_ButtonConsole) && !w._coretoPictureText &&
    (w.constructor.name !== 'Window_ButtonAssist' || SceneManager._scene instanceof Scene_MenuBase);
  for (const method of ['_refreshBack', '_refreshFrame']) {
    const previous = Window.prototype[method];
    Window.prototype[method] = function() {
      if (!windowSurface(this)) return previous.apply(this, arguments);
      const sprite = method === '_refreshBack' ? this._backSprite : this._frameSprite;
      const key = method === '_refreshBack' ? '_coretoInkPaperBack' : '_coretoInkPaperFrame';
      this[key]?.destroy();
      const bitmap = this[key] = new Bitmap(Math.max(1, this.width), Math.max(1, this.height));
      if (method === '_refreshBack' && !(SceneManager._scene instanceof Scene_Options)) {
        skin().addLoadListener(() => { if (this[key] === bitmap && !this._destroyed) paper(bitmap); });
      }
      sprite.bitmap = bitmap; sprite.setFrame(0, 0, this.width, this.height);
      sprite.move(0, 0); sprite.scale.set(1); sprite.setColorTone([0, 0, 0, 0]);
      for (const child of sprite.children) { child.bitmap = null; child.visible = false; }
    };
  }
  const destroyWindow = Window_Base.prototype.destroy;
  Window_Base.prototype.destroy = function() {
    const bitmaps = [this._coretoInkPaperBack, this._coretoInkPaperFrame];
    const result = destroyWindow.apply(this, arguments);
    bitmaps.forEach(bitmap => bitmap?.destroy()); return result;
  };

  const background = Window_Selectable.prototype.drawItemBackground;
  Window_Selectable.prototype.drawItemBackground = function(index) {
    if (!windowSurface(this)) return background.apply(this, arguments);
    const r = this.itemRect(index); this.contentsBack.clearRect(r.x, r.y, r.width, r.height);
  };
  const drawChoice = Window_ChoiceList.prototype.drawItem;
  Window_ChoiceList.prototype.drawItem = function(index) {
    if (this._pictureChoicesHidden) return drawChoice.apply(this, arguments);
    const rect = this.itemRect(index);
    const name = this.commandName(index);
    const feedback = adapters.choiceFeedback(this, index, name);
    return control(this, rect, { feedback, enabled: this.isCommandEnabled(index), focused: this.active && index === this.index(), badge: adapters.choiceBadge(this, index) },
      () => drawChoice.call(this, index));
  };
  const commandName = Window_ChoiceList.prototype.commandName;
  Window_ChoiceList.prototype.commandName = function(index) {
    const name = commandName.call(this, index);
    return SceneManager.isSceneTitleMap?.() ? name.replace(/\\FontChange<[^>]+>/gi, '\\FontChange<' + theme.style('Speaker').Face + '>') : name;
  };
  const choiceRect = Window_ChoiceList.prototype.itemRectWithPadding;
  Window_ChoiceList.prototype.itemRectWithPadding = function(index) {
    const rect = choiceRect.call(this, index); rect.width = Math.max(1, rect.width - tokens.indicator - tokens.gap); return rect;
  };
  const choiceWidth = Window_ChoiceList.prototype.maxChoiceWidth;
  Window_ChoiceList.prototype.maxChoiceWidth = function() { return Math.min(Graphics.boxWidth - 64, choiceWidth.call(this) + tokens.indicator + tokens.gap); };
  for (const prototype of [Window_Command.prototype, globalThis.Window_OptionsCategory?.prototype].filter(Boolean)) {
    const draw = prototype.drawItem;
    prototype.drawItem = function(index) {
      if (this instanceof Window_ChoiceList || this instanceof Window_Options) return draw.apply(this, arguments);
      const rect = this.itemLineRect(index);
      const name = this.convertEscapeCharacters(this.commandName(index)).replace(/\x1bI\[\d+\]/g, '');
      const category = !!globalThis.Window_OptionsCategory && this instanceof Window_OptionsCategory;
      label(this, name, rect, { feedback: this instanceof Window_TitleCommand ? 'choice' : 'secondary', enabled: this.isCommandEnabled(index),
        focused: this.active && this.index() === index && (!category || !SceneManager._scene._optionsWindow?.active) }, 'Menu', this.itemTextAlign());
      if (this.maxCols() > 1 && index % this.maxCols() > 0) {
        const item = this.itemRect(index);
        divider(this.contents, item.x - this.colSpacing() / 2, item.y + 12, item.x - this.colSpacing() / 2, item.y + item.height - 12);
      }
    };
  }

  const loadButton = Sprite_Button.prototype.loadButtonImage;
  Sprite_Button.prototype.loadButtonImage = function() {
    if (this._buttonType !== 'cancel') return loadButton.apply(this, arguments);
    const bitmap = this._coretoOwnedButtonBitmap = new Bitmap(528, 144);
    this._coretoMenuButton = true; this.bitmap = bitmap;
    const ctx = bitmap.context;
    const scale = reducedMotion() ? 1 : 1.05;
    this._coretoInkIconScale = scale;
    for (let i = 0; i < 3; i++) {
      ctx.save(); ctx.translate(34, i * 48 + 12); ctx.strokeStyle = i ? tokens.focus : tokens.ink;
      if (i) { ctx.translate(14, 10); ctx.scale(scale, scale); ctx.translate(-14, -10); }
      ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(0, 10); ctx.lineTo(10, 20);
      ctx.moveTo(0, 10); ctx.lineTo(20, 10); ctx.quadraticCurveTo(28, 10, 28, 20); ctx.stroke(); ctx.restore();
    }
    bitmap.baseTexture.update();
  };
  const updateButton = Sprite_Button.prototype.update;
  Sprite_Button.prototype.update = function() {
    if (this._buttonType === 'cancel' && this._coretoInkIconScale !== (reducedMotion() ? 1 : 1.05)) {
      this._coretoOwnedButtonBitmap?.destroy(); this.loadButtonImage();
    }
    updateButton.call(this);
  };

  }

  function drawOption(symbol, index) {
    const r = this.itemRect(index), focused = this.active && this.index() === index;
    const name = this.convertEscapeCharacters(this.commandName(index)).replace(/\x1bI\[\d+\]/g, '');
    const row = { ...r, width: r.width * 0.48 };
    label(this, name, row, { feedback: 'secondary', focused, checked: symbol === 'textEffects' && this.getConfigValue(symbol) }, 'Menu');
    const value = { x: r.x + r.width * 0.5, y: r.y, width: r.width * 0.5, height: r.height };
    if (symbol === 'textLocale') {
      const languages = VisuMZ.MessageCore.Settings.Localization.Languages;
      languages.forEach((language, i) => label(this, TextManager.getLanguageName(language),
        { ...value, x: value.x + i * value.width / languages.length, width: value.width / languages.length },
        { checked: language === ConfigManager.textLocale }, 'Action', 'center'));
      for (let i = 1; i < languages.length; i++) divider(this.contents, value.x + i * value.width / languages.length, value.y + 12,
        value.x + i * value.width / languages.length, value.y + value.height - 12);
    } else if (symbol !== 'textEffects') {
      style(this.contents); this.contents.drawText(this.getConfigValue(symbol) + '%', value.x + 30, value.y, value.width - 60, value.height, 'right');
    }
  }

  function drawSaveFile(id, rect) {
    label(this, id === 0 ? TextManager.autosave : TextManager.file + ' ' + id,
      { ...rect, height: 48 }, { feedback: 'choice', enabled: this.isEnabled(id), focused: this.active && this.index() === this.savefileIdToIndex(id) }, 'Speaker');
    if (id > 0 && id === DataManager.latestSavefileId()) {
      style(this.contents, 'Label');
      this.contents.drawText(TextManager.parseLocalizedText(TextManager.latestSave), rect.x + rect.width - 110, rect.y + 48, 90, 28, 'right');
    }
  }

  function drawSaveContents(info, rect) {
    const x = rect.x + 24, width = rect.width - 48, previewHeight = Math.max(0, rect.height - 170);
    const actors = info.faces?.length || info.characters?.length || info.svbattlers?.length;
    const artWidth = info.description ? Math.min(96, width * 0.35) : width;
    if (info.picture) this.drawCenteredPicture(info.picture, x, rect.y + 80, artWidth, previewHeight, true);
    if (actors) this.drawActors(info, x, rect.y + 80, artWidth, previewHeight);
    style(this.contents, 'Helper');
    const time = info.timestamp ? new Date(info.timestamp).toLocaleString(ConfigManager.textLocale === 'Portuguese' ? 'pt-BR' : 'en-US',
      { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
    this.contents.drawText(time, x, rect.y + rect.height - 82, width, 28);
    this.contents.drawText(info.playtime || '', x, rect.y + rect.height - 48, width, 28);
    if (info.description) {
      const dx = info.picture || actors ? artWidth + 12 : 0, wrap = this._wordWrap;
      const ctx = this.contents.context; ctx.save(); ctx.beginPath(); ctx.rect(x + dx, rect.y + 80, width - dx, previewHeight); ctx.clip();
      this.setWordWrap(true);
      try { this.drawTextEx(info.description, x + dx, rect.y + 80, width - dx); }
      finally { this.setWordWrap(wrap); ctx.restore(); }
    }
  }

  if (theme.config.Windows && globalThis.Window_ButtonConsole) {
  const enabled = button => button.textColorID() !== Window_ButtonConsole.TEXT_COLOR_DISABLED;
  const toggled = button => button._type === 'auto' ? $gameTemp.isMessageAutoForwardMode() :
    button._type === 'fastfwd' && SceneManager._scene?.isActivatedExtendedFastForwardMode?.();
  Window_ButtonConsole.prototype.refresh = function() {
    this.createContents(); this.opacity = 0;
    if (!this._type) return;
    label(this, TextManager.msgButtonConsole(this._type), new Rectangle(0, 0, this.innerWidth, this.innerHeight),
      { feedback: 'secondary', enabled: enabled(this), focused: !!this._coretoInkFocused, checked: !!toggled(this) }, 'Action', 'center');
    const buttons = SceneManager._scene?._messageWindow?._buttonConsoleButtons || [];
    if (buttons.indexOf(this) > 0) divider(this.contents, 0.5, 6, 0.5, this.innerHeight - 6);
  };
  const touchEnabled = Window_ButtonConsole.prototype.isTouchScrollEnabled;
  Window_ButtonConsole.prototype.isTouchScrollEnabled = function() { return !hidden() && enabled(this) && touchEnabled.call(this); };
  const activateConsole = Window_ButtonConsole.prototype.onTouchScrollStart;
  Window_ButtonConsole.prototype.onTouchScrollStart = function() {
    if (hidden() || !enabled(this)) return;
    activateConsole.call(this);
    consumeInput();
    TouchInput.clear();
  };
  const updateConsole = Window_ButtonConsole.prototype.update;
  Window_ButtonConsole.prototype.update = function() {
    updateConsole.call(this);
    const signature = [enabled(this), toggled(this), this._coretoInkFocused, ConfigManager.textLocale].join('|');
    if (signature !== this._coretoInkInkSignature) { this._coretoInkInkSignature = signature; this.refresh(); }
  };

  const messageTriggered = Window_Message.prototype.isTriggered;
  Window_Message.prototype.isTriggered = function() {
    if (confirmationConsumed || (this._coretoInkConsoleSelection && !hidden() && Input.isPressed('ok'))) return false;
    return messageTriggered.apply(this, arguments);
  };
  const updateMessage = Window_Message.prototype.update;
  Window_Message.prototype.update = function() {
    const buttons = (this._buttonConsoleButtons || []).filter(button => button.visible && button.openness === 255);
    const available = this.pause && this.isOpen() && !hidden() && !$gameMessage.isChoice() && !SceneManager._scene.isBusy();
    if (!available) this._coretoInkConsoleSelection = null;
    if (TouchInput.isMoved() || TouchInput.isHovered()) {
      this._coretoInkConsoleSelection = null;
      this._coretoInkConsolePointer = buttons.find(button => button.getBounds().contains(TouchInput.x, TouchInput.y)) || null;
    }
    if (available && (Input.isRepeated('left') || Input.isRepeated('right'))) {
      const eligible = buttons.filter(enabled), direction = Input.isRepeated('right') ? 1 : -1;
      const index = eligible.indexOf(this._coretoInkConsoleSelection || this._coretoInkConsolePointer);
      this._coretoInkConsoleSelection = eligible[(index < 0 ? (direction > 0 ? 0 : eligible.length - 1) : (index + direction + eligible.length) % eligible.length)] || null;
      this._coretoInkConsolePointer = null;
    }
    const selected = this._coretoInkConsoleSelection;
    if (available && selected && Input.isTriggered('cancel')) {
      this._coretoInkConsoleSelection = null;
      consumeInput();
    } else if (available && selected && Input.isTriggered('ok')) selected.onTouchScrollStart();
    for (const button of this._buttonConsoleButtons || []) button._coretoInkFocused = !hidden() && enabled(button) &&
      button === (this._coretoInkConsoleSelection || this._coretoInkConsolePointer);
    updateMessage.apply(this, arguments);
  };

  let hintShown = false;
  const setVisibility = Window_Message.prototype.setVisibility;
  Window_Message.prototype.setVisibility = function() {
    const wasHidden = hidden(), result = setVisibility.apply(this, arguments);
    if (!wasHidden && hidden() && !hintShown) {
      hintShown = true;
      const scene = SceneManager._scene;
      const hint = new Sprite(new Bitmap(Graphics.boxWidth, 56));
      paper(hint.bitmap, 160, 0, Graphics.boxWidth - 320, 56);
      style(hint.bitmap, 'Helper');
      hint.bitmap.drawText(TextManager.getLocalizedText('coreto.ui.restore_hint'), 184, 0, Graphics.boxWidth - 368, 56, 'center');
      hint.y = 12; scene.addChild(hint); scene._coretoInkRestoreHint = hint;
      scene._coretoInkRestoreHintFrames = 300;
    }
    return result;
  };
  const sceneUpdate = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    sceneUpdate.apply(this, arguments);
    if (this._coretoInkRestoreHint && (!hidden() || --this._coretoInkRestoreHintFrames <= 0)) {
      this._coretoInkRestoreHint.bitmap.destroy(); this._coretoInkRestoreHint.destroy(); this._coretoInkRestoreHint = null;
    }
  };

  }

  const ink = Object.freeze({ tokens, paper, quill, check, style, wrapText, control, label, divider, hidden, reducedMotion,
    drawOption, drawSaveFile, drawSaveContents, adapters });
  function drawButton(bitmap, rect, text, state='default', kind='menu', focused=false) {
    label({contents:bitmap}, text, rect, {enabled:state!=='disabled',
      focused:focused || ['hover','selectedHover','pressed','selected'].includes(state),
      feedback:['menu','choice','primary'].includes(kind)?'choice':'secondary'},kind==='menu'?'Menu':'Action');
  }
  function drawItemBackground(index) {
    if (!theme.config.Windows) return false;
    const rect = this.itemRect(index);
    this.contentsBack.clearRect(rect.x,rect.y,rect.width,rect.height); return true;
  }
  function layoutFooter(rect) {
    return ['left','center','right'].map((align,index)=>({x:rect.x+index*rect.width/3,y:rect.y,width:rect.width/3,height:rect.height,align}));
  }
  function drawCard(bitmap,rect,text='',context='paper') {
    paper(bitmap,rect.x,rect.y,rect.width,rect.height);
    label({contents:bitmap},text,{x:rect.x+12,y:rect.y+12,width:rect.width-24,height:rect.height-24},{},'Helper');
    return theme.measure(bitmap,text,rect.width-84,'Helper').height+24;
  }
  globalThis.CoretoDesignSystem = Object.freeze({ ...theme, registerAdapter, ink, drawButton, drawCard, drawItemBackground, layoutFooter,
    drawParchment: paper, drawBrush: brush, drawQuill: quill, drawSeal: check, drawDivider: divider,
    drawControl: control, drawLabel: label, drawOption, drawSaveFile, drawSaveContents });
})();

(() => {
  'use strict';
  const ui = globalThis.CoretoDesignSystem?.ink;
  if (!ui || !globalThis.Sprite_Picture) return;
  const presentation = sprite => ui.adapters.picturePresentation(sprite?.picture?.(), sprite) || {};
  const indicator = sprite => ui.adapters.pictureIndicator(sprite);
  const surface = sprite => !!presentation(sprite).surface;
  const kindOf = sprite => presentation(sprite).kind;
  const loadBitmap = Sprite_Picture.prototype.loadBitmap;
  Sprite_Picture.prototype.loadBitmap = function() {
    const old = this._coretoInkSurfaceBitmap;
    if (old) { this.bitmap = null; old.destroy(); this._coretoInkSurfaceBitmap = null; }
    const result = loadBitmap.apply(this, arguments);
    if (!surface(this)) return result;
    const name = this._pictureName, source = this.bitmap;
    source.addLoadListener(() => {
      if (this._pictureName !== name || this._destroyed) return;
      const role = presentation(this);
      const width = role.width || source.width, height = role.height || source.height;
      const bitmap = new Bitmap(width, height);
      this._coretoInkSurfaceBitmap = bitmap; this.bitmap = bitmap;
      if (role.image) {
        const art = ImageManager.loadPicture(role.image);
        art.addLoadListener(() => {
          if (this._coretoInkSurfaceBitmap !== bitmap) return;
          const scale = Math.min((width - 48) / art.width, (height - 112) / art.height);
          bitmap.blt(art, 0, 0, art.width, art.height, (width - art.width * scale) / 2, 12, art.width * scale, art.height * scale);
        });
      }
    });
    return result;
  };
  const destroy = Sprite_Picture.prototype.destroy;
  Sprite_Picture.prototype.destroy = function() {
    const bitmap = this._coretoInkSurfaceBitmap; this._coretoInkSurfaceBitmap = null;
    if (bitmap) this.bitmap = null;
    const result = destroy.apply(this, arguments); bitmap?.destroy(); return result;
  };

  function binding(sprite) {
    const action = ui.adapters.pictureAction(sprite);
    if (Number.isInteger(action)) return action;
    const linked = presentation(sprite).interactionPictureId;
    if (linked) return $gameScreen.getPictureChoiceBinding(linked);
    if (sprite._coretoInkActionOwner) return binding(sprite._coretoInkActionOwner);
    for (let current = sprite; current; current = current.parent) {
      if (!current._pictureId) continue;
      const index = $gameScreen.getPictureChoiceBinding(current._pictureId);
      if (index >= 0) return index;
    }
    return -1;
  }
  function state(sprite) {
    const choices = SceneManager._scene?._choiceListWindow, index = binding(sprite);
    const bound = index >= 0 && !!choices?._list?.[index];
    const supplied = ui.adapters.pictureState(sprite, presentation(sprite)) || {};
    return { enabled: supplied.enabled ?? (supplied.disabled === undefined ? !bound || choices.isCommandEnabled(index) : !supplied.disabled),
      focused: !ui.hidden() && (supplied.focused ?? supplied.selected ?? (bound && choices.isOpenAndActive() && choices.index() === index)) };
  }
  const feedback = sprite => kindOf(sprite) === 'approach' ||
    (ui.adapters.pictureContext(SceneManager._scene) === 'sacrifice' && kindOf(sprite) === 'card') ? 'none' : presentation(sprite).feedback || 'none';
  const hitTest = Sprite_Picture.prototype.hitTest;
  const isBeingTouched = Sprite_Picture.prototype.isBeingTouched;
  Sprite_Picture.prototype.isBeingTouched = function() {
    const scene = SceneManager._scene;
    if (!ui.hidden() && scene?._choiceListWindow?.isOpenAndActive() && binding(this) >= 0) {
      const point = new Point(TouchInput.x, TouchInput.y);
      const owner = collect(scene._spriteset._pictureContainer).find(sprite => {
        const bubble = indicator(sprite);
        if (!bubble?.worldVisible || !state(sprite).enabled) return false;
        const local = sprite.worldTransform.applyInverse(point);
        return new Rectangle(bubble.x - 22, bubble.y - 22, 44, 44).contains(local.x, local.y);
      });
      if (owner) return this === owner;
    }
    return isBeingTouched.apply(this, arguments);
  };
  Sprite_Picture.prototype.hitTest = function(x, y) {
    // Game_Picture can already name the next asset before Sprite_Picture loads it.
    if (surface(this) && (!this.bitmap?.isReady() || this._pictureName !== this.picture()?.name())) return false;
    if (!surface(this) || binding(this) < 0) return hitTest.call(this, x, y);
    if (ui.hidden() || !state(this).enabled) return false;
    const bubble = indicator(this);
    if (bubble?.visible && SceneManager._scene._choiceListWindow?.isOpenAndActive() &&
      new Rectangle(bubble.x - 22, bubble.y - 22, 44, 44).contains(x, y)) return true;
    const width = this.bitmap.width, height = this.bitmap.height;
    const extraX = Math.max(0, ui.tokens.minimumTarget / Math.abs(this.worldTransform.a) - width) / 2;
    const extraY = Math.max(0, ui.tokens.minimumTarget / Math.abs(this.worldTransform.d) - height) / 2;
    return new Rectangle(-this.anchor.x * width - extraX, -this.anchor.y * height - extraY,
      width + extraX * 2, height + extraY * 2).contains(x, y);
  };
  const zones = ['upperleft', 'up', 'upperright', 'left', 'center', 'right', 'lowerleft', 'down', 'lowerright'];
  const pictureText = Sprite_Picture.prototype.drawPictureText;
  Sprite_Picture.prototype.drawPictureText = function() {
    if (!surface(this) || !this.anyPictureTextChanges()) return pictureText.apply(this, arguments);
    this._pictureTextWindow.createContents();
    const window = this._pictureTextWindow;
    const kind = feedback(this);
    ui.control(window, new Rectangle(0, 0, window.innerWidth, window.innerHeight),
      { ...state(this), feedback: kind, support: !!presentation(this).support },
      () => zones.forEach(zone => this.drawPictureTextZone(zone)));
    $gameScreen.clearPictureTextRefresh(this._pictureId);
  };
  const pictureZone = Sprite_Picture.prototype.drawPictureTextZone;
  Sprite_Picture.prototype.drawPictureTextZone = function(zone) {
    if (!surface(this)) return pictureZone.apply(this, arguments);
    let text = $gameScreen.getPictureText(this._pictureId, zone);
    const window = this._pictureTextWindow;
    this._pictureTextCache[zone] = text;
    if (!text || kindOf(this) === 'approach') return;
    if (kindOf(this) === 'heading' && ui.adapters.pictureContext(SceneManager._scene) === 'approaches') return;
    const kind = feedback(this), inset = kind === 'choice' ? 30 : 12;
    const width = Math.max(1, window.innerWidth - inset * 2), size = window.textSizeEx(text);
    const column = zones.indexOf(zone) % 3, row = Math.floor(zones.indexOf(zone) / 3);
    const x = column === 1 ? Math.max(inset, (window.innerWidth - size.width) / 2) : column === 2 ? window.innerWidth - size.width - inset : inset;
    const y = row === 1 ? (window.innerHeight - size.height) / 2 : row === 2 ? window.innerHeight - size.height - 8 : 8;
    const ctx = window.contents.context;
    ctx.save();
    if (kind === 'icon' && state(this).focused && state(this).enabled && !ui.reducedMotion()) {
      ctx.translate(x + size.width / 2, y + size.height / 2);
      ctx.scale(1.05, 1.05); ctx.translate(-x - size.width / 2, -y - size.height / 2);
    }
    window.drawTextEx(text, x, y, width);
    ctx.restore();
  };
  const update = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    update.apply(this, arguments);
    if (!surface(this) || !this.bitmap?.isReady()) return;
    const current = state(this), signature = JSON.stringify([current, ui.adapters.pictureContext(SceneManager._scene), ConfigManager.textLocale, ui.reducedMotion()]);
    const bubble = indicator(this);
    if (bubble) {
      bubble.anchor.set(0.5, 0.5); bubble.y = -this.bitmap.height * this.anchor.y - 20;
      const target = bubble.visible && current.enabled && current.focused && !ui.reducedMotion() ? 1.05 : 1;
      const now = performance.now();
      if (this._coretoInkBubbleTween?.target !== target) {
        this._coretoInkBubbleTween = { from: bubble.scale.x, target, start: now };
      }
      const tween = this._coretoInkBubbleTween, progress = Math.min(1, (now - tween.start) / ui.tokens.bubbleDuration);
      bubble.scale.set(ui.reducedMotion() ? 1 : tween.from + (target - tween.from) * (1 - (1 - progress) ** 2));
      bubble.setBlendColor([85, 32, 112, current.focused && current.enabled && ui.reducedMotion() ? 64 : 0]);
    }
    this.setColorTone([0, 0, 0, 0]);
    if (signature !== this._coretoInkInkState && this._pictureTextWindow) {
      this._coretoInkInkState = signature;
      $gameScreen.requestPictureTextRefresh(this._pictureId);
      this.drawPictureText(); this.attachPictureText();
    }
  };
  const applySettings = Game_Picture.prototype.applyPictureChoiceSettings;
  Game_Picture.prototype.applyPictureChoiceSettings = function(settings, instant) {
    if (!ui.adapters.picturePresentation(this)?.neutral) return applySettings.call(this, settings, instant);
    const neutral = { ...settings };
    for (const key of ['TargetScaleX', 'TargetScaleY']) neutral[key] = 'Unchanged';
    for (const key of ['TargetToneRed', 'TargetToneGreen', 'TargetToneBlue', 'TargetToneGray']) neutral[key] = '0';
    return applySettings.call(this, neutral, instant);
  };

  const plain = (choices, raw) => choices.convertEscapeCharacters(raw)
    .replace(/\x1b[A-Za-z]+(?:\[[^\]]*\]|<[^>]*>)/g, '').replace(/<[^>]*>/g, '').trim();
  function pictureRect(sprite, container) {
    sprite.getBounds();
    const width = sprite.bitmap.width, height = sprite.bitmap.height;
    const origin = sprite.worldTransform.apply(new Point(-sprite.anchor.x * width, -sprite.anchor.y * height));
    const end = sprite.worldTransform.apply(new Point((1 - sprite.anchor.x) * width, (1 - sprite.anchor.y) * height));
    const point = container.worldTransform.applyInverse(origin), corner = container.worldTransform.applyInverse(end);
    return new Rectangle(point.x, point.y, corner.x - point.x, corner.y - point.y);
  }

  const alphaBounds = new WeakMap();
  function artworkBounds(bitmap) {
    if (alphaBounds.has(bitmap)) return alphaBounds.get(bitmap);
    const {width, height} = bitmap, data = bitmap.context.getImageData(0, 0, width, height).data;
    let left = width, top = height, right = -1, bottom = -1;
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] < 16) continue;
      left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
    }
    const rect = right < 0 ? null : new Rectangle(left, top, right - left + 1, bottom - top + 1);
    alphaBounds.set(bitmap, rect); return rect;
  }
  function artworkRect(sprite, container, bounds) {
    const full = pictureRect(sprite, container);
    return new Rectangle(full.x + bounds.x * full.width / sprite.bitmap.width, full.y + bounds.y * full.height / sprite.bitmap.height,
      bounds.width * full.width / sprite.bitmap.width, bounds.height * full.height / sprite.bitmap.height);
  }
  function associateArtwork(pictures, container, kind) {
    for (const sprite of pictures) sprite._coretoInkActionOwner = null;
    if (kind !== 'roster') return;
    const targets = pictures.filter(s => !surface(s) && binding(s) >= 0 && !artworkBounds(s.bitmap));
    const art = pictures.filter(s => !surface(s) && binding(s) < 0);
    for (const sprite of art) {
      const bounds = artworkBounds(sprite.bitmap);
      if (!bounds || bounds.width * bounds.height > sprite.bitmap.width * sprite.bitmap.height * 0.8) continue;
      const rect = artworkRect(sprite, container, bounds);
      const matches = targets.filter(target => {
        const r = pictureRect(target, container);
        const intersection = Math.max(0, Math.min(r.x + r.width, rect.x + rect.width) - Math.max(r.x, rect.x)) *
          Math.max(0, Math.min(r.y + r.height, rect.y + rect.height) - Math.max(r.y, rect.y));
        return intersection / (r.width * r.height + rect.width * rect.height - intersection) > 0.8;
      });
      if (matches.length === 1) sprite._coretoInkActionOwner = matches[0];
    }
  }
  const vertices = Sprite_Picture.prototype.calculateVertices;
  Sprite_Picture.prototype.calculateVertices = function() {
    vertices.call(this);
    if (!this._coretoInkImageScale || this._coretoInkImageScale === 1) return;
    const bounds = this._coretoInkArtBounds || new Rectangle(0, 0, this.bitmap.width, this.bitmap.height);
    const center = this.worldTransform.apply(new Point(bounds.x + bounds.width / 2 - this.anchor.x * this.bitmap.width,
      bounds.y + bounds.height / 2 - this.anchor.y * this.bitmap.height));
    for (let i = 0; i < this.vertexData.length; i += 2) {
      this.vertexData[i] = center.x + (this.vertexData[i] - center.x) * this._coretoInkImageScale;
      this.vertexData[i + 1] = center.y + (this.vertexData[i + 1] - center.y) * this._coretoInkImageScale;
    }
    this._transformID = -1;
  };
  function updateArtwork(pictures, kind) {
    for (const sprite of pictures) {
      const interactive = !surface(sprite) && binding(sprite) >= 0 && ['roster', 'approaches', 'sacrifice'].includes(kind);
      const focused = interactive && state(sprite).enabled && state(sprite).focused;
      sprite._coretoInkImageScale = focused ? ui.tokens.imageFocusScale : 1;
      sprite._transformID = -1;
      if (interactive) {
        sprite._coretoInkArtBounds = kind === 'roster' ? artworkBounds(sprite.bitmap) : null;
        sprite.setColorTone([0, 0, 0, 0]);
      }
    }
  }
  function movePicture(sprite, x, y, container) {
    if (sprite.parent !== container) {
      const point = sprite.parent.worldTransform.applyInverse(container.worldTransform.apply(new Point(x, y)));
      x = point.x; y = point.y;
    }
    sprite._coretoInkLayoutPosition = { x, y, name:sprite._pictureName };
    sprite.x = x; sprite.y = y;
    sprite.getBounds();
  }
  const updatePosition = Sprite_Picture.prototype.updatePosition;
  Sprite_Picture.prototype.updatePosition = function() {
    updatePosition.apply(this, arguments);
    const position = this._coretoInkLayoutPosition;
    if (!position) return;
    if (position.name !== this._pictureName || ui.adapters.pictureContext(SceneManager._scene) !== 'approaches') {
      delete this._coretoInkLayoutPosition; return;
    }
    this.x = position.x; this.y = position.y;
  };
  function arrangeApproaches(pictures, preview, container, choices) {
    const cards = pictures.filter(s => kindOf(s) === 'approach').sort((a, b) => a.x - b.x);
    if (!cards.length) return null;
    const width = Math.min(Graphics.boxWidth - 48, Math.max(880, cards.length * 280 + 48));
    const left = (Graphics.boxWidth - width) / 2, bottom = Graphics.boxHeight - 18;
    const descriptions = choices._list.map(item => plain(choices, item.name));
    const descriptionHeight = Math.max(...cards.map(s => CoretoDesignSystem.measure(preview.bitmap, descriptions[binding(s)] || '', width - 96, 'Body').lines.length)) * 30 + 12;
    const headings = pictures.filter(s => kindOf(s) === 'heading');
    const title = headings.flatMap(s => zones.map(zone => $gameScreen.getPictureText(s._pictureId, zone)).filter(Boolean)).map(text => plain(choices, text)).join(' ');
    const titleLines = CoretoDesignSystem.measure(preview.bitmap, title, width - 340, 'Speaker').lines.length;
    const headerHeight = Math.max(60, titleLines * Math.max(30, CoretoDesignSystem.style('Speaker').Size + 10) + 12);
    const rowHeight = 150, height = 24 + headerHeight + rowHeight + descriptionHeight + 12;
    const top = bottom - height, rowTop = top + 12 + headerHeight;
    const actions = pictures.filter(s => kindOf(s) === 'button');
    for (const heading of headings) {
      movePicture(heading, left + (width - 256) / 2, top + 42, container);
    }
    for (const action of actions) movePicture(action, left + width - 128, top + 12 + headerHeight / 2, container);
    cards.forEach((card, index) => {
      const x = left + 24 + (index + 0.5) * (width - 48) / cards.length;
      movePicture(card, x, rowTop + rowHeight / 2, container);
      for (const art of pictures.filter(s => !surface(s) && binding(s) === binding(card))) movePicture(art, x, rowTop + rowHeight / 2, container);
    });
    return {rect:new Rectangle(left, top, width, height), title, heading:new Rectangle(left + 12, top + 12, width - 268, headerHeight), descriptions,
      description:new Rectangle(left + 18, rowTop + rowHeight, width - 36, descriptionHeight),
      row:new Rectangle(left + 24, rowTop, width - 48, rowHeight), cards};
  }
  function union(rects) {
    const left = Math.min(...rects.map(r => r.x)), top = Math.min(...rects.map(r => r.y));
    return new Rectangle(left, top, Math.max(...rects.map(r => r.x + r.width)) - left,
      Math.max(...rects.map(r => r.y + r.height)) - top);
  }
  function collect(container, result = []) {
    for (const child of container.children || []) {
      if (child instanceof Sprite_Picture && child.visible && child.bitmap?.isReady() && child.opacity > 0) result.push(child);
      collect(child, result);
    }
    return result;
  }
  const create = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    create.apply(this, arguments);
    this._coretoInkGroupPaper = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this._spriteset._pictureContainer.addChildAt(this._coretoInkGroupPaper, 0);
    this._coretoInkApproachText = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this.addChild(this._coretoInkApproachText);
  };
  const sceneUpdate = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    const result = sceneUpdate.apply(this, arguments);
    const panel = this._coretoInkGroupPaper, preview = this._coretoInkApproachText;
    if (!panel) return result;
    const choices = this._choiceListWindow, container = this._spriteset._pictureContainer;
    const kind = ui.adapters.pictureContext(this);
    const visible = !ui.hidden(); panel.visible = visible; preview.visible = visible;
    const pictures = collect(container);
    associateArtwork(pictures, container, kind);
    updateArtwork(pictures, kind);
    const approachLayout = kind === 'approaches' && choices?.isOpenAndActive() ? arrangeApproaches(pictures, preview, container, choices) : null;
    const sprites = pictures.filter(sprite => presentation(sprite).group !== 'none' && (surface(sprite) || presentation(sprite).group));
    if (sprites.length) {
      const roots = sprites.map(sprite => { while (sprite.parent !== container) sprite = sprite.parent; return sprite; });
      const first = Math.min(...roots.map(sprite => container.getChildIndex(sprite)));
      const current = container.getChildIndex(panel);
      container.setChildIndex(panel, current < first ? first - 1 : first);
    }
    const signature = JSON.stringify([ImageManager.loadSystem(CoretoDesignSystem.config.PaperImage).isReady(), visible, kind, choices?.isOpenAndActive(), choices?.index(), ConfigManager.textLocale,
      sprites.map(sprite => [sprite._pictureId, sprite._pictureName, sprite.width, sprite.height,
        sprite.worldTransform.a, sprite.worldTransform.d, sprite.worldTransform.tx, sprite.worldTransform.ty])]);
    if (this._coretoInkGroupSignature === signature) return result;
    this._coretoInkGroupSignature = signature; panel.bitmap.clear(); preview.bitmap.clear();
    if (!visible || SceneManager.isSceneTitleMap?.()) return result;
    const bases = sprites.filter(sprite => !['panel', 'heading'].includes(kindOf(sprite)));
    const existingPanel = sprites.find(sprite => kindOf(sprite) === 'panel');
    const rects = bases.map(sprite => pictureRect(sprite, container));
    let regions = [];
    if (existingPanel) regions = [union([pictureRect(existingPanel, container), ...rects])];
    else if (kind === 'roster') {
      const actions = bases.filter(sprite => pictureRect(sprite, container).y > Graphics.boxHeight / 2);
      if (actions.length) regions.push(union(actions.map(sprite => pictureRect(sprite, container))));
    }
    else if (kind === 'sacrifice' && rects.length) {
      const heading = sprites.find(sprite => kindOf(sprite) === 'heading');
      regions = [union([...rects, ...(heading ? [pictureRect(heading, container)] : [])])];
    }
    else if (rects.length) {
      // Nearby labels share a strip while the stage portraits remain exposed.
      for (const rect of rects) {
        const nearby = regions.find(r => Math.abs(r.y - rect.y) < 24);
        if (nearby) Object.assign(nearby, union([nearby, rect])); else regions.push(rect);
      }
    }
    if (approachLayout) {
      regions = [approachLayout.rect];
      ui.label({contents:preview.bitmap}, approachLayout.title, approachLayout.heading, {}, 'Speaker', 'center');
      const index = choices.index();
      const illustration = approachLayout.cards.find(sprite => binding(sprite) === index);
      if (illustration && choices.isCommandEnabled(index)) {
        ui.label({ contents: preview.bitmap }, approachLayout.descriptions[index], approachLayout.description, {}, 'Body', 'center');
      }
    }
    const padding = kind === 'sacrifice' ? 12 : 6;
    for (const rect of regions) ui.paper(panel.bitmap, Math.max(0, rect.x - padding), Math.max(0, rect.y - padding), rect.width + padding * 2, rect.height + padding * 2);
    const rows = approachLayout ? [approachLayout.cards.map(s => pictureRect(s, container))] : [];
    if (!approachLayout) for (const rect of rects) {
      const row = rows.find(row => Math.abs(row[0].y - rect.y) < 24);
      if (row) row.push(rect); else rows.push([rect]);
    }
    for (const row of rows) {
      row.sort((a,b) => a.x-b.x);
      for (let i = 1; i < row.length; i++) {
        const a = row[i-1], b = row[i], x = (a.x+a.width+b.x)/2;
        if (a.x+a.width > b.x+2) continue;
        const y = approachLayout ? approachLayout.row.y : Math.max(a.y,b.y);
        const bottom = approachLayout ? y+approachLayout.row.height : Math.min(a.y+a.height,b.y+b.height);
        ui.divider(panel.bitmap,x,y+12,x,bottom-12);
      }
    }
    for (const title of sprites.filter(sprite => kindOf(sprite) === 'heading' && !['approaches', 'sacrifice'].includes(kind))) {
      const rect = pictureRect(title, container); ui.paper(panel.bitmap, rect.x, rect.y, rect.width, rect.height);
    }
    return result;
  };
  const terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    this._coretoInkGroupPaper?.bitmap.destroy(); this._coretoInkApproachText?.bitmap.destroy();
    return terminate.apply(this, arguments);
  };
})();

(() => {
  'use strict';
  const theme = globalThis.CoretoDesignSystem;
  if (!theme) return;
  function layoutPanel(rects, padding=12) {
    if (!rects.length) return null;
    const x=Math.min(...rects.map(r=>r.x))-padding, y=Math.min(...rects.map(r=>r.y))-padding;
    return {x,y,width:Math.max(...rects.map(r=>r.x+r.width))+padding-x,height:Math.max(...rects.map(r=>r.y+r.height))+padding-y};
  }
  function layoutTitleOptions(rect,titleHeight,gap=24,padding=12) {
    return {title:{x:rect.x+padding,y:rect.y+padding,width:rect.width-2*padding,height:titleHeight},
      options:{x:rect.x+padding,y:rect.y+padding+titleHeight+gap,width:rect.width-2*padding,height:Math.max(0,rect.height-2*padding-titleHeight-gap)}};
  }
  function measureSharedDescription(bitmap,texts,width,role='Action') {
    const layouts=texts.map(text=>theme.measure(bitmap,TextManager.parseLocalizedText(text),width,role));
    return {height:Math.max(0,...layouts.map(layout=>layout.height)),layouts};
  }
  function drawChoiceCard(bitmap,rect,{title,description,cta,state={},image=null}) {
    const content={x:rect.x+12,y:rect.y+12,width:rect.width-24,height:rect.height-24};
    let y=content.y;
    if(image?.isReady()) {
      const scale=Math.min(content.width/image.width,rect.height*0.35/image.height);
      bitmap.blt(image,0,0,image.width,image.height,content.x+(content.width-image.width*scale)/2,y,image.width*scale,image.height*scale);
      y+=image.height*scale+12;
    }
    theme.drawLabel({contents:bitmap},title,{...content,y,height:48},{},'Speaker'); y+=60;
    theme.drawLabel({contents:bitmap},description,{...content,y,height:Math.max(48,content.y+content.height-y-72)},{},'Helper');
    theme.drawLabel({contents:bitmap},cta,{...content,y:content.y+content.height-48,height:48},{...state,feedback:'choice'},'Action','center');
  }
  function drawIconControl(bitmap,name,rect,state={}) {
    const focused=state.enabled!==false&&state.focused, scale=focused&&!theme.ink.reducedMotion()?1.05:1;
    const size=Math.min(rect.width,rect.height), ctx=bitmap.context;
    ctx.save();ctx.translate(rect.x+rect.width/2,rect.y+rect.height/2);ctx.scale(scale,scale);
    theme.drawIcon(bitmap,name,-size/2,-size/2,size,state.enabled===false?theme.ink.tokens.muted:focused?theme.colors.primary:theme.colors.text);
    ctx.restore();
  }
  globalThis.CoretoDesignSystem=Object.freeze({...theme,layoutPanel,layoutTitleOptions,measureSharedDescription,drawChoiceCard,drawIconControl});
})();
