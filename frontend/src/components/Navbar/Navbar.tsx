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
          {/* use "/" since we have a route for it */}
          <Link to="/">Home</Link>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}

      {user === "customer" && (
        <div>
          {/* send customer “home” to the same Landing page */}
          <Link to="/">Customer Home</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/shopping-cart">Shopping Cart</Link>
          <Link to="/signout">Logout</Link>
        </div>
      )}

      {user === "worker" && (
        <div>
          {/* these routes don’t exist yet – you’ll add pages & routes later */}
          <Link to="/dashboard">Worker Dashboard</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/signout">Logout</Link>
        </div>
      )}

      {user === "admin" && (
        <div>
          {/* map admin panel to /backdoor for now, since that route exists */}
          <Link to="/backdoor">Admin Panel</Link>
          <Link to="/users">Manage Users</Link> {/* add /users route later */}
          <Link to="/signout">Logout</Link>
        </div>
      )}
    </div>
  );
}
