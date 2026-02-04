# ROADMAP.md — NOTN

This roadmap defines **what to work on next**, in what order, and what is explicitly **out of scope** at each stage.

---

## Guiding Rules

* Work on **one milestone at a time**
* Prefer small, incremental changes
* Do not refactor completed milestones without justification
* UI should lag slightly behind the underlying data models
* No gameplay mechanics unless explicitly allowed by the milestone

---

## Milestone 1 — Map Foundation ✅

Completed:

* Hex map generation
* Deterministic layout
* Center + corner tiles

---

## Milestone 2 — Tile Semantics & State ✅

Completed:

* Tile kinds
* Threat field
* Deterministic special tile

---

## Milestone 3 — Minimal Inspector UI ✅

Completed:

* Inspector panel
* Tile inspection

---

## Milestone 4 — Player Model (Data Only) ✅

Completed:

* Player model (id, name, color, start tile)
* GameState builder
* Start tile ownership
* Ownership visualization
* Inspector player list

---

## Milestone 5 — Turn Engine Skeleton 🚧 (CURRENT)

**Goal:** Establish turn order and round structure without gameplay mechanics.

### Tasks

* [ ] Define `TurnState` (data only):

  * `roundNumber`
  * `turnIndex`
  * `activePlayerId`
* [ ] Establish deterministic player turn order at game start (pseudo-random allowed)
* [ ] Support exactly **one turn per player per round**
* [ ] Implement `endTurn()` transition:

  * advance to next player
  * increment round after last player
* [ ] Allow future hooks for:

  * skipped turns
  * extra turns
  * environment / AI turns (not implemented now)
* [ ] Display turn info in inspector (read-only)

### Non-Goals

* No player actions
* No resources or combat
* No persistence
* No timers, inactivity handling, or voting
* No AI logic

### Done Criteria

* Turn state exists and advances correctly
* Active player is clearly identified
* Inspector reflects current turn state

---

## Milestone 6 — Environmental Threat System

Planned:

* Threat propagation
* Threat growth
* PvE pressure

---

*End of ROADMAP.md*
