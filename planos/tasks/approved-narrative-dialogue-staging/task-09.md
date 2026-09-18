---
id: "09"
status: completed
depends_on: ["08"]
verification_ids: []
---

# Task 09 — Plan the integrated QA cycle

## Outcome

One executable QA plan maps the approved scenarios, variants, fixture evidence and remaining judgments to resumable runs in the existing durable QA tree.

## Authority

- Activate `rpg-maker-mz-qa-report` and follow `rpg-maker-mz-tasks-tail-qa-pair`.
- [spec.md](spec.md), all five discipline contracts and [verification.md](verification.md): RQ-001–012, V-001–008 and S-01–11.
- [Shared execution contract](tasks.md#shared-execution-contract), [QA tree guidance](../../../docs/qa/README.md), [team/tracker workflow](../../../docs/_memory/trello-workflow.md) and [native zoom exclusion](../../../docs/adrs/adr-g003-excluir-testes-de-zoom-nativo.md).

## Scope

- Dependencies: 08 is the sole implementation leaf and transitively requires 01–07; verify every implementation task's completion before planning. No alternate QA pair exists for this increment.
- Implementation/data/assets: none. Planning does not alter the game, generate fixtures by changing production state or execute a playtest.
- Tests/fixture readiness: consume 01–08's canonical results, fixture entry instructions, observability proof, actual paths and dependency hashes. Return a missing fixture to its producing task rather than silently assigning setup to a future player.
- QA/docs: update existing MZ journeys/scenarios listed below; create this increment's guide `docs/qa/guides/approved-narrative-dialogue-staging.md` and a matching charter in `docs/qa/charters/` only for the executable run plan. Preserve historical verdicts with dated scope. Update QA README's current-cycle pointer and deduplicate `docs/qa/bugs/` as appropriate.
- Tracker impact: read current bug dispositions and map any in-scope gap to its discipline locally. Do not create remote cards/messages or a separate QA backlog.
- Delete targets: none.

## Checklist

- [ ] Read the complete graph, every execution note, verification and affected contracts. Confirm V-001/002/003/008 technical results and inventory any failed, stale or missing evidence. Planning completion is not a game PASS.
- [ ] Update the existing journeys J-mz-complete-campaign, J-mz-qa-accessibility, J-mz-recovery-export and J-mz-creative-review, preserving scope-specific historical results.
- [ ] Map S-01–11 into existing FOR-mz-formation-roster, ENC-mz-encounter-sacrifice-retreat, CAM-mz-discovery-closing, ART-mz-visual-audio-runtime, ACC-mz-hide-keyboard-qa and LOC-mz-session-recovery-export scenarios. Update ART-mz-human-approval only for applicable integrated-output judgments, without reopening accepted source prose/art or deferred refinement.
- [ ] Prepare the resumable lots in task 10 with explicit entry, player steps, expected observations, required variants, evidence to retain, dependency invalidators, failure handling and completion checkpoints. Keep S-03/S-06/S-09 fixture work distinctly labeled and reuse fresh evidence.
- [ ] Plan at least one uninterrupted fresh campaign from opening through both closures, Council, one ending and credits. Plan the opposite initial route order, separate immutable children of an earned final-choice parent for both choices, and an independent earned total-loss trajectory.
- [ ] Plan two current-version campaign files and recorded payload/index write completion before save capture. Preserve origin/profile and file identity; no injected seed/roster/progress/read history and no save edits.
- [ ] Cover 1280×720 normal and 1920×1080 reduced with actual MZ logical area recorded; mouse and keyboard across runs; all eight hero main/select/full-party branches, every changed dialogue consumer, all 30 results, eight epilogues and legal Council slot recipes. Use existing reviewed fixture captures for exhaustive rendering where the contract selects fixtures.
- [ ] Plan native audio-buffer checks separately from actual listening/recording, identify the available listener/capture method, and record judgments honestly. Include four sliders/mute/restore, initial-only applause, temporal cuts, FAST seen boundary and ending precedence.
- [ ] Reconcile historical bugs at their current dispositions: shared framing has a later correction; prison visibility requires actual observation; advance-indicator clipping informs long text; accepted memorial wording stays deferred. Do not relabel existing issues as new or import unrelated backlog work.
- [ ] Preserve the spec's devlog capture: old Rheed/black → young tavern, route closure, whole epilogue with HIDE, audible transition and actual native event in editor.
- [ ] Validate every scenario/variant has a run or equivalent retained evidence, exact launch/test commands and teardown instructions. Link the guide/charter and readiness verdict from this task and verification; leave all gameplay verdicts unobserved until 10 executes.

## Validation

Execution mode/reference: planning only. Carry the approved modes verbatim: S-01/02/04/05/07/08 directed-browser; S-03 native-engine integration; S-06 pure-domain plus native-engine; S-09 native-engine plus visual inspection; S-10 directed-browser plus native save integration; S-11 directed control, native audio integration and actual listening.

Invalidates/reuses: consume the frozen candidate and equivalent technical results from 08. Re-plan only variants affected by new prose, art, rules, plugin/default, input, audio, event-list or save-fixture changes. Historical PR captures supply source provenance only. Required evidence stays pending when its sensor is unavailable.

| Verification ID | Command or sensor | Expected observable | Evidence path |
| --- | --- | --- | --- |
| QA plan readiness; no V-ID primary | Scenario/lot/variant-to-evidence coverage review and relative-link check | No missing scenario, invented PASS, duplicate primary sensor or new scope | This task, the guide/charter and verification.md |
| V-004/005/006/007 planning support | Review task 10 entry points and owned commands | Visual, controls, heard audio and genuine Continue can actually be observed | Guide's entry/readiness tables |

Use `npm start` only during later execution, after reading local-game-run.md; canonical tests remain the commands in tasks.md. The plan must state port/profile preservation and shutdown of only owned processes. Keep raw run evidence under `docs/qa/evidence/approved-narrative-dialogue-staging/<run-id>/`; no raw evidence is produced merely by writing this plan.

## Execution Notes

Pending. The QA guide, charter and scenario updates will be authored when this task executes against the implemented candidate. No remote publication or commit is authorized here.


### Preparação reconciliada — 2026-09-18

Por ADR-G004, preparação em paralelo à verificação08; não é liberação do candidato. [Guia](../../../docs/qa/guides/approved-narrative-dialogue-staging.md) e [charter](../../../docs/qa/charters/CH-approved-narrative-dialogue-staging.md) mapeiam os onze cenários e seis lotes, sensores, casos canônicos, archives, invalidação e teardown. Prontidão dirigida depende dos casos focados aplicáveis; agregado08 conserva dono/veredito e qualquer falha reabre os lotes afetados.

### Prontidão do plano

Plano completo para execução dos lotes independentes, com agregado08 explicitamente em andamento e prisão visual FAIL. Onze cenários, sete cenários duráveis, quatro jornadas e charter ligados. O caso usa Chrome/FFmpeg instalados, WAV e vídeo; escuta real e captura do editor ainda têm sensor pendente. ADR-G004 mantém08 em execução enquanto10 coleta na cópia congelada em18727. Não existe afirmação de jogo pronto.
