# VisuMZ_4_WeaknessPopups

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_4_WeaknessPopups`
- Contract: [RPG Maker MZ] [Tier 4] [WeaknessPopups]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| WeaknessPopups | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| Critical | — | — | — | — | — | — |
| Critical:struct | Critical Popup Settings | Critical | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"CRITICAL!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ec008c","outlineSize:num":"5","outlineColor:str":"rgba(255, 255, 255, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"-25","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Critical Popup! |
| CritStackOffsetX:num | Stack Offset X | Critical:struct | — | +48 | — | Offsets the popup x position if stacked with a weakness. Negative: left. Positive: right. |
| CritStackOffsetY:num | Stack Offset Y | Critical:struct | — | -48 | — | Offsets the popup y position if stacked with a weakness. Negative: up. Positive: down. |
| Element | Element Rates | — | — | — | — | — |
| Element200:struct | Rate &gt;= 200% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at least 200%! |
| Element175:struct | Rate &gt;= 175% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at least 150%! |
| Element150:struct | Rate &gt;= 150% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at least 150%! |
| Element125:struct | Rate &gt;= 125% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at least 125%! |
| Element110:struct | Rate &gt;= 110% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at least 110%! |
| Element105:struct | Rate &gt;= 105% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"WEAKNESS!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#ed1c24","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at least 105%! |
| Element101:struct | Rate &gt;= 101% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at least 105%! |
| Element99:struct | Rate &lt;= 99% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"false","Image":"","filename:str":"","Render":"","text:str":"DISABLED","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"2","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.10","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at most 95%! |
| Element95:struct | Rate &lt;= 95% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"38","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at most 95%! |
| Element90:struct | Rate &lt;= 90% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"40","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at most 90%! |
| Element75:struct | Rate &lt;= 75% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"42","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at most 75%! |
| Element50:struct | Rate &lt;= 50% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"44","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at most 50%! |
| Element25:struct | Rate &lt;= 25% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"RESIST!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"46","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#82ca9c","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is at most 25%! |
| Element0:struct | Rate = 0% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"IMMUNE!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#6dcff6","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is exactly 0%! |
| ElementNegative:struct | Rate &lt; 0% | Element | struct&lt;Popup&gt; | {"General":"","enabled:eval":"true","Image":"","filename:str":"","Render":"","text:str":"ABSORB!","bitmapWidth:num":"600","bitmapHeight:num":"200","fontFace:str":"Impact","fontSize:num":"48","fontBold:eval":"true","fontItalic:eval":"false","textColor:str":"#bd8cbf","outlineSize:num":"5","outlineColor:str":"rgba(0, 0, 0, 1.0)","Offset":"","offsetX:num":"0","offsetY:num":"0","Scale":"","scaleDuration:num":"20","startScaleX:num":"2.0","startScaleY:num":"2.0","targetScaleX:num":"1.0","targetScaleY:num":"1.0","Acceleration":"","startSpeedX:num":"0","startSpeedY:num":"0","deltaSpeedX:num":"-0.05","deltaSpeedY:num":"0","Fading":"","opaqueDuration:num":"40","fadeDuration:num":"20"} | — | Settings for the Popup when Element Rate is under 0%! |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: Popup

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| enabled:eval | Enabled | General | boolean | true | — | Is this popup enabled? |
| Image | Custom Image | — | — | — | — | — |
| filename:str | Filename | Image | file | — | — | Select an image from img/system/ to use as a custom image popup. If you use this, ignore the Render settings. |
| AnimationID:num | Animation ID | Animation | animation | 0 | — | Play this animation when weakness effect activates. Requires VisuMZ_0_CoreEngine. |
| AniMirror:eval | Mirror Animation | AnimationID:num | boolean | false | — | Mirror the weakness effect animation? Requires VisuMZ_0_CoreEngine. |
| AniMute:eval | Mute Animation | AnimationID:num | boolean | false | — | Mute the weakness effect animation? Requires VisuMZ_0_CoreEngine. |
| Render | — | — | — | — | — | — |
| text:str | Text | Render | — | Text! | — | Type in the text you want displayed for the popup. |
| bitmapWidth:num | Bitmap Width | Render | number | 600 | — | What is the maximum width of this popup? |
| bitmapHeight:num | Bitmap Height | Render | number | 200 | — | What is the maximum height of this popup? |
| fontFace:str | Font Name | Render | — | Impact | — | What font do you wish to use for this popup? |
| fontSize:num | Font Size | fontFace:str | number | 48 | — | What's the font size to use for the popup text? |
| fontBold:eval | Bold? | fontFace:str | boolean | true | — | Do you wish to make the text bold? |
| fontItalic:eval | Italic? | fontFace:str | boolean | false | — | Do you wish to make the text italic? |
| textColor:str | Text Color | Render | — | 2 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| outlineSize:num | Outline Size | Render | number | 5 | — | What size do you want to use for the outline? |
| outlineColor:str | Outline Color | outlineSize:num | — | rgba(0, 0, 0, 1) | — | Colors with a bit of alpha settings. Format rgba(0-255, 0-255, 0-255, 0-1) |
| Offset | — | — | — | — | — | — |
| offsetX:num | Offset: X | Offset | — | 0 | — | How much do you wish to offset the X position by? |
| offsetXvariance:num | Variance | offsetX:num | number | 0 | — | How much variance should be given to offset X? |
| offsetY:num | Offset: Y | Offset | — | 0 | — | How much do you wish to offset the Y position by? |
| offsetYvariance:num | Variance | offsetY:num | number | 0 | — | How much variance should be given to offset Y? |
| Scale | — | — | — | — | — | — |
| scaleDuration:num | Duration | Scale | number | 20 | — | How many frames should it take the scaling to reach the target scale? |
| startScaleX:num | Starting Scale: X | Scale | — | 2.0 | — | What scale X value should the popup start at? |
| startScaleY:num | Starting Scale: Y | Scale | — | 2.0 | — | What scale Y value should the popup start at? |
| targetScaleX:num | Target Scale: X | Scale | — | 1.0 | — | What scale X value should the popup end at? |
| targetScaleY:num | Target Scale: Y | Scale | — | 1.0 | — | What scale Y value should the popup end at? |
| Acceleration | — | — | — | — | — | — |
| startSpeedX:num | Starting Speed: X | Acceleration | — | 0 | — | How much should the starting X speed of the popup be? Negative: Left, Positive: Right |
| startSpeedY:num | Starting Speed: Y | Acceleration | — | 0 | — | How much should the starting Y speed of the popup be? Negative: Up, Positive: Down |
| deltaSpeedX:num | Delta Speed: X | Acceleration | — | -0.10 | — | How much should the growing X speed of the popup be? Negative: Left, Positive: Right |
| deltaSpeedY:num | Delta Speed: Y | Acceleration | — | 0 | — | How much should the growing Y speed of the popup be? Negative: Up, Positive: Down |
| Fading | — | — | — | — | — | — |
| opaqueDuration:num | Opaque Duration | Fading | number | 40 | — | How many frames should the popup stay opaque? |
| fadeDuration:num | Fade Duration | Fading | number | 20 | — | After the opaque duration wears off, how many frames will it take for the popup to vanish? |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

When striking enemies with elemental attacks, it's difficult for the player
to know at first glance if he or she has hit a weakness or resistance,
especially if they are unfamiliar with how much damage the enemy should take
normally. This plugin creates popups that appear upon being hit at various
elemental rates, from 200% to 101% for Weaknesses, 99% to 1% for resistance,
0% for immunity, and under that for absorption.

Critical hits also gain an extra popup effect to indicate landing a critical
hit in case they've missed the extra flash that comes with one by default.
This plugin helps relay information to the player in a more visible form.

Features include all (but not limited to) the following:

* Create popups that appear in battle whenever battlers take elemental
damage that results in weaknesses, resistances, immunities, or absorption.
* Critical hits will also generate popups.
* Popups can use images or generate bitmap text on the spot.
* Move the popups through various means like scaling and acceleration.
* Elemental rates can generate different popups depending on the rate.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 4 ------

This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Extra Features

There are some extra features found if other VisuStella MZ plugins are found
present in the Plugin Manager list.

---

VisuMZ_1_BattleCore

If you decide to use front view with the VisuStella MZ Battle Core, Weakness
Popups will show up for actors above the Battle Status Window. Normally,
they would not appear in front view without the Battle Core because normal
damage popups don't appear there either.

---

Plugin Parameters: Popup Settings

Popups are created from a similar template. These are used for Critical Hits
and Elemental Rates. The Critical Hit popups will only appear once critical
hits are applied in battle. Elemental Rate popups will only appear once
certain damage thresholds are met through the element rate calculations.

---

General

Enabled:
- Is this popup enabled?

Stack Offset X:
- Offsets the popup x position if stacked with a weakness.
- Negative: left. Positive: right.
- For Critical Hit Popups ONLY!

Stack Offset Y:
- Offsets the popup y position if stacked with a weakness.
- Negative: up. Positive: down.
- For Critical Hit Popups ONLY!

---

Custom Image

Filename:
- Select an image from img/system/ to use as a custom image popup.
- If you use this, ignore the Render settings.

---

Custom Animation

Animation ID:
- Play this animation when weakness effect activates.
- Requires VisuMZ_0_CoreEngine.

Mirror Animation:
- Mirror the weakness effect animation?
- Requires VisuMZ_0_CoreEngine.

Mute Animation:
- Mute the weakness effect animation?
- Requires VisuMZ_0_CoreEngine.

---

Render

Text:
- Type in the text you want displayed for the popup.

Bitmap Width:
Bitmap Height:
- What is the maximum width/height of this popup?

Font Name:
- What font do you wish to use for this popup?

Font Size:
- What's the font size to use for the popup text?

Bold?:
Italic?
- Do you wish to make the text bold/italic?

Text Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Outline Size:
- What size do you want to use for the outline?

Outline Color:
- Colors with a bit of alpha settings.
- Format rgba(0-255, 0-255, 0-255, 0-1)

---

Offset

Offset: X:
Offset: Y:
- How much do you wish to offset the X/Y position by?

Variance:
- How much variance should be given to offset X?

---

Scale

Duration:
- How many frames should it take the scaling to reach the target scale?

Starting Scale: X:
Starting Scale: Y:
- What scale X/Y value should the popup start at?

Target Scale: X:
Target Scale: Y:
- What scale X/Y value should the popup end at?

---

Acceleration

Starting Speed: X:
Starting Speed: Y:
- How much should the starting X/Y speed of the popup be?

Delta Speed: X:
Delta Speed: Y:
- How much should the growing X/Y speed of the popup be?

---

Fading

Opaque Duration:
- How many frames should the popup stay opaque?

Fade Duration:
- After the opaque duration wears off, how many frames will it take for
the popup to vanish?

---
```
