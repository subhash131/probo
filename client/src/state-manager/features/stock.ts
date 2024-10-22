import { createSlice } from "@reduxjs/toolkit";

type StockState = {
  stock: {
    [symbol: string]: {
      [type: string]: number;
    };
  };
};

const initialState: StockState = {
  stock: {},
};

const stock = createSlice({
  initialState,
  name: "stock",
  reducers: (create) => ({
    setStock: create.reducer<StockState["stock"]>((state, action) => {
      state.stock = action.payload;
    }),
  }),
});

export default stock.reducer;
export const { setStock } = stock.actions;
