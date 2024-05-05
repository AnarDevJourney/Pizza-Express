import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="px-4 py-3">
      <Link to="/menu" className="text-blue-700 hover:underline">
        &larr; Back to menu
      </Link>
      <p className="mt-6 text-lg font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
};

export default EmptyCart;
