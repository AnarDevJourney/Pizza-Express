import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer function for adding pizzas to the cart
    addItem: (state, action) => {
      // action.payload = newItem
      state.cart.push(action.payload);
    },
    // Reducer function for removing pizzas from the cart
    deleteItem: (state, action) => {
      // action.payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    // Reducer function for increasing quantity of item in the cart
    increaseQuantity: (state, action) => {
      // action.payload = pizzaId

      // Finding current item
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      // updating quantity and total price
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity: (state, action) => {
      // action.payload = pizzaId

      // Finding current item
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      // updating quantity an total price
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      // if quantity is 1 then delete this item from cart in the next click
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    // Reducer function for celaring all items from cart
    clearCart: (state, action) => {
      state.cart = [];
    },
  },
});

// exporting actions and reducer
export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

// Selector function for getting total quantity of items in the cart
export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// Selector function for getting total price of cart
export const getTotalPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// Selector function for getting current quantity of item in the cart
export const getCurrentQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
