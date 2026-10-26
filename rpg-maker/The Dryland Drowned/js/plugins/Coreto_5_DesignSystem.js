/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 5] [Version 1.3.0] [DesignSystem]
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
 * @help
 * Design System 1.3.0. Requires CoreEngine, MessageCore and ExtMessageFunc; load after providers.
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
 * @default {"Face":"CoretoCinzel","Size":52,"Line":56}
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
 * @default {"Face":"CoretoOutfitMedium","Size":22,"Line":28}
 *
 * @param Action
 * @text Action
 * @type struct<Action>
 * @desc Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.
 * @default {"Face":"CoretoOutfitMedium","Size":20,"Line":24}
 *
 * @param ChoiceText
 * @text ChoiceText
 * @type struct<ChoiceText>
 * @desc Typography for drawButton kind choice. Its Line comes from active MessageCore ChoiceWindowLineHeight (fallback 24), not this object; native choice drawing retains provider font settings.
 * @default {"Face":"CoretoOutfitMedium","Size":18}
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
 * @default {"Face":"CoretoOutfitMedium","Size":16,"Line":20}
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
 * @default CoretoCinzel
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
 * @default CoretoOutfitMedium
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
 * @default CoretoOutfitMedium
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
 * @default CoretoOutfitMedium
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
 * @default CoretoOutfitMedium
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
"use strict";
const catalog = {"schemaVersion":1,"pluginId":"Coreto_5_DesignSystem","namespace":"design-system","version":"1.3.0","description":"Shared presentation for MZ windows, choices and picture roles.","dependencies":{"required":["Coreto_0_CoreEngine","Coreto_1_MessageCore","Coreto_2_ExtMessageFunc"],"optional":["Coreto_1_OptionsCore","Coreto_1_SaveCore"]},"orderAfter":["Coreto_0_CoreEngine","Coreto_1_MessageCore","Coreto_1_OptionsCore","Coreto_1_SaveCore","Coreto_2_ExtMessageFunc","Coreto_2_PictureChoices","Coreto_2_VNPictureBusts","Coreto_2_AniMsgTextEffects","Coreto_3_ChoiceCmnEvts","Coreto_4_AttachedPictures","Coreto_4_EventTitleScene","Coreto_4_MessageVisibility"],"orderBefore":[],"parameters":[{"id":"DS-P-Enabled","key":"Enabled","storageKey":"Enabled","label":"Enabled","description":"When true, install the DesignSystem presentation hooks and expose CoretoDesignSystem at boot. False returns before either is created; provider-owned preset callbacks already written to Options/Save are independent and remain configured.","type":"boolean","editorType":"boolean","default":true,"nativeDefault":"true","availability":"supported"},{"id":"DS-P-Windows","key":"Windows","storageKey":"Windows","label":"Windows","description":"When true, theme eligible MZ windows, choice rows, dialogue spacing and option rectangles. False skips these window hooks and corner-cursor placement; exported drawing helpers and configured picture-role decoration remain available. ScrollText, MapName, picture-text windows and non-menu ButtonAssist are excluded from the ordinary window-surface replacement.","type":"boolean","editorType":"boolean","default":true,"nativeDefault":"true","availability":"supported"},{"id":"DS-P-Surfaces","key":"Surfaces","storageKey":"Surfaces","label":"Surfaces","description":"Palette used by drawing helpers and window/picture feedback. Every value is a #RRGGBB string. The panel color is overridden at runtime by active Core Engine itemBackColor1; text, heading and muted colors come from Core Engine rather than this object.","type":"struct","editorType":"struct<Surfaces>","default":{"canvas":"#f8e9cc","panel":"#f9eacf","disabled":"#d3c7b4","onAccent":"#fff8eb","border":"#704737","subtle":"#be9a6b","primary":"#552070","pressed":"#4d1d6b","purple":"#6d1b8b","menuSelectedHoverBorder":"#000000","focus":"#8224ad","gold":"#edaa2f","error":"#af2933","hover":"#eedff2","accentHover":"#6d3185","card":"#f0dfc0","cardScene":"#f0dfc0","cardMemorial":"#f0dfc0"},"nativeDefault":"{\"canvas\":\"#f8e9cc\",\"panel\":\"#f9eacf\",\"disabled\":\"#d3c7b4\",\"onAccent\":\"#fff8eb\",\"border\":\"#704737\",\"subtle\":\"#be9a6b\",\"primary\":\"#552070\",\"pressed\":\"#4d1d6b\",\"purple\":\"#6d1b8b\",\"menuSelectedHoverBorder\":\"#000000\",\"focus\":\"#8224ad\",\"gold\":\"#edaa2f\",\"error\":\"#af2933\",\"hover\":\"#eedff2\",\"accentHover\":\"#6d3185\",\"card\":\"#f0dfc0\",\"cardScene\":\"#f0dfc0\",\"cardMemorial\":\"#f0dfc0\"}","availability":"supported","structName":"Surfaces","fields":[{"id":"DS-P-Surfaces.canvas","key":"canvas","storageKey":"canvas","label":"canvas","description":"Exported canvas palette color for game-owned drawing. Current built-in window and picture renderers do not paint a canvas from this value. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#f8e9cc","nativeDefault":"#f8e9cc","availability":"supported"},{"id":"DS-P-Surfaces.panel","key":"panel","storageKey":"panel","label":"panel","description":"Fallback light panel fill. With the required active Coreto Core Engine, CoretoDesignSystem.colors.panel instead reads ColorManager.itemBackColor1(); change that provider setting to change live panel fill. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#f9eacf","nativeDefault":"#f9eacf","availability":"supported"},{"id":"DS-P-Surfaces.disabled","key":"disabled","storageKey":"disabled","label":"disabled","description":"Fill for disabled buttons/fields and the unfilled volume-track recipe. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#d3c7b4","nativeDefault":"#d3c7b4","availability":"supported"},{"id":"DS-P-Surfaces.onAccent","key":"onAccent","storageKey":"onAccent","label":"onAccent","description":"Text/icon ink on selected, pressed or primary surfaces; also dialogue ink on dark message backgrounds. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#fff8eb","nativeDefault":"#fff8eb","availability":"supported"},{"id":"DS-P-Surfaces.border","key":"border","storageKey":"border","label":"border","description":"Ordinary control and window border color. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#704737","nativeDefault":"#704737","availability":"supported"},{"id":"DS-P-Surfaces.subtle","key":"subtle","storageKey":"subtle","label":"subtle","description":"Card stripe, inner message border and picture-panel outline color. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#be9a6b","nativeDefault":"#be9a6b","availability":"supported"},{"id":"DS-P-Surfaces.primary","key":"primary","storageKey":"primary","label":"primary","description":"Fill for selected or primary controls and the captured volume-control recipe. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#552070","nativeDefault":"#552070","availability":"supported"},{"id":"DS-P-Surfaces.pressed","key":"pressed","storageKey":"pressed","label":"pressed","description":"Fill while a control is pressed; also used by the captured selected volume track. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#4d1d6b","nativeDefault":"#4d1d6b","availability":"supported"},{"id":"DS-P-Surfaces.purple","key":"purple","storageKey":"purple","label":"purple","description":"Exported palette color for game-owned drawing. Current built-in renderers use primary/focus/accentHover instead. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#6d1b8b","nativeDefault":"#6d1b8b","availability":"supported"},{"id":"DS-P-Surfaces.menuSelectedHoverBorder","key":"menuSelectedHoverBorder","storageKey":"menuSelectedHoverBorder","label":"menuSelectedHoverBorder","description":"Border color when a selected menu-kind button is hovered. Other selected controls keep the gold border. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#000000","nativeDefault":"#000000","availability":"supported"},{"id":"DS-P-Surfaces.focus","key":"focus","storageKey":"focus","label":"focus","description":"Hovered-control border and focused-field border color. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#8224ad","nativeDefault":"#8224ad","availability":"supported"},{"id":"DS-P-Surfaces.gold","key":"gold","storageKey":"gold","label":"gold","description":"Selected-control border and explicit focused-button outer ring; also captured volume feedback. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#edaa2f","nativeDefault":"#edaa2f","availability":"supported"},{"id":"DS-P-Surfaces.error","key":"error","storageKey":"error","label":"error","description":"Error-state border in drawField. The error icon retains its source artwork colors. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#af2933","nativeDefault":"#af2933","availability":"supported"},{"id":"DS-P-Surfaces.hover","key":"hover","storageKey":"hover","label":"hover","description":"Fill for an unselected light control under the pointer. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#eedff2","nativeDefault":"#eedff2","availability":"supported"},{"id":"DS-P-Surfaces.accentHover","key":"accentHover","storageKey":"accentHover","label":"accentHover","description":"Hover fill for selected or primary controls. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#6d3185","nativeDefault":"#6d3185","availability":"supported"},{"id":"DS-P-Surfaces.card","key":"card","storageKey":"card","label":"card","description":"Static card fill for paper/default contexts, including Window_Help and configured card pictures. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#f0dfc0","nativeDefault":"#f0dfc0","availability":"supported"},{"id":"DS-P-Surfaces.cardScene","key":"cardScene","storageKey":"cardScene","label":"cardScene","description":"Static card fill when drawCard receives context scene. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#f0dfc0","nativeDefault":"#f0dfc0","availability":"supported"},{"id":"DS-P-Surfaces.cardMemorial","key":"cardMemorial","storageKey":"cardMemorial","label":"cardMemorial","description":"Static card fill when drawCard receives context memorial. Supply a JSON string in #RRGGBB format, for example \"#704737\".","type":"string","editorType":"string","default":"#f0dfc0","nativeDefault":"#f0dfc0","availability":"supported"}]},{"id":"DS-P-Shapes","key":"Shapes","storageKey":"Shapes","label":"Shapes","description":"Pixel dimensions for rounded surfaces, borders and focus rings. Used by window/picture rendering and the public drawing helpers; a corner radius is capped at half the drawn width/height.","type":"struct","editorType":"struct<Shapes>","default":{"ControlRadius":6,"PanelRadius":10,"MenuSelectedWidth":1,"BorderWidth":1,"FocusWidth":2,"FocusGap":3,"Inset":3},"nativeDefault":"{\"ControlRadius\":6,\"PanelRadius\":10,\"MenuSelectedWidth\":1,\"BorderWidth\":1,\"FocusWidth\":2,\"FocusGap\":3,\"Inset\":3}","availability":"supported","structName":"Shapes","fields":[{"id":"DS-P-Shapes.ControlRadius","key":"ControlRadius","storageKey":"ControlRadius","label":"ControlRadius","description":"Rounded-control corner radius in pixels, capped by half the rendered dimensions.","type":"number","editorType":"number","default":6,"nativeDefault":"6","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.PanelRadius","key":"PanelRadius","storageKey":"PanelRadius","label":"PanelRadius","description":"Window and picture-panel corner radius in pixels, capped by half the rendered dimensions.","type":"number","editorType":"number","default":10,"nativeDefault":"10","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.MenuSelectedWidth","key":"MenuSelectedWidth","storageKey":"MenuSelectedWidth","label":"MenuSelectedWidth","description":"Border width in pixels for a resting selected menu-kind button. Hover uses FocusWidth; pressed/disabled uses BorderWidth.","type":"number","editorType":"number","default":1,"nativeDefault":"1","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.BorderWidth","key":"BorderWidth","storageKey":"BorderWidth","label":"BorderWidth","description":"Ordinary control/field border width in pixels. Zero is accepted as a drawing value, not an off switch for the surface or its border.","type":"number","editorType":"number","default":1,"nativeDefault":"1","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.FocusWidth","key":"FocusWidth","storageKey":"FocusWidth","label":"FocusWidth","description":"Hovered/selected control and focused-field border width in pixels; also width of the explicit outer focus ring.","type":"number","editorType":"number","default":2,"nativeDefault":"2","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.FocusGap","key":"FocusGap","storageKey":"FocusGap","label":"FocusGap","description":"Gap in pixels outside a drawButton rectangle before its explicit focused ring; the ring bounds expand by FocusGap + FocusWidth on every side.","type":"number","editorType":"number","default":3,"nativeDefault":"3","availability":"supported","min":0,"max":4096},{"id":"DS-P-Shapes.Inset","key":"Inset","storageKey":"Inset","label":"Inset","description":"Inset in pixels from each edge of the message window for its inner decorative outline.","type":"number","editorType":"number","default":3,"nativeDefault":"3","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Card","key":"Card","storageKey":"Card","label":"Card","description":"Pixel spacing for static card surfaces and drawCard text. Window_Help uses the surface stripe, while its native text inset is separately fixed at 16 pixels.","type":"struct","editorType":"struct<Card>","default":{"StripeX":12,"StripeWidth":4,"PaddingY":12,"TextInset":12,"PaddingRight":12},"nativeDefault":"{\"StripeX\":12,\"StripeWidth\":4,\"PaddingY\":12,\"TextInset\":12,\"PaddingRight\":12}","availability":"supported","structName":"Card","fields":[{"id":"DS-P-Card.StripeX","key":"StripeX","storageKey":"StripeX","label":"StripeX","description":"Horizontal stripe offset in pixels from the card rectangle left edge; positive moves right.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096},{"id":"DS-P-Card.StripeWidth","key":"StripeWidth","storageKey":"StripeWidth","label":"StripeWidth","description":"Width in pixels of the vertical card stripe.","type":"number","editorType":"number","default":4,"nativeDefault":"4","availability":"supported","min":0,"max":4096},{"id":"DS-P-Card.PaddingY","key":"PaddingY","storageKey":"PaddingY","label":"PaddingY","description":"Top/bottom stripe inset and drawCard text top/bottom padding in pixels.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096},{"id":"DS-P-Card.TextInset","key":"TextInset","storageKey":"TextInset","label":"TextInset","description":"drawCard text offset in pixels from the rectangle left edge; reduces available wrapping width.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096},{"id":"DS-P-Card.PaddingRight","key":"PaddingRight","storageKey":"PaddingRight","label":"PaddingRight","description":"Right-side space in pixels excluded from drawCard wrapping width.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Button","key":"Button","storageKey":"Button","label":"Button","description":"Pixel spacing for menu-button markers and drawButton text. MinHeight also sets a floor for choice rows; it does not resize every native button.","type":"struct","editorType":"struct<Button>","default":{"PaddingX":16,"MinHeight":44,"MarkerSize":24,"MarkerGap":12},"nativeDefault":"{\"PaddingX\":16,\"MinHeight\":44,\"MarkerSize\":24,\"MarkerGap\":12}","availability":"supported","structName":"Button","fields":[{"id":"DS-P-Button.PaddingX","key":"PaddingX","storageKey":"PaddingX","label":"PaddingX","description":"Horizontal padding in pixels inside drawButton. Menu/choice text additionally reserves marker size and gap.","type":"number","editorType":"number","default":16,"nativeDefault":"16","availability":"supported","min":0,"max":4096},{"id":"DS-P-Button.MinHeight","key":"MinHeight","storageKey":"MinHeight","label":"MinHeight","description":"Minimum choice-row height in pixels. The native row height and tallest wrapped label can raise the final height.","type":"number","editorType":"number","default":44,"nativeDefault":"44","availability":"supported","min":0,"max":4096},{"id":"DS-P-Button.MarkerSize","key":"MarkerSize","storageKey":"MarkerSize","label":"MarkerSize","description":"Diamond marker side length in pixels for menu-kind buttons and title choices.","type":"number","editorType":"number","default":24,"nativeDefault":"24","availability":"supported","min":0,"max":4096},{"id":"DS-P-Button.MarkerGap","key":"MarkerGap","storageKey":"MarkerGap","label":"MarkerGap","description":"Horizontal gap in pixels reserved after the menu/title-choice diamond.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Choice","key":"Choice","storageKey":"Choice","label":"Choice","description":"Pixel spacing and maximum width of choice entries when Windows is true; drawButton with kind choice also uses its marker settings.","type":"struct","editorType":"struct<Choice>","default":{"MarkerSize":16,"MarkerGap":8,"PaddingY":8,"MaxWidth":620},"nativeDefault":"{\"MarkerSize\":16,\"MarkerGap\":8,\"PaddingY\":8,\"MaxWidth\":620}","availability":"supported","structName":"Choice","fields":[{"id":"DS-P-Choice.MarkerSize","key":"MarkerSize","storageKey":"MarkerSize","label":"MarkerSize","description":"Diamond marker side length in pixels for ordinary choices.","type":"number","editorType":"number","default":16,"nativeDefault":"16","availability":"supported","min":0,"max":4096},{"id":"DS-P-Choice.MarkerGap","key":"MarkerGap","storageKey":"MarkerGap","label":"MarkerGap","description":"Horizontal gap in pixels reserved after an ordinary choice diamond.","type":"number","editorType":"number","default":8,"nativeDefault":"8","availability":"supported","min":0,"max":4096},{"id":"DS-P-Choice.PaddingY","key":"PaddingY","storageKey":"PaddingY","label":"PaddingY","description":"Space in pixels added above and below the tallest measured choice label when computing row height.","type":"number","editorType":"number","default":8,"nativeDefault":"8","availability":"supported","min":0,"max":4096},{"id":"DS-P-Choice.MaxWidth","key":"MaxWidth","storageKey":"MaxWidth","label":"MaxWidth","description":"Maximum choice-content width in pixels, further limited by screen width, columns and spacing. CLI minimum is 80. Wrapping preserves whole words, so a single oversized word is not split.","type":"number","editorType":"number","default":620,"nativeDefault":"620","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Dialogue","key":"Dialogue","storageKey":"Dialogue","label":"Dialogue","description":"Dialogue composition when Windows is true. MessageCore retains text parsing and ExtMessageFunc retains cursor artwork, animation and offsets.","type":"struct","editorType":"struct<Dialogue>","default":{"ContinuePlacement":"corner","SpeakerInside":true,"SpeakerGap":4,"TextInset":16,"ContrastOutline":2},"nativeDefault":"{\"ContinuePlacement\":\"corner\",\"SpeakerInside\":true,\"SpeakerGap\":4,\"TextInset\":16,\"ContrastOutline\":2}","availability":"supported","structName":"Dialogue","fields":[{"id":"DS-P-Dialogue.ContinuePlacement","key":"ContinuePlacement","storageKey":"ContinuePlacement","label":"ContinuePlacement","description":"corner places an enabled ExtMessageFunc custom continue cursor near the message bottom-right, retaining provider offsets. provider leaves its placement to ExtMessageFunc. Requires Windows=true and an active custom cursor; it does not enable the cursor.","type":"string","editorType":"select","default":"corner","nativeDefault":"corner","availability":"supported","options":["corner","provider"]},{"id":"DS-P-Dialogue.SpeakerInside","key":"SpeakerInside","storageKey":"SpeakerInside","label":"SpeakerInside","description":"True reserves speaker space at the start of message text and places the NameBox inside the message panel; false retains provider placement. Only messages with a speaker name reserve space. Forced-position/auto-sized messages skip the added window-height calculation.","type":"boolean","editorType":"boolean","default":true,"nativeDefault":"true","availability":"supported"},{"id":"DS-P-Dialogue.SpeakerGap","key":"SpeakerGap","storageKey":"SpeakerGap","label":"SpeakerGap","description":"Extra vertical pixels between an embedded speaker line and message text; added to Speaker.Line.","type":"number","editorType":"number","default":4,"nativeDefault":"4","availability":"supported","min":0,"max":4096},{"id":"DS-P-Dialogue.TextInset","key":"TextInset","storageKey":"TextInset","label":"TextInset","description":"Horizontal pixels added to the provider message line start. Also offsets embedded NameBox placement from the left and the corner cursor from the right, with provider offsets added.","type":"number","editorType":"number","default":16,"nativeDefault":"16","availability":"supported","min":0,"max":4096},{"id":"DS-P-Dialogue.ContrastOutline","key":"ContrastOutline","storageKey":"ContrastOutline","label":"ContrastOutline","description":"Text-outline width in pixels on dim/transparent message backgrounds and unadapted scrolling text. Paper backgrounds use MessageCore DefaultOutlineWidth instead; outline color remains Core Engine/native.","type":"number","editorType":"number","default":2,"nativeDefault":"2","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Field","key":"Field","storageKey":"Field","label":"Field","description":"Pixel dimensions for drawField; Height also controls the background drawn behind native actor-name input when Windows is true.","type":"struct","editorType":"struct<Field>","default":{"Height":40,"PaddingX":18,"Gap":4},"nativeDefault":"{\"Height\":40,\"PaddingX\":18,\"Gap\":4}","availability":"supported","structName":"Field","fields":[{"id":"DS-P-Field.Height","key":"Height","storageKey":"Height","label":"Height","description":"Field background height in pixels; drawField uses it for value text and native actor-name input uses it for its backdrop.","type":"number","editorType":"number","default":40,"nativeDefault":"40","availability":"supported","min":0,"max":4096},{"id":"DS-P-Field.PaddingX","key":"PaddingX","storageKey":"PaddingX","label":"PaddingX","description":"Horizontal pixels inset on both sides of drawField value text.","type":"number","editorType":"number","default":18,"nativeDefault":"18","availability":"supported","min":0,"max":4096},{"id":"DS-P-Field.Gap","key":"Gap","storageKey":"Gap","label":"Gap","description":"Vertical pixel gap between drawField label and value surface, and between that surface and helper text.","type":"number","editorType":"number","default":4,"nativeDefault":"4","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Controls","key":"Controls","storageKey":"Controls","label":"Controls","description":"Visual dimensions captured into the delivered Options/Save drawing recipes. Editing these DesignSystem parameters alone does not rewrite provider callbacks. See skills describe game-coreto-eng-design-system and its references/operations.md for preset ownership and reapplication.","type":"struct","editorType":"struct<Controls>","default":{"OptionHeight":76,"ValueRatio":52,"TrackHeight":8,"ThumbWidth":10,"ThumbHeight":18,"SaveHeader":60,"SaveFooter":98},"nativeDefault":"{\"OptionHeight\":76,\"ValueRatio\":52,\"TrackHeight\":8,\"ThumbWidth\":10,\"ThumbHeight\":18,\"SaveHeader\":60,\"SaveFooter\":98}","availability":"supported","structName":"Controls","fields":[{"id":"DS-P-Controls.OptionHeight","key":"OptionHeight","storageKey":"OptionHeight","label":"OptionHeight","description":"Exposed configuration value for custom recipes. The current runtime and shipped drawing recipes do not read OptionHeight; changing it alone does not resize Options rows.","type":"number","editorType":"number","default":76,"nativeDefault":"76","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.ValueRatio","key":"ValueRatio","storageKey":"ValueRatio","label":"ValueRatio","description":"Captured option-recipe value-column start as a percentage of row width: x = row.x + row.width * ValueRatio / 100. CLI accepts values strictly between 0 and 100. Current provider callbacks retain the values captured when their recipe was authored.","type":"number","editorType":"number","default":52,"nativeDefault":"52","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.TrackHeight","key":"TrackHeight","storageKey":"TrackHeight","label":"TrackHeight","description":"Volume-track height in pixels captured into the Options drawing recipe; no direct live runtime consumer.","type":"number","editorType":"number","default":8,"nativeDefault":"8","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.ThumbWidth","key":"ThumbWidth","storageKey":"ThumbWidth","label":"ThumbWidth","description":"Volume-thumb width in pixels captured into the Options drawing recipe; no direct live runtime consumer.","type":"number","editorType":"number","default":10,"nativeDefault":"10","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.ThumbHeight","key":"ThumbHeight","storageKey":"ThumbHeight","label":"ThumbHeight","description":"Volume-thumb height in pixels captured into the Options drawing recipe; no direct live runtime consumer.","type":"number","editorType":"number","default":18,"nativeDefault":"18","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.SaveHeader","key":"SaveHeader","storageKey":"SaveHeader","label":"SaveHeader","description":"Top space in pixels reserved above save preview art/description by the captured Save contents recipe.","type":"number","editorType":"number","default":60,"nativeDefault":"60","availability":"supported","min":0,"max":4096},{"id":"DS-P-Controls.SaveFooter","key":"SaveFooter","storageKey":"SaveFooter","label":"SaveFooter","description":"Bottom space in pixels reserved below save preview art/description by the captured Save contents recipe. Preview height is max(0, row.height - SaveHeader - SaveFooter).","type":"number","editorType":"number","default":98,"nativeDefault":"98","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Title","key":"Title","storageKey":"Title","label":"Title","description":"Typography exposed by style(\"Title\") and fonts.title; it does not automatically replace native title text.","type":"struct","editorType":"struct<Title>","default":{"Face":"CoretoCinzel","Size":52,"Line":56},"nativeDefault":"{\"Face\":\"CoretoCinzel\",\"Size\":52,\"Line\":56}","availability":"supported","structName":"Title","fields":[{"id":"DS-P-Title.Face","key":"Face","storageKey":"Face","label":"Face","description":"Title font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography exposed by style(\"Title\") and fonts.title; it does not automatically replace native title text.","type":"string","editorType":"string","default":"CoretoCinzel","nativeDefault":"CoretoCinzel","availability":"supported"},{"id":"DS-P-Title.Size","key":"Size","storageKey":"Size","label":"Size","description":"Title font size in pixels. Typography exposed by style(\"Title\") and fonts.title; it does not automatically replace native title text.","type":"number","editorType":"number","default":52,"nativeDefault":"52","availability":"supported","min":0,"max":4096},{"id":"DS-P-Title.Line","key":"Line","storageKey":"Line","label":"Line","description":"Title line height in pixels. Typography exposed by style(\"Title\") and fonts.title; it does not automatically replace native title text.","type":"number","editorType":"number","default":56,"nativeDefault":"56","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Section","key":"Section","storageKey":"Section","label":"Section","description":"Typography exposed by style(\"Section\") for explicit drawing/measurement; no built-in section renderer consumes it.","type":"struct","editorType":"struct<Section>","default":{"Face":"CoretoAveria","Size":32,"Line":40},"nativeDefault":"{\"Face\":\"CoretoAveria\",\"Size\":32,\"Line\":40}","availability":"supported","structName":"Section","fields":[{"id":"DS-P-Section.Face","key":"Face","storageKey":"Face","label":"Face","description":"Section font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography exposed by style(\"Section\") for explicit drawing/measurement; no built-in section renderer consumes it.","type":"string","editorType":"string","default":"CoretoAveria","nativeDefault":"CoretoAveria","availability":"supported"},{"id":"DS-P-Section.Size","key":"Size","storageKey":"Size","label":"Size","description":"Section font size in pixels. Typography exposed by style(\"Section\") for explicit drawing/measurement; no built-in section renderer consumes it.","type":"number","editorType":"number","default":32,"nativeDefault":"32","availability":"supported","min":0,"max":4096},{"id":"DS-P-Section.Line","key":"Line","storageKey":"Line","label":"Line","description":"Section line height in pixels. Typography exposed by style(\"Section\") for explicit drawing/measurement; no built-in section renderer consumes it.","type":"number","editorType":"number","default":40,"nativeDefault":"40","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Speaker","key":"Speaker","storageKey":"Speaker","label":"Speaker","description":"Speaker typography exposed by style(\"Speaker\") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.","type":"struct","editorType":"struct<Speaker>","default":{"Face":"CoretoAveria","Size":24,"Line":28},"nativeDefault":"{\"Face\":\"CoretoAveria\",\"Size\":24,\"Line\":28}","availability":"supported","structName":"Speaker","fields":[{"id":"DS-P-Speaker.Face","key":"Face","storageKey":"Face","label":"Face","description":"Speaker font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Speaker typography exposed by style(\"Speaker\") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.","type":"string","editorType":"string","default":"CoretoAveria","nativeDefault":"CoretoAveria","availability":"supported"},{"id":"DS-P-Speaker.Size","key":"Size","storageKey":"Size","label":"Size","description":"Speaker font size in pixels. Speaker typography exposed by style(\"Speaker\") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.","type":"number","editorType":"number","default":24,"nativeDefault":"24","availability":"supported","min":0,"max":4096},{"id":"DS-P-Speaker.Line","key":"Line","storageKey":"Line","label":"Line","description":"Speaker line height in pixels. Speaker typography exposed by style(\"Speaker\") and fonts.speaker. Line reserves embedded-speaker space. Save header recipes capture Face/Size; native NameBox font remains provider-owned.","type":"number","editorType":"number","default":28,"nativeDefault":"28","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Menu","key":"Menu","storageKey":"Menu","label":"Menu","description":"Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.","type":"struct","editorType":"struct<Menu>","default":{"Face":"CoretoOutfitMedium","Size":22,"Line":28},"nativeDefault":"{\"Face\":\"CoretoOutfitMedium\",\"Size\":22,\"Line\":28}","availability":"supported","structName":"Menu","fields":[{"id":"DS-P-Menu.Face","key":"Face","storageKey":"Face","label":"Face","description":"Menu font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.","type":"string","editorType":"string","default":"CoretoOutfitMedium","nativeDefault":"CoretoOutfitMedium","availability":"supported"},{"id":"DS-P-Menu.Size","key":"Size","storageKey":"Size","label":"Size","description":"Menu font size in pixels. Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.","type":"number","editorType":"number","default":22,"nativeDefault":"22","availability":"supported","min":0,"max":4096},{"id":"DS-P-Menu.Line","key":"Line","storageKey":"Line","label":"Line","description":"Menu line height in pixels. Typography for drawButton kind menu. Options row recipes capture Face/Size separately; editing this object does not rewrite those callbacks.","type":"number","editorType":"number","default":28,"nativeDefault":"28","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Action","key":"Action","storageKey":"Action","label":"Action","description":"Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.","type":"struct","editorType":"struct<Action>","default":{"Face":"CoretoOutfitMedium","Size":20,"Line":24},"nativeDefault":"{\"Face\":\"CoretoOutfitMedium\",\"Size\":20,\"Line\":24}","availability":"supported","structName":"Action","fields":[{"id":"DS-P-Action.Face","key":"Face","storageKey":"Face","label":"Face","description":"Action font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.","type":"string","editorType":"string","default":"CoretoOutfitMedium","nativeDefault":"CoretoOutfitMedium","availability":"supported"},{"id":"DS-P-Action.Size","key":"Size","storageKey":"Size","label":"Size","description":"Action font size in pixels. Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.","type":"number","editorType":"number","default":20,"nativeDefault":"20","availability":"supported","min":0,"max":4096},{"id":"DS-P-Action.Line","key":"Line","storageKey":"Line","label":"Line","description":"Action line height in pixels. Typography for drawButton kinds primary, text and ordinary action. Options value-chip recipes capture Face/Size separately.","type":"number","editorType":"number","default":24,"nativeDefault":"24","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-ChoiceText","key":"ChoiceText","storageKey":"ChoiceText","label":"ChoiceText","description":"Typography for drawButton kind choice. Its Line comes from active MessageCore ChoiceWindowLineHeight (fallback 24), not this object; native choice drawing retains provider font settings.","type":"struct","editorType":"struct<ChoiceText>","default":{"Face":"CoretoOutfitMedium","Size":18},"nativeDefault":"{\"Face\":\"CoretoOutfitMedium\",\"Size\":18}","availability":"supported","structName":"ChoiceText","fields":[{"id":"DS-P-ChoiceText.Face","key":"Face","storageKey":"Face","label":"Face","description":"ChoiceText font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawButton kind choice. Its Line comes from active MessageCore ChoiceWindowLineHeight (fallback 24), not this object; native choice drawing retains provider font settings.","type":"string","editorType":"string","default":"CoretoOutfitMedium","nativeDefault":"CoretoOutfitMedium","availability":"supported"},{"id":"DS-P-ChoiceText.Size","key":"Size","storageKey":"Size","label":"Size","description":"ChoiceText font size in pixels. Typography for drawButton kind choice. Its Line comes from active MessageCore ChoiceWindowLineHeight (fallback 24), not this object; native choice drawing retains provider font settings.","type":"number","editorType":"number","default":18,"nativeDefault":"18","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Input","key":"Input","storageKey":"Input","label":"Input","description":"Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.","type":"struct","editorType":"struct<Input>","default":{"Face":"CoretoOutfit","Size":18,"Line":24},"nativeDefault":"{\"Face\":\"CoretoOutfit\",\"Size\":18,\"Line\":24}","availability":"supported","structName":"Input","fields":[{"id":"DS-P-Input.Face","key":"Face","storageKey":"Face","label":"Face","description":"Input font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.","type":"string","editorType":"string","default":"CoretoOutfit","nativeDefault":"CoretoOutfit","availability":"supported"},{"id":"DS-P-Input.Size","key":"Size","storageKey":"Size","label":"Size","description":"Input font size in pixels. Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.","type":"number","editorType":"number","default":18,"nativeDefault":"18","availability":"supported","min":0,"max":4096},{"id":"DS-P-Input.Line","key":"Line","storageKey":"Line","label":"Line","description":"Input line height in pixels. Typography for drawField value text. Line is available to explicit style/measure calls; the field itself uses Field.Height.","type":"number","editorType":"number","default":24,"nativeDefault":"24","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Label","key":"Label","storageKey":"Label","label":"Label","description":"Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.","type":"struct","editorType":"struct<Label>","default":{"Face":"CoretoOutfitMedium","Size":16,"Line":20},"nativeDefault":"{\"Face\":\"CoretoOutfitMedium\",\"Size\":16,\"Line\":20}","availability":"supported","structName":"Label","fields":[{"id":"DS-P-Label.Face","key":"Face","storageKey":"Face","label":"Face","description":"Label font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.","type":"string","editorType":"string","default":"CoretoOutfitMedium","nativeDefault":"CoretoOutfitMedium","availability":"supported"},{"id":"DS-P-Label.Size","key":"Size","storageKey":"Size","label":"Size","description":"Label font size in pixels. Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.","type":"number","editorType":"number","default":16,"nativeDefault":"16","availability":"supported","min":0,"max":4096},{"id":"DS-P-Label.Line","key":"Line","storageKey":"Line","label":"Line","description":"Label line height in pixels. Typography for drawField labels. Line is the label height before Field.Gap. Save recipes separately capture Face/Size.","type":"number","editorType":"number","default":20,"nativeDefault":"20","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Helper","key":"Helper","storageKey":"Helper","label":"Helper","description":"Typography for drawField helper/error text, drawCard text and the default measure role.","type":"struct","editorType":"struct<Helper>","default":{"Face":"CoretoOutfit","Size":14,"Line":20},"nativeDefault":"{\"Face\":\"CoretoOutfit\",\"Size\":14,\"Line\":20}","availability":"supported","structName":"Helper","fields":[{"id":"DS-P-Helper.Face","key":"Face","storageKey":"Face","label":"Face","description":"Helper font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Typography for drawField helper/error text, drawCard text and the default measure role.","type":"string","editorType":"string","default":"CoretoOutfit","nativeDefault":"CoretoOutfit","availability":"supported"},{"id":"DS-P-Helper.Size","key":"Size","storageKey":"Size","label":"Size","description":"Helper font size in pixels. Typography for drawField helper/error text, drawCard text and the default measure role.","type":"number","editorType":"number","default":14,"nativeDefault":"14","availability":"supported","min":0,"max":4096},{"id":"DS-P-Helper.Line","key":"Line","storageKey":"Line","label":"Line","description":"Helper line height in pixels. Typography for drawField helper/error text, drawCard text and the default measure role.","type":"number","editorType":"number","default":20,"nativeDefault":"20","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-Icons","key":"Icons","storageKey":"Icons","label":"Icons","description":"System-image basenames loaded at boot for named theme icons. Use existing img/system/<name>.png files without extension. CLI accepts ASCII letters, digits, underscores, spaces and hyphens; it does not copy assets. The complete preset supplies its assets through skills describe game-coreto-eng-design-system.","type":"struct","editorType":"struct<Icons>","default":{"diamond":"CoretoTheme_diamond","error":"CoretoTheme_error","Settings":"CoretoTheme_Settings","Audio":"CoretoTheme_Audio","Language":"CoretoTheme_Language","TextEffects":"CoretoTheme_TextEffects","Music":"CoretoTheme_Music","Ambience":"CoretoTheme_Ambience","Jingle":"CoretoTheme_Jingle","SoundEffects":"CoretoTheme_SoundEffects","Back":"CoretoTheme_Back","Save":"CoretoTheme_Save","Clock":"CoretoTheme_Clock","Conversation":"CoretoTheme_Conversation","Menu":"CoretoTheme_Menu"},"nativeDefault":"{\"diamond\":\"CoretoTheme_diamond\",\"error\":\"CoretoTheme_error\",\"Settings\":\"CoretoTheme_Settings\",\"Audio\":\"CoretoTheme_Audio\",\"Language\":\"CoretoTheme_Language\",\"TextEffects\":\"CoretoTheme_TextEffects\",\"Music\":\"CoretoTheme_Music\",\"Ambience\":\"CoretoTheme_Ambience\",\"Jingle\":\"CoretoTheme_Jingle\",\"SoundEffects\":\"CoretoTheme_SoundEffects\",\"Back\":\"CoretoTheme_Back\",\"Save\":\"CoretoTheme_Save\",\"Clock\":\"CoretoTheme_Clock\",\"Conversation\":\"CoretoTheme_Conversation\",\"Menu\":\"CoretoTheme_Menu\"}","availability":"supported","structName":"Icons","fields":[{"id":"DS-P-Icons.diamond","key":"diamond","storageKey":"diamond","label":"diamond","description":"System-image basename for the diamond icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_diamond","nativeDefault":"CoretoTheme_diamond","availability":"supported"},{"id":"DS-P-Icons.error","key":"error","storageKey":"error","label":"error","description":"System-image basename for the error icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_error","nativeDefault":"CoretoTheme_error","availability":"supported"},{"id":"DS-P-Icons.Settings","key":"Settings","storageKey":"Settings","label":"Settings","description":"System-image basename for the Settings icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Settings","nativeDefault":"CoretoTheme_Settings","availability":"supported"},{"id":"DS-P-Icons.Audio","key":"Audio","storageKey":"Audio","label":"Audio","description":"System-image basename for the Audio icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Audio","nativeDefault":"CoretoTheme_Audio","availability":"supported"},{"id":"DS-P-Icons.Language","key":"Language","storageKey":"Language","label":"Language","description":"System-image basename for the Language icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Language","nativeDefault":"CoretoTheme_Language","availability":"supported"},{"id":"DS-P-Icons.TextEffects","key":"TextEffects","storageKey":"TextEffects","label":"TextEffects","description":"System-image basename for the TextEffects icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_TextEffects","nativeDefault":"CoretoTheme_TextEffects","availability":"supported"},{"id":"DS-P-Icons.Music","key":"Music","storageKey":"Music","label":"Music","description":"System-image basename for the Music icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Music","nativeDefault":"CoretoTheme_Music","availability":"supported"},{"id":"DS-P-Icons.Ambience","key":"Ambience","storageKey":"Ambience","label":"Ambience","description":"System-image basename for the Ambience icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Ambience","nativeDefault":"CoretoTheme_Ambience","availability":"supported"},{"id":"DS-P-Icons.Jingle","key":"Jingle","storageKey":"Jingle","label":"Jingle","description":"System-image basename for the Jingle icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Jingle","nativeDefault":"CoretoTheme_Jingle","availability":"supported"},{"id":"DS-P-Icons.SoundEffects","key":"SoundEffects","storageKey":"SoundEffects","label":"SoundEffects","description":"System-image basename for the SoundEffects icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_SoundEffects","nativeDefault":"CoretoTheme_SoundEffects","availability":"supported"},{"id":"DS-P-Icons.Back","key":"Back","storageKey":"Back","label":"Back","description":"System-image basename for the Back icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Back","nativeDefault":"CoretoTheme_Back","availability":"supported"},{"id":"DS-P-Icons.Save","key":"Save","storageKey":"Save","label":"Save","description":"System-image basename for the Save icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Save","nativeDefault":"CoretoTheme_Save","availability":"supported"},{"id":"DS-P-Icons.Clock","key":"Clock","storageKey":"Clock","label":"Clock","description":"System-image basename for the Clock icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Clock","nativeDefault":"CoretoTheme_Clock","availability":"supported"},{"id":"DS-P-Icons.Conversation","key":"Conversation","storageKey":"Conversation","label":"Conversation","description":"System-image basename for the Conversation icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Conversation","nativeDefault":"CoretoTheme_Conversation","availability":"supported"},{"id":"DS-P-Icons.Menu","key":"Menu","storageKey":"Menu","label":"Menu","description":"System-image basename for the Menu icon, without extension, under img/system/. Loaded at boot. It identifies artwork rather than an IconSet index.","type":"string","editorType":"string","default":"CoretoTheme_Menu","nativeDefault":"CoretoTheme_Menu","availability":"supported"}]},{"id":"DS-P-OptionsLayout","key":"OptionsLayout","storageKey":"OptionsLayout","label":"OptionsLayout","description":"Pixel geometry for OptionsCore category/list rectangles when Windows is true and those provider methods exist. Offsets add to the provider rectangle; margins replace its horizontal bounds.","type":"struct","editorType":"struct<OptionsLayout>","default":{"Margin":28,"CategoryHeight":76,"CategoryOffsetY":16,"ListOffsetY":12,"RowGap":12,"Bottom":20},"nativeDefault":"{\"Margin\":28,\"CategoryHeight\":76,\"CategoryOffsetY\":16,\"ListOffsetY\":12,\"RowGap\":12,\"Bottom\":20}","availability":"supported","structName":"OptionsLayout","fields":[{"id":"DS-P-OptionsLayout.Margin","key":"Margin","storageKey":"Margin","label":"Margin","description":"Left/right margin in pixels for both Options rectangles: x = Margin; width = Graphics.boxWidth - 2 * Margin.","type":"number","editorType":"number","default":28,"nativeDefault":"28","availability":"supported","min":0,"max":4096},{"id":"DS-P-OptionsLayout.CategoryHeight","key":"CategoryHeight","storageKey":"CategoryHeight","label":"CategoryHeight","description":"Replacement category-window height in pixels.","type":"number","editorType":"number","default":76,"nativeDefault":"76","availability":"supported","min":0,"max":4096},{"id":"DS-P-OptionsLayout.CategoryOffsetY","key":"CategoryOffsetY","storageKey":"CategoryOffsetY","label":"CategoryOffsetY","description":"Nonnegative vertical pixels added to the provider category-window y position; positive moves down.","type":"number","editorType":"number","default":16,"nativeDefault":"16","availability":"supported","min":0,"max":4096},{"id":"DS-P-OptionsLayout.ListOffsetY","key":"ListOffsetY","storageKey":"ListOffsetY","label":"ListOffsetY","description":"Nonnegative vertical pixels added to the provider options-list y position; positive moves down.","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096},{"id":"DS-P-OptionsLayout.RowGap","key":"RowGap","storageKey":"RowGap","label":"RowGap","description":"Minimum options-row spacing in pixels: max(RowGap, provider rowSpacing).","type":"number","editorType":"number","default":12,"nativeDefault":"12","availability":"supported","min":0,"max":4096},{"id":"DS-P-OptionsLayout.Bottom","key":"Bottom","storageKey":"Bottom","label":"Bottom","description":"Bottom space in pixels removed from the available options-list height after its y offset; final height has a 160-pixel minimum.","type":"number","editorType":"number","default":20,"nativeDefault":"20","availability":"supported","min":0,"max":4096}]},{"id":"DS-P-PictureRoles","key":"PictureRoles","storageKey":"PictureRoles","label":"PictureRoles","description":"Complete JSON array of {Image,Role} mappings for existing img/pictures/<Image>.png assets, without extension. Images must be unique nonempty ASCII letter/digit/underscore/space/hyphen basenames. [] removes all configured mappings on restart. secondary draws a light button, primary a filled action button, card a static striped surface, panel a rounded panel. The surface replaces the displayed bitmap at the original image dimensions; it does not create pictures, clicks or choices. PictureChoices or an adapter owns interaction. A registered pictures adapter can replace this lookup.","type":"array","editorType":"struct<PictureRole>[]","default":[],"nativeDefault":"[]","availability":"supported","items":{"id":"DS-P-PictureRoles.*","key":"PictureRole","storageKey":"PictureRole","label":"PictureRole","description":"One complete picture-role object. Author the entire array through /PictureRoles; item paths are not separate CLI selectors. The editor item default has an empty Image, which must be replaced by an existing valid basename before CLI insertion.","type":"struct","editorType":"struct","default":{"Image":"","Role":"secondary"},"nativeDefault":"{\"Image\":\"\",\"Role\":\"secondary\"}","availability":"supported","structName":"PictureRole","fields":[{"id":"DS-P-PictureRoles.*.Image","key":"Image","storageKey":"Image","label":"Image","description":"Existing img/pictures image basename without extension; ASCII letters, digits, underscores, spaces and hyphens only. Must be nonempty and unique in /PictureRoles.","type":"string","editorType":"file","default":"","nativeDefault":"","availability":"supported","directory":"img/pictures/"},{"id":"DS-P-PictureRoles.*.Role","key":"Role","storageKey":"Role","label":"Role","description":"secondary = light button; primary = filled action button; card = static striped surface; panel = rounded panel. These replace visual surfaces only; interaction is owned by PictureChoices or a registered adapter.","type":"string","editorType":"select","default":"secondary","nativeDefault":"secondary","availability":"supported","options":["secondary","primary","card","panel"]}]}},{"id":"DS-P-Body","key":"Body","storageKey":"Body","label":"Body","description":"Base font for message and scrolling-text windows when Windows is true. Native fallbackFonts are appended to Face; authored text escape codes can override the base.","type":"struct","editorType":"struct<Body>","default":{"Face":"CoretoOutfit","Size":20},"nativeDefault":"{\"Face\":\"CoretoOutfit\",\"Size\":20}","availability":"supported","structName":"Body","fields":[{"id":"DS-P-Body.Face","key":"Face","storageKey":"Face","label":"Face","description":"Body font-family name (not a filename). Register/load the family through MessageCore or the game before drawing. Base font for message and scrolling-text windows when Windows is true. Native fallbackFonts are appended to Face; authored text escape codes can override the base.","type":"string","editorType":"string","default":"CoretoOutfit","nativeDefault":"CoretoOutfit","availability":"supported"},{"id":"DS-P-Body.Size","key":"Size","storageKey":"Size","label":"Size","description":"Body font size in pixels. Base font for message and scrolling-text windows when Windows is true. Native fallbackFonts are appended to Face; authored text escape codes can override the base.","type":"number","editorType":"number","default":20,"nativeDefault":"20","availability":"supported","min":1,"max":4096}]}],"commands":[],"tags":[],"methods":[{"id":"DS-M-style","key":"style","label":"style","surface":"method","description":"Return typography for a named role. Dialogue uses the current game font; unknown roles throw.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call style(role) with Dialogue, ChoiceText, Title, Section, Speaker, Menu, Action, Input, Label, Helper or Body. It returns a new object with the configured Face/Size and, where defined, Line. Dialogue requires initialized $gameSystem and derives Line = mainFontSize() + 6. ChoiceText derives Line from active MessageCore (fallback 24). Body has no Line; use a role with Line for measure. No special this binding or mutation is required.","returns":"Typography object; unknown configuration names throw.","example":"const heading = CoretoDesignSystem.style(\"Section\");"},{"id":"DS-M-measure","key":"measure","label":"measure","surface":"method","description":"Measure wrapped text on an MZ Bitmap; restores its prior font and text properties.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call measure(bitmap, text, width, role = \"Helper\") with an MZ Bitmap, string-convertible text and available pixel width. Use a role with Face/Size/Line. It wraps at whitespace and explicit newlines, preserves empty lines, and does not split oversized words or interpret escape codes. It measures only: no pixels are drawn. Font/outline/text-color properties are restored after measurement. No special this binding.","returns":"{lines: string[], width: max(0, supplied width), height: lines.length * Line, lineHeight: Line}. Width is the supplied layout width, not the widest glyph extent.","example":"const bitmap = new Bitmap(320, 120);\nconst layout = CoretoDesignSystem.measure(bitmap, \"A short description\", 280, \"Helper\");\nbitmap.destroy();"},{"id":"DS-M-drawButton","key":"drawButton","label":"drawButton","surface":"method","description":"Draw a themed button from its rectangle, label and interaction state.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call drawButton(bitmap, rect, label, state = \"default\", kind = \"menu\", focused = false). rect supplies x/y/width/height in destination bitmap pixels. States are default, hover, selected, selectedHover, pressed, disabled. Kinds menu/choice draw a reserved diamond and left-aligned label; primary draws a filled action button; text omits its resting surface; other kinds use an ordinary action surface. primary/text normalize selected to default and selectedHover to hover; choice normalizes pressed to selected. focused adds an outer gold ring unless disabled. It draws only and creates no hit target/handler. Text is plain, not escape-code markup. Font/color properties are left at the drawn style; no special this binding. The caller owns the destination bitmap and must destroy it when no longer needed.","returns":"undefined; bitmap pixels and text properties are modified.","example":"const bitmap = new Bitmap(320, 80);\nCoretoDesignSystem.drawButton(bitmap, {x:8,y:8,width:280,height:56}, \"Continue\", \"selected\", \"menu\", true);"},{"id":"DS-M-drawField","key":"drawField","label":"drawField","surface":"method","description":"Draw a labeled field with helper or error feedback.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call drawField(bitmap, options) with an MZ Bitmap and object {x,y,width,label,value,helper,state}. Defaults are x=0, y=0, width=480, empty strings and state=\"default\". Coordinates and width are pixels. default draws ordinary border, focused draws focus border, error adds error border/icon when helper is nonempty, disabled changes the fill. Labels/value are plain text; helper wraps on whitespace. It draws a representation, not an editable input, and leaves bitmap font/color properties modified. No special this binding. The caller owns the destination bitmap and must destroy it when no longer needed.","returns":"Number: total drawn field/helper height in pixels; helper text can exceed one line.","example":"const bitmap = new Bitmap(480, 200);\nconst height = CoretoDesignSystem.drawField(bitmap, {x:8,y:8,width:440,label:\"Name\",value:\"Reid\",helper:\"Shown in dialogue\",state:\"focused\"});"},{"id":"DS-M-drawCard","key":"drawCard","label":"drawCard","surface":"method","description":"Draw a card and wrapped text; return the content height.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call drawCard(bitmap, rect, text = \"\", context = \"paper\"). Rectangle coordinates/dimensions are destination bitmap pixels. scene selects cardScene, memorial selects cardMemorial, all other contexts select card. It draws the rectangle/stripe, then plain Helper text with whitespace wrapping; oversized words remain intact. Returned text height may exceed rect.height; allocate enough bitmap space. Font/color properties remain modified; no special this binding. The caller owns the destination bitmap and must destroy it when no longer needed.","returns":"Number: wrapped text height + 2 * Card.PaddingY in pixels; this does not resize the rectangle or bitmap.","example":"const bitmap = new Bitmap(400, 180);\nconst height = CoretoDesignSystem.drawCard(bitmap, {x:0,y:0,width:400,height:180}, \"A memory of the journey\", \"memorial\");"},{"id":"DS-M-drawIcon","key":"drawIcon","label":"drawIcon","surface":"method","description":"Draw a loaded themed icon; pending images are not drawn.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call drawIcon(bitmap, name, x, y, size = 32, color = CoretoDesignSystem.colors.text). name is a key from /Icons, not a filename or IconSet index. x/y are top-left destination pixels; size is height and width preserves source aspect ratio. Unknown or not-yet-ready images draw nothing; call again after loading, no redraw is queued. error, Conversation and diamond retain source colors; others are tinted with the CSS color. Tinted bitmaps are cached (up to 64) until eviction or dispose. No special this binding. The caller owns the destination bitmap and must destroy it when no longer needed.","returns":"undefined; draws into the destination bitmap when the named image is ready.","example":"const bitmap = new Bitmap(80, 80);\nImageManager.loadSystem(CoretoDesignSystem.config.Icons.Save).addLoadListener(() => CoretoDesignSystem.drawIcon(bitmap, \"Save\", 8, 8, 32));"},{"id":"DS-M-drawItemBackground","key":"drawItemBackground","label":"drawItemBackground","surface":"method","description":"Draw the native selectable row background; call with the window as receiver.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call drawItemBackground.call(window, index) with an existing eligible Window_Selectable and valid zero-based item index. This is the only drawing helper that requires a window as this. It draws into contentsBack using itemRect(index), native eligibility, current selection and cached pointer/pressed state; selected title/choice rows also draw a diamond. Windows=false, NameEdit, NumberInput, console and other excluded windows return false. The preset Core Engine drawing callback calls this hook; direct calls draw immediately but do not change selection.","returns":"Boolean: true when this window was themed, false when excluded.","example":"const window = SceneManager._scene._commandWindow;\nif (window && window.index() >= 0) CoretoDesignSystem.drawItemBackground.call(window, window.index());"},{"id":"DS-M-registerAdapter","key":"registerAdapter","label":"registerAdapter","surface":"method","description":"Replace named presentation callbacks: scrollOnPaper, choiceBadgeWidth, pictures, pictureState. Gameplay and persistence remain owned by the caller.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call registerAdapter(object) from a game-owned extension after DesignSystem loads. Function-valued recognized keys replace existing hooks; omitted/non-function keys retain them. Hooks are called automatically as methods of the internal integrations object, so this is not a scene/window. scrollOnPaper(window) returns a boolean for scrolling-text contrast; choiceBadgeWidth(window) returns reserved pixels; pictures(gamePicture, sprite) returns null for no role or {surface,kind,width,height,context?,icon?,interactionPictureId?}; pictureState(sprite, role) returns {active?,disabled?,selected?}. A surface role uses pixel width/height and kind secondary/primary/card/panel. Picture callbacks may run repeatedly during loading and updates; they must not change gameplay state. New functions last across scene changes until replaced or the game restarts; they are not serialized in saves. dispose does not unregister them. Card picture surfaces always use the paper palette; the role context property does not select drawCard contexts. A surface bitmap keeps its created dimensions until the picture is reloaded; changing width/height in a later adapter response does not resize that existing bitmap.","returns":"undefined; replaces only the recognized callbacks supplied as functions.","example":"CoretoDesignSystem.registerAdapter({choiceBadgeWidth(window) { return Number(window.choiceAdornmentWidth?.()) || 0; }});"},{"id":"DS-M-dispose","key":"dispose","label":"dispose","surface":"method","description":"Destroy cached tinted icon bitmaps and clear the cache.","receiver":"CoretoDesignSystem","availability":"supported","context":"MZ runtime after enabled DesignSystem loads; see design-system api describe /Enabled for activation. The CLI only describes this API and never invokes it. Call dispose() to destroy and clear cached tinted icon bitmaps. Original loaded images, picture-owned surfaces, window hooks, configuration and registered adapters remain. Later drawIcon calls can recreate tint entries. Repeated calls on an empty cache do nothing. No arguments or special this binding.","returns":"undefined; clears only the tint cache, not the entire theme.","example":"CoretoDesignSystem.dispose();"}],"limits":"Fonts and theme images are installed by game-coreto-eng-design-system. The complete preset also requires OptionsCore and SaveCore. Parameters are read at boot; restart after authoring. No gameplay or persistence ownership.","apis":[{"id":"DS-A-version","key":"version","label":"version","surface":"property","type":"string","availability":"supported","description":"Installed runtime version.","receiver":"CoretoDesignSystem","context":"Read CoretoDesignSystem.version in the game after Enabled=true initializes the plugin; see design-system api describe /Enabled. CLI discovery does not read a running game. Persisted changes use parameters and restart. Scene changes/save loading do not reload this boot configuration.","example":"const value = CoretoDesignSystem.version;"},{"id":"DS-A-config","key":"config","label":"config","surface":"property","type":"object","availability":"supported","description":"Boot-time configuration merged from catalog defaults and the plugin registry. Missing fields use defaults; arrays replace their defaults. The exported outer API is frozen, but this object is not a persistence or live-update API: use CLI parameter authoring and restart.","receiver":"CoretoDesignSystem","context":"Read CoretoDesignSystem.config in the game after Enabled=true initializes the plugin; see design-system api describe /Enabled. CLI discovery does not read a running game. Persisted changes use parameters and restart. Scene changes/save loading do not reload this boot configuration.","example":"const value = CoretoDesignSystem.config;"},{"id":"DS-A-colors","key":"colors","label":"colors","surface":"property","type":"object","availability":"supported","description":"Surface palette with live getters: panel reads active CoreEngine itemBackColor1, text reads normalColor, heading reads systemColor, and muted follows text. Other surface values come from boot configuration; reading the object does not draw or persist anything.","receiver":"CoretoDesignSystem","context":"Read CoretoDesignSystem.colors in the game after Enabled=true initializes the plugin; see design-system api describe /Enabled. CLI discovery does not read a running game. Persisted changes use parameters and restart. Scene changes/save loading do not reload this boot configuration.","example":"const value = CoretoDesignSystem.colors;"},{"id":"DS-A-fonts","key":"fonts","label":"fonts","surface":"property","type":"object","availability":"supported","description":"Exposed family names: body=CoretoOutfit and medium=CoretoOutfitMedium are fixed, speaker reads Speaker.Face and title reads Title.Face at boot. This does not register/load fonts or mirror a later Body.Face edit.","receiver":"CoretoDesignSystem","context":"Read CoretoDesignSystem.fonts in the game after Enabled=true initializes the plugin; see design-system api describe /Enabled. CLI discovery does not read a running game. Persisted changes use parameters and restart. Scene changes/save loading do not reload this boot configuration.","example":"const value = CoretoDesignSystem.fonts;"}]};
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
        discovery: schema.id ? {id:schema.id} : {}
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
            if (!Object.prototype.hasOwnProperty.call(value, field.key)) valueError(field, undefined, `${path}/${field.key}`, "a value for this field");
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
        // Hand-written arrays such as "[5]" hold JSON numbers where the editor writes "[\"5\"]"; the original plugins accept both.
        if (typeof raw === "number") value = raw;
        else if (typeof raw !== "string" || raw.trim() === "") valueError(schema, raw, path);
        else value = Number(raw);
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
    // A whole-object edit must not reformat an untouched native numeric field.
    if (schema.type === "number" && typeof previous === "string" && previous.trim() !== "" && Number(previous) === value) return previous;
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
  return {lines,width:Math.max(0,width),height:lines.length*s.Line,lineHeight:s.Line};
}
function drawCard(bitmap,rect,text='',context='paper'){
  staticSurface(bitmap,rect,context);
  const s=style('Helper'),layout=measure(bitmap,text,rect.width-config.Card.TextInset-config.Card.PaddingRight,'Helper');
  textStyle(bitmap,s.Face,s.Size,colors.text);
  layout.lines.forEach((line,i)=>bitmap.drawText(line,rect.x+config.Card.TextInset,rect.y+config.Card.PaddingY+i*s.Line,layout.width,s.Line));
  return layout.height+config.Card.PaddingY*2;
}
globalThis.CoretoDesignSystem=Object.freeze({version:'1.3.0',colors,fonts,config,style,measure,registerAdapter,
  drawButton,drawField,drawCard,drawIcon:menuIcon,
  drawItemBackground:typeof drawItemBackground==='function'?drawItemBackground:null,
  dispose(){for(const bitmap of tintedIcons.values())bitmap.destroy();tintedIcons.clear();}
});

})();
