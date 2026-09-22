"""Restore PR #17 visual targets in Map037 without replacing its control flow."""
import copy
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
TARGET = Path('rpg-maker/The Dryland Drowned/data/Map037.json')
BASE = '0bbba30'
REFERENCE = '85fc7b03f932337d2daaa100dc830c9b6e0c307d'
PLUGIN = 'VisuMZ_2_VNPictureBusts'
DURATION = '$gameVariables.value(47) ? 0 : 20'


def is_bust(command, name=None):
    return (command['code'] == 357 and command['parameters'][0] == PLUGIN
            and (name is None or command['parameters'][1] == name))


def restore(source):
    result = copy.deepcopy(source)
    event = result['events'][1]
    assert event['id'] == 1 and event['name'] == 'Interagir — Gorvak'
    commands = event['pages'][0]['list']
    output = []
    reduced = False
    scales = {'60': {'34': '50', '32': '45'}, '63': {'44': '50', '42': '45'}}
    entries = 0
    removed = 0
    for index, command in enumerate(commands):
        if command['code'] == 111 and command['parameters'] == [12, '$gameVariables.value(47)']:
            reduced = True
        elif command['code'] in (411, 412):
            reduced = False
        if is_bust(command):
            name, args = command['parameters'][1], command['parameters'][3]
            if name == 'Scale_ScaleTo':
                slot, = json.loads(args['PictureID:arrayeval'])
                assert args['TargetScaleX:str'] == args['TargetScaleY:str']
                args['TargetScaleX:str'] = args['TargetScaleY:str'] = scales[slot][args['TargetScaleY:str']]
                args['Duration:eval'] = '0' if reduced else DURATION
            elif name == 'Move_MoveToCoordinates':
                # Only entrance placement remains; focus changes keep the pivot fixed.
                if index >= 2 and is_bust(commands[index - 2], 'Basic_EnterBust'):
                    args['TargetY:str'] = '725'
                    assert args['Duration:eval'] == '0'
                    entries += 1
                else:
                    removed += 1
                    continue
            elif name in ('Tone_NormalBust', 'Tone_CustomToneBust'):
                args['Duration:eval'] = '0' if reduced else DURATION
        output.append(command)
    assert entries == 2 and removed > 0
    original = source['events'][1]['pages'][0]['list']
    assert [c for c in output if not is_bust(c)] == [c for c in original if not is_bust(c)]
    assert output[-1] == original[-1]
    event['pages'][0]['list'] = output
    return result


def main():
    baseline = subprocess.check_output(['git', 'show', f'{BASE}:{TARGET}'], cwd=ROOT)
    source = json.loads(baseline)
    result = restore(source)
    reference = json.loads(subprocess.check_output(['git', 'show', f'{REFERENCE}:{TARGET}'], cwd=ROOT))
    assert normal_conversation(result) == normal_conversation(reference)
    accepted_left_entry = copy.deepcopy(result)
    entries = [c['parameters'][3] for c in result['events'][1]['pages'][0]['list']
               if is_bust(c, 'Basic_EnterBust') and c['parameters'][3]['PictureID:eval'] == '63']
    assert len(entries) == 1
    assert entries[0]['Position:num'] == '2' and entries[0]['StartOffsetX:eval'] == '0'
    # Mirror the 584px approach around X=960; None mirror negates StartOffsetX.
    entries[0]['Position:num'] = '8'
    entries[0]['StartOffsetX:eval'] = '-640'
    path = ROOT / TARGET
    current = json.loads(path.read_text())
    assert current in (source, accepted_left_entry, result), 'Map037 changed independently; review before applying.'
    encoded = json.dumps(result, ensure_ascii=False, indent=4) + '\n'
    if path.read_text() == encoded:
        print('Map037 already matches the correction.')
        return
    assert json.loads(encoded) == result
    path.write_text(encoded)
    print('Updated only Map037 event001/page1 visual commands.')


def normal_conversation(data):
    commands = []
    reduced_branch = False
    for command in data['events'][1]['pages'][0]['list']:
        if command['code'] == 401 and command['parameters'] == ['Lugar velho avisa antes de cair. Prestem atenção aos estalos.']:
            break
        if command['code'] == 111 and command['parameters'] == [12, '$gameVariables.value(47)']:
            reduced_branch = True
        elif command['code'] in (411, 412):
            reduced_branch = False
        if not reduced_branch and is_bust(command):
            parameters = copy.deepcopy(command['parameters'])
            if parameters[3]['Duration:eval'] == DURATION:
                parameters[3]['Duration:eval'] = '20'
            commands.append(parameters)
    return commands


if __name__ == '__main__':
    main()
