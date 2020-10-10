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

  handleClick(self: any, e: MouseEvent, x: number, y: number) {
    if (e.buttons === 1) {
      self.props.onClick(x, y);
    }
    if (e.buttons === 2) {
      self.props.onRotateShape(x, y);
    }
  }

  render() {
    const { 
      x, y, squareType, overlayType,
      onSquareHoverOn = () => {},
    } = this.props;
    const squareCssClass = classNames(styles.square, squareType ? terrainStyles[squareType] : null);
    const overlayCssClass = classNames(styles.overlay, overlayType ? terrainStyles[overlayType] : null);

    return (
      <div 
        className={squareCssClass}
        onMouseEnter={() => onSquareHoverOn(x,y)}
        onContextMenu={(e: any) => e.preventDefault() }
        onMouseDown={(e: any) => this.handleClick(this, e, x, y)}>
          <div className={overlayCssClass}></div>
      </div>
    )
  }
}

