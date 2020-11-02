import GridPosition from "../models/GridPosition";
import { SoloAmbushCorner } from "../models/SoloAmbushCorner";
import { SoloAmbushDirection } from "../models/SoloAmbushDirection";

export enum SpiralDirection {
  LEFT,
  RIGHT,
  DOWN,
  UP
}

export const spiralTraverse = async (grid: any[][], startingCorner: SoloAmbushCorner, directionInput: SoloAmbushDirection, func: (gridPos: GridPosition) => Promise<boolean>) => {
  let topBoundary = 0;
  let bottomBoundary = grid.length - 1;
  let leftBoundary = 0;
  let rightBoundary = grid[0].length - 1;
  let finished = false;

  let row, col, direction
  
  switch (startingCorner) {
    case SoloAmbushCorner.TopLeft:
      row = topBoundary;
      col = leftBoundary
      direction = directionInput === SoloAmbushDirection.Clockwise ? SpiralDirection.RIGHT : SpiralDirection.DOWN;
      break;
    case SoloAmbushCorner.TopRight:
      row = topBoundary
      col = rightBoundary;
      direction = directionInput === SoloAmbushDirection.Clockwise ? SpiralDirection.DOWN : SpiralDirection.LEFT;
      break;
    case SoloAmbushCorner.BottomLeft:
      row = bottomBoundary
      col = leftBoundary
      direction = directionInput === SoloAmbushDirection.Clockwise ? SpiralDirection.UP : SpiralDirection.RIGHT;
      break;
    case SoloAmbushCorner.BottomRight:
      row = rightBoundary
      col = bottomBoundary;
      direction = directionInput === SoloAmbushDirection.Clockwise ? SpiralDirection.LEFT : SpiralDirection.UP;
      break;
  }

  while (topBoundary <= bottomBoundary && leftBoundary <= rightBoundary && !finished) {
    switch (direction) {
      case SpiralDirection.RIGHT:
        if (col <= rightBoundary) {
          finished = await func({row: row, col: col++})
        } else if (col > rightBoundary) {
          if (directionInput === SoloAmbushDirection.Clockwise) {
            direction = SpiralDirection.DOWN;
            row = ++topBoundary;
            col = rightBoundary;
          } else {
            direction = SpiralDirection.UP;
            row = --bottomBoundary;
            col = rightBoundary;
          }
        }
        break;
      case SpiralDirection.DOWN:
        if (row <= bottomBoundary) {
          finished = await func({row: row++, col: col})
        } else if (row > bottomBoundary) {
          if (directionInput === SoloAmbushDirection.Clockwise) {
            direction = SpiralDirection.LEFT;
            row = bottomBoundary;
            col = --rightBoundary;
          } else {
            direction = SpiralDirection.RIGHT;
            row = bottomBoundary;
            col = ++leftBoundary;
          }
        }
        break;
      case SpiralDirection.LEFT:
        if (col >= leftBoundary) {
          finished = await func({row: row, col: col--})
        } else if (col < leftBoundary) {
          if (directionInput === SoloAmbushDirection.Clockwise) {
            direction = SpiralDirection.UP;
            row = --bottomBoundary;
            col = leftBoundary;
          } else {
            direction = SpiralDirection.DOWN;
            row = ++topBoundary;
            col = leftBoundary;
          }
        }
        break;
      case SpiralDirection.UP:
        if (row >= topBoundary) {
          finished = await func({row: row--, col: col})
        } else if (row < topBoundary) {
          if (directionInput === SoloAmbushDirection.Clockwise) {
            direction = SpiralDirection.RIGHT;
            row = topBoundary;
            col = ++leftBoundary;
          } else {
            direction = SpiralDirection.LEFT;
            row = topBoundary;
            col = --rightBoundary;
          }
        }
        break;
    }
  }
}