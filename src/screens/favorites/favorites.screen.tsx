import './favorites.scss'

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
      {favorites.length ? (
        favorites.map((pokemon) => <Pokemon key={pokemon.id} {...pokemon} />)
      ) : (
        <p className="empty-list__text">
          {"You don't have any pokemons in your favorites list."}
          <br />
          {"Add pokemon to favorites on pokemon's details page."}
        </p>
      )}
    </div>
  )
}
