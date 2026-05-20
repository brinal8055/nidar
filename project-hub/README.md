# Project Hub

This folder is the working memory for the repo.

It is meant to let future tasks start from stable project context instead of rebuilding the same understanding each time.

## Files

- `context.md`: current product, codebase, and delivery snapshot
- `tasks.md`: active workboard and next implementation slices
- `decisions.md`: important decisions and assumptions already made
- `open-questions.md`: unresolved items that could affect future work

## Working Pattern

1. Read `context.md`, `tasks.md`, and `decisions.md` before major implementation work.
2. Update `tasks.md` when something moves from planned to in progress or done.
3. Add durable product or architecture calls to `decisions.md`.
4. Update `context.md` after meaningful milestones so the repo stays self-describing.

## Scope Note

This folder is a project reference layer, not the product itself.

The source of truth for implementation remains:

- `app/`
- `components/`
- `lib/`

The source of truth for strategy remains:

- `Phased implementation plan for your India D2C telehealth MVP.pdf`
