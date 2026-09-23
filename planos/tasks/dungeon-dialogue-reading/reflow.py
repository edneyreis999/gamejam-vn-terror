"""Reflow dungeon prose using the existing MessageCore wrap; --write applies."""
import argparse
import copy
import importlib.util
import json
from pathlib import Path

SPEC = Path(__file__).resolve().parent
loader = importlib.util.spec_from_file_location('a_reading', SPEC.parent / 'trap-a-description-reading/reflow.py')
a_reading = importlib.util.module_from_spec(loader)
loader.loader.exec_module(a_reading)
prose = a_reading.prose


def message_runs(commands):
    index = 0
    while index < len(commands):
        if commands[index]['code'] != 101:
            index += 1
            continue
        start, header = index, commands[index]
        index += 1
        while index < len(commands) and (commands[index]['code'] == 401 or commands[index] == header):
            index += 1
        yield start, index


def body(commands, pages):
    header = commands[0]
    assert all(c == header for c in commands if c['code'] == 101)
    assert prose.normalized(' '.join(c['parameters'][0] for c in commands if c['code'] == 401)) == prose.normalized(' '.join(pages))
    return [c for page in pages for c in [copy.deepcopy(header), dict(code=401, indent=header['indent'], parameters=[page])]]


def compact_runs(commands):
    for start, end in reversed(list(message_runs(commands))):
        old = commands[start:end]
        text = prose.normalized(' '.join(c['parameters'][0] for c in old if c['code'] == 401))
        # No merging across a speaker, event action or reading identity.
        assert len(text) <= 350, f'Requires an authored semantic split: {text}'
        commands[start:end] = body(old, [text])


def candidates():
    sources = prose.catalogue()
    for index, (identity, source) in enumerate(sources.items(), 7):
        path, _, previous = a_reading.expected_map(identity, source, index)
        desired = copy.deepcopy(previous)
        commands = desired['events'][1]['pages'][0]['list']
        for approach, text in enumerate(source['successes'], 1):
            start, end = prose.span(commands, f'result.{identity}-{approach}.success.01')
            commands[start:end] = body(commands[start:end], [text])
        first, second, question = source['description']
        start, end = prose.span(commands, f'encounter.{identity}.01')
        commands[start:end] = body(commands[start:end], [first, second + '<br>' + question])
        yield path, previous, desired
    path = prose.DATA / 'CommonEvents.json'
    previous = prose.baseline(path)
    for index, (identity, source) in enumerate(sources.items(), 266):
        prose.replace_body(previous[index]['list'], f'death.{identity}.context', source['death'])
    desired = copy.deepcopy(previous)
    for index in [*range(263,291), *range(292,303), 352,353]:
        compact_runs(desired[index]['list'])
    yield path, previous, desired
    for index in [23,25,26,27]:
        path = prose.DATA / f'Map{index:03}.json'
        previous = prose.baseline(path)
        desired = copy.deepcopy(previous)
        compact_runs(desired['events'][1]['pages'][0]['list'])
        yield path, previous, desired


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true')
    parser.add_argument('--encounters-only', action='store_true')
    args = parser.parse_args()
    for path, previous, desired in candidates():
        if args.encounters_only and path.name not in {f'Map{i:03}.json' for i in range(7,23)}:
            continue
        current = json.loads(path.read_text())
        assert current == previous or current == desired, f'Unexpected pre-edit data: {path}'
        if args.write and current != desired:
            path.write_text(json.dumps(desired, ensure_ascii=False, indent=4 if path.name == 'CommonEvents.json' else 2) + '\n')
        assert json.loads(path.read_text()) == desired, f'Candidate differs: {path}'
        def count(obj):
            lists = [e['list'] for e in obj if e] if isinstance(obj, list) else [p['list'] for e in obj['events'] if e for p in e['pages']]
            return sum(c['code'] == 101 for cs in lists for c in cs)
        print(path.name, count(previous), '->', count(desired), 'native pages; content/scope PASS')


if __name__ == '__main__':
    main()
