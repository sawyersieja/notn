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
- No gameplay mechanics unless explicitly allowed by the milestone

---

## Milestone 1 — Map Foundation ✅ (COMPLETED)

**Goal:** A correct, reusable hex-map foundation.

Completed:
- Flat-top hex grid rendered with SVG polygons
- Hex-shaped board generation (axial radius `R`)
- Deterministic map generation
- Map logic isolated under `src/game/map`
- Neighbor helpers
- Center tile + five corner start tiles

---

## Milestone 2 — Tile Semantics & State ✅ (COMPLETED)

**Goal:** Give tiles minimal meaning without adding gameplay.

Completed:
- `Tile.kind`: `"normal" | "start" | "center" | "special"`
- `Tile.threat`: `number` (default `0`)
- Deterministic reserved special corner (top-most)
- Temporary visual differentiation by `kind`

Non-goals:
- No actions
- No turn logic
- No combat
- No persistence

---

## Milestone 3 — Minimal Inspector UI ✅ (COMPLETED)

**Goal:** Make current game state inspectable and debuggable.

Completed:
- Fixed inspector panel
- Selected tile inspection (id, coords, kind, ownerId, threat)
- Placeholder section for Turn

Non-goals:
- No state mutation from UI
- No gameplay actions

---

## Milestone 4 — Player Model (Data Only) 🚧 (CURRENT)

**Goal:** Introduce players as data entities and assign ownership of starting tiles.

### Tasks
- [ ] Define `Player` model (id, optional name, color, startTileId)
- [ ] Support **1–5 players** (not always exactly 5)
- [ ] Create a minimal `GameState` builder (`{ map, players }`)
- [ ] Assign ownership of start tiles deterministically (`Tile.ownerId = Player.id`)
- [ ] Render tile ownership visually (simple overlay/tint; temporary)
- [ ] Inspector: list players and resolve ownerId -> player display name (read-only)
- [ ] (Optional QoL) Ensure inspector text is readable regardless of OS/browser theme (explicit text color)

### Non-Goals
- No turn engine
- No player actions
- No resources or combat
- No networking or server logic
- No persistence or authentication

### Done Criteria
Milestone 4 is done when:
- Player data exists (1–5)
- Start tiles are owned by those players
- Ownership is visible in the grid
- Inspector shows owner as a player (not raw id only) and lists players

---

## Milestone 5 — Turn Engine Skeleton

**Goal:** Establish turn structure without mechanics.

Planned:
- Track turn number
- Track active player
- Allow ending turn
- Skip inactive players
- Display turn info in UI

---

## Milestone 6 — Environmental Threat System (Early)

**Goal:** Introduce PvE pressure.

Planned:
- Threat propagation rules
- Threat growth over time
- Visualize threat levels
- Setbacks (not instant game over)

---

## Explicit Non-Goals (Global)

Out of scope until further notice:
- Real-time combat
- Monetization
- Public matchmaking
- Heavy animations or 3D graphics
- App-store deployment

---

_End of ROADMAP.md_
