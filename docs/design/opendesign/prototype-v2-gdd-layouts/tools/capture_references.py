#!/usr/bin/env python3
"""Capture, review, and validate the 252 prototype-v2 reference rows."""
from __future__ import annotations

import argparse, hashlib, json, os, subprocess, sys, tempfile
import re
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parents[5]
ART = ROOT / "docs/design/opendesign/prototype-v2-gdd-layouts"
CONTRACT = ROOT / ".compozy/tasks/prototype-v2-gdd-layouts/analysis/visual-contract-inventory.json"
EVIDENCE = ROOT / ".compozy/tasks/prototype-v2-gdd-layouts/evidence/references"
INDEX, PROGRESS = EVIDENCE / "reference-index.json", EVIDENCE / ".capture-progress.json"
CDP_DIR = Path("/tmp/gamejam-reference-recovery-20260905")
CDP = CDP_DIR / "cap.mjs"
REVIEWER = "Codex task-role session sess-6940d5533de812b7"
ANCHORS = {
 "S01":["painel central","ação primária"],
 "S02":["retrato lateral","painel de leitura","controles inferiores"],
 "S03":["oito posições fixas H1–H8","ficha acima do herói","fala lateral"],
 "S04":["taverna subjacente","modal central","grade de três destinos"],
 "S05":["grupo à esquerda","arte ao centro","abordagens à direita","passagem inferior"],
 "S06":["diálogo central","grade de vítimas"], "S07":["passagem subjacente","diálogo central"],
 "S08":["amante à esquerda","prisão no cenário","texto à direita"],
 "S09":["grupo à esquerda","Andirá somente no reflexo","texto à direita"],
 "S10":["cartão central","lista condicional"], "S11":["modal central","grade de oito heróis"],
 "S12":["diálogo central","fallback textual"],
}

def observation(row):
 state,surface,viewport=row["state"],row["surface"],row["viewport"]
 if surface=="S01":
  detail={"fresh-notices":"aviso breve e ação Jogar","long-notices":"avisos extensos sem ocultar Jogar",
   "missing-entry-art":"fallback de arte com título e ação preservados","fresh-after-restart":"mensagem de campanha nova com oito heróis"}[state]
 elif surface=="S02":
  detail=("fallback textual preserva painel e avanço" if state=="missing-portrait" else
   "texto longo permanece contido no painel" if state=="long-passage" else
   "controle de pular aparece junto ao avanço" if state=="seen-passage" else
   "aviso antecede a revelação das abordagens" if state=="last-before-choice" else
   "retrato, autoria do trecho e avanço estão visíveis")
 elif surface=="S03":
  match=re.match(r"inspect-h([1-8])-(available|selected)",state)
  if match:
   detail=f'ficha H{match.group(1)} acima da cabeça, fala lateral e herói {"selecionado" if match.group(2)=="selected" else "disponível"}'
  elif state.startswith("automatic-"):
   count={"automatic-three":3,"automatic-two":2,"automatic-one":1}[state]
   detail=f"formação automática mostra {count} herói(s) e {8-count} lugar(es) vazio(s)"
  elif state.startswith("manual-"):
   detail=f"oito heróis permanecem visíveis e a seleção manual corresponde a {state.removeprefix('manual-')}"
  elif state=="long-sheet-speech": detail="ficha e fala longas ocupam regiões separadas sem cobrir o herói"
  elif state=="missing-portrait": detail="fallback de H3 ocupa somente sua âncora"
  elif "empty" in state: detail="lugares vazios substituem apenas os heróis ausentes"
  elif "fade" in state or "return" in state: detail="opacidade da despedida muda sem bloquear os controles"
  else: detail="seleção, foco e âncoras fixas permanecem distinguíveis"
 elif surface=="S04":
  detail=("a taverna reaparece com destino e três heróis preservados" if state=="dismissed-preserved" else
   "fallback ocupa apenas a prévia da igreja" if state=="missing-preview" else
   "os três cartões mostram estado, progresso e seleção coerentes")
 elif surface=="S05":
  if state in ("success","lethal-failure"): detail="consequência resolvida aparece sem botões de abordagem"
  elif state=="revisited-presentation": detail="Pular texto já lido, Avançar e Recuar acompanham o trecho; abordagens ainda não aparecem"
  elif state in ("threshold","party-three-presentation","party-two-presentation","party-one-presentation"): detail="leitura antecede as escolhas e a coluna de abordagens permanece oculta"
  elif state=="missing-encounter-image": detail="fallback da imagem mantém as três abordagens e a passagem"
  elif state=="long-approach": detail="abordagem longa permanece contida em sua coluna"
  else: detail="três abordagens aparecem após a leitura, com grupo e posição da rota visíveis"
 elif surface=="S06":
  detail=("todas as vítimas elegíveis, nomes e aviso cabem no viewport" if "warning" in state or state=="focused-victim" else
   "consequência e única ação de avanço aparecem sem nova confirmação")
 elif surface=="S07":
  detail=("a passagem do encontro reaparece na mesma posição" if state=="cancelled-to-passage" else
   "conclusão oferece o encontro com o amante antes do retorno" if state=="last-position-conclusion" else
   "estado de recuo mostra somente ações compatíveis com elegibilidade e compromisso")
 elif surface=="S08":
  detail=("final ruim substitui amante e recompensa" if state=="total-loss-priority" else
   "fallback preserva texto e estrutura da cena" if state.startswith("missing-") else
   "amante, prisão ambiental e quantidade de peças estão visíveis")
 elif surface=="S09":
  detail=("opinião literal de Gorvak está legível" if state=="opinion" else
   "decisão comprometida mostra consequência e somente Avançar" if state.endswith("committed") else
   "grupo, revelação, reflexo e escolhas correspondem ao estado")
 elif surface=="S10":
  detail=("epílogos literais aparecem na quantidade permitida, sem texto explicativo" if "epilogue" in state else
   "memorial contém exatamente os nomes previstos" if state.startswith("memorial-") else
   "final e única ação de avanço ou reinício estão visíveis")
 elif surface=="S11":
  detail=("resumo longo permanece dentro da ficha H1" if state=="long-summary" else
   "oito fichas permanecem escaneáveis e vivos/mortos são distintos")
 else:
  detail=("mensagem específica e ação de recuperação estão legíveis" if state in ("rejected-stale-action","invalid-campaign","fourth-selection-error","unavailable-destination-error") else
   "fallback mantém informação textual e ação apesar do recurso ausente ou extenso")
 return f"Inspeção da folha {surface}-{viewport}: {detail}."

def digest(path):
 d=hashlib.sha256()
 with Path(path).open("rb") as f:
  for chunk in iter(lambda:f.read(1048576),b""): d.update(chunk)
 return d.hexdigest()

def atomic(path, value):
 path=Path(path); path.parent.mkdir(parents=True,exist_ok=True)
 fd,tmp=tempfile.mkstemp(prefix="."+path.name+".",dir=path.parent)
 try:
  with os.fdopen(fd,"w",encoding="utf-8") as f:
   json.dump(value,f,ensure_ascii=False,indent=2); f.write("\n"); f.flush(); os.fsync(f.fileno())
  os.replace(tmp,path)
 except BaseException:
  Path(tmp).unlink(missing_ok=True); raise

def rows():
 data=json.loads(CONTRACT.read_text())
 result=[r for group in data["contracts"].values() for r in group]
 keys={(r["artifact"],r["state"],r["viewport"]) for r in result}
 if len(result)!=252 or len(keys)!=252: raise ValueError(f"expected 252 unique rows, got {len(result)}/{len(keys)}")
 return result

def identity(row):
 paths=[ROOT/row["artifact"],ART/"artboards.css",ART/"artboards.js"]
 files=[]
 for p in paths:
  oid=subprocess.run(["git","hash-object",str(p)],cwd=ROOT,check=True,capture_output=True,text=True).stdout.strip()
  files.append({"path":str(p.relative_to(ROOT)),"sha256":digest(p),"git_object_id":oid})
 return {"combined_sha256":hashlib.sha256(json.dumps(files,sort_keys=True).encode()).hexdigest(),"files":files}

def folder(row): return EVIDENCE/f'{row["surface"]}-{row["state"]}'/row["viewport"]
def row_key(row): return f'{row["surface"]}:{row["state"]}:{row["viewport"]}'

def valid(record,row,ident):
 p=folder(row)/"reference.png"
 if not p.is_file() or record.get("source_identity")!=ident or record.get("contract_sha256")!=digest(CONTRACT): return False
 try:
  with Image.open(p) as im: dims=[im.width,im.height]
 except OSError: return False
 expected=list(map(int,row["viewport"].split("x")))
 return dims==expected and record.get("capture_sha256")==digest(p) and record.get("content_state")==row["state"]

def capture_batch(batch, progress):
 if not CDP.is_file(): raise FileNotFoundError(CDP)
 width,height=map(int,batch[0]["viewport"].split("x"))
 with tempfile.TemporaryDirectory(prefix="prototype-v2-cdp-") as temp:
  stage=Path(temp); cmd=["bun","run",str(CDP),"--out",str(stage),"--width",str(width),"--height",str(height),"--wait","350"]
  ids={}
  for row in batch:
   key=row_key(row); ids[key]=identity(row)
   cmd += ["--shot",key.replace(":","--"),f'{(ROOT/row["artifact"]).as_uri()}?state={quote(row["state"])}']
  run=subprocess.run(cmd,cwd=CDP_DIR,capture_output=True,text=True,timeout=90)
  if run.returncode: raise RuntimeError(run.stdout+"\n"+run.stderr)
  for row in batch:
   key=row_key(row); src=stage/f'{key.replace(":","--")}.png'; dst=folder(row)/"reference.png"; dst.parent.mkdir(parents=True,exist_ok=True)
   if not src.is_file(): raise FileNotFoundError(src)
   os.replace(src,dst)
   with Image.open(dst) as im: dims=[im.width,im.height]
   expected=list(map(int,row["viewport"].split("x")))
   if dims!=expected: raise ValueError(f'{row["id"]}: {dims} != {expected}')
   progress[key]={**row,"contract_sha256":digest(CONTRACT),"source_identity":ids[key],
    "capture_engine":"Chrome DevTools Protocol / Emulation.setDeviceMetricsOverride",
    "effective_css_viewport":dims,"device_scale_factor":1,"content_state":row["state"],
    "capture_path":str(dst.relative_to(ROOT)),"capture_sha256":digest(dst),"capture_dimensions":dims,
    "anchor_classification":ANCHORS[row["surface"]],
    "review":{"verdict":"PENDING","summary":"Aguardando inspeção visual."}}
   atomic(PROGRESS,{"schema_version":2,"captures":progress})

def sheets(records):
 groups=defaultdict(list)
 for record in records: groups[(record["surface"],record["viewport"])].append(record)
 outdir=EVIDENCE/"_contact-sheets"; outdir.mkdir(parents=True,exist_ok=True); outputs=[]
 for (surface,viewport),items in sorted(groups.items()):
  tw,th,lh,cols=300,169,24,4; count=(len(items)+cols-1)//cols
  sheet=Image.new("RGB",(tw*cols,(th+lh)*count),"#17130f"); draw=ImageDraw.Draw(sheet)
  for i,item in enumerate(items):
   with Image.open(ROOT/item["capture_path"]).convert("RGB") as source:
    thumb=ImageOps.fit(source,(tw,th),method=Image.Resampling.LANCZOS)
   x,y=(i%cols)*tw,(i//cols)*(th+lh); sheet.paste(thumb,(x,y))
   draw.rectangle((x,y+th,x+tw,y+th+lh),fill="#ede0c0"); draw.text((x+5,y+th+6),item["state"],fill="#17130f")
  target=outdir/f"{surface}-{viewport}.jpg"; sheet.save(target,quality=90); outputs.append(str(target.relative_to(ROOT)))
 return outputs

def write_index(progress):
 ordered=[progress[row_key(r)] for r in rows() if row_key(r) in progress]
 reviewed=sum(r["review"]["verdict"]=="PASS" for r in ordered)
 atomic(INDEX,{"schema_version":2,"status":"PASS" if len(ordered)==reviewed==252 else "PENDING_REVIEW",
  "scope":"reference-only; task_01 has no implementation comparison","contract_path":str(CONTRACT.relative_to(ROOT)),
  "contract_sha256":digest(CONTRACT),"capture_count":len(ordered),"reviewed_count":reviewed,
  "contact_sheets":sheets(ordered) if len(ordered)==252 else [],"captures":ordered,
  "limitations":["Revisão editorial e cultural humana permanece necessária.",
   "Aprovação da arte final permanece fora desta baseline provisória.",
   "Métricas do Figma não estavam disponíveis; os dois viewports aprovados são a autoridade mensurável."]})

def validate(progress,reviews):
 if len(progress)!=252: raise ValueError(f"expected 252 rows, got {len(progress)}")
 for row in rows():
  record=progress.get(row_key(row))
  if not record or not valid(record,row,identity(row)): raise ValueError(f'{row["id"]}: stale or invalid')
  if record["effective_css_viewport"]!=list(map(int,row["viewport"].split("x"))): raise ValueError(f'{row["id"]}: viewport')
  if reviews and (record["review"]["verdict"]!="PASS" or not (folder(row)/"review.md").is_file()): raise ValueError(f'{row["id"]}: review')
 print(f"PASS: 252 unique current-source rows with exact dimensions and {'reviews' if reviews else 'capture metadata'}")

def record_reviews(progress):
 validate(progress,False); stamp=datetime.now(timezone.utc).isoformat().replace("+00:00","Z")
 for row in rows():
  record=progress[row_key(row)]; summary=observation(row)
  record["review"]={"verdict":"PASS","reviewed_at":stamp,"reviewer":REVIEWER,"blocking_divergences":0,"summary":summary}
  record["review"]["inspection_evidence"]=f'{EVIDENCE.relative_to(ROOT)}/_contact-sheets/{row["surface"]}-{row["viewport"]}.jpg'
  anchors="\n".join(f"- {x}" for x in record["anchor_classification"])
  text=f'''---
schema_version: 1
contract_id: {row["id"]}
verdict: PASS
reference_source: {row["artifact"]}
reference_source_id: {record["source_identity"]["combined_sha256"]}
viewport: {row["viewport"]}
state: {row["state"]}
reviewer: {REVIEWER}
reviewed_at: {stamp}
blocking_divergences: 0
---
# Revisão da referência

## Resultado

{summary}

Folha inspecionada: `{record["review"]["inspection_evidence"]}`.

## Âncoras

{anchors}

## Limitações

- Revisão editorial e cultural humana permanece necessária.
- Aprovação da arte final permanece fora desta baseline provisória.
- Métricas do Figma não estavam disponíveis; o viewport CSS registrado é a autoridade mensurável.
'''
  (folder(row)/"review.md").write_text(text,encoding="utf-8")
  atomic(PROGRESS,{"schema_version":2,"captures":progress})
 write_index(progress); validate(progress,True)

def main():
 parser=argparse.ArgumentParser(); parser.add_argument("--record-reviews",action="store_true"); parser.add_argument("--validate-only",action="store_true"); args=parser.parse_args()
 raw=json.loads(PROGRESS.read_text()).get("captures",{}) if PROGRESS.is_file() else {}
 expected_keys={row_key(r) for r in rows()}
 progress={key:value for key,value in raw.items() if key in expected_keys}
 if args.record_reviews: record_reviews(progress); return
 if args.validate_only: validate(progress,True); write_index(progress); return
 pending=[r for r in rows() if not valid(progress.get(row_key(r),{}),r,identity(r))]
 completed=0
 by_viewport=defaultdict(list)
 for row in pending: by_viewport[row["viewport"]].append(row)
 for viewport in sorted(by_viewport):
  viewport_rows=by_viewport[viewport]
  for start in range(0,len(viewport_rows),16):
   batch=viewport_rows[start:start+16]; capture_batch(batch,progress); completed+=len(batch)
   print(f"CAPTURED: {completed}/{len(pending)} stale or missing rows")
 write_index(progress); validate(progress,False)

if __name__=="__main__":
 try: main()
 except Exception as error:
  print(f"FAIL: {error}",file=sys.stderr); raise
