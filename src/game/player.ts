import type { TileId } from "./map";

export type PlayerId = string;

export type Player = {
  id: PlayerId;
  name?: string;
  color: string;
  startTileId: TileId;
};

const PLAYER_PALETTE = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
];

export function createPlayers(startTileIds: TileId[], count: number): Player[] {
  const clampedCount = Math.max(1, Math.min(5, Math.floor(count)));
  const availableStarts = startTileIds.slice(0, 5);
  const selectedStarts = availableStarts.slice(0, clampedCount);

  return selectedStarts.map((startTileId, index) => {
    const playerNumber = index + 1;
    return {
      id: `player-${playerNumber}`,
      name: `Player ${playerNumber}`,
      color: PLAYER_PALETTE[index % PLAYER_PALETTE.length],
      startTileId,
    };
  });
}
