import './Header.scss'

import { ReactElement } from 'react'

export const Header = (): ReactElement => (
  <header>
    <img src="./images/logo.png" className="logo" draggable={false} />

    <div>
      <a href="/" className="nav-link">
        Главная
      </a>
      <a href="/favorites" className="nav-link">
        Избранное
      </a>
    </div>
  </header>
)
