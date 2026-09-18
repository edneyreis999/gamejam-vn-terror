# PR #18 — Trap-success prose integration analysis

Inspected on 2026-09-17 for the existing `approved-narrative-dialogue-staging` spec. This source expansion reopens the product interview; it is not implementation or a new spec.

## Source and actual delivery

[PR #18](https://github.com/edneyreis999/gamejam-vn-terror/pull/18), authored by `joaootoreis-ops`, was open at `2f91f94610ea27671d2bfeb9b5e4bf16abe718de`, based on `3b5730495302e8676785e994421b3adfb4b82078`. No comments, reviews or checks were reported.

The diff adds 16 extensionless files under `docs/narrativa/armadilhas`, with 150 total text lines. Ten files contain a title, a success section, three simplified approach headings and three success paragraphs each: 30 supplied results. B3–B8 are zero-byte catalogue markers. The PR contains no game events, code, new illustrations, introductory descriptions, failures or death prose.

Its stated scope excludes writing B3–B8, native integration, final editorial review and playtest. The before/after claim that the catalogue was empty concerns this documentation, not the playable game's existing trap passages.

## Native ownership and mapping

Read-only JSON inspection confirms three existing success branches per populated source encounter. For each row below, source sections 1–3 correspond semantically and in order to approach IDs `<encounter>-1`, `-2`, `-3`, with passage IDs `result.<encounter>-<index>.success.01`.

| Encounter | Source file under `docs/narrativa/armadilhas/` | Native map | Supplied results |
| --- | --- | --- | --- |
| A1 | `a1-O-Redemoinho-do-Saci-Engarrafado` | Map007 | 3 |
| A2 | `a2-A-Trilha-de-Pés-Virados` | Map008 | 3 |
| A3 | `a3-O-Pilão-da-Cuca` | Map009 | 3 |
| A4 | `a4-A-Jaula-do-Mapinguari` | Map010 | 3 |
| A5 | `a5-A-Cavalariça-da-Mula-sem-Cabeça` | Map011 | 3 |
| A6 | `a6-O-Pomar-do-Corpo-Seco` | Map012 | 3 |
| A7 | `a7-O-Depósito-do-Homem-do-Saco` | Map013 | 3 |
| A8 | `a8-O-Telhado-da-Pisadeira` | Map014 | 3 |
| B1 | `b1-O-Assobio-da-Matinta` | Map015 | 3 |
| B2 | `b2-A-Procissão-das-Almas` | Map016 | 3 |

Maps005/006 organize the two encounter families; they do not own A1/A2. Maps017–022 own B3–B8 and must keep their existing playable content. Do not copy empty source files into result passages or generate the missing 18 success replacements as an implicit expansion.

Current outcomes are concise. For example, A1-1 currently says “A comporta cede, e o redemoinho muda de direção.” The new paragraph describes the blocked airflow, returning whirlwinds, falling glass and open exit. Longer text may need multiple native message boxes within one existing outcome completion, without additional decisions or rewards.

## Product distinction: results versus choice clues

All 30 source headings differ from their current native choice labels. The headings can identify the existing outcome without automatically becoming the new visible choices. Examples:

| Approach | Current player choice | Source heading |
| --- | --- | --- |
| A1-3 | Seguir a fuligem e os cacos para localizar o olho imóvel do redemoinho | Encontrar o centro parado do redemoinho |
| A5-3 | Identificar o ciclo de pressão e abrir a válvula entre duas descargas | Abrir a válvula no momento certo |
| B1-1 | Comparar o assobio com os ecos e localizar a fresta que responde antes do som | Encontrar a fresta de onde vem o assobio |

Replacing labels also changes the information available before choosing: the shorter headings omit some observed clues or technical mechanisms. Canonical GDD §§10, 12 and 14 require meaningful, distinct approaches and preserved hidden competency mappings. The source rework does not change those mappings.

**Confirmed in D-017:** integrate the 30 success paragraphs and retain current player-facing labels. The simplified headings remain source identifiers. The user explicitly directed that untouched text stay as it is and that consistency refinement be left for later, even if some prose does not make sense yet. Do not turn that accepted limitation into a rewrite or an editorial delivery gate; see the [trap-integration ADR](adrs/adr-002-trap-prose-integration-boundary.md).

## Preserved boundaries and downstream work

- Keep the existing three approaches, stable IDs, competency pairs, pools, randomization, lethal-failure rule, victim selection and progression. No domain-rule change is required by the supplied prose.
- Keep descriptions, failures/deaths, B3–B8 and assets outside the supplied replacements. The empty markers are not runtime placeholders to ship.
- Preserve native lower success text over the current encounter background without a bust or a separate success illustration. The new paragraphs have no “Narrador” speaker label; PR #18 does not itself authorize a present-day Rheed cut after each approach. Existing past-scene visual/audio rules continue.
- Native choices contain PictureChoices annotations and auxiliary “Rever descrição”/“Recuar” entries. Preserve their labels and functions under D-017 rather than copy catalogue headings over the choice structure.
- The new passages require explicit identity/read-history decisions during technical design. Longer bodies must complete once at their actual end; historical one-line results are not proof of new pacing or save compatibility.
- Existing encounter/content tests include competency-result mapping and same-art/no-bust success presentation. Extend their owned invariants as appropriate during implementation; no duplicate suite is chosen here.

No changed source path overlaps PRs #15, #16, #17 or #19. The integration still shares reading controls, temporal art/audio and test consumers with those contributions. Native events remain the playable text authority; catalogue integration must not create a second runtime loader.

## Evidence and limits

Read all ten populated files and confirmed the six empty files, inspected native choice labels and success branches, and consulted relevant GDD rules and existing test definitions. No merge, commit, runtime mutation, test execution or gameplay occurred. The observed prose describes group/impersonal outcomes rather than named hero variants and does not add competency UI labels; this static reading is not editorial acceptance or playtest evidence.

Subsequent user acceptance authorizes the supplied wording as a prototype baseline and defers its refinement; it does not claim a performed final editorial review or runtime validation.
