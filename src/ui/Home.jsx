import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CreateUser from "../features/user/CreateUser";
import routes from "../Routes/routes";

const Home = () => {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();

  function handleContinueOrdering() {
    navigate(routes.menu);
  }
  return (
    <div className="text-center mt-10 px-10">
      <p className="text-xl font-semibold md:text-3xl mb-6">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </p>
      {username ? (
        <button onClick={handleContinueOrdering} className="btn-primary">
          Continue ordering, {username}
        </button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
};

export default Home;
