"""Keep narrative portraits on the scene layer while HIDE closes the UI."""
import copy
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DATA = ROOT / 'rpg-maker/The Dryland Drowned/data'


def adjust(commands, expected_attachments, expected_moves):
    result = []
    removed = moves = 0
    for original in commands:
        command = copy.deepcopy(original)
        if command['code'] == 357:
            owner, name, _, args = command['parameters']
            if owner == 'VisuMZ_4_AttachedPictures' and name == 'MessageAddPicture':
                removed += 1
                continue
            if owner == 'VisuMZ_2_VNPictureBusts' and name == 'Move_MoveToCoordinates':
                y = args['TargetY:str']
                if y in ['-480', '-436.3636363636363']:
                    # The authored lower window starts at global y=512
                    # (window y508 plus WindowLayer y4). X already cancels.
                    args['TargetY:str'] = f'{float(y) + 512:.13f}'.rstrip('0').rstrip('.')
                    moves += 1
        result.append(command)
    assert (removed, moves) == (expected_attachments, expected_moves), (removed, moves)
    assert [c for c in commands if c['code'] in [101, 401, 102]] == [c for c in result if c['code'] in [101, 401, 102]]
    return result


def main():
    changes = {}
    for map_id, attachments, moves in [(2, 2, 7), (23, 4, 4)]:
        path = DATA / f'Map{map_id:03}.json'
        document = json.loads(path.read_text())
        page = document['events'][1]['pages'][0]
        page['list'] = adjust(page['list'], attachments, moves)
        changes[path] = (document, 2)
    path = DATA / 'CommonEvents.json'
    document = json.loads(path.read_text())
    for common_id in [352, 353]:
        document[common_id]['list'] = adjust(document[common_id]['list'], 1, 1)
    changes[path] = (document, 4)
    for path, (document, indent) in changes.items():
        path.write_text(json.dumps(document, ensure_ascii=False, indent=indent)+'\n')


if __name__ == '__main__':
    main()
