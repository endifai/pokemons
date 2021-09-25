import './pokemon.scss'

import { ReactElement, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { RoutesEnum } from '../../enums/routes.enum'
import { useQueryParam } from '../../hooks/use-query-param'
import { SvgFavorite } from '../../icons/favorite'
import { SvgNotFavorite } from '../../icons/not-favorite'
import { AppDispatch, RootState } from '../../store'
import { addFavorite, removeFavorite } from '../../store/favorites'
import { fetchPokemonById, resetSelectedPokemon } from '../../store/pokemons'
import { PokemonItem } from '../../types'
import { Loader } from '../../ui/loader/loader'
import { PokemonInfo } from '../../ui/pokemon-info/pokemon-info'

export const PokemonScreen = (): ReactElement => {
  const history = useHistory()
  const dispatch = useDispatch<AppDispatch>()

  const loading = useSelector<RootState, boolean>(
    (state) => state.pokemons.loading,
  )
  const pokemon = useSelector<RootState, PokemonItem | null>(
    (state) => state.pokemons.selectedPokemon,
  )
  const favorites = useSelector<RootState, string[]>(
    (state) => state.favorites.ids,
  )

  const id = useQueryParam('id')

  useEffect(() => {
    if (!id) {
      return history.push(RoutesEnum.MAIN)
    }

    dispatch(fetchPokemonById(id))
  }, [id])

  useEffect(() => {
    return () => {
      dispatch(resetSelectedPokemon())
    }
  }, [])

  const isFavorite = id && favorites.includes(id)

  const handleClick = useCallback(() => {
    if (!id) {
      return
    }

    isFavorite ? dispatch(removeFavorite(id)) : dispatch(addFavorite(id))
  }, [isFavorite, id])

  if (loading || !pokemon) {
    return <Loader />
  }

  const { sprites, name, abilities, height, weight, types } = pokemon

  return (
    <div className="pokemon__container">
      <div>
        <img
          className="pokemon__image"
          src={sprites.other.dream_world.front_default}
          draggable={false}
        />

        <button className="favorite-button" onClick={handleClick}>
          {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          {isFavorite ? <SvgNotFavorite /> : <SvgFavorite />}
        </button>
      </div>

      <PokemonInfo
        types={types}
        name={name}
        abilities={abilities}
        height={height}
        weight={weight}
      />
    </div>
  )
}
