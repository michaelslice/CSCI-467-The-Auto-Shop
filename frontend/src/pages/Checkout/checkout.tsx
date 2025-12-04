import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

type CheckoutForm = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

const CART_KEY = "cart";

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.5rem 0.6rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "0.95rem",
  boxSizing: "border-box",
};

const Checkout = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutForm, string>>
  >({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(CART_KEY);
    if (raw) {
      try {
        setCartItems(JSON.parse(raw));
      } 
      catch {
        setCartItems([]);
      }
    }
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const validateField = (name: keyof CheckoutForm, value: string): string => {
    if (!value.trim()) return "This field is required.";

    switch (name) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email.";
        }
        break;
      case "zip":
        if (!/^\d{5}(-\d{4})?$/.test(value)) {
          return "Please enter a valid ZIP code.";
        }
        break;
      case "cardNumber": {
        const digits = value.replace(/\s+/g, "");
        if (!/^\d{16}$/.test(digits)) {
          return "Card number must be 16 digits.";
        }
        break;
      }
      case "expiry":
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          return "Use MM/YY format.";
        }
        break;
      case "cvv":
        if (!/^\d{3,4}$/.test(value)) {
          return "CVV must be 3 or 4 digits.";
        }
        break;
      default:
        break;
    }
    return "";
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    const msg = validateField(name as keyof CheckoutForm, value);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};
    (Object.keys(form) as (keyof CheckoutForm)[]).forEach((key) => {
      const msg = validateField(key, form[key]);
      if (msg) newErrors[key] = msg;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!validateForm()) return;
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    alert("Order placed successfully! 🎉");

    localStorage.removeItem(CART_KEY);
    navigate("/orders");
  };

  const isFormValid =
    Object.values(form).every((v) => v.trim() !== "") &&
    Object.values(errors).every((err) => !err) &&
    cartItems.length > 0;

  if (cartItems.length === 0) {
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
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            backgroundColor: "#fff7e8",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          <h1 style={{ marginBottom: "1rem" }}>Checkout</h1>
          <p>Your cart is empty.</p>
          <button type="button" onClick={() => navigate("/shopping-cart")}>
            ← Back to Cart
          </button>
        </div>
      </div>
    );
  }

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
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#fff7e8",
          padding: "1.5rem 2rem 2rem",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h1 style={{ margin: 0 }}>Checkout</h1>
          <button
            type="button"
            onClick={() => navigate("/shopping-cart")}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              border: "none",
              background: "#ffffff",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ← Back to Cart
          </button>
        </div>

        {/* Form + summary */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: "1.5rem",
          }}
        >
          {/* Left: form */}
          <form onSubmit={handleSubmit} noValidate>
            <h2 style={{ marginBottom: "0.5rem" }}>Customer Information</h2>

            <div style={{ marginBottom: "0.75rem" }}>
              <label>
                Full Name
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  style={{
                    ...inputBaseStyle,
                    border: errors.name
                      ? "1px solid #e55353"
                      : inputBaseStyle.border,
                  }}
                  placeholder="John Doe"
                />
              </label>
              {errors.name && (
                <div style={{ color: "#e55353", fontSize: "0.8rem" }}>
                  {errors.name}
                </div>
              )}
            </div>

            <div style={{ marginBottom: "0.75rem" }}>
              <label>
                Email Address
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  style={{
                    ...inputBaseStyle,
                    border: errors.email
                      ? "1px solid #e55353"
                      : inputBaseStyle.border,
                  }}
                  placeholder="john@example.com"
                />
              </label>
              {errors.email && (
                <div style={{ color: "#e55353", fontSize: "0.8rem" }}>
                  {errors.email}
                </div>
              )}
            </div>

            <h2 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
              Shipping Address
            </h2>

            <div style={{ marginBottom: "0.75rem" }}>
              <label>
                Street Address
                <input
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  style={{
                    ...inputBaseStyle,
                    border: errors.address
                      ? "1px solid #e55353"
                      : inputBaseStyle.border,
                  }}
                  placeholder="123 Main St"
                />
              </label>
              {errors.address && (
                <div style={{ color: "#e55353", fontSize: "0.8rem" }}>
                  {errors.address}
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <div>
                <label>
                  City
                  <input
                    name="city"
                    type="text"
                    value={form.city}
                    onChange={handleChange}
                    style={{
                      ...inputBaseStyle,
                      border: errors.city
                        ? "1px solid #e55353"
                        : inputBaseStyle.border,
                    }}
                    placeholder="Chicago"
                  />
                </label>
                {errors.city && (
                  <div style={{ color: "#e55353", fontSize: "0.8rem" }}>
                    {errors.city}
                  </div>
                )}
              </div>

              <div>
                <label>
                  State
                  <input
                    name="state"
                    type="text"
                    value={form.state}
                    onChange={handleChange}
                    style={{
                      ...inputBaseStyle,
                      border: errors.state
                        ? "1px solid #e55353"
                        : inputBaseStyle.border,
                    }}
                    placeholder="IL"
                  />
                </label>
                {errors.state && (
                  <div style={{ color: "#e55353", fontSize: "0.8rem" }}>
                    {errors.state}
                  </div>
                )}
              </div>

              <div>
                <label>
                  ZIP
                  <input
                    name="zip"
                    type="text"
                    value={form.zip}
                    onChange={handleChange}
                    style={{
                      ...inputBaseStyle,
                      border: errors.zip
                        ? "1px solid #e55353"
                        : inputBaseStyle.border,
                    }}
                    placeholder="60156"
                  />
                </label>
                {errors.zip && (
                  <div style={{ color: "#e55353", fontSize: "0.8rem" }}>
                    {errors.zip}
                  </div>
                )}
              </div>
            </div>

            <h2 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
              Payment Details
            </h2>

            <div style={{ marginBottom: "0.75rem" }}>
              <label>
                Card Number
                <input
                  name="cardNumber"
                  type="text"
                  value={form.cardNumber}
                  onChange={handleChange}
                  style={{
                    ...inputBaseStyle,
                    border: errors.cardNumber
                      ? "1px solid #e55353"
                      : inputBaseStyle.border,
                  }}
                  placeholder="1234 5678 9012 3456"
                />
              </label>
              {errors.cardNumber && (
                <div style={{ color: "#e55353", fontSize: "0.8rem" }}>
                  {errors.cardNumber}
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <div>
                <label>
                  Expiry (MM/YY)
                  <input
                    name="expiry"
                    type="text"
                    value={form.expiry}
                    onChange={handleChange}
                    style={{
                      ...inputBaseStyle,
                      border: errors.expiry
                        ? "1px solid #e55353"
                        : inputBaseStyle.border,
                    }}
                    placeholder="08/27"
                  />
                </label>
                {errors.expiry && (
                  <div style={{ color: "#e55353", fontSize: "0.8rem" }}>
                    {errors.expiry}
                  </div>
                )}
              </div>

              <div>
                <label>
                  CVV
                  <input
                    name="cvv"
                    type="password"
                    value={form.cvv}
                    onChange={handleChange}
                    style={{
                      ...inputBaseStyle,
                      border: errors.cvv
                        ? "1px solid #e55353"
                        : inputBaseStyle.border,
                    }}
                    placeholder="123"
                  />
                </label>
                {errors.cvv && (
                  <div style={{ color: "#e55353", fontSize: "0.8rem" }}>
                    {errors.cvv}
                  </div>
                )}
              </div>
            </div>

            {hasSubmitted && !isFormValid && (
              <div
                style={{
                  color: "#e55353",
                  fontSize: "0.85rem",
                  marginBottom: "0.5rem",
                }}
              >
                Please fix the highlighted fields before placing your order.
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                marginTop: "0.5rem",
                padding: "0.6rem 1.6rem",
                borderRadius: "999px",
                border: "none",
                backgroundColor: isFormValid ? "#222" : "#aaa",
                color: "#fff",
                fontWeight: 600,
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
            >
              Place Order
            </button>
          </form>

          {/* Right: Order Summary */}
          <div>
            <h2 style={{ marginBottom: "0.5rem" }}>Order Summary</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {cartItems.map((item) => (
                <li
                  key={item.productId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.6rem",
                    paddingBottom: "0.4rem",
                    borderBottom: "1px solid #e0d2bd",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "#555" }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>

            <div
              style={{
                marginTop: "0.75rem",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.95rem",
              }}
            >
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.95rem",
              }}
            >
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.4rem",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <p style={{ marginTop: "0.7rem", fontSize: "0.85rem" }}>
              You’ll see this total again before we charge your card.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;