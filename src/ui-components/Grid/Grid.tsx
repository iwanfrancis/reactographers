import React from "react";
import Square from "../Square/Square";
import styles from "./Grid.module.scss";
import MapData from "../../classes/MapData";
import GridPosition from "../../models/GridPosition";
import classNames from "classnames";
import { SquareBorders } from "../../models/SquareBorders";
import { Terrain } from "../../game-components/Terrains";

export interface Props {
  mapData: MapData;
  overlay: MapData;
  ruinActive: boolean;
  currentMoveValid: boolean;
  onSquareClick: (gridPos: GridPosition) => any;
  onSquareHoverOn: (gridPos: GridPosition) => any;
  onRotateShape: (gridPos: GridPosition) => any;
}

export default class Grid extends React.PureComponent<Props> {
  calculateSquareBorders = (adjacentSquares: GridPosition[]): SquareBorders => {
    return {
      top: adjacentSquares[0].terrain === Terrain.Empty,
      bottom: adjacentSquares[1].terrain === Terrain.Empty,
      left: adjacentSquares[2].terrain === Terrain.Empty,
      right: adjacentSquares[3].terrain === Terrain.Empty,
    };
  };

  isSquareASurroundedMountain = (mapData: MapData, gridPos: GridPosition) => {
    return mapData.surroundedMountains.some(
      (mountain) => mountain.row === gridPos.row && mountain.col === gridPos.col
    );
  };

  render() {
    const {
      mapData,
      overlay,
      ruinActive,
      currentMoveValid,
      onSquareClick,
      onSquareHoverOn,
      onRotateShape,
    } = this.props;
    const squares = [];

    for (let row = 0; row < mapData.rows; row++) {
      const squareRow = [];
      for (let column = 0; column < mapData.cols; column++) {
        const gridPos = { row: row, col: column };
        const squareType = mapData.get(gridPos);
        let surroundedMountain = false;

        if (squareType === Terrain.Mountain) {
          surroundedMountain = this.isSquareASurroundedMountain(mapData, gridPos);
        }

        squareRow.push(
          <Square
            key={`${column}:${row}`}
            gridPos={{ row: row, col: column }}
            squareType={squareType}
            overlayType={overlay.get(gridPos)}
            overlayBorders={this.calculateSquareBorders(overlay.getAdjacentSquares(gridPos))}
            hasRuin={mapData.hasRuinAtPosition(gridPos)}
            onClick={onSquareClick}
            onSquareHoverOn={onSquareHoverOn}
            onRotateShape={onRotateShape}
            ruinActive={ruinActive}
            moveValid={currentMoveValid}
            surroundedMountain={surroundedMountain}
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
    horizontalBorder.push(<div key="left-border-corner" className={styles["border-corner"]}></div>);
    for (let column = 0; column < mapData.cols; column++) {
      const horizontalBorderClasses = classNames(
        styles["horizontal-border"],
        column % 2 === 0 ? styles.solid : undefined
      );
      horizontalBorder.push(
        <div key={`horizontal-border-${column}`} className={horizontalBorderClasses}></div>
      );
    }
    horizontalBorder.push(
      <div key="right-border-corner" className={styles["border-corner"]}></div>
    );

    return (
      <div className={styles.grid}>
        <div className={styles.row}>{horizontalBorder}</div>
        {squares}
        <div className={styles.row}>{horizontalBorder}</div>
      </div>
    );
  }
}
