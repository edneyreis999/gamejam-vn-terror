"""Apply indicator commands and camp controls to the authored candidate once."""
import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];GAME=ROOT/'rpg-maker/The Dryland Drowned';DATA=GAME/'data'
def read(name):return json.loads((DATA/name).read_text())
def write(name,obj):(DATA/name).write_text(json.dumps(obj,ensure_ascii=False,indent=4)+'\n')
def c(code,*args,indent=0):return dict(code=code,indent=indent,parameters=list(args))
def plugin(name,cmd,args,indent=0):return c(357,name,cmd,cmd,args,indent=indent)
def indicator(cmd,**args):return plugin('Dryland_2_ConversationIndicators',cmd,{k:str(v) for k,v in args.items()})
ce=read('CommonEvents.json')
assert not any(cmd['code']==357 and cmd['parameters'][0]=='Dryland_2_ConversationIndicators' for cmd in ce[38]['list'])
# Bind indicators to the tavern's existing hit portraits, not full-screen artwork.
ids=[12,13,16,15,11,10,14,17]
for j in range(len(ce[38]['list'])-1,-1,-1):
 cmd=ce[38]['list'][j]
 if cmd['code']==231 and cmd['parameters'][0] in ids:
  new=indicator('Portrait',picture=cmd['parameters'][0],hero='H'+str(ids.index(cmd['parameters'][0])+1));new['indent']=cmd['indent'];ce[38]['list'].insert(j+1,new)
write('CommonEvents.json',ce)
for i in range(1,9):
 name=f'Map{36+i:03}.json';m=read(name);l=m['events'][1]['pages'][0]['list']
 talk=next(int(cmd['parameters'][3]['unit']) for cmd in l if cmd['code']==357 and cmd['parameters'][1]=='ObservationBegin' and int(cmd['parameters'][3]['unit'])%4==3)
 for j in range(len(l)-1,-1,-1):
  cmd=l[j]
  if cmd['code']==102:
   if len(cmd['parameters'][0])==2:topics=[None,''] # the camp ID is resolved before setupChoices
   else:
    topics=['talk:'+str(talk)]+[f'tavern.h{i}.'+re.search(r'about\.(h\d)',label)[1] for label in cmd['parameters'][0] if 'ui.social.about.' in label]+['','']
   config=indicator('Menu',topics=json.dumps(topics));config['indent']=cmd['indent'];l.insert(j,config)
 # Restore the main portrait when a new-topic body has cleared its own busts.
 enter=next(j for j,cmd in enumerate(l) if cmd['code']==357 and cmd['parameters'][1]=='Basic_EnterBust')
 block=l[enter:enter+4]
 loop=next(j for j,cmd in enumerate(l) if cmd['code']==118 and cmd['parameters']==['hero'])
 l[loop+1:loop+1]=json.loads(json.dumps(block))
 write(name,m)
m=read('Map045.json');l=m['events'][1]['pages'][0]['list']
# Use native picture buttons because this menu's choice window is hidden.
for cmd in l:
 if cmd['code'] in [102,402]:
  labels=cmd['parameters'][0] if cmd['code']==102 else [cmd['parameters'][1]]
  for j,label in enumerate(labels):
   suffix= '<Bind Picture: 43>' if label=='$[ui.camp.continue]' else '<Bind Picture: 40>' if label=='$[ui.camp.retreat]' else '<Bind Picture: 42>' if label=='☰' else ''
   labels[j]=label+suffix
  if cmd['code']==402:cmd['parameters'][1]=labels[0]
for j in range(len(l)-1,-1,-1):
 cmd=l[j]
 if cmd['code']==231 and cmd['parameters'][1].startswith('Dryland_H'):
  id=cmd['parameters'][0];new=indicator('Portrait',picture=id,hero='H'+str(id-9));new['indent']=cmd['indent'];l.insert(j+1,new)
menu=next(j for j,cmd in enumerate(l) if cmd['code']==102)
controls=[]
for id,x,y,scale,label in [(40,160,665,120,'$[ui.camp.retreat]'),(43,1120,665,100,'$[ui.camp.continue]'),(42,1206,36,60,'☰')]:
 controls+=[c(231,id,'Dryland_Button',1,0,x,y,scale,scale,255,0),plugin('Dryland_Presentation','BindInterfacePicture',{'picture':str(id),'name':'Camp controls'})]
 args={key+':json':'""' for key in ['upperleft','up','upperright','left','center','right','lowerleft','down','lowerright']}
 args.update({'PictureIDs:arraynum':json.dumps([str(id)]),'Padding:eval':'8','center:json':json.dumps('\\FS[20]'+label)})
 controls.append(plugin('Coreto_1_MessageCore','PictureTextChange',args))
l[menu:menu]=controls
# Menu command applies only to hero choices, no configuration on stage.
write('Map045.json',m)
p=GAME/'js/plugins.js';text=p.read_text();start=text.index('[');end=text.rindex(']')+1;registry=json.loads(text[start:end]);name='Dryland_2_ConversationIndicators';assert not any(row['name']==name for row in registry)
registry.append(dict(name=name,status=True,description='Available unread conversation indicators',parameters={}))
p.write_text(text[:start]+json.dumps(registry,ensure_ascii=False,indent=4)+text[end:])
print('Registered indicator extension and native menu/portrait bindings.')
