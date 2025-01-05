import { useDispatch, useSelector } from "react-redux";

// Actions for updating item quantity and selector function for getting total quantity of current item
import {
  increaseQuantity,
  decreaseQuantity,
  getCurrentQuantity,
} from "./cartSlice";

const UpdateQuantity = ({ id }) => {
  const dispatch = useDispatch();
  // Getting current quantity with selector function
  const currentQuantity = useSelector(getCurrentQuantity(id));
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <button
        onClick={() => dispatch(decreaseQuantity(id))}
        className="btn round"
      >
        -
      </button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <button
        onClick={() => dispatch(increaseQuantity(id))}
        className="btn round"
      >
        +
      </button>
    </div>
  );
};

export default UpdateQuantity;
