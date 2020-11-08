import GridPosition from "./GridPosition";
import { SquareType } from "../game-components/Terrains";

export interface Cluster {
  terrain: SquareType;
  gridPositions: GridPosition[];
}