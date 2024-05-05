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
  /* const cart = fakeCart; */
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  function handleClearCart() {
    dispatch(clearCart());
  }
  function handleOrderPizzas() {
    navigate("/order/new");
  }
  if (!cart.length) {
    return <EmptyCart />;
  }
  return (
    <div className="mx-auto mt-8 max-w-4xl px-4 py-3">
      <Link to="/menu" className="text-blue-700 hover:underline">
        &larr; Back to menu
      </Link>
      <h2 className="mt-6 text-xl font-semibold">
        Your cart, <span className="uppercase">{username}</span>
      </h2>
      <ul className="mt-4 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
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
