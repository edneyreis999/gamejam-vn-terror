#!/usr/bin/env python3
"""Render analyst-selected error episodes as a Markdown table. Never infers findings."""
import argparse
import json
import re
from pathlib import Path

CATEGORIES = {'I': 'Infrastructure', 'T': 'Tests', 'M': 'Implementation',
              'D': 'Instruction discovery', 'P': 'Planning and coordination'}
CATEGORY_SCOPE = {'I': 'setup, resources or observation of the execution',
                  'T': 'oracle, script or coverage of the proof',
                  'M': 'implemented contract or behavior',
                  'D': 'public information needed to discover or use the capability',
                  'P': 'coordination, ordering or integrity of the work'}
ORIGINS = {'A': 'Agent action or omission, as the record narrates the preparation or change.',
           'U': 'Indeterminate origin; the record locates the defect but does not establish who caused it.',
           'E': 'Environment or execution-tool problem.',
           'R': 'Pre-existing product defect or behavior, identified as such in the record.'}


def escape(text):
    return text.replace('|', '&#124;').replace('\n', '<br>')


def find_doc(docs, ref):
    """Resolve a task number or document filename to a collected document."""
    if ref in docs:
        return ref, docs[ref]
    if ref.isdigit():
        for name in docs:
            if re.fullmatch(rf'task[_-]0*{int(ref)}\.md', name):
                return name, docs[name]
    raise SystemExit(f'No collected document matches {ref!r}; collect it with --source.')


def load_selection(path):
    raw = path.read_text()
    if path.suffix != '.tsv':
        return json.loads(raw)
    lines = raw.splitlines()
    return {'spec': lines[0].removeprefix('# spec='), 'scope': lines[1].removeprefix('# '),
            'rows': [line.split('\t') for line in lines[2:] if line and not line.startswith('#')]}


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('sources', type=Path, help='inventory_sources.py output collected with --full-text')
    p.add_argument('selection', type=Path, help='TSV: line 1 "# spec=ID", line 2 "# scope text", '
                   'then rows: task-or-file, spans, categories, origin, attempt/error, cause')
    a = p.parse_args()
    sources = json.loads(a.sources.read_text())
    selection = load_selection(a.selection)
    spec = selection['spec']
    docs = {Path(d['path']).name: d for d in sources['documents']}
    print(f'# Spec {spec} — documented error inventory\n')
    print(f"Collected: {sources['collected_at']}. Revision consulted: `{sources['head']['stdout'].strip()}`.\n")
    print(selection['scope'] + '\n')
    print('Each row is a documented episode or an explicitly described group of related errors, not a bug '
          'count or an attempt count. The quoted text keeps the record\'s own wording; a fact the record '
          'does not state stays unknown. Classifications belong to this survey, not to the original executor. '
          'The cause column separates documented mechanisms from hypotheses; a red test does not imply fault.\n')
    print('| ID / task | Attempt / error | Origin | Category and justification | Cause / certainty | '
          'Exact evidence; recorded consequence, fix and result |')
    print('| --- | --- | --- | --- | --- | --- |')
    for index, row in enumerate(selection['rows'], 1):
        task, spans, cat, origin, title, cause = row
        quotes = []
        for span in spans.split(','):
            ref, span = span.split(':', 1) if ':' in span else (task, span)
            filename, doc = find_doc(docs, ref)
            byline = {x['line']: x['text'] for x in doc['content']}
            if span == '*':
                span = f'1-{max(byline)}'
            bounds = [int(x) for x in span.split('-')]
            lo, hi = bounds[0], bounds[-1]
            if lo not in byline or hi not in byline:
                raise SystemExit(f'Line span {span} unavailable in {filename}')
            content = ' '.join(byline[n].strip() for n in range(lo, hi + 1))
            # Quote literally; links inside the record may be historical or missing.
            content = content.replace('[', '［').replace(']', '］')
            content = content.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
            quotes.append(f'[{filename}:{span}]({doc["path"]}:{lo}) — “{content}”')
        cats = cat.split('+')
        classification = CATEGORIES[cats[0]] + (
            '; secondary: ' + ', '.join(CATEGORIES[x] for x in cats[1:]) if len(cats) > 1 else '')
        task_label = task.removesuffix('.md') if not task.isdigit() else f'T{int(task):02}'
        cells = [f'E{spec}-{index:03} / {task_label}', title, ORIGINS[origin],
                 classification + ' — ' + CATEGORY_SCOPE[cats[0]] + '.', cause, '<br>'.join(quotes)]
        print('| ' + ' | '.join(escape(x) for x in cells) + ' |')
    print('\n## Sources and limits\n')
    print(selection.get('limits', ''))


if __name__ == '__main__':
    main()
