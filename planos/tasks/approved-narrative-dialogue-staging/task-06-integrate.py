"""Replace only the two reading units of each approved ending."""
import importlib.util
import json
import re
import subprocess
from pathlib import Path

module = importlib.util.spec_from_file_location('council', Path(__file__).with_name('task-05-integrate.py'))
council = importlib.util.module_from_spec(module)
module.loader.exec_module(council)


def main():
    source = subprocess.check_output(['git', 'show', f'{council.SOURCE}:feedbacks/fim-do-jogo'], cwd=council.ROOT, text=True).split('## Descrição das imagens')[0]
    sections = re.split(r'^## (?:Se Ivaí juntar o medalhão|Se Ivaí quebrar o medalhão|se der game over)\s*$', source, flags=re.M)[1:]
    assert len(sections) == 3
    for number, section in zip(range(25, 28), sections):
        paragraphs = [re.sub(r'\s+', ' ', p).strip() for p in section.split('\n\n') if p.strip() and not p.strip().startswith('##')]
        assert len(paragraphs) == 3
        path = council.GAME / f'data/Map{number:03}.json'
        data = json.loads(path.read_text())
        body = data['events'][1]['pages'][0]['list']
        spans = []
        for i, c in enumerate(body):
            if c['code'] == 101:
                end = i+1
                while body[end]['code'] == 401:
                    end += 1
                spans.append((i, end))
        assert len(spans) == 2
        for (start, end), prose in reversed(list(zip(spans, [paragraphs[:2], paragraphs[2:]]))):
            body[start:end] = council.closures.boxes(prose, '', 1)
        picture = next(i for i, c in enumerate(body) if c['code'] == 231)
        body[picture:picture] = council.clear_cast()
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    print('All nine source paragraphs integrated into six native ending units.')


if __name__ == '__main__':
    main()
