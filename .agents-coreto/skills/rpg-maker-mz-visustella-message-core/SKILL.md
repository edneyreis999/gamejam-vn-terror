---
name: rpg-maker-mz-visustella-message-core
description: Pilot VisuStella MZ Message Core and message-family extensions. Use for VisuMZ_1_MessageCore, VisuMZ_2_ExtMessageFunc, VisuMZ_2_VNPictureBusts, VisuMZ_2_AniMsgTextEffects, VisuMZ_3_MsgLetterSounds, VisuMZ_4_GabWindow, VisuMZ_4_AttachedPictures, dialogue, Message, Name or Choice windows, text codes, macros, replacements, actions, word wrap, auto-color, localization, letter sounds, busts, gabs, or attached pictures.
---

# VisuStella Message Core

- Choose the surface before the syntax: parameters set defaults; plugin commands
  change event or runtime behavior; text codes act inline; macros expand text;
  replacements produce text; actions cause effects; localization performs a
  lookup.
- Confirm the window context. Message, Choice, Name, Help, Battle, and global
  parsers do not support identical text-code sets.
- Preserve composition order: macros expand before language lookup, and output
  can return to text-code processing. Avoid colliding matches, ambiguous
  expansion, and accidental recursion.
- Word wrap is not neutral: Choice does not support it, and it can conflict with
  alignment or message auto-size and positioning.
- Adjacent Show Text commands and adjacent Show Choices at matching indentation
  can be chained; order and indentation are semantic.
- Auto-color performs lexical matching, not semantic recognition.
- Localization is a lookup contract among configuration, language source,
  keys, and references; it is not translation policy.

Extensions are stewarded here by message presentation, not inferred dependency.
Load the exact contract from [the plugin reference index](references/index.md).
