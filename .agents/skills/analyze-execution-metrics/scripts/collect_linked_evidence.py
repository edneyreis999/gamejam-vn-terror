#!/usr/bin/env python3
"""Read local documentary links under a project, without executing their contents."""
import argparse
import json
import re
from urllib.parse import unquote
from _common import directory, emit, snapshot


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('spec_dir', type=directory)
    p.add_argument('--project-root', type=directory, required=True)
    p.add_argument('--source', action='append', default=[])
    p.add_argument('--allow-root', type=directory, action='append', default=[])
    p.add_argument('--depth', type=int, default=2)
    a = p.parse_args()
    from pathlib import Path
    pending = [(x.resolve(), 0, {'argument': 'source'}) for x in
               sorted(a.spec_dir.rglob('*.md')) + [Path(x) for x in a.source]]
    records = {}
    while pending:
        path, depth, ref = pending.pop(0)
        if not any(path.is_relative_to(root) for root in [a.project_root, *a.allow_root]):
            continue
        if path in records:
            records[path]['references'].append(ref)
            continue
        source, text = snapshot(path)
        row = {'source': source, 'references': [ref]}
        records[path] = row
        if text is None:
            continue
        row['text'] = text
        if path.suffix == '.json':
            try:
                row['data'] = json.loads(text)
            except json.JSONDecodeError as error:
                row['parse_error'] = str(error)
        if path.suffix != '.md' or depth >= a.depth:
            continue
        for n, line in enumerate(text.splitlines(), 1):
            for target in re.findall(r'\]\(([^)]+)\)', line):
                target = unquote(target.split('#')[0].strip('<>'))
                if not target or '://' in target:
                    continue
                dest = (path.parent / target).resolve()
                if dest.suffix in ('.md', '.json', '.jsonl', '.log', '.txt'):
                    pending.append((dest, depth + 1, {'path': str(path), 'line': n}))
    emit({'spec_dir': str(a.spec_dir), 'files': list(records.values()),
          'limits': ['Only local Markdown links within project root, bounded depth; no directory expansion.',
                     'Backtick-only artifact mentions and images are not read by this collector.']})


if __name__ == '__main__':
    main()
