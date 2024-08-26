import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// Helper function for phone number validation
import { validatePhoneNumber } from "../../utils/helpers";
// Function to post order
import { postOrder } from "../../services/postOrderAPI";
// Loader and Error component
import Loader from "../../ui/Loader";
import FetchingErrors from "../../ui/FetchingErrors";
// selector function for getting total price of cart
import { getTotalPrice } from "../cart/cartSlice";
// action for clearing cart after creating order succesfully
import { clearCart } from "../cart/cartSlice";

// Fake Cart
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
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [priority, setPriority] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(""); // state for phone number errors
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Real cart from redux store with id changed to pizzaId because backend expects pizzaId not id
  const cart = useSelector((state) =>
    state.cart.cart.map((item) => ({
      ...item,
      pizzaId: item.id,
      id: undefined,
    }))
  );
  console.log(cart);
  // price of pizzas
  const pricePizzas = useSelector(getTotalPrice);
  // total price of order
  const priceOrder = priority ? pricePizzas + pricePizzas * 0.2 : pricePizzas;

  function handleCustomerChange(e) {
    setCustomer(e.target.value);
  }

  function handlePhoneChange(e) {
    setPhone(e.target.value);
  }

  function handleAddressChange(e) {
    setAddress(e.target.value);
  }

  function handlePriortyChange(e) {
    setPriority(e.target.checked);
  }

  const mutation = useMutation({
    mutationFn: postOrder,
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log("Order placed successfully: ", data);
      navigate(`/order/${data.id}`);
      dispatch(clearCart());
    },
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!validatePhoneNumber(phone)) {
      setPhoneNumberError(
        "Please give us your correct phone number, We might need to contact you."
      );
      return;
    }

    setPhoneNumberError("");

    mutation.mutate({
      customer,
      phone,
      address,
      priority,
      cart,
    });
  }

  if (mutation.isPending) {
    return <Loader />;
  }

  if (mutation.isError) {
    return (
      <FetchingErrors
        message={mutation.error.message}
        retry={() =>
          mutation.mutate({
            customer,
            phone,
            address,
            priority,
            cart,
          })
        }
      />
    );
  }

  return (
    <div className="p-4">
      <h1 className="mb-8 text-xl font-medium tracking-wide">
        Ready to order? Let's go!
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="tracking-wide md:basis-40">First Name</label>
          <input
            type="text"
            required
            value={customer}
            onChange={handleCustomerChange}
            className="input flex-grow"
          />
        </div>
        <div className="input-container">
          <label className="tracking-wide md:basis-40">Phone number</label>
          <div className="flex-grow">
            <input
              type="tel"
              required
              value={phone}
              onChange={handlePhoneChange}
              className="input flex-grow w-full"
            />
            {phoneNumberError && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {phoneNumberError}
              </p>
            )}
          </div>
        </div>
        <div className="input-container">
          <label className="tracking-wide md:basis-40">Adress</label>
          <input
            type="text"
            required
            value={address}
            onChange={handleAddressChange}
            className="input flex-grow"
          />
        </div>
        <div className="flex items-center gap-3 mb-10 mt-6">
          <input
            type="checkbox"
            id="priority"
            checked={priority}
            onChange={handlePriortyChange}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="tracking-wider font-medium">
            Want to yo give your order priority?
          </label>
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="btn-primary"
        >
          Order Now For <span className="ml-1">${priceOrder}</span>
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
