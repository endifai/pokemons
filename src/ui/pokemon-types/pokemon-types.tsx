import './pokemon-types.scss'

import { ReactElement } from 'react'

import { PokemonItem } from '../../types'
import { getColorByBgColor, typeColors } from './type-colors'

type Props = Pick<PokemonItem, 'types'>

export const PokemonTypes = ({ types }: Props): ReactElement => (
  <div className="pokemon__types">
    {types.map(({ type: { name } }) => {
      const backgroundColor = typeColors[name as keyof typeof typeColors]
      const color = getColorByBgColor(backgroundColor)

      return (
        <span
          key={name}
          className="pokemon__types__type"
          style={{ backgroundColor, color }}
        >
          {name}
        </span>
      )
    })}
  </div>
)
