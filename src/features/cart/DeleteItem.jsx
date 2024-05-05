import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

const Delete = ({ id }) => {
  const dispatch = useDispatch();
  function handleDeleteItem() {
    dispatch(deleteItem(id));
  }
  return (
    <button onClick={handleDeleteItem} className="button-small">
      Delete
    </button>
  );
};

export default Delete;
