/*:
 * @target MZ
 * @plugindesc [Coreto] [Tier 5] [Version 1.6.1] [DesignSystem]
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
 * Design System 1.6.1. Requires CoreEngine, MessageCore and ExtMessageFunc; load after providers.
 * Install the complete package with node cli.mjs install --preset dryland --project <game> --coreto-cli <cli>.
 * Use --dry-run to preview; use coreto-default for other consumers. See docs/integration.md in the package.
 * Author parameters through the Coreto CLI. Restart after parameter changes.
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
 * @desc Visual dimensions captured into the delivered Options/Save drawing recipes. Editing these DesignSystem parameters alone does not rewrite provider callbacks. See package docs/integration.md for preset ownership and reapplication.
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
 * @desc System-image basenames loaded at boot for named theme icons. Use existing img/system/<name>.png files without extension. CLI accepts ASCII letters, digits, underscores, spaces and hyphens; it does not copy assets. The independent package installer supplies the complete preset assets.
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
