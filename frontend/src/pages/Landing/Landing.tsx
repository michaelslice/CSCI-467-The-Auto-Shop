import brakePadsImage from "./download.jpg";
import oilFilterImage from "./oil filter.jpg";
import sparkPlugImage from "./spark plug.jpg";
import allSeasonTireImage from "./all season tire.jpg";
import Battery12V from "./battery 12v.jpg";
import airFilter from "./air filter.jpg";
import cabinAirFilter from "./cabin air filter.jpg";
import wiperBlade from "./wiper blade.jpg";
import headlightBulbs from "./headlight bulbs.jpg";
import brakeRotors from "./brake rotors.jpg";
import engineCoolant from "./engine coolant.jpg";
import serpentineBelt from "./serpentine belt.jpg";
import fuelPump from "./fuel pump.jpg";
import radiator from "./radiator.jpg";
import alternator from "./alternator.jpg";
import starterMotor from "./starter motor.jpg";
import timingBeltKit from "./timing belt kit.jpg";
import shockAbsorberFront from "./shock absorber front.jpg";
import controlArm from "./Control arm.jpg";
import oxygenSensor from "./oxygen sensor.jpg";
import massAirflowSensor from "./mass airflow sensor.jpg";
import brakeFluid from "./brake fluid.jpg";
import transmissionFluid from "./transmission fluid.jpg";
import wheelBearing from "./wheel bearing.jpg";
import ballJoint from "./ball joint.jpg";
import powerSteeringPump from "./power steering pump.jpg";
import driveBelt from "./drive belt.jpg";
import exhaustMuffler from "./exhaust muffler.jpg";
import catalyticConverter from "./catalytic converter.jpg";
import ignitionCoil from "./ignition Coil.jpg";
import engineMount from "./engine mount.jpg";
import coolantHose from "./coolant hose.jpg";
import fenderLiner from "./fender Liner.jpg";

// src/pages/Landing/Landing.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { useCart } from "../../context/CartContext";

type UserRole = "default" | "customer" | "worker" | "admin";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  availableQty: number;
  imageUrl: string;
  weight: number; // for later shipping use
};

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "P001",
    name: "Brake Pads",
    description: "High-performance brake pads for front wheels.",
    price: 59.99,
    availableQty: 25,
    imageUrl: brakePadsImage,
    weight: 2.5,
  },
  {
    id: "P002",
    name: "Oil Filter",
    description: "Standard oil filter compatible with most sedans.",
    price: 12.5,
    availableQty: 100,
    imageUrl: oilFilterImage,
    weight: 0.5,
  },
  {
    id: "P003",
    name: "Spark Plug (4-pack)",
    description: "Copper spark plugs for smooth engine performance.",
    price: 24.0,
    availableQty: 60,
    imageUrl: sparkPlugImage,
    weight: 0.8,
  },

  {
    id: "P004",
    name: "All-Season Tire",
    description: "205/55R16 all-season tire for everyday driving.",
    price: 129.99,
    availableQty: 30,
    imageUrl: allSeasonTireImage,
    weight: 22.0,
  },

  {
    id: "P005",
    name: "Car Battery 12V",
    description: "Maintenance-free 12V battery with 650 CCA.",
    price: 169.99,
    availableQty: 18,
    imageUrl: Battery12V,
    weight: 35.0,
  },

  {
    id: "P006",
    name: "Engine Air Filter",
    description: "OEM-style air filter for improved airflow.",
    price: 19.99,
    availableQty: 75,
    imageUrl: airFilter,
    weight: 0.7,
  },

  {
    id: "P007",
    name: "Cabin Air Filter",
    description: "Keeps dust and pollen out of the cabin.",
    price: 17.5,
    availableQty: 80,
    imageUrl: cabinAirFilter,
    weight: 0.6,
  },

  {
    id: "P008",
    name: "Wiper Blade (Pair)",
    description: 'All-weather wiper blades, 22"/20" pair.',
    price: 28.99,
    availableQty: 50,
    imageUrl: wiperBlade,
    weight: 1.0,
  },

  {
    id: "P009",
    name: "Headlight Bulb (2-pack)",
    description: "Halogen headlight bulbs, H11 fitment.",
    price: 34.99,
    availableQty: 40,
    imageUrl: headlightBulbs,
    weight: 0.4,
  },

  {
    id: "P010",
    name: "Brake Rotors (Front, Pair)",
    description: "Vented front brake rotors for better cooling.",
    price: 119.99,
    availableQty: 22,
    imageUrl: brakeRotors,
    weight: 28.0,
  },

  {
    id: "P011",
    name: "Engine Coolant (1 Gallon)",
    description: "Pre-mixed 50/50 long-life antifreeze coolant.",
    price: 21.99,
    availableQty: 90,
    imageUrl: engineCoolant,
    weight: 8.5,
  },

  {
    id: "P012",
    name: "Serpentine Belt",
    description: "Multi-rib belt for alternator and accessories.",
    price: 39.5,
    availableQty: 35,
    imageUrl: serpentineBelt,
    weight: 1.2,
  },

  {
    id: "P013",
    name: "Fuel Pump",
    description: "High-pressure fuel pump for modern fuel-injected engines.",
    price: 149.99,
    availableQty: 20,
    imageUrl: fuelPump,
    weight: 3.0,
  },

  {
    id: "P014",
    name: "Radiator",
    description: "Aluminum core radiator for improved engine cooling.",
    price: 199.99,
    availableQty: 15,
    imageUrl: radiator,
    weight: 12.5,
  },
  {
    id: "P015",
    name: "Alternator",
    description: "120-amp alternator compatible with most vehicles.",
    price: 229.99,
    availableQty: 12,
    imageUrl: alternator,
    weight: 14.0,
  },
  {
    id: "P016",
    name: "Starter Motor",
    description: "Heavy-duty starter motor for reliable cold starts.",
    price: 189.99,
    availableQty: 18,
    imageUrl: starterMotor,
    weight: 10.0,
  },
  {
    id: "P017",
    name: "Timing Belt Kit",
    description: "Includes timing belt, tensioner, and idler pulleys.",
    price: 169.0,
    availableQty: 25,
    imageUrl: timingBeltKit,
    weight: 3.3,
  },
  {
    id: "P018",
    name: "Shock Absorber (Front)",
    description: "Gas-charged shock absorber for smoother ride comfort.",
    price: 89.99,
    availableQty: 35,
    imageUrl: shockAbsorberFront,
    weight: 7.5,
  },
  {
    id: "P019",
    name: "Control Arm",
    description: "Steel front control arm with pre-installed bushings.",
    price: 79.99,
    availableQty: 40,
    imageUrl: controlArm,
    weight: 8.0,
  },
  {
    id: "P020",
    name: "Oxygen Sensor",
    description: "Upstream O2 sensor for improved fuel economy.",
    price: 54.99,
    availableQty: 55,
    imageUrl: oxygenSensor,
    weight: 0.4,
  },

  {
    id: "P021",
    name: "Mass Airflow Sensor",
    description: "Measures intake airflow for accurate fuel delivery.",
    price: 89.99,
    availableQty: 30,
    imageUrl: massAirflowSensor,
    weight: 0.5,
  },

  {
    id: "P022",
    name: "Brake Fluid DOT 4",
    description: "High-temperature brake fluid for ABS systems.",
    price: 14.99,
    availableQty: 90,
    imageUrl: brakeFluid,
    weight: 1.0,
  },
  {
    id: "P023",
    name: "Transmission Fluid",
    description: "Compatible with automatic and CVT systems.",
    price: 18.99,
    availableQty: 70,
    imageUrl: transmissionFluid,
    weight: 1.2,
  },
  {
    id: "P024",
    name: "Wheel Bearing Hub",
    description: "Pre-assembled wheel hub with bearing included.",
    price: 139.99,
    availableQty: 22,
    imageUrl: wheelBearing,
    weight: 6.0,
  },
  {
    id: "P025",
    name: "Ball Joint",
    description: "Heavy-duty suspension ball joint.",
    price: 34.99,
    availableQty: 65,
    imageUrl: ballJoint,
    weight: 1.0,
  },
  {
    id: "P026",
    name: "Power Steering Pump",
    description: "Restores smooth steering and reduces noise.",
    price: 159.99,
    availableQty: 14,
    imageUrl: powerSteeringPump,
    weight: 9.0,
  },
  {
    id: "P027",
    name: "Drive Belt",
    description: "Replacement belt for alternator and accessories.",
    price: 29.99,
    availableQty: 50,
    imageUrl: driveBelt,
    weight: 0.9,
  },
  {
    id: "P028",
    name: "Exhaust Muffler",
    description: "Reduces engine noise with corrosion-resistant steel.",
    price: 119.99,
    availableQty: 10,
    imageUrl: exhaustMuffler,
    weight: 18.0,
  },
  {
    id: "P029",
    name: "Catalytic Converter",
    description: "Reduces harmful emissions to meet EPA standards.",
    price: 249.99,
    availableQty: 8,
    imageUrl: catalyticConverter,
    weight: 9.5,
  },
  {
    id: "P030",
    name: "Ignition Coil",
    description: "Provides strong spark for optimal engine performance.",
    price: 39.99,
    availableQty: 42,
    imageUrl: ignitionCoil,
    weight: 0.6,
  },
  {
    id: "P031",
    name: "Engine Mount",
    description: "Rubber-insulated mount reducing engine vibrations.",
    price: 49.99,
    availableQty: 28,
    imageUrl: engineMount,
    weight: 3.0,
  },
  {
    id: "P032",
    name: "Coolant Hose",
    description: "High-temperature rubber hose for coolant systems.",
    price: 19.99,
    availableQty: 75,
    weight: 0.7,
    imageUrl: coolantHose,
  },
  {
    id: "P033",
    name: "Fender Liner",
    description: "Protects wheel wells from dirt and debris.",
    price: 44.99,
    availableQty: 20,
    imageUrl: fenderLiner,
    weight: 4.0,
  },
];

type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export default function Landing() {
  const [cartCount, setCartCount] = useState<number>(0);
  const [role, setRole] = useState<UserRole>("default");
  const [username, setUsername] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = SAMPLE_PRODUCTS.filter((p) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true; // no search → show all

    return (
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  });

  useEffect(() => {
    const storedRole = (localStorage.getItem("user") as UserRole) || "default";
    const storedUsername = localStorage.getItem("username");
    setRole(storedRole);
    setUsername(storedUsername);
    // read cart from localStorage and set count
    const rawCart = localStorage.getItem("cart");
    if (rawCart) {
      const cart: CartItem[] = JSON.parse(rawCart);
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    }
  }, []);

  function addToCart(product: Product) {
    // basic Add to Cart to support later use cases
    const raw = localStorage.getItem("cart");
    let cart: CartItem[] = raw ? JSON.parse(raw) : [];

    const existing = cart.find((c) => c.productId === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    // 🔹 update cartCount state
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(total);

    setMessage(`Added ${product.name} to cart.`);
    setTimeout(() => setMessage(null), 1500);
  }

  return (
    <div
      style={{
        backgroundColor: "#cb842eff",
        paddingTop: "6rem", // space below navbar
        paddingInline: "2rem",
        minHeight: "100vh", // keep page tall enough
        boxSizing: "border-box",
      }}
    >
      {/* Shopping cart emoji in top-right corner */}
      <Link
        to="/shopping-cart"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div
          style={{
            position: "fixed",
            top: "55px",
            right: "20px",
            fontSize: "30px",
            cursor: "pointer",
          }}
        >
          🛒
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "14px",
              }}
            >
              {cartCount}
            </span>
          )}
        </div>
      </Link>

      <h1 style={{ fontStyle: "italic", textAlign: "center", margin: 0 }}>
        WELCOME TO THE AUTO SHOP!! 🛠️
      </h1>

      {role === "default" && (
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          You can browse products now. Please{" "}
          <Link
            to="/signin"
            style={{
              color: "#ffdd57", //
              fontWeight: "600",
            }}
          >
            sign in
          </Link>{" "}
          or{" "}
          <Link
            to="/signup"
            style={{
              color: "#ffdd57", //
              fontWeight: "600",
            }}
          >
            create an account
          </Link>{" "}
          before checkout.
        </p>
      )}

      {role === "customer" && (
        <p style={{ marginTop: "1rem", textAlign: "center" }}>
          Welcome back{username ? `, ${username}` : ""}! Browse the catalog
          below or go to your{" "}
          <Link
            to="/shopping-cart"
            style={{
              color: "#ffdd57", //
              fontWeight: "600",
            }}
          >
            Shopping Cart
          </Link>
          .
        </p>
      )}

      {message && (
        <p
          style={{
            marginTop: "1rem",
            textAlign: "center",
            color: "green",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      {/* Catalog section – implements Use Case 1: Browse Products */}
      <section style={{ marginTop: "2rem", minHeight: "600px" }}>
        <h2>Product Catalog</h2>
        <p>
          View available auto parts, including name, description, picture, price
          and available quantity.
        </p>

        {/* Layout: left = search, right = results */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          {/* LEFT SIDEBAR – SEARCH */}
          <aside
            style={{
              width: "260px",
              flexShrink: 0,
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "#fff1dd",
            }}
          >
            <h3
              style={{
                marginTop: 0,
                marginBottom: "0.75rem",
                fontSize: "1rem",
              }}
            >
              Search Products
            </h3>
            <label
              htmlFor="product-search"
              style={{
                display: "block",
                fontSize: "0.85rem",
                marginBottom: "0.25rem",
              }}
            >
              Search by name or type
            </label>
            <input
              id="product-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., brake, battery, tire..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "0.4rem 0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "0.9rem",
                marginBottom: "0.5rem",
              }}
            />
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              style={{
                fontSize: "0.85rem",
                padding: "0.35rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid #534d97ff",
                backgroundColor: "#b65757ff",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </aside>

          {/* RIGHT – PRODUCT GRID */}
          <div style={{ flex: 1 }}>
            {filteredProducts.length === 0 && (
              <p style={{ fontStyle: "italic", color: "#000000e6" }}>
                No products match your search.
              </p>
            )}

            <div
              style={{
                display: "grid",
                gap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              }}
            >
              {filteredProducts.map((p) => (
                <article
                  key={p.id}
                  style={{
                    border: "1px solid #0e0d0dff",
                    borderRadius: "8px",
                    padding: "1rem",
                    backgroundColor: "#f4e0bcff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between", // Pushes buttons to the bottom

                    gap: "0.75rem",
                  }}
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    width={160}
                    height={100}
                    style={{
                      objectFit: "contain",
                      borderRadius: "4px",
                      display: "block",
                      margin: "0 auto",
                      backgroundColor: "#fff",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0 }}>{p.name}</h3>
                    <p style={{ margin: "0.25rem 0" }}>{p.description}</p>
                    <p style={{ margin: "0.25rem 0", fontWeight: "bold" }}>
                      ${p.price.toFixed(2)}
                    </p>
                    <p
                      style={{
                        margin: "0.25rem 0",
                        fontSize: "0.85rem",
                        color: "#555",
                      }}
                    >
                      Available: {p.availableQty}
                    </p>
                    <div style={{ marginTop: "0.25rem" }}>
                      <button
                        type="button"
                        onClick={() => addToCart(p)}
                        style={{ marginRight: "0.5rem" }}
                      >
                        Add to Cart
                      </button>
                      <Link to={`/products/${p.id}`} state={{ product: p }}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ marginTop: "2rem", textAlign: "center" }}></div>
    </div>
  );
}
