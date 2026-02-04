// src/HexGrid.tsx
import React, { useMemo, useState } from "react";

import { InspectorPanel } from "./components/InspectorPanel";
import type { Tile, TileId } from "./game/map";
import { createGameState } from "./game/world";
import type { Player } from "./game/player";

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
  playerCount = 5,
}: {
  radius?: number;
  size?: number;
  playerCount?: number;
}) {
  const [selectedId, setSelectedId] = useState<TileId | null>(null);

  const { map, players } = useMemo(
    () => createGameState(radius, playerCount),
    [radius, playerCount],
  );
  const tiles = map.tiles;
  const tilesById = useMemo(() => {
    return new Map<TileId, Tile>(tiles.map((tile) => [tile.id, tile]));
  }, [tiles]);
  const playersById = useMemo(() => {
    return new Map<Player["id"], Player>(players.map((player) => [player.id, player]));
  }, [players]);
  const selectedTile = selectedId ? tilesById.get(selectedId) ?? null : null;

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

  const toRgba = (hex: string, alpha: number) => {
    const normalized = hex.replace("#", "");
    const value = Number.parseInt(normalized, 16);
    const r = (value >> 16) & 255;
    const g = (value >> 8) & 255;
    const b = value & 255;
    return `rgba(${r},${g},${b},${alpha})`;
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
          const owner = t.ownerId ? playersById.get(t.ownerId) ?? null : null;

          return (
            <g
              key={t.id}
              onClick={() => setSelectedId((current) => (current === t.id ? null : t.id))}
              style={{ cursor: "pointer" }}
            >
              <polygon
                points={points}
                stroke={tileStyle.stroke}
                strokeWidth={isSelected ? 3 : 1}
                fill={isSelected ? "rgba(0,0,0,0.08)" : tileStyle.fill}
              />
              {owner ? (
                <polygon
                  points={points}
                  fill={toRgba(owner.color, 0.25)}
                  stroke={owner.color}
                  strokeWidth={1.5}
                />
              ) : null}
              <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={10}>
                {t.threat}
              </text>
            </g>
          );
        })}
      </svg>
      <InspectorPanel selectedTile={selectedTile} players={players} />
    </div>
  );
}
