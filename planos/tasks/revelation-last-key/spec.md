# Revelation — The Last Key

## Confirmed request and selected cue

After the last village trap, use a more tense track from the user's supplied music-pack folder for the great revelation, up to the final choice. The choice's future music remains undecided. Select `(Tense) The Last Key.wav` from that folder for audition; its pack classification is Tense, not an independent listening verdict.

The cue covers the entire Council/revelation, including Rheed's narration, confession, Andirá, hero opinions and Irati's last passage. It takes precedence over The Well only here; other narrator passages keep The Well. At the final-choice screen stop the revelation music; leave that moment without a newly selected score until the user supplies the later choice. Preserve outcome-specific musical themes.

## Implementation

The user additionally requested avoiding excessive loudness. Use local OGG conversion with a two-second soft entrance, full-track native looping, volume 25 (lower than route volume 35), pitch 100, centered stereo. Attenuate the source only as needed to keep pre-encoding peak at or below 0.70; do not boost quiet material. Verify decoded peak after Vorbis encoding. Preserve player volume controls; these digital levels do not measure listener device output. Original WAV untouched. The existing domain transition moves directly from the final trap's resolved outcome to phase council; Map023 refreshes Common Event 67 before Council passages and again before the final choice.

After CE67's existing queries, handle council and final_choice with native BGM/BGS commands and Exit Event Processing. This prevents another context from replacing the cue mid-revelation or restarting it on each passage. Keep ambient audio stopped. Exit affects only this common-event invocation; campaign event flow and choices remain unchanged. No engine/plugin code, new persistent flag or save schema.

This decision supersedes The Well and village-mix selections only during revelation and final choice, leaving the preceding route and other music intact. Historical specs remain unchanged.

## Verification

Implemented; scoped static checks PASS on 2026-09-30. Thirty context cases cover all 16 Council passages (including solo and all hero opinions), final choice, three routes, earlier narrator passages, tavern and ending. Each Council case selects only The Last Key at volume 25; the choice selects an empty BGM name. Structural comparison against the immediately preceding working tree confirms only ten priority audio commands were added and the uncommitted village mix remains preserved. Map023's existing loop refreshes CE67 before both the Council text and final-choice UI. Syntax and diff checks passed.

The encoded cue is stereo, 44100 Hz, 54.857 seconds. Full-file decoded peak is 0.619277, below clipping, with RMS 0.132520 before event/player volume. Source peaks are attenuated without boosting; entrance uses a two-second fade. SHA-256: CommonEvents.json `7775c23c15d03633ca8035b3d99face153e1a39125d41e7652617e84ef81b7ad`; OGG `685e9746319038f093b6719394401b86406a46f9489ed94fb28394ddd64a32b2`.

Runtime listening and artistic comfort acceptance remain pending. The Windows directed-runner limitation remains documented in opening-the-well; no completed route or listening session is claimed. No permanent presentation-only test was added, no browser/server launched and no commit created. These checks do not assert a measured listening-device level.

## Delivery and devlog

Keep the OGG, native event change, GDD decision, this incremental contract and its authoring recipes. Preserve the preceding uncommitted village mix and original source collection. Capture the final trap result, revelation with a sustained cue, and the music stopping at the choice. No commit or publication requested.

## Subsequent delivery update

The user authorized a combined local commit with final-choice-pressure. Earlier verification hashes and context results above describe their historical candidate, not the final combined data. The current final-choice cue and combined verification are recorded in final-choice-pressure/spec.md. Real listening remains pending; no remote publication requested.
