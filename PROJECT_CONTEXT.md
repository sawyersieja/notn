# PROJECT_CONTEXT.md — NOTN

## Overview

NOTN is a private, asynchronous, turn-based strategy game for a **small number of players (initially 1–5)**.

The game is:

* Persistent
* Long-running (weeks to months per campaign)
* Always available
* Asynchronous (players may be inactive between turns)

Primary focus:

* Cooperative PvE
* Long-term strategic pressure
* Deterministic, testable game logic

Limited PvP mechanics may be explored later, but are **not a current focus**.

---

## Tech Stack

### Client

* Vite + React + TypeScript
* SVG rendering (flat-top hex grid)
* Mobile-friendly
* No SSR, no SEO concerns

### Server (future milestone)

* Server-authoritative state
* Clients submit **intent**, not state
* Server validates and updates the world

### Authentication (future milestone)

* Simple username / password
* Private access only

---

## Current Implementation Snapshot

### Map

* Hex-shaped board generated from axial radius `R`
* Tiles stored using offset coordinates `{ row, col }`
* Axial <-> offset helpers exist for internal logic
* Deterministic special tiles:

  * Center tile: `kind = "center"`
  * Five outer corner start tiles: `kind = "start"`
  * Reserved top-most corner: `kind = "special"`
  * All other tiles: `kind = "normal"`

### Tile Fields

* `id`
* `row`
* `col`
* `ownerId: string | null`
* `kind: "normal" | "start" | "center" | "special"`
* `threat: number` (default `0`)

### Player Fields

* `id: string` (stable internal id, e.g. `player-1`)
* `name?: string` (optional display name / alias)
* `color: string`
* `startTileId: TileId`

### World / Game State

* `GameState = { map, players, turn }`
* Players are created deterministically from map start tiles
* Each player owns their `startTileId` by default

### Turn Model (New Direction)

* Turn-based, round-structured gameplay
* Each player gets **exactly one turn per round**
* During their turn, a player may perform **any number of actions**
* Player explicitly ends their turn via an `endTurn` action
* After all players act, a new round begins
* Future: environment / AI may take a turn after player rounds

### UI

* Click-to-select tiles
* Ownership visualized via color overlay (temporary)
* Inspector panel displays:

  * Selected tile details
  * Player list
  * Turn info (read-only)

---

## Development Philosophy

* Deterministic core logic
* Core game logic must **not depend on React**
* UI state is separate from game state
* Minimal abstractions
* Incremental milestones
* Favor clarity and correctness over polish

---

## Current Focus

**Milestone 5 — Turn Engine Skeleton**

The goal is to introduce a minimal, deterministic turn system **without gameplay mechanics**.

*End of PROJECT_CONTEXT.md*
