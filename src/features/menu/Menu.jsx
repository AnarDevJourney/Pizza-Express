import { useQuery } from "@tanstack/react-query";

// Function for fetching menu data
import { fetchMenu } from "../../services/apiRestaurant";

// Components for showing Loading and Error states
import Loader from "../../ui/Loader";
import Error from "../../ui/Error";

// Component to render each menu item data
import MenuItem from "./MenuItem";

const Menu = () => {
  // Fetching menu data with using React Query
  const {
    data: menu,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchMenu,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error message={error.message} onRetry={refetch} />;
  }

  return (
    <ul className="divide-y divide-stone-200 p-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
};

export default Menu;
