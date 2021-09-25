import { PokemonItem } from '../types'

export class Api {
  static fetchPokemonById = async (id: string): Promise<PokemonItem> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()

    return data
  }
}
