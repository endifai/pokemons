import './pokemon-info.scss'

import { ReactElement } from 'react'

import { PokemonItem } from '../../types'
import { PokemonTypes } from '../pokemon-types/pokemon-types'

type IPokemonInfo = Pick<
  PokemonItem,
  'name' | 'height' | 'weight' | 'abilities' | 'types'
>

export const PokemonInfo = ({
  name,
  height,
  weight,
  abilities,
  types,
}: IPokemonInfo): ReactElement => {
  const formattedAbilities = abilities
    .map(({ ability }) => ability.name)
    .join(', ')

  return (
    <div className="pokemon-info__container">
      <h2 className="pokemon-info__name">{name}</h2>

      <div className="specifications">
        <div className="specifications-group">
          <p className="specifications-item">
            <span className="specifications-item__title">Height: </span>
            {height}cm
          </p>

          <p className="specifications-item">
            <span className="specifications-item__title">Weight: </span>
            {weight}kg
          </p>
        </div>

        <div className="specifications-group">
          <p className="specifications-item">
            <span className="specifications-item__title">Abilities: </span>
            {formattedAbilities}
          </p>
        </div>
      </div>

      <PokemonTypes types={types} />
    </div>
  )
}
