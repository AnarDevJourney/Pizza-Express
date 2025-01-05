import { formatCurrency } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";

// Action for adding item to cart
import { addItem } from "../cart/cartSlice";

// Reusable components for deleting item from cart and updating quantity
import DeleteItem from "../cart/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";

// Selector function for getting current quantity of each item in the cart
import { getCurrentQuantity } from "../cart/cartSlice";

const MenuItem = ({ pizza }) => {
  // Destructuring necessery data
  const { id, name, unitPrice, imageUrl, ingredients, soldOut } = pizza;

  const dispatch = useDispatch();

  // Creating variable current quantity of item with using selector function
  const currentQuantity = useSelector(getCurrentQuantity(id));
  // Creating boolean to check if item is in cart or not
  const isInCart = currentQuantity > 0;

  // Function for adding new item to the cart
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold out</p>}
          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateQuantity id={id} />
              <DeleteItem id={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <button onClick={handleAddToCart} className="btn small">
              Add to cart
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
