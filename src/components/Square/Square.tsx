import React from 'react';
import classNames from 'classnames';

import styles from './Square.module.scss';
import { Terrain } from '../../constants/Terrains';

export interface Props {
  x: number;
  y: number;
  squareType?: Terrain;
  overlayType?: Terrain;
  onClick: (x: number, y: number) => any;
  onSquareHoverOn: (x: number, y: number) => any;
}

export default class Square extends React.PureComponent<Props> {
  render() {
    const { x, y, squareType, overlayType, onClick = () => {}, onSquareHoverOn = () => {} } = this.props;
    const squareCssClass = classNames(styles.square, squareType ? styles[squareType] : null);
    const overlayCssClass = classNames(styles.overlay, overlayType ? styles[overlayType] : null);

    return (
      <div 
        className={squareCssClass}
        onClick={() => onClick(x, y)}
        onMouseEnter={() => onSquareHoverOn(x,y)}>
          <div className={overlayCssClass}></div>
      </div>
    )
  }
}

