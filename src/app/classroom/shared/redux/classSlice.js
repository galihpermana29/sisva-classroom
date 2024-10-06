import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classData: null,
};

const classSlice = createSlice({
  name: "classData",
  initialState,
  reducers: {
    setClassData: (state, action) => {
      state.classData = action.payload;
    },
  },
});

export const { setClassData } = classSlice.actions;

export default classSlice.reducer;
