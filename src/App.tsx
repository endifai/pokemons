import './App.scss'

import { ReactElement } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { RoutesEnum } from './enums/routes.enum'
import { FavoritesScreen } from './screens/favorites/favorites.screen'
import { MainScreen } from './screens/main/main.screen'
import { Header } from './ui/header/header'

export const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />

        <Switch>
          <Route path={RoutesEnum.MAIN} component={MainScreen} exact />
          <Route
            path={RoutesEnum.FAVORITES}
            component={FavoritesScreen}
            exact
          />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
