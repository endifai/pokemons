import './header.scss'

import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

import { RoutesEnum } from '../../enums/routes.enum'

export const Header = (): ReactElement => (
  <header>
    <img src="./images/logo.png" className="logo" draggable={false} />

    <div>
      <Link to={RoutesEnum.MAIN} className="nav-link">
        Главная
      </Link>
      <Link to={RoutesEnum.FAVORITES} className="nav-link">
        Избранное
      </Link>
    </div>
  </header>
)
