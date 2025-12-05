import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Order = {
  id: number;
  user_id: number;
  order_date: string;
  total_amount: number;
  status: string;
  items: OrderItem[];
};

type OrderItem = {
  id: number;
  order_id: number;
  part_number: number;
  description: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/administrator/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/administrator/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update status");
      const updatedOrder = await response.json();

      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.id === orderId ? { ...o, status: updatedOrder.status } : o))
      );
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error updating status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Shipped":
        return "blue";
      case "Cancelled":
        return "red";
      default:
        return "orange";
    }
  };

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Loading orders...</p>
      </div>
    );

  if (error)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "red" }}>Error: {error}</p>
        <button onClick={fetchAllOrders}>Retry</button>
      </div>
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
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>All Orders</h1>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={fetchAllOrders}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#fff7e8",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Refresh
            </button>
            <Link
              to="/administrator/dashboard"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#fff7e8",
                borderRadius: "5px",
                textDecoration: "none",
                color: "#333",
              }}
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div
            style={{
              backgroundColor: "#fff7e8",
              padding: "2rem",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <p>No orders found.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {orders.map((order) => (
              <div
                key={order.id}
                style={{
                  backgroundColor: "#fff7e8",
                  padding: "1.5rem",
                  borderRadius: "10px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
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
                    <h3>Order #{order.id}</h3>
                    <p>User ID: {order.user_id}</p>
                    <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
                    <p>
                      Status:{" "}
                      <span
                        style={{
                          color: getStatusColor(order.status),
                          fontWeight: "bold",
                        }}
                      >
                        {order.status}
                      </span>
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                      Total: ${order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {order.items && order.items.length > 0 && (
                  <div style={{ marginBottom: "1rem" }}>
                    <h4>Items:</h4>
                    <ul>
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.description} - Qty: {item.quantity} @ ${item.unit_price.toFixed(2)} = $
                          {item.subtotal.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <label style={{ fontWeight: "bold" }}>Update Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    style={{
                      padding: "0.25rem 0.5rem",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      fontWeight: "bold",
                      color: getStatusColor(order.status),
                      cursor: "pointer",
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}