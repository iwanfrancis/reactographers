import classNames from "classnames";
import React from "react";
import { Shape } from "../../../constants/Card";
import styles from "./CardShape.module.scss";

export interface Props {
  shape: Shape;
}

export default class CardShape extends React.PureComponent<Props> {
  render() {
    const shape = this.props.shape[0];
    const squares = [];

    for (let row = 0; row < shape[0].length; row++) {
      const squareRow = [];
      for (let column = 0; column < shape.length; column++) {
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