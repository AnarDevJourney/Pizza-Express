import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="overflow-scroll">
      <Outlet />
    </main>
  );
};

export default Main;
