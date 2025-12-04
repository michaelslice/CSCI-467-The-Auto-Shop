import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type UserRole = "default" | "customer" | "worker" | "admin";

export default function Navbar() {
  const [user, setUser] = useState<UserRole>("default");

  useEffect(() => {
    const storedUser = (localStorage.getItem("user") as UserRole) || "default";
    setUser(storedUser);
  }, []);

  return (
    <div className="navbar">
      {user === "default" && (
        <div>
          <Link to="/">Home</Link>
          <Link to="/signin">Sign in</Link>
        </div>
      )}

      {user === "customer" && (
        <div>
          <Link to="/">Customer Home</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/shopping-cart">Shopping Cart</Link>
          <Link to="/signout">Logout</Link>
        </div>
      )}

      {user === "worker" && (
        <div>
          <Link to="/worker/dashboard">Dashboard</Link>
          <Link to="/worker/items-to-pack">Items to Pack</Link>
          <Link to="/worker/packing-labels">Packing Labels</Link>
          <Link to="/worker/invoice-shipping-label">Invoice / Shipping Label</Link>
          <Link to="/worker/completed-orders">Completed Orders</Link>
          <Link to="/worker/mark-shipped">Mark Shipped</Link>
          <Link to="/worker/send-confirmation">Send Confirmation</Link>
          <Link to="/signout">Logout</Link>
        </div>
      )}

      {user === "admin" && (
        <div>
          <Link to="/administrator/dashboard">Admin Dashboard</Link>
          <Link to="/administrator/orders">All Orders</Link>
          <Link to="/administrator/shipping-charges">Shipping Charges</Link>
          <Link to="/administrator/weight-brackets">Weight Brackets</Link>
          <Link to="/administrator/search-orders">Search Orders</Link>
          <Link to="/signout">Logout</Link>
        </div>
      )}
    </div>
  );
}