import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  // State to hold the search query
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // Handler function to update the query state as the input value changes
  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  // Handler function to submit the search form
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return; // If query is empty, do nothing
    navigate(`/order/${query}`); // Navigate to the order details page with the query ID
    setQuery(""); // Clear the query after navigation
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for entering order number */}
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
