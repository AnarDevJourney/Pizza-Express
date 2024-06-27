import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalItemQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

const CartOverview = () => {
  // Select the total item quantity from the cart state in the Redux store
  const totalItemQuantity = useSelector(getTotalItemQuantity);
  
  // Select the total cart price from the cart state in the Redux store
  const totalCartPrice = useSelector(getTotalCartPrice);

  // If there are no items in the cart, do not render the component
  if (!totalItemQuantity) return null;

  // Render the cart overview with total item quantity and total price
  return (
    <div className="flex items-center justify-between bg-stone-800 p-3 text-stone-100">
      <p className="space-x-4">
        {/* Display the total item quantity and formatted total cart price */}
        <span>{totalItemQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      
      {/* Link to navigate to the cart page */}
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
};

export default CartOverview;

