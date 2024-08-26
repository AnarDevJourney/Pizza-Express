export async function getMenu() {
  try {
    const res = await fetch(
      "https://react-fast-pizza-api.onrender.com/api/menu"
    );
    if (!res.ok) {
      throw new Error("Could not fetch menu");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}
