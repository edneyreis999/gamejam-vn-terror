# Rationale

Optional background for the procedure, not an additional policy or completion gate.

A repair is useful when it restores the intended behavior and leaves failures observable. Suppressing a diagnostic can make a failing system look healthy while leaving its cause intact. Judge the actual failure path and the evidence, not the presence of a particular syntax construct.

Boundary adapters, graceful degradation, optional values, polling, and supported extension mechanisms can be intentional design. Preserve them when the contract and observations justify their behavior. A defect in an external dependency can require isolated handling until that dependency changes; record the limitation and removal condition without claiming to have repaired the dependency itself.

Keep the cost of diagnosis and repair proportionate to the observed problem. Reuse established checks and current evidence. Broad refactors, mandatory tracking documents, review dates, and universal validation layers are not implied by this principle. Deferring accepted work or changing expected behavior remains the user's decision.
