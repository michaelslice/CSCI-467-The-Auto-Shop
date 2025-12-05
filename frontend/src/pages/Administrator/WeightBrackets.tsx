import { useState } from "react";
import { Link } from "react-router-dom";

type WeightBracket = {
  min_weight: number;
  max_weight: number;
  charge: number;
};

export default function WeightBrackets() {
  const [brackets, setBrackets] = useState<WeightBracket[]>([
    { min_weight: 0, max_weight: 10, charge: 5.0 },
    { min_weight: 10, max_weight: 25, charge: 10.0 },
    { min_weight: 25, max_weight: 50, charge: 15.0 },
    { min_weight: 50, max_weight: 100, charge: 25.0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateBracket = (index: number, field: keyof WeightBracket, value: number) => {
    const updated = [...brackets];
    updated[index] = { ...updated[index], [field]: value };
    setBrackets(updated);
  };

  const addBracket = () => {
    setBrackets([...brackets, { min_weight: 0, max_weight: 0, charge: 0 }]);
  };

  const removeBracket = (index: number) => {
    setBrackets(brackets.filter((_, i) => i !== index));
  };

  const saveBrackets = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const response = await fetch("http://127.0.0.1:8000/administrator/weight_brackets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brackets }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save weight brackets");
      }

      const data = await response.json();
      setSuccess(data.message || "Weight brackets saved successfully");
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
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Set Weight Brackets</h1>
          <Link to="/administrator/dashboard" style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
            ← Back to Dashboard
          </Link>
        </div>

        <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px" }}>
          <div style={{ marginBottom: "1rem" }}>
            <button
              onClick={addBracket}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginBottom: "1rem",
              }}
            >
              Add Bracket
            </button>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #ccc" }}>
                <th style={{ textAlign: "left", padding: "0.75rem" }}>Min Weight (lbs)</th>
                <th style={{ textAlign: "left", padding: "0.75rem" }}>Max Weight (lbs)</th>
                <th style={{ textAlign: "left", padding: "0.75rem" }}>Charge ($)</th>
                <th style={{ textAlign: "center", padding: "0.75rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brackets.map((bracket, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "0.75rem" }}>
                    <input
                      type="number"
                      value={bracket.min_weight}
                      onChange={(e) => updateBracket(index, "min_weight", parseFloat(e.target.value) || 0)}
                      style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100px" }}
                    />
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <input
                      type="number"
                      value={bracket.max_weight}
                      onChange={(e) => updateBracket(index, "max_weight", parseFloat(e.target.value) || 0)}
                      style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100px" }}
                    />
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <input
                      type="number"
                      step="0.01"
                      value={bracket.charge}
                      onChange={(e) => updateBracket(index, "charge", parseFloat(e.target.value) || 0)}
                      style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100px" }}
                    />
                  </td>
                  <td style={{ padding: "0.75rem", textAlign: "center" }}>
                    <button
                      onClick={() => removeBracket(index)}
                      style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
            onClick={saveBrackets}
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
            {loading ? "Saving..." : "Save Weight Brackets"}
          </button>
        </div>
      </div>
    </div>
  );
}