"""Read-only evidence helpers. No project code or verification command is run."""

import hashlib
import json
import re
from datetime import datetime, timezone
from pathlib import Path


def snapshot(path):
    path = Path(path).resolve()
    record = {"path": str(path)}
    try:
        raw = path.read_bytes()
        record.update(sha256=hashlib.sha256(raw).hexdigest(), bytes=len(raw))
        return record, raw.decode("utf-8")
    except (OSError, UnicodeError) as error:
        record["read_error"] = str(error)
        return record, None


def read_json(path):
    record, content = snapshot(path)
    if content is not None:
        try:
            return record, json.loads(content)
        except json.JSONDecodeError as error:
            record["parse_error"] = str(error)
    return record, None


def task_files(spec_dir):
    return sorted(set(spec_dir.glob("task_*.md")) | set(spec_dir.glob("task-*.md")))


def referenced_receipts(spec_dir, extra_sources=(), verification_root=None, explicit=()):
    sources, receipts = [], {}
    named = None
    if verification_root is not None and verification_root.is_dir():
        names = [p.name for p in verification_root.iterdir()
                 if p.is_dir() and (p / "summary.json").is_file()
                 and not p.name.startswith("acceptance-")]
        if names:
            named = re.compile(r"(?<![\w.-])(?:" + "|".join(
                re.escape(name) for name in sorted(names, key=len, reverse=True)
            ) + r")(?![\w.-])")
    for path in sorted(set(task_files(spec_dir)) | set(extra_sources)):
        record, content = snapshot(path)
        sources.append(record)
        if content is None:
            continue
        for number, line in enumerate(content.splitlines(), 1):
            # Accept explicit IDs and the bare 13-digit timestamps used in notes.
            for match in re.finditer(r"acceptance-(\d+)|(?<!\d)(\d{13})(?!\d)", line):
                receipt = "acceptance-" + (match.group(1) or match.group(2))
                receipts.setdefault(receipt, []).append(
                    {"path": str(path.resolve()), "line": number}
                )
            candidates = set(named.findall(line) if named else [])
            # Explicit directory paths remain visible even if their summary is absent.
            for match in re.finditer(r"\.artifacts/verification/([\w.-]+)", line):
                name = match.group(1)
                if not name.endswith((".json", ".jsonl", ".md", ".log", ".txt")):
                    candidates.add(name)
            for receipt in sorted(candidates):
                ref = {"path": str(path.resolve()), "line": number}
                if ref not in receipts.setdefault(receipt, []):
                    receipts[receipt].append(ref)
    for receipt in explicit:
        receipts.setdefault(receipt, []).append({"argument": "--receipt"})
    return sources, receipts


def source_path(value):
    """Keep missing paths so the evidence output can report unavailability."""
    return Path(value).expanduser().resolve()


def receipt_name(value):
    import argparse

    if not value or any(not re.fullmatch(r"[\w][\w.-]*", part)
                        or part in (".", "..") for part in value.split("/")):
        raise argparse.ArgumentTypeError("Expected a relative receipt path without traversal")
    return value


def emit(data):
    print(json.dumps({"collected_at": datetime.now(timezone.utc).isoformat(), **data},
                     ensure_ascii=False, indent=2))


def directory(value):
    import argparse

    path = Path(value).expanduser().resolve()
    if not path.is_dir():
        raise argparse.ArgumentTypeError(f"Directory does not exist: {path}")
    return path


def cell(value):
    return str(value).replace("&", "&amp;").replace("<", "&lt;").replace(
        ">", "&gt;").replace("|", "&#124;").replace("\r", "").replace("\n", "<br>")


def link(path, label):
    return f"[{cell(label)}](<{path}>)"
