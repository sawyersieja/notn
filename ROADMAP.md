# ROADMAP.md — NOTN

This roadmap defines **what to work on next**, in what order, and what is explicitly **out of scope** at each stage.
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
- `Tile.threat`: `number` (default 0)
- Deterministic reserved **special** corner (top-most)
- Visual differentiation by `kind` (temporary styling)

Notes:
- Ownership is **data-only** for now; richer ownership rendering comes later.

Non-goals:
- No actions
- No turn logic
- No combat
- No persistence

---

## Milestone 3 — Minimal Inspector UI 🚧 (CURRENT)

**Goal:** Make the current state **inspectable** and debuggable.

### Tasks
- [ ] Add a small, fixed inspector panel (overlay or sidebar)
- [ ] Show selected tile fields:
  - `id`
  - `row`, `col`
  - `kind`
  - `owner` (even if null / number for now)
  - `threat`
- [ ] Add two placeholder sections (read-only text):
  - “Player (placeholder)” (no real player model yet)
  - “Turn (placeholder)” (no real turn engine yet)
- [ ] Keep gameplay actions disabled / non-existent

### Non-goals
- No action buttons that mutate game state
- No turn system
- No resource system
- No networking/server work yet

---

## Milestone 4 — Player Model (Data Only)

**Goal:** Introduce players without gameplay complexity.

- Define `Player` model (id 0–4, name, color, startTileId)
- Assign ownership of start tiles
- Render ownership visually (simple, consistent)

---

## Milestone 5 — Turn Engine Skeleton

**Goal:** Establish turn structure without mechanics.

- Track current player and turn number
- Allow ending turn
- Skip inactive players
- Display turn info in UI

---

## Milestone 6 — Environmental Threat System (Early)

**Goal:** Introduce PvE pressure.

- Threat propagation rules
- Threat increases over time
- Visualize threat
- Setbacks (not instant game over)

---

## Explicit Non-Goals (Global)

Out of scope until further notice:
- Real-time combat
- Monetization
- Public accounts/matchmaking
- Heavy animations or 3D graphics
- App-store deployment

---

_End of ROADMAP.md_
