# VisuMZ_1_SkillsStatesCore

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_1_SkillsStatesCore`
- Contract: [RPG Maker MZ] [Tier 1] [SkillsStatesCore]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| SkillsStatesCore | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| Skills:struct | Skill Settings | — | struct&lt;Skills&gt; | {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"\[\]","BattleHiddenSkillTypes:arraynum":"\[\]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments\[0\];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""} | — | Adjust general skill settings here. |
| Costs:arraystruct | Skill Cost Types | Skills:struct | struct&lt;Cost&gt;\[\] | \["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/&lt;HP COST:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/&lt;HP COST:\[ \](\\\\\\\\d+)(\[%％\])&gt;/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/&lt;JS HP COST&gt;\\\\\\\\s*(\[\\\\\\\\s\\\\\\\\S\]*)\\\\\\\\s*&lt;\\\\\\\\/JS HP COST&gt;/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost &gt; 0) {\\\\n    const rateNote = /&lt;HP COST:\[ \](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)(\[%％\])&gt;/i;\\\\n    const rates = user.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /&lt;HP COST:\[ \](\[\\\\\\\\+\\\\\\\\-\]\\\\\\\\d+)&gt;/i;\\\\n    const flats = user.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) =&gt; r * rate, cost);\\\\n    cost = flats.reduce((r, flat) =&gt; r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/&lt;HP COST MAX:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/&lt;HP COST MIN:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Return Boolean\\\\nif (cost &lt;= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp &gt; cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Return Boolean\\\\nreturn cost &gt; 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\nconst settings = arguments\[2\];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS\[%1\]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) &amp;&amp; Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor&lt;%1&gt;'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C\[%1\]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  &gt; 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I\[%1\]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/&lt;MP COST:\[ \](\\\\\\\\d+)(\[%％\])&gt;/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/&lt;JS MP COST&gt;\\\\\\\\s*(\[\\\\\\\\s\\\\\\\\S\]*)\\\\\\\\s*&lt;\\\\\\\\/JS MP COST&gt;/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost &gt; 0) {\\\\n    const rateNote = /&lt;MP COST:\[ \](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)(\[%％\])&gt;/i;\\\\n    const rates = user.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /&lt;MP COST:\[ \](\[\\\\\\\\+\\\\\\\\-\]\\\\\\\\d+)&gt;/i;\\\\n    const flats = user.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) =&gt; r * rate, cost);\\\\n    cost = flats.reduce((r, flat) =&gt; r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/&lt;MP COST MAX:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/&lt;MP COST MIN:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp &gt;= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Return Boolean\\\\nreturn cost &gt; 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\nconst settings = arguments\[2\];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS\[%1\]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) &amp;&amp; Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor&lt;#%1&gt;'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C\[%1\]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  &gt; 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I\[%1\]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/&lt;TP COST:\[ \](\\\\\\\\d+)(\[%％\])&gt;/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/&lt;JS TP COST&gt;\\\\\\\\s*(\[\\\\\\\\s\\\\\\\\S\]*)\\\\\\\\s*&lt;\\\\\\\\/JS TP COST&gt;/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost &gt; 0) {\\\\n    const rateNote = /&lt;TP COST:\[ \](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)(\[%％\])&gt;/i;\\\\n    const rates = user.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /&lt;TP COST:\[ \](\[\\\\\\\\+\\\\\\\\-\]\\\\\\\\d+)&gt;/i;\\\\n    const flats = user.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) =&gt; r * rate, cost);\\\\n    cost = flats.reduce((r, flat) =&gt; r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/&lt;TP COST MAX:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/&lt;TP COST MIN:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp &gt;= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Return Boolean\\\\nreturn cost &gt; 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\nconst settings = arguments\[2\];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS\[%1\]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) &amp;&amp; Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor&lt;#%1&gt;'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C\[%1\]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  &gt; 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I\[%1\]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/&lt;GOLD COST:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/&lt;GOLD COST:\[ \](\\\\\\\\d+)(\[%％\])&gt;/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/&lt;JS GOLD COST&gt;\\\\\\\\s*(\[\\\\\\\\s\\\\\\\\S\]*)\\\\\\\\s*&lt;\\\\\\\\/JS GOLD COST&gt;/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost &gt; 0) {\\\\n    const rateNote = /&lt;GOLD COST:\[ \](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)(\[%％\])&gt;/i;\\\\n    const rates = user.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /&lt;GOLD COST:\[ \](\[\\\\\\\\+\\\\\\\\-\]\\\\\\\\d+)&gt;/i;\\\\n    const flats = user.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) =&gt; r * rate, cost);\\\\n    cost = flats.reduce((r, flat) =&gt; r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/&lt;GOLD COST MAX:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/&lt;GOLD COST MIN:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() &gt;= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Return Boolean\\\\nreturn cost &gt; 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\nconst settings = arguments\[2\];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS\[%1\]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) &amp;&amp; Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor&lt;#%1&gt;'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C\[%1\]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  &gt; 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I\[%1\]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/&lt;POTION COST:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/&lt;JS POTION COST&gt;\\\\\\\\s*(\[\\\\\\\\s\\\\\\\\S\]*)\\\\\\\\s*&lt;\\\\\\\\/JS POTION COST&gt;/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost &gt; 0) {\\\\n    const rateNote = /&lt;POTION COST:\[ \](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)(\[%％\])&gt;/i;\\\\n    const rates = user.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /&lt;POTION COST:\[ \](\[\\\\\\\\+\\\\\\\\-\]\\\\\\\\d+)&gt;/i;\\\\n    const flats = user.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) =&gt; r * rate, cost);\\\\n    cost = flats.reduce((r, flat) =&gt; r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/&lt;POTION COST MAX:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/&lt;POTION COST MIN:\[ \](\\\\\\\\d+)&gt;/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\nconst item = $dataItems\[7\];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() &amp;&amp; cost &gt; 0) {\\\\n    return $gameParty.numItems(item) &gt;= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\nconst item = $dataItems\[7\];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Return Boolean\\\\nreturn cost &gt; 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems\[7\];\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\nconst settings = arguments\[2\];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS\[%1\]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) &amp;&amp; Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor&lt;#%1&gt;'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C\[%1\]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I\[%1\]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems\[7\];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems\[7\];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems\[7\];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /&lt;ITEM COST:\[ \](\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items\[entry.id\] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /&lt;WEAPON COST:\[ \](\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons\[entry.id\] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /&lt;ARMOR COST:\[ \](\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors\[entry.id\] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note \|\| '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /&lt;ITEM COST:\[ \](\\\\\\\\d+)(\[%％\])\[ \](.*)&gt;/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.items\[entry.id\]) {\\\\n                    cost.items\[entry.id\] = Math.ceil(cost.items\[entry.id\] * rate);\\\\n                    if (cost.items\[entry.id\] &lt;= 0) cost.items\[entry.id\] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /&lt;WEAPON COST:\[ \](\\\\\\\\d+)(\[%％\])\[ \](.*)&gt;/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.weapons\[entry.id\]) {\\\\n                    cost.weapons\[entry.id\] = Math.ceil(cost.weapons\[entry.id\] * rate);\\\\n                    if (cost.weapons\[entry.id\] &lt;= 0) cost.weapons\[entry.id\] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /&lt;ARMOR COST:\[ \](\\\\\\\\d+)(\[%％\])\[ \](.*)&gt;/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.armors\[entry.id\]) {\\\\n                    cost.armors\[entry.id\] = Math.ceil(cost.armors\[entry.id\] * rate);\\\\n                    if (cost.armors\[entry.id\] &lt;= 0) cost.armors\[entry.id\] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note \|\| '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /&lt;ITEM COST:\[ \](\[\\\\\\\\+\\\\\\\\-\]\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.items\[entry.id\]) {\\\\n                    cost.items\[entry.id\] += flat;\\\\n                    if (cost.items\[entry.id\] &lt;= 0) cost.items\[entry.id\] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /&lt;WEAPON COST:\[ \](\[\\\\\\\\+\\\\\\\\-\]\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.weapons\[entry.id\]) {\\\\n                    cost.weapons\[entry.id\] += flat;\\\\n                    if (cost.weapons\[entry.id\] &lt;= 0) cost.weapons\[entry.id\] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /&lt;ARMOR COST:\[ \](\[\\\\\\\\+\\\\\\\\-\]\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.armors\[entry.id\]) {\\\\n                    cost.armors\[entry.id\] += flat;\\\\n                    if (cost.armors\[entry.id\] &lt;= 0) cost.armors\[entry.id\] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /&lt;ITEM COST MAX:\[ \](\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.items\[entry.id\] !== undefined) {\\\\n                    cost.items\[entry.id\] = Math.min(max, cost.items\[entry.id\]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /&lt;ITEM COST MIN:\[ \](\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.items\[entry.id\] !== undefined) {\\\\n                    cost.items\[entry.id\] = Math.max(min, cost.items\[entry.id\]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /&lt;WEAPON COST MAX:\[ \](\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.weapons\[entry.id\] !== undefined) {\\\\n                    cost.weapons\[entry.id\] = Math.min(max, cost.weapons\[entry.id\]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /&lt;WEAPON COST MIN:\[ \](\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.weapons\[entry.id\] !== undefined) {\\\\n                    cost.weapons\[entry.id\] = Math.max(min, cost.weapons\[entry.id\]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /&lt;ARMOR COST MAX:\[ \](\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.armors\[entry.id\] !== undefined) {\\\\n                    cost.armors\[entry.id\] = Math.min(max, cost.armors\[entry.id\]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /&lt;ARMOR COST MIN:\[ \](\\\\\\\\d+)\[ \](.*)&gt;/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name);\\\\n                if (entry &amp;&amp; cost.armors\[entry.id\] !== undefined) {\\\\n                    cost.armors\[entry.id\] = Math.max(min, cost.armors\[entry.id\]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note \|\| '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /&lt;REPLACE ITEM (.*) COST:\[ \](.*)&gt;/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 &amp;&amp; entry2 &amp;&amp; cost.items\[entry1.id\]) {\\\\n                    cost.items\[entry2.id\] = cost.items\[entry1.id\];\\\\n                    delete cost.items\[entry1.id\];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /&lt;REPLACE WEAPON (.*) COST:\[ \](.*)&gt;/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 &amp;&amp; entry2 &amp;&amp; cost.weapons\[entry1.id\]) {\\\\n                    cost.weapons\[entry2.id\] = cost.weapons\[entry1.id\];\\\\n                    delete cost.items\[entry1.id\];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /&lt;REPLACE ARMOR (.*) COST:\[ \](.*)&gt;/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj =&gt; obj &amp;&amp; obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 &amp;&amp; entry2 &amp;&amp; cost.armors\[entry1.id\]) {\\\\n                    cost.armors\[entry2.id\] = cost.armors\[entry1.id\];\\\\n                    delete cost.items\[entry1.id\];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems\[id\];\\\\n        if (obj) {\\\\n            const costAmount = cost.items\[id\];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount &gt; ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons\[id\];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons\[id\];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount &gt; ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors\[id\];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors\[id\];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount &gt; ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems\[id\];\\\\n        if (obj &amp;&amp; obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items\[id\];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons\[id\];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons\[id\];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors\[id\];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors\[id\];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\n\\\\n// Check Keys\\\\nconst keys = \['items', 'weapons', 'armors'\];\\\\n\\\\n// Return False\\\\nreturn keys.some(key =&gt; Object.keys(cost\[key\]).length &gt; 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments\[0\];\\\\nconst cost = arguments\[1\];\\\\nconst settings = arguments\[2\];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = \['items', 'weapons', 'armors'\];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS\[%1\]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) &amp;&amp; Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor&lt;#%1&gt;'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C\[%1\]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = \[$dataItems, $dataWeapons, $dataArmors\]\[keys.indexOf(key)\];\\\\n    const costData = cost\[key\];\\\\n    const idList = Object.keys(costData).sort((a, b) =&gt; a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database\[id\];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData\[id\];\\\\n        text += '\\\\\\\\\\\\\\\\I\[%1\]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"\] | — | A list of all the skill cost types added by this plugin and the code that controls them in-game. |
| Gauge:struct | Gauge Settings | Skills:struct | struct&lt;Gauge&gt; | {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"} | — | Settings in regards to how skill cost gauges function and appear. |
| BreakSkills | -------------------------- | — | — | ---------------------------------- | — | — |
| States:struct | State Settings | — | struct&lt;States&gt; | {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments\[0\];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates\[stateId\];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments\[0\];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates\[stateId\];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments\[0\];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates\[stateId\];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""} | — | Adjust general state settings here. |
| Buffs:struct | Buff/Debuff Settings | States:struct | struct&lt;Buffs&gt; | {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments\[0\];\\nconst buffLevel = arguments\[1\];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments\[0\];\\nconst modifier = this._buffs\[paramId\];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments\[0\];\\nconst modifier = this._buffs\[paramId\];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments\[0\];\\nconst modifier = this._buffs\[paramId\];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments\[0\];\\nconst modifier = this._buffs\[paramId\];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments\[0\];\\nconst modifier = this._buffs\[paramId\];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments\[0\];\\nconst modifier = this._buffs\[paramId\];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""} | — | Adjust general buff/debuff settings here. |
| PassiveStates:struct | Passive States | States:struct | struct&lt;PassiveStates&gt; | {"List":"","Global:arraynum":"\[\]","Actor:arraynum":"\[\]","Enemy:arraynum":"\[\]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments\[0\];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""} | — | Adjust passive state settings here. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: Skills

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| EnableLayout:eval | Use Updated Layout | General | boolean | true | — | Use the Updated Skill Menu Layout provided by this plugin? This will override the Core Engine windows settings. |
| LayoutStyle:str | Layout Style | General | select | upper/left | Upper Help, Left Input=upper/left; Upper Help, Right Input=upper/right; Lower Help, Left Input=lower/left; Lower Help, Right Input=lower/right | If using an updated layout, how do you want to style the menu scene layout? |
| SkillTypeWindow | Skill Type Window | — | — | — | — | — |
| CmdStyle:str | Style | SkillTypeWindow | select | auto | Text Only=text; Icon Only=icon; Icon + Text=iconText; Automatic=auto | How do you wish to draw commands in the Skill Type Window? |
| CmdTextAlign:str | Text Align | SkillTypeWindow | combo | left | left; center; right | Text alignment for the Skill Type Window. |
| CmdWidth:num | Window Width | SkillTypeWindow | number | 240 | — | What is the desired pixel width of this window? Default: 240 |
| ListWindow | List Window | — | — | — | — | — |
| ListWindowCols:num | Columns | ListWindow | number | 1 | — | Number of maximum columns. |
| ShopStatusWindow | Shop Status Window | — | — | — | — | — |
| ShowShopStatus:eval | Show in Skill Menu? | ShopStatusWindow | boolean | true | — | Show the Shop Status Window in the Skill Menu? This is enabled if the Updated Layout is on. |
| SkillSceneAdjustSkillList:eval | Adjust List Window? | ShopStatusWindow | boolean | true | — | Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window? |
| SkillSceneStatusBgType:num | Background Type | ShopStatusWindow | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| SkillMenuStatusRect:func | JS: X, Y, W, H | ShopStatusWindow | note | "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for this Shop Status Window in the Skill Menu. |
| SkillTypes | Skill Types | — | — | — | — | — |
| HiddenSkillTypes:arraynum | Hidden Skill Types | SkillTypes | number\[\] | \[\] | — | Insert the ID's of the Skill Types you want hidden from view ingame. |
| BattleHiddenSkillTypes:arraynum | Hidden During Battle | SkillTypes | number\[\] | \[\] | — | Insert the ID's of the Skill Types you want hidden during battle only. |
| IconStypeNorm:num | Icon: Normal Type | SkillTypes | — | 78 | — | Icon used for normal skill types that aren't assigned any icons. |
| IconStypeMagic:num | Icon: Magic Type | SkillTypes | — | 79 | — | Icon used for magic skill types that aren't assigned any icons. |
| SortSkillTypesAbc:arraynum | Sort: Alphabetical | SkillTypes | number\[\] | \[\] | — | Insert the ID's of Skill Types you want sorted alphabetically. |
| CustomJS | Global JS Effects | — | — | — | — | — |
| SkillConditionJS:func | JS: Skill Conditions | CustomJS | note | "// Declare Variables\nconst skill = arguments\[0\];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;" | — | JavaScript code for a global-wide skill condition check. |

### Struct: Cost

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Name:str | Name | — | — | Untitled | — | A name for this Skill Cost Type. |
| Settings | — | — | — | — | — | — |
| Icon:num | Icon | Settings | — | 0 | — | Icon used for this Skill Cost Type. Use 0 for no icon. |
| FontColor:str | Font Color | Settings | — | 0 | — | Text Color used to display this cost. For a hex color, use #rrggbb with VisuMZ_1_MessageCore |
| FontSize:num | Font Size | Settings | number | 22 | — | Font size used to display this cost. |
| Cost | Cost Processing | — | — | — | — | — |
| CalcJS:func | JS: Cost Calculation | Cost | note | "// Declare Variables\nconst user = this;\nconst skill = arguments\[0\];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));" | — | Code on how to calculate this resource cost for the skill. |
| CanPayJS:func | JS: Can Pay Cost? | Cost | note | "// Declare Variables\nconst user = this;\nconst skill = arguments\[0\];\nconst cost = arguments\[1\];\n\n// Return Boolean\nreturn true;" | — | Code on calculating whether or not the user is able to pay the cost. |
| PayJS:func | JS: Paying Cost | Cost | note | "// Declare Variables\nconst user = this;\nconst skill = arguments\[0\];\nconst cost = arguments\[1\];\n\n// Process Payment\n" | — | Code for if met, this is the actual process of paying of the cost. |
| Windows | Window Display | — | — | — | — | — |
| ShowJS:func | JS: Show Cost? | Windows | note | "// Declare Variables\nconst user = this;\nconst skill = arguments\[0\];\nconst cost = arguments\[1\];\n\n// Return Boolean\nreturn cost &gt; 0;" | — | Code for determining if the cost is shown or not. |
| TextJS:func | JS: Cost Text | Windows | note | "// Declare Variables\nconst user = this;\nconst skill = arguments\[0\];\nconst cost = arguments\[1\];\nconst settings = arguments\[2\];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS\[%1\]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) &amp;&amp; Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor&lt;#%1&gt;'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C\[%1\]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  &gt; 0) {\n    text += '\\\\I\[%1\]'.format(icon);\n}\n\n// Return text\nreturn text;" | — | Code to determine the text (with Text Code support) used for the displayed cost. |
| Gauges | Gauge Display | — | — | — | — | — |
| GaugeMaxJS:func | JS: Maximum Value | Gauges | note | "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;" | — | Code to determine the maximum value used for this Skill Cost resource for gauges. |
| GaugeCurrentJS:func | JS: Current Value | Gauges | note | "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;" | — | Code to determine the current value used for this Skill Cost resource for gauges. |
| GaugeDrawJS:func | JS: Draw Gauge | Gauges | note | "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");" | — | Code to determine how to draw the Skill Cost resource for this gauge type. |

### Struct: Gauge

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Labels | — | — | — | — | — | — |
| LabelFontMainType:str | Font Type | Labels | select | main | main; number | Which font type should be used for labels? |
| MatchLabelColor:eval | Match Label Color | Labels | boolean | true | — | Match the label color to the Gauge Color being used? |
| MatchLabelGaugeColor:num | Match: Gauge # ? | MatchLabelColor:eval | number | 2 | — | Which Gauge Color should be matched? |
| PresetLabelGaugeColor:num | Preset: Gauge Color | MatchLabelColor:eval | — | 16 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| LabelOutlineSolid:eval | Solid Outline | Labels | boolean | true | — | Make the label outline a solid black color? |
| LabelOutlineWidth:num | Outline Width | Labels | number | 3 | — | What width do you wish to use for your outline? Use 0 to not use an outline. |
| Values | — | — | — | — | — | — |
| ValueFontMainType:str | Font Type | Values | select | number | main; number | Which font type should be used for values? |
| ValueOutlineSolid:eval | Solid Outline | Values | boolean | true | — | Make the value outline a solid black color? |
| ValueOutlineWidth:num | Outline Width | Values | number | 3 | — | What width do you wish to use for your outline? Use 0 to not use an outline. |

### Struct: States

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| ReapplyRules:str | Reapply Rules | General | select | greater | Ignore: State doesn't get added.=ignore; Reset: Turns get reset.=reset; Greater: Turns take greater value (current vs reset).=greater; Add: Turns add upon existing turns.=add | These are the rules when reapplying states. |
| MaxTurns:num | Maximum Turns | General | number | 9999 | — | Maximum number of turns to let states go up to. This can be changed with the &lt;Max Turns: x&gt; notetag. |
| ActionEndUpdate:eval | Action End Update | General | boolean | true | — | States with "Action End" auto-removal will also update turns at the end of each action instead of all actions. |
| TurnEndOnMap:num | Turn End on Map | General | number | 20 | — | Update any state and buff turns on the map after this many steps. Use 0 to disable. |
| Turns | Turn Display | — | — | — | — | — |
| ShowTurns:eval | Show Turns? | Turns | boolean | true | — | Display state turns on top of window icons and sprites? |
| TurnFontSize:num | Turn Font Size | Turns | number | 16 | — | Font size used for displaying turns. |
| TurnOffsetX:num | Offset X | Turns | — | -4 | — | Offset the X position of the turn display. |
| TurnOffsetY:num | Offset Y | Turns | — | -6 | — | Offset the Y position of the turn display. |
| TurnFontSize:num | Turn Font Size | Turns | — | 16 | — | Font size used for displaying turns. |
| ColorNeutral:str | Turn Color: Neutral | Turns | — | 0 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorPositive:str | Turn Color: Positive | Turns | — | 24 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorNegative:str | Turn Color: Negative | Turns | — | 27 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| Data | Data Display | — | — | — | — | — |
| ShowData:eval | Show Data? | Data | boolean | true | — | Display state data on top of window icons and sprites? |
| DataFontSize:num | Data Font Size | Data | number | 12 | — | Font size used for displaying state data. |
| DataOffsetX:num | Offset X | Data | — | 0 | — | Offset the X position of the state data display. |
| DataOffsetY:num | Offset Y | Data | — | 8 | — | Offset the Y position of the state data display. |
| CustomJS | Global JS Effects | — | — | — | — | — |
| onAddStateJS:func | JS: On Add State | CustomJS | note | "// Declare Variables\nconst stateId = arguments\[0\];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates\[stateId\];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n" | — | JavaScript code for a global-wide custom effect whenever a state is added. |
| onEraseStateJS:func | JS: On Erase State | CustomJS | note | "// Declare Variables\nconst stateId = arguments\[0\];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates\[stateId\];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n" | — | JavaScript code for a global-wide custom effect whenever a state is erased. |
| onExpireStateJS:func | JS: On Expire State | CustomJS | note | "// Declare Variables\nconst stateId = arguments\[0\];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates\[stateId\];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n" | — | JavaScript code for a global-wide custom effect whenever a state has expired. |

### Struct: Buffs

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| ReapplyRules:str | Reapply Rules | General | select | greater | Ignore: Buff/Debuff doesn't get added.=ignore; Reset: Turns get reset.=reset; Greater: Turns take greater value (current vs reset).=greater; Add: Turns add upon existing turns.=add | These are the rules when reapplying buffs/debuffs. |
| MaxTurns:num | Maximum Turns | General | number | 9999 | — | Maximum number of turns to let buffs and debuffs go up to. |
| Stacking | — | — | — | — | — | — |
| StackBuffMax:num | Max Stacks: Buff | Stacking | number | 2 | — | Maximum number of stacks for buffs. |
| StackDebuffMax:num | Max Stacks: Debuff | Stacking | number | 2 | — | Maximum number of stacks for debuffs. |
| MultiplierJS:func | JS: Buff/Debuff Rate | Stacking | note | "// Declare Variables\nconst user = this;\nconst paramId = arguments\[0\];\nconst buffLevel = arguments\[1\];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);" | — | Code to determine how much buffs and debuffs affect parameters. |
| Turns | Turns Display | — | — | — | — | — |
| ShowTurns:eval | Show Turns? | Turns | boolean | true | — | Display buff and debuff turns on top of window icons and sprites? |
| TurnFontSize:num | Turn Font Size | Turns | number | 16 | — | Font size used for displaying turns. |
| TurnOffsetX:num | Offset X | Turns | — | -4 | — | Offset the X position of the turn display. |
| TurnOffsetY:num | Offset Y | Turns | — | -6 | — | Offset the Y position of the turn display. |
| ColorBuff:str | Turn Color: Buffs | Turns | — | 24 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ColorDebuff:str | Turn Color: Debuffs | Turns | — | 27 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| Data | Rate Display | — | — | — | — | — |
| ShowData:eval | Show Rate? | Data | boolean | false | — | Display buff and debuff rate on top of window icons and sprites? |
| DataFontSize:num | Rate Font Size | Data | number | 12 | — | Font size used for displaying rate. |
| DataOffsetX:num | Offset X | Data | — | 0 | — | Offset the X position of the rate display. |
| DataOffsetY:num | Offset Y | Data | — | 8 | — | Offset the Y position of the rate display. |
| CustomJS | Global JS Effects | — | — | — | — | — |
| onAddBuffJS:func | JS: On Add Buff | CustomJS | note | "// Declare Variables\nconst paramId = arguments\[0\];\nconst modifier = this._buffs\[paramId\];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n" | — | JavaScript code for a global-wide custom effect whenever a buff is added. |
| onAddDebuffJS:func | JS: On Add Debuff | CustomJS | note | "// Declare Variables\nconst paramId = arguments\[0\];\nconst modifier = this._buffs\[paramId\];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n" | — | JavaScript code for a global-wide custom effect whenever a debuff is added. |
| onEraseBuffJS:func | JS: On Erase Buff | CustomJS | note | "// Declare Variables\nconst paramId = arguments\[0\];\nconst modifier = this._buffs\[paramId\];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n" | — | JavaScript code for a global-wide custom effect whenever a buff is erased. |
| onEraseDebuffJS:func | JS: On Erase Debuff | CustomJS | note | "// Declare Variables\nconst paramId = arguments\[0\];\nconst modifier = this._buffs\[paramId\];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n" | — | JavaScript code for a global-wide custom effect whenever a debuff is erased. |
| onExpireBuffJS:func | JS: On Expire Buff | CustomJS | note | "// Declare Variables\nconst paramId = arguments\[0\];\nconst modifier = this._buffs\[paramId\];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n" | — | JavaScript code for a global-wide custom effect whenever a buff has expired. |
| onExpireDebuffJS:func | JS: On Expire Debuff | CustomJS | note | "// Declare Variables\nconst paramId = arguments\[0\];\nconst modifier = this._buffs\[paramId\];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n" | — | JavaScript code for a global-wide custom effect whenever a debuff has expired. |

### Struct: PassiveStates

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| List | — | — | — | — | — | — |
| Global:arraynum | Global Passives | List | state\[\] | \[\] | — | A list of passive states to affect actors and enemies. |
| Actor:arraynum | Actor-Only Passives | List | state\[\] | \[\] | — | A list of passive states to affect actors only. |
| Enemy:arraynum | Enemy Passives | List | state\[\] | \[\] | — | A list of passive states to affect enemies only. |
| Cache | — | — | — | — | — | — |
| RefreshCacheSwitch:eval | Switch Refresh? | Cache | boolean | false | — | Refresh all battle members when switches are changed in battle? |
| RefreshCacheVar:eval | Variable Refresh? | Cache | boolean | false | — | Refresh all battle members when variables are changed in battle? |
| CustomJS | Global JS Effects | — | — | — | — | — |
| PassiveConditionJS:func | JS: Condition Check | CustomJS | note | "// Declare Variables\nconst state = arguments\[0\];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;" | — | JavaScript code for a global-wide passive condition check. |

## Plugin commands

### -

- Command ID: `Separator_Begin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Skill Cost: Emulate Actor Pay

- Command ID: `SkillActorPaySkillCost`
- Description: Target actor(s) emulates paying for skill cost.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ActorIDs:arraynum | Actor ID(s) | actor\[\] | \["1"\] | — | Select which Actor ID(s) will pay skill cost. |
| SkillID:num | Skill ID | skill | 99 | — | What is the ID of the skill to emulate paying the skill cost for? @ -------------------------------------------------------------------------- |

### Skill Cost: Emulate Enemy Pay

- Command ID: `SkillEnemyPaySkillCost`
- Description: Target enemy(s) emulates paying for skill cost.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| EnemyIndex:arraynum | Enemy Index(es) | actr\[\] | \["1"\] | — | Select which enemy index(es) will pay skill cost. |
| SkillID:num | Skill ID | skill | 99 | — | What is the ID of the skill to emulate paying the skill cost for? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_StateTurns`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### State Turns: Actor State Turns Change By

- Command ID: `StateTurnsActorChangeBy`
- Description: Changes actor(s) state turns by an amount. Only works on states that can have turns.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ActorIDs:arraynum | Actor ID(s) | actor\[\] | \["1"\] | — | Select which Actor ID(s) to affect. |
| StateID:num | State ID | state | 5 | — | What is the ID of the state you wish to change turns for? Only works on states that can have turns. |
| Turns:eval | Change Turns By | — | +1 | — | How many turns should the state be changed to? You may use JavaScript code. |
| AutoAddState:eval | Auto-Add State? | boolean | true | — | Automatically adds state if actor(s) does not have it applied? @ -------------------------------------------------------------------------- |

### State Turns: Actor State Turns Change To

- Command ID: `StateTurnsActorChangeTo`
- Description: Changes actor(s) state turns to a specific value. Only works on states that can have turns.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ActorIDs:arraynum | Actor ID(s) | actor\[\] | \["1"\] | — | Select which Actor ID(s) to affect. |
| StateID:num | State ID | state | 5 | — | What is the ID of the state you wish to change turns for? Only works on states that can have turns. |
| Turns:eval | Change Turns To | — | 10 | — | How many turns should the state be changed to? You may use JavaScript code. |
| AutoAddState:eval | Auto-Add State? | boolean | true | — | Automatically adds state if actor(s) does not have it applied? @ -------------------------------------------------------------------------- |

### State Turns: Enemy State Turns Change By

- Command ID: `StateTurnsEnemyChangeBy`
- Description: Changes enemy(s) state turns by an amount. Only works on states that can have turns.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| EnemyIndex:arraynum | Enemy Index(es) | actr\[\] | \["1"\] | — | Select which enemy index(es) to affect. |
| StateID:num | State ID | state | 5 | — | What is the ID of the state you wish to change turns for? Only works on states that can have turns. |
| Turns:eval | Change Turns By | — | +1 | — | How many turns should the state be changed to? You may use JavaScript code. |
| AutoAddState:eval | Auto-Add State? | boolean | true | — | Automatically adds state if enemy(s) does not have it applied? @ -------------------------------------------------------------------------- |

### State Turns: Enemy State Turns Change To

- Command ID: `StateTurnsEnemyChangeTo`
- Description: Changes enemy(s) state turns to a specific value. Only works on states that can have turns.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| EnemyIndex:arraynum | Enemy Index(es) | actr\[\] | \["1"\] | — | Select which enemy index(es) to affect. |
| StateID:num | State ID | state | 5 | — | What is the ID of the state you wish to change turns for? Only works on states that can have turns. |
| Turns:eval | Change Turns To | — | 10 | — | How many turns should the state be changed to? You may use JavaScript code. |
| AutoAddState:eval | Auto-Add State? | boolean | true | — | Automatically adds state if enemy(s) does not have it applied? @ -------------------------------------------------------------------------- |

### -

- Command ID: `Separator_End`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

The Skills & States Core plugin extends and builds upon the functionality of
RPG Maker MZ's inherent skill, state, and buff functionalities and allows
game devs to customize its various aspects.

Features include all (but not limited to) the following:

* Assigning multiple Skill Types to Skills.
* Making custom Skill Cost Types (such as HP, Gold, and Items).
* Allowing Skill Costs to become percentile-based or dynamic either directly
through the Skills themselves or through trait-like notetags.
* Replacing gauges for different classes to display different types of
Skill Cost Type resources.
* Hiding/Showing and enabling/disabling skills based on switches, learned
skills, and code.
* Setting rulings for states, including if they're cleared upon death, how
reapplying the state affects their turn count, and more.
* Allowing states to be categorized and affected by categories, too.
* Displaying turn counts on states drawn in the window or on sprites.
* Manipulation of state, buff, and debuff turns through skill and item
effect notetags.
* Create custom damage over time state calculations through notetags.
* Allow database objects to apply passive states to its user.
* Passive states can have conditions before they become active as well.
* Updated Skill Menu Scene layout to fit more modern appearances.
* Added bonus if Items & Equips Core is installed to utilize the Shop Status
Window to display skill data inside the Skill Menu.
* Control over various aspects of the Skill Menu Scene.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 1 ------

This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Major Changes

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

Action End Removal for States

- If your Plugin Parameter settings for "Action End Update" are enabled,
then "Action End" has been updated so that it actually applies per action
used instead of just being at the start of a battler's action set.

- However, there are side effects to this: if a state has the "Cannot Move"
restriction along with the "Action End" removal timing, then unsurprisingly,
the state will never wear off because it's now based on actual actions
ending. To offset this and remove confusion, "Action End" auto-removal
timings for states with "Cannot Move" restrictions will be turned into
"Turn End" auto-removal timings while the "Action End Update" is enabled.

- This automatic change won't make it behave like an "Action End" removal
timing would, but it's better than completely softlocking a battler.

---

Buff & Debuff Level Management

- In RPG Maker MZ, buffs and debuffs when applied to one another will shift
the buff modifier level up or down. This plugin will add an extra change to
the mechanic by making it so that once the buff modifier level reaches a
neutral point, the buff or debuff is removed altogether and resets the buff
and debuff turn counter for better accuracy.

---

Skill Costs

- In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
Types are now moved to the Plugin Parameters, including MP and TP. This
means that from payment to checking for them, it's all done through the
options available.

- By default in RPG Maker MZ, displayed skill costs would only display only
one type: TP if available, then MP. If a skill costs both TP and MP, then
only TP was displayed. This plugin changes that aspect by displaying all the
cost types available in order of the Plugin Parameter Skill Cost Types.

- By default in RPG Maker MZ, displayed skill costs were only color-coded.
This plugin changes that aspect by displaying the Skill Cost Type's name
alongside the cost. This is to help color-blind players distinguish what
costs a skill has.

---

Sprite Gauges

- Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
to be customized through the use of Plugin Parameters under the Skill Cost
Types and their related-JavaScript entries.

---

State Displays

- To put values onto states and display them separately from the state turns
you can use the following script calls.

battler.getStateDisplay(stateId)
- This returns whatever value is stored for the specified battler under
that specific state value.
- If there is no value to be returned it will return an empty string.

battler.setStateDisplay(stateId, value)
- This sets the display for the battler's specific state to whatever you
declared as the value.
- The value is best used as a number or a string.

battler.clearStateDisplay(stateId)
- This clears the display for the battler's specific state.
- In short, this sets the stored display value to an empty string.

---

Window Functions Moved

- Some functions found in RPG Maker MZ's default code for Window_StatusBase
and Window_SkillList are now moved to Window_Base to make the functions
available throughout all windows for usage.

---

Slip Damage Popup Clarification

Slip Damage popups only show one popup for HP, MP, and TP each and it is the
grand total of all the states and effects combined regardless of the number
of states and effects on a battler. This is how it is in vanilla RPG Maker
MZ and this is how we intend for it to be with the VisuStella MZ library.

This is NOT a bug!

The reason we are not changing this is because it does not properly relay
information to the player accurately. When multiple popups appear, players
only have roughly a second and a half to calculate it all for any form of
information takeaway. We feel it is better suited for the player's overall
convenience to show a cummulative change and steer the experience towards a
more positive one.

Passive State Clarification

This section will explain various misconceptions regarding passive states.
No, passive states do not work the same way as states code-wise. Yes, they
use the same effects as states mechanically, but there are differences.

---

For those using the code "a.isStateAffected(10)" to check if a target is
affected by a state or not, this does NOT check passive states. This only
checks for states that were directly applied to the target.

This is NOT a bug.

Instead, use "a.states().includes($dataStates[10])" to check for them. This
code will search for both directly applied states and passive states alike.

---

As passive states are NOT considered directly applied to, they do NOT match
a Conditional Branch's state check as well. The Conditional Branch effect
checks for an affected state.

---

Because passive states are NOT directly applied to a battler, the functions
of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
passive states either. This means that any of the related JS notetags tied
to those functions will not occur either.

---

Why are passive states not considered affected by? Let's look at it
differently. There are two ways to grant skills to actors. They can acquire
skills by levels/items/events or they can equip gear that temporarily grants
the skill in question.

Learning the skill is direct. Temporarily granting the skill is indirect.
These two factors have mechanical importance and require differentiation.

Regular states and passive states are the same way. Regular states are
directly applied, therefore, need to be distinguished in order for things
like state turns and steps, removal conditionals, and similar to matter at
all. Passive states are indirect and are therefore, unaffected by state
turns, steps, and removal conditions. These mechanical differences are
important for how RPG Maker works.

---

Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
check if a target has a passive state will return false.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

=== General Skill Notetags ===

The following are general notetags that are skill-related.

---

<Skill Type: x>
<Skill Types: x,x,x>

<Skill Type: name>
<Skill Types: name, name, name>

- Used for: Skill Notetags
- Marks the skill to have multiple Skill Types, meaning they would appear
under different skill types without needing to create duplicate skills.
- Replace 'x' with a number value representing the Skill Type's ID.
- If using 'name' notetag variant, replace 'name' with the Skill Type(s)
name desired to be added.

---

<List Name: name>

- Used for: Skill Notetags
- Makes the name of the skill appear different when show in the skill list.
- Using \V[x] as a part of the name will display that variable.

---

<ID Sort Priority: x>

- Used for: Skill Notetags
- Used for Scene_Skill.
- Changes sorting priority by ID for skills to 'x'.
- Default priority level is '50'.
- Skills with higher priority values will be sorted higher up on the list
while lower values will be lower on the list.

---

=== Skill Cost Notetags ===

The following are notetags that can be used to adjust skill costs. Some of
these notetags are added through the Plugin Parameter: Skill Cost Types and
can be altered there. This also means that some of these notetags can have
their functionality altered and/or removed.

---

<type Cost: x>
<type Cost: x%>

- Used for: Skill Notetags
- These notetags are used to designate costs of custom or already existing
types that cannot be made by the Database Editor.
- Replace 'type' with a resource type. Existing ones found in the Plugin
Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
- Replace 'x' with a number value to determine the exact type cost value.
This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
- The 'x%' version is replaced with a percentile value to determine a cost
equal to a % of the type's maximum quantity limit.
- Functionality for these notetags can be altered in the Plugin Parameters.

Examples:
<HP Cost: 500>
<MP Cost: 25%>
<Gold Cost: 3000>
<Potion Cost: 5>

---

<type Cost Max: x>
<type Cost Min: x>

- Used for: Skill Notetags
- These notetags are used to ensure conditional and % costs don't become too
large or too small.
- Replace 'type' with a resource type. Existing ones found in the Plugin
Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
- Replace 'x' with a number value to determine the maximum or minimum values
that the cost can be.
- Functionality for these notetags can be altered in the Plugin Parameters.

Examples:
<HP Cost Max: 1500>
<MP Cost Min: 5>
<Gold Cost Max: 10000>
<Potion Cost Min: 3>

---

<type Cost: +x>
<type Cost: -x>

<type Cost: x%>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- The related actor will raise/lower the cost of any skill that uses the
'type' cost by a specified amount.
- Replace 'type' with a resource type. Existing ones found in the Plugin
Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
- For % notetag variant: Replace 'x' with a number value to determine the
rate to adjust the Skill Cost Type by as a rate value. This is applied
before <type Cost: +x> and <type Cost: -x> notetags.
- For + and - notetag variants: Replace 'x' with a number value to determine
how much to adjust the Skill Cost Type by as a flat value. This is applied
after <type Cost: x%> notetags.
- Functionality for these notetags can be altered in the Plugin Parameters.

Examples:
<HP Cost: +20>
<MP Cost: -10>
<Gold Cost: 50%>
<Potion Cost: 200%>

---

<Custom Cost Text>
text
</Custom Cost Text>

- Used for: Skill Notetags
- Allows you to insert custom text into the skill's cost area towards the
end of the costs.
- Replace 'text' with the text you wish to display.
- Text codes may be used.

---

=== JavaScript Notetags: Skill Costs ===

The following are notetags made for users with JavaScript knowledge to
determine any dynamic Skill Cost Types used for particular skills.

---

<JS type Cost>
code
code
cost = code;
</JS type Cost>

- Used for: Skill Notetags
- Replace 'type' with a resource type. Existing ones found in the Plugin
Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
- Replace 'code' to determine the type 'cost' of the skill.
- Insert the final type cost into the 'cost' variable.
- The 'user' variable refers to the user about to perform the skill.
- The 'skill' variable refers to the skill being used.
- Functionality for the notetag can be altered in the Plugin Parameters.

---

=== Gauge Replacement Notetags ===

Certain classes can have their gauges swapped out for other Skill Cost
Types. This is especially helpful for the classes that don't utilize those
Skill Cost Types. You can mix and match them however you want.

---

<Replace HP Gauge: type>
<Replace MP Gauge: type>
<Replace TP Gauge: type>

- Used for: Class Notetags
- Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
Cost Type.
- Replace 'type' with a resource type. Existing ones found in the Plugin
Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
- Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
- Replace 'type' with 'none' to not display any gauges there.
- The <Replace TP Gauge: type> will require 'Display TP in Window' setting
to be on in the Database > System 1 tab.
- Functionality for the notetags can be altered by changes made to the
Skill & States Core Plugin Parameters.

---

=== Item Cost-Related Notetags ===

---

<Item Cost: x name>
<Weapon Cost: x name>
<Armor Cost: x name>

- Used for: Skill Notetags
- The skill will consume items, weapons, and/or armors in order to be used.
- Even non-consumable items will be consumed.
- Replace 'x' with a number representing the respective item cost.
- Replace 'name' with text representing the respective item, weapon, or
armor to be consumed.
- Insert multiples of this notetag to consume multiple items, weapons,
and/or armors.
- Functionality for these notetags can be altered in the Plugin Parameters.

Examples:

<Item Cost: 5 Magic Water>
<Item Cost: 2 Antidote>
<Weapon Cost: 1 Short Sword>
<Armor Cost: 3 Cloth Armor>

---

<Item Cost Max: x name>
<Item Cost Min: x name>

<Weapon Cost Max: x name>
<Weapon Cost Min: x name>

<Armor Cost Max: x name>
<Armor Cost Min: x name>

- Used for: Skill Notetags
- Sets up a maximum/minimum cost for the item, weapon, armor type costs.
- Replace 'x' with a number representing the maximum or minimum cost.
- Replace 'name' with text representing the respective item, weapon, or
armor to be consumed.

Examples:

<Item Cost Max: 10 Magic Water>
<Item Cost Min: 2 Antidote>
<Weapon Cost Max: 3 Short Sword>
<Armor Cost Min: 1 Cloth Armor>

---

<Item Cost: +x name>
<Item Cost: -x name>

<Weapon Cost: +x name>
<Weapon Cost: -x name>

<Armor Cost: +x name>
<Armor Cost: -x name>

<Item Cost: x% name>
<Weapon Cost: x% name>
<Armor Cost: x% name>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- The related actor will raise/lower the item, weapon, and/or armor costs of
any skill that costs those items, weapons, and/or armors by x%.
- For % notetag variant: Replace 'x' with a number value to determine the
rate to adjust the Skill Cost Type by as a rate value. This is applied
before <type Cost: +x> and <type Cost: -x> notetags.
- For + and - notetag variants: Replace 'x' with a number value to determine
how much to adjust the Skill Cost Type by as a flat value. This is applied
after <type Cost: x%> notetags.
- Replace 'name' with text representing the respective item, weapon, or
armor to be consumed.
- Insert multiples of this notetag to consume multiple items, weapons,
and/or armors.
- Functionality for these notetags can be altered in the Plugin Parameters.

Examples:

<Item Cost: +1 Magic Water>
<Item Cost: -2 Antidote>
<Weapon Cost: 50% Short Sword>
<Armor Cost: 200% Cloth Armor>

---

<Replace Item name1 Cost: name2>
<Replace Weapon name1 Cost: name2>
<Replace Armor name1 Cost: name2>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- The related actor will not consume 'name1' items, weapons, or armors.
Instead, the cost will be redirected to 'name2' items, weapons, or armors.
- Even non-consumable items will be consumed.
- Replace 'name1' with text representing the respective item, weapon, or
armor that is the original cost type.
- Replace 'name2' with text representing the respective item, weapon, or
armor that will be consumed instead.

Examples:

<Replace Item Magic Water Cost: Potion>
<Replace Item Antidote Cost: Dispel Herb>
<Replace Weapon Short Sword Cost: Falchion>
<Replace Armor Cloth Armor Cost: Leather Armor>

---

=== Skill Accessibility Notetags ===

Sometimes, you don't want all skills to be visible whether it be to hide
menu-only skills during battle, until certain switches are turned ON/OFF, or
until certain skills have been learned.

---

<Hide in Battle>
<Hide outside Battle>

- Used for: Skill Notetags
- Makes the specific skill visible or hidden depending on whether or not the
player is currently in battle.

---

<Show Switch: x>

<Show All Switches: x,x,x>
<Show Any Switches: x,x,x>

- Used for: Skill Notetags
- Determines the visibility of the skill based on switches.
- Replace 'x' with the switch ID to determine the skill's visibility.
- If 'All' notetag variant is used, skill will be hidden until all switches
are ON. Then, it would be shown.
- If 'Any' notetag variant is used, skill will be shown if any of the
switches are ON. Otherwise, it would be hidden.

---

<Hide Switch: x>

<Hide All Switches: x,x,x>
<Hide Any Switches: x,x,x>

- Used for: Skill Notetags
- Determines the visibility of the skill based on switches.
- Replace 'x' with the switch ID to determine the skill's visibility.
- If 'All' notetag variant is used, skill will be shown until all switches
are ON. Then, it would be hidden.
- If 'Any' notetag variant is used, skill will be hidden if any of the
switches are ON. Otherwise, it would be shown.

---

<Show if learned Skill: x>

<Show if learned All Skills: x,x,x>
<Show if learned Any Skills: x,x,x>

<Show if learned Skill: name>

<Show if learned All Skills: name, name, name>
<Show if learned Any Skills: name, name, name>

- Used for: Skill Notetags
- Determines the visibility of the skill based on skills learned.
- This does not apply to skills added by traits on actors, classes, any
equipment, or states. These are not considered learned skills. They are
considered temporary skills.
- Replace 'x' with the skill ID to determine the skill's visibility.
- If 'name' notetag viarant is used, replace 'name' with the skill's name to
be checked for the notetag.
- If 'All' notetag variant is used, skill will be hidden until all skills
are learned. Then, it would be shown.
- If 'Any' notetag variant is used, skill will be shown if any of the skills
are learned. Otherwise, it would be hidden.

---

<Hide if learned Skill: x>

<Hide if learned All Skills: x,x,x>
<Hide if learned Any Skills: x,x,x>

<Hide if learned Skill: name>

<Hide if learned All Skills: name, name, name>
<Hide if learned Any Skills: name, name, name>

- Used for: Skill Notetags
- Determines the visibility of the skill based on skills learned.
- This does not apply to skills added by traits on actors, classes, any
equipment, or states. These are not considered learned skills. They are
considered temporary skills.
- Replace 'x' with the skill ID to determine the skill's visibility.
- If 'name' notetag viarant is used, replace 'name' with the skill's name to
be checked for the notetag.
- If 'All' notetag variant is used, skill will be shown until all skills
are learned. Then, it would be hidden.
- If 'Any' notetag variant is used, skill will be hidden if any of the
skills are learned. Otherwise, it would be shown.

---

<Show if has Skill: x>

<Show if have All Skills: x,x,x>
<Show if have Any Skills: x,x,x>

<Show if has Skill: name>

<Show if have All Skills: name, name, name>
<Show if have Any Skills: name, name, name>

- Used for: Skill Notetags
- Determines the visibility of the skill based on skills available.
- This applies to both skills that have been learned and/or temporarily
added through traits on actors, classes, equipment, or states.
- Replace 'x' with the skill ID to determine the skill's visibility.
- If 'name' notetag viarant is used, replace 'name' with the skill's name to
be checked for the notetag.
- If 'All' notetag variant is used, skill will be hidden until all skills
are learned. Then, it would be shown.
- If 'Any' notetag variant is used, skill will be shown if any of the skills
are learned. Otherwise, it would be hidden.

---

<Hide if has Skill: x>

<Hide if have All Skills: x,x,x>
<Hide if have Any Skills: x,x,x>

<Hide if has Skill: name>

<Hide if have All Skills: name, name, name>
<Hide if have Any Skills: name, name, name>

- Used for: Skill Notetags
- Determines the visibility of the skill based on skills available.
- This applies to both skills that have been learned and/or temporarily
added through traits on actors, classes, equipment, or states.
- Replace 'x' with the skill ID to determine the skill's visibility.
- If 'name' notetag viarant is used, replace 'name' with the skill's name to
be checked for the notetag.
- If 'All' notetag variant is used, skill will be shown until all skills
are learned. Then, it would be hidden.
- If 'Any' notetag variant is used, skill will be hidden if any of the
skills are learned. Otherwise, it would be shown.

---

<Enable Switch: x>

<Enable All Switches: x,x,x>
<Enable Any Switches: x,x,x>

- Used for: Skill Notetags
- Determines the enabled status of the skill based on switches.
- Replace 'x' with the switch ID to determine the skill's enabled status.
- If 'All' notetag variant is used, skill will be disabled until all
switches are ON. Then, it would be enabled.
- If 'Any' notetag variant is used, skill will be enabled if any of the
switches are ON. Otherwise, it would be disabled.

---

<Disable Switch: x>

<Disable All Switches: x,x,x>
<Disable Any Switches: x,x,x>

- Used for: Skill Notetags
- Determines the enabled status of the skill based on switches.
- Replace 'x' with the switch ID to determine the skill's enabled status.
- If 'All' notetag variant is used, skill will be enabled until all switches
are ON. Then, it would be disabled.
- If 'Any' notetag variant is used, skill will be disabled if any of the
switches are ON. Otherwise, it would be enabled.

---

=== JavaScript Notetags: Skill Accessibility ===

The following are notetags made for users with JavaScript knowledge to
determine if a skill can be accessible visibly or through usage.

---

<JS Skill Visible>
code
code
visible = code;
</JS Skill Visible>

- Used for: Skill Notetags
- Determines the visibility of the skill based on JavaScript code.
- Replace 'code' to determine the type visibility of the skill.
- The 'visible' variable returns a boolean (true/false) to determine if the
skill will be visible or not.
- The 'user' variable refers to the user with the skill.
- The 'skill' variable refers to the skill being checked.
- All other visibility conditions must be met for this code to count.

---

<JS Skill Enable>
code
code
enabled = code;
</JS Skill Enable>

- Used for: Skill Notetags
- Determines the enabled status of the skill based on JavaScript code.
- Replace 'code' to determine the type enabled status of the skill.
- The 'enabled' variable returns a boolean (true/false) to determine if the
skill will be enabled or not.
- The 'user' variable refers to the user with the skill.
- The 'skill' variable refers to the skill being checked.
- All other skill conditions must be met in order for this to code to count.

---

=== General State-Related Notetags ===

The following notetags are centered around states, such as how their turn
counts are displayed, items and skills that affect state turns, if the state
can avoid removal by death state, etc.

---

<No Death Clear>

- Used for: State Notetags
- Prevents this state from being cleared upon death.
- This allows this state to be added to an already dead battler, too.

---

<No Recover All Clear>

- Used for: State Notetags
- Prevents this state from being cleared upon using the Recover All command.

---

<Group Defeat>

- Used for: State Notetags
- If an entire party is affected by states with the <Group Defeat> notetag,
they are considered defeated.
- Usage for this includes party-wide petrification, frozen, etc.

---

<Reapply Rules: Ignore>
<Reapply Rules: Reset>
<Reapply Rules: Greater>
<Reapply Rules: Add>

- Used for: State Notetags
- Choose what kind of rules this state follows if the state is being applied
to a target that already has the state. This affects turns specifically.
- 'Ignore' will bypass any turn changes.
- 'Reset' will recalculate the state's turns.
- 'Greater' will choose to either keep the current turn count if it's higher
than the reset amount or reset it if the current turn count is lower.
- 'Add' will add the state's turn count to the applied amount.
- If this notetag isn't used, it will use the rules set in the States >
Plugin Parameters.

---

<Positive State>
<Negative State>

- Used for: State Notetags
- Marks the state as a positive state or negative state, also altering the
state's turn count color to match the Plugin Parameter settings.
- This also puts the state into either the 'Positive' category or
'Negative' category.

---

<Category: name>
<Category: name, name, name>

- Used for: State Notetags
- Arranges states into certain/multiple categories.
- Replace 'name' with a category name to mark this state as.
- Insert multiples of this to mark the state with  multiple categories.

---

<Categories>
name
name
</Categories>

- Used for: State Notetags
- Arranges states into certain/multiple categories.
- Replace each 'name' with a category name to mark this state as.

---

<Bypass State Damage Removal: id>
<Bypass State Damage Removal: id, id, id>

<Bypass State Damage Removal: name>
<Bypass State Damage Removal: name, name, name>

- Used for: Skill, Item Notetags
- When this skill/item is used to attack an enemy with the listed state that
would normally have on damage removal (ie Sleep).
- For 'id' variant, replace each 'id' with a number representing the state's
ID to bypass the damage removal for.
- For 'name' variant, replace each 'name' with the state's name to bypass
the damage removal for.
- This can be used for attacks like "Dream Eater" that would prevent waking
up a sleeping opponent.

---

<Bypass State Damage Removal as Attacker: id>
<Bypass State Damage Removal as Attacker: id, id, id>

<Bypass State Damage Removal as Attacker: name>
<Bypass State Damage Removal as Attacker: name, name, name>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- When an attacker with an associated trait object that has this notetag
would attack an enemy with the listed state, bypass on damage removal.
- For 'id' variant, replace each 'id' with a number representing the state's
ID to bypass the damage removal for.
- For 'name' variant, replace each 'name' with the state's name to bypass
the damage removal for.
- This can be used for effects like "Sleep Striker" that would prevent the
attacker from waking up a sleeping opponent.

---

<Bypass State Damage Removal as Target: id>
<Bypass State Damage Removal as Target: id, id, id>

<Bypass State Damage Removal as Target: name>
<Bypass State Damage Removal as Target: name, name, name>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- When a target with an associated trait object that has this notetag is
attacked as the target with the listed state, bypass on damage removal.
- For 'id' variant, replace each 'id' with a number representing the state's
ID to bypass the damage removal for.
- For 'name' variant, replace each 'name' with the state's name to bypass
the damage removal for.
- This can be used for effects like "Deep Sleep" that would prevent the
attacked target from waking up.

---

<Resist State Category: name>
<Resist State Categories: name, name, name>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Causes the affected battler resist the listed categories.
- Replace each 'name' with a category name to resist.
- Insert multiple 'name' entries to add more categories.
- This works exactly like how state resistances work in-game. If a battler
who was originally NOT resistant to "Poison" before gaining a
poison-resistant trait, the "Poison" state will remain because it was
applied before poison-resistance as enabled.

---

<Resist State Categories>
name
name
name
</Resist State Categories>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Causes the affected battler resist the listed categories.
- Replace each 'name' with a category name to resist.
- Insert multiple 'name' entries to add more categories.
- This works exactly like how state resistances work in-game. If a battler
who was originally NOT resistant to "Poison" before gaining a
poison-resistant trait, the "Poison" state will remain because it was
applied before poison-resistance as enabled.

---

<State x Category Remove: y>

<State x Category Remove: All>

- Used for: Skill, Item Notetags
- Allows the skill/item to remove 'y' states from specific category 'x'.
- Replace 'x' with a category name to remove from.
- Replace 'y' with the number of times to remove from that category.
- Use the 'All' variant to remove all of the states of that category.
- Insert multiples of this to remove different types of categories.

---

<Remove Other x States>

- Used for: State Notetags
- When the state with this notetag is added, remove other 'x' category
states from the battler (except for the state being added).
- Replace 'x' with a category name to remove from.
- Insert multiples of this to remove different types of categories.
- Useful for thing state types like stances and forms that there is usually
only one active at a time.

---

<Hide State Turns>

- Used for: State Notetags
- Hides the state turns from being shown at all.
- This will by pass any Plugin Parameter settings.

---

<Turn Color: x>
<Turn Color: #rrggbb>

- Used for: State Notetags
- Hides the state turns from being shown at all.
- Determines the color of the state's turn count.
- Replace 'x' with a number value depicting a window text color.
- Replace 'rrggbb' with a hex color code for a more custom color.

---

<Max Turns: x>

- Used for: State Notetags
- Determines the upper limit on the maximum number of turns for this state.
- Replace 'x' with a number representing the maximum number of turns used
for this state.
- If no notetag is used, refer to the default setting found in the Plugin
Parameters under "State Settings".

---

<State id Turns: +x>
<State id Turns: -x>

<Set State id Turns: x>

<State name Turns: +x>
<State name Turns: -x>

<Set State name Turns: x>

- Used for: Skill, Item Notetags
- If the target is affected by state 'id' or state 'name', change the state
turn duration for target.
- For 'id' variant, replace 'id' with the ID of the state to modify.
- For 'name' variant, replace 'name' with the name of the state to modify.
- Replace 'x' with the value you wish to increase, decrease, or set to.
- Insert multiples of this notetag to affect multiple states at once.

---

<param Buff Turns: +x>
<param Buff Turns: -x>

<Set param Buff Turns: x>

- Used for: Skill, Item Notetags
- If the target is affected by a 'param' buff, change that buff's turn
duration for target.
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter buff to modify.
- Replace 'x' with the value you wish to increase, decrease, or set to.
- Insert multiples of this notetag to affect multiple parameters at once.

---

<param Debuff Turns: +x>
<param Debuff Turns: -x>

<Set param Debuff Turns: x>

- Used for: Skill, Item Notetags
- If the target is affected by a 'param' debuff, change that debuff's turn
duration for target.
- Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
or 'LUK' to determine which parameter debuff to modify.
- Replace 'x' with the value you wish to increase, decrease, or set to.
- Insert multiples of this notetag to affect multiple parameters at once.

---

=== JavaScript Notetags: On Add/Erase/Expire ===

Using JavaScript code, you can use create custom effects that occur when a
state has bee added, erased, or expired.

---

<JS On Add State>
code
code
</JS On Add State>

- Used for: State Notetags
- When a state is added, run the code added by this notetag.
- The 'user' variable refers to the current active battler.
- The 'target' variable refers to the battler affected by this state.
- The 'origin' variable refers to the one who applied this state.
- The 'state' variable refers to the current state being affected.

---

<JS On Erase State>
code
code
</JS On Erase State>

- Used for: State Notetags
- When a state is erased, run the code added by this notetag.
- The 'user' variable refers to the current active battler.
- The 'target' variable refers to the battler affected by this state.
- The 'origin' variable refers to the one who applied this state.
- The 'state' variable refers to the current state being affected.

---

<JS On Expire State>
code
code
</JS On Expire State>

- Used for: State Notetags
- When a state has expired, run the code added by this notetag.
- The 'user' variable refers to the current active battler.
- The 'target' variable refers to the battler affected by this state.
- The 'origin' variable refers to the one who applied this state.
- The 'state' variable refers to the current state being affected.

---

=== JavaScript Notetags: Slip Damage/Healing ===

Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
following notetags allow you to perform custom slip damage/healing.

---

<JS type Slip Damage>
code
code
damage = code;
</JS type Slip Damage>

- Used for: State Notetags
- Code used to determine how much slip damage is dealt to the affected unit
during each regeneration phase.
- Replace 'type' with 'HP', 'MP', or 'TP'.
- Replace 'code' with the calculations on what to determine slip damage.
- The 'user' variable refers to the origin of the state.
- The 'target' variable refers to the affected unit receiving the damage.
- The 'state' variable refers to the current state being affected.
- The 'damage' variable is the finalized slip damage to be dealt.
- When these states are applied via action effects, the slip calculations
are one time calculations made upon applying and the damage is cached to
be used for future on regeneration calculations.
- For that reason, do not include game mechanics here such as adding states,
buffs, debuffs, etc. as this notetag is meant for calculations only. Use
the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
notetags for game mechanics instead.
- Passive states and states with the <JS Slip Refresh> notetag are exempt
from the one time calculation and recalculated each regeneration phase.

---

<JS type Slip Heal>
code
code
heal = code;
</JS type Slip Heal>

- Used for: State Notetags
- Code used to determine how much slip healing is dealt to the affected unit
during each regeneration phase.
- Replace 'type' with 'HP', 'MP', or 'TP'.
- Replace 'code' with the calculations on what to determine slip healing.
- The 'user' variable refers to the origin of the state.
- The 'target' variable refers to the affected unit receiving the healing.
- The 'state' variable refers to the current state being affected.
- The 'heal' variable is the finalized slip healing to be recovered.
- When these states are applied via action effects, the slip calculations
are one time calculations made upon applying and the damage is cached to
be used for future on regeneration calculations.
- For that reason, do not include game mechanics here such as adding states,
buffs, debuffs, etc. as this notetag is meant for calculations only. Use
the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
notetags for game mechanics instead.
- Passive states and states with the <JS Slip Refresh> notetag are exempt
from the one time calculation and recalculated each regeneration phase.

---

<JS Slip Refresh>

- Used for: State Notetags
- Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
start of each regeneration phase to allow for dynamic damage ranges.

---

=== Passive State Notetags ===

Passive States are states that are always applied to actors and enemies
provided that their conditions have been met. These can be granted through
database objects or through the Passive States Plugin Parameters.

---

For those using the code "a.isStateAffected(10)" to check if a target is
affected by a state or not, this does NOT check passive states. This only
checks for states that were directly applied to the target.

This is NOT a bug.

Instead, use "a.states().includes($dataStates[10])" to check for them. This
code will search for both directly applied states and passive states alike.

---

As passive states are NOT considered directly applied to, they do NOT match
a Conditional Branch's state check as well. The Conditional Branch effect
checks for an affected state.

---

Because passive states are NOT directly applied to a battler, the functions
of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
passive states either. This means that any of the related JS notetags tied
to those functions will not occur either.

---

Why are passive states not considered affected by? Let's look at it
differently. There are two ways to grant skills to actors. They can acquire
skills by levels/items/events or they can equip gear that temporarily grants
the skill in question.

Learning the skill is direct. Temporarily granting the skill is indirect.
These two factors have mechanical importance and require differentiation.

Regular states and passive states are the same way. Regular states are
directly applied, therefore, need to be distinguished in order for things
like state turns and steps, removal conditionals, and similar to matter at
all. Passive states are indirect and are therefore, unaffected by state
turns, steps, and removal conditions. These mechanical differences are
important for how RPG Maker works.

---

Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
check if a target has a passive state will return false.

---

<Passive State: x>
<Passive States: x,x,x>

<Passive State: name>
<Passive States: name, name, name>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
- Adds passive state(s) x to trait object, applying it to related actor or
enemy unit(s).
- Replace 'x' with a number to determine which state to add as a passive.
- If using 'name' notetag variant, replace 'name' with the name of the
state(s) to add as a passive.
- Note: If you plan on applying a passive state through a skill, it must be
through a skill that has been learned by the target and not a skill that
is given through a trait.

---

<Passive Stackable>

- Used for: State Notetags
- Makes it possible for this passive state to be added multiple times.
- Otherwise, only one instance of the passive state can be available.

---

<Passive Condition Class: id>
<Passive Condition Classes: id, id, id>

<Passive Condition Class: name>
<Passive Condition Classes: name, name, name>

- Used for: State Notetags
- Determines the passive condition of the passive state based on the actor's
current class. As long as the actor's current class matches one of the
data entries, the passive condition is considered passed.
- For 'id' variant, replace 'id' with a number representing class's ID.
- For 'name' variant, replace 'name' with the class's name.

---

<Passive Condition Multiclass: id>
<Passive Condition Multiclass: id, id, id>

<Passive Condition Multiclass: name>
<Passive Condition Multiclass: name, name, name>

- Used for: State Notetags
- Requires VisuMZ_2_ClassChangeSystem!
- Determines the passive condition of the passive state based on the actor's
multiclasses. As long as the actor has any of the matching classes
assigned as a multiclass, the passive condition is considered passed.
- For 'id' variant, replace 'id' with a number representing class's ID.
- For 'name' variant, replace 'name' with the class's name.

---

<Passive Condition Switch ON: x>

<Passive Condition All Switches ON: x,x,x>
<Passive Condition Any Switch ON: x,x,x>

- Used for: State Notetags
- Determines the passive condition of the passive state based on switches.
- Replace 'x' with the switch ID to determine the state's passive condition.
- If 'All' notetag variant is used, conditions will not be met until all
switches are ON. Then, it would be met.
- If 'Any' notetag variant is used, conditions will be met if any of the
switches are ON. Otherwise, it would not be met.

---

<Passive Condition Switch OFF: x>

<Passive Condition All Switches OFF: x,x,x>
<Passive Condition Any Switch OFF: x,x,x>

- Used for: State Notetags
- Determines the passive condition of the passive state based on switches.
- Replace 'x' with the switch ID to determine the state's passive condition.
- If 'All' notetag variant is used, conditions will not be met until all
switches are OFF. Then, it would be met.
- If 'Any' notetag variant is used, conditions will be met if any of the
switches are OFF. Otherwise, it would not be met.

---

=== Aura & Miasma Notetags ===

Auras are a type passive that affects an allied party. Miasmas are a type of
passive that affects an opposing party. Auras and Miasmas only need to come
from a single source to give an entire party or troop a passive provided
that the battler emitting the aura/miasma is alive and in battle.

---

<Aura State: x>
<Aura States: x, x, x>

<Aura State: name>
<Aura States: name, name, name>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
- Emits an aura that affects the battler's allies and gives each affected
member passive state(s) 'x'.
- Replace 'x' with a number to determine which state to add as a passive
generated by this aura.
- If using 'name' notetag variant, replace 'name' with the name of the
state(s) to add as a passive generated by this aura.
- Note: If you plan on applying an aura effect through a skill, it must be
through a skill that has been learned by the target and not a skill that
is given through a trait.

---

<Miasma State: x>
<Miasma States: x, x, x>

<Miasma State: name>
<Miasma States: name, name, name>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy Notetags
- Emits an miasma that affects the battler's opponents and gives each
affected member passive state(s) 'x'.
- Miasmas do NOT apply outside of battle.
- Replace 'x' with a number to determine which state to add as a passive
generated by this miasma.
- If using 'name' notetag variant, replace 'name' with the name of the
state(s) to add as a passive generated by this miasma.
- Note: If you plan on applying a miasma effect through a skill, it must be
through a skill that has been learned by the target and not a skill that
is given through a trait.

---

<Not User Aura>
<Aura Not For User>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Prevents the emitting user from being affected by the related aura.

---

<Allow Dead Aura>
<Allow Dead Miasma>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Allows aura/miasma to continue emitting even after the emitting user is
in a dead state.
- When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
only affect the auras/miasmas emitted from that object.
- When used with States, the effect will take place as long as it is used
as an aura or miasma regardless of where it is emitting from.
- Takes priority over <Dead Aura Only> and <Dead Miasma Only> notetags.

---

<Dead Aura Only>
<Dead Miasma Only>

- Used for: Actor, Class, Skill, Weapon, Armor, Enemy, State Notetags
- Allows aura/miasma to only emit if the emitting user is in a dead state.
- When used with Actor, Class, Skill, Weapon, Armor, Enemy objects, it will
only affect the auras/miasmas emitted from that object.
- When used with States, the effect will take place as long as it is used
as an aura or miasma regardless of where it is emitting from.

---

=== JavaScript Notetags: Passive State ===

The following is a notetag made for users with JavaScript knowledge to
determine if a passive state's condition can be met.

---

<JS Passive Condition>
code
code
condition = code;
</JS Passive Condition>

- Used for: State Notetags
- Determines the passive condition of the state based on JavaScript code.
- Replace 'code' to determine if a passive state's condition has been met.
- The 'condition' variable returns a boolean (true/false) to determine if
the passive state's condition is met or not.
- The 'user' variable refers to the user affected by the passive state.
- The 'state' variable refers to the passive state being checked.
- All other passive conditions must be met for this code to count.

**NOTE** Not everything can be used as a custom JS Passive Condition due to
limitations of the code. There are failsafe checks to prevent infinite loops
and some passive conditions will not register for this reason and the
conditional checks will behave as if the passive states have NOT been
applied for this reason. Such examples include the following:

- A passive state that requires another passive state
- A passive state that requires a trait effect from another state
- A passive state that requires a parameter value altered by another state
- A passive state that requires equipment to be worn but its equipment type
access is provided by another state.
- Anything else that is similar in style.

---

Plugin Commands

The following are Plugin Commands that come with this plugin. They can be
accessed through the Plugin Command event command.

---

=== Skill Cost Plugin Commands ===

---

Skill Cost: Emulate Actor Pay
- Target actor(s) emulates paying for skill cost.
-

Actor ID(s):
- Select which Actor ID(s) will pay skill cost.

Skill ID:
- What is the ID of the skill to emulate paying the skill cost for?

---

Skill Cost: Emulate Enemy Pay
- Target enemy(s) emulates paying for skill cost.
-

Enemy Index(es):
- Select which enemy index(es) will pay skill cost.

Skill ID:
- What is the ID of the skill to emulate paying the skill cost for?

---

=== State Turns Plugin Commands ===

---

State Turns: Actor State Turns Change By
- Changes actor(s) state turns by an amount.
- Only works on states that can have turns.

Actor ID(s):
- Select which Actor ID(s) to affect.

State ID:
- What is the ID of the state you wish to change turns for?
- Only works on states that can have turns.

Change Turns By:
- How many turns should the state be changed to?
- You may use JavaScript code.

Auto-Add State?:
- Automatically adds state if actor(s) does not have it applied?

---

State Turns: Actor State Turns Change To
- Changes actor(s) state turns to a specific value.
- Only works on states that can have turns.

Actor ID(s):
- Select which Actor ID(s) to affect.

State ID:
- What is the ID of the state you wish to change turns for?
- Only works on states that can have turns.

Change Turns To:
- How many turns should the state be changed to?
- You may use JavaScript code.

Auto-Add State?:
- Automatically adds state if actor(s) does not have it applied?

---

State Turns: Enemy State Turns Change By
- Changes enemy(s) state turns by an amount.
- Only works on states that can have turns.

Enemy Index(es):
- Select which enemy index(es) to affect.

State ID:
- What is the ID of the state you wish to change turns for?
- Only works on states that can have turns.

Change Turns By:
- How many turns should the state be changed to?
- You may use JavaScript code.

Auto-Add State?:
- Automatically adds state if actor(s) does not have it applied?

---

State Turns: Enemy State Turns Change To
- Changes enemy(s) state turns to a specific value.
- Only works on states that can have turns.

Enemy Index(es):
- Select which enemy index(es) to affect.

State ID:
- What is the ID of the state you wish to change turns for?
- Only works on states that can have turns.

Change Turns To:
- How many turns should the state be changed to?
- You may use JavaScript code.

Auto-Add State?:
- Automatically adds state if actor(s) does not have it applied?

---

Plugin Parameters: General Skill Settings

These Plugin Parameters adjust various aspects of the game regarding skills
from the custom Skill Menu Layout to global custom effects made in code.

---

General

Use Updated Layout:
- Use the Updated Skill Menu Layout provided by this plugin?
- This will automatically enable the Status Window.
- This will override the Core Engine windows settings.

Layout Style:
- If using an updated layout, how do you want to style the menu scene?
- Upper Help, Left Input
- Upper Help, Right Input
- Lower Help, Left Input
- Lower Help, Right Input

---

Skill Type Window

Style:
- How do you wish to draw commands in the Skill Type Window?
- Text Only: Display only the text.
- Icon Only: Display only the icon.
- Icon + Text: Display the icon first, then the text.
- Auto: Determine which is better to use based on the size of the cell.

Text Align:
- Text alignment for the Skill Type Window.

Window Width:
- What is the desired pixel width of this window?
- Default: 240

---

List Window

Columns:
- Number of maximum columns.

---

Shop Status Window

Show in Skill Menu?:
- Show the Shop Status Window in the Skill Menu?
- This is enabled if the Updated Layout is on.

Adjust List Window?:
- Automatically adjust the Skill List Window in the Skill Menu if using
the Shop Status Window?

Background Type:
- Select background type for this window.
- 0 - Window
- 1 - Dim
- 2 - Transparent

JS: X, Y, W, H:
- Code used to determine the dimensions for this Shop Status Window in the
Skill Menu.

---

Skill Types

Hidden Skill Types:
- Insert the ID's of the Skill Types you want hidden from view ingame.

Hidden During Battle:
- Insert the ID's of the Skill Types you want hidden during battle only.

Icon: Normal Type:
- Icon used for normal skill types that aren't assigned any icons.
- To assign icons to skill types, simply insert \I[x] into the
skill type's name in the Database > Types tab.

Icon: Magic Type:
- Icon used for magic skill types that aren't assigned any icons.
- To assign icons to skill types, simply insert \I[x] into the
skill type's name in the Database > Types tab.

Sort: Alphabetical:
- Insert the ID's of Skill Types you want sorted alphabetically.

---

Global JS Effects

JS: Skill Conditions:
- JavaScript code for a global-wide skill condition check.

---

Plugin Parameters: Skill Cost Types

Skill Cost Types are the resources that are used for your skills. These can
range from the default MP and TP resources to the newly added HP, Gold, and
Potion resources.

---

Settings

Name:
- A name for this Skill Cost Type.

Icon:
- Icon used for this Skill Cost Type.
- Use 0 for no icon.

Font Color:
- Text Color used to display this cost.
- For a hex color, use #rrggbb with VisuMZ_1_MessageCore

Font Size:
- Font size used to display this cost.

---

Cost Processing

JS: Cost Calculation:
- Code on how to calculate this resource cost for the skill.

JS: Can Pay Cost?:
- Code on calculating whether or not the user is able to pay the cost.

JS: Paying Cost:
- Code for if met, this is the actual process of paying of the cost.

---

Window Display

JS: Show Cost?:
- Code for determining if the cost is shown or not.

JS: Cost Text:
- Code to determine the text (with Text Code support) used for the
displayed cost.

---

Gauge Display

JS: Maximum Value:
- Code to determine the maximum value used for this Skill Cost resource
for gauges.

JS: Current Value:
- Code to determine the current value used for this Skill Cost resource
for gauges.

JS: Draw Gauge:
- Code to determine how to draw the Skill Cost resource for this
gauge type.

---

Plugin Parameters: Gauge Settings

Settings in regards to how skill cost gauges function and appear.

---

Labels

Font Type:
- Which font type should be used for labels?

Match Label Color:
- Match the label color to the Gauge Color being used?

Match: Gauge # ?:
- Which Gauge Color should be matched?

Preset: Gauge Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Solid Outline:
- Make the label outline a solid black color?

Outline Width:
- What width do you wish to use for your outline?
- Use 0 to not use an outline.

---

Values

Font Type:
- Which font type should be used for values?

Solid Outline:
- Make the value outline a solid black color?

Outline Width:
- What width do you wish to use for your outline?
- Use 0 to not use an outline.

---

Plugin Parameters: General State Settings

These are general settings regarding RPG Maker MZ's state-related aspects
from how turns are reapplied to custom code that's ran whenever states are
added, erased, or expired.

---

General

Reapply Rules:
- These are the rules when reapplying states.
- Ignore: State doesn't get added.
- Reset: Turns get reset.
- Greater: Turns take greater value (current vs reset).
- Add: Turns add upon existing turns.

Maximum Turns:
- Maximum number of turns to let states go up to.
- This can be changed with the <Max Turns: x> notetag.

Action End Update:
- States with "Action End" auto-removal will also update turns at the end
of each action instead of all actions.

Turn End on Map:
- Update any state and buff turns on the map after this many steps.
- Use 0 to disable.

---

Turn Display

Show Turns?:
- Display state turns on top of window icons and sprites?

Turn Font Size:
- Font size used for displaying turns.

Offset X:
- Offset the X position of the turn display.

Offset Y:
- Offset the Y position of the turn display.

Turn Font Size:
- Font size used for displaying turns.

Turn Color: Neutral:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Turn Color: Positive:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Turn Color: Negative:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

---

Data Display

Show Data?:
- Display state data on top of window icons and sprites?

Data Font Size:
- Font size used for displaying state data.

Offset X:
- Offset the X position of the state data display.

Offset Y:
- Offset the Y position of the state data display.

---

Global JS Effects

JS: On Add State:
- JavaScript code for a global-wide custom effect whenever a state
is added.

JS: On Erase State:
- JavaScript code for a global-wide custom effect whenever a state
is erased.

JS: On Expire State:
- JavaScript code for a global-wide custom effect whenever a state
has expired.

---

Plugin Parameters: General Buff/Debuff Settings

Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
they do function close enough for them to be added to this plugin for
adjusting. Change these settings to make buffs and debuffs work to your
game's needs.

---

General

Reapply Rules:
- These are the rules when reapplying buffs/debuffs.
- Ignore: Buff/Debuff doesn't get added.
- Reset: Turns get reset.
- Greater: Turns take greater value (current vs reset).
- Add: Turns add upon existing turns.

Maximum Turns:
- Maximum number of turns to let buffs and debuffs go up to.

---

Stacking

Max Stacks: Buff:
- Maximum number of stacks for buffs.

Max Stacks: Debuff:
- Maximum number of stacks for debuffs.

JS: Buff/Debuff Rate:
- Code to determine how much buffs and debuffs affect parameters.

---

Turn Display

Show Turns?:
- Display buff and debuff turns on top of window icons and sprites?

Turn Font Size:
- Font size used for displaying turns.

Offset X:
- Offset the X position of the turn display.

Offset Y:
- Offset the Y position of the turn display.

Turn Color: Buffs:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Turn Color: Debuffs:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

---

Rate Display

Show Rate?:
- Display buff and debuff rate on top of window icons and sprites?

Rate Font Size:
- Font size used for displaying rate.

Offset X:
- Offset the X position of the rate display.

Offset Y:
- Offset the Y position of the rate display.

---

Global JS Effects

JS: On Add Buff:
- JavaScript code for a global-wide custom effect whenever a
buff is added.

JS: On Add Debuff:
- JavaScript code for a global-wide custom effect whenever a
debuff is added.

JS: On Erase Buff:
- JavaScript code for a global-wide custom effect whenever a
buff is added.

JS: On Erase Debuff:
- JavaScript code for a global-wide custom effect whenever a
debuff is added.

JS: On Expire Buff:
- JavaScript code for a global-wide custom effect whenever a
buff is added.

JS: On Expire Debuff:
- JavaScript code for a global-wide custom effect whenever a
debuff is added.

---

Plugin Parameters: Passive State Settings

These Plugin Parameters adjust passive states that can affect all actors and
enemies as well as have global conditions.

---

For those using the code "a.isStateAffected(10)" to check if a target is
affected by a state or not, this does NOT check passive states. This only
checks for states that were directly applied to the target.

This is NOT a bug.

Instead, use "a.states().includes($dataStates[10])" to check for them. This
code will search for both directly applied states and passive states alike.

---

As passive states are NOT considered directly applied to, they do NOT match
a Conditional Branch's state check as well. The Conditional Branch effect
checks for an affected state.

---

Because passive states are NOT directly applied to a battler, the functions
of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
passive states either. This means that any of the related JS notetags tied
to those functions will not occur either.

---

Why are passive states not considered affected by? Let's look at it
differently. There are two ways to grant skills to actors. They can acquire
skills by levels/items/events or they can equip gear that temporarily grants
the skill in question.

Learning the skill is direct. Temporarily granting the skill is indirect.
These two factors have mechanical importance and require differentiation.

Regular states and passive states are the same way. Regular states are
directly applied, therefore, need to be distinguished in order for things
like state turns and steps, removal conditionals, and similar to matter at
all. Passive states are indirect and are therefore, unaffected by state
turns, steps, and removal conditions. These mechanical differences are
important for how RPG Maker works.

---

Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
check if a target has a passive state will return false.

---

List

Global Passives:
- A list of passive states to affect actors and enemies.

Actor-Only Passives:
- A list of passive states to affect actors only.

Enemy Passives:
- A list of passive states to affect enemies only.

---

Cache

Switch Refresh?:
- Refresh all battle members when switches are changed in battle?
- This is primarily used for passive state conditions involve parameters
that do not update due to cached data until a refresh occurs.
- If this is on, do not spam Switch changes during battle in order to
prevent lag spikes.

Variable Refresh?:
- Refresh all battle members when variables are changed in battle?
- This is primarily used for passive state conditions involve parameters
that do not update due to cached data until a refresh occurs.
- If this is on, do not spam Variable changes during battle in order to
prevent lag spikes.

---

Global JS Effects

JS: Condition Check:
- JavaScript code for a global-wide passive condition check.

---
```
