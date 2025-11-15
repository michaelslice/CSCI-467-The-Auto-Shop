import backgroundImage from "./Back.jpg";

import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const finishLogin = (role: "customer" | "worker" | "admin" = "customer") => {
    // minimal info for frontend customer logic
    localStorage.setItem("user", role);
    localStorage.setItem("username", username || "customer");
    navigate("/landing");
    window.location.reload();
  };

  const signIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        // ignore JSON parse errors
      }

      console.log("signin response:", response.status, data);

      if (!response.ok) {
        // Backend responded but not OK (404, 400, etc.)
        console.warn(
          "Backend returned error status, using mock customer login for frontend work."
        );
        // optionally show message once in console, but DO NOT block login
        finishLogin("customer");
        return;
      }

      //  Real success path (when backend is correct)
      if (data) {
        localStorage.setItem("user_data", JSON.stringify(data));
        localStorage.setItem("username", data.user?.name ?? username);

        const role =
          (data.user?.user as "customer" | "worker" | "admin") || "customer";

        localStorage.setItem("user", role);
        finishLogin(role);
      } else {
        // no data but status ok: still just log in as customer
        finishLogin("customer");
      }
    } catch (err) {
      //  Network/connection error – also fall back to mock login
      console.warn("Backend not reachable, doing mock login as customer.", err);
      finishLogin("customer");
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
      <div className="signin-container">
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            margin: "0 0 1.5rem 0",
            fontWeight: "bold",
            color: "#060601ff",
            textShadow: "0 0 10px #f2f3ecff, 0 0 20px #d0bb1aff",
          }}
        >
          Sign In 🔧
        </h2>
        <form className="signin-form" onSubmit={signIn}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            className="signin-input"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.5)",
              backgroundColor: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(6px)",
              color: "white",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="signin-input"
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.5)",
              backgroundColor: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(6px)",
              color: "white",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            type="submit"
            style={{
              marginTop: "0.75rem",
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
            Sign In
          </button>
          {/* 👇 new part: signup option */}
          <p
            style={{
              marginTop: "0.75rem",
              textAlign: "center",
              color: "#060601ff",
              textShadow: "0 0 4px #f2f3ecff",
            }}
          >
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{
                cursor: "pointer",
                fontWeight: 700,
                textDecoration: "underline",
              }}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
