import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

const UpdateItemQuantity = ({ id, currentQuantity }) => {
  const dispatch = useDispatch();
  function handleDecreaseItemQuantity() {
    dispatch(decreaseItemQuantity(id));
  }
  function handleIncreaseItemQuantity() {
    dispatch(increaseItemQuantity(id));
  }
  return (
    <div className="space-x-3">
      <button
        onClick={handleDecreaseItemQuantity}
        className="rounded-full bg-yellow-400 px-3 py-1 text-lg"
      >
        -
      </button>
      <span>{currentQuantity}</span>
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
