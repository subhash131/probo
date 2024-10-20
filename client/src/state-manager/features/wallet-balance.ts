import { createSlice } from "@reduxjs/toolkit";

const walletBalance = createSlice({
  name: "wallet-balance",
  initialState: { balance: 0 },
  reducers: (create) => ({
    setBalance: create.reducer<number>((state, action) => {
      state.balance = action.payload;
    }),
  }),
});

export default walletBalance.reducer;
export const { setBalance } = walletBalance.actions;
