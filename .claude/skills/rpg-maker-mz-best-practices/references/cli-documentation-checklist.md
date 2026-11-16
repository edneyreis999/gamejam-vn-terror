# CLI Documentation Checklist

## 1. Purpose and timing

Use this checklist as the documentation author before handing the documentation over for independent evaluation. Its purpose is to find descriptions that prevent an agent from discovering a capability, choosing its values, or predicting its effect through the installed public interface.

Keep a compact record: share evidence only when it supports **every ID and checkpoint declared in the row**. Separate exceptions involving context, units, defaults, dependencies, or behavior. Start with pending entries and no preassigned approvals.

## 2. Identification

| Field | Fill in |
| --- | --- |
| Spec/task or standalone request | — |
| Namespace(s) and provider(s) | — |
| Evaluated version/revision and installed package identity | — |
| Capability inventory: location, version, and total IDs in scope | — |
| Affected entries in other namespaces, including delegations and containers | — |
| Public entry point and project used to query the CLI | — |
| Review author and date | — |

The inventory defines the entries to check. Distinguish operational, editorial, and structural entries according to the actual interface: a container that supports writing a complete object can also be operational. Record the classification; it does not automatically exempt an entry from clarity, default, or discovery checks.

## 3. Concrete checkpoints

Read each checkpoint to determine whether it applies to the covered IDs. “Not applicable” must explain which characteristic of the entry makes the check unnecessary. Missing information remains pending.

### Purpose, applicability conditions, and observable effect

| ID | Verifiable instruction | Expected evidence |
| --- | --- | --- |
| CP-01 | Describe what the operation does, which object it acts on, and what result the author should observe. Distinguish CLI authoring from later execution in the game. | Public text that lets the reader predict the change without confusing data transformation, event execution, and querying an entry. |
| CP-02 | State the conditions that activate the effect: scene, selection, mode, target state, or switch. Check whether the description remains true when the condition is absent. | The condition and effect published together, including any absence of effect relevant to the advertised use. |

### Types, units, scales, limits, and special values

| ID | Verifiable instruction | Expected evidence |
| --- | --- | --- |
| CP-03 | Check the types and value domains accepted by the CLI: number, string, array, object, integer/fractional values, limits, and relevant special values such as zero or empty. Distinguish authoring restrictions from raw-data behavior when they differ. | Consistent schema and prose; an accepted-format example; the meaning of sentinel values used in the documented case. |
| CP-04 | Specify units, scales, reference points, directions, and composition rules for numeric values that affect the result. | Pixels versus tiles, frames versus time, opacity scale, offset origins, or percentage formula/base, as applicable to the capability. |

### Option meanings and defaults

| ID | Verifiable instruction | Expected evidence |
| --- | --- | --- |
| CP-05 | Explain the effect of every available option, including boolean polarity and differences between styles. Do not define a value merely by repeating its name. | A value → effect mapping checked against the implemented contract. |
| CP-06 | Distinguish the complete-object default, missing-field fallback, effective configuration, and reset result where they exist. Preserve native values when correcting the explanation. | Consistent object defaults and leaf entries, with explicit explanations of legitimate differences. |

### Dependencies, activation, and identifiable public references

| ID | Verifiable instruction | Expected evidence |
| --- | --- | --- |
| CP-07 | Name the required provider or resource and how to activate it. Record version, order, exclusive selection, or prior configuration when these are actual conditions. | A concrete public identifier and preparation instructions sufficient for the advertised use. |
| CP-08 | Check that the reader can locate each cited reference and that it explains the additional information needed. Avoid vague directions such as “configure the portrait” or “use the multiplier,” and instructions that depend on internal plans that are not shipped. | An identifiable public namespace/ID or path, a queryable response, and its connection to the entry's condition. |

### Complete examples, accepted syntax, and expected results

| ID | Verifiable instruction | Expected evidence |
| --- | --- | --- |
| CP-09 | Check each example against the delivered operation: namespace, subcommand, accepted flags, target, grammar, and sources of variable values. Include a hash from a read operation only where the adapter requires or accepts it. | A usable example with identified substitutions; the read operation that supplies IDs, indices, or hashes. |
| CP-10 | For object writes and examples that depend on state, supply the required fields and a result consistent with the example's values. Distinguish illustrative examples from executed examples. | A complete logical object or an unambiguous composition available through the public interface; preconditions and expected result, without missing required fields or a combination that prevents the example itself from working. |

### JavaScript contracts: context, arguments, return values, and effects

| ID | Verifiable instruction | Expected evidence |
| --- | --- | --- |
| CP-11 | Identify where the JavaScript runs, the meaning of `this`, available arguments/variables, and whether the field accepts an expression, function body, or script with a completion value. | A public contract and example consistent with the form actually evaluated; a statement that the CLI does not execute the code when it only authors it. |
| CP-12 | State whether the return value is consumed or ignored, the mutations/effects, and who calls the hook. Check the phase and order when they change the result. | The return value's type and meaning, state available at call time, and the distinction between automatic and manual calls. |

### Lifecycle, persistence, reset, precedence, and limitations

| ID | Verifiable instruction | Expected evidence |
| --- | --- | --- |
| CP-13 | Explain how long state lasts and the effects of scene/map changes, save/load, reset, and removal when relevant. Distinguish current state from configuration for future use. | A verifiable lifecycle: creation, use, preservation, and cleanup, with explicit exceptions. |
| CP-14 | State which rule wins when there is global/local configuration, tags, multiple conditions, or chained operations. Define the extent of removal and the limitations that change the advertised result. | Published order, fallback, and persistence rules, without promising updates, merges, or cleanup that do not happen. |

### Native targets, assets, and input formats

| ID | Verifiable instruction | Expected evidence |
| --- | --- | --- |
| CP-15 | Identify the native record and field used, distinguishing source/destination, ID/position, and formats with their own restrictions. Provide a public alternative when the target does not accept the content. | An unambiguous target; syntax appropriate for Note/Comment or another field; relevant limits such as single-line and multiline support. |
| CP-16 | For images, icons, colors, fonts, and lists, explain accepted sources and formats: file/folder/extension, index/palette, array, or filter grammar, as applicable. | An example with an identifiable or clearly illustrative resource and enough rules to replace it. |

### Consistency and discovery through the delivered CLI

| ID | Verifiable instruction | Expected evidence |
| --- | --- | --- |
| CP-17 | Query the installed CLI through the advertised routes. Check the namespace, operation, ID, and references, including generated examples; source text alone is not proof of publication. | Identified public commands and responses in the evaluated version; consistent recovery from an incorrect namespace/ID when documented. |
| CP-18 | Compare descriptions, schemas, defaults, examples, availability, containers, and delegations. Resolve contradictions; an editorial entry must not teach an unavailable write operation. | Consistent public responses and the list of IDs affected by the same fix, including dependent references. |

### Preserving conditions and restrictions during rewrites

| ID | Verifiable instruction | Expected evidence |
| --- | --- | --- |
| CP-19 | Compare the text before and after the rewrite, and check that factual conditions, restrictions, and exceptions remain explicit. If an old statement was wrong, record the correction and its basis. | A diff or comparison with the previous version and factual verification of the preserved/corrected condition. |
| CP-20 | Reread promises of effects after simplifying or completing the text. Pay particular attention to words such as “always,” “all,” “immediate,” “persists,” and “removes”; retain limits that affect use. | A final statement consistent with behavior and accompanied by the necessary conditions, without inventing guarantees to fill out the description. |

## 4. Review record

Prepare and fill the versioned JSON record described in the [integration contract](cli-review-integration.md). Read that contract in full when implementing or using the checker. Use the [pending template](../assets/cli-review.template.json) for shape and the [synthetic example](../assets/cli-review.example.json) for references; neither grants approval for this project. Generate the actual entries from the independently collected public inventory.

Keep one entry per namespace/ID and all CP-01–20 results per entry. Use `pending`, `conformant`, or `not_applicable`. Conformant results reference evidence IDs with both public evidence and a factual verification basis; non-applicable results explain the entry-specific reason. Share evidence by reference only when it supports every declared use, and separate exceptions. Classification as operational, editorial or structural does not waive checkpoints.

**Public evidence** is what the reader can consult: a CLI response, help, or an explicit public reference. **Factual verification** is the basis the author uses to confirm the information, such as the implementation, contract, and an existing test. Reading source code can validate the truth of a description; it does not replace publishing the information the reader needs.

Permitted grouping: two entries use the same unit and coordinate reference, both explicit in a shared response. Required exception: an offset changes sign when mirrored; it needs its own evidence for that rule. A favorable assessment of a container does not automatically cover incomplete descriptions of its children.

## 5. Completion and limits

The author's review ends when every inventory ID is covered, every applicable checkpoint has public evidence and factual verification, no pending items remain, every “not applicable” is justified, and the maintained verifier passes against current installed descriptions. Cite the scope, filled record, command and passing receipt in the task. Repeat the current-description check when preparing the independent evaluation, using the descriptions it will receive. Check group members and their exceptions; do not use sampling to declare an entire family reviewed.

If a fix changes responses, examples, or references, update the affected rows before handoff. The need to repeat evaluations or tests remains governed by the current contract and the inputs actually changed; this checklist neither creates an additional campaign nor independently authorizes evidence reuse.

The verifier proves record coverage and correspondence with current public JSON. It cannot judge clarity, truth or whether a cited source supports a claim; author review, semantic assertions and the independent evaluation retain those responsibilities.
