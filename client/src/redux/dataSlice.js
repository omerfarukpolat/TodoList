import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userItemsData: [],
  currentUser: null,
  accessToken: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUserItemsData: (state, action) => {
      state.data = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});
export const { setUserItemsData, setAccessToken, setCurrentUser } =
  dataSlice.actions;
export default dataSlice.reducer;
