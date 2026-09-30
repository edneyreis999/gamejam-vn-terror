"""Convert the supplied Danger WAV with a two-second smooth opening fade.

Requires soundfile as authoring tooling, never as a game dependency.
Run from the repository root. The original WAV is read-only.
"""
from array import array
import soundfile as sf

source = 'docs/sons/Yet Another Atmospheric Horror Music Pack (WAV)/(Tense) Danger.wav'
target = 'rpg-maker/The Dryland Drowned/audio/bgm/Dryland_Church_Danger.ogg'
with sf.SoundFile(source) as original:
    fade_frames = round(2.0 * original.samplerate)
    frame = 0
    with sf.SoundFile(target, mode='w', samplerate=original.samplerate,
                      channels=original.channels, format='OGG', subtype='VORBIS') as output:
        while original.tell() < len(original):
            samples = array('f')
            samples.frombytes(bytes(original.buffer_read(4096, dtype='float32')))
            frames = len(samples) // original.channels
            for offset in range(min(frames, max(0, fade_frames - frame))):
                t = (frame + offset) / fade_frames
                gain = t * t * (3 - 2 * t)
                for channel in range(original.channels):
                    samples[offset * original.channels + channel] *= gain
            output.buffer_write(samples.tobytes(), dtype='float32')
            frame += frames
print(sf.info(target))
