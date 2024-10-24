import { createSlice } from "@reduxjs/toolkit";

export type OrderbookState = {
  orderbook: {
    [stock: string]: {
      [price: string]: {
        total: number;
        orders: {
          [user: string]: number;
        };
      };
    };
  };
};

const initialState: OrderbookState = {
  orderbook: {},
};

const orderbook = createSlice({
  initialState,
  name: "orderbook",
  reducers: (create) => ({
    setOrderbook: create.reducer<OrderbookState["orderbook"]>(
      (state, action) => {
        state.orderbook = action.payload;
      }
    ),
  }),
});

export default orderbook.reducer;
export const { setOrderbook } = orderbook.actions;
