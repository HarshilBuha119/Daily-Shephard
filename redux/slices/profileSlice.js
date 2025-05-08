import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  image: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const { name, email, image } = action.payload;
      state.name = name;
      state.email = email;
      state.image = image;
    },
  },
});

export const { updateProfile } = profileSlice.actions;
export default profileSlice.reducer;