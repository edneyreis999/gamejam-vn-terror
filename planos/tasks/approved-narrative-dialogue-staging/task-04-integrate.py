"""Add the two approved post-reward closures to native discovery authoring."""
import copy
import importlib.util
import json
import math
import re
import subprocess
import textwrap
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
GAME = ROOT / 'rpg-maker/The Dryland Drowned'
SOURCE = 'ba53ad9d1d3848a2aef80d34abf1f5d391489b6c'
module = importlib.util.spec_from_file_location('staging', Path(__file__).with_name('task-02-stage.py'))
staging = importlib.util.module_from_spec(module)
module.loader.exec_module(staging)
cmd, plugin = staging.cmd, staging.plugin


def bridge(name, args):
    return plugin(name, args, owner='Dryland_EventBridge')


def boxes(paragraphs, speaker='Rheed', indent=0):
    result = []
    for paragraph in paragraphs:
        lines = textwrap.wrap(paragraph, 78, break_long_words=False, break_on_hyphens=False)
        rows = math.ceil(len(lines) / math.ceil(len(lines) / 3))
        for offset in range(0, len(lines), rows):
            result.append(cmd(101, ['', 0, 0, 2, speaker], indent))
            result.extend(cmd(401, [line], indent) for line in lines[offset:offset+rows])
    return result


def present_portrait():
    return [*[cmd(235, [id]) for id in [1, 2, 3, 4, *range(60, 71)]], plugin('MessageRemovePicture', {'PictureID:arraynum': json.dumps([str(id) for id in range(60, 71)])}, owner='VisuMZ_4_AttachedPictures'), staging.motion(0), plugin('Basic_EnterBust', {'PictureID:eval': '60', 'PictureName:str': 'Reed final', 'Origin:str': 'Upper Left', 'Position:num': '5', 'StartOffsetX:eval': '0', 'StartOffsetY:eval': '0', 'EasingType:str': 'OutSine', 'HorzMirror:str': 'None', 'Duration:eval': staging.DURATION}), plugin('Scale_ScaleTo', {'PictureID:arrayeval': '["60"]', 'TargetScaleX:str': '85.71428571428571', 'TargetScaleY:str': '85.71428571428571', 'Duration:eval': '0'}), plugin('Move_MoveToCoordinates', {'PictureID:arrayeval': '["60"]', 'TargetX:str': '(Graphics.boxWidth - 349.7142857142857) / 2', 'TargetY:str': '-480', 'EasingType:str': 'Linear', 'FlipDirection:str': 'None', 'Duration:eval': '0'}), plugin('MessageAddPicture', {'PictureID:arraynum': '["60"]'}, owner='VisuMZ_4_AttachedPictures')]


def retire_narrator():
    return [cmd(235, [60]), plugin('MessageRemovePicture', {'PictureID:arraynum': '["60"]'}, owner='VisuMZ_4_AttachedPictures')]


def main():
    source = subprocess.check_output(['git', 'show', f'{SOURCE}:feedbacks/fim-das-trilhas'], cwd=ROOT, text=True)
    sections = re.split(r'^## ', source, flags=re.M)
    paragraphs = []
    for title in ['Fim da primeira trilha:', 'Fim da segunda trilha:']:
        section = next(s for s in sections if s.startswith(title))
        body = section.split('**Narrador**', 1)[1].split('\n*Esse trecho', 1)[0].strip()
        paragraphs.append([re.sub(r'\s+', ' ', p).strip() for p in body.split('\n\n') if p.strip()])
    path = GAME / 'data/CommonEvents.json'
    events = json.loads(path.read_text())
    assert len(events) == 352, 'Allocate closure IDs only against the surveyed checkout'
    for offset, order in enumerate(['first', 'second']):
        scene = f'closure.{order}'
        body = [bridge('CaptureContext', {}), bridge('Query', {'kind': 'passageRead', 'id': scene+'.01', 'index': '0', 'variable': '0', 'switch': '48', 'identityVariable': '0'}), plugin('ReadingPermission', {'switch': '48'}, owner='Dryland_Presentation'), *present_portrait(), *boxes(paragraphs[offset]), *retire_narrator(), plugin('ReadingEnd', {}, owner='Dryland_Presentation'), bridge('ReadingComplete', {}), cmd(0, [])]
        id = len(events)
        events.append(dict(id=id, name=scene, trigger=0, switchId=1, list=body))
        events[303]['list'][-1:-1] = [cmd(111, [12, f"$gameVariables.value(57) === '{scene}'"]), cmd(117, [id], 1), cmd(412, [])]
    for id in [293, 295, 297, 299]:
        events[id]['list'] = staging.calibrate(events[id]['list'])
    # Ivaí's complete-map line uses the same single-speaker staging as the thresholds.
    threshold = events[263]['list']
    entrance_start = next(i for i,c in enumerate(threshold) if staging.is_bust(c, 'Basic_EnterBust'))
    entrance_end = next(i for i,c in enumerate(threshold) if c['code'] == 101)
    body = events[302]['list']
    first_text = next(i for i,c in enumerate(body) if c['code'] == 101)
    body[first_text:first_text] = copy.deepcopy(threshold[entrance_start:entrance_end])
    end = next(i for i,c in enumerate(body) if c['code'] == 357 and c['parameters'][1] == 'ReadingEnd')
    body[end:end] = staging.exit_busts([63], 0)
    audio = events[67]['list']
    old_present = "['prologue.rheed.01','prologue.rheed.02','prologue.rheed.03'].includes($gameVariables.value(56))"
    present = "['prologue.rheed.01','prologue.rheed.02','prologue.rheed.03','closure.first.01','closure.second.01'].includes($gameVariables.value(56))"
    continuation = "['irati.02.01','map.reveal.01','map.reveal.02'].includes($gameVariables.value(56))"
    for c in audio:
        if c['code'] != 111:
            continue
        expression = c['parameters'][1]
        if old_present in expression:
            expression = expression.replace(old_present, present)
            if "'formation'" in expression:
                expression = f'({expression}) || {continuation}'
        if "'dungeon_intro','encounter_intro'" in expression:
            expression += f' && !({present}) && !({continuation})'
        c['parameters'][1] = expression
    rules = GAME / 'js/plugins/Dryland_CampaignRules.js'
    text = rules.read_text()
    old = "      'irati.02': ['irati.02.01'], 'map.reveal': ['map.reveal.01', 'map.reveal.02'],"
    assert text.count(old) == 1
    text = text.replace(old, old + "\n      'closure.first': ['closure.first.01'], 'closure.second': ['closure.second.01'],")
    text = text.replace("['prologue', 'automatic_retreat', 'irati.02', 'map.reveal', 'council', 'memorial'", "['prologue', 'automatic_retreat', 'irati.02', 'map.reveal', 'closure.first', 'closure.second', 'council', 'memorial'")
    old = "readingSceneId === 'map.reveal' ? readingSceneId : null;"
    assert text.count(old) == 1
    text = text.replace(old, "readingSceneId === 'map.reveal' || (readingSceneId === 'closure.first' && state.mapPieceIds.length === 1) || (readingSceneId === 'closure.second' && state.mapPieceIds.length === 2) ? readingSceneId : null;")
    old = "        next.reading = reading(next.mapPieceIds.length === 1 ? 'irati.02' : 'map.reveal');"
    assert text.count(old) == 1
    text = text.replace(old, "        next.reading = reading(next.mapPieceIds.length === 1 ? 'closure.first' : 'closure.second');")
    old = "      if (sceneId === 'irati.02' || sceneId === 'map.reveal') return formationTransition(next);"
    text = text.replace(old, "      if (sceneId === 'closure.first' || sceneId === 'closure.second') {\n        next.reading = reading(next.mapPieceIds.length === 1 ? 'irati.02' : 'map.reveal');\n        return { changes: next, effects: [] };\n      }\n" + old)
    rules.write_text(text)
    path.write_text(json.dumps(events, ensure_ascii=False, indent=4) + '\n')
    print('Added CE352/353 and order-derived closure transitions after the existing reward.')


if __name__ == '__main__':
    main()
