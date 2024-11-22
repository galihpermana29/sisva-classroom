import { RootState } from "@/app/administration/store";
import type { SortDirection } from "@/types/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type CurriculumState = {
  curriculumSearchText: string;
  subjectSearchText: string;
  gradeSearchText: string;
};

const initialState: CurriculumState = {
  curriculumSearchText: "",
  subjectSearchText: "",
  gradeSearchText: "",
};

const curriculumSlice = createSlice({
  name: "academic/curriculum",
  initialState,
  reducers: {
    setCurriculumSearchText: (state, action: PayloadAction<string>) => {
      state.curriculumSearchText = action.payload;
    },
    setSubjectSearchText: (state, action: PayloadAction<string>) => {
      state.subjectSearchText = action.payload;
    },
    setGradeSearchText: (state, action: PayloadAction<string>) => {
      state.gradeSearchText = action.payload;
    },
  },
});

export const {
  setCurriculumSearchText,
  setSubjectSearchText,
  setGradeSearchText,
} = curriculumSlice.actions;

export const selectCurriculumSearchText = (state: RootState) =>
  state.curriculum.curriculumSearchText;
export const selectSubjectSearchText = (state: RootState) =>
  state.curriculum.subjectSearchText;
export const selectGradeSearchText = (state: RootState) =>
  state.curriculum.gradeSearchText;

const curriculumReducer = curriculumSlice.reducer;
export default curriculumReducer;
