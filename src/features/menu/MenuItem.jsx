import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import Delete from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { formatCurrency } from "../../utils/helpers";

const MenuItem = ({ pizza }) => {
  const { id, name, unitPrice, imageUrl, ingredients, soldOut } = pizza;
  const dispatch = useDispatch();

  // Get the current quantity of the pizza in the cart
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  // Determine if the pizza is already in the cart
  const isInCart = currentQuantity > 0;

  // Handler to add the pizza to the cart
  function handleAddToCart() {
    const newItem = {
      id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex items-center gap-4 pb-4">
      <img
        src={imageUrl}
        alt={name}
        className={`h-16 sm:h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize sm:text-base">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>Sold Out</p>}
          
          {/* If the pizza is in the cart, show the update and delete options */}
          {isInCart && (
            <div className="flex items-center space-x-3">
              <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
              <Delete id={id} />
            </div>
          )}
          
          {/* If the pizza is not sold out and not in the cart, show the add to cart button */}
          {!soldOut && !isInCart && (
            <button onClick={handleAddToCart} className="button-small">
              Add to cart
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;
