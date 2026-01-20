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

export type HexMap = {
  radius: number;
  tiles: Tile[];
};

function axialToOddQOffset({ q, r }: AxialCoord): { row: number; col: number } {
  const col = q;
  const row = r + (q - (q & 1)) / 2;
  return { row, col };
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
