import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type InventoryItem = {
  part_number: number;
  description: string;
  quantity_on_hand: number;
  price: number;
};

export default function InventoryLevels() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/receiver/inventory");
      if (!response.ok) {
        throw new Error("Failed to fetch inventory");
      }
      const data = await response.json();
      setInventory(data.inventory || []);
    } 
    catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } 
    finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading inventory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "red" }}>Error: {error}</p>
        <button onClick={fetchInventory}>Retry</button>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#cb842eff",
        paddingTop: "5rem",
        paddingInline: "2rem",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Inventory Stock Levels</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={fetchInventory} style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", border: "none", cursor: "pointer" }}>
              Refresh
            </button>
            <Link to="/receiver/dashboard" style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {inventory.length === 0 ? (
          <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
            <p>No inventory items found.</p>
          </div>
        ) : (
          <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #ccc" }}>
                  <th style={{ textAlign: "left", padding: "0.75rem" }}>Part Number</th>
                  <th style={{ textAlign: "left", padding: "0.75rem" }}>Description</th>
                  <th style={{ textAlign: "right", padding: "0.75rem" }}>Quantity on Hand</th>
                  <th style={{ textAlign: "right", padding: "0.75rem" }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.part_number} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "0.75rem" }}>{item.part_number}</td>
                    <td style={{ padding: "0.75rem" }}>{item.description}</td>
                    <td style={{ textAlign: "right", padding: "0.75rem", fontWeight: item.quantity_on_hand < 10 ? "bold" : "normal", color: item.quantity_on_hand < 10 ? "red" : "inherit" }}>
                      {item.quantity_on_hand}
                    </td>
                    <td style={{ textAlign: "right", padding: "0.75rem" }}>${item.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}