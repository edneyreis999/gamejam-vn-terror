"""Compose the approved Council blocks and temporal staging in native events."""
import copy
import importlib.util
import json
import re
import struct
import subprocess
from pathlib import Path

module = importlib.util.spec_from_file_location('closures', Path(__file__).with_name('task-04-integrate.py'))
closures = importlib.util.module_from_spec(module)
module.loader.exec_module(closures)
ROOT, GAME, SOURCE = closures.ROOT, closures.GAME, closures.SOURCE
cmd, plugin, staging = closures.cmd, closures.plugin, closures.staging


def shifted(commands, indent):
    result = copy.deepcopy(commands)
    for c in result:
        c['indent'] += indent
    return result


def clear_cast():
    return [*[cmd(235, [id]) for id in range(60, 71)], plugin('MessageRemovePicture', {'PictureID:arraynum': json.dumps([str(id) for id in range(60, 71)])}, owner='VisuMZ_4_AttachedPictures')]


def calibrate_council(commands):
    """Retain each 2026-09-15 actor/slot/focus rectangle under the .6 anchor."""
    # No native event enters slot 64; these are dormant former cast targets.
    result = copy.deepcopy([c for c in commands if not (staging.is_bust(c) and c['parameters'][3].get('PictureID:arrayeval') == '["64"]')])
    conditions, scales = {}, {}
    for c in result:
        depth, args = c['indent'], c['parameters']
        if c['code'] == 111:
            conditions[depth] = args
        elif c['code'] == 412:
            conditions.pop(depth, None)
        elif staging.is_bust(c):
            name, a = args[1], args[3]
            if name not in ['Scale_ScaleTo', 'Move_MoveToCoordinates']:
                continue
            slot, = json.loads(a['PictureID:arrayeval'])
            actor = next((str(v[3]) for d, v in conditions.items() if d < depth and v[0] == 1 and v[1] in [144, 145, 146] and v[3] > 0), None)
            art = 'Dryland_H'+actor if actor else 'Dryland_ivai' if slot == '63' else 'Dryland_andira' if slot == '65' else None
            assert art, (slot, conditions)
            key = (slot, art, a['Duration:eval'])
            if name == 'Scale_ScaleTo':
                scales[key] = float(a['TargetScaleY:str'])
            else:
                scale = scales.get(key, scales.get((slot, art, '0')))
                assert scale is not None, key
                height = struct.unpack('>II', (GAME / f'img/pictures/{art}.png').read_bytes()[16:24])[1]
                a['TargetY:str'] = f"{float(a['TargetY:str']) - .4 * height * scale / 100:.4f}".rstrip('0').rstrip('.')
    return result


def main():
    source = subprocess.check_output(['git', 'show', f'{SOURCE}:feedbacks/fim-das-trilhas'], cwd=ROOT, text=True)
    body = source.split('## O fim da terceira trilha e o momento da descoberta', 1)[1]
    blocks = re.split(r'\*\*(Narrador|Ivaí)\*\*', body)[1:]
    assert len(blocks) == 10
    paragraphs = [[re.sub(r'\s+', ' ', p).strip() for p in blocks[i+1].strip().split('\n\n') if p.strip()] for i in range(0, 10, 2)]
    path = GAME / 'data/CommonEvents.json'
    events = json.loads(path.read_text())
    for id in [68, 69, 70, 71, 73, 74, 79]:
        events[id]['list'] = calibrate_council(events[id]['list'])
    council_narrator = "['council.01','council.03','council.challenge','council.solo'].includes($gameVariables.value(56))"
    for c in events[67]['list']:
        if c['code'] == 111 and c['parameters'][0] == 12:
            expression = c['parameters'][1]
            # These predicates were authored by tasks 01/04. Extend both the
            # positive present cue and the exclusions, preserving precedence.
            present = "['prologue.rheed.01','prologue.rheed.02','prologue.rheed.03','closure.first.01','closure.second.01'].includes($gameVariables.value(56))"
            c['parameters'][1] = expression.replace(present, f'({present} || {council_narrator})')
    path.write_text(json.dumps(events, ensure_ascii=False, indent=4) + '\n')

    path = GAME / 'data/Map023.json'
    data = json.loads(path.read_text())
    old = data['events'][1]['pages'][0]['list']
    assert old[8]['code'] == 231
    backdrop = old[8]
    ivai = [plugin('Basic_EnterBust', {'PictureID:eval': '63', 'PictureName:str': 'Dryland_ivai', 'Origin:str': 'Bust', 'Position:num': '8', 'StartOffsetX:eval': '-32', 'StartOffsetY:eval': '0', 'EasingType:str': 'OutSine', 'HorzMirror:str': 'None', 'Duration:eval': staging.DURATION}), plugin('Scale_ScaleTo', {'PictureID:arrayeval': '["63"]', 'TargetScaleX:str': '44', 'TargetScaleY:str': '44', 'Duration:eval': '0'}), plugin('Move_MoveToCoordinates', {'PictureID:arrayeval': '["63"]', 'TargetX:str': '960', 'TargetY:str': '454.664', 'EasingType:str': 'InOutSine', 'FlipDirection:str': 'None', 'Duration:eval': '0'}), plugin('Tone_NormalBust', {'PictureID:arrayeval': '["63"]', 'Duration:eval': '0'})]
    mapping = {'council.01': 0, 'council.02': 1, 'council.03': 2, 'council.challenge': 3, 'council.solo': 3, 'council.confession': 4}
    output, i = old[:8], 9
    while i < len(old):
        c = old[i]
        match = re.fullmatch(r'\$gameVariables.value\(56\) === "([^"]+)"', str(c['parameters'][1])) if c['code'] == 111 and c['parameters'][0] == 12 else None
        if not match or match[1] not in mapping:
            if match and match[1] == 'irati.03':
                # Irati is a document; no person impersonates its author.
                output.append(c)
                output += shifted(clear_cast(), c['indent']+1)
                i += 1
                continue
            output.append(c)
            i += 1
            continue
        id = match[1]
        end = next(j for j in range(i+1, len(old)) if old[j]['code'] == 412 and old[j]['indent'] == c['indent'])
        segment = old[i:end+1]
        motion = next(j for j,v in enumerate(segment) if v['code'] == 357 and v['parameters'][1] == 'MotionPreference')
        reading_end = next(j for j,v in enumerate(segment) if v['code'] == 357 and v['parameters'][1] == 'ReadingEnd')
        output += segment[:motion+1]
        depth = c['indent']+1
        if id in ['council.02', 'council.confession']:
            output += shifted([*clear_cast(), backdrop, cmd(117, [73]), *ivai, cmd(117, [71])], depth)
        else:
            output += [cmd(111, [12, "!$gameScreen.picture(60) || $gameScreen.picture(60).name() !== 'Reed final'"], depth), *shifted(closures.present_portrait(), depth+1), cmd(412, [], depth)]
        output += closures.boxes(paragraphs[mapping[id]], 'Ivaí' if id in ['council.02', 'council.confession'] else 'Rheed', depth)
        output += segment[reading_end:]
        i = end+1
    data['events'][1]['pages'][0]['list'] = output
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

    path = GAME / 'js/plugins/Dryland_CampaignRules.js'
    text = path.read_text()
    old = "var councilPlan = scene.passageIds.slice(0, 4).concat([climaxParty.length ? 'council.challenge' : 'council.solo', 'council.confession', 'council.andira']);\n            climaxParty.forEach(function (id) { councilPlan.push('opinion.' + id); });\n            planMatches = sameArray(state.reading.passageIds, councilPlan);"
    assert text.count(old) == 1
    text = text.replace(old, 'planMatches = sameArray(state.reading.passageIds, councilPlan(climaxParty));')
    old = "        var plan = Narrative.scenes.council.passageIds.slice(0, 4).concat([next.climaxPartyIds.length ? 'council.challenge' : 'council.solo', 'council.confession', 'council.andira']);\n        next.climaxPartyIds.forEach(function (id) { plan = plan.concat(Narrative.scenes['opinion.' + id].passageIds); });\n        next.reading = reading('council', plan);"
    assert text.count(old) == 1
    text = text.replace(old, "        next.reading = reading('council', councilPlan(next.climaxPartyIds));")
    before = '    function completeRoute(state) {'
    text = text.replace(before, "    function councilPlan(participants) {\n      return ['council.01', 'council.02', 'council.03', participants.length ? 'council.challenge' : 'council.solo', 'council.confession', 'council.andira']\n        .concat(HERO_IDS.filter(function (id) { return participants.indexOf(id) >= 0; }).map(function (id) { return 'opinion.' + id; }), ['irati.03']);\n    }\n\n" + before)
    path.write_text(text)
    print('Council source blocks, shared order and native temporal cuts integrated.')


if __name__ == '__main__':
    main()
