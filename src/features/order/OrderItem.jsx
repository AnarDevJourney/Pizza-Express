import { formatCurrency } from "../../utils/helpers";

const OrderItem = ({ item }) => {
  const { name, quantity, totalPrice } = item;
  return (
    <li className="flex items-center justify-between py-3">
      <p>
        <span className="font-bold">{quantity}</span> &times; {name}
      </p>
      <p className="font-bold">{formatCurrency(totalPrice)}</p>
    </li>
  );
};

export default OrderItem;
