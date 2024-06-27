import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calculateRemainingTime,
  formatCurrency,
  formatDateTime,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";

//! Fake Order - This is a placeholder for testing purposes
/* const order = {
  id: "ABCDEF",
  customer: "Jonas",
  phone: "123456789",
  address: "Arroios, Lisbon , Portugal",
  priority: true,
  estimatedDelivery: "2027-04-25T10:00:00",
  status: "Preparing",
  cart: [
    {
      pizzaId: 7,
      name: "Napoli",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      pizzaId: 5,
      name: "Diavola",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      pizzaId: 3,
      name: "Romana",
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    },
  ],
  position: "-9.000,38.000",
  orderPrice: 95,
  priorityPrice: 19,
}; */

const Order = () => {
  // Retrieve the order data from the loader
  const order = useLoaderData();
  const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery } =
    order;
  const cart = order.cart;

  return (
    <div className="mx-auto mt-8 max-w-4xl space-y-8 px-4 py-6">
      {/* Order header with order ID and status */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">Order {id}</h1>
        <div className="flex items-center space-x-6">
          {priority && (
            <p className="rounded-full bg-red-600 px-3 py-1 text-sm font-bold uppercase tracking-wide text-red-50">
              Priority
            </p>
          )}
          <p className="rounded-full bg-green-600 px-3 py-1 text-sm font-bold uppercase tracking-wide text-green-50">
            {status} order
          </p>
        </div>
      </div>
      {/* Delivery time information */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-stone-200 px-6 py-4">
        <p className="font-semibold">
          Only {calculateRemainingTime(estimatedDelivery)} left
        </p>
        <p className="text-sm text-stone-500">
          Estimated delivery: {formatDateTime(estimatedDelivery)}
        </p>
      </div>
      {/* Order items list */}
      <div>
        <ul className="divide-y divide-stone-200 border-b border-t">
          {cart.map((item) => (
            <OrderItem item={item} key={item.pizzaId} />
          ))}
        </ul>
      </div>
      {/* Order price breakdown */}
      <div className="space-y-4 rounded-xl bg-stone-200 px-6 py-4">
        <p>Price pizzas: {formatCurrency(orderPrice)}</p>
        <p>Priority price: {formatCurrency(priorityPrice)}</p>
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
};

export default Order;

// Loader function to fetch order data based on order ID from params
// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}
