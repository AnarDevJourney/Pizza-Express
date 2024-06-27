import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

const Menu = () => {
  //! Fake Menu
  /* const menu = [
    {
      id: 1,
      name: "Margherita",
      unitPrice: 12,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-1.jpg",
      ingredients: ["tomato", "mozzarella", "basil"],
      soldOut: false,
    },
    {
      id: 2,
      name: "Capricciossa",
      unitPrice: 14,
      imageUrl:
        "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/pizzas/pizza-2.jpg",
      ingredients: ["tomato", "mozzarella", "hum", "mushrooms"],
      soldOut: true,
    },
  ]; */

  // Load menu data using the useLoaderData hook
  const menu = useLoaderData();

  return (
    <ul className="mx-auto max-w-6xl divide-y divide-stone-200 p-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
};

export default Menu;

// Loader function to fetch the menu data
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const menu = await getMenu();
  return menu;
}
