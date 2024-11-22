import { RootState } from "@/app/administration/store";
import type { SortDirection } from "@/types/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type StudyProgramSortField = "name" | "code" | "";
export type GradeSortField = "name" | "code" | "grade" | "";
export type StudentSortField = "name" | "code" | "";

type StudyProgramState = {
  studyProgramSearchText: string;
  gradeSearchText: string;
  studentSearchText: string;
  studyProgramSortField: StudyProgramSortField;
  gradeSortField: GradeSortField;
  studentSortField: StudentSortField;
  sortDirection: SortDirection;
  studyProgramFilter: string;
};

const initialState: StudyProgramState = {
  studyProgramSearchText: "",
  gradeSearchText: "",
  studentSearchText: "",
  studyProgramSortField: "",
  gradeSortField: "",
  studentSortField: "",
  sortDirection: "",
  studyProgramFilter: "",
};

const studyProgramSlice = createSlice({
  name: "academic/study-program",
  initialState,
  reducers: {
    setStudyProgramSearchText: (state, action: PayloadAction<string>) => {
      state.studyProgramSearchText = action.payload;
    },
    setGradeSearchText: (state, action: PayloadAction<string>) => {
      state.gradeSearchText = action.payload;
    },
    setStudentSearchText: (state, action: PayloadAction<string>) => {
      state.studentSearchText = action.payload;
    },
    setStudyProgramSortField: (
      state,
      action: PayloadAction<StudyProgramSortField>
    ) => {
      state.studyProgramSortField = action.payload;
    },
    setGradeSortField: (state, action: PayloadAction<GradeSortField>) => {
      state.gradeSortField = action.payload;
    },
    setStudentSortField: (state, action: PayloadAction<StudentSortField>) => {
      state.studentSortField = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
    setStudyProgramFilter: (state, action: PayloadAction<string>) => {
      state.studyProgramFilter = action.payload;
    },
  },
});

export const {
  setStudyProgramSearchText,
  setGradeSearchText,
  setStudentSearchText,
  setStudyProgramSortField,
  setGradeSortField,
  setStudentSortField,
  setSortDirection,
  setStudyProgramFilter,
} = studyProgramSlice.actions;

export const selectStudyProgramSearchText = (state: RootState) =>
  state.studyProgram.studyProgramSearchText;
export const selectGradeSearchText = (state: RootState) =>
  state.studyProgram.gradeSearchText;
export const selectStudentSearchText = (state: RootState) =>
  state.studyProgram.studentSearchText;
export const selectStudyProgramSortField = (state: RootState) =>
  state.studyProgram.studyProgramSortField;
export const selectGradeSortField = (state: RootState) =>
  state.studyProgram.gradeSortField;
export const selectStudentSortField = (state: RootState) =>
  state.studyProgram.studentSortField;
export const selectSortDirection = (state: RootState) =>
  state.studyProgram.sortDirection;
export const selectStudyProgramFilter = (state: RootState) =>
  state.studyProgram.studyProgramFilter;

const studyProgramReducer = studyProgramSlice.reducer;
export default studyProgramReducer;
