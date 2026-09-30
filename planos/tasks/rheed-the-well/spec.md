# Rheed narration — The Well

## Confirmed decision

The user requested a commit of the park music and replacement of Rheed's narration music with the opening track, The Well. Apply this to the existing present-day narrator contexts, including the prologue, both route closures and Council narration. Young Rheed's past dialogue remains on the local scene's music.

This supersedes the prologue narrator selection from prologue-tavern-man-made-wings and the later narrator Town1 baseline from approved-narrative-dialogue-staging. Preserve their historical records. Reuse the existing opening OGG with native looping and existing mix levels: 35 for prologue narration and 45 for later narration. Keep the opening, tavern/past dialogue, church, park, final route, ending themes and disabled effects unchanged.

## Implementation and verification

Replace only the two BGM names in Common Event 67's narrator branch. No engine/plugin edits, new assets or save changes. Static verification PASS: 39 representative contexts cover all nine narrator passages, nine expedition phases across all three routes, tavern, past prologue dialogue and ending. Structural comparison against the preceding working tree confirms exactly two BGM names changed. Syntax and diff checks passed. Final CommonEvents SHA-256: `fc5f6ae70b6025468bd39c39dfd90b106a05c39e77aa09e4ae467638fb31035c`. No permanent presentation test is added. Real playback and artistic acceptance of the new narrator selection remain pending; do not turn the prior Windows runner limitation into a passed journey.

## Delivery

Include the focused data change, this incremental decision and authoring script with the park delivery in one authorized local commit. Leave docs/sons outside the candidate. No remote publication requested. Suggested devlog clip: The Well under older Rheed, then the scene-specific music when narration returns to the past. No browser/server needed for these static checks.
