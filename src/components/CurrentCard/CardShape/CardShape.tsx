import classNames from "classnames";
import React from "react";
import { Shape, ShapeRotation } from "../../../classes/Card";
import styles from "./CardShape.module.scss";

export interface Props {
  shape: Shape;
}

interface ShapeDimensions {
  topLeftX: number;
  topLeftY: number;
  bottomRightX: number;
  bottomRightY: number 
}

export default class CardShape extends React.PureComponent<Props> {

  findDimensions(shape: ShapeRotation): ShapeDimensions {
    let topLeftX = shape[0].length;
    let topLeftY = shape.length;
    let bottomRightX = 0;
    let bottomRightY = 0;

    for (let row = 0; row < shape[0].length; row++) {
      for (let column = 0; column < shape.length; column++) {
        if (shape[row][column] === 1) {
          if (column > bottomRightX) bottomRightX = column; 
          if (column < topLeftX) topLeftX = column;
          if (row > bottomRightY) bottomRightY = row;
          if (row < topLeftY) topLeftY = row;
        }
      }
    }

    return {topLeftX, topLeftY, bottomRightX, bottomRightY}
  }

  render() {
    const shape = this.props.shape[0];
    const dimensions = this.findDimensions(shape);
    const squares = [];

    console.log(dimensions);

    for (let row = dimensions.topLeftY; row <= dimensions.bottomRightY; row++) {
      const squareRow = [];
      for (let column = dimensions.topLeftX; column <= dimensions.bottomRightX; column++) {
        const squareClass = shape[row][column] === 1 ? 
          classNames(styles.gray, styles.square) : classNames(styles.transparent, styles.square)
        squareRow.push(
          <div className={squareClass}></div>
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