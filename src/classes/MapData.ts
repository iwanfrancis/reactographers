import { ShapeRotation } from "../constants/Card";
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
  
    public get(x: number, y: number) {
      return this.grid[x][y];
    }
  
    // Maps a shape and terrain to the grid. Puts shape[1][1] on the click location
    public addShape(terrain: Terrain, shape: ShapeRotation, x: number, y: number) {
      for (let shX = 0; shX < 4; shX++) {
        for (let shY = 0; shY < 4; shY++) {
          if (shape[shX][shY]) {
            const xOffset = (x + shX - 1);
            const yOffset = (y + shY - 1);
            if (this.coordWithinBounds(xOffset, yOffset)) {
              this.grid[xOffset][yOffset] = terrain;
            } 
          } 
        }
      }
      return this;
    }

    // Check if a move is legal
    public moveIsLegal(shape: ShapeRotation, x: number, y: number) {
      for (let shX = 0; shX < 4; shX++) {
        for (let shY = 0; shY < 4; shY++) {
          const xOffset = (x + shX - 1);
          const yOffset = (y + shY - 1);
          if (shape[shX][shY])  {
            if ( !this.coordWithinBounds(xOffset, yOffset)
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

    private coordWithinBounds(x: number, y: number) {
      if ( x < 0 || x >= this.grid[0].length 
        || y < 0 || y >= this.grid.length) {
          return false
      }
      return true
    }
  }