---
status: approved
approved_on: 2026-09-25
owner: Narrativa
product_approved_on: 2026-09-25
---

# Copy authority and player moments

Owns RQ-001–007/009 from [spec.md](spec.md). D-001–004 approve the input and exact exceptions below; this contract records their implementation boundary and was approved with the complete set under D-006 on 2026-09-25. Player copy remains PT-BR. [Source analysis](source-analysis.md) records the only 17 source files, their hashes and native destinations.

## Source interpretation

| Source element | Destination and treatment |
| --- | --- |
| Trap title | Existing public encounter identity in CE004; all names already match. Do not add a new narrated title. |
| Two opening paragraphs and question | First description and reread; no Markdown markers. Preserve paragraph and question order. |
| Three numbered approaches | Three choice sentences, same order, numbering stripped. |
| Success headings | Editorial association guides; do not display them or replace the approach sentences with them. |
| Three success paragraphs | Matching successful approach bodies. B5 repeats number 1 in all success headings; map by semantic meaning and source order, not the repeated number. |
| General “Falha” | Complete death-context body after selected hero's farewell; strip only the editorial label. Never substitute it for a pre-choice causal failure. |
| Hero “Apresentação” | Six utterances per hero, beginning with Ivaí; remove speaker prefixes from body and use native speaker metadata. |
| Selection / full party | One source utterance each, in the matching validated-result branch. |
| “Despedida” | One fixed utterance per hero at sacrifice. Preserve seven already matching word sequences; use Gorvak's updated source. |
| “Opinião” | Two paragraphs in the same hero's Council intervention, not two votes or separate eligibility passes. |

The eight old identification lines and eight old third-person profiles are removed, not rewritten or relocated. Do not add prose to explicitly enumerate race, pronouns or profession. Normal speaker names, art and menu status remain. Hero sheets and the differently named hero anthology are historical/subordinate for these five speech moments; no epilogue or character-mechanics change is authorized.

## Approved pre-choice failure replacements — D-004

These are the exact six replacements; all other 42 pre-choice failures remain identical to the intake baseline except presentation-only wrapping.

| Passage | Exact PT-BR copy |
| --- | --- |
| `result.A1-1.failure.01` | O grupo não consegue manter a janela aberta. O redemoinho lança cacos pelo corredor e bloqueia a saída. |
| `result.A5-1.failure.01` | A grade emperra, e a mula continua solta. Ela atravessa o corredor arrastando as correntes em brasa e bloqueia a saída com fogo. |
| `result.A5-3.failure.01` | A água segue por um canal que não alcança o corredor. O fogo continua se espalhando e bloqueia a saída. |
| `result.A7-2.failure.01` | Uma corrente cede durante o balanço. O grupo cai entre os sacos, e os ganchos fecham o caminho até a saída. |
| `result.B3-3.failure.01` | O barro seca antes de o grupo alcançar a saída. Sem sentir o contato com a terra úmida, os heróis voltam a seguir as luzes e se perdem nas lembranças. |
| `result.B6-3.failure.01` | Os nós se apertam antes que o grupo consiga soltá-los. A canção se intensifica, e a sensação de afogamento impede a travessia. |

This preserves the window in A1, the creature/cistern in A5, hanging chains in A7, memory danger in B3 and the usable descent rope in B6. The general fatal blocks remain the user's source text without further rewriting. The established B1 sequence still allows any eligible hero to say their name before losing their voice; no new timer or eligibility rule exists.

## Approved memorial inscriptions — D-003

| Native owner | Exact PT-BR copy |
| --- | --- |
| CE125, `memorial_cause.A1` | Desapareceu no redemoinho enquanto mantinha a janela aberta. |
| CE161, `memorial_cause.A5` | Morreu nas chamas ao manter o registro de água aberto para os outros passarem. |

Allow native line breaks only; do not shorten the inscriptions. Retain the actual saved public route/encounter alongside them.

## Editorial status

The user accepted these exact exceptions and the source-selection/placement scope. Runtime comfort and visual fit have not been accepted or tested. No new placeholder prose is authorized. If a later source edit, conflict or overflow requires different words, show the affected text for a scoped decision rather than treating technical approval as editorial permission.
