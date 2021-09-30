import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { favoritesReducer } from './favorites'
import { pokemonsReducer } from './pokemons'

const persistConfig = {
  key: 'FAVORITES_POKEMONS',
  storage,
  whitelist: ['ids'],
}

const persistedFavoritesReducer = persistReducer(
  persistConfig,
  favoritesReducer,
)

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  favorites: persistedFavoritesReducer,
})

const serializableCheck = {
  ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    process.env.NODE_ENV !== 'production'
      ? getDefaultMiddleWare({
          serializableCheck,
        }).concat(logger)
      : getDefaultMiddleWare({
          serializableCheck,
        }),
  devTools: process.env.NODE_ENV !== 'production',
})
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
