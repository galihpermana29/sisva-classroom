import { RootState } from '@/app/administration/store';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
interface StaffAttendance {
  progress: string;
}

const initialState: StaffAttendance = {
  progress: '0%',
};

export const staffAttendanceSlice = createSlice({
  name: 'staff/attendance',
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<string>) => {
      state.progress = action.payload;
    },
  },
});

export const { setProgress } = staffAttendanceSlice.actions;

export const selectProgress = (state: RootState) =>
  state.staffAttendance.progress;

export default staffAttendanceSlice.reducer;
