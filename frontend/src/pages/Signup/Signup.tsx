import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import this
import type { ChangeEvent, FormEvent } from "react";
import Image from "./Back.jpg";
function Signup() {
  // (name can be SignUp or Signup)
  // Form state (aligning with typical Customer info from the use case model)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [error, setError] = useState(""); // for validation / API errors
  const [success, setSuccess] = useState(""); // for success messages
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // ✅ now recognized

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Basic frontend validation based on use case rules
  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return "First name and last name are required.";
    }

    if (!formData.email.trim()) {
      return "Email is required.";
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(formData.email)) {
      return "Please enter a valid email address.";
    }

    if (!formData.password) {
      return "Password is required.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    return ""; // no error
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // ✅ typed event
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/customers/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
          }),
        }
      );

      if (!response.ok) {
        let message = "Sign up failed. Please try again.";
        try {
          const data = await response.json();
          if (data && data.error) {
            message = data.error;
          }
        } catch {
          // ignore JSON parse errors
        }
        setError(message);
      } else {
        setSuccess("Account created successfully!");
        // redirect to sign in (your route is /signin)
        setTimeout(() => {
          navigate("/signin"); // matches Routes.tsx
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="signup-container"
      style={{
        backgroundImage: `url(${Image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div className="signup-card">
        <h1>Create Your Account</h1>
        <p className="signup-subtitle">
          Sign up to start ordering auto parts online.
        </p>

        {error && <div className="signup-alert error">{error}</div>}
        {success && <div className="signup-alert success">{success}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-row">
            <div className="signup-field">
              <label htmlFor="firstName">First Name *</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-field">
              <label htmlFor="lastName">Last Name *</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-field">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-row">
            <div className="signup-field">
              <label htmlFor="password">Password *</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="signup-field">
              <label htmlFor="confirmPassword">Confirm Password *</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-field">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>

          <h2 className="signup-section-title">Shipping Address (optional)</h2>

          <div className="signup-field">
            <label htmlFor="street">Street</label>
            <input
              id="street"
              name="street"
              type="text"
              value={formData.street}
              onChange={handleChange}
            />
          </div>

          <div className="signup-row">
            <div className="signup-field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="signup-field">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="signup-field">
              <label htmlFor="zip">ZIP</label>
              <input
                id="zip"
                name="zip"
                type="text"
                value={formData.zip}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className="signup-button"
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
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>

          <p className="signup-footer">
            Already have an account?{" "}
            <span className="signup-link" onClick={() => navigate("/signin")}>
              Log in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
