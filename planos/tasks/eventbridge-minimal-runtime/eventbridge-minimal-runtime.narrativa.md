---
status: approved
owner: Narrativa
---

# Narrative authorship contract

This contract owns RQ-002–RQ-005, RQ-010 and the text portion of RQ-016 in the [spec](spec.md). João/Maria can edit and review native content; the user may approve this contract. This is not approval of the existing provisional writing.

Each scene map exposes a named event that leads to its native content. The tavern has one entry per hero, with explicit calls to profile/conversation/selection/group-full content as appropriate. In Gorvak's Conversar branch, Chamar evento comum directly selects and runs the conversation. Shared native interaction events may contain these branches; the named map entry exposes the actual path used in play. Encounter maps expose description, approaches, success/failure and death content. Council, endings, memorial and epilogues use the same pattern. Public names remain reachable through Configuração do jogo; content references are edited in their native calls, without a second Bridge association.

Split the current compound Common Events before replacing Present. Preserve the order and conditions of the existing prose, including the profile followed by conversation, successful-selection response and group-full response. Calling a conversation must not execute a farewell, opinion or epilogue merely because they formerly shared the same Common Event. Re-read returns to the current choices without changing campaign facts.

Native Show Text, Show Choices, Show Scrolling Text and installed message/bust commands remain the editing surface. The Bridge does not require @status, @source, speaker markers, approval fields, specific comment names or an allowed-command list. Narrative authority and review remain in the GDD and human work; they are not game-start prerequisites. Preserve provisional/confirmed status in documentation without demanding that the author duplicate it in runtime commands.

Content associations use the native Call Common Event selector, not a Bridge dispatcher or an editorial identifier grammar. To replace a conversation, select the replacement Common Event in that native call. The author may edit text, add native commands and refactor a callable unit without running a terminal revision or synchronizing a configuration registry. Keep meaningful completion at the end of the narrative unit through its explicit wrapper; observational content does not complete the campaign passage.

AUTO and FAST are available for units already read in the current campaign. Use completed-unit granularity, not a cross-campaign history or an inference that partly displayed text was read. Campaign passage status comes from the domain; observational conversations record completed reading in native UI state without completing a campaign step. New standalone Common Events have distinct native reading identities; no Bridge content registry is needed. Reaching unseen content or a decision stops the preceding automation permission. The old instant text-skip action is removed.

Credits preserve the current approved attribution content, now authored as rolling-text lines at speed 2. Adding names changes the natural rolling duration. The old ten-second timer must not truncate them. The UI contract owns native acceleration and the skip control.

Review evidence: a real editor walkthrough from each map family into its content, plus before/after content comparison and representative runtime reading. Mechanical test output does not approve wording, cultural representation or credit attribution. Required sensors are in [verification](verification.md).
