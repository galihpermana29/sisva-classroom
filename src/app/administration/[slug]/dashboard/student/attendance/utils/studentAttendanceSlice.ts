import { RootState } from "@/app/administration/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
interface StudentAttendance {
  progress: string;
  progressLog: string;
  isOpenProgressAlert: boolean;
}

const initialState: StudentAttendance = {
  progress: "0%",
  progressLog: "",
  isOpenProgressAlert: false,
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
  },
});

export const { setProgress, setProgressLog, toggleProgressAlert } =
  studentAttendanceSlice.actions;

export const selectProgress = (state: RootState) =>
  state.studentAttendance.progress;
export const selectProgressLog = (state: RootState) =>
  state.studentAttendance.progressLog;
export const selectIsOpenProgressAlert = (state: RootState) =>
  state.studentAttendance.isOpenProgressAlert;

export default studentAttendanceSlice.reducer;
