import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileSlice from './slices/profileSlice';
import introSlice from './slices/introSlice';
import authSlice from './slices/authSlice';
import favSlice from './slices/favSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['intro', 'auth', 'profile', 'fav'],
};
  
const rootReducer = combineReducers({
  profile: profileSlice,
  intro: introSlice,
  auth: authSlice,
  fav: favSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
