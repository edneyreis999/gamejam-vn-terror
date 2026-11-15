import json,re,glob,sys
out_id, resp_files, name = sys.argv[1], sys.argv[2].split(','), sys.argv[3]
base='/private/tmp/claude-501/-Users-edney-projects-coreto-gamejam-vn-terror/d39f56dd-890a-4cf6-b83c-a68e3838a826/tasks/'
msgs=[];tools=[]
for l in open(base+out_id+'.output'):
    try: d=json.loads(l)
    except: continue
    m=d.get('message') or {}
    if m.get('role')!='assistant': continue
    c=m.get('content')
    if isinstance(c,str): msgs.append(c); continue
    for b in c:
        if b.get('type')=='tool_use': tools.append((b.get('name'),(b.get('input') or {}).get('file_path')))
    t=''.join(b.get('text','') for b in c if b.get('type')=='text')
    if t: msgs.append(t)
print('ferramentas:',[(n,(p or '').split('/')[-1]) for n,p in tools])
full=msgs[-1].strip()
ficha=full.split('\n---\n')[0]
dest=f'rodadas/{name}-ficha.md'
open(dest,'w').write(full+'\n')
print('salvo em',dest,'| tamanho da ficha:',len(ficha.encode()),'bytes')
def norm(s): return re.sub(r'\s+',' ',s.replace('“','"').replace('”','"').replace('‘',"'").replace('’',"'").replace('*','')).strip().lower()
ans=norm(' '.join(open(f).read() for f in resp_files))
book=norm(' '.join(open(x).read() for x in glob.glob('../../livro-ghork/*.md')))
tot=0;bad=[]
for line in ficha.replace('“','"').replace('”','"').split('\n'):
    if line.count('"')%2: print('ASPAS ÍMPARES:',line[:80]); continue
    for q in line.split('"')[1::2]:
        for part in re.split(r'\[\.\.\.\]',q):
            p=norm(part).strip(' .,;:!?—-…')
            if len(p)<5: continue
            tot+=1
            if p not in ans and p not in book: bad.append(part)
print(tot,'citações;',len(bad),'sem correspondência:',[b[:80] for b in bad])
# frases fora das aspas com marcadores de generalização, intenção ou causa
pat=re.compile(r'\b(sempre|nunca|costuma|geralmente|porque|por causa|para que|a fim de|para (?:planejar|esconder|evitar|impressionar|agradar|proteger|conseguir)|vai faltar|de propósito|quer |tenta |finge|disfarça|esconde)\b',re.I)
print('--- trechos fora de aspas com marcador de causa, intenção ou generalização:')
for i,line in enumerate(ficha.split('\n'),1):
    fora=re.sub(r'[“"][^”"]*[”"]','""',line)
    for m in pat.finditer(fora):
        s=max(0,m.start()-60); print(f'L{i}: ...{fora[s:m.end()+70]}...')
print('meta:',[w for w in ['Nenhuma resposta','nenhuma resposta','respondid','as perguntas'] if w in ficha])
# afirmações sobre a forma de várias falas (para conferir à mão contra as falas citadas)
pat2=re.compile(r'(começ\w+ por|abr\w+ (?:com|por|a fala)|abertura|terminam?|fecha\w* com|todas|todos|nenhuma|nenhum|\d+ (?:falas|vezes|ocorrências)|em \d+ falas|duas dessas|três dessas|uma vez|apenas|só aparece|só aparecem)',re.I)
print('--- afirmações sobre a forma das falas (conferir à mão):')
for i,line in enumerate(ficha.split('\n'),1):
    fora=re.sub(r'[“"][^”"]*[”"]','""',line)
    for m in pat2.finditer(fora):
        s=max(0,m.start()-70); print(f'L{i}: ...{fora[s:m.end()+80]}...')
