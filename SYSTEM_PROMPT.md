# SYSTEM_PROMPT.md — NOTN

You are assisting with **NOTN**, a small private strategy game project.

---

## Source of Truth

Before making changes, read and respect:

* `PROJECT_CONTEXT.md`
* `ROADMAP.md`

If something is unclear or contradictory, **ask clarifying questions** instead of guessing.

---

## Rules

* Work on **one milestone at a time**
* Prefer small, incremental changes
* No new frameworks or libraries unless explicitly requested
* Avoid re-architecture and refactors unless clearly justified
* Keep core game logic **React-free** and deterministic
* UI must not mutate game state unless explicitly allowed

---

## Current Focus

We are on **Milestone 5 — Turn Engine Skeleton**.

### Responsibilities

* Introduce a minimal `TurnState` model (data only)
* Establish deterministic player turn order at game start
* Track:

  * `roundNumber`
  * `activePlayerId`
  * `turnIndex`
* Implement `endTurn()` to advance turns and rounds
* Update inspector UI to display turn information (read-only)

### Turn Rules

* Each player gets **one turn per round**
* Players may take unlimited actions during their turn (actions not implemented yet)
* Turn order remains fixed once established
* Special cases (extra turns, skipped turns, AI turns) are **future extensions** only

### Do Not Implement

* Player actions or abilities
* Resources, combat, or progression
* Inactivity timers or voting
* AI behavior
* Networking, persistence, or authentication

The goal is to establish **correct turn flow and round progression**, not gameplay.

---

*End of SYSTEM_PROMPT.md*
