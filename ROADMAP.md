# ROADMAP.md — NOTN

This roadmap defines **what to work on next**, in what order, and what is explicitly **out of scope** at each stage.
It exists to keep development focused and to prevent unnecessary refactors or scope creep.

Codex and other AI assistants should follow this roadmap strictly.

---

## Guiding Rules

- Work on **one milestone at a time**
- Prefer small, incremental changes
- Do not refactor completed milestones without justification
- Do not implement future mechanics early
- UI should always lag slightly behind data models

---

## Milestone 1 — Map Foundation (CURRENT)

**Goal:** Lock down a correct, reusable hex map system.

### Tasks
- [x] Render flat-top hex grid using SVG
- [x] Generate hex-shaped board (axial radius R)
- [x] Support negative coordinates correctly
- [x] Fix column parity bug for flat-top layout
- [ ] Extract all map logic into a dedicated module (`src/game/map`)
- [ ] Define map-related types (Tile, MapData, coordinates)
- [ ] Implement neighbor calculation helpers
- [ ] Implement corner tile detection
- [ ] Implement start tile selection (5 corners + center)

### Non-Goals
- No player actions
- No turns
- No resources
- No UI panels beyond selection/highlight

---

## Milestone 2 — Tile State & Visual Semantics

**Goal:** Give tiles meaningful state without gameplay mechanics.

### Tasks
- [ ] Add tile fields:
  - owner
  - kind (normal / start / center / special)
  - threat (default 0)
- [ ] Visually differentiate tile kinds
- [ ] Visually indicate ownership (colors/patterns)
- [ ] Highlight center tile distinctly
- [ ] Ensure selection state remains UI-only

### Non-Goals
- No combat
- No actions
- No progression systems

---

## Milestone 3 — Minimal UI Overlay (Inspector Panel)

**Goal:** Make the game state inspectable.

### Tasks
- [ ] Add a minimal UI overlay panel
- [ ] Display selected tile information:
  - coordinates
  - owner
  - threat
  - kind
- [ ] Add placeholder action buttons (disabled)
- [ ] Add placeholder player indicator

### Non-Goals
- No real actions
- No turn resolution
- No resource management

---

## Milestone 4 — Player Model (Data Only)

**Goal:** Introduce players without gameplay complexity.

### Tasks
- [ ] Define Player model:
  - id (0–4)
  - name
  - color
  - startTileId
- [ ] Assign ownership of starting tiles
- [ ] Render player ownership on the map
- [ ] Ensure inactive players do not block progress

### Non-Goals
- No abilities
- No roles
- No inventories

---

## Milestone 5 — Turn Skeleton

**Goal:** Establish turn structure without mechanics.

### Tasks
- [ ] Define Turn model
- [ ] Track current turn number
- [ ] Track whose turn it is
- [ ] Allow skipping inactive players
- [ ] Display turn info in UI

### Non-Goals
- No turn-based actions yet
- No timers
- No penalties

---

## Milestone 6 — Environmental Threat System (Early)

**Goal:** Introduce PvE pressure.

### Tasks
- [ ] Implement threat propagation rules
- [ ] Increase threat over time
- [ ] Visualize threat on tiles
- [ ] Add setbacks (not game over)

### Non-Goals
- No win/lose conditions yet
- No boss mechanics

---

## Explicit Non-Goals (Global)

The following are **out of scope until further notice**:

- PvP mechanics
- Real-time combat
- Monetization
- Public accounts or matchmaking
- Daily login incentives
- Heavy animations or 3D graphics
- App-store deployment

---

## Usage Notes

- This roadmap is intentionally conservative.
- Changes should be made **only when a milestone is complete**.
- If unsure, ask before expanding scope.

---

_End of ROADMAP.md_