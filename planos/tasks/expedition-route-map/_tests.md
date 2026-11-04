# Verification strategy

| Source | Check |
| --- | --- |
| US-001.AC-1, AC-3 | V-001: all three routes respect arrival before draw, camp or destination; integrated representative journey |
| US-001.AC-2 | PT-001: visually inspect known/unknown tooltips and route hierarchy |
| US-001.EC-1 | V-002: invalid/repeated movement cannot commit; existing held-input boundary check |
| US-002.AC-1, AC-2 | V-003: own new-campaign save, Continue, two traps, retreat and repeated departure preserve facts |
| US-002.EC-1 | V-003 and code inspection of travel save/menu lock; PT-001 interruption observation |
| US-002.EC-2 | V-001/003 normal and reduced representative runtime paths |
| US-003.AC-1, AC-3 | V-004: editor opening, CLI read/write on disposable data, descriptor review, build retention |
| US-003.AC-2, EC-1 | V-002: graph return/arrival/serialization rules and rejected invalid topology |

Maintained automated coverage: UT-079/080, IT-086/087, plus risk-selected existing encounter, persistence, retreat, discovery and Council checks. All fast tests run; slow selection follows ADR-G006, concurrency from loki.config.json. No gamepad or native zoom checks. A real NW.js short journey and a pruned Chrome journey complement source Chrome. Native validators may expose unrelated baseline findings; compare with HEAD before classifying them.

Test-value decisions: these checks protect progress, random assignments, rewards, save restoration and event order, all player-visible losses if broken. Appearance remains a manual observation. Rule checks are stable, behavioral and cheap; the new native journeys cover the new boundaries rather than duplicating pixel/text assertions. Existing suites continue to own sacrifice and ending details. The same consuming project maintains these tests and runner; topology cases need no browser, while native serialization and scene handoff justify the few heavier cases. No translated prose is embedded in new assertions.

V-004's documentation check is workflow evidence, not another gameplay test. Its maintained command lives outside the spec. Human pacing, illustration quality and author usability remain [_playtest.md](_playtest.md), not inferred from automation.
