"""One-time 40% reduction of authored campaign audio and used interface sounds."""
import copy
import json
import re
from pathlib import Path

root = Path('rpg-maker/The Dryland Drowned/data')
report = []
for filename in ['CommonEvents.json', 'Map002.json', 'Map023.json', 'System.json']:
    path = root / filename
    text = path.read_text(encoding='utf-8')
    data = json.loads(text)
    before = copy.deepcopy(data)
    if filename == 'System.json':
        descriptors = [data['sounds'][i] for i in [0, 1, 2, 3, 5, 6]]
    else:
        lists = [e['list'] for e in data if e] if isinstance(data, list) else [p['list'] for e in data['events'] if e for p in e['pages']]
        descriptors = [c['parameters'][0] for commands in lists for c in commands
                       if c['code'] in [241, 245, 249, 250] and c['parameters'][0]['name']]
    replacements = {}
    for audio in descriptors:
        old = audio.copy()
        audio['volume'] = round(audio['volume'] * 0.6)
        parts = [re.escape(json.dumps(k)) + r'\s*:\s*' + re.escape(json.dumps(v, ensure_ascii=False)) for k, v in old.items()]
        pattern = r'\{\s*' + r'\s*,\s*'.join(parts) + r'\s*\}'
        replacements[pattern] = audio['volume']
        report.append({'file': filename, 'name': old['name'], 'before': old['volume'], 'after': audio['volume']})
    for pattern, volume in replacements.items():
        text, count = re.subn(pattern, lambda m: re.sub(r'("volume"\s*:\s*)\d+', lambda v: v[1] + str(volume), m[0]), text)
        assert count, pattern
    assert json.loads(text) == data, f'Unexpected changes in {filename}'
    assert data != before
    path.write_text(text, encoding='utf-8', newline='\n')
Path('planos/tasks/selected-campaign-music/reading-mix.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Reduced {len(report)} audio descriptors; only volume fields changed.')
