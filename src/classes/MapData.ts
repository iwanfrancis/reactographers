import { ShapeRotation } from "./Card";
import { Terrain } from "../constants/Terrains";
import { MapSize } from "../constants/Maps";
import GridPosition from "../models/GridPosition";

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
  
    public get(row: number, col: number) {
      return this.grid[row][col];
    }
  
    // Maps a shape and terrain to the grid. Puts shape[1][1] on the click location
    public addShape(terrain: Terrain, shape: ShapeRotation, gridPos: GridPosition) {
      for (let shRow = 0; shRow < 4; shRow++) {
        for (let shCol = 0; shCol < 4; shCol++) {
          if (shape[shRow][shCol]) {
            const rowOffset = (gridPos.row + shRow - 1);
            const colOffset = (gridPos.col + shCol - 1);
            if (this.coordWithinBounds({row: rowOffset, col: colOffset})) {
              this.grid[rowOffset][colOffset] = terrain;
            } 
          } 
        }
      }
      return this;
    }

    // Check if a move is legal
    public moveIsLegal(shape: ShapeRotation, gridPos: GridPosition) {
      for (let shRow = 0; shRow < 4; shRow++) {
        for (let shCol = 0; shCol < 4; shCol++) {
          const rowOffset = (gridPos.row + shRow - 1);
          const colOffset = (gridPos.col + shCol - 1);
          if (shape[shRow][shCol])  {
            if ( !this.coordWithinBounds({row: rowOffset, col: colOffset})
              || this.grid[rowOffset][colOffset] !== Terrain.Empty
            ) {
              console.error('Move is illegal')
              return false
              }
          } 
        }
      }
      return true
    }

    // public getAdjacentSquares(row: number, col: number) {
    //   let up;
    //   let right;
    //   let down;
    //   let left;

    //   if (this.coordWithinBounds((col - 1), row)) {

    //   }

    //   return {
    //     up: this.grid[row - 1][col] || Terrain.OutOfBounds,
    //     right: this.grid[row][col + 1] || Terrain.OutOfBounds,
    //     down: this.grid[row + 1][col] || Terrain.OutOfBounds,
    //     left: this.grid[row][col - 1] || Terrain.OutOfBounds
    //   }
    // }

    public applyScoringFunction(scoringFunction: (row: number, col: number, terrain: Terrain) => void ) {
      for (let row = 0; row < this.grid[0].length; row++) {
        for (let col = 0; col < this.grid.length; col++) {
          const terrain = this.grid[row][col];
          scoringFunction(row, col, terrain);
        }
      }
    }

    private coordWithinBounds(gridPos: GridPosition) {
      if ( gridPos.row < 0 || gridPos.row >= this.grid.length 
        || gridPos.col < 0 || gridPos.col >= this.grid[0].length) {
          return false
      }
      return true
    }
  }