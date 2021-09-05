export interface Pokemon {
  abilities: {
    ability: {
      name: string
      url: string
    }
    slot: number
  }[]
  base_experience: number
  forms: {
    name: string
    url: string
  }[]
  game_indices: {
    game_index: number
    version: {
      name: string
      url: string
    }
  }[]
  height: number
  held_items: unknown[]
  id: number
  is_default: boolean
  location_area_encounters: string
  name: string
  order: number
  past_types: unknown[]
  species: {
    name: string
    url: string
  }
  sprites: {
    other: {
      dream_world: {
        front_default: string
        front_female: null
      }
      'official-artwork': {
        front_default: string
      }
    }
  }
  weight: number
  types: {
    slot: string
    type: {
      name: string
      url: string
    }
  }
}
