#!/usr/bin/env python3
"""Read published execution-metrics records of a spec; never run anything. Print JSON.

Lists findings, finding links, quality gaps, failed commands and correction chains.
Tokens and durations are not recomputed; unreadable records are reported as gaps.
"""

import argparse
import json

from _common import directory, emit, read_json

REPORTED = ("finding", "finding_link", "quality", "command_end", "acceptance", "reconciliation")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("spec_dir", type=directory)
    parser.add_argument("--metrics-dir", type=directory,
                        help="Defaults to SPEC_DIR/execution-metrics")
    args = parser.parse_args()
    root = args.metrics_dir or args.spec_dir / "execution-metrics"
    records, gaps, kinds, supersedes = [], [], {}, {}
    if not root.is_dir():
        gaps.append({"path": str(root), "reason": "No execution-metrics directory"})
        files = []
    else:
        files = sorted(root.glob("*/*/*.json"))
    for path in files:
        source, data = read_json(path)
        if not isinstance(data, dict) or "kind" not in data or "id" not in data:
            gaps.append({"source": source, "reason": "Unreadable or unsupported record"})
            continue
        kinds[data["kind"]] = kinds.get(data["kind"], 0) + 1
        if data.get("supersedes"):
            supersedes[data["supersedes"]] = data["id"]
        body = data.get("data") if isinstance(data.get("data"), dict) else {}
        if data["kind"] == "quality":
            gaps.append({"source": source, "id": data["id"], "execution": data.get("execution"),
                         "code": body.get("code"), "detail": body.get("detail"),
                         "affected": body.get("affected"), "evidence": body.get("evidence")})
        elif data["kind"] in REPORTED:
            if data["kind"] == "command_end" and body.get("returncode") in (0, None):
                continue
            records.append({"source": source, "id": data["id"], "kind": data["kind"],
                            "execution": data.get("execution"), "clock": data.get("clock", {}).get("utc"),
                            "supersedes": data.get("supersedes"), "refs": data.get("refs"),
                            "data": body})
    emit({"metrics_root": str(root), "published_file_count": len(files), "kinds": kinds,
          "superseded_by": supersedes, "records": records, "gaps": gaps,
          "limits": ["Command starts are not joined here; use refs to find the command.",
                     "Findings are recorded classifications, not verified causes."]})


if __name__ == "__main__":
    main()
