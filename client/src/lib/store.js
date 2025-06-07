import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import authReducer from "./state/authSlice";
import { apiSlice } from "./state/apiSlice";

import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Only persist the auth slice
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer, // Include the apiSlice reducer
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(apiSlice.middleware), // Add the apiSlice middleware
});

export const persistor = persistStore(store);
