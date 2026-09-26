"""Apply/verify the approved native-copy increment against its pinned intake.

Run from any directory with Python 3; --write applies, default checks only.
This is an offline authoring transformation, never a runtime text catalogue.
"""
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
BASE = '114d7aa6e7401c8b1f19d6bf5cfd7870ca805590'


def normalized(text):
    return ' '.join(text.replace('<br>', ' ').strip('“”').split())


def sources():
    inventory = (SPEC / 'source-analysis.md').read_text()
    traps, heroes = {}, {}
    files = sorted((ROOT / 'docs/narrativa/armadilhas').glob('## *.md'))
    hero_file = ROOT / 'docs/narrativa/herois/# Falas de cada herói.md'
    for file in files + [hero_file]:
        assert hashlib.sha256(file.read_bytes()).hexdigest() in inventory, f'Source drift: {file}'
    for file in files:
        lines = [re.sub(r'^#+\s*', '', line).replace('**', '').strip()
                 for line in file.read_text().splitlines() if line.strip()]
        identity = re.match(r'([AB][1-8])\.', lines[0]).group(1)
        numbered = [i for i, line in enumerate(lines) if re.match(r'^\d\. ', line)]
        assert len(numbered) == 6, identity
        failure = next(line.removeprefix('Falha: ') for line in lines if line.startswith('Falha: '))
        description = lines[1:numbered[0]]
        assert len(description) == 3 and description[-1].endswith('?'), identity
        successes = [lines[i + 1] for i in numbered[3:]]
        assert all(not re.match(r'^\d\.', text) for text in successes)
        traps[identity] = dict(description=description, labels=[lines[i][3:] for i in numbered[:3]],
                               successes=successes, death=[failure])
    parts = re.split(r'^H([1-8]) — ', hero_file.read_text(), flags=re.M)
    for number, body in zip(parts[1::2], parts[2::2]):
        name = body.splitlines()[0]
        utterances = re.findall(r'^([^:\n]+): (.+)$', body, re.M)
        assert len(utterances) == 11 and [s for s, _ in utterances[:6]] == ['Ivaí', name, 'Ivaí', name, name, name]
        assert all(s == name for s, _ in utterances[6:])
        heroes['H' + number] = dict(name=name, presentation=utterances[:6], selected=[utterances[6][1]],
                                   full=[utterances[7][1]], farewell=[utterances[8][1]],
                                   opinion=[text for _, text in utterances[9:]])
    assert len(traps) == 16 and len(heroes) == 8
    contract = (SPEC / 'updated-narrative-copy.narrativa.md').read_text()
    failures = dict(re.findall(r'^\| `(result\.[^`]+)` \| (.+) \|$', contract, re.M))
    memorial = {int(n): text for n, text in re.findall(r'^\| CE(125|161), `[^`]+` \| (.+) \|$', contract, re.M)}
    assert len(failures) == 6 and len(memorial) == 2
    return traps, heroes, failures, memorial


def baseline(path):
    return json.loads(subprocess.check_output(['git', 'show', f'{BASE}:{path.relative_to(ROOT)}'], cwd=ROOT))


def plugin(command, name):
    return command['code'] == 357 and command['parameters'][1] == name


def one(indices, label):
    assert len(indices) == 1, (label, indices)
    return indices[0]


def passage_span(commands, identity):
    anchor = one([i for i, c in enumerate(commands) if plugin(c, 'Query')
                  and c['parameters'][3].get('kind') == 'passageRead'
                  and c['parameters'][3].get('id') == identity], identity)
    start = next(i for i in range(anchor + 1, len(commands)) if commands[i]['code'] == 101)
    end = start
    while commands[end]['code'] in (101, 401):
        end += 1
    return start, end


def message(header, text):
    return [copy.deepcopy(header), dict(code=401, indent=header['indent'], parameters=[text])]


def replace_passage(commands, identity, paragraphs):
    start, end = passage_span(commands, identity)
    old = normalized(' '.join(c['parameters'][0] for c in commands[start:end] if c['code'] == 401))
    if old != normalized(' '.join(paragraphs)):
        commands[start:end] = [c for paragraph in paragraphs for c in message(commands[start], paragraph)]
    start, end = passage_span(commands, identity)
    assert normalized(' '.join(c['parameters'][0] for c in commands[start:end] if c['code'] == 401)) == normalized(' '.join(paragraphs)), identity


def observation(commands, unit):
    start = one([i for i, c in enumerate(commands) if plugin(c, 'ObservationBegin')
                 and c['parameters'][3]['unit'] == str(unit)], unit)
    end = next(i for i in range(start + 1, len(commands)) if plugin(commands[i], 'ObservationComplete'))
    return start, end


def replace_observation(commands, unit, paragraphs):
    start, end = observation(commands, unit)
    headers = [i for i in range(start, end) if commands[i]['code'] == 101]
    assert len(headers) == len(paragraphs)
    for i, text in reversed(list(zip(headers, paragraphs))):
        assert commands[i + 1]['code'] == 401 and commands[i + 2]['code'] != 401
        commands[i + 1]['parameters'][0] = text


def labels(commands, expected):
    choice = commands[one([i for i, c in enumerate(commands) if c['code'] == 102 and len(c['parameters'][0]) == 5], 'approaches')]
    for i, label in enumerate(expected):
        old = choice['parameters'][0][i]
        suffix = f'<Bind Picture: {50 + i}><Hide Choice Window>'
        assert old.endswith(suffix)
        branch = commands[one([j for j, c in enumerate(commands) if c['code'] == 402 and c['parameters'] == [i, old]], label)]
        picture = commands[one([j for j, c in enumerate(commands) if plugin(c, 'PictureTextChange')
                                and c['parameters'][3]['PictureIDs:arraynum'] == f'[{50+i}]'], label)]
        if old != label + suffix:
            choice['parameters'][0][i] = branch['parameters'][1] = label + suffix
            picture['parameters'][3]['center:json'] = json.dumps(r'\FS[22]' + '\n'.join(textwrap.wrap(
                label, 65, break_long_words=False, break_on_hyphens=False)), ensure_ascii=False)
        assert normalized(json.loads(picture['parameters'][3]['center:json']).removeprefix(r'\FS[22]')) == label


def hero_conversation(commands, number, source):
    profile, conversation = 82 + number * 4, 83 + number * 4
    begin, end = observation(commands, profile)
    # The hero is already present at menu entry. Its profile-only focus and
    # preload repeat that setup; the retained dialogue prepares both speakers.
    start = begin
    while commands[start - 1]['code'] in (108, 408):
        start -= 1
    assert commands[end + 1]['code'] == 117 and commands[end + 1]['parameters'] == [44]
    del commands[start:end + 2]
    begin, end = observation(commands, conversation)
    headers = [i for i in range(begin, end) if commands[i]['code'] == 101]
    assert len(headers) == 5
    assert [commands[i]['parameters'][4] for i in headers] == ['Ivaí', source['name'], 'Ivaí', source['name'], source['name']]
    for i, (speaker, text) in reversed(list(zip(headers, source['presentation'][:5]))):
        assert commands[i + 1]['code'] == 401 and commands[i + 2]['code'] != 401
        commands[i]['parameters'][4] = speaker
        commands[i + 1]['parameters'][0] = text
    # Same speaker keeps the existing focus; the added final utterance belongs
    # to the same observation and precedes its single completion.
    final = headers[-1] + 2
    commands[final:final] = message(commands[headers[-1]], source['presentation'][5][1])
    replace_observation(commands, conversation + 1, source['selected'])
    replace_observation(commands, conversation + 2, source['full'])
    units = [int(c['parameters'][3]['unit']) for c in commands if plugin(c, 'ObservationBegin')]
    assert units == [conversation, conversation + 1, conversation + 2]
    assert len([c for c in commands if plugin(c, 'ObservationComplete')]) == 3


def verify_grammar(value, common_events):
    lists = [event['list'] for event in value if event] if common_events else [
        page['list'] for event in value['events'] if event for page in event['pages']]
    for commands in lists:
        assert commands[-1]['code'] == 0
        labels = [c['parameters'][0] for c in commands if c['code'] == 118]
        assert len(labels) == len(set(labels))
        assert all(c['parameters'][0] in labels for c in commands if c['code'] == 119)
        branches = []
        for c in commands:
            if c['code'] in (111, 102, 112):
                branches.append((c['code'], c['indent']))
            elif c['code'] in (412, 404, 413):
                assert branches.pop() == ({412: 111, 404: 102, 413: 112}[c['code']], c['indent'])
        assert not branches


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    traps, heroes, failures, memorial = sources()
    desired, originals = {}, {}
    for n in list(range(7, 24)) + list(range(37, 45)):
        path = DATA / f'Map{n:03}.json'
        originals[path] = baseline(path)
        desired[path] = copy.deepcopy(originals[path])
    ce_path = DATA / 'CommonEvents.json'
    originals[ce_path] = baseline(ce_path)
    desired[ce_path] = copy.deepcopy(originals[ce_path])
    ce = desired[ce_path]
    for n, (identity, source) in enumerate(traps.items()):
        commands = desired[DATA / f'Map{n+7:03}.json']['events'][1]['pages'][0]['list']
        labels(commands, source['labels'])
        replace_passage(commands, f'encounter.{identity}.01', source['description'])
        for approach, success in enumerate(source['successes'], 1):
            paragraphs = [success]
            if identity in ('B4', 'B6') and approach == 1:
                # Native 26 px measurement found a fifth line; keep the final
                # sentence together instead of leaving a fragment on a new page.
                opening, final = success.rsplit('. ', 1)
                paragraphs = [opening + '.', final]
            replace_passage(commands, f'result.{identity}-{approach}.success.01', paragraphs)
            failure_id = f'result.{identity}-{approach}.failure.01'
            if failure_id in failures:
                replace_passage(commands, failure_id, [failures[failure_id]])
        replace_passage(ce[266 + n]['list'], f'death.{identity}.context', source['death'])
    council = desired[DATA / 'Map023.json']['events'][1]['pages'][0]['list']
    for n, (identity, source) in enumerate(heroes.items()):
        commands = desired[DATA / f'Map{n+37:03}.json']['events'][1]['pages'][0]['list']
        hero_conversation(commands, n, source)
        replace_passage(ce[282 + n]['list'], f'farewell.{identity}', source['farewell'])
        replace_passage(council, f'opinion.{identity}', source['opinion'])
    for n, inscription in memorial.items():
        command = ce[n]['list'][0]
        assert command['code'] == 122 and command['parameters'][:4] == [152, 152, 0, 4]
        command['parameters'][4] = json.dumps(inscription, ensure_ascii=False)
    # Prove all preconditions before any write, including neighbouring objects.
    for path, value in desired.items():
        assert json.loads(path.read_text()) in (originals[path], value), f'Unexpected candidate drift: {path}'
    for path, value in desired.items():
        if args.write and json.loads(path.read_text()) != value:
            original_text = subprocess.check_output(['git', 'show', f'{BASE}:{path.relative_to(ROOT)}'], cwd=ROOT).decode()
            indent = 4 if original_text.startswith('{\n    ') or path == ce_path else 2
            compact = '\n' not in original_text.rstrip('\n')
            path.write_text(json.dumps(value, ensure_ascii=False, indent=None if compact else indent,
                                       separators=(',', ':') if compact else None) + ('\n' if original_text.endswith('\n') else ''))
        assert json.loads(path.read_text()) == value, f'Not integrated: {path}'
        verify_grammar(value, path == ce_path)
        print(path.name, hashlib.sha256(path.read_bytes()).hexdigest())
    for path in (DATA.parent / 'js').rglob('*.js'):
        if path.is_file():
            original = subprocess.check_output(['git', 'show', f'{BASE}:{path.relative_to(ROOT)}'], cwd=ROOT)
            assert path.read_bytes() == original, f'Engine/plugin drift: {path}'
    print('PASS: native grammar and frozen engine/plugins/registry.')
    print('PASS: 17 pinned sources; 16 descriptions/deaths, 48 labels/successes, 6 failures, 8 hero conversations/replies/farewells/opinions, 2 inscriptions.')
    print('Preserved from intake: all other objects/commands, 42 failures, 14 inscriptions, retained observation IDs; only profile envelopes/setup removed.')


if __name__ == '__main__':
    main()
