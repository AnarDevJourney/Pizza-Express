import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalItemQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

const CartOverview = () => {
  const totalItemQuantity = useSelector(getTotalItemQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalItemQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 p-3 text-stone-100">
      <p className="space-x-4">
        <span>{totalItemQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
};

export default CartOverview;
