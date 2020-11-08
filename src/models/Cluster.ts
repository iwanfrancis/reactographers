import GridPosition from "./GridPosition";
import { SquareType } from "../game-components/SquareType";

export interface Cluster {
  terrain: SquareType;
  gridPositions: GridPosition[];
}