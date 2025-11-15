import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

const CART_KEY = "cart";

export default function ShoppingCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
        setItems([]);
      }
    }
  }, []);

  function saveAndSet(newItems: CartItem[]) {
    setItems(newItems);
    localStorage.setItem(CART_KEY, JSON.stringify(newItems));
  }

  function changeQuantity(productId: string, delta: number) {
    const updated = items
      .map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveAndSet(updated);
  }

  function removeItem(productId: string) {
    const updated = items.filter((item) => item.productId !== productId);
    saveAndSet(updated);
  }

  function clearCart() {
    saveAndSet([]);
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Shopping Cart 🛒
      </h1>

      {items.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <p>Your cart is currently empty.</p>
          <Link to="/landing">Browse products</Link>
        </div>
      ) : (
        <>
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              backgroundColor: "#fff7e8",
              padding: "1.5rem",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            {items.map((item) => (
              <div
                key={item.productId}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 2fr 2fr auto", // name | qty | total | remove
                  alignItems: "center",
                  padding: "0.75rem 0",
                  borderBottom: "1px solid #e0d2bd",
                  columnGap: "1rem",
                }}
              >
                {/* 1️⃣ Name + price each */}
                <div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontSize: "0.9rem", color: "#555" }}>
                    ${item.price.toFixed(2)} each
                  </div>
                </div>

                {/* 2️⃣ Quantity controls – this column will line up */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => changeQuantity(item.productId, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => changeQuantity(item.productId, 1)}
                  >
                    +
                  </button>
                </div>

                {/* 3️⃣ Line total */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "left", // moves column a bit left
                    gap: "0.25rem",
                  }}
                >
                  <div style={{ fontWeight: 500 }}>
                    Price: ${item.price.toFixed(2)}
                  </div>
                  <div style={{ fontWeight: 600, color: "#333" }}>
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                {/* 4️⃣ Remove button */}
                <div style={{ textAlign: "right" }}>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: 700,
              }}
            >
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                gap: "0.5rem",
              }}
            >
              <button type="button" onClick={clearCart}>
                Clear Cart
              </button>
              <button type="button" disabled>
                Checkout (coming soon)
              </button>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <Link
              to="/landing"
              style={{
                color: "#ffdd57", //
                fontWeight: "600",
              }}
            >
              ← Continue shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
