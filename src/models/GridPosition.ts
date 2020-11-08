import { SquareType } from "../game-components/SquareType";

export default interface GridPosition {
  row: number;
  col: number;
  terrain?: SquareType;
}