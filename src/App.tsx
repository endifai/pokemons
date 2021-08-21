import './App.scss'

import { ReactElement } from 'react'

import { Header } from './ui/Header/Header'

export const App = (): ReactElement => {
  return (
    <div className="container">
      <Header />
    </div>
  )
}

export default App
