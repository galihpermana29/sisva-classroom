import { configureStore } from "@reduxjs/toolkit";

import classReducer from "../redux/classSlice";
import tasksReducer from "../redux/taskSlice";
import teachingMaterialsReducer from "../redux/teachingMaterialSlice";

export const store = configureStore({
  reducer: {
    teachingMaterials: teachingMaterialsReducer,
    tasks: tasksReducer,
    classData: classReducer,
  },
});
