import React from 'react';
import Square from '../Square/Square';
import styles from './Grid.module.scss';

export interface Props {
  columns: number;
  rows: number;
  gridValues: string[][];
  onSquareClick: (x: number, y: number) => any;
}

export default class Grid extends React.PureComponent<Props> {
  render() {
    const { columns, rows, gridValues, onSquareClick } = this.props;
    const squares = [];

    for (let row = 0; row < rows; row++) {
      const squareRow = [];
      for (let column = 0; column < columns; column++) {
        const squareType = gridValues[row][column];
        squareRow.push(<Square key={`${row}:${column}`} x={row} y={column} squareType={squareType} onClick={onSquareClick} />);
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
