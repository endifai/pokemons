import './main.scss'

import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store'
import { fetchPokemons } from '../../store/pokemons'
import { Pokemon as IPokemon } from '../../types'
import { Loader } from '../../ui/loader/loader'
import { Pokemon } from '../../ui/pokemon/pokemon'

export const MainScreen = (): ReactElement => {
  const dispatch = useDispatch()
  const loading = useSelector<RootState, boolean>(
    (state) => state.pokemons.loading,
  )
  const pokemons = useSelector<RootState, Record<number, IPokemon>>(
    (state) => state.pokemons.items,
  )

  useEffect(() => {
    dispatch(fetchPokemons())
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="main">
      {Object.values(pokemons).map((pokemon) => (
        <Pokemon key={pokemon.id} {...pokemon} />
      ))}
    </div>
  )
}
