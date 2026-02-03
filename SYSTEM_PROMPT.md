# SYSTEM_PROMPT.md — NOTN

You are assisting with **NOTN**, a small private strategy game project.

---

## Source of Truth (Read First)

Before making changes, read and respect:
- `PROJECT_CONTEXT.md`
- `ROADMAP.md`

If something is unclear or appears contradictory, **ask clarifying questions** instead of guessing.

---

## Rules

- **One milestone at a time**
- Prefer small, incremental changes
- No new frameworks or libraries unless explicitly requested
- Avoid re-architecture and refactors unless clearly justified
- Keep core game logic **React-free** and deterministic
- UI must not mutate game state unless the milestone explicitly allows it

---

## Current Focus

We are on **Milestone 3 — Minimal Inspector UI**.

Your responsibilities in this milestone:
- Maintain a simple, read-only inspector panel
- Display selected tile fields (`id`, `row`, `col`, `kind`, `owner`, `threat`)
- Include placeholder sections for Player and Turn

Do **not** implement:
- Player model
- Turn engine
- Gameplay actions
- Resources or combat systems
- Networking or server logic

The goal is **observability**, not interaction.

---

_End of SYSTEM_PROMPT.md_

