#!/usr/bin/env python3
"""Print bounded views of collector JSON for manual analysis; never write files."""

import argparse
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", type=Path)
    parser.add_argument("view", choices=("notes", "receipts", "failures", "sources", "stats", "files",
                                       "failure-brief", "details", "metrics"))
    parser.add_argument("--match", default="")
    parser.add_argument("--start", type=int, default=0)
    parser.add_argument("--limit", type=int, default=1000)
    args = parser.parse_args()
    data = json.loads(args.input.read_text())
    rows = []
    if args.view == "stats":
        print("documents", len(data.get("documents", [])))
        receipts = data.get("receipts", [])
        print("receipts", len(receipts), "unavailable", sum("summary" not in r for r in receipts))
        print("failed jobs", sum(len(r.get("failed_jobs", [])) for r in receipts))
        files = data.get("files", [])
        print("files", len(files), "unavailable", sum("read_error" in r["source"] for r in files))
        metrics = data.get("records")
        if metrics is not None:
            print("metrics records", len(metrics), "gaps", len(data.get("gaps", [])))
        return
    if args.view == "files":
        for row in data.get("files", []):
            if args.match in row["source"]["path"]:
                rows.append(json.dumps(row, ensure_ascii=False))
    elif args.view in ("notes", "sources"):
        for doc in data.get("documents", []):
            if args.match not in doc["path"]:
                continue
            if args.view == "sources":
                rows.append(json.dumps({k: v for k, v in doc.items()
                                        if k not in ("content", "execution_notes")}, ensure_ascii=False))
            else:
                lines = doc.get("execution_notes") or doc.get("content") or []
                rows.append("\n".join([doc["path"]] + [
                    f'{line["line"]}: {line["text"]}' for line in lines]))
    elif args.view in ("receipts", "failures", "failure-brief", "details"):
        for receipt in data.get("receipts", []):
            if args.match not in receipt["receipt"]:
                continue
            if args.view == "details":
                for detail in receipt.get("details", []):
                    content = detail.get("data")
                    if isinstance(content, dict) and content.get("status") not in ("pass", "passed"):
                        rows.append(detail["source"]["path"] + "\n" + json.dumps({
                            k: v for k, v in content.items() if k in (
                                "status", "error", "errors", "failure", "diagnostics", "cleanup",
                                "failedCriteria", "criteria", "reason", "completed")}, ensure_ascii=False))
            elif args.view == "receipts":
                rows.append(json.dumps({"receipt": receipt["receipt"],
                    "status": receipt.get("summary", {}),
                    "errors": {k: v for k, v in receipt["source"].items() if k.endswith("error")},
                    "failed": receipt.get("failed_jobs", [])}, ensure_ascii=False))
            elif args.view == "failure-brief":
                for log in receipt.get("failed_job_logs", []):
                    details = []
                    for event in log.get("failed_events", []):
                        payload = event["event"].get("data", event["event"])
                        details.append(f'{event["line"]}: ' + json.dumps(payload, ensure_ascii=False))
                    if not details:
                        details = [log.get("stderr", {}).get("text") or "No structured failure/stderr"]
                    rows.append(receipt["receipt"] + " / " + log["job"] + "\n" + "\n".join(details))
            elif receipt.get("failed_job_logs"):
                rows.append(json.dumps({"receipt": receipt["receipt"],
                    "logs": receipt["failed_job_logs"]}, ensure_ascii=False))
    elif args.view == "metrics":
        for row in data.get("records", []) + data.get("gaps", []):
            if args.match in json.dumps(row, ensure_ascii=False):
                rows.append(json.dumps(row, ensure_ascii=False))
    print(f"Matched records: {len(rows)}")
    print("\n\n".join(rows[args.start:args.start + args.limit]))


if __name__ == "__main__":
    main()
