import './pokemon.scss'

import { ReactElement } from 'react'

import { PokemonItem } from '../../types'

export const Pokemon = (data: PokemonItem): ReactElement => {
  const {
    name,
    sprites: {
      other: {
        dream_world: { front_default },
      },
    },
  } = data

  return (
    <div className="pokemon">
      <img src={front_default} className="pokemon__image" />

      <p className="pokemon__name">{name}</p>

      <div className="pokemon__types">
        <span className="pokemon__types__type">electric</span>
      </div>
    </div>
  )
}
