import { useState } from "react";
import { Link } from "react-router-dom";

type PackingLabel = {
  order_id: number;
  part_number: number;
  description: string;
  quantity: number;
  user_address: {
    street: string;
    city: string;
  };
};

export default function PackingLabels() {
  const [orderId, setOrderId] = useState<string>("");
  const [labels, setLabels] = useState<PackingLabel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPackingLabels = async () => {
    if (!orderId) {
      setError("Please enter an order ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://127.0.0.1:8000/worker/packing_labels?order_id=${orderId}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch packing labels");
      }
      const data = await response.json();
      setLabels(data.packing_labels || []);
      
    } 
    catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLabels([]);
    } 
    finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
          <h1>Print Packing Labels 📦</h1>
          <Link to="/worker/dashboard" style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
            ← Back to Dashboard
          </Link>
        </div>

        <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px", marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <input
              type="number"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", flex: 1 }}
            />
            <button
              onClick={fetchPackingLabels}
              disabled={loading}
              style={{
                padding: "0.5rem 1.5rem",
                backgroundColor: "#f97316",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Loading..." : "Get Labels"}
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        {labels.length > 0 && (
          <div>
            <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
              <h2>Packing Labels for Order #{orderId}</h2>
              <button
                onClick={handlePrint}
                style={{
                  padding: "0.5rem 1.5rem",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Print Labels
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
              {labels.map((label, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    padding: "1.5rem",
                    borderRadius: "10px",
                    border: "2px dashed #333",
                    pageBreakInside: "avoid",
                  }}
                >
                  <h3>Packing Label</h3>
                  <p><strong>Order ID:</strong> {label.order_id}</p>
                  <p><strong>Part Number:</strong> {label.part_number}</p>
                  <p><strong>Description:</strong> {label.description}</p>
                  <p><strong>Quantity:</strong> {label.quantity}</p>
                  {label.user_address && (
                    <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #ccc" }}>
                      <p><strong>Shipping Address:</strong></p>
                      <p>{label.user_address.street}</p>
                      <p>{label.user_address.city}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

