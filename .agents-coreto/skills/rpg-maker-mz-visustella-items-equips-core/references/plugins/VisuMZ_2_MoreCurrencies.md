# VisuMZ_2_MoreCurrencies

> Self-contained current contract derived from the active public plugin header and audited documentation. Consumer configuration is illustrative, not a universal default.

## Identity and relationships

- Plugin ID: `VisuMZ_2_MoreCurrencies`
- Contract: [RPG Maker MZ] [Tier 2] [MoreCurrencies]
- Required plugins: VisuMZ_0_CoreEngine, VisuMZ_1_ItemsEquipsCore
- Declared load order: after VisuMZ_1_ItemsEquipsCore
- Domain stewardship organizes knowledge and does not create a runtime dependency.

## Parameters and defaults

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| BreakHead | -------------------------- | — | — | ---------------------------------- | — | — |
| MoreCurrencies | — | — | — | Plugin Parameters | — | — |
| ATTENTION | — | — | — | READ THE HELP FILE | — | — |
| BreakSettings | -------------------------- | — | — | ---------------------------------- | — | — |
| General:struct | General Settings | — | struct&lt;General&gt; | {"General":"","AutoSellRate:num":"0.50","Vocab":"","NumWindowOwned:str":"Owned","NumWindowShift:str":"Change","NumWindowNet:str":"Net"} | — | Default settings for More Currencies. |
| Listing:struct | Listing Settings | — | struct&lt;Listing&gt; | {"Listing":"","ListOrder:arraystr":"\[\"item\",\"weapon\",\"armor\",\"variable\",\"gold\"\]","ShowSell:eval":"true","BuyFontSize:num":"22","BuyPadding:num":"16","Format":"","ItemBuyFmt:str":"%1%3","WeaponBuyFmt:str":"%1%3","ArmorsBuyFmt:str":"%1%3","VariableBuyFmt:str":"%1%4"} | — | Settings for the currency listings. |
| BreakEnd1 | -------------------------- | — | — | ---------------------------------- | — | — |
| End Of | — | — | — | Plugin Parameters | — | — |
| BreakEnd2 | -------------------------- | — | — | ---------------------------------- | — | — |

### Struct: General

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| General | — | — | — | — | — | — |
| AutoSellRate:num | Automatic Sell Rate | General | — | 0.50 | — | When using the plain "Cost" notetags, use this sell rate. |
| Vocab | Vocabulary | — | — | — | — | — |
| NumWindowOwned:str | Owned | Vocab | — | Owned | — | Text used for how much of an item is owned. |
| NumWindowShift:str | Shift | Vocab | — | Change | — | Text used for the change in value. |
| NumWindowNet:str | Net | Vocab | — | Net | — | Text used for the net result. |

### Struct: Listing

| Key | Label | Parent | Type | Default | Options | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Listing | — | — | — | — | — | — |
| ListOrder:arraystr | Listing Order | Listing | select\[\] | \["item","weapon","armor","variable","gold"\] | item; weapon; armor; variable; gold | Determines the order the trade components are listed. |
| ShowSell:eval | Show Sell Window | Listing | boolean | true | — | Show listed items in the sell window? |
| BuyFontSize:num | List Font Size | Listing | number | 22 | — | Font size used for listed items. |
| BuyPadding:num | List Padding | Listing | number | 16 | — | Pixel padding between listed items. |
| Format | Text Format | — | — | — | — | — |
| ItemBuyFmt:str | Item Format | Format | — | %1%3 | — | Text format used for listed items. %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name |
| WeaponBuyFmt:str | Weapon Format | Format | — | %1%3 | — | Text format used for listed weapons. %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name |
| ArmorsBuyFmt:str | Armors Format | Format | — | %1%3 | — | Text format used for listed armors. %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name |
| VariableBuyFmt:str | Variable Format | Format | — | %1%4 | — | Text format used for listed variables. %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name |

## Plugin commands

No public plugin commands are declared.
## Public behavior, notetags, text codes, and script surface

```text
Introduction

This plugin expands the shop scene's functionality by allowing the game dev
to create items that can be sold for items and/or variables instead of gold.
Or you know what? Throw gold in there, too. Any combination of the them! By
doing so, gold no longer becomes the default currency for every shop, as
some special shops may require a different type of trade.

Features include all (but not limited to) the following:

* Items can be bought using items, weapons, armors, variables, gold, or any
of the combinations listed.
* Sell items this way, too!
* Sold item listing window will now show the amount the player can get back
per unit sold.
* Shop scene's calculation window is now updated to show the transaction
details from how much the player owns to how much will be spent to what
kind of result there will be.
* Proxy system support allows for shops to sell the same items but using
different types of currencies.

Requirements

This plugin is made for RPG Maker MZ. This will not work in other iterations
of RPG Maker.

------ Required Plugin List ------

* VisuMZ_0_CoreEngine
* VisuMZ_1_ItemsEquipsCore

This plugin requires the above listed plugins to be installed inside your
game's Plugin Manager list in order to work. You cannot start your game with
this plugin enabled without the listed plugins.

------ Tier 2 ------

This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
that your plugins will have the best compatibility with the rest of the
VisuStella MZ library.

Major Changes

This plugin adds some new hard-coded features to RPG Maker MZ's functions.
The following is a list of them.

---

Window_ShopNumber

The visual contents of this window have been completely overhauled to show
the details of what transactions are happening. This includes how much or
many of a resource the player owns, how much will be involved in the actual
transaction, and the net outcome after the transaction has taken place.

Naturally, this means that things will have to shift around in order for the
space to make any sense.

---

Proxy Items

Proxy Items are temporary substitutes for another. When they are acquired
through shopping, they will turn into the item, weapon, or armor they are a
proxy for. Only the icon, name, help description, and status details will
match up. Everything else will remain separate such as the notetag data and
the trading list. This allows you to effectively have multiple ways to
trade the same item using different item combinations.

For more details, look inside of the Notetags section for Proxy items.

---

Notetags

The following are notetags that have been added through this plugin. These
notetags will not work with your game if this plugin is OFF or not present.

---

=== Cost-Related Notetags ===

---

<Item id Buy Cost: x>
<Item name Buy Cost: x>

<Item id Sell Cost: x>
<Item name Sell Cost: x>

<Item id Cost: x>
<Item name Cost: x>

- Used for: Item, Weapon, Armor Notetags
- The "buy" variant determines the item and quantity needed to purchase this
object in the shop.
- The "sell" variant determines the item and quantity acquired when selling
this object in the shop.
- The neither variant will determine both buy/sell transactions related to
the item and quantities when selling.
- Selling the object will yield a lower quantity determined by the sell
rate found in Plugin Parameters > General > Automatic Sell Rate.
- This variant cannot be used with the Buy/Sell notetag variants. If
either the buy or sell notetag variants are detected, this doesn't work.
- Replace 'id' with a number representing the ID of the item to be taken
(when bought) or acquired (when sold).
- Replace 'name' with the name of the item to be taken (when bought) or
acquired (when sold).
- Replace 'x' with the quantity of the item that will be taken (when bought)
or acquired (when sold).
- Insert multiple copies of these notetags to add more item costs.

---

<Weapon id Buy Cost: x>
<Weapon name Buy Cost: x>

<Weapon id Sell Cost: x>
<Weapon name Sell Cost: x>

<Weapon id Cost: x>
<Weapon name Cost: x>

- Used for: Item, Weapon, Armor Notetags
- The "buy" variant determines the weapon and quantity needed to purchase
this object in the shop.
- The "sell" variant determines the weapon and quantity acquired when
selling this object in the shop.
- The neither variant will determine both buy/sell transactions related to
the weapon and quantities when selling.
- Selling the object will yield a lower quantity determined by the sell
rate found in Plugin Parameters > General > Automatic Sell Rate.
- This variant cannot be used with the Buy/Sell notetag variants. If
either the buy or sell notetag variants are detected, this doesn't work.
- Replace 'id' with a number representing the ID of the weapon to be taken
(when bought) or acquired (when sold).
- Replace 'name' with the name of the weapon to be taken (when bought) or
acquired (when sold).
- Replace 'x' with the quantity of the weapon that will be taken (when
bought) or acquired (when sold).
- Insert multiple copies of these notetags to add more weapon costs.

---

<Armor id Buy Cost: x>
<Armor name Buy Cost: x>

<Armor id Sell Cost: x>
<Armor name Sell Cost: x>

<Armor id Cost: x>
<Armor name Cost: x>

- Used for: Item, Weapon, Armor Notetags
- The "buy" variant determines the armor and quantity needed to purchase
this object in the shop.
- The "sell" variant determines the armor and quantity acquired when
selling this object in the shop.
- The neither variant will determine both buy/sell transactions related to
the armor and quantities when selling.
- Selling the object will yield a lower quantity determined by the sell
rate found in Plugin Parameters > General > Automatic Sell Rate.
- This variant cannot be used with the Buy/Sell notetag variants. If
either the buy or sell notetag variants are detected, this doesn't work.
- Replace 'id' with a number representing the ID of the armor to be taken
(when bought) or acquired (when sold).
- Replace 'name' with the name of the armor to be taken (when bought) or
acquired (when sold).
- Replace 'x' with the quantity of the armor that will be taken (when
bought) or acquired (when sold).
- Insert multiple copies of these notetags to add more armor costs.

---

<Variable id Buy Cost: x>

<Variable id Sell Cost: x>

<Variable id Cost: x>

- Used for: Item, Weapon, Armor Notetags
- The "buy" variant determines the variable and quantity needed to purchase
this object in the shop.
- The "sell" variant determines the variable and quantity acquired when
selling this object in the shop.
- The neither variant will determine both buy/sell transactions related to
the variable and quantities when selling.
- Selling the object will yield a lower quantity determined by the sell
rate found in Plugin Parameters > General > Automatic Sell Rate.
- This variant cannot be used with the Buy/Sell notetag variants. If
either the buy or sell notetag variants are detected, this doesn't work.
- Replace 'id' with a number representing the ID of the variable to be taken
(when bought) or acquired (when sold).
- Replace 'name' with the name of the variable to be taken (when bought) or
acquired (when sold).
- Replace 'x' with the quantity of the variable that will be taken (when
bought) or acquired (when sold).
- Insert multiple copies of these notetags to add more variable costs.

---

=== Proxy Notetags ===

---

<Proxy: id>
<Proxy: name>

- Used for: Item, Weapon, Armor Notetags
- REQUIRES the most up to date VisuMZ Items and Equips Core!
- Turns this item, weapon, or armor into a proxy for another item, allowing
you to create trades with different components using the above notetag
contents and yield the same item.
- The proxy item itself will take on the name, icon, and description of the
original item it is supposed to represent.
- No other properties are carried over from the original.
- When viewed through the Window_ShopStatus window, the contents will
reference the original item and not the proxy item.
- Proxy items themselves cannot be acquired. This includes event commands,
item drops, or equips.
- When bought, the item yielded won't be the proxy item but the item it is
a proxy for.
- Replace 'id' with a number representing the item, weapon, or armor ID of
the same item type. If the proxy is an item, this will reference an item.
If the proxy is a weapon, this will reference a weapon. Same for armors.
- Replace 'name' with text representing the item, weapon, or armor's name.
The referenced item needs to be the same item type as the proxy. Item for
item, weapon for weapon, armor for armor.
- Insert multiple copies of these notetags to add more variables costs.

---

Plugin Parameters: General Settings

Default settings for More Currencies.

---

General

Automatic Sell Rate:
- When using the plain "Cost" notetags, use this sell rate.

---

Vocabulary

Owned:
- Text used for how much of an item is owned.

Shift:
- Text used for the change in value.

Net:
- Text used for the net result.

---

Plugin Parameters: Listing Settings

Settings for the currency listings.

---

Listing

Listing Order:
- Determines the order the trade components are listed.

Show Sell Window:
- Show listed items in the sell window?

List Font Size:
- Font size used for listed items.

List Padding:
- Pixel padding between listed items.

---

Text Format

Item Format:
Weapon Format:
Armor Format:
Variable Format:
- Text format used for listed items.
- %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name

---
```
