import { createSlice } from "@reduxjs/toolkit";

type UsernameState = {
  username: string;
};

const initialState: UsernameState = { username: "" };

const username = createSlice({
  name: "username",
  initialState,
  reducers: (create) => ({
    setUsername: create.reducer<string>((state, action) => {
      state.username = action.payload;
    }),
  }),
});

export default username.reducer;
export const { setUsername } = username.actions;
