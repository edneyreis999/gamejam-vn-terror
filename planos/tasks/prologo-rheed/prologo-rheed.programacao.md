---
status: approved
discipline: Programação
---

# Native integration contract

Owns technical aspects of RQ-003–RQ-006. Author the played text and visual/audio commands in Map002 event 1; do not restore the retired CE001 body or create a parallel text catalog. Preserve the map's BEGIN guard, native checkpoint wait and single transfer to Map003.

Current surfaces:

- `rpg-maker/The Dryland Drowned/data/Map002.json`: actual prologue text, presentation, CE067 call and transfer.
- `data/CommonEvents.json`: CE351 preload; CE067 shared ambience. Avoid changing shared ambience to silence other scenes. Extend native preload only for the identified required older-Rheed asset if needed.
- `js/plugins.js`: VNPictureBusts active (index 6); AttachedPictures installed but inactive (index 12). Activation is authorized by the requested design; keep dependency order and vendor bytes.
- `js/plugins/Dryland_CampaignRules.js`: existing prologue plan has three passage IDs. Give the revised semantic passages fresh prologue-local identities so changed copy is not falsely treated as already read. Keep text out of this rule layer. Align native ReadingPermission, CaptureContext, ReadingEnd and ReadingComplete boundaries with the resulting plan; complete each passage only after its final box.
- `js/plugins/Dryland_EventBridge.js` and `Dryland_Presentation.js`: preserve current integration APIs; no new speaker lookup, global restoration layer or campaign state for Rheed.
- `rpg-maker/tests/campaign.test.mjs`: extend existing relevant reading/entry/save cases when implementation begins; no duplicate prologue regression suite.

Rheed is narrative-only, not a ninth hero/actor in the selectable roster. Do not alter party eligibility, competencies, death logic, routes or endings. No new switches, variables, phases, battle logic or save schema are needed merely to represent him.

Use native plugin commands for busts and attachments, and paired pictures 60/61 during N04–N06, instantaneous size/position updates at speaker changes, and explicit removal of both pictures and attachments at transfer. Stop inherited audio locally on entry, omit the intro ambience call, and let the existing preparation path resume its own sound. Do not alter global volume settings. Exercise AttachedPictures activation against existing tavern dialogue for regressions.

## Save and reading lifecycle

Keep native MZ/SaveCore file selection, checkpoint ownership and interpreter cursor. Test save/resume from checkpoints naturally available in the revised opening, plus a new save in preparation. Do not create QA-only save points. If no checkpoint can capture a particular box, record that boundary rather than claiming it was replayed. Options/HIDE must preserve the current box and composition.

Do not migrate old interpreter offsets or promise old mid-prologue saves remain compatible after event restructuring. Preserve existing save files, no revision blocking and native failure behavior. Test a baseline save already in formation separately from saves created by the increment; record actual compatibility. No structural old-save conversion or automatic restart is included.

## Failure and cleanup

Missing required older-Rheed art is a delivery dependency, not permission to substitute art or ship an empty narrator. Retain native missing-image handling; do not swallow errors or add a bespoke loader. Explicitly remove owned busts/attachments before leaving the prologue without touching unrelated pictures. Retain one input per reading action and the existing no-replay behavior on return to preparation.
