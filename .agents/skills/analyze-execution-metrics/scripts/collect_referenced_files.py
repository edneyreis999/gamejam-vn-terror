#!/usr/bin/env python3
"""Read flat artifact files named in documents, plus explicit files. Print JSON."""

import argparse
import json
import re

from _common import directory, emit, snapshot, source_path


def expand_braces(value):
    match = re.search(r"\{([^{}]+)\}", value)
    if not match:
        return [value]
    return [expanded for item in match.group(1).split(",")
            for expanded in expand_braces(value[:match.start()] + item + value[match.end():])]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--artifact-root", type=directory, required=True)
    parser.add_argument("--source", type=source_path, action="append", default=[])
    parser.add_argument("--file", type=source_path, action="append", default=[])
    args = parser.parse_args()
    refs, sources = {}, []
    for path in args.source:
        source, text = snapshot(path)
        sources.append(source)
        if text is None:
            continue
        for number, line in enumerate(text.splitlines(), 1):
            # Bounded flat-file lookup. Nested artifacts require an explicit --file.
            for token in re.findall(r"[\w{][\w.,{}-]*\.(?:jsonl|json|log|txt|stderr|stdout)(?![\w.])", line):
                for name in expand_braces(token):
                    target = args.artifact_root / name
                    refs.setdefault(target, []).append({"path": str(path), "line": number})
    for path in args.file:
        refs.setdefault(path, []).append({"argument": "--file"})
    records = []
    for path, references in sorted(refs.items()):
        source, text = snapshot(path)
        record = {"source": source, "references": references}
        if text is not None:
            if path.suffix == ".json":
                try:
                    record["data"] = json.loads(text)
                except json.JSONDecodeError as error:
                    record["parse_error"] = str(error)
                    record["text"] = text
            else:
                record["text"] = text
            record["lines"] = len(text.splitlines())
        records.append(record)
    emit({"sources": sources, "files": records,
          "limits": ["Flat artifact filenames are candidates, not proof of relevance.",
                     "Nested files require --file; missing candidates remain explicit.",
                     "Original logs are read, never executed."]})


if __name__ == "__main__":
    main()
