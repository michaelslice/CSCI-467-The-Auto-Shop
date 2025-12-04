import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface OrderItem {
  part_number: number;
  description: string;
  quantity: number;
  price: number;
}

interface OrderData {
  order_id: number;
  total: number;
  customer_name: string;
  items: OrderItem[];
}

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialOrder: OrderData | null =
    location.state?.order || JSON.parse(localStorage.getItem("orderData") || "null");

  const [order, setOrder] = useState<OrderData | null>(initialOrder);

  useEffect(() => {
    if (!order) navigate("/");
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>🎉 Order Confirmed!</h1>

      <p style={{ fontSize: "1.1rem", marginBottom: "30px" }}>
        Thank you for your purchase. A confirmation email has been sent.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "10px" }}>Order Summary</h2>
        <p><strong>Order ID:</strong> {order.order_id}</p>
        <p><strong>Total:</strong> ${order.total}</p>
      </div>

      <h3 style={{ marginBottom: "10px" }}>Items Purchased</h3>
      <div style={{ border: "1px solid #ccc", padding: "20px" }}>
        {order.items.map(item => (
          <div key={item.part_number} style={{
            borderBottom: "1px solid #eee",
            paddingBottom: "10px",
            marginBottom: "10px"
          }}>
            <p><strong>{item.description}</strong></p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3>Email Preview</h3>
        <div style={{
          border: "1px solid #ccc",
          padding: "20px",
          background: "#f9f9f9"
        }}>
          <p>Hello {order.customer_name},</p>
          <p>Thank you for your purchase! Here is your order summary:</p>

          <ul>
            {order.items.map(item => (
              <li key={item.part_number}>
                {item.quantity} × {item.description} — ${item.price}
              </li>
            ))}
          </ul>

          <p><strong>Total: ${order.total}</strong></p>
          <p>Your order will be processed shortly.</p>
        </div>
      </div>
    </div>
  );
}
