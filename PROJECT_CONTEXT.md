# PROJECT_CONTEXT.md — NOTN

## Overview

NOTN is a private, asynchronous, turn-based strategy game for a **small number of players (initially 1–5)**.

The game is:
- Persistent
- Long-running (weeks to months per campaign)
- Always available
- Asynchronous (players may be inactive between turns)

Primary focus:
- Cooperative PvE
- Long-term strategic pressure
- Deterministic, testable game logic

Limited PvP mechanics may be explored later, but are **not a current focus**.

---

## Tech Stack

### Client
- Vite + React + TypeScript
- SVG rendering (flat-top hex grid)
- Mobile-friendly
- No SSR, no SEO concerns

### Server (future milestone)
- Server-authoritative state
- Clients submit **intent**, not state
- Server validates and updates the world

### Authentication (future milestone)
- Simple username / password
- Private access only

---

## Current Implementation Snapshot

### Map
- Hex-shaped board generated from axial radius `R`
- Tiles stored using offset coordinates `{ row, col }`
- Axial <-> offset helpers exist for internal logic
- Deterministic special tiles:
  - Center tile: `kind = "center"`
  - Five outer corner start tiles: `kind = "start"`
  - Reserved top-most corner: `kind = "special"`
  - All other tiles: `kind = "normal"`

### Tile Fields (current)
- `id`
- `row`
- `col`
- `ownerId: string | null`
- `kind: "normal" | "start" | "center" | "special"`
- `threat: number` (default `0`)

### UI
- Click-to-select tiles
- Temporary visual styling by `kind`
- `threat` value rendered inside tiles
- Inspector panel displays selected tile fields

---

## Player Model (Current Direction)

- Player count is **flexible (1–5)**
- Players are identified internally by a stable `playerId: string`
- Players may optionally have a display name / alias
- Tiles reference ownership via `ownerId`
- UI should display player-friendly names when available

There is **no turn logic or gameplay behavior yet** — players are data-only.

---

## Development Philosophy

- Deterministic core logic
- Core game logic must **not depend on React**
- UI state is separate from game state
- Minimal abstractions
- Incremental milestones
- Favor clarity and correctness over polish

---

## Current Focus

**Milestone 4 — Player Model (Data Only)**

The goal is to introduce players as data entities and assign starting tile ownership, **without** adding gameplay mechanics, turns, or actions.

---

_End of PROJECT_CONTEXT.md_

