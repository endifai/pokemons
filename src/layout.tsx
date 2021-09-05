import './layout.scss'

import { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'

import { RoutesEnum } from './enums/routes.enum'
import { FavoritesScreen } from './screens/favorites/favorites.screen'
import { MainScreen } from './screens/main/main.screen'
import { Header } from './ui/header/header'

export const Layout = (): ReactElement => {
  return (
    <div className="container">
      <Header />

      <Switch>
        <Route path={RoutesEnum.MAIN} component={MainScreen} exact />
        <Route path={RoutesEnum.FAVORITES} component={FavoritesScreen} exact />
      </Switch>
    </div>
  )
}
