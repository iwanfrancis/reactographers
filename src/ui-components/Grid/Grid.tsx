import React from 'react';
import Square from '../Square/Square';
import styles from './Grid.module.scss';
import MapData from '../../classes/MapData';
import GridPosition from '../../models/GridPosition';

export interface Props {
  mapData: MapData;
  overlay: MapData;
  onSquareClick: (gridPos: GridPosition) => any;
  onSquareHoverOn: (gridPos: GridPosition) => any;
  onRotateShape: (gridPos: GridPosition) => any;
}

export default class Grid extends React.PureComponent<Props> {
  render() {
    const { mapData, overlay, onSquareClick, onSquareHoverOn, onRotateShape } = this.props;
    const squares = [];

    for (let row = 0; row < mapData.rows; row++) {
      const squareRow = [];
      for (let column = 0; column < mapData.cols; column++) {
        const gridPos = {row: row, col: column}
        let squareType = mapData.get(gridPos);
        let overlayType = overlay.get(gridPos);
        squareRow.push(
          <Square 
            key={`${column}:${row}`} 
            gridPos={{row: row, col: column}}
            squareType={squareType}
            overlayType={overlayType}
            hasRuin={mapData.hasRuinAtPosition(gridPos)}
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
