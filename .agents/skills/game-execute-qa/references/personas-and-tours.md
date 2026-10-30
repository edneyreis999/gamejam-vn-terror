# Personas, Tours, and Experience Lenses

Use **Choose a persona** and **Choose one tour** when preparing a mission; during execution read the selected tour and applicable experience lenses. These are reusable prompts, not a mandatory checklist for every session.

## Choose a persona

Derive the persona from the actual audience and the failure risk. Use existing audience decisions and personas when present. Record goal, familiarity, input modality, and relevant environment/locale constraints. Do not invent demographic details, a universal patience threshold, or a minimum population of personas.

| Perspective | What it can reveal |
| --- | --- |
| First-time player | Discoverability, onboarding, unclear controls or goals, reliance on knowledge the game has not taught |
| Returning player | Remembering progress, finding the next action, save/continue, changed settings, recovery after interruption |
| Experienced player | Shortcuts, rapid but plausible actions, repeated interactions, strategy boundaries and unexpected combinations |
| Player using a supported accessibility option or input method | Focus, readable feedback, remapping, reduced motion, cues and controls through that actual method |
| Recovering player | Whether a failed action leaves a usable state, clear feedback, or a safe route back |
| Game author using a plugin or tool | Finding documented settings and commands, configuring them, saving/reopening work, and seeing their effects in the game |

An author is a real user of the authoring interface, not permission to test private functions as dogfooding. Distinguish documented knowledge an author has from hidden implementation knowledge. A device or assistive technology not actually exercised remains unverified. Keep one persona for the session; a different perspective belongs in another mission when needed.

## Choose one tour

Select the theme that best probes the changed contract and risk. Explore within it; there is no minimum number of edge probes and no obligation to run every theme.

| Tour | Investigation prompts |
| --- | --- |
| Feature and goal | Can this persona discover and complete the promised journey? Does the actual end state match the promise, including its downstream consequence? |
| Choice and consequence | Are choices understandable? Do branches, cancellation, return paths, and irreversible consequences behave as promised without leaking or repeating effects? |
| Interrupt and resume | What happens when the user pauses, exits, returns, saves, loads, or resumes at a relevant boundary? Is progress preserved where promised? |
| Repetition and boundaries | How do repeated input, a supported shortcut, a limit, or an invalid public authoring input behave? Does failure leave a usable state? |
| Settings and locale | Can the persona discover and change supported settings or language, understand the result, and retain it where promised? Does changed content remain usable? |
| Controls and access | Can the persona navigate, cancel, recover focus, and perceive the required feedback through the declared input method and accessibility settings? |
| Authoring and consumption | Can an author configure a public parameter or command, save and reopen it, and observe its intended consumer? Does an invalid edit receive useful feedback without damaging unrelated work? |

A campaign checkpoint could use a returning-player persona and Interrupt and resume; a plugin configuration increment could use an author persona and Authoring and consumption. These examples select a viewpoint, not a mandatory test stack. Economic, network, device, or performance boundaries matter only when the actual journey depends on them.

## Experience lenses and paper cuts

During the walk, notice friction and describe it from the persona's perspective. Reuse that observation rather than doing an automatic second pass. Apply relevant lenses when the requested review or an unresolved risk needs them:

- **Understanding:** can the persona tell where they are, what changed, and what action is available?
- **Feedback and control:** are waiting, selection, cancellation, completion, and recovery apparent and usable?
- **Continuity and trust:** does progress or authored work persist as promised, without silent loss or repetition?
- **Legibility and access:** can the declared persona perceive the content and operate the interface under the actual conditions?
- **Consistency:** do familiar terms, cues, and controls retain their meaning across the affected journey?
- **Pacing and presentation:** where does the walk suggest confusing timing, intrusive motion, or audio/visual friction? Separate observed effects from subjective hypotheses needing human evaluation.

A sharp paper cut materially obstructs the goal or undermines trust; treat it as a finding and evaluate a scoped repair. A minor annoyance stays in the debrief unless recurrence or evidence makes its impact material. Describe impact concretely: inability to complete, loss of progress/work, misleading feedback, friction, or cosmetic discrepancy. Do not manufacture a defect from personal styling preference or rewrite creative intent without a user decision.

The persona is a reasoning perspective, not a recruited participant. Never generalize its reaction into evidence about a population or use it to answer the user's experience hypotheses for them.
