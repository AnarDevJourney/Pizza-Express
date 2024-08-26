import { useQuery } from "@tanstack/react-query";
import MenuItem from "./MenuItem";
// Function for fetching menu
import { getMenu } from "../../services/menuAPI";
// Loader component to show data is still loading
import Loader from "../../ui/Loader";
// Error component to show there is a fetching error
import FetchingErrors from "../../ui/FetchingErrors";

const Menu = () => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["menu"],
    queryFn: () => getMenu(),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <FetchingErrors message={error.message} retry={refetch} />;
  }

  return (
    data && (
      <ul className="px-3 divide-y divide-stone-200">
        {data.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    )
  );
};

export default Menu;
