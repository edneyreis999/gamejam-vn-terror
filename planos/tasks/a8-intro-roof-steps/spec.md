# A8 roof footsteps

The user supplied `Heavy_footsteps_on_a_#2-1793895979202.wav` and requested a softer, discreet sound in A8. Native BGS starts before the first introduction dialogue and stops after ReadingEnd, including when rereading. Route music continues and route ambience returns at the choices.

The local `Dryland_A8_Passos_Telhado.ogg` reduces the source level by 7 dB, softens frequencies above 2.2 kHz and fades its edges. Event volume is 85, raised from 75 at the user’s request after listening. Pitch is 100 and pan is 0. The source rhythm is retained. The encoded asset decoded successfully. Structural comparison confirmed that only the two audio commands were added to Map014.

Suggested capture: record A8 from the first dialogue through escape choices, then reread. Human listening acceptance is pending.

IT-049 and IT-087 were launched concurrently through the maintained runner. Both child processes exited with Windows status 0xC000013A before producing a scenario result. Runtime verification remains incomplete. The receipt is in `.artifacts/a8-intro-roof-steps-chrome/run.json`. Static validators retain the previously documented CommonEvents and missing CreditsPage findings. Audio decoding, scoped map comparison and diff whitespace checks passed.
