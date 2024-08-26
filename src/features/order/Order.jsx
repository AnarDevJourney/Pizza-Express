import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// Function for fetching order
import { getOrder } from "../../services/orderAPI";
// Loader component to show data is still loading
import Loader from "../../ui/Loader";
// Error component to show fetching errors
import FetchingErrors from "../../ui/FetchingErrors";
// helper function for formating date
import { formatDate } from "../../utils/helpers";
// helper function for calculating lefting minutes
import { timeDifferenceInMinutes } from "../../utils/helpers";

const Order = () => {
  const { id } = useParams();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrder(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <FetchingErrors message={error.message} retry={refetch} />;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 mb-8 md:flex-row md:items-center md:justify-between">
        <p className="text-xl font-medium">
          Order <span className="ml-1">#{data.id}</span>
        </p>
        <div className="flex items-center gap-4">
          {data.priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priorty{" "}
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {data.status}
          </span>
        </div>
      </div>
      <div className="bg-stone-200 px-6 py-5 flex flex-col gap-2 mb-8 md:flex-row md:items-center md:justify-between">
        <p className="font-medium tracking-wider">
          {data.status === "delivered"
            ? "Order should have arrived"
            : `Only left ${timeDifferenceInMinutes(data.estimatedDelivery)}`}
        </p>
        <p className="text-xs text-stone-500">{`(Estimated delivery: ${formatDate(
          data.estimatedDelivery
        )})`}</p>
      </div>
      <ul className="divide-y divide-stone-200 mb-8">
        {data.cart.map((pizza) => (
          <li
            key={pizza.name}
            className="py-4 flex items-center justify-between"
          >
            <p>
              <span className="font-medium">{pizza.quantity}x</span>{" "}
              <span className="ml-2">{pizza.name}</span>
            </p>
            <p>${pizza.totalPrice}</p>
          </li>
        ))}
      </ul>
      <div className="bg-stone-200 px-6 py-5 flex flex-col gap-2">
        <p className="text-sm font-medium text-stone-600 tracking-wider">
          Price pizza: <span className="ml-2">${data.orderPrice}</span>
        </p>
        {data.priority && (
          <p className="text-sm font-medium text-stone-600 tracking-wider">
            Priority price: <span className="ml-2">${data.priorityPrice}</span>
          </p>
        )}
        <p className="font-semibold tracking-wider">
          To pay on delivery:
          <span className="ml-2">
            {data.priority
              ? ` $${data.orderPrice + data.priorityPrice}`
              : ` $${data.orderPrice}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Order;
