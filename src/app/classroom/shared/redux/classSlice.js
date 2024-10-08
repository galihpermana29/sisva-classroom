import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  detailClass: null,
  isFetching: false,
};

const classSlice = createSlice({
  name: "classData",
  initialState,
  reducers: {
    setClassData: (state, action) => {
      state.detailClass = action.payload;
    },
    setIsFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const { setClassData, setIsFetching } = classSlice.actions;

export default classSlice.reducer;
