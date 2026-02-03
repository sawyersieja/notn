# ROADMAP.md — NOTN

This roadmap defines **what to work on next**, in what order, and what is explicitly **out of scope**.
It exists to keep development focused and prevent unnecessary refactors or scope creep.

AI assistants should follow this roadmap strictly.

---

## Guiding Rules

- Work on **one milestone at a time**
- Prefer small, incremental changes
- Do not refactor completed milestones without justification
- UI should lag slightly behind the underlying data models
- **No gameplay mechanics** unless the current milestone explicitly includes them

---

## Milestone 1 — Map Foundation ✅ (COMPLETED)

**Goal:** A correct, reusable hex-map foundation.

Completed:
- Flat-top hex grid rendered with SVG polygons
- Hex-shaped board generation (axial radius `R`)
- Deterministic map generation
- Map logic isolated under `src/game/map`
- Neighbor helpers
- Start tile selection (5 corners) + center tile selection

---

## Milestone 2 — Tile Semantics & State ✅ (COMPLETED)

**Goal:** Give tiles minimal meaning without adding gameplay.

Completed:
- `Tile.kind`: `"normal" | "start" | "center" | "special"`
- `Tile.threat`: `number` (default `0`)
- Deterministic reserved **special** corner (top-most)
- Temporary visual differentiation by `kind`

Notes:
- Ownership exists only as data; richer ownership rules come later.

Non-goals:
- No actions
- No turn logic
- No combat
- No persistence

---

## Milestone 3 — Minimal Inspector UI 🚧 (CURRENT)

**Goal:** Make the current game state **inspectable and debuggable**.

### Tasks
- [x] Add a fixed inspector panel (overlay or sidebar)
- [x] Show selected tile fields:
  - `id`
  - `row`, `col`
  - `kind`
  - `owner`
  - `threat`
- [x] Add placeholder sections:
  - Player (placeholder)
  - Turn (placeholder)

### Non-goals
- No action buttons
- No turn system
- No resource system
- No networking/server work

---

## Milestone 4 — Player Model (Data Only)

**Goal:** Introduce players without gameplay complexity.

Planned:
- Define `Player` model (stable id, display name, color)
- Associate players with start tiles
- Assign tile ownership for start tiles
- Render ownership visually (simple, non-interactive)

Non-goals:
- No abilities
- No inventories
- No diplomacy rules

---

## Milestone 5 — Turn Engine Skeleton

**Goal:** Establish turn structure without mechanics.

Planned:
- Track current turn number
- Track active player
- Allow ending a turn
- Skip inactive players
- Display turn info in UI

---

## Milestone 6 — Environmental Threat System (Early)

**Goal:** Introduce PvE pressure.

Planned:
- Threat propagation rules
- Threat growth over time
- Visualize threat
- Setbacks (not instant game over)

---

## Explicit Non-Goals (Global)

Out of scope until further notice:
- Real-time combat
- Monetization
- Public accounts or matchmaking
- Heavy animations or 3D graphics
- App-store deployment

---

_End of ROADMAP.md_

