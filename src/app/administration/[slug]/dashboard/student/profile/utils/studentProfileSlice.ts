import { RootState } from "@/app/administration/store";
import type { Permission, Role, SortDirection } from "@/types/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type SortField = "name" | "username" | "";

interface StudentProfileState {
  searchText: string;
  sortField: SortField;
  sortDirection: SortDirection;
}

const initialState: StudentProfileState = {
  searchText: "",
  sortField: "",
  sortDirection: "",
};

export const studentProfileSlice = createSlice({
  name: "student/profile",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
  },
});

export const { setSearchText, setSortField, setSortDirection } =
  studentProfileSlice.actions;

export const selectSearchText = (state: RootState) =>
  state.studentProfile.searchText;
export const selectSortField = (state: RootState) =>
  state.studentProfile.sortField;
export const selectSortDirection = (state: RootState) =>
  state.studentProfile.sortDirection;

export const studentProfileReducer = studentProfileSlice.reducer;
