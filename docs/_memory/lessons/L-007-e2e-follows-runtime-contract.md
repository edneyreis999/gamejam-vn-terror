# L-007 — E2E Must Follow the Direct-Open Runtime Contract

End-to-end coverage must exercise the same `prototype/index.html` and production `data.js → game.js → app.js` path used by players. Do not replace direct local launch with a server, bundled test build, mocked state machine, or QA-only mutation API.

When the public browser QA contract changes, update the snapshot/error assertions and complete browser journeys in the same task that finishes the surface. Local offline behavior, seed reproducibility, and normal player controls remain part of every relevant E2E gate.
