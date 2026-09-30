"""Convert Undead Killing Spree with a softer level and three-second entrance.

Requires soundfile as authoring tooling, never as a game dependency.
Run from the repository root. The original WAV is read-only.
"""
from array import array
import soundfile as sf

source = 'docs/sons/Yet Another Atmospheric Horror Music Pack (WAV)/(Tense) Undead Killing Spree.wav'
target = 'rpg-maker/The Dryland Drowned/audio/bgm/Dryland_FinalChoice_UndeadKillingSpree.ogg'
with sf.SoundFile(source) as original:
    peak = 0.0
    while original.tell() < len(original):
        block = array('f')
        block.frombytes(bytes(original.buffer_read(4096, dtype='float32')))
        peak = max(peak, max(abs(sample) for sample in block))
    gain = min(1.0, 0.50 / peak) if peak else 1.0
    original.seek(0)
    fade_frames = round(3.0 * original.samplerate)
    frame = 0
    with sf.SoundFile(target, mode='w', samplerate=original.samplerate,
                      channels=original.channels, format='OGG', subtype='VORBIS') as output:
        while original.tell() < len(original):
            samples = array('f')
            samples.frombytes(bytes(original.buffer_read(4096, dtype='float32')))
            for index in range(len(samples)):
                samples[index] *= gain
            frames = len(samples) // original.channels
            for offset in range(min(frames, max(0, fade_frames - frame))):
                t = (frame + offset) / fade_frames
                fade_gain = t * t * (3 - 2 * t)
                for channel in range(original.channels):
                    samples[offset * original.channels + channel] *= fade_gain
            output.buffer_write(samples.tobytes(), dtype='float32')
            frame += frames
print(sf.info(target))
