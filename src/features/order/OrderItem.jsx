// Helper function for formatting number as currency
import { formatCurrency } from "../../utils/helpers";

const OrderItem = ({ item }) => {
  // Destrucuring necessery data
  const { quantity, name, totalPrice } = item;
  return (
    <li className="flex items-center justify-between py-2">
      <p>
        <span className="font-bold">{quantity}&times;</span> {name}
      </p>
      <p className="font-bold">{formatCurrency(totalPrice)}</p>
    </li>
  );
};

export default OrderItem;
