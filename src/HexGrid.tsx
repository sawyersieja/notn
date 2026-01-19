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

function makeTiles(rows: number, cols: number): Tile[] {
  const tiles: Tile[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
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
  rows = 10,
  cols = 10,
  size = 24,
}: {
  rows?: number;
  cols?: number;
  size?: number;
}) {
  const [selectedId, setSelectedId] = useState<TileId | null>(null);

  const tiles = useMemo(() => makeTiles(rows, cols), [rows, cols]);

  const hexH = Math.sqrt(3) * size;
  const xStep = 1.5 * size;

  // Compute SVG bounds so it fits nicely
  const svgW = (cols - 1) * xStep + 2 * size + size; // a little padding
  const svgH = rows * hexH + hexH / 2 + size; // includes stagger + padding

  return (
    <div style={{ overflow: "auto", maxWidth: "100%" }}>
      <svg width={svgW} height={svgH} viewBox={`${-size} ${-size} ${svgW} ${svgH}`}>
        {tiles.map((t) => {
          const cx = t.col * xStep;
          const cy = t.row * hexH + (t.col % 2) * (hexH / 2);
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