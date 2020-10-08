import React from 'react';
import Square from '../Square/Square';
import styles from './Grid.module.scss';

export interface Props {
  columns: number;
  rows: number;
  gridValues: string[][];
}

export default class Grid extends React.PureComponent<Props> {
  render() {
    const { columns, rows, gridValues } = this.props;
    const squares = [];

    for (let row = 0; row < rows; row++) {
      const squareRow = [];
      for (let column = 0; column < columns; column++) {
        const squareId = `${row}:${column}`;
        const squareType = gridValues[row][column];
        squareRow.push(<Square key={squareId} id={squareId} squareType={squareType} />);
      }
      squares.push(<div className={styles.row}>{squareRow}</div>);
    }

    return <div>{squares}</div>;
  }
}
