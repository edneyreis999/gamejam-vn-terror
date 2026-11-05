# B3 memory fire

The user selected the synthesized fire preview with reduced crackles, requested a soft mix and then specified its timing. Start when enc.b3.intro.2 appears, where Griznik describes the memories catching fire. The Rheed fallback uses the same timing. Continue through the approach choices and stop only after CHOOSE_APPROACH succeeds. Rereading keeps the fire.

Map017 owns the native BGS commands. Its normal audio-context call skips encounter_choice so CE67 cannot replace the fire while the player decides. Other phases retain their audio context. The stop command is inside the existing successful-action branch, before the checkpoint.

The local asset is Dryland_B3_Fogo_Suave.ogg. The selected preview has crackles at 20% of their initial amplitude. A low-pass filter at 1.8 kHz, a further 2 dB reduction and event volume 55 provide the soft prototype mix. Pitch is 100 and pan is 0.

Audio decoding and authored command boundaries were checked. Native validators retain the previously documented CommonEvents and missing CreditsPage findings. No browser walk was performed for this timing adjustment. Listening acceptance is pending.

Suggested capture: begin Griznik's second line, hear the fire with that line and through the remaining dialogue and approach choices, then confirm one approach and hear it stop.

After the user reported not hearing the change, HTTP inspection confirmed both start commands and the audio file were served successfully. The audio mean was -34.1 dBFS before native volume attenuation. Event volume was raised from 55 to 75 on both speaker branches to make the soft fire more perceptible.
