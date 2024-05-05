import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  function handleContinueOrdering() {
    navigate("/menu");
  }
  return (
    <div className="mt-40 px-3 text-center">
      <h1 className="text-xl font-bold text-stone-700 md:text-3xl">
        Welcome to our pizza haven!
        <br />
        <span className="text-yellow-500">
          Explore delicious pizzas and savor mouthwatering flavors.
        </span>
      </h1>
      {!username ? (
        <CreateUser />
      ) : (
        <button
          onClick={handleContinueOrdering}
          className="mt-5 rounded-full bg-yellow-400 px-6 py-3 font-semibold uppercase text-stone-800 transition duration-200 hover:bg-yellow-300"
        >
          Continue ordering, {username}
        </button>
      )}
    </div>
  );
};

export default Home;
