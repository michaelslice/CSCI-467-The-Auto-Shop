import { useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  number: number;
  description: string;
  price: number;
  weight: number;
  picture_path_url: string;
  quantity: number;
};

export default function IdentifyProduct() {
  const [partNumber, setPartNumber] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<"number" | "description">("number");

  const searchProduct = async () => {
    if (searchType === "number" && !partNumber) {
      setError("Please enter a part number");
      return;
    }
    if (searchType === "description" && !description) {
      setError("Please enter a description");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const url = searchType === "number"
        ? `http://127.0.0.1:8000/receiver/identify_product?part_number=${partNumber}`
        : `http://127.0.0.1:8000/receiver/identify_product?description=${encodeURIComponent(description)}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to identify product");
      }

      const data = await response.json();

      setProducts(Array.isArray(data) ? data : [data]);
    } 
    catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setProducts([]);
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
          <h1>Identify Product</h1>
          <Link to="/receiver/dashboard" style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
            ← Back to Dashboard
          </Link>
        </div>

        <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px", marginBottom: "2rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
              Search By:
            </label>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <label>
                <input
                  type="radio"
                  checked={searchType === "number"}
                  onChange={() => setSearchType("number")}
                  style={{ marginRight: "0.5rem" }}
                />
                Part Number
              </label>
              <label>
                <input
                  type="radio"
                  checked={searchType === "description"}
                  onChange={() => setSearchType("description")}
                  style={{ marginRight: "0.5rem" }}
                />
                Description
              </label>
            </div>
          </div>

          {searchType === "number" ? (
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="number"
                placeholder="Enter Part Number"
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100%", maxWidth: "300px" }}
              />
            </div>
          ) : (
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100%", maxWidth: "300px" }}
              />
            </div>
          )}

          {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

          <button
            onClick={searchProduct}
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
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {products.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {products.map((product) => (
              <div
                key={product.number}
                style={{
                  backgroundColor: "#fff7e8",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                }}
              >
                <h3>Part #{product.number}</h3>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                <p><strong>Weight:</strong> {product.weight} lbs</p>
                <p><strong>Quantity on Hand:</strong> {product.quantity}</p>
                {product.picture_path_url && (
                  <img
                    src={product.picture_path_url}
                    alt={product.description}
                    style={{ width: "100%", maxWidth: "200px", marginTop: "1rem", borderRadius: "5px" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}