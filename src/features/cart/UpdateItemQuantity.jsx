import { useSelector, useDispatch } from "react-redux";
// selector function for getting current item quantity
import { getCurrentItemQuantity } from "./cartSlice";
// action for increase item quantity
import { increaseQuantity } from "./cartSlice";
// action for decrease item quantity
import { decreaseQuantity } from "./cartSlice";

const UpdateItemQuantity = ({ id }) => {
  const dispatch = useDispatch();

  const currentItemQuantity = useSelector(getCurrentItemQuantity(id));

  function handleIncreaseQuantity() {
    dispatch(increaseQuantity(id));
  }

  function handleDecreaseQuantity() {
    dispatch(decreaseQuantity(id));
  }
  return (
    <div className="flex items-center gap-2">
      <button onClick={handleDecreaseQuantity} className="updateQuantity">
        -
      </button>
      <p>{currentItemQuantity}</p>
      <button onClick={handleIncreaseQuantity} className="updateQuantity">
        +
      </button>
    </div>
  );
};

export default UpdateItemQuantity;
