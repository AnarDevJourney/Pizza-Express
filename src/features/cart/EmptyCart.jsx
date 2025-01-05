import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="p-4">
      <Link to="/menu" className="link-button">
        &larr; Back to menu
      </Link>
      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
};

export default EmptyCart;
