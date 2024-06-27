// Base URL for the API
const API_URL = "https://react-fast-pizza-api.onrender.com/api";

// Fetches the menu from the API
export async function getMenu() {
  // Send a GET request to the /menu endpoint
  const res = await fetch(`${API_URL}/menu`);

  // Check if the response is valid
  if (!res) {
    // Throw an error if the response is invalid
    throw Error("Failed getting menu");
  }

  // Parse the response JSON and extract the data
  const { data } = await res.json();
  return data;
}

// Fetches a specific order by ID from the API
export async function getOrder(id) {
  // Send a GET request to the /order/{id} endpoint
  const res = await fetch(`${API_URL}/order/${id}`);

  // Check if the response is successful
  if (!res.ok) {
    // Throw an error if the order is not found
    throw Error(`Couldn't find order #${id}`);
  }

  // Parse the response JSON and extract the data
  const { data } = await res.json();
  return data;
}

// Creates a new order in the API
export async function createOrder(newOrder) {
  try {
    // Send a POST request to the /order endpoint with the new order data
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is successful
    if (!res.ok) throw Error();

    // Parse the response JSON and extract the data
    const { data } = await res.json();
    return data;
  } catch {
    // Throw an error if the order creation fails
    throw Error("Failed creating your order");
  }
}
