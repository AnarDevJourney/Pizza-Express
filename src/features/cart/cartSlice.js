import { createSlice } from "@reduxjs/toolkit";

// Initial state of the cart
const initialState = {
  cart: [],
};

// Creating the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer to add a new item to the cart
    addItem(state, action) {
      // action.payload = newItem
      state.cart.push(action.payload);
    },
    // Reducer to delete an item from the cart by its id
    deleteItem(state, action) {
      // action.payload = id
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    // Reducer to increase the quantity of an item in the cart
    increaseItemQuantity(state, action) {
      // action.payload = id
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    // Reducer to decrease the quantity of an item in the cart
    decreaseItemQuantity(state, action) {
      // action.payload = id
      const item = state.cart.find((item) => item.id === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      // If the item's quantity reaches zero, remove it from the cart
      if (item.quantity === 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    // Reducer to clear the entire cart
    clearCart(state) {
      state.cart = [];
    },
  },
});

// Exporting the action creators
export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

// Exporting the cart reducer
const cartReducer = cartSlice.reducer;
export default cartReducer;

// Selector to get the total quantity of items in the cart
export const getTotalItemQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// Selector to get the total price of items in the cart
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// Selector to get the entire cart
export const getCart = (state) => state.cart.cart;

// Selector to get the current quantity of a specific item by its id
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;
