---
status: approved
---

# Configuration and integration contract

Owns RQ-001/002/004 integration and verification support in [spec.md](spec.md).
D-009 authorizes only native capabilities; D-017 opens every parameter, tag and
callback parameter of the active Coreto plugins, with parameters and tags
preferred over JavaScript. The Coreto provider stack is a delivered prerequisite
owned by separate work (D-013, D-014), frozen at the recorded D-020 baseline
commit.

Allowed production surfaces: any parameter of the active Coreto plugins in
`js/plugins.js` (D-017), native database and event data, `System.json`, the
`index.html` title (D-019), the `package.json` window title (D-022d),
`Languages.tsv`, and localized assets where required. All engine, Coreto, VisuMZ and Dryland plugin source bytes remain
unchanged. No new plugin, helper, test adapter, runner or generator is authored,
and the plugin registry is not reordered. Prefer string fields and tags. Change
a callback parameter only when no string field or tag covers the need, and
record every changed path with its reason.

Discovery sequence: namespace help/catalog → current parameter read → edit dry
run → inspect planned diff → apply through CLI → reread and validate. Do not
install, reorder, disable or requalify providers, and do not revert or reformat
the migration's own changes, such as `PictureIDs` serialization (D-014).
Measure every diff against the D-020 baseline commit. Report any
provider-baseline defect that no parameter or tag resolves to the migration
owner.

Language table creation/validation and text/choice/plugin-command authoring use
the Coreto CLI. Edit table cells as UTF-8 data because the installed CLI exposes
no cell-write operation. Native MZ editor/data editing handles uncovered fields;
do not build a new tool to cover CLI gaps. On conflicting event hashes, reread
the command and preserve its native structure before retrying.

Apply the D-018 key and markup model. Choice control tags and block wrappers
stay in the event around `$[key]`. Show Text is keyed per block. Multi-line
picture text uses `<WordWrap>` in the wrapper. Preserve event eligibility,
command IDs, branch indices, picture bindings, domain identities, observed
reading IDs and autosave checkpoints. Route/encounter
display names may become unresolved translation keys; rules still use original
IDs. Native renderer owns localization after variable expansion. Verify those
paths rather than modifying the domain plugins. Player-facing literals assigned
by Control Variables (Script) hold the unresolved key as their value, edited as
native data; the source map records each variable and its assigners (D-023a/c).

Do not rewrite personal saves or claim old-save migration. Use only candidate
campaigns and their own generated saves for QA, always served from the worktree
on port 18737 (D-020). Continue in the other language must
retain the current file and prevent duplicate campaign effects.

Validation uses existing CLI checks of authored data, applicable game tests,
read-only inspection and browser inputs. D-011/D-014 exclude plugin-internal
testing and provider-baseline qualification. Missing native capability is a documented blocker or design question;
it does not authorize a patch. See [verification](verification.md).
