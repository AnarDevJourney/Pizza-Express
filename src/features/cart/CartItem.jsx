// Reusable components for deleting item from cart and updating quantity
import DeleteItem from "./DeleteItem";
import UpdateQuantity from "./UpdateQuantity";

// Helper function for formatting number as currency
import { formatCurrency } from "../../utils/helpers";

const CartItem = ({ item }) => {
  // Destructuring necessery datas
  const { pizzaId, name, quantity, totalPrice } = item;
  return (
    <li className="py-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateQuantity id={pizzaId} />
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
};

export default CartItem;
