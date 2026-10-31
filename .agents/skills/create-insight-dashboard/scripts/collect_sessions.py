"""Collect session-context and skill-read metadata from the local Codex transcripts of one execution.

Read-only. Session IDs come from the reader's `query.json` (`by_session`). For each session found
under --sessions-root, records origin, working directory, loaded AGENTS.md directory, agent path,
compactions, spawned agents and shell segments that read files under a `skills/<name>/` directory.
Reads are classified `project` (inside the project root or one of its Git worktrees), `other`, or
`unresolved` (the command's working directory was not a literal path). No message or reasoning
text is copied; paths are written relative to the project. Writes `sessions.json` in the work
directory.
"""

import argparse
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

from _common import project_roots, read_json, relative_to_project, write_json

DEFAULT_ROOT = Path.home() / ".codex" / "sessions"
SKILL_PATH = re.compile(r"""(?P<path>[^\s'"`;|&()<>]*skills/(?P<skill>[a-z0-9][a-z0-9-]*)/(?P<file>[A-Za-z0-9_./-]+))""")
READ_VERBS = {"cat", "sed", "nl", "head", "tail", "less", "awk", "bat", "grep", "rg"}
SEGMENT_SPLIT = re.compile(r"\|\||&&|;|\||\n")
CMD_STRING = re.compile(r"""["']?cmd["']?\s*:\s*(?P<q>["'`])(?P<cmd>(?:\\.|(?!(?P=q)).)*)(?P=q)""", re.S)
WORKDIR = re.compile(r"""["']?workdir["']?\s*:\s*(?:(?P<q>["'`])(?P<dir>(?:\\.|(?!(?P=q)).)*)(?P=q)|(?P<ident>[A-Za-z_$][\w$]*))""")
CD = re.compile(r"^\s*cd\s+(?P<q>['\"]?)(?P<dir>[^'\"\s;&|]+)(?P=q)")
UNRESOLVED = None


def session_files(root, ids):
    found = {}
    for path in Path(root).rglob("*.jsonl"):
        for sid in ids:
            if sid in path.name:
                found[sid] = path
    return found


def unescape(text):
    return bytes(text, "utf-8").decode("unicode_escape", errors="replace")


def commands(tool_input):
    """Yield (cmd, workdir, literal) per exec command; workdir is searched up to the next cmd."""
    matches = list(CMD_STRING.finditer(tool_input))
    for i, match in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(tool_input)
        workdir = WORKDIR.search(tool_input[max(0, match.start() - 400):end])
        cmd = unescape(match.group("cmd"))
        if workdir is None:
            yield cmd, None, True
        elif workdir.group("dir") is not None:
            yield cmd, workdir.group("dir"), True
        else:
            yield cmd, None, False


def classify(path, here, roots):
    if path.startswith("/"):
        full = Path(path)
    elif here is UNRESOLVED:
        return "unresolved"
    else:
        full = Path(here) / path
    full = full.resolve()
    return "project" if any(full.is_relative_to(root) for root in roots) else "other"


def scan(path, roots):
    info = {"compactions": [], "spawns": Counter(), "reads": [], "tool_calls": Counter(),
            "user_turns": 0, "first": None, "last": None}
    cwd = None
    for line in path.open(errors="replace"):
        try:
            record = json.loads(line)
        except json.JSONDecodeError:
            continue
        payload = record.get("payload") or {}
        ts = record.get("timestamp")
        info["first"] = info["first"] or ts
        info["last"] = ts
        kind = record.get("type")
        if kind == "session_meta":
            cwd = payload.get("cwd")
            source = payload.get("source")
            info.update(
                session=payload.get("id"), parent=payload.get("parent_thread_id"), cwd=cwd,
                originator=payload.get("originator"), agent_path=payload.get("agent_path"),
                thread_source=payload.get("thread_source"),
                source=source if isinstance(source, str) else "subagent" if isinstance(source, dict) else None,
            )
        elif kind == "world_state" and "agents_md_dir" not in info:
            agents_md = (payload.get("state") or {}).get("agents_md") or {}
            info["agents_md_dir"] = agents_md.get("directory")
        elif kind == "turn_context":
            cwd = payload.get("cwd") or cwd
        elif kind == "compacted":
            info["compactions"].append(ts)
        elif kind == "event_msg" and payload.get("type") == "item_completed" \
                and (payload.get("item") or {}).get("type") == "UserMessage":
            info["user_turns"] += 1
        elif kind == "response_item" and payload.get("type") in ("custom_tool_call", "function_call"):
            name = payload.get("name")
            info["tool_calls"][name] += 1
            if name == "spawn_agent":
                try:
                    task = json.loads(payload.get("arguments") or "{}").get("task_name", "")
                except json.JSONDecodeError:
                    task = ""
                info["spawns"][re.sub(r"[_-]?\d+$", "", task) or "(unnamed)"] += 1
            text = payload.get("input") or payload.get("arguments") or ""
            for cmd, workdir, literal in commands(text):
                here = (workdir or cwd) if literal else UNRESOLVED
                for segment in SEGMENT_SPLIT.split(cmd):
                    cd = CD.match(segment)
                    if cd:
                        target = cd.group("dir")
                        if target.startswith("/"):
                            here = target
                        elif here is not UNRESOLVED:
                            here = f"{here}/{target}"
                        continue
                    words = segment.strip().split()
                    if not words or words[0] not in READ_VERBS:
                        continue
                    for m in SKILL_PATH.finditer(segment):
                        info["reads"].append({"ts": ts, "skill": m.group("skill"), "file": m.group("file"),
                                              "repo": classify(m.group("path"), here, roots), "verb": words[0]})
    info["spawns"] = dict(info["spawns"])
    info["tool_calls"] = dict(info["tool_calls"])
    return info


def summarize(sessions, coordinator, roots):
    def role(s):
        if s.get("session") == coordinator:
            return "coordinator"
        return "subagent" if s.get("thread_source") == "subagent" or s.get("parent") else "exec"

    by_role = defaultdict(lambda: {"sessions": 0, "compactions": 0, "agents_md_dirs": Counter(),
                                   "cwds": Counter(), "agent_paths": Counter()})
    reads, read_sessions = Counter(), defaultdict(set)
    for s in sessions:
        r = role(s)
        bucket = by_role[r]
        bucket["sessions"] += 1
        bucket["compactions"] += len(s["compactions"])
        bucket["agents_md_dirs"][relative_to_project(s.get("agents_md_dir"), roots) or "(none)"] += 1
        bucket["cwds"][relative_to_project(s.get("cwd"), roots) or "(unknown)"] += 1
        if s.get("agent_path"):
            bucket["agent_paths"][re.sub(r"[_-]?\d+$", "", s["agent_path"].rsplit("/", 1)[-1])] += 1
        for read in s["reads"]:
            key = (r, read["repo"], read["skill"], read["file"])
            reads[key] += 1
            read_sessions[key].add(s.get("session"))
    return {
        "roles": {r: {k: (dict(v.most_common(40)) if isinstance(v, Counter) else v) for k, v in b.items()}
                  for r, b in by_role.items()},
        "skill_reads": [{"role": r, "repo": repo, "skill": skill, "file": f, "reads": n,
                         "sessions": len(read_sessions[(r, repo, skill, f)])}
                        for (r, repo, skill, f), n in reads.most_common()],
    }


def collect(manifest, query, sessions_root):
    roots = project_roots(manifest["project"])
    if query is None:
        return {"available": False, "reason": "no execution-metrics query, so no session list"}
    root = Path(sessions_root).expanduser()
    if not root.is_dir():
        return {"available": False, "reason": "Codex sessions directory not found",
                "sessions_expected": len(query["by_session"])}
    ids = set(query["by_session"])
    files = session_files(root, ids)
    if not files:
        return {"available": False, "reason": "none of the execution's Codex transcripts was found",
                "sessions_expected": len(ids)}
    sessions = [scan(files[sid], roots) for sid in sorted(files)]
    coordinator = manifest.get("coordinator_session")
    coord = next((s for s in sessions if s.get("session") == coordinator), None)
    out = {"available": True, "reason": None,
           "sessions_expected": len(ids), "sessions_found": len(files),
           "missing_sessions": sorted(ids - set(files)),
           "coordinator": None, **summarize(sessions, coordinator, roots),
           "coordinator_reads_timeline": coord["reads"] if coord else []}
    if coord:
        out["coordinator"] = {k: coord.get(k) for k in ("first", "last", "user_turns", "tool_calls", "spawns", "compactions")}
        out["coordinator"].update(cwd=relative_to_project(coord.get("cwd"), roots),
                                  agents_md_dir=relative_to_project(coord.get("agents_md_dir"), roots))
    return out


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--workdir", required=True)
    p.add_argument("--sessions-root", default=str(DEFAULT_ROOT))
    a = p.parse_args()
    workdir = Path(a.workdir).resolve()
    manifest = read_json(workdir / "manifest.json")
    query = read_json(workdir / "query.json") if (workdir / "query.json").is_file() else None
    out = collect(manifest, query, a.sessions_root)
    write_json(workdir / "sessions.json", out)
    print(json.dumps({k: out.get(k) for k in ("available", "reason", "sessions_expected", "sessions_found")}
                     | {"roles": {r: v["sessions"] for r, v in (out.get("roles") or {}).items()},
                        "skill_read_rows": len(out.get("skill_reads") or [])}))


if __name__ == "__main__":
    main()
