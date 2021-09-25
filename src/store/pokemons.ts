import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Api } from '../api'
import { PAGINATION_LIMIT } from '../constants'
import { PokemonItem } from '../types'
import { RootState } from './index'

interface PokemonsState {
  items: PokemonItem[]
  loading: boolean
  error: string | null
  selectedPokemon: PokemonItem | null
  endReached: boolean
}

const initialState: PokemonsState = {
  items: [],
  loading: false,
  error: null,
  selectedPokemon: null,
  endReached: false,
}

const fetchPokemonByUri = async (uri: string) => {
  const response = await fetch(uri)
  const data = await response.json()

  return data
}

export const fetchPokemonById = createAsyncThunk<PokemonItem, string>(
  'pokemons/fetchPokemonById',
  Api.fetchPokemonById,
)

export const fetchPokemons = createAsyncThunk<
  PokemonItem[],
  void,
  { state: RootState }
>('pokemons/fetchPokemons', async (_, { getState, dispatch }) => {
  const offset = getState().pokemons.items.length
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${PAGINATION_LIMIT}&offset=${offset}`,
  )
  const data = await response.json()
  const pokemons = data.results as { name: string; url: string }[]
  const next = data.next as string | null

  const results = await Promise.allSettled(
    pokemons.map(({ url }) => fetchPokemonByUri(url)),
  )

  if (!next) {
    dispatch(setEndReached())
  }

  return results
    .map((result) => ('value' in result ? result.value : undefined))
    .filter((pokemon) => !!pokemon)
})

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    resetSelectedPokemon: (state) => {
      state.selectedPokemon = null
    },
    setEndReached: (state) => {
      state.endReached = true
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state) => {
      state.error = null
      state.loading = true
    })

    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.items = [...state.items, ...action.payload]
      state.loading = false
    })

    builder.addCase(fetchPokemons.rejected, (state) => {
      state.loading = false
      state.error = 'some error'
    })

    builder.addCase(fetchPokemonById.pending, (state) => {
      state.loading = true
    })

    builder.addCase(fetchPokemonById.fulfilled, (state, action) => {
      state.selectedPokemon = action.payload
      state.loading = false
    })

    builder.addCase(fetchPokemonById.rejected, (state) => {
      state.loading = false
      state.error = 'some error'
    })
  },
})

export const { resetSelectedPokemon, setEndReached } = pokemonsSlice.actions
export const pokemonsReducer = pokemonsSlice.reducer
