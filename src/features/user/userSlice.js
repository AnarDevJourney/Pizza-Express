import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer function for updating username
    updateName: (state, action) => {
      state.username = action.payload;
    },
  },
});

// Exporting action and reducer
export const { updateName } = userSlice.actions;

export const userReducer = userSlice.reducer;
