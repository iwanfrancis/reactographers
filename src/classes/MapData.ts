import { Shape } from "../constants/ShapeCards";
import { Terrain } from "../constants/Terrains";

export default class MapData {
    grid: (Terrain | undefined)[][]
    rows: number;
    cols: number;
  
    constructor(grid: (Terrain | undefined)[][]) {
      this.grid = grid
      this.rows = grid.length;
      this.cols = grid[0].length;
    }
  
    get(x: number, y: number) {
      return this.grid[x][y];
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

    // Check if a move is legal
    moveIsLegal(shape: Shape, x: number, y: number) {
      for (let shX = 0; shX < 4; shX++) {
        for (let shY = 0; shY < 4; shY++) {
          const xOffset = (x + shX - 1);
          const yOffset = (y + shY - 1);
          if (shape[shX][shY])  {
            if ( xOffset < 0 || xOffset >= this.grid[0].length
              || yOffset < 0 || yOffset >= this.grid.length
              || this.grid[xOffset][yOffset]
            ) {
              console.error('Move is illegal')
              return false
              }
          } 
        }
      }
      return true
    }
  }