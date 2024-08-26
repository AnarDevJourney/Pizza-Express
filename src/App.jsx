import routes from "./Routes/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing Pages
import Home from "./ui/Home";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import CreateOrder from "./features/order/CreateOrder";
import Order from "./features/order/Order";
import AppLayout from "./ui/AppLayout";
// Error component to show routing errors
import RoutingError from "./ui/RoutingError";

const router = createBrowserRouter([
  {
    element: <AppLayout />, 
    errorElement: <RoutingError />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.menu,
        element: <Menu />,
      },
      {
        path: routes.cart,
        element: <Cart />,
      },
      {
        path: routes.orderNew,
        element: <CreateOrder />,
      },
      {
        path: routes.order,
        element: <Order />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
