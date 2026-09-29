"""Apply the approved cue selection to native Common Events from the repository root."""
import copy
import json
from pathlib import Path

path = Path('rpg-maker/The Dryland Drowned/data/CommonEvents.json')
text = path.read_text(encoding='utf-8')
events = json.loads(text)
before = copy.deepcopy(events)
entry, context = events[2]['list'], events[67]['list']
assert entry[0]['code'] == 241
assert entry[0]['parameters'][0]['name'] == ''
assert context[16]['parameters'][0]['name'] == 'Town1'
assert context[20]['parameters'][0]['name'] == 'Town3'
assert context[24]['parameters'][0]['name'] == 'Dungeon2'

def bgm(name, indent):
    return {'code': 241, 'indent': indent, 'parameters': [
        {'name': name, 'volume': 35, 'pitch': 100, 'pan': 0}]}

entry[0] = bgm('Dryland_TheWell', 0)
context[20] = bgm('Dryland_ManMadeWings', 1)
for index, name in [(32, 'Dryland_VilarejoMix'), (29, 'Dryland_ValleyOfGhosts'), (26, 'Dryland_Danger')]:
    context.insert(index, bgm(name, 2))
del context[24]
context[16:17] = [
    {'code': 111, 'indent': 1, 'parameters': [12,
        "['prologue.rheed.01','prologue.rheed.02','prologue.rheed.03'].includes($gameVariables.value(56))"]},
    bgm('Dryland_ManMadeWings', 2),
    {'code': 411, 'indent': 1, 'parameters': []},
    {**before[67]['list'][16], 'indent': 2},
    {'code': 412, 'indent': 1, 'parameters': []},
]
assert all(events[i] == before[i] for i in range(len(events)) if i not in (2, 67))
assert entry[1:] == before[2]['list'][1:]
assert context[-1] == {'code': 0, 'indent': 0, 'parameters': []}
for event_id in (2, 67):
    old = json.dumps(before[event_id], ensure_ascii=False, indent=4)
    new = json.dumps(events[event_id], ensure_ascii=False, indent=4)
    old = '\n'.join('    ' + line for line in old.splitlines())
    new = '\n'.join('    ' + line for line in new.splitlines())
    assert text.count(old) == 1, f'Unexpected formatting for CE{event_id}'
    text = text.replace(old, new, 1)
assert json.loads(text) == events
path.write_text(text, encoding='utf-8', newline='\n')
print('Updated CE002 and CE067; all other events preserved.')
