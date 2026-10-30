"""Prepare a spec's dashboard data in a scratch work directory.

Runs, in order: collect_metrics → build_dashboard_data → collect_sessions → collect_project_facts.
Writes manifest.json, query.json (when metrics exist), dashboard-data.json, sessions.json and
facts.json in --workdir, then prints the gaps. Never writes inside the project.
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent


def step(script, *args):
    result = subprocess.run([sys.executable, "-B", str(HERE / script), *args], capture_output=True, text=True)
    if result.returncode:
        sys.exit(f"{script} failed:\n{result.stderr.strip()}")
    print(f"{script}: {result.stdout.strip()}")


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--spec", required=True, help="spec directory (absolute or relative to --project)")
    p.add_argument("--project", default=".", help="game project root (default: current directory)")
    p.add_argument("--workdir", required=True, help="scratch directory outside the project")
    p.add_argument("--run", help="execution run; required when the spec has more than one")
    p.add_argument("--commit", help="read the spec from this Git revision")
    p.add_argument("--metrics", help="path to spec-execution-metrics scripts/metrics.py")
    p.add_argument("--sessions-root", help="Codex sessions directory (default ~/.codex/sessions)")
    p.add_argument("--max-lanes", help="subagent lanes in the timeline before aggregating")
    a = p.parse_args()

    workdir = Path(a.workdir).resolve()
    project = Path(a.project).resolve()
    if workdir == project or workdir.is_relative_to(project):
        sys.exit("--workdir must be outside the project")
    optional = lambda *pairs: [x for flag, value in pairs if value for x in (flag, value)]
    step("collect_metrics.py", "--spec", a.spec, "--project", str(project), "--workdir", str(workdir),
         *optional(("--run", a.run), ("--commit", a.commit), ("--metrics", a.metrics)))
    step("build_dashboard_data.py", "--workdir", str(workdir), *optional(("--max-lanes", a.max_lanes)))
    step("collect_sessions.py", "--workdir", str(workdir), *optional(("--sessions-root", a.sessions_root)))
    step("collect_project_facts.py", "--workdir", str(workdir))

    gaps = []
    data = json.loads((workdir / "dashboard-data.json").read_text())
    if not data["metrics"]["available"]:
        gaps.append(f"metrics: {data['metrics']['reason']}")
    gaps += [f"chart {c}: {b['reason']}" for c, b in data["blocks"].items() if not b["available"] and data["metrics"]["available"]]
    sessions = json.loads((workdir / "sessions.json").read_text())
    if not sessions["available"]:
        gaps.append(f"sessions: {sessions['reason']}")
    elif sessions["missing_sessions"]:
        gaps.append(f"sessions: {len(sessions['missing_sessions'])} of {sessions['sessions_expected']} transcripts missing")
    graph = json.loads((workdir / "facts.json").read_text())["task_graph"]
    if not graph["available"]:
        gaps.append(f"task graph: {graph['reason']}")
    print(json.dumps({"workdir": str(workdir), "gaps": gaps}, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
