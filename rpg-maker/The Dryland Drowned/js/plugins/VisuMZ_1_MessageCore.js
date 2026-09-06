//=============================================================================
// VisuStella MZ - Message Core
// VisuMZ_1_MessageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_MessageCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MessageCore = VisuMZ.MessageCore || {};
VisuMZ.MessageCore.version = 1.57;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.57] [MessageCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Message_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Message Core plugin extends and builds upon the message functionality of
 * RPG Maker MZ and allows you, the game dev, to customize the workflow for
 * your game's message system.
 *
 * Features include all (but not limited to) the following:
 *
 * * Control over general message settings.
 * * Auto-Color key words and/or database entries.
 * * Increases the text codes available to perform newer functions/effects.
 * * Ability for you to implement custom Text Code actions.
 * * Ability for you to implement custom Text code string replacements.
 * * Invoke a macro system to speed up the dev process.
 * * Add a Text Speed option to the Options menu.
 * * Add the ever so useful Word Wrap to your message system.
 * * Extend the choice selection process to your liking.
 * * The ability to enable/disable as well as show/hide certain choices.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Dim Background Extension
 * 
 * Before, when using the Dim Background as a part of a Show Text event, its
 * size is only the same as the message window's width itself. This looked
 * really ugly because it had hard edges cutting off while gradients are seen
 * elsewhere. To make it look better, we extended the dimmed background to span
 * the width of the screen instead.
 * 
 * ---
 * 
 * Extended Messages
 * 
 * If you decide to expand the size of the message window to allow for more
 * rows to be displayed, you can type in the data for them by chaining together
 * Show Message events. They will take data from each other and display them in
 * the same message window as long as there are enough rows.
 * 
 * ---
 *
 * Extended Choice Lists
 * 
 * Choice lists can be extended by just chaining one Choice List event after
 * the other in succession along the same indentation. They do not extend if
 * there is any event other than a Choice List option between them on the same
 * indentation level.
 *
 * ---
 *
 * ============================================================================
 * Text Language Information
 * ============================================================================
 *
 * As of Message Core version 1.46, Text Language has been added. 
 * 
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * As of Message Core version 1.53, we've decided to add support for TSV.
 * 
 * This is because we have done our research and decided that CSV's are too
 * restricted to use due to their default nature of wanting to use commas as
 * separators. Thus, we've decided to switch to TSV where the default separator
 * is a tab space, something that is almost never used in RPG Maker text.
 *
 * ---
 * 
 * === How to Enable Switching ===
 * 
 * Text Language is NOT enabled by default. Here's what you have to do:
 * 
 * #1. Open up the Message Core's Plugin Parameters
 * #2. Plugin Parameters > Text Language Settings > Enable Switching?
 * #3. Change the "Enable Switching?" parameter setting to "true".
 * #4. Adjust any other settings as needed.
 * #5. Save the Plugin Parameter changes.
 * #6. Save your game.
 * 
 * Now, it's time to get the CSV/TSV file that will contain all of the text
 * used to translate your game's script.
 * 
 * #1. Play test your game. Make sure Play test mode is NOT disabled.
 * #2. A popup will appear asking to create a language CSV/TSV file.
 * #3. Click "OK" and let the plugin do its thing.
 * #4. The project's /data/ folder will appear with Language.csv/tsv made.
 * #5. The plugin will then ask you to restart your game.
 * 
 * '''IMPORTANT!''' The separator used for the CSV file must be a semicolon (;)
 * and not a comma (,) as to reduce the amount of punctuation conflicts. Keep
 * this in mind as most CSV editors will default to comma (,) instead of the
 * semicolon (;) for their separator.
 * 
 * ---
 * 
 * === How to Edit the Language CSV/TSV ===
 * 
 * The Language CSV/TSV is structured as a normal CSV/TSV file would be, which
 * also means it can be modified in programs like Microsoft Excel or Google
 * Sheets. We recommend using either of those programs to modify the text.
 * 
 * We do not recommend modifying the CSV/TSV file in programs like notepad
 * directly due to the way certain things like commas (,) and tabs are handled
 * and how easy it is to be error-prone.
 * 
 * The table will appear something like this at first:
 * 
 *     Key        English    Chinese    Japanese     Korean
 *     Greeting   Hello      你好       こんにちは    안녕하세요
 *     Farewell   Good-bye   再见       さようなら    안녕히
 *     Wow        Wow        哇         ワオ          와우
 * 
 * The "Key" column refers to the reference key used to determine which lines
 * will be inserted into the text. The columns with the languages will utilize
 * the respective phrases for that language.
 * 
 * You can remove columns containing languages that you aren't planning to
 * translate for your game.
 * 
 * ---
 * 
 * === Things to Keep in Mind ===
 * 
 * When adding text to the CSV/TSV file via the spreadsheet editor (Excel or
 * Google Sheets), there's a few things to keep in mind.
 * 
 * ---
 * 
 * ==== How to Load the CSV/TSV in Google Sheets ====
 * 
 * If you are using Google Sheets and wish to edit the CSV/TSV without it
 * converting all the separators into commas, here's what you do:
 * 
 * #1. Go to "https://sheets.google.com"
 * #2. Create a "Blank spreadsheet"
 * #3. File > Import > Upload > Select the CSV/TSV file that was created in
 *     your game project's /data/ folder. You may need to select "All Files"
 *     for file type if uploading a TSV.
 * #4. For "Separator Type", if you are using CSV, change it to "Custom" and
 *     insert the Semicolon ";". Otherwise, if you are using TSV, select "tab"
 *     as your separator type.
 * #5. Uncheck "Convert text to numbers, dates, and formulas"
 * 
 * ==== How to Load the CSV/TSV in VS Code ===
 * 
 * #1. Go to "https://code.visualstudio.com/"
 * #2. Download and install it
 * #3. Open up VS Code and go to View > Extensions
 * #4. Search for an extension called "Edit CSV"
 * #5. Load the CSV/TSV file into VS Code and view with the CSV Editor
 * #6. Click the button that says "Edit CSV" in the upper right
 * 
 * ==== Line Breaks ====
 * 
 * When you want to insert line breaks into the translated phrases, use the
 * <br> text code. This is best used for text that is to be transferred into
 * the message window or help window.
 * 
 * ==== Text Codes ====
 * 
 * Text codes like \C[2] can be inserted normally. However, they only work in
 * windows that support text codes, such as the message window or help window.
 * Otherwise, the text codes will not transfer over properly.
 * 
 * ==== Semicolons (CSV Only) ====
 * 
 * Due to the nature of the CSV file, we used the semicolon (;) as the
 * separator. As such, semicolons should not be used in the text entries.
 * Though some sentences will work with the semicolon, not all of them will. If
 * you do want to use a semicolon, use the text code <semicolon> instead.
 * 
 *   Example:
 * 
 *   "The pancakes were delicious<semicolon> they were fluffy and sweet."
 * 
 * Other variations of the semicolon text code are <semi> and <semi-colon>.
 * The <semicolon> text code and variants only work with the Language CSV and
 * are ignored otherwise when typed in a regular message box entry.
 * 
 * ---
 * 
 * ==== Macros and Language Switches ====
 * 
 * For those using both text macros and text language switches, macros will be
 * converted to text before language switches as it allows for better text
 * transitions that way.
 * 
 * ---
 * 
 * === How to Use the Reference Keys ===
 * 
 * Remember the "Key" column and the reference keys? Those are used to
 * determine which lines will be inserted into the text for the message window
 * and just about any other window. However, there's a specific way these keys
 * must be used in order for them to work.
 * 
 * The "text code" format works like this. Use any of the following:
 * 
 *   \tl{keyName}
 *   \translate{keyName}
 *   \loc{keyName}
 *   \locale{keyName}
 *   \localize{keyName}
 * 
 * or for those coming from different translation plugins but want to switch
 * over to the VisuStella MZ Message Core's translation system:
 * 
 *   ${keyName}
 * 
 * For example, to use one of the default keys made with the Language CSV/TSV:
 * 
 *   \tl{Greeting}
 * 
 * This will yield "Hello" in English, "你好" in Chinese, "こんにちは" in
 * Japanese, and "안녕하세요" in Korean.
 * 
 * Key names are not case sensitive and any trailing spaces will be removed
 * from them in order to make sure the CSV/TSV table is stable to reference any
 * translated text from.
 * 
 * You can insert these language "text codes" into item names, skill names,
 * etc. as well as system entries like for Attack, Defense, etc.
 * 
 * ---
 * 
 * === Naming Weapon Types, Armor Types, Equip Types, Item Categories ===
 * 
 * You might have noticed that if you've decided to use \tl{keyName} for weapon
 * or other database types, other parts of the game will error out. Don't
 * worry, for these, you don't have to change the currently used database name.
 * Go straight to the CSV/TSV and insert in a new key for that particular
 * database name. For example, the equip type "Accessory" will use "Accessory"
 * as the automatic key to look for a translated phrase. If there isn't any in
 * the CSV/TSV file, then the default database text entry will be used.
 * 
 * ---
 *
 * ============================================================================
 * Available Text Codes
 * ============================================================================
 *
 * The following are text codes that you may use with this plugin. Some of
 * these are original text codes provided by RPG Maker MZ, while others are
 * new text codes added through this plugin. You may even add your own text
 * codes through the plugin parameters.
 *
 * === RPG Maker MZ Text Codes ===
 *
 * The following are text codes that come with RPG Maker MZ. These text codes
 * cannot be edited through the Plugin Parameters.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \V[x]                Replaced by the value of variable 'x'.
 * \N[x]                Replaced by the name of actor 'x'.
 * \P[x]                Replaced by the name of party member 'x'.
 * \C[x]                Draw the subsequent text with window skin color 'x'.
 * \I[x]                Draw icon 'x'.
 *
 * \PX[x]               Moves text x position to 'x'.
 * \PY[x]               Moves text y position to 'y'.
 *
 * \G                   Replaced by the currency unit.
 *
 * \{                   Increase the text font size by one step.
 * \}                   Decrease the text font size by one step.
 * \FS[x]               Changes the text font size to 'x'.
 *
 * \\                   Replaced by the backslash character.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \$                   Opens the gold window.
 * \.                   Waits a 1/4 second.
 * \|                   Waits a full second.
 * \!                   Waits for button input.
 * \>                   Display remaining text on same line all at once.
 * \<                   Cancel the effect that displays text all at once.
 * \^                   Do not wait for input after displaying text to move on.
 *
 * ---
 *
 * === Message Core Hard-Coded Text Codes ===
 *
 * The following text codes are hard-coded into VisuStella MZ Message Core's
 * code. These text codes cannot be edited through the Plugin Parameters.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <b>                  Makes subsequent text bold.
 * </b>                 Removes bold from subsequent text.
 * <i>                  Makes subsequent text italic.
 * </i>                 Removes italic from subsequent text.
 * 
 * <left>               Makes subsequent text left-aligned. *Note1*
 * </left>              Removes left-alignment for subsequent text.
 * <center>             Makes subsequent text center-aligned. *Note1*
 * </center>            Removes center-alignment for subsequent text.
 * <right>              Makes subsequent text right-aligned. *Note1*
 * </right>             Removes right-alignment for subsequent text.
 *
 * Note1: Use at line-start. Does not work with Word Wrap.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 *
 * <ColorLock>          Text codes can't change text color for subsequent text.
 * </ColorLock>         Removes Color Lock property.
 *
 * <WordWrap>           Enables Word Wrap for this window. *Note2*
 * </WordWrap>          Disables Word Wrap for this window. *Note2*
 * <br>                 Adds a line break. Requires Word Wrap enabled.
 * <line break>         Adds a line break. Requires Word Wrap enabled.
 *
 * Note2: Some windows cannot use Word Wrap such as the Choice Window.
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 *
 * \picture<x>          Draws picture x (filename) at current text position.
 * \CenterPicture<x>    Draws picture x (filename) centered at the window.
 * 
 * While these text codes are available globally, they are best suited for use
 * in the message window or any other window that does not change its contents.
 * The reason being is because the picture drawn is drawn into the background
 * of the window.
 * 
 * Therefore, we do not recommend using this in windows that change contents
 * often like Help Windows or Quest Descriptions. Instead, we recommend using
 * icons instead.
 * 
 * As of the version 1.53 update, the Help Window now supports both of these
 * text codes. However, we still recommend using icons over using pictures as
 * there will be loading delays.
 *
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Map Name)
 * ------------------   -------------------------------------------------------
 * <left>               Makes map name align to left side of screen.
 * <center>             Makes map name align to horizontally center of screen.
 * <right>              Makes map name align to right side of screen.
 * 
 * <top>                Makes map name align to top of screen.
 * <middle>             Makes map name align to vertically middle of screen.
 * <bottom>             Makes map name align to bottom of screen.
 * 
 * <X: +n>              Adjusts the horizontal position of map name by n.
 * <X: -n>              Adjusts the horizontal position of map name by n.
 * 
 * <Y: +n>              Adjusts the vertical position of map name by n.
 * <Y: -n>              Adjusts the vertical position of map name by n.
 * 
 * Note: All of these text codes require VisuMZ_0_CoreEngine installed and its
 * "Map Name Text Code" plugin parameter enabled.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * <Caps>               Makes all text after this capitalized.
 *                      Turns off other auto-text case modes.
 *                      ie: "hello world" becomes "HELLO WORLD"
 * </Caps>              Turns off auto text-casing effects.
 * 
 * <Upper>              Makes the first letter of any word after a space to be
 *                      capitalized. Other letters are left alone.
 *                      Turns off other auto-text case modes.
 *                      ie. "old mcDonald" becomes "Old McDonald"
 * </Upper>             Turns off auto text-casing effects.
 * 
 * <Lower>              Makes all text after this lowercase.
 *                      Turns off other auto-text case modes.
 *                      ie: "THE QUICK BROWN FOX" becomes "the quick brown fox"
 * </Lower>             Turns off auto text-casing effects.
 * 
 * <Alt>                Makes all text after this alternate between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Hello" becomes "HeLlO"
 * </Alt>               Turns off auto text-casing effects.
 * 
 * <Chaos>              Makes all text after this randomize between uppercase
 *                      and lowercase. Turns off other auto-text case modes.
 *                      ie: "Wassup" becomes "waSsUP" or "WasSuP"
 * </Chaos>             Turns off auto text-casing effects.
 * 
 * **Clarity:** In case you're wondering, the text codes </Caps>, </Upper>,
 * </Lower>, </Alt>, and </Chaos> all do the same thing and can be used
 * interchangeably with each other. For example, you can do this:
 * <Caps>hello world</Lower> and it would still accomplish the same effect, but
 * you won't do that because you're not a monster of a developer.
 * 
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \CommonEvent[x]      Runs common event x when text code is reached.
 * \Wait[x]             Makes the message wait x frames before continuing.
 * 
 * <Next Page>          Ends the current message page at this line. This is
 *                      used for messages when rows are at 5 or above and the
 *                      message lines don't match the amount. This is used to
 *                      prevent grabbing message windows from following message
 *                      events. Any lines following <Next Page> in the same
 *                      message event will be ignored.
 * 
 * <Auto>               Resizes message window dimensions to fit text. *Note3*
 * <Auto Width>         Resizes message window width to fit text. *Note3*
 * <Auto Height>        Resizes message window height to fit text. *Note3*
 * 
 * <Auto Actor: x>      Resizes message window and positions it over actor x
 *                      sprite's head. *Note3*
 * <Auto Party: x>      Resizes message window and positions it over party
 *                      member x sprite's head. *Note3*
 * <Auto Player>        Map-Only. Resizes message window and positions it over
 *                      the player sprite's head. *Note3*
 * <Auto Event: x>      Map-Only. Resizes message window and positions it over
 *                      event x sprite's head. *Note3*
 * <Auto Enemy: x>      Battle-Only. Resizes message window and positions it
 *                      over enemy x sprite's head. *Note3*
 *
 * Note3: Upon using these text codes, the message window's settings will be
 * reset for the upcoming message. These effects do not work with Word Wrap.
 *
 * ---
 *
 * ----------------------------   ---------------------------------------------
 * Text Code                      Effect (Battle Only)
 * ----------------------------   ---------------------------------------------
 * <Current Battle Target>        Replaces text code with the current target of
 *                                an action in battle.
 * <Current Battle User>          Replaces text code with the currently active
 *                                user in battle.
 * <Current Battle Action>        Replaces text code with the current battle
 *                                action's name with an icon in front.
 * <Current Battle Action Name>   Replaces text code with the current battle
 *                                action's name without an icon.
 * 
 * If there is no battle, no target, no user, or no action, then the text code
 * will just be replaced with no text.
 * 
 * These text codes are NOT recommended to be used inside of Help Descriptions.
 * They are best used with "Show Text" event commands.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Effect (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * <Show>                         Choice is always shown.
 * <Show Switch: x>               Choice shown if switch x is ON.
 * <Show Switches: x,x,x>         Choice shown if the x switches are all ON.
 * <Show All Switches: x,x,x>     Choice shown if the x switches are all ON.
 * <Show Any Switches: x,x,x>     Choice shown if any of x switches are ON.
 *
 * <Hide>                         Choice is always hidden.
 * <Hide Switch: x>               Choice hidden if switch x is ON.
 * <Hide Switches: x,x,x>         Choice hidden if the x switches are all ON.
 * <Hide All Switches: x,x,x>     Choice hidden if the x switches are all ON.
 * <Hide Any Switches: x,x,x>     Choice hidden if any of x switches are ON.
 *
 * <Enable>                       Choice is always enabled.
 * <Enable Switch: x>             Choice enabled if switch x is ON.
 * <Enable Switches: x,x,x>       Choice enabled if the x switches are all ON.
 * <Enable All Switches: x,x,x>   Choice enabled if the x switches are all ON.
 * <Enable Any Switches: x,x,x>   Choice enabled if any of x switches are ON.
 *
 * <Disable>                      Choice is always disabled.
 * <Disable Switch: x>            Choice disabled if switch x is ON.
 * <Disable Switches: x,x,x>      Choice disabled if the x switches are all ON.
 * <Disable All Switches: x,x,x>  Choice disabled if the x switches are all ON.
 * <Disable Any Switches: x,x,x>  Choice disabled if any of x switches are ON.
 * 
 * <Choice Width: x>              Sets the minimum text area width to x.
 *                                Applies to whole choice window.
 * <Choice Indent: x>             Sets the indent to x value. Applies to
 *                                current choice selection only.
 * 
 * <BgColor: x>                   Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' text color. This
 *                                will be combined with a fading
 * <BgColor: x,y>                 Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to 'x' to 'y' gradient
 *                                text color.
 * <BgColor: #rrggbb>             Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' color using
 *                                hex color values.
 * <BgColor: #rrggbb, #rrggbb>    Requires VisuMZ_0_CoreEngine! Sets background
 *                                color of this choice to '#rrggbb' gradient
 *                                using hex color values.
 * 
 * <Help> text </Help>            Makes a help window appear and have it show
 *                                'text' in its contents. The help window will
 *                                disappear if no text is displayed.
 * 
 * <Shuffle>                      Shuffles the order of all choices. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 * <Shuffle: x>                   Shuffles the order of all choices and only
 *                                x number of them will appear. Any cancel
 *                                shortcuts other than "Branch" will be undone.
 *                                Hidden choices do not count towards x number.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Background Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <BgImg: filename>              Creates a background image from img/pictures/
 *                                stretched across the choice rectangle.
 * <BgImg LowerLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <BgImg LowerCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <BgImg LowerRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <BgImg MidLeft: filename>      Creates a background image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <BgImg Center: filename>       Creates a background image from img/pictures/
 *                                scaled to the center of choice rect.
 * <BgImg MidRight: filename>     Creates a background image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <BgImg UpperLeft: filename>    Creates a background image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <BgImg UpperCenter: filename>  Creates a background image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <BgImg UpperRight: filename>   Creates a background image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <BgImg: filename> text code variants, even if the background
 * image is smaller than the choice contents, it will overscale to match its
 * choice rectangle dimensions.
 * 
 * *Note:* Using a background image will clear the dimmed background rectangle
 * that is normally behind each selectable choice.
 * 
 * *Note:* Each choice can only have one background image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the background will appear behind the select cursor.
 *
 * ---
 *
 * -----------------------------  ---------------------------------------------
 * Text Code                      Foreground Effects (Choice Window Only)
 * -----------------------------  ---------------------------------------------
 * 
 * <FgImg: filename>              Creates a foreground image from img/pictures/
 *                                stretched across the choice rectangle.
 * <FgImg LowerLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the lower left of choice rect.
 * <FgImg LowerCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the lower center of choice rect.
 * <FgImg LowerRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the lower right of choice rect.
 * <FgImg MidLeft: filename>      Creates a foreground image from img/pictures/
 *                                scaled to the middle left of choice rect.
 * <FgImg Center: filename>       Creates a foreground image from img/pictures/
 *                                scaled to the center of choice rect.
 * <FgImg MidRight: filename>     Creates a foreground image from img/pictures/
 *                                scaled to the middle right of choice rect.
 * <FgImg UpperLeft: filename>    Creates a foreground image from img/pictures/
 *                                scaled to the upper left of choice rect.
 * <FgImg UpperCenter: filename>  Creates a foreground image from img/pictures/
 *                                scaled to the upper center of choice rect.
 * <FgImg UpperRight: filename>   Creates a foreground image from img/pictures/
 *                                scaled to the upper right of choice rect.
 * 
 * *Note:* For the <FgImg: filename> text code variants, unlike the background
 * variant, the foreground image will not overscale past its original size.
 * Instead, it will maintain its original size or be smaller, so long as it can
 * be scaled to exist within the choice rectangle unless it is intended to be
 * stretched by using the <FgImg: filename> variant.
 * 
 * *Note:* Text is then written on top of the foreground image.
 * 
 * *Note:* Each choice can only have one foreground image but can use a
 * combination of one background and one foreground image.
 * 
 * *Note:* Images in the foreground will appear behind the select cursor.
 *
 * ---
 *
 * -----------------  ---------------------------------------------------------
 * Text Code          Effect (Name Window Only)
 * -----------------  ---------------------------------------------------------
 * <Left>             Positions the name box window to the left.
 * <Center>           Positions the name box window to the center.
 * <Right>            Positions the name box window to the right.
 * <Position: x>      Replace 'x' with a number from 0 to 10. This positions
 *                    the name box window on the screen relative to the
 *                    position of the value 'x' represents.
 * \NormalBG          Changes background type of window to normal type.
 * \DimBG             Changes background type of window to dim type.
 * \TransparentBG     Changes background type of window to transparent type.
 *
 * ---
 * 
 * -------------------------------   ------------------------------------------
 * Text Code                         Effect (Message Window Only)
 * -------------------------------   ------------------------------------------
 * 
 * <Position: x, y, width, height>   Forces the message window to exact listed
 *                                   coordinates and dimensions. Replace each
 *                                   of the arguments with numbers. *Note*
 * 
 * <Coordinates: x, y>               Forces the message window to the exact
 *                                   listed coordinates. Replace each of the
 *                                   arguments with numbers. *Note*
 * 
 * <Dimensions: width, height>       Forces the message window size to the
 *                                   exact listed dimensions. Replace each of
 *                                   the arguments with numbers. *Note*
 * 
 * <Offset: +x, +y>                  Quickly adjust the message window offset
 * <Offset: -x, -y>                  values to the x and y amounts. The values
 * <Offset: +x, -y>                  will replace the previous offset settings
 * <Offset: -x, +y>                  if there were any.
 * 
 * *NOTE* These text codes do not work with Word Wrap.
 * 
 * ---
 * 
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Requires VisuMZ_0_CoreEngine)
 * ------------------   -------------------------------------------------------
 * <Up Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Left Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Right Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Down Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * <Ok Button>          Display's VisuMZ_0_CoreEngine's button assist text.
 * <Cancel Button>      Display's VisuMZ_0_CoreEngine's button assist text.
 * <Shift Button>       Display's VisuMZ_0_CoreEngine's button assist text.
 * <Menu Button>        Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Up Button>     Display's VisuMZ_0_CoreEngine's button assist text.
 * <Page Down Button>   Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * ---
 * 
 * === Random Text Pool ===
 * 
 * <RNG> text1 | text2 | text3 </RNG>
 * 
 * Using the above text code format in a Show Message entry, you can get a
 * random result out of the various inserted texts. Use "|" (without quotes) as
 * a separator between text entries. You can have unlimited entries. The result
 * will have any excess white space trimmed.
 * 
 * This text code cannot be inserted into a macro and parsed properly.
 * 
 * ---
 *
 * === Message Core Customizable Text Codes ===
 *
 * The following text codes can be altered through the Message Core's various
 * Plugin Parameters to adjust replacements and actions.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Global)
 * ------------------   -------------------------------------------------------
 * \Class[x]            Draws class x's icon (if have) and name.
 * \ClassName[x]        Draws class x's name only.
 *
 * \Skill[x]            Draws skill x's icon (if have) and name.
 * \SkillName[x]        Draws skill x's name only.
 *
 * \Item[x]             Draws item x's icon (if have) and name.
 * \ItemName[x]         Draws item x's name only.
 * \ItemQuantity[x]     Inserts the number of item x's owned by the party.
 *
 * \Weapon[x]           Draws weapon x's icon (if have) and name.
 * \WeaponName[x]       Draws weapon x's name only.
 * \WeaponQuantity[x]   Inserts the number of weapon x's owned by the party.
 *
 * \Armor[x]            Draws armor x's icon (if have) and name.
 * \ArmorName[x]        Draws armor x's name only.
 * \ArmorQuantity[x]    Inserts the number of armor x's owned by the party.
 *
 * \LastGainObj         Draws the icon + name of the last party-gained object.
 * \LastGainObjName     Draws the name of the last party-gained object.
 * \LastGainObjQuantity Inserts the quantity of the last party-gained object.
 *
 * \State[x]            Draws state x's icon (if have) and name.
 * \StateName[x]        Draws state x's name only.
 *
 * \Enemy[x]            Draws enemy x's icon (if have) and name.
 * \EnemyName[x]        Draws enemy x's name only.
 *
 * \Troop[x]            Draws troop x's icon (if have) and name.
 * \TroopName[x]        Draws troop x's name only.
 *
 * \TroopMember[x]      Draws troop member x's icon (if have) and name. *Note1*
 * \TroopNameMember[x]  Draws troop member x's name only. *Note1*
 * 
 * Note1: Only works in battle.
 *
 * \NormalBG            Changes background type of window to normal type.
 * \DimBG               Changes background type of window to dim type.
 * \TransparentBG       Changes background type of window to transparent type.
 *
 * \FontChange<x>       Changes font face to x font name.
 * \ResetFont           Resets font settings.
 *
 * \ResetColor          Resets color settings.
 * \HexColor<x>         Changes text color to x hex color (ie. #123abc).
 * \OutlineColor[x]     Changes outline color to text color x.
 * \OutlineHexColor<x>  Changes outline color to x hex color (ie. #123abc).
 * \OutlineWidth[x]     Changes outline width to x thickness.
 * 
 * \WindowMoveTo<?>     Moves window to exact coordinates. *Note2*
 * \WindowMoveBy<?>     Moves window by relative values. *Note2*
 * \WindowReset         Resets window position to original position.
 *
 * Note2: Replace '?' with the following format:
 *   targetX, targetY, targetWidth, targetHeight, duration, easingType
 *   Only targetX and targetY are required arguments. These will only alter the
 *   window dimensions when the text has arrived at that point. They will not
 *   alter the window preemptively. This is not used as a window positioner.
 *   Use the <Position: x, y, width, height> text code for that.
 *
 * ---
 *
 * ------------------   -------------------------------------------------------
 * Text Code            Effect (Message Window Only)
 * ------------------   -------------------------------------------------------
 * \ActorFace[x]        Inserts actor x's face into the Message Window.
 * \PartyFace[x]        Inserts party member x's face into the Message Window.
 * \ChangeFace<x,y>     Changes message face to x filename, y index. *Note2*
 * \FaceIndex[x]        Changes message face index to x.
 *
 * \TextDelay[x]        Sets delay in frames between characters to x frames.
 * 
 * Note: These text codes only work with the Message Window. Keep in mind that
 *   even if some windows might look like the Message Window, it may not
 *   necessarily be one.
 * 
 * Note2: This text code is used under the assumption that you are using an
 * existing face graphic to change from (doesn't matter which). The text code
 * will not automatically shift text from no-face graphic to having a face
 * graphic mid-message.
 * 
 * ---
 * 
 * As these text codes can be added, removed, and/or altered, their functions
 * may or may not be the same depending on how you've altered them. VisuStella
 * is not responsible for any errors caused by changes made to pre-made text
 * codes nor any new text codes they did not make.
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Message Plugin Commands ===
 * 
 * ---
 *
 * Message: Properties
 *   Change the various properties of the Message Window.
 *
 *   Rows:
 *   - Change the number of Message Window rows.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Width: 
 *   - Change the Message Window width in pixels.
 *   - Leave at 0 to keep it unchanged.
 *
 *   Word Wrap:
 *   - Enable or disable Word Wrap for the Message Window?
 *
 * ---
 * 
 * Message: Randomize Text
 * - Takes message from random pool and stores into variable.
 * - Display stored random message with \V[x] text code.
 * 
 *   Random Messages:
 *   - A list of random messages to display.
 *   - Text codes allowed.
 * 
 *   Variable ID:
 *   - Select which variable to store the random message.
 * 
 * ---
 * 
 * Message: X/Y Offsets
 * - Change the X and Y Offsets of the Message Window.
 * - The offset value(s) will be saved and stored.
 * 
 *   Offset X:
 *   - Offset Message Window horizontally.
 *   - Negative: Left; Positive: Right
 *   - Message Window coordinates are still restricted via clamping.
 * 
 *   Offset Y:
 *   - Offset Message Window vertically.
 *   - Negative: Up; Positive: Down
 *   - Message Window coordinates are still restricted via clamping.
 * 
 * ---
 * 
 * === Choice Plugin Commands ===
 * 
 * ---
 * 
 * Choices: Distance
 * - Change the distance from choice window to the message window.
 * 
 *   Distance:
 *   - Change distance between the choice and message windows.
 *   - Default distance is 0.
 *   - Use negative to center align with remaining space.
 * 
 * ---
 *
 * Choices: Properties
 * - Change the properties found in the Show Choices event command.
 *
 *   Line Height:
 *   - Change the line height for the show choices.
 *   - Leave at 0 to keep this unchanged.
 * 
 *   Minimum Choice Width:
 *   - What is the minimum width size for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of choice rows to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Max Columns:
 *   - Maximum number of choice columns to be displayed.
 *   - Leave at 0 to keep this unchanged.
 *
 *   Text Alignment:
 *   - Text alignment for Show Choice window.
 *
 * ---
 * 
 * === Select Plugin Commands ===
 * 
 * ---
 * 
 * Select: Weapon
 * - Opens the Event Select Item Window to let the player pick a weapon to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected weapon.
 *   - It will result in 0 otherwise.
 * 
 *   Weapon Type ID:
 *   - Reduce all the weapons to a specific weapon type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Armor
 * - Opens the Event Select Item Window to let the player pick an armor to
 *   choose from.
 * - Can be opened while the Message Window is open.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected armor.
 *   - It will result in 0 otherwise.
 * 
 *   Armor Type ID:
 *   - Reduce all the armors to a specific armor type.
 *   - Leave at 0 to not use filters.
 * 
 *   Equip Type ID:
 *   - Reduce all the armors to a specific equip type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * Select: Skill
 * - Opens the Event Select Item Window to let the player pick a skill to
 *   choose from.
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Can be opened while the Message Window is open.
 * - Skills will not be listed if they are hidden by the actor.
 * - Skills will not be listed if the actor lacks access to their Skill Type.
 * 
 *   Variable ID:
 *   - This variable will be used to record the ID of the selected skill.
 *   - It will result in 0 otherwise.
 * 
 *   Actor ID:
 *   - Select an actor to get the skill list from.
 *   - Use 0 to select from the party leader.
 * 
 *   Skill Type ID:
 *   - Reduce all the skills to a specific skill type.
 *   - Leave at 0 to not use filters.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Change Text
 * - Change text for target picture(s) to show.
 * - You may use text codes.
 * - Text will adapt to picture's properties.
 * - Settings will be erased if picture is erased.
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to set text to.
 * 
 *   Padding:
 *   - How much padding from the sides should there be?
 * 
 *   Text:
 * 
 *     Upper Left:
 *     Upper Center:
 *     Upper Right:
 *     Middle Left:
 *     Middle Center:
 *     Middle Right:
 *     Lower Left:
 *     Lower Center:
 *     Lower Right:
 *     - The text that's aligned to this picture's side.
 *     - You may use text codes.
 * 
 * ---
 * 
 * Picture: Erase Text
 * - Erase all text for target picture(s).
 * 
 *   Picture ID(s):
 *   - The ID(s) of the picture(s) to erase text for.
 * 
 * ---
 * 
 * Picture: Refresh Text
 * - Refreshes the text used for all on-screen pictures.
 * - To be used if any dynamic text codes are updated like \n[x].
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings involving the message system. These settings range from
 * adjust how the Message Window looks to more intricate settings like how
 * some of the default text codes work.
 *
 * ---
 *
 * Message Window
 *
 *   Default Rows:
 *   - Default number of rows to display for the Message Window.
 *
 *   Default Width:
 *   - Default Message Window width in pixels.
 *
 *   Fast Forward Key:
 *   - This is the key used for fast forwarding messages.
 *   - WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 *
 *   Text Delay:
 *   - How many frames to wait between characters drawn?
 *   - Use 0 for instant.
 * 
 *   Offset X:
 *   Offset Y:
 *   - Offset Message Window horizontally or vertically.
 *   - Horizontal: Left; Positive: Right
 *   - Veritcal: Negative: Up; Positive: Down
 * 
 *   Stretch Dimmed BG:
 *   - Stretch dimmed window background to fit the whole screen.
 * 
 *   Default Outline Width:
 *   - Changes the default outline width to this many pixels thick.
 * 
 *   Each Message Start:
 *   Each Message End:
 *   - This is text that is added at the start/end of each message.
 *   - You may use text codes.
 *   - Keep in mind that if a message extends to a different page (due to word
 *     wrap, excess lines, etc), that does not mean the starting text will
 *     be added to where the next page begins or the ending text will be added
 *     where the previous page ends.
 *   - Can be used for things like adding "<center>" to the start of each 
 *     message without having to type it every time.
 *
 * ---
 *
 * Name Box Window
 *
 *   Default Color:
 *   - Default color for the Name Box Window's text.
 *
 *   Offset X:
 *   - How much to offset the name box window X by
 *     (as long as it doesn't go offscreen).
 *
 *   Offset Y:
 *   - How much to offset the name box window Y by
 *     (as long as it doesn't go offscreen).
 *
 * ---
 *
 * Choice List Window
 *
 *   Line Height:
 *   - What is the default line height for Show Choices?
 * 
 *   Minimum Choice Width:
 *   - What is the minimum choice width for each choice?
 *   - 96 is the default width.
 *
 *   Max Rows:
 *   - Maximum number of rows to visibly display?
 *
 *   Max Columns:
 *   - Maximum number of columns to visibly display?
 *
 *   Text Alignment:
 *   - Default alignment for Show Choice window.
 *
 * ---
 *
 * Default Text Codes
 *
 *   Relative \PX \PY:
 *   - Make \PX[x] and \PY[x] adjust relative starting position than
 *     exact coordinates.
 *
 *   \{ Maximum:
 *   - Determine the maximum size that \{ can reach.
 *
 *   \} Minimum:
 *   - Determine the minimum size that \} can reach.
 *
 *   \{ Change \}
 *   - How much does \{ and \} change font size by?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Color Settings
 * ============================================================================
 *
 * For certain windows such as the Message Window, Help Window, and Choice
 * Window, Auto-Color is enabled to automatically highlight and color certain
 * database entries, keywords, and just about anything you, the game dev, wants
 * to be automatically colored. This is done to avoid typing out \C[6]Jack\C[0]
 * every time Jack's name is written out as it will be automatically colored in
 * those specific windows.
 *
 * The Plugin Parameters will give you full reign over which database entries
 * and keywords you want to be automatically colored as long as they follow a
 * few rules:
 * 
 * -----------------
 * Auto-Color Rules:
 * -----------------
 *
 * 1. Database names and keywords are case sensitive.
 *    This means if "Potion" is a marked keyword, typing out "potion" will not
 *    prompt the auto-color to highlight "potion". You must add the lowercase
 *    version of the word into the keyword list if you want it to count.
 *
 * 2. Database names and keywords are exact size (for Roman languages)
 *    This means if "Potion" is a marked keyword, typing out "potions" will not
 *    prompt the auto-color to highlight "potions". You must type out all of
 *    the variations of the words you want affected into the keyword list to
 *    prompt the auto-color highlight.
 * 
 *    This does not apply to Japanese, Korean, or Chinese languages.
 *
 * 3. Possessive cases and other language symbols aren't counted.
 *    Symbols such as periods, commas, quotes, parentheses, and similar symbols
 *    do no count towards Rule 2. This means if "Potion" is a marked keyword,
 *    the typing out "(Potion)" will still highlight the "Potion" part of the
 *    word according to the auto-color.
 * 
 * 4. Names with special characters like !, ?, [, ], etc. will be ignored.
 *    These cause conflicts with how auto-colors are detected.
 *
 * ---
 *
 * Database Highlighting
 *
 *   Actors:
 *   Classes:
 *   Skills:
 *   Items:
 *   Weapons:
 *   Armors:
 *   Enemies:
 *   States:
 *   - Any usage of a the selected database entry's name is auto-colored with
 *     the text code number.
 *   - Use 0 to not auto-color.
 *
 * ---
 *
 * Word Highlighting
 *
 *   \C[x]: Color
 *   - These are lists of all the words that will be automatically colored with
 *     the x text color.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Font Manager
 * ============================================================================
 *
 * Custom fonts that aren't the message or number fonts cannot be used without
 * registration. If you try to use custom fonts in RPG Maker MZ without
 * registering their font family first, you will find out that they will not
 * work. These plugin parameters allow you to register your game's custom fonts
 * here.
 * 
 * ---
 * 
 * Settings:
 * 
 *   Font Family:
 *   - This will be what's used by RPG Maker MZ and plugins to reference this
 *     specific font.
 *   - NO filename extensions!
 * 
 *   Filename:
 *   - What is the filename of the custom font you would like to use?
 *   - Located inside the project's "fonts" folder.
 * 
 * ---
 * 
 * Examples:
 * 
 *   Font Family: WildWords
 *   Filename: WildWords-Regular.ttf
 * 
 * How you would use this in other plugins as a preface to the font face or
 * font family would be to use "WildWords" as the font face/family name. Then
 * RPG Maker MZ will use its own innate FontManager to refer that to the
 * "WildWords-Regular.ttf" file found in the game's "fonts" folder.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Actions
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * performing actions. These actions can be done through each JavaScript or by
 * a common event (if it is used in the Message Window). Adequate knowledge of
 * both is recommended before attempting to modify and/or add new Text Code
 * Actions to the Plugin Parameters.
 *
 * Each of the Text Code Actions are formatted in such a way:
 *
 * ---
 *
 * Text Code Action
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   Common Event:
 *   - Select a common event to run when this text code is used in a message.
 *
 *   JS: Action:
 *   - JavaScript code used to perform an action when this text code appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Code Replacements
 * ============================================================================
 *
 * Text codes are used for one of two things: performing actions or replacing
 * themselves with text data. This Plugin Parameter will focus on the aspect of
 * replacing the text codes with text data. Text data can be replaced with
 * an exact exchange of text or dynamically through JavaScript. Adding a new
 * Text Code Replacement is done through the Plugin Parameters.
 *
 * Each of the Text Code Replacements are formatted in such a way:
 *
 * ---
 *
 * Text Code Replacement
 *
 *   Match:
 *   - This is what needs to be matched in order for this text code to work.
 *   - This is the primary text marker after the \ in a text code.
 *   - In \N[x], this would be the 'N'.
 *
 *   Type:
 *   - The type of parameter to obtain (none, number, or string).
 *   - This is the way the text code determines the condition type.
 *   - In \N[x], this would be the '[x]'.
 *
 *   STR: Text:
 *   - The text that will appear if this match appears.
 *     If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     match appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Macros
 * ============================================================================
 *
 * Text macros are used in similar fashion to text codes replacements to
 * replace themselves with text data. The primary difference is that macros are
 * made in a different format with no conditional argument modifiers (ie the
 * [x] that follows a text code).
 *
 * To use a text macro, type in the matching keyword between two [brackets] and
 * it will be replaced by the string data or run the JavaScript code found in
 * the Plugin Parameter settings.
 *
 * For example, if you have the text macro "Leader", made to return the party
 * leader's name, you can type in [Leader] in the Message Window and it will be
 * replaced with the party leader's name. The output can also output text codes
 * into the resulting text.
 * 
 * This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 * Use the method stated before with the brackets to [MacroName] instead.
 *
 * Each of the Text Macros are formatted in such a way:
 *
 * ---
 *
 * Text Macro
 *
 *   Match:
 *   - This is what needs to be matched in order for this macro to work.
 *   - In [Leader], this would be the 'Leader' text.
 *
 *   STR: Text:
 *   - The replacement text that will appear from the macro.
 *   - If this has a value, ignore the JS: Text version.
 *
 *   JS: Text:
 *   - JavaScript code used to determine the text that will appear if this
 *     macro appears.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Language Settings
 * ============================================================================
 *
 * The "Text Language" feature allows your players to switch between different
 * languages for your game to allow people from around the globe to enjoy what
 * story you have to tell.
 * 
 * Disclaimers: This is not an automatic translation tool. Translations made
 * through the "Text Language" feature of the VisuStella MZ Message Core
 * will require manual input by the game developer.
 * 
 * See the "Text Language Information" for more information.
 *
 * ---
 * 
 * Main Settings:
 * 
 *   Enable Switching?:
 *   - Enable language switching settings for this plugin?
 * 
 *   File Type:
 *   - Which file type do you wish to use?
 *     - CSV (Legacy)
 *     - TSV (Recommended)
 * 
 *   CSV Filename:
 *   - What is the filename of the CSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 *   TSV Filename:
 *   - What is the filename of the TSV file to read from?
 *   - Located within the project's /data/ folder.
 * 
 * ---
 * 
 * Options:
 * 
 *   Add Option?:
 *   - Add the 'Text Language' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 * 
 * ---
 * 
 * Languages:
 * 
 *   Default Language:
 *   - What is the default language used for this game?
 * 
 *   Supported Languages:
 *   - What are all the supported languages supported by this game's
 *     script?
 *   - Remove any that aren't translated.
 * 
 * ---
 * 
 * Language Names:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - How does this language appear in the in-game options?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Fonts
 * ============================================================================
 *
 * Different default fonts used for different languages. This allows different
 * stylistic choices to be made for different languages in case the current
 * font you're using doesn't have support for other language types.
 * 
 * Keep in mind that players can override this with Options Core if they select
 * a text option other than 'Default' for the 'Text Font' option.
 * 
 * Make sure any new custom fonts used for different languages are registered
 * with the 'Custom Font Manager' found in this plugin's Plugin Parameters.
 *
 * ---
 * 
 * Languages:
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - What font face is used for this language?
 *   - Make sure it is registered under Custom Font Manager.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Language Images
 * ============================================================================
 *
 * Allows different images to be used when different languages are used. This
 * is for images that have text on it that you want to appear in different
 * languages based on the text language selected by the player.
 * 
 * There are two ways this works:
 * 
 *   #1: Folder Name
 *   - The name of the folder containing those images will be named something
 *     like "Scrolls[XX]"
 *   - When a different language is picked, like English, it can reference
 *     the 'Scrolls[EN]' folder instead. If Japanese is used, it can refer to
 *     the 'Scrolls[JP]' folder as well.
 *   - The text used to replace the [XX] in the folder name can be determined
 *     in the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 * 
 *   #2: Filename
 *   - The filename of the image to be translated can be named something like
 *     ReidProfile[XX].png
 *   - When a different language is picked, like English, it will reference the
 *     'ReidProfile[EN].png' image instead. For Japanese, it will reference the
 *     'ReidProfile[JP].png' as well.
 *   - The text used to replace the [XX] in the filename can be determined in
 *     the Plugin Parameters.
 *     - Make sure you change the settings for each language you wish to use to
 *       have translated images for.
 *
 * ---
 * 
 * Settings
 * 
 *   Convert Default?
 *   - ON: Default language uses converted marker.
 *   - OFF: Default languages uses [XX] as marker.
 * 
 * Here's an explanation of what this does:
 * 
 *   - The default language picked is English and the player has English picked
 *     as their desired language.
 *   - If the "Convert Default?" Plugin Parameter is ON, then 'ReidProfile[XX]'
 *     will reference and look for the 'ReidProfile[EN]' image.
 *   - If the "Convert Default?" Plugin Parameter is OFF, 'ReidProfile[XX]' is
 *     then used for the English language instead of 'ReidProfile[EN]'.
 *     - This is to avoid duplicate images and save on file space.
 *   - The reasoning behind the [XX] is that there needs to be an anchor image
 *     used for the RPG Maker MZ client in order to have something to reference
 *     before branching out to different languages.
 * 
 * ---
 * 
 * Languages 
 * 
 *   Bengali:
 *   Chinese (Simplified):
 *   Chinese (Traditional):
 *   Czech:
 *   Danish:
 *   Dutch:
 *   English:
 *   Finnish:
 *   French:
 *   German:
 *   Greek:
 *   Hindi:
 *   Hungarian:
 *   Indonesian:
 *   Italian:
 *   Japanese:
 *   Korean:
 *   Norwegian:
 *   Polish:
 *   Portuguese:
 *   Romanian:
 *   Russian:
 *   Slovak:
 *   Spanish:
 *   Swedish:
 *   Tamil:
 *   Thai:
 *   Turkish:
 *   - This text will replace [XX] with in image folder names and filenames
 *     when this language is selected.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Text Speed Option Settings
 * ============================================================================
 *
 * Modern RPG's on the market have the option to adjust the message speed rate
 * for players. These Plugin Parameters allow you to add that option to the
 * Options Menu as well.
 *
 * ---
 *
 * Text Speed Option Settings
 *
 *   Add Option?:
 *   - Add the 'Text Speed' option to the Options menu?
 *
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *
 *   Option Name:
 *   - Command name of the option.
 *
 *   Default Value:
 *   - 1 - 10, slowest to fastest.
 *   - 11 is instant value.
 *
 *   Instant Speed:
 *   - Text to show "instant" text.
 *
 * ---
 * 
 * ============================================================================
 * Plugin Parameters: Word Wrap Settings
 * ============================================================================
 *
 * Word wrap is a property that will cause any overflowing text to wrap around
 * and move into the next line. This property can only be enabled inside text
 * that accept text codes, such as the Message Window and Help Window. However,
 * word wrap is disabled for the Choice Window due to the nature of the Choice
 * Window's base properties.
 *
 * Word wrap can be enabled or disabled in three ways. One is by using the text
 * code <WordWrap> to enable it or </WordWrap> to disable it. The second method
 * is by enabling it with the Plugin Command: 'Message: Properties'. The third
 * method is by enabling it by default with the Plugin Parameters.
 * 
 * Word wrap only supports left-to-right alphabetical languages that utilize
 * spaces.
 * 
 * Word Wrap also cannot be used together with <left>, <center>, or <right> and
 * will disable itself if text alignment text codes are detected.
 * 
 * As of the v1.44 update, some Asian languages such as Chinese and Japanese
 * are now supported for word wrap. Korean language is only supported if spaces
 * are used.
 * 
 * ---
 *
 * Enable Word Wrap
 *
 *   Message Window:
 *   - Automatically enable Word Wrap for this window?
 *
 *   Help Window:
 *   - Automatically enable Word Wrap for this window?
 *
 * ---
 *
 * Rules
 *
 *   Link Break -> Space:
 *   - Convert manually placed (non tagged) line breaks with spaces?
 *   - Line breaks must be inserted using the <br> text code.
 *
 *   Tight Wrap:
 *   - If a face graphic is present in a message, word wrap will be tighter.
 * 
 *   End Padding:
 *   - Add extra padding to your window to make text wrap further away from the
 *     end of the window.
 *   - This will default to 0.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.57: August 17, 2026
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Message: Randomize Text
 * **** Takes message from random pool and stores into variable.
 * **** Display stored random message with \V[x] text code.
 * 
 * Version 1.56: June 15, 2026
 * * Feature Update!
 * ** Comments no longer break continuous Show Choices when making larger
 *    Show Choice lists. Update made by Irina.
 * 
 * Version 1.55: January 19, 2026
 * * Documentation Update!
 * ** \ChangeFace<x,y> text codegets a note added:
 * *** This text code is used under the assumption that you are using an
 *     existing face graphic to change from (doesn't matter which). The text
 *     code will not automatically shift text from no-face graphic to having a
 *     face graphic mid-message.
 * 
 * Version 1.54: May 15, 2025
 * * Bug Fixes!
 * ** Fixed a bug where the text width of translated text was not taken into
 *    account. Fix made by Arisu
 * 
 * Version 1.53: February 20, 2025, 2025
 * * Bug Fixes!
 * ** Fixed an error with text language translations not working properly for
 *    the last listed language in the translation sheet. Fix made by Irina.
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Removed picture limit of 100 from Picture-related Plugin Commands.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Text Language Information section included for TSV.
 * ** Updated text code note for \picture<x> and \CenterPicture<x>
 * *** As of the version 1.53 update, the Help Window now supports both of
 *     these text codes. However, we still recommend using icons over using
 *     pictures as there will be loading delays.
 * * Plugin Parameters
 * ** New plugin parameters added by Irina:
 * *** Parameters > Text Language Settings > File Type:
 * **** Which file type do you wish to use?
 * ***** CSV (Legacy)
 * ***** TSV (Recommended)
 * *** Parameters > Text Language Settings > TSV Filename
 * **** What is the filename of the TSV file to read from?
 * **** Located within the project's /data/ folder.
 * * Feature Updates!
 * ** We have done our research and decided that CSV's are too restricted to
 *    use due to their default nature of wanting to use commas as separators.
 *    Thus, we've decided to switch to TSV where the default separator is a tab
 *    space, something that is almost never used in RPG Maker text.
 * ** CSV support will remain as a legacy option but TSV will be recommended as
 *    the main text languaging switching filetype.
 * ** When creating a new Language TSV, the plugin will check if a Language CSV
 *    exists and asks you if you wish to convert the existing CSV to TSV. The
 *    original CSV file will remain intact as a backup.
 * 
 * Version 1.52: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Arisu:
 * *** <left>
 * *** <center>
 * *** <right>
 * **** When used in the Map Name, instead of aligning the text which is
 *      centered by default, the text code will align the horizontal position
 *      of the name displayed on the screen.
 * *** <top>
 * *** <middle>
 * *** <bottom>
 * **** When used in the Map Name, the text code will align the vertical
 *      position of the name displayed on the screen.
 * *** <X: +n>
 * *** <X: -n>
 * *** <Y: +n>
 * *** <Y: -n>
 * **** Adjusts the horizontal/vertical position of map name by 'n' value.
 * *** All of these text codes require VisuMZ_0_CoreEngine installed and its
 *     "Map Name Text Code" plugin parameter enabled.
 * 
 * Version 1.51: October 17, 2024
 * * Bug Fixes!
 * ** Fixed a bug where \LastGainObj text code did not work with text language
 *    key codes. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added note to Text Language Information > How to Enable Switching
 * *** IMPORTANT! The separator used for the CSV file must be a semicolon (;)
 *     and not a comma (,) as to reduce the amount of punctuation conflicts.
 *     Keep this in mind as most CSV editors will default to comma (,) instead
 *     of the semicolon (;) for their separator.
 * ** Added note to Text Language Information > Naming Weapon Types, etc:
 * *** You might have noticed that if you've decided to use \tl{keyName} for
 *     weapon or other database types, other parts of the game will error out.
 *     Don't worry, for these, you don't have to change the currently used
 *     database name. Go straight to the CSV and insert in a new key for that
 *     particular database name. For example, the equip type "Accessory" will
 *     use "Accessory" as the automatic key to look for a translated phrase. If
 *     there isn't any in the CSV file, then the default database text entry
 *     will be used.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Parameters > Text Language Settings > Language Fonts
 * **** Different default fonts used for different languages. This allows
 *      different stylistic choices to be made for different languages in case
 *      the current font you're using doesn't have support for other language
 *      types.
 * **** Keep in mind that players can override this with Options Core if they
 *      select a text option other than 'Default' for the 'Text Font' option.
 * **** Make sure any new custom fonts used for different languages are
 *      registered with the 'Custom Font Manager' found in this plugin's Plugin
 *      Parameters.
 * *** Parameters > Text Language Settings > Language Images
 * **** Allows different images to be used when different languages are used.
 *      This is for images that have text on it that you want to appear in
 *      different languages based on the text language selected by the player.
 * 
 * Version 1.50: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina:
 * *** <Caps> </Caps>
 * *** <Upper> </Upper>
 * *** <Lower> </Lower>
 * **** Auto-text case textcodes will automatically adjust text inserted
 *      between them to respectively be completely capitalized, first-letter
 *      capitalized, or completely lowercase.
 * **** More information in the help file.
 * *** <Alt> </Alt>
 * **** Alternates between uppercase and lowercase for letters.
 * *** <Chaos> </Chaos>
 * **** Randomly uses uppercase and lowercase for letters.
 * 
 * 
 * Version 1.49: May 16, 2024
 * * Bug Fixes!
 * ** Fixed a problem where using text codes to get database object names did
 *    not apply translated text.
 * * Documentation Update!
 * ** Added note for Message Window Only text code effects:
 * *** These text codes only work with the Message Window. Keep in mind that
 *     even if some windows might look like the Message Window, it may not
 *     necessarily be one.
 * * Feature Update!
 * ** Added a failsafe for when Choice List Window doesn't have any viable
 *    options (due to being hidden or disabled). Update made by Irina.
 * ** Added a failsafe for Language CSV when empty rows are added.
 * ** Updated some default Text Code actions in order to make sure they're only
 *    used by the Message Window and not anything else. Update made by Irina.
 * 
 * Version 1.48: April 18, 2024
 * * Bug Fixes!
 * ** Added fail safe for help description checks parsing from objects without
 *    help descriptions normally. Fix made by Irina.
 * 
 * Version 1.47: February 15, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > Custom Font Manager
 * **** Register custom fonts here.
 * **** Custom fonts that aren't the message or number fonts cannot be used
 *      without registration.
 * **** See help file for more information.
 * 
 * Version 1.46: January 18, 2024
 * * Bug Fixes!
 * ** Fixed a bug where script calls used to create message choices would not
 *    work properly. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Text Language Switching added by Irina:
 * *** Plugin Parameters > Text Language Settings
 * **** The "Text Language" feature allows your players to switch between
 *      different languages for your game to allow people from around the globe
 *      to enjoy what story you have to tell.
 * **** Disclaimers: This is not an automatic translation tool. Translations
 *      made through the "Text Language" feature of the VisuStella MZ Message
 *      Core will require manual input by the game developer.
 * **** Read more about it in detail within the "Text Language Information"
 *      section in the help file.
 * ** New Plugin Parameter added by Irina:
 * *** Choices: Distance
 * **** Change the distance from choice window to the message window.
 * ** New parameter added to Plugin Command "Choices: Properties" by Irina:
 * *** Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Plugin Parameter for "Message Window" added by Irina:
 * *** Parameters > Message Window: Choice List Window> Minimum Choice Width
 * **** What is the minimum width size for each choice?
 * ** New Text Codes for Choice Window added by Irina:
 * *** <BgImg: filename> and variants
 * *** <FgImg: filename> and variants
 * **** These text codes allow adding a background or foreground image to a
 *      choice rectangle in stretched/scaled size.
 * 
 * Version 1.45: December 14, 2023
 * * Bug Fixes!
 * ** Punctuation was, for some reason, excluded when using Wordwrap with
 *    Japanese and Chinese languages. This should be fixed now. Fixed by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added clarity to the <left>, <center>, and <right> being unable to be
 *    used together with word wrap.
 * *** Word Wrap also cannot be used together with <left>, <center>, or <right>
 *     and will disable itself if text alignment text codes are detected.
 * * Feature Update!
 * ** Wordwrap <br> now works properly with Japanese and Chinese languages.
 * * New Features!
 * ** New Plugin Parameters added by Irina:
 * *** Plugin Parameters > General Settings > Each Message Start
 * *** Plugin Parameters > General Settings > Each Message End
 * **** This is text that is added at the start/end of each message.
 * **** Keep in mind that if a message extends to a different page (due to word
 *      wrap, excess lines, etc), that does not mean the starting text will
 *      be added to where the next page begins or the ending text will be added
 *      where the previous page ends.
 * **** Can be used for things like adding "<center>" to the start of each 
 *      message without having to type it every time.
 * 
 * Version 1.44: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Updated "Plugin Parameters: Word Wrap Settings" section:
 * *** As of the v1.44 update, some Asian languages such as Chinese and
 *     Japanese are now supported for word wrap. Korean language is only
 *     supported if spaces are used.
 * * Feature Update!
 * ** Word Wrap is now supported for Japanese and Chinese languages.
 * ** Feature updated by Irina and sponsored by AndyL.
 * * New Features!
 * ** New text codes added by Irina for "Show Choices" event command.
 * *** <Shuffle>
 * **** Shuffles the order of all choices. Any cancel shortcuts other than
 *      "Branch" will be undone.
 * *** <Shuffle: x>
 * **** Shuffles the order of all choices and only x number of them appear. Any
 *      cancel shortcuts other than "Branch" will be undone. Hidden choices do
 *      not count towards x number.
 * 
 * Version 1.43: April 13, 2023
 * * Compatibility Update!
 * ** Fixed incompatibilities with auto message positioning with the Map Zoom
 *    plugin. Update made by Irina.
 * 
 * Version 1.42: March 16, 2023
 * * Bug Fixes!
 * ** Fixed some text codes that would capture way too much data than intended.
 *    Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text code added by Irina for Show Choice Window only:
 * *** <Help> text </Help>
 * **** Makes a help window appear and have it show 'text' in its contents.
 * **** The help window will disappear if no text is displayed.
 * ** New Plugin Commands added by Arisu:
 * *** Select: Weapon
 * *** Select: Armor
 * *** Select: Skill
 * **** Opens the Event Select Item Window to let the player pick a weapon,
 *      armor, or skill to choose from. The selected object will have its ID
 *      recorded in a variable. These can be opened while the Message Window is
 *      opened just like the event "Select Item".
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New text codes added by Irina!
 * *** For the Choice Window Only text codes:
 * **** <BgColor: x>
 * **** <BgColor: x, y>
 * **** <BgColor: #rrggbb>
 * **** <BgColor: #rrggbb, #rrggbb>
 * ***** Requires VisuMZ_0_CoreEngine! Sets the background color of this choice
 *       to 'x' text color, 'x' to 'y' gradient text color, or using '#rrggbb'
 *       hex color values.
 * 
 * Version 1.40: November 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New text code added by Irina:
 * *** <RNG> text1 | text2 | text3 </RNG>
 * **** Using the above text code format in a Show Message entry, you can get a
 *      random result out of the various inserted texts. Use "|" (without
 *      quotes) as a separator between text entries. You can have unlimited
 *      entries. The result will have any excess white space trimmed.
 * **** This text code cannot be inserted into a macro and parsed properly.
 * 
 * Version 1.39: September 22, 2022
 * * Bug Fixes!
 * ** Macros now support quotes (' and ") in the STR: Text. Fix made by Irina.
 * 
 * Version 1.38: July 21, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.37: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Picture texts with \v[x] text codes are now updated automatically.
 * ** This is the only dynamic text code that updates this way for optimization
 *    purposes and to prevent overabundant CPU usage.
 * ** Everything else will require the new Plugin Command.
 * * New Features!
 * ** New Plugin Command added by Irina:
 * *** Picture: Refresh Text
 * **** Refreshes the text used for all on-screen pictures.
 * **** To be used if any dynamic text codes are updated like \n[x].
 * * New Features!
 * ** New text codes added by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** <Up Button>, <Left Button>, <Right Button>, <Down Button>
 * *** <Ok Button>, <Cancel Button>, <Shift Button>, <Menu Button>
 * *** <Page Up Button>, <Page Down Button>
 * **** Display's VisuMZ_0_CoreEngine's button assist text.
 * 
 * Version 1.36: April 7, 2022
 * * Feature Update!
 * ** Auto size related text codes should now automatically disable word wrap
 *    effects as they should have before. Update made by Irina.
 * 
 * Version 1.35: March 31, 2022
 * * Bug Fixes!
 * ** Bug fixed where if autosizing is used and it goes from a message that is
 *    shorter to longer, an extra key press is needed. This should no longer be
 *    the case. Fix made by Irina.
 * 
 * Version 1.34: February 24, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Choice Window Text Codes made by Irina and sponsored by AndyL:
 * *** <Choice Width: x>
 * **** Sets the minimum text area width to x. Applies to whole choice window.
 * *** <Choice Indent: x>
 * **** Sets the indent to x value. Applies to current choice selection only.
 * 
 * Version 1.33: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Picture: Change Text
 * **** This new plugin command allows you to place text on top of pictures
 *      (usually in the form of empty pages or cards) to function as stationary
 *      or other uses. Text codes are allowed.
 * **** Text codes are supported.
 * *** Picture: Erase Text
 * **** Removes text from target picture(s).
 * 
 * Version 1.32: January 20, 2022
 * * Bug Fixes!
 * ** Extra Show Choice notetags will now be properly hidden. Fix by Irina.
 * * Compatibility Update!
 * ** Self Switches are now made compatible with work with Show Choices. Update
 *    made by Irina.
 * 
 * Version 1.31: December 9, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New hard-coded message-only text code added by Irina:
 * *** <Next Page>
 * **** Ends the current message page at this line. This is used for messages
 *      when rows are at 5 or above and the message lines don't match the
 *      amount. This is used to prevent grabbing message windows from following
 *      message events. Any lines following <Next Page> in the same message
 *      event will be ignored.
 * 
 * Version 1.30: November 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Help file updated for removed "Center Window X" bit.
 * * Feature Update!
 * ** Message: Properties now has "Center Window X?" removed
 * *** Changes will now be automatically centered.
 * *** This change is made for the new Plugin Command added for offsets which
 *     more or less replaces them.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Puddor:
 * *** Message: X/Y Offsets
 * **** Change the X and Y Offsets of the Message Window.
 * **** The offset value(s) will be saved and stored.
 * ** New Plugin Parameters added by Irina and sponsored by Puddor:
 * *** Plugin Parameters > General Settings > Message Window > Offset X
 * *** Plugin Parameters > General Settings > Message Window > Offset Y
 * **** Allows you to offset the horizontal and/or vertical positions of the
 *      message window accordingly.
 * ** New Text Codes added by Irina and sponsored by Puddor:
 * *** <Offset: +x, +y>
 * *** <Offset: -x, -y>
 * *** <Offset: +x, -y>
 * *** <Offset: -x, +y>
 * **** Quickly adjust the message window offset values to the x and y amounts.
 *      The values will replace the previous offset settings if there were any.
 * 
 * Version 1.29: October 21, 2021
 * * Feature Update
 * ** Word Wrap flags are now properly adjusted when converting macros and
 *    adding bypasses towards regular messages. Update by Irina.
 * 
 * Version 1.28: October 14, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.27: October 7, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.26: September 3, 2021
 * * Bug Fixes!
 * ** Macros should now work properly with any \x<n> based text codes.
 *    Fix made by Irina.
 * 
 * Version 1.25: August 27, 2021
 * * Feature Update!
 * ** Macros should now work with the <WordWrap> text code. Update by Irina.
 * 
 * Version 1.24: August 20, 2021
 * * Feature Update!
 * ** Macros should now work with window placement and resize options.
 *    Update made by Irina.
 * ** Macros should now work with choice-related enable and visibility options.
 *    Update made by Irina.
 * 
 * Version 1.23: July 16, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Word Wrap Settings > End Padding
 * **** Add extra padding to your window to make text wrap further away from
 *      the end of the window. This will default to 0.
 * 
 * Version 1.22: July 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Text Codes added by Irina and sponsored by AndyL:
 * *** <Current Battle Target>
 * *** <Current Battle User>
 * **** Replaces the text code with the current target or current user's name
 *      in-battle. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * *** <Current Battle Action>
 * *** <Current Battle Action Name>
 * **** Replaces the text code with the current battle action's name with the
 *      icon or without it respectively. Otherwise, returns nothing.
 * **** Not recommended to be used inside of Help Descriptions. They are best
 *      used with "Show Text" event commands.
 * 
 * Version 1.21: June 4, 2021
 * * Documentation Update!
 * ** Added extra note to the new <Position: x, y, width, height> text codes
 *    that they do not work with Word Wrap.
 * * Feature Update!
 * ** Added fail safe for preventing Common Events that don't exist from being
 *    ran at all by the Message Window. Added by Arisu.
 * 
 * Version 1.20: May 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added additional clarity for \WindowMoveTo<?> and \WindowMoveBy<?> and
 *    \WindowReset text codes with "Note 2".
 * *** Replace '?' with the following format: targetX, targetY, targetWidth,
 *     targetHeight, duration, easingType. Only targetX and targetY are
 *     required arguments. These will only alter the window dimensions when the
 *     text has arrived at that point. They will not alter the window
 *     preemptively. This is not used as a window positioner. Use the
 *     <Position: x, y, width, height> text code for that.
 * * New Features!
 * ** New hard-coded text codes added for Message Window Only. Added by Irina.
 * *** <Position: x, y, width, height>
 * *** <Coordinates: x, y>
 * *** <Dimensions: width, height>
 * 
 * Version 1.19: May 14, 2021
 * * Feature Updates!
 * ** <br> line breaks can now be used by Show Choices. Make sure that there is
 *    enough room to contain the text through Plugin Commands. Update by Irina.
 * 
 * Version 1.18: April 30, 2021
 * * Bug Fixes!
 * ** Moving windows with 0 duration via text code should now instantly move
 *    the windows to the desired location with no delay. Fix made by Olivia.
 * 
 * Version 1.17: April 9, 2021
 * * Feature Update!
 * ** <Auto> text codes for message windows will round up calculations for the
 *    message width to the nearest even number for better calculations.
 * 
 * Version 1.16: April 2, 2021
 * * Bug Fixes!
 * ** \CommonEvent[x] text code will no longer run upon message window size
 *    calculation. Fix made by Arisu.
 * * Documentation Update!
 * ** Added further clarification for "Text Macros" section.
 * *** This does NOT work with \MacroName as it did with Yanfly Engine Plugins.
 *     Use the method stated before with the brackets to [MacroName] instead.
 * 
 * Version 1.15: March 5, 2021
 * * Bug Fixes!
 * ** Hidden choices by switches will no longer count towards the maximum line
 *    count for Show Choice options. Fix made by Irina.
 * 
 * Version 1.14: February 12, 2021
 * * Bug Fixes!
 * ** Auto positioned messages in battle will no longer cover the battler in
 *    question. Fix made by Irina.
 * 
 * Version 1.13: February 5, 2021
 * * Bug Fixes!
 * ** Choice List Window with a dimmed background should now have a more
 *    consistent sized dim sprite. Fix made by Irina.
 * 
 * Version 1.12: January 22, 2021
 * * Feature Update!
 * ** Name Box Window Default Color is now disabled by default to 0 because
 *    users do not understand why their names are showing up yellow and did not
 *    bother reading the documentation. If users want this feature turned on,
 *    they will have to do it manually from now on. Update made by Irina.
 * 
 * Version 1.11: January 15, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: January 8, 2021
 * * Bug Fixes!
 * ** <Auto Actor: x> and <Auto Party: x> text codes should now work properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Auto Color Plugin Parameters now have their default settings set to 0.
 *    This is due to an influx of "bug reports" from users who do not
 *    understand how this feature works, and the VisuStella team has decided it
 *    is better for the feature to default to an inactive state until users
 *    decide to search and utilize it themselves. Update made by Irina.
 * 
 * Version 1.09: January 1, 2021
 * * Feature Update!
 * ** Auto-color no longer applies to database names that are only numbers.
 *    Auto-color entries that are only numbers will also be ignored. This is to
 *    prevent breaking the text code parsing. Update made by Yanfly.
 * 
 * Version 1.08: November 15, 2020
 * * Documentation Update!
 * ** Some text codes left for the Name Box Window have been accidentally left
 *    out. These text codes allow for the positioning of the Name Box Window.
 *    Also, added to this section are the \NormalBG, \DimBG, and \TransparentBG
 *    text codes since people have been asking for how to change the name box
 *    window's background, but have skimmed over those text codes in different
 *    sections of the help file.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: November 8, 2020
 * * Bug Fixes!
 * ** When using auto size functions, the message pause symbol will no longer
 *    appear semi-transparent the whole time. Fix made by Irina.
 * 
 * Version 1.06: October 25, 2020
 * * Documentation Update!
 * ** Added a warning message to the Fast Forward Key plugin parameter:
 * *** WARNING: If this key is the same as the dash button, this will clear out
 *     any held down inputs upon triggering an event  to prevent players from
 *     skipping potentially useful information stored in messages. If you do
 *     not want the input to be cleared, use a different key.
 * ** Updated help file for new features.
 * * Feature Update!
 * ** The default Fast Forward Key setting has now been changed from "Shift" to
 *    "Page Down". Change made by Yanfly
 * * New Feature!
 * ** New Plugin Parameter added by Irina.
 * *** Plugin Parameters > General > Default Outline Width
 * **** Changes the default outline width to this many pixels thick.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Setting an actor's autocolor will now disable it from \N[x] and \P[x]
 *    text codes. Fix made by Irina.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** Auto Position text codes not place positions properly if the screen width
 *    and height differ from the box width and box height. Fix made by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Word wrap no longer affects specific battle messages. Fix made by Irina.
 * ** Word wrap now updates properly after using the 'Message: Properties'
 *    Plugin Command. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Autoplacement of the name box window now takes its offset Y setting into
 *    account before sending it to the bottom of the message window. Fix made
 *    by Yanfly.
 * ** Added automatic feature setting to turn off word wrap when using the
 *    auto-size and auto-position text codes. This is because the auto-size and
 *    auto-position effects don't work properly with Word Wrap based on how
 *    they both clash when adjusting the window settings. Fix made by Irina.
 * ** New message pages after auto-sizing no longer put out empty messages.
 *    Fix made by Irina and Shiro.
 * * Documentation Update!
 * ** Extended the note for auto-size and auto-position text codes to include
 *    that they do not work with Word Wrap. Added by Irina.
 * 
 * Version 1.02: August 30, 2020
 * * New Features!
 * ** Added new hard-coded text codes for auto-sizing and auto-positioning:
 * *** <Auto>, <Auto Width>, <Auto Height>
 * *** <Auto Actor: x>, <Auto Party: x>, <Auto Enemy: x>
 * *** <Auto Player>, <Auto Actor: x>, <Auto Party: x>, <Auto Event: x>
 * **** New features added by Irina.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** </Wordwrap> now works.
 * ** \ActorFace[x] text code now fixed.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Text Code Replacements > ActorFace >
 *     JS: Text > and changing "$gameActors.actor(1)" to
 *     "$gameActors.actor(actorId)"
 * ** Actors with empty names would cause auto hightlight problems. Fixed!
 * ** Auto-colors now ignore names with special characters like !, ?, [, ], and
 *    so on.
 * ** Line break spacing fixed.
 * * New Features!
 * ** Wordwrap now works with <left>, <center> and <right> alignment tags.
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowProperties
 * @text Message: Properties
 * @desc Change the various properties of the Message Window.
 *
 * @arg Rows:num
 * @text Rows
 * @type number
 * @min 0
 * @desc Change the number of Message Window rows.
 * Leave at 0 to keep it unchanged.
 * @default 4
 *
 * @arg Width:num
 * @text Width
 * @type number
 * @min 0
 * @desc Change the Message Window width in pixels.
 * Leave at 0 to keep it unchanged.
 * @default 816
 *
 * @arg WordWrap:str
 * @text Word Wrap
 * @type select
 * @option No Change
 * @value No Change
 * @option Enable
 * @value true
 * @option Disable
 * @value false
 * @desc Enable or disable Word Wrap for the Message Window?
 * @default No Change
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageRandomize
 * @text Message: Randomize Text
 * @desc Takes message from random pool and stores into variable.
 * Display stored random message with \V[x] text code.
 *
 * @arg messages:arrayjson
 * @text Random Messages
 * @type note[]
 * @desc A list of random messages to display.
 * Text codes allowed.
 * @default ["\"This plugin command selects a message at random.\\nIsn't that neat?\"","\"Insert more messages here to increase the randomization.\\nCool, huh?\"","\"The larger the random pool, the more variety in messages.\\nIt'll be more interesting that way!\""]
 *
 * @arg varID:eval
 * @text Variable ID
 * @type variable
 * @desc Select which variable to store the random message.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MessageWindowXyOffsets
 * @text Message: X/Y Offsets
 * @desc Change the X and Y Offsets of the Message Window.
 * The offset value(s) will be saved and stored.
 *
 * @arg OffsetX:eval
 * @text Offset X
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Choice
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowDistance
 * @text Choices: Distance
 * @desc Change the distance from choice window to the message window.
 *
 * @arg Distance:eval
 * @text Distance
 * @desc Change distance between the choice and message windows.
 * Default distance is 0. Use negative to center align.
 * @default +0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChoiceWindowProperties
 * @text Choices: Properties
 * @desc Change the properties found in the Show Choices event command.
 *
 * @arg LineHeight:num
 * @text Choice Line Height
 * @type number
 * @min 0
 * @desc Change the line height for the show choices.
 * Leave at 0 to keep this unchanged.
 * @default 36
 *
 * @arg MinWidth:num
 * @text Minimum Choice Width
 * @type number
 * @min 0
 * @desc What is the minimum width size for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @arg MaxRows:num
 * @text Max Rows
 * @type number
 * @min 0
 * @desc Maximum number of choice rows to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 8
 *
 * @arg MaxCols:num
 * @text Max Columns
 * @type number
 * @min 0
 * @desc Maximum number of choice columns to be displayed.
 * Leave at 0 to keep this unchanged.
 * @default 1
 *
 * @arg TextAlign:str
 * @text Text Alignment
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Text alignment for Show Choice window.
 * @default default
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Select
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectWeapon
 * @text Select: Weapon
 * @desc Opens the Event Select Item Window to let the player
 * pick a weapon to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected weapon. It will result in 0 otherwise.
 * @default 1
 *
 * @arg WeaponTypeID:num
 * @text Weapon Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the weapons to a specific weapon type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectArmor
 * @text Select: Armor
 * @desc Opens the Event Select Item Window to let the player
 * pick an armor to choose from.
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected armor. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ArmorTypeID:num
 * @text Armor Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific armor type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @arg EquipTypeID:num
 * @text Equip Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the armors to a specific equip type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SelectSkill
 * @text Select: Skill
 * @desc Opens the Event Select Item Window to let the player
 * pick a skill. Requires VisuMZ_1_SkillsStatesCore!
 *
 * @arg VariableID:num
 * @text Variable ID
 * @type number
 * @min 0
 * @desc This variable will be used to record the ID of the
 * selected skill. It will result in 0 otherwise.
 * @default 1
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select an actor to get the skill list from.
 * Use 0 to select from the party leader.
 * @default 0
 *
 * @arg SkillTypeID:num
 * @text Skill Type ID
 * @type number
 * @min 0
 * @max 100
 * @desc Reduce all the skills to a specific skill type.
 * Leave at 0 to not use filters.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextChange
 * @text Picture: Change Text
 * @desc Change text for target picture(s) to show.
 * You may use text codes. ⚠️NOT RECOMMENDED for small pictures.
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID(s) of the picture(s) to set text to.
 * @default ["1"]
 *
 * @arg Padding:eval
 * @text Padding
 * @parent PictureIDs:arraynum
 * @desc How much padding from the sides should there be?
 * @default $gameSystem.windowPadding()
 * 
 * @arg Text
 *
 * @arg upperleft:json
 * @text Upper Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg up:json
 * @text Upper Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg upperright:json
 * @text Upper Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg left:json
 * @text Middle Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg center:json
 * @text Middle Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg right:json
 * @text Middle Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerleft:json
 * @text Lower Left
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg down:json
 * @text Lower Center
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @arg lowerright:json
 * @text Lower Right
 * @parent Text
 * @type note
 * @desc The text that's aligned to this picture's side.
 * You may use text codes.
 * @default ""
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextErase
 * @text Picture: Erase Text
 * @desc Erase all text for target picture(s).
 *
 * @arg PictureIDs:arraynum
 * @text Picture ID(s)
 * @type number[]
 * @min 1
 * @desc The ID(s) of the picture(s) to erase text for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureTextRefresh
 * @text Picture: Refresh Text
 * @desc Refreshes the text used for all on-screen pictures.
 * To be used if any dynamic text codes are updated like \n[x].
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MessageCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc General settings involving the message system.
 * @default {"MessageWindow":"","MessageRows:num":"4","MessageWidth:num":"816","FastForwardKey:str":"pagedown","MessageTextDelay:num":"1","StretchDimmedBg:eval":"true","DefaultOutlineWidth:num":"3","NameBoxWindow":"","NameBoxWindowDefaultColor:num":"0","NameBoxWindowOffsetX:num":"0","NameBoxWindowOffsetY:num":"0","ChoiceListWindow":"","ChoiceWindowLineHeight:num":"36","ChoiceWindowMaxRows:num":"8","ChoiceWindowMaxCols:num":"1","ChoiceWindowTextAlign:str":"default","DefaultTextCodes":"","RelativePXPY:eval":"true","FontBiggerCap:eval":"108","FontSmallerCap:eval":"12","FontChangeValue:eval":"12"}
 *
 * @param AutoColor:struct
 * @text Auto-Color Settings
 * @type struct<AutoColor>
 * @desc Automatically color certain keywords a specific way.
 * @default {"DatabaseHighlighting":"","Actors:str":"0","Classes:str":"0","Skills:str":"0","Items:str":"0","Weapons:str":"0","Armors:str":"0","Enemies:str":"0","States:str":"0","WordHighlighting":"","TextColor1:arraystr":"[]","TextColor2:arraystr":"[]","TextColor3:arraystr":"[]","TextColor4:arraystr":"[]","TextColor5:arraystr":"[]","TextColor6:arraystr":"[]","TextColor7:arraystr":"[]","TextColor8:arraystr":"[]","TextColor9:arraystr":"[]","TextColor10:arraystr":"[]","TextColor11:arraystr":"[]","TextColor12:arraystr":"[]","TextColor13:arraystr":"[]","TextColor14:arraystr":"[]","TextColor15:arraystr":"[]","TextColor16:arraystr":"[]","TextColor17:arraystr":"[]","TextColor18:arraystr":"[]","TextColor19:arraystr":"[]","TextColor20:arraystr":"[]","TextColor21:arraystr":"[]","TextColor22:arraystr":"[]","TextColor23:arraystr":"[]","TextColor24:arraystr":"[]","TextColor25:arraystr":"[]","TextColor26:arraystr":"[]","TextColor27:arraystr":"[]","TextColor28:arraystr":"[]","TextColor29:arraystr":"[]","TextColor30:arraystr":"[]","TextColor31:arraystr":"[]"}
 *
 * @param CustomFonts:arraystruct
 * @text Custom Font Manager
 * @type struct<CustomFont>[]
 * @desc Register custom fonts here. Custom fonts that aren't the
 * message or number fonts cannot be used without this.
 * @default []
 *
 * @param TextCodeActions:arraystruct
 * @text Text Code Actions
 * @type struct<TextCodeAction>[]
 * @desc Text codes that perform actions.
 * @default ["{\"Match:str\":\"ChangeFace\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = data[0].trim();\\\\n        const index = parseInt(data[1] || '0');\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"FaceIndex\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing) {\\\\n        const filename = $gameMessage.faceName();\\\\n        $gameMessage.setFaceImage(filename, index);\\\\n        this.loadMessageFace();\\\\n        const rtl = $gameMessage.isRTL();\\\\n        const width = ImageManager.faceWidth;\\\\n        const height = this.innerHeight;\\\\n        const x = rtl ? this.innerWidth - width - 4 : 4;\\\\n        this.contents.clearRect(x, 0, width, height);\\\\n        this._faceBitmap.addLoadListener(this.drawMessageFace.bind(this));\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"TextDelay\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst delay = this.obtainEscapeParam(textState);\\\\nif (this instanceof Window_Message) {\\\\n    if (textState.drawing && this.constructor === Window_Message) {\\\\n        this.setTextDelay(delay);\\\\n    }\\\\n}\\\"\"}","{\"Match:str\":\"NormalBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(0);\\\\n}\\\"\"}","{\"Match:str\":\"DimBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(1);\\\\n}\\\"\"}","{\"Match:str\":\"TransparentBG\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    this.setBackgroundType(2);\\\\n}\\\"\"}","{\"Match:str\":\"FontChange\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst fontName = this.obtainEscapeString(textState);\\\\nthis.contents.fontFace = fontName;\\\"\"}","{\"Match:str\":\"ResetFont\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetFontSettings();\\\"\"}","{\"Match:str\":\"ResetColor\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"this.resetTextColor();\\\"\"}","{\"Match:str\":\"HexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeTextColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineColor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst colorIndex = this.obtainEscapeParam(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(ColorManager.textColor(colorIndex));\\\\n}\\\"\"}","{\"Match:str\":\"OutlineHexColor\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst hexColor = this.obtainEscapeString(textState);\\\\nif (!this.isColorLocked() && textState.drawing) {\\\\n    this.changeOutlineColor(hexColor);\\\\n}\\\"\"}","{\"Match:str\":\"OutlineWidth\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst width = this.obtainEscapeParam(textState);\\\\nif (textState.drawing) {\\\\n    this.contents.outlineWidth = width;\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveTo\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : this.x;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : this.y;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : this.width;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : this.height;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveTo(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowMoveBy\",\"Type:str\":\"\\\\<(.*?)\\\\>\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst data = this.obtainEscapeString(textState).split(',');\\\\nif (textState.drawing) {\\\\n    const x = !!data[0] ? Number(data[0].trim()) : 0;\\\\n    const y = !!data[1] ? Number(data[1].trim()) : 0;\\\\n    const width = !!data[2] ? Number(data[2].trim()) : 0;\\\\n    const height = !!data[3] ? Number(data[3].trim()) : 0;\\\\n    const duration = !!data[4] ? Number(data[4].trim()) : 20;\\\\n    const easingType = !!data[5] ? data[5].trim() : 0;\\\\n    this.moveBy(x, y, width, height, duration, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"WindowReset\",\"Type:str\":\"\",\"CommonEvent:num\":\"0\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nif (textState.drawing) {\\\\n    const frames = 20;\\\\n    const easingType = 0;\\\\n    this.resetRect(frames, easingType);\\\\n}\\\"\"}","{\"Match:str\":\"heart\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"CommonEvent:num\":\"3\",\"ActionJS:func\":\"\\\"const textState = arguments[0];\\\\nconst index = this.obtainEscapeParam(textState);\\\"\"}"]
 *
 * @param TextCodeReplace:arraystruct
 * @text Text Code Replacements
 * @type struct<TextCodeReplace>[]
 * @desc Text codes that replace themselves with text.
 * @default ["{\"Match:str\":\"ActorFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const actorId = parseInt(arguments[1]);\\\\nconst actor = $gameActors.actor(actorId);\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"PartyFace\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const index = parseInt(arguments[1]) - 1;\\\\nconst actor = $gameParty.members()[index];\\\\nif (this.constructor === Window_Message && actor) {\\\\n    $gameMessage.setFaceImage(\\\\n        actor.faceName(),\\\\n        actor.faceIndex()\\\\n    );\\\\n}\\\\nreturn '';\\\"\"}","{\"Match:str\":\"Class\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ClassIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ClassName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataClasses;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Skill\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"SkillIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"SkillName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataSkills;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Item\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ItemName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ItemQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataItems;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Weapon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"WeaponName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"WeaponQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataWeapons;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"Armor\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"ArmorName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"ArmorQuantity\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataArmors;\\\\nconst id = parseInt(arguments[1]);\\\\nreturn $gameParty.numItems(database[id]);\\\"\"}","{\"Match:str\":\"State\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"StateIcon\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst obj = database[id];\\\\nconst icon = obj ? (obj.iconIndex || 0) : 0;\\\\nreturn icon ? '\\\\\\\\x1bI[%1]'.format(icon) : '';\\\"\"}","{\"Match:str\":\"StateName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataStates;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"LastGainObj\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = true;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjIcon\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectIcon();\\\"\"}","{\"Match:str\":\"LastGainObjName\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const icon = false;\\\\nreturn this.lastGainedObjectName(icon);\\\"\"}","{\"Match:str\":\"LastGainObjQuantity\",\"Type:str\":\"\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"return this.lastGainedObjectQuantity();\\\"\"}","{\"Match:str\":\"Enemy\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"EnemyName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataEnemies;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"Troop\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"const database = $dataTroops;\\\\nconst id = parseInt(arguments[1]);\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMember\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = true;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}","{\"Match:str\":\"TroopMemberName\",\"Type:str\":\"\\\\[(\\\\d+)\\\\]\",\"TextStr:str\":\"Undefined\",\"TextJS:func\":\"\\\"if (!$gameParty.inBattle()) return \\\\\\\"\\\\\\\";\\\\nconst index = (parseInt(arguments[1]) - 1) || 0;\\\\nconst member = $gameTroop.members()[index];\\\\nconst database = $dataEnemies;\\\\nconst id = member ? member.enemyId() : 0;\\\\nconst icon = false;\\\\nreturn this.databaseObjectName(database, id, icon);\\\"\"}"]
 *
 * @param TextMacros:arraystruct
 * @text Text Code Macros
 * @type struct<TextMacro>[]
 * @desc Macros that are used to quickly write batches of text.
 * Format style: [MacroName]
 * @default ["{\"Match:str\":\"Example Macro\",\"TextStr:str\":\"This is the text that will be displayed when you type [Example Macro].\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}","{\"Match:str\":\"Leader\",\"TextStr:str\":\"\\\\P[1]\",\"TextJS:func\":\"\\\"return 'Text';\\\"\"}"]
 *
 * @param Localization:struct
 * @text Text Language Settings
 * @type struct<Localization>
 * @desc Text Language settings for this plugin.
 * @default {"Main":"","Enable:eval":"false","CsvFilename:str":"Languages.csv","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Language","Localized":"","DefaultLocale:str":"English","Languages:arraystr":"[\"Bengali\",\"Chinese(Simplified)\",\"Chinese(Traditional)\",\"Czech\",\"Danish\",\"Dutch\",\"English\",\"Finnish\",\"French\",\"German\",\"Greek\",\"Hindi\",\"Hungarian\",\"Indonesian\",\"Italian\",\"Japanese\",\"Korean\",\"Norwegian\",\"Polish\",\"Portuguese\",\"Romanian\",\"Russian\",\"Slovak\",\"Spanish\",\"Swedish\",\"Tamil\",\"Thai\",\"Turkish\"]","LangNames":"","Bengali:str":"বাংলা","Chinese(Simplified):str":"简体中文","Chinese(Traditional):str":"繁體中文","Czech:str":"Čeština","Danish:str":"Dansk","Dutch:str":"Nederlands","English:str":"English","Finnish:str":"Suomi","French:str":"Français","German:str":"Deutsch","Greek:str":"Ελληνικά","Hindi:str":"हिन्दी","Hungarian:str":"Magyar","Indonesian:str":"Bahasa Indo","Italian:str":"Italiano","Japanese:str":"日本語","Korean:str":"한국어","Norwegian:str":"Norsk","Polish:str":"Polski","Portuguese:str":"Português","Romanian:str":"Română","Russian:str":"Русский","Slovak:str":"Slovenčina","Spanish:str":"Español","Swedish:str":"Svenska","Tamil:str":"தமிழ்","Thai:str":"ไทย","Turkish:str":"Türkçe"}
 *
 * @param LanguageFonts:struct
 * @text Language Fonts
 * @parent Localization:struct
 * @type struct<LanguageFonts>
 * @desc Different default fonts used for different languages.
 * Players can override this with Options Core.
 * @default {"Bengali:str":"rmmz-mainfont","Chinese(Simplified):str":"rmmz-mainfont","Chinese(Traditional):str":"rmmz-mainfont","Czech:str":"rmmz-mainfont","Danish:str":"rmmz-mainfont","Dutch:str":"rmmz-mainfont","English:str":"rmmz-mainfont","Finnish:str":"rmmz-mainfont","French:str":"rmmz-mainfont","German:str":"rmmz-mainfont","Greek:str":"rmmz-mainfont","Hindi:str":"rmmz-mainfont","Hungarian:str":"rmmz-mainfont","Indonesian:str":"rmmz-mainfont","Italian:str":"rmmz-mainfont","Japanese:str":"rmmz-mainfont","Korean:str":"rmmz-mainfont","Norwegian:str":"rmmz-mainfont","Polish:str":"rmmz-mainfont","Portuguese:str":"rmmz-mainfont","Romanian:str":"rmmz-mainfont","Russian:str":"rmmz-mainfont","Slovak:str":"rmmz-mainfont","Spanish:str":"rmmz-mainfont","Swedish:str":"rmmz-mainfont","Tamil:str":"rmmz-mainfont","Thai:str":"rmmz-mainfont","Turkish:str":"rmmz-mainfont"}
 *
 * @param LanguageImages:struct
 * @text Language Images
 * @parent Localization:struct
 * @type struct<LanguageImages>
 * @desc Allows different images to be used when different
 * languages are used. See help for more information.
 * @default {"ConvertDefault:eval":"false","Languages":"","Bengali:str":"[XX]","Chinese(Simplified):str":"[XX]","Chinese(Traditional):str":"[XX]","Czech:str":"[XX]","Danish:str":"[XX]","Dutch:str":"[XX]","English:str":"[XX]","Finnish:str":"[XX]","French:str":"[XX]","German:str":"[XX]","Greek:str":"[XX]","Hindi:str":"[XX]","Hungarian:str":"[XX]","Indonesian:str":"[XX]","Italian:str":"[XX]","Japanese:str":"[XX]","Korean:str":"[XX]","Norwegian:str":"[XX]","Polish:str":"[XX]","Portuguese:str":"[XX]","Romanian:str":"[XX]","Russian:str":"[XX]","Slovak:str":"[XX]","Spanish:str":"[XX]","Swedish:str":"[XX]","Tamil:str":"[XX]","Thai:str":"[XX]","Turkish:str":"[XX]"}
 *
 * @param TextSpeed:struct
 * @text Text Speed Option Settings
 * @type struct<TextSpeed>
 * @desc Text Speed Options Menu settings.
 * @default {"AddOption:eval":"true","AdjustRect:eval":"true","Name:str":"Text Speed","Default:num":"10","Instant:str":"Instant"}
 *
 * @param WordWrap:struct
 * @text Word Wrap Settings
 * @type struct<WordWrap>
 * @desc Settings involving Word Wrap.
 * @default {"EnableWordWrap":"","MessageWindow:eval":"false","HelpWindow:eval":"false","Rules":"","LineBreakSpace:eval":"true","TightWrap:eval":"false","EndPadding:num":"0"}
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
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param MessageWindow
 * @text Message Window
 *
 * @param MessageRows:num
 * @text Default Rows
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default number of rows to display for the Message Window.
 * @default 4
 *
 * @param MessageWidth:num
 * @text Default Width
 * @parent MessageWindow
 * @type num
 * @min 1
 * @desc Default Message Window width in pixels.
 * @default 816
 *
 * @param FastForwardKey:str
 * @text Fast Forward Key
 * @parent MessageWindow
 * @type combo
 * @option none
 * @option tab
 * @option shift
 * @option control
 * @option pageup
 * @option pagedown
 * @desc This is the key used for fast forwarding messages.
 * @default pagedown
 *
 * @param MessageTextDelay:num
 * @text Text Delay
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc How many frames to wait between characters drawn?
 * Use 0 for instant.
 * @default 1
 *
 * @param MsgWindowOffsetX:num
 * @text Offset X
 * @parent MessageWindow
 * @desc Offset Message Window horizontally.
 * Negative: Left; Positive: Right
 * @default +0
 *
 * @param MsgWindowOffsetY:num
 * @text Offset Y
 * @parent MessageWindow
 * @desc Offset Message Window vertically.
 * Negative: Up; Positive: Down
 * @default +0
 *
 * @param StretchDimmedBg:eval
 * @text Stretch Dimmed BG
 * @parent MessageWindow
 * @type boolean
 * @on Stretch
 * @off Don't
 * @desc Stretch dimmed window background to fit the whole screen.
 * @default true
 *
 * @param DefaultOutlineWidth:num
 * @text Default Outline Width
 * @parent MessageWindow
 * @type number
 * @min 0
 * @desc Changes the default outline width to this many pixels thick.
 * @default 3
 *
 * @param EachMessageStart:json
 * @text Each Message Start
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the start of each message.
 * You may use text codes.
 * @default ""
 *
 * @param EachMessageEnd:json
 * @text Each Message End
 * @parent MessageWindow
 * @type note
 * @desc This is text that is added at the end of each message.
 * You may use text codes.
 * @default ""
 *
 * @param NameBoxWindow
 * @text Name Box Window
 *
 * @param NameBoxWindowDefaultColor:num
 * @text Default Color
 * @parent NameBoxWindow
 * @min 0
 * @max 31
 * @desc Default color for the Name Box Window's text.
 * @default 0
 *
 * @param NameBoxWindowOffsetX:num
 * @text Offset X
 * @parent NameBoxWindow
 * @desc How much to offset the name box window X by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param NameBoxWindowOffsetY:num
 * @text Offset Y
 * @parent NameBoxWindow
 * @desc How much to offset the name box window Y by (as long as it doesn't go offscreen).
 * @default +0
 *
 * @param ChoiceListWindow
 * @text Choice List Window
 *
 * @param ChoiceWindowLineHeight:num
 * @text Line Height
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc What is the default line height for Show Choices?
 * @default 36
 *
 * @param ChoiceWindowMinWidth:num
 * @text Minimum Choice Width
 * @parent ChoiceListWindow
 * @type number
 * @min 0
 * @desc What is the minimum choice width for each choice?
 * 96 is the default width.
 * @default 96
 *
 * @param ChoiceWindowMaxRows:num
 * @text Max Rows
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of rows to visibly display?
 * @default 8
 *
 * @param ChoiceWindowMaxCols:num
 * @text Max Columns
 * @parent ChoiceListWindow
 * @type number
 * @min 1
 * @desc Maximum number of columns to visibly display?
 * @default 1
 *
 * @param ChoiceWindowTextAlign:str
 * @text Text Alignment
 * @parent ChoiceListWindow
 * @type select
 * @option Default
 * @value default
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 * @desc Default alignment for Show Choice window.
 * @default rmmz-mainfont
 *
 * @param DefaultTextCodes
 * @text Default Text Codes
 *
 * @param RelativePXPY:eval
 * @text Relative \PX \PY
 * @parent DefaultTextCodes
 * @type boolean
 * @on Better
 * @off Normal
 * @desc Make \PX[x] and \PY[x] adjust relative starting position than exact coordinates.
 * @default true
 *
 * @param FontBiggerCap:eval
 * @text \{ Maximum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the maximum size that \{ can reach.
 * @default 108
 *
 * @param FontSmallerCap:eval
 * @text \} Minimum
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc Determine the minimum size that \} can reach.
 * @default 12
 *
 * @param FontChangeValue:eval
 * @text \{ Change \}
 * @parent DefaultTextCodes
 * @type number
 * @min 1
 * @desc How much does \{ and \} change font size by?
 * @default 12
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoColor:
 *
 * @param DatabaseHighlighting
 * @text Database Highlighting
 *
 * @param Actors:str
 * @text Actors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Actor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Classes:str
 * @text Classes
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Class's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Skills:str
 * @text Skills
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Skill's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Items:str
 * @text Items
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Item's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Weapons:str
 * @text Weapons
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a Weapon's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Armors:str
 * @text Armors
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Armor's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param Enemies:str
 * @text Enemies
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of an Enemy's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param States:str
 * @text States
 * @parent DatabaseHighlighting
 * @type number
 * @min 0
 * @max 31
 * @desc Any usage of a State's name is given this text color.
 * Use 0 to not auto-color.
 * @default 0
 *
 * @param WordHighlighting
 * @text Word Highlighting
 *
 * @param TextColor1:arraystr
 * @text \C[1]: Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor2:arraystr
 * @text \C[2]: Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor3:arraystr
 * @text \C[3]: Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor4:arraystr
 * @text \C[4]: Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor5:arraystr
 * @text \C[5]: Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor6:arraystr
 * @text \C[6]: Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor7:arraystr
 * @text \C[7]: Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor8:arraystr
 * @text \C[8]: Light Gray
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor9:arraystr
 * @text \C[9]: Dark Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor10:arraystr
 * @text \C[10]: Dark Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor11:arraystr
 * @text \C[11]: Dark Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor12:arraystr
 * @text \C[12]: Dark Sky Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor13:arraystr
 * @text \C[13]: Dark Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor14:arraystr
 * @text \C[14]: Solid Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor15:arraystr
 * @text \C[15]: Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor16:arraystr
 * @text \C[16]: System Blue
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor17:arraystr
 * @text \C[17]: Crisis Yellow
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor18:arraystr
 * @text \C[18]: Dead Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor19:arraystr
 * @text \C[19]: Outline Black
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor20:arraystr
 * @text \C[20]: HP Orange 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor21:arraystr
 * @text \C[21]: HP Orange 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor22:arraystr
 * @text \C[22]: MP Blue 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor23:arraystr
 * @text \C[23]: MP Blue 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor24:arraystr
 * @text \C[24]: Param Up Green
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor25:arraystr
 * @text \C[25]: Param Down Red
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor26:arraystr
 * @text \C[26]: System Purple
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor27:arraystr
 * @text \C[27]: System Pink
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor28:arraystr
 * @text \C[28]: TP Green 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor29:arraystr
 * @text \C[29]: TP Green 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor30:arraystr
 * @text \C[30]: EXP Purple 1
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 * @param TextColor31:arraystr
 * @text \C[31]: EXP Purple 2
 * @parent WordHighlighting
 * @type string[]
 * @desc A list of all the words that will be automatically colored with this text color.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Font Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomFont:
 *
 * @param FontFamily:str
 * @text Font Family
 * @desc This will be what's used by RPG Maker MZ and plugins to
 * reference this specific font. NO filename extensions!
 * @default Unnamed
 *
 * @param Filename:str
 * @text Filename
 * @desc What is the filename of the font you would like to use?
 * Located inside the project's "fonts" folder.
 * @default Unnamed.ttf
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Actions
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeAction:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param CommonEvent:num
 * @text Common Event
 * @type common_event
 * @desc Select a common event to run when this text code is used in a message.
 * @default 0
 *
 * @param ActionJS:func
 * @text JS: Action
 * @type note
 * @desc JavaScript code used to perform an action when this text code appears.
 * @default "const textState = arguments[0];"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Code Replacements
 * ----------------------------------------------------------------------------
 */
/*~struct~TextCodeReplace:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this text code to work.
 * @default Key
 *
 * @param Type:str
 * @text Type
 * @type select
 * @option none
 * @value 
 * @option [x] (number)
 * @value \[(\d+)\]
 * @option <x> (string)
 * @value \<(.*?)\>
 * @desc The type of parameter to obtain (none, number, or string).
 * @default 
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The text that will appear if this match appears.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this match appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Text Macro
 * ----------------------------------------------------------------------------
 */
/*~struct~TextMacro:
 *
 * @param Match:str
 * @text Match
 * @desc This is what needs to be matched in order for this macro to work.
 * @default Key
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc The replacement text that will appear from the macro.
 * If this has a value, ignore the JS: Text version.
 * @default Undefined
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine the text that will appear if this macro appears.
 * @default "return 'Text';"
 *
 */
/* ----------------------------------------------------------------------------
 * Localization Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Localization:
 *
 * @param Main
 * @text Main Settings
 *
 * @param Enable:eval
 * @text Enable Switching?
 * @parent Main
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc Enable language switching settings for this plugin?
 * @default false
 *
 * @param LangFiletype:str
 * @text File Type
 * @parent Main
 * @type select
 * @option CSV (Legacy)
 * @value csv
 * @option TSV (Recommended)
 * @value tsv
 * @desc Which file type do you wish to use?
 * @default tsv
 *
 * @param CsvFilename:str
 * @text CSV Filename
 * @parent Main
 * @desc What is the filename of the CSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.csv
 *
 * @param TsvFilename:str
 * @text TSV Filename
 * @parent Main
 * @desc What is the filename of the TSV file to read from?
 * Located within the project's /data/ folder.
 * @default Languages.tsv
 *
 * @param Options
 * @text Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Language' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Text Language
 *
 * @param Localized
 * @text Languages
 *
 * @param DefaultLocale:str
 * @text Default Language
 * @parent Localized
 * @type select
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What is the default language used for this game?
 * @default English
 *
 * @param Languages:arraystr
 * @text Supported Languages
 * @parent Localized
 * @type select[]
 * @option Bengali
 * @option Chinese(Simplified)
 * @option Chinese(Traditional)
 * @option Czech
 * @option Danish
 * @option Dutch
 * @option English
 * @option Finnish
 * @option French
 * @option German
 * @option Greek
 * @option Hindi
 * @option Hungarian
 * @option Indonesian
 * @option Italian
 * @option Japanese
 * @option Korean
 * @option Norwegian
 * @option Polish
 * @option Portuguese
 * @option Romanian
 * @option Russian
 * @option Slovak
 * @option Spanish
 * @option Swedish
 * @option Tamil
 * @option Thai
 * @option Turkish
 * @desc What are all the supported languages supported by this
 * game's script? Remove any that aren't translated.
 * @default ["Bengali","Chinese(Simplified)","Chinese(Traditional)","Czech","Danish","Dutch","English","Finnish","French","German","Greek","Hindi","Hungarian","Indonesian","Italian","Japanese","Korean","Norwegian","Polish","Portuguese","Romanian","Russian","Slovak","Spanish","Swedish","Tamil","Thai","Turkish"]
 *
 * @param LangNames
 * @text Language Names
 *
 * @param Bengali:str
 * @text Bengali
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default বাংলা
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 简体中文
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 繁體中文
 * 
 * @param Czech:str
 * @text Czech
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Čeština
 * 
 * @param Danish:str
 * @text Danish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Dansk
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Nederlands
 * 
 * @param English:str
 * @text English
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default English
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Suomi
 * 
 * @param French:str
 * @text French
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Français
 * 
 * @param German:str
 * @text German
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Deutsch
 * 
 * @param Greek:str
 * @text Greek
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Ελληνικά
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default हिन्दी
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Magyar
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Bahasa Indo
 * 
 * @param Italian:str
 * @text Italian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Italiano
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 日本語
 * 
 * @param Korean:str
 * @text Korean
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default 한국어
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Norsk
 * 
 * @param Polish:str
 * @text Polish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Polski
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Português
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Română
 * 
 * @param Russian:str
 * @text Russian
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Русский
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Slovenčina
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Español
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Svenska
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default தமிழ்
 * 
 * @param Thai:str
 * @text Thai
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default ไทย
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent LangNames
 * @desc How does this language appear in the in-game options?
 * @default Türkçe
 *
 */
/* ----------------------------------------------------------------------------
 * Language Fonts Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageFonts:
 *
 * @param Bengali:str
 * @text Bengali
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Czech:str
 * @text Czech
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Danish:str
 * @text Danish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Dutch:str
 * @text Dutch
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param English:str
 * @text English
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Finnish:str
 * @text Finnish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param French:str
 * @text French
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param German:str
 * @text German
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Greek:str
 * @text Greek
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hindi:str
 * @text Hindi
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Italian:str
 * @text Italian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Japanese:str
 * @text Japanese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Korean:str
 * @text Korean
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Polish:str
 * @text Polish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Romanian:str
 * @text Romanian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Russian:str
 * @text Russian
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Slovak:str
 * @text Slovak
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Spanish:str
 * @text Spanish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Swedish:str
 * @text Swedish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Tamil:str
 * @text Tamil
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Thai:str
 * @text Thai
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 * 
 * @param Turkish:str
 * @text Turkish
 * @desc What font face is used for this language?
 * Make sure it is registered under Custom Font Manager.
 * @default rmmz-mainfont
 *
 */
/* ----------------------------------------------------------------------------
 * Language Images Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LanguageImages:
 *
 * @param ConvertDefault:eval
 * @text Convert Default?
 * @type boolean
 * @on Convert
 * @off Don't
 * @desc ON: Default language uses converted marker.
 * OFF: Default languages uses [XX] as marker.
 * @default false
 *
 * @param Languages
 * @text Languages
 *
 * @param Bengali:str
 * @text Bengali
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Simplified):str
 * @text Chinese (Simplified)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Chinese(Traditional):str
 * @text Chinese (Traditional)
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Czech:str
 * @text Czech
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Danish:str
 * @text Danish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Dutch:str
 * @text Dutch
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param English:str
 * @text English
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Finnish:str
 * @text Finnish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param French:str
 * @text French
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param German:str
 * @text German
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Greek:str
 * @text Greek
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hindi:str
 * @text Hindi
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Hungarian:str
 * @text Hungarian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Indonesian:str
 * @text Indonesian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Italian:str
 * @text Italian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Japanese:str
 * @text Japanese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Korean:str
 * @text Korean
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Norwegian:str
 * @text Norwegian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Polish:str
 * @text Polish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Portuguese:str
 * @text Portuguese
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Romanian:str
 * @text Romanian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Russian:str
 * @text Russian
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Slovak:str
 * @text Slovak
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Spanish:str
 * @text Spanish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Swedish:str
 * @text Swedish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Tamil:str
 * @text Tamil
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Thai:str
 * @text Thai
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 * 
 * @param Turkish:str
 * @text Turkish
 * @parent Languages
 * @desc This text will replace [XX] with in image folder names
 * and filenames when this language is selected.
 * @default [XX]
 *
 */
/* ----------------------------------------------------------------------------
 * Text Speed Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TextSpeed:
 *
 * @param AddOption:eval
 * @text Add Option?
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Text Speed' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @desc Command name of the option.
 * @default Text Speed
 *
 * @param Default:num
 * @text Default Value
 * @type number
 * @min 1
 * @max 11
 * @desc 1 - 10, slowest to fastest.
 * 11 is instant value.
 * @default 10
 *
 * @param Instant:str
 * @text Instant Speed
 * @desc Text to show "instant" text.
 * @default Instant
 *
 */
/* ----------------------------------------------------------------------------
 * Word Wrap Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~WordWrap:
 *
 * @param EnableWordWrap
 * @text Enable Word Wrap
 *
 * @param MessageWindow:eval
 * @text Message Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param HelpWindow:eval
 * @text Help Window
 * @parent EnableWordWrap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Automatically enable Word Wrap for this window?
 * @default false
 *
 * @param Rules
 * @text Rules
 *
 * @param LineBreakSpace:eval
 * @text Link Break -> Space
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Convert manually placed (non tagged) line breaks with spaces?
 * @default true
 *
 * @param TightWrap:eval
 * @text Tight Wrap
 * @parent Rules
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc If a face graphic is present in a message, word wrap will be tighter.
 * @default false
 *
 * @param EndPadding:num
 * @text End Padding
 * @parent Rules
 * @type number
 * @desc Add extra padding to your window to make text wrap further away from the end of the window.
 * @default 0
 *
 */
//=============================================================================

const _0x427ba4=_0x3f1d;(function(_0x5778b6,_0x5d313e){const _0x323d54=_0x3f1d,_0x46b320=_0x5778b6();while(!![]){try{const _0x46bc4e=-parseInt(_0x323d54(0x3c6))/0x1*(-parseInt(_0x323d54(0x1fc))/0x2)+-parseInt(_0x323d54(0x15f))/0x3*(parseInt(_0x323d54(0x3ba))/0x4)+-parseInt(_0x323d54(0x2f0))/0x5+-parseInt(_0x323d54(0x27a))/0x6*(-parseInt(_0x323d54(0x489))/0x7)+-parseInt(_0x323d54(0x4af))/0x8*(-parseInt(_0x323d54(0x4e4))/0x9)+parseInt(_0x323d54(0x3f7))/0xa+-parseInt(_0x323d54(0x2a6))/0xb;if(_0x46bc4e===_0x5d313e)break;else _0x46b320['push'](_0x46b320['shift']());}catch(_0x1d1298){_0x46b320['push'](_0x46b320['shift']());}}}(_0x2bc0,0x3e704));function _0x3f1d(_0x4cb756,_0xdae68d){const _0x2bc096=_0x2bc0();return _0x3f1d=function(_0x3f1d0b,_0x15f45d){_0x3f1d0b=_0x3f1d0b-0x10c;let _0x4e39c7=_0x2bc096[_0x3f1d0b];return _0x4e39c7;},_0x3f1d(_0x4cb756,_0xdae68d);}var label=_0x427ba4(0x243),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x427ba4(0x332)](function(_0xc6ffe0){const _0x3451cb=_0x427ba4;return _0xc6ffe0[_0x3451cb(0x203)]&&_0xc6ffe0['description'][_0x3451cb(0x4e5)]('['+label+']');})[0x0];function _0x2bc0(){const _0x31637e=['isWeapon','Italian','setLastGainedItemData','%1,\x20does\x20not\x20support\x20attempted\x20text\x20code\x20usage.','#7cc576','TextCodeActions','rtl','Au\x20revoir','MessageTextDelay','_moveEasingType','reduce','onProcessCharacter','calcMoveEasing','clamp','preemptive','loadDatabase','createChoiceListHelpWindow','_targets','update','statusText','down\x20left','messageCoreTextSpeed','choices','_pictureTextRefresh','map','crisis','levelUp','_textMacroFound','setMessageWindowWidth','_maxShuffleChoices','<LINE\x20BREAK>','erasePictureTextBuffer','setFaceImage','processPreviousColor','_itemChoiceItypeId','substring','remove','Sprite_Picture_updateBitmap','members','itemChoiceActorId','Weapons','Bitmap_drawText','SelectWeapon','lower\x20right','commandName','ArmorTypeID','pink','processTextAlignmentChange','Adiós','Cześć','CENTERPICTURE','NUM','choiceAlignText','min','Bitmap_measureTextWidth','itemChoiceEtypeId','Window_Options_addGeneralOptions','isSceneBattle','open','defeat','windowPadding','itemBackColor2','powerDownColor','call','2513JQmtzi','Finnish','Scene_Boot_loadGameFonts','Ciao','Russian','obtainEscapeParam','OffsetX','Window_Base_processEscapeCharacter','_positionType','_pictureTextSprite','upperleft','LangFiletype','addChoiceDistance','\x1bCASING[5]','ParseSkillNotetags','moveBy','confirmConvertCsvToTsv','csv','boxWidth','onLocalizationXhrError','easeOut','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','choiceCols','ALL','Olá','createLocalizationCsvFile','%1\x20file\x20cannot\x20be\x20created.\x0aPlease\x20enter\x20Playtest\x20mode.\x0a','setTextDelay','_messageOffsetX','textCodeCheck','processDrawPicture','Window_Base_update','description','isBusy','getLastGainedItemData','setTextAlignment','choiceLineHeight','addedWidth','8ekCAPd','WeaponTypeID','MaxCols','upper-right','outlineColor','updatePlacement','(((','\x1bBOLD[1]','_itemChoiceWtypeId','ceil','obtainGold','isTriggered','CASING','getMessageWindowWidth','PREVCOLOR','drawMessageFace','followers','addWindow','\x1bTEXTALIGNMENT[1]','Languages.csv','choiceDistance','_list','getTextAlignment','crisisColor','Slovak','_choiceListHelpWindow','SWITCHES','_choiceIndexArray','bind','French','prepareForcedPositionEscapeCharacters','drawBackground','updateTransform','NameBoxWindowOffsetX','Padding','_autoPosRegExp','process_VisuMZ_MessageCore_TextCodes_Replace','ConvertParams','clearPictures','startWait','processActorNameAutoColorChanges','upcenter','isOptionValid','Hindi','width','Window_Base_textSizeEx','shift','MessageWindowXyOffsets','changeTextSpeed','test','nextEventCode','systemColor','addedHeight','4375440VoCQzd','includes','Rows','processEscapeCharacter','Szia','_choices','outputHeight','$dataLocalization','_moveTargetY','updateDimensions','Auf\x20Wiedersehen','loadMessageFace','processMessageCoreEscapeActions','Would\x20you\x20like\x20the\x20plugin\x20to\x20create\x20the\x20base\x20%1\x20file?\x0a\x0a','_lastGainedItemData','onChoice','Window_Message_clearFlags','itemChoiceItypeId','data/','ParseAllNotetags','안녕하세요','Game_Screen_clearPictures','resetTextColor','#fff799','iconIndex','CSV','charCodeAt','isChoiceWindow','indexOf','COMMONEVENT','makeData','FastForwardKey','clearActorNameAutoColor','pageup','maxFontSizeInLine','\x1bC[%1]%2\x1bPREVCOLOR[0]','itemChoiceWtypeId','Arrivederci','_texts','convertTextMacros','textSpeedStatusText','Chinese(Traditional)','processAutoColorWords','Guau','getMessageWindowRows','%1\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.\x0a','onDatabaseLoaded','parameters','ITALIC','<COLORLOCK>','battle\x20party','textSizeExRaw','itemPadding','currencyUnit','show','getInputButtonString','itemHeight','middleleft','isInputting','\x1bWrapJpBreak[0]','getChoiceListTextAlign','visuMzTextLocaleStatusText','launchMessageCommonEvent','WORD_WRAP_PADDING','addMessageCommonEvent','_moveTargetWidth','MessageRandomize','messageWidth','Farvel','slice','clearFlags','isBreakShowTextCommands','parse','</CENTER>','Game_Message_setChoices','createContents','Window_Base_changeTextColor','<LEFT>','Window_Message_isTriggered','left','setupEvents','_resetRect','requestChoiceBackgroundImage','maxCommands','onNewPageMessageCore','addExtraShowChoices','resizePictureText','PictureTextErase','CreateAutoColorRegExpListEntries','buffer','drawTextEx','MsgWindowOffsetY','addMessageCoreTextSpeedCommand','TEXTALIGNMENT','_moveTargetHeight','Tamil','obtainExp','isArmor','updateOverlappingY','Name','Window_Base_processControlCharacter','_helpWindow','FontFamily','convertMessageCoreEscapeActions','textSizeEx','convertLockColorsEscapeCharacters','parseLocalizedText','_index','mainFontFace','<RIGHT>','updateNameBoxMove','Classes','1153896jHFJpd','messageWindowRect','code','applyData','drawBackPicture','loadBitmap','add','_choiceListWindow','skill','lowerleft','NameBoxWindowOffsetY','canMove','FontBiggerCap','Hei','ActorID','Game_Party_initialize','registerActorNameAutoColorChanges','actorSlotName','CommonEvent','getLanguageAt','Привет','processControlCharacter','textSizeExTextAlignment','makeCommandListShuffle','toUpperCase','<I>','processCustomWait','getSkillTypes','Press\x20Cancel\x20to\x20create\x20new\x20TSV.','ARRAYSTRUCT','_pictureTextHeight','lowerright','\x1bCASING[0]','CustomFonts','resetPositionX','convertVariableEscapeCharacters','ConfigManager_applyData','clearRect','itemChoiceStypeId','addContinuousShowTextCommands','initialize','Ha\x20det','startX','updateBitmap','fontItalic','up-center','getStartingChoiceWidth','middleright','VariableID','uppercenter','%1\x20file\x20has\x20not\x20been\x20made.\x0a','setText','getLanguageName','WordWrap','system','setWaitMode','_indent','prepareWordWrapEscapeCharacters','drawItemContents','changeValue','_macroBypassWordWrap','contents','gray','setupNumInput','up-left','apply','up\x20right','_interpreter','_centerMessageWindow','_autoSizeRegexp','changeChoiceBackgroundColor','convertShowChoiceEscapeCodes','placeCancelButton','Game_Interpreter_PluginCommand','random','ChoiceWindowDistance','_scriptCall','drawText','isHelpWindowWordWrap','Settings','processPxTextCode','registerCommand','ParseLocalizationCsv','<B>','mainModule','addContinuousShowChoices','loadLocalization','\x1bWrapBreak[0]','replace','<%1>','blt','partyMemberName','obtainEscapeString','_cancelButton','lower-right','outLineColor','setSpeakerName','itemChoiceActor','scale','requestPictureTextRefreshAll','constructor','maxChoiceWidth','normalColor','Romanian','Hola','mainFontSize','LineBreakSpace','process_VisuMZ_MessageCore_AutoColor','loadPicture','clearAllPictureTexts','defaultColor','setWordWrap','STRUCT','message','autoPositionOffsetX','Window_Base_processAllText','outlineWidth','getChoiceIndent','TextManager_message','setBackground','SWITCH','_commonEventId','Window_MessageLog','AddOption','index','PICTURE','padding','makeItemList','onLocalizationXhrLoad','setMessageWindowRows','TextStr','textSizeExWordWrap','changeVolume','exit','CreateAutoColorFor','messages','setWeaponChoice','name','charAt','down-left','writeFileSync','lastGainedObjectQuantity','addMessageCoreLocalizationCommand','updateForcedPlacement','こんにちは','up\x20left','Norwegian','updateChoiceListHelpWindowPlacement','openLocalizationFolder','До\x20свидания','findTargetSprite','stringify','_itemChoiceAtypeId','itemChoiceAtypeId','trim','setChoiceListMaxColumns','loadCustomFontsMessageCore','36kkyhsS','makeFontSmaller','\x1bTEXTALIGNMENT[0]','setChoiceListMinChoiceWidth','DefaultLocale','ARRAYEVAL','convertButtonAssistEscapeCharacters','status','Waouh','isAutoColorAffected','hide','green','displayName','lastGainedObjectName','choiceCancelType','createPictureText','Match','UNDEFINED!','escapeStart','DataManager_loadDatabase','ChoiceWindowMaxRows','textCodeResult','getLocalizedText','applyDatabaseAutoColor','WAIT','faceName','Farewell','ว้าว','isClosed','updateMove','processNewLine','ANY','grey','return\x20\x27','ImageManager_loadBitmap','toLowerCase','setMessageWindowXyOffsets','lower-center','some','adjustShowChoiceDefault','split','Window_Message_newPage','upper-left','Sprite_Picture_update','preFlushTextState','height','ParseClassNotetags','Salut','processTextCasing','getRandomTextFromPool','Adeus','_pictureTextBuffer','format','onload','upper\x20right','battleActionName','boxHeight','drawItemNumber','setRelativePosition','Window_EventItem_includes','setChoiceListLineHeight','isVisuMzLocalizationEnabled','makeSkillList','updateAutoSizePosition','isSkillHidden','Wauw','\x1bITALIC[0]','processWrapBreak','enabled','wtypeId','isClosing','MessageCore','updateHelp','_pictureTextCache','_autoPositionTarget','isContinuePrepareShowTextCommands','clearChoiceHelpDescriptions','ParseItemNotetags','VisuMZ_4_ExtraEnemyDrops','SelectSkill','EquipTypeID','startY','ARRAYNUM','stretchDimmerSprite','exec','deactivate','contentsHeight','itemBackColor1','changeVisuMzTextLocale','resetRect','processPyTextCode','requestChoiceForegroundImage','ParseAddedText','VisuMZ_1_SkillsStatesCore','command101','Näkemiin','none','getColor','Chinese(Simplified)','\x1bCOLORLOCK[1]','every','round','वाह','Window_Message_terminateMessage','downcenter','</I>','TextSpeed','Window_Options_statusText','_lastAltCase','itemRectWithPadding','upper-center','easeInOut','atypeId','_moveTargetX','CheckCompatibility','createTsvFile','_action','processFailsafeChoice','MsgWindowOffsetX','_itemChoiceActorId','Vau','setupItemChoice','_wholeMoveDuration','Filename','setChoiceListTextAlign','convertChoiceMacros','4854YBCViy','Spanish','windowWidth','#fbaf5d','actorName','filename','inBattle','resetWordWrap','Window_ChoiceList','Good-bye','drawBackCenteredPicture','postFlushTextState','getChoiceListMaxRows','VisuMZ_3_ActSeqCamera','_messageOffsetY','colSpacing','_dimmerSprite','currentExt','overrideMimeType','EVAL','emerge','_pictureTextWindow','windowX','map\x20player','LocalizationType','forEach','right','createTextState','tsv','textColor','registerSelfEvent','_choiceHelpDescriptions','faceWidth','convertEscapeCharacters','applyChoiceHelpDescriptions','ChoiceWindowProperties','initMessageCore','map\x20actor','eraseAllPictureTexts','splice','DefaultOutlineWidth','\x1bI[%1]','choiceRows','clampPlacementPosition','5333581pgUogi','PictureIDs','applyMoveEasing','\x1bi[%1]','advanced','commandSymbol','battle\x20enemy','updatePictureText','actor','textSpeed','moveTo','down','anchorPictureText','indent','getPictureText','returnPreservedFontSettings','paintOpacity','processFontChangeBold','Type','map\x20event','setPositionType','in\x20order\x20for\x20VisuMZ_1_MessageCore\x20to\x20work.','terminateMessage','Wah','MaxRows','selectDefault','AddAutoColor','TextCodeReplace','_pictureId','\x1bCOLORLOCK[0]','Skills','#a186be','violet','updateBackground','setValue','command357','Window_Message_synchronizeNameBox','max','Bonjour','_scene','Undefined','makeCommandList','Game_Map_initialize','start\x20.\x5cdata','needsNewPage','isChoiceVisible','refresh','#c69c6d','setHelpWindowWordWrap','Halo','_currentAutoSize','helpWordWrap','SplitJpCnCharacters','resetFontSettings','addGeneralOptions','अलविदा','_relativePosition','Press\x20OK\x20to\x20convert\x20to\x20TSV.\x0a','Game_Map_setupEvents','refreshWithTextCodeSupport','setupChoices','switchOutTextForLocalization','convertNewPageTextStateMacros','outputWidth','Selamat\x20tinggal','Vay','list','setChoiceMessageDistance','callCancelHandler','English','Window_Message_processEscapeCharacter','setSkillChoice','processColorLock','_spriteset','1101810YnIMTk','processAutoPosition','center','GET','Window_Base_processNewLine','false','process_VisuMZ_MessageCore_TextMacros','attachPictureText','Portuguese','Please\x20restart\x20the\x20game.','Uau','AutoColorRegExp','Window_ChoiceList_updatePlacement','lower\x20left','processAllText','_pictureText','drawItem','হ্যালো','ParseEnemyNotetags','Window_NameBox_updatePlacement','zoomScale','addMessageCoreCommands','Sbohem','\x1bTEXTALIGNMENT','Hello','maxShuffleChoices','item','வணக்கம்','lineHeight','getPictureTextBuffer','getMessageWindowXyOffsets','text','choiceIndexArray','Indonesian','Greeting','true','openness','[XX]','MessageRows','join','processFsTextCode','Game_Party_gainItem','setHelpWindow','initTextAlignement','load','setupShuffleChoices','HIDE','path','victory','isChoiceEnabled','_textDelayCount','SortObjectByKeyLength','updateEvents','_eventId','value','Window_Help_refresh','preConvertEscapeCharacters','push','Hungarian','quantity','VisuMZ_1_EventsMoveCore','white','Distance','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','isWordWrapEnabled','synchronizeNameBox','filter','Japanese','yellow','Localization','processDrawCenteredPicture','addLoadListener','processCommonEvent','match','etypeId','Window_ChoiceList_windowX','getChoiceMessageDistance','convertBaseEscapeCharacters','Scene_Options_maxCommands','_moveDuration','TextColor','registerResetRect','\x1bCASING[4]','open\x20.\x5cdata','parseChoiceText','_choiceCancelType','Armors','You\x20do\x20not\x20have\x20a\x20language\x20%1\x20set\x20up.\x0a','FUNC','setChoices','_refreshPauseSign','close','drawCustomBackgroundColor','Wow','Window_Command_addCommand','innerHeight','_messageWindow','_pictureTextWidth','midcenter','_showFast','createChoiceListWindow','getLastPluginCommandInterpreter','gradientFillRect','prototype','maxCols','_nameBoxWindow','isRunning','isSceneMap','weapon','refreshDimmerBitmap','Ahoj','ConvertTextAutoColorRegExpFriendly','dimColor2','messageRows','battleTargetName','VisuMZ_4_ExtraEnemyDrops\x20needs\x20to\x20be\x20updated\x20','convertCsvToTsvFile','instantTextSpeed','_textCasingUpperState','fontSize','<BR>','AutoColorBypassList','postConvertEscapeCharacters','Turkish','_wordWrap','TsvFilename','prepareShowTextCommand','choiceListHelpWindowRect','downright','black','move','newPage','event','Tot\x20ziens','ChoiceWindowMaxCols','send','Game_Interpreter_setupChoices','LanguageImages','VisuMZ_0_CoreEngine','messagePositionReset','isItem','getConfigValue','TSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.','down-center','messageCoreWindowX','processStoredAutoColorChanges','surprise','getPictureTextData','ChoiceWindowLineHeight','</WORDWRAP>','makeDeepCopy','choicePositionType','สวัสดี','isColorLocked','makeCommandListScriptCall','loadGameFonts','cancel','MessageWindowProperties','dirname','floor','updateOffsetPosition','LineHeight','ParseStateNotetags','midleft','isMessageWindowWordWrap','Window_ItemList_drawItemNumber','gainItem','\x1bi[%1]%2','onerror','clear','isVolumeSymbol','Game_Map_refresh','\x1bCASING[2]','ChoiceWindowMinWidth','messageWordWrap','erasePicture','menu','setChoiceListMaxRows','Hej','follower','bitmap','application/csv','CsvFilename','Window_Message_needsNewPage','application/%1','addWrapBreakAfterPunctuation','convertBackslashCharacters','updateMessageCommonEvents','realignMapName','Unnamed.ttf','child_process','isRTL','upper\x20center','setColorLock','processAutoSize','AutoColor',')))','maxLines','NameBoxWindowDefaultColor','setPictureTextBuffer','process_VisuMZ_MessageCore_TextCodes_Action','Default','4dvjzEC','ParseWeaponNotetags','_forcedPosition','setPictureText','hasPictureText','updateRelativePosition','drawPictureText','<CENTER>','calcWindowHeight','TextJS','red','addCommand','11041NJGRKh','middlecenter','_itemChoiceEtypeId','orange','STR','Enemies','currentCommand','convertButtonAssistText','\x1bITALIC[1]','needsPictureTextRefresh','さようなら','_textCasing','choice','SelectArmor','anyPictureTextChanges','EachMessageStart','getChoiceListMaxColumns','varID','sort','_messageCommonEvents','upleft','_itemChoiceStypeId','version','MESSAGE_CORE_PLUGIN_NAME','Window_ChoiceList_callCancelHandler','OffsetY','setLastPluginCommandInterpreter','_MessageCoreSettings','Languages','_textAlignment','anchor','Actors','brown','_target','processCharacter','drawing','General','ওহে','_lastPluginCommandInterpreter','%1\x20file\x20detected.\x0a','TextColor%1','NonSupportedTextCodes','randomInt','ParseArmorNotetags','_autoColorActorNames','textFont','map\x20party','_messagePositionReset','Window_Message_updatePlacement','3702840fvyPjm','changeTextColor','Window_Options_isVolumeSymbol','responseText','adjustShowChoiceExtension','_textDelay','ARRAYSTR','Hallo','battle\x20actor','ConvertDefault','messageCoreLocalization','drawSkillCost','Scene_Boot_onDatabaseLoaded','ShuffleArray','getChoiceListLineHeight','log','Swedish','autoPositionOffsetY','FontSmallerCap','type','flushTextState','fontBold','prepareShowTextFollowups','TightWrap','getPreservedFontSettings','Game_Map_updateEvents','Enable','default','strokeRect','drawChoiceLocationImage','midright','#f26c4f','_autoSizeCheck','Items','Languages.tsv','Window_Options_changeVolume','\x1bBOLD[0]','setMessageWindowWordWrap','#ffc8e0','_itemChoiceVariableId','prepareAutoSizeEscapeCharacters','adjustShowChoiceCancel','choiceTextAlign','ARRAYJSON','upperright','ConfigManager_makeData','Scene_Message_createChoiceListWindow','armor','\x1bTEXTALIGNMENT[3]','_colorLock','length','TextMacros','processTextAlignmentX','lower\x20center','contentsBack','yes','ChoiceWindowTextAlign','convertHardcodedEscapeReplacements','databaseObjectName','Bitmap_drawTextTopAligned','String_format','start','setChoiceListHelpWindow','textLocale','_textColorStack','getChoiceListMinChoiceWidth','getCurrentLanguage','Zbohom','updateAutoPosition','Czech','setArmorChoice','convertCasingEscapeCharacters','visible','ExtraEnemyDrops','States','requestPictureTextRefresh','realPictureId','Instant','up\x20center','Γειά\x20σου','\x5c%1','unnamed'];_0x2bc0=function(){return _0x31637e;};return _0x2bc0();}VisuMZ[label][_0x427ba4(0x1ae)]=VisuMZ[label][_0x427ba4(0x1ae)]||{},VisuMZ[_0x427ba4(0x4d4)]=function(_0x49c63a,_0x27e8b8){const _0x43953d=_0x427ba4;for(const _0xd5ec22 in _0x27e8b8){if(_0xd5ec22[_0x43953d(0x339)](/(.*):(.*)/i)){const _0x22d331=String(RegExp['$1']),_0x132020=String(RegExp['$2'])[_0x43953d(0x177)]()[_0x43953d(0x1f9)]();let _0x505a14,_0x4f2cae,_0x2998ac;switch(_0x132020){case _0x43953d(0x47c):_0x505a14=_0x27e8b8[_0xd5ec22]!==''?Number(_0x27e8b8[_0xd5ec22]):0x0;break;case _0x43953d(0x24e):_0x4f2cae=_0x27e8b8[_0xd5ec22]!==''?JSON['parse'](_0x27e8b8[_0xd5ec22]):[],_0x505a14=_0x4f2cae[_0x43953d(0x461)](_0x30bb7a=>Number(_0x30bb7a));break;case _0x43953d(0x28d):_0x505a14=_0x27e8b8[_0xd5ec22]!==''?eval(_0x27e8b8[_0xd5ec22]):null;break;case _0x43953d(0x201):_0x4f2cae=_0x27e8b8[_0xd5ec22]!==''?JSON['parse'](_0x27e8b8[_0xd5ec22]):[],_0x505a14=_0x4f2cae[_0x43953d(0x461)](_0x2aefc5=>eval(_0x2aefc5));break;case'JSON':_0x505a14=_0x27e8b8[_0xd5ec22]!==''?JSON[_0x43953d(0x137)](_0x27e8b8[_0xd5ec22]):'';break;case _0x43953d(0x422):_0x4f2cae=_0x27e8b8[_0xd5ec22]!==''?JSON[_0x43953d(0x137)](_0x27e8b8[_0xd5ec22]):[],_0x505a14=_0x4f2cae[_0x43953d(0x461)](_0x5b0662=>JSON[_0x43953d(0x137)](_0x5b0662));break;case _0x43953d(0x348):_0x505a14=_0x27e8b8[_0xd5ec22]!==''?new Function(JSON[_0x43953d(0x137)](_0x27e8b8[_0xd5ec22])):new Function('return\x200');break;case'ARRAYFUNC':_0x4f2cae=_0x27e8b8[_0xd5ec22]!==''?JSON['parse'](_0x27e8b8[_0xd5ec22]):[],_0x505a14=_0x4f2cae[_0x43953d(0x461)](_0x303796=>new Function(JSON['parse'](_0x303796)));break;case _0x43953d(0x3ca):_0x505a14=_0x27e8b8[_0xd5ec22]!==''?String(_0x27e8b8[_0xd5ec22]):'';break;case _0x43953d(0x3fd):_0x4f2cae=_0x27e8b8[_0xd5ec22]!==''?JSON['parse'](_0x27e8b8[_0xd5ec22]):[],_0x505a14=_0x4f2cae[_0x43953d(0x461)](_0x5bfc11=>String(_0x5bfc11));break;case _0x43953d(0x1cf):_0x2998ac=_0x27e8b8[_0xd5ec22]!==''?JSON[_0x43953d(0x137)](_0x27e8b8[_0xd5ec22]):{},_0x49c63a[_0x22d331]={},VisuMZ[_0x43953d(0x4d4)](_0x49c63a[_0x22d331],_0x2998ac);continue;case _0x43953d(0x17c):_0x4f2cae=_0x27e8b8[_0xd5ec22]!==''?JSON['parse'](_0x27e8b8[_0xd5ec22]):[],_0x505a14=_0x4f2cae['map'](_0x3ea807=>VisuMZ[_0x43953d(0x4d4)]({},JSON[_0x43953d(0x137)](_0x3ea807)));break;default:continue;}_0x49c63a[_0x22d331]=_0x505a14;}}return _0x49c63a;},(_0x27058d=>{const _0x1d6af1=_0x427ba4,_0xdca52a=_0x27058d[_0x1d6af1(0x1e8)];for(const _0x17cad3 of dependencies){if(!Imported[_0x17cad3]){alert(_0x1d6af1(0x32f)['format'](_0xdca52a,_0x17cad3)),SceneManager['exit']();break;}}const _0x949f36=_0x27058d[_0x1d6af1(0x4a9)];if(_0x949f36[_0x1d6af1(0x339)](/\[Version[ ](.*?)\]/i)){const _0x10d2c1=Number(RegExp['$1']);_0x10d2c1!==VisuMZ[label][_0x1d6af1(0x3dc)]&&(alert(_0x1d6af1(0x49e)[_0x1d6af1(0x230)](_0xdca52a,_0x10d2c1)),SceneManager[_0x1d6af1(0x1e4)]());}if(_0x949f36[_0x1d6af1(0x339)](/\[Tier[ ](\d+)\]/i)){const _0x13bc75=Number(RegExp['$1']);_0x13bc75<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0xdca52a,_0x13bc75,tier)),SceneManager[_0x1d6af1(0x1e4)]()):tier=Math[_0x1d6af1(0x2cb)](_0x13bc75,tier);}VisuMZ[_0x1d6af1(0x4d4)](VisuMZ[label][_0x1d6af1(0x1ae)],_0x27058d[_0x1d6af1(0x11e)]);})(pluginData),PluginManager[_0x427ba4(0x1b0)](pluginData['name'],_0x427ba4(0x1aa),_0x3405c0=>{const _0x40d5b7=_0x427ba4;VisuMZ[_0x40d5b7(0x4d4)](_0x3405c0,_0x3405c0);const _0x50ed68=Number(_0x3405c0[_0x40d5b7(0x32e)])||0x0;$gameSystem[_0x40d5b7(0x2e9)](_0x50ed68);}),PluginManager[_0x427ba4(0x1b0)](pluginData[_0x427ba4(0x1e8)],_0x427ba4(0x29d),_0x4333b3=>{const _0x11d324=_0x427ba4;VisuMZ[_0x11d324(0x4d4)](_0x4333b3,_0x4333b3);const _0x5566f3=_0x4333b3[_0x11d324(0x391)]||$gameSystem[_0x11d324(0x405)]()||0x1,_0x37d7fd=_0x4333b3['MinWidth']??0x60,_0x478a9f=_0x4333b3[_0x11d324(0x2be)]||$gameSystem[_0x11d324(0x286)]()||0x1,_0x5f2962=_0x4333b3[_0x11d324(0x4b1)]||$gameSystem[_0x11d324(0x3d6)]()||0x1,_0x1dc1b7=_0x4333b3['TextAlign'][_0x11d324(0x21f)]()||_0x11d324(0x412);$gameSystem[_0x11d324(0x238)](_0x5566f3),$gameSystem[_0x11d324(0x1ff)](_0x37d7fd),$gameSystem[_0x11d324(0x3a1)](_0x478a9f),$gameSystem[_0x11d324(0x1fa)](_0x5f2962),$gameSystem[_0x11d324(0x278)](_0x1dc1b7);}),PluginManager[_0x427ba4(0x1b0)](pluginData[_0x427ba4(0x1e8)],_0x427ba4(0x38d),_0x265621=>{const _0x4dba34=_0x427ba4;VisuMZ['ConvertParams'](_0x265621,_0x265621);const _0x2ce98f=_0x265621[_0x4dba34(0x4e6)]||$gameSystem[_0x4dba34(0x11b)]()||0x1,_0x194190=_0x265621['Width']||$gameSystem[_0x4dba34(0x4bc)]()||0x1;$gameTemp['_centerMessageWindow']=!![];const _0x32bb3a=_0x265621[_0x4dba34(0x194)][_0x4dba34(0x21f)]();$gameSystem[_0x4dba34(0x1e0)](_0x2ce98f),$gameSystem['setMessageWindowWidth'](_0x194190);[_0x4dba34(0x313),_0x4dba34(0x2f5)][_0x4dba34(0x4e5)](_0x32bb3a)&&$gameSystem[_0x4dba34(0x41c)](eval(_0x32bb3a));const _0x3adb47=SceneManager[_0x4dba34(0x2cd)][_0x4dba34(0x350)];_0x3adb47&&(_0x3adb47[_0x4dba34(0x281)](),_0x3adb47[_0x4dba34(0x4ed)](),_0x3adb47['createContents']());}),PluginManager[_0x427ba4(0x1b0)](pluginData['name'],_0x427ba4(0x131),_0x4c71e5=>{const _0x17aece=_0x427ba4;VisuMZ[_0x17aece(0x4d4)](_0x4c71e5,_0x4c71e5);const _0x1d0ecc=_0x4c71e5[_0x17aece(0x1e6)]||[];if(_0x1d0ecc[_0x17aece(0x429)]<=0x0)return;const _0x304e9f=_0x4c71e5[_0x17aece(0x3d7)]||0x0;if(!_0x304e9f)return;const _0x29b75b=_0x1d0ecc[Math[_0x17aece(0x3f0)](_0x1d0ecc['length'])];$gameVariables[_0x17aece(0x2c8)](_0x304e9f,_0x29b75b);}),PluginManager[_0x427ba4(0x1b0)](pluginData['name'],_0x427ba4(0x4de),_0xc66e3=>{const _0x5f21cc=_0x427ba4;VisuMZ[_0x5f21cc(0x4d4)](_0xc66e3,_0xc66e3),$gameSystem[_0x5f21cc(0x220)](_0xc66e3[_0x5f21cc(0x48f)],_0xc66e3[_0x5f21cc(0x3df)]);const _0x347ae4=SceneManager[_0x5f21cc(0x2cd)][_0x5f21cc(0x350)];_0x347ae4&&(_0x347ae4[_0x5f21cc(0x281)](),_0x347ae4[_0x5f21cc(0x4ed)](),_0x347ae4[_0x5f21cc(0x13a)]());}),PluginManager['registerCommand'](pluginData[_0x427ba4(0x1e8)],_0x427ba4(0x473),_0xa10bf1=>{const _0x3e28ca=_0x427ba4;VisuMZ[_0x3e28ca(0x4d4)](_0xa10bf1,_0xa10bf1),$gameMessage[_0x3e28ca(0x1e7)](_0xa10bf1['VariableID']||0x0,_0xa10bf1[_0x3e28ca(0x4b0)]||0x0);const _0x4f4fb0=$gameTemp[_0x3e28ca(0x355)]();if(_0x4f4fb0)_0x4f4fb0[_0x3e28ca(0x196)](_0x3e28ca(0x1d0));}),PluginManager['registerCommand'](pluginData['name'],_0x427ba4(0x3d3),_0x21bc18=>{const _0x30e163=_0x427ba4;VisuMZ['ConvertParams'](_0x21bc18,_0x21bc18),$gameMessage[_0x30e163(0x43d)](_0x21bc18[_0x30e163(0x18f)]||0x0,_0x21bc18[_0x30e163(0x476)]||0x0,_0x21bc18[_0x30e163(0x24c)]||0x0);const _0x4bc7a0=$gameTemp[_0x30e163(0x355)]();if(_0x4bc7a0)_0x4bc7a0[_0x30e163(0x196)](_0x30e163(0x1d0));}),PluginManager[_0x427ba4(0x1b0)](pluginData['name'],_0x427ba4(0x24b),_0x458719=>{const _0xadbc23=_0x427ba4;VisuMZ['ConvertParams'](_0x458719,_0x458719),$gameMessage[_0xadbc23(0x2ed)](_0x458719[_0xadbc23(0x18f)]||0x0,_0x458719[_0xadbc23(0x16d)]||0x0,_0x458719['SkillTypeID']||0x0);const _0x359b88=$gameTemp[_0xadbc23(0x355)]();if(_0x359b88)_0x359b88[_0xadbc23(0x196)](_0xadbc23(0x1d0));}),PluginManager[_0x427ba4(0x1b0)](pluginData[_0x427ba4(0x1e8)],'PictureTextChange',_0x92b728=>{const _0x27af75=_0x427ba4;VisuMZ[_0x27af75(0x4d4)](_0x92b728,_0x92b728);const _0x216cea=_0x92b728[_0x27af75(0x2a7)]||[],_0x4ecdf0=_0x92b728[_0x27af75(0x4d1)]||0x0,_0xa432e3=[_0x27af75(0x493),'up',_0x27af75(0x423),_0x27af75(0x13e),'center',_0x27af75(0x294),_0x27af75(0x168),_0x27af75(0x2b1),'lowerright'];for(const _0x85a48f of _0x216cea){$gameScreen[_0x27af75(0x3b7)](_0x85a48f,_0x4ecdf0);for(const _0x543d85 of _0xa432e3){if(_0x92b728[_0x543d85]===undefined)continue;$gameScreen[_0x27af75(0x3bd)](_0x85a48f,_0x92b728[_0x543d85],_0x543d85);}}}),PluginManager[_0x427ba4(0x1b0)](pluginData['name'],_0x427ba4(0x146),_0x34c722=>{const _0x4d3cc8=_0x427ba4;VisuMZ[_0x4d3cc8(0x4d4)](_0x34c722,_0x34c722);const _0x2cf434=_0x34c722[_0x4d3cc8(0x2a7)]||[];for(const _0x2ea725 of _0x2cf434){$gameScreen[_0x4d3cc8(0x2a0)](_0x2ea725),$gameScreen['erasePictureTextBuffer'](_0x2ea725);}}),PluginManager[_0x427ba4(0x1b0)](pluginData[_0x427ba4(0x1e8)],'PictureTextRefresh',_0xf207be=>{$gameScreen['requestPictureTextRefreshAll']();}),VisuMZ[_0x427ba4(0x243)]['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x427ba4(0x357)][_0x427ba4(0x11d)],Scene_Boot[_0x427ba4(0x357)]['onDatabaseLoaded']=function(){const _0x515800=_0x427ba4;VisuMZ['MessageCore'][_0x515800(0x403)]['call'](this),VisuMZ[_0x515800(0x243)][_0x515800(0x26e)](),this[_0x515800(0x3b8)](),this[_0x515800(0x4d3)](),this[_0x515800(0x2f6)](),this[_0x515800(0x1ca)]();},VisuMZ[_0x427ba4(0x243)]['CheckCompatibility']=function(){const _0x496c3f=_0x427ba4;if(Imported[_0x496c3f(0x24a)]&&VisuMZ[_0x496c3f(0x440)]['version']<1.09){let _0x7f957a='';_0x7f957a+=_0x496c3f(0x363),_0x7f957a+=_0x496c3f(0x2bb),alert(_0x7f957a),SceneManager[_0x496c3f(0x1e4)]();}},VisuMZ['MessageCore'][_0x427ba4(0x323)]=function(_0x2d5da6){const _0x5eb402=_0x427ba4,_0x92bb21=VisuMZ[_0x5eb402(0x243)][_0x5eb402(0x1ae)][_0x2d5da6];_0x92bb21[_0x5eb402(0x3d8)]((_0x3cdef5,_0x5d6399)=>{const _0x3cca7e=_0x5eb402;if(!_0x3cdef5||!_0x5d6399)return-0x1;return _0x5d6399[_0x3cca7e(0x20c)][_0x3cca7e(0x429)]-_0x3cdef5[_0x3cca7e(0x20c)][_0x3cca7e(0x429)];});},Scene_Boot[_0x427ba4(0x357)][_0x427ba4(0x3b8)]=function(){const _0x5c5fd8=_0x427ba4;VisuMZ[_0x5c5fd8(0x243)][_0x5c5fd8(0x323)]('TextCodeActions');for(const _0x37eb56 of VisuMZ[_0x5c5fd8(0x243)][_0x5c5fd8(0x1ae)][_0x5c5fd8(0x44e)]){_0x37eb56[_0x5c5fd8(0x20c)]=_0x37eb56[_0x5c5fd8(0x20c)]['toUpperCase'](),_0x37eb56[_0x5c5fd8(0x4a6)]=new RegExp('\x1b'+_0x37eb56[_0x5c5fd8(0x20c)],'gi'),_0x37eb56[_0x5c5fd8(0x211)]='\x1b'+_0x37eb56[_0x5c5fd8(0x20c)];if(_0x37eb56[_0x5c5fd8(0x2b8)]==='')_0x37eb56[_0x5c5fd8(0x211)]+='[0]';}},Scene_Boot['prototype'][_0x427ba4(0x4d3)]=function(){const _0x2f7642=_0x427ba4;VisuMZ[_0x2f7642(0x243)][_0x2f7642(0x323)](_0x2f7642(0x2c1));for(const _0x3f8c40 of VisuMZ['MessageCore'][_0x2f7642(0x1ae)][_0x2f7642(0x2c1)]){_0x3f8c40[_0x2f7642(0x4a6)]=new RegExp('\x1b'+_0x3f8c40[_0x2f7642(0x20c)]+_0x3f8c40['Type'],'gi'),_0x3f8c40[_0x2f7642(0x1e1)]!==''&&_0x3f8c40[_0x2f7642(0x1e1)]!==_0x2f7642(0x2ce)?_0x3f8c40[_0x2f7642(0x211)]=new Function('return\x20\x27'+_0x3f8c40[_0x2f7642(0x1e1)][_0x2f7642(0x1b7)](/\\/g,'\x1b')+'\x27'):_0x3f8c40['textCodeResult']=_0x3f8c40[_0x2f7642(0x3c3)];}},Scene_Boot[_0x427ba4(0x357)][_0x427ba4(0x2f6)]=function(){const _0x4563ed=_0x427ba4;for(const _0x4c49c7 of VisuMZ['MessageCore']['Settings'][_0x4563ed(0x42a)]){_0x4c49c7[_0x4563ed(0x4a6)]=new RegExp('\x5c['+_0x4c49c7[_0x4563ed(0x20c)]+'\x5c]','gi');if(_0x4c49c7['TextStr']!==''&&_0x4c49c7[_0x4563ed(0x1e1)]!==_0x4563ed(0x2ce)){let _0x18c690=_0x4c49c7[_0x4563ed(0x1e1)];_0x18c690=_0x18c690[_0x4563ed(0x1b7)](/\\/g,'\x1b'),_0x18c690=_0x18c690[_0x4563ed(0x1b7)]('\x27','\x5c\x27'),_0x18c690=_0x18c690[_0x4563ed(0x1b7)]('\x22','\x5c\x22'),_0x4c49c7['textCodeResult']=new Function(_0x4563ed(0x21d)+_0x18c690+'\x27');}else _0x4c49c7[_0x4563ed(0x211)]=_0x4c49c7['TextJS'];}},Scene_Boot[_0x427ba4(0x357)][_0x427ba4(0x1ca)]=function(){const _0x456759=_0x427ba4,_0x42443b=VisuMZ[_0x456759(0x243)][_0x456759(0x1ae)][_0x456759(0x3b3)];!VisuMZ[_0x456759(0x4f7)]&&(VisuMZ['MessageCore'][_0x456759(0x2c0)]($dataClasses,_0x42443b[_0x456759(0x15e)]),VisuMZ[_0x456759(0x243)][_0x456759(0x2c0)]($dataSkills,_0x42443b[_0x456759(0x2c4)]),VisuMZ[_0x456759(0x243)][_0x456759(0x2c0)]($dataItems,_0x42443b[_0x456759(0x418)]),VisuMZ[_0x456759(0x243)][_0x456759(0x2c0)]($dataWeapons,_0x42443b[_0x456759(0x471)]),VisuMZ[_0x456759(0x243)][_0x456759(0x2c0)]($dataArmors,_0x42443b[_0x456759(0x346)]),VisuMZ[_0x456759(0x243)][_0x456759(0x2c0)]($dataEnemies,_0x42443b[_0x456759(0x3cb)]),VisuMZ[_0x456759(0x243)][_0x456759(0x2c0)]($dataStates,_0x42443b[_0x456759(0x441)])),VisuMZ[_0x456759(0x243)]['CreateAutoColorRegExpLists']();},VisuMZ[_0x427ba4(0x243)]['AutoColorBypassList']=['V','N','P','C','I','PX','PY','G','{','}','<','>','FS','\x5c','$','.','|','!','<','>','^',_0x427ba4(0x1b2),'</B>',_0x427ba4(0x178),_0x427ba4(0x265),_0x427ba4(0x13c),'</LEFT>',_0x427ba4(0x3c1),_0x427ba4(0x138),_0x427ba4(0x15c),'</RIGHT>',_0x427ba4(0x120),'</COLORLOCK>',_0x427ba4(0x4b5),_0x427ba4(0x3b4),'<WORDWRAP>',_0x427ba4(0x385),_0x427ba4(0x368),_0x427ba4(0x467),_0x427ba4(0x1dc),'CENTERPICTURE',_0x427ba4(0x10c),_0x427ba4(0x214),'SHOW',_0x427ba4(0x31e),'ENABLE','DISABLE',_0x427ba4(0x1d7),_0x427ba4(0x4c9),_0x427ba4(0x4a0),_0x427ba4(0x21b)],VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x2c0)]=function(_0x529a08,_0x171239){const _0x216fc1=_0x427ba4;if(_0x171239<=0x0)return;const _0x5812e6=_0x529a08;for(const _0x355014 of _0x5812e6){if(!_0x355014)continue;VisuMZ[_0x216fc1(0x243)][_0x216fc1(0x1e5)](_0x355014,_0x171239);}},VisuMZ['MessageCore']['CreateAutoColorRegExpLists']=function(){const _0x2c12b8=_0x427ba4;VisuMZ[_0x2c12b8(0x243)][_0x2c12b8(0x2fb)]=[];for(let _0x4374b4=0x1;_0x4374b4<=0x1f;_0x4374b4++){const _0x56769f=_0x2c12b8(0x3ee)['format'](_0x4374b4),_0xfe568c=VisuMZ[_0x2c12b8(0x243)][_0x2c12b8(0x1ae)][_0x2c12b8(0x3b3)][_0x56769f];_0xfe568c[_0x2c12b8(0x3d8)]((_0x53fdd4,_0x1e1233)=>{const _0x1cff9c=_0x2c12b8;if(!_0x53fdd4||!_0x1e1233)return-0x1;return _0x1e1233[_0x1cff9c(0x429)]-_0x53fdd4[_0x1cff9c(0x429)];}),this['CreateAutoColorRegExpListEntries'](_0xfe568c,_0x4374b4);}},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x147)]=function(_0x4fc841,_0x41e992){const _0x23d2d7=_0x427ba4;for(const _0x4dac5b of _0x4fc841){if(_0x4dac5b[_0x23d2d7(0x429)]<=0x0)continue;if(/^\d+$/[_0x23d2d7(0x4e0)](_0x4dac5b))continue;let _0xf13bc1=VisuMZ[_0x23d2d7(0x243)][_0x23d2d7(0x35f)](_0x4dac5b);if(_0x4dac5b[_0x23d2d7(0x339)](/[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g))var _0x5e3744=new RegExp(_0xf13bc1,'i');else var _0x5e3744=new RegExp('\x5cb'+_0xf13bc1+'\x5cb','g');VisuMZ[_0x23d2d7(0x243)][_0x23d2d7(0x2fb)][_0x23d2d7(0x329)]([_0x5e3744,_0x23d2d7(0x112)['format'](_0x41e992,_0x4dac5b)]);}},VisuMZ['MessageCore'][_0x427ba4(0x35f)]=function(_0x121d7a){const _0x3723c1=_0x427ba4;return _0x121d7a=_0x121d7a['replace'](/(\W)/gi,(_0x24c005,_0x28c234)=>_0x3723c1(0x447)[_0x3723c1(0x230)](_0x28c234)),_0x121d7a;},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x22a)]=VisuMZ['ParseClassNotetags'],VisuMZ['ParseClassNotetags']=function(_0x170e31){const _0x521d29=_0x427ba4;VisuMZ[_0x521d29(0x243)][_0x521d29(0x22a)][_0x521d29(0x488)](this,_0x170e31);const _0x10ca55=VisuMZ[_0x521d29(0x243)][_0x521d29(0x1ae)][_0x521d29(0x3b3)];VisuMZ[_0x521d29(0x243)][_0x521d29(0x1e5)](_0x170e31,_0x10ca55['Classes']);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x497)]=VisuMZ[_0x427ba4(0x497)],VisuMZ[_0x427ba4(0x497)]=function(_0x425646){const _0x52d1fc=_0x427ba4;VisuMZ[_0x52d1fc(0x243)][_0x52d1fc(0x497)][_0x52d1fc(0x488)](this,_0x425646);const _0x4f442e=VisuMZ[_0x52d1fc(0x243)][_0x52d1fc(0x1ae)]['AutoColor'];VisuMZ['MessageCore'][_0x52d1fc(0x1e5)](_0x425646,_0x4f442e[_0x52d1fc(0x2c4)]);},0x7,VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x249)]=VisuMZ[_0x427ba4(0x249)],VisuMZ[_0x427ba4(0x249)]=function(_0x378509){const _0x33ff1a=_0x427ba4;VisuMZ['MessageCore'][_0x33ff1a(0x249)][_0x33ff1a(0x488)](this,_0x378509);const _0x17e24d=VisuMZ['MessageCore'][_0x33ff1a(0x1ae)][_0x33ff1a(0x3b3)];VisuMZ['MessageCore'][_0x33ff1a(0x1e5)](_0x378509,_0x17e24d[_0x33ff1a(0x418)]);},VisuMZ['MessageCore']['ParseWeaponNotetags']=VisuMZ[_0x427ba4(0x3bb)],VisuMZ[_0x427ba4(0x3bb)]=function(_0x455f71){const _0x309d7f=_0x427ba4;VisuMZ[_0x309d7f(0x243)][_0x309d7f(0x3bb)][_0x309d7f(0x488)](this,_0x455f71);const _0x5c018b=VisuMZ[_0x309d7f(0x243)][_0x309d7f(0x1ae)][_0x309d7f(0x3b3)];VisuMZ[_0x309d7f(0x243)][_0x309d7f(0x1e5)](_0x455f71,_0x5c018b[_0x309d7f(0x471)]);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x3f1)]=VisuMZ[_0x427ba4(0x3f1)],VisuMZ['ParseArmorNotetags']=function(_0x208edb){const _0x2b4cb3=_0x427ba4;VisuMZ[_0x2b4cb3(0x243)]['ParseArmorNotetags'][_0x2b4cb3(0x488)](this,_0x208edb);const _0x5569f2=VisuMZ[_0x2b4cb3(0x243)][_0x2b4cb3(0x1ae)][_0x2b4cb3(0x3b3)];VisuMZ['MessageCore']['CreateAutoColorFor'](_0x208edb,_0x5569f2[_0x2b4cb3(0x346)]);},VisuMZ['MessageCore']['ParseEnemyNotetags']=VisuMZ[_0x427ba4(0x302)],VisuMZ[_0x427ba4(0x302)]=function(_0x3e30a3){const _0x259aed=_0x427ba4;VisuMZ['MessageCore'][_0x259aed(0x302)][_0x259aed(0x488)](this,_0x3e30a3);const _0x13d465=VisuMZ[_0x259aed(0x243)]['Settings'][_0x259aed(0x3b3)];VisuMZ['MessageCore'][_0x259aed(0x1e5)](_0x3e30a3,_0x13d465[_0x259aed(0x3cb)]);},VisuMZ[_0x427ba4(0x243)]['ParseStateNotetags']=VisuMZ[_0x427ba4(0x392)],VisuMZ[_0x427ba4(0x392)]=function(_0x4eb40c){const _0xab02d7=_0x427ba4;VisuMZ['MessageCore']['ParseStateNotetags']['call'](this,_0x4eb40c);const _0x43eaa1=VisuMZ[_0xab02d7(0x243)][_0xab02d7(0x1ae)]['AutoColor'];VisuMZ[_0xab02d7(0x243)][_0xab02d7(0x1e5)](_0x4eb40c,_0x43eaa1['States']);},VisuMZ['MessageCore'][_0x427ba4(0x1e5)]=function(_0x48e80a,_0x2a29dc){const _0x5199ef=_0x427ba4;if(_0x2a29dc<=0x0)return;const _0x3e2a5b=VisuMZ[_0x5199ef(0x243)][_0x5199ef(0x1ae)][_0x5199ef(0x3b3)][_0x5199ef(0x340)+_0x2a29dc];let _0x5e6141=_0x48e80a['name'][_0x5199ef(0x1f9)]();if(/^\d+$/[_0x5199ef(0x4e0)](_0x5e6141))return;if(VisuMZ[_0x5199ef(0x243)][_0x5199ef(0x369)][_0x5199ef(0x4e5)](_0x5e6141[_0x5199ef(0x177)]()))return;_0x5e6141=_0x5e6141[_0x5199ef(0x1b7)](/\\I\[(\d+)\]/gi,''),_0x5e6141=_0x5e6141[_0x5199ef(0x1b7)](/\x1bI\[(\d+)\]/gi,'');if(_0x5e6141[_0x5199ef(0x429)]<=0x0)return;if(_0x5e6141[_0x5199ef(0x339)](/-----/i))return;_0x3e2a5b['push'](_0x5e6141);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x48b)]=Scene_Boot[_0x427ba4(0x357)][_0x427ba4(0x38b)],Scene_Boot[_0x427ba4(0x357)][_0x427ba4(0x38b)]=function(){const _0x55b38a=_0x427ba4;VisuMZ[_0x55b38a(0x243)][_0x55b38a(0x48b)]['call'](this),this[_0x55b38a(0x1fb)]();},Scene_Boot[_0x427ba4(0x357)][_0x427ba4(0x1fb)]=function(){const _0x454efa=_0x427ba4,_0x2ae9d9=VisuMZ[_0x454efa(0x243)][_0x454efa(0x1ae)][_0x454efa(0x180)]||[];for(const _0x14eef8 of _0x2ae9d9){if(!_0x14eef8)continue;const _0x14c61e=_0x14eef8[_0x454efa(0x155)];if(_0x14c61e[_0x454efa(0x1f9)]()==='')continue;if(_0x14c61e[_0x454efa(0x21f)]()[_0x454efa(0x1f9)]()===_0x454efa(0x448))continue;const _0x3250cd=_0x14eef8[_0x454efa(0x277)];if(_0x3250cd===_0x454efa(0x3ad))continue;FontManager[_0x454efa(0x31c)](_0x14c61e,_0x3250cd);}},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x292)]=VisuMZ[_0x427ba4(0x243)]['Settings'][_0x427ba4(0x335)][_0x427ba4(0x494)]??_0x427ba4(0x296),VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x20f)]=DataManager[_0x427ba4(0x458)],DataManager[_0x427ba4(0x458)]=function(){const _0x1bc035=_0x427ba4;VisuMZ[_0x1bc035(0x243)][_0x1bc035(0x20f)][_0x1bc035(0x488)](this),this[_0x1bc035(0x1b5)]();},DataManager[_0x427ba4(0x1b5)]=function(){const _0x197d77=_0x427ba4;if(!TextManager['isVisuMzLocalizationEnabled']())return;const _0x14c7f4=VisuMZ['MessageCore'][_0x197d77(0x1ae)]['Localization'];let _0x5d8a43='';const _0x5d6903=VisuMZ[_0x197d77(0x243)]['LocalizationType']??'tsv';if(_0x5d6903===_0x197d77(0x49a))_0x5d8a43=(_0x14c7f4[_0x197d77(0x3a6)]??'Languages.csv')||'';if(_0x5d6903===_0x197d77(0x296))_0x5d8a43=(_0x14c7f4[_0x197d77(0x36d)]??_0x197d77(0x419))||'';if(!_0x5d8a43)return;const _0x4bbe92=_0x197d77(0x4eb),_0x5c3f56=new XMLHttpRequest(),_0x5240ef='data/'+_0x5d8a43;window[_0x4bbe92]=null,_0x5c3f56['open'](_0x197d77(0x2f3),_0x5240ef),_0x5c3f56[_0x197d77(0x28c)](_0x197d77(0x3a8)[_0x197d77(0x230)](_0x5d6903[_0x197d77(0x21f)]())),_0x5c3f56[_0x197d77(0x231)]=()=>this['onLocalizationXhrLoad'](_0x5c3f56,_0x4bbe92),_0x5c3f56[_0x197d77(0x398)]=()=>this[_0x197d77(0x49c)](),_0x5c3f56[_0x197d77(0x377)]();},DataManager[_0x427ba4(0x1df)]=function(_0x3387bc,_0x2fd6c6){const _0x24d684=_0x427ba4;if(_0x3387bc[_0x24d684(0x203)]>=0x190)return;const _0x164d10=_0x3387bc[_0x24d684(0x3fa)];window[_0x2fd6c6]=VisuMZ[_0x24d684(0x243)]['ParseLocalizationCsv'](_0x164d10);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x1b1)]=function(_0x276622){const _0x1185c9=_0x427ba4,_0x23556b=VisuMZ[_0x1185c9(0x243)][_0x1185c9(0x292)]??'tsv',_0x7a90b9=_0x23556b===_0x1185c9(0x49a)?';':'\x09',_0x23a753=_0x276622[_0x1185c9(0x224)]('\x0a'),_0x5ce3ff=_0x23a753[0x0]['split'](_0x7a90b9),_0x4ad32e={};return _0x23a753[_0x1185c9(0x134)](0x1)[_0x1185c9(0x293)](_0x11bc7f=>{const _0x472047=_0x1185c9;let _0x24f9b5=[],_0x476fb2='',_0xa1973=![];for(let _0x5d7c93=0x0;_0x5d7c93<_0x11bc7f[_0x472047(0x429)];_0x5d7c93++){let _0x322d13=_0x11bc7f[_0x5d7c93];if(_0x322d13==='\x22')_0xa1973&&_0x11bc7f[_0x5d7c93+0x1]==='\x22'?(_0x476fb2+=_0x322d13,_0x5d7c93++):_0xa1973=!_0xa1973;else _0x322d13===_0x7a90b9&&!_0xa1973?(_0x24f9b5[_0x472047(0x329)](_0x476fb2),_0x476fb2=''):_0x476fb2+=_0x322d13;}if(_0x476fb2)_0x24f9b5[_0x472047(0x329)](_0x476fb2);if(!_0x24f9b5[0x0])_0x24f9b5[0x0]='';const _0x3e3bc9=_0x24f9b5[0x0][_0x472047(0x1b7)](/^"|"$/g,'')[_0x472047(0x21f)]()['trim']();_0x4ad32e[_0x3e3bc9]=_0x5ce3ff[_0x472047(0x134)](0x1)[_0x472047(0x453)]((_0x399c77,_0x95c788,_0xd8b2f)=>{const _0x2cb3c0=_0x472047;return _0x399c77[_0x95c788[_0x2cb3c0(0x1f9)]()]=(_0x24f9b5[_0xd8b2f+0x1]||'')['replace'](/^"|"$/g,''),_0x399c77;},{});}),_0x4ad32e;},DataManager['onLocalizationXhrError']=function(){const _0x5d7e06=_0x427ba4,_0xd86f20=(VisuMZ[_0x5d7e06(0x243)]['LocalizationType']??_0x5d7e06(0x296))['toUpperCase']();let _0x1c607a='';_0x1c607a+=_0x5d7e06(0x347),_0x1c607a+=_0x5d7e06(0x4f1),_0x1c607a=_0x1c607a[_0x5d7e06(0x230)](_0xd86f20);if(confirm(_0x1c607a)){if(Utils[_0x5d7e06(0x4d9)](_0x5d7e06(0x4e0))){if(_0xd86f20===_0x5d7e06(0x4fd))_0x1c607a=_0x5d7e06(0x11c),_0x1c607a=_0x1c607a['format'](_0xd86f20),alert(_0x1c607a),this[_0x5d7e06(0x4a2)](),this[_0x5d7e06(0x1f3)]();else return this['checkConvertCsvToTsv']();_0x1c607a='';}else _0x1c607a=_0x5d7e06(0x4a3);}else _0x1c607a=_0x5d7e06(0x191);_0x1c607a+=_0x5d7e06(0x2f9),_0x1c607a=_0x1c607a[_0x5d7e06(0x230)](_0xd86f20),alert(_0x1c607a),SceneManager['exit']();},DataManager['checkConvertCsvToTsv']=function(){const _0x57f87c=_0x427ba4,_0x245afc=VisuMZ[_0x57f87c(0x243)][_0x57f87c(0x1ae)][_0x57f87c(0x335)],_0x408e8d=_0x245afc['CsvFilename']??_0x57f87c(0x4c2),_0x5b7649=new XMLHttpRequest(),_0x481e92=_0x57f87c(0x4f6)+_0x408e8d;_0x5b7649[_0x57f87c(0x483)](_0x57f87c(0x2f3),_0x481e92),_0x5b7649[_0x57f87c(0x28c)](_0x57f87c(0x3a5)),_0x5b7649[_0x57f87c(0x231)]=()=>this[_0x57f87c(0x499)](_0x5b7649),_0x5b7649[_0x57f87c(0x398)]=()=>this['createTsvFile'](),_0x5b7649[_0x57f87c(0x377)]();},DataManager[_0x427ba4(0x499)]=function(_0x37fe82){const _0xa9efd9=_0x427ba4,_0x36bb12=VisuMZ[_0xa9efd9(0x243)][_0xa9efd9(0x1ae)]['Localization'],_0x41a2fe=_0x36bb12[_0xa9efd9(0x3a6)]??_0xa9efd9(0x4c2);let _0x4aa373=_0xa9efd9(0x3ed)[_0xa9efd9(0x230)](_0x41a2fe);_0x4aa373+=_0xa9efd9(0x2df),_0x4aa373+=_0xa9efd9(0x17b),confirm(_0x4aa373)?this[_0xa9efd9(0x364)](_0x37fe82):this['createTsvFile']();},DataManager['convertCsvToTsvFile']=function(_0x13f52e){const _0x4cc68d=_0x427ba4;if(_0x13f52e['status']>=0x190)return;const _0x421170=_0x13f52e['responseText'],_0x1f8d45=_0x421170[_0x4cc68d(0x1b7)](/\;/gi,'\x09'),_0x5403cf=VisuMZ[_0x4cc68d(0x243)]['Settings'][_0x4cc68d(0x335)],_0x489d00=_0x5403cf[_0x4cc68d(0x36d)]||_0x4cc68d(0x419),_0x588c91=require(_0x4cc68d(0x31f)),_0x16ef09=_0x588c91['dirname'](process[_0x4cc68d(0x1b3)][_0x4cc68d(0x27f)]),_0x52335d=_0x588c91[_0x4cc68d(0x317)](_0x16ef09,_0x4cc68d(0x4f6)),_0x102f40=_0x52335d+_0x489d00,_0x271d80=require('fs');_0x271d80[_0x4cc68d(0x1eb)](_0x102f40,_0x1f8d45);let _0x1251bd=_0x4cc68d(0x37e);alert(_0x1251bd),_0x1251bd=_0x4cc68d(0x2f9),alert(_0x1251bd),SceneManager[_0x4cc68d(0x1e4)]();},DataManager[_0x427ba4(0x26f)]=function(){const _0x48f28b=_0x427ba4;let _0x229355='TSV\x20file\x20is\x20now\x20created\x20and\x20stored\x20in\x20data\x20folder.';alert(_0x229355),this[_0x48f28b(0x4a2)](),this[_0x48f28b(0x1f3)](),_0x229355=_0x48f28b(0x2f9),alert(_0x229355),SceneManager['exit']();},DataManager['createLocalizationCsvFile']=function(){const _0x4999e7=_0x427ba4,_0x4af5c7=['Key','English','Bengali',_0x4999e7(0x25e),_0x4999e7(0x118),_0x4999e7(0x43c),'Danish','Dutch',_0x4999e7(0x48a),_0x4999e7(0x4cc),'German','Greek',_0x4999e7(0x4da),_0x4999e7(0x32a),_0x4999e7(0x311),_0x4999e7(0x44a),_0x4999e7(0x333),'Korean',_0x4999e7(0x1f1),'Polish',_0x4999e7(0x2f8),_0x4999e7(0x1c6),_0x4999e7(0x48d),_0x4999e7(0x4c7),_0x4999e7(0x27b),_0x4999e7(0x407),_0x4999e7(0x14e),'Thai',_0x4999e7(0x36b)],_0x4e364b=[_0x4999e7(0x312),_0x4999e7(0x308),_0x4999e7(0x301),'你好','你好',_0x4999e7(0x35e),_0x4999e7(0x3a2),_0x4999e7(0x3fe),'Hei',_0x4999e7(0x2cc),_0x4999e7(0x3fe),_0x4999e7(0x446),'नमस्ते',_0x4999e7(0x4e8),_0x4999e7(0x2d7),_0x4999e7(0x48c),_0x4999e7(0x1ef),_0x4999e7(0x4f8),_0x4999e7(0x16c),_0x4999e7(0x47a),_0x4999e7(0x4a1),_0x4999e7(0x22b),_0x4999e7(0x173),_0x4999e7(0x35e),_0x4999e7(0x1c7),_0x4999e7(0x3a2),_0x4999e7(0x30b),_0x4999e7(0x388),'Merhaba'],_0x2ad59e=[_0x4999e7(0x216),_0x4999e7(0x283),'বিদায়','再见','再見',_0x4999e7(0x306),_0x4999e7(0x133),_0x4999e7(0x375),_0x4999e7(0x25b),_0x4999e7(0x450),_0x4999e7(0x4ee),'Αντίο',_0x4999e7(0x2dd),'Viszontlátásra',_0x4999e7(0x2e6),_0x4999e7(0x114),_0x4999e7(0x3d0),'안녕히\x20가세요',_0x4999e7(0x188),'Do\x20widzenia',_0x4999e7(0x22e),'La\x20revedere',_0x4999e7(0x1f4),_0x4999e7(0x43a),_0x4999e7(0x479),'Hejdå','பிரியாவிடை','ลาก่อน','Hoşça\x20kal'],_0x950d3b=[_0x4999e7(0x34d),_0x4999e7(0x34d),_0x4999e7(0x3eb),'哇','哇','Ó',_0x4999e7(0x34d),_0x4999e7(0x23d),_0x4999e7(0x274),_0x4999e7(0x204),_0x4999e7(0x34d),'Ουάου',_0x4999e7(0x262),'Hűha',_0x4999e7(0x2bd),_0x4999e7(0x34d),'ワオ','와우','Oi','O',_0x4999e7(0x2fa),_0x4999e7(0x2fa),'Вау','Ó',_0x4999e7(0x11a),'Oj','ஆஹா',_0x4999e7(0x217),_0x4999e7(0x2e7)],_0x3c5811=[_0x4af5c7,_0x4e364b,_0x2ad59e,_0x950d3b],_0x4d17f8=VisuMZ['MessageCore'][_0x4999e7(0x292)]??_0x4999e7(0x296),_0x55b75b=_0x4d17f8===_0x4999e7(0x49a)?';':'\x09',_0x33c5f6=_0x3c5811[_0x4999e7(0x461)](_0x398b17=>_0x398b17[_0x4999e7(0x317)](_0x55b75b))[_0x4999e7(0x317)]('\x0a'),_0x2d4958=VisuMZ[_0x4999e7(0x243)][_0x4999e7(0x1ae)][_0x4999e7(0x335)];let _0x410ea7='';if(_0x4d17f8==='csv')_0x410ea7=_0x2d4958['CsvFilename']||_0x4999e7(0x4c2);if(_0x4d17f8===_0x4999e7(0x296))_0x410ea7=_0x2d4958[_0x4999e7(0x36d)]||_0x4999e7(0x419);const _0x23c1e0=require(_0x4999e7(0x31f)),_0x1ec3cf=_0x23c1e0[_0x4999e7(0x38e)](process['mainModule'][_0x4999e7(0x27f)]),_0x3b5a0f=_0x23c1e0[_0x4999e7(0x317)](_0x1ec3cf,'data/'),_0x22a3ef=_0x3b5a0f+_0x410ea7,_0x35b062=require('fs');return _0x35b062[_0x4999e7(0x1eb)](_0x22a3ef,_0x33c5f6),_0x22a3ef;},DataManager[_0x427ba4(0x1f3)]=function(){const _0x35e89c=_0x427ba4,{exec:_0x1d265b}=require(_0x35e89c(0x3ae));_0x1d265b(_0x35e89c(0x2d1)),_0x1d265b(_0x35e89c(0x343));},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x21e)]=ImageManager['loadBitmap'],ImageManager[_0x427ba4(0x164)]=function(_0x1178df,_0x52d513){const _0x3d35ca=_0x427ba4;if(ConfigManager[_0x3d35ca(0x436)]!==undefined){const _0x4fe96e=VisuMZ[_0x3d35ca(0x243)][_0x3d35ca(0x1ae)][_0x3d35ca(0x335)]||{},_0x424d9b=_0x4fe96e[_0x3d35ca(0x200)]||_0x3d35ca(0x2eb),_0x26f3f4=VisuMZ[_0x3d35ca(0x243)][_0x3d35ca(0x1ae)][_0x3d35ca(0x379)]||{},_0xca422c=ConfigManager['textLocale']||_0x424d9b;if(_0xca422c===_0x424d9b&&!_0x26f3f4[_0x3d35ca(0x400)]){}else{const _0x472771=_0x26f3f4[_0xca422c]||_0x3d35ca(0x315);_0x1178df&&_0x1178df[_0x3d35ca(0x339)](/\[XX\]/g)&&console[_0x3d35ca(0x406)](_0x1178df,_0x52d513),_0x52d513&&_0x52d513[_0x3d35ca(0x339)](/\[XX\]/g)&&(_0x52d513=_0x52d513[_0x3d35ca(0x1b7)](/\[XX\]/g,_0x472771));}}return VisuMZ[_0x3d35ca(0x243)][_0x3d35ca(0x21e)][_0x3d35ca(0x488)](this,_0x1178df,_0x52d513);},SceneManager[_0x427ba4(0x482)]=function(){const _0xb2f0f6=_0x427ba4;return this[_0xb2f0f6(0x2cd)]&&this[_0xb2f0f6(0x2cd)][_0xb2f0f6(0x1c3)]===Scene_Battle;},SceneManager[_0x427ba4(0x35b)]=function(){const _0x356fc0=_0x427ba4;return this[_0x356fc0(0x2cd)]&&this[_0x356fc0(0x2cd)][_0x356fc0(0x1c3)]===Scene_Map;},ConfigManager[_0x427ba4(0x436)]=VisuMZ['MessageCore'][_0x427ba4(0x1ae)][_0x427ba4(0x335)][_0x427ba4(0x200)]||_0x427ba4(0x2eb),ConfigManager['textSpeed']=VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x1ae)]['TextSpeed'][_0x427ba4(0x3b9)],VisuMZ['MessageCore'][_0x427ba4(0x424)]=ConfigManager[_0x427ba4(0x10d)],ConfigManager['makeData']=function(){const _0x222cc1=_0x427ba4,_0x551268=VisuMZ['MessageCore'][_0x222cc1(0x424)][_0x222cc1(0x488)](this);return TextManager[_0x222cc1(0x239)]()&&(_0x551268[_0x222cc1(0x436)]=this['textLocale']),_0x551268[_0x222cc1(0x2af)]=this['textSpeed'],_0x551268;},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x183)]=ConfigManager[_0x427ba4(0x162)],ConfigManager[_0x427ba4(0x162)]=function(_0x23363c){const _0x112ade=_0x427ba4;VisuMZ[_0x112ade(0x243)][_0x112ade(0x183)]['call'](this,_0x23363c),TextManager['isVisuMzLocalizationEnabled']()&&('textLocale'in _0x23363c?this['textLocale']=String(_0x23363c[_0x112ade(0x436)]):this['textLocale']=VisuMZ[_0x112ade(0x243)][_0x112ade(0x1ae)][_0x112ade(0x335)]['DefaultLocale']||'English'),_0x112ade(0x2af)in _0x23363c?this['textSpeed']=Number(_0x23363c[_0x112ade(0x2af)])[_0x112ade(0x456)](0x1,0xb):this[_0x112ade(0x2af)]=VisuMZ['MessageCore'][_0x112ade(0x1ae)][_0x112ade(0x266)][_0x112ade(0x3b9)];},TextManager['messageCoreLocalization']=VisuMZ['MessageCore'][_0x427ba4(0x1ae)][_0x427ba4(0x335)]['Name'],TextManager[_0x427ba4(0x45e)]=VisuMZ['MessageCore'][_0x427ba4(0x1ae)][_0x427ba4(0x266)][_0x427ba4(0x152)],TextManager[_0x427ba4(0x365)]=VisuMZ['MessageCore'][_0x427ba4(0x1ae)]['TextSpeed'][_0x427ba4(0x444)],VisuMZ['MessageCore'][_0x427ba4(0x1d5)]=TextManager[_0x427ba4(0x1d0)],TextManager[_0x427ba4(0x1d0)]=function(_0x2a80a3){const _0x2f2ff1=_0x427ba4,_0x18744c=[_0x2f2ff1(0x463),_0x2f2ff1(0x28e),_0x2f2ff1(0x457),_0x2f2ff1(0x382),_0x2f2ff1(0x320),_0x2f2ff1(0x484),_0x2f2ff1(0x20e),_0x2f2ff1(0x14f),_0x2f2ff1(0x4b9),'obtainItem'];let _0x207009=VisuMZ[_0x2f2ff1(0x243)]['TextManager_message'][_0x2f2ff1(0x488)](this,_0x2a80a3);return _0x18744c[_0x2f2ff1(0x4e5)](_0x2a80a3)&&(_0x207009='</WORDWRAP>'+_0x207009),_0x207009;},TextManager['isVisuMzLocalizationEnabled']=function(){const _0x1f6b1c=_0x427ba4;return VisuMZ[_0x1f6b1c(0x243)][_0x1f6b1c(0x1ae)][_0x1f6b1c(0x335)][_0x1f6b1c(0x411)];},TextManager[_0x427ba4(0x159)]=function(_0x4ceaae){const _0x357b5d=_0x427ba4;if(!this[_0x357b5d(0x239)]())return _0x4ceaae;return _0x4ceaae=String(_0x4ceaae)[_0x357b5d(0x1b7)](/\$(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x5c69ef,_0x3ca0bc)=>this[_0x357b5d(0x212)](String(_0x3ca0bc))),_0x4ceaae=String(_0x4ceaae)[_0x357b5d(0x1b7)](/\\(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x28aab4,_0x1c2127)=>this['getLocalizedText'](String(_0x1c2127))),_0x4ceaae=String(_0x4ceaae)[_0x357b5d(0x1b7)](/\x1b(?:KEY|TL|TRANSLATE|LOC|LOCALIZE|LOCALE)(?:\[|\<|\{)(.*?)(?:\]|\>|\})/gi,(_0x307843,_0x4599dd)=>this[_0x357b5d(0x212)](String(_0x4599dd))),_0x4ceaae;},VisuMZ[_0x427ba4(0x243)]['Bitmap_measureTextWidth']=Bitmap[_0x427ba4(0x357)]['measureTextWidth'],Bitmap['prototype']['measureTextWidth']=function(_0x35b5ae){const _0x1449d7=_0x427ba4;return _0x35b5ae=TextManager[_0x1449d7(0x159)](_0x35b5ae),VisuMZ[_0x1449d7(0x243)][_0x1449d7(0x47f)]['call'](this,_0x35b5ae);},TextManager[_0x427ba4(0x212)]=function(_0x209e0e){const _0x179cd7=_0x427ba4;if(!$dataLocalization)return'';const _0x1aee6e=$dataLocalization[_0x209e0e[_0x179cd7(0x21f)]()[_0x179cd7(0x1f9)]()];if(!_0x1aee6e)return;const _0x4990c1=ConfigManager['textLocale']||_0x179cd7(0x2eb);let _0x787d12=_0x1aee6e[_0x4990c1]||_0x179cd7(0x20d);return _0x787d12=_0x787d12[_0x179cd7(0x1b7)](/\\/g,'\x1b'),_0x787d12=_0x787d12[_0x179cd7(0x1b7)](/<SEMI(?:|-COLON|COLON)>/gi,';'),_0x787d12;},TextManager[_0x427ba4(0x193)]=function(_0x5e7757){const _0x5904ab=_0x427ba4;return VisuMZ[_0x5904ab(0x243)][_0x5904ab(0x1ae)]['Localization'][_0x5e7757]||'';},TextManager[_0x427ba4(0x439)]=function(){const _0x2a3a61=_0x427ba4,_0x4a640f=ConfigManager[_0x2a3a61(0x436)]||'English';return this[_0x2a3a61(0x193)](_0x4a640f);},TextManager[_0x427ba4(0x172)]=function(_0x1675a3){const _0x2d689e=_0x427ba4,_0x1a23c4=VisuMZ['MessageCore']['Settings'][_0x2d689e(0x335)][_0x2d689e(0x3e2)]||[];let _0x49decf=_0x1a23c4[_0x2d689e(0x500)](ConfigManager[_0x2d689e(0x436)]||'English');_0x49decf+=_0x1675a3;const _0x5bc6aa=_0x1a23c4[_0x49decf]||'';return this[_0x2d689e(0x193)](_0x5bc6aa);},VisuMZ[_0x427ba4(0x243)]['Game_System_mainFontFace']=Game_System[_0x427ba4(0x357)][_0x427ba4(0x15b)],Game_System[_0x427ba4(0x357)][_0x427ba4(0x15b)]=function(){const _0x42c16f=_0x427ba4;let _0x254ede=VisuMZ[_0x42c16f(0x243)]['Game_System_mainFontFace'][_0x42c16f(0x488)](this);if(ConfigManager&&ConfigManager[_0x42c16f(0x3f3)]!==undefined&&ConfigManager[_0x42c16f(0x3f3)]>0x0)return _0x254ede;else{const _0x56ea30=ConfigManager[_0x42c16f(0x436)]||_0x42c16f(0x2eb),_0x10eeb5=VisuMZ[_0x42c16f(0x243)][_0x42c16f(0x1ae)]['LanguageFonts'];return _0x10eeb5[_0x56ea30]!==undefined&&(_0x254ede=_0x10eeb5[_0x56ea30]+',\x20'+$dataSystem[_0x42c16f(0x2aa)]['fallbackFonts']),_0x254ede;}},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x34e)]=Window_Command[_0x427ba4(0x357)][_0x427ba4(0x3c5)],Window_Command[_0x427ba4(0x357)][_0x427ba4(0x3c5)]=function(_0x4f61ae,_0x339a30,_0x1b8d50,_0x3cdcfa){const _0x3652d3=_0x427ba4;if(TextManager['parseLocalizedText']&&TextManager[_0x3652d3(0x239)]()){const _0x587030=String(_0x4f61ae)[_0x3652d3(0x21f)]()[_0x3652d3(0x1f9)]();if($dataLocalization[_0x587030]&&_0x587030[_0x3652d3(0x429)]>0x0){const _0xa3cf37=ConfigManager['textLocale']||_0x3652d3(0x2eb);_0x4f61ae=$dataLocalization[_0x587030][_0xa3cf37]||'UNDEFINED!';}}VisuMZ[_0x3652d3(0x243)]['Window_Command_addCommand'][_0x3652d3(0x488)](this,_0x4f61ae,_0x339a30,_0x1b8d50,_0x3cdcfa);},Window_StatusBase[_0x427ba4(0x357)][_0x427ba4(0x170)]=function(_0x5f69bd,_0x5871d2){const _0x21d2cc=_0x427ba4,_0xba91ae=_0x5f69bd['equipSlots']();let _0x2ae807=$dataSystem['equipTypes'][_0xba91ae[_0x5871d2]];if(TextManager[_0x21d2cc(0x159)]){const _0x28fb94=String(_0x2ae807)['toLowerCase']()[_0x21d2cc(0x1f9)]();if(TextManager[_0x21d2cc(0x239)]()&&$dataLocalization[_0x28fb94]){const _0x2ebf0a=ConfigManager[_0x21d2cc(0x436)]||_0x21d2cc(0x2eb);_0x2ae807=$dataLocalization[_0x28fb94][_0x2ebf0a]||_0x21d2cc(0x20d);}}return _0x2ae807;},Game_Temp['prototype'][_0x427ba4(0x3e0)]=function(_0x52654d){this['_lastPluginCommandInterpreter']=_0x52654d;},Game_Temp[_0x427ba4(0x357)][_0x427ba4(0x355)]=function(){const _0x3e7ea1=_0x427ba4;return this[_0x3e7ea1(0x3ec)];},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x1a8)]=Game_Interpreter[_0x427ba4(0x357)]['command357'],Game_Interpreter[_0x427ba4(0x357)][_0x427ba4(0x2c9)]=function(_0x236573){const _0x1307d0=_0x427ba4;return $gameTemp['setLastPluginCommandInterpreter'](this),VisuMZ[_0x1307d0(0x243)][_0x1307d0(0x1a8)]['call'](this,_0x236573);},VisuMZ[_0x427ba4(0x243)]['Game_System_initialize']=Game_System[_0x427ba4(0x357)][_0x427ba4(0x187)],Game_System[_0x427ba4(0x357)][_0x427ba4(0x187)]=function(){const _0x1a77ec=_0x427ba4;VisuMZ[_0x1a77ec(0x243)]['Game_System_initialize']['call'](this),this[_0x1a77ec(0x29e)]();},Game_System['prototype'][_0x427ba4(0x29e)]=function(){const _0x52ba45=_0x427ba4,_0x56b23a=VisuMZ[_0x52ba45(0x243)][_0x52ba45(0x1ae)]['General'],_0x240501=VisuMZ[_0x52ba45(0x243)][_0x52ba45(0x1ae)][_0x52ba45(0x194)];this['_MessageCoreSettings']={'messageRows':_0x56b23a[_0x52ba45(0x316)],'messageWidth':_0x56b23a['MessageWidth'],'messageWordWrap':_0x240501['MessageWindow'],'helpWordWrap':_0x240501['HelpWindow'],'choiceLineHeight':_0x56b23a[_0x52ba45(0x384)],'choiceMinWidth':_0x56b23a[_0x52ba45(0x39d)]??0x60,'choiceRows':_0x56b23a[_0x52ba45(0x210)],'choiceCols':_0x56b23a[_0x52ba45(0x376)],'choiceTextAlign':_0x56b23a[_0x52ba45(0x42f)],'choiceDistance':0x0},this['_messageOffsetX']===undefined&&(this[_0x52ba45(0x4a5)]=_0x56b23a[_0x52ba45(0x272)],this['_messageOffsetY']=_0x56b23a[_0x52ba45(0x14a)]);},Game_System[_0x427ba4(0x357)][_0x427ba4(0x11b)]=function(){const _0x5320fe=_0x427ba4;if(this[_0x5320fe(0x3e1)]===undefined)this[_0x5320fe(0x29e)]();if(this[_0x5320fe(0x3e1)][_0x5320fe(0x361)]===undefined)this[_0x5320fe(0x29e)]();return this['_MessageCoreSettings']['messageRows'];},Game_System[_0x427ba4(0x357)]['setMessageWindowRows']=function(_0x33fbfe){const _0x14b8e0=_0x427ba4;if(this[_0x14b8e0(0x3e1)]===undefined)this['initMessageCore']();if(this[_0x14b8e0(0x3e1)][_0x14b8e0(0x361)]===undefined)this[_0x14b8e0(0x29e)]();this[_0x14b8e0(0x3e1)][_0x14b8e0(0x361)]=_0x33fbfe||0x1;},Game_System['prototype'][_0x427ba4(0x4bc)]=function(){const _0x229f2a=_0x427ba4;if(this[_0x229f2a(0x3e1)]===undefined)this[_0x229f2a(0x29e)]();if(this['_MessageCoreSettings']['messageWidth']===undefined)this[_0x229f2a(0x29e)]();return this[_0x229f2a(0x3e1)][_0x229f2a(0x132)];},Game_System[_0x427ba4(0x357)][_0x427ba4(0x465)]=function(_0x2d8c67){const _0x2abf47=_0x427ba4;if(this[_0x2abf47(0x3e1)]===undefined)this[_0x2abf47(0x29e)]();if(this[_0x2abf47(0x3e1)][_0x2abf47(0x132)]===undefined)this['initMessageCore']();_0x2d8c67=Math[_0x2abf47(0x4b8)](_0x2d8c67);if(_0x2d8c67%0x2!==0x0)_0x2d8c67+=0x1;this[_0x2abf47(0x3e1)][_0x2abf47(0x132)]=_0x2d8c67||0x2;},Game_System['prototype'][_0x427ba4(0x394)]=function(){const _0x33a4e7=_0x427ba4;if(this[_0x33a4e7(0x3e1)]===undefined)this['initMessageCore']();if(this[_0x33a4e7(0x3e1)]['messageWordWrap']===undefined)this[_0x33a4e7(0x29e)]();return this[_0x33a4e7(0x3e1)][_0x33a4e7(0x39e)];},Game_System[_0x427ba4(0x357)]['setMessageWindowWordWrap']=function(_0x3a7a14){const _0xef8672=_0x427ba4;if(this['_MessageCoreSettings']===undefined)this[_0xef8672(0x29e)]();if(this[_0xef8672(0x3e1)][_0xef8672(0x39e)]===undefined)this['initMessageCore']();this[_0xef8672(0x3e1)][_0xef8672(0x39e)]=_0x3a7a14;},Game_System[_0x427ba4(0x357)][_0x427ba4(0x30e)]=function(){const _0x1ba28b=_0x427ba4;if(this['_messageOffsetX']===undefined){const _0x3c7390=VisuMZ[_0x1ba28b(0x243)][_0x1ba28b(0x1ae)]['General'];this[_0x1ba28b(0x4a5)]=_0x3c7390[_0x1ba28b(0x272)],this[_0x1ba28b(0x288)]=_0x3c7390[_0x1ba28b(0x14a)];}return{'x':this[_0x1ba28b(0x4a5)]||0x0,'y':this['_messageOffsetY']||0x0};},Game_System['prototype'][_0x427ba4(0x220)]=function(_0x4c863e,_0x239726){const _0x30ca1d=_0x427ba4;if(this['_MessageCoreSettings']===undefined)this[_0x30ca1d(0x29e)]();this[_0x30ca1d(0x4a5)]=_0x4c863e,this[_0x30ca1d(0x288)]=_0x239726;},Game_System[_0x427ba4(0x357)][_0x427ba4(0x1ad)]=function(){const _0x3562fb=_0x427ba4;if(this[_0x3562fb(0x3e1)]===undefined)this['initMessageCore']();if(this[_0x3562fb(0x3e1)][_0x3562fb(0x2d9)]===undefined)this[_0x3562fb(0x29e)]();return this[_0x3562fb(0x3e1)][_0x3562fb(0x2d9)];},Game_System['prototype'][_0x427ba4(0x2d6)]=function(_0x1b8e67){const _0x4be9a6=_0x427ba4;if(this[_0x4be9a6(0x3e1)]===undefined)this[_0x4be9a6(0x29e)]();if(this['_MessageCoreSettings']['helpWordWrap']===undefined)this[_0x4be9a6(0x29e)]();this[_0x4be9a6(0x3e1)][_0x4be9a6(0x2d9)]=_0x1b8e67;},Game_System[_0x427ba4(0x357)][_0x427ba4(0x405)]=function(){const _0x10694a=_0x427ba4;if(this[_0x10694a(0x3e1)]===undefined)this[_0x10694a(0x29e)]();if(this['_MessageCoreSettings'][_0x10694a(0x4ad)]===undefined)this[_0x10694a(0x29e)]();return this[_0x10694a(0x3e1)]['choiceLineHeight'];},Game_System[_0x427ba4(0x357)]['setChoiceListLineHeight']=function(_0x5534c5){const _0x39172e=_0x427ba4;if(this[_0x39172e(0x3e1)]===undefined)this['initMessageCore']();if(this[_0x39172e(0x3e1)][_0x39172e(0x4ad)]===undefined)this['initMessageCore']();this['_MessageCoreSettings'][_0x39172e(0x4ad)]=_0x5534c5||0x1;},Game_System[_0x427ba4(0x357)][_0x427ba4(0x438)]=function(){const _0x20c280=_0x427ba4;if(this['_MessageCoreSettings']===undefined)this[_0x20c280(0x29e)]();return this[_0x20c280(0x3e1)]['choiceMinWidth']??0x60;},Game_System['prototype']['setChoiceListMinChoiceWidth']=function(_0x1393d0){const _0x4697d0=_0x427ba4;if(this[_0x4697d0(0x3e1)]===undefined)this[_0x4697d0(0x29e)]();this[_0x4697d0(0x3e1)]['choiceMinWidth']=_0x1393d0||0x0;},Game_System[_0x427ba4(0x357)][_0x427ba4(0x286)]=function(){const _0x32a14e=_0x427ba4;if(this['_MessageCoreSettings']===undefined)this[_0x32a14e(0x29e)]();if(this['_MessageCoreSettings']['choiceRows']===undefined)this[_0x32a14e(0x29e)]();return this[_0x32a14e(0x3e1)][_0x32a14e(0x2a4)];},Game_System[_0x427ba4(0x357)][_0x427ba4(0x3a1)]=function(_0x2e3e20){const _0x3fce52=_0x427ba4;if(this[_0x3fce52(0x3e1)]===undefined)this[_0x3fce52(0x29e)]();if(this[_0x3fce52(0x3e1)][_0x3fce52(0x2a4)]===undefined)this['initMessageCore']();this[_0x3fce52(0x3e1)][_0x3fce52(0x2a4)]=_0x2e3e20||0x1;},Game_System[_0x427ba4(0x357)][_0x427ba4(0x3d6)]=function(){const _0x247e3b=_0x427ba4;if(this[_0x247e3b(0x3e1)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x247e3b(0x49f)]===undefined)this[_0x247e3b(0x29e)]();return this['_MessageCoreSettings'][_0x247e3b(0x49f)];},Game_System[_0x427ba4(0x357)][_0x427ba4(0x1fa)]=function(_0x2b3698){const _0x3b4dab=_0x427ba4;if(this[_0x3b4dab(0x3e1)]===undefined)this['initMessageCore']();if(this['_MessageCoreSettings'][_0x3b4dab(0x49f)]===undefined)this[_0x3b4dab(0x29e)]();this['_MessageCoreSettings'][_0x3b4dab(0x49f)]=_0x2b3698||0x1;},Game_System[_0x427ba4(0x357)]['getChoiceListTextAlign']=function(){const _0x5e8714=_0x427ba4;if(this['_MessageCoreSettings']===undefined)this[_0x5e8714(0x29e)]();if(this[_0x5e8714(0x3e1)][_0x5e8714(0x421)]===undefined)this['initMessageCore']();return this[_0x5e8714(0x3e1)][_0x5e8714(0x421)];},Game_System[_0x427ba4(0x357)][_0x427ba4(0x278)]=function(_0x515206){const _0x4d6524=_0x427ba4;if(this[_0x4d6524(0x3e1)]===undefined)this[_0x4d6524(0x29e)]();if(this['_MessageCoreSettings'][_0x4d6524(0x421)]===undefined)this[_0x4d6524(0x29e)]();this['_MessageCoreSettings']['choiceTextAlign']=_0x515206['toLowerCase']();},Game_System[_0x427ba4(0x357)][_0x427ba4(0x33c)]=function(){const _0x1e9935=_0x427ba4;if(this[_0x1e9935(0x3e1)]===undefined)this[_0x1e9935(0x29e)]();return this[_0x1e9935(0x3e1)][_0x1e9935(0x4c3)]||0x0;},Game_System['prototype']['setChoiceMessageDistance']=function(_0x736b7e){const _0x1063c2=_0x427ba4;if(this[_0x1063c2(0x3e1)]===undefined)this['initMessageCore']();this[_0x1063c2(0x3e1)][_0x1063c2(0x4c3)]=_0x736b7e||0x0;},Game_Message[_0x427ba4(0x357)]['setWeaponChoice']=function(_0x1b20eb,_0x33edcf){const _0x3835dc=_0x427ba4;this[_0x3835dc(0x41e)]=_0x1b20eb,this[_0x3835dc(0x46b)]=_0x3835dc(0x35c),this[_0x3835dc(0x4b7)]=_0x33edcf,this[_0x3835dc(0x3c8)]=0x0;},Game_Message[_0x427ba4(0x357)][_0x427ba4(0x113)]=function(){const _0x16a166=_0x427ba4;return this[_0x16a166(0x4b7)]||0x0;},Game_Message[_0x427ba4(0x357)][_0x427ba4(0x43d)]=function(_0x4fa914,_0x9e0076,_0x1c164f){const _0x3a6736=_0x427ba4;this[_0x3a6736(0x41e)]=_0x4fa914,this[_0x3a6736(0x46b)]=_0x3a6736(0x426),this[_0x3a6736(0x1f7)]=_0x9e0076,this['_itemChoiceEtypeId']=_0x1c164f;},Game_Message['prototype'][_0x427ba4(0x1f8)]=function(){const _0x2252e0=_0x427ba4;return this[_0x2252e0(0x1f7)]||0x0;},Game_Message['prototype'][_0x427ba4(0x480)]=function(){const _0x13ac92=_0x427ba4;return this[_0x13ac92(0x3c8)]||0x0;},Game_Message['prototype']['setSkillChoice']=function(_0x352eae,_0x1ce9fd,_0x4015fe){const _0x113801=_0x427ba4;this[_0x113801(0x41e)]=_0x352eae,this['_itemChoiceItypeId']=_0x113801(0x167),this[_0x113801(0x273)]=_0x1ce9fd,this['_itemChoiceStypeId']=_0x4015fe;},Game_Message[_0x427ba4(0x357)]['itemChoiceActorId']=function(){const _0x18b034=_0x427ba4;return this[_0x18b034(0x273)]||0x0;},Game_Message['prototype'][_0x427ba4(0x1c0)]=function(){const _0x21fa2a=_0x427ba4;return $gameActors[_0x21fa2a(0x2ae)](this[_0x21fa2a(0x470)]())||$gameParty['leader']()||null;},Game_Message['prototype'][_0x427ba4(0x185)]=function(){const _0x3070aa=_0x427ba4;return this[_0x3070aa(0x3db)]||0x0;},VisuMZ[_0x427ba4(0x243)]['Game_Message_setChoices']=Game_Message['prototype'][_0x427ba4(0x349)],Game_Message[_0x427ba4(0x357)][_0x427ba4(0x349)]=function(_0x1b4331,_0x512404,_0x5a8847){const _0x3bf45a=_0x427ba4;this[_0x3bf45a(0x1ab)]=!![],VisuMZ['MessageCore'][_0x3bf45a(0x139)][_0x3bf45a(0x488)](this,_0x1b4331,_0x512404,_0x5a8847);},Game_Message[_0x427ba4(0x357)][_0x427ba4(0x31d)]=function(){const _0x72cc36=_0x427ba4;this[_0x72cc36(0x1ab)]=![],this[_0x72cc36(0x4ca)]=[];const _0x24a764=this['_choices'][_0x72cc36(0x429)];this[_0x72cc36(0x466)]=_0x24a764;let _0x4b1b2c=![];for(let _0x131869=0x0;_0x131869<_0x24a764;_0x131869++){let _0x586d3d=this[_0x72cc36(0x4e9)][_0x131869];_0x586d3d[_0x72cc36(0x339)](/<SHUFFLE>/gi)&&(_0x4b1b2c=!![],_0x586d3d=_0x586d3d['replace'](/<SHUFFLE>/gi,'')),_0x586d3d[_0x72cc36(0x339)](/<SHUFFLE:[ ](\d+)>/gi)&&(_0x4b1b2c=!![],this['_maxShuffleChoices']=Math[_0x72cc36(0x47e)](Number(RegExp['$1']),this['_maxShuffleChoices']),_0x586d3d=_0x586d3d['replace'](/<SHUFFLE:[ ](\d+)>/gi,'')),_0x586d3d['match'](/<SHUFFLE: VAR[ ](\d+)>/gi)&&(_0x4b1b2c=!![],this[_0x72cc36(0x466)]=Math[_0x72cc36(0x47e)]($gameVariables[_0x72cc36(0x326)](Number(RegExp['$1']))||0x1,this[_0x72cc36(0x466)]),_0x586d3d=_0x586d3d[_0x72cc36(0x1b7)](/<SHUFFLE:[ ]VAR (\d+)>/gi,'')),this[_0x72cc36(0x4ca)][_0x72cc36(0x329)](_0x131869),this[_0x72cc36(0x4e9)][_0x131869]=_0x586d3d;}if(_0x4b1b2c){this[_0x72cc36(0x4ca)]=VisuMZ[_0x72cc36(0x243)][_0x72cc36(0x404)](this['_choiceIndexArray']);if(this[_0x72cc36(0x20a)]()!==-0x2)this[_0x72cc36(0x345)]=-0x1;}},VisuMZ[_0x427ba4(0x243)]['ShuffleArray']=function(_0x16486d){const _0x7369dd=_0x427ba4;var _0x1089d6,_0x188f9d,_0x2b05ec;for(_0x2b05ec=_0x16486d[_0x7369dd(0x429)]-0x1;_0x2b05ec>0x0;_0x2b05ec--){_0x1089d6=Math['floor'](Math['random']()*(_0x2b05ec+0x1)),_0x188f9d=_0x16486d[_0x2b05ec],_0x16486d[_0x2b05ec]=_0x16486d[_0x1089d6],_0x16486d[_0x1089d6]=_0x188f9d;}return _0x16486d;},Game_Message[_0x427ba4(0x357)][_0x427ba4(0x310)]=function(){const _0x1c3636=_0x427ba4;if(!this[_0x1c3636(0x4ca)])this['setupShuffleChoices']();return this[_0x1c3636(0x4ca)];},Game_Message[_0x427ba4(0x357)][_0x427ba4(0x309)]=function(){const _0x45d976=_0x427ba4;if(this['_maxShuffleChoices']===undefined)this[_0x45d976(0x31d)]();return this[_0x45d976(0x466)];},VisuMZ[_0x427ba4(0x243)]['Game_Screen_clearPictures']=Game_Screen[_0x427ba4(0x357)][_0x427ba4(0x4d5)],Game_Screen['prototype']['clearPictures']=function(){const _0x43d8ea=_0x427ba4;VisuMZ['MessageCore'][_0x43d8ea(0x4f9)][_0x43d8ea(0x488)](this),this['clearAllPictureTexts']();},Game_Screen[_0x427ba4(0x357)][_0x427ba4(0x1cc)]=function(){const _0x608a56=_0x427ba4;this[_0x608a56(0x2ff)]=[],this[_0x608a56(0x22f)]=[],this[_0x608a56(0x460)]=[];},Game_Screen[_0x427ba4(0x357)]['getPictureTextData']=function(_0x1c6364){const _0x3b2184=_0x427ba4;if(this[_0x3b2184(0x2ff)]===undefined)this[_0x3b2184(0x1cc)]();const _0x262fb5=this[_0x3b2184(0x443)](_0x1c6364);return this[_0x3b2184(0x2ff)][_0x262fb5]=this[_0x3b2184(0x2ff)][_0x262fb5]||{},this[_0x3b2184(0x2ff)][_0x262fb5];},Game_Screen['prototype'][_0x427ba4(0x2b4)]=function(_0x2fcdee,_0x2e2af2){const _0x102f82=_0x427ba4;return _0x2e2af2=_0x2e2af2[_0x102f82(0x21f)]()[_0x102f82(0x1f9)](),this['getPictureTextData'](_0x2fcdee)[_0x2e2af2]||'';},Game_Screen[_0x427ba4(0x357)][_0x427ba4(0x3bd)]=function(_0x29423a,_0x274ca7,_0x2a363c){const _0x35a6c2=_0x427ba4;_0x2a363c=_0x2a363c['toLowerCase']()[_0x35a6c2(0x1f9)](),this[_0x35a6c2(0x383)](_0x29423a)[_0x2a363c]=_0x274ca7||'',this[_0x35a6c2(0x442)](_0x29423a,!![]);},Game_Screen['prototype'][_0x427ba4(0x2a0)]=function(_0x48470d){const _0x14ec33=_0x427ba4;if(this[_0x14ec33(0x2ff)]===undefined)this[_0x14ec33(0x1cc)]();const _0x1678cc=this[_0x14ec33(0x443)](_0x48470d);this[_0x14ec33(0x2ff)][_0x1678cc]=null,this[_0x14ec33(0x442)](_0x48470d,!![]);},Game_Screen[_0x427ba4(0x357)][_0x427ba4(0x30d)]=function(_0x1ba0e5){const _0x1ac3e8=_0x427ba4;if(this['_pictureText']===undefined)this['clearAllPictureTexts']();const _0x4975ef=this[_0x1ac3e8(0x443)](_0x1ba0e5);return this[_0x1ac3e8(0x22f)][_0x4975ef]||0x0;},Game_Screen[_0x427ba4(0x357)][_0x427ba4(0x3b7)]=function(_0x1d4e80,_0x376ec2){const _0x195b4b=_0x427ba4;if(this['_pictureText']===undefined)this[_0x195b4b(0x1cc)]();const _0x2be235=this[_0x195b4b(0x443)](_0x1d4e80);this[_0x195b4b(0x22f)][_0x2be235]=Math[_0x195b4b(0x2cb)](0x0,_0x376ec2);},Game_Screen[_0x427ba4(0x357)][_0x427ba4(0x468)]=function(_0x5a8eef){const _0x2b1557=_0x427ba4;if(this[_0x2b1557(0x2ff)]===undefined)this['clearAllPictureTexts']();const _0x7de7e5=this['realPictureId'](_0x5a8eef);this[_0x2b1557(0x22f)][_0x7de7e5]=undefined;},VisuMZ[_0x427ba4(0x243)]['Game_Screen_erasePicture']=Game_Screen[_0x427ba4(0x357)][_0x427ba4(0x39f)],Game_Screen['prototype'][_0x427ba4(0x39f)]=function(_0xbd0003){const _0x355982=_0x427ba4;VisuMZ[_0x355982(0x243)]['Game_Screen_erasePicture'][_0x355982(0x488)](this,_0xbd0003),this['eraseAllPictureTexts'](_0xbd0003),this[_0x355982(0x468)](_0xbd0003),this['requestPictureTextRefresh'](_0xbd0003,!![]);},Game_Screen[_0x427ba4(0x357)][_0x427ba4(0x1c2)]=function(){const _0x1cfaaa=_0x427ba4;for(const _0x131141 of this['_pictures']){if(_0x131141){let _0x148717=this['_pictures'][_0x1cfaaa(0x500)](_0x131141);this[_0x1cfaaa(0x442)](_0x148717);}}},Game_Screen[_0x427ba4(0x357)][_0x427ba4(0x442)]=function(_0x1bf7a7,_0x4ac8ab){const _0x21d192=_0x427ba4;this[_0x21d192(0x460)]=this[_0x21d192(0x460)]||[],(this[_0x21d192(0x3be)](_0x1bf7a7)||_0x4ac8ab)&&this[_0x21d192(0x460)]['push'](_0x1bf7a7);},Game_Screen[_0x427ba4(0x357)][_0x427ba4(0x3cf)]=function(_0x1f7e5e){const _0x16738a=_0x427ba4;return this['_pictureTextRefresh']=this[_0x16738a(0x460)]||[],this['_pictureTextRefresh'][_0x16738a(0x4e5)](_0x1f7e5e);},Game_Screen[_0x427ba4(0x357)]['clearPictureTextRefresh']=function(_0x69f3e3){const _0x59102f=_0x427ba4;this[_0x59102f(0x460)]=this[_0x59102f(0x460)]||[],this['_pictureTextRefresh'][_0x59102f(0x46d)](_0x69f3e3);},Game_Screen[_0x427ba4(0x357)]['hasPictureText']=function(_0xdb6870){const _0x47a383=_0x427ba4,_0x2e2ece=[_0x47a383(0x493),'up','upperright',_0x47a383(0x13e),_0x47a383(0x2f2),_0x47a383(0x294),_0x47a383(0x168),_0x47a383(0x2b1),'lowerright'];return _0x2e2ece[_0x47a383(0x222)](_0x32ef46=>this[_0x47a383(0x2b4)](_0xdb6870,_0x32ef46)!=='');},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x16e)]=Game_Party['prototype'][_0x427ba4(0x187)],Game_Party[_0x427ba4(0x357)][_0x427ba4(0x187)]=function(){const _0x1f7717=_0x427ba4;VisuMZ[_0x1f7717(0x243)][_0x1f7717(0x16e)][_0x1f7717(0x488)](this),this[_0x1f7717(0x29e)]();},Game_Party[_0x427ba4(0x357)][_0x427ba4(0x29e)]=function(){this['_lastGainedItemData']={'type':0x0,'id':0x0,'quantity':0x0};},Game_Party[_0x427ba4(0x357)][_0x427ba4(0x4ab)]=function(){const _0x2c3dd7=_0x427ba4;if(this['_lastGainedItemData']===undefined)this[_0x2c3dd7(0x29e)]();return this[_0x2c3dd7(0x4f2)];},Game_Party[_0x427ba4(0x357)]['setLastGainedItemData']=function(_0x5a0981,_0x292e2c){const _0x11e1b6=_0x427ba4;if(this[_0x11e1b6(0x4f2)]===undefined)this['initMessageCore']();if(!_0x5a0981)return;if(DataManager[_0x11e1b6(0x37c)](_0x5a0981))this[_0x11e1b6(0x4f2)]['type']=0x0;else{if(DataManager[_0x11e1b6(0x449)](_0x5a0981))this[_0x11e1b6(0x4f2)][_0x11e1b6(0x40a)]=0x1;else DataManager['isArmor'](_0x5a0981)&&(this[_0x11e1b6(0x4f2)][_0x11e1b6(0x40a)]=0x2);}this[_0x11e1b6(0x4f2)]['id']=_0x5a0981['id'],this['_lastGainedItemData'][_0x11e1b6(0x32b)]=_0x292e2c;},VisuMZ[_0x427ba4(0x243)]['Game_Party_gainItem']=Game_Party[_0x427ba4(0x357)][_0x427ba4(0x396)],Game_Party['prototype'][_0x427ba4(0x396)]=function(_0x5cb097,_0x79ee99,_0x44df1e){const _0x320930=_0x427ba4;VisuMZ[_0x320930(0x243)][_0x320930(0x319)][_0x320930(0x488)](this,_0x5cb097,_0x79ee99,_0x44df1e),_0x79ee99>0x0&&this[_0x320930(0x44b)](_0x5cb097,_0x79ee99);},VisuMZ['MessageCore']['Game_Map_initialize']=Game_Map[_0x427ba4(0x357)][_0x427ba4(0x187)],Game_Map[_0x427ba4(0x357)][_0x427ba4(0x187)]=function(){const _0x82de18=_0x427ba4;VisuMZ[_0x82de18(0x243)][_0x82de18(0x2d0)][_0x82de18(0x488)](this),this[_0x82de18(0x3d9)]=[];},VisuMZ[_0x427ba4(0x243)]['Game_Map_setupEvents']=Game_Map[_0x427ba4(0x357)][_0x427ba4(0x13f)],Game_Map[_0x427ba4(0x357)]['setupEvents']=function(){const _0xcf4452=_0x427ba4;VisuMZ[_0xcf4452(0x243)][_0xcf4452(0x2e0)][_0xcf4452(0x488)](this),this[_0xcf4452(0x3d9)]=[];},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x410)]=Game_Map[_0x427ba4(0x357)][_0x427ba4(0x324)],Game_Map[_0x427ba4(0x357)]['updateEvents']=function(){const _0x321da1=_0x427ba4;VisuMZ[_0x321da1(0x243)][_0x321da1(0x410)][_0x321da1(0x488)](this),this[_0x321da1(0x3ab)]();},Game_Map['prototype'][_0x427ba4(0x12f)]=function(_0x3aa878){const _0x101d18=_0x427ba4;if(!$dataCommonEvents[_0x3aa878])return;this[_0x101d18(0x3d9)]=this['_messageCommonEvents']||[];const _0x1219d8=this['_interpreter'][_0x101d18(0x325)],_0xd28a2a=new Game_MessageCommonEvent(_0x3aa878,_0x1219d8);this[_0x101d18(0x3d9)][_0x101d18(0x329)](_0xd28a2a);},Game_Map[_0x427ba4(0x357)][_0x427ba4(0x3ab)]=function(){const _0x828d7=_0x427ba4;this[_0x828d7(0x3d9)]=this[_0x828d7(0x3d9)]||[];for(const _0x30690a of this[_0x828d7(0x3d9)]){!_0x30690a[_0x828d7(0x1a2)]?this[_0x828d7(0x3d9)][_0x828d7(0x46d)](_0x30690a):_0x30690a['update']();}},VisuMZ[_0x427ba4(0x243)]['Game_Map_refresh']=Game_Map[_0x427ba4(0x357)][_0x427ba4(0x2d4)],Game_Map[_0x427ba4(0x357)][_0x427ba4(0x2d4)]=function(){const _0x3b2a96=_0x427ba4;VisuMZ[_0x3b2a96(0x243)][_0x3b2a96(0x39b)][_0x3b2a96(0x488)](this),$gameScreen[_0x3b2a96(0x1c2)]();},Game_Interpreter[_0x427ba4(0x3dd)]=pluginData[_0x427ba4(0x1e8)],Game_Interpreter[_0x427ba4(0x357)][_0x427ba4(0x25a)]=function(_0x52d503){const _0x48958a=_0x427ba4;if($gameMessage[_0x48958a(0x4aa)]())return![];return this[_0x48958a(0x36e)](_0x52d503),this['addContinuousShowTextCommands'](_0x52d503),this['prepareShowTextFollowups'](_0x52d503),this[_0x48958a(0x196)](_0x48958a(0x1d0)),!![];},Game_Interpreter['prototype'][_0x427ba4(0x36e)]=function(_0x38a86e){const _0x1feb01=_0x427ba4;$gameMessage[_0x1feb01(0x469)](_0x38a86e[0x0],_0x38a86e[0x1]),$gameMessage[_0x1feb01(0x1d6)](_0x38a86e[0x2]),$gameMessage[_0x1feb01(0x2ba)](_0x38a86e[0x3]),$gameMessage[_0x1feb01(0x1bf)](_0x38a86e[0x4]);},Game_Interpreter[_0x427ba4(0x357)][_0x427ba4(0x186)]=function(_0x2f0d7a){const _0x52d6c6=_0x427ba4;while(this['isContinuePrepareShowTextCommands']()){this[_0x52d6c6(0x15a)]++;if(this[_0x52d6c6(0x3cc)]()['code']===0x191){let _0x4abbfd=this[_0x52d6c6(0x3cc)]()[_0x52d6c6(0x11e)][0x0];_0x4abbfd=VisuMZ['MessageCore'][_0x52d6c6(0x258)](_0x4abbfd),$gameMessage[_0x52d6c6(0x165)](_0x4abbfd);}if(this['isBreakShowTextCommands']())break;}},Game_Interpreter[_0x427ba4(0x357)][_0x427ba4(0x247)]=function(){const _0x495d82=_0x427ba4;return this[_0x495d82(0x4e1)]()===0x65&&$gameSystem['getMessageWindowRows']()>0x4?!![]:this['nextEventCode']()===0x191;},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x258)]=function(_0x1b7944){const _0x49a740=_0x427ba4,_0x590591=VisuMZ[_0x49a740(0x243)]['Settings'][_0x49a740(0x3ea)];return _0x1b7944=(_0x590591[_0x49a740(0x3d5)]||'')+_0x1b7944+(_0x590591['EachMessageEnd']||''),_0x1b7944=_0x1b7944[_0x49a740(0x1b7)](/<(?:NEXT PAGE|NEXTPAGE)>/gi,''),_0x1b7944=_0x1b7944['replace'](/<(?:RNG|RAND|RANDOM)>(.*?)<\/(?:RNG|RAND|RANDOM)>/gi,(_0x163597,_0x34be5e)=>this[_0x49a740(0x22d)](_0x34be5e)),_0x1b7944;},VisuMZ[_0x427ba4(0x243)]['getRandomTextFromPool']=function(_0x89bb55){const _0x17fec3=_0x427ba4,_0x5ab4cf=_0x89bb55['split']('|')['map'](_0x310001=>_0x310001['trim']())[_0x17fec3(0x46d)]('')[_0x17fec3(0x46d)](null);return _0x5ab4cf[Math['randomInt'](_0x5ab4cf[_0x17fec3(0x429)])];},Game_Interpreter[_0x427ba4(0x357)][_0x427ba4(0x136)]=function(){const _0xb298=_0x427ba4;if(this[_0xb298(0x3cc)]()&&this[_0xb298(0x3cc)]()[_0xb298(0x11e)][0x0]['match'](/<(?:NEXT PAGE|NEXTPAGE)>/gi))return!![];return $gameMessage[_0xb298(0x115)]['length']>=$gameSystem[_0xb298(0x11b)]()&&this[_0xb298(0x4e1)]()!==0x191;},Game_Interpreter[_0x427ba4(0x357)][_0x427ba4(0x40d)]=function(_0xdf446b){const _0x37c8f6=_0x427ba4;switch(this['nextEventCode']()){case 0x66:this[_0x37c8f6(0x15a)]++,this[_0x37c8f6(0x2e2)](this[_0x37c8f6(0x3cc)]()[_0x37c8f6(0x11e)]);break;case 0x67:this[_0x37c8f6(0x15a)]++,this[_0x37c8f6(0x19e)](this[_0x37c8f6(0x3cc)]()['parameters']);break;case 0x68:this[_0x37c8f6(0x15a)]++,this[_0x37c8f6(0x275)](this[_0x37c8f6(0x3cc)]()[_0x37c8f6(0x11e)]);break;case 0x165:const _0x5451c4=this[_0x37c8f6(0x4c4)][this[_0x37c8f6(0x15a)]+0x1],_0x57a58f=_0x5451c4[_0x37c8f6(0x11e)];_0x57a58f[0x0]===Game_Interpreter[_0x37c8f6(0x3dd)]&&this['prepareShowTextPluginCommandFollowups'](_0x57a58f);break;}},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x378)]=Game_Interpreter[_0x427ba4(0x357)]['setupChoices'],Game_Interpreter[_0x427ba4(0x357)][_0x427ba4(0x2e2)]=function(_0x3be52c){const _0x42330d=_0x427ba4;_0x3be52c=this[_0x42330d(0x1b4)](),VisuMZ[_0x42330d(0x243)][_0x42330d(0x378)][_0x42330d(0x488)](this,_0x3be52c),$gameMessage[_0x42330d(0x31d)]();},Game_Interpreter[_0x427ba4(0x357)]['addContinuousShowChoices']=function(){const _0x2758d3=_0x427ba4,_0x344932=this['_index'],_0x3f3a98=[];let _0x201730=0x0;this[_0x2758d3(0x15a)]++;while(this[_0x2758d3(0x15a)]<this[_0x2758d3(0x4c4)]['length']){if(this['currentCommand']()[_0x2758d3(0x2b3)]===this[_0x2758d3(0x197)]){if(this['currentCommand']()[_0x2758d3(0x161)]===0x194&&this[_0x2758d3(0x4e1)]()!==0x66)break;else{if(this[_0x2758d3(0x3cc)]()['code']===0x66)this['adjustShowChoiceExtension'](_0x201730,this['currentCommand'](),_0x344932),this['_index']-=0x2;else this[_0x2758d3(0x3cc)]()[_0x2758d3(0x161)]===0x192&&(this[_0x2758d3(0x3cc)]()[_0x2758d3(0x11e)][0x0]=_0x201730,_0x201730++);}}this[_0x2758d3(0x15a)]++;}return this[_0x2758d3(0x15a)]=_0x344932,this[_0x2758d3(0x3cc)]()[_0x2758d3(0x11e)];},Game_Interpreter['prototype'][_0x427ba4(0x3fb)]=function(_0x49e5e2,_0x478d52,_0x315e15){const _0x43e7c1=_0x427ba4;this[_0x43e7c1(0x223)](_0x49e5e2,_0x478d52,_0x315e15),this[_0x43e7c1(0x420)](_0x49e5e2,_0x478d52,_0x315e15),this[_0x43e7c1(0x144)](_0x478d52,_0x315e15);},Game_Interpreter['prototype'][_0x427ba4(0x223)]=function(_0x32b8d1,_0x2f56c6,_0x9e000e){const _0x22c370=_0x427ba4;if(_0x2f56c6[_0x22c370(0x11e)][0x2]<0x0)return;const _0x538af2=_0x2f56c6['parameters'][0x2]+_0x32b8d1;this[_0x22c370(0x4c4)][_0x9e000e][_0x22c370(0x11e)][0x2]=_0x538af2;},Game_Interpreter['prototype']['adjustShowChoiceCancel']=function(_0x5a2073,_0xee8a2f,_0x21b47f){const _0x5a23c8=_0x427ba4;if(_0xee8a2f[_0x5a23c8(0x11e)][0x1]>=0x0){var _0x2a87b6=_0xee8a2f[_0x5a23c8(0x11e)][0x1]+_0x5a2073;this[_0x5a23c8(0x4c4)][_0x21b47f][_0x5a23c8(0x11e)][0x1]=_0x2a87b6;}else _0xee8a2f[_0x5a23c8(0x11e)][0x1]===-0x2&&(this['_list'][_0x21b47f][_0x5a23c8(0x11e)][0x1]=_0xee8a2f[_0x5a23c8(0x11e)][0x1]);},Game_Interpreter['prototype'][_0x427ba4(0x144)]=function(_0x21552b,_0x464dab){const _0x575a96=_0x427ba4;for(const _0x8be0bf of _0x21552b['parameters'][0x0]){this[_0x575a96(0x4c4)][_0x464dab]['parameters'][0x0][_0x575a96(0x329)](_0x8be0bf);}this['_list'][_0x575a96(0x2a1)](this['_index']-0x1,0x2);},Game_Interpreter[_0x427ba4(0x357)]['prepareShowTextPluginCommandFollowups']=function(_0x2ba53f){const _0x399cc8=_0x427ba4,_0x1c54b1=_0x2ba53f[0x1];if(_0x1c54b1===_0x399cc8(0x473))this[_0x399cc8(0x15a)]++,this[_0x399cc8(0x1e7)](_0x2ba53f);else{if(_0x1c54b1===_0x399cc8(0x3d3))this['_index']++,this[_0x399cc8(0x43d)](_0x2ba53f);else _0x1c54b1===_0x399cc8(0x24b)&&Imported[_0x399cc8(0x259)]&&(this[_0x399cc8(0x15a)]++,this['setSkillChoice'](_0x2ba53f));}},Game_Interpreter[_0x427ba4(0x357)][_0x427ba4(0x1e7)]=function(_0x579eb4){const _0x10af37=_0x427ba4,_0x1201aa=JSON[_0x10af37(0x137)](JSON['stringify'](_0x579eb4[0x3]));VisuMZ[_0x10af37(0x4d4)](_0x1201aa,_0x1201aa),$gameMessage[_0x10af37(0x1e7)](_0x1201aa['VariableID']||0x0,_0x1201aa[_0x10af37(0x4b0)]||0x0);},Game_Interpreter[_0x427ba4(0x357)]['setArmorChoice']=function(_0x52e316){const _0x4f3fc3=_0x427ba4,_0x20a5f9=JSON[_0x4f3fc3(0x137)](JSON[_0x4f3fc3(0x1f6)](_0x52e316[0x3]));VisuMZ[_0x4f3fc3(0x4d4)](_0x20a5f9,_0x20a5f9),$gameMessage[_0x4f3fc3(0x43d)](_0x20a5f9[_0x4f3fc3(0x18f)]||0x0,_0x20a5f9['ArmorTypeID']||0x0,_0x20a5f9[_0x4f3fc3(0x24c)]||0x0);},Game_Interpreter[_0x427ba4(0x357)][_0x427ba4(0x2ed)]=function(_0x1c2772){const _0x34a88c=_0x427ba4,_0x25c85f=JSON[_0x34a88c(0x137)](JSON[_0x34a88c(0x1f6)](_0x1c2772[0x3]));VisuMZ['ConvertParams'](_0x25c85f,_0x25c85f),$gameMessage[_0x34a88c(0x2ed)](_0x25c85f[_0x34a88c(0x18f)]||0x0,_0x25c85f[_0x34a88c(0x16d)]||0x0,_0x25c85f['SkillTypeID']||0x0);};function Game_MessageCommonEvent(){const _0x2c0b44=_0x427ba4;this[_0x2c0b44(0x187)](...arguments);}Game_MessageCommonEvent[_0x427ba4(0x357)][_0x427ba4(0x187)]=function(_0x465314,_0x22a06e){const _0x413249=_0x427ba4;this[_0x413249(0x1d8)]=_0x465314,this[_0x413249(0x325)]=_0x22a06e||0x0,this[_0x413249(0x2d4)]();},Game_MessageCommonEvent[_0x427ba4(0x357)][_0x427ba4(0x374)]=function(){return $dataCommonEvents[this['_commonEventId']];},Game_MessageCommonEvent['prototype'][_0x427ba4(0x2e8)]=function(){const _0x27f7b3=_0x427ba4;return this[_0x27f7b3(0x374)]()[_0x27f7b3(0x2e8)];},Game_MessageCommonEvent[_0x427ba4(0x357)][_0x427ba4(0x2d4)]=function(){const _0xf8acbe=_0x427ba4;this['_interpreter']=new Game_Interpreter(),this['_interpreter']['setup'](this[_0xf8acbe(0x2e8)](),this[_0xf8acbe(0x325)]);},Game_MessageCommonEvent[_0x427ba4(0x357)][_0x427ba4(0x45b)]=function(){const _0x5d924e=_0x427ba4;this[_0x5d924e(0x1a2)]&&(this[_0x5d924e(0x1a2)][_0x5d924e(0x35a)]()?this[_0x5d924e(0x1a2)][_0x5d924e(0x45b)]():this[_0x5d924e(0x399)]());},Game_MessageCommonEvent[_0x427ba4(0x357)][_0x427ba4(0x399)]=function(){const _0x160804=_0x427ba4;this[_0x160804(0x1a2)]=null;},Scene_Message[_0x427ba4(0x357)][_0x427ba4(0x160)]=function(){const _0x348dae=_0x427ba4,_0x2c7b46=Math[_0x348dae(0x47e)](Graphics[_0x348dae(0x4db)],$gameSystem['getMessageWindowWidth']()),_0x3f52ab=$gameSystem[_0x348dae(0x11b)](),_0x47b0b7=this['calcWindowHeight'](_0x3f52ab,![]),_0x1e178b=(Graphics['boxWidth']-_0x2c7b46)/0x2,_0x35ecc6=0x0;return new Rectangle(_0x1e178b,_0x35ecc6,_0x2c7b46,_0x47b0b7);},VisuMZ['MessageCore'][_0x427ba4(0x425)]=Scene_Message[_0x427ba4(0x357)]['createChoiceListWindow'],Scene_Message['prototype'][_0x427ba4(0x354)]=function(){const _0x3b3d8e=_0x427ba4;VisuMZ[_0x3b3d8e(0x243)][_0x3b3d8e(0x425)][_0x3b3d8e(0x488)](this),this['createChoiceListHelpWindow']();},Scene_Message['prototype'][_0x427ba4(0x459)]=function(){const _0x5422a6=_0x427ba4,_0x45c549=this[_0x5422a6(0x36f)](),_0x276632=new Window_Help(_0x45c549);_0x276632[_0x5422a6(0x206)](),this[_0x5422a6(0x166)][_0x5422a6(0x31a)](_0x276632),this['_messageWindow']['setChoiceListHelpWindow'](_0x276632),this[_0x5422a6(0x4c0)](_0x276632),this[_0x5422a6(0x4c8)]=_0x276632;},Scene_Message[_0x427ba4(0x357)]['choiceListHelpWindowRect']=function(){const _0x55cfe1=_0x427ba4,_0x85ad8d=0x0,_0x23083d=0x0,_0x15c4d0=Graphics[_0x55cfe1(0x49b)],_0x5754fd=this[_0x55cfe1(0x3c2)](0x2,![]);return new Rectangle(_0x85ad8d,_0x23083d,_0x15c4d0,_0x5754fd);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x435)]=function(_0x10c557){const _0x958613=_0x427ba4;this[_0x958613(0x4c8)]=_0x10c557;},Window_Message[_0x427ba4(0x357)]['updateChoiceListHelpWindowPlacement']=function(){const _0x236be7=_0x427ba4;if(!this[_0x236be7(0x4c8)])return;const _0x264520=this[_0x236be7(0x4c8)];_0x264520&&(_0x264520['y']=this['y']>0x0?0x0:Graphics[_0x236be7(0x234)]-_0x264520['height']);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x33e)]=Scene_Options['prototype']['maxCommands'],Scene_Options[_0x427ba4(0x357)][_0x427ba4(0x142)]=function(){const _0x152cb9=_0x427ba4;let _0x5c2c33=VisuMZ[_0x152cb9(0x243)]['Scene_Options_maxCommands'][_0x152cb9(0x488)](this);const _0x4bc8c9=VisuMZ[_0x152cb9(0x243)][_0x152cb9(0x1ae)];if(_0x4bc8c9['TextSpeed']['AdjustRect']){_0x4bc8c9[_0x152cb9(0x335)][_0x152cb9(0x1da)]&&TextManager['isVisuMzLocalizationEnabled']()&&_0x5c2c33++;if(_0x4bc8c9[_0x152cb9(0x266)][_0x152cb9(0x1da)])_0x5c2c33++;}return _0x5c2c33;},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x46e)]=Sprite_Picture[_0x427ba4(0x357)][_0x427ba4(0x18a)],Sprite_Picture[_0x427ba4(0x357)]['updateBitmap']=function(){const _0x482cc5=_0x427ba4;VisuMZ[_0x482cc5(0x243)][_0x482cc5(0x46e)][_0x482cc5(0x488)](this),this[_0x482cc5(0x20b)]();},VisuMZ['MessageCore'][_0x427ba4(0x227)]=Sprite_Picture[_0x427ba4(0x357)]['update'],Sprite_Picture['prototype']['update']=function(){const _0x24a69a=_0x427ba4;VisuMZ[_0x24a69a(0x243)][_0x24a69a(0x227)][_0x24a69a(0x488)](this),this[_0x24a69a(0x2ad)]();},Sprite_Picture[_0x427ba4(0x357)][_0x427ba4(0x2ad)]=function(){const _0x30e10c=_0x427ba4;if(!this[_0x30e10c(0x43f)])return;this[_0x30e10c(0x145)](),this[_0x30e10c(0x2b2)](),this[_0x30e10c(0x3c0)](),this[_0x30e10c(0x2f7)]();},Sprite_Picture[_0x427ba4(0x357)][_0x427ba4(0x20b)]=function(){const _0x5b792d=_0x427ba4;if(this[_0x5b792d(0x28f)])return;if(this[_0x5b792d(0x492)])return;const _0x360c27=new Rectangle(0x0,0x0,0x0,0x0);this[_0x5b792d(0x28f)]=new Window_Base(_0x360c27),this[_0x5b792d(0x28f)][_0x5b792d(0x1dd)]=0x0,this[_0x5b792d(0x492)]=new Sprite(),this['addChildAt'](this[_0x5b792d(0x492)],0x0),this['_pictureTextWidth']=0x0,this[_0x5b792d(0x17d)]=0x0,this[_0x5b792d(0x245)]={};},Sprite_Picture['prototype']['resizePictureText']=function(){const _0x1632dd=_0x427ba4;if(!this[_0x1632dd(0x28f)])return;if(this['_pictureTextWidth']===this[_0x1632dd(0x4db)]&&this[_0x1632dd(0x17d)]===this[_0x1632dd(0x229)])return;this[_0x1632dd(0x351)]=this['width'],this[_0x1632dd(0x17d)]=this[_0x1632dd(0x229)],this[_0x1632dd(0x245)]={},this['_pictureTextWindow'][_0x1632dd(0x372)](0x0,0x0,this[_0x1632dd(0x4db)],this[_0x1632dd(0x229)]);},Sprite_Picture[_0x427ba4(0x357)]['anchorPictureText']=function(){const _0x11189d=_0x427ba4;if(!this[_0x11189d(0x492)])return;this['_pictureTextSprite'][_0x11189d(0x3e4)]['x']=this[_0x11189d(0x3e4)]['x'],this[_0x11189d(0x492)][_0x11189d(0x3e4)]['y']=this[_0x11189d(0x3e4)]['y'];},Sprite_Picture['prototype'][_0x427ba4(0x3c0)]=function(){const _0x4fb7e0=_0x427ba4;if(!this[_0x4fb7e0(0x28f)])return;if(!this['anyPictureTextChanges']())return;const _0x2bec18=['upperleft','up',_0x4fb7e0(0x423),'left',_0x4fb7e0(0x2f2),'right','lowerleft','down',_0x4fb7e0(0x17e)];this[_0x4fb7e0(0x28f)][_0x4fb7e0(0x13a)]();for(const _0x2bb717 of _0x2bec18){this['drawPictureTextZone'](_0x2bb717);}},Sprite_Picture[_0x427ba4(0x357)][_0x427ba4(0x3d4)]=function(){const _0x9ca0c=_0x427ba4;if($gameScreen[_0x9ca0c(0x3cf)](this[_0x9ca0c(0x2c2)]))return!![];const _0x56032a=[_0x9ca0c(0x493),'up',_0x9ca0c(0x423),_0x9ca0c(0x13e),_0x9ca0c(0x2f2),_0x9ca0c(0x294),_0x9ca0c(0x168),_0x9ca0c(0x2b1),_0x9ca0c(0x17e)];for(const _0x5cd90b of _0x56032a){const _0x3a0ebe=$gameScreen[_0x9ca0c(0x2b4)](this['_pictureId'],_0x5cd90b);if(this[_0x9ca0c(0x245)][_0x5cd90b]===_0x3a0ebe)continue;return!![];}return![];},Sprite_Picture[_0x427ba4(0x357)]['drawPictureTextZone']=function(_0x256a7d){const _0x4f7fd8=_0x427ba4;$gameScreen['clearPictureTextRefresh'](this['_pictureId']);const _0x5cda07=$gameScreen[_0x4f7fd8(0x2b4)](this[_0x4f7fd8(0x2c2)],_0x256a7d);this['_pictureTextCache'][_0x256a7d]=_0x5cda07;const _0x3f8d3f=this['_pictureTextWindow'][_0x4f7fd8(0x157)](_0x5cda07);let _0x2f7b8a=$gameScreen['getPictureTextBuffer'](this['_pictureId']),_0x42d3dc=_0x2f7b8a,_0x193fa5=_0x2f7b8a;if(['up','center',_0x4f7fd8(0x2b1)]['includes'](_0x256a7d))_0x42d3dc=Math[_0x4f7fd8(0x38f)]((this[_0x4f7fd8(0x4db)]-_0x3f8d3f['width'])/0x2);else[_0x4f7fd8(0x423),'right',_0x4f7fd8(0x17e)]['includes'](_0x256a7d)&&(_0x42d3dc=Math[_0x4f7fd8(0x38f)](this[_0x4f7fd8(0x4db)]-_0x3f8d3f[_0x4f7fd8(0x4db)]-_0x2f7b8a));if([_0x4f7fd8(0x13e),_0x4f7fd8(0x2f2),_0x4f7fd8(0x294)][_0x4f7fd8(0x4e5)](_0x256a7d))_0x193fa5=Math['floor']((this[_0x4f7fd8(0x229)]-_0x3f8d3f['height'])/0x2);else[_0x4f7fd8(0x168),_0x4f7fd8(0x2b1),_0x4f7fd8(0x17e)][_0x4f7fd8(0x4e5)](_0x256a7d)&&(_0x193fa5=Math[_0x4f7fd8(0x38f)](this[_0x4f7fd8(0x229)]-_0x3f8d3f[_0x4f7fd8(0x229)]-_0x2f7b8a));this[_0x4f7fd8(0x28f)]['drawTextEx'](_0x5cda07,_0x42d3dc,_0x193fa5);},Sprite_Picture[_0x427ba4(0x357)][_0x427ba4(0x2f7)]=function(){const _0x2a1cf4=_0x427ba4;if(!this[_0x2a1cf4(0x28f)])return;if(!this[_0x2a1cf4(0x492)])return;this['_pictureTextSprite'][_0x2a1cf4(0x3a4)]=this[_0x2a1cf4(0x28f)]['contents'];},VisuMZ[_0x427ba4(0x243)]['Window_Base_initialize']=Window_Base[_0x427ba4(0x357)][_0x427ba4(0x187)],Window_Base['prototype'][_0x427ba4(0x187)]=function(_0x49ccec){const _0x172b36=_0x427ba4;this[_0x172b36(0x29e)](_0x49ccec),VisuMZ['MessageCore']['Window_Base_initialize'][_0x172b36(0x488)](this,_0x49ccec);},Window_Base[_0x427ba4(0x357)]['initMessageCore']=function(_0x16460f){const _0x594ee9=_0x427ba4;this[_0x594ee9(0x31b)](),this[_0x594ee9(0x281)](),this[_0x594ee9(0x341)](_0x16460f);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x31b)]=function(){const _0x2d98cd=_0x427ba4;this[_0x2d98cd(0x4ac)](_0x2d98cd(0x412));},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x4ac)]=function(_0x3c25fe){const _0xa0bdd=_0x427ba4;this[_0xa0bdd(0x3e3)]=_0x3c25fe;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x4c5)]=function(){return this['_textAlignment'];},VisuMZ['MessageCore'][_0x427ba4(0x4dc)]=Window_Base['prototype'][_0x427ba4(0x157)],Window_Base[_0x427ba4(0x357)][_0x427ba4(0x157)]=function(_0x30f598){const _0x26d0ed=_0x427ba4;return this[_0x26d0ed(0x281)](),VisuMZ['MessageCore'][_0x26d0ed(0x4dc)][_0x26d0ed(0x488)](this,_0x30f598);},Window_Base['prototype'][_0x427ba4(0x122)]=function(_0x3ce317){const _0x3696ac=_0x427ba4;return VisuMZ[_0x3696ac(0x243)][_0x3696ac(0x4dc)][_0x3696ac(0x488)](this,_0x3ce317);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x1d2)]=Window_Base[_0x427ba4(0x357)][_0x427ba4(0x2fe)],Window_Base[_0x427ba4(0x357)][_0x427ba4(0x2fe)]=function(_0x35a168){const _0x205ad1=_0x427ba4;VisuMZ['MessageCore']['Window_Base_processAllText']['call'](this,_0x35a168);if(_0x35a168[_0x205ad1(0x3e9)])this['setTextAlignment'](_0x205ad1(0x412));},Window_Base['prototype']['resetWordWrap']=function(){const _0x302428=_0x427ba4;this[_0x302428(0x1ce)](![]);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x330)]=function(){return this['_wordWrap'];},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x1ce)]=function(_0x5b67a8){const _0x1b4bfd=_0x427ba4;return this[_0x1b4bfd(0x36c)]=_0x5b67a8,'';},Window_Base[_0x427ba4(0x357)]['registerResetRect']=function(_0x4fe75d){const _0x14e57b=_0x427ba4;this[_0x14e57b(0x140)]=JsonEx[_0x14e57b(0x386)](_0x4fe75d);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x2db)]=function(){const _0x2a746f=_0x427ba4;this[_0x2a746f(0x19c)]['fontFace']=$gameSystem[_0x2a746f(0x15b)](),this[_0x2a746f(0x19c)]['fontSize']=$gameSystem[_0x2a746f(0x1c8)](),this[_0x2a746f(0x19c)][_0x2a746f(0x40c)]=![],this[_0x2a746f(0x19c)]['fontItalic']=![],this[_0x2a746f(0x3d1)]=0x0,this[_0x2a746f(0x366)]=!![],this['resetTextColor']();},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x4fa)]=function(){const _0x5d0b6b=_0x427ba4;this['changeTextColor'](ColorManager[_0x5d0b6b(0x1c5)]()),this['changeOutlineColor'](ColorManager[_0x5d0b6b(0x4b3)]());const _0xffd38d=VisuMZ[_0x5d0b6b(0x243)][_0x5d0b6b(0x1ae)][_0x5d0b6b(0x3ea)];_0xffd38d[_0x5d0b6b(0x2a2)]===undefined&&(_0xffd38d[_0x5d0b6b(0x2a2)]=0x3),this[_0x5d0b6b(0x19c)]['outlineWidth']=_0xffd38d['DefaultOutlineWidth'],this[_0x5d0b6b(0x3b1)](![]);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x3b1)]=function(_0x53073a){const _0x58b8f8=_0x427ba4;this[_0x58b8f8(0x428)]=_0x53073a;},Window_Base['prototype'][_0x427ba4(0x389)]=function(){const _0x2757e7=_0x427ba4;return this[_0x2757e7(0x428)];},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x205)]=function(){return![];},Window_Base[_0x427ba4(0x357)]['getPreservedFontSettings']=function(){const _0x2a8459=_0x427ba4,_0x55dc14=['fontFace',_0x2a8459(0x367),_0x2a8459(0x40c),_0x2a8459(0x18b),_0x2a8459(0x297),_0x2a8459(0x1be),_0x2a8459(0x1d3),'paintOpacity'];let _0x5185f8={};for(const _0x549aa3 of _0x55dc14){_0x5185f8[_0x549aa3]=this[_0x2a8459(0x19c)][_0x549aa3];}return _0x5185f8;},Window_Base[_0x427ba4(0x357)]['returnPreservedFontSettings']=function(_0x1071ce){const _0x2d38f1=_0x427ba4;for(const _0x273061 in _0x1071ce){this[_0x2d38f1(0x19c)][_0x273061]=_0x1071ce[_0x273061];}},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x4a8)]=Window_Base[_0x427ba4(0x357)][_0x427ba4(0x45b)],Window_Base['prototype'][_0x427ba4(0x45b)]=function(){const _0x43fb10=_0x427ba4;VisuMZ[_0x43fb10(0x243)][_0x43fb10(0x4a8)][_0x43fb10(0x488)](this),this[_0x43fb10(0x219)]();},Window_Base[_0x427ba4(0x357)]['canMove']=function(){return![];},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x219)]=function(){const _0x4840fe=_0x427ba4;this[_0x4840fe(0x33f)]>0x0&&(this['canMove']()&&(this['x']=this[_0x4840fe(0x2a8)](this['x'],this[_0x4840fe(0x26d)]),this['y']=this[_0x4840fe(0x2a8)](this['y'],this[_0x4840fe(0x4ec)]),this[_0x4840fe(0x4db)]=this[_0x4840fe(0x2a8)](this['width'],this[_0x4840fe(0x130)]),this[_0x4840fe(0x229)]=this[_0x4840fe(0x2a8)](this['height'],this[_0x4840fe(0x14d)]),this[_0x4840fe(0x2a5)]()),this['_moveDuration']--);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x2a5)]=function(_0x2914e1,_0x55a490){const _0x1a8c9c=_0x427ba4;!_0x2914e1&&(this[_0x1a8c9c(0x4db)]=Math[_0x1a8c9c(0x47e)](this[_0x1a8c9c(0x4db)],Graphics[_0x1a8c9c(0x4db)]),this[_0x1a8c9c(0x229)]=Math['min'](this[_0x1a8c9c(0x229)],Graphics[_0x1a8c9c(0x229)]));if(!_0x55a490){const _0x1a0465=-(Math['floor'](Graphics['width']-Graphics['boxWidth'])/0x2),_0x3af9ba=_0x1a0465+Graphics[_0x1a8c9c(0x4db)]-this[_0x1a8c9c(0x4db)],_0xab3efe=-(Math[_0x1a8c9c(0x38f)](Graphics[_0x1a8c9c(0x229)]-Graphics[_0x1a8c9c(0x234)])/0x2),_0x1dbace=_0xab3efe+Graphics[_0x1a8c9c(0x229)]-this[_0x1a8c9c(0x229)];this['x']=this['x'][_0x1a8c9c(0x456)](_0x1a0465,_0x3af9ba),this['y']=this['y'][_0x1a8c9c(0x456)](_0xab3efe,_0x1dbace);}},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x2a8)]=function(_0x289201,_0x5c7f4b){const _0x1786c9=_0x427ba4,_0x390bd4=this[_0x1786c9(0x33f)],_0x114cfe=this['_wholeMoveDuration'],_0x196ffd=this[_0x1786c9(0x455)]((_0x114cfe-_0x390bd4)/_0x114cfe),_0xc0a555=this[_0x1786c9(0x455)]((_0x114cfe-_0x390bd4+0x1)/_0x114cfe),_0x2017a6=(_0x289201-_0x5c7f4b*_0x196ffd)/(0x1-_0x196ffd);return _0x2017a6+(_0x5c7f4b-_0x2017a6)*_0xc0a555;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x455)]=function(_0x520b89){const _0x57e531=_0x427ba4,_0x3dba3a=0x2;switch(this[_0x57e531(0x452)]){case 0x0:return _0x520b89;case 0x1:return this['easeIn'](_0x520b89,_0x3dba3a);case 0x2:return this[_0x57e531(0x49d)](_0x520b89,_0x3dba3a);case 0x3:return this[_0x57e531(0x26b)](_0x520b89,_0x3dba3a);default:return Imported[_0x57e531(0x37a)]?VisuMZ[_0x57e531(0x2a8)](_0x520b89,this[_0x57e531(0x452)]):_0x520b89;}},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x2b0)]=function(_0x3be5c5,_0x1bd7a2,_0x23e011,_0xc5c985,_0x206063,_0x5d3525){const _0x10c117=_0x427ba4;this['_moveTargetX']=_0x3be5c5,this[_0x10c117(0x4ec)]=_0x1bd7a2,this[_0x10c117(0x130)]=_0x23e011||this[_0x10c117(0x4db)],this[_0x10c117(0x14d)]=_0xc5c985||this[_0x10c117(0x229)],this[_0x10c117(0x33f)]=_0x206063||0x1;if(this['_moveDuration']<=0x0)this[_0x10c117(0x33f)]=0x1;this[_0x10c117(0x276)]=this[_0x10c117(0x33f)],this[_0x10c117(0x452)]=_0x5d3525||0x0;if(_0x206063<=0x0)this[_0x10c117(0x219)]();},Window_Base['prototype'][_0x427ba4(0x498)]=function(_0x24d5d8,_0x257f04,_0x1138a3,_0x3203c6,_0x50afd0,_0x55077b){const _0x211cf4=_0x427ba4;this[_0x211cf4(0x26d)]=this['x']+_0x24d5d8,this[_0x211cf4(0x4ec)]=this['y']+_0x257f04,this[_0x211cf4(0x130)]=this['width']+(_0x1138a3||0x0),this['_moveTargetHeight']=this[_0x211cf4(0x229)]+(_0x3203c6||0x0),this[_0x211cf4(0x33f)]=_0x50afd0||0x1;if(this['_moveDuration']<=0x0)this[_0x211cf4(0x33f)]=0x1;this[_0x211cf4(0x276)]=this['_moveDuration'],this[_0x211cf4(0x452)]=_0x55077b||0x0;if(_0x50afd0<=0x0)this[_0x211cf4(0x219)]();},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x255)]=function(_0x372668,_0x519cb0){const _0x55009f=_0x427ba4;this[_0x55009f(0x2b0)](this[_0x55009f(0x140)]['x'],this[_0x55009f(0x140)]['y'],this[_0x55009f(0x140)]['width'],this['_resetRect'][_0x55009f(0x229)],_0x372668,_0x519cb0);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x13b)]=Window_Base[_0x427ba4(0x357)]['changeTextColor'],Window_Base[_0x427ba4(0x357)]['changeTextColor']=function(_0xf6b6fc){const _0x494339=_0x427ba4;if(this[_0x494339(0x389)]())return;_0xf6b6fc=_0xf6b6fc[_0x494339(0x1b7)](/\,/g,''),this[_0x494339(0x437)]=this[_0x494339(0x437)]||[],this[_0x494339(0x437)]['unshift'](this[_0x494339(0x19c)]['textColor']),VisuMZ[_0x494339(0x243)][_0x494339(0x13b)][_0x494339(0x488)](this,_0xf6b6fc);},Window_Base['prototype'][_0x427ba4(0x46a)]=function(_0x137829){const _0x111847=_0x427ba4;this[_0x111847(0x48e)](_0x137829);if(this['isColorLocked']())return;_0x137829['drawing']&&(this[_0x111847(0x437)]=this[_0x111847(0x437)]||[],this[_0x111847(0x19c)][_0x111847(0x297)]=this[_0x111847(0x437)]['shift']()||ColorManager[_0x111847(0x1c5)]());},Window_Base['prototype'][_0x427ba4(0x29b)]=function(_0xce58f2){const _0x219664=_0x427ba4;return _0xce58f2=this[_0x219664(0x116)](_0xce58f2),_0xce58f2=this[_0x219664(0x3aa)](_0xce58f2),_0xce58f2=this[_0x219664(0x182)](_0xce58f2),_0xce58f2=this['convertButtonAssistEscapeCharacters'](_0xce58f2),_0xce58f2=this[_0x219664(0x328)](_0xce58f2),_0xce58f2=this[_0x219664(0x1a6)](_0xce58f2),_0xce58f2=this['convertFontSettingsEscapeCharacters'](_0xce58f2),_0xce58f2=this['convertTextAlignmentEscapeCharacters'](_0xce58f2),_0xce58f2=this[_0x219664(0x158)](_0xce58f2),_0xce58f2=this['convertCasingEscapeCharacters'](_0xce58f2),_0xce58f2=this['convertBaseEscapeCharacters'](_0xce58f2),_0xce58f2=this[_0x219664(0x430)](_0xce58f2),_0xce58f2=this['convertMessageCoreEscapeActions'](_0xce58f2),_0xce58f2=this['convertMessageCoreEscapeReplacements'](_0xce58f2),_0xce58f2=this[_0x219664(0x36a)](_0xce58f2),_0xce58f2=this[_0x219664(0x182)](_0xce58f2),_0xce58f2=this[_0x219664(0x119)](_0xce58f2),_0xce58f2=this['prepareWordWrapEscapeCharacters'](_0xce58f2),_0xce58f2;},Window_Base[_0x427ba4(0x357)]['convertTextMacros']=function(_0x1143ca){const _0xe69c0f=_0x427ba4;this[_0xe69c0f(0x464)]=![];for(const _0x1dbd99 of VisuMZ[_0xe69c0f(0x243)][_0xe69c0f(0x1ae)]['TextMacros']){_0x1143ca&&_0x1143ca[_0xe69c0f(0x339)](_0x1dbd99[_0xe69c0f(0x4a6)])&&(this['_textMacroFound']=!![],_0x1143ca=_0x1143ca[_0xe69c0f(0x1b7)](_0x1dbd99[_0xe69c0f(0x4a6)],_0x1dbd99['textCodeResult'][_0xe69c0f(0x4cb)](this)));}return _0x1143ca||'';},Window_Base[_0x427ba4(0x357)]['convertBackslashCharacters']=function(_0x4655b8){const _0xde55d1=_0x427ba4;return _0x4655b8=_0x4655b8[_0xde55d1(0x1b7)](/\\/g,'\x1b'),_0x4655b8=_0x4655b8[_0xde55d1(0x1b7)](/\x1b\x1b/g,'\x5c'),_0x4655b8;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x182)]=function(_0x486e4d){const _0x291c4f=_0x427ba4;for(;;){if(_0x486e4d[_0x291c4f(0x339)](/\\V\[(\d+)\]/gi))_0x486e4d=_0x486e4d[_0x291c4f(0x1b7)](/\\V\[(\d+)\]/gi,(_0x3e7d05,_0x45572c)=>this[_0x291c4f(0x3aa)](String($gameVariables[_0x291c4f(0x326)](parseInt(_0x45572c)))));else{if(_0x486e4d['match'](/\x1bV\[(\d+)\]/gi))_0x486e4d=_0x486e4d['replace'](/\x1bV\[(\d+)\]/gi,(_0xd8feaa,_0x4f477d)=>this[_0x291c4f(0x3aa)](String($gameVariables[_0x291c4f(0x326)](parseInt(_0x4f477d)))));else break;}}return _0x486e4d;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x202)]=function(_0x2f07b9){const _0x1a87d3=_0x427ba4;return Imported[_0x1a87d3(0x37a)]&&(_0x2f07b9=_0x2f07b9['replace'](/<Up (?:KEY|BUTTON)>/gi,this[_0x1a87d3(0x3cd)]('up')),_0x2f07b9=_0x2f07b9['replace'](/<Left (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x1a87d3(0x13e))),_0x2f07b9=_0x2f07b9['replace'](/<Right (?:KEY|BUTTON)>/gi,this[_0x1a87d3(0x3cd)]('right')),_0x2f07b9=_0x2f07b9['replace'](/<Down (?:KEY|BUTTON)>/gi,this['convertButtonAssistText']('down')),_0x2f07b9=_0x2f07b9[_0x1a87d3(0x1b7)](/<Ok (?:KEY|BUTTON)>/gi,this[_0x1a87d3(0x3cd)]('ok')),_0x2f07b9=_0x2f07b9[_0x1a87d3(0x1b7)](/<Cancel (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x1a87d3(0x38c))),_0x2f07b9=_0x2f07b9[_0x1a87d3(0x1b7)](/<Menu (?:KEY|BUTTON)>/gi,this[_0x1a87d3(0x3cd)](_0x1a87d3(0x3a0))),_0x2f07b9=_0x2f07b9[_0x1a87d3(0x1b7)](/<Shift (?:KEY|BUTTON)>/gi,this[_0x1a87d3(0x3cd)](_0x1a87d3(0x4dd))),_0x2f07b9=_0x2f07b9['replace'](/<(?:PAGEUP|PAGE UP) (?:KEY|BUTTON)>/gi,this['convertButtonAssistText'](_0x1a87d3(0x110))),_0x2f07b9=_0x2f07b9['replace'](/<(?:PAGEDOWN|PAGEDN|PAGE DOWN) (?:KEY|BUTTON)>/gi,this[_0x1a87d3(0x3cd)]('pagedown'))),_0x2f07b9;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x3cd)]=function(_0x56099f){const _0x54d67b=_0x427ba4;let _0x113238=TextManager[_0x54d67b(0x126)](_0x56099f)||'';return _0x113238=this[_0x54d67b(0x3aa)](_0x113238),_0x113238=this[_0x54d67b(0x182)](_0x113238),_0x113238[_0x54d67b(0x1f9)]();},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x328)]=function(_0x333cba){return _0x333cba=this['switchOutTextForLocalization'](_0x333cba),this['registerActorNameAutoColorChanges'](),_0x333cba;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x2e3)]=function(_0x1e77cb){return _0x1e77cb=TextManager['parseLocalizedText'](_0x1e77cb),_0x1e77cb;},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x433)]=String[_0x427ba4(0x357)][_0x427ba4(0x230)],String['prototype'][_0x427ba4(0x230)]=function(){const _0x34688f=_0x427ba4;let _0x45b9b1=this;return _0x45b9b1=TextManager[_0x34688f(0x159)](_0x45b9b1),VisuMZ[_0x34688f(0x243)]['String_format'][_0x34688f(0x1a0)](_0x45b9b1,arguments);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x472)]=Bitmap['prototype'][_0x427ba4(0x1ac)],Bitmap['prototype'][_0x427ba4(0x1ac)]=function(_0x527f9a,_0xb8e263,_0x290c80,_0x4eb0a2,_0x18b961,_0x23f236){const _0x219a8e=_0x427ba4;_0x527f9a=TextManager[_0x219a8e(0x159)](_0x527f9a),VisuMZ[_0x219a8e(0x243)][_0x219a8e(0x472)][_0x219a8e(0x488)](this,_0x527f9a,_0xb8e263,_0x290c80,_0x4eb0a2,_0x18b961,_0x23f236);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x432)]=Bitmap[_0x427ba4(0x357)]['drawTextTopAligned'],Bitmap['prototype']['drawTextTopAligned']=function(_0x4f17a0,_0x55d156,_0x62b627,_0x34cfe6,_0x382a4b,_0x4e5b39){const _0x3b9514=_0x427ba4;_0x4f17a0=TextManager[_0x3b9514(0x159)](_0x4f17a0),VisuMZ['MessageCore'][_0x3b9514(0x432)]['call'](this,_0x4f17a0,_0x55d156,_0x62b627,_0x34cfe6,_0x382a4b,_0x4e5b39);},Window_Base['prototype'][_0x427ba4(0x36a)]=function(_0x2c12b0){return _0x2c12b0;},Window_Base[_0x427ba4(0x357)]['convertShowChoiceEscapeCodes']=function(_0x12ac9c){const _0x13825a=_0x427ba4;return this[_0x13825a(0x4ff)]()&&(_0x12ac9c=_0x12ac9c[_0x13825a(0x1b7)](/<(?:SHOW|HIDE|DISABLE|ENABLE)>/gi,''),_0x12ac9c=_0x12ac9c[_0x13825a(0x1b7)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x12ac9c=_0x12ac9c[_0x13825a(0x1b7)](/<(?:SHOW|HIDE|DISABLE|ENABLE)[ ](?:ALL|ANY)[ ](?:SWITCH|SWITCHES):[ ](.*?)>/gi,''),_0x12ac9c=_0x12ac9c[_0x13825a(0x1b7)](/<CHOICE WIDTH:[ ](\d+)>/gi,''),_0x12ac9c=_0x12ac9c[_0x13825a(0x1b7)](/<CHOICE INDENT:[ ](\d+)>/gi,''),_0x12ac9c=_0x12ac9c['replace'](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi,''),_0x12ac9c=_0x12ac9c[_0x13825a(0x1b7)](/<(?:FG|BG)(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/gi,''),_0x12ac9c=_0x12ac9c[_0x13825a(0x1b7)](/<(?:FG|BG)(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/gi,'')),_0x12ac9c;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x4ff)]=function(){const _0x1283ee=_0x427ba4,_0x2a91c2=[_0x1283ee(0x282),_0x1283ee(0x1d9)];return _0x2a91c2[_0x1283ee(0x4e5)](this[_0x1283ee(0x1c3)][_0x1283ee(0x1e8)]);},Window_Base[_0x427ba4(0x357)]['convertFontSettingsEscapeCharacters']=function(_0x67edd1){const _0xfeaf20=_0x427ba4;return _0x67edd1=_0x67edd1['replace'](/<B>/gi,_0xfeaf20(0x4b6)),_0x67edd1=_0x67edd1[_0xfeaf20(0x1b7)](/<\/B>/gi,_0xfeaf20(0x41b)),_0x67edd1=_0x67edd1[_0xfeaf20(0x1b7)](/<I>/gi,_0xfeaf20(0x3ce)),_0x67edd1=_0x67edd1[_0xfeaf20(0x1b7)](/<\/I>/gi,_0xfeaf20(0x23e)),_0x67edd1;},Window_Base[_0x427ba4(0x357)]['convertTextAlignmentEscapeCharacters']=function(_0x378b2d){const _0x1a532c=_0x427ba4;return _0x378b2d=_0x378b2d['replace'](/<LEFT>/gi,_0x1a532c(0x4c1)),_0x378b2d=_0x378b2d[_0x1a532c(0x1b7)](/<\/LEFT>/gi,_0x1a532c(0x1fe)),_0x378b2d=_0x378b2d[_0x1a532c(0x1b7)](/<CENTER>/gi,'\x1bTEXTALIGNMENT[2]'),_0x378b2d=_0x378b2d[_0x1a532c(0x1b7)](/<\/CENTER>/gi,_0x1a532c(0x1fe)),_0x378b2d=_0x378b2d[_0x1a532c(0x1b7)](/<RIGHT>/gi,_0x1a532c(0x427)),_0x378b2d=_0x378b2d[_0x1a532c(0x1b7)](/<\/RIGHT>/gi,_0x1a532c(0x1fe)),_0x378b2d;},Window_Base['prototype'][_0x427ba4(0x158)]=function(_0x2bd5f6){const _0x3c101c=_0x427ba4;return _0x2bd5f6=_0x2bd5f6['replace'](/<COLORLOCK>/gi,_0x3c101c(0x25f)),_0x2bd5f6=_0x2bd5f6[_0x3c101c(0x1b7)](/<\/COLORLOCK>/gi,'\x1bCOLORLOCK[0]'),_0x2bd5f6=_0x2bd5f6[_0x3c101c(0x1b7)](/\(\(\(/gi,_0x3c101c(0x25f)),_0x2bd5f6=_0x2bd5f6[_0x3c101c(0x1b7)](/\)\)\)/gi,_0x3c101c(0x2c3)),_0x2bd5f6;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x43e)]=function(_0x11a2bf){const _0x26e43a=_0x427ba4;return _0x11a2bf=_0x11a2bf['replace'](/<(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,'\x1bCASING[1]'),_0x11a2bf=_0x11a2bf['replace'](/<\/(?:LC|LOWERCASE|LOWER CASE|LOWER)>/gi,_0x26e43a(0x17f)),_0x11a2bf=_0x11a2bf['replace'](/<(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0x26e43a(0x39c)),_0x11a2bf=_0x11a2bf[_0x26e43a(0x1b7)](/<\/(?:UC|UPPERCASE|UPPER CASE|UPPER)>/gi,_0x26e43a(0x17f)),_0x11a2bf=_0x11a2bf['replace'](/<(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,'\x1bCASING[3]'),_0x11a2bf=_0x11a2bf['replace'](/<\/(?:CAPS|CAPSLOCK|CAPS LOCK|CAP)>/gi,_0x26e43a(0x17f)),_0x11a2bf=_0x11a2bf['replace'](/<(?:ALT|ALTERNATE|ALT CASE)>/gi,_0x26e43a(0x342)),_0x11a2bf=_0x11a2bf[_0x26e43a(0x1b7)](/<\/(?:ALT|ALTERNATE|ALT CASE)>/gi,'\x1bCASING[0]'),_0x11a2bf=_0x11a2bf[_0x26e43a(0x1b7)](/<(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,_0x26e43a(0x496)),_0x11a2bf=_0x11a2bf[_0x26e43a(0x1b7)](/<\/(?:CHAOS|CHAOSCASE|CHAOS CASE)>/gi,'\x1bCASING[0]'),_0x11a2bf;},Window_Base['prototype'][_0x427ba4(0x33d)]=function(_0x2c005d){const _0x4b9c10=_0x427ba4;return _0x2c005d=_0x2c005d[_0x4b9c10(0x1b7)](/\x1bN\[(\d+)\]/gi,(_0x5c2d78,_0x3edf5c)=>this[_0x4b9c10(0x27e)](parseInt(_0x3edf5c))),_0x2c005d=_0x2c005d[_0x4b9c10(0x1b7)](/\x1bP\[(\d+)\]/gi,(_0x46db03,_0x42a302)=>this[_0x4b9c10(0x1ba)](parseInt(_0x42a302))),_0x2c005d=_0x2c005d[_0x4b9c10(0x1b7)](/\x1bG/gi,TextManager[_0x4b9c10(0x124)]),_0x2c005d;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x430)]=function(_0x14bc48){const _0xf0b8ef=_0x427ba4;return _0x14bc48=_0x14bc48[_0xf0b8ef(0x1b7)](/\<(?:BATTLE|CURRENT BATTLE) TARGET\>/gi,this[_0xf0b8ef(0x362)]()),_0x14bc48=_0x14bc48['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:USER|SUBJECT)\>/gi,this['battleUserName']()),_0x14bc48=_0x14bc48['replace'](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION)\>/gi,this['battleActionName'](!![])),_0x14bc48=_0x14bc48[_0xf0b8ef(0x1b7)](/\<(?:BATTLE|CURRENT BATTLE) (?:ITEM|SKILL|ACTION) NAME\>/gi,this[_0xf0b8ef(0x233)](![])),_0x14bc48;},Window_Base[_0x427ba4(0x357)]['battleTargetName']=function(){const _0x102ffc=_0x427ba4;if(!SceneManager[_0x102ffc(0x482)]())return'';if(BattleManager[_0x102ffc(0x3e7)])return BattleManager['_target'][_0x102ffc(0x1e8)]();if(BattleManager[_0x102ffc(0x45a)][0x0])return BattleManager[_0x102ffc(0x45a)][0x0][_0x102ffc(0x1e8)]();return'';},Window_Base['prototype']['battleUserName']=function(){const _0xc415af=_0x427ba4;if(!SceneManager['isSceneBattle']())return'';let _0x1a4012=null;return _0x1a4012=BattleManager['_subject'],!_0x1a4012&&BattleManager[_0xc415af(0x129)]()&&(_0x1a4012=BattleManager['actor']()),_0x1a4012?_0x1a4012['name']():'';},Window_Base['prototype'][_0x427ba4(0x233)]=function(_0x4f429a){const _0x3715a8=_0x427ba4;if(!SceneManager[_0x3715a8(0x482)]())return'';let _0xb1ca79=BattleManager[_0x3715a8(0x270)]||null;!_0xb1ca79&&BattleManager[_0x3715a8(0x129)]()&&(_0xb1ca79=BattleManager['inputtingAction']());if(_0xb1ca79&&_0xb1ca79[_0x3715a8(0x30a)]()){let _0x2ecadc='';if(_0x4f429a)_0x2ecadc+=_0x3715a8(0x2a3)['format'](_0xb1ca79[_0x3715a8(0x30a)]()[_0x3715a8(0x4fc)]);return _0x2ecadc+=_0xb1ca79[_0x3715a8(0x30a)]()[_0x3715a8(0x1e8)],_0x2ecadc;}return'';},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x156)]=function(_0x29bb0b){const _0x3eb498=_0x427ba4;for(const _0x3dd5fc of VisuMZ[_0x3eb498(0x243)]['Settings']['TextCodeActions']){_0x29bb0b['match'](_0x3dd5fc[_0x3eb498(0x4a6)])&&(_0x29bb0b=_0x29bb0b[_0x3eb498(0x1b7)](_0x3dd5fc['textCodeCheck'],_0x3dd5fc['textCodeResult']),_0x29bb0b=this[_0x3eb498(0x182)](_0x29bb0b));}return _0x29bb0b;},Window_Base[_0x427ba4(0x357)]['convertMessageCoreEscapeReplacements']=function(_0x5aa997){const _0x4589e8=_0x427ba4;for(const _0x4809d8 of VisuMZ['MessageCore']['Settings'][_0x4589e8(0x2c1)]){_0x5aa997[_0x4589e8(0x339)](_0x4809d8['textCodeCheck'])&&(_0x5aa997=_0x5aa997['replace'](_0x4809d8[_0x4589e8(0x4a6)],_0x4809d8[_0x4589e8(0x211)][_0x4589e8(0x4cb)](this)),_0x5aa997=this[_0x4589e8(0x182)](_0x5aa997));}return _0x5aa997;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x27e)]=function(_0x2c4767){const _0x4cd107=_0x427ba4,_0x250d1e=_0x2c4767>=0x1?$gameActors[_0x4cd107(0x2ae)](_0x2c4767):null,_0x311e94=_0x250d1e?_0x250d1e[_0x4cd107(0x1e8)]():'',_0x55064f=Number(VisuMZ[_0x4cd107(0x243)][_0x4cd107(0x1ae)][_0x4cd107(0x3b3)][_0x4cd107(0x3e5)]);return this[_0x4cd107(0x205)]()&&_0x55064f!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'[_0x4cd107(0x230)](_0x55064f,_0x311e94):_0x311e94;},Window_Base[_0x427ba4(0x357)]['partyMemberName']=function(_0x4066b1){const _0x569d19=_0x427ba4,_0x4c19a2=_0x4066b1>=0x1?$gameParty[_0x569d19(0x46f)]()[_0x4066b1-0x1]:null,_0x8a7d8c=_0x4c19a2?_0x4c19a2['name']():'',_0x242a26=Number(VisuMZ['MessageCore'][_0x569d19(0x1ae)]['AutoColor']['Actors']);return this[_0x569d19(0x205)]()&&_0x242a26!==0x0?'\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x242a26,_0x8a7d8c):_0x8a7d8c;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x119)]=function(_0x440c66){const _0x3096a0=_0x427ba4;return this[_0x3096a0(0x205)]()&&(_0x440c66=this['processStoredAutoColorChanges'](_0x440c66),_0x440c66=this[_0x3096a0(0x4d7)](_0x440c66)),_0x440c66;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x381)]=function(_0x43a4e7){const _0x34589f=_0x427ba4;for(autoColor of VisuMZ[_0x34589f(0x243)][_0x34589f(0x2fb)]){_0x43a4e7=_0x43a4e7[_0x34589f(0x1b7)](autoColor[0x0],autoColor[0x1]);}return _0x43a4e7;},Window_Base['prototype'][_0x427ba4(0x10f)]=function(){this['_autoColorActorNames']=[];},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x16f)]=function(){const _0xe7b0d8=_0x427ba4;this[_0xe7b0d8(0x10f)]();const _0x54e550=VisuMZ[_0xe7b0d8(0x243)][_0xe7b0d8(0x1ae)][_0xe7b0d8(0x3b3)],_0x3d164e=_0x54e550[_0xe7b0d8(0x3e5)];if(_0x3d164e<=0x0)return;for(const _0x43d280 of $gameActors['_data']){if(!_0x43d280)continue;const _0x3be278=_0x43d280[_0xe7b0d8(0x1e8)]();if(_0x3be278[_0xe7b0d8(0x1f9)]()[_0xe7b0d8(0x429)]<=0x0)continue;if(/^\d+$/[_0xe7b0d8(0x4e0)](_0x3be278))continue;if(_0x3be278[_0xe7b0d8(0x339)](/-----/i))continue;let _0xf4f33e=VisuMZ[_0xe7b0d8(0x243)]['ConvertTextAutoColorRegExpFriendly'](_0x3be278);const _0xd58b14=new RegExp('\x5cb'+_0xf4f33e+'\x5cb','g'),_0x3eb5de=_0xe7b0d8(0x112)[_0xe7b0d8(0x230)](_0x3d164e,_0x3be278);this[_0xe7b0d8(0x3f2)]['push']([_0xd58b14,_0x3eb5de]);}},Window_Base['prototype']['processActorNameAutoColorChanges']=function(_0x4826af){const _0x173a82=_0x427ba4;this[_0x173a82(0x3f2)]===undefined&&this[_0x173a82(0x16f)]();for(autoColor of this[_0x173a82(0x3f2)]){_0x4826af=_0x4826af[_0x173a82(0x1b7)](autoColor[0x0],autoColor[0x1]);}return _0x4826af;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x431)]=function(_0x2f6525,_0x56f925,_0x12246c){const _0x79b614=_0x427ba4;if(!_0x2f6525)return'';const _0x2b1993=_0x2f6525[_0x56f925];let _0x386f9e='';if(_0x2b1993&&_0x12246c&&_0x2b1993[_0x79b614(0x4fc)]){const _0x4d7797=_0x79b614(0x397);_0x386f9e=_0x4d7797['format'](_0x2b1993[_0x79b614(0x4fc)],_0x2b1993[_0x79b614(0x1e8)]);}else _0x2b1993?_0x386f9e=_0x2b1993[_0x79b614(0x1e8)]:_0x386f9e='';return _0x386f9e=TextManager['parseLocalizedText'](_0x386f9e),this[_0x79b614(0x205)]()&&(_0x386f9e=this[_0x79b614(0x213)](_0x386f9e,_0x2f6525)),_0x386f9e;},Window_Base['prototype']['lastGainedObjectIcon']=function(){const _0xb56262=_0x427ba4,_0x583568=$gameParty[_0xb56262(0x4ab)]();if(_0x583568['id']<0x0)return'';let _0x326b5f=null;if(_0x583568[_0xb56262(0x40a)]===0x0)_0x326b5f=$dataItems[_0x583568['id']];if(_0x583568['type']===0x1)_0x326b5f=$dataWeapons[_0x583568['id']];if(_0x583568[_0xb56262(0x40a)]===0x2)_0x326b5f=$dataArmors[_0x583568['id']];if(!_0x326b5f)return'';return _0xb56262(0x2a9)['format'](_0x326b5f[_0xb56262(0x4fc)]);},Window_Base['prototype'][_0x427ba4(0x209)]=function(_0x45e59e){const _0x53a9d9=_0x427ba4,_0x5602b2=$gameParty[_0x53a9d9(0x4ab)]();if(_0x5602b2['id']<0x0)return'';let _0x4d1699=null;if(_0x5602b2['type']===0x0)_0x4d1699=$dataItems[_0x5602b2['id']];if(_0x5602b2[_0x53a9d9(0x40a)]===0x1)_0x4d1699=$dataWeapons[_0x5602b2['id']];if(_0x5602b2['type']===0x2)_0x4d1699=$dataArmors[_0x5602b2['id']];if(!_0x4d1699)return'';let _0x540851=_0x4d1699[_0x53a9d9(0x1e8)]||'';return TextManager[_0x53a9d9(0x239)]()&&(_0x540851=TextManager[_0x53a9d9(0x159)](_0x540851)),_0x45e59e?'\x1bi[%1]%2'['format'](_0x4d1699['iconIndex'],_0x540851):_0x540851;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x1ec)]=function(){const _0x3cdde6=_0x427ba4,_0x1723d1=$gameParty['getLastGainedItemData']();if(_0x1723d1['id']<=0x0)return'';return _0x1723d1[_0x3cdde6(0x32b)];},Window_Base[_0x427ba4(0x357)]['applyDatabaseAutoColor']=function(_0x89d6d9,_0x449db4){const _0x25aae9=_0x427ba4,_0x138d02=VisuMZ['MessageCore'][_0x25aae9(0x1ae)][_0x25aae9(0x3b3)];let _0x463241=0x0;if(_0x449db4===$dataActors)_0x463241=_0x138d02['Actors'];if(_0x449db4===$dataClasses)_0x463241=_0x138d02['Classes'];if(_0x449db4===$dataSkills)_0x463241=_0x138d02[_0x25aae9(0x2c4)];if(_0x449db4===$dataItems)_0x463241=_0x138d02[_0x25aae9(0x418)];if(_0x449db4===$dataWeapons)_0x463241=_0x138d02[_0x25aae9(0x471)];if(_0x449db4===$dataArmors)_0x463241=_0x138d02[_0x25aae9(0x346)];if(_0x449db4===$dataEnemies)_0x463241=_0x138d02['Enemies'];if(_0x449db4===$dataStates)_0x463241=_0x138d02[_0x25aae9(0x441)];return _0x463241>0x0&&(_0x89d6d9='\x1bC[%1]%2\x1bPREVCOLOR[0]'['format'](_0x463241,_0x89d6d9)),_0x89d6d9;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x198)]=function(_0x54d7ae){const _0x29a350=_0x427ba4;if(_0x54d7ae[_0x29a350(0x4e5)](_0x29a350(0x307)))return this[_0x29a350(0x1ce)](![]),_0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x54d7ae=_0x54d7ae['replace'](/<(?:WORDWRAP|WORD WRAP)>/gi,''),_0x54d7ae=_0x54d7ae['replace'](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/<\/(?:NOWORDWRAP|NO WORD WRAP)>/gi,''),_0x54d7ae;_0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/<(?:WORDWRAP|WORD WRAP)>/gi,(_0x22d6e4,_0x58f15c)=>this['setWordWrap'](!![])),_0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/<(?:NOWORDWRAP|NO WORD WRAP)>/gi,(_0x45b53b,_0x5824c2)=>this[_0x29a350(0x1ce)](![])),_0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/<\/(?:WORDWRAP|WORD WRAP)>/gi,(_0x564d95,_0x3cb958)=>this[_0x29a350(0x1ce)](![]));if(_0x54d7ae['match'](Window_Message[_0x29a350(0x1a4)]))this[_0x29a350(0x1ce)](![]);else _0x54d7ae['match'](Window_Message[_0x29a350(0x4d2)])&&this[_0x29a350(0x1ce)](![]);if(!this[_0x29a350(0x330)]())return _0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a'),_0x54d7ae;if(_0x54d7ae[_0x29a350(0x429)]<=0x0)return _0x54d7ae;return _0x54d7ae[_0x29a350(0x339)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)&&(_0x54d7ae=VisuMZ[_0x29a350(0x243)][_0x29a350(0x2da)](_0x54d7ae)['join']('')),VisuMZ['MessageCore'][_0x29a350(0x1ae)][_0x29a350(0x194)][_0x29a350(0x1c9)]?(_0x54d7ae=_0x54d7ae['replace'](/[\n\r]+/g,'\x20'),_0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/<(?:BR|LINEBREAK)>/gi,'\x20\x0a')):(_0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/[\n\r]+/g,''),_0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/<(?:BR|LINEBREAK)>/gi,'\x0a')),_0x54d7ae=this['addWrapBreakAfterPunctuation'](_0x54d7ae),_0x54d7ae=_0x54d7ae[_0x29a350(0x224)]('\x20')[_0x29a350(0x317)](_0x29a350(0x1b6)),_0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x54d7ae=_0x54d7ae[_0x29a350(0x1b7)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x54d7ae;},VisuMZ[_0x427ba4(0x243)]['SplitJpCnCharacters']=function(_0x45d28b){const _0x2d300a=_0x427ba4;let _0x5876a0=[],_0x341127='';while(_0x45d28b[_0x2d300a(0x429)]>0x0){const _0x545847=_0x45d28b[_0x2d300a(0x1e9)](0x0);_0x45d28b=_0x45d28b[_0x2d300a(0x134)](0x1),_0x545847[_0x2d300a(0x339)](/[\u3040-\u30FF\u4E00-\u9FFF]/g)?(_0x341127[_0x2d300a(0x429)]>0x0&&(_0x5876a0['push'](_0x341127),_0x341127=''),_0x5876a0[_0x2d300a(0x329)](_0x545847+_0x2d300a(0x12a))):_0x341127+=_0x545847;}return _0x341127[_0x2d300a(0x429)]>0x0&&(_0x5876a0['push'](_0x341127),_0x341127=''),_0x5876a0;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x3a9)]=function(_0x552ece){return _0x552ece;},VisuMZ['MessageCore'][_0x427ba4(0x2f4)]=Window_Base[_0x427ba4(0x357)]['processNewLine'],Window_Base[_0x427ba4(0x357)][_0x427ba4(0x21a)]=function(_0x48203e){const _0x2c2dba=_0x427ba4;VisuMZ[_0x2c2dba(0x243)]['Window_Base_processNewLine'][_0x2c2dba(0x488)](this,_0x48203e),this[_0x2c2dba(0x42b)](_0x48203e);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x3e8)]=function(_0x3a0788){const _0x537aa1=_0x427ba4;let _0x451c46=_0x3a0788['text'][_0x3a0788[_0x537aa1(0x1db)]++];if(_0x451c46[_0x537aa1(0x4fe)](0x0)<0x20)this['flushTextState'](_0x3a0788),this[_0x537aa1(0x174)](_0x3a0788,_0x451c46);else{if(this[_0x537aa1(0x3d1)]===0x1)_0x451c46=_0x451c46[_0x537aa1(0x21f)]();if(this[_0x537aa1(0x3d1)]===0x2){if(this[_0x537aa1(0x366)])_0x451c46=_0x451c46[_0x537aa1(0x177)]();this[_0x537aa1(0x366)]=/\s/['test'](_0x451c46);}if(this[_0x537aa1(0x3d1)]===0x3)_0x451c46=_0x451c46[_0x537aa1(0x177)]();this['_textCasing']===0x4&&(_0x451c46=this[_0x537aa1(0x268)]?_0x451c46[_0x537aa1(0x177)]():_0x451c46[_0x537aa1(0x21f)](),this['_lastAltCase']=!this[_0x537aa1(0x268)]),this['_textCasing']===0x5&&(_0x451c46=Math[_0x537aa1(0x1a9)]()<0.5?_0x451c46[_0x537aa1(0x177)]():_0x451c46[_0x537aa1(0x21f)]()),_0x3a0788[_0x537aa1(0x148)]+=_0x451c46;}},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x153)]=Window_Base[_0x427ba4(0x357)]['processControlCharacter'],Window_Base['prototype'][_0x427ba4(0x174)]=function(_0x28630e,_0x1ce865){const _0x1ac807=_0x427ba4;VisuMZ[_0x1ac807(0x243)]['Window_Base_processControlCharacter'][_0x1ac807(0x488)](this,_0x28630e,_0x1ce865);if(_0x1ce865===_0x1ac807(0x1b6))this[_0x1ac807(0x23f)](_0x28630e);else _0x1ce865===_0x1ac807(0x12a)&&this[_0x1ac807(0x23f)](_0x28630e,!![]);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x1bb)]=function(_0x36b933){const _0xba66a0=_0x427ba4;var _0x2af242=/^\<(.*?)\>/[_0xba66a0(0x250)](_0x36b933['text'][_0xba66a0(0x134)](_0x36b933[_0xba66a0(0x1db)]));return _0x2af242?(_0x36b933[_0xba66a0(0x1db)]+=_0x2af242[0x0][_0xba66a0(0x429)],String(_0x2af242[0x0]['slice'](0x1,_0x2af242[0x0][_0xba66a0(0x429)]-0x1))):'';},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x490)]=Window_Base[_0x427ba4(0x357)][_0x427ba4(0x4e7)],Window_Base['prototype'][_0x427ba4(0x4e7)]=function(_0x1d9208,_0x1bb194){const _0x544271=_0x427ba4;switch(_0x1d9208){case'C':_0x1bb194[_0x544271(0x3e9)]?VisuMZ['MessageCore'][_0x544271(0x490)]['call'](this,_0x1d9208,_0x1bb194):this[_0x544271(0x48e)](_0x1bb194);break;case'I':case'{':case'}':VisuMZ[_0x544271(0x243)]['Window_Base_processEscapeCharacter'][_0x544271(0x488)](this,_0x1d9208,_0x1bb194);break;case'FS':this[_0x544271(0x318)](_0x1bb194);break;case'PX':this[_0x544271(0x1af)](_0x1bb194);break;case'PY':this[_0x544271(0x256)](_0x1bb194);break;case'BOLD':this[_0x544271(0x2b7)](this[_0x544271(0x48e)](_0x1bb194));break;case _0x544271(0x4bb):this['processTextCasing'](_0x1bb194);break;case _0x544271(0x47b):this[_0x544271(0x336)](_0x1bb194);break;case'COLORLOCK':this[_0x544271(0x2ee)](_0x1bb194);break;case _0x544271(0x10c):this[_0x544271(0x338)](_0x1bb194);break;case _0x544271(0x11f):this['processFontChangeItalic'](this[_0x544271(0x48e)](_0x1bb194));break;case _0x544271(0x1dc):this[_0x544271(0x4a7)](_0x1bb194);break;case _0x544271(0x4bd):this[_0x544271(0x46a)](_0x1bb194);break;case _0x544271(0x14c):this[_0x544271(0x478)](_0x1bb194);break;case _0x544271(0x214):this['processCustomWait'](_0x1bb194);break;case'WRAPBREAK':this['processWrapBreak'](_0x1bb194);break;case'WRAPJPBREAK':this[_0x544271(0x23f)](_0x1bb194,!![]);break;default:this[_0x544271(0x4f0)](_0x1d9208,_0x1bb194);}},Window_Base[_0x427ba4(0x357)]['processMessageCoreEscapeActions']=function(_0x57132b,_0x1095dc){const _0x2820e5=_0x427ba4;for(const _0x371db7 of VisuMZ[_0x2820e5(0x243)][_0x2820e5(0x1ae)]['TextCodeActions']){if(_0x371db7['Match']===_0x57132b){if(_0x371db7[_0x2820e5(0x2b8)]==='')this[_0x2820e5(0x48e)](_0x1095dc);_0x371db7['ActionJS']['call'](this,_0x1095dc);if(this[_0x2820e5(0x1c3)]===Window_Message){const _0x1336f7=_0x371db7[_0x2820e5(0x171)]||0x0;if(_0x1336f7>0x0)this['launchMessageCommonEvent'](_0x1336f7);}}}},Window_Base[_0x427ba4(0x357)]['makeFontBigger']=function(){const _0x3fee0d=_0x427ba4;this[_0x3fee0d(0x19c)][_0x3fee0d(0x367)]+=VisuMZ[_0x3fee0d(0x243)][_0x3fee0d(0x1ae)]['General']['FontChangeValue'],this[_0x3fee0d(0x19c)]['fontSize']=Math[_0x3fee0d(0x47e)](this[_0x3fee0d(0x19c)][_0x3fee0d(0x367)],VisuMZ[_0x3fee0d(0x243)]['Settings'][_0x3fee0d(0x3ea)][_0x3fee0d(0x16b)]);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x1fd)]=function(){const _0x1b57be=_0x427ba4;this[_0x1b57be(0x19c)][_0x1b57be(0x367)]-=VisuMZ['MessageCore'][_0x1b57be(0x1ae)][_0x1b57be(0x3ea)]['FontChangeValue'],this[_0x1b57be(0x19c)][_0x1b57be(0x367)]=Math[_0x1b57be(0x2cb)](this[_0x1b57be(0x19c)][_0x1b57be(0x367)],VisuMZ[_0x1b57be(0x243)]['Settings'][_0x1b57be(0x3ea)][_0x1b57be(0x409)]);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x318)]=function(_0x5e0388){const _0x4cea42=_0x427ba4,_0x3bd7a8=this['obtainEscapeParam'](_0x5e0388);this[_0x4cea42(0x19c)][_0x4cea42(0x367)]=_0x3bd7a8['clamp'](VisuMZ['MessageCore'][_0x4cea42(0x1ae)][_0x4cea42(0x3ea)][_0x4cea42(0x409)],VisuMZ[_0x4cea42(0x243)][_0x4cea42(0x1ae)]['General'][_0x4cea42(0x16b)]);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x111)]=function(_0xd76295){const _0x3d4b64=_0x427ba4;let _0x129813=this[_0x3d4b64(0x19c)][_0x3d4b64(0x367)];const _0x58f76f=/\x1b({|}|FS)(\[(\d+)])?/gi;for(;;){const _0x537f52=_0x58f76f[_0x3d4b64(0x250)](_0xd76295);if(!_0x537f52)break;const _0x2f8ac5=String(_0x537f52[0x1])[_0x3d4b64(0x177)]();if(_0x2f8ac5==='{')this['makeFontBigger']();else{if(_0x2f8ac5==='}')this[_0x3d4b64(0x1fd)]();else _0x2f8ac5==='FS'&&(this[_0x3d4b64(0x19c)]['fontSize']=parseInt(_0x537f52[0x3])[_0x3d4b64(0x456)](VisuMZ[_0x3d4b64(0x243)]['Settings'][_0x3d4b64(0x3ea)][_0x3d4b64(0x409)],VisuMZ[_0x3d4b64(0x243)][_0x3d4b64(0x1ae)][_0x3d4b64(0x3ea)][_0x3d4b64(0x16b)]));}this[_0x3d4b64(0x19c)][_0x3d4b64(0x367)]>_0x129813&&(_0x129813=this[_0x3d4b64(0x19c)]['fontSize']);}return _0x129813;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x1af)]=function(_0x5203e5){const _0xe92a75=_0x427ba4;_0x5203e5['x']=this[_0xe92a75(0x48e)](_0x5203e5),VisuMZ['MessageCore'][_0xe92a75(0x1ae)][_0xe92a75(0x3ea)]['RelativePXPY']&&(_0x5203e5['x']+=_0x5203e5[_0xe92a75(0x189)]);},Window_Base[_0x427ba4(0x357)]['processPyTextCode']=function(_0x224b1b){const _0x11f102=_0x427ba4;_0x224b1b['y']=this[_0x11f102(0x48e)](_0x224b1b),VisuMZ[_0x11f102(0x243)][_0x11f102(0x1ae)][_0x11f102(0x3ea)]['RelativePXPY']&&(_0x224b1b['y']+=_0x224b1b[_0x11f102(0x24d)]);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x2b7)]=function(_0x1e5050){const _0x463cc2=_0x427ba4;this['contents'][_0x463cc2(0x40c)]=!!_0x1e5050;},Window_Base[_0x427ba4(0x357)]['processFontChangeItalic']=function(_0x2478d2){const _0x5d577a=_0x427ba4;this[_0x5d577a(0x19c)][_0x5d577a(0x18b)]=!!_0x2478d2;},Window_Base['prototype'][_0x427ba4(0x478)]=function(_0x25d033){const _0x95b5eb=_0x427ba4,_0x39dc0c=this[_0x95b5eb(0x48e)](_0x25d033);if(!_0x25d033[_0x95b5eb(0x3e9)])return;switch(_0x39dc0c){case 0x0:this['setTextAlignment'](_0x95b5eb(0x412));return;case 0x1:this['setTextAlignment'](_0x95b5eb(0x13e));break;case 0x2:this[_0x95b5eb(0x4ac)](_0x95b5eb(0x2f2));break;case 0x3:this['setTextAlignment'](_0x95b5eb(0x294));break;}this[_0x95b5eb(0x42b)](_0x25d033);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x42b)]=function(_0x3f65d6){const _0x2b0cc0=_0x427ba4;if(!_0x3f65d6[_0x2b0cc0(0x3e9)])return;if(_0x3f65d6[_0x2b0cc0(0x44f)])return;if(this[_0x2b0cc0(0x4c5)]()==='default')return;let _0x57cd4b=_0x3f65d6[_0x2b0cc0(0x30f)][_0x2b0cc0(0x500)]('\x1bTEXTALIGNMENT',_0x3f65d6[_0x2b0cc0(0x1db)]+0x1),_0x364d6a=_0x3f65d6['text']['indexOf']('\x0a',_0x3f65d6['index']+0x1);if(_0x57cd4b<0x0)_0x57cd4b=_0x3f65d6[_0x2b0cc0(0x30f)][_0x2b0cc0(0x429)]+0x1;if(_0x364d6a>0x0)_0x57cd4b=Math[_0x2b0cc0(0x47e)](_0x57cd4b,_0x364d6a);const _0x2c1f36=_0x3f65d6[_0x2b0cc0(0x30f)][_0x2b0cc0(0x46c)](_0x3f65d6[_0x2b0cc0(0x1db)],_0x57cd4b),_0x33768a=this['textSizeExTextAlignment'](_0x2c1f36)[_0x2b0cc0(0x4db)],_0x1930e6=_0x3f65d6[_0x2b0cc0(0x4db)]||this['innerWidth']-0x8,_0x29677f=this['constructor']===Window_Message&&$gameMessage[_0x2b0cc0(0x215)]()!=='';switch(this[_0x2b0cc0(0x4c5)]()){case'left':_0x3f65d6['x']=_0x3f65d6[_0x2b0cc0(0x189)];break;case _0x2b0cc0(0x2f2):_0x3f65d6['x']=_0x3f65d6[_0x2b0cc0(0x189)],_0x3f65d6['x']+=Math[_0x2b0cc0(0x38f)]((_0x1930e6-_0x33768a)/0x2);_0x29677f&&(_0x3f65d6['x']-=_0x3f65d6[_0x2b0cc0(0x189)]/0x2);break;case'right':_0x3f65d6['x']=_0x1930e6-_0x33768a+_0x3f65d6['startX'];_0x29677f&&(_0x3f65d6['x']-=_0x3f65d6[_0x2b0cc0(0x189)]);break;}},Window_Base['prototype'][_0x427ba4(0x175)]=function(_0x13dff2){const _0x4f649e=_0x427ba4;_0x13dff2=_0x13dff2[_0x4f649e(0x1b7)](/\x1b!/g,''),_0x13dff2=_0x13dff2['replace'](/\x1b\|/g,''),_0x13dff2=_0x13dff2[_0x4f649e(0x1b7)](/\x1b\./g,'');const _0x22577b=this[_0x4f649e(0x295)](_0x13dff2,0x0,0x0,0x0),_0x42b2b1=this[_0x4f649e(0x40f)]();return _0x22577b[_0x4f649e(0x3e9)]=![],this[_0x4f649e(0x2fe)](_0x22577b),this[_0x4f649e(0x2b5)](_0x42b2b1),{'width':_0x22577b[_0x4f649e(0x2e5)],'height':_0x22577b[_0x4f649e(0x4ea)]};},Window_Base[_0x427ba4(0x12e)]=VisuMZ[_0x427ba4(0x243)]['Settings'][_0x427ba4(0x194)]['EndPadding']||0x0,Window_Base[_0x427ba4(0x357)][_0x427ba4(0x23f)]=function(_0xdfe3a0,_0x4b1f0c){const _0x17dde7=_0x427ba4,_0x7a404d=(_0xdfe3a0[_0x17dde7(0x44f)]?-0x1:0x1)*this['textWidth']('\x20');if(!_0x4b1f0c)_0xdfe3a0['x']+=_0x7a404d;if(this[_0x17dde7(0x48e)](_0xdfe3a0)>0x0&&!_0x4b1f0c)_0xdfe3a0['x']+=_0x7a404d;if(_0xdfe3a0['rtl'])return;let _0x312409;_0x4b1f0c?_0x312409=_0xdfe3a0[_0x17dde7(0x30f)][_0x17dde7(0x500)](_0x17dde7(0x12a),_0xdfe3a0[_0x17dde7(0x1db)]+0x1):_0x312409=_0xdfe3a0[_0x17dde7(0x30f)][_0x17dde7(0x500)](_0x17dde7(0x1b6),_0xdfe3a0[_0x17dde7(0x1db)]+0x1);let _0xed25f=_0xdfe3a0[_0x17dde7(0x30f)]['indexOf']('\x0a',_0xdfe3a0[_0x17dde7(0x1db)]+0x1);if(_0x312409<0x0)_0x312409=_0xdfe3a0[_0x17dde7(0x30f)][_0x17dde7(0x429)]+0x1;if(_0xed25f>0x0)_0x312409=Math['min'](_0x312409,_0xed25f);const _0x1cf340=_0xdfe3a0[_0x17dde7(0x30f)][_0x17dde7(0x46c)](_0xdfe3a0[_0x17dde7(0x1db)],_0x312409),_0x5705c5=this[_0x17dde7(0x1e2)](_0x1cf340)[_0x17dde7(0x4db)];let _0x5851a6=_0xdfe3a0[_0x17dde7(0x4db)]||this['innerWidth'];_0x5851a6-=Window_Base[_0x17dde7(0x12e)];if(this[_0x17dde7(0x1c3)]===Window_Message){const _0x625740=$gameMessage[_0x17dde7(0x215)]()===''?0x0:ImageManager[_0x17dde7(0x29a)]+0x14;_0x5851a6-=_0x625740,VisuMZ[_0x17dde7(0x243)][_0x17dde7(0x1ae)]['WordWrap'][_0x17dde7(0x40e)]&&(_0x5851a6-=_0x625740);}let _0x40c5d4=![];_0xdfe3a0['x']+_0x5705c5>_0xdfe3a0[_0x17dde7(0x189)]+_0x5851a6&&(_0x40c5d4=!![]),_0x5705c5===0x0&&(_0x40c5d4=![]),_0x40c5d4&&(_0xdfe3a0['text']=_0xdfe3a0['text'][_0x17dde7(0x134)](0x0,_0xdfe3a0[_0x17dde7(0x1db)])+'\x0a'+_0xdfe3a0['text']['substr'](_0xdfe3a0[_0x17dde7(0x1db)]));},Window_Base[_0x427ba4(0x357)]['textSizeExWordWrap']=function(_0x53c9c7){const _0x4b65fe=_0x427ba4,_0x386117=this['createTextState'](_0x53c9c7,0x0,0x0,0x0),_0x5e914f=this[_0x4b65fe(0x40f)]();return _0x386117['drawing']=![],this[_0x4b65fe(0x1ce)](![]),this['processAllText'](_0x386117),this['setWordWrap'](!![]),this[_0x4b65fe(0x2b5)](_0x5e914f),{'width':_0x386117[_0x4b65fe(0x2e5)],'height':_0x386117[_0x4b65fe(0x4ea)]};},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x338)]=function(_0x344a7b){const _0x35430b=_0x427ba4;return this[_0x35430b(0x48e)](_0x344a7b);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x4a7)]=function(_0x3ea075){const _0xc691ce=_0x427ba4,_0x19e08b=this[_0xc691ce(0x1bb)](_0x3ea075)[_0xc691ce(0x224)](',');if(!_0x3ea075[_0xc691ce(0x3e9)])return;const _0x2a8bdb=_0x19e08b[0x0][_0xc691ce(0x1f9)](),_0x12d052=_0x19e08b[0x1]||0x0,_0x42ae77=_0x19e08b[0x2]||0x0,_0x386d47=ImageManager['loadPicture'](_0x2a8bdb),_0x3fed09=this[_0xc691ce(0x19c)]['paintOpacity'];_0x386d47['addLoadListener'](this[_0xc691ce(0x163)][_0xc691ce(0x4cb)](this,_0x386d47,_0x3ea075['x'],_0x3ea075['y'],_0x12d052,_0x42ae77,_0x3fed09));},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x163)]=function(_0x15c50c,_0x56a7b8,_0x216d59,_0x2bf4f0,_0x3feb14,_0x57b898){const _0x49e3a6=_0x427ba4;_0x2bf4f0=_0x2bf4f0||_0x15c50c[_0x49e3a6(0x4db)],_0x3feb14=_0x3feb14||_0x15c50c[_0x49e3a6(0x229)],this[_0x49e3a6(0x42d)][_0x49e3a6(0x2b6)]=_0x57b898,this[_0x49e3a6(0x42d)][_0x49e3a6(0x1b9)](_0x15c50c,0x0,0x0,_0x15c50c['width'],_0x15c50c[_0x49e3a6(0x229)],_0x56a7b8,_0x216d59,_0x2bf4f0,_0x3feb14),this[_0x49e3a6(0x42d)]['paintOpacity']=0xff;},Window_Base[_0x427ba4(0x357)]['processDrawCenteredPicture']=function(_0x4d8bd2){const _0x25ecff=_0x427ba4,_0x4b866c=this['obtainEscapeString'](_0x4d8bd2)[_0x25ecff(0x224)](',');if(!_0x4d8bd2[_0x25ecff(0x3e9)])return;const _0x1ca834=_0x4b866c[0x0][_0x25ecff(0x1f9)](),_0x219522=ImageManager[_0x25ecff(0x1cb)](_0x1ca834),_0x4685e1=JsonEx[_0x25ecff(0x386)](_0x4d8bd2),_0x445652=this[_0x25ecff(0x19c)][_0x25ecff(0x2b6)];_0x219522[_0x25ecff(0x337)](this[_0x25ecff(0x284)][_0x25ecff(0x4cb)](this,_0x219522,_0x4685e1,_0x445652));},Window_Base['prototype']['drawBackCenteredPicture']=function(_0x140c61,_0xe994c,_0x3bb265){const _0x3ce960=_0x427ba4,_0x281187=_0xe994c['width']||this['innerWidth'],_0x52733d=this[_0x3ce960(0x15a)]!==undefined?this[_0x3ce960(0x127)]():this[_0x3ce960(0x34f)],_0x38d156=_0x281187/_0x140c61[_0x3ce960(0x4db)],_0x3d9b17=_0x52733d/_0x140c61['height'],_0x3b4a8c=Math['min'](_0x38d156,_0x3d9b17,0x1),_0x5e2e87=this[_0x3ce960(0x15a)]!==undefined?(this[_0x3ce960(0x269)](0x0)[_0x3ce960(0x229)]-this[_0x3ce960(0x30c)]())/0x2:0x0,_0xbafaaa=_0x140c61[_0x3ce960(0x4db)]*_0x3b4a8c,_0x1626a1=_0x140c61[_0x3ce960(0x229)]*_0x3b4a8c,_0x43ee4a=Math[_0x3ce960(0x38f)]((_0x281187-_0xbafaaa)/0x2)+_0xe994c[_0x3ce960(0x189)],_0x19f26e=Math['floor']((_0x52733d-_0x1626a1)/0x2)+_0xe994c[_0x3ce960(0x24d)]-_0x5e2e87*0x2;this[_0x3ce960(0x42d)][_0x3ce960(0x2b6)]=_0x3bb265,this[_0x3ce960(0x42d)][_0x3ce960(0x1b9)](_0x140c61,0x0,0x0,_0x140c61[_0x3ce960(0x4db)],_0x140c61[_0x3ce960(0x229)],_0x43ee4a,_0x19f26e,_0xbafaaa,_0x1626a1),this[_0x3ce960(0x42d)][_0x3ce960(0x2b6)]=0xff;},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x2ee)]=function(_0x4d9a24){const _0x2b7578=_0x427ba4,_0x444d52=this[_0x2b7578(0x48e)](_0x4d9a24);if(_0x4d9a24[_0x2b7578(0x3e9)])this['setColorLock'](_0x444d52>0x0);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x179)]=function(_0x1ea163){const _0x424619=_0x427ba4,_0x4d31da=this['obtainEscapeParam'](_0x1ea163);this[_0x424619(0x1c3)]===Window_Message&&_0x1ea163['drawing']&&this[_0x424619(0x4d6)](_0x4d31da);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x22c)]=function(_0x58e7c2){const _0x163c85=_0x427ba4;this['_textCasing']=this[_0x163c85(0x48e)](_0x58e7c2),this[_0x163c85(0x366)]=!![],this['_lastAltCase']=!![];},VisuMZ[_0x427ba4(0x243)]['NonSupportedTextCodes']=function(_0x4e7fd9){const _0x4b872b=_0x427ba4;if($gameTemp['isPlaytest']()){let _0x563f3a=_0x4b872b(0x44c)[_0x4b872b(0x230)](_0x4e7fd9['constructor']['name']);alert(_0x563f3a),SceneManager[_0x4b872b(0x1e4)]();}},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x4ef)]=function(){const _0x39c864=_0x427ba4;VisuMZ['MessageCore'][_0x39c864(0x3ef)](this);},Window_Base['prototype'][_0x427ba4(0x4be)]=function(){const _0x4ca3d1=_0x427ba4;VisuMZ[_0x4ca3d1(0x243)][_0x4ca3d1(0x3ef)](this);},Window_Base[_0x427ba4(0x357)][_0x427ba4(0x4a4)]=function(){const _0x5ddb79=_0x427ba4;VisuMZ[_0x5ddb79(0x243)]['NonSupportedTextCodes'](this);},Window_Help[_0x427ba4(0x357)][_0x427ba4(0x281)]=function(){const _0x520762=_0x427ba4;this[_0x520762(0x1ce)]($gameSystem[_0x520762(0x1ad)]());},Window_Help[_0x427ba4(0x357)][_0x427ba4(0x205)]=function(){return!![];},VisuMZ['MessageCore'][_0x427ba4(0x327)]=Window_Help['prototype'][_0x427ba4(0x2d4)],Window_Help['prototype'][_0x427ba4(0x2d4)]=function(){const _0x52a986=_0x427ba4;this[_0x52a986(0x10f)]();if(this[_0x52a986(0x42d)])this[_0x52a986(0x42d)]['clear']();VisuMZ['MessageCore'][_0x52a986(0x327)][_0x52a986(0x488)](this),this[_0x52a986(0x281)]();},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x481)]=Window_Options['prototype']['addGeneralOptions'],Window_Options[_0x427ba4(0x357)][_0x427ba4(0x2dc)]=function(){const _0x9e70e0=_0x427ba4;VisuMZ['MessageCore'][_0x9e70e0(0x481)][_0x9e70e0(0x488)](this),this['addMessageCoreCommands']();},Window_Options['prototype'][_0x427ba4(0x305)]=function(){const _0x232700=_0x427ba4;VisuMZ[_0x232700(0x243)][_0x232700(0x1ae)][_0x232700(0x335)]['AddOption']&&TextManager[_0x232700(0x239)]()&&this[_0x232700(0x1ed)](),VisuMZ[_0x232700(0x243)][_0x232700(0x1ae)][_0x232700(0x266)][_0x232700(0x1da)]&&this[_0x232700(0x14b)]();},Window_Options[_0x427ba4(0x357)]['addMessageCoreLocalizationCommand']=function(){const _0x1039aa=_0x427ba4,_0xf94032=TextManager[_0x1039aa(0x401)],_0x5caf9a=_0x1039aa(0x436);this[_0x1039aa(0x3c5)](_0xf94032,_0x5caf9a);},Window_Options['prototype']['addMessageCoreTextSpeedCommand']=function(){const _0x52e7b1=_0x427ba4,_0x4cbd6c=TextManager['messageCoreTextSpeed'],_0x47c7bd=_0x52e7b1(0x2af);this[_0x52e7b1(0x3c5)](_0x4cbd6c,_0x47c7bd);},VisuMZ[_0x427ba4(0x243)]['Window_Options_statusText']=Window_Options[_0x427ba4(0x357)][_0x427ba4(0x45c)],Window_Options[_0x427ba4(0x357)]['statusText']=function(_0xefe72f){const _0x4c599d=_0x427ba4,_0xdbef32=this[_0x4c599d(0x2ab)](_0xefe72f);if(_0xdbef32===_0x4c599d(0x436))return this[_0x4c599d(0x12c)]();if(_0xdbef32===_0x4c599d(0x2af))return this[_0x4c599d(0x117)]();return VisuMZ[_0x4c599d(0x243)][_0x4c599d(0x267)][_0x4c599d(0x488)](this,_0xefe72f);},Window_Options[_0x427ba4(0x357)]['visuMzTextLocaleStatusText']=function(){const _0x3017bf=_0x427ba4,_0x316163=ConfigManager[_0x3017bf(0x436)];return TextManager['getLanguageName'](_0x316163);},Window_Options['prototype'][_0x427ba4(0x117)]=function(){const _0x198eac=_0x427ba4,_0x1b2a50=this[_0x198eac(0x37d)](_0x198eac(0x2af));return _0x1b2a50>0xa?TextManager['instantTextSpeed']:_0x1b2a50;},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x3f9)]=Window_Options['prototype'][_0x427ba4(0x39a)],Window_Options[_0x427ba4(0x357)]['isVolumeSymbol']=function(_0x29f6b4){const _0x5cd10d=_0x427ba4;if(_0x29f6b4===_0x5cd10d(0x436))return!![];if(_0x29f6b4==='textSpeed')return!![];return VisuMZ[_0x5cd10d(0x243)][_0x5cd10d(0x3f9)][_0x5cd10d(0x488)](this,_0x29f6b4);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x41a)]=Window_Options[_0x427ba4(0x357)][_0x427ba4(0x1e3)],Window_Options[_0x427ba4(0x357)][_0x427ba4(0x1e3)]=function(_0x4bc67a,_0x302558,_0x146313){const _0x3f1309=_0x427ba4;if(_0x4bc67a==='textLocale')return this[_0x3f1309(0x254)](_0x302558,_0x146313);if(_0x4bc67a===_0x3f1309(0x2af))return this[_0x3f1309(0x4df)](_0x4bc67a,_0x302558,_0x146313);VisuMZ[_0x3f1309(0x243)][_0x3f1309(0x41a)][_0x3f1309(0x488)](this,_0x4bc67a,_0x302558,_0x146313);},Window_Options[_0x427ba4(0x357)][_0x427ba4(0x254)]=function(_0x5c7c5f,_0x331924){const _0x17994e=_0x427ba4,_0x56845c=VisuMZ['MessageCore'][_0x17994e(0x1ae)][_0x17994e(0x335)][_0x17994e(0x3e2)]||[],_0x7061d5=ConfigManager[_0x17994e(0x436)];let _0x15f571=_0x56845c[_0x17994e(0x500)](_0x7061d5);_0x15f571+=_0x5c7c5f?0x1:-0x1;if(_0x15f571>=_0x56845c['length'])_0x15f571=_0x331924?0x0:_0x56845c[_0x17994e(0x429)]-0x1;if(_0x15f571<0x0)_0x15f571=_0x331924?_0x56845c[_0x17994e(0x429)]-0x1:0x0;this[_0x17994e(0x19a)](_0x17994e(0x436),_0x56845c[_0x15f571]);},Window_Options[_0x427ba4(0x357)]['changeTextSpeed']=function(_0x3c0c72,_0x1f303d,_0x5b6fe9){const _0x36d2dc=_0x427ba4,_0x16f4b4=this[_0x36d2dc(0x37d)](_0x3c0c72),_0x101783=0x1,_0x44dbc2=_0x16f4b4+(_0x1f303d?_0x101783:-_0x101783);_0x44dbc2>0xb&&_0x5b6fe9?this[_0x36d2dc(0x19a)](_0x3c0c72,0x1):this[_0x36d2dc(0x19a)](_0x3c0c72,_0x44dbc2[_0x36d2dc(0x456)](0x1,0xb));},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x252)]=function(){const _0x469144=_0x427ba4;let _0x2af53a=Window_Base[_0x469144(0x357)][_0x469144(0x252)][_0x469144(0x488)](this);return _0x2af53a-=this['addedHeight'](),_0x2af53a;},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x35d)]=function(){const _0xbd065b=_0x427ba4;Window_Base[_0xbd065b(0x357)][_0xbd065b(0x35d)][_0xbd065b(0x488)](this),VisuMZ[_0xbd065b(0x243)]['Settings'][_0xbd065b(0x3ea)]['StretchDimmedBg']&&this[_0xbd065b(0x24f)]();},Window_Message['prototype'][_0x427ba4(0x24f)]=function(){const _0x427c17=_0x427ba4;this[_0x427c17(0x28a)]['x']=Math['round'](this[_0x427c17(0x4db)]/0x2),this[_0x427c17(0x28a)][_0x427c17(0x3e4)]['x']=0.5,this[_0x427c17(0x28a)][_0x427c17(0x1c1)]['x']=Graphics['width'];},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x4f4)]=Window_Message['prototype'][_0x427ba4(0x135)],Window_Message[_0x427ba4(0x357)]['clearFlags']=function(){const _0x1afd10=_0x427ba4;VisuMZ[_0x1afd10(0x243)][_0x1afd10(0x4f4)]['call'](this),this[_0x1afd10(0x10f)](),this[_0x1afd10(0x281)](),this[_0x1afd10(0x3b1)](![]),this[_0x1afd10(0x4ac)](_0x1afd10(0x412)),this['setTextDelay'](VisuMZ['MessageCore'][_0x1afd10(0x1ae)][_0x1afd10(0x3ea)][_0x1afd10(0x451)]);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x281)]=function(){const _0x52f8bd=_0x427ba4;this['setWordWrap']($gameSystem[_0x52f8bd(0x394)]());},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x205)]=function(){return!![];},Window_Message['prototype']['setTextDelay']=function(_0x517d05){const _0x532192=_0x427ba4,_0x540a3c=0xb-ConfigManager['textSpeed'];_0x517d05=Math['round'](_0x517d05*_0x540a3c),this[_0x532192(0x322)]=_0x517d05,this['_textDelay']=_0x517d05;},VisuMZ[_0x427ba4(0x243)]['Window_Message_isTriggered']=Window_Message[_0x427ba4(0x357)][_0x427ba4(0x4ba)],Window_Message[_0x427ba4(0x357)][_0x427ba4(0x4ba)]=function(){const _0x49ab73=_0x427ba4;return VisuMZ['MessageCore'][_0x49ab73(0x13d)][_0x49ab73(0x488)](this)||Input['isPressed'](VisuMZ[_0x49ab73(0x243)][_0x49ab73(0x1ae)][_0x49ab73(0x3ea)][_0x49ab73(0x10e)]);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x3f6)]=Window_Message[_0x427ba4(0x357)][_0x427ba4(0x4b4)],Window_Message[_0x427ba4(0x357)]['updatePlacement']=function(){const _0x47b284=_0x427ba4;let _0x54df53=this['y'];this['x']=Math[_0x47b284(0x261)]((Graphics['boxWidth']-this[_0x47b284(0x4db)])/0x2),VisuMZ[_0x47b284(0x243)][_0x47b284(0x3f6)][_0x47b284(0x488)](this);if(this[_0x47b284(0x246)])this['y']=_0x54df53;this['updateXyOffsets'](),this[_0x47b284(0x1ee)](),this[_0x47b284(0x2a5)](),this[_0x47b284(0x1f2)]();},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x225)]=Window_Message[_0x427ba4(0x357)][_0x427ba4(0x373)],Window_Message['prototype'][_0x427ba4(0x373)]=function(_0x39133a){const _0x1c234f=_0x427ba4;this[_0x1c234f(0x2e4)](_0x39133a),this[_0x1c234f(0x143)](_0x39133a),VisuMZ[_0x1c234f(0x243)]['Window_Message_newPage'][_0x1c234f(0x488)](this,_0x39133a),this['createContents']();},Window_Message['prototype'][_0x427ba4(0x2e4)]=function(_0x3c6552){const _0x281e2a=_0x427ba4;if(!_0x3c6552)return;this[_0x281e2a(0x19b)]=![],_0x3c6552[_0x281e2a(0x30f)]=this[_0x281e2a(0x116)](_0x3c6552['text']),this['_textMacroFound']&&(_0x3c6552['text']=this['prepareWordWrapEscapeCharacters'](_0x3c6552[_0x281e2a(0x30f)]),this[_0x281e2a(0x19b)]=!![]);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x198)]=function(_0x22d625){const _0x2ee580=_0x427ba4;if(this[_0x2ee580(0x19b)])return _0x22d625;return Window_Base[_0x2ee580(0x357)][_0x2ee580(0x198)]['call'](this,_0x22d625);},Window_Message[_0x427ba4(0x357)]['onNewPageMessageCore']=function(_0xb42565){const _0x26608f=_0x427ba4;this[_0x26608f(0x4cd)](_0xb42565),this[_0x26608f(0x41f)](_0xb42565),this[_0x26608f(0x4ed)]();},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x263)]=Window_Message[_0x427ba4(0x357)][_0x427ba4(0x2bc)],Window_Message[_0x427ba4(0x357)][_0x427ba4(0x2bc)]=function(){const _0x126997=_0x427ba4;VisuMZ[_0x126997(0x243)]['Window_Message_terminateMessage']['call'](this),this[_0x126997(0x135)]();if(this[_0x126997(0x3f5)])this[_0x126997(0x37b)]();},Window_Message['prototype'][_0x427ba4(0x4ed)]=function(){const _0x15ebba=_0x427ba4;this[_0x15ebba(0x4db)]=$gameSystem[_0x15ebba(0x4bc)]()+this['addedWidth']();;this[_0x15ebba(0x4db)]=Math[_0x15ebba(0x47e)](Graphics[_0x15ebba(0x4db)],this['width']);const _0x150ccd=$gameSystem[_0x15ebba(0x11b)]();this[_0x15ebba(0x229)]=SceneManager[_0x15ebba(0x2cd)][_0x15ebba(0x3c2)](_0x150ccd,![])+this['addedHeight'](),this[_0x15ebba(0x229)]=Math[_0x15ebba(0x47e)](Graphics['height'],this[_0x15ebba(0x229)]);if($gameTemp['_centerMessageWindow'])this['resetPositionX']();},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x4ae)]=function(){return 0x0;},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x4e3)]=function(){return 0x0;},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x181)]=function(){const _0x147cdc=_0x427ba4;this['x']=(Graphics[_0x147cdc(0x49b)]-this[_0x147cdc(0x4db)])/0x2,$gameTemp[_0x147cdc(0x1a3)]=undefined,this[_0x147cdc(0x2a5)]();},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x219)]=function(){const _0x575f44=_0x427ba4,_0x308952={'x':this['x'],'y':this['y']};Window_Base[_0x575f44(0x357)][_0x575f44(0x219)][_0x575f44(0x488)](this),this[_0x575f44(0x15d)](_0x308952);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x16a)]=function(){return!![];},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x15d)]=function(_0x34bc5d){const _0x11c85c=_0x427ba4;this[_0x11c85c(0x359)]&&(this[_0x11c85c(0x359)]['x']+=this['x']-_0x34bc5d['x'],this['_nameBoxWindow']['y']+=this['y']-_0x34bc5d['y']);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x255)]=function(_0x2f7bd2,_0x5919c2){const _0x5b671e=_0x427ba4;this['moveTo'](this[_0x5b671e(0x140)]['x'],this[_0x5b671e(0x491)]*(Graphics[_0x5b671e(0x234)]-this[_0x5b671e(0x229)])/0x2,this[_0x5b671e(0x140)][_0x5b671e(0x4db)],this[_0x5b671e(0x140)][_0x5b671e(0x229)],_0x2f7bd2,_0x5919c2);},Window_Message['prototype'][_0x427ba4(0x338)]=function(_0x44c07e){const _0x334137=_0x427ba4,_0x1537f8=Window_Base[_0x334137(0x357)][_0x334137(0x338)][_0x334137(0x488)](this,_0x44c07e);_0x44c07e['drawing']&&this[_0x334137(0x12d)](_0x1537f8);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x12d)]=function(_0xc7b4e2){const _0x1cd49a=_0x427ba4;if($gameParty[_0x1cd49a(0x280)]()){}else $gameMap[_0x1cd49a(0x12f)](_0xc7b4e2);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x3e8)]=function(_0x1234bc){const _0x3c50dc=_0x427ba4;this[_0x3c50dc(0x322)]--,this[_0x3c50dc(0x322)]<=0x0&&(this['onProcessCharacter'](_0x1234bc),Window_Base[_0x3c50dc(0x357)]['processCharacter'][_0x3c50dc(0x488)](this,_0x1234bc));},Window_Message['prototype'][_0x427ba4(0x454)]=function(_0x3d148d){const _0x13c0d0=_0x427ba4;this[_0x13c0d0(0x322)]=this[_0x13c0d0(0x3fc)];if(this[_0x13c0d0(0x3fc)]<=0x0)this[_0x13c0d0(0x353)]=!![];},VisuMZ['MessageCore'][_0x427ba4(0x2ec)]=Window_Message[_0x427ba4(0x357)]['processEscapeCharacter'],Window_Message['prototype'][_0x427ba4(0x4e7)]=function(_0x353e7,_0x21af2b){const _0x3246ab=_0x427ba4;!_0x21af2b[_0x3246ab(0x3e9)]?Window_Base['prototype'][_0x3246ab(0x4e7)][_0x3246ab(0x488)](this,_0x353e7,_0x21af2b):VisuMZ[_0x3246ab(0x243)][_0x3246ab(0x2ec)]['call'](this,_0x353e7,_0x21af2b);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x3a7)]=Window_Message[_0x427ba4(0x357)][_0x427ba4(0x2d2)],Window_Message['prototype'][_0x427ba4(0x2d2)]=function(_0x297812){const _0x3facd3=_0x427ba4;if(this[_0x3facd3(0x2d8)])return![];return VisuMZ[_0x3facd3(0x243)]['Window_Message_needsNewPage']['call'](this,_0x297812);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x4cd)]=function(_0x4a4ddb){const _0x5e2cd5=_0x427ba4;let _0x2c40b3=_0x4a4ddb[_0x5e2cd5(0x30f)];this['_forcedPosition']={};if(this[_0x5e2cd5(0x330)]())return _0x2c40b3;_0x2c40b3=_0x2c40b3[_0x5e2cd5(0x1b7)](/<POSITION:[ ]*(.*?)>/gi,(_0x44a9ab,_0x3870b6)=>{const _0x5889b1=_0x5e2cd5,_0x32c29b=_0x3870b6[_0x5889b1(0x224)](',')[_0x5889b1(0x461)](_0x442f16=>Number(_0x442f16)||0x0);if(_0x32c29b[0x0]!==undefined)this[_0x5889b1(0x3bc)]['x']=Number(_0x32c29b[0x0]);if(_0x32c29b[0x1]!==undefined)this[_0x5889b1(0x3bc)]['y']=Number(_0x32c29b[0x1]);if(_0x32c29b[0x2]!==undefined)this['_forcedPosition'][_0x5889b1(0x4db)]=Number(_0x32c29b[0x2]);if(_0x32c29b[0x3]!==undefined)this[_0x5889b1(0x3bc)]['height']=Number(_0x32c29b[0x3]);return'';}),_0x2c40b3=_0x2c40b3['replace'](/<COORDINATES:[ ]*(.*?)>/gi,(_0x21dae4,_0x589dab)=>{const _0x2d64ed=_0x5e2cd5,_0x5613a2=_0x589dab[_0x2d64ed(0x224)](',')[_0x2d64ed(0x461)](_0x10bb32=>Number(_0x10bb32)||0x0);if(_0x5613a2[0x0]!==undefined)this[_0x2d64ed(0x3bc)]['x']=Number(_0x5613a2[0x0]);if(_0x5613a2[0x1]!==undefined)this[_0x2d64ed(0x3bc)]['y']=Number(_0x5613a2[0x1]);return'';}),_0x2c40b3=_0x2c40b3['replace'](/<DIMENSIONS:[ ]*(.*?)>/gi,(_0x57ca31,_0x10e9ba)=>{const _0x44e32a=_0x5e2cd5,_0x16dc09=_0x10e9ba['split'](',')[_0x44e32a(0x461)](_0x3bdb43=>Number(_0x3bdb43)||0x0);if(_0x16dc09[0x0]!==undefined)this[_0x44e32a(0x3bc)][_0x44e32a(0x4db)]=Number(_0x16dc09[0x2]);if(_0x16dc09[0x1]!==undefined)this[_0x44e32a(0x3bc)][_0x44e32a(0x229)]=Number(_0x16dc09[0x3]);return'';}),_0x2c40b3=_0x2c40b3[_0x5e2cd5(0x1b7)](/<OFFSET:[ ]*(.*?)>/gi,(_0x4e293a,_0xe587e3)=>{const _0x520ea9=_0x5e2cd5,_0x17c849=_0xe587e3[_0x520ea9(0x224)](',')['map'](_0x368dce=>Number(_0x368dce)||0x0);let _0x5f34e6=_0x17c849[0x0]||0x0,_0x2b7348=_0x17c849[0x1]||0x0;return $gameSystem['setMessageWindowXyOffsets'](_0x5f34e6,_0x2b7348),'';}),_0x4a4ddb[_0x5e2cd5(0x30f)]=_0x2c40b3;},Window_Message[_0x427ba4(0x357)]['updateXyOffsets']=function(){const _0x43d77e=_0x427ba4,_0x2857f4=$gameSystem[_0x43d77e(0x30e)]();this['x']+=_0x2857f4['x'],this['y']+=_0x2857f4['y'];},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x1ee)]=function(){const _0x2e2e71=_0x427ba4;this[_0x2e2e71(0x3bc)]=this[_0x2e2e71(0x3bc)]||{};const _0x16c38d=['x','y',_0x2e2e71(0x4db),_0x2e2e71(0x229)];for(const _0x4f0fe6 of _0x16c38d){this[_0x2e2e71(0x3bc)][_0x4f0fe6]!==undefined&&(this[_0x4f0fe6]=Number(this[_0x2e2e71(0x3bc)][_0x4f0fe6]));}},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x41f)]=function(_0x45771f){const _0x1d6033=_0x427ba4;this[_0x1d6033(0x2d8)]=![];let _0x7c2976=_0x45771f[_0x1d6033(0x30f)];_0x7c2976=_0x7c2976[_0x1d6033(0x1b7)](/<(?:AUTO|AUTOSIZE|AUTO SIZE)>/gi,()=>{const _0x4becff=_0x1d6033;return this[_0x4becff(0x3b2)](_0x7c2976,!![],!![]),this[_0x4becff(0x2f1)](_0x4becff(0x25c)),'';}),_0x7c2976=_0x7c2976[_0x1d6033(0x1b7)](/<(?:AUTOWIDTH|AUTO WIDTH)>/gi,()=>{const _0x1ced5f=_0x1d6033;return this[_0x1ced5f(0x3b2)](_0x7c2976,!![],![]),this[_0x1ced5f(0x2f1)](_0x1ced5f(0x25c)),'';}),_0x7c2976=_0x7c2976['replace'](/<(?:AUTOHEIGHT|AUTO HEIGHT)>/gi,()=>{const _0x40bd46=_0x1d6033;return this[_0x40bd46(0x3b2)](_0x7c2976,![],!![]),this[_0x40bd46(0x2f1)](_0x40bd46(0x25c)),'';});if(SceneManager[_0x1d6033(0x482)]())_0x7c2976=_0x7c2976[_0x1d6033(0x1b7)](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x39358e,_0x492c4a)=>{const _0x436b2e=_0x1d6033;return this[_0x436b2e(0x3b2)](_0x7c2976,!![],!![]),this['processAutoPosition'](_0x436b2e(0x3ff),Number(_0x492c4a)||0x1),'';}),_0x7c2976=_0x7c2976[_0x1d6033(0x1b7)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x10ff5a,_0x54a391)=>{const _0x1088b5=_0x1d6033;return this[_0x1088b5(0x3b2)](_0x7c2976,!![],!![]),this['processAutoPosition']('battle\x20party',Number(_0x54a391)||0x0),'';}),_0x7c2976=_0x7c2976[_0x1d6033(0x1b7)](/<(?:AUTOENEMY|AUTO ENEMY):[ ](.*?)>/gi,(_0x5530b9,_0x2308c4)=>{const _0x240780=_0x1d6033;return this[_0x240780(0x3b2)](_0x7c2976,!![],!![]),this[_0x240780(0x2f1)](_0x240780(0x2ac),Number(_0x2308c4)||0x0),'';});else SceneManager[_0x1d6033(0x35b)]()&&(_0x7c2976=_0x7c2976[_0x1d6033(0x1b7)](/<(?:AUTOPLAYER|AUTO PLAYER)>/gi,(_0x2601e1,_0x237293)=>{const _0x4b8c23=_0x1d6033;return this[_0x4b8c23(0x3b2)](_0x7c2976,!![],!![]),this[_0x4b8c23(0x2f1)](_0x4b8c23(0x291),0x0),'';}),_0x7c2976=_0x7c2976['replace'](/<(?:AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,(_0x246565,_0x19bc1a)=>{const _0x13c80b=_0x1d6033;return this[_0x13c80b(0x3b2)](_0x7c2976,!![],!![]),this[_0x13c80b(0x2f1)](_0x13c80b(0x29f),Number(_0x19bc1a)||0x1),'';}),_0x7c2976=_0x7c2976[_0x1d6033(0x1b7)](/<(?:AUTOPARTY|AUTO PARTY):[ ](.*?)>/gi,(_0x3d13a6,_0x10e47a)=>{const _0x24a074=_0x1d6033;return this[_0x24a074(0x3b2)](_0x7c2976,!![],!![]),this['processAutoPosition'](_0x24a074(0x3f4),Number(_0x10e47a)||0x0),'';}),_0x7c2976=_0x7c2976['replace'](/<(?:AUTOEVENT|AUTO EVENT):[ ](.*?)>/gi,(_0x177086,_0xd9b7c2)=>{const _0x47ad5a=_0x1d6033;return this[_0x47ad5a(0x3b2)](_0x7c2976,!![],!![]),this[_0x47ad5a(0x2f1)]('map\x20event',Number(_0xd9b7c2)||0x0),'';}));_0x45771f[_0x1d6033(0x30f)]=_0x7c2976;},Window_Message[_0x427ba4(0x1a4)]=/<(?:AUTO|AUTOSIZE|AUTO SIZE|AUTOWIDTH|AUTO WIDTH|AUTOHEIGHT|AUTO HEIGHT|AUTOPLAYER|AUTO PLAYER)>/gi,Window_Message[_0x427ba4(0x4d2)]=/<(?:AUTOPARTY|AUTO PARTY|AUTOPLAYER|AUTO PLAYER|AUTOEVENT|AUTO EVENT|AUTOENEMY|AUTO ENEMY|AUTOACTOR|AUTO ACTOR):[ ](.*?)>/gi,Window_Message[_0x427ba4(0x357)][_0x427ba4(0x3b2)]=function(_0x3a7e5c,_0x5ab5b6,_0x28f995){const _0x4802fa=_0x427ba4;_0x3a7e5c=_0x3a7e5c[_0x4802fa(0x1b7)](Window_Message[_0x4802fa(0x1a4)],''),_0x3a7e5c=_0x3a7e5c[_0x4802fa(0x1b7)](Window_Message['_autoPosRegExp'],''),this[_0x4802fa(0x417)]=!![],this[_0x4802fa(0x2d8)]=!![],this['setWordWrap'](![]);const _0x29dbcd=this[_0x4802fa(0x122)](_0x3a7e5c);if(_0x5ab5b6){let _0x520ace=_0x29dbcd[_0x4802fa(0x4db)]+$gameSystem[_0x4802fa(0x485)]()*0x2+0x6;const _0x1827c8=$gameMessage[_0x4802fa(0x215)]()!=='',_0x5815f8=ImageManager[_0x4802fa(0x29a)],_0x29529b=0x14;_0x520ace+=_0x1827c8?_0x5815f8+_0x29529b:0x4;if(_0x520ace%0x2!==0x0)_0x520ace+=0x1;$gameSystem['setMessageWindowWidth'](_0x520ace);}if(_0x28f995){let _0x5c32f4=Math[_0x4802fa(0x4b8)](_0x29dbcd[_0x4802fa(0x229)]/this[_0x4802fa(0x30c)]());$gameSystem[_0x4802fa(0x1e0)](_0x5c32f4);}this[_0x4802fa(0x23b)](),this[_0x4802fa(0x34a)](),this[_0x4802fa(0x417)]=![],this[_0x4802fa(0x3f5)]=!![];},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x23b)]=function(){const _0x522476=_0x427ba4;this[_0x522476(0x4ed)](),this[_0x522476(0x4b4)](),this[_0x522476(0x181)](),this[_0x522476(0x4cf)](),this['contents']['clear'](),this['createContents']();},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x2f1)]=function(_0x31c13,_0x332fa6){const _0x2e81ea=_0x427ba4;switch(_0x31c13[_0x2e81ea(0x21f)]()[_0x2e81ea(0x1f9)]()){case _0x2e81ea(0x3ff):this[_0x2e81ea(0x246)]=$gameActors[_0x2e81ea(0x2ae)](_0x332fa6);break;case _0x2e81ea(0x121):this[_0x2e81ea(0x246)]=$gameParty[_0x2e81ea(0x46f)]()[_0x332fa6-0x1];break;case _0x2e81ea(0x2ac):this['_autoPositionTarget']=$gameTroop[_0x2e81ea(0x46f)]()[_0x332fa6-0x1];break;case'map\x20player':this[_0x2e81ea(0x246)]=$gamePlayer;break;case'map\x20actor':const _0x45b5a1=$gameActors[_0x2e81ea(0x2ae)](_0x332fa6)[_0x2e81ea(0x1db)]();_0x45b5a1===0x0?this[_0x2e81ea(0x246)]=$gamePlayer:this['_autoPositionTarget']=$gamePlayer['followers']()[_0x2e81ea(0x3a3)](_0x45b5a1-0x1);break;case _0x2e81ea(0x3f4):_0x332fa6===0x1?this[_0x2e81ea(0x246)]=$gamePlayer:this[_0x2e81ea(0x246)]=$gamePlayer[_0x2e81ea(0x4bf)]()[_0x2e81ea(0x3a3)](_0x332fa6-0x2);break;case _0x2e81ea(0x2b9):this['_autoPositionTarget']=$gameMap['event'](_0x332fa6);break;}this[_0x2e81ea(0x246)]&&this['updateAutoPosition']();},VisuMZ['MessageCore'][_0x427ba4(0x2ca)]=Window_Message[_0x427ba4(0x357)][_0x427ba4(0x331)],Window_Message['prototype'][_0x427ba4(0x331)]=function(){const _0x2387d7=_0x427ba4;this[_0x2387d7(0x43b)](),VisuMZ[_0x2387d7(0x243)][_0x2387d7(0x2ca)][_0x2387d7(0x488)](this);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x43b)]=function(){const _0x5e1a7f=_0x427ba4;if(!this[_0x5e1a7f(0x246)])return;const _0x1e489d=SceneManager['_scene'];if(!_0x1e489d)return;const _0x5a5787=_0x1e489d[_0x5e1a7f(0x2ef)];if(!_0x5a5787)return;const _0x364fac=_0x5a5787[_0x5e1a7f(0x1f5)](this[_0x5e1a7f(0x246)]);if(!_0x364fac)return;let _0x519463=_0x364fac['x'];if(SceneManager[_0x5e1a7f(0x35b)]())_0x519463*=$gameScreen[_0x5e1a7f(0x304)]();else{if(SceneManager[_0x5e1a7f(0x482)]()&&Imported[_0x5e1a7f(0x287)]){let _0x5d2ca4=_0x364fac['x']-Graphics[_0x5e1a7f(0x49b)]*_0x5a5787[_0x5e1a7f(0x3e4)]['x'];_0x519463+=_0x5d2ca4*(_0x5a5787[_0x5e1a7f(0x1c1)]['x']-0x1);}}_0x519463-=this['width']/0x2,_0x519463-=(Graphics[_0x5e1a7f(0x4db)]-Graphics['boxWidth'])/0x2,_0x519463+=this[_0x5e1a7f(0x1d1)]();let _0x10b7b0=_0x364fac['y'];if(SceneManager[_0x5e1a7f(0x35b)]())_0x10b7b0-=_0x364fac[_0x5e1a7f(0x229)]+0x8,_0x10b7b0*=$gameScreen[_0x5e1a7f(0x304)](),_0x10b7b0-=this[_0x5e1a7f(0x229)]*$gameScreen[_0x5e1a7f(0x304)]();else{if(SceneManager['isSceneBattle']()&&Imported[_0x5e1a7f(0x287)]){let _0x24d31a=_0x364fac[_0x5e1a7f(0x229)]*_0x5a5787[_0x5e1a7f(0x1c1)]['y'];_0x10b7b0-=this['height']*_0x5a5787[_0x5e1a7f(0x1c1)]['y']+_0x24d31a+0x8;let _0x546907=_0x364fac['y']-Graphics[_0x5e1a7f(0x234)]*_0x5a5787['anchor']['y'];_0x10b7b0+=_0x546907*(_0x5a5787[_0x5e1a7f(0x1c1)]['y']-0x1);}else _0x10b7b0-=_0x364fac[_0x5e1a7f(0x229)]+0x8,_0x10b7b0-=this[_0x5e1a7f(0x229)];}_0x10b7b0-=(Graphics['height']-Graphics[_0x5e1a7f(0x234)])/0x2,_0x10b7b0+=this['autoPositionOffsetY']();const _0xc1e27b=$gameSystem[_0x5e1a7f(0x30e)]();_0x519463+=_0xc1e27b['x'],_0x10b7b0+=_0xc1e27b['y'],this['x']=Math[_0x5e1a7f(0x261)](_0x519463),this['y']=Math[_0x5e1a7f(0x261)](_0x10b7b0),this[_0x5e1a7f(0x2a5)](!![],![]),this['_forcedPosition']=this[_0x5e1a7f(0x3bc)]||{},this[_0x5e1a7f(0x3bc)]['x']=this['x'],this[_0x5e1a7f(0x3bc)]['y']=this['y'],this[_0x5e1a7f(0x3bc)]['width']=this[_0x5e1a7f(0x4db)],this[_0x5e1a7f(0x3bc)][_0x5e1a7f(0x229)]=this[_0x5e1a7f(0x229)],this[_0x5e1a7f(0x359)][_0x5e1a7f(0x4b4)]();},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x1d1)]=function(){return 0x0;},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x408)]=function(){return 0x0;},Window_Message['prototype'][_0x427ba4(0x37b)]=function(){const _0x421442=_0x427ba4;this[_0x421442(0x3f5)]=![],this[_0x421442(0x246)]=undefined,$gameSystem['initMessageCore'](),this[_0x421442(0x23b)](),this[_0x421442(0x314)]=0x0;},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x328)]=function(_0x41b7c3){const _0x2f4691=_0x427ba4;return Window_Base[_0x2f4691(0x357)][_0x2f4691(0x328)][_0x2f4691(0x488)](this,_0x41b7c3);},Window_Message[_0x427ba4(0x357)]['postConvertEscapeCharacters']=function(_0x1125bf){const _0x1cc509=_0x427ba4;return Window_Base['prototype'][_0x1cc509(0x36a)][_0x1cc509(0x488)](this,_0x1125bf);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x40b)]=function(_0x102828){const _0x4588d9=_0x427ba4;this[_0x4588d9(0x228)](_0x102828),Window_Base['prototype'][_0x4588d9(0x40b)][_0x4588d9(0x488)](this,_0x102828),this['postFlushTextState'](_0x102828);},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x228)]=function(_0x5beb9b){},Window_Message[_0x427ba4(0x357)][_0x427ba4(0x285)]=function(_0x4c0a3e){},Window_NameBox[_0x427ba4(0x357)][_0x427ba4(0x205)]=function(){return![];},Window_NameBox['prototype'][_0x427ba4(0x4fa)]=function(){const _0x40418a=_0x427ba4;Window_Base[_0x40418a(0x357)][_0x40418a(0x4fa)]['call'](this),this[_0x40418a(0x3f8)](this[_0x40418a(0x1cd)]());},Window_NameBox[_0x427ba4(0x357)]['defaultColor']=function(){const _0x52521e=_0x427ba4,_0x331454=VisuMZ['MessageCore'][_0x52521e(0x1ae)][_0x52521e(0x3ea)][_0x52521e(0x3b6)];return ColorManager[_0x52521e(0x297)](_0x331454);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x303)]=Window_NameBox[_0x427ba4(0x357)]['updatePlacement'],Window_NameBox[_0x427ba4(0x357)]['updatePlacement']=function(){const _0x463d38=_0x427ba4;VisuMZ[_0x463d38(0x243)][_0x463d38(0x303)]['call'](this),this['updateRelativePosition'](),this['updateOffsetPosition'](),this[_0x463d38(0x2a5)](),this['updateOverlappingY']();},Window_NameBox[_0x427ba4(0x357)][_0x427ba4(0x328)]=function(_0x255990){const _0x54b4a1=_0x427ba4;return _0x255990=_0x255990[_0x54b4a1(0x1b7)](/<LEFT>/gi,this[_0x54b4a1(0x236)][_0x54b4a1(0x4cb)](this,0x0)),_0x255990=_0x255990[_0x54b4a1(0x1b7)](/<CENTER>/gi,this[_0x54b4a1(0x236)][_0x54b4a1(0x4cb)](this,0x5)),_0x255990=_0x255990[_0x54b4a1(0x1b7)](/<RIGHT>/gi,this[_0x54b4a1(0x236)]['bind'](this,0xa)),_0x255990=_0x255990[_0x54b4a1(0x1b7)](/<POSITION:[ ](\d+)>/gi,(_0x2c81f3,_0xf6ceed)=>this[_0x54b4a1(0x236)](parseInt(_0xf6ceed))),_0x255990=_0x255990['replace'](/<\/LEFT>/gi,''),_0x255990=_0x255990['replace'](/<\/CENTER>/gi,''),_0x255990=_0x255990[_0x54b4a1(0x1b7)](/<\/RIGHT>/gi,''),_0x255990=_0x255990['trim'](),Window_Base['prototype'][_0x54b4a1(0x328)]['call'](this,_0x255990);},Window_NameBox[_0x427ba4(0x357)]['setRelativePosition']=function(_0x410f99){const _0x1470f3=_0x427ba4;return this[_0x1470f3(0x2de)]=_0x410f99,'';},Window_NameBox[_0x427ba4(0x357)][_0x427ba4(0x3bf)]=function(){const _0x4884cc=_0x427ba4;if($gameMessage[_0x4884cc(0x3af)]())return;this['_relativePosition']=this[_0x4884cc(0x2de)]||0x0;const _0x3f1658=this['_messageWindow'],_0x44303b=Math[_0x4884cc(0x38f)](_0x3f1658[_0x4884cc(0x4db)]*this[_0x4884cc(0x2de)]/0xa);this['x']=_0x3f1658['x']+_0x44303b-Math[_0x4884cc(0x38f)](this[_0x4884cc(0x4db)]/0x2),this['x']=this['x']['clamp'](_0x3f1658['x'],_0x3f1658['x']+_0x3f1658[_0x4884cc(0x4db)]-this['width']);},Window_NameBox[_0x427ba4(0x357)][_0x427ba4(0x390)]=function(){const _0x452339=_0x427ba4;if($gameMessage[_0x452339(0x3af)]())return;this[_0x452339(0x2de)]=this['_relativePosition']||0x0;const _0x1efbf8=VisuMZ['MessageCore'][_0x452339(0x1ae)][_0x452339(0x3ea)][_0x452339(0x4d0)],_0x1cb4a1=VisuMZ['MessageCore'][_0x452339(0x1ae)][_0x452339(0x3ea)][_0x452339(0x169)],_0x3abb20=(0x5-this['_relativePosition'])/0x5;this['x']+=Math[_0x452339(0x38f)](_0x1efbf8*_0x3abb20),this['y']+=_0x1cb4a1;},Window_NameBox[_0x427ba4(0x357)][_0x427ba4(0x151)]=function(){const _0x32949f=_0x427ba4,_0x5a2989=this[_0x32949f(0x350)],_0x239ef1=_0x5a2989['y'],_0x3650fa=VisuMZ['MessageCore'][_0x32949f(0x1ae)][_0x32949f(0x3ea)][_0x32949f(0x169)];_0x239ef1>this['y']&&_0x239ef1<this['y']+this[_0x32949f(0x229)]-_0x3650fa&&(this['y']=_0x5a2989['y']+_0x5a2989['height']);},VisuMZ[_0x427ba4(0x243)]['Window_NameBox_refresh']=Window_NameBox[_0x427ba4(0x357)][_0x427ba4(0x2d4)],Window_NameBox['prototype'][_0x427ba4(0x2d4)]=function(){const _0x4a097f=_0x427ba4;this[_0x4a097f(0x2de)]=0x0,VisuMZ[_0x4a097f(0x243)]['Window_NameBox_refresh'][_0x4a097f(0x488)](this);},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x330)]=function(){return![];},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x205)]=function(){return!![];},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x127)]=function(){const _0x1c2156=_0x427ba4;return $gameSystem[_0x1c2156(0x405)]()+0x8;},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x358)]=function(){const _0x5b6860=_0x427ba4;return $gameSystem[_0x5b6860(0x3d6)]();},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x434)]=function(){const _0x2042af=_0x427ba4;this[_0x2042af(0x2d4)](),this[_0x2042af(0x2bf)](),this['open'](),this['activate'](),this[_0x2042af(0x271)]();},Window_ChoiceList['prototype']['callOkHandler']=function(){const _0x262e02=_0x427ba4;$gameMessage[_0x262e02(0x4f3)](this[_0x262e02(0x28b)]()),this[_0x262e02(0x350)][_0x262e02(0x2bc)](),this[_0x262e02(0x34b)](),this[_0x262e02(0x154)]&&(this[_0x262e02(0x154)][_0x262e02(0x399)](),this['_helpWindow']['hide']());},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x3de)]=Window_ChoiceList['prototype'][_0x427ba4(0x2ea)],Window_ChoiceList['prototype'][_0x427ba4(0x2ea)]=function(){const _0x416713=_0x427ba4;VisuMZ[_0x416713(0x243)][_0x416713(0x3de)][_0x416713(0x488)](this),this[_0x416713(0x154)]&&(this['_helpWindow'][_0x416713(0x399)](),this[_0x416713(0x154)][_0x416713(0x206)]());},Window_ChoiceList['prototype'][_0x427ba4(0x2d4)]=function(){const _0x1c3378=_0x427ba4;this['clearCommandList'](),this[_0x1c3378(0x2cf)](),this['_messageWindow']&&(this[_0x1c3378(0x4b4)](),this[_0x1c3378(0x1a7)]()),this['createContents'](),this[_0x1c3378(0x2c7)](),this[_0x1c3378(0x35d)](),Window_Selectable[_0x1c3378(0x357)][_0x1c3378(0x2d4)][_0x1c3378(0x488)](this);},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x2cf)]=function(){const _0x278847=_0x427ba4;$gameMessage[_0x278847(0x1ab)]?this['makeCommandListScriptCall']():this[_0x278847(0x176)](),this['clearChoiceHelpDescriptions'](),this[_0x278847(0x29c)]();},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x38a)]=function(){const _0xc563d=_0x427ba4,_0x1b5ac6=$gameMessage[_0xc563d(0x45f)]();let _0x369a8a=0x0;for(let _0x183f24 of _0x1b5ac6){_0x183f24=this[_0xc563d(0x279)](_0x183f24);if(this[_0xc563d(0x2d3)](_0x183f24)){const _0x1446dc=this[_0xc563d(0x344)](_0x183f24),_0x19d52a=this[_0xc563d(0x321)](_0x183f24);this['addCommand'](_0x1446dc,'choice',_0x19d52a,_0x369a8a);}_0x369a8a++;}},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x176)]=function(){const _0x13112d=_0x427ba4,_0x8cd7f1=$gameMessage['choices'](),_0x1600fa=$gameMessage[_0x13112d(0x310)](),_0x2b648d=$gameMessage[_0x13112d(0x309)](),_0xa8c1f5=_0x8cd7f1['length'];let _0x363c6b=0x0;for(let _0x366845=0x0;_0x366845<_0xa8c1f5;_0x366845++){if(this[_0x13112d(0x4c4)][_0x13112d(0x429)]>=_0x2b648d)break;const _0x3b1cd6=_0x1600fa[_0x366845];let _0xff6e2=_0x8cd7f1[_0x3b1cd6];if(_0xff6e2===undefined)continue;_0xff6e2=this['convertChoiceMacros'](_0xff6e2);if(this[_0x13112d(0x2d3)](_0xff6e2)){const _0x16223f=this[_0x13112d(0x344)](_0xff6e2),_0x12720d=this['isChoiceEnabled'](_0xff6e2);this['addCommand'](_0x16223f,_0x13112d(0x3d2),_0x12720d,_0x3b1cd6);}_0x363c6b++;}},Window_ChoiceList['prototype'][_0x427ba4(0x279)]=function(_0x4ddbcd){const _0x5ce994=_0x427ba4;return Window_Base['prototype'][_0x5ce994(0x116)]['call'](this,_0x4ddbcd);},Window_ChoiceList[_0x427ba4(0x357)]['isChoiceVisible']=function(_0x60114c){const _0x1514c0=_0x427ba4;if(Imported[_0x1514c0(0x32c)])$gameMessage[_0x1514c0(0x298)]();if(_0x60114c[_0x1514c0(0x339)](/<HIDE>/i))return![];if(_0x60114c['match'](/<SHOW>/i))return!![];if(_0x60114c[_0x1514c0(0x339)](/<SHOW[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0xe3badf=RegExp['$1']['split'](',')[_0x1514c0(0x461)](_0x550a9c=>Number(_0x550a9c)||0x0);if(_0xe3badf['some'](_0x503841=>!$gameSwitches[_0x1514c0(0x326)](_0x503841)))return![];}if(_0x60114c['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0xaeac1b=RegExp['$1']['split'](',')['map'](_0x591d44=>Number(_0x591d44)||0x0);if(_0xaeac1b[_0x1514c0(0x260)](_0x28b3c9=>!$gameSwitches['value'](_0x28b3c9)))return![];}if(_0x60114c[_0x1514c0(0x339)](/<HIDE[ ](?:|ALL )(?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x3672c9=RegExp['$1'][_0x1514c0(0x224)](',')['map'](_0x24ded6=>Number(_0x24ded6)||0x0);if(_0x3672c9['every'](_0x1b867d=>$gameSwitches['value'](_0x1b867d)))return![];}if(_0x60114c[_0x1514c0(0x339)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x46c68d=RegExp['$1']['split'](',')['map'](_0x4aba90=>Number(_0x4aba90)||0x0);if(_0x46c68d['some'](_0x32620f=>$gameSwitches[_0x1514c0(0x326)](_0x32620f)))return![];}return!![];},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x344)]=function(_0x25ef82){const _0x2f785d=_0x427ba4;let _0x13e592=_0x25ef82;return _0x13e592=_0x13e592[_0x2f785d(0x1b7)](/<(?:BR|LINEBREAK)>/gi,'\x0a'),_0x13e592=_0x13e592[_0x2f785d(0x1b7)](/<LINE\x1bWrapBreak[0]BREAK>/gi,'\x0a'),_0x13e592;},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x321)]=function(_0xc7b28e){const _0x38b873=_0x427ba4;if(Imported[_0x38b873(0x32c)])$gameMessage[_0x38b873(0x298)]();if(_0xc7b28e[_0x38b873(0x339)](/<DISABLE>/i))return![];if(_0xc7b28e[_0x38b873(0x339)](/<ENABLE>/i))return!![];if(_0xc7b28e[_0x38b873(0x339)](/<ENABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x544620=RegExp['$1'][_0x38b873(0x224)](',')['map'](_0xc8ad7d=>Number(_0xc8ad7d)||0x0);if(_0x544620[_0x38b873(0x222)](_0x3aedba=>!$gameSwitches[_0x38b873(0x326)](_0x3aedba)))return![];}if(_0xc7b28e['match'](/<ENABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x11799c=RegExp['$1'][_0x38b873(0x224)](',')[_0x38b873(0x461)](_0x7bee0=>Number(_0x7bee0)||0x0);if(_0x11799c['every'](_0x199eef=>!$gameSwitches[_0x38b873(0x326)](_0x199eef)))return![];}if(_0xc7b28e['match'](/<DISABLE[ ](?:|ALL )(?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x21c2c4=RegExp['$1'][_0x38b873(0x224)](',')['map'](_0x28350e=>Number(_0x28350e)||0x0);if(_0x21c2c4[_0x38b873(0x260)](_0x3506e1=>$gameSwitches[_0x38b873(0x326)](_0x3506e1)))return![];}if(_0xc7b28e[_0x38b873(0x339)](/<DISABLE ANY[ ](?:SWITCH|SWITCHES):[ ](.*?)>/i)){const _0x5f364d=RegExp['$1'][_0x38b873(0x224)](',')[_0x38b873(0x461)](_0x1eb620=>Number(_0x1eb620)||0x0);if(_0x5f364d[_0x38b873(0x222)](_0x4e5412=>$gameSwitches[_0x38b873(0x326)](_0x4e5412)))return![];}return!![];},Window_ChoiceList['prototype'][_0x427ba4(0x248)]=function(){const _0x2cac9f=_0x427ba4;this[_0x2cac9f(0x299)]={},this['_helpWindow']&&(this['_helpWindow'][_0x2cac9f(0x399)](),this[_0x2cac9f(0x154)][_0x2cac9f(0x206)]());},Window_ChoiceList[_0x427ba4(0x357)]['applyChoiceHelpDescriptions']=function(){const _0x267ffb=_0x427ba4,_0x57f3e2=/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i;for(const _0x385075 of this[_0x267ffb(0x4c4)]){if(!_0x385075)continue;const _0x1858c7=this[_0x267ffb(0x4c4)][_0x267ffb(0x500)](_0x385075);if(_0x385075[_0x267ffb(0x1e8)][_0x267ffb(0x339)](_0x57f3e2)){const _0x4ee209=String(RegExp['$1']);this['_choiceHelpDescriptions'][_0x1858c7]=_0x4ee209[_0x267ffb(0x1f9)](),_0x385075[_0x267ffb(0x1e8)]=_0x385075['name'][_0x267ffb(0x1b7)](_0x57f3e2,'')[_0x267ffb(0x1f9)]();}else this['_choiceHelpDescriptions'][_0x1858c7]='';}},Window_ChoiceList['prototype'][_0x427ba4(0x271)]=function(){const _0x3c3687=_0x427ba4;if(this[_0x3c3687(0x4c4)][_0x3c3687(0x222)](_0x347ee3=>_0x347ee3[_0x3c3687(0x240)]))return;this[_0x3c3687(0x251)](),this[_0x3c3687(0x34b)](),$gameMessage['_choices']=[],this[_0x3c3687(0x350)]['isOpen']()&&this[_0x3c3687(0x350)]['startPause']();},VisuMZ['MessageCore'][_0x427ba4(0x2fc)]=Window_ChoiceList['prototype'][_0x427ba4(0x4b4)],Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x4b4)]=function(){const _0xfdb50c=_0x427ba4;VisuMZ[_0xfdb50c(0x243)][_0xfdb50c(0x2fc)][_0xfdb50c(0x488)](this),this[_0xfdb50c(0x495)](),this[_0xfdb50c(0x2a5)]();},Window_ChoiceList[_0x427ba4(0x357)]['placeCancelButton']=function(){const _0x53cc5e=_0x427ba4;if(!this[_0x53cc5e(0x1bc)])return;const _0x13f06b=0x8,_0x497fa5=this[_0x53cc5e(0x1bc)],_0xcb297d=this['x']+this[_0x53cc5e(0x4db)],_0x4af613=Math['floor']((Graphics[_0x53cc5e(0x4db)]-Graphics[_0x53cc5e(0x49b)])/0x2);_0xcb297d>=Graphics[_0x53cc5e(0x49b)]+_0x4af613-_0x497fa5['width']+_0x13f06b?_0x497fa5['x']=-_0x497fa5[_0x53cc5e(0x4db)]-_0x13f06b:_0x497fa5['x']=this['width']+_0x13f06b,_0x497fa5['y']=this['height']/0x2-_0x497fa5[_0x53cc5e(0x229)]/0x2;},VisuMZ['MessageCore'][_0x427ba4(0x33b)]=Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x290)],Window_ChoiceList['prototype'][_0x427ba4(0x290)]=function(){const _0x3ea52d=_0x427ba4;return this['_messageWindow']?this[_0x3ea52d(0x380)]():VisuMZ[_0x3ea52d(0x243)]['Window_ChoiceList_windowX'][_0x3ea52d(0x488)](this);},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x380)]=function(){const _0x2668fe=_0x427ba4,_0x356946=$gameMessage[_0x2668fe(0x387)]();if(_0x356946===0x1)return(Graphics[_0x2668fe(0x49b)]-this[_0x2668fe(0x27c)]())/0x2;else return _0x356946===0x2?this['_messageWindow']['x']+this['_messageWindow'][_0x2668fe(0x4db)]-this[_0x2668fe(0x27c)]():this[_0x2668fe(0x350)]['x'];},Window_ChoiceList[_0x427ba4(0x357)]['windowWidth']=function(){const _0x3f6850=_0x427ba4,_0x1112ad=(this['maxChoiceWidth']()+this[_0x3f6850(0x289)]())*this['maxCols']()+this[_0x3f6850(0x1dd)]*0x2;return Math[_0x3f6850(0x47e)](_0x1112ad,Graphics['width']);},Window_ChoiceList['prototype']['numVisibleRows']=function(){const _0xe8ab41=_0x427ba4,_0x5625ad=$gameMessage[_0xe8ab41(0x45f)]()[_0xe8ab41(0x461)](_0x479d34=>this[_0xe8ab41(0x279)](_0x479d34))[_0xe8ab41(0x332)](_0x37e445=>this['isChoiceVisible'](_0x37e445));let _0x5dd417=Math[_0xe8ab41(0x4b8)](_0x5625ad[_0xe8ab41(0x429)]/this[_0xe8ab41(0x358)]());if(!$gameMessage[_0xe8ab41(0x1ab)]){const _0x4d231d=$gameMessage[_0xe8ab41(0x309)]();_0x5dd417=Math[_0xe8ab41(0x4b8)](Math['min'](_0x4d231d,_0x5625ad[_0xe8ab41(0x429)])/this[_0xe8ab41(0x358)]());}return Math[_0xe8ab41(0x2cb)](0x1,Math['min'](_0x5dd417,this[_0xe8ab41(0x3b5)]()));},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x3b5)]=function(){const _0x173955=_0x427ba4,_0x3413bf=this[_0x173955(0x350)],_0x1dcad0=_0x3413bf?_0x3413bf['y']:0x0,_0x2c9219=_0x3413bf?_0x3413bf[_0x173955(0x229)]:0x0,_0x26d7ed=Graphics[_0x173955(0x234)]/0x2;return _0x1dcad0<_0x26d7ed&&_0x1dcad0+_0x2c9219>_0x26d7ed?0x4:$gameSystem['getChoiceListMaxRows']();},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x1c4)]=function(){const _0x3fe08a=_0x427ba4;let _0x228a46=this[_0x3fe08a(0x18d)]();for(const _0x9a83a2 of this[_0x3fe08a(0x4c4)]){const _0xf7d1d3=_0x9a83a2[_0x3fe08a(0x1e8)],_0x430ed9=this[_0x3fe08a(0x1d4)](_0xf7d1d3),_0x3f0c3e=this[_0x3fe08a(0x157)](_0xf7d1d3)[_0x3fe08a(0x4db)]+_0x430ed9,_0x2e464e=Math[_0x3fe08a(0x4b8)](_0x3f0c3e)+this[_0x3fe08a(0x123)]()*0x2;_0x228a46=Math['max'](_0x228a46,_0x2e464e);}return _0x228a46;},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x18d)]=function(){const _0x270f39=_0x427ba4;let _0x3eedc3=$gameSystem[_0x270f39(0x438)]();const _0x41f451=$gameMessage['choices']();for(const _0x2932b2 of _0x41f451){_0x2932b2[_0x270f39(0x339)](/<CHOICE WIDTH:[ ](\d+)>/gi)&&(_0x3eedc3=Math[_0x270f39(0x2cb)](_0x3eedc3,Number(RegExp['$1'])));}return Math[_0x270f39(0x2cb)](_0x3eedc3,0x1);},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x495)]=function(){const _0x4c51ae=_0x427ba4,_0x282ad9=$gameSystem['getChoiceMessageDistance']()||0x0,_0x17062=this[_0x4c51ae(0x350)]['y'],_0x1ee191=this[_0x4c51ae(0x350)][_0x4c51ae(0x229)],_0x5ed16c=this[_0x4c51ae(0x350)]['_nameBoxWindow'],_0x55f673=_0x5ed16c[_0x4c51ae(0x314)]>0x0&&_0x5ed16c['width']>0x0,_0x5bcec8=_0x55f673?_0x5ed16c[_0x4c51ae(0x229)]:0x0;if(_0x282ad9<0x0&&(this[_0x4c51ae(0x350)][_0x4c51ae(0x218)]()||this['_messageWindow'][_0x4c51ae(0x242)]()))this['y']=Math[_0x4c51ae(0x261)]((Graphics[_0x4c51ae(0x234)]-this['height'])/0x2);else{if(_0x17062>=Graphics[_0x4c51ae(0x234)]/0x2)_0x282ad9>=0x0?this['y']-=_0x282ad9:this['y']=Math[_0x4c51ae(0x38f)]((_0x17062-this[_0x4c51ae(0x229)]-_0x5bcec8)/0x2);else{if(_0x282ad9>=0x0)this['y']+=_0x282ad9;else{const _0x345a40=Graphics[_0x4c51ae(0x234)]-(_0x17062+_0x1ee191+_0x5bcec8);this['y']+=Math[_0x4c51ae(0x38f)]((_0x345a40-this[_0x4c51ae(0x229)])/0x2)+_0x5bcec8;}}}},Window_ChoiceList['prototype'][_0x427ba4(0x300)]=function(_0x317344){const _0x443ee8=_0x427ba4,_0xcb0195=this[_0x443ee8(0x257)](_0x317344);if(_0xcb0195){const _0x2606e7=ImageManager['loadPicture'](_0xcb0195),_0x41082c=this['choiceAlignText'](),_0x4cbe0c=_0x41082c+this[_0x443ee8(0x475)](_0x317344),_0x343798=this[_0x443ee8(0x269)](_0x317344);_0x2606e7[_0x443ee8(0x337)](this['drawChoiceLocationImage'][_0x443ee8(0x4cb)](this,_0x317344,!![],_0x4cbe0c,_0x343798,_0x2606e7));return;}this[_0x443ee8(0x199)](_0x317344);},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x199)]=function(_0x41edbb){const _0x597ca8=_0x427ba4,_0x10b37d=this[_0x597ca8(0x269)](_0x41edbb),_0x311cde=this['choiceAlignText'](),_0xbafc95=_0x311cde+this[_0x597ca8(0x475)](_0x41edbb);this['changePaintOpacity'](this['isCommandEnabled'](_0x41edbb));const _0x4a014d=this[_0x597ca8(0x157)](_0xbafc95)[_0x597ca8(0x229)],_0x135f37=_0x10b37d['x']+this[_0x597ca8(0x1d4)](_0xbafc95),_0x38ebba=Math[_0x597ca8(0x2cb)](_0x10b37d['y'],_0x10b37d['y']+Math[_0x597ca8(0x261)]((_0x10b37d[_0x597ca8(0x229)]-_0x4a014d)/0x2));this[_0x597ca8(0x149)](_0xbafc95,_0x135f37,_0x38ebba,_0x10b37d[_0x597ca8(0x4db)]),this[_0x597ca8(0x1a5)](_0x41edbb),this['requestChoiceBackgroundImage'](_0x41edbb,_0xbafc95,_0x10b37d);},Window_ChoiceList['prototype'][_0x427ba4(0x47d)]=function(){const _0x5d4ba8=_0x427ba4;return $gameSystem[_0x5d4ba8(0x12b)]()!=='default'?_0x5d4ba8(0x1b8)[_0x5d4ba8(0x230)]($gameSystem['getChoiceListTextAlign']()):'';},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x1d4)]=function(_0x4202a1){let _0x56ab9b=0x0;return _0x4202a1['match'](/<(?:CHOICE|CHOICE |)INDENT:[ ](\d+)>/gi)&&(_0x56ab9b=Number(RegExp['$1'])),_0x56ab9b;},Window_ChoiceList[_0x427ba4(0x357)][_0x427ba4(0x1a5)]=function(_0x26a07b){const _0x25c681=_0x427ba4;if(!Imported['VisuMZ_0_CoreEngine'])return;const _0x81a189=this[_0x25c681(0x475)](_0x26a07b);let _0x316056=![],_0x486c70=![],_0x460f07=ColorManager['itemBackColor1'](),_0x3d026e=ColorManager[_0x25c681(0x486)]();if(_0x81a189[_0x25c681(0x339)](/<(?:BGCOLOR|BG COLOR):[ ](.*?),(.*?)>/gi))_0x460f07=ColorManager[_0x25c681(0x25d)](RegExp['$1'])[_0x25c681(0x1f9)](),_0x3d026e=ColorManager[_0x25c681(0x25d)](RegExp['$2'])[_0x25c681(0x1f9)](),_0x316056=!![];else{if(_0x81a189[_0x25c681(0x339)](/<(?:BGCOLOR|BG COLOR):[ ](.*?)>/gi)){let _0x268ba8=String(RegExp['$1'])[_0x25c681(0x21f)]()[_0x25c681(0x1f9)]();switch(_0x268ba8){case _0x25c681(0x3c4):_0x460f07=_0x3d026e=_0x25c681(0x416),_0x486c70=!![];break;case _0x25c681(0x3c9):_0x460f07=_0x3d026e=_0x25c681(0x27d),_0x486c70=!![];break;case _0x25c681(0x334):_0x460f07=_0x3d026e=_0x25c681(0x4fb),_0x486c70=!![];break;case _0x25c681(0x207):_0x460f07=_0x3d026e=_0x25c681(0x44d),_0x486c70=!![];break;case'blue':_0x460f07=_0x3d026e='#6dcff6',_0x486c70=!![];break;case'purple':case _0x25c681(0x2c6):_0x460f07=_0x3d026e=_0x25c681(0x2c5),_0x486c70=!![];break;case _0x25c681(0x3e6):_0x460f07=_0x3d026e=_0x25c681(0x2d5),_0x486c70=!![];break;case _0x25c681(0x477):_0x460f07=_0x3d026e=_0x25c681(0x41d),_0x486c70=!![];break;case _0x25c681(0x32d):_0x460f07=_0x3d026e='#ffffff',_0x486c70=!![];break;case _0x25c681(0x19d):case _0x25c681(0x21c):_0x460f07=_0x3d026e='#acacac',_0x486c70=!![];break;case _0x25c681(0x371):_0x460f07=_0x3d026e='#707070',_0x486c70=!![];break;case _0x25c681(0x42e):_0x460f07=_0x3d026e=ColorManager['powerUpColor'](),_0x486c70=!![];break;case'no':_0x460f07=_0x3d026e=ColorManager[_0x25c681(0x487)](),_0x486c70=!![];break;case _0x25c681(0x195):_0x460f07=_0x3d026e=ColorManager[_0x25c681(0x4e2)](),_0x486c70=!![];break;case _0x25c681(0x462):_0x460f07=_0x3d026e=ColorManager[_0x25c681(0x4c6)](),_0x486c70=!![];break;default:_0x460f07=_0x3d026e=ColorManager[_0x25c681(0x25d)](_0x268ba8),_0x486c70=!![];break;}_0x316056=!![];}}if(!_0x316056)return;const _0x175e27=this['itemRect'](_0x26a07b);this[_0x25c681(0x42d)]['clearRect'](_0x175e27['x'],_0x175e27['y'],_0x175e27[_0x25c681(0x4db)],_0x175e27[_0x25c681(0x229)]),this[_0x25c681(0x34c)](_0x175e27,_0x460f07,_0x3d026e,_0x486c70);},Window_ChoiceList['prototype']['drawCustomBackgroundColor']=function(_0x28e81f,_0x3793a7,_0x582f8b,_0x518c4d){const _0x4ec091=_0x427ba4,_0x4ade5b=ColorManager[_0x4ec091(0x253)](),_0x3c5ea4=ColorManager[_0x4ec091(0x360)](),_0x1f4fec=_0x3793a7??ColorManager[_0x4ec091(0x253)](),_0x2686d5=_0x582f8b??_0x3793a7,_0x5d98fc=_0x28e81f['x'],_0x1cdd6a=_0x28e81f['y'],_0x561cf5=_0x28e81f['width'],_0x5e2782=_0x28e81f[_0x4ec091(0x229)];this[_0x4ec091(0x42d)]['gradientFillRect'](_0x5d98fc,_0x1cdd6a,_0x561cf5,_0x5e2782,_0x1f4fec,_0x2686d5,!![]),_0x518c4d&&this[_0x4ec091(0x42d)][_0x4ec091(0x356)](_0x5d98fc,_0x1cdd6a,_0x561cf5,_0x5e2782,_0x4ade5b,_0x2686d5,!![]),this[_0x4ec091(0x42d)][_0x4ec091(0x413)](_0x5d98fc,_0x1cdd6a,_0x561cf5,_0x5e2782,_0x4ade5b);},Window_ChoiceList['prototype'][_0x427ba4(0x257)]=function(_0x381b40){const _0x299144=_0x427ba4,_0xe0e233=this[_0x299144(0x47d)](),_0x5eca74=_0xe0e233+this[_0x299144(0x475)](_0x381b40);let _0x71208c='';if(_0x5eca74[_0x299144(0x339)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x71208c=String(RegExp['$1'])[_0x299144(0x1f9)]();else _0x5eca74[_0x299144(0x339)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x71208c=String(RegExp['$2'])['trim']());return _0x71208c;},Window_ChoiceList['prototype'][_0x427ba4(0x141)]=function(_0x4610d5,_0x592642,_0x2019f2){const _0x2fcca6=_0x427ba4;let _0x2a35ed='';if(_0x592642[_0x2fcca6(0x339)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i))_0x2a35ed=String(RegExp['$1'])[_0x2fcca6(0x1f9)]();else _0x592642['match'](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x2a35ed=String(RegExp['$2'])[_0x2fcca6(0x1f9)]());if(_0x2a35ed){const _0x95a1b4=ImageManager[_0x2fcca6(0x1cb)](_0x2a35ed);_0x95a1b4[_0x2fcca6(0x337)](this[_0x2fcca6(0x414)][_0x2fcca6(0x4cb)](this,_0x4610d5,![],_0x592642,_0x2019f2,_0x95a1b4));}},Window_ChoiceList['prototype']['drawChoiceLocationImage']=function(_0x5f4e21,_0x35d6a0,_0x25a8dc,_0x5b4212,_0x42803b){const _0x3810a0=_0x427ba4,_0x5aa57e=this[_0x3810a0(0x47d)](),_0x2c459f=_0x5aa57e+this[_0x3810a0(0x475)](_0x5f4e21);if(_0x25a8dc!==_0x2c459f)return;const _0x25a665=this[_0x3810a0(0x269)](_0x5f4e21);if(['x','y','width',_0x3810a0(0x229)]['some'](_0x341e3e=>_0x25a665[_0x341e3e]!==_0x5b4212[_0x341e3e]))return;let _0x54c005=0x0,_0x2fcedc='';if(_0x35d6a0&&_0x2c459f[_0x3810a0(0x339)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE):[ ](.*?)>/i)){}else{if(_0x35d6a0&&_0x2c459f[_0x3810a0(0x339)](/<FG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i))_0x2fcedc=String(RegExp['$1'])[_0x3810a0(0x21f)]()[_0x3810a0(0x1f9)]();else!_0x35d6a0&&_0x2c459f[_0x3810a0(0x339)](/<BG(?:| )(?:IMG|IMAGE|PIC|PICTURE)[ ]*(.*?):[ ](.*?)>/i)&&(_0x2fcedc=String(RegExp['$1'])[_0x3810a0(0x21f)]()[_0x3810a0(0x1f9)]());}switch(_0x2fcedc){case _0x3810a0(0x168):case'lower-left':case _0x3810a0(0x2fd):case'downleft':case _0x3810a0(0x1ea):case _0x3810a0(0x45d):case'1':_0x54c005=0x1;break;case'lowercenter':case _0x3810a0(0x221):case _0x3810a0(0x42c):case _0x3810a0(0x264):case _0x3810a0(0x37f):case'down\x20center':case _0x3810a0(0x2b1):case'2':_0x54c005=0x2;break;case _0x3810a0(0x17e):case _0x3810a0(0x1bd):case _0x3810a0(0x474):case _0x3810a0(0x370):case'down-right':case'down\x20right':case'3':_0x54c005=0x3;break;case _0x3810a0(0x393):case _0x3810a0(0x128):case _0x3810a0(0x13e):case'4':_0x54c005=0x4;break;case _0x3810a0(0x352):case _0x3810a0(0x3c7):case _0x3810a0(0x2f2):case'centered':case'5':_0x54c005=0x5;break;case _0x3810a0(0x415):case _0x3810a0(0x18e):case'right':case'6':_0x54c005=0x6;break;case _0x3810a0(0x493):case _0x3810a0(0x226):case'upper\x20left':case _0x3810a0(0x3da):case _0x3810a0(0x19f):case _0x3810a0(0x1f0):case'7':_0x54c005=0x7;break;case _0x3810a0(0x190):case _0x3810a0(0x26a):case _0x3810a0(0x3b0):case _0x3810a0(0x4d8):case _0x3810a0(0x18c):case _0x3810a0(0x445):case'up':case'8':_0x54c005=0x8;break;case _0x3810a0(0x423):case _0x3810a0(0x4b2):case _0x3810a0(0x232):case'upright':case'up-right':case _0x3810a0(0x1a1):case'9':_0x54c005=0x9;break;}const _0x5c9a4c=_0x35d6a0?this[_0x3810a0(0x19c)]:this[_0x3810a0(0x42d)],_0xc45198=this['itemRect'](_0x5f4e21);!_0x35d6a0&&_0x5c9a4c[_0x3810a0(0x184)](_0xc45198['x']-0x1,_0xc45198['y']-0x1,_0xc45198['width']+0x2,_0xc45198[_0x3810a0(0x229)]+0x2);const _0x30f55f=_0xc45198['x']+0x2,_0x46b842=_0xc45198['y']+0x2,_0x1b1433=_0xc45198['width']-0x4,_0x44f761=_0xc45198['height']-0x4,_0x23b342=_0x42803b[_0x3810a0(0x4db)],_0x99afca=_0x42803b['height'];let _0xc01849=_0x30f55f,_0x2c01b9=_0x46b842,_0x1095e2=_0x1b1433,_0x498b52=_0x44f761;const _0x5a2d05=_0x1b1433/_0x23b342,_0x9dc208=_0x44f761/_0x99afca;let _0x12566f=Math[_0x3810a0(0x47e)](_0x5a2d05,_0x9dc208);if(_0x35d6a0)_0x12566f=Math[_0x3810a0(0x47e)](_0x12566f,0x1);_0x54c005!==0x0&&(_0x1095e2=Math['round'](_0x23b342*_0x12566f),_0x498b52=Math['round'](_0x99afca*_0x12566f));switch(_0x54c005){case 0x1:case 0x4:case 0x7:_0xc01849=_0x30f55f;break;case 0x2:case 0x5:case 0x8:_0xc01849+=Math[_0x3810a0(0x261)]((_0x1b1433-_0x1095e2)/0x2);break;case 0x3:case 0x6:case 0x9:_0xc01849+=_0x1b1433-_0x1095e2;break;}switch(_0x54c005){case 0x7:case 0x8:case 0x9:_0x2c01b9=_0x46b842;break;case 0x4:case 0x5:case 0x6:_0x2c01b9+=Math[_0x3810a0(0x261)]((_0x44f761-_0x498b52)/0x2);break;case 0x1:case 0x2:case 0x3:_0x2c01b9+=_0x44f761-_0x498b52;break;}_0x5c9a4c[_0x3810a0(0x1b9)](_0x42803b,0x0,0x0,_0x23b342,_0x99afca,_0xc01849,_0x2c01b9,_0x1095e2,_0x498b52),_0x35d6a0&&this['drawItemContents'](_0x5f4e21);},Window_ChoiceList['prototype'][_0x427ba4(0x244)]=function(){const _0x287450=_0x427ba4;this['_helpWindow'][_0x287450(0x399)]();if(!this['_choiceHelpDescriptions'])return;const _0x4c1c28=this[_0x287450(0x1db)]();this[_0x287450(0x299)][_0x4c1c28]?(this[_0x287450(0x154)][_0x287450(0x192)](this[_0x287450(0x299)][_0x4c1c28]),this[_0x287450(0x154)][_0x287450(0x125)]()):(this[_0x287450(0x154)][_0x287450(0x399)](),this['_helpWindow']['hide']());},Window_EventItem[_0x427ba4(0x357)][_0x427ba4(0x1de)]=function(){const _0x3806c0=_0x427ba4,_0x550fa1=$gameMessage['itemChoiceItypeId']();_0x550fa1==='skill'&&Imported[_0x3806c0(0x259)]?this[_0x3806c0(0x23a)]():Window_ItemList[_0x3806c0(0x357)]['makeItemList'][_0x3806c0(0x488)](this);},Window_EventItem[_0x427ba4(0x357)][_0x427ba4(0x23a)]=function(){const _0x4cfe0a=_0x427ba4,_0x2fbfa4=$gameMessage['itemChoiceActor']();this['_data']=_0x2fbfa4?_0x2fbfa4['skills']()['filter'](_0x424b8d=>this[_0x4cfe0a(0x4e5)](_0x424b8d)):[],this[_0x4cfe0a(0x4e5)](null)&&this['_data'][_0x4cfe0a(0x329)](null);},VisuMZ[_0x427ba4(0x243)][_0x427ba4(0x237)]=Window_EventItem[_0x427ba4(0x357)][_0x427ba4(0x4e5)],Window_EventItem[_0x427ba4(0x357)]['includes']=function(_0x4ec1ad){const _0x611b98=_0x427ba4,_0x1d8c4f=$gameMessage[_0x611b98(0x4f5)]();if(_0x1d8c4f===_0x611b98(0x35c)){if(!DataManager['isWeapon'](_0x4ec1ad))return![];const _0x1adc75=$gameMessage[_0x611b98(0x113)]();if(_0x1adc75>0x0){if(_0x4ec1ad[_0x611b98(0x241)]!==_0x1adc75)return![];}return!![];}else{if(_0x1d8c4f===_0x611b98(0x426)){if(!DataManager[_0x611b98(0x150)](_0x4ec1ad))return![];const _0x51f137=$gameMessage['itemChoiceAtypeId']();if(_0x51f137>0x0){if(_0x4ec1ad[_0x611b98(0x26c)]!==_0x51f137)return![];}const _0x2b6552=$gameMessage['itemChoiceEtypeId']();if(_0x2b6552>0x0){if(_0x4ec1ad[_0x611b98(0x33a)]!==_0x2b6552)return![];}return!![];}else{if(_0x1d8c4f==='skill'){if(!DataManager['isSkill'](_0x4ec1ad))return![];const _0x4c5582=$gameMessage[_0x611b98(0x1c0)]();if(_0x4c5582[_0x611b98(0x23c)](_0x4ec1ad))return![];if(!_0x4c5582['isSkillTypeMatchForUse'](_0x4ec1ad))return![];const _0x17c10f=$gameMessage['itemChoiceStypeId']();if(_0x17c10f>0x0){const _0x3a731a=DataManager[_0x611b98(0x17a)](_0x4ec1ad);if(!_0x3a731a[_0x611b98(0x4e5)](_0x17c10f))return![];}return!![];}else return VisuMZ[_0x611b98(0x243)][_0x611b98(0x237)][_0x611b98(0x488)](this,_0x4ec1ad);}}},VisuMZ[_0x427ba4(0x243)]['Window_ItemList_drawItemNumber']=Window_ItemList[_0x427ba4(0x357)]['drawItemNumber'],Window_ItemList[_0x427ba4(0x357)][_0x427ba4(0x235)]=function(_0x4775ea,_0x59d494,_0x433b2b,_0x47c4b4){const _0x2e3587=_0x427ba4,_0x36aa06=$gameMessage['itemChoiceItypeId']();if(_0x36aa06===_0x2e3587(0x167)){const _0x28225b=$gameMessage['itemChoiceActor']();this[_0x2e3587(0x402)](_0x28225b,_0x4775ea,_0x59d494,_0x433b2b,_0x47c4b4);}else VisuMZ[_0x2e3587(0x243)][_0x2e3587(0x395)][_0x2e3587(0x488)](this,_0x4775ea,_0x59d494,_0x433b2b,_0x47c4b4);},Window_MapName[_0x427ba4(0x357)][_0x427ba4(0x2e1)]=function(){const _0x14533a=_0x427ba4;this['contents'][_0x14533a(0x399)]();let _0x3e4fae=$gameMap[_0x14533a(0x208)]();if(_0x3e4fae){const _0x19f547=this['innerWidth'];this[_0x14533a(0x4ce)](0x0,0x0,_0x19f547,this['lineHeight']()),_0x3e4fae=this['realignMapName'](_0x3e4fae);const _0x4cd9db=this['textSizeEx'](_0x3e4fae)[_0x14533a(0x4db)];this[_0x14533a(0x149)](_0x3e4fae,Math['floor']((_0x19f547-_0x4cd9db)/0x2),0x0);}},Window_MapName['prototype'][_0x427ba4(0x3ac)]=function(_0x32d013){const _0x3683b3=_0x427ba4;if(_0x32d013[_0x3683b3(0x339)](/<LEFT>/gi))this['x']=0x0;else{if(_0x32d013[_0x3683b3(0x339)](/<CENTER>/gi))this['x']=Math[_0x3683b3(0x38f)]((Graphics[_0x3683b3(0x49b)]-this['width'])/0x2);else _0x32d013[_0x3683b3(0x339)](/<RIGHT>/gi)&&(this['x']=Graphics['boxWidth']-this[_0x3683b3(0x4db)]);}_0x32d013=_0x32d013[_0x3683b3(0x1b7)](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x32d013=_0x32d013['replace'](/<\/(?:LEFT|CENTER|RIGHT)>/gi,'');if(_0x32d013[_0x3683b3(0x339)](/<TOP>/gi))this['y']=0x0;else{if(_0x32d013[_0x3683b3(0x339)](/<MIDDLE>/gi))this['y']=Math[_0x3683b3(0x38f)]((Graphics[_0x3683b3(0x234)]-this[_0x3683b3(0x229)])/0x2);else _0x32d013[_0x3683b3(0x339)](/<BOTTOM>/gi)&&(this['y']=Graphics['boxHeight']-this[_0x3683b3(0x229)]);}return _0x32d013=_0x32d013[_0x3683b3(0x1b7)](/<(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x32d013=_0x32d013[_0x3683b3(0x1b7)](/<\/(?:TOP|MIDDLE|BOTTOM)>/gi,''),_0x32d013[_0x3683b3(0x339)](/<X:[ ]([\+\-]\d+)>/gi)&&(this['x']+=Number(RegExp['$1']),_0x32d013=_0x32d013['replace'](/<X:[ ]([\+\-]\d+)>/gi,'')),_0x32d013[_0x3683b3(0x339)](/<Y:[ ]([\+\-]\d+)>/gi)&&(this['y']+=Number(RegExp['$1']),_0x32d013=_0x32d013[_0x3683b3(0x1b7)](/<Y:[ ]([\+\-]\d+)>/gi,'')),_0x32d013;};