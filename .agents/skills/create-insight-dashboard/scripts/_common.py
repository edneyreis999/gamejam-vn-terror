"""Shared helpers for the create-insight-dashboard scripts (Python 3 standard library only)."""

import json
import re
import subprocess
from pathlib import Path

SKILL_ROOT = Path(__file__).resolve().parents[1]
TASK_ID = re.compile(r"task[_-]?(\d+)", re.I)


def read_json(path):
    return json.loads(Path(path).read_text())


def write_json(path, data):
    Path(path).write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n")


def git(repo, *args, binary=False, check=True):
    """Run git in `repo`; return stdout (text unless binary) or None when check is False and git fails."""
    result = subprocess.run(["git", "-C", str(repo), *args], capture_output=True)
    if result.returncode:
        if check:
            raise RuntimeError(f"git {' '.join(args)} failed: {result.stderr.decode(errors='replace').strip()}")
        return None
    return result.stdout if binary else result.stdout.decode(errors="replace").strip()


def task_label(task):
    """`task_07.md`, `task-07` → `T07`; spec-scoped activity → `spec`; anything else unchanged."""
    if task in (None, "", "(spec)"):
        return "spec"
    match = TASK_ID.search(str(task))
    return f"T{match.group(1)}" if match else str(task).removesuffix(".md")


def project_roots(project):
    """The project root first, then the matching directory in each other Git worktree of its repository."""
    project = Path(project).resolve()
    roots = [project]
    prefix = git(project, "rev-parse", "--show-prefix", check=False)
    listing = git(project, "worktree", "list", "--porcelain", check=False) or ""
    for line in listing.splitlines():
        if line.startswith("worktree "):
            root = (Path(line[len("worktree "):]) / (prefix or "")).resolve()
            if root != project:
                roots.append(root)
    return roots


def relative_to_project(path, roots):
    """Path relative to the project (or `(worktree NAME)/…`); outside paths keep only their last two parts."""
    if not path:
        return None
    full = Path(path).resolve()
    for i, root in enumerate(roots):
        try:
            rel = full.relative_to(root).as_posix() or "."
        except ValueError:
            continue
        return rel if i == 0 else f"(worktree {root.name})/{rel}"
    return "(outside project) …/" + "/".join(Path(path).parts[-2:])
