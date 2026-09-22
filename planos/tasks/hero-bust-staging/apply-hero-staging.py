"""Copy accepted Gorvak presentation into seven hero visits, preserving their events."""
import copy
import hashlib
import json
import struct
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DATA = Path('rpg-maker/The Dryland Drowned/data')
BASE = '0bbba30'
REFERENCE_HASH = '765dc8dbcf136a0dc5cfd09dd7fd33a364912594b9118ee4d363f7ad1b34da7b'
PLUGIN = 'VisuMZ_2_VNPictureBusts'
HERO_Y = {38: '862.7', 43: '948.91'}
FRAMES = {
    38: ('Elowen', 250, '40', '36', 3840),
    39: ('Griznik', 320, '45.46', '40.91', 2147),
    40: ('Seraphina', 355, '35.97', '32.37', 3840),
    41: ('Bimbren', 345, '54', '48.6', 2354),
    42: ('Liora', 342, '42.74', '38.47', 2397),
    43: ('Vaelith', 395, '43.24', '38.92', 3840),
    44: ('Draska', 280, '46.39', '41.75', 2136),
}


def is_bust(command, name=None):
    return (command['code'] == 357 and command['parameters'][0] == PLUGIN
            and (name is None or command['parameters'][1] == name))


def stage(source, reference, number):
    name, x, speaking, listening, _ = FRAMES[number]
    result = copy.deepcopy(source)
    event = result['events'][1]
    assert event['name'] == f'Interagir — {name}' and event['id'] == 1
    commands = event['pages'][0]['list']
    output = []
    visual = iter(reference)
    for index, command in enumerate(commands):
        if not is_bust(command):
            output.append(command)
            continue
        if is_bust(command, 'Move_MoveToCoordinates') and not is_bust(commands[index - 2], 'Basic_EnterBust'):
            continue
        accepted = next(visual)
        assert command['parameters'][1] == accepted['parameters'][1]
        assert command['indent'] == accepted['indent']
        replacement = copy.deepcopy(accepted)
        args = replacement['parameters'][3]
        if args.get('PictureID:eval') == '60':
            args['PictureName:str'] = f'Dryland_H{number - 36}'
        if args.get('PictureID:arrayeval') == '["60"]':
            if replacement['parameters'][1] == 'Scale_ScaleTo':
                scale = {'50': speaking, '45': listening}[args['TargetScaleY:str']]
                args['TargetScaleX:str'] = args['TargetScaleY:str'] = scale
            elif replacement['parameters'][1] == 'Move_MoveToCoordinates':
                args['TargetX:str'] = str(x)
                args['TargetY:str'] = HERO_Y.get(number, '725')
        output.append(replacement)
    assert next(visual, None) is None
    original = source['events'][1]['pages'][0]['list']
    assert [c for c in output if not is_bust(c)] == [c for c in original if not is_bust(c)]
    event['pages'][0]['list'] = output
    return result


def main():
    reference_bytes = (ROOT / DATA / 'Map037.json').read_bytes()
    assert hashlib.sha256(reference_bytes).hexdigest() == REFERENCE_HASH
    reference = [c for c in json.loads(reference_bytes)['events'][1]['pages'][0]['list'] if is_bust(c)]
    pending = []
    for number, (name, _, _, _, height) in FRAMES.items():
        target = DATA / f'Map{number:03}.json'
        source = json.loads(subprocess.check_output(['git', 'show', f'{BASE}:{target}'], cwd=ROOT))
        image = ROOT / 'rpg-maker/The Dryland Drowned/img/pictures' / f'Dryland_H{number - 36}.png'
        assert struct.unpack('>II', image.read_bytes()[16:24])[1] == height
        result = stage(source, reference, number)
        current = json.loads((ROOT / target).read_text())
        assert current in (source, result), f'{target} changed independently; review before applying.'
        encoded = json.dumps(result, ensure_ascii=False, separators=(',', ':')) + '\n'
        assert json.loads(encoded) == result
        pending.append((target, encoded))
    for target, encoded in pending:
        path = ROOT / target
        if path.read_text() != encoded:
            path.write_text(encoded)
            print(f'Updated {target.name} visual commands.')
        else:
            print(f'{target.name} already matches accepted staging.')


if __name__ == '__main__':
    main()
