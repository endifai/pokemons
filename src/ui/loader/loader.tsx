import './loader.scss'

import { ReactElement } from 'react'

interface Props {
  scale?: number
}

export const Loader = ({ scale = 1 }: Props): ReactElement => (
  <div className="center" style={{ transform: `scale(${scale})` }}>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
    <div className="wave"></div>
  </div>
)
