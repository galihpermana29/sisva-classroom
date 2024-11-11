import { RootState } from "@/app/administration/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
interface StaffAttendance {
  progress: string;
  progressLog: string;
  isOpenProgressAlert: boolean;
}

const initialState: StaffAttendance = {
  progress: "0%",
  progressLog: "",
  isOpenProgressAlert: false,
};

export const staffAttendanceSlice = createSlice({
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
  },
});

export const { setProgress, setProgressLog, toggleProgressAlert } =
  staffAttendanceSlice.actions;

export const selectProgress = (state: RootState) =>
  state.staffAttendance.progress;
export const selectProgressLog = (state: RootState) =>
  state.staffAttendance.progressLog;
export const selectIsOpenProgressAlert = (state: RootState) =>
  state.staffAttendance.isOpenProgressAlert;

export default staffAttendanceSlice.reducer;
