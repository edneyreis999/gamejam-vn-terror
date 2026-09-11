"""One-off integration of Lucas's PR #3 with the reviewed main baseline."""
import copy
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
GAME = ROOT / 'rpg-maker/The Dryland Drowned'
PR = 'b50e27593777d6310959b1a4d6375d48ba324ff0'
MAIN = 'ee70f87a6c8bd3b054cd10ed6a878d3e9c514668'
EVENTS = 'rpg-maker/The Dryland Drowned/data/CommonEvents.json'
NAMES = ['Gorvak', 'Elowen', 'Griznik', 'Seraphina', 'Bimbren', 'Liora', 'Vaelith', 'Draska']


def source(ref, path):
    return subprocess.check_output(['git', 'show', f'{ref}:{path}'], cwd=ROOT)


assert subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT).decode().strip() == PR
assert subprocess.check_output(['git', 'rev-parse', 'MERGE_HEAD'], cwd=ROOT).decode().strip() == MAIN

pr = json.loads(source(PR, EVENTS))
main = json.loads(source(MAIN, EVENTS))
assert len(main) == 80 and len(pr) == 101
assert main[38] == json.loads(source('ca4dadc4213508f644090c0fb5b8cb10f6bdce0b', EVENTS))[38]
assert pr[38]['name'] == 'Taverna — Palco'
resolved = copy.deepcopy(main)
resolved[38] = copy.deepcopy(pr[38])
for command in resolved[38]['list']:
    if command['code'] == 231 and 10 <= command['parameters'][0] <= 17:
        hero = command['parameters'][0] - 9
        assert command['parameters'][1] == f'Dryland_H{hero}'
        command['parameters'][1] = f'Dryland_Tavern_H{hero}'
        command['indent'] = 1

# Retain the authored Gorvak entrance using the current conversation slot.
entry = next(c for c in pr[5]['list'] if c['code'] == 357)['parameters'][3]
assert entry['Position:num'] == '0' and entry['StartOffsetX:eval'] == '-200'
profile = resolved[5]['list']
end = next(i for i, c in enumerate(profile) if c['code'] == 108 and c['parameters'] == ['@dryland-end'])
for command in profile[:end]:
    if command['code'] != 357:
        continue
    action, args = command['parameters'][1], command['parameters'][3]
    if action == 'Basic_EnterBust':
        for key in ['Position:num', 'StartOffsetX:eval', 'StartOffsetY:eval', 'EasingType:str', 'Duration:eval']:
            args[key] = entry[key]
    elif action == 'Move_MoveToCoordinates':
        # Installed VNPictureBusts Position 0: x=200, y=Graphics.height+5.
        args['TargetX:str'], args['TargetY:str'] = '200', '725'

sections = []
for hero in range(1, 9):
    event = resolved[hero + 4]
    current = None
    for command in event['list']:
        if command['code'] != 108:
            continue
        value = command['parameters'][0]
        if value.startswith('@dryland-section '):
            current = value.splitlines()[0].split(' ', 1)[1]
        elif value.startswith('@status '):
            assert current in [f'{kind}.H{hero}' for kind in ['profile', 'speech', 'selection', 'party_full']]
            command['parameters'][0] = '@status provisional'
            sections.append(current)
assert len(sections) == 32
assert resolved[68:80] == main[68:80]
for index in range(1, len(main)):
    if index not in {*range(5, 13), 38}:
        assert resolved[index] == main[index]
for index in range(5, 13):
    assert [c for c in resolved[index]['list'] if c['code'] in [101, 401]] == [
        c for c in main[index]['list'] if c['code'] in [101, 401]]

for hero, name in enumerate(NAMES, 1):
    rel = 'rpg-maker/The Dryland Drowned/img/pictures/'
    original = source(MAIN, f'{rel}Dryland_H{hero}.png')
    assert source(PR, f'{rel}h{hero}-{name}.png') == original
    authored = source(PR, f'{rel}Dryland_H{hero}.png')
    pictures = GAME / 'img/pictures'
    (pictures / f'Dryland_Tavern_H{hero}.png').write_bytes(authored)
    (pictures / f'Dryland_H{hero}.png').write_bytes(original)
    assert (pictures / f'h{hero}-{name}.png').read_bytes() == original

text = '[\n' + ',\n'.join(json.dumps(event, ensure_ascii=False, separators=(',', ':')) for event in resolved) + '\n]\n'
assert json.loads(text) == resolved
(GAME / 'data/CommonEvents.json').write_text(text)
print('Resolved CE5–12/38; 12 main helpers, 16 Lucas image payloads and all spoken text preserved.')
