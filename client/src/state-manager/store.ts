import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletBalance from "./features/wallet-balance";
import username from "./features/username";
import market from "./features/market";

const reducer = combineReducers({ walletBalance, username, market });

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
