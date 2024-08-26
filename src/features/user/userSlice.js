import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: "" };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

// exporting actions and reducer
export const { updateUsername } = userSlice.actions;
export const userReducer = userSlice.reducer;
