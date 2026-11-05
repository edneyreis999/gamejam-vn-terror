# A4 introduction roar

The user's supplied `Monster_roar_#1-1793829285371.wav` plays when the party first reacts to the roar in A4, including during rereading. It loops until the escape choices. Route music continues and route ambience returns at the choices.

Map010 event 1 starts native BGS before `enc.a4.intro.3` and stops it after ReadingEnd. The local Vorbis asset `Dryland_A4_Rugido_Mapinguari.ogg` reduces the source level by 5 dB, softens its high frequencies, fades both edges and adds five seconds of silence after the six-second clip. The encoded 11-second stereo file decoded successfully. A structural comparison confirmed that only two audio commands were added to the map.

Suggested capture: record the dialogue where the party hears the roar, pause long enough to hear one repetition, then advance to the escape choices. In-game listening acceptance is pending.

IT-087 passed in local Chrome in 201 seconds with one browser and one worker. Native validators reported the same existing CommonEvents and CreditsPage findings as A2. See the [runner receipt](../../../.artifacts/a4-intro-roar-chrome/run.json).
