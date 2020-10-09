import { Shape } from "../constants/ShapeCards";
import { Terrain } from "../constants/Terrains";

export default class GridData {
    grid: Terrain[][]
  
    constructor(grid: Terrain[][]) {
      this.grid = grid
    }
  
    get(x: number, y: number) {
      return this.grid[x][y]
    }
  
    // Maps a shape and terrain to the grid. Puts shape[1][1] on the click location
    addShape(terrain: Terrain, shape: Shape, x: number, y: number) {
      for (let shX = 0; shX < 4; shX++) {
        for (let shY = 0; shY < 4; shY++) {
          if (shape[shX][shY]) {
            const xOffset = (x + shX - 1);
            const yOffset = (y + shY - 1);
            this.grid[xOffset][yOffset] = terrain;
          } 
        }
      }
    }
  
  }