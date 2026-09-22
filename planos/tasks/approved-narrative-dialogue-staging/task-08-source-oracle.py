"""Pin source-only expectations for native closing tests, without reading maps."""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
REVISION = 'ba53ad9d1d3848a2aef80d34abf1f5d391489b6c'


def source(path):
    return subprocess.check_output(['git', 'show', f'{REVISION}:{path}'], cwd=ROOT, text=True)


def paragraphs(text):
    return [re.sub(r'\s+', ' ', p).strip() for p in text.strip().split('\n\n') if p.strip() and not p.strip().startswith('##')]


route = source('feedbacks/fim-das-trilhas')
expected = {'sourceRevision': REVISION, 'passages': {}}
for order, heading in [('first', 'primeira'), ('second', 'segunda')]:
    text = route.split(f'## Fim da {heading} trilha:', 1)[1].split('\n## ', 1)[0]
    text = text.split('**Narrador**', 1)[1].split('\n*Esse trecho', 1)[0]
    expected['passages'][f'closure.{order}.01'] = paragraphs(text)
blocks = re.split(r'\*\*(Narrador|Ivaí)\*\*', route.split('## O fim da terceira trilha e o momento da descoberta', 1)[1])[1:]
for id, index in [('council.01', 0), ('council.02', 1), ('council.03', 2), ('council.challenge', 3), ('council.solo', 3), ('council.confession', 4)]:
    expected['passages'][id] = paragraphs(blocks[index*2+1])
sections = re.split(r'^## (?:Se Ivaí juntar o medalhão|Se Ivaí quebrar o medalhão|se der game over)\s*$', source('feedbacks/fim-do-jogo').split('## Descrição das imagens')[0], flags=re.M)[1:]
for ending, text in zip(['reunite', 'destroy', 'bad'], sections):
    p = paragraphs(text)
    assert len(p) == 3
    expected['passages'][f'ending.{ending}.01'] = p[:2]
    expected['passages'][f'ending.{ending}.02'] = p[2:]
(ROOT / 'rpg-maker/tests/fixtures/approved-closing-source.json').write_text(json.dumps(expected, ensure_ascii=False, indent=2) + '\n')
