"""One-time native audio staging for the approved revelation/final-choice refinement."""
import copy
import json
from pathlib import Path

root = Path('rpg-maker/The Dryland Drowned/data')
event_path = root / 'CommonEvents.json'
map_path = root / 'Map023.json'
event_text = event_path.read_text(encoding='utf-8')
map_text = map_path.read_text(encoding='utf-8')
events = json.loads(event_text)
scene = json.loads(map_text)
old_event = copy.deepcopy(events[67])
old_scene = copy.deepcopy(scene)
context = events[67]['list']
commands = scene['events'][1]['pages'][0]['list']

def command(code, indent, parameters):
    return {'code': code, 'indent': indent, 'parameters': parameters}

def music(volume, indent=3):
    return command(241, indent, [{'name': 'Dryland_VilarejoMix', 'volume': volume, 'pitch': 100, 'pan': 0}])

def ambience(volume, indent=3):
    return command(245, indent, [{'name': 'Darkness', 'volume': volume, 'pitch': 100, 'pan': 0}])

def condition(expression, body, otherwise, indent):
    return [command(111, indent, [12, expression]), *body,
            command(411, indent, []), *otherwise, command(412, indent, [])]

index = next(i for i, c in enumerate(context) if c['code'] == 241 and c['parameters'][0]['name'] == 'Dryland_VilarejoMix')
assert context[index]['parameters'][0]['volume'] == 35
assert context[index + 1] == ambience(60, 2)
context[index:index + 2] = condition(
    "$gameVariables.value(31) === 'final_choice'",
    [music(18), ambience(20)],
    condition("$gameVariables.value(31) === 'council'",
        condition("['council.02','council.confession'].includes($gameVariables.value(56))",
                  [music(15, 5), ambience(18, 5)],
                  [music(24, 5), ambience(30, 5)], 4),
        [music(35, 4), ambience(60, 4)], 3), 2)

assert not any(c['code'] == 250 and c['parameters'][0]['name'] == 'Darkness1' for c in commands)
confession = next(i for i, c in enumerate(commands) if c['code'] == 401 and 'Eu já conhecia a maldição.' in c['parameters'][0])
assert commands[confession - 1]['code'] == 101
commands.insert(confession - 1, command(250, 2, [{'name': 'Darkness1', 'volume': 22, 'pitch': 80, 'pan': 0}]))
checkpoints = [i for i, c in enumerate(commands) if c['code'] == 357 and c['parameters'][1] == 'Checkpoint' and c['parameters'][3].get('reason') == 'ending']
assert len(checkpoints) == 2
for i in reversed(checkpoints):
    assert commands[i]['indent'] == 2
    silence = [command(code, 2, [{'name': '', 'volume': 0, 'pitch': 100, 'pan': 0}]) for code in (241, 245)]
    commands[i + 1:i + 1] = [*silence, command(230, 2, [30])]

for before, after in [(old_scene['events'][1]['pages'][0]['list'], commands), (old_event['list'], context)]:
    assert [c for c in before if c['code'] in (101, 401, 102, 357)] == [c for c in after if c['code'] in (101, 401, 102, 357)]
    stack = []
    for c in after:
        if c['code'] == 111:
            stack.append(c['indent'])
        elif c['code'] == 411:
            assert stack[-1] == c['indent']
        elif c['code'] == 412:
            assert stack.pop() == c['indent']
    assert not stack

def embedded(obj):
    return '\n'.join('    ' + line for line in json.dumps(obj, ensure_ascii=False, indent=4).splitlines())

assert event_text.count(embedded(old_event)) == 1
event_text = event_text.replace(embedded(old_event), embedded(events[67]), 1)
assert json.loads(event_text) == events
assert map_text.rstrip() == json.dumps(old_scene, ensure_ascii=False, indent=2)
map_text = json.dumps(scene, ensure_ascii=False, indent=2) + '\n'
assert json.loads(map_text) == scene
event_path.write_text(event_text, encoding='utf-8', newline='\n')
map_path.write_text(map_text, encoding='utf-8', newline='\n')
print('CE067/Map023 updated. Text, choices and domain actions preserved; branches balanced.')
