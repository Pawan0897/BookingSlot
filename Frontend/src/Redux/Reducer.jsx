import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
  name: "user",
  initialState: {
    userData: "",
    search: "",
  },
  reducers: {
    UserInfo: (state, action) => {
      state.userData = action.payload;
    },
    Setsearch: (state, action) => {
      state.search = action.payload;
    },
  },
});
export const { UserInfo, Setsearch } = User.actions;
export default User.reducer;
