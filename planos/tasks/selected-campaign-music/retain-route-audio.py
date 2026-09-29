"""Keep expedition music under Rheed's narration; run once from repository root."""
import copy
import json
from pathlib import Path

path = Path('rpg-maker/The Dryland Drowned/data/CommonEvents.json')
text = path.read_text(encoding='utf-8')
events = json.loads(text)
before = copy.deepcopy(events[67])
commands = events[67]['list']
assert commands[19]['parameters'][0]['name'] == 'Town1'
assert commands[27]['code'] == 111
prologue = commands[16]['parameters'][1]
old_narration = commands[15]['parameters'][1]
assert old_narration in commands[23]['parameters'][1]
assert old_narration in commands[27]['parameters'][1]
commands[23]['parameters'][1] = commands[23]['parameters'][1].replace(old_narration, prologue)
commands[27]['parameters'][1] = commands[27]['parameters'][1].replace(old_narration, prologue)
music = copy.deepcopy(commands[17])
music['indent'] = 1
commands[15:21] = [
    {'code': 111, 'indent': 0, 'parameters': [12, prologue]}, music,
]
old = '\n'.join('    ' + line for line in json.dumps(before, ensure_ascii=False, indent=4).splitlines())
new = '\n'.join('    ' + line for line in json.dumps(events[67], ensure_ascii=False, indent=4).splitlines())
assert text.count(old) == 1
text = text.replace(old, new, 1)
assert json.loads(text) == events
stack = []
for command in commands:
    if command['code'] == 111:
        stack.append(command['indent'])
    elif command['code'] == 411:
        assert stack[-1] == command['indent']
    elif command['code'] == 412:
        assert stack.pop() == command['indent']
assert not stack
path.write_text(text, encoding='utf-8', newline='\n')
print('CE067: route narration retains route audio; opening and tavern cues preserved.')
