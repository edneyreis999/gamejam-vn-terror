"""Correct only tavern menu cancellation in the current Map037–044 candidate."""
import json
from pathlib import Path

DATA = Path(__file__).resolve().parents[3] / 'rpg-maker/The Dryland Drowned/data'
updates = []
for map_id in range(37, 45):
    path = DATA / f'Map{map_id:03}.json'
    original = path.read_text()
    data = json.loads(original)
    assert json.dumps(data, ensure_ascii=False, indent=4) + '\n' == original, path
    commands = data['events'][1]['pages'][0]['list']
    menus = [c for c in commands if c['code'] == 102
             and '$[choice.conv.back]' in c['parameters'][0]]
    assert len(menus) == 1, path
    parameters = menus[0]['parameters']
    assert len(parameters[0]) == 5 and parameters[0][4] == '$[choice.conv.back]', path
    assert parameters[1] in (2, 4), path
    parameters[1] = 4
    updated = json.dumps(data, ensure_ascii=False, indent=4) + '\n'
    assert json.loads(updated) == data
    updates.append((path, original, updated))

for path, original, updated in updates:
    if updated != original:
        path.write_text(updated)
    assert path.read_text() == updated
    print(f'{path.name}: cancel → Voltar (4)')
