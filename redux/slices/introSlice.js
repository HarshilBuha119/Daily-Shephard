
import { createSlice } from '@reduxjs/toolkit';

const introSlice = createSlice({
  name: 'intro',
  initialState: {
    hasSeenIntro: false,
  },
  reducers: {
    completeIntro: (state) => {
      state.hasSeenIntro = true;
    },
  },
});

export const { completeIntro } = introSlice.actions;
export default introSlice.reducer;
export const hasSeenIntro = (state) => state.intro.hasSeenIntro;
