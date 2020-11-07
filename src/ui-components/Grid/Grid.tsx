import React from "react";
import Square from "../Square/Square";
import styles from "./Grid.module.scss";
import MapData from "../../classes/MapData";
import GridPosition from "../../models/GridPosition";
import classNames from "classnames";

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
        const gridPos = { row: row, col: column };
        let squareType = mapData.get(gridPos);
        let overlayType = overlay.get(gridPos);
        squareRow.push(
          <Square
            key={`${column}:${row}`}
            gridPos={{ row: row, col: column }}
            squareType={squareType}
            overlayType={overlayType}
            hasRuin={mapData.hasRuinAtPosition(gridPos)}
            onClick={onSquareClick}
            onSquareHoverOn={onSquareHoverOn}
            onRotateShape={onRotateShape}
          />
        );
      }
      const leftBorderClasses = classNames(
        styles.left,
        styles["vertical-border"],
        row % 2 === 0 ? styles.solid : undefined
      );
      const rightBorderClasses = classNames(
        styles.right,
        styles["vertical-border"],
        row % 2 === 0 ? styles.solid : undefined
      );
      squares.push(
        <div key={row} className={styles.row}>
          <div className={leftBorderClasses}></div>
          {squareRow}
          <div className={rightBorderClasses}></div>
        </div>
      );
    }

    const horizontalBorder = [];
    horizontalBorder.push(<div className={styles["border-corner"]}></div>);
    for (let column = 0; column < mapData.cols; column++) {
      const horizontalBorderClasses = classNames(
        styles["horizontal-border"],
        column % 2 === 0 ? styles.solid : undefined
      );
      horizontalBorder.push(<div className={horizontalBorderClasses}></div>);
    }
    horizontalBorder.push(<div className={styles["border-corner"]}></div>);

    return (
      <div className={styles.grid}>
        <div className={styles.row}>{horizontalBorder}</div>
        {squares}
        <div className={styles.row}>{horizontalBorder}</div>
      </div>
    );
  }
}
