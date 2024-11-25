import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import { RootState } from "@/app/administration/store";

interface StaffAttendance {
  progress: string;
  progressLog: string;
  isOpenProgressAlert: boolean;
  searchText: string;
  selectedDate: string;
}

const initialState: StaffAttendance = {
  progress: "0%",
  progressLog: "",
  isOpenProgressAlert: false,
  searchText: "",
  selectedDate: dayjs().toISOString(),
};

const staffAttendanceSlice = createSlice({
  name: "staff/attendance",
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<string>) => {
      state.progress = action.payload;
    },
    setProgressLog: (state, action: PayloadAction<string>) => {
      state.progressLog = action.payload;
    },
    toggleProgressAlert: (state, action: PayloadAction<boolean>) => {
      state.isOpenProgressAlert = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const {
  setProgress,
  setProgressLog,
  toggleProgressAlert,
  setSearchText,
  setSelectedDate,
} = staffAttendanceSlice.actions;

export const selectProgress = (state: RootState) =>
  state.staffAttendance.progress;
export const selectProgressLog = (state: RootState) =>
  state.staffAttendance.progressLog;
export const selectIsOpenProgressAlert = (state: RootState) =>
  state.staffAttendance.isOpenProgressAlert;
export const selectSearchText = (state: RootState) =>
  state.staffAttendance.searchText;
export const selectSelectedDate = (state: RootState) =>
  state.staffAttendance.selectedDate;

const staffAttendanceReducer = staffAttendanceSlice.reducer;
export default staffAttendanceReducer;
