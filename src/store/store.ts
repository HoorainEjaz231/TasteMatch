import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tasteProfileReducer from './tasteProfileSlice';

const safeStorage = {
  setItem: async (key: string, value: string) => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.warn('AsyncStorage setItem failed. Did you restart Expo Go?', e);
      return Promise.resolve();
    }
  },
  getItem: async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.warn('AsyncStorage getItem failed. Did you restart Expo Go?', e);
      return Promise.resolve(null);
    }
  },
  removeItem: async (key: string) => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      console.warn('AsyncStorage removeItem failed. Did you restart Expo Go?', e);
      return Promise.resolve();
    }
  },
};

const persistConfig = {
  key: 'root',
  storage: safeStorage,
  whitelist: ['tasteProfile'],
};

const rootReducer = combineReducers({
  tasteProfile: tasteProfileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
