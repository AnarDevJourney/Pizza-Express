const API_URL = "https://react-fast-pizza-api.jonas.io/api";

// Function for fetching menu data
export async function fetchMenu() {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) {
    throw new Error("Something went wrong. Failed to get menu");
  }
  const { data } = await res.json();
  return data;
}

// Function for fetching order data by order id
export async function fetchOrder(orderId) {
  const res = await fetch(`${API_URL}/order/${orderId}`);
  if (!res.ok) {
    throw new Error("Something went wrong. Failed to get order");
  }
  const { data } = await res.json();
  return data;
}

// Function for creating order
export async function createOrder(newOrder) {
  const res = await fetch(`${API_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });
  if (!res.ok) {
    throw new Error("Something went wrong. Failed to create order");
  }
  const { data } = await res.json();
  return data;
}
