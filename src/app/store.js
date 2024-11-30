import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // LocalStorage izmantošana
import { combineReducers } from 'redux'; // Importējam combineReducers
import loginReducer from '../features/auth/loginSlice'; // Pareizs login reducētājs
import mainPageReducer from '../features/mainPage/mainPageSlice';
import profileReducer from '../features/profile/profileSlice';


// Redux Persist konfigurācija
const persistConfig = {
  key: 'root',  // Atslēga glabāšanai
  storage,      // Glabāšanas mehānisms (localStorage)
  whitelist: ['login', 'mainPage'],  // Pievienojam arī 'mainPage', lai tas tiktu persistēts
};


// Apvienojam reducētājus, ja nepieciešams
const rootReducer = combineReducers({
  login: loginReducer,
  mainPage: mainPageReducer,
  profile: profileReducer,

});

// Persistējam reducētāju
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Izveidojam Redux store
const store = configureStore({
  reducer: persistedReducer,  // Lietojam persistēto reducētāju
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Ignorējam persist darbības
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',  // Ieslēdzam devTools tikai izstrādē
});

// Izveidojam Persistor
const persistor = persistStore(store);

// Eksportējam store un persistor
export { store, persistor };
