export async function getOrder(id) {
  try {
    const res = await fetch(
      `https://react-fast-pizza-api.onrender.com/api/order/${id}`
    );
    if (!res.ok) {
      throw new Error("Could not fetch order");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}
