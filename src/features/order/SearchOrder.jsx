import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleQueryChange(e) {
    setQuery(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search order #"
        onChange={handleQueryChange}
        value={query}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm transition-all duration-200 placeholder:text-[9px] placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:placeholder:text-sm sm:focus:w-72"
      />
    </form>
  );
};

export default SearchOrder;
