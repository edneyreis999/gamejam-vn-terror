# A2 introduction footsteps

The user selected `Crunching_footsteps__#3-1793828398841.wav` and requested the same playback behavior as the A3 introduction. During the A2 description, including rereading, the footsteps loop until the escape choices appear. Route music continues and route ambience returns for the choices.

Map008 event 1 uses the same native BGS start and stop points as Map009. The supplied WAV was encoded as local Vorbis in `audio/bgs/Dryland_A2_Passos_Folhas.ogg`, at event volume 90, pitch 100 and pan 0. The encoded file decoded successfully. A structural comparison confirmed that the only map changes were the two audio commands.

Suggested capture: record the A2 dialogue through the escape choices to hear the footsteps stop at the transition. In-game listening acceptance is pending.

Verification: IT-087 passed on the local Chrome game in 201 seconds with one browser and one worker. The native validators reported the same existing CommonEvents and CreditsPage findings recorded for A3. See the [runner receipt](../../../.artifacts/a2-intro-footsteps-chrome/run.json).
