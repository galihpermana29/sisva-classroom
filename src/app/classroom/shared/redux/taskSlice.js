import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const { id } = action.payload;
      const index = state.tasks.findIndex((m) => m.id === id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, editTask, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
