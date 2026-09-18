"""Recalibrate the existing per-art layouts for the approved .6 bust anchor."""
import copy
import json
import struct
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
GAME = ROOT / 'rpg-maker/The Dryland Drowned'
BASE = '82aad84dd5df2376e18d53720747fae8d8c0e9ac'
BUST = 'VisuMZ_2_VNPictureBusts'
DURATION = '$gameVariables.value(47) ? 0 : 20'


def cmd(code, args, indent=0):
    return dict(code=code, indent=indent, parameters=args)


def plugin(name, args, indent=0, owner=BUST):
    return cmd(357, [owner, name, name, args], indent)


def motion(indent):
    return plugin('MotionPreference', {'variable': '47'}, indent, 'Dryland_Presentation')


def exit_busts(ids, indent, erase=False):
    return [motion(indent), plugin('Basic_ExitBusts', {'PictureID:arrayeval': json.dumps([str(i) for i in ids]), 'EndOffsetX:eval': '0', 'EndOffsetY:eval': '0', 'EasingType:str': 'InSine', 'FlipDirection:str': 'None', 'Duration:eval': DURATION, 'AutoErase:eval': 'true'}, indent), cmd(111, [12, '!$gameVariables.value(47)'], indent), cmd(230, [20], indent+1), cmd(412, [], indent), *[cmd(235, [i], indent) for i in ids if erase]]


def is_bust(c, name=None):
    return c['code'] == 357 and c['parameters'][0] == BUST and (name is None or c['parameters'][1] == name)


def calibrate(commands):
    pictures = {c['parameters'][3]['PictureID:eval']: c['parameters'][3]['PictureName:str'] for c in commands if is_bust(c, 'Basic_EnterBust')}
    heights = {slot: struct.unpack('>II', (GAME / f'img/pictures/{name}.png').read_bytes()[16:24])[1] for slot, name in pictures.items()}
    positions = {}
    defaults = {}
    for i, c in enumerate(commands):
        if not is_bust(c, 'Move_MoveToCoordinates'):
            continue
        args = c['parameters'][3]
        slot, = json.loads(args['PictureID:arrayeval'])
        defaults.setdefault(slot, (args['TargetX:str'], args['TargetY:str']))
        for neighbor in commands[max(0, i-1):i+2]:
            if is_bust(neighbor, 'Scale_ScaleTo') and neighbor['parameters'][3]['PictureID:arrayeval'] == args['PictureID:arrayeval']:
                positions[(slot, neighbor['parameters'][3]['TargetScaleY:str'])] = (args['TargetX:str'], args['TargetY:str'])
    result = []
    for c in commands:
        if is_bust(c, 'Move_MoveToCoordinates'):
            continue
        c = copy.deepcopy(c)
        if is_bust(c, 'Basic_EnterBust') and c['indent'] == 0:
            result.append(motion(c['indent']))
            c['parameters'][3]['Duration:eval'] = DURATION
        result.append(c)
        if is_bust(c, 'Scale_ScaleTo'):
            args = c['parameters'][3]
            slot, = json.loads(args['PictureID:arrayeval'])
            x, y = positions.get((slot, args['TargetScaleY:str']), defaults[slot])
            # Preserve the independently calibrated visible rectangle when the
            # global anchor moves from the bottom to 60% of the bitmap height.
            y = float(y) - .4 * heights[slot] * float(args['TargetScaleY:str']) / 100
            result.append(plugin('Move_MoveToCoordinates', {'PictureID:arrayeval': args['PictureID:arrayeval'], 'TargetX:str': x, 'TargetY:str': f'{y:.4f}'.rstrip('0').rstrip('.'), 'EasingType:str': 'InOutSine', 'FlipDirection:str': 'None', 'Duration:eval': args['Duration:eval']}, c['indent']))
    return result


def main():
    changes = {}
    for number in range(37, 45):
        relative = f'data/Map{number:03}.json'
        path = GAME / relative
        baseline = subprocess.check_output(['git', 'show', f'{BASE}:rpg-maker/The Dryland Drowned/{relative}'], cwd=ROOT)
        assert path.read_bytes() == baseline, relative
        data = json.loads(baseline)
        old = data['events'][1]['pages'][0]['list']
        result = calibrate(old)
        output = []
        for c in result:
            if c['code'] == 119 and c['parameters'] == ['hero']:
                output += exit_busts([63], c['indent'])
            if c['code'] == 118 and c['parameters'] == ['return']:
                output.append(c)
                output += exit_busts([60, 63], c['indent'])
                continue
            if is_bust(c, 'Basic_EnterBust') and c['parameters'][3]['PictureName:str'] == 'Dryland_ivai':
                c['parameters'][3]['Duration:eval'] = DURATION
            output.append(c)
        assert [c for c in old if c['code'] in [101, 401, 102]] == [c for c in output if c['code'] in [101, 401, 102]]
        data['events'][1]['pages'][0]['list'] = output
        lines = baseline.decode().splitlines()
        indent = len(lines[1]) - len(lines[1].lstrip()) if len(lines) > 1 else None
        changes[relative] = (data, indent)

    path = GAME / 'data/CommonEvents.json'
    events = json.loads(path.read_text())
    for number in range(282, 290):
        events[number]['list'] = calibrate(events[number]['list'])
    # The three thresholds have one Ivaí line, and previously no portrait.
    for number in [263, 264, 265]:
        old = events[number]['list']
        assert not any(is_bust(c) for c in old)
        output = []
        for c in old:
            if c['code'] == 101:
                output += [plugin('Basic_EnterBust', {'PictureID:eval': '63', 'PictureName:str': 'Dryland_ivai', 'Origin:str': 'Bust', 'Position:num': '8', 'StartOffsetX:eval': '0', 'StartOffsetY:eval': '0', 'EasingType:str': 'OutSine', 'HorzMirror:str': 'None', 'Duration:eval': DURATION}), plugin('Scale_ScaleTo', {'PictureID:arrayeval': '["63"]', 'TargetScaleX:str': '44', 'TargetScaleY:str': '44', 'Duration:eval': '0'}), plugin('Move_MoveToCoordinates', {'PictureID:arrayeval': '["63"]', 'TargetX:str': '960', 'TargetY:str': '454.664', 'EasingType:str': 'InOutSine', 'FlipDirection:str': 'None', 'Duration:eval': '0'})]
            if c['code'] == 357 and c['parameters'][1] == 'ReadingEnd':
                output += exit_busts([63], c['indent'], erase=True)
            output.append(c)
        events[number]['list'] = output
    changes['data/CommonEvents.json'] = (events, 4)
    for relative, (data, indent) in changes.items():
        output = json.dumps(data, ensure_ascii=False, indent=indent, separators=None if indent else (',', ':')) + '\n'
        assert json.loads(output) == data
        (GAME / relative).write_text(output)
    print('Calibrated eight hero maps, eight farewells and three speaking thresholds.')


if __name__ == '__main__':
    main()
