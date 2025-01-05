import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
// Component to show when there is routing error
import PageNotFound from "./ui/PageNotFound";
// Application layout component
import AppLayout from "./ui/AppLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order/new" element={<CreateOrder />} />
          <Route path="/order/:orderId" element={<Order />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
