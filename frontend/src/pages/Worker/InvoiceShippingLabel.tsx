import { useState } from "react";
import { Link } from "react-router-dom";

type InvoiceItem = {
  part_number: number;
  description: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

type Invoice = {
  order_id: number;
  order_date: string;
  total_amount: number;
  items: InvoiceItem[];
};

type ShippingLabel = {
  order_id: number;
  shipping_address: {
    name: string;
    street: string;
    city: string;
  };
};

export default function InvoiceShippingLabel() {
  const [orderId, setOrderId] = useState<string>("");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [shippingLabel, setShippingLabel] = useState<ShippingLabel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoiceAndLabel = async () => {
    if (!orderId) {
      setError("Please enter an order ID");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://127.0.0.1:8000/worker/invoice_shipping_label?order_id=${orderId}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to fetch invoice and shipping label");
      }
      const data = await response.json();
      setInvoice(data.invoice);
      setShippingLabel(data.shipping_label);
    } 
    catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setInvoice(null);
      setShippingLabel(null);
    } 
    finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Print Invoice & Shipping Label 📄</h1>
          <Link to="/worker/dashboard" style={{ padding: "0.5rem 1rem", backgroundColor: "#fff7e8", borderRadius: "5px", textDecoration: "none", color: "#333" }}>
            ← Back to Dashboard
          </Link>
        </div>

        <div style={{ backgroundColor: "#fff7e8", padding: "2rem", borderRadius: "10px", marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <input
              type="number"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc", flex: 1 }}
            />
            <button
              onClick={fetchInvoiceAndLabel}
              disabled={loading}
              style={{
                padding: "0.5rem 1.5rem",
                backgroundColor: "#f97316",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Loading..." : "Get Invoice & Label"}
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        {invoice && shippingLabel && (
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {/* Invoice */}
            <div style={{ flex: 1, minWidth: "400px" }}>
              <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "10px", marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <h2>Invoice</h2>
                  <button
                    onClick={handlePrint}
                    style={{
                      padding: "0.5rem 1.5rem",
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Print
                  </button>
                </div>
                <p><strong>Order ID:</strong> {invoice.order_id}</p>
                <p><strong>Order Date:</strong> {new Date(invoice.order_date).toLocaleDateString()}</p>
                <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #ccc" }}>
                      <th style={{ textAlign: "left", padding: "0.5rem" }}>Description</th>
                      <th style={{ textAlign: "right", padding: "0.5rem" }}>Qty</th>
                      <th style={{ textAlign: "right", padding: "0.5rem" }}>Unit Price</th>
                      <th style={{ textAlign: "right", padding: "0.5rem" }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "0.5rem" }}>{item.description}</td>
                        <td style={{ textAlign: "right", padding: "0.5rem" }}>{item.quantity}</td>
                        <td style={{ textAlign: "right", padding: "0.5rem" }}>${item.unit_price.toFixed(2)}</td>
                        <td style={{ textAlign: "right", padding: "0.5rem" }}>${item.subtotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr style={{ borderTop: "2px solid #ccc", fontWeight: "bold" }}>
                      <td colSpan={3} style={{ textAlign: "right", padding: "0.5rem" }}>Total:</td>
                      <td style={{ textAlign: "right", padding: "0.5rem" }}>${invoice.total_amount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Shipping Label */}
            <div style={{ flex: 1, minWidth: "300px" }}>
              <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "10px", border: "2px dashed #333" }}>
                <h2>Shipping Label</h2>
                <div style={{ marginTop: "2rem" }}>
                  <p><strong>Order ID:</strong> {shippingLabel.order_id}</p>
                  <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "5px" }}>
                    <p><strong>Ship To:</strong></p>
                    {shippingLabel.shipping_address.name && <p>{shippingLabel.shipping_address.name}</p>}
                    <p>{shippingLabel.shipping_address.street}</p>
                    <p>{shippingLabel.shipping_address.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}