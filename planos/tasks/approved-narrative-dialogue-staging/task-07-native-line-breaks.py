"""Make the authored 78-column lines explicit to MessageCore's word wrapper."""
import copy
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DATA = ROOT / 'rpg-maker/The Dryland Drowned/data'
COUNCIL = {'council.01', 'council.02', 'council.03', 'council.challenge', 'council.solo', 'council.confession'}


def selected(passage):
    return ('.success.' in passage or passage in COUNCIL or
            passage.startswith(('closure.', 'ending.', 'epilogue.')))


def adjust(commands):
    result = copy.deepcopy(commands)
    passage = ''
    changed = 0
    for index, command in enumerate(result):
        if command['code'] == 357 and command['parameters'][1] == 'Query':
            args = command['parameters'][3]
            if args.get('kind') == 'passageRead':
                passage = args['id']
        if command['code'] == 357 and command['parameters'][1] == 'ReadingEnd':
            passage = ''
        if selected(passage) and command['code'] == 401 and result[index+1]['code'] == 401:
            text = command['parameters'][0]
            assert '<br>' not in text and len(text) <= 78
            command['parameters'][0] += '<br>'
            changed += 1
    normalize = lambda rows: re.sub(r'\s+', ' ', ' '.join(c['parameters'][0].replace('<br>', '') for c in rows if c['code'] == 401)).strip()
    assert normalize(commands) == normalize(result)
    return result, changed


def main():
    changes = {}
    for number in [*range(7,17), 23, *range(25,28), *range(29,37)]:
        path = DATA / f'Map{number:03}.json'
        document = json.loads(path.read_text())
        page = document['events'][1]['pages'][0]
        page['list'], count = adjust(page['list'])
        assert count > 0, number
        changes[path] = (document, 2)
    path = DATA / 'CommonEvents.json'
    document = json.loads(path.read_text())
    for number in [352,353]:
        document[number]['list'], count = adjust(document[number]['list'])
        assert count > 0
    changes[path] = (document, 4)
    for path, (document, indent) in changes.items():
        path.write_text(json.dumps(document, ensure_ascii=False, indent=indent)+'\n')


if __name__ == '__main__':
    main()
