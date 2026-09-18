"""Apply F-03's native line breaks without changing Draska's words or boxes."""
import json
from pathlib import Path
import textwrap

path = Path('rpg-maker/The Dryland Drowned/data/Map044.json')
original = path.read_text()
data = json.loads(original)
command = data['events'][1]['pages'][0]['list'][92]
expected = 'Draska é uma mineradora goblin de arquétipo sobrevivente que mantém a cabeça no lugar quando tudo desaba, mas sua necessidade de prever cada risco dificulta confiar nas decisões dos outros.'
assert command == {'code': 401, 'indent': 1, 'parameters': [expected]}, command
replacement = '<br>'.join(textwrap.wrap(expected, width=78, break_long_words=False, break_on_hyphens=False))
assert replacement.replace('<br>', ' ') == expected
old = json.dumps(expected, ensure_ascii=False)
new = json.dumps(replacement, ensure_ascii=False)
assert original.count(old) == 1
updated = original.replace(old, new, 1)
check = json.loads(updated)
check['events'][1]['pages'][0]['list'][92] = command
assert check == data
path.write_text(updated)
