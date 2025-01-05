import { Outlet } from "react-router-dom";

import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";

const AppLayout = () => {
  return (
    <div className="grid h-[100svh] grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};

export default AppLayout;
