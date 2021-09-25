import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import { favoritesReducer } from './favorites'
import { pokemonsReducer } from './pokemons'

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
  favorites: favoritesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    process.env.NODE_ENV !== 'production'
      ? getDefaultMiddleWare().concat(logger)
      : getDefaultMiddleWare(),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
