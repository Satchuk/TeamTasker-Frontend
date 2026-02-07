import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  username: "",
  userId: ""
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },

     logout: (state) => {
      state.username = "";
      state.userId = "";
      state.email = "";
      state.token = "";
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
