import { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("user_data");
    const parsed = raw ? JSON.parse(raw) : null;

    const uid = parsed?.user?.id ?? null;
    setUserId(uid);

    if (uid) {
      fetchOrderHistory(uid);
    } else {
      setError("Unable to find user ID in localStorage.");
      setLoading(false);
    }
  }, []);

  async function fetchOrderHistory(uid: number) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/order_history?user_id=${uid}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order history");
      }

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
      {/* Error */}
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

      {/* Loading */}
      {loading && (
        <p
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            marginTop: "2rem",
          }}
        >
          Loading order history...
        </p>
      )}

      {/* No Orders */}
      {!loading && orders.length === 0 && !error && (
        <p
          style={{
            textAlign: "center",
            marginTop: "2rem",
            fontStyle: "italic",
          }}
        >
          No orders found for this user.
        </p>
      )}

      {/* Orders */}
      {!loading && orders.length > 0 && (
        <section style={{ marginTop: "2rem" }}>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Order History
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            {orders.map((order: any) => (
              <article
                key={order.order_id}
                style={{
                  backgroundColor: "#fff1dd",
                  border: "1px solid #000",
                  borderRadius: "8px",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <h3 style={{ margin: 0 }}>
                      Order #{order.order_id}
                    </h3>
                    <p style={{ margin: 0, fontSize: "0.9rem" }}>
                      {formatDate(order.order_date)}
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "6px",
                        backgroundColor: "#ddd",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {order.status}
                    </span>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      ${order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div>
                  {order.items.map((item: any, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        padding: "0.75rem 0",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      {item.picture_path_url && (
                        <img
                          src={item.picture_path_url}
                          alt={item.description}
                          width={80}
                          height={80}
                          style={{
                            objectFit: "cover",
                            borderRadius: "4px",
                            border: "1px solid #bbb",
                          }}
                        />
                      )}

                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontWeight: "bold" }}>
                          {item.description}
                        </p>
                        <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                          Part #: {item.part_number}
                        </p>
                        <p style={{ margin: "0.25rem 0", fontSize: "0.9rem" }}>
                          Qty: {item.quantity} × ${item.unit_price.toFixed(2)}
                        </p>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: 0, fontWeight: "bold" }}>
                          ${item.subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}