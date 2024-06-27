import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

const UpdateItemQuantity = ({ id, currentQuantity }) => {

  const dispatch = useDispatch();

  // Handler function to dispatch the decreaseItemQuantity action
  function handleDecreaseItemQuantity() {
    dispatch(decreaseItemQuantity(id));
  }

  // Handler function to dispatch the increaseItemQuantity action
  function handleIncreaseItemQuantity() {
    dispatch(increaseItemQuantity(id));
  }

  return (
    <div className="space-x-3">
      {/* Button to decrease item quantity */}
      <button
        onClick={handleDecreaseItemQuantity}
        className="rounded-full bg-yellow-400 px-3 py-1 text-lg"
      >
        -
      </button>
      {/* Display the current quantity of the item */}
      <span>{currentQuantity}</span>
      {/* Button to increase item quantity */}
      <button
        onClick={handleIncreaseItemQuantity}
        className="rounded-full bg-yellow-400 px-3 py-1 text-lg"
      >
        +
      </button>
    </div>
  );
};

export default UpdateItemQuantity;
