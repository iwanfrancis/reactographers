import React from 'react';
import Square from '../Square/Square';
import styles from './Grid.module.scss';
import MapData from '../../classes/MapData';

export interface Props {
  mapData: MapData;
  overlay: MapData;
  onSquareClick: (x: number, y: number) => any;
  onSquareHoverOn: (x: number, y: number) => any;
  onRotateShape: (x: number, y: number) => any;
}

export default class Grid extends React.PureComponent<Props> {
  render() {
    const { mapData, overlay, onSquareClick, onSquareHoverOn, onRotateShape } = this.props;
    const squares = [];

    for (let row = 0; row < mapData.rows; row++) {
      const squareRow = [];
      for (let column = 0; column < mapData.cols; column++) {
        let squareType = mapData.get(row, column);
        let overlayType = overlay.get(row, column)
        squareRow.push(
          <Square 
            key={`${row}:${column}`} 
            x={row} 
            y={column} 
            squareType={squareType}
            overlayType={overlayType}
            onClick={onSquareClick}
            onSquareHoverOn={onSquareHoverOn}
            onRotateShape={onRotateShape}/>
        );
      }
      squares.push(
        <div key={row} className={styles.row}>
          {squareRow}
        </div>
      );
    }

    return <div>{squares}</div>;
  }
}
