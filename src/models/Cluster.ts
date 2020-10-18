import GridPosition from "./GridPosition";
import { Terrain } from "./Terrains";

export interface Cluster {
  terrain: Terrain;
  gridPositions: GridPosition[];
}