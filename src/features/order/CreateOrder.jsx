import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

//! Fake cart
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
  const [isPriorityOn, setIsPriorityOn] = useState(false);
  function handleIsPriorityOnChange(e) {
    setIsPriorityOn(e.target.checked);
  }
  const totalPizzasPrice = useSelector(getTotalCartPrice);
  const priorityPrice = isPriorityOn ? totalPizzasPrice * 0.2 : 0;
  const totalCartPrice = totalPizzasPrice + priorityPrice;
  const cartArray = useSelector(getCart);
  const cart = cartArray.map((item) => {
    return { ...item, pizzaId: item.id };
  });
  const formErrors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const username = useSelector((state) => state.user.username);

  return (
    <div className="mx-auto mt-8 max-w-4xl px-4 py-3">
      <h2 className="mb-6 text-xl font-semibold">Ready to order? Lets go!</h2>
      <Form method="POST" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <label className="text-lg font-semibold sm:basis-60">
            First Name
          </label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input w-full"
          />
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <label className="text-lg font-semibold sm:basis-60">
            Phone number
          </label>
          <div className="w-full space-y-2">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="rounded-md bg-red-100 p-1 text-sm text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <label className="text-lg font-semibold sm:basis-60">Adress</label>
          <input type="text" name="address" required className="input w-full" />
        </div>
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            onChange={handleIsPriorityOnChange}
            value={isPriorityOn}
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button type="submit" disabled={isSubmitting} className="button mt-6">
            {isSubmitting
              ? "Placing order..."
              : `Order now ${formatCurrency(totalCartPrice)}`}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CreateOrder;

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }
  if (Object.keys(errors).length > 0) {
    return errors;
  }
  const newOrder = await createOrder(order);
  console.log(newOrder);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
