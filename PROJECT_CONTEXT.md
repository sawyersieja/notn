# PROJECT_CONTEXT.md — NOTN

## Overview

NOTN is a private, turn-based, asynchronous strategy game designed for **exactly 5 players**.

The game is:

- **Persistent**
- **Long-running** (3–12 months per campaign)
- **Always available**
- **Primarily co-op PvE**, with potential for limited PvP mechanics later

Players primarily cooperate against environmental systems and hostile world forces.  
Direct PvP is **not a current focus**, but the design should avoid foreclosing that possibility entirely.

---

## Tech Stack

### Client
- Vite
- React
- TypeScript
- Mobile-friendly
- No Next.js
- No SSR
- No SEO concerns

### Rendering
- SVG (hex grid rendered via SVG polygons)

### Server
- Server-authoritative game state
- Clients submit **intent**, not state
- Server validates turns and updates world state

### Authentication
- Simple username/password
- Private access only
- No OAuth

---

## Core Design Principles

- Server is the **single source of truth**
- Game logic must be **deterministic and testable**
- Core game logic must **not depend on React**
- UI state is separate from game state
- Minimal visuals
- Minimal abstractions
- Incremental development

This project prioritizes **correctness, clarity, and longevity** over feature count or polish.

---

## Core Gameplay Loop (Conceptual)

1. Server determines whose turn it is
2. That player is permitted to perform actions
3. Player selects a tile they control
4. Player submits an **action intent**
5. Server validates the action
6. Game state updates
7. Victory / loss / pressure conditions are evaluated
8. Player may end their turn, advancing to the next player

Players may be inactive between turns without breaking the game.

---

## Map Design (Current Focus)

- Hex grid
- Flat-top hexes
- Hex-shaped board (axial radius `R`)
- 5 player start positions near 5 outer corners
- Center tile represents a neutral or hostile environmental force

---

## Coordinates & Storage

- Tiles stored as offset coordinates: `{ row, col }`
- Axial coordinates may be used internally
- Rendering derives pixel positions from a single hex `size`

---

## Tile Model (Early)

Tiles are data-only objects:

- `id`
- `row`
- `col`
- `owner: PlayerId | null`

---

## Player Model (Early)

- Exactly 5 human players
- Starting regions
- Asynchronous play supported

---

## Development Status

### Current Focus
- Hex grid generation
- SVG rendering
- Tile selection
- Neighbor logic
- Start position selection

---

## Non-Goals (For Now)

- Real-time combat
- Public matchmaking
- Monetization
- Heavy graphics
- Grind mechanics

---

_End of PROJECT_CONTEXT.md_
