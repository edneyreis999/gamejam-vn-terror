"""Raise only final-choice music within the quieter reading mix."""
import copy
import json
from pathlib import Path

path = Path('rpg-maker/The Dryland Drowned/data/CommonEvents.json')
text = path.read_text(encoding='utf-8')
data = json.loads(text)
before = copy.deepcopy(data)
commands = data[67]['list']
matches = [i for i, c in enumerate(commands) if c['code'] == 111 and
           c['parameters'] == [12, "$gameVariables.value(31) === 'final_choice'"]]
assert len(matches) == 1
music = commands[matches[0] + 1]
assert music == {'code': 241, 'indent': 3, 'parameters': [
    {'name': 'Dryland_VilarejoMix', 'volume': 11, 'pitch': 100, 'pan': 0}]}
music['parameters'][0]['volume'] = 18

def embedded(event):
    return '\n'.join('    ' + line for line in json.dumps(event, ensure_ascii=False, indent=4).splitlines())

old = embedded(before[67])
assert text.count(old) == 1
text = text.replace(old, embedded(data[67]), 1)
assert json.loads(text) == data
path.write_text(text, encoding='utf-8', newline='\n')
print('Final choice BGM: 11 -> 18; ambience, effects and other scenes unchanged.')
