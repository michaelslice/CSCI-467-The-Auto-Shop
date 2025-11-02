import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState("default");

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || "default";
    setUser(storedUser);
  }, []);

  return (
    <div className="navbar">
      {user === "default" && (
        <div>
          <Link to="/landing">Home</Link>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}

      {user === "customer" && (
        <div>
          <Link to="/home">Customer Home</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/shopping-cart">Shopping Cart</Link>
          <Link to="/signout">Logout</Link>
        </div>
      )}

      {user === "worker" && (
        <div>
          <Link to="/dashboard">Worker Dashboard</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/signout">Logout</Link>
        </div>
      )}

      {user === "admin" && (
        <div>
          <Link to="/admin">Admin Panel</Link>
          <Link to="/users">Manage Users</Link>
          <Link to="/signout">Logout</Link>
        </div>
      )}
    </div>
  );
}