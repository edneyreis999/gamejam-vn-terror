---
status: approved
---

# Configuration and integration contract

Owns RQ-001/002/004 integration and verification support in [spec.md](spec.md).
D-009 authorizes only native capabilities. The Coreto provider stack is a
delivered prerequisite owned by separate work (D-013, D-014).

Allowed production surfaces: the Message Localization/LanguageImages parameters
and the Options categories in `js/plugins.js`, native database
and event data, `Languages.tsv`, and localized assets where required. All engine,
Coreto, VisuMZ and Dryland plugin source bytes remain unchanged. No new plugin,
JavaScript callback logic, helper, test adapter, runner or generator is authored.
CLI serialization of existing callbacks as inherited data is permitted; changing
their logic is not.

Discovery sequence: namespace help/catalog → current parameter read → edit dry
run → inspect planned diff → apply through CLI → reread and validate. Do not
install, reorder, disable or reconfigure providers, and do not touch
migration-side data edits such as `PictureIDs` serialization (D-014). Report any
provider-baseline defect found while localizing to the migration owner.

Language table creation/validation and text/choice/plugin-command authoring use
the Coreto CLI. Edit table cells as UTF-8 data because the installed CLI exposes
no cell-write operation. Native MZ editor/data editing handles uncovered fields;
do not build a new tool to cover CLI gaps. On conflicting event hashes, reread
the command and preserve its native structure before retrying.

Preserve event eligibility, command IDs, branch indices, picture bindings,
domain identities, observed reading IDs and autosave checkpoints. Route/encounter
display names may become unresolved translation keys; rules still use original
IDs. Native renderer owns localization after variable expansion. Verify those
paths rather than modifying the domain plugins.

Do not rewrite personal saves or claim old-save migration. Use only candidate
campaigns and their own generated saves for QA. Continue in the other language must
retain the current file and prevent duplicate campaign effects.

Validation uses existing CLI checks of authored data, applicable game tests,
read-only inspection and browser inputs. D-011/D-014 exclude plugin-internal
testing and provider-baseline qualification. Missing native capability is a documented blocker or design question;
it does not authorize a patch. See [verification](verification.md).
