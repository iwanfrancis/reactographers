import React from 'react';
import classNames from 'classnames';

import styles from './Square.module.scss';
import terrainStyles from '../../constants/Terrains.module.scss'
import { Terrain } from '../../constants/Terrains';

export interface Props {
  x: number;
  y: number;
  squareType?: Terrain;
  overlayType?: Terrain;
  onClick: (x: number, y: number) => any;
  onSquareHoverOn: (x: number, y: number) => any;
  onRotateShape: (x: number, y: number) => any;
}

export default class Square extends React.PureComponent<Props> {

  onRightClick(self: any, e: any, x: number, y: number) {
    e.preventDefault();
    self.props.onRotateShape(x, y)
  }

  render() {
    const { 
      x, y, squareType, overlayType,
      onClick = () => {},
      onSquareHoverOn = () => {},
      onRotateShape = () => {} 
    } = this.props;
    const squareCssClass = classNames(styles.square, squareType ? terrainStyles[squareType] : null);
    const overlayCssClass = classNames(styles.overlay, overlayType ? terrainStyles[overlayType] : null);

    return (
      <div 
        className={squareCssClass}
        onClick={() => onClick(x, y)}
        onMouseEnter={() => onSquareHoverOn(x,y)}
        onContextMenu={(e: any) => this.onRightClick(this, e, x, y) }>
          <div className={overlayCssClass}></div>
      </div>
    )
  }
}

