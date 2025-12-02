// src/Routes/Routes.tsx

import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import Signout from "../pages/Signout/Signout";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import Orders from "../pages/Orders/Orders";
import Backdoor from "../pages/Backdoor/Backdoor";
import Checkout from "../pages/Checkout/checkout"; // adjust path/name if different
import ProductDetails from "../pages/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home / default route */}
        <Route path="/" element={<Landing />} />

        {/* Auth */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signout" element={<Signout />} />

        {/* Shop */}
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/orders" element={<Orders />} />

        {/*  ADD THIS  */}
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/products/:productId" element={<ProductDetails />} />

        {/* Admin / hidden page */}
        <Route path="/backdoor" element={<Backdoor />} />
      </Routes>
    </>
  );
}

export default App;
