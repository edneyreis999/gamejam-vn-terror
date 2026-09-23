"""Reflow only Pool A description bodies; --write applies, default verifies."""
import argparse
import copy
import importlib.util
import json
from pathlib import Path

SPEC = Path(__file__).resolve().parent
loader = importlib.util.spec_from_file_location('prose', SPEC.parent / 'revised-trap-prose-integration/integrate-prose.py')
prose = importlib.util.module_from_spec(loader)
loader.loader.exec_module(prose)


def expected_map(identity, source, index):
    path = prose.DATA / f'Map{index:03}.json'
    previous = prose.baseline(path)
    commands = previous['events'][1]['pages'][0]['list']
    prose.labels(commands, source['labels'])
    prose.replace_body(commands, f'encounter.{identity}.01', source['description'])
    for approach, text in enumerate(source['successes'], 1):
        prose.replace_body(commands, f'result.{identity}-{approach}.success.01', [text], True)
    desired = copy.deepcopy(previous)
    if identity.startswith('A'):
        commands = desired['events'][1]['pages'][0]['list']
        start, end = prose.span(commands, f'encounter.{identity}.01')
        header = commands[start]
        first, second, question = source['description']
        commands[start:end] = [copy.deepcopy(header),
            dict(code=401, indent=header['indent'], parameters=[first]),
            copy.deepcopy(header),
            dict(code=401, indent=header['indent'], parameters=[second + '<br>' + question])]
    return path, previous, desired


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    for index, (identity, source) in enumerate(prose.catalogue().items(), 7):
        path, previous, desired = expected_map(identity, source, index)
        current = json.loads(path.read_text())
        assert current == previous or current == desired, f'Unexpected source: {path}'
        if args.write and current != desired:
            path.write_text(json.dumps(desired, ensure_ascii=False, indent=2) + '\n')
        current = json.loads(path.read_text())
        assert current == desired, f'Candidate differs: {path}'
        if identity.startswith('A'):
            old = previous['events'][1]['pages'][0]['list']
            a, b = prose.span(old, f'encounter.{identity}.01')
            commands = current['events'][1]['pages'][0]['list']
            prose.verify_body(commands, f'encounter.{identity}.01', source['description'])
            print(identity, sum(c['code'] == 101 for c in old[a:b]), '-> 2 pages; exact wording/scope PASS')
    print('PASS: all 16 map objects match the prior integration plus only A description reflow.')


if __name__ == '__main__':
    main()
