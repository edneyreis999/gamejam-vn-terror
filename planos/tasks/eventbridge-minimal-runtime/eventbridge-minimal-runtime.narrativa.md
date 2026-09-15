---
status: approved
owner: Narrativa
---

# Narrative authorship contract

Current expansion: see the [2026-09-14 map-authorship amendment](#map-authorship-expansion--2026-09-14) for the authorized task19–29 scope and retirement contract.

This contract owns RQ-002–RQ-005, RQ-010 and the text portion of RQ-016 in the [spec](spec.md). João/Maria can edit and review native content; the user may approve this contract. This is not approval of the existing provisional writing.

Each scene map exposes a named event that leads to its native content. The tavern has one entry per hero, with explicit calls to profile/conversation/selection/group-full content as appropriate. In Gorvak's Conversar branch, Chamar evento comum directly selects and runs the conversation. Shared native interaction events may contain these branches; the named map entry exposes the actual path used in play. Encounter maps expose description, approaches, success/failure and death content. Council, endings, memorial and epilogues use the same pattern. Public names remain reachable through Configuração do jogo; content references are edited in their native calls, without a second Bridge association.

Split the current compound Common Events before replacing Present. Preserve the order and conditions of the existing prose, including the profile followed by conversation, successful-selection response and group-full response. Calling a conversation must not execute a farewell, opinion or epilogue merely because they formerly shared the same Common Event. Re-read returns to the current choices without changing campaign facts.

Native Show Text, Show Choices, Show Scrolling Text and installed message/bust commands remain the editing surface. The Bridge does not require @status, @source, speaker markers, approval fields, specific comment names or an allowed-command list. Narrative authority and review remain in the GDD and human work; they are not game-start prerequisites. Preserve provisional/confirmed status in documentation without demanding that the author duplicate it in runtime commands.

Content associations use the native Call Common Event selector, not a Bridge dispatcher or an editorial identifier grammar. To replace a conversation, select the replacement Common Event in that native call. The author may edit text, add native commands and refactor a callable unit without running a terminal revision or synchronizing a configuration registry. Keep meaningful completion at the end of the narrative unit through its explicit wrapper; observational content does not complete the campaign passage.

AUTO and FAST are available for units already read in the current campaign. Use completed-unit granularity, not a cross-campaign history or an inference that partly displayed text was read. Campaign passage status comes from the domain; observational conversations record completed reading in native UI state without completing a campaign step. New standalone Common Events have distinct native reading identities; no Bridge content registry is needed. Reaching unseen content or a decision stops the preceding automation permission. The old instant text-skip action is removed.

Credits preserve the current approved attribution content, now authored as rolling-text lines at speed 2. Adding names changes the natural rolling duration. The old ten-second timer must not truncate them. The UI contract owns native acceleration and the skip control.

Review evidence: a real editor walkthrough from each map family into its content, plus before/after content comparison and representative runtime reading. Mechanical test output does not approve wording, cultural representation or credit attribution. Required sensors are in [verification](verification.md).

## Adopted branch amendment — ADR-G001 / ADR-G002

**Architecture and organization accepted on 2026-09-14 under [ADR-G001](../../../docs/adrs/adr-g001-mapas-de-interacao-dos-herois.md) and [ADR-G002](../../../docs/adrs/adr-g002-remocao-de-atalhos-editoriais.md).** The [original experiment](adrs/adr-005.md) is historical. Other human and creative judgments retain their separate status in verification.md. Move only H1's existing profile, conversation, selection and full-party feedback into Map037. Preserve the authored profile, conversation and response lines, public identity facts and provisional editorial status. Dynamic group membership/count now appears in the hero menu; the former generic status footer is not repeated in Conversar, as recorded in ADR-G001. New navigation labels are functional PT-BR controls; no new story or conversation branches are introduced. See [ADR-005](adrs/adr-005.md), spec EX-001–006 and verification EXV-001–004.


## Map-authorship expansion — 2026-09-14

**Execution authorized; current implementation and sensor status are in [the task graph](tasks.md) and [verification](verification.md).** [ADR-006](adrs/adr-006.md), [spec MA-001–011](spec.md#map-authorship-expansion--2026-09-14) and [verification MAV-001–014](verification.md#map-authorship-expansion--2026-09-14) supersede conflicting earlier location/entry assumptions for this scope. Previous delivery and creative approvals retain their own scope.

MA-001/002/004–008/011 move existing authored material into the maps where it is played. H2–H8 preserve profile, conversation, selection and full-party wording; the former generic group-status footer follows Gorvak's accepted menu placement. Prologue, eight epilogues, three endings, Council (including irati.03), opinions and all16 encounter descriptions/approaches/results preserve passage order, eligibility and existing editorial status. This is no authorization to rewrite provisional text, invent new scenes or expose competencies.

The real map event is the editing entry for migrated content. Do not retain a second editable Common Event copy after its consumers move. Keep shared memorial death inscriptions while CE347 uses them, and preserve semantic passage identities independently of their file/list location. Technical content comparison and played edit-to-map evidence precede human authoring review; the short MZ demonstration and per-family verification belong to MAV-013/014. Historical CE-edit recipes are superseded only for migrated bodies.
