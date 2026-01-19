// src/HexGrid.tsx
import React, { useMemo, useState } from "react";

type TileId = string;

type Tile = {
  id: TileId;
  row: number;
  col: number;
  owner: number | null; // later: PlayerId | null
};

function hexPointsFlatTop(cx: number, cy: number, size: number): string {
  const angles = [0, 60, 120, 180, 240, 300].map((d) => (Math.PI / 180) * d);
  return angles
    .map((a) => {
      const x = cx + size * Math.cos(a);
      const y = cy + size * Math.sin(a);
      return `${x},${y}`;
    })
    .join(" ");
}

type AxialCoord = {
  q: number;
  r: number;
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

export function HexGrid({
  radius = 8,
  size = 24,
}: {
  radius?: number;
  size?: number;
}) {
  const [selectedId, setSelectedId] = useState<TileId | null>(null);

  const tiles = useMemo(() => makeHexTiles(radius), [radius]);

  const hexH = Math.sqrt(3) * size;
  const xStep = 1.5 * size;

  const tileCenters = useMemo(() => {
    return tiles.map((t) => {
      const cx = t.col * xStep;
      const cy = t.row * hexH + (t.col & 1) * (hexH / 2);
      return { id: t.id, cx, cy };
    });
  }, [tiles, xStep, hexH]);

  const bounds = useMemo(() => {
    if (tileCenters.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }
    return tileCenters.reduce(
      (acc, tile) => {
        return {
          minX: Math.min(acc.minX, tile.cx),
          minY: Math.min(acc.minY, tile.cy),
          maxX: Math.max(acc.maxX, tile.cx),
          maxY: Math.max(acc.maxY, tile.cy),
        };
      },
      {
        minX: tileCenters[0].cx,
        minY: tileCenters[0].cy,
        maxX: tileCenters[0].cx,
        maxY: tileCenters[0].cy,
      },
    );
  }, [tileCenters]);

  // Compute SVG bounds so it fits nicely
  const svgW = bounds.maxX - bounds.minX + 2 * size;
  const svgH = bounds.maxY - bounds.minY + 2 * size;

  return (
    <div style={{ overflow: "auto", maxWidth: "100%" }}>
      <svg
        width={svgW}
        height={svgH}
        viewBox={`${bounds.minX - size} ${bounds.minY - size} ${svgW} ${svgH}`}
      >
        {tiles.map((t) => {
          const cx = t.col * xStep;
          const cy = t.row * hexH + (t.col & 1) * (hexH / 2);
          const points = hexPointsFlatTop(cx, cy, size);

          const isSelected = t.id === selectedId;

          return (
            <g key={t.id} onClick={() => setSelectedId(t.id)} style={{ cursor: "pointer" }}>
              <polygon
                points={points}
                stroke="currentColor"
                strokeWidth={isSelected ? 3 : 1}
                fill={isSelected ? "rgba(0,0,0,0.08)" : "transparent"}
              />
              {/* tiny coord label for debugging */}
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={10}>
                {t.row},{t.col}
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{ marginTop: 8 }}>
        Selected: <b>{selectedId ?? "none"}</b>
      </div>
    </div>
  );
}
