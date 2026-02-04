import { buildTileIndex, createHexMap, getStartTiles, type HexMap } from "./map";
import { createPlayers, type Player } from "./player";

export type GameState = {
  map: HexMap;
  players: Player[];
};

export function createGameState(radius: number, playerCount: number): GameState {
  const map = createHexMap(radius);
  const tileIndex = buildTileIndex(map.tiles);
  const { playerStarts } = getStartTiles(map, tileIndex);
  const players = createPlayers(
    playerStarts.map((tile) => tile.id),
    playerCount,
  );
  const ownerByTileId = new Map(players.map((player) => [player.startTileId, player.id]));

  map.tiles = map.tiles.map((tile) => {
    if (ownerByTileId.has(tile.id)) {
      return { ...tile, ownerId: ownerByTileId.get(tile.id) ?? null };
    }
    return tile;
  });

  return { map, players };
}
