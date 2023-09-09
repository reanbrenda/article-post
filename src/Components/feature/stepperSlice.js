import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    title: '',
    description: '',
    image: null,
    steps: [{ title: '', description: '', code: '', image: null }],
  },
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    addStep: (state) => {
      state.userData.steps.push({ title: '', description: '', code: '', image: null });
    },
  },
});

export const { updateUserData, addStep } = stepperSlice.actions;

export default stepperSlice.reducer;
