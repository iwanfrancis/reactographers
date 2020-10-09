import React from 'react';
import Square from '../Square/Square';
import styles from './Grid.module.scss';
import GridData from '../../modules/GridData';

export interface Props {
  columns: number;
  rows: number;
  gridData: GridData;
  overlay: GridData;
  onSquareClick: (x: number, y: number) => any;
  onSquareHoverOn: (x: number, y: number) => any;
}

export default class Grid extends React.PureComponent<Props> {
  render() {
    const { columns, rows, gridData, overlay, onSquareClick, onSquareHoverOn } = this.props;
    const squares = [];

    for (let row = 0; row < rows; row++) {
      const squareRow = [];
      for (let column = 0; column < columns; column++) {
        let squareType = gridData.get(row, column);
        let overlayType = overlay.get(row, column)
        squareRow.push(
          <Square 
            key={`${row}:${column}`} 
            x={row} 
            y={column} 
            squareType={squareType}
            overlayType={overlayType}
            onClick={onSquareClick}
            onSquareHoverOn={onSquareHoverOn}/>
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
