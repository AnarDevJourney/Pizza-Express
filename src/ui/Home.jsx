import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  return (
    <div className="text-center my-10 px-4 sm:my-16">
      <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl mb-8 text-yellow-500">
        <span className="text-stone-700">The best pizza.</span> <br /> Straight
        out of the oven, straight to you.
      </h1>
      {username ? (
        <button onClick={() => navigate("/menu")} className="btn primary">
          Continue ordering, {username}
        </button>
      ) : (
        <CreateUser />
      )}
    </div>
  );
};

export default Home;
