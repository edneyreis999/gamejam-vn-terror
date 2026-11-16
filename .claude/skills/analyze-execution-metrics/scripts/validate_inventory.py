#!/usr/bin/env python3
"""Check local Markdown links, table widths, occurrence IDs and saved source hashes."""

import argparse
import hashlib
import json
import re
from pathlib import Path
from urllib.parse import unquote

from render_source_manifest import walk


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("markdown", type=Path, nargs="+")
    parser.add_argument("--collected", type=Path, action="append", default=[])
    args = parser.parse_args()
    errors, seen, count = [], set(), 0
    for path in args.markdown:
        text = path.read_text()
        width = None
        for number, line in enumerate(text.splitlines(), 1):
            if line.rstrip() != line:
                errors.append(f"{path}:{number}: trailing whitespace")
            if line.startswith("|"):
                actual = len(re.split(r"(?<!\\)\|", line))
                if width is None:
                    width = actual
                elif actual != width:
                    errors.append(f"{path}:{number}: table width {actual}, expected {width}")
                match = re.match(r"\| (E\d{3}-[\w-]+)(?: /| \|)", line)
                if match:
                    key = match.group(1)
                    if key in seen:
                        errors.append(f"Duplicate occurrence ID: {key}")
                    seen.add(key)
            else:
                width = None
        for target in re.findall(r"\]\((<[^>]+>|[^)]+)\)", text):
            target = unquote(target.strip("<>"))
            if target.startswith(("http://", "https://", "#", "mailto:")):
                continue
            target = re.sub(r":\d+$", "", target.split("#", 1)[0])
            if not target:
                continue
            resolved = Path(target) if Path(target).is_absolute() else path.parent / target
            if not resolved.exists():
                errors.append(f"{path}: missing link {target}")
            count += 1
    checked = set()
    for path in args.collected:
        for source in walk(json.loads(path.read_text())):
            key = (source["path"], source.get("sha256"))
            if key in checked or not source.get("sha256"):
                continue
            checked.add(key)
            try:
                current = hashlib.sha256(Path(source["path"]).read_bytes()).hexdigest()
                if current != source["sha256"]:
                    errors.append(f'Source changed: {source["path"]}')
            except OSError as error:
                errors.append(str(error))
    print(json.dumps({"errors": errors, "occurrence_ids": len(seen),
                      "local_links": count, "source_hashes_checked": len(checked)}, indent=2))
    raise SystemExit(bool(errors))


if __name__ == "__main__":
    main()
