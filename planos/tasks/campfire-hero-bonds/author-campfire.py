"""One-time native authorship for campfire-hero-bonds, baseline e920095.
Text lives exclusively in Languages.tsv. Run only against the stated baseline;
subsequent authoring belongs to the native events. No runtime generator.
"""
import json, copy
from pathlib import Path
ROOT = Path(__file__).resolve().parents[3]
GAME = ROOT / 'rpg-maker/The Dryland Drowned'
DATA = GAME / 'data'
CORPUS = {'camp.h1.church.a': [['01', 'Gorvak'], ['02', 'Rheed'], ['03', 'Gorvak'], ['04', 'Rheed'], ['05', 'Gorvak']], 'camp.h1.church.b': [['01', 'Gorvak'], ['02', 'Ivaí'], ['03', 'Gorvak'], ['04', 'Ivaí'], ['05', 'Gorvak']], 'camp.h1.park.a': [['01', 'Rheed'], ['02', 'Gorvak'], ['03', 'Rheed'], ['04', 'Gorvak']], 'camp.h1.park.b': [['01', 'Gorvak'], ['02', 'Rheed'], ['03', 'Gorvak'], ['04', 'Rheed'], ['05', 'Gorvak']], 'camp.h1.village.a': [['01', 'Gorvak'], ['02', 'Rheed'], ['03', 'Gorvak'], ['04', 'Rheed'], ['05', 'Gorvak']], 'camp.h1.village.b': [['01', 'Gorvak'], ['02', 'Ivaí'], ['03', 'Gorvak'], ['04', 'Ivaí'], ['05', 'Gorvak']], 'camp.h2.church.a': [['01', 'Elowen'], ['02', 'Rheed'], ['03', 'Elowen'], ['04', 'Rheed'], ['05', 'Elowen']], 'camp.h2.church.b': [['01', 'Elowen'], ['02', 'Ivaí'], ['03', 'Elowen'], ['04', 'Ivaí'], ['05', 'Elowen']], 'camp.h2.park.a': [['01', 'Elowen'], ['02', 'Rheed'], ['03', 'Elowen'], ['04', 'Rheed'], ['05', 'Elowen']], 'camp.h2.park.b': [['01', 'Elowen'], ['02', 'Rheed'], ['03', 'Elowen'], ['04', 'Rheed'], ['05', 'Elowen']], 'camp.h2.village.a': [['01', 'Elowen'], ['02', 'Rheed'], ['03', 'Elowen'], ['04', 'Rheed'], ['05', 'Elowen']], 'camp.h2.village.b': [['01', 'Elowen'], ['02', 'Ivaí'], ['03', 'Elowen'], ['04', 'Ivaí'], ['05', 'Elowen']], 'camp.h3.church.a': [['01', 'Griznik'], ['02', 'Rheed'], ['03', 'Griznik'], ['04', 'Rheed'], ['05', 'Griznik']], 'camp.h3.church.b': [['01', 'Griznik'], ['02', 'Rheed'], ['03', 'Griznik'], ['04', 'Rheed'], ['05', 'Griznik']], 'camp.h3.park.a': [['01', 'Rheed'], ['02', 'Griznik'], ['03', 'Rheed'], ['04', 'Griznik']], 'camp.h3.park.b': [['01', 'Griznik'], ['02', 'Rheed'], ['03', 'Griznik'], ['04', 'Rheed'], ['05', 'Griznik']], 'camp.h3.village.a': [['01', 'Griznik'], ['02', 'Rheed'], ['03', 'Griznik'], ['04', 'Rheed'], ['05', 'Griznik']], 'camp.h3.village.b': [['01', 'Griznik'], ['02', 'Ivaí'], ['03', 'Griznik'], ['04', 'Ivaí'], ['05', 'Griznik']], 'camp.h4.church.a': [['01', 'Seraphina'], ['02', 'Rheed'], ['03', 'Seraphina'], ['04', 'Rheed'], ['05', 'Seraphina']], 'camp.h4.church.b': [['01', 'Seraphina'], ['02', 'Ivaí'], ['03', 'Seraphina'], ['04', 'Ivaí'], ['05', 'Seraphina']], 'camp.h4.park.a': [['01', 'Rheed'], ['02', 'Seraphina'], ['03', 'Rheed'], ['04', 'Seraphina']], 'camp.h4.park.b': [['01', 'Seraphina'], ['02', 'Rheed'], ['03', 'Seraphina'], ['04', 'Rheed'], ['05', 'Seraphina']], 'camp.h4.village.a': [['01', 'Seraphina'], ['02', 'Rheed'], ['03', 'Seraphina'], ['04', 'Rheed'], ['05', 'Seraphina']], 'camp.h4.village.b': [['01', 'Seraphina'], ['02', 'Ivaí'], ['03', 'Seraphina'], ['04', 'Ivaí'], ['05', 'Seraphina']], 'camp.h5.church.a': [['01', 'Bimbren'], ['02', 'Rheed'], ['03', 'Bimbren'], ['04', 'Rheed'], ['05', 'Bimbren']], 'camp.h5.church.b': [['01', 'Bimbren'], ['02', 'Rheed'], ['03', 'Bimbren'], ['04', 'Rheed'], ['05', 'Bimbren']], 'camp.h5.park.a': [['01', 'Bimbren'], ['02', 'Rheed'], ['03', 'Bimbren'], ['04', 'Rheed'], ['05', 'Bimbren']], 'camp.h5.park.b': [['01', 'Rheed'], ['02', 'Bimbren'], ['03', 'Rheed'], ['04', 'Bimbren'], ['05', 'Rheed'], ['06', 'Bimbren']], 'camp.h5.village.a': [['01', 'Bimbren'], ['02', 'Rheed'], ['03', 'Bimbren'], ['04', 'Rheed'], ['05', 'Bimbren']], 'camp.h5.village.b': [['01', 'Bimbren'], ['02', 'Ivaí'], ['03', 'Bimbren'], ['04', 'Ivaí'], ['05', 'Bimbren']], 'camp.h6.church.a': [['01', 'Liora'], ['02', 'Rheed'], ['03', 'Liora'], ['04', 'Rheed'], ['05', 'Liora']], 'camp.h6.church.b': [['01', 'Liora'], ['02', 'Rheed'], ['03', 'Liora'], ['04', 'Rheed'], ['05', 'Liora']], 'camp.h6.park.a': [['01', 'Liora'], ['02', 'Rheed'], ['03', 'Liora'], ['04', 'Rheed'], ['05', 'Liora']], 'camp.h6.park.b': [['01', 'Rheed'], ['02', 'Liora'], ['03', 'Rheed'], ['04', 'Liora'], ['05', 'Rheed'], ['06', 'Liora']], 'camp.h6.village.a': [['01', 'Liora'], ['02', 'Rheed'], ['03', 'Liora'], ['04', 'Rheed'], ['05', 'Liora']], 'camp.h6.village.b': [['01', 'Liora'], ['02', 'Ivaí'], ['03', 'Liora'], ['04', 'Ivaí'], ['05', 'Liora']], 'camp.h7.church.a': [['01', 'Vaelith'], ['02', 'Rheed'], ['03', 'Vaelith'], ['04', 'Rheed'], ['05', 'Vaelith']], 'camp.h7.church.b': [['01', 'Vaelith'], ['02', 'Ivaí'], ['03', 'Vaelith'], ['04', 'Ivaí'], ['05', 'Vaelith']], 'camp.h7.park.a': [['01', 'Rheed'], ['02', 'Vaelith'], ['03', 'Rheed'], ['04', 'Vaelith'], ['05', 'Rheed'], ['06', 'Vaelith']], 'camp.h7.park.b': [['01', 'Vaelith'], ['02', 'Rheed'], ['03', 'Vaelith'], ['04', 'Rheed'], ['05', 'Vaelith']], 'camp.h7.village.a': [['01', 'Vaelith'], ['02', 'Rheed'], ['03', 'Vaelith'], ['04', 'Rheed'], ['05', 'Vaelith']], 'camp.h7.village.b': [['01', 'Vaelith'], ['02', 'Rheed'], ['03', 'Vaelith'], ['04', 'Rheed'], ['05', 'Vaelith']], 'camp.h8.church.a': [['01', 'Draska'], ['02', 'Rheed'], ['03', 'Draska'], ['04', 'Rheed'], ['05', 'Draska']], 'camp.h8.church.b': [['01', 'Rheed'], ['02', 'Draska'], ['03', 'Rheed'], ['04', 'Draska'], ['05', 'Rheed']], 'camp.h8.park.a': [['01', 'Rheed'], ['02', 'Draska'], ['03', 'Rheed'], ['04', 'Draska'], ['05', 'Rheed'], ['06', 'Draska']], 'camp.h8.park.b': [['01', 'Draska'], ['02', 'Rheed'], ['03', 'Draska'], ['04', 'Rheed'], ['05', 'Draska']], 'camp.h8.village.a': [['01', 'Draska'], ['02', 'Rheed'], ['03', 'Draska'], ['04', 'Rheed'], ['05', 'Draska']], 'camp.h8.village.b': [['01', 'Draska'], ['02', 'Ivaí'], ['03', 'Draska'], ['04', 'Ivaí'], ['05', 'Draska']], 'interject.h1.h5': [['01', 'Bimbren'], ['02', 'Gorvak']], 'interject.h1.h8': [['01', 'Draska'], ['02', 'Gorvak']], 'interject.h2.h6': [['01', 'Liora'], ['02', 'Elowen']], 'interject.h7.h2': [['01', 'Elowen'], ['02', 'Vaelith']], 'interject.h3.h8': [['01', 'Draska'], ['02', 'Griznik']], 'interject.h6.h3': [['01', 'Griznik'], ['02', 'Liora']], 'interject.h5.h4': [['01', 'Seraphina'], ['02', 'Bimbren']], 'interject.h4.h7': [['01', 'Vaelith'], ['02', 'Seraphina']], 'arrival.none': [['01', 'Older Rheed']], 'arrival.recent': [['01', 'Older Rheed']], 'arrival.prior': [['01', 'Older Rheed']], 'grief.h1.h5': [['01', 'Gorvak'], ['02', 'Rheed']], 'grief.h1.h8': [['01', 'Gorvak'], ['02', 'Rheed']], 'grief.h2.h6': [['01', 'Elowen'], ['02', 'Rheed']], 'grief.h2.h7': [['01', 'Elowen'], ['02', 'Rheed']], 'grief.h3.h8': [['01', 'Griznik'], ['02', 'Rheed']], 'grief.h3.h6': [['01', 'Griznik'], ['02', 'Rheed']], 'grief.h4.h5': [['01', 'Seraphina'], ['02', 'Rheed']], 'grief.h4.h7': [['01', 'Seraphina'], ['02', 'Rheed']], 'grief.h5.h1': [['01', 'Bimbren'], ['02', 'Rheed']], 'grief.h5.h4': [['01', 'Bimbren'], ['02', 'Rheed']], 'grief.h6.h2': [['01', 'Liora'], ['02', 'Rheed']], 'grief.h6.h3': [['01', 'Liora'], ['02', 'Rheed']], 'grief.h7.h2': [['01', 'Vaelith'], ['02', 'Rheed']], 'grief.h7.h4': [['01', 'Vaelith'], ['02', 'Rheed']], 'grief.h8.h1': [['01', 'Draska'], ['02', 'Rheed']], 'grief.h8.h3': [['01', 'Draska'], ['02', 'Rheed']], 'tavern.h1.h5': [['witness', 'Gorvak'], ['away', 'Gorvak'], ['after', 'Gorvak'], ['first', 'Gorvak'], ['body.01', 'Gorvak'], ['body.02', 'Rheed'], ['body.03', 'Gorvak']], 'tavern.h1.h8': [['witness', 'Gorvak'], ['away', 'Gorvak'], ['after', 'Gorvak'], ['first', 'Gorvak'], ['body.01', 'Gorvak'], ['body.02', 'Ivaí'], ['body.03', 'Gorvak']], 'tavern.h2.h6': [['witness', 'Elowen'], ['away', 'Elowen'], ['after', 'Elowen'], ['first', 'Elowen'], ['body.01', 'Elowen'], ['body.02', 'Rheed'], ['body.03', 'Elowen']], 'tavern.h2.h7': [['witness', 'Elowen'], ['away', 'Elowen'], ['after', 'Elowen'], ['first', 'Elowen'], ['body.01', 'Elowen'], ['body.02', 'Rheed'], ['body.03', 'Elowen']], 'tavern.h3.h8': [['witness', 'Griznik'], ['away', 'Griznik'], ['after', 'Griznik'], ['first', 'Griznik'], ['body.01', 'Griznik'], ['body.02', 'Ivaí'], ['body.03', 'Griznik']], 'tavern.h3.h6': [['witness', 'Griznik'], ['away', 'Griznik'], ['after', 'Griznik'], ['first', 'Griznik'], ['body.01', 'Griznik'], ['body.02', 'Rheed'], ['body.03', 'Griznik']], 'tavern.h4.h5': [['witness', 'Seraphina'], ['away', 'Seraphina'], ['after', 'Seraphina'], ['first', 'Seraphina'], ['body.01', 'Seraphina'], ['body.02', 'Rheed'], ['body.03', 'Seraphina']], 'tavern.h4.h7': [['witness', 'Seraphina'], ['away', 'Seraphina'], ['after', 'Seraphina'], ['first', 'Seraphina'], ['body.01', 'Seraphina'], ['body.02', 'Ivaí'], ['body.03', 'Seraphina']], 'tavern.h5.h1': [['witness', 'Bimbren'], ['away', 'Bimbren'], ['after', 'Bimbren'], ['first', 'Bimbren'], ['body.01', 'Bimbren'], ['body.02', 'Rheed'], ['body.03', 'Bimbren']], 'tavern.h5.h4': [['witness', 'Bimbren'], ['away', 'Bimbren'], ['after', 'Bimbren'], ['first', 'Bimbren'], ['body.01', 'Bimbren'], ['body.02', 'Ivaí'], ['body.03', 'Bimbren']], 'tavern.h6.h2': [['witness', 'Liora'], ['away', 'Liora'], ['after', 'Liora'], ['first', 'Liora'], ['body.01', 'Liora'], ['body.02', 'Rheed'], ['body.03', 'Liora']], 'tavern.h6.h3': [['witness', 'Liora'], ['away', 'Liora'], ['after', 'Liora'], ['first', 'Liora'], ['body.01', 'Liora'], ['body.02', 'Ivaí'], ['body.03', 'Liora']], 'tavern.h7.h2': [['witness', 'Vaelith'], ['away', 'Vaelith'], ['after', 'Vaelith'], ['first', 'Vaelith'], ['body.01', 'Vaelith'], ['body.02', 'Rheed'], ['body.03', 'Vaelith']], 'tavern.h7.h4': [['witness', 'Vaelith'], ['away', 'Vaelith'], ['after', 'Vaelith'], ['first', 'Vaelith'], ['body.01', 'Vaelith'], ['body.02', 'Ivaí'], ['body.03', 'Vaelith']], 'tavern.h8.h1': [['witness', 'Draska'], ['away', 'Draska'], ['after', 'Draska'], ['first', 'Draska'], ['body.01', 'Draska'], ['body.02', 'Rheed'], ['body.03', 'Draska']], 'tavern.h8.h3': [['witness', 'Draska'], ['away', 'Draska'], ['after', 'Draska'], ['first', 'Draska'], ['body.01', 'Draska'], ['body.02', 'Ivaí'], ['body.03', 'Draska']]}
def read(name): return json.loads((DATA/name).read_text())
def write(name,value):
    out=json.dumps(value,ensure_ascii=False,indent=4)+'\n'
    json.loads(out)
    (DATA/name).write_text(out)
def c(code,*args,indent=0): return dict(code=code,indent=indent,parameters=list(args))
def plugin(name,command,**args): return c(357,name,command,command,{k:str(v) for k,v in args.items()})
def bridge(command,**args): return plugin('Dryland_EventBridge',command,**args)
def pres(command,**args): return plugin('Dryland_Presentation',command,**args)
def query(kind,id='',variable=0,switch=0,index=0,identityVariable=0): return bridge('Query',kind=kind,id=id,variable=variable,switch=switch,index=index,identityVariable=identityVariable)
def action(name,topic=''): return [bridge('CaptureContext'),bridge('Action',action=name,value=topic)]
def nest(commands):
    result=copy.deepcopy(commands)
    for cmd in result:cmd['indent']+=1
    return result
def branch(expr,yes,no=None):
    result=[c(111,12,expr)]+nest(yes)
    if no is not None:result+=[c(411)]+nest(no)
    return result+[c(412)]
def var(id,expr):return c(122,id,id,0,4,expr)
def transfer(mapid):return c(201,0,mapid,10,7,2,2)
def checkpoint(reason):return bridge('Checkpoint',reason=reason)
def clear_pictures(ids):return [c(235,id) for id in ids]
def choices(labels,bodies,key):
    result=[pres('ConsumeInput'),pres('ChoiceFocus',key=key,remember='true',horizontal='true'),c(102,labels,-1,0,2,0)]
    for index,(label,body) in enumerate(zip(labels,bodies)):
        result+=[c(402,index,label)]+nest(body)+[c(0,indent=1)]
    return result+[c(404)]
def picture(id,name,x,y,scale):return c(231,id,name,1,0,x,y,scale,scale,255,0)
def vn(command,**args):return plugin('VisuMZ_2_VNPictureBusts',command,**args)
def bust(name,id,x,scale=50):
    return [vn('Basic_EnterBust',**{'PictureID:eval':id,'PictureName:str':name,'Origin:str':'Bust','Position:num':2,'StartOffsetX:eval':0,'StartOffsetY:eval':0,'EasingType:str':'OutSine','HorzMirror:str':'None','Duration:eval':0}),
            vn('Scale_ScaleTo',**{'PictureID:arrayeval':json.dumps([str(id)]),'TargetScaleX:str':scale,'TargetScaleY:str':scale,'Duration:eval':0}),
            vn('Move_MoveToCoordinates',**{'PictureID:arrayeval':json.dumps([str(id)]),'TargetX:str':x,'TargetY:str':725,'EasingType:str':'Linear','FlipDirection:str':'None','Duration:eval':0})]
ce=read('CommonEvents.json');system=read('System.json')
assert len(ce)==357 and not any(e and e['name'].startswith('Campfire —') for e in ce)
assert not any(read('Map045.json')['events'])
variables={216:'Social — hero return context',217:'Social — active topic',218:'Social — displayed unit',219:'Camp — next grief',220:'Camp — tone'}
while len(system['variables'])<=220:system['variables'].append('')
for id,name in variables.items():assert not system['variables'][id];system['variables'][id]=name
for id,name in {49:'Social — unit already read',50:'Social — topic eligible',51:'Camp — participant',52:'Camp — dead portrait'}.items():
    while len(system['switches'])<=id:system['switches'].append('')
    assert not system['switches'][id];system['switches'][id]=name

def common(name,commands):
    id=len(ce);ce.append(dict(id=id,name=name,trigger=0,switchId=1,list=commands+[c(0)]));return id
names=['Gorvak','Elowen','Griznik','Seraphina','Bimbren','Liora','Vaelith','Draska']
assets={name:'Dryland_H'+str(i+1) for i,name in enumerate(names)}
# The existing conversation's authored Ivaí asset is the authority.
hero_entry=read('Map037.json')['events'][1]['pages'][0]['list']
ivai=next(cmd['parameters'][3]['PictureName:str'] for cmd in hero_entry if cmd['code']==357 and cmd['parameters'][1]=='Basic_EnterBust' and cmd['parameters'][3]['PictureID:eval']=='63')
assets.update({'Ivaí':ivai,'Rheed':'Reed-novo'})
assert (GAME/'img/pictures'/f'{assets["Rheed"]}.png').exists()
# Scene-owned bust cleanup uses the installed attachment API.
def cleanup_busts():return clear_pictures(range(60,64))+[plugin('VisuMZ_4_AttachedPictures','MessageRemovePicture',**{'PictureID:arraynum':json.dumps([str(i) for i in range(60,64)])})]
def segment(scene,rows,unit):
    result=[query('socialUnitRead',unit,switch=49),pres('ReadingPermission',switch=49)]
    speakers=list(dict.fromkeys(speaker for _,speaker in rows))
    assert len(speakers)<=2
    ids={speaker:60+i*3 for i,speaker in enumerate(speakers)}
    result+=cleanup_busts()
    for speaker,id in ids.items(): result+=bust(assets[speaker],id,320 if id==60 else 960)
    for suffix,speaker in rows:
        for person,id in ids.items():
            result+=[vn('Scale_ScaleTo',**{'PictureID:arrayeval':json.dumps([str(id)]),'TargetScaleX:str':50 if person==speaker else 45,'TargetScaleY:str':50 if person==speaker else 45,'Duration:eval':'$gameVariables.value(47) ? 0 : 20'}),
                     vn('Tone_CustomToneBust',**{'PictureID:arrayeval':json.dumps([str(id)]),'customTone:eval':'[0,0,0,0]' if person==speaker else '[-24,-24,-24,0]','Duration:eval':'$gameVariables.value(47) ? 0 : 20'})]
        result += [c(101,'',0,0,2,speaker),c(401,'$['+scene+'.'+suffix+']')]
    return result+[pres('ReadingEnd')]
def social(scene):
    result=action('START_SOCIAL_TOPIC',scene)+[pres('MotionPreference',variable=47)]
    if scene.startswith('tavern.'):
        for index,parts in enumerate([['witness','away'],['after','first'],['body']]):
            result.append(query('socialUnit',scene,variable=218,index=index))
            for part in parts:
                rows=[row for row in CORPUS[scene] if row[0]==part or row[0].startswith(part+'.')]
                result+=branch(f'$gameVariables.value(218) === "{scene}.{part}"',segment(scene,rows,scene+'.'+part))
    else:
        result+=segment(scene,CORPUS[scene],scene)
        if scene in suffixes:
            suffix=suffixes[scene];result.append(query('socialUnit',scene,variable=218,index=1))
            result+=branch(f'$gameVariables.value(218) === "{suffix}"',segment(suffix,CORPUS[suffix],suffix))
    return result+action('COMPLETE_SOCIAL_TOPIC',scene)+[pres('ConsumeInput'),checkpoint('social_complete')]+cleanup_busts()
suffixes={'camp.h1.church.a':'interject.h1.h5','camp.h1.park.a':'interject.h1.h8','camp.h2.park.b':'interject.h2.h6','camp.h7.park.a':'interject.h7.h2','camp.h3.church.a':'interject.h3.h8','camp.h6.church.a':'interject.h6.h3','camp.h5.village.a':'interject.h5.h4','camp.h4.park.a':'interject.h4.h7'}
arrival_ids={}
for tone in ['none','recent','prior']:
    commands=copy.deepcopy(ce[352]['list'][:-1])
    for cmd in commands:
        if cmd['code']==357 and cmd['parameters'][1]=='Query':cmd['parameters'][3]['id']=f'arrival.{tone}.01'
        if cmd['code']==401:cmd['parameters'][0]=f'$[arrival.{tone}.01]'
    arrival_ids[tone]=common('Campfire — arrival.'+tone,commands)
grief_ids={scene:common('Campfire — '+scene,social(scene)) for scene in CORPUS if scene.startswith('grief.')}
# Remove only voluntary-retreat choices and their corresponding branches.
def remove_retreat(list):
    for index in range(len(list)-1,-1,-1):
        cmd=list[index]
        if cmd['code']==102:
            labels=cmd['parameters'][0]
            removed=[i for i,label in enumerate(labels) if 'choice.encounter.retreat' in label]
            if not removed:continue
            assert len(removed)==1
            removed=removed[0];labels.pop(removed)
            end=next(j for j in range(index+1,len(list)) if list[j]['code']==404 and list[j]['indent']==cmd['indent'])
            starts=[j for j in range(index+1,end) if list[j]['code']==402 and list[j]['indent']==cmd['indent']]
            start=next(j for j in starts if list[j]['parameters'][0]==removed)
            stop=next((j for j in starts if j>start),end)
            del list[start:stop]
            for j in range(index+1,end-(stop-start)):
                if list[j]['code']==402 and list[j]['indent']==cmd['indent'] and list[j]['parameters'][0]>removed:list[j]['parameters'][0]-=1
    # The removed choice wrote the retreat selector; remove its unreachable action branch.
    for index in range(len(list)-1,-1,-1):
        cmd=list[index]
        if cmd['code']==111 and cmd['parameters']==[12,"$gameVariables.value(23) === 'retreat'"]:
            stop=next(j for j in range(index+1,len(list)) if list[j]['code']==412 and list[j]['indent']==cmd['indent']);del list[index:stop+1]
for id in range(7,23):
    map=read(f'Map{id:03}.json')
    for event in map['events']:
        if event:
            for page in event['pages']:remove_retreat(page['list'])
    write(f'Map{id:03}.json',map)
for event in ce:
    if event:remove_retreat(event['list'])
# Checkpoint dispatcher, and camp routing before encounter dispatch.
for reason in ['camp_entry','camp_arrival_complete','social_complete','camp_exit']:
    commands=([c(117,348)] if reason=='camp_exit' else [])+[checkpoint(reason),var(46,'""')]
    ce[44]['list'][-1:-1]=branch(f'$gameVariables.value(46) === "{reason}"',commands)
ce[40]['list'][3:3]=branch("['camp_arrival','camp'].includes($gameVariables.value(31))",[transfer(45),c(115)])
# Preserve narrator context, use fire only after narration, including hero maps.
audio=branch("$gameVariables.value(31) === 'camp_arrival' && $gameVariables.value(56)",[c(241,{'name':'Dryland_Opening_TheWell','volume':45,'pitch':100,'pan':0}),c(245,{'name':'People2','volume':25,'pitch':100,'pan':0}),c(115)])
audio+=branch("['camp_arrival','camp'].includes($gameVariables.value(31))",[c(241,{'name':'','volume':0,'pitch':100,'pan':0}),c(245,{'name':'Fire1','volume':25,'pitch':100,'pan':0}),c(115)])
ce[67]['list'][15:15]=audio
# Existing formation entry explicitly establishes tavern return context.
ce[3]['list'].insert(0,var(216,'"tavern"'))
# Camp picture IDs share the established stage range and are cleared on exit.
positions=[(125,280,16),(340,280,15),(925,280,16),(1140,280,12),(230,420,16),(450,420,16),(820,420,16),(1040,420,17)]
# Participant switches are separate from transient query outputs.
for i in range(1,9):
    while len(system['switches'])<=60+i:system['switches'].append('')
    # 51/52 were only provisional names above; use 61..68 for stage participants.
    system['switches'][60+i]='Camp — selectable H'+str(i)
def stage():
    result=[picture(1,'Dryland_Camp',640,360,80)]
    for i,(x,y,scale) in enumerate(positions,1):
        result += [query('campParticipant','H'+str(i),switch=60+i)]
        result += branch(f'$gameSwitches.value({60+i})',[picture(9+i,'Dryland_H'+str(i),x,y,scale)], [c(235,9+i)])
    return result
camp_cleanup=clear_pictures([*range(10,18),40,41,42,43])+cleanup_busts()
commands=[query('phase',variable=31)]+branch("!['camp_arrival','camp'].includes($gameVariables.value(31))",[c(117,40),c(115)])
arrival=[c(117,67),query('campTone',variable=220)]
for tone,id in arrival_ids.items():arrival+=branch(f'$gameVariables.value(220) === "{tone}"',[c(117,id)])
arrival += [c(242,1),c(246,1),c(230,60),c(245,{'name':'Fire1','volume':25,'pitch':100,'pan':0})]+stage()+[pres('MotionPreference',variable=47)]
fades=[]
for i,(x,y,scale) in enumerate(positions,1):
    fades += [query('heroDead','H'+str(i),switch=52)]
    fades += branch('$gameSwitches.value(52)',[picture(9+i,'Dryland_H'+str(i),x,y,scale),c(232,9+i,0,1,0,x,y,scale,scale,0,0,60,False,0)])
fades += [c(230,60)]
for i in range(1,9):fades += [query('heroDead','H'+str(i),switch=52)]+branch('$gameSwitches.value(52)',[c(235,9+i)])
arrival += branch('!$gameVariables.value(47)',fades)
# Saved continuation proceeds from the next pending reaction, never replays entry.
arrival += [c(118,'grief'),query('pendingGrief',variable=219)]
for scene,id in sorted(grief_ids.items()):arrival+=branch(f'$gameVariables.value(219) === "{scene}"',clear_pictures(range(10,18))+[c(117,id),c(119,'grief')])
arrival+=action('FINISH_CAMP_ARRIVAL')+[checkpoint('camp_arrival_complete')]
commands+=branch("$gameVariables.value(31) === 'camp_arrival'",arrival)
commands += [c(118,'camp')]+[query('heroName','H'+str(i),variable=164+i) for i in range(1,9)]+stage()+[c(117,67),var(216,'"camp"')]
labels=[];bodies=[]
for i in range(1,9):
    labels.append(f'\\V[{164+i}]<Bind Picture: {9+i}><Show Switch: {60+i}><Hide Choice Window>')
    bodies.append(camp_cleanup+[transfer(36+i),c(115)])
labels+=['$[ui.camp.continue]','$[ui.camp.retreat]','☰']
bodies += [action('CONTINUE_FROM_CAMP')+[checkpoint('camp_exit')]+camp_cleanup+[c(117,67),c(117,40),c(115)],
           action('REQUEST_RETREAT')+action('CONFIRM_RETREAT')+[c(117,348),checkpoint('camp_exit')]+camp_cleanup+[c(117,67),transfer(3),c(115)],
           [c(351),c(119,'camp')]]
# MZ supports six choices per command; the installed MessageCore merges adjacent groups.
# Native labels/branches remain authored, not a JS dialogue interpreter.
for offset in range(0,len(labels),6):
    block=choices(labels[offset:offset+6],bodies[offset:offset+6],'camp')
    commands+=block if offset==0 else block[2:]
commands += [c(119,'camp'),c(0)]
map=read('Map045.json');template=copy.deepcopy(read('Map037.json')['events'][1]);template.update(id=1,name='Campfire — arrival and choices',x=10,y=7);template['pages'][0]['list']=commands;map['events']=[None,template];write('Map045.json',map)
# Hero-owned topics; existing Talk and formation branch stay intact.
for i in range(1,9):
    map=read(f'Map{36+i:03}.json');l=map['events'][1]['pages'][0]['list']
    for cmd in l:
        if cmd['code']==111 and cmd['parameters']==[12,"$gameVariables.value(31) !== 'formation'"]:cmd['parameters'][1]="!['formation','camp'].includes($gameVariables.value(31))"
    # Background comes from explicit return context, without changing formation truth.
    bg=next(j for j,cmd in enumerate(l) if cmd['code']==231 and cmd['parameters'][0]==1)
    original=l[bg];l[bg:bg+1]=branch('$gameVariables.value(216) === "camp"',[picture(1,'Dryland_Camp',640,360,80)],[original])
    entry=next(j for j,cmd in enumerate(l) if cmd['code']==118 and cmd['parameters']==['hero'])
    camp_topics=[scene for scene in CORPUS if scene.startswith(f'camp.h{i}.')]
    camp_menu=[query('campTopic','H'+str(i),variable=217)]
    camp_body=[]
    for scene in camp_topics:camp_body+=branch(f'$gameVariables.value(217) === "{scene}"',social(scene)+[c(119,'hero')])
    camp_menu+=choices(['$[choice.conv.talk]','$[choice.conv.back]'],[camp_body,[c(119,'return')]],'hero')
    l[entry+1:entry+1]=branch('$gameVariables.value(216) === "camp"',camp_menu)
    # Insert two explicit conditional About choices between Talk and formation.
    menu=next(j for j,cmd in enumerate(l) if cmd['code']==102 and len(cmd['parameters'][0])==3)
    topics=sorted(scene for scene in CORPUS if scene.startswith(f'tavern.h{i}.'))
    extra=[]
    for k,topic in enumerate(topics):extra.append(f'$[ui.social.about.{topic.split(".")[2]}]<Show Switch: {69+k}>')
    for k,topic in enumerate(topics):
        while len(system['switches'])<=69+k:system['switches'].append('')
        system['switches'][69+k]='Social — About option '+str(k+1)
    prep=[query('socialTopicEligible',topic,switch=69+k) for k,topic in enumerate(topics)]
    l[menu:menu]=prep;menu+=len(prep)
    l[menu]['parameters'][0][1:1]=extra
    l[menu]['parameters'][1]=l[menu]['parameters'][0].index('$[choice.conv.back]')
    end=next(j for j in range(menu+1,len(l)) if l[j]['code']==404 and l[j]['indent']==0)
    insertion=next(j for j in range(menu+1,end) if l[j]['code']==402 and l[j]['indent']==0 and l[j]['parameters'][0]==1)
    for cmd in l[menu+1:end]:
        if cmd['code']==402 and cmd['indent']==0 and cmd['parameters'][0]>=1:cmd['parameters'][0]+=2
    blocks=[]
    for k,topic in enumerate(topics):blocks += [c(402,k+1,extra[k])]+nest(social(topic)+[c(119,'hero')])+[c(0,indent=1)]
    l[insertion:insertion]=blocks
    back=next(j for j,cmd in enumerate(l) if cmd['code']==201 and cmd['parameters'][1]==3)
    l[back:back+1]=branch('$gameVariables.value(216) === "camp"',[transfer(45)],[l[back]])
    write(f'Map{36+i:03}.json',map)
write('CommonEvents.json',ce);write('System.json',system)
print('Authored Map045, Maps037–044, encounter retreat removal, CE357–375, variables216–220 and named switches.')
