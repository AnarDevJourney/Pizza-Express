import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

// Component to show each cart item data
import CartItem from "./CartItem";

// Action for deleting all cart items
import { clearCart } from "./cartSlice";

// Component to show when there is no item in the cart
import EmptyCart from "./EmptyCart";

const Cart = () => {
  // Selecting username from redux store
  const username = useSelector((state) => state.user.username);
  // Selecting cart from redux store
  const cart = useSelector((state) => state.cart.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (cart.length === 0) return <EmptyCart />;

  return (
    <div className="p-3">
      <Link to="/menu" className="link-button">
        &larr; Back to menu
      </Link>
      <h2 className="mt-7 text-xl font-semibold">Your cart {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <button onClick={() => navigate("/order/new")} className="btn primary">
          Order Pizzas
        </button>
        <button onClick={() => dispatch(clearCart())} className="secondary">
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
