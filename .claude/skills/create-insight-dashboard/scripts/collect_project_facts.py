"""Collect a few read-only project facts for the insight lenses into `facts.json`.

- task graph of the spec: edges from the `_tasks.md` frontmatter (`graph.edges`), or the table's
  "Depends on" column when there are none; with its width per dependency level;
- installed skills under `.agents/skills` and `.claude/skills`: a content hash per skill, plus the
  Git tree id at --commit when the skill is tracked there;
- HEAD, branch, and the commits that touched the spec.
The lenses read everything else from the repository directly.
"""

import argparse
import hashlib
import json
import re
from pathlib import Path

from _common import git, read_json, write_json

SKILL_DIRS = (".agents/skills", ".claude/skills")
EDGE = re.compile(r"-\s*from:\s*(\S+)\s*\n\s*to:\s*(\S+)")
NODE = re.compile(r"-\s*id:\s*(\S+)")


def task_id(text):
    digits = re.search(r"\d+", text)
    return f"task_{int(digits.group()):02d}" if digits else None


def parse_graph(text):
    """Return {task: [direct prerequisites]} and the source used, or (None, None)."""
    front = re.match(r"---\n(.*?)\n---", text, re.S)
    if front and "graph:" in front.group(1):
        body = front.group(1)
        nodes = [n.strip("'\"") for n in NODE.findall(body)]
        deps = {n: [] for n in nodes}
        for src, dst in EDGE.findall(body):
            deps.setdefault(dst.strip("'\""), []).append(src.strip("'\""))
            deps.setdefault(src.strip("'\""), [])
        if deps:
            return deps, "frontmatter"
    lines = [l for l in text.splitlines() if l.lstrip().startswith("|")]
    for i, line in enumerate(lines):
        cells = [c.strip().lower() for c in line.strip().strip("|").split("|")]
        if "depends on" not in cells:
            continue
        col = cells.index("depends on")
        deps = {}
        for row in lines[i + 1:]:
            values = [c.strip() for c in row.strip().strip("|").split("|")]
            node = task_id(values[0]) if values and re.search(r"\d", values[0]) else None
            if node is None or len(values) <= col:
                continue
            deps[node] = [task_id(d) for d in re.findall(r"\d+", values[col])]
        if deps:
            return deps, "table"
    return None, None


def graph_shape(deps):
    level = {}

    def depth(node, seen=()):
        if node in level:
            return level[node]
        if node in seen:
            raise ValueError(f"cycle at {node}")
        level[node] = 1 + max((depth(d, (*seen, node)) for d in deps.get(node, [])), default=0)
        return level[node]

    for node in deps:
        depth(node)
    widths = {}
    for node, lvl in level.items():
        widths[lvl] = widths.get(lvl, 0) + 1
    ordered = sorted(deps, key=lambda n: level[n])
    linear = all(deps[n] == [ordered[i - 1]] for i, n in enumerate(ordered) if i)
    return {"tasks": len(deps), "dependencies": deps, "levels": len(widths),
            "max_level_width": max(widths.values(), default=0), "strict_linear_chain": linear}


def dir_hash(path):
    digest = hashlib.sha256()
    for file in sorted(p for p in Path(path).rglob("*") if p.is_file() and "__pycache__" not in p.parts):
        digest.update(file.relative_to(path).as_posix().encode() + b"\0" + file.read_bytes())
    return digest.hexdigest()[:16]


def installed_skills(project, commit):
    out = {}
    for rel in SKILL_DIRS:
        base = Path(project) / rel
        entries = {}
        if base.is_dir():
            for skill in sorted(p for p in base.iterdir() if p.is_dir()):
                entries[skill.name] = {"sha256_16": dir_hash(skill.resolve()), "symlink": skill.is_symlink()}
        if commit:
            listing = git(project, "ls-tree", commit, rel + "/", check=False) or ""
            for line in listing.splitlines():
                meta, name = line.split("\t", 1)
                entries.setdefault(Path(name).name, {})["tree_at_commit"] = meta.split()[2][:12]
        out[rel] = entries
    return out


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--workdir", required=True)
    a = p.parse_args()
    workdir = Path(a.workdir).resolve()
    manifest = read_json(workdir / "manifest.json")
    project, spec_dir, commit = manifest["project"], Path(manifest["spec_dir"]), manifest.get("commit")
    at = commit if not manifest.get("working_tree") else None

    facts = {"task_graph": {"available": False, "reason": "no _tasks.md"}}
    tasks_md = spec_dir / "_tasks.md"
    if tasks_md.is_file():
        deps, source = parse_graph(tasks_md.read_text(errors="ignore"))
        try:
            facts["task_graph"] = ({"available": True, "source": source, **graph_shape(deps)} if deps
                                   else {"available": False, "reason": "no graph edges or Depends on column"})
        except ValueError as error:
            facts["task_graph"] = {"available": False, "reason": str(error)}
    facts["installed_skills"] = installed_skills(project, at)
    log = git(project, "log", "--format=%h%x09%aI%x09%s", *( [at] if at else []), "--", manifest["spec"], check=False) or ""
    facts["git"] = {
        "head": git(project, "rev-parse", "--short", "HEAD", check=False),
        "branch": git(project, "rev-parse", "--abbrev-ref", "HEAD", check=False),
        "commit": commit,
        "spec_commits": [dict(zip(("commit", "date", "subject"), line.split("\t", 2))) for line in log.splitlines()][:200],
    }
    write_json(workdir / "facts.json", facts)
    graph = facts["task_graph"]
    print(json.dumps({"task_graph": {k: graph.get(k) for k in ("available", "source", "tasks", "max_level_width", "strict_linear_chain")},
                      "skills": {k: len(v) for k, v in facts["installed_skills"].items()},
                      "spec_commits": len(facts["git"]["spec_commits"])}))


if __name__ == "__main__":
    main()
