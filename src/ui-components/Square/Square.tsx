import React from "react";
import classNames from "classnames";

import styles from "./Square.module.scss";
import { Terrain } from "../../game-components/Terrains";
import GridPosition from "../../models/GridPosition";
import { ReactComponent as Ruin } from "../../assets/sprites/ruin/ruin.svg";
import { SquareBorders } from "../../models/SquareBorders";

export interface Props {
  gridPos: GridPosition;
  squareType?: Terrain;
  overlayType?: Terrain;
  overlayBorders?: SquareBorders;
  hasRuin?: boolean;
  ruinActive?: boolean;
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
      onSquareHoverOn = () => {},
    } = this.props;
    const squareCssClass = classNames(styles.square, squareType ? styles[squareType] : null);
    const overlayCssClass = classNames(
      styles.overlay,
      overlayType ? styles[overlayType] : null,
      overlayType !== Terrain.Empty && overlayBorders?.top && styles["top-border"],
      overlayType !== Terrain.Empty && overlayBorders?.right && styles["right-border"],
      overlayType !== Terrain.Empty && overlayBorders?.bottom && styles["bottom-border"],
      overlayType !== Terrain.Empty && overlayBorders?.left && styles["left-border"]
    );
    const secondOverlayCssClass = classNames(
      styles["overlay"],
      hasRuin && ruinActive && squareType === Terrain.Empty ? styles["ruin-highlight"] : undefined
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
