import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      // payload = pizza.id
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      // payload = pizza.id
      const currentItem = state.cart.find((item) => item.id === action.payload);
      currentItem.quantity++;
      currentItem.totalPrice = currentItem.quantity * currentItem.unitPrice;
    },
    decreaseQuantity: (state, action) => {
      // payload = pizza.id
      const currentItem = state.cart.find((item) => item.id === action.payload);
      if (currentItem) {
        currentItem.quantity--;

        // when current quantity is 1 and we click decrease again it should remove item complately
        if (currentItem.quantity === 0) {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        } else {
          currentItem.totalPrice = currentItem.quantity * currentItem.unitPrice;
        }
      }
    },
    clearCart: (state) => {
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

// selector functions
export const getTotalQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentItemQuantity = (id) => (state) =>
  state.cart.cart.find((item) => item.id === id)?.quantity ?? 0;
