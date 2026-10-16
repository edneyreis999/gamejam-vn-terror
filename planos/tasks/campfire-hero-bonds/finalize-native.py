"""Focused cleanup and camp Back label after native authorship."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3];GAME=ROOT/'rpg-maker/The Dryland Drowned';DATA=GAME/'data'
def c(code,*args):return dict(code=code,indent=0,parameters=list(args))
p=DATA/'Map045.json';m=json.loads(p.read_text());l=m['events'][1]['pages'][0]['list'];assert l[0]['code']==357
# Clear the previous encounter's scene-owned controls before the narrator.
index=next(j for j,cmd in enumerate(l) if cmd['code']==111 and cmd['parameters']==[12,"$gameVariables.value(31) === 'camp_arrival'"])
clear=[c(235,id) for id in [*range(10,18),*range(20,28),*range(30,38),*range(40,45),50,51,52]]
for cmd in clear:cmd['indent']=1
l[index+1:index+1]=clear
p.write_text(json.dumps(m,ensure_ascii=False,indent=4)+'\n')
for i in range(37,45):
 p=DATA/f'Map{i:03}.json';m=json.loads(p.read_text());l=m['events'][1]['pages'][0]['list']
 for cmd in l:
  if cmd['code']==102 and len(cmd['parameters'][0])==2:cmd['parameters'][0][1]='$[ui.camp.back]'
  if cmd['code']==402 and cmd['indent']==1 and cmd['parameters'][1]=='$[choice.conv.back]':cmd['parameters'][1]='$[ui.camp.back]'
 p.write_text(json.dumps(m,ensure_ascii=False,indent=4)+'\n')
p=GAME/'Languages.tsv';s=p.read_text();assert 'ui.camp.back\t' not in s;p.write_text(s+'ui.camp.back\tBack\tVoltar\n')
