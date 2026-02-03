# PROJECT_CONTEXT.md — NOTN

## Overview

NOTN is a private, asynchronous, turn-based strategy game for a **small fixed group of players**.

- The default scenario uses **5 players** (friends)
- The design should **not hard-code this limit**, allowing fewer players for testing or future variants

Primary focus:
- **Cooperative PvE** (with room for limited PvP later — not a current focus)
- Long-term strategy over weeks or months
- Deterministic, testable game logic
- Asynchronous play (players can drop in/out between turns)

---

## Tech Stack

### Client
- Vite + React + TypeScript
- SVG rendering (flat-top hexes)
- Mobile-friendly
- No SSR, no SEO concerns

### Server (later milestone)
- Server-authoritative state
- Clients submit **intent**, not state
- Server validates and updates world state

### Authentication (later milestone)
- Simple username/password
- Private access only

---

## Current Implementation Snapshot

### Map
- Hex-shaped board generated from axial radius `R`
- Tiles stored as `{ row, col }` (offset coordinates)
- Helpers exist for converting offset ↔ axial coordinates
- Deterministic special tiles:
  - Center tile: `kind = "center"`
  - Five player start corners: `kind = "start"`
  - Reserved top-most corner: `kind = "special"`
  - All others: `kind = "normal"`

### Tile Fields (current)
- `id`
- `row`
- `col`
- `owner` (`PlayerId | null` — provisional)
- `kind` (`"normal" | "start" | "center" | "special"`)
- `threat` (`number`, default `0`)

### UI
- Click-to-select tiles
- Temporary visual styling based on `kind`
- `threat` value rendered inside each tile
- Inspector panel shows selected tile data (read-only)

---

## Development Philosophy

- Deterministic core logic
- Core game logic must **not depend on React**
- UI state is separate from game state
- Minimal abstractions, incremental progress
- Prioritize correctness and clarity over polish

---

## Current Focus

**Milestone 3 — Minimal Inspector UI**

The goal is observability and debuggability:
- Inspect tile data safely
- No gameplay actions
- No turn engine
- No player system yet

This milestone exists purely to make the current state visible and understandable.

_End of PROJECT_CONTEXT.md_

