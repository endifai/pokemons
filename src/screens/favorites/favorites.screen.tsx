import { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store'
import { fetchFavoritesPokemons } from '../../store/favorites'
import { PokemonItem } from '../../types'
import { Loader } from '../../ui/loader/loader'
import { Pokemon } from '../../ui/pokemon/pokemon'

export const FavoritesScreen = (): ReactElement => {
  const favorites = useSelector<RootState, PokemonItem[]>(
    (state) => state.favorites.items,
  )
  const loading = useSelector<RootState, boolean>(
    (state) => state.favorites.loading,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFavoritesPokemons())
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <div className="main">
      {favorites.map((pokemon) => (
        <Pokemon key={pokemon.id} {...pokemon} />
      ))}
    </div>
  )
}
