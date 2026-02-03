# PROJECT_CONTEXT.md — NOTN

## Overview

NOTN is a private, asynchronous, turn-based strategy game for **exactly 5 players** (friends).

Primary focus:
- **Cooperative PvE** (with room for limited PvP later — not a current focus)
- Long-term strategy over weeks/months
- Deterministic, testable game logic
- Asynchronous play (players can drop in/out)

## Tech Stack

Client:
- Vite + React + TypeScript
- SVG rendering (flat-top hexes)
- Mobile-friendly, no SSR, no SEO concerns

Server (later milestone):
- Server-authoritative state
- Clients submit **intent**, not state
- Server validates and updates world state

Auth (later milestone):
- Simple username/password (private access only)

## Current Implementation Snapshot

Map:
- Hex-shaped board generated from axial radius `R`
- Tiles stored as `{ row, col }` (offset coords)
- Helpers exist for converting offset <-> axial when needed
- Deterministic special tiles:
  - Center tile: `kind="center"`
  - Five player start corners: `kind="start"`
  - Reserved top-most corner: `kind="special"`
  - Everything else: `kind="normal"`

Tile fields (current):
- `id`
- `row`
- `col`
- `owner` (number | null for now)
- `kind` ("normal" | "start" | "center" | "special")
- `threat` (number, default 0)

UI:
- Click-to-select tiles works
- `kind` affects temporary tile styling
- `threat` is rendered inside each tile

## Development Philosophy

- Deterministic core logic
- Core game logic must **not depend on React**
- UI state is separate from game state
- Minimal abstractions, incremental progress
- Prioritize correctness and clarity over polish

## Current Focus

**Milestone 3:** Minimal Inspector UI (read-only) so selected tile state is inspectable.
No gameplay actions, turns, resources, or server work yet.

_End of PROJECT_CONTEXT.md_
