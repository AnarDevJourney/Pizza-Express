import { useDispatch } from "react-redux";

// Action for deleting item from cart
import { deleteItem } from "./cartSlice";

const DeleteItem = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(deleteItem(id))} className="btn small">
      Delete
    </button>
  );
};

export default DeleteItem;
