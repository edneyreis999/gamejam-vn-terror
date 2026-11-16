# DX Template

Structure for `_dx.md`, the contract for author- and developer-facing surfaces this increment changes: commands and parameters exposed in the editor, project tools and their output, and instructions delivered to another project or team. It shows each surface exactly as its user will meet it, written as if the increment already shipped.

## Rules

- **As-if-shipped**: real names, real values, real output. An undecided value is an interview question, not a placeholder.
- **Zero internals**: no code structure, storage, or architecture; only what the author types, selects, or reads, and what they get back.
- **No process data in delivered surfaces**: requirement and test IDs, spec or plan paths, implementation status, and migration provenance stay out of anything delivered to someone other than the development team. A disclaimer does not substitute for separating that data.
- **Pair every example**: what the author does → what they observe. A command without its output or a setting without its observable effect is half an example.
- **Readable controls**: settings are fields the designer understands; a code fragment or opaque string in a text box is not editability.
- **Quality test**: an author reading this document alone can use the surface without asking anything.

## Document Skeleton

Keep only the sections whose surface the increment has.

```markdown
# Developer Experience: <Increment Title>

Author- and developer-facing surfaces. Companion to `_spec.md`.

## Golden Path

The shortest real sequence from nothing to the increment's core value for an author: what they open, set, and run, and what they see.

## Editor Settings and Commands

Per setting or command: where the author finds it, each field with its default and observable effect, and an example of its use paired with the result in game.

## Tools

Per command a developer or agent runs: the invocation, the human output, any structured output, and the exit status. Include the failure invocations users will actually hit, with their exact output.

## Delivered Instructions

Instructions shipped to another project or team: their exact content and where they land.

## Errors

Each failure condition → the exact message the author or developer sees and the action it points to. Every recovery action named must work as stated.
```
