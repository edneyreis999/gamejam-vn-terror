"""Aggregate the reader's `query.json` (plus raw acceptance/quality/finding records) into `dashboard-data.json`.

Follows the reader rules of spec-execution-metrics (references/format.md):
- token deltas are never split by time; a token record counts toward a group only when every
  activity it is linked to belongs to that group, otherwise it stays mixed;
- duration groups may overlap, so per-group occupied time is a union inside the group and
  groups are never summed into an exclusive total;
- unknown values stay unknown (null), never zero.
Labels are keys; the dashboard template translates them. Each chart block carries
`available` and, when false, a `reason`.
"""

import argparse
import json
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

from _common import read_json, task_label, write_json

COMPONENTS = ("input_tokens", "cached_input_tokens", "output_tokens", "reasoning_output_tokens", "total_tokens")
CHARTS = ("g1", "g2", "g3", "g4", "g5", "g6", "g7", "g8")

# Eight colour groups (fixed categorical order) plus a neutral "other" fold.
GROUPS = [
    ("implementation", {"implementation", "product_correction"}),
    ("verification", {"verification"}),
    ("test_infrastructure", {"test_infrastructure"}),
    ("retest", {"retest"}),
    ("test_authoring", {"test_creation", "test_maintenance"}),
    ("investigation", {"investigation"}),
    ("instrumentation", {"instrumentation"}),
    ("persona_qa", {"persona_qa"}),
    ("other", {"preparation", "coordination", "closure"}),
]
GROUP_OF = {category: key for key, categories in GROUPS for category in categories}

RELATIONS = {
    "fix": {"fix"}, "retest": {"retest"}, "passing_retest": {"passing_retest", "retest"},
    "fixed_and_retested": {"fix", "retest"}, "confirmation": {"confirmation"},
    "investigation": {"investigation"},
}
ENVIRONMENTS = (("node", ("node",)), ("chromium", ("chromium", "browser")), ("nwjs", ("nw",)),
                ("python", ("python",)), ("installed_cli", ("installed-cli", "installed")))


def ts(value):
    return datetime.fromisoformat(value.replace("Z", "+00:00")).timestamp()


def union_seconds(intervals):
    total, end = 0.0, None
    for start, stop in sorted(intervals):
        if end is None or start > end:
            total += stop - start
            end = stop
        elif stop > end:
            total += stop - end
            end = stop
    return total


def empty_tokens():
    return {"uncached_input": 0, "cached_input": 0, "output": 0, "reasoning": 0, "total": 0, "records": 0}


def add_tokens(bucket, delta):
    bucket["uncached_input"] += delta["input_tokens"] - delta["cached_input_tokens"]
    bucket["cached_input"] += delta["cached_input_tokens"]
    bucket["output"] += delta["output_tokens"]
    bucket["reasoning"] += delta["reasoning_output_tokens"]
    bucket["total"] += delta["total_tokens"]
    bucket["records"] += 1


def complete(delta):
    return all(delta.get(c) is not None for c in COMPONENTS)


def environment_key(raw):
    """Normalize a free-text command environment to keys joined by `+`."""
    if not raw:
        return "unknown"
    text = raw.lower()
    parts = [name for name, keys in ENVIRONMENTS if any(k in text for k in keys)]
    if not parts:
        return "mixed" if text in ("mixed", "mixed-runtime") else "other"
    return "+".join(parts)


def attribute(tokens, key_of_activity):
    """Group token deltas by key; records spanning several keys stay mixed."""
    groups, mixed, unattributed = defaultdict(empty_tokens), empty_tokens(), empty_tokens()
    for token in tokens:
        delta = token["delta"]
        if token["attribution"] == "unattributed" or not token["activities"]:
            add_tokens(unattributed, delta)
            continue
        keys = {key_of_activity(a) for a in token["activities"]}
        if len(keys) == 1 and None not in keys:
            add_tokens(groups[keys.pop()], delta)
        else:
            add_tokens(mixed, delta)
    return groups, mixed, unattributed


def load_records(spec_dir, run, kinds):
    out, versions = defaultdict(list), Counter()
    for path in sorted((Path(spec_dir) / "execution-metrics" / run).glob("*/*.json")):
        record = json.loads(path.read_text())
        versions[record.get("collector")] += 1
        if record.get("kind") in kinds:
            out[record["kind"]].append(record)
    out["collector_versions"] = dict(sorted(versions.items()))
    return out


def pack(items):
    """Greedy lane packing: each lane holds non-overlapping activities."""
    lanes_end, placed = [], []
    for a in sorted(items, key=lambda a: ts(a["start"])):
        start, end = ts(a["start"]), ts(a["end"])
        lane = next((i for i, e in enumerate(lanes_end) if e <= start), None)
        if lane is None:
            lane = len(lanes_end)
            lanes_end.append(end)
        else:
            lanes_end[lane] = end
        placed.append((lane, a))
    return len(lanes_end), placed


def block(available, reason=None):
    return {"available": bool(available), "reason": None if available else reason}


def source_of(manifest):
    keys = ("spec", "title", "commit", "commit_subject", "working_tree", "run", "reader",
            "published_file_count", "coordinator_session")
    return {k: manifest.get(k) for k in keys}


def unavailable(manifest):
    reason = manifest["metrics"]["reason"]
    return {"source": source_of(manifest), "metrics": manifest["metrics"],
            "blocks": {c: block(False, reason) for c in CHARTS}}


def build(query, manifest, raw, max_lanes):
    coordinator = manifest.get("coordinator_session")
    activities = {a["id"]: a for a in query["activities"]}
    timed = [a for a in query["activities"] if a["start"] and a["end"]]
    t0 = min((ts(a["start"]) for a in timed), default=None)
    tokens = query["tokens"]
    complete_tokens = [t for t in tokens if complete(t["delta"])]

    def act(attr):
        return lambda aid: activities[aid][attr] if aid in activities else None

    # --- KPIs ---------------------------------------------------------------
    session_total = empty_tokens()
    for t in complete_tokens:
        add_tokens(session_total, t["delta"])
    commands = query["commands"]
    failed_commands = [c for c in commands if c.get("result") and c["result"]["returncode"] != 0]
    acceptances = raw["acceptance"]
    kpis = {
        **query["time"],
        "tokens": session_total,
        "token_records": len(tokens),
        "token_records_incomplete": len(tokens) - len(complete_tokens),
        "sessions": len(query["by_session"]),
        "coordinator_tokens": sum(t["delta"]["total_tokens"] for t in complete_tokens if t["session"] == coordinator),
        "activities": len(query["activities"]),
        "commands": len(commands),
        "commands_failed": len(failed_commands),
        "findings": len(query["findings"]),
        "acceptance_markers": len(acceptances),
        "defect_counts": query["defect_counts"],
        "inclusion": dict(Counter(t["inclusion"] for t in tokens)),
        "hierarchy_total_exact": query["hierarchy_total_exact"],
    }

    # --- G1 tasks / G4 categories ------------------------------------------
    task_tokens, task_mixed, task_unattr = attribute(complete_tokens, act("task"))
    cat_tokens, cat_mixed, cat_unattr = attribute(complete_tokens, act("category"))

    def per_key(attr):
        active, waits = defaultdict(list), defaultdict(float)
        for a in timed:
            span = (ts(a["start"]), ts(a["end"]))
            if a["state"] == "active":
                active[a[attr]].append(span)
            else:
                waits[a[attr]] += span[1] - span[0]
        return active, waits

    task_active, task_wait = per_key("task")
    tasks = []
    for task, view in sorted(query["by_task"].items(), key=lambda kv: (kv[0] != "(spec)", kv[0])):
        key = None if task == "(spec)" else task
        cats = Counter(activities[a]["category"] for a in view["activities"] if a in activities)
        tasks.append({
            "task": task_label(task),
            "declared_seconds": view["declared_seconds"],
            "occupied_seconds": union_seconds(task_active.get(key, [])),
            "wait_seconds": task_wait.get(key, 0.0),
            "unknown_duration_count": view["unknown_duration_count"],
            "activities": len(view["activities"]),
            "categories": dict(cats),
            "tokens": task_tokens.get(key, empty_tokens()),
        })

    cat_active, cat_wait = per_key("category")
    categories = []
    for category, view in query["by_activity"].items():
        categories.append({
            "category": category,
            "group": GROUP_OF.get(category, "other"),
            "declared_seconds": view["declared_seconds"],
            "occupied_seconds": union_seconds(cat_active.get(category, [])),
            "wait_seconds": cat_wait.get(category, 0.0),
            "activities": len(view["activities"]),
            "tokens": cat_tokens.get(category, empty_tokens()),
        })
    categories.sort(key=lambda c: -c["declared_seconds"])

    # --- G2 timeline --------------------------------------------------------
    coord_lanes, coord_placed = pack([a for a in timed if a["session"] == coordinator])
    sub_total, sub_placed = pack([a for a in timed if a["session"] != coordinator])
    # Beyond max_lanes, the remaining subagent lanes fold into one aggregated lane.
    sub_lanes = min(sub_total, max(1, max_lanes))
    aggregated = sub_lanes - 1 if sub_total > sub_lanes else None
    bars = []
    for role, offset, placed in (("coordinator", 0, coord_placed), ("subagent", coord_lanes, sub_placed)):
        for lane, a in placed:
            if role == "subagent" and aggregated is not None:
                lane = min(lane, aggregated)
            bars.append({
                "lane": offset + lane, "role": role,
                "start": ts(a["start"]) - t0, "end": ts(a["end"]) - t0,
                "group": GROUP_OF.get(a["category"], "other"),
                "category": a["category"], "state": a["state"],
                "task": task_label(a["task"]),
            })
    task_starts = {}
    for a in timed:
        if a["task"]:
            label = task_label(a["task"])
            task_starts[label] = min(task_starts.get(label, float("inf")), ts(a["start"]) - t0)
    concurrency, level = [], 0
    events = sorted([(ts(a["start"]) - t0, 1) for a in timed if a["session"] != coordinator and a["state"] == "active"]
                    + [(ts(a["end"]) - t0, -1) for a in timed if a["session"] != coordinator and a["state"] == "active"])
    for at, step in events:
        level += step
        concurrency.append([round(at, 1), level])
    timeline = {
        "t0_utc": datetime.fromtimestamp(t0).astimezone().isoformat() if t0 is not None else None,
        "t0_epoch": t0,
        "span_seconds": max((ts(a["end"]) for a in timed), default=0) - (t0 or 0),
        "coordinator_lanes": coord_lanes, "subagent_lanes": sub_lanes,
        "subagent_lanes_total": sub_total, "aggregated_lane": coord_lanes + aggregated if aggregated is not None else None,
        "bars": bars,
        "task_starts": sorted(([k, v] for k, v in task_starts.items()), key=lambda kv: kv[1]),
        "subagent_concurrency": concurrency,
        "untimed_activities": len(query["activities"]) - len(timed),
    }

    # --- G3 cumulative tokens ----------------------------------------------
    bin_seconds = 300
    bins = defaultdict(lambda: {"coordinator": empty_tokens(), "subagent": empty_tokens()})
    for t in complete_tokens:
        at = ts(t["source"]["timestamp"]) - (t0 or 0)
        role = "coordinator" if t["session"] == coordinator else "subagent"
        add_tokens(bins[int(at // bin_seconds)][role], t["delta"])
    series, running = [], {r: empty_tokens() for r in ("coordinator", "subagent")}
    for b in range(min(bins, default=0), max(bins, default=-1) + 1):
        for role in running:
            for k, v in bins.get(b, {}).get(role, empty_tokens()).items():
                running[role][k] += v
        point = {"t": (b + 1) * bin_seconds}
        for role, totals in running.items():
            for k in ("total", "cached_input", "uncached_input", "output"):
                point[f"{role}_{k}"] = totals[k]
            point[f"{role}_uncached"] = totals["uncached_input"] + totals["output"]
        series.append(point)
    cumulative = {"bin_seconds": bin_seconds, "series": series}

    # --- G5 commands --------------------------------------------------------
    points, by_type, by_check = [], defaultdict(Counter), defaultdict(Counter)
    for c in commands:
        result = c.get("result") or {}
        duration = result.get("duration_seconds")
        failed = result.get("returncode") not in (0, None)
        vtype = c.get("verification_type") or "unknown"
        check = ", ".join(c.get("checks") or [])
        start = activities.get(c["activity"], {}).get("start")
        points.append({
            "type": vtype, "environment": environment_key(c.get("environment")),
            "environment_raw": c.get("environment"), "check": check, "task": task_label(c.get("task")),
            "duration": duration, "runner": result.get("runner_seconds"),
            "returncode": result.get("returncode"), "failed": failed,
            "activity_start": ts(start) - t0 if start and t0 is not None else None,
        })
        for bucket, key in ((by_type, vtype), (by_check, check)):
            bucket[key]["runs"] += 1
            bucket[key]["failed"] += failed
            bucket[key]["seconds"] += duration or 0
            bucket[key]["unknown_duration"] += duration is None
    commands_view = {
        "points": points,
        "by_type": sorted(({"type": k, **v} for k, v in by_type.items()), key=lambda r: -r["seconds"]),
        "by_check": sorted(({"check": k, **v} for k, v in by_check.items()), key=lambda r: (-r["runs"], -r["seconds"])),
        "by_environment": dict(Counter(p["environment"] for p in points)),
        "returncodes": dict(Counter(str(p["returncode"]) for p in points)),
        "attempt_values": dict(Counter(str(c.get("attempt")) for c in commands)),
    }

    # --- G6 findings --------------------------------------------------------
    findings = query["findings"]
    labels = {f["finding"] for f in findings}
    label_of = {f["id"]: f["finding"] for f in findings}
    for r in raw["finding"]:
        label_of.setdefault(r["id"], r["data"]["finding"])
    relations, unresolved_links = defaultdict(set), 0
    for link in query["finding_links"]:
        label = link["finding"] if link["finding"] in labels else label_of.get(link["finding"])
        if label is None:
            unresolved_links += 1
            continue
        relation = link["relation"].strip().lower().replace("-", "_").replace(" ", "_")
        relations[label] |= RELATIONS.get(relation, {relation})
    funnel = [
        ["registered", len(labels)],
        ["fixed", sum("fix" in relations[l] for l in labels)],
        ["retested", sum("retest" in relations[l] for l in labels)],
        ["passing_retest", sum("passing_retest" in relations[l] for l in labels)],
    ]
    matrix = Counter((f["classification"], f["origin"]) for f in findings)
    per_task = defaultdict(Counter)
    for f in findings:
        per_task[task_label(f["task"])][f["classification"]] += 1
    findings_view = {
        "count": len(findings), "unique_labels": len(labels),
        "matrix": [{"classification": c, "origin": o, "count": n} for (c, o), n in sorted(matrix.items())],
        "by_channel": dict(Counter(f["channel"] for f in findings).most_common()),
        "by_task": {t: dict(v) for t, v in sorted(per_task.items())},
        "funnel": funnel,
        "defect_counts": query["defect_counts"],
        "delivery_defects": sum(bool(f["delivery_defect"]) for f in findings),
        "persona_defects": sum(bool(f["persona_defect"]) for f in findings),
        "relation_raw": dict(Counter(l["relation"] for l in query["finding_links"])),
        "unresolved_links": unresolved_links,
        "list": [{"finding": f["finding"], "task": task_label(f["task"]), "channel": f["channel"],
                  "classification": f["classification"], "origin": f["origin"],
                  "relations": sorted(relations[f["finding"]])} for f in findings],
    }

    # --- G7 rework per task -------------------------------------------------
    acceptance_by_task = Counter(task_label(r["data"]["task"]) for r in acceptances)
    findings_by_task = Counter(task_label(f["task"]) for f in findings)
    failed_by_task = Counter(task_label(c.get("task")) for c in failed_commands)
    commands_by_task = Counter(task_label(c.get("task")) for c in commands)
    rework = [{
        "task": t["task"], "occupied_seconds": t["occupied_seconds"], "tokens": t["tokens"]["total"],
        "findings": findings_by_task.get(t["task"], 0), "acceptance_markers": acceptance_by_task.get(t["task"], 0),
        "commands": commands_by_task.get(t["task"], 0), "commands_failed": failed_by_task.get(t["task"], 0),
    } for t in tasks if t["task"] != "spec"]

    # --- G8 measurement quality --------------------------------------------
    partition = {}
    for name in ("interval", "mixed", "unattributed"):
        bucket = empty_tokens()
        for t in complete_tokens:
            if t["attribution"] == name:
                add_tokens(bucket, t["delta"])
        partition[name] = bucket
    quality = {
        "gap_codes": dict(Counter(g["code"].split(":")[0] for g in query["gaps"]).most_common()),
        "gap_count": len(query["gaps"]),
        "quality_records": [{"code": r["data"]["code"], "detail": r["data"]["detail"],
                             "affected": len(r["data"]["affected"]) if isinstance(r["data"]["affected"], list) else 1}
                            for r in sorted(raw["quality"], key=lambda r: r["clock"]["utc"])],
        "reconciliation_states": dict(Counter(c["state"] for c in query["collection"])),
        "collector_versions": raw["collector_versions"],
        "token_partition": partition,
        "task_attribution": {"mixed": task_mixed, "unattributed": task_unattr},
        "category_attribution": {"mixed": cat_mixed, "unattributed": cat_unattr},
        "token_records_incomplete": len(tokens) - len(complete_tokens),
        "untimed_activities": timeline["untimed_activities"],
        "published_file_count": query["published_file_count"],
        "effective_record_count": query["effective_record_count"],
    }

    blocks = {
        "g1": block(tasks, "no task activity"),
        "g2": block(timed, "no activity with both start and end"),
        "g3": block(series and t0 is not None, "no complete token record within timed activity"),
        "g4": block(categories, "no categorized activity"),
        "g5": block(commands, "no measured command"),
        "g6": block(findings, "no finding recorded"),
        "g7": block(rework, "no task-scoped activity"),
        "g8": block(True),
    }
    return {
        "source": source_of(manifest), "metrics": manifest["metrics"], "blocks": blocks,
        "groups": [key for key, _ in GROUPS],
        "kpis": kpis, "tasks": tasks, "categories": categories, "timeline": timeline,
        "cumulative": cumulative, "commands": commands_view, "findings": findings_view,
        "rework": rework, "quality": quality,
    }


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--workdir", required=True)
    p.add_argument("--max-lanes", type=int, default=24, help="subagent lanes shown before aggregating (default 24)")
    a = p.parse_args()
    workdir = Path(a.workdir).resolve()
    manifest = read_json(workdir / "manifest.json")
    if manifest["metrics"]["available"]:
        query = read_json(workdir / "query.json")
        raw = load_records(manifest["spec_dir"], manifest["run"], {"acceptance", "quality", "finding"})
        data = build(query, manifest, raw, a.max_lanes)
    else:
        data = unavailable(manifest)
    write_json(workdir / "dashboard-data.json", data)
    k = data.get("kpis") or {}
    print(json.dumps({"metrics": data["metrics"]["available"], "elapsed_seconds": k.get("elapsed_seconds"),
                      "activities": k.get("activities"), "commands": k.get("commands"),
                      "findings": k.get("findings"), "tokens_total": (k.get("tokens") or {}).get("total"),
                      "unavailable_charts": [c for c, b in data["blocks"].items() if not b["available"]]}))


if __name__ == "__main__":
    main()
