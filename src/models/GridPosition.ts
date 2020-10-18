import { Terrain } from "./Terrains";

export default interface GridPosition {
  row: number;
  col: number;
  terrain?: Terrain;
}