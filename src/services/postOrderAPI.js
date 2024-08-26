export async function postOrder(newOrder) {
  try {
    const res = await fetch(
      "https://react-fast-pizza-api.onrender.com/api/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to create your order");
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}
