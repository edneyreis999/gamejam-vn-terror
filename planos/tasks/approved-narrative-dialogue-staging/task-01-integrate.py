"""Apply the approved opening from pinned sources to the pre-integration checkout."""
import copy
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
GAME = ROOT / 'rpg-maker/The Dryland Drowned'
PR17 = '85fc7b03f932337d2daaa100dc830c9b6e0c307d'
PR19 = 'daa4f7cf0d0d074135d12dc96bbe3f77dd749ea8'
BASE = '82aad84dd5df2376e18d53720747fae8d8c0e9ac'


def source(revision, relative):
    return subprocess.check_output(['git', 'show', f'{revision}:rpg-maker/The Dryland Drowned/{relative}'], cwd=ROOT)


def command(code, parameters, indent=0):
    return dict(code=code, indent=indent, parameters=parameters)


def plugin(name, action, args):
    return command(357, [name, action, action, args])


def cue(code, name, volume, indent=0):
    return command(code, [dict(name=name, volume=volume, pitch=100, pan=0)], indent)


def write_json(relative, value, indent=None):
    data = json.dumps(value, ensure_ascii=False, indent=indent,
                      separators=None if indent else (',', ':')) + '\n'
    assert json.loads(data) == value
    (GAME / relative).write_text(data)


def main():
    for relative in ['data/Map002.json', 'data/CommonEvents.json', 'js/plugins.js']:
        assert (GAME / relative).read_bytes() == source(BASE, relative), f'Stale input: {relative}'
    path = GAME / 'js/plugins.js'
    envelope = path.read_text()
    prefix = envelope[:envelope.index('[')]
    parse = lambda text: json.loads(text[text.index('['):].strip().removesuffix(';'))
    plugins = parse(envelope)
    original = copy.deepcopy(plugins)
    for revision, name in [(PR17, 'VisuMZ_2_VNPictureBusts'), (PR19, 'VisuMZ_4_AttachedPictures')]:
        supplied = next(p for p in parse(source(revision, 'js/plugins.js').decode()) if p['name'] == name)
        target = next(p for p in plugins if p['name'] == name)
        if revision == PR17:
            for key in ['AnchorY:num', 'ScaleX:num', 'ScaleY:num']:
                target['parameters'][key] = supplied['parameters'][key]
        else:
            target['status'] = supplied['status']
            target['parameters']['PictureIDs:arraynum'] = supplied['parameters']['PictureIDs:arraynum']
    assert [p['name'] for p in original] == [p['name'] for p in plugins]
    path.write_text(prefix + json.dumps(plugins, ensure_ascii=False, indent=4) + ';\n')

    imported = []
    for revision, name in [(PR17, 'Dryland_Taverna.png'), (PR19, 'Reed final.png'), (PR19, 'Reed-novo.png')]:
        relative = 'img/pictures/' + name
        data = source(revision, relative)
        (GAME / relative).write_bytes(data)
        imported.append(dict(revision=revision, path=relative, sha256=hashlib.sha256(data).hexdigest()))
    provenance = ROOT / 'rpg-maker/asset-provenance/approved-narrative-opening.json'
    provenance.write_text(json.dumps(imported, ensure_ascii=False, indent=2) + '\n')

    rules = GAME / 'js/plugins/Dryland_CampaignRules.js'
    text = rules.read_text()
    old = "prologue: ['prologue.01', 'prologue.02', 'irati.01']"
    assert text.count(old) == 1
    text = text.replace(old, "prologue: ['prologue.rheed.01', 'prologue.rheed.02', 'prologue.rheed.03', 'prologue.rheed.04', 'prologue.rheed.05', 'prologue.rheed.06']")
    rules.write_text(text)

    supplied = json.loads(source(PR19, 'data/Map002.json'))
    opening = supplied['events'][1]['pages'][0]['list']
    result = []
    motion = plugin('Dryland_Presentation', 'MotionPreference', {'variable': '47'})
    duration = '$gameVariables.value(47) ? 0 : 20'
    bust = 'VisuMZ_2_VNPictureBusts'
    for index, original_command in enumerate(opening):
        c = copy.deepcopy(original_command)
        if index == 15:
            result += [command(117, [67]), cue(250, 'Applause1', 35), motion]
        if index == 89:
            result += [command(235, [60]), plugin('VisuMZ_4_AttachedPictures', 'MessageRemovePicture', {'PictureID:arraynum': '["60"]'}), command(117, [351]), command(117, [67]), copy.deepcopy(motion)]
        if index in [129, 151]:
            result.append(copy.deepcopy(motion))
        if c['code'] == 357 and c['parameters'][0] == bust:
            name, args = c['parameters'][1], c['parameters'][3]
            if name == 'Basic_EnterBust' or index in [129, 130, 131, 132, 151, 152, 153, 154]:
                args['Duration:eval'] = duration
                if 'EasingType:str' in args:
                    args['EasingType:str'] = 'OutSine' if name == 'Basic_EnterBust' else 'InOutSine'
        if index in [110, 133, 155]:
            speaker = 60 if index == 133 else 61
            for slot in [60, 61]:
                result.append(plugin(bust, 'Tone_CustomToneBust', {'PictureID:arrayeval': json.dumps([str(slot)]), 'customTone:eval': '[0,0,0,0]' if slot == speaker else '[-24,-24,-24,0]', 'Duration:eval': duration}))
        if index == 163:
            result += [copy.deepcopy(motion), plugin(bust, 'Basic_ExitBusts', {'PictureID:arrayeval': '["60","61"]', 'EndOffsetX:eval': '0', 'EndOffsetY:eval': '0', 'EasingType:str': 'InSine', 'FlipDirection:str': 'None', 'Duration:eval': duration, 'AutoErase:eval': 'true'}), command(111, [12, '!$gameVariables.value(47)']), command(230, [20], 1), command(412, [])]
        result.append(c)
    assert [c['parameters'] for c in result if c['code'] in [101, 401]] == [c['parameters'] for c in opening if c['code'] in [101, 401]]
    supplied['events'][1]['pages'][0]['list'] = result
    # Keep unrelated map/editor fields from this checkout.
    target_map = json.loads((GAME / 'data/Map002.json').read_text())
    target_map['events'][1]['pages'][0]['list'] = result
    write_json('data/Map002.json', target_map)

    events = json.loads((GAME / 'data/CommonEvents.json').read_text())
    audio = events[67]['list']
    present = "['prologue.rheed.01','prologue.rheed.02','prologue.rheed.03'].includes($gameVariables.value(56))"
    result = []
    for c in audio:
        c = copy.deepcopy(c)
        if c['code'] == 111 and c['parameters'] == [12, "$gameVariables.value(31) === 'formation' || $gameVariables.value(31) === 'intro'"]:
            result += [command(111, [12, present]), cue(241, 'Town1', 45, 1), cue(245, 'People2', 25, 1), command(412, [])]
            c['parameters'][1] = f"($gameVariables.value(31) === 'formation' || $gameVariables.value(31) === 'intro') && !({present})"
            result += [c, cue(241, 'Town3', 35, 1)]
            continue
        result.append(c)
        if c['code'] == 111 and c['indent'] == 0 and "'dungeon_intro','encounter_intro'" in c['parameters'][1]:
            result.append(cue(241, 'Dungeon2', 35, 1))
        if c['code'] == 111 and c['parameters'] == [12, "$gameVariables.value(31) === 'ending'"]:
            result.append(cue(241, '', 35, 1))
    events[67]['list'] = result
    write_json('data/CommonEvents.json', events, 4)
    print('Integrated Map002, CE067, two plugin entries, six reading IDs and three exact assets.')


if __name__ == '__main__':
    main()
