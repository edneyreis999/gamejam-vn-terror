# Post-acceptance organization

Resolve project paths from its declared layout and this reference from the loaded skill's directory. Use the project's filesystem and verification tools; Git checks apply only inside a Git repository. This procedure owns organization; QA planning or execution guides retain their own roles.

## 1. Inventory the accepted scope

Identify the final human acceptance, its delivery scope and relevant input revision in the existing verification owner. If changed dependencies invalidate that acceptance, return the affected claims to verification before organizing them. Planning approval, technical PASS and intermediate-task acceptance leave delivery organization pending.

Inventory the accepted scope's tracked, new and relevant ignored files, their consumers, documentary owners and destinations. Preserve files serving a pending scope until their use is resolved. Classify by responsibility, not extension or generated origin:

| Responsibility | Destination |
| --- | --- |
| Source, tests, consumed catalogs, required baselines, distributed plugins and necessary assets | Maintained project files, included in the candidate versioned set |
| Delivered behavior, decisions, results and limitations | Existing authoritative documentation; create an owner only when none fits |
| Summary and selected real images needed to compose the delivery's devlog | Versioned delivery material |
| Raw logs, extra captures and historical execution records | Preserved local archive on the maintainer's machine, outside the candidate versioned set |
| Reproducible output | Project-local ignored output location |

Treat generated files consumed by maintained tools as required inputs unless those consumers are explicitly being adapted. Account for unique conclusions in raw reports before archiving them.

Done when: every planned action has a class, destination, owner and consumer disposition within the accepted scope.

## 2. Prepare durable knowledge and delivery material

Consolidate the final behavior, decisions, verification results and limitations into their existing owners, retaining provenance to the historical record. Prepare a factual change summary and selected real captures showing the delivered visual results, with before/after when useful and available. Include the context needed for another skill to compose a devlog from the versioned material alone. Record missing necessary images as an unresolved material gap; describe nonvisual changes in text. Compose no devlog or publication here: deliver its source material.

Done when: maintained documentation explains the delivery without reconstructing the conversation, and the material required for its devlog is present or its gaps are explicit.

## 3. Preserve the archive and update paths

Use the project's local archive convention, preserving the raw evidence bytes and their relative path mapping in a detailed manifest beside the archive. Resolve symlink targets before copying or removing so operations stay within the authorized destinations. Record its actual location and that local-only evidence is available on this machine, not from a fresh clone. Verify the preserved contents before removing any inventoried origin. Keep selected delivery images independently available with the maintained documentation.

Update affected current links and consumers. Maintained tools use versioned inputs and outputs they generate for the current invocation; historical paths may remain provenance for manual consultation. If removing an archive dependency would lose a tool's useful function, keep that input maintained and report the needed change to its owning workflow.

Done when: archived files can be located and read, and current consumers and documentation resolve their required inputs independently of the historical archive.

## 4. Check Git and the organized result

Apply ignore rules to the inventoried output/archive destinations while preserving necessary inputs, selected media and existing exceptions. Check positive and negative paths with Git's ignore matcher and inspect tracked, new and already staged files. Ignore rules alone do not untrack files: report already tracked evidence and the remaining index action for the user's commit workflow. Preserve the existing index; leave commit and PR publication to that workflow.

Inspect the candidate versioned set, including necessary new files, without ignored outputs. Open the selected images, check current required links, and run only affected consumer checks. Compare archive contents against the inventory. Record organization separately from product verification in the existing verification owner: scope, acceptance, destinations, file counts/bytes, actions, checks and unresolved gaps. Preserve historical product results with their dependency equivalence; organization does not make them freshly executed or invalidate unaffected sensors.

Done when: the archive is accessible, required material remains in the candidate versioned set, affected checks pass, and the organization result is reported independently of the product verdict.
