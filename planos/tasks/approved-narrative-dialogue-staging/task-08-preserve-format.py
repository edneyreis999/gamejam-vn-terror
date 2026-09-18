"""Restore each edited map's existing JSON indentation without changing data."""
import json
import re
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[3]
for number in [*range(7, 17), 23, 25, 26, 27, *range(29, 45)]:
    relative = f'rpg-maker/The Dryland Drowned/data/Map{number:03}.json'
    baseline = subprocess.check_output(['git', 'show', f'HEAD:{relative}'], cwd=root, text=True)
    match = re.search(r'\n( +)"', baseline)
    indent = len(match[1]) if match else None
    path = root / relative
    data = json.loads(path.read_text())
    rendered = json.dumps(data, ensure_ascii=False, indent=indent, separators=None if indent else (',', ':')) + '\n'
    assert json.loads(rendered) == data
    path.write_text(rendered)
