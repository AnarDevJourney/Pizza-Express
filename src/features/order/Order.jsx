import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Function for fetching order data by order id
import { fetchOrder } from "../../services/apiRestaurant";
// Components to show loading and error states
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";

// Helper functions
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

// Component to show each order item data
import OrderItem from "./OrderItem";

const Order = () => {
  // Getting order id from URL
  const { orderId } = useParams();

  // Fetching order data with using React Query
  const {
    data: order,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [`${{ orderId }}`],
    queryFn: () => fetchOrder(orderId),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message={error.message} onRetry={refetch} />;
  }

  // Destructuring necessery data
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  // Variable to show how many tines left for delivery
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>
        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        {deliveryIn >= 0 ? (
          <p className="font-medium">Only {deliveryIn} minutes left 😃</p>
        ) : (
          <p className="font-medium">Order should have arrived</p>
        )}
        <p className="text-sm text-stone-500">
          Estimated delivery: {formatDate(estimatedDelivery)}
        </p>
      </div>
      <ul className="divide-y divide-stone-200">
        {cart.map((item) => (
          <OrderItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Priority price: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
};

export default Order;
