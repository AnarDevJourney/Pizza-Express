import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

// Configure Redux store with user and cart reducers
const store = configureStore({
  reducer: {
    user: userReducer, // User reducer manages user-related state
    cart: cartReducer, // Cart reducer manages shopping cart-related state
  },
});

export default store;
