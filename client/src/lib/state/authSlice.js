import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  justLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.justLoggedIn = true;
    },

    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
    },

    clearJustLoggedIn: (state) => {
      state.justLoggedIn = false;
    },
  },
});

export const { setCredentials, clearCredentials, clearJustLoggedIn } =
  authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectJustLoggedIn = (state) => state.auth.justLoggedIn;
