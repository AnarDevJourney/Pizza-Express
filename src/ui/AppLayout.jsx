import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="grid h-[100svh] grid-rows-[auto_1fr_auto] gap-2">
      <Header />

      <div className="overflow-y-scroll overflow-x-hidden">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
};

export default AppLayout;
