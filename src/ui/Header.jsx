import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import SearchOrder from "../features/order/SearchOrder";

const Header = () => {
  const username = useSelector((state) => state.user.username);
  return (
    <header className="bg-yellow-400 p-4 uppercase flex items-center justify-between gap-3">
      <Link to="/" className="tracking-[2px]">
        Pizza Express
      </Link>
      <SearchOrder />
      {username && <p className="font-semibold hidden md:block">{username}</p>}
    </header>
  );
};

export default Header;
