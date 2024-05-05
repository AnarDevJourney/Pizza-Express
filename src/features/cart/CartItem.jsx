import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import Delete from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

const CartItem = ({ item }) => {
  const { id, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  return (
    <li className="flex flex-wrap items-center justify-between gap-4 py-5">
      <p>
        {quantity} &times; {name}
      </p>
      <div className="flex items-center gap-4">
        <div>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
        <div>
          <UpdateItemQuantity id={id} currentQuantity={currentQuantity} />
        </div>
        <div>
          <Delete id={id} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
