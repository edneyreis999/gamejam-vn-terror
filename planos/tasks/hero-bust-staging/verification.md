# Verification

## Contract

| ID | Requirement | Expected | Sensor |
| --- | --- | --- | --- |
| V-001 | RQ-001 | All seven portraits retain visible heads, a fixed per-art Y and lower-body crop | PNG alpha geometry plus real Chrome composition inspection |
| V-002 | RQ-002 | Ivaí sequence exactly matches approved Gorvak; hero focus uses the same timing/tone and 90% listener factor | Structured command comparison; representative directed-browser transition |
| V-003 | RQ-003 | Native branching, dialogue and campaign commands unchanged; Map037 unchanged | Structural comparison, labels/branch grammar, scoped diff |

Input base: main `0bbba30`. Reference: accepted Map037 SHA-256 `765dc8dbcf136a0dc5cfd09dd7fd33a364912594b9118ee4d363f7ad1b34da7b`. Expected per-art values belong to [technical art](hero-bust-staging.technical-art.md). The actual JSON, PNGs, plugin configuration and installed engine/vendor are relevant freshness inputs. New visit required to observe changed native commands; existing serialized conversations are not migrated.

Under ADR-G006, unchanged campaign mechanics do not justify a full campaign replay. Inspect a representative entrance/focus path and the distinct artwork compositions; exact Ivaí commands and unchanged dependencies permit reuse of the user's accepted Gorvak entrance as reference, not a claim that seven new transitions were played. Gamepad/native zoom excluded. Preserve the user's preexisting comparison tabs/servers; close any QA-only resources opened now.

## Final verification — 2026-09-22

**Delivery PASS; candidate-set readiness PASS** for Gorvak and the seven other hero visits (Map037–044), on branch `fix/gorvak-pr17-staging`, base/head `0bbba300208d54e180ad849677e92f800b056c74`. This verdict is limited to the two presentation increments; it is not whole-game release certification.

The user reported: “Fiz os testes manuais e estão todos corretos. faça o final verify”. This is explicit final human acceptance of the delivered eight-hero presentation. All eight runtime map hashes and all previously recorded supporting hashes matched the delivered revision before this documentation-only closure. No game data, plugin, asset or behavior changed after the manual tests. The message does not enumerate devices, saves or motion settings; no unreported manual cases are inferred.

| State | Verdict | Evidence |
| --- | --- | --- |
| implemented | PASS | Map037–044 and the two incremental contracts exist; native events own the visual changes. |
| static_verified | PASS | Fresh read-only hash/structure checks; all nonvisual commands and map metadata match main; seven outputs match the reviewed transformation; shared vendor/configuration and images unchanged; links and whitespace checks pass. |
| runtime_verified | PASS within contracted coverage | Retained Chrome composition observations for seven portraits, Griznik entrance/focus/HIDE/cleanup traversal, and user-reported successful manual tests. No new browser replay this turn. |
| human_accepted | PASS | User’s final acceptance above, plus the earlier explicit Gorvak acceptance. |
| release_ready | PASS for these increments | Contracted evidence and acceptance satisfied; no unresolved blocking findings in the candidate set. |

Fresh checks used Python 3.14.6 and Git, with exit 0 for the final scoped read-only comparisons, document-link check and `git diff --check`. An initial broad link checker treated a preexisting directory link in the GDD as a file; correcting the checker’s scope resolved the check without changing product or documentation targets. Generator functions were evaluated without writing game data. Review/deslop found no unrelated runtime edits, added abstraction, dependency or suppression.

Retained limitations and ADR-G006 selection: campaign-wide replay, save/load and repeat browser traversals are **omitted for redundancy/covered risk**, not newly passed. Existing source-equivalent campaign/control paths, unchanged engine/vendor/assets, the real representative journey and the user’s acceptance support reuse. Reduced motion remains verified from its native branch and final values; a specific reduced-motion manual replay was not reported. Gamepad/native zoom remain explicitly excluded. Reopen affected cases if command order, branch logic, save lifecycle, vendor/configuration, artwork or framing changes, or a regression contradicts the equivalence. Existing saved conversations retain their serialized presentation until a fresh visit.

### Post-acceptance organization

**Organization PASS.** Reused the prior candidate dispositions: keep eight native maps, the canonical GDD update and the ten incremental contract/provenance/verification files. Total remains nine modified tracked files, ten additions and zero deletions. Updated completion status and consolidated acceptance/results into the existing verification owners; no parallel status tree, duplicated report, archival move or deletion was needed. Supporting hashes below identify the final documentary candidate; map hashes remain unchanged. Local links resolve to tracked or included files, with no temporary-worktree path required by maintained instructions. Ignored Python bytecode is disposable and not an input. No selected image bundle exists to archive; the absence of exported captures limits reusable devlog media, not the recorded live/manual acceptance.

Delivery summary for the devlog: all eight hero visits preserve the cropped bust composition and fixed focus anchor, with Ivaí entering smoothly from right to left. Elowen, Vaelith and Bimbren use individual framing adjustments for their artwork. Suggested capture: hero profile → Ivaí’s entrance → hero response. No devlog or remote publication was produced.

This final verification opened no browser, application or server; no new QA resource requires cleanup. Previously requested game sessions were left untouched. Git index remains empty: no staging, commit, merge or publication.

## Implementation results before final human acceptance

2026-09-22, local branch `fix/gorvak-pr17-staging`, base/head `0bbba30`, uncommitted changes.

- **Static PASS:** `python3 planos/tasks/hero-bust-staging/apply-hero-staging.py`, Python 3.14.6, exit 0, including a second idempotent run. Structured comparisons independently verified every nonvisual command and all map metadata against main; every Ivaí-specific command equals the accepted Gorvak sequence. Native condition/choice nesting and labels checked. Gorvak's approved hash is unchanged. `git diff --check` passed.
- **Composition PASS, agent inspection:** real Chrome visits to Elowen, Griznik, Seraphina, Bimbren, Liora, Vaelith and Draska. Heads remain visible, feet outside the scene. Initial Bimbren framing left his face too low because of his staff; initial Elowen/Vaelith framing showed too much lower body because of PNG canvas margins. Their corrected values are in technical art and were revisited in Chrome. Screenshots were inspected in the tool session; no durable PNG bundle was exported.
- **Representative temporal PASS:** played Griznik's profile → Ivaí question → hero response → remaining conversation → menu through normal pointer input. Observed Ivaí partly transparent at the far right, then settled in the right slot; observed hero focus, HIDE/restoration of the same text, Ivaí exit and return to the hero-only menu. Group remained 0/3. The 20-frame value is statically verified, not measured frame by frame. The other six temporal sequences are covered by command equivalence, not six claimed full replays.
- **Limits:** reduced-motion final values/branch paths are statically covered; no new reduced-motion browser replay, save/load test or whole-campaign run. No human acceptance of the seven new compositions is inferred from approval of Gorvak. Technical delivery PASS within V-001–003 and the representative coverage contract; artistic approval remains the user's judgment.
- **Resources:** reused the two user-requested comparison tabs/servers. No new QA-only tab or server opened. Campaign inspection was read-only; traversal used public player gestures only. The corrected game tab was marked to remain available. The previously referenced PR #17 tab was no longer available at final handoff; no replacement was opened.

## Candidate review / deslop

Keep Map038–044 as native runtime sources, the five files in this increment as the decision/verification/replay owner, and the new GDD paragraph as the canonical design update. Keep the earlier Gorvak map and its five increment files under their existing approved scope; its verification gains only the subsequent human acceptance record. The total pending set is nine modified files and ten new files, zero deletions. No engine, plugin, asset, campaign rule or unrelated file changed; the index remains untouched. No commit or publication.

Preserved the compact serialization of Map038–044 to avoid formatting churn. The replay script validates every target before writing, uses only Python standard-library dependencies and intentionally refuses independently changed maps. Local Python bytecode is ignored, not a delivery input. Linked contracts are included in the candidate set or already tracked. There are no raw captures to archive and no new competing status tree. Suggested devlog capture remains profile → Ivaí enters from the right → hero takes focus; this session does not supply a saved image bundle.

## Runtime candidate SHA-256

| Map | SHA-256 |
| --- | --- |
| 038 | `62c3bc9dcc1ff4d2600d44bce439607816977ea6dea6a318512d03fdb373d1f2` |
| 039 | `fea6d0b29286abbb343a459bc9d763d2b43c3643bf4c5c778f6899e90909a1a8` |
| 040 | `88045d28545d42fa926e9627ab3e62d8628b1025a27e7d232ac5efd119288977` |
| 041 | `7978d1c03917543ff9e001ded7c52adbb9bfbc0dbb35bb0d530a17ea0523d1fc` |
| 042 | `efee10178b31f9c57ae1fa5662a1afccad3149b18d1d52be30be7b2d983d7928` |
| 043 | `8582e4bccfb032ba590baa4e8c4951a2cf72201d70bfe1547d4d0c98392b6a8c` |
| 044 | `0ee5598aa9643cbeefac37856f92680b9ce8971715d208adadbc9676f64f5f88` |

Final compact JSON is structurally identical to the inspected presentation. Shared dependency hashes and accepted Map037 are recorded in the [Gorvak verification](../gorvak-pr17-staging/verification.md); those dependencies remain unchanged.


## Supporting candidate hashes

Verification is this live report; remaining supporting files are frozen below.

| Path | SHA-256 |
| --- | --- |
| `docs/GDD_Visual_Novel_Expedicao_e_Sacrificio.md` | `a61c72eb48be11782aed616fa5d999f33df35a25691a2dbd6b865b649eaccbae` |
| `planos/tasks/gorvak-pr17-staging/gorvak-pr17-staging.technical-art.md` | `64c050d23954c86015f1dbd6e7d79d964c409cba144f7d0e8f2a20376cec9a58` |
| `planos/tasks/gorvak-pr17-staging/restore-gorvak.py` | `8d00fc599b0359a06e26be7f77d2e6d514cc7c7e0e1eb60f25d1b627993e0726` |
| `planos/tasks/gorvak-pr17-staging/spec.md` | `745c2ea6db5235bb7ab7ea6adb7cd4df29f1d1509c882b3ba9d1fc0da6e5b278` |
| `planos/tasks/gorvak-pr17-staging/tasks.md` | `8fdd834ee06afef0d82da335fbc9b0e1db8980b7961a89b918eaa6aa989315bd` |
| `planos/tasks/gorvak-pr17-staging/verification.md` | `b977f592c9315cab5a836d7b727705a6789f2808de0445df1f23e052b6d86d32` |
| `planos/tasks/hero-bust-staging/apply-hero-staging.py` | `ebfe56b7e4a283c4b6f7211e9c4e126c77145b676b6d3e31e0e62470d2f7b179` |
| `planos/tasks/hero-bust-staging/hero-bust-staging.technical-art.md` | `aa62b8c93375ea13e8411d359588ec19edf031e86e66c93801820a97fbf4702b` |
| `planos/tasks/hero-bust-staging/spec.md` | `04836d96e30b4ba6c8fbd49ccacd61287f48b6557d108365d2bbb7a95f6b0efd` |
| `planos/tasks/hero-bust-staging/tasks.md` | `7ad4b3400cf9c64ff50b33e17d761f19698c87c0bebeea4d7a9683070609ad33` |
