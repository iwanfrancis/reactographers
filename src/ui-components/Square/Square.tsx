import React from "react";
import classNames from "classnames";

import styles from "./Square.module.scss";
import { SquareType } from "../../game-components/SquareType";
import GridPosition from "../../models/GridPosition";
import { ReactComponent as Ruin } from "../../assets/sprites/ruin/ruin.svg";
import { SquareBorders } from "../../models/SquareBorders";

export interface Props {
  gridPos: GridPosition;
  squareType?: SquareType;
  overlayType?: SquareType;
  overlayBorders?: SquareBorders;
  hasRuin?: boolean;
  ruinActive?: boolean;
  moveValid?: boolean;
  surroundedMountain?: boolean;
  onClick: (gridPos: GridPosition) => any;
  onSquareHoverOn: (gridPos: GridPosition) => any;
  onRotateShape: (gridPos: GridPosition) => any;
}

export default class Square extends React.PureComponent<Props> {
  handleClick(self: any, e: MouseEvent, gridPos: GridPosition) {
    if (e.buttons === 1) {
      self.props.onClick(gridPos);
    }
    if (e.buttons === 2) {
      self.props.onRotateShape(gridPos);
    }
  }

  render() {
    const {
      gridPos,
      squareType,
      overlayType,
      overlayBorders,
      hasRuin,
      ruinActive,
      moveValid,
      surroundedMountain,
      onSquareHoverOn = () => {},
    } = this.props;
    const squareCssClass = classNames(
      styles.square,
      squareType && !hasRuin && styles[squareType],
      surroundedMountain && styles["mountain-no-coin"],
      squareType && hasRuin && styles[`${squareType}-color`]
    );
    const overlayCssClass = classNames(
      styles.overlay,
      overlayType ? styles[`${overlayType}-color`] : null,
      overlayType !== SquareType.Empty && overlayBorders?.top && styles["top-border"],
      overlayType !== SquareType.Empty && overlayBorders?.right && styles["right-border"],
      overlayType !== SquareType.Empty && overlayBorders?.bottom && styles["bottom-border"],
      overlayType !== SquareType.Empty && overlayBorders?.left && styles["left-border"],
      moveValid ? styles["valid-move"] : styles["invalid-move"]
    );
    const secondOverlayCssClass = classNames(
      styles["overlay"],
      hasRuin && ruinActive && squareType === SquareType.Empty
        ? styles["ruin-highlight"]
        : undefined
    );

    return (
      <div
        className={squareCssClass}
        onMouseEnter={() => onSquareHoverOn(gridPos)}
        onContextMenu={(e: any) => e.preventDefault()}
        onMouseDown={(e: any) => this.handleClick(this, e, gridPos)}
      >
        {hasRuin && <Ruin className={classNames(styles.ruin)} />}
        <div className={overlayCssClass}></div>
        <div className={secondOverlayCssClass}></div>
      </div>
    );
  }
}
