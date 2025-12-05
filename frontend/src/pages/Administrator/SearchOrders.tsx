import { useState } from "react";
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

export default function SearchOrders() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (startDate) params.append("start_date", startDate);
      if (endDate) params.append("end_date", endDate);
      if (status) params.append("status", status);
      if (minPrice) params.append("min_price", minPrice);
      if (maxPrice) params.append("max_price", maxPrice);

      const response = await fetch(`http://127.0.0.1:8000/administrator/search_orders?${params.toString()}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to search orders");
      }

      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setStatus("");
    setMinPrice("");
    setMaxPrice("");
    setOrders([]);
    setError(null);
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
          <h1>Search Orders</h1>
          <Link to="/administrator/dashboard" style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
            ← Back to Dashboard
          </Link>
        </div>

        <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px", marginBottom: "2rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Search Filters</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Start Date:
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                End Date:
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Status:
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Min Price ($):
              </label>
              <input
                type="number"
                step="0.01"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                Max Price ($):
              </label>
              <input
                type="number"
                step="0.01"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", width: "100%" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={searchOrders}
              disabled={loading}
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: loading ? "#ccc" : "#f97316",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {loading ? "Searching..." : "Search Orders"}
            </button>
            <button
              onClick={clearFilters}
              style={{
                padding: "0.75rem 2rem",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Clear Filters
            </button>
          </div>

          {error && (
            <div style={{ padding: "1rem", backgroundColor: "#fee", color: "#c00", borderRadius: "5px", marginTop: "1rem" }}>
              {error}
            </div>
          )}
        </div>

        {orders.length > 0 && (
          <div>
            <h2 style={{ marginBottom: "1rem" }}>Search Results ({orders.length} orders found)</h2>
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
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div>
                      <h3>Order #{order.id}</h3>
                      <p>User ID: {order.user_id}</p>
                      <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
                      <p>Status: <span style={{ 
                        color: order.status === "Completed" ? "green" : order.status === "Shipped" ? "blue" : "orange",
                        fontWeight: "bold"
                      }}>{order.status}</span></p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        Total: ${order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div>
                      <h4>Items:</h4>
                      <ul>
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.description} - Qty: {item.quantity} @ ${item.unit_price.toFixed(2)} = ${item.subtotal.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {orders.length === 0 && !loading && !error && (
          <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px", textAlign: "center" }}>
            <p>No orders found. Use the filters above to search for orders.</p>
          </div>
        )}
      </div>
    </div>
  );
}