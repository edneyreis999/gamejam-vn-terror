---
status: decided
owner: Edney (V-005)
---

# Editorial packet — English localization

Filled in task-09 after L15. Edney's decision is recorded in
`verification.md` → Human acceptance. Technical results and the agent's
report support the decision; they do not replace it.

## 1. What to review

- The whole table: `rpg-maker/The Dryland Drowned/Languages.tsv` (451 keys),
  read side by side with `source-map.md` (scene, speaker, context).
- Terms: `glossary.md`. Rules: `translator-guide.md`.

## 2. Text treatment (D-021) — every use

From `translator-guide.md` → Treated keys:

- `<I>` for written or remembered words: Irati's note
  (`campaign.irati_02_01.narrator`), Draska's plaque (`epilogue.draska.4`).
- `<I>` replacing “ ” quotes: seven farewells (Gorvak's has no quotes in the
  source, so none), Rheed's council narration and closures, Ivaí's two
  council lines.
- The only animated beat: Andirá's line (`council.andira`),
  `\EFFECT<SoftShiver>`; stops when Text Effects is OFF.
- No automatic name color (D-022). No casing effects used.

## 3. Static title (D-019, D-022)

The browser tab, desktop window and save metadata read “The Dryland
Drowned” in both languages. In-game credits show the localized pair
(“Afogados em Terra Seca” / “The Dryland Drowned”).

## 4. Decisions flagged for Edney

- `ui.save.latest`: PT reads `NOVO!` (source was `NEW!`).
- `ui.options.audio.me`: EN “Jingles” for “Temas”.
- Death passages (CE266–281) start in lowercase in PT; EN starts with a
  capital.
- Two epilogue blocks end without a period in PT (Griznik 3, Bimbren 3).
- Memorial causes use singular “their” in EN (B1, B3, B7).
- `sacrifice.warning` and `title.warning`: EN adds intentional `<br>`.
- 22 placeholder images still carry “PLACEHOLDER” marks (art delivery,
  outside this spec) — `image-text-audit.md`.
- The existing test suite needs its title helpers updated (task-07).

## 5. L15 findings and dispositions

Report: [l15-report.md](l15-report.md) (read-only corpus review, D-024). 16 findings (1 high, 9 medium, 6 low); 12 fixed in the English column, 4 source-level issues left for Edney: F03 (A1 “soot”), F10 (A5 “tool”), F12 (B8 “closed” mark), F14 (closing narration as stage directions). Full table in the report's Dispositions section.

## 6. Captures

(task-09: language option, one scene in both languages, one English choice
panel — from real play.)

## 7. Decision

Accepted by Edney on 2026-09-29 (D-025): “aahh já ia me esquecendo. essa spec está aprovada. pode executar o final verify.” Open follow-ups: L15 F03, F10, F12, F14 (source text).
