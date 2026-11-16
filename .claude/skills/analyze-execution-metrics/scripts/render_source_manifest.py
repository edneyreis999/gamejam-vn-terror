#!/usr/bin/env python3
"""Render collector source records and receipt availability as Markdown to stdout."""

import argparse
import json
from pathlib import Path

from _common import cell, link


def walk(value):
    if isinstance(value, dict):
        if "path" in value and ("sha256" in value or "read_error" in value):
            yield value
        for key, child in value.items():
            if key in ("data", "receipt", "summary", "raw_summary", "raw_data", "report", "event", "text", "content"):
                continue
            yield from walk(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk(child)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("inputs", type=Path, nargs="+")
    args = parser.parse_args()
    sources = {}
    receipts = {}
    for path in args.inputs:
        data = json.loads(path.read_text())
        for record in walk(data):
            key = record["path"]
            if key in sources and sources[key].get("sha256") != record.get("sha256"):
                raise ValueError(f"Source changed between collections: {key}")
            sources[key] = record
        for receipt in data.get("receipts", []):
            receipts[receipt["receipt"]] = receipt
    print("## Files read by the collectors\n")
    print("Automated reading means bytes obtained and, where applicable, JSON parsed. "
          "It is not visual review, re-execution or full manual analysis of every field. "
          "Missing candidates are listed separately; a wrong candidate name does not prove lost evidence.\n")
    print("| Source | SHA-256 | Bytes | State |")
    print("| --- | --- | --- | --- |")
    for path, record in sorted(sources.items()):
        if record.get("read_error"):
            continue
        print("| " + " | ".join([link(path, path), record.get("sha256", "—"),
                                  str(record.get("bytes", "—")), cell(record.get("parse_error", "Read"))]) + " |")
    print("\n## Unavailable candidates\n")
    print("| Path tried | Diagnostic |")
    print("| --- | --- |")
    for path, record in sorted(sources.items()):
        if record.get("read_error"):
            print(f'| {cell(path)} | {cell(record["read_error"])} |')
    print("\n## Receipts and collected signals\n")
    print("Negative results are signals for analysis, not an automatic error classification. "
          "FAIL, BLOCKED and cancelled remain distinct in the original summaries.\n")
    print("| Receipt | Source | Recorded status | Jobs with failure/blocked signals |")
    print("| --- | --- | --- | --- |")
    for name, receipt in sorted(receipts.items()):
        path = receipt["source"]["path"]
        summary = receipt.get("summary", {})
        source = link(path, "summary.json") if "summary" in receipt else cell(path)
        jobs = "; ".join(str(job.get("id")) for job in receipt.get("failed_jobs", []))
        print("| " + " | ".join([cell(name), source, cell(summary.get("status", "Unavailable")), cell(jobs or "—")]) + " |")


if __name__ == "__main__":
    main()
