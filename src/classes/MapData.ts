import { ShapeRotation } from "./Card";
import { Terrain } from "../constants/Terrains";
import { MapSize } from "../constants/Maps";

export default class MapData {
    grid: (Terrain)[][]
    rows: number;
    cols: number;
  
    constructor(grid?: (Terrain)[][]) {
      if (grid) {
        this.grid = grid
      } else {
        this.grid = new Array(MapSize.rows).fill(null).map(() => new Array(MapSize.cols).fill(null))
      }
      this.rows = this.grid.length;
      this.cols = this.grid[0].length;
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
              || this.grid[xOffset][yOffset] !== Terrain.Empty
            ) {
              console.error('Move is illegal')
              return false
              }
          } 
        }
      }
      return true
    }

    public getAdjacentSquares(row: number, col: number) {
      const up = this.grid[row - 1][col];
      const right = this.grid[row][col + 1];
      const down = this.grid[row + 1][col];
      const left = this.grid[row][col - 1];
    }

    public applyScoringFunction(scoringFunction: (row: number, col: number, terrain: Terrain) => void ) {
      for (let row = 0; row < this.grid[0].length; row++) {
        for (let col = 0; col < this.grid.length; col++) {
          const terrain = this.grid[row][col];
          scoringFunction(row, col, terrain);
        }
      }
    }

    private coordWithinBounds(x: number, y: number) {
      if ( x < 0 || x >= this.grid[0].length 
        || y < 0 || y >= this.grid.length) {
          return false
      }
      return true
    }
  }