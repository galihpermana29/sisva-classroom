import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  materials: [],
};

const teachingMaterialsSlice = createSlice({
  name: "teachingMaterials",
  initialState,
  reducers: {
    setMaterials: (state, action) => {
      state.materials = action.payload;
    },
    addMaterial: (state, action) => {
      state.materials.push(action.payload);
    },
    addMultipleMaterial: (state, action) => {
      state.materials = [...state.materials, ...action.payload];
    },
    editMaterial: (state, action) => {
      const { id } = action.payload;
      const index = state.materials.findIndex((m) => m.id === id);
      if (index !== -1) {
        state.materials[index] = action.payload;
      }
    },
    deleteMaterial: (state, action) => {
      state.materials = state.materials.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  setMaterials,
  addMaterial,
  addMultipleMaterial,
  editMaterial,
  deleteMaterial,
} = teachingMaterialsSlice.actions;

export default teachingMaterialsSlice.reducer;
