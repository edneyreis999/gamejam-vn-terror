---
slug: qa-debug-tools
spec: _spec.md
status: approved
approved_on: 2026-10-31
approval: "crie uma nova branch para implementar essa spec e pode começar a implementar (user request, Claude Code session, 2026-10-31)"
graph:
  nodes:
    - id: task_01
      file: task_01.md
    - id: task_02
      file: task_02.md
    - id: task_03
      file: task_03.md
    - id: task_04
      file: task_04.md
    - id: task_05
      file: task_05.md
    - id: task_06
      file: task_06.md
    - id: task_07
      file: task_07.md
    - id: task_08
      file: task_08.md
    - id: task_09
      file: task_09.md
    - id: task_10
      file: task_10.md
  edges:
    - from: task_01
      to: task_02
    - from: task_07
      to: task_02
    - from: task_02
      to: task_03
    - from: task_03
      to: task_04
    - from: task_04
      to: task_05
    - from: task_01
      to: task_06
    - from: task_07
      to: task_06
    - from: task_05
      to: task_08
    - from: task_06
      to: task_08
    - from: task_08
      to: task_09
    - from: task_09
      to: task_10
---

# Tasks: QA Debug Tools

| #  | Task | Depends on | Checks owned | Status |
| -- | ---- | ---------- | ------------ | ------ |
| 01 | [Record ADR-G007 and amend the QA policies](task_01.md) | — | inline | pending |
| 07 | [Restore the green maintained suite](task_07.md) | — | inline | pending |
| 02 | [Debug screen and "Go to trap → A1" (pilot)](task_02.md) | 01, 07 | inline | pending |
| 03 | [Go to trap for all A and B traps](task_03.md) | 02 | inline | pending |
| 04 | [Named scenarios](task_04.md) | 03 | inline | pending |
| 05 | [Winning-approach hint](task_05.md) | 04 | V-005, V-006 | pending |
| 06 | [Build gate in prune-build and verify-build](task_06.md) | 01, 07 | V-001, V-002, V-003, V-004 | pending |
| 08 | [Plan QA for the integrated Debug tools](task_08.md) | 05, 06 | missions, test list | pending |
| 09 | [Run QA on the integrated Debug tools](task_09.md) | 08 | planned journeys, listed tests | pending |
| 10 | [User playtest of the Debug tools (optional)](task_10.md) | 09 | PT-001–PT-008, PH-001 | pending |
