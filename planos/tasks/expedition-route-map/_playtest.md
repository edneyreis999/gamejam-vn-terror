# Route-map playtest

Build: ______ Tester: ______ Date: ______

Start a new game in Chrome (`npm start`) or NW (`npm run start:nw`). Select three heroes, choose the church and depart. Use only saves created in this build.

## PT-001 — Map and restoration (US-001.AC-2; US-002.EC-1)

1. At the tavern node, hover an unknown trap. Expect `?` and only the first trap selectable.
2. Enter and complete two traps. On the returned map, inspect both by mouse and keyboard. Expect their names/art, visible history, pawn on the second trap and camp as the next stop.
3. Try a past and a distant node. Expect no movement. Enter the camp; Continue returns to its node before the next trap.
4. Leave/reopen after a stable map save. Expect the same progress with no repeated arrival. Try opening the menu during travel; it must wait until movement is over.
5. Repeat with reduced motion and EN. Check readability and tooltip clipping, especially near the edges and on the ten-node village route.

Result: [ ] Pass [ ] Fail. Notes:

## PT-002 — Reuse (US-003.AC-1/3)

In a disposable MZ project, follow the authoring guide's three-node example. Select native event graphics, branch orthogonally, call a Common Event at arrival, return to the start, then change RouteArrival to always. Confirm the controls are understandable without reading source code.

Result: [ ] Pass [ ] Fail. Notes:

## PH-001 — Journey rhythm

Does choosing the next stop help you understand the journey without making repeated attempts tedious? Are the pawn, visited state and next action clear at a glance? Compare with the approved mockup.

Answer: [ ] Yes [ ] Partly [ ] No. Notes:

Verdict: [ ] Accept [ ] Adjust [ ] Reject. Not executed by the user yet.
