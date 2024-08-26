import { useNavigate } from "react-router-dom";
import routes from "../Routes/routes";
import { useSelector } from "react-redux";
// Component for searching order by id
import SearchOrder from "../features/order/SearchOrder";

const Header = () => {
  const navigate = useNavigate();

  const username = useSelector((state) => state.user.username);

  function handleClickLogo() {
    navigate(routes.home);
  }
  return (
    <header className="bg-yellow-400 py-3 px-6 flex items-center justify-between">
      <p
        onClick={handleClickLogo}
        className="uppercase tracking-[5px] cursor-pointer"
      >
        Pizza Express
      </p>
      <SearchOrder />
      {username && (
        <p className="hidden md:block uppercase font-semibold text-sm tracking-wide">
          {username}
        </p>
      )}
    </header>
  );
};

export default Header;
