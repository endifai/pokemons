import './header.scss'

import classNames from 'classnames'
import { ReactElement } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { RoutesEnum } from '../../enums/routes.enum'

const links = [
  {
    path: RoutesEnum.MAIN,
    label: 'Главная',
  },
  {
    path: RoutesEnum.FAVORITES,
    label: 'Избранное',
  },
]

export const Header = (): ReactElement => {
  const history = useHistory()
  const { pathname } = useLocation()

  const handleLogoClick = () => history.push(RoutesEnum.MAIN)

  return (
    <header>
      <img
        src="./images/logo.png"
        className="logo"
        draggable={false}
        onClick={handleLogoClick}
      />

      <div>
        {links.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={classNames(
              'nav-link',
              pathname === path && 'active-link',
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
