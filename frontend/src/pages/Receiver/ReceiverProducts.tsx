import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  number: number;
  description: string;
  price: number;
  weight: number;
  picture_path_url: string;
  quantity: number;
};

export default function ReceiverProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/receiver/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
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
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "red" }}>Error: {error}</p>
        <button onClick={fetchProducts}>Retry</button>
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
          <h1>Browse Products</h1>
          <Link to="/receiver/dashboard" style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
            ← Back to Dashboard
          </Link>
        </div>

        {products.length === 0 ? (
          <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
            <p>No products found.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
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