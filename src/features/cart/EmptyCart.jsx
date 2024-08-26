import { useNavigate } from "react-router-dom";
import routes from "../../Routes/routes";

const EmptyCart = () => {
  const navigate = useNavigate();

  function handleBackToMenu() {
    navigate(routes.menu);
  }
  return (
    <div className="p-4">
      <button onClick={handleBackToMenu} className="linkButton mb-7">
        &larr; Back to menu
      </button>
      <p className="font-medium tracking-wider">
        Your cart is empty. Start adding some pizzas :)
      </p>
    </div>
  );
};

export default EmptyCart;
