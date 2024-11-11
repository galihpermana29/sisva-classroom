import { configureStore } from "@reduxjs/toolkit";
import staffAttendanceReducer from "./[slug]/dashboard/staff/attendance/utils/staffAttendanceSlice";
import { staffProfileReducer } from "./[slug]/dashboard/staff/profile/utils/staffProfileSlice";
import studentAttendanceReducer from "./[slug]/dashboard/student/attendance/utils/studentAttendanceSlice";

export const store = configureStore({
  reducer: {
    staffAttendance: staffAttendanceReducer,
    studentAttendance: studentAttendanceReducer,
    staffProfile: staffProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
