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

      navigate("/landing");
      window.location.reload();

      if (!response.ok) {
        console.log("Error!");
        return;
      }

    } 
    catch (error) {
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