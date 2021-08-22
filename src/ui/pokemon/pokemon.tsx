import './pokemon.scss'

import { ReactElement } from 'react'

export const Pokemon = (): ReactElement => (
  <div className="pokemon">
    <img
      src="https://images.unsplash.com/photo-1609372332255-611485350f25?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
      className="pokemon__image"
    />

    <p className="pokemon__name">Pikachu</p>

    <div className="pokemon__types">
      <span className="pokemon__types__type">electric</span>
    </div>
  </div>
)
