"""Replace only the thirty approved success bodies; retain all other native commands."""
import copy
import hashlib
import json
import math
import re
import subprocess
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
GAME = ROOT / 'rpg-maker/The Dryland Drowned'
SOURCE = '2f91f94610ea27671d2bfeb9b5e4bf16abe718de'
BASE = '82aad84dd5df2376e18d53720747fae8d8c0e9ac'


def blob(revision, path):
    return subprocess.check_output(['git', 'show', f'{revision}:{path}'], cwd=ROOT)


def main():
    paths = subprocess.check_output(['git', 'ls-tree', '-r', '-z', '--name-only', SOURCE, 'docs/narrativa/armadilhas'], cwd=ROOT, text=True).rstrip('\0').split('\0')
    ledger = []
    for path in paths:
        source = blob(SOURCE, path).decode()
        if not source:
            continue
        encounter = Path(path).name[:2].upper()
        paragraphs = [re.sub(r'\s+', ' ', block.split('\n', 1)[1]).strip() for block in re.split(r'^### ', source, flags=re.M)[1:]]
        assert len(paragraphs) == 3, path
        map_id = (6 if encounter[0] == 'A' else 14) + int(encounter[1])
        relative = f'rpg-maker/The Dryland Drowned/data/Map{map_id:03}.json'
        target = ROOT / relative
        baseline = blob(BASE, relative)
        data = json.loads(baseline)
        commands = data['events'][1]['pages'][0]['list']
        original = copy.deepcopy(commands)
        previous = copy.deepcopy(data)
        previous_replacements = []
        replacements = []
        for approach, paragraph in enumerate(paragraphs, 1):
            passage = f'result.{encounter}-{approach}.success.01'
            start = next(i for i, c in enumerate(commands) if c['code'] == 357 and c['parameters'][1] == 'Query' and c['parameters'][3].get('id') == passage)
            first = next(i for i in range(start, len(commands)) if commands[i]['code'] == 101)
            last = first + 1
            while commands[last]['code'] == 401:
                last += 1
            lines = textwrap.wrap(paragraph, width=78, break_long_words=False, break_on_hyphens=False)
            replacement = []
            rows_per_box = math.ceil(len(lines) / math.ceil(len(lines) / 3))
            for offset in range(0, len(lines), rows_per_box):
                replacement.append(copy.deepcopy(commands[first]))
                replacement.extend(dict(code=401, indent=commands[first]['indent'], parameters=[line]) for line in lines[offset:offset+rows_per_box])
            assert ' '.join(c['parameters'][0] for c in replacement if c['code'] == 401) == paragraph
            replacements.append((first, last, replacement))
            old_layout = []
            for offset in range(0, len(lines), 3):
                old_layout.append(copy.deepcopy(commands[first]))
                old_layout.extend(dict(code=401, indent=commands[first]['indent'], parameters=[line]) for line in lines[offset:offset+3])
            previous_replacements.append((first, last, old_layout))
            ledger.append(dict(passage=passage, source=path, sourceRevision=SOURCE,
                               sourceSha256=hashlib.sha256(blob(SOURCE, path)).hexdigest(),
                               text=paragraph, map=map_id, boxes=sum(c['code'] == 101 for c in replacement)))
        for first, last, replacement in reversed(replacements):
            commands[first:last] = replacement
        # The only changed spans are the selected native text bodies.
        restored = copy.deepcopy(commands)
        for first, last, replacement in replacements:
            restored[first:first+len(replacement)] = original[first:last]
        assert restored == original
        compact_output = json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '\n'
        output = json.dumps(data, ensure_ascii=False, indent=2) + '\n'
        assert json.loads(output) == data
        for first, last, replacement in reversed(previous_replacements):
            previous['events'][1]['pages'][0]['list'][first:last] = replacement
        previous_output = json.dumps(previous, ensure_ascii=False, separators=(',', ':')) + '\n'
        assert target.read_bytes() in [baseline, previous_output.encode(), compact_output.encode(), output.encode()], f'Stale input: {relative}'
        target.write_text(output)
    assert len(ledger) == 30
    evidence = ROOT / 'docs/qa/evidence/approved-narrative-dialogue-staging/execution-20260918/task-03'
    evidence.mkdir(parents=True, exist_ok=True)
    (evidence / 'source-correspondence.json').write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + '\n')
    print('Replaced 30 success bodies; all other commands preserved.')


if __name__ == '__main__':
    main()
