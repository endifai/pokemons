import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import { pokemonsReducer } from './pokemons'

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
