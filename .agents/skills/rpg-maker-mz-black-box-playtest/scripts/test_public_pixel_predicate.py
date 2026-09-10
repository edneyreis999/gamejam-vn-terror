import io
import json
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest
from types import SimpleNamespace

from PIL import Image

from public_pixel_predicate import PublicPixelPredicate, PublicPixelReadiness, digest


def png(image):
    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    return buffer.getvalue()


class PublicPixelPredicateTests(unittest.TestCase):
    comparison = "bright-ink-dark-support/v1"

    def setUp(self):
        self.temp = TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.full = Image.new("RGB", (64, 48), "green")
        for x in (4, 16, 28):
            for dx in range(8):
                for y in range(4, 16):
                    self.full.putpixel((x + dx, y), (255, 255, 255))
        for y in range(30, 38):
            for x in range(28, 36):
                self.full.putpixel((x, y), (255, 255, 255))
        reference = png(self.full)
        (self.root / "reference.png").write_bytes(reference)
        self.contract = {"schema": "public-pixel-observation/v1",
                         "comparison": self.comparison,
                         "geometry": {"width": 64, "height": 48, "dpr": 1},
                         "transactions": {"MESSAGE": {"reference": "reference.png",
                             "referenceSha256": digest(reference), "regions": [
                                 {"name": "whole-content", "role": "content", "x": 4, "y": 4, "width": 32, "height": 12},
                                 {"name": "marker", "role": "continuation", "x": 28, "y": 30, "width": 8, "height": 8}]}}}
        self.path = self.root / "contract.json"
        self.write_contract()

    def write_contract(self):
        self.path.write_text(json.dumps(self.contract))

    def test_full_content_and_marker_match(self):
        self.assertEqual(PublicPixelPredicate(self.path, "MESSAGE").match(png(self.full))["status"], "MATCH")

    def test_partial_wrong_or_clipped_content_and_absent_marker_reject(self):
        predicate = PublicPixelPredicate(self.path, "MESSAGE")
        for point in [(28, 4), (16, 10), (35, 15), (31, 34)]:
            with self.subTest(point=point):
                changed = self.full.copy()
                changed.putpixel(point, (0, 128, 0))
                self.assertEqual(predicate.match(png(changed))["status"], "NOT_MATCH")

    def test_only_declared_public_regions_participate(self):
        changed = self.full.copy()
        changed.putpixel((60, 45), (255, 0, 0))
        self.assertEqual(PublicPixelPredicate(self.path, "MESSAGE").match(png(changed))["status"], "MATCH")

    def test_extra_ink_rejects_but_unrelated_background_color_does_not(self):
        predicate = PublicPixelPredicate(self.path, "MESSAGE")
        changed = self.full.copy()
        changed.putpixel((12, 8), (150, 0, 0))
        self.assertEqual(predicate.match(png(changed))["status"], "MATCH")
        changed.putpixel((12, 8), (255, 255, 255))
        self.assertEqual(predicate.match(png(changed))["status"], "NOT_MATCH")

    def test_dark_outline_support_follows_comparison_scope(self):
        self.full.putpixel((12, 8), (0, 0, 0))
        raw = png(self.full)
        (self.root / "reference.png").write_bytes(raw)
        self.contract["transactions"]["MESSAGE"]["referenceSha256"] = digest(raw)
        self.write_contract()
        predicate = PublicPixelPredicate(self.path, "MESSAGE")
        self.full.putpixel((12, 8), (0, 128, 0))
        expected = "MATCH" if self.comparison == "white-core-content/v1" else "NOT_MATCH"
        self.assertEqual(predicate.match(png(self.full))["status"], expected)

    def test_blank_reference_region_is_invalid(self):
        raw = png(Image.new("RGB", (64, 48)))
        (self.root / "reference.png").write_bytes(raw)
        self.contract["transactions"]["MESSAGE"]["referenceSha256"] = digest(raw)
        self.write_contract()
        with self.assertRaisesRegex(ValueError, "visible foreground"):
            PublicPixelPredicate(self.path, "MESSAGE")

    def test_native_geometry_transparency_and_corrupt_png_reject(self):
        predicate = PublicPixelPredicate(self.path, "MESSAGE")
        for raw in [png(Image.new("RGB", (128, 96))), png(Image.new("RGBA", (64, 48))), b"broken png"]:
            with self.subTest(length=len(raw)), self.assertRaises((ValueError, OSError)):
                predicate.match(raw)

    def test_reference_hash_is_bound(self):
        (self.root / "reference.png").write_bytes(png(Image.new("RGB", (64, 48))))
        with self.assertRaisesRegex(ValueError, "reference hash"):
            PublicPixelPredicate(self.path, "MESSAGE")

    def test_regions_cannot_be_empty_missing_marker_or_outside_frame(self):
        regions = self.contract["transactions"]["MESSAGE"]["regions"]
        for invalid in [[], regions[:1], [regions[0], {**regions[1], "width": 100}]]:
            with self.subTest(regions=invalid):
                self.contract["transactions"]["MESSAGE"]["regions"] = invalid
                self.write_contract()
                with self.assertRaises(ValueError):
                    PublicPixelPredicate(self.path, "MESSAGE")

    def test_reference_cannot_escape_public_contract_directory(self):
        self.contract["transactions"]["MESSAGE"]["reference"] = "../reference.png"
        self.write_contract()
        with self.assertRaisesRegex(ValueError, "public contract directory"):
            PublicPixelPredicate(self.path, "MESSAGE")

    def test_marker_cannot_mix_regions_from_different_observed_variants(self):
        regions = self.contract["transactions"]["MESSAGE"]["regions"]
        regions.append({**regions[1], "name": "second-marker-part"})
        self.write_contract()
        with self.assertRaisesRegex(ValueError, "One whole continuation"):
            PublicPixelPredicate(self.path, "MESSAGE")


class WhiteCoreContentTests(PublicPixelPredicateTests):
    comparison = "white-core-content/v1"

    def test_antialias_background_change_keeps_complete_content(self):
        self.full.putpixel((12, 8), (202, 205, 202))
        raw = png(self.full)
        (self.root / "reference.png").write_bytes(raw)
        self.contract["transactions"]["MESSAGE"]["referenceSha256"] = digest(raw)
        self.write_contract()
        predicate = PublicPixelPredicate(self.path, "MESSAGE")
        self.full.putpixel((12, 8), (201, 200, 199))
        self.assertEqual(predicate.match(png(self.full))["status"], "MATCH")

    def test_no_clear_glyph_core_is_an_invalid_reference(self):
        for y in range(4, 16):
            for x in range(4, 36):
                self.full.putpixel((x, y), (230, 230, 230))
        raw = png(self.full)
        (self.root / "reference.png").write_bytes(raw)
        self.contract["transactions"]["MESSAGE"]["referenceSha256"] = digest(raw)
        self.write_contract()
        with self.assertRaisesRegex(ValueError, "clear white core"):
            PublicPixelPredicate(self.path, "MESSAGE")

    def test_marker_keeps_exact_classifier_and_dark_support(self):
        self.full.putpixel((30, 34), (0, 0, 0))
        raw = png(self.full)
        (self.root / "reference.png").write_bytes(raw)
        self.contract["transactions"]["MESSAGE"]["referenceSha256"] = digest(raw)
        self.write_contract()
        predicate = PublicPixelPredicate(self.path, "MESSAGE")
        self.full.putpixel((30, 34), (0, 128, 0))
        self.assertEqual(predicate.match(png(self.full))["status"], "NOT_MATCH")

    def test_uniform_white_content_is_an_invalid_reference(self):
        for y in range(4, 16):
            for x in range(4, 36):
                self.full.putpixel((x, y), (255, 255, 255))
        raw = png(self.full)
        (self.root / "reference.png").write_bytes(raw)
        self.contract["transactions"]["MESSAGE"]["referenceSha256"] = digest(raw)
        self.write_contract()
        with self.assertRaisesRegex(ValueError, "clear non-ink"):
            PublicPixelPredicate(self.path, "MESSAGE")

    def test_ambiguous_flood_cannot_replace_visible_text(self):
        predicate = PublicPixelPredicate(self.path, "MESSAGE")
        for y in range(4, 16):
            for x in range(4, 36):
                self.full.putpixel((x, y), (230, 230, 230))
        self.assertEqual(predicate.match(png(self.full))["status"], "NOT_MATCH")

    def test_each_glyph_requires_its_own_current_anchors(self):
        predicate = PublicPixelPredicate(self.path, "MESSAGE")
        for start in (4, 16, 28):
            with self.subTest(start=start):
                changed = self.full.copy()
                for y in range(4, 16):
                    for x in range(start, start + 8):
                        changed.putpixel((x, y), (230, 230, 230))
                self.assertEqual(predicate.match(png(changed))["status"], "NOT_MATCH")

    def test_reference_without_opaque_anchor_is_invalid(self):
        for y in range(4, 16):
            for x in range(4, 36):
                if self.full.getpixel((x, y)) == (255, 255, 255):
                    self.full.putpixel((x, y), (250, 250, 250))
        raw = png(self.full)
        (self.root / "reference.png").write_bytes(raw)
        self.contract["transactions"]["MESSAGE"]["referenceSha256"] = digest(raw)
        self.write_contract()
        with self.assertRaisesRegex(ValueError, "opaque glyph anchor"):
            PublicPixelPredicate(self.path, "MESSAGE")

    def test_composition_over_bounded_background_preserves_fixed_white_fill(self):
        predicate = PublicPixelPredicate(self.path, "MESSAGE")
        region = {"x": 0, "y": 0, "width": 1, "height": 1}
        backgrounds = [(r, g, b) for r in (0, 168) for g in (0, 168) for b in (0, 168)]
        for alpha in range(257):
            masks = []
            for background in backgrounds:
                rgb = tuple(round(255 * alpha / 256 + channel * (1 - alpha / 256)) for channel in background)
                masks.append(predicate.masks(Image.new("RGB", (1, 1), rgb), region))
            for expected in masks:
                for current in masks:
                    self.assertTrue(predicate.region_matches(expected, current, "content"), (alpha, expected, current))


class PublicPixelReadinessTests(unittest.TestCase):
    def setUp(self):
        self.upper, self.lower = digest(b"upper"), digest(b"lower")
        self.predicate = SimpleNamespace(
            target={"readiness": {"type": "marker-extremes", "states": [self.upper, self.lower]}},
            regions=[{"role": "continuation"}], expected=[[{"bright": b"upper"}, {"bright": b"lower"}]])

    def sample(self, state=None, content=True):
        return {"status": "MATCH" if state and content else "NOT_MATCH",
                "regions": [{"role": "content", "matches": content}],
                "continuationStates": [state] if state else []}

    def test_one_visible_or_repeated_phase_is_not_ready(self):
        gate = PublicPixelReadiness(self.predicate)
        for sample in [self.sample(self.upper), self.sample(self.upper)]:
            self.assertFalse(gate.observe(sample)["ready"])
        self.assertTrue(gate.observe(self.sample(self.lower))["ready"])

    def test_either_order_of_extremes_is_valid(self):
        gate = PublicPixelReadiness(self.predicate)
        self.assertFalse(gate.observe(self.sample(self.lower))["ready"])
        self.assertTrue(gate.observe(self.sample(self.upper))["ready"])

    def test_changed_content_discards_previous_phase_proof(self):
        gate = PublicPixelReadiness(self.predicate)
        gate.observe(self.sample(self.upper))
        gate.observe(self.sample(content=False))
        self.assertFalse(gate.observe(self.sample(self.lower))["ready"])
        self.assertTrue(gate.observe(self.sample(self.upper))["ready"])

    def test_unknown_or_absent_marker_discards_previous_phase_proof(self):
        gate = PublicPixelReadiness(self.predicate)
        gate.observe(self.sample(self.upper))
        gate.observe(self.sample())
        self.assertFalse(gate.observe(self.sample(self.lower))["ready"])

    def test_identical_or_unobserved_extremes_are_invalid(self):
        for states in [[self.upper, self.upper], [self.upper, "unknown"]]:
            with self.subTest(states=states):
                self.predicate.target["readiness"]["states"] = states
                with self.assertRaisesRegex(ValueError, "Two distinct observed"):
                    PublicPixelReadiness(self.predicate)


if __name__ == "__main__":
    unittest.main()
