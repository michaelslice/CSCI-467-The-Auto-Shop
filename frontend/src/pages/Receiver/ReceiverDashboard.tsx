import { Link } from "react-router-dom";

export default function ReceiverDashboard() {
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
        Warehouse Receiver Dashboard
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
          to="/receiver/receive-products"
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
          <h3>Receive Delivered Products</h3>
          <p>Receive and update inventory</p>
        </Link>

        <Link
          to="/receiver/products"
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
          <h3>Browse Products</h3>
          <p>View all products</p>
        </Link>

        <Link
          to="/receiver/identify-product"
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
          <h3>Identify Product</h3>
          <p>Find product by number or description</p>
        </Link>

        <Link
          to="/receiver/update-quantity"
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
          <h3>Update Quantity on Hand</h3>
          <p>Update inventory quantities</p>
        </Link>

        <Link
          to="/receiver/inventory"
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
          <h3>View Inventory Stock Levels</h3>
          <p>View all inventory levels</p>
        </Link>
      </div>
    </div>
  );
}