#!/usr/bin/env python3
"""Read referenced verification summaries and failed-job logs; never run tests."""

import argparse
import json

from _common import (directory, emit, read_json, receipt_name, referenced_receipts,
                     snapshot, source_path)


def result_needs_review(result):
    status = str(result.get("status", result.get("classification", ""))).lower()
    counts = result.get("counts")
    return (result.get("code") not in (0, None)
            or bool(result.get("signal"))
            or status in ("fail", "failed", "blocked", "cancelled", "error", "timeout")
            or (isinstance(counts, dict) and isinstance(counts.get("fail"), (int, float))
                and counts["fail"] > 0))


def failed_log(folder, job):
    record, content = snapshot(folder / f"{job}.jsonl")
    events, malformed = [], []
    if content is not None:
        for number, line in enumerate(content.splitlines(), 1):
            if not line.strip():
                continue
            try:
                event = json.loads(line)
            except json.JSONDecodeError as error:
                malformed.append({"line": number, "error": str(error)})
                continue
            if isinstance(event, dict) and event.get("type") == "test:fail":
                events.append({"line": number, "event": event})
    result = {"job": job, "source": record, "failed_events": events,
              "malformed_lines": malformed}
    if not events:
        stderr, text = snapshot(folder / f"{job}.stderr")
        result["stderr"] = {"source": stderr, "text": text}
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("spec_dir", type=directory)
    parser.add_argument("--project-root", type=directory, required=True)
    parser.add_argument("--verification-root", type=directory)
    parser.add_argument("--source", type=source_path, action="append", default=[])
    parser.add_argument("--receipt", type=receipt_name, action="append", default=[])
    parser.add_argument("--details", action="store_true",
                        help="Read retained per-job result, recipe and native JSON reports")
    args = parser.parse_args()
    root = args.verification_root or args.project_root / ".artifacts/verification"
    sources, refs = referenced_receipts(args.spec_dir, args.source, root, args.receipt)
    receipts = []
    for receipt, references in sorted(refs.items()):
        folder = root / receipt
        record, summary = read_json(folder / "summary.json")
        row = {"receipt": receipt, "references": references, "source": record}
        if isinstance(summary, dict):
            errors = []
            if not any(key in summary for key in ("status", "executionStatus", "results")):
                errors.append("Unrecognized summary object")
            row["summary"] = {key: summary[key] for key in (
                "status", "executionStatus", "selected", "completed", "cancelled",
                "remainingBrowsers", "remainingContexts", "remainingPreparations",
                "remainingBrowserClosures", "completeness", "fixtureCleanup",
            ) if key in summary}
            results = summary.get("results", [])
            if not isinstance(results, list):
                errors.append("results: expected an array")
                results = []
            for index, result in enumerate(results):
                if not isinstance(result, dict):
                    errors.append(f"results[{index}]: expected an object")
            results = [result for result in results if isinstance(result, dict)]
            row["failed_jobs"] = [result for result in results
                                  if result_needs_review(result)]
            browser = summary.get("browser", {})
            if not isinstance(browser, dict):
                errors.append("browser: expected an object")
                browser = {}
            # Browser acceptance can fail with process exit zero (e.g. changed inputs).
            row["browser"] = {key: value for key, value in browser.items()
                              if key != "checkpoints"}
            checkpoints = browser.get("checkpoints", [])
            if not isinstance(checkpoints, list):
                errors.append("browser.checkpoints: expected an array")
                checkpoints = []
            row["nonpassed_browser_checkpoints"] = []
            for index, item in enumerate(checkpoints):
                if not isinstance(item, dict):
                    errors.append(f"browser.checkpoints[{index}]: expected an object")
                if not isinstance(item, dict) or item.get("classification") != "passed":
                    row["nonpassed_browser_checkpoints"].append(item)
            row["failed_job_logs"] = []
            for result in row["failed_jobs"]:
                job = result.get("id")
                if not isinstance(job, str) or not job or "/" in job or "\\" in job or job in (".", ".."):
                    errors.append("failed result: missing or unsafe job id")
                    continue
                row["failed_job_logs"].append(failed_log(folder, job))
            if args.details:
                details = []
                paths = set(folder.glob("*.result.json"))
                for pattern in ("*/events-move-nw.json", "recipes/*/runs/*/report.json",
                                "recipes/*/requests/*/result.json"):
                    paths.update(folder.glob(pattern))
                for path in sorted(paths):
                    source, data = read_json(path)
                    details.append({"source": source, "data": data})
                row["details"] = details
            if errors:
                row["schema_errors"] = errors
                row["raw_summary"] = summary
        elif not any(key in record for key in ("read_error", "parse_error")):
            row["schema_error"] = "Expected a summary object"
        receipts.append(row)
    emit({"task_sources": sources, "verification_root": str(root), "receipts": receipts,
          "limits": ["Receipt discovery follows task/--source references and --receipt, not every run on disk.",
                     "Bare 13-digit numbers are candidates; inspect missing or unrelated IDs.",
                     "Failed tests and nonzero exits are signals, not classified agent errors."]})


if __name__ == "__main__":
    main()
