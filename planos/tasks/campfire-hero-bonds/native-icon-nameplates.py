"""Restore centered 18px names in CE038 and Map045 for the external IconSet marker."""
import json
from pathlib import Path

DATA = Path(__file__).resolve().parents[3] / 'rpg-maker/The Dryland Drowned/data'
for filename, expected in [('CommonEvents.json', 16), ('Map045.json', 16)]:
    path = DATA / filename
    data = json.loads(path.read_text())
    rows = data[38]['list'] if filename == 'CommonEvents.json' else data['events'][1]['pages'][0]['list']
    found = 0
    for command in rows:
        if command['code'] != 357 or command['parameters'][1] != 'PictureTextChange':
            continue
        args = command['parameters'][3]
        ids = json.loads(args['PictureIDs:arraynum'])
        if len(ids) != 1 or not 30 <= int(ids[0]) <= 37:
            continue
        found += 1
        if args['left:json'] == '""':
            assert 'FS[18]' in args['center:json']
            continue
        assert args['center:json'] == '""' and 'FS[16]' in args['left:json']
        args['center:json'] = args['left:json'].replace('FS[16]', 'FS[18]')
        args['left:json'] = '""'
    assert found == expected, (filename, found)
    encoded = json.dumps(data, ensure_ascii=False, indent=4) + '\n'
    assert json.loads(encoded) == data
    path.write_text(encoded)
    print(f'{filename}: {found} name labels centered at 18px; command order unchanged.')
