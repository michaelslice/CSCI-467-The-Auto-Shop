// TODO: Lol this is cursed, I will change to use relative imports via @ later
import Navbar from "../components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Signin from "../pages/Signin/Signin";
import Signout from "../pages/Signout/Signout";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";
import Orders from "../pages/Orders/Orders";
import Backdoor from "../pages/Backdoor/Backdoor";
import Checkout from "../pages/Checkout/checkout"; 
import WorkerDashboard from "../pages/Worker/WorkerDashboard";
import CompletedOrders from "../pages/Worker/CompletedOrders";
import ItemsToPack from "../pages/Worker/ItemsToPack";
import PackingLabels from "../pages/Worker/PackingLabels";
import InvoiceShippingLabel from "../pages/Worker/InvoiceShippingLabel";
import MarkShipped from "../pages/Worker/MarkShipped";
import SendConfirmation from "../pages/Worker/SendConfirmation";
import ReceiverDashboard from "../pages/Receiver/ReceiverDashboard";
import ReceiveProducts from "../pages/Receiver/ReceiveProducts";
import ReceiverProducts from "../pages/Receiver/ReceiverProducts";
import IdentifyProduct from "../pages/Receiver/IdentifyProduct";
import UpdateQuantity from "../pages/Receiver/UpdateQuantity";
import InventoryLevels from "../pages/Receiver/InventoryLevels";
import AdministratorDashboard from "../pages/Administrator/AdministratorDashboard";
import ShippingCharges from "../pages/Administrator/ShippingCharges";
import AllOrders from "../pages/Administrator/AllOrders";
import WeightBrackets from "../pages/Administrator/WeightBrackets";
import SearchOrders from "../pages/Administrator/SearchOrders";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          {/* Home / default route */}
          <Route path="/" element={<Landing />} />

          {/* Auth */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signout" element={<Signout />} />

          {/* Shop */}
          <Route path="/shopping-cart" element={<ShoppingCart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Worker routes */}
          <Route path="/worker/dashboard" element={<WorkerDashboard />} />
          <Route path="/worker/completed-orders" element={<CompletedOrders />} />
          <Route path="/worker/packing-labels" element={<PackingLabels />} />
          <Route path="/worker/items-to-pack" element={<ItemsToPack />} />
          <Route path="/worker/invoice-shipping-label" element={<InvoiceShippingLabel />} />
          <Route path="/worker/mark-shipped" element={<MarkShipped />} />
          <Route path="/worker/send-confirmation" element={<SendConfirmation />} />

          {/* Receiver routes */}
          <Route path="/receiver/dashboard" element={<ReceiverDashboard />} />
          <Route path="/receiver/receive-products" element={<ReceiveProducts />} />
          <Route path="/receiver/products" element={<ReceiverProducts />} />
          <Route path="/receiver/identify-product" element={<IdentifyProduct />} />
          <Route path="/receiver/update-quantity" element={<UpdateQuantity />} />
          <Route path="/receiver/inventory" element={<InventoryLevels />} />

          {/* Administrator routes */}
          <Route path="/backdoor" element={<Backdoor />} />
          <Route path="/administrator/dashboard" element={<AdministratorDashboard />} />
          <Route path="/administrator/shipping-charges" element={<ShippingCharges />} />
          <Route path="/administrator/orders" element={<AllOrders />} />
          <Route path="/administrator/weight-brackets" element={<WeightBrackets />} />
          <Route path="/administrator/search-orders" element={<SearchOrders />} />
        </Routes>
    </>
  );
}

export default App;