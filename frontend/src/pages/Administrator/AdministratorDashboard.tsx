import { Link } from "react-router-dom";

export default function AdministratorDashboard() {
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
        Warehouse Administrator Dashboard 👔
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
          to="/administrator/shipping-charges"
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
          <h3>Handle Shipping & Charges</h3>
          <p>Manage shipping charges for orders</p>
        </Link>

        <Link
          to="/administrator/orders"
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
          <h3>View All Orders</h3>
          <p>View all customer orders</p>
        </Link>

        <Link
          to="/administrator/weight-brackets"
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
          <h3>Set Weight Brackets</h3>
          <p>Configure shipping weight brackets</p>
        </Link>

        <Link
          to="/administrator/search-orders"
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
          <h3>Search Orders</h3>
          <p>Search orders by filters</p>
        </Link>
      </div>
    </div>
  );
}