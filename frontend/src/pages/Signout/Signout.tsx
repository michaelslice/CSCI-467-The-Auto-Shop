import { useNavigate } from "react-router-dom";
import backgroundImage from "./Back.jpg";
export default function Signout() {
  const navigate = useNavigate();

  const signOut = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Try to tell the backend we’re signing out (optional)
      await fetch("http://127.0.0.1:8000/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).catch(() => {
        // ignore network / backend errors for frontend logout
      });
    } finally {
      // ALWAYS run this, even if fetch failed
      localStorage.removeItem("user");
      localStorage.removeItem("username");
      localStorage.removeItem("cart");

      // Go to Sign In page (no extra reload needed)
      navigate("/signin", { replace: true });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="signin-container"
        style={{
          color: "Black",
          padding: "1rem",
          margin: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.3rem", // <-- controls spacing between all elements
        }}
      >
        <h2
          style={{
            color: "#ffd75e",
            fontSize: "2.2rem",
            fontWeight: "800",
            textAlign: "center",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          Signing Out.....
        </h2>
        <p
          style={{
            marginTop: "0.1rem",
            color: "black",
            fontSize: "1.3rem",
            textAlign: "center",
            marginBottom: "0.1rem",
            fontWeight: "600",
            textShadow: "0 4px 10px rgba(0,0,0,0.7)",
          }}
        >
          Thanks for stopping by the shop!! drive safe! 👋
        </p>
        <form className="signin-form" onSubmit={signOut}>
          <button
            type="submit"
            style={{
              marginTop: "0.1rem",
              padding: "0.6rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#f97316", // orange
              color: "white",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}

/*
import { useNavigate } from "react-router-dom";

export default function Signout() {
  const navigate = useNavigate();

  const signOut = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      console.log(data);
      localStorage.setItem("user", data["user"]);

      localStorage.removeItem("user");
      localStorage.removeItem("username");
      localStorage.removeItem("cart");

      navigate("/signin");
      window.location.href = "/signin";

      // 4. Refresh to ensure Navbar updates
      window.location.reload();

      if (!response.ok) {
        console.log("Error!");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign Out</h2>
      <form className="signin-form" onSubmit={signOut}>
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
  */
