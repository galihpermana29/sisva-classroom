import { configureStore } from '@reduxjs/toolkit';
import staffAttendanceReducer from './[slug]/dashboard/staff/attendance/utils/staffAttendanceSlice';

export const store = configureStore({
  reducer: {
    staffAttendance: staffAttendanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
