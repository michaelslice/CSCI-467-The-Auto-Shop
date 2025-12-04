import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/Back.jpg";

export default function Signout() {
  const navigate = useNavigate();

  const signOut = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // why ???????????
    try {

      await fetch("http://127.0.0.1:8000/signout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).catch(() => {
        // reinventing the if statement????
        // ignore network / backend errors for frontend logout
      });
    } 
    finally {

      localStorage.removeItem("user");
      localStorage.removeItem("username");
      localStorage.removeItem("cart");

      // Go to Sign In page (no extra reload needed)
      navigate("/", { replace: true });
      window.location.reload();
      
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
          gap: "0.3rem", 
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
        <form className="signin-form" onSubmit={signOut}>
          <button
            type="submit"
            style={{
              marginTop: "0.1rem",
              padding: "0.6rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#f97316",
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