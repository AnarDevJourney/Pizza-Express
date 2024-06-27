import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

//! Fake Cart
/* const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]; */

const Cart = () => {
  // Select the cart state from the Redux store
  /* const cart = fakeCart; */
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  
  // Select the username from the user state in the Redux store
  const username = useSelector((state) => state.user.username);
  
  const navigate = useNavigate();

  // Handler to clear the cart by dispatching the clearCart action
  function handleClearCart() {
    dispatch(clearCart());
  }

  // Handler to navigate to the new order page
  function handleOrderPizzas() {
    navigate("/order/new");
  }

  // Render the EmptyCart component if the cart is empty
  if (!cart.length) {
    return <EmptyCart />;
  }

  // Render the cart items and action buttons if the cart is not empty
  return (
    <div className="mx-auto mt-8 max-w-4xl px-4 py-3">
      {/* Link to go back to the menu */}
      <Link to="/menu" className="text-blue-700 hover:underline">
        &larr; Back to menu
      </Link>
      
      {/* Display the username and heading */}
      <h2 className="mt-6 text-xl font-semibold">
        Your cart, <span className="uppercase">{username}</span>
      </h2>
      
      {/* List of cart items */}
      <ul className="mt-4 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      
      {/* Action buttons to order pizzas or clear the cart */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button onClick={handleOrderPizzas} className="button">
          Order pizzas
        </button>
        <button
          onClick={handleClearCart}
          className="rounded-full border border-stone-700 bg-transparent px-6 py-3 font-semibold uppercase text-stone-800 opacity-70 transition duration-200 hover:bg-stone-400"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
