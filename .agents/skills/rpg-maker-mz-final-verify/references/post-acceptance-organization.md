# Candidate review and post-acceptance organization

Resolve project paths from their declared layout and this reference from the loaded skill's directory. Git checks apply only inside a repository. Steps 1–2 are read-only review before the readiness verdict and final acceptance. Steps 3–5 organize the accepted scope; QA execution and commit publication retain their own workflows.

## 1. Justify what will be maintained

Use the frozen candidate inventory from final verification. For each file, or a homogeneous group sharing the same consumer and purpose, identify:

- the maintained consumer or unique decision/evidence it serves;
- what would be lost if it were omitted, and whether another maintained source already preserves that value;
- any duplicated authority, temporary assumption or continuing update burden it introduces;
- for deletions, whether any surviving consumer or unique knowledge would be lost.

Assign **keep, fix, consolidate, archive or defer**, with a concrete reason and destination. Technical correctness alone does not justify keeping an unused artifact; age, generated origin, extension or file count alone does not justify discarding a useful baseline, test or selected evidence. Preserve accepted decisions and historical facts when proposing consolidation. Account for consumers before proposing removal.

Classify destinations by responsibility after deciding what earns retention:

| Responsibility | Destination |
| --- | --- |
| Required source, tests, catalogs, baselines, plugins and assets | Maintained project files, with their consumers identified |
| Delivered behavior, decisions, results and limitations | Existing authoritative documentation; create an owner only when none fits |
| Summary and selected real images needed to compose the delivery's devlog | Versioned delivery material |
| Excess raw logs, extra captures and execution records after unique evidence is selected | Preserved local archive, outside the candidate versioned set |
| Reproducible output | Project-local ignored output location |

Treat generated files consumed by maintained tools as required inputs unless those consumers are explicitly being adapted. Preserve pending scopes until their use is resolved. Keep counts split between additions, modifications and deletions; use them to account for scope, not as a target for reduction.

Done when: every candidate has a justified disposition and every proposed omission preserves required consumers and unique knowledge. Unresolved fixes and deferrals remain outside the ready set.

## 2. Read the result as a future maintainer

Assess the result from a fresh clone containing the selected files, declared dependencies and documented generation procedures. Check required link targets against Git tracking/candidate inclusion, not just local existence. Trace current instructions for dependencies on the conversation, ignored files, absolute maintainer paths or deleted temporary workspaces. Use a disposable reconstruction or consumer check only when needed to resolve uncertainty; a full clone or broad rerun is not mandatory for every edit.

Distinguish executable current guidance, frozen historical plans/results and deliberately local evidence. A historical pre/post comparison need not be rerunnable from the final tree, but it must not masquerade as a reusable procedure. Required inputs must be maintained or reproducibly generated; historical archive references must be labeled as such.

Read status-bearing documents together. Resolve contradictions between authorship-time statements and current completion, and give live status one existing owner. Preserve historical snapshots with dates/context instead of creating multiple copies that must be updated together. Date observations such as local file counts and Git state; they are not permanent project contracts.

Evaluate what a maintainer in five or ten years could understand, run and safely change without this machine or conversation. Identify useful rationale stranded in ignored evidence and propose a concise maintained summary. A verified local archive proves copy integrity, not long-term backup; state that boundary without automatically adding all raw evidence to Git.

Done when: current guidance has resolvable inputs and coherent authority, historical limits are explicit, and the maintained record explains the delivery independently of transient session state.

## 3. Organize the accepted scope and delivery material

Confirm the final acceptance and its relevant input revision in the existing verification owner. Apply the reviewed dispositions only within the accepted and authorized scope. If subsequent changes affect the meaning of that acceptance, return those claims to verification; routine organization records do not require repeating compatible acceptance.

Consolidate behavior, decisions, results and limitations into their existing owners using the audit's findings. Prepare a factual change summary and selected real captures for the delivery's devlog, with before/after when useful and available. Keep the material understandable from versioned files alone; identify missing necessary images and describe nonvisual changes in text. Compose no devlog or publication here.

Done when: reviewed dispositions are applied within scope and the delivery material preserves necessary context without introducing a competing status record.

## 4. Preserve the archive and update paths

Use the project's local archive convention, preserving the raw evidence bytes and their relative path mapping in a detailed manifest beside the archive. Resolve symlink targets before copying or removing so operations stay within the authorized destinations. Record its actual location and that local-only evidence is available on this machine, not from a fresh clone. Verify the preserved contents before removing any inventoried origin. Keep selected delivery images independently available with the maintained documentation.

Update affected current links and consumers. Maintained tools use versioned inputs and outputs they generate for the current invocation; historical paths may remain provenance for manual consultation. If removing an archive dependency would lose a tool's useful function, keep that input maintained and report the needed change to its owning workflow.

Done when: archived files can be located and read, and current consumers and documentation resolve their required inputs independently of the historical archive.

## 5. Check Git and the organized result

Apply ignore rules to the inventoried output/archive destinations while preserving necessary inputs, selected media and existing exceptions. Check positive and negative paths with Git's ignore matcher and inspect tracked, new and already staged files. Ignore rules alone do not untrack files: report already tracked evidence and the remaining index action for the user's commit workflow. Preserve the existing index; leave commit and PR publication to that workflow.

Compare the actual candidate set to the reviewed dispositions, including new files and deletions. Revisit the audit only for changes introduced by organization. Open selected images, check affected required links/consumers, and compare archive contents against its inventory. Record a concise organization result separately from product verification in the existing owner, with actual actions, destinations, checks and gaps; retain detailed manifests in the archive. Organization does not make historical product results newly executed or invalidate unaffected sensors.

Done when: the actual set matches justified dispositions, required material remains usable, archive copies are verified, and the report distinguishes organized files from staging, commits and publication without extending the product verdict.
