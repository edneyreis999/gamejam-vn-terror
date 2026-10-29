"""Archive exactly the manifest allowlist; exclude backups, staging and game files."""
from pathlib import Path
import hashlib,json,zipfile
root=Path(__file__).resolve().parents[1]
manifest=json.loads((root/'manifest.json').read_text(encoding='utf-8'))
target=root/'dist'/('coreto-rpg-maker-theme-'+manifest['version']+'.zip')
target.parent.mkdir(exist_ok=True)
with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED,compresslevel=9) as archive:
    for relative,digest in manifest['files'].items():
        file=(root/relative).resolve()
        if not file.is_relative_to(root) or file.is_symlink() or hashlib.sha256(file.read_bytes()).hexdigest()!=digest:
            raise RuntimeError('Unsafe or changed file: '+relative)
        info=zipfile.ZipInfo('rpg-maker-theme/'+relative,date_time=(2026,10,29,0,0,0))
        info.compress_type=zipfile.ZIP_DEFLATED
        info.external_attr=0o100644 << 16
        archive.writestr(info,file.read_bytes(),compresslevel=9)
    info=zipfile.ZipInfo('rpg-maker-theme/manifest.json',date_time=(2026,10,29,0,0,0))
    info.compress_type=zipfile.ZIP_DEFLATED
    info.external_attr=0o100644 << 16
    archive.writestr(info,(root/'manifest.json').read_bytes(),compresslevel=9)
with zipfile.ZipFile(target) as archive:
    if archive.testzip(): raise RuntimeError('Archive integrity failed')
digest=hashlib.sha256(target.read_bytes()).hexdigest()
target.with_suffix('.zip.sha256').write_text(digest+'  '+target.name+'\n',encoding='utf-8')
print(json.dumps({'archive':str(target),'sha256':digest,'files':len(manifest['files'])+1}))
