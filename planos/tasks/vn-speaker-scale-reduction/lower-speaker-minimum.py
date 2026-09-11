"""Apply the focused parameter-domain change to an explicit plugin path."""
import pathlib
import sys

target = pathlib.Path(sys.argv[1])
source = target.read_text()
replacements = [
    (" * @param SpeakerScale\n * @text Escala do falante (%)\n * @parent BustFocus\n * @type number\n * @min 100", " * @param SpeakerScale\n * @text Escala do falante (%)\n * @parent BustFocus\n * @type number\n * @min 1"),
    (" * @desc Tamanho ao falar, relativo à escala base. 100 preserva a base; 110 amplia em 10%.", " * @desc Tamanho ao falar, relativo à escala base. 80 reduz em 20%; 100 preserva; 110 amplia em 10%."),
    ("['SpeakerScale', 'Escala do falante (%)', 100, 100, 150]", "['SpeakerScale', 'Escala do falante (%)', 100, 1, 150]"),
]
for before, after in replacements:
    if source.count(before) != 1:
        raise SystemExit(f"Unexpected source in {target}: {before!r}")
    source = source.replace(before, after)
target.write_text(source)
assert target.read_text() == source
print(target)
