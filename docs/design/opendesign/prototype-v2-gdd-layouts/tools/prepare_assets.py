#!/usr/bin/env python3
"""Create pixel-preserving transparent presentation copies of opaque portraits."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[5]
SOURCE_DIR = ROOT / "plano/gerar-spac-att-prototipo/imagens/personagens"
TARGET_DIR = ROOT / "prototype/assets/characters"
PORTRAITS = ("ivai", "florai", "perola", "andira")


def is_background(pixel: tuple[int, int, int, int]) -> bool:
    red, green, blue, _ = pixel
    return min(red, green, blue) >= 232 and max(red, green, blue) - min(red, green, blue) <= 22


def connected_background(image: Image.Image) -> Image.Image:
    width, height = image.size
    pixels = image.load()
    visited = bytearray(width * height)
    queue: deque[tuple[int, int]] = deque()

    def enqueue(x: int, y: int) -> None:
        index = y * width + x
        if visited[index] or not is_background(pixels[x, y]):
            return
        visited[index] = 1
        queue.append((x, y))

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)
    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        if x:
            enqueue(x - 1, y)
        if x + 1 < width:
            enqueue(x + 1, y)
        if y:
            enqueue(x, y - 1)
        if y + 1 < height:
            enqueue(x, y + 1)

    subject = Image.new("L", image.size, 255)
    subject_pixels = subject.load()
    for y in range(height):
        row = y * width
        for x in range(width):
            if visited[row + x]:
                subject_pixels[x, y] = 0

    return subject.filter(ImageFilter.GaussianBlur(0.45))


def main() -> None:
    TARGET_DIR.mkdir(parents=True, exist_ok=True)
    for slug in PORTRAITS:
        source = Image.open(SOURCE_DIR / f"{slug}.png").convert("RGBA")
        source.putalpha(connected_background(source))
        destination = TARGET_DIR / f"{slug}.png"
        source.save(destination, optimize=True)
        print(f"prepared {destination.relative_to(ROOT)} {source.width}x{source.height} RGBA")


if __name__ == "__main__":
    main()
