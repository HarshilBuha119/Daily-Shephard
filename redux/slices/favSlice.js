import { createSlice } from '@reduxjs/toolkit';

const favSlice = createSlice({
  name: 'fav',
  initialState: {
    favourites: [],
  },
  reducers: {
    addFavourite: (state, action) => {
      const verse = action.payload;
      const exists = state.favourites.find(item => item.id === verse.id);
      if (!exists) {
        state.favourites.push(verse);
      }
    },
    removeFavourite: (state, action) => {
      const verseId = action.payload;
      state.favourites = state.favourites.filter(item => item.id !== verseId);
    },
    cleanFavourite: (state) => {
      state.favourites = []
    },
    
  },
});

export const { addFavourite, removeFavourite ,cleanFavourite} = favSlice.actions;
export default favSlice.reducer;
export const selectFavourites = (state) => state.fav.favourites;
