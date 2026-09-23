"""Scoped native copy transformation; --write encounters|deaths, otherwise verify."""
import argparse
import copy
import hashlib
import json
from pathlib import Path
import re
import subprocess
import textwrap

SPEC = Path(__file__).resolve().parent
ROOT = SPEC.parents[2]
DATA = ROOT / 'rpg-maker/The Dryland Drowned/data'
BASE = '04d5253e81fcd22ec0c120b9e82bd17d2bf541c1'


def normalized(text):
    return ' '.join(text.replace('<br>', ' ').split())


def catalogue():
    result = {}
    source = (SPEC / 'source-catalogue.md').read_text()
    for chunk in source.split('# Source ')[1:]:
        identity = chunk.splitlines()[0]
        body = chunk[chunk.index('## '):].split('\n---')[0].strip()
        opening, successes = body.split('## Sucessos por abordagem')
        paragraphs = re.findall(r'^\*\*(.+)\*\*$', opening, re.M)
        question = re.findall(r'^Como .+\?$', opening, re.M)
        labels = re.findall(r'^\d\. (.+)$', opening, re.M)
        death = re.search(r'\*\*Falha(?::\*\*|\*\*:) (.+)', opening).group(1)
        outcomes = re.findall(r'^\d\. \*\*.+\*\*\n\n(.+)', successes, re.M)
        assert len(paragraphs) == 2 and len(question) == 1
        assert len(labels) == len(outcomes) == 3
        result[identity] = dict(description=paragraphs + question, labels=labels,
                                successes=outcomes, death=[death])
    assert len(result) == 16
    narrative = (SPEC / 'revised-trap-prose-integration.narrativa.md').read_text()
    result['B1']['death'] = [re.search(r'^> \*\*Falha:\*\* (.+)$', narrative, re.M).group(1)]
    return result


def baseline(path):
    return json.loads(subprocess.check_output(['git', 'show', f'{BASE}:{path.relative_to(ROOT)}'], cwd=ROOT))


def span(commands, identity):
    anchors = [i for i, c in enumerate(commands) if c['code'] == 357
               and c['parameters'][:2] == ['Dryland_EventBridge', 'Query']
               and c['parameters'][3].get('id') == identity]
    assert len(anchors) == 1, identity
    start = next(i for i in range(anchors[0] + 1, len(commands)) if commands[i]['code'] == 101)
    end = start
    while commands[end]['code'] in (101, 401):
        end += 1
    assert commands[end + 2]['parameters'][:2] == ['Dryland_Presentation', 'ReadingEnd']
    return start, end


def replace_body(commands, identity, paragraphs, preserve_matching=False):
    start, end = span(commands, identity)
    old = commands[start:end]
    actual = normalized(' '.join(c['parameters'][0] for c in old if c['code'] == 401))
    if preserve_matching and actual == normalized(' '.join(paragraphs)):
        return False
    header = old[0]
    assert all(c == header for c in old if c['code'] == 101)
    replacement = []
    for paragraph in paragraphs:
        lines = textwrap.wrap(paragraph, 68, break_long_words=False, break_on_hyphens=False)
        for offset in range(0, len(lines), 2):
            box = lines[offset:offset + 2]
            replacement.append(copy.deepcopy(header))
            replacement.extend(dict(code=401, indent=header['indent'],
                                    parameters=[line + ('<br>' if j < len(box) - 1 else '')])
                               for j, line in enumerate(box))
    commands[start:end] = replacement
    return actual != normalized(' '.join(paragraphs))


def labels(commands, expected):
    choices = [c for c in commands if c['code'] == 102 and len(c['parameters'][0]) == 5]
    assert len(choices) == 1
    for i, label in enumerate(expected):
        current = choices[0]['parameters'][0][i]
        suffix = f'<Bind Picture: {50 + i}><Hide Choice Window>'
        assert current.endswith(suffix)
        headings = [c for c in commands if c['code'] == 402 and c['parameters'] == [i, current]]
        pictures = [c for c in commands if c['code'] == 357
                    and c['parameters'][:2] == ['VisuMZ_1_MessageCore', 'PictureTextChange']
                    and c['parameters'][3]['PictureIDs:arraynum'] == f'[{50 + i}]']
        assert len(headings) == len(pictures) == 1
        choices[0]['parameters'][0][i] = label + suffix
        headings[0]['parameters'][1] = label + suffix
        args = pictures[0]['parameters'][3]
        prefix = r'\FS[22]'
        assert json.loads(args['center:json']).startswith(prefix)
        args['center:json'] = json.dumps(prefix + '\n'.join(textwrap.wrap(
            label, 65, break_long_words=False, break_on_hyphens=False)), ensure_ascii=False)


def verify_body(commands, identity, paragraphs):
    start, end = span(commands, identity)
    actual = normalized(' '.join(c['parameters'][0] for c in commands[start:end] if c['code'] == 401))
    assert actual == normalized(' '.join(paragraphs)), identity


def check_or_write(path, original, desired, write):
    current = json.loads(path.read_text())
    assert current == original or current == desired, f'Unexpected pre-edit data: {path}'
    if write:
        indent = 4 if path.name == 'CommonEvents.json' else 2
        path.write_text(json.dumps(desired, ensure_ascii=False, indent=indent) + '\n')
    assert json.loads(path.read_text()) == desired, f'Candidate differs: {path}'
    print(path.name, hashlib.sha256(path.read_bytes()).hexdigest())


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', choices=['encounters', 'deaths'])
    parser.add_argument('--scope', choices=['encounters', 'deaths', 'all'], default='all')
    args = parser.parse_args()
    scope = args.write or args.scope
    sources = catalogue()
    changed_successes = 0
    if scope in ('all', 'encounters'):
        for index, (identity, source) in enumerate(sources.items(), 7):
            path = DATA / f'Map{index:03}.json'
            original = baseline(path)
            desired = copy.deepcopy(original)
            assert len(desired['events'][1]['pages']) == 1
            commands = desired['events'][1]['pages'][0]['list']
            labels(commands, source['labels'])
            replace_body(commands, f'encounter.{identity}.01', source['description'])
            for approach, prose in enumerate(source['successes'], 1):
                changed_successes += replace_body(commands, f'result.{identity}-{approach}.success.01', [prose], True)
            check_or_write(path, original, desired, args.write == 'encounters')
            actual = json.loads(path.read_text())['events'][1]['pages'][0]['list']
            verify_body(actual, f'encounter.{identity}.01', source['description'])
            for approach, prose in enumerate(source['successes'], 1):
                verify_body(actual, f'result.{identity}-{approach}.success.01', [prose])
                a, b = span(actual, f'result.{identity}-{approach}.failure.01')
                old = original['events'][1]['pages'][0]['list']
                c, d = span(old, f'result.{identity}-{approach}.failure.01')
                assert actual[a:b] == old[c:d]
        assert changed_successes == 20
        print('PASS: 16 descriptions, 48 labels × 3 consumers, 48 successes (20 changed), 48 preserved failures.')
    if scope in ('all', 'deaths'):
        path = DATA / 'CommonEvents.json'
        original = baseline(path)
        desired = copy.deepcopy(original)
        for index, (identity, source) in enumerate(sources.items(), 266):
            assert desired[index]['id'] == index and desired[index]['name'] == f'death.{identity}.context'
            replace_body(desired[index]['list'], f'death.{identity}.context', source['death'])
        check_or_write(path, original, desired, args.write == 'deaths')
        actual = json.loads(path.read_text())
        for index, (identity, source) in enumerate(sources.items(), 266):
            verify_body(actual[index]['list'], f'death.{identity}.context', source['death'])
        print('PASS: 16 mapped death bodies, B1 exception, all unrelated Common Events preserved.')


if __name__ == '__main__':
    main()
