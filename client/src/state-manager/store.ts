import { combineReducers, configureStore } from "@reduxjs/toolkit";
import walletBalance from "./features/wallet-balance";
import username from "./features/username";
import market from "./features/market";
import stock from "./features/stock";
import orderbook from "./features/orderbook";

const reducer = combineReducers({
  walletBalance,
  username,
  market,
  stock,
  orderbook,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
