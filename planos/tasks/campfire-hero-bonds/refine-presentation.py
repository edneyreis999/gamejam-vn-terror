"""One-time refinement of the authored campfire candidate (2026-10-16).

Inputs/targets: CommonEvents 38/45/350/360–375, Maps037–045. Native Talk commands
are the authority for each hero's framing. No runtime dialogue generator.
"""
import copy
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DATA = ROOT / 'rpg-maker/The Dryland Drowned/data'
BACKUP = ROOT / '.artifacts/campfire-presentation-before'
BACKUP.mkdir(parents=True, exist_ok=True)

def read(name):
    path = DATA / name
    backup = BACKUP / name
    assert not backup.exists(), 'This transformation is one-time; inspect before replaying.'
    backup.write_bytes(path.read_bytes())
    return json.loads(path.read_text())

def command(code, *args, indent=0):
    return dict(code=code, indent=indent, parameters=list(args))

def plugin(name, action, args, indent=0):
    return command(357, name, action, action, args, indent=indent)

def vn(action, args, indent):
    return plugin('VisuMZ_2_VNPictureBusts', action, args, indent)

def is_plugin(cmd, action):
    return cmd['code'] == 357 and cmd['parameters'][1] == action

def action(cmd, name):
    return is_plugin(cmd, 'Action') and cmd['parameters'][3]['action'] == name

common = read('CommonEvents.json')
maps = {n: read(f'Map{n:03}.json') for n in range(37, 46)}
names = ['Gorvak', 'Elowen', 'Griznik', 'Seraphina', 'Bimbren', 'Liora', 'Vaelith', 'Draska']
profiles = {}
for n, name in enumerate(names, 37):
    rows = maps[n]['events'][1]['pages'][0]['list']
    start = next(i for i, c in enumerate(rows) if is_plugin(c, 'Basic_EnterBust'))
    profiles[name] = copy.deepcopy(rows[start:start + 4])
    assert [c['parameters'][1] for c in profiles[name]] == ['Basic_EnterBust', 'Scale_ScaleTo', 'Move_MoveToCoordinates', 'Tone_NormalBust']

rows = maps[37]['events'][1]['pages'][0]['list']
# The existing Talk is the first authored Ivaí entry with nonzero entrance time.
start = next(i for i, c in enumerate(rows) if is_plugin(c, 'Basic_EnterBust') and c['parameters'][3]['PictureName:str'] == 'Dryland_ivai' and c['parameters'][3]['Duration:eval'] != '0')
profiles['Ivaí'] = copy.deepcopy(rows[start:start + 4])
profiles['Rheed'] = copy.deepcopy(profiles['Ivaí'])
profiles['Rheed'][0]['parameters'][3]['PictureName:str'] = 'Reed-novo'
duration = '$gameVariables.value(47) ? 0 : 20'

def scale(name):
    return float(profiles[name][1]['parameters'][3]['TargetScaleX:str'])

def enter(name, slot, indent, guest=False):
    result = copy.deepcopy(profiles[name])
    for c in result:
        c['indent'] = indent
        a = c['parameters'][3]
        if 'PictureID:eval' in a: a['PictureID:eval'] = str(slot)
        if 'PictureID:arrayeval' in a: a['PictureID:arrayeval'] = json.dumps([str(slot)])
    if guest:
        a = result[0]['parameters'][3]
        a['Position:num'] = '5'
        a['HorzMirror:str'] = 'None' if a['HorzMirror:str'] == 'Mirror' else 'Mirror'
        result[2]['parameters'][3]['TargetX:str'] = '720'
    return result

def focus(people, speaker, indent):
    result = []
    for person, slot in people.items():
        amount = format(scale(person) * (1 if person == speaker else .9), '.6g')
        result += [vn('Scale_ScaleTo', {'PictureID:arrayeval': json.dumps([str(slot)]), 'TargetScaleX:str': amount, 'TargetScaleY:str': amount, 'Duration:eval': duration}, indent),
                   vn('Tone_CustomToneBust', {'PictureID:arrayeval': json.dumps([str(slot)]), 'customTone:eval': '[0,0,0,0]' if person == speaker else '[-24,-24,-24,0]', 'Duration:eval': duration}, indent)]
    return result

def refine_dialogues(rows, hero_map):
    result = []
    i = 0
    while i < len(rows):
        if not action(rows[i], 'START_SOCIAL_TOPIC'):
            result.append(rows[i]); i += 1; continue
        end = next(j for j in range(i + 1, len(rows)) if action(rows[j], 'COMPLETE_SOCIAL_TOPIC'))
        block = rows[i:end + 1]
        topic = rows[i]['parameters'][3]['value']
        hero = names[int(topic.split('.')[1][1:]) - 1]
        speakers = list(dict.fromkeys(c['parameters'][4] for j, c in enumerate(block[:-1]) if c['code'] == 101 and block[j+1]['code'] == 401 and block[j+1]['parameters'][0].startswith('$[' + topic + '.')))
        assert hero in speakers and len(speakers) == 2, (topic, speakers)
        partner = next(s for s in speakers if s != hero)
        people = {hero: 60, partner: 63}
        for c in block:
            if c['code'] == 235 or is_plugin(c, 'MessageRemovePicture'):
                continue
            if c['code'] == 357 and c['parameters'][0] == 'VisuMZ_2_VNPictureBusts':
                continue
            if c['code'] == 101:
                result += focus(people, c['parameters'][4], c['indent'])
            result.append(c)
            if is_plugin(c, 'MotionPreference'):
                if not hero_map: result += enter(hero, 60, c['indent'])
                result += enter(partner, 63, c['indent'])
            if is_plugin(c, 'ReadingPermission'):
                prev = result[-2]
                unit = prev['parameters'][3]['id']
                if unit.startswith('interject.'):
                    guest = names[int(unit.split('.')[2][1:]) - 1]
                    assert guest not in people
                    people[guest] = 62
                    result += enter(guest, 62, c['indent'], guest=True)
        i = end + 1
        # Keep the hero on screen on return to its menu. Grief owns its whole scene.
        while i < len(rows) and rows[i]['code'] != 119 and rows[i]['code'] != 0:
            c = copy.deepcopy(rows[i])
            if hero_map and c['code'] == 235 and c['parameters'] == [60]:
                i += 1; continue
            if hero_map and is_plugin(c, 'MessageRemovePicture'):
                c['parameters'][3]['PictureID:arraynum'] = '["61", "62", "63"]'
            result.append(c); i += 1
    return result

for n in range(37, 45):
    rows = refine_dialogues(maps[n]['events'][1]['pages'][0]['list'], True)
    # Returning from a social topic restores focus without re-entering the hero.
    label = next(i for i, c in enumerate(rows) if c['code'] == 118 and c['parameters'] == ['hero'])
    entry = rows[label + 1:label + 5]
    assert is_plugin(entry[0], 'Basic_EnterBust')
    rows[label + 1:label + 2] = [command(111, 12, '!$gameScreen.picture(60)') , dict(entry[0], indent=1), command(412)]
    maps[n]['events'][1]['pages'][0]['list'] = rows
for e in common:
    if e and e['name'].startswith('Campfire — grief.'):
        e['list'] = refine_dialogues(e['list'], False)

# Nameplates own their indicator; no remaining portrait bindings.
indicator = 'Dryland_2_ConversationIndicators'
def bind(picture, hero, indent):
    return plugin(indicator, 'Portrait', {'picture': str(picture), 'hero': hero}, indent)

tavern = common[38]['list']
tavern = [c for c in tavern if not (c['code'] == 357 and c['parameters'][0] == indicator)]
out = []
for c in tavern:
    if is_plugin(c, 'PictureTextChange'):
        a = c['parameters'][3]
        ids = json.loads(a['PictureIDs:arraynum'])
        if len(ids) == 1 and 30 <= int(ids[0]) <= 37:
            a['left:json'] = a['center:json'].replace('FS[18]', 'FS[16]')
            a['center:json'] = '""'
    out.append(c)
    if c['code'] == 231 and c['parameters'][1] == 'Dryland_Tag':
        out.append(bind(c['parameters'][0], 'H' + str(c['parameters'][0] - 29), c['indent']))
common[38]['list'] = out

rows = maps[45]['events'][1]['pages'][0]['list']
rows = [c for c in rows if not (c['code'] == 357 and c['parameters'][0] == indicator and c['parameters'][1] == 'Portrait')]
out = []
# Plate centers, above each head in the existing native stage composition.
plate_y = [110, 96, 106, 97, 231, 234, 230, 231]
for i, c in enumerate(rows):
    if c['code'] == 232 and c['parameters'][8] == 0 and c['parameters'][10] == 60:
        c['parameters'][10] = 180
    if c['code'] == 230 and c['parameters'] == [60] and i > 0 and rows[i-1]['code'] == 412:
        c['parameters'][0] = 180
    out.append(c)
    if c['code'] == 231 and c['parameters'][1].startswith('Dryland_H'):
        hero = int(c['parameters'][1].removeprefix('Dryland_H'))
        # Dead silhouettes in the arrival fade have no interactive nameplate.
        if rows[i-1]['code'] != 111 or rows[i-1]['parameters'][1] != f'$gameSwitches.value({60+hero})': continue
        pid = 29 + hero
        out += [command(231, pid, 'Dryland_Tag', 1, 0, c['parameters'][4], plate_y[hero-1], 100, 100, 255, 0, indent=c['indent']),
                plugin('Dryland_Presentation', 'BindInterfacePicture', {'picture':str(pid), 'name':'Camp — H'+str(hero)}, c['indent']),
                bind(pid, 'H'+str(hero), c['indent']),
                plugin('Dryland_EventBridge', 'Query', {'kind':'heroName','id':'H'+str(hero),'variable':str(164+hero),'switch':'0'}, c['indent']),
                plugin('VisuMZ_1_MessageCore', 'PictureTextChange', {'PictureIDs:arraynum':json.dumps([str(pid)]),'Padding:eval':'8', **{k+':json':'""' for k in ['upperleft','up','upperright','center','right','lowerleft','down','lowerright']},'left:json':json.dumps('\\HexColor<#ffffff>\\FS[16]\\V['+str(164+hero)+']')},c['indent'])]
    if c['code'] == 235 and 10 <= c['parameters'][0] <= 17:
        out.append(command(235, c['parameters'][0]+20, indent=c['indent']))
maps[45]['events'][1]['pages'][0]['list'] = out
for c in common[45]['list']:
    if c['code'] == 232:
        assert c['parameters'][10] == 60
        c['parameters'][10] = 180
assert common[350]['name'] == 'Taverna — duração das ausências'
waits = [c for c in common[350]['list'] if c['code'] == 230]
assert len(waits) == 1 and waits[0]['parameters'] == [60]
waits[0]['parameters'] = [180]

def proof(rows):
    # Prose, read IDs, actions and choices must remain identical and ordered.
    return [c for c in rows if c['code'] in (101,401,102,402) or is_plugin(c,'Action') or is_plugin(c,'ReadingPermission') or is_plugin(c,'ReadingEnd')]

outputs = {'CommonEvents.json': common, **{f'Map{n:03}.json':m for n,m in maps.items()}}
for name, data in outputs.items():
    before = json.loads((BACKUP/name).read_text())
    if isinstance(data,list):
        assert [proof(e['list']) if e else None for e in before] == [proof(e['list']) if e else None for e in data]
    else:
        assert proof(before['events'][1]['pages'][0]['list']) == proof(data['events'][1]['pages'][0]['list'])
    encoded = json.dumps(data, ensure_ascii=False, indent=4)+'\n'
    assert json.loads(encoded) == data
    (DATA/name).write_text(encoded)
print('Refined CommonEvents 38/45/360–375 and Maps037–045; preserved prose/read boundaries/actions/choices.')
