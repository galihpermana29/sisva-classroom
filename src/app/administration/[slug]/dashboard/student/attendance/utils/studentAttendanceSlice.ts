import { RootState } from "@/app/administration/store";
import type { Attendance, SortDirection } from "@/globalcomponents/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type SortField = "name" | "username" | "";

interface StudentAttendance {
  progress: string;
  progressLog: string;
  isOpenProgressAlert: boolean;
  searchText: string;
  sortField: SortField;
  sortDirection: SortDirection;
  studentGroupFilter: string;
  attendanceFilter: Attendance | "";
}

const initialState: StudentAttendance = {
  progress: "0%",
  progressLog: "",
  isOpenProgressAlert: false,
  searchText: "",
  sortField: "",
  sortDirection: "",
  studentGroupFilter: "",
  attendanceFilter: "",
};

export const studentAttendanceSlice = createSlice({
  name: "student/attendance",
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
    setSortField: (state, action: PayloadAction<SortField>) => {
      state.sortField = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
    setStudentGroupFilter: (state, action: PayloadAction<string>) => {
      state.studentGroupFilter = action.payload;
    },
    setAttendanceFilter: (state, action: PayloadAction<Attendance>) => {
      state.attendanceFilter = action.payload;
    },
  },
});

export const {
  setProgress,
  setProgressLog,
  toggleProgressAlert,
  setSearchText,
  setSortField,
  setSortDirection,
  setStudentGroupFilter,
  setAttendanceFilter,
} = studentAttendanceSlice.actions;

export const selectProgress = (state: RootState) =>
  state.studentAttendance.progress;
export const selectProgressLog = (state: RootState) =>
  state.studentAttendance.progressLog;
export const selectIsOpenProgressAlert = (state: RootState) =>
  state.studentAttendance.isOpenProgressAlert;
export const selectSearchText = (state: RootState) =>
  state.studentAttendance.searchText;
export const selectSortField = (state: RootState) =>
  state.studentAttendance.sortField;
export const selectSortDirection = (state: RootState) =>
  state.studentAttendance.sortDirection;
export const selectStudentGroupFilter = (state: RootState) =>
  state.studentAttendance.studentGroupFilter;
export const selectAttendanceFilter = (state: RootState) =>
  state.studentAttendance.attendanceFilter;

export default studentAttendanceSlice.reducer;
