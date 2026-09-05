# VisuMZ_1_BattleCore

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_1_BattleCore`
- Contract: [RPG Maker MZ] [Tier 1] [BattleCore]
- Required plugins: None declared
- Declared load order: after VisuMZ_0_CoreEngine
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| BattleCore | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| AutoBattle:struct | Auto Battle Settings | — | struct&lt;AutoBattle&gt; | {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"} | — | Settings pertaining to Auto Battle. |
| Damage:struct | Damage Settings | — | struct&lt;Damage&gt; | {"DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"\[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() &amp;&amp; !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() &amp;&amp; !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() &amp;&amp; !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor &gt;= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level \|\| a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat &lt; ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level \|\| a.luk, 1);\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level \|\| a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() \|\| this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level \|\| a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() \|\| this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() &amp;&amp; !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor &gt;= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments\[0\];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level \|\| a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"\]","Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupPosition:str":"base","PopupOffsetX:num":"0","PopupOffsetY:num":"0","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"\[255, 0, 0, 160\]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments\[0\];\\nconst critical = arguments\[1\];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue &lt; 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments\[0\];\\nconst variance = arguments\[1\];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage &gt;= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments\[0\];\\nconst target = arguments\[1\];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/&lt;UNBLOCKABLE&gt;/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage &lt; 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments\[0\];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/&lt;ALWAYS CRITICAL&gt;/i)) {\\n    return 1;\\n}\\nif (note.match(/&lt;SET CRITICAL RATE:\[ \](\\\\d+)(\[%％\])&gt;/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/&lt;MODIFY CRITICAL RATE:\[ \](\\\\d+)(\[%％\])&gt;/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/&lt;MODIFY CRITICAL RATE:\[ \](\[\\\\+\\\\-\]\\\\d+)(\[%％\])&gt;/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/&lt;JS CRITICAL RATE&gt;\\\\s*(\[\\\\s\\\\S\]*)\\\\s*&lt;\\\\/JS CRITICAL RATE&gt;/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments\[0\];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\nif (this.isHpRecover() \|\| this.isMpRecover()) {\\n    bonusDamage *= -1;\\n}\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/&lt;MODIFY CRITICAL MULTIPLIER:\[ \](\\\\d+)(\[%％\])&gt;/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/&lt;MODIFY CRITICAL MULTIPLIER:\[ \](\[\\\\+\\\\-\]\\\\d+)(\[%％\])&gt;/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/&lt;MODIFY CRITICAL BONUS DAMAGE:\[ \](\\\\d+)(\[%％\])&gt;/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/&lt;MODIFY CRITICAL BONUS DAMAGE:\[ \](\[\\\\+\\\\-\]\\\\d+)(\[%％\])&gt;/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/&lt;JS CRITICAL DAMAGE&gt;\\\\s*(\[\\\\s\\\\S\]*)\\\\s*&lt;\\\\/JS CRITICAL DAMAGE&gt;/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\""} | — | Settings pertaining to damage calculations. |
| Mechanics:struct | Mechanics Settings | — | struct&lt;Mechanics&gt; | {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"\[\"1\"\]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments\[0\];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments\[0\];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments\[0\];\\nconst target = arguments\[1\];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments\[0\];\\nconst target = arguments\[1\];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments\[0\];\\nconst target = arguments\[1\];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments\[0\];\\nconst target = arguments\[1\];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments\[0\];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments\[0\];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""} | — | Settings pertaining to various game mechanics. |
| CmdWindows | -------------------------- | — | — | ---------------------------------- | — | — |
| BattleLayout:struct | Battle Layout Settings | — | struct&lt;BattleLayout&gt; | {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","CommandWidth:num":"192","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"} | — | Settings that adjust how the battle layout appears. |
| BattleLog:struct | Battle Log Settings | — | struct&lt;BattleLog&gt; | {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"} | — | Settings that adjust how Window_BattleLog behaves. |
| BattlebackScale:struct | Battleback Scaling | — | struct&lt;Battleback&gt; | {"DefaultStyle:str":"MZ","jsOneForOne:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst scale = 1.0;\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = 0;\\nthis.y = 0;\"","jsScaleToFit:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = this.width / this.bitmap.width;\\nconst ratioY = this.height / this.bitmap.height;\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScaleDown:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\"","jsScale Up:func":"\"// Adjust Size\\nthis.width = Graphics.width;\\nthis.height = Graphics.height;\\n\\n// Adjust Scale\\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\\nconst scale = Math.max(ratioX, ratioY);\\nthis.scale.x = scale;\\nthis.scale.y = scale;\\n\\n// Adjust Coordinates\\nthis.x = (Graphics.width - this.width) / 2;\\nthis.y = Graphics.height - this.height;\""} | — | Settings that adjust how battlebacks scale. |
| PartyCmd:struct | Party Command Window | — | struct&lt;PartyCmd&gt; | {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."} | — | Settings that alter the Party Command Window in battle. |
| ActorCmd:struct | Actor Command Window | — | struct&lt;ActorCmd&gt; | {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"\[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"\]","ShowCosts:eval":"true","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C\[16\]%1\\C\[0\] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat.","HelpParty:str":"Automatically choose an action suitable for combat."} | — | Settings that alter the Actor Command Window in battle. |
| InBattleStatus:struct | In-Battle Status Window | — | struct&lt;InBattleStatus&gt; | {"General":"","CmdIconStatus:num":"87","StatusGraphic:str":"face","HelpStatus:str":"View battle member status.","Enemy":"","enemyStatus:eval":"true","enemyShowLevel:eval":"true","enemyHiddenParameter:str":"???","enemyShowParametersAlways:eval":"false","enemyShowParametersIfBattleTest:eval":"true","enemyShowParametersIfDefeated:eval":"true","PageButtons":"","pageOffsetX:num":"+0","pageOffsetY:num":"+0","pageButtons:eval":"true","Parameters":"","buffValueFmt:str":"▲%1","debuffValueFmt:str":"▼%1","States":"","statesMaxWidth:num":"384","drawStates:eval":"true","drawBuffs:eval":"true","drawDebuffs:eval":"true","BuffsDebuffs":"","buffNameFmt:str":"%1▲","debuffNameFmt:str":"%1▼","NormalState":"","normalIcon:num":"84","normalText:str":"Normal","HelpDesc":"","stateHelpFmt:json":"\"%1 %2\"","buffHelpFmt:json":"\"Increases %1 to %3%2\\\\C\[0\]. %4\"","debuffHelpFmt:json":"\"Decreases %1 to %3%2\\\\C\[0\]. %4\"","normalHelp:json":"\"Status is currently normal.\"","TurnHelpDesc":"","actionsFmt:str":"\\C\[6\](Actions %2%1\\C\[6\])\\C\[0\]","TurnsFmt:str":"\\C\[5\](Turns %2%1\\C\[5\])\\C\[0\]","passiveText:str":"\\C\[4\](Passive)\\C\[0\]","Window":"","StatusWindow_BgType:num":"0","StatusWindow_DrawJS:func":"\"{ // Draw Face and Simple Status\\n    const x = this.colSpacing() / 2;\\n    const h = ImageManager.faceHeight;\\n    const y = h / 2 - this.lineHeight() * 1.5;\\n    this.drawActorGraphic(this._battler, x + 1, 0, ImageManager.faceWidth, h);\\n    this.drawActorSimpleStatus(this._battler, x + 180, y);\\n}\\n{ // Draw Actor Parameters\\n    let maxWidth = this.drawingAreaWidth();\\n    let x1 = 0;\\n    let x2 = Math.ceil(this.drawingAreaWidth() / 2);\\n\\n    let counter = 0;\\n    const params = this.displayedParams();\\n\\n    let px = x1;\\n    const availableHeight = this.innerHeight - ImageManager.faceHeight;\\n    const paramHeight = Math.ceil(params.length / 2) * this.lineHeight();\\n    let py = Math.ceil((availableHeight - paramHeight) / 2) + ImageManager.faceHeight;\\n    let pw = Math.floor(maxWidth / 2);\\n\\n    if (this._statesWindow.y !== 0) {\\n        this._statesWindow.y = py;\\n    }\\n\\n    for (const param of params) {\\n        this.drawDarkRect(px, py, pw, this.lineHeight());\\n        this.drawParamData(param, px, py, pw);\\n        counter++;\\n        if (counter % 2 === 0) {\\n            px = x1;\\n            py += this.lineHeight();\\n        } else {\\n            px = x2;\\n        }\\n    }\\n}\"","StatusWindow_RectJS:func":"\"const wx = Graphics.boxWidth &gt; 1000 ? 120 : 0;\\nconst wy = this._helpWindow.y + this._helpWindow.height;\\nconst ww = Graphics.boxWidth - (wx * 2);\\nconst wh = Graphics.boxHeight - wy - this.windowAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\""} | — | Settings that alter the In-Battle Status window accessed through the "Status" command. |
| MultiTarget:struct | Multi-Target Windows | — | struct&lt;MultiTarget&gt; | {"Properties":"","WindowWidth:num":"280","BgType:num":"2","ShowButton:eval":"true","Vocab":"","AllActorsText:str":"All Allies","AllEnemiesText:str":"All Enemies","Offsets":"","ActorOffsets":"","ActorOffsetX:num":"+0","ActorOffsetY:num":"+0","EnemyOffsets":"","EnemyOffsetX:num":"+0","EnemyOffsetY:num":"+0"} | — | Settings that alter the Multi-Target Windows in battle. |
| ComboWindow:struct | Damage Combo Window | — | struct&lt;ComboWindow&gt; | {"General":"","Enable:eval":"true","Appearance":"","CustomFontFace:str":"Arial","TextAlign:str":"left","ComboWindow_DrawJS:func":"\"// Declare Coordinates\\nlet x = 0;\\nlet y = 0;\\n\\n// Hit Text\\nconst hitText = this.hitText();\\nconst hitTextSize = this.textSizeEx(hitText);\\nif (this.textAlignment() === 'right') {\\n    x = this.innerWidth - this.itemPadding() - hitTextSize.width;\\n} else if (this.textAlignment() === 'center') {\\n    x = Math.floor((this.innerWidth - hitTextSize.width) / 2);\\n} else {\\n    x = this.itemPadding();\\n}\\nthis.drawTextEx(hitText, x, y);\\n\\n// New Line\\ny += Math.ceil(this.lineHeight() * 2/3);\\n\\n// Damage Text\\nconst dmgText = this.damageText();\\nconst dmgTextSize = this.textSizeEx(dmgText);\\nif (this.textAlignment() === 'right') {\\n    x = this.innerWidth - this.itemPadding() - dmgTextSize.width;\\n} else if (this.textAlignment() === 'center') {\\n    x = Math.floor((this.innerWidth - dmgTextSize.width) / 2);\\n} else {\\n    x = this.itemPadding();\\n}\\nthis.drawTextEx(dmgText, x, y);\"","Vocab":"","hitsDmgFmt:str":"\\C\[6\]%1\\} \\C\[4\]Hit Combo\\C\[0\]\\{","hitsHealFmt:str":"\\C\[6\]%1\\} \\C\[4\]Heal Combo\\C\[0\]\\{","totalDmgFmt:str":"\\}\\C\[21\]Total Damage: \\{\\C\[0\]%1","totalHealFmt:str":"\\}\\C\[21\]Total Healing: \\{\\C\[24\]+%1\\C\[0\]","Position":"","fadeShiftX:num":"-2","fadeShiftY:num":"+0","PosOffsetX:num":"+0","PosOffsetY:num":"+0","ComboWindow_RectJS:func":"\"const ww = Math.ceil(Graphics.width / 4);\\nconst wh = this.calcWindowHeight(2, true);\\nconst wx = 0 + this.comboWindowOffsetX();\\nconst wy = Math.round(Graphics.boxHeight * 1 / 3) + this.comboWindowOffsetY();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Update":"","updateDuration:num":"20","minimumStayDuration:num":"40","minimumHits:num":"1","opacitySpeed:num":"16"} | — | Settings that alter the damage/healing combo window displayed in battle. |
| VisualBreak | -------------------------- | — | — | ---------------------------------- | — | — |
| Actor:struct | Actor Battler Settings | — | struct&lt;Actor&gt; | {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","ChantStyle:eval":"true","OffsetX:num":"0","OffsetY:num":"0","MotionSpeed:num":"12","PrioritySortActive:eval":"true","PrioritySortActors:eval":"false","Shadow:eval":"true","SmoothImage:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments\[0\];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /&lt;SIDEVIEW HOME OFFSET:\[ \](\[\\\\+\\\\-\]\\\\d+),\[ \](\[\\\\+\\\\-\]\\\\d+)&gt;/i;\\nconst xOffsets = actor.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) =&gt; r + offset, x);\\ny = yOffsets.reduce((r, offset) =&gt; r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""} | — | Settings that alter various properties for actors. |
| Enemy:struct | Enemy Battler Settings | — | struct&lt;Enemy&gt; | {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","OffsetX:num":"0","OffsetY:num":"0","SmoothImage:eval":"true","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"} | — | Settings that alter various properties for enemies. |
| HpGauge:struct | HP Gauge Settings | — | struct&lt;HpGauge&gt; | {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"} | — | Settings that adjust the visual HP Gauge displayed in battle. |
| ActionSequence:struct | Action Sequence Settings | — | struct&lt;ActionSequence&gt; | {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"53","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"} | — | Settings that adjust how certain Action Sequences work. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: AutoBattle

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BattleDisplay | Battle Display | — | — | — | — | — |
| AutoBattleMsg:str | Message | BattleDisplay | — | Press %1 or %2 to stop Auto Battle | — | Message that's displayed when Auto Battle is on. Text codes allowed. %1 - OK button, %2 - Cancel button |
| AutoBattleOK:str | OK Button | BattleDisplay | — | OK | — | Text used to represent the OK button. If VisuMZ_0_CoreEngine is present, ignore this. |
| AutoBattleCancel:str | Cancel Button | BattleDisplay | — | Cancel | — | Text used to represent the Cancel button. If VisuMZ_0_CoreEngine is present, ignore this. |
| AutoBattleBgType:num | Background Type | BattleDisplay | select | 1 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for Auto Battle window. |
| AutoBattleRect:func | JS: X, Y, W, H | BattleDisplay | note | "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);" | — | Code used to determine the dimensions for this window. |
| Options | — | — | — | — | — | — |
| AddOption:eval | Add Option? | Options | boolean | true | — | Add the Auto Battle options to the Options menu? |
| AdjustRect:eval | Adjust Window Height | Options | boolean | true | — | Automatically adjust the options window height? |
| StartName:str | Startup Name | Options | — | Auto Battle Start | — | Command name of the option. |
| StyleName:str | Style Name | Options | — | Auto Battle Style | — | Command name of the option. |
| StyleOFF:str | OFF | StyleName:str | — | Attack | — | Text displayed when Auto Battle Style is OFF. |
| StyleON:str | ON | StyleName:str | — | Skills | — | Text displayed when Auto Battle Style is ON. |

### Struct: Damage

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| DamageStyles | Damage Styles | — | — | — | — | — |
| DefaultDamageStyle:str | Default Style | DamageStyles | — | Standard | — | Which Damage Style do you want to set as default? Use 'Manual' to not use any styles at all. |
| DamageStyleList:arraystruct | Style List | DamageStyles | struct&lt;DamageStyle&gt;\[\] | \["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() &amp;&amp; !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 0)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() &amp;&amp; !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() &amp;&amp; !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor &gt;= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level \|\| a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat &lt; ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level \|\| a.luk, 1);\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level \|\| a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() \|\| this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level \|\| a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() \|\| this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() &amp;&amp; !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor &gt;= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments\[0\];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level \|\| a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() &amp;&amp; (this.isDamage() \|\| this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() &amp;&amp; this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() &amp;&amp; this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"\] | — | A list of the damage styles available. These are used to calculate base damage. |
| Cap | Damage Cap | — | — | — | — | — |
| EnableDamageCap:eval | Enable Damage Cap? | Cap | boolean | false | — | Put a maximum hard damage cap on how far damage can go? This can be broken through the usage of notetags. |
| DefaultHardCap:num | Default Hard Cap | EnableDamageCap:eval | number | 9999 | — | The default hard damage cap used before applying damage. |
| EnableSoftCap:eval | Enable Soft Cap? | Cap | boolean | false | — | Soft caps ease in the damage values leading up to the hard damage cap. Requires hard Damage Cap enabled. |
| DefaultSoftCap:num | Base Soft Cap Rate | EnableSoftCap:eval | — | 0.80 | — | The default soft damage cap used before applying damage. |
| DefaultSoftScaler:num | Soft Scale Constant | EnableSoftCap:eval | — | 0.1275 | — | The default soft damage cap used before applying damage. |
| Popups | — | — | — | — | — | — |
| PopupDuration:num | Popup Duration | Popups | number | 128 | — | Adjusts how many frames a popup stays visible. |
| NewPopupBottom:eval | Newest Popups Bottom | Popups | boolean | true | — | Puts the newest popups at the bottom. |
| PopupPosition:str | Appear Position | Popups | select | base | Head - At the top of the battler.=head; Center - At the center of the battler.=center; Base - At the foot of the battler.=base | Selects where you want popups to appear relative to the battler. |
| EndBattlePopups:eval | End Battle Show? | Popups | boolean | true | — | Show or hide popups upon victory or escape? Used to hide battle-state removal popups. |
| PopupOffsetX:num | Offset X | Popups | — | 0 | — | Sets how much to offset the sprites by horizontally. Negative values go left. Positive values go right. |
| PopupOffsetY:num | Offset Y | Popups | — | 0 | — | Sets how much to offset the sprites by vertically. Negative values go up. Positive values go down. |
| PopupShiftX:num | Shift X | Popups | — | 8 | — | Sets how much to shift the sprites by horizontally. Negative values go left. Positive values go right. |
| PopupShiftY:num | Shift Y | Popups | — | -28 | — | Sets how much to shift the sprites by vertically. Negative values go up. Positive values go down. |
| hpDamageFmt:str | HP Damage Format | Popups | — | -%1 | — | Determines HP damage format for popup. %1 - Value, %2 - HP Text |
| hpHealingFmt:str | HP Healing Format | Popups | — | +%1 | — | Determines HP healing format for popup. %1 - Value, %2 - HP Text |
| mpDamageFmt:str | MP Damage Format | Popups | — | -%1 %2 | — | Determines MP damage format for popup. %1 - Value, %2 - MP Text |
| mpHealingFmt:str | MP Healing Format | Popups | — | +%1 %2 | — | Determines MP healing format for popup. %1 - Value, %2 - MP Text |
| CriticalColor:eval | Critical Flash Color | Popups | — | \[255, 0, 0, 160\] | — | Adjust the popup's flash color. Format: \[red, green, blue, alpha\] |
| CriticalDuration:num | Critical Duration | Popups | number | 128 | — | Adjusts how many frames a the flash lasts. |
| Formulas | — | — | — | — | — | — |
| OverallFormulaJS:func | JS: Overall Formula | Formulas | note | "// Declare Constants\nconst target = arguments\[0\];\nconst critical = arguments\[1\];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue &lt; 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;" | — | The overall formula used when calculating damage. |
| VarianceFormulaJS:func | JS: Variance Formula | Formulas | note | "// Declare Constants\nconst damage = arguments\[0\];\nconst variance = arguments\[1\];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage &gt;= 0 ? damage + v : damage - v;" | — | The formula used when damage variance. |
| GuardFormulaJS:func | JS: Guard Formula | Formulas | note | "// Declare Constants\nconst damage = arguments\[0\];\nconst target = arguments\[1\];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/&lt;UNBLOCKABLE&gt;/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage &lt; 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;" | — | The formula used when damage is guarded. |
| Critical | Critical Hits | — | — | — | — | — |
| CriticalHitRateJS:func | JS: Rate Formula | Critical | note | "// Declare Constants\nconst user = this.subject();\nconst target = arguments\[0\];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/&lt;ALWAYS CRITICAL&gt;/i)) {\n    return 1;\n}\nif (note.match(/&lt;SET CRITICAL RATE:\[ \](\\d+)(\[%％\])&gt;/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/&lt;MODIFY CRITICAL RATE:\[ \](\\d+)(\[%％\])&gt;/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/&lt;MODIFY CRITICAL RATE:\[ \](\[\\+\\-\]\\d+)(\[%％\])&gt;/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/&lt;JS CRITICAL RATE&gt;\\s*(\[\\s\\S\]*)\\s*&lt;\\/JS CRITICAL RATE&gt;/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;" | — | The formula used to calculate Critical Hit Rates. |
| CriticalHitMultiplier:func | JS: Damage Formula | Critical | note | "// Declare Constants\nconst user = this.subject();\nlet damage = arguments\[0\];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/&lt;MODIFY CRITICAL MULTIPLIER:\[ \](\\d+)(\[%％\])&gt;/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/&lt;MODIFY CRITICAL MULTIPLIER:\[ \](\[\\+\\-\]\\d+)(\[%％\])&gt;/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/&lt;MODIFY CRITICAL BONUS DAMAGE:\[ \](\\d+)(\[%％\])&gt;/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/&lt;MODIFY CRITICAL BONUS DAMAGE:\[ \](\[\\+\\-\]\\d+)(\[%％\])&gt;/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/&lt;JS CRITICAL DAMAGE&gt;\\s*(\[\\s\\S\]*)\\s*&lt;\\/JS CRITICAL DAMAGE&gt;/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;" | — | The formula used to calculate Critical Hit Damage modification. |

### Struct: DamageStyle

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Name:str | Name | — | — | Untitled | — | Name of this Damage Style. Used for notetags and such. |
| Formula:func | JS: Formula | Name:str | note | "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = \[3, 4\].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;" | — | The base formula for this Damage Style. |
| ItemsEquipsCore | Items &amp; Equips Core | — | — | — | — | — |
| DamageType | Damage Label | ItemsEquipsCore | — | — | — | — |
| DamageType1:str | HP Damage | DamageType | — | %1 Damage Multiplier | — | Vocabulary used for this data entry. |
| DamageType2:str | MP Damage | DamageType | — | %1 Damage Multiplier | — | Vocabulary used for this data entry. |
| DamageType3:str | HP Recovery | DamageType | — | %1 Recovery Multiplier | — | Vocabulary used for this data entry. |
| DamageType4:str | MP Recovery | DamageType | — | %1 Recovery Multiplier | — | Vocabulary used for this data entry. |
| DamageType5:str | HP Drain | DamageType | — | %1 Drain Multiplier | — | Vocabulary used for this data entry. |
| DamageType6:str | MP Drain | DamageType | — | %1 Drain Multiplier | — | Vocabulary used for this data entry. |
| DamageDisplay:func | JS: Damage Display | ItemsEquipsCore | note | "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}" | — | Code used the data displayed for this category. |

### Struct: Mechanics

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| ActionSpeed | Action Speed | — | — | — | — | — |
| AllowRandomSpeed:eval | Allow Random Speed? | ActionSpeed | boolean | false | — | Allow speed to be randomized base off the user's AGI? |
| SyncBuffExpire:eval | Turn End Buffs Expire | ActionSpeed | boolean | false | — | Normally, buffs expire after all actions end. But here, you can have buffs expire on turn end. |
| CalcActionSpeedJS:func | JS: Calculate | ActionSpeed | note | "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;" | — | Code used to calculate action speed. |
| BaseTroop | Base Troop | — | — | — | — | — |
| BaseTroopIDs:arraynum | Base Troop ID's | BaseTroop | troop\[\] | \["1"\] | — | Select the Troop ID(s) to duplicate page events from for all other troops. |
| CommonEvents | Common Events (on Map) | — | — | — | — | — |
| BattleStartEvent:num | Pre-Battle Event | CommonEvents | common_event | 0 | — | Common Event to run before each battle on map. Use to 0 to not run any Common Event at all. |
| BattleEndEvent:num | Post-Battle Event | CommonEvents | common_event | 0 | — | Queued Common Event to run after each battle on map. Use to 0 to not run any Common Event at all. |
| VictoryEvent:num | Victory Event | CommonEvents | common_event | 0 | — | Queued Common Event to run upon victory on map. Use to 0 to not run any Common Event at all. |
| DefeatEvent:num | Defeat Event | CommonEvents | common_event | 0 | — | Queued Common Event to run upon defeat on map. Use to 0 to not run any Common Event at all. |
| EscapeSuccessEvent:num | Escape Success Event | CommonEvents | common_event | 0 | — | Queued Common Event to run upon escape success on map. Use to 0 to not run any Common Event at all. |
| EscapeFailEvent:num | Escape Fail Event | CommonEvents | common_event | 0 | — | Queued Common Event to run upon escape failure on map. Use to 0 to not run any Common Event at all. |
| Escape | — | — | — | — | — | — |
| CalcEscapeRatioJS:func | JS: Calc Escape Ratio | Escape | note | "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;" | — | Code used to calculate the escape success ratio. |
| CalcEscapeRaiseJS:func | JS: Calc Escape Raise | Escape | note | "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;" | — | Code used to calculate how much the escape success ratio raises upon each failure. |
| Switches | — | — | — | — | — | — |
| SwitchCritical:num | Switch: Critical | Switches | switch | 0 | — | Turns switch ON if the action performs a critical hit. Switch reverts to OFF whenever an action starts. |
| SwitchMissEvade:num | Switch: Miss/Evade | Switches | switch | 0 | — | Turns switch ON if the action misses/is evaded. Switch reverts to OFF whenever an action starts. |
| Variables | — | — | — | — | — | — |
| VariableDmg:num | Variable: Damage | Variables | variable | 0 | — | Variable records target damage during action. Variable reverts to 0 whenever an action starts. |
| VariableHeal:num | Variable: Healing | Variables | variable | 0 | — | Variable records target healing during action. Variable reverts to 0 whenever an action starts. |
| BattleJS | JS: Battle-Related | — | — | — | — | — |
| PreStartBattleJS:func | JS: Pre-Start Battle | BattleJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: BattleManager.startBattle() JavaScript code occurs before function is run. |
| PostStartBattleJS:func | JS: Post-Start Battle | BattleJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: BattleManager.startBattle() JavaScript code occurs after function is run. |
| BattleVictoryJS:func | JS: Battle Victory | BattleJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: BattleManager.processVictory() JavaScript code occurs before function is run. |
| EscapeSuccessJS:func | JS: Escape Success | BattleJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: BattleManager.onEscapeSuccess() JavaScript code occurs before function is run. |
| EscapeFailureJS:func | JS: Escape Failure | BattleJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: BattleManager.onEscapeFailure() JavaScript code occurs before function is run. |
| BattleDefeatJS:func | JS: Battle Defeat | BattleJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: BattleManager.processDefeat() JavaScript code occurs before function is run. |
| PreEndBattleJS:func | JS: Pre-End Battle | BattleJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: BattleManager.endBattle() JavaScript code occurs before function is run. |
| PostEndBattleJS:func | JS: Post-End Battle | BattleJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: BattleManager.endBattle() JavaScript code occurs after function is run. |
| TurnJS | JS: Turn-Related | — | — | — | — | — |
| PreStartTurnJS:func | JS: Pre-Start Turn | TurnJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: BattleManager.startTurn() JavaScript code occurs before function is run. |
| PostStartTurnJS:func | JS: Post-Start Turn | TurnJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: BattleManager.startTurn() JavaScript code occurs after function is run. |
| PreEndTurnJS:func | JS: Pre-End Turn | TurnJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: Game_Battler.prototype.onTurnEnd() JavaScript code occurs before function is run. |
| PostEndTurnJS:func | JS: Post-End Turn | TurnJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: Game_Battler.prototype.onTurnEnd() JavaScript code occurs after function is run. |
| PreRegenerateJS:func | JS: Pre-Regenerate | TurnJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: Game_Battler.prototype.regenerateAll() JavaScript code occurs before function is run. |
| PostRegenerateJS:func | JS: Post-Regenerate | TurnJS | note | "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n" | — | Target function: Game_Battler.prototype.regenerateAll() JavaScript code occurs after function is run. |
| ActionJS | JS: Action-Related | — | — | — | — | — |
| PreStartActionJS:func | JS: Pre-Start Action | ActionJS | note | "// Declare Constants\nconst value = arguments\[0\];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n" | — | Target function: BattleManager.startAction() JavaScript code occurs before function is run. |
| PostStartActionJS:func | JS: Post-Start Action | ActionJS | note | "// Declare Constants\nconst value = arguments\[0\];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n" | — | Target function: BattleManager.startAction() JavaScript code occurs after function is run. |
| PreApplyJS:func | JS: Pre-Apply | ActionJS | note | "// Declare Constants\nconst value = arguments\[0\];\nconst target = arguments\[1\];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;" | — | Target function: Game_Action.prototype.apply() JavaScript code occurs before function is run. |
| PreDamageJS:func | JS: Pre-Damage | ActionJS | note | "// Declare Constants\nconst value = arguments\[0\];\nconst target = arguments\[1\];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;" | — | Target function: Game_Action.prototype.executeDamage() JavaScript code occurs before function is run. |
| PostDamageJS:func | JS: Post-Damage | ActionJS | note | "// Declare Constants\nconst value = arguments\[0\];\nconst target = arguments\[1\];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;" | — | Target function: Game_Action.prototype.executeDamage() JavaScript code occurs after function is run. |
| PostApplyJS:func | JS: Post-Apply | ActionJS | note | "// Declare Constants\nconst value = arguments\[0\];\nconst target = arguments\[1\];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;" | — | Target function: Game_Action.prototype.apply() JavaScript code occurs after function is run. |
| PreEndActionJS:func | JS: Pre-End Action | ActionJS | note | "// Declare Constants\nconst value = arguments\[0\];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n" | — | Target function: BattleManager.endAction() JavaScript code occurs before function is run. |
| PostEndActionJS:func | JS: Post-End Action | ActionJS | note | "// Declare Constants\nconst value = arguments\[0\];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n" | — | Target function: BattleManager.endAction() JavaScript code occurs after function is run. |

### Struct: BattleLayout

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Style:str | Battle Layout Style | — | select | default | Default - Shows actor faces in Battle Status.=default; List - Lists actors in Battle Status.=list; XP - Shows actor battlers in a stretched Battle Status.=xp; Portrait - Shows portraits in a stretched Battle Status.=portrait; Border - Displays windows around the screen border.=border; Frontview Battle UI - Requires VisuMZ_3_FrontviewBattleUI=frontview_ui; Sideview Battle UI - Requires VisuMZ_3_SideviewBattleUI=sideview_ui | The style used for the battle layout. |
| ListStyle | List Style | Style:str | — | — | — | — |
| ShowFacesListStyle:eval | Show Faces | ListStyle | boolean | true | — | Shows faces in List Style? |
| CommandWidth:num | Command Window Width | ListStyle | number | 192 | — | Determine the window width for the Party and Actor Command Windows. Affects Default and List Battle Layout styles. |
| XPStyle | XP Style | Style:str | — | — | — | — |
| XPActorCommandLines:num | Command Lines | XPStyle | number | 4 | — | Number of action lines in the Actor Command Window for the XP Style. |
| XPActorDefaultHeight:num | Sprite Height | XPStyle | number | 64 | — | Default sprite height used when if the sprite's height has not been determined yet. |
| XPSpriteYLocation:str | Sprite Base Location | XPStyle | select | name | Above Name - Sprite is located above the name.=name; Bottom - Sprite is located at the bottom of the window.=bottom; Centered - Sprite is centered in the window.=center; Top - Sprite is located at the top of the window.=top | Determine where the sprite is located on the Battle Status Window. |
| PotraitStyle | Portrait Style | Style:str | — | — | — | — |
| ShowPortraits:eval | Show Portraits? | PotraitStyle | boolean | true | — | Requires VisuMZ_1_MainMenuCore. Shows the actor's portrait instead of a face. |
| PortraitScale:num | Portrait Scaling | PotraitStyle | — | 0.5 | — | If portraits are used, scale them by this much. |
| BorderStyle | Border Style | Style:str | — | — | — | — |
| SkillItemBorderCols:num | Columns | BorderStyle | number | 1 | — | The total number of columns for Skill &amp; Item Windows in the battle scene. |
| ShowPortraitsBorderStyle:eval | Show Portraits? | BorderStyle | boolean | true | — | Requires VisuMZ_1_MainMenuCore. Shows the actor's portrait at the edge of the screen. |
| PortraitScaleBorderStyle:num | Portrait Scaling | BorderStyle | — | 1.0 | — | If portraits are used, scale them by this much. |
| SkillItemWindows | Skill &amp; Item Windows | — | — | — | — | — |
| SkillItemMiddleLayout:eval | Middle Layout | SkillItemWindows | boolean | false | — | Shows the Skill &amp; Item Windows in mid-screen? |
| SkillItemStandardCols:num | Columns | SkillItemWindows | number | 2 | — | The total number of columns for Skill &amp; Item Windows in the battle scene. |
| StatusWindow | Status Window Elements | — | — | — | — | — |
| StatusWindowName | Battler Name | StatusWindow | — | — | — | — |
| NameOffsetX:num | Offset: X | StatusWindowName | — | +0 | — | Offset this Battle Status Window element's X. Negative goes left. Positive goes right. |
| NameOffsetY:num | Offset: Y | StatusWindowName | — | +0 | — | Offset this Battle Status Window element's Y. Negative goes up. Positive goes down. |
| StatusWindowHpGauge | Gauge 1 (HP) | StatusWindow | — | — | — | — |
| HpGaugeOffsetX:num | Offset: X | StatusWindowHpGauge | — | +0 | — | Offset this Battle Status Window element's X. Negative goes left. Positive goes right. |
| HpGaugeOffsetY:num | Offset: Y | StatusWindowHpGauge | — | +0 | — | Offset this Battle Status Window element's Y. Negative goes up. Positive goes down. |
| StatusWindowMpGauge | Gauge 2 (MP) | StatusWindow | — | — | — | — |
| MpGaugeOffsetX:num | Offset: X | StatusWindowMpGauge | — | +0 | — | Offset this Battle Status Window element's X. Negative goes left. Positive goes right. |
| MpGaugeOffsetY:num | Offset: Y | StatusWindowMpGauge | — | +0 | — | Offset this Battle Status Window element's Y. Negative goes up. Positive goes down. |
| StatusWindowTpGauge | Gauge 3 (TP) | StatusWindow | — | — | — | — |
| TpGaugeOffsetX:num | Offset: X | StatusWindowTpGauge | — | +0 | — | Offset this Battle Status Window element's X. Negative goes left. Positive goes right. |
| TpGaugeOffsetY:num | Offset: Y | StatusWindowTpGauge | — | +0 | — | Offset this Battle Status Window element's Y. Negative goes up. Positive goes down. |
| StatusWindowStateIcon | State Icon | StatusWindow | — | — | — | — |
| StateIconOffsetX:num | Offset: X | StatusWindowStateIcon | — | +0 | — | Offset this Battle Status Window element's X. Negative goes left. Positive goes right. |
| StateIconOffsetY:num | Offset: Y | StatusWindowStateIcon | — | +0 | — | Offset this Battle Status Window element's Y. Negative goes up. Positive goes down. |
| StatusWindowTpbGauge | TPB/ATB Gauge | StatusWindow | — | — | — | — |
| TpbGaugeOffsetX:num | Offset: X | StatusWindowTpbGauge | — | +0 | — | Offset this Battle Status Window element's X. Negative goes left. Positive goes right. |
| TpbGaugeOffsetY:num | Offset: Y | StatusWindowTpbGauge | — | +0 | — | Offset this Battle Status Window element's Y. Negative goes up. Positive goes down. |
| StatusWindowSkin | Window Skin | StatusWindow | — | — | — | — |
| StatusWindowSkinFilename:str | Filename | StatusWindowSkin | file | — | — | Filename used for the Battle Status Window skin. Leave this empty to use the default window skin. |
| StatusWindowSkinHide:eval | Hide Window Skin? | StatusWindowSkin | boolean | false | — | Show/Hide the window skin for the Battle Status Window? |
| StatusWindowSelectBack | Selectable Background | StatusWindow | — | — | — | — |
| StatusWindowSelectableBackHide:eval | Hide Selectable BG? | StatusWindowSelectBack | boolean | false | — | Show/Hide the selectable background box for the Battle Status Window? |
| StatusWindowAttachments | Attachments | StatusWindow | — | — | — | — |
| StatusWindowBackAttachment | Back Attachment | StatusWindowAttachments | — | — | — | — |
| StatusWindowAttachmentBack:str | Filename | StatusWindowBackAttachment | file | — | — | Filename used for an image to attach to the back of the Battle Status Window. Leave empty for none. |
| StatusWindowAttachmentBackOffsetX:num | Offset: X | StatusWindowBackAttachment | — | +0 | — | Offset this Battle Status Window element's X. Negative goes left. Positive goes right. |
| StatusWindowAttachmentBackOffsetY:num | Offset: Y | StatusWindowBackAttachment | — | +0 | — | Offset this Battle Status Window element's Y. Negative goes up. Positive goes down. |
| StatusWindowFrontAttachment | Front Attachment | StatusWindowAttachments | — | — | — | — |
| StatusWindowAttachmentFront:str | Filename | StatusWindowFrontAttachment | file | — | — | Filename used for an image to attach to the front of the Battle Status Window. Leave empty for none. |
| StatusWindowAttachmentFrontOffsetX:num | Offset: X | StatusWindowFrontAttachment | — | +0 | — | Offset this Battle Status Window element's X. Negative goes left. Positive goes right. |
| StatusWindowAttachmentFrontOffsetY:num | Offset: Y | StatusWindowFrontAttachment | — | +0 | — | Offset this Battle Status Window element's Y. Negative goes up. Positive goes down. |
| UiElements | UI Elements | — | — | — | — | — |
| AntiTintUiElements:eval | Anti-Tint UI? | UiElements | boolean | true | — | Prevent UI Elements from being tinted? |

### Struct: BattleLog

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| BackColor:str | Back Color | General | — | #000000 | — | Use #rrggbb for a hex color. |
| MaxLines:num | Max Lines | General | number | 10 | — | Maximum number of lines to be displayed. |
| MessageWait:num | Message Wait | General | number | 16 | — | Number of frames for a usual message wait. |
| TextAlign:str | Text Align | General | combo | center | left; center; right | Text alignment for the Window_BattleLog. |
| BattleLogRectJS:func | JS: X, Y, W, H | General | note | "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for the battle log. |
| StartTurn | Start Turn | — | — | — | — | — |
| StartTurnShow:eval | Show Start Turn? | StartTurn | boolean | false | — | Display turn changes at the start of the turn? |
| StartTurnMsg:str | Start Turn Message | StartTurn | — | Turn %1 | — | Message displayed at turn start. %1 - Turn Count |
| StartTurnWait:num | Start Turn Wait | StartTurn | number | 40 | — | Number of frames to wait after a turn started. |
| DisplayAction | Display Action | — | — | — | — | — |
| ActionCenteredName:eval | Show Centered Action? | DisplayAction | boolean | true | — | Display a centered text of the action name? |
| ActionSkillMsg1:eval | Show Skill Message 1? | DisplayAction | boolean | false | — | Display the 1st skill message? |
| ActionSkillMsg2:eval | Show Skill Message 2? | DisplayAction | boolean | true | — | Display the 2nd skill message? |
| ActionItemMsg:eval | Show Item Message? | DisplayAction | boolean | false | — | Display the item use message? |
| ActionChanges | Action Changes | — | — | — | — | — |
| ShowCounter:eval | Show Counter? | ActionChanges | boolean | true | — | Display counter text? |
| ShowCounterWait:eval | Wait Frames | ShowCounter:eval | number | 0 | — | How many frames should the battle log wait after text? 60 frames = 1 second. |
| ShowReflect:eval | Show Reflect? | ActionChanges | boolean | true | — | Display magic reflection text? |
| ShowReflectWait:eval | Wait Frames | ShowReflect:eval | number | 0 | — | How many frames should the battle log wait after text? 60 frames = 1 second. |
| ShowSubstitute:eval | Show Substitute? | ActionChanges | boolean | true | — | Display substitute text? |
| ShowSubstituteWait:eval | Wait Frames | ShowSubstitute:eval | number | 0 | — | How many frames should the battle log wait after text? 60 frames = 1 second. |
| ActionResults | Action Results | — | — | — | — | — |
| ShowFailure:eval | Show No Effect? | ActionResults | boolean | false | — | Display no effect text? |
| ShowCritical:eval | Show Critical? | ActionResults | boolean | false | — | Display critical text? |
| ShowMissEvasion:eval | Show Miss/Evasion? | ActionResults | boolean | false | — | Display miss/evasion text? |
| ShowHpDmg:eval | Show HP Damage? | ActionResults | boolean | false | — | Display HP Damage text? |
| ShowMpDmg:eval | Show MP Damage? | ActionResults | boolean | false | — | Display MP Damage text? |
| ShowTpDmg:eval | Show TP Damage? | ActionResults | boolean | false | — | Display TP Damage text? |
| DisplayStates | Display States | — | — | — | — | — |
| ShowAddedState:eval | Show Added States? | DisplayStates | boolean | false | — | Display added states text? |
| ShowRemovedState:eval | Show Removed States? | DisplayStates | boolean | false | — | Display removed states text? |
| ShowCurrentState:eval | Show Current States? | DisplayStates | boolean | false | — | Display the currently affected state text? |
| ShowAddedBuff:eval | Show Added Buffs? | DisplayStates | boolean | false | — | Display added buffs text? |
| ShowAddedDebuff:eval | Show Added Debuffs? | DisplayStates | boolean | false | — | Display added debuffs text? |
| ShowRemovedBuff:eval | Show Removed Buffs? | DisplayStates | boolean | false | — | Display removed de/buffs text? |

### Struct: Battleback

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| DefaultStyle:str | Default Style | — | select | MZ | MZ (MZ's default style)=MZ; 1:1 (No Scaling)=1:1; Scale To Fit (Scale to screen size)=ScaleToFit; Scale Down (Scale Downward if Larger than Screen)=ScaleDown; Scale Up (Scale Upward if Smaller than Screen)=ScaleUp | The default scaling style used for battlebacks. |
| jsOneForOne:func | JS: 1:1 | — | note | "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst scale = 1.0;\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = 0;\nthis.y = 0;" | — | This code gives you control over the scaling for this style. |
| jsScaleToFit:func | JS: Scale To Fit | — | note | "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = this.width / this.bitmap.width;\nconst ratioY = this.height / this.bitmap.height;\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;" | — | This code gives you control over the scaling for this style. |
| jsScaleDown:func | JS: Scale Down | — | note | "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.min(1, this.width / this.bitmap.width);\nconst ratioY = Math.min(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;" | — | This code gives you control over the scaling for this style. |
| jsScaleUp:func | JS: Scale Up | — | note | "// Adjust Size\nthis.width = Graphics.width;\nthis.height = Graphics.height;\n\n// Adjust Scale\nconst ratioX = Math.max(1, this.width / this.bitmap.width);\nconst ratioY = Math.max(1, this.height / this.bitmap.height);\nconst scale = Math.max(ratioX, ratioY);\nthis.scale.x = scale;\nthis.scale.y = scale;\n\n// Adjust Coordinates\nthis.x = (Graphics.width - this.width) / 2;\nthis.y = Graphics.height - this.height;" | — | This code gives you control over the scaling for this style. |

### Struct: PartyCmd

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Cmd | Command Window | — | — | — | — | — |
| CmdStyle:str | Style | Cmd | select | auto | Text Only=text; Icon Only=icon; Icon + Text=iconText; Automatic=auto | How do you wish to draw commands in the Party Command Window? |
| CmdTextAlign:str | Text Align | Cmd | combo | left | left; center; right | Text alignment for the Party Command Window. |
| CmdIconFight:num | Fight Icon | Cmd | — | 76 | — | The icon used for the Fight command. |
| CommandAddAutoBattle:eval | Add Auto Battle? | Cmd | boolean | true | — | Add the "Auto Battle" command to the Command Window? |
| CmdIconAutoBattle:num | Auto Battle Icon | CommandAddAutoBattle:eval | — | 78 | — | The icon used for the Auto Battle command. |
| CmdTextAutoBattle:str | Auto Battle Text | CommandAddAutoBattle:eval | — | Auto | — | The text used for the Auto Battle command. |
| CommandAddStatus:eval | Add Status? | Cmd | boolean | true | — | Add the "Status" command to the Command Window? |
| CmdIconStatus:num | Status Icon | CommandAddStatus:eval | — | 87 | — | The icon used for the Status command. |
| CommandAddOptions:eval | Add Options? | Cmd | boolean | true | — | Add the "Options" command to the Command Window? |
| CmdIconOptions:num | Options Icon | CommandAddOptions:eval | — | 83 | — | The icon used for the Options command. |
| ActiveTpbOptionsMessage:str | Active TPB Message | CommandAddOptions:eval | — | Options Menu queued after action is complete. | — | Message that will be displayed when selecting options during the middle of an action. |
| CmdIconEscape:num | Escape Icon | Cmd | — | 82 | — | The icon used for the Escape command. |
| Access | — | — | — | — | — | — |
| SkipPartyCmd:eval | Skip Party Command | Access | boolean | true | — | DTB: Skip Party Command selection on turn start. TPB: Skip Party Command selection at battle start. |
| DisablePartyCmd:eval | Disable Party Command | Access | boolean | false | — | Disable the Party Command Window entirely? |
| HelpWindow | Help Window | — | — | — | — | — |
| HelpFight:str | Fight | HelpWindow | — | Select actions to fight. | — | Text displayed when selecting a skill type. %1 - Skill Type Name |
| HelpAutoBattle:str | Auto Battle | HelpWindow | — | Sets party to Auto Battle mode. | — | Text displayed when selecting the Auto Battle command. |
| HelpOptions:str | Options | HelpWindow | — | Opens up the Options Menu. | — | Text displayed when selecting the Options command. |
| HelpEscape:str | Escape | HelpWindow | — | Attempt to escape the battle. | — | Text displayed when selecting the escape command. |

### Struct: ActorCmd

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Cmd | Command Window | — | — | — | — | — |
| CmdStyle:str | Style | Cmd | select | auto | Text Only=text; Icon Only=icon; Icon + Text=iconText; Automatic=auto | How do you wish to draw commands in the Actor Command Window? |
| CmdTextAlign:str | Text Align | Cmd | combo | left | left; center; right | Text alignment for the Actor Command Window. |
| CmdIconItem:num | Item Icon | Cmd | — | 176 | — | The icon used for the Item command. |
| IconStypeNorm:num | Normal SType Icon | Cmd | — | 78 | — | Icon used for normal skill types that aren't assigned any icons. Ignore if VisuMZ_1_SkillsStatesCore is installed. |
| IconStypeMagic:num | Magic SType Icon | Cmd | — | 79 | — | Icon used for magic skill types that aren't assigned any icons. Ignore if VisuMZ_1_SkillsStatesCore is installed. |
| BattleCmd | Battle Commands | — | — | — | — | — |
| BattleCmdList:arraystr | Command List | BattleCmd | combo\[\] | \["attack","skills","guard","party","item"\] | attack; skills; guard; item; status; party; escape; auto battle; stypes; stype: x; stype: name; all skills; skill: x; skill: name; combat log; talk; weapon swap | List of battle commands that appear by default if the &lt;Battle Commands&gt; notetag isn't present. |
| ShowCosts:eval | Show Command Costs | BattleCmd | boolean | true | — | If a battle command has a resource cost, show it? |
| HelpWindow | Help Window | — | — | — | — | — |
| HelpSkillType:str | Skill Types | HelpWindow | — | Opens up a list of skills under the \C\[16\]%1\C\[0\] category. | — | Text displayed when selecting a skill type. %1 - Skill Type Name |
| HelpItem:str | Items | HelpWindow | — | Opens up a list of items that you can use. | — | Text displayed when selecting the item command. |
| HelpEscape:str | Escape | HelpWindow | — | Attempt to escape the battle. | — | Text displayed when selecting the escape command. |
| HelpAutoBattle:str | Auto Battle | HelpWindow | — | Automatically choose an action suitable for combat. | — | Text displayed when selecting the Auto Battle command. |
| HelpParty:str | Party | HelpWindow | — | Automatically choose an action suitable for combat. | — | Text displayed when selecting the Party command. Requires |

### Struct: InBattleStatus

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | General Settings | — | — | — | — | — |
| CmdIconStatus:num | Status Icon | General | — | 87 | — | The icon used for the Status command. |
| StatusGraphic:str | Status Graphic | General | select | face | None=none; Face=face; Map Sprite=sprite; Sideview Battler=svbattler | Choose how the actor graphic appears for In-Battle Status. |
| HelpStatus:str | Help Description | General | — | View battle member status. | — | Text displayed when selecting the Status command. |
| Enemy | Enemy Settings | — | — | — | — | — |
| enemyStatus:eval | Allow View Enemies? | Enemy | boolean | true | — | Allows players to view enemy stats (even if limited)? |
| enemyShowLevel:eval | Show Level? | Enemy | boolean | true | — | Shows the enemy's level in the In-Battle Status? |
| enemyHiddenParameter:str | Hidden Parameter | Enemy | — | ??? | — | The text that appears if a parameter value is hidden. |
| enemyShowParametersAlways:eval | Show Params Always | enemyHiddenParameter:str | boolean | false | — | Always show exact enemy parameter values. |
| enemyShowParametersIfBattleTest:eval | Show Battle Test | enemyHiddenParameter:str | boolean | true | — | Show exact enemy parameter values in battle test. |
| enemyShowParametersIfDefeated:eval | Show If Defeated | enemyHiddenParameter:str | boolean | true | — | Show exact enemy parameter values if enemy has been defeated before. |
| PageButtons | Page Buttons | — | — | — | — | — |
| pageButtons:eval | Show Page Buttons? | PageButtons | boolean | true | — | Shows page buttons to switch between actors? Still requires Touch UI option to be on. |
| pageButtonPosition:str | Large UI Position? | pageButtons:eval | select | left | left; right | If using a large resolution, position the page buttons on which side? |
| pageOffsetX:num | Offset X | PageButtons | — | +0 | — | Offsets the page buttons x position. Negative: left. Positive: right. |
| pageOffsetY:num | Offset Y | PageButtons | — | +0 | — | Offsets the page buttons y position. Negative: up. Positive: down. |
| Parameters | Parameter Display | — | — | — | — | — |
| buffValueFmt:str | Increased Value | Parameters | — | ▲%1 | — | How are increased parameter values displayed? %1 - Parameter Value |
| debuffValueFmt:str | Decreased Value | Parameters | — | ▼%1 | — | How are increased parameter values displayed? %1 - Parameter Value |
| States | States Display | — | — | — | — | — |
| statesMaxWidth:num | Max Width | States | — | 384 | — | Maximum width of the states list display. |
| drawStates:eval | List States? | States | boolean | true | — | Lists states in the states list display? |
| drawBuffs:eval | List Buffs? | States | boolean | true | — | Lists buffs in the states list display? |
| drawDebuffs:eval | List Debuffs? | States | boolean | true | — | Lists debuffs in the states list display? |
| BuffsDebuffs | Buffs/Debuffs Display | States | — | — | — | — |
| buffNameFmt:str | Buff Name Format | BuffsDebuffs | — | %1▲ | — | Text format used to represent buffs. %1 - Parameter Name |
| debuffNameFmt:str | Debuff Name Format | BuffsDebuffs | — | %1▼ | — | Text format used to represent debuffs. %1 - Parameter Name |
| NormalState | Normal State | States | — | — | — | — |
| normalIcon:num | Normal Icon | NormalState | — | 84 | — | Icon used to represent normal state (unaffected by states, buffs, or debuffs). |
| normalText:str | Normal Text | NormalState | — | Normal | — | Text used to represent normal state (unaffected by states, buffs, or debuffs). |
| HelpDesc | Help Descriptions | — | — | — | — | — |
| stateHelpFmt:json | State Help Format | HelpDesc | note | "%1 %2" | — | Text format used for state help descriptions %1 - Description; %2 - Turns/Actions Remaining |
| buffHelpFmt:json | Buff Help Format | HelpDesc | note | "Increases %1 to %3%2\\C\[0\]. %4" | — | Text format used for Buff help descriptions %1 - Param; %2 - Percent; %3 - Color; %4 - Turns |
| debuffHelpFmt:json | Debuff Help Format | HelpDesc | note | "Decreases %1 to %3%2\\C\[0\]. %4" | — | Text format used for Debuff help descriptions %1 - Param; %2 - Percent; %3 - Color; %4 - Turns |
| normalHelp:json | Normal State | HelpDesc | note | "Status is currently normal." | — | Help description used to explain normal state (unaffected by states, buffs, or debuffs). |
| TurnHelpDesc | Turns/Actions Left | HelpDesc | — | — | — | — |
| actionsFmt:str | Actions Format | TurnHelpDesc | — | \C\[6\](Actions %2%1\C\[6\])\C\[0\] | — | Text format used to represent actions remaining. %1 - Actions; %2 - Color |
| TurnsFmt:str | Turns Format | TurnHelpDesc | — | \C\[5\](Turns %2%1\C\[5\])\C\[0\] | — | Text format used to represent turns remaining. %1 - Turns; %2 - Color |
| passiveText:str | Passive Text | TurnHelpDesc | — | \C\[4\](Passive)\C\[0\] | — | Text used to represent a passive. |
| Window | Window Settings | — | — | — | — | — |
| StatusWindow_BgType:num | Background Type | Window | select | 0 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for this window. |
| StatusWindow_DrawJS:func | JS: Draw Data | Window | note | "{ // Draw Face and Simple Status\n    const x = this.colSpacing() / 2;\n    const h = ImageManager.faceHeight;\n    const y = h / 2 - this.lineHeight() * 1.5;\n    this.drawActorGraphic(this._battler, x + 1, 0, ImageManager.faceWidth, h);\n    this.drawActorSimpleStatus(this._battler, x + 180, y);\n}\n{ // Draw Actor Parameters\n    let maxWidth = this.drawingAreaWidth();\n    let x1 = 0;\n    let x2 = Math.ceil(this.drawingAreaWidth() / 2);\n\n    let counter = 0;\n    const params = this.displayedParams();\n\n    let px = x1;\n    const availableHeight = this.innerHeight - ImageManager.faceHeight;\n    const paramHeight = Math.ceil(params.length / 2) * this.lineHeight();\n    let py = Math.ceil((availableHeight - paramHeight) / 2) + ImageManager.faceHeight;\n    let pw = Math.floor(maxWidth / 2);\n\n    if (this._statesWindow.y !== 0) {\n        this._statesWindow.y = py;\n    }\n\n    for (const param of params) {\n        this.drawDarkRect(px, py, pw, this.lineHeight());\n        this.drawParamData(param, px, py, pw);\n        counter++;\n        if (counter % 2 === 0) {\n            px = x1;\n            py += this.lineHeight();\n        } else {\n            px = x2;\n        }\n    }\n}" | — | Code used to draw battler data. |
| StatusWindow_RectJS:func | JS: X, Y, W, H | Window | note | "const wx = Graphics.boxWidth &gt; 1000 ? 120 : 0;\nconst wy = this._helpWindow.y + this._helpWindow.height;\nconst ww = Graphics.boxWidth - (wx * 2);\nconst wh = Graphics.boxHeight - wy - this.windowAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for this window. |

### Struct: MultiTarget

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Properties | — | — | — | — | — | — |
| WindowWidth:num | Window Width | Properties | number | 280 | — | What is the width used for the Multi-Target Window? |
| BgType:num | Background Type | Properties | select | 2 | 0 - Window=0; 1 - Dim=1; 2 - Transparent=2 | Select background type for these windows. |
| ShowButton:eval | Show Button | Properties | boolean | true | — | Shows the keyboard/controller button to press? Requires VisuMZ_0_CoreEngine! |
| Vocab | — | — | — | — | — | — |
| AllActorsText:str | All Actors | Vocab | — | All Allies | — | What is the text used for the "All Actors" button? |
| AllEnemiesText:str | All Enemies | Vocab | — | All Enemies | — | What is the text used for the "All Enemies" button? |
| Offsets | — | — | — | — | — | — |
| ActorOffsets | Actor Offsets | Offsets | — | — | — | — |
| ActorOffsetX:num | Offset X | ActorOffsets | — | +0 | — | Offsets the button's x position. Negative: left. Positive: right. |
| ActorOffsetY:num | Offset Y | ActorOffsets | — | +0 | — | Offsets the button's y position. Negative: up. Positive: down. |
| EnemyOffsets | Enemy Offsets | Offsets | — | — | — | — |
| EnemyOffsetX:num | Offset X | EnemyOffsets | — | +0 | — | Offsets the button's x position. Negative: left. Positive: right. |
| EnemyOffsetY:num | Offset Y | EnemyOffsets | — | +0 | — | Offsets the button's y position. Negative: up. Positive: down. |

### Struct: ComboWindow

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | General Settings | — | — | — | — | — |
| Enable:eval | Enable? | General | boolean | true | — | Add the Combo Window to show in battle? |
| Appearance | Appearance Settings | — | — | — | — | — |
| CustomFontFace:str | Custom Font | Appearance | — | Arial | — | Insert the custom font face name here. Use VisuMZ_1_MessageCore to register new fonts. |
| TextAlign:str | Text Align | Appearance | combo | left | left; center; right | Text alignment for this window? |
| ComboWindow_DrawJS:func | JS: Draw Data | Appearance | note | "" | — | Code used to draw the data in this window. |
| Vocab | Vocabulary | — | — | — | — | — |
| hitsDmgFmt:str | Damage Combo Format | Vocab | — | \C\[6\]%1\} \C\[4\]Hit Combo\C\[0\]\{ | — | Text format used to display total hits for damage. %1 - Total Hits |
| hitsHealFmt:str | Healing Combo Format | Vocab | — | \C\[6\]%1\} \C\[4\]Heal Combo\C\[0\]\{ | — | Text format used to display total hits for healing. %1 - Total Hits |
| totalDmgFmt:str | Damage Total Format | Vocab | — | \}\C\[21\]Total Damage: \{\C\[0\]%1 | — | Text format used to display total value for damage. %1 - Total Damage |
| totalHealFmt:str | Healing Total Format | Vocab | — | \}\C\[21\]Total Healing: \{\C\[24\]+%1\C\[0\] | — | Text format used to display total value for healing. %1 - Total Healing |
| Position | Position Settings | — | — | — | — | — |
| fadeShiftX:num | Fade Shift X | Position | — | -2 | — | Shifts the windows x position when fading. Negative: left. Positive: right. |
| fadeShiftY:num | Fade Shift Y | Position | — | +0 | — | Shifts the windows y position when fading. Negative: up. Positive: down. |
| PosOffsetX:num | Offset X | Position | — | +0 | — | Offsets the windows x position. Negative: left. Positive: right. |
| PosOffsetY:num | Offset Y | Position | — | +0 | — | Offsets the windows y position. Negative: up. Positive: down. |
| ComboWindow_RectJS:func | JS: X, Y, W, H | Position | note | "const ww = Math.ceil(Graphics.width / 4);\nconst wh = this.calcWindowHeight(2, true);\nconst wx = 0 + this.comboWindowOffsetX();\nconst wy = Math.round(Graphics.boxHeight * 1 / 3) + this.comboWindowOffsetY();\nreturn new Rectangle(wx, wy, ww, wh);" | — | Code used to determine the dimensions for this window. |
| Update | Updating Settings | — | — | — | — | — |
| updateDuration:num | Number Roll Duration | Update | number | 20 | — | Frame duration to roll damage numbers. 60 frames = 1 second. |
| minimumStayDuration:num | Minimum Stay Duration | Update | number | 40 | — | Frame duration to stay visible minimum. 60 frames = 1 second. |
| minimumHits:num | Minimum Hit Visible | Update | number | 1 | — | Minimum hits before combo window becomes visible? |
| opacitySpeed:num | Opacity Speed | Update | number | 16 | — | Opacity speed when fading in/out. |

### Struct: Actor

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Flinch | — | — | — | — | — | — |
| FlinchDistanceX:num | Flinch Distance X | Flinch | — | 12 | — | The normal X distance when flinching. |
| FlinchDistanceY:num | Flinch Distance Y | Flinch | — | 0 | — | The normal Y distance when flinching. |
| FlinchDuration:num | Flinch Duration | Flinch | — | 6 | — | The number of frames for a flinch to complete. |
| ShakeFlinch:eval | Shake Flinch | Flinch | boolean | false | — | Perform a shake flinch when taking damage? |
| ShakeFlinchDuration:num | Max Duration | ShakeFlinch:eval | number | 24 | — | Maximum duration a shake flinch can have. This is reduced relative to the amount of damage taken. |
| ShakeFlinchPower:num | Max Power | ShakeFlinch:eval | number | 48 | — | The power rating of a shake flinch at full damage. This is reduced relative to the amount of damage taken. |
| FvBattlers | Frontview Battlers | — | — | — | — | — |
| FvPortraitAni | Portrait Animations | FvBattlers | — | — | — | — |
| FvAniEachTarget:eval | Each Target | FvPortraitAni | boolean | true | — | Place animations on top for "Each Target" display types? Does not apply to MV animations. |
| FvAniCenterAll:eval | Center of All | FvPortraitAni | boolean | true | — | Place animations on top for "Center of All" display types? Does not apply to MV animations. |
| FvAniCenterScreen:eval | Center of Screen | FvPortraitAni | boolean | false | — | Place animations on top for "Center of Screen" display types? Does not apply to MV animations. |
| SvBattlers | Sideview Battlers | — | — | — | — | — |
| SvAnchor | Anchor | SvBattlers | — | — | — | — |
| AnchorX:num | Anchor: X | SvAnchor | — | 0.5 | — | Default X anchor for Sideview Battlers. Use values between 0 and 1 to be safe. |
| AnchorY:num | Anchor: Y | SvAnchor | — | 1.0 | — | Default Y anchor for Sideview Battlers. Use values between 0 and 1 to be safe. |
| ChantStyle:eval | Chant Style | SvBattlers | boolean | true | — | What determines the chant motion? Hit type or skill type? |
| MotionSpeed:num | Motion Speed | SvBattlers | number | 12 | — | The number of frames in between each motion. |
| SvPosition | Position | SvBattlers | — | — | — | — |
| OffsetX:num | Offset: X | SvPosition | — | 0 | — | Offsets X position where actor is positioned. Negative values go left. Positive values go right. |
| OffsetY:num | Offset: Y | SvPosition | — | 0 | — | Offsets Y position where actor is positioned. Negative values go up. Positive values go down. |
| PrioritySortActive:eval | Priority: Active | SvBattlers | boolean | false | — | Place the active actor on top of actor and enemy sprites. |
| PrioritySortActors:eval | Priority: Actors | SvBattlers | boolean | true | — | Prioritize actors over enemies when placing sprites on top of each other. |
| Shadow:eval | Shadow Visible | SvBattlers | boolean | true | — | Show or hide the shadow for Sideview Battlers. |
| SvStateOverlay | State Overlay | SvBattlers | — | — | — | — |
| StateOverlayOffsetX:num | Offset: X | SvStateOverlay | — | 0 | — | Offsets X position for state overlay on actor. Negative values go left. Positive values go right. |
| StateOverlayOffsetY:num | Offset: Y | SvStateOverlay | — | 0 | — | Offsets Y position for state overlay on actor. Negative values go up. Positive values go down. |
| SmoothImage:eval | Smooth Image | SvBattlers | boolean | false | — | Smooth out the battler images or pixelate them? |
| HomePosJS:func | JS: Home Position | SvBattlers | note | "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments\[0\];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /&lt;SIDEVIEW HOME OFFSET:\[ \](\[\\+\\-\]\\d+),\[ \](\[\\+\\-\]\\d+)&gt;/i;\nconst xOffsets = actor.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) =&gt; (obj &amp;&amp; obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) =&gt; r + offset, x);\ny = yOffsets.reduce((r, offset) =&gt; r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);" | — | Code used to calculate the home position of actors. |

### Struct: Enemy

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Visual | — | — | — | — | — | — |
| AttackAnimation:num | Attack Animation | Visual | animation | 1 | — | Default attack animation used for enemies. Use &lt;Attack Animation: x&gt; for custom animations. |
| EmergeText:eval | Emerge Text | Visual | boolean | false | — | Show or hide the 'Enemy emerges!' text at the start of battle. |
| OffsetX:num | Offset: X | Visual | — | 0 | — | Offsets X position where enemy is positioned. Negative values go left. Positive values go right. |
| OffsetY:num | Offset: Y | Visual | — | 0 | — | Offsets Y position where enemy is positioned. Negative values go up. Positive values go down. |
| SmoothImage:eval | Smooth Image | Visual | boolean | true | — | Smooth out the battler images or pixelate them? |
| SelectWindow | Select Window | — | — | — | — | — |
| LastSelected:eval | Any: Last Selected | SelectWindow | boolean | true | — | Prioritize last selected enemy over front view or sideview settings? |
| FrontViewSelect:eval | FV: Right Priority | SelectWindow | boolean | false | — | If using frontview, auto select the enemy furthest right. |
| SideviewSelect:eval | SV: Right Priority | SelectWindow | boolean | true | — | If using sideview, auto select the enemy furthest right. |
| Name | — | — | — | — | — | — |
| NameLegacy:eval | Legacy Option | Name | boolean | false | — | Use the legacy version (window) or new version (sprite). WARNING: Legacy version is no longer supported for bugs. |
| NameFontSize:num | Font Size | Name | — | 22 | — | Font size used for enemy names. |
| NamePosition | Name Position | Name | — | — | — | — |
| NameOffsetX:num | Offset X | NamePosition | — | 0 | — | Offset the enemy name's X position by this much. Negative goes left. Positive goes right. |
| NameOffsetY:num | Offset Y | NamePosition | — | 0 | — | Offset the enemy name's Y position by this much. Negative goes up. Positive goes down. |
| NameAttachStateIcon:eval | Attach States | Name | boolean | false | — | Attach the enemy's state icon to the enemy name? |
| AttachStateOffsetX:num | Attach: Offset X | NameAttachStateIcon:eval | — | +0 | — | How much to offset the attached icon's X position by? Negative goes left. Positive goes right. |
| AttachStateOffsetY:num | Attach: Offset Y | NameAttachStateIcon:eval | — | +0 | — | How much to offset the attached icon's Y position by? Negative goes up. Positive goes down. |
| NameVisibility | Name Visibility | Name | — | — | — | — |
| NameAlwaysHidden:eval | Always Hidden | NameVisibility | boolean | false | — | Determines if the enemy name will always be visible. Highest priority. |
| NameAlwaysVisible:eval | Always Visible | NameVisibility | boolean | false | — | Determines if the enemy name will always be visible. Medium priority. |
| NameAsTarget:eval | As Target | NameVisibility | boolean | true | — | Shows enemy name when enemy is a target. Medium priority. |
| NameAlwaysSelectOnly:eval | By Selection? | NameVisibility | boolean | false | — | Determines the conditions for enemy name visibility. Lowest priority. |
| NameDamageVisibility:num | Temporary Visibility | NameVisibility | number | 0 | — | Number of frames enemy's name temporarily visible after taking an action effect in battle. 60 frames = 1 second. |
| SvBattlers | Sideview Battlers | — | — | — | — | — |
| AllowCollapse:eval | Allow Collapse | SvBattlers | boolean | false | — | Causes defeated enemies with SV Battler graphics to "fade away" when defeated? |
| AnchorX:num | Anchor: X | SvBattlers | — | 0.5 | — | Default X anchor for Sideview Battlers. Use values between 0 and 1 to be safe. |
| AnchorY:num | Anchor: Y | SvBattlers | — | 1.0 | — | Default Y anchor for Sideview Battlers. Use values between 0 and 1 to be safe. |
| MotionIdle:str | Motion: Idle | SvBattlers | combo | walk | walk; wait; chant; guard; damage; evade; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Sets default idle animation used by Sideview Battlers. |
| Shadow:eval | Shadow Visible | SvBattlers | boolean | true | — | Show or hide the shadow for Sideview Battlers. |
| Width:num | Size: Width | SvBattlers | number | 64 | — | Default width for enemies that use Sideview Battlers. |
| Height:num | Size: Height | SvBattlers | number | 64 | — | Default height for enemies that use Sideview Battlers. |
| WtypeId:num | Weapon Type | SvBattlers | number | 0 | — | Sets default weapon type used by Sideview Battlers. Use 0 for Bare Hands. |
| Aspect | Aspect Defaults | — | — | — | — | — |
| AspectNameFmt:str | Name Format | Aspect | — | %1 Aspect | — | Default name aspect format. %1 - Original Enemy Name |
| AspectColor:str | Name Color | Aspect | — | 2 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| AspectIcon:num | Icon | Aspect | — | 26 | — | Default icon used for aspect. Use &lt;Aspect Icon: x&gt; to change icon. |

### Struct: HpGauge

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Display | Show Gauges For | — | — | — | — | — |
| ShowActorGauge:eval | Actors | Display | boolean | true | — | Show HP Gauges over the actor sprites' heads? Requires SV Actors to be visible. |
| ShowEnemyGauge:eval | Enemies | Display | boolean | true | — | Show HP Gauges over the enemy sprites' heads? Can be bypassed with &lt;Hide HP Gauge&gt; notetag. |
| RequiresDefeat:eval | Requires Defeat? | ShowEnemyGauge:eval | boolean | true | — | Requires defeating the enemy once to show HP Gauge? Can be bypassed with &lt;Show HP Gauge&gt; notetag. |
| BTestBypass:eval | Battle Test Bypass? | RequiresDefeat:eval | boolean | true | — | Bypass the defeat requirement in battle test? |
| Settings | — | — | — | — | — | — |
| AniDuration:num | Animation Duration | Settings | number | 20 | — | How many frames should gauges animate themselves? Default: 20 frames. |
| AnchorX:num | Anchor X | Settings | — | 0.5 | — | Where do you want the HP Gauge sprite's anchor X to be? Use values between 0 and 1 to be safe. |
| AnchorY:num | Anchor Y | Settings | — | 1.0 | — | Where do you want the HP Gauge sprite's anchor Y to be? Use values between 0 and 1 to be safe. |
| Scale:num | Scale | Settings | — | 0.5 | — | How large/small do you want the HP Gauge to be scaled? |
| OffsetX:num | Offset X | Settings | — | 0 | — | How many pixels to offset the HP Gauge's X by? |
| OffsetY:num | Offset Y | Settings | — | -3 | — | How many pixels to offset the HP Gauge's Y by? |
| Options | Options | — | — | — | — | — |
| AddHpGaugeOption:eval | Add Option? | Options | boolean | true | — | Add the 'Show HP Gauge' option to the Options menu? |
| AdjustRect:eval | Adjust Window Height | Options | boolean | true | — | Automatically adjust the options window height? |
| Name:str | Option Name | Options | — | Show HP Gauge | — | Command name of the option. |

### Struct: ActionSequence

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| AutoSequences | Automatic Sequences | — | — | — | — | — |
| AutoMeleeSolo:eval | Melee Single Target | AutoSequences | boolean | true | — | Allow this auto sequence for physical, single target actions? |
| AutoMeleeAoE:eval | Melee Multi Target | AutoSequences | boolean | true | — | Allow this auto sequence for physical, multi-target actions? |
| QoL | Quality of Life | — | — | — | — | — |
| AutoNotetag:eval | Auto Notetag | QoL | boolean | false | — | Automatically apply the &lt;Custom Action Sequence&gt; notetag effect to any item or skill that has a Common Event? |
| CastAnimations | Cast Animations | — | — | — | — | — |
| CastCertain:num | Certain Hit | CastAnimations | animation | 120 | — | Cast animation for Certain Hit skills. |
| CastPhysical:num | Physical | CastAnimations | animation | 52 | — | Cast animation for Physical skills. |
| CastMagical:num | Magical | CastAnimations | animation | 51 | — | Cast animation for Magical skills. |
| CounterReflection | Counter/Reflect | — | — | — | — | — |
| CounterPlayback:eval | Counter Back | CounterReflection | boolean | true | — | Play back the attack animation used? |
| ReflectAnimation:num | Reflect Animation | CounterReflection | animation | 53 | — | Animation played when an action is reflected. |
| ReflectPlayback:eval | Reflect Back | CounterReflection | boolean | true | — | Play back the attack animation used? |
| Stepping | — | — | — | — | — | — |
| MeleeDistance:num | Melee Distance | Stepping | — | 24 | — | Minimum distance in pixels for Movement Action Sequences. |
| StepDistanceX:num | Step Distance X | Stepping | — | 48 | — | The normal X distance when stepping forward. |
| StepDistanceY:num | Step Distance Y | Stepping | — | 0 | — | The normal Y distance when stepping forward. |
| StepDuration:num | Step Duration | Stepping | — | 12 | — | The number of frames for a stepping action to complete. |

### Struct: ProjectileStart

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Type:str | Type | — | select | target | Target - Start from battler target(s)=target; Point - Start from a point on the screen=point | Select where the projectile should start from. |
| Targets:arraystr | Target(s) | Type:str | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to start the projectile from. |
| TargetCenter:eval | Centralize | Targets:arraystr | boolean | false | — | Create one projectile at the center of the targets? Or create a projectile for each target? |
| TargetLocation:str | Target Location | Targets:arraystr | combo | middle center | front head; front center; front base; middle head; middle center; middle base; back head; back center; back base | Select which part of the target to send the projectile from. |
| PointX:eval | Point X | Type:str | — | Graphics.width / 2 | — | Insert the X coordinate to start the projectile at. You may use JavaScript code. |
| PointY:eval | Point Y | Type:str | — | Graphics.height / 2 | — | Insert the Y coordinate to start the projectile at. You may use JavaScript code. |
| OffsetX:eval | Offset X | — | — | +0 | — | Insert how many pixels to offset the X coordinate by. You may use JavaScript code. |
| OffsetY:eval | Offset Y | — | — | +0 | — | Insert how many pixels to offset the Y coordinate by. You may use JavaScript code. |

### Struct: ProjectileGoal

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Type:str | Type | — | select | target | Target - Goal is battler target(s)=target; Point - Goal is a point on the screen=point | Select where the projectile should go to. |
| Targets:arraystr | Target(s) | Type:str | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) for projectile to go to. |
| TargetCenter:eval | Centralize | Targets:arraystr | boolean | false | — | Set goal in the center of targets? Or create a projectile to go to each target? |
| TargetLocation:str | Target Location | Targets:arraystr | combo | middle center | front head; front center; front base; middle head; middle center; middle base; back head; back center; back base | Select which part of the target to send the projectile at. |
| PointX:eval | Point X | Type:str | — | Graphics.width / 2 | — | Insert the X coordinate to send the projectile to. You may use JavaScript code. |
| PointY:eval | Point Y | Type:str | — | Graphics.height / 2 | — | Insert the Y coordinate to send the projectile to. You may use JavaScript code. |
| OffsetX:eval | Offset X | — | — | +0 | — | Insert how many pixels to offset the X coordinate by. You may use JavaScript code. |
| OffsetY:eval | Offset Y | — | — | +0 | — | Insert how many pixels to offset the Y coordinate by. You may use JavaScript code. |

### Struct: ProjectileExAni

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| AutoAngle:eval | Auto Angle? | Settings | boolean | true | — | Automatically angle the projectile to tilt the direction it's moving? |
| AngleOffset:eval | Angle Offset | — | — | +0 | — | Alter the projectile's tilt by this many degrees. |
| Arc:eval | Arc Peak | Settings | — | 0 | — | This is the height of the projectile's trajectory arc in pixels. |
| EasingType:str | Easing | Settings | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type to apply to the projectile's trajectory. |
| Spin:eval | Spin Speed | Settings | — | +0.0 | — | Determine how much angle the projectile spins per frame. Does not work well with "Auto Angle". |
| Emulate | Effect Emulation | — | — | — | — | — |
| EmulateActionEffect:eval | Action Effect? | Emulate | boolean | false | — | Emulate current Action Effect when projectile reaches target? Only works with start/goal targets. |
| EmulateItemEffect:eval | Item Effect ID | Emulate | item | 0 | — | Emulate an Item Effect when projectile reaches target? Use 0 to not use. Only works with start/goal targets. |
| EmulateSkillEffect:eval | Skill Effect ID | Emulate | skill | 0 | — | Emulate a Skill Effect when projectile reaches target? Use 0 to not use. Only works with start/goal targets. |
| OnceParallel:num | Common Event ID | Emulate | common_event | 0 | — | Plays a Once Parallel Common Event upon reaching target. Use 0 to not use. Works regardless of start/goal targets. |

### Struct: ProjectileExtra

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| AutoAngle:eval | Auto Angle? | Settings | boolean | true | — | Automatically angle the projectile to tilt the direction it's moving? |
| AngleOffset:eval | Angle Offset | — | — | +0 | — | Alter the projectile's tilt by this many degrees. |
| Arc:eval | Arc Peak | Settings | — | 0 | — | This is the height of the projectile's trajectory arc in pixels. |
| BlendMode:num | Blend Mode | — | select | 0 | 0 - Normal=0; 1 - Additive=1; 2 - Multiply=2; 3 - Screen=3 | What kind of blend mode do you wish to apply to the projectile? |
| EasingType:str | Easing | Settings | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type to apply to the projectile's trajectory. |
| Hue:eval | Hue | Settings | — | 0 | — | Adjust the hue of the projectile. Insert a number between 0 and 360. |
| Scale:eval | Scale | Settings | — | 1.0 | — | Adjust the size scaling of the projectile. Use decimals for exact control. |
| Spin:eval | Spin Speed | Settings | — | +0.0 | — | Determine how much angle the projectile spins per frame. Does not work well with "Auto Angle". |
| Emulate | Effect Emulation | — | — | — | — | — |
| EmulateActionEffect:eval | Action Effect? | Emulate | boolean | false | — | Emulate current Action Effect when projectile reaches target? Only works with start/goal targets. |
| EmulateItemEffect:eval | Item Effect ID | Emulate | item | 0 | — | Emulate an Item Effect when projectile reaches target? Use 0 to not use. Only works with start/goal targets. |
| EmulateSkillEffect:eval | Skill Effect ID | Emulate | skill | 0 | — | Emulate a Skill Effect when projectile reaches target? Use 0 to not use. Only works with start/goal targets. |
| OnceParallel:num | Common Event ID | Emulate | common_event | 0 | — | Plays a Once Parallel Common Event upon reaching target. Use 0 to not use. Works regardless of start/goal targets. |

### Struct: VisualCutinEffect

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Transition | — | — | — | — | — | — |
| enterDuration:num | Entrance Duration | Transition | number | 12 | — | How many frames does it take to fully enter? Used when a Visual Cutin Effect starts. |
| exitDuration:num | Exit Duration | Transition | number | 12 | — | How many frames does it take to fully exit? Used when a Visual Cutin Effect ends. |
| Cutin | Cutin Settings | — | — | — | — | — |
| bgShow:eval | Show BG Color? | Cutin | boolean | true | — | Add a background color for this cutin? Background colors appear behind the parallax. |
| outlineShow:eval | Show Outline? | Cutin | boolean | true | — | Show the cutin outline? |
| Portrait | Portrait Settings | — | — | — | — | — |
| PortraitBase | Base Properties | Portrait | — | — | — | — |
| portraitAnchorX:num | Anchor X | PortraitBase | — | 0.5 | — | Determines the sprite anchor X alignment. 0.0: Left, 0.5: Center, 1.0: Right. |
| portraitAnchorY:num | Anchor Y | PortraitBase | — | 0.5 | — | Determines the sprite anchor Y alignment. 0.0: Top, 0.5: Middle, 1.0: Bottom. |
| portraitHue:num | Hue | PortraitBase | number | 0 | — | Do you wish to adjust this cutin's portrait hue? |
| portraitOpacity:num | Opacity | PortraitBase | number | 255 | — | What is the opacity level of this cutin's portrait? |
| portraitOffsetX:num | Offset X | PortraitBase | — | +0 | — | Offsets the cutin portrait's X location. Negative: left. Positive: right. |
| portraitOffsetY:num | Offset Y | PortraitBase | — | +0 | — | Offsets the cutin portrait's Y location. Negative: up. Positive: down. |
| PortraitEnter | Entrance Properties | Portrait | — | — | — | — |
| portraitEnterX:num | Entrance X | PortraitEnter | — | +0 | — | Sets the cutin portrait's X entrance. Negative: from left. Positive: from right. |
| portraitEnterY:num | Entrance Y | PortraitEnter | — | +0 | — | Sets the cutin portrait's Y entrance. Negative: from up. Positive: from down. |
| portraitEnterEasingType:str | Entrance Easing | PortraitEnter | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| PortraitExit | Exit Properties | Portrait | — | — | — | — |
| portraitExitX:num | Exit X | PortraitExit | — | +0 | — | Sets the cutin portrait's X exit. Negative: to left. Positive: to right. |
| portraitExitY:num | Exit Y | PortraitExit | — | +0 | — | Sets the cutin portrait's Y exit. Negative: to up. Positive: to down. |
| portraitExitEasingType:str | Exit Easing | PortraitExit | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. |
| PortraitFlip | Flip Properties | Portrait | — | — | — | — |
| portraitFlipHorz:eval | Flip Horizontally? | PortraitFlip | boolean | false | — | Flip the cutin portrait horizontally? |
| portraitFlipVert:eval | Flip Vertically? | PortraitFlip | boolean | false | — | Flip the cutin portrait vertically? |
| PortraitScale | Scaling Properties | Portrait | — | — | — | — |
| portraitForcedScale:num | Forced Scaling | PortraitScale | — | 0.0 | — | Do you want to force a scaling ratio? Leave as 0 for none. Disables "Fit to Scale?". |
| portraitScaleToFit:eval | Fit to Scale? | PortraitScale | boolean | true | — | Scale the cutin portrait to fit the cutin style? Cannot be used with "Forced Scaling". |
| portraitScaleMax:eval | Scale Max? | portraitScaleToFit:eval | boolean | false | — | Scale the cutin portrait to the maximum fit or scale the cutin portrait to the minimum fit. |
| PortraitAni | Animated Portraits | Portrait | — | — | — | — |
| animatedPortraitLooping:eval | Loop? | PortraitAni | boolean | true | — | Will loop back to beginning once ended. Requires VisuMZ_4_AnimatedPictures! |
| animatedPortraitWaitFrames:num | Wait Frames | PortraitAni | number | 4 | — | Frames to wait before moving to next cell. Requires VisuMZ_4_AnimatedPictures! |
| Parallax | Parallax Settings | — | — | — | — | — |
| ParallaxBase | Base Settings | Parallax | — | — | — | — |
| parallaxBlendMode:num | Blend Mode | ParallaxBase | select | 0 | 0 - Normal=0; 1 - Additive=1; 2 - Multiply=2; 3 - Screen=3 | What kind of blend mode do you wish to apply to the cutin? |
| parallaxHue:num | Hue | ParallaxBase | number | 0 | — | Do you wish to adjust this cutin's parallax hue? |
| parallaxHueEnemyModifier:num | Enemy Modifier | parallaxHue:num | — | +0 | — | Adjust the hue value by this if the cutin target is an enemy. |
| parallaxOpacity:num | Opacity | ParallaxBase | number | 255 | — | What is the opacity level of this cutin's parallax? |
| ParallaxScroll | Scrolling Settings | Parallax | — | — | — | — |
| parallaxOffsetX:num | Offset X | ParallaxScroll | — | +0.0 | — | Offsets the cutin parallax's X location. Negative: left. Positive: right. |
| parallaxOffsetY:num | Offset Y | ParallaxScroll | — | +0.0 | — | Offsets the cutin parallax's Y location. Negative: up. Positive: down. |
| parallaxScrollX:num | Scroll X | ParallaxScroll | — | +0.0 | — | How many pixels does the parallax scroll horizontally? Negative: Scroll to right. Positive: Scroll to left. |
| parallaxScrollXinvertEnemy:eval | Invert for Enemy? | parallaxScrollX:num | boolean | false | — | Invert the X scroll direction if the cutin target is an enemy? |
| parallaxScrollY:num | Scroll Y | ParallaxScroll | — | +0.0 | — | How many pixels does the parallax scroll vertically? Negative: Scroll to down. Positive: Scroll to up. |
| parallaxScrollYinvertEnemy:eval | Invert for Enemy? | parallaxScrollY:num | boolean | false | — | Invert the Y scroll direction if the cutin target is an enemy? |

## Plugin commands

### -

- Command ID: `ActionSequenceSpaceStart`
- Description: The following are Action Sequences commands/sets. These Plugin Commands only work in battle. @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequence - Action Sets

- Command ID: `ActionSequenceBreakSet`
- Description: Action Sequence Action Sets are groups of commonly used Action Sequence Commands put together for more efficient usage. @ --------------------------------------------------------------------------

No arguments are declared.

### ACSET: Setup Action Set

- Command ID: `ActSeq_Set_SetupAction`
- Description: The generic start to most actions.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| DisplayAction:eval | Display Action | boolean | true | — | Use this part of the action sequence? |
| ApplyImmortal:eval | Immortal: On | boolean | true | — | Use this part of the action sequence? |
| ActionStart:eval | Battle Step | boolean | true | — | Use this part of the action sequence? |
| WaitForMovement:eval | Wait For Movement | boolean | true | — | Use this part of the action sequence? |
| CastAnimation:eval | Cast Animation | boolean | true | — | Use this part of the action sequence? |
| WaitForAnimation:eval | Wait For Animation | boolean | true | — | Use this part of the action sequence? @ -------------------------------------------------------------------------- |

### ACSET: All Targets Action Set

- Command ID: `ActSeq_Set_WholeActionSet`
- Description: Affects all targets simultaneously performing the following.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| DualWield:eval | Dual/Multi Wield? | boolean | false | — | Add times struck based on weapon quantity equipped? |
| PerformAction:eval | Perform Action | boolean | true | — | Use this part of the action sequence? |
| WaitCount:eval | Wait Count | — | Sprite_Battler._motionSpeed | — | How many frames should the action sequence wait? You may use JavaScript code. |
| ActionAnimation:eval | Action Animation | boolean | true | — | Use this part of the action sequence? |
| WaitForAnimation:eval | Wait For Animation | boolean | true | — | Use this part of the action sequence? |
| ActionEffect:eval | Action Effect | boolean | true | — | Use this part of the action sequence? |
| ApplyImmortal:eval | Immortal: Off | boolean | true | — | Use this part of the action sequence? @ -------------------------------------------------------------------------- |

### ACSET: Each Target Action Set

- Command ID: `ActSeq_Set_TargetActionSet`
- Description: Goes through each target one by one to perform the following.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| DualWield:eval | Dual/Multi Wield? | boolean | false | — | Add times struck based on weapon quantity equipped? |
| PerformAction:eval | Perform Action | boolean | true | — | Use this part of the action sequence? |
| WaitCount1:eval | Wait Count | — | Sprite_Battler._motionSpeed | — | How many frames should the action sequence wait? You may use JavaScript code. |
| ActionAnimation:eval | Action Animation | boolean | true | — | Use this part of the action sequence? |
| WaitCount2:eval | Wait Count | — | Sprite_Battler._motionSpeed * 2 | — | How many frames should the action sequence wait? You may use JavaScript code. |
| ActionEffect:eval | Action Effect | boolean | true | — | Use this part of the action sequence? |
| ApplyImmortal:eval | Immortal: Off | boolean | true | — | Use this part of the action sequence? @ -------------------------------------------------------------------------- |

### ACSET: Finish Action

- Command ID: `ActSeq_Set_FinishAction`
- Description: The generic ending to most actions.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ApplyImmortal:eval | Immortal: Off | boolean | true | — | Use this part of the action sequence? |
| WaitForNewLine:eval | Wait For New Line | boolean | true | — | Use this part of the action sequence? |
| WaitForEffect:eval | Wait For Effects | boolean | true | — | Use this part of the action sequence? |
| ClearBattleLog:eval | Clear Battle Log | boolean | true | — | Use this part of the action sequence? |
| ActionEnd:eval | Home Reset | boolean | true | — | Use this part of the action sequence? |
| WaitForMovement:eval | Wait For Movement | boolean | true | — | Use this part of the action sequence? @ -------------------------------------------------------------------------- |

### -

- Command ID: `ActionSequenceSpaceAngle`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Angle

- Command ID: `ActionSequenceBreakAngle`
- Description: Allows you to have control over the camera angle. Requires VisuMZ_3_ActSeqCamera! @ --------------------------------------------------------------------------

No arguments are declared.

### ANGLE: Change Angle

- Command ID: `ActSeq_ChangeAngle`
- Description: Changes the camera angle. Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Angle:eval | Angle | — | 0 | — | Change the camera angle to this many degrees. |
| Duration:eval | Duration | — | 60 | — | Duration in frames to change camera angle. |
| EasingType:str | Angle Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForAngle:eval | Wait For Angle? | boolean | true | — | Wait for angle changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANGLE: Reset Angle

- Command ID: `ActSeq_Angle_Reset`
- Description: Reset any angle settings. Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Duration:eval | Duration | — | 60 | — | Duration in frames to reset camera angle. |
| EasingType:str | Angle Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForAngle:eval | Wait For Angle? | boolean | true | — | Wait for angle changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANGLE: Wait For Angle

- Command ID: `ActSeq_Angle_WaitForAngle`
- Description: Waits for angle changes to complete before performing next command. Requires VisuMZ_3_ActSeqCamera! @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceAnimation`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Animations

- Command ID: `ActionSequenceBreakAnimation`
- Description: These Action Sequences are related to the 'Animations' that can be found in the Animations tab of the Database. @ --------------------------------------------------------------------------

No arguments are declared.

### ANIM: Action Animation

- Command ID: `ActSeq_Animation_ActionAnimation`
- Description: Plays the animation associated with the action.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| Mirror:eval | Mirror Animation | boolean | false | — | Mirror the animation? |
| WaitForAnimation:eval | Wait For Animation? | boolean | true | — | Wait for animation to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANIM: Attack Animation

- Command ID: `ActSeq_Animation_AttackAnimation`
- Description: Plays the animation associated with the user's 1st weapon.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| Mirror:eval | Mirror Animation | boolean | false | — | Mirror the animation? |
| WaitForAnimation:eval | Wait For Animation? | boolean | true | — | Wait for animation to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANIM: Attack Animation 2+

- Command ID: `ActSeq_Animation_AttackAnimation2`
- Description: Plays the animation associated with the user's other weapons. Plays nothing if there is no other weapon equipped.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| Slot:eval | Slot | — | 2 | — | Which weapon slot to get this data from? Main-hand weapon is weapon slot 1. |
| Mirror:eval | Mirror Animation | boolean | true | — | Mirror the animation? |
| WaitForAnimation:eval | Wait For Animation? | boolean | true | — | Wait for animation to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANIM: Balloon Animation

- Command ID: `ActSeq_Animation_BalloonAnimation`
- Description: Plays a balloon animation on target(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| Balloon:str | Balloon Type | select | Exclamation | Exclamation; Question; Music Note; Heart; Anger; Sweat; Frustration; Silence; Light Bulb; Zzz; User-defined 1; User-defined 2; User-defined 3; User-defined 4; User-defined 5 | What kind of balloon should be played on target(s)? |
| WaitComplete:eval | Wait for Completion | boolean | true | — | Wait for balloon animation completion before continuing? @ -------------------------------------------------------------------------- |

### ANIM: Balloon Icon (Single)

- Command ID: `ActSeq_Animation_BalloonIcon`
- Description: Plays a balloon animation using an icon on target(s). Requires VisuMZ_4_IconBalloons!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| IconIndex:num | Icon Index | — | 0 | — | Insert the ID of the icon to show. Tip: Right click &gt; Insert Icon Index |
| WaitComplete:eval | Wait for Completion | boolean | true | — | Wait for balloon animation completion before continuing? @ -------------------------------------------------------------------------- |

### ANIM: Balloon Icon (Range)

- Command ID: `ActSeq_Animation_BalloonIconRange`
- Description: Plays a balloon animation an icon range on target(s). Requires VisuMZ_4_IconBalloons!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| startIcon:num | Starting Icon Index | — | 0 | — | Insert the ID of the icon to show. Tip: Right click &gt; Insert Icon Index |
| endIcon:num | Ending Icon Index | — | 0 | — | Insert the ID of the icon to show. Tip: Right click &gt; Insert Icon Index |
| WaitComplete:eval | Wait for Completion | boolean | true | — | Wait for balloon animation completion before continuing? @ -------------------------------------------------------------------------- |

### ANIM: Balloon Icon (Specific)

- Command ID: `ActSeq_Animation_BalloonIconSpecific`
- Description: Plays a balloon animation with specific icons on target(s). Requires VisuMZ_4_IconBalloons!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| icons:arraynum | Icons | string\[\] | \[\] | — | Insert the ID(s) of the icon to show. Tip: Right click &gt; Insert Icon Index |
| WaitComplete:eval | Wait for Completion | boolean | true | — | Wait for balloon animation completion before continuing? @ -------------------------------------------------------------------------- |

### ANIM: Cast Animation

- Command ID: `ActSeq_Animation_CastAnimation`
- Description: Plays the cast animation associated with the action.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| Mirror:eval | Mirror Animation | boolean | false | — | Mirror the animation? |
| WaitForAnimation:eval | Wait For Animation? | boolean | true | — | Wait for animation to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANIM: Change Battle Portrait

- Command ID: `ActSeq_Animation_ChangeBattlePortrait`
- Description: Changes the battle portrait of the actor (if it's an actor). Can be used outside of battle/action sequences.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to change the portraits for. Valid units can only be actors. |
| Filename:str | Filename | file | Untitled | — | Select the file to change the actor's portrait to. @ -------------------------------------------------------------------------- |

### ANIM: Change Battle Portrait (JS)

- Command ID: `ActSeq_Animation_ChangeBattlePortrait_JS`
- Description: Changes the battle portrait of the actor through JavaScript. Can be used outside of battle/action sequences.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ActorJS:func | JS: Actor ID | note | "// Get Actor ID here.\nlet actorID = 0;\nactorID = $gameParty.members()\[0\].actorId();\n\n// Return Actor ID\nreturn actorID;" | — | Enter which Actor ID to affect. Uses JavaScript code. |
| FilenameJS:func | JS: Filename | note | "// Get Filename here.\nlet filename = 'Actor1_';\nfilename += String(Math.randomInt(8) + 1);\n\n// Return Filename\nreturn filename;" | — | Enter the filename you wish to use. Uses JavaScript code. @ -------------------------------------------------------------------------- |

### ANIM: Guard Animation

- Command ID: `ActSeq_Animation_GuardAnimation`
- Description: Plays the animation associated with the user's guard action (if any).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| Mirror:eval | Mirror Animation | boolean | false | — | Mirror the animation? |
| WaitForAnimation:eval | Wait For Animation? | boolean | true | — | Wait for animation to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANIM: Item Animation

- Command ID: `ActSeq_Animation_ItemAnimation`
- Description: Plays the animation associated with a specific item.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ItemID:eval | Item ID | item | 7 | — | Which item ID will the animation come from? |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| Mirror:eval | Mirror Animation | boolean | false | — | Mirror the animation? |
| WaitForAnimation:eval | Wait For Animation? | boolean | true | — | Wait for animation to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANIM: Play at Coordinate

- Command ID: `ActSeq_Animation_PlayAtCoordinate`
- Description: Plays an animation on the screen at a specific x, y coordinate. Requires VisuMZ_0_CoreEngine!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| AnimationID:num | Animation ID | animation | 1 | — | Plays this animation. |
| Coordinates | — | — | — | — | — |
| pointX:eval | X | — | Graphics.width / 2 | — | X coordinate used for the animation. You may use JavaScript code. |
| pointY:eval | Y | — | Graphics.height / 2 | — | Y coordinate used for the animation. You may use JavaScript code. |
| Mirror:eval | Mirror Animation? | boolean | false | — | Mirror the animation? |
| Mute:eval | Mute Animation? | boolean | false | — | Mute the animation? |
| WaitComplete:eval | Wait for Completion? | boolean | false | — | Wait the animation to finish before continuing? @ -------------------------------------------------------------------------- |

### ANIM: Show Animation

- Command ID: `ActSeq_Animation_ShowAnimation`
- Description: Plays the a specific animation on unit(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| AnimationID:num | Animation ID | animation | 1 | — | Select which animation to play on unit(s). |
| Mirror:eval | Mirror Animation | boolean | false | — | Mirror the animation? |
| WaitForAnimation:eval | Wait For Animation? | boolean | true | — | Wait for animation to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANIM: Show Animation JS

- Command ID: `ActSeq_Animation_ShowAnimationJS`
- Description: Plays the a specific animation on unit(s). Uses JavaScript to determine animation ID.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| AnimationID:eval | JS: Animation ID | — | 1 | — | Select which animation to play on unit(s). Uses JavaScript to determine animation ID. |
| Mirror:eval | Mirror Animation | boolean | false | — | Mirror the animation? |
| WaitForAnimation:eval | Wait For Animation? | boolean | true | — | Wait for animation to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANIM: Skill Animation

- Command ID: `ActSeq_Animation_SkillAnimation`
- Description: Plays the animation associated with a specific skill.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| SkillID:eval | Skill ID | skill | 99 | — | Which skill ID will the animation come from? |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play the animation on. |
| Mirror:eval | Mirror Animation | boolean | false | — | Mirror the animation? |
| WaitForAnimation:eval | Wait For Animation? | boolean | true | — | Wait for animation to complete before performing next command? @ -------------------------------------------------------------------------- |

### ANIM: Wait For Animation

- Command ID: `ActSeq_Animation_WaitForAnimation`
- Description: Causes the interpreter to wait for any animation(s) to finish. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceBattleLog`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Battle Log

- Command ID: `ActionSequenceBreakBattleLog`
- Description: These Action Sequences are related to the Battle Log Window, the window found at the top of the battle screen. @ --------------------------------------------------------------------------

No arguments are declared.

### BTLOG: Add Text

- Command ID: `ActSeq_BattleLog_AddText`
- Description: Adds a new line of text into the Battle Log.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Text:str | Text | — | Insert text here. | — | Add this text into the Battle Log. Text codes allowed. |
| CopyCombatLog:eval | Copy to Combat Log? | boolean | true | — | Copies text to the Combat Log. Requires VisuMZ_4_CombatLog |
| CombatLogIcon:num | Combat Log Icon | — | 87 | — | What icon would you like to bind to this entry? Requires VisuMZ_4_CombatLog @ -------------------------------------------------------------------------- |

### BTLOG: Clear Battle Log

- Command ID: `ActSeq_BattleLog_Clear`
- Description: Clears all the text in the Battle Log. @ --------------------------------------------------------------------------

No arguments are declared.

### BTLOG: Display Action

- Command ID: `ActSeq_BattleLog_DisplayAction`
- Description: Displays the current action in the Battle Log. @ --------------------------------------------------------------------------

No arguments are declared.

### BTLOG: Pop Base Line

- Command ID: `ActSeq_BattleLog_PopBaseLine`
- Description: Removes the Battle Log's last added base line and all text up to its former location. @ --------------------------------------------------------------------------

No arguments are declared.

### BTLOG: Push Base Line

- Command ID: `ActSeq_BattleLog_PushBaseLine`
- Description: Adds a new base line to where the Battle Log currently is at. @ --------------------------------------------------------------------------

No arguments are declared.

### BTLOG: Refresh Battle Log

- Command ID: `ActSeq_BattleLog_Refresh`
- Description: Refreshes the Battle Log. @ --------------------------------------------------------------------------

No arguments are declared.

### BTLOG: UI Show/Hide

- Command ID: `ActSeq_BattleLog_UI`
- Description: Shows or hides the Battle UI (including the Battle Log).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ShowHide:eval | Show/Hide? | boolean | true | — | Shows/hides the Battle UI. @ -------------------------------------------------------------------------- |

### BTLOG: Wait For Battle Log

- Command ID: `ActSeq_BattleLog_WaitForBattleLog`
- Description: Causes the interpreter to wait for the Battle Log to finish. @ --------------------------------------------------------------------------

No arguments are declared.

### BTLOG: Wait For New Line

- Command ID: `ActSeq_BattleLog_WaitForNewLine`
- Description: Causes the interpreter to wait for a new line in the Battle Log. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceCamera`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Camera

- Command ID: `ActionSequenceBreakCamera`
- Description: Allows you to have control over the camera. Requires VisuMZ_3_ActSeqCamera! @ --------------------------------------------------------------------------

No arguments are declared.

### CAMERA: Clamp ON/OFF

- Command ID: `ActSeq_Camera_Clamp`
- Description: Turns battle camera clamping on/off. Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Setting:eval | ON/OFF | boolean | true | — | Turns camera clamping on/off. @ -------------------------------------------------------------------------- |

### CAMERA: Focus Point

- Command ID: `ActSeq_Camera_FocusPoint`
- Description: Focus the battle camera on a certain point in the screen. Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| FocusX:eval | X Coordinate | — | Graphics.width / 2 | — | Insert the point to focus the camera on. You may use JavaScript code. |
| FocusY:eval | Y Coordinate | — | Graphics.height / 2 | — | Insert the point to focus the camera on. You may use JavaScript code. |
| Duration:eval | Duration | — | 60 | — | Duration in frames for camera focus change. |
| EasingType:str | Camera Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForCamera:eval | Wait For Camera? | boolean | true | — | Wait for camera changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### CAMERA: Focus Target(s)

- Command ID: `ActSeq_Camera_FocusTarget`
- Description: Focus the battle camera on certain battler target(s). Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to focus the battle camera on. |
| Duration:eval | Duration | — | 60 | — | Duration in frames for camera focus change. |
| EasingType:str | Camera Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForCamera:eval | Wait For Camera? | boolean | true | — | Wait for camera changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### CAMERA: Offset

- Command ID: `ActSeq_Camera_Offset`
- Description: Offset the battle camera from the focus target. Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| OffsetX:eval | Offset X | — | +0 | — | How much to offset the camera X by. Negative: left. Positive: right. |
| OffsetY:eval | Offset Y | — | +0 | — | How much to offset the camera Y by. Negative: up. Positive: down. |
| Duration:eval | Duration | — | 60 | — | Duration in frames for offset change. |
| EasingType:str | Camera Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForCamera:eval | Wait For Camera? | boolean | true | — | Wait for camera changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### CAMERA: Reset

- Command ID: `ActSeq_Camera_Reset`
- Description: Reset the battle camera settings. Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ResetFocus:eval | Reset Focus? | boolean | true | — | Reset the focus point? |
| ResetOffset:eval | Reset Offset? | boolean | true | — | Reset the camera offset? |
| Duration:eval | Duration | — | 60 | — | Duration in frames for reset change. |
| EasingType:str | Camera Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForCamera:eval | Wait For Camera? | boolean | true | — | Wait for camera changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### CAMERA: Wait For Camera

- Command ID: `ActSeq_Camera_WaitForCamera`
- Description: Waits for camera to complete before performing next command. Requires VisuMZ_3_ActSeqCamera! @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceCutin`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Cutins

- Command ID: `ActionSequenceBreakCutin`
- Description: Allows you to have control over Visual Cutin Effects. Requires VisuMZ_3_VisualCutinEffect! @ --------------------------------------------------------------------------

No arguments are declared.

### CUTIN: Add Visual Cutin Effect

- Command ID: `ActSeq_Cutin_AddVisualCutinEffect`
- Description: Adds the Visual Cutin Effect using these desired settings. Requires VisuMZ_3_VisualCutinEffect!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Basic | Basic Settings | — | — | — | — |
| type:str | Cutin Style Type | select | CenterHorzSpan | -; Whole; -; Showcase; -; LeftHorzSpan; CenterHorzSpan; RightHorzSpan; -; LeftHorzSlash; RightHorzSlash; -; LeftVertSlash; RightVertSlash; -; LeftMajor; RightMajor; -; LeftMinor; CenterMinor; RightMinor; -; LeftDiamond; CenterDiamond; RightDiamond; -; LeftGemstone; CenterGemstone; RightGemstone; -; TopLeftQuad; TopRightQuad; BottomLeftQuad; BottomRightQuad; -; TopLeftCorner; TopRightCorner; BottomLeftCorner; BottomRightCorner; -; Row1stThird; Row2ndThird; Row3rdThird; -; Row1stFourth; Row2ndFourth; Row3rdFourth; Row4thFourth; -; Row1stFifth; Row2ndFifth; Row3rdFifth; Row4thFifth; Row5thFifth; -; Col1stThird; Col2ndThird; Col3rdThird; -; Col1stFourth; Col2ndFourth; Col3rdFourth; Col4thFourth; -; Col1stFifth; Col2ndFifth; Col3rdFifth; Col4thFifth; Col5thFifth; -; SixPack1; SixPack2; SixPack3; SixPack4; SixPack5; SixPack6; -; EightPack1; EightPack2; EightPack3; EightPack4; EightPack5; EightPack6; EightPack7; EightPack8; -; TwelvePack1; TwelvePack2; TwelvePack3; TwelvePack4; TwelvePack5; TwelvePack6; TwelvePack7; TwelvePack8; TwelvePack9; TwelvePack10; TwelvePack11; TwelvePack12; - | What Visual Cutin Effect style type do you wish to use? Only one of each cutin-style type can be present. |
| Targets:arraystr | Portrait Target | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to grab the Visual Cutin Effect portrait data from. First unit will be used to make portrait. |
| parallaxFilename:str | Parallax Filename | file | &gt;&gt;&gt;ATTENTION&lt;&lt;&lt; | — | Pick a parallax to use for the Visual Cutin Effect. Pick (None) to not use a parallax. |
| bgColor:str | Background Color | — | #888888 | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| ExtraSettings:struct | Extra Settings | struct&lt;VisualCutinEffect&gt; | {} | — | Extra Plugin Command settings pertaining to this Visual Cutin Effect. |
| WaitForEntrance:eval | Wait For Entrance | boolean | true | — | Wait until cutin entrance is finished before performing the next event command? @ -------------------------------------------------------------------------- |

### CUTIN: End Visual Cutin Effect (All)

- Command ID: `ActSeq_Cutin_EndVisualCutinEffectAll`
- Description: Ends all Visual Cutin Effects currently present. Requires VisuMZ_3_VisualCutinEffect!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| WaitForExit:eval | Wait For Exit | boolean | true | — | Wait until cutin exit is finished before performing the next event command? @ -------------------------------------------------------------------------- |

### CUTIN: End Visual Cutin Effect (Type)

- Command ID: `ActSeq_Cutin_EndVisualCutinEffectType`
- Description: Ends the Visual Cutin Effect with the matching type. Requires VisuMZ_3_VisualCutinEffect!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| type:str | Cutin Style Type | select | CenterHorzSpan | -; Whole; -; Showcase; -; LeftHorzSpan; CenterHorzSpan; RightHorzSpan; -; LeftHorzSlash; RightHorzSlash; -; LeftVertSlash; RightVertSlash; -; LeftMajor; RightMajor; -; LeftMinor; CenterMinor; RightMinor; -; LeftDiamond; CenterDiamond; RightDiamond; -; LeftGemstone; CenterGemstone; RightGemstone; -; TopLeftQuad; TopRightQuad; BottomLeftQuad; BottomRightQuad; -; TopLeftCorner; TopRightCorner; BottomLeftCorner; BottomRightCorner; -; Row1stThird; Row2ndThird; Row3rdThird; -; Row1stFourth; Row2ndFourth; Row3rdFourth; Row4thFourth; -; Row1stFifth; Row2ndFifth; Row3rdFifth; Row4thFifth; Row5thFifth; -; Col1stThird; Col2ndThird; Col3rdThird; -; Col1stFourth; Col2ndFourth; Col3rdFourth; Col4thFourth; -; Col1stFifth; Col2ndFifth; Col3rdFifth; Col4thFifth; Col5thFifth; -; SixPack1; SixPack2; SixPack3; SixPack4; SixPack5; SixPack6; -; EightPack1; EightPack2; EightPack3; EightPack4; EightPack5; EightPack6; EightPack7; EightPack8; -; TwelvePack1; TwelvePack2; TwelvePack3; TwelvePack4; TwelvePack5; TwelvePack6; TwelvePack7; TwelvePack8; TwelvePack9; TwelvePack10; TwelvePack11; TwelvePack12; - | What Visual Cutin Effect style type do you wish to end? |
| WaitForExit:eval | Wait For Exit | boolean | true | — | Wait until cutin exit is finished before performing the next event command? @ -------------------------------------------------------------------------- |

### CUTIN: Wait for Cutin Entrance

- Command ID: `ActSeq_Cutin_WaitForEntrance`
- Description: Wait until all cutin entrances are finished before performing the next event command. Requires VisuMZ_3_VisualCutinEffect! @ --------------------------------------------------------------------------

No arguments are declared.

### CUTIN: Wait for Cutin Exit

- Command ID: `ActSeq_Cutin_WaitForExit`
- Description: Wait until all cutin exits are finished before performing the next event command. Requires VisuMZ_3_VisualCutinEffect! @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceDragonbones`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Dragonbones

- Command ID: `ActionSequenceBreaDragonbones`
- Description: These Action Sequences are Dragonbones-related. Requires VisuMZ_2_DragonbonesUnion! @ --------------------------------------------------------------------------

No arguments are declared.

### DB: Dragonbones Animation

- Command ID: `ActSeq_DB_DragonbonesMotionAni`
- Description: Causes the unit(s) to play a Dragonbones motion animation. Requires VisuMZ_2_DragonbonesUnion!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to perform a motion animation. |
| MotionAni:str | Motion Animation | — | attack | — | What is the name of the Dragonbones motion animation you wish to play? @ -------------------------------------------------------------------------- |

### DB: Dragonbones Time Scale

- Command ID: `ActSeq_DB_DragonbonesTimeScale`
- Description: Causes the unit(s) to change their Dragonbones time scale. Requires VisuMZ_2_DragonbonesUnion!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to perform a motion animation. |
| TimeScale:num | Time Scale | — | 1.0 | — | Change the value of the Dragonbones time scale to this. @ -------------------------------------------------------------------------- |

### -

- Command ID: `ActionSequenceSpaceElements`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Elements

- Command ID: `ActionSequenceBreakElements`
- Description: These Action Sequences are related to elements. Requires VisuMZ_1_ElementStatusCore! @ --------------------------------------------------------------------------

No arguments are declared.

### ELE: Add Elements

- Command ID: `ActSeq_Element_AddElements`
- Description: Adds element(s) to be used when calculating damage. Requires VisuMZ_1_ElementStatusCore!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Elements:arraynum | Elements | number\[\] | \["1"\] | — | Select which element ID to add onto the action. Insert multiple element ID's to add multiple at once. @ -------------------------------------------------------------------------- |

### ELE: Clear Element Changes

- Command ID: `ActSeq_Element_Clear`
- Description: Clears all element changes made through Action Sequences. Requires VisuMZ_1_ElementStatusCore! @ --------------------------------------------------------------------------

No arguments are declared.

### ELE: Force Elements

- Command ID: `ActSeq_Element_ForceElements`
- Description: Forces only specific element(s) when calculating damage. Requires VisuMZ_1_ElementStatusCore!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Elements:arraynum | Elements | number\[\] | \["1"\] | — | Select which element ID to force in the action. Insert multiple element ID's to force multiple at once. @ -------------------------------------------------------------------------- |

### ELE: Null Element

- Command ID: `ActSeq_Element_NullElements`
- Description: Forces no element to be used when calculating damage. Requires VisuMZ_1_ElementStatusCore! @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceGrid`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Grid

- Command ID: `ActionSequenceBreakGrid`
- Description: These Action Sequences are Battle Grid System-related. Requires VisuMZ_2_BattleGridSystem! @ --------------------------------------------------------------------------

No arguments are declared.

### GRID: Action Animation at Node

- Command ID: `ActSeq_Grid_ActionAnimationAtNode`
- Description: Plays action animation at target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Enemy | Actor; Enemy; Friend; Opponent | Which unit's Node do you want to play an animation on? |
| Rank:num | Rank | number | 1 | — | Input the number representing the Rank of the Node you want to play an animation on. |
| Flank:num | Flank | number | 1 | — | Input the number representing the Flank of the Node you want to play an animation on. |
| OffsetX:num | Offset X | — | +0 | — | Offsets the animation x position. Negative: left. Positive: right. |
| OffsetY:num | Offset Y | — | +0 | — | Offsets the animation y position. Negative: up. Positive: down. @ -------------------------------------------------------------------------- |

### GRID: Add Passive State(s) to Node

- Command ID: `ActSeq_Grid_AddPassiveStatesToNode`
- Description: Adds Passive State(s) at target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| StateIDs:arraynum | State ID(s) | state\[\] | \[\] | — | Select which State ID(s) to add as a Passive State. |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Actor | Actor; Enemy; Friend; Opponent | Which unit do you want to add the Passive State Node effect for? |
| Rank:eval | Rank | — | 1 | — | Input the number representing the Rank of the Node you want to add a Passive State(s) to. |
| Flank:eval | Flank | — | 1 | — | Input the number representing the Flank of the Node you want to add a Passive State(s) to. @ -------------------------------------------------------------------------- |

### GRID: Add Trigger to Node

- Command ID: `ActSeq_Grid_AddTriggerToNode`
- Description: Adds Trigger to target node. Target node cannot have battler. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| SkillID:num | Skill ID | skill | 1 | — | Select which Skill ID(s) to add as the trigger. |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Actor | Actor; Enemy; Friend; Opponent | Which unit do you want to add the Trigger Node effect for? |
| Rank:eval | Rank | — | 1 | — | Input the number representing the Rank of the Node you want to add a Trigger to. |
| Flank:eval | Flank | — | 1 | — | Input the number representing the Flank of the Node you want to add a Trigger to. @ -------------------------------------------------------------------------- |

### GRID: Add Trigger to Node JS

- Command ID: `ActSeq_Grid_AddTriggerToNodeJS`
- Description: Adds Trigger to target node. Target node cannot have battler. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| SkillID:eval | JS: Skill ID | — | 1 | — | Use JavaScript to determine what skill ID to add to this node. |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Actor | Actor; Enemy; Friend; Opponent | Which unit do you want to add the Trigger Node effect for? |
| Rank:eval | Rank | — | 1 | — | Input the number representing the Rank of the Node you want to add a Trigger to. |
| Flank:eval | Flank | — | 1 | — | Input the number representing the Flank of the Node you want to add a Trigger to. @ -------------------------------------------------------------------------- |

### GRID: Animation ID at Node

- Command ID: `ActSeq_Grid_AnimationIDAtNode`
- Description: Plays specific animation ID at target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| AnimationID:num | Animation ID | animation | 1 | — | Play this animation at target node. |
| Mirror:eval | Mirror? | boolean | false | — | Mirror this animation? |
| Mute:eval | Mute? | boolean | false | — | Mute this animation? |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Enemy | Actor; Enemy; Friend; Opponent | Which unit's Node do you want to play an animation on? |
| Rank:num | Rank | number | 1 | — | Input the number representing the Rank of the Node you want to play an animation on. |
| Flank:num | Flank | number | 1 | — | Input the number representing the Flank of the Node you want to play an animation on. |
| OffsetX:num | Offset X | — | +0 | — | Offsets the animation x position. Negative: left. Positive: right. |
| OffsetY:num | Offset Y | — | +0 | — | Offsets the animation y position. Negative: up. Positive: down. @ -------------------------------------------------------------------------- |

### GRID: Animation JS at Node

- Command ID: `ActSeq_Grid_AnimationJsAtNode`
- Description: Uses JS to calculate which animation to play at target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| AnimationID:eval | JS: Animation ID | — | 1 | — | Calculate which animation to play on unit(s). Uses JavaScript to determine animation ID. |
| Mirror:eval | Mirror? | boolean | false | — | Mirror this animation? |
| Mute:eval | Mute? | boolean | false | — | Mute this animation? |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Enemy | Actor; Enemy; Friend; Opponent | Which unit's Node do you want to play an animation on? |
| Rank:num | Rank | number | 1 | — | Input the number representing the Rank of the Node you want to play an animation on. |
| Flank:num | Flank | number | 1 | — | Input the number representing the Flank of the Node you want to play an animation on. |
| OffsetX:num | Offset X | — | +0 | — | Offsets the animation x position. Negative: left. Positive: right. |
| OffsetY:num | Offset Y | — | +0 | — | Offsets the animation y position. Negative: up. Positive: down. @ -------------------------------------------------------------------------- |

### GRID: Animation Type at Node

- Command ID: `ActSeq_Grid_AnimationTypeAtNode`
- Description: Plays certain animation type at target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Type:str | Animation Type | select | Attack | Attack; Guard; Item; Skill | What is the animation type you would like to play? |
| Slot:eval | Slot (Attack Type) | — | 1 | — | Which weapon slot to get this data from? Main-hand weapon is weapon slot 1. |
| ItemID:num | Item ID (Item Type) | item | 7 | — | Which item ID will the animation come from? |
| SkillID:num | Skill ID (Skill Type) | skill | 99 | — | Which skill ID will the animation come from? |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Enemy | Actor; Enemy; Friend; Opponent | Which unit's Node do you want to play an animation on? |
| Rank:num | Rank | number | 1 | — | Input the number representing the Rank of the Node you want to play an animation on. |
| Flank:num | Flank | number | 1 | — | Input the number representing the Flank of the Node you want to play an animation on. |
| OffsetX:num | Offset X | — | +0 | — | Offsets the animation x position. Negative: left. Positive: right. |
| OffsetY:num | Offset Y | — | +0 | — | Offsets the animation y position. Negative: up. Positive: down. @ -------------------------------------------------------------------------- |

### GRID: Move Target(s) In Direction

- Command ID: `ActSeq_Grid_MoveTargetsInDirection`
- Description: Moves target(s) in a specific direction to other Nodes. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to move. |
| MoveType:str | Movement Type | select | Mid | -; Exact; -; Mid; -; Switch; Switch Mid; -; Crash; Crash Mid; - | Select the Movement type rulings. See VisuMZ_2_BattleGridSystem help file for details. |
| Direction:str | Direction | select | Backward | -; Upward; Downward; -; Up-Forward; Forward; Down-Forward; -; Up-Backward; Backward; Down-Backward; -; Up-Leftward; Leftward; Down-Leftward; -; Up-Rightward; Rightward; Down-Rightward; - | Select the movement direction. |
| Distance:eval | Distance | — | 1 | — | The number of nodes to be moved. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Input the number representing the frames used to move. |
| SilentMove:eval | Silent Change? | boolean | false | — | Silent: Discreet changes shown. More apparent later. Visual: Instant changes shown. @ -------------------------------------------------------------------------- |

### GRID: Pull To Target Node

- Command ID: `ActSeq_Grid_PullToTargetNode`
- Description: Pulls battlers towards target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Actor | Actor; Enemy; Friend; Opponent | Which unit do you want to pull on? |
| Rank:eval | Rank | — | 1 | — | Input the number representing the Rank of the Node you want to pull to. |
| Flank:eval | Flank | — | 1 | — | Input the number representing the Flank of the Node you want to pull to. |
| Strength:eval | Strength | — | 1 | — | Input the strength level of the pull. |
| Duration:eval | Duration | — | 12 | — | Input the number representing the frames used to move. @ -------------------------------------------------------------------------- |

### GRID: Push From Target Node

- Command ID: `ActSeq_Grid_PushFromTargetNode`
- Description: Pushes battlers away from target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Actor | Actor; Enemy; Friend; Opponent | Which unit do you want to push from? |
| Rank:eval | Rank | — | 1 | — | Input the number representing the Rank of the Node you want to push from. |
| Flank:eval | Flank | — | 1 | — | Input the number representing the Flank of the Node you want to push from. |
| Strength:eval | Strength | — | 1 | — | Input the strength level of the push. |
| Duration:eval | Duration | — | 12 | — | Input the number representing the frames used to move. @ -------------------------------------------------------------------------- |

### GRID: Remove All Passive States from Node

- Command ID: `ActSeq_Grid_ClearPassiveStatesFromNode`
- Description: Removes all all Passive State effects at target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Actor | Actor; Enemy; Friend; Opponent | Which unit do you want to clear the Node for? |
| Rank:eval | Rank | — | 1 | — | Input the number representing the Rank of the Node you want to clear Passive States from. |
| Flank:eval | Flank | — | 1 | — | Input the number representing the Flank of the Node you want to clear Passive States from. @ -------------------------------------------------------------------------- |

### GRID: Remove Passive State(s) from Node

- Command ID: `ActSeq_Grid_RemovePassiveStatesFromNode`
- Description: Remove Passive State(s) at target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| StateIDs:arraynum | State ID(s) | state\[\] | \[\] | — | Select which State ID(s) to remove as a Passive State. |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Actor | Actor; Enemy; Friend; Opponent | Which unit do you want to remove the Passive State Node effect for? |
| Rank:eval | Rank | — | 1 | — | Input the number representing the Rank of the Node you want to remove a Passive State(s) from. |
| Flank:eval | Flank | — | 1 | — | Input the number representing the Flank of the Node you want to remove a Passive State(s) from. @ -------------------------------------------------------------------------- |

### GRID: Remove Trigger from Node

- Command ID: `ActSeq_Grid_RemoveTriggerFromNode`
- Description: Removes Trigger from target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Actor | Actor; Enemy; Friend; Opponent | Which unit do you want to clear Triggers for? |
| Rank:eval | Rank | — | 1 | — | Input the number representing the Rank of the Node you want to clear Triggers from. |
| Flank:eval | Flank | — | 1 | — | Input the number representing the Flank of the Node you want to clear Triggers from. @ -------------------------------------------------------------------------- |

### GRID: Teleport To Node

- Command ID: `ActSeq_Grid_TeleportToNode`
- Description: Teleports user/random opponent to target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Actor | Actor; Enemy; Friend; Opponent | Which unit do you want to teleport to? |
| Rank:eval | Rank | — | 1 | — | Input the number representing the Rank of the Node you want to teleport to. |
| Flank:eval | Flank | — | 1 | — | Input the number representing the Flank of the Node you want to teleport. @ -------------------------------------------------------------------------- |

### GRID: Traverse To Node

- Command ID: `ActSeq_Grid_TraverseToNode`
- Description: Traverses user/random opponent to target node. Requires VisuMZ_2_BattleGridSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| UseActionSelectNode:eval | Action-Selected Node? | boolean | true | — | Use Action-Selected Node Coordinates if possible? Requires "Empty" or "Any" for &lt;Target: x Grid Node&gt; |
| Unit:str | Unit | select | Actor | Actor; Enemy; Friend; Opponent | Which unit do you want to traverse to? |
| Rank:eval | Rank | — | 1 | — | Input the number representing the Rank of the Node you want to traverse to. |
| Flank:eval | Flank | — | 1 | — | Input the number representing the Flank of the Node you want to traverse. |
| Duration:eval | Duration | — | 12 | — | Input the number representing the frames used to move. @ -------------------------------------------------------------------------- |

### -

- Command ID: `ActionSequenceSpaceHorror`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Horror Effects

- Command ID: `ActionSequenceBreakHorror`
- Description: These Action Sequences are Horror Effects-related. Requires VisuMZ_2_HorrorEffects! @ --------------------------------------------------------------------------

No arguments are declared.

### HORROR: Clear All Filters

- Command ID: `ActSeq_Horror_Clear`
- Description: Clear all Horror Effects filters on the target battler(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to remove Horror Effects for. @ -------------------------------------------------------------------------- |

### HORROR: Glitch Create

- Command ID: `ActSeq_Horror_GlitchCreate`
- Description: Creates the glitch effect on the target battler(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to create the Horror Effect for. |
| slices:num | Glitch Slices | number | 10 | — | Glitch slices to be used with the target. |
| offset:num | Glitch Offset | number | 100 | — | Default offset value. |
| animated:eval | Glitch Animated? | boolean | true | — | Animate the glitch effect? |
| aniFrequency:num | Glitch Frequency | number | 300 | — | If animated, how frequent to make the glitch effect? Lower = often     Higher = rarer |
| aniStrength:num | Glitch Strength | number | 30 | — | If animated, how strong is the glitch effect? Lower = weaker     Higher = stronger @ -------------------------------------------------------------------------- |

### HORROR: Glitch Remove

- Command ID: `ActSeq_Horror_GlitchRemove`
- Description: Removes the glitch effect on the target battler(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to remove the Horror Effect for. @ -------------------------------------------------------------------------- |

### HORROR: Noise Create

- Command ID: `ActSeq_Horror_NoiseCreate`
- Description: Creates the noise effect on the target battler(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to create the Horror Effect for. |
| noise:num | Noise Rate | — | 0.3 | — | Noise rate to be used with the target. |
| animated:eval | Noise Animated | boolean | true | — | Animate the noise for the target? @ -------------------------------------------------------------------------- |

### HORROR: Noise Remove

- Command ID: `ActSeq_Horror_NoiseRemove`
- Description: Removes the noise effect on the target battler(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to remove the Horror Effect for. @ -------------------------------------------------------------------------- |

### HORROR: TV Create

- Command ID: `ActSeq_Horror_TVCreate`
- Description: Creates the TV effect on the target battler(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to create the Horror Effect for. |
| lineWidth:num | TV Line Thickness | number | 5 | — | Default TV line thickness Lower = thinner     Higher = thicker |
| vignetting:num | TV Corner Size | — | 0.3 | — | Default TV line corner size Lower = smaller     Higher = bigger |
| animated:eval | TV Animated | boolean | true | — | Animate the TV? |
| aniSpeed:num | TV Speed | — | 0.25 | — | Speed used to animate the TV if animated Lower = slower     Higher = faster @ -------------------------------------------------------------------------- |

### HORROR: TV Remove

- Command ID: `ActSeq_Horror_TVRemove`
- Description: Removes the TV effect on the target battler(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to remove the Horror Effect for. @ -------------------------------------------------------------------------- |

### -

- Command ID: `ActionSequenceSpaceImpact`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Impact

- Command ID: `ActionSequenceBreakImpact`
- Description: These Action Sequences are related to creating impact. Requires VisuMZ_3_ActSeqImpact! @ --------------------------------------------------------------------------

No arguments are declared.

### IMPACT: Bizarro Inversion

- Command ID: `ActSeq_Impact_BlueRedInvert`
- Description: Swaps blue/red colors on the battlefield. Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Enable:eval | Bizarro? | boolean | true | — | Enable Bizarro Inversion effect? @ -------------------------------------------------------------------------- |

### IMPACT: Color Break

- Command ID: `ActSeq_Impact_ColorBreak`
- Description: Breaks the colors on the screen before reassembling. Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Intensity:eval | Intensity | — | 60 | — | What is the intensity of the color break effect? |
| Duration:eval | Duration | — | 60 | — | What is the duration of the color break effect? |
| EasingType:str | Easing Type | combo | OutBack | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. @ -------------------------------------------------------------------------- |

### IMPACT: Desaturation

- Command ID: `ActSeq_Impact_Desaturate`
- Description: Desaturates all colors on the battlefield. Requires VisuMZ_3_ActSeqImpact! Created by Manu Gaming!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Enable:eval | Desaturate? | boolean | true | — | Enable Desaturation effect? @ -------------------------------------------------------------------------- |

### IMPACT: Motion Blur Screen

- Command ID: `ActSeq_Impact_MotionBlurScreen`
- Description: Creates a motion blur on the whole screen. Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Angle:eval | Angle | — | Math.randomInt(360) | — | Determine what angle to make the motion blur at. |
| Rate:eval | Intensity Rate | — | 0.1 | — | This determines intensity rate of the motion blur. Use a number between 0 and 1. |
| Duration:num | Duration | number | 30 | — | How many frames should the motion blur last? What do you want to be its duration? |
| EasingType:str | Easing Type | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. @ -------------------------------------------------------------------------- |

### IMPACT: Motion Blur Target(s)

- Command ID: `ActSeq_Impact_MotionBlurTarget`
- Description: Creates a motion blur on selected target(s). Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to create motion blur effects for. |
| Angle:eval | Angle | — | Math.randomInt(360) | — | Determine what angle to make the motion blur at. |
| Rate:eval | Intensity Rate | — | 0.5 | — | This determines intensity rate of the motion blur. Use a number between 0 and 1. |
| Duration:num | Duration | number | 30 | — | How many frames should the motion blur last? What do you want to be its duration? |
| EasingType:str | Easing Type | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. @ -------------------------------------------------------------------------- |

### IMPACT: Motion Trail Create

- Command ID: `ActSeq_Impact_MotionTrailCreate`
- Description: Creates a motion trail effect for the target(s). Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to create motion trail effects for. |
| delay:num | Delay | number | 1 | — | How many frames to delay by when creating a motion trail? The higher the delay, the less after images there are. |
| duration:num | Duration | number | 30 | — | How many frames should the motion trail last? What do you want to be its duration? |
| hue:num | Hue | number | 0 | — | What do you want to be the hue for the motion trail? |
| opacityStart:num | Starting Opacity | number | 200 | — | What starting opacity value do you want for the motion trail? Opacity values decrease over time. |
| tone:eval | Tone | — | \[0, 0, 0, 0\] | — | What tone do you want for the motion trail? Format: \[Red, Green, Blue, Gray\] @ -------------------------------------------------------------------------- |

### IMPACT: Motion Trail Remove

- Command ID: `ActSeq_Impact_MotionTrailRemove`
- Description: Removes the motion trail effect from the target(s). Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to clear motion trail effects for. @ -------------------------------------------------------------------------- |

### IMPACT: Negative Inversion

- Command ID: `ActSeq_Impact_Negative`
- Description: Inverts all the colors on the battlefield. Requires VisuMZ_3_ActSeqImpact! Created by Manu Gaming!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Enable:eval | Negative? | boolean | true | — | Enable negative inversion effect? @ -------------------------------------------------------------------------- |

### IMPACT: Oversaturation

- Command ID: `ActSeq_Impact_Oversaturate`
- Description: Oversaturates colors on the battlefield. Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Enable:eval | Oversaturate? | boolean | true | — | Enable Oversaturation effect? @ -------------------------------------------------------------------------- |

### IMPACT: Shockwave at Point

- Command ID: `ActSeq_Impact_ShockwavePoint`
- Description: Creates a shockwave at the designated coordinates. Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Coordinates | — | — | — | — | — |
| X:eval | Point: X | — | Graphics.width / 2 | — | What x coordinate do you want to create a shockwave at? You can use JavaScript code. |
| Y:eval | Point: Y | — | (Graphics.height - 200) / 2 | — | What y coordinate do you want to create a shockwave at? You can use JavaScript code. |
| Amp:eval | Amplitude | — | 30 | — | What is the aplitude of the shockwave effect? |
| Wave:eval | Wavelength | — | 160 | — | What is the wavelength of the shockwave effect? |
| Duration:eval | Duration | — | 60 | — | What is the duration of the shockwave? @ -------------------------------------------------------------------------- |

### IMPACT: Shockwave from Each Target(s)

- Command ID: `ActSeq_Impact_ShockwaveEachTargets`
- Description: Creates a shockwave at each of the target(s) location(s). Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to start a shockwave from. |
| TargetLocation:str | Target Location | combo | middle center | front head; front center; front base; middle head; middle center; middle base; back head; back center; back base | Select which part target group to start a shockwave from. |
| OffsetX:eval | Offset X | — | +0 | — | How much to offset the shockwave X point by. Negative: left. Positive: right. |
| OffsetY:eval | Offset Y | — | +0 | — | How much to offset the shockwave Y point by. Negative: up. Positive: down. |
| Amp:eval | Amplitude | — | 30 | — | What is the aplitude of the shockwave effect? |
| Wave:eval | Wavelength | — | 160 | — | What is the wavelength of the shockwave effect? |
| Duration:eval | Duration | — | 60 | — | What is the duration of the shockwave? @ -------------------------------------------------------------------------- |

### IMPACT: Shockwave from Target(s) Center

- Command ID: `ActSeq_Impact_ShockwaveCenterTargets`
- Description: Creates a shockwave from the center of the target(s). Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to start a shockwave from. |
| TargetLocation:str | Target Location | combo | middle center | front head; front center; front base; middle head; middle center; middle base; back head; back center; back base | Select which part target group to start a shockwave from. |
| OffsetX:eval | Offset X | — | +0 | — | How much to offset the shockwave X point by. Negative: left. Positive: right. |
| OffsetY:eval | Offset Y | — | +0 | — | How much to offset the shockwave Y point by. Negative: up. Positive: down. |
| Amp:eval | Amplitude | — | 30 | — | What is the aplitude of the shockwave effect? |
| Wave:eval | Wavelength | — | 160 | — | What is the wavelength of the shockwave effect? |
| Duration:eval | Duration | — | 60 | — | What is the duration of the shockwave? @ -------------------------------------------------------------------------- |

### IMPACT: Time Scale

- Command ID: `ActSeq_Impact_TimeScale`
- Description: Adjust time to go faster or slower! Requires VisuMZ_3_ActSeqImpact! Created by Manu Gaming!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Scale:eval | Scale | — | 1.00 | — | Adjusts how fast/slow time goes. 1.00 is normal. Lower is slower. Higher is faster. @ -------------------------------------------------------------------------- |

### IMPACT: Time Stop

- Command ID: `ActSeq_Impact_TimeStop`
- Description: Stops time for a set amount of milliseconds. Requires VisuMZ_3_ActSeqImpact! Created by Manu Gaming!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ms:eval | Milliseconds | — | 1000 | — | How many milliseconds should time stop for? 1000 milliseconds = 1 second. @ -------------------------------------------------------------------------- |

### IMPACT: Zoom Blur at Point

- Command ID: `ActSeq_Impact_ZoomBlurPoint`
- Description: Creates a zoom blur at the designated coordinates. Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Coordinates | — | — | — | — | — |
| X:eval | Point: X | — | Graphics.width / 2 | — | What x coordinate do you want to focus the zoom at? You can use JavaScript code. |
| Y:eval | Point: Y | — | (Graphics.height - 200) / 2 | — | What y coordinate do you want to focus the zoom at? You can use JavaScript code. |
| Strength:eval | Zoom Strength | — | 0.5 | — | What is the strength of the zoom effect? Use a number between 0 and 1. |
| Radius:eval | Visible Radius | — | 0 | — | How much of a radius should be visible from the center? |
| Duration:eval | Duration | — | 60 | — | What is the duration of the zoom blur? |
| EasingType:str | Easing Type | combo | OutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. @ -------------------------------------------------------------------------- |

### IMPACT: Zoom Blur at Target(s) Center

- Command ID: `ActSeq_Impact_ZoomBlurTargetCenter`
- Description: Creates a zoom blur at the center of targets. Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to start a zoom blur from. |
| TargetLocation:str | Target Location | combo | middle center | front head; front center; front base; middle head; middle center; middle base; back head; back center; back base | Select which part target group to start a zoom blur from. |
| OffsetX:eval | Offset X | — | +0 | — | How much to offset the zoom blur X point by. Negative: left. Positive: right. |
| OffsetY:eval | Offset Y | — | +0 | — | How much to offset the zoom blur Y point by. Negative: up. Positive: down. |
| Strength:eval | Zoom Strength | — | 0.5 | — | What is the strength of the zoom effect? Use a number between 0 and 1. |
| Radius:eval | Visible Radius | — | 0 | — | How much of a radius should be visible from the center? |
| Duration:eval | Duration | — | 60 | — | What is the duration of the zoom blur? |
| EasingType:str | Easing Type | combo | OutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. @ -------------------------------------------------------------------------- |

### -

- Command ID: `ActionSequenceSpaceInject`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Inject

- Command ID: `ActionSequenceBreakInject`
- Description: These Action Sequences are related to injected animations. Requires VisuMZ_3_ActSeqImpact! @ --------------------------------------------------------------------------

No arguments are declared.

### INJECT: Animation Begin

- Command ID: `ActSeq_Inject_AnimationStart`
- Description: Injects and plays a whole spritesheet animation. Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to inject the animation on. |
| Filename:str | Filename | file | Untitled | — | Select the animation spritesheet file. Located in the /img/sv_actors/ folder. |
| horzCells:num | Horizontal Cells | number | 1 | — | How many horizontal cells (or columns) are there? |
| vertCells:num | Vertical Cells | number | 1 | — | How many vertical cells (or rows) are there? |
| frameDelay:num | Frame Delay | number | 1 | — | How many frames are played inbetween cells? |
| smooth:eval | Smooth Bitmap? | boolean | false | — | Smooth the spritesheet graphic? |
| Offset | — | — | — | — | — |
| offsetX:eval | Offset X | — | +0 | — | Offsets the X position of the injected animation. Negative: left. Positive: right. |
| offsetY:eval | Offset Y | — | +0 | — | Offsets the Y position of the injected animation. Negative: up. Positive: down. @ -------------------------------------------------------------------------- |

### INJECT: Animation End

- Command ID: `ActSeq_Inject_AnimationEnd`
- Description: Stops and ends any injected animations on target(s). Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to stop injected animation(s). @ -------------------------------------------------------------------------- |

### INJECT: Animation Pause/Resume

- Command ID: `ActSeq_Inject_AnimationPauseResume`
- Description: Pauses/resumes any injected animations on target(s). Requires VisuMZ_3_ActSeqImpact!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to pause injected animation(s). |
| pause:eval | Pause? | boolean | true | — | Pause the injected animation? @ -------------------------------------------------------------------------- |

### INJECT: Wait For Injected Animation

- Command ID: `ActSeq_Inject_WaitForInjectAni`
- Description: Waits for injected animations to complete before performing next command. Requires VisuMZ_3_ActSeqImpact! @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceMechanics`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Mechanics

- Command ID: `ActionSequenceBreakMechanics`
- Description: These Action Sequences are related to various mechanics related to the battle system. @ --------------------------------------------------------------------------

No arguments are declared.

### MECH: Action Effect

- Command ID: `ActSeq_Mechanics_ActionEffect`
- Description: Causes the unit(s) to take damage/healing from action and incurs any changes made such as buffs and states.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to receive the current action's effects. @ -------------------------------------------------------------------------- |

### MECH: Active Chain Input Disable

- Command ID: `ActSeq_Mechanics_ActiveChainInputDisable`
- Description: Disables input for Active Chain Skills at this time. Requires VisuMZ_3_ActiveChainSkills! @ --------------------------------------------------------------------------

No arguments are declared.

### MECH: Add Buff/Debuff

- Command ID: `ActSeq_Mechanics_AddBuffDebuff`
- Description: Adds buff(s)/debuff(s) to unit(s). Determine which parameters are affected and their durations.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to receive the buff(s) and/or debuff(s). |
| Buffs:arraystr | Buff Parameters | combo\[\] | \["ATK"\] | MaxHP; MaxMP; ATK; DEF; MAT; MDF; AGI; LUK | Select which parameter(s) to buff. Insert a parameter multiple times to raise its stacks. |
| Debuffs:arraystr | Debuff Parameters | combo\[\] | \["DEF"\] | MaxHP; MaxMP; ATK; DEF; MAT; MDF; AGI; LUK | Select which parameter(s) to debuff. Insert a parameter multiple times to raise its stacks. |
| Turns:eval | Turns | — | 5 | — | Number of turns to set the parameter(s) buffs to. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### MECH: Add State

- Command ID: `ActSeq_Mechanics_AddState`
- Description: Adds state(s) to unit(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to receive the buff(s). |
| States:arraynum | States | state\[\] | \["4"\] | — | Select which state ID(s) to add to unit(s). Insert multiple state ID's to add multiple at once. @ -------------------------------------------------------------------------- |

### MECH: Analyze Weakness

- Command ID: `ActSeq_Mechanics_AnalyzeWeakness`
- Description: Reveal elemental weakness(es) from target(s). Requires VisuMZ_3_WeaknessDisplay!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to reveal elemental weaknesses for. |
| Reveal:eval | Reveal | — | 1 | — | How many elemental weaknesses do you wish to reveal? You may use JavaScript code. @ -------------------------------------------------------------------------- |

### MECH: Armor Penetration

- Command ID: `ActSeq_Mechanics_ArmorPenetration`
- Description: Adds an extra layer of defensive penetration/reduction. You may use JavaScript code for any of these.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ArmorPenetration | Armor/Magic Penetration | — | — | — | — |
| ArPenRate:eval | Rate | — | 0.00 | — | Penetrates an extra multiplier of armor by this value. |
| ArPenFlat:eval | Flat | — | 0 | — | Penetrates a flat amount of armor by this value. |
| ArmorReduction | Armor/Magic Reduction | — | — | — | — |
| ArRedRate:eval | Rate | — | 0.00 | — | Reduces an extra multiplier of armor by this value. |
| ArRedFlat:eval | Flat | — | 0 | — | Reduces a flat amount of armor by this value. @ -------------------------------------------------------------------------- |

### MECH: ATB Gauge

- Command ID: `ActSeq_Mechanics_AtbGauge`
- Description: Alters the ATB/TPB Gauges. Requires VisuMZ_2_BattleSystemATB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to alter the ATB/TPB Gauges for. |
| Charging | — | — | — | — | — |
| ChargeRate:eval | Charge Rate | — | -0.00 | — | Changes made to the ATB Gauge if it is currently charging. |
| Casting | — | — | — | — | — |
| CastRate:eval | Cast Rate | — | -0.00 | — | Changes made to the ATB Gauge if it is currently casting. |
| Interrupt:eval | Interrupt? | boolean | false | — | Interrupt the ATB Gauge if it is currently casting? @ -------------------------------------------------------------------------- |

### MECH: Boost Points Change

- Command ID: `ActSeq_Mechanics_BoostPointsChange`
- Description: Changes Boost Points for target(s). Requires VisuMZ_3_BoostAction!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to alter the Boost Points for. |
| BoostPoints:eval | Alter Boost Points By | — | +1 | — | Alters the unit(s) Boost Points. Positive for gaining points. Negative for losing points. @ -------------------------------------------------------------------------- |

### MECH: Boost Store Data

- Command ID: `ActSeq_Mechanics_BoostPointsStoreData`
- Description: Stores the number of Boosts used this action inside a variable. Requires VisuMZ_3_BoostAction!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| VariableID:num | Variable ID | variable | 1 | — | Which variable do you want to store the data inside? @ -------------------------------------------------------------------------- |

### MECH: Break Shield Change

- Command ID: `ActSeq_Mechanics_BreakShieldChange`
- Description: Changes Break Shields for target(s) if not Break Stunned. Requires VisuMZ_4_BreakShields!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to alter the Break Shields for. |
| BreakShields:eval | Alter Break Shields By | — | -1 | — | Alters the unit(s) Break Shields. Positive for gaining shields. Negative for losing shields. @ -------------------------------------------------------------------------- |

### MECH: Break Shield Reset

- Command ID: `ActSeq_Mechanics_BreakShieldReset`
- Description: Resets Break Shields for target(s) if not Break Stunned. Requires VisuMZ_4_BreakShields!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to reset the Break Shields for. @ -------------------------------------------------------------------------- |

### MECH: BTB Brave Points

- Command ID: `ActSeq_Mechanics_BtbGain`
- Description: Alters the target(s) Brave Points to an exact value. Requires VisuMZ_2_BattleSystemBTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to alter the ATB/TPB Gauges for. |
| BravePoints:eval | Alter Brave Points By | — | +1 | — | Alters the target(s) Brave Points. Positive for gaining BP. Negative for losing BP. @ -------------------------------------------------------------------------- |

### MECH: Collapse

- Command ID: `ActSeq_Mechanics_Collapse`
- Description: Causes the unit(s) to perform its collapse animation if the unit(s) has died.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to process a death collapse. |
| ForceDeath:eval | Force Death | boolean | false | — | Force death even if the unit has not reached 0 HP? This will remove immortality. |
| WaitForEffect:eval | Wait For Effect? | boolean | true | — | Wait for the collapse effect to complete before performing next command? @ -------------------------------------------------------------------------- |

### MECH: CTB Order

- Command ID: `ActSeq_Mechanics_CtbOrder`
- Description: Alters the CTB Turn Order. Requires VisuMZ_2_BattleSystemCTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to alter the CTB Turn Order for. |
| ChangeOrderBy:eval | Change Order By | — | +1 | — | Changes turn order for target(s) by this amount. Positive increases wait. Negative decreases wait. @ -------------------------------------------------------------------------- |

### MECH: CTB Speed

- Command ID: `ActSeq_Mechanics_CtbSpeed`
- Description: Alters the CTB Speed. Requires VisuMZ_2_BattleSystemCTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to alter the CTB Speed for. |
| ChargeRate:eval | Charge Rate | — | -0.00 | — | Changes made to the CTB Speed if it is currently charging. |
| CastRate:eval | Cast Rate | — | -0.00 | — | Changes made to the CTB Speed if it is currently casting. @ -------------------------------------------------------------------------- |

### MECH: Custom Damage Formula

- Command ID: `ActSeq_Mechanics_CustomDmgFormula`
- Description: Changes the current action's damage formula to custom. This will assume the MANUAL damage style.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Formula:str | Formula | — | default | — | Changes the current action's damage formula to custom. Use 'default' to revert the damage formula. @ -------------------------------------------------------------------------- |

### MECH: Damage Popup

- Command ID: `ActSeq_Mechanics_DamagePopup`
- Description: Causes the unit(s) to display the current state of damage received or healed.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to prompt a damage popup. @ -------------------------------------------------------------------------- |

### MECH: Dead Label Jump

- Command ID: `ActSeq_Mechanics_DeathBreak`
- Description: If the active battler is dead, jump to a specific label in the common event.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| JumpToLabel:str | Jump To Label | — | Untitled | — | If the active battler is dead, jump to this specific label in the common event. @ -------------------------------------------------------------------------- |

### MECH: Emulate Attack Effect

- Command ID: `ActSeq_Mechanics_EmulateAttackEffect`
- Description: Emulate an "Action Effect" but using a the user's attack skill instead of the current action.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Users:arraystr | User(s) | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to perform the action's effects. |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to receive the current action's effects. @ -------------------------------------------------------------------------- |

### MECH: Emulate Guard Effect

- Command ID: `ActSeq_Mechanics_EmulateGuardEffect`
- Description: Emulate an "Action Effect" but using a the user's guard skill instead of the current action.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Users:arraystr | User(s) | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to perform the action's effects. |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to receive the current action's effects. @ -------------------------------------------------------------------------- |

### MECH: Emulate Item Effect

- Command ID: `ActSeq_Mechanics_EmulateItemEffect`
- Description: Emulate an "Action Effect" but using a specific item instead of the current action.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ItemID:eval | Item ID | item | 7 | — | Which item ID will be emulated? |
| Users:arraystr | User(s) | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to perform the action's effects. |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to receive the current action's effects. @ -------------------------------------------------------------------------- |

### MECH: Emulate Skill Cost

- Command ID: `ActSeq_Mechanics_EmulateSkillCost`
- Description: Pick a skill for target(s) to emulate paying the cost of. Includes cooldowns and limited uses.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| SkillID:eval | Skill ID | skill | 0 | — | Which skill ID will have its cost paid for? Use 0 for current action's skill. |
| Users:arraystr | User(s) | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to perform the action's effects. @ -------------------------------------------------------------------------- |

### MECH: Emulate Skill Effect

- Command ID: `ActSeq_Mechanics_EmulateSkillEffect`
- Description: Emulate an "Action Effect" but using a specific skill instead of the current action.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| SkillID:eval | Skill ID | skill | 99 | — | Which skill ID will be emulated? |
| Users:arraystr | User(s) | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to perform the action's effects. |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to receive the current action's effects. @ -------------------------------------------------------------------------- |

### MECH: Enemy Escape

- Command ID: `ActSeq_Mechanics_EnemyEscape`
- Description: Causes the enemy unit(s) to escape.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to escape. @ -------------------------------------------------------------------------- |

### MECH: ETB Energy Count

- Command ID: `ActSeq_Mechanics_EtbAction`
- Description: Alters the subject team's available Energy Count. Requires VisuMZ_2_BattleSystemETB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ActionCount:eval | Energy Count | — | +1 | — | Alters the subject team's available Energy Count. Positive for gaining energy. Negative for losing energy. @ -------------------------------------------------------------------------- |

### MECH: FTB Action Count

- Command ID: `ActSeq_Mechanics_FtbAction`
- Description: Alters the subject team's available Action Count. Requires VisuMZ_2_BattleSystemFTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ActionCount:eval | Action Count | — | +1 | — | Alters the subject team's available Action Count. Positive for gaining actions. Negative for losing actions. @ -------------------------------------------------------------------------- |

### MECH: HP, MP, TP

- Command ID: `ActSeq_Mechanics_HpMpTp`
- Description: Alters the HP, MP, and TP values for unit(s). Positive values for healing. Negative values for damage.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to receive the current action's effects. |
| HP | — | — | — | — | — |
| HP_Rate:eval | HP Rate | — | +0.00 | — | Changes made to HP based on rate. Positive values for healing. Negative values for damage. |
| HP_Flat:eval | HP Flat | — | +0 | — | Flat changes made to HP. Positive values for healing. Negative values for damage. |
| MP | — | — | — | — | — |
| MP_Rate:eval | MP Rate | — | +0.00 | — | Changes made to MP based on rate. Positive values for healing. Negative values for damage. |
| MP_Flat:eval | MP Flat | — | +0 | — | Flat changes made to MP. Positive values for healing. Negative values for damage. |
| TP | — | — | — | — | — |
| TP_Rate:eval | TP Rate | — | +0.00 | — | Changes made to TP based on rate. Positive values for healing. Negative values for damage. |
| TP_Flat:eval | TP Flat | — | +0 | — | Flat changes made to TP. Positive values for healing. Negative values for damage. |
| ShowPopup:eval | Damage Popup? | boolean | true | — | Display a damage popup after? @ -------------------------------------------------------------------------- |

### MECH: Immortal

- Command ID: `ActSeq_Mechanics_Immortal`
- Description: Changes the immortal flag of targets. If immortal flag is removed and a unit would die, collapse that unit.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user","all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Alter the immortal flag of these groups. If immortal flag is removed and a unit would die, collapse that unit. |
| Immortal:eval | Immortal | boolean | false | — | Turn immortal flag for unit(s) on/off? @ -------------------------------------------------------------------------- |

### MECH: Multipliers

- Command ID: `ActSeq_Mechanics_Multipliers`
- Description: Changes the multipliers for the current action. You may use JavaScript code for any of these.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| CriticalHit | Critical Hit% | — | — | — | — |
| CriticalHitRate:eval | Rate | — | 1.00 | — | Affects chance to land a critical hit by this multiplier. |
| CriticalHitFlat:eval | Flat | — | +0.00 | — | Affects chance to land a critical hit by this flat bonus. |
| CriticalDmg | Critical Damage | — | — | — | — |
| CriticalDmgRate:eval | Rate | — | 1.00 | — | Affects critical damage by this multiplier. |
| CriticalDmgFlat:eval | Flat | — | +0.00 | — | Affects critical damage by this flat bonus. |
| Damage | Damage/Healing | — | — | — | — |
| DamageRate:eval | Rate | — | 1.00 | — | Sets the damage/healing multiplier for current action. |
| DamageFlat:eval | Flat | — | +0.00 | — | Sets the damage/healing bonus for current action. |
| HitRate | Hit Rate | — | — | — | — |
| HitRate:eval | Rate | — | 1.00 | — | Affects chance to connect attack by this multiplier. |
| HitFlat:eval | Flat | — | +0.00 | — | Affects chance to connect attack by this flat bonus. @ -------------------------------------------------------------------------- |

### MECH: Once Parallel

- Command ID: `ActSeq_Mechanics_OnceParallel`
- Description: Plays a Common Event parallel to the battle event once without repeating itself when done.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| CommonEventID:num | Common Event ID | common_event | 1 | — | The ID of the parallel Common Event to play. Does NOT repeat itself when finished. @ -------------------------------------------------------------------------- |

### MECH: OTB Order

- Command ID: `ActSeq_Mechanics_OtbOrder`
- Description: Alters the OTB Turn Order. Best used with single targets. Requires VisuMZ_2_BattleSystemOTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to alter the OTB Turn Order for. |
| CurrentTurn:eval | Current Turn By | — | +0 | — | Changes turn order for target(s) by this amount. Positive increases wait. Negative decreases wait. |
| NextTurn:eval | Next Turn By | — | +1 | — | Changes turn order for target(s) by this amount. Positive increases wait. Negative decreases wait. |
| FollowTurn:eval | Follow Turn By | — | +0 | — | Changes turn order for target(s) by this amount. Positive increases wait. Negative decreases wait. @ -------------------------------------------------------------------------- |

### MECH: PTB Alter Cost

- Command ID: `ActSeq_Mechanics_PtbAlterCost`
- Description: Alters the action's cost settings. Requires VisuMZ_2_BattleSystemPTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Override:eval | Override? | boolean | false | — | Overrides any 'permanent' settings for Changeability? |
| alterChange:str | Alter Changeability | select | unchanged | Unchanged - Cost type is unchanged after this effect=unchanged; Permanent - Cost type can no longer be changed after=permanent; Temporary - Cost type can still be changed after=temporary | Allow the cost type and value to be changeable? |
| alterType:str | Alter Cost Type | select | convert | Unchanged - No changes are made=unchanged; Consume - Removes half, otherwise consumes full=consume; Convert - Converts full =&gt; half, otherwise consumes half=convert; Compress - Consumes half, otherwise converts full =&gt; half=compress | Change the cost type to this scenario. Use 'Unchanged' for no changes. |
| alterCost:eval | Alter Cost Value | — | +0 | — | What is the default action cost for this scenario? |
| alterPriority:eval | Priority | — | 50 | — | What is this scenario's priority? Scenario outcomes with equal or lower priorities cannot override types and costs. @ -------------------------------------------------------------------------- |

### MECH: PTB Conversion

- Command ID: `ActSeq_Mechanics_PtbConvert`
- Description: Converts full actions into half actions. Requires VisuMZ_2_BattleSystemPTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ConvertCount:eval | Conversion Count | — | 1 | — | Converts full actions into half actions. If not enough, consume half actions. @ -------------------------------------------------------------------------- |

### MECH: PTB Full/Half Action(s)

- Command ID: `ActSeq_Mechanics_PtbFullHalfAction`
- Description: Alters the subject team's available Full/Half Actions. Requires VisuMZ_2_BattleSystemPTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| FullActions:eval | Full Actions | — | +0 | — | Alters the subject team's available Full Actions. Positive for gaining. Negative for losing. |
| HalfActions:eval | Half Actions | — | +0 | — | Alters the subject team's available Half Actions. Positive for gaining. Negative for losing. @ -------------------------------------------------------------------------- |

### MECH: Remove Buff/Debuff

- Command ID: `ActSeq_Mechanics_RemoveBuffDebuff`
- Description: Removes buff(s)/debuff(s) from unit(s). Determine which parameters are removed.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to have the buff(s) and/or debuff(s) removed. |
| Buffs:arraystr | Buff Parameters | combo\[\] | \["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"\] | MaxHP; MaxMP; ATK; DEF; MAT; MDF; AGI; LUK | Select which buffed parameter(s) to remove. |
| Debuffs:arraystr | Debuff Parameters | combo\[\] | \["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"\] | MaxHP; MaxMP; ATK; DEF; MAT; MDF; AGI; LUK | Select which debuffed parameter(s) to remove. @ -------------------------------------------------------------------------- |

### MECH: Remove State

- Command ID: `ActSeq_Mechanics_RemoveState`
- Description: Remove state(s) from unit(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to have states removed from. |
| States:arraynum | States | state\[\] | \["4"\] | — | Select which state ID(s) to remove from unit(s). Insert multiple state ID's to remove multiple at once. @ -------------------------------------------------------------------------- |

### MECH: State Turns Change By

- Command ID: `ActSeq_Mechanics_StateTurnsChangeBy`
- Description: Changes target(s) state turns by an amount. Requires VisuMZ_1_SkillsStatesCore!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to affect state turns for. |
| StateID:num | State ID | state | 5 | — | What is the ID of the state you wish to change turns for? Only works on states that can have turns. |
| Turns:eval | Change Turns By | — | +1 | — | How many turns should the state be changed to? You may use JavaScript code. |
| AutoAddState:eval | Auto-Add State? | boolean | true | — | Automatically adds state if actor(s) does not have it applied? @ -------------------------------------------------------------------------- |

### MECH: State Turns Change To

- Command ID: `ActSeq_Mechanics_StateTurnsChangeTo`
- Description: Changes target(s) state turns to a specific value. Requires VisuMZ_1_SkillsStatesCore!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to affect state turns for. |
| StateID:num | State ID | state | 5 | — | What is the ID of the state you wish to change turns for? Only works on states that can have turns. |
| Turns:eval | Change Turns To | — | 10 | — | How many turns should the state be changed to? You may use JavaScript code. |
| AutoAddState:eval | Auto-Add State? | boolean | true | — | Automatically adds state if target(s) does not have it applied? @ -------------------------------------------------------------------------- |

### MECH: STB Exploit Effect

- Command ID: `ActSeq_Mechanics_StbExploit`
- Description: Utilize the STB Exploitation mechanics! Requires VisuMZ_2_BattleSystemSTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Exploited:eval | Target(s) Exploited? | boolean | true | — | Exploit the below targets? |
| Targets:arraystr | Targets | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to become exploited. |
| ForceExploited:eval | Force Exploitation | boolean | false | — | Force the exploited status? |
| Exploiter:eval | User Exploiter? | boolean | true | — | Allow the user to become the exploiter? |
| ForceExploited:eval | Force Exploitation | boolean | false | — | Force the exploiter status? @ -------------------------------------------------------------------------- |

### MECH: STB Extra Action

- Command ID: `ActSeq_Mechanics_StbExtraAction`
- Description: Adds an extra action for the currently active battler. Requires VisuMZ_2_BattleSystemSTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Actions:eval | Extra Actions | — | 1 | — | How many extra actions should the active battler gain? You may use JavaScript code. @ -------------------------------------------------------------------------- |

### MECH: STB Remove Excess Actions

- Command ID: `ActSeq_Mechanics_StbRemoveExcessActions`
- Description: Removes excess actions from the active battler. Requires VisuMZ_2_BattleSystemSTB!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Actions:eval | Remove Actions | — | 99 | — | How many actions to remove from the active battler? You may use JavaScript code. @ -------------------------------------------------------------------------- |

### MECH: Swap Weapon

- Command ID: `ActSeq_Mechanics_SwapWeapon`
- Description: Causes the unit(s) to swap their weapon for another. Requires VisuMZ_2_WeaponSwapSystem!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to swap weapons for. |
| WeaponTypeID:eval | Weapon Type ID | — | 1 | — | Which weapon type to swap to? This is NOT the weapon's ID. It's the weapon TYPE. @ -------------------------------------------------------------------------- |

### MECH: Text Popup

- Command ID: `ActSeq_Mechanics_TextPopup`
- Description: Causes the unit(s) to display a text popup.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["target"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to prompt a text popup. |
| Text:str | Text | — | Text | — | What text do you wish to display? |
| TextColor:str | Text Color | — | #ffffff | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| FlashColor:eval | Flash Color | — | \[255, 0, 0, 160\] | — | Adjust the popup's flash color. Format: \[red, green, blue, alpha\] |
| FlashDuration:num | Flash Duration | number | 60 | — | What is the frame duration of the flash effect? @ -------------------------------------------------------------------------- |

### MECH: Variable Popup

- Command ID: `ActSeq_Mechanics_VariablePopup`
- Description: Causes the unit(s) to display a popup using the data stored inside a variable.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["target"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to prompt a text popup. |
| Variable:num | Variable ID | variable | 1 | — | Get data from which variable to display as a popup? |
| DigitGrouping:eval | Digit Grouping | boolean | true | — | Use digit grouping to separate numbers? Requires VisuMZ_0_CoreEngine! |
| TextColor:str | Text Color | — | #ffffff | — | Use #rrggbb for custom colors or regular numbers for text colors from the Window Skin. |
| FlashColor:eval | Flash Color | — | \[0, 0, 0, 0\] | — | Adjust the popup's flash color. Format: \[red, green, blue, alpha\] |
| FlashDuration:num | Flash Duration | number | 60 | — | What is the frame duration of the flash effect? @ -------------------------------------------------------------------------- |

### MECH: Wait For Effect

- Command ID: `ActSeq_Mechanics_WaitForEffect`
- Description: Waits for the effects to complete before performing next command. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceMotion`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Motion

- Command ID: `ActionSequenceBreakMotion`
- Description: These Action Sequences allow you the ability to control the motions of sideview sprites. @ --------------------------------------------------------------------------

No arguments are declared.

### MOTION: Clear Freeze Frame

- Command ID: `ActSeq_Motion_ClearFreezeFrame`
- Description: Clears any freeze frames from the unit(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to clear freeze frames for. @ -------------------------------------------------------------------------- |

### MOTION: Freeze Motion Frame

- Command ID: `ActSeq_Motion_FreezeMotionFrame`
- Description: Forces a freeze frame instantly at the selected motion. Automatically clears with a new motion.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to freeze motions for. |
| MotionType:str | Motion Type | combo | attack | walk; wait; chant; guard; damage; evade; attack; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Freeze this motion for the unit(s). |
| Frame:num | Frame Index | — | 2 | — | Which frame do you want to freeze the motion on? Frame index values start at 0. |
| ShowWeapon:eval | Show Weapon? | boolean | true | — | If using 'attack', 'thrust', 'swing', or 'missile', display the weapon sprite? @ -------------------------------------------------------------------------- |

### MOTION: Motion Type

- Command ID: `ActSeq_Motion_MotionType`
- Description: Causes the unit(s) to play the selected motion.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to perform a motion. |
| MotionType:str | Motion Type | combo | attack | walk; wait; chant; guard; damage; evade; attack; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Play this motion for the unit(s). |
| ShowWeapon:eval | Show Weapon? | boolean | true | — | If using 'attack', 'thrust', 'swing', or 'missile', display the weapon sprite? @ -------------------------------------------------------------------------- |

### MOTION: Perform Action

- Command ID: `ActSeq_Motion_PerformAction`
- Description: Causes the unit(s) to play the proper motion based on the current action.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to perform a motion. @ -------------------------------------------------------------------------- |

### MOTION: Refresh Motion

- Command ID: `ActSeq_Motion_RefreshMotion`
- Description: Cancels any set motions unit(s) has to do and use their most natural motion at the moment.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to refresh their motion state. @ -------------------------------------------------------------------------- |

### MOTION: Wait By Motion Frame

- Command ID: `ActSeq_Motion_WaitMotionFrame`
- Description: Creates a wait equal to the number of motion frames passing. Time is based on Plugin Parameters => Actors => Motion Speed.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| MotionFrameWait:num | Motion Frames to Wait? | number | 1 | — | Each "frame" is equal to the value found in Plugin Parameters =&gt; Actors =&gt; Motion Speed @ -------------------------------------------------------------------------- |

### -

- Command ID: `ActionSequenceSpaceMovement`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Movement

- Command ID: `ActionSequenceBreakMovement`
- Description: These Action Sequences allow you the ability to control the sprites of actors and enemies in battle. @ --------------------------------------------------------------------------

No arguments are declared.

### MOVE: Battle Step

- Command ID: `ActSeq_Movement_BattleStep`
- Description: Causes the unit(s) to move forward past their home position to prepare for action.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to move. |
| WaitForMovement:eval | Wait For Movement? | boolean | true | — | Wait for movement to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Change Home By Distance

- Command ID: `ActSeq_Movement_HomeMoveBy`
- Description: Change unit(s)'s home position by a distance from their current home position(s). Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change home position(s) for. |
| DistanceAdjust:str | Distance Adjustment | select | horz | Normal - No adjustments made=none; Horizontal - Actors adjust left, Enemies adjust right=horz; Vertical - Actors adjust Up, Enemies adjust down=vert; Both - Applies both Horizontal and Vertical=horz + vert | Makes adjustments to distance values to determine which direction to change by. |
| DistanceX:eval | Distance: X | — | 48 | — | Horizontal distance to change home by. You may use JavaScript code. |
| DistanceY:eval | Distance: Y | — | 0 | — | Vertical distance to change home by. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for total change amount. |
| FaceDirection:eval | Face Destination? | boolean | true | — | Turn and face the destination? |
| EasingType:str | Movement Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| MotionType:str | Movement Motion | combo | walk | walk; wait; chant; guard; damage; evade; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Play this motion for the unit(s). |
| WaitForMovement:eval | Wait For Movement? | boolean | true | — | Wait for movement to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Change Home To JS Coordinates

- Command ID: `ActSeq_Movement_HomeMoveToJsPoint`
- Description: Change home position(s) to specified JS Coordinates. Sideview-only! Uses JavaScript!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change home position(s) for. |
| DestinationJS:func | JS: Coordinates | note | "// Declare Variables\nconst target = arguments\[0\];\nlet goalX = 0;\nlet goalY = 0;\n\n// Calculations\ngoalX = Graphics.width / 2;\ngoalY = Graphics.height / 2;\n\n// Return Data\nreturn new Point(goalX, goalY);" | — | Code used to determine the coordinates for the target(s)'s new home position. |
| OffsetAdjust:str | Offset Adjustment | select | horz | Normal - No adjustments made=none; Horizontal - Actors adjust left, Enemies adjust right=horz; Vertical - Actors adjust Up, Enemies adjust down=vert; Both - Applies both Horizontal and Vertical=horz + vert | Makes adjustments to offset values to determine which direction to adjust the destination by. |
| OffsetX:eval | Offset: X | — | 0 | — | Horizontal offset to change home by. You may use JavaScript code. |
| OffsetY:eval | Offset: Y | — | 0 | — | Vertical offset to change home by. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for total change amount. |
| FaceDirection:eval | Face Destination? | boolean | true | — | Turn and face the destination? |
| EasingType:str | Movement Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| MotionType:str | Movement Motion | combo | walk | walk; wait; chant; guard; damage; evade; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Play this motion for the unit(s). |
| WaitForMovement:eval | Wait For Movement? | boolean | true | — | Wait for movement to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Change Home To Point

- Command ID: `ActSeq_Movement_HomeMoveToPoint`
- Description: Change home position(s) to a target point on the screen. Sideview-only! Points based off Graphics.boxWidth/Height.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change home position(s) for. |
| Destination:str | Destination Point | combo | center | center; point x, y | Select which point to face. Replace 'x' and 'y' with coordinates |
| OffsetAdjust:str | Offset Adjustment | select | horz | Normal - No adjustments made=none; Horizontal - Actors adjust left, Enemies adjust right=horz; Vertical - Actors adjust Up, Enemies adjust down=vert; Both - Applies both Horizontal and Vertical=horz + vert | Makes adjustments to offset values to determine which direction to adjust the destination by. |
| OffsetX:eval | Offset: X | — | 0 | — | Horizontal offset to change home by. You may use JavaScript code. |
| OffsetY:eval | Offset: Y | — | 0 | — | Vertical offset to change home by. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for total change amount. |
| FaceDirection:eval | Face Destination? | boolean | true | — | Turn and face the destination? |
| EasingType:str | Movement Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| MotionType:str | Movement Motion | combo | walk | walk; wait; chant; guard; damage; evade; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Play this motion for the unit(s). |
| WaitForMovement:eval | Wait For Movement? | boolean | true | — | Wait for movement to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Change Home To Target(s)

- Command ID: `ActSeq_Movement_HomeMoveToTarget`
- Description: Moves unit(s) to another unit(s) on the battle field. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets1:arraystr | Targets (Moving) | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change home position(s) for. |
| Targets2:arraystr | Targets (Destination) | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change home position to. |
| TargetLocation:str | Target Location | combo | front base | front head; front center; front base; middle head; middle center; middle base; back head; back center; back base | Select which part target group to change home position to. |
| MeleeDistance:eval | Melee Distance | — | 24 | — | The melee distance away from the target location in addition to the battler's width. |
| OffsetAdjust:str | Offset Adjustment | select | horz | Normal - No adjustments made=none; Horizontal - Actors adjust left, Enemies adjust right=horz; Vertical - Actors adjust Up, Enemies adjust down=vert; Both - Applies both Horizontal and Vertical=horz + vert | Makes adjustments to offset values to determine which direction to adjust the destination by. |
| OffsetX:eval | Offset: X | — | 0 | — | Horizontal offset to change home by. You may use JavaScript code. |
| OffsetY:eval | Offset: Y | — | 0 | — | Vertical offset to change home by. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for total change amount. |
| FaceDirection:eval | Face Destination? | boolean | true | — | Turn and face the destination? |
| EasingType:str | Movement Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| MotionType:str | Movement Motion | combo | walk | walk; wait; chant; guard; damage; evade; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Play this motion for the unit(s). |
| WaitForMovement:eval | Wait For Movement? | boolean | true | — | Wait for movement to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Face Direction

- Command ID: `ActSeq_Movement_FaceDirection`
- Description: Causes the unit(s) to face forward or backward. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change direction. |
| Direction:str | Direction | combo | forward | forward; backward; random | Select which direction to face. @ -------------------------------------------------------------------------- |

### MOVE: Face JS Coordinates

- Command ID: `ActSeq_Movement_FaceJsPoint`
- Description: Causes the unit(s) to face specified JS Coordinates. Sideview-only! Uses JavaScript!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change direction. |
| PointJS:func | JS: Coordinates | note | "// Declare Variables\nconst target = arguments\[0\];\nlet goalX = 0;\nlet goalY = 0;\n\n// Calculations\ngoalX = Graphics.width / 2;\ngoalY = Graphics.height / 2;\n\n// Return Data\nreturn new Point(goalX, goalY);" | — | Code used to determine the coordinates for the target(s) to face towards. |
| FaceAway:eval | Face Away From? | boolean | false | — | Face away from the point instead? @ -------------------------------------------------------------------------- |

### MOVE: Face Point

- Command ID: `ActSeq_Movement_FacePoint`
- Description: Causes the unit(s) to face a point on the screen. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change direction. |
| Point:str | Point | combo | home | home; center; point x, y | Select which point to face. Replace 'x' and 'y' with coordinates |
| FaceAway:eval | Face Away From? | boolean | false | — | Face away from the point instead? @ -------------------------------------------------------------------------- |

### MOVE: Face Target(s)

- Command ID: `ActSeq_Movement_FaceTarget`
- Description: Causes the unit(s) to face other targets on the screen. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets1:arraystr | Targets (facing) | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change direction. |
| Targets2:arraystr | Targets (destination) | combo\[\] | \["current target"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) for the turning unit(s) to face. |
| FaceAway:eval | Face Away From? | boolean | false | — | Face away from the unit(s) instead? @ -------------------------------------------------------------------------- |

### MOVE: Float

- Command ID: `ActSeq_Movement_Float`
- Description: Causes the unit(s) to float above the ground. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to make float. |
| Height:eval | Desired Height | — | 100 | — | Vertical distance to float upward. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for total float amount. |
| EasingType:str | Float Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForFloat:eval | Wait For Float? | boolean | true | — | Wait for floating to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Home Reset

- Command ID: `ActSeq_Movement_HomeReset`
- Description: Causes the unit(s) to move back to their home position(s) and face back to their original direction(s).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["alive battlers"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to move. |
| WaitForMovement:eval | Wait For Movement? | boolean | true | — | Wait for movement to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Jump

- Command ID: `ActSeq_Movement_Jump`
- Description: Causes the unit(s) to jump into the air. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to make jump. |
| Height:eval | Desired Height | — | 100 | — | Max jump height to go above the ground You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for total jump amount. |
| WaitForJump:eval | Wait For Jump? | boolean | false | — | Wait for jumping to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Move Distance

- Command ID: `ActSeq_Movement_MoveBy`
- Description: Moves unit(s) by a distance from their current position(s). Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to move. |
| DistanceAdjust:str | Distance Adjustment | select | horz | Normal - No adjustments made=none; Horizontal - Actors adjust left, Enemies adjust right=horz; Vertical - Actors adjust Up, Enemies adjust down=vert; Both - Applies both Horizontal and Vertical=horz + vert | Makes adjustments to distance values to determine which direction to move unit(s). |
| DistanceX:eval | Distance: X | — | 48 | — | Horizontal distance to move. You may use JavaScript code. |
| DistanceY:eval | Distance: Y | — | 0 | — | Vertical distance to move. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for total movement amount. |
| FaceDirection:eval | Face Destination? | boolean | true | — | Turn and face the destination? |
| EasingType:str | Movement Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| MotionType:str | Movement Motion | combo | walk | walk; wait; chant; guard; damage; evade; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Play this motion for the unit(s). |
| WaitForMovement:eval | Wait For Movement? | boolean | true | — | Wait for movement to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Move To JS Coordinates

- Command ID: `ActSeq_Movement_MoveToJsPoint`
- Description: Moves unit(s) to specified JS Coordinates. Sideview-only! Uses JavaScript!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to move. |
| DestinationJS:func | JS: Coordinates | note | "// Declare Variables\nconst target = arguments\[0\];\nlet goalX = 0;\nlet goalY = 0;\n\n// Calculations\ngoalX = Graphics.width / 2;\ngoalY = Graphics.height / 2;\n\n// Return Data\nreturn new Point(goalX, goalY);" | — | Code used to determine the coordinates for the target(s) to move to. |
| OffsetAdjust:str | Offset Adjustment | select | horz | Normal - No adjustments made=none; Horizontal - Actors adjust left, Enemies adjust right=horz; Vertical - Actors adjust Up, Enemies adjust down=vert; Both - Applies both Horizontal and Vertical=horz + vert | Makes adjustments to offset values to determine which direction to adjust the destination by. |
| OffsetX:eval | Offset: X | — | 0 | — | Horizontal offset to move. You may use JavaScript code. |
| OffsetY:eval | Offset: Y | — | 0 | — | Vertical offset to move. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for total movement amount. |
| FaceDirection:eval | Face Destination? | boolean | true | — | Turn and face the destination? |
| EasingType:str | Movement Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| MotionType:str | Movement Motion | combo | walk | walk; wait; chant; guard; damage; evade; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Play this motion for the unit(s). |
| WaitForMovement:eval | Wait For Movement? | boolean | true | — | Wait for movement to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Move To Point

- Command ID: `ActSeq_Movement_MoveToPoint`
- Description: Moves unit(s) to a designated point on the screen. Sideview-only! Points based off Graphics.boxWidth/Height.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to move. |
| Destination:str | Destination Point | combo | home | home; center; point x, y | Select which point to face. Replace 'x' and 'y' with coordinates |
| OffsetAdjust:str | Offset Adjustment | select | horz | Normal - No adjustments made=none; Horizontal - Actors adjust left, Enemies adjust right=horz; Vertical - Actors adjust Up, Enemies adjust down=vert; Both - Applies both Horizontal and Vertical=horz + vert | Makes adjustments to offset values to determine which direction to adjust the destination by. |
| OffsetX:eval | Offset: X | — | 0 | — | Horizontal offset to move. You may use JavaScript code. |
| OffsetY:eval | Offset: Y | — | 0 | — | Vertical offset to move. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for total movement amount. |
| FaceDirection:eval | Face Destination? | boolean | true | — | Turn and face the destination? |
| EasingType:str | Movement Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| MotionType:str | Movement Motion | combo | walk | walk; wait; chant; guard; damage; evade; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Play this motion for the unit(s). |
| WaitForMovement:eval | Wait For Movement? | boolean | true | — | Wait for movement to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Move To Target(s)

- Command ID: `ActSeq_Movement_MoveToTarget`
- Description: Moves unit(s) to another unit(s) on the battle field. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets1:arraystr | Targets (Moving) | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to move. |
| Targets2:arraystr | Targets (Destination) | combo\[\] | \["all targets"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to move to. |
| TargetLocation:str | Target Location | combo | front base | front head; front center; front base; middle head; middle center; middle base; back head; back center; back base | Select which part target group to move to. |
| MeleeDistance:eval | Melee Distance | — | 24 | — | The melee distance away from the target location in addition to the battler's width. |
| OffsetAdjust:str | Offset Adjustment | select | horz | Normal - No adjustments made=none; Horizontal - Actors adjust left, Enemies adjust right=horz; Vertical - Actors adjust Up, Enemies adjust down=vert; Both - Applies both Horizontal and Vertical=horz + vert | Makes adjustments to offset values to determine which direction to adjust the destination by. |
| OffsetX:eval | Offset: X | — | 0 | — | Horizontal offset to move. You may use JavaScript code. |
| OffsetY:eval | Offset: Y | — | 0 | — | Vertical offset to move. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for total movement amount. |
| FaceDirection:eval | Face Destination? | boolean | true | — | Turn and face the destination? |
| EasingType:str | Movement Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| MotionType:str | Movement Motion | combo | walk | walk; wait; chant; guard; damage; evade; thrust; swing; missile; skill; spell; item; escape; victory; dying; abnormal; sleep; dead | Play this motion for the unit(s). |
| WaitForMovement:eval | Wait For Movement? | boolean | true | — | Wait for movement to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Opacity

- Command ID: `ActSeq_Movement_Opacity`
- Description: Causes the unit(s) to change opacity. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change opacity. |
| Opacity:eval | Desired Opacity | — | 255 | — | Change to this opacity value. You may use JavaScript code. |
| Duration:eval | Duration | — | 12 | — | Duration in frames for opacity change. |
| EasingType:str | Opacity Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForOpacity:eval | Wait For Opacity? | boolean | true | — | Wait for opacity changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Scale/Grow/Shrink

- Command ID: `ActSeq_Movement_Scale`
- Description: Causes the unit(s) to scale, grow, or shrink?. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to change the scale of. |
| ScaleX:eval | Scale X | — | 1.00 | — | What target scale value do you want? 1.0 is normal size. |
| ScaleY:eval | Scale Y | — | 1.00 | — | What target scale value do you want? 1.0 is normal size. |
| Duration:eval | Duration | — | 12 | — | Duration in frames to scale for. |
| EasingType:str | Scale Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForScale:eval | Wait For Scale? | boolean | true | — | Wait for scaling to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Skew/Distort

- Command ID: `ActSeq_Movement_Skew`
- Description: Causes the unit(s) to skew. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to skew. |
| SkewX:eval | Skew X | — | 0.00 | — | X variance to skew? Use small values for the best results. |
| SkewY:eval | Skew Y | — | 0.00 | — | Y variance to skew? Use small values for the best results. |
| Duration:eval | Duration | — | 12 | — | Duration in frames to skew for. |
| EasingType:str | Skew Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForSkew:eval | Wait For Skew? | boolean | true | — | Wait for skew to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Spin/Rotate

- Command ID: `ActSeq_Movement_Spin`
- Description: Causes the unit(s) to spin. Sideview-only!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select which unit(s) to spin. |
| Angle:eval | Angle | — | 360 | — | How many degrees to spin? |
| Duration:eval | Duration | — | 12 | — | Duration in frames to spin for. |
| EasingType:str | Spin Easing | combo | Linear | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| RevertAngle:eval | Revert Angle on Finish | boolean | true | — | Revert angle after spinning? |
| WaitForSpin:eval | Wait For Spin? | boolean | true | — | Wait for spin to complete before performing next command? @ -------------------------------------------------------------------------- |

### MOVE: Wait For Float

- Command ID: `ActSeq_Movement_WaitForFloat`
- Description: Waits for floating to complete before performing next command. @ --------------------------------------------------------------------------

No arguments are declared.

### MOVE: Wait For Jump

- Command ID: `ActSeq_Movement_WaitForJump`
- Description: Waits for jumping to complete before performing next command. @ --------------------------------------------------------------------------

No arguments are declared.

### MOVE: Wait For Movement

- Command ID: `ActSeq_Movement_WaitForMovement`
- Description: Waits for movement to complete before performing next command. @ --------------------------------------------------------------------------

No arguments are declared.

### MOVE: Wait For Opacity

- Command ID: `ActSeq_Movement_WaitForOpacity`
- Description: Waits for opacity changes to complete before performing next command. @ --------------------------------------------------------------------------

No arguments are declared.

### MOVE: Wait For Scale

- Command ID: `ActSeq_Movement_WaitForScale`
- Description: Waits for scaling to complete before performing next command. @ --------------------------------------------------------------------------

No arguments are declared.

### MOVE: Wait For Skew

- Command ID: `ActSeq_Movement_WaitForSkew`
- Description: Waits for skewing to complete before performing next command. @ --------------------------------------------------------------------------

No arguments are declared.

### MOVE: Wait For Spin

- Command ID: `ActSeq_Movement_WaitForSpin`
- Description: Waits for spinning to complete before performing next command. @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceProjectile`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Projectiles

- Command ID: `ActionSequenceBreakProjectile`
- Description: Create projectiles on the screen and fire them off at a target. Requires VisuMZ_3_ActSeqProjectiles! @ --------------------------------------------------------------------------

No arguments are declared.

### PROJECTILE: Animation

- Command ID: `ActSeq_Projectile_Animation`
- Description: Create an animation projectile and fire it at a target. Requires VisuMZ_3_ActSeqProjectiles!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Coordinates | — | — | — | — | — |
| Start:struct | Start Location | struct&lt;ProjectileStart&gt; | {"Type:str":"target","Targets:arraystr":"\[\"user\"\]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"} | — | Settings to determine where the projectile(s) start from. |
| Goal:struct | Goal Location | struct&lt;ProjectileGoal&gt; | {"Type:str":"target","Targets:arraystr":"\[\"all targets\"\]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"} | — | Settings to determine where the projectile(s) start from. |
| Settings | — | — | — | — | — |
| AnimationID:num | Animation ID | animation | 77 | — | Determine which animation to use as a projectile. |
| Duration:eval | Duration | — | 20 | — | Duration for the projectile(s) to travel. |
| WaitForProjectile:eval | Wait For Projectile? | boolean | true | — | Wait for projectile(s) to reach their destination before going onto the next command? |
| WaitForAnimation:eval | Wait For Animation? | boolean | false | — | Wait for animation to finish before going to the next command? |
| Extra:struct | Extra Settings | struct&lt;ProjectileExAni&gt; | {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","EasingType:str":"Linear","Spin:eval":"+0.0"} | — | Add extra settings to the projectile? @ -------------------------------------------------------------------------- |

### PROJECTILE: Icon

- Command ID: `ActSeq_Projectile_Icon`
- Description: Create an icon projectile and fire it at a target. Requires VisuMZ_3_ActSeqProjectiles!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Coordinates | — | — | — | — | — |
| Start:struct | Start Location | struct&lt;ProjectileStart&gt; | {"Type:str":"target","Targets:arraystr":"\[\"user\"\]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"} | — | Settings to determine where the projectile(s) start from. |
| Goal:struct | Goal Location | struct&lt;ProjectileGoal&gt; | {"Type:str":"target","Targets:arraystr":"\[\"all targets\"\]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"} | — | Settings to determine where the projectile(s) start from. |
| Settings | — | — | — | — | — |
| Icon:eval | Icon Index | — | 118 | — | Determine which icon to use as a projectile. You may use JavaScript code. |
| Duration:eval | Duration | — | 20 | — | Duration for the projectile(s) to travel. |
| WaitForProjectile:eval | Wait For Projectile? | boolean | true | — | Wait for projectile(s) to reach their destination before going onto the next command? |
| Extra:struct | Extra Settings | struct&lt;ProjectileExtra&gt; | {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"} | — | Add extra settings to the projectile? @ -------------------------------------------------------------------------- |

### PROJECTILE: Picture

- Command ID: `ActSeq_Projectile_Picture`
- Description: Create a picture projectile and fire it at a target. Requires VisuMZ_3_ActSeqProjectiles!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Coordinates | — | — | — | — | — |
| Start:struct | Start Location | struct&lt;ProjectileStart&gt; | {"Type:str":"target","Targets:arraystr":"\[\"user\"\]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"} | — | Settings to determine where the projectile(s) start from. |
| Goal:struct | Goal Location | struct&lt;ProjectileGoal&gt; | {"Type:str":"target","Targets:arraystr":"\[\"all targets\"\]","TargetCenter:eval":"false","PointX:eval":"Graphics.width / 2","PointY:eval":"Graphics.height / 2","OffsetX:eval":"+0","OffsetY:eval":"+0"} | — | Settings to determine where the projectile(s) start from. |
| Settings | — | — | — | — | — |
| Picture:str | Picture Filename | file | Untitled | — | Determine which picture to use as a projectile. |
| Duration:eval | Duration | — | 20 | — | Duration for the projectile(s) to travel. |
| WaitForProjectile:eval | Wait For Projectile? | boolean | true | — | Wait for projectile(s) to reach their destination before going onto the next command? |
| Extra:struct | Extra Settings | struct&lt;ProjectileExtra&gt; | {"AutoAngle:eval":"true","AngleOffset:eval":"+0","Arc:eval":"0","BlendMode:num":"0","EasingType:str":"Linear","Hue:eval":"0","Scale:eval":"1.0","Spin:eval":"+0.0"} | — | Add extra settings to the projectile? @ -------------------------------------------------------------------------- |

### -

- Command ID: `ActionSequenceSpaceSkew`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Skew

- Command ID: `ActionSequenceBreakSkew`
- Description: Allows you to have control over the camera skew. Requires VisuMZ_3_ActSeqCamera! @ --------------------------------------------------------------------------

No arguments are declared.

### SKEW: Change Skew

- Command ID: `ActSeq_ChangeSkew`
- Description: Changes the camera skew. Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| SkewX:eval | Skew X | — | 0 | — | Change the camera skew X to this value. |
| SkewY:eval | Skew Y | — | 0 | — | Change the camera skew Y to this value. |
| Duration:eval | Duration | — | 60 | — | Duration in frames to change camera skew. |
| EasingType:str | Skew Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForSkew:eval | Wait For Skew? | boolean | true | — | Wait for skew changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### SKEW: Reset Skew

- Command ID: `ActSeq_Skew_Reset`
- Description: Reset any skew settings. Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Duration:eval | Duration | — | 60 | — | Duration in frames to reset camera skew. |
| EasingType:str | Skew Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForSkew:eval | Wait For Skew? | boolean | true | — | Wait for skew changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### SKEW: Wait For Skew

- Command ID: `ActSeq_Skew_WaitForSkew`
- Description: Waits for skew changes to complete before performing next command. Requires VisuMZ_3_ActSeqCamera! @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceTarget`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Target

- Command ID: `ActionSequenceBreakTarget`
- Description: If using a manual target by target Action Sequence, these commands will give you full control over its usage. @ --------------------------------------------------------------------------

No arguments are declared.

### TARGET: Current Index

- Command ID: `ActSeq_Target_CurrentIndex`
- Description: Sets the current index to this value. Then decide to jump to a label (optional).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Index:eval | Set Index To | — | 0 | — | Sets current targeting index to this value. 0 is the starting index of a target group. |
| JumpToLabel:str | Jump To Label | — | Untitled | — | If a target is found after the index change, jump to this label in the Common Event. @ -------------------------------------------------------------------------- |

### TARGET: Next Target

- Command ID: `ActSeq_Target_NextTarget`
- Description: Moves index forward by 1 to select a new current target. Then decide to jump to a label (optional).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| JumpToLabel:str | Jump To Label | — | Untitled | — | If a target is found after the index change, jump to this label in the Common Event. @ -------------------------------------------------------------------------- |

### TARGET: Previous Target

- Command ID: `ActSeq_Target_PrevTarget`
- Description: Moves index backward by 1 to select a new current target. Then decide to jump to a label (optional).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| JumpToLabel:str | Jump To Label | — | Untitled | — | If a target is found after the index change, jump to this label in the Common Event. @ -------------------------------------------------------------------------- |

### TARGET: Random Target

- Command ID: `ActSeq_Target_RandTarget`
- Description: Sets index randomly to determine new currernt target. Then decide to jump to a label (optional).

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| ForceRandom:eval | Force Random? | boolean | false | — | Index cannot be its previous index amount after random. |
| JumpToLabel:str | Jump To Label | — | Untitled | — | If a target is found after the index change, jump to this label in the Common Event. @ -------------------------------------------------------------------------- |

### -

- Command ID: `ActionSequenceSpaceVoice`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Voice

- Command ID: `ActionSequenceBreakVoice`
- Description: Allows you to play battle voices. Requires VisuMZ_3_BattleVoices! @ --------------------------------------------------------------------------

No arguments are declared.

### VOICE: Play Common Line

- Command ID: `ActSeq_BattleVoice_PlayCommonLine`
- Description: Plays a common voice line from target battler(s). Requires VisuMZ_3_BattleVoices!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Speaker Target(s) | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play voice lines from. |
| VoiceLine:str | Voice Line | select | ActionStartBasicAttack | -; ---Battle Phase---=-; On Battle Start=BattleStart; On Battle Input=BattleInput; On Battle Victory=BattleVictory; Victory =&gt; Level Up=BattleVictoryLevelUp; Escape =&gt; Success=BattleEscapeSuccess; Escape =&gt; Failure=BattleEscapeFailure; -; ---On Action Start---=-; Basic Action =&gt; Regular Attack=ActionStartBasicAttack; Basic Action =&gt; Regular Guard=ActionStartBasicGuard; Skill Usage For Allies =&gt; Certain Hit=ActionStartSkillAllyCertainHit; Skill Usage For Allies =&gt; Physical=ActionStartSkillAllyPhysical; Skill Usage For Allies =&gt; Magical=ActionStartSkillAllyMagical; Skill Usage For Enemies =&gt; Certain Hit=ActionStartSkillEnemyCertainHit; Skill Usage For Enemies =&gt; Physical=ActionStartSkillEnemyPhysical; Skill Usage For Enemies =&gt; Magical=ActionStartSkillEnemyMagical; Item Usage For Allies=ActionStartItemAlly; Item Usage For Enemies=ActionStartItemEnemy; -; ---Perform Action---=-; Basic Action =&gt; Attack Motion=PerformActionBasicAttack; Basic Action =&gt; Critical Action=PerformActionCritical; Basic Action =&gt; Defeat Opponent=PerformActionDefeatFoe; Basic Action =&gt; Missed Action=PerformActionMiss; Skill Usage =&gt; Certain Hit=PerformActionSkillCertainHit; Skill Usage =&gt; Physical=PerformActionSkillPhysical; Skill Usage =&gt; Magical=PerformActionSkillMagical; -; ---On HP Change---=-; Life State =&gt; On Death=HpChangeDeath; Life State =&gt; On Revive=HpChangeRevive; On Damage =&gt; Damage &lt;= 0%=HpChangeDamageNone; On Damage =&gt; Damage &lt; 25%=HpChangeDamageLight; On Damage =&gt; Damage &lt; 50%=HpChangeDamageMedium; On Damage =&gt; Damage &gt;= 50%=HpChangeDamageHeavy; On Damage =&gt; Guarding Damage=HpChangeDamageGuard; On Recovery =&gt; Recovery &lt; 25%=HpChangeRecoverLight; On Recovery =&gt; Recovery &lt; 50%=HpChangeRecoverMedium; On Recovery =&gt; Recovery &gt;= 50%=HpChangeRecoverHeavy; -; ---On Action Result---=-; On Miss/Evasion=ActionResultEvasion; On Magic Evasion=ActionResultMagicEvasion; On Counter=ActionResultCounter; On Reflection=ActionResultReflection; On Substitute=ActionResultSubstitute; -; ---Buff/Debuff Related---=-; On Buff Apply=BuffAdd; On Buff Remove=BuffRemove; On Debuff Apply=DebuffAdd; On Debuff Remove=DebuffRemove; -; ---State Related---=-; Positive States =&gt; On State Apply=StatePositiveAdd; Positive States =&gt; text On State Remove=StatePositiveRemove; Negative States =&gt; On State Apply=StateNegativeAdd; Negative States =&gt; On State Remove=StateNegativeRemove; Neutral States =&gt; On State Apply=StateNeutralAdd; Neutral States =&gt; On State Remove=StateNeutralRemove; -; ---Miscellaneous---=-; Voice Preview=CharaCreatePreview; - | What voice line do you wish to play? @ -------------------------------------------------------------------------- |

### VOICE: Play Special Line

- Command ID: `ActSeq_BattleVoice_PlaySpecialLine`
- Description: Plays a special voice line from target battler(s). Requires VisuMZ_3_BattleVoices!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Speaker Target(s) | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; ; alive enemies; alive enemies not user; alive enemies not target; dead enemies; enemy index x; enemy ID x; ; alive battlers; alive battlers not user; alive battlers not target; dead battlers; | Select unit(s) to play voice lines from. |
| VoiceLineType:str | Voice Line Type | select | ActionName | Action Name=ActionName; Chant Line=ChantLine; Item Name=ItemName; Skill Name=SkillName; Spell Name=SpellName; Unique Lines=UniqueLine | What voice line type do you wish to play? |
| Letter:str | Name / Letter | select | A | A; B; C; D; E; F; G; H; I; J; K; L; M; N; O; P; Q; R; S; T; U; V; W; X; Y; Z | What voice letter/name do you want to play? @ -------------------------------------------------------------------------- |

### -

- Command ID: `ActionSequenceSpaceWeapon`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Weapon

- Command ID: `ActionSequenceBreakWeapon`
- Description: Allows for finer control over Dual/Multi Wielding actors. Only works for Actors. @ --------------------------------------------------------------------------

No arguments are declared.

### WEAPON: Clear Weapon Slot

- Command ID: `ActSeq_Weapon_ClearActiveWeapon`
- Description: Clears the active weapon slot (making others valid again). Only works for Actors.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; | Select unit(s) to clear the active weapon slot for. @ -------------------------------------------------------------------------- |

### WEAPON: Next Weapon Slot

- Command ID: `ActSeq_Weapon_NextActiveWeapon`
- Description: Goes to next active weapon slot (making others invalid). If next slot is weaponless, don't label jump.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; | Select unit(s) to change the next active weapon slot for. |
| JumpToLabel:str | Jump To Label | — | Untitled | — | If a weapon is found after the index change, jump to this label in the Common Event. @ -------------------------------------------------------------------------- |

### WEAPON: Set Weapon Slot

- Command ID: `ActSeq_Weapon_SetActiveWeapon`
- Description: Sets the active weapon slot (making others invalid). Only works for Actors.

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Targets:arraystr | Targets | combo\[\] | \["user"\] | user; current target; prev target; next target; all targets; focus; not focus; ; special; special x; ; alive friends; alive friends not user; alive friends not target; dead friends; friend index x; ; alive opponents; alive opponents not target; dead opponents; opponent index x; ; alive actors; alive actors not user; alive actors not target; dead actors; actor index x; actor ID x; | Select unit(s) to change the active weapon slot for. |
| SlotID:eval | Weapon Slot ID | — | 1 | — | Select weapon slot to make active (making others invalid). Use 0 to clear and normalize. You may use JavaScript code. @ -------------------------------------------------------------------------- |

### -

- Command ID: `ActionSequenceSpaceZoom`
- Description: - @ --------------------------------------------------------------------------

No arguments are declared.

### Action Sequences - Zoom

- Command ID: `ActionSequenceBreakZoom`
- Description: Allows you to have control over the screen zoom. Requires VisuMZ_3_ActSeqCamera! @ --------------------------------------------------------------------------

No arguments are declared.

### ZOOM: Change Scale

- Command ID: `ActSeq_Zoom_Scale`
- Description: Changes the zoom scale. Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Scale:eval | Scale | — | 1.0 | — | The zoom scale to change to. |
| Duration:eval | Duration | — | 60 | — | Duration in frames to change battle zoom. |
| EasingType:str | Zoom Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForZoom:eval | Wait For Zoom? | boolean | true | — | Wait for zoom changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### ZOOM: Reset Zoom

- Command ID: `ActSeq_Zoom_Reset`
- Description: Reset any zoom settings. Requires VisuMZ_3_ActSeqCamera!

| Key | Label | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- |
| Duration:eval | Duration | — | 60 | — | Duration in frames to reset battle zoom. |
| EasingType:str | Zoom Easing | combo | InOutSine | Linear; InSine; OutSine; InOutSine; InQuad; OutQuad; InOutQuad; InCubic; OutCubic; InOutCubic; InQuart; OutQuart; InOutQuart; InQuint; OutQuint; InOutQuint; InExpo; OutExpo; InOutExpo; InCirc; OutCirc; InOutCirc; InBack; OutBack; InOutBack; InElastic; OutElastic; InOutElastic; InBounce; OutBounce; InOutBounce | Select which easing type you wish to apply. Requires VisuMZ_0_CoreEngine. |
| WaitForZoom:eval | Wait For Zoom? | boolean | true | — | Wait for zoom changes to complete before performing next command? @ -------------------------------------------------------------------------- |

### ZOOM: Wait For Zoom

- Command ID: `ActSeq_Zoom_WaitForZoom`
- Description: Waits for zoom to complete before performing next command. Requires VisuMZ_3_ActSeqCamera! @ --------------------------------------------------------------------------

No arguments are declared.

### -

- Command ID: `ActionSequenceSpaceEnd`
- Description: - @ -------------------------------------------------------------------------- @ ========================================================================== @ Plugin Parameters @ ==========================================================================

No arguments are declared.

## Public behavior, notetags, text codes, and script surface

```text
Introduction

The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
become more flexible, streamlined, and support a variety of features. The
updated battle engine allows for custom Action Sequences, battle layout
styles, and a lot of control over the battle mechanics, too.

Features include all (but not limited to) the following:

* Action Sequence Plugin Commands to give you full control over what happens
during the course of a skill or item.
* Animated Sideview Battler support for enemies!
* Auto Battle options for party-wide and actor-only instances.
* Base Troop Events to quickly streamline events for all Troop events.
* Battle Command control to let you change which commands appear for actors.
* Battle Layout styles to change the way the battle scene looks.
* Casting animation support for skills.
* Critical Hit control over the success rate formula and damage multipliers.
* Custom target scopes added for skills and items.
* Damage formula control, including Damage Styles.
* Damage caps, both hard caps and soft caps.
* Damage traits such Armor Penetration/Reduction to bypass defenses.
* Elements & Status Menu Core support for traits.
* Multitude of JavaScript notetags and global Plugin Parameters to let you
make a variety of effects across various instances during battle.
* Party Command window can be skipped/disabled entirely.
* Weather effects now show in battle.
* Streamlined Battle Log to remove redundant information and improve the
flow of battle.
* Visual HP Gauges can be displayed above the heads of actors and/or enemies
with a possible requirement for enemies to be defeated at least once first
in order for them to show.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Tier 1 ------

This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Major Changes

This plugin will overwrite some core parts of the RPG Maker MZ base code in
order to ensure the Battle Core plugin will work at full capacity. The
following are explanations of what has been changed.

---

Action Sequences

- Action sequences are now done either entirely by the Battle Log Window or
through common events if the <Custom Action Sequence> notetag is used.
In RPG Maker MZ by default, Action Sequences would be a mixture of using the
Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
to fully grab control of the situation.

---

Action Speed

- Action speeds determine the turn order in the default battle system. The
AGI of a battle unit is also taken into consideration. However, the random
variance applied to the action speed system makes the turn order extremely
chaotic and hard for the player to determine. Thus, the random variance
aspect of it has been turned off. This can be reenabled by default through
Plugin Parameters => Mechanics Settings => Allow Random Speed?

---

Animated Sideview Battler Support For Enemies

- Enemies can now use Sideview Actor sprites for themselves! They will
behave like actors and can even carry their own set of weapons for physical
attacks. These must be set up using notetags. More information can be found
in the notetag section.

- As the sprites are normally used for actors, some changes have been made
to Sprite_Actor to be able to support both actors and enemies. These changes
should have minimal impact on other plugins.

---

Battle Sprite Updates

- A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
been overwritten to make the new Action Sequence system added by this plugin
possible. These changes make it possible for the sprites to move anywhere on
the screen, jump, float, change visibility, and more.

---

Change Battle Back in Battle

- By default, the Change Battle Back event command does not work in battle.
Any settings made to it will only reflect in the following battle. Now, if
the battle back event command is used during battle, it will reflect upon
any new changes immediately.

---

Critical Hit - LUK Influence

- The LUK Buffs now affect the critical hit rate based off how the formula
is now calculated. Each stack of a LUK Buff will double the critical hit
rate and compound upon that. That means a x1 LUK Buff stack will raise it by
x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
Buff Stack will raise the critical hit rate stack by x8, and so on.

- LUK also plays a role in how much damage is dealt with critical hits. The
default critical hit multiplier has been reduced from x3 to x2. However, a
percentage of LUK will added on (based off the user's CRI rate) onto the
finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
LUK value will also be added onto the damage.

- This change can be altered through Plugin Parameters => Damage Settings =>
Critical Hits => JS: Rate Formula and JS: Damage Formula.

---

Damage Popups

- Damage popups are now formatted with + and - to determine healing and
damage. MP Damage will also include "MP" at the back. This is to make it
clearer what each colored variant of the damage popup means as well as help
color blind players read the on-screen data properly.

- Damage popups have also been rewritten to show all changed aspects instead
of just one. Previously with RPG Maker MZ, if an action would deal both HP
and MP damage, only one of them would show. Now, everything is separated and
both HP and MP changes will at a time.

---

Dual Wielding

- Previously, RPG Maker MZ had "Dual Wielding" attack using both weapon
animations at once, with the combined ATK of each weapon. It's confusing to
look at and does not portray the nature of "Dual Wielding".

- Dual Wielding, or in the case of users adding in third and fourth weapons,
Multi Wielding is now changed. Each weapon is displayed individually, each
producing its own attack animation, showing each weapon type, and applying
only that weapon's ATK, Traits, and related effects. It is no longer a
combined effect to display everything at once like RPG Maker MZ default.

- If an actor has multiple weapon slots but some of them are unequipped,
then the action will treat the attack as a single attack. There will be no
barehanded attack to add on top of it. This is to match RPG Maker MZ's
decision to omit a second animation if the same scenario is applied.

---

Force Action

- Previously, Forced Actions would interrupt the middle of an event to
perform an action. However, with the addition of more flexible Action
Sequences, the pre-existing Force Action system would not be able to exist
and would require being remade.

- Forced Actions now are instead, added to a separate queue from the action
battler list. Whenever an action and/or common event is completed, then if
there's a Forced Action battler queued, then the Forced Action battler will
have its turn. This is the cleanest method available and avoids the most
conflicts possible.

- This means if you planned to make cinematic sequences with Forced Actions,
you will need to account for the queued Force Actions. However, in the case
of battle cinematics, we would highly recommend that you use the newly added
Action Sequence Plugin Commands instead as those give you more control than
any Force Action ever could.

---

Random Scope

- The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
randomness.

---

Spriteset_Battle Update

- The spriteset now has extra containers to separate battlers (actors and
enemies), animations, and damage. This is to make actors and enemy battler
sprites more efficient to sort (if enabled), so that animations won't
interfere with and cover damage sprites, and to make sure damage sprites are
unaffected by screen tints in order to ensure the player will always have a
clear read on the information relaying sprites.

---

TPB/ATB Active Battle Actor Shifting

- Pressing cancel on the Actor Command Window no longer switches between
actors with a full TPB/ATB gauge before reaching the Party Command Window.
This is to accomplish a couple of things: 1) reduce the number of button
presses to reach the Party Command Window and 2) to prevent motion resets
and disrupting action sequences. If this feature is vital to your battle
system, we recommend that you do not use this plugin or any of the Battle
Core-required plugins.

---

Weather Displayed in Battle

- Previously, weather has not been displayed in battle. This means that any
weather effects placed on the map do not transfer over to battle and causes
a huge disconnect for players. The Battle Core plugin will add weather
effects to match the map's weather conditions. Any changes made to weather
through event commands midway through battle will also be reflected.

---

Base Troops

Base Troops can be found, declared, and modified in the Plugin Parameters =>
Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
will have their page events replicated and placed under all other troops
found in the database.

---

This means that if you have an event that runs on Turn 1 of a Base Troop,
then for every troop out there, that same event will also run on Turn 1,
as well. This is useful for those who wish to customize their battle system
further and to reduce the amount of work needed to copy/paste said event
pages into every database troop object manually.

---

Damage Styles

Damage Styles are a new feature added through the Battle Core plugin. When
using certain Battle Styles, you can completely ignore typing in the whole
damage formula inside the damage formula input box, and instead, insert
either a power amount or a multiplier depending on the Damage Style. The
plugin will then automatically calculate damage using that value factoring
in ATK, DEF, MAT, MDF values.

---

Here is a list of the Damage Styles that come with this plugin by default.
You can add in your own and even edit them to your liking.
Or just remove them if you want.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Standard       Formula          No                Varies       Varies
ArmorScaling   Formula          No                Varies       Varies
CT             Multiplier       Yes               Low          Normal
D4             Multiplier       No                High         Normal
DQ             Multiplier       No                Low          Low
FF7            Power            Yes               Low          High
FF8            Power            Yes               Medium       Normal
FF9            Power            Yes               Low          Normal
FF10           Power            Yes               Medium       High
MK             Multiplier       No                Medium       Low
MOBA           Multiplier       No                Medium       Normal
PKMN           Power            No                Low          Normal

Use the above chart to figure out which Damage Style best fits your game,
if you plan on using them.

The 'Standard' style is the same as the 'Manual' formula input, except that
it allows for the support of <Armor Penetration> and <Armor Reduction>
notetags.

The 'Armor Scaling' style allows you to type in the base damage calculation
without the need to type in any defending modifiers.

NOTE: While these are based off the damage formulas found in other games,
not all of them are exact replicas. Many of them are adapted for use in
RPG Maker MZ since not all RPG's use the same set of parameters and not all
external multipliers function the same way as RPG Maker MZ.

---

Style:
- This is what the Damage Style is.

Use Formula As:
- This is what you insert into the formula box.
- Formula: Type in the formula for the action just as you would normally.
- Multiplier: Type in the multiplier for the action.
Use float values. This means 250% is typed out as 2.50
- Power: Type in the power constant for the action.
Use whole numbers. Type in something like 16 for a power constant.

PH/MA Disparity:
- Is there a disparity between how Physical Attacks and Magical Attacks
are calculated?
- If yes, then physical attacks and magical attacks will have different
formulas used.
- If no, then physical attacks and magical attacks will share similar
formulas for how they're calculated.

Stat Scale:
- How much should stats scale throughout the game?
- Low: Keep them under 100 for the best results.
- Medium: Numbers work from low to mid 400's for best results.
- High: The numbers really shine once they're higher.

Damage Scale:
- How much does damage vary depending on small parameter changes?
- Low: Very little increase from parameter changes.
- Normal: Damage scales close to proportionally with parameter changes.
- High: Damage can boost itself drastically with parameter changes.

---

To determine what kind of parameters are used for the Damage Styles, they
will depend on two things: the action's 'Hit Type' (ie Physical Attack,
Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
Recovery, or Drain).

Certain Hit tends to use whichever value is higher: ATK or MAT, and then
ignores the target's defense values. Use Certain Hits for 'True Damage'.

Use the chart below to figure out everything else:

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Hit Type      Damage Type   Attacker Parameter   Defender Parameter
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Physical      Damage        ATK                  DEF
Magical       Damage        MAT                  MDF
Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
Physical      Recover       DEF                  -Ignores-
Magical       Recover       MDF                  -Ignores-
Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
Physical      Drain         ATK                  DEF
Magical       Drain         MAT                  MDF
Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-

These can be modified within the Plugin Parameters in the individual
Damage Styles themselves.

---

Skills and Items can use different Damage Styles from the setting you've
selected in the Plugin Parameters. They can be altered to have different
Damage Styles through the usage of a notetag:

<Damage Style: name>

This will use whichever style is found in the Plugin Parameters.

If "Manual" is used, then no style will be used and all calculations will be
made strictly based off the formula found inside the formula box.

---

VisuStella MZ Compatibility

While this plugin is compatible with the majority of the VisuStella MZ
plugin library, it is not compatible with specific plugins or specific
features. This section will highlight the main plugins/features that will
not be compatible with this plugin or put focus on how the make certain
features compatible.

---

VisuMZ_1_BattleCore

When using Action Sequences, Boost effects for damage, turn extensions,
analyze, etc. will not occur for anything other than the Action Sequence:
"MECH: Action Effect" in order to maintain controlled effects. However, if
you do want to apply bonuses for Boosts, utilize "MECH: Boost Store Data" to
store inside a variable how many times Boosts were used. This can be used
however which way you want it to as long as it is manageable through events
and Common Events.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== HP Gauge-Related Notetags ===

The following notetags allow you to set whether or not HP Gauges can be
displayed by enemies regardless of Plugin Parameter settings.

---

<Show HP Gauge>

- Used for: Enemy Notetags
- Will always show the HP Gauge for the enemy regardless of the defeat
requirement setting.
- This does not bypass the player's Options preferences.
- This does not bypass disabling enemy HP Gauges as a whole.

---

<Hide HP Gauge>

- Used for: Enemy Notetags
- Will always hide the HP Gauge for the enemy regardless of the defeat
requirement setting.
- This does not bypass the player's Options preferences.

---

<Battle UI Offset: +x, +y>
<Battle UI Offset: -x, -y>

<Battle UI Offset X: +x>
<Battle UI Offset X: -x>

<Battle UI Offset Y: +y>
<Battle UI Offset Y: -y>

- Used for: Actor and Enemy Notetags
- Adjusts the offset of HP Gauges and State Icons above the heads of actors
and enemies.
- Replace 'x' with a number value that offsets the x coordinate.
- Negative x values offset left. Positive x values offset right.
- Replace 'y' with a number value that offsets the y coordinate.
- Negative y values offset up. Positive x values offset down.

---

=== Animation-Related Notetags ===

The following notetags allow you to set animations to play at certain
instances and/or conditions.

---

<Slip Animation: x>

- Requires VisuMZ_0_CoreEngine!
- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- During the phase at which the user regenerates HP, MP, or TP, this
animation will play as long as the user is alive and visible.
- Replace 'x' with a number value representing the Animation ID to play.

---

<Cast Animation: x>

- Used for: Skill Notetags
- Plays a battle animation at the start of the skill.
- Replace 'x' with a number value representing the Animation ID to play.

---

<Attack Animation: x>

- Used for: Enemy Notetags
- Gives an enemy an attack animation to play for its basic attack.
- Replace 'x' with a number value representing the Animation ID to play.

---

=== Battleback-Related Notetags ===

You can apply these notetags to have some control over the battlebacks that
appear in different regions of the map for random or touch encounters.

---

<Region x Battleback1: filename>
<Region x Battleback2: filename>

- Used for: Map Notetags
- If the player starts a battle while standing on 'x' region, then the
'filename' battleback will be used.
- Replace 'x' with a number representing the region ID you wish to use.
- Replace 'filename' with the filename of the graphic to use. Do not insert
any extensions. This means the file 'Castle1.png' will be only inserted
as 'Castle1' without the '.png' at the end.
- *NOTE: This will override any specified battleback settings.

---

=== Battle Command-Related Notetags ===

You can use notetags to change how the battle commands of playable
characters appear in battle as well as whether or not they can be used.

---

<Seal Attack>
<Seal Guard>
<Seal Item>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Prevents specific battle commands from being able to be used.

---

<Battle Commands>
Attack
Skills
SType: x
SType: name
All Skills
Skill: x
Skill: name
Guard
Item
Status
Party
Escape
Auto Battle
Combat Log
Talk
Weapon Swap
</Battle Commands>

- Used for: Class Notetags
- Changes which commands appear in the Actor Command Window in battle.
If this notetag is not used, then the default commands determined in
Plugin Parameters => Actor Command Window => Command List will be used.
- Add/remove/modify entries as needed.

- Attack
- Adds the basic attack command.

- Skills
- Displays all the skill types available to the actor.

- SType: x
- Stype: name
- Adds in a specific skill type.
- Replace 'x' with the ID of the skill type.
- Replace 'name' with the name of the skill type (without text codes).

- All Skills
- Adds all usable battle skills as individual actions.

- Skill: x
- Skill: name
- Adds in a specific skill as a usable action.
- Replace 'x' with the ID of the skill.
- Replace 'name' with the name of the skill.

- Guard
- Adds the basic guard command.

- Item
- Adds the basic item command.

- Status
- Adds a status command to view the current inputting actor's status.

- Party
- Requires VisuMZ_2_PartySystem.
- Allows this actor to switch out with a different party member.

- Escape
- Adds the escape command.

- Auto Battle
- Adds the auto battle command.

- Combat Log
- Requires VisuMZ_4_CombatLog.
- Opens up the combat log.

- Talk
- Requires VisuMZ_3_BattleCmdTalk!
- Shows talk command if applicable.

- Weapon Swap
- Requires VisuMZ_2_WeaponSwapSystem.
- Swaps the current weapon.

Example:

<Battle Commands>
Attack
Skill: Heal
Skills
Guard
Item
Escape
</Battle Commands>

---

<Command Text: x>

- Used for: Skill Notetags
- When a skill is used in a <Battle Commands> notetag set, you can change
the skill name text that appears to something else.
- Replace 'x' with the skill's name you want to shown in the Actor Battle
Command window.
- Recommended Usage: Shorten skill names that are otherwise too big to fit
inside of the Actor Battle Command window.

---

<Command Icon: x>

- Used for: Skill Notetags
- When a skill is used in a <Battle Commands> notetag set, you can change
the skill icon that appears to something else.
- Replace 'x' with the ID of icon you want shown in the Actor Battle Command
window to represent the skill.

---

<Command Require Learn>

- Used for: Skill Notetags
- Determines if a battle command is visible or not by whether the actor has
learned the skill.
- Learning the skill is a requirement. Acquiring the skill through traits
does not count as learning the skill.

---

<Command Require Access>

- Used for: Skill Notetags
- Determines if a battle command is visible or not by whether the actor has
access to the skill.
- Having access to the skill can come through either learning the skill or
temporarily acquiring it through trait objects.

---

<Command Show Switch: x>

<Command Show All Switches: x,x,x>
<Command Show Any Switches: x,x,x>

- Used for: Skill Notetags
- Determines if a battle command is visible or not through switches.
- Replace 'x' with the switch ID to determine the skill's visibility.
- If 'All' notetag variant is used, item will be hidden until all
switches are ON. Then, it would be shown.
- If 'Any' notetag variant is used, item will be shown if any of the
switches are ON. Otherwise, it would be hidden.
- This can be applied to Attack and Guard commands, too.

---

<Command Hide Switch: x>

<Command Hide All Switches: x,x,x>
<Command Hide Any Switches: x,x,x>

- Used for: Skill Notetags
- Determines if a battle command is visible or not through switches.
- Replace 'x' with the switch ID to determine the skill's visibility.
- If 'All' notetag variant is used, item will be shown until all
switches are ON. Then, it would be hidden.
- If 'Any' notetag variant is used, item will be hidden if any of the
switches are ON. Otherwise, it would be shown.
- This can be applied to Attack and Guard commands, too.

---

<Battle Portrait: filename>

- Used for: Actor
- This is used with the "Portrait" Battle Layout.
- Sets the battle portrait image for the actor to 'filename'.
- Replace 'filename' with a picture found within your game project's
img/pictures/ folder. Filenames are case sensitive. Leave out the filename
extension from the notetag.
- This will override any menu images used for battle only.

---

<Battle Portrait Offset: +x, +y>
<Battle Portrait Offset: -x, -y>

<Battle Portrait Offset X: +x>
<Battle Portrait Offset X: -x>

<Battle Portrait Offset Y: +y>
<Battle Portrait Offset Y: -y>

- Used for: Actor
- This is used with the "Portrait" and "Border" Battle Layouts.
- Offsets the X and Y coordinates for the battle portrait.
- Replace 'x' with a number value that offsets the x coordinate.
- Negative x values offset left. Positive x values offset right.
- Replace 'y' with a number value that offsets the y coordinate.
- Negative y values offset up. Positive x values offset down.

---

<Help Description>
text
text
</Help Description>

- Used for: State Notetags
- Assigns a help description for the state that's displayed under the
"Status" actor command.
- Replace 'text' with text you want displayed for the help window.
- This best works with one line for compatibility with other plugins.
- Insert %1 into the help description to show any data that would otherwise
be shown as the state display, such as Absorption Barrier count.
- This is used as a common notetag between Battle Core's state descriptions
and State Tooltips' state descriptions.

---

<In-Battle Status Description>
text
text
</In-Battle Status Description>
- Assigns a help description for the state that's displayed under the
"Status" actor command.
- Replace 'text' with text you want displayed for the help window.
- This best works with one line for compatibility with other plugins.
- Insert %1 into the help description to show any data that would otherwise
be shown as the state display, such as Absorption Barrier count.
- The description used here will not be used for State Tooltips.
- If both <Help Description> and <In-Battle Status Description> notetags
exist in the same state, priority will be given to this one for the
In-Battle Status Window.

---

<Exclude From Status Listing>

- Used for: State Notetags
- Excludes the state from being displayed in the status listing.

---

=== JavaScript Notetag: Battle Command-Related ===

The following are notetags made for users with JavaScript knowledge to
determine if skill-based battle commands are visible or hidden.

---

<JS Command Visible>
code
code
visible = code;
</JS Command Visible>

- Used for: Skill Notetags
- The 'visible' variable is the final returned variable to determine the
skill's visibility in the Battle Command Window.
- Replace 'code' with JavaScript code to determine the skill's visibility in
the Battle Command Window.
- The 'user' variable represents the user who will perform the skill.
- The 'skill' variable represents the skill to be used.

---

=== Targeting-Related Notetags ===

The following notetags are related to the targeting aspect of skills and
items and may adjust the scope of how certain skills/items work.

---

<Always Hit>

<Always Hit Rate: x%>

- Used for: Skill, Item Notetags
- Causes the action to always hit or to always have a hit rate of exactly
the marked x%.
- Replace 'x' with a number value representing the hit success percentage.

---

<Repeat Hits: x>

- Used for: Skill, Item Notetags
- Changes the number of hits the action will produce.
- Replace 'x' with a number value representing the number of hits to incur.

---

<Target: x Random Any>

- Used for: Skill, Item Notetags
- Makes the skill pick 'x' random targets when used.
- Targets can be both actors and enemies.
- This will overwrite the existing database scope and ignore the database's
existing scope in favor of this.
- Replace 'x' with a number value representing the number of random targets.

---

<Target: x Random Enemies>

- Used for: Skill, Item Notetags
- Makes the skill pick 'x' random targets when used.
- This will overwrite the existing database scope and ignore the database's
existing scope in favor of this.
- Targets are only enemies.
- Replace 'x' with a number value representing the number of random targets.

---

<Target: x Random Allies>

- Used for: Skill, Item Notetags
- Makes the skill pick 'x' random targets when used.
- This will overwrite the existing database scope and ignore the database's
existing scope in favor of this.
- Targets are only actors.
- Replace 'x' with a number value representing the number of random targets.

---

<Target: All Allies But User>

- Used for: Skill, Item Notetags
- Targets all allies with the exception of the user.
- This will overwrite the existing database scope and ignore the database's
existing scope in favor of this.

---

<Target: Ally or Enemy>

- Used for: Skill, Item Notetags
- Allows the player to target allies or enemies with the skill/item.
- Keep in mind this does NOT allow you to select dead party members.
- This will overwrite the existing database scope and ignore the database's
existing scope in favor of this.
- Target selection emphasis will go to allies first.
- Ignored when used by enemies and will be treated as an ally scope.
- Auto-battle actors will also treat this action as an ally scope.
- For certain battle layouts in frontview, this will open the Actor Select
window in order for Touch Input to be able to select actors.

---

<Target: Enemy or Ally>

- Used for: Skill, Item Notetags
- Allows the player to target enemies or allies with the skill/item.
- Keep in mind this does NOT allow you to select dead party members.
- This will overwrite the existing database scope and ignore the database's
existing scope in favor of this.
- Target selection emphasis will go to enemies first.
- Ignored when used by enemies and will be treated as an enemy scope.
- Auto-battle actors will also treat this action as an enemy scope.
- For certain battle layouts in frontview, this will open the Actor Select
window in order for Touch Input to be able to select actors.

---

<Single or Multiple Select>

- Used for: Skill, Item Notetags
- Requires an original scope that can select individual targets.
- This will allow the skill/item to be able to select either single targets
or multiple targets at once.
- In order to select "all enemies", the player must press the "Page Up"
keyboard button or the visual on screen "All Enemies" button.
- In order to select "all allies", the player must press the "Page Down"
keyboard button or the visual on screen "All Allies" button.
- Those wondering why this isn't regulated to a command left or right of
the enemies and actors is because mouse controls and touch controls
would not be able to select all enemies or all allies that way.
- This can NOT be used with single dead ally scopes.
- If there is an enemy with Taunt or Provoke, the option to select
"All Enemies" does not become possible.
- The enemy AI and Auto-Battle actor AI will NOT make use of the ability to
toggle between single and multiple target scopes. They will only use the
single target versions of these skills.

---

<Disperse Damage>

- Used for: Skill, Item Notetags
- This will cause any damage dealt by this skill to be split equally amongst
all targets of the skill including repeats.
- For basic attacks, any damage reduction added attack trait totals will
by reverted.
- This does NOT have to be used with <Single or Multiple Select> notetag and
can be used by itself for an "All" scope, making the skill/item deal less
damage if there's more enemies and more damage if there's less enemies.

---

<Cannot Target User>

- Used for: Skill, Item Notetags
- This will cause the action to be unable to select the user as the target.
- This is not a targeting scope. Instead, it is used in addition to any
other targeting scopes out there.
- When used with "All" scopes, the user is removed from the target pool.
- This is also applied outside of battle.
- If the user somehow enters the target pool, the user is then replaced by
a random ally found in the party.

---

=== JavaScript Notetag: Targeting-Related ===

---

<JS Accuracy>
code
code
rate = code;
</JS Accuracy>

- Used for: Skill, Item Notetags
- Only applies during battle.
- The 'rate' variable is the final returned amount to determine the
accuracy hit success rate.
- Base value comes from Game_Action.itemHit
- Skill/Item <JS Accuracy> runs
- Then <JS Accuracy as User/Target> notetags run
- Replace 'code' with JavaScript code to determine the final 'rate' to be
returned as the accuracy hit success rate.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.
- Works best with VisuMZ Core Engine's "Improved Accuracy" QoL formula in
order to consolidate both HIT and EVA.

---

<JS Accuracy as User>
code
code
rate = code;
</JS Accuracy as User>

<JS Accuracy as Target>
code
code
rate = code;
</JS Accuracy as Target>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Only applies during battle.
- The 'rate' variable is the final returned amount to determine the
accuracy hit success rate.
- Base value comes from Game_Action.itemHit
- Skill/Item <JS Accuracy> runs
- Then <JS Accuracy as User/Target> notetags run
- If used on trait objects, this will apply to any skills/items used as long
as the unit affected by the trait object has access to the trait object.
- If the 'as User' notetag variant is used, this code will be run as a
response to the action from the action user end.
- If the 'as Target' notetag variant is used, this code will be run as a
response to the action from the action target end.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.

---

<JS Targets>
code
code
targets = [code];
</JS Targets>

- Used for: Skill, Item Notetags
- The 'targets' variable is an array that is returned to be used as a
container for all the valid action targets.
- This is NOT used for filtering out who the player can or cannot select.
- This determines a final result.
- The 'targets' variable will include the original set of targets determined
by the skill/item's original scale.
- If you wish to clear it out, simply do 'targets = []' first.
- Replace 'code' with JavaScript code to determine valid targets.

---

=== Damage-Related Notetags ===

---

<Damage Style: name>

- Used for: Skill, Item Notetags
- Replace 'name' with a Damage Style name to change the way calculations are
made using the damage formula input box.
- Names can be found in Plugin Parameters => Damage Settings => Style List

---

<Armor Reduction: x>
<Armor Reduction: x%>
- Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- If used on skills and/or items, sets the current skill/item's armor
reduction properties to 'x' and/or 'x%'.
- If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
when calculating one's own armor.
- This applies to physical attacks.
- Use the 'x' notetag variant to determine a flat reduction value.
- Use the 'x%' notetag variant to determine a percentile reduction value.

---

<Armor Penetration: x>
<Armor Penetration: x%>
- Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- If used on skills and/or items, sets the current skill/item's armor
penetration properties to 'x' and/or 'x%'.
- If used on trait objects, adds 'x' and/or 'x%' armor penetration
properties when calculating a target's armor.
- This applies to physical attacks.
- Use the 'x' notetag variant to determine a flat penetration value.
- Use the 'x%' notetag variant to determine a percentile penetration value.

---

<Magic Reduction: x>
<Magic Reduction: x%>
- Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- If used on skills and/or items, sets the current skill/item's armor
reduction properties to 'x' and/or 'x%'.
- If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
when calculating one's own armor.
- This applies to magical attacks.
- Use the 'x' notetag variant to determine a flat reduction value.
- Use the 'x%' notetag variant to determine a percentile reduction value.

---

<Magic Penetration: x>
<Magic Penetration: x%>
- Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- If used on skills and/or items, sets the current skill/item's armor
penetration properties to 'x' and/or 'x%'.
- If used on trait objects, adds 'x' and/or 'x%' armor penetration
properties when calculating a target's armor.
- This applies to magical attacks.
- Use the 'x' notetag variant to determine a flat penetration value.
- Use the 'x%' notetag variant to determine a percentile penetration value.

---

<Bypass Damage Cap>

- Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- If used on skills and/or items, this will cause the action to never have
its damage capped.
- If used on trait objects, this will cause the affected unit to never have
its damage capped.

---

<Damage Cap: x>

- Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- If used on skills and/or items, this will declare the hard damage cap to
be the 'x' value.
- If used on trait objects, this will raise the affect unit's hard damage
cap to 'x' value. If another trait object has a higher value, use that
value instead.

---

<Bypass Soft Damage Cap>

- Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- If used on skills and/or items, this will cause the action to never have
its damage scaled downward to the soft cap.
- If used on trait objects, this will cause the affected unit to never have
its damage scaled downward to the soft cap.

---

<Soft Damage Cap: +x%>
<Soft Damage Cap: -x%>

- Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- If used on skills and/or items, this will increase/decrease the action's
soft cap by x% where 'x' is a percentage value representing the increment
changed by the hard cap value.
- If used on trait objects, this will raise the affect unit's soft damage
limit by x% where 'x' is a percentage value representing the increment
changed by the hard cap value.

---

<Unblockable>

- Used for: Skill, Item Notetags
- Using "Guard" against this skill will not reduce any damage.

---

<Popup Position: Head>
<Popup Position: Center>
<Popup Position: Base>

- Used for: Enemy Notetags
- Determines the popup starting position for this enemy.
- Head makes the popups start at the top of the ennemy.
- Center makes the popups start at the center of the ennemy.
- Base makes the popups start at the bottom of the ennemy.
- If this notetag is not used, refer to the default Plugin Parameter setting
found in Damage Settings.

---

<Popup Offset X: +x>
<Popup Offset X: -x>
<Popup Offset Y: +y>
<Popup Offset Y: -y>

- Used for: Enemy Notetags
- Alters the popup x/y position offset for this enemy.
- Replace 'x' with a number representing the horizontal position x offset.
- Negative: left. Positive: right.
- Replace 'y' with a number representing the vertical position y offset.
- Negative: up. Positive: down.
- If these notetags are not used, refer to the default Plugin Parameter
settings found in Damage Settings.

---

=== Critical-Related Notetags ===

The following notetags affect skill and item critical hit rates and the
critical damage multiplier.

---

<Always Critical>

- Used for: Skill, Item Notetags
- This skill/item will always land a critical hit regardless of the
user's CRI parameter value.

---

<Set Critical Rate: x%>

- Used for: Skill, Item Notetags
- This skill/item will always have a x% change to land a critical hit
regardless of user's CRI parameter value.
- Replace 'x' with a percerntage value representing the success rate.

---

<Modify Critical Rate: x%>
<Modify Critical Rate: +x%>
<Modify Critical Rate: -x%>

- Used for: Skill, Item Notetags
- Modifies the user's CRI parameter calculation for this skill/item.
- The 'x%' notetag variant will multiply the user's CRI parameter value
for this skill/item.
- The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
the user's CRI parameter value for this skill/item.

---

<Modify Critical Multiplier: x%>
<Modify Critical Multiplier: +x%>
<Modify Critical Multiplier: -x%>

- Used for: Skill, Item Notetags
- These notetags determine the damage multiplier when a critical hit lands.
- The 'x%' notetag variant multiply the multiplier to that exact percentage.
- The '+x%' and '-x%' notetag variants will change the multiplier with an
incremenetal rate for this skill/item.

---

<Modify Critical Bonus Damage: x%>
<Modify Critical Bonus Damage: +x%>
<Modify Critical Bonus Damage: -x%>

- Used for: Skill, Item Notetags
- These notetags determine the bonus damage added when a critical hit lands.
- The 'x%' notetag variant multiply the damage to that exact percentage.
- The '+x%' and '-x%' notetag variants will change the bonus damage with an
incremenetal rate for this skill/item.

---

=== JavaScript Notetags: Critical-Related ===

The following are notetags made for users with JavaScript knowledge to
determine how critical hit-related aspects are calculated.

---

<JS Critical Rate>
code
code
rate = code;
</JS Critical Rate>

- Used for: Skill, Item Notetags
- The 'rate' variable is the final returned amount to determine the
critical hit success rate.
- Base value comes from Game_Action.itemCri
- Skill/Item <JS Critical Rate> runs
- Then <JS Critical Rate as User/Target> notetags run
- Replace 'code' with JavaScript code to determine the final 'rate' to be
returned as the critical hit success rate.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.

---

<JS Critical Rate as User>
code
code
rate = code;
</JS Critical Rate as User>

<JS Critical Rate as Target>
code
code
rate = code;
</JS Critical Rate as Target>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Only applies during battle.
- The 'rate' variable is the final returned amount to determine the
critical hit success rate.
- Base value comes from Game_Action.itemCri
- Skill/Item <JS Critical Rate> runs
- Then <JS Critical Rate as User/Target> notetags run
- Replace 'code' with JavaScript code to determine the final 'rate' to be
returned as the critical hit success rate.
- If used on trait objects, this will apply to any skills/items used as long
as the unit affected by the trait object has access to the trait object.
- If the 'as User' notetag variant is used, this code will be run as a
response to the action from the action user end.
- If the 'as Target' notetag variant is used, this code will be run as a
response to the action from the action target end.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.

---

<JS Critical Damage>
code
code
multiplier = code;
bonusDamage = code;
</JS Critical Damage>

- Used for: Skill, Item Notetags
- The 'multiplier' variable is returned later and used as the damage
multiplier used to amplify the critical damage amount.
- The 'bonusDamage' variable is returned later and used as extra added
damage for the critical damage amount.
- Replace 'code' with JavaScript code to determine how the 'multiplier' and
'bonusDamage' variables are calculated.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.

---

=== Life Steal-Related Notetags ===

---

<HP Life Steal: x%>
<MP Life Steal: x%>

- Used for: Skill, Item Notetags
- Causes this skill/item to have Life Steal properties, allowing the user to
take x% of the HP/MP Damage as recovered HP/MP.
- HP Life Steal can only take HP from dealt HP damage.
- MP Life Steal can only take MP from dealt MP damage.
- Replace 'x' with a number representing the percentage of the dealt damage
used as HP/MP recovery.
- This cannot be used with skills/items with HP Drain/MP Drain. Life Steal
is a different mechanic from HP Drain/MP Drain.

---

<HP Life Steal Certain Hit: +x%>
<HP Life Steal Physical Hit: +x%>
<HP Life Steal Magical Hit: +x%>

<HP Life Steal Certain Hit: -x%>
<HP Life Steal Physical Hit: -x%>
<HP Life Steal Magical Hit: -x%>

<MP Life Steal Certain Hit: +x%>
<MP Life Steal Physical Hit: +x%>
<MP Life Steal Magical Hit: +x%>

<MP Life Steal Certain Hit: -x%>
<MP Life Steal Physical Hit: -x%>
<MP Life Steal Magical Hit: -x%>

- Used for: Used for: Actor, Class, Armor, Enemy, State Notetags
- The related battler's various trait properties can have passive life steal
properties that will trigger upon using skills/items with matching hit
types regardless of whether or not the skill/item innately has Life Steal.
- Notetag variants with "Certain Hit" will only trigger from "Certain Hit"
skill and item types. Same with "Physical" and "Magical" variants.
- HP Life Steal can only take HP from dealt HP damage.
- MP Life Steal can only take HP from dealt MP damage.
- Replace 'x' with a number representing the additive stacking percentage
boost of the dealt damage used as HP/MP recovery. The effects will stack
additively with other trait objects.
- This cannot be used with skills/items with HP Drain/MP Drain. Life Steal
is a different mechanic from HP Drain/MP Drain.

---

<Cancel Life Steal>

<Cancel HP Life Steal>
<Cancel MP Life Steal>

- Used for: Skill, Item Notetags
- Prevents this skill from allowing Life Steal effects to occur including
the passive life steal calculators from the skill/item user.
- This does not affect HP Drain/MP Drain. Life Steal is a different mechanic
from HP Drain/MP Drain.

---

<Guard Life Steal>

<Guard HP Life Steal>
<Guard MP Life Steal>

- Used for: Used for: Actor, Class, Armor, Enemy, State Notetags
- If the related battler becomes the target of Life Steal, this will prevent
the Life Steal effects from taking effect.
- This does not affect HP Drain/MP Drain. Life Steal is a different mechanic
from HP Drain/MP Drain.

---

<Disarm Life Steal>

<Disarm HP Life Steal>
<Disarm MP Life Steal>

- Used for: Used for: Actor, Class, Armor, Enemy, State Notetags
- Makes the related battler unable to HP/MP Life Steal regardless of the
skill/item and its related properties like equipment.
- This does not prevent skills/items with innate Life Steal from being used.
Only the Life Steal part of the skill/item will have no effect.
- This does not affect HP Drain/MP Drain. Life Steal is a different mechanic
from HP Drain/MP Drain.

---

<Negative Life Steal>

<Negative HP Life Steal>
<Negative MP Life Steal>

- Used for: Used for: Actor, Class, Armor, Enemy, State Notetags
- If the related battler becomes the target of Life Steal, this will invert
the healing properties of Life Steal, causing the Life Steal user to
instead take HP/MP damage.
- This does NOT heal the target related battler.
- This does not prevent skills/items with innate Life Steal from being used.
Only the Life Steal part of the skill/item will have no effect.
- This does not affect HP Drain/MP Drain. Life Steal is a different mechanic
from HP Drain/MP Drain.

---

=== Action Sequence-Related Notetags ===

Action Sequences allow you full control over how a skill and/or item plays
through its course. These notetags give you control over various aspects of
those Action Sequences. More information is found in the Action Sequences
help section.

---

<Custom Action Sequence>

- Used for: Skill, Item Notetags
- Removes all automated Action Sequence parts from the skill.
- Everything Action Sequence-related will be done by Common Events.
- Insert Common Event(s) into the skill/item's effects list to make use of
the Custom Action Sequences.
- This will prevent common events from loading in the Item Scene and Skill
Scene when used outside of battle.

---

<Auto Action Sequence>

- Used for: Skill, Item Notetags
- If the Action Sequence Plugin Parameter "Auto Notetag" is enabled, this
plugin will prevent custom action sequences from happening for the skill
or item, and instead, use an Automatic Action Sequence instead.
- Ignore this if you have "Auto Notetag" disabled or set to false. By
default, this setting is set to false. Please be aware of the changes
you've made to your game before using it.

---

<Bypass Auto Action Sequence>

- Used for: Skill, Item Notetags
- This notetag is used for the game devs that have the Action Sequence
Plugin Parameter "Auto Notetag" on for applying <Custom Action Sequence>
to everything.
- This will allow items and skills to be able to launch their common
events from the menu scene regardless of the inherent restriction to
prevent action sequence based skills/items with common events from
launching.
- Ignore this if you have "Auto Notetag" disabled or set to false. By
default, this setting is set to false. Please be aware of the changes
you've made to your game before using it.

---

<Common Event: name>

- Used for: Skill, Item Notetags
- Battle only: calls forth a Common Event of a matching name.
- Replace 'name' with the name of a Common Event to call from when this
skill/item is used in battle.
- Remove any \I[x] in the name.
- Insert multiple notetags to call multiple Common Events in succession.
- This will occur after any Common Event Trait Effects for the skill/item's
database entry.
- This is primarily used for users who are reorganizing around their Common
Events and would still like to have their skills/items perform the correct
Action Sequences in case the ID's are different.

---

<Display Icon: x>
<Display Text: string>

- Used for: Skill, Item Notetags
- When displaying the skill/item name in the Action Sequence, determine the
icon and/or text displayed.
- Replace 'x' with a number value representing the icon ID to be displayed.
- Replace 'string' with a text value representing the displayed name.

---

<Common Event Key: name>
<Common Event Keys: name, name, name>

<Common Event Keys>
key
key
key
</Common Event Keys>

- Used for: Skill, Item Notetags
- Will generate Common Events for the skill/item with a corresponding key.
- Replace 'name' with the name of the Common Event's key that you want to
reference. That key will be converted into a Common Event effect for the
skill/item and be treated as an action sequence.
- The notetag variants that use multiple keys will have the keys added in
the order they are listed.
- If keys do not reference any Common Events, no Common Events will be
added for that key.
- To mark a Common Event with a key, insert inside a Common Event's name the
[ and ] brackets around the text that will be used as the Common Event's
key text.
- For example, if Common Event's name is "Penta Slash [PENTA]", then the
key used is "PENTA" without the quotes.
- This key could then be referenced by <Common Event Key: PENTA> notetag.
- Do not use commas (,) inside the key text as it will be automatically
removed for the sake of consistency.
- This feature is made for make the process of sharing Action Sequences to
become easier without needing to line up Common Event ID's.

---

=== Animated Sideview Battler-Related Notetags ===

Enemies can use Animated Sideview Actor graphics thanks to this plugin.
These notetags give you control over that aspect. Some of these also affect
actors in addition to enemies.

---

<Sideview Battler: filename>

<Sideview Battlers>
filename: weight
filename: weight
filename: weight
</Sideview Battlers>

- Used for: Enemy Notetags
- Replaces the enemy's battler graphic with an animated Sideview Actor
graphic found in the img/sv_actors/ folder.
- Replace 'filename' with the filename of the graphic to use. Do not insert
any extensions. This means the file 'Actor1_1.png' will be only inserted
as 'Actor1_1' without the '.png' at the end.
- If the multiple notetag vaiant is used, then a random filename is selected
from the list upon the enemy's creation.
- Replace 'weight' with a number value representing how often the 'filename'
would come up. The higher the weight, the more often. You may omit this
and the colon(:) and just type in the 'filename' instead.
- Add/remove lines as you see fit.

Example:

<Sideview Battlers>
Actor1_1: 25
Actor1_3: 10
Actor1_5
Actor1_7
</Sideview Battlers>

---

<Sideview Anchor: x, y>

- Used for: Actor, Enemy Notetags
- Sets the sprite anchor positions for the sideview sprite.
- Replace 'x' and 'y' with numbers depicting where the anchors should be for
the sideview sprite.
- By default, the x and y anchors are 0.5 and 1.0.

---

<Sideview Home Offset: +x, +y>
<Sideview Home Offset: -x, -y>

- Used for: Actor, Class, Weapon, Armor, State Notetags
- Offsets the sideview actor sprite's home position by +/-x, +/-y.
- Replace 'x' and 'y' with numbers depicting how much to offset each of the
coordinates by. For '0' values, use +0 or -0.
- This notetag will not work if you remove it from the JavaScript code in
Plugin Parameters > Actor > JS:  Home Position

---

<Sideview Weapon Offset: +x, +y>
<Sideview Weapon Offset: -x, -y>

- Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
- Offsets the sideview weapon sprite's position by +/-x, +/-y.
- Replace 'x' and 'y' with numbers depicting how much to offset each of the
coordinates by. For '0' values, use +0 or -0.

---

<Sideview Show Shadow>
<Sideview Hide Shadow>

- Used for: Actor, Enemy Notetags
- Sets it so the sideview battler's shadow will be visible or hidden.

---

<Sideview Shadow Scale: x%>
<Sideview Shadow Scale: x.y>

- Used for: Actor, Enemy Notetags
- Adjusts the scaling size of the sideview battler's shadow.
- This affects both the X and Y scale.

---

<Sideview Shadow Scale X: x%>
<Sideview Shadow Scale X: x.y>

<Sideview Shadow Scale Y: x%>
<Sideview Shadow Scale Y: x.y>

- Used for: Actor, Enemy Notetags
- Adjusts the scaling size of the sideview battler's shadow.
- These affect their respective X and Y scales separately.

---

<Sideview Collapse>
<Sideview No Collapse>

- Used for: Enemy Notetags
- Either shows the collapse graphic or does not show the collapse graphic.
- Collapse graphic means the enemy will 'fade away' once it's defeated.
- No collapse graphic means the enemy's corpse will remain on the screen.

---

<Sideview Idle Motion: name>

<Sideview Idle Motions>
name: weight
name: weight
name: weight
</Sideview Idle Motions>

- Used for: Enemy Notetags
- Changes the default idle motion for the enemy.
- Replace 'name' with any of the following motion names:
- 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
'abnormal', 'sleep', 'dead'
- If the multiple notetag vaiant is used, then a random motion name is
selected from the list upon the enemy's creation.
- Replace 'weight' with a number value representing how often the 'name'
would come up. The higher the weight, the more often. You may omit this
and the colon(:) and just type in the 'name' instead.
- Add/remove lines as you see fit.

Example:

<Sideview Idle Motions>
walk: 25
wait: 50
guard
victory
abnormal
</Sideview Idle Motions>

---

<Sideview Size: width, height>

- Used for: Enemy Notetags
- When using a sideview battler, its width and height will default to the
setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
- This notetag lets you change that value to something else.
- Replace 'width' and 'height' with numbers representing how many pixels
wide/tall the sprite will be treated as.
- This does NOT change the image size. This only changes the HITBOX size.

---

<Sideview Weapon: weapontype>

<Sideview Weapons>
weapontype: weight
weapontype: weight
weapontype: weight
</Sideview Weapons>

- Used for: Enemy Notetags
- Give your sideview enemies weapons to use.
- Replace 'weapontype' with the name of the weapon type found under the
Database => Types => Weapon Types list (without text codes).
- If the multiple notetag vaiant is used, then a random weapon type is
selected from the list upon the enemy's creation.
- Replace 'weight' with a number value representing how often the weapontype
would come up. The higher the weight, the more often. You may omit this
and the colon(:) and just type in the 'weapontype' instead.
- Add/remove lines as you see fit.

Example:

<Sideview Weapons>
Dagger: 25
Sword: 25
Axe
</Sideview Weapons>

---

<traitname Sideview Battler: filename>

<traitname Sideview Battlers>
filename: weight
filename: weight
filename: weight
</traitname Sideview Battlers>

- Used for: Enemy Notetags
- Requires VisuMZ_1_ElementStatusCore
- Allows certain Trait Sets to cause battlers to have a unique appearance.
- Replace 'filename' with the filename of the graphic to use. Do not insert
any extensions. This means the file 'Actor1_1.png' will be only inserted
as 'Actor1_1' without the '.png' at the end.
- If the multiple notetag vaiant is used, then a random filename is selected
from the list upon the enemy's creation.
- Replace 'weight' with a number value representing how often the 'filename'
would come up. The higher the weight, the more often. You may omit this
and the colon(:) and just type in the 'filename' instead.
- Add/remove lines as you see fit.

Examples:

<Male Sideview Battlers>
Actor1_1: 25
Actor1_3: 10
Actor1_5
Actor1_7
</Male Sideview Battlers>

<Female Sideview Battlers>
Actor1_2: 25
Actor1_4: 10
Actor1_6
Actor1_8
</Female Sideview Battlers>

---

<traitname Sideview Idle Motion: name>

<traitname Sideview Idle Motions>
name: weight
name: weight
name: weight
</traitname Sideview Idle Motions>

- Used for: Enemy Notetags
- Requires VisuMZ_1_ElementStatusCore
- Allows certain Trait Sets to cause battlers to have unique idle motions.
- Replace 'name' with any of the following motion names:
- 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
'abnormal', 'sleep', 'dead'
- If the multiple notetag vaiant is used, then a random motion name is
selected from the list upon the enemy's creation.
- Replace 'weight' with a number value representing how often the 'name'
would come up. The higher the weight, the more often. You may omit this
and the colon(:) and just type in the 'name' instead.
- Add/remove lines as you see fit.

Examples:

<Jolly Sideview Idle Motions>
wait: 25
victory: 10
walk
</Jolly Sideview Idle Motions>

<Serious Sideview Idle Motions>
walk: 25
guard: 10
wait
</Jolly Sideview Idle Motions>

---

<traitname Sideview Weapon: weapontype>

<traitname Sideview Weapons>
weapontype: weight
weapontype: weight
weapontype: weight
</traitname Sideview Weapons>

- Used for: Enemy Notetags
- Requires VisuMZ_1_ElementStatusCore
- Allows certain Trait Sets to cause battlers to have unique weapons.
- Replace 'weapontype' with the name of the weapon type found under the
Database => Types => Weapon Types list (without text codes).
- If the multiple notetag vaiant is used, then a random weapon type is
selected from the list upon the enemy's creation.
- Replace 'weight' with a number value representing how often the weapontype
would come up. The higher the weight, the more often. You may omit this
and the colon(:) and just type in the 'weapontype' instead.
- Add/remove lines as you see fit.

Examples:

<Male Sideview Weapons>
Dagger: 25
Sword: 25
Axe
</Male Sideview Weapons>

<Female Sideview Weapons>
Dagger: 25
Spear: 25
Cane
</Female Sideview Weapons>

---

=== Enemy-Related Notetags ===

---

<Battler Sprite Cannot Move>

- Used for: Enemy Notetags
- Prevents the enemy from being able to move, jump, and/or float due to
Action Sequences. Useful for rooted enemies.

---

<Battler Sprite Grounded>

- Used for: Enemy Notetags
- Prevents the enemy from being able to jumping and/or floating due to
Action Sequences but still able to move. Useful for rooted enemies.

---

<Swap Enemies>
name: weight
name: weight
name: weight
</Swap Enemies>

- Used for: Enemy Notetags
- Causes this enemy database object to function as a randomizer for any of
the listed enemies inside the notetag. When the enemy is loaded into the
battle scene, the enemy is immediately replaced with one of the enemies
listed. The randomization is based off the 'weight' given to each of the
enemy 'names'.
- Replace 'name' with the database enemy of the enemy you wish to replace
the enemy with.
- Replace 'weight' with a number value representing how often the 'name'
would come up. The higher the weight, the more often. You may omit this
and the colon(:) and just type in the 'name' instead.
- Add/remove lines as you see fit.

Example:

<Swap Enemies>
Bat: 50
Slime: 25
Orc
Minotaur
</Swap Enemies>

---

<Aspect Name: name>

- Used for: Enemy Notetags
- Changes enemy's aspect name shown in the In-Battle Status and other
supported plugin menus.
- Requires <Aspect Description> in order to show.
- Replace 'name' with text for how enemy aspect should be renamed.

---

<Aspect Color: color>

- Used for: Enemy Notetags
- Changes enemy's aspect name color shown in the In-Battle Status and other
supported plugin menus.
- Requires <Aspect Description> in order to show.
- Replace 'color' with either a number from 0 to 31 representing the text
color or in the format of '#rrggbb' to custom pick a hex color.

---

<Aspect Icon: x>

- Used for: Enemy Notetags
- Changes enemy's aspect icon shown in the In-Battle Status and other
supported plugin menus.
- Requires <Aspect Description> in order to show.
- Replace 'x' with a number representing the icon index used to represent
the enemy aspect.

---

<Aspect Description>
text
text
</Aspect Description>

- Used for: Enemy Notetags
- Changes enemy's aspect description shown in the In-Battle Status and other
supported plugin menus.
- Replace 'text' with the text you would like to appear as a description for
the enemy's aspect.

---

=== JavaScript Notetags: Mechanics-Related ===

These JavaScript notetags allow you to run code at specific instances during
battle provided that the unit has that code associated with them in a trait
object (actor, class, weapon, armor, enemy, or state). How you use these is
entirely up to you and will depend on your ability to understand the code
used and driven for each case.

---

<JS Pre-Start Battle>
code
code
code
</JS Pre-Start Battle>

<JS Post-Start Battle>
code
code
code
</JS Post-Start Battle>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code at the start of battle aimed at the function:
BattleManager.startBattle()
- 'Pre' runs before the function runs.
- 'Post' runs after the function runs.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

<JS Pre-Start Turn>
code
code
code
</JS Pre-Start Turn>

<JS Post-Start Turn>
code
code
code
</JS Post-Start Turn>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code at the start of a turn aimed at the function:
BattleManager.startTurn()
- 'Pre' runs before the function runs.
- 'Post' runs after the function runs.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

<JS Pre-Start Action>
code
code
code
</JS Pre-Start Action>

<JS Post-Start Action>
code
code
code
</JS Post-Start Action>

- Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code at the start of an action aimed at the function:
BattleManager.startAction()
- 'Pre' runs before the function runs.
- 'Post' runs after the function runs.
- If used on skills and/or items, this will only apply to the skill/item
being used and does not affect other skills and items.
- If used on trait objects, this will apply to any skills/items used as long
as the unit affected by the trait object has access to the trait object.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

<JS Pre-Apply>
code
code
code
</JS Pre-Apply>

- Used for: Skill, Item Notetags
- Runs JavaScript code at the start of an action hit aimed at the function:
Game_Action.prototype.apply()
- 'Pre' runs before the function runs.
- If used on skills and/or items, this will only apply to the skill/item
being used and does not affect other skills and items.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.

---

<JS Pre-Apply as User>
code
code
code
</JS Pre-Apply as User>

<JS Pre-Apply as Target>
code
code
code
</JS Pre-Apply as Target>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code at the start of an action hit aimed at the function:
Game_Action.prototype.apply()
- 'Pre' runs before the function runs.
- If used on trait objects, this will apply to any skills/items used as long
as the unit affected by the trait object has access to the trait object.
- If the 'as User' notetag variant is used, this code will be run as a
response to the action from the action user end.
- If the 'as Target' notetag variant is used, this code will be run as a
response to the action from the action target end.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.

---

<JS Pre-Damage>
code
code
code
</JS Pre-Damage>

- Used for: Skill, Item Notetags
- Runs JavaScript code before damage is dealt aimed at the function:
Game_Action.prototype.executeDamage()
- 'Pre' runs before the function runs.
- If used on skills and/or items, this will only apply to the skill/item
being used and does not affect other skills and items.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.
- The 'value' variable represents the damage being calculated up to this
point (if any) and any changes made to the 'value' variable will reflect
on the damage dealt/healed, too.

---

<JS Pre-Damage as User>
code
code
code
</JS Pre-Damage as User>

<JS Pre-Damage as Target>
code
code
code
</JS Pre-Damage as Target>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code before damage is dealt aimed at the function:
Game_Action.prototype.executeDamage()
- 'Pre' runs before the function runs.
- If used on trait objects, this will apply to any skills/items used as long
as the unit affected by the trait object has access to the trait object.
- If the 'as User' notetag variant is used, this code will be run as a
response to the action from the action user end.
- If the 'as Target' notetag variant is used, this code will be run as a
response to the action from the action target end.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.
- The 'value' variable represents the damage being calculated up to this
point (if any) and any changes made to the 'value' variable will reflect
on the damage dealt/healed, too.

---

<JS Post-Damage>
code
code
code
</JS Post-Damage>

- Used for: Skill, Item Notetags
- Runs JavaScript code after damage is dealt aimed at the function:
Game_Action.prototype.executeDamage()
- 'Post' runs after the function runs.
- If used on skills and/or items, this will only apply to the skill/item
being used and does not affect other skills and items.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.
- The 'value' variable represents the damage/healing that has been last
dealt through this action.

---

<JS Post-Damage as User>
code
code
code
</JS Post-Damage as User>

<JS Post-Damage as Target>
code
code
code
</JS Post-Damage as Target>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code after damage is dealt aimed at the function:
Game_Action.prototype.executeDamage()
- 'Post' runs after the function runs.
- If used on trait objects, this will apply to any skills/items used as long
as the unit affected by the trait object has access to the trait object.
- If the 'as User' notetag variant is used, this code will be run as a
response to the action from the action user end.
- If the 'as Target' notetag variant is used, this code will be run as a
response to the action from the action target end.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.
- The 'value' variable represents the damage/healing that has been last
dealt through this action.

---

<JS Post-Apply>
code
code
code
</JS Post-Apply>

- Used for: Skill, Item Notetags
- Runs JavaScript code at the end of an action hit aimed at the function:
Game_Action.prototype.apply()
- 'Post' runs after the function runs.
- If used on skills and/or items, this will only apply to the skill/item
being used and does not affect other skills and items.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one using the skill/item.
- The 'target' variable represents the one receiving the skill/item hit.

---

<JS Post-Apply as User>
code
code
code
</JS Post-Apply as User>

<JS Post-Apply as Target>
code
code
code
</JS Post-Apply as Target>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code at the end of an action hit aimed at the function:
Game_Action.prototype.apply()
- 'Post' runs after the function runs.
- If used on trait objects, this will apply to any skills/items used as long
as the unit affected by the trait object has access to the trait object.
- If the 'as User' notetag variant is used, this code will be run as a
response to the action from the action user end.
- If the 'as Target' notetag variant is used, this code will be run as a
response to the action from the action target end.
- Replace 'code' with JavaScript code to run desired effects.

---

<JS Pre-End Action>
code
code
code
</JS Pre-End Action>

<JS Post-End Action>
code
code
code
</JS Post-End Action>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code at the end of an action aimed at the function:
BattleManager.endAction()
- 'Pre' runs before the function runs.
- 'Post' runs after the function runs.
- If used on trait objects, this will apply to any skills/items used as long
as the unit affected by the trait object has access to the trait object.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

<JS Pre-End Turn>
code
code
code
</JS Pre-End Turn>

<JS Post-End Turn>
code
code
code
</JS Post-End Turn>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code at the end of a turn aimed at the function:
Game_Battler.prototype.onTurnEnd()
- 'Pre' runs before the function runs.
- 'Post' runs after the function runs.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

<JS Pre-Regenerate>
code
code
code
</JS Pre-Regenerate>

<JS Post-Regenerate>
code
code
code
</JS Post-Regenerate>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
Game_Battler.prototype.regenerateAll()
- 'Pre' runs before the function runs.
- 'Post' runs after the function runs.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

<JS Battle Victory>
code
code
code
</JS Battle Victory>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code when a battle is won aimed at the function:
BattleManager.processVictory()
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

<JS Escape Success>
code
code
code
</JS Escape Success>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code when escaping succeeds aimed at the function:
BattleManager.onEscapeSuccess()
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

<JS Escape Failure>
code
code
code
</JS Escape Failure>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code when escaping fails aimed at the function:
BattleManager.onEscapeFailure()
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

<JS Battle Defeat>
code
code
code
</JS Battle Defeat>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code when a battle is lost aimed at the function:
BattleManager.processDefeat()
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

<JS Pre-End Battle>
code
code
code
</JS Pre-End Battle>

<JS Post-End Battle>
code
code
code
</JS Post-End Battle>

- Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
- Runs JavaScript code when the battle is over aimed at the function:
BattleManager.endBattle()
- 'Pre' runs before the function runs.
- 'Post' runs after the function runs.
- Replace 'code' with JavaScript code to run desired effects.
- The 'user' variable represents the one affected by the trait object.

---

=== Battle Layout-Related Notetags ===

These tags will change the battle layout for a troop regardless of how the
plugin parameters are set up normally. Insert these tags in either the
noteboxes of maps or the names of troops for them to take effect. If both
are present for a specific battle, then priority goes to the setting found
in the troop name.

---

<Layout: type>
<Battle Layout: type>

- Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
- Changes the battle layout style used for this specific map or battle.
- Replace 'type' with 'default', 'list', 'xp', 'portrait', or 'border'.
- Those with VisuMZ_3_FrontviewBattleUI can use 'frontview'.
- Those with VisuMZ_3_SideviewBattleUI can use 'sideview'.
- If using Troop Comment Tags, then as long as the tag appears in a comment
found on any of the Troop's pages (even if they don't run), the tag will
be considered in effect.

---

=== Troop Size Tags ===

---

<Extend: x>
<Extend: x, x, x>

- Used for: Troop Name Tags and Troop Comment Tags
- Adds enemies from another troop to the current troop.
- Enemies from another troop will retain their database positions.
- Replace 'x' with the ID of the database troop entry you wish to add enemy
members from.
- Insert multiple x's to add from more troops.
- Extended troop members will be added in the order they're listed.
- Be cautious of how many enemies you add as too many will lag the battle
system. We are not responsible for frame drops due to this.

---

=== Troop Comment Tags ===

Place these tags inside of a comment found in a troop page's event list.

---

<Once Parallel When Start Battle>

- Used for: Troop Page Comment Tags
- Causes the troop page to immediately load the moment the battle scene
begins to fade in (not after it fades in). This is faster than a turn 0
condition troop page. Troop page conditions are ignored.
- This can be used for things like the Action Sequence Camera plugin, the
Visual Battle Environment plugin, and/or initial battle poses and such in
order to provide a near seamless battle transition experience.
- This does NOT trigger when coming out of the options menu or party menu.
- This WILL trigger when going from battle to battle nonstop via plugins
like VisuStella MZ's Chain Battles.
- When actors are moving towards their home positions, it will take around
30 frames by default. Use this information however you like.

---

Action Sequence - Plugin Commands

Skills and items, when used in battle, have a pre-determined series of
actions to display to the player as a means of representing what's going on
with the action. For some game devs, this may not be enough and they would
like to get more involved with the actions themselves.

Action Sequences, added through this plugin, enable this. To give a skill or
item a Custom Action Sequence, a couple of steps must be followed:

---

1. Insert the <Custom Action Sequence> notetag into the skill or item's
notebox (or else this would not work as intended).
2. Give that skill/item a Common Event through the Effects box. The selected
Common Event will contain all the Action Sequence data.
3. Create the Common Event with Action Sequence Plugin Commands and/or event
commands to make the skill/item do what you want it to do.

---

The Plugin Commands added through the Battle Core plugin focus entirely on
Action Sequences. However, despite the fact that they're made for skills and
items, some of these Action Sequence Plugin Commands can still be used for
regular Troop events and Common Events.

---

=== Action Sequence - Action Sets ===

Action Sequence Action Sets are groups of commonly used
Action Sequence Commands put together for more efficient usage.

---

ACSET: Setup Action Set
- The generic start to most actions.

Display Action:
Immortal: On:
Battle Step:
Wait For Movement:
Cast Animation:
Wait For Animation:
- Use this part of the action sequence?

---

ACSET: All Targets Action Set
- Affects all targets simultaneously performing the following.

Dual/Multi Wield?
- Add times struck based on weapon quantity equipped?

Perform Action:
Wait Count:
Action Animation:
Wait For Animation:
Action Effect:
Immortal: Off:
- Use this part of the action sequence?
- Insert values for the Wait Count(s).

---

ACSET: Each Target Action Set
- Goes through each target one by one to perform the following.

Dual/Multi Wield?
- Add times struck based on weapon quantity equipped?

Perform Action:
Wait Count:
Action Animation:
Wait Count:
Action Effect:
Immortal: Off:
- Use this part of the action sequence?
- Insert values for the Wait Count(s).

---

ACSET: Finish Action
- The generic ending to most actions.

Wait For New Line:
Wait For Effects:
Clear Battle Log:
Home Reset:
Wait For Movement:
- Use this part of the action sequence?

---

=== Action Sequences - Angle ===

These action sequences allow you to have control over the camera angle.
Requires VisuMZ_3_ActSeqCamera!

---

ANGLE: Change Angle
- Changes the camera angle.
- Requires VisuMZ_3_ActSeqCamera!

Angle:
- Change the camera angle to this many degrees.

Duration:
- Duration in frames to change camera angle.

Angle Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Angle?:
- Wait for angle changes to complete before performing next command?

---

ANGLE: Reset Angle
- Reset any angle settings.
- Requires VisuMZ_3_ActSeqCamera!

Duration:
- Duration in frames to reset camera angle.

Angle Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Angle?:
- Wait for angle changes to complete before performing next command?

---

ANGLE: Wait For Angle
- Waits for angle changes to complete before performing next command.
- Requires VisuMZ_3_ActSeqCamera!

---

=== Action Sequences - Animations ===

These Action Sequences are related to the 'Animations' that can be found in
the Animations tab of the Database.

---

ANIM: Action Animation
- Plays the animation associated with the action.

Targets:
- Select unit(s) to play the animation on.

Mirror Animation:
- Mirror the animation?

Wait For Animation?:
- Wait for animation to complete before performing next command?

---

ANIM: Attack Animation
- Plays the animation associated with the user's weapon.

Targets:
- Select unit(s) to play the animation on.

Mirror Animation:
- Mirror the animation?

Wait For Animation?:
- Wait for animation to complete before performing next command?

---

ANIM: Attack Animation 2+
- Plays the animation associated with the user's other weapons.
- Plays nothing if there is no other weapon equipped.

Targets:
- Select unit(s) to play the animation on.

Slot:
- Which weapon slot to get this data from?
- Main-hand weapon is weapon slot 1.

Mirror Animation:
- Mirror the animation?

Wait For Animation?:
- Wait for animation to complete before performing next command?

---

ANIM: Balloon Animation
- Plays a balloon animation on target(s).

Targets:
- Select unit(s) to play the animation on.

Balloon Type:
- What kind of balloon should be played on target(s)?

Wait for Completion:
- Wait for balloon animation completion before continuing?

---

ANIM: Balloon Icon (Single)
- Plays a balloon animation using an icon on target(s).
- Requires VisuMZ_4_IconBalloons!

Targets:
- Select unit(s) to play the animation on.

Icon Index:
- Insert the ID of the icon to show.
- Tip: Right click > Insert Icon Index

Wait for Completion:
- Wait for balloon animation completion before continuing?

---

ANIM: Balloon Icon (Range)
- Plays a balloon animation an icon range on target(s).
- Requires VisuMZ_4_IconBalloons!

Targets:
- Select unit(s) to play the animation on.

Starting Icon Index:
- Insert the ID of the icon to show.
- Tip: Right click > Insert Icon Index

Ending Icon Index:
- Insert the ID of the icon to show.
- Tip: Right click > Insert Icon Index

Wait for Completion:
- Wait for balloon animation completion before continuing?

---

ANIM: Balloon Icon (Specific)
- Plays a balloon animation with specific icons on target(s).
- Requires VisuMZ_4_IconBalloons!

Targets:
- Select unit(s) to play the animation on.

Icons:
- Insert the ID(s) of the icon to show.
- Tip: Right click > Insert Icon Index

Wait for Completion:
- Wait for balloon animation completion before continuing?

---

ANIM: Cast Animation
- Plays the cast animation associated with the action.

Targets:
- Select unit(s) to play the animation on.

Mirror Animation:
- Mirror the animation?

Wait For Animation?:
- Wait for animation to complete before performing next command?

---

ANIM: Change Battle Portrait
- Changes the battle portrait of the actor (if it's an actor).
- Can be used outside of battle/action sequences.

Targets:
- Select unit(s) to play the animation on.
- Valid units can only be actors.

Filename:
- Select the file to change the actor's portrait to.

---

ANIM: Change Battle Portrait (JS)
- Changes the battle portrait of the actor through JavaScript.
- Can be used outside of battle/action sequences.

JS: Actor ID:
- Enter which Actor ID to affect.
- Uses JavaScript code.

JS: Filename:
- Enter the filename you wish to use.
- Uses JavaScript code.

---

ANIM: Guard Animation
- Plays the animation associated with the user's guard action (if any).

Targets:
- Select unit(s) to play the animation on.

Mirror Animation:
- Mirror the animation?

Wait For Animation?:
- Wait for animation to complete before performing next command?

---

ANIM: Item Animation
- Plays the animation associated with a specific item.

Item ID:
- Which item ID will the animation come from?

Targets:
- Select unit(s) to play the animation on.

Mirror Animation:
- Mirror the animation?

Wait For Animation?:
- Wait for animation to complete before performing next command?

---

ANIM: Play at Coordinate
- Plays an animation on the screen at a specific x, y coordinate.
- Requires VisuMZ_0_CoreEngine!

Animation ID:
- Plays this animation.

Coordinates:

X:
Y:
- X/Y coordinate used for the animation.
You may use JavaScript code.

Mirror Animation?:
- Mirror the animation?

Mute Animation?:
- Mute the animation?

Wait for Completion?:
- Wait the animation to finish before continuing?

---

ANIM: Show Animation
- Plays the a specific animation on unit(s).

Targets:
- Select unit(s) to play the animation on.

Animation ID:
- Select which animation to play on unit(s).

Mirror Animation:
- Mirror the animation?

Wait For Animation?:
- Wait for animation to complete before performing next command?

---

ANIM: Show Animation JS
- Plays the a specific animation on unit(s).
- Uses JavaScript to determine animation ID.

Targets:
- Select unit(s) to play the animation on.

JS: Animation ID:
- Select which animation to play on unit(s).
- Uses JavaScript to determine animation ID.

Mirror Animation:
- Mirror the animation?

Wait For Animation?:
- Wait for animation to complete before performing next command?

---

ANIM: Skill Animation
- Plays the animation associated with a specific skill.

Skill ID:
- Which skill ID will the animation come from?

Targets:
- Select unit(s) to play the animation on.

Mirror Animation:
- Mirror the animation?

Wait For Animation?:
- Wait for animation to complete before performing next command?

---

ANIM: Wait For Animation
- Causes the interpreter to wait for any animation(s) to finish.

---

=== Action Sequences - Battle Log ===

These Action Sequences are related to the Battle Log Window, the window
found at the top of the battle screen.

---

BTLOG: Add Text
- Adds a new line of text into the Battle Log.

Text:
- Add this text into the Battle Log.
- Text codes allowed.

Copy to Combat Log?:
- Copies text to the Combat Log.
- Requires VisuMZ_4_CombatLog

Combat Log Icon:
- What icon would you like to bind to this entry?
- Requires VisuMZ_4_CombatLog

---

BTLOG: Clear Battle Log
- Clears all the text in the Battle Log.

---

BTLOG: Display Action
- plays the current action in the Battle Log.

---

BTLOG: Pop Base Line
- Removes the Battle Log's last added base line and  all text up to its
former location.

---

BTLOG: Push Base Line
- Adds a new base line to where the Battle Log currently is at.

---

BTLOG: Refresh Battle Log
- Refreshes the Battle Log.

---

BTLOG: UI Show/Hide
- Shows or hides the Battle UI (including the Battle Log).

Show/Hide?:
- Shows/hides the Battle UI.

---

BTLOG: Wait For Battle Log
- Causes the interpreter to wait for the Battle Log to finish.

---

BTLOG: Wait For New Line
- Causes the interpreter to wait for a new line in the Battle Log.

---

=== Action Sequences - Camera ===

These Action Sequences are battle camera-related.
Requires VisuMZ_3_ActSeqCamera!

---

CAMERA: Clamp ON/OFF
- Turns battle camera clamping on/off.
- Requires VisuMZ_3_ActSeqCamera!

Setting:
- Turns camera clamping on/off.

---

CAMERA: Focus Point
- Focus the battle camera on a certain point in the screen.
- Requires VisuMZ_3_ActSeqCamera!

X Coordinate:
- Insert the point to focus the camera on.
- You may use JavaScript code.

Y Coordinate:
- Insert the point to focus the camera on.
- You may use JavaScript code.

Duration:
- Duration in frames for camera focus change.

Camera Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Camera?
- Wait for camera changes to complete before performing next command?

---

CAMERA: Focus Target(s)
- Focus the battle camera on certain battler target(s).
- Requires VisuMZ_3_ActSeqCamera!

Targets:
- Select unit(s) to focus the battle camera on.

Duration:
- Duration in frames for camera focus change.

Camera Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Camera?
- Wait for camera changes to complete before performing next command?

---

CAMERA: Offset
- Offset the battle camera from the focus target.
- Requires VisuMZ_3_ActSeqCamera!

Offset X:
- How much to offset the camera X by.
- Negative: left. Positive: right.

Offset Y:
- How much to offset the camera Y by.
- Negative: up. Positive: down.

Duration:
- Duration in frames for offset change.

Camera Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Camera?
- Wait for camera changes to complete before performing next command?

---

CAMERA: Reset
- Reset the battle camera settings.
- Requires VisuMZ_3_ActSeqCamera!

Reset Focus?:
- Reset the focus point?

Reset Offset?:
- Reset the camera offset?

Duration:
- Duration in frames for reset change.

Camera Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Camera?
- Wait for camera changes to complete before performing next command?

---

CAMERA: Wait For Camera
- Waits for camera changes to complete before performing next command.
- Requires VisuMZ_3_ActSeqCamera!

---

=== Action Sequences - Cutins ===

Allows you to have control over Visual Cutin Effects.
Requires VisuMZ_3_VisualCutinEffect!

---

CUTIN: Add Visual Cutin Effect
- Adds the Visual Cutin Effect using these desired settings.
- Only one of each cutin-style type can be present at a time.
- Requires VisuMZ_3_VisualCutinEffect!

Basic Settings:

Cutin Style Type:
- What Visual Cutin Effect style type do you wish to use?
- Only one of each cutin-style type can be present.
- Refer to VisuMZ wiki for visuals on styles.

Portrait Target:
- Select unit(s) to grab the Visual Cutin Effect portrait data from.
- First unit will be used to make portrait.

Parallax Filename:
- Pick a parallax to use for the Visual Cutin Effect.
- Pick (None) to not use a parallax.

Background Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Extra Settings:
- Extra Plugin Command settings pertaining to this Visual Cutin Effect.
- An explanation for these settings are found in the Visual Cutin Effect
help file and documentation.
- Extra parameters are added for Parallax Scroll Inversion when the target
is an enemy.

Wait for Entrance:
- Wait until cutin entrance is finished before performing the next
event command?

---

CUTIN: End Visual Cutin Effect (All)
- Ends all Visual Cutin Effects currently present.
- Requires VisuMZ_3_VisualCutinEffect!

Wait for Exit:
- Wait until cutin exit is finished before performing the next
event command?

---

CUTIN: End Visual Cutin Effect (Type)
- Ends the Visual Cutin Effect with the matching type.
- Requires VisuMZ_3_VisualCutinEffect!

Cutin Style Type:
- What Visual Cutin Effect style type do you wish to end?

Wait for Exit:
- Wait until cutin exit is finished before performing the next
event command?

---

CUTIN: Wait for Cutin Entrance
- Wait until all cutin entrances are finished before performing the next
event command.
- Requires VisuMZ_3_VisualCutinEffect!

---

CUTIN: Wait for Cutin Exit
- Wait until all cutin exits are finished before performing the next
event command.
- Requires VisuMZ_3_VisualCutinEffect!

---

=== Action Sequences - Dragonbones ===

These Action Sequences are Dragonbones-related.
Requires VisuMZ_2_DragonbonesUnion!

---

DB: Dragonbones Animation
- Causes the unit(s) to play a Dragonbones motion animation.
- Requires VisuMZ_2_DragonbonesUnion!

Targets:
- Select which unit(s) to perform a motion animation.

Motion Animation:
- What is the name of the Dragonbones motion animation you wish to play?

---

DB: Dragonbones Time Scale
- Causes the unit(s) to change their Dragonbones time scale.
- Requires VisuMZ_2_DragonbonesUnion!

Targets:
- Select which unit(s) to perform a motion animation.

Time Scale:
- Change the value of the Dragonbones time scale to this.

---

=== Action Sequences - Elements ===

These Action Sequences can change up the element(s) used for the action's
damage calculation midway through an action.

They also require the VisuMZ_1_ElementStatusCore plugin to be present in
order for them to work.

---

ELE: Add Elements
- Adds element(s) to be used when calculating damage.
- Requires VisuMZ_1_ElementStatusCore!

Elements:
- Select which element ID to add onto the action.
- Insert multiple element ID's to add multiple at once.

---

ELE: Clear Element Changes
- Clears all element changes made through Action Sequences.
- Requires VisuMZ_1_ElementStatusCore!

---

ELE: Force Elements
- Forces only specific element(s) when calculating damage.
- Requires VisuMZ_1_ElementStatusCore!

Elements:
- Select which element ID to force in the action.
- Insert multiple element ID's to force multiple at once.

---

ELE: Null Element
- Forces no element to be used when calculating damage.
- Requires VisuMZ_1_ElementStatusCore!

---

=== Action Sequences - Grid ===

These Action Sequences are Battle Grid System-related.
Requires VisuMZ_2_BattleGridSystem!

---

GRID: Action Animation at Node
- Plays action animation at target node.
- Requires VisuMZ_2_BattleGridSystem!

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>
- If the no action is in effect or the action doesn't use that target
structure, use the node coordinates below:

Unit:
- Which unit's Node do you want to play an animation on?

Rank:
- Input the number representing the Rank of the Node you want to play an
animation on.

Flank:
- Input the number representing the Flank of the Node you want to play
an animation on.

Offset X:
- Offsets the animation x position.
- Negative: left. Positive: right.

Offset Y:
- Offsets the animation y position.
- Negative: up. Positive: down.

---

GRID: Add Passive State(s) to Node
- Adds Passive State(s) at target node.
- Requires VisuMZ_2_BattleGridSystem!

State ID(s):
- Select which State ID(s) to add as a Passive State.

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>
- If the no action is in effect or the action doesn't use that target
structure, use the node coordinates below:

Unit:
- Which unit do you want to add the Passive State Node effect for?

Rank:
- Input the number representing the Rank of the Node you want to add a
Passive State(s) to.

Flank:
- Input the number representing the Flank of the Node you want to add a
Passive State(s) to.

---

GRID: Add Trigger to Node
- Adds Trigger to target node.
- Target node cannot have battler.
- Each node can only contain ONE trigger!
- Otherwise, newly placed triggers will overwrite the old ones.
- Requires VisuMZ_2_BattleGridSystem!

Skill ID:
- Select which Skill ID(s) to add as the trigger.

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>
- If the no action is in effect or the action doesn't use that target
structure, use the node coordinates below:

Unit:
- Which unit do you want to add the Trigger Node effect for?

Rank:
- Input the number representing the Rank of the Node you want to add a
Trigger to.

Flank:
- Input the number representing the Flank of the Node you want to add a
Trigger to.

---

GRID: Add Trigger to Node JS
- Adds JS Trigger to target node.
- Target node cannot have battler.
- Each node can only contain ONE trigger!
- Otherwise, newly placed triggers will overwrite the old ones.
- Requires VisuMZ_2_BattleGridSystem!

JS: Skill ID:
- Use JavaScript to determine what skill ID to add to this node.

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>
- If the no action is in effect or the action doesn't use that target
structure, use the node coordinates below:

Unit:
- Which unit do you want to add the Trigger Node effect for?

Rank:
- Input the number representing the Rank of the Node you want to add a
Trigger to.

Flank:
- Input the number representing the Flank of the Node you want to add a
Trigger to.

---

GRID: Animation ID at Node
- Plays specific animation ID at target node.

Animation ID:
- Play this animation at target node.

Mirror?:
- Mirror this animation?

Mute?:
- Mute this animation?

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>
- If the no action is in effect or the action doesn't use that target
structure, use the node coordinates below:

Unit:
- Which unit's Node do you want to play an animation on?

Rank:
- Input the number representing the Rank of the Node you want to play an
animation on.

Flank:
- Input the number representing the Flank of the Node you want to play
an animation on.

Offset X:
- Offsets the animation x position.
- Negative: left. Positive: right.

Offset Y:
- Offsets the animation y position.
- Negative: up. Positive: down.

---

GRID: Animation JS at Node
- Uses JS to calculate which animation to play at target node.

JS: Animation ID:
- Calculate which animation to play on unit(s).
- Uses JavaScript to determine animation ID.

Mirror?:
- Mirror this animation?

Mute?:
- Mute this animation?

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>
- If the no action is in effect or the action doesn't use that target
structure, use the node coordinates below:

Unit:
- Which unit's Node do you want to play an animation on?

Rank:
- Input the number representing the Rank of the Node you want to play an
animation on.

Flank:
- Input the number representing the Flank of the Node you want to play
an animation on.

Offset X:
- Offsets the animation x position.
- Negative: left. Positive: right.

Offset Y:
- Offsets the animation y position.
- Negative: up. Positive: down.

---

GRID: Animation Type at Node
- Plays certain animation type at target node.
- Requires VisuMZ_2_BattleGridSystem!

Type:
- What is the animation type you would like to play?
- Attack
- Guard
- Item
- Skill

Slot (Attack Type):
- Which weapon slot to get this data from?
- Main-hand weapon is weapon slot 1.

Item ID (Item Type):
- Which item ID will the animation come from?

Skill ID (Skill Type):
- Which skill ID will the animation come from?

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>
- If the no action is in effect or the action doesn't use that target
structure, use the node coordinates below:

Unit:
- Which unit's Node do you want to play an animation on?

Rank:
- Input the number representing the Rank of the Node you want to play an
animation on.

Flank:
- Input the number representing the Flank of the Node you want to play
an animation on.

Offset X:
- Offsets the animation x position.
- Negative: left. Positive: right.

Offset Y:
- Offsets the animation y position.
- Negative: up. Positive: down.

---

GRID: Move Target(s) In Direction
- Moves target(s) in a specific direction to other Nodes.
- Requires VisuMZ_2_BattleGridSystem!
- This will bypass the "once per action" condition used for both the
<rule Move User Node direction: x> & <rule Move Target Node direction: x>
notetags as this is not a notetag effect.

Targets:
- Select unit(s) to move.

Movement Type:
- Select the Movement type rulings.
- See VisuMZ_2_BattleGridSystem help file for details.

Direction:
- Select the movement direction.

Distance:
- The number of nodes to be moved.
- You may use JavaScript code.

Duration:
- Input the number representing the frames used to move.

Silent Change?:
- Silent: Discreet changes shown. More apparent later.
- Visual: Instant changes shown.

---

GRID: Pull To Target Node
- Pulls battlers towards target node.
- Requires VisuMZ_2_BattleGridSystem!

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>

Unit:
- Which unit do you want to pull on?

Rank:
- Input the number representing the Rank of the Node you want to
pull to.

Flank:
- Input the number representing the Flank of the Node you want to
pull to.

Strength:
- Input the strength level of the pull.

Duration:
- Input the number representing the frames used to move.

---

GRID: Push From Target Node
- Pushes battlers away from target node.
- Requires VisuMZ_2_BattleGridSystem!

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>

Unit:
- Which unit do you want to push from?

Rank:
- Input the number representing the Rank of the Node you want to
push from.

Flank:
- Input the number representing the Flank of the Node you want to
push from.

Strength:
- Input the strength level of the push.

Duration:
- Input the number representing the frames used to move.

---

GRID: Remove All Passive States from Node
- Removes all Passive State effects at target node.
- Requires VisuMZ_2_BattleGridSystem!

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>
- If the no action is in effect or the action doesn't use that target
structure, use the node coordinates below:

Unit:
- Which unit do you want to clear the Node for?

Rank:
- Input the number representing the Rank of the Node you want to clear
Passive States from.

Flank:
- Input the number representing the Flank of the Node you want to clear
Passive States from.

---

GRID: Remove Passive State(s) from Node
- Remove Passive State(s) at target node.
- Requires VisuMZ_2_BattleGridSystem!

State ID(s):
- Select which State ID(s) to remove as a Passive State.

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>
- If the no action is in effect or the action doesn't use that target
structure, use the node coordinates below:

Unit:
- Which unit do you want to remove the Passive State Node effect for?

Rank:
- Input the number representing the Rank of the Node you want to remove
a Passive State(s) from.

Flank:
- Input the number representing the Flank of the Node you want to remove
a Passive State(s) from.

---

GRID: Remove Trigger from Node
- Removes Trigger at target node.
- Requires VisuMZ_2_BattleGridSystem!

Action-Selected Node?:
- Use Action-Selected Node Coordinates if possible?
- Requires "Empty" or "Any" for <Target: x Grid Node>
- If the no action is in effect or the action doesn't use that target
structure, use the node coordinates below:

Unit:
- Which unit do you want to clear Triggers for?

Rank:
- Input the number representing the Rank of the Node you want to clear
Triggers from.

Flank:
- Input the number representing the Flank of the Node you want to clear
Triggers from.

---

=== Action Sequences - Horror Effects ===

These Action Sequences are Horror Effects-related.
Requires VisuMZ_2_HorrorEffects!

---

HORROR: Clear All Filters
- Clear all Horror Effects filters on the target battler(s).

Targets:
- Select unit(s) to remove Horror Effects for.

---

HORROR: Glitch Create
- Creates the glitch effect on the target battler(s).

Targets:
- Select unit(s) to create the Horror Effect for.

Glitch Slices:
- Glitch slices to be used with the target.

Glitch Offset:
- Default offset value.

Glitch Animated?:
- Animate the glitch effect?

Glitch Frequency:
- If animated, how frequent to make the glitch effect?
- Lower = often     Higher = rarer

Glitch Strength:
- If animated, how strong is the glitch effect?
- Lower = weaker     Higher = stronger

---

HORROR: Glitch Remove
- Removes the glitch effect on the target battler(s).

Targets:
- Select unit(s) to remove the Horror Effect for.

---

HORROR: Noise Create
- Creates the noise effect on the target battler(s).

Targets:
- Select unit(s) to create the Horror Effect for.

Noise Rate:
- Noise rate to be used with the target.

Noise Animated:
- Animate the noise for the target?

---

HORROR: Noise Remove
- Removes the noise effect on the target battler(s).

Targets:
- Select unit(s) to remove the Horror Effect for.

---

HORROR: TV Create
- Creates the TV effect on the target battler(s).

Targets:
- Select unit(s) to create the Horror Effect for.

TV Line Thickness:
- Default TV line thickness
- Lower = thinner     Higher = thicker

TV Corner Size:
- Default TV line corner size
- Lower = smaller     Higher = bigger

TV Animated:
- Animate the TV?

TV Speed:
- Speed used to animate the TV if animated
- Lower = slower     Higher = faster

---

HORROR: TV Remove
- Removes the TV effect on the target battler(s).

Targets:
- Select unit(s) to remove the Horror Effect for.

---

=== Action Sequences - Impact ===

These Action Sequences are related to creating impact.
Requires VisuMZ_3_ActSeqImpact!

---

IMPACT: Bizarro Inversion
- Swaps blue/red colors on the battlefield.
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Bizarro?:
- Enable Bizarro Inversion effect?

---

IMPACT: Color Break
- Breaks the colors on the screen before reassembling.
- Requires VisuMZ_3_ActSeqImpact!

Intensity:
- What is the intensity of the color break effect?

Duration:
- What is the duration of the color break effect?

Easing Type:
- Select which easing type you wish to apply.

---

IMPACT: Desaturation
- Desaturates all colors on the battlefield.
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Desaturate?:
- Enable Desaturation effect?

---

IMPACT: Motion Blur Screen
- Creates a motion blur on the whole screen.
- Requires VisuMZ_3_ActSeqImpact!

Angle:
- Determine what angle to make the motion blur at.

Intensity Rate:
- This determines intensity rate of the motion blur.
- Use a number between 0 and 1.

Duration:
- How many frames should the motion blur last?
- What do you want to be its duration?

Easing Type:
- Select which easing type you wish to apply.

---

IMPACT: Motion Blur Target(s)
- Creates a motion blur on selected target(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to create motion blur effects for.

Angle:
- Determine what angle to make the motion blur at.

Intensity Rate:
- This determines intensity rate of the motion blur.
- Use a number between 0 and 1.

Duration:
- How many frames should the motion blur last?
- What do you want to be its duration?

Easing Type:
- Select which easing type you wish to apply.

---

IMPACT: Motion Trail Create
- Creates a motion trail effect for the target(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to create motion trail effects for.

Delay:
- How many frames to delay by when creating a motion trail?
- The higher the delay, the less motion trails there are.

Duration:
- How many frames should the motion trail last?
- What do you want to be its duration?

Hue:
- What do you want to be the hue for the motion trail?

Starting Opacity:
- What starting opacity value do you want for the motion trail?
- Opacity values decrease over time.

Tone:
- What tone do you want for the motion trail?
- Format: [Red, Green, Blue, Gray]

---

IMPACT: Motion Trail Remove
- Removes the motion trail effect from the target(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to clear motion trail effects for.

---

IMPACT: Negative Inversion
- Inverts all the colors on the battlefield.
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Negative?:
- Enable Negative Inversion effect?

---

IMPACT: Oversaturation
- Oversaturates colors on the battlefield.
- Requires VisuMZ_3_ActSeqImpact!

Oversaturate?:
- Enable Oversaturation effect?

---

IMPACT: Shockwave at Point
- Creates a shockwave at the designated coordinates.
- Requires VisuMZ_3_ActSeqImpact!

Point: X:
Point: Y:
- What x/y coordinate do you want to create a shockwave at?
- You can use JavaScript code.

Amplitude:
- What is the aplitude of the shockwave effect?

Wavelength:
- What is the wavelength of the shockwave effect?

Duration:
- What is the duration of the shockwave?

---

IMPACT: Shockwave from Each Target(s)
- Creates a shockwave at each of the target(s) location(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to start a shockwave from.

Target Location:
- Select which part target group to start a shockwave from.

Offset X:
Offset Y:
- How much to offset the shockwave X/Y point by.

Amplitude:
- What is the aplitude of the shockwave effect?

Wavelength:
- What is the wavelength of the shockwave effect?

Duration:
- What is the duration of the shockwave?

---

IMPACT: Shockwave from Target(s) Center
- Creates a shockwave from the center of the target(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to start a shockwave from.

Target Location:
- Select which part target group to start a shockwave from.

Offset X:
Offset Y:
- How much to offset the shockwave X/Y point by.

Amplitude:
- What is the aplitude of the shockwave effect?

Wavelength:
- What is the wavelength of the shockwave effect?

Duration:
- What is the duration of the shockwave?

---

IMPACT: Time Scale
- Adjust time to go faster or slower!
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Scale:
- Adjusts how fast/slow time goes.
- 1.00 is normal. Lower is slower. Higher is faster.

---

IMPACT: Time Stop
- Stops time for a set amount of milliseconds.
- Requires VisuMZ_3_ActSeqImpact!
- Created by Manu Gaming!

Milliseconds:
- How many milliseconds should time stop for?
- 1000 milliseconds = 1 second.

---

IMPACT: Zoom Blur at Point
- Creates a zoom blur at the designated coordinates.
- Requires VisuMZ_3_ActSeqImpact!

Point: X:
Point: Y:
- What x/y coordinate do you want to focus the zoom at?
- You can use JavaScript code.

Zoom Strength:
- What is the strength of the zoom effect?
- Use a number between 0 and 1.

Visible Radius:
- How much of a radius should be visible from the center?

Duration:
- What is the duration of the zoom blur?

Easing Type:
- Select which easing type you wish to apply.

---

IMPACT: Zoom Blur at Target(s) Center
- Creates a zoom blur at the center of targets.
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to start a zoom blur from.

Target Location:
- Select which part target group to start a zoom blur from.

Offset X:
Offset Y:
- How much to offset the zoom blur X/Y point by.

Zoom Strength:
- What is the strength of the zoom effect?
- Use a number between 0 and 1.

Visible Radius:
- How much of a radius should be visible from the center?

Duration:
- What is the duration of the zoom blur?

Easing Type:
- Select which easing type you wish to apply.

---

=== Action Sequences - Inject ===

These Action Sequences are related to injecting sprite animations.
Requires VisuMZ_3_ActSeqImpact!

---

INJECT: Animation Begin
- Injects and plays a whole spritesheet animation.
- The spritesheet animation will play over the battler until it is finished.
- The battler's original sprite will be invisible until finished.
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to inject the animation on.

Filename:
- Select the animation spritesheet file.
- Located in the /img/sv_actors/ folder.

Horizontal Cells:
- How many horizontal cells (or columns) are there?

Vertical Cells:
- How many vertical cells (or rows) are there?

Frame Delay:
- How many frames are played inbetween cells?

Smooth Bitmap?:
- Smooth the spritesheet graphic?

Offset:

Offset X:
- Offsets the X position of the injected animation.
- Negative: left. Positive: right.

Offset Y:
- Offsets the Y position of the injected animation.
- Negative: up. Positive: down.

---

INJECT: Animation End
- Stops and ends any injected animations on target(s).
- Any inject animation will be prematurely terminated.
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to stop injected animation(s).

---

INJECT: Animation Pause/Resume
- Pauses/resumes any injected animations on target(s).
- Requires VisuMZ_3_ActSeqImpact!

Targets:
- Select unit(s) to pause/resume injected animation(s).

Pause?:
- Pause the injected animation?

---

INJECT: Wait For Injected Animation
- Waits for injected animations to complete before performing next command.
- Requires VisuMZ_3_ActSeqImpact!

---

=== Action Sequences - Mechanics ===

These Action Sequences are related to various mechanics related to the
battle system.

---

MECH: Action Effect
- Causes the unit(s) to take damage/healing from action and incurs any
changes made such as buffs and states.

Targets:
- Select unit(s) to receive the current action's effects.

---

MECH: Active Chain Input Disable
- Disables input for Active Chain Skills at this time.
- Requires VisuMZ_3_ActiveChainSkills!

---

MECH: Add Buff/Debuff
- Adds buff(s)/debuff(s) to unit(s).
- Determine which parameters are affected and their durations.

Targets:
- Select unit(s) to receive the buff(s) and/or debuff(s).

Buff Parameters:
- Select which parameter(s) to buff.
- Insert a parameter multiple times to raise its stacks.

Debuff Parameters:
- Select which parameter(s) to debuff.
- Insert a parameter multiple times to raise its stacks.

Turns:
- Number of turns to set the parameter(s) buffs to.
- You may use JavaScript code.

---

MECH: Add State
- Adds state(s) to unit(s).

Targets:
- Select unit(s) to receive the buff(s).

States:
- Select which state ID(s) to add to unit(s).
- Insert multiple state ID's to add multiple at once.

---

MECH: Analyze Weakness
- Reveal elemental weakness(es) from target(s).
- Requires VisuMZ_3_WeaknessDisplay!

Targets:
- Select unit(s) to reveal elemental weaknesses for.

Reveal:
- How many elemental weaknesses do you wish to reveal?
- You may use JavaScript code.

---

MECH: Armor Penetration
- Adds an extra layer of defensive penetration/reduction.
- You may use JavaScript code for any of these.

Armor/Magic Penetration:

Rate:
- Penetrates an extra multiplier of armor by this value.

Flat:
- Penetrates a flat amount of armor by this value.

Armor/Magic Reduction:

Rate:
- Reduces an extra multiplier of armor by this value.

Flat:
- Reduces a flat amount of armor by this value.

---

MECH: ATB Gauge
- Alters the ATB/TPB Gauges.
- Requires VisuMZ_2_BattleSystemATB!

Targets:
- Select unit(s) to alter the ATB/TPB Gauges for.

Charging:

Charge Rate:
- Changes made to the ATB Gauge if it is currently charging.

Casting:

Cast Rate:
- Changes made to the ATB Gauge if it is currently casting.

Interrupt?:
- Interrupt the ATB Gauge if it is currently casting?

---

MECH: Boost Points Change
- Changes Boost Points for target(s).
- Requires VisuMZ_3_BoostAction!

Targets:
- Select unit(s) to alter the Boost Points for.

Alter Boost Points By:
- Alters the unit(s) Boost Points.
- Positive for gaining points. Negative for losing points.

---

MECH: Boost Store Data
- Stores the number of Boosts used this action inside a variable.
- Requires VisuMZ_3_BoostAction!

Variable ID:
- Which variable do you want to store the data inside?

---

MECH: Break Shield Change
- Changes Break Shields for target(s) if not Break Stunned.
- Requires VisuMZ_4_BreakShields!

Targets:
- Select unit(s) to alter the Break Shields for.

Alter Break Shields By:
- Alters the unit(s) Break Shields.
- Positive for gaining shields. Negative for losing shields.

---

MECH: Break Shield Reset
- Resets Break Shields for target(s) if not Break Stunned.
- Requires VisuMZ_4_BreakShields!

Targets:
- Select unit(s) to reset the Break Shields for.

---

MECH: BTB Brave Points
- Alters the target(s) Brave Points to an exact value.
- Requires VisuMZ_2_BattleSystemBTB!

Targets:
- Select unit(s) to alter the ATB/TPB Gauges for.

Alter Brave Points By:
- Alters the target(s) Brave Points.
- Positive for gaining BP.
- Negative for losing BP.

---

MECH: Collapse
- Causes the unit(s) to perform its collapse animation if the unit(s)
has died.

Targets:
- Select unit(s) to process a death collapse.

Force Death:
- Force death even if the unit has not reached 0 HP?
- This will remove immortality.

Wait For Effect?:
- Wait for the collapse effect to complete before performing next command?

---

MECH: CTB Order
- Alters the CTB Turn Order.
- Requires VisuMZ_2_BattleSystemCTB!

Targets:
- Select unit(s) to alter the CTB Turn Order for.

Change Order By:
- Changes turn order for target(s) by this amount.
- Positive increases wait. Negative decreases wait.

---

MECH: CTB Speed
- Alters the CTB Speed.
- Requires VisuMZ_2_BattleSystemCTB!

Targets:
- Select unit(s) to alter the CTB Speed for.

Charge Rate:
- Changes made to the CTB Speed if it is currently charging.

Cast Rate:
- Changes made to the CTB Speed if it is currently casting.

---

MECH: Custom Damage Formula
- Changes the current action's damage formula to custom.
- This will assume the MANUAL damage style.

Formula:
- Changes the current action's damage formula to custom.
- Use 'default' to revert the damage formula.

---

MECH: Damage Popup
- Causes the unit(s) to display the current state of damage received
or healed.

Targets:
- Select unit(s) to prompt a damage popup.

---

MECH: Dead Label Jump
- If the active battler is dead, jump to a specific label in the
common event.

Jump To Label:
- If the active battler is dead, jump to this specific label in the
common event.

---

MECH: Emulate Attack Effect
- Emulate an "Action Effect" but using a the user's attack skill instead of
the current action.
- Essentially lets you perform the mechanics of another action without
having to use another action or needing to pay that action's costs.

User(s):
- Select unit(s) to perform the action's effects.

Targets:
- Select unit(s) to receive the current action's effects.

---

MECH: Emulate Guard Effect
- Emulate an "Action Effect" but using a the user's guard skill instead of
the current action.
- Essentially lets you perform the mechanics of another action without
having to use another action or needing to pay that action's costs.

User(s):
- Select unit(s) to perform the action's effects.

Targets:
- Select unit(s) to receive the current action's effects.

---

MECH: Emulate Item Effect
- Emulate an "Action Effect" but using a specific item instead of the
current action.
- Essentially lets you perform the mechanics of another action without
having to use another action or needing to pay that action's costs.

Item ID:
- Which item ID will be emulated?

User(s):
- Select unit(s) to perform the action's effects.

Targets:
- Select unit(s) to receive the current action's effects.

---

MECH: Emulate Skill Cost
- Pick a skill for target(s) to emulate paying the cost of.
- Lets you cause characters to perform paying the costs of a specific skill
without needing to actually use them.
- This will include Skill Cooldowns and Limited Skill Uses.

Skill ID:
- Which skill ID will have its cost paid for?
- Use 0 for current action's skill.

User(s):
- Select unit(s) to perform the action's effects.

---

MECH: Emulate Skill Effect
- Emulate an "Action Effect" but using a specific skill instead of the
current action.
- Essentially lets you perform the mechanics of another action without
having to use another action or needing to pay that action's costs.

Skill ID:
- Which skill ID will be emulated?

User(s):
- Select unit(s) to perform the action's effects.

Targets:
- Select unit(s) to receive the current action's effects.

---

MECH: Enemy Escape
- Causes the enemy unit(s) to escape.

Targets:
- Select unit(s) to escape.

---

MECH: ETB Energy Count
- Alters the subject team's available Energy Count.
- Requires VisuMZ_2_BattleSystemETB!

Energy Count:
- Alters the subject team's available Energy Count.
- Positive for gaining energy. Negative for losing energy.

---

MECH: FTB Action Count
- Alters the subject team's available Action Count.
- Requires VisuMZ_2_BattleSystemFTB!

Action Count:
- Alters the subject team's available Action Count.
- Positive for gaining actions. Negative for losing actions.

---

MECH: HP, MP, TP
- Alters the HP, MP, and TP values for unit(s).
- Positive values for healing. Negative values for damage.

Targets:
- Select unit(s) to receive the current action's effects.

HP, MP, TP:

Rate:
- Changes made to the parameter based on rate.
- Positive values for healing. Negative values for damage.

Flat:
- Flat changes made to the parameter.
- Positive values for healing. Negative values for damage.

Damage Popup?:
- Display a damage popup after?

---

MECH: Immortal
- Changes the immortal flag of targets. If immortal flag is removed and a
unit would die, collapse that unit.

Targets:
- Alter the immortal flag of these groups. If immortal flag is removed and
a unit would die, collapse that unit.

Immortal:
- Turn immortal flag for unit(s) on/off?

---

MECH: Multipliers
- Changes the multipliers for the current action.
- You may use JavaScript code for any of these.

Critical Hit%:

Rate:
- Affects chance to land a critical hit by this multiplier.

Flat:
- Affects chance to land a critical hit by this flat bonus.

Critical Damage

Rate:
- Affects critical damage by this multiplier.

Flat:
- Affects critical damage by this flat bonus.

Damage/Healing

Rate:
- Sets the damage/healing multiplier for current action.

Flat:
- Sets the damage/healing bonus for current action.

Hit Rate

Rate:
- Affects chance to connect attack by this multiplier.

Flat:
- Affects chance to connect attack by this flat bonus.

---

MECH: Once Parallel
- Plays a Common Event parallel to the battle event once without repeating
itself when done.

Common Event ID:
- The ID of the parallel Common Event to play.
- Does NOT repeat itself when finished.
- When exiting battle scene, all Once Parallels are cleared.
- Once Parallels are not retained upon reentering the scene.
- Once Parallels are not stored in memory and cannot be saved.

---

MECH: OTB Order
- Alters the OTB Turn Order. Best used with single targets.
- Requires VisuMZ_2_BattleSystemOTB!

Targets:
- Select unit(s) to alter the OTB Turn Order for.

Current Turn By:
- Changes turn order for target(s) by this amount.
- Positive increases wait. Negative decreases wait.

Next Turn By:
- Changes turn order for target(s) by this amount.
- Positive increases wait. Negative decreases wait.

Follow Turn By:
- Changes turn order for target(s) by this amount.
- Positive increases wait. Negative decreases wait.

---

MECH: PTB Alter Cost
- Alters the action's cost settings.
- Requires VisuMZ_2_BattleSystemPTB!

Override?:
- Overrides any 'permanent' settings for Changeability?

Alter Changeability:
- Allow the cost type and value to be changeable?

Alter Cost Type:
- Change the cost type to this scenario.
- Use 'Unchanged' for no changes.

Alter Cost Value:
- What is the default action cost for this scenario?

Priority:
- What is this scenario's priority? Scenario outcomes with equal or lower
priorities cannot override types and costs.

---

MECH: PTB Conversion
- Converts full actions into half actions.
- Requires VisuMZ_2_BattleSystemPTB!

Conversion Count:
- Converts full actions into half actions.
- If not enough, consume half actions.

---

MECH: PTB Full/Half Action(s)
- Alters the subject team's available Full/Half Actions.
- Requires VisuMZ_2_BattleSystemPTB!

Full Actions:
- Alters the subject team's available Full Actions.
- Positive for gaining. Negative for losing.

Half Actions:
- Alters the subject team's available Half Actions.
- Positive for gaining. Negative for losing.

---

MECH: Remove Buff/Debuff
- Removes buff(s)/debuff(s) from unit(s).
- Determine which parameters are removed.

Targets:
- Select unit(s) to have the buff(s) and/or debuff(s) removed.

Buff Parameters:
- Select which buffed parameter(s) to remove.

Debuff Parameters:
- Select which debuffed parameter(s) to remove.

---

MECH: Remove State
- Remove state(s) from unit(s).

Targets:
- Select unit(s) to have states removed from.

States:
- Select which state ID(s) to remove from unit(s).
- Insert multiple state ID's to remove multiple at once.

---

MECH: State Turns Change By
- Changes target(s) state turns by an amount.
- Requires VisuMZ_1_SkillsStatesCore!

Targets:
- Select unit(s) to affect state turns for.

State ID:
- What is the ID of the state you wish to change turns for?
- Only works on states that can have turns.

Change Turns By:
- How many turns should the state be changed to?
- You may use JavaScript code.

Auto-Add State?:
- Automatically adds state if actor(s) does not have it applied?

---

MECH: State Turns Change To
- Changes target(s) state turns to a specific value.
- Requires VisuMZ_1_SkillsStatesCore!

Targets:
- Select unit(s) to affect state turns for.

State ID:
- What is the ID of the state you wish to change turns for?
- Only works on states that can have turns.

Change Turns To:
- How many turns should the state be changed to?
- You may use JavaScript code.

Auto-Add State?:
- Automatically adds state if target(s) does not have it applied?

---

MECH: STB Exploit Effect
- Utilize the STB Exploitation mechanics!
- Requires VisuMZ_2_BattleSystemSTB!

Target(s) Exploited?:
- Exploit the below targets?

Targets:
- Select unit(s) to become exploited.

Force Exploitation:
- Force the exploited status?

User Exploiter?:
- Allow the user to become the exploiter?

Force Exploitation:
- Force the exploiter status?

---

MECH: STB Extra Action
- Adds an extra action for the currently active battler.
- Requires VisuMZ_2_BattleSystemSTB!

Extra Actions:
- How many extra actions should the active battler gain?
- You may use JavaScript code.

---

MECH: STB Remove Excess Actions
- Removes excess actions from the active battler.
- Requires VisuMZ_2_BattleSystemSTB!

Remove Actions:
- How many actions to remove from the active battler?
- You may use JavaScript code.

---

MECH: Swap Weapon
- Causes the unit(s) to swap their weapon for another.
- Requires VisuMZ_2_WeaponSwapSystem!

Targets:
- Select unit(s) to swap weapons for.

Weapon Type ID:
- Which weapon type to swap to?
- This is NOT the weapon's ID.
- It's the weapon TYPE.

---

MECH: Text Popup
- Causes the unit(s) to display a text popup.

Targets:
- Select unit(s) to prompt a text popup.

Text:
- What text do you wish to display?

Text Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Flash Color:
- Adjust the popup's flash color.
- Format: [red, green, blue, alpha]

Flash Duration:
- What is the frame duration of the flash effect?

---

MECH: Variable Popup
- Causes the unit(s) to display a popup using the data stored inside
a variable.

Targets:
- Select unit(s) to prompt a text popup.

Variable:
- Get data from which variable to display as a popup?

Digit Grouping:
- Use digit grouping to separate numbers?
- Requires VisuMZ_0_CoreEngine!

Text Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Flash Color:
- Adjust the popup's flash color.
- Format: [red, green, blue, alpha]

Flash Duration:
- What is the frame duration of the flash effect?

---

MECH: Wait For Effect
- Waits for the effects to complete before performing next command.

---

=== Action Sequences - Motion ===

These Action Sequences allow you the ability to control the motions of
sideview sprites.

---

MOTION: Clear Freeze Frame
- Clears any freeze frames from the unit(s).
- Only applies to sprite sheets.
- Does NOT work with Dragonbones.
- Use "DB: Dragonbones Time Scale" instead.

Targets:
- Select which unit(s) to clear freeze frames for.

---

MOTION: Freeze Motion Frame
- Forces a freeze frame instantly at the selected motion.
- Automatically clears with a new motion.
- Only applies to sprite sheets.
- Does NOT work with Dragonbones.
- Use "DB: Dragonbones Time Scale" instead.

Targets:
- Select which unit(s) to freeze motions for.

Motion Type:
- Freeze this motion for the unit(s).

Frame Index:
- Which frame do you want to freeze the motion on?
- Frame index values start at 0.

Show Weapon?:
- If using 'attack', 'thrust', 'swing', or 'missile', display the
weapon sprite?

---

MOTION: Motion Type
- Causes the unit(s) to play the selected motion.

Targets:
- Select which unit(s) to perform a motion.

Motion Type:
- Play this motion for the unit(s).

Show Weapon?:
- If using 'attack', 'thrust', 'swing', or 'missile', display the
weapon sprite?

---

MOTION: Perform Action
- Causes the unit(s) to play the proper motion based on the current action.

Targets:
- Select which unit(s) to perform a motion.

---

MOTION: Refresh Motion
- Cancels any set motions unit(s) has to do and use their most natural
motion at the moment.

Targets:
- Select which unit(s) to refresh their motion state.

---

MOTION: Wait By Motion Frame
- Creates a wait equal to the number of motion frames passing.
- Time is based on Plugin Parameters => Actors => Motion Speed.

Motion Frames to Wait?:
- Each "frame" is equal to the value found in
Plugin Parameters => Actors => Motion Speed

---

=== Action Sequences - Movement ===

These Action Sequences allow you the ability to control the sprites of
actors and enemies in battle.

---

MOVE: Battle Step
- Causes the unit(s) to move forward past their home position to prepare
for action.

Targets:
- Select which unit(s) to move.

Wait For Movement?:
- Wait for movement to complete before performing next command?

---

MOVE: Change Home By Distance
- Change unit(s)'s home position by a distance from their current home
position(s).
- Sideview-only!

Targets:
- Select which unit(s) to change home position(s) for.

Distance Adjustment:
- Makes adjustments to distance values to determine which direction to
change by.
- Normal - No adjustments made
- Horizontal - Actors adjust left, Enemies adjust right
- Vertical - Actors adjust Up, Enemies adjust down
- Both - Applies both Horizontal and Vertical

Distance: X:
- Horizontal distance to move.
- You may use JavaScript code.

Distance: Y:
- Vertical distance to move.
- You may use JavaScript code.

Duration:
- Duration in frames for total change amount.

Face Destination?:
- Turn and face the destination?

Movement Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Movement Motion:
- Play this motion for the unit(s).

Wait For Movement?:
- Wait for movement to complete before performing next command?

---

MOVE: Change Home To JS Coordinates
- Change home position(s) to specified JS Coordinates.
- Sideview-only! Uses JavaScript!

Targets:
- Select which unit(s) to change home position(s) for.

JS: Coordinates:
- Code used to determine the coordinates for the target(s)'s new home
position.

Offset Adjustment:
- Makes adjustments to offset values to determine which direction to
adjust the destination by.

Offset: X:
- Horizontal offset to move.
- You may use JavaScript code.

Offset: Y:
- Vertical offset to move.
- You may use JavaScript code.

Duration:
- Duration in frames for total change amount.

Face Destination?:
- Turn and face the destination?

Movement Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Movement Motion:
- Play this motion for the unit(s).

Wait For Movement?:
- Wait for movement to complete before performing next command?

---

MOVE: Change Home To Point
- Change home position(s) to a target point on the screen.
- Sideview-only! Points based off Graphics.boxWidth/Height.

Targets:
- Select which unit(s) to change home position(s) for.

Destination Point:
- Select which point to face.
- Center
- Point X, Y
- Replace 'x' and 'y' with coordinates

Offset Adjustment:
- Makes adjustments to offset values to determine which direction to
adjust the destination by.

Offset: X:
- Horizontal offset to move.
- You may use JavaScript code.

Offset: Y:
- Vertical offset to move.
- You may use JavaScript code.

Duration:
- Duration in frames for total change amount.

Face Destination?:
- Turn and face the destination?

Movement Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Movement Motion:
- Play this motion for the unit(s).

Wait For Movement?:
- Wait for movement to complete before performing next command?

---

MOVE: Change Home To Target(s)
- Moves unit(s) to another unit(s) on the battle field.
- Sideview-only!

Targets (Moving):
- Select which unit(s) to change home position(s) for.

Targets (Destination):
- Select which unit(s) to change home position to.

Target Location:
- Select which part target group to change home position to.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Melee Distance:
- The melee distance away from the target location in addition to the
battler's width.

Offset Adjustment:
- Makes adjustments to offset values to determine which direction to
adjust the destination by.

Offset: X:
- Horizontal offset to move.
- You may use JavaScript code.

Offset: Y:
- Vertical offset to move.
- You may use JavaScript code.

Duration:
- Duration in frames for total change amount.

Face Destination?:
- Turn and face the destination?

Movement Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Movement Motion:
- Play this motion for the unit(s).

Wait For Movement?:
- Wait for movement to complete before performing next command?

---

MOVE: Face Direction
- Causes the unit(s) to face forward or backward.
- Sideview-only!

Targets:
- Select which unit(s) to change direction.

Direction:
- Select which direction to face.

---

MOVE: Face JS Coordinates
- Causes the unit(s) to face specified JS Coordinates.
- Sideview-only! Uses JavaScript!

Targets:
- Select which unit(s) to change direction.

JS: Coordinates:
- Code used to determine the coordinates for the target(s) to face
towards.

Face Away From?:
- Face away from the point instead?

---

MOVE: Face Point
- Causes the unit(s) to face a point on the screen.
- Sideview-only!

Targets:
- Select which unit(s) to change direction.

Point:
- Select which point to face.
- Home
- Center
- Point X, Y
- Replace 'x' and 'y' with coordinates

Face Away From?:
- Face away from the point instead?

---

MOVE: Face Target(s)
- Causes the unit(s) to face other targets on the screen.
- Sideview-only!

Targets (facing):
- Select which unit(s) to change direction.

Targets (destination):
- Select which unit(s) for the turning unit(s) to face.

Face Away From?:
- Face away from the unit(s) instead?

---

MOVE: Float
- Causes the unit(s) to float above the ground.
- Sideview-only!

Targets:
- Select which unit(s) to make float.

Desired Height:
- Vertical distance to float upward.
- You may use JavaScript code.

Duration:
- Duration in frames for total float amount.

Float Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Float?:
- Wait for floating to complete before performing next command?

---

MOVE: Home Reset
- Causes the unit(s) to move back to their home position(s) and face back to
their original direction(s).

Targets:
- Select which unit(s) to move.

Wait For Movement?:
- Wait for movement to complete before performing next command?

---

MOVE: Jump
- Causes the unit(s) to jump into the air.
- Sideview-only!

Targets:
- Select which unit(s) to make jump.

Desired Height:
- Max jump height to go above the ground
- You may use JavaScript code.

Duration:
- Duration in frames for total jump amount.

Wait For Jump?:
- Wait for jumping to complete before performing next command?

---

MOVE: Move Distance
- Moves unit(s) by a distance from their current position(s).
- Sideview-only!

Targets:
- Select which unit(s) to move.

Distance Adjustment:
- Makes adjustments to distance values to determine which direction to
move unit(s).
- Normal - No adjustments made
- Horizontal - Actors adjust left, Enemies adjust right
- Vertical - Actors adjust Up, Enemies adjust down
- Both - Applies both Horizontal and Vertical

Distance: X:
- Horizontal distance to move.
- You may use JavaScript code.

Distance: Y:
- Vertical distance to move.
- You may use JavaScript code.

Duration:
- Duration in frames for total movement amount.

Face Destination?:
- Turn and face the destination?

Movement Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Movement Motion:
- Play this motion for the unit(s).

Wait For Movement?:
- Wait for movement to complete before performing next command?

---

MOVE: Move To JS Coordinates
- Moves unit(s) to specified JS Coordinates.
- Sideview-only! Uses JavaScript!

Targets:
- Select which unit(s) to move.

JS: Coordinates:
- Code used to determine the coordinates for the target(s) to move to.

Offset Adjustment:
- Makes adjustments to offset values to determine which direction to
adjust the destination by.

Offset: X:
- Horizontal offset to move.
- You may use JavaScript code.

Offset: Y:
- Vertical offset to move.
- You may use JavaScript code.

Duration:
- Duration in frames for total movement amount.

Face Destination?:
- Turn and face the destination?

Movement Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Movement Motion:
- Play this motion for the unit(s).

Wait For Movement?:
- Wait for movement to complete before performing next command?

---

MOVE: Move To Point
- Moves unit(s) to a designated point on the screen.
- Sideview-only! Points based off Graphics.boxWidth/Height.

Targets:
- Select which unit(s) to move.

Destination Point:
- Select which point to face.
- Home
- Center
- Point X, Y
- Replace 'x' and 'y' with coordinates

Offset Adjustment:
- Makes adjustments to offset values to determine which direction to
adjust the destination by.

Offset: X:
- Horizontal offset to move.
- You may use JavaScript code.

Offset: Y:
- Vertical offset to move.
- You may use JavaScript code.

Duration:
- Duration in frames for total movement amount.

Face Destination?:
- Turn and face the destination?

Movement Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Movement Motion:
- Play this motion for the unit(s).

Wait For Movement?:
- Wait for movement to complete before performing next command?

---

MOVE: Move To Target(s)
- Moves unit(s) to another unit(s) on the battle field.
- Sideview-only!

Targets (Moving):
- Select which unit(s) to move.

Targets (Destination):
- Select which unit(s) to move to.

Target Location:
- Select which part target group to move to.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Melee Distance:
- The melee distance away from the target location in addition to the
battler's width.

Offset Adjustment:
- Makes adjustments to offset values to determine which direction to
adjust the destination by.

Offset: X:
- Horizontal offset to move.
- You may use JavaScript code.

Offset: Y:
- Vertical offset to move.
- You may use JavaScript code.

Duration:
- Duration in frames for total movement amount.

Face Destination?:
- Turn and face the destination?

Movement Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Movement Motion:
- Play this motion for the unit(s).

Wait For Movement?:
- Wait for movement to complete before performing next command?

---

MOVE: Opacity
- Causes the unit(s) to change opacity.
- Sideview-only!

Targets:
- Select which unit(s) to change opacity.

Desired Opacity:
- Change to this opacity value.
- You may use JavaScript code.

Duration:
- Duration in frames for opacity change.

Opacity Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Opacity?:
- Wait for opacity changes to complete before performing next command?

---

MOVE: Scale/Grow/Shrink
- Causes the unit(s) to scale, grow, or shrink?.
- Sideview-only!

Targets:
- Select which unit(s) to change the scale of.

Scale X:
Scale Y:
- What target scale value do you want?
- 1.0 is normal size.

Duration:
- Duration in frames to scale for.

Scale Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Scale?:
- Wait for scaling to complete before performing next command?

---

MOVE: Skew/Distort
- Causes the unit(s) to skew.
- Sideview-only!

Targets:
- Select which unit(s) to skew.

Skew X:
Skew Y:
- What variance to skew?
- Use small values for the best results.

Duration:
- Duration in frames to skew for.

Skew Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Skew?:
- Wait for skew to complete before performing next command?

---

MOVE: Spin/Rotate
- Causes the unit(s) to spin.
- Sideview-only!

Targets:
- Select which unit(s) to spin.

Angle:
- How many degrees to spin?

Duration:
- Duration in frames to spin for.

Spin Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Revert Angle on Finish:
- Upon finishing the spin, revert the angle back to 0.

Wait For Spin?:
- Wait for spin to complete before performing next command?

---

MOVE: Wait For Float
- Waits for floating to complete before performing next command.

---

MOVE: Wait For Jump
- Waits for jumping to complete before performing next command.

---

MOVE: Wait For Movement
- Waits for movement to complete before performing next command.

---

MOVE: Wait For Opacity
- Waits for opacity changes to complete before performing next command.

---

MOVE: Wait For Scale
- Waits for scaling to complete before performing next command.

---

MOVE: Wait For Skew
- Waits for skewing to complete before performing next command.

---

MOVE: Wait For Spin
- Waits for spinning to complete before performing next command.

---

=== Action Sequences - Projectiles ===

Create projectiles on the screen and fire them off at a target.
Requires VisuMZ_3_ActSeqProjectiles!

---

PROJECTILE: Animation
- Create an animation projectile and fire it at a target.
- Requires VisuMZ_3_ActSeqProjectiles!

Coordinates:

Start Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should start from.
- Target - Start from battler target(s)
- Point - Start from a point on the screen

Target(s):
- Select which unit(s) to start the projectile from.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile from.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to start the projectile at.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Goal Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should go to.
- Target - Goal is battler target(s)
- Point - Goal is a point on the screen

Target(s):
- Select which unit(s) for projectile to go to.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile to.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to send the projectile to.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Settings:

Animation ID:
- Determine which animation to use as a projectile.

Duration:
- Duration for the projectile(s) to travel.

Wait For Projectile?:
- Wait for projectile(s) to reach their destination before going onto
the next command?

Wait For Animation?:
- Wait for animation to finish before going to the next command?

Extra Settings:
- Add extra settings to the projectile?

Auto Angle?:
- Automatically angle the projectile to tilt the direction
it's moving?

Angle Offset:
- Alter the projectile's tilt by this many degrees.

Arc Peak:
- This is the height of the projectile's trajectory arc in pixels.

Easing:
- Select which easing type to apply to the projectile's trajectory.

Spin Speed:
- Determine how much angle the projectile spins per frame.
- Does not work well with "Auto Angle".

Effect Emulation:

Action Effect?:
- Emulate current Action Effect when projectile reaches target?
- Only works with start and goal targets.

Item Effect ID?:
- Emulate an Item Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Skill Effect ID?:
- Emulate a Skill Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Common Event ID:
- Plays a Once Parallel Common Event upon reaching target.
- Use 0 to not use.
- Works regardless of start/goal targets.

---

PROJECTILE: Icon
- Create an icon projectile and fire it at a target.
- Requires VisuMZ_3_ActSeqProjectiles!

Coordinates:

Start Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should start from.
- Target - Start from battler target(s)
- Point - Start from a point on the screen

Target(s):
- Select which unit(s) to start the projectile from.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile from.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to start the projectile at.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Goal Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should go to.
- Target - Goal is battler target(s)
- Point - Goal is a point on the screen

Target(s):
- Select which unit(s) for projectile to go to.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile to.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to send the projectile to.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Settings:

Icon:
- Determine which icon to use as a projectile.
- You may use JavaScript code.

Duration:
- Duration for the projectile(s) to travel.

Wait For Projectile?:
- Wait for projectile(s) to reach their destination before going onto
the next command?

Extra Settings:
- Add extra settings to the projectile?

Auto Angle?:
- Automatically angle the projectile to tilt the direction
it's moving?

Angle Offset:
- Alter the projectile's tilt by this many degrees.

Arc Peak:
- This is the height of the projectile's trajectory arc in pixels.

Blend Mode:
- What kind of blend mode do you wish to apply to the projectile?
- Normal
- Additive
- Multiply
- Screen

Easing:
- Select which easing type to apply to the projectile's trajectory.

Hue:
- Adjust the hue of the projectile.
- Insert a number between 0 and 360.

Scale:
- Adjust the size scaling of the projectile.
- Use decimals for exact control.

Spin Speed:
- Determine how much angle the projectile spins per frame.
- Does not work well with "Auto Angle".

Effect Emulation:

Action Effect?:
- Emulate current Action Effect when projectile reaches target?
- Only works with start and goal targets.

Item Effect ID?:
- Emulate an Item Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Skill Effect ID?:
- Emulate a Skill Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Common Event ID:
- Plays a Once Parallel Common Event upon reaching target.
- Use 0 to not use.
- Works regardless of start/goal targets.

---

PROJECTILE: Picture
- Create a picture projectile and fire it at a target.
- Requires VisuMZ_3_ActSeqProjectiles!

Coordinates:

Start Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should start from.
- Target - Start from battler target(s)
- Point - Start from a point on the screen

Target(s):
- Select which unit(s) to start the projectile from.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile from.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to start the projectile at.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Goal Location:
- Settings to determine where the projectile(s) start from.

Type:
- Select where the projectile should go to.
- Target - Goal is battler target(s)
- Point - Goal is a point on the screen

Target(s):
- Select which unit(s) for projectile to go to.

Centralize:
- Create one projectile at the center of the targets?
- Or create a projectile for each target?

Target Location:
- Select which part of the target to send the projectile to.
- front head
- front center
- front base
- middle head
- middle center
- middle base
- back head
- back center
- back base

Point X:
Point Y:
- Insert the X/Y coordinate to send the projectile to.
- You may use JavaScript code.

Offset X:
Offset Y:
- Insert how many pixels to offset the X/Y coordinate by.
- You may use JavaScript code.

Settings:

Picture Filename:
- Determine which picture to use as a projectile.

Duration:
- Duration for the projectile(s) to travel.

Wait For Projectile?:
- Wait for projectile(s) to reach their destination before going onto
the next command?

Extra Settings:
- Add extra settings to the projectile?

Auto Angle?:
- Automatically angle the projectile to tilt the direction
it's moving?

Angle Offset:
- Alter the projectile's tilt by this many degrees.

Arc Peak:
- This is the height of the projectile's trajectory arc in pixels.

Blend Mode:
- What kind of blend mode do you wish to apply to the projectile?
- Normal
- Additive
- Multiply
- Screen

Easing:
- Select which easing type to apply to the projectile's trajectory.

Hue:
- Adjust the hue of the projectile.
- Insert a number between 0 and 360.

Scale:
- Adjust the size scaling of the projectile.
- Use decimals for exact control.

Spin Speed:
- Determine how much angle the projectile spins per frame.
- Does not work well with "Auto Angle".

Effect Emulation:

Action Effect?:
- Emulate current Action Effect when projectile reaches target?
- Only works with start and goal targets.

Item Effect ID?:
- Emulate an Item Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Skill Effect ID?:
- Emulate a Skill Effect when projectile reaches target?
- Use 0 to not use.
- Only works with start and goal targets.

Common Event ID:
- Plays a Once Parallel Common Event upon reaching target.
- Use 0 to not use.
- Works regardless of start/goal targets.

---

=== Action Sequences - Skew ===

These action sequences allow you to have control over the camera skew.
Requires VisuMZ_3_ActSeqCamera!

---

SKEW: Change Skew
- Changes the camera skew.
- Requires VisuMZ_3_ActSeqCamera!

Skew X:
- Change the camera skew X to this value.

Skew Y:
- Change the camera skew Y to this value.

Duration:
- Duration in frames to change camera skew.

Skew Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Skew?:
- Wait for skew changes to complete before performing next command?

---

SKEW: Reset Skew
- Reset any skew settings.
- Requires VisuMZ_3_ActSeqCamera!

Duration:
- Duration in frames to reset camera skew.

Skew Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Skew?:
- Wait for skew changes to complete before performing next command?

---

SKEW: Wait For Skew
- Waits for skew changes to complete before performing next command.
- Requires VisuMZ_3_ActSeqCamera!

---

=== Action Sequences - Target ===

If using a manual target by target Action Sequence, these commands will give
you full control over its usage.

---

TARGET: Current Index
- Sets the current index to this value.
- Then decide to jump to a label (optional).

Set Index To:
- Sets current targeting index to this value.
- 0 is the starting index of a target group.

Jump To Label:
- If a target is found after the index change, jump to this label in the
Common Event.

---

TARGET: Next Target
- Moves index forward by 1 to select a new current target.
- Then decide to jump to a label (optional).

Jump To Label:
- If a target is found after the index change, jump to this label in the
Common Event.

---

TARGET: Previous Target
- Moves index backward by 1 to select a new current target.
- Then decide to jump to a label (optional).

Jump To Label:
- If a target is found after the index change, jump to this label in the
Common Event.

---

TARGET: Random Target
- Sets index randomly to determine new currernt target.
- Then decide to jump to a label (optional).

Force Random?:
- Index cannot be its previous index amount after random.

Jump To Label:
- If a target is found after the index change, jump to this label in the
Common Event.

---

=== Action Sequences - Voice ==

---

VOICE: Common Line
- Plays a common voice line from target battler(s).
- Requires VisuMZ_3_BattleVoices!

Speaker Target(s):
- Select unit(s) to play voice lines from.

Voice Line:
- What voice line do you wish to play?

---

VOICE: Play Special Line
- Plays a special voice line from target battler(s).
- Requires VisuMZ_3_BattleVoices!

Speaker Target(s):
- Select unit(s) to play voice lines from.

Voice Line Type:
- What voice line type do you wish to play?
- Action Name
- Chant Line
- Item Name
- Skill Name
- Spell Name
- Unique Lines

Name / Letter:
- What voice letter/name do you want to play?

---

=== Action Sequences - Weapon ===

Allows for finer control over Dual/Multi Wielding actors.
Only works for Actors.

---

WEAPON: Clear Weapon Slot
- Clears the active weapon slot (making others valid again).
- Only works for Actors.

Targets:
- Select unit(s) to clear the active weapon slot for.

---

WEAPON: Next Weapon Slot
- Goes to next active weapon slot (making others invalid).
- If next slot is weaponless, don't label jump.

Targets:
- Select unit(s) to change the next active weapon slot for.

---

WEAPON: Set Weapon Slot
- Sets the active weapon slot (making others invalid).
- Only works for Actors.

Targets:
- Select unit(s) to change the active weapon slot for.

Weapon Slot ID:
- Select weapon slot to make active (making others invalid).
- Use 0 to clear and normalize. You may use JavaScript code.

---

=== Action Sequences - Zoom ===

These Action Sequences are zoom-related.
Requires VisuMZ_3_ActSeqCamera!

---

ZOOM: Change Scale
- Changes the zoom scale.
- Requires VisuMZ_3_ActSeqCamera!

Scale:
- The zoom scale to change to.

Duration:
- Duration in frames to reset battle zoom.

Zoom Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Zoom?
- Wait for zoom changes to complete before performing next command?

---

ZOOM: Reset Zoom
- Reset any zoom settings.
- Requires VisuMZ_3_ActSeqCamera!

Duration:
- Duration in frames to reset battle zoom.

Zoom Easing:
- Select which easing type you wish to apply.
- Requires VisuMZ_0_CoreEngine.

Wait For Zoom?
- Wait for zoom changes to complete before performing next command?

---

ZOOM: Wait For Zoom
- Waits for zoom changes to complete before performing next command.
Requires VisuMZ_3_ActSeqCamera!

---

Plugin Parameters: Auto Battle Settings

These Plugin Parameter settings allow you to change the aspects added by
this plugin that support Auto Battle and the Auto Battle commands.

Auto Battle commands can be added to the Party Command Window and/or Actor
Command Window. The one used by the Party Command Window will cause the
whole party to enter an Auto Battle state until stopped by a button input.
The command used by the Actor Command Window, however, will cause the actor
to select an action based off the Auto Battle A.I. once for the current turn
instead.

---

Battle Display

Message:
- Message that's displayed when Auto Battle is on.
Text codes allowed. %1 - OK button, %2 - Cancel button

OK Button:
- Text used to represent the OK button.
- If VisuMZ_0_CoreEngine is present, ignore this.

Cancel Button:
- Text used to represent the Cancel button.
- If VisuMZ_0_CoreEngine is present, ignore this.

Background Type:
- Select background type for Auto Battle window.
- 0 - Window
- 1 - Dim
- 2 - Transparent

JS: X, Y, W, H:
- Code used to determine the dimensions for this window.

---

Options

Add Option?:
- Add the Auto Battle options to the Options menu?

Adjust Window Height:
- Automatically adjust the options window height?

Startup Name:
- Command name of the option.

Style Name:
- Command name of the option.

OFF:
- Text displayed when Auto Battle Style is OFF.

ON:
- Text displayed when Auto Battle Style is ON.

---

Plugin Parameters: Damage Settings

These Plugin Parameters add a variety of things to how damage is handled in
battle. These range from hard damage caps to soft damage caps to how damage
popups appear, how the formulas for various aspects are handled and more.

Damage Styles are also a feature added through this plugin. More information
can be found in the help section above labeled 'Damage Styles'.

---

Damage Styles

Default Style:
- Which Damage Style do you want to set as default?
- Use 'Manual' to not use any styles at all.
- The 'Manual' style will not support <Armor Penetration> notetags.
- The 'Manual' style will not support <Armor Reduction> notetags.

Style List:
- A list of the damage styles available.
- These are used to calculate base damage.

Name:
- Name of this Damage Style.
-Used for notetags and such.

JS: Formula:
- The base formula for this Damage Style.

Items & Equips Core:

HP Damage:
MP Damage:
HP Recovery:
MP Recovery:
HP Drain:
MP Drain:
- Vocabulary used for this data entry.

JS: Damage Display:
- Code used the data displayed for this category.

---

Damage Cap

Enable Damage Cap?:
- Put a maximum hard damage cap on how far damage can go?
- This can be broken through the usage of notetags.

Default Hard Cap:
- The default hard damage cap used before applying damage.

Enable Soft Cap?:
- Soft caps ease in the damage values leading up to the  hard damage cap.
- Requires hard Damage Cap enabled.

Base Soft Cap Rate:
- The default soft damage cap used before applying damage.

Soft Scale Constant:
- The default soft damage cap used before applying damage.

---

Popups

Popup Duration:
- Adjusts how many frames a popup stays visible.

Newest Popups Bottom:
- Puts the newest popups at the bottom.

End Battle Show?:
- Show or hide popups upon victory or escape?
- Used to hide battle-state removal popups.

Offset X:
Offset Y:
- Sets how much to offset the sprites by horizontally/vertically.

Shift X:
Shift Y:
- Sets how much to shift the sprites by horizontally/vertically.

Shift Y:

Critical Flash Color:
- Adjust the popup's flash color.
- Format: [red, green, blue, alpha]

Critical Duration:
- Adjusts how many frames a the flash lasts.

---

Formulas

JS: Overall Formula:
- The overall formula used when calculating damage.

JS: Variance Formula:
- The formula used when damage variance.

JS: Guard Formula:
- The formula used when damage is guarded.

---

Critical Hits

JS: Rate Formula:
- The formula used to calculate Critical Hit Rates.

JS: Damage Formula:
- The formula used to calculate Critical Hit Damage modification.

---

Plugin Parameters: Mechanics Settings

Some of the base settings for the various mechanics found in the battle
system can be altered here in these Plugin Parameters. Most of these will
involve JavaScript code and require you to have to good understanding of
how the RPG Maker MZ code works before tampering with it.

---

Action Speed

Allow Random Speed?:
- Allow speed to be randomized base off the user's AGI?

Turn End Buffs Expire?:
- Normally, buffs expire after all actions end.
- But here, you can have buffs expire on turn end.

JS: Calculate:
- Code used to calculate action speed.

---

Base Troop

Base Troop ID's:
- Select the Troop ID(s) to duplicate page events from for all
other troops.
- More information can be found in the dedicated Help section above.

---

Common Events (on Map)

Pre-Battle Event:
Post-Battle Event:
Victory Event:
Defeat Event:
Escape Success Event:
Escape Fail Event:
- Queued Common Event to run upon meeting the condition.
- Use to 0 to not run any Common Event at all.
- "Post-Battle Event" will always run regardless.
- If any events are running before the battle, they will continue running
to the end first before the queued Common Events will run.
- These common events only run on the map scene. They're not meant to run
in the battle scene.
- If the "Defeat Event" has a common event attached to it, then random
encounters will be changed to allow defeat without being sent to the
Game Over scene. Instead, the game will send the player to the map scene
where the Defeat Event will run.

---

Escape

JS: Calc Escape Ratio:
- Code used to calculate the escape success ratio.

JS: Calc Escape Raise:
- Code used to calculate how much the escape success ratio raises upon
each failure.

---

Switches

Switch: Critical:
- Turns switch ON if the action performs a critical hit.
- Switch reverts to OFF whenever an action starts.
- If multiple targets/hits are struck, as long as one hit lands a critical
hit, then the switch will remain ON for the rest of the action.

Switch: Miss/Evade:
- Turns switch ON if the action misses/is evaded.
- Switch reverts to OFF whenever an action starts.
- If multiple targets/hits are struck, as long as one hit fails to land,
then the switch will remain ON for the rest of the action.

---

Variables

Variable: Damage:
- Variable records target damage during action.
- Variable reverts to 0 whenever an action starts.
- If multiple targets/hits are struck, the variable will record the total
amount of damage done for the remainder of the action (unless manually
reseting to 0 during an Action Sequence).

Variable: Healing:
- Variable records target healing during action.
- Variable reverts to 0 whenever an action starts.
- If multiple targets/hits are struck, the variable will record the total
amount of healing done for the remainder of the action (unless manually
reseting to 0 during an Action Sequence).

---

JS: Battle-Related

JS: Pre-Start Battle:
- Target function: BattleManager.startBattle()
- JavaScript code occurs before function is run.

JS: Post-Start Battle:
- Target function: BattleManager.startBattle()
- JavaScript code occurs after function is run.

JS: Battle Victory:
- Target function: BattleManager.processVictory()
- JavaScript code occurs before function is run.

JS: Escape Success:
- Target function: BattleManager.onEscapeSuccess()
- JavaScript code occurs before function is run.

JS: Escape Failure:
- Target function: BattleManager.onEscapeFailure()
- JavaScript code occurs before function is run.

JS: Battle Defeat:
- Target function: BattleManager.processDefeat()
- JavaScript code occurs before function is run.

JS: Pre-End Battle:
- Target function: BattleManager.endBattle()
- JavaScript code occurs before function is run.

JS: Post-End Battle:
- Target function: BattleManager.endBattle()
- JavaScript code occurs after function is run.

---

JS: Turn-Related

JS: Pre-Start Turn:
- Target function: BattleManager.startTurn()
- JavaScript code occurs before function is run.

JS: Post-Start Turn:
- Target function: BattleManager.startTurn()
- JavaScript code occurs after function is run.

JS: Pre-End Turn:
- Target function: Game_Battler.prototype.onTurnEnd()
- JavaScript code occurs before function is run.

JS: Post-End Turn:
- Target function: Game_Battler.prototype.onTurnEnd()
- JavaScript code occurs after function is run.

JS: Pre-Regenerate:
- Target function: Game_Battler.prototype.regenerateAll()
- JavaScript code occurs before function is run.

JS: Post-Regenerate:
- Target function: Game_Battler.prototype.regenerateAll()
- JavaScript code occurs after function is run.

---

JS: Action-Related

JS: Pre-Start Action:
- Target function: BattleManager.startAction()
- JavaScript code occurs before function is run.

JS: Post-Start Action:
- Target function: BattleManager.startAction()
- JavaScript code occurs after function is run.

JS: Pre-Apply:
- Target function: Game_Action.prototype.apply()
- JavaScript code occurs before function is run.

JS: Pre-Damage:
- Target function: Game_Action.prototype.executeDamage()
- JavaScript code occurs before function is run.

JS: Post-Damage:
- Target function: Game_Action.prototype.executeDamage()
- JavaScript code occurs after function is run.

JS: Post-Apply:
- Target function: Game_Action.prototype.apply()
- JavaScript code occurs after function is run.

JS: Pre-End Action:
- Target function: BattleManager.endAction()
- JavaScript code occurs before function is run.

JS: Post-End Action:
- DescriTarget function: BattleManager.endAction()
- JavaScript code occurs after function is run.

---

Plugin Parameters: Battle Layout Settings

The Battle Layout Settings Plugin Parameter gives you control over the look,
style, and appearance of certain UI elements. These range from the way the
Battle Status Window presents its information to the way certain windows
like the Party Command Window and Actor Command Window appear.

---

Battle Layout Style
- The style used for the battle layout.

Default:
- Shows actor faces in Battle Status.

List:
- Lists actors in Battle Status.

XP:
- Shows actor battlers in a stretched Battle Status.

Portrait:
- Shows portraits in a stretched Battle Status.

Border:
- Displays windows around the screen border.

---

List Style

Show Faces:
- Shows faces in List Style?

Command Window Width:
- Determine the window width for the Party and Actor Command Windows.
- Affects Default and List Battle Layout styles.

---

XP Style

Command Lines:
- Number of action lines in the Actor Command Window for the XP Style.

Sprite Height:
- Default sprite height used when if the sprite's height has not been
determined yet.

Sprite Base Location:
- Determine where the sprite is located on the Battle Status Window.
- Above Name - Sprite is located above the name.
- Bottom - Sprite is located at the bottom of the window.
- Centered - Sprite is centered in the window.
- Top - Sprite is located at the top of the window.

---

Portrait Style

Show Portraits?:
- Requires VisuMZ_1_MainMenuCore.
- Shows the actor's portrait instead of a face.

Portrait Scaling:
- If portraits are used, scale them by this much.

---

Border Style

Columns:
- The total number of columns for Skill & Item Windows in the battle scene

Show Portraits?:
- Requires VisuMZ_1_MainMenuCore.
- Shows the actor's portrait at the edge of the screen.

Portrait Scaling:
- If portraits are used, scale them by this much.

---

Skill & Item Windows

Middle Layout:
- Shows the Skill & Item Windows in mid-screen?

Columns:
- The total number of columns for Skill & Item Windows in the battle scene

---

Status Window Elements

Battler Name:
Gauge 1 (HP):
Gauge 2 (MP):
Gauge 3 (TP):
State Icon:
TPB/ATB Gauge:

Offset: X/Y:
- Offset this Battle Status Window element's X/Y.
- For X: Negative goes left. Positive goes right.
- For Y: Negative goes up. Positive goes down.

Window Skin:

Filename:
- Filename used for the Battle Status Window skin.
- Leave this empty to use the default window skin.

Hide Window Skin?:
- Hide the window skin for the Battle Status Window?

Selectable Background:

Hide Selectable BG?:
- Show/Hide the selectable background box for the Battle Status Window?

Attachments:

Back Attachment:

Filename:
- Filename used for an image to attach to the back of the Battle
Status Window. Leave empty for none.

Offset: X/Y:
- Offset this Battle Status Window element's X/Y.
- For X: Negative goes left. Positive goes right.
- For Y: Negative goes up. Positive goes down.

Front Attachment:

Filename:
- Filename used for an image to attach to the front of the Battle
Status Window. Leave empty for none.

---

UI Elements

Anti-Tint UI?
- Prevent UI Elements from being tinted?
- This prevents UI Elements such as HP Gauges, Enemy Names, Battle Cursor,
and Weakness Display from being affected by screen tint.

---

Plugin Parameters: Battle Log Settings

These Plugin Parameters give you control over how the Battle Log Window, the
window shown at the top of the screen in the battle layout, appears, its
various properties, and which text will be displayed.

The majority of the text has been disabled by default with this plugin to
make the flow of battle progress faster.

---

General

Back Color:
- Use #rrggbb for a hex color.

Max Lines:
- Maximum number of lines to be displayed.

Message Wait:
- Number of frames for a usual message wait.

Text Align:
- Text alignment for the Window_BattleLog.

JS: X, Y, W, H:
- Code used to determine the dimensions for the battle log.

---

Start Turn

Show Start Turn?:
- Display turn changes at the start of the turn?

Start Turn Message:
- Message displayed at turn start.
- %1 - Turn Count

Start Turn Wait:
- Number of frames to wait after a turn started.

---

Display Action

Show Centered Action?:
- Display a centered text of the action name?

Show Skill Message 1?:
- Display the 1st skill message?

Show Skill Message 2?:
- Display the 2nd skill message?

Show Item Message?:
- Display the item use message?

---

Action Changes

Show Counter?:
- Display counter text?

Wait Frames:
- How many frames should the battle log wait after text?
- 60 frames = 1 second.

Show Reflect?:
- Display magic reflection text?

Wait Frames:
- How many frames should the battle log wait after text?
- 60 frames = 1 second.

Show Substitute?:
- Display substitute text?

Wait Frames:
- How many frames should the battle log wait after text?
- 60 frames = 1 second.

---

Action Results

Show No Effect?:
- Display no effect text?

Show Critical?:
- Display critical text?

Show Miss/Evasion?:
- Display miss/evasion text?

Show HP Damage?:
- Display HP Damage text?

Show MP Damage?:
- Display MP Damage text?

Show TP Damage?:
- Display TP Damage text?

---

Display States

Show Added States?:
- Display added states text?

Show Removed States?:
- Display removed states text?

Show Current States?:
- Display the currently affected state text?

Show Added Buffs?:
- Display added buffs text?

Show Added Debuffs?:
- Display added debuffs text?

Show Removed Buffs?:
- Display removed de/buffs text?

---

Plugin Parameters: Battleback Scaling Settings

By default, the battlebacks in RPG Maker MZ scale as if the screen size is
a static 816x624 resolution, which isn't always the case. These settings
here allow you to dictate how you want the battlebacks to scale for the
whole game. These settings CANNOT be changed midgame or per battle.

---

Settings

Default Style:
- The default scaling style used for battlebacks.
- MZ (MZ's default style)
- 1:1 (No Scaling)
- Scale To Fit (Scale to screen size)
- Scale Down (Scale Downward if Larger than Screen)
- Scale Up (Scale Upward if Smaller than Screen)

JS: 1:1:
JS: Scale To Fit:
JS: Scale Down:
JS: Scale Up:
- This code gives you control over the scaling for this style.

---

Plugin Parameters: Party Command Window

These Plugin Parameters allow you control over how the Party Command Window
operates in the battle scene. You can turn disable it from appearing or make
it so that it doesn't

---

Command Window

Style:
- How do you wish to draw commands in the Party Command Window?
- Text Only: Display only the text.
- Icon Only: Display only the icon.
- Icon + Text: Display the icon first, then the text.
- Auto: Determine which is better to use based on the size of the cell.

Text Align:
- Text alignment for the Party Command Window.

Fight Icon:
- The icon used for the Fight command.

Add Auto Battle?:
- Add the "Auto Battle" command to the Command Window?

Auto Battle Icon:
- The icon used for the Auto Battle command.

Auto Battle Text:
- The text used for the Auto Battle command.

Add Status?:
- Add the "Status" command to the Command Window?

Add Options?:
- Add the "Options" command to the Command Window?

Options Icon:
- The icon used for the Options command.

Active TPB Message:
- Message that will be displayed when selecting options during the
middle of an action.

Escape Icon:
- The icon used for the Escape command.

---

Access

Skip Party Command:
- DTB: Skip Party Command selection on turn start.
- TPB: Skip Party Command selection at battle start.

Disable Party Command:
- Disable the Party Command Window entirely?

---

Help Window

Fight:
- Text displayed when selecting a skill type.
- %1 - Skill Type Name

Auto Battle:
- Text displayed when selecting the Auto Battle command.

Options:
- Text displayed when selecting the Options command.

Escape:
- Text displayed when selecting the escape command.

---

Plugin Parameters: Actor Command Window

These Plugin Parameters allow you to change various aspects regarding the
Actor Command Window and how it operates in the battle scene. This ranges
from how it appears to the default battle commands given to all players
without a custom <Battle Commands> notetag.

---

Command Window

Style:
- How do you wish to draw commands in the Actor Command Window?
- Text Only: Display only the text.
- Icon Only: Display only the icon.
- Icon + Text: Display the icon first, then the text.
- Auto: Determine which is better to use based on the size of the cell.

Text Align:
- Text alignment for the Actor Command Window.

Item Icon:
- The icon used for the Item command.

Normal SType Icon:
- Icon used for normal skill types that aren't assigned any icons.
- Ignore if VisuMZ_1_SkillsStatesCore is installed.

Magic SType Icon:
- Icon used for magic skill types that aren't assigned any icons.
- Ignore if VisuMZ_1_SkillsStatesCore is installed.

---

Battle Commands

Command List:
- List of battle commands that appear by default if the <Battle Commands>
notetag isn't present.

- Attack
- Adds the basic attack command.

- Skills
- Displays all the skill types available to the actor.

- SType: x
- Stype: name
- Adds in a specific skill type.
- Replace 'x' with the ID of the skill type.
- Replace 'name' with the name of the skill type (without text codes).

- All Skills
- Adds all usable battle skills as individual actions.

- Skill: x
- Skill: name
- Adds in a specific skill as a usable action.
- Replace 'x' with the ID of the skill.
- Replace 'name' with the name of the skill.

- Guard
- Adds the basic guard command.

- Item
- Adds the basic item command.

- Status
- Adds the status command.

- Escape
- Adds the escape command.

- Auto Battle
- Adds the auto battle command.

- Party
- Requires VisuMZ_2_PartySystem!
- Switches out the current actor for another.

- Combat Log
- Requires VisuMZ_4_CombatLog!
- Shows combat log.

- Talk
- Requires VisuMZ_3_BattleCmdTalk!
- Shows talk command if applicable.

- Weapon Swap
- Requires VisuMZ_2_WeaponSwapSystem!
- Swaps current weapon for next one.

Show Command Costs:
- If a battle command has a resource cost, show it?

---

Help Window

Skill Types:
- Text displayed when selecting a skill type.
- %1 - Skill Type Name

Items:
- Text displayed when selecting the item command.

Escape:
- Text displayed when selecting the escape command.

Auto Battle:
- Text displayed when selecting the Auto Battle command.

---

Plugin Parameters: In-Battle Status Window

view the status of the current active party. If the actors have states and
buffs, the player can scroll through them and read about their effects
through the help window.

If you would like to manage which parameters can appear here, this can be
done through the VisuMZ_0_CoreEngine's "Parameter Settings" and adjust which
parameters are shown through "Extended Parameters". These settings will
reflect in the In-Battle Status window, too. Otherwise, the parameters that
will be shown will only be MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, and LUK.

The In-Battle Status can also be used to view enemies (if the parameter is
enabled). To view enemies, players must scroll through all the actors before
viewing enemies. Enemies will have their battler graphic displayed. If the
enemy has a SV Battler graphic, that will be displayed instead. However, if
the enemy has a Dragonbones, then the database battler graphic is displayed
to match any of the turn order displays as those also use the same graphic.

Enemies will not display the current HP on their In-Battle Status gauges.
Instead, they will display what percentage their HP, MP, and/or TP is at.
This is primarily due to how gauges do not support large numbers well and
showing the percentage values are better for this scene.

---

General Settings

Status Icon:
- The icon used for the Status command.

Status Graphic:
- Choose how the actor graphic appears for In-Battle Status.

Help Description:
- Text displayed when selecting the Status command.

---

Enemy Settings

Allow View Enemies?:
- Allows players to view enemy stats (even if limited)?

Show Level?:
- Shows the enemy's level in the In-Battle Status?

Hidden Parameter:
- The text that appears if a parameter value is hidden.

Show Params Always:
- Always show exact enemy parameter values.

Show Battle Test:
- Show exact enemy parameter values in battle test.

Show If Defeated:
- Show exact enemy parameter values if enemy has been defeated before.

---

Page Buttons:

Show Page Buttons?:
- Shows page buttons to switch between actors?
- Still requires Touch UI option to be on.

Large UI Position?:
- If using a large resolution, position the page buttons on which side?

Offset X
- Offsets the page buttons x position.
- Negative: left. Positive: right.

Offset Y
- Offsets the page buttons y position.
- Negative: up. Positive: down.

---

Parameter Display

Increased Value
- How are increased parameter values displayed?
- %1 - Parameter Value

Decreased Value
- How are increased parameter values displayed?
- %1 - Parameter Value

---

States Display

Max Width
- Maximum width of the states list display.

List States?
- Lists states in the states list display?

List Buffs?
- Lists buffs in the states list display?

List Debuffs?
- Lists debuffs in the states list display?

Buffs/Debuffs Display:

Buff Name Format
- Text format used to represent buffs.
- %1 - Parameter Name

Debuff Name Format
- Text format used to represent debuffs.
- %1 - Parameter Name

Normal State:

Normal Icon
- Icon used to represent normal state (unaffected by states, buffs, or
debuffs).

Normal Text
- Text used to represent normal state (unaffected by states, buffs, or
debuffs).

---

Help Descriptions

State Help Format:
- Text format used for state help descriptions
- %1 - Description; %2 - Turns/Actions Remaining

Buff Help Format:
- Text format used for Buff help descriptions
- %1 - Param; %2 - Percent; %3 - Color; %4 - Turns

Debuff Help Format:
- Text format used for Debuff help descriptions
- %1 - Param; %2 - Percent; %3 - Color; %4 - Turns

Normal State:
- Help description used to explain normal state (unaffected by states,
buffs, or debuffs).

Turns/Actions Left:

Actions Format:
- Text format used to represent actions remaining.
- %1 - Actions; %2 - Color

Turns Format:
- Text format used to represent turns remaining.
- %1 - Turns; %2 - Color

Passive Text:
- Text used to represent a passive.

---

Window Settings

Background Type:
- Select background type for this window.

JS: Draw Data:
- Code used to draw battler data.

JS: X, Y, W, H:
- Code used to determine the dimensions for this window.

---

Plugin Parameters: Multi-Target Windows Settings

Action Sequence Plugin Parameters adjust how the Multi-Target Windows appear
in battle. These windows are visible when selecting an enemy or actor while
using a skill/item that has the <Single or Multiple Select> notetag.

Those wondering why this isn't regulated to a command left or right of the
enemies and actors is because mouse controls and touch controls would not be
able to select all enemies or all allies that way.

---

Properties

Window Width:
- What is the width used for the Multi-Target Window?

Background Type:
- Select background type for these windows.

Show Button:
- Shows the keyboard/controller button to press?
- Requires VisuMZ_0_CoreEngine!

---

Vocab

All Actors:
- What is the text used for the "All Actors" button?

All Enemies:
- What is the text used for the "All Enemies" button?

---

Offsets > Actor Offsets
Offsets > Enemy Offsets

Offset X:
- Offsets the button's x position.
- Negative: left. Positive: right.

Offset Y:
- Offsets the button's y position.
- Negative: up. Positive: down.

---

Plugin Parameters: Damage Combo Window Settings

If enabled, this window will display updated information about the total
amount of hits performed and total damage/healing value executed for HP.

This only applies when HP damage is directly dealt through action effects.
It does NOT apply for MP damage, TP damage, states, regeneration, or event
commands.

If you would like to adjust the Damage Combo Window mid-action, you can use
the following script calls to do so:

$comboWindowReset()
- Resets the all values found in the damage combo window.

$comboWindowIncreaseHits(x)
- Increases the current hit counter in the combo window by 'x'.
- Insert a number for 'x'.
- Example: $comboWindowIncreaseHits(2)

$comboWindowIncreaseDamage(x)
- Increases the current total damage counter in the combo window by 'x'.
- Insert a number for 'x'.
- This will offset any healing added in the damage counter window.
- Example: $comboWindowIncreaseDamage(100)

$comboWindowIncreaseHealing(x)
- Increases the current total heal counter in the combo window by 'x'.
- Insert a number for 'x'.
- This will offset any damage added in the damage counter window.
- Example: $comboWindowIncreaseHealing(200)

---

General Settings:

Enable?:
- Add the Combo Window to show in battle?

---

Appearance Settings:

Custom Font:
- Insert the custom font face name here.
- Use VisuMZ_1_MessageCore to register new fonts.

Text Align:
- Text alignment for this window?

JS: Draw Data:
- Code used to draw the data in this window.

---

Vocabulary:

Damage Combo Format:
- Text format used to display total hits for damage.
- %1 - Total Hits

Healing Combo Format:
- Text format used to display total hits for healing.
- %1 - Total Hits

Damage Total Format:
- Text format used to display total value for damage.
- %1 - Total Damage

Healing Total Format:
- Text format used to display total value for healing.
- %1 - Total Healing

---

Position Settings:

Fade Shift X:
- Shifts the windows x position when fading.
- Negative: left. Positive: right.

Fade Shift Y:
- Shifts the windows y position when fading.
- Negative: up. Positive: down.

Offset X:
- Offsets the windows x position.
- Negative: left. Positive: right.

Offset Y:
- Offsets the windows y position.
- Negative: up. Positive: down.

JS: X, Y, W, H:
- Code used to determine the dimensions for this window.

---

Updating Settings:

Number Roll Duration:
- Frame duration to roll damage numbers.
- 60 frames = 1 second.

Minimum Stay Duration:
- Frame duration to stay visible minimum.
- 60 frames = 1 second.

Minimum Hit Visible:
- Minimum hits before combo window becomes visible?

Opacity Speed:
- Opacity speed when fading in/out.

---

Plugin Parameters: Actor Battler Settings

These Plugin Parameter settings adjust how the sideview battlers behave for
the actor sprites. Some of these settings are shared with enemies if they
use sideview battler graphics.

---

Flinch

Flinch Distance X:
- The normal X distance when flinching.

Flinch Distance Y:
- The normal Y distance when flinching.

Flinch Duration:
- The number of frames for a flinch to complete.

Shake Flinch:
- Perform a shake flinch when taking damage?

Max Duration:
- Maximum duration a shake flinch can have.
- This is reduced relative to the amount of damage taken.

Max Power:
- The power rating of a shake flinch at full damage.
- This is reduced relative to the amount of damage taken.

---

Frontview Battlers

Portrait Animations:

Each Target:
- Place animations on top for "Each Target" display types?
- Does not apply to MV animations.

Center of All:
- Place animations on top for "Center of All" display types?
- Does not apply to MV animations.

Center of Screen:
- Place animations on top for "Center of Screen" display types?
- Does not apply to MV animations.

---

Sideview Battlers

Anchor:

Anchor: X:
- Default X anchor for Sideview Battlers.

Anchor: Y:
- Default Y anchor for Sideview Battlers.

Chant Style:
- What determines the chant motion?
- Hit type or skill type?

Motion Speed:
- The number of frames in between each motion.

Position:

Offset X:
- Offsets X position where actor is positioned.
- Negative values go left. Positive values go right.

Offset Y:
- Offsets Y position where actor is positioned.
- Negative values go up. Positive values go down.

Priority: Active:
- Place the active actor on top of actor and enemy sprites.

Priority: Actors:
- Prioritize actors over enemies when placing sprites on top of each other

Shadow Visible:
- Show or hide the shadow for Sideview Battlers.

Smooth Image:
- Smooth out the battler images or pixelate them?

State Overlay:

Offset X:
- Offsets X position for state overlay on actor.
- Negative values go left. Positive values go right.

Offset Y:
- Offsets Y position for state overlay on actor.
- Negative values go up. Positive values go down.

JS: Home Position:
- Code used to calculate the home position of actors.

---

Plugin Parameters: Enemy Battler Settings

These Plugin Parameter settings adjust how enemies appear visually in the
battle scene. Some of these settings will override the settings used for
actors if used as sideview battlers. Other settings include changing up the
default attack animation for enemies, how the enemy select window functions,
and more.

---

Visual

Attack Animation:
- Default attack animation used for enemies.
- Use <Attack Animation: x> for custom animations.

Emerge Text:
- Show or hide the 'Enemy emerges!' text at the start of battle.

Offset X:
- Offsets X position where enemy is positioned.
- Negative values go left. Positive values go right.

Offset Y:
- Offsets Y position where enemy is positioned.
- Negative values go up. Positive values go down.

Smooth Image:
- Smooth out the battler images or pixelate them?

---

Select Window

Any: Last Selected:
- Prioritize last selected enemy over front view or sideview settings?

FV: Right Priority:
- If using frontview, auto select the enemy furthest right.

SV: Right Priority:
- If using sideview, auto select the enemy furthest right.

---

Name:

Legacy Option:
- Use the legacy version (window) or new version (sprite).
- WARNING: Legacy version is no longer supported for bugs.
- Not all settings available here in the Plugin Parameters will be
available to the legacy version (ie Always Visible and Attach States).

Font Size:
- Font size used for enemy names.

Name Position:

Offset X:
Offset Y:
- Offset the enemy name's position by this much.
- For X: Negative goes left. Positive goes right.
- For Y: Negative goes up. Positive goes down.

Name: Attach States:
- Attach the enemy's state icon to the enemy name?

Attach: Offset X:
Attach: Offset Y:
- How much to offset the attached icon's X/Y position by?
- For X: Negative goes left. Positive goes right.
- For Y: Negative goes up. Positive goes down.

Name Visibility:

Always Hidden:
- Determines if the enemy name will always be visible.
- Highest priority.

Always Visible:
- Determines if the enemy name will always be visible.
- Medium priority.

As Target:
- Shows enemy name when enemy is a target.
- Medium priority.

By Selection?:
- Determines the conditions for enemy name visibility.
- Lowest priority.

Temporary Visibility:
- Number of frames enemy's name temporarily visible after taking an
action effect in battle.
- 60 frames = 1 second.

---

Sideview Battlers

Allow Collapse:
- Causes defeated enemies with SV Battler graphics to "fade away"
when defeated?

Anchor: X:
- Default X anchor for Sideview Battlers.
- Use values between 0 and 1 to be safe.

Anchor: Y:
- Default Y anchor for Sideview Battlers.
- Use values between 0 and 1 to be safe.

Motion: Idle:
- Sets default idle animation used by Sideview Battlers.

Shadow Visible:
- Show or hide the shadow for Sideview Battlers.

Size: Width:
- Default width for enemies that use Sideview Battlers.

Size: Height:
- Default height for enemies that use Sideview Battlers.

Weapon Type:
- Sets default weapon type used by Sideview Battlers.
- Use 0 for Bare Hands.

---

Aspect Defaults

Name Format:
- Default name aspect format.
- %1 - Original Enemy Name

Name Color:
- Use #rrggbb for custom colors or regular numbers for text colors from
the Window Skin.

Icon:
- Default icon used for aspect.
- Use <Aspect Icon: x> to change icon.

---

Plugin Parameters: HP Gauge Settings

Settings that adjust the visual HP Gauge displayed in battle.

---

Show Gauges For

Actors:
- Show HP Gauges over the actor sprites' heads?
- Requires SV Actors to be visible.

Enemies:
- Show HP Gauges over the enemy sprites' heads?
- Can be bypassed with <Hide HP Gauge> notetag.

Requires Defeat?:
- Requires defeating the enemy once to show HP Gauge?
- Can be bypassed with <Show HP Gauge> notetag.

Battle Test Bypass?:
- Bypass the defeat requirement in battle test?

---

Settings

Animation Duration:
- How many frames should gauges animate themselves?
- Default: 20 frames.

Anchor X:
Anchor Y:
- Where do you want the HP Gauge sprite's anchor X/Y to be?
Use values between 0 and 1 to be safe.

Scale:
- How large/small do you want the HP Gauge to be scaled?

Offset X:
Offset Y:
- How many pixels to offset the HP Gauge's X/Y by?

---

Options

Add Option?:
- Add the 'Show HP Gauge' option to the Options menu?

Adjust Window Height:
- Automatically adjust the options window height?

Option Name:
- Command name of the option.

---

Plugin Parameters: Action Sequence Settings

Action Sequence Plugin Parameters allow you to decide if you want automatic
Action Sequences to be used for physical attacks, the default casting
animations used, how counters and reflects appear visually, and what the
default stepping distances are.

---

Automatic Sequences

Melee Single Target:
- Allow this auto sequence for physical, single target actions?

Melee Multi Target:
- Allow this auto sequence for physical, multi-target actions?

---

Quality of Life

Auto Notetag:
- Automatically apply the <Custom Action Sequence> notetag effect to any
item or skill that has a Common Event?
- Any item or skill without a Common Event attached to it will use the
Automatic Action Sequences instead.
- The <Auto Action Sequence> notetag will disable this effect for that
particular skill or item.

---

Cast Animations

Certain Hit:
- Cast animation for Certain Hit skills.

Physical:
- Cast animation for Physical skills.

Magical:
- Cast animation for Magical skills.

---

Counter/Reflect

Counter Back:
- Play back the attack animation used?

Reflect Animation:
- Animation played when an action is reflected.

Reflect Back:
- Play back the attack animation used?

---

Stepping

Melee Distance:
- Minimum distance in pixels for Movement Action Sequences.

Step Distance X:
- The normal X distance when stepping forward.

Step Distance Y:
- The normal Y distance when stepping forward.

Step Duration:
- The number of frames for a stepping action to complete.

---
```
