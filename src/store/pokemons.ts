import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PokemonItem } from '../types'

interface PokemonsState {
  items: Record<number, PokemonItem>
  loading: boolean
  error: string | null
  selectedPokemon: PokemonItem | null
}

const initialState: PokemonsState = {
  items: {},
  loading: false,
  error: null,
  selectedPokemon: null,
}

const fetchPokemonByUri = async (uri: string) => {
  const response = await fetch(uri)
  const data = await response.json()

  return data
}

export const fetchPokemonById = createAsyncThunk<PokemonItem, string>(
  'pokemons/fetchPokemonById',
  async (id) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()

    return data
  },
)

export const fetchPokemons = createAsyncThunk<PokemonItem[]>(
  'pokemons/fetchPokemons',
  async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    const data = await response.json()
    const pokemons = data.results as { name: string; url: string }[]

    const results = await Promise.allSettled(
      pokemons.map(({ url }) => fetchPokemonByUri(url)),
    )
    return results.map((result) =>
      'value' in result ? result.value : undefined,
    )
  },
)

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setPokemons: (
      state,
      action: PayloadAction<Record<number, PokemonItem>>,
    ) => {
      state.items = action.payload
    },
    resetSelectedPokemon: (state) => {
      state.selectedPokemon = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state) => {
      state.error = null
      state.loading = true
      state.items = {}
    })

    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.items = action.payload.reduce<Record<number, PokemonItem>>(
        (acc, item) => {
          if (item) {
            acc[item.id] = item
          }

          return acc
        },
        {},
      )
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

export const { setPokemons, resetSelectedPokemon } = pokemonsSlice.actions
export const pokemonsReducer = pokemonsSlice.reducer
