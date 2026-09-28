---
status: approved
stage: approved
technical_approved_under: D-025
technical_approved_on: 2026-09-24
owner: Narrativa
editorial_approved_under: D-016
technical_approved: true
---

# Narrative transcription and reading boundaries

Owns transcription, attribution and reading boundaries for RQ-002/003/007/008/010/011 in [spec.md](spec.md). D-016 approved the presented prose; D-025 approves this native integration contract. It does not commission another rewrite. UI, art, audio and campaign transitions have their own contracts.

## Source-to-event inventory

| Content | Authoritative wording | Native destination and boundary |
| --- | --- | --- |
| Complete prologue | The nine quoted blocks in RQ-003 | Map002/event001. Keep `prologue.rheed.01`–`.06`; distribute the six older-Rheed blocks across the first three semantic passages in order, two blocks per passage. Preserve `.04`–`.06` for Ivaí's promise, young Rheed's question and Ivaí's final reply. Complete a passage after its last native message, never after only its first box. |
| Preparation introduction | Exact Ivaí line in RQ-002 | CE039, before the first enabled destination selection of each preparation. Player advances the final box; record completion for that preparation. This is an observational reading, not a route reward or departure. |
| Eight heroes' introductions, opinions, farewells, selection and full-party lines | [Falas de cada herói](../../../docs/narrativa/herois/Falas-de-cada-herói.md), approved hash in the spec | Maps037–044 introductions/selection/full-party branches; existing Council opinion owners and CE282–289 farewell owners. Preserve hero identity H1–H8 and each category's context. Use the source's full text rather than selecting only short excerpts. |
| Failure before selection | [Approved consequences](proposed-consequences.md) | Map015 `result.B1-2.failure.01` and Map021 `result.B7-2.failure.01`: danger without a preselected victim. Preserve each semantic passage ID. |
| Death after farewell | The same approved consequences | CE266–281: A1–A8, then B1–B8. Resolve the committed victim from `pendingOutcome.victimId`; never inspect the first remaining party member to supply the name. |
| Initial-route closing | Existing piece/lover/older-Rheed/Irati/map-revelation sequence | Preserve the authored sequence through CE352/353, relevant discovery events and CE302. The added return is visual only, after the whole sequence; no new travel dialogue or repeated reward. |
| Epilogues | Existing PR #15 prose, preserved in Maps029–036 and the corresponding [hero sheets](../../../docs/narrativa/herois/) | Keep words, punctuation, order and living-climax eligibility. Change attribution to older Rheed and presentation to black/lower native dialogue; do not rewrite third-person text as new first-person dialogue. |
| Tavern deceased list and final cemetery | RQ-005/D-020; existing memorial content | CE117 shows only complete deceased names, or the approved empty message. CE338–345 and final memorial context keep their existing complete prose. These are different readers. |

H1–H8 order is Gorvak, Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith and Draska. Preserve public spelling and accents from the source, including Rheed and Ivaí even where an asset filename uses `Reed` or `ivai`.

## Transcription rules

Native Show Text commands own player-facing prose. Message-window wrapping and additional boxes may change line breaks, not source words. Speaker labels in the spec are authoring guidance; do not print them as extra story paragraphs. Compare reconstructed semantic passages with approved sources after removing only layout control codes and box boundaries. Do not normalize punctuation, silently shorten inscriptions or replace an entire paragraph with an approximate summary.

Keep the prologue's established facts: Irati was Ivaí's mother and died two years earlier; Rheed was his helper. The final reply ends the scene. New title art, captions, narrator reactions or transitions must not introduce spoilers about Ivaí, the curse, the medallion or the plan.

For successful hero addition, the domain action succeeds first, then the source selection acknowledgement is read, then the event transfers to the tavern. Conversation, removal and rejection keep their existing loops. The full-party branch cannot mutate the party or take the successful-return branch. Automatic formation with one to three survivors remains governed by campaign rules.

For sacrifice, the order is danger → choice → permanent death/checkpoint → that victim's farewell → named consequence → existing continuation. Reflow must not move harm before choice, duplicate the original harm after the new consequence, repeat the death action or discard the pending victim before all dependent readings finish. Unaffected atmospheric descriptions keep their wording.

## Reading identities and controls

Retain existing campaign passage IDs, H1–H8 mappings and reserved hero-observation IDs 82–113. All boxes in one semantic passage share one completion boundary. HIDE restores without advancing; FAST remains restricted to previously read text; ordinary advance remains player controlled.

The new preparation introduction needs a distinct stable observation identity allocated from a checked free native Common Event ID. Use the existing `ObservationBegin`/`ObservationComplete` convention with its owning event identity, rather than reusing a hero's reserved ID. Its persistent global seen-text record permits FAST on a later reading; it does **not** decide whether the current preparation must show the line. That separate campaign fact and its save behavior are specified in the [programming contract](prototype-feedback-refinement.programacao.md).

Continue resumes the saved interpreter and saved reading facts. Completion not contained in the last successful save may be read again under D-014. No extra automatic save is introduced for prologue reflow, selection acknowledgement or the map introduction. This increment does not promise migration of old serialized event lists to new wording.

## Acceptance

V-003/007/008/010 own source fidelity and attributed readings; V-002/011 own introduction and route-return sequencing. Static comparison covers all affected heroes and sixteen consequences. Representative directed journeys must show the actual speaker, complete player-paced messages and selected victim. The existing editorial approval is retained; transcription, native control behavior and rendered readability remain unverified.
