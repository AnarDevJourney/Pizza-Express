import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [orderId, setOrderId] = useState("");
  const naviage = useNavigate();

  function handleOrderIdChange(e) {
    setOrderId(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    naviage(`/order/${orderId}`);
    setOrderId("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Order #"
        value={orderId}
        onChange={handleOrderIdChange}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
};

export default SearchOrder;
