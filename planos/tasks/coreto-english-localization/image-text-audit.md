---
status: completed
audited_on: 2026-09-29
---

# Image text audit — Coreto English localization

Method: the list comes from data, not filenames. Every Show Picture (231),
image-bearing plugin command argument (VNPictureBusts `PictureName`, etc.),
map parallax/battleback, System title and plugin image parameter was
collected from `data/*.json` and `js/plugins.js`, resolved to a file, and
inspected visually (contact sheets at reduced size; suspicious areas
re-checked at full resolution: the carved name in `Dryland_Encounter_A6` and
the village area of `Dryland_MapComplete`, neither of which holds readable
text). Picture text drawn by PictureTextChange is localized through the table
(tasks 03–05) and needs no bitmap.

Unreferenced files in `img/pictures` are not shown by the game and were not
audited. No event uses Game Over (353) and the splash screen is off, so
`img/system/GameOver.png` and `Splash.png` never appear.

## Result

No referenced image carries player-facing copy. **No localized variant is
needed**, so `LanguageImages` stays unchanged (shipped `[XX]`,
`ConvertDefault=false`) and V-006 is not reopened.

The only baked text is the development mark on 22 placeholder images.
They are temporary art, not translation targets: replacing them is a delivery
requirement owned by the art pipeline (AGENTS.md: replace placeholders with
final assets before delivery), outside this spec. Recorded here so V-003 and
the release check do not read them as untranslated text.

## Inventory (81 files)

| Image | Use (first references) | Baked text | Disposition |
| --- | --- | --- | --- |
| `img/pictures/Dryland_Approach.png` | Map007 ev1, Map008 ev1 (+14) | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Button.png` | CE304, CE38 (+3) | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Church.png` | CE40, CE46 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_Council.png` | CE40, Map023 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_DestinationCard.png` | CE39, CE59 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_DestinationLabel.png` | CE38, CE39 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Destination_final.png` | CE39 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_Destination_physical.png` | CE39 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_Destination_supernatural.png` | CE39 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EncounterTitle.png` | CE304, CE43 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_A1.png` | Map007 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_A2.png` | Map008 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_A3.png` | Map009 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_A4.png` | Map010 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_A5.png` | Map011 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_A6.png` | Map012 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_A7.png` | Map013 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_A8.png` | Map014 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_B1.png` | Map015 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_B2.png` | Map016 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_B3.png` | Map017 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_B4.png` | Map018 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_B5.png` | Map019 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_B6.png` | Map020 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_B7.png` | Map021 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Encounter_B8.png` | Map022 ev1 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_EndingDestroy.png` | Map026 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EndingReunite.png` | Map025 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EndingTotalLoss.png` | Map027 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EpilogueH1.png` | Map029 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EpilogueH2.png` | Map030 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EpilogueH3.png` | Map031 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EpilogueH4.png` | Map032 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EpilogueH5.png` | Map033 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EpilogueH6.png` | Map034 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EpilogueH7.png` | Map035 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_EpilogueH8.png` | Map036 ev1 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_Figtree.png` | CE40, CE46 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_Gravestone.png` | CE59 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_H1.png` | CE43 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_H2.png` | CE43 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_H3.png` | CE43 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_H4.png` | CE43 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_H5.png` | CE43 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_H6.png` | CE43 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_H7.png` | CE43 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_H8.png` | CE43 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_MapComplete.png` | CE46, CE48 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_MapDwarven.png` | CE47, CE48 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_MapElven.png` | CE47, CE48 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Memorial.png` | CE59, CE61 | placeholder mark | Development placeholder: baked mark “PLACEHOLDER_CENARIO” over a stock scene. Not player copy; the art owner replaces it before delivery (AGENTS.md). No variant. |
| `img/pictures/Dryland_Memorial_H1.png` | CE59, CE60 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Memorial_H2.png` | CE59, CE60 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Memorial_H3.png` | CE59, CE60 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Memorial_H4.png` | CE59, CE60 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Memorial_H5.png` | CE59, CE60 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Memorial_H6.png` | CE59, CE60 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Memorial_H7.png` | CE59, CE60 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Memorial_H8.png` | CE59, CE60 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Panel.png` | CE117, CE39 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Tag.png` | CE38 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Tavern_H1.png` | CE38, CE45 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Tavern_H2.png` | CE38, CE45 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Tavern_H3.png` | CE38, CE45 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Tavern_H4.png` | CE38, CE45 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Tavern_H5.png` | CE38, CE45 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Tavern_H6.png` | CE38, CE45 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Tavern_H7.png` | CE38, CE45 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Tavern_H8.png` | CE38, CE45 | no | No text. Kept for both languages. |
| `img/pictures/Dryland_Taverna.png` | CE2, CE38 (+10) | no | No text. Kept for both languages. |
| `img/pictures/Dryland_andira.png` | CE74 357 Basic_EnterBust.PictureName:str | placeholder mark | Development placeholder: baked mark “PLACEHOLDER CHARACTER”. Same disposition. |
| `img/pictures/Dryland_florai_confined.png` | CE297 357 Basic_EnterBust.PictureName:str, CE299 357 Basic_EnterBust.PictureName:str | no | No text. Kept for both languages. |
| `img/pictures/Dryland_ivai.png` | CE263 357 Basic_EnterBust.PictureName:str, CE264 357 Basic_EnterBust.PictureName:str (+12) | no | No text. Kept for both languages. |
| `img/pictures/Dryland_perola_confined.png` | CE293 357 Basic_EnterBust.PictureName:str, CE295 357 Basic_EnterBust.PictureName:str | placeholder mark | Development placeholder: baked mark “PLACEHOLDER CHARACTER”. Same disposition. |
| `img/pictures/Reed final.png` | CE352 357 Basic_EnterBust.PictureName:str, CE353 357 Basic_EnterBust.PictureName:str (+2) | placeholder mark | Development placeholder: baked mark “PLACEHOLDER CHARACTER”. Same disposition. |
| `img/pictures/Reed-novo.png` | Map002 ev1 357 Basic_EnterBust.PictureName:str | placeholder mark | Development placeholder: baked mark “PLACEHOLDER CHARACTER”. Same disposition. |
| `img/system/Window.png` | plugins.js WindowSkin | no | No text. Kept for both languages. |
| `img/titles1/Ruins.png` | System | no | No text. Kept for both languages. |
| `img/system/IconSet.png` | Icons in windows (Options row icons); the letter glyphs sit in stock stat icons no screen uses | no (player-visible part) | Kept. |
| `img/system/ButtonSet.png` | Touch buttons (glyphs only) | no (player-visible part) | Kept. |
| `img/titles1/Ruins.png` | System `title1Name`; the evented title (CE002) draws its own picture, so it is not shown | no (player-visible part) | Kept. |
