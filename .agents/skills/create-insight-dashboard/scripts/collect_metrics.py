"""Locate a spec's execution-metrics records, run the spec-execution-metrics reader, write `manifest.json`.

Reads the working tree directly, or a Git revision with --commit (the whole spec directory is
extracted with `git archive` into the work directory; the project is never checked out or written).
Without records or without the reader, the manifest says `metrics.available: false` and why.
"""

import argparse
import hashlib
import io
import json
import subprocess
import sys
import tarfile
from pathlib import Path

from _common import SKILL_ROOT, git, write_json

DEFAULT_READER = SKILL_ROOT.parent / "spec-execution-metrics" / "scripts" / "metrics.py"


def spec_title(spec_dir):
    spec = Path(spec_dir) / "_spec.md"
    if spec.is_file():
        for line in spec.read_text(errors="ignore").splitlines():
            if line.startswith("# "):
                return line[2:].strip()
    return Path(spec_dir).name


def snapshot(project, spec_rel, commit, workdir):
    """Extract the spec directory at `commit` into workdir/snapshot; return (spec_dir, full commit, subject)."""
    top = Path(git(project, "rev-parse", "--show-toplevel"))
    in_repo = (Path(project).resolve() / spec_rel).relative_to(top.resolve()).as_posix()
    full = git(top, "rev-parse", "--verify", f"{commit}^{{commit}}")
    archive = git(top, "archive", full, "--", in_repo, binary=True)
    dest = Path(workdir) / "snapshot"
    with tarfile.open(fileobj=io.BytesIO(archive)) as tar:
        tar.extractall(dest, filter="data")
    return dest / in_repo, full, git(top, "log", "-1", "--format=%s", full)


def discover(spec_dir, wanted_run):
    """Return (run, coordinator session, published file count) or raise LookupError with the reason."""
    root = Path(spec_dir) / "execution-metrics"
    if not root.is_dir():
        raise LookupError("the spec has no execution-metrics directory")
    files = sorted(root.glob("*/*/*.json"))
    runs = sorted({path.parent.parent.name for path in files})
    if not runs:
        raise LookupError("execution-metrics has no published records")
    if wanted_run is None and len(runs) > 1:
        sys.exit(f"several runs found, pass --run: {', '.join(runs)}")
    run = wanted_run or runs[0]
    if run not in runs:
        sys.exit(f"run {run} not found; available: {', '.join(runs)}")
    coordinator = None
    for path in (root / run).glob("*/*.json"):
        try:
            record = json.loads(path.read_text())
        except (OSError, json.JSONDecodeError):
            continue
        if record.get("kind") == "execution":
            coordinator = (record.get("data") or {}).get("session")
    return run, coordinator, len([f for f in files if f.parent.parent.name == run])


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--spec", required=True, help="spec directory (absolute or relative to --project)")
    p.add_argument("--project", default=".", help="game project root (default: current directory)")
    p.add_argument("--workdir", required=True, help="scratch directory outside the project")
    p.add_argument("--run", help="execution run; required when the spec has more than one")
    p.add_argument("--commit", help="read the spec from this Git revision instead of the working tree")
    p.add_argument("--metrics", default=str(DEFAULT_READER), help="path to spec-execution-metrics scripts/metrics.py")
    a = p.parse_args()

    project = Path(a.project).resolve()
    workdir = Path(a.workdir).resolve()
    workdir.mkdir(parents=True, exist_ok=True)
    spec_path = Path(a.spec) if Path(a.spec).is_absolute() else project / a.spec
    spec_rel = spec_path.resolve().relative_to(project).as_posix()

    manifest = {"project": str(project), "spec": spec_rel, "commit": None, "commit_subject": None}
    if a.commit:
        spec_dir, manifest["commit"], manifest["commit_subject"] = snapshot(project, spec_rel, a.commit, workdir)
    else:
        spec_dir = spec_path.resolve()
        manifest["commit"] = git(project, "rev-parse", "HEAD", check=False)
        manifest["commit_subject"] = git(project, "log", "-1", "--format=%s", check=False)
        manifest["working_tree"] = True
    if not spec_dir.is_dir():
        sys.exit(f"spec directory not found: {spec_dir}")
    manifest.update(spec_dir=str(spec_dir), title=spec_title(spec_dir))

    metrics = {"available": False, "reason": None}
    try:
        run, coordinator, count = discover(spec_dir, a.run)
        manifest.update(run=run, coordinator_session=coordinator, published_file_count=count)
        reader = Path(a.metrics).resolve()
        if not reader.is_file():
            raise LookupError("spec-execution-metrics reader not found (pass --metrics)")
        base = [sys.executable, "-B", str(reader)]
        version = subprocess.run([*base, "--version"], capture_output=True, text=True)
        out = subprocess.run([*base, "--spec", str(spec_dir), "--run", run, "query"],
                             capture_output=True, text=True, cwd=reader.parent)
        if out.returncode:
            raise LookupError("reader query failed: " + out.stderr.strip()[-300:])
        query = json.loads(out.stdout)
        (workdir / "query.json").write_text(out.stdout)
        manifest["reader"] = {"version": (version.stdout or version.stderr).strip(),
                              "sha256": hashlib.sha256(reader.read_bytes()).hexdigest()}
        metrics = {"available": True, "reason": None,
                   "record_count": query.get("record_count"),
                   "effective_record_count": query.get("effective_record_count")}
    except LookupError as error:
        metrics["reason"] = str(error)
        (workdir / "query.json").unlink(missing_ok=True)
    manifest["metrics"] = metrics
    write_json(workdir / "manifest.json", manifest)
    print(json.dumps({k: manifest.get(k) for k in ("spec", "title", "commit", "run", "metrics")}, ensure_ascii=False))


if __name__ == "__main__":
    main()
