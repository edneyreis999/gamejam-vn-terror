---
status: approved
stage: approved
technical_approved_under: D-025
technical_approved_on: 2026-09-24
owner: Áudio / Programação
product_approved_under: D-015/D-016
technical_approved: true
---

# Audio for the narrated epilogues

Owns the changed audio portion of RQ-010 in [spec.md](spec.md), under D-015/D-016. The user has already selected the existing present-day music and discreet audience for older Rheed. This contract, approved under D-025, develops that decision; it does not commission music, voice recording or a new mix, and it does not reopen product or editorial approval.

The [previous audio contract](../approved-narrative-dialogue-staging/approved-narrative-dialogue-staging.audio.md) remains the authority for unaffected cues, settings and historical acceptance. Its later scoped supersession points to this increment. The old delivery's listening waiver does not certify these new entry, continuation and exit paths.

## Inspected source and local cues

On 2026-09-24, CE067 queried campaign phase, route, ending, passage and reading index through `Dryland_EventBridge`. Its present branch listed prologue, route-closure and Council narration IDs, but did not include epilogues. Maps029–036/event001 already call CE067 before their epilogue staging; the shared campaign flow chooses the eligible hero map. These are static source observations, not a runtime playback result.

| Sound | Local file, relative to the game | Existing event values to preserve |
| --- | --- | --- |
| Present-day music | `audio/bgm/Town1.ogg` | Volume 45, pitch 100, pan 0 |
| Discreet audience | `audio/bgs/People2.ogg` | Volume 25, pitch 100, pan 0 |
| Opening applause, excluded from epilogues | `audio/se/Applause1.ogg` | Remains owned by the original prologue entrance |

The three files exist. Values are native event levels before the player's volume settings; they are not an assertion about perceived loudness. Keep the current four volume categories and persisted preferences. No title music is selected by this contract.

## Transition contract

| Boundary | Required behavior | Verification relation |
| --- | --- | --- |
| Ending or memorial → first eligible epilogue | Enter Town1/People2 with older Rheed's present-day staging. Preserve the preceding ending and memorial's own treatment; no early audience leak. Play no applause. | V-010 / S-004: first epilogue entry, including paths with and without a memorial when reachable. |
| One eligible hero → next eligible hero | Keep the same music/ambience context and playback continuity. Text, narrator framing and the actual eligible H1–H8 sequence change without restarting the gathering. | V-010 / S-004: consecutive heroes on one naturally reached campaign. |
| Message advance, FAST, HIDE, Options | Keep the context; honor current music/ambience settings and mute. Do not add a forced audio wait or replay a one-shot effect while restoring the interface. | V-010 with existing control/preference coverage. |
| Continue at an available campaign checkpoint leading into epilogues | Restore the context belonging to the saved campaign and native continuation. Do not invent an extra checkpoint or replay applause to rebuild presentation. | V-010 / S-004: only reachable candidate save boundaries; distinguish restoration after reload from uninterrupted playback. |
| Final eligible epilogue → credits/title | Stop the epilogue's music and audience before the next surface takes ownership. Preserve the existing credits/title treatment; do not let present narration remain audible merely because credits contain no replacement cue. | V-010 / S-004: final epilogue, credits and title cleanup. |
| Ending with no eligible epilogues | Preserve the existing memorial/credits path without starting the present context. | V-010 / S-004: exclusion/skip branch, grouped by demonstrated risk equivalence. |

This changes no campaign eligibility, order, prose or ending consequence. “Narrated” remains text in the standard dialogue box, attributed to older Rheed. Audio provides atmosphere and no essential information unavailable in text.

## Native integration proposal

Extend the existing CE067 context selection to recognize the actual epilogue phase/readings; retain the current prologue, route-closure, Council, past-location and ending branches. Keep cue selection in native events and validated campaign queries. Do not introduce a second persisted temporal-audio flag, audio manager, plugin dependency, vendor edit or global override.

CE040 hands the completed campaign to CE061, whose entry calls CE337 before the credits presentation and CE063 text scroll. The inspected credits path contains no replacement BGM/BGS cue. Put native Stop BGM/Stop BGS at this credits-entry boundary to release the outgoing epilogue context before credits, without changing ending ME or stopping between hero maps. CE067 handles entry/continuity; CE061 handles the final exit. The [programming contract](prototype-feedback-refinement.programacao.md) records these owners.

Preserve native same-track behavior and player settings. Do not treat calling a play command as proof of playback continuity; inspect the native audio objects and the observable transition. A restored browser session may recreate buffers normally; it is not required to continue wall-clock playback across a closed session. Existing ending ME and location SE stay with their owners, and applause stays outside recurring context/portrait/restore helpers.

## Evidence and completion

V-010 and S-004 in [verification.md](verification.md) own the evidence. Cover cue identity, effective volume/mute, consecutive epilogues, entry/exit cleanup and the no-epilogue branch using the relevant existing suite plus representative directed journeys. Read-only buffer observations and recordings can establish technical state; human listening judgments remain separately recorded. Neither a file listing nor historical audio acceptance proves the new paths.

Apply ADR-G006 when grouping variants. Preserve distinct outcomes for entry, same-context continuation and exit; do not require a separate complete campaign for every hero merely because eight epilogue maps exist. Record any omitted heavy repetition with its shared path, retained evidence and residual risk.

No game playback, audio capture or listening was performed for this draft. Product sound direction and native integration design are approved under D-015/D-025; technical execution and changed-path acceptance remain pending.
