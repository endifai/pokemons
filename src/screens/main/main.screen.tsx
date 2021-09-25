import './main.scss'

import { ReactElement, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store'
import { fetchPokemons } from '../../store/pokemons'
import { PokemonItem } from '../../types'
import { Loader } from '../../ui/loader/loader'
import { Pokemon } from '../../ui/pokemon/pokemon'

export const MainScreen = (): ReactElement => {
  const dispatch = useDispatch()
  const loading = useSelector<RootState, boolean>(
    (state) => state.pokemons.loading,
  )
  const pokemons = useSelector<RootState, PokemonItem[]>(
    (state) => state.pokemons.items,
  )
  const endReached = useSelector<RootState, boolean>(
    (state) => state.pokemons.endReached,
  )

  const { ref, inView } = useInView({ threshold: 1 })

  useEffect(() => {
    if (inView) {
      dispatch(fetchPokemons())
    }
  }, [inView])

  useEffect(() => {
    dispatch(fetchPokemons())
  }, [])

  if (loading && pokemons.length === 0) {
    return <Loader />
  }

  return (
    <>
      <div className="main">
        {pokemons.map((pokemon) => (
          <Pokemon key={pokemon.id} {...pokemon} />
        ))}
      </div>

      {!endReached && (
        <div ref={ref}>
          <Loader scale={0.5} />
        </div>
      )}
    </>
  )
}
