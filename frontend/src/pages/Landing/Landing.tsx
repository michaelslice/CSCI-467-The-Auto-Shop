import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type UserRole = "default" | "customer" | "worker" | "admin";

type Product = {
  number: string;
  description: string;
  price: number;
  quantity: number;
  picture_path_url: string;
  weight: number;
};

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export default function Landing() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [role, setRole] = useState<UserRole>("default");
  const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
  
        const response = await fetch("http://127.0.0.1:8000/parts");
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API did not return JSON. Check your Flask route configuration.");
        }
        
        const data = await response.json();
        setProducts(data);
      } 
      catch (err) {
        console.error("API Error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } 
      finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    return p.description.toLowerCase().includes(term);
  });

  useEffect(() => {
    const storedRole = (localStorage.getItem("user") as UserRole) || "default";
    const storedUsername = localStorage.getItem("username");
    setRole(storedRole);
    setUsername(storedUsername);

    const rawCart = localStorage.getItem("cart");
    if (rawCart) {
      const cart: CartItem[] = JSON.parse(rawCart);
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    }
  }, []);

  function addToCart(product: Product) {
    const raw = localStorage.getItem("cart");
    let cart: CartItem[] = raw ? JSON.parse(raw) : [];

    const existing = cart.find((c) => c.productId === product.number);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        productId: product.number,
        name: product.description,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);

    setMessage(`Added ${product.description} to cart.`);
    setTimeout(() => setMessage(null), 1500);
  }

  return (
    <div
      style={{
        backgroundColor: "#cb842eff",
        paddingTop: "6rem",
        paddingInline: "2rem",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >

      {message && (
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: "green",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      {error && (
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          Error: {error}
        </p>
      )}

      <section style={{ marginTop: "2rem", minHeight: "600px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          <aside
            style={{
              width: "260px",
              flexShrink: 0,
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "#fff1dd",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "0.75rem",
                fontSize: "1rem",
              }}
            >
              Search Products
            </h3>
            <label
              htmlFor="product-search"
              style={{
                display: "block",
                fontSize: "0.85rem",
                marginBottom: "0.25rem",
              }}
            >
              Search by description
            </label>
            <input
              id="product-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., brake, battery, tire..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "0.4rem 0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
              }}
            />
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              style={{
                fontSize: "0.85rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid #534d97ff",
                backgroundColor: "#b65757ff",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </aside>

          <div style={{ flex: 1 }}>
            {loading && (
              <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
                Loading products...
              </p>
            )}

            {!loading && filteredProducts.length === 0 && (
              <p style={{ fontStyle: "italic", color: "#000000e6" }}>
                No products match your search.
              </p>
            )}

            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              }}
            >
              {filteredProducts.map((p) => (
                <article
                  key={p.number}
                  style={{
                    border: "1px solid #0e0d0dff",
                    borderRadius: "8px",
                    padding: "1rem",
                    backgroundColor: "#f4e0bcff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                  }}
                >
                  <img
                    src={p.picture_path_url}
                    alt={p.description}
                    width={160}
                    height={100}
                    style={{
                      objectFit: "contain",
                      borderRadius: "4px",
                      display: "block",
                      margin: "0 auto",
                      backgroundColor: "#fff",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>Part #{p.number}</h3>
                    <p style={{ margin: "0.25rem 0" }}>{p.description}</p>
                    <p style={{ margin: "0.25rem 0", fontWeight: "bold" }}>
                      ${p.price.toFixed(2)}
                    </p>
                    <p
                      style={{
                        margin: "0.25rem 0",
                        fontSize: "0.85rem",
                        color: "#555",
                      }}
                    >
                      Available: {p.quantity}
                    </p>
                    <p
                      style={{
                        margin: "0.25rem 0",
                        fontSize: "0.85rem",
                        color: "#555",
                      }}
                    >
                      Weight: {p.weight} lbs
                    </p>
                    <div style={{ marginTop: "0.25rem" }}>
                      <button
                        type="button"
                        onClick={() => addToCart(p)}
                        style={{ marginRight: "0.5rem" }}
                      >
                        Add to Cart
                      </button>
                      <Link to={`/products/${p.number}`} state={{ product: p }}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "2rem", textAlign: "center" }}></div>
    </div>
  );
}