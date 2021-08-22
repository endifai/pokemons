import './main.scss'

import { ReactElement } from 'react'

import { Pokemon } from '../../ui/pokemon/pokemon'

export const MainScreen = (): ReactElement => (
  <div className="main">
    <Pokemon />
    <Pokemon />
    <Pokemon />
    <Pokemon />
    <Pokemon />
    <Pokemon />
    <Pokemon />
  </div>
)
