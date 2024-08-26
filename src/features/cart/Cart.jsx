import { useNavigate } from "react-router-dom";
import routes from "../../Routes/routes";
import { useSelector, useDispatch } from "react-redux";
// action for deleting item from cart
import { deleteItem } from "./cartSlice";
// action for clearing all cart
import { clearCart } from "./cartSlice";
// component to show when cart is empty
import EmptyCart from "./EmptyCart";
// component to update item quantity
import UpdateItemQuantity from "./UpdateItemQuantity";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = useSelector((state) => state.user.username);
  const cart = useSelector((state) => state.cart.cart);

  function handleBackToMenu() {
    navigate(routes.menu);
  }

  function handleDeleteItem(id) {
    dispatch(deleteItem(id));
  }

  function handleOrderPizzas() {
    navigate(routes.orderNew);
  }

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (cart.length === 0) {
    return <EmptyCart />;
  }
  return (
    <div className="px-4">
      <div className="mb-8">
        <button onClick={handleBackToMenu} className="linkButton">
          &larr; Back to menu
        </button>
      </div>
      <div className="mb-6">
        <p className="text-xl font-medium">Your cart, {username}</p>
      </div>
      <div className="mb-8">
        <ul className="divide-y divide-stone-200">
          {cart.map((pizza) => (
            <li
              key={pizza.id}
              className="py-2 flex items-center justify-between"
            >
              <div>
                <p>
                  {pizza.quantity}x <span className="ml-2">{pizza.name}</span>
                </p>
              </div>
              <div className="flex items-center gap-4 md:gap-8">
                <UpdateItemQuantity id={pizza.id} />
                <button
                  onClick={() => handleDeleteItem(pizza.id)}
                  className="btn-secondary"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={handleOrderPizzas} className="btn-primary">
          Order Pizzas
        </button>
        <button
          onClick={handleClearCart}
          className="mt-4 py-2 px-4 bg-transparent rounded-full uppercase text-sm font-semibold text-stone-400 inline-block tracking-wide hover:bg-stone-300 hover:text-stone-800 transition-all duration-300 border-2 border-stone-400 hover:border-stone-300"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
};

export default Cart;
