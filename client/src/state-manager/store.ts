import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletBalance from "./features/wallet-balance";

const reducer = combineReducers({ walletBalance });

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
