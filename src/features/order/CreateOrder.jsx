import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Function for creating order
import { createOrder } from "../../services/apiRestaurant";
// Components to show loading and error states
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";

// Action for clearing cart after making order
import { clearCart } from "../cart/cartSlice";

// Selector function for getting total price of cart
import { getTotalPrice } from "../cart/cartSlice";

// Helper function for formatting number as currency
import { formatCurrency } from "../../utils/helpers";

// Fake cart for development purposes
/* const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
]; */

const CreateOrder = () => {
  // Getting username from redux to show default value in name input
  const username = useSelector((state) => state.user.username);
  // Getting cart from redux
  const cart = useSelector((state) => state.cart.cart);
  // Getting total price of pizzas
  const totalPricePizzas = useSelector(getTotalPrice);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // React Hook Form for form management
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Calculating total order price with adding priortiy and pizzas price
  const priority = watch("priority");
  const totalPriceOrder = priority
    ? totalPricePizzas + totalPricePizzas * 0.2
    : totalPricePizzas;

  // Handling post data to make new order with using React Query
  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log("Order placed successfully", data);
      navigate(`/order/${data.id}`);
      dispatch(clearCart());
    },
    onError: (err) => {
      console.error("Error: ", err.message);
    },
  });

  function onSubmit(formData) {
    // Connecting form data and cart data
    const orderData = {
      customer: formData.customer,
      phone: formData.phone,
      address: formData.address,
      priority: formData.priority,
      cart,
    };
    mutate(orderData);
  }

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <Error message={error.message} />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          <label className="sm:basis-40">First Name</label>
          <div className="flex flex-col grow">
            <input
              type="text"
              defaultValue={username}
              {...register("customer", { required: "First name is required" })}
              className="input grow"
            />
            {errors.customer && (
              <p className="input-error">{errors.customer.message}</p>
            )}
          </div>
        </div>
        <div className="input-container">
          <label className="sm:basis-40">Phone Number</label>
          <div className="flex flex-col grow">
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              className="input grow"
            />
            {errors.phone && (
              <p className="input-error">{errors.phone.message}</p>
            )}
          </div>
        </div>
        <div className="input-container">
          <label className="sm:basis-40">Address</label>
          <div className="flex flex-col grow">
            <input
              type="text"
              {...register("address", { required: "Adress is required" })}
              className="input"
            />
            {errors.address && (
              <p className="input-error">{errors.address.message}</p>
            )}
          </div>
        </div>
        <div className="mb-12 flex items-center gap-4">
          <input
            type="checkbox"
            {...register("priority")}
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>
        <button type="submit" className="btn primary">
          Order Now: {formatCurrency(totalPriceOrder)}
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
