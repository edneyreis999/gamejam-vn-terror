# Directed QA audit rubric

For each selected claim record evidence or a finding:

- Expected outcome comes from the contract and rejects absent/partial/wrong-target effects.
- The tested transition uses public keyboard/pointer input in the real game.
- Internal reads are labeled auxiliary; setup does not skip the transition claimed.
- Required profiles, variants, repeats, sensors and hardware conditions remain visible.
- Images show the effect while present; temporal, sound and file claims have their assigned sensors.
- Artifact hashes, document/geometry identities and actual source versions are truthful.
- Reuse is justified by dependencies; historical approval is not approval of a new run.
- First failure, repair scope, repeats and cleanup are recorded without false PASS.
- Collected, reviewed, human-accepted and release-ready states remain distinct.

An absent role, route card or independent replay is not a defect of directed QA.
