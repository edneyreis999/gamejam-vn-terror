"""Use the authorized confined portraits in the four native lover passages."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[3]
path = root / 'rpg-maker/The Dryland Drowned/data/CommonEvents.json'
events = json.loads(path.read_text())
targets = {
    293: ('lover.physical.warning', 'Dryland_perola', 'Dryland_perola_confined'),
    295: ('lover.physical.second', 'Dryland_perola', 'Dryland_perola_confined'),
    297: ('lover.supernatural.warning', 'Dryland_florai', 'Dryland_florai_confined'),
    299: ('lover.supernatural.second', 'Dryland_florai', 'Dryland_florai_confined'),
}
before = json.loads(path.read_text())
for event_id, (name, original, confined) in targets.items():
    event = events[event_id]
    assert event['name'] == name
    assert (path.parent.parent / 'img/pictures' / (confined + '.png')).is_file()
    entries = [c for c in event['list'] if c['code'] == 357
               and c['parameters'][:2] == ['VisuMZ_2_VNPictureBusts', 'Basic_EnterBust']]
    assert len(entries) == 2
    for command in entries:
        args = command['parameters'][3]
        assert args['PictureID:eval'] == '63'
        assert args['PictureName:str'] in (original, confined)
        args['PictureName:str'] = confined
    print(event_id, name, confined)
for event_id, event in enumerate(events):
    if event_id not in targets:
        assert event == before[event_id]
serialized = json.dumps(events, ensure_ascii=False, indent=4) + '\n'
assert json.loads(serialized) == events
path.write_text(serialized)
