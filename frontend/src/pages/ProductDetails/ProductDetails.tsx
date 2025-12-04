import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  availableQty: number;
  imageUrl: string;
  weight: number;
};

type LocationState = {
  product?: Product;
};

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

const CART_KEY = "cart";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const product = state?.product;

  const [message, setMessage] = useState<string | null>(null);

  function addToCart(prod: Product) {
    const raw = localStorage.getItem(CART_KEY);
    let cart: CartItem[] = raw ? JSON.parse(raw) : [];

    const existing = cart.find((c) => c.productId === prod.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        productId: prod.id,
        name: prod.name,
        price: prod.price,
        quantity: 1,
      });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    setMessage(`Added ${prod.name} to cart.`);
    setTimeout(() => setMessage(null), 1500);
  }

  function getStockStatus(qty: number): string {
    if (qty === 0) return "Out of stock";
    if (qty < 5) return "Low stock";
    if (qty < 20) return "Limited stock";
    return "In stock";
  }

  const stockStatus = product ? getStockStatus(product.availableQty) : "";
  const pricePerKg =
    product && product.weight > 0
      ? (product.price / product.weight).toFixed(2)
      : null;

  if (!product) {
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
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            backgroundColor: "#fff7e8",
            padding: "1.5rem 2rem 2rem",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <h1>Product Details</h1>
          <p>
            We couldn&apos;t load details for product{" "}
            <strong>{productId}</strong>.
          </p>
          <p>This can happen if you refreshed the page.</p>
          <button type="button" onClick={() => navigate("/")}>
            ← Back to Product Catalog
          </button>
        </div>
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
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#fff7e8",
          padding: "1.5rem 2rem 2rem",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h1 style={{ margin: 0 }}>{product.name}</h1>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              border: "none",
              background: "#ffffff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ← Back to Catalog
          </button>
        </div>

        {message && (
          <p
            style={{
              marginTop: 0,
              marginBottom: "0.75rem",
              color: "green",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: "1.5rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#f7ebd7",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                maxWidth: "100%",
                maxHeight: "250px",
                objectFit: "contain",
                borderRadius: "4px",
                backgroundColor: "#fff",
              }}
            />
          </div>

          <div>
            <p style={{ marginTop: 0 }}>{product.description}</p>

            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "0.25rem",
              }}
            >
              ${product.price.toFixed(2)}
            </p>

            <p style={{ margin: 0 }}>
              <strong>Available:</strong> {product.availableQty} in stock
            </p>

            <p style={{ margin: 0 }}>
              <strong>Weight:</strong> {product.weight} kg
            </p>

            <p style={{ margin: 0, marginTop: "0.4rem" }}>
              <strong>Product ID:</strong> {product.id}
            </p>

            <button
              type="button"
              onClick={() => addToCart(product)}
              style={{
                marginTop: "0.75rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#222",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
            <hr
              style={{
                margin: "1.25rem 0 0.75rem",
                border: "none",
                borderTop: "1px solid #e0d2bd",
              }}
            />

            <h3 style={{ marginTop: 0, marginBottom: "0.75rem" }}>
              Product Specifications
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr",
                rowGap: "0.35rem",
                columnGap: "0.75rem",
                fontSize: "0.95rem",
              }}
            >
              <div style={{ fontWeight: 600 }}>Part Number / SKU</div>
              <div>{product.id}</div>

              <div style={{ fontWeight: 600 }}>Category</div>
              <div>
                {product.name.toLowerCase().includes("brake")
                  ? "Brake System"
                  : product.name.toLowerCase().includes("filter")
                  ? "Filters"
                  : product.name.toLowerCase().includes("tire")
                  ? "Tires & Wheels"
                  : "General Auto Part"}
              </div>

              <div style={{ fontWeight: 600 }}>Stock Status</div>
              <div>
                {stockStatus} ({product.availableQty} units available)
              </div>

              <div style={{ fontWeight: 600 }}>Weight</div>
              <div>{product.weight} kg</div>

              {pricePerKg && (
                <>
                  <div style={{ fontWeight: 600 }}>Approx. Price per kg</div>
                  <div>${pricePerKg}</div>
                </>
              )}

              <div style={{ fontWeight: 600 }}>Estimated Shipping</div>
              <div>Ships in 3–5 business days from our warehouse.</div>

              <div style={{ fontWeight: 600 }}>Return Policy</div>
              <div>
                30-day return window on unused parts in original packaging.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}