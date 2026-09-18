"""Import the approved whole-image epilogues and their source page sequence."""
import hashlib
import importlib.util
import io
import json
import re
import subprocess
from pathlib import Path
from PIL import Image

module = importlib.util.spec_from_file_location('council', Path(__file__).with_name('task-05-integrate.py'))
council = importlib.util.module_from_spec(module)
module.loader.exec_module(council)
ROOT, GAME = council.ROOT, council.GAME
SOURCE = '537b7e825d695799033223810c7429d190f30172'
HEROES = ['Gorvak', 'Elowen', 'Griznik', 'Seraphina', 'Bimbren', 'Liora', 'Vaelith', 'Draska']


def blob(path):
    return subprocess.check_output(['git', 'show', f'{SOURCE}:{path}'], cwd=ROOT)


def digest(value):
    return hashlib.sha256(value).hexdigest()


def main():
    html = blob('feedbacks/epilogos.html').decode()
    heroes = json.loads(html.split('const heroes = ', 1)[1].split(';\nconst slides', 1)[0])
    assert len(heroes) == 8 and sum(len(hero['pages']) for hero in heroes) == 17
    prose = blob('feedbacks/epilogo-dos-herois').decode()
    prose_sections = re.split(r'(?im)^('+'|'.join(HEROES)+r')\s*—\s*$', prose)[1:]
    prose_by_name = {prose_sections[i].lower(): prose_sections[i+1] for i in range(0, len(prose_sections), 2)}
    ledger = {'sourceRevision': SOURCE, 'htmlSha256': digest(html.encode()), 'proseSha256': digest(prose.encode()), 'heroes': []}
    for number, name in enumerate(HEROES, 1):
        hero = next(h for h in heroes if h['name'] == name)
        # HTML fixes spacing/Markdown only. Even punctuation must otherwise
        # agree with the independent prose blob, including Draska's quotation.
        normalize = lambda s: re.sub(r'\s+', '', s.replace('**', ''))
        assert normalize(' '.join(hero['pages'])) == normalize(prose_by_name[name.lower()]), name
        source_path = 'docs/narrativa/ilustracao-epilogo/'+hero['image']
        original = blob(source_path)
        image = Image.open(io.BytesIO(original))
        imported = original
        if hero['image'].endswith('.bmp'):
            stream = io.BytesIO()
            image.save(stream, format='PNG')
            imported = stream.getvalue()
            converted = Image.open(io.BytesIO(imported))
            assert image.size == converted.size and image.convert('RGBA').tobytes() == converted.convert('RGBA').tobytes()
        art = f'Dryland_EpilogueH{number}'
        (GAME / f'img/pictures/{art}.png').write_bytes(imported)
        width, height = image.size
        scale = min(1280/width, 720/height)*100
        path = GAME / f'data/Map{28+number:03}.json'
        data = json.loads(path.read_text())
        old = data['events'][1]['pages'][0]['list']
        assert old[8]['code'] == 231
        start = next(i for i, c in enumerate(old) if c['code'] == 357 and c['parameters'][1] == 'MotionPreference') + 1
        end = next(i for i, c in enumerate(old) if c['code'] == 357 and c['parameters'][1] == 'ReadingEnd')
        body = old[:start] + council.closures.boxes(hero['pages'], name) + old[end:]
        body[8:9] = [*council.clear_cast(), council.cmd(231, [1, art, 1, 0, 640, 360, scale, scale, 255, 0])]
        data['events'][1]['pages'][0]['list'] = body
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
        sheet_path = ROOT / f'docs/narrativa/herois/Ficha_H{number}_{name}.md'
        sheet = sheet_path.read_text()
        sheet, count = re.subn(r'(?m)^- \*\*O que faz depois da campanha, caso sobreviva:\*\* .*$', '- **O que faz depois da campanha, caso sobreviva:**\n\n'+'\n\n'.join(hero['pages'])+f'\n\nFonte aprovada: PR #15, commit `{SOURCE}`, `feedbacks/epilogos.html` (conferido com `feedbacks/epilogo-dos-herois`).', sheet)
        assert count == 1
        sheet_path.write_text(sheet)
        ledger['heroes'].append({'heroId': f'H{number}', 'name': name, 'sourcePath': source_path, 'sourceSha256': digest(original), 'nativePath': f'img/pictures/{art}.png', 'nativeSha256': digest(imported), 'pixelSha256': digest(image.convert('RGBA').tobytes()), 'width': width, 'height': height, 'scalePercent': scale, 'pages': hero['pages'], 'map': 28+number, 'boxes': sum(c['code'] == 101 for c in body)})
    (ROOT / 'rpg-maker/asset-provenance/approved-narrative-epilogues.json').write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + '\n')
    print('Eight illustrations, 17 source pages and eight sheet epilogues integrated.')


if __name__ == '__main__':
    main()
