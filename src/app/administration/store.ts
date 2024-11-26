import { configureStore } from "@reduxjs/toolkit";

import curriculumReducer from "./[slug]/dashboard/academic/curriculum/utils/curriculumSlice";
import studyProgramReducer from "./[slug]/dashboard/academic/study-program/utils/studyProgramSlice";
import invoiceReducer from "./[slug]/dashboard/finance/invoice/utils/invoiceSlice";
import staffAttendanceReducer from "./[slug]/dashboard/staff/attendance/utils/staffAttendanceSlice";
import staffProfileReducer from "./[slug]/dashboard/staff/profile/utils/staffProfileSlice";
import studentAttendanceReducer from "./[slug]/dashboard/student/attendance/utils/studentAttendanceSlice";
import studentProfileReducer from "./[slug]/dashboard/student/profile/utils/studentProfileSlice";

export const store = configureStore({
  reducer: {
    staffAttendance: staffAttendanceReducer,
    studentAttendance: studentAttendanceReducer,
    staffProfile: staffProfileReducer,
    studentProfile: studentProfileReducer,
    studyProgram: studyProgramReducer,
    curriculum: curriculumReducer,
    //
    invoice: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
