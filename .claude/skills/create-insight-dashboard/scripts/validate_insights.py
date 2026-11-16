"""Merge lens fragments, or validate consolidated insights against their evidence.

Merge:    --fragments DIR --draft FILE   joins every DIR/*.json fragment into a draft; each of the
                                         17 topics must appear exactly once.
Validate: --insights FILE --out DIR      resolves every citation and writes DIR/insights.json.
Both report every error and exit 1 when any exists; validate then writes nothing.

Paths are relative to a named root: `project` (the default, from the work directory's manifest)
or one declared with --root NAME=DIR. Absolute paths and paths leaving their root are refused,
and the output records root names only. See references/insights-format.md for the schema.
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

from _common import read_json, write_json

SOURCES = {"dashboard": "dashboard-data.json", "sessions": "sessions.json", "facts": "facts.json"}
SEGMENT = re.compile(r"([^.\[\]]+)|\[([^\]]+)\]")

LENSES = {
    "orchestration": ("skills", "coordinator-context", "parallelism"),
    "verification": ("test-architecture", "command-failures", "fixtures-readiness", "test-infrastructure",
                     "fresh-agent", "persona-qa"),
    "code": ("code-architecture", "technology"),
    "planning": ("spec-tasks", "findings-recurrence"),
    "harness": ("project-instructions", "instrumentation"),
    "delivery": ("delivery", "storage"),
}
TOPICS = [topic for topics in LENSES.values() for topic in topics]

CHANGE_KINDS = {"instruction", "tool", "process", "user_decision", "local", "observation"}
STRICT_KINDS = {"instruction", "tool"}
STATES = {"absent", "defective", "not_loaded", "misapplied", "insufficient"}
READ_STATES = {"misapplied", "insufficient"}
DESTINATIONS = {"general_skill", "engine_specialization", "project_guide_or_helper", "local_fix"}
REQUIRED_OPTIONS = {"keep", "remove", "minimal"}
RECURRENCE_KINDS = {"recurrence", "successive_attempts", "single_execution"}
EVALUATION_FIELDS = ("signal", "costs", "lost_protections", "side_effects", "textual_review", "behavioral_benefit")
TEXT_FORMATS = {"diff", "before_after"}
CONFIDENCE = {"high", "medium", "low"}
DERIVED = ("excerpt", "value", "finding")


class Roots:
    def __init__(self, roots):
        self.roots = {name: Path(path).resolve() for name, path in roots.items()}

    def base(self, name):
        if name not in self.roots:
            raise ValueError(f"unknown root {name!r} (declare it with --root {name}=DIR)")
        return self.roots[name]

    def file(self, root, path):
        if not path or Path(path).is_absolute():
            raise ValueError(f"path {path!r} must be relative to its root")
        base = self.base(root)
        full = (base / path).resolve()
        if not full.is_relative_to(base):
            raise ValueError(f"path {path!r} leaves root {root}")
        return full

    def blob(self, root, rev, path):
        if not path or Path(path).is_absolute():
            raise ValueError(f"git path {path!r} must be relative to the repository")
        result = subprocess.run(["git", "-C", str(self.base(root)), "show", f"{rev}:./{path}"], capture_output=True)
        if result.returncode:
            raise ValueError(f"git {rev}:{path} not found in root {root}")
        return result.stdout


def resolve(data, path):
    current = data
    for key, selector in SEGMENT.findall(path):
        if selector:
            wanted = dict(part.split("=", 1) for part in selector.split(","))
            matches = [item for item in current if all(str(item.get(k)) == v for k, v in wanted.items())]
            if len(matches) != 1:
                raise KeyError(f"selector [{selector}] matched {len(matches)} items")
            current = matches[0]
        elif isinstance(current, list):
            current = current[int(key)]
        else:
            current = current[key]
    return current


def line_of(lines, line, where):
    if not isinstance(line, int) or not 1 <= line <= len(lines):
        raise ValueError(f"{where}:{line} does not exist")
    return lines[line - 1].strip()[:240]


def check(evidence, sources, labels, roots):
    evidence = {k: v for k, v in evidence.items() if k not in DERIVED}
    if not evidence.get("label"):
        raise ValueError("evidence needs a label")
    kind = evidence.get("kind")
    if kind == "file":
        path = roots.file(evidence.get("root", "project"), evidence.get("path"))
        lines = path.read_text(errors="ignore").splitlines() if path.is_file() else []
        return {**evidence, "excerpt": line_of(lines, evidence.get("line"), evidence.get("path"))}
    if kind == "git":
        blob = roots.blob(evidence.get("repo", "project"), evidence.get("rev"), evidence.get("path"))
        excerpt = line_of(blob.decode(errors="ignore").splitlines(), evidence.get("line"),
                          f"{evidence.get('rev')}:{evidence.get('path')}")
        same = evidence.get("same_as")
        if same is not None:
            target = roots.file(same.get("root", "project"), same.get("path"))
            if not target.is_file() or target.read_bytes() != blob:
                raise ValueError(f"{evidence['rev']}:{evidence['path']} differs from {same.get('root', 'project')}:{same.get('path')}")
        return {**evidence, "excerpt": excerpt}
    if kind == "data":
        source = sources.get(evidence.get("source"))
        if source is None:
            raise ValueError(f"data source {evidence.get('source')!r} not in {sorted(SOURCES)}")
        value = resolve(source, evidence.get("path", ""))
        if evidence.get("show") == "len":
            value = len(value)
        return {**evidence, "value": value}
    if kind == "finding":
        finding = labels.get(evidence["label"])
        if finding is None:
            raise ValueError(f"finding {evidence['label']} not found")
        return {**evidence, "finding": finding}
    raise ValueError(f"unknown evidence kind {kind!r}")


def check_item(item, roots):
    """Return the protocol errors of one insight item (fields, enums, conditional requirements)."""
    errors = [f"missing {f}" for f in ("insight", "impact", "recommendation") if not item.get(f)]
    if item.get("confidence") not in CONFIDENCE:
        errors.append(f"confidence {item.get('confidence')!r} not in {sorted(CONFIDENCE)}")
    if not item.get("evidence"):
        errors.append("item needs evidence")
    kind = item.get("change_kind")
    if kind not in CHANGE_KINDS:
        return errors + [f"change_kind {kind!r} not in {sorted(CHANGE_KINDS)}"]
    if kind != "observation":
        priority = item.get("priority")
        if not isinstance(priority, dict) or not isinstance(priority.get("selected"), bool) or not priority.get("rationale"):
            errors.append("priority needs selected (bool) and rationale")
    recurrence = item.get("recurrence")
    if recurrence is not None and (recurrence.get("kind") not in RECURRENCE_KINDS or not recurrence.get("evidence")):
        errors.append(f"recurrence needs kind in {sorted(RECURRENCE_KINDS)} and evidence")
    if kind not in STRICT_KINDS:
        return errors

    guidance = item.get("guidance") or {}
    state = guidance.get("state")
    if state not in STATES:
        errors.append(f"guidance.state {state!r} not in {sorted(STATES)}")
    if not guidance.get("summary") or not guidance.get("version"):
        errors.append("guidance needs summary and version")
    evidence = guidance.get("evidence") or []
    if not any(e.get("kind") == "git" for e in evidence) and not guidance.get("unrecoverable"):
        errors.append("guidance needs a git evidence or an unrecoverable reason")
    if state in READ_STATES:
        reads = [e for e in evidence if e.get("reading")]
        if not reads:
            errors.append(f"guidance.state {state} needs evidence marked reading: true (existence is not reading)")
        elif not all(e.get("kind") == "file" or (e.get("kind") == "data" and e.get("source") == "sessions") for e in reads):
            errors.append("reading evidence must be session data or a file citation")

    alternatives = item.get("alternatives") or []
    options = {a.get("option") for a in alternatives}
    if not REQUIRED_OPTIONS <= options:
        errors.append(f"alternatives missing {sorted(REQUIRED_OPTIONS - options)}")
    if any(not a.get("loses") or not a.get("judgment") for a in alternatives):
        errors.append("every alternative needs loses and judgment")
    if sum(1 for a in alternatives if a.get("recommended")) != 1:
        errors.append("exactly one alternative must be recommended")

    if item.get("destination") not in DESTINATIONS:
        errors.append(f"destination {item.get('destination')!r} not in {sorted(DESTINATIONS)}")
    evaluation = item.get("evaluation") or {}
    missing = [f for f in EVALUATION_FIELDS if not evaluation.get(f)]
    if missing:
        errors.append(f"evaluation missing {missing}")

    text = item.get("proposed_text")
    if kind == "instruction" and text is None:
        errors.append("instruction item needs proposed_text")
    if text is not None:
        base = text.get("base") or {}
        if text.get("format") not in TEXT_FORMATS or not text.get("text") or not text.get("target"):
            errors.append(f"proposed_text needs target, text and format in {sorted(TEXT_FORMATS)}")
        try:
            roots.blob(base.get("repo", "project"), base.get("rev"), base.get("path"))
        except ValueError as error:
            errors.append(f"proposed_text.base: {error}")
    return errors


def validate(insights, sources, roots):
    """Resolve every citation in place; return (errors, counts)."""
    labels = {f["finding"]: f for f in ((sources.get("dashboard") or {}).get("findings") or {}).get("list", [])}
    errors = []
    counts = {"insight": 0, "none": 0, "items": 0, "priority": 0, "no_change": 0, "pending": 0, "evidence": 0, "git": 0}

    def resolve_all(owner, where):
        resolved = []
        for evidence in owner.get("evidence") or []:
            try:
                resolved.append(check(evidence, sources, labels, roots))
            except (KeyError, ValueError, IndexError, TypeError, OSError) as error:
                errors.append(f"{where}: {evidence.get('label')}: {error}")
                resolved.append(evidence)
        owner["evidence"] = resolved
        counts["evidence"] += len(resolved)
        counts["git"] += sum(1 for e in resolved if e.get("kind") == "git")

    if not insights.get("scope"):
        errors.append("scope: say which sources were consulted, with revisions and availability")
    ids = [t.get("id") for t in insights.get("topics", [])]
    for topic_id in TOPICS:
        if ids.count(topic_id) != 1:
            errors.append(f"topic {topic_id} appears {ids.count(topic_id)} times (expected once)")
    errors.extend(f"unknown topic {t}" for t in ids if t not in TOPICS)

    for topic in insights.get("topics", []):
        status = topic.get("status")
        if status not in ("insight", "none") or not topic.get("title"):
            errors.append(f"{topic.get('id')}: needs title and status insight|none")
            continue
        counts[status] += 1
        if status == "none":
            continue
        if not topic.get("items"):
            errors.append(f"{topic['id']}: status insight without items")
        for n, item in enumerate(topic.get("items") or [], 1):
            where = f"{topic['id']}#{n}"
            errors.extend(f"{where}: {e}" for e in check_item(item, roots))
            resolve_all(item, where)
            for part in ("guidance", "recurrence"):
                if isinstance(item.get(part), dict):
                    resolve_all(item[part], f"{where}.{part}")
            for row in item.get("recurrence_table") or []:
                if row.get("kind") not in RECURRENCE_KINDS or not row.get("evidence"):
                    errors.append(f"{where}.{row.get('pattern')}: row needs kind in {sorted(RECURRENCE_KINDS)} and evidence")
                resolve_all(row, f"{where}.{row.get('pattern')}")
            counts["items"] += 1
            counts["priority"] += bool((item.get("priority") or {}).get("selected"))

    for section, fields in (("no_change", ("title", "reason")), ("pending", ("title", "gap", "decide_with"))):
        seen = set()
        for entry in insights.get(section, []):
            where = f"{section}:{entry.get('id')}"
            if entry.get("id") in seen:
                errors.append(f"{where}: duplicate id")
            seen.add(entry.get("id"))
            missing = [f for f in fields if not entry.get(f)]
            if missing or not entry.get("evidence"):
                errors.append(f"{where}: needs {', '.join(fields)} and evidence")
            resolve_all(entry, where)
            counts[section] += 1

    refs = {f"{section}:{entry.get('id')}" for section in ("no_change", "pending") for entry in insights.get(section, [])}
    for topic in insights.get("topics", []):
        errors.extend(f"{topic.get('id')}: see {ref} does not exist" for ref in topic.get("see", []) if ref not in refs)
    return errors, counts


def merge(directory):
    """Join lens fragments: {lens, topics[], no_change[], pending[]} → one draft in canonical topic order."""
    topics, no_change, pending, lenses = {}, [], [], []
    errors = []
    for path in sorted(Path(directory).glob("*.json")):
        try:
            fragment = read_json(path)
        except (OSError, json.JSONDecodeError) as error:
            errors.append(f"{path.name}: {error}")
            continue
        lenses.append(fragment.get("lens") or path.stem)
        for topic in fragment.get("topics", []):
            if topic.get("id") in topics:
                errors.append(f"{path.name}: topic {topic.get('id')} already provided")
            topics[topic.get("id")] = topic
        no_change += fragment.get("no_change", [])
        pending += fragment.get("pending", [])
    ordered = [topics[t] for t in TOPICS if t in topics] + [t for k, t in topics.items() if k not in TOPICS]
    return {"version": 2, "scope": "", "lenses": lenses, "topics": ordered,
            "no_change": no_change, "pending": pending}, errors


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--workdir", required=True, help="work directory written by prepare.py")
    p.add_argument("--root", action="append", default=[], metavar="NAME=DIR", help="extra evidence root")
    mode = p.add_mutually_exclusive_group(required=True)
    mode.add_argument("--fragments", help="directory of lens fragments to merge")
    mode.add_argument("--insights", help="consolidated insights file to validate")
    p.add_argument("--draft", help="merge output file")
    p.add_argument("--out", help="validate output directory (receives insights.json)")
    a = p.parse_args()

    workdir = Path(a.workdir).resolve()
    manifest = read_json(workdir / "manifest.json")
    named = {"project": manifest["project"]}
    for item in a.root:
        name, _, path = item.partition("=")
        if not name or not path or name in named:
            sys.exit(f"bad --root {item!r}")
        named[name] = path
    roots = Roots(named)
    sources = {name: read_json(workdir / file) for name, file in SOURCES.items() if (workdir / file).is_file()}

    if a.fragments:
        if not a.draft:
            sys.exit("--fragments needs --draft")
        insights, errors = merge(a.fragments)
        insights["scope"] = "(to write during consolidation)"
        found, counts = validate(json.loads(json.dumps(insights)), sources, roots)
        errors += [e for e in found if not e.startswith("scope:")]
        write_json(a.draft, insights)
    else:
        if not a.out:
            sys.exit("--insights needs --out")
        insights = read_json(a.insights)
        errors, counts = validate(insights, sources, roots)
        if not errors:
            insights["roots"] = sorted(named)
            Path(a.out).mkdir(parents=True, exist_ok=True)
            write_json(Path(a.out) / "insights.json", insights)
    if errors:
        print("\n".join(errors), file=sys.stderr)
        sys.exit(1)
    print(json.dumps({"topics": len(insights["topics"]), **counts}))


if __name__ == "__main__":
    main()
