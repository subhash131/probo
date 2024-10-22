import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletBalance from "./features/wallet-balance";
import username from "./features/username";
import market from "./features/market";
import stock from "./features/stock";

const reducer = combineReducers({ walletBalance, username, market, stock });

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
