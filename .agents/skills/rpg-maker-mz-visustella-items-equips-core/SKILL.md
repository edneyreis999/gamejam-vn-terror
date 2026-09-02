---
name: rpg-maker-mz-visustella-items-equips-core
description: Pilot VisuStella MZ Items and Equips Core and item-shop extensions. Use for VisuMZ_1_ItemsEquipsCore, VisuMZ_2_MoreCurrencies, item categories or limits, equipment slots or eligibility, inventory traits, item or equipment presentation, shops, prices, stock, currencies, crafting, artifacts, or cursed equipment.
---

# Items and Equips Core

Treat inventory, equipment slots, equip eligibility, and shop presentation as
separate surfaces.

- Equipment slots resolve through EType names as well as IDs. Class slots are
  the default; actor overrides can persist through class changes until reset.
  Repeated matching ETypes are interchangeable, and Change Equip resolves a
  matching slot according to the active contract.
- Eligibility can combine copy or type limits, requirements, multiple ETypes,
  non-removable slots, optimization rules, and installed integrations.
- Dynamic equip requirements can depend on battler cache; changing a switch
  does not necessarily eject newly invalid equipment immediately.
- Equipment parameter JavaScript must not read the final parameter it is
  calculating, or it can recurse indefinitely.
- In shop status, replacing an existing row and adding a custom row are
  different operations; the selected style also determines whether actor
  comparison context exists.
- Artifacts apply traits from inventory without being equipped.

More Currencies is owned here by dependency and domain. Load exact public APIs
from [the plugin reference index](references/index.md).
