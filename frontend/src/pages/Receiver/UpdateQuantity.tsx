import { useState } from "react";
import { Link } from "react-router-dom";

export default function UpdateQuantity() {
  const [partNumber, setPartNumber] = useState<string>("");
  const [newQuantity, setNewQuantity] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateQuantity = async () => {
    if (!partNumber || !newQuantity) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response = await fetch("http://127.0.0.1:8000/receiver/update_quantity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          part_number: parseInt(partNumber),
          quantity: parseInt(newQuantity),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update quantity");
      }

      const data = await response.json();
      setSuccess(data.message || "Quantity updated successfully");
      setPartNumber("");
      setNewQuantity("");
      
    } 
    catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } 
    finally {
      setLoading(false);
    }
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
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Update Quantity on Hand</h1>
          <Link to="/receiver/dashboard" style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
            ← Back to Dashboard
          </Link>
        </div>

        <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Part Number:
            </label>
            <input
              type="number"
              placeholder="Enter Part Number"
              value={partNumber}
              onChange={(e) => setPartNumber(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100%", maxWidth: "300px" }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              New Quantity:
            </label>
            <input
              type="number"
              placeholder="Enter New Quantity"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100%", maxWidth: "300px" }}
            />
          </div>

          {error && (
            <div style={{ padding: "1rem", backgroundColor: "#fee", color: "#c00", borderRadius: "5px", marginBottom: "1rem" }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ padding: "1rem", backgroundColor: "#efe", color: "#0a0", borderRadius: "5px", marginBottom: "1rem" }}>
              {success}
            </div>
          )}

          <button
            onClick={updateQuantity}
            disabled={loading}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: loading ? "#ccc" : "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {loading ? "Updating..." : "Update Quantity"}
          </button>
        </div>
      </div>
    </div>
  );
}