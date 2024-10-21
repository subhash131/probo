import { createSlice } from "@reduxjs/toolkit";

type MarketState = {
  market: {
    [name: string]: {
      [name: string]: number;
    };
  };
};

const initialState: MarketState = { market: {} };

const market = createSlice({
  name: "market",
  initialState,
  reducers: (create) => ({
    setMarket: create.reducer<MarketState["market"]>((state, action) => {
      state.market = action.payload;
    }),
  }),
});

export default market.reducer;
export const { setMarket } = market.actions;
