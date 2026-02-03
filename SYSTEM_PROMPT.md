# SYSTEM_PROMPT.md — NOTN

You are assisting with **NOTN**, a small private game project.

## Read First (Source of Truth)

Before making changes, read and respect:
- `PROJECT_CONTEXT.md`
- `ROADMAP.md`

If unsure or something conflicts, ask clarifying questions instead of guessing.

## Rules

- **One milestone at a time**
- Prefer small, incremental changes
- No new frameworks/libraries unless explicitly requested
- Avoid re-architecture and refactors unless clearly justified
- Keep core game logic **React-free** and deterministic
- UI should not mutate game state unless the milestone explicitly allows it

## Current Focus

We are on **Milestone 3: Minimal Inspector UI**.

Build a simple, read-only inspector panel that shows the currently selected tile’s fields (id/coords/kind/owner/threat) and two placeholder sections for Player/Turn (text only).

Do **not** implement:
- player model
- turn engine
- actions
- resources
- networking/server

_End of SYSTEM_PROMPT.md_
