import { RootState } from "@/app/administration/store";
import type { Permission, Role, SortDirection } from "@/types/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type SortField = "name" | "username" | "";

interface StaffProfileState {
  searchText: string;
  sortField: SortField;
  sortDirection: SortDirection;
  permissionFilter: Permission | "";
  roleFilter: Role | "";
}

const initialState: StaffProfileState = {
  searchText: "",
  sortField: "",
  sortDirection: "",
  permissionFilter: "",
  roleFilter: "",
};

export const staffProfileSlice = createSlice({
  name: "staff/profile",
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
    setPermissionFilter: (state, action: PayloadAction<Permission | "">) => {
      state.permissionFilter = action.payload;
    },
    setRoleFilter: (state, action: PayloadAction<Role | "">) => {
      state.roleFilter = action.payload;
    },
  },
});

export const {
  setSearchText,
  setSortField,
  setSortDirection,
  setPermissionFilter,
  setRoleFilter,
} = staffProfileSlice.actions;

export const selectSearchText = (state: RootState) =>
  state.staffProfile.searchText;
export const selectSortField = (state: RootState) =>
  state.staffProfile.sortField;
export const selectSortDirection = (state: RootState) =>
  state.staffProfile.sortDirection;
export const selectPermissionFilter = (state: RootState) =>
  state.staffProfile.permissionFilter;
export const selectRoleFilter = (state: RootState) =>
  state.staffProfile.roleFilter;

export const staffProfileReducer = staffProfileSlice.reducer;
