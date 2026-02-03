import type { Tile } from "../game/map";

type InspectorPanelProps = {
  selectedTile: Tile | null;
};

export function InspectorPanel({ selectedTile }: InspectorPanelProps) {
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
          <div style={{ display: "grid", gap: 4 }}>
            <div>
              <strong>id:</strong> {selectedTile.id}
            </div>
            <div>
              <strong>row:</strong> {selectedTile.row}
            </div>
            <div>
              <strong>col:</strong> {selectedTile.col}
            </div>
            <div>
              <strong>kind:</strong> {selectedTile.kind}
            </div>
            <div>
              <strong>owner:</strong> {selectedTile.owner ?? "none"}
            </div>
            <div>
              <strong>threat:</strong> {selectedTile.threat}
            </div>
          </div>
        ) : (
          <div style={{ color: "rgba(0,0,0,0.6)" }}>No tile selected.</div>
        )}
      </section>
      <section style={{ marginBottom: 12 }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 13, textTransform: "uppercase" }}>
          Player (placeholder)
        </h3>
        <div style={{ color: "rgba(0,0,0,0.6)" }}>
          Player systems not implemented yet.
        </div>
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
