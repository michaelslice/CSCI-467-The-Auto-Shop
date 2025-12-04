import { Link } from "react-router-dom";

export default function WorkerDashboard() {
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
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Warehouse Worker Dashboard
      </h1>

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        <Link
          to="/worker/completed-orders"
          style={{
            backgroundColor: "#fff7e8",
            padding: "2rem",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#333",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h3>View Completed Orders</h3>
          <p>View list of completed orders</p>
        </Link>

        <Link
          to="/worker/packing-labels"
          style={{
            backgroundColor: "#fff7e8",
            padding: "2rem",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#333",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h3>Print Packing Labels</h3>
          <p>Print packing labels for orders</p>
        </Link>

        <Link
          to="/worker/items-to-pack"
          style={{
            backgroundColor: "#fff7e8",
            padding: "2rem",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#333",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h3>Retrieve Items to Pack</h3>
          <p>Get list of items to pack</p>
        </Link>

        <Link
          to="/worker/invoice-shipping-label"
          style={{
            backgroundColor: "#fff7e8",
            padding: "2rem",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#333",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h3>Print Invoice & Shipping Label</h3>
          <p>Print invoice and shipping label</p>
        </Link>

        <Link
          to="/worker/mark-shipped"
          style={{
            backgroundColor: "#fff7e8",
            padding: "2rem",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#333",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h3>Mark Order as Shipped</h3>
          <p>Update order status to shipped</p>
        </Link>

        <Link
          to="/worker/send-confirmation"
          style={{
            backgroundColor: "#fff7e8",
            padding: "2rem",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#333",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            textAlign: "center",
          }}
        >
          <h3>Send Shipping Confirmation</h3>
          <p>Send confirmation email to customer</p>
        </Link>
      </div>
    </div>
  );
}