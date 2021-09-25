import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Api } from '../api'
import { PokemonItem } from '../types'
import { RootState } from '.'

interface FavoritesState {
  ids: string[]
  items: PokemonItem[]
  loading: boolean
  error: null | string
}

const initialState: FavoritesState = {
  ids: [],
  items: [],
  loading: false,
  error: null,
}

export const fetchFavoritesPokemons = createAsyncThunk<
  PokemonItem[],
  void,
  { state: RootState }
>('favorites/fetchFavoritePokemons', async (_, { getState }) => {
  const ids = getState().favorites.ids

  const results = await Promise.allSettled(ids.map(Api.fetchPokemonById))

  return results
    .filter((result) => 'value' in result)
    .map((item) => (item as PromiseFulfilledResult<PokemonItem>).value)
})

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.ids = [...state.ids, action.payload]
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((id) => id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavoritesPokemons.pending, (state) => {
      state.error = null
      state.loading = true
    })

    builder.addCase(fetchFavoritesPokemons.rejected, (state) => {
      state.error = 'some error'
      state.loading = false
    })

    builder.addCase(
      fetchFavoritesPokemons.fulfilled,
      (state, action: PayloadAction<PokemonItem[]>) => {
        state.loading = false
        state.items = action.payload
      },
    )
  },
})

export const favoritesReducer = favoritesSlice.reducer
export const { addFavorite, removeFavorite } = favoritesSlice.actions
