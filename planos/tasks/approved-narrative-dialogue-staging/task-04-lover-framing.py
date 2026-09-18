"""Fit the two supplied lover portraits in the native right-speaker aperture."""
import json
from pathlib import Path

path = Path(__file__).resolve().parents[3] / 'rpg-maker/The Dryland Drowned/data/CommonEvents.json'
events = json.loads(path.read_text())
for id in [293, 295, 297, 299]:
    commands = events[id]['list']
    for c in commands:
        if c['code'] != 357 or c['parameters'][0] != 'VisuMZ_2_VNPictureBusts':
            continue
        name, args = c['parameters'][1], c['parameters'][3]
        if name == 'Scale_ScaleTo':
            assert args['TargetScaleX:str'] == args['TargetScaleY:str'] == '100'
            args['TargetScaleX:str'] = args['TargetScaleY:str'] = '44'
        if name == 'Move_MoveToCoordinates':
            assert args['TargetX:str'] == '960' and args['TargetY:str'] == '235.6'
            args['TargetY:str'] = '454.664'
path.write_text(json.dumps(events, ensure_ascii=False, indent=4) + '\n')
