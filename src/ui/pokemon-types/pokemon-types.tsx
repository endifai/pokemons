import './pokemon-types.scss'

import { ReactElement } from 'react'

import { PokemonItem } from '../../types'

type Props = Pick<PokemonItem, 'types'>

export const PokemonTypes = ({ types }: Props): ReactElement => (
  <div className="pokemon__types">
    {types.map(({ type: { name } }) => (
      <span key={name} className="pokemon__types__type">
        {name}
      </span>
    ))}
  </div>
)
