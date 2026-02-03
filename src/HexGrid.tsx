// src/HexGrid.tsx
import React, { useMemo, useState } from "react";

import { createHexMap, type Tile, type TileId } from "./game/map";

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

export function HexGrid({
  radius = 8,
  size = 24,
}: {
  radius?: number;
  size?: number;
}) {
  const [selectedId, setSelectedId] = useState<TileId | null>(null);

  const tiles = useMemo(() => createHexMap(radius).tiles, [radius]);

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

  const tileKindStyles: Record<Tile["kind"], { fill: string; stroke: string }> = {
    normal: { fill: "rgba(255,255,255,0.9)", stroke: "currentColor" },
    start: { fill: "rgba(59,130,246,0.2)", stroke: "rgb(37,99,235)" },
    center: { fill: "rgba(234,179,8,0.25)", stroke: "rgb(202,138,4)" },
    special: { fill: "rgba(168,85,247,0.2)", stroke: "rgb(147,51,234)" },
  };

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
          const tileStyle = tileKindStyles[t.kind] ?? tileKindStyles.normal;

          return (
            <g key={t.id} onClick={() => setSelectedId(t.id)} style={{ cursor: "pointer" }}>
              <polygon
                points={points}
                stroke={tileStyle.stroke}
                strokeWidth={isSelected ? 3 : 1}
                fill={isSelected ? "rgba(0,0,0,0.08)" : tileStyle.fill}
              />
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={10}>
                {t.threat}
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
