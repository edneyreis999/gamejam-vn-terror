#!/usr/bin/env python3
"""Submit or validate deep-review jobs; artifacts stay under --out.

  --job LABEL --submit          Compile the assigned draft and publish it only
                                after every local contract check passes.
  --job LABEL --validate-only   Validate this job; write its local status only.
  --validate-only              Validate the stage, adopt completed drafts, and
                                check the source freeze before the final barrier.

Valid outputs are preserved across resumes. Invalid artifacts receive a repair
prompt with all errors. Exit codes: 0 valid, 1 invalid/pending, 3 source drift.
Argparse uses exit 2 for invalid CLI arguments. Local commands avoid the global
freeze; global validation checks it unless --no-freeze-check.
"""

from __future__ import annotations

import argparse
import json
import shlex
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

sys.dont_write_bytecode = True

from _common import (
    KNOWN_KINDS, atomic_write_json, check_freeze, job_contract_digest, job_output_errors, load_jobs,
    normalize_job_output, read_json, rel, repo_root,
)


def say(message: str) -> None:
    print(message, flush=True)


def timestamp() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds")


def artifact_path(repo: Path, out: Path, value: str) -> Path:
    path = (repo / value).resolve()
    if not path.is_relative_to(out.resolve()):
        raise RuntimeError(f"job artifact must be inside --out: {value}")
    return path


def draft_path(repo: Path, out: Path, job: dict) -> Path:
    return artifact_path(repo, out, job.get("draft", str(out / "agents" / f"{job['label']}.draft.json")))


def submit_job(repo: Path, out: Path, job: dict, source: Path | None = None) -> list[str]:
    """Validate before atomic publication; invalid submissions never erase output."""
    source = source or draft_path(repo, out, job)
    try:
        canonical = normalize_job_output(read_json(source), job)
        atomic_write_json(artifact_path(repo, out, job["output"]), canonical)
    except (RuntimeError, ValueError) as error:
        return str(error).splitlines()
    return []


def inspect_job(repo: Path, out: Path, job: dict, adopt_draft: bool = False) -> tuple[str, list[str], Path | None]:
    output = artifact_path(repo, out, job["output"])
    output_errors = job_output_errors(repo, job)
    if not output_errors:
        return "valid", [], output
    draft = draft_path(repo, out, job)
    if draft.is_file():
        try:
            canonical = normalize_job_output(read_json(draft), job)
        except (RuntimeError, ValueError) as error:
            return "invalid", str(error).splitlines(), draft
        if adopt_draft:
            atomic_write_json(output, canonical)
            return "valid", [], output
        return "pending", ["valid draft awaits --job " + job["label"] + " --submit"], draft
    if output.is_file():
        return "invalid", output_errors, output
    return "pending", [f"missing output {job['output']}"], None


def repair_prompt(repo: Path, out: Path, job: dict, artifact: Path, errors: list[str]) -> str:
    path = artifact_path(repo, out, str(out / "runs" / f"{job['label']}.repair.md"))
    path.parent.mkdir(parents=True, exist_ok=True)
    contract = job.get("contract")
    contract_text = (f"Read the assigned contract: `{contract}`.\n" if contract else
                     "Assigned contract:\n```json\n" + json.dumps(job, ensure_ascii=False) + "\n```\n")
    command = [sys.executable, str(Path(__file__).resolve()), "--out", str(out),
               "--job", job["label"], "--submit", "--input", str(artifact)]
    path.write_text(
        f"# Repair result for {job['label']}\n\n"
        f"Continue from the existing result `{rel(artifact, repo)}`. Preserve valid findings, "
        "evidence, and explicit assessments. Fix the listed contract failures in that artifact; "
        "do not restart the review merely to reconstruct JSON. Missing assessments require actual "
        "review of the missing scope; never fill clear/compliant by default. A stale digest means "
        "the assignment or source changed: inspect the current contract and changed scope before "
        "updating any digest or assessments.\n\n"
        + contract_text + f"Original review instructions: `{job['prompt']}`.\n\n"
        "All current validation errors:\n\n" + "\n".join(f"- {error}" for error in errors)
        + "\n\nSubmit the repaired artifact:\n```sh\n" + shlex.join(command) + "\n```\n",
        encoding="utf-8",
    )
    return rel(path, repo)


def status_row(repo: Path, out: Path, job: dict, adopt_draft: bool = False) -> dict:
    started = time.monotonic()
    state, errors, artifact = inspect_job(repo, out, job, adopt_draft)
    row = {"label": job["label"], "status": state, "reason": "\n".join(errors) or None,
           "errors": errors, "checked_at": timestamp(),
           "validation_seconds": round(time.monotonic() - started, 6)}
    if state != "valid":
        row.update(prompt=job["prompt"], output=job["output"])
        for key in ("draft", "contract"):
            if key in job:
                row[key] = job[key]
        if artifact is not None:
            row["artifact"] = rel(artifact, repo)
            row["repair_prompt"] = repair_prompt(repo, out, job, artifact, errors)
            row["prompt"] = row["repair_prompt"]
    return row


def freeze_errors(repo: Path, out: Path, stage: str) -> list[str]:
    try:
        return check_freeze(repo, out, stage)
    except RuntimeError as error:
        return [str(error)]


def load_local_job(out: Path, label: str, jobs_path: Path, explicit_jobs_file: bool) -> dict:
    contract = (out / "contracts" / f"{label}.json").resolve()
    if not contract.is_relative_to(out):
        raise RuntimeError(f"job contract must be inside --out: {contract}")
    if contract.is_file() and not explicit_jobs_file:
        job = read_json(contract)
        if not isinstance(job, dict) or job.get("label") != label or job.get("kind") not in KNOWN_KINDS:
            raise RuntimeError(f"invalid job contract: {contract}")
        if job.get("job_digest") and job["job_digest"] != job_contract_digest(job):
            raise RuntimeError(f"stale or altered job contract: {contract}; rebuild jobs before submitting")
        return job
    jobs = [job for job in load_jobs(jobs_path) if job["label"] == label]
    if not jobs:
        raise RuntimeError(f"unknown job: {label}")
    return jobs[0]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--out", required=True)
    parser.add_argument("--jobs-file", help="default: <out>/jobs.json")
    parser.add_argument("--only", nargs="*", help="exact stage job labels to consider")
    parser.add_argument("--job", help="one assigned job; reads its compact contract directly")
    parser.add_argument("--submit", action="store_true")
    parser.add_argument("--input", help="draft to submit; default: job.draft")
    parser.add_argument("--validate-only", action="store_true")
    parser.add_argument("--status-file", help="default: <out>/runs/<job-or-jobs-stem>-status.json")
    parser.add_argument("--no-freeze-check", action="store_true")
    args = parser.parse_args()
    if sum(bool(value) for value in (args.validate_only, args.submit)) != 1:
        parser.error("pass exactly one of --validate-only or --submit")
    if args.submit and not args.job:
        parser.error("--submit requires --job")
    if args.input and not args.submit:
        parser.error("--input requires --submit")
    if args.job and args.only:
        parser.error("--job is local; use it with --submit or --validate-only")
    if args.job and (Path(args.job).name != args.job or args.job in {".", ".."}):
        parser.error("--job must be a label, not a path")
    started_at, started = timestamp(), time.monotonic()
    repo = repo_root()
    out = Path(args.out).resolve()
    jobs_path = Path(args.jobs_file).resolve() if args.jobs_file else out / "jobs.json"
    try:
        for folder in ("agents", "contracts", "prompts", "runs"):
            artifact_path(repo, out, str(out / folder))
        jobs = ([load_local_job(out, args.job, jobs_path, bool(args.jobs_file))] if args.job else load_jobs(jobs_path))
        for job in jobs:
            if Path(job["label"]).name != job["label"] or job["label"] in {".", ".."}:
                raise RuntimeError(f"invalid job label: {job['label']}")
            artifact_path(repo, out, job["output"])
            draft_path(repo, out, job)
            for key in ("prompt", "contract"):
                if job.get(key):
                    artifact_path(repo, out, job[key])
    except (RuntimeError, KeyError) as error:
        sys.stderr.write(f"{error}\n")
        return 1
    if args.only:
        unknown = set(args.only) - {job["label"] for job in jobs}
        if unknown:
            parser.error(f"unknown jobs: {sorted(unknown)}")
        jobs = [job for job in jobs if job["label"] in args.only]
    default_status = out / "runs" / f"{args.job or jobs_path.stem}-status.json"
    status_path = (Path(args.status_file) if args.status_file else default_status).resolve()
    if not status_path.is_relative_to(out):
        parser.error("--status-file must be inside --out")
    if args.job and status_path == (out / "runs" / f"{jobs_path.stem}-status.json").resolve():
        parser.error("local validation cannot overwrite the global status file")

    def write_status(mode: str, rows: list[dict], **extra) -> None:
        atomic_write_json(status_path, {"mode": mode, "jobs": rows, "started_at": started_at,
                                      "finished_at": timestamp(),
                                      "elapsed_seconds": round(time.monotonic() - started, 6), **extra})

    if args.submit:
        job = jobs[0]
        source = Path(args.input).resolve() if args.input else draft_path(repo, out, job)
        errors = submit_job(repo, out, job, source)
        if errors:
            row = {"label": job["label"], "status": "invalid", "reason": "\n".join(errors), "errors": errors,
                   "artifact": rel(source, repo), "output": job["output"], "checked_at": timestamp()}
            row["repair_prompt"] = repair_prompt(repo, out, job, source, errors)
            row["prompt"] = row["repair_prompt"]
        else:
            row = status_row(repo, out, job)
        write_status("submit", [row])
        say(f"{row['status'].upper()} {job['label']}" + ("\n" + "\n".join(errors) if errors else ""))
        return 1 if errors else 0

    drift = [] if args.job or args.no_freeze_check else freeze_errors(repo, out, "before validation")
    rows = [status_row(repo, out, job, adopt_draft=not args.job and not drift) for job in jobs]
    if not args.job and not args.no_freeze_check and not drift:
        drift = freeze_errors(repo, out, "after validation")
    write_status("validate", rows, freeze_errors=drift)
    for row in rows:
        say(f"{row['status'].upper()} {row['label']}" + (f" — {row['reason']}" if row["reason"] else ""))
    pending = [row for row in rows if row["status"] != "valid"]
    say(f"SUMMARY valid={len(rows) - len(pending)} pending={len(pending)} of {len(rows)}")
    if drift:
        sys.stderr.write("\n".join(drift) + "\n")
        return 3
    return 0 if not pending else 1


if __name__ == "__main__":
    sys.exit(main())
