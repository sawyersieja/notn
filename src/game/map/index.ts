export type TileId = string;

export type Tile = {
  id: TileId;
  row: number;
  col: number;
  owner: number | null; // later: PlayerId | null
};

type AxialCoord = {
  q: number;
  r: number;
};

const AXIAL_DIRECTIONS: AxialCoord[] = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

export type HexMap = {
  radius: number;
  tiles: Tile[];
};

function axialToOddQOffset({ q, r }: AxialCoord): { row: number; col: number } {
  const col = q;
  const row = r + (q - (q & 1)) / 2;
  return { row, col };
}

function oddQOffsetToAxial({ row, col }: { row: number; col: number }): AxialCoord {
  const q = col;
  const r = row - (col - (col & 1)) / 2;
  return { q, r };
}

export function buildTileIndex(tiles: Tile[]): Map<TileId, Tile> {
  return new Map(tiles.map((tile) => [tile.id, tile]));
}

function makeHexTiles(radius: number): Tile[] {
  const tiles: Tile[] = [];
  for (let q = -radius; q <= radius; q++) {
    const rMin = Math.max(-radius, -q - radius);
    const rMax = Math.min(radius, -q + radius);
    for (let r = rMin; r <= rMax; r++) {
      const { row, col } = axialToOddQOffset({ q, r });
      tiles.push({
        id: `${row},${col}`,
        row,
        col,
        owner: null,
      });
    }
  }
  return tiles;
}

export function createHexMap(radius: number): HexMap {
  return {
    radius,
    tiles: makeHexTiles(radius),
  };
}

export function getNeighborTiles(
  map: HexMap,
  tile: Tile,
  tileIndex: Map<TileId, Tile> = buildTileIndex(map.tiles),
): Tile[] {
  const { q, r } = oddQOffsetToAxial(tile);

  return AXIAL_DIRECTIONS.map((direction) => ({
    q: q + direction.q,
    r: r + direction.r,
  }))
    .map((coord) => axialToOddQOffset(coord))
    .map((coord) => tileIndex.get(`${coord.row},${coord.col}`))
    .filter((neighbor): neighbor is Tile => Boolean(neighbor));
}

export function getStartTiles(
  map: HexMap,
  tileIndex: Map<TileId, Tile> = buildTileIndex(map.tiles),
): { center: Tile; playerStarts: Tile[] } {
  const center = tileIndex.get("0,0");

  if (!center) {
    throw new Error("Center tile not found for map.");
  }

  const cornerCoords: AxialCoord[] = [
    { q: 0, r: -map.radius },
    { q: map.radius, r: -map.radius },
    { q: map.radius, r: 0 },
    { q: 0, r: map.radius },
    { q: -map.radius, r: map.radius },
    { q: -map.radius, r: 0 },
  ];

  const playerStarts = cornerCoords
    .map((coord) => axialToOddQOffset(coord))
    .map((coord) => tileIndex.get(`${coord.row},${coord.col}`))
    .filter((tile): tile is Tile => Boolean(tile))
    .slice(0, 5);

  return { center, playerStarts };
}
