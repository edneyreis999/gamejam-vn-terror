#!/usr/bin/env python3
"""Prepare or verify a CP-01–20 author review against public descriptors."""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import sys

VERSION = "1.0.0"
CHECKLIST = "CP-01-20/v1"
CRITERIA = tuple(f"CP-{number:02}" for number in range(1, 21))


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=False, allow_nan=False)


def fingerprint(descriptor):
    return "sha256:" + hashlib.sha256(canonical(descriptor).encode("utf-8")).hexdigest()


def nonempty(value):
    return isinstance(value, str) and bool(value.strip())


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"duplicate JSON key {key!r}; keep one value")
        result[key] = value
    return result


def read_json(path):
    def invalid_constant(value):
        raise ValueError(f"invalid JSON number {value}")
    with Path(path).open(encoding="utf-8") as stream:
        return json.load(stream, object_pairs_hook=unique_object, parse_constant=invalid_constant)


def identity(entry):
    if not isinstance(entry, dict) or not all(nonempty(entry.get(k)) for k in ("namespace", "id")):
        raise ValueError("entry requires nonempty namespace and id")
    return entry["namespace"], entry["id"]


def inventory_entries(inventory):
    if not isinstance(inventory, dict) or type(inventory.get("schemaVersion")) is not int or inventory["schemaVersion"] != 1:
        raise ValueError("inventory: use schemaVersion 1")
    if inventory.get("checklistVersion") != CHECKLIST:
        raise ValueError(f"inventory: use checklistVersion {CHECKLIST}")
    entries = inventory.get("entries")
    if not isinstance(entries, list) or not entries:
        raise ValueError("inventory: collect a nonempty public scope")
    indexed = {}
    for entry in entries:
        pair = identity(entry)
        label = "/".join(pair)
        if pair in indexed:
            raise ValueError(f"{label}: duplicate inventory ID; collect each pair once")
        descriptor = entry.get("descriptor")
        if not isinstance(descriptor, dict) or descriptor.get("id") != pair[1]:
            raise ValueError(f"{label}: supply the complete public descriptor with matching id")
        indexed[pair] = descriptor
    return indexed


def prepare(inventory, task, author):
    entries = inventory_entries(inventory)
    if not nonempty(task) or not nonempty(author):
        raise ValueError("prepare: supply task and author")
    return {"schemaVersion": 1, "checklistVersion": CHECKLIST, "task": task,
            "author": author, "reviewedAt": "", "evidence": {}, "entries": [
                {"namespace": ns, "id": id_, "descriptorHash": fingerprint(descriptor),
                 "classification": "", "criteria": {cp: {"status": "pending"} for cp in CRITERIA}}
                for (ns, id_), descriptor in entries.items()]}


def pointed(value, pointer):
    if not isinstance(pointer, str) or pointer and not pointer.startswith("/"):
        raise ValueError("use an RFC 6901 JSON pointer (empty selects the descriptor)")
    for token in pointer.split("/")[1:]:
        if re.search(r"~(?![01])", token):
            raise ValueError("invalid JSON pointer escape")
        token = token.replace("~1", "/").replace("~0", "~")
        if isinstance(value, list) and re.fullmatch(r"0|[1-9][0-9]*", token):
            value = value[int(token)]
        elif isinstance(value, dict):
            value = value[token]
        else:
            raise ValueError("pointer does not select a public field")
    return value


def verify(inventory, review):
    descriptors = inventory_entries(inventory)
    issues = []

    def issue(entry, criterion, repair):
        issues.append({"entry": entry, "criterion": criterion, "repair": repair})

    def check_evidence(ref, label, cp):
        item = evidence.get(ref) if isinstance(ref, str) else None
        if not isinstance(item, dict):
            issue(label, cp, f"define evidence {ref!r} and reference its ID")
            return
        if not nonempty(item.get("factual")):
            issue(label, cp, f"evidence {ref}: supply the factual source, location and verification basis")
        public = item.get("public")
        if not isinstance(public, list) or not public:
            issue(label, cp, f"evidence {ref}: cite at least one public descriptor field")
            return
        for location in public:
            try:
                pair = identity(location)
                value = pointed(descriptors[pair], location.get("pointer"))
                if "value" not in location or canonical(value) != canonical(location["value"]):
                    raise ValueError("recorded public value differs")
            except (ValueError, KeyError, IndexError, TypeError) as error:
                issue(label, cp, f"evidence {ref}: repair public reference/value ({error})")

    if not isinstance(review, dict):
        review = {}
    if type(review.get("schemaVersion")) is not int or review.get("schemaVersion") != 1:
        issue("review", None, "use schemaVersion 1")
    if review.get("checklistVersion") != CHECKLIST:
        issue("review", None, f"use checklistVersion {CHECKLIST} and review all checkpoints")
    for field in ("task", "author", "reviewedAt"):
        if not nonempty(review.get(field)):
            issue("review", None, f"fill {field}")
    evidence = review.get("evidence")
    if not isinstance(evidence, dict):
        issue("review", None, "provide an evidence object keyed by evidence ID")
        evidence = {}
    entries = review.get("entries")
    if not isinstance(entries, list):
        issue("review", None, "provide an entries array")
        entries = []
    seen = set()
    for entry in entries:
        try:
            pair = identity(entry)
        except ValueError as error:
            issue("review", None, str(error))
            continue
        label = "/".join(pair)
        if pair in seen:
            issue(label, None, "remove duplicate review entry")
        seen.add(pair)
        if pair not in descriptors:
            issue(label, None, "remove entry outside the required inventory; scope is supplied independently")
            continue
        if entry.get("descriptorHash") != fingerprint(descriptors[pair]):
            issue(label, None, "descriptor changed; rereview this entry and affected containers, then update descriptorHash")
        if entry.get("classification") not in ("operational", "editorial", "structural"):
            issue(label, None, "classify as operational, editorial or structural")
        criteria = entry.get("criteria")
        if not isinstance(criteria, dict):
            criteria = {}
        for extra in criteria.keys() - set(CRITERIA):
            issue(label, extra, "remove unknown checkpoint")
        for cp in CRITERIA:
            result = criteria.get(cp)
            if not isinstance(result, dict):
                issue(label, cp, "supply checkpoint result")
                continue
            status = result.get("status")
            if status == "conformant":
                refs = result.get("evidence")
                if not isinstance(refs, list) or not refs:
                    issue(label, cp, "reference public evidence with a factual verification basis")
                else:
                    for ref in refs:
                        check_evidence(ref, label, cp)
            elif status == "not_applicable":
                if not nonempty(result.get("reason")):
                    issue(label, cp, "explain why this checkpoint does not apply to this entry")
            elif status == "pending":
                issue(label, cp, "perform the review; pending is not approval")
            else:
                issue(label, cp, "use conformant, not_applicable or pending; resolve before verification")
    for pair in descriptors.keys() - seen:
        issue("/".join(pair), None, "add missing entry and review all 20 checkpoints")
    return {"schemaVersion": 1, "verifierVersion": VERSION, "checklistVersion": CHECKLIST,
            "checkedAt": datetime.now(timezone.utc).isoformat(), "task": review.get("task"),
            "status": "fail" if issues else "pass", "entries": [
                {"namespace": ns, "id": id_, "descriptorHash": fingerprint(descriptor)}
                for (ns, id_), descriptor in descriptors.items()], "issues": issues}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--version", action="version", version=VERSION)
    commands = parser.add_subparsers(dest="operation", required=True)
    for operation in ("prepare", "verify"):
        command = commands.add_parser(operation)
        command.add_argument("--inventory", required=True, type=Path)
        command.add_argument("--output", type=Path, help="optional JSON output; never an input path")
        if operation == "prepare":
            command.add_argument("--task", required=True)
            command.add_argument("--author", required=True)
        else:
            command.add_argument("--review", required=True, type=Path)
    args = parser.parse_args()
    try:
        inputs = [args.inventory] + ([args.review] if args.operation == "verify" else [])
        if args.output and any(args.output.resolve() == path.resolve() or
                               args.output.exists() and path.exists() and args.output.samefile(path) for path in inputs):
            raise ValueError("output must differ from every input")
        inventory = read_json(args.inventory)
        result = prepare(inventory, args.task, args.author) if args.operation == "prepare" else verify(inventory, read_json(args.review))
        encoded = json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False) + "\n"
        if args.output:
            # Preparation must not erase a filled author review.
            with args.output.open("x" if args.operation == "prepare" else "w", encoding="utf-8") as stream:
                stream.write(encoded)
        else:
            print(encoded, end="")
        if args.operation == "prepare":
            print(f"Prepared {len(result['entries'])} entries, all checkpoints pending; no approval.", file=sys.stderr)
        elif result["status"] == "fail":
            for item in result["issues"]:
                print(f"{item['entry']} {item['criterion'] or '-'}: {item['repair']}", file=sys.stderr)
            return 1
        return 0
    except (OSError, ValueError, TypeError, RecursionError) as error:
        print(f"check-cli-docs: {error}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
