import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//Selector functions for total price and quantity of items in the cart
import { getTotalQuantity, getTotalPrice } from "./cartSlice";

// Helper function for formatting number as currency
import { formatCurrency } from "../../utils/helpers";

const CartOverview = () => {
  // Getting total cart items quantity from redux
  const totalCartQuantity = useSelector(getTotalQuantity);
  // Getting total cart price from redux
  const totalCartPrice = useSelector(getTotalPrice);

  // If there is no item in the cart we don't need to show cart overview
  if (!totalCartQuantity) return null;

  return (
    <footer className="bg-stone-800 text-stone-200 uppercase flex items-center justify-between p-4">
      <p className="font-semibold space-x-4">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </footer>
  );
};

export default CartOverview;
