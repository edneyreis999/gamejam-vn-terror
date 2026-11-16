"""Embed `dashboard-data.json` and the validated `<out>/insights.json` into the self-contained template.

Writes `<out>/index.html`. Interface text follows --lang (en or pt-BR); insight text is shown as
written. Without `<out>/insights.json`, the Insights section says it was not generated.
"""

import argparse
import json
import os
from pathlib import Path

from _common import SKILL_ROOT, read_json

TEMPLATE = SKILL_ROOT / "assets" / "dashboard_template.html"
LANGS = ("en", "pt-BR")


def payload(data):
    # Compact JSON; escape "</" so the payload cannot close its <script> element.
    return json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--workdir", required=True)
    p.add_argument("--out", required=True, help="output directory, usually <spec>/insight-dashboard")
    p.add_argument("--lang", choices=LANGS, default="en")
    a = p.parse_args()

    workdir, out = Path(a.workdir).resolve(), Path(a.out).resolve()
    data = read_json(workdir / "dashboard-data.json")
    project = Path(read_json(workdir / "manifest.json")["project"]).resolve()
    insights = read_json(out / "insights.json") if (out / "insights.json").is_file() else None
    # Project files are linked relative to the dashboard only when it lives inside the project.
    link_base = os.path.relpath(project, out) + "/" if out.is_relative_to(project) else None
    meta = {"lang": a.lang, "link_base": link_base}

    html = TEMPLATE.read_text()
    for placeholder, value in (("/*__DATA__*/", data), ("/*__INSIGHTS__*/", insights), ("/*__META__*/", meta)):
        if html.count(placeholder) != 1:
            raise SystemExit(f"template must contain exactly one {placeholder}")
        html = html.replace(placeholder, payload(value))
    out.mkdir(parents=True, exist_ok=True)
    target = out / "index.html"
    target.write_text(html)
    print(json.dumps({"out": str(target), "bytes": target.stat().st_size, "insights": insights is not None}))


if __name__ == "__main__":
    main()
