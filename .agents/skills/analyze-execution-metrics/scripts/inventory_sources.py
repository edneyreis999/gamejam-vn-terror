#!/usr/bin/env python3
"""Inventory spec documents, execution notes, revisions and referenced receipts."""

import argparse
import re
import subprocess

from _common import (directory, emit, receipt_name, referenced_receipts, snapshot,
                     source_path, task_files)


def git(project, *args):
    result = subprocess.run(
        ["git", "--no-optional-locks", "-C", str(project), *args],
        capture_output=True, text=True, check=False,
    )
    return {"exit": result.returncode, "stdout": result.stdout, "stderr": result.stderr}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("spec_dir", type=directory)
    parser.add_argument("--project-root", type=directory, required=True)
    parser.add_argument("--source", type=source_path, action="append", default=[])
    parser.add_argument("--receipt", type=receipt_name, action="append", default=[])
    parser.add_argument("--verification-root", type=directory)
    parser.add_argument("--full-text", action="store_true")
    args = parser.parse_args()
    documents = []
    tasks = set(task_files(args.spec_dir))
    for path in sorted(set(args.spec_dir.glob("*.md")) | set(args.source)):
        record, content = snapshot(path)
        if content is not None:
            lines = content.splitlines()
            status = re.search(r"^status:\s*(.+)$", content, re.MULTILINE)
            record.update(
                task=path in tasks, lines=len(lines),
                status=status.group(1) if status else None,
                headings=[{"line": n, "text": line} for n, line in enumerate(lines, 1)
                          if line.startswith("#")],
            )
            start = next((i for i, line in enumerate(lines)
                          if line.strip() in ("## Execution Notes")), None)
            record["execution_notes"] = (
                [{"line": i + 1, "text": lines[i]} for i in range(start, len(lines))]
                if start is not None else None
            )
            if args.full_text:
                record["content"] = [{"line": n, "text": line}
                                     for n, line in enumerate(lines, 1)]
        documents.append(record)
    _, receipts = referenced_receipts(
        args.spec_dir, args.source,
        args.verification_root or args.project_root / ".artifacts/verification",
        args.receipt,
    )
    emit({
        "spec_dir": str(args.spec_dir), "project_root": str(args.project_root),
        "head": git(args.project_root, "rev-parse", "HEAD"),
        "spec_status": git(args.project_root, "status", "--short", "--", str(args.spec_dir)),
        "documents": documents, "referenced_receipts": receipts,
        "limits": ["Top-level Markdown and explicit --source files are inventoried.",
                   "Missing Execution Notes headings do not imply no execution.",
                   "HEAD does not identify uncommitted or untracked content."],
    })


if __name__ == "__main__":
    main()
