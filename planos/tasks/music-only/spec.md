# Music-only presentation

## Confirmed scope

On 2026-09-30 the user requested removal of placeholder sounds/effects, leaving only music. Disable authored ambient BGS and SE, including applause, crowds, location beds, contextual effects and native menu feedback. Preserve BGM and musical ending themes (ME), including The Well and Man Made Wings. Preserve volume preferences, campaign rules and stored progress. Do not delete the audio library or alter frozen plugins/engine.

## Implementation

Clear the audio names on native BGS/SE commands in Common Events and the prologue map, and clear System.json's native sound selections. Retain commands and event positions: empty BGS still stops previous ambience, while empty SE plays nothing. Keep all BGM/ME selections unchanged. Source assets stay available for future authoring. Existing saves may retain an old playing ambience until the next context refresh; verify using a reopened game and new scene.

The existing Options plugin configuration now offers only the silent database/default menu sounds; master-volume shortcut sound names are empty. This uses the delivered CLI, preserving plugin code and player volume preferences. Unused animation-library sounds remain in the asset/database library; no campaign event invokes them in this inventory.

## Verification

Static verification PASS on 2026-09-30: 36 native audio-name fields cleared across the three data files; all authored BGM/ME commands and system musical selections preserved against the immediately preceding working tree. Only audio names changed in those files. The four menu sound lists contain only Default and both shortcut sound names are empty. Other plugin entries are unchanged. Script syntax and diff whitespace checks passed. No permanent presentation test added. Runtime listening remains pending; the available directed runner's Windows path failure was already documented in opening-the-well. No browser/server launched for this task.

During authoring, a structural guard rejected a broad System-name replacement because Battle1 also names a music selection, then rejected a whitespace mismatch. Neither failed attempt wrote System.json. Restricting the replacement to the sounds array preserved all music; final structural verification passed. Local pre-change snapshots are in `.artifacts/music-only-before/` and preserve the preceding uncommitted Man Made Wings work.

## Decision and supersession

This explicit user decision supersedes the placeholder ambient/SE requirements of GDD §19.4 and the historical approved-narrative-dialogue-staging audio baseline. It also supersedes the ambience-preservation clause of the preceding prologue-tavern-man-made-wings increment. Music selection and campaign semantics remain unchanged. Historical baseline documents retain their original decisions.

## Devlog and candidate audit

Demonstrate the opening menu, prologue and tavern with music alone; record a clip with audio. Keep the three edited data files, Options configuration, GDD update, this decision and its focused authoring script. Preserve preceding uncommitted music work and supplied source tracks. The user subsequently requested a local commit of both audio increments; remote publication was not requested.
