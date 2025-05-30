import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignedIn: false,
  },
  reducers: {
    login: (state) => {
      state.isSignedIn = true;
    },
    logout: (state) => {
        state.isSignedIn = false;
      },
  },
});

export const { login,logout } = authSlice.actions;
export default authSlice.reducer;
export const selectIsSignedIn = (state) => state.auth.isSignedIn;
