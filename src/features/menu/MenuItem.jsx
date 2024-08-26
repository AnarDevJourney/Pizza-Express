import { useSelector, useDispatch } from "react-redux";
// action for adding pizza to the cart
import { addItem } from "../cart/cartSlice";
// action for deleting item from cart
import { deleteItem } from "../cart/cartSlice";
// selector function for getting quantity of current item
import { getCurrentItemQuantity } from "../cart/cartSlice";
// component to update item quantity
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

const MenuItem = ({ pizza }) => {
  const dispatch = useDispatch();

  const currentItemQuantity = useSelector(getCurrentItemQuantity(pizza.id));
  const isItemInCart = currentItemQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      id: pizza.id,
      name: pizza.name,
      quantity: 1,
      unitPrice: pizza.unitPrice,
      totalPrice: pizza.unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  function handleDeleteItem() {
    dispatch(deleteItem(pizza.id));
  }
  return (
    <li className="flex items-center gap-4 py-2">
      <div>
        <img
          src={pizza.imageUrl}
          alt={pizza.name}
          className={`h-24 sm:h-24/ ${
            pizza.soldOut ? "opacity-70 grayscale" : ""
          }`}
        />
      </div>
      <div className="flex items-center justify-between flex-grow">
        <div className="flex flex-col gap-2">
          <p className="font-medium">{pizza.name}</p>
          <p className="text-sm capitalize italic text-stone-500 max-w-36 sm:max-w-72">
            {pizza.ingredients.join(", ")}
          </p>
          <p className="text-sm uppercase text-stone-700 font-medium">
            {pizza.soldOut ? "Sold out" : `$${pizza.unitPrice}`}
          </p>
        </div>
        <div>
          {isItemInCart && (
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:gap-8">
              <UpdateItemQuantity id={pizza.id} />
              <button onClick={handleDeleteItem} className="btn-secondary">
                Delete
              </button>
            </div>
          )}
          {!pizza.soldOut && !isItemInCart && (
            <button onClick={handleAddToCart} className="btn-secondary">
              Add to cart
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
