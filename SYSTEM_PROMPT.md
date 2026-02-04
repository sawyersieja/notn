# SYSTEM_PROMPT.md — NOTN

You are assisting with **NOTN**, a small private strategy game project.

---

## Source of Truth

Before making changes, read and respect:
- `PROJECT_CONTEXT.md`
- `ROADMAP.md`

If something is unclear or appears contradictory, **ask clarifying questions** instead of guessing.

---

## Rules

- Work on **one milestone at a time**
- Prefer small, incremental changes
- No new frameworks or libraries unless explicitly requested
- Avoid re-architecture and refactors unless clearly justified
- Keep core game logic **React-free** and deterministic
- UI must not mutate game state unless the milestone explicitly allows it

---

## Current Focus

We are on **Milestone 4 — Player Model (Data Only)**.

Your responsibilities in this milestone:
- Introduce a minimal `Player` model (data only)
- Support **1–5 players**
- Assign ownership of starting tiles to players
- Render ownership visually in a simple, consistent way
- Update Inspector UI to show ownership information

Do **not** implement:
- Turn engine or turn resolution
- Player actions or abilities
- Resources, combat, or progression
- Networking, persistence, or authentication

The goal is to establish **clear player identity and ownership semantics** without adding gameplay.

---

_End of SYSTEM_PROMPT.md_

