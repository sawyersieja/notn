import type { Player } from "../game/player";
import type { Tile } from "../game/map";

type InspectorPanelProps = {
  selectedTile: Tile | null;
  players: Player[];
};

export function InspectorPanel({ selectedTile, players }: InspectorPanelProps) {
  const playersById = new Map(players.map((player) => [player.id, player]));
  const owner =
    selectedTile?.ownerId && playersById.has(selectedTile.ownerId)
      ? playersById.get(selectedTile.ownerId) ?? null
      : null;
  const ownerLabel = owner ? `${owner.name ?? owner.id} (${owner.id})` : "none";

  return (
    <aside
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        width: 260,
        padding: 12,
        border: "1px solid rgba(0,0,0,0.2)",
        borderRadius: 8,
        background: "rgba(255,255,255,0.95)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        fontSize: 14,
        lineHeight: 1.4,
      }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: 16 }}>Inspector</h2>
      <section style={{ marginBottom: 12 }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 13, textTransform: "uppercase" }}>
          Selected Tile
        </h3>
        {selectedTile ? (
          <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 8px" }}>
            <dt style={{ fontWeight: 600 }}>id:</dt>
            <dd style={{ margin: 0 }}>{selectedTile.id}</dd>
            <dt style={{ fontWeight: 600 }}>row:</dt>
            <dd style={{ margin: 0 }}>{selectedTile.row}</dd>
            <dt style={{ fontWeight: 600 }}>col:</dt>
            <dd style={{ margin: 0 }}>{selectedTile.col}</dd>
            <dt style={{ fontWeight: 600 }}>kind:</dt>
            <dd style={{ margin: 0 }}>{selectedTile.kind}</dd>
            <dt style={{ fontWeight: 600 }}>owner:</dt>
            <dd style={{ margin: 0 }}>{ownerLabel}</dd>
            <dt style={{ fontWeight: 600 }}>threat:</dt>
            <dd style={{ margin: 0 }}>{selectedTile.threat}</dd>
          </dl>
        ) : (
          <div style={{ color: "rgba(0,0,0,0.6)" }}>No tile selected.</div>
        )}
      </section>
      <section style={{ marginBottom: 12 }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 13, textTransform: "uppercase" }}>
          Players
        </h3>
        {players.length > 0 ? (
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
            {players.map((player) => (
              <li
                key={player.id}
                style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 8 }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: player.color,
                    border: "1px solid rgba(0,0,0,0.3)",
                    marginTop: 3,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>{player.name ?? player.id}</div>
                  <div style={{ color: "rgba(0,0,0,0.6)" }}>
                    {player.id} · start {player.startTileId}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ color: "rgba(0,0,0,0.6)" }}>No players configured.</div>
        )}
      </section>
      <section>
        <h3 style={{ margin: "0 0 6px", fontSize: 13, textTransform: "uppercase" }}>
          Turn (placeholder)
        </h3>
        <div style={{ color: "rgba(0,0,0,0.6)" }}>Turn engine not implemented yet.</div>
      </section>
    </aside>
  );
}
