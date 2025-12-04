import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type ItemToPack = {
  order_id: number;
  part_number: number;
  description: string;
  quantity: number;
  order_date: string;
};

export default function ItemsToPack() {
  const [items, setItems] = useState<ItemToPack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItemsToPack();
  }, []);

  const fetchItemsToPack = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/worker/items_to_pack");
      if (!response.ok) {
        throw new Error("Failed to fetch items to pack");
      }
      const data = await response.json();
      setItems(data.items_to_pack || []);

    } 
    catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } 
    finally {
      setLoading(false);
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.order_id]) {
      acc[item.order_id] = [];
    }
    acc[item.order_id].push(item);
    return acc;
  }, {} as Record<number, ItemToPack[]>);

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading items to pack...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "red" }}>Error: {error}</p>
        <button onClick={fetchItemsToPack}>Retry</button>
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
          <h1>Items to Pack 📦</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={fetchItemsToPack} style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", border: "none", cursor: "pointer" }}>
              Refresh
            </button>
            <Link to="/worker/dashboard" style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {items.length === 0 ? (
          <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
            <p>No items to pack at this time.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {Object.entries(groupedItems).map(([orderId, orderItems]) => (
              <div
                key={orderId}
                style={{
                  backgroundColor: "#fff7e8",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                <h2>Order #{orderId}</h2>
                <p>Order Date: {new Date(orderItems[0].order_date).toLocaleDateString()}</p>
                <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ccc" }}>
                      <th style={{ textAlign: "left", padding: "0.5rem" }}>Part Number</th>
                      <th style={{ textAlign: "left", padding: "0.5rem" }}>Description</th>
                      <th style={{ textAlign: "right", padding: "0.5rem" }}>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "0.5rem" }}>{item.part_number}</td>
                        <td style={{ padding: "0.5rem" }}>{item.description}</td>
                        <td style={{ textAlign: "right", padding: "0.5rem" }}>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}