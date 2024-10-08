import { configureStore } from "@reduxjs/toolkit";
import teachingMaterialsReducer from "../redux/teachingMaterialSlice";
import tasksReducer from "../redux/taskSlice";
import classReducer from "../redux/classSlice";

export const store = configureStore({
  reducer: {
    teachingMaterials: teachingMaterialsReducer,
    tasks: tasksReducer,
    classData: classReducer,
  },
});
