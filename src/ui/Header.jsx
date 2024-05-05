import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchOrder from "../features/order/SearchOrder";

const Header = () => {
  const username = useSelector((state) => state.user.username);
  return (
    <header className="flex items-center justify-between border-b-stone-100 bg-yellow-400 p-3">
      <Link
        to="/"
        className="text-sm uppercase tracking-widest text-stone-700 md:text-2xl"
      >
        pizza express
      </Link>
      <SearchOrder />
      {username && (
        <p className="hidden font-bold uppercase md:block">{username}</p>
      )}
    </header>
  );
};

export default Header;
