import { SquareType } from "../game-components/Terrains";

export default interface GridPosition {
  row: number;
  col: number;
  terrain?: SquareType;
}