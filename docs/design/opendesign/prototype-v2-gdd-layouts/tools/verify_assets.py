#!/usr/bin/env python3
"""Verify the packaged prototype-v2 art and emit its reproducible inventory."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from PIL import Image, ImageChops, ImageOps


ROOT = Path(__file__).resolve().parents[5]
ASSETS = ROOT / "prototype/assets"
EVIDENCE = ROOT / ".compozy/tasks/prototype-v2-gdd-layouts/evidence"

HEROES = {
    "gorvak.png": "Gorvak.png",
    "elowen.png": "Elowen.png",
    "griznik.png": "Griznik.png",
    "seraphina.png": "Seraphina.png",
    "bimbren.png": "Bimbren.png",
    "liora.png": "Liora.png",
    "vaelith.png": "Vaelith.png",
    "draska.png": "Draska.png",
}
CHARACTERS = ("ivai.png", "florai.png", "perola.png", "andira.png")
DESTINATIONS = (
    "caminho-da-igreja.png",
    "parque-das-aguas-assombradas.png",
    "vilarejo-partido.png",
)
SCENES = {
    "taverna.png": "plano/gerar-spac-att-prototipo/imagens/taverna-brief.png",
    "igreja-interior.png": "plano/gerar-spac-att-prototipo/imagens/cenarios/igreja-interior.png",
    "parque-figueira.png": "plano/gerar-spac-att-prototipo/imagens/cenarios/parque-figueira.png",
    "casa-do-conselho.png": "plano/gerar-spac-att-prototipo/imagens/cenarios/casa-do-conselho.png",
}
NPC_BACKGROUNDS = {
    "ivai.png": "taverna.png",
    "florai.png": "parque-figueira.png",
    "perola.png": "igreja-interior.png",
    "andira.png": "casa-do-conselho.png",
}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def describe(category: str, packaged: Path, source: Path) -> dict[str, object]:
    with Image.open(packaged) as output, Image.open(source) as original:
        output.load()
        original.load()
        alpha = output.getchannel("A") if "A" in output.getbands() else None
        alpha_extrema = list(alpha.getextrema()) if alpha else None
        rgb_unchanged = ImageChops.difference(
            output.convert("RGB"), original.convert("RGB")
        ).getbbox() is None
        record = {
            "category": category,
            "runtime_path": str(packaged.relative_to(ROOT)),
            "source_path": str(source.relative_to(ROOT)),
            "width": output.width,
            "height": output.height,
            "mode": output.mode,
            "alpha_extrema": alpha_extrema,
            "sha256": sha256(packaged),
            "source_sha256": sha256(source),
            "byte_identical_to_source": sha256(packaged) == sha256(source),
            "rgb_identical_to_source": rgb_unchanged,
            "status": "provisional prototype baseline",
        }
        if category in {"hero", "character"} and alpha_extrema != [0, 255]:
            raise ValueError(f"{packaged}: portrait does not contain transparent and opaque pixels")
        if category == "character" and not rgb_unchanged:
            raise ValueError(f"{packaged}: transparent derivative changed source RGB pixels")
        return record


def overlay_preview(portrait_path: Path, background_path: Path, output_path: Path) -> None:
    with Image.open(background_path).convert("RGB") as background:
        canvas = ImageOps.fit(background, (1280, 720), method=Image.Resampling.LANCZOS).convert("RGBA")
    with Image.open(portrait_path).convert("RGBA") as portrait:
        portrait.thumbnail((540, 650), Image.Resampling.LANCZOS)
        x = (canvas.width - portrait.width) // 2
        y = canvas.height - portrait.height
        canvas.alpha_composite(portrait, (x, y))
    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(output_path, quality=91)


def main() -> None:
    records: list[dict[str, object]] = []
    for packaged_name, source_name in HEROES.items():
        records.append(describe(
            "hero",
            ASSETS / "heroes" / packaged_name,
            ROOT / "plano/gerar-spac-att-prototipo/imagens/herois" / source_name,
        ))
    for name in CHARACTERS:
        source = ROOT / "plano/gerar-spac-att-prototipo/imagens/personagens" / name
        packaged = ASSETS / "characters" / name
        records.append(describe("character", packaged, source))
        overlay_preview(
            packaged,
            ASSETS / "scenes" / NPC_BACKGROUNDS[name],
            EVIDENCE / "npc-over-background" / name.replace(".png", ".jpg"),
        )
    for name in DESTINATIONS:
        records.append(describe(
            "destination",
            ASSETS / "destinations" / name,
            ROOT / "plano/gerar-spac-att-prototipo/imagens/destinos" / name,
        ))
    for name, source_name in SCENES.items():
        records.append(describe("scene", ASSETS / "scenes" / name, ROOT / source_name))
    for prefix in ("a", "b"):
        for number in range(1, 9):
            name = f"{prefix}{number}.jpg"
            records.append(describe("encounter", ASSETS / "encounters" / name, ASSETS / "encounters" / name))

    if len(records) != 35:
        raise ValueError(f"expected 35 packaged assets, found {len(records)}")
    counts = {category: sum(row["category"] == category for row in records) for category in (
        "hero", "character", "destination", "scene", "encounter"
    )}
    expected = {"hero": 8, "character": 4, "destination": 3, "scene": 4, "encounter": 16}
    if counts != expected:
        raise ValueError(f"unexpected category counts: {counts}")

    result = {
        "schema_version": 1,
        "status": "PASS",
        "asset_count": len(records),
        "counts": counts,
        "npc_over_background_evidence": [
            str((EVIDENCE / "npc-over-background" / name.replace(".png", ".jpg")).relative_to(ROOT))
            for name in CHARACTERS
        ],
        "assets": records,
    }
    inventory = ASSETS / "asset-inventory.json"
    inventory.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"PASS: 35 assets ({counts})")
    print("PASS: 12 portraits contain transparent and opaque pixels")
    print("PASS: 4 NPC derivatives preserve source RGB pixels")
    print(f"WROTE: {inventory.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
