"""Bake the two supplied route tracks into one village BGM.

Run at repository root with soundfile available as authoring tooling.
Source WAV files are read-only; the game only needs the generated OGG.
"""
from array import array
import hashlib
import json
import math
from pathlib import Path
import soundfile as sf

source_dir = Path('docs/sons/Yet Another Atmospheric Horror Music Pack (WAV)')
sources = [source_dir / '(Tense) Danger.wav',
           source_dir / '(Ambience) The Valley of Ghosts Origin.wav']
tracks = []
formats = []
for path in sources:
    with sf.SoundFile(path) as audio:
        samples = array('f')
        samples.frombytes(bytes(audio.buffer_read(len(audio), dtype='float32')))
        tracks.append(samples)
        formats.append((audio.samplerate, audio.channels))
assert formats[0] == formats[1] == (44100, 2)
rate, channels = formats[0]
danger, park = tracks
fade = 2 * rate
danger_frames = len(danger) // channels
period = danger_frames - fade
frames = len(park) // channels
rms = [math.sqrt(sum(v * v for v in track) / len(track)) for track in tracks]
target_rms = min(rms)
gains = [target_rms / value for value in rms]

def smooth(value):
    value = max(0.0, min(1.0, value))
    return value * value * (3 - 2 * value)

mixed = array('f')
for frame in range(frames):
    position = frame % period
    cross = smooth(position / fade)
    envelope = smooth(frame / fade) * smooth((frames - 1 - frame) / fade)
    for channel in range(channels):
        church = danger[position * channels + channel]
        if position < fade:
            tail = danger[(period + position) * channels + channel]
            church = tail * (1 - cross) + church * cross
        value = church * gains[0] + park[frame * channels + channel] * gains[1]
        mixed.append(value * envelope)

peak = max(abs(value) for value in mixed)
headroom_gain = min(1.0, 0.85 / peak)
for index in range(len(mixed)):
    mixed[index] *= headroom_gain
target = Path('rpg-maker/The Dryland Drowned/audio/bgm/Dryland_Village_Combined.ogg')
with sf.SoundFile(target, mode='w', samplerate=rate, channels=channels,
                  format='OGG', subtype='VORBIS') as output:
    for offset in range(0, len(mixed), 4096 * channels):
        output.buffer_write(mixed[offset:offset + 4096 * channels].tobytes(), dtype='float32')

with sf.SoundFile(target) as audio:
    assert (len(audio), audio.samplerate, audio.channels) == (frames, rate, channels)
    decoded_peak = 0.0
    while audio.tell() < len(audio):
        block = array('f')
        block.frombytes(bytes(audio.buffer_read(4096, dtype='float32')))
        decoded_peak = max(decoded_peak, max(abs(value) for value in block))
assert decoded_peak < 1.0
report = {
    'durationSeconds': frames / rate, 'sampleRate': rate, 'channels': channels,
    'sourceRms': rms, 'layerGains': gains, 'headroomGain': headroom_gain,
    'decodedPeak': decoded_peak, 'fadeSeconds': 2,
    'sourceSha256': {str(path): hashlib.sha256(path.read_bytes()).hexdigest() for path in sources},
    'outputSha256': hashlib.sha256(target.read_bytes()).hexdigest(),
}
Path('.artifacts').mkdir(exist_ok=True)
Path('.artifacts/village-mix.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
