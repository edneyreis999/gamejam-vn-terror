"""Read-only comparison of public PNG regions against a frozen reference."""
import argparse
import hashlib
import io
import json
from pathlib import Path
import sys

from PIL import Image


def digest(data):
    return hashlib.sha256(data).hexdigest()


def decode_png(data, geometry):
    with Image.open(io.BytesIO(data)) as image:
        if image.format != "PNG" or image.size != (geometry["width"], geometry["height"]):
            raise ValueError("Expected native PNG geometry")
        image.load()
        rgba = image.convert("RGBA")
        if rgba.getextrema()[3] != (255, 255):
            raise ValueError("Expected opaque public screenshot")
        return rgba


class PublicPixelPredicate:
    def __init__(self, contract_path, transaction):
        self.path = Path(contract_path).resolve()
        raw = self.path.read_bytes()
        self.sha256 = digest(raw)
        contract = json.loads(raw)
        if contract.get("schema") != "public-pixel-observation/v1":
            raise ValueError("Unsupported public pixel contract")
        self.comparison = contract.get("comparison")
        if self.comparison not in ("bright-ink-dark-support/v1", "white-core-content/v1"):
            raise ValueError("Unsupported frozen pixel comparison")
        self.geometry = contract["geometry"]
        for key in ("width", "height"):
            if type(self.geometry[key]) is not int or not 1 <= self.geometry[key] <= 8192:
                raise ValueError("Invalid native geometry")
        if self.geometry["dpr"] != 1:
            raise ValueError("Only native DPR1 is contracted")
        self.target = contract["transactions"][transaction]
        self.reference = self.load_reference(self.target)
        self.regions = self.target["regions"]
        if not self.regions or {r["role"] for r in self.regions} != {"content", "continuation"}:
            raise ValueError("Full content and continuation regions are required")
        if sum(region["role"] == "continuation" for region in self.regions) != 1:
            raise ValueError("One whole continuation region is required")
        names = set()
        for region in self.regions:
            if not isinstance(region["name"], str) or not region["name"] or region["name"] in names:
                raise ValueError("Region names must be unique")
            names.add(region["name"])
            x, y, width, height = (region[key] for key in ("x", "y", "width", "height"))
            if any(type(value) is not int for value in (x, y, width, height)) or not (
                x >= 0 and y >= 0 and width > 0 and height > 0
                and x + width <= self.geometry["width"] and y + height <= self.geometry["height"]
            ):
                raise ValueError("Region exceeds native image")
        markers = [self.load_reference(binding) for binding in self.target.get("continuationReferences", [])]
        self.expected = [
            [self.masks(image, region) for image in (markers or [self.reference])]
            if region["role"] == "continuation" else [self.masks(self.reference, region)]
            for region in self.regions
        ]
        if any(not any(mask["bright"]) for variants in self.expected for mask in variants):
            raise ValueError("Every frozen region needs visible foreground")
        if self.comparison == "white-core-content/v1" and any(
            not any(variants[0]["clearInk"]) or not any(variants[0]["clearNonInk"])
            for region, variants in zip(self.regions, self.expected)
            if region["role"] == "content"
        ):
            raise ValueError("Every content region needs a clear white core and clear non-ink")
        if self.comparison == "white-core-content/v1" and any(
            not any(variants[0]["opaqueInk"]) for region, variants in zip(self.regions, self.expected)
            if region["role"] == "content"
        ):
            raise ValueError("Every content region needs an opaque glyph anchor")

    def load_reference(self, binding):
        reference = (self.path.parent / binding["reference"]).resolve()
        if not reference.is_relative_to(self.path.parent):
            raise ValueError("Reference must belong to the public contract directory")
        reference_bytes = reference.read_bytes()
        if digest(reference_bytes) != binding["referenceSha256"]:
            raise ValueError("Frozen reference hash differs")
        return decode_png(reference_bytes, self.geometry)

    @staticmethod
    def masks(image, region):
        x, y = region["x"], region["y"]
        width, height = region["width"], region["height"]
        raw = image.crop((x, y, x + width, y + height)).convert("RGB").tobytes()
        colors = list(zip(raw[0::3], raw[1::3], raw[2::3]))
        bright = bytes(min(rgb) >= 200 and max(rgb) - min(rgb) <= 30 for rgb in colors)
        dark = bytes(max(rgb) <= 100 for rgb in colors)
        support = bytearray(len(bright))
        for index, ink in enumerate(bright):
            if not ink:
                continue
            px, py = index % width, index // width
            for ny in range(max(0, py - 1), min(height, py + 2)):
                for nx in range(max(0, px - 1), min(width, px + 2)):
                    neighbor = ny * width + nx
                    if dark[neighbor] and not bright[neighbor]:
                        support[neighbor] = 1
        clear_ink = bytes(min(rgb) >= 245 and max(rgb) - min(rgb) <= 10 for rgb in colors)
        clear_non_ink = bytes(min(rgb) <= 220 or max(rgb) - min(rgb) >= 35 for rgb in colors)
        opaque_ink = bytes(min(rgb) >= 254 and max(rgb) - min(rgb) <= 1 for rgb in colors)
        return {"bright": bright, "dark": dark, "support": bytes(support),
                "clearInk": clear_ink, "clearNonInk": clear_non_ink, "opaqueInk": opaque_ink}

    def region_matches(self, expected, current, role):
        if self.comparison == "white-core-content/v1" and role == "content":
            return (not any(a and b for a, b in zip(expected["clearInk"], current["clearNonInk"]))
                    and not any(a and b for a, b in zip(expected["clearNonInk"], current["clearInk"]))
                    and all(not required or actual for required, actual in zip(expected["opaqueInk"], current["clearInk"])))
        return current["bright"] == expected["bright"] and all(
            not required or actual for required, actual in zip(expected["support"], current["dark"]))

    def match(self, raw):
        image = decode_png(raw, self.geometry)
        regions = []
        continuation_states = []
        for region, variants in zip(self.regions, self.expected):
            current = self.masks(image, region)
            matching = [expected for expected in variants if self.region_matches(expected, current, region["role"])]
            matches = bool(matching)
            if region["role"] == "continuation":
                continuation_states = sorted({digest(mask["bright"]) for mask in matching})
            regions.append({"name": region["name"], "role": region["role"], "matches": matches})
        return {"status": "MATCH" if all(r["matches"] for r in regions) else "NOT_MATCH",
                "imageSha256": digest(raw), "contractSha256": self.sha256, "regions": regions,
                "continuationStates": continuation_states}


class PublicPixelReadiness:
    def __init__(self, predicate):
        config = predicate.target.get("readiness", {"type": "single-frame"})
        self.kind = config["type"]
        self.seen = set()
        self.required = set()
        if self.kind == "marker-extremes":
            self.required = set(config["states"])
            available = {digest(mask["bright"]) for region, variants in zip(predicate.regions, predicate.expected)
                         if region["role"] == "continuation" for mask in variants}
            if len(config["states"]) != 2 or len(self.required) != 2 or not self.required <= available:
                raise ValueError("Two distinct observed continuation states are required")
        elif self.kind != "single-frame":
            raise ValueError("Unknown public readiness condition")

    def observe(self, match):
        if self.kind == "single-frame":
            return {"ready": match["status"] == "MATCH", "type": self.kind}
        content = [region for region in match["regions"] if region["role"] == "content"]
        if not content or not all(region["matches"] for region in content) or not match["continuationStates"]:
            self.seen.clear()
        else:
            self.seen.update(set(match["continuationStates"]) & self.required)
        return {"ready": match["status"] == "MATCH" and self.seen == self.required,
                "type": self.kind, "seenStates": sorted(self.seen)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--contract", required=True)
    parser.add_argument("--transaction", required=True)
    parser.add_argument("--image", required=True)
    args = parser.parse_args()
    try:
        result = PublicPixelPredicate(args.contract, args.transaction).match(Path(args.image).read_bytes())
    except (ValueError, KeyError, TypeError, OSError) as error:
        print(json.dumps({"status": "INVALID", "error": str(error)}), file=sys.stderr)
        return 2
    print(json.dumps(result))
    return 0 if result["status"] == "MATCH" else 1


if __name__ == "__main__":
    raise SystemExit(main())
