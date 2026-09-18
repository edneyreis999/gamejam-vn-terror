"""Release pictures owned by the new exits after their optional animation."""
import copy
import json
from pathlib import Path

game = Path('rpg-maker/The Dryland Drowned/data')
duration = '$gameVariables.value(47) ? 0 : 20'


def repair(commands, expected_count):
    matches = [i for i, c in enumerate(commands) if c['code'] == 357
               and c['parameters'][1] == 'Basic_ExitBusts'
               and c['parameters'][3]['Duration:eval'] == duration]
    assert len(matches) == expected_count
    result = copy.deepcopy(commands)
    for i in reversed(matches):
        indent = commands[i]['indent']
        assert commands[i+1:i+4] == [
            dict(code=111, indent=indent, parameters=[12, '!$gameVariables.value(47)']),
            dict(code=230, indent=indent+1, parameters=[20]),
            dict(code=412, indent=indent, parameters=[]),
        ]
        ids = json.loads(commands[i]['parameters'][3]['PictureID:arrayeval'])
        assert commands[i+4]['code'] != 235
        result[i+4:i+4] = [dict(code=235, indent=indent, parameters=[int(slot)]) for slot in ids]
    return result


changes = []
path = game / 'CommonEvents.json'
data = json.loads(path.read_text())
for number in [263,264,265]:
    data[number]['list'] = repair(data[number]['list'], 1)
changes.append((path, data, 4))
for path, data, indent in changes:
    path.write_text(json.dumps(data, ensure_ascii=False, indent=indent, separators=None if indent else (',', ':')) + '\n')
