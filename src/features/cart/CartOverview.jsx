import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../Routes/routes";
// selector function for getting total quantity of pizzas
import { getTotalQuantity } from "./cartSlice";
// selector function for getting total price of cart
import { getTotalPrice } from "./cartSlice";

const CartOverview = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  function handleOpenCart() {
    navigate(routes.cart);
  }

  if (cart.length === 0) return null;

  return (
    <footer className="bg-stone-800 text-stone-100 flex items-center justify-between py-3 px-6">
      <div className="flex items-center gap-4">
        <p className="uppercase">{totalQuantity} Pizzas</p>
        <p>${totalPrice}</p>
      </div>
      <div>
        <button onClick={handleOpenCart} className="uppercase">
          Open cart &rarr;
        </button>
      </div>
    </footer>
  );
};

export default CartOverview;
