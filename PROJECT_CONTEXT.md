# PROJECT_CONTEXT.md — NOTN

## Overview

NOTN is a private, turn-based, asynchronous cooperative strategy game designed for **5 players**.

The game is:

- **Persistent**
- **Long-running** (3–12 months per campaign)
- **Always available**
- **Co-op PvE only**

Players cooperate against environmental systems and hostile world forces.

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

## Map Design (Current Focus)

### Grid Type
- Hex grid
- **Flat-top hexes**
- Clickable tiles
- Most player actions begin by selecting a tile

### Map Shape
- Hex-shaped board (axial hex radius `R`)
- 5 player start positions near **5 outer corners**
- Center tile represents a **neutral / hostile environmental force**
- One natural hex corner may be unused or reserved for special content

This layout ensures:
- Fair spatial balance
- Equal distance to center
- Clean geometry

---

## Coordinates & Storage

- Tiles are stored using **offset coordinates**:  
  `{ row, col }`
- Neighbor calculations may internally convert to **axial coordinates**
- Rendering math derives pixel positions from a single `size` (radius)
- No per-tile width/height storage

---

## Tile Model (Early)

Tiles are **data-only** objects.

Initial fields:
- `id`
- `row`
- `col`
- `owner: PlayerId | null`

Tiles must **not** store UI state such as:
- selection
- hover
- highlight

---

## Player Model (Early)

- Exactly **5 human players**
- Each player has a starting region
- Players may be inactive temporarily without breaking the game
- Roles / heroes are lightweight and non-MMO-style

---

## Development Status

### Current Focus
- Hex grid generation
- Hex-shaped map creation
- SVG rendering
- Tile selection & highlighting
- Neighbor logic
- Start position selection (5 corners + center)

### Future Systems
- Turn engine
- Threat propagation
- Player actions
- Roles / abilities
- Persistence
- Narrative flavor

---

## Non-Goals

The following are explicitly **out of scope**:

- PvP mechanics
- Real-time combat
- Monetization
- Public matchmaking
- Heavy graphics or animations
- Daily login chores or grind mechanics

---

## Guidance for AI Assistants

When assisting with this project:

- Prefer **simple, explicit TypeScript**
- Avoid unnecessary abstractions
- Avoid re-architecture without justification
- Ask clarifying questions when unsure
- Optimize for shipping a working game

---

_End of PROJECT_CONTEXT.md_