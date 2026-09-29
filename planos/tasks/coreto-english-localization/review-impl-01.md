---
kind: implementation deep review (inline; no independent native reviewer)
date: 2026-09-29
base: d17d886 (localization_baseline)
head: 92dc14f + uncommitted tree; Languages.tsv sha256 979202a9ae625ba7…
verdict: SHIP
---

# Implementation review 01 — Coreto English localization

## Scope

69 tracked files changed against d17d886 plus 10 new files (the table, the
task docs, the QA guide and report). Changed paths, by owner:
`rpg-maker/The Dryland Drowned/` (plugins.js parameters, System.json,
CommonEvents.json, Map002/007–023/025–027/029–044, index.html,
package.json, Languages.tsv), `rpg-maker/README.md`, `AGENTS.md`, the GDD,
`docs/qa/*`, and `planos/tasks/coreto-english-localization/*`.

## Lenses and verdicts

| Lens | Paths | Verdict and evidence |
| --- | --- | --- |
| Plugin parameters, registry, load order | `js/plugins.js` | Pass. Parsed comparison: same order and status; exactly 15 parameter paths changed, each recorded with before/after/reason (tasks 01/02). Coreto sources and bundles unchanged. |
| Event structure, interpreter, choices | Maps, CommonEvents | Pass. Every page and Common Event matches d17d886 in codes, indents, 101 headers, choice counts and tags, 402 indexes, 122 targets, 357 plugin/command/IDs. Choice control tags stay after the key; PictureChoices hides the window (observed in QA). |
| Data authority and domain | CE004 names, 122 literals, Dryland plugins | Pass. Names and statuses are display-only; the catalog validates them only as non-empty strings; rules use IDs. `V186` carries IDs only as identity input. |
| Localization pipeline | Languages.tsv, `\V` payloads | Pass. 451 keys, all referenced, none missing; tags match in both columns; no tab, straight quote, `\n`, BOM or CR. Key-valued variables stay in event wrappers (resolved once between variable passes). |
| Save compatibility | variables in saves | Pass within the spec's promise: new saves hold unresolved keys (language-neutral; L12 observed). Old saves may keep PT literals in V153/V176–178/V152 until reassigned; no migration is promised (spec). |
| Presentation | pictures, memorial, credits, Andirá | Pass after task-09 fixes (SoftShiver, four shorter causes). Residual: the memorial fix is proven by equivalence, not reobserved. |
| Focus memory | Dryland_Presentation ChoiceFocus | Residual, accepted by spec: focus is remembered by rendered name, so it can reset after a language switch. No loss of usable focus was observed. No patch (D-009). |
| Tests and QA evidence | rpg-maker/tests, docs/qa | Pass with documented gaps: 80 existing tests fail on stale PT preconditions or assertions and one environment import; none shows a real regression, but they no longer cover their behavior. Runtime QA reduced by D-024. |
| Task/spec parity | planos, AGENTS.md, GDD, README | Pass. Supersession recorded in GDD §1.1/§26, ADR-002, AGENTS.md; README workflow added; treated keys, glossary and source map match the table (Underwater remains only in historical notes that say it was superseded). |

## Findings

None blocking. Residual risks carried to Edney's packet and the final
verdict: D-024 cuts, memorial fix not reobserved, test suite needs its title
helpers updated, 22 placeholder images, 4 source-level copy issues (L15).

## Verdict

`SHIP` for the current tree, subject to Edney's editorial decision (V-005).
No commit or remote publication was made.
