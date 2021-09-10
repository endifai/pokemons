import './pokemon.scss'

import { ReactElement } from 'react'
import { useHistory } from 'react-router-dom'

import { RoutesEnum } from '../../enums/routes.enum'
import { PokemonItem } from '../../types'
import { PokemonTypes } from '../pokemon-types/pokemon-types'

export const Pokemon = (data: PokemonItem): ReactElement => {
  const {
    id,
    name,
    sprites: {
      other: {
        dream_world: { front_default },
      },
    },
    types,
  } = data

  const history = useHistory()

  const handleClick = () => history.push(`${RoutesEnum.POKEMON}?id=${id}`)

  return (
    <div className="pokemon" onClick={handleClick}>
      <img src={front_default} className="pokemon__image" />

      <p className="pokemon__name">{name}</p>

      <PokemonTypes types={types} />
    </div>
  )
}
